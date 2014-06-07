// ==UserScript==
// @name           hammertime
// @namespace      bunedoggle.com
// @description    Drop the Ban Hammer on any commenter you want.  Wield the ultimate power.  Disemvowel your fellow commenters with stark impunity.  Works on all Gawker Media Blogs.  Enable or disable commenters by clicking the little ban hammer next to thier name.
// @include        http://www.gizmodo.com/*
// @include        http://www.lifehacker.com/*
// @include        http://www.jalopnik.com/*
// @include        http://www.gawker.com/*
// @include        http://www.defamer.com/*
// @include        http://www.jezebel.com/*
// @include        http://www.kotaku.com/*
// @include        http://www.deadspin.com/*
// @include        http://www.valleywag.com/*
// @include        http://www.io9.com/*

// @include        http://gizmodo.com/*
// @include        http://lifehacker.com/*
// @include        http://jalopnik.com/*
// @include        http://gawker.com/*
// @include        http://defamer.com/*
// @include        http://jezebel.com/*
// @include        http://kotaku.com/*
// @include        http://deadspin.com/*
// @include        http://valleywag.com/*
// @include        http://io9.com/*
// ==/UserScript==

//############
// Images
var hammer_up   = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%E1%00%16Exif%00%00II*%00%08%00%00%00%00%00%00%00%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.'%20%22%2C%23%1C%1C(7)%2C01444%1F'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%12%00%11%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%D0%F1%E7%C5%89%AC5mGG%95%EE%B4%B6%B2%B9%F2%C46%8B%9B%AB%A1%80%CA%FEc%0D%91%23%03%E8%ECGaR%FC-%B8%F1%AE%BB%E2%18%F5%B9m%D6%C3%C3%8E%8F%BDe%90%CB-%D1%C6%14%97r%5D%88%3D%F2%14%00%40%038%AFS%BB%F0%CE%89%7F%ACC%AB%5D%E9v%B3_%C2%BBRy%23%05%80%FF%009%AEg%C1j%FE%1D%F1F%B9%E19%10%AD%B7%98u%1D8%E3%83%0C%87%E7Q%FE%EB%E7%F3%A4%DD%87%BA%3B%CA)3E1%07z%A9-%95%AC%9A%AD%BD%E3%DBB%D7QF%EB%1C%CD%18.%80%ED%C8%0D%D4%03E%14%98%D1n%8A(%A6%07%FF%D9";
var hammer_down = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%E1%00%16Exif%00%00II*%00%08%00%00%00%00%00%00%00%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.'%20%22%2C%23%1C%1C(7)%2C01444%1F'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%11%00%12%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%D0%F8%AD%E3%AB%FB%09%DA%5D%23T%BC%B1%3At%E2%DA%11%161urp%D2oV%042F%9B%7D%8BJ%3D%2B%D5%FC3w%A8_xkN%BB%D5aXo%E5%81%5Ed%5E%81%88%FF%00%3D%EB%CBn%3E%17%EA%FA%E7%C4%88%24%D6%A2%8EO%0E%D9%06%91%5C%CA3u%23%92%EEJ%8EA.%C7%3D%00UP%09%C0%AE%B1%7C%19%AExvE%93%C2~%20%9B%EC%CAy%D3uBf%84%8FE%7F%BE%9F%99%A4%DD%87%A3%3B%CEh%AA%16sj%12Y%5B%BD%DD%9C%11%5C%B4jf%8Dg%C8W%C7%CC%01%DB%CE%0Eh%A2%E1cB%90%D1E%0CH(%A2%8A%0A%3F%FF%D9";
var unban_hammer= "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%E1%00%16Exif%00%00II*%00%08%00%00%00%00%00%00%00%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.'%20%22%2C%23%1C%1C(7)%2C01444%1F'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%12%00%11%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%A5%E2%FF%00%1F%9Dk%5B%9A%D6%F9%A4%86%D1'I-%2C8%13%150%86V%C9C%10%DF%B8r%DB%C8%C9%DB%EAg%F0%24%FE0%B5k%AF%13%E9%FA4VZ%0C0%B3%BD%A3%DC9%FBB%A9%F9%8E%5D%89%DC%06%E3%B8%00%06%DC%01%CE%D3%E8%D0X%F8sN%D5%E0%B7%F1%16%9Fao%7Ba%08%8FO%BF%B9%2B%B6%E2%DDp%AB%F3%1C%0F1A%01%97%D7%91%C1%E3%87%B6%3A%A5%86%B9%E2%1F%0D%F8bD%D4%AC%F5%12%ED%0Ci%22I%0A%C3%22%7C%C40a%B1%D0%FC%BC%F0AQ%D8g%8AmE_%AF%E3%7F%EB%FA%B1%F4%B4c%3A%B5%14-h%2F%FC%01%C3%7Dz-%3A%EF%7D%ED%2B%B3%D2%BF%E1fxC%FE%82%FF%00%F9-%2F%FF%00%11Ec%FF%00%C2%9D%F0%F7%FC%FEj%9F%F7%F6%3F%FE%22%8A%7C%D8%AE%CB%FA%F9%93%ECr%0F%F9%F9S%F0%FF%00%23%BD%B9%B5%B7%BD%81%ED%EE%E0%8Ax%1F%1B%A3%95%03%2B%60%E4d%1E%3A%81Y%D0%E8%9AM%96%A3m-%A6%97eo%22G.%D7%8A%DD%10%AEv%83%82%07%19%C0%FC%A8%A2%B5%97%F1W%A1%E7S%FF%00p%97%F8%BFDk%D1E%15%B1%E7%1F%FF%D9";
var p = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.'%20%22%2C%23%1C%1C(7)%2C01444%1F'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%01%00%01%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%F7%FA(%A2%80%3F%FF%D9";

var pixel = document.createElement('img');
pixel.src = p;
pixel.setAttribute('id','pixel');
document.body.insertBefore(pixel, document.body.lastChild);

var hammerUp = document.createElement('img');
hammerUp.src = hammer_up;
hammerUp.setAttribute('id','hammerUp');
hammerUp.setAttribute('height','0');
document.body.insertBefore(hammerUp, document.body.lastChild);

var hammerDown = document.createElement('img');
hammerDown.src = hammer_down;
hammerDown.setAttribute('id','hammerDown');
hammerDown.setAttribute('height','0');
document.body.insertBefore(hammerDown, document.body.lastChild);

var unbanHammer = document.createElement('img');
unbanHammer.src = unban_hammer;
unbanHammer.setAttribute('id','unbanHammer');
unbanHammer.setAttribute('height','0');
document.body.insertBefore(unbanHammer, document.body.lastChild);

//############
// Functions

function unHammer(thisElem){
	var unbanHammer = document.createElement('img');
	unbanHammer.src = unban_hammer;
	unbanHammer.setAttribute('Title' ,  "Free this user to comment again.");
	unbanHammer.addEventListener('click', (function(n) {
		return function (e) {
			e.preventDefault();
			GM_setValue(n, 0);
			alert("You have unbanned this user.  Comments will show up again after reloading the page.");
		};
	})(thisElem.id), false);
	thisElem.parentNode.insertBefore(unbanHammer, thisElem.nextSibling);

	var banned = thisElem.id;
	banned = banned.replace(/.+_/, "commentContent");
	document.getElementById(banned).innerHTML = document.getElementById(banned).innerHTML.replace(/[aeiou]/gi, "");
}

function hammer(thisElem){

	var hammer = document.createElement('img');
	hammer.src = hammer_up;
	hammer.setAttribute('id' , "hammer_" + thisElem.id); 
	hammer.addEventListener('click', (function(n) {
		return function (e) {
			e.preventDefault();
			GM_setValue(n, 1);
			banned = n.replace(/.+_/, "commentContent");
			// Disemvoweling
			document.getElementById(banned).innerHTML = document.getElementById(banned).innerHTML.replace(/[aeiou]/gi, "");
			unHammer(document.getElementById(n));
			alert("Ban Hammer has dropped!");
			document.getElementById("hammer_" + n).src=document.getElementById('pixel').src;
		};
	})(thisElem.id), false);

	hammer.setAttribute('onMouseOver' , "javascript: this.src=document.getElementById('hammerDown').src;");
	hammer.setAttribute('onMouseOut' ,  "javascript: this.src=document.getElementById('hammerUp').src;");
	hammer.setAttribute('Title' ,  "Ban this user.");
	thisElem.parentNode.insertBefore(hammer, thisElem.nextSibling);
}


//################
// Main

var elems, thisElem;

// Create list of comments 
elems = document.evaluate(
    "//a[@class='user-friend-follow user_actions commentToolAdd']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

if(!elems.snapshotLength){
	return;
}

// Operate on each comment
for (var i = 0; i < elems.snapshotLength; i++) {

      thisElem = elems.snapshotItem(i);

	if(GM_getValue(thisElem.id , 0)){
		unHammer(thisElem);
	}
	else {
		hammer(thisElem);
	}

}

