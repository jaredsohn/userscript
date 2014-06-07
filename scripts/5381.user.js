// ==UserScript==
// @name          Outbrain for Newsgator
// @description	  Adds graphic stars after each item; clicking on a star submits the vote to a remote page
// @include       http://www.newsgator.com/ngs/subscriber/WebEd2.aspx*
// @author        Noam Solomon
// @date          August 28, 2006
// @version       0.2
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)
// 
// Changes:
// 0.2 -- extract href of article from u parameter of redirect url

/** ============================= CONFIGURATIONS ======================================================= **/

var recorderUrl = "http://204.193.155.59/cgi-bin/outbrain_vote.cgi"				// uri which records the vote
var siteid = 0																	// used for finding item divs.  maybe doesn't ever change?
var agent_id = "ng greasemonkey"												// string identifying this script for logging

var username_xpath_expr = "//div[@id=\"header-wrapper\"]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/span[1]"	// xpath for extracting div containing username
var item_expr = "//div[@class=\"entry\"]"										// xpath for finding items
var itemurl_expr = "div[1]/h1/a"												// xpath for extracting url for item
var itemstarsdiv_expr = "div[@class=\"entry-footer\"]/ul[@class=\"star-rating\"]/li"	// xpath for extracting the stars div to be modified
var username_cleanup_regexp = / .*$/gi											// regexp for removing extra text around username

/** ============================= MAIN CODE ======================================================= **/
add_doVote_script()
enhance_star_rating_scripts();

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
    //alert('userid: ' + userid)
    var const_url = "v=5&e=" + escape(userid) + "&a=" + escape(agent_id)
    
	script = document.createElement('script')	
	
    script.innerHTML = 
	  "function doVote(url,numStars) {\n"
	+ "  img = new Image()\n"
	+ "  img.src = \"" + recorderUrl + "?s=\" + numStars + \"&u=\" + escape(url) + \"&" + const_url + "&r=\" + (Math.random()+\"\").substring(3,12)\n"
 	+ "}"

	//alert(script.innerHTML)
	
	document.getElementsByTagName('head').item(0).appendChild(script)
}


/** Modifies the onclick calls of the existing star rating UL -- adds "doVote()"
 */
function enhance_star_rating_scripts() {
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
		var nstar = 0
		var star_item
		var result = document.evaluate(itemstarsdiv_expr, ele, null, XPathResult.ANY_TYPE,null)
		var staritems = Array()
		while ( star_item = result.iterateNext() ) {
			if (star_item.innerHTML.indexOf('return') > 0) {
				staritems[nstar++] = star_item
			}			
		}
		for (var j=0; j<staritems.length; j++) {
			star_item = staritems[j]
			star_item.innerHTML = star_item.innerHTML.replace(";return", ";doVote('" + url + "'," + (j+1) + ");return")		
		}		
	}
}

function get_item_url(ele) {
		var urlResult = document.evaluate(itemurl_expr, ele, null, XPathResult.ANY_TYPE, null)		
		var ele = urlResult.iterateNext()
		if (ele == null) return ""		
		var href = ele.href
		// extract the url from the u parameter of the redirect url
		if (href.indexOf('http://services.newsgator.com/redirect/attn.ashx?') == 0)
			href = unescape(new String(href).replace(/^.*&u=/,''))
		return href
		
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

/**
 * The following are suitable for entering into the firefox location bar for testing out the xpath expressions:
 *
 */

// tests user id extraction
// javascript:alert(document.evaluate('//div[@id="header-wrapper"]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/span[1]', document, null, XPathResult.ANY_TYPE,null).iterateNext().innerHTML.replace(/ .*$/,''))

// tests item url extraction
// javascript:alert(document.evaluate('div[1]/h1/a', document.evaluate('//div[@class="entry"]', document, null, XPathResult.ANY_TYPE, null).iterateNext(), null, XPathResult.ANY_TYPE, null).iterateNext().href)

// test for stars extraction
// javascript:alert(document.evaluate('div[@class="entry-footer"]/ul[@class="star-rating"]/li', document.evaluate('//div[@class="entry"]', document, null, XPathResult.ANY_TYPE, null).iterateNext(), null, XPathResult.ANY_TYPE, null).iterateNext())