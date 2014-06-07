// ==UserScript==
// @name           imageshack.us autofill
// @namespace      imageshack.us
// @include        http://imageshack.us/
// ==/UserScript==

/*
 * @date April 9th, 2011
 */

var arguments;
arguments["username"] = "Put username in here.";
arguments["password"] = "Put password in here.";
AutoFill(arguments);

/*
 * @parameters Dictionary
 * @parameters["username"] Dictionary entry with the username as string.
 * @parameters["password"] Dictionary entry with the password as string.
 */
function AutoFill(paramenters) {

    var loginId = "l_login";
    var passwordId = "l_password";
    var attributeName = "value";
    var errorMessage = "GreaseMonkey: Invalid Elements. Check for proper IDs.";
    var loginElement = null;
    var passwordElement = null;
    
    init();
    
    /*
     * Executes with the instantiation of an object of this class.
     */
    function init() {
        var username = paramenters["username"];
        var password = paramenters["password"];
        getInputFields();
        writeToInputFields(username, password);
    }
    
    /*
     * Gets the input fields.
     */
    function getInputFields() {
        try {
            loginElement = document.getElementById(loginId);
            passwordElement = document.getElementById(passwordId);
            if(!loginElement || !passwordElement) {
                throw errorMessage;
            }
        } catch (err) {
            loginElement = passwordElement = null;
            alert(err);
            return null;
        }
    }
    
    /*
     * Writes the username and password to the input fields.
     * @username String with the username.
     * @password String with the password.
     */
    function writeToInputFields(username, password) {
        if(!loginElement || !passwordElement) {
            return null;
        }
        loginElement.setAttribute(attributeName, username);
        passwordElement.setAttribute(attributeName, password);
    }
}