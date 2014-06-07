// ==UserScript==
// @name          YouTube full screen
// @include       http://youtube.com/*
// @include       http://www.youtube.com/*
// ==/UserScript==

unsafeWindow.watchFull = watchFull;
unsafeWindow.hookLink = hookLink;
hookLink();


function hookLink(){
for(i=0;i<document.links.length;i++)
{
if(document.links[i].pathname=='/watch')
document.links[i].href='javascript:watchFull(\''+document.links[i].search+'\');';
}
setTimeout(hookLink,1000);
}

function watchFull(v)
{
xmlobj=new XMLHttpRequest();
xmlobj.open('GET','/watch'+v,false);
xmlobj.send(null);

urlstart = xmlobj.responseText.indexOf('var fs ') + 9;
urlend = xmlobj.responseText.indexOf(';',urlstart);
eval(xmlobj.responseText.substring(urlstart,urlend).replace('"FullScreenVideo"','"'+v+'"'));
}