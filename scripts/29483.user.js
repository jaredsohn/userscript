// ==UserScript==
// @name           Post image without ID calling
// @namespace      www.akatiron.com
// @include        http://h.hatena.ne.jp/*
// ==/UserScript==

unsafeWindow.Hatena.Haiku.EntryForm.postDrawing = function (uri) {
  if (!uri) return;
  var form = unsafeWindow.Hatena.Haiku.EntryForm.currentForm;
  if (!form) return;

  var dst = new Array();
  var src = uri.split( ':' );
  dst.push( 'http://f.hatena.ne.jp/images/fotolife' );
  dst.push( src[ 2 ].charAt( 0 ).toLowerCase() );
  dst.push( src[ 2 ] );
  dst.push( src[ 3 ].substring( 0, 8 ) );
  dst.push( src[ 3 ].substring( 0, 14 ) + '.png' ); 

  form.textarea.value = dst.join( '/' );
  form.submit.disabled = false;
  //form.showTextForm();
  form.form.submit();
};

