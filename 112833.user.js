// ==UserScript==
// @name          scimmia-forum
// @namespace     http://gaming.ngi.it/
// @description   Alimenta la scimmia da forum - v0.2
// @include       http://gaming.ngi.it/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

/*
 * Caratteristiche:
 *
 * - spoiler a scomparsa
 * - ridimensiona le immagini che spaginano
 * - ridimensiona le immagini quotate
 * - click su un immagine per ritornare alle dimensioni reali e click di nuovo per ridimensionare
 */

/*****************************************************************************
				  Parametri
*****************************************************************************/

// Immagini che spaginano grandi al massimo larghezza post.
// Calcolo: schermo meno
// (larghezza scatola avatar (175px) + 2*25px padding + 70px di gioco)
var IMG_MAX_WIDTH = (screen.width - (175 + 50 + 70)) + 'px';
// Altezza massima delle immagini quotate.
var QUOTED_IMG_MAX_HEIGHT = '200px';
var BUTTON_HIDE_URL = 'images/buttons/collapse_tcat.gif';
var BUTTON_SHOW_URL = 'images/buttons/collapse_tcat_collapsed.gif';


/*****************************************************************************
				   Funzioni
*****************************************************************************/

function visitingThread ()
{
	if (window.location.pathname == '/showthread.php'
	    || window.location.pathname == '/showpost.php')
		return true;
	return false;
}


/*****************************************************************************
				   Oggetti
*****************************************************************************/

function ForumThread ()
{
	var spoilers;
	var quotedImages;

	spoilers = $('td[valign="middle"][bgcolor="black"]');
	images = $('div [id*="post_message"] img');
	quotedImages = $('div.smallfont:contains("Quote:")')
	               .parent().find('img');


	function fixMaxImageWidth () {
		GM_addStyle ('.fixedW { max-width: ' + IMG_MAX_WIDTH + '}');

		images.addClass ('fixedW');
		images.click(function(){$(this).toggleClass('fixedW');});

	}


	function fixMaxQuotedImageHeight () {
		GM_addStyle ('.quoted { max-height: ' + QUOTED_IMG_MAX_HEIGHT + '}');

		quotedImages.addClass ('quoted');
		quotedImages.click(function(){$(this).toggleClass('quoted');});

	}


	function showSpoiler (buttonImg) {
		buttonImg.attr('src', BUTTON_HIDE_URL);
		buttonImg.parents('.spoiler-box:first').find('.spoiler:first').show();
	}


	function hideSpoiler (buttonImg) {
		buttonImg.attr('src', BUTTON_SHOW_URL);
		buttonImg.parents('.spoiler-box:first').find('.spoiler:first').hide();
	}


	function fixSpoilers () {
		// CSS per gli spoiler.
		GM_addStyle ('.spoiler {' +
					'display: none;' +
				'}');
		GM_addStyle ('.spoiler-warning {' +
					'font-weight: bold;' +
				'}');
		GM_addStyle ('.spoiler-warning img {' +
					' vertical-align: middle;' +
					' cursor: pointer;' +
				'}');

		// Rimuove lo sfondo nero.
		spoilers.removeAttr ('bgcolor');

		// Rimuove l'orrendo tag font, colpevole del testo minuscolo
		// in curier nero, e lo sostituisce con un div marcato con una
		// classe.
		spoilers.find('font').each(
				function (index, dom) {
					var spBox;
					var font = $(dom);
					font.wrapInner(
						'<div class="spoiler-box">' +
							'<div class="spoiler">' +
							'</div>' +
						'</div>');
					font.find('.spoiler-box').prepend(
						'<div class="spoiler-warning">' +
							'<img class="spoiler-toggle" alt="mostra" src="' +
								BUTTON_SHOW_URL +'"/>'+
							' Spoiler' +
						'</div>');
					font.replaceWith (font.children ());
				});

		// Mouse sopra mostra, mouse fuori nasconde e cosi' via.
		// Se cliccato disattiva l'hover e lo spoiler si comanda coi
		// click (necessario per spoiler lunghi, che obbligano a
		// scorrere la pagina).
		spoilers.find('.spoiler-toggle:first').toggle(
				function (evt) {
					var buttonImg = $(this);
					buttonImg.unbind ("mouseenter");
					buttonImg.unbind ("mouseleave");
					buttonImg.unbind ("mouseover");
					showSpoiler (buttonImg);
				},
				function (evt) {
					var buttonImg = $(this);
					buttonImg.unbind ("mouseenter");
					buttonImg.unbind ("mouseleave");
					buttonImg.unbind ("mouseover");
					hideSpoiler (buttonImg);
				}).hover(
					function (evt) {
						showSpoiler ($(this));
					},
					function (evt) {
						hideSpoiler ($(this));
					});
	}


	this.fix = function () {
		fixMaxImageWidth ();
		if (spoilers.length)
			fixSpoilers ();
		if (quotedImages.length)
			fixMaxQuotedImageHeight ();
	}
}


/*****************************************************************************
				    Script
*****************************************************************************/

var page = null;

if (visitingThread ())
	page = new ForumThread ();
else
	return;

page.fix ();