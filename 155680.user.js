// ==UserScript==
// @name       bhw
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*.blackhatworld.com/blackhat-seo/*
// @require	 http://userscripts.org/scripts/source/85365.user.js
// @copyright  2012+, You
// ==/UserScript==

var $ = unsafeWindow.jQuery;
elements = document.URL.split('.')
ss = elements[elements.length-2].split('-')
if(String(parseInt(ss[ss.length-1])) == 'NaN'){
    user = $('.postbit .username_container a.username')[0].text;
    paintUser(user);
} else {
    
    ss.pop()
    ss = ss.join('-')
    elements[elements.length-2] = ss
    new_url = elements.join('.')
    
    GM_xmlhttpRequest({
        method: "GET",
        url: new_url,
        onload: function(response) {
            user = $(response.responseText).find('.postbit .username_container a.username')[0].text;
            console.log('==>' + user)
            paintUser(user);
        }
    });
    
}

function paintUser(user) {
    $('.postbit .username_container a.username').each(function(){
        if(this.text  == user){
            $(this).css('color', 'red');
            $(this).parent().parent().parent().parent().parent().parent().css('border', '3px solid red');
        }
    })
}

