// ==UserScript==
// @name           TinyUrlCreator
// @namespace      preston.labig@yahoo.com
// @description    Converts long Urls to tiny Urls.
// @include        *
// ==/UserScript==
function newTiny()
{
	var oldUrl=prompt('Enter Url to be Shortened','');		
			
			GM_xmlhttpRequest({
       method: 'GET',
       url: 'http://tinyurl.com/create.php?url=' + oldUrl,
       onload: function (x) {
              var f=document.createElement('frame');
			  f.innerHTML=x.responseText;
			  f.style.visibility='hidden';
			  f.id='TinyLoader';
			  var h=document.getElementsByTagName('html')[0];
			  h.appendChild(f);
			  var tiny=document.getElementById('TinyLoader');
			  var grabTiny=tiny.getElementsByTagName('a')[10].href;
			  alert(grabTiny);
			  history.go(-1);
	   }
			});
}
function keyHandler(event) {

	if (event.keyCode == 121 ) {
		newTiny();
}
}

window.addEventListener('keydown', keyHandler, false);