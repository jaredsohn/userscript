// ==UserScript==
// @name          Modified Plurk Mobile
// @namespace     http://userscripts.org/scripts/show/73990
// @description   Add more features to the Plurk Mobile site
// @version       0.2
// @date	  2010-04-10
// @author        soup (麻糬)
// @include       http://www.plurk.com/m
// @include       http://www.plurk.com/m/*
// @include       http://plurk.com/m
// @include       http://plurk.com/m/*
// ==/UserScript==

// Original author: Hao Chen (userscripts.org/users/44035)
/* Changelog:
Version 0.11 - 2008.06.24 - add Emoticons dropdown
Version 0.1 - 2008.06.20- display logged in user's Karma and Karma change and add "Me" top level nav to display only logged in user's plurks
*/

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
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
			[[/(?:(\s+|^))\(K\)/,"/silver/kiss.gif","(K)"],["(angry)","/silver/angry.gif","(angry)"],["(annoyed)","/silver/annoyed.gif","(annoyed)"],["(bye)","/silver/bye.gif","(bye)"],[/(?:(\s+|^))B-?\)/,"/silver/cool.gif","B-)"],["(cozy)","/silver/cozy.gif","(cozy)"],["(sick)","/silver/fever.gif","(sick)"],["(:","/silver/tired.gif","(:"],["(goodluck)","/silver/fingerscrossed.gif","(goodluck)"],["(griltongue)","/silver/gril_toungue.png","(griltongue)"],[/(LOL)/,"/silver/laugh.gif","(LOL)"],[/(mmm)/,"/silver/like_food.gif","(mmm)"],["(hungry)","/silver/hungry.gif","(hungry)"],["(music)","/silver/listening_music.gif","(music)"],["(tears)","/silver/tears.gif","(tears)"],["(tongue)","/silver/tongue.gif","(tongue)"],["(unsure)","/silver/unsure.gif","(unsure)"],["(highfive)","/silver/wave.gif","(highfive)"],["(dance)","/silver/dance.gif","(dance)"]],
		gold:
			[["(doh)","/gold/doh.gif","(doh)"],["(brokenheart)","/gold/broken_heart.gif","(brokenheart)"],["(drinking)","/gold/drinking.gif","(drinking)"],["(girlkiss)","/gold/girl_kiss.gif","(girlkiss)"],["(rofl)","/gold/lol.gif","(rofl)"],["(money)","/gold/money.gif","(money)"],["(rock)","/gold/rock_n_roll.gif","(rock)"],["(nottalking)","/gold/not_talking.gif","(nottalking)"],["(party)","/gold/party.gif","(party)"],["(thinking)","/gold/thinking.gif","(thinking)"],["(bringit)","/gold/bring_it_on.gif","(bringit)"],["(worship)","/gold/worship.gif","(worship)"],["(applause)","/gold/applause.gif","(applause)"],[/8-?\)/,"/gold/nerd.gif","8-)"],[/(gym)/,"/gold/gym.gif","(gym)"],[/(devil)/,"/gold/devil.gif","(devil)"],[/(lmao)/,"/gold/lmao.gif","(lmao)"],[/(heart)/,"/gold/heart.gif","(heart)"]],
		platinum:
			[["(big_eyes)","/platinum/big_eyed.gif","(big_eyes)"],["(funkydance)","/platinum/dance_moves.gif","(funkydance)"],["(idiot)","/platinum/idiot.gif","(idiot)"],["(lonely)","/platinum/lonely.gif","(lonely)"],["(scenic)","/platinum/scenic.gif","(scenic)"],["(hassle)","/platinum/silly_couple.gif","(hassle)"],["(panic)","/platinum/startled.gif","(panic)"],["(okok)","/platinum/unsure.gif","(okok)"],["(yahoo)","/platinum/yupi.gif","(yahoo)"]],
		karma100:
			[["(muhaha)","/karma100/muhaha.gif","(muhaha)"],["(banana_ninja)","/karma100/banana_ninja.gif","(banana_ninja)"],["(beer)","/karma100/beer.gif","(beer)"],["(coffee)","/karma100/coffee.gif","(coffee)"],["(fish_hit)","/karma100/fish_hit.gif","(fish_hit)"],["(muscle)","/karma100/muscle.gif","(muscle)"],["(smileydance)","/karma100/smileydance.gif","(smileydance)"],["(taser) (rammi)","/karma100/taser.gif","(taser) (rammi)"]],
		platinum2:
			[["(evil_grin)","/platinum2/evil_grin.gif","(evil_grin)"],["(banana_rock)","/platinum2/banana_rock.gif","(banana_rock)"],["(banana_cool)","/platinum2/banana_cool.gif","(banana_cool)"],["(headspin)","/platinum2/headspin.gif","(headspin)"],["(heart_beat)","/platinum2/heart_beat.gif","(heart_beat)"],["(ninja)","/platinum2/mninja.gif","(ninja)"],["(evilsmirk)","/platinum2/evilsmirk.gif","(evilsmirk)"]],
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
		if(K > 81)
			unsafeWindow.plurkEmoticons = unsafeWindow.plurkEmoticons.concat(unsafeWindow.Emoticons.platinum2);
		if(K > 99.99)
			unsafeWindow.plurkEmoticons = unsafeWindow.plurkEmoticons.concat(unsafeWindow.Emoticons.karma100);
		if(unsafeWindow.getRecruited() > 9)
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

