// ==UserScript==
// @name           Wall Manager Sidekick (CafeWorld)
// @description    Assists Wall Manager with CafeWorld posts
// @include        /^http(s)?:\/\/((apps\.facebook\.com\/cafeworld)|(.*\.cafe\.zynga\.com))\//
// @include        http*://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.21a
// @require        http://userscripts.org/scripts/source/123889.user.js
// @copyright      Charlie Ewing & Joe Simmons & Jean Lansford
// ==/UserScript== 

(function() { 

	//this.log=(debug)?debug.print:( (isGM)?GM_log:( (window.opera) ? opera.postError : console.log ) );

	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^http(s)?:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return;

	var version = "0.0.21a";
        var appID="101539264719";
        var scriptID="101606";
        var appName="Cafe World";

	addGlobalStyle(
		".failButton {border:2px solid red;background-color:darkred;color:white;font-weight:bold;border-radius:5px; padding:10px; display:inline-block;}\n"+
		".acceptButton {border:2px solid lime;background-color:green;color:white;font-weight:bold;border-radius:5px; padding:10px; display:inline-block;}\n",
		".failButton:hover {font-size:160%;}\n"+
		".acceptButton:hover {font-size:160%;}\n"
	,"sidekick");

	function getFormData(form){
		//where form is the form element
		var action = form.getAttribute('action') & "/";
		var nodes = selectNodes(".//input[contains(@name)]",form);
		if(nodes.snapshotLength) for(i=0;i<nodes.snapshotLength;i++){
			if(i>0) action+="&";
			action+=nodes.snapshotItem(i).getAttribute('name')+"="+nodes.snapshotItem(i).getAttribute('value');
		}
		return action;
	};

	function forceFail(){
		sendMessage("status=-20");
	};

	function forceAccept(){
		sendMessage("status=20");
	};

	var materials = [
	];

	//mark all these as new while building the menus
	var newItems=[
	];

	function dock(){
	    try{
		var tests=[
			{url:["neighbors.php","track.php","food_showdown_poll"],ret:"exclude"},

			{url:["k=mystery_spice","get_spice.php"],ret:"sendmagicspice"}, 

			{url:"FriendSpice",ret:"spices"},

			{url:["CoffeeFirstBrew","MachineMastery"],ret:"energy"},

			{url:[
				"CateringMissionReminder","CateringHelpFriend","QuestCompleteFeed","Collections","accept_achievement_bonus.php",
				"CheckInSystemFeed","BuildAnX","PastryStationFeed","OutsideMission","AssemblyThanks","BBQGrillFeed",
			],ret:"reward"},

			{url:"MasteryBonus",ret:"masteryboost"},

			{url:"SpecialDelivery",ret:"sendspecialdelivery"},

			{url:"CateringJoinCrew",ret:"sendhelp"},

			{url:["QuestAskForHelp","askforhelp","cafeinparis","FeedRequestDriver"],ret:"sendquest"},

			{url:"scratch_lotto.php",ret:"lotto"},

			{url:["DailyBonus","FriendMission","p=spoil_saved","accept_chef_special.php","accept_taste_testing.php"],ret:"food"},
		];
		accTexts={};

		accTextCustoms= {
			sendspecialdelivery: "Special Delivery",sendmagicspice:"Magic Spice",
			reward:"Reward",food:"Dish",spices:"Spices",sendquest:"Quest Item",
			lotto:"Lotto Reward",energy:"Energy",sendhelp:"Help",masteryboost:"Mastery Boost",
		};

		menu= {
			section_main:{type:"section",label:appName+" ("+version+")",kids:{
				updateSidekick:{type:"link",label:"Update Sidekick",href:"http://userscripts.org/scripts/source/"+scriptID+".user.js"},
				sep:{type:"separator",label:"Basics",kids:{
					energy:{type:"checkbox",label:"Get Energy"},
					reward:{type:"checkbox",label:"Get Rewards"},
					masteryboost:{type:"checkbox",label:"Get Mastery Boost"},
					food:{type:"checkbox",label:"Get Dishes"},
					spices:{type:"checkbox",label:"Get Spices"},
					lotto:{type:"checkbox",label:"Play Lotto Scratch-offs"},
				}},
				helpseparator:{type:"separator",label:"Help Friends",kids:{
					sendhelp:{type:"checkbox",label:"Join Catoring Crews"},
					sendmagicspice:{type:"checkbox",label:"Send Magic Spice"},
					sendspecialdelivery:{type:"checkbox",label:"Send Special Delivery"},
					sendquest:{type:"checkbox",label:"Send Quest Items"},
				}},
			}},
		};

		Sidekick.dock({
			appID:appID,
			name:appName, 
			thumbsSource:null,
			version:version,
			flags:{httpsTrouble:true,requiresTwo:true},
			alterLink:{},
			icon:"http://fbcdn-photos-a.akamaihd.net/photos-ak-snc1/v85006/39/101539264719/app_1_101539264719_2507.gif",
			desc:null,
			accText: mergeJSON(accTexts,accTextCustoms), 
			tests:tests,
			menu:menu,
		});

	    }catch(e){}
	};

	function read(){
        	try{
			var href = window.location.href;
			var doc = document.documentElement;
			var text = doc.textContent;
			var html = doc.innerHTML;

			//determine what page we are on
			var page = href.split("?")[0];
			var pageType = (href.find('page_type='))?(href.split("?")[1].split("page_type=")[1].split("&")[0]):"";
			var accept;

			var statusCode=0;
		} catch (e) {window.setTimeout(read,1000);return;}


		//check page for various texts

		if (text.find("Looks like all the prizes have been claimed!"))statusCode=-2;//all out
		else if (text.find("You can only get") && text.find("Perfect Servings once today!")) statusCode=-6; //already claimed food
		else if (text.find("You can only eat at your friends' cafes!")) statusCode=-5;  //trying own bonus, or server error
		else if (text.find('You have already claimed this reward, possibly through the Zynga Message Center!')) statusCode=-6; //already claimed
		else if (text.find('You are either too late or you clicked here previously')) statusCode=-2; //all out
		else if (text.find('Sorry, this taste testing has ended.')) statusCode=-2;
		else if (text.find("There's an error in the kitchen!")) statusCode=-5; //server error
		else if (text.find("We're sorry but it seems that something went wrong in the kitchen!")) statusCode=-5; //server error
		else if (text.find('You have already helped today!')) statusCode=-6; //already helped
		else if (text.find('Looks like all the scratch lotto tickets are gone')) statusCode=-2; //all out
		else if (text.find('You are too late to help!')) statusCode=-11; //expired, all out
		else if (text.find('You can only taste test once per event!')) statusCode=-6; //already tasted
		else if (text.find('You already received this bonus')) statusCode=-6; //already got
		else if (text.find("You can't receive a bonus from yourself")) statusCode=-5; //trying self
		else if (text.find("is all out of Perfect Servings for today")) statusCode=-2; //all out
		else if (text.find("It looks like they've already received all the help they could handle")) statusCode=-2; //all out
		else if (text.find("Looks like all the scratch lotto tickets are gone")) statusCode=-2;
		else if (text.find("have been claimed")) statusCode=-2;
		else if (text=="") statusCode=-5; //no document body
		
		if (statusCode!=0) {sendMessage("status="+statusCode+"&link=[null]");return;}
		else if (page) {
			//basic reward types
			if (page.find( "reward_landing_page.php" )){
				switch (pageType){
					case "SpecialDelivery": 
					case "Collections": 
					case "CheckInSystemFeed":
					case "BuildAnX":
						sendMessage("status=1&link=[null]");return;
						break;
					case "FriendSpice":
						if(text.find("Pick the spice crate you want to open!")){
							accept=selectSingleNode(".//div[contains(@class,'scratch-area')]");
							if(accept) {sendMessage("status=1&link=["+accept.parentNode.href+"]");return;}
						} else {
							accept=selectSingleNode(".//a[contains(@class,'ok reward-button')]");
							if(accept) {sendMessage("status=1&link=["+accept.href+"]");return;}
						}
						break;
					case "CateringJoinCrew":
						accept=selectSingleNode(".//a[contains(@class,'button') and contains(@href,'action=2')]");
						if(accept) {sendMessage("status=1&link=["+accept.href+"]");return;}
						break;
					case "DailyBonus":
						if(text.find("CLICK A GIFT TO UNWRAP IT!")){
							accept=selectSingleNode(".//a[contains(@class,'scratch-area area-2')]");
							if(accept) {sendMessage("status=1&link=["+accept.href+"]");return;}
						} else {
							accept=selectSingleNode(".//a[contains(@class,'ok reward-button')]");
							if(accept) {sendMessage("status=1&link=["+accept.href+"]");return;}
						}
						break;

					//default is the standard button and reward combo
					default:
						accept=selectSingleNode(".//a[contains(@class,'ok reward-button')]");
						if(accept) {sendMessage("status=1&link=["+accept.href+"]");return;}
						break;				
				}
			}

			//perfect dishes
			else if (page.find("accept_chef_special.php")){
				accept=selectSingleNode(".//img[contains(@src,'ecaf0c319ebccfae16af78e9a7248b7c.gif')]");
				if(accept) {sendMessage("status=1&link=["+accept.parentNode.href+"]");return;}
			}

			//taste test
			else if (page.find("accept_taste_testing.php")){
				accept=selectSingleNode(".//img[contains(@src,'ecaf0c319ebccfae16af78e9a7248b7c.gif')]");
				if(accept) {sendMessage("status=1&link=["+accept.parentNode.href+"]");return;}
			}

			//send spice, help open to get one
			else if (page.find("get_spice.php")){
				accept=selectSingleNode(".//img[contains(@src,'0a4c9ef0f65b5153687f55e0c6063174.gif')]");
				if(accept) {sendMessage("status=1&link=["+accept.parentNode.href+"]");return;}
			}
			
			//achievement bonus
			else if (page.find("accept_achievement_bonus.php")){
				accept=selectSingleNode(".//img[contains(@src,'ecaf0c319ebccfae16af78e9a7248b7c.gif')]");
				if(accept) {sendMessage("status=1&link=["+accept.parentNode.href+"]");return;}
			}

			//scratch lotto
			else if (page.find("scratch_lotto.php")){
				accept=$('lottoScratchButton1');
				if(accept) {
					window.setTimeout(function(){click(accept);},500);
					window.setTimeout(function(){sendMessage("status=1&link=[null]");},1000);
					return;
				}
			}

			else window.setTimeout(read,1000); //restart if nothing was found of value
			
			if (!$("wmSidekick_Tools")) document.body.insertBefore(
				createElement("div",{id:"wmSidekick_Tools",style:"position:absolute; right:0; top:0;"},[
					createElement("div",{textContent:"Sidekick Fail",onclick:forceFail,className:"failButton"}),
					createElement("div",{textContent:"Sidekick Accept",onclick:forceAccept,className:"acceptButton"})
				])
			, document.body.firstChild);

		}
	}

	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.host=='www.facebook.com') dock(); else read();


})(); // anonymous function wrapper end