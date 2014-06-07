// ==UserScript==
// @name          pa-Retro
// @description	  Retro styled Penny-Arcade "theme"
// @include       http://*.penny-arcade.com*
// ==/UserScript==

/******************************************************************************
 *  Pays homage to the feel of the previous (original?) Penny Arcade site,
 * circa 200?-2005.  I missed the whimsical background images and funky
 * color palette of the original design.  The sites new design, though much
 * cleaner, felt a tad drab to me.
 *
 *  Here's to Jerry and Mike -- You guys do exceptional work! :)
 *
 *  If you're looking to release your own 'skin' for PA, please feel free
 * to use any of this code -- I'd be humbled if you choose to give attribution
 * in your script.
 *  
 * contact: dtwist@yahoo.com
 *
 * ------- Version History -------
 *
 * 1.4 - 2005-12-09
 *
 *  Updated to work with greasemonkey 0.6.4+ and Firefox 1.5+
 *
 *
 * 1.3 - 2005-11-21
 *
 *  Moved images to flickr.com
 *  Added new navigation buttons
 *
 *
 * 1.2 - 2005-11-19
 *
 *  Cleaned up css for "headers for thre rest"
 *  Added css to lessen contrast on header border of comic page
 *
 *
 * 1.1 - 2005-11-16
 *
 *  Added attribution comment in description
 *  Fixed date for version 1.0 in version history (oops :) )
 *
 *
 * 1.0 - 2005-11-13
 *
 *  Initial release
 *
 */



//  credit and thanks to Matthew Gray for this funciton
//  http://www.mkgray.com:8000/blog/Technology/Javascript/XpathAPI.comments
function evaluateXPath(context, path) { 
   var arr = new Array(); 
   var xpr = document.evaluate(path,context,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   for(i=0;item=xpr.snapshotItem(i);i++){ arr.push(item); } 
   return arr; 
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

(function() {
try
{

var body, xpathResult;

body = document.getElementsByTagName('body')[0];

//body's background image and content border
addGlobalStyle("body { background-image: url('http://static.flickr.com/34/65772829_0fe95942e4_o.png') ! important; }");
addGlobalStyle(".content { border: 8px solid #ddd; border-top: none; margin-bottom: 40px; }");

//content blocks' header bg image and placement
addGlobalStyle(".archives .archivesheader, .presents .presentsheader, #comicheader, .newspost .fullpostheader {background-image: url('http://static.flickr.com/33/65772828_b3d94b9c33_o.png') ! important; background-position: top center; background-repeat: no-repeat;}");

//newspost header voodoo
addGlobalStyle(".newspost .postheader {width: 519px ! important;}");
addGlobalStyle(".newspost .avatar {padding-left: 16px; }");
addGlobalStyle(".newspost .fullpostheader {background-color: #5151A4 ! important;  border: 3px solid #F9A906 ! important; border-bottom: none ! important; -moz-border-radius-topleft: 16px; -moz-border-radius-topright: 16px; height: 64px ! important; }");
addGlobalStyle(".newspost .fullpostheader:after {content:''; display: block; height: 4px; width: 100%; background-color: #ddd; margin: 0; margin-top: 60px; }");

//headers for the rest
addGlobalStyle(".archives .archivesheader, .presents .presentsheader, #comicheader {border: none ! important; -moz-border-radius-topleft: 13px; -moz-border-radius-topright: 13px; background-color: #5151A4 ! important; border-bottom: 5px solid #ddd ! important; }");

//lighter header border for comic
addGlobalStyle("#comicheader {border-bottom: 5px solid #9E9EB8 ! important; }");

//content blocks
addGlobalStyle(".newspost .postbody {border: 3px solid #F9A906 ! important; border-top: none ! important; background-color: #404096 ! important;}");
addGlobalStyle(".archives, .presents, #comic {background-color: #404096 ! important; border: 3px solid #F9A906 ! important; -moz-border-radius-topleft: 16px; -moz-border-radius-topright: 16px; }");


//                  NAVIGATION IMAGES                      //
//*********************************************************//

//strip
addGlobalStyle('img[alt="Comic Strip"]{width: 86px ! important; height: 81px ! important; }');
xpathResult = evaluateXPath (body, '//img[@alt="Comic Strip"]');
if (xpathResult.length == 1)
{ xpathResult[0].src = "http://static.flickr.com/34/65770527_7a64703491_o.png"; }

//news
addGlobalStyle('img[alt="News"]{width: 84px ! important; height: 81px ! important; }');
xpathResult = evaluateXPath (body, '//img[@alt="News"]');
if (xpathResult.length == 1)
{ xpathResult[0].src = "http://static.flickr.com/30/65769535_d12016ed66_o.png"; }

//back
addGlobalStyle('img[alt="Back"]{width: 47px ! important; height: 81px ! important; }');
xpathResult = evaluateXPath (body, '//img[@alt="Back"]');
if (xpathResult.length == 1)
{ xpathResult[0].src = "http://static.flickr.com/24/65769531_fe5d236333_o.png" }

//next
addGlobalStyle('img[alt="Next"]{width: 45px ! important; height: 81px ! important; }');
xpathResult = evaluateXPath (body, '//img[@alt="Next"]');
if (xpathResult.length == 1)
{ xpathResult[0].src = "http://static.flickr.com/26/65769536_a97f65e6ce_o.png" }

//first
addGlobalStyle('img[alt="First"]{width: 52px ! important; height: 81px ! important; margin-left: 121px; }');
xpathResult = evaluateXPath (body, '//img[@alt="First"]');
if (xpathResult.length == 1)
{ xpathResult[0].src = "http://static.flickr.com/34/65769533_55e59c95e2_o.png" }

//latest (news and comic)
addGlobalStyle('img[alt="Newest Comic"], img[alt="Current News"]{width: 64px ! important; height: 81px ! important; }');
xpathResult = evaluateXPath (body, '//img[@alt="Newest Comic"]|//img[@alt="Current News"]');
if (xpathResult.length == 1)
{ xpathResult[0].src = "http://static.flickr.com/28/65769534_d4d70775e8_o.png" }

//rss
addGlobalStyle('img[alt="RSS"]{width: 37px ! important; height: 81px ! important; margin-left: 80px; }');
xpathResult = evaluateXPath (body, '//img[@alt="RSS"]');
if (xpathResult.length == 1)
{ xpathResult[0].src = "http://static.flickr.com/34/65769537_2e683eeea7_o.png" }

}

catch (e)
{
	alert("UserScript exception: " + e);
}

})();
