// ==UserScript==
// @name           create new after first manual action
// @namespace      http://userscripts.org/topics/20707
// @description    uses split to pick and rebuild
// @version        0.2.5
// @include        http://awesome.tld/auth.cgi/*&one=remind
// ==/UserScript==


var myUrl = document.URL;
var myUnique = document.location.toString().split("auth.cgi/")[1].split("/")[0];
var mySid = document.location.toString().split("sid=")[1].split("&")[0];
var switchTO = 'http://'+document.domain+'/auth.cgi/'+myUnique+'/?sid='+mySid+'&one=make_some;

// don't need with new include
// if (location.search.indexOf(encodeURI(detectREMIND)) == 1)
	alert(switchTO);
	window.location(switchTO);


// BORKED last step

// edit: no, it's even more BORKED than I though.  switchTO shows in alert:
// originalURL + /auth.cgi/'+myUnique+'/?sid='+mySid+'&one=make_some
//
