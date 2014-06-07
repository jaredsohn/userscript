// ==UserScript==
// @name           What?s that look like?
// @namespace      google.com
// @description    Gives a preview of a stylesheet on what.cd without reloading the page
// @include        http*://*what.cd/user.php?action=edit&userid=*
// ==/UserScript==
// http://coldxstorage.googlepages.com/darkwood.css

//Removes all stylesheets from the page
function killStyle() {
    var stylesheets = document.getElementsByTagName("link");
    for (var i=0; i<stylesheets.length; i++) {
        if (stylesheets[i].rel == 'stylesheet') {
            stylesheets[i].parentNode.removeChild(stylesheets[i]);
        }
    }
}

//Gives the URL to a stock stylesheet
function stockStyleUrl(id) {
    id *= 1; //Make sure it's an integer
    switch (id) {
        case  1: return 'static/styles/anorex/style.css';
        case  2: return 'static/styles/layer_cake/style.css';
        case  5: return 'static/styles/kuro/style.css';
        case  6: return 'static/styles/shiro/style.css';
        case  7: return 'static/styles/whatlove/style.css';
        case  8: return 'static/styles/bluebit/style.css';
        case  9: return 'static/styles/proton/style.css';
        case 10: return 'static/styles/whatnificent/style.css';
        case 11: return 'static/styles/hydro/style.css';
        case 15: return 'static/styles/decibel/style.css';
        case 16: return 'static/styles/dark_ambient/style.css';
        case 17: return 'static/styles/minimal/style.css';
        case 18: return 'static/styles/eye_candy/style.css';
        case 19: return 'static/styles/zeal/style.css';
    }
    return '';
}

//Inserts the currently selected stylesheet
function preview() {
    killStyle();
    //Puts a new style in
    var url;
    if (document.getElementById("styleurl").value.length > 0)
        url = document.getElementById("styleurl").value;
    else
        url = stockStyleUrl(document.getElementById("stylesheet").value);
    
    var newStyle = '<link href="static/styles/global.css" rel="stylesheet" type="text/css" />'; //Global style
    newStyle += '<link href="'+url+'" rel="stylesheet" type="text/css" />';
    document.getElementsByTagName("head")[0].innerHTML += newStyle;
}

document.getElementById("styleurl").addEventListener("blur", preview, false);
document.getElementById("stylesheet").addEventListener("change", preview, false);