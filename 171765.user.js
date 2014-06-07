// ==UserScript==
// @name       BGG Tweaks
// @namespace  http://curtc.org/
// @version    0.16
// @description  Various tweaks to improve BGG. 
// @include      http://boardgamegeek.com/*
// @include      http://www.boardgamegeek.com/*
// @include      http://rpggeek.com/*
// @include      http://www.rpggeek.com/*
// @include      http://videogamegeek.com/*
// @include      http://www.videogamegeek.com/*
// busted updateurl    http://userscripts.org/scripts/source/171765.meta.js
// busted downloadURL  
// @copyright  2013+, Curt Carpenter
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
{
    console.log('In frame');
    return;
}
else
    console.log ("Not in frame. Continuing on...")

console.log("BGG Tweaks loading...")

var mod = 'curtc.RatingsEnhancer.'
var updateIfOlderThan = new Date()
updateIfOlderThan.setDate(updateIfOlderThan.getDate() - 7)
var rows
var iUser = 1

// Muck with the sytle
// var css = document.createElement("style");
// css.type = "text/css";
// css.innerHTML = ".ratingdiff { color: red }";
// document.body.appendChild(css);

function AddRatingsOffsets() {
	// Get the table
	var table = document.getElementsByClassName('forum_table', document, null, XPathResult.ANY_TYPE, null)[0]
	// Get the users/ratings on the page
	rows = table.rows
	nextUser()
}

function nextUser() {
	var row = rows[iUser]
	// Find "rating" class, then add sibling after that
	var divAfter = row.getElementsByClassName("rating")[0]
	var divNew = document.createElement('div')
	divNew.setAttribute("class", "sf ratingdiff")
	divAfter.parentNode.insertBefore(divNew, divAfter.nextSibling); // insert divNew after divAfter
	divNew.textContent = '? (?)';
	var user = {}
	user.name = row.getElementsByTagName('a')[0].textContent
	
	var userStr = localStorage[mod + user.name]
	var user2 = (userStr === undefined) ? null : JSON.parse(userStr)
	if (user2) {
		user = user2
		user.updated = new Date(user.updated) // convert back from UTC to date
	}
	
	user.rating = row.getElementsByClassName("rating")[0].textContent - 0

	if (user.updated && user.updated > updateIfOlderThan) // yay, in cache!
			UpdateUser(user)
	else
		GetUserRatings2(user, function(user){
			UpdateUser(user)
			user.updated = Date.now() // convert from date to utc, so can successfluly serialize
			delete user.rating
			localStorage[mod + user.name] = JSON.stringify(user)
		})

}

function UpdateUser(user) {
	// Have to find user again
	var row = rows[iUser]
	var div = row.getElementsByClassName("ratingdiff")[0] // this was "? (?)", so just replace it
	var color = RGB2HTML(100, 100, 100)

	if (user.ok) {
		var diff = user.rating ? Math.round((user.rating - user.mean) * 100) / 100 : ''
		var range = 2 // scale color up to <range> higher or lower than the user's mean
		if (diff) {
			var percent = (Math.max(Math.min(range, diff), -range) + range) / (range * 2)
			var r = Math.round(255 * (1 - percent))
			var g = Math.round(230 * percent)
			var b = 0
			color = RGB2HTML(r, g, b)
		}

		div.style.fontSize = (8 + Math.sqrt(user.count) / 5) + "px"
		div.textContent = (user.rating && diff >= 0 ? '+' : '') + (diff) + ' (' + user.count + ')'
	}
	else
		div.textContent = ":-("

	div.style.color = color
	div.style.fontWeight = "bolder"

	iUser++
	if (iUser < rows.length) {
		nextUser()
	}
}

function GetUserRatings2(user, f) {
	var oReq = new XMLHttpRequest();
	oReq.open("get", "/user/"+ user.name.replace(" ", "+")); 
	oReq.onload = function() {
		var doc = document.implementation.createHTMLDocument("profile");
		user.ok = oReq.responseText != null
		if (user.ok) {
			doc.documentElement.innerHTML = oReq.responseText;
			user.count = doc.evaluate('//*[@id="main_content"]/div/div/table/tbody/tr/td[2]/div/table[6]/tbody/tr[2]/td[2]/a', doc, null, XPathResult.ANY_TYPE, null).iterateNext().textContent - 0
			user.mean = doc.evaluate('//*[@id="main_content"]/div/div/table/tbody/tr/td[2]/div/table[6]/tbody/tr[3]/td[2]', doc, null, XPathResult.ANY_TYPE, null).iterateNext().textContent - 0
		}
		else 
			console.log("*** Could not load stats for: " + user.name + "***")
		
		user.updated = new Date()
		f(user)
	}
	oReq.send();
}

function GetUserRatings(user, f) {
	// Go load all his ratings, scrape them, and build arithmetic mean
	var oReq = new XMLHttpRequest();
	oReq.open("get", "http://boardgamegeek.com/xmlapi2/collection?username="+ user.name.replace(" ", "+") + "&stats=1"); 
	oReq.onload = function() {
		var xmlCol = oReq.responseXML
		user.ok = xmlCol != null
		if (user.ok) {
			var items = xmlCol.evaluate('//items', xmlCol, null, XPathResult.ANY_TYPE, null).iterateNext().getChildren()
			ParseRatings(user, items)
		}
		else 
			console.log("*** Could not load stats for: " + user.name + "***")
		
		user.updated = new Date()
		f(user)
	}
	oReq.send();
}

function ParseRatings(user, items) {
	var ratings = []
	var sum = 0
	var count = 0
	for (var i = 0, n = items.length; i < n; i++) {
    	rating = {}
    	var item = items[i]
    	var gameid = item.getAttribute("objectid") - 0 // string to number
		var rating = item.getElement("rating").getAttribute("value") - 0 || 0 // "N/A" --> 0
		var title = item.getElement("name").textContent

    	if (rating > 0) {
    		sum += rating
    		count++
    	}
    }
    user.count = count
    user.mean = sum / count
	console.log(user.name + ": " + user.mean + ' (' + user.count + ')')
} 

function RGB2HTML(red, green, blue)
{
    var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    return '#'+decColor.toString(16).substr(1);
}

function nukeUselessCrap() {
	// w/o left col: //*[@id="maincontent"]/table[2]/tbody/tr/td   /table/tbody/tr/td[2]
	// w/  left col: //*[@id="maincontent"]/table[2]/tbody/tr/td[2]/table/tbody/tr/td[2]
	var dfpFrames = document.querySelectorAll('*[id^="dfp"]');
	for (var c = dfpFrames.length, i = 0; i < c; i++)
		dfpFrames[i].parentElement.removeChild(dfpFrames[i])

	var rightCol = document.evaluate('//*[@id="maincontent"]/table[2]/tbody/tr/td[last()]/table/tbody/tr/td[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext()
	if (rightCol) rightCol.parentElement.removeChild(rightCol)

	// var leftCol = document.evaluate('//*[@id="maincontent"]/table[2]/tbody/tr/td[1]', document, null, XPathResult.ANY_TYPE, null).iterateNext()
	// leftCol.parentElement.removeChild(leftCol)

	var header = document.getElementsByClassName("header")[0]
	if (header && document.URL.contains("forum"))
		header.parentElement.removeChild(header)

}

function fixSubscriptionLinks() {
	var a = document.evaluate('//*[@id="maincontent"]/table[1]/tbody/tr/td[2]/div/table/tbody/tr[2]/td[1]/a', document, null, XPathResult.ANY_TYPE, null).iterateNext()
	a.setAttribute('href', '/subscriptions/next')

	a = document.evaluate('//*[@id="GSUB_numevents_main"]/a', document, null, XPathResult.ANY_TYPE, null).iterateNext()
	a.setAttribute('href', '/subscriptions/next')
}

function copySubscriptionAndRecommendationLinks() {
	var controls = document.evaluate('//*[@id="maincontent"]/table[1]/tbody/tr/td[2]/div', document, null, XPathResult.ANY_TYPE, null).iterateNext().clone(true)
	// remove the email link
	var email = controls.children[0].children[0]
	email.removeChild(email.children[0]) // there has to be a better way, but this works
	
	// nuke both usrename and logout
	controls.removeChild(controls.children[1])
	controls.removeChild(controls.children[1])
	controls.setAttribute("style", "height: auto; margin-bottom: 20px; display:inline-block;")

	var table = document.evaluate('//*[@id="container"]/table', document, null, XPathResult.ANY_TYPE, null).iterateNext()
	table.removeAttribute("style")
	var bottom = document.evaluate('//*[@id="container"]/table/tbody/tr[1]/td', document, null, XPathResult.ANY_TYPE, null).iterateNext()
	bottom.setAttribute("style", "text-align: center;")
	bottom.appendChild(controls)

	var recs = document.evaluate('//*[@class="recommend_block"]', document, null, XPathResult.ANY_TYPE, null).iterateNext()
	if (recs) {
		recs = recs.clone(true)
		recs.setAttribute("style", "height: auto; vertical-align:top; margin-left:5px; display:inline-block;")
		bottom.appendChild(recs)
	}

}

function applyBodyWidth() {
	var bodies = document.evaluate('//textarea[@id="body"]', document, null, XPathResult.ANY_TYPE, null)
	if (bodies === undefined)
		return

	var body
	while (body = bodies.iterateNext()) {
		if (body.style.width != "100%") {
			body.style.width = "100%"

		}
	}
}

function addOOC() {
	var drops = document.getElementsByName("geek_link_select_1")
	if (drops.length == 0)
		return

	var strOOC = "OOC"
	var iOOC = 3
	for (var i = drops.length - 1; i >= 0; i--) {
		var drop = drops[i]
		if (drop.getSiblings()[iOOC].getAttribute("value") != strOOC) {
			var btn = drop.getSiblings()[0] // whatever the first button is (which happens to be Q)
			var btn2 = btn.clone()
			btn2.value = strOOC
			btn2.onmouseover = function() {overlib('Out of character', WRAP)}
			btn2.onclick = function() {wrapSelection( document.MESSAGEFORM.body,'[ooc]','[/ooc]')}
			btn.parentElement.insertBefore(btn2 , drop.getSiblings()[iOOC])
		}
	}
}

function perComposeFixup() {
	addOOC()
	applyBodyWidth()
}

function fixupMessageCompose() {
	perComposeFixup() // try the whole don once
	var observer = new MutationObserver(function(mutations){
		// then try the whole doc again anytime content is added
		perComposeFixup()
	})

	var config = { subtree: true, attributes: false, childList: true, characterData: false };
	observer.observe(document, config)
}

function instaLashOrig() {
	re = /thread\/[0-9]+/
	if (!re.test(document.URL))
		return

	var lashThreadUrl = "http://boardgamegeek.com/article/reply/9486091"
	if (document.URL == lashThreadUrl) {
		strPost = localStorage[mod + "LASH"]
		if (strPost != undefined) {
			var testArea = document.evaluate('//*[@id="body"]', document, null, XPathResult.ANY_TYPE, null).iterateNext()
			testArea.value = localStorage[mod + "LASH"]
			delete localStorage[mod + "LASH"]
			form = document.evaluate('//*[@id="MESSAGEFORM"]').iterateNext()
			form.submit()
		}
		return
	}
	else if (!re.test(document.URL))
		return


	var redx = document.evaluate('//img[contains(concat(" ", normalize-space(@class), " "), " i_redsquarex ")]', document, null, XPathResult.ANY_TYPE, null).iterateNext()
	var imgNew = document.createElement('img')
	imgNew.setAttribute("alt", "One click LASH reporting")
	imgNew.setAttribute("src", "http://cf.geekdo-static.com/mbs/mb_25041_0.png")
	imgNew.style.marginLeft = "10px"
	redx.parentElement.insertBefore(imgNew, redx.nextSibling); // insert imgNew after redx
	imgNew.onclick = function(event) {
		var name = document.evaluate('//*[contains(concat(" ", normalize-space(@class), " "), " avatarblock ")]/div[2]/a', document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML
		re = /[0-9]+/ // regex
		id = 1 * re.exec(document.URL) // thread
		var strPost = name + '\n[username=' + name + ']\n[thread=' + id + '][/thread]'
		localStorage[mod + "LASH"] = strPost
		location.href = lashThreadUrl
	}

}


function instaLash() {
	re = /thread\/[0-9]+/
	if (!re.test(document.URL))
		return

	var redx = document.evaluate('//img[contains(concat(" ", normalize-space(@class), " "), " i_redsquarex ")]', document, null, XPathResult.ANY_TYPE, null).iterateNext()
	var imgNew = document.createElement('img')
	imgNew.setAttribute("alt", "One click LASH reporting")
	imgNew.setAttribute("src", "http://cf.geekdo-static.com/mbs/mb_25041_0.png")
	imgNew.style.marginLeft = "10px"
	redx.parentElement.insertBefore(imgNew, redx.nextSibling); // insert imgNew after redx
	imgNew.onclick = function(event) {
		var name = document.evaluate('//*[contains(concat(" ", normalize-space(@class), " "), " avatarblock ")]/div[2]/a', document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML
		re = /[0-9]+/ // regex
		id = 1 * re.exec(document.URL) // thread
		var strPost = '\n[username=' + name + ']\n[thread=' + id + '][/thread]'

		var threadid = 821150 
		var replyid = 9486091
		if (false) { // true = test folder
			threadid = 1008026
			replyid = 12881657
		}
		var form = new FormData()
		form.append("action", "save")
		form.append("forumid", "")
		form.append("articleid", "")
		form.append("objecttype", "region")
		form.append("objectid", "1")
		form.append("replytoid", replyid) 
		form.append("geek_link_select_1", "")
		form.append("sizesel", 10)
		form.append("subject", "One-click LASHing for: " + name)
		form.append("body", strPost)
		var oReq = new XMLHttpRequest();
		oReq.open("POST", "/article/save", false); // sync
		oReq.send(form);
		location.href = "/thread/" + threadid + "/new"
	}

}

function geeklistNext() {
	/* for geeklists, find all subscribed elements, add a next subscription button on the element which takes you to next subscribed element on the page if any, or to next subscription

	Subscribed elements have class = subbed_selected. (OR subbed???)

	Next button <a>: //*[@id="maincontent"]/table[1]/tbody/tr/td[2]/div/table/tbody/tr[3]/td/a
	clone it for each sub'd element. Change:
		span[0]: if next sub'd item is on same page, change "Next:" to "Next (on page):"
		href: to next sub'd element (all except last), or http://boardgamegeek.com/subscriptions/next (last)

	Article (data-objecttype="listitem"): put the next button right of Quote link
	Items: (): stick it right of "Item Command Rolls" link
	In both cases get ul class="commands", add li as last item

	Do NOT link to the next article in the SAME item! (same parent element) The LAST link in the same item (including bottom comments) should still link to the next thing
	Do NOT link to articles WITHIN the sub'd item

	Navigate to next link on page:
		Item: parent.id
		Article: previousSibling.name


	Plan B:
		Iterate through all items (class="mb5" and through all comments of all items, from back to front.
		On very last subbed element, insert link to next (off page)
		Keep track of "next subbed", which is always current item if subbed.
		When iterating through non-subbed comments/items, "next subbed" doesn't change. 
		As soo as you transition from non-subbed to subbed, that subbed element, gets a next link to "next subbed" element, thus skipping the non-subbed items
		The final subbed item (top-most) is what location.href gets set to
	*/

	var linkNext = document.evaluate('//*[@id="maincontent"]/table[1]/tbody/tr/td[2]/div/table/tbody/tr[3]/td/a', document, null, XPathResult.ANY_TYPE, null).iterateNext()

	re = /geeklist\/[0-9]+/
	if (!re.test(document.URL))
		return

	var subs = []
	var iSub = document.evaluate('//div[contains(@class, "subbed")]', document, null, XPathResult.ANY_TYPE, null)
	var sub
	while (sub = iSub.iterateNext())
		subs.push(sub)

	var parentPrev = null
	// loop over all subs from bottom up. When you get to an item with the same parent as the previous, ignore it
	var csubs = subs.length
	for (var i = csubs - 1; i >= 0; i--) {
		sub = subs[i]
		var parent = sub.parentElement
		var isItem = sub.hasAttribute("data-objecttype")
		var parentItem = isItem ? null : sub.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling
		if ((parent === parentPrev) && !isItem)
			// || (!isItem && (parentItem.classList.contains("subbed_selected") || parentItem.classList.contains("subbed"))))
			continue

		var newNext = linkNext.clone()
		var inext = i + 1
		if (inext < csubs)
		{
			// link to the NEXT subbed item
			var nextItem = subs[inext]
			isItem = nextItem.hasAttribute("data-objecttype")
			newNext.href ="#" + (isItem ? nextItem.parentElement.getAttribute("id") : nextItem.previousElementSibling.getAttribute("name"))
			newNext.children[0].textContent = "Next (on page):"
		}

		var cmds = sub.querySelectorAll('ul.commands')[0]

		var liDivider = cmds.children[1].clone()
		var liNext = document.createElement("li")
		liNext.insertBefore(newNext, null)
		cmds.insertBefore(liDivider, null)
		cmds.insertBefore(liNext, null)
		parentPrev = parent
	}

	if (csubs) {
		var first = subs[0]
		isItem = first.hasAttribute("data-objecttype")
		window.location.href = "#" + (isItem ? first.parentElement.getAttribute("id") : first.previousElementSibling.getAttribute("name"))
	}
}

//debugger
window.gln = geeklistNext
nukeUselessCrap()
geeklistNext()
fixupMessageCompose()
instaLash()
copySubscriptionAndRecommendationLinks()
//fixSubscriptionLinks()
if (document.URL.contains("items") || document.URL.contains("analyze"))
	AddRatingsOffsets();

console.log("BGG Tweaks done loading...")