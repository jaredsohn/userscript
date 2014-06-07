// ==UserScript==
// @name            GoogleTranslateBetterLayout
// @author          darkyndy
// @description     Google Translate Better Layout
// @include         http://translate.google.com*
// @include         http://www.translate.google.com*
// @version         0.1 BETA
// @namespace       darkyndy.com/GoogleTranslateBetterLayout
// ==/UserScript==

//START insert style
/**
 * Insert Style Function
 *
 * Insert in page CSS
 */
function insertStyle() {
  if (typeof GM_addStyle == "undefined") {
    GM_addStyle = function(text) {
      var head = document.getElementsByTagName("head")[0];
      if (!head) { return; }
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.textContent = text;
      head.appendChild(style);
    }
  };
  
  GM_addStyle("           \
    .almost_half_cell { \
      left:55em; \
      margin:15px 0 5px 5px; \
      position:absolute; \
      top:9em; \
    } \
    .almost_half_cell div { \
      width:45em; \
    }                  \
    .long_text { \
      line-height: 1.3em; \
    } \
    #autotrans {           \
      position:absolute;  \
      top:7em;        \
      left:55em;        \
    }                     \
    #source{        \
      height:100%;         \
    }"
  );
}
//END insert style

insertStyle();
