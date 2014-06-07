// ==UserScript==
// @name         lawblog::preview
// @author       userscripts0x42@spambog.com
// @description  Add Previewbox to lawblog.de comments
// @include      http://www.lawblog.de/index.php/archives/*
// ==/UserScript==


String.prototype.nl2br = function() {
	return this.replace( /(\r\n)|(\n\r)|\r|\n/g, '<br/>' );
}

function addPreviewBox() {
	
	var previewBox = document.createElement( 'p' );
	previewBox.innerHTML = '<div style="border: 2px outset #ff0000;"><div style="white-space: pre; background-color: #ff0000; color: #ffffff; font-weight: bold; padding: 2px;">Preview</div><div id="divPreview"></div></div>';
	document.getElementById( 'commentform' ).appendChild( previewBox );
	
}

unsafeWindow.showPreview = function( content ) {
	document.getElementById( 'divPreview' ).innerHTML = content.nl2br();
}

addPreviewBox();
document.getElementById( 'comment' ).setAttribute( 'onkeypress', 'showPreview( this.value )' );
unsafeWindow.showPreview( document.getElementById( 'comment' ).value );