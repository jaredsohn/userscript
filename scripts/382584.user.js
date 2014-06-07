// ==UserScript==
// @name			Mega.co.nz Link Checker
// @description		Automatically checks from mega.co.nz & oboom.com
// @details			Best if Used with Customized W.A.R. Links Checker. 
// @details			For Firefox, Chrome, Safari. 
// @version			1.0.0.2
// @license			GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @author			http://userscripts.org/users/510590
// @icon            http://eu.static.mega.co.nz/images/logo.png
// @include			http://*
// @include			https://*
// @include			file:///*
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_xmlhttpRequest
// @grant			GM_log
// @grant			GM_addStyle
// @grant			GM_registerMenuCommand
// @grant			GM_getResourceText
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require			https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js
// @resource		jQueryUICSS https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/smoothness/jquery-ui.css
// @downloadURL https://userscripts.org/scripts/source/382584.user.js
// @updateURL https://userscripts.org/scripts/source/382584.meta.js
// ==/UserScript==

//checks links for mega.co.nz & oboom.com
//separate alternative domains with "|" char (first name is considered being main)
var allHostNames = ["mega.co.nz"];

try {
	//iframes excluded
	if (window.top != window.self) {
		return;
	}
	
	//allHostNames sites excluded
	if (window.location.href.match("https?:\/\/(www\.)?[\w\.-]*(?:" + allHostNames.join("|").replace(/\./g, "\\.").replace(/-/g, "\\-") + ")")) {
		return;
	}
} catch (e) {
	return;
}

//separate alternative domains with "|" char (first name is considered being main)
var allContainerNames = [];

//separate alternative domains with "|" char (first name is considered being main)
var allObsoleteNames = [];

var wbbCensoredHosts = [];

String.prototype.contains = function(searchString) {
	if (searchString.constructor === RegExp) {
		if (searchString.test(this)) return true;
		else return false;

	} else if (searchString.constructor === String) {
		function replaceStr(string) {
			return string.replace(new RegExp(RAND_STRING, 'g'), '|');
		}

		searchString = searchString.replace(/\\\|/g, RAND_STRING);
		var searchArray = searchString.split('|');

		if (searchArray.length > 1) {
			var found = false;
			var i = searchArray.length;

			while (i--) {
				if (this.indexOf(replaceStr(searchArray[i])) > -1) {
					found = true;
					break;
				}
			}

			return found;

		} else {
			if (this.indexOf(replaceStr(searchString)) > -1) return true;
			else return false;
		}
	} else {
		throw new TypeError('String.contains: Input is not valid, string or regular expression required, ' + searchString.constructor.name + ' given.');
	}
}

var firstRun = JSON.parse(localStorage.getItem("WarBB_First_Run"));
if (firstRun == null) firstRun = true;

var chromeBrowser = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

var preferences = JSON.parse(localStorage.getItem("WarBB_Preferences"));

allHostNames.sort();
allContainerNames.sort();
allObsoleteNames.sort();

var RAND_STRING = "8QyvpOSsRG3QWq";
var RAND_INT = Math.floor(Math.random()*10000);
var RAND_INT2 = Math.floor(Math.random()*10000);

var WBB_MODE = false;
if (window.location.host.contains('warez-bb.org')) {
	WBB_MODE = true;
}

var ANONYMIZE_SERVICE;
var ANONYMIZERS = ['http://www.blankrefer.com/?', 'http://hidemyass.com/?', 'http://anonym.to/?', 'http://refhide.com/?', 'http://nullrefer.com/?', 'http://anonymz.com/?'];
//var EB_LOGIN = ["dj.black.ninja@gmail.com", "~7&K^q^E8.*fHc#fKK5z"];

var TOOLTIP_MAXWIDTH = 600; //in pixels

//global settings start
var Do_not_linkify_DL_links, Display_tooltip_info, Last_Update_Check, Allow_spaces_in_DL_links, Display_full_links_in_link_containers, Show_Update_Notification;
var Processbox_Pos_X, Processbox_Pos_Y, Progressbox_Scaling;

var cLinksTotal = 0;
var cLinksDead = 0;
var cLinksAlive = 0;
var cLinksUnava = 0;
var cLinksUnknown = 0;
var cLinksProcessed = 0;

var filehostsAlive = "";
var filehostsDead = "";
var filehostsUnava = "";
var filehostsUnknown = "";

var intervalId; //for updateProgress()

//icon resources
var alive_link_png	= 'data:image/png;base64,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';
var adead_link_png	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIkAAACGCAYAAADpcqkcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACGtJREFUeNrsnd9R+zgQxxUP75frIL8KCC/3eCQVECogqQCoIKQCoIKEChIqwPwe74XQga+CSwc5iWzmcvwSW7a10q60O6Mxw0AiSx9/d/Vv3dlut0pMrMwyaQIxgURMIBHDt7Njv+x0OlHe7D9//tHTl8Ni7FyXbsW/bnT5hJ8LKOvff/61ia2NjsWonaO/jAASDURfX/oAgbkOEL7GQLKGYiDKNTiFQEJbJQwIV3DtBqqKgSTX5RWg2Qgk4cEY6XIDakHRVgDMigMw0UCi4RiDYoyYCd5ClxcNSy6Q4IBh3MedLrcBXYlLlzSjqC4sIQGXMtVlHOGAywDyrMsTFVhYQQLKMQX1iN3IwMIGEg3IQyRupZEb0qAsBJLTcJih61z9N9GVqpnA9l7DshZI/u9a5gxHK9hmVOUheUhAPZYJuhZbM2oy8aUqx3gIusCnAXnUlzcBpNTMJOGHbqtgAXwQJYFh7VLRnSWlaitQFbQREAklgYW3DwGkkZmY7Q0eMm+WeQZkDICIe2nvfvrRQQI+dS597MS6oCjjaCDRN2PgeJS+dQ7K3AcomSdAxtKnaIYOSiaACCjBIIE5EAEkAlBQ5kmgshKkhrFhm01NXuZJNCAjASSoLV0PjzPHgPQFEBKjniUsmtKCBColC3U0rAd9QU5JZB8ILRvA5i0akMBsquwFoWdT2IoRdnQDcYgs99O1QpcL25VjrNHNXAAhH59Mg7kb8Hmy5E/f7tq4nbMWgBhCbz3coNm29wJXBVBeMo6BFrq8gxv4CjDV7pgqdtBvFP+H15hEQ7JE7ijTiJNTs4cHczJclKx0VxnMUj8iu+7KjdXONkKDdL0hq8fQJthisoi40PcyITAI2EAQW/gIXKeIDWpu5No2GofGX3AHBO7FPBzXiHXpNum72pCALA4Qb+S5biIYwqBYA3JwL8a95oh1GtfdI5sRUxHVtLMJglIbkMMHBbluUzRIYIUXMwov2qSTIgRKG0AUspLUVpO6SoI95C3afgABUNoCojxlFpg6hwQi7wFyxZ2oVEBQWgMCbe1jBntk+z0ZIRX5gsTVwaMAoDgBBGzgob5d26mDrAbZvuYinH2PR1BcAmLsylNb3zqDRPmdAr91KbceQHEKCExU+nogezZbHTOXxDmUwTcmoLgGxHTYUvm1m9aQQIzge32kzwAUDEBC7MsZuVCSUKutlEGJBRArl2MDyWXAOQeKoMQEiJXLoawkFEGJEZDKIXdmEWlTMCxQcgFk175lbZu1IYw7KGq3LL9OHJDKvq6C5FLRMqegwBrJsAKUFAAp7WtOShIClFQAUWXTHFnFDVE1H6CkBEhjd9NTtA0TlNQAKRWGsybyQxCUoYs9GPAZFwgNz+WEY++Y2y1TknPFwzBGPSkCclIYyiDhdHSTHChMz0j/VhcSbsc3yYDC+BB91EpCBpQYsyzE+Br6YKBEAIi9khBas2EDSiQK0k1FSbyDEnsin5gh8QJKCpmeYocEFZRUUoGlAMkelDHC596oBFKBpQKJWYt5cv2h+jPvFe20FwJJDUAmWB/OID+KQBISkFRAOQXJRgARUEohCfH6c86ARARKkYq7CQJIJKDUhqQQQMT1xAYJCUCYg/IeMySkAIlNUcog+TtFQEwWBWb5UVxaXheSPEFAvl7xrvjkR5HANQAg+8W6foKgbE6lR81Kbsr8wyZBQPaWGijrJjEJVZfj8+BUSqC8N4XkPWFAUgMlj0FJQh69jB6UsreSZxX/uCYSl1A4mxszKHnTeZK9rQSQ6EF5bQvJqwASPSirtpDkAkjUoKyrXh+TWVR+E6DyHPKDYIHiey/PS9Uf2O4n8elyCkYJZDCOaww9DxZWTiDRnWY+qPBU6RkTQFBA8azcK5s3ldXZmfbio9a60gtGgGApii/ltvqeOpD4oHvNEBDnoJRNbDl26wunkIAsYYOyYQoIZoyCZdZvDK27EXrmoZG5AuIMFFevmKt4GBcokICaYM7Adpvmj6WWq70lKANsFamTrbLJkYp75Bu4ZQ6IC1CmyCpS61x0bUg8xCbjOpmWGKTirgWK/ts7hZto+bluztumh7NmCnfCZ2njdpjkB7EGRf/NWF8ekUc0D3X/qREkoCbPiDdjGvRDN9rDscY1v4MnjksCmT7cz/hUoKqLeUHjHLkejUKFzna7/fWXnY6NLH51pPKTg97MG+x3yZ1DYMc1eYx5wMx80KfaJdcdKD85c3P9cA+r/ugoD00hAVAG8DSL0bavnPk2U/DHeGh1YBxmBp+kD8jbzAYQ14Hr9yC2kH4ga3nbVGCtIYHh1ET6gqybad03TvKTgNuZSZ+Qs0kbN+MUEgDFjL9X0i+k4hAn/eE601GI7Xdiv9qqyaSZF0ggPrlWcSTm42pr1zGi85xp4AOHAkqwQNXJ+whRIQFQ1qAoYswBQYPkYMQjQ2O/gKDEg6gpOmEPpYDCGBB0SA5AkWCWKSBeIAFQVhLMooxiLnxk7/aWERpuZv+ad7H2gAxdzKbaWKutAk0M9qGYDTYD6etGhpqz1vl+kpawmG16d9LnteKPe1cnHFlAAqAMQFW6wkCle5n4iD+cbzpyEKfk+vJDycJgmT35GMGQiklKVGWkdhuBRVV2VoB65D6/lJy7ORHUmlhlnHjs8exyFTcqSA5g6QMsqY2ATFA68zW0ZQ3Jt8B2mgAsOcCRh64IO0gSgGUFriWnUiG2kHyD5YZ5zLIBOIK6lWgh+RbgjgGYPhM4jFqYlGIrjD0fAkl1kGuGz1cEgTFgvCrLBHYCiR9gehC3XMK157kKaygGjJyyYiQLyQlo+lDOAZq+Q5UwEHzCz2uOUCQPSUVMs4elZ6E4BRRFaSQSFBIxsUPLpAnEBBKx1vavAAMAq8HH/OQ5cR4AAAAASUVORK5CYII=';
var unava_link_png	= 'data:image/png;base64,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';
var unknown_link_png = 'data:img/png;base64,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';
var processing_link_gif = 'data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA';
var WarBBLogo = "data:image/png;base64,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";

//initiate notification box
$("body").append("<b class='WarBBInfoBox' style='position: fixed; top: 2px; padding-left:30px; padding-right: 5px; display:none; background: white url(" + WarBBLogo + ") no-repeat 0% 50%; background-size:28px; font-size: 20px; border:1px solid #4DD9FF; z-index:3;'></b>");

//global settings end

function linkify(filterId) { //code from http://userscripts.org/scripts/review/2254 Linkify ting	
	if (!filterId) {
		var regexy = "", ikkeTilladteTags = [];

		if (Allow_spaces_in_DL_links) {
			regexy = "(?:http:\/\/.+?\\?)?(?:https?:\/\/)?(?:[\\w\\.\\-]*[\\w\\-]+\\.(?:com?\\.\\w{2}|in\\.ua|uk\\.com|\\w{2,4})(?::\\d{2,5})?\/|(?:www\\.)?\\w{6,}\\.1fichier\\.com)[\\w\\–\\-\\.+$!*\\/\\(\\)\\[\\]\',~%?:@#&=\\\\\\—;\\u0020…×Ã\\_\\u0080-\\u03FF’‘\\|]*";
		} else {
			regexy = "(?:http:\/\/.+?\\?)?(?:https?:\/\/)?(?:[\\w\\.\\-]*[\\w\\-]+\\.(?:com?\\.\\w{2}|in\\.ua|uk\\.com|\\w{2,4})(?::\\d{2,5})?\/|(?:www\\.)?\\w{6,}\\.1fichier\\.com)[\\w\\–\\-\\.+$!*\\/()\\[\\]\',~%?:@#&=\\\\\\—;…×Ã\\_\\u0080-\\u03FF’‘\\|]*";
		}

		if (Do_not_linkify_DL_links) {
			ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea', 'span']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links
		} else {
			ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links
		}

		var regex = new RegExp(regexy, "g");
		var censors = [	];

		var censorRegex = new RegExp("(?:http:\/\/.+?\\?)?(?:https?:\/\/)?[\\w\\.\\-]*~\\s?(?:" + censors.join("|") +  ")\\.*\\s?~[\\w\\–\\-\\.+$!*\\/()\\[\\]\',~%?:@#&=\\\\\\—;…×Ã\\_\\u0080-\\u03FF’‘]*", "i");
		var ignoreImage = /(?:\.png|\.jpg|\.gif|\.jpeg|\.bmp)$/i, textNode, muligtLink;

		var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") + ") and contains(.,'/')]";
		var textNodes = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var i = textNodes.snapshotLength;
	
		while (i--) {
			textNode = textNodes.snapshotItem(i);
			muligtLink = textNode.nodeValue; //all links on page

			var myArray = null;
			if (regex.test(muligtLink)) {
				var span = document.createElement('span'), lastLastIndex = 0, myArray = null;
				regex.lastIndex = 0;

				while (myArray = regex.exec(muligtLink)) {
					var link = $.trim(myArray[0]); //removes whitespace from beginning and end of link (can sometimes cause issues when spaces are still picked up by the regex even when Allow_spaces_in_DL_links is false)
				
					var hostName = gimmeHostName2(link);
					var hostNameSafe = hostName.replace(/\./g, "_dot_").replace(/\-/g, "_dash_").toLowerCase();
					if (hostName == gimmeHostName(window.location.hostname) || !hostsIDs[hostNameSafe] || ignoreImage.test(link.replace(/\[\/img\]$/, ""))) {
						continue;
					}
				
					span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));

					var $a = $("<a>" + link + "</a>")
				
					if (!link.match(/https?:\/\//)) {
						link = 'http://' + link;
					}

					$a.attr("href", link.replace(/\[\/hide:\w+\]/,"")).appendTo(span);
				
					lastLastIndex = regex.lastIndex;
				}

				span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
				textNode.parentNode.replaceChild(span, textNode);
			} else if (censorRegex.test(muligtLink)) {
				if (textNode.parentNode.className == "obsolete_link") continue;
				var censoredLink = muligtLink.match(censorRegex)[0];
				if (ignoreImage.test(censoredLink)) continue;
				var span = document.createElement('span');
					span.innerHTML = censoredLink;
					span.className = "obsolete_link";
					$(span).attr('warlc_error', "Cause of error: <b>Censored link.</b>");
					span.addEventListener("mouseover", displayTooltipError, false);
				if (filehostsDead.search("censored links") == -1) filehostsDead += "censored links,";	
				cLinksTotal++; cLinksProcessed++; cLinksDead++;
				textNode.parentNode.replaceChild(span, textNode);
			}
		}
	}
	
	var jQ;
	filterId ? jQ = "a." + filterId : jQ = "a";
	var as = $(jQ);
	var i = as.length;
	var currA, hostNameSafe, hostID;
	while(i--) {
		currA = as[i];
		if (currA.href && /^https?:\/\//.test(currA.href) && gimmeHostName2(currA.href) != -1 && gimmeHostName2(currA.href) != gimmeHostName(window.location.host) && (!currA.className || currA.className == "processing_link" || currA.className == filterId)) {
			hostNameSafe = gimmeHostName2(currA.href).replace(/\./g, "_dot_").replace(/\-/g, "_dash_").toLowerCase();
			if (!hostsIDs[hostNameSafe]) {
				if (filterId) cLinksTotal--; currA.className = '';
				continue;
			} else {
				var ix = hostsIDs[hostNameSafe].length;
				while(ix--) {
					if (new RegExp(hostsIDs[hostNameSafe][ix].linkRegex).test(currA.href)) {
						currA.className = "processing_link";
						hostID = hostsIDs[hostNameSafe][ix].hostID;
						hostsCheck[hostID].links.push(currA);
						foundMirrors[hostID.substr(0,2)].push(hostID);
					}
				}
			}
		}
	}
}

function add_WARLC_style()
{
	if (!(document.getElementsByTagName('WARLC')[0]))
	{
		var meta_not_to_add_more_style = document.createElement("WARLC");
		meta_not_to_add_more_style.setAttribute('content', 'war_links_checker');
		meta_not_to_add_more_style.setAttribute('name', 'description');
		document.getElementsByTagName('head')[0].appendChild(meta_not_to_add_more_style);

		GM_addStyle(
			".alive_link {background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;background-size:13px;padding-right:13px;color:green !important;}\
			.adead_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;background-size:13px;padding-right:13px;color:red !important;}\
			.obsolete_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;background-size:13px;padding-right:13px;color:red !important;}\
			.unava_link {background:transparent url(" + unava_link_png + ") no-repeat scroll 100% 50%;background-size:14px;padding-right:13px;color:#FF9900 !important;}\
			.unknown_link {background:transparent url(" + unknown_link_png + ") no-repeat scroll 100% 50%;padding-right:13px;background-size:13px;color:rgb(0, 150, 255) !important}\
			.processing_link {background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;background-size:13px;padding-right:16px;color:grey !important;}\
			.container_link {background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;background-size:13px;padding-right:16px;color:grey !important;}"
		);
	}
}

//function to return hostname + tld
function gimmeHostName(link) {
    if (link.contains(/([\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4}))(?::\d+)?$/)) return link.match(/([\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4}))(?::\d+)?$/)[1];
    else {
        console.warn("gimmeHostName error.", link);
        return -1;
    }
}
//Second gimmehostname function to match whole hostname
function gimmeHostName2(link) {
	link = link.replace(/http:\/\/.*?\?http:\/\//, 'http://'); //anonymizers
    if (link.contains(/(?:https?:\/\/)?(?:www\.|[\w\.])*?[\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4})(?::\d+)?\//)) return link.match(/(?:https?:\/\/)?(?:www\.|[\w\.])*?([\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4}))(?::\d+)?\//)[1];
    else if (link.contains(".1fichier.com")) {
		return "1fichier.com";
	} else {
        console.warn("gimmeHostName error.", link);
        return -1;
    }
}

function uniqArray(array) {
	var uniqueArray = [];
	$.each(array, function(i, el){
	    if($.inArray(el, uniqueArray) === -1) uniqueArray.push(el);
	});
	return uniqueArray;
}

function sendMessage(text)
{
	var msgDiv = "<div class='WarBBInfoMsg'>" + text + "</div>";
	$(".WarBBInfoBox").append(msgDiv).show();
	setTimeout(function(){$(".WarBBInfoBox").hide()}, 5000);
}

function genset(pref, def) {
	var val = preferences.general[pref];
	if (val == undefined) val = def;
	return val;
}

function lsSave() {
	localStorage.setItem("WarBB_Preferences", JSON.stringify(preferences));
}

function setVariables()
{	
	if (firstRun)
	{
		console.warn('First run, compiling preferences object...');
		preferences = {
			hosts: {},
			general: {}
		}
			
		lsSetVal("general", "Display_tooltip_info", false);
		lsSetVal("general", "Display_full_links_in_link_containers", true);
		lsSetVal("general", "Allow_spaces_in_DL_links", false);
		lsSetVal("general", "Do_not_linkify_DL_links", false);
		lsSetVal("general", "Extabit_API_Check", false);
		lsSetVal("general", "Filefactory_API_Check", false);
		lsSetVal("general", "Processbox_Pos_Y", 0);
		lsSetVal("general", "Processbox_Pos_X", 90);
		lsSetVal("general", "Progressbox_Scaling", 100);
		lsSetVal("general", "Last_Update_Check", new Date().valueOf());
		lsSetVal("general", "Ref_anonymize_service", ANONYMIZERS[0]);
		lsSetVal("general", "Show_Update_Notification", false);
			
		localStorage.setItem("WarBB_First_Run", false);	
		lsSave();
	}

	Display_tooltip_info = genset("Display_tooltip_info", false);
	Display_full_links_in_link_containers = genset("Display_full_links_in_link_containers", true);
	Allow_spaces_in_DL_links = genset("Allow_spaces_in_DL_links", false);
	Do_not_linkify_DL_links = genset("Do_not_linkify_DL_links", false);
	Processbox_Pos_Y = genset("Processbox_Pos_Y", 0);
	Processbox_Pos_X = genset("Processbox_Pos_X", 90);
	Progressbox_Scaling = genset("Progressbox_Scaling", 100);
	Show_Update_Notification = genset("Show_Update_Notification", false);
	ANONYMIZE_SERVICE = genset("Ref_anonymize_service", ANONYMIZERS[0]);
	ANONYMIZE_SERVICE = (ANONYMIZE_SERVICE != 'NoRed' ? ANONYMIZE_SERVICE : '');
}

function hostSet(key, def) { //will get the value of the key in pref object, if key is undefined -> opposite value of default returned (to keep the compatibility with old GM_getValue and the inversed default values in WarBB 2.0)
	var val = preferences.hosts[key];
	if (val == undefined) val = !def;
	return val;
}

function lsSetVal(section, key, value) { //replacement of GM_setValue, valid for both sections of preferences object
	preferences[section][key] = value;
	lsSave();
}

// Delinkifies the links
// params:
// links -> list of links or link components (note they should be sufficiently unique to identify the link on page,
// e.g. 'uloz.to/xs68skxl8')
function delinkifySnapshot(snapshot)
{
	var n = snapshot.snapshotLength;

	while (n--)
	{
		thisLink = snapshot.snapshotItem(n);

		var spanElm = document.createElement("span");
		spanElm.className = thisLink.className;
		spanElm.innerHTML = thisLink.innerHTML;

		if (Display_tooltip_info)
		{
			spanElm.href = thisLink.href;
						
			switch (thisLink.className){
			case "alive_link": spanElm.addEventListener("mouseover", displayTooltipInfo, false); break
			case "adead_link": spanElm.addEventListener("mouseover", displayTooltipError, false); break;
			case "obsolete_link": spanElm.addEventListener("mouseover", displayTooltipError, false); break;
			case "unava_link": //reserved
			default: 
			}
		}
			
		thisLink.parentNode.replaceChild(spanElm, thisLink);
	}
}
	
	
	function checkLinks(filterId)
	{
		start(filterId);
	}

	/**
	 * Initialises progress box including event binding and CSS 
	 */
	function initProgressBox()
	{
		if ($("#warlc-progressbox").length > 0)
			return;
		
		//progressbox css
		var progressboxCss = "#warlc-progressbox  {position:fixed; background:white; bottom:" + Processbox_Pos_Y + "%; left:" + Processbox_Pos_X + "%; padding:5px; font-size:10px; font-weight:bold; font-family:Helvetica; width:130px; cursor:default; border:1px solid #4DD9FF; z-index:200;}\
					\
					#warlc-hostdetails  {position:fixed; background:white; bottom:" + (parseInt(Processbox_Pos_Y) + 9) + "%; left:" + Processbox_Pos_X + "%; padding:5px; font-size:10px; font-weight:bold; cursor:default; border:1px solid #4DD9FF; display:none; z-index:201;}\
					\
					.warlc-progressbox-contents {right: 5px;}\
					\
					.warlc-progressbar {text-align:left; background: lightGrey; height:3px; margin-bottom:5px; width:0px; border-radius:1.5px; }\
					\
					.warlc-progressitem { display: block; padding:2.5px 0px 2.5px 20px }\
					\
					.alive {color: rgb(133, 195, 49); background:transparent url(" + alive_link_png + ") no-repeat scroll 0% 50%;background-size:15px;}\
					\
					.adead {color: red; background:transparent url(" + adead_link_png + ") no-repeat scroll 0% 50%;background-size:15px;}\
					\
					.unava {color: #FF9900; background:transparent url(ToBeAddedLater) no-repeat scroll 0% 50%;background-size:15px;}\
					\
					.unknown {color: rgb(0, 150, 255); background:transparent url(" + unknown_link_png + ") no-repeat scroll 0% 50%;background-size:15px;}\
					\
					.processing {color: grey; background:transparent url(" + processing_link_gif + ") no-repeat scroll 0% 50%;}"
		
		if (Progressbox_Scaling != 100) {
			$.each(progressboxCss.match(/[\d\.]+px/g), function(i, el) { //dynamic rescaling of the progressbox according to user settings
				progressboxCss = progressboxCss.replace(new RegExp(el + "(?!" + RAND_STRING + ")"), parseFloat(el) * Progressbox_Scaling/100 + "px" + RAND_STRING); //RAND_STRING to prevent the same value replaced twice
			});
		}
		
		progressboxCss = progressboxCss.replace(new RegExp(RAND_STRING, "g"), "").replace("ToBeAddedLater", unava_link_png); //inserting the unava_link_png at the end because the function messes up its base64 string
		
		GM_addStyle(progressboxCss);
				
		$('body').append('	<div id="warlc-progressbox">\
								<div class="warlc-progressbox-contents">\
									<div class="warlc-progressbar" aria-valuenow=0></div>\
									<div class="warlc-progressitems">\
										<span class="warlc-progressitem alive"></span>\
										<span class="warlc-progressitem adead"></span>\
										<span class="warlc-progressitem unava"></span>\
										<span class="warlc-progressitem unknown"></span>\
										<span class="warlc-progressitem processing"></span>\
									</div>\
								</div>\
							</div>\
							<div id="warlc-hostdetails"></div>');	
		
		$('#warlc-progressbox').hide().click(function(){
												clearInterval(intervalId); 
												$(this).hide(); 
												return false;
											});
											
		$(".warlc-progressitem").hover(function() {
			showHostDetails(this);
		}, function() {
			showHostDetails("none");
		});
		
	}
	
	function showHostDetails(item) {
		var $div = $("#warlc-hostdetails");
		if (item == "none") {
			$div.hide().removeClass();
			if ($("#warlc-progressbox").css("display") != "none") intervalId = setInterval(function() { updateProgress(); }, 1000);	
		}
		else {
			var statusArr; 
			var divTxt = "The following hosts ";
			switch(item.className) {
			case "warlc-progressitem alive": divTxt += "have been found alive: "; statusArr = filehostsAlive; break;
			case "warlc-progressitem adead": divTxt += "have been found dead: "; statusArr = filehostsDead; break;
			case "warlc-progressitem unava": divTxt += "have been found unavailable: "; statusArr = filehostsUnava; break;
			case "warlc-progressitem unknown": divTxt += "are unknown: "; statusArr = filehostsUnknown; break;
			case "warlc-progressitem processing": divTxt += "are still processing: "; statusArr = getProcHosts(); break;
			}
			$div.addClass(item.className);
			$("#warlc-progressbox").append($div);
			if (statusArr == "") divTxt = divTxt.replace("The following", "No").replace(":", ".");
			$div.text(divTxt + statusArr.slice(0,statusArr.length-1).replace(/,/g, ", "));
			clearInterval(intervalId);
			$div.show();
		}
		
	}
	
	function getProcHosts() {
		var filehostsProc = "";
		var $links = $(".processing_link");
		if ($links.length > 0) {
			var i = $links.length;
			var hostname;
			while (i--)
			{
				hostname = gimmeHostName2($links[i].href);
				if (!filehostsProc.contains(hostname)) {
					filehostsProc += hostname + ",";
				}
			}
		}
		return filehostsProc;
	}
	
	function dismissProgressbar() {
		$(".warlc-progressbar").fadeOut();
		$(".warlc-progressitem.processing").fadeOut();
		clearInterval(intervalId); //stops refreshing the stats
	}
	
	/**
	 * Updates progress data in progress box
	 */
	var percAlive, percDead, percUnava, percProc;
	function updateProgress()
	{
		if (cLinksTotal) // some links were detected on page
		{
			var percProgress = Math.round(((100 / cLinksTotal) * cLinksProcessed));
			var $progressItems = $('.warlc-progressitems > .warlc-progressitem');
			
			$(".warlc-progressbar").css("width", percProgress + "%");
			$(".warlc-progressbar").attr("aria-valuenow", percProgress);
			
			percAlive = Math.round((cLinksAlive / cLinksTotal) * 100);
			percDead = 	Math.round((cLinksDead / cLinksTotal) * 100);
			percUnava = Math.round((cLinksUnava / cLinksTotal) * 100);
			percUnknown = Math.round((cLinksUnknown / cLinksTotal) * 100);
			percProc = Math.round(((cLinksTotal - cLinksProcessed) / cLinksTotal) * 100);
			
			$progressItems.first().text(cLinksAlive + " - " + percAlive + "% Alive")
							.next().text(cLinksDead + " - " + percDead + "% Dead")
							.next().text(cLinksUnava + " - " + percUnava + "% Unavailable")
							.next().text(cLinksUnknown + " - " + percUnknown + "% Unknown")
							.next().text(cLinksTotal - cLinksProcessed + " - " + percProc + "% Processing");
			if (percProgress > 0) $("#warlc-progressbox").show();
			if (percProgress == 100) dismissProgressbar();
		}	
	}
	
	

	function check_all_links()
	{
		add_WARLC_style();

		initProgressBox();			
		intervalId = setInterval(function(){updateProgress();}, 1000);

		start(null);
	}

	function KeyDownHandler(event)
	{
		var kcode = (event.keyCode) ? event.keyCode : event.which;
		if (event.ctrlKey && event.altKey)
		{
			switch(kcode)
			{
				case 71 : check_all_links(); break;
				case 77 : configuration(); break;			
			}
		}
	}

	//
	//
	//   SCRIPT EXECUTION START POINT
	//
	//
	
	//init the stuff
	setVariables();
	if (RAND_INT == RAND_INT2) sendMessage(Array(16).join("wat" - 1) + " Batman!");

	//register GM menu commands & keyboard shortcut event handler
	$(document).keydown(KeyDownHandler);
	GM_registerMenuCommand("[WarBB - Warez-BB Links Checker] Configuration  (CTRL + ALT + M)", configuration);
	GM_registerMenuCommand("[WarBB - Warez-BB Links Checker] Check All Links (CTRL + ALT + G)", check_all_links);

	//start linkchecking
	$(document).ready(check_all_links);
	//
	//
	//   SCRIPT EXECUTION END POINT
	//
	//

	//shows configuration box
	function configuration()
	{

		//prevent multiple creating of config window
		if ($("#hideshow").length)
		{
			$("#hideshow").show();
			return;
		}
		
		var settingsIcon = "data:image/png;base64,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";
	
		var configcss = '\
		.popup_block .popup fieldset{\
		   padding: 1%;\
		   border-style: none;\
		   border-width: 0;\
		   border-color: white;\
		   margin-bottom: 1px;\
		}\
		.popup_block .popup hr {\
			height: 1px;\
			border-color:black;\
		}\
		#WarBBTitle{\
		 font-size: 2em;\
		 width:100%;\
		}\
		#hideshow {\
		 position: fixed;\
		 width: 100%;\
		 height: 100%;\
		 top: 0;\
		 left: 0;\
		 font-size:12px;\
		 z-index:2147483647;\
		 text-align:left;\
		}\
		#fade {\
		 background: #000;\
		 position: fixed;\
		 width: 100%;\
		 height: 100%;\
		 opacity: .80;\
		 -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";\
		 left: 0;\
		 z-index: 10;\
		}\
		.popup_block {\
		 font-family:verdana;\
		 color:black;\
		 background: #ddd;\
		 padding: 10px 20px;\
		 border: 2px solid #4DD9FF;\
		 float: left;\
		 width: 700px;\
		 position: absolute;\
		 top: 7%;\
		 left: 50%;\
		 bottom: 7%;\
		 margin: 0 0 0 -350px;\
		 -moz-border-radius:10px;\
		 z-index: 100;\
		}\
		.popup_block .popup {\
		 display: block;\
		 float: left;\
		 width: 100%;\
		 height: 95%;\
		 background: #fff;\
		 margin: 10px 0px;\
		 border: 1px solid #4DD9FF;\
		}\
		.popup p {\
		 padding: 1px 10px;\
		 margin: 0px 0;\
		 -x-system-font:none;\
		 font-family:verdana,geneva,lucida,"lucida grande",arial,helvetica,sans-serif;\
		 font-size:10pt;\
		 font-size-adjust:none;\
		 font-stretch:normal;\
		 font-style:normal;\
		 font-variant:normal;\
		 font-weight:normal;\
		 line-height:normal;\
		}\
		#note {\
			font-size:7pt;\
			color:gray;\
			padding: 1px 10px;\
			margin: 0px 0;display:inline-block;\
			min-width:100px;\
		}\
		#configinfo {\
			font-size:8pt;\
			color:gray;\
			padding: 1px 10px;\
			margin: 0px 0;display:inline-block;width:60em;\
		}\
		#WarBBTabs > input[type="button"], .WarBBButtons > input[type="button"] {\
			display: inline-block;\
			font-size: 12px;\
			font-weight: normal;\
			background-color: rgb(238, 238, 238);\
			background-position: 0px -178px;\
			background-repeat: repeat-x;\
			text-shadow: 0px 1px rgb(255, 255, 255);\
			padding: 4px 8px;\
			position: relative;\
			overflow: hidden;\
			color: rgb(51, 51, 51);\
			margin: 0 0;\
			border: 1px solid rgb(170, 170, 170);\
			border-radius: 0 0 0 0;\
			box-shadow: 0px 12px rgb(255, 255, 255) inset;\
			float: left;\
		}\
		#WarBBTabs > input[type="button"] {\
			border-bottom: none;\
		}\
		#WarBBSeparator {\
			border-bottom: 1px solid rgb(170, 170, 170);\
			margin-top: 24px;\
		}\
		#selectAllButton {\
			border-radius: 3px 0 0 3px;\
			border-right: none;\
		}\
		#invertButton {\
			border-radius: 0 3px 3px 0;\
			border-left: none;\
		}\
		#WarBBTabs > input[name="WarBBHosts"] {\
			border-radius: 3px 0 0 0;\
			border-right:none;\
			margin-left:10px;\
		}\
		#WarBBTabs > input[name="WarBBAbout"] {\
			border-radius: 0 3px 0 0;\
			border-left:none;\
		}\
		.WarBBButtons > input[type="button"]:hover {\
			padding: 5px 8px 3px;\
			box-shadow: 0 0 white;\
			background: none;\
		}\
		#WarBBTabs > input.activeTab {\
			padding: 5px 8px 3px;\
			box-shadow: 0 0 white;\
			background: none;\
		}\
		.WarBBTab {\
			display: none;\
		}\
		.WarBBButtons, #WarBBTabs, #warlcsitelist1 {\
			margin-left: 5px;\
		}\
		#warlcsitelist1 {\
			border-top: 1px solid grey;\
			padding-top: 5px;\
			overflow:auto;\
			margin-top:2px;\
		}\
		.WarBBTabContainer {\
			overflow:auto;\
		}\
		input:hover+label {\
			background:#F1F77C;\
			font-size:110%;\
		}\
		.popup_block .popup legend {\
			display:block;\
			width:100%;\
			padding:0;\
			margin-bottom:2px;\
			font-size:15px;\
			line-height:inherit;\
			color:#333;\
			border:0;\
			border-bottom:1px solid #e5e5e5\
		}\
		';

		GM_addStyle(configcss);
		
		var configurationinnerHTML = 
		'<div id="fade"></div>\
		<div class="popup_block">\
			<div class="popup">\
				<div id="WarBBTitle" style="height: 1.2em"><img src=' + settingsIcon + ' style="height:35px;margin-left:2px;vertical-align:middle;"></img>WarBB - Configuration</div><br>\
				<div id="WarBBTabs">\
					<input type="button" name="WarBBHosts" class="activeTab" value="Filehostings">\
					<input type="button" name="WarBBSettings" value="Settings">\
					<input type="button" name="WarBBAbout" value="About">\
				</div>\
				<div id="WarBBSeparator"></div>\
				<div id="WarBBHosts" class="WarBBTab">\
					<br><div class="WarBBButtons">\
						<input type="button" id="selectAllButton" value="Select All">\
						<input type="button" id="selectNoneButton" value="Select None">\
						<input type="button" id="invertButton" value="Invert">\
					</div><br><br>\
					<input style="margin-left:5px;" type="textbox" placeholder="Search filehost" id="hostSearchBox" value="">\
					<div id="warlcsitelist1"><span>Empty</span></div>\
				</div>\
				<div id="WarBBSettings" class="WarBBTab">\
					<br>\
					<div id="WarBBPreferences" class="WarBBTabContainer">\
						<fieldset>\
							<legend>General settings</legend>\
							<p><input type="checkbox" id="Do_not_linkify_DL_links"> Do NOT linkify DL links</p>\
							<p><input type="checkbox" id="Allow_spaces_in_DL_links"> Allow spaces in DL links<br><div id="configinfo">Note: All links must end with a new line!</div></p>\
							<p><input type="checkbox" id="Display_full_links_in_link_containers"> Display full links in link containers</p>\
							<p><input type="checkbox" id="Display_tooltip_info"> Display tooltip info<br><div id="configinfo">Note: File name, file size, error messages etc.</div></p>\
							<p><input type="checkbox" id="Show_Update_Notification">Show notification when WarBB is up to date</p>\
						</fieldset>\
						<fieldset>\
							<legend>Progressbox settings</legend>\
							<p>Horizontal positioning of the progressbox: <input type="text" id="Processbox_Pos_X"><br><div id="configinfo">Note: Define this value in percentages starting from the left of the screen.</div></p>\
							<p>Vertical positioning of the progressbox: <input type="text" id="Processbox_Pos_Y"><br><div id="configinfo">Note: Define this value in percentages starting from the bottom of the screen.</div></p>\
							<p>Scaling of the progressbox: <input type="text" id="Progressbox_Scaling"><br><div id="configinfo">Note: Resizes the progressbox. Define this value in percentages. 100% = full size, 200% = double size, etc</div></p>\
						</fieldset>\
						<fieldset>\
							<legend>Host options</legend>\
							<p>Anonymizer:\
							<select style="margin-left:5px;" id="redirector">\
								<option>Lorem ipsum dolorem</option>\
							</select></p>\
							<p><input type="checkbox" id="Extabit_API_Check"> Check Extabit.com links through API</p>\
							<p><input type="checkbox" id="Filefactory_API_Check"> Check Filefactory.com links through API</p>\
							<div id="configinfo">Note: We cannot guarantee this will work. If disabled, WarBB will use a website check instead.</div>\
						</fieldset>\
					</div>\
				</div>\
				<div id="WarBBAbout" class="WarBBTab">\
					<br>\
					<div class="WarBBTabContainer">\
					<fieldset>\
					<legend>WarBB - Warez-BB Link Checker v' + WarBB_version + '</legend>\
					<p>Authors: iKickback (<a href="http://www.warez-bb.org/profile.php?mode=viewprofile&u=2348347">Warez-BB</a> | <a href="http://userscripts.org/users/476129">Userscripts</a>) & thecodingdude (<a href="http://www.warez-bb.org/profile.php?mode=viewprofile&u=2089048">Warez-BB</a> | <a href="http://userscripts.org/users/437232">Userscripts</a>)</p>\
					<p>Based on <a href="http://userscripts.org/scripts/show/125631">W.A.R. Links Checker - Dev</a></p>\
					<p>Original by <a href="http://userscripts.org/users/302353">dkitty</a></p>\
					<p>Graphics by LiabilityZero (<a href="http://www.warez-bb.org/profile.php?mode=viewprofile&u=3229521">Warez-BB</a> | <a href="http://liabilityzero.deviantart.com/">deviantART</a> | <a href="mailto:liabilityjeeru@gmail.com">Contact</a>)</p>\
					</fieldset>\
					<br />\
					<fieldset>\
					<legend>Currently supported</legend>\
					<p>Filehostings: ' + allHostNames.length + '<br />\
					Containers: ' + allContainerNames.length + '<br />\
					Obsolete sites: ' + allObsoleteNames.length + '<br /></p>\
					</fieldset>\
					<br />\
					<fieldset>\
					<legend>Uses</legend>\
					<p>adam_3\'s <a href="http://userscripts.org/scripts/show/2254">Linkify ting</a> (modified)</p>\
					<p><a href="http://jquery.com/">jQuery</a> JavaScript Library</p>\
					</fieldset>\
					<br />\
					<fieldset>\
					<legend>License</legend>\
					<p>GPL version 3 or any later version (<a href="http://www.gnu.org/copyleft/gpl.html">http://www.gnu.org/copyleft/gpl.html</a>)</p>\
					</fieldset>\
					</div>\
				</div>\
			</div>\
		</div>';
		
		$('body').append('<div id="hideshow">' + configurationinnerHTML + '</div>');
		$("#WarBBHosts").show();
		
		//sets height of warlcsitelist1
		var totalHeight = $(".popup").height();
		$("#warlcsitelist1").height(totalHeight - 155); $(".WarBBTabContainer").height(totalHeight - 90);
		$("#WarBBSeparator").css("margin-top", 9 + $(".activeTab").height() + "px"); //because the buttons have a different height on the different themes
		
		$("#WarBBTabs > input[type='button']").click(function() {
			var $target = $(this);
			var current = "#" + $(".activeTab").removeClass().attr("name"); $(current).hide();
			var targetTab = "#" + $target.addClass("activeTab").attr("name"); $(targetTab).show();
		});
		
		$("#fade").click(function(event) {
			$("#hideshow").hide(); event.preventDefault();
		});
				
		var elmHostList = document.getElementById("warlcsitelist1");
		
		buildSettings();
		buildSitelist("", allHostNames, elmHostList);
		appendObsolete("", allObsoleteNames, elmHostList);
			
		//handler for checkbox state change
		function changeConfiguration(e)
		{
			var element = e.target;

			if (element.type == 'checkbox')
			{
				if (element.checked == 1)
				{
					lsSetVal("hosts", element.id, true);
				}
				else
				{
					lsSetVal("hosts", element.id, false);
				}

			}
		}

		//Selects all filehosting checkboxes
		function selectAll()
		{
			$(":checkbox:visible:not(:checked)").prop("checked",true)
						 .each(function(index, element){lsSetVal("hosts", this.id, true)});
		}

		//Deselects all filehosting checkboxes
		function selectNone()
		{
			$(":checkbox:visible:checked").prop("checked",false)
						 .each(function(index, element){lsSetVal("hosts", this.id, false)});
		}

		//Inverts filehosting checkboxes selection
		function selectInvert()
		{
			var $checked = $(":checkbox:visible:checked");
			var $unchecked = $(":checkbox:visible:not(:checked)");
			
			$unchecked.prop("checked",true)
						 .each(function(index, element){lsSetVal("hosts", this.id, true)});
			$checked.prop("checked",false)
						 .each(function(index, element){lsSetVal("hosts", this.id, false)});
		}
		
		//Sets anonymizer setting
		function changeAnonymizer()
		{
			var val = $("#redirector").val();
			lsSetVal("general", "Ref_anonymize_service", (val == ANONYMIZERS.length ? '' : ANONYMIZERS[val]));
			$('#redirector option[value=' + val + ']').prop('selected', true);
		}
		
		//Sets selected redirector option
		var anonlist = "";
		$(ANONYMIZERS).each(function(index, value) {
			anonlist += '<option value=' + index  + (value == ANONYMIZE_SERVICE ? ' selected' : '') + '>' + gimmeHostName2(value) + '</option>';
		});
		anonlist += '<option value="' + ANONYMIZERS.length + '">No referer</option>';
		$('#redirector').html(anonlist);
		
		//Sets Processbox position setting
		function changeProgBox(event) {
			var setting;
			switch(event.data.set) {
				case "X": setting = "Processbox_Pos_X"; break;
				case "Y": setting = "Processbox_Pos_Y"; break;
				case "Scale": setting = "Progressbox_Scaling"; break;
			}
			
			var $setting = $("#" + setting);
			var newSet = $setting.val().replace("%", "");
			lsSetVal("general", setting, newSet);
		}
		
		//Sets value of Processbox position
		$("#Processbox_Pos_X").val(Processbox_Pos_X + "%");
		$("#Processbox_Pos_Y").val(Processbox_Pos_Y + "%");
		$("#Progressbox_Scaling").val(Progressbox_Scaling + "%");

		function buildSettings()
		{
			$("#WarBBPreferences :checkbox").each(function(){
				$(this).prop("checked", genset($(this).attr("id")))
					.click(function(e){
						lsSetVal("general", $(this).attr("id"), $(this).prop("checked"));
						setVariables();
					});				
			})
		}
		
		//Dynamic build of host list
		//param search 		[string]	searches for hostnames matching search substring 
		//param siteNames 	[array]		array of site names
		//param targetNode 	[DOM Node]	where the list should be built
		//								first child node is replaced
		function buildSitelist(search, siteNames, targetNode)
		{
			var searchRegex = new RegExp("\\|?([\\w\\.-]*" + search.replace(/\./g,"\\.").replace(/-/g, "\\-") + "[\\w\\.-]*)\\|?", "i");
			
			$(targetNode).empty().append("<fieldset id='WarBBHosts1'><legend>Filehosts</legend></fieldset>");
			var $targetNode = $("#WarBBHosts1");
			
			var searchedSite = "";
			$.each(siteNames, function(i, site){
				if (searchedSite = site.match(searchRegex))
				{
					var baseSite = site.replace(/\|.+/, ""); //filehosting main domain
					
					//ensuring backward compatibility with the rest of code, to be refactored later
					var oldRSLCvalue = "Check_" + baseSite.replace(/\|.+/, "").replace(/\./g,"_dot_").replace(/-/g, "_dash_") + "_links";
					//
										
					$targetNode.append('<input type="checkbox" id="' + oldRSLCvalue +'" />\
						<label for="' + oldRSLCvalue + '">' + searchedSite[1] + '</label>' +
						((searchedSite[1] != baseSite) ? ('<div id="note"> ( ~ ' + baseSite + ' )</div>') : (""))
						);
					
					$("#" + oldRSLCvalue).prop("checked", hostSet(oldRSLCvalue, false))
										.change(changeConfiguration);
										
					$targetNode.append('<br />');
				}
			});
			
			$(targetNode).append("<fieldset id='WarBBHosts2'><legend>Containers</legend></fieldset>");
			$targetNode = $("#WarBBHosts2");
			
			searchedSite = "";
			$.each(allContainerNames, function(i, site) {
				if (searchedSite = site.match(searchRegex)) {
				var oldRSLCvalue = "Check_" + searchedSite[1].replace(/\|.+/, "").replace(/\./g,"_dot_").replace(/-/g, "_dash_") + "_links";
				$targetNode.append('<input type="checkbox" id="' + oldRSLCvalue +'" />\
					<label for="' + oldRSLCvalue + '">' + searchedSite[1] + '</label>');
				$("#" + oldRSLCvalue).prop("checked", hostSet(oldRSLCvalue, false))
									.change(changeConfiguration);
				$targetNode.append('<br />');	
				}
			});
		}
		
		//obsolete hosts checkbox
		function appendObsolete(search, siteNames, targetNode) {
			var searchRegex = new RegExp("\\|?([\\w\\.-]*" + search.replace(/\./g,"\\.").replace(/-/g, "\\-") + "[\\w\\.-]*)\\|?", "i");
			$(targetNode).append('<fieldset id="WarBBHosts3"><legend>Obsolete hosts</legend><input type="checkbox" id="Obsolete_file_hosts" /><label for="Obsolete_file_hosts">Check obsolete file hosts</label><br /></fieldset>');		
			$("#Obsolete_file_hosts").prop("checked", hostSet("Obsolete_file_hosts", false))
									.change(changeConfiguration);
			
			var $targetNode = $("#WarBBHosts3");
			
			var foundName = "";
			$.each(siteNames, function(i, site){
				if (foundName = siteNames[i].match(searchRegex))
				{
					$targetNode.append('<div id="note">' + foundName[1] + '</div>');
				}
			})
		}
		
		//event listener binding
		$("#hostSearchBox").keyup(function() {
			buildSitelist($("#hostSearchBox").val(), allHostNames, elmHostList);
			appendObsolete($("#hostSearchBox").val(), allObsoleteNames, elmHostList);
		});
		$("#selectAllButton").click(selectAll);
		$("#selectNoneButton").click(selectNone);
		$("#invertButton").click(selectInvert);
		$("#redirector").change(changeAnonymizer);
		$("#Processbox_Pos_X").change({ set: "X" }, changeProgBox);
		$("#Processbox_Pos_Y").change({ set: "Y" }, changeProgBox);
		$("#Progressbox_Scaling").change({ set: "Scale" }, changeProgBox);
		
		//buttons and edit boxes init end
	}

//Objects for linkchecking
var hostsIDs = {}; //hosts IDs and link regexes
var hostsCheck = {}; //host status IDs and links
var foundMirrors = { //mirrors found on the page, listed by type of check
	BC: [],
	HC: [],
	OH: [],
	RH: [],
	WC: []
}

//begin standard link checking algorithm
function start(filterId)
{
	var doNotLinkify = Do_not_linkify_DL_links;
	var redirectorTypes = {	"HTTP_302": 0, 
							"INNER_LINK": 1};

	// USER SELECTED FILE HOSTS INITIALIZATION START
	if (!filterId) {
		initFileHosts();
		initBulkHosts();
		initRedirectors();
		initFileHostsHeadersOnly();
	}
	// USER SELECTED FILE HOSTS INITIALIZATION END

	// LINKIFICATION START		
	linkify(filterId);
	//LINKIFICATION END

	//
	//HANDLING REDIRECTORS START
	//
	var redirFunctions = {
		//HTTP_302
		HTTP_302_TRIES: 0,
		processRedirectorLink: function(links, redirectorId) {
			$.each(links, function(key, value) {
				$('[href="' + value + '"]').removeClass().addClass('container_link');
			});

			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://warbb.pw/decrypt',
				data: 'links=' + links.join(RAND_STRING),
				headers: {
					'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
					'Content-type': 'application/x-www-form-urlencoded',
					'Referer': 'http://warbb.pw',
					'X-Requested-With': 'XMLHttpRequest'						
				},
				onload: function(result) {
					if (result.status != 200) return;

					var links = JSON.parse(result.responseText);
					var deadlinks = [], failedlinks = [];

					$.each(links, function(key, value) {
						if (value.success) {
							hostsCheck[redirectorId].cProcessed++;
							link = $('[href="' + key + '"]').first();
							link.attr('href', value.link);
							if (Display_full_links_in_link_containers) link.html(value.link);

						} else if (value.error == 'ERROR: Not Found (HTTP_STATUS: 404)') {
							hostsCheck[redirectorId].cProcessed++;
							deadlinks.push(key);

						} else if (value.error.contains('ERROR: ')) {
							hostsCheck[redirectorId].cProcessed++;
							failedlinks.push(key);
							console.warn('Error in decrypting link.\r\nLink: ' + key + '\r\nError thrown: ' + value.error + '\r\nAdditional information:', value);
						}
					});
					
					if (failedlinks.length > 0) DisplayTheCheckedLinks(failedlinks, 'unknown_link');
					if (deadlinks.length > 0) DisplayTheCheckedLinks(deadlinks, 'adead_link');
					
					checkLinks('container_link');
				},
				onerror: function(result) {
					if (redirFunctions.HTTP_302_TRIES < 5) { //retry for max 10 times
						redirFunctions.HTTP_302_TRIES++;
						redirFunctions.processRedirectorLink(links, redirectorId);
					} else {
						DisplayTheCheckedLinks(links, 'unknown_link');
					}
				}
			});
		},
		
		//INNER_LINK (Hotfile.com/links/)
		processRedirectorLinkEx: function(link, redirectorId) {
			link.className = 'container_link';
					
			GM_xmlhttpRequest({
				method: 'GET',
				url: link.href,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/xml',
					'Referer': ""
				},
				onload: function(result) {
					link.href = result.responseText.match(hostsCheck[redirectorId].innerLinkRegex)[1];
					
					hostsCheck[redirectorId].cProcessed++;
					
					if (hostsCheck[redirectorId].cProcessed >= hostsCheck[redirectorId].cTotal)
						checkLinks('container_link');
				}				
			});
		}
	}
	
	foundMirrors.RH = uniqArray(foundMirrors.RH);
	redirLength = foundMirrors.RH.length;
	if (redirLength > 0) {		
		//process redirector links
		var hostID, links, y;
		for(var redirIdx = 0; redirIdx < redirLength; redirIdx++)
		{
			hostID = foundMirrors.RH[redirIdx];
			links = uniqArray(hostsCheck[hostID].links)
			hostsCheck[hostID].cTotal = links.length;

			cLinksTotal += links.length;
			y = links.length;

			if (hostsCheck[hostID].type == redirectorTypes.HTTP_302) {
				var y = links.length;
				while(y--) {
					links[y] = links[y].href;
				}
				redirFunctions.processRedirectorLink(links, hostID);
			} else {
				while(y--) {
					switch(hostsCheck[hostID].type) {
						case redirectorTypes.INNER_LINK:		redirFunctions.processRedirectorLinkEx(links[y], hostID); break;
						default:
					}
				}	
			}
			
			hostsCheck[hostID].links = [];
		}
	}
	foundMirrors.RH = [];
	//
	//HANDLING REDIRECTORS END
	//

	//STANDARD LINKCHECKING START
	foundMirrors.WC = uniqArray(foundMirrors.WC);
	var WCLength = foundMirrors.WC.length;
	if (WCLength > 0) {
		var hostID, links, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop, y;
		while(WCLength--) {
			hostID = foundMirrors.WC[WCLength];
			links = uniqArray(hostsCheck[hostID].links);
		
			if (filterId == null)
			{
				cLinksTotal += links.length;
			}

			isAliveRegex = hostsCheck[hostID].liveRegex;
			isDeadRegex = hostsCheck[hostID].deadRegex;
			isUnavaRegex = hostsCheck[hostID].unavaRegex;
			tryLoop = hostsCheck[hostID].tryLoop;

			y = links.length;

			while (y--)
			{
				geturl(links[y], isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop);
			}
			hostsCheck[hostID].links = [];
		}	
	}
	foundMirrors.WC = [];
	//STANDARD LINKCHECKING END
	
	//DIRECT LINKCHECKING START
	foundMirrors.HC = uniqArray(foundMirrors.HC);
	var HCLength = foundMirrors.HC.length;
	if (HCLength > 0) {
		var hostID, links, isAliveRegex, isDeadRegex, y;
		while(HCLength--) {
			hostID = foundMirrors.HC[HCLength];
			links = uniqArray(hostsCheck[hostID].links);
		
			if (filterId == null)
			{
				cLinksTotal += links.length;
			}

			isAliveRegex = hostsCheck[hostID].liveRegex;
			isDeadRegex = hostsCheck[hostID].deadRegex;

			y = links.length;

			while (y--)
			{
				geturlHeader(links[y], isAliveRegex, isDeadRegex);
			}
			hostsCheck[hostID].links = [];
		}	
	}
	foundMirrors.HC = [];
	//DIRECT LINKCHECKING END

	//Bulkcheck hosts controller
	foundMirrors.BC = uniqArray(foundMirrors.BC);
	var BCLength = foundMirrors.BC.length;
	if (BCLength > 0) {
		var hostID, links, y, corrLink, m, n;
		while(BCLength--) {
			hostID = foundMirrors.BC[BCLength];
			links = uniqArray(hostsCheck[hostID].links);
			if (filterId == null)
			{
				cLinksTotal += links.length;
			}
			
			//Replace anchors by href's, and processes link corrections
			y = links.length;
			while(y--) {
				corrLink = links[y].href;
				if (hostsCheck[hostID].corrMatch && hostsCheck[hostID].corrMatch.test(corrLink)) corrLink = corrLink.match(hostsCheck[hostID].corrMatch)[1]; //link match corrections
				if (hostsCheck[hostID].corrReplWhat && hostsCheck[hostID].corrReplWith) corrLink = corrLink.replace(hostsCheck[hostID].corrReplWhat, hostsCheck[hostID].corrReplWith); //link replace corrections
				links[y] = corrLink;
			}
			
			//Filter out dupe links
			links = uniqArray(links);
			
			m = links.length;
			n = hostsCheck[hostID].blockSize;
			if (m > n) {
				//insert block separators (RAND_STRING) into the array
				for(var i = n; i < (Math.floor(m/n)+1)*n; i += n + 1)
				{
					links.splice(i, 0, RAND_STRING);
				}
			}
			
			var sep = hostsCheck[hostID].splitSeparator; 
			
			hostsCheck[hostID].func.call({ 	links:			links.join(sep).replace(new RegExp(sep.replace(/\\/g, "\\") + RAND_STRING + sep.replace(/\\/g, "\\"), "g"), RAND_STRING).replace(new RegExp(RAND_STRING + "$"), "").split(RAND_STRING),
											apiUrl: 		hostsCheck[hostID].apiUrl, 
											postData: 		hostsCheck[hostID].postData, 
											resLinkRegex:	hostsCheck[hostID].resLinkRegex, 
											resLiveRegex:	hostsCheck[hostID].resLiveRegex, 
											resDeadRegex:	hostsCheck[hostID].resDeadRegex, 
											resUnavaRegex: 	hostsCheck[hostID].resUnavaRegex,
											separator: 		sep
										});
										
			hostsCheck[hostID].links.length = 0;
		}
	}
	foundMirrors.BC = [];
	
	//Processes link
	//
	// [string]		link			link URL
	// [string] 	isAliveRegex	alive link regex
	// [string] 	isDeadRegex		dead link regex
	// [string] 	isUnavaRegex	unavailable link regex
	// [boolean]	tryLoop			repeats request until succeeded	
	function geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop)
	{
		if ((link.href.contains("yourfilelink.com/")) && (!link.href.contains("&dv=1"))) link.href += "&dv=1"; //to bypass yourfilelink wait times
		link.href = link.href.replace("shareplace.com/?", "shareplace.com/index1.php?a="); //to bypass shareplace iframe on shareplace.com/?{id} links
		
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: link.href,
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
				'Referer': ""
			},
			onload: function (result)
			{
				var res = result.responseText;

				//console.log(res);

				if (res.contains(isAliveRegex))
				{
					displayTheCheckedLink(link, 'alive_link');
					return;
				}

				if (res.contains(isDeadRegex))
				{
					displayTheCheckedLink(link, 'adead_link');
					return;
				}

				if (res.contains(isUnavaRegex))
				{
					displayTheCheckedLink(link, 'unava_link');
					return;
				}

				var resStatus = result.status;

				if (resStatus == 404)
				{
					displayTheCheckedLink(link, 'adead_link');
					return;
				}
				
				if (resStatus == 500 || resStatus == 503 || resStatus == 403) //not found/available/temp. unava
				{
					if (tryLoop)
					{
						//wait 1-5 seconds and repeat the request
						setTimeout(function(){geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop)}, 1000 + (Math.random() * 4000));
					}
					else
					{
						displayTheCheckedLink(link, 'unava_link');
					}

					return;
				}
				
				displayTheCheckedLink(link, 'unknown_link');
				res = "";
			},
			onerror: function ()
			{
				displayTheCheckedLink(link, 'unknown_link');
			}
		});
	}

	function geturlHeader(link, isAliveRegex, isDeadRegex)
	{	
		if (link.href.contains("disk.karelia.pro/") && !link.href.contains(/karelia\.pro\/fast\/\w+\/.+?/)) {
			geturl(link, 'diskFile\"', '<div id="center">\n+<\/div>', 'optional--', false);
			return;
		}
		
		if (link.href.contains("demo.ovh.") && link.href.contains("/download/")) {
			specificOvhCheck(link);
			return;
		}
		
		GM_xmlhttpRequest(
		{
			method: 'HEAD',
			url: link.href,
			headers: {
				'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
				'Referer': ""
			},
			onload: function (result)
			{
				var resStatus = result.status;
				var resHeaders = "";
				
				if (resStatus == 403 || resStatus == 404 || resStatus == 500) //not found/available
				{
					displayTheCheckedLink(link, 'adead_link');
					return;
				}
				
				if (resStatus == 509) //public traffic exhausted
				{
					displayTheCheckedLink(link, 'unava_link');
					return;
				}

				resHeaders = result.responseHeaders;
				//console.log(resHeaders);

				if (resHeaders.contains(isDeadRegex) && !link.href.contains('archive.org/'))
				{
					displayTheCheckedLink(link, 'adead_link');
					return;
				} else if (link.href.contains('archive.org/') && resHeaders.contains(isDeadRegex)) {
					specArchCheck(link);
					return;
				}

				if (resHeaders.contains(isAliveRegex))
				{
					displayTheCheckedLink(link, 'alive_link');
					return;
				}
				
				displayTheCheckedLink(link, 'unknown_link');
			},
			onerror: function ()
			{
				displayTheCheckedLink(link, 'unknown_link');
			}
		});
	}
	
	function specArchCheck(link) {
		var alive = /<title>Index of/;
		var dead = /<h1>Item not available<\/h1>/;
		var unava = /optional--/;
		geturl(link, alive, dead, unava);
	}
	
	//Specific handler for demo.ovh.com/download/ direct link
	function specificOvhCheck(link) {
		GM_xmlhttpRequest(
		{
			method: 'HEAD',
			url: link.href,
			headers: {
				'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
				'Referer': ""
			},
			onload: function (result)
			{
				var resHeaders = "";
				resHeaders = result.responseHeaders;
				if (resHeaders.contains('Content-Type: application/octet-stream'))
				{
					displayTheCheckedLink(link, 'alive_link');
					return;
				}
				
				if (resHeaders.contains('Content-Type: text/html'))
				{
					var liveRegex = 'download.gif"';
					var deadRegex = 'p_point">';
					var unavRegex = 'optional--';
					geturl(link, liveRegex, deadRegex, unavRegex);
					return;
				}

			},
			onerror: function ()
			{
				displayTheCheckedLink(link, 'unava_link');
			}
		});
	}

	//Delinkfifies the <a> element object
	function delinkifyLink(link)
	{
		var spanElm = document.createElement("span");
		spanElm.className = link.className;
		spanElm.innerHTML = link.innerHTML;

		if (Display_tooltip_info)
		{
			spanElm.href = link.href;
			$(spanElm).attr('warlc_error', $(link).attr('warlc_error'));
			
			switch (link.className){
			case "alive_link": spanElm.addEventListener("mouseover", displayTooltipInfo, false); break
			case "adead_link": spanElm.addEventListener("mouseover", displayTooltipError, false); break;
			case "unava_link": //reserved
			default: 
			}
		}
		
		link.parentNode.replaceChild(spanElm, link);
	}

	//Assigns result status to the <a> element object and calls delinkifying eventually
	//Possible result states: adead_link, alive_link, unava_link
	function displayTheCheckedLink(link, resultStatus)
	{
		//console.log(link);
		link.className = resultStatus;
		var hostname = gimmeHostName2(link.href);
		link.href = ANONYMIZE_SERVICE + link.href;
		
		if (Display_tooltip_info)
		{
			switch (resultStatus){
			case "alive_link": link.addEventListener("mouseover", displayTooltipInfo, false); break; 
			case "adead_link": link.addEventListener("mouseover", displayTooltipError, false); break;
			case "obsolete_link": link.addEventListener("mouseover", displayTooltipError, false); break;
			case "unava_link": //reserved
			default: 
			}
		}
		
		if (doNotLinkify)
		{
			delinkifyLink(link);
		}
		
		cLinksProcessed++;

		if (resultStatus == "alive_link")
		{
			cLinksAlive++;
			if (!filehostsAlive.contains(hostname)) filehostsAlive += hostname + ",";
			return;
		}

		if (resultStatus == "adead_link")
		{
			cLinksDead++;
			if (!filehostsDead.contains(hostname)) filehostsDead += hostname + ",";
			return;
		}
		
		if (resultStatus == "obsolete_link")
		{
			cLinksDead++;
			if (!filehostsDead.contains(hostname)) filehostsDead += hostname + ",";
			return;
		}

		if (resultStatus == "unava_link")
		{
			if (!filehostsUnava.contains(hostname)) filehostsUnava += hostname + ",";
			cLinksUnava++;
		}
		
		if (resultStatus == "unknown_link")
		{
			if (!filehostsUnknown.contains(hostname)) filehostsUnknown += hostname + ",";
			cLinksUnknown++;
		}
	}
	
	function DisplayTheCheckedLinks(links, resultStatus, tooltipInfo)
	{
		//(a[href*=link_1], a[href*=link_2], ..., a[href*=link_n])
		var $links = $('a[href*="' + links.join('"], a[href*="') + '"]');
			
		if (Do_not_linkify_DL_links)
		{	//TODO into separate jQuery function
			$links.replaceWith(function(){
				return '<span href="' + this.href + '">' + $(this).text() + '</span>';
			});
				
			$links = $('span[href*="' + links.join('"], span[href*="') + '"]');
		}	
		$links.removeClass().addClass(resultStatus);
		if (tooltipInfo && resultStatus == 'unknown_link' && Display_tooltip_info) {
			$links.mouseover(displayTooltipError);
			$links.attr('warlc_error', 'Cause of error: <b>' + tooltipInfo + '</b>');
		}
		var hostname = gimmeHostName2($links[0].href);
		$links.each(function() {
			if (!this.href.contains('mega.co.nz')) this.href = ANONYMIZE_SERVICE + $(this).attr("href");
		});
			
		switch(resultStatus)
		{
			case "alive_link":		cLinksAlive += $links.length; 
									if (Display_tooltip_info) $links.mouseover(displayTooltipInfo);
									if (!filehostsAlive.contains(hostname)) filehostsAlive += hostname + ",";
									break;
			case "adead_link": 		cLinksDead += $links.length; 
									if (Display_tooltip_info) $links.mouseover(displayTooltipError);
									if (!filehostsDead.contains(hostname)) filehostsDead += hostname + ",";
									break;
			case "obsolete_link":	cLinksDead += $links.length;
									if (Display_tooltip_info) $links.mouseover(displayTooltipError);
									if (!filehostsDead.contains(hostname)) filehostsDead += hostname + ",";
									break;
			case "unava_link": 		cLinksUnava += $links.length;
									if (!filehostsUnava.contains(hostname)) filehostsUnava += hostname + ",";
									break;
			case "unknown_link":	cLinksUnknown += $links.length;
									if (!filehostsUnknown.contains(hostname)) filehostsUnknown += hostname + ",";
									break;
			default: 
		}		
			
		cLinksProcessed += $links.length;
	}
	
	function initRedirectors()
	{
		var aRCount = 1;
		function addRedirector(hostName, linkRegex, redirType, innerLinkRegex)
		{
			hostName = hostName.split("|");
			var i = hostName.length;
			
			var hostID = "RH" + aRCount;
			
			while(i--) {
				var filehost = hostName[i].replace(/\./g, "_dot_").replace(/\-/g, "_dash_");
				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}
			var RHObj = {
				cProcessed: 0,
				cTotal: 0,
				type: redirType,
				innerLinkRegex: innerLinkRegex,
				links: []
			}
			
			hostsCheck[hostID] = RHObj;
			aRCount++;
		}

		if (hostSet("Check_safelinking_dot_net_links", false))
		{
			addRedirector(
			'safelinking.net',	
			'safelinking\\.net\/d\/\\w{10}',
			redirectorTypes.HTTP_302,
			null);
		}

	}
	
	function initBulkHosts()
	{
		var aHCount = 1;
		function addHost(hostName, linkRegex, blockSize, corrMatch, corrReplWhat, corrReplWith, splitSeparator, 
							apiUrl, postData, resLinkRegex, resLiveRegex, resDeadRegex, resUnavaRegex, func)
		{
			hostName = hostName.split("|");
			var i = hostName.length;
			
			var hostID = "BC" + aHCount;
			
			while(i--) {
				var filehost = hostName[i].replace(/\./g, "_dot_").replace(/\-/g, "_dash_");
				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}
			
			var BCObj = {
				blockSize: 50,
				corrMatch: corrMatch,
				corrReplWhat: corrReplWhat,
				corrReplWith: corrReplWith,
				splitSeparator: '\r\n',
				apiUrl: apiUrl,
				postData: postData,
				resLinkRegex: resLinkRegex,
				resLiveRegex: resLiveRegex,
				resDeadRegex: resDeadRegex,
				resUnavaRegex: resUnavaRegex,
				func: genBulkCheck,
				links: []
			}
			
			if (blockSize != null) { 
				BCObj.blockSize = blockSize;
			}
			if (splitSeparator != null) {
				BCObj.splitSeparator = splitSeparator;
			}
			if (func != null) {
				BCObj.func = func;
			}
			
			hostsCheck[hostID] = BCObj;
			aHCount++;
			
		}
		
		var genType1 = [];
		
						
		var genType2 = [];
		
		//xfilesharing 1.0
		function addGenericType1()
		{
			var i = genType1.length;
			
			while(i--)
			{
				var host = genType1[i].host;
				var apiUrl = genType1[i].apiurl;
				
				if (apiUrl == "default") apiUrl = "http://www." + host + "/checkfiles.html";
				
				if (hostSet("Check_" + host.replace(/\./g, "_dot_").replace(/-/g, "_dash_") + "_links", false))
				{
					var regexSafe = host.replace(/\./g, "\\.").replace(/-/g, "\\-");
					
					addHost(
						host, //hostname
						regexSafe + "\/\\w+", //linkregex
						null, //blocksize
						new RegExp("(https?:\/\/(?:|www\\.)" + regexSafe + "\/\\w+)",""), //corrmatch
						null, //corrreplwhat
						null, //corrreplwith
						null, //separator
						apiUrl, //api url
						"op=checkfiles&process=Check+URLs&list=", //postdata
						new RegExp("(" + regexSafe + "\/\\w+)",""), //linkregex
						new RegExp("<font color='green'>https?:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //liveregex
						new RegExp("<font color='red'>https?:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //deadregex
						new RegExp("<font color='orange'>https?:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //unavaregex
						null //function delegate
					)
				}
			}
		}
		
		//xfilesharing 2.0
		function addGenericType2()
		{
			var i = genType2.length;
			
			while(i--)
			{
				var host = genType2[i].host;
				var apiUrl = genType2[i].apiurl;
				
				if (hostSet("Check_" + host.replace(/\./g, "_dot_").replace(/-/g, "_dash_") + "_links", false))
				{
					var regexSafe = host.replace(/\./g, "\\.").replace(/-/g, "\\-");
					
					addHost(
						host, //hostname
						"https?:\/\/(?:www\\.|file\\.)?" + regexSafe + "\/\\w+", //linkregex
						null, //blocksize
						new RegExp("(https?:\/\/(?:|www\\.)" + regexSafe + "\/\\w+)",""), //corrmatch
						null, //corrreplwhat
						null, //corrreplwith
						null, //separator
						apiUrl, //api url
						"op=checkfiles&process=Check+URLs&list=", //postdata
						new RegExp("(" + regexSafe + "\/\\w+)",""), //linkregex
						new RegExp(regexSafe + "\/\\w+.*?\\s*<\/td>\\s*<td style=\"color:(?:green|#00f100);","g"), //liveregex
						new RegExp(regexSafe + "\/\\w+.*?\\s*<\/td>\\s*<td style=\"color:(?:red|#f10000);","g"), //deadregex
						new RegExp(regexSafe + "\/\\w+.*?\\s*<\/td>\\s*<td style=\"color:orange;","g"), //unavaregex
						null //function delegate
					)
				}
			}
		}
		
		// TEMPLATE
		// if (hostSet("Check__dot_com_links", false))
		// {			
			// addHost(
				// "", //hostname
				// "", //linkregex
				// null, //blocksize
				// null, //corrmatch
				// null, //corrreplwhat
				// null, //corrreplwith
				// null, //separator
				// "", //api url
				// "", //postdata
				// /()/, //linkregex
				// //liveregex
				// //deadregex
				// //unavaregex
				// null //function delegate
			// )			
		// }	
		
		
		addGenericType1();
		addGenericType2();

		if (hostSet("Check_mega_dot_co_dot_nz_links", false))
		{
			addHost(
				"mega.co.nz",
				"mega\\.co\\.nz\/#!\\w+",
				100000, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null,
				null,
				null,
				null,
				null,
				null,
				megaBulkCheck //function delegate
			)			
		}

		if (hostSet("Check_oboom_dot_com_links", false))
		{	
			addHost(
				"oboom.com", //hostname
				"oboom\\.com\/#?\\w{8}", //linkregex
				null, //blocksize
				/oboom\.com\/#?(\w{8})/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null, //api url
				null, //postdata
				null, //linkregex
				null, //liveregex
				null, //deadregex
				null, //unavaregex
				oboomBulk //function delegate
			)				
		}
		
		function genBulkCheck()
		{
			var blockIdx = this.links.length;
			
			while (blockIdx--)
			{
				postRequest(this.apiUrl, this.postData, this.links[blockIdx], 
					this.resLinkRegex, this.resLiveRegex, this.resDeadRegex, this.resUnavaRegex, this.separator);			
				
			}
			
			function postRequest(api, postData, links, linkRegex, liveRegex, deadRegex, unavaRegex, sep)
			{
				GM_xmlhttpRequest(
				{
					method: 'POST',
					url: api,
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': api,
						'X-Requested-With': 'XMLHttpRequest'						
					},
					data: postData + encodeURIComponent(links),
					onload: function (result)
					{
						var res = result.responseText;
						
						//console.log(res);
						
						if ((res.contains(">DDoS protection by CloudFlare") && res.contains(">Checking your browser before accessing<")) || res.contains('<iframe src="/_Incapsula_Resource?')) {
							DisplayTheCheckedLinks(links.split(sep), 'unknown_link', 'Captcha required to check links');
							sendMessage('Some links require you to fill out a captcha! Please open them manually.')
						}
						
						var i;

						var livelinks = res.match(liveRegex);
						var deadlinks = res.match(deadRegex);
						
						//console.log(livelinks);
						//console.log(deadlinks);
						
						if (livelinks != null)
						{
							i = livelinks.length - 1;
							do
							{
								livelinks[i] = livelinks[i].match(linkRegex)[1];
							}
							while (i--);
							DisplayTheCheckedLinks(livelinks, 'alive_link');
						}

						if (deadlinks != null)
						{
							i = deadlinks.length - 1;
							do
							{
								deadlinks[i] = deadlinks[i].match(linkRegex)[1];
							}
							while (i--);
							DisplayTheCheckedLinks(deadlinks, 'adead_link');
						}

						if (unavaRegex != null)
						{
							var unavalinks = res.match(unavaRegex)
							if (unavalinks)
							{
								i = unavalinks.length - 1;
								do
								{
									unavalinks[i] = unavalinks[i].match(linkRegex)[1];
								}
								while (i--);
								DisplayTheCheckedLinks(unavalinks, 'unava_link');
							}
						}
					},
					onerror: function (e) {
						var linkArr = links.split(sep);
						DisplayTheCheckedLinks(linkArr, "unknown_link");
					}
				});
				
			}
		}
		
		//specialized bulkchecking handlers follow
		function oboomBulk() {
			var a = [], b = [], c = [];
			var array = this.links;

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://www.oboom.com/1/guestsession',
				headers: {
					'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
					'Content-type': 'application/x-www-form-urlencoded',
					'Referer': 'https://www.oboom.com',
					'X-Requested-With': 'XMLHttpRequest'						
				},
				onload: function(result) {
					var blockIdx = array.length;
					var token = JSON.parse(result.responseText)[1];
					while (blockIdx--) {
						startCheck(array[blockIdx].split('\r\n'), token);
					}
				}
			});

			function startCheck(links, token) {
				GM_xmlhttpRequest({
						method: 'POST',
						url: "https://api.oboom.com/1/info",
						headers: {
							'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
							'Content-type': 'application/x-www-form-urlencoded',
							'Referer': 'https://www.oboom.com/',
							'X-Requested-With': 'XMLHttpRequest'						
						},
						data: "token=" + token + "&items=" + links.join(","),
						onload: function(result) {
							var res = JSON.parse(result.responseText)[1];
							var i = res.length, s;

							while (i--) {
								s = res[i].state;
								if (s == 'online') a.push(res[i].id);
								else if (s == 'blocked' || s == 'abused' || s == 'lost' || s == 'not_found') b.push(res[i].id);
								else c.push(res[i].id);
							}

							if (a.length > 0) DisplayTheCheckedLinks(a, 'alive_link');
							if (b.length > 0) DisplayTheCheckedLinks(b, 'adead_link');
							if (c.length > 0) DisplayTheCheckedLinks(c, 'unknown_link');
						}
					});
			}
		}

		function megaBulkCheck()
		{
			var arr = this.links[0].split("\r\n");
			var i = arr.length;
			var seqno = Math.floor(Math.random()*1000000000);
			
			while(i--)
			{	
				postRequest(arr[i]);				
			}
			
			function postRequest(megaLink)
			{		
				var id = megaLink.match(/mega\.co\.nz\/#!(\w+)(?:!\w+)?/)[1];

				GM_xmlhttpRequest(
				{
					method: "POST",
					url: 'https://g.api.mega.co.nz/cs?id=' + seqno++,
					data: '[{"a":"g","p":"' + id + '","ssl": "1"}]',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-Type': 'application/xml',
						'Referer': "https://mega.co.nz/"
					},
					onload: function (result)
					{
						var res = $.parseJSON(result.responseText.match(/\[(.+?)\]/)[1]);
						
						if ((typeof res == "number" && (res == -9 || res == -16 || res == -6)) || res.d) {
							DisplayTheCheckedLinks([id], 'adead_link');
						} else if (res.e == "ETEMPUNAVAIL") {
							DisplayTheCheckedLinks([id], 'unava_link');
						} else if (res.at) {
							DisplayTheCheckedLinks([id], 'alive_link');
						} else {
							console.warn("Error in checking Mega.co.nz! Please notify devs.\r\nError code: " + result.responseText);
						}
					}
				});
			}
		}
	}
		
	function initFileHosts()
	{
		var aOHCount = "1";
		function addObsoleteHost(hostName, linkRegex)
		{
			hostName = hostName.split("|");
			var i = hostName.length;
			
			var hostID = "OH" + aOHCount;
			
			while(i--) {
				var filehost = gimmeHostName(hostName[i]).replace(/\./g, "_dot_").replace(/\-/g, "_dash_");
				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}
			
			var OHObj = {
				links: []
			}
			
			hostsCheck[hostID] = OHObj;
			aOHCount++;	
		}

		var aFHCount = 1;
		function addFileHost(hostName, linkRegex, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop)
		{
			hostName = hostName.split("|");
			var i = hostName.length;
			
			var hostID = "WC" + aFHCount;
			
			while(i--) {
				var filehost = hostName[i].replace(/\./g, "_dot_").replace(/\-/g, "_dash_");

				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}
			
			var WCObj = {
				liveRegex: isAliveRegex,
				deadRegex: isDeadRegex,
				unavaRegex: isUnavaRegex,
				tryLoop: false,
				links: []
			}
			
			if (tryLoop) WCObj.tryLoop = true;
			
			hostsCheck[hostID] = WCObj;
			aFHCount++;
		}
		
		var genericWC = [	];
							
		var XFSPWC = 	[ 	"billionuploads.com"];

		var genThird =	[	]
		
		var gWC = genericWC.length;
		while(gWC--) {
			if (hostSet("Check_" + genericWC[gWC].replace(/\./g, "_dot_").replace(/\-/g, "_dash_") + "_links", false))
			{
				addFileHost(
					genericWC[gWC],	
					genericWC[gWC].replace(/\./g, "\\.").replace(/\-/g, "\\-") + "\/\\w+",
					/<div class="(?:download|captcha)PageTable"|<a class="link btn-free"|<span id="loadingSpinner">/,
					/<li>File (?:has been removed|not found)|<div id="uploaderContainer"/,
					'optional--'
				);
			}
		}
		
		var xWC = XFSPWC.length;
		while (xWC--) {
			if (hostSet("Check_" + XFSPWC[xWC].match(/[\w\.\-]+/)[0].replace(/\./g, "_dot_").replace(/\-/g, "_dash_") + "_links", false))
			{
				addFileHost(
				XFSPWC[xWC],	
				"(?:" + XFSPWC[xWC].replace(/\./g, "\\.").replace(/\-/g, "\\-") + ")\/\\w+",
				'name="method_free"|id="btn_download"|value="Free Download"',
				/>(?:File not found|The file was removed by administrator|Datei nicht gefunden|No such file|The file you are trying to download is no longer available)\s*<|<div id="div_file" class="upload_block">/i,
				'>This server is in maintenance mode|<img src="/images/under.gif"',
				true);
			}
		}

		var tWC = genThird.length;
		while (tWC--) {
			if (hostSet("Check_" + genThird[tWC].match(/[\w\.\-]+/)[0].replace(/\./g, "_dot_").replace(/\-/g, "_dash_") + "_links", false))
		{
			addFileHost(
			genThird[tWC],	
			"(?:" + genThird[tWC].replace(/\./g, "\\.").replace(/\-/g, "\\-") + ")\/newfile\\?n=\\w+",
			'<div class="downloadfree">',
			'div_file"',
			'optional--'
			);
			
			
		}
		}

		if (hostSet("Check_megafileupload_dot_com_links", false))
		{
			addFileHost(
			"megafileupload.com",
			"megafileupload\.com\/..\/file\/",
			'downloadbtn',
			'is not found',
			'optional--');

		}
	}

	//hosts with direct download, so they must be requested for headers only
	function initFileHostsHeadersOnly()
	{
		var aFHHCOCount = 1;
		function addFileHostHeadersOnly(hostName, linkRegex, isAliveRegex, isDeadRegex)
		{
			hostName = hostName.split("|");
			var i = hostName.length;
			
			
			var hostID = "HC" + aFHHCOCount;
			
			while(i--) {
				var filehost = hostName[i].replace(/\./g, "_dot_").replace(/\-/g, "_dash_");

				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}
			
			var HCObj = {
				liveRegex: isAliveRegex,
				deadRegex: isDeadRegex,
				links: []
			}
			
			hostsCheck[hostID] = HCObj;
			aFHHCOCount++;
			
		}
	
		if (hostSet("Check_uloziste_dot_com_links", false))
		{
			addFileHostHeadersOnly(
			'uloziste.com',	
			"(?:|files\\.)uloziste\\.com\/\\w+\/\\w+",
			'Connection: Keep-Alive',
			'Content-Length: 3857'); 

        	}
	}
} //end of function start