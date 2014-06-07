// ==UserScript==
// @name           pMan
// @description    A simple and easy to use preferences manager for greasemonkey scripts.
// @namespace      -
// @include        *
// ==/UserScript==

///////////////////////////////////////////
// vvv put this in your greasemonkey script:

/*
 * pMan preferences manager for greasemonkey scripts
 * http://userscripts.org/scripts/show/71904
 */
var pMan=function(a){var d=this;d.parentElm=null;d.PMan=function(){if(a.elmId)d.parentElm=document.getElementById(a.elmId);else{var c=document.createElement("div");c.style.width="300px";c.style.position="fixed";c.style.left="50%";c.style.marginLeft="-150px";c.style.top="150px";document.getElementsByTagName("body")[0].appendChild(c);d.parentElm=c}};d._save=function(){for(var c=0;c<a.prefs.length;c++){var b=document.getElementById("pManOption"+c);GM_setValue(a.prefs[c].name,b.value)}return false};d._hide= function(){d.parentElm.style.display="none";return false};d._savehide=function(){d._save();d._hide();return false};d.show=function(){for(var c="<div style='"+(a.bordercolor?"border:1px solid "+a.bordercolor+";":"")+(a.color?"color:"+a.color+";":"")+(a.bgcolor?"background-color:"+a.bgcolor+";":"")+"padding:3px;'><div style='font-weight:bold;text-align:center;padding:3px;'>"+(a.title||"")+"</div>",b=0;b<a.prefs.length;b++){c+="<div title='"+(a.prefs[b].description||"")+"'>"+a.prefs[b].name+" <select id='pManOption"+ b+"'>";for(var e=0;e<a.prefs[b].opts.length;e++)c+="<option value='"+(a.prefs[b].vals?a.prefs[b].vals[e]:a.prefs[b].opts[e])+"'>"+a.prefs[b].opts[e]+"</option>";c+="</select></div>"}c+="<div style='text-align:right'><a href='#' id='pManButtonCancel'>Cancel</a> <a href='#' id='pManButtonSave'>Save</a></div></div>";d.parentElm.innerHTML=c;document.getElementById("pManButtonCancel").addEventListener("click",d._hide,true);document.getElementById("pManButtonSave").addEventListener("click",d._savehide, true);for(b=0;b<a.prefs.length;b++)document.getElementById("pManOption"+b).value=d.getVal(a.prefs[b].name);d.parentElm.style.display=""};d.getVal=function(c){for(var b=0;b<a.prefs.length;b++)if(a.prefs[b].name==c)return a.prefs[b].vals?GM_getValue(a.prefs[b].name,a.prefs[b].vals[a.prefs[b].defaultVal]):GM_getValue(a.prefs[b].name,a.prefs[b].opts[a.prefs[b].defaultVal]);return"pref default doesnt exist"};d.PMan()};

// ^^^ end put this in your greasemonkey script
//////////////////////////////////////////////


/*
You may want to copy and paste this into your script too and mod it up there.


var prefMan = new pMan({
	title:"My greasemonkey script",
	color:"#A20000",
	bgcolor:"#B7FFA8",
	bordercolor:"#FF8500",
	prefs:[
		{
			name:"an opt",
			description:"this is an opt here",
			opts:["option 1", "option 2", "option 3"],
			vals:["value 1", "value 2", "value 3"],
			defaultVal:0
		},
		{
			name:"another option",
			description:"wow another option",
			opts:["more option 1", "more option 2", "more option 3"],
			vals:["more value 1", "more value 2", "more value 3"],
			defaultVal:1
		}
	],
	elmId:"myPrefBox"
});
GM_registerMenuCommand("Show Preferences", prefMan.show);


*/



// example greasemonkey script, right click the greasemonkey icon > user script commands > Show preferences to open the prefs.
var prefMan = new pMan({  // prefMan can be whatever you want to call it
	title:"pMan test preferences",  // The title on the top of the box (optional)
	color:"black",  // The text color in the box (can be # value instead) (optional)
	bgcolor:"white",  // The box background color (can be # value instead) (optional)
	bordercolor:"black",  // The box border color (can be # value instead) (optional)
	prefs:[  // This array holds the preferences
		{
			name:"Background color",  // The name of this preference
			description:"The background color of the web page",  // The description of this preference (optional)
			opts:["white", "red", "orange", "yellow", "green", "blue", "purple", "black"],  // The possible options of this preference
			vals:["#FFFFFF", "#FF0000", "#FFAA00", "#FFFF00", "#00FF00", "#0000FF", "#FF00FF", "#000000"],  // The values of the options (optional will use opts as val)
			defaultVal:1  // The index of the default value from `opts`, remember it starts with 0 so white is 0, red is 1, ... black is 7
		},  // (dont forget the comma)
		{  // Add as many preferences as you want
			name:"Text color",
			description:"The color of the text on the page",
			opts:["white", "red", "orange", "green", "blue", "purple", "black"],
			vals:["#FFFFFF", "#FF0000", "#FFAA00", "#00FF00", "#0000FF", "#FF00FF", "#000000"],
			defaultVal:3
		}  // (no comma on the last one)
	]
	
	/* this isnt used in this test script but you can pick an element id to put the box in instead of it floating, just add:
	,  // the comma goes after the end of prefs, don't forget it
	elmId:"myPrefBox"  // The id of an element you want the preferences to go into
	
	*/
});  // Dont forget this
GM_registerMenuCommand("Show Preferences", prefMan.show);  // Adds option to the "user script commands" box, you can also run .show() from anywhere else to bring up the box


// the rest of the test greasemonkey script, (dont put this in your script) it just adds a script tag to the head with the specified colors
var head = document.getElementsByTagName("head")[0];
var sheet = document.createElement("style");
sheet.setAttribute("type", "text/css");
sheet.innerHTML = "body{ background-color:" + prefMan.getVal("Background color")
	+ ";color:" + prefMan.getVal("Text color") + ";}";
head.appendChild(sheet);





/*
uncompressed source:

var pMan = function(args) {
	var pMan = this;
	pMan.parentElm = null;
	
	pMan.PMan = function() {
		if(args.elmId) {
			pMan.parentElm = document.getElementById(args.elmId);
		}
		else {
			// create a floating options
			var elm = document.createElement("div");
			elm.style.width = "300px";
			elm.style.position = "fixed";
			elm.style.left = "50%";
			elm.style.marginLeft = "-150px";
			elm.style.top = "150px";
			var body = document.getElementsByTagName("body")[0];
			body.appendChild(elm);
			pMan.parentElm = elm;
		}
	}
	
	pMan._save = function() {
		for(var i = 0; i < args.prefs.length; i++) {
			var sel = document.getElementById("pManOption" + i);
			GM_setValue(args.prefs[i].name, sel.value);
		}
		return false;
	}
	
	pMan._hide = function() {
		pMan.parentElm.style.display = "none";
		return false;
	}
	
	pMan._savehide = function() {
		pMan._save();
		pMan._hide();
		return false;
	}
	
	pMan.show = function() {
		var border = args.bordercolor ? "border:1px solid " + args.bordercolor + ";" : "";
		var color = args.color ? "color:" + args.color + ";" : "";
		var bgcolor = args.bgcolor ? "background-color:" + args.bgcolor + ";" : "";
		
		var html = ""
			+"<div style='" + border + color + bgcolor + "padding:3px;'>"
				// title
				+"<div style='font-weight:bold;text-align:center;padding:3px;'>" + (args.title || "") + "</div>";
				// options
				for(var i = 0; i < args.prefs.length; i++) {
					var desc = args.prefs[i].description || "";
					html += "<div title='" + desc + "'>" + args.prefs[i].name + " <select id='pManOption" + i + "'>";
					for(var j = 0; j < args.prefs[i].opts.length; j++) {
						var val = args.prefs[i].vals ? args.prefs[i].vals[j] : args.prefs[i].opts[j];
						html += "<option value='" + val + "'>" + args.prefs[i].opts[j] + "</option>";
					}
					html += "</select></div>";
				}
				// buttons
				html += "<div style='text-align:right'><a href='#' id='pManButtonCancel'>Cancel</a> <a href='#' id='pManButtonSave'>Save</a></div>"
			+"</div>";
		pMan.parentElm.innerHTML = html;
		
		document.getElementById("pManButtonCancel").addEventListener("click", pMan._hide, true);
		document.getElementById("pManButtonSave").addEventListener("click", pMan._savehide, true);
		
		// set selects to their set opts or default
		for(var i = 0; i < args.prefs.length; i++) {
			var sel = document.getElementById("pManOption" + i);
			sel.value = pMan.getVal(args.prefs[i].name);
		}
		
		pMan.parentElm.style.display = "";
	}
	
	pMan.getVal = function(pref) {
		for(var i = 0; i < args.prefs.length; i++) {
			if(args.prefs[i].name == pref) {
				if(args.prefs[i].vals) {
					return GM_getValue(args.prefs[i].name, args.prefs[i].vals[args.prefs[i].defaultVal]);
				}
				else {
					return GM_getValue(args.prefs[i].name, args.prefs[i].opts[args.prefs[i].defaultVal]);
				}
			}
		}
		return "pref default doesnt exist";
	}
	
	pMan.PMan();
}

*/
