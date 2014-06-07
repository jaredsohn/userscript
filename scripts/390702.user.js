// ==UserScript==
// @name           CurrentRelease 
// @author		   Mordred666
// @description    Shows how many days ago this episode was released
// @include        http://sceper.ws/search/*
// ==/UserScript==


var metaclass = getElementByClass ("entry-content clearfix", document);

for(var i = 0; i < metaclass.length ; i++)
{
	var index = metaclass[i].innerHTML.indexOf("Release Date:");

	if(index != -1)
	{
		var s = metaclass[i].innerHTML.substring(index+21, index+41);
		s = s.substr(0,s.indexOf("<"));
				
		var diff =  Math.floor((Date.parse(new Date()) -  Date.parse(s) ) / 86400000);
		
		var indexS = metaclass[i].innerHTML.indexOf(s);
		
		diff = "&nbsp;&nbsp;&nbsp;&nbsp;<b>"+diff+" Days ago</b>";
		
		metaclass[i].innerHTML =  metaclass[i].innerHTML.substr(0, indexS+s.length) + diff + 
			metaclass[i].innerHTML.substr(indexS+s.length, metaclass[i].innerHTML.length);
	}
}




function getElementByClass (className, parent) 
{
  parent || (parent = document);
  var descendants= parent.getElementsByTagName('*'), i=-1, e, result=[];
  while (e=descendants[++i]) 
  {
    ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
  }
  return result;
}