// ==UserScript==
// @name           Metafilter spoiler assistant
// @namespace      http://www.arthurwyatt.co.uk
// @description    Lets you hide spoilers in MeFi comments, lets you show spoilers hidden using ABBR. 
// @include        http://*.metafilter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

  $("#tbtd").append("<a href='#' style='font-size: 10px; margin-right: 12px; line-height: 20px;'>Spoilers!</a>").click(function (e) {
	e.preventDefault();
	plaintext = prompt("Shh! Spoilers!", "").replace(/(<([^>]+)>)/ig,""); 
	rot13text = rot13(plaintext).split('"').join('&quot;');
	plaintext = plaintext.split('"').join('&quot;');
	$("#comment").insertAtCaret(" SPOILER: <abbr title=\"" + plaintext + "\">" + rot13text + "</abbr>");
  });
  
  $("ABBR").click( function (e) {
	e.preventDefault();
	var text = $(this).text();
	$(this).text($(this).attr("title"));
	$(this).attr("title", text);
  });

 function rot( t, u, v ) {
  return String.fromCharCode( ( ( t - u + v ) % ( v * 2 ) ) + u );
 }

 function rot13( s ) {
  var b = [], c, i = s.length,
   a = 'a'.charCodeAt(), z = a + 26,
   A = 'A'.charCodeAt(), Z = A + 26;
  while(i--) {
   c = s.charCodeAt( i );
   if( c>=a && c<z ) { b[i] = rot( c, a, 13 ); }
   else if( c>=A && c<Z ) { b[i] = rot( c, A, 13 ); }
   else { b[i] = s.charAt( i ); }
  }
  return b.join( '' );
 }

  $.fn.extend({
  insertAtCaret: function(myValue){
  var obj;
  if( typeof this[0].name !='undefined' ) obj = this[0];
  else obj = this;

  if ($.browser.msie) {
    obj.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
    obj.focus();
    }
  else if ($.browser.mozilla || $.browser.webkit) {
    var startPos = obj.selectionStart;
    var endPos = obj.selectionEnd;
    var scrollTop = obj.scrollTop;
    obj.value = obj.value.substring(0, startPos)+myValue+obj.value.substring(endPos,obj.value.length);
    obj.focus();
    obj.selectionStart = startPos + myValue.length;
    obj.selectionEnd = startPos + myValue.length;
    obj.scrollTop = scrollTop;
  } else {
    obj.value += myValue;
    obj.focus();
   }
 }
})



