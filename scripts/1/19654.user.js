// ==UserScript==
// @name          Rick Roll Remover
// @namespace     http://userscripts.org/users/2460
// @description	  Prevents Rick Rolls.
// @version       1.0.4
// @date          2008-01-30
// @include       http://*
// ==/UserScript==


// Rick Roll links.
var rolls = new Array(
	'youtube.com/watch?v=eBGIQ7ZuuiU',
	'youtube.com/watch?v=f2b1D5w82yU',
	'youtube.com/watch?v=ZOU8GIRUd_g',
	'youtube.com/watch?v=oHg5SJYRHA0',
	'youtube.com/watch?v=A3_n0B1EaOY',
	'youtube.com/watch?v=oHg5SJYRHA0',
	'youtube.com/watch?v=RnOt4aN2uyc',
	'youtube.com/watch?v=PIMrL4qXtJ0',
	'youtube.com/watch?v=Ho7IZ-3QCMs',
	'youtube.com/watch?v=uxIsiTo4VJo',
	'youtube.com/watch?v=GncUqYB2-BQ',
	'youtube.com/watch?v=rg8d5dcTWew',
	'youtube.com/watch?v=K0n7fXFIfGw',
	'youtube.com/watch?v=Ho7IZ-3QCMs',
	'youtube.com/watch?v=0md6Flcrd0s',
	'youtube.com/watch?v=yxnWl63Avo4',
	'youtube.com/watch?v=z-TxpI5rxE8',
	'youtube.com/watch?v=Z7eaeoQiZ0o',
	'youtube.com/watch?v=niYC8FK2fhI',
	'youtube.com/watch?v=NPgKxn8EfYY',
	'youtube.com/watch?v=XbHV51eLHno',
	'youtube.com/watch?v=veEs3DPCW8Q',
	'youtube.com/watch?v=bZaE68t4zJ8',
	'youtube.com/watch?v=Jwj0gLriTnk',
	'youtube.com/watch?v=Rc-kwIMbBSg',
	'youtube.com/watch?v=veEs3DPCW8Q',
	'youtube.com/watch?v=Z0wSeF4X5HE',
	'youtube.com/watch?v=JIir7ImpkHY',
	'youtube.com/watch?v=njg9aNA7-9M',
	'youtube.com/watch?v=3_ST6qBD2wg',
	'http://video.google.com/videoplay?docid=7378275554029349559',
	'dailymotion.com/video/x3bhp3_youtube-rick-roll_fun',
	'yougotrickrolled.com',
	'coedmagazine.com/tech/www.raygoldmodels.com',
	'internetisseriousbusiness.com',
	'smouch.net/lol',
	'asongbyagayguy.ytmnd.com',
	'halo3face.ytmnd.com',
	'myspace.com/heatherpixie88',
	'filmdrunk.com/post.phtml?pk=626',
	'destructoid.com/how-to-be-a-games-industry-news-tipster-with-joe-burling-35776.phtml',
	'video.yahoo.com/video/play?vid=651156',
	'raygoldmodels.com',
	'x.cursedsanctuary.com'
	);

// Page links.
// From: http://diveintogreasemonkey.org/patterns/match-attribute.html
var links = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Iterate through anchors.
for ( var i = 0; i < links.snapshotLength; i++ ) {
	link = links.snapshotItem( i );
	// Compare hrefs to rick roll links.
	var ref = new String( link.getAttribute("href") );
	for ( j in rolls ) {
		// Faux version of "startsWith" from http://www.oluyede.org/blog/2006/08/16/startswith-and-endswith-in-javascript-15/
		if ( ref.indexOf(rolls[j]) >= 0 ) {
			link.style.textDecoration = 'line-through';
		}
	}
}