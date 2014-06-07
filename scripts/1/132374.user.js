// ==UserScript==
// @name aroz7 
// @version 0.1.1.0
// @description Fix players
// @include http://*.inn.co.il/Forum/Forum.aspx/*
// ==/UserScript==



   loadfunction= function() {
	URLscript=document.createTextNode("String.prototype.toHTMLS="+ssd);
	var Uscript = document.createElement('script');
	Uscript.setAttribute('language','javascript');
	Uscript.setAttribute('id','Ujs');
	document.body.appendChild(Uscript);
	document.getElementById('Ujs').appendChild(URLscript);
	
	
	}
	
	ssd = function ()
{	sString = this;if (!sString) return "";
	if (sString.indexOf("youtube")>-1) sString = sString.replace(/<a href=.*?youtube\.com\/watch\?v=([A-Za-z_\d\-]*).*?<\/a>/gi, '<div><embed src="http://www.youtube-nocookie.com/v/$1?fs=1&amp;hl=iw_IL" type="application/x-shockwave-flash" width="425" height="349" allowscriptaccess="never" allowfullscreen="true"></embed><div><a href="http://www.youtube.com/watch?v=$1">לצפיה ב-YouTube</a></div></div>');
	function rxescape (str) {return str.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, "\\$&");} 
	sString = sString.replace(/target=_top/g,"").replace(/(<A |<a)/g,"<A target=_blank ").replace(/<\/?\w+:[^>]*>/gi, "");

	var a = [[":-)","smile"],[":-D","vhappy"],[";-(","boche"],[":-(","sad"],[":-P","tongue"],[";-)","wink"],["(ישן)","k"],["(מחשב)","computer"],["(כוכב)","star"],["(בלון)","balon"],["(דוס)","dos"],["(חופר)","digg"],["(שורק)","shorek"],["(נשיקה)","remybussi"],["(נפנוף)","nifnuf"],["(מרחף)","h"],["(טלפון)","telphone"]];

	for (var i=0;i<a.length;i++){
	var sSmile=rxescape(a[i][0]); sString = sString.replace(new RegExp("("+sSmile+(sSmile.indexOf(";")==-1?"|"+sSmile.replace("\\-",""):"")+")","gi"),"<img src=\""+sStaticURL+"images/forum/smilies/"+a[i][1]+".gif\">")}

	sString =sString.replace(/<IMG.{0,50}src=\"http:\/\/forumpics\.a7\.org\/\?file=([0-9.jpg]*)\"[^>]*>/gi, " <a href=http://a7.org/?file=$1 target=_blank><IMG src=\"http://n2.a7.org/Resizer.ashx?image=$1&forum=1&a=500&save=1\"></a> ")
	
	var rx = /<a.{0,50}href=\"http:\/\/forumpics\.a7\.org\/\?file=([0-9]*.(mp3|wma))\"[^>]*>(.*?)<\/a>/gi;
	var d=sString.match(rx);
	var f= function(d)	{
		var c= d.replace(rx, "$1||$3").split("||");		
		var o = Players.New({url:"http://a7.org/?file="+c[0],title:"<a href=\"http://a7.org/?file="+c[0]+"\">"+c[1]+"</a>" },-1 ,{height:0,width:320});	
		sString =sString.replace(d, o.html); setTimeout(function(){o.Writed();},300)
	}

	if (d) for (var i=0;i<d.length;i++) f(d[i]);

	return sString;
}
loadfunction();