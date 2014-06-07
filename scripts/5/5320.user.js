// ==UserScript==
// @name          Outbrain for Sage
// @description	  Adds graphic stars after each item; clicking on a star submits the vote to a remote page
// @include       file://*/Firefox/*/sage.html
// @author        Noam Solomon
// @date          August 24, 2006
// @version       0.1
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)
// 
// Changes:

/** ============================= CONFIGURATIONS ======================================================= **/

var imgUrl = "http://204.193.155.59/outbrain/Bloglines_voting_stars_matrix.gif" // url of the star matrix graphic (contains the stars graphic in different states in predefined positions)
var imgSize = 30																// size of each star star 
var recorderUrl = "http://204.193.155.59/cgi-bin/outbrain_vote.cgi"				// uri which records the vote
var siteid = 0																	// used for finding item divs.  maybe doesn't ever change?

var itemurl_expr = "h2/a"															// xpath for extracting url for item
var item_expr = "//div[@class=\"item\"]"
var insertionpoint_expr = "div[2]"						// xpath for getting node where to add the stars

// with sage, no access to stylesheet
var vote_div_rule = "width:65px; height:23px; background: url(" + imgUrl + "); z-index:3"
var star_rule = "display:block; position:relative; left:0px; top:0px; width:13px; height:23px; z-index:1; text-decoration: none;text-indent: -9000px; border-left: 0px; padding: 0px 0px 0px 0px; margin:0px"
var vote_div_td_rule = "width:13px; height:23px; border-left: 0px; padding: 0px 0px 0px 0px; margin:0px;"


/** ============================= MAIN CODE ======================================================= **/
add_doVote_script()
decorate_items();

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
    var const_url = "v=4&e=" + escape(userid) + "&a=sage+greasemonkey"
    
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

/** Adds the stars to the links for each item
 * Makes use of a javascript array declared within the bloglines page, thus the use of unsafeWindow to access it
 */
function decorate_items() {
	var itemItor = document.evaluate(item_expr, document, null, XPathResult.ANY_TYPE,null)
	var i = 0
	var elements = Array() // seems like having two iterators at once creates problems, so save the results from this
	while ( ele = itemItor.iterateNext()) {
		elements[i++] = ele
	}
	i = 0
	while (i < elements.length) {
		var ele = elements[i++]
		var url = get_item_url(ele)
		var result = document.evaluate(insertionpoint_expr, ele, null, XPathResult.ANY_TYPE,null)
		insertPoint = result.iterateNext()
		if (insertPoint == null) return
		var newDiv = document.createElement('div')
		var div_id = "votediv." + i
		newDiv.style.width = "65px"
		newDiv.style.height = "23px"
		newDiv.style.display = "inline"
		newDiv.style.float = "right"		
		newDiv.style.padding = "0.06em"		
		
		var stars = ""
			  + "&nbsp;&nbsp;&nbsp" // sigh
			  + "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"display:inline\" onmouseout=\"revert_div_normal('" + div_id + "')\" >"
              + "<tr id=\"" + div_id + "\" style=\"" + vote_div_rule + "\">"
			  + "<td style=\"" + vote_div_td_rule + "\"><a style=\"" + star_rule + "\" onmouseover=\"change_div_bgxy('" + div_id + "',66*5,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',1)\">&nbsp;</a></td>"
			  + "<td style=\"" + vote_div_td_rule + "\"><a style=\"" + star_rule + "\" onmouseover=\"change_div_bgxy('" + div_id + "',66*4,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',2)\">&nbsp;</a></td>"
			  + "<td style=\"" + vote_div_td_rule + "\"><a style=\"" + star_rule + "\" onmouseover=\"change_div_bgxy('" + div_id + "',66*3,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',3)\">&nbsp;</a></td>"
			  + "<td style=\"" + vote_div_td_rule + "\"><a style=\"" + star_rule + "\" onmouseover=\"change_div_bgxy('" + div_id + "',66*2,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',4)\">&nbsp;</a></td>"
			  + "<td style=\"" + vote_div_td_rule + "\"><a style=\"" + star_rule + "\" onmouseover=\"change_div_bgxy('" + div_id + "',66*1,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',5)\">&nbsp;</a></td>"
			  + "</tr></table>"

		newDiv.innerHTML = stars
		insertPoint.appendChild( newDiv )
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