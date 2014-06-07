// ==UserScript==
// @name           easyReply
// @namespace      http://hobowars.com
// @description    Allows you to easily reply to a comment on HoboWars
// @include        http://hobowars.com/game/*
// @include        http://www.hobowars.com/game/*
// ==/UserScript==


var mes = new Array();
function update(v, i) {
	mes[i] = v;	
}
function Send(stuff) {
	stuff = stuff.split("_");
	q = stuff[0];
	id = stuff[1];
	var msg = mes[q];

	 if (msg.length > 0) {
	
	
		 setTimeout(function () {location.href = "http://hobowars.com/game/game.php?sr=666&cmd=network&do=add_p_comment&pID="+id+"&w=2&Submit=Confirm&the_comment="+msg.replace(/\n/g,"%0D%0A")},100);
	}
}

var reg = /game.php\?sr=\d+&cmd=player&ID=\d+$/;
var url = document.location.href;

if (url.search(reg) > -1) {
	var t = document.getElementsByTagName("tr");
	for ( i = 0; i < t.length; i++) {
		if (t[i].bgColor == "#EFEFEF") {
			
			var text = t[i].getElementsByTagName("td")[3];
			
			var id_n = t[i].getElementsByTagName("td")[1].innerHTML;
			
			re = /ID=\d+/;
			id = id_n.match(re).toString();
			id = id.replace("ID=","");
			
			var box = document.createElement("textarea");
			box.setAttribute('id',i);
			box.value = '';
			box.addEventListener("keyup", function(e) {update(this.value, this.id)},true);
			box.setAttribute("style","background:#CCCCCC;");
			
			var button = document.createElement("input");
			button.setAttribute("type","button");
			button.setAttribute("value","Reply");
			button.setAttribute('id',i+"_"+id);
			button.addEventListener('click', function(e){Send(this.id)}, true);
			button.setAttribute("style","background: #CCCCCC;border: 1px solid #CCC;");
			
			var breakf = document.createElement("br");
			
			var bu = document.createElement("input");
			bu.setAttribute("type","button");
			bu.setAttribute("value","Reply");
			bu.setAttribute("style","background: #CCCCCC;border: 1px solid #CCC;");
			bu.setAttribute('id',i);
			bu.addEventListener('click', function(e){document.getElementById(this.id+"_div").style.visibility = "visible";this.style.visibility="hidden";}, true);
			
			var p = document.createElement("div");
			p.setAttribute('id',i+"_div");
			p.style.visibility="hidden";
			p.appendChild(box);
			p.appendChild(breakf);
			p.appendChild(button);
			
			text.appendChild(p);
			
			text.appendChild(bu);
	
			}
		}
	}