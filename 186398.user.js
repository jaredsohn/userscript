// ==UserScript==
// @name       Andy K Image Moderation
// @version    1.1
// @description  Andy K Image Moderation Hits
// @match      https://s3.amazonaws.com/mturk_bulk/hits*
// @copyright  2012+, You
// ==/UserScript==

var radios = document.getElementsByTagName("input");

document.onkeydown = showkeycode;
var content = document.getElementById("mturk_form");
content.tabIndex = "0";
content.focus();

var pic = document.getElementsByName("comment")[0];
pic.scrollIntoView(false);

function showkeycode(evt){
        var keycode = evt.keyCode;
        console.log(keycode);
        switch (keycode) {
            case 78: //n
                mark("n");
                break;
            case 89: //y
                mark("y");
                break;
            case 79: //o
                mark("o");
                break;
            case 191: // /
				alert("n, y, o");                    
                break;
            case 13: //enter
                var button = document.getElementById("submitButton");
                if (confirm("Submit?")) button.click();
                break;
            default: break;
        }
}

function mark(ans){
    switch (ans) {
        case "n":
            for (i = 0; i < radios.length; i++) {
                if (radios[i].type == "radio" && radios[i].value == "No"){
                    radios[i].checked = true;
                    break;
                }
            }
            break;
        case "y":
            for (i = 0; i < radios.length; i++) {
                if (radios[i].type == "radio" && radios[i].value == "Yes"){
                    radios[i].checked = true;
                    break;
                }
            }
            break;
        case "o":
            for (i = 0; i < radios.length; i++) {
                if (radios[i].type == "radio" && radios[i].value == "Other"){
                    radios[i].checked = true;
                    break;
                }
            }
            document.getElementsByName("comment")[0].focus();
            document.getElementsByName("comment")[0].value = "";
            break;
        default:
            console.log(ans);
            break;
    }
    var button = document.getElementById("submitButton");
    if (confirm("Submit?")) button.click();
}