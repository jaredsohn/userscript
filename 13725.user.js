// ==UserScript==
// @name          Wikipedia Automatic MultiColumn & Cleaner Display
// @namespace     http://userscripts.org/users/36599
// @description	  Automatically reformats Wikipedia entries to multiple columns based on window size and article length. Also removes distracting sidebox.
// @author        twieder
// @include       http://*.wikipedia.org/wiki/*
// ==/UserScript==
var minChars = 10000;//minimum characters per column
var windWidth = 460;//width of columns in pixels 
var wdth=window.innerWidth
var cols=Math.floor(wdth/windWidth);

var usableCols= Math.ceil(countCharacters(document.body)/minChars);
cols=(usableCols<cols)?usableCols:cols;
//alert(countCharacters(document.body) + " " + cols);
var lstMod=document.getElementById('lastmod').innerHTML;
var divLastMod = document.createElement('div');
var h1LastMod = document.createElement('h1');
h1LastMod.innerHTML=lstMod;
divLastMod.style.position='absolute';
divLastMod.style.marginTop='0px;';
divLastMod.style.marginLeft='140px;'
divLastMod.appendChild(h1LastMod);

document.getElementById("column-one").appendChild(divLastMod);



var css = "/* Based on Wikipedia Clean and Professional (Version 1.5) March 27, 2007 ----------------------------------------------- Full credit for the code goes to Chochem who designed the original \"Grey Lady Look\" which you can find on userstyles.org ----------------------------------------------- Change log: Version 1.5 -They added some extra links at the top of the page that didn't match the theme of this style. Those were removed to restore the original theme. Version 1.4 - Added article notifications back in. I didn't feel that they detracted from the astectics of the page and actually included valuable information about the article. Version 1.32 - Reduced H1 font size. Version 1.31 - Corrected some typos. Version 1.3 - Fixed a border error in the footer. Version 1.2 - Fixed instructions on to add tabs back in. Version 1.1 - Removed the wikitionary mention from script - Fixed the search bar location - Fixed the \"sign in\" text location - Cleaned up code Version 1.0 - First public version This script is designed for someone who wants an ultra clean Wikipedia which looks much more professional in layout and font sytle. There are a few things to keep in mind with this: 1) This is only for the English version of Wikipedia. 2) I removed the tabs. I wanted a skin that would highlight the article. If you want the tabs back, remove the following lines of code: In the (#p-cactions ul li) menu remove the line below: {display:none !important;}"+
" 3) This is for high resolution configurations. It has not been tested for 800x600 or smaller. Thank you for downloading! Nick Roberts */ body { font-family: Trebuchet MS, serif !important; background: #F8F7FF url('') 0 0 no-repeat !important; }"+
" #globalWrapper { margin: 100px 0px 0px 0px !important; padding: 0px 0px 0px 0px !important; width:100% !important; }"+
"   #column-content { position: relative !important; margin: 0 !important; margin-top: -20px !important;padding: 0 !important; float:left !important; width:100% !important}"+
" #copyright, #warn, #privacy, #about, #disclaimer{ display:none !important;}"+
" #contentSub{display:none !important;}"+
" #content {-moz-column-count:" + cols + "; -moz-column-gap:2em; background: white !important; margin: 2em !important; padding: 15px 20px 20px 20px !important;  border: none !important; border-left: 1px solid !important; border-right: 0px solid !important; border-color: #DDDDDD !important; top: 0px !important; }"+
" div#bodyContent { width: 100% !important; text-align: left !important; font-size: 100% !important; font-weight: 100 !important; margin: 0 auto 0 auto !important; padding: 0 !important; }"+
" a:link { text-decoration: underline !important; color: #000082 !important; }"+
" a:visited { text-decoration: underline !important; }"+
" a:hover { text-decoration: underline !important; }"+
" a:active { text-decoration: underline !important; }"+
" #column-one { position: absolute !important; width: 50% !important; height: 80px !important; padding: 0px !important; margin: 15px 15px 15px 0px !important; top: 0px !important; text-align: left !important; z-index: 10 !important; white-space: normal !important; font-size: 11px !important; background-image: url(http://upload.wikimedia.org/wikipedia/commons/1/12/Wikipedia.png) !important; background-position:-5px -75px; background-repeat: no-repeat !important; }"+
" .portlet {margin: 0 !important;}"+
" .portlet h5 {display:none !important;white-space: normal !important;}"+
" .portlet ul { line-height: 1.5em !important; list-style-type: square !important; list-style-image: url(bullet.gif) !important; font-size: 100% !important; }"+
" .portlet ul, .portlet li {display: inline !important;margin: 0 !important;}"+
" .portlet h5 {display:none !important;}"+
" .pBody { border: none !important; padding: 0 !important; font-family: Trebuchet MS, sans-serif !important; background-color: transparent !important; }"+
" .pBody ul li { margin: 0 !important; padding: 0 0.1em 0 0.1em !important; }"+
" .pBody li a { display: inline !important; }"+
" #p-interaction {display:none !important;}"+
" #p-cactions { display:none !important;position: absolute !important; top: 165px !important; left: 0 !important; width: 86.35% !important; margin: 0 auto 0 0 !important; padding: 0 !important; float:left !important; text-transform: uppercase !important; white-space: normal !important; border-bottom:1px solid #DDDDDD !important; }"+
" #p-cactions ul { margin: 0 !important; padding: 0em !important; }"+
" #p-cactions ul li {display:none !important;}"+
" #p-cactions li { padding: 0.2em 0em 0.2em 0em !important; margin: 0 !important; border-style: solid solid none solid !important; border-color: #999 !important; }"+
" #p-cactions li.selected { border-style: solid solid none solid !important; border-color: #999 !important; padding: 0.2em 0em 0.3em 0em !important; }"+
" #p-cactions li.selected a { letter-spacing: 0.5em !important; }"+
" #p-cactions li a { background-color: #ffffff !important; color: #333 !important; font-family: Trebuchet MS, sans-serif !important; text-transform: uppercase !important; }"+
" #p-personal { width: 100px !important; padding: 0 !important; margin: 0 !important; position: absolute !important; float: top:50px !important; right auto !important; left: 280px; !important; right: auto !important; text-align: right !important; top: 30px !important; z-index: 999 !important; }"+
" #p-personal .pBody li { margin: 0 0 0 0.8em !important; padding: 0 !important;  }"+
" #p-personal ul { margin: 0 !important; padding: 0 !important; }"+
" #p-personal li { margin: 0 0 0 1em !important; text-align: right !important; }"+
" #p-personal li a { color: gray !important; text-transform: capitalize !important; color: #AAAAAA !important; }"+
" #p-personal li a:hover { background-color: transparent !important; padding-bottom: 0 !important; }"+
" #p-search { position:relative !important; margin: 0px 0px 0px 0px !important; padding: 30px 150px !important; float: left !important; display:inline !important; }"+
" #p-search ul li {display:none !important;}"+
" #searchBody { text-align: center !important; }"+
" #searchBody ul li {display:none !important;}"+
" #searchInput { margin-bottom: 4px !important; }"+
" #searchInput ul li {display:none !important;}"+
" #p-lang { margin: 3px 0 0px 0 !important; position: relative !important; width: 750px !important; float: left !important; left: 75px !important; color: white !important; }"+
" #p-lang ul li:before { content: \"\00BB \0020\" !important; }"+
" #p-lang ul li {display:none !important;}"+
" #p-navigation { margin: 0 0 3px 0 !important; float: left !important; position: relative !important; left: 75px !important; width: 750px !important; }"+
" #p-navigation ul li:before { content: \"\00BB \0020\" !important; }"+
" #p-navigation ul li {display:none !important;}"+
" #p-tb { margin: 3px 0 3px 0 !important; position: relative !important; width: 735px !important; float: left !important; left: 90px !important; }"+
" #p-tb ul li:before { content: \"\00BB \0020\" !important; }"+
" li#pt-userpage,li#pt-anonuserpage,li#pt-login { background: none !important; padding-left: 0 !important}"+
" #p-tb ul li {display:none !important;}"+
" div#p-logo {display:none !important;}"+
" div#siteNotice {display: none !important}"+
" #footer {display:none;/* border-top: none !important; border-bottom: 0px !important; border-left: 1px solid !important; border-color: #DDDDDD !important; margin: 0px 0px 0px 0px !important; padding: 0px 0 50px 0 !important; */}"+
" div#f-poweredbyico, div#f-copyrightico { display: none !important }"+
" h1 { border-bottom: none !important; padding-top: 0 !important; font-family: Arial, serif !important; color: #000082 !important; font-weight: 100 !important; font-size: 180% !important; }"+
" h3 { font-weight: 100 !important; }"+
" h4 { font-size: 100% !important; }"+
" #contentSub { font-size: 100% !important; line-height: 1.2em; margin: 0 0 1.4em 0em !important; color: #7d7d7d; width: auto; }"+
" h3#siteSub { font-size: 80% !important; color: gray; }"+
" dl > dd > .dablink { margin-left: -2em !important; }"+
" .metadata {top: 35px !important;}"+
" #lastmod{font-size:larger; font-weight:bold;}"+
" #searchform{display:inline !important;}"+
" #BodyContent .ol{display:none !important;}"+
"  /* article notifications deleted for legibility and aesthethics */ div.messagebox { }";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
		document.app
	};
}
function countCharacters(n) {                // n is a Node 
    if (n.nodeType == 3 /*Node.TEXT_NODE*/)  // Check if n is a Text object
        return n.length;                     // If so, return its length
    // Otherwise, n may have children whose characters we need to count
    var numchars = 0;  // Used to hold total characters of the children
    // Instead of using the childNodes property, this loop examines the
    // children of n using the firstChild and nextSibling properties.
    for(var m = n.firstChild; m != null; m = m.nextSibling) {
        numchars += countCharacters(m);  // Add up total characters found
    }
    return numchars;                     // Return total characters
}