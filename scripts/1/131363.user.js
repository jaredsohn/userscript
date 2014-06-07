// ==UserScript==
// @name            flair stats
// @namespace       mustquit
// @description     Bf3stats from user flair for /r/battlefield3
// @resource        pageCSS http://userstyles.org/styles/operacss/64581/flair%20stats.css?
// @include         https://*.reddit.com/r/battlefield3*
// @include         http://*.reddit.com/r/battlefield3*
// @updateURL       https://userscripts.org/scripts/source/131363.user.js
// @version         0.6.2
// ==/UserScript==

var flair_stats_NS = function () {

var JSONtools = function () {

	// formatJson() :: formats and indents JSON string
	function formatJson(val) {
		var retval = '';
		var str = val;
		var pos = 0;
		var strLen = str.length;
		var indentStr = '&nbsp;&nbsp;&nbsp;&nbsp;';
		var newLine = '<br />';
		var char = '';
		
		for (var i=0; i<strLen; i++) {
			char = str.substring(i,i+1);
			
			if (char == '}' || char == ']') {
				retval = retval + newLine;
				pos = pos - 1;
				
				for (var j=0; j<pos; j++) {
					retval = retval + indentStr;
				}
			}
			
			retval = retval + char;	
			
			if (char == '{' || char == '[' || char == ',') {
				retval = retval + newLine;
				
				if (char == '{' || char == '[') {
					pos = pos + 1;
				}
				
				for (var k=0; k<pos; k++) {
					retval = retval + indentStr;
				}
			}
		}
		
		return retval;
	}
	return {
		inspect: function(text){
			myWindow=window.open('','','width=400');
			myWindow.document.write(formatJson(JSON.stringify(text)));
			myWindow.focus();
		}
	}
}();


//handles playerdata from the session.
var playerData = function(){

	function getQuery(){
		//JSONtools.inspect(player);
		var query = "";
		
		switch (page) { //these tests make sure we only prompt an update if our player object is missing the needed branch.
			case "Summary":
				if(typeof player.stats.global === 'undefined' || typeof player.stats.scores === 'undefined'){
					query = 'clear,global,scores';
				}
				break;
			case "Weapons":
				if(typeof player.stats.weapons === 'undefined'){
					query = 'clear,weapons,weaponsName';
				}
				break;
			case "Vehicles":
				if(typeof player.stats.vehcats === 'undefined'){
					query = 'clear,vehCats,vehCatsInfo';
				}
				break;
			case "Kits":
				if(typeof player.stats.kits === 'undefined'){
					query = 'clear,kits,kitsName';
				}
				break;
			case "Map types":
				if(typeof player.stats.gamemodes === 'undefined'){
					query = 'clear,gamemodes,gamemodesInfo';
				}
				break;
			default: //panic
					query = 'all';		
		}
		if (typeof player.stats.rank === 'undefined'){ //we need this regardless for ensignia
			if(query != ""){query += ','};
			query += 'rank,imgInfo';
		}
		return query;
	}
	/*
	* Recursively merge properties of two objects 
	thnx markus
	*/
	function mergeRecursive(obj1, obj2) {
		for (var p in obj2) {
			if( obj2.hasOwnProperty(p)){
				try{
					obj1[p] = typeof obj2[p] === 'object' ? mergeRecursive(obj1[p], obj2[p]) : obj2[p];
				}
				catch(e)
				{
					obj1[p] = obj2[p];
				}
			}
		}
		return obj1;
	}

	//bf3stats api 
	function getBf3StatsData(query){ 
		//alert(query);
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://api.bf3stats.com/" + player.plat + "/player/",
			data: "player="+encodeURIComponent(player.name)+"&opt=" + query + "&output=json",
			headers: {
			"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				var responseJSON = JSON.parse(response.responseText);
				switch(responseJSON.status){
					case "pifound":
						statsPopup.content.showError("Found the player, but their bf3stats profile needs updating. Click the link below to update it for them.");
						break;
					case "notfound":
						statsPopup.content.showError("No data found for this player, probably because the name is wrong.");
						break;
					case "error":
						switch (player.error){
						case "invalid_platform":
							statsPopup.content.showError("BF3Stats.com reported that the platform was invalid."); //should never happen
							break;
						case "invalid_name":
							statsPopup.content.showError("BF3Stats.com reported that the name was invalid.");
							break;
						case "private":
							statsPopup.content.showError("BF3Stats.com reported that the player profile is private.");
							break;
						default:
							statsPopup.content.showError("BF3Stats.com returmed an unspecified error");
						};
						break;
					case "data":
						player = mergeRecursive(player, responseJSON);
						updateCache(player); 
						statsPopup.fill(player, page);
						break;
					default:
						statsPopup.content.showError("Something very weird happened.");
				};
				
			},
			onerror: function(response) {
				statsPopup.content.showError('Failed to contact the server, so Bf3stats is probably down. Check <a href="http://www.downforeveryoneorjustme.com/bf3stats.com">here</a>.');
			}
		});
	}

	
	function updateCache(player){
		cache.unshift(player);
	
	}
	/**
	* looks for a player in the cache, if it finds it
	* it will remove it and return it, if not it returns
	* a new player object
	*/
	function getPlayer(name, platform){
		var cPlayer;
		var found = false;
		var i = 0;
		while (!found && i < cache.length){
			cPlayer = cache[i];
			if (cPlayer.name.toLowerCase() == name.toLowerCase() && cPlayer.plat == platform){
				found = true;
				cache.splice(i,1); //player is added back in updateCache
			}
			i++;
		}
		return found ? cPlayer : {plat: platform, name: name, stats: {}}; //stats is just a placeholder
	}	
	
	//private/shared vars
	
	var cache =  []; 
	var page = "Summary";
	var player = {}; 
	return {
		getStats: function(platform, name, requestedPage) {
			page = requestedPage; //override
			
			if (!platform || !name){
				statsPopup.content.showError("Either the platform or the name is missing.");
			}
			else{
				//TODO: persistence
				player = getPlayer(name, platform);
				var query = getQuery();
				if(query != ""){
					getBf3StatsData(query);
				}
				else{
					updateCache(player); 
					statsPopup.fill(player, page);
				}
					
			}					
		}

	};
}();

//****statsPopup
var statsPopup = function(){
	var id = 'bf3tt';
	var top = 3;
	var left = 3;
	var maxw = 300;
	var popup,head,content,foot;
	var initial = "Loading...";
	var battlelogUrl = 'http://battlelog.battlefield.com/bf3/user/';
	var imgpath = 'http://files.bf3stats.com/img/';
	var lastState = "Summary";
	var target; //this will reference the flair span that triggered init
	
	function build(){
		popup = document.createElement('div');
		popup.style.display = "none";
		popup.setAttribute('id',id);
		popup.setAttribute('class', "unselectable");
		head = document.createElement('div');
		head.setAttribute('id',id + '-head');
		content = document.createElement('div');
		content.setAttribute('id',id + '-cont');
		foot = document.createElement('div');
		foot.setAttribute('id',id + '-foot');
		popup.appendChild(head);
		popup.appendChild(content);
		popup.appendChild(foot);
	}
	function initialFill(platform,name){
		head.innerHTML = '<a href="' + battlelogUrl + name + '/'+'">' + name + '</a>';
		content.innerHTML = "Loading...";
		foot.innerHTML = 'powered by <a href="http://bf3stats.com/stats_' + platform + '/' + name + '/">bf3stats.com</a>';
		popup = target.appendChild(popup);
		if (popup.offsetWidth > maxw){
			popup.style.width = maxw + 'px'
		}
	}
		var alpha = 0;
	
	var popupAnimate = function(){	
		var speed = 5; //lower is slower
		var delay = 20;
		var endalpha = 96;
		var intervalID  = 0;
		function fadeIn(){
			var a = alpha;
			if (a != endalpha){ 
				var i = speed;
				if (endalpha - a < speed){
					i = endalpha - a;
				}
				alpha = a + i; 
				popup.style.opacity = alpha * .01; 
			}
			else {
				clearInterval(intervalID);
			}
		}
		function fadeOut(){
			var a = alpha;
			if (a != 0){
				var i = speed;
				if (alpha < speed){
					i = a;
				}
				alpha = a - i;
				popup.style.opacity = alpha * .01;
			}
			else {
				clearInterval(intervalID);
				statsPopup.close()
			}
		}
		return {
			show: function(){
				popup.style.opacity = 0;
				popup.style.display = "block";
				clearInterval(intervalID);
				intervalID  = setInterval(fadeIn,delay);
			},
			hide:function(e){
				if(e.target.getAttribute('id') == id){
					clearInterval(intervalID);
					intervalID  = setInterval(fadeOut,delay);
				}
			},
			clickHide:function(){
					if(popup && popup.style.display == "block"){
						clearInterval(intervalID );
						intervalID  = setInterval(fadeOut,delay);
					}
			}
		};
	}();
	
	function isDescendant(parent, child) {
		if(parent != null){
			var node = child;
			while (node != null) {
				if (node == parent) {
				 return true;
				}
				node = node.parentNode;
			}
			return false;
		}
	}

	
	return {
		setLastState: function(state){
			lastState = state;
		},
		init:function(newTarget,platform,name){
			var timeoutID = 0;
			if (popup == null){
				build();
			}
			if(popup.parentNode){
				statsPopup.close(); //in case there is one still open
			}
			target = newTarget; //must be after we've closed old popup	
			flairStats.removeEventListeners(target)
			initialFill(platform,name);
			playerData.getStats(platform,name,lastState);
			popupAnimate.show();
			popup.addEventListener('mouseout', function(e){timeoutID = window.setTimeout(popupAnimate.hide,200, e)}, false);
			popup.addEventListener('mouseover', function(e){window.clearTimeout(timeoutID)}, false);
			//document.addEventListener('click', function(e){if(!(e.target.className.indexOf('flair') != -1 || isDescendant(target, e.target) || isDescendant(document.getElementById('statsPageMenu'), e.target))){popupAnimate.clickHide()}}, false);
		
			},
		fill: function(player, page){
			statsPopup.header.fill(player,page);
			statsPopup.content.fill(player,page);
		},
		close: function(){
			popup.style.opacity = 0;
			alpha = 0;
			popup.style.display = 'none';
			popup = popup.parentNode.removeChild(popup);
			flairStats.addEventListeners(target.parentNode);
		},
		header: function(){ //self - executing
			var menu = ["Summary", "Weapons", "Vehicles", "Kits", "Map types"];
			var pageMenu;
			var dropDownAnimate = function(){
				var timeout	= 300;
				var closetimer	= 0;
				var hiddenMenu	= false;
				return {
					show: function(e){
						dropDownAnimate.cancelCloseTimer();
						if(hiddenMenu) {
							hiddenMenu.style.visibility = 'hidden'
						};
						hiddenMenu = document.getElementById('hiddenPageMenu');
						hiddenMenu.style.visibility = 'visible';
						pageMenu.removeEventListener('click', dropDownAnimate.show, false);
						pageMenu.addEventListener('click', dropDownAnimate.closetimer, false);
					},
					closeTimer: function(e){
						closetimer = window.setTimeout(dropDownAnimate.close, timeout);
					},
					cancelCloseTimer: function(e){
						if(closetimer)
						{
							window.clearTimeout(closetimer);
							closetimer = null;
						}
						
					},
					close: function(){
						if(hiddenMenu) {
							hiddenMenu.style.visibility = 'hidden';
						}
						pageMenu.addEventListener('click', dropDownAnimate.show, false);
						
					}
					
				};
			}();
			
			return {
				fill: function(player, page){
					while (menu[0] != page){
						menu.push(menu.shift());
					}
					var hi = '<div id="statsNametag">'
					hi += '<a href="' + battlelogUrl + player.name + '/'+'">' + player.name + '</a>';
					hi += '<img class="bf3flag" src="' + imgpath + player.country_img + '" alt="flag" />'
					hi += '</div>'
					hi += '<div id="statsEnsignia">'  //gets floated far right
					hi += '<img class="bf3rank" src="' + imgpath + 'bf3/' + player.stats.rank.img_tiny +'" alt="rank" />'
					hi += '</div>'
					hi += '<div id="statsPageMenu">'
					hi += '<ul>'
					hi += '<li><span>' + menu[0] + '</span></li>'
					hi += '<div id="hiddenPageMenu">'
					hi += '<li><span>' + menu[1] + '</span></li>'
					hi += '<li><span>' + menu[2] + '</span></li>'
					hi += '<li><span>' + menu[3] + '</span></li>'
					hi += '<li><span>' + menu[4] + '</span></li>'
					hi += '</div>'
					hi += '</ul>'
					hi += '</div>'
					
					head.innerHTML = hi;
					
					pageMenu = document.getElementById('statsPageMenu');
					pageMenu.addEventListener('click', dropDownAnimate.show, false);
					//pageMenu.addEventListener('mouseout', dropDownAnimate.closeTimer, false);
					var hiddenMenu = document.getElementById('hiddenPageMenu');
					hiddenMenu.addEventListener('mouseover', dropDownAnimate.cancelCloseTimer, false);
					hiddenMenu.addEventListener('mouseout', dropDownAnimate.closeTimer, false);
					hiddenMenu.addEventListener('click', function(e){ /*dropDownAnimate.close();*/ playerData.getStats(player.plat,player.name,e.target.textContent)},false);

				}
			}
		}(),
		content: function(){ //self - executing */
		
			//stores an array list of the current objects
			var tableArray = [];
			//stores the for the current table
			var tableName = "";
			//the number of rows the table with have
			var rows = 0;
			//list of the current header titles
			var headerArray = [];
			/**
			 * Convert number of seconds into time object
			 * @param integer secs Number of seconds to convert
			 * @return object
			 */
			function secondsToTime(secs)
			{
				var hours = Math.floor(secs / (60 * 60));
				var divisor_for_minutes = secs % (60 * 60);
				var minutes = Math.floor(divisor_for_minutes / 60);     
				var divisor_for_seconds = divisor_for_minutes % 60;
				var seconds = Math.ceil(divisor_for_seconds);       
				var obj = {
					hours: hours,
					minutes: minutes,
					seconds: seconds
				};
				return obj;
			}
			
			function getAccuracy(obj){
				var accuracy;
				var shots = parseInt(obj.shots)
				var hits = parseInt(obj.hits)
				if ( shots == 0  || hits == 0 ){
					accuracy = '-';
				}
				else{
					accuracy = hits / shots * 100;
					accuracy = parseFloat(accuracy.toFixed(2)); 
				}
				return accuracy.toString();
			}
			
			function getFooPerMinute(foo, time){
				var fpm
				var time = parseInt(time);
				if (time == 0){
					fpm = '-'
				}
				else{
					fpm = parseInt(foo) / (time/ 60) ;
					fpm = parseFloat(fpm.toFixed(2)); 
				}
				return fpm.toString();
			}
			function getRatio(num, den){
				var num = parseInt(num);
				var den = parseInt(den);
				var ndr;
				if (num == 0){
					ndr = 0;
				}
				else if (den == 0){
					ndr = '&infin;';
				}
				else{
					ndr = num / den;
					ndr = parseFloat(ndr.toFixed(2));
				}
				return ndr.toString();
			}
			function getRatPer(num, den){
				var num = parseInt(num);
				var den = parseInt(den);
				var ndr;
				if (num == 0){
					ndr = 0;
				}
				else if (den == 0){
					ndr = '&infin;';
				}
				else{
					ndr = (num / den) * 100;
					ndr = parseFloat(ndr.toFixed(2));
				}
				return ndr.toString();
			}
			
			/**
			* takes objects from a json subtree and adds them to an array
			* aids sorting
			*/
			function objToAry(obj){
			
				var returnArray = [];
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						var curObj = obj[prop];
						returnArray.push(curObj);
					}
				}
				return returnArray;
			}
			
			//takes an array of strings and build a table header with them
			function buildTableHead(){
				var ci = '<div class="statsHead">';
				ci += ' <div class="statsHeadCell statsFirst">' + headerArray[0] + '</div>';
				for(var i = 1; i < headerArray.length;i++){
					ci += ' <div class="statsHeadCell statsSortable"><span>' + headerArray[i] + '</span></div>';
				}
				ci += '</div>'
				return ci;
			}	
			var sort = function(){
				function nanSafe(b,a){
					if(!(isNaN(a)) && !(isNaN(b))){
						return  a - b;
					}
					else if (isNaN(a) && !(isNaN(b)) ){
						return -1
					}
					else if (isNaN(b) && !(isNaN(a))){
						return 1
					}
					else if (isNaN(b) && isNaN(a)){
						return 0
					}
				}
				return {
					prop: function(x, args){
						var prop = args[0];
						return parseInt(x[prop]);
					},
					fpm: function(x, args){
						var foo = args[0];
						return getFooPerMinute(x[foo],x.time)
					},
					accuracy: function(x, args){
						return getAccuracy(x);
					},
					ratio: function(x, args){
						var prop1 = args[0];
						var prop2 = args[1];
						return getRatio(x[prop1],x[prop2]);
					},
					ratioPer: function(x, args){
						var prop1 = args[0];
						var prop2 = args[1];
						return getRatPer(x[prop1],x[prop2]);
					},
					//the callback for by() is one of the methods above
					by: function(callback){
						var args = Array.prototype.slice.call(arguments);
						args.shift();
						//console.log(callback.toString(), prop);
						tableArray.sort(function(a, b){
								return nanSafe(callback(a, args),callback(b, args));
							});
					}
				}
			}();			
			function makeHeadersSortable(getEntry){
				var headers = document.getElementsByClassName('statsSortable');
				for (var i = 0; i < headers.length; i++){
					headers[i].addEventListener('click', function(e){
															var heading = e.target.textContent.toLowerCase();
															sortColumn(heading,getEntry)
														}, false);
				}
			}
			var lastSort = function(){
				lastAr = [false, false, false, false];
				return {
					get: function(){
						var last;
						switch(tableName){
							case 'weapon':
								if(lastAr[0]){
									last = lastAr[0];
								} else {
									last = "kills";
								}
								break;
							case 'vehicle':
								if(lastAr[2]){
									last = lastAr[1];
								} else {
									last = "kills";
								}
								break;
							case 'kit':
								if(lastAr[2]){
									last = lastAr[2];
								} else {
									last = "score";
								}
								break;
							case 'map':
								if(lastAr[3]){
									last = lastAr[3];
								} else {
									last = "wlr";
								}
								break;
						}
						return last;
					},
					set: function(thisSort){
						switch(tableName){
							case 'weapon':
								lastAr[0] = thisSort;
								break;
							case 'vehicle':
								lastAr[1] = thisSort;
								break;
							case 'kit':
								lastAr[2] = thisSort;
								break;
							case 'map':
								lastAr[3] = thisSort;
								break;
						}
					}
				}
			}();
			function sortColumn(heading,getEntry){
				var thisSort;
				//console.log(heading)
				switch (heading){
					case "time":
						sort.by(sort.prop, "time") 
						thisSort = "time";
						break;
					case "kills":
						sort.by(sort.prop, "kills") 
						thisSort = "kills";
						break;
					case "kpm":
						sort.by(sort.fpm, "kills") 
						thisSort = "kpm";
						break;
					case "score":
						sort.by(sort.prop, "score") 
						thisSort = "score";
						break;
					case "spm":
						sort.by(sort.fpm, "score") 
						thisSort = "spm";
						break;
					case "hs":
						sort.by(sort.prop, "headshots") 
						thisSort = "hs";
						break;
					case "acc":
						sort.by(sort.accuracy) 
						thisSort = "acc";
						break;
					case "kdr":
						sort.by(sort.ratio, "kills", "death") 
						thisSort = "kdr";
						break;
					case "wlr":
						sort.by(sort.ratio, "wins", "losses") 
						thisSort = "wlr";
						break;
					case "hk%":
						sort.by(sort.ratioPer, "headshots", "kills") 
						thisSort = "hk%";
						break;
					default:
						sort.by(sort.prop, "kills") 
						thisSort = "kills";
				}
				redraw(getEntry);
				lastSort.set(thisSort);
			}
			function redraw(getEntry){
				var table = document.getElementById(tableName + 'Table');
				var ci = buildTableHead();
				for (var i = 0;i < rows; i++){
					ci += getEntry(tableArray[i]);
				}
				table.innerHTML = ci;
				
				makeHeadersSortable(getEntry);
					
			}
			
			var row = {
				getVehicle: function(vehicle){ //refactor
					var timePlayed = secondsToTime(vehicle.time);
					var ci;
					ci = '<div class="statsRow">'
					ci += '<div class="statsCell statsFirst">' + vehicle.name + '</div>';
					ci += '<div class="statsCell">' + vehicle.kills + '</div>';
					ci += '<div class="statsCell">' + getFooPerMinute(vehicle.kills,vehicle.time) + '</div>';
					ci += '<div class="statsCell">' + vehicle.score + '</div>';
					ci += '<div class="statsCell">' + getFooPerMinute(vehicle.score,vehicle.time) + '</div>';
					ci += '<div class="statsCell">' + timePlayed.hours + 'h '  + timePlayed.minutes + 'm ' + '</div>';
					ci +='</div>'
					return ci
				},
				getWeapon: function(gun){
					var timePlayed = secondsToTime(gun.time);
					var ci;
					ci = '<div class="statsRow">'
					ci += '<div class="statsCell statsFirst">' + gun.name + '</div>';
					ci += '<div class="statsCell">' + gun.kills + '</div>';
					ci += '<div class="statsCell">' + getAccuracy(gun) + '</div>';
					ci += '<div class="statsCell">' + gun.headshots + '</div>';
					ci += '<div class="statsCell">' + getRatPer(gun.headshots,gun.kills) + '</div>';
					ci += '<div class="statsCell">' + getFooPerMinute(gun.kills,gun.time) + '</div>';
					ci += '<div class="statsCell">' + timePlayed.hours + 'h '  + timePlayed.minutes + 'm'+'</div>';
					ci +='</div>'
					return ci
				},
				getKit: function(kit){
					var timePlayed = secondsToTime(kit.time);
					var ci;
					ci = '<div class="statsRow">'
					ci += '<div class="statsCell statsFirst">' + kit.name + '</div>';
					ci += '<div class="statsCell">' + timePlayed.hours + 'h ' + timePlayed.minutes + 'm '  + timePlayed.seconds + 's' + '</div>';
					ci += '<div class="statsCell">' + kit.score + '</div>';
					ci += '<div class="statsCell">' + getFooPerMinute(kit.score,kit.time) + '</div>';
					ci +='</div>'
					return ci
				},
				getMap: function(map){
					var ci;
					ci = '<div class="statsRow">'
					ci += '<div class="statsCell statsFirst">' + map.name + '</div>';
					ci += '<div class="statsCell">' + getRatio(map.wins,map.losses) + '</div>';
					ci += '<div class="statsCell">' + map.wins +'</div>';
					ci += '<div class="statsCell">' + map.losses + '</div>';
					ci +='</div>'
					return ci
				}
			};
			function initialTable(){
				var ci = '<div id="'+ tableName +'Table">';
				ci +=    '</div>'
				content.innerHTML = ci;
			};
			var statsPages = function(){
				return {
					showSummary: function(player){
						var global = player.stats.global;
						var scores = player.stats.scores;
						var kdr = getRatio(global.kills,global.deaths);
						var wlr = getRatio(global.wins,global.losses) ;
						var timePlayed = secondsToTime(global.time);
						
						var ci ='<p>Score' + '<span class="ttstats">'  + player.stats.scores.score + '</span>' + '</p>';
						ci += '<hr />';
						ci += '<p>Score/min' + '<span class="ttstats">'  + getFooPerMinute(scores.score, global.time) + '</span>' + '</p>';
						ci += '<hr />';
						ci += '<p>Kills' + '<span class="ttstats">'  + player.stats.global.kills + '</span>' + '</p>';
						ci += '<hr />';
						ci += '<p>Kill:Death' + '<span class="ttstats">'  + kdr + '</span>' + '</p>';
						ci += '<hr />';
						ci += '<p>Accuracy' + '<span class="ttstats">'  + getAccuracy(global) + '</span>' + '</p>';
						ci += '<hr />';
						ci += '<p>Win:Lose' + '<span class="ttstats">'  + wlr + '</span>' + '</p>';
						ci += '<hr />';
						ci += '<p>Time played' + '<span class="ttstats">'  + timePlayed.hours + 'h '  + timePlayed.minutes + 'm '  + timePlayed.seconds + 's' + '</span>' + '</p>';
						
						content.innerHTML = ci;
						statsPopup.setLastState("Summary");
						popup.style.width = "250px";
					},
					showWeaponStats: function(player){
						headerArray = ['Name','Kills','Acc','HS','HK%','KPM','Time']
						tableName = 'weapon';
						rows = 7;
						initialTable();
						var weapons = player.stats.weapons;
						tableArray = objToAry(weapons);
						sortColumn(lastSort.get(), row.getWeapon);
						statsPopup.setLastState("Weapons");
						popup.style.width = "350px";
					},
					showVehicleStats: function(player){
						tableName = 'vehicle';
						headerArray = ['Name','Kills','KPM','Score', 'SPM','Time']
						rows = 7;
						initialTable()
						var vehicles = player.stats.vehcats;
						tableArray = objToAry(vehicles);
						sortColumn(lastSort.get(), row.getVehicle);
						statsPopup.setLastState("Vehicles");
						popup.style.width = "350px";
					},
					showClassStats: function(player){
						tableName = 'kit';
						headerArray = ['Name','Time','Score','SPM']
						rows = 4;
						initialTable()
						var kits = player.stats.kits;
						tableArray = objToAry(kits);
						sortColumn(lastSort.get(), row.getKit);
						statsPopup.setLastState("Kits");
						popup.style.width = "250px";
					
					},
					showMapStats: function(player){
						tableName = 'map';
						headerArray = ['Name', "WLr", 'Wins', 'Losses']
						rows = 5;
						initialTable()
						var modes = player.stats.gamemodes;
						tableArray = objToAry(modes);
						sortColumn(lastSort.get(), row.getMap);
						statsPopup.setLastState("Map types");
						popup.style.width = "250px";
					}
				}
			}();
			return {
				fill: function(player,page){
					switch (page){
						case "Summary":
							statsPages.showSummary(player);
							break;
						case "Weapons":
							statsPages.showWeaponStats(player);
							break;
						case "Vehicles":
							statsPages.showVehicleStats(player);
							break;
						case "Kits":
							statsPages.showClassStats(player);
							break;
						case "Map types":
							statsPages.showMapStats(player);
							break;
						default:
							statsPages.showSummary(player);
					}
				},
				showError: function(errorString){
					var ci;
					if (errorString != "")
					{
						ci = errorString;
					}
					else
					{
						ci =  "Something went wrong.";
					}
					content.innerHTML = ci;
				
				}
			};
		}()
	};
}();

//****flairStats
//main
var flairStats = function(){

	//*****stylesheet
	// utility to add CSS as a new stylesheet to /r/bf3
	var styleSheet = function(){
		function addSheet(css) {
			var style = document.createElement('style');
			style.textContent = css;
			var head = document.getElementsByTagName('head')[0];
			if (head) {
				head.appendChild(style);
			}
		};
		return {
			addCss: function(){
				var ttcss = GM_getResourceText( 'pageCSS' );
				addSheet(ttcss);
			}
		};
	}();
	//returns name contained in flair or reddit username if blank 
	function getName(el){
		var bf3Name = el.textContent;
		var clan = new RegExp(/^\[.*\]/);
		
		if (bf3Name == ""){// check for (same name)
			bf3Name = el.parentNode.getElementsByClassName('author')[0].textContent;
		}
		else if (clan.test(bf3Name)){
			bf3Name = bf3Name.replace(clan, "");
		}
		return bf3Name;
	};
	// returns pc, ps3 or 360 depending on platform of flair, returns null otherwise.
	function getPlatform(el){
		var bf3plat;
		var cl = el.className;
		if (cl.indexOf("pc") != -1){
			bf3plat = "pc";
		}
		else if (cl.indexOf("ps3") != -1){
			bf3plat = "ps3";
		}
		else if (cl.indexOf("360") != -1){
			bf3plat = "360";
		}
		return bf3plat; //is null if no plat or 'bot'
	};
	function init(e){
		var target = e.target;
		if(target.className.indexOf("flair") != -1){  //don't fire on child elements
			var platform = getPlatform(target)
			var name = getName(target)
			statsPopup.init(target, platform, name);
		}
	};
	return {
		onload: function(e){
			styleSheet.addCss();
			flairStats.addEventListeners(document.body);
			
		},
		addEventListeners: function(target){
			var allFlairs = target.getElementsByClassName('flair');
			for (var i=0; i < allFlairs.length; i++) {
				allFlairs[i].addEventListener('click', init, false); 
			}
		},
		removeEventListeners: function(target){
			var allFlairs = target.parentNode.getElementsByClassName('flair');
			for (var i=0; i < allFlairs.length; i++) {
				allFlairs[i].removeEventListener('click', init, false); 
			}
		}
	};
}();
function checkNode(e){
	var target = e.target;
	var classN = target.className;
	return (target.nodeName == "DIV" && (classN == "sitetable linklisting" || classN.indexOf("comment") != -1))
};
document.addEventListener("DOMContentLoaded",function(e){flairStats.onload(e)},false);
document.addEventListener("DOMNodeInserted",function(e){
												if (checkNode(e)){flairStats.addEventListeners(e.target)};
											}
										,false);
//document.body.addEventListener('click',function(){statsPopup.clickHide()},false);

}();
	