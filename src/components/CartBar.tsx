import { Layout, Text } from '@ui-kitten/components'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useCart } from '../store/cart.store'

type Props = {
    onPress: () => void
}

export function CartBar({ onPress }: Props) {
    const items = useCart((s) => s.items)

    const totalQty = items.reduce((a, b) => a + b.qty, 0)
    const totalPrice = items.reduce((a, b) => a + b.qty * b.price, 0)

    if (totalQty === 0) return null

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <Layout style={styles.bar}>
                <Text style={styles.text}>
                    🛒 {totalQty} продуктов
                </Text>
                <Text style={styles.price}>
                    {totalPrice.toLocaleString()} сўм →
                </Text>
            </Layout>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bar: {
        height: 100,
        marginBottom: 20,
        shadowRadius: 15,
        shadowColor: 'black',
        backgroundColor: '#0E5A63',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    price: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
})
