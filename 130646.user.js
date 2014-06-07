// ==UserScript==
// @name           FF Emoticons
// @namespace      http://www.kaisercrazy.com/
// @description    Friendfeed Emoticons
// @include        http://friendfeed.com/
// @include        http://friendfeed.com/*
// @version        0.2.9
// ==/UserScript==

var serkan = function () {
$(document).ready(function() {
    var strNewString = $('body').html().replace(/\&lt;3/g,'<img src="http://kaisercrazy.com/emot/heart.png" />').replace('^^','<img src="http://kaisercrazy.com/emot/^^.png" />').replace('^.^','<img src="http://kaisercrazy.com/emot/^^.png" />').replace (':)','<img src="http://kaisercrazy.com/emot/smile.png" />').replace (':(','<img src="http://kaisercrazy.com/emot/sad.png" />').replace (';)','<img src="http://kaisercrazy.com/emot/wink.png" />').replace (':D','<img src="http://kaisercrazy.com/emot/laugh.png" />').replace (':p','<img src="http://kaisercrazy.com/emot/pp.png" />').replace (':P','<img src="http://kaisercrazy.com/emot/pp.png" />').replace ('o.O','<img src="http://kaisercrazy.com/emot/oo1.png" />').replace ('o_O','<img src="http://kaisercrazy.com/emot/oo1.png" />').replace ('o.o','<img src="http://kaisercrazy.com/emot/oo1.png" />').replace (':P','<img src="http://kaisercrazy.com/emot/pp.png" />').replace ('xD','<img src="http://kaisercrazy.com/emot/xd.png" />').replace ('xd','<img src="http://kaisercrazy.com/emot/xd.png" />').replace (':\'(','<img src="http://kaisercrazy.com/emot/cry.png" />');
    $('body').html(strNewString);
});

};

// Inject our serkan script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + serkan.toString() + ')();';
document.body.appendChild(script);
