// ==UserScript==
// @name	Handicaching
// @namespace	inge.org.uk/userscripts
// @description	Makes geocaching more accessible
// @match	http://www.geocaching.com/geocache/GC*
// @match	http://www.handicaching.com/rate.php*
// @match	http://www.handicaching.com/show.php*
// @version	0.0.4
// @license	MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright	2011-14, James Inge (http://geo.inge.org.uk/)
// @icon	http://s3.amazonaws.com/uso_ss/icon/113831/large.png
// @grant	GM_log
// @grant	GM_xmlhttpRequest
// @grant	GM_addStyle
// @updateURL	http://geo.inge.org.uk/userscripts/handicaching.meta.js
// ==/UserScript==

(function () {
	"use strict";

	function getGCref() {
		var gccode, gccodeDiv = document.getElementById("ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode");
		if( gccodeDiv ) {
			gccode = gccodeDiv.innerHTML.match(/GC[A-Z0-9]+/);
			if( gccode ) {
				return gccode[0];
			}
		}
		GM_log("Couldn't work out GCcode");
		return null;
	}

	var gccode, target, t1, waypoint;
	if( document.location.host === "www.handicaching.com" ) {
		// On handicaching.com
		target = document.getElementById("contenttitle");
		if(target) {
			waypoint = target.innerHTML.match(/GC[A-Za-z0-9]{1,5}/);
			target.innerHTML = target.innerHTML.replace(waypoint, ["<a href='http://coord.info/", waypoint, "'>", waypoint, "</a>"].join(''));
		}
	} else {
		// On geocaching.com
		t1 = document.getElementById("uxFavContainerLink");
		if( t1 ) {
			target = t1.parentNode.parentNode;
		} else {
			target = document.getElementById("ctl00_ContentBody_trNotLoggedIn");
		}

		gccode = getGCref();

		if( target && gccode ) {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://www.handicaching.com/show.php?waypoint=" + gccode,
				onload: function(response) {
					var h,d,t, handiDiv = document.createElement("div"),
					rating = "<strong>" + gccode + "</strong>",
					goicon = "<img width='16' height='16' alt='Go', style='vertical-align:middle;'src='data:image/gif;base64,R0lGODlhEAAQAMQAAAAAAP%2F%2F%2F%2F%2F372g2CPmAFGMzCMNkEJ5RDfmJJfqRM%2FqZQ%2FqaRfuqYvy2ePy7gfzEkf3Vsf7m0Py7gv3Mof7u4P%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABUALAAAAAAQABAAAAVNoNOMZFkiC6GuLHukbay%2Bskyr0lMTNwEFAYgi1iNIKMCIxAVjKX7AIa%2FJkkSAjBk1MQEGpdPVAyjQtXqTCPhM3YXdq6L7YBjY73h8IQQAOw%3D%3D' />",
					linkicon = "<img width='88' height='32' title='Handicaching.com' alt='Geocaching Accessibility Ratings' src='data:image/gif;base64,R0lGODlhWAAgAPcAAAAAAP%2F%2F%2F8qPDvv%2FlsyTF8GRLbsoKJ13P%2Fr8lfr5jfj4jfTwhPnzhPfte%2FHpe%2B%2Ficu7hcvnue%2Bvaafjoc%2FXmcvLkcvHjcufSYPbiauTLV%2FbdYfDZYOfITuPFTuHDTfXXWOvPV%2B7IRt68RPXRT%2B%2FNT%2BvLT%2BTGXOfCRfLANOy7NOK1M92xM9etMvv47%2FG0I%2B%2B0I%2BSsItGeIOekEOajEOWiEOShENqbD9maD9iZD9eYD9aXD8yQDsuPDu%2BpEe6oEeynEeumEemlEeOgEOKfEOGfEN6dEN6eEN2dENybENubENSVD9SXD9KVD9CTD8%2BSD86RD8uSFM2WHNacH9GYH86WHs6ZJdulL%2FG1NNSgLu2yNNGeLuSsM%2BCpMtqlMtKfMdShMt2rP9WlPtyrQeO0UNmtTtqwVebBb%2BS%2Fb%2BK%2Bb9%2B8burJf%2BPDfuPFgvHTj%2B%2FRj%2BzPj%2BbLj%2BjOlu7Vn%2BrSn%2BvUovHcr%2B3ar%2Fblv%2FHhv%2FTozPbqz%2FTpz%2Fjw3%2Fr05%2Fz478yPDu6mEuujEsmLD6x2DtSaH72KIb%2BNJuqvM8CPK8GQLMKTMciWNMSUM8OUM8aVNNClUeO4YdCsYevCcOfAcuvIgOrHgOnGgOjGf%2BjFgOXEf%2BTDf%2BLCf92%2Bf9m7ftq8f%2FLRkOzTn%2FTjv%2BqfE8mGEM%2BLEal5IrKIOuPFjdjAlu7YsfHfv%2BiXFOeVFeG9gPXhwIVWEpNpKpJnKpRpK5FnKplxNpt0O5x1PZ13Psy5nd3Kr9vJr9nIr9XFrtiGFY1oN7WdftzJr9jHr9fGr9zNuNvRxM18FOCGF9N%2BFsZ1FXdLE4JZJZRxRGU7DXdRKIlnQt2qc8xzF8VrF9p2GurFo8trGeGndcVjGshgG9RmHcNcG9V2O9eGVOCed8xbHtyVb81WIMNSHs9xRspOIcBKIN6eiOKql8ZFI79BIshYO8tZQL47I8tiT703JME4JcJEMr0yJslZUfbj4r0uJ7wrJ7wsJ7srJ%2BSrqe%2FLyrspKMRFRc1hYdZ%2BftuMjN%2Bbm%2Bi3t%2Frx8SwAAAAAWAAgAEAI%2FwCJERsWLNiug7p0AcvFsKHDhw6BJTy4q6Cwi7wyatzIsaPHjx9xLWMma5GUJThsHDEihIaMIEB8%2BJCGz4BNQD00JOjRQ%2BaAIBQYkChRQkUFC0yaPIDAVIDTDANECBjgoanTqU7DGUA2wGlXAUytUr16FYqhWrMaUeEToG0AHWoC2DTAT67Nuvzy7pu3zVVbG2NCtW0SYA2Pwk4DCEDMeM1ixwLSBCj3b%2B7cd4LIat5sFq3aq9neZRslgAePHaifQKtpANyT16h3mHYqOUCaMG7DLEa8O03ktlfnBOAjQDjx4sN3z3HKdrnuNHBaDD9bUoqOG0iMEKkxA6YPnjwBtf%2FDBl7DgA8jMAwAEmRGDSJGkNzQoaSJE9mb81%2F9ul%2B%2Ff6edxcLIFExcEoAr7Vim4FziGBPID0CwJ4N7QxhxRBI46KDHGU7w5tQeviEG4mNkCRLNgjbJU4xXAwxwQX6dpUWFU6ftAA2KCkKDw4456LCEEvU1gUZbvgnAFnHCuRXAHr8pmUaSAtijZFutgAPPlAEst8aUdJwl43%2F6WQPmmGSOWZtbeOjX2QGPiNEFF1xsscUhh2SRxRV45nnFIXr2aSedcsLZxaBfeGHooYgmquiijDIqSCG0VKcDDkkUsd0MMsT0XQ%2BrzGOAOTxNEAF4MgGRwgApwDBAUQOssMIALLD%2FAKsAEgiQgQAxwCorC7ROdeskJmDlqwAKXLBrrh5wdhYsjhACJDgG4EOPOd1IYwwQ3ShoDE8oMNDiAA3IQMMG34KggwUtPsADWC0qkOsACowFQbvCumNAPd54JYAgkEAiwAIDAJysZjEO2KEVAZhxDD4B9EPXPg0%2FHAA%2F%2BNxzD8TpaDONJAFwYYUcSgSQyQ4BpGlHCyQ2pkUAqZCTTwD5GGDxgtGUKUCMjcThB2pO1KFHMf24pU%2FQbekDcVt3jOGWHEpjOWWIjjHWFhxtrcEHW%2BegKA9pZOI841XWWMaONaQUQ49l1wDJRFL2PYHamW4t5xQZc%2BDBlm1NBjecIFIe%2F2fcbpA1t1vJcIThtc08hK3OuvrVVqQdbeGxZVuQ4y3AHm49mdzfyB1X%2BR7SLTclH1WclUwpiBSg%2Buqst%2B7667DHLvvstLOuiCnL%2FILKKZy0sskmmmRyCSaWVFIJJcgnr3zyxluCySWZaPJ7K5xU74knnWSv%2Ffbcd%2B%2F9995HMogykmKnHXfegceTMdKojwIGE2jwAnvuwYdEhvXdx3iZ%2FDk1sM0Aoo5JrpOdS6UPPNgwwDe4NQAXgGd%2BQQhBAgawAflwQAEK6IBsRBAvCAjAAS26lQA4OAAPDgAqC3CKB8GCQv9hEAK8IpgArZOSIxBBCJgCwg82ZQ6btCNUE%2BDJt%2F%2BAoB4KUGAAFThKfZYiAQeQxQMgpEoTyfKVbYRDWF9hyhSn8r%2ByLMsRUlBCMboBjV5cKlM%2FEMU7LMOKHrhgABroyQ8GIAMSDAAG8TkBBwbABCdQxQNfEQEEnIgsQDpFKl9BhwHUgQB9gQUCUPFKFwNYC2Y5awmWSAeOFNQ%2BmfgAQkGY0HssZIMcmMEKTRjRVdKghcv5hpX%2BmYs8opGNcbDDAOwgTQy8EkOyBGhATbhaAHohDwPkIx4BiEc%2BjpnMZSLzHtroxSfa0gYiuKEtb1CCHMjwhJK1oAWtnAMZSCROMgxHFc%2BYRtb04Y8F1QMZZfIaHPzABJ%2FhoBp2MQDE5gL%2FMYshUx8B8Ac5eqG0OqhBCUwQGckgo5jGpGwTAkBGPOxhgADogzU2GQcAvRYALDiBMKe0qDEhpo%2BRBmAfBpAHN8bAhSNwIQBjsAIY6hAAUAQgD1tyzBpQ5lCWSQYOyGkLOVCUDZsdrkYfzdomDXCMJNjABjfAQY%2FUNqQAwCENk2NSGNYwh64WiQpUs00aqBCGNPRhDuvYhz7ccYppeMMm4KACV9dAhts4ZatdXUPpPPO10vzhlpahx9ksQw0d%2BAhICG1bVa%2BaJMekoUi1IQNYiTTWv0mpMLVhEuYw2xbRIUaubPDSZ5wiiDXiYxzI2METnOAEaNRjLtlogmxZ6zbUqvCgNniQjuXCuockvRI4TjHOKKaRnM71hjlZEsDk3BJavl4FnpsxzQ4EcCIDjOMPtt0fbYik3LbwtGSaw5s5rbqGMPyNc%2Bf1rm5FZ4fHsgUPou1rmbLBDgBqpqy62UxdizQmMthhDdCp2l0fO6POvGIQUCCAghfM4AY7%2BMEQjrCEJ0yAKrCBDhguQ4SjkAhbNMMXtziAiEdM4hKb%2BMQoTrGKV8ziEi%2FDGQEBADs%3D' />";
					if(response.responseText.match(/Sorry, we could not find that cache in our database/)) {
						rating += " has no rating yet. &nbsp;";
					} else {
						h = response.responseText.match(/Average rating:&nbsp;<\/td>\s*<td><b>(H[1-5]{5})/);
						d = response.responseText.match(/Average difficulty:&nbsp;<\/td>\s*<td>.*<\/td>\s*<td>\(([1-5]|[1-4]\.5)\)<\/td>/);
						t = response.responseText.match(/Average terrain:&nbsp;<\/td>\s*<td>.*<\/td>\s*<td>\(([1-5]|[1-4]\.5)\)<\/td>/);
						if(h && d ) {
							rating = [
								rating,
								" is rated ",
								h[1], " D", d[1], "/T", t[1],
								". &nbsp;<a href='http://www.handicaching.com/show.php?waypoint=",
								gccode,
								"'>",
								goicon,
								" See details</a> &nbsp;"
							].join("");
						} else {
							GM_log("Couldn't extract HCode from Handicaching.com");
							return;
						}
					}
					
					handiDiv.id = "handicaching";
					handiDiv.className = "handistyle";
					handiDiv.innerHTML = [
						"<strong>Handicaching</strong> - Geocache accessibility ratings <a href='http://www.handicaching.com/' style='float:right;'>",
						linkicon,
						"</a><br />",
						rating,
						"<a href='http://www.handicaching.com/rate.php?waypoint=",
						gccode,
						"&step=2'>",
						goicon,
						" Rate this cache</a>"].join("");
					GM_addStyle(".handistyle{border:1px solid #F98014;margin:1em 0 1em;padding:0.5em;-moz-border-radius: 0.5em;border-radius: 0.5em;clear:both;} .handistyle a{color:#F98014 !important;font-weight:bold;text-decoration:none;}");
					target.parentNode.insertBefore(handiDiv,target.nextSibling.nextSibling);
				}
			});
		} else {
			GM_log("Unexpected document structure");
		}
	}
}());