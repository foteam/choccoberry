import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import MenuScreen from './src/screens/MenuScreen'

export default function App() {
  return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <MenuScreen />
      </ApplicationProvider>
  )
}
