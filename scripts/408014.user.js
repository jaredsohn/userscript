// ==UserScript==
// @name        LibraryThing reply preview (HTML)
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description Shows the message that's being replied to in a hover tooltip, including mark-up
// @include     http*://*librarything.tld/topic*
// @include     http*://*librarything.com/topic*
// @include     http*://*librarything.tld/talktopic*
// @include     http*://*librarything.com/talktopic*
// @version     1
// @grant       none
// ==/UserScript==

jQuery("head").append('<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>')  

jQuery("head").append('<style type="text/css"> \
  .ui-tooltip { padding: 8px 8px 0; background-color: #fff; position: absolute; z-index: 9999; box-shadow: 0 0 5px #888; min-width: 300px; max-width: 600px; max-width: calc(100% - 500px); }\
  .ui-tooltip h3 { font-size: 10px; line-height: normal; } \
  .ui-tooltip h3 .b { color: #000 !important; } \
  .ui-tooltip .mT { font-size: 10px !important; } \
  .ui-tooltip br { line-height: 8px; } \
  .ui-arrow { width: 70px; height: 12px; top: 100%; left: 0; overflow: hidden; position: absolute; }\
  .ui-arrow.top { top: auto; bottom: 100%; }\
  .ui-arrow:after { content: ""; background-color: #fff; position: absolute; top: -20px; width: 25px; height: 25px; margin-left: 20px; box-shadow: 0 0 5px #888; -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); tranform: rotate(45deg); } \
  .ui-arrow.top:after { bottom: -20px; top: auto; } \
  </style>');

function waitForJQueryUI() {  
  if (window.jQuery.ui) {
    jQuery("#msgs").tooltip({
      items: ".mT a[href^='#']:not(.ed)",
      content: function() {
        var ref = jQuery(this).attr("href").substring(1);
        var ref = jQuery(".fp:has(a[name='" + ref + "'])");
        if (ref.length) {
          return ref.clone().find(".ed, .tj").remove().end().html();
        }
      },
      position: {
        my: "left-20 bottom-15",
        at: "left top",
        using: function(position, feedback) {
          jQuery( this ).css( position );
          jQuery("<div>")
            .addClass( "ui-arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });
  } else {
    setTimeout(waitForJQueryUI, 100);
  }
}

// There's an error if we don't wait for jQuery UI to get loaded before the .tooltip() call
waitForJQueryUI();
