import { Card, Text, Button } from '@ui-kitten/components'
import { View, Image, StyleSheet } from 'react-native'

import { Dimensions, Animated  } from 'react-native'
import { useRef, useEffect } from 'react'

const SCREEN_WIDTH = Dimensions.get('window').width

const LEFT_MENU_WIDTH = 220       // ширина категорий
const CONTENT_PADDING = 24        // отступы справа
const GAP = 16                    // расстояние между карточками
const COLUMNS = 3

export const CARD_WIDTH =
    (SCREEN_WIDTH - LEFT_MENU_WIDTH - CONTENT_PADDING * 2 - GAP * (COLUMNS - 1)) /
    COLUMNS

type Props = {
    name: string
    description?: string
    price: number
    image: string
    index: number
    onAdd: () => void

    discount?: number        // например 10 = 10%
    new_product?: boolean
}
export function ProductCard({
                                name,
                                description,
                                price,
                                image,
                                index,
                                onAdd,
                                discount,
                                new_product,
                            }: Props) {
    const appear = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(appear, {
            toValue: 1,
            duration: 250,
            delay: index * 40, // 👈 волна
            useNativeDriver: true,
        }).start()
    }, [])

    return (
        <Card style={styles.card} disabled>
            {/* IMAGE */}
            <Image source={{ uri: image }} style={styles.image} />

            {/* BADGES */}
            {discount ? (
                <View style={[styles.badge, styles.discountBadge]}>
                    <Text style={styles.badgeText}>-{discount}%</Text>
                </View>
            ) : null}

            {new_product ? (
                <View style={[styles.badge, styles.newBadge]}>
                    <Text style={styles.badgeText}>Новинька</Text>
                </View>
            ) : null}

            {/* CONTENT */}
            <Animated.View style={styles.content}>
                <Text category="s1" style={styles.title} numberOfLines={1}>
                    {name}
                </Text>

                {description ? (
                    <Text appearance="hint" style={styles.desc} numberOfLines={2}>
                        {description}
                    </Text>
                ) : null}

                <Text category="h6" style={styles.price}>
                    {price.toLocaleString()} сум
                </Text>

                <Button style={styles.button} onPress={onAdd}>
                    Добавить в корзину
                </Button>
            </Animated.View>
        </Card>
    )
}
const styles = StyleSheet.create({
    imageWrapper: {
        position: 'relative',
    },

    badge: {
        position: 'absolute',
        top: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },

    discountBadge: {
        left: 8,
        height: 25,
        backgroundColor: '#E53935', // красный
    },

    newBadge: {
        right: 8,
        backgroundColor: '#43A047', // зелёный
    },

    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
        alignItems: 'center',
    },
    card: {
        width: CARD_WIDTH-65,   // 🔥 фиксированная ширина
        marginBottom: 16,
        borderRadius: 24,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 140, // 👈 как в примере
        resizeMode: 'cover',
        backgroundColor: '#eee',
    },
    content: {
        padding: 14,
    },
    title: {
        fontWeight: '700',
        fontSize: 16,
    },
    desc: {
        fontSize: 13,
        marginTop: 4,
    },
    price: {
        marginTop: 10,
        marginBottom: 12,
        fontWeight: '800',
    },
    button: {
        borderRadius: 14,
        backgroundColor: '#0E5A63', // как на примере
    },
})
