// karmadroch addon for leprosorium.ru
// version 0.11
// Copyright (c) 2011-2013, Be3HOrNM
// Released under the GPL license
// main script here http://userscripts.org/scripts/show/94408
// --------------------------------------------------------------------
// #48684
// ==UserScript==
// @name           Username aggregator
// @description karmadroch for leprosorium.ru addon Username aggregator
// @ujs:category site: automation
// @ujs:documentation n/a
// @ujs:download n/a
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/**
// ==/UserScript==
// Add jQuery


function sort_users(a,b){
		return (a.username < b.username) ? -1 : 1;
}

function unique_users(arr) {  
     var ret = [arr[0]];  
     for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate  
         if (arr[i-1].username !== arr[i].username) {  
             ret.push(arr[i]);  
         }  
     }  
     return ret;  
 }  


function Match(text, pattern){
	var m = text.match(pattern);
	if (m == null) 
		return null;
	return m[1];
}

    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {

            var GM_Head2 = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ2 = document.createElement('link');
            GM_JQ2.href= 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/jquery-ui.css';
            GM_JQ2.type = 'text/css';
	    GM_JQ2.rel = 'stylesheet';
            GM_JQ2.async = true;
            GM_Head2.insertBefore(GM_JQ2, GM_Head2.firstChild);


            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);


            var GM_Head1 = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ1 = document.createElement('script');
            GM_JQ1.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js';
            GM_JQ1.type = 'text/javascript';
            GM_JQ1.async = true;
            GM_Head1.insertBefore(GM_JQ1, GM_Head1.firstChild);


        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 1000);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
//            letsJQuery();
        }
    }

xpathOneEx = function(query, root) {
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
xpathOne = function(query) {
    return xpathOneEx(query, document);
}
xpathMany = function(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

addButton = function(title, onClick) {
	var elButton = document.createElement('div');
	var elButton1 = document.createElement('div');
	elButton.innerHTML = "<a href='' onclick='return false;'>" + title + "</a>";
	elButton.childNodes[0].addEventListener("click", onClick, false);
	panel = xpathOne('//*[@id="tags_add"]')
	panel.appendChild(elButton);
	elButton1.innerHTML = '<br/><textarea id="usernames1" wrap="hard" readonly="yes" id="usernames1" cols=55 rows=10 style="font-size:9px"></textarea><br/>Ads: <a href="http://userscripts.org/scripts/show/94408">Поставь скрипт лепрокармадроч!</a>';
	panel.appendChild(elButton1);


}

sortComments = function() {
		$('#usernames1').val("");
	var tVal, username1,karmajson;
	var comments = xpathMany("//div[@id='js-commentsHolder']/div[contains(@class,'post')]");
	var a = Array();
	var b = Array();
	for (var i = 0; i < comments.snapshotLength; i++) {
		var elm = comments.snapshotItem(i);
		username1 = xpathOneEx("div//div[@class='p']/a", elm).innerHTML;
//		$('#usernames1').val($('#usernames1').val()+ username1+', ');
		a[i] = {'username': username1};
	};
	a=a.sort(sort_users);
	a=unique_users(a);
  	for (i = 0; i < a.length; i++) {
		$('#usernames1').val($('#usernames1').val() + a[i].username + ', ');
	};

	return false;

}

addButton('Собрать юзернеймов с поста', sortComments);