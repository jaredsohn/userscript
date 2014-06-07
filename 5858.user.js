// ==UserScript==
// @name        QuickiWiki
// @namespace   http://www.ruinsofmorning.net/greasemonkey/
// @description Quickly look up selected text in Wikiqedia, Wiktionary or Wikiquote.
// @version	1.0 - 2006-10-05
// @include	*
// @exclude	https://*
// ==/UserScript==

d = document;

// Build QWBox //
qwbox = document.createElement('div');
qwbox.setAttribute('id', 'QuickiWikiBox');
qwbox.setAttribute('style', "display: none; z-index: 1000; font-size: 8pt; font-family: Verdana,sans-serif; text-decoration: none; line-height: 1.1em; position: fixed; top: 0px; right: 0px; width: 160px; background: white; border-left: solid 1px #555; border-bottom: solid 1px #555; color: #222; text-align: center; padding: 3px;");
d.body.appendChild(qwbox);

// QWBox Content //
// Selected text quote area//
nlnk = d.createElement('a');
nlnk.setAttribute('title', "From Greasemonkey User Script 'qwikiwiki.user.js'");
nlnk.setAttribute('style', 'display: block; padding: 2px; text-decoration: none; color: #337;');
ntxt = d.createTextNode('QuickiWiki Look Up ');
nlnk.appendChild(ntxt);
qwbox.appendChild(nlnk);
qdiv = d.createElement('div');
qdiv.setAttribute('style', 'border: solid 1px #555; margin: 1px; padding: 2px; background: #dde;');
qdiv.setAttribute('id', 'QWBoxQuote');
qwbox.appendChild(qdiv);


// Define URI encoded GIF icons //
// Wikipedia icon //
pediagif = 'data:image/gif;base64,R0lGODlhIwAjAKIAAOTk5PHx8cbGxtXV1bS0tJycnHp6ev///yH5B'+
'AAAAAAALAAAAAAjACMAAAP/eLoswFCFECsExAgGxgsdURCPFWEGwQRCKxCtaBSbuUwZBA4iPbSF0cB2mAw0nELq'+
'NWi6CCKHZXJQLjyBoKv5i0GDFB3g8SMEBkHamCsow76j02CinNU1Owe3/FIWhjdUdwaEQQRcYx1PL4UFYUVUjTM'+
'OIA6KI1BPaQaAE56UhXMTlhmEXlA9KRIAYR9Qcx1NiZlOL3AznjATJTsdib9dT3BKolCeRYcisbKKfKipeAGHYx'+
'RZAmCsAJY8tbbQZiCerCxt2WNtXd3DhSBjRePie+hsGbabuOa++paKyylKqO6BEzfOg75mLgiJCBjEVDtYv5Ylo'+
'hfl2b0hPAqY8/CFjtMaF8LWEar2Y1eshiNiHWqSqce9AhJknfEVo4WTQ17sNSQE6ECsg8C6wPAm4+WjM2z2aLPJ'+
'BwihQk97Krimx8OPdEJP3ZsRgcUrPc9avhlWR2MFr/Ncagm7lZMJcjavhf2iNiqRMy9Aak1zxyyRIjzGsuWr8NH'+
'fIkTJ1iFx+GwZvoakNLZhctzky5gPJAAAOw==';

// Wiktionary icon //
tionarygif = 'data:image/gif;base64,R0lGODlhIwAjAKIAAHl5eYmJiaGhocXFxeLi4jMzM2ZmZv///yH5'+
'BAAAAAAALAAAAAAjACMAAAP/eEezM4TF+R4lS1asXtZTaDFeSCpKhKbsKmGcu6x0bd84Haszyueoyghy2VCAKZPy'+
'ZWogazHfc0p9DgACwEMgGAhW3aqvACiQAgIzARuANE4Mx2hlMBS6A0NaQLjrDQABdQVXhAV6d04phwUHA4aNhIB+'+
'gYRleQ1lNXxfeVlsWVxaAYJ5f28AYlR5URk5rToriihoswdhVzwcMKk5nFcDpAJtFqMGwFp8B6U1AQt1BgRdZhUA'+
'gcHOAdIRaF80vW1dxFwPABqZwXIV3o6wKdo5tq43EDPujo7yNNrSXsIQWLyIG/arFhp4KfQcqJNFT5dhAAwICoRG'+
'WiiJwmTBEIFBY4gbCfm4MFFFcgG/DG8cwOgSYQ6MHii+EAhAURQpLctItdGCxVoWYeyCcQlH8EGbZUO9CG1DMxs7'+
'e1J2tHgp9da9klizphjxI0hXe7B0DSESB+xHGETI/tjAth5atQ7kfDiQAAA7';

// Wikiquote icon //
quotegif = 'data:image/gif;base64,R0lGODlhIwAjAKIAAN/p8WGHrLjM4ZWz0TtvoG+g0AAvZP///yH5BAA'+
'AAAAALAAAAAAjACMAAAP/eLrcrkC8SScYZdRdRfkaJzbYJ42bcB5lsaKOQBBrOQCwAwQzDX2unI5HCOAOns8xNzjt'+
'ZoVF6TUKGAwh2cwJXIoAhKvvUJgFIFNKZHBbgMUQ4ikZauyu+LHsGiVDfx86YXiEJwNwSGZoSg1WhIQER4MST5EKa'+
'W6PmiGOfXKXJgyHmoRnLFemnyyhUqSll6gKqkkvAq54pgWxB6qYELdXIYOcW6BBoreWAHiURDgXjI2klryIA4oHAF'+
'0P14QFR7bBCmUEWUAVEV57BqZa1LQw4QbU5H3a0ShW1Ncz4NtM4HqEgHZMiAJ33w7+MwjGzJF7BQ0mMrIogxeJAh6'+
'2uCjREU0LKh2lAAEZEhDJkhBOKkgAADs=';

// New Tab icon //
nwgif = 'data:image/gif;base64,R0lGODlhCgAKAIAAAF1zuP///yH5BAAAAAAALAAAAAAKAAoAAAIUTICJpso'+
'GT4ps0gWolG3d93GNUQAAOw==';


// Build blank wiki links //
qwbox.appendChild(makeLink('QWBwikipediaLSW', pediagif, 'Wikipedia', false));
qwbox.appendChild(makeLink('QWBwikipediaLNW', nwgif, 'Wikipedia (New Window)', true));
qwbox.appendChild(makeLink('QWBwiktionaryLSW', tionarygif, 'Wiktionary', false));
qwbox.appendChild(makeLink('QWBwiktionaryLNW', nwgif, 'Wiktionary (New Window)', true));
qwbox.appendChild(makeLink('QWBwikiquoteLSW', quotegif, 'Wikiquote', false));
qwbox.appendChild(makeLink('QWBwikiquoteLNW', nwgif, 'Wikiquote (New Window)', true));


// Prevent miss-clicks from hiding QWBox //
window.QWBpointer = false;
qwbox.addEventListener('mouseover', function(e){
	window.QWBpointer = true;
	d.getElementById('QuickiWikiBox').style.borderLeft = 'solid 1px #77f';
	d.getElementById('QuickiWikiBox').style.borderBottom = 'solid 1px #77f';
}, false);
qwbox.addEventListener('mouseout', function(e){
	window.QWBpointer = false;
	d.getElementById('QuickiWikiBox').style.borderLeft = 'solid 1px #555';
	d.getElementById('QuickiWikiBox').style.borderBottom = 'solid 1px #555';
}, false);


// Selected Text Event Function // 
window.QWSelectEvent  = function () {
	// Was this a miss-click? //
	if (window.QWBpointer) {return;} 

	// Ensure QWBox is available //
	if (box = document.getElementById('QuickiWikiBox')) {
		// Good, lets go //
		// Check for selected text //
		if (window.getSelection() > '') {
			// Get Text //
			seltxt = window.getSelection();
			seltxt = String(seltxt);
			seltxt = seltxt.replace(/(^\s+|\s+$)/g, '');

			// Kill HTML //
			seltxt = seltxt.replace(/"/g, "'");
			seltxt = seltxt.replace(/>/g, '&gt');
			seltxt = seltxt.replace(/</g, '&lt');

			// Hide on Big Selections //
			if (seltxt.length > 500) {box.style.display = 'none'; return;}

			// Truncate on Long Selections //
			if (seltxt.length > 70) {seltxt = seltxt.substring(0,70);}

			// QWBox Content //
			// Selected text quote //
			qbox = d.getElementById('QWBoxQuote');
			kids = qbox.childNodes;
			for (i in kids) {if (kids[i].nodeType) {qbox.removeChild(kids[i]);}}
			qtxt = d.createTextNode(seltxt);
			qbox.appendChild(qtxt);

			// Wikipedia links //
			wphref = 'http://en.wikipedia.org/wiki/Special:Search?search=' + seltxt + '&go=Go';
			d.getElementById('QWBwikipediaLSW').setAttribute('href', wphref);
			d.getElementById('QWBwikipediaLNW').setAttribute('href', wphref);

			// Wiktionary links //
			wthref = 'http://en.wiktionary.org/wiki/Special:Search?search=' + seltxt + '&go=Go';
			d.getElementById('QWBwiktionaryLSW').setAttribute('href', wthref);
			d.getElementById('QWBwiktionaryLNW').setAttribute('href', wthref);

			// Wikiquote links //
			wqhref = 'http://en.wikiquote.org/wiki/Special:Search?search=' + seltxt + '&go=Go';
			d.getElementById('QWBwikiquoteLSW').setAttribute('href', wqhref);
			d.getElementById('QWBwikiquoteLNW').setAttribute('href', wqhref);

			box.style.display = 'block';
		} else {
			// Hide QWBox if there is no selection //
			box.style.display = 'none';
		}
	} else {
		// Call the whole thing off //
		clearInterval(window.QuickieWikiIID);
		document.removeEventListener('mouseup', window.QWSelectEvent,false);
		return;
	}
}


// Set Up Selection Event Watch //
document.addEventListener('mouseup', window.QWSelectEvent, false);
window.QuickieWikiIID = setInterval(window.QWSelectEvent, 2000);


// Make Image Links //
function makeLink(id,imgdata,title,newtab) {
	// Make Anchor //
	link = document.createElement('a');
	link.setAttribute('id', id);
	link.setAttribute('title', title);

	// Make Image //
	img = document.createElement('img');
	img.setAttribute('src', imgdata);
	img.setAttribute('style', 'margin: 2px; border: none; vertical-align: top;');

	// New Tab Link //
	if (newtab) {
		link.setAttribute('target', '_blank');
	}

	// Add Image //
	link.appendChild(img);

	return link;
}

