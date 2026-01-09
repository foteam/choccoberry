import { Modal, Card, Text, Button, Divider } from '@ui-kitten/components'
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useCart } from '../store/cart.store'

type Props = {
    visible: boolean
    onClose: () => void
}

export function CartModal({ visible, onClose }: Props) {
    const { items, clear, increase, decrease } = useCart()

    const total = items.reduce((a, b) => a + b.qty * b.price, 0)

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={onClose}
        >
            <Card disabled style={styles.card}>
                {/* HEADER */}
                <View style={styles.header}>
                    <Text category="h6">🛒 Корзинка</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.close}>✕</Text>
                    </TouchableOpacity>
                </View>

                <Divider />

                {/* ITEMS */}
                <FlatList
                    data={items}
                    keyExtractor={(item) => item._id}
                    style={{ marginTop: 8, height: 200 }}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemTitle}>{item.name}</Text>
                                <Text appearance="hint" category="c1">
                                    {item.price.toLocaleString()} сўм
                                </Text>
                            </View>

                            {/* QTY CONTROLS */}
                            <View style={styles.qtyBox}>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => decrease(item._id)}
                                >
                                    <Text style={styles.qtyText}>−</Text>
                                </TouchableOpacity>

                                <Text style={styles.qtyValue}>{item.qty}</Text>

                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => increase(item._id)}
                                >
                                    <Text style={styles.qtyText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.itemPrice}>
                                {(item.qty * item.price).toLocaleString()} сўм
                            </Text>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text appearance="hint" style={{ marginVertical: 24 }}>
                            Корзинка пуста
                        </Text>
                    }
                />

                <Divider style={{ marginVertical: 12 }} />

                {/* TOTAL */}
                <View style={styles.totalRow}>
                    <Text category="s1">Итог:</Text>
                    <Text category="h6">
                        {total.toLocaleString()} сўм
                    </Text>
                </View>

                {/* ACTIONS */}
                <Button style={styles.primaryBtn}>
                    Подтвердить заказ
                </Button>

                <Button
                    appearance="outline"
                    status="danger"
                    style={styles.secondaryBtn}
                    onPress={() => {
                        clear()
                        onClose()
                    }}
                >
                    Сбросить корзинку
                </Button>
            </Card>
        </Modal>
    )
}
const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        maxHeight: '100%',
        maxWidth: '100%',
    },
    card: {
        width: 520,
        height: 600,
        maxHeight: '80%',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    close: {
        fontSize: 22,
        color: '#8F9BB3',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    itemTitle: {
        fontWeight: '600',
    },
    itemPrice: {
        fontWeight: '700',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    primaryBtn: {
        backgroundColor: '#0E5A63',
        borderRadius: 14,
        marginBottom: 8,
    },
    secondaryBtn: {
        borderRadius: 14,
    },
    qtyBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },

    qtyBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EDF1F7',
        justifyContent: 'center',
        alignItems: 'center',
    },

    qtyText: {
        fontSize: 20,
        fontWeight: '700',
    },

    qtyValue: {
        width: 32,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
})

