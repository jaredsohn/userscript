// ==UserScript==
// @name           fcukVK v1.0
// @namespace      *
// @include        http://vkontakte.ru/wall.php*
// ==/UserScript==

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function pausecomp(millis) 
{
	var date = new Date();
	var curDate = null;

	do { curDate = new Date(); } 
	while(curDate-date < millis);
}

var e=document.getElementsByTagName("div");
var arr = []; 
var wallId = gup("gid");

for(var i=0;i<e.length;i++)
{
	if (e[i].id.search(/wPostContainer/i) >= 0)
		arr.push(e[i].id);
}

for(i=0;i<arr.length;i++)
{
	arr[i] = parseInt(arr[i].replace(/wPostContainer/i, ""));
	unsafeWindow.reportSpamPost(arr[i], -wallId);
	pausecomp(500);
}