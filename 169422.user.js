// ==UserScript==
// @name   UploadToMePWNED
// @include http://www.uploadtome.net/download/*
// @include http://uploadtome.net/download/*
// @copyright   2013 TheJailPad & xha0k
// @copyright   2013 UploadToMePWNED
//@author   TheJailPad & xha0k
// @version       1.0
// @description   Ajoute 1 bouton pour débrider UploadToMe.
// ==/UserScript==

// create button
var btn = document.createElement('input');
with( btn ) {
  setAttribute( 'onclick', 'compte = 0; document.getElementById("debrider").style.visibility = "hidden";' );
  setAttribute( 'value', 'Débrider' );
  setAttribute( 'id', 'debrider' );
  setAttribute( 'type', 'button' );
}

// append at end
document.getElementsByClassName( 'btn btn-success btn-large' )[ 0 ].appendChild( btn );