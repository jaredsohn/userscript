// ==UserScript==
// @name           PHPPortalen Notifier
// @namespace      phppNotifier
// @description    Notifierar via sidans titel (likt facebook) när nya inlägg upptäckts i forumet.
// @author         miii
// @include        http://www.phpportalen.net/*
// @version        1.0.0
// ==/UserScript==

// Interval
i = 30000;

function q(){var a;if(window.XMLHttpRequest){a=new XMLHttpRequest}a.onreadystatechange=function(){if(a.readyState==4&&a.status==200){var b=a.responseText;var c=b.match(/templates\/phpportalen\/images\/folder_(solved_)?new.gif/g);var d=b.match(/templates\/phpportalen\/images\/folder_self_(solved_)?new.gif/g);var e="";if(c!==null){e+="("+c.length+") "}if(d!==null){e+="["+d.length+"] "}if(e.length<1){document.title=t}else{document.title=e+t}}};a.open("GET","http://www.phpportalen.net/search.php?search_id=newposts",true);a.send();window.setTimeout(q,i)}t=document.title;q()