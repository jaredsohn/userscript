// ==UserScript==
// @name        NextQuestion
// @namespace   stackexchange
// @description Adds next question button to some of stackexchange.com sites
// @include     http://stackoverflow.com*
// @include     http://meta.stackoverflow.com*
// @include		http://askubuntu.com*
// @include		http://superuser.com*
// @include		http://stackapps.com*
// @include		http://stackexchange.com*
// @include		http://stats.stackexchange.com*
// @include		http://serverfault.com*
// @include		http://*.stackexchange.com*
// @include		http://mathoverflow.net*
// @version     7
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// ==/UserScript==

GM_log = function (data) {};

function deserialize(name, def) {
    return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
    GM_setValue(name, uneval(val));
}


function xpath(context, expression, callback) {
    GM_log("Perfroming Xpath: " + expression);
    var i = document.evaluate(expression, context, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
    if (!i)
        throw new Error("Invalid query: "+expression);
    var data;
    while (data = i.iterateNext()) {
        if (!callback(data))
            return;
    }
    GM_log("Xpath: " + expression + " succeeded");
}

var integerRegEx = /question-summary-(\d+)/;
function extractQuestionIds() {
    var ids = [];
    function extractId(node) {
        GM_log("Node " + node.getAttribute("id") + " " + node.getAttribute("class"));
        var result = integerRegEx.exec(node.getAttribute("id"));
        if (result) {
            ids.push(parseInt(result[1]));
            //			GM_log("Digits: " + result[1]);
        }		
        return true;
    }
    xpath(document, './/div[contains(@class, "question-summary") and not(contains(@class, "hidden"))]', extractId);
    return ids;
}

function extractQuestionLinks() {
	var urls = [];
	var ids = [];
	function saveUrl(node) {
		var id = questionIdByUrl(node.href);
		if (ids.indexOf(id) < 0) {
			ids.push(id);
			urls.push(node.href);
		}
		return true;
	}
	xpath(document, './/div[contains(@class, "question-summary") and not(contains(@class, "hidden"))]//a[@class="question-hyperlink"]', saveUrl);
	xpath(document, './/div[@class="result-link"]/span/a', saveUrl);
	xpath(document, './/div[@id="question-list"]/div[contains(@class, "question-container")]//h2/a', saveUrl);
	return urls;
}


var host = location.host;
GM_log("Looking for questions at " + host);
var questionsKey = "questionLinks";
var listLinkKey = "listLink";

function detectQuestions() {
    var questionIds = extractQuestionLinks();
    if (questionIds.length > 0) {
        GM_log("Found questions for "+host+": "+ questionIds.join(", "));
        serialize(questionsKey, questionIds);
		serialize(listLinkKey, location.href);
    }
}

/* Return s a string uniquely identifying question on stackexcahnge sites */
var urlIdRegEx = /:\/\/([\w\.]+)\/.*\/(\d+)\//;
function questionIdByUrl(url) {
		var result = urlIdRegEx.exec(url);
		if (!result)
			return null;
		var host = result[1];
		var question = parseInt(result[2]);
		return ""+host+"/"+question;
}

//We wait for Stackoverflow.com to hide ignored questions
window.addEventListener('load', detectQuestions);

function formLink(url, text) {
	if (!url)
		return null;
	GM_log(text + ": " + url);
	var node = document.createElement("a");
	node.setAttribute("href", url);
	//node.style.textDecoration="underline";
	node.innerHTML = text;
	GM_log(node.outerHTML);
	return node;
}

function decorate(node, before, after) {
	if (before || after)		
		node.parentNode.style.textAlign="center";
		

	if (before) {
		node.insertBefore(before, node.firstChild);
		before.style.cssFloat = "left";
	}

	if (after) {
		node.insertBefore(after, node.firstChild);
		after.style.cssFloat = "right";
	}
	
}


function firstNotNull(first, second) {
	if (first)
		return first;
	return second;
}

function insertLinks(prev, next, back) {
	var toModify = [];
	function callback1(parent) {
		try {
			toModify.push(parent);
		} catch(e){}
		return true;
	}
	xpath(document, '//div[@id="question-header"]/h1', callback1);
	xpath(document, '(//div[@class="subheader"])[1]/h1', callback1);
	for (i in toModify) {
		var orig = toModify[i];
		decorate(orig,
			firstNotNull(formLink(prev, "Previous"), formLink(back, "Back")),
			firstNotNull(formLink(next, "Next"), formLink(back, "Back"))
		);
	}
	if (back)
		document.getElementById("hlogo").getElementsByTagName("a")[0].href=back;
}


var cq = questionIdByUrl(location.href);
if (cq) {
    var questionLinks = deserialize(questionsKey, []);
	var backLink = deserialize(listLinkKey, null);
	if (questionLinks) {
		GM_log("Cached questions: "+ questionLinks.join(", "));
		GM_log("Current question: "+ cq);
		var position = 0; 
		while (position < questionLinks.length && questionIdByUrl(questionLinks[position]) != cq) 
			position++;
		if (position < questionLinks.length) {
			var next = null;
			var prev = null;
			if (position >= 0 && position + 1 < questionLinks.length)
				next = questionLinks[position + 1];
			if (position >= 1)
				prev = questionLinks[position - 1];
			insertLinks(prev, next, backLink);
		}
	}
}

