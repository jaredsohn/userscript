// ==UserScript==
// @name           Google Fix
// @namespace      NC
// @author         Nathan Caroyannis
// @include        *.google.*
// @include        *.google.*.*
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style; 
  document.getElementsByTagName('head')[0].appendChild(style);
};

//Home Page
// See http://userscripts.org/scripts/show/63436
(function () {
    var css =  '#fctr,#ghead,#pmocntr,#sbl,#tba,#tbe,.fade,.gbh { opacity: 1 !important; filter:alpha(opacity=100) !important; }';
    if (typeof GM_addStyle != 'undefined') {
      GM_addStyle(css);
	  } else if (typeof PRO_addStyle != 'undefined') {
      PRO_addStyle(css);
	  } else {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
})();

AddStyle(".ds {border:0 !important}")

// Search
AddStyle("#leftnav, #resultStats, #foot div {display:none}");
AddStyle("#center_col {margin:0 !important}");
AddStyle("#foot #navcnt, #foot #fll {display:block}")
AddStyle(".tsf-p table {border-bottom:0 !important}")
AddStyle(".gl a, .osl a, #subform_ctrl div a, .eft a {text-decoration:underline}")
AddStyle("#nav td {padding:0 1px}")
AddStyle(".lst-td {border-bottom:1px solid #CCCCCC}")
AddStyle(".lst {padding:2px 10px 2px 6px}")