// ==UserScript==
// @name          Credit Agricole Lorraine - No Virtual Keyboard
// @namespace     org.bouil
// @description   Remove virtual keyboard and add a classic input text field for the password on Credit Agricole Lorraine website https://www.lorraine-enligne.credit-agricole.fr/
// @include       https://www.lorraine-enligne.credit-agricole.fr/g1/ssl/navigation/identification*
// @version       0.9
// @updateURL     http://userscripts.org/scripts/source/158355.user.js
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==
;


function main() {
    var $form = $("form[name=form_ident]");

    $passwordField = $(document.createElement("input")).attr("type", "password");
    $passwordField.attr("maxlength", "6").attr("style", "margin-left: 2px;").attr("placeholder", "mot de passe");

    $form.append($passwordField);

    $button = $(document.createElement("a")).attr("href", "#").text("login");
    $button.attr("style", "padding: 3px; margin-left: 6px; border: 2px solid white; background-color: #30B3AD; color: white;");
    $form.append($button);

    $("#zoneSaisieClavier table").hide();

    $button.on("click", function () {
        password = $passwordField.val();
        for (s = 0; s < password.length; s++) {
            $form.find("#chiffre_" + password[s]).click();
        }
        var $validate = $form.find("input[type=Image]");
        $validate.click();
    });

};

main();