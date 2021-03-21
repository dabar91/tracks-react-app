import React, { useContext } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';


const SigninScreen = () => {

    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NavigationEvents 
                onWillFocus={clearErrorMessage}
                onWillBlur={clearErrorMessage}
            />
            <AuthForm 
                headerText="Sign In to Your Account"
                errorMessage={state.errorMessage}
                submitTitle="Sign In"
                onSubmit={signin}
            />
            <NavLink 
                routeName="Signup"
                text="Don't have an account? Sign up here."
            />
        </View>
    );
};

SigninScreen.navigationOptions = () => {
    return {
        header: () => false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100
    }
});

export default SigninScreen;