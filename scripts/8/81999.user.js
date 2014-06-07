// ==UserScript==
// @name           Search Delicious on Google
// @namespace      http://www.google.co.jp/profiles/hyagni
// @description    This script shows the delicious search results of your account with the same keyword when you search the web with Google.
//
// @include        http://www.google.*/search*
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

// I'm using jQuery.
// Sorry, I know such userscript is not simple, not beautiful.

// Before using, please change here username to your own.
// When you search, you should log-in to get unshared items.(maybe)
var username = "YOURACCOUNT";

function ShowResult(responseDetails){
    w = document.getElementById('rhs');
    if( w == null){
        sib = document.getElementById('center_col');
        w = document.createElement('div');
        w.setAttribute('id','rhs');
        w.setAttribute('style','display: block; border-left:'+
                       '1px solid rgb(211, 225, 249); position: absolute;'+
                       'right: 0px; top: 0pt; width: 264px;');
        // this style is copied from a google result page.
        sib.parentNode.appendChild(w);
    } else {
        w.innerHTML = "";// clear contents
    }

    $(document).ready( function(){
        o_res = $(responseDetails.responseText);
        data = o_res.find("#srch0-bookmarklist").find("a.taggedlink");
        $('div#rhs').append(data);
        $('div#rhs a.taggedlink').wrap('<li></li>');
    });
}

(function (){
var input = document.evaluate('//input[@class="lst"]', document, null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var searchquery = encodeURI(input.singleNodeValue.value);
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://delicious.com/search?p='
        +searchquery.toString()+'&lc=1&context=userposts|'+
        username+'|',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html'
        },
    onload: ShowResult
});
}());