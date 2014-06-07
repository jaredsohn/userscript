// ==UserScript==
// @name        ChristianMingle Chat Scroll Fix
// @namespace   battle_of_wits
// @description ChristianMingle Chat - Only scroll when at the bottom already
// @include     http://connect.christianmingle.com/chatroom/messages.html?*
// @match       http://connect.christianmingle.com/chatroom/messages.html?*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     5
// @grant       none
// ==/UserScript==

function option_set(name, value) {
	localStorage.setItem('cmsf_' + name, JSON.stringify(value));
}
function option_get(name, fallback) {
	var value = localStorage.getItem('cmsf_' + name);
	if (value === null || value === undefined) {
		value = fallback;
	}
	else {
		value = JSON.parse(value);
	}
	return value;
}

var scrolling = true, needsreset = false, fullauto = option_get('fullauto', true), showoptions = option_get('showoptions', false);

var imageoff =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAMAAADat72NAAAAWlBMVEUDl/AikusAnfQi' +
	'ofMwqfU7sfZOtvVWu/tpwv5/wux0xPpxzP+Nz/qc2f6k2/up4P+x3v+v4fu54v685f/D5/7L6/zZ6e3g6uXV7f/e8v' +
	'/m9fzt9//4/f/+//ygMydzAAAA70lEQVR42n3K226EMAxFURcyXNKQQHAYG+z//83SKqZVJVgPwdoHeG+43sDtDdv6' +
	'YAPMBpmL3ZYgG1IR5X87LNUqnBdSRC47LQZShYopZSXSnc+z+jOvKc3CReekdM2xykoxomLRGKVYhWh2YZIj3s2RRT' +
	'hFPM4/8Xd+BNMjmEL4vBHCBGF4EMDb6SPO/vsThilag74aDiER388SvGar0FVZfNcfxfMRUGer8KqYzifLQLtPGqyC' +
	'qxjPZ9JXJue1s3rNKOdD7H7m1zW3VSccUH2bSzuoswquqbpykG+aMDUdtrU5GOHBCNvYftxox+0LiGokvODs35sAAA' +
	'AASUVORK5CYII=';
var imageon =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAMAAADat72NAAAAWlBMVEUDl/AikusAnfQh' +
	'ofMsp/M0q/c6svdPtvZWu/thu/ZmwPtrxP90xfpwzP+AyfmKzPeO0PuW0veZ1vul2fmz3/rE5PXB5fzc6erS7P7c8f' +
	'3k9Pvu9//4/f/+//w/VBHaAAAA80lEQVR42o3K7W6EIBCF4amgrtbyNQMKzNz/bdZNwXTTuOnzA8h5gZ3c1w1HO9Dn' +
	'GwTb2jlKYX21waNDqVnS4xXMzcJpnlE2k2wKcwdTY2SbpocEJ5HOZwNjY2QZx4nRyTSy6yvoZhan9SbGstZs+wqqI0' +
	'ZfszKsFJs+gh4aFXIhPSxpGNLSNg0r3DtjWNXHDbUGCO/8P2PKEZ8XhZSu7JvAUpjRH0woR1/BNQejC5yxMmU5+nrl' +
	'Wn7+lIqHpL85n0cSn4sjCVe2TebzKNXmYkl8X68cpKYsZI9i8Ve+Xli4kLUpWsyubR6ieSPCHv1d9HH/BijMJkTelo' +
	'G9AAAAAElFTkSuQmCC';
var imageoffsm =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAZCAYAAADqrKTxAAACaklEQVR42o2U21LaUBiF' +
	'8yB9ht71Udo30RmIQKK2CsqhRatRilKxoELLIdNR1GyOotRRC0ahEWNA3KNWn6GsjBBHcOrFN/n3v741s3OzmcY1ZQ' +
	'YHB1/xPP/WbDZb2tj6YEEOD75e4DjOLKbWrUpTs2nXtAfskcODz7SHdzFRtNYptf0PePAZE8taK3XVVmvRZzlpXPL4' +
	'woPP4M6nLdqX0knVvhyJrsU2UgudHXy9VGnSHnaOq/bF0EosHEuEylqLe9gbpUON6hyoLS62lRYKsjIWWIlEFsNr0Z' +
	'KijSB7wCj9UqlO8U9jWPi6nPQFw/H5YCiRKdfG9czAKO3VaZfAWiwsBL6JcbIzjfMTjFKhTrtIlbMP6/uyA3MfjFJG' +
	'oS/FKG3X6EsxStH8b6c/Iq565hYkj7BAnoI9cnh6yWQyOb3+4JaY25X2z5vkqEF7wB45PPiMxWJZjUoFqXRBST+KZ8' +
	'1MZ4YHv309VkqfNkj+jJKcckWCiXX5Z6myizOR1axn1tdaTqZknOHBxz+RdI12sXumblwz81ebZTXnEfytMefHv/HC' +
	'0V4nh6+XNqq0iz+ekkcnXPdjbu/t+0n3XZiU9o38USl5TLv8OLzIjk6470YcrvuZlWTVyMCjUrRMu3hDidqw3XUPRp' +
	'3e21CxVjDyR6XwIdWZTeSO+LY8/tl/aReWNMyOuaCGrEOntP1lRyWBA0o+fZfKvHPqxldQ8v7ieW4iEFXm0nIRGYAH' +
	'n2GtvGtyKSH5SpQAIa9m8e0HPPh4jd6Yh6yb9qAoebMqmd6lPWCPHB58/d0bGBh4PcRxDpZlt3Dnp2CPHB78f5kVgc' +
	'qGH9biAAAAAElFTkSuQmCC';
var imageanswer =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAMAAADat72NAAAAWlBMVEV7zP8AkfAAl+8i' +
	'kusAnPMApfYcn/Afou0no/U+p+0yqvY5sfY/tPpQt/ZWu/tmwPtqw/5ryPx3yP2Lx+yByvqN0PuY1fqh2/273/W44f' +
	'3E6P7n9f/2+/7+//wBZUPoAAAAAXRSTlMAQObYZgAAANpJREFUeNp9zd2WgyAMRtHMj1YrEQeBWuB7/9ecRNTpxZR9' +
	'A8lhLYi24N4Im1TXsFH4aQi0NJFt+i97v1x5Pi0F8HI+5ESydfmXEwA3zxEoRfqR+eCRJTNnZMtPvSoyFecSZGdmIB' +
	'rjgGDUmSOCB6zhGGdj5OpqnnZc0qS5TiahmEnRffcs9q55H7S6uq/ZYmPe/5aBM+Txaw44RKlF65k75YsCSuykZu5O' +
	'NFwcwMOQgEcQPCjqL5r7rqByvXrJnNLYT+lga/5uos8mGlt1pPWrYSVabx9v3Fb6BT7aJmjAK1pvAAAAAElFTkSuQmCC';
var imageonsm =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAZCAYAAADqrKTxAAACY0lEQVR4AY2U7U7aUACG' +
	'exn7sdvYjSzZpWgCZXxMp4hSpcpAAVFAlA4trlV0jhZEwQ+tiuI6twGrH8fFZdcw3iY9IaBxP56c0/d93uT8KmP8Jk' +
	'x/f/8rj8fD2e32Qhv1EQro4cE3B263+7O0uaHoxi+1cU96QI4eHnymfRnPSrKi3xH1OeDBZ2x2Vjm6aqo1gzyJ1rgu' +
	'4YQHn8GbtRZ5FFW72OPDM3dzmex3K4NvjqoN0sPm0UV1NDD5EIzNX1d+3BatnI62r4hJUb8tJsT85caxXuE+zBD/VP' +
	'j+S61RRmdBR1s6McnXWtuDPu7vMMc/DPkDf3J79arVWdDRep1Q/NPxm4H2MC4pNXx3QUfKsmao4gUxWdzTK8nS6T7u' +
	'3cCDz7AOpxDP7yjCKVGfAx58xmaz+flYshBZ31USB4aa1EgPyNHDg4/nucTK+Wg0u7YUiMwVJqbjajfI0cODb47yX8' +
	'l/Q0dSnTzJau3G0/lNR+I5oUTkUji9ezmC+0etNcCnVoTYWjlk9XS0fEZMsie37vE5QeSTK0LmoDnIp8QMF1tcTW3X' +
	'fZZDR5kzQgnL5dBYNC1z8UxuLJaWZpUTjvado4UTQkkeGu980bTURg7mipHODtDR/DGhBJYLUW8kLYOR6FIuWr4a6u' +
	'zpKH5ITKbWDnjvTFoeTeSW/AvyAu44rR5Yo7ehctMVaQcTUiU4HBPE8M7P9+Hd5qBf2JoNlb550QF48BnW6XnjS3xy' +
	'hvaJCwR3WgM4HwMefPyNXtodTtabkp2BUtM1WSU9IEcPD7753+vr63vhcLtfsyzrwJu7QY4eHvx/Cxlz8qQwEt0AAA' +
	'AASUVORK5CYII=';
var optionshide =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAYAAADTcMcaAAAAiElEQVR4AWN49PI5Cm5o' +
	'aGArKytLLC0t3QmiQXx0NXAGEDACFfqUl5fvBiq+BsMgPkgcJI+iqbKy0hwouQahGBOD5EHqwJqAAjOxKDoGxNVgGl' +
	'NuJgOawHmgiUVAmhdkIoiG8s8jq4NpugKUbAe6XQKkGB2DxEHyIHUwTbOBWB0kSQiD1IHUAwAf9MbS0SJzuQAAAABJ' +
	'RU5ErkJggg==';
var optionsshow =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAHCAYAAADTcMcaAAAAi0lEQVR4AWMoKyubDcTq' +
	'j14+ZyCEQepA6kGMa0B8pby8vL20tFQCm2KQOEgepA6kHqIJgc8DJYuANC/UZF4o/zxMDUzTTBADDR8D4mowjSk3E2' +
	'x9ZWWlOdDENQgJTAySB6kDqYe7GwgYgW73AUruRlO8GyQOkoepxfB0Q0MDG1BxIlDhThAN4qOrAQBFBMbScK1YzgAA' +
	'AABJRU5ErkJggg==';
var bgtrans =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAMElEQVR42u3OIREAAAgE' +
	'MPpnIwWGowUx3kzMr%2Ba2kwQEBAQEBAQEBAQEBAQEBOKBB7Ha%2BMQGk%2B3ZAAAAAElFTkSuQmCC';

scroller = function() {
	try {
		if (scrolling) {
			jQuery(document).scrollTop(jQuery(document).height());
		}
	} catch(er) {
	}
};

function toggleauto(state) {
	var switchimage = jQuery("#swimg");
	var smallimage = jQuery("#swsmimg");
	if (state === 1) {
		switchimage.attr('src', imageon);
		switchimage.attr('alt', "On");
		jQuery("#optionsdiv").attr('title', 'Turn Auto Scrolling Off');
		smallimage.attr('src', imageonsm);
		smallimage.attr('alt', "On");
		smallimage.attr('title', 'Turn Auto Scrolling Off');
		if (fullauto) {
			jQuery("#swsmdiv").show();
		}
		scrolling = true;
		needsreset = false;
		fullauto = false;
		option_set('fullauto', false);
	}
	else if (state === 0) {
		switchimage.attr('src', imageoff);
		switchimage.attr('alt', "Off");
		jQuery("#optionsdiv").attr('title', 'Turn Auto Scrolling to Answer');
		smallimage.attr('src', imageoffsm);
		smallimage.attr('alt', "Off");
		smallimage.attr('title', 'Turn Auto Scrolling On');
		if (fullauto) {
			jQuery("#swsmdiv").show();
		}
		scrolling = false;
		fullauto = false;
		option_set('fullauto', false);
	}
	else {
		switchimage.attr('src', imageanswer);
		switchimage.attr('alt', "42");
		jQuery("#optionsdiv").attr('title', 'Turn Auto Scrolling On');
		smallimage.hide();
		fullauto = true;
		option_set('fullauto', true);
		updatescrolling();
	}
}

// Make this work on unsafeWindow for Mozilla and Opera
if (typeof unsafeWindow !== 'undefined') {
	unsafeWindow.scroller = scroller;
}

function updatescrolling() {
	scrolling = jQuery(document).scrollTop() + window.innerHeight + 20 > jQuery(document).height();
}

function toggleoptions() {
	var optionsdiv = jQuery("#optionsdiv");
	var optiontoggle = jQuery("#optiontoggle");
	if (showoptions) {
		showoptions = false;
		option_set('showoptions', false);
		optionsdiv.hide(400);
		optiontoggle.attr('src', optionsshow);
		optiontoggle.attr('alt', "Show Options");
		optiontoggle.attr('title', "Show Options");
	}
	else {
		showoptions = true;
		option_set('showoptions', true);
		optionsdiv.show(400);
		optiontoggle.attr('src', optionshide);
		optiontoggle.attr('alt', "Hide Options");
		optiontoggle.attr('title', "Hide Options");
	}
}

function addswitch() {
	var sdiv = document.createElement('div');
	sdiv.setAttribute('style', "position: fixed; top: 4px; right: 4px; padding: 0px; text-align: right; margin-bottom: 4px;");
	sdiv.id = "swdiv";
	var odiv = document.createElement('div');
	odiv.setAttribute('style', "padding: 4px; background-image: url('" + bgtrans + "'); background-repeat: repeat; cursor: pointer; display: " + (showoptions ? "block;" : "none;"));
	odiv.id = "optionsdiv";
	var simage = document.createElement('img');
	simage.height = 24;
	simage.width = 30;
	simage.id = "swimg";
	var scrolltext = document.createTextNode("Auto Scrolling: ");
	odiv.appendChild(scrolltext);
	odiv.appendChild(simage);
	sdiv.appendChild(odiv);

	var swsmdiv = document.createElement('div');
	swsmdiv.setAttribute('style', "position: fixed; bottom: 4px; right: 8px; cursor: pointer;");
	swsmdiv.id = "swsmdiv";
	var swsmimg = document.createElement('img');
	swsmimg.height = 25;
	swsmimg.width = 13;
	swsmimg.id = "swsmimg";
	if (fullauto) {
		simage.src = imageanswer;
		simage.alt = '42';
		odiv.title = 'Turn Auto Scrolling On';
		swsmdiv.style.display = 'none';
	}
	else {
		simage.src = imageon;
		simage.alt = 'On';
		odiv.title = 'Turn Auto Scrolling Off';
		swsmimg.src = imageonsm;
		swsmimg.alt = 'On';
		swsmdiv.title = 'Turn Auto Scrolling Off';
	}
	swsmdiv.appendChild(swsmimg);

	var optiontoggle = document.createElement('img');
	optiontoggle.setAttribute('style', "cursor: pointer;");
	optiontoggle.id = "optiontoggle";
	optiontoggle.height = 7;
	optiontoggle.width = 13;
	if(showoptions) {
		optiontoggle.src = optionshide;
		optiontoggle.title = "Hide Options";
		optiontoggle.alt = "Hide Options";
	}
	else {
		optiontoggle.src = optionsshow;
		optiontoggle.title = "Show Options";
		optiontoggle.alt = "Show Options";
	}
	optiontoggle.setAttribute('style', 'float: right; padding: 4px; cursor: pointer;');
	sdiv.appendChild(optiontoggle);

	jQuery("body").prepend(swsmdiv);
	jQuery("body").prepend(sdiv);

	jQuery("#optionsdiv").click(function() {
		if (fullauto) {
			toggleauto(1);
		}
		else if (scrolling) {
			toggleauto(0);
		}
		else {
			toggleauto(2);
		}
		return false;
	});
	jQuery("#swsmimg").click(function() {
		if (scrolling) {
			toggleauto(0);
		}
		else {
			toggleauto(1);
		}
		return false;
	});

	jQuery("#optiontoggle").click(function () {
		toggleoptions();
		return false;
	});

	jQuery(window).scroll(function () {
		if (fullauto) {
			updatescrolling();
		}
		else if (!scrolling) {
			if (needsreset) {
				if (jQuery(window).scrollTop() + window.innerHeight + 20 > jQuery(window).height()) {
					toggleauto(1);
				}
			}
			else if (jQuery(window).scrollTop() + window.innerHeight + 20 <= jQuery(window).height()) {
				toggleauto(0);
				needsreset = true;
			}
		}
	});
	jQuery(window).resize(function() {
		if (fullauto && scrolling) {
			jQuery(document).scrollTop(jQuery(document).height());
		}
	});
}

addswitch();
