// ==UserScript==
// @name          Stoplight Party
// @namespace     
// @description   Change the background color of a Facebook profile to reflect that person's relationship status
// @include       http://www.facebook.com/*
// ==/UserScript==

var ths = document.getElementsByTagName('th');
for (i=0; i<ths.length; i++) {
    if (ths[i].innerHTML == 'Relationship Status') {
        var status = ths[i].nextSibling.innerHTML;

        switch(status) {
            case 'Single':
            case 'Divorced':
            case 'Widowed':
                document.body.style.backgroundColor = "#D4FFD7"
                break;
            case "It's complicated":
            case 'In an open relationship':
            case 'Separated':
                document.body.style.backgroundColor = "#FBFFD4"
                break;
            default:
                document.body.style.backgroundColor = "#FFD4D4"
                break;
        }
    }
}

