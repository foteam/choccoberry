import { View, FlatList, Animated, Image, StyleSheet} from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { useState, useMemo, useEffect, useRef} from 'react'
import {useQuery} from '@tanstack/react-query'
import { getProducts } from '../api/products'
import { getCategories } from '../api/categories'
import { CategoryList } from '../components/CategoryList'
import { ProductCard } from '../components/ProductCard'
import { CartBar } from '../components/CartBar'
import { CartModal } from '../components/CartModal'
import { useCart } from '../store/cart.store'
import { api } from '../api/axios'

export default function MenuScreen() {
    const add = useCart((s) => s.add)
    const cartItems = useCart((s) => s.items)
    const cartTotalPrice = cartItems.reduce((a, b) => a + b.qty * b.price, 0)

    const [selectedCategory, setSelectedCategory] = useState('all')
    const [open, setOpen] = useState(false)

    const fadeAnim = useRef(new Animated.Value(1)).current
    const translateAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        console.log('TEST REQUEST START')

        api.get('/products')
            .then(res => {
                console.log('TEST RESPONSE:', res.data)
            })
            .catch(err => {
                console.log('TEST ERROR:', err.message)
            })
    }, [])

    const { data: categories = [], isLoading: loadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    })

    const { data: products = [], isLoading: loadingProducts } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    })

    const filteredMenu = useMemo(() => {
        if (selectedCategory === 'all') return products
        return products.filter((i) => i.category.name === selectedCategory)
    }, [selectedCategory])

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
                toValue: -20,
                duration: 120,
                useNativeDriver: true,
            }),
        ]).start(() => {
            fadeAnim.setValue(0)
            translateAnim.setValue(20)

            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 180,
                    useNativeDriver: true,
                }),

                Animated.timing(translateAnim, {
                    toValue: 0,
                    duration: 180,
                    useNativeDriver: true,
                }),
            ]).start()
        })
    }, [selectedCategory])

    return (
        <Layout style={{ flex: 1, flexDirection: 'row' , }}>
            {/* LEFT — CATEGORIES */}
            <Animated.View style={{ width: 160, flex: 1, paddingTop: 20, paddingVertical: 600, borderRightWidth: 1, borderColor: '#E4E9F2' , backgroundColor: '#0E5A63' }}>
                {/* LOGO */}
                <Image
                    source={require('../../assets/chocco_logo_white.png')}
                    style={{
                        width: "100%",
                        height: 115,
                        alignSelf: 'center',
                        marginBottom: 0,
                        resizeMode: 'cover',
                    }}
                />

                <Text category="h6" style={{ margin: 12 , color: "white"}}>
                    Котегории:
                </Text>
                <View style={{ height: 1000}}>
                    <CategoryList
                        categories={categories}
                        selected={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                </View>
            </Animated.View>
            <Layout style={{ flex: 1 }}>
                {/* RIGHT — MENU */}
                <Animated.View style={{ flex: 1, paddingTop: 40, padding: 12 }}>
                    {/* HEADER */}
                    <View style={styles.headerRow}>
                        <Text category="h6" style={styles.leftText}>
                            СТОЛ: 29
                        </Text>

                        <Text category="h6" style={[styles.rightText, {color: (cartTotalPrice > 0 ? '#000000' : '#ff1200')}]}>
                            {(cartTotalPrice > 0 ? cartTotalPrice.toLocaleString() + " сўм" : "Карзинка пуста")}
                        </Text>
                    </View>
                    <FlatList
                        data={filteredMenu}
                        keyExtractor={(item) => item._id}
                        numColumns={4}
                        columnWrapperStyle={{
                            gap: 10,
                        }}
                        contentContainerStyle={{
                            padding: 16,

                        }}
                        renderItem={({ item, index }) => (
                            <ProductCard
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                index={index}
                                discount={item.discount}      // например 15
                                new_product={item.new_product} // true / false
                                onAdd={() => add(item)}
                            />
                        )}
                    />
                    <Animated.View style={{}}>
                        <CartBar onPress={() => setOpen(true)} />
                        <CartModal visible={open} onClose={() => setOpen(false)} />
                    </Animated.View>
                </Animated.View >

            </Layout>
        </Layout>
    )
}
const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    leftText: {
        paddingLeft: 20,
        color: '#000',
        fontWeight: '700',
    },
    rightText : {
        paddingRight: 20,
        fontWeight: '700',
    },
})
