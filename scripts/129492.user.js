// ==UserScript==
// @name           Wall Manager Sidekick (Galaxy Life)
// @description    Assists Wall Manager with Galaxy Lifes posts
// @include        http://apps.facebook.com/galaxylife/?task=*
// @include        http://apps.facebook.com/galaxylife/*
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/123889.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=129492&days=1
// @version        0.0.2
// @copyright      Attila Csuha
// ==/UserScript==

(function() { 
	var version = "0.0.2";
        var appID="112125248878790";
        var scriptID="129492";
        var appName="Galaxy Life";

	var materials = [
		{name:"coins"},{name:"minerals"},{name:"activate"},{name:"upgrade"},{name:"training"},
	];

	//mark all these as new while building the menus
	var newItems=[
		"coins","minerals","activate","upgrade","training",
	];

	//dock with sidekick
	function dock(){
		var sendWords = ["Get Coins","Get Minerals","Help activate","Help training ","Help upgrade","Help build","Go get it"];

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
			doUnknown:"Unknown",send:"Unknown",coins:"Coins",minerals:"Minerals",activate:"Help activate",upgrade:"Help upgrade",training:"Help training",
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
			{ret:"upgrade",link:["mejorar"]}, //get xp
			{ret:"coins",link:["coins","monedas","pièces","münzen","monete","munten","mønter","moedas"]}, //get coins
			{ret:"minerals",link:["minerals","minerales"]}, //get minerals
			{ret:"training",link:["entrenar"]}, //get training
		];

		var menu= {
			section_main:{type:"section",label:appName+" ("+version+")",kids:{
				updateSidekick:{type:'link',label:'Update Sidekick',href:'http://userscripts.org/scripts/source/'+scriptID+'.user.js'},
				getsep:{type:'separator',label:'Get Items',kids:{
					coins:{type:"checkbox",label:"Coins"},
					minerals:{type:"checkbox",label:"Minerals"},
					activate:{type:"checkbox",label:"Help activate"},
					training:{type:"checkbox",label:"Help training"},
					upgrade:{type:"checkbox",label:"Help upgrade"},
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
			icon:"http://photos-c.ak.fbcdn.net/photos-ak-snc1/v85005/182/112125248878790/app_1_112125248878790_8766.gif",
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