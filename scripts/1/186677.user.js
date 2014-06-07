// ==UserScript==
// @name       imas-cg MM Checker Easily Viewable
// @namespace  http://aycabta.github.io/
// @version    0.1.0
// @description  Replace `select` tag with radio buttons
// @match      http://cg.rdy.jp/tchecker.php
// @copyright  2013+, Code Ass
// ==/UserScript==

(function() {
    var radios = document.createElement('ul');
    var i;
    var cgs = document.getElementsByTagName("option");
    for (i = 0; i < cgs.length; i++) {
        var cg = cgs[i];
        if (cg.value == '0') {
            continue;
        }
        var li = document.createElement('li');
        newRadioButton = document.createElement('input');
        newRadioButton.type = "radio";
        newRadioButton.name = "name";
        newRadioButton.value = cg.value;
        li.appendChild(newRadioButton);
        li.appendChild(document.createTextNode(cg.value));
        radios.appendChild(li);
    }
    var form = document.getElementsByTagName("form")[0];
    form.insertBefore(radios, form.firstChild);
    select = form.getElementsByTagName('select')[0];
    form.removeChild(select.nextElementSibling);
    form.removeChild(select);
})();
