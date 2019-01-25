import React, { Component } from "react";
import { View, Image, Button, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import ImagePicker from "react-native-image-picker";

import imagePlaceholder from "../../assets/placeholder_camera.jpg";

class PickImage extends Component {
    state = {
        pickedImage: null
    }

    reset = () => {
        this.setState({
            pickedImage: null
        })
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker(
            {
                title: "Pick an image",
                maxWidth: 800,
                maxHeight: 600
            },
            res => {
                if(res.didCancel) {
                    console.log("User cancelled!");
                } else if (res.error) {
                    console.log("Error", res.error);
                } else {
                    this.setState({
                        pickedImage: { uri: res.uri }
                    });
                    this.props.onImagePicked({uri: res.uri, base64: res.data})
                }
            }
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.pickImageHandler} style={styles.container}>
                    <ImageBackground source={imagePlaceholder} style={styles.placholder}>
                        
                        <Image source={this.state.pickedImage} style={styles.previewImage}/>
                        
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles =  StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },
    placholder: {
        width: "96%",
        height: 200,
        borderRadius: 10
    },
    button: {
        margin: 8,
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
});

export default PickImage;