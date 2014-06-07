// ==UserScript==
// @name           Wall Manager Sidekick (Hidden Chronicles)
// @description    Assists Wall Manager with Hidden Chronicles posts
// @include        http://*.hidden.zynga.com/reward.php?*
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/123889.user.js
// @version        0.0.6.1
// @copyright      Charlie Ewing
// ==/UserScript==

(function() { 
	//prevent reading data from top page because it does not contain useful information and can trick the sidekick
	if ((window.top==window.self) && !window.location.href.match( /(^http:\/\/www\.facebook\.com\/pages\/FB-Wall-Manager\/)/ )) return;

	var version = "0.0.6";
        var appID="100333333405439";
        var scriptID="123410";
        var appName="Hidden Chronicles";

	var materials = [
		{name:"clue"},
		{name:"nail gun"},
		{name:"spackle"},
		{name:"concert tickets", id:"concerttix"},
		{name:"ivy"},
		{name:"pulley"},
		{name:"stencil"},
		{name:"fish food"},
		{name:"energy"},
		{name:"lucky cat",event:"Chinese Newyear"},
		{name:"firecracker",event:"Chinese Newyear"},
		{name:"drill"},
	];

	//mark all these as new while building the menus
	var newItems=[
		"sendluckycat",
		"sendfirecracker",
		"drill",
	];

	//dock with sidekick
	function dock(){
		var sendWords = ["maytap","needs","send","looking for ","get one too","get some too","could sure use some","want to get","You'll get a","envíale","envoie-leur"];

		var matList = [], searchList = []; accTexts={};
		for (var m=0,mat;(mat=materials[m]);m++){
			var id=(mat.id||mat.name).noSpaces().toLowerCase();
			matList.push(mat.name);
			searchList.push(id);
			//accTexts[id]=mat.name.upperWords();
			accTexts["send"+id]=mat.name.upperWords();
		}
		matList.optimize();
		searchList.optimize();

		var accTextCustoms={
			doUnknown:"Unknown",send:"Unknown",xp:"XP",coins:"Coins",clue:"Clue",energy:"Energy",
		};

		var tests= [
			//catch missed stuff
			{url:["VRL_ASK_ENERGY"],ret:"sendenergy"},
			{url:["VRL_HIGH_SCORE"],ret:"energy"},
			{ret:"coins",link:["send coins"]}, 

			//if send words are found, but material does not exist in the list, returns just "send" so sendall picks it up
			{either:sendWords,ret:"send",kids:[
				{url:"{%1}",ret:"send{%1}",subTests:searchList},
			]},
			//catch non-english send materials
			{url:"VRL_{%1}",ret:"send{%1}",subTests:searchList},

			//check for getting coins
			{ret:"xp",link:["xp"]}, //get xp
			{ret:"coins",link:["coins","monedas","pièces","münzen","monete","munten","mønter","moedas"]}, //get coins
			{ret:"clue",link:["clue","indice","pista","indizio"]}, //get clues
			{ret:"energy",link:["energ"]}, //get energy
		];

		var menu= {
			section_main:{type:"section",label:appName+" ("+version+")",kids:{
				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
				getsep:{type:'separator',label:'Get Items',kids:{
					coins:{type:"checkbox",label:"Coins"},
					xp:{type:"checkbox",label:"XP"},
					energy:{type:"checkbox",label:"Energy"},
					clue:{type:"checkbox",label:"Clues"},
					doUnknown:{type:"checkbox",label:"Process Unknown Links"},
				}},
				sendsep:{type:"separator",label:"Send Items",kids:{
					sendall:{type:'checkbox',label:'Send All (or select from options below)'},
					send:{type:'checkbox',label:'Send Unrecognized Items'},
				}},
			}},
		};

		//attach material lists to the menu
		//menuFromData(materials,menu.section_main.kids.getsep.kids,newItems,"");
		menuFromData(materials,menu.section_main.kids.sendsep.kids,newItems,"send");

		Sidekick.dock({
			appID:appID,
			name:appName, 
			thumbsSource:null,
			version:version,
			flags:{},
			alterLink:{},
			icon:"http://photos-d.ak.fbcdn.net/photos-ak-snc1/v85006/71/100333333405439/app_2_100333333405439_3507.gif",
			desc:null,
			accText: mergeJSON(accTexts,accTextCustoms), 
			tests:tests,
			menu:menu,
		});
	};
	
	function read(){
		try{
			var statusCode=0, text=document.documentElement.textContent;
		} catch(e){window.setTimeout(read,1000);return;} 

		//already claimed
		if (text.match(/((Y|y)ou('ve)? already (responded|claimed))/)) statusCode=-6; 
 
		//over-limits
		else if (text.match(/(cannot have anymore|reached the collection limit|maximum energy has been awarded)/)) statusCode=-3; 
 			
		//all-outs
		else if (text.match(/(all the (.*) (have|has) been claimed|no longer available)/)) statusCode=-2; 

		//generic fails
		else if (text.match(/(can't claim this reward)/))statusCode=-1;

		//expired fail
		else if (text.match(/(this reward has expired)/))statusCode=-11;

		//server errors
		else if (text.match(/(does not appear to be valid)/)) statusCode=-5;
		else if (text=="") statusCode=-5;

		//accepts
		else if (text.match(/(Gift Claimed Successfully|You just got)/)) statusCode=1;

		// here we actually pass back the status code
		if (statusCode!=0) sendMessage("status="+statusCode);
		else window.setTimeout(read,1000); //restart if nothing was found of value
	};


	//start the script either as a docking sidekick, or as a reward reading sidekick
	if (window.location.href.startsWith('http://www.facebook.com/')) dock(); else read();

})(); // anonymous function wrapper end