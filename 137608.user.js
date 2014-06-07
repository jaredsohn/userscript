// ==UserScript==
// @name LIFE Mesajda BBCode
// @namespace http://userscripts.org/users/life
// @description OGame: LIFE Mesajda BBCode
// @date 2012-07-03
// @version 4.1
// @creator LIFE
// @include http://*.ogame.*/game/index.php?page=showmessage*
// @include http://*.ogame.*/game/index.php?page=writemessage*
// @include http://*.ogame.*/game/index.php?page=alliance*
// @run-at document-end
// ==/UserScript==

function addBBCode(name, value) {
	if (name=="" || (arguments.length > 1 && value=="")) return;
	var message = document.forms[0].text;
	var selStart = message.selectionStart, selEnd = message.selectionEnd;
	var startTag = "", endTag = "[/" + name + "]";
	if (arguments.length > 1) {
		startTag = "[" + name + "=" + value + "]";
	} else {
		if (name == "list") {
			var tags = message.value.substring(0,selStart).match(/\[\/?list\]/gi);
			if (!tags || tags[tags.length-1].substr(1,1) == "/") {
				startTag = "[list]";
			} else {
				endTag = "";
			}
			startTag += "[*]";
		} else if (name == "tooltip") {
			startTag = "[tooltip text=]";
		} else {
			startTag = "[" + name + "]";
		}
	}
	message.value = message.value.substring(0,selStart) + startTag + message.value.substring(selStart,selEnd) + endTag + message.value.substring(selEnd);
	message.setSelectionRange(selStart + startTag.length, selEnd + startTag.length);
	message.focus();
	document.getElementById("cntChars").textContent = message.textLength;
}

var strFunc = (function(){
	var funcBBCode = function() {
		var form = document.forms[0];
		if (!form) return;
		var ta = form.text;
		var div = document.createElement("div");
		div.innerHTML += "<select class='dropdown' style='font-size:10pt;height:1.7em' onchange='addBBCode(\"font\",this.value);this.selectedIndex=0;'><option value=''>FONT</option><option value='arial' style='font-family:arial,sans-serif'>Arial</option><option value='comic\\ sans\\ ms' style='font-family:\"Comic Sans MS\",cursive'>Comic</option><option value='courier\\ new' style='font-family:\"Courier New\",monospace'>Courier</option><option value='georgia' style='font-family:georgia,serif'>Georgia</option><option value='impact' style='font-family:impact,fantasy'>Impact</option><option value='times\\ new\\ roman' style='font-family:\"Times New Roman\",serif'>Times</option><option value='verdana' style='font-family:verdana,sans-serif'>Verdana</option></select> ";
		div.innerHTML += "<select class='dropdown' style='font-size:10pt;height:1.7em' onchange='addBBCode(\"size\",this.value);this.selectedIndex=0;'><option value=''>SIZE</option><option value='7' style='font-size:7pt'>tiny</option><option value='10' style='font-size:10pt'>small</option><option value='12' style='font-size:12pt'>normal</option><option value='16' style='font-size:16pt'>big</option><option value='20' style='font-size:20pt'>huge</option></select> ";
		div.innerHTML += "<select class='dropdown' style='font-size:10pt;height:1.7em' onchange='addBBCode(\"color\",this.value);this.selectedIndex=0;'><option value=''>COLOR</option><option value='black' style='color:black;font-size:9pt'>black</option><option value='silver' style='color:silver;font-size:9pt'>silver</option><option value='gray' style='color:gray;font-size:9pt'>gray</option><option value='maroon' style='color:maroon;font-size:9pt'>maroon</option><option value='#A52A2A' style='color:brown;font-size:9pt'>brown</option><option value='red' style='color:red;font-size:9pt'>red</option><option value='orange' style='color:orange;font-size:9pt'>orange</option><option value='yellow' style='color:yellow;font-size:9pt'>yellow</option><option value='lime' style='color:lime;font-size:9pt'>lime</option><option value='green' style='color:green;font-size:9pt'>green</option><option value='olive' style='color:olive;font-size:9pt'>olive</option><option value='teal' style='color:teal;font-size:9pt'>teal</option><option value='aqua' style='color:aqua;font-size:9pt'>aqua</option><option value='blue' style='color:blue;font-size:9pt'>blue</option><option value='navy' style='color:navy;font-size:9pt'>navy</option><option value='purple' style='color:purple;font-size:9pt'>purple</option><option value='fuchsia' style='color:fuchsia;font-size:9pt'>fuchsia</option><option value='#FFC0CB' style='color:pink;font-size:9pt'>pink</option><option value='white' style='color:white;font-size:9pt'>white</option></select> ";
		if (document.location.href.indexOf("page=alliance") != -1)
			div.innerHTML += "<br />";
		div.innerHTML += "<a href='javascript:addBBCode(\"b\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAZlBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////39/fu7u7l5eXf39/W1tbMzMzFxcW9vb21tbWtra2lpaWZmZmKioqCgoJ8fHx1dXVfX19VVVUcHBwQEBAAAABvQ4WDAAAAInRSTlMAESIzRFVmd4iZqrv/////////////////////////////erKVdwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAACtSURBVCiRvY3XEsIgFERDsRAN4dJuFNv+/0+KJY6jvOp5WWaXA133C5TBujmYyUI2eo3ttpjG0PMwtBSNwVrbUHq2Y+VLkbDBOTd+KebgTjsich+KvLiAsw+eDuZD8N5RiDEQ1Fu/AtUuporf4+0+UjiiUnJOdMTi2S/gQo57bEpi5kQZryEy54K+ZJ4mzhPEYxD97Rlo/UhgOQ9SKa2kqKkr9TR/Lu7MKUT3J66l/Q2irNMvNQAAAABJRU5ErkJggg==' alt='Bold' title='Bold' border='0' /></a>";
		div.innerHTML += "<a href='javascript:addBBCode(\"i\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAY1BMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39/fu7u7n5+fe3t7S0tLMzMzDw8O+vr61tbWvr6+kpKSZmZmQkJB6enpjY2NXV1dTU1M6OjooKCggICAREREAAACW3aPzAAAAIXRSTlMAESIzRGZ3iJmqu//////////////////////////////ewDs2AAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAJdJREFUKJG10MsSgjAMBVDaIvJKX6FYlcL9/6+UcSPYbrmLLHJmkkyq6qo0aIr9Fhqlfo1hgChACsNYgtvbj1SAeuNIugDdTNAmh3skLNpnoDajtTacQWJy1rnpD2SKlIAXz2dowfbZ94j8OP1ErmS8XUBu8ozj4tWFwAv2OoXjLNFhT/etaI4g1B4plaqVPF8lfsk+cl0+nUwKek1swHwAAAAASUVORK5CYII=' alt='Italic' title='Italic' border='0' /></a>";
		div.innerHTML += "<a href='javascript:addBBCode(\"u\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAaVBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4+Pjv7+/n5+ff39/W1tbMzMzFxcW8vLy1tbWtra2mpqacnJyRkZGFhYV/f39mZmZSUlJDQ0MzMzMREREAAAAvziwyAAAAI3RSTlMAESIzRFVmd4iZqrvu/////////////////////////////6saOpIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAtElEQVQokbWR3RaCIBCEQzD/UthFyErT5v0fMr1RIG/7bjjMnDOzC5fLX6hQnerF1M75iS7gW9+cGGqhrkP2a9SPQXe+PEliDJpuIjWub1vORi9pvZj9BLDxc2JIGKM1EX2S+mokJmamZxHpOdyIlQc7hPUF7haNUg0sT5CHsd6tQXYFu56eCHbwzlmIHL33/Sswyi2/FqLeTqhjJMTUe5I2EYiSAvb/ElJKdZAFy4uQ9H1jvp0jEWFcRQbjAAAAAElFTkSuQmCC' alt='Underline' title='Underline' border='0' /></a>";
		div.innerHTML += "<a href='javascript:addBBCode(\"s\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAYFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////29vbu7u7m5ube3t7V1dXMzMzCwsKzs7Otra2lpaWZmZmOjo58fHxmZmZRUVFDQ0M7OzszMzMAAABWp2jsAAAAIHRSTlMAESIzRFVmd4iZqu7//////////////////////////5UxFAAAAAAJcEhZcwAACvAAAArwAUKsNJgAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAo0lEQVQokbVQ7Q6CMBDjtqEw2MfBmIJK3/8tncYgyBJ/0WS7pM2u7YriENSos/x5au9lhidwG5AR1OxNC7EX9MU4O1a5TXN0DPoVTjfTPLzDzh48oel83NjX2GKpA2OtdS4dny5r8PcFVYgdtJQazIBakqWozA6ihO97vmIlDEPsQSVCjGH8BkurEjSRfluoVW0hpSR6DSXFunwi6TNo9ymH4QksEA2GU5CXhAAAAABJRU5ErkJggg==' alt='Strike through' title='Strike through' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"align\",\"center\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAAA3NCSVQICAjb4U/gAAAACVBMVEX///////8AAACO9MPsAAAAA3RSTlMA//9EUNYhAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAADNJREFUCJljYMAGmFYBQQMDYygQOCCLNgApRjQxLCoZuBaAKdYAQmYyrFoFpkJDsToEDgBeyRP8DhwWwQAAAABJRU5ErkJggg==' alt='Align center' title='Align center' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"list\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAAA3NCSVQICAjb4U/gAAAACVBMVEX///////8AAACO9MPsAAAAA3RSTlMA//9EUNYhAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAABh0RVh0Q3JlYXRpb24gVGltZQAxNC4xMS4yMDA3+XeAJAAAACVJREFUCJljYEAFDWCSKWHVqlUNDIwTQkNDHRgYHBhwA9prAAMA3f4QUeGCZkAAAAAASUVORK5CYII=' alt='List' title='List' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"url\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAhFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4+Pjw8PDm5ube3t7X19fMzMzFxcW8vLy1tbWtra2np6ecnJyUlJSEhIR+fn5zc3NsbGxmZmZXV1dNTU1AQEA5OTkzMzMpKSkVFRUQEBAGBgYAAACU9KEpAAAALHRSTlMAESIzRFVmd4iZqrvM3e7///////////////////////////////////////+D3T4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAABA0lEQVQokWXR2ZKDIBAFUNFoWAxhs3GNmphl0v//f8NMVSqo/cDDuTTVQJJsqqA021oohiPAJPKtU7Tn89nWYutSK2WVUo91C8PgiwzruoWgVXoR+Qk0lCSe56r10sz8rfVE44ANpg+bURmD2Sq4dN6Ypzbmxb+eU8okWNsZY18i/QQMb8MgnXW1cy5yilqbtrLuOU0zRi6NdUPjqpfgnB2ic4yDewvQjDxLU/JxgqaCRw9+gJGRaMziWvl7OXcP72e6eqHRt7IQCLXH+CcIG4OIt/PND4/vmxT3pobeBv/O+V9peWlrqHeekGO5DP0Ntx6SjJ0kP+w8JGmWpWTvf9GefwHM/BUabF+V+wAAAABJRU5ErkJggg==' alt='Insert link' title='Insert link' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"img\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAABO1BMVEX//////////////73/2Gb+zFj+xVv+xFT+vlL+vFf/vUr/vzX/vTr+tVL/s0r/tEH+sE/+szP/r0X+rUrjp5/+pkn3qEf/pUD/ozz3oUD/nUH/mjr3mjy1pKX/lDyuoaGqn6D5kjv3jjv+izfxjzq0mJWjnJ2emZv/hDP/hDimk5WZlZb0gTaVkZKRjpDsezL5dTLvdyzwcDD4bS6FhIV/f39/f4CBf3/iaTDVWiXbWCXJWCumYEHQUiCsVDSgTzKgTjOHRzNsSkuFQzGWPCJgQ0NcQkN/OS1VQEJSPT9zLidHODtGOTpqMCeKJgZCNDg9NDhgKi08MTRYKSRTKChNJypAKyxRJSpaIyVQJiM0LC5vGQsvKCsnIiQkICEhGhwaFxggFBUWDg4IBwgEBAUFBAUDBQUFAwIAAABu8F9vAAAAaXRSTlMAEf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8HvOsQAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAATNJREFUKJF10llbgkAUgGGjgrECFUIIymxV2jXD9kXDFrS9bAEy0fD//4LOzLRgj35Xw3m5mjORSL86fYp0mJ5hkKU4H4VYHAcHPi6FgaVFoygMCAEMQyyLEC/JBDQqHIeBg7kgKQRmNEXBAgRjJEiyphNYSc3Oi2IyOQLB36Kip+YIGMa6rk1OCGJiNBETyDxLIJ83sjldiY0NMsyQqqp6Kkthd3PjYGd7LyczzPj+Wfn48OikjGGhVrt/eajXby9Pr96e64+kJYBpy6pULMsqPTWbH6XvpgDSFzQHX13jnJYGWKzaVdu2XXqp73C0q9cZgMwNzv25bhd/3a0CLL9C3t8iXMdx3ALAmud5jfCKAqgIUPB9v3t5rVbbBCh+Bv+2GrQDDKa51aNO/8fw20D36/kCJGJ6DPnsRqYAAAAASUVORK5CYII=' alt='Insert image' title='Insert image' border='0' /></a> ";
		div.innerHTML += "<select class='dropdown' style='font-size:10pt;height:1.7em' onchange='addBBCode(this.value);this.selectedIndex=0;'><option value=''>OTHERS</option><option value='player'>Player tooltip</option><option value='coordinates'>Coordinates</option><option value='tooltip'>Tooltip</option></select>";
		div.innerHTML += "<br />";
		ta.parentNode.insertBefore(div,ta);
		if (document.location.href.indexOf("page=writemessage") != -1 || document.location.href.indexOf("page=showmessage") != -1) {
			if (document.location.href.indexOf("page=showmessage") != -1) {
				ta.style.height = "70px";
			}
			if (document.location.href.indexOf("page=writemessage") != -1) {
				ta.parentNode.style.height="100%";
			}
			var sels = document.querySelectorAll("select.dropdown");
			for (var i = 0; i < sels.length; i++) {
				sels[i].style.border = "1px solid #141A1E";
				sels[i].style.backgroundColor = "#274650";
				sels[i].style.color = "#848484";
			}
		}

		ta.addEventListener(
			"keypress",
			function (e) {
				if (e.which == 32) {
					var selStart = this.selectionStart;
					var startText = this.value.substring(0,selStart);
					if (/\[[a-z][a-z ]*=[^\]]*$/i.test(startText.replace(/\\[\\\]]/g,""))) {
						this.value = startText + "\\ " + this.value.substring(this.selectionEnd);
						selStart += 2;
						this.setSelectionRange(selStart,selStart);
						e.preventDefault();
					}
				}
			},
			false
		);
	}

	if (document.location.href.indexOf("page=alliance") != -1) {
		$("#eins").ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=allianceBroadcast") == -1) return;

			funcBBCode();
		});
	} else {
		funcBBCode();

		if (document.location.href.indexOf("page=showmessage") != -1) {
			var removeClass = function(element, className) {
				var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
				element.className=element.className.replace(reg,' ');
			}

			var images = document.getElementsByClassName("reloadimage");
			for (var i=images.length-1; i>=0; i--) {
				images[i].src = images[i].title;
				removeClass(images[i], "reloadimage");
			}
		}
	}
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = addBBCode.toString() + "\n(" + strFunc + ")();";
document.body.appendChild(script);