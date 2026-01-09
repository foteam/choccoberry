import { List, ListItem, Text } from '@ui-kitten/components'
import { View, Image, StyleSheet } from 'react-native'

type Category = {
    _id: string
    name: string
    image?: string
}

type Props = {
    categories: Category[]
    selected: string
    onSelect: (id: string) => void
}

export function CategoryList({ categories, selected, onSelect }: Props) {
    return (
        <View style={{ }}>
            <List
                data={categories}
                renderItem={({ item }) => {
                    const active = selected === item._id

                    return (
                        <ListItem
                            onPress={() => onSelect(item._id)}
                            style={[
                                styles.item,
                                { backgroundColor: active ? '#0d525a' : '#0E5A63' },
                            ]}
                            accessoryLeft={() => (
                                <Image source={{uri: item.image}} style={styles.icon} />
                            )}
                            title={() => (
                                <Text
                                    style={[
                                        styles.title,
                                        { color: active ? '#FFFFFF' : '#E0F2F1' },
                                    ]}
                                >
                                    {item.name}
                                </Text>
                            )}
                        />
                    )
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        height: 56,
        paddingHorizontal: 12,
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 100,
        marginRight: 12,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
    },
})
