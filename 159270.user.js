// ==UserScript==
// @name        Steam Store Search - Hide your owned games
// @namespace   SSSHyog
// @description Hides games you own on Steam Store
// @include     http://store.steampowered.com/search*
// @include     https://store.steampowered.com/search*
// @include     http://store.steampowered.com/browse*
// @include     https://store.steampowered.com/browse*
// @version     1.0.4
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @require     http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @require     https://raw.github.com/jquery/jquery-color/master/jquery.color.js
// @require     https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// set up localStorage
var ownedGames = [];
var wishlistGames = [];
if (localStorage.getItem('ownedGames') === null) {
	localStorage.setItem('ownedGames', JSON.stringify(ownedGames));
}
if (localStorage.getItem('wishlistGames') === null) {
	localStorage.setItem('wishlistGames', JSON.stringify(wishlistGames));
}

// load localStorage
var storageGames = localStorage.getItem('ownedGames');
ownedGames = JSON.parse(storageGames);
var storageWishlist = localStorage.getItem('wishlistGames');
wishlistGames = JSON.parse(storageWishlist);

// save localStorage
function saveStorage(key,data) {
	data = clearArray(data);
	localStorage.setItem(key, JSON.stringify(data));
}

if($.cookie('birthtime') == 'undefined') {
	$.cookie('birthtime', '452156401', { expires: 1337, path: '/' });
}

// clear out storage from duplicates and sort it
function clearArray(arr) {
	var uniqueArr = [];
	$.each(arr, function(i, el) {
		if($.inArray(el, uniqueArr) === -1) uniqueArr.push(el);
	});
	uniqueArr.sort(
		function(a,b) {
			return a-b;
		}
	);
	return uniqueArr;
}

function getAppID(url) {
	var createURL = document.createElement('a');
	createURL.href = url;
	var pathSplit = createURL.pathname.split('/');
	var appID = pathSplit[2];
	return appID;
}

function getOwnedStatus(url) {
	var appID = getAppID(url);
	setTimeout(function() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(response) {
				var httpResponse = response.responseText;
				var gameOwned = /class="game_area_already_owned"/i;
				var gameWish = /class="game_area_wishlist_btn disabled"/i;
				var gameWishAdd = /AddToWishlist/i;
				var wishCheck = gameWish.exec(httpResponse);
				var wishAddCheck = gameWishAdd.exec(httpResponse);
				var ownedCheck = gameOwned.exec(httpResponse);
				if (ownedCheck != null || wishCheck != null) {
					if (ownedCheck != null) {
						if(ownedGames.indexOf(appID) == -1) {
							ownedGames.push(appID);
							saveStorage("ownedGames", ownedGames);
						}
						if(loc.indexOf("browse") != -1) {
							$('[href="'+url+'"]').parent().parent().css('opacity','0.3');
						} else {
							doBUNT('own', url);
						}
					}
					if (wishCheck != null && wishAddCheck == null) {
						if(wishlistGames.indexOf(appID) == -1) {
							wishlistGames.push(appID);
							saveStorage('wishlistGames', wishlistGames);
						}
						if(loc.indexOf('browse') != -1) {
							$('[href="'+url+'"]').parent().parent().css('border','1px solid pink');
						} else {
							doBUNT('wish', url);
						}
					}
					return true;
				} else {
					doBUNT('nope', url);
					return false;
				}
			}
		});
	}, 0);
}

function checkOwnedStatus(url) {
	var appID = getAppID(url);
	if (ownedGames.indexOf(appID) != -1) {
		doBUNT("own", url);
		return true;
	} else {
		var test = url.toString();
		if (test.indexOf("app") > 0) {
			getOwnedStatus(test);
		}
		return false;
	}
}

function doBUNT(what, url) {
	switch(what) {
		case 'own':
			$("[href='"+url+"']").css({
				"background-image": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAE0lEQVQYlWOIi4tjIA/g0znM5QCs/AsFegzUOAAAAABJRU5ErkJggg==')",
				"border-style":"dotted solid",
				"border-width":"-4px -4px"
			});
			$("[href='"+url+"']").animate({
				opacity: 0.1,
				borderLeftColor:"Black",
				borderRightColor:"Black",
				borderTopColor:"Black",
				borderBottomColor:"Black",
				backgroundColor:"Black"}, 1000, function() {
					$("[href='"+url+"']").fadeOut(1000);
				}); break;
		case 'wish':
			$("[href='"+url+"']").css({
				"border-style":"solid",
				"border-width":"1px 5px"
			});
			$("[href='"+url+"']").animate({
				borderLeftColor:"Red",
				borderRightColor:"Red",
				backgroundColor:"Black"}, 2000); break;
		case 'free':
			$("[href='"+url+"']").css({
				"background-image": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAE0lEQVQYlWOIi4tjIA/g0znM5QCs/AsFegzUOAAAAABJRU5ErkJggg==')",
				"background-color":"Navy",
				"border-color":"white",
				"border-style":"dotted solid",
				"border-width":"1px 5px"
			});
			$("[href='"+url+"']").fadeTo( 2000, 0.5 ); break;
		case 'nope':
			$("[href='"+url+"']").css({
				"background-color":"Blue"
			}); break;
	}
}


function doIT (jNode) {
	$.each($('.search_result_row'), function(index, value) {
		var url = value.getAttribute("href");
		var gameF2P = $(this).children('.search_name').children('p').text();
			if (gameF2P.indexOf("Free to Play") != -1) {
				doBUNT("free", url);
				return;
			} else {
				checkOwnedStatus(url);
			}
		var appID = getAppID(url);
		if (wishlistGames.indexOf(appID) != -1) {
			if(ownedGames.indexOf(appID) == -1) {
			doBUNT("wish", url);
			}
		} else {
			var test = value.toString();
			if (test.indexOf("app") > 0) {
				checkOwnedStatus(value.getAttribute("href"));
			}
		}
	});
}

loc = location.href;
if(loc.indexOf("browse") != -1) {
	$.each($(".tab_overlay > a"), function(index, value) {
		var url = value.getAttribute("href");
		var appID = getAppID(url);
		if (ownedGames.indexOf(appID) != -1) {
			$("[href='"+url+"']").parent().parent().css("display","none");
		} else {
			var test = value.toString();
			if (test.indexOf("app") > 0) {
				checkOwnedStatus(value.getAttribute("href"));
			}
		}
		if (wishlistGames.indexOf(appID) != -1) {
			$("[href='"+url+"']").parent().parent().css("border","1px solid pink");
		} else {
			var test = value.toString();
			if (test.indexOf("app") > 0) {
				checkOwnedStatus(value.getAttribute("href"));
			}
		}
	});
}
if(loc.indexOf("search") != -1) {
	waitForKeyElements (".results_description", doIT);
}

// if(location.pathname.indexOf("") != -1) {
	// waitForKeyElements (".tab_row", doIT2);
// }