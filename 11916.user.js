// ==UserScript==
// @name           dAmn Buddies
// @namespace      blueratchet.com
// @description    Adds a buddy list type feature to deviantart's dAmn
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==
//COPYRIGHT: Corey Thomasson (blueratchet.deviantart.com)
//version 0.2.2
var budbox = document.createElement('div');
var roombox = document.createElement('div');
roombox.setAttribute('id', 'buddyrooms');
roombox.setAttribute('style', 'z-index:1001;position:absolute;right:25px;border:white 1px solid;width:165px;background-color:#A7AFA7;display:none;');
unsafeWindow.budsopen = true;
budbox.setAttribute('id', 'BUDDIES');
budbox.setAttribute('style', 'position:absolute;top:3px;right:20px;width:175px;color:#FFFFFF;overflow:hidden;border:white 1px solid;background-color:#a7afa7;height:11px;margin:0px;padding:0px;font-size:11px;z-index:1000');
document.body.appendChild(budbox);
document.body.appendChild(roombox);
var divvy = document.getElementById("buddyrooms");
var budbox = document.getElementById("BUDDIES");
budbox.innerHTML = '<p align=\'center\'><a align=\'center\' onclick="showbuds();">Show Buddies</a></p>';
var oldParse = unsafeWindow.dAmn_ParsePacket;
var buddylist = GM_getValue("dAmnBuddies", "BlueRatchet");
buddylist = buddylist.replace(/ /g, "");
unsafeWindow.dAmnBuddies = buddylist.split(',');
unsafeWindow.showbuds = function(x) {
	var buddylist = GM_getValue("dAmnBuddies", "BlueRatchet");
	unsafeWindow.budsopen = true;
        if(x) { checkbuddies(); }
	buddylist = buddylist.replace(/ /g, "");
	unsafeWindow.dAmnBuddies = buddylist.split(',');
	budbox.innerHTML = "<p align='center'><a onclick='hidebuds();'>Hide Buddies</a></p><br />";
	budbox.innerHTML = budbox.innerHTML+"<p align='center'><a onclick='addbuddy();'>Add/Remove Buddies</a></p>";
	for(var n in unsafeWindow.dAmnBuddies) {
		eval("var thisone = unsafeWindow.BUDDY_"+unsafeWindow.dAmnBuddies[n].toLowerCase()+";");
		if(thisone.on) {
			var thisname = " &nbsp; &middot;<b><a href='http://"+unsafeWindow.dAmnBuddies[n]+".deviantart.com' onmouseover='budrooms(event, \"<ul>"+thisone.chans+"</ul>\");' onmouseout='document.getElementById(\"buddyrooms\").style.display = \"none\";'>"+unsafeWindow.dAmnBuddies[n]+"</a></b>";
			var thisend = "<br />";
		} else {
			var thisname = " &nbsp; &middot;<i><a href='http://"+unsafeWindow.dAmnBuddies[n]+".deviantart.com'>"+unsafeWindow.dAmnBuddies[n]+"</a></i>";
			var thisend = "<br />";
		}
		if(!thisone.chans) {
			thisone.chans="";
		}
		budbox.innerHTML = budbox.innerHTML+thisname+thisend;
	}
	budbox.style.height = "550px";
	budbox.style.overflow = "auto";
}
unsafeWindow.addbuddy = function() {
	var buddylist = GM_getValue("dAmnBuddies", "BlueRatchet");
	buddylist = buddylist.replace(/ /g, "");
	var newbuddies = window.prompt("Current Buddies:\nSeperate names with commas", buddylist);
	buddylist = newbuddies;
	unsafeWindow.dAmnBuddies = buddylist.split(',');
	GM_setValue("dAmnBuddies", buddylist);
	checkbuddies();
}
unsafeWindow.hidebuds = function() {
	unsafeWindow.budsopen = false;
	budbox.innerHTML = '<p align=\'center\'><a align=\'center\' onclick="showbuds(true);">Show Buddies</a></p>';
	budbox.style.height = "11px";
}
var dAmnBuddies = unsafeWindow.dAmnBuddies;
for(var i in dAmnBuddies) {
	eval("unsafeWindow.BUDDY_"+dAmnBuddies[i].toLowerCase()+" = {\"on\":false, \"chans\":\"\"}");
}
var dAmn_Get = unsafeWindow.dAmn_Get;

var checkbuddies = function() {
	if(!unsafeWindow.budsopen) { return; }
	var buddylist = GM_getValue("dAmnBuddies", "BlueRatchet");
	buddylist = buddylist.replace(/ /g, "");
	var budds = buddylist.split(',');
	for(var es in budds) {
		eval("unsafeWindow.BUDDY_"+budds[es].toLowerCase()+" = { 'on':false, 'chans':'' }");
		dAmn_Get("login:"+budds[es], "info");
	}
	setTimeout(checkbuddies, 250000);
}
var BUDDYlogged = function(ns, data) {
	//alert(data);
	//if(!unsafeWindow.budsopen) { return; }
	var bud = ns.substr(6);
	var buds = bud.toLowerCase();
	var rooms = "";
	eval("var thisbuddy = unsafeWindow.BUDDY_"+buds+";");
	if(!thisbuddy) { return false; } 
	data = data.replace(/ chat:/g, " chat:#");
	data = data.replace(/pchat:/g, "chat:@");
	var roomcheck = data.split('ns chat:');
	for(var is in roomcheck) {
		if(is>0) {
			var test = roomcheck[is];
			test = test.split("\n");
			test = test[0];
			rooms = rooms+"<li>"+test+"</li>";
		}
	}
	eval("if(unsafeWindow.BUDDY_"+buds+") { unsafeWindow.BUDDY_"+buds+".on = true; unsafeWindow.BUDDY_"+buds+".chans = rooms; }");
	unsafeWindow.showbuds();
	return true;
}
var BUDDYnotlogged = function(ns) {
	//if(!unsafeWindow.budsopen) { return; }
	var bud = ns.substr(6);
	var buds = bud.toLowerCase();
	eval("var check = unsafeWindow.BUDDY_"+buds+";");
	eval("if(unsafeWindow.BUDDY_"+buds+") { unsafeWindow.BUDDY_"+buds+".on = false; unsafeWindow.BUDDY_"+buds+".chans = false; }");
	if(check) { unsafeWindow.showbuds(); return true; } else { return false; }
}
unsafeWindow.dAmn_ParsePacket = function(data) {
  packet = oldParse(data);
  if(packet.cmd=='property') {
	if(packet.args.p=='info') {
		if(BUDDYlogged(packet.param, packet.body)) {
			return oldParse("recv chat:fakerfake\n\nmsg main\nfrom=BlueRatchet\n\nYou shouldnt see this");
		}
	}
  }
  if(packet.cmd=='get') {
	if(packet.param.substr(0, 5)=='login') {
		if(BUDDYnotlogged(packet.param)) {
			return oldParse("recv chat:fakerfake\n\nmsg main\nfrom=BlueRatchet\n\nYou shouldnt see this");
	}}
  }
return packet;
}
unsafeWindow.budrooms = function(e, text) {
	if(!e) { e = window.event; }
	if (e=='undefined') {
		e = { 'clientY':200 }
	}
	//var divvy = document.getElementById("buddyrooms");
	divvy.innerHTML = text;
	divvy.style.top = (e.clientY+10)+"px";
	divvy.style.display = "inline";
}
checkbuddies();
unsafeWindow.hidebuds();