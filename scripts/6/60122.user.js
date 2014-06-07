// ==UserScript==
// @name           BartekJot http://wrzuta.pl audio downloader.
// @namespace      ... :-)
// @include        http://*wrzuta.pl/audio/*
// @version        0.1.b
// ==/UserScript==

// ==JQueryInjection==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// ==/JQueryInjection==

// ==MainFunction==
function JQuery() {

var _WIDTH    = 620;
var _HEIGHT   = 90;


var _STYLESHEET = [
  '#containerBJ {margin: 0pt auto; width: '+ _WIDTH +'px; height: '+ _HEIGHT +'px; border: 1px solid silver; background: #EBEBEB; display: block; opacity: 0.9}',
  '#wrzuta_plik_top, #wrzuta_plik, #adults_overlay, #top_img_player {display: none !important;}',
  'body {overflow: auto !important}',
  '#downloadBJ {display:table-cell; vertical-align: middle; width: '+ _WIDTH +'px; height: '+ _HEIGHT +'px; text-align: center; color: #181818}',
  '#downloadBJ:hover {color:darkgrey}'
];

GM_addStyle(_STYLESHEET.join("\r\n"));

var _LAYER    = $('div[id="file_info_media"]');

var _URL      = window.location.href.toString();
var _xmlURI   = _URL.replace('/audio/','/xml/plik/') + '/made/by/BartekJot';

var _xmlFile  = new XMLHttpRequest();

		_xmlFile.open("GET",_xmlURI,false);
		_xmlFile.send(null);

var _DOWNLOAD = _xmlFile.responseXML.documentElement.getElementsByTagName("fileId")[0].textContent;
var _TITLE    = _xmlFile.responseXML.documentElement.getElementsByTagName("name")[0].textContent;
var _LOGIN    = _xmlFile.responseXML.documentElement.getElementsByTagName("login")[0].textContent;
var _FILEKEY  = _xmlFile.responseXML.documentElement.getElementsByTagName("key")[0].textContent;
var _HOST     = 'wrzuta.pl';

var _PLAYER   = '\n\n<object data="/audio.swf"' +
                'type="application/x-shockwave-flash"' +
                'height="'+ _HEIGHT +'" width="'+ _WIDTH +'">' +
                '<param value="opaque" name="wmode">' +
                '<param value="'+
                'key='+ _FILEKEY +'&amp;'+
                'login='+ _LOGIN +'&amp;' +
                'host='+ _HOST +'&amp;' +
                'site=' + _HOST +'&amp;' +
                'lang=pl" name="flashvars"></object>\n\n';

var _DLINK = '\n\n<strong>&raquo;&nbsp;POBIERZ PLIK!&nbsp;&laquo;<br /><br />'+
             '&raquo;&nbsp;'+ _TITLE.toUpperCase() +'.MP3&nbsp;&laquo;</strong>\n\n';

_LAYER.prepend(_PLAYER);

$(document.createElement('div')).attr('id','containerBJ').insertAfter(_LAYER);
$(document.createElement('a')).attr({href: _DOWNLOAD, id: "downloadBJ"}).appendTo('#containerBJ').append(_DLINK);

}
// ==/MainFunction==

// ==JQueryExecution==
addJQuery(JQuery);
// ==/JQueryExecution==