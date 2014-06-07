// ==UserScript==
// @name 			Alien Visitors Group Assist Clicker
// @namespace		AlienVisitorGroupAssist
// @description		Clicks Group Aliens for Alien Visitors
// @include			http://www.facebook.com/groups/clickclickufo/*
// @include			http://www.facebook.com/groups/219404754763571/*
// @include			http://www.facebook.com/groups/258636594150945/*
// @include			http://www.facebook.com/groups/219459598090058/*
// @version			0.1
// @copyright		Hazado
// ==/UserScript==

	(function() { 

		//Determine what group page we are on

		//uncomment the following two lines if you DO want to save per group
		//var page = window.location.href.match(/clickclickufo|219404754763571|258636594150945|219459598090058/); //global, returns an array
		//page=(page)?page[0]:"opts"; //<-- means if page array exists, use the first entry, otherwise use "opts"

		//uncomment the following line if you DONT want to save per group
		var page="opts"; //put all storage in one "opts" object


		//just some shortcuts to help with time calculations
		var sec=1000; var min=sec*60; var hour=min*60; var day=hour*24; //all global
		var unixDay=86400000; //in ms not s


		//***** here I gave you some useful prototype functions to replace things missing in javascript

		//returns true if string contains s
		String.prototype.find = function(s,start) {start=start||0; return (this.indexOf(s,start) != -1);};


		//***** here I gave you some of my premade shortforms for evaluate

		//short form for evaluate
		function selectNodes(xPath,params){
			params=(params||{});
			return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
		}

		//short form for evaluate with single node return
		function selectSingleNode(xPath,params){
			params=params||{}; params['type']=9;
			return selectNodes(xPath,params).singleNodeValue;
		}

		//***** and here I moved all your functions to before the script runs

		function click(e) {
			if(!e && typeof e=='string') e=document.getElementById(e);
			if(!e) return;
			var evObj = e.ownerDocument.createEvent('MouseEvents');
			evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
			e.dispatchEvent(evObj);
			evObj=null;
		};


		//***** I took out your slowdown function since it wasnt being used
		//***** then I tweaked your compare function which could also just be called run

		//no need to pass G as G is global variable
		function run() {
			var ghostlink = selectSingleNode(".//a[contains(@href,'/alienvisitor/bossMonster/') and not(contains(@title,'processed'))]");

			if (!ghostlink) return;

			//check if already done
			ghostlink.setAttribute("style","background-color:#ffff80;");
			var key = ghostlink.href.split("?")[1], found=false;
			for (var i=0,len=opts["done"].length; (i<len && !found); i++){
				found = (opts["done"][i]["key"] == key);
				ghostlink.setAttribute("style","background-color:#b4b4b4;");
				ghostlink.setAttribute("title","processed");
				//***** using a found variable keeps the for loop from doing every history item AFTER its found, making loop time shorter
			}

			if (!found){
				//not done yet, record it
				ghostlink.setAttribute("style","background-color:#75ff21;");
				ghostlink.setAttribute("title","processed");

				var timeStamp = new Date().valueOf();
				opts["done"].push({key:key,date:timeStamp});

				//save the recorded data
				GM_setValue(page,JSON.stringify(opts));

				//process the post
				window.setTimeout(function() { //give it thinking time before clicking
					//click(ghostlink);

					//instead of clicking the link, just force its url open in a window that we can control later
					//this wont work in chrome without some special options or an addon to replicate GM functions
					//such as TamperMonkey --> https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo
					var hWnd=window.open(ghostlink.href,'_blank'); //open in new tab or window
					if (hWnd)window.setTimeout(hWnd.close,8*sec); //if we were offered a window handle, close that window after seconds

					ghostlink.setAttribute("style","background-color:#b4b4b4;");
				},500);
			}
		};


		// Housekeeping: remove history older than one day
		
		var opts=JSON.parse(GM_getValue(page,"{}")); //returns object, global

		if (opts) { 
			if (!opts["done"]) {
				//no history: create a default "done" array
				opts["done"]=[];

			} else for (var i=0,len=opts["done"].length; i<len; i++) {
				//history exists: clean it out
				if (opts["done"][i]) {
					var item = opts["done"][i];
					var timeStamp = item["date"];
					var currentDate = new Date().valueOf();
					if (timeStamp <= (currentDate - (unixDay) )) {
						opts["done"].splice(i,1);
					}
				}
			}
			//save the cleaned data
			GM_setValue(page,JSON.stringify(opts));

		}

		//create a refresher

		var toReload; //global

		function refresh(){
			//check for any unfinished links
			var link = selectSingleNode(".//a[contains(@href,'/alienvisitor/bossMonster/') and not(contains(@title,'processed'))]");
			//if no links found do refresh
			if (!link) window.location.reload();
			//otherwise run refresh in a few seconds and try again
			else toReload = window.setTimeout(refresh,5*sec);
		};

		toReload  = window.setTimeout(refresh, 1*min); // run the refresh after 1 minute


		//create a run loop
		var intv=window.setInterval(run, 2*sec); //giving 2 seconds before starting first run

		//run this if we leave the page for any reason to clean up crap and timers
		window.addEventListener("beforeunload", function(e) {
			if (intv) window.clearInterval(intv);
			if (toReload) window.clearTimeout(toReload);
			opts = null;intv=null;toReload=null; run=null; refresh=null;
		}, false);
	})();
