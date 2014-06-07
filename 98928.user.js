// ==UserScript==
// @name 		   BSCF : image selector : add images from the 'Favorites' folder
// @namespace	   http://supportforums.blackberry.com/t5/media/v1/imageuploaderpopuppage/
// @description	version 0.2
// @include		   http://supportforums.blackberry.com/t5/media/v1/imageuploaderpopuppage/board-id/*/tab/collection*
// ==/UserScript==


var imageList = new Array();
var xalbum = 'aa';
var m;

// fetch user id
var y = document.evaluate( "//input[@name='ticket']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0).getAttribute('value');
y = y.substr(1+y.lastIndexOf('_')); // 15208 for Xandrex

// fetch images gallery album named 'Favorites'
var req = new XMLHttpRequest();
req.open('GET', 'http://supportforums.blackberry.com/t5/media/gallerypage/user-id/'+y, false);
req.send(null);

if ( 200 == req.status ) {
	var r = req.responseText;
	var i=0;

	while (true) {
		i = r.indexOf('<div class="album-name">',i+1);
		if (i == -1) break;
		if (-1 != r.substring(i, r.indexOf('</div>',i) ).indexOf('>Favorites<')) {
			//<div class="album-name"><a class="lia-link-navigation" id="link_130" href="/t5/media/gallerypage/user-id/15208/album-id/3377">Favorites</a></div>
			i = r.indexOf('/t5/media/gallerypage/user-id/',i);
			xalbum = r.substring( i , r.indexOf('"',i) ); // /t5/media/gallerypage/user-id/15208/album-id/3377 for Xandrex
			break;
		}
	} // end while
} // end if

if ( 'aa' != xalbum ) {
	//  fetch content of 'Favorites' album
	req.open('GET','http://supportforums.blackberry.com/'+xalbum,false);
	// http://supportforums.blackberry.com/t5/media/gallerypage/user-id/15208/album-id/3377 for Xandrex
	req.send(null);
	if ( 200 == req.status ) {
		r = req.responseText;
		// <a class="image-preview lia-link-navigation image-thumbnail-link" id="link_129" href="/t5/media/gallerypage/user-id/15208/album-id/3377/image-id/1623i809160894ADF7FEF"><img title="Notification icons"                       alt="Notification icons"                       id="display_3" src="/t5/image/serverpage/image-id/1623i809160894ADF7FEF/image-size/thumb?v=mpbl-1&amp;px=100"/></a>
		// <a class="image-preview lia-link-navigation image-thumbnail-link" id="link_128" href="/t5/media/gallerypage/user-id/15208/album-id/3377/image-id/7461iD23F3DACADFD8EAD"><img title="tumblr_l6jxiaHSaI1qcb5s8o1_500_large.jpg" alt="tumblr_l6jxiaHSaI1qcb5s8o1_500_large.jpg" id="display_2" src="/t5/image/serverpage/image-id/7461iD23F3DACADFD8EAD/image-size/thumb?v=mpbl-1&amp;px=100"/></a>
		// xxxxxxxxxxxxxxxxxxxxxxx                                                                                                                xxxxxxxxxxyyyyyyyyyyyyyyyyyyyyy       xxxxxxxyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
		i=0;
		var string1 = '/image-id/';
		var string2 = 'title="';
		var a = ''; // image id
		var b = ''; // image title
		while (true) {
			i = r.indexOf('<a class="image-preview ',i+1);
			if (i == -1) break;
			i = string1.length + r.indexOf(string1,i);
			a = r.substring(i,r.indexOf('"',i));
			i = string2.length + r.indexOf(string2,i);
			b = r.substring(i,r.indexOf('"',i));
			imageList.push( new Array (a,b) );
		} // end while
	} // end if
} // end if

if (0 != imageList.length) {
	var Ximg;
	var Xa;
	var XdivA;
	var XdivB;
	var XdivC;
	var Xli;
	var MyScriptContent;
	var MyScriptElem;
	
	for (i=0 ; i< imageList.length ; i++) {
		m = imageList[i];
		a = m[0];
		b = m[1];
		Ximg = document.createElement('img');
			Ximg.title =m[1];
			Ximg.alt   =m[1];
			Ximg.id    ='display_2'+i;
			Ximg.src   ='http://supportforums.blackberry.com/t5/image/serverpage/image-id/'+m[0]+'/image-size/tiny?v=mpbl-1&amp;px=64';
		Xa = document.createElement('a');
			//Xa1.style ='height: 64px; width: 64px;'; // I failed in inserting this property. will have to investigate.
			Xa.class ='image-preview lia-link-navigation image-preview-link constrained';
			Xa.id    ='link_2'+i;
		Xa.appendChild(Ximg);
		XdivA = document.createElement('div');XdivA.class = 'lia-list-tile-image'        ;XdivA.appendChild(Xa  );
		XdivB = document.createElement('div');XdivB.class = 'lia-list-tile-image-wrapper';XdivB.appendChild(XdivA);
		XdivC = document.createElement('div');XdivC.class = 'image-display-group'        ;XdivC.appendChild(XdivB);
		Xli   = document.createElement('li' );                                            Xli.appendChild(  XdivC);

		document.evaluate( "//ul[@id='list']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0).appendChild(Xli);

		MyScriptContent = document.createTextNode('LITHIUM.CustomEvent("#link_2'+i+'", "click", false, "LITHIUM:selectImage", {"title":"tototo","imageId":"'+m[0]+'"});') ;
		MyScriptElem = document.createElement('script') ;
			MyScriptElem.type = 'text/javascript' ;
			MyScriptElem.appendChild(MyScriptContent) ;
		document.getElementsByTagName('body')[0].appendChild(MyScriptElem) ;
	} // end for
} // end if