// ==UserScript==
// @name           Mafia Wars Facebook Auto Comment Feed
// @namespace      http://screepts.com
// @version        1.50.0
// @date           2012-01-29
// @description    Auto Adds Random Text To Your Mafia Feeds
// @include https://www.facebook.com/dialog/feed*
// @include http://www.facebook.com/dialog/feed*
// @match          https://www.facebook.com/dialog/feed*
// @match          http://www.facebook.com/dialog/feed*
// ==/UserScript==
//////////////////////////////////////////////////////////////////////////////////////////////
//          This code was brought to you by todays letters kids 666                         //
//                http://screepts.com muahahahaha                               	        //
//                      if you love it share it!!!                                          //
//          {Don't be evil & remove my header, love it, leave it & share it...}             //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
// Copyright(C) 2011 Luke Hardiman, lucifer@screepts.com		                            //
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php       //
//////////////////////////////////////////////////////////////////////////////////////////////
var script_version = '1.50';



(function(){
    
    
if (/Mafia Wars/.test(document.body.innerHTML)) {
//Set random quotes for fight boost
var fight_boost_quotes = new Array() 
fight_boost_quotes[0] = "McF is on fire :).. \nwhos next!!";
fight_boost_quotes[1] = "McF is on a killing spree.... Bring it on!!";
fight_boost_quotes[2] = "Should have stayed in bed my friend :)!!";
fight_boost_quotes[3] = "Honesty he should have stayed dead!!!";
fight_boost_quotes[4] = "pfffft, and he thought rehealthing would help :)..";
fight_boost_quotes[5] = "Gonna be free boosts all night, courtesy of McF :)";
fight_boost_quotes[6] = "Lotta Killing going on round here";
fight_boost_quotes[7] = "Owned...\nBy McF";
fight_boost_quotes[8] = "Free boost From McF :)";
fight_boost_quotes[9] = "Yet another free boost from McF :)";
fight_boost_quotes[10] = "Tick Tick, BOOM.... \nAnother Free Boost :)";
fight_boost_quotes[11] = "Would like a Dram with all this ice :)";
fight_boost_quotes[12] = "ICE ICE BABY, I just hate Vanilla Ice :)!!! :)";
fight_boost_quotes[13] = "hahahahaaa\nSmashing them tonight :)";
fight_boost_quotes[14] = "err did i just ice you twice\nMy bad... trigger happy :)";
fight_boost_quotes[15] = "McF Says\n.....Play Dead.... lol";
fight_boost_quotes[16] = "(+ +)     {R.i.P}";
fight_boost_quotes[17] = "Look @ my total ices now...";
fight_boost_quotes[18] = "BOOOOOMMMMM!!!!!!!!\nthat was the sound of McF Ice Maker";
fight_boost_quotes[19] = "i love killing...";
fight_boost_quotes[20] = "you were on my hitlist ...\nnow whos next :)";
fight_boost_quotes[21] = "I'm like, a mini William Wallace ...";
fight_boost_quotes[22] = "Now you know what a Glesga Kiss can do !! lol";
fight_boost_quotes[23] = "hahahaha, Dont know who started that fight.\nbut I smashed ya!!!!";
fight_boost_quotes[24] = "Im giving the boosts away tonite :)\nnow for the next target";
fight_boost_quotes[25] = "giving out smackdowns!!!!!";
fight_boost_quotes[26] = "You just killed your foe, now brag about it.\nhmmm Brag about it... pfffft I'm out for Ices....";
fight_boost_quotes[27] = "Who killed kenny LOL :)";
fight_boost_quotes[28] = "OMG i was going easy on that dude :)";
fight_boost_quotes[29] = "{Freedom ////\n.oOO-(^.0)-OOo or be Keeld..}";
                      
                      
//Set random level up 
var level_quote = new Array() 
level_quote[0] = "Im on fire :).. \nLeveled.. come claim a reward!!";
level_quote[1] = "levelling up fine !!\nParty Time..";
level_quote[2] = "Tolda ya McF would get ya!!";
level_quote[3] = "Sharing the McF love :)!";
level_quote[4] = "Just leveled :)\nSharing the  small rewards....";

//Set random war up 
var war_quote = new Array() 
war_quote[0] = "WAAAAAAAAAAARRRRRRR!!";
war_quote[1] = "WAR!!!!!!!!\n McF Family War Need Help please!!!";
war_quote[2] = "Grab a War reward !!!!\nMcF Family WAR!!!!!!!";
war_quote[3] = "Rally up guys & Gals ....\nIt's WAR Time!!!!!";
war_quote[4] = "Lets Go have a Raiding Party, Its WARRRR!!!!!!";
war_quote[5] = "McF Family War need your help please...\nWar is ON!!!!!!!";
war_quote[6] = "Need some help please guys... \nlevel 18 rewards on this war!!!";
//Set random DailyTake 
var daily_quote = new Array() 
daily_quote[0] = "Hurry.. couple spots left!!!";
daily_quote[1] = "Sharing The love :)";
daily_quote[2] = "few good items left to collect....";
daily_quote[3] = "Some good items still left to collect...";
daily_quote[4] = "Daily Take... 1st in 1st served...";
daily_quote[5] = "lol.. left some good items to claim still";
//Set random crew 
var crew_quote = new Array() 
crew_quote[0] = "Need some crew members thanks!!! :)\Don;t forget to send me some Brazil and Chicago crews, all honoured'";
crew_quote[1] = "Come join ma crew..:)";
crew_quote[2] = "Couple spots left to fill....";
crew_quote[3] = "Crew members needed\nthanks!!!";
crew_quote[4] = "Have a few spots to fill!!! Send me your Family Crews and Iwill accept them";
crew_quote[5] = "Join my elite crew..\nAnd I will join yours";

//Set random family
var family_boss_quote = new Array() 
family_boss_quote[0] = "Need to reload.....";
family_boss_quote[1] = "Want to smash this boss tonight!!..";
family_boss_quote[2] = "Need a few bullets.....";
family_boss_quote[3] = "Damm ive been smashin him with combos.....";
family_boss_quote[4] = "Lets keep the pressure on....\nmore ammo please!!!";

//Set random energy
var energy_quote = new Array() 
energy_quote[0] = "Need to reload.....\nSend me some packs please";
energy_quote[1] = "After some (red bull's) LOL :)\nSend a couple energy packs please";
energy_quote[2] = "After a energy pack please";
energy_quote[3] = "Damm burning energy fast... \nSend some please";
energy_quote[4]=  "Energy Energy :)... \nThanks!";

setTimeout(function(){
try{
//Set Default comment for dialogs we dont know about
var AutoComment = document.getElementsByClassName('UIStoryAttachment_Title')[0].getElementsByTagName('a')[0].innerHTML;

//Set random quotes
var fight_boost_comment = fight_boost_quotes[eval(Math.round(Math.random()*(fight_boost_quotes.length-1)))];
var level_quote_comment = level_quote[eval(Math.round(Math.random()*(level_quote.length-1)))];
var war_comment = war_quote[eval(Math.round(Math.random()*(war_quote.length-1)))];
var daily_comment = daily_quote[eval(Math.round(Math.random()*(daily_quote.length-1)))];
var crew_comment = crew_quote[eval(Math.round(Math.random()*(crew_quote.length-1)))];
var family_boss_comment = family_boss_quote[eval(Math.round(Math.random()*(family_boss_quote.length-1)))];

//Set Tiny Link Back To Server
var txtLink = document.getElementsByClassName('UIStoryAttachment_Title')[0];
var a = txtLink.getElementsByTagName('a')[0].href;

//Json for php script
try{

var data  ='{"script_version":"'+script_version+'","url":"'+a+'"}'
data = Base64.encode(data);

}catch(err){}
document.getElementsByClassName('platform_dialog_header')[0].innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<label class="uiButton"><a href="http://screepts.com/shortenurl.php?&data='+data+'" target="_blank" >Get Tinyurl</a></label>';

var vars = a.split("?");
var next_action = getQueryVariable("next_action",vars[1]);
var next_controller = getQueryVariable("next_controller",vars[1]);
//NEXT ACTION
if (next_action == 'power_pack_get'){AutoComment ='Need some stamina packs thanks :)';}
if (next_action == 'send_energy_mbox'||next_action == 'send_energy'){AutoComment = 'Dam burning this energy.. need a couple thanks!!! :)';}
if (next_action == 'levelUpBonusClaim'){AutoComment = level_quote_comment;}

//NEXT CONTROLLER
if (next_controller == 'limitedTimeProperty'){AutoComment ='Need more property parts, thanks, will return the favour if I have clicks left :)';}
if (next_controller == 'war'){AutoComment = war_comment;}
if (next_controller == 'fight'){AutoComment = fight_boost_comment;}
if (next_controller == 'DailyTakeV3'){AutoComment = daily_comment;}
if (next_controller == 'freegifts'){AutoComment = 'Please send me a couple\nThanks and don;t forget the Brazil and Chicago crews!! :)';}
if (next_controller == 'stats'){AutoComment = 'Looking for couple items thanks!! :)';}
//if (next_controller == 'propertyV2'){AutoComment = 'Need parts to upgrade... Thanks!! :)';}

//Multi
if (next_controller == 'job' && next_action == 'accept_city_crew_feed' ){AutoComment = crew_comment;}
if (next_controller == 'job' && next_action == 'give_help' ){AutoComment = 'Giving out free XP all regions finished \nThanks :)';}
if (next_controller == 'job' && next_action == 'sd_boost_get' ){AutoComment = '2x Loot...!!\nNeed the boosts thanks! :)';}
if (next_controller == 'Epicclanboss' && next_action == 'ask_feed_click' ){AutoComment = family_boss_comment;}
if (next_controller == 'robbing' && next_action == 'call_for_help_get_phone' ){AutoComment = 'In the mood for some robbing :)\nThanks!!';}
if (next_controller == 'socialmission' && next_action == 'joinMission' ){AutoComment = 'Need help on my mission please....\nTop rewards!!';}
if (next_controller == 'fight' && next_action == 'send_boost_from_feed'){AutoComment = 'Need some boosts\nIm off to fight some badboys!!!'}
if (next_controller == 'quest' && next_action == 'questFeedReward'){AutoComment = 'Yah.. Completed!!\nThanks come get rewarded'}

//Timer delay so facebook doesn't grayout & doesn't effect firefox'
if (navigator.userAgent.indexOf("Firefox") == -1){
   //For NON FF Browsers
try{document.getElementById('feedform_user_message').click();}catch(err){}
 
}

setTimeout(function(){
document.getElementById('feedform_user_message').value = AutoComment;
},750);

}catch(err){}

},750)
function getQueryVariable(variable,query) {
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
}

var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	}
 

 
}
}

//Finished
})();