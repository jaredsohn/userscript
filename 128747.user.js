// ==UserScript==
// @name			WM Debug Console
// @description	Creates a debug console that slides up from the bottom right of the screen
// @require		http://userscripts.org/scripts/source/123889.user.js
// @license		http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version		3.0.0.5
// @copyright		Charlie Ewing except where noted
// ==/UserScript== 

//this script requires some functions in the WM Common Library
//this script needs access to a pre-defined JSON object

(function(){
	this.debug = {
		doDebug: true, //always true until told otherwise after gmconfig loads
		debugLevel: 0, //always max until told otherwise in run function
		debugMaxComments: 100,
		useScrollIntoView: false,
		stackRepeats: false,
		lastPkg:null,

		initialized: false,
		windowNode: null, //container for created debug window
		messageNode: null,

		init: function(params){try{
			params=params||{};

			if (!($("WM_debugWindow"))) {
				addGlobalStyle(""+
					"#WM_debugWindow {height:249px; position:fixed; right: 2px; bottom: 2px; z-index: 9999; width: 50%; transition-property:'bottom'; transition-duration:1s; transition-timing-function:ease-in-out;}\n"+
					"#WM_debugWindow.tuck {transition-property: 'bottom'; transition-duration:1s; bottom:-220px; transition-timing-function:ease-in-out;}\n"+
					"#WM_debugWindow a {color:white;}\n"+
					".errConsoleLine {padding-top: 3px; padding-bottom: 3px; border-bottom:solid #760202 2px;}\n"+
					".errConsoleScript {}\n"+
					".errConsoleFunction {}\n"+
					".errConsoleMessages {height:220px;overflow: scroll;color: #FFCA5E; background-color: #CA0704; background-image: -moz-linear-gradient(top, #CA0704, #9C0505); font-weight: bold; font-size: 12px; border-radius: 0px 5px 5px 5px; border:solid #760202 3px;padding-left: 6px; padding-right: 6px;}\n"+
					".errConsoleLineNum {}\n"+
					".errConsoleErrNum {}\n"+
					".errConsoleMessage {}\n"+
					".errConsoleComment {}\n"+
					".errConsoleButtonBorder {border-radius: 5px 5px 0px 0px; border:solid #760202 2px; border-bottom:0px;}\n"+
					".errConsoleCloseButton {background-color: #9F0A0C; background-image: -moz-linear-gradient(top, #FFDDBA, #9F0A0C);font-size: 12px; font-weight: bold; color: white; border-radius: 5px 5px 0px 0px; border:solid #BE1A11 2px;border-bottom:0px;padding: 6px;display:inline-block;}\n"+
					""
				,"styleDebug");
				document.body.appendChild(
					debug.windowNode = createElement("div",{id:"WM_debugWindow",className:"tuck"},[ 
						//createElement("div",{className:"errConsoleButtonBorder"},[]),
						createElement("a",{href:jsVoid,className:"errConsoleCloseButton",textContent:"Debug",onclick:debug.toggle}),
						debug.messageNode=createElement("div",{href:jsVoid,className:"errConsoleMessages"})

					])
				);
			}
			debug.initialized = true;
		}catch(e){log("debug.init: "+e);}},

		print: function(msg, params){try{
			if (!debug.doDebug) return;
			params=params||{};

			if (!debug.initialized) debug.init();
			if (!debug.initialized) return;			

			//confirm(params.level);
			var level=params["level"]||6; //default to top level status
			if (level<debug.debugLevel) return; //dont show unwanted level warnings and errors

			var line=params["lineNumber"]||"";
			var script=params["scriptName"]||"";
			var func=params["functionName"]||"";
			var errnum=params["errorNumber"]||"";
			var comment=params["comment"]||"";
			var type=params["type"]||"";
			
			var pkg={};
			
			if (debug.messageNode) {
				pkg.container=createElement("div",{className:"errConsoleLine "+type},[
					pkg.scriptName=createElement("span",{className:"errConsoleScript",textContent:script}),
					pkg.functionName=createElement("span",{className:"errConsoleFunction",textContent:func}),
					pkg.lineNumber=createElement("span",{className:"errConsoleLineNum",textContent:line}),
					pkg.errorNumber=createElement("span",{className:"errConsoleErrNum",textContent:errnum}),
					pkg.msg=createElement("span",{className:"errConsoleMessage",innerHTML:msg}),
					pkg.comment=createElement("span",{className:"errConsoleComment",textContent:comment}),
					pkg.counter=createElement("span",{className:"errConsoleCounter",textContent:""}),
				])
				if (!debug.stackRepeats || pkg!=(debug.lastPkg||null)) {
					var node = debug.messageNode.appendChild(pkg.container)
					if (debug.useScrollIntoView) node.scrollIntoView();
					debug.lastPkg=pkg;
				} else {
					//stack duplicates
					if (debug.lastPkg||null) {
						var counterNode=debug.lastPkg.counter;
						counterNode.textContent = (parseInt(counterNode.textContent)||0)+1;
					}
				}
			}

			debug.cleanComments();
			return pkg;

			//debug.show();
		}catch(e){GM_log("debug.print: "+e);}},

		cleanComments: function(){try{
			if (!debug.messageNode) return;
			if (debug.debugMaxComments==0) return;
			var comments = selectNodes(".//div[contains(@class,'errConsoleLine')]",{node:debug.messageNode});
			if (comments.snapshotItem) {
				var count = comments.snapshotLength-debug.debugMaxComments;
				if (count>0) {
					for (var i=0;i<count;i++){
						var node=comments.snapshotItem(i);
						node.parentNode.removeChild(node);
						node=null;
					}
				}
			}
			comments=null;
		}catch(e){log("debug.cleanComments: "+e);}},

		show: function(){try{
			if (!debug.initialized) debug.init();
			if (!debug.initialized) return;

			if (debug.windowNode) debug.windowNode.style.display="";
		}catch(e){log("debug.show: "+e);}},

		hide: function(){try{
			if (!debug.initialized) debug.init();
			if (!debug.initialized) return;

			if (debug.windowNode) debug.windowNode.style.display="none";
		}catch(e){log("debug.hide: "+e);}},

		toggle: function(){try{
			if (!debug.initialized) debug.init();
			if (!debug.initialized) return;

			if (debug.windowNode) {
				//var isClosed = parseInt(debug.windowNode.style.bottom)<0;
				//slide(debug.windowNode,0,0,0,(isClosed)?220:-220,1);
				
				debug.windowNode.className = debug.windowNode.className.toggleWord("tuck");
			}
		}catch(e){log("debug.toggle: "+e);}},
	};
})();
