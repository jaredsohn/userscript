// simple del.icio.us prettifier 1.0
// version 1.0
// Gina Trapani & Johnathan Lyon
// 2005-11-29 & 2007
// Released to the public domain.
//
// ==UserScript==
// @name          simple del.icio.us prettifier 1.0
// @description   Changes styles on del.icio.us.
// @include       http://del.icio.us/*
// @include		  https://secure.del.icio.us/*
// ==/UserScript==
//
// ==RevisionHistory==
// Version 1.0
// Released: 2007-04-12
// Made the Style sheet easier to edit, lots of new comments to 
// guide editting, and added gradient mapping for popular post count,
// added delicious icon recoloring and "not shared" label coloring
// 
// Version 0.3
// Released: 2006-01-16
// Background link color for posts, new tag hover rules
//
// Version 0.2:
// Released: 2006-01-03.
// Modified release by Thomas Upton.
// Includes new font family, new link colors, and support for visited links in the main areas of the site.
//
// Version 0.1:
// Released: 2005-11-29.
// Initial release.
// ==/RevisionHistory==
//
// 



(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EDIT ME

var mainDark = "1d2449";
var mainMed = "495bb6";
var mainLight = "7f8ccc";
var secDark = "2f3037";
var secMed = "525460";
var secLight = "75778a";
var secLightest = "9fa0ad";	
var highlight = "e67c19";
var alert = "00EF00";


//END EDIT ME
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




	// font-family = base font 
	// background-color = background below top bar and behind posts
	// color = text color of /'s |'s and "logged in as..." in top bar; item count and "Your items tagged..." in the search bar, and page number below the search bar and below the posts
	var newstyle = "body { font-family: verdana, arial, sans-serif; background-color: #" + mainDark + "; color: #" + secMed + " }";
	
	// style for the tag name being viewed in the header
	newstyle = newstyle + ".crumb { background-color: #" + mainDark + "; border: 1px solid #" + secLight + "; color: #" + secMed + "; }";

	// color = non-visited links in the posts, earlier/later links and the bundle/tag side bar 
	newstyle = newstyle + "a:link { color: #" + mainMed + "; }";

	// color = visited links in the posts, earlier/later links and the bundle/tag side bar 
	newstyle = newstyle + "a:visited { color: #" + highlight + "; }";
	
	// style for search bar form: input box, select box and search button
	newstyle = newstyle + "#searchform input, #searchform select { border: 2px outset #" + secLight + "; background-color: #" + secLightest + "; color: #" + secMed + "; }"; 
	
	newstyle = newstyle + ".grey { color: #" + secLightest + "; }";
	newstyle = newstyle + "#header { background-color: #" + mainDark + ";  }";
	newstyle = newstyle + "#header a:link, #header a:visited { color: #" + secLightest + "; }";
	newstyle = newstyle + "#infobar {  background-color: #" + secDark + "; border: 1px solid #" + secMed + ";  }";
	newstyle = newstyle + "#infobar a:link, #infobar a:visited { color: #" + secMed + "; }";
	newstyle = newstyle + ".posts li {  background-color: #" + mainDark + "; }";
	newstyle = newstyle + ".post .meta { color: #" + secLight + "; }";
	newstyle = newstyle + ".post .meta a { color: #" + secLightest + "; }";
	newstyle = newstyle + ".post p.notes, .post .meta .extended {  color: #" + mainLight + "; }";
	newstyle = newstyle + ".post button { border: 2px outset #" + mainMed + "; background-color: #" + mainLight + ";  }";
	newstyle = newstyle + ".post .commands a { color: #" + mainLight + "; }";
	newstyle = newstyle + ".post input.url, .post input.tags, .post input.notes { color: #" + mainLight + "; }";
	newstyle = newstyle + ".post textarea.notes, .post input.notes { color: #" + mainDark + ";  }";
	newstyle = newstyle + "#sidebar, #related-sidebar {  border: 1px solid #" + secMed + "; color: #" + secMed + "  }";
	newstyle = newstyle + "#sidebar a:visited, #related-sidebar a:visited { color: #" + highlight + "; } ";
	newstyle = newstyle + ".sidebar-inner { background-color: #" + secDark + ";  border: 1px solid #" + secDark + ";}";
	newstyle = newstyle + ".sidebar-break {  border: 1px solid #" + secDark + ";  background-color: #" + secDark + ";  }";
	newstyle = newstyle + ".bundles .label { color: #" + secLightest + "; }";
	newstyle = newstyle + ".bundles .grey span { color: #" + secLightest + "; }";
	
	
	// "showing per page" number links
	newstyle = newstyle + "#items-per-page a:link { color: #" + mainMed + ";  }";


///////
//// del.icio.us FRONTPAGE STYLES
////////

	// frontpage hotlist title bar
	newstyle = newstyle + "#fp-hotlist-title {  background-color: #" + secDark + "; color: #" + secMed + ";  }";
	
	// "see also"
	newstyle = newstyle + "#fp-hotlist-bylinks {  color: #" + secMed + "; }";
	
	// "hot now" and still "cool links"
	newstyle = newstyle + "#fp-hotlist .hotnow { color:#" + secMed + ";  }";
	
	// "people", "first posted by" & "tags"
	newstyle = newstyle + "#fp-hotlist .hotlist {color:#" + secMed + "; }";
	
	// image preview border
	newstyle = newstyle + "#fp-hotlist .hotlist li h4 img {  border: 1px solid #" + secLight + ";  }";
	
	// hotlist post horizontal divider
	newstyle = newstyle + "#fp-hotlist .hotlist ol li { border-bottom:1px solid #" + secLight + "; }";
	
	// "save this" links
	newstyle = newstyle + "#fp-hotlist .hotlist li .savethis a { color: #" + secLight + ";  }";
	newstyle = newstyle + "#fp-hotlist .hotlist li .savethis a:visited { color: #" + secLight + "; }";
	
	// hotlist people count box
	newstyle = newstyle + "#fp-hotlist .hotlist li .meta strong .num .numbox { background-color: #" + secDark + "; color: #" + secMed + ";  }";
	newstyle = newstyle + "#fp-hotlist .hotlist li .meta strong .num .numbox a { color: #" + secLight + "; }";
	newstyle = newstyle + "#fp-hotlist .hotlist li .meta strong .num .numbox a:visited { color: #" + secLight + "; }";
	
	// usernames
	newstyle = newstyle + "#fp-hotlist .hotlist .tags a, #fp-hotlist .hotlist .tags a:visited {color:#" + mainDark + "}";
	
	// hotlist tag bars background colors
	newstyle = newstyle + "#fp-hotlist .hotlist .tags { background:#" + secLightest + "; }";
	newstyle = newstyle + "#fp-hotlist .hotlist .tags .label { background:#" + mainDark + "; }";
	newstyle = newstyle + "#fp-hotlist .hotlist .tags ul { background:#" + secLightest + "; }";
	
	// hotlist tag list vertical separators
	newstyle = newstyle + "#fp-hotlist .hotlist .tags ul li {  border-left:2px solid #" + secMed + ";  }";
	// hotlist tag names
	newstyle = newstyle + "#fp-hotlist .hotlist .tags li a, #fp-hotlist .listitem .tags li a:visited {color:#" + secMed + ";}";
	// hotlist tag names hover color
	newstyle = newstyle + "#fp-hotlist .hotlist .tags li a:hover {color:#" + mainDark + "; }";
	
	
///////
///bundle editting
//////
	
	// bundle list text color
	newstyle = newstyle + "#bundle-edit a { color: #" + secLight + "; }";
	
	// tag text colors
	newstyle = newstyle + "#bundle-edit .one { color: #" + secMed + "; }";
	newstyle = newstyle + "#bundle-edit .ten {  color: #" + secLight + "; }";
	newstyle = newstyle + "#bundle-edit .member { background-color: #" + mainDark + "; color: #" + secLight + "; }";
	newstyle = newstyle + "#bundle-edit .used { border: 1px solid #" + secLight + "; }";
	newstyle = newstyle + "#bundle-edit .usedmember { background-color: #" + mainDark + "; color: #0d0; border: 1px solid #" + secLight + "; }";
	
	//tag panel background color
	newstyle = newstyle + "#bundle-edit .bg { background-color: #" + secDark + "; }";


/////////
//////other
////////

	// if the page has a thin horizontal bar up by the header or down by the footer that runs the width of the page
	newstyle = newstyle + "#banner-hr { background-color: #" + secMed + ";  border: 1px solid #" + secDark + ";  }";
	newstyle = newstyle + "#footer-hr { background-color: #" + secMed + "; border: 1px solid #" + secDark + ";  }";
	
	// Settings pages titles
	newstyle = newstyle + ".abouthead{ color:#" + secLightest + ";}";




///////////
// NOTE: below this line all values should be rgb in 0-255 scale.  Not HEX.
///////////


	 HexToR = function(h) {return parseInt(h.substring(0,2),16)}
	 HexToG = function(h) {return parseInt(h.substring(2,4),16)}
	 HexToB = function(h) {return parseInt(h.substring(4,6),16)}


	// information for "saved by # other people" gradients
	// for posts with higher number of people (used in gradient)
	var rgbPopular = [ HexToR(secMed), HexToG(secMed), HexToB(secMed) ];
	// for posts with fewer number of people (used in gradient)
	var rgbNotPopular = [ HexToR(secDark), HexToG(secDark), HexToB(secDark) ];
	// text color for those boxes
	var popFont = [ HexToR(secLightest), HexToG(secLightest), HexToB(secLightest)  ];
	
	// colors for the delicious icon in the header and footer::COLORS = top-left, top-right, bottom-left, bottom-right => tl,tr,bl,br

	var tl = [ HexToR(secLightest), HexToG(secLightest), HexToB(secLightest)  ];
	var tr = [ HexToR(mainMed), HexToG(mainMed), HexToB(mainMed)  ];
	var bl = [ HexToR(secDark), HexToG(secDark), HexToB(secDark) ];
	var br = [ HexToR(secMed), HexToG(secMed), HexToB(secMed)  ];
	
	// color for private "not shared" label
	var notsh = [ HexToR(alert), HexToG(alert), HexToB(alert)];





	


	// function for grabbing elements by class name	(buggy with certain span tags apparently?)
	document.getElementsByClassName = function(clsName){
		var retVal = new Array();
		var elements = document.getElementsByTagName("*");
		for(var i = 0;i < elements.length;i++){
			if(elements[i].className.indexOf(" ") >= 0){
				var classes = elements[i].className.split(" ");
				for(var j = 0;j < classes.length;j++){
					if(classes[j] == clsName)
						retVal.push(elements[i]);
				}
			}
			else if(elements[i].className == clsName)
				retVal.push(elements[i]);
		}
		return retVal;
	}
	
	// function for grabbing span elements by class name
	document.getSpanByClassName = function(clsName) {
		var retVal = new Array();
		var elements = document.getElementsByTagName("span");
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].className == clsName) {
				retVal.push(elements[i]);
				}
			}
		return retVal;
	}
    
	
	//fix popularity gradients
	
	var rlo = rgbNotPopular[0];
	var rrange = rgbPopular[0] - rlo;
	var glo = rgbNotPopular[1];
	var grange = rgbPopular[1] - glo;
	var blo = rgbNotPopular[2];
	var brange = rgbPopular[2] - blo;		

	var saved = document.getElementsByClassName("pop");
	for (var x = 0; x < saved.length; x++) {
		var texttemp = saved[x].style.background;
		var texttemp2 = "";
		for ( var i = 4; i < texttemp.length-2; i++) {
			texttemp2 = texttemp2 + texttemp[i];
			}
		var ns = texttemp2.split(",");	
		var mag = Math.sqrt((ns[0] * ns[0]) + (ns[1] * ns[1]) + (ns[2] * ns[2])) / 3;
		mag = mag / 255;
		mag = 1 - ( 5.882 * ( mag - 0.41));	
		var r = Math.floor( ( mag * rrange ) + rlo );
		var g = Math.floor( ( mag * grange ) + glo );
		var b = Math.floor( ( mag * brange ) + blo );
		saved[x].style["background"] = "rgb( " + r + "," + g + ", " + b + ")";
		saved[x].style["color"] = "rgb( " + popFont[0] + ", " + popFont[1] + ", " + popFont[2] + " )";
		}
		
	
	// fix delicious image in footer and header
	
	var header = document.getElementById("header-l");
	var temp = header.innerHTML;
	header.innerHTML = "<div id='bl'><div id='tl'></div><div id='br'><div id='tr'></div></div></div>" + temp;
	var footericon = document.getElementsByClassName("first");
	footericon[0].innerHTML = "<div id='bls'><div id='tls'></div><div id='brs'><div id='trs'></div></div></div><a href='http://del.icio.us/'>del.icio.us</a>";
	
	newstyle = newstyle + "#tl { float: left; background: rgb(" + tl[0] + ", " + tl[1] + ", " + tl[2] + "); width: 21px; height: 21px; }";	
	newstyle = newstyle + "#tr { float: left; background: rgb(" + tr[0] + ", " + tr[1] + ", " + tr[2] + "); width: 21px; height: 21px; }";
	newstyle = newstyle + "#bl { float: left; background: rgb(" + bl[0] + ", " + bl[1] + ", " + bl[2] + "); width: 42px; height: 42px; margin-right: 10px; margin-top: 10px; }";
	newstyle = newstyle + "#br { float: left; background: rgb(" + br[0] + ", " + br[1] + ", " + br[2] + "); width: 21px; height: 42px; }";
	newstyle = newstyle + "#tls { float: left; background: rgb(" + tl[0] + ", " + tl[1] + ", " + tl[2] + "); width: 5px; height: 5px; }";
	newstyle = newstyle + "#trs { float: left; background: rgb(" + tr[0] + ", " + tr[1] + ", " + tr[2] + "); width: 5px; height: 5px; }";
	newstyle = newstyle + "#bls { float: left; background: rgb(" + bl[0] + ", " + bl[1] + ", " + bl[2] + "); width: 10px; height: 10px; margin-right: 5px; margin-top: 2px }";
	newstyle = newstyle + "#brs { float: left; background: rgb(" + br[0] + ", " + br[1] + ", " + br[2] + "); width: 5px; height: 10px; }";
	newstyle = newstyle + "#header-l { float: left; background: none; min-height: 0px; _height: 0px; padding: 0 0 0 0;}";
	
	// fix not shared labels
	
	var notshared = document.getSpanByClassName("private");
	for (var x = 0; x < notshared.length; x++) {
	notshared[x].innerHTML = "...<span style='color: rgb(" + notsh[0] + ", " + notsh[1] + ", " + notsh[2] + ");'>not shared</span>";

	}
	
	
	// update stylesheet
	var ss = document.createElement("style");
	var t = document.createTextNode(newstyle);
	
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
	ss.appendChild(t);
	root.appendChild(ss);
})();



////////////////////////////////editting IN PROGRESS///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/*
// unknowns  
newstyle = newstyle + ".crumb-focus { background-color: #0f0; border: 1px solid #f00; }";

newstyle = newstyle + "#header-mini { background-color: #0f0;  }";
newstyle = newstyle + "#header #socialbookmarking { color: #f00; }";
newstyle = newstyle + ".error, .important, .notice { color: red; }";
newstyle = newstyle + ".alwaysblue a:link, .alwaysblue a:visited { color: #0f0; }";
newstyle = newstyle + "#header-warning { background-color: #0f0;  }";

newstyle = newstyle + "#inline-suggestions { border: 2px solid #eee; background-color: #f00;  }";
newstyle = newstyle + "#inline-suggestions .tag {  color: #0ff;   }";
newstyle = newstyle + "#inline-suggestions .selected, #suggestions .tag:hover  { background-color: #0f0 !important; color: #f00 !important; }";
newstyle = newstyle + ".post .commands { color: #" + mainDark + "; }";

newstyle = newstyle + ".posts .gripe { border: 2px solid #f0f; }";
newstyle = newstyle + ".posts .private h4.desc { color: #0ff; }";
newstyle = newstyle + ".posts .first-old-post { border-top: 1px dashed #334080; }";

newstyle = newstyle + ".highlighted {  background-color: #0f0 !important; }";
newstyle = newstyle + ".by-url .date { color: #f00; }";
newstyle = newstyle + ".by-minute .date { color: #0ff; }";


newstyle = newstyle + ".bundles .one { color: #0f0; }";
newstyle = newstyle + ".bundles .cur { color: #f00; }";
newstyle = newstyle + ".bundles .cur:visited { color: #0ff !important; }";


//fp unknowns
newstyle = newstyle + "#fp-tagblurb {  background-color: #0f0; color: #0f0; }";
newstyle = newstyle + "#fp-tagblurb-inner a:link, #fp-tagblurb-inner a:visited { color: #f00; }";
newstyle = newstyle + ".ltgrey { color: #f00; }";

*/
/*

newstyle = newstyle + "#curated h3 { background-color: #eee;  }";
newstyle = newstyle + "#curated ol li ol li {  border-top: 1px solid #ddd;  }";

newstyle = newstyle + "#sponsored .sidebar-break {  border: 1px solid #ddd;  background-color: #ddd;  }";
newstyle = newstyle + "#sponsored #sidebar h3 {  color: #999;}";
newstyle = newstyle + "#sponsored #sidebar .matchdomain { color: #090; }";
newstyle = newstyle + ".postui .selected, .postui .tag:hover  { background-color: #008 !important; color: #fff !important; }";
newstyle = newstyle + ".postui .recommended { color: #080;  }";
newstyle = newstyle + "a.noclicky, a.noclicky:hover { cursor: default; color: #000; }";
newstyle = newstyle + ".postui .bundles .label { color: #000; }";
newstyle = newstyle + ".postui .popup {  background-color: #eee; border-top: 1px solid #ccc }";
newstyle = newstyle + "#footer li { border-left: 1px solid #444;  }";
newstyle = newstyle + "#items-per-page a:link, #items-per-page a:visited { color: #00f; }";
newstyle = newstyle + "#banme:link, #banme:hover { color: #fff; text-decoration: none; }";
newstyle = newstyle + "#offset-page .notice { color: #f00; }";
newstyle = newstyle + "#signup-steps {  color: #999; border-bottom: 1px #999 dashed; }";
newstyle = newstyle + "#signup-steps li span { background-color: #999; color: white; }";
newstyle = newstyle + "#signup-steps li.cur { color: #090; }";
newstyle = newstyle + "#signup-steps li.cur span { background-color: #090; }";
newstyle = newstyle + "#register h4 { color: #090; }";
newstyle = newstyle + ".next-steps h4 { display: inline; border: 1px solid #fc6; background-color: #ffc; padding: 0.3em 0.5em; margin-right: 1em; }";
newstyle = newstyle + ".next-steps h4 a:link, .next-steps h4 a:visited { color: #00f; }";
newstyle = newstyle + ".flockregister {  background-color: #fff0a2;  }";
newstyle = newstyle + "#keep-share-discover { background-color: #eee;  }";
newstyle = newstyle + "a.expand-help {  color: blue;  }";
newstyle = newstyle + "#bookmarklet-instructions .screenshot { border: 1px solid black;  }";
newstyle = newstyle + "a.bookmarklet2:link, a.bookmarklet2:visited { color: #003DF5;  }";
newstyle = newstyle + ".instructions { color: #FF0000; }";
newstyle = newstyle + ".slider-button { border: 2px solid #888; background-color: #ccc; }";
newstyle = newstyle + ".slider-track { background-color: #444; }";
newstyle = newstyle + "#help-page h1, #help-page h2, #help-page h3, #help-page h4, #help-page h5 {  color: green; }";
newstyle = newstyle + "#help-page img.brdr { border: 1px solid #ccc;  }";
newstyle = newstyle + "#notifybar { border-bottom: 2px dotted #ccc; }";
newstyle = newstyle + "#notifytext { color: #999 }";
newstyle = newstyle + "#notifyalerttext { color: red; }";
newstyle = newstyle + "#notifyclose {  color: #999 }";
newstyle = newstyle + "DIV.delPage {  background-color: #eee; }";
newstyle = newstyle + ".navactive{color:#0000FF; }";
newstyle = newstyle + ".api-response{background-color:#DDDDDD;}";
newstyle = newstyle + ".api-doc h2{color:#C00;}";
newstyle = newstyle + "#notifybar { border-bottom: 2px dotted #ccc;  }";
newstyle = newstyle + "#notifytext { color: #999 }";
newstyle = newstyle + "#notifyclose {  color: #999 }";
newstyle = newstyle + ".tagdesc_display { border-bottom: 1px solid #999;  }";
newstyle = newstyle + ".tagdesc_display .options {  color: #999999;  }";
newstyle = newstyle + ".tagdesc_display .options a { color: #9999ff; }";
newstyle = newstyle + "#tagdesc_show_wrapper {  color: #999999; }";
newstyle = newstyle + "#tagdesc_show { color: #9999ff; }";
newstyle = newstyle + ".tagdesc_new {  color: red }";
newstyle = newstyle + ".tagdesc_editor {  background-color: #eee;  }";
newstyle = newstyle + ".tagdesc_editor td.savecancel div.counter {  color: #888; }";
newstyle = newstyle + ".tagdesc_editor td.savecancel div.counter_over { color: #f33; }";
*/

////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
