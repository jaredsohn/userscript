// ==UserScript==

// @name           FB Profile Pic

// @namespace      http://userscripts.org/people/14536

// @description    Shows bigger profile pics on Facebook when you put the mouse over the small pics.

// @include        http://*.facebook.com/*

// @include        http://facebook.com/*

// @author         Vaughan Chandler

// ==/UserScript==



// Last updated on 2008-12-07



(function() {



if (self != top) { return; }



var listening = false;



// Where the pic should appear? Valid values are "right" (default) and "left".

var bigPicPosition = GM_getValue('bigPicPosition', -1);

if (bigPicPosition != 'left' && bigPicPosition != 'right') {

	bigPicPosition = 'right';

	GM_setValue('bigPicPosition', bigPicPosition);

}



// Should the big pic disappear on mouse out, or by clicking the x? Default is on mouse out (true).

var bigPicAutoclose = GM_getValue('bigPicAutoclose', -1);

if (bigPicAutoclose == -1) {

	bigPicAutoclose = true;

	GM_setValue('bigPicAutoclose', bigPicAutoclose);

}



// Should a border be places around small pics? Default is no (false).

var smallPicBorder = GM_getValue('smallPicBorder', -1);

if (smallPicBorder == -1) {

	smallPicBorder = false;

	GM_setValue('smallPicBorder', smallPicBorder);

}



var div = document.createElement('div');

div.id = 'FBPPdiv';

div.innerHTML = '<div id="FBPPclose" title="Close">x</div><div id="FBPPheader">Big Profile Pic</div><div id="FBPPimg"><span></span></div>';

document.body.insertBefore(div, document.body.lastChild.nextSibling);

document.getElementById('FBPPclose').addEventListener('click', function() { document.getElementById('FBPPdiv').style.display='none'; }, false);



GM_addStyle(

	'#FBPPdiv { display:none; position:fixed !important; top:2px !important; ' + bigPicPosition + ':2px !important; border:3px double #999999; background:#fcfcfc; padding:2px 4px; min-width:130px; z-index:99999 !important;}'+

	'#FBPPheader, #FBPPloading { text-align:center; color:#3366cc; font-variant:small-caps; font-weight:bold !important; }'+

	'#FBPPclose { text-align:right; color:#ffaaaa; cursor:pointer; font-weight:bold; height:1px; }'+

	'#FBPPclose:hover { color:#aa6666; }'+

	'#FBPPimg { text-align:center; }'+

	'#FBPPimg img { color:white; }'

);



processPage();



function processPage() {

	

	//

	// Make sure we're listening

	//

	if (!listening) {

		try { document.getElementById('content').addEventListener('DOMNodeInserted', processPage, false); listening = true; }

		catch(x) {}

	}

	

	//

	// Show big profile pictures

	//

	try {

		function addListeners(node) {

			node.className = node.className + ' fbf';

			if (smallPicBorder) { node.style.border = '3px double blue'; }

			node.addEventListener('mouseover', function() {

				var oldSrc;

				var newSrc;

				if (node.tagName.toLowerCase() == 'div') { oldSrc = this.style.backgroundImage.match(/url\((.*)\)/)[1]; }

				else  { oldSrc = this.src; }

				newSrc = oldSrc.replace(/\/[qst]([\d_]+)\.jpg/, "/n$1.jpg");

				profileLink = 'http://www.facebook.com/profile.php?id=' + newSrc.match(/\/n(\d+)_\d+\.jpg/)[1];

				document.getElementById('FBPPimg').innerHTML = '<a href="' + profileLink + '"><img src="' + newSrc + '" alt="Loading Pic..." /></a>';

				document.getElementById('FBPPdiv').style.display = 'block';

			}, false);

			if (bigPicAutoclose) {

				node.addEventListener('mouseout', function(e) {

					if (!e.shiftKey && !e.ctrlKey && !e.altKey) { document.getElementById('FBPPdiv').style.display = 'none'; }

				}, false);

			}

		}

		var images = document.getElementById('content').getElementsByTagName('img');

		for (i=0; i<images.length; i++) {

			if (images[i].src.indexOf('://profile.')!=-1&& images[i].src.match(/\/[qst]/) && images[i].className.indexOf('fbf')==-1) {

				addListeners(images[i]);

			}

		}

		var divs = document.evaluate("//div[@class='status_image']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);

		for (i=0; i<divs.snapshotLength; i++) {

			addListeners(divs.snapshotLength(i));

		}

	} catch(x) { GM_log('FB Profile Pic Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }



}



}) ();

