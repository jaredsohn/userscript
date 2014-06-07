// ==UserScript==
// @name           UserStyles Total Install Count
// @description    Tells you how many times your styles were installed in total.
// @namespace      #
// @include        http://*userstyles.org/users/*
// @version        0.1
// ==/UserScript==
document.title=0;var tags=document.getElementById("style-list").getElementsByTagName("a");for(i=0;i<tags.length;i++){GM_xmlhttpRequest({method:'GET',url:tags[i].href,onload:function(a){try{var z=parseInt(a.responseText.match(/[0-9]+ total/g)[0].replace(" total",""))}catch(e){var z=0}document.title=parseInt(document.title)+z;if(i==tags.length)document.title+=" Installs"}})}