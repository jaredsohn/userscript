// ==UserScript==
// @name			Faceraper2011
// @namespace		FR2011
// @description		364 pounds in stone
// @include			http://*.facepunch*.com/*
// @license			WTFPL; http://sam.zoy.org/wtfpl/
//
// ==/UserScript==

//stop shit from breaking
//probably will have far more here soon
var SECURITYTOKEN = "";

/*
TODO

THREADS
	THREAD FILTER
		List Management
		Username whitelist/blacklist
		Title whitelist/blacklist
		OPTION: Shuffle whitelisted to the top
		OPTION: Shuffle blacklisted to the bottom
		OPTION: Hide blacklisted completely
	POST FILTER
		OPTION: Hide blacklisted posts completely

	GENERIC WELCOME TO FACERAPER 2010 MESSAGE
*/


function FR_CFG_CREATE(){
	//wrapping witchcraft
	this.__proto__ = {
		'SETTINGS': {
			'FO_CurrModList': ['TOGG', false, 'Current Mod list', 'Show event links for current moderators'],
			'FO_OldModList': ['TOGG', false, 'Ex Mod list', 'Show event links for former moderators'],
			'FO_VOldModList': ['TOGG', false, 'Old Mod list', 'Show event links for former moderators (will not be much)'],
			'FO_OldEvents': ['TOGG', false, 'Old events', 'Show event links for retired event types'],
			'FO_RefCampLnk': ['TOGG', false, 'RefCamp posts', 'Show links to refugee camp posts for bans (mods only)'],
			'FO_Eventcntr': ['TOGG', false, 'Event Counter', 'Show a count for events at the bottom of the page'],
			
			'FO_AutoFilter': ['TOGG', false, 'Autofilter', 'Enable the post filter'],
			'FO_ShowScore': ['TOGG', false, 'Hidden Warning', 'Show massive ugly message above hidden posts (click message to unhide)'],
			'FO_Smrtness': ['TOGG', false, 'Smartness', 'Show post scores as smartness'],
			'FO_AFDebug': ['TOGG', false, 'Show Debug', 'Show ugly ass debug menu on posts'],
			'FO_SuperHidden': ['TOGG', false, 'SuperHidden', 'Make hidden posts completely vanish'],
			
			'FO_TUserFilter': ['TOGG', false, 'User Filtering', "Highlight threads from users in your blacklist in red"],
			'FO_TUserStalk': ['TOGG', false, 'User Stalking', "Highlight threads from users in your whitelist in green"],
			'FO_TTitleFilter': ['TOGG', false, 'Title Filtering', "Highlight threads with keywords(title filter words) in the title in red"],
			'FO_TTitleStalk': ['TOGG', false, 'Title Stalking', "Highlight threads with keywords(title stalk words) in the title in green"],
			'FO_ThreadBump': ['TOGG', false, 'Thread Bump', "Move green threads to the top of the threadlist"],
			'FO_ThreadNuke': ['TOGG', false, 'Thread Nuke', "Move red threads to the bottom of the threadlist"],
			'FO_StickyLock': ['TOGG', false, 'Include Stickied/Locked', "Apply filters to locked or stickied threads"],
			
			'FO_BBCodeList': ['TOGG', false, 'BBCodeList', 'Show clickable bbcode list'],
			'FO_SmileyList': ['TOGG', false, 'Smiley Emotes', 'Show clickable generic smiley list'],
			'FO_RetortList': ['TOGG', false, 'Response Emotes', 'Show clickable witty emote list'],
			'FO_OddList': ['TOGG', false, 'Odd Emotes', 'Show clickable odd emote list'],
			'FO_UnsortedList': ['TOGG', false, 'Unsorted Emotes', 'Show clickable unsorted emote list'],
			'FO_FlagsList': ['TOGG', false, 'Flag Mod Emotes', 'Show clickable flags emote list'],
			'FO_MediaList': ['TOGG', false, 'Media/Gameslist Emotes', 'Show clickable media emote list'],
			'FO_DrugsList': ['TOGG', false, 'Drugs/Deviancy Emotes', 'Show clickable drug/deviant emote list'],
			'FO_TextList': ['TOGG', false, 'Text Emotes', 'Show clickable text emote list'],
			'FO_AutoClose': ['TOGG', false, 'AutoClose', 'Autoclose emote menus after a quick reply'],
			'FO_AwesomePanel': ['TOGG', false, 'Awesome Panel', 'Add buttons and menus to Posts'],
			'FO_ImageInfo': ['TOGG', false, 'ImageInfo', 'Clicking on images brings up a menu for tineye and other sites'],
			'FO_RefCampBanInfo': ['TOGG', false, 'RefCamp Ban Info', 'Shows the recent mod action on threads in the refugee camp (golds/mods only)'],
			'FO_blacklist': ['LIST', [], 'User Blacklist', 'User', 'background-color:#FF0000!important;color:#000000!important;'],
			'FO_whitelist': ['LIST', [], 'User Whitelist', 'User', 'background-color:#00FF00!important;color:#000000!important;'],
			'FO_tblacklist': ['LIST', [], 'Title Blacklist', 'Title', 'background-color:#FF0000!important;color:#000000!important;'],
			'FO_twhitelist': ['LIST', [], 'Title Whitelist', 'Title', 'background-color:#00FF00!important;color:#000000!important;'],
			'FL_BlueMember': ['INT', 1, 'Blue Member', 'One Time Bonus'],
			'FL_Moderator': ['INT', 1000, 'Moderator', 'One Time Bonus'],
			'FL_GoldMember': ['INT', 500, 'Gold Member', 'One Time Bonus'],
			'FL_BannedMember': ['INT', -500, 'Banned', 'One Time Bonus'],
			'FL_DefaultAva': ['INT', -500, 'Default Avatar', 'One Time Bonus'],
			'FL_YourPost': ['INT', 1000, 'Your Post', 'One Time Bonus'],
			'FL_NewPost': ['INT', 100, 'New Post', 'One Time Bonus'],
			'FL_HasRatings': ['INT', 50, 'Has Ratings', 'One Time Bonus'],
			'FL_Blacklisted': ['INT', -5000, 'Blacklisted User', 'One Time Bonus'],
			'FL_Whitelisted': ['INT', 5000, 'Whitelisted User', 'One Time Bonus'],
			'FL_UserPostCnt': ['INT', 1, 'User Post Count', 'Post Stats'],
			'FL_MonthCount': ['INT', 2, 'User Month Count', 'Post Stats'],
			'FL_ImageCount': ['INT', -50, 'Post Image Count', 'Post Stats'],
			'FL_EmoteCount': ['INT', -100, 'Post Emote Count', 'Post Stats'],
			'FL_QuoteCount': ['INT', -10, 'Post Quote Count', 'Post Stats'],
			'FL_MediaCount': ['INT', -10, 'Post Media Count', 'Post Stats'],
			'FL_LinkCount': ['INT', -10, 'Post Link Count', 'Post Stats'],
			'FL_LineCount': ['INT', -50, 'Post Line Count', 'Post Stats'],
			'FL_BBCodeCount': ['INT', -50, 'Post BBcode Count', 'Post Stats'],
			'FL_RatingAgree': ['INT', 20, 'Agree', 'Ratings'],
			'FL_RatingFunny': ['INT', 20, 'Funny', 'Ratings'],
			'FL_RatingRatingWinner': ['INT', 20, 'Winner', 'Ratings'],
			'FL_RatingDumb': ['INT', -60, 'Dumb', 'Ratings'],
			'FL_RatingDisagree': ['INT', -70, 'Disagree', 'Ratings'],
			'FL_RatingInform': ['INT', 10, 'Informative', 'Ratings'],
			'FL_RatingFriendly': ['INT', 20, 'Friendly', 'Ratings'],
			'FL_RatingUseful': ['INT', 10, 'Useful', 'Ratings'],
			'FL_RatingOptimistic': ['INT', -40, 'Optimistic', 'Ratings'],
			'FL_RatingArtistic': ['INT', 10, 'Artistic', 'Ratings'],
			'FL_RatingLate': ['INT', -20, 'Late', 'Ratings'],
			'FL_RatingBadSpell': ['INT', -20, 'Bad Spelling', 'Ratings'],
			'FL_RatingBadRead': ['INT', -20, 'Bad Reading', 'Ratings'],
			'FL_RatingZing': ['INT', 20, 'Zing', 'Ratings'],
			'FL_RatingOIFY': ['INT', 10, 'OIFY', 'Ratings'],
			'FL_RatingProgKing': ['INT', 20, 'Programming King', 'Ratings'],
			'FL_RatingLuaKing': ['INT', 20, 'Lua King', 'Ratings'],
			'FL_RatingLuaHelp': ['INT', 10, 'Lua Helper', 'Ratings'],
			'FL_RatingMapKing': ['INT', 20, 'Mapping King', 'Ratings'],
			'FL_RatingSmarked': ['INT', 10, 'Smarked', 'Ratings']
		},
		'MENU': {
			'Event Log': ['FO_CurrModList','FO_OldModList','FO_VOldModList','FO_OldEvents','FO_RefCampLnk','FO_Eventcntr'],
			'Post Filtering': ['FO_AutoFilter','FO_ShowScore','FO_Smrtness','FO_AFDebug','FO_SuperHidden'],
			'Thread Filtering': ['FO_TUserFilter','FO_TUserStalk','FO_TTitleFilter','FO_TTitleStalk','FO_ThreadBump','FO_ThreadNuke','FO_StickyLock'],
			'Emote lists': ['FO_BBCodeList','FO_SmileyList','FO_RetortList','FO_OddList','FO_UnsortedList','FO_FlagsList','FO_MediaList','FO_DrugsList','FO_TextList','FO_AutoClose'],
			'MISC': ['FO_AwesomePanel','FO_ImageInfo','FO_RefCampBanInfo']
		},
		'LISTS': {
			'User Lists': ['FO_blacklist','FO_whitelist'],
			'Title Lists': ['FO_tblacklist','FO_twhitelist']
		},
		'FILTERS':{
			'One Time bonus': ['FL_BlueMember', 'FL_Moderator','FL_GoldMember','FL_BannedMember','FL_DefaultAva','FL_YourPost','FL_NewPost','FL_HasRatings','FL_Blacklisted','FL_Whitelisted'],
			'Post Stats': ['FL_UserPostCnt','FL_MonthCount','FL_ImageCount','FL_EmoteCount','FL_QuoteCount','FL_MediaCount','FL_LinkCount','FL_LineCount','FL_BBCodeCount'],
			'Ratings': ['FL_RatingAgree','FL_RatingFunny','FL_RatingRatingWinner','FL_RatingDumb','FL_RatingDisagree','FL_RatingInform','FL_RatingFriendly','FL_RatingUseful','FL_RatingOptimistic','FL_RatingArtistic','FL_RatingLate','FL_RatingBadSpell','FL_RatingBadRead','FL_RatingZing','FL_RatingOIFY','FL_RatingProgKing','FL_RatingLuaKing','FL_RatingLuaHelp','FL_RatingMapKing','FL_RatingSmarked']
		},
		
		//Setting accessors
		getBool: function( myvar ) {
			if ( ( localStorage.getItem(myvar) == null  ) || ( localStorage.getItem(myvar) == '') ){
				return this['SETTINGS'][myvar][1];
			} else {
				if (localStorage.getItem(myvar) == '1'){
					return true;
				} else if (localStorage.getItem(myvar) == '0'){
					return false;
				} else {
					return false;
				};
			};
		},
		getInt: function( myvar ) {
			if ( ( localStorage.getItem(myvar) == null  ) || ( localStorage.getItem(myvar) == '') ){
				return this['SETTINGS'][myvar][1];
			} else {
				return parseInt( localStorage.getItem(myvar) );
			};
		},
		getString: function( myvar ) {
			if ( ( localStorage.getItem(myvar) == null  ) || ( localStorage.getItem(myvar) == '') ){
				return this['SETTINGS'][myvar][1];
			} else {
				return localStorage.getItem(myvar);
			};
		},
		getArray: function( myvar ) {
			if ( ( localStorage.getItem(myvar) == null  ) || ( localStorage.getItem(myvar) == '') ){
				return this['SETTINGS'][myvar][1];
			} else {
				return localStorage.getItem(myvar).split(',');
			};
		},
		setInt: function(usersetting, settingvar){
			if (typeof( localStorage) != 'undefined') {
				localStorage.setItem(usersetting, settingvar);
			};
		},
		setString: function(usersetting, defaultvar){
			if (typeof( localStorage) != 'undefined') {
				localStorage.setItem(usersetting, settingvar);
			};
		},
		setArray: function(usersetting, settingvar){
			if (typeof( localStorage) != 'undefined') {
				return localStorage.setItem(usersetting, settingvar.toString());
			};
		},
		setBool: function(usersetting, settingvar){
			if (typeof( localStorage) != 'undefined') {
				if (settingvar == true){
					localStorage.setItem(usersetting, '1');
				} else if (settingvar == false){
					localStorage.setItem(usersetting, '0');
				//i fucked up, so lie
				} else {
					localStorage.setItem(usersetting, '1');
				};
			};
		},
		deleteAll: function(){
			if (typeof( localStorage) != 'undefined') {
				for (var prop in FR_CFG['SETTINGS']) {
					if (FR_CFG['SETTINGS'].hasOwnProperty(prop)) {
						localStorage.removeItem(prop);
					};
				};
			};
		},
		
		//Easy Settings
		toggleBool: function(usersetting, chngedisp){
			this.setBool(usersetting, !this.getBool(usersetting));
			if(chngedisp){
				//alert(chngedisp.textContent);
				chngedisp.removeChild(chngedisp.lastChild);
				chngedisp.innerHTML += this.getBoolDisplay(usersetting);
			};
		},
		promptInt: function(usersetting, chngedisp){
			var newint = prompt('Enter new rating', this.getInt(usersetting))
			var sanity = parseInt( newint );
			
			if ( sanity.toString() == "NaN" ) {
				alert("How about trying a number, you stupid faggot.");
			} else {
				this.setInt(usersetting, newint);
				if(chngedisp){
					//alert(chngedisp.textContent);
					chngedisp.removeChild(chngedisp.lastChild);
					chngedisp.innerHTML += this.getIntDisplay(usersetting);
				};
			};
		},
		listManage: function( thelist, theuser ) {
			var realshitlist = this.getArray(thelist);
			if (!theuser) {
				theuser = prompt("Enter Username Here", "Type here");
			};
			var finished = false;
			for (var x=0; x<realshitlist.length; x++) {
				var thisblistitem = realshitlist[x];
				if ( theuser == thisblistitem ) {
					var willyou = confirm('Already in the list, remove?');
					if (willyou){
						alert('Removed ' + theuser);
						realshitlist.splice(x,1);
						this.setArray(thelist, realshitlist );
					} else {
						alert('Keeping ' + theuser);
					};
					finished = true;
				};
			};
			if ( !finished ) {
				var willyou = confirm('Add to Filterlist?');
				if (willyou){
					realshitlist[realshitlist.length] = theuser;
					alert('Added ' + theuser);
					this.setArray(thelist, realshitlist );
				} else {
					alert('Not adding ' + theuser);
				};
			};
		},
		
		//Display Crap
		getIntDisplay: function(usersetting){
			var thenumber = this.getInt(usersetting);
			if (thenumber == 0){
				return '<span style="display:inline-block;border:1px solid black;background-color:#0000FF !important; color:#FFFFFF !important;">'+thenumber+'</span>';
			} else if (thenumber >= 1){
				return '<span style="display:inline-block;border:1px solid black;background-color:#00FF00 !important; color:#000000 !important;">'+thenumber+'</span>';
			} else if (thenumber <= -1){
				return '<span style="display:inline-block;border:1px solid black;background-color:#407bff !important; color:#FFFFFF !important;">'+thenumber+'</span>';
			} else {
				return '<span style="display:inline-block;border:1px solid black;background-color:#000000 !important; color:#FFFFFF !important;">WTF???</span>';
			};
		},
		getBoolDisplay: function(usersetting){
			var thebool = this.getBool(usersetting);
			if (thebool == true){
				return '<span style="background-color:#00FF00 !important; color:#000000 !important;">Enabled</span>';
			} else if (thebool == false){
				return '<span style="background-color:#FF0000 !important; color:#FFFFFF !important;">Disabled</span>';
			} else {
				return '<span style="background-color:#0000FF !important; color:#FFFFFF !important;">WTF???</span>';
			};
		}
	};
};
var FR_CFG = new FR_CFG_CREATE();




/*
	Prototype stuff
*/
Array.prototype.has=function(v){
	for (i=0; i<this.length; i++){
		if (this[i]==v) return true;
	};
	return false;
};


/*
	generic Toggle element
	
	TODO: 
		second argument for display
		why am I using table-row-group???
*/
function FR_ToggleElementEX( id ) {
	panel = document.getElementById( id );
	if (!panel) return false;

	if (panel.style.display == 'none') {
		panel.style.display = 'table-row-group';
	} else {
		panel.style.display = 'none';
	}

	return false;
};
//Dropdown Menu SHit
function FR_ToggleDropdown( id, topc, leftc ) {
	panel = document.getElementById( id );
	if (!panel) return false;

	if (panel.style.display == 'none') {
		panel.style.display = 'block';
		panel.style.position = 'absolute';
		panel.style.top = topc + 'px';
		panel.style.left = leftc + 'px';
	} else {
		panel.style.display = 'none';
	}

	return false;
};
//Post toggle reborn
function FR_TogglePoast( id ) {
	mypost = document.getElementById( id )
	if (!mypost) return false;
	
	if (mypost.style.display == 'none') {
		mypost.style.display = '';
	} else {
		if (mypost.childNodes[5].style.display == 'none') {
			mypost.childNodes[5].style.display = '';
			mypost.childNodes[7].style.display = '';
		
		} else {
			mypost.childNodes[5].style.display = 'none';
			mypost.childNodes[7].style.display = 'none';
		
			if (mypost.childNodes[11]){
				mypost.childNodes[11].style.display = 'none';
			};
		};
	};
	return false;
};
/*
	EMote Lists
	
	Rather then my old method of building this on page load
	I'll only generate it when they are needed
	
	1. Plays nice with FP's Servers, 
	2. Doesn't rape the pageload speed
	3. Won't recreate the menu if it's been opened already
*/
function FR_ShowEmotes( id, textareaid, topc, leftc ) {

	var myel = document.getElementById( id );

	if ( myel ) {
		//If I already made it, why do it again?
		return FR_ToggleDropdown( id, topc, leftc );
	} else {
		var myarr = [];
		var myhtml = "";
		
		if ( id == "FR_emote_smiley") {
			myarr = [
				[":redface:",	"fp/emoot/redface.gif",	"Redface"],[":black101:",	"fp/emoot/black101.gif",	"Black101"],[":crossarms:",	"fp/emoot/crossarms.gif",	"Crossarms"],
				[":saddowns:",	"fp/emoot/saddowns.gif",	"Saddowns"],[":downs:",	"fp/emoot/downs.gif",	"Downs"],[":haw:",	"fp/emoot/haw.gif",	"Haw"],[":sigh:",	"fp/emoot/sigh.gif",	"Sigh"],
				[":emo:",	"fp/emoot/emo.gif",	"Emo"],[":hawaaaafap:",	"fp/emoot/hawaaaafap.gif",	"Hawaaaafap"],[":science:",	"fp/emoot/science.gif",	"Science"],[":downsgun:",	"fp/emoot/downsgun.gif",	"Downsgun"],
				[":devil:",	"fp/emoot/devil.gif",	"Devil"],[":whip:",	"fp/emoot/whip.gif",	"Whip"],[":golfclap:",	"fp/emoot/golfclap.gif",	"Golfclap"],[":cheers:",	"fp/emoot/cheers.gif",	"Cheers"],
				[":geno:",	"fp/emoot/geno.gif",	"Geno"],[":sweatdrop:",	"fp/emoot/sweatdrop.gif",	"Sweatdrop"],[":keke:",	"fp/emoot/keke.gif",	"Keke"],[":butt:",	"fp/emoot/butt.gif",	"Butt"],
				[":eng99:",	"fp/emoot/eng99.gif",	"Eng99"],[":yarr:",	"fp/emoot/yarr.gif",	"Yarr"],[":rolleyes:",	"fp/emoot/rolleyes.gif",	"Rolleyes"],[":eek:",	"fp/emoot/eek.gif",	"Eek"],
				[":ninja:",	"fp/emoot/ninja.gif",	"Ninja"],[":raise:",	"fp/emoot/raise.gif",	"Raise"],[":dance:",	"fp/emoot/dance.gif",	"Dance"],[":aaa:",	"fp/emoot/aaa.gif",	"Aaa"],
				[":neckbeard:",	"fp/emoot/neckbeard.gif",	"Neckbeard"],[":cool:",	"fp/emoot/cool.gif",	"Cool"],[":ohdear:",	"fp/emoot/ohdear.png",	"Ohdear"],[":ese:",	"fp/emoot/ese.gif",	"Ese"],
				[":jihad:",	"fp/emoot/jihad.gif",	"Jihad"],[":hist101:",	"fp/emoot/hist101.gif",	"Hist101"],[":niggly:",	"fp/emoot/niggly.gif",	"Niggly"],[":mad:",	"fp/emoot/mad.gif",	"Mad"],
				[":catholic:",	"fp/emoot/catholic.gif",	"Catholic"],[":Dawkins102:",	"fp/emoot/Dawkins102.gif",	"Dawkins102"],[":cop:",	"fp/emoot/cop.gif",	"Cop"],[":aaaaa:",	"fp/emoot/aaaaa.gif",	"Aaaaa"],
				[":shlick:",	"fp/emoot/shlick.gif",	"Shlick"],[":biggrin:",	"fp/emoot/biggrin.gif",	"Biggrin"],[":3:",	"fp/emoot/3.gif",	"3"],[":xd:",	"fp/emoot/xd.gif",	"Xd"],
				[":fappery:",	"fp/emoot/fappery.gif",	"Fappery"],[":v:",	"fp/emoot/v.gif",	"V"],[":rodimus:",	"fp/emoot/rodimus.gif",	"Rodimus"],[":pirate:",	"fp/emoot/pirate.gif",	"Pirate"],
				[":hydrogen:",	"fp/emoot/hydrogen.gif",	"Hydrogen"],[":blush:",	"fp/emoot/blush.gif",	"Blush"],[":rolleye:",	"fp/emoot/rolleye.gif",	"Rolleye"],[":tinfoil:",	"fp/emoot/tinfoil.gif",	"Tinfoil"],
				[":twisted:",	"fp/emoot/twisted.gif",	"Twisted"],[":pedo:",	"fp/emoot/pedo.gif",	"Pedo"],[":chef:",	"fp/emoot/chef.gif",	"Chef"],[":pseudo:",	"fp/emoot/pseudo.gif",	"Pseudo"],
				[":pervert:",	"fp/emoot/pervert.gif",	"Pervert"],[":crying:",	"fp/emoot/crying.gif",	"Crying"],[":ghost:",	"fp/emoot/ghost.gif",	"Ghost"],
				[":gibs:",	"fp/emoot/gibs.gif",	"Gibs"],[":jerkbag:",	"fp/emoot/jerkbag.gif",	"Jerkbag"],[":gonk:",	"fp/emoot/gonk.gif",	"Gonk"],[":frown:",	"fp/emoot/frown.gif",	"Frown"],
				[":jewish:",	"fp/emoot/jewish.gif",	"Jewish"],[":wink:",	"fp/emoot/wink.gif",	"Wink"],[":argh:",	"fp/emoot/argh.gif",	"Argh"],[":j:",	"fp/emoot/j.gif",	"J"],
				[":smile:",	"fp/emoot/smile.gif",	"Smile"],[":zombie:",	"fp/emoot/zombie.gif",	"Zombie"],[":c00l:",	"fp/emoot/c00l.gif",	"C00l"],[":sun:",	"fp/emoot/sun.gif",	"Sun"],
				[":coal:",	"fp/emoot/coal.gif",	"Coal"],[":what:",	"fp/emoot/what.gif",	"What"],[":wth:",	"fp/emoot/wth.gif",	"Wth"],[":hehe:",	"fp/emoot/hehe.gif",	"Hehe"],
				[":arghfist:",	"fp/emoot/arghfist.gif",	"Arghfist"],[":fh:",	"fp/emoot/fh.gif",	"Fh"],[":shobon:",	"fp/emoot/shobon.gif",	"Shobon"],[":f5h:",	"fp/emoot/f5h.gif",	"F5h"],
				[":goleft:",	"fp/emoot/goleft.gif",	"Goleft"],[":engleft:",	"fp/emoot/engleft.gif",	"Engleft"],[":silent:",	"fp/emoot/silent.gif",	"Silent"],[":eng101:",	"fp/emoot/eng101.gif",	"Eng101"],
				[":ssh:",	"fp/emoot/ssh.gif",	"Ssh"],[":chatter:",	"fp/emoot/chatter.gif",	"Chatter"],[":respek:",	"fp/emoot/respek.gif",	"Respek"],[":confused:",	"fp/emoot/confused.gif",	"Confused"],
				[":monocle:",	"fp/emoot/monocle.gif",	"Monocle"]
			];
			
			
			for (var x=0; x<myarr.length; x++) {
				myhtml += "<a href=\"javascript:FR_InsertTextHelper( '"+textareaid+"', '"+myarr[x][0]+"' );\"><img src='http://cdn.fpcontent.net/"+myarr[x][1]+"' title='"+myarr[x][2]+"' alt='"+myarr[x][2]+"'/></a>";
			};
			
		} else if ( id == "FR_emote_whitty") {
			myarr = [
				[":downswords:",	"fp/emoot/downswords.gif",	"Downswords"],[":allears:",	"fp/emoot/allears.gif",	"Allears"],[":downsbravo:",	"fp/emoot/downsbravo.gif",	"Downsbravo"],
				[":roflolmao:",	"fp/emoot/roflolmao.gif",	"Roflolmao"],[":words:",	"fp/emoot/words.gif",	"Words"],[":bravo:",	"fp/emoot/bravo.gif",	"Bravo"],[":regd08:",	"fp/emoot/regd08.gif",	"Regd08"],
				[":krad2:",	"fp/emoot/krad2.gif",	"Krad2"],[":bravo2:",	"fp/emoot/bravo2.gif",	"Bravo2"],[":objection:",	"fp/emoot/objection.gif",	"Objection"],[":barf:",	"fp/emoot/barf.gif",	"Barf"],
				[":nattyburn:",	"fp/emoot/nattyburn.gif",	"Nattyburn"],[":waycool:",	"fp/emoot/waycool.gif",	"Waycool"],[":hellyeah:",	"fp/emoot/hellyeah.gif",	"Hellyeah"],[":nyd:",	"fp/emoot/nyd.gif",	"Nyd"],
				[":f5:",	"fp/emoot/f5.gif",	"F5"],[":awesome:",	"fp/emoot/awesome.gif",	"Awesome"],[":flame:",	"fp/emoot/flame.gif",	"Flame"],[":fuckoff:",	"fp/emoot/fuckoff.gif",	"Fuckoff"],
				[":downsrim:",	"fp/emoot/downsrim.gif",	"Downsrim"],[":rimshot:",	"fp/emoot/rimshot.gif",	"Rimshot"],[":supaburn:",	"fp/emoot/supaburn.gif",	"Supaburn"],[":techno:",	"fp/emoot/techno.gif",	"Techno"],
				[":toughguy:",	"fp/emoot/toughguy.gif",	"Toughguy"],[":sissies:",	"fp/emoot/sissies.gif",	"Sissies"],[":bandwagon:",	"fp/emoot/bandwagon.gif",	"Bandwagon"],[":cawg:",	"fp/emoot/cawg.gif",	"Cawg"],
				[":shivdurf:",	"fp/emoot/shivdurf.gif",	"Shivdurf"],[":fireman:",	"fp/emoot/fireman.gif",	"Fireman"],[":suicide:",	"fp/emoot/suicide.gif",	"Suicide"],[":rant:",	"fp/emoot/rant.gif",	"Rant"],
				[":gay:",	"fp/emoot/gay.gif",	"Gay"],[":george:",	"fp/emoot/george.gif",	"George"],[":aslol:",	"fp/emoot/aslol.gif",	"Aslol"],[":wotwot:",	"fp/emoot/wotwot.gif",	"Wotwot"],
				[":boonie:",	"fp/emoot/boonie.gif",	"Boonie"],[":tiphat:",	"fp/emoot/tiphat.gif",	"Tiphat"],[":fork:",	"fp/emoot/fork.png",	"Fork"],[":airquote:",	"fp/emoot/airquote.gif",	"Airquote"],
				[":doh:",	"fp/emoot/doh.gif",	"Doh"],[":irony:",	"fp/emoot/irony.gif",	"Irony"]
			];
			
			for (var x=0; x<myarr.length; x++) {
				myhtml += "<a href=\"javascript:FR_InsertTextHelper( '"+textareaid+"', '"+myarr[x][0]+"' );\"><img src='http://cdn.fpcontent.net/"+myarr[x][1]+"' title='"+myarr[x][2]+"' alt='"+myarr[x][2]+"'/></a>";
			};
			
		} else if ( id == "FR_emote_oddball") {
			myarr = [
				[":vick:",	"fp/emoot/vick.gif",	"Vick"],[":tubular:",	"fp/emoot/tubular.gif",	"Tubular"],[":gooncamp:",	"fp/emoot/gooncamp.gif",	"Gooncamp"],[":rubshandstogetheran",	"fp/emoot/rubshandstogetherandgrinsevilly.gif",	"Rubshandstogetherandgrinsevilly"],[":burger:",	"fp/emoot/burger.gif",	"Burger"],
				[":yohoho:",	"fp/emoot/yohoho.gif",	"Yohoho"],[":commissar:",	"fp/emoot/commissar.gif",	"Commissar"],[":horse:",	"fp/emoot/horse.gif",	"Horse"],[":spooky:",	"fp/emoot/spooky.gif",	"Spooky"],[":mason:",	"fp/emoot/mason.gif",	"Mason"],
				[":redhammer:",	"fp/emoot/redhammer.gif",	"Redhammer"],[":pranke:",	"fp/emoot/pranke.gif",	"Pranke"],[":smugissar:",	"fp/emoot/smugissar.gif",	"Smugissar"],[":monar:",	"fp/emoot/monar.gif",	"Monar"],[":phoneb:",	"fp/emoot/phoneb.gif",	"Phoneb"],
				[":phoneline:",	"fp/emoot/phoneline.gif",	"Phoneline"],[":phone:",	"fp/emoot/phone.gif",	"Phone"],[":camera6:",	"fp/emoot/camera6.gif",	"Camera6"],[":FYH:",	"fp/emoot/FYH.gif",	"FYH"],[":killdozer:",	"fp/emoot/killdozer.gif",	"Killdozer"],
				[":buttertroll:",	"fp/emoot/buttertroll.gif",	"Buttertroll"],[":rice:",	"fp/emoot/rice.gif",	"Rice"],[":chio:",	"fp/emoot/chio.gif",	"Chio"],[":stoat:",	"fp/emoot/stoat.gif",	"Stoat"],[":goon:",	"fp/emoot/goon.gif",	"Goon"],
				[":nyoron:",	"fp/emoot/nyoron.gif",	"Nyoron"],[":byobear:",	"fp/emoot/byobear.gif",	"Byobear"],[":sonia:",	"fp/emoot/sonia.gif",	"Sonia"],[":kraken:",	"fp/emoot/kraken.gif",	"Kraken"],[":wmwink:",	"fp/emoot/wmwink.png",	"Wmwink"],
				[":wcc:",	"fp/emoot/wcc.gif",	"Wcc"],[":onlyoption:",	"fp/emoot/onlyoption.gif",	"Onlyoption"],[":goonsay:",	"fp/emoot/goonsay.gif",	"Goonsay"],[":qfg:",	"fp/emoot/qfg.gif",	"Qfg"],[":11tea:",	"fp/emoot/11tea.gif",	"11tea"],
				[":trashbear:",	"fp/emoot/trashbear.gif",	"Trashbear"],[":gb2hd2k:",	"fp/emoot/gb2hd2k.gif",	"Gb2hd2k"],[":lovewcc:",	"fp/emoot/lovewcc.gif",	"Lovewcc"],[":joel:",	"fp/emoot/joel.gif",	"Joel"],[":goonboot:",	"fp/emoot/goonboot.gif",	"Goonboot"],
				[":rudebox:",	"fp/emoot/rudebox.gif",	"Rudebox"],[":uhaul:",	"fp/emoot/uhaul.gif",	"Uhaul"],[":hchatter:",	"fp/emoot/hchatter.gif",	"Hchatter"],[":russbus:",	"fp/emoot/russbus.gif",	"Russbus"],[":goof:",	"fp/emoot/goof.gif",	"Goof"],
				[":gb2byob:",	"fp/emoot/gb2byob.gif",	"Gb2byob"],[":gb2fyad:",	"fp/emoot/gb2fyad.gif",	"Gb2fyad"],[":gb2gbs:",	"fp/emoot/gb2gbs.gif",	"Gb2gbs"],[":wom:",	"fp/emoot/wom.gif",	"Wom"]
			];
			
			for (var x=0; x<myarr.length; x++) {
				myhtml += "<a href=\"javascript:FR_InsertTextHelper( '"+textareaid+"', '"+myarr[x][0]+"' );\"><img src='http://cdn.fpcontent.net/"+myarr[x][1]+"' title='"+myarr[x][2]+"' alt='"+myarr[x][2]+"'/></a>";
			};
		} else if ( id == "FR_emote_unsorted") {
			myarr = [
				[":fuckyou:",	"fp/emoot/fuckyou.gif",	"Fuckyou"],[":razz:",	"fp/emoot/razz.gif",	"Razz"],[":awesomelon:",	"fp/emoot/awesomelon.gif",	"Awesomelon"],[":obama:",	"fp/emoot/obama.gif",	"Obama"],
				[":c00lbert:",	"fp/emoot/c00lbert.gif",	"C00lbert"],[":c00lbutt:",	"fp/emoot/c00lbutt.gif",	"C00lbutt"],[":colbert:",	"fp/emoot/colbert.gif",	"Colbert"],[":frogdowns:",	"fp/emoot/frogdowns.png",	"Frogdowns"],
				[":froggonk:",	"fp/emoot/froggonk.gif",	"Froggonk"],[":frog:",	"fp/emoot/frog.gif",	"Frog"],[":frogsiren:",	"fp/emoot/frogsiren.gif",	"Frogsiren"],[":frogbon:",	"fp/emoot/frogbon.gif",	"Frogbon"],
				[":frogc00l:",	"fp/emoot/frogc00l.gif",	"Frogc00l"],[":gbsmith:",	"fp/emoot/gbsmith.gif",	"Gbsmith"],[":smithicide:",	"fp/emoot/smithicide.gif",	"Smithicide"],[":unsmith:",	"fp/emoot/unsmith.gif",	"Unsmith"],
				[":smith:",	"fp/emoot/smith.gif",	"Smith"],[":unsmigghh:",	"fp/emoot/unsmigghh.gif",	"Unsmigghh"],[":livestock~01-14-04-",	"fp/emoot/livestock%7E01-14-04-whore.gif",	"Livestock~01 14 04 Whore"],[":pwn:",	"fp/emoot/pwn.gif",	"Pwn"],
				[":derp:",	"fp/emoot/derp.gif",	"Derp"],[":sax:",	"fp/emoot/sax.gif",	"Sax"],[":bigtran:",	"fp/emoot/bigtran.gif",	"Bigtran"],[":holy:",	"fp/emoot/holy.gif",	"Holy"],
				[":buddy:",	"fp/emoot/buddy.gif",	"Buddy"],[":spergin:",	"fp/emoot/spergin.png",	"Spergin"],[":laugh:",	"fp/emoot/laugh.gif",	"Laugh"],[":psypop:",	"fp/emoot/psypop.gif",	"Psypop"],
				[":madmax:",	"fp/emoot/madmax.gif",	"Madmax"],[":rock:",	"fp/emoot/rock.gif",	"Rock"],[":havlat:",	"fp/emoot/havlat.gif",	"Havlat"],[":hitler:",	"fp/emoot/hitler.gif",	"Hitler"],
				[":shopkeeper:",	"fp/emoot/shopkeeper.gif",	"Shopkeeper"],
				[":clownballoon:",	"fp/emoot/clownballoon.gif",	"Clownballoon"],
				[":taco:",	"fp/emoot/taco.gif",	"Taco"],
				[":mmmsmug:",	"fp/emoot/mmmsmug.gif",	"Mmmsmug"],
				[":happyelf:",	"fp/emoot/happyelf.gif",	"Happyelf"],
				[":bick:",	"fp/emoot/bick.gif",	"Bick"],
				[":drum:",	"fp/emoot/drum.gif",	"Drum"],
				[":byodood:",	"fp/emoot/byodood.gif",	"Byodood"],
				[":flag:",	"fp/emoot/flag.gif",	"Flag"],
				[":07:",	"fp/emoot/07.gif",	"07"],
				[":glomp:",	"fp/emoot/glomp.gif",	"Glomp"],
				[":coolfish:",	"fp/emoot/coolfish.gif",	"Coolfish"],
				[":mmmhmm:",	"fp/emoot/mmmhmm.gif",	"Mmmhmm"],
				[":riker:",	"fp/emoot/riker.gif",	"Riker"],
				[":hampants:",	"fp/emoot/hampants.gif",	"Hampants"],
				[":hfive:",	"fp/emoot/hfive.gif",	"Hfive"],
				[":slick:",	"fp/emoot/slick.gif",	"Slick"],
				[":psyboom:",	"fp/emoot/psyboom.gif",	"Psyboom"],
				[":sympathy:",	"fp/emoot/sympathy.gif",	"Sympathy"],
				[":06:",	"fp/emoot/06.gif",	"06"],
				[":toot:",	"fp/emoot/toot.gif",	"Toot"],
				[":hf:",	"fp/emoot/hf.gif",	"Hf"],
				[":drac:",	"fp/emoot/drac.gif",	"Drac"],
				[":snoop:",	"fp/emoot/snoop.gif",	"Snoop"],
				[":psyberger:",	"fp/emoot/psyberger.gif",	"Psyberger"],
				[":can:",	"fp/emoot/can.gif",	"Can"],
				[":swoon:",	"fp/emoot/swoon.gif",	"Swoon"],
				[":05:",	"fp/emoot/05.gif",	"05"],
				[":question:",	"fp/emoot/question.gif",	"Question"],
				[":guitar:",	"fp/emoot/guitar.gif",	"Guitar"],
				[":witch:",	"fp/emoot/witch.gif",	"Witch"],
				[":banjo:",	"fp/emoot/banjo.gif",	"Banjo"],
				[":siren:",	"fp/emoot/siren.gif",	"Siren"],
				[":smugspike:",	"fp/emoot/smugspike.png",	"Smugspike"],
				[":love:",	"fp/emoot/love.gif",	"Love"],
				[":sweep:",	"fp/emoot/sweep.gif",	"Sweep"],
				[":04:",	"fp/emoot/04.gif",	"04"],
				[":gonchar:",	"fp/emoot/gonchar.gif",	"Gonchar"],
				[":regd09:",	"fp/emoot/regd09.gif",	"Regd09"],
				[":cthulhu:",	"fp/emoot/cthulhu.gif",	"Cthulhu"],
				[":gtfoycs:",	"fp/emoot/gtfoycs.gif",	"Gtfoycs"],
				[":bang:",	"fp/emoot/bang.gif",	"Bang"],
				[":sg:",	"fp/emoot/sg.gif",	"Sg"],
				[":worship:",	"fp/emoot/worship.gif",	"Worship"],
				[":huh:",	"fp/emoot/huh.gif",	"Huh"],
				[":fyadride:",	"fp/emoot/fyadride.gif",	"Fyadride"],
				[":kiddo:",	"fp/emoot/kiddo.gif",	"Kiddo"],
				[":comeback:",	"fp/emoot/comeback.gif",	"Comeback"],
				[":golgo:",	"fp/emoot/golgo.gif",	"Golgo"],
				[":angel:",	"fp/emoot/angel.gif",	"Angel"],
				[":greatgift:",	"fp/emoot/greatgift.gif",	"Greatgift"],
				[":hr:",	"fp/emoot/hr.gif",	"Hr"],
				[":signings:",	"fp/emoot/signings.gif",	"Signings"],
				[":smugdog:",	"fp/emoot/smugdog.gif",	"Smugdog"],
				[":fiesta:",	"fp/emoot/fiesta.gif",	"Fiesta"],
				[":q:",	"fp/emoot/q.gif",	"Q"],
				[":crow:",	"fp/emoot/crow.gif",	"Crow"],
				[":am:",	"fp/emoot/am.gif",	"Am"],
				[":bahgawd:",	"fp/emoot/bahgawd.gif",	"Bahgawd"],
				[":smug:",	"fp/emoot/smug.gif",	"Smug"]
			];
			
			for (var x=0; x<myarr.length; x++) {
				myhtml += "<a href=\"javascript:FR_InsertTextHelper( '"+textareaid+"', '"+myarr[x][0]+"' );\"><img src='http://cdn.fpcontent.net/"+myarr[x][1]+"' title='"+myarr[x][2]+"' alt='"+myarr[x][2]+"'/></a>";
			};
		} else if ( id == "FR_emote_flags") {
			myarr = [
				[":911:",	"fp/emoot/911.gif",	"911"],[":australia:",	"fp/emoot/australia.gif",	"Australia"],[":belarus:",	"fp/emoot/belarus.gif",	"Belarus"],[":britain:",	"fp/emoot/britain.gif",	"Britain"],
				[":ca:",	"fp/emoot/ca.gif",	"Ca"],[":canada:",	"fp/emoot/canada.gif",	"Canada"],[":china:",	"fp/emoot/china.gif",	"China"],[":denmark:",	"fp/emoot/denmark.gif",	"Denmark"],
				[":france:",	"fp/emoot/france.gif",	"France"],[":mexico:",	"fp/emoot/mexico.gif",	"Mexico"],[":scotland:",	"fp/emoot/scotland.gif",	"Scotland"],[":spain:",	"fp/emoot/spain.gif",	"Spain"],
				[":sweden:",	"fp/emoot/sweden.gif",	"Sweden"],[":ussr:",	"fp/emoot/ussr.gif",	"Ussr"],[":furcry:",	"fp/emoot/furcry.gif",	"Furcry"],[":patriot:",	"fp/emoot/patriot.gif",	"Patriot"],
				[":wcw:",	"fp/emoot/wcw.gif",	"Wcw"],[":tf:",	"fp/emoot/tf.gif",	"Tf"],[":fsmug:",	"fp/emoot/fsmug.gif",	"Fsmug"],[":pluto:",	"fp/emoot/pluto.gif",	"Pluto"]
			];
			
			for (var x=0; x<myarr.length; x++) {
				myhtml += "<a href=\"javascript:FR_InsertTextHelper( '"+textareaid+"', '"+myarr[x][0]+"' );\"><img src='http://cdn.fpcontent.net/"+myarr[x][1]+"' title='"+myarr[x][2]+"' alt='"+myarr[x][2]+"'/></a>";
			};
		} else if ( id == "FR_emote_media") {
			myarr = [
				[":flashfact:",	"fp/emoot/flashfact.gif",	"Flashfact"],[":spidey:",	"fp/emoot/spidey.gif",	"Spidey"],[":kakashi:",	"fp/emoot/kakashi.gif",	"Kakashi"],[":orks:",	"fp/emoot/orks.gif",	"Orks"],
				[":flashfap:",	"fp/emoot/flashfap.gif",	"Flashfap"],[":kratos:",	"fp/emoot/kratos.gif",	"Kratos"],[":doom:",	"fp/emoot/doom.gif",	"Doom"],[":wooper:",	"fp/emoot/wooper.gif",	"Wooper"],
				[":twentyfour:",	"fp/emoot/twentyfour.gif",	"Twentyfour"],[":dota101:",	"fp/emoot/dota101.gif",	"Dota101"],[":yoshi:",	"fp/emoot/yoshi.gif",	"Yoshi"],[":megaman:",	"fp/emoot/megaman.gif",	"Megaman"],
				[":foxnews:",	"fp/emoot/foxnews.gif",	"Foxnews"],[":bsg:",	"fp/emoot/bsg.gif",	"Bsg"],[":mufasa:",	"fp/emoot/mufasa.png",	"Mufasa"],[":lron:",	"fp/emoot/lron.gif",	"Lron"],
				[":zerg:",	"fp/emoot/zerg.gif",	"Zerg"],[":quagmire:",	"fp/emoot/quagmire.gif",	"Quagmire"],[":doink:",	"fp/emoot/doink.gif",	"Doink"],[":lost:",	"fp/emoot/lost.gif",	"Lost"],
				[":axe:",	"fp/emoot/axe.gif",	"Axe"],[":mario:",	"fp/emoot/mario.gif",	"Mario"],[":wookie:",	"fp/emoot/wookie.gif",	"Wookie"],[":sharpton:",	"fp/emoot/sharpton.gif",	"Sharpton"],
				[":todd:",	"fp/emoot/todd.gif",	"Todd"],
				[":d:",	"fp/emoot/d.png",	"D"],
				[":h:",	"fp/emoot/h.png",	"H"],
				[":s:",	"fp/emoot/s.png",	"S"],
				[":c:",	"fp/emoot/c.png",	"C"],
				[":wal:",	"fp/emoot/wal.gif",	"Wal"],
				[":psyduck:",	"fp/emoot/psyduck.gif",	"Psyduck"],
				[":ironicat:",	"fp/emoot/ironicat.gif",	"Ironicat"],
				[":kamina:",	"fp/emoot/kamina.gif",	"Kamina"],
				[":pcgaming:",	"fp/emoot/pcgaming.gif",	"Pcgaming"],
				[":pcgaming1:",	"fp/emoot/pcgaming1.gif",	"Pcgaming1"],
				[":bubblewoop:",	"fp/emoot/bubblewoop.gif",	"Bubblewoop"],
				[":xie:",	"fp/emoot/xie.gif",	"Xie"],
				[":ssj:",	"fp/emoot/ssj.gif",	"Ssj"],
				[":milk:",	"fp/emoot/milk.gif",	"Milk"],
				[":zoro:",	"fp/emoot/zoro.gif",	"Zoro"],
				[":itjb:",	"fp/emoot/itjb.gif",	"Itjb"],
				[":stat:",	"fp/emoot/stat.gif",	"Stat"],
				[":clint:",	"fp/emoot/clint.gif",	"Clint"],
				[":ramsay:",	"fp/emoot/ramsay.gif",	"Ramsay"],
				[":zoid:",	"fp/emoot/zoid.gif",	"Zoid"],
				[":psylon:",	"fp/emoot/psylon.gif",	"Psylon"]
			]
			
			for (var x=0; x<myarr.length; x++) {
				myhtml += "<a href=\"javascript:FR_InsertTextHelper( '"+textareaid+"', '"+myarr[x][0]+"' );\"><img src='http://cdn.fpcontent.net/"+myarr[x][1]+"' title='"+myarr[x][2]+"' alt='"+myarr[x][2]+"'/></a>";
			};
		} else if ( id == "FR_emote_deviancy") {
			myarr = [
				[":dominic:",	"fp/emoot/dominic.gif",	"Dominic"],[":a2m:",	"fp/emoot/a2m.gif",	"A2m"],[":classic_fillmore:",	"fp/emoot/classic_fillmore.gif",	"Classic Fillmore"],
				[":shroom:",	"fp/emoot/shroom.gif",	"Shroom"],[":2bong:",	"fp/emoot/2bong.png",	"2bong"],[":350:",	"fp/emoot/350.gif",	"350"],[":weed:",	"fp/emoot/weed.gif",	"Weed"],
				[":lsd:",	"fp/emoot/lsd.gif",	"Lsd"],[":gizz:",	"fp/emoot/gizz.gif",	"Gizz"],[":dong:",	"fp/emoot/dong.gif",	"Dong"],[":pipe:",	"fp/emoot/pipe.gif",	"Pipe"],
				[":goatse:",	"fp/emoot/goatse.gif",	"Goatse"],[":flaccid:",	"fp/emoot/flaccid.gif",	"Flaccid"],[":coffee:",	"fp/emoot/coffee.gif",	"Coffee"],[":ccb:",	"fp/emoot/ccb.gif",	"Ccb"],
				[":sotw:",	"fp/emoot/sotw.gif",	"Sotw"],[":munch:",	"fp/emoot/munch.gif",	"Munch"],[":drugnerd:",	"fp/emoot/drugnerd.gif",	"Drugnerd"],[":stalker:",	"fp/emoot/stalker.gif",	"Stalker"]
			];
			
			for (var x=0; x<myarr.length; x++) {
				myhtml += "<a href=\"javascript:FR_InsertTextHelper( '"+textareaid+"', '"+myarr[x][0]+"' );\"><img src='http://cdn.fpcontent.net/"+myarr[x][1]+"' title='"+myarr[x][2]+"' alt='"+myarr[x][2]+"'/></a>";
			};
		} else if ( id == "FR_emote_text") {
			myarr = [
				[":20bux:",	"fp/emoot/20bux.gif",	"20bux"],[":10bux:",	"fp/emoot/10bux.gif",	"10bux"],[":byob:",	"fp/emoot/byob.gif",	"Byob"],[":byewhore:",	"fp/emoot/byewhore.gif",	"Byewhore"],
				[":damn:",	"fp/emoot/damn.gif",	"Damn"],[":coupons:",	"fp/emoot/coupons.gif",	"Coupons"],[":effort:",	"fp/emoot/effort.gif",	"Effort"],[":downsowned:",	"fp/emoot/downsowned.gif",	"Downsowned"],
				[":firstpost:",	"fp/emoot/firstpost.gif",	"Firstpost"],[":nws:",	"fp/emoot/nws.gif",	"Nws"],[":w00t:",	"fp/emoot/w00t.gif",	"W00t"],[":lol:",	"fp/emoot/lol.gif",	"Lol"],
				[":protarget:",	"fp/emoot/protarget.gif",	"Protarget"],[":wrongful:",	"fp/emoot/wrongful.gif",	"Wrongful"],[":filez:",	"fp/emoot/filez.gif",	"Filez"],[":whoptc:",	"fp/emoot/whoptc.gif",	"Whoptc"],
				[":iceburn:",	"fp/emoot/iceburn.gif",	"Iceburn"],[":godwin:",	"fp/emoot/godwin.gif",	"Godwin"],[":ftbrg:",	"fp/emoot/ftbrg.gif",	"Ftbrg"],[":wtc:",	"fp/emoot/wtc.gif",	"Wtc"],
				[":owned:",	"fp/emoot/owned.gif",	"Owned"],[":their:",	"fp/emoot/their.gif",	"Their"],[":w2byob:",	"fp/emoot/w2byob.gif",	"W2byob"],[":master:",	"fp/emoot/master.gif",	"Master"],
				[":evol-anim:",	"fp/emoot/evol-anim.gif",	"Evol Anim"],[":moustache:",	"fp/emoot/moustache.gif",	"Moustache"],[":ms:",	"fp/emoot/ms.gif",	"Ms"],[":iia:",	"fp/emoot/iia.png",	"Iia"],
				[":iiaca:",	"fp/emoot/iiaca.gif",	"Iiaca"],[":iiam:",	"fp/emoot/iiam.gif",	"Iiam"],[":page3:",	"fp/emoot/page3.gif",	"Page3"],[":toxx:",	"fp/emoot/toxx.gif",	"Toxx"],
				[":google:",	"fp/emoot/google.gif",	"Google"],[":synpa:",	"fp/emoot/synpa.gif",	"Synpa"],[":woof:",	"fp/emoot/woof.gif",	"Woof"],[":woop:",	"fp/emoot/woop.gif",	"Woop"],
				[":nms:",	"fp/emoot/nms.gif",	"Nms"],[":hurr:",	"fp/emoot/hurr.gif",	"Hurr"],[":whatup:",	"fp/emoot/whatup.gif",	"Whatup"],[":laffo:",	"fp/emoot/laffo.gif",	"Laffo"],
				[":wtf:",	"fp/emoot/wtf.gif",	"Wtf"],[":vd:",	"fp/emoot/vd.gif",	"Vd"]
			];
			
			for (var x=0; x<myarr.length; x++) {
				myhtml += "<a href=\"javascript:FR_InsertTextHelper( '"+textareaid+"', '"+myarr[x][0]+"' );\"><img src='http://cdn.fpcontent.net/"+myarr[x][1]+"' title='"+myarr[x][2]+"' alt='"+myarr[x][2]+"'/></a>";
			};
		} else if ( id == "FR_emote_bbcode") {
			var myarr = [
				["b",	"Bold",	false],["i",	"Italic",	false],
				["u",	"Underline",	false],["highlight",	"Highlight",	false],
				["sp",	"Spoiler",	false],["del",	"Delete",	false],
				["url",	"Url",	false],["media",	"Video",	false],
				["img",	"Image",	false],["img_thumb",	"Image Thumbnail",	false],
				["tab",	"Tab",	false],["release",	"Release",	false],
				["editline",	"Edited:",	false],["code",	"Code",	false],
				["quote",	"Quote",	false],["html",	"HTML",	false],
				["php",	"PHP",	false],["email",	"Email",	false],
				["thread",	"Thread",	false],["post",	"Post",	false],
				["url",	"Url Special",	"\"Enter a Url\""],
				["quote",	"Quote Special",	"'Enter a Username'"],
				["email",	"Email Special",	"'Enter an Email Address'"],
				["thread",	"Thread Special",	"'Enter a Thread ID'"],
				["post",	"Post Special",	"'Enter a Post ID'"]
			];
			
			for (var x=0; x<myarr.length; x++) {
				myhtml += "<a href=\"javascript:FR_InsertBBHelper( '"+textareaid+"', '"+myarr[x][0]+"', "+myarr[x][2]+" );\">"+myarr[x][1]+"</a>, ";
			};
		};
		
		//menu
		var cooldiv = document.createElement('div');
		cooldiv.className = "top popupbox urlbox";
		cooldiv.style.display = 'none'
		cooldiv.style.width = "250px"
		cooldiv.style.zIndex = "3";
		cooldiv.id = id;
		cooldiv.innerHTML = '<div style="float: right;"><a onclick="return CloseThis(this);" href="#"><img src="/fp/close.png"></a></div>';
		cooldiv.innerHTML += myhtml;

		document.getElementById("content_pad").appendChild(cooldiv);
		
	};
	FR_ToggleDropdown( id, topc, leftc );
};

function FR_ShowImgInfo( iurl, topc, leftc ) {
	var id = iurl.substring( iurl.lastIndexOf("/") + 1, iurl.length);
	var myel = document.getElementById( id );
	
	if ( myel ) {
		//If I already made it, why do it again?
		return FR_ToggleDropdown( id, topc, leftc );
	} else {
		myarr = [
			['http://regex.info/exif.cgi?url=',				"http://regex.info/favicon.ico",	"EXIF"],
			['http://iqdb.org/?url=',						"http://iqdb.org/favicon.ico",	"IQDB"],
			['http://saucenao.com/search.php?db=999&url=',	"http://saucenao.com/favicon.ico",	"saucenao"],
			['http://tineye.com/search?url=',				"http://tineye.com/favicon.ico",	"tineye"],
			['http://www.gazopa.com/similar?=Search&key_url=',	"http://www.gazopa.com/favicon.ico",	"gazopa"]
		];

		//menu
		var cooldiv = document.createElement('div');
		cooldiv.className = "top popupbox urlbox";
		cooldiv.style.display = 'none'
		cooldiv.style.width = "250px"
		cooldiv.style.zIndex = "3";
		cooldiv.id = id;
		cooldiv.innerHTML = '<div style="float: right;"><a onclick="return CloseThis(this);" href="#"><img src="/fp/close.png"></a></div>'+
			'<h2><span style="font-weight: bold;">ImageInfo:</span></h2>';
		
		for (var x=0; x<myarr.length; x++) {
			cooldiv.innerHTML += "<a href='"+myarr[x][0]+escape(iurl)+"'><img style='width:16px;height:16px;' src='"+myarr[x][1]+"' title='"+myarr[x][2]+"' alt='"+myarr[x][2]+"'/>"+myarr[x][2]+"</a><br />";
		};
		document.getElementById("content_pad").appendChild(cooldiv);
		
	};
	FR_ToggleDropdown( id, topc, leftc );
};

function FR_ShowUserHist(UserID,UserName,SubforumID,SubforumName,topc,leftc ) {
	var id = "digger_"+UserID;
	var myel = document.getElementById( id );
	
	if ( myel ) {
		//If I already made it, why do it again?
		return FR_ToggleDropdown( id, topc, leftc );
	} else {

		//menu
		var cooldiv = document.createElement('div');
		cooldiv.className = "top popupbox urlbox";
		cooldiv.style.display = 'none'
		cooldiv.style.width = "450px"
		cooldiv.style.zIndex = "3";
		cooldiv.id = id;
		cooldiv.innerHTML = '<div style="float: right;"><a onclick="return CloseThis(this);" href="#"><img src="/fp/close.png"></a></div>'+
		'<span style="color:red;">History</span> '+
		'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+UserID+'&contenttype=vBForum_Post&showposts=1">Find posts</a></div> '+
		'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+UserID+'&contenttype=vBForum_Thread">Find threads</a></div> '+
		'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/fp_images.php?u='+UserID+'">Find images</a></div> '+
		'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+UserID+'&contenttype=vBForum_Post&showposts=1&forumchoice[]='+SubforumID+'">Find posts in '+SubforumName+'</a></div> '+
		'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+UserID+'&contenttype=vBForum_Thread&forumchoice[]='+SubforumID+'">Find threads in '+SubforumName+'</a></div> '+
		'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/fp_images.php?u='+UserID+'&f='+SubforumID+'">Find images in '+SubforumName+'</a></div> '+
		'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+UserID+'&contenttype=vBForum_SocialGroupMessage">Find group messages</a></div> '+
		'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+UserID+'&contenttype=vBForum_SocialGroupMessage&starteronly=1">Find group threads</a></div> '+
		'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+UserID+'&contenttype=vBForum_VisitorMessage">Find visitor messages</a></div> '+
		'<br /><br /> <span style="color:red;">Events</span> '+
		'<a href="fp_events.php?user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' events" src="http://static.facepunch.com/fp/navbar/events.png" title="'+UserName+' events"> </a>'+
		'<a href="fp_events.php?type=closed&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' closed" src="fp/events/closed.png" title="'+UserName+' closed"> </a>'+
		'<a href="fp_events.php?type=opened&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' opened" src="fp/events/opened.png" title="'+UserName+' opened"> </a>'+
		'<a href="fp_events.php?type=ban&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' ban" src="fp/events/ban.png" title="'+UserName+' ban"> </a>'+
		'<a href="fp_events.php?type=unban&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' unban" src="fp/events/unban.png" title="'+UserName+' unban"> </a>'+
		'<a href="fp_events.php?type=ddt&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' ddt" src="fp/events/ddt.png" title="'+UserName+' ddt"> </a>'+
		'<a href="fp_events.php?type=rename&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' rename" src="fp/events/rename.png" title="'+UserName+' rename"> </a>'+
		'<a href="fp_events.php?type=delhard&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' delhard" src="fp/events/delhard.png" title="'+UserName+' delhard"> </a>'+
		'<a href="fp_events.php?type=delsoft&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' delsoft" src="fp/events/delsoft.png" title="'+UserName+' delsoft"> </a>'+
		'<a href="fp_events.php?type=join&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' join" src="fp/events/join.png" title="'+UserName+' join"> </a>'+
		'<a href="fp_events.php?type=pban&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' pban" src="fp/events/pban.png" title="'+UserName+' pban"> </a>'+
		'<a href="fp_events.php?type=capsfix&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' capsfix" src="fp/events/capsfix.png" title="'+UserName+' capsfix" ></a>'+
		'<a href="fp_events.php?type=mov&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' mov" src="fp/events/mov.png" title="'+UserName+' mov"> </a>' +
		'<a href="fp_events.php?type=nforum&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' nforum" src="fp/events/nforum.png" title="'+UserName+' nforum"> </a>' +
		'<a href="fp_events.php?type=banr&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' banr" src="fp/events/banr.png" title="'+UserName+' banr"> </a>' +
		'<a href="fp_events.php?type=bani&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' bani" src="fp/events/bani.png" title="'+UserName+' bani"> </a>' +
		'<a href="fp_events.php?type=bunban&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' bunban" src="fp/events/bunban.png" title="'+UserName+' bunban"> </a>' +
		'<a href="fp_events.php?type=bansm&user='+UserID+'"><img width="16" height="16" border="0" alt="'+UserName+' bansm" src="fp/events/bansm.png" title="'+UserName+' bansm"> </a>'
		document.getElementById("content_pad").appendChild(cooldiv);
	};
	FR_ToggleDropdown( id, topc, leftc );
};

function FR_ShowCFG(id, topc, leftc ) {
	var myel = document.getElementById( id );
	
	if ( myel ) {
		//If I already made it, why do it again?
		return FR_ToggleDropdown( id, topc, leftc );
	} else {
		
		var cooldiv = document.createElement('div');
		cooldiv.className = "top popupbox urlbox";
		cooldiv.style.display = 'none'
		cooldiv.style.width = "250px"
		cooldiv.style.zIndex = "3";
		cooldiv.id = id;
		cooldiv.innerHTML = '<div style="float: right;"><a onclick="return CloseThis(this);" href="#"><img src="/fp/close.png"></a></div>'
		
		var indiv = document.createElement('div')
		indiv.style.cssText = "color: rgb(68, 68, 68); margin: 16px;";
	
		if ( id == "FR_options") {
			for (var prop in FR_CFG['MENU']) {
				if (FR_CFG['MENU'].hasOwnProperty(prop)) {
					indiv.innerHTML += '<h2><span style="font-weight: bold;">'+prop+'</span></h2>';
				
					var myarr = FR_CFG['MENU'][prop];
					for (var x=0; x<myarr.length; x++) {
						indiv.innerHTML += '<a href="javascript:;" style="cursor:pointer;" onclick="FR_CFG.toggleBool(\''+myarr[x]+'\', this);" title="'+FR_CFG['SETTINGS'][myarr[x]][3]+'">'+FR_CFG['SETTINGS'][myarr[x]][2]+': '+FR_CFG.getBoolDisplay(myarr[x])+'</a><br />';
					};
				};
			};
			
			
			indiv.innerHTML += "<div class='button' style='cursor:pointer;display:inline-block;padding-bottom:5px;padding-top:5px;margin-top:5px;' href='javascript:;' onclick=\"FR_CFG.deleteAll();\"> Delete Everything</div><br /><br />"

		} else if ( id == "FR_filters") {
			for (var prop in FR_CFG['FILTERS']) {
				if (FR_CFG['FILTERS'].hasOwnProperty(prop)) {
					indiv.innerHTML += '<h2><span style="font-weight: bold;">'+prop+'</span></h2>';
				
					var myarr = FR_CFG['FILTERS'][prop];
					for (var x=0; x<myarr.length; x++) {
						indiv.innerHTML += '<a href="javascript:;" style="cursor:pointer;" onclick="FR_CFG.promptInt(\''+myarr[x]+'\', this);">'+FR_CFG['SETTINGS'][myarr[x]][2]+': '+FR_CFG.getIntDisplay(myarr[x])+'</a><br />';
					};
				};
			};
		} else if ( id == "FR_lists") {
			cooldiv.style.width = "318px"
			
			indiv.innerHTML += "<input type='text' style='height:23px;margin-right:2px' id='listuname' size='20' maxlength='16'/>";
			var mysel = document.createElement('select');
			mysel.id = 'listtype';
		
			indiv.innerHTML += "<div class='button' style='cursor:pointer;margin-left:2px;display:inline-block;padding-bottom:5px;padding-top:5px;' href='javascript:;' onclick=\"FR_CFG.listManage( document.getElementById( \'listtype\' ).options[document.getElementById( \'listtype\' ).selectedIndex].value, document.getElementById( \'listuname\' ).value);\"> Manage</div><br /><br />"
			
			for (var prop in FR_CFG['LISTS']) {
				if (FR_CFG['LISTS'].hasOwnProperty(prop)) {
					indiv.innerHTML += '<h2><span style="font-weight: bold;">'+prop+'</span></h2>';
				
					var myarr = FR_CFG['LISTS'][prop];
						
					for (var x=0; x<myarr.length; x++) {
						mysel.innerHTML += "<option value='"+myarr[x]+"'>"+FR_CFG['SETTINGS'][myarr[x]][2]+"</option>";
						
						var naughtylist = FR_CFG.getArray(myarr[x]);
						for (var y=0; y<naughtylist.length; y++) {
							indiv.innerHTML += "<a style='"+FR_CFG['SETTINGS'][myarr[x]][4]+"' href='javascript:FR_CFG.listManage(\""+myarr[x]+"\",\""+naughtylist[y]+"\");'>"+naughtylist[y]+"</a>, "
						};
						
					};
				};
			};
			indiv.insertBefore(mysel, indiv.firstChild.nextSibling);
		};
	
		cooldiv.appendChild(indiv);
		
		document.getElementById("content_pad").appendChild(cooldiv);
		
	};
	FR_ToggleDropdown( id, topc, leftc );
};

/*
	User Searching
	
	There is a hardcoded limit of 15 users
	and a minimum of 3 characters...
	how queer of you VB
	
	TODO: 
		Throw this in an object
		make it look less like shit
		the events portion slows this down like a mofo
*/
function FR_FindUser(frag){
	if ( frag.length <  3 ) { return; };
	
	var dongsparam="do=usersearch&fragment="+frag+"&securitytoken="+SECURITYTOKEN;
	var http = new XMLHttpRequest();
	http.open("POST", "http://www.facepunch.com/ajax.php", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	http.setRequestHeader("Content-length", dongsparam.length);
	http.setRequestHeader("Connection", "keep-alive");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var mydoc = http.responseXML.documentElement;
			var usrlst = mydoc.getElementsByTagName("user");
			
			var mytargetnodeb = document.getElementById("memberlist");
			mytargetnodeb.innerHTML = "Found "+usrlst.length+" Users <br />";
			
			for (var x=0; x<usrlst.length; x++) {
				var theuid = usrlst[x].getAttribute("userid");
				var theuname = usrlst[x].firstChild.textContent;
				
				mytargetnodeb.innerHTML += '<a style="font-size: 15px;" href="http://www.facepunch.com/members/'+theuid+'-'+theuname+'">'+theuname+'</a><br />';
				mytargetnodeb.innerHTML += '<img border="0" alt="'+theuname+'" src="http://www.facepunch.com/image.php?u='+theuid+'" title="'+theuname+'">';
				
				var cooldiv = document.createElement('div');
				cooldiv.className = "event";
				cooldiv.style.cssText = "margin: 20px;";
				
				cooldiv.innerHTML = '<span style="color:red;">History</span> '+
				'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+theuid+'&contenttype=vBForum_Post&showposts=1">Find posts</a></div> '+
				'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+theuid+'&contenttype=vBForum_Thread">Find threads</a></div> '+
				'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/fp_images.php?u='+theuid+'">Find images</a></div> '+
				'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+theuid+'&contenttype=vBForum_SocialGroupMessage">Find group messages</a></div> '+
				'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+theuid+'&contenttype=vBForum_SocialGroupMessage&starteronly=1">Find group threads</a></div> '+
				'<div style="display: inline-block; float: none;" class="button"><a href="http://www.facepunch.com/search.php?do=finduser&userid='+theuid+'&contenttype=vBForum_VisitorMessage">Find visitor messages</a></div> '+
		
				'<br /><br /> <span style="color:red;">Events</span> '+
				'<a href="fp_events.php?user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' events" src="http://static.facepunch.com/fp/navbar/events.png" title="'+theuname+' events"> </a>'+
				'<a href="fp_events.php?type=closed&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' closed" src="fp/events/closed.png" title="'+theuname+' closed"> </a>'+
				'<a href="fp_events.php?type=opened&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' opened" src="fp/events/opened.png" title="'+theuname+' opened"> </a>'+
				'<a href="fp_events.php?type=ban&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' ban" src="fp/events/ban.png" title="'+theuname+' ban"> </a>'+
				'<a href="fp_events.php?type=unban&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' unban" src="fp/events/unban.png" title="'+theuname+' unban"> </a>'+
				'<a href="fp_events.php?type=ddt&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' ddt" src="fp/events/ddt.png" title="'+theuname+' ddt"> </a>'+
				'<a href="fp_events.php?type=rename&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' rename" src="fp/events/rename.png" title="'+theuname+' rename"> </a>'+
				'<a href="fp_events.php?type=delhard&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' delhard" src="fp/events/delhard.png" title="'+theuname+' delhard"> </a>'+
				'<a href="fp_events.php?type=delsoft&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' delsoft" src="fp/events/delsoft.png" title="'+theuname+' delsoft"> </a>'+
				'<a href="fp_events.php?type=join&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' join" src="fp/events/join.png" title="'+theuname+' join"> </a>'+
				'<a href="fp_events.php?type=pban&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' pban" src="fp/events/pban.png" title="'+theuname+' pban"> </a>'+
				'<a href="fp_events.php?type=capsfix&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' capsfix" src="fp/events/capsfix.png" title="'+theuname+' capsfix" ></a>'+
				'<a href="fp_events.php?type=mov&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' mov" src="fp/events/mov.png" title="'+theuname+' mov"> </a>' +
				'<a href="fp_events.php?type=nforum&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' nforum" src="fp/events/nforum.png" title="'+theuname+' nforum"> </a>' +
				'<a href="fp_events.php?type=banr&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' banr" src="fp/events/banr.png" title="'+theuname+' banr"> </a>' +
				'<a href="fp_events.php?type=bani&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' bani" src="fp/events/bani.png" title="'+theuname+' bani"> </a>' +
				'<a href="fp_events.php?type=bunban&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' bunban" src="fp/events/bunban.png" title="'+theuname+' bunban"> </a>' +
				'<a href="fp_events.php?type=bansm&user='+theuid+'"><img width="16" height="16" border="0" alt="'+theuname+' bansm" src="fp/events/bansm.png" title="'+theuname+' bansm"> </a>';
			
				mytargetnodeb.appendChild(cooldiv);
				//cooldiv.innerHTML += '<a href="http://www.facepunch.com/members/'+theuid+'-'+theuname+'"><img style="background-image: url(http://static.facepunch.com/fp/navbar/events.png); border: 1px solid;" width="64" height="64" alt="'+theuname+'" src="http://avatars.fpcontent.net/image.php?u='+theuid+'" title="'+theuname+'"> </a>';
			};
		};
	};
	http.send(dongsparam);
};

/*
	
*/
function FR_RefCampCrap(threadid){
	var getthread = document.getElementById(threadid);
	var createruserid = parseInt(getthread.childNodes[5].childNodes[5].childNodes[5].childNodes[3].childNodes[1].href.replace(/http\:\/\/www\.facepunch\.com\/members\//, "") );
	
	//javascript:FR_RefCampCrap("thread_1049659");
	var http = new XMLHttpRequest();
	http.open("GET", "http://www.facepunch.com/fp_events.php?aj=1&user="+createruserid, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	http.setRequestHeader("Connection", "keep-alive");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			var cooldiv = document.createElement('div');
			cooldiv.innerHTML = http.responseText;
			
			var fetchinge = document.evaluate("//a[contains(@href,'=ban')] | //a[contains(@href,'=pban')] | //a[contains(@href,'=unban')]", cooldiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		
			if( fetchinge.snapshotItem(0) ){
				var BaneeUid = parseInt( fetchinge.snapshotItem(0).nextSibling.nextSibling.nextSibling.nextSibling.href.replace(/http\:\/\/www\.facepunch\.com\/members\//, "") );
				var binfo = fetchinge.snapshotItem(0).nextSibling.nextSibling.textContent +" : "+ fetchinge.snapshotItem(0).parentNode.lastChild.previousSibling.textContent
				
				if ( BaneeUid == createruserid ) {
					if ( fetchinge.snapshotItem(0).href.search(/\=pban/) != -1){
						getthread.childNodes[3].childNodes[1].src = GetMyPng('ref_perma');
						getthread.childNodes[3].childNodes[1].title = binfo;
					} else if ( fetchinge.snapshotItem(0).href.search(/\=ban/) != -1){
						getthread.childNodes[3].childNodes[1].src = GetMyPng('ref_ban');
						getthread.childNodes[3].childNodes[1].title = binfo;
					} else if ( fetchinge.snapshotItem(0).href.search(/\=unban/) != -1){
						getthread.childNodes[3].childNodes[1].src = GetMyPng('ref_unban');
						getthread.childNodes[3].childNodes[1].title = binfo;
					};
				};
			};
		};
	};
	http.send();
	
};
//EMote shit, 10% less gay then before
function FR_InsertTextHelper( textareaid, dastring ) {
	var thetextarea = document.getElementById(textareaid);

	if (thetextarea) {
		var textcopy = thetextarea.value;
		var slicedtxtsrt = textcopy.slice(0,thetextarea.selectionStart);
		var slicedtxtend = textcopy.slice(thetextarea.selectionStart,thetextarea.value.length);
		var dbacksrt = thetextarea.selectionStart;
		var dbackend = thetextarea.selectionEnd;

		thetextarea.value = slicedtxtsrt + dastring + slicedtxtend;
		thetextarea.selectionStart = eval(dbacksrt +  dastring.length);
		thetextarea.selectionEnd = eval(dbackend +  dastring.length);
	} else {
		alert("FAIL!");
	};
};
//bbcode poopoo
function FR_InsertBBHelper(textareaid, bbcde, spcase){
	var thetextarea = document.getElementById(textareaid);
	if (thetextarea) {
		var textcopy = thetextarea.value;
		var insertscp = "";
		if(spcase != false){insertscp = "="+prompt(spcase, "poop");};
		var slicedtxtsrt = textcopy.slice(0,thetextarea.selectionStart)+"["+bbcde+insertscp+"]";
		var slicedtxtmid = textcopy.slice(thetextarea.selectionStart,thetextarea.selectionEnd);
		var slicedtxtend = "[/"+bbcde+"]"+textcopy.slice(thetextarea.selectionEnd,thetextarea.value.length);
		var dbacksrt = thetextarea.selectionStart;
		var dbackend = thetextarea.selectionEnd;
		thetextarea.value = slicedtxtsrt + slicedtxtmid + slicedtxtend;
		thetextarea.selectionStart = slicedtxtsrt.length;
		thetextarea.selectionEnd = eval(slicedtxtsrt.length +  slicedtxtmid.length);
	} else {
		alert("FAIL!");
	};
};


/*
	Text Processor
	
	Takes two unicode characters, and some text
	generates an annoying message line by line
	
	also gets around VB automatically inserting spaces
*/
function FR_TextProcess(textareaid, partn1, partn2){
	//Will do something cooler later
	var rapeme = prompt("Enter the text to process!", "a");
	rapeme = rapeme.toLowerCase();
	//declare vers outside the scope of my loop
	var line1="\n";var line2="";var line3="";var line4="";var line5="";
	
	for (var x = 0; x < rapeme.length; x++) {
		if (rapeme.charAt(x)== "a"){
			line1 +=partn1+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn2+partn2+partn2+partn2+partn1;line4 +=partn2+partn1+partn1+partn2+partn1;line5 +=partn2+partn1+partn1+partn2+partn1;
		} else if (rapeme.charAt(x)== "b"){
			line1 +=partn2+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn2+partn2+partn2+partn2+partn1;line4 +=partn2+partn1+partn1+partn2+partn1;line5 +=partn2+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "c"){
			line1 +=partn1+partn2+partn2+partn2+partn1;line2 +=partn2+partn1+partn1+partn1+partn1;line3 +=partn2+partn1+partn1+partn1+partn1;line4 +=partn2+partn1+partn1+partn1+partn1;line5 +=partn1+partn2+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "d"){
			line1 +=partn2+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn2+partn1+partn1+partn2+partn1;line4 +=partn2+partn1+partn1+partn2+partn1;line5 +=partn2+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "e"){
			line1 +=partn2+partn2+partn2+partn2+partn1;line2 +=partn2+partn1+partn1+partn1+partn1;line3 +=partn2+partn2+partn2+partn1+partn1;line4 +=partn2+partn1+partn1+partn1+partn1;line5 +=partn2+partn2+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "f"){
			line1 +=partn2+partn2+partn2+partn2+partn1;line2 +=partn2+partn1+partn1+partn1+partn1;line3 +=partn2+partn2+partn2+partn1+partn1;line4 +=partn2+partn1+partn1+partn1+partn1;line5 +=partn2+partn1+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "g"){
			line1 +=partn1+partn2+partn2+partn2+partn1;line2 +=partn2+partn1+partn1+partn1+partn1;line3 +=partn2+partn1+partn1+partn1+partn1;line4 +=partn2+partn1+partn2+partn2+partn1;line5 +=partn1+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "h"){
			line1 +=partn2+partn1+partn1+partn2+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn2+partn2+partn2+partn2+partn1;line4 +=partn2+partn1+partn1+partn2+partn1;line5 +=partn2+partn1+partn1+partn2+partn1;
		} else if (rapeme.charAt(x)== "i"){
			line1 +=partn1+partn2+partn2+partn2+partn1;line2 +=partn1+partn1+partn2+partn1+partn1;line3 +=partn1+partn1+partn2+partn1+partn1;line4 +=partn1+partn1+partn2+partn1+partn1;line5 +=partn1+partn2+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "j"){
			line1 +=partn1+partn2+partn2+partn2+partn1;line2 +=partn1+partn1+partn1+partn2+partn1;line3 +=partn1+partn1+partn1+partn2+partn1;line4 +=partn2+partn2+partn1+partn2+partn1;line5 +=partn1+partn2+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "k"){
			line1 +=partn2+partn1+partn1+partn2+partn1;line2 +=partn2+partn1+partn2+partn1+partn1;line3 +=partn2+partn2+partn1+partn1+partn1;line4 +=partn2+partn1+partn2+partn1+partn1;line5 +=partn2+partn1+partn1+partn2+partn1;
		} else if (rapeme.charAt(x)== "l"){
			line1 +=partn2+partn1+partn1+partn1+partn1;line2 +=partn2+partn1+partn1+partn1+partn1;line3 +=partn2+partn1+partn1+partn1+partn1;line4 +=partn2+partn1+partn1+partn1+partn1;line5 +=partn2+partn2+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "m"){
			line1 +=partn2+partn1+partn1+partn1+partn2+partn1;line2 +=partn2+partn2+partn1+partn2+partn2+partn1;line3 +=partn2+partn1+partn2+partn1+partn2+partn1;line4 +=partn2+partn1+partn1+partn1+partn2+partn1;line5 +=partn2+partn1+partn1+partn1+partn2+partn1;
		} else if (rapeme.charAt(x)== "n"){
			line1 +=partn2+partn1+partn1+partn1+partn2+partn1;line2 +=partn2+partn2+partn1+partn1+partn2+partn1;line3 +=partn2+partn1+partn2+partn1+partn2+partn1;line4 +=partn2+partn1+partn1+partn2+partn2+partn1;line5 +=partn2+partn1+partn1+partn1+partn2+partn1;
		} else if (rapeme.charAt(x)== "o"){
			line1 +=partn1+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn2+partn1+partn1+partn2+partn1;line4 +=partn2+partn1+partn1+partn2+partn1;line5 +=partn1+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "p"){
			line1 +=partn1+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn2+partn2+partn2+partn1+partn1;line4 +=partn2+partn1+partn1+partn1+partn1;line5 +=partn2+partn1+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "q"){
			line1 +=partn1+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn2+partn1+partn1+partn2+partn1;line4 +=partn2+partn1+partn2+partn2+partn1;line5 +=partn1+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "r"){
			line1 +=partn1+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn2+partn2+partn2+partn1+partn1;line4 +=partn2+partn1+partn1+partn2+partn1;line5 +=partn2+partn1+partn1+partn2+partn1;
		} else if (rapeme.charAt(x)== "s"){
			line1 +=partn1+partn2+partn2+partn2+partn1;line2 +=partn2+partn2+partn1+partn1+partn1;line3 +=partn1+partn2+partn2+partn1+partn1;line4 +=partn1+partn1+partn2+partn2+partn1;line5 +=partn2+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "t"){
			line1 +=partn2+partn2+partn2+partn2+partn2+partn1;line2 +=partn1+partn1+partn2+partn1+partn1+partn1;line3 +=partn1+partn1+partn2+partn1+partn1+partn1;line4 +=partn1+partn1+partn2+partn1+partn1+partn1;line5 +=partn1+partn1+partn2+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "u"){
			line1 +=partn2+partn1+partn1+partn2+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn2+partn1+partn1+partn2+partn1;line4 +=partn2+partn1+partn1+partn2+partn1;line5 +=partn1+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "v"){
			line1 +=partn2+partn1+partn1+partn1+partn2+partn1;line2 +=partn2+partn1+partn1+partn1+partn2+partn1;line3 +=partn2+partn1+partn1+partn1+partn2+partn1;line4 +=partn1+partn2+partn1+partn2+partn1+partn1;line5 +=partn1+partn1+partn2+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "w"){
			line1 +=partn2+partn1+partn1+partn1+partn2+partn1;line2 +=partn2+partn1+partn1+partn1+partn2+partn1;line3 +=partn2+partn1+partn2+partn1+partn2+partn1;line4 +=partn2+partn2+partn1+partn2+partn2+partn1;line5 +=partn2+partn1+partn1+partn1+partn2+partn1;
		} else if (rapeme.charAt(x)== "x"){
			line1 +=partn2+partn1+partn1+partn2+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn1+partn2+partn2+partn1+partn1;line4 +=partn2+partn1+partn1+partn2+partn1;line5 +=partn2+partn1+partn1+partn2+partn1;
		} else if (rapeme.charAt(x)== "y"){
			line1 +=partn2+partn1+partn1+partn1+partn2+partn1;line2 +=partn2+partn1+partn1+partn1+partn2+partn1;line3 +=partn1+partn2+partn2+partn2+partn1+partn1;line4 +=partn1+partn1+partn2+partn1+partn1+partn1;line5 +=partn1+partn1+partn2+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "z"){
			line1 +=partn2+partn2+partn2+partn2+partn1;line2 +=partn1+partn1+partn2+partn2+partn1;line3 +=partn1+partn2+partn2+partn1+partn1;line4 +=partn2+partn2+partn1+partn1+partn1;line5 +=partn2+partn2+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "+"){
			line1 +=partn1+partn1+partn1+partn1+partn1;line2 +=partn1+partn1+partn2+partn1+partn1;line3 +=partn1+partn2+partn2+partn2+partn1;line4 +=partn1+partn1+partn2+partn1+partn1;line5 +=partn1+partn1+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "-"){
			line1 +=partn1+partn1+partn1+partn1+partn1;line2 +=partn1+partn1+partn1+partn1+partn1;line3 +=partn1+partn2+partn2+partn2+partn1;line4 +=partn1+partn1+partn1+partn1+partn1;line5 +=partn1+partn1+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "?"){
			line1 +=partn1+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn2+partn1;line3 +=partn1+partn1+partn2+partn1+partn1;line4 +=partn1+partn1+partn1+partn1+partn1;line5 +=partn1+partn1+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "!"){
			line1 +=partn1+partn1+partn2+partn1+partn1;line2 +=partn1+partn1+partn2+partn1+partn1;line3 +=partn1+partn1+partn2+partn1+partn1;line4 +=partn1+partn1+partn1+partn1+partn1;line5 +=partn1+partn1+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "."){
			line1 +=partn1+partn1+partn1+partn1+partn1;line2 +=partn1+partn1+partn1+partn1+partn1;line3 +=partn1+partn1+partn1+partn1+partn1;line4 +=partn1+partn2+partn2+partn2+partn1;line5 +=partn1+partn2+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "\;"){
			line1 +=partn1+partn2+partn2+partn2+partn1;line2 +=partn1+partn2+partn2+partn2+partn1;line3 +=partn1+partn1+partn1+partn1+partn1;line4 +=partn1+partn2+partn2+partn2+partn1;line5 +=partn2+partn2+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "\:"){
			line1 +=partn1+partn2+partn2+partn2+partn1;line2 +=partn1+partn2+partn2+partn2+partn1;line3 +=partn1+partn1+partn1+partn1+partn1;line4 +=partn1+partn2+partn2+partn2+partn1;line5 +=partn1+partn2+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "\,"){
			line1 +=partn1+partn1+partn1+partn1+partn1;line2 +=partn1+partn1+partn1+partn1+partn1;line3 +=partn1+partn1+partn1+partn1+partn1;line4 +=partn1+partn2+partn2+partn2+partn1;line5 +=partn2+partn2+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "\="){
			line1 +=partn1+partn1+partn1+partn1+partn1;line2 +=partn2+partn2+partn2+partn2+partn1;line3 +=partn1+partn1+partn1+partn1+partn1;line4 +=partn2+partn2+partn2+partn2+partn1;line5 +=partn1+partn1+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "\/"){
			line1 +=partn1+partn1+partn1+partn1+partn2+partn1;line2 +=partn1+partn1+partn1+partn2+partn1+partn1;line3 +=partn1+partn1+partn2+partn1+partn1+partn1;line4 +=partn1+partn2+partn1+partn1+partn1+partn1;line5 +=partn2+partn1+partn1+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "\\\\"){
			line1 +=partn2+partn1+partn1+partn1+partn1+partn1;line2 +=partn1+partn2+partn1+partn1+partn1+partn1;line3 +=partn1+partn1+partn2+partn1+partn1+partn1;line4 +=partn1+partn1+partn1+partn2+partn1+partn1;line5 +=partn1+partn1+partn1+partn1+partn2+partn1;
		} else if (rapeme.charAt(x)== "\%"){
			line1 +=partn2+partn2+partn1+partn1+partn2+partn1;line2 +=partn2+partn1+partn1+partn2+partn1+partn1;line3 +=partn1+partn1+partn2+partn1+partn1+partn1;line4 +=partn1+partn2+partn1+partn1+partn1+partn2;line5 +=partn2+partn1+partn1+partn1+partn2+partn2;
		} else if (rapeme.charAt(x)== "\_"){
			line1 +=partn1+partn1+partn1+partn1+partn1+partn1;line2 +=partn1+partn1+partn1+partn1+partn1+partn1;line3 +=partn1+partn1+partn1+partn1+partn1+partn1;line4 +=partn1+partn1+partn1+partn1+partn1+partn1;line5 +=partn1+partn2+partn2+partn2+partn2+partn1;
		} else if ( (rapeme.charAt(x)== "\'") || (rapeme.charAt(x)== '\u2018') || (rapeme.charAt(x)== '\u2019') ) {
			line1 +=partn1+partn2+partn1;line2 +=partn1+partn2+partn1;line3 +=partn1+partn1+partn1;line4 +=partn1+partn1+partn1;line5 +=partn1+partn1+partn1;
		} else if ( (rapeme.charAt(x)== '\"') || (rapeme.charAt(x)== '\u201C') || (rapeme.charAt(x)== '\u201D') ) {
			line1 +=partn1+partn2+partn1+partn2+partn1;line2 +=partn1+partn2+partn1+partn2+partn1;line3 +=partn1+partn1+partn1+partn1+partn1;line4 +=partn1+partn1+partn1+partn1+partn1;line5 +=partn1+partn1+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "\]"){
			line1 +=partn2+partn2+partn1;line2 +=partn1+partn2+partn1;line3 +=partn1+partn2+partn1;line4 +=partn1+partn2+partn1;line5 +=partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "\["){
			line1 +=partn2+partn2+partn1;line2 +=partn2+partn1+partn1;line3 +=partn2+partn1+partn1;line4 +=partn2+partn1+partn1;line5 +=partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "\("){
			line1 +=partn1+partn2+partn2+partn1;line2 +=partn2+partn2+partn1+partn1;line3 +=partn2+partn1+partn1+partn1;line4 +=partn2+partn2+partn1+partn1;line5 +=partn1+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "\)"){
			line1 +=partn2+partn2+partn1+partn1;line2 +=partn1+partn2+partn2+partn1;line3 +=partn1+partn1+partn2+partn1;line4 +=partn1+partn2+partn2+partn1;line5 +=partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "^"){
			line1 +=partn1+partn1+partn2+partn1+partn1+partn1;line2 +=partn1+partn2+partn1+partn2+partn1+partn1;line3 +=partn2+partn1+partn1+partn1+partn2+partn1;line4 +=partn1+partn1+partn1+partn1+partn1+partn1;line5 +=partn1+partn1+partn1+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "0"){
			line1 +=partn1+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn2+partn2+partn1;line3 +=partn2+partn1+partn1+partn2+partn1;line4 +=partn2+partn2+partn1+partn2+partn1;line5 +=partn1+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "1"){
			line1 +=partn2+partn2+partn2+partn1+partn1;line2 +=partn1+partn2+partn2+partn1+partn1;line3 +=partn1+partn2+partn2+partn1+partn1;line4 +=partn1+partn2+partn2+partn1+partn1;line5 +=partn2+partn2+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "2"){
			line1 +=partn2+partn2+partn2+partn1+partn1;line2 +=partn1+partn1+partn2+partn2+partn1;line3 +=partn1+partn1+partn2+partn2+partn1;line4 +=partn1+partn2+partn1+partn1+partn1;line5 +=partn2+partn2+partn2+partn2+partn1;
		} else if (rapeme.charAt(x)== "3"){
			line1 +=partn2+partn2+partn2+partn1+partn1;line2 +=partn1+partn1+partn2+partn2+partn1;line3 +=partn2+partn2+partn2+partn1+partn1;line4 +=partn1+partn1+partn2+partn2+partn1;line5 +=partn2+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "4"){
			line1 +=partn2+partn1+partn2+partn1+partn1;line2 +=partn2+partn1+partn2+partn1+partn1;line3 +=partn2+partn2+partn2+partn2+partn1;line4 +=partn1+partn1+partn2+partn1+partn1;line5 +=partn1+partn1+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "5"){
			line1 +=partn1+partn2+partn2+partn2+partn1;line2 +=partn2+partn1+partn1+partn1+partn1;line3 +=partn2+partn2+partn2+partn2+partn1;line4 +=partn1+partn1+partn1+partn2+partn1;line5 +=partn2+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "6"){
			line1 +=partn1+partn2+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn1+partn1+partn1;line3 +=partn2+partn2+partn2+partn2+partn1+partn1;line4 +=partn2+partn1+partn1+partn1+partn2+partn1;line5 +=partn1+partn2+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "7"){
			line1 +=partn2+partn2+partn2+partn2+partn1;line2 +=partn1+partn1+partn1+partn2+partn1;line3 +=partn1+partn1+partn2+partn1+partn1;line4 +=partn1+partn2+partn1+partn1+partn1;line5 +=partn1+partn2+partn1+partn1+partn1;
		} else if (rapeme.charAt(x)== "8"){
			line1 +=partn1+partn2+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn1+partn2+partn1;line3 +=partn2+partn2+partn2+partn2+partn2+partn1;line4 +=partn2+partn1+partn1+partn1+partn2+partn1;line5 +=partn1+partn2+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== "9"){
			line1 +=partn1+partn2+partn2+partn2+partn1+partn1;line2 +=partn2+partn1+partn1+partn1+partn2+partn1;line3 +=partn1+partn2+partn2+partn2+partn2+partn1;line4 +=partn1+partn1+partn1+partn1+partn2+partn1;line5 +=partn1+partn2+partn2+partn2+partn1+partn1;
		} else if (rapeme.charAt(x)== " "){
			line1 +=partn1+partn1+partn1;line2 +=partn1+partn1+partn1;line3 +=partn1+partn1+partn1;line4 +=partn1+partn1+partn1;line5 +=partn1+partn1+partn1;
		};
	//mm3guy's idea, with my modulo
		if ((x%5) == 4) {
			line1 +="[b] [/b]";line2 +="[b] [/b]";line3 +="[b] [/b]";line4 +="[b] [/b]";line5 +="[b] [/b]";
		};
	};
	FR_InsertTextHelper(textareaid, line1+ '\n');FR_InsertTextHelper(textareaid, line2+ '\n');FR_InsertTextHelper(textareaid, line3+ '\n');FR_InsertTextHelper(textareaid, line4+ '\n');FR_InsertTextHelper(textareaid, line5+ '\n');
};

function FR_autoClose(){
	var fetchmenus = document.evaluate("//div[contains(@id,'FR_emote_')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	//Iterate
	for (var i = 0; i < fetchmenus.snapshotLength; i++) {

		if (fetchposts.snapshotItem(i)){
			fetchposts.snapshotItem(i).style.display = 'none';
		};
	};
};


/*
	FACEPUNCH PAGE/SHIT Detection
	

	TODO: 
		user profile
		search
		search results
		showpm
		makepm
		makepm preview
		can make threads in subforum?
		thread closed?
		generic VB error detector
		newthread
*/
FP_Globals = new Object();
//Oify Detect
FP_Globals.Debug = true
FP_Globals.Oify = 	false;
FP_Globals.REFCamp = 	false;
//Subforum, crap
FP_Globals.ShowThread	=	false;
FP_Globals.ForumDisplay	=	false;
FP_Globals.NewReply		=	false;
FP_Globals.NewThread	=	false;
//eventlog
FP_Globals.EventLog		=	false;
FP_Globals.EventLogMEM	=	0;
FP_Globals.EventLogType	=	false;
//PM
FP_Globals.Private	=	false;
//specialpages
FP_Globals.MemberList	=	false;
FP_Globals.WhoisOnline	=	false;
FP_Globals.Poll			=	false;
FP_Globals.Notice		=	false;
FP_Globals.SubforumName	= 	"";
FP_Globals.SubforumID	=	0;

//SHOWTHREAD
if (window.location.href.search(/http\:\/\/www\.facepunch\.com\/threads/) != -1) {
	var thissubforum = document.evaluate("//span[@class='navbit']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	FP_Globals.ShowThread = true;
	FP_Globals.SubforumName =	thissubforum.snapshotItem(thissubforum.snapshotLength - 1).childNodes[1].textContent;
	FP_Globals.SubforumID	=	parseInt(thissubforum.snapshotItem(thissubforum.snapshotLength - 1).childNodes[1].href.replace(/http\:\/\/www\.facepunch\.com\/forums\//, ""));
	
	//Poll
	if (document.getElementById("pollinfo") ){
		FP_Globals.Poll = true;
	};
	
//FORUMDISPLAY
} else if (window.location.href.search(/http\:\/\/www\.facepunch\.com\/forums/) != -1) {
	var thissubforum = window.location.href.replace(/http\:\/\/www\.facepunch\.com\/forums\//, "");
	FP_Globals.ForumDisplay	=	true;
	FP_Globals.SubforumName	= 	document.title.replace(/\- Facepunch/, "");
	FP_Globals.SubforumID	=	parseInt(thissubforum);
//NEWREPLY
} else if (window.location.href.search(/newreply/) != -1) {
	var thissubforum = document.evaluate("//span[@class='navbit']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	FP_Globals.NewReply = true;
	FP_Globals.SubforumName =	thissubforum.snapshotItem(thissubforum.snapshotLength - 2).childNodes[1].textContent;
	FP_Globals.SubforumID	=	parseInt(thissubforum.snapshotItem(thissubforum.snapshotLength - 2).childNodes[1].href.replace(/http\:\/\/www\.facepunch\.com\/forums\//, ""));
	
//NEWTHREAD
} else if (window.location.href.search(/newthread/) != -1) {
	var thissubforum = document.evaluate("//span[@class='navbit']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	FP_Globals.NewThread = true;
	FP_Globals.SubforumName =	thissubforum.snapshotItem(thissubforum.snapshotLength - 1).childNodes[1].textContent;
	FP_Globals.SubforumID	=	parseInt(thissubforum.snapshotItem(thissubforum.snapshotLength - 1).childNodes[1].href.replace(/http\:\/\/www\.facepunch\.com\/forums\//, ""));
	
//Poll
} else if (window.location.href.search(/poll/) != -1) {
	var thissubforum = document.evaluate("//span[@class='navbit']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	FP_Globals.Poll = true;
	FP_Globals.SubforumName =	thissubforum.snapshotItem(thissubforum.snapshotLength - 2).childNodes[1].textContent;
	FP_Globals.SubforumID	=	parseInt(thissubforum.snapshotItem(thissubforum.snapshotLength - 2).childNodes[1].href.replace(/http\:\/\/www\.facepunch\.com\/forums\//, ""));
//Event Log
} else if (window.location.href.search(/http\:\/\/www\.facepunch\.com\/fp_events/) != -1) {
	FP_Globals.EventLog	=	true;
	
	if(window.location.href.search(/user/)  != -1){
		//this is gay, the ? should be omitted from the string
		var testing = window.location.search.replace(/\?/, "").split('&');
		
		for (var i = 0; i < testing.length; i++) {
			var testingtwo = testing[i].split('=')
			if ( testingtwo[0] == "user") {
				FP_Globals.EventLogMEM = parseInt(testingtwo[1]);
			} else if ( testingtwo[0] == "type") {
				FP_Globals.EventLogType = testingtwo[1];
			};
		};
	};
//PM
} else if (window.location.href.search(/http\:\/\/www\.facepunch\.com\/private/) != -1) {
	FP_Globals.Private	=	true;
	
	if(window.location.href.search(/user/)  != -1){
		//this is gay, the ? should be omitted from the string
		var testing = window.location.search.replace(/\?/, "").split('&');
		
		for (var i = 0; i < testing.length; i++) {
			var testingtwo = testing[i].split('=')
			if ( testingtwo[0] == "u") {
				//FP_Globals.EventLogMEM = parseInt(testingtwo[1]);
			} else if ( testingtwo[0] == "do") {
				//FP_Globals.EventLogType = testingtwo[1];
			};
		};
	};

	
} else if (window.location.href.search(/http\:\/\/www\.facepunch\.com\/memberlist/) != -1) {
	FP_Globals.MemberList	=	true;
} else if (window.location.href.search(/http\:\/\/www\.facepunch\.com\/online/) != -1) {
	FP_Globals.WhoisOnline	=	true;
};
if ( FP_Globals.SubforumID == 56 ) {
	FP_Globals.Oify = true;
};
if ( FP_Globals.SubforumID == 62 ) {
	FP_Globals.REFCamp = true;
};

if ( document.getElementById('notices') ) {
	FP_Globals.Notice = true;
};

/*

	BEGIN GAY DATA URI SHIT
	WILL MAKE LESS SHITTY LATER
	I MAY NOT BE ABLE TO COMPRESS BASE64,
	BUT I CAN SURE AS HELL CHEAT LIKE A BITCH
	OHGOD WHY DID I DO THIS
	
	WELL AT LEAST THERE IS LESS SHIT IN THE GLOBAL SCOPE HAHA
*/
function GetMyPng(pngid){
	//Dictionary
	var a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCA";
	var b = "YAAAAf8/9hAAAABGdBTUEAAK";
	var c = "/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAA";
	var d = "SURBVDjL";
	var x = "AAAABJRU5ErkJggg==";
	var y = "AAAAASUVORK5CYII=";
	var z = "AAAAAElFTkSuQmCC";
	
	if (pngid == "silk_information") {
		return a+b+c+"Kc"+d+"pZPLa9RXHMU/d0ysZEwmMQqZiTaP0agoaKGJUiwIxU0hUjtUQaIuXHSVbRVc+R8ICj5WvrCldJquhVqalIbOohuZxjDVxDSP0RgzyST9zdzvvffrQkh8tBs9yy9fPhw45xhV5X1U8+Yhc3U0LcEdVxdOVq20OA0ooQjhpnfhzuDZTx6++m9edfDFlZGMtXKxI6HJnrZGGtauAWAhcgwVnnB/enkGo/25859l3wIcvpzP2EhuHNpWF9/dWs/UnKW4EOGDkqhbQyqxjsKzMgM/P1ymhlO5C4ezK4DeS/c7RdzQoa3x1PaWenJjJZwT9rQ1gSp/js1jYoZdyfX8M1/mp7uFaTR8mrt29FEMQILr62jQ1I5kA8OF59jIItVA78dJertTiBNs1ZKfLNG+MUHX1oaURtIHEAOw3p/Y197MWHEJEUGCxwfHj8MTZIcnsGKxzrIURYzPLnJgbxvG2hMrKdjItjbV11CYKeG8R7ygIdB3sBMFhkem0RAAQ3Fuka7UZtRHrasOqhYNilOwrkrwnhCU/ON5/q04vHV48ThxOCuoAbxnBQB+am65QnO8FqMxNCjBe14mpHhxBBGCWBLxD3iyWMaYMLUKsO7WYH6Stk1xCAGccmR/Ozs/bKJuXS39R/YgIjgROloSDA39Deit1SZWotsjD8pfp5ONqZ6uTfyWn+T7X0f59t5fqDhUA4ry0fYtjJcWeZQvTBu4/VqRuk9/l9Fy5cbnX+6Od26s58HjWWaflwkusKGxjm1bmhkvLXHvh1+WMbWncgPfZN+qcvex6xnUXkzvSiYP7EvTvH4toDxdqDD4+ygT+cKMMbH+3MCZ7H9uAaDnqytpVX8cDScJlRY0YIwpAjcNcuePgXP/P6Z30QuoP4J7WbYhuQ"+x	
	} else if (pngid == "silk_bomb") {
		return a+b+c+"Kr"+d+"ZZPPTxNREMe/265tbbEEkmpD6wGCGolwkYh6gIZwa28evHrTGMPFxL+AmxqT3ogxejDePGhQYxqh8VC1tCZSBVLFCsovgdKW/u7ue85s3BV1ksm8fW++n5n3YxUpJUzTclE7hTa1e7xozsnXSqcyLPNiWrkkdTwl18mbB8KyxuuKCSDxAIWX5IuQYp7iY0DEbSvXz0PHNRIFyJNCx2lHRIbMAvsBNykMQcqz1YYsNFvC3W6b98RnN6qhwPODantIEYV1aLXFNwR6IDTE3BdlzoY/Ni+EPDO3VNPvvdB8qSWPp6kcxXDPglvtHFWUZhvs9SOwVX3nRAsOFrPIApDoUL7YcJ7qcbm21r/g2fRHTL/NQVTWIUqrQJm2vFeDbLSwlnde3buv+C3AxMTE4LfvWzfuPtlEqaLB3daBRCKBzOZx3H53BfXCZ1T2XqEhFpEsHsaFyRNy6ObJoAVoNpuRrq6uwPu5r7j1aBvZpVUUi0Wsra3B71zBww+jmP3RjTvpAWwXVBzrDvZVq9UIa9XfAONUfT4fYrEYaBFjY2Pwer2Y27ChXPZi5afEwoYbiVwHnE6npTEA9Xq9XwgBv9+PcDgMHrdaLVQqFcNpHZ/yHjQaDWiaZgBovd8CcFKhUKBKZUOs67oBYEGtVjMA7FTVAPAcRwtAExkCjLCAE3mRISzgb57nMbvNZkOpVOKcjAWgynGHwzGiKIrRDVdnCEcWmZGhLpcLOzs7PI5bt0AnPpXNZvn5GlvgFvkg/23fbrcbbedyOXp0YsoCzMzMpEgQTSaTJW5RVVUDZFZn48oMSKfTJaoeJWjqr3+Brbe39zIJxoPBYJ/H4zH2a97G7u4ulpeXuXKUwJP//UymBQKBQTq0CJ1BiCoZ10ueIY9T7hSJU/vzfwHG+eOypzQIsA"+x
	} else if (pngid == "silk_world") {
		return a+b+c+"Mt"+d+"VZNLa1xlAIafc5szk8xkMkkm5MKY2EpT2qa2MTVCmoLS2gq6EKooimAW7iQb/0I2bgTRIog0oFW7KQpCS7VqrSmmJGlSQtswqWlLLmbGmcmcZM6cy/edz00r6bt8eXh4N6+mlGJnxiZHR4APgSNAFjCBKjClInXm05Gzl3by2mPB2OSoCUwAp1/LHbcziSyO24gbgJAegg2urF8UUsifhZBvfvXK99v/C8YmRy3gt8G2/cMv517E8Wx8ApYcjZiyKbkRSgQkcFn3rzG9Nn1LhOLYt2/8UNUfLZkYaN0zfLRrkLIMCHUNIXTqIoZLjLJvU/ASrFQtnko+z2BH38HAD78DMConHh4FPn5nz6vGgqyxTp16JNj2kpR9C8eD/OoW1VoNO1NCS+d5oW0vV27f2PX11MS8MTR6+JOTXUMHNCPBui5AtdMpk8xsGNQ9ndur20TxCnbPIn5TnmJUwaxIDrTm9Jn7d1tM4EiuqZs5d41iXGefsZsIwYNCgOfVSXconJbLLEWb4CuahU2+6HO8d4DQF/0m0NpgNvLAXaPgu6QadrEZpKhUItJZj/aMS1EewvHnsdUWW/+WKG82kEykCAPRbCqlNE1B4DsocpiW5OJfIVoiyfqSQFdNdGXrpLZGcFZDPKYJg2VQCiGEZkoRlZ3A6W41mknFn2WlaOKFFrG4Tbw9wb2/S3g3miHySLdbNDd2kzYKVGpVpIiqugjF7P3yQ55pyLFWmCSyVokZPqHnEoYmsWQGuyWOGdexNIkRFOnqbGN5bRngjh4G4rMLd6+KnmQW012lWrpOJuNjCh9LU9i6gRkEZHIrpNv/QK8vcijXz5lfLijgS+PmuYV75+fPDXr1Wt9znfsouy5x+2miuoltW1iawBJV0o0/wT8lBvbv5WZ+gaWNlasz43MfmQChH777e37uT78eHDx5+BiLBROjqhDaFmGkQ1KS6+mlr7+XX2evc+nWVB54+4kznfr8pZQIxXkRyhPvDb9vIjtQqgFN12hLO2yUZ/ni8o8SuAa8NTM+t/GE4HGGx4del0J+IGXUH8ko86iuAneAszPjc9/s5P8DuO6ZcsXuRqA"+y;
	} else if (pngid == "silk_heart") {
		return a+b+c+"J/"+d+"pZNLiI1xGMZ/3/edOWZojjkiudbMuEVMM4SMBVlbSUpZyAIhG4qlkcJWycZOSslCMTNFuYVpRrkzLuMy5tA4xulcv//t/Vt80ZTLxltvz7N43vd5F+8TeO/5n0r9JNLTs9A7t8FbO0WsfSvWdtdv2VIAKJ45kxWtt4rWh5xSQ6LUyeldXVcAAu890t29zzt3hPp0ljBCyiVMofhMjNkmWldE64t1U5qWTpjXiiuVqDx8RDX35ZxTalfgrl7d6K2+HC5cQBBGYAyk05jhYWrPX350WpcbWpsX17e0QGEMwgiasnzv7eX7oyfHUmLt3mjWTIJqFXJfwAlYS13zHKKV7XN9rInqG6D/AYgkBo0TyXSuId/Xvz0lxiyJMhkYegfGghdwDl68JpycgSiAwTeAgLYJ5scIWgUXx5mUGJPGOYgVKJUs0CZZMpIDaxNnEfAOlAFxYDSilKRE66K3dlpgDcQ1sC4ZtjbB8dxacBZSIYQhTqkwFKWu28FBmD0TKmWo1SCOwagEdZxgrZYYlEowv4X8jVuIUudDp9SJyodP7+NPI9C2FNJRIipXk4FqDVQM1QrUhbB2FYXRMXJXusdE667Ae0/++PFlotTZhmzjiknLlxOO5mDgCQRBcnq1Cm2L8M3zGO3p5fPte0/FmN0d/f13gp+v/Pnw4clOqQOi1P5sR1tj46wZcPceFMuwdjXFbwXen7+gRevTYsyxjoGB/K9PHF/vduxY4ZQ61dQ8d/XUDevBWfJ37jJy/eaQaL2z/f79a+P1wZ/C9Grz5ian1FHRek92zozg68s3l0Trg+19fUO/ib33f+3H69ZtetjZuf9fmuB/4/wDFoO2ZVesLdk"+y;
	} else if (pngid == "silk_color_wheel") {
		return a+b+c+"MO"+d+"VZNNaBxlAIafb+ab2Z3N7Oxv/nYTEyv2LzQJpKBgrQqNUKmY4kUIXqUHT70p9iB48CKIiN5E0It6KFiwiv9FpAVpKUggNc3mZ7vpJpv9n93ZnZ35PNRI+8B7e9/n9gqlFAeIVUfPeN3zh0R0eVpYM1OanhvTCEY0f3tU79+ctnpfHM73fuQhxIHAWHnmkOGXPjgZyS09l5hnNv4YOdMhoQmigzqGt4nhfeub1fpnVsl/e+hMv/q/QKy+Me0EO5dfso/OvzB8grgV4HGXJC7jwAQ2oxxDuC36xZ+Rhe+v6iutZf2iqklReNe0tPSHZ2Nz84ujR7ht3iJKjcexiOIQI8SiixxcR7QtRORFlK7O9t0rlyy4KBEj5+YisVeez85wy9zGIUeGDDYhDhYOITYuoh2BvTJ68y7B0GnCym8XGq+KL2U0MrE8Z2SRVhqdPmlCsvgk8RlCkgAivRbUNKj1YPMeeu4wcnjRql7/+jVpyvxsPjbK3whi5LEAB0WWgBRgqwAaFah04X4V7puwdwddz+FXjJMSbXI8aSTYCgU2oKMwEdgCEoDhug/G5SjsmFDUoV+DXJ7BnpiUVCNBaJqEXfDVfwG6CjoKnF4crZGCVvNBug0IPXzPZOCnAunfk8W6ro7H2gK3A02gGoDeA1MDGx2nkYG6C24bvDaMSzq7ZfxBsiC7O+aNDaWOn0oLfl0HMwDlQRCAHYUkEGvFkLsp2G9Bo0n41AiNG6sMBvY1yZr6/JsV//XZZ3WZaEp2t6DvgWFA1QRHQbwjSDeTUGvCiSPU1ovU/typQPIrTV0yrrl3vE+/+8XlaCIgq8H+BtSLUN2C2ibsl8ArR+HYGE0rwvbvRTr96HsL6od1CUDDf+enK92JwT+982cWEswvRmiug6qAr0E4AV4uoFXosnV1g8bN5kcp7E8eOZOYKtmUqm/ZiDdfPhV3Zp6IM5k0SIUBstwmXKvCX5UdM6y9n2b34wV1IXxEcEBU3J4dprU0zODpjFBTIyoIxgjXxlB/PIl1eUmdLjzc/xceOVXddrB6BQ"+x
	} else if (pngid == "silk_cake") {
		return a+b+c+"I2"+d+"hVPfa1JRHPepnnrrT/Al6KG/YG9RD0EPFXsJCkaMHjMKIamVNQhqQW3LFqtZq9Yg1KXVcBhdZ9ZDgyblT9y8Z1fdvXo3Ua9D1E/ne6c3bUIHPtxzPr++5164JgCmDsJ+0/FI2BTu5v6n9xgSEZNWLh0BN9r6FfTTewyx1f3QqsOIre5r9ZvY0aM/d/U9Be+WHiO4PIg5n70mCEIizgM0MRQ4W+Bn93PPOJY+n8H4G6vUU8BFM8fYtL8I17ctTH7IQ9M0GBP5s1AowP5WguOjjIsTSYUyRsFXweNkjOHJooL5oIoJrwJazve7E2c8o/r52ksJDxc2YZlKgzJGQVAINPjC6y8qN8jwr5T0wJ35LByfZNx4JelnhyuPq9MMroCMZWFxxygICb5WvV7Hv+v6rIRH3k1YXzCDazabkGUZye+2hlHAVizNRDwKeo3Oohs53DlYnzEsCEWdU1UV8dhv5NM+KOFDfwu2QgcatcxtpJJR/WPlcjkwcQ0bG0wHFSuKgvW1FEqZpyAvZYyC7MjhVmFmGJXUXShMQEmcRU0cNaCJ97HN5lAV70FL2UFeyhgFRe/BhvzgHCTLKSiTQ9j2XkLlh003E2hPHGnkIS9lul9hp5a5hVLgCpSpC8jaBiEOncD66aM6aE8caeQhL2W6C5zlXye5cLPn6n3BPeSlTHeBmWOMo1aOHEMlfh5a+jI3j+igPXGkkaftNe/5Fzg5wGHjcHMkOKptJNocaQPdmT/bXw90YXDpsg"+x
	} else if (pngid == "silk_book_open") {
		return a+b+c+"IA"+d+"pVPPaxNREJ6Vt01caH4oWk1T0ZKlGIo9RG+BUsEK4kEP/Q8qPXnpqRdPBf8A8Wahhx7FQ0GF9FJ6UksqwfTSBDGyB5HkkphC9tfb7jfbtyQQTx142byZ75v5ZnZWC4KALmICPy+2DkvKIX2f/POz83LxCL7nrz+WPNcll49DrhM9v7xdO9JW330DuXrrqkFSgig5iR2Cfv3t3gNxOnv5BwU+eZ5HuON5/PMPJZKJ+yKQfpW0S7TxdC6WJaWkyvff1LDaFRAeLZj05MHsiPTS6hua0PUqtwC5sHq9zv9RYWl+nu5cETcnJ1M0M5WlWq3GsX6/T+VymRzHDluZiGYAAsw0TQahV8uyyGq1qFgskm0bHIO/1+sx1rFtchJhArwEyIQ1Gg2WD2A6nWawHQJVDIWgIJfLhQowTIeE9D0mKAU8qPC0220afsWFQoH93W6X7yCDJ+DEBeBmsxnPIJVKxWQVUwry+XyUwBlKMKwA8jqdDhOVCqVAzQDVvXAXhOdGBFgymYwrGoZBmUyGjxCCdF0fSahaFdgoTHRxfTveMCXvWfkuE3Y+f40qhgT/nMitupzApdvT18bu+YeDQwY9Xl4aG9/d/URiMBhQq/dvZMeVghtT17lSZW9/rAKsvPa/r9Fc2dw+Pe0/xI6kM9mT5vtXy+Nw2kU/5zOGRpvuMIu0YA"+x
	} else if (pngid == "silk_pill") {
		return a+b+c+"Jh"+d+"pZNLSBtRFIaVIvFVsKSCG7UuWkVcGIiiGxE3YgUhgvgIirgJiIssspBK6cK0iIgbCyVgNyWGqkiLK63KiG100ZbYQiUP8zBxJuOMyaRJiCHB/j0zC0GsROjiwOVy/u+c/5578gDk/U/kTAicnDwOBoPP/H7/W4/Ho+N5/t6dAU6X63mY5yFJkhIsy8LpdHIOh0OdE/Dt8PAlGw4jk8kgnU4jkUgglUohGo2CAJL94KDwVgBjt7/yh0KKOJlMKtVFUcTZ2ZkC8ni9+LK/b/ongGEYs5sSZLGcLFeUxeRdsSCHeH4OZm8vcgPgsVqnue1tZEgQj8cRiUQUcZisnJ6eIhAIwEtw+X5jZwfXAOGpqenEygqyu7u4mJ1FjGEgCAI4jkOI7NAUcHx8rABpMlhbX3ddATyDgwZpcRFZol7MzCAxMYHfY2MQlpZAI4TP5wONECcklN9hY3MT72y2SgVgr6pSecfHkaXLlNmMOJ1jo6OI9vdD7OlBaG4ObrdbaV8g8fetLaxZLANXY9yoqXniNxqRWV1F3GBAbGQEkb4+iN3d4Ds6wLW2giVLAj3ij+VlHExODlz7SO8rKh4dUbW0xQJJr0ektxdCVxf49nZwzc0QCBCj8JMtZnh44MZXXigtzf9YV/dTNBr/JE0mCJ2dCLe1gdVqIRBAamqCr6UFX+vrdbfuwkJZ2cN9rTYo6vWZ5NAQBALEqYOoRoNfDQ34VF2ty7lM8yUlD6zl5R+OGhslVqO59NbWXn6urMza1Oqnd97GFwUF+fOFhdo3xcWm10VFunmV6n6ubf0LxSvsH2lz/wc"+y;
	} else if (pngid == "silk_asterisk_yellow") {
		return a+b+c+"J5"+d+"pZPNS1RhFMaff2EWLWo5tGnRaqCFRBAM0cZFwVSQpVHNQAWVMQwaSSZWtimLiKnsO5lEjKzs4y1zRK3oItfMj1FnnJkaUtNrjo45H3eejpCKNa5anMX73vs855zfOS9I4n9i2SHbCpvph8q8A9PNcCzcz76EM9EETj+DmmqENaeBiJ3mRyuzQy5mwyVMKqiFbzNN0MxgKZOd2zj5GMZE/ZL5ooHZAntGW89s7Bw5Ws25llWcfQHrzHPYE/51ZOQ0M4Fiitj4UQdbzhZSb+FJ63ZypJqp7p0UsTf+FN6kvoMMl3GmNY9jj+BckcF8/HoFldLzpZIqxhthJPVdkr2cifdb5sXefyAKLFvyzVJJAssisIxstILZ0DEyeJzpHifHfNBGamFZ+C9yC7bhG7BBxCrZZqWQpoiNP6S1TMBFDh4gA0VMdxfy+0NosftQX+8gGKkBY741HLoGhbnXUOZwKTn+gGa4nOlBN9MDxdJzCTmwj+wvEKPDTPUc5Zx+kOk+NxmqZOJTIXsviYGQVgKLAos/n0CbbIAS0ir1eY9kF4O+3UzpBYzehhaugQpdR3DwKth7EeyqEoO/oYzXwyKwDDN0ipme/VKFi0l9L8M3oYW8SwxWnIKI1XT7Vqb6i/ntLoLTHdulhROcUJsZuJJjCsvEPpyf8m8io5U0VB6FtFNIe6da84XFEcYaNrDzLDw5DUZ9cEwqm6zxGWYGPBTShogtQtoerV0rLA5JKy5+ubya7SdzbKKMyRG7ByPeIfvebKfAWszUdQFavKOI0bqNbCuF4XfneAvzIaStQrpOxEpIL746rQKOD2VQbSXwtLiXg/wNTNvAOhsl8oE"+y;
	} else if (pngid == "silk_wand") {
		return a+b+c+"HM"+d+"lZLBSyJhGMa/UxTUIWJ0ZVmlwxLLEiEhurCoKeqCOtZN7J4ZRZdd9rSG6NFbSOegDp5aqWWI3UGm6KBUxsq2LLj+CzV9jDOH8NlvJtqLjuXhBy/z8Xvel4chAMhTKGfOMeVsbqXf2wBp3s5Yf5hno8rp24YxS9PTVHq18mTAgzj3k4mCIs0cqZeLUCTHJ1q13VKRSz0v4PRNVr1KQfu9Aa31BZ2LKKg42aHfJ8ZNA9i5L9hWUZFeQ73kof3N42SPR6OyjFZ1FZ36AuQfo5CPyc7gDiRHttNYwsl+Apqmodvt4uJrCur1GmSB/GI4TAOo9JKjVasQi8VQr9ehqiqazSaqu1Fofz5C/kYow9M3gJVkp+JUJZFIIJ1Oo1gsolwu42hngcmfdfmecS4fki3TC3ieN2SPx4NAIIB4PA7lPIo70YY7YQJyhdhNS3yU3W43/H4/LBaLvnWbbbxnvGNyQz4gmb4ByWQShULBkH0+HziOg/6die+ZKOjzzQEZYXzoCYhEIsjn8z3yI0wKmf7KwWAQuVwOLpcLXq+3Rx4EyWQyaLfbcDqdCIVCQ8n/A2q1GkqlklHYMLIREA6HN/WzrVbr0LLOP1AMs7UPAa92"+z;
	} else if (pngid == "silk_bug") {
		return a+b+c+"KY"+d+"nZPJT1NRFMb5G1wDHV5boNiqdHrvFYolCAtsGSSWKpMFKhYqlDI6oAEKaVJwCIgSphaKtLYWCgSNBgRjMNHoxsSFS3cmJmA0NMTw+R6JKKZl4eJL7sm953fOd3JPHIC4WMpcppG5SGnZc8ZjVVF6QLn975sDgfaZmvg71oRJZIRUYcuAnq/2KWroGfm3QwEn2YpLVPPvOD2oiqj9yq/mGznegl56mx6T7ZbY1M6YAM0CuZkxT0b2Wg6QW/SsApRXDsotR+d6E9Y/h9DuqoCuJq0lKoDxqU1/pITGR27mBU4h+GEcTz5OY+ClA5JbyahYzof/9TBO9B/FcWcqpA4xU3We3GJ87ntnfO5meinMvruNnqcmXA2XoDVcCc0wCYkzBaZpA7ILRJ/2O2B87jA+QT9UeDRe8svZYAG8b/txc6kc9mA+yqayYPQXwvdmBEOrA5B2p0BtFIYOWKCm5RukWwZyXIbA+0F0LpaiKaBHmVsLw4we99ccsM8a8GClF5JOMcQdou8prULrgRmQo7KI0VcE13MrGv06lE5kodhzGvdWu2GdKkTVWC4DcELcJkKyXbCb1EhAVM//M0DVUNqP2qAJd1baUDaZjTMTeXAttsPi0cM0mgvHvA0NkxYk2QRIrieOsDmEmXttH0DfVfSluSToWmpD8bgOroUOWNw6VI7koGfOBuq6EqLLTNU6ojrmP5D1HVsjmrkYezGIrlA9LjKgnrlGXJlpgbCOD0EtD0QNN8I3cZqjAlhJr4rXpB1iNLhrYffUQWoT7yUKzbxqJlHLq0jc5JYmgHMunogKYJVqF7mTrPyfgktMRTMX/CrOq1gLF3fYNrLiX+Bs8MoTwT2fQPwXgBXHGL+TaIjfinb3C7cscRMIcYL6"+z;
	} else if (pngid == "silk_add") {
		return a+b+c+"Jv"+d+"pZPrS5NhGIf9W7YvBYOkhlkoqCklWChv2WyKik7blnNris72bi6dus0DLZ0TDxW1odtopDs4D8MDZuLU0kXq61CijSIIasOvv94VTUfLiB74fXngup7nvrnvJABJ/5PfLnTTdcwOj4RsdYmo5glBWP6iOtzwvIKSWstI0Wgx80SBblpKtE9KQs/We7EaWoT/8wbWP61gMmCH0lMDvokT4j25TiQU/ITFkek9Ow6+7WH2gwsmahCPdwyw75uw9HEO2gUZSkfyI9zBPCJOoJ2SMmg46N61YO/rNoa39Xi41oFuXysMfh36/Fp0b7bAfWAH6RGi0HglWNCbzYgJaFjRv6zGuy+b9It96N3SQvNKiV9HvSaDfFEIxXItnPs23BzJQd6DDEVM0OKsoVwBG/1VMzpXVWhbkUM2K4oJBDYuGmbKIJ0qxsAbHfRLzbjcnUbFBIpx/qH3vQv9b3U03IQ/HfFkERTzfFj8w8jSpR7GBE123uFEYAzaDRIqX/2JAtJbDat/COkd7CNBva2cMvq0MGxp0PRSCPF8BXjWG3FgNHc9XPT71Ojy3sMFdfJRCeKxEsVtKwFHwALZfCUk3tIfNR8XiJwc1LmL4dg141JPKtj3WUdNFJqLGFVPC4OkR4BxajTWsChY64wmCnMxsWPCHcutKBxMVp5mxA1S+aMComToaqTRUQknLTH62kHOVEE+VQnjahscNCy0cMBWsSI0TCQcZc5ALkEYckL5A5noWSBhfm2AecMAjbcRWV0pUTh0HE64TNf0mczcnnQyu/MilaFJCae1nw2fbz1DnVOxyGTlKeZft/Ff8x1BRssfACjTwQ"+x
	} else if (pngid == "silk_delete") {
		return a+b+c+"Jd"+d+"pZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/g"+x
	} else if (pngid == "silk_eye") {
		return a+b+c+"KA"+d+"xVNLTxNRFP7udDp9TCEtFSzloUBwY4FUF0ZjVDYsTDSw0/gjXBii/gk2GjZudO1G4wONK40CGkQSRKTybqGAfVHa6dy5M/d6WwMhccnCk3yLk3u+L9+55xwihMBRQsERQz2crK+vX3Txyn1SyfXDMnyE24AjwR0Q4qLQw1M82H4vGo1+3OeQ/RZSqdQTV2XnhkKzmqaoYJaJQj4P27LgcQGNdTocRmFzyWiJv2zqil0/EJDkt67C0oAGhtTmJpLpHEwSAPNEwBwCy+bQ7W1EsYlYWxiKdMSjvbPhniu96tra2ohmbAxovILZxCq0E5dh6M1g0jllAqYEZRw7lhRp1ZDdewW9tILAykRPingfk9Ti7BbJJ47viiC645cwNm2gYPAaefhWH4TgGB79JoU4vG6Cu0MNyMx/Bv8+hkzJtlWWW27yRfrQ0dhS+4sq0aAOqHQgOK8JGJbMKZf9/h1asPssyv56sBejqupuinEtEHI5jgNFURCuA5JZB6a0fPvBF1BLClbsmoPT7X5wKVqrbWhFqDMmFFHcKLLiNmzbBmMM7WEFAY2jbDCUJbFsMpQkjgUI4ifVWk21lqaXoBQ2mMJ94adi6wes5AxoMYOw7uBcl4JTEQFVULhhId5GcO2MJtuUEykXQRc+gb1/hLTl/VobY2JmctyfnTvvUwlEqCMPvdGEHrKgevj+wlTrxO8VL1+ebLaSc1gwA2kj9bPlYJGmPrx7bm0lrkbIrhrwewFPPbjbj+pzdSPtUh7YXsRqpiT2gp1T9NfEhcGR1zY5fEzjo3c8ud3SIKV0SJrp1wgCLjiS7/CKaU5LPCOcj918+Gb+n1X+b9f4B22tbKhgZZpB"+z;
	} else if (pngid == "silk_error") {
		return a+b+c+"Is"+d+"pVNLSJQBEP7+h6uu62vLVAJDW1KQTMrINQ1vPQzq1GOpa9EppGOHLh0kCEKL7JBEhVCHihAsESyJiE4FWShGRmauu7KYiv6Pma+DGoFrBQ7MzGFmPr5vmDFIYj1mr1WYfrHPovA9VVOqbC7e/1rS9ZlrAVDYHig5WB0oPtBI0TNrUiC5yhP9jeF4X8NPcWfopoY48XT39PjjXeF0vWkZqOjd7LJYrmGasHPCCJbHwhS9/F8M4s8baid764Xi0Ilfp5voorpJfn2wwx/r3l77TwZUvR+qajXVn8PnvocYfXYH6k2ioOaCpaIdf11ivDcayyiMVudsOYqFb60gARJYHG9DbqQFmSVNjaO3K2NpAeK90ZCqtgcrjkP9aUCXp0moetDFEeRXnYCKXhm+uTW0CkBFu4JlxzZkFlbASz4CQGQVBFeEwZm8geyiMuRVntzsL3oXV+YMkvjRsydC1U+lhwZsWXgHb+oWVAEzIwvzyVlk5igsi7DymmHlHsFQR50rjl+981Jy1Fw6Gu0ObTtnU+cgs28AKgDiy+Awpj5OACBAhZ/qh2HOo6i+NeA73jUAML4/qWux8mt6NjW1w599CS9xb0mSEqQBEDAtwqALUmBaG5FV3oYPnTHMjAwetlWksyByaukxQg2wQ9FlccaK/OXA3/uAEUDp3rNIDQ1ctSk6kHh1/jRFoaL4M4snEMeD73gQx4M4PsT1IZ5AfYH68tZY7zv/ApRMY9mnuVMv"+z;
	} else if (pngid == "silk_help") {
		return a+b+c+"Kk"+d+"pZPdT5JhGMb9W+BPaK3matVqndXWOOigA6fmJ9DUcrUMlrN0mNMsKTUznQpq6pyKAm8CIogmypcg8GIiX8rHRHjhVbPt6o01nMvZWge/k3vP9duuZ/edAyDnf/hjoCMP2Vr3gUDj3CdV6zT1xZ6iFDaKnLEkBFOmPfaZArWT5sw60iFP+BAbOzTcQSqDZzsNRyCNkcVoaGghzDlVQKylOHJrMrUZ2Yf52y6kc36IxpyoH1lHF7EBgyMKV4jCJ5U/1UVscU4IZOYEa3I1HtwI01hwxlDLhDoJD/wxGr5YGmOLAdRIrVCuhmD3JdA6SQabx12srGB0KSpc86ew4olDOGjH4x4z0gdHDD9+c4TaQQtq+k2Yt0egXYugTmoVZgV9cyHSxXTtJjZR3WNCVfcK/NE0ppYDUNu2QTMCtS0IbrsOrVMOWL27eNJtJLOCDoWXdgeTEEosqPxoBK/TwDzWY9rowy51gJ1dGr2zLpS2aVH5QQ+Hbw88sZ7OClrGXbQrkMTTAQu4HXqUv9eh7J0OSfo7tiIU+GItilpUuM/AF2tg98eR36Q+FryQ2kjbVhximQu8dgPKxPMoeTuH4tfqDIWvCBQ2KlDQKEe9dBlGTwR36+THFZg+QoUxAL0jgsoOQzYYS+wjskcjTzSToVAkA7Hqg4Spc6tm4vgT+eIFVvmb+eCSMwLlih/cNg0KmpRoGzdl+BXOb5jAsMYNjSWAm9VjwesPR1knFilPNMu510CkdPZtqK1BvJQsoaRZjqLGaTzv1UNp9EJl9uNqxefU5QdDnFNX+Y5Qxrn9bDLUR6zjqzsMizeWYdG5gy6ZDbk8aehiuYRz5jHdeDTKvlY1IrhSMUxe4g9SuVwpdaFsgDxf2i84V9zH/us1/is/AdevBaK9Tb3E"+z;
	} else if (pngid == "silk_lightning") {
		return a+b+c+"IM"+d+"pVNLaxNRFP6STmaKdFqrgYKWlGLSgoiKCwsKVnFRtBsVUSTNyj/gxv4Bl678AyKCoCulgmtd+W7romgzKT4QMW1G+5hMpnPnnuuZm6ZNawoVBw7n3pn5vvP4zkkopfA/j9F8cafO3FekCjGpIgKIvayftTXOkr71jkz2/UXA4HxXfz72gIx/lBsWSfiVtwiWHK8B3kRQeX/6lmnnkuDAwn0MJSKQEFChQCp9CcHixxgsGWw3B01uRKfx9t1HIP1POpoSdUulLyD0vqO26IAkDW7tgSZYeHPqcmpXxkTChKzOaAKSEdo6jnEWVY5ehFxdHs2cn55rScDR73H6DKyyRWs1R0haGdR+z8YZ3MyMTj9rpUKi/PLkUJuZfmX3nkNYmQBxzYprpyCA2XMRrvNAcdfDhgKkm6ttKTdW6jH4w4RpD/ALAaNzhH2kSwALoSJCd9+VhIqEVVeD4C1MclaOT0Ke0Cowq+X9eLHapLH23f1XreDzI27LfqT2HIfvzsRAyLB2N1coXV8vodUkfn16+HnnvrPDhrmXsxBY+fmOwcVlJh/IFebK207iuqSShg0rjer8B9TcWY7q38nmnRstm7g1gy9PDk2129mjinjy3OIvJjvI4PJ2u7CJgMEdUMmVuA9ShLez14rj/7RMDHzNAzTP/gCDvR2to968NSs9HBxqvu/E/gBCSoxk53STJQ"+x
	} else if (pngid == "silk_rosette") {
		return a+b+c+"Iz"+d+"hZNLbxJRGIZP22la6KLpou1GN11QKGW4DFTH1phorZcYi8R6w2ooAlUSjUStC39A49I/4sK9f8OFLoyCwZAAgsMwc87x9RuoSXWgLt7MvGfO+3zfnAsDwAaJT0094+PjlojHTc7YpWHz/g4x5hELCx16Qm5eg9zOQGZzEMeOQyQSsLze8v8Ab2TqOuTT55C5R5CPS5ClPYhsAfJJCXY0htbkZH4ggFp+LYIq5I00RDoDQz+DRlxHM3YSxsoq+K27EDt5WDMzlsmY5gIIn0/Il6+ocpECazDip2BrOuzYCViRBMzoCgT9El+/gEYgUHN3MDLSlMktCFKTQk5QRCgUjoOHYugsRyC3bqObvodv09NlF8DWtKYsvYDM5NCmijycgFA1iOUoeDAMM6BCXEmiq6+ioihv3YC5OdlbtJ0cOlHqgKryYAR8SYXtD/UAMr+LzvZ9VP3+7y6AMT//rq1R1UIRfOMyTAKYTnAxSOEQOLXe2kziq28RHxnbG7iNrdnZ991kCuJmGnK3CJmiNblKPvOAdiCHaiSKT4pybug5qDO2VB4bQ23tNIyNi+CFhzDObqC+fh5lVcXnQIAfeZB68nqloSiojI7ii67jA73XJibQIG8zJo8GeDxZUAeShi3ST+fzP/4HY9nhAMYscTC5Q2oxViFfOeQdgDUQ8IuxO04l+wBg9kP75PcP+V4XbZrrAlC4TmpRxarTBV0sy3ZuZ18W78OrpBYB639yvwHcmnk0jmx5Qw"+x
	} else if (pngid == "silk_heart_broken") {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH1wkdFggiaZ5/KgAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAALVSURBVHjapZM5TFRBGMf/8/ZgF1hYAoRzhRXl8AhKTDQSI4QaKaCgsSHERgyNBRVBLQixNBJNLK1M8CogFDYocoSI4VoIcgWWt4CE3X27+655Mw6HxCgWxkm+ybw33/f7jvk+4D8X+XmwBgbKuGXVMcOosQzjjru5OfyrotLbm2Xq+k2YZoqpaUM5nZ2rxwCrv/+eMH4AlzODJRIww9FZZpq3Pa2tk7yvT4rK8nXGWY8zMzOP221phix/1EPbD/O6uyeJMK7n1HgvlZWCSDaBJDDX12GsB99InD9mFl21KB1O8hUWOTK8EkwDRkRBbGr6i/JtqcHOKG2zFeSDCM/YDAG6AYffB3l2JjWv5LTdkerJtTj3S5SBLImoJQJXmge89GxVJDDfZRehnrelpQHLK4BJRT4WEFhE0kygwNCp31FUsGUjIrI9URLGDu8jYTjLy2BpWv0+wHnwU9OF9yMR31xVXSQWS8bWrheZmYCqAfwIIIQYxj7AbRdVj3JKswk1BUQ9SAGUwiERlyhoiaWqGzahDE07NgbhBzCm61wS2we6sAAU5gPxGGAcAlJ9hU4ai121lIgPujBW1UNJxAFPClQ5BEvX5yWx9cTXNla1jSBQeRFwinwVBRLj6TweP0NiiZwD7/vRMVGj3Gxobje+j46r3DR7JW9b27KANESn5yaUiQmwcxVAhX+/PRxc19xCKR1ra0CKC7ykGAnxCruzgV1lcfGVjdK3x5242dGRLkD3RUrtGVWVHk9BHvB5BDvBkJJdXuoxPKmIbu9YqiwHoksr/TQSfXlpfHya/N7byy0tVwToidd/6lpWXS1CT5/DW3sD4WAoFp6dG9W2d17bGXt3weuVyeAgJycNyEJTk1dAHokXuutvvLUSXVpO3psJDBt74Rei5Ycuj40l/himk9ZUTU1jRnFhV2R98xNLqM9cwFzpyIj5T+P6tbq6Xa6tTfrb/Q8XdqPm98SRdQAAAABJRU5ErkJggg==";
	} else if (pngid == "silk_arrow_up") {
		return a+b+c+"EG"+d+"pZM/LwRRFMXPspmEaGc1shHRaiXsJ5GIRixbCr6SikxIlqgJM5UohIiGdofovHf/PZVmYwZvTntPfjnn3txWCAFNNFE33L/ZKXYv+1dRgL3r7bu0PbucJp3e4GLjtsrXGq9wkA8SU7tPk87i/MwCzAyP5QNeytcnJl46XMuoNoGKDoVlTkQhJpAgmJqcBjnqkqPTXxN8qz9cD6vdHtQMxXOBt49y5XjzLB/3tau6kWewKiwoRu8jZFvn+U++GgCBlWFBQY4qr1ANcAQxgQaFjwH4TwYrQ5skYBOYKbzjiASOwCrNd2BBwZ4jAcowGJgkAuAZ2dEJhAUqij//wn/1BesSumImTttS"+z;
	} else if (pngid == "silk_arrow_down") {
		return a+b+c+"EN"+d+"pZM/SwNREMTnxBRpFYmctaKCfwrBSCrRLuL3iEW6+EEUG8XvIVjYWNgJdhFjIXamv3s7u/ssrtO7hFy2fcOPmd03SYwR88xi1cPgpRdjjDB1mBquju+TMt1CFcDd0V7q4GilAwpnd2A0qCvcHRSdHUBqAYgOyaUGIBQAc4fkNSJIIGgGj4ZQx4EEAY3waPUiSC5FhLoOQkbQCJvioPQfnN2ctpuNJugKNUWYsMR/gO71yYPk8tRaboGmoCvS1RQ7/c1sq7f+OBUQcjkPGb9+xmOoF6ckCQb9pmj3rz6pKtPB5e5rmq7tmxk+hqO34e1or0yXTGrj9sXGs1Ib73efh1WaZN46/wI8JLfHaN24Fw"+x
	} else if (pngid == "silk_emoticon_smile") {
		return a+b+c+"Jn"+d+"pZPNS9RhEMc/z29t1d1tfSmhCAwjioqoKNYuYkRRFB300MWT3eooeMn6C4TunYoiOgSKkGAUhh0SjJCwsBdtfQMN17Ta2v39nueZ6WBtktGh5jLDMPPhC/Mdo6r8T5T93nCPTUqVDhVOi5BRBRVGRBhQ4drGc5pfO2/WKnCPTbMKN0x9Z4OpzqDxWlCPFnL45VHCd91ZEdprWnRoHcANmhatbu4JtrShiSr8t9dIuIS6IpgKgoqdGBsQztwj/DDUWndee0sAO2hqVZmO7b+bkuAzvpgF+wVxIeqLqxBRTHk9sfL9fBq+kBdh+9Y2/RgAqNARbO9KaRwkzIL7ymBfDiQCH/HkIYjN4z6P4cNJEnu6UuLpAAgARDhrahqRYhZ1BVQsx85UomJRb2lqzqMSojaPW3lOWfUuxHN2LWAv5WnErZSWVCzqItRHP2qL+ggJc0CI9zSUACoU1BXBOx71PmXq7dzqorc/csj05BKDD+ZQsaCKCLFfCjxZbAGIc7R5N+9ezTI7uYD6EBXLTHaZiTfLZBrTmCCB+DJsyETJSCL029zowaC6nkRynqNNDYw9m2L8xSx4S7LSkMlUkUzEKEsfoJCbxkb0l8643GPqRHifarydEvsGnx9HohXUhYj7eUaIJXdi0qeYvn8x7yw7Dl3WxQCgplUXRWj/NnELdBuxdCMmVouKgihBfDMb6k6gieMsvezDRrQfuqyL66w8f8ecFM/15N7OhvimfQQbAhCHCz1f59+yMNyddZZLh6/owB9/AWD2pkmJp1OE096TcRE4y4izDDhL95Grf3mmf4nvrQOLvcb/mlM"+y;
	} else if (pngid == "silk_door_out") {
		return a+b+c+"JC"+d+"lZO7a9RBFIW/+e1ms0kMmOCbRKKGaCBBUCsttNM/wU4UsRQUQQSblIKWFpGIiLVYWQgWsRIRxFc0PhOMhSjRDZFkZ+5jLFazWWx04HKq883cw5mQc+Z/z9T105fc7ayZLpb/x/j6xpl37jZYWb+JmdkpeouKrgDGxsayu/NnzGxFT4xkCpzKuk2s2TaIm5NnXiASWQGYGX19fQCEEFo055f07DsABOLPeUwiOTsiSrEakMlM1u+tmP+MmeFm1GufkaUFXBLZ7e8X3F++y0KqETqbZgDVhJtgmnBNQCC7k1K9CZjufcqWjZvpsbXc+jiBqaFimBpX+/eQVXFJmCbIDYDKb8CRK4eeD/QPMDo0irqya3An4oqYcPv2HeT3zSaRrHU2rv/K+6ykFCkfvnzw5sCWgdHRoRFq9RpLsoSYkFzoKq9B1RBJmCqWIt1dP+hdO09baZlFqVPcO/fg2JuPb6cePXtMEUq0l6pUyx1USx1ES6gYInVcIyaR2vcSs7PriKmtGeLkxYcjB8/vz8v1ZVSVDx9mMHVMDTcnpYir4BIxEeZjGdwRSc0Qt3/dyUx4S5FLnNt7oaUL+upaIwMVTCMhlHF3VFOzB6rK8eFTZMstHQghkCQ2zBJxSY0e5AagvBpQFAUndp9q6UAIAZHGCp09/bgKGpcgf8FMCePj43l6epq5ubmW/q/Wo9tn6erupr3aRaXaSVulncWfNT69efIt/Mt3nji5dYOZ7jCTYTMdcre+olw5ahIXfgHcTaP3d3vNvQ"+x
	} else if (pngid == "silk_sport_8ball") {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF8SURBVBgZBcFNiIwBAAbgN5etvQiJOPiuyk/YwqLk52v9NbTtarDGNpbhoCknHKgtOXxDIU60mVI4OOxVbtuchaTkoByUMpoc/NTjeSIi0irPd5q9U/2J/uHe7s7mUkQkImeLi1VrcM+cZ56oXLJusKZaVohEThcz3fve+Oaz1+bdctdNNUPdFBKZqu54658v2q54pKvlsmt2SCWpleODl75aMKvtu3MWNJ02oymDlCk7N7zwR9tHc9pm/TDtpHFNa6WT0d4d930y54E583inoe6YmhHpZX3/oVnP/fTKvF/+emzKpJo9tkk/Rf+2q9qe+uC39x5rqBt30E4bpJ+lvUuuaLmg5ZymhhMm1OwzarX0sqiz33UN06Y1TKmbcNSY7UYMSycpM5hxxnF1dZPG1YzZaZOVMkgZSbXOpGMOOeKIA/baaqNVhqSSSIp01xhV2mWrLTZZa7Eh6aaQiKRIlcESK6y23LAhGaRKIRIRkZTppJd++umlk1JE5D9AhzZjNC9N+QAAAABJRU5ErkJggg==";
	} else if (pngid == "silk_flag_blue") {
		return a+b+c+"Ix"+d+"pdNdSFNhGAdwKSNyg6ALC8GLoE8so49VRHVRFFQISlJeREXQBxWSSZDUpNrOTDoxSGvhmokV1TazLeekTBda9rVKmW5lYq6slgutOI7j1vn3vKc4rCAv3MXDgfPy/73Pc3hOEoCkROq/B6v2GdIWHLnhmK1v7ZtZ3PIuo9DmOr17iaUkLx1Ud6g2jgqo+JCU4x7Bs5AEe4+EhbYYMsv9iEYGcU+/VEZkYNkew7iJnHBrgl4YSeYEJJcIGF8qoKw9Bv8g8GkY8IaBthDgqatCsNGAq4czGbBLBhbv5VWT+EiL2Q9cfg2YA0DDe+AxBeqDQPvX3+/PdwKmfA0+PDDCuGM6A9JkYP5Byyy1SexgQM5dIJvqpJdCb4DWz8BDKguhhzxDor1Ig+7afBaG8hFnFDiyp1ZFgxa6JbcR2NoEnCLg2ltqfQBwUzcVhJc1+4c8/Br0urV/A9OKvJyxQ/qmfQ5so/D2ZoB7CVh7gN4fwP1+wEWjGK/XoKt6C9rOrWeATwHUugEn3RBjrW9oAI4TdJPCno80RlfsZ27d9+Eslxitcdpk4HbxCgboFEB1JvKk3CfhSjdQTXM7+yRorCLUZ8PSposvvMZX0bydtf2Vi9JT4avcjIr9GQxYrQBzC2zmVG2nkGIISyncF2mKLiDOKbQ+it8JCqy9dGCe3EH8/KMu0j9AqePEyoSAwFNTVkKAHG7i1ykrPCbAfmw5A46OBbjw5y9kz8nxZ78A90vOcDVd+i0"+y;
	} else if (pngid == "silk_user_comment") {
		return a+b+c+"J5"+d+"fZJtSFNRGMenRkgY1BKiL30yEkqJrCjrgxBB5Qtmyy3NcGoUuqD5skEm+ZZizpTUmZEw33ML06lzGoQKtRRETXM2Z1LOTBs6LNNw9/w7d+IiuevAj3vO4fx/z+E5lweAtxVRvp5Pqaf8psAF3RQfngtBa1OvCet2Bq5Ge/80K5nkCntR7AwhsP0imF8msCwRfF4k+GQlmFxgYF7YEKerDJzV90vKexwHZm0EX2hw6juBaZ6B8RuDsa8MRiwbggL1IP57A7b6NK36kYbH5xiM0vCwhRXYHYKMmnd/gwlH+dvunPTOehy623ZLlrfO9oCVbA72JsMzjEPK2QP5Gb5UGewJxcXtKBLsQ2JKBkR5OkfHq/QfnKKlH2uONd0f/ecVioM8OzXyC+hRRKFAeBC3A3dAfHwn7ob71tCD5rnFlc3gKiVjM+cUlEbsqZ4xqLE81IT3Lx6gXyXDUMsjpGQqRip1Y2zwJ0W6tWfOyZUQQepEYxpZHW8FTFqsGdvRX5dORLlaKw0mcP0vTsHekAYPXkDFE3VxNplU3cREXQrMdRKoCnOI+5Gycu9zlR4uBbvON7l5nNbkykunGL0VkGvfQqo2QFJtwLNhIDHfZHc/UZvpFVThxik4FfEwNS2nDc+NBMkDwI0+4LoeiNQAV+sJcrsIxMnNJDD0noxTMFt4CAPqUiSp5xHbAcRoCIQ1BBFVBGFPAYFiAYPNSkxl+4JTYFYGv6mVxyBU2oe4LiC+GxDrKPR7rQU4G9eBl/ejMVEW1sspMDUk8V+VxPsHRDZkHbjcZvGL7lrxj+pe8xN2rviEa63HLlUVvS6JPWxqlPC5BH8A3ojcdBpMJSo"+y;
	} else if (pngid == "silk_comment") {
		return a+b+c+"Ev"+d+"Y/j//z8DJZiBagZEtO8QAuKlQPwTiP/jwbuAWAWbARtXHrz1//efv//xgS0n74MMuQ3EbHADgBweIP7z99+//x++/fv/8tO//88+/vv/5P2//w/f/ft/782//7df/f1/5xXE8OoFx0GGmCEbIJcz9QBY8gVQ47MP//4/Bmp+8Pbf/7tQzddf/P1/9RnEgM5VZ0EGeGM14ClQ86N3UM2v//2/9RKi+QpQ88UnuA2AewHk/PtAW++8/vv/JlDzted//18Gar7wBGTAH7ABtYtOgAywxBqIIEOQAcg1Fx7/BRuMFoicuKLxDyzK5u64Cjfo/ecfYD5Q/DLWaMSGgQrvPH/3FabxOxDXEp0SgYp7Z267AtL4BYgLSUrKQA1KQHwPiFPolxcGzAAA94sPIr7iags"+y;
	} else if (pngid == "silk_book") {
		return a+b+c+"Hj"+d+"dZO/alVBEMZ/5+TemxAbFUUskqAoSOJNp4KC4AsoPoGFIHY+gA+jiJXaKIiChbETtBYLUbSMRf6Aydndmfks9kRjvHdhGVh2fvN9uzONJK7fe7Ai6algA3FZCAmQqEF/dnihpK1v7x7dPw0woF64Izg3Xl5s1n9uIe0lQYUFCtjc+sVuEqHBKfpVAXB1vLzQXFtdYPHkGFUCoahVo1Y/fnie+bkBV27c5R8A0pHxyhKvPn5hY2MHRQAQeyokFGJze4cuZfav3gLNYDTg7Pklzpw4ijtIQYRwFx6BhdjtCk+erU0CCPfg+/o2o3ZI13WUlLGo58YMg+GIY4dmCWkCAAgPzAspJW5ePFPlV3VI4uHbz5S5IQfy/yooHngxzFser30iFcNcuAVGw3A0Ilt91IkAsyCXQg5QO0szHEIrogkiguwN2acCoJhjnZGKYx4Ujz5WOA2YD1BMU+BBSYVUvNpxkXuIuWgbsOxTHrG3UHIFWIhsgXtQQpTizNBS5jXZQkhkcywZqQQlAjdRwiml7wU5xWLaL1AvZa8WIjALzIRZ7YVWDW5CiIj48Z8F2pYLl1ZR0+AuzEX0UX035mxIkLq0dhDw5vXL97fr5O3rfwQHJhPx4uuH57f2AL8BfPrVlrs6xws"+y;
	} else if (pngid == "silk_chart_pie") {
		return a+b+c+"Mo"+d+"ndPLb5RVHMbx5515pxfnnaadQi9MSykzRSFSqyWjITVoUIMhLmClLky6YcempKBGgitDJEgaIlVjMGkkLkCqIUTjyo7YQs00dYYZpsNoufReaWn7nvM757yX4wJJJBoXfv+AT57NY2it8bBT2fct6aoeodQeoSgplISQYpSE+i6onv2gWr9e/tEbMY6/ZTwETmaO7ZKO+uKZ6q7WoFkBx/BQV7keN6fyuJj7qj9mfJJVjturlNf9+YH40CPAiV+P7tsYSlysDW/AtLqHcTuPoA5gp/U0zl39bKnS3ZeMGC+NJhNWNHdrFbdn7f3nD7cPAkDgw/GjUaHEQJ21EWN2Ean7I7jvrCBR2YL5ubtgjN4L692HttRVROtrKtDWaIFIDbzy9nAUAAJcUk9n9S6rRFPI8wlwV2B9MApLhPBN5sJ4LHj6miDnQKI5jMKMQLSqHG1NEUtw6vkLYHuDoXJk7QKUK1EVsNBe9QRGiz+D1sRBR5p9HZsjQeX4mLqnUJyTaKgNQ5DYCwAmJ7FNGi4CMNBhPYlN5THc+b2EdCl9tjUysIFIdsZqKzFS5ODMA1v1sDUWghTUCgAmI071FevKuiI7MD9zF/1jJ5ckU33Hll87M7GSNn8IP15aWBbbTRjgzIf2fUhlQpEIPljAafKXG8Mdl64PLkqSxw/PNp3fvRR+S/PcxPM8/cKlbb0Q0gPnGsQ81NaEML1gQ0kqPQAYfflt5uv+U1Ntl7esBHs0p7yzudkyir/BX7NBRODCA3ENYbtojj+G4aslOJIuA4A5WOo4qzkd15xOO/GWMifeAt/zYI5lAcYguYSQHoiAzu0RFCbnkcllbM9RfQBgapuZPuNvqp3JMremGuJGHqHGJvg2g2YEKThIeEjEwigUp1HM3YQrRffs0JFFAAiEPj6z6K+xbuNaGsgVEGpohE8cHhE8ElAksMocXEll8FMqNTkzd+vV2aEjF/7xhbWuF1/WQnyq4pta3fp1CPw4Ar3wR/tzO9455ylJrqu+91x1Yj71rv2vZwKA5a1PWZ5UvVqpPb5yktp12xuWZrL4jx4B/k9/AolT0+iTfsOY"+z;
	} else if (pngid == "silk_cross") {
		return a+b+c+"Ih"+d+"lZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FA"+x
	} else if (pngid == "silk_app_xp") {
		return a+b+c+"FiSURBVBgZpcEhbpRRGIXh99x7IU0asGBJWEIdCLaAqcFiCArFCkjA0KRJF0EF26kkFbVVdEj6/985zJ0wBjfp8ygJD6G3n358fP3m5NvtJscJYBObchEHx6QKJ6SKsnn6eLm7urr5/PP76cU4eXVy/ujouD074hDHd5s6By7GZknb3P7mUH+WNLZGKnx595JDvf96zTQSM92vRYA4lMEEO5RNraHWUDH3FV48f0K5mAYJk5pQQpqIgixaE1JDKtRDd2OsYfJaTKNcTA2IBIIesMAOPdDUGYJSqGYml5lGHHYkSGhAJBBIkAoWREAT3Z3JLqZhF3uS2EloQCQ8xLBxoAEWO7aZxros7EgISIIkwlZCY6s1OlAJTWFal5VppMzUgbAlQcIkiT0DXSI2U2ymYZs9AWJL4n+df3pncsI0bn5dX344W05dhctUFbapZcE2ToiLVHBMbGymS7aUhIdoPNBf7Jjw/gQ77u4"+y;
	} else if (pngid == "silk_app_double") {
		return a+b+c+"Gn"+d+"nZOxilNBGIW/mXt3CZsYQQtjJYqPkE4L8Q20WARbmxWEFQvBXrByQdDKF3CL1QcQH8DOKmVIkWIFbdybTe7M/x+Lm+zeFELcAz/DwJnD4eOf8OD5p4d37w2f/qrUwR25k3PG5cgMl5AZ5k5/O81Ho+mHo7e7RyxVDu8M97c63TjosIk61cz2gfOAWVKc/T5hU50mxfa9lInXj29vHPDkzYT1ADkAi2x8/jq6fpy7N37+8eJfPHqX+zx7/1397VSNRtOXJRIAMcB4tnOr19thcHWjMt1qZu9KcwMghEBVi+o/eZSW81nARXiUOaXzgBYPuTCH7I65Y1nNyKlN3BxcwtwoLTUNItDmoRhQECWRECIhGKEQhUfK3Pg8G+V0PPm2d5Du5zpxZXDtrA0BCoEkCkEMBWUAC8Ji09TNG8NqXnz8IUnK7sruSmaqzTQ30yIlndZJszrpZJ4kSY9efVnfqjaP9hmBECNFEQkxEIuVP1O2A9Z4LB8Xy3OlrbbfbD1gOp4c7h2k3VwnzAx3Jy0WzY90Q6ZmK93xBsNh0JL8RfUXD1Ut4VHY1QE"+y;
	} else if (pngid == "silk_font") {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHJSURBVDjLY/j//z8DJZiBZgY4tN9wcO6+0erZd2uKc+fNfoeWGxMcW27Msiq+3GWUdIZXL/okI14D7JqvB+csf3Rv4p6X//t3Pf/fvf35/8Ilj3471V3bph9zmougC6xrr8mETbu7q3jl40/FKx5+LVzy8Ltd+eUZBvGnOYjygk3llfKCZY++u3fcWutcd21B07on/61yz88kKgwsCi8qJc++9yhu2p37ppnnQ4C4oWblo/9WOReXEjTANOsCs1PD9VVZ8+9/N0k7m6Yfe5LLOPFMR+Wyh/9dqq5eUvc6xIbXALOs8zEZc+9/C+q+ddEw/rSfXuRxLfP0swuqgAYEt934pOq2nxenAUbJZ0TjJt9+Vbn80X+v5huXrbLOb7LMOLfVterqjcYVj/+Htd38qey4TxqrAQaxpxntSy7PBvnVPO0MSmCZJ5/ZWL7g/v+ozlv/lex2K2EYoB9zigsYPS6lSx7+j+i59UYn6JgtTIGK635hdY/D9dnT7vxP6L/9X9F+b4icxTYmFAMsMs6ti+2/9S9hwu3/Ac3X32oHHOlVdtoroGS/R0vb9/Aip8ILrwLrrv33rbn63zD02F5Zy22GtM8LdDMAACVPr6ZjGHxnAAAAAElFTkSuQmCC";
	} else if (pngid == "ref_ban") {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAPCAYAAAC4EqxxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAGkElEQVRIS+WXeVATZxjGs2fYhFMEUSyCqEAVrVJLbcXbjqNULN54H3iBSlG8qnJYUTwqap0C4gEqQdSIEKUIiAgWkCvIKSBYrVXxwLG1tX/Up5tszJIBrP2vM2bmm2S+zWbn9z7P97xvJBKJBO/ZksAT/PqbwKKycYir3Y2HL0tQ97QSFU9LoWwqg6qxGnGVlTiuLsVpdS4iC8MxLX0URj+iMfIJgeHNJIY9IDH0PonP71IY0kTh09sUPqmjMLiWhlsVjUEVND5SMxhQysC1iEHfAgYf/sTCOZeFUw6L3lek6JUpRc90KRzSpOihMoJdihG6nzeC7VkOXZM42Cg4WJ/iYBUvg+VxGTodkcH8sAxmUXKYHJJDflAOLkwmCMhKQIfIQYebgPzWBESoyRthBeD5NR44VhOOxhfZqH6Rj6qWKpQ9UuNUfRWSGhuwr6QeuwpqsPdqIZRVmYjM3wjPNLe3Ag/MJ9E/k4JdCAlpD9FJBC2B+XgCLjmMAbBjGguLeRQII+G7mvdOgcx/ApYGcHrH0kGy9oEnt1jBL3cO7v6WjdQWFc48V+HS06u4dK8Sh2tv4fuKOvirSuCfko9tRSpENx1EyQMlxseMxih153YV7p9G6h9MyiSw30HCNY+Gjb+43ytJBO55ngXrSGjvMZtMofNaRn+/zWEjvcIWoVJIKKEg8vlsG4XZufx13THtUOEFVSN42/6A4scqJLQkI/FZIQqby7GnrAq7im7BN7UESzIyEFAdjcDGUAQ0bES8OhInCnZghKJvu8AuJ0QwZwWltXT/IhpyNwGKtpLoFe6TyYAbIOybTqK0lrbeLgJ3OSjVA8sm0mLm8OBm+zkDS9PDhPuI7iSYCOP2FV5WMAU3n6Qg7m4M9jTH8upWIr9ZjZU/lsE3uRhrC4uwpD4Inrd84VmzGLMr/LDlciBy6k9iaOTAdoHtw3Rg5hLtGe59hARrKyhj1EeC3sm0/gybTxGKo4F2ULEdAnc5YaRX942Kcn/WAJiwEp5LjWU6Bl6RNwsNz7MQVhsC//p1iL5/BQlNxZituAG/zBzsqkvDvNpTGFa+DmPVy+GVMQN+SQtR+ssFuG9rH9hijAAnteMBHXUWHETAMZoyCC3bnTrF+HNtF8fCLoGFTQQD+RiqjaUtvmFFu/YSisS4U3pgbqt4fpmlRh0DL8/1we2WLGwuD4Rf+T4cuZOBOQn5mHO+At5R17Ey4zo2livhn5uKuYlKTEvchCXxM1F6Lxluwa5tFB5cLtr5jRLmXxCw30uh3zVaD+x0mQFlJoYZacpb2pOE9WYajL3OId0IfWjJxglFYAdRMF4mwptEcNqUZmfo9nirszvkHQP75nrziXwe+yrDENFwBaFF1zA1rhizlHXwUTZgfHQhRm2/guBVq5Ay1QEZIxkke5ni8oFpGBjm0gbY+agALHeVoN9FCvY7SZgOEwA0Ce0QRWnbkrWfAGA5nzRoSz3OijDGnpQW2CZBtLPJCj7NI0U1uQVSLTDlIvwe5cFAutu4Y+DZJR5Q1uxHauMxrL6+DcFqBWadzMO0BDWmnr6DSafqELZxPUrXfIY/VXvwujoNLxVf44afK/wDLNsA2ywQ4KxnEgZ9mOur2/cl4ZzJW5mH13zP7hB/xlv14a57xcCy3CS0JYsNYhEsD3DaPswOFQAJcwLyMLEA7Eru7cCTHlnzSnqholmFNRnLEJC5Ev4Xs+ATXwifpCZMV9xG0pe2+IOHxX5PYJ0FsN0ejyOGI8GbMgAe0kCCYAQQh3ARuFe0oLpG4T5naHQPE8+oJqVbA5tNF691PSrVAnMjdXZ2I/WDh2kIr7quBRGWQjElcj4zvjN+O7Bm8PC++jH2ZAchpSYKwdkbsCUnA8sTr2NZcg0Wn63W2vh1yTm0frVs7YL0EaQBcF9Fq3Z0koRLIn/e3HQB1lMCJx5WM2lZ+uhC5wN+r9WkpUlprfL8MuFblGbS6qbgwXRuMFvDGkxa7PBWbUoTYl+x7wbs+ReJCWfcsf3SauQ/PIdjN7MRkpKHzak3sF5ZjAte1vg9diHAQ74KkuAZv35eSiFpiuFo6bhTV2ld5TVDR6eJBJzPUAaj5RuFTceRBsD2SgFYM2V12clqgTWDh2aPsiXQmf/cerQ03ceB7Cw8k3QiwfFh9U4Ka1Se8IrEmHMu8IhwR2xeDGJzUnD4aiZir2Uh/eBiFCzujV/X2aN5A4Pbiwik84m6Ieb/NUvLIo3/Hfh9+rf0D63TMi6KRbFUAAAAAElFTkSuQmCC";
	} else if (pngid == "ref_unban") {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAPCAYAAAC4EqxxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAFa0lEQVRIS+WXa0xTZxjHSTbdBbZ9gC0z8mEqccMZZjYbJ1FC5sZ0xNVlYmaybMl0JsJcY4ZOpKxyUblNlDsVKAwdyl1AVpUiKEjxClouroiwC6BcSkFbSi//PeeUnnIGwvpxsckv6Xvetie/8zzv8zx1cnJywlOGE2Z8mSzABDFO6IgxM6AlNMQQMWAC+ole4i/iD+K+Eegi1MRdop1onQDuEM3ETeK6AbhKNBJXiMvjQB1xkVAQ5wm5HqgiKolyoowo0QGFxGkinzj5GPiFyCGyicxHgJRIJ1KIJOLYGJBA/EzEjtkCaxc2j47C1NUFU3s7jPe7YX5EN58UtgzqoG+8iaHkFAxnyqBvauUJu7++kMuU+fPmweVF5ydmzrJFnry9+c/Om/ZZt5ddsW9zMAzFWlbY5Xn777k854xasZwVVsfc5n132YK3eOvIDeKZhc0kaqyqgum8HKbqC5goK8HjklIY/34IY98wtLJcPMqVwdhwCePysxiKPoTBjByYuunpUoQNnTruRs3l19kIe69YzV7LCs+AQnqO25dsF0ORJOfWTIRFnwexa9GmIPTnd8Pd1foA83ZncRHe6fct951gfxEXYenXSdz1/G0ySLda195vrJo5wua+PpjOlMJyt43S8S7QpgI6f8dETTW02TJoCD3tQ3WbUvAiQNLMZ4aPxGNQVsCltK0WqKvbecJSSSpPWOizcVZhJqVFwskHsDGIExYseY8TEyx+d0ZhiX/I3MLGhgZYblwFblFkKiuAM2eA4mJaX4P5WgNMl0jyWhOdlWw6K5lAWhpwIhemq43o3L7DIWEvj+Vwe8XVYeGRvD5Wdv4z9vQfSe9lz7Atwl4Ll0P4jv/cwuMVFbCoO6hYVAGlFMkSki2gyJ08aX0Av1UCx48TGVQQUogk4GgCzMp6tAdscUjY2+t9Vjg/Im/WlGbOMCMoP1DORlgZXWtN06WrOGmlpJYnzMi6ObvOLayjaFo6qAiVkeypU1QFfwVyc60RzZiUTCLJY8dI9AgQEwMcPgTzpRq0CTc5LPzl+q2QbBPPKDy1RXosWIwbCVdY4aygNOsZ3xAEX8+11tqwLZUnLFoXiKWveUDyScjsZ/hxURHMqhagiKKaI7OmrU00MZEOfgIQFwdERwNRUUD4AeBgBMz1tbjz8XqHhVP3JkK4duMTI6wtfoBvPvqK3Xd7yRWGQi2ChaJplVzkFzhNeKfPdgi9/GcX1tXVwVB0Gmiqt6br1GjGxlJEDwORkYBEAohDgeAfKOVP4EFUBHrCDjkkzLQgZfZlNq1t0fx3lWaKljpTxe2r01QQeFgL1rn95VCEVrHvBYuocE05w75L14Kp0kxaz16lNRpopFLoGWmKGjIoVZhIMkSEk+hPVtE9wRTdMEqxAmiSE9Gy7kOM36bCMTl42ASUhfTgqC0Jlq9kb5wfm8er0iM1D3nRmku4I6XF3vJilFAn3OHWI6m9XNHyXrIKzaGN3N4T2xIzaU3092MwPR2jR+NhZlpPMRWskH3A/hDgx73Aru8o1ZNhUcjRv2c32rZ8gTEFVfUpk9Z6Hz/2ZpJdYVBVNnM3VpXe4gkzk5bA095iGOGdn+7g+rChQsu1JaYfNyc02QVlfdDlDnFrZVgtT9iQPPzfhBlps14PTWUlekQijB5Pp/GO2pOYpL8nWUphbVoyWnx98efBeBjVA9NGy576e/ARWAsKw2L3RShNLGRHy6nFyOUFZ8QEHmSvub+6EFl706edT2bP5+01UMbV8aasNW+uZs+17femtinmmp/nB9i6MoDdD1jx2eyjpW2m1t+7hx5xGAZCSbbmHHDhLAYkoWjdHIARReP/f5Z+mv4t/QMZ/kpO838hfwAAAABJRU5ErkJggg==";
	} else if (pngid == "ref_perma") {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAPCAYAAAC4EqxxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAFnUlEQVRIS+WWaUxUVxiGccMNd+KCaOJuFJdo3Kga4hJXNhEXQKtTxQ07WsdBCBCq2GgJDWpsIioitqBYJcVYtUJLXSqNmpiWqBGbiguIwXEQEAY1T79zuUwZwCZNf9WSnAz3nHtz73Pe93u/4+Tk5MT/bDjB69dQVQXl5WCxUHPnDi+OH+dBRDj314Ryb80qft8cRknSl1Rnfw95eXDlCuTmwsWLcO4cnDkDmZmQkQFpaZCaCsnJcOAA7N8Pe/ZAQgLs2gVxcRAbC1FREB4OW7aA0QgbNkBoKBgMsHw5BAVBYCD4+4O3N8yZAzNmgJcXTJ4MEyfC2LEwahQMHw5DhkD//tC3L7i5Qffu0KULdOgAbdvWCesIXHHpMoUmE8/3JlB9KQfbbzewXb9MxZkTPDSuJj80BMuxI+8HcMXVn3kQtpGX35zg7f271Fw4RU1qIjWHPuf18YO8uXaBkkgjN5f5UpqSZFc4MzqaRbLjqjS8hg1jWO/euLq4ECfKpK9axTjZcW1twADMU6fi3rEjzi1akCnqLRo6tHZNnukv865t2hA3Zoym8D5Rz11XJlEpWE/h0gkTcG7WTHu2ocIh7dpp84eVsu9S+PXjxzzcaqY8LZW3BfnUHPgMa2IMZQkRVO+LwbYnmur4rVSfTefRRgPXV/hR9e1pu6WTwsK0lySJJW1iZw8BUNd527aRtHRp7Zqyp1g6yddXA1aWTpo1q3Zt+nRsa9dqwOr61vz5mqWNgwZp167Ozg7Aif36afMKuj5wvru7PZNMAv5OYIvU37PtUbzJv6kpWrU3GstuE692bHAY5dsMVJ8+xi2fKfyxO6ZJYFXD66ZN016cs3lzI+AyAX1uNjcCVjXs2aOH9lyBn58DsJq7qmpWatgmLnFt2VK7z7N9ewfgyM6dcdaDeJzc807gwqgIKk9/RU3GIazxZkqXBzQ5XpoNVCTEUhITzrUVcxsBZwlIqQSVsrS72MmamGgHzlJh1CC06hTOklC6K4oqCKOURV1ohejloOYjVSAJ8DG9DBoCWwcO1GCTu3a1q2yTDWgytArC1mA7f5qavTFY4yQx3/FXsmQ+lnXLKDu0nx/8Zcf1lDZJvaoPmDlyJC6tWzNTaq4wPl5LaZPYVa0tGDFCq2HzlCncVoksSpvGj9fW3EQp9XvFx8chpT27dcNTB1D2tYlzPOTe2QLSEPhYz57aXLGUk2erVrWloeq4qZS+F2qgKiOF6p1GXn265m+Bn60OpuzgfrIXjLMDG0UhzcIxYvMGbckobURbkxptqLBRgkmtuYsj1G+6ANVvS4Nl3ihhZ+jTp1Z9/TfHw8MBuHjwYNzFwq7Nm2MWQA/d8unK8k0BF2zdhCU+lqrEaMo/CUEp2eQI8sG6PZKHkSZ+Wir9UFf43wKfmjdPCyxn+eCChQs1S9sWL66FFOCzuhPUtUGULNA3qq6Gs3TrX1X9V/7P0l0RosKuKeCnGWkUBM7lVcZRrB8FYlnt3wi4aPE8ipb6U5mazGXfsdyLM/0j4FvqgCE1bBUrq5ROlzKoUzhnwQJyJL21FiVAtuBgbkkb0hJ89Giss2fb21CetK36wDYpFaWuh4LTDx7Fevipmi4VlzQ6eNgeFvLrxyt5tH4FlSdTtMB6FuyrQRct8aYoUGADfak4epjbHwaQs3AClZknGwHnqhNUA0t7Sgtxkx7rLWHkKbvvKu3CRT6uYP16O3BuQIB20josNa4gh3XqxEy9Js9OmqSdtAzSckzqFCUlYpXEdhE3aLlRVw69ejmctOL0XPCSzc2S96l7Zfx10nr+40VuLPPhwapgKr9O4cXOaEoMQRSHLMGyI4qKI4e5E+LHee9RPDmY+H4cLUuzv+OXlX7c8P+ApxEmLHu+0Mbj8E3kzh9D9sKJPEne998+WupS23vX+3z9Jyjvwkgtq2e8AAAAAElFTkSuQmCC";
	};
};



/*
	Style sheets
	TODO:
		add more, or get rid ot all together
*/
var morphcss = 
'TR.awsomeness TD{' +
'	background:#ffffaa none repeat scroll 0 0 !important;' +
'	border-bottom:2px solid #ffffaa !important;' +
'}' +
'TR.awsomeness TD.alt{' +
'	background:#ffffaa none repeat scroll 0 0 !important;' +
'	border-bottom:2px solid #ffffaa !important;' +
'}' +
'.awsomeness TD a, .awsomeness TD a:active{' +
'	color:#000 !important;' +
'}' +
'.awsomeness TD.alt a, .awsomeness TD.alt a:active{' +
'	color:#000 !important;' +
'}' +
'TR.faggotry TD{' +
'	background:#FF0000 none repeat scroll 0 0 !important;' +
'	border-bottom:2px solid #DD0000 !important;' +
'}' +
'TR.faggotry TD.alt{' +
'	background:#DD0000 none repeat scroll 0 0 !important;' +
'	border-bottom:2px solid #FF0000 !important;' +
'}' +
'.faggotry TD a, .faggotry TD a:active{' +
'	color:#000 !important;' +
'}' +
'.faggotry TD.alt a, .faggotry TD.alt a:active{' +
'	color:#000 !important;' +
'}' +

'div.postpanel{' +
'	border-width:1px;' +
'	padding:7px;' +
'	margin:0;' +
'	opacity:0.94;' +
'	z-index:99;' +
'}';


/*
	AddCSS

	TODO: 
		idunno, it's fine
*/
function AddCSS(cssstr){
	var head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = cssstr;
	head.appendChild(style);
};
/*
	ADD JS
	
	TODO:
		won't accept a value anymore
		only will inject my giant OBJECT.toString()
*/
function AddJS(cssstr){
	var head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	var style = document.createElement('script');
	style.type = 'text/javascript';
	style.innerHTML = cssstr;
	head.appendChild(style);
};


/*
	PAGE JS
	
	TODO:
		place all these in an object, and inject them all in one pass
		//FR_CFG.toggleBool
*/
var cooljs = ''+
FR_CFG_CREATE.toString()+
'var FR_CFG = new FR_CFG_CREATE();'+
FR_ShowCFG.toString()+
FR_autoClose.toString()+
FR_ToggleElementEX.toString()+
FR_ToggleDropdown.toString()+
FR_ShowEmotes.toString()+
FR_ShowUserHist.toString()+
FR_ShowImgInfo.toString()+
FR_TogglePoast.toString()+
FR_FindUser.toString()+
FR_TextProcess.toString()+
FR_InsertTextHelper.toString()+
FR_InsertBBHelper.toString()+
FR_RefCampCrap.toString();
/*
	style crap 1
	
	TODO:
		make less shitty
		css classes
*/
function calcpolarity(thenumber){
	if (thenumber == 0){
		return "background-color:#0000FF !important; color:#FFFFFF !important;";
	} else if (thenumber >= 1){
		return "background-color:#f2f2f2 !important; color:#1175b1 !important;";
	} else if (thenumber <= -1){
		return "background-color:#407bff !important; color:#FFFFFF !important;";
	//on the off chance this somehow gets fed a string
	} else {
		return "background-color:#000000 !important; color:#FFFFFF !important;";
	};
};
/*
	Style crap 2
	
	TODO:
		make less shitty
		css classes
*/
function calcboolarity(thebool){
	if (thebool == true){
		return "<span style='background-color:#00FF00 !important; color:#000000 !important;'>Enabled</span>";
	} else if (thebool == false){
		return "<span style='background-color:#FF0000 !important; color:#FFFFFF !important;'>Disabled</span>";
	//on the off chance this somehow gets fed a other shit
	} else {
		return "<span style='background-color:#0000FF !important; color:#FFFFFF !important;'>WTF???</span>";
	};
};

/*
	*********************************
	Show Thread Information gathering
	*********************************
	
	TODO
		textContent string splitting witchcraft to deterine word count
		ajax: get misc.php whoposted info and merge with this
*/
function BuildPostTable(){
	//GAy little array
	var PostTable = [];
	
	//GEt all the posts
	var fetchposts = document.evaluate("//li[contains(@id,'post')][contains(@class,'postcontainer')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	//Iterate
	for (var i = 0; i < fetchposts.snapshotLength; i++) {
		//Our Container
		Postdata = new Object();
		//guests posts break shit
		if (fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[3].textContent.search(/Guest/) == -1){
		
			Postdata.ElementID	= fetchposts.snapshotItem(i).id;
			Postdata.PostID		= fetchposts.snapshotItem(i).id.replace(/post_/, "");
			Postdata.UserName	= fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[1].childNodes[1].textContent;
			//Usernames with < and > break shit horribly when used with innerHTML
			Postdata.UserNameE	= fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[1].childNodes[1].textContent.replace(/\</, "&lt;").replace(/\>/, "&gt;");
	
			Postdata.UserID		= parseInt(fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[1].childNodes[1].href.replace(/http\:\/\/www\.facepunch\.com\/members\//, "") );
	
			//joindate		
			Postdata.JoinDate = fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[5].childNodes[5].textContent;
			Postdata.JoinMonth = Postdata.JoinDate.split(" ")[0];
			Postdata.JoinYear = parseInt( Postdata.JoinDate.split(" ")[1] );
			var currdate = new Date();
			//First of the month, is close enough
			var compdate = new Date( Postdata.JoinMonth + " 1, " + Postdata.JoinYear);
			var mmymonths = (currdate.getFullYear()*12 + currdate.getMonth()*1) - (compdate.getFullYear()*12 + compdate.getMonth()*1);
			Postdata.MonthCount = mmymonths;
			//Postcount Gross misuse of parseint
			Postdata.UserPostCnt = parseInt(Postdata.JoinDate.split("\n")[2].replace(/\,/, "") );
			//Clean up
			Postdata.JoinDate = Postdata.JoinDate.split(" ")[0] + " " + parseInt( Postdata.JoinDate.split(" ")[1] );
		
			//Moderator Detection
			Postdata.Moderator = false;
			if (fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[1].childNodes[1].firstChild != undefined){
				if ( fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[1].childNodes[1].firstChild.color == "#00aa00") {
					Postdata.Moderator = true;
				};
			};
			//GoldMember Detection
			Postdata.GoldMember = false;
			if (fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[1].childNodes[1].firstChild.firstChild != undefined){
				if ( fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[1].childNodes[1].firstChild.firstChild.color == "#a06000") {
					Postdata.GoldMember = true;
				};
			};
			//Banned Detection
			Postdata.BannedMember = false;
			if (fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[5].childNodes[1].childNodes[1].alt == "Dennab"){
				Postdata.BannedMember = true;
			};
			//Everyone else
			Postdata.BlueMember = false;
			if ( (Postdata.BannedMember == false) && (Postdata.GoldMember == false) && (Postdata.Moderator == false) ){
				Postdata.BlueMember = true;
			};
			
			//Default Avatar
			Postdata.DefaultAva = false;
			if (fetchposts.snapshotItem(i).childNodes[5].childNodes[1].childNodes[5].childNodes[1].childNodes[1].src == "http://static.facepunch.com/fp/avatar.png"){
				Postdata.DefaultAva = true;
			};
		
			//COunts
			var postContext = document.getElementById("post_message_"+Postdata.PostID).childNodes[1];
			Postdata.ImageCount		= document.evaluate("count(.//img[not(@class='inlineimg')])", postContext, null, XPathResult.ANY_TYPE, null).numberValue;
			Postdata.EmoteCount		= document.evaluate("count(.//img[@class='inlineimg'])", postContext, null, XPathResult.ANY_TYPE, null).numberValue;
			Postdata.QuoteCount		= document.evaluate("count(.//div[@class='quote'])", postContext, null, XPathResult.ANY_TYPE, null).numberValue;
			Postdata.MediaCount		= document.evaluate("count(.//div[@class='media media_youtube'])", postContext, null, XPathResult.ANY_TYPE, null).numberValue;		
			Postdata.LinkCount		= document.evaluate("count(.//a[@target='_blank'])", postContext, null, XPathResult.ANY_TYPE, null).numberValue;
			Postdata.LineCount		= document.evaluate("count(.//br)", postContext, null, XPathResult.ANY_TYPE, null).numberValue;
			//not really needed
			Postdata.PostHeight 	= parseInt(postContext.clientHeight);
			//Not always correct, oh well
			Postdata.BBCodeCount	= document.evaluate("count(.//b)", postContext, null, XPathResult.ANY_TYPE, null).numberValue +
									document.evaluate("count(.//i)", postContext, null, XPathResult.ANY_TYPE, null).numberValue +
									document.evaluate("count(.//u)", postContext, null, XPathResult.ANY_TYPE, null).numberValue +
									document.evaluate("count(.//span[@class='highlight'])", postContext, null, XPathResult.ANY_TYPE, null).numberValue;
		
			//Faggot detector
			Postdata.YourPost = false;
			if (fetchposts.snapshotItem(i).className.search(/yourpost/) != -1 ){ Postdata.YourPost = true; };
			//NewPost
			Postdata.NewPost = false;
			if (fetchposts.snapshotItem(i).className.search(/postbitnew/) != -1 ){ Postdata.NewPost = true; };
		
			//Can I reply?
			Postdata.CanReply = false;
			if ( fetchposts.snapshotItem(i).childNodes[7].childNodes[3].textContent.search(/Reply/) != -1){ Postdata.CanReply = true; };
		
			//Ratings
			Postdata.HasRatings = false;
			var RatingNode = document.getElementById("rating_"+Postdata.PostID);
			if (RatingNode.childElementCount > 0) {
				Postdata.HasRatings = true;
			
				for (var x=0; x<RatingNode.childNodes.length; x++){
					if (RatingNode.childNodes[x].tagName == "SPAN") {
						if (RatingNode.childNodes[x].childNodes[0].alt == "Agree") {
							Postdata.RatingAgree = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Funny") {
							Postdata.RatingFunny = RatingNode.childNodes[x].childNodes[2].textContent	
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Dumb") {
							Postdata.RatingDumb = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Disagree") {
							Postdata.RatingDisagree = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Informative") {
							Postdata.RatingInform = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Friendly") {
							Postdata.RatingFriendly = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Useful") {
							Postdata.RatingUseful = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Optimistic") {
							Postdata.RatingOptimistic = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Artistic") {
							Postdata.RatingArtistic = RatingNode.childNodes[x].childNodes[2].textContent	
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Late") {
							Postdata.RatingLate = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Bad Spelling") {
							Postdata.RatingBadSpell = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Bad Reading") {
							Postdata.RatingBadRead = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Zing") {
							Postdata.RatingZing = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "OIFY Pinknipple") {
							Postdata.RatingOIFY = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Programming King") {
							Postdata.RatingProgKing = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Lua King") {
							Postdata.RatingLuaKing = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Lua Helper") {
							Postdata.RatingLuaHelp = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Mapping King") {
							Postdata.RatingMapKing = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Smarked") {
							Postdata.RatingSmarked = RatingNode.childNodes[x].childNodes[2].textContent
						} else if (RatingNode.childNodes[x].childNodes[0].alt == "Winner") {
							Postdata.RatingWinner = RatingNode.childNodes[x].childNodes[2].textContent
						};
					};
				};
			};
		
			//Postmeta Functions
			Postdata.AddPostMeta = function (elementid, imgstr) {
				var newurl = document.createElement('a');
				newurl.style.marginRight = "5px";
				newurl.setAttribute("onclick", "FR_ToggleDropdown(\'"+elementid+"\', this.offsetTop + this.offsetHeight, this.offsetLeft  )");
				newurl.innerHTML = "<img src=\""+imgstr+"\">"
				document.getElementById(this.ElementID).childNodes[7].childNodes[5].appendChild(newurl);
			};
		
			PostTable.push(Postdata);
		};
	};
	return PostTable;
};

/*
	Post scoring
	
	not exactly complicated
	
	TODO:
		i dunno
*/
function BuildScoreTable(PostTable){
	//filterlists
	var naughtylist = FR_CFG.getArray('FO_blacklist');
	var nicelist = FR_CFG.getArray('FO_whitelist');
	//Our Container
	Scoredata = new Object();
	//user stuff
	
	var TotalScore = 0;
	Scoredata.UserPostCnt = FR_CFG.getInt("FL_UserPostCnt") * PostTable.UserPostCnt;
	TotalScore = TotalScore + Scoredata.UserPostCnt;
	Scoredata.MonthCount = FR_CFG.getInt("FL_MonthCount") * PostTable.MonthCount;
	TotalScore = TotalScore + Scoredata.MonthCount;
	
	//one time bonuses
	if (PostTable.Moderator == true){ Scoredata.Moderator = FR_CFG.getInt("FL_Moderator") } else { Scoredata.Moderator = 0 };
	TotalScore = TotalScore + Scoredata.Moderator;
	if (PostTable.GoldMember == true){ Scoredata.GoldMember = FR_CFG.getInt("FL_GoldMember") } else { Scoredata.GoldMember = 0 };
	TotalScore = TotalScore + Scoredata.GoldMember;
	if (PostTable.BannedMember == true){ Scoredata.BannedMember = FR_CFG.getInt("FL_BannedMember") } else { Scoredata.BannedMember = 0 };
	TotalScore = TotalScore + Scoredata.BannedMember;
	if (PostTable.DefaultAva == true){ Scoredata.DefaultAva = FR_CFG.getInt("FL_DefaultAva") } else { Scoredata.DefaultAva = 0 };
	TotalScore = TotalScore + Scoredata.DefaultAva;
	if (PostTable.YourPost == true){ Scoredata.YourPost = FR_CFG.getInt("FL_YourPost") } else { Scoredata.YourPost = 0 };
	TotalScore = TotalScore + Scoredata.YourPost;
	if (PostTable.NewPost == true){ Scoredata.NewPost = FR_CFG.getInt("FL_NewPost") } else { Scoredata.NewPost = 0 };
	TotalScore = TotalScore + Scoredata.NewPost;
	if (PostTable.HasRatings == true){ Scoredata.HasRatings = FR_CFG.getInt("FL_HasRatings") } else { Scoredata.HasRatings = 0 };
	TotalScore = TotalScore + Scoredata.HasRatings;
	if (PostTable.BlueMember == true){ Scoredata.BlueMember = FR_CFG.getInt("FL_BlueMember") } else { Scoredata.BlueMember = 0 };
	TotalScore = TotalScore + Scoredata.BlueMember;
	

	//lists
	if( naughtylist.has(PostTable.UserName) ){
		Scoredata.Blacklisted = FR_CFG.getInt("FL_Blacklisted");
		PostTable.Blacklisted = true;
	} else {
		Scoredata.Blacklisted = 0;
		PostTable.Blacklisted = false;
	};
	TotalScore = TotalScore + Scoredata.Blacklisted;
	if( nicelist.has(PostTable.UserName) ){
		Scoredata.Whitelisted = FR_CFG.getInt("FL_Whitelisted");
		PostTable.Whitelisted = true;
	} else {
		Scoredata.Whitelisted = 0;
		PostTable.Whitelisted = false;
	};
	TotalScore = TotalScore + Scoredata.Whitelisted;
		
	//Post stuff
	Scoredata.ImageCount = FR_CFG.getInt("FL_ImageCount") * PostTable.ImageCount;
	TotalScore = TotalScore + Scoredata.ImageCount;
	Scoredata.EmoteCount = FR_CFG.getInt("FL_EmoteCount") * PostTable.EmoteCount;
	TotalScore = TotalScore + Scoredata.EmoteCount;
	Scoredata.QuoteCount = FR_CFG.getInt("FL_QuoteCount") * PostTable.QuoteCount;
	TotalScore = TotalScore + Scoredata.QuoteCount;
	Scoredata.MediaCount = FR_CFG.getInt("FL_MediaCount") * PostTable.MediaCount;
	TotalScore = TotalScore + Scoredata.MediaCount;
	Scoredata.LinkCount = FR_CFG.getInt("FL_LinkCount") * PostTable.LinkCount;
	TotalScore = TotalScore + Scoredata.LinkCount;
	Scoredata.LineCount = FR_CFG.getInt("FL_LineCount") * PostTable.LineCount;
	TotalScore = TotalScore + Scoredata.LineCount;
	Scoredata.BBCodeCount = FR_CFG.getInt("FL_BBCodeCount") * PostTable.BBCodeCount;
	TotalScore = TotalScore + Scoredata.BBCodeCount;
	
	
	//ratings, multiplied by rating count
	if (PostTable.RatingAgree){
		Scoredata.RatingAgree = FR_CFG.getInt("FL_RatingAgree") * PostTable.RatingAgree; TotalScore = TotalScore + Scoredata.RatingAgree;
	} else { Scoredata.RatingAgree = 0 };
	if (PostTable.RatingFunny){
		Scoredata.RatingFunny = FR_CFG.getInt("FL_RatingFunny") * PostTable.RatingFunny; TotalScore = TotalScore + Scoredata.RatingFunny;
	} else { Scoredata.RatingFunny = 0 };
	if (PostTable.RatingDumb){
		Scoredata.RatingDumb = FR_CFG.getInt("FL_RatingDumb") * PostTable.RatingDumb; TotalScore = TotalScore + Scoredata.RatingDumb;
	} else { Scoredata.RatingDumb = 0 };
	if (PostTable.RatingDisagree){
		Scoredata.RatingDisagree = FR_CFG.getInt("FL_RatingDisagree") * PostTable.RatingDisagree; TotalScore = TotalScore + Scoredata.RatingDisagree;
	} else { Scoredata.RatingDisagree = 0 };
	if (PostTable.RatingInform){
		Scoredata.RatingInform = FR_CFG.getInt("FL_RatingInform") * PostTable.RatingInform; TotalScore = TotalScore + Scoredata.RatingInform;
	} else { Scoredata.RatingInform = 0 };
	if (PostTable.RatingFriendly){
		Scoredata.RatingFriendly = FR_CFG.getInt("FL_RatingFriendly") * PostTable.RatingFriendly; TotalScore = TotalScore + Scoredata.RatingFriendly;
	} else { Scoredata.RatingFriendly = 0 };
	if (PostTable.RatingUseful){
		Scoredata.RatingUseful = FR_CFG.getInt("FL_RatingUseful") * PostTable.RatingUseful; TotalScore = TotalScore + Scoredata.RatingUseful;
	} else { Scoredata.RatingUseful = 0 };
	if (PostTable.RatingOptimistic){
		Scoredata.RatingOptimistic = FR_CFG.getInt("FL_RatingOptimistic") * PostTable.RatingOptimistic; TotalScore = TotalScore + Scoredata.RatingOptimistic;
	} else { Scoredata.RatingOptimistic = 0 };
	if (PostTable.RatingArtistic){
		Scoredata.RatingArtistic = FR_CFG.getInt("FL_RatingArtistic") * PostTable.RatingArtistic; TotalScore = TotalScore + Scoredata.RatingArtistic;
	} else { Scoredata.RatingArtistic = 0 };
	if (PostTable.RatingLate){
		Scoredata.RatingLate = FR_CFG.getInt("FL_RatingLate") * PostTable.RatingLate; TotalScore = TotalScore + Scoredata.RatingLate;
	} else { Scoredata.RatingLate = 0 };
	if (PostTable.RatingBadSpell){
		Scoredata.RatingBadSpell = FR_CFG.getInt("FL_RatingBadSpell") * PostTable.RatingBadSpell; TotalScore = TotalScore + Scoredata.RatingBadSpell;
	} else { Scoredata.RatingBadSpell = 0 };
	if (PostTable.RatingBadRead){
		Scoredata.RatingBadRead = FR_CFG.getInt("FL_RatingBadRead") * PostTable.RatingBadRead; TotalScore = TotalScore + Scoredata.RatingBadRead;
	} else { Scoredata.RatingBadRead = 0 };
	if (PostTable.RatingZing){
		Scoredata.RatingZing = FR_CFG.getInt("FL_RatingZing") * PostTable.RatingZing; TotalScore = TotalScore + Scoredata.RatingZing;
	} else { Scoredata.RatingZing = 0 };
	if (PostTable.RatingOIFY){
		Scoredata.RatingOIFY = FR_CFG.getInt("FL_RatingOIFY") * PostTable.RatingOIFY; TotalScore = TotalScore + Scoredata.RatingOIFY;
	} else { Scoredata.RatingOIFY = 0 };
	if (PostTable.RatingProgKing){
		Scoredata.RatingProgKing = FR_CFG.getInt("FL_RatingProgKing") * PostTable.RatingProgKing; TotalScore = TotalScore + Scoredata.RatingProgKing;
	} else { Scoredata.RatingProgKing = 0 };
	if (PostTable.RatingLuaKing){
		Scoredata.RatingLuaKing = FR_CFG.getInt("FL_RatingLuaKing") * PostTable.RatingLuaKing; TotalScore = TotalScore + Scoredata.RatingLuaKing;
	} else { Scoredata.RatingLuaKing = 0 };
	if (PostTable.RatingLuaHelp){
		Scoredata.RatingLuaHelp = FR_CFG.getInt("FL_RatingLuaHelp") * PostTable.RatingLuaHelp; TotalScore = TotalScore + Scoredata.RatingLuaHelp;
	} else { Scoredata.RatingLuaHelp = 0 };
	if (PostTable.RatingMapKing){
		Scoredata.RatingMapKing = FR_CFG.getInt("FL_RatingMapKing") * PostTable.RatingMapKing; TotalScore = TotalScore + Scoredata.RatingMapKing;
	} else { Scoredata.RatingMapKing = 0 };
	if (PostTable.RatingSmarked){
		Scoredata.RatingSmarked = FR_CFG.getInt("FL_RatingSmarked") * PostTable.RatingSmarked; TotalScore = TotalScore + Scoredata.RatingSmarked;
	} else { Scoredata.RatingSmarked = 0 };
	if (PostTable.RatingWinner){
		Scoredata.RatingWinner = FR_CFG.getInt("FL_RatingRatingWinner") * PostTable.RatingWinner; TotalScore = TotalScore + Scoredata.RatingWinner;
	} else { Scoredata.RatingWinner = 0 };
	
	Scoredata.TotalScore = TotalScore;
	return Scoredata;
};

//this is lame, oh well
AddJS(cooljs);
AddCSS(morphcss)

//i'll do shit with this later
if (FP_Globals.Notice == false){
	//var refnode = document.evaluate("//div[@class='above_body boxshadow']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	
	//var newnotice = document.createElement('div');
	//newnotice.className = "notices";
	//newnotice.id = "notices";
	//newnotice.innerHTML = '<ol>' +
	//	'<li id="navbar_notice_6" class="restore">' +
	//	'<img style="float: right;" alt="Dismiss" src="http://static.facepunch.com/fp/cross.png">' +
	//	'Hello not_Morph53 - You\'ve been made a <b>Gold Member</b>. You automatically get gold membership if you have over 2000 posts and have been a member for longer than 2 years. ' +
	//	'<br><br>You are a grown up on these forums now. So please be nice to the non-golds and try to help them along the way. The forums are what YOU make them.' +
	//	'</li></ol>';
	
	//refnode.parentNode.insertBefore(newnotice, refnode.nextSibling);
}


if( FP_Globals.ForumDisplay	== true){
	var threadlist = document.evaluate("//tr[contains(@id,'thread_')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	//filterlists
	var naughtylist = FR_CFG.getArray('FO_blacklist');
	var nicelist = FR_CFG.getArray('FO_whitelist');
	var tnaughtylist = FR_CFG.getArray('FO_tblacklist');
	var tnicelist = FR_CFG.getArray('FO_twhitelist');
	
	var stalktbody = document.createElement('tbody');
	var ignoretbody = document.createElement('tbody');

	
	for (var g = 0; g < threadlist.snapshotLength; g++) {
		//no filtering in the refcamp, because that's stupid
		if(FP_Globals.REFCamp == true){
			if(FR_CFG.getBool('FO_RefCampBanInfo') == true){
				FR_RefCampCrap(threadlist.snapshotItem(g).id);
			};
		} else {
			var threadcreator = threadlist.snapshotItem(g).childNodes[5].childNodes[5].childNodes[5].childNodes[3].childNodes[1].textContent;
			var threadtitle = threadlist.snapshotItem(g).childNodes[5].childNodes[5].childNodes[3].childNodes[1].firstChild.textContent;
			var threadlock = false;
			var threadstick = false;
			if (threadlist.snapshotItem(g).className.search(/lock/) != -1){threadlock = true};
			if (threadlist.snapshotItem(g).className.search(/nonsticky/) == -1){threadstick = true};
			
			var amidone = false;
			
			if ( ( (FR_CFG.getBool('FO_StickyLock') == true) && (threadlock == true) ) || 
				( (FR_CFG.getBool('FO_StickyLock') == true) && (threadstick == true) ) ||
				( (threadstick == false) && (threadlock == false) ) ){


				if (threadcreator){
					if(FR_CFG.getBool('FO_TUserFilter') == true){
						if( naughtylist.has(threadcreator) ){
							threadlist.snapshotItem(g).className += " faggotry"
							amidone = true;
							
							if (FR_CFG.getBool('FO_ThreadNuke') == true) {
								ignoretbody.appendChild(threadlist.snapshotItem(g).cloneNode(true));
								threadlist.snapshotItem(g).style.display = "none";
							};
						};
					};
					
					if ( (FR_CFG.getBool('FO_TTitleFilter') == true) && amidone == false ){
						for (var x=0; x<tnaughtylist.length; x++){
							if (threadtitle.search( new RegExp(tnaughtylist[x], "i") ) != -1){
								threadlist.snapshotItem(g).className += " faggotry"
								amidone = true;
								
								if (FR_CFG.getBool('FO_ThreadNuke') == true) {
									ignoretbody.appendChild(threadlist.snapshotItem(g).cloneNode(true));
									threadlist.snapshotItem(g).style.display = "none";
								};
							};
						};
					};
					
					if ( (FR_CFG.getBool('FO_TUserStalk') == true) && amidone == false ){
						if( nicelist.has(threadcreator) ){
							threadlist.snapshotItem(g).className += " awsomeness"
							amidone = true;
							
							if (FR_CFG.getBool('FO_ThreadBump') == true) {
								stalktbody.appendChild(threadlist.snapshotItem(g).cloneNode(true));
								threadlist.snapshotItem(g).style.display = "none";
							};
						};
					};
					
					if ( (FR_CFG.getBool('FO_TTitleStalk') == true) && amidone == false ){
						for (var x=0; x<tnicelist.length; x++){
							if (threadtitle.search( new RegExp(tnicelist[x], "i") ) != -1){
								threadlist.snapshotItem(g).className += " awsomeness"
								amidone = true;
								
								if (FR_CFG.getBool('FO_ThreadBump') == true) {
									stalktbody.appendChild(threadlist.snapshotItem(g).cloneNode(true));
									threadlist.snapshotItem(g).style.display = "none";
								};
							};
						};
					};
				};
			};
		};
	};
	
	//Ignore Table
	if ( ((FR_CFG.getBool('FO_TUserFilter') == true) || (FR_CFG.getBool('FO_TTitleFilter') == true)) && ( (FR_CFG.getBool('FO_ThreadNuke') == true) && (ignoretbody.childElementCount > 0 )) ){
		var crapmenuitem1 = document.createElement('table')
		crapmenuitem1.id = "threads";
		crapmenuitem1.className = "threads";
		crapmenuitem1.cellSpacing = "0";
		crapmenuitem1.cellPadding = "6";
		crapmenuitem1.border = "0";
		crapmenuitem1.style.cssText = 'clear: both;display: table;width: 100%;';
		crapmenuitem1.innerHTML = '<thead class="threadlisthead"><tr><td class="threadicon">&nbsp;</td><td class="threadinfo"><a rel="nofollow" href="javascript:;">Nuked Threads ('+ignoretbody.childElementCount+')</a></td><td class="threadlastpost"><a rel="nofollow" href="javascript:;">Last Post By </a></td><td class="threadreplies"><a rel="nofollow" href="javascript:;">Replies</a></td><td class="threadviews"><a rel="nofollow" href="javascript:;">Views</a></td></tr></thead>';
		crapmenuitem1.appendChild(ignoretbody);
		document.getElementById( 'threads' ).parentNode.insertBefore(crapmenuitem1, document.getElementById( 'threads' ).nextSibling);
	};
	
	//Stalk Table
	if ( ((FR_CFG.getBool('FO_TUserStalk') == true) || (FR_CFG.getBool('FO_TTitleStalk') == true)) && ( (FR_CFG.getBool('FO_ThreadBump') == true) && (stalktbody.childElementCount > 0 )) ){
		var crapmenuitem1 = document.createElement('table')
		crapmenuitem1.id = "threads";
		crapmenuitem1.className = "threads";
		crapmenuitem1.cellSpacing = "0";
		crapmenuitem1.cellPadding = "6";
		crapmenuitem1.border = "0";
		crapmenuitem1.style.cssText = 'clear: both;display: table;width: 100%;';
		crapmenuitem1.innerHTML = '<thead class="threadlisthead"><tr><td class="threadicon">&nbsp;</td><td class="threadinfo"><a rel="nofollow" href="javascript:;">Stalked Threads ('+stalktbody.childElementCount+')</a></td><td class="threadlastpost"><a rel="nofollow" href="javascript:;">Last Post By </a></td><td class="threadreplies"><a rel="nofollow" href="javascript:;">Replies</a></td><td class="threadviews"><a rel="nofollow" href="javascript:;">Views</a></td></tr></thead>';
		crapmenuitem1.appendChild(stalktbody);
		document.getElementById( 'threads' ).parentNode.insertBefore(crapmenuitem1, document.getElementById( 'threads' ));
	};


};

/*
	EVENT LOG MODIFICATION
	
	TODO:
		OldEvents will just be an innerHTML += hack, should be quicker
		MOD lists will be iterate over an array, not this innerHTML clusterfuck
*/
if ( FP_Globals.EventLog == true ) {
	var eventlist = document.evaluate("//div[@class='event']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < eventlist.snapshotLength; i++) {
		if (FR_CFG.getBool('FO_RefCampLnk') == true){
			if ( eventlist.snapshotItem(i).childNodes[1].firstChild.href == "http://www.facepunch.com/fp_events.php?type=ban" ||
					eventlist.snapshotItem(i).childNodes[1].firstChild.href == "http://www.facepunch.com/fp_events.php?type=pban" ||
					eventlist.snapshotItem(i).childNodes[1].firstChild.href == "http://www.facepunch.com/fp_events.php?type=unban" ) {
				var targuid = parseInt( eventlist.snapshotItem(i).childNodes[1].childNodes[5].href.replace(/http\:\/\/www\.facepunch\.com\/members\//, "") );
				var a = document.createElement('a');
				a.href = "http://www.facepunch.com/search.php?do=finduser&userid="+targuid+"&contenttype=vBForum_Post&showposts=1&forumchoice[]=62"
				a.innerHTML = '<img width="16" height="16" border="0" alt="test" src="'+GetMyPng("silk_comment")+'" title="nforum">';
				eventlist.snapshotItem(i).childNodes[1].appendChild( a );
			};
		};
	};
	
	var mytargetnode = document.getElementById("event_types");
	
	//obsolete events
	if (FR_CFG.getBool('FO_OldEvents') == true){
		var a = document.createElement('a');
		a.href = "http://www.facepunch.com/fp_events.php?type=nforum"
		a.innerHTML = '<img width="16" height="16" border="0" alt="nforum" src="fp/events/nforum.png" title="nforum">';
		mytargetnode.appendChild( a );
		var a = document.createElement('a');
		a.href = "http://www.facepunch.com/fp_events.php?type=banr"
		a.innerHTML = '<img width="16" height="16" border="0" alt="banr" src="fp/events/banr.png" title="banr">';
		mytargetnode.appendChild( a );
		var a = document.createElement('a');
		a.href = "http://www.facepunch.com/fp_events.php?type=bani"
		a.innerHTML = '<img width="16" height="16" border="0" alt="bani" src="fp/events/bani.png" title="bani">';
		mytargetnode.appendChild( a );
		var a = document.createElement('a');
		a.href = "http://www.facepunch.com/fp_events.php?type=bunban"
		a.innerHTML = '<img width="16" height="16" border="0" alt="bunban" src="fp/events/bunban.png" title="bunban">';
		mytargetnode.appendChild( a );
		var a = document.createElement('a');
		a.href = "http://www.facepunch.com/fp_events.php?type=bansm"
		a.innerHTML = '<img width="16" height="16" border="0" alt="bansm" src="fp/events/bansm.png" title="bansm">';
		mytargetnode.appendChild( a );
	};
	
	if ( (FR_CFG.getBool('FO_CurrModList') == true ) || (FR_CFG.getBool('FO_OldModList') == true ) || (FR_CFG.getBool('FO_VOldModList') == true ) ){
		mytargetnode.style.cssText = "float:right;background-color: #FAFAFA;border: 1px solid #888888;padding:5px;";

		var fpmodlist = [
			["221011", "Asaratha", 0],["112031", "verynicelady", 0],["89131", "Daimao", 0],["1800", "Orkel", 0],["762", "Mr. Gestapo", 0],
			["85051", "Benji", 0],["3639", "PLing", 0],["2843", "TH89", 0],["11478", "PacificV2", 0],
			["11553", "GunFox", 0],["5133", "Jimbomcb", 0],["35178", "Gurant", 0],["97296", "Grea$eMonkey", 0],
			["63088", "JohnnyMo1", 0],["72507", "Swebonny", 0],["118251", "cosmic duck", 0],["50699", "Craptasket", 0],
			["242336", "Pascall", 0],["37601", "Rusty100", 0],["8678", "Dragon", 0],["54751", "daijitsu", 0],
			["86848", "Terrenteller", 0],["12", "RayvenQ", 0],["185867", "RawRKat!90", 0],["5945", "DEADBEEF", 0],
			["223542", "Perfumly", 0],["88487", "mahalis", 0],["11190", "SteveUK", 0],["25373", "birkett", 0],
			["63187", "Hexxeh", 0],["245715", "Lithifold", 0],["56665", "Jaanus", 0],["66253", "Greeman", 0],
			["103553", "rilez", 0],["60814", "UberMensch", 0],["2917", "Uberslug", 0],["89526", "compwhizii", 0],
			["1", "garry", 0],
			["59965", "SilverHammer", 1],["21688", "Love", 1],["50757", "mikfoz", 1],["77841", "teh_Shane", 1],
			["56575", "Kazumi", 1],["9784", "KmartSqrl", 1],["70374", "Roo-kie", 1],["15625", "chris0132", 1],
			["12066", "Pr3dator", 1],["172966", "Lithifold2", 1],["23438", "lazyV", 1],["94385", "!LORD-M!", 1],
			["8217", "Monkeyjoe", 1],["22807", "Doncommie", 1],["44933", "psp401.com", 1],["12042", "ventilated", 1],
			["90601", "Spork-Juct", 1],["101037", "mm3guy", 1],["9805", "DaveP", 1],["8190", "postal", 1],
			["3270", "andyvincent", 1],["1349", "ReaperSWE", 1],["7814", "ItchyBarracuda", 1],["79099", "wind8ws", 1],
			["5843", "kenthebear", 1],["632", "Megiddo", 1],["6325", "Amnizu", 1],["100256", "JLea", 1],
			["2818", "Fragmatic", 1],["12910", "Jinto", 1],["153890", "Nori", 1],["53097", "Sgt.Sgt", 1],
			["26237", "beatzdawg", 1],["36567", "Seiteki", 1],
			["9484", "frasierdog", 2],["9910", "Glitchman", 2],["22705", "doomkiwi", 2],["5586", "theJ89", 2],
			["4387", "leelad", 2],["9571", "Moocow", 2],["5532", "TheBlackViper", 2],["4201", "Captain Bald", 2],
			["2416", "Crocodile_Hunter", 2],["6100", "drive_the_hive", 2],["21357", "Alucard", 2],["49584", "jess", 2],
			["7", "Firerain", 2],["202", "Tokit", 2],["15103", "TIHan", 2],["20274", "mrchaos58", 2],
			["15551", "n42", 2],["401", "Cheeez", 2],["20640", "Jovan", 2],["54", "Zero Cool", 2],
			["35471", "Anders1", 2],["16502", "Dav0r", 2]
		];

		for (var i = 0; i < fpmodlist.length; i++) {
			var moduid = fpmodlist[i][0];
			var modname = fpmodlist[i][1];
			var modage = fpmodlist[i][2];
			if ( ((FR_CFG.getBool('FO_CurrModList') == true )&&( modage == 0)) || ((FR_CFG.getBool('FO_OldModList') == true ) && ( modage == 1)) || ((FR_CFG.getBool('FO_VOldModList') == true )&&( modage == 2)) ) {
				var cooldiv = document.createElement('div');
				
				if ( modage == 1){cooldiv.style.backgroundColor = "#BABABA";};
				if ( modage == 2){cooldiv.style.backgroundColor = "#9A9A9A";};
				
				cooldiv.innerHTML = '<div style=" width:110px; overflow:hidden; display:inline-block;"><a href="members/'+moduid+'" style="font-size: 14px; font-weight: bold;">'+modname+'</a></div>' +
				'<div style="display:inline;">'+
				'<a href="fp_events.php?user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' events" src="http://static.facepunch.com/fp/navbar/events.png" title="'+modname+' events"> </a>'+
				'<a href="fp_events.php?type=closed&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' closed" src="fp/events/closed.png" title="'+modname+' closed"> </a>'+
				'<a href="fp_events.php?type=opened&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' opened" src="fp/events/opened.png" title="'+modname+' opened"> </a>'+
				'<a href="fp_events.php?type=ban&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' ban" src="fp/events/ban.png" title="'+modname+' ban"> </a>'+
				'<a href="fp_events.php?type=unban&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' unban" src="fp/events/unban.png" title="'+modname+' unban"> </a>'+
				'<a href="fp_events.php?type=ddt&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' ddt" src="fp/events/ddt.png" title="'+modname+' ddt"> </a>'+
				'<a href="fp_events.php?type=rename&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' rename" src="fp/events/rename.png" title="'+modname+' rename"> </a>'+
				'<a href="fp_events.php?type=delhard&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' delhard" src="fp/events/delhard.png" title="'+modname+' delhard"> </a>'+
				'<a href="fp_events.php?type=delsoft&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' delsoft" src="fp/events/delsoft.png" title="'+modname+' delsoft"> </a>'+
				'<a href="fp_events.php?type=pban&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' pban" src="fp/events/pban.png" title="'+modname+' pban"> </a>'+
				'<a href="fp_events.php?type=capsfix&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' capsfix" src="fp/events/capsfix.png" title="'+modname+' capsfix" ></a>'+
				'<a href="fp_events.php?type=mov&user='+moduid+'"><img width="16" height="16" border="0" alt="'+modname+' mov" src="fp/events/mov.png" title="'+modname+' mov"> </a></div>';
				mytargetnode.appendChild( cooldiv );
			};
		};
	};
	
	//Goddamn xpath axis counting crap
	if ( FR_CFG.getBool('FO_Eventcntr') == true ) {
	
		var evtcnts = [];
	
		if (FP_Globals.EventLogMEM != 0) {
			evtcnts = [
				["Bans Given", "ban",  document.evaluate("count(.//a[contains(@href,'=ban')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Bans Recieved", "ban",  document.evaluate("count(.//a[contains(@href,'=ban')]/following-sibling::a[3][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Permabans Given", "pban", document.evaluate("count(.//a[contains(@href,'=pban')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Permabans Recieved", "pban", document.evaluate("count(.//a[contains(@href,'=pban')]/following-sibling::a[3][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Unbans Given", "unban", document.evaluate("count(.//a[contains(@href,'=unban')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Unbans Recieved", "unban", document.evaluate("count(.//a[contains(@href,'=unban')]/following-sibling::a[3][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Closed (by this user)", "closed", document.evaluate("count(.//a[contains(@href,'=closed')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Closed", "closed", document.evaluate("count(.//a[contains(@href,'=closed')]/following-sibling::a[3][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Opened (by this user)", "opened", document.evaluate("count(.//a[contains(@href,'=opened')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Opened", "opened", document.evaluate("count(.//a[contains(@href,'=opened')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue - document.evaluate("count(.//a[contains(@href,'=opened')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads ddt\'d (by this user)", "ddt", document.evaluate("count(.//a[contains(@href,'=ddt')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads ddt\'d", "ddt", document.evaluate("count(.//a[contains(@href,'=ddt')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue - document.evaluate("count(.//a[contains(@href,'=ddt')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Renamed (by this user)", "rename", document.evaluate("count(.//a[contains(@href,'=rename')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Renamed", "rename", document.evaluate("count(.//a[contains(@href,'=rename')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue - document.evaluate("count(.//a[contains(@href,'=rename')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Deleted (by this user)", "delsoft", document.evaluate("count(.//a[contains(@href,'=delsoft')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Deleted", "delsoft", document.evaluate("count(.//a[contains(@href,'=delsoft')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue - document.evaluate("count(.//a[contains(@href,'=delsoft')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads CapsFixed (by this user)", "capsfix", document.evaluate("count(.//a[contains(@href,'=capsfix')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads CapsFixed", "capsfix", document.evaluate("count(.//a[contains(@href,'=capsfix')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue - document.evaluate("count(.//a[contains(@href,'=capsfix')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Moved (by this user)", "mov", document.evaluate("count(.//a[contains(@href,'=mov')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Moved", "mov", document.evaluate("count(.//a[contains(@href,'=mov')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue - document.evaluate("count(.//a[contains(@href,'=mov')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["NewForum", "nforum",  document.evaluate("count(.//a[contains(@href,'=nforum')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Regiban", "banr",  document.evaluate("count(.//a[contains(@href,'=banr')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Instaban", "bani",  document.evaluate("count(.//a[contains(@href,'=bani')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Birthday Unban", "bunban",  document.evaluate("count(.//a[contains(@href,'=bunban')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Smartness Ban", "bansm",  document.evaluate("count(.//a[contains(@href,'=bansm')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Titles bought (for this user)", "title", document.evaluate("count(.//a[contains(@href,'=title')]/following-sibling::a[3][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Titles bought (for another user)", "title", document.evaluate("count(.//a[contains(@href,'=title')]/following-sibling::a[3][contains(@href,'members/') and not(contains(@href,'members/"+FP_Globals.EventLogMEM+"-'))])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Titles bought (for him/herself)", "title", document.evaluate("count(.//a[contains(@href,'=title')]/following-sibling::a[1][contains(@href,'members/"+FP_Globals.EventLogMEM+"-')] )", document, null, XPathResult.ANY_TYPE, null).numberValue - document.evaluate("count(.//a[contains(@href,'=title')]/following-sibling::a[3][contains(@href,'members/') and not(contains(@href,'members/"+FP_Globals.EventLogMEM+"-'))])", document, null, XPathResult.ANY_TYPE, null).numberValue]
			];
			
		} else {
			evtcnts = [
				["Bans Given", "ban",  document.evaluate("count(.//a[contains(@href,'=ban')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Permabans Given", "pban", document.evaluate("count(.//a[contains(@href,'=pban')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Unbans Given", "unban", document.evaluate("count(.//a[contains(@href,'=unban')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Closed", "closed", document.evaluate("count(.//a[contains(@href,'=closed')]/following-sibling::a[3][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Opened", "opened", document.evaluate("count(.//a[contains(@href,'=opened')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads ddt\'d", "ddt", document.evaluate("count(.//a[contains(@href,'=ddt')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Renamed", "rename", document.evaluate("count(.//a[contains(@href,'=rename')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Deleted", "delsoft", document.evaluate("count(.//a[contains(@href,'=delsoft')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads CapsFixed", "capsfix", document.evaluate("count(.//a[contains(@href,'=capsfix')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Threads Moved", "mov", document.evaluate("count(.//a[contains(@href,'=mov')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["NewForum", "nforum",  document.evaluate("count(.//a[contains(@href,'=nforum')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Regiban", "banr",  document.evaluate("count(.//a[contains(@href,'=banr')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Instaban", "bani",  document.evaluate("count(.//a[contains(@href,'=bani')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Birthday Unban", "bunban",  document.evaluate("count(.//a[contains(@href,'=bunban')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Smartness Ban", "bansm",  document.evaluate("count(.//a[contains(@href,'=bansm')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Join", "join",  document.evaluate("count(.//a[contains(@href,'=join')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Autolock", "toobig",  document.evaluate("count(.//a[contains(@href,'=toobig')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Titles bought (for others)", "title",  document.evaluate("count(.//a[contains(@href,'=title')]/following-sibling::a[3][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
				["Titles bought (for themselves)", "title",  document.evaluate("count(.//a[contains(@href,'=title')]/following-sibling::a[1][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue - document.evaluate("count(.//a[contains(@href,'=title')]/following-sibling::a[3][contains(@href,'members/')])", document, null, XPathResult.ANY_TYPE, null).numberValue],
			];
		};
	
		var cooldiv = document.createElement('div');
		cooldiv.className = "eventtime";
		cooldiv.innerHTML = 'Totals on this page: <ul> </ul>';
		
		for (var i = 0; i < evtcnts.length; i++) {
			if ( evtcnts[i][2] > 0){
				var cooldivb = document.createElement('div');
				cooldivb.className = "event";
				cooldivb.innerHTML = '<li><a href="fp_events.php?type='+evtcnts[i][1]+'&user='+FP_Globals.EventLogMEM+'"><img width="16" height="16" border="0" alt="'+evtcnts[i][1]+'" src="fp/events/'+evtcnts[i][1]+'.png" title="'+evtcnts[i][1]+'" style="padding-right: 4px;"></a>'+evtcnts[i][0]+' : '+evtcnts[i][2]+'</li>';
				cooldiv.childNodes[1].appendChild( cooldivb );
			};
		};
		
	
		document.evaluate("//div[@class='events']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).appendChild( cooldiv );
		
	};
		
};

/*
	MEMBERLIST MODIFICATION
	
	TODO:
		userid iteration, will be slow as fuck
			can't show usernames eiter because FP won't give me a redirect url in response to a HEAD request
			gaaaay
		will use MOD lists to green mod names
*/
if (FP_Globals.MemberList == true){
	var theerror = document.evaluate("//div[@class='standard_error']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (theerror){
		var mytargetnode = theerror.parentNode;
		mytargetnode.removeChild(theerror);
		
		var cooldiv = document.createElement('div');
		cooldiv.style.cssText = "border: 1px solid rgb(136, 136, 136); background-color: rgb(250, 250, 250);";
		cooldiv.innerHTML = '<div style="margin-left: 20px; padding-right: 20px;"><div class="events">'+
		'<div id="event_types">Enter three letters or more, then click DO IT<br />Be patient, it\'s slow as shit <br />Username:<input id="userfield" type="text" value="" tabindex="1" id="userfield_txt" name="searchuser" class="textbox popupctrl" autocomplete="off" >' +
		'<div class="button" style="display: inline-block; float: none; cursor:pointer;" onClick="FR_FindUser( document.getElementById(\'userfield\').value)">DO IT</div></div>' +
		'<div id="memberlist"> </div>' +
		'</div></div>';
		mytargetnode.insertBefore(cooldiv, mytargetnode.childNodes[4]);
		
	};
};


/*
	SHOW THREAD MODIFICATION
	
	TODO:
		AUTO filter score display will be a button that builds the menu dynamically, instead of this shitty and slow way
		Same with the info searcher thingie
*/




if (FP_Globals.ShowThread == true){
	var PostTable = BuildPostTable();
	for (var x=0; x<PostTable.length; x++) {
	
		if ( FR_CFG.getBool('FO_AwesomePanel') == true ){
			var myprick = document.getElementById(PostTable[x].ElementID);
			//panel creator
			var awesomepanel = document.createElement('div')
			awesomepanel.className = "posthead";
			myprick.childNodes[5].childNodes[1].appendChild(awesomepanel);
			awesomepanel.style.cssText = "border-width: 1px ! important; -moz-border-radius: 3px 3px 3px 3px; margin-top: 2px; display: -moz-grid-group; text-align: center;";
			//autohidepost
			var newurl = document.createElement('a');
			newurl.style.cursor = "pointer";
			newurl.setAttribute("onclick", "FR_TogglePoast(\'"+PostTable[x].ElementID+"\' )");
			newurl.innerHTML = "<img style='padding-left: 4px; float: left;' src=\""+GetMyPng("silk_eye")+"\" title='Hide this post'>"
			myprick.childNodes[3].insertBefore(newurl, myprick.childNodes[3].firstChild)
			//PM
			var newurl = document.createElement('a');
			newurl.href = "http://www.facepunch.com/private.php?do=newpm&u="+PostTable[x].UserID;
			newurl.innerHTML = "<img style='padding-right: 2px;' src=\""+GetMyPng("silk_book")+"\" title='Send PM to "+PostTable[x].UserName+"'>"
			awesomepanel.appendChild(newurl);
			//Buddylist
			var newurl = document.createElement('a');
			newurl.href = "http://www.facepunch.com/profile.php?do=addlist&userlist=friend&u="+PostTable[x].UserID;
			newurl.innerHTML = "<img style='padding-right: 2px;' src=\""+GetMyPng("silk_add")+"\" title='Add "+PostTable[x].UserName+" to buddylist'>"
			awesomepanel.appendChild(newurl);
			//Ignorelist
			var newurl = document.createElement('a');
			newurl.href = "http://www.facepunch.com/profile.php?do=addlist&userlist=ignore&u="+PostTable[x].UserID;
			newurl.innerHTML = "<img style='padding-right: 2px;' src=\""+GetMyPng("silk_delete")+"\" title='Ignore "+PostTable[x].UserName+"'>"
			awesomepanel.appendChild(newurl);
			
			//blacklist
			var newurl = document.createElement('a');
			newurl.href = 'javascript:FR_CFG.listManage(\"FO_blacklist\",\"'+PostTable[x].UserName+'\");'
			newurl.innerHTML = "<img style='padding-right: 2px;' src=\""+GetMyPng("silk_heart_broken")+"\" title='Blacklist "+PostTable[x].UserNameE+"'>"
			awesomepanel.appendChild(newurl);
			//whitelist
			var newurl = document.createElement('a');
			newurl.href = 'javascript:FR_CFG.listManage(\"FO_whitelist\",\"'+PostTable[x].UserName+'\");'
			newurl.innerHTML = "<img style='padding-right: 2px;' src=\""+GetMyPng("silk_cake")+"\" title='Whitelist "+PostTable[x].UserNameE+"'>"
			awesomepanel.appendChild(newurl);
			
			//Post/event history
			var newurl = document.createElement('a');
			newurl.style.cursor = "pointer";
			newurl.setAttribute("onclick", "FR_ShowUserHist(\'"+PostTable[x].UserID+"\',\'"+PostTable[x].UserName+"\', "+FP_Globals.SubforumID+", \'"+FP_Globals.SubforumName+"\', MouseY, MouseX  )");
			newurl.innerHTML = "<img style='padding-right: 2px;' src=\""+GetMyPng("silk_world")+"\" title='View history of "+PostTable[x].UserName+"'>"
			awesomepanel.appendChild(newurl);
		};
		
		//Image info crap
		if (FR_CFG.getBool('FO_ImageInfo') == true){
			var postContext = document.getElementById("post_message_"+PostTable[x].PostID).childNodes[1];
			//select all non thumbs/non emote
			//var fetchimages = document.evaluate(".//img[not(@class='inlineimg')][not(@class='thumb')]", postContext, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			
			//select all non emote
			var fetchimages = document.evaluate(".//img[not(@class='inlineimg')]", postContext, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			
			//select all non thumb/non emote/not a link
			//var fetchimages = document.evaluate(".//img[not(@class='inlineimg')][not(@class='thumb')]/ancestor::*[1][not(local-name()='a')]", postContext, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			
			for (var h = 0; h < fetchimages.snapshotLength; h++) {
				var imgsource = fetchimages.snapshotItem(h).src;
				fetchimages.snapshotItem(h).setAttribute("onclick", "FR_ShowImgInfo(\'"+imgsource+"\', MouseY, MouseX );return false;");
			};
		};
		
		//BEGIN DEBUG
		if (FR_CFG.getBool('FO_AutoFilter') == true){
			var postscore = BuildScoreTable(PostTable[x]);
			var myprick = document.getElementById(PostTable[x].ElementID);
			
			if (FR_CFG.getBool('FO_AFDebug') == true){
				PostTable[x].AddPostMeta("ucpex_"+PostTable[x].ElementID, GetMyPng("silk_bug"));
				var crapmenu = document.createElement('div');
				crapmenu.className = "top popupbox eventlog";
				crapmenu.style.display = 'none'
				crapmenu.style.width = "900px"
				crapmenu.style.zIndex = "3";
				crapmenu.id = "ucpex_"+PostTable[x].ElementID;
				crapmenu.innerHTML += "<div style='display: inline-block; float: none;' class='button'>ElementID: "+PostTable[x].ElementID+"</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none;' class='button'>PostID: "+PostTable[x].PostID+"</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none;' class='button'>UserName: "+PostTable[x].UserNameE+"</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none;' class='button'>UserID: "+PostTable[x].UserID+"</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.UserPostCnt)+"' class='button'>PostCount: "+PostTable[x].UserPostCnt+" ("+postscore.UserPostCnt+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none;' class='button'>JoinDate: "+PostTable[x].JoinDate+"</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none;' class='button'>JoinMonth: "+PostTable[x].JoinMonth+"</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none;' class='button'>JoinYear: "+PostTable[x].JoinYear+"</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.MonthCount)+"' class='button'>MonthCount: "+PostTable[x].MonthCount+" ("+postscore.MonthCount+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.BlueMember)+"' class='button'>Blue Member: "+PostTable[x].BlueMember+" ("+postscore.BlueMember+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.Moderator)+"' class='button'>Moderator: "+PostTable[x].Moderator+" ("+postscore.Moderator+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.GoldMember)+"' class='button'>GoldMember: "+PostTable[x].GoldMember+" ("+postscore.GoldMember+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.BannedMember)+"' class='button'>BannedMember: "+PostTable[x].BannedMember+" ("+postscore.BannedMember+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.DefaultAva)+"' class='button'>DefaultAvatar: "+PostTable[x].DefaultAva+" ("+postscore.DefaultAva+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.ImageCount)+"' class='button'>ImageCount: "+PostTable[x].ImageCount+" ("+postscore.ImageCount+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.EmoteCount)+"' class='button'>EmoteCount: "+PostTable[x].EmoteCount+" ("+postscore.EmoteCount+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.QuoteCount)+"' class='button'>QuoteCount: "+PostTable[x].QuoteCount+" ("+postscore.QuoteCount+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.MediaCount)+"' class='button'>MediaCount: "+PostTable[x].MediaCount+" ("+postscore.MediaCount+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.LinkCount)+"' class='button'>LinkCount: "+PostTable[x].LinkCount+" ("+postscore.LinkCount+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.LineCount)+"' class='button'>LineCount: "+PostTable[x].LineCount+" ("+postscore.LineCount+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none;' class='button'>PostHeight: "+PostTable[x].PostHeight+"</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.BBCodeCount)+"' class='button'>BBCodeCount: "+PostTable[x].BBCodeCount+" ("+postscore.BBCodeCount+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.YourPost)+"' class='button'>YourPost: "+PostTable[x].YourPost+" ("+postscore.YourPost+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.NewPost)+"' class='button'>NewPost: "+PostTable[x].NewPost+" ("+postscore.NewPost+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none;' class='button'>CanReply: "+PostTable[x].CanReply+"</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.HasRatings)+"' class='button'>PostRated: "+PostTable[x].HasRatings+" ("+postscore.HasRatings+")</div>";
				if ( PostTable[x].HasRatings == true) {
					if ( PostTable[x].RatingAgree)		{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingAgree)+"' class='button'>Rated Agree: "+PostTable[x].RatingAgree+" ("+postscore.RatingAgree+")</div>"; };
					if ( PostTable[x].RatingFunny)		{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingFunny)+"' class='button'>Rated Funny: "+PostTable[x].RatingFunny+" ("+postscore.RatingFunny+")</div>"; };
					if ( PostTable[x].RatingWinner)		{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingWinner)+"' class='button'>Rated Winner: "+PostTable[x].RatingWinner+" ("+postscore.RatingWinner+")</div>"; };
					if ( PostTable[x].RatingDumb)		{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingDumb)+"' class='button'>Rated Dumb: "+PostTable[x].RatingDumb+" ("+postscore.RatingDumb+")</div>"; };
					if ( PostTable[x].RatingDisagree)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingDisagree)+"' class='button'>Rated Disagree: "+PostTable[x].RatingDisagree+" ("+postscore.RatingDisagree+")</div>"; };
					if ( PostTable[x].RatingInform)		{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingInform)+"' class='button'>Rated Informative: "+PostTable[x].RatingInform+" ("+postscore.RatingInform+")</div>"; };
					if ( PostTable[x].RatingFriendly)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingFriendly)+"' class='button'>Rated Friendly: "+PostTable[x].RatingFriendly+" ("+postscore.RatingFriendly+")</div>"; };
					if ( PostTable[x].RatingUseful)		{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingUseful)+"' class='button'>Rated Useful: "+PostTable[x].RatingUseful+" ("+postscore.RatingUseful+")</div>"; };
					if ( PostTable[x].RatingOptimistic)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingOptimistic)+"' class='button'>Rated Optimistic: "+PostTable[x].RatingOptimistic+" ("+postscore.RatingOptimistic+")</div>"; };
					if ( PostTable[x].RatingArtistic)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingArtistic)+"' class='button'>Rated Artistic: "+PostTable[x].RatingArtistic+" ("+postscore.RatingArtistic+")</div>"; };
					if ( PostTable[x].RatingLate)		{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingLate)+"' class='button'>Rated Late: "+PostTable[x].RatingLate+" ("+postscore.RatingLate+")</div>"; };
					if ( PostTable[x].RatingBadSpell)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingBadSpell)+"' class='button'>Rated Bad Spelling: "+PostTable[x].RatingBadSpell+" ("+postscore.RatingBadSpell+")</div>"; };
					if ( PostTable[x].RatingBadRead)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingBadRead)+"' class='button'>Rated Bad Reading: "+PostTable[x].RatingBadRead+" ("+postscore.RatingBadRead+")</div>"; };
					if ( PostTable[x].RatingZing)		{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingZing)+"' class='button'>Rated Zing: "+PostTable[x].RatingZing+" ("+postscore.RatingZing+")</div>"; };
					if ( PostTable[x].RatingOIFY)		{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingOIFY)+"' class='button'>Rated Pinknipple: "+PostTable[x].RatingOIFY+" ("+postscore.RatingOIFY+")</div>"; };
					if ( PostTable[x].RatingProgKing)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingProgKing)+"' class='button'>Rated Programming King: "+PostTable[x].RatingProgKing+" ("+postscore.RatingProgKing+")</div>"; };
					if ( PostTable[x].RatingLuaKing)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingLuaKing)+"' class='button'>Rated Lua King: "+PostTable[x].RatingLuaKing+" ("+postscore.RatingLuaKing+")</div>"; };
					if ( PostTable[x].RatingLuaHelp)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingLuaHelp)+"' class='button'>Rated Lua Helper: "+PostTable[x].RatingLuaHelp+" ("+postscore.RatingLuaHelp+")</div>"; };
					if ( PostTable[x].RatingMapKing)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingMapKing)+"' class='button'>Rated Mapping king: "+PostTable[x].RatingMapKing+" ("+postscore.RatingMapKing+")</div>"; };
					if ( PostTable[x].RatingSmarked)	{ crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.RatingSmarked)+"' class='button'>Rated Smarked: "+PostTable[x].RatingSmarked+" ("+postscore.RatingSmarked+")</div>"; };
				};
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.Blacklisted)+"' class='button'>Blacklisted: "+PostTable[x].Blacklisted+" ("+postscore.Blacklisted+")</div>";
				crapmenu.innerHTML += "<div style='display: inline-block; float: none; "+calcpolarity(postscore.Whitelisted)+"' class='button'>Whitelisted: "+PostTable[x].Whitelisted+" ("+postscore.Whitelisted+")</div>";
				myprick.childNodes[7].childNodes[5].appendChild(crapmenu)
			};
			
			if ( FR_CFG.getBool('FO_Smrtness') == true ){
				var dascore = document.createElement('div');
				dascore.style.cssText = "margin-right: 16px;padding: 2px;border: 2px solid black;font-size: medium; float:right;" + calcpolarity(postscore.TotalScore);
				dascore.innerHTML = postscore.TotalScore;
				document.getElementById("post_message_"+PostTable[x].PostID).parentNode.parentNode.insertBefore(dascore, document.getElementById("post_message_"+PostTable[x].PostID).parentNode.parentNode.firstChild );
			};
			
			if ( postscore.TotalScore < 0){
				if ( FR_CFG.getBool('FO_SuperHidden') == true ){
					myprick.style.display = 'none';
				} else{
					FR_TogglePoast( PostTable[x].ElementID );
				};
				
				if ( FR_CFG.getBool('FO_ShowScore') == true ){
					var hideprnt = document.createElement('li')
					hideprnt.className = "postbitlegacy"
					var hidewarning = document.createElement('div')
					hidewarning.setAttribute("onclick", "FR_TogglePoast(\'"+PostTable[x].ElementID+"\' )");
					hidewarning.style.cssText = "cursor: pointer; text-align: center; padding: 4px;border: 3px solid black; font-size: small;" + calcpolarity(postscore.TotalScore);
					hidewarning.innerHTML = "Where "+ PostTable[x].UserNameE +"'s shit post used to be. Click to unhide and see how he scored " + postscore.TotalScore;
					
					hideprnt.appendChild(hidewarning)
					myprick.parentNode.insertBefore(hideprnt, myprick);
				};

			};
			
		};
		//END DEBUG
	};
	
	if (FR_CFG.getBool('FO_AutoClose') == true){
		var bloop = document.getElementById("quick_reply");
		if (bloop){
			bloop.setAttribute("onsubmit", "FR_autoClose(); return qr_prepare_submit(this, 1);");
		};
	};
};

function BuildMenus(){
	var mytargetnode = document.getElementById("navbarlinks");
	
	//Navbar buttons
	var cooldiv = document.createElement('div');
	cooldiv.className = "navbarlink";
	cooldiv.setAttribute("onclick", "FR_ShowCFG(\'FR_options\', MouseY + this.offsetHeight, this.offsetLeft  )");
	cooldiv.innerHTML = '<a href="javascript:;"><img alt="Options" src="'+GetMyPng("silk_app_xp")+'" title="Options"> Options</a>';
	mytargetnode.insertBefore(cooldiv, mytargetnode.lastChild.previousSibling.previousSibling);
	
	
	if ( (FR_CFG.getBool('FO_AutoFilter') == true) ||
		(FR_CFG.getBool('FO_TUserFilter') == true) ||
		(FR_CFG.getBool('FO_TTitleFilter') == true) ||
		(FR_CFG.getBool('FO_TUserStalk') == true) ||
		(FR_CFG.getBool('FO_TTitleStalk') == true) ){
	
		var cooldiv = document.createElement('div');
		cooldiv.className = "navbarlink";
		cooldiv.setAttribute("onclick", "FR_ShowCFG(\'FR_filters\', MouseY + this.offsetHeight, this.offsetLeft  )");
		cooldiv.innerHTML = '<a href="javascript:;"><img alt="Filters" src="'+GetMyPng("silk_bomb")+'" title="Filters"> Filters</a>';
		mytargetnode.insertBefore(cooldiv, mytargetnode.lastChild.previousSibling.previousSibling);
		
		var cooldiv = document.createElement('div');
		cooldiv.className = "navbarlink";
		cooldiv.setAttribute("onclick", "FR_ShowCFG(\'FR_lists\', MouseY + this.offsetHeight, this.offsetLeft  )");
		cooldiv.innerHTML = '<a href="javascript:;"><img alt="Lists" src="'+GetMyPng("silk_chart_pie")+'" title="Lists"> Lists</a>';
		mytargetnode.insertBefore(cooldiv, mytargetnode.lastChild.previousSibling.previousSibling);
	};
	
	var cooldiv = document.createElement('div');
	cooldiv.className = "navbarlink";
	cooldiv.setAttribute("onclick", "FR_ToggleDropdown(\'FR_extra\', MouseY + this.offsetHeight, this.offsetLeft  )");
	cooldiv.innerHTML = '<a href="javascript:;"><img alt="Extra" src="http://static.facepunch.com/fp/navbar/more.png" title="Extra"> Extra</a>';
	mytargetnode.insertBefore(cooldiv, mytargetnode.lastChild);
	
	//Extra
	var cooldiv = document.createElement('div');
	cooldiv.className = "top popupbox urlbox";
	cooldiv.style.display = 'none'
	cooldiv.style.width = "250px"
	cooldiv.style.zIndex = "3";
	cooldiv.id = "FR_extra";
	cooldiv.innerHTML = '<div style="float: right;"><a onclick="return CloseThis(this);" href="#"><img src="/fp/close.png"></a></div><div style="color: rgb(68, 68, 68); margin: 16px;"><h2>Extra</h2>'+
	'<a href="http://www.facepunch.com/memberlist.php"><img style="position: relative; top: 4px; margin-right: 8px;" src="'+GetMyPng('silk_book_open')+'"> Memberlist</a> - Find a member<br>' +
	'</div>';
	document.getElementById("content_pad").appendChild(cooldiv);
	
	
	//EMotes
	//EMote panels and etc
	var bloop = false;
	var txtid = "";
	
	if (FP_Globals.ShowThread == true){
		bloop = document.getElementById("qr_submit");
		txtid = "vB_Editor_QR_textarea";
	} else if (FP_Globals.NewReply == true){
		bloop = document.getElementById("vB_Editor_001_textarea");
		txtid = "vB_Editor_001_textarea";
	} else if (FP_Globals.NewThread == true){
		bloop = document.getElementById("vB_Editor_001_textarea");
		txtid = "vB_Editor_001_textarea";
	} else if (FP_Globals.Private == true){
		bloop = document.getElementById("vB_Editor_001_textarea");
		txtid = "vB_Editor_001_textarea";
		if (!bloop){
			bloop = document.getElementById("vB_Editor_QR_textarea");
			txtid = "vB_Editor_QR_textarea";
		};
	};
	
	if (bloop){
		
		//bbcode
		if (FR_CFG.getBool('FO_BBCodeList') == true){
			//Button
			var newurl = document.createElement('a');
			newurl.style.marginRight = "5px";
			newurl.setAttribute("onclick", "FR_ShowEmotes(\'FR_emote_bbcode\', \'"+txtid+"\', MouseY + this.offsetHeight, this.offsetLeft  )");
			newurl.innerHTML = "<img src=\""+GetMyPng("silk_comment")+"\" alt='Text Processor' title='Text processor'>"
			bloop.parentNode.parentNode.parentNode.insertBefore(newurl, bloop.parentNode.parentNode.parentNode.firstChild);
		};
		//SmileyList
		if (FR_CFG.getBool('FO_SmileyList') == true){
			//Button
			var newurl = document.createElement('a');
			newurl.style.marginRight = "5px";
			newurl.setAttribute("onclick", "FR_ShowEmotes(\'FR_emote_smiley\', \'"+txtid+"\', MouseY + this.offsetHeight, this.offsetLeft  )");
			newurl.innerHTML = "<img src=\""+GetMyPng("silk_emoticon_smile")+"\" alt='Smiley List' title='Generic Emotes'>"
			bloop.parentNode.parentNode.parentNode.insertBefore(newurl, bloop.parentNode.parentNode.parentNode.firstChild);
		};
		if (FR_CFG.getBool('FO_RetortList') == true){
			//Button
			var newurl = document.createElement('a');
			newurl.style.marginRight = "5px";
			newurl.setAttribute("onclick", "FR_ShowEmotes(\'FR_emote_whitty\', \'"+txtid+"\', MouseY + this.offsetHeight, this.offsetLeft  )");
			newurl.innerHTML = "<img src=\""+GetMyPng("silk_lightning")+"\" alt='Smiley List' title='Whitty retorts'>"
			bloop.parentNode.parentNode.parentNode.insertBefore(newurl, bloop.parentNode.parentNode.parentNode.firstChild);
		};
		if (FR_CFG.getBool('FO_OddList') == true){
			//Button
			var newurl = document.createElement('a');
			newurl.style.marginRight = "5px";
			newurl.setAttribute("onclick", "FR_ShowEmotes(\'FR_emote_oddball\', \'"+txtid+"\', MouseY + this.offsetHeight, this.offsetLeft  )");
			newurl.innerHTML = "<img src=\""+GetMyPng("silk_sport_8ball")+"\" alt='Smiley List' title='Odd shit'>"
			bloop.parentNode.parentNode.parentNode.insertBefore(newurl, bloop.parentNode.parentNode.parentNode.firstChild);
		};
		if (FR_CFG.getBool('FO_UnsortedList') == true){
			//Button
			var newurl = document.createElement('a');
			newurl.style.marginRight = "5px";
			newurl.setAttribute("onclick", "FR_ShowEmotes(\'FR_emote_unsorted\', \'"+txtid+"\', MouseY + this.offsetHeight, this.offsetLeft  )");
			newurl.innerHTML = "<img src=\""+GetMyPng("silk_help")+"\" alt='Smiley List' title='Unsorted emotes'>"
			bloop.parentNode.parentNode.parentNode.insertBefore(newurl, bloop.parentNode.parentNode.parentNode.firstChild);
		};
		if (FR_CFG.getBool('FO_FlagsList') == true){
			//Button
			var newurl = document.createElement('a');
			newurl.style.marginRight = "5px";
			newurl.setAttribute("onclick", "FR_ShowEmotes(\'FR_emote_flags\', \'"+txtid+"\', MouseY + this.offsetHeight, this.offsetLeft  )");
			newurl.innerHTML = "<img src=\""+GetMyPng("silk_flag_blue")+"\" alt='Smiley List' title='Nationalistic shit'>"
			bloop.parentNode.parentNode.parentNode.insertBefore(newurl, bloop.parentNode.parentNode.parentNode.firstChild);
		};
		if (FR_CFG.getBool('FO_MediaList') == true){
			//Button
			var newurl = document.createElement('a');
			newurl.style.marginRight = "5px";
			newurl.setAttribute("onclick", "FR_ShowEmotes(\'FR_emote_media\', \'"+txtid+"\', MouseY + this.offsetHeight, this.offsetLeft  )");
			newurl.innerHTML = "<img src=\""+GetMyPng("silk_rosette")+"\" alt='Smiley List' title='Media, Games, etc'>"
			bloop.parentNode.parentNode.parentNode.insertBefore(newurl, bloop.parentNode.parentNode.parentNode.firstChild);
		};
		if (FR_CFG.getBool('FO_DrugsList') == true){
			//Button
			var newurl = document.createElement('a');
			newurl.style.marginRight = "5px";
			newurl.setAttribute("onclick", "FR_ShowEmotes(\'FR_emote_deviancy\', \'"+txtid+"\', MouseY + this.offsetHeight, this.offsetLeft  )");
			newurl.innerHTML = "<img src=\""+GetMyPng("silk_pill")+"\" alt='Smiley List' title='Drugs, Dongs, etc'>"
			bloop.parentNode.parentNode.parentNode.insertBefore(newurl, bloop.parentNode.parentNode.parentNode.firstChild);
		};
		if (FR_CFG.getBool('FO_TextList') == true){
			//Button
			var newurl = document.createElement('a');
			newurl.style.marginRight = "5px";
			newurl.setAttribute("onclick", "FR_ShowEmotes(\'FR_emote_text\', \'"+txtid+"\', MouseY + this.offsetHeight, this.offsetLeft  )");
			newurl.innerHTML = "<img src=\""+GetMyPng("silk_font")+"\" alt='Smiley List' title='Text Emotes'>"
			bloop.parentNode.parentNode.parentNode.insertBefore(newurl, bloop.parentNode.parentNode.parentNode.firstChild);
		};
	
		
	};

};
BuildMenus();