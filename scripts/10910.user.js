// ==UserScript==
// @name         AlternateCSSSelector
// @namespace    http://www.heiselman.com/
// @description  Provides a menu to select alternate stylesheets
// @include      *
// ==/UserScript==

(function() {
    var div = document.createElement('div');  // div to hold our stuff
    var ie5 = (!document.addEventListener && document.attachEvent) ? 1 : 0;
    
    // Our replacement function
    function swapSheets() {
        var i, a, title;
        title = select.value;
        for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
            if (a.getAttribute("rel").indexOf("style") != 1 && a.getAttribute("title")) {
                a.disabled = true;
                if (a.getAttribute("title") == title) a.disabled = false;
            }
        }
    }
    
    // create a select control
    var select = document.createElement('select');
    
    if (ie5) {
        select.attachEvent('onchange', swapSheets);
    } else {
        select.addEventListener('change', swapSheets, false);
    }

    // populate the select with the stylesheets, finding the persistent one in use
    var i, a;
    for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && a.getAttribute("rel").indexOf("alt") != -1) {
            var option = document.createElement("option");
            option.setAttribute("value", a.getAttribute("title"));
            option.innerHTML = a.getAttribute("title");
            select.appendChild(option);
        }
    }
    
    if (select.options.length == 0) {
        // If we didn't find any stylesheets, then say so and don't create the select
        delete select;
        div.appendChild(document.createTextNode('No alternate stylesheets'));
    } else {
        // Provide an option for no styling
        var option = document.createElement('option');
        option.innerHTML = 'Basic Style';
        option.setAttribute('selected', 'selected');
        option.setAttribute('value', '');
        select.appendChild(option);

        // Add a label for the select and add both to the div
        var label = document.createElement('label');
        label.innerHTML = 'Alternate Stylesheets: ';
        div.appendChild(label);
        div.appendChild(select);
    }

    document.body.appendChild(div);  // put the div on in the document
})()