// ==UserScript==
// @id             Subeta - Auto Train
// @name           Subeta - Auto Train
// @version        1.0
// @namespace      
// @author         Subeta Bots
// @description    
// @include        http://subeta.net/explore/train.php
// @run-at         document-end
// ==/UserScript==

var arrInputs = document.getElementsByTagName('input');
for (var i = 0; i < arrInputs.length; i++) {
    if (arrInputs[i].type == 'submit' && arrInputs[i].value.indexOf(' is Done!') > -1)
        arrInputs[i].click();
    if (arrInputs[i].type == 'submit' && arrInputs[i].value.indexOf('Train your Pet') > -1)
        arrInputs[i].click();
}

var arrAnchors = document.getElementsByTagName('a');
for (var i = 0; i < arrAnchors.length; i++) {
    if (arrAnchors[i].href.indexOf('train.php') > -1 && arrAnchors[i].innerHTML == 'Back')
        window.location.href = arrAnchors[i].href;
}

var htmldata = document.getElementsByTagName('body')[0].innerHTML;
if (htmldata.indexOf('This pet is in training in') > -1) {
    var arrElements = document.getElementsByClassName('sp-table');
    for (var i = arrElements.length - 1; i >= 0 ; i--) {
        if (arrElements[i].innerHTML.indexOf('This pet is in training in') > -1) {
            arrElements[i].innerHTML = arrElements[i].innerHTML.replace('! It has ', '! It has <span id="customMin">');
            arrElements[i].innerHTML = arrElements[i].innerHTML.replace(' minutes left!', '</span> minutes left!');
            document.getElementById('customMin').innerHTML = document.getElementById('customMin').innerHTML.substring(3, document.getElementById('customMin').innerHTML.indexOf('</b>'));
            setTimeout("window.location.href = 'http://subeta.net/explore/train.php';", (parseInt(document.getElementById('customMin').innerHTML)) * 60000);
            document.getElementById('customMin').setAttribute('style', 'font-weight:bold;');
            
            break;
        }
    }
}