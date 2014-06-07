// ==UserScript==
// @name           FC 3D Image Tool beta
// @namespace      http://userscripts.org/users/75950
// @description    Fotocommunity Image Tool for 3D Images beta
// @include        http://www.fotocommunity.de/*/display/*
// ==/UserScript==

window.addEventListener('load', startUp, false);

var ctx = null;
var theImage = null;
var flipped = false;
var theCenter = 0;
var linesshown = false;
var isredcyan = false;
var isinterlaced = false;
var ismonochrom = false;
var sfIsOriginal = 'original';
var sfOffset = 0;
var preselect = '';

function detectPage() {
	if(preselect != '') return preselect;
	if(location.href.indexOf('/5584/') != -1) return 'kreuz';
	if(location.href.indexOf('/5585/') != -1) return 'parallel';
	if(location.href.indexOf('/2616/') != -1) return 'anaglyph';
	return 'sonstige';
}

function startUp() {
	switch(detectPage()) {
		case 'kreuz':
		case 'parallel':
		case 'anaglyph':	createCanvas();
							break;
		case 'sonstige':	createLinks();
							break;
		default:			break;
	}
}

function createLinks() {
	var newSpan = document.createElement('span');
	newSpan.style.paddingRight = '5px';
	newSpan.id = 'fc_links_label';
	var theText = document.createTextNode('Bei diesem Foto handelt es sich um ein: ');
	newSpan.appendChild(theText);
	document.getElementById('display_foto').insertBefore(newSpan, document.getElementById('fc_image'));

	newSpan = document.createElement('span');
	newSpan.style.paddingRight = '5px';
	newSpan.id = 'fc_links_kreuz';
	var newAnchor = document.createElement('a');
	newAnchor.href = '#';
	theText = document.createTextNode('Kreuzblickstereo');
	newAnchor.appendChild(theText);
	newSpan.appendChild(newAnchor);
	document.getElementById('display_foto').insertBefore(newSpan, document.getElementById('fc_image'));
	document.getElementById('fc_links_kreuz').addEventListener('click', function() {
		preselect = 'kreuz';
		removeLinks();
		createCanvas();
		return false;
	}, false);
	
	newSpan = document.createElement('span');
	newSpan.style.paddingRight = '5px';
	newSpan.id = 'fc_links_sep1';
	theText = document.createTextNode('/');
	newSpan.appendChild(theText);
	document.getElementById('display_foto').insertBefore(newSpan, document.getElementById('fc_image'));

	newSpan = document.createElement('span');
	newSpan.style.paddingRight = '5px';
	newSpan.id = 'fc_links_parallel';
	newAnchor = document.createElement('a');
	newAnchor.href = '#';
	theText = document.createTextNode('Parallelblickstereo');
	newAnchor.appendChild(theText);
	newSpan.appendChild(newAnchor);
	document.getElementById('display_foto').insertBefore(newSpan, document.getElementById('fc_image'));
	document.getElementById('fc_links_parallel').addEventListener('click', function() {
		preselect = 'parallel';
		removeLinks();
		createCanvas();
		return false;
	}, false);
	
	newSpan = document.createElement('span');
	newSpan.style.paddingRight = '5px';
	newSpan.id = 'fc_links_sep2';
	theText = document.createTextNode('/');
	newSpan.appendChild(theText);
	document.getElementById('display_foto').insertBefore(newSpan, document.getElementById('fc_image'));

	newSpan = document.createElement('span');
	newSpan.style.paddingRight = '5px';
	newSpan.id = 'fc_links_anaglyph';
	newAnchor = document.createElement('a');
	newAnchor.href = '#';
	theText = document.createTextNode('Anaglyphenstereo');
	newAnchor.appendChild(theText);
	newSpan.appendChild(newAnchor);
	document.getElementById('display_foto').insertBefore(newSpan, document.getElementById('fc_image'));
	document.getElementById('fc_links_anaglyph').addEventListener('click', function() {
		preselect = 'anaglyph';
		removeLinks();
		createCanvas();
		return false;
	}, false);
}

function removeLinks() {
	document.getElementById('fc_links_label').parentNode.removeChild(document.getElementById('fc_links_label'));
	document.getElementById('fc_links_kreuz').parentNode.removeChild(document.getElementById('fc_links_kreuz'));
	document.getElementById('fc_links_sep1').parentNode.removeChild(document.getElementById('fc_links_sep1'));
	document.getElementById('fc_links_parallel').parentNode.removeChild(document.getElementById('fc_links_parallel'));
	document.getElementById('fc_links_sep2').parentNode.removeChild(document.getElementById('fc_links_sep2'));
	document.getElementById('fc_links_anaglyph').parentNode.removeChild(document.getElementById('fc_links_anaglyph'));
}

function createCanvas() {
	theImagesrc = document.getElementById('fc_image').src;
	
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: theImagesrc,
	  overrideMimeType: 'text/plain; charset=x-user-defined',
	  onload: function ( xhr ) {
		var data = '';
		theImage = new Image();

		  for ( var i = 0; i < xhr.responseText.length; i++ ) data += String.fromCharCode( ( xhr.responseText[ i ].charCodeAt(0) & 0xff ) );
		// Convert raw data to base64.
		data = btoa( data );
		// Write Base64 data to a image
		theImage.src = 'data:image/jpg;base64,' + data; // This will change depending on image type

		// Listener fires when image is ready
		theImage.addEventListener( 'load', function() {
			GM_addStyle('canvas {position: relative; text-align:center; left: '+window.getComputedStyle(document.getElementById('fc_image'),false).left+';} #showwait {position: fixed; top: 200px; left: 490px; padding: 3px; width: 100px; border: 1px solid black; z-index: 10000; color: black; background-color: white;}');
			var newCanvas = unsafeWindow.document.createElement('canvas');
			newCanvas.id = 'fc_image_canvas';
			newCanvas.width = document.getElementById('fc_image').width;
			newCanvas.height = document.getElementById('fc_image').height;
			if(detectPage() == 'anaglyph') newCanvas.style.display = 'none';
			unsafeWindow.document.getElementById('display_foto').insertBefore(newCanvas, unsafeWindow.document.getElementById('fc_image'));
			var canvas = unsafeWindow.document.getElementById('fc_image_canvas');  
			ctx = canvas.getContext('2d');
			ctx.drawImage(theImage, 0, 0 );
			theCenter = Math.floor(theImage.width / 2);
		}, false );

	  }
	});

	if(detectPage() != 'anaglyph') {
		document.getElementById('fc_image').style.display = 'none';
		
		var theButton = document.createElement('input');
		theButton.id = 'fc_image_flip';
		theButton.type = 'button';
		if(detectPage() == 'kreuz') {
			theButton.value = '-> Parallelblick';
		} else {
			theButton.value = '-> Kreuzblick';
		}
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image'));
		document.getElementById('fc_image_flip').addEventListener('click', flipImage, false);

		theButton = document.createElement('input');
		theButton.id = 'fc_image_showline';
		theButton.type = 'button';
		theButton.value = 'Hilfslinien';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image'));
		document.getElementById('fc_image_showline').addEventListener('click', showLine, false);

		theButton = document.createElement('input');
		theButton.id = 'fc_image_redcyan';
		theButton.type = 'button';
		theButton.style.marginLeft = '10px';
		theButton.value = 'Red/Cyan';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image'));
		document.getElementById('fc_image_redcyan').addEventListener('click', showWait, false);
		
		var theCheckbox = document.createElement('input');
		theCheckbox.id = 'fc_image_halftone';
		theCheckbox.type = 'checkbox';
		theCheckbox.checked = false;
		document.getElementById('display_foto').insertBefore(theCheckbox, document.getElementById('fc_image'));
		document.getElementById('fc_image_halftone').addEventListener('click', toggleHalftone, false);

		var theSpan = document.createElement('span');
		theSpan.id = 'fc_image_halftonelabel';
		var theText = document.createTextNode('Halbton');
		theSpan.appendChild(theText);
		document.getElementById('display_foto').insertBefore(theSpan, document.getElementById('fc_image'));

		theButton = document.createElement('input');
		theButton.id = 'fc_image_interlaced';
		theButton.type = 'button';
		theButton.style.marginLeft = '10px';
		theButton.value = 'Zalman Interlaced';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image'));
		document.getElementById('fc_image_interlaced').addEventListener('click', showWaitInterlaced, false);
		
		theCheckbox = document.createElement('input');
		theCheckbox.id = 'fc_image_interlaceswitch';
		theCheckbox.type = 'checkbox';
		theCheckbox.checked = false;
		document.getElementById('display_foto').insertBefore(theCheckbox, document.getElementById('fc_image'));
		document.getElementById('fc_image_interlaceswitch').addEventListener('click', toggleInterlace, false);

		theSpan = document.createElement('span');
		theSpan.id = 'fc_image_iswitchlabel';
		theText = document.createTextNode('gerade/ungerade tauschen');
		theSpan.appendChild(theText);
		document.getElementById('display_foto').insertBefore(theSpan, document.getElementById('fc_image'));

		var newDiv = document.createElement('div');
		newDiv.id = 'showwait';
		var theText = document.createTextNode('Bitte warten...');
		newDiv.appendChild(theText);
		document.getElementById('display_foto').appendChild(newDiv);
		document.getElementById('showwait').style.display = 'none';
	} else {
		var theSpan = document.createElement('span');
		theSpan.id = 'fc_image_sfOffsetLabel';
		theSpan.style.paddingRight = '5px';
		var theText = document.createTextNode('Horiz. Verschiebung: ');
		theSpan.appendChild(theText);
		document.getElementById('display_foto').insertBefore(theSpan, document.getElementById('fc_image'));
		
		theSpan = document.createElement('span');
		theSpan.id = 'fc_image_sfOffset';
		theSpan.style.paddingRight = '5px';
		theText = document.createTextNode(sfOffset.toString());
		theSpan.appendChild(theText);
		document.getElementById('display_foto').insertBefore(theSpan, document.getElementById('fc_image'));
		
		var theButton = document.createElement('input');
		theButton.id = 'fc_image_monokreuz';
		theButton.type = 'button';
		theButton.value = 'Monochrom Kreuzblick';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image'));
		document.getElementById('fc_image_monokreuz').addEventListener('click', showWaitMono, false);

		theButton = document.createElement('input');
		theButton.id = 'fc_image_scheinfenster';
		theButton.type = 'button';
		theButton.value = 'Scheinfenster';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image'));
		document.getElementById('fc_image_scheinfenster').addEventListener('click', scheinFenster, false);

		var newDiv = document.createElement('div');
		newDiv.id = 'showwait';
		var theText = document.createTextNode('Bitte warten...');
		newDiv.appendChild(theText);
		document.getElementById('display_foto').appendChild(newDiv);
		document.getElementById('showwait').style.display = 'none';
	}
}

function scheinFenster() {
	if(!ctx) return;
	if(sfIsOriginal=='original') {
		document.getElementById('fc_image').style.display = 'none';
		document.getElementById('fc_image_monokreuz').style.display = 'none';
		document.getElementById('fc_image_canvas').style.display = '';
		var theButton = document.createElement('input');
		theButton.id = 'fc_image_ziehen';
		theButton.type = 'button';
		theButton.value = 'Scheinfenster ziehen';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image_canvas'));
		document.getElementById('fc_image_ziehen').addEventListener('click', sfZiehen, false);

		theButton = document.createElement('input');
		theButton.id = 'fc_image_druecken';
		theButton.type = 'button';
		theButton.value = 'Scheinfenster druecken';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image_canvas'));
		document.getElementById('fc_image_druecken').addEventListener('click', sfDruecken, false);
		
		theButton = document.createElement('input');
		theButton.id = 'fc_image_reset';
		theButton.type = 'button';
		theButton.value = 'Reset';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image_canvas'));
		document.getElementById('fc_image_reset').addEventListener('click', sfReset, false);

		sfDrawLines();
		
		document.getElementById('fc_image_scheinfenster').value = 'Anwenden';
		sfIsOriginal = 'verschoben';
	} else {
		if(sfIsOriginal == 'verschoben') {
			ctx.drawImage(theImage, 0, 0);
			document.getElementById('showwait').style.display = '';
			window.setTimeout(redrawAnaglyph, 300);
		} else {
			// neuanaglyph (Button Original gedrueckt)
			document.getElementById('fc_image_scheinfenster').value = 'Scheinfenster';
			document.getElementById('fc_image').style.display = '';
			document.getElementById('fc_image_monokreuz').style.display = '';
			document.getElementById('fc_image_canvas').style.display = 'none';
			document.getElementById('fc_image_canvas2').parentNode.removeChild(document.getElementById('fc_image_canvas2'));
			sfIsOriginal = 'original';
		}
	}
}

function redrawAnaglyph() {
	// Scheinfensterverschiebung anwenden
	if(sfOffset!=0) {
		var newCanvas = unsafeWindow.document.createElement('canvas');
		newCanvas.id = 'fc_image_canvas2';
		newCanvas.width = theImage.width*2;
		newCanvas.height = theImage.height;
		unsafeWindow.document.getElementById('display_foto').insertBefore(newCanvas, unsafeWindow.document.getElementById('fc_image_canvas'));
		var canvas = unsafeWindow.document.getElementById('fc_image_canvas2');  
		ctx2 = canvas.getContext('2d');
		if(sfOffset<0) {
			ctx2.drawImage(unsafeWindow.document.getElementById('fc_image_canvas'), theImage.width, 0); // rechts
			ctx2.drawImage(unsafeWindow.document.getElementById('fc_image_canvas'), sfOffset, 0); // links
			var theImageData_links = ctx2.getImageData(0, 0, theImage.width+sfOffset, theImage.height);
			var theImageData_rechts = ctx2.getImageData(theImage.width, 0, theImage.width+sfOffset, theImage.height);
		} else {
			ctx2.drawImage(unsafeWindow.document.getElementById('fc_image_canvas'), theImage.width+sfOffset, 0); // rechts
			ctx2.drawImage(unsafeWindow.document.getElementById('fc_image_canvas'), sfOffset, 0); // links
			var theImageData_links = ctx2.getImageData(sfOffset, 0, theImage.width-2*sfOffset, theImage.height);
			var theImageData_rechts = ctx2.getImageData(theImage.width+2*sfOffset, 0, theImage.width-2*sfOffset, theImage.height);
		}
		var pixels_links = theImageData_links.data;
		var pixels_rechts = theImageData_rechts.data;
		
		for (var i = 0, n = pixels_links.length; i < n; i += 4) {
			pixels_links[i] = pixels_links[i]; // rot vom linken Bild, blau und gruen vom rechten
			pixels_links[i+1] = pixels_rechts[i+1];
			pixels_links[i+2] = pixels_rechts[i+2];

			// Rechtes Teilbild in FC Farben
			pixels_rechts[i] = 34;
			pixels_rechts[i+1] = 34;
			pixels_rechts[i+2] = 34;
		}
		// Draw the ImageData at the given (x,y) coordinates.
		ctx2.putImageData(theImageData_links, 0, 0);
		ctx2.putImageData(theImageData_rechts, theImage.width, 0);
		delete theImageData_links;
		theImageData_links = null;
		delete theImageData_rechts;
		theImageData_rechts = null;

		document.getElementById('showwait').style.display = 'none';
		sfIsOriginal = 'neuanaglyph';
		sfRemoveButtons();
		document.getElementById('fc_image_scheinfenster').value = 'Original';
		document.getElementById('fc_image').style.display = 'none';
		document.getElementById('fc_image_monokreuz').style.display = 'none';
		document.getElementById('fc_image_canvas').style.display = 'none';
	} else {
		document.getElementById('showwait').style.display = 'none';
		sfIsOriginal = 'original';
		sfRemoveButtons();
		document.getElementById('fc_image_scheinfenster').value = 'Scheinfenster';
		document.getElementById('fc_image').style.display = '';
		document.getElementById('fc_image_monokreuz').style.display = '';
		document.getElementById('fc_image_canvas').style.display = 'none';
	}
}

function sfDrawLines() {
	if(sfOffset>=0) {
		// linker Rand
		ctx.beginPath();
		ctx.moveTo(sfOffset, 0);
		ctx.lineTo(sfOffset, theImage.height);
		ctx.closePath();
		ctx.strokeStyle = "rgba(255, 0, 0, 1)";
		ctx.stroke();
	}
	if(sfOffset<=0) {
		// rechter Rand
		ctx.beginPath();
		ctx.moveTo(theImage.width+sfOffset, 0);
		ctx.lineTo(theImage.width+sfOffset, theImage.height);
		ctx.closePath();
		ctx.strokeStyle = "rgba(255, 0, 0, 1)";
		ctx.stroke();
	}
	document.getElementById('fc_image_sfOffset').textContent = sfOffset.toString();
}

function sfRemoveButtons() {
	document.getElementById('fc_image_scheinfenster').value = 'Scheinfenster';
	var theButton = document.getElementById('fc_image_ziehen');
	document.getElementById('display_foto').removeChild(theButton);
	theButton = document.getElementById('fc_image_druecken');
	document.getElementById('display_foto').removeChild(theButton);
	theButton = document.getElementById('fc_image_reset');
	document.getElementById('display_foto').removeChild(theButton);
	document.getElementById('fc_image').style.display = '';
	document.getElementById('fc_image_monokreuz').style.display = '';
	document.getElementById('fc_image_canvas').style.display = 'none';
}

function sfZiehen() {
	sfOffset--;
	ctx.drawImage(theImage, 0, 0);
	sfDrawLines();
}

function sfDruecken() {
	sfOffset++;
	ctx.drawImage(theImage, 0, 0);
	sfDrawLines();
}

function sfReset() {
	sfOffset = 0;
	ctx.drawImage(theImage, 0, 0);
	sfDrawLines();
}

function showWaitMono() {
	if(!ctx) return;
	document.getElementById('showwait').style.display = 'block';
	window.setTimeout(monoKreuz, 300);
}

function monoKreuz() {
	if(!ismonochrom) {
		document.getElementById('fc_image').style.display = 'none';
		document.getElementById('fc_image_scheinfenster').style.display = 'none';
		var newCanvas = unsafeWindow.document.createElement('canvas');
		newCanvas.id = 'fc_image_canvas2';
		newCanvas.width = theImage.width+20;
		newCanvas.height = Math.floor(theImage.height/2)+1;
		unsafeWindow.document.getElementById('display_foto').insertBefore(newCanvas, unsafeWindow.document.getElementById('fc_image_canvas'));
		var canvas = unsafeWindow.document.getElementById('fc_image_canvas2');  
		ctx2 = canvas.getContext('2d');
		ctx2.drawImage(document.getElementById('fc_image_canvas'), 0, 0, Math.floor(theImage.width/2), Math.floor(theImage.height/2) );
		ctx2.drawImage(document.getElementById('fc_image_canvas'), Math.floor(theImage.width/2)+20, 0, Math.floor(theImage.width/2), Math.floor(theImage.height/2));
		var theImageData = ctx2.getImageData(0, 0, Math.floor(theImage.width/2), Math.floor(theImage.height/2));
		var pixels = theImageData.data;
		
		for (var i = 0, n = pixels.length; i < n; i += 4) {
			var theGray = Math.floor((pixels[i+1]+pixels[i+2])/2);
			pixels[i] = theGray;
			pixels[i+1] = theGray;
			pixels[i+2] = theGray;
		}
		ctx2.putImageData(theImageData, 0, 0);
		delete theImageData;
		theImageData = null;

		theImageData = ctx2.getImageData(Math.floor(theImage.width/2)+20, 0, Math.floor(theImage.width/2), Math.floor(theImage.height/2));
		pixels = theImageData.data;
		
		for (var i = 0, n = pixels.length; i < n; i += 4) {
			pixels[i+1] = pixels[i];
			pixels[i+2] = pixels[i];
		}
		ctx2.putImageData(theImageData, Math.floor(theImage.width/2)+20, 0);
		delete theImageData;
		theImageData = null;
		ismonochrom = true;
		document.getElementById('fc_image_monokreuz').value = 'Original';
	} else {
		var CanvasToDelete = document.getElementById('fc_image_canvas2');
		CanvasToDelete.parentNode.removeChild(CanvasToDelete);
		document.getElementById('fc_image').style.display = '';
		document.getElementById('fc_image_scheinfenster').style.display = '';
		ismonochrom = false;
		document.getElementById('fc_image_monokreuz').value = 'Monochrom Kreuzblick';
	}
	document.getElementById('showwait').style.display = 'none';
}

function toggleHalftone() {
	isredcyan = false;
}

function toggleInterlace() {
	isinterlaced = false;
}

function flipImage() {
	if(!ctx) return;
	if(linesshown) {
		RemoveButtons();
		linesshown = false;
	}
	if(!flipped) {
		// Paste image two times
		// First image is moved half way to the left
		// second image is moved half way to the right
		ctx.drawImage(theImage, -theCenter, 0);
		ctx.drawImage(theImage, theCenter, 0);
		flipped = true;
	} else {
		ctx.drawImage(theImage, 0, 0);
		flipped = false;
	}
	ButtonText();
	isredcyan = false;
	isinterlaced = false;
}

function ButtonText() {
	var theButton = document.getElementById('fc_image_flip');
	if(detectPage() == 'kreuz') {
		if(flipped) {
			theButton.value = '-> Kreuzblick';
		} else {
			theButton.value = '-> Parallelblick';
		}
	} else {
		if(flipped) {
			theButton.value = '-> Parallelblick';
		} else {
			theButton.value = '-> Kreuzblick';
		}
	}
}

function showLine() {
	if(!ctx) return;
	ctx.drawImage(theImage, 0, 0);
	flipped = false;
	ButtonText();
	isredcyan = false;
	isinterlaced = false;
	if(!linesshown) {
		// linker Rand
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, theImage.height);
		ctx.closePath();
		ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
		ctx.stroke();
		// rechter Rand
		ctx.beginPath();
		ctx.moveTo(theImage.width, 0);
		ctx.lineTo(theImage.width, theImage.height);
		ctx.closePath();
		ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
		ctx.stroke();
		// Mitte
		ctx.beginPath();
		ctx.moveTo(theCenter, 0);
		ctx.lineTo(theCenter, theImage.height);
		ctx.closePath();
		ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
		ctx.stroke();

		var theButton = document.createElement('input');
		theButton.id = 'fc_image_left';
		theButton.type = 'button';
		theButton.value = '<';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image_redcyan'));
		document.getElementById('fc_image_left').addEventListener('click', moveLineLeft, false);

		theButton = document.createElement('input');
		theButton.id = 'fc_image_right';
		theButton.type = 'button';
		theButton.value = '>';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image_redcyan'));
		document.getElementById('fc_image_right').addEventListener('click', moveLineRight, false);
		
		theButton = document.createElement('input');
		theButton.id = 'fc_image_center';
		theButton.type = 'button';
		theButton.value = 'Center';
		document.getElementById('display_foto').insertBefore(theButton, document.getElementById('fc_image_redcyan'));
		document.getElementById('fc_image_center').addEventListener('click', moveLineCenter, false);

		document.getElementById('fc_image_showline').value = 'Hilfslinien ausblenden';
		linesshown = true;
	} else {
		RemoveButtons();
		linesshown = false;
	}
}

function RemoveButtons() {
	document.getElementById('fc_image_showline').value = 'Hilfslinien';
	var theButton = document.getElementById('fc_image_left');
	document.getElementById('display_foto').removeChild(theButton);
	theButton = document.getElementById('fc_image_right');
	document.getElementById('display_foto').removeChild(theButton);
	theButton = document.getElementById('fc_image_center');
	document.getElementById('display_foto').removeChild(theButton);
}

function moveLineLeft() {
	ctx.drawImage(theImage, 0, 0);
	theCenter--;
	if(theCenter<0) theCenter = 0;
	// linker Rand
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, theImage.height);
	ctx.closePath();
	ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
	ctx.stroke();
	// rechter Rand
	ctx.beginPath();
	ctx.moveTo(theImage.width, 0);
	ctx.lineTo(theImage.width, theImage.height);
	ctx.closePath();
	ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
	ctx.stroke();
	// Mitte
	ctx.beginPath();
	ctx.moveTo(theCenter, 0);
	ctx.lineTo(theCenter, theImage.height);
	ctx.closePath();
	ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
	ctx.stroke();
}

function moveLineRight() {
	ctx.drawImage(theImage, 0, 0);
	theCenter++;
	if(theCenter>(theImage.width-1)) theCenter = theImage.width-1;
	// linker Rand
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, theImage.height);
	ctx.closePath();
	ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
	ctx.stroke();
	// rechter Rand
	ctx.beginPath();
	ctx.moveTo(theImage.width, 0);
	ctx.lineTo(theImage.width, theImage.height);
	ctx.closePath();
	ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
	ctx.stroke();
	// Mitte
	ctx.beginPath();
	ctx.moveTo(theCenter, 0);
	ctx.lineTo(theCenter, theImage.height);
	ctx.closePath();
	ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
	ctx.stroke();
}

function moveLineCenter() {
	ctx.drawImage(theImage, 0, 0);
	theCenter = Math.floor(theImage.width / 2);
	// linker Rand
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, theImage.height);
	ctx.closePath();
	ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
	ctx.stroke();
	// rechter Rand
	ctx.beginPath();
	ctx.moveTo(theImage.width, 0);
	ctx.lineTo(theImage.width, theImage.height);
	ctx.closePath();
	ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
	ctx.stroke();
	// Mitte
	ctx.beginPath();
	ctx.moveTo(theCenter, 0);
	ctx.lineTo(theCenter, theImage.height);
	ctx.closePath();
	ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
	ctx.stroke();
}

function showWait() {
	if(!ctx) return;
	if(isredcyan) return;
	document.getElementById('showwait').style.display = 'block';
	var isHalftone = document.getElementById('fc_image_halftone').checked;
	if(!isHalftone) {
		window.setTimeout(makeAnaglyph, 300);
	} else {
		window.setTimeout(HalftoneAnaglyph, 300);
	}
}

function makeAnaglyph() {
	ctx.drawImage(theImage, 0, 0);
	flipped = false;
	ButtonText();
	isredcyan = true;
	isinterlaced = false;
	if(linesshown) {
		RemoveButtons();
		linesshown = false;
	}
	
	var centerDiff = theCenter - Math.floor(theImage.width / 2);
	
	if(detectPage() == 'kreuz') {
		// Kreuzblick
		// links muss rot weg, rechts muss gruen/blau weg
		if(centerDiff<=0) {
			var theImageData_links = ctx.getImageData(0, 0, theCenter, theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter, theImage.height);
		} else {
			var theImageData_links = ctx.getImageData(0, 0, theCenter-(centerDiff*2), theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter-(centerDiff*2), theImage.height);
		}
		var pixels_links = theImageData_links.data;
		var pixels_rechts = theImageData_rechts.data;
		
		for (var i = 0, n = pixels_links.length; i < n; i += 4) {
			pixels_links[i] = pixels_rechts[i]; // rot vom rechten Bild blau und gruen vom linken

			// Rechtes Teilbild in FC Farben
			pixels_rechts[i] = 34;
			pixels_rechts[i+1] = 34;
			pixels_rechts[i+2] = 34;
		}
		// Draw the ImageData at the given (x,y) coordinates.
		ctx.putImageData(theImageData_links, 0, 0);
		ctx.putImageData(theImageData_rechts, theCenter, 0);
		delete theImageData_links;
		theImageData_links = null;
		delete theImageData_rechts;
		theImageData_rechts = null;
	} else {
		// Parallelblick
		// links muss gruen/blau weg, rechts muss rot weg
		if(centerDiff<=0) {
			var theImageData_links = ctx.getImageData(0, 0, theCenter, theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter, theImage.height);
		} else {
			var theImageData_links = ctx.getImageData(0, 0, theCenter-(centerDiff*2), theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter-(centerDiff*2), theImage.height);
		}
		var pixels_links = theImageData_links.data;
		var pixels_rechts = theImageData_rechts.data;
		
		for (var i = 0, n = pixels_links.length; i < n; i += 4) {
			pixels_links[i] = pixels_links[i]; // rot vom linken Bild, blau und gruen vom rechten
			pixels_links[i+1] = pixels_rechts[i+1];
			pixels_links[i+2] = pixels_rechts[i+2];

			// Rechtes Teilbild in FC Farben
			pixels_rechts[i] = 34;
			pixels_rechts[i+1] = 34;
			pixels_rechts[i+2] = 34;
		}
		// Draw the ImageData at the given (x,y) coordinates.
		ctx.putImageData(theImageData_links, 0, 0);
		ctx.putImageData(theImageData_rechts, theCenter, 0);
		delete theImageData_links;
		theImageData_links = null;
		delete theImageData_rechts;
		theImageData_rechts = null;
	}
	document.getElementById('showwait').style.display = 'none';
}

function HalftoneAnaglyph() {
	// A halftone algorithm from http://3dtv.at/Knowhow/AnaglyphComparison_en.aspx
	ctx.drawImage(theImage, 0, 0);
	flipped = false;
	ButtonText();
	isredcyan = true;
	isinterlaced = false;
	if(linesshown) {
		RemoveButtons();
		linesshown = false;
	}
	
	var centerDiff = theCenter - Math.floor(theImage.width / 2);
	
	if(detectPage() == 'kreuz') {
		// Kreuzblick
		// links muss rot weg, rechts muss gruen/blau weg
		if(centerDiff<=0) {
			var theImageData_links = ctx.getImageData(0, 0, theCenter, theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter, theImage.height);
		} else {
			var theImageData_links = ctx.getImageData(0, 0, theCenter-(centerDiff*2), theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter-(centerDiff*2), theImage.height);
		}
		var pixels_links = theImageData_links.data;
		var pixels_rechts = theImageData_rechts.data;
		
		for (var i = 0, n = pixels_links.length; i < n; i += 4) {
			// pixels_links[i] = 0.7*pixels_rechts[i+1] + 0.3*pixels_rechts[i+2]; // rot halftone Wimmer
			pixels_links[i] = 0.299*pixels_rechts[i] + 0.587*pixels_rechts[i+1] + 0.114*pixels_rechts[i+2]; // rot halftone common

			// Rechtes Teilbild in FC Farben
			pixels_rechts[i] = 34;
			pixels_rechts[i+1] = 34;
			pixels_rechts[i+2] = 34;
		}
		// Draw the ImageData at the given (x,y) coordinates.
		ctx.putImageData(theImageData_links, 0, 0);
		ctx.putImageData(theImageData_rechts, theCenter, 0);
		delete theImageData_links;
		theImageData_links = null;
		delete theImageData_rechts;
		theImageData_rechts = null;
	} else {
		// Parallelblick
		// links muss gruen/blau weg, rechts muss rot weg
		if(centerDiff<=0) {
			var theImageData_links = ctx.getImageData(0, 0, theCenter, theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter, theImage.height);
		} else {
			var theImageData_links = ctx.getImageData(0, 0, theCenter-(centerDiff*2), theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter-(centerDiff*2), theImage.height);
		}
		var pixels_links = theImageData_links.data;
		var pixels_rechts = theImageData_rechts.data;
		
		for (var i = 0, n = pixels_links.length; i < n; i += 4) {
			// pixels_links[i] = 0.7*pixels_rechts[i+1] + 0.3*pixels_rechts[i+2]; // rot halftone Wimmer
			pixels_links[i] = 0.299*pixels_links[i] + 0.587*pixels_links[i+1] + 0.114*pixels_links[i+2]; // rot halftone common
			pixels_links[i+1] = pixels_rechts[i+1];
			pixels_links[i+2] = pixels_rechts[i+2];

			// Rechtes Teilbild in FC Farben
			pixels_rechts[i] = 34;
			pixels_rechts[i+1] = 34;
			pixels_rechts[i+2] = 34;
		}
		// Draw the ImageData at the given (x,y) coordinates.
		ctx.putImageData(theImageData_links, 0, 0);
		ctx.putImageData(theImageData_rechts, theCenter, 0);
		delete theImageData_links;
		theImageData_links = null;
		delete theImageData_rechts;
		theImageData_rechts = null;
	}
	document.getElementById('showwait').style.display = 'none';
}

function showWaitInterlaced() {
	if(!ctx) return;
	if(isinterlaced) return;
	document.getElementById('showwait').style.display = 'block';
	window.setTimeout(makeInterlace, 300);
}

function makeInterlace() {
	var isSwitched = document.getElementById('fc_image_interlaceswitch').checked;
	ctx.drawImage(theImage, 0, 0);
	flipped = false;
	ButtonText();
	isinterlaced = true;
	isredcyan = false;
	if(linesshown) {
		RemoveButtons();
		linesshown = false;
	}
	
	var centerDiff = theCenter - Math.floor(theImage.width / 2);
	
	if(detectPage() == 'kreuz') {
		// Kreuzblick
		if(centerDiff<=0) {
			var theImageData_links = ctx.getImageData(0, 0, theCenter, theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter, theImage.height);
			var theWidth = theCenter;
		} else {
			var theImageData_links = ctx.getImageData(0, 0, theCenter-(centerDiff*2), theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter-(centerDiff*2), theImage.height);
			var theWidth = theCenter-(centerDiff*2);
		}
		
		var pixels_links = theImageData_links.data;
		var pixels_rechts = theImageData_rechts.data;
		
		var zeile = 1;
		var spalte = 0;
		if(isSwitched) zeile = 0;

		for (var i = 0, n = pixels_links.length; i < n; i += 4) {
			if(spalte == theWidth) {
				zeile++;
				spalte = 0;
			}
			if(zeile % 2 == 0) {
				// gerade Zeilen von rechts die ungeraden sind automatisch von links
				pixels_links[i] = pixels_rechts[i];
				pixels_links[i+1] = pixels_rechts[i+1];
				pixels_links[i+2] = pixels_rechts[i+2];
			}
				
			// rechte Pixel zuruecksetzen
			pixels_rechts[i] = 34;
			pixels_rechts[i+1] = 34;
			pixels_rechts[i+2] = 34;

			spalte++;
		}
		// Draw the ImageData at the given (x,y) coordinates.
		ctx.putImageData(theImageData_links, 0, 0);
		ctx.putImageData(theImageData_rechts, theCenter, 0);
		delete theImageData_links;
		theImageData_links = null;
		delete theImageData_rechts;
		theImageData_rechts = null;
	} else {
		// Parallelblick
		if(centerDiff<=0) {
			var theImageData_links = ctx.getImageData(0, 0, theCenter, theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter, theImage.height);
			var theWidth = theCenter;
		} else {
			var theImageData_links = ctx.getImageData(0, 0, theCenter-(centerDiff*2), theImage.height);
			var theImageData_rechts = ctx.getImageData(theCenter, 0, theCenter-(centerDiff*2), theImage.height);
			var theWidth = theCenter-(centerDiff*2);
		}
		
		var pixels_links = theImageData_links.data;
		var pixels_rechts = theImageData_rechts.data;
		
		var zeile = 1;
		var spalte = 0;
		if(isSwitched) zeile = 0;

		for (var i = 0, n = pixels_links.length; i < n; i += 4) {
			if(spalte == theWidth) {
				zeile++;
				spalte = 0;
			}
			if(zeile % 2 != 0) {
				// ungerade Zeilen von rechts die geraden sind automatisch von links
				pixels_links[i] = pixels_rechts[i];
				pixels_links[i+1] = pixels_rechts[i+1];
				pixels_links[i+2] = pixels_rechts[i+2];
			}
				
			// rechte Pixel zuruecksetzen
			pixels_rechts[i] = 34;
			pixels_rechts[i+1] = 34;
			pixels_rechts[i+2] = 34;

			spalte++;
		}
		// Draw the ImageData at the given (x,y) coordinates.
		ctx.putImageData(theImageData_links, 0, 0);
		ctx.putImageData(theImageData_rechts, theCenter, 0);
		delete theImageData_links;
		theImageData_links = null;
		delete theImageData_rechts;
		theImageData_rechts = null;
	}
	
	document.getElementById('showwait').style.display = 'none';
}
