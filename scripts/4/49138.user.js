/*
 * Title: Google Styler
 * Description: Customize Google Search Style
 * Author: Mr. Milk (aka Marcelo Leite)
 * Email: br dot com dot anysoft at mrmilk (reversed)
 * Updated: 2009 May 14th
 * 
 */

// ==UserScript==
// @name Google Styler (IE7PRO)
// @namespace http://www.anysoft.com.br
// @description New fonts, colors, separators and highlights for Google search results. It improves the page layout and fits more information on the screen.
// @injectframes 1
// @include http://www.google.*
// @include http://groups.google.*
// @include http://images.google.*
// @include http://news.google.*
// ==/UserScript==

(function(){ 
	
  var cssStyle  = ''

  cssStyle = 'body, td, div, input, .p, a {'
           + '  font-family: "Segoe UI", "trebuchet ms", arial, sans-serif, tahoma, verdana;'
           + '  text-decoration: none;'
           + '}'

           + '.ts td, .tc {'
           + '  padding: 0;'
           + '}'
  
           + '.ts, .tb {'
           + '  border-collapse: collapse;'
           + '}'
  
           + 'div, td {'
           + '  color: #000;'
           + '}'
  
           + '.f {'
           + '  color: #666;'
           + '}'
  
           + '.flc {'
           + '  color: #77c;'
           + '}'
  
           + 'a.l, a:link, .w, a.w:link, .w a:link, .q:visited,. q:link, .q:active, .q {'
           + '  color: #00c;'
           + '}'
  
           + 'a.l {'
           + '  font-weight: bold;'
           + '}'

           + 'a:visited, .fl:visited {'
           + '  color: #669966;'
           + '  text-decoration: none;'
           + '}'
  
           + 'a:active, a:hover {'
           + '  color: #669966;'
           + '  text-decoration: underline;'
           + '}'

           + '.gl a:link, .fl:active, .fl:link {'
           + '  color: #C49A00;'
           + '  text-decoration: none;'
           + '}'

           + '#ssb {'
           + '  background: #CCFFCC;'
           + '}'

           + '.t, .s {'
           + '  color: #000;'
           + '  max-width: 100%;'
           + '}'
  
           + '.bb {'
           + '  border-bottom: 1px solid #36c;'
           + '}'
  
           + '.bt {'
           + '  border-top: 1px solid #36c;'
           + '}'
  
  // ITEM HEADER TITLE
           + '.r {'
           + '  font-size: 1em 1;'
           + '}'

  // ITEM DESCRIPTION
           + 'font {'
           + '  font-size: 1em 1;'
           + '}'

  // ITEM DESCRIPTION CELL
           + '.j {'
           + '  width: 100%;'
  //          + '  width: 34em'
           + '}'

  // URL TEXT
           + '.a, .a:link, .gl, cite {'
           + '  color: #990000;'
           + '}'

           + '.i, .i:link {'
           + '  color: #a90a08;'
           + '}'

  // ITEM BLOCK
           + '.g {'
           + '  padding-top: 12px;'
           + '  border-top: 1px solid #D6E4FF;'
           + '}'

  // NEWS BLOCK
           + '.lh {'
           + '  border-top: 1px solid #D6E4FF;'
           + '}'

  // RESULTS SUMMARY TITLE (WEB)
           + '#sd {'
           + '  font-size: 113%;'
           + '  font-weight: bold;'
           + '}'

  // ADVANCED SEARCH + PREFERENCES
           + '#ap {'
           + '  font-size: 64%;'
           + '}'

           + '.h {'
           + '  color: #36c;'
           + '}'
  
           + '.z {'
           + '  display: none;'
           + '}'
  
           + 'div.n {'
           + '  margin-top: 1ex;'
           + '}'
  
           + '.n a {'
           + '  font-size: 10pt;'
           + '  color: #000;'
           + '}'
  
           + '.n .i {'
           + '  font-size: 10pt;'
           + '  font-weight: bold;'
           + '}'
  
           + '.b a {'
           + '  font-size: 12pt;'
  //          + '  font-size: 10pt'
           + '  color: #00c;'
           + '  font-weight: bold;'
           + '}'
  
           + '#np, #nn, .nr, #logo span, .ch {'
           + '  cursor: pointer;'
           + '  cursor: hand;'
           + '}'
  
           + '.ta {'
           + '  padding: 3px 3px 3px 5px;'
           + '}'

           + '#tpa2, #tpa3 {'
           + '  padding-top: 9px;'
           + '}'
  
           + '.sl, .r {'
           + '  font-weight: normal;'
           + '  margin: 0;'
           + '  display: inline;'
           + '}'
  
           + '.sl {'
           + '  font-size: 84%;'
           + '}'
  
           + '.e {'
           + '  margin: .75em 0;'
           + '}'
  
           + '.mblink:visited {'
           + '  color: #00c;'
           + '}'
  
           + '.sm {'
           + '  display: block;'
           + '  margin: 0;'
           + '  margin-left: 40px;'
           + '}'
  
           + '#navbar div, #logo span {'
           + '  background: url(/images/nav_logo3.png) no-repeat;'
           + '  overflow: hidden;'
           + '  height: 26px;'
           + '}'
  
           + '#navbar .nr {'
           + '  background-position: -60px 0;'
           + '  width: 16px;'
           + '}'
  
           + '#navbar #np {'
           + '  width: 44px;'
           + '}'
  
           + '#navbar #nf {'
           + '  background-position: -26px 0;'
           + '  width: 18px;'
           + '}'
  
           + '#navbar #nc {'
           + '  background-position: -44px 0;'
           + '  width: 16px;'
           + '}'
  
           + '#navbar #nn {'
           + '  background-position: -76px 0;'
           + '  width: 66px;'
           + '  margin-right: 34px;'
           + '}'
  
           + '#navbar #nl {'
           + '  background-position: -76px 0;'
           + '  width: 46px;'
           + '}'
  
           + '#logo {'
           + '  display: block;'
           + '  width: 150px;'
           + '  height: 52px;'
           + '  position: relative;'
           + '  overflow: hidden;'
  //          + '  margin: 15px 0 12px'
           + '  margin: 0px 0 12px;'
           + '}'

           + '#logo span {'
           + '  background-position: 0 -26px;'
           + '  position: absolute;'
           + '  top: 0;'
           + '  left: 0;'
           + '  width: 100%;'
           + '  height: 100%;'
           + '}'

           + 'em {'
           + '  background-color: yellow;'
           + '}';

	PRO_addStyle(cssStyle, document);
	
})()



