// ==UserScript==
// @name           Nachrichten warner fuer foren-city.de version 1.1
// @namespace      pennerhack.foren-city.de basti1012
// @description    bei einigen styl gibt es kein nachrichten warner also habe ich den gebaut sobald eine nachricht im eingang ist kommt ein alert
// @include        http://pennerhack.foren-city.de*
// @include        pennerhack.foren-city.de*
// ==/UserScript==


GM_xmlhttpRequest(
   {
  	method: 'GET',
   	url: 'http://pennerhack.foren-city.de/privmsg.php?folder=inbox',
        onload: function(responseDetails) 
		{
        	var content = responseDetails.responseText;
			var text1 = content.split('src="templates/Aliens/images/folder_')[1];
			var text2 = text1.split('.gif" hspace="2"')[0];
			var text3 = content.split('class="topictitle">')[2];
			var text4 = text3.split('</a></span></td>')[0];
			var text5 = content.split('class="name">')[2];
			var text6 = text5.split('</a></span></td>')[0];


GM_xmlhttpRequest(
   {
  	method: 'GET',
   	url: 'http://pennerhack.foren-city.de/privmsg.php?folder=inbox&mode=read&p=*',
        onload: function(responseDetails) 
		{
        	var content = responseDetails.responseText;
			//var text7 = content.split('class="postbody">')[1];
			//var text8 = text7.split('</span>')[0];


alert("Du hast eine Nachricht gekriegt \nvon "+text6+" \nund der Betreff ist\n "+text4+"")
}});
}});
// nachrichten warner für foren-city.de copiright by basti1012