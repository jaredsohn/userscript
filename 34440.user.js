// Tard's KoL Scripts
// Copyright (c) 2006, Byung Kim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Tard's KoL Scripts - Recipes
// @namespace      http://kol.dashida.com
// @include        *kingdomofloathing.com/main_c.html
// @include        *kingdomofloathing.com/main.html
// @include        *kingdomofloathing.com/starchart.php
// @include        *kingdomofloathing.com/smith.php
// @include        *kingdomofloathing.com/cook.php
// @include        *kingdomofloathing.com/cocktail.php
// @include        *kingdomofloathing.com/jewelry.php
// @include        *kingdomofloathing.com/combine.php
// @include        *kingdomofloathing.com/gnomes.ph*
// @include        *kingdomofloathing.com/knoll.ph*
// @include        *kingdomofloathing.com/craft.ph*
// @include        *127.0.0.1:*/main_c.html
// @include        *127.0.0.1:*/main.html
// @include        *127.0.0.1:*/starchart.php
// @include        *127.0.0.1:*/smith.php
// @include        *127.0.0.1:*/cook.php
// @include        *127.0.0.1:*/cocktail.php
// @include        *127.0.0.1:*/jewelry.php
// @include        *127.0.0.1:*/combine.php
// @include        *127.0.0.1:*/gnomes.ph*
// @include        *127.0.0.1:*/knoll.ph*
// @include        *127.0.0.1:*/craft.ph*
// @description    Version 2.0
// ==/UserScript==


/********************************** Change Log **********************************************
Refer to the following for past updates:
http://kol.dashida.com/

Refer to the following for current updates:
http://somestranger.kol.googlepages.com/

Latest Update:
1.9
- Changed data parsing back to my own files
- Added date checking function (thanks Morac)
1.8
- Changed data parsing to point to Picklish's pages. (More up-to-date)
1.7
- Added "(3)" adventure use indication to the jewelry page (thanks Fryguy!)
********************************************************************************************/

if (window.location.pathname == "/main_c.html" || window.location.pathname == "/main.html") {

	setTimeout('if (window["checkForUpdate"]) checkForUpdate("recipes","2.0","Recipes","http://somestranger.kol.googlepages.com/tardskolscripts_recipes.user.js");',1000);

} else {
	var isRecipePage = true;
	var specialLocation = 'none';
	if (window.location.pathname.indexOf("gnomes.php") != -1 && document.getElementsByTagName("body")[0].innerHTML.indexOf("Gnorman") == -1) isRecipePage = false;
	if (window.location.pathname.indexOf("knoll.php") != -1 && document.getElementsByTagName("body")[0].innerHTML.indexOf("I'm Innabox the Smith") == -1 && document.getElementsByTagName("body")[0].innerHTML.indexOf("I am known as The Plunger") == -1) isRecipePage = false;
	//makes recipes dropdown not appear on the "discoveries" page
	if (window.location.href.indexOf("discoveries") > 0) isRecipePage = false;
	//
	
	if (window.location.pathname.indexOf("knoll.php") != -1) {
		if(document.getElementsByTagName("body")[0].innerHTML.indexOf("The Plunger") != -1) {
			specialLocation = 'plunger';
		}
		else if(document.getElementsByTagName("body")[0].innerHTML.indexOf("I'm Innabox the Smith") != -1) {
			specialLocation = 'innabox';
		}
	}
		
	function addGlobalStyle(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}
	addGlobalStyle(<r><![CDATA[
		.organizedSelect optgroup + optgroup {
			margin-top:.5em;
		}
		.organizedSelect:hover {
			padding:1px;
			border:1px blue solid;
		}
		.organizedSelect {
			margin-right:10em;
		}
		label {
			margin-bottom: .5em;
			float:left;
			text-align: right;
			padding-right: 20px;
			width: 7em;
		}
		label.disabled {
			color:gray;
		}
		.toggler {
			font-size:.5em;
			cursor:pointer;
			margin-right:10px;
		}
		span.toggler:hover {
			color: dimgray;
		}
		#submitButton {
		  float:left;
		}
		#skillTimesDiv {
		  float:left;
		  margin-left:10px;
		  margin-right:5px;
		  height:1.2em;
		  min-width:50px;
			width: 4.1em;
			border:1px solid black;
			min-height:18px;
		}
		#secondLineWrapper {
		  margin-left:7em;
		  padding-left:20px;
			margin-top:.4em;
			text-align:left;
		}
		#skilltimes {
		  min-height:inherit;
			border:none;
		}
			 	
			 	
		#selectForm {
			min-width:20em;
			text-align:left;
			white-space:nowrap;
		}

		#queueHolder {
			text-align:left;
			height:100%;
			float:left;
			clear:left;
			width:60%;
		}
		#queueStatusDiv {
			padding:2px;
			margin-bottom:3px;
			font-size:8pt;
			border: 1px solid gray;
		}
		#queue {
			border: 1px solid gray;
			position:relative;
			list-style-position:inside;
			padding:1px;
			text-align:left;
			font-size:8pt;
			height:15em;
			overflow-y:scroll;
			overflow-x:hidden;
		}
		#groupInterface {
			white-space:nowrap;
			float:right;
			width:38%;
		}
		#groupInterface select {
			border:1px solid gray;
			margin-top:10px;
			margin-bottom:10px;
			height:14em;
			width:80%;
		}
		#queue span.removeElement {
			position:absolute;
			right:0;
			font-size:10pt;
			font-weight: bold;
			cursor:pointer;
		}
		#clearQueue {
			margin-left:3em;
			font-size:9pt;
			text-decoration:underline;
			cursor:pointer;
		}
		#clearQueue:hover {

			color:gray;
		}
		#queue span.removeElement:hover {
			color:gray;
		}
		#queue li {
			padding-right:1em;
			border-bottom:1px solid lightgray;
		}
		input.groupFloat {
			margin-top:10px;
			cursor:pointer;
			width:2em;
			height:2em;
			padding:0;
			float:left;
			clear:left;
			margin-right:4px;
		}
		div.queueLabel {
			position:relative;
			font-weight:bold;
			text-align:center;
			border-bottom: 1px solid blue;
		}
		input.button {
			cursor:pointer;
		}
		div.queueAreaCost {
				position: absolute;
				right:0;
				top:4px;
				font-weight:normal;
				text-align:right;
				font-size:9pt;
		}
			
		]]></r>.toString());
		
	
	if (isRecipePage) {
		var sType = window.location.pathname.substring(1,window.location.pathname.length-4);
		if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Plunger") != -1) sType = "combine";
		else if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Innabox") != -1) sType = "smith";
		//sets the crafting type according to whatever's after the = (so it'll work with the new interface)
		if (sType == "craft")
		{
			if (window.location.href.indexOf("=")<0)
				sType=document.forms[0].elements[0].value;
			else
				sType=window.location.href.substring(window.location.href.indexOf("=")+1,window.location.href.length);
		}
		//
	
		var newDiv = document.createElement("div");
		newDiv.id = "recipes";
		document.getElementsByTagName("center")[0].insertBefore(newDiv,document.getElementsByTagName("table")[0]);
		var oDiv = document.getElementById("recipes");
		with(oDiv.style) {width = "95%";marginBottom="5px"}
	
		newDiv = document.createElement("div");
		with(newDiv) {id = "recipeHeader";innerHTML = "Recipes:";}
		with(newDiv.style) {background = "blue";textAlign = "center";fontSize = "16px";color="white";fontWeight="bold";}
		oDiv.appendChild(newDiv);
	
		newDiv = document.createElement("div");
		with(newDiv) {id = "recipeContent";}
		with(newDiv.style) {textAlign = "center";fontSize = "11px";border="1px solid blue";borderTop="0px";padding="5px";}
		oDiv.appendChild(newDiv);
		
	
		var aSelects = document.getElementsByTagName("select");
		var invList = ") ";
		//The Plunger/Innabox can have three dropdowns instead of two, so this part had to be changed to make the recipes dropdown work
		var numBoxes=1;
		var firstBox=0;
		var secondBox=1;
		if (specialLocation!="none" && document.getElementsByTagName("body")[0].innerHTML.indexOf("or just") != -1)
		{
			numBoxes++;
			firstBox++;
			secondBox++;
		}
		if (aSelects && aSelects.length > numBoxes) {
			for (var i=1;i<aSelects[secondBox].options.length;i++) {
				if (aSelects[secondBox].options[i] && aSelects[1].options[i].text) {
					var str = aSelects[secondBox].options[i].text;
					if (str.indexOf("E-Z Cook Oven") == 0) {
						str = str.substring(0,13) + str.substring(14,str.length);
						aSelects[firstBox].options[i].text = str;
						aSelects[secondBox].options[i].text = str;
					} else if (str.match(/jaba.ero\spepper/)) {
						str = "jabanero pepper" + str.substr(str.indexOf("pepper")+6);
						aSelects[firstBox].options[i].text = str;
						aSelects[secondBox].options[i].text = str;
					}
					invList += str.toLowerCase() + " ";
				}
			}
		}
		//
		
		function insertOptions(str) {
			function checkItemQty(item,q) {
				var b = true;
				var s = ") " + item + " (";
				var i0 = invList.indexOf(s);
				var i1 = invList.indexOf(") ",i0+s.length);
				var itemQty = invList.substring(i0+s.length,i1);
				if (itemQty < q) b = false;
				return b
			}
			////custom function needed to determine starchart recipes
			function checkItemQtyStarchart(need,have)
			{
				var b = true;
				//have to manually convert to ints, otherwise comparisons don't work
				var starsHave=parseInt(have[0]);
				var linesHave=parseInt(have[1]);
				
				if (starsHave<need[0] || linesHave<need[1]) b=false;
				return b;
			}
			////
			if (sType == "starchart" || aSelects.length > 1) {
				var tmp = [];
				var aLines = str.match(/.+/g);
				tmp.push('<select id="recipeSelect" onChange="setCombine(this.options[this.selectedIndex])"><option value="">- select a recipe-</option>');
				for (var i in aLines) {
					var addOption = true;
					var aL = aLines[i].split("|");
					var aD = (aL[2] ? aL[2] : "");
					////separate starchart section needed to properly determine recipes
					if (sType=="starchart")
					{
						var aC = aL[1].split(",");
						var line = document.getElementsByTagName("td")[2].innerHTML.substring(
										document.getElementsByTagName("td")[2].innerHTML.indexOf("have")+5,
										document.getElementsByTagName("td")[2].innerHTML.indexOf("lines.")-1);
						var starsLines = line.split(" stars and ");
						addOption = checkItemQtyStarchart(aC,starsLines);
						
					}
					else {
						var aC = aL[1].split(",");
						hasItems = true;
						for (var c in aC) {
							if (invList.indexOf(") " + aC[c] + " (") == -1) hasItems = false;
						}
						if (hasItems) {
							if (aC[0] == aC[1]) {
								addOption = checkItemQty(aC[0],2);
							}
							if (aC[0] == aC[2]) {
								addOption = checkItemQty(aC[0],2);
							}
							if (aC[1] == aC[2]) {
								addOption = checkItemQty(aC[1],2);
							}
							if (aC[0] == aC[1] && aC[1] == aC[2]) {
								addOption = checkItemQty(aC[0],3);
							}
						} else {
							addOption = false;
						}
					}
					if (addOption) tmp.push('<option value="' + aL[1] + '" title="' + aD + '">' + aL[0] + '</option>');
				}
				tmp.push('</select><div id="recipeDesc" style="font-size:12px;"></div>');
				if(tmp.length > 0) str = tmp.join('');
				document.getElementById("recipeContent").innerHTML = str;
			}
		}
		
	      var curDate = new Date();
	      var defDate = new Date();
	      defDate.setDate(curDate.getDate() - 2);
	      var lastChecked = GM_getValue("recipe_"+sType+"_Last_Checked",defDate.toString());
	      if ((GM_getValue("recipe_"+sType,"") != "") && (curDate.getTime() < (Date.parse(lastChecked) + 86400000)))  {
	         insertOptions(GM_getValue("recipe_"+sType,""));
	      } else {
	         GM_xmlhttpRequest({
	          method: 'GET',
	          url: 'http://majestius.webs.com/'+sType+'.txt',
	          headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
	          onload: function(responseDetails) {
	               if (responseDetails.status == "200") {
	                  var strR = responseDetails.responseText;
	                  insertOptions(strR);
	                  GM_setValue("recipe_"+sType,strR);
	                  GM_setValue("recipe_"+sType+"_Last_Checked",curDate.toString());
	               }
	          }
	         });
	      } 
		
		setTimeout('setCombine = function(op) {' +
			'var val = op.value;' +
			'if (val != "") {' +
				'var type = "' + sType + '";' +
				'var a = val.split(",");' +
				'if (type == "starchart") {' +
					'ops = document.getElementsByTagName("input");' +
					'ops[2].value = a[0];' +
					'ops[3].value = a[1];' +
				'} else {' +
					'selects = document.getElementsByTagName("select");' +
					////had to change this part slightly to get The Plunger/Innabox dropdowns to change correctly
					'var increment=1;' +
					'if(document.getElementsByTagName("body")[0].innerHTML.indexOf("or just") != -1)' +
						'increment++;' +
					'for (var i=0;i<=2;i++) {' +
						'if (selects[i+increment]) {' +
							'for (var j=0;j<selects[i+increment].options.length;j++) {' +
								'str = selects[i+increment].options[j].text;' +
								'str = str.toLowerCase();' +
								'if (str.indexOf(a[i]+ " (") == 0) {' + 
									'selects[i+increment].selectedIndex = j;' +
									'break;' +
					////
								'}' +
							'}' +
						'}' +
					'}' +
				'}' +
				'document.getElementById("recipeDesc").innerHTML = (op.title != "" ? op.title : "");' +
			'}' +
		'}',10);
		
		function GM_post( dest, vars, callback ) {
			 GM_xmlhttpRequest({
			    method: 'POST',
			    url: 'http://'+document.location.host + dest,
			    headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: vars,
					onload:function(details) {
						if( typeof callback=='function' ){
							callback( details.responseText);
						}
					}
			});
		}


		

		function getPID(callback,failedCallback) {
			if(unsafeWindow.top.playerId == undefined) {
				GM_xmlhttpRequest({
			    method: 'GET',
			    url: 'http://' + document.location.host + '/charsheet.php',
			    onload: function(details) {	
				  	playerId = /href="showplayer.php\?who=(\d+)"/.exec(details.responseText);
				  	if(playerId)
				  	{ 
				  		playerId=playerId[1]; 
				  		unsafeWindow.top.playerId = playerId;
						  if(typeof callback == "function") {
								callback();
							}
				  	}	else {	  	
						  if(typeof failedCallback == "function") {
								failedCallback();
							}
				  	}

					}
				});
			} else {
				playerId = unsafeWindow.top.playerId;
			  if(typeof callback == "function") {
					callback();
				}
			}
		}
		function status(note) {
			if(queueStatusInfo.childNodes.length>0) {
				queueStatusInfo.firstChild.nodeValue = note;
			} else {
				queueStatusInfo.appendChild(document.createTextNode(note));
			}
		}
		function getItemIndex(item,object) {
			for (var i=0;i<object.length;i++) {
				if(item==object[i])return i;
			}
			return -1;
		}
		function removeChildNodes(parent){
			while(parent.hasChildNodes()){
				parent.removeChild(parent.lastChild)
			}
		}
		function storeQueue() {
			GM_setValue("currentQueue_"+sType+playerId,currentQueue.toSource());
		}
		function storeGroups() {
			GM_setValue("storedGroups_"+sType+playerId,storedGroups.toSource());
		}
		function finished() {
			updateQueue('done');
		}
		function updateQueue(action,info) {
			switch(action) {				
				case "add":
					addLiToQueue(info);
					//push info to queue array
					currentQueue.push(info);
				break;
				case "clear":
					currentQueue.length=0;
					removeChildNodes(queue);
				break;
				case "populate":
					if(typeof currentQueue != "undefined") {
						for(var i=0;i<currentQueue.length;i++) {
							var queueItem = currentQueue[i];
							addLiToQueue(queueItem);
						}
					}
				break;
				case "remove":
					var arrayIndex = getItemIndex(info,info.parentNode.getElementsByTagName('li'));
					if(arrayIndex==-1)GM_log('Oh bugger.');
					info.parentNode.removeChild(info);
					currentQueue.splice(arrayIndex,1);
				break;
				case "fail":
					status("Item failed: removing from list");
					currentQueue.splice(0,1);
					queue.removeChild(queue.firstChild);
				break;
				case "success":
					status("Item creation successful");
					//remove top item from queuearray and list.
					currentQueue.splice(0,1);
					queue.removeChild(queue.firstChild);
				break;
				case "addGroups":
					for(var i=0;i<groupSelect.options.length;i++) {
						if(groupSelect.options[i].selected) {
							for(var x=0;x<storedGroups[i][0].length;x++) {
								var tempGroup = storedGroups[i][0][x];
								//try to update skill cost
								addLiToQueue(tempGroup);
							}
							currentQueue=currentQueue.concat(storedGroups[i][0]);
						}
					}
				break;
				case "done":
					status("Adding failed items back in");
					var failedCount=0;
					for(var i=0;i<failedQueue.length;i++) {
						failedCount++
						currentQueue.unshift(failedQueue[i]);
						addLiToQueue(failedQueue[i],true);
					}
					status("Done! ("+failedCount+" failed items(s))");
					window.document.location = window.document.location;
				break;
		}
		storeQueue();
		}
		//get player id 
		pidFail=false;
		//check for player id in mainpage.
			
		options=document.getElementsByTagName('option');
		var foundId=false;
		for(var i=0;i<options.length;i++) {
			if(options[i].firstChild.nodeValue == "(yourself)") {
				playerId = options[i].value;
				foundId=true;
				break;
			}
		}
		if(!foundId) {
			var y;
			menuSrc = top.frames[0].document.body.innerHTML.toSource();
			if(y=/donatepopup.php\?pid=(\d*)\\/.exec(menuSrc))	{
				playerId=y[1];
				createQueue();
			}	else	{
				getPID(createQueue,noQueue);
			}
		} else {
			createQueue();
		}
	}

}

