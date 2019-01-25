import React, { Component } from 'react';

import { 
    View, 
    StyleSheet,
    Image, 
    ImageBackground, 
    Dimensions, 
    KeyboardAvoidingView, 
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { tryAuth, authAutoSignIn } from '../../store/actions/index';
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import WAIE from "../../assets/waie3.png";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground"
import validate from '../../utility/validation';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > Dimensions.get("window").width ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            },
        }
    };

    constructor(props){
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    componentDidMount() {
        this.props.onAutoSignIn();
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            };
        });
    };

    updateStyles = (dims) => {
        this.setState({
            viewMode: 
                dims.window.height > dims.window.width ? "portrait" : "landscape",
        });
    }

    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData, this.state.authMode);
        //startMainTabs();
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if(this.state.controls[key].validationRules.equalTo){
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if(key === "password"){
            const equalControl = "password";
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: 
                            key === "password" 
                            ? validate(
                                prevState.controls.confirmPassword.value, 
                                prevState.controls.confirmPassword.validationRules, 
                                connectedValue
                                ) 
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]:{
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value, 
                            prevState.controls[key].validationRules, 
                            connectedValue
                        ),
                        touched: true
                    },
                }
            };
        });
    };    

    render(){
        let headingText = null;
        let confirmPasswordControl = null;
        let submitButton = (
            <ButtonWithBackground 
                color="#29aaf4" 
                onPress={this.authHandler}
                disabled={
                            !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" || 
                            !this.state.controls.email.valid || 
                            !this.state.controls.password.valid}
            >
                Submit
            </ButtonWithBackground>
        );

        if (this.state.viewMode === "portrait"){
            headingText = (
                <MainText>
                    <HeadingText>{ this.state.authMode === "login" ? "Log In" : "Sign Up" }</HeadingText>
                </MainText>
            );
        }
        
        if (this.state.authMode === "signup") {
            confirmPasswordControl = (
                <View style={ this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper }>
                    <DefaultInput 
                        placeholder={"Confirm password"}
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => this.updateInputState("confirmPassword", val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry
                    />
                </View>
            );
        }
        if(this.props.isLoading){
            submitButton = <ActivityIndicator />;
        }
        return(
            <ScrollView>
            <View style={styles.backgroundImage}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.logoContainer}>
                        <Image source={WAIE} style={styles.image} />
                    </View>
                    <View style={styles.contentContainer}>
                        {/* {headingText} */}
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.containerInput}>
                                <DefaultInput 
                                    placeholder={"Please, enter your e-mail"} 
                                    style={styles.input}
                                    value={this.state.controls.email.value}
                                    onChangeText={(val) => this.updateInputState("email", val)}
                                    valid={this.state.controls.email.valid}
                                    touched={this.state.controls.email.touched}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                />
                                <View style={ this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer }>
                                    <View style={ this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper }>
                                        <DefaultInput 
                                            placeholder={"Password"} 
                                            style={styles.input}
                                            value={this.state.controls.password.value}
                                            onChangeText={(val) => this.updateInputState("password", val)}
                                            valid={this.state.controls.password.valid}
                                            touched={this.state.controls.password.touched}
                                            secureTextEntry
                                        />
                                    </View>
                                    {confirmPasswordControl}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        {submitButton}
                        <ButtonWithBackground 
                            color="#29aaf4" 
                            onPress={this.switchAuthModeHandler}
                        > 
                            Switch to {this.state.authMode === "login" ? "Sign Up" : "Log In"}
                        </ButtonWithBackground>
                    </View>
                </KeyboardAvoidingView>
            </View>
            </ScrollView>
        );
    }
}

var styles = StyleSheet.create({

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: 5
    },
    contentContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: 0
    },
    containerInput: {
        width: "80%",
    },
    input: {
        width: '100%',
        margin: 0,
        marginBottom: 8,
    },
    image: {
        justifyContent: "center",
        width: 150,
        height: 150,
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    portraitPasswordWrapper: {
        width: "100%",
    },
    landscapePasswordWrapper: {
        width: "45%",
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);