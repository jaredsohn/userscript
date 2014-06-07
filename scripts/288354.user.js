// ==UserScript==
// // @name        Dapper Servant
// // @namespace   https://github.com/modille
// // @include     http://*:5050/*/configure
// // @version     1
// // @grant       none
// // ==/UserScript==

// Save/Apply sticky footer
addGlobalStyle( '.bottom-sticker-inner { background: #F0F0F0 !important; }');

// Buttons
addGlobalStyle( 'button { background-clip: padding-box !important; background-color: #DDDDDD !important; background-image: linear-gradient(to bottom, #FFFFFE, #BCBCBC) !important; color: #000000 !important; font: bold 10px !important; padding: 2px 15px !important; white-space: nowrap !important; }');

// Section header
addGlobalStyle( '.section-header { font-size: 18px !important; padding-top: 20px !important; }');

// Feature
addGlobalStyle( '.attach-previous { font-size: 14px !important; }');
addGlobalStyle( '.radio-block-start label { font-size: 14px !important; }');
addGlobalStyle( '.repeated-chunk { border: 1px solid #bbb !important; }');

// Setting
addGlobalStyle( '.setting-name { font-size: 10px !important; padding-left: 20px !important; }');
addGlobalStyle( '.optional-block-start { font-size: 10px !important; padding-left: 20px !important; }');
addGlobalStyle( '.setting-help { padding-left: 5px !important; }');

function addGlobalStyle( css ) {
  var head, style;
  head = document.getElementsByTagName( 'head' )[0];
  if ( !head ) { return; }
  style = document.createElement( 'style' );
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild( style );
}
