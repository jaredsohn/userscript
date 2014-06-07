// ==UserScript==
// @name          	Pardus Overlay
// @namespace     http://userscripts.org
// @description	Interface for opening new pages inside the current page of the game Pardus
// @author 		Yog
// @version	0.99
// @include	http://*.pardus.at/*

// ==/UserScript==
if (document.location.href.match(/orion.pardus.at|artemis.pardus.at|pegasus.pardus.at/) && !(document.location.href.match(/msgframe.php|menu.php/))) {
var atag = document.getElementsByTagName('a');

for(var i = 0; i < atag.length; i++)
{
if (!(atag[i].hasAttribute('onclick') || atag[i].href.match(/main.php|javascript|scrap|accept.php|premium|page|orderby/)) || atag[i].href.match(/entersb/)) {
var framelink = atag[i].getAttribute('href'); 
var aholder = document.createElement("span");
var atrigger = document.createElement("div");
atag[i].parentNode.insertBefore(aholder,atag[i].nextSibling);
aholder.innerHTML = '&nbsp;';
aholder.appendChild(atrigger)
aholder.setAttribute("style", "line-height:0px; position:relative");
atrigger.setAttribute('onclick', 'showodp(\'' + framelink + '\')');
atrigger.setAttribute("style", "height:16px; padding-left:19px; position:absolute; top:-1px; left:0px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAQCAYAAABUWyyMAAAAK3RFWHRDcmVhdGlvbiBUaW1lAFd0IDI3IGt3aSAyMDEwIDAyOjI2OjM5ICswMTAwjjV2oQAAAAd0SU1FB9oEHA8TF3leWGYAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAAC30lEQVR42r1Wz2sTQRR+b3aSDUmIQYpGe+hBq0GF3loR68GCCB70ItW/wKOCHgsW61FB/wLxJB4UFTzVgyCC9aSCbaQerKW12NRi0mQ3u5sZ3+zO6pr+SEqTPPiYHzv75vvmzbwZHLh6/Q0AnIQmJut1Bw3j1Mf7d6eajd2uEQeTilc74cH1z681NjO++qUwtvvI0Vy7RWjL7ZgHrYYk3GxhMtkhEYpD30558LBy+917UwgxyRgbbuZESllBxJGx44Nt32b5l1W1zSYJTXmQVQgjhXPJKR75mFMifnxfLM5/nSsCgsSQOABzrWpvLJH8mUwn3WODA3nqPktouxAIttlwDOVynEBzW9S2CUmilK6XijmW2jUvmFm2JQ6FPHijFyXixcMnM9E+gxuJdE8m71rOXCaTmdVCOmokopg16rNU/U0oEdLSq+11rMV+9FZL0HPwre3xoXA8X+9CBQIYQegOEXSiDk7XTOq5E5qnC1KUhF0GJupK2GJ0MN/ECYuICAy1d/n3WzeFxAjLUoiyqK2RHq+MEpe2FEJEMdIUEYfdNoNgao4xXxAiw1gCmJlOIcreLYU0iGg0hO6ZEhLXIhRPE5UQbgKLp9LUXi/k1/Tn8TsXzo/fePYc3Jq1P7Mne8hnjAFvcgD6jNQ7RNoLeSw9yo8feFAAUV7Z57jFfkTSwxhItwbSswEZB+RxJS7bKOQS3ZT2lYlbH6j+jccTK45VWyDiQqXgSDA8e606Q1nLbLcKem4s0GXo80hde+rzoBS7zCx7noQYtJKG5KYD9aQjpXB5tnfaC7bdPyHk5LGqXLw82qdKxtC2y1ZBr5KKQHi4VVt06rCHPPJnJnwewHiVZ3KfINheCuF94kePljjWGJGNLDwf0ezFAshuZa3wPKrFdCBIOlyXru7bUIivdPD0icMKLUzkdUiA77ci2BGFVsf/l4XovTVKRSu3tvr5Hr21Kp1QQu+tbfGgt1blD8yRJVLcil04AAAAAElFTkSuQmCC) no-repeat 0px center;");
}
}

(function() {
var js = "function showodp(framelink) {"
+ " var icontainer = document.createElement('div');"
+ " document.body.appendChild(icontainer);"
+ "if (framelink.match(/drop|distresscall|equipment|transfer|crew|sendmsg/)) icontainer.setAttribute('style', 'overflow:visible; background-color:transparent; width:600px; height:400px; position:fixed; left:50%; margin-left:-300px; bottom:0px; border:2px solid #002248; border-bottom-width:0px; outline:1px solid #000;');"
+ "else icontainer.setAttribute('style', 'overflow:visible; background-color:transparent; width:92%; height:96%; position:fixed; left:50%; margin-left:-46%; bottom:0px; border:2px solid #002248; border-bottom-width:0px; outline:1px solid #000;');"
+ " for(var j = 0; j < 4; j++) { "
+ "if (document.getElementById('closecontainer' + j) == null) {"
+ " icontainer.setAttribute('id', 'closecontainer' + j);"
+ "}"
+ "else {"
+ " j=j+1;"
+ " icontainer.setAttribute('id', 'closecontainer' + j);"
+ "}"
+ "break;"
//+ "if (document.getElementById('closecontainer' + j) == null) break;"
+ "}"

+ " var nametag = document.createElement('div');"
+ " icontainer.appendChild(nametag);"
+ " nametag.innerHTML = framelink;"
+ " nametag.setAttribute('style', 'font-size:18px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAKXRFWHRDcmVhdGlvbiBUaW1lAE4gNyBtYXIgMjAxMCAwMjoyMzo0MyArMDEwMEb5NjsAAAAHdElNRQfaAwcBGx1u9Br0AAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpj4JBQOwMAAYUBE5v7PbkAAAAASUVORK5CYII=); line-height:25px; padding:2px 20px; position:absolute; left:-10px; top:-10px; border:1px solid #1A3048; outline:1px solid #000');"

+ " var closetag = document.createElement('div');"
+ " icontainer.appendChild(closetag);"
+ " closetag.innerHTML = '&#215;';"
+ " closetag.setAttribute('style', 'color:#55B2F3; font-size:36px; text-align:center; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAKXRFWHRDcmVhdGlvbiBUaW1lAE4gNyBtYXIgMjAxMCAwMjoyMzo0MyArMDEwMEb5NjsAAAAHdElNRQfaAwcBGx1u9Br0AAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpj4JBQOwMAAYUBE5v7PbkAAAAASUVORK5CYII=); line-height:24px; width:50px; height:25px; position:absolute; right:15px; top:-10px; border:2px solid #1A3048; outline:1px solid #000');"
+ " closetag.setAttribute('onclick', 'closeframe('+ j +')');"

+ " var mintag = document.createElement('div');"
+ " icontainer.appendChild(mintag);"
+ " mintag.innerHTML = '&#8212;';"
+ " mintag.setAttribute('style', 'color:#55B2F3; font-size:40px; text-align:center; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAKXRFWHRDcmVhdGlvbiBUaW1lAE4gNyBtYXIgMjAxMCAwMjoyMzo0MyArMDEwMEb5NjsAAAAHdElNRQfaAwcBGx1u9Br0AAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpj4JBQOwMAAYUBE5v7PbkAAAAASUVORK5CYII=); line-height:30px; width:50px; height:25px; position:absolute; right:72px; top:-10px; border:2px solid #1A3048; outline:1px solid #000');"
+ " mintag.setAttribute('onclick', 'minframe('+ j +')');"
+ " mintag.setAttribute('id', 'minbutton');"

+ " var widetag = document.createElement('div');"
+ " icontainer.appendChild(widetag);"
+ " widetag.innerHTML = '&#8596;';"
+ " widetag.setAttribute('style', 'color:#55B2F3; font-size:36px; text-align:center; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAKXRFWHRDcmVhdGlvbiBUaW1lAE4gNyBtYXIgMjAxMCAwMjoyMzo0MyArMDEwMEb5NjsAAAAHdElNRQfaAwcBGx1u9Br0AAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpj4JBQOwMAAYUBE5v7PbkAAAAASUVORK5CYII=); line-height:20px; width:50px; height:25px; position:absolute; right:129px; top:-10px; border:2px solid #1A3048; outline:1px solid #000');"
+ " widetag.setAttribute('onclick', 'wideframe('+ j +')');"

+ " var hightag = document.createElement('div');"
+ " icontainer.appendChild(hightag);"
+ " hightag.innerHTML = '&#8597;';"
+ " hightag.setAttribute('style', 'color:#55B2F3; font-size:26px; text-align:center; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAKXRFWHRDcmVhdGlvbiBUaW1lAE4gNyBtYXIgMjAxMCAwMjoyMzo0MyArMDEwMEb5NjsAAAAHdElNRQfaAwcBGx1u9Br0AAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpj4JBQOwMAAYUBE5v7PbkAAAAASUVORK5CYII=); line-height:22px; width:50px; height:25px; position:absolute; right:186px; top:-10px; border:2px solid #1A3048; outline:1px solid #000');"
+ " hightag.setAttribute('onclick', 'highframe('+ j +')');"

+ " var iframetag = document.createElement('iframe');"
+ " icontainer.appendChild(iframetag);"
+ " iframetag.setAttribute('style', 'overflow:visible; background-color:transparent; width:100%; height:100%; border:0px;');"
+ " iframetag.setAttribute('src', framelink);"
+ "}"

+ "function closeframe(j) {"
+ " var box = document.getElementById('closecontainer'+j);"
+ " box.parentNode.removeChild(box);"
+ "}"
+ "function minframe(j) {"
+ " var box = document.getElementById('closecontainer'+j);"
+ " var minb = document.getElementById('minbutton');"
+ "	if (box.style.height == '20px'){"
+ "		box.style.height = '400px';"
+ "		minb.innerHTML = '&#8212;';}"
+ "	else {"
+ "		box.style.height = '20px';"
+ "		minb.innerHTML = '&#175;';}"
+ "}"
+ "function wideframe(j) {"
+ " var box = document.getElementById('closecontainer'+j);"
+ "	if (box.style.width == '92%'){"
+ "		box.style.width = '600px';"
+ "		box.style.margin = '0px 0px 0px -300px'}"
+ "	else {"
+ "		box.style.width = '92%';"
+ "		box.style.margin = '0px 0px 0px -46%';}"
+ "}"
+ "function highframe(j) {"
+ " var box = document.getElementById('closecontainer'+j);"
+ "	if (box.style.height == '96%')"
+ "		box.style.height = '400px';"
+ "	else "
+ "		box.style.height = '96%';"
+ "}"


	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("script");
		node.type = "text/javascript";
		node.appendChild(document.createTextNode(js));
		heads[0].appendChild(node); 
	}

})();

}
