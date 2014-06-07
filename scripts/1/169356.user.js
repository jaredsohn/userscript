// ==UserScript==
// @name        Remove locked games from epicmafia
// @namespace   explodes made a better one
// @description removes locked games from lobby
// @include     http://www.epicmafia.com/lobby
// @version     9
// @require http//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==
//setInterval(function(){$("div.randimg").parent().parent().remove()}, 1);
function lockedgame () {$('.gamerow:visible').each(function(index, row) {

var $row = $(row); 

var img = $row.find('img'); 

if (img.length) { 

    var src = img[0].src; 

    if (src.substring(src.length - 16, src.length) == '/images/lock.png') {

        $row.hide();

    }

}

});
}
setInterval(lockedgame, 100)