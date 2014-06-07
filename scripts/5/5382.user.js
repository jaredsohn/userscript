// ==UserScript==
// @name          Outbrain for Rojo
// @description	  Adds graphic stars after each item; clicking on a star submits the vote to a remote page
// @include       http://*.rojo.com/*
// @include       http://rojo.com/*
// @author        Noam Solomon
// @date          August 25, 2006
// @version       0.1
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)
// 
// Changes:
// version 1 -- doesn't rely on outside site for stars matrix data

/** ============================= CONFIGURATIONS ======================================================= **/

var recorderUrl = "http://204.193.155.59/cgi-bin/outbrain_vote.cgi"				// uri which records the vote
var siteid = 0																	// used for finding item divs.  maybe doesn't ever change?
var agent_id = "rojo greasemonkey"												// string identifying this script for logging

var itemurl_expr = "div[1]/input[@type=\"checkbox\"]"							// xpath for extracting url for item
var insertionpoint_expr = "*/ul[@class=\"story-tools\"]"						// xpath for getting node where to add the stars
var username_xpath_expr = "//div[@id=\"navigation-account-settings\"]/ul/li/a"	// xpath for extracting div containing username
var username_cleanup_regexp = / .*$/gi											// regexp for removing extra text around username
var item_expr = "//div[@class=\"article\"]"										// xpath for finding items

var vote_div_rule = "width:65px; height:23px; z-index:6"
var star_rule = "display:block; position:relative; left:0px; top:0px; width:13px; height:23px; z-index:5; text-decoration: none;text-indent: -9000px; border-left: 0px; padding: 0px 0px 0px 0px; margin:0px; background-color: transparent"
var vote_div_td_rule = "width:13px; height:23px; border-left: 0px; padding: 0px 0px 0px 0px; margin:0px;"

/** ============================= MAIN CODE ======================================================= **/
add_doVote_script()
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
    var const_url = "v=4&e=" + escape(userid) + "&a=" + escape(agent_id)
    
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
function decorate_blogline_items() {
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

		var div_id = "votediv." + i
		var newDiv = document.createElement('div')
		newDiv.style.width = "65px"
		newDiv.style.height = "23px"
		newDiv.style.display = "inline"
		newDiv.style.float = "right"		
		newDiv.style.padding = "0.06em"		

		newDiv.innerHTML = 
            	"<table onmouseout=\"revert_div_normal('" + div_id + "')\" cellpadding=\"0\" cellspacing=\"0\" style=\"display:inline\" >"
              + "<tr id=\"" + div_id + "\" style=\"background: url(" + get_stars_graphic_src() + "); width:65px; height:23px\" >"
			  +  "<td style=\"" + vote_div_td_rule + "\"><a style=\"" + star_rule + "\" onmouseover=\"change_div_bgxy('" + div_id + "',66*5,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',1)\">1</a></td>"
			  + "<td style=\"" + vote_div_td_rule + "\"><a style=\"" + star_rule + "\" onmouseover=\"change_div_bgxy('" + div_id + "',66*4,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',2)\">2</a></td>"
			  + "<td style=\"" + vote_div_td_rule + "\"><a style=\"" + star_rule + "\" onmouseover=\"change_div_bgxy('" + div_id + "',66*3,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',3)\">3</a></td>"
			  + "<td style=\"" + vote_div_td_rule + "\"><a style=\"" + star_rule + "\" onmouseover=\"change_div_bgxy('" + div_id + "',66*2,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',4)\">4</a></td>"
			  + "<td style=\"" + vote_div_td_rule + "\"><a style=\"" + star_rule + "\" onmouseover=\"change_div_bgxy('" + div_id + "',66*1,0)\" href=\"javascript:doVote('" + div_id + "','" + url + "',5)\">5</a></td>";
             + "</tr></table>"

		var newLi = document.createElement('li')
		newLi.appendChild(newDiv)
		insertPoint.appendChild( newLi )
	}
}

function get_item_url(ele) {
		var urlResult = document.evaluate(itemurl_expr, ele, null, XPathResult.ANY_TYPE, null)		
		var ele = urlResult.iterateNext()
		if (ele == null) return ""		
		return ele.name
}

/** extracts the user id from the page 
 * currently gets it from welcome banner
 */
function get_userid() {
	var result = document.evaluate(username_xpath_expr, document, null, XPathResult.ANY_TYPE,null)
	var ele = result.iterateNext()
	if (ele == null) return 'n/a'
	var txt = ele.innerHTML
	txt = txt.replace(username_cleanup_regexp, '')
	return txt
}

function get_stars_graphic_src()
{
	return 'data:image/gif;base64,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'
}

/**
 * The following are suitable for entering into the firefox location bar for testing out the xpath expressions:
 *
 */

// javascript:alert(document.evaluate('//div[@id="navigation-account-settings"]/ul/li/a', document, null, XPathResult.ANY_TYPE,null).iterateNext().innerHTML.replace(/ .*$/,''))
// javascript:alert(document.evaluate('div[1]/input[@type="checkbox"]', document.evaluate('//div[@class="article"]', document, null, XPathResult.ANY_TYPE, null).iterateNext(), null, XPathResult.ANY_TYPE, null).iterateNext().name)
// javascript:alert(document.evaluate('*/ul[@class="story-tools"]', document.evaluate('//div[@class="article"]', document, null, XPathResult.ANY_TYPE, null).iterateNext(), null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML)
