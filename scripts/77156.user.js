// ==UserScript==
// @name          SorceForge untiBlock
// @namespace     http://www.ajl.ir/
// @description   unBlock Download section of SourceForge for "Blocked Countries"! 
// @include       *sourceforge.net/projects*
// ==/UserScript==


aloc=window.location.toString();
if (aloc.indexOf("/download")!= -1 )
{
	var lnk;
	for(var i=0;i<document.getElementsByTagName('a').length;i++){
		if(document.getElementsByTagName('a')[i].className == 'direct-download'){
			lnk=document.getElementsByTagName('a')[i]
			break;
		}
	}
	if(lnk)
	{
		var ti1,ti2,mirror,nurl;
		ti1=lnk.href.indexOf('use_mirror=')+11;
		ti2=lnk.href.indexOf('&',ti1);
		if(ti2==-1)
			mirror=lnk.href.substring(ti1);
		else
			mirror=lnk.href.substring(ti1,t2);
		nurl=lnk.href.split('?')[0];
		nurl=nurl.replace(/downloads/,mirror+'.dl');
			
		window.location.assign(nurl);
	}
}
