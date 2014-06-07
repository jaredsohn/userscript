// ==UserScript==
// @name           YYFC for Firefox
// @namespace      scottxp@126.com~2
// @include        http://www.yyfc.com/*
// ==/UserScript==

var obj = document.getElementById('players');
var url;
var params = obj.getElementsByTagName('param');
for (var i = 0; i < params.length; i++ ){
	if (params[i].name == 'url'){
		url = params[i].value;
		break;
	}
}
var str = '<embed width="355" height="68" border="0" align="baseline" invokeurls="0" defaultframe="datawindow" clicktoplay="0" enablecontextmenu="1" allowscan="1" transparentatstart="0" animationatstart="0" autorewind="0" autostart="1" showcaptioning="0" showgotobar="0" autosize="0" showstatusbar="1" showdisplay="0" showtracker="1" showaudiocontrols="1" showpositioncontrols="0" showcontrols="1" name="MediaPlayer" pluginspage="http://www.microsoft.com/isapi/redir.dll?prd=windows&amp;sbp=mediaplayer&amp;ar=media&amp;sba=plugin&amp;" type="application/x-mplayer2" src="' + url + '">';
obj.innerHTML = obj.innerHTML + str;