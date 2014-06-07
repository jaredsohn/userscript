// ==UserScript==
// @name          Outbrain for Bloglines
// @description	  Adds graphic stars after each item; clicking on a star submits the vote to a remote page
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/myblogs_display*
// @author        Noam Solomon
// @date          August 24, 2006
// @version       0.4
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)
// 
// Changes:
// version 4 -- thanks! state is replaced with voted state using setTimeout
// version 3 -- added version parameter; uses javascript animation and complex matrix image; saves state in page
// version 2 -- add user id to recorded information; include bloglines.com (no www.*)

/** ============================= CONFIGURATIONS ======================================================= **/

var imgUrl = "http://204.193.155.59/outbrain/Bloglines_voting_stars_matrix.gif" // url of the star matrix graphic (contains the stars graphic in different states in predefined positions)
var imgSize = 30																// size of each star star 
var recorderUrl = "http://204.193.155.59/cgi-bin/outbrain_vote.cgi"				// uri which records the vote
var siteid = 0																	// used for finding item divs.  maybe doesn't ever change?

var itemurl_expr = "h3/a[@class=\"bl_itemtitle\"]"								// xpath for extracting url for item
var insertionpoint_expr = "div[@class=\"item_nav\"]/ul[1]"						// xpath for getting node where to add the stars

/** ============================= MAIN CODE ======================================================= **/
add_doVote_script()
add_stars_style()	
decorate_blogline_items();

/** Adds the doVote(url, numStars) script which users call by clicking on the star links 
 * note that doVote uses image loading to access the URL, instead of Ajax style, in order to get around security restrictions 
 * requires the global variable userid_global
 *
 * parameters sent to the cgi:
 *   u = the url, s = number of stars
 *   e = email, v = version, a = agent
 *   r = random value to prevent browser url cacheing
 **/
function add_doVote_script() {
    var userid = get_userid()
    var const_url = "v=4&e=" + escape(userid) + "&a=bloglines+greasemonkey"
    
	script = document.createElement('script')	
	
    script.innerHTML = 
              "var currentvote = Array()\n"        
            + "var inthanksmode = Array()\n"            
            + "function change_div_bgxy(div_id, x, y) {\n"
            + "	var div = document.getElementById(div_id)\n"
	        + "    div.style.setProperty('background-position', x + \"px \" + y + \"px\", 'important')\n"
           	+ "}\n"            
            + "function revert_div_thanks(div_id) { \n"
            + "    inthanksmode[div_id] = true\n"
            + "	revert_div_bgxy( div_id, 46 ) \n"
            + "    setTimeout(\"clear_div_thanks(\\\"\" + div_id + \"\\\")\", 1000)\n"
            + "}\n"                
            + "function revert_div_normal(div_id) {\n" 
            + "	if (inthanksmode[div_id]) return\n"
            + "	revert_div_bgxy( div_id, 23 ) \n"
            + "}\n"
            + "function clear_div_thanks(div_id) { \n"
            + "    delete inthanksmode[div_id]\n"
            + "    revert_div_normal( div_id ) \n"
            + "}\n"
            + "function revert_div_bgxy(div_id, y0) {\n"
            + "	   var state = currentvote[div_id]\n"
            + "    if (! state) {\n"
            + "    	x = 0\n"
            + "    	y = 0\n"
            + "    } else {\n"
	        + "    	x = 66 * (5 - state + 1)\n"
	        + "    	y = y0\n"
            + "   	}\n"
            + "	   var div = document.getElementById(div_id)\n"
	        + "    div.style.setProperty('background-position', x + \"px \" + y + \"px\", 'important')\n"
            + "	}\n"
			+ "function doVote(div_id,url,numStars) {\n"
			+ "  img = new Image()\n"
			+ "  img.src = \"" + recorderUrl + "?s=\" + numStars + \"&u=\" + escape(url) + \"&" + const_url + "&r=\" + (Math.random()+\"\").substring(3,12)\n"
		 	+ "  currentvote[div_id] = numStars\n"	
		 	+ "  revert_div_thanks(div_id)\n"
		 	+ "}"

	//alert(script.innerHTML)
	
	document.getElementsByTagName('head').item(0).appendChild(script)
}

/** Adds the css for rendering the star links 
 * Original design based on komodo media, using all css-positioned ul and li elements, with the a:hover style doing the animation
 * Since version 3, the scheme uses a table instead, with javascript animation
 * @see http://komodomedia.com/blog/index.php/2006/01/09/css-star-rating-part-deux for details of the star design
 * There is unfinished business here for squaring the UL/LI styles from Komodo Media with the UL/LI styles from Bloglines
 **/
 
function add_stars_style() {
	// add style for the stars
	var css=document.styleSheets[0]
	var nrules = css.cssRules.length
	
	css.insertRule(".vote_div { width:65px; height:23px; background: url(" + imgUrl + "); z-index:3 }", nrules++)
    css.insertRule(".star { display:block; position:relative; left:0px; top:0px; width:13px; height:23px; z-index:1; text-decoration: none;text-indent: -9000px; border-left: 0px; padding: 0px 0px 0px 0px; margin:0px}", nrules++)
    css.insertRule(".vote_div td { width:13px; height:23px; border-left: 0px; padding: 0px 0px 0px 0px; margin:0px; }", nrules++)
}

/** Adds the stars to the links for each item
 * Makes use of a javascript array declared within the bloglines page, thus the use of unsafeWindow to access it
 */
function decorate_blogline_items() {
	// use the siteList array from the main javascript instead of crawling the DOM
	var siteList = unsafeWindow.siteList
	if (siteList == null) {
		return;
	}

	// add stars to the item_nav links for each site item
	var numItems = siteList[0].numItems
	
	  
	for ( var i=0; i<numItems; i++) {
		var ele = document.getElementById('siteItem.'+siteid+'.'+i);
		var url = get_item_url(ele)
				
		result = document.evaluate(insertionpoint_expr, ele, null, XPathResult.ANY_TYPE,null)
		ul = result.iterateNext()
		if (ul == null) return
		var stars = ""
		var div_id = "votediv." + i
		stars += "<div onmouseout=\"revert_div_normal('" + div_id + "')\" style=\"width:65px; height:23px; display:inline; border-left: 1px solid #666; color: #000; padding: 0 0.6em;\">"        
			  + "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"display:inline\">"
              + "<tr id=\"" + div_id + "\" class=\"vote_div\">"
			  + "<td><a class=\"star\" style=\"border-left:0px; padding:0px\" onmouseover=\"change_div_bgxy('" + div_id + "',66*5,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',1)\">1</a></td>"
			  + "<td><a class=\"star\" style=\"border-left:0px; padding:0px\" onmouseover=\"change_div_bgxy('" + div_id + "',66*4,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',2)\">2</a></td>"
			  + "<td><a class=\"star\" style=\"border-left:0px; padding:0px\" onmouseover=\"change_div_bgxy('" + div_id + "',66*3,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',3)\">3</a></td>"
			  + "<td><a class=\"star\" style=\"border-left:0px; padding:0px\" onmouseover=\"change_div_bgxy('" + div_id + "',66*2,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',4)\">4</a></td>"
			  + "<td><a class=\"star\" style=\"border-left:0px; padding:0px\" onmouseover=\"change_div_bgxy('" + div_id + "',66*1,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',5)\">5</a></td>"
			  + "</tr></table></div>"

		ul.innerHTML += "<li>" + stars + "</li>"
	}
}

function get_item_url(ele) {
		var urlResult = document.evaluate(itemurl_expr, ele, null, XPathResult.ANY_TYPE, null)
		var linkElement = urlResult.iterateNext()
		if (linkElement == null) return ""
		return linkElement.href
}

/** extracts the user id from the page 
 * currently gets it from welcome banner
 */
function get_userid() {
	var ele = document.getElementById('welcomeBar');
	if (ele == null) return 'n/a'
	var txt = ele.innerHTML
	txt = txt.replace(/.* /gi, '')
	txt = txt.replace(/\s/g, '')
	return txt
}