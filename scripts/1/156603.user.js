// ==UserScript==
// @author         Raaaak (original author Lunatrius)
// @id             BvSMissionTweak@Raaaak
// @name           BvS Mission Tweak
// @namespace      BvS-Raaaak
// @description    A simple mission tweak that saves mission information for future reference.
// @include        http://www.animecubed.com/billy/bvs/missions/mission1.html
// @include        http://animecubed.com/billy/bvs/missions/mission1.html
// @match          http://www.animecubed.com/billy/bvs/missions/mission1.html
// @match          http://animecubed.com/billy/bvs/missions/mission1.html
// @include        http://www.animecubed.com/billy/bvs/missionstart.html
// @include        http://animecubed.com/billy/bvs/missionstart.html
// @match          http://www.animecubed.com/billy/bvs/missionstart.html
// @match          http://animecubed.com/billy/bvs/missionstart.html
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAADAFBMVEUAAABx8fy5jAD+0gEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqPlZHAAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AU/cHJQAAAIlJREFUeNqt00EOg0AMQ9Hv5v5npiK1lAWedIOFwsJPmWEB15+8CWAHVMEKPlXFAizYwC0KErAw6WRg0iwB9/f7uaGFW+Bwh2kDwC0UCeC6+hnA9MgARNiAmIxgqH4BpABaAFbnDU2o4gzYQHc+YgMoAAtgBR47QBEgugNFgNw54TOhh/Pqv7nnCwZJtKVcz7uIAAAAAElFTkSuQmCC
// @priority       5
// @version        0.5.4
// @history        0.1 Initial release
// @history        0.2 Fixed an issue with duplicates
// @history        0.3 Moved the code into an anonymous function
// @history        0.3 Added a floating window that shows all saved events (SHIFT+1)
// @history        0.4 Added a simple debug method
// @history        0.4.1 Added a prefix for hidden events
// @history        0.4.1 Removed https
// @history        0.4.2 Fixed a bug
// @history        0.4.3 Changed the script icon
// @history        0.4.3 Optimized some code
// @history        0.4.4 Jungle mission fix
// @history        0.4.5 indexedDB fix
// @history        0.4.6 Another indexedDB fix
// @history        0.5 Added export/import
// @history        0.5.1 Fixed a Chrome issue
// @history        0.5.2 Replaced the deprecated setVersion call with the onupgradeneeded event handler
// @history        0.5.2.1 Fixed a minor issue with database creation
// @history        0.5.3 Fixed a Firefox issue
// @history        0.5.4 fixed issue with reading Crank after Flipper autograph
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2013, Raaaak. (based on code by Lunatrius (0.5.3 and earlier))
// @run-at         document-end
// ==/UserScript==

(function() {
	var debug = false;

	/***************************************************************
	 * Name: DOM Storage Wrapper Class
	 * Author: Lunatrius <lunatrius@gmail.com>
	 *
	 * Public members:
	 *     ctor({"session"|"local"}[, <namespace>])
	 *     set(<key>, <value>)
	 *     get(<key>, <default value>)
	 *     remove(<key>)
	 *     keys()
	 *     removeAll()
	 ***************************************************************/
	var DomStorage=function(f,e){const c=this;var d,h,g,b,a;if(typeof(f)!="string"){f="session"}if(!e||typeof(e)!="string"&&typeof(e)!="number"){e="script"}switch(f){case"local":d=localStorage;break;case"session":default:d=sessionStorage;break}e=["lunatrius",e].join(".").replace(/[^a-z0-9\.-]/gi,"_");c.set=function(i,j){d.setItem([e,i].join(".").replace(/[^a-z0-9\.-]/gi,"_"),JSON.stringify(j))};c.get=function(j,i){h=JSON.parse(d.getItem([e,j].join(".").replace(/[^a-z0-9\.-]/gi,"_")));if(h){return h}return i};c.remove=function(i){d.removeItem([e,i].join(".").replace(/[^a-z0-9\.-]/gi,"_"))};c.keys=function(){g=[];for(a=d.length-1;a>=0;a--){b=d.key(a).replace([e,""].join("."),"");if(b!=d.key(a)){g.push(b)}}g.sort();return g};c.removeAll=function(){g=c.keys();for(a=g.length-1;a>=0;a--){c.remove(g[a])}}};

	/***************************************************************
	 * Name: Floating Window Wrapper Class
	 * Author: Lunatrius <lunatrius@gmail.com>
	 *
	 * Public members:
	 *     ctor(<id>, <dom storage>[, <close button {true|false}>])
	 *     show(<display {true|false}>)
	 *     setTitle(<title html text>)
	 *     setContent(<content html text>)
	 *     appendChild(<HTMLElement>)
	 *     addSubtitle(<sub title html text>)
	 *     addContent(<content html text>[, <element id>])
	 *     addCss(<selector>, {"css key": "css value"[, ...]}[, <namespace>])
	 *     clearCss([<namespace>])
	 *     toggleCss({true|false}[, <namespace>])
	 ***************************************************************/
	var FloatingWindow=function(v,J,q){const n=this,M=document,A=M.body,e=window,d=2,c=["floatingwindowver",d].join("");var K=0,I=0,F=false,b,r,p,u,a,D,G,L,C,f,E,o,H,g,B,i,m,k,j,h,z={},l;v=v.replace(/[^a-z0-9]/gi,"_");b=M.createElement("div");b.id=v;b.className=c;r=M.createElement("h1");r.textContent=["Window #",v].join("");p=M.createElement("div");p.className="body";p.textContent="";u=M.createElement("div");u.className="foot";u.textContent="close";b.appendChild(r);b.appendChild(p);if(q==true){b.appendChild(u)}A.appendChild(b);a=function(t){if(t.button!=0){F=false;return}t.preventDefault();K=t.clientX-parseInt(b.style.left);I=t.clientY-parseInt(b.style.top);F=true;b.style.opacity=0.75;e.addEventListener("mouseup",D,false);e.addEventListener("mousemove",G,false)};D=function(t){if(F){F=false;m=parseInt(b.style.left);k=parseInt(b.style.top);J.set([v,"coord"].join("."),{x:m,y:k});b.style.opacity=1;e.removeEventListener("mouseup",D,false);e.removeEventListener("mousemove",G,false)}};G=function(t){if(F){t.preventDefault();m=t.clientX-K;k=t.clientY-I;j=e.innerWidth-b.offsetWidth-20;h=e.innerHeight-b.offsetHeight-20;if(m>j){m=j}if(k>h){k=h}if(m<4){m=4}if(k<4){k=4}b.style.left=[m,"px"].join("");b.style.top=[k,"px"].join("")}};L=function(){n.show(false)};C=J.get([v,"coord"].join("."),{x:10,y:10});b.style.top=[C.y,"px"].join("");b.style.left=[C.x,"px"].join("");r.addEventListener("mousedown",a,false);u.addEventListener("click",L,false);o=function(){const N=this;var t=[],y,x;N.add=function(O,P){y=[];for(x in P){y.push(["\t",x,": ",P[x],";\n"].join(""))}t.push([O," {\n",y.join(""),"}"].join(""))};N.clear=function(){t=[]};N.getText=function(){return t.join("\n\n")}};B=M.getElementById(c);if(!B){B=M.createElement("style");B.type="text/css";B.id=c;B.textContent="";M.getElementsByTagName("head")[0].appendChild(B);H=new o();H.add([".",c].join(""),{"font-family":"arial","font-size":"12px","background-color":"#D8E7F4",border:"2px solid #21416D","border-radius":"7px","-moz-border-radius":"7px",position:"fixed",margin:"0",padding:"1px","z-index":"9999"});H.add([".",c," *"].join(""),{"font-family":"arial","font-size":"12px",border:"0",margin:"0",padding:"0"});H.add([".",c," > h1"].join(""),{"font-size":"13px",color:"#313A47","background-color":"#9CC6FF","border-radius":"5px 5px 0 0","-moz-border-radius":"5px 5px 0 0",display:"block",padding:"4px",cursor:"move"});H.add([".",c," > div.body p, .",c," > div.body div"].join(""),{margin:"3px",padding:"0 8px 0 5px"});H.add([".",c," > div.body h2"].join(""),{color:"#313A47","font-size":"13px","background-color":"#BAD6F9",display:"block",margin:"7px 0 0 0",padding:"4px"});H.add([".",c," > div.body h2:first-child"].join(""),{margin:"0"});H.add([".",c," > div.foot"].join(""),{"font-size":"10px","text-align":"center",color:"#313A47","background-color":"#9CC6FF","border-radius":"0 0 5px 5px","-moz-border-radius":"0 0 5px 5px",display:"block",padding:"2px",cursor:"pointer"});B.textContent=H.getText()}g={};i=M.getElementById(["floatingwindow",v].join(""));if(!i){i=M.createElement("style");i.type="text/css";i.id=["floatingwindow",v].join("");i.textContent="";M.getElementsByTagName("head")[0].appendChild(i)}n.show=function(t){b.style.display=(t==false)?"none":""};n.setTitle=function(t){r.innerHTML=t};n.setContent=function(t){p.innerHTML=t};n.appendChild=function(t){p.appendChild(t)};n.addSubtitle=function(t){f=M.createElement("h2");f.innerHTML=t;p.appendChild(f)};n.addContent=function(t,x){E=M.createElement("div");E.innerHTML=t;if(x&&x.length>0){E.id=x}p.appendChild(E)};n.addCss=function(t,y,x){if(!x){x="default"}if(!g[x]){g[x]=new o();z[x]=true}g[x].add(["#",v," ",t].join(""),y);l()};n.clearCss=function(t){if(!t){t="default"}if(g[t]){g[t].clear();z[t]=false;l()}};n.toggleCss=function(t,x){if(!x){x="default"}if(g[x]){if(z[x]!=t){z[x]=t==true;l()}}};l=function(){var t=[];for(var x in g){if(z[x]==true){t.push(g[x].getText())}}i.textContent=t.join("\n\n")}};

	// utility method
	var isChrome = (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0);
	var isFirefox = (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0);
	log = debug ? (isChrome ? function(message) {console.log(message);} : (isFirefox ? GM_log : alert) ) : function() {}

	// a simple library object
	var Utils = {
		// return a hash (number) for any given string
		hash: function(str) {
			var hash = 5381;
			for(var i = 0; i < str.length; i++)
				hash = (hash * 33 + str.charCodeAt(i)) % 4294967296;
			return hash;
		},

		// strip whitespace from the beginning and end, replace multiple whitespace with a space
		strip: function(str) {
			str = str.replace(/^\s+/, "");
			str = str.replace(/\s+$/, "");
			str = str.replace(/\s+/g, " ");
			return str;
		},

		// extract plain text from the node(s) determined by the xpath, separated by semicolons (can be changed by passing a second argument)
		concatText: function(xpath, delim) {
			var str = "";
			var textNodes = [];
			var textSnap = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for(var i = 0; i < textSnap.snapshotLength; i++) {
				str = Utils.strip(textSnap.snapshotItem(i).textContent);
				if(str === "")
					continue;
				textNodes.push(str);
			}
			return textNodes.join(delim === undefined ? ";" : delim);
		},

		// return a list of nodes that were found by the given xpath
		nodes: function(xpath) {
			var nodes = [];
			var snap = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for(var i = 0; i < snap.snapshotLength; i++)
				nodes.push(snap.snapshotItem(i));
			return nodes;
		},

		// insert an element to the location specified by xpath
		insertElement: function(xpath, element, before) {
			var pos = document.evaluate(xpath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			if(!pos)
				throw "No matching element found!";
			if(before)
				pos.parentNode.insertBefore(element, pos);
			else
				pos.parentNode.insertBefore(element, pos.nextSibling);
		},

		// return the playername
		playerName: function() {
			if(Utils.player.length > 0)
				return Utils.player;
			try {
				Utils.player = document.evaluate("//input[@name='player' and @type='hidden']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
			}
			catch(e) {
				Utils.player = "none";
			}
			return Utils.player;
		},

		player: ""
	};

	// a simple class that holds mission information
	var MissionData = function() {
		// variables
		const t = this;
		t.uhash = -1;
		t.hash = -1;
		t.name = "";
		t.desc = "";
		t.gen = "";
		t.nin = "";
		t.tai = "";
		t.dou = "";
		t.type = "";
		t.eventType = "";
		t.eventAmount = 1;
		t.eventName = "";

		// generate and return a unique hash
		t.uid = function() {
			t.uhash = Utils.hash([t.name, t.desc, t.gen, t.nin, t.tai, t.dou, t.type, t.eventType, t.eventAmount, t.eventName].join(":"));
			return t.uhash;
		}

		// generate and return a hash
		t.id = function() {
			t.hash = Utils.hash([t.name, t.desc, t.gen, t.nin, t.tai, t.dou].join(":"));
			return t.hash;
		}

		// return all the components as an array
		t.array = function() {
			return [t.uid(), t.id(), t.name, t.desc, t.gen, t.nin, t.tai, t.dou, t.type, t.eventType, t.eventAmount, t.eventName];
		}

		// return all the components as an object
		t.object = function() {
			return {uid: t.uid(), id: t.id(), name: t.name, desc: t.desc, gen: t.gen, nin: t.nin, tai: t.tai, dou: t.dou, type: t.type, eventType: t.eventType, eventAmount: t.eventAmount, eventName: t.eventName};
		}

		// return true if the object is valid, false otherwise
		t.valid = function() {
			if(t.name === "" || t.desc === "" || t.type === "" || t.eventType === "" || t.eventName === "" || (t.gen === "" && t.nin === "" && t.tai === "" && t.dou === "")){
				log("Object is not valid");
				log("Object data is::");
				log("\tname:  " + t.name);
				log("\tdesc: " + t.desc);
				log("\ttype: " + t.type);
				log("\teventType: " + t.eventType);
				log("\teventName: " + t.eventName);
				log("\tgen: " + t.gen);
				log("\tnin: " + t.nin);
				log("\ttai: " + t.tai);
				log("\tdou: " + t.dou);
				return false;
				}
			log("object is valid");
			return true;
		}
	}

	// the main class that does most of the work
	var MissionTweak = function() {
		// variables
		const t = this;
		t.db = null;
		t.VERSION = undefined;

		// set up an error handler for indexedDB
		t.errorHandler = function(errorCode) {
			switch(errorCode) {
				case IDBDatabaseException.CONSTRAINT_ERR:
					// do nothing, the entry is already in the database :)
					break;
				default:
					alert(["Database error: ", e.target.errorCode].join(""));
					break;
			}
		}

		// parse the given text and return a MissionData object
		t.parseMission = function(str) {
			var missionData = new MissionData();
			var stats = [];
			var parts = str.split(/;ability #\d+: /i);
			var crank = str.match(/\+(\d+) Diff, \+\d+ Succ, \+\d+% Ryo/i);
			crank = crank ? parseInt(crank[1]) : 0;
			log("Parsed crank level after autograph as: " + crank);

			log("Trying to match in string: " + parts[0]);
			var match = parts[0].match(/(\w+)jutsu;([^;]+);([^;]+)(;crank level: \d+;[^;]+)?(;flipper autograph, \d+% power! \d+ free crank level[s]?!)?;difficulty (\d+) successes (\d+)/i);
			if(match) {
				log("Match succeeded!");
				missionData.name = /^[a-z0-9 ]+ Monument$/i.test(match[2]) ? "PlayerKai Monument" : match[2];
				missionData.desc = match[3];
				stats.push({type: match[1], dif: match[6], suc: match[7]});
			}

			for(var i = 1; i < parts.length; i++) {
				var match = parts[i].match(/(\w+)jutsu;difficulty (\d+) successes (\d+)/i);
				if(match) {
					stats.push({type: match[1], dif: match[2], suc: match[3]});
				}
			}

			for(var i = 0; i < stats.length; i++) {
				var stat = [stats[i].dif - crank, stats[i].suc - crank].join("/");
				switch(stats[i].type.toLowerCase()) {
					case "gen": missionData.gen = stat; break;
					case "nin": missionData.nin = stat; break;
					case "tai": missionData.tai = stat; break;
					case "dou": missionData.dou = stat; break;
				}
			}

			return missionData;
		}

		// strip down the reward text
		t.stripReward = function(str, numbers) {
			str = str.replace(/received/gi, "");
			str = str.replace(/[!\+,]/gi, "");
			if(numbers === true)
				str = Utils.strip(str).replace(/^\d+/i, "");
			else
				str = Utils.strip(str).replace(/s$/i, "");
			return Utils.strip(str);
		}

		// the main entry point
		t.main = function() {
			if(/animecubed.com.billy.bvs.missions.mission1.html/i.test(location.href)) {
				// get the mission text
				var missionText = Utils.concatText("//div[@class='miscontainer']//text()");

				// generate a MissionData object from the mission text
				var missionData = t.parseMission(missionText);

				// get the next mission button
				var imageNodes = Utils.nodes("//img[contains(@src,'/billy/layout/nextmission')]");

				// get the mission type variable
				var missionType = cfg.get([Utils.playerName(), "missiontype"].join("."), "?");

				// there is a mission button
				if(imageNodes.length === 1) {
					var match = imageNodes[0].src.match(/nextmission(\w+).gif/i);
					if(match) {
						missionData.type = match[1].replace(/(gen|nin|tai)$/i, "");
					}
				}
				// there's no button, check our variable
				else if(missionType !== "?" && missionType.length > 0) {
					missionData.type = missionType;
				}

				// get all event tables
				var tableNodes = Utils.nodes("//table[count(descendant::table)=0 and count(descendant::form)=0]");

				// the mission is not a megamission
				var megaMission = false;

				// parse the event
				for(var i = 0; i < tableNodes.length; i++) {
					var node = tableNodes[i];
					var text = node.textContent;

					if(/special event!/i.test(text)) {
						var b = node.getElementsByTagName("b")[0];
						missionData.eventType = "special";
						var match = t.stripReward(b.textContent).match(/^(\d+)/);
						if(match)
							missionData.eventAmount = parseInt(match[1]);
						missionData.eventName = t.stripReward(b.textContent, true).replace(/Contracts/i, "Contract");
					}
					else if(/you got an item!/i.test(text)) {
						var b = node.getElementsByTagName("b")[0];
						missionData.eventType = "item";
						missionData.eventName = t.stripReward(b.textContent, true);
					}
					else if(/you got an ally!/i.test(text)) {
						var b = node.getElementsByTagName("b")[0];
						missionData.eventType = "ally";
						missionData.eventName = t.stripReward(b.textContent, true);
					}
					else if(/you analyzed a jutsu!/i.test(text)) {
						var b = node.getElementsByTagName("b")[0];
						missionData.eventType = "jutsu";
						missionData.eventName = t.stripReward(b.textContent, true);
					}
					else if(/level up!/i.test(text)) {
						var b = node.getElementsByTagName("b")[0];
						if(!/level up!/i.test(b.textContent)) {
							missionData.eventType = "level";
							missionData.eventName = t.stripReward(b.textContent, true);
						}
					}

					if(/megamissions enabled!/i.test(text)) {
						megaMission = true;
					}
				}

				// if the mission event is a special event and it's a megamission divide by 11
				if(missionData.eventType === "special" && megaMission === true) {
					missionData.eventAmount = parseInt(missionData.eventAmount / 11);
				}

				// if the mission data is valid, add it to indexedDB
				if(missionData.valid() === true) {
					var transaction = t.db.transaction(["Events"], "readwrite");

					transaction.oncomplete = function(e) {
						// no nothing
					}

					transaction.onerror = function(e) {
						t.errorHandler(e.target.errorCode);
					}

					var os = transaction.objectStore("Events");
					var request = os.add(missionData.object());
					request.onsuccess = function(e) {
						// do nothing, the entry was added
					}

					request.onerror = function(e) {
						t.errorHandler(e.target.errorCode);
					}
				}

				// display all events that can occur in the current mission
				var os = t.db.transaction(["Events"], "readwrite").objectStore("Events").index("id");
				os.openCursor(IDBKeyRange.only(missionData.id())).onsuccess = function(e) {
					var cursor = e.target.result;
					if(cursor) {
						var event = cursor.value;
						var table = document.createElement("table");
						var tr = document.createElement("tr");
						var td = document.createElement("td");

						table.style.width = "380px";
						table.style.border = "1px double rgb(57, 176, 118)";
						table.style.backgroundColor = "rgb(184, 228, 183)";
						table.style.margin = "5px";
						td.style.textAlign = "center";

						switch(event.eventType) {
							case "special":
								table.style.border = "1px double rgb(185, 112, 182)";
								table.style.backgroundColor = "rgb(232, 212, 231)";
								td.textContent = "Special event: ";
								break;
							case "item":
								table.style.border = "1px double rgb(176, 57, 118)";
								table.style.backgroundColor = "rgb(228, 184, 183)";
								td.textContent = "Item: ";
								break;
							case "ally":
								table.style.border = "1px double rgb(57, 112, 182)";
								table.style.backgroundColor = "rgb(184, 212, 231)";
								td.textContent = "Ally: ";
								break;
							case "level":
								table.style.border = "1px double rgb(57, 176, 118)";
								table.style.backgroundColor = "rgb(184, 228, 183)";
								td.textContent = "Ally level up: ";
								break;
							case "jutsu":
								table.style.border = "1px double rgb(118, 57, 176)";
								table.style.backgroundColor = "rgb(183, 184, 228)";
								td.textContent = "Jutsu: ";
								break;
						}

						var b = document.createElement("b");
						if(event.eventType === "special")
							b.textContent = [event.eventAmount * (megaMission === true ? 11 : 1), " ", event.eventName].join("");
						else
							b.textContent = event.eventName;

						td.appendChild(b);
						tr.appendChild(td);
						table.appendChild(tr);
						Utils.insertElement("//div[@class='miscontainer']", table, false);

						cursor.continue();
					}
				}
			}

			// get all event tables
			var tableNodes = Utils.nodes("//table[count(descendant::table)=0 and count(descendant::form)=0]");

			// the mission is not a megamission
			var megaMission = false;

			// parse the tables
			for(var i = 0; i < tableNodes.length; i++) {
				var text = tableNodes[i].textContent;
				if(/megamissions active!/i.test(text) || /megamissions enabled!/i.test(text)) {
					megaMission = true;
				}
			}

			var updateMissions = function() {
				// prepare variables
				var events = {};
				var eventList = [];
				var missionTypes = [
					{"id": "s", "name": "S-Rank", "bg": "#33ECA1"},
					{"id": "jn", "name": "Jungle", "bg": "#11590A"},
					{"id": "witch", "name": "Witching Hour", "bg": "#FF2710"},
					{"id": "pizza", "name": "PizzaWitch", "bg": "#FD3014"},
					{"id": "burger", "name": "BurgerNinja", "bg": "#EBDA17"},
					{"id": "wasteland", "name": "Wasteland", "bg": "#A00316"},
					{"id": "outskirts", "name": "Outskirts", "bg": "#A00316"},
					{"id": "monochrome", "name": "Monochrome", "bg": "#230270"},
					{"id": "reaper", "name": "Reaper", "bg": "#6635E6"},
					{"id": "aa", "name": "AA-Rank", "bg": "#33E2E1"},
					{"id": "a", "name": "A-Rank", "bg": "#9FEC33"},
					{"id": "b", "name": "B-Rank", "bg": "#E7D135"},
					{"id": "c", "name": "C-Rank", "bg": "#E88234"},
					{"id": "d", "name": "D-Rank", "bg": "#D3782F"}
				];

				// display all events on the floating window
				var os = t.db.transaction(["Events"], "readwrite").objectStore("Events").index("id");
				os.openCursor().onsuccess = function(e) {
					var cursor = e.target.result;
					if(cursor) {
						var event = cursor.value;
						if(!events[event.type])
							events[event.type] = [];

						// push the event to our stack
						events[event.type].push({
							"uid": event.uid,
							"name": event.name,
							"desc": event.desc,
							"gen": event.gen,
							"nin": event.nin,
							"tai": event.tai,
							"dou": event.dou,
							"eventType": event.eventType,
							"eventAmount": event.eventAmount,
							"eventName": event.eventName
						});

						// push the event on the export list
						eventList.push(event);

						cursor.continue();
					}
					else {
						// delete previous information
						container.textContent = "";

						// loop though all types of missions
						for(var i in missionTypes) {
							if(!events[missionTypes[i].id] || events[missionTypes[i].id].length <= 0)
								continue;
							events[missionTypes[i].id].sort(sortEvents);
							var table = document.createElement("table");
							var thead = document.createElement("thead");
							var tbody = document.createElement("tbody");
							var trhead = document.createElement("tr");
							var thhead = [];
							var keys = [
								"Name",
								"Gen",
								"Nin",
								"Tai",
								"Dou",
								"Hidden Event",
								"Delete"
							];

							// create header cells
							for(var j in keys) {
								thhead.push(document.createElement("th"));
								thhead[j].textContent = keys[j];
								trhead.appendChild(thhead[j]);
							}

							// get the event array
							var event = events[missionTypes[i].id];
							for(var j in event) {
								var tr = document.createElement("tr");
								var td = [];
								var values = [
									event[j].name,
									event[j].gen,
									event[j].nin,
									event[j].tai,
									event[j].dou,
									(event[j].eventType === "special" || event[j].eventType === "item") ? [event[j].eventAmount * (megaMission === true ? 11 : 1), " ", event[j].eventName].join("") : event[j].eventName,
									"[X]"
								];

								// create content cells
								for(var k in values) {
									td.push(document.createElement("td"));
									td[k].textContent = values[k].length > 0 ? values[k] : "-";
									tr.appendChild(td[k]);
								}

								// add classnames
								td[5].className = event[j].eventType;

								// add event listener
								td[6].setAttribute("uid", event[j].uid);
								td[6].setAttribute("msg", ["Are you sure you want to delete this mission?", [event[j].name, " (", event[j].eventName, ")"].join("")].join("\n\n"));
								td[6].addEventListener("click", function() {
									if(confirm(this.getAttribute("msg"))) {
										var request = t.db.transaction(["Events"], "readwrite")
											.objectStore("Events")
											.delete(parseInt(this.getAttribute("uid")));
										request.onsuccess = function(event) {
											updateMissions();
										};
									}
								}, false);
								tbody.appendChild(tr);
							}

							// create the heading
							var h1 = document.createElement("h1");
							h1.textContent = missionTypes[i].name;
							h1.style.backgroundColor = missionTypes[i].bg;

							// append the nodes to their parents
							thead.appendChild(trhead);
							table.appendChild(thead);
							table.appendChild(tbody);
							container.appendChild(h1);
							container.appendChild(table);
							container.appendChild(document.createElement("br"));
						}

						var table = document.createElement("table");
						var trH = document.createElement("tr");
						var tdLH = document.createElement("td");
						var tdRH = document.createElement("td");
						var trB = document.createElement("tr");
						var tdLB = document.createElement("td");
						var tdRB = document.createElement("td");

						var taExport = document.createElement("textarea");
						var taImport = document.createElement("textarea");
						var taImportButton = document.createElement("input");

						tdLH.style.cssText = "width:50%; text-align:center; font-weight:bold;";
						tdLH.textContent = "Export";
						tdRH.style.cssText = "width:50%; text-align:center; font-weight:bold;";
						tdRH.textContent = "Import";

						tdLB.style.cssText = "text-align:left;";
						tdRB.style.cssText = "text-align:left;";

						taExport.setAttribute("onmouseover", "this.focus();this.select();");
						taImport.setAttribute("onmouseover", "this.focus();this.select();");
						taExport.style.cssText = "height:100px; width:100%;";
						taImport.style.cssText = "height:80px; width:100%;";
						taImportButton.type = "button";
						taImportButton.value = "Import";
						taImportButton.style.cssText = "height:20px; width:100%;";

						taExport.textContent = JSON.stringify(eventList);

						taImportButton.addEventListener("click", function() {
							try {
								var eventList = JSON.parse(taImport.value);
								for(var i = 0; i < eventList.length; i++) {
									try {
										var transaction = t.db.transaction(["Events"], "readwrite");

										transaction.oncomplete = function(e) {
											// no nothing
										}

										transaction.onerror = function(e) {
											t.errorHandler(e.target.errorCode);
										}

										var os = transaction.objectStore("Events");
										var request = os.add(eventList[i]);

										request.onsuccess = function(e) {
											// do nothing, the entry was added
										}

										request.onerror = function(e) {
											t.errorHandler(e.target.errorCode);
										}
									} catch (exA) {
										console.log(exA);
									}
								}
								updateMissions();
							} catch (ex) {
								console.log(ex);
							}
						}, false);

						tdLB.appendChild(taExport);
						tdRB.appendChild(taImport);
						tdRB.appendChild(document.createElement("br"));
						tdRB.appendChild(taImportButton);

						trH.appendChild(tdLH);
						trH.appendChild(tdRH);
						table.appendChild(trH);
						trB.appendChild(tdLB);
						trB.appendChild(tdRB);
						table.appendChild(trB);
						container.appendChild(document.createElement("hr"));
						container.appendChild(table);
					}
				}
			};

			// sort events by name
			var sortEvents = function(a, b) {
				if(a.name === b.name)
					return 0;
				return (a.name > b.name) ? +1 : -1;
			}

			updateMissions();
		}

		// initialize indexedDB, start the main program
		t.init = function() {
			t.VERSION = 2;
			var idb = window.indexedDB;
			var request = idb.open("MissionTweak", t.VERSION);

			request.onupgradeneeded = function(e) {
				t.db = e.target.result;

				var objectStore = t.db.createObjectStore("Events", { keyPath: "uid" });
				objectStore.createIndex("id", "id");
				objectStore.createIndex("name", "name");
			};

			request.onerror = function(e) {
				t.errorHandler(e.target.errorCode);
			};

			request.onsuccess = function(e) {
				t.db = e.target.result;

				if(t.db.version === t.VERSION || t.db.version === t.VERSION.toString()) {
					t.main();
				}
			};
		}

		// launch the script
		t.init();
	}

	try {
		// hotkey
		var hotkey = function(e) {
			if(e.keyCode === 49 && e.shiftKey === true)
				win.show(true);
		}

		// create a SomStorage object
		var cfg = new DomStorage("local", "BvSMissionTweak");

		// create a window
		var win = new FloatingWindow("missiontweak", cfg, true);

		// create a container
		var container = document.createElement("div");
		win.appendChild(container);

		// set some properties
		win.show(false);
		win.setTitle("Mission Tweak");

		// add CSS styles
		win.addCss("", {
			"width": "660px"
		});
		win.addCss("> div.body > div", {
			"overflow-y": "auto",
			"max-height": "500px"
		});
		win.addCss("> div.body > div > h1", {
			"color": "#FFFFFF",
			"text-shadow": "#000000 1px 1px 1px",
			"border": "1px solid black",
			"padding": "5px"
		});
		win.addCss("> div.body > div > table", {
			"width": "100%",
			"border": "1px solid black"
		});
		win.addCss("> div.body > div > table th:nth-child(1)", {
			"text-align": "left"
		});
		win.addCss("> div.body > div > table td:nth-child(1)", {
			"width": "250px"
		});
		win.addCss("> div.body > div > table td:nth-child(n+2)", {
			"width": "35px",
			"text-align": "center"
		});
		win.addCss("> div.body > div > table td:nth-child(6)", {
			"width": "190px",
			"text-align": "left"
		});
		win.addCss("> div.body > div > table td:nth-child(7)", {
			"cursor": "pointer"
		});
		win.addCss("> div.body > div > table td.special:before", {
			"content": "\"[Special] \"",
			"color": "rgb(185, 112, 182)",
			"font-weight": "bold"
		});
		win.addCss("> div.body > div > table td.item:before", {
			"content": "\"[Item] \"",
			"color": "rgb(176, 57, 118)",
			"font-weight": "bold"
		});
		win.addCss("> div.body > div > table td.ally:before", {
			"content": "\"[Ally] \"",
			"color": "rgb(57, 112, 182)",
			"font-weight": "bold"
		});
		win.addCss("> div.body > div > table td.level:before", {
			"content": "\"[Level] \"",
			"color": "rgb(57, 176, 118)",
			"font-weight": "bold"
		});
		win.addCss("> div.body > div > table td.jutsu:before", {
			"content": "\"[Jutsu] \"",
			"color": "rgb(118, 57, 176)",
			"font-weight": "bold"
		});

		// check if we're on the mission selection page
		if(/animecubed.com.billy.bvs.missionstart.html/i.test(location.href)) {
			cfg.set([Utils.playerName(), "missiontype"].join("."), "?");
			var missionForms = Utils.nodes("//form[contains(@name,'misform')]/a/..");
			for(var i in missionForms) {
				missionForms[i].setAttribute("missiontype", missionForms[i].name.replace(/misform[gnt]?/gi, ""));
				missionForms[i].addEventListener("click", function(e) {
					cfg.set([Utils.playerName(), "missiontype"].join("."), this.getAttribute("missiontype"));
					// console.log(this.getAttribute("missiontype"));
					// e.stopPropagation();
					// e.preventDefault();
				}, false);
			}
		}

		// check if we're on the mission page
		if(/animecubed.com.billy.bvs.missionstart.html/i.test(location.href) || /animecubed.com.billy.bvs.missions.mission1.html/i.test(location.href)) {
			// deal with vendor prefixes
			try {
				window.indexedDB = window.mozIndexedDB || window.indexedDB || window.webkitIndexedDB;
				window.IDBTransaction = window.webkitIDBTransaction || window.IDBTransaction;
				window.IDBTransaction = window.IDBTransaction.wrappedJSObject || window.IDBTransaction;
				window.IDBKeyRange = window.webkitIDBKeyRange || window.IDBKeyRange;
				window.IDBKeyRange = window.IDBKeyRange.wrappedJSObject || window.IDBKeyRange;
				window.IDBDatabaseException = window.webkitIDBDatabaseException || window.IDBDatabaseException;
				window.IDBDatabaseException = window.IDBDatabaseException.wrappedJSObject || window.IDBDatabaseException;
			} catch (e) {
			}

			// the user doesn't have indexedDB support
			if(!window.indexedDB) {
				alert("IndexedDB is not supported by your browser. Sorry!");
			}
			// the user has indexedDB
			else {
				log("you have IDB support. Good!");
				var missionTweak = new MissionTweak();
			}

			window.addEventListener("keydown", hotkey, false);
		}
	}
	catch(e) {
		log(["BvS Mission Tweak Exception: ", e].join(""));
	}
})();
