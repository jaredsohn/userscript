// ==UserScript==
// @name           Titulo do topico na aba
// @namespace      Artur_0x0f | Main#Profile?uid=1737337416640213083
// @description    Titulo do topico na aba
// @include        *.orkut.*/CommMsgs?cmm=*
// ==/UserScript==


with(new XMLHttpRequest){
	open('GET',location.href.replace('Main#',''),false);
	send(null);
	return  document.title = "Orkut - ".concat(responseText.match(/h1>([^\n]+)<\//i)[1]);
}


