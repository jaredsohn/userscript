// ==UserScript==
// @name        Widescreen Onverse.com
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Allows you to view Onverse.com in Widescreen mode!
// @include     /^https?://[a-zA-Z]+\.onverse\.com/?.*$/
// @version     1.2
// ==/UserScript==

var percent = typeof localStorage['ovPercentage'] != 'undefined' ? parseFloat(localStorage['ovPercentage']) : 0.9;
var a = document.querySelector("tr.onverse_midsection div.Ctnt > div");
if(a)
    a.style.width = "100%";
document.head.appendChild(document.createElement('style')).innerHTML = 'tr.midsection div.Ctnt { width: -webkit-calc(100% - 20px); width: -o-calc(100% - 20px); width: -ms-calc(100% - 20px); width: -moz-calc(100% - 20px); width: calc(100% - 20px); } tr.onverse_header td.header, tr.header td.header { width: ' + percent*100 + '%; min-width: 1000px; } div.listAblums table, div.listPhotos table { margin: 0 auto; max-width: 600px; } #avatarForm #avatarCreator { margin: 0 auto 15px; }' + ( document.getElementsByClassName('onverse_header').length > 0 ? ' .postscroll, .fixedsig { max-width: ' + (Math.floor(document.getElementsByClassName('onverse_header')[0].offsetWidth*percent) - 67) + 'px; }' : '');

// Following code is for changing widescreen settings:
var ref = document.getElementsByClassName('vbmenu_control');
if(ref.length > 0) { // In forums
	var add = document.createElement('td');
	add.className = 'vbmenu_control';
	var cur = document.createElement('a');
	cur.innerHTML = 'Widescreen';
	cur.href = "javascript:(function(){var percent = prompt('How wide do you want Onverse.com to be in percent?', (typeof localStorage['ovPercentage'] != 'undefined' ? parseFloat(localStorage['ovPercentage']) : 0.9)*100 + '%');if(typeof percent == 'string' && parseInt(percent) != NaN) {percent = parseInt(percent)/100;if(percent > 1)percent = 1;else if(percent < 0.01)percent = 0.01;localStorage['ovPercentage'] = percent;} })();";
	add.appendChild(cur);
	ref = ref[1];
	ref.parentNode.insertBefore(add, ref);
} else if(location.href == 'http://www.onverse.com/profile/settings.php') { // In Profile Settings
	ref = document.getElementsByClassName('editFrame');
	var add = document.createElement('div');
	add.className = 'editFrame';
	var cur = document.createElement('input');
	cur.type = 'text';
	cur.tabindex = '2';
	cur.value = percent*100 + '%';
	cur.onchange = function() { percent = this.value;if(typeof percent == 'string' && parseInt(percent) != NaN) {percent = parseInt(percent)/100;if(percent > 1)percent = 1;else if(percent < 0.01)percent = 0.01;localStorage['ovPercentage'] = percent;} else percent = localStorage['ovPercentage'];}
	add.appendChild(cur);
	for(var i = 1; i < ref.length; i++)
		ref[i].children[0].tabindex = (i+2).toString();
	ref = ref[0].nextSibling;
	cur = document.createElement('label');
	cur.innerHTML = 'Widescreen';
	ref.parentNode.insertBefore(cur, ref);
	ref.parentNode.insertBefore(add, ref);
}