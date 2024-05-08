import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Image } from "react-native"
import ImageViewer from "../components/ImageViewer"
import Button from "../components/Button"
import IconButton from "../components/IconButton"
import CircleButton from "../components/CircleButton"
import { launchImageLibraryAsync } from "expo-image-picker"
import { useState } from "react"
import EmojiPicker from "@/components/EmojiPicker"
import EmojiList from "@/components/EmojiList"
import EmojiSticker from "@/components/EmojiSticker"

const PlaceHolder = require("../assets/images/background-image.png")
export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const pickImageAsync = async () => {
    let result = await launchImageLibraryAsync({
      quality: 0,
      allowsEditing: true,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      alert("You did not picked any image")
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }
  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const onSaveImageAsync = async () => {}

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          PlaceHolderSource={PlaceHolder}
          selectedImage={selectedImage}
        ></ImageViewer>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          ></Button>
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          ></Button>
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList
          onCloseModal={onModalClose}
          onSelect={setPickedEmoji}
        ></EmojiList>
      </EmojiPicker>
      {pickedEmoji && (
        <EmojiSticker stickerSource={pickedEmoji} imageSize={50}></EmojiSticker>
      )}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
})
