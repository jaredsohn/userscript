// ==UserScript==
// @name	CodexGlory
// @namespace	http://userscripts.org/users/516611
// @description	Fix some of DUs powertrips (until he brakes it all again)
// @include	http://www.rpgcodex.net/forums/index.php?threads/*
// @version	1.3.1
// @updateURL   https://userscripts.org/scripts/source/166950.meta.js
// @downloadURL https://userscripts.org/scripts/source/166950.user.js
// ==/UserScript==

var smilingTicker = function() {
	$("#c-carousel dd").each(function(index, el) {
		switch(index) {
			case 0:
				$(el).append("<img src='styles/default/xenforo/clear.png' class='mceSmilieSprite mceSmilie11' />");
				break;
			case 1:
				$(el).append("<img src='styles/default/xenforo/clear.png' class='mceSmilieSprite mceSmilie7' />");
				break;
			case 2:
				$(el).append("<img src='styles/default/xenforo/clear.png' class='mceSmilieSprite mceSmilie9' />");
				break;
			case 3:
				$(el).append("<img src='/forums/smiles/hug.gif' />");
				break;
			case 4:
				$(el).append("<img src='styles/default/xenforo/clear.png' class='mceSmilieSprite mceSmilie4' />");
				break;
			case 5:
				$(el).append("<img src='styles/default/xenforo/clear.png' class='mceSmilieSprite mceSmilie5' />");
				break;
			case 6:
				$(el).append("<img src='/forums/smiles/haughty.png' height=15 />");
				break;
			default:
				break;
		}
	});
};

var smilingNames = function() {
	$(".userText").each(function() {
		var numbers = $(this).text();
		$(this).text("");
		for (var i = 0; i < numbers.length; i++) {
			var num = parseInt(numbers[i]) + 2;
			$(this).append("<img src='styles/default/xenforo/clear.png' class='mceSmilieSprite mceSmilie" + (num == 8 ? 12 : num) + "' />");
		}
	});
};

var restoreNameAndAvatar = function() {
	$(".message").each(function() {
		var userID = $("a.item.control.stats", this).attr("href").split("=")[1];
		var avatarUrl = "http://www.rpgcodex.net/forums/data/avatars/m/" + parseInt(parseInt(userID) / 1000) + "/" + userID + ".jpg";
		
		var $usrName = $(".messageUserBlock :first", this);
		var $avatar = $("<img src='" + avatarUrl + "' style='padding: 0 0 0 5px' />").error(function() {
			$(this).attr("href", "http://www.rpgcodex.net/forums/styles/default/xenforo/avatars/avatar_m.png");
		});
		$usrName.after($avatar);

		$usrName.replaceWith("<a class='username' style='padding: 5px' href='http://www.rpgcodex.net/forums/index.php?members/" + userID + "'>" + this.getAttribute("data-author") + "</a>");
	});
};  

var restorePowerTrip = function() {
	$(".message").each(function() {
		var userID = $("a.item.control.stats", this).attr("href").split("=")[1];
		$(".messageUserBlock", this).css("padding", "5px").text(userID);
	});
};  

var fixHorikita = function() {
	$(".message").each(function() {
		var userID = $("a.item.control.stats", this).attr("href").split("=")[1];
		var avatarUrl = "http://www.rpgcodex.net/forums/data/avatars/m/" + parseInt(parseInt(userID) / 1000) + "/" + userID + ".jpg";
		
		var $horikita = $(".avatarHolder img", this);
		var $avatar = $("<img src='" + avatarUrl + "' style='padding: 0 0 0 5px' />").error(function() {
			$(this).attr("href", "http://www.rpgcodex.net/forums/styles/default/xenforo/avatars/avatar_m.png");
		});

		$horikita.replaceWith($avatar);
	});
};  

//smilingTicker();
//restoreNameAndAvatar();
//restorePowerTrip();
//fixHorikita();