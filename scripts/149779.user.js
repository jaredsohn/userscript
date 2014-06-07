// ==UserScript==
// @name           GameFAQs User Page in Search Bar
// @namespace      OTACON120
// @author         OTACON120
// @version        1.1.1
// @description    Adds "User Page" option to GameFAQs search bar
// @updateURL      http://userscripts.org/scripts/source/149779.meta.js
// @downloadURL    http://userscripts.org/scripts/source/149779.user.js
// @website        http://otacon120.com/scripts/user-page-in-search-bar/
// @include        http://www.gamefaqs.com/*
// @match          http://www.gamefaqs.com/*
// @exclude        http://www.gamefaqs.com/users
// @exclude        http://www.gamefaqs.com/users/
// @grant          GM_addStyle
// ==/UserScript==

/**
 * Get specified CSS property value
 * @param  {node}   el        HTML Element from which to grab CSS
 * @param  {string} styleProp CSS property to grab
 * @return {string}           Value of CSS property
 */
function getStyle(el, styleProp) {
	return document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
}

/**
 * Toggle search form between game search and user search
 */
function changeSearch() {
	var sfAction, sfMethod, sfPlaceholder;

	switch ( this.value ) {
		case 'find':
			sfAction      = '/users/';
			sfMethod      = 'post';
			sfPlaceholder = 'Search Users';
			break;

		case 'game':
			sfAction      = '/search/index.html';
			sfMethod      = 'get';
			sfPlaceholder = 'Search GameFAQs';
			break;
	}

		searchForm.action       = sfAction;
		searchForm.method       = sfMethod;
		searchField.name        = this.value;
		searchField.placeholder = sfPlaceholder;
}

function sdOnFocus() {
	searchDrawer.className += ' active';
}

function sdOnBlur() {
	searchDrawer.className = searchDrawer.className.replace( ' active', '' );
}

var i, searchDrawerDD, searchDrawerRD, leftPos, rightPos, bottomPos, sdHeight, sdBorderColor,
	v12Style        = document.head.querySelector( 'link[href^="/css_wide/v12"]' ), // Check if using v12 style
	isMinimal       = document.head.querySelector( 'link[href^="/css_wide/cus_minimal"]' ), // Check if using Minimalist style
	is800           = document.head.querySelector( 'link[href^="/css_wide/v12_new_800px"]' ), // Check if using v12 800px style
	isRcSb          = document.head.querySelector( 'link[href^="/css_wide/retroclassic_v13_sb"]' ), // Check if using RetroClassic 13 w/ Sidebar
	mastheadStrip   = document.getElementsByClassName('masthead_strip')[0],
	searchForm      = document.getElementsByClassName( 'masthead_search' )[0].getElementsByClassName( 'search' )[0],
	searchField     = document.getElementById( 'searchtextbox' ),
	searchSubmit    = searchForm.getElementsByClassName( 'icon icon-search' )[0],
	getKey          = new XMLHttpRequest(),
	searchDrawer    = document.createElement( 'div' ),
	formKey         = document.createElement( 'div' ),
	inputKey        = document.createElement( 'input' );

if ( isMinimal )
	throw "stop execution";

searchDrawer.id = 'o120-user-page-drawer';

if ( isRcSb ) {
	searchDrawer.className = 'in-sidebar';
}

if ( v12Style || isRcSb ) {
	searchDrawer.innerHTML = '<select id="o120-search-select" size="1" class="o120-search-select"><option value="game">Search GameFAQs</option><option value="find">Search Users</option></select>';

	searchDrawerDD          = searchDrawer.getElementsByClassName( 'o120-search-select' )[0];
	searchDrawerDD.onchange = changeSearch;
	searchDrawerDD.onfocus  = sdOnFocus;
	searchDrawerDD.onblur   = sdOnBlur;
} else {
	searchDrawer.innerHTML = '<div id="o120-games-rd-contain" class="o120-rd-contain"><input type="radio" id="o120-games-rd" class="o120-uprd" name="o120-uprd" value="game" checked="checked" /> <label for="o120-games-rd"> Search GameFAQs</label></div><div id="o120-user-page-rd-contain" class="o120-rd-contain"><input type="radio" id="o120-user-page-rd" class="o120-uprd" name="o120-uprd" value="find" /> <label for="o120-user-page-rd">Search Users</label></div>';

	searchDrawerRD         = searchDrawer.getElementsByClassName( 'o120-uprd' );

	for ( i = 0; i < searchDrawerRD.length; i++ ) {
		searchDrawerRD[ i ].onclick = changeSearch;
		searchDrawerRD[ i ].onfocus = sdOnFocus;
		searchDrawerRD[ i ].onblur  = sdOnBlur;
	}
}

// Grab hidden key from regular user page search on Users page
getKey.open( 'POST', '/users/', false );
getKey.setRequestHeader( 'Connection', 'close' );
getKey.send();
formKey.id				= 'o120-formKey';
formKey.innerHTML		= getKey.responseText;
formKey.style.display	= 'none';
document.body.appendChild( formKey );
formKey					= formKey.getElementsByClassName( 'span4' )[0].firstChild.getElementsByTagName( 'form' )[0].firstChild.value;
document.body.removeChild(document.getElementById( 'o120-formKey' ));
inputKey.type			= 'hidden';
inputKey.value			= formKey;
inputKey.name			= 'key';
searchForm.getElementsByTagName( 'fieldset' )[0].appendChild( inputKey );

searchForm.getElementsByTagName( 'fieldset' )[0].insertBefore( searchDrawer, inputKey );

sdHeight = getStyle( searchDrawer, 'height' );

topPos = '100%';

if ( v12Style ) {
	leftPos   = ( is800 ? 0 : 45 ) + 'px';
	rightPos  = 0;
	topPos    = 'calc(' + topPos + ' + 6px)';
	sdBorder  = getStyle( mastheadStrip, 'border-bottom' );
} else if ( isRcSb ) {
	leftPos   = '160px';
	topPos    = 0;
	sdBorder  = getStyle( mastheadStrip, 'background-color' );
} else {
	leftPos   = rightPos = '25px';
	sdBorder  = getStyle( document.getElementsByClassName( 'masthead_strip' )[0], 'background-color' );
}


GM_addStyle('\
.masthead {\
	position: relative;\
	z-index: 1;\
}\
\
.masthead_strip,\
.masthead_main {\
	position: relative;\
	z-index: initial;\
}\
#o120-user-page-drawer {\
	background: ' + getStyle( ( isRcSb ? mastheadStrip : document.getElementsByClassName( 'masthead_strip' )[0] ), 'background-color' ) + ';\
	position: absolute;\
	left: ' + leftPos + ';\
	right: ' + rightPos + ';\
	top: ' + topPos + ';\
	border: none;\
	border-radius: 0 0 15px 15px;\
	padding: 0;\
	max-height: 0;\
	text-align: center;\
	overflow: hidden;\
	z-index: -1;\
	-webkit-transition: max-height 0.4s ease-out,\
						padding 0s ease-out 0.4s;\
	-moz-transition:    max-height 0.4s ease-out,\
						padding 0s ease-out 0.4s;\
	-o-transition:      max-height 0.4s ease-out,\
						padding 0s ease-out 0.4s;\
	transition:         max-height 0.4s ease-out,\
						padding 0s ease-out 0.4s;\
}\
\
.has_skin #o120-user-page-drawer {\
	width: 120%;\
	left: -10%;\
	right: 0;\
}\
\
#o120-user-page-drawer.in-sidebar {\
	left: 0;\
	top: ' + topPos + ';\
	border-radius: 0 15px 15px 0;\
	padding: 3px 14px;\
	max-height: 51px;\
	-webkit-transition: left 0.4s ease-out;\
	-moz-transition:    left 0.4s ease-out;\
	-o-transition:      left 0.4s ease-out;\
	transition:         left 0.4s ease-out;\
}\
\
#searchtextbox:focus + #o120-user-page-drawer,\
#o120-user-page-drawer:hover,\
#o120-user-page-drawer.active {\
	border: 1px solid ' + sdBorder + ';\
	border-top: 0;\
	padding: 3px 0;\
	max-height: 51px;\
	-webkit-transition: max-height 0.4s ease-out;\
	-moz-transition:    max-height 0.4s ease-out;\
	-o-transition:      max-height 0.4s ease-out;\
	transition:         max-height 0.4s ease-out;\
}\
\
	.o120-rd-contain {\
		display: inline-block;\
		font-size: 1.1em;\
	}\
\
	#o120-games-rd-contain {\
		margin: 0 8px 0 0;\
	}\
\
	#o120-user-page-rd-contain {\
		margin: 0 0 0 8px;\
	}\
\
#searchtextbox:focus + #o120-user-page-drawer.in-sidebar,\
#o120-user-page-drawer.in-sidebar:hover,\
#o120-user-page-drawer.in-sidebar.active {\
	left: ' + leftPos + ';\
	right: auto;\
	top: ' + topPos + ';\
	padding: 1px 14px 3px;\
	-webkit-transition: left 0.4s ease-out;\
	-moz-transition:    left 0.4s ease-out;\
	-o-transition:      left 0.4s ease-out;\
	transition:         left 0.4s ease-out;\
}\
\
#leader_top-wrap,\
#leader_plus_top-wrap {\
	position: relative;\
	z-index: 0;\
}\
' + ( v12Style ? '\
 .masthead_systems {\
 	z-index: 0;\
 }\
 \
 .masthead_search {\
 	z-index: initial;\
 }\
  ' : '') );