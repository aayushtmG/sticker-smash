import { StyleSheet, Image } from "react-native"

export default function ImageViewer({ PlaceHolderSource, selectedImage }) {
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceHolderSource
  return <Image source={imageSource} style={styles.image}></Image>
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
})
