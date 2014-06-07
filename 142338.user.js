// ==UserScript==
// @name        CMUMoodleCSS
// @namespace   http://pe120.mth.cmich.edu/gm_scripts
// @description Sets customized CSS for Moodle/Webwork pages at CMU
// @include     https://mth-webwork.cst.cmich.edu/*
// @grant       GM_addStyle
// @version     1
// @license     GPLv3 (http://www.gnu.org/licenses/gpl.html)
// ==/UserScript==

// see https://userscripts.org/guides/46
if(typeof GM_addStyle == 'undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {
	    return}
        style.type = 'text/css';
        style.textContent = css;
        head.appendChild(style);
    };


// An object holding styling objects
// CSS() assembles the css into a single string
// GM_addStyle takes that css and adds a stylesheet
// to the page
// 
// The css *could* be held in an array, not an object
var CMUMoodleCSS={
    data: {
	formeditor: {
	    elements:	'form#editor > p > textarea',
	    styling:	'width: 75%; height: 60%;'
	},
	anchors: {
	    elements:	'a, a:link',
	    styling:	'color: #660033 !important;'
	},
	infoboxesetc: {
	    elements:	'#breadcrumbs, #masthead, .info-box h1, .info-box h2, .info-box h3, .info-box h4, .info-box h5',
	    styling:	'background-color: #660033 !important;'
	},
	page: {
	    elements:	'#page',
	    styling:	'width: 100%;'
	},
	pagecontent: {
	    elements:	'#page-content',
	    styling:	'width: 100%; min-width: 70%;'
	},
	infobox: {
	    elements:	'.info-box',
	    styling:	'border-color: #660033;'
	},
	select: {
	    elements:	'select, .select, .nav_button, input, button',
	    styling:	'font-size: 7pt; border: 0px solid #660033; background: #FFEB9C; color: #660033;'
	},
	selecthover: {
	    elements:	'select:hover, .select:hover, .nav_button:hover, input:hover, button:hover',
	    styling:	'color: #FFEB9C; background: #660033;'
	},
	body: {
	    elements:	'body',
	    styling:	'font-size: 7pt;'
	}
    },
    CSS: function () {
	var s='';
	for (var x in CMUMoodleCSS.data) {
	    var y=CMUMoodleCSS.data[x];
	    s += (y.hasOwnProperty("elements")) ? y.elements+' {'+y.styling+'} ' : '';
	}
	return s;
    }
};

GM_addStyle(CMUMoodleCSS.CSS());

// Set the inner header correctly
if(location.href=="https://mth-webwork.cst.cmich.edu/moodle/") {
    document.getElementsByClassName('category_link')[0].innerHTML="MTH Courses";
}

// end of CMUMoodleCSS.user.js
