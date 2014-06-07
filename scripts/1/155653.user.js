// ==UserScript==
// @id             www.protopage.com-17d69ab3-7168-4dd1-92d6-a02f716feadb@scriptish
// @name           protopage no margin top
// @version        1.0
// @namespace      
// @author         SpineEyE
// @description    Makes prototype header completely toggable so that all your space belongs to you 
// @include        /^https?:\/\/(?:www\.)?protopage\.com\/[a-z]+(\#.*)?/i
// @run-at         document-end
// ==/UserScript==

var REMOVE_ADS = false;

var bodyChildren = document.body.children,
	titleBox = document.getElementById('status-indicator').nextSibling,
	searchTab = document.getElementById('search-tab'),
	otherButtons,
	ads = new Array(),
	nAds = 0,
	mainContent = document.getElementById('controlAreaOverlay').nextSibling.nextSibling;

var i = bodyChildren.length;
while(i--) {
    var el = bodyChildren[i];
    
	if (el.style.zIndex == 90087 || el.style.zIndex == 90086) {
		if (REMOVE_ADS) {
			el.style.display = 'none';
		}
		else {
			ads.push(el);
			nAds++;
		}
	}
	else if (el.style.zIndex == 90080) {
		otherButtons = el;
		break;
	}
}

var plusButton = document.createElement('div');
plusButton.id = 'plusButton';
plusButton.innerHTML = '+';
plusButton.style.position = 'absolute';
plusButton.style.zIndex = '90100';
plusButton.style.width = '25px';
plusButton.style.left = '-16px';
plusButton.style.top = '30px';
plusButton.style.backgroundColor = 'white';
plusButton.style.fontSize = '20px';
plusButton.style.fontWeight = 'bold';
plusButton.style.border = '3px solid red';
plusButton.style.borderRadius = '10px';
plusButton.style.padding = '2px';
plusButton.style.textAlign = 'right';
plusButton.style.cursor = 'pointer';

function toggle() {
	if (mainContent.style.top == '10px') {
		titleBox.style.visibility = 'visible';
		searchTab.style.visibility = 'visible';
		otherButtons.style.visibility = 'visible';
		mainContent.style.top = '199px';
		var i=nAds;
		console.log("i:"+i);
		while(i--) {
		console.log(ads[i]);
			ads[i].style.display = '';
		}
		plusButton.innerHTML = '-';
		
		// to trigger readjustment of all the buttons
		window.setTimeout(function(){
			window.scrollBy(1,1);
			window.setTimeout(function() {
				window.scrollBy(-1,-1);
			}, 10);
		},200);
	}
	else {
		titleBox.style.visibility = 'collapse';
		searchTab.style.visibility = 'collapse';
		otherButtons.style.visibility = 'collapse';
		mainContent.style.top = '10px';
		var i=nAds;
		console.log("i:"+i);
		while(i--) {
		console.log(ads[i]);
			ads[i].style.display = 'none';
		}
		plusButton.innerHTML = '+';
	}
}

plusButton.onclick = toggle;

window.onload = function() {
	document.body.insertBefore(plusButton, document.getElementById('status-indicator').nextSibling);
	toggle();
/*
	window.setTimeout(function() {
		document.body.insertBefore(plusButton, document.getElementById('status-indicator').nextSibling);
		console.log(document.body.children);
		toggle();
	}, 2000);
	*/
}