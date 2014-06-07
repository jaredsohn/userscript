// ==UserScript==
// @name           MafiaWars Auto Comment Feed
// @namespace      MafiaWars Auto Comment Feed
// @version        1.50.0
// @date           2012-01-29
// @description    Auto Add Random Text To Your Mafia Feeds
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
fight_boost_quotes[1] = "Free boost :)";
                      
                      
//Set random level up 
var level_quote = new Array() 
level_quote[0] = "plus+";

//Set random war up 
var war_quote = new Array() 
war_quote[0] = "WAAAAAAAAAAARRRRRRR Need help";
//Set random DailyTake 
var daily_quote = new Array() 
daily_quote[0] = "Daily Take";
//Set random crew 
var crew_quote = new Array() 
crew_quote[0] = "Need crew";

//Set random family
var family_boss_quote = new Array() 
family_boss_quote[0] = "needs more Rifle Rounds";

//Set random energy
var energy_quote = new Array() 
energy_quote[0] = "needs more energy to commit crimes";

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
if (next_action == 'power_pack_get'){AutoComment ='Power Pack to restore his Stamina or Health';}
if (next_action == 'send_energy_mbox'||next_action == 'send_energy'){AutoComment = 'needs more energy to commit crimes';}
if (next_action == 'levelUpBonusClaim'){AutoComment = level_quote_comment;}

//NEXT CONTROLLER
if (next_controller == 'limitedTimeProperty'){AutoComment ='Need more property parts';}
if (next_controller == 'war'){AutoComment = war_comment;}
if (next_controller == 'fight'){AutoComment = fight_boost_comment;}
if (next_controller == 'DailyTakeV3'){AutoComment = daily_comment;}
if (next_controller == 'freegifts'){AutoComment = 'Please send me n Thanks!! :)';}
if (next_controller == 'stats'){AutoComment = 'Looking for couple items thanks!! :)';}
//if (next_controller == 'propertyV2'){AutoComment = 'Need parts to upgrade... Thanks!! :)';}

//Multi
if (next_controller == 'job' && next_action == 'accept_city_crew_feed' ){AutoComment = crew_comment;}
if (next_controller == 'job' && next_action == 'give_help' ){AutoComment = 'cannot get the job done alone';}
if (next_controller == 'job' && next_action == 'sd_boost_get' ){AutoComment = 'Please give me 2x loot boosts';}
if (next_controller == 'Epicclanboss' && next_action == 'ask_feed_click' ){AutoComment = family_boss_comment;}
if (next_controller == 'robbing' && next_action == 'call_for_help_get_phone' ){AutoComment = 'needs more Burners ';}
if (next_controller == 'socialmission' && next_action == 'joinMission' ){AutoComment = 'Need help on my mission';}
if (next_controller == 'fight' && next_action == 'send_boost_from_feed'){AutoComment = 'needs a fight boost to regain superhuman strength'}
if (next_controller == 'quest' && next_action == 'questFeedReward'){AutoComment = 'completed +$'}

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