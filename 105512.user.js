// ==UserScript==
// @name           hitlistNotes
// @namespace      http://hobowars.com
// @description    Adds hitlist notes to hitlist.
// @include        http://hobowars.com/game/*
// @include        http://www.hobowars.com/game/*
// ==/UserScript==

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


var url = document.location.href;

var reg = /game.php\?sr=\d+&cmd=battle&do=phlist/;
if (url.search(reg) > -1) {

	try {
		var menu = document.getElementById("sideMenu");
		var end = menu.getElementsByTagName("ul")[0];
		var clear = document.createElement("li");
		var link = document.createElement("a");
		link.innerHTML = "Clear Hitlist Notes";
		link.addEventListener("click", function(e) {	var keys = GM_listValues();
		for (var i=0, key=null; key=keys[i]; i++) {
		  GM_deleteValue(key);
		}
		alert("All notes on hitlist have been deleted.\n Re-visit page to see effects");},true);
		clear.appendChild(link);
		end.appendChild(clear);
	}
	catch(e) {
	null;
	}
	var hl = document.getElementsByTagName("td");
	for (i = 0; i < hl.length; i++) {
		
		var re = /<a href="game.php\?sr=\d+&amp;cmd=player&amp;ID=\d+">(.*?)<\/a> \(\d+\)/;
		var tab = hl[i].innerHTML;
		if (tab.search(re) > -1 && tab.length < 200) {
			re = /ID=\d+/;
			id = tab.match(re).toString();
			id = id.replace("ID=","");
		
			note = GM_getValue(id,"DNE");
			hl[i].width="100%";
			var button = document.createElement("img");
			button.setAttribute("id",id+"_"+i);
			button.setAttribute("src","../images/note_new.gif");
			button.addEventListener("click", function(e) {
				this.style.visibility="hidden";
				var box = document.createElement("input");
				box.setAttribute("type","text");
				box.setAttribute("id",this.id);
				box.setAttribute("style","background: #CCCCCC;border: 1px solid #CCC;font-size:12;");
				note = GM_getValue(this.id.split("_")[0],"DNE");
				if (note != "DNE") { box.setAttribute("value",note);}
				box.addEventListener("keyup",function(e) { if (e.keyCode == 13) {id = this.id.split("_")[0];
					GM_setValue(id,this.value);
					document.getElementById(this.id+"m").innerHTML = this.value;
					hl[this.id.split("_")[1]].removeChild(this);
					document.getElementById(this.id).style.visibility="visible";} }, true)
				
				var br = document.createElement("br");
				box.appendChild(br);
				hl[this.id.split("_")[1]].appendChild(box);
				box.focus();
			}, true);
			
			hl[i].appendChild(button);
			
			if (note == "DNE") {
				var v = "";
				
			}
			
			else {
				
				var v = note;
				
			}
				
			var note_disp = document.createElement("div");
			note_disp.setAttribute("id",id+"_"+i+"m");

			note_disp.innerHTML =v;
			hl[i].appendChild(note_disp);
			
			
			
		}
		
	}
}