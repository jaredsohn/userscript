// ==UserScript==
// @name           grono.net alternate CSS
// @include        http://grono.net/*
// ==/UserScript==

function addGlobalStyle(css) {
  var head_elem=document.evaluate('//head',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
  if (!head_elem) { return; }
  var style_elem=document.createElement('style');
  style_elem.setAttribute('type','text/css');
  style_elem.textContent=css;
  head_elem.appendChild(style_elem);
}


addGlobalStyle('
+'ul#mainMenu {	border: 1px solid #F00;	border-top: 1px solid #CF0000;}'
+'ul#mainMenu, ul#mainMenu li.over a {	background: #F00 url(/s/style/skins/christmas/menu_bckg.png) 0 0 repeat-x;}'
+'.mp3playerContainer, button.mp3Player span {	background-color: #6695A8;}'
+'ul#mainMenu li.crn-tl, ul#mainMenu li.crn-tr {	background-image: url(/s/style/skins/christmas/menu_crn2.png);	z-index: 100;}'
+'ul#mainMenu li.crn-bl, ul#mainMenu li.crn-br {	background-image: url(/s/style/skins/christmas/menu_crn1.png);	z-index: 100;}'
+'#secondMenu .path-links a:hover, #secondMenu .path-links button:hover {	color: #6695A8;}'
+'ul#mainMenu li.preactive {	background-color: #BA0202;	z-index: 101;}'
+'a, abbr, address, caption, cite, code, dd, del, dfn, div, dl, dt, em, h1, h2, h3, h4, h5, h6, i, img, ins, kbd, label, legend, li, ol p, q, s, samp, '
+'small, span, strike, strong, sub, sup, u, ul, var {	border-color: #515357;}'
+'a, button, .colorList li {	color: #515357;}'
+'a:hover, button:hover {	color: #6695A8;}'
+'button.submit span.wrapper, a.submit span.wrapper, button.submit span.wrapper .crn, a.submit span.wrapper .crn,'
+'span.npaginator ul li.active span, span.npaginator ul li:hover a,ul.tabs li.active, ul.tabs li.active .crn, ul.tabs li:hover, ul.tabs li:hover'
+'.crn,div.paginatorRollGallery div.galleries ul a {	background-color: #6695A8;}'
+'button.cancel:hover span.wrapper, a.cancel:hover span.wrapper, .userIconFloat .status,body.mailbox ul.mailNavi li.compose a {	color: #6695A8;}'
+''
+'/* */'
+''
+'#logo a:hover {	background-position: 0 -30px;}'
+'#pageUp {	padding-top: 55px;	margin-top: 0px;	background: url(http://warsawspartans.com/images/s_03.jpg) center bottom no-repeat;}'
+'#pageIn {	background: black;}'
+'#pageIn div.pack {	padding-top: 5px;	padding-bottom: 20px;}'
+'#pageDown div.pack {	background: black;	padding-top: 250px;}'
+'#pageUp #mainMenu li.me a.new-content, #pageUp #mainMenu li.me a.new-content:hover {	color: #75bd43;}'
+'p.adsHide {	color: #000;}'
+'#pageAadsTop.advertismentTop {display:none;}'
);

