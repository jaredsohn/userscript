// Copyright (c) 2008, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.11 - 2008.06.24
// - add Emoticons dropdown
//
// Version 0.1 - 2008.06.20
// - display logged in user's Karma and Karma change
// - add "Me" top level nav to display only logged in user's plurks
//
// Contact: detect [at] hotmail [dot] com
//
// ==UserScript==
// @name           Plurk Mobile
// @namespace      http://userscripts.org/users/44035
// @description    Add features to the Plurk Mobile site.
// @include        http://www.plurk.com/m
// @include        http://www.plurk.com/m/*
// @include        http://plurk.com/m
// @include        http://plurk.com/m/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

var plurkGlobal = null;
var plurkUser = null;
var Emoticons = null;
var plurkEmoticons = null;

function letsJQuery() {
	unsafeWindow.Emoticons = 
	{
		basic:
			[[/(?:(\s+|^)):-?\)\)/,"/basic/joyful.gif",":-))"],[/(?:(\s+|^)):-?\)/,"/basic/smile.gif",":-)"],[/(?:(\s+|^)):-?D/i,"/basic/grin.gif",":-D"],["(LOL)","/basic/lol.gif","(LOL)"],[/:-?P/i,"/basic/tongue.gif",":-P"],[/\(woot\)/i,"/basic/w00t.gif","(woot)"],[/;-?\)/i,"/basic/wink.gif",";-)"],[/:-?o/i,"/basic/surprised.gif",":-o"],[/X-?\(/,"/basic/angry.gif","X-("],[/:-?\(/,"/basic/sad.gif",":-("],[/:'-?\(/,"/basic/crying.gif",":'-("],[/:-?&amp;/,"/basic/sick.gif",":-&"]],
		silver:
			[[/(?:(\s+|^))\(K\)/,"/silver/kiss.gif","(K)"],["(s_angry)","/silver/angry.gif","(s_angry)"],["(s_annoyed)","/silver/annoyed.gif","(s_annoyed)"],["(s_bye)","/silver/bye.gif","(s_bye)"],[/(?:(\s+|^))B-?\)/,"/silver/cool.gif","B-)"],["(s_cozy)","/silver/cozy.gif","(s_cozy)"],["(s_sick)","/silver/fever.gif","(s_sick)"],["(:","/silver/tired.gif","(:"],["(s_good_luck)","/silver/fingerscrossed.gif","(s_good_luck)"],["(s_gril_tongue)","/silver/gril_toungue.png","(s_gril_tongue)"],[/(s_LOL)/,"/silver/laugh.gif","(s_LOL)"],[/(s_mmm)/,"/silver/like_food.gif","(s_mmm)"],["(s_hungry)","/silver/hungry.gif","(s_hungry)"],["(s_music)","/silver/listening_music.gif","(s_music)"],["(s_tears)","/silver/tears.gif","(s_tears)"],["(s_tongue)","/silver/tongue.gif","(s_tongue)"],["(s_unsure)","/silver/unsure.gif","(s_unsure)"],["(s_high_five)","/silver/wave.gif","(s_high_five)"],["(s_dance)","/silver/dance.gif","(s_dance)"]],
		gold:
			[["(g_doh)","/gold/doh.gif","(g_doh)"],["(g_broken_heart)","/gold/broken_heart.gif","(g_broken_heart)"],["(g_drinking)","/gold/drinking.gif","(g_drinking)"],["(g_girl_kiss)","/gold/girl_kiss.gif","(g_girl_kiss)"],["(g_lol)","/gold/lol.gif","(g_lol)"],["(g_money)","/gold/money.gif","(g_money)"],["(g_rock_n_roll)","/gold/rock_n_roll.gif","(g_rock_n_roll)"],["(g_not_talking)","/gold/not_talking.gif","(g_not_talking)"],["(g_party)","/gold/party.gif","(g_party)"],["(g_sleeping)","/gold/sleeping.gif","(g_sleeping)"],["(g_thinking)","/gold/thinking.gif","(g_thinking)"],["(g_bring_it_on)","/gold/bring_it_on.gif","(g_bring_it_on)"],["(g_worship)","/gold/worship.gif","(g_worship)"],["(g_applause)","/gold/applause.gif","(g_applause)"],[/8-?\)/,"/gold/nerd.gif","8-)"],[/(g_gym)/,"/gold/gym.gif","(g_gym)"]],
		platinum:
			[["(p_big_eyed)","/platinum/big_eyed.gif","(p_big_eyed)"],["(p_dance_moves)","/platinum/dance_moves.gif","(p_dance_moves)"],["(p_idiot)","/platinum/idiot.gif","(p_idiot)"],["(p_lonely)","/platinum/lonely.gif","(p_lonely)"],["(p_scenic)","/platinum/scenic.gif","(p_scenic)"],["(p_silly_couple)","/platinum/silly_couple.gif","(p_silly_couple)"],["(p_startled)","/platinum/startled.gif","(p_startled)"],["(p_unsure)","/platinum/unsure.gif","(p_unsure)"],["(p_yupi)","/platinum/yupi.gif","(p_yupi)"]]
	}

	unsafeWindow.plurkGlobal = null;
	unsafeWindow.plurkUser = null;

	unsafeWindow.setUser = function(user)
	{
		unsafeWindow.plurkUser = user;
		return user;
	}

	unsafeWindow.getCurrentUser = function()
	{
		if($('.plurkbox p').length != 0)
		{
			user = $.trim($('.plurkbox p').contents().eq(2)[0].nodeValue);
			console.log('getCurrentUser', user);
		}
		else
		{
			user = null;
		}
		return user;
	}

	unsafeWindow.getUserInfo = function(callback)
	{
		if(unsafeWindow.plurkUser != null)
		{
			url = 'http://www.plurk.com/user/' + unsafeWindow.plurkUser;
			$.ajax(
				{
					type: "GET",
					url: url, 
					success: function(data)
					{
						data = data.substring(data.indexOf('GLOBAL = ') + 9);
						data = data.substring(0, data.indexOf("}}") + 2);
						unsafeWindow.plurkGlobal = eval('unsafeWindow.plurkUser = ' + data);
						console.log('getUserInfo', unsafeWindow.plurkGlobal);
						callback();
					}
				}
			);
			return true;
		}
		else
		{
			return false;
		}
	}

	unsafeWindow.displayKarma = function()
	{
		karma = unsafeWindow.getKarma();
		if(karma !== false)
		{
			$('#plurkystuff .karma').text(karma);
			return true;
		}
		else
		{
			return false;
		}
	}
	
	unsafeWindow.getKarma = function()
	{
		if(unsafeWindow.plurkGlobal != null)
		{
			karma = unsafeWindow.plurkGlobal['session_user']['karma'];
			console.log('getKarma',karma);
			return karma;
		}
		else
		{
			return false;
		}
	}

	unsafeWindow.displayKarmaChange = function()
	{
		karmaChange = unsafeWindow.getKarmaChange();
		if(karmaChange !== false)
		{
			img = $('<img/>');
			if(karmaChange > 0)
			{
				karmaChange = "+" + karmaChange;
				img.attr('src', "/static/dashboard/karma_up.png");
				img.attr('title', "Your Karma has gone up " + karmaChange + " since last karma update.");
			}
			else if(karmaChange < 0)
			{
				img.attr('src', "/static/dashboard/karma_down.png");
				img.attr('title', "Your Karma has gone down " + karmaChange + " since last karma update.");
			}
			$('#plurkystuff .karmaChange').html(img);
			img.after(" <span style='font-size:75%'>" + karmaChange + "</span>");
			return true;
		}
		else
		{
			return false;
		}
	}
	
	unsafeWindow.getKarmaChange = function()
	{
		if(unsafeWindow.plurkGlobal != null)
		{
			karmaChange = unsafeWindow.plurkGlobal['page_user']['karma_change'];
			console.log('getKarmaChange',karmaChange);
			return karmaChange;
		}
		else
		{
			return false;
		}
	}

	unsafeWindow.addMeLink = function()
	{
		$('.tabbar a:first').after(' | <a href="/m/u/' + unsafeWindow.plurkUser + '">me</a>');
		console.log('addMeLink');
	}
	
	unsafeWindow.getRecruited = function()
	{
		if(unsafeWindow.plurkGlobal != null)
		{
			recruited = unsafeWindow.plurkGlobal['session_user']['recruited'];
			console.log('getRecruited',recruited);
			return recruited;
		}
		else
		{
			return false;
		}
	}

	unsafeWindow.insertAtCursor = function(stringa)
	{
	  campo = document.getElementById('plurkybox');
	  stringa = unescape(stringa);
	  if (document.selection) {
	    campo.focus();
	    sel = document.selection.createRange();
	    sel.text = stringa;
	  }
	  else if (campo.selectionStart || campo.selectionStart == '0') {
	    var startPos = campo.selectionStart;
	    var endPos = campo.selectionEnd;
	    campo.value = campo.value.substring(0, startPos)
	                  + stringa
	                  + campo.value.substring(endPos, campo.value.length);
	  } else {
	    campo.value += stringa;
	  }
	  console.log(stringa);
	}
	
	unsafeWindow.displayEmoticons = function()
	{
		unsafeWindow.plurkEmoticons = unsafeWindow.Emoticons.basic;
		K = unsafeWindow.getKarma();
		if(K > 25)
			unsafeWindow.plurkEmoticons = unsafeWindow.plurkEmoticons.concat(unsafeWindow.Emoticons.silver);
		if(K > 50)
			unsafeWindow.plurkEmoticons = unsafeWindow.plurkEmoticons.concat(unsafeWindow.Emoticons.gold);
		if(unsafeWindow.getRecruited() > 10)
			unsafeWindow.plurkEmoticons = unsafeWindow.plurkEmoticons.concat(unsafeWindow.Emoticons.platinum);
			
		console.log(unsafeWindow.plurkEmoticons);
		
		$('.plurkbox p:first').before('<div style="position:absolute;margin-left:170px"><a href="#" onclick="this.blur();$(\'#plurkyemoticons\').toggle();" style="color:#fff"><img width="45" height="20" src="/static/emoticons/select_emoticon_big.png" border="0"/></a></div>');
		$('.plurkbox .input').attr('id','plurkybox');
		$('.plurkbox').after('<div id="plurkyemoticons" style="display:none;border:1px solid #ccc;margin-top:8px;margin-left:180px;position:absolute;background-color:#fff;padding:4px;"/>');
		$.each(unsafeWindow.plurkEmoticons, function(){
			$('#plurkyemoticons').append('<a class="emoticon" href="#" style="padding-right:15px;" onclick="this.blur();insertAtCursor(\' ' + escape(this[2]) + '\')"><img src="/static/emoticons' + this[1] + '" border="0"/></a>');
		});
	}
	
	unsafeWindow.getProfileImage = function()
	{
		//http://avatars.plurk.com/[uid]-medium.gif
		return profileimage;
	}

	$('.plurkbox').after('<div id="plurkystuff"><p>Karma: <span class="karma"/> <span class="karmaChange"/></p></div>');
	unsafeWindow.setUser(unsafeWindow.getCurrentUser());
	unsafeWindow.addMeLink();
	unsafeWindow.getUserInfo(function(){unsafeWindow.displayKarma();unsafeWindow.displayKarmaChange();unsafeWindow.displayEmoticons();});

}

