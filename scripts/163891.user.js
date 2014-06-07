// ==UserScript==
// @name       movie2k-memory
// @include http://www.movie2k.to/*
// @version    0.2
// @description  remembers viewed episodes at movie2k and marks them green
// @run-at document-end
// @copyright  2013, b7r
// @grant       none
// ==/UserScript==

var bodyHTML = document.body.innerHTML;
var bodyChangeInterval = setInterval(bodyChange, 100);

function bodyChange() {
	if(document.getElementsByTagName('div')[0].id != 'dvg-loginform') {
		document.getElementsByTagName('div')[0].style.display = 'none';
		document.getElementById('menu').style.top = '263px';
		clearInterval(bodyChangeInterval);
	}
};

var div = document.getElementById('episodediv1');

if (div != undefined) {	
	viewReset();
}

function viewReset() {
	var season = document.getElementById('menu').getElementsByTagName('select')[0].selectedIndex + 1;

	div = document.getElementById('episodediv'+season);
	var s = div.getElementsByTagName('select')[0];
	s.onchange = function() { 
		gotoEpisode(this.value);
		setViewed(this.value);
	};
	
	var episode = document.getElementById('menu').getElementsByTagName('select')[0];
	episode.onchange = function() {
		displayEpisodePulldown(this.value);
		season = this.value;
		viewReset();
	};
		
	var o = div.getElementsByTagName('option');
	var a = readCookie('monkeyViewed').split('##');
	var check = false;
	var checkInt = 0;
	
	for (var x=0; x<a.length; x++) {		
		for (var i=0; i<o.length; i++) {
			if(a[x] == o[i].value) {
				o[i].style.background = '#5FB404';
				
				if(check == false && i == s.selectedIndex) {		
					checkInt++;
					if(checkInt == 2) {
						document.getElementsByClassName('moviedescription')[0].innerHTML += '<br><span style="color:green;font-weight:bold;">You have seen this episode already.</span>';
						check = true;
					}
				}
			}
		}
	}	
	
	document.getElementById('MarketGidComposite2778').innerHTML = '<a style="margin-left:10px;" href="javascript:void(0)" id="resetHistory">Reset History</a>';
	document.getElementById('resetHistory').onclick = function() {
		eraseCookie('monkeyViewed');
	};
}

function setViewed(v) {
    var date = new Date();
	date.setTime(date.getTime()+(14*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = 'monkeyViewed='+readCookie('monkeyViewed')+'##'+v+expires+'; path=/';
}


function readCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') 
			c = c.substring(1,c.length);
			
		if (c.indexOf(nameEQ) == 0) 
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else {
		var expires = "";
	}
	document.cookie = name+"="+value+expires+"; path=/";
}

function eraseCookie(name) {
	document.cookie = 'monkeyViewed=asdf';
	window.location.reload();
}