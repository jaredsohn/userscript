// ==UserScript==
// @name           Przeładowanie strony gry wystąpi błąd
// @namespace      menelgame.pl
// @description    *menelgame.pl/*
// @include        *menelgame.pl/*
// ==/UserScript==

var version = '1.0a';
var version_hash = 'b56400763a5204cc92e98a6d001bfd4b';
var adres = 'http://userscripts.org/scripts/show/64128';
var nazwa = 'Przeładowanie strony gdy wystąpi błąd';



GM_xmlhttpRequest(
{
/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/


  method: 'GET', url: adres, onload: function(source)
  {
  	var wpis = document.createElement('html');
  	wpis.innerHTML = source.responseText;
  	


	if (wpis.innerHTML.match('CypyRight by Yeramihi'))
    if (!((wpis.innerHTML.match(version_hash))))
    {
      alert ('Pojawiła się nowa wersja skryptu ' + nazwa + '! \Za chwilę zostanie pobrana nowa wersja skryptu, proszę potwierdzić instalację...');
      window.location.replace(adres);
      return;
    }
  }
});


var t = new Array();
var l = 7;

t[0] = 'The server returned an invalid or incomplete response.';
t[1] = 'An Error occured.';
t[2] = 'No server is available to handle this request.';
t[3] = 'Internal Server Error';
t[4] = "The server didn't respond in time.";
t[5] = 'Sorry we are currently down for maintenance';
t[6] = 'Spróbuj ponownie za kilka minut.';


for (x = 0; x <= l; x++)
	if (document.body.innerHTML.match(t[x]))
		window.location.reload();