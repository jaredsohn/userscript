// ==UserScript==

// @name           Kommentare auslesen und Bildervorschau

// @namespace      Simon.Kempendorf.com

// @include        http://www.schuelervz.net/Photos/Tags/*

// @include        http://www.schuelervz.net/Photos/Album/*/a/*

// @description   Bei der Fotoalbumuebersicht und bei der Uebersicht der verlinkten Bilder kann man durch Klick auf "Kommentare" sich die Kommentare zu dem Bild direkt als Layer anzeigen lassen. Ebenso oeffnet sich ein Layer mit dem Bild, sobald man auf die Fotovorschau klickt.

// ==/UserScript==



	with (document.wrappedJSObject || document) {

	    onmouseup = null;

		onmousedown = null;

		oncontextmenu = null;

	}

	var arAllElements = document.getElementsByTagName('*');

	for (var i = arAllElements.length - 1; i >= 0; i--) {

		var elmOne = arAllElements[i];

		with (elmOne.wrappedJSObject || elmOne) {

		    onmouseup = null;



			sitesonmousedown = null;

			oncontextmenu = null;

		}

	}

var fenstergroesse = document.body.offsetHeight;



var loading = new Image();

loading.src = 'http://www.simon.kempendorf.com/loading.gif';

var divhid = document.createElement('div');

divhid.id = 'hiddendiv';

divhid.style.position = 'absolute';

divhid.style.zIndex = '0';

divhid.style.backgroundColor = '#fff';

divhid.style.height = '10px';

divhid.style.width = '50px';

divhid.style.visibility = 'hidden';

var appdivhid = document.body.appendChild(divhid);



var div = document.createElement('div');

div.style.position = 'absolute';

div.style.top = '10px';

div.style.left = '20px';

div.style.backgroundColor = '#FFFFFF';

div.style.border = '1px solid black';

div.style.padding = '10px';

div.style.visibility = 'hidden';

div.style.zIndex = '10000000';

div.id = 'PhotoAlbums_CommentList';

div.className = 'narrowContent';

div.style.width = '460px';

var divcont = document.createTextNode('hallo');

div.appendChild(divcont);

var appdiv = document.body.appendChild(div);

var schliessen = '<a href="javascript:void(0)" onClick="document.getElementById(\'PhotoAlbums_CommentList\').innerHTML = \'\'; document.getElementById(\'PhotoAlbums_CommentList\').style.visibility = \'hidden\'; return false;">Schlie&szlig;en</a><small style="position:absolute;right:10px;">(<a href="http://www.simon.kempendorf.com" target="_blank">Simon.Kempendorf.com</a>)</small>';

//document.getElementById(\'PhotoAlbums_CommentList\').innerHTML = \'\'; if (document.getElementById(\'PhotoAlbums_CommentList\').parentNode.innerHTML.indexOf(\'klartext\') < 1000) { document.getElementById(\'PhotoAlbums_CommentList\').parentNode.removeChild(document.getElementById(\'PhotoAlbums_CommentList\')); document.getElementById(\'PhotoAlbums_CommentList\').style.visibility = \'hidden\'; } else { document.getElementById(\'PhotoAlbums_CommentList\').innerHTML = \'\'; document.getElementById(\'PhotoAlbums_CommentList\').style.visibility = \'hidden\'; document.getElementById(\'PhotoAlbums_CommentList\').style.height = \'\'; } return false;">

var loadinghtm = '<br><br><div style="width:100%;text-align:center;">Es wird geladen - bitte warten... <br><br><img src="' + loading.src + '" alt="Wird geladen..."></a></div><br><br>';



String.prototype.trim = function() {

 // skip leading and trailing whitespace

 // and return everything in between

  var x=this;

  x=x.replace(/^\s*(.*)/, "$1");

  x=x.replace(/(.*?)\s*$/, "$1");

  return x;

}



function loadcomm(commi, posY, posX) {

		if (posY > 0) { appdiv.style.top = parseInt(window.pageYOffset+posY) + 'px'; }

		if (posX > 0) { appdiv.style.left = posX + 'px'; }

		appdiv.style.height = '';

		div.style.width = '460px';

		appdiv.innerHTML = schliessen + loadinghtm;

		appdiv.style.visibility = 'visible';

		GM_xmlhttpRequest({

            method: 'GET',

            url: commi.getAttribute('url'),

            onload: function(resp) {

				var aStr = resp.responseText;

if (aStr.indexOf('Du hast leider keinen Zugriff auf diese Fotos.') > 0) {

	var title = '<div style="width:100%;text-align:center;font-weight:bold;"><span style="color:#F00;">Fehler!</span> Du hast hierf�r leider keine Zugriffsberechtigungen.<br>';

	title = title + '<a href="javascript:void();" name="seiteweiter" url="' + commi.getAttribute('url').substr(0, commi.getAttribute('url').indexOf('/p/')).replace('Album', 'Tags') + '">Zur�ck</a></div>';

} else {



				var title = resp.responseText;

				title = title.substr(title.indexOf('<div class="Snipplet-Photos-PhotoComments">'));

				title = title.substr(0, title.indexOf('<form'));

				title = title.trim();

				title = title + '</div>';



				if (title.indexOf('Seite:') > 0) {

var title1 = title.substr(0, title.indexOf('<div class="obj-pager">'));

title = title.substr(title.indexOf('<div class="obj-pager">'));

var title2 = title.substr(0, title.indexOf('<ul'));

title = title.substr(title.indexOf('<ul'));

title2 = title2.replace(/href="/g, 'href="javascript:void();" name="seiteweiter" url="http://www.schuelervz.net');



title = title1 + title2 + title;

				}

}

				appdiv.innerHTML = schliessen + '<br><br>';

				appdiv.innerHTML = appdiv.innerHTML + title;



var links2 = appdiv.getElementsByTagName('a');

for ( var i = 0; i < links2.length; i++ ) {

	if (links2[i].getAttribute('name') == 'seiteweiter') {links2[i].addEventListener('click', function () {document.getElementById('PhotoAlbums_CommentList').innerHTML = ''; loadcomm(this, 0, 0);}, false); }

}



appdivhid.style.top = parseInt(parseInt(appdiv.style.top.replace('px', ''))+parseInt(div.offsetHeight)) + 'px';

if (parseInt(parseInt(appdiv.style.top.replace('px', ''))+parseInt(div.offsetHeight)) > fenstergroesse) {window.location.href = '#hiddendiv';}



            }

		});

}



function loadimg(img, posY, posX) {

		if (posY > 0) { appdiv.style.top = parseInt(window.pageYOffset+posY) + 'px'; }

		if (posX > 0) { appdiv.style.left = parseInt(document.body.clientWidth/2-230) + 'px'; }

		appdiv.style.height = '';

		appdiv.style.width = '460px';

		appdiv.innerHTML = schliessen + loadinghtm;

		appdiv.style.visibility = 'visible';

		appdiv.setAttribute('titel', 'false');

		appdiv.innerHTML = schliessen + '<div id="ladeschirm">' + loadinghtm + '</div><img src="' + img.src.replace('-m', '') + '" style="visibility:hidden;position:absolute;top:35px;left:10px;" onLoad="window.setTimeout(function() { document.getElementById(\'hiddendiv\').style.top = parseInt(parseInt(document.getElementById(\'PhotoAlbums_CommentList\').style.top.replace(\'px\', \'\'))+parseInt(document.getElementById(\'PhotoAlbums_CommentList\').offsetHeight)) + \'px\'; }, 100);document.getElementById(\'ladeschirm\').style.visibility = \'hidden\'; this.style.visibility = \'visible\'; document.getElementById(\'PhotoAlbums_CommentList\').style.left = parseInt(document.body.clientWidth/2-this.offsetWidth/2) + \'px\'; if (document.getElementById(\'PhotoAlbums_CommentList\').getAttribute(\'titel\') == \'true\') { this.style.top = \'55px\'; var plus = 20; } else { this.style.top = \'35px\'; var plus = 0; } document.getElementById(\'PhotoAlbums_CommentList\').style.height = parseInt(this.offsetHeight+25+plus) + \'px\'; document.getElementById(\'PhotoAlbums_CommentList\').style.width = parseInt(this.offsetWidth+0) + \'px\';" onClick="document.getElementById(\'PhotoAlbums_CommentList\').innerHTML = \'\'; document.getElementById(\'PhotoAlbums_CommentList\').style.visibility = \'hidden\';">';

/*		GM_xmlhttpRequest({

            method: 'GET',

            url: img.parentNode.getAttribute('url'),

            onload: function(resp) {	

				var title = resp.responseText;

				title = title.substr(parseInt(title.indexOf('<td colspan="2">')+16));

				title = title.substr(0, title.indexOf('</td>'));

				title = title.trim();

				title = '';



				if (title.length > 0) {

				appdiv.innerHTML = appdiv.innerHTML + '<div style="position:absolute;top:30px;left:10px;font-weight:bold;">' + title + '</div>';

				appdiv.setAttribute('titel', 'true');

				} else { appdiv.setAttribute('titel', 'false'); }



window.setTimeout(function() {

  if (parseInt(div.offsetHeight) > 300) { appdivhid.style.top = parseInt(parseInt(appdiv.style.top.replace('px', ''))+parseInt(div.offsetHeight)) + 'px'; } 

  if (parseInt(parseInt(appdiv.style.top.replace('px', ''))+parseInt(div.offsetHeight)) > fenstergroesse) {window.location.href = '#hiddendiv';}

}, 100);

			}

		});*/

}





var links = document.getElementsByTagName('a');

for ( var i = 0; i < links.length; i++ ) {

    if ( links[i].innerHTML.indexOf('Kommentar') > 0 ) {

		links[i].addEventListener('click', function(event) { loadcomm(this, event.clientY, event.clientX); }, false);

		links[i].setAttribute('url', links[i].href);

		links[i].href = 'javascript:void(0)';

		var trenn = document.createTextNode(' | ');

		links[i].parentNode.appendChild(trenn);

    } 

	if (links[i].innerHTML.indexOf('<img') > 0 ) {

		links[i].setAttribute('url', links[i].href);

		links[i].addEventListener('click', function(event) { loadimg(this.getElementsByTagName('img')[0], event.clientY, event.clientX); }, false);

		links[i].href = 'javascript:void(0)';

	}

}



var divs = document.getElementsByTagName('div');

for ( var i = 0; i < divs.length; i++ ) {

    if (divs[i].className == 'caption') {

		var link = document.createElement('a');

		link.href = divs[i].parentNode.getElementsByTagName('div')[0].getElementsByTagName('a')[0].getAttribute('url');

		link.innerHTML = '&gt;&gt; Bild &ouml;ffnen';

		divs[i].appendChild(link);

    }

}