// ==UserScript==
// @name       EkşiNavigator
// @namespace  http://www.mbeydogan.com/eksinavigator
// @version    0.1
// @description "Ekşisözlük'te entry içerisinde klavyenin sağ ve sol ok tuşları ile sayfalar arısında geçiş yapmanızı sağlayan bir scripttir" 
// @match      http*://*.eksisozluk.com/*  
// @copyright  2013+,
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


document.addEventListener('keydown', function(event) {
    var href = "";
    var f = false;
    if(event.keyCode == 37) {
       f = true;
       href = ($(".prev").attr('href'));
    }
    else if(event.keyCode == 39) {
       	f = true;
        href = ($(".next").attr('href'));
    }
        
        if(f){
			var h =  addParameter(window.location.href, "p", href.split("p=")[1]);     
        	window.location.href = h;
        }
});

function addParameter(url, param, value) {
    // Using a positive lookahead (?=\=) to find the
    // given parameter, preceded by a ? or &, and followed
    // by a = with a value after than (using a non-greedy selector)
    // and then followed by a & or the end of the string
    var val = new RegExp('(\\?|\\&)' + param + '=.*?(?=(&|$))'),
        parts = url.toString().split('#'),
        url = parts[0],
        hash = parts[1]
        qstring = /\?.+$/,
        newURL = url;

    // Check if the parameter exists
    if (val.test(url))
    {
        // if it does, replace it, using the captured group
        // to determine & or ? at the beginning
        newURL = url.replace(val, '$1' + param + '=' + value);
    }
    else if (qstring.test(url))
    {
        // otherwise, if there is a query string at all
        // add the param to the end of it
        newURL = url + '&' + param + '=' + value;
    }
    else
    {
        // if there's no query string, add one
        newURL = url + '?' + param + '=' + value;
    }

    if (hash)
    {
        newURL += '#' + hash;
    }

    return newURL;
}