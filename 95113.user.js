// ==UserScript==
// @name          Allegro score preview
// @namespace     allegro_score_preview
// @description   Dodaje tabelkę z ilością komentarzy ze strony sprzedawcy w podglądzie aukcji na liście wyszukiwania produktów.
// @version       1.1
// @include       http://allegro.pl/listing.php*
// @include       https://allegro.pl/listing.php*
// @include       http://www.allegro.pl/listing.php*
// @include       https://www.allegro.pl/listing.php*
// @match         http://allegro.pl/listing.php*
// @match         https://allegro.pl/listing.php*
// @match         http://www.allegro.pl/listing.php*
// @match         https://www.allegro.pl/listing.php*
// ==/UserScript==



(function (d) {
	/* Chrome workaround */
	if (!d.location.href.match (/^https?:\/\/(www\.)?allegro\.pl\/listing\.php/))
		return;

	var caption = d.getElementsByClassName ('itemListing')[0].getElementsByTagName ('caption')[0];
	var caption_orig = caption.innerHTML;

	var o = d.getElementsByClassName ('itemListing')[0].getElementsByTagName ('tr');
	for (var i = 0; i < o.length; i++) {
		o[i].classList.remove ('highlight');

		o[i].addEventListener ('mouseover', function (e) {
			var obj = this.classList;
			var f = function(){
				obj.remove ('hover');
			};
			setTimeout (f, 0);
		}, true);
	}



	var p = d.getElementsByClassName ('itemPopup');
	var to_load = p.length;
	var loaded = 0;

	function update () {
		caption.innerHTML = 'wczytywanie podglądów komentarzy (' + loaded + ' z ' + to_load + ')';
		if (to_load == loaded) {
			setTimeout (function () {
				caption.innerHTML = 'wczytywanie podglądów komentarzy zakończone';
			}, 500);

			setTimeout (function () {
				caption.innerHTML = caption_orig;
			}, 3000);
		}
	}

	update();

	for (var i = 0; i < p.length; i++) {
		var c = p[i].getElementsByClassName ('popupContents')[0];

		var left = d.createElement ('div');
		left.setAttribute ('class', 'left');

		var right = d.createElement ('div');
		right.setAttribute ('class', 'right');
		right.setAttribute ('style', 'margin-left: 10px');

		var clear = d.createElement ('div');
		clear.setAttribute ('class', 'clear');

		c.removeChild (c.getElementsByClassName ('clear')[0]);

		c.appendChild (left);
		c.appendChild (right);
		c.appendChild (clear);

		left.appendChild (c.getElementsByClassName ('popupThumbBox')[0]);
		left.appendChild (c.getElementsByClassName ('popupInfo')[0]);

		var url = left.getElementsByClassName ('uname')[0].getElementsByTagName ('a')[0].getAttribute ('href');

		var process = function (r) {
			var o = arguments.callee.o;
			var dt = document.implementation.createDocumentType (
				"html",
				"-//W3C//DTD HTML 4.01 Transitional//EN",
				"http://www.w3.org/TR/html4/loose.dtd");
			var doc = document.implementation.createDocument (null, null, dt);
			var html = d.createElement ('html');

			html.innerHTML = r.responseText;
			doc.appendChild(html);


			var td = doc.getElementsByTagName ('td');
			for (var j = 0; j < td.length; j++)
				td[j].style.border = 'none';

			/* Chrome workaround */
			var t = doc.getElementsByClassName('roundCornerWhiteBG')[0] ?
				doc.getElementsByClassName('roundCornerWhiteBG')[0] :
				doc.getElementsByClassName('roundcornerwhitebg')[0];

			o.innerHTML = '<div class="roundCornerGreyBG" style="width: 350px">' + 
				t.innerHTML +
				'</div>' +
				'<br clear="both"/>';


			r = null;
			dt = null;
			doc = null;
			html = null;


			loaded++;
			update ();

		};
		process.o = right;

		GM_xmlhttpRequest({
			method: 'GET',
			'url': url,
			onload: process
		});


	}
	
})(document);
