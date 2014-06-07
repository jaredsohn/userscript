// ==UserScript==
// @name           ifriends pics and vids
// @namespace      http://userscripts.org
// @description    !! thanks for JudgeHolden. CTRL+C in idea from JudgeHolden.
// @include        http://fanclubs.ifriends.net/*
// ==/UserScript==
//Updated: 25/02/2008

urlbaseavi = "http://avidarchives.ifriends.net/";
img = document.getElementsByTagName('img');
for(i=0; i<img.length; i++)
{
  if (img[i].src.indexOf('_12.jpg') != -1)
  {	
    src = img[i].src;
    bigsrc = src.replace("_12.jpg",".jpg");
	innerhtml =  '<img src="' + src + '">' + '<br><a href="' + bigsrc+ '" target="_blank">PIC BIG SIZE</a>';
	if (img[i].src.indexOf('avidarchives') != -1){
		vidsrc = src.replace(urlbaseavi,"");
		vidsrc = vidsrc.substr(0,2) + vidsrc.substr(3,2) + vidsrc.substr(5,vidsrc.length);
		index = vidsrc.lastIndexOf("_12.jpg");
		vidsrc = urlbaseavi + vidsrc.substr(0,index-1);		
	   innerhtml += '<br><a href="' + vidsrc+ '.flv">FLV</a> or <a href="' + vidsrc + '.asf">ASF</a>';
	}
     img[i].parentNode.innerHTML = 	innerhtml;
  }
}