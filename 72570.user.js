// ==UserScript==
// @name           Better YTFavico
// @namespace      Mr. Derpison
// @description    Fix youtube's favicon
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @include        http://www.google.com/support/youtube/*
// @include        https://www.google.com/support/youtube/*
// ==/UserScript==


var faviconsrc = 'data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//////8AAAD//wAc7v8AHO7/AB3v/wAc7v8AHO7/ABzu/wAc7v8AHO7/ABzu/wAd7/8AHe//ABzu/wAc7/8AHe//AAD//wAA//8AAP///////wAA//////////////////8AAP//////////////////AAD//////////////////wAA//8AAP//AAD///////8AAP///////wAA////////AAD///////8AAP///////wAA////////AAD//wAA//8AAP//AAD//wAA////////AAD///////8AAP///////wAA////////AAD///////8AAP//////////////////AAD//wAA//8AAP///////wAA////////AAD///////8AAP//////////////////AAD//////////////////wAA//8AAP//AAD///////8AAP//AAD//wAA//8AAP//AAD///////8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//////////////////wAA//8AAP//AAD//wAA////////AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//9nZ/wAAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//9na/wD///8AAP//AACeuwAEBwcAlY0AAP///wAAe7wABQkLALE+AAD///8AAHvDAAIIDQCOLgAA1EUAAP///wD///8A////AAD//wASI/8AAAAA/52RAAAAlskAAAAATAAAAP8AAABMv4kEAAAAAEwAAAD/AAAAP3ElAAD///8A////AP///wAA//8AEiP/AAAAAP+nmAIAAK3NAAAAAP8AAAAAAAAA/6OZAAAAAAD/AKn/CQAAAP8AAAAA////AP///wD///8AAP//AACZvwAAAAD/rI4AAACqzQAAAAD/AgIEAAAAAP+omwAAAAAA/wAAARQAAAD/AAAAAP///wD///8A////AAByrgAAAAB/AAAA/wAAAH9mqJkAAAAAWQAAAP8AAABf/78BAwAAAP8AAAAUAAAA/wAAAAD///8A////AP///wAAAAA/AAAA/7QAmQAAAAD/AAAAPwCE1QAFCQsAtD8AAP///wAAAAAAAAAAAAAAAAAAAAAA////AP///wAAj9UAAAAA/wAAAACAFHoAAAAAAAAAAP/rnwAA////AP///wD///8A////AP///wD///8A////AP///wD///8AgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAA//8AAO7vAADtVwAA7VcAAO7XAADX/wAAu/8AAA==';



function trim(str) {
    return str.match(/^\W*(.*?)\W*$/)[1];
}

function remove(node) {
    if (node.parentNode)
        node.parentNode.removeChild(node);
}

var head = document.getElementsByTagName('head')[0];
var lns = head.getElementsByTagName('link');

for (var i = 0; i < lns.length; i++) {
    v = lns[i];
    var relval = trim(v.getAttribute('rel'));
    if (relval == 'shortcut icon' || relval == 'icon')
        remove(v);
}
var newln = document.createElement('link');

newln.setAttribute('rel', 'icon');
newln.setAttribute('href', faviconsrc);
head.appendChild(newln);