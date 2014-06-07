// ==UserScript==
// @name fuckValentine
// @version    0.0
// @description  Fuck off valentine
// @include *
// ==/UserScript==

$.fn.replaceText = function( search, replace, text_only ) {
  return this.each(function(){
    var node = this.firstChild,
      val,
      new_val,
      remove = [];
    if ( node ) {
      do {
        if ( node.nodeType == Node.TEXT_NODE ) {
          val = node.nodeValue;
          new_val = val.replace( search, replace );
          if ( new_val !== val ) {
            if ( !text_only && /</.test( new_val ) ) {
              $(node).before( new_val );
              remove.push( node );
            } else {
              node.nodeValue = new_val;
            }
          }
        }
      } while ( node = node.nextSibling );
    }
    remove.length && $(remove).remove();
  });
};

$("*").replaceText("valentine", "fuck off", false);
$("*").replaceText("Valentine", "Fuck off", false);
$("*").replaceText("VALENTINE", "FUCK OFF", false);
$("*").replaceText("情人节", "大羊驼", false);