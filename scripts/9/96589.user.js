// ==UserScript==
// @name           Youtube Subscriptions Direct Userchannel Links +[mmb] support
// @fullname       Youtube Subscriptions Direct Userchannel Links +[mmb] support
// @namespace      http://userscripts.org/scripts/show/96589
// @description    Adds background rollover + > with a direct link to the corresponding youtube channel profile. Allows for quick [mmb] new tab opening of channel profile(s) and recently added video uploads page.
// @author         Rexalx, Cletus "http://userscripts.org/users/cletus" for initial script, Rexalx for idea and everything added on later.
// @include        http://www.youtube.com/my_subscriptions*
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/
// @icon           http://img834.imageshack.us/img834/5176/arrowmj.png
// @version	   0.0.6 13-02-2011
// @history        0.0.5 New support for [mmb] on subscription name,removes onclick +can change default view.
// @history        0.0.4 Extra css fixes.
// @history        0.0.3 Change of arrow, doesn't show up unless mouse is over channel name.
// @history        0.0.1 Initial script inception.
// ==/UserScript==

// 0.0 3 Arrow icon
var arrow = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/"+
"9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAwklEQVQ4jaWTrQoCURCFv1VYEKxWwSoI+hCCYLL6Ki"+
"aTyeQb+B4mwWQ1C4IYFoNYhc/gXRB/9+qBgYF7zmFmDjdR+Qelv9QFDOaAwAGovWSon6qibrxhoZ"+
"YfOd8MUJvqOZiMfzFAHQaDi9q7f0vUFGgVuNcE6AIZ0AH2+Q3qxmOppurPMVbzJmaFETAATmGFbb"+
"5CkerfjT+ITaGhHoN4Ghtjqq6DeJUfLsZgFsTHkNYTJ/H9bywD7dBnwO4V6ZNBIVwBljS3VZqmVc"+
"cAAAAASUVORK5CYII=";

// 0.0.1 Get all elements
var elements = document.querySelectorAll('.name');
var el, match, i;
for (i = 1; i < elements.length; i++) {
	// create new link
	el = document.createElement('a');
	// add small arrow
	el.innerHTML = '<img class="arrowstyle" src="' + arrow + '"/>';
	// find users name and set link location
	match = (elements[i].textContent.match(/(\w+)/i))[0];
	el.setAttribute('href', 'http://www.youtube.com/user/' + match);
	// style to move arrow to right location
	el.setAttribute('style', 'display: inline-block; float: right; margin: -25px 0 0; ');
	// add new links to page
	elements[i].parentNode.appendChild(el);
}

//0.0.5 Removes subscription onclick and replaces with href url and the onclick subscription id.
//Change ending url string (dm='') for a different default youtube channel video subscription display...
//dm=0 for list view 
//dm=1 for expanded detail list view (the default)
//dm=2 for thumbnail view.. 

var sub_links=document.evaluate("//a[contains(@onClick, 'changeSubscription(')]",document,null,6,null);
for(var i=0,p; (p=sub_links.snapshotItem(i)); i++) {
p.href = 'http://www.youtube.com/my_subscriptions?s='+((p.getAttribute("onClick").slice(20,63)))+'&ps=20&sf=added&sa=0&sq=&dm=1';
p.removeAttribute("onClick");
}

// 0.0.4 Changes below...
GM_addStyle((<><![CDATA[
.arrowstyle {
padding: 4px 5px 3px 120px;
margin: -5px -10px -4px -5px;
}
.arrowstyle:hover {
border:1px solid #c5c5c5;
border-left:none!important;
padding: 4px 4px 3px 120px;
margin: -6px -10px -4px -5px;
background-image: -moz-linear-gradient(left, #fff, #eee);
}
]]></>).toString());