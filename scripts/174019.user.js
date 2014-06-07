// ==UserScript==
// @name       Amazon-Mein-Wunschpreis-Button
// @namespace  http://campino2k.de
// @version    0.1.3
// @description  Show Links zu "Mein-Wunschpreis.com" on Amazon
// @include		*//*amazon.*/*
// @run-at      document-end
// ==/UserScript==
 
/**
 * 
 * TargetURL: http://www.mein-wunschpreis.com/artikel.php?ASIN=
 * 
 **/
 
(function(){
 
    if( document.querySelectorAll('#asin').length > 0 ) {
 
        var _asin = document.querySelector('#asin').value;
        var _targetTD = document.querySelector('table.product td.priceBlockLabelPrice+td');
        
        var _button = document.createElement( 'a' );
            _button.href = 'http://www.mein-wunschpreis.com/artikel.php?ASIN=' + _asin;
        
        var _buttontext = document.createTextNode( 'Mein Wunschpreis' );
        
        _button.appendChild( _buttontext );
        
        _targetTD.appendChild( _button );
   
    } else {
      return;
      //console.info( 'no article page' );
    }
})();