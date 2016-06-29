/**
 * Created by Benedikt on 29.06.2016.
 */
import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    button,
    TextInput,
    Alert,
    Label
} from 'react-native';

import ViewContainer from  '../components/frontend/ViewContainer'
import StatusBarBackground from  '../components/frontend/StatusBarBackground'
import ButtonContainer from '../components/frontend/ButtonContainer'
import Icon from '../node_modules/react-native-vector-icons/FontAwesome';

import User from './../components/backend/User'
import Database from "./../components/backend/Database";

var instance;

class ShowProfileScreen extends Component {

    constructor(props) {
        super(props);
        instance = this;
    }

    render() {
        return (
            <ViewContainer>

                <Icon.ToolbarAndroid
                    style={styles.toolbarView}
                    actions={[
                        {title: 'Back', iconName:'arrow-left', iconSize: 30,  show: 'always'},
                        {title: 'Home', iconName:'home', iconSize: 30,  show: 'always'},
                        {title: 'Logout', iconName:'sign-out', iconSize: 30,  show: 'always'}
                    ]}
                    onActionSelected={this._onActionSelected}
                />

                <View style={styles.titleView}>

                    <Text style={styles.titleText}>
                        Welcome to Find.me
                    </Text>
                    <Text style={styles.titleText}>
                        Profile:
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Vorname:
                    </Text>
                    <Text style={styles.input}>
                        {User.getInstance().currentUSER.profile.firstname}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Nachname:
                    </Text>
                    <Text style={styles.input}>
                        {User.getInstance().currentUSER.profile.lastname}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        E-Mail:
                    </Text>
                    <Text style={styles.input}>
                        {User.getInstance().currentUSER.profile.email}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Geburtstag:
                    </Text>
                    <Text style={styles.input}>
                        {instance._parseTimestamp(User.getInstance().currentUSER.profile.birthday)}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Geschlecht:
                    </Text>
                    <Text style={styles.input}>
                        {instance._parseGender(User.getInstance().currentUSER.profile.gender)}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Familienstatus:
                    </Text>
                    <Text style={styles.input}>
                        {instance._parseFamilystatus(User.getInstance().currentUSER.profile.familystatus)}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Kinder:
                    </Text>
                    <Text style={styles.input}>
                        {User.getInstance().currentUSER.profile.children}
                    </Text>
                </View>

                <View style={styles.inputContainerView}>
                    <Text style={styles.text}>
                        Über mich:
                    </Text>
                    <Text style={styles.input}>
                        {User.getInstance().currentUSER.profile.aboutme}
                    </Text>
                </View>

                <ButtonContainer>
                    <TouchableHighlight style={styles.button}
                                        onPress={(event) => this._navigateToCreateProfileScreen()}>
                        <Text style={styles.btnText}> Change </Text>
                    </TouchableHighlight>
                </ButtonContainer>

                <ButtonContainer>
                    <TouchableHighlight style={styles.button} onPress={(event) => this._navigateToMainMenue()}>
                        <Text style={styles.btnText}> Back </Text>
                    </TouchableHighlight>
                </ButtonContainer>

            </ViewContainer>

        );
    }

    _parseTimestamp(pTimestamp) {
        var date = new Date(pTimestamp * 1000);

        Alert.alert('pTimestamp', pTimestamp.toString(), [{text: 'ok'}]);

        return date.toLocaleDateString();
    }

    _parseFamilystatus(pStatus) {
        if (pStatus === 0) {
            return "Single";
        } else if (pStatus === 1) {
            return "Geschieden";
        } else if (pStatus === 2) {
            return "Verheiratet";
        }

        return "It's complicated";
    }

    _parseGender(pGender) {
        if (pGender === 0) {
            return "Weiblich";
        } else if (pGender === 0) {
            return "Weiblich";
        }

        return "Sonstiges";
    }

    _navigateToMainMenue() {
        this.props.navigator.push({
            ident: "Main"
        })
    }

    _navigateToCreateProfileScreen() {
        Alert.alert('Clicked', "es wurde ändern geklickt", [{text: 'ok'}]);
    }

    _navigateBackToMessageScreen() {
        this.props.navigator.pop({
            ident: "Message"
        })
    }

    _navigateToLogInScreen() {
        this.props.navigator.push({
            ident: "Login"
        })
    }

    _onActionSelected(position) {
        switch (position) {
            case 0:
                instance._navigateBackToMessageScreen();
                break;
            case 1:
                instance._navigateToMainMenue();
                break;
            case 2:
                instance._navigateToLogInScreen();
                break;
        }
    }
}

const styles = StyleSheet.create({

    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10
    },
    thumbnail: {
        resizeMode: 'contain',
        marginBottom: 25,
        width: 300,
        height: 350
    },
    titleText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    },
    toolbarView: {
        height: 50,
        marginRight: 200
    },
    inputContainerView: {
        flexDirection: 'row',
        padding: 5
    },
    input: {
        height: 20,
        padding: 4,
        marginRight: 50,
        flex: 4,
        fontSize: 18,
        color: '#000000',
        textAlign: 'center'
    },
    text: {
        flexDirection: 'row',
        padding: 5,
        height: 20
    }
});

module.exports = ShowProfileScreen;
