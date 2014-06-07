// ==UserScript==
// @name       Giphy working
// @version    0.4
// @description  enter something useful
// @updateurl  
// @include       *
// @copyright  
// ==/UserScript==


 
var content = document.getElementById("wrapper");
content.tabIndex = "0";
content.focus();
 
document.onkeydown = showkeycode;
function showkeycode(evt){
    var keycode = evt.keyCode;
       switch (keycode) {
            case 65: //a
                document.getElementById("G").click();
                document.getElementById("mturk_form").submit();
                break;
            case 83: //s
                document.getElementById("PG").click();
                document.getElementById("mturk_form").submit();
                break;
            case 68: //d
                document.getElementById("PG-13").click();
                document.getElementById("mturk_form").submit();
                break;
            case 70: //f
                document.getElementById("R").click();
                document.getElementById("mturk_form").submit();
                break;
            case 71: //g
                document.getElementById("NSFW").click();
                document.getElementById("mturk_form").submit();
                break;
            case 13: //enter
                document.getElementById("mturk_form").submit();
                break;
    }
}
