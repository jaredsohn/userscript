/*
 * Title: Google Styler CSS3
 * Description: Customize Google Search Style
 * Author: Mr. Milk (aka Marcelo Leite)
 * Email: br dot com dot anysoft at mrmilk (reversed)
 * Updated: 2010 May 21th
 * 
 */

// ==UserScript==
// @name Google Styler (CSS3)
// @namespace http://www.anysoft.com.br
// @description New fonts, shadows, gradients, colors and highlights for Google search results. It improves the page layout and fits more information on the screen. Firefox 3.6 or Safari 4.05 required.
// @injectframes 1
// @include http://www.google.*
// @include http://groups.google.*
// @include http://images.google.*
// @include http://news.google.*
// ==/UserScript==

(function(){ 
	
  var cssStyle  = ''

  cssStyle = 'body, td, div, input, .p, a {'
           + '  font-family: "Lucida Grande", "Segoe UI", "trebuchet ms", arial, sans-serif, tahoma, verdana !important;'
           + '  text-decoration: none !important;'
           + '}'

           + '.ts td, .tc {'
           + '  padding: 0 !important;'
           + '}'
  
           + '.ts, .tb {'
           + '  border-collapse: collapse !important;'
           + '}'
  
           + 'div, td {'
           + '  color: #000 !important;'
           + '}'
  
           + '.f {'
           + '  color: #666 !important;'
           + '}'
  
           + '.flc {'
           + '  color: #77c !important;'
           + '}'
  
           + 'a.l, a:link, .w, a.w:link, .w a:link, .q:visited,. q:link, .q:active, .q {'
           + '  color: #00c !important;'
           + '}'
  
           + 'a.l {'
           + '  font-weight: bold !important;'
           + '  text-shadow: rgba(255, 255, 255, 1) 1px 1px 1px !important;'
         + '}'

           + 'a:visited, .fl:visited {'
           + '  color: #669966 !important;'
//           + '  color: rgb(70,96,61) !important;'
           + '  text-shadow: rgba(255, 255, 255, 1) 1px 1px 1px !important;'
           + '  text-decoration: none !important;'
           + '}'
  
           + 'a:active, a:hover {'
           + '  color: rgb(47,64,41) !important;'
           + '  color: green !important;'
           + '  text-decoration: none !important;'
           + '  text-shadow: rgba(0, 0, 0, .1) 2px 2px 1px !important;'
           + '}'

           + '.gl a:link, .fl:active, .fl:link {'
           + '  color: #C49A00 !important;'
           + '  text-decoration: none !important;'
           + '  text-shadow: rgba(255, 255, 255, 1) 1px 1px 1px !important;'
           + '}'

           + '.gl a:hover, .fl:hover {'
           + '  color: rgb(47,64,41) !important;'
           + '  color: green !important;'
           + '  text-shadow: rgba(0, 0, 0, .1) 2px 2px 1px !important;'
           + '}'

           + '#ssb {'
           + '  background: #CCFFCC !important;'
           + '}'

           + '.t, .s {'
           + '  color: #000 !important;'
           + '  max-width: 100% !important;'
           + '  -webkit-column-break-inside: avoid !important;'
           + '  -moz-column-break-inside: avoid !important;'
         + '}'
  
           + '.ts, .tsw {'
           + '  width: 100% !important;'
           + '}'

           + 'table.ts td {'
           + '  padding-right: 10px !important;'
           + '}'
    
           + '.bb {'
           + '  border-bottom: 1px solid #36c !important;'
           + '}'
  
           + '.bt {'
           + '  border-top: 1px solid #36c !important;'
           + '}'
  
  // ITEM HEADER TITLE
           + '.r {'
           + '  font-size: 1em 1 !important;'
           + '}'

  // ITEM DESCRIPTION
           + 'font {'
           + '  font-size: 1em 1 !important;'
           + '}'

           + 'div#rhs {'
           + '  visibility: hidden !important;'
  //          + '  width: 34em'
           + '}'

  // ITEM DESCRIPTION CELL
           + '.j, div#center_col {'
           + '  position: relative !important;'
           + '  border-left: 0 !important;'
           + '  margin-left: 17% !important;'
           + '  width: 82% !important;'
           + '  -webkit-column-count: 1 !important;'
           + '  -webkit-column-gap: 0 !important;'
           + '  -moz-column-count: 1 !important;'
           + '  -moz-column-gap: 0 !important;'
           + '}'

           + 'div.tsf-p, div#subform_ctrl {'
           + '  margin-left: 18% !important;'
           + '  text-align: center !important;'           
           + '  max-width: 82% !important;'
           + '  width: 82% !important;'
           + '}'

           + 'div#foot {'
           + '  position: relative !important;'
           + '  margin-left: 18% !important;'
           + '  width: 81% !important;'
           + '}'

           + 'div.lsd {'
           + '  display: none !important;'
           + '}'

           + 'div#res, div#cnt {'
           + '  max-width: 99% !important;'
           + '  width: 99% !important;'
           + '}'

           + '#leftnav {'
           + '  position: absolute !important;'
           + '  top: 0px !important;'
           + '  width: 16% !important;'
           + '  margin-top: 0px !important;'
           + '  padding: 5px !important;'
           + '  background-color: rgb(255,255,255) !important;'
           + '  -webkit-border-radius: 10px !important;'
           + '  -webkit-box-shadow: 5px 5px 5px rgba(127,127,127,0.6) !important;'           
           + '  -moz-border-radius: 10px !important;'
           + '  -moz-box-shadow: 5px 5px 5px rgba(127,127,127,0.6) !important;'           
           + '}'

  // URL TEXT
           + '.a, .a:link, .gl, cite {'
           + '  color: #990000 !important;'
           + '}'

           + '.i, .i:link {'
           + '  color: #a90a08 !important;'
           + '}'

  // ITEM BLOCK
           + 'table#imgtb {'
           + '  border-collapse:separate !important;'
           + '  border-spacing:10px !important;'
           + '}'

           + 'table#imgtb td {'
           + '  text-align:center !important;'
           + '  vertical-align:middle !important;'
           + '  padding: 10px !important;'
           + '  -webkit-border-radius: 10px !important;'
           + '  -moz-border-radius: 10px !important;'
           + '}'

           + 'table#imgtb tr:nth-child(3n-1) td, table#imgtb tr:nth-child(1n) td {'
           + '  background-color: rgb(247,247,247) !important;'
           + '  background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(247, 247, 247, 0.5)), to(rgba(225, 225, 225, 0.7))) !important;'
           + '}'

           + 'table#imgtb tr:nth-child(4n-1) td, table#imgtb tr:nth-child(4n) td {'
           + '  background-color: white !important;'
           + '  background-color: rgb(235,239,249) !important;'           
           + '  background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(235, 239, 249, 0.5)), to(rgba(213, 217, 223, 0.7))) !important;'
           + '  background-image: -moz-linear-gradient(center top, rgba(235, 239, 249, 0.5), rgba(213, 217, 223, 0.7)) !important;'
           + '}'

           + '.g {'
           + '  padding: 10px !important;'
           + '  background-color: rgb(247,247,247) !important;'
           + '  -webkit-border-radius: 10px !important;'
           + '  -webkit-column-break-after: always !important;'
           + '  -moz-border-radius: 10px !important;'
           + '  -moz-column-break-after: always !important;'
           + '  background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(247, 247, 247, 0.5)), to(rgba(225, 225, 225, 0.7))) !important;'
           + '  background-image: -moz-linear-gradient(center top, rgba(247, 247, 247, 0.5), rgba(225, 225, 225, 0.7)) !important;'
           + '}'

           + '#tbbc {'
           + '  padding: 10px !important;'
           + '  -webkit-border-radius: 10px !important;'
           + '  -webkit-column-break-after: always !important;'
           + '  -moz-border-radius: 10px !important;'
           + '  -moz-column-break-after: always !important;'
           + '  background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(235, 239, 249, 0.5)), to(rgba(213, 217, 223, 0.7))) !important;'
           + '  background-image: -moz-linear-gradient(center top, rgba(235, 239, 249, 0.5), rgba(213, 217, 223, 0.7)) !important;'
           + '}'

           + '.g:hover, table#imgtb td:hover {'
           + '  background-color: rgb(235,239,249) !important;'
           + '  -webkit-box-shadow: 5px 5px 5px rgba(127,127,127,0.6) !important;'           
           + '  -moz-box-shadow: 5px 5px 5px rgba(127,127,127,0.6) !important;'           
           + '  background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(235, 239, 249, 0.5)), to(rgba(213, 217, 223, 0.7))) !important;'
           + '  background-image: -moz-linear-gradient(center top, rgba(235, 239, 249, 0.5), rgba(213, 217, 223, 0.7)) !important;'
           + '}'

           + 'div#tbbc {'
           + '  margin: 6px !important;'
           + '  -webkit-box-shadow: 5px 5px 5px rgba(127,127,127,0.6) !important;'           
           + '  -moz-box-shadow: 5px 5px 5px rgba(127,127,127,0.6) !important;'           
           + '}'

  // NEWS BLOCK
           + '.lh {'
           + '  border-top: 1px solid #D6E4FF !important;'
           + '}'

  // RESULTS SUMMARY TITLE (WEB)
           + '#sd {'
           + '  font-size: 113% !important;'
           + '  font-weight: bold !important;'
           + '}'

  // ADVANCED SEARCH + PREFERENCES
           + '#ap {'
           + '  font-size: 64% !important;'
           + '}'

           + '.h {'
           + '  color: #36c !important;'
           + '}'
  
           + '.z {'
           + '  display: none !important;'
           + '}'
  
           + 'div.n {'
           + '  margin-top: 1ex !important;'
           + '}'
  
           + '.n a {'
           + '  font-size: 10pt !important;'
           + '  color: #000 !important;'
           + '}'
  
           + '.n .i {'
           + '  font-size: 10pt !important;'
           + '  font-weight: bold !important;'
           + '}'
  
           + '.b a {'
           + '  font-size: 12pt !important;'
  //          + '  font-size: 10pt'
           + '  color: #00c !important;'
           + '  font-weight: bold !important;'
           + '}'
  
           + '#np, #nn, .nr, #logo span, .ch {'
           + '  cursor: pointer !important;'
           + '  cursor: hand !important;'
           + '}'
  
           + '.ta {'
           + '  padding: 3px 3px 3px 5px !important;'
           + '}'

           + '#tpa2, #tpa3 {'
           + '  padding-top: 9px !important;'
           + '}'
  
           + '.sl, .r {'
           + '  font-weight: normal !important;'
           + '  margin: 0 !important;'
           + '  display: inline !important;'
           + '}'
  
           + '.sl {'
           + '  font-size: 84% !important;'
           + '}'
  
           + '.e {'
           + '  margin: .75em 0 !important;'
           + '}'
  
           + '.mblink:visited {'
           + '  color: #00c !important;'
           + '}'
  
           + '.sm {'
           + '  display: block !important;'
           + '  margin: 0 !important;'
           + '  margin-left: 40px !important;'
           + '}'
  
           + '#navbar div, #logo span {'
           + '  background: url(/images/nav_logo3.png) no-repeat !important;'
           + '  overflow: hidden !important;'
           + '  height: 26px !important;'
           + '}'
  
           + '#navbar .nr {'
           + '  background-position: -60px 0 !important;'
           + '  width: 16px !important;'
           + '}'
  
           + '#navbar #np {'
           + '  width: 44px !important;'
           + '}'
  
           + '#navbar #nf {'
           + '  background-position: -26px 0 !important;'
           + '  width: 18px !important;'
           + '}'
  
           + '#navbar #nc {'
           + '  background-position: -44px 0 !important;'
           + '  width: 16px !important;'
           + '}'
  
           + '#navbar #nn {'
           + '  background-position: -76px 0 !important;'
           + '  width: 66px !important;'
           + '  margin-right: 34px !important;'
           + '}'
  
           + '#navbar #nl {'
           + '  background-position: -76px 0 !important;'
           + '  width: 46px !important;'
           + '}'
  
           + '#disabled logo {'
           + '  display: block !important;'
           + '  width: 150px !important;'
           + '  height: 52px !important;'
           + '  position: relative !important;'
           + '  overflow: hidden !important;'
  //          + '  margin: 15px 0 12px'
           + '  margin: 0px 0 12px !important;'
           + '}'

           + '#logo span {'
           + '  background-position: 0 -26px !important;'
           + '  position: absolute !important;'
           + '  top: 0 !important;'
           + '  left: 0 !important;'
           + '  width: 100% !important;'
           + '  height: 100% !important;'
           + '}'

           + '.g:hover em, table#imgtb td:hover em {'
           + '  background-color: yellow !important;'
           + '  background-image: -webkit-gradient(linear, center top, center bottom, from(yellow), to(rgba(237,206,0,0.75))) !important;'
           + '  background-image: -moz-linear-gradient(center top, yellow, rgba(237, 206, 0, 0.75)) !important;'
           + '}'

           + 'em {'
           + '  background-color: white !important;'
           + '  background-image: -webkit-gradient(linear, center top, center bottom, from(rgb(255,255,255)), to(rgba(127,127,127,0.3))) !important;'
           + '  background-image: -moz-linear-gradient(center top, white, rgba(127, 127, 127, 0.3)) !important;'
           + '}';

    GM_addStyle(cssStyle); 
    
  //GM_addStyle(cssStyle);
  /*
  var head = document.getElementsByTagName("HEAD")[0];
  var css  = window.document.createElement('link');
  css.rel  = 'stylesheet';
  css.type = 'text/css';
  css.href = 'data:text/css !important;charset=utf-8,'+escape(cssStyle);
  head.appendChild(css);
  */

	//PRO_addStyle(cssStyle, document);
	
})()
