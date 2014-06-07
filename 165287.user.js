// ==UserScript==
// @name        Wall Manager Sidekick (ChefVille)
// @description Assists Wall Manager with 'ChefVille' posts
// @include     https://apps.facebook.com/chefville/feed.php*
// @include	 http://apps.facebook.com/chefville/feed.php*
// @include	 http://fb.cooking.zynga.com/feed.php?*
// @include	 https://fb.cooking.zynga.com/feed.php?*
// @include     http*://www.facebook.com/pages/FB-Wall-Manager/*
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require 	 http://userscripts.org/scripts/source/123889.user.js
// @version     1.0.14.1
// @copyright   Charlie Ewing(main code & patch) & some addict (tutorial) & WeirDave (edited)
// ==/UserScript== 
(function() {
//prevent reading data from top page because it does not contain useful information and can trick the sidekick
//see other comments below
	if ((window.top==window.self) && !window.location.href.match( /(^http(s)?:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ ) ){
		Sidekick.listen();
		window.addEventListener("onBeforeUnload", Sidekick.unlisten, false);
		//comment this return line out if you:
		// A) do not get your accept/fail messages from an iframe, or 
		// B) the game ticker does not affect you or draw to your collection pages.
		return; 
	}

//predefine some variables so we can just call them when needed instead of typing the same stuff over and over again
	var version = "1.0.14.1";
    var appID="180751008671144";
    var scriptID="142168";
    var appName="ChefVille";
	var appIcon="http://photos-g.ak.fbcdn.net/photos-ak-snc7/v85005/44/180751008671144/app_2_180751008671144_1842084647.gif";
	var supportWM2=true; //comment out if you do not want to use address bar attachments

//attempt to dock with the WM host script
	function dock(){

	var materials = [


		// Basic needs for gameplay
		//if you use an id field, it means you are looking for 
		//something other than the name field
		//for instance if you want to look for an ingame item
		//wood, but out on the feed its called "get 5 logs"
		//then the name would be wood, but the id would be log or logs
		
		{name:"Coins", event:"Basics"},
		{name:"Energy", event:"Basics"},
		{name:"XP", event:"Basics"},		


		// Specific Items

		{name:"Appetite Enhancer", event:"Items"},
		{name:"Bag of Seeds", event:"Items"},
		{name:"Barrel Rings", event:"Items"},
		{name:"Bean Bunch", event:"Items"},
		{name:"Beef Bravado", event:"Items"},
		{name:"Bouillon Banter", event:"Items"},
		{name:"Bountiful Baskets", event:"Items"},
		{name:"Bovine Bowl", event:"Items"},
		{name:"Bowl Banter", event:"Items"},
		{name:"Bread Ties", event:"Items"},
		{name:"Breakfast Banter", event:"Items"},
		{name:"Broiler Critique", event:"Items"},
		{name:"Broiler Hint", event:"Items"},
		{name:"Bubbling Bonanaza", event:"Items"},
		{name:"Bun Banter", event:"Items"},
		{name:"Campaign Pin", event:"Items"},
		{name:"Candy Jars", event:"Items"},
		{name:"Cauldron Treats", event:"Items"},
		{name:"Cheese Mold", event:"Items"},
		{name:"Cheese Tray", event:"Items"},
		{name:"Chick Feed", event:"Items"},
		{name:"Clucky Clingwrap", event:"Items"},
		{name:"Cobwebs", event:"Items"},
		{name:"Cobb Concept", event:"Items"},
		{name:"Colorful Tarp", event:"Items"},
		{name:"Condiment Comment", event:"Items"},
		{name:"Cran Crusher", event:"Items"},
		{name:"Crank", event:"Items"},
		{name:"Dainty Doily", event:"Items"},
		{name:"Dairy Memories", event:"Items"},
		{name:"Dipping Etiquette", event:"Items"},
		{name:"Dispenser Stand", event:"Items"},
		{name:"Dog Discovery", event:"Items"},
		{name:"Dough Discernment", event:"Items"},
		{name:"Egg Beater", event:"Items"},
		{name:"Egg Carton", event:"Items"},
		{name:"Fall Favors", event:"Items"},
		{name:"Fall Leaves", event:"Items"},
		{name:"Fiery Philosophy", event:"Items"},
		{name:"Fish Fancy", event:"Items"},
		{name:"Flipping Advice", event:"Items"},
		{name:"Floral Fanfare", event:"Items"},
		{name:"Foil Finesse", event:"Items"},
		{name:"Fork Fact", event:"Items"},
		{name:"Freezing Fundamental", event:"Items"},
		{name:"Frilly Toothpick", event:"Items"},
		{name:"Frosty Fable", event:"Items"},
		{name:"Grateful Gobbles", event:"Items"},
		{name:"Gravy Gratitude", event:"Items"},
		{name:"Green Gears", event:"Items"},
		{name:"Greasing Guidance", event:"Items"},		
		{name:"Green Gossip", event:"Items"},
		{name:"Griddle Gossip", event:"Items"},
		{name:"Griddle Riddle", event:"Items"},
		{name:"Gruyere Gab", event:"Items"},
		{name:"Gumbo Gumption", event:"Items"},
		{name:"Halloween Favors", event:"Items"},
		{name:"Harvest Help", event:"Items"},
		{name:"Herb Pot", event:"Items"},
		{name:"Herbal Happiness", event:"Items"},
		{name:"Hip Tip", event:"Items"},		
		{name:"Insalata Instruction", event:"Items"},
		{name:"Invention Motivators", event:"Items"},
		{name:"Italian Accolade", event:"Items"},
		{name:"Italian Intelligence", event:"Items"},
		{name:"Juicy Judgment", event:"Items"},
		{name:"Leaflet", event:"Items"},
		{name:"Marinade Might", event:"Items"},
		{name:"Meat Thermometer", event:"Items"},
		{name:"Mistletoe Metaphor", event:"Items"},
		{name:"Mushroom Memorandum", event:"Items"},
		{name:"Mushroom Murmur", event:"Items"},
		{name:"Napkin", event:"Items"},
		{name:"Nori Notice", event:"Items"},
		{name:"Old Boot", event:"Items"},
		{name:"Oregano Oration", event:"Items"},
		{name:"Oven Order", event:"Items"},
		{name:"Oven Ovation", event:"Items"},
		{name:"Pancake Principle", event:"Items"},
		{name:"Pancake Prowess", event:"Items"},
		{name:"Paper Towel Rolls", event:"Items"},
		{name:"Part", event:"Items"},
		{name:"Petrified Fruitcake", event:"Items"},
		{name:"Picnic Basket", event:"Items"},
		{name:"Pizza Pizzazz", event:"Items"},
		{name:"Pump", event:"Items"},
		{name:"Recipe Remnant", event:"Items"},
		{name:"Restaurant Review", event:"Items"},
		{name:"Sandwich Sensation", event:"Items"},
		{name:"Sauce Bowl", event:"Items"},
		{name:"Sauce Sense", event:"Items"},
		{name:"Sauce Stirrer", event:"Items"},
		{name:"Saute Saunter", event:"Items"},
		{name:"Sausage Suggestion", event:"Items"},
		{name:"Scary Stories", event:"Items"},
		{name:"Seaweed Sayings", event:"Items"},
		{name:"Shutters", event:"Items"},
		{name:"Skinny Chef Pants", event:"Items"},
		{name:"Smoldering Savvy", event:"Items"},
		{name:"Snowflake Story", event:"Items"},
		{name:"Soup Scoop", event:"Items"},
		{name:"Soup Suggestion", event:"Items"},
		{name:"Spigot", event:"Items"},
		{name:"Spreadable Secrets", event:"Items"},
		{name:"Steaming Sageness", event:"Items"},
		{name:"Stem Removers", event:"Items"},
		{name:"Stovetop Sensation", event:"Items"},
		{name:"Tablecloths", event:"Items"},
		{name:"Terrifying Tips", event:"Items"},
		{name:"Tiny Pillow", event:"Items"},
		{name:"Toasting Talent", event:"Items"},
		{name:"Toasty Tidbit", event:"Items"},
		{name:"Trap Tactics", event:"Items"},
		{name:"Turkey Tips", event:"Items"},
		{name:"Turkey Twine", event:"Items"},
		{name:"Twice Baked Tip", event:"Items"},
		{name:"Two Handed Shoves", event:"Items"},
		{name:"Veggie Storage Bin", event:"Items"},
		{name:"Veggie Tongs", event:"Items"},
		{name:"Veggie Validation", event:"Items"},
		{name:"Waiting List", event:"Items"},
		{name:"Warm Mitten", event:"Items"},
		{name:"Washing Wisdom", event:"Items"},
		{name:"Weather Vane", event:"Items"},
		{name:"White Rice Wishes", event:"Items"},
		{name:"Wire", event:"Items"},
		{name:"Wistful Wish", event:"Items"},
		{name:"Witch's Broom", event:"Items"},
		{name:"Wok Talk", event:"Items"},
		{name:"Wok Tossing Tip", event:"Items"},

		// Ingredients for cooking

		{name:"free ingredient", event:"Ingredients"},
		{name:"Mystery Ingredient", event:"Ingredients"},
		{name:"Out of Ingredients", event:"Ingredients"},

		{name:"Apple", event:"Ingredients"},
		{name:"Basil", event:"Ingredients"},
		{name:"Beef Broth", event:"Ingredients"},
		{name:"Broccoli", event:"Ingredients"},
		{name:"Cheddar Cheese", event:"Ingredients"},
		{name:"Cheese", event:"Ingredients"},
		{name:"Chicken Broth", event:"Ingredients"},
		{name:"Cinnamon", event:"Ingredients"},
		{name:"Cloves", event:"Ingredients"},
		{name:"Corn", event:"Ingredients"},
		{name:"Croutons", event:"Ingredients"},
		{name:"Dough", event:"Ingredients"},
		{name:"Egg", event:"Ingredients"},
		{name:"Egg Noodles", event:"Ingredients"},
		{name:"Fettucini", event:"Ingredients"},
		{name:"Flour", event:"Ingredients"},
		{name:"Free Range Chicken", event:"Ingredients"},
		{name:"Free Range Turkey", event:"Ingredients"},
		{name:"Garlic", event:"Ingredients"},
		{name:"Garlic Toast", event:"Ingredients"},
		{name:"Kidney Beans", event:"Ingredients"},
		{name:"Lamb", event:"Ingredients"},
		{name:"Lasagna Pasta", event:"Ingredients"},
		{name:"Lemon", event:"Ingredients"},
		{name:"Lime", event:"Ingredients"},
		{name:"Long Grain Rice", event:"Ingredients"},
		{name:"Macaroni", event:"Ingredients"},
		{name:"Marinated Beef", event:"Ingredients"},
		{name:"Mayonnaise", event:"Ingredients"},
		{name:"Mild Salsa", event:"Ingredients"},
		{name:"Milk", event:"Ingredients"},
		{name:"Mixed Greens", event:"Ingredients"},
		{name:"Mozzarella", event:"Ingredients"},
		{name:"Olive Oil", event:"Ingredients"},
		{name:"Orange", event:"Ingredients"},
		{name:"Parmesan Cheese", event:"Ingredients"},
		{name:"Pepper", event:"Ingredients"},
		{name:"Pesto", event:"Ingredients"},
		{name:"Ranch Dressing", event:"Ingredients"},
		{name:"Rice Noodles", event:"Ingredients"},
		{name:"Romaine Lettuce", event:"Ingredients"},
		{name:"Russet Potato", event:"Ingredients"},
		{name:"Salami", event:"Ingredients"},
		{name:"Salmon", event:"Ingredients"},
		{name:"Salt", event:"Ingredients"},
		{name:"Sirloin Beef", event:"Ingredients"},
		{name:"Snow Crab", event:"Ingredients"},
		{name:"Spaghetti", event:"Ingredients"},
		{name:"Sugar", event:"Ingredients"},
		{name:"Tomato", event:"Ingredients"},
		{name:"Tomato Sauce", event:"Ingredients"},
		{name:"Tuna", event:"Ingredients"},
		{name:"Vegetable Broth", event:"Ingredients"},
		{name:"Vinegar", event:"Ingredients"},
		{name:"Water", event:"Ingredients"},
		{name:"Wheat Bread", event:"Ingredients"},
		{name:"Wild Mushroom", event:"Ingredients"},
		{name:"Wild Onion", event:"Ingredients"},
		{name:"Yellow Bell Pepper", event:"Ingredients"},

		// Send Items
		{name:"Big Rack", event:"Send Only", cat:"send"}

		];
		var newItems=[
		];

		var sendWords = ["needs","send","looking for","get one too","get some too","could sure use some","want to get","You'll get a"];

		//manage accept texts here
		var accTextGet={}, accTextSend={};
		accTextGet = accTextFromData(materials,"","",MENU_ID_ENFORCE_NAME);
		accTextSend = accTextFromData(materials,"send","",MENU_ID_ENFORCE_NAME);
		var accTextCustoms = {
			doUnknown:"Unknown",
			send:"Unknown",
			xp:"XP",
		};

		var onlyTheGetTypes = materials.selectByParam("cat",null);
		var searchList = searchFromData(onlyTheGetTypes);

		//manage tests here
		var tests=[
			//specific tests for automation rule-breakers
			{search:["link","body"], find:"Big Rack", ret:"sendbigrack"},
			{search:["link","body"], find:"suggestion for stirring soup", ret:"soupsuggestion"},

			//this is a great place to do multi-lingual support
			// {search:["link"], find:["Ã©nergie","energy","energipaket"], ret:"energy"},
			// {search:["link"],find:["Skaffa grÃ¶nsakstÃ¤nger"], ret:"veggietongs"},
			// {search:["link"],find:["Parmesanost"], ret:"parmesancheese"},
			
			//this is an excellent example of a rule breaker
			//because the materials list cannot easily look for 
			//multiple words that mean the same bonus type
			//without making an equal number of entries
			{search:["link"], find:[
				"Coins","Mastery Star","Get Reward"
			], ret:"coins"},
			{search:["link"], find:[
				"Claim reward and play"
			], ret:"Energy"},
	
			// Tests for "get" Section
			// This can be entirely automated in one line
			{search:["link"], find:"{%1}", ret:"{%1}",subTests:searchList},
			//but you will want two so you check all against links first
			//then check all against captions and stuff
			//otherwise you get "egg fridge" returning "egg" instead of "coins"
			{search:["body"], find:"{%1}", ret:"{%1}",subTests:searchList},

		];

		//manage your menu here
		menu={
			section_main:{type:"section", label:appName+" ("+version+")", kids:{
				updateSidekick:{type:'link', label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
				sep_GET:{type:'separator', label:'Get Items', kids:{
					doUnknown:{type:"checkbox", label:"Process Unknown Links"},
				}},
				sep_SEND:{type:"separator", label:"Send Items", kids:{
 					sendall:{type:'checkbox', label:'Send All (or select from options below)'},
					send:{type:'checkbox', label:'Send Unrecognized Items'},
				}},
			}},
		};

		//attach material lists to the menu

		var sends=materials.selectByParam("cat","send"); // gets everything from 'var materials' where "cat" is set to "send"
		var gets=materials.selectByParam("cat",null);

		//to this section I added the MENU_ID_ENFORCE_NAME flag
		//which makes sure that if you specify id params in your
		//materials list that the internal name will be correct 
		//instead of using the id
		menuFromData(gets,menu["section_main"]["kids"]["sep_GET"]["kids"],newItems,"",MENU_ID_ENFORCE_NAME); //attach a list of materials to the GET block
		menuFromData(sends,menu["section_main"]["kids"]["sep_SEND"]["kids"],newItems,"send",MENU_ID_ENFORCE_NAME); //attach a list of materials to the SEND block

		//send all this information in to the WM script
		Sidekick.dock({
			appID:appID,
			name:appName, 
			version:version,
			thumbsSource:null,
			flags:{postMessageCompatible:false},
			alterLink:{},
			icon:appIcon,
			desc:null,
			accText:mergeJSON(accTextGet,accTextSend,accTextCustoms), 
			tests:tests,
			menu:menu,
		});
};
	

	function read(){
		try{
			var statusCode=0, text=document.documentElement.textContent;
		} catch(e){window.setTimeout(read,1000);return;} 

		/* **************************************************
		Modify this section so it catches your exact
		accept or failure texts returned by the target
		app/game

		Anything goes, as long as a status code
		is returned to the main WM host.

		Defaults are in RegExp format, but you can 
		change to simple if/then/else or switches
		if you have something better in mind

		The WM script can recieve and act on the following statusCode values:

			"2":"Responseless Collection", //normally handled inside WM host
			"1":"Accepted",
			"0":"Unknown",
			"-1":"Failed", //use for reason unknown
			"-2":"None Left", //use for reason of already taken
			"-3":"Over Limit",
			"-4":"Over Limit, Sent One Anyway", //registers as a type of acceptance
			"-5":"Server Error",
			"-6":"Already Got",	//registers as a type of acceptance
			"-7":"Server Down For Repairs",
			"-8":"Problem Getting Passback Link", //used only with special flags
			"-9":"Final Request Returned Null Page", //normally handled inside WM host
			"-10":"Final Request Failure", //normally handled inside WM host
			"-11":"Expired",
			"-12":"Not a Neighbor", //neighborship required to accept post
			"-13":"Requirements not met", //level or building requirement
			"-15":"Unrecognized Response", //prevent waiting for timeout if you know to watch for some known issue

			additional codes may now exist, please check the wiki support site for information

		*************************************************** */

		//already claimed
		if (text.match(/((Y|y)ou('ve)? already (responded|claimed))/)) statusCode=-6; 
 
		//over-limits
		else if (text.match(/(cannot have anymore|reached the collection limit|maximum energy has been awarded)/)) statusCode=-3; 
 			
		//all-outs
		else if (text.match(/(Sorry! All rewards have been claimed!)/)) statusCode=-2; 

		//generic fails
		else if (text.match(/(can't claim this reward)/))statusCode=-1;

		//expired fail
		else if (text.match(/(Sorry! This feed has expired.|Try clicking on feeds as soon|as your friends post them to|earn the rewards!)/))statusCode=-11;

		//server errors
		else if (text.match(/(does not appear to be valid)/)) statusCode=-5;
		else if (text=="") statusCode=-5;

		//accepts
		else if (text.match(/((S|s)ent you|Gift Claimed Successfully|You just got|You just sent)/)) statusCode=1;


		// here we actually pass back the status code
		if (statusCode!=0) {
			Sidekick.sendStatus(statusCode);
			if (supportWM2) sendMessage("status="+statusCode);
		}
		else window.setTimeout(read,1000); //restart if nothing was found of value
		};


		//start the script either as a docking sidekick, or as a reward reading sidekick
		if (window.location.hostname=='www.facebook.com') {
		Sidekick.openChannel();//new WM 3 methods for chrome
		dock();
		} else read();

})(); // anonymous function wrapper end