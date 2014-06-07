// ==UserScript==
// @name           AllHomes Maps and Broadband
// @namespace      http://galliford.org/allhomes-addressinfo
// @include        http://www.allhomes.com.au/*
// @description    Adds links below property addresses on AllHomes, giving easy access to Google Maps, Live Maps, and YourBroadband information.
// ==/UserScript==

var x,e,i,m;
x=document.getElementsByTagName('h1');
for(i=0;i<x.length;i++){
	if(x[i].className=='address'){
		e=x[i];
		break
	}
}
if(!e){
	return(false)
}
m=/^\s*(([^,[<]*[^,\s[<])(?:,\s*([^-[<]*[^-\s[<]))?)/g.exec(e.innerHTML);
if(!m){
	return(alert('Unable to interpret address.'))
}
e.innerHTML=
	m[0] + '<br /><small>' +
	' [<a href="http://maps.google.com.au/?q='+encodeURIComponent(m[1])+'&z=19" target="_blank">Google Map</a>]' +
	' [<a href="http://maps.live.com.au/index.aspx?where1='+encodeURIComponent(m[1])+'" target="_blank">Live Map</a>]' +
	' [<form id="ybbform" action="http://yourbroadband.com.au/geocodeaddress.php" method="post" target="_blank"><input type="hidden" name="StreetAddress" value="'+m[2]+'"/><input type="hidden" name="Suburb" value="'+m[3]+'"/><input type="hidden" name="State" value="ACT"/></form><a href="http://yourbroadband.com.au/" onClick="javascript:document.getElementById('+"'"+'ybbform'+"'"+').submit();return false;">Broadband</a>]' +
	' </small>';