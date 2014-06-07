// ==UserScript==
// @name           ActionScript Console: Hack Flash Games
// @namespace      #aVg
// @description    Lets you hack flash variables and skip the advertisements.
// @include        *
// @version        0.1.2
// ==/UserScript==
(function() {
if(top && top.location != location) return;
document = unsafeWindow.document;
function insertConsole() {
try{
function $(A) {return document.getElementById(A);}
unsafeWindow.$ = $;
function single(A, B) {return document.evaluate(A, B || document, null, 9, null).singleNodeValue;}
if(unsafeWindow.embedGameInDiv)
	unsafeWindow.embedGameInDiv();
var swf = document.embeds[0] || $("flashcontent") || single("//object[contains(@data, '.swf')]");
unsafeWindow.game = swf;
var actions = single("//div[@class='game_actions']") || single("//div[@class='channeHolder']") || $("header") || $("content") || document.body;
var dl = document.createElement("a");
dl.href=swf.src;
dl.textContent = "Game Download Link";
actions.appendChild(dl);
swf.setAttribute("allowscriptaccess", "always");
swf.setAttribute("swliveconnect", "true");
swf.src += "";
var script = function() {
	window.frozenStack = new Array();
	window.setValue = function(A, B) {
		if (/^\d+$/.test(B)) B = Number(B);
		game.SetVariable(A, B);
	};
	window.getValue = function(A) {
		var val = game.GetVariable(A);
		return val == null ? "" : val;
	};
	var floaty = document.createElement("div");
	var name = floaty.appendChild(document.createElement("p"));
	var value = floaty.appendChild(document.createElement("p"));
	
	var iName = document.createElement("input");
	iName.id = "varName";
	
	var iValue = document.createElement("input");
	iValue.id = "varValue";
	
	name.appendChild(iName);
	value.appendChild(iValue);
	
	var set = document.createElement("button");
	set.textContent = "Set Var";
	set.addEventListener("click", function() {
		try{
			setValue($("varName").value, $("varValue").value);
		}catch(e) {alert("Error!\n" + e)}
	}, false);
	
	var get = document.createElement("button");
	get.textContent = "Get Var";
	get.addEventListener("click", function() {
			alert(getValue($("varName").value));
	}, false);
	
	var add = document.createElement("button");
	add.textContent= "Add to stack";
	add.addEventListener("click", function() {
		var which = $("varName").value;
		if(!document.evaluate("//p[@title='"+which+"']", document, null, 9, null).singleNodeValue) {
			var newVar = document.createElement("p");
			newVar.title = which;
			var curValue = getValue(which);
			newVar.textContent = which + " = " + curValue;
			var del = document.createElement("button");
			del.textContent = "X";
			del.addEventListener("click", function(e) {
				e.preventDefault();
				this.parentNode.parentNode.removeChild(this.parentNode);
			}, false);
			
			var check = document.createElement("input");
			check.type = "checkbox";
			check.addEventListener("click", function(e) {
				var curValue = this.parentNode.title;
				if(this.checked) {
					frozenStack.push([curValue, getValue(curValue)]);
				} else {
					for(var i = frozenStack.length - 1; i>=0; --i)
						if(frozenStack[i][0]==curValue) {
							frozenStack.splice(i, 1);
							break;
						}
				}
			}, false);
			newVar.appendChild(del);
			newVar.appendChild(check);
			
			if(curValue=="true" || curValue=="false")
				newVar.addEventListener("dblclick", function(e) {
					if(e.target != this) return;
					if(!this.parentNode) return;
					var isTrue = getValue(this.title)=="true";
					setValue(this.title, !isTrue);
					this.firstChild.nodeValue = this.title + " = " + !isTrue;
				}, false);
			else
				newVar.addEventListener("click", function(e) {
					if(e.target != this) return;
					if(!this.parentNode) return;
					var newVal = prompt("What should be the new value of \""+this.title+"\"?", getValue(this.title));
					if(/^\s*$/.test(newVal)) return;
					setValue(this.title, newVal);
			},false);
			
			$("varStack").appendChild(newVar);
		}
	}, false);
	
	var end = document.createElement("button");
	end.textContent = "stop";
	end.addEventListener("click", function() {
		if(this.textContent=="stop") {
			this.textContent = "start";
			clearInterval(check);
		} else {
			this.textContent = "stop";
			window.check = setInterval(updateStack, 1000);
		}
	}, false);
	
	floaty.appendChild(name);
	floaty.appendChild(value);
	floaty.appendChild(set);
	floaty.appendChild(get);
	floaty.appendChild(add);
	floaty.appendChild(end);
	
	var Sstack = document.createElement("div");
	Sstack.id="varStack";
	floaty.appendChild(Sstack);
	
	function updateStack() {
		var stack = $("varStack").getElementsByTagName("p");
		for(var i = stack.length - 1; i>=0; --i)
		{
			var item = stack[i];
			item.firstChild.nodeValue = item.title + " = " + getValue(item.title);
		}
	}
	
	var freezer = setInterval(function() {
		for(var i = frozenStack.length - 1; i>=0; --i)
			setValue(frozenStack[i][0], frozenStack[i][1]);
	}, 1000);

	window.check = setInterval(updateStack, 1000);

	floaty.setAttribute("style", "position:fixed; background: white; top : 2px; right: 10px; z-index: 9000000;");
	
	document.body.appendChild(floaty);
};
document.body.appendChild(document.createElement("script")).innerHTML = "("+script+")();";
}catch(E) {alert("Error was experienced! If you think this is a mistake, let Avindra know:\n" +E);}

}
if(/(?:www\.)?(?:miniclip|(?:addicting|mochi)games)\.com\//.test(location.href))
	insertConsole();
GM_registerMenuCommand("Activate Flash Console", insertConsole);

})();