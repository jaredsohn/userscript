// ==UserScript==
// @name       Meemi Replies Hider
// @namespace  http://marcotrulla.it/userscripts/
// @version    0.1.0
// @description  Shrinks/Expands meme's replies
// @run-at     document-end
// @require    https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @match      http://meemi.com/*
// @copyright  2014+, MarcoTrulla.it
// ==/UserScript==

function setStyle() {
  var $style = $( '<style id="meemi-replies-hider"/>' )
    .text( '.replies { height: 10px; overflow: hidden; }' );
  $( 'head' ).append( $style );
}

function setRepliesOption() {
  var $replyOptions = $( '.reply_tr' ),
    toggleEvent = function( evt ) {
      var $this = $( this );
      if ( $this.text() === 'expand' ) {
        $this.parent().prev().css( {
          height: 'auto'
        } );
        $this.text( 'shrink' );
      } else {
        $this.parent().prev().css( {
          height: '10px'
        } );
        $this.text( 'expand' );
      }
      return false;
    };
  $replyOptions.each( function() {
    var $this = $( this ),
      $link = $( '<a/>' ).attr( 'href', '#' ).text( 'expand' ).click( toggleEvent ),
      $sep = $( document.createTextNode( ' | ' ) );
    $link.insertBefore( $sep.insertBefore( $this.find( 'a' ).first() ) );
  } );
}

$( function() {
  setStyle();
  setRepliesOption();
} );
