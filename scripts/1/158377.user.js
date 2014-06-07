// ==UserScript==
// @name          Credit Agricole - No Virtual Keyboard
// @namespace     org.bouil
// @description   Remove virtual keyboard and add a classic input text field for the password on Credit Agricole website https://www.*-enligne.credit-agricole.fr/stb/entreeBam
// @include       https://www.*-enligne.credit-agricole.fr/stb/entreeBam*
// @version       0.9
// @updateURL     http://userscripts.org/scripts/source/158377.user.js
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==
;
function addCustomCss(cssText) {
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = "<!-- ";
    style.innerHTML += cssText;
    style.innerHTML += " -->";
    document.head.appendChild(style);

};



var debug = false;

function main() {

    addCustomCss('input[type="password"]{background: url("../img/bg_form.png") repeat-x scroll 0 0 #FFFFFF;border-color: #7C7C7C #C3C3C3 #DDDDDD;border-style: solid;border-width: 1px;padding: 2px 0 0 4px;height:20px;}');

    var $form = $("form.ca-forms-stitre[name=formulaire]");
    var $divForm = $form.find(" table fieldset .blc-choix-wrap");
    var $blocPaveSaisieCode = $("#bloc-pave-saisis-code");

    var $label = $(document.createElement("label")).addClass("normal").text("Mot de passe :");

    $blocPaveSaisieCode.before($label);

    var $passwordField = $(document.createElement("input")).attr("type", "password").attr("size", "22").attr("tabindex",
                                                                                                             "2");
    $passwordField.attr("maxlength", "6").attr("style", "margin-left: 2px; float: right;").attr("placeholder",
                                                                                                "mot de passe");

    $divForm.find("input[name=CCPTE]").attr("style", "float:right").attr("placeholder", "n° de compte");

    $blocPaveSaisieCode.before($passwordField);

    var $valider = $("span.droite a[tabindex=28]");
    var $button = $(document.createElement("a")).text("Confirmer");
    $button.addClass("droite").addClass("gm").attr("tabindex", "28");
    $valider.after($button);

    if (!debug) {
        $valider.hide();
        $blocPaveSaisieCode.hide();
    }

    $button.on("click", function () {
        var password = $passwordField.val();
        for (var s = 0; s < password.length; s++) {
            $blocPaveSaisieCode.find("a:contains(" + password[s] + ")").click();
        }
        document.location = $valider.attr("href");
    });


    var scriptName= GM_info.script.name
    var version = GM_info.script.version;

    var $baseline = $(document.createElement("fieldset"));
    $baseline.addClass("blc-choix");
    var $divBaseline = $(document.createElement("div")).addClass("nomarge").addClass("blc-choix-wrap").attr("style", "padding-bottom: 40px;");
    var $titreBaseline = $(document.createElement("h3")).text(scriptName);
    $divBaseline.append($titreBaseline);
    var $pBaseline = $(document.createElement("p")).text("Version " + version);
    $divBaseline.append($pBaseline);
    $baseline.append($divBaseline);

    $form.find(" table fieldset").last().after($baseline);

};

main();