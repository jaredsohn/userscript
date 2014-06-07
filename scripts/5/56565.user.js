// ==UserScript==
// @name           Auto Spicker SpickMich
// @namespace      spickmich
// @description    Auto Spicker SpickMich
// @include        http://www.spickmich.de/spick/*
// @include        http://spickmichcheats.de.tl*
// ==/UserScript==
    var GM_JQ = document.createElement('script'); GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js'; GM_JQ.type = 'text/javascript'; document.getElementsByTagName('head')[0].appendChild(GM_JQ);
    function GM_wait() { if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); } else { $ = unsafeWindow.jQuery; letsJQuery(); }}
    GM_wait(); $.tempvar = true;
	
	function letsJQuery() {
if(window.location.href.indexOf("spickmichcheats.de.tl") > 0) {window.location.href="http://www.nysoft.de/spickmich%20scripte";}
		var name = $("#mainContent #p #spickBox form#spickOk .headline").text().replace(/Willst du /,"").replace(/ wirklich spicken\?/,"");	var userid = getUserId($("#mainContent #p #spickBox .userImg"));
		$("#mainContent #p #spickBox form#spickOk .bottom").prepend("<button id=\"openautospicker\" class=\"simpleButton\" style=\"margin-bottom:7px;font-weight:bold;\">AutoSpicker &ouml;ffnen</button><br />");
		$("#mainContent #p #spickBox form#spickOk").append("<div id=\"autospicker\" style=\"background:url(http://content.spickmich.de/images/s/header/header_blue.jpg) #4E8B93 -160px 0; position:absolute; top:0px; left:0px; width:320px; height:108px; z-index:9999; border:1px solid silver; padding:5px 15px;\"><div id=\"closespickmenue\" style=\"position:absolute; top:2px; right:5px; width:10px; height:14px; color:black; cursor:pointer; font-weight:bold;\">X</div><p><b>"+name+" hat nun schon<br /><span class=\"spicks\" style=\"font-size:1.2em; color:darkred;\">0</span> Spick(s) von dir. <span style=\"font-size:0.8em;\">(Gesamt: <span id=\"completespicks\">N/A</span>)</span></b></p><p style=\"font-size:0.7em; color:#9F1414;\">(Noch <span id=\"time\"></span> bis zum Abschluss.)</p><p>Noch <input type=\"text\" id=\"soll\" value=\"0\" style=\"width:80px;\" /> mal spicken. <input type=\"button\" id=\"startstop\" value=\"Starten\" /></p><div id=\"progressbar\" style=\"height:10px; width:320px; background-color:lightgrey; margin-top:15px; border:1px solid silver;\"><div id=\"progress\" style=\"background:url(http://content.spickmich.de/images/s/etc/rank_bar.jpg); height:100%; background-color:red; width:0px;\"></div></div></div>");
		$("#autospicker #closespickmenue").click(function() { $("#autospicker").fadeOut(); $("#autospicker #startstop").attr("value","Starten"); $tempvar = false; }); $("#openautospicker").click(function(){ $("#autospicker").fadeIn(); return false; }); $("#autospicker #startstop").click(function() { if($(this).attr("value") == "Starten") { $(this).attr("value","Stoppen"); makeSpick(userid); } else { $(this).attr("value","Starten"); $tempvar = false; }}); $("#autospicker #soll").change(function(){ var time = $("#autospicker").find("#time"); var seconds = (parseInt($(this).val())*32); var minutes = Math.floor(seconds/60); seconds = seconds - (minutes*60); time.text(minutes+" Min. "+seconds+" Sek."); });
    }
	
	function makeSpick(userid) {
		var cursoll = parseInt($("#autospicker").find("#soll").val());
		if(cursoll > 0 && $("#autospicker").find("#startstop").attr("value") != "Starten") { 
			$.tempvar = false; $("#autospicker").find("#soll").val(cursoll-1);
			spick(userid);
			var cur = parseInt($("#autospicker").find(".spicks").text()); $("#autospicker").find(".spicks").text(cur+1); $("#autospicker").find("#soll").change();
			setTimeout(function() { $.tempvar = true; makeprogress(userid); $.ajax({url: "http://www.spickmich.de/profil/"+userid,cache: false,async:true,success: function(html){spicks = $(html).find("#mainContent #p>div>#profileRightColumn>#profileBox>div>div:eq(1)>div:eq(4)").text().replace(/Gespickt worden/,"").replace(/\:/,"").replace(/x gespickt/,""); $("#autospicker").find("#completespicks").text(spicks); }}); },100);
		} else { $("#autospicker").find("#startstop").attr("value","Starten"); }
	}
function spick(sid) { $.ajax({url:"http://www.spickmich.de/spick/"+sid, async:true, type:"GET", success:function(msg,stat) { if(msg.length > 0) { var form = $(msg).find("#mainContent #p #spickBox #spickOk");	var t = form.children("input[name=t]").val();	var th = form.children("input[name=th]").val();	$.post("http://www.spickmich.de/spick/"+sid,{hash:"",spick:"1",t: form.children("input[name=t]").val(), th: form.children("input[name=th]").val()});}}});}

	function getUserId(object) { var splits = $(object).children("img").attr("src").split("/"); var lastindex = splits.length-1; return splits[lastindex].replace(/120_/,"").replace(/\.jpg/,""); };
	function makeprogress(userid) { var curwidth = $("#autospicker").find("#progressbar>#progress").width(); if(curwidth <= 319 && $.tempvar) { $("#autospicker").find("#progressbar>#progress").width(curwidth+1); setTimeout(function() { makeprogress(userid);},100); } else { $("#autospicker").find("#progressbar>#progress").width(0); makeSpick(userid); }}