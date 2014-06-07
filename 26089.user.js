// ==UserScript==
// @name           AwfulYearbook Username Search
// @namespace      http://www.mathemaniac.org
// @namespace      http://awfulyearbook.com/user/view/50339
// @include        http://www.awfulyearbook.com/*
// @include        http://awfulyearbook.com/*
// @include        http://forums.somethingawful.com/member.php?action=getinfo&awfulyearbook=1&username=*
// ==/UserScript==
if ((document.location+"").match(/somethingawful\.com.+awfulyearbook=1/)) {
    var il = document.evaluate('//input[@name="userid"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    var userId = il.iterateNext().getAttribute('value');
    document.location = 'http://awfulyearbook.com/user/view/'+userId;
} else {
    var il = document.evaluate('//ul[contains(@class,"mainmenu")]/li/a[@href="http://awfulyearbook.com/user/view/random"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    var randomuser = il.iterateNext().parentNode;
    var features = randomuser.parentNode;
    var searchLi = document.createElement('li');
    var searchLink = document.createElement('a');
    searchLink.href = '#';
    function searchClickHandler(event) {
        var user = prompt("For whom do you wish to search?","");
        if (user) {
            document.location = "http://forums.somethingawful.com/member.php?action=getinfo&awfulyearbook=1&username="+user;
        }
        event.preventDefault();
    }
    searchLink.addEventListener('click',searchClickHandler,true);
    searchLink.appendChild(document.createTextNode('Search'));
    searchLi.appendChild(searchLink);
    searchLi.appendChild(document.createTextNode(' -'));
    features.insertBefore(searchLi,randomuser.nextSibling);
}
