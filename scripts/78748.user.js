// ==UserScript==
// @name        	Google Defacer
// @description     Want to have another google face ?
// @include    		http://www.google.*/
// @include    		http://www.google.*/webhp*
// @include    		http://www.google.*/#*
// @require        	http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

(function () {
	var display_none = '#mbEnd,#taw,#tads,#leftnavc,#rhscol, #topstuff, #bfl, #fll, #subform_ctrl, #sfcnt, #sidebar_ads, #botstuff, .tsw div a, .fc, #gbe, #guser a.gb4, #fpdi{display:none;}';
	var gbar = '#gbar,#guser{position:fixed; z-index:9999; padding:10px; line-height:24px; border:1px solid #D3E1F9; background:#f9f9f9; clear:both; float:none; margin:4px;} #gbar{top:0; left:0; height:200px;} #guser{top:0; right:0; height:30px;} #gbar a.gb1{display:block; width:50px;} #guser a.gb4{display:inline;}';
	var opacity = '#fctr,#ghead,#pmocntr,#sbl,#tba,#tbe,.fade,.gbh { opacity: 1 !important; filter:alpha(opacity=100) !important; }';
	var olli = 'ol li{list-style:decimal inside; padding:0 20px 0 10px; margin:0 0 20px 4px;  max-width:none; min-width:none; border:1px solid #D3E1F9; font-weight:bold; background:#fafafa;} ol li div.s{font-weight:normal; margin:10px 20px 0 20px;} ol li div.s span.f{line-height:30px;} #cnt{width:100%; padding:0;}';
	var ancre = 'a:link,.w,.q:active,.q:visited,.tbotu{color:#0072ba; !important;} a:hover,.q:hover{color:#ba3333;} .a, cite, cite a:link, cite a:visited, .cite, .cite:link, #mbEnd cite b, #tads cite b{color:#457900;}';
	var foot = '#foot{position:absolute; top:20px; left:0; margin-left:-30%; padding:0 0 0 20px;  border:none; width:50%; left:50%;}';
	var misc = '#cnt{max-width:1200px; min-width:780px; margin:160px 0 0 30px; } #center_col{border:none;} .tsf-p{max-width:none;} .gbh,.gbd{border:none;}';
    var css =  display_none + gbar + opacity + olli + ancre + foot + misc;
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

/*** LIVE CUSTO for bakground images and text-shadows **/
$(document).ready(function(){
	$("#logo").css("background","url(http://www.google.com/intl/en_ALL/images/srpr/logo1w.png) no-repeat");
	$("#logo").css("padding","0");
	$("#sbl a").css("color","#0072ba");
	$("#sbl a").css("text-shadow","none");
	$("#cpf,#fctr,#prm").css("display","none");
});