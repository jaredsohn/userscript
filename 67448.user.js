// ==UserScript==
// @name           InvoDrop
// @namespace      userscripts
// @include        http://*videosift.com/video/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

GM_addStyle("#invoDropMenu {display:none;position:fixed;z-index:700000;font-family:verdana;} ");
GM_addStyle("#invoDropMenu ul {list-style:none; margin:0; padding:0px; font-size:12px;} ");
GM_addStyle("#invoDropMenu a {padding: 5px; display:block;}");
GM_addStyle("#invoDropMenu a:hover {background-color: #0273C2; color: #f7f7f7;}");
GM_addStyle(".invoIcon {vertical-align:top; padding: 0 6px 2px 2px;}");
GM_addStyle("#chanMgr {margin: 0pt auto; padding: 7px; z-index: 800000; position: fixed; text-align: center; width: 250px; height: 280px;display:none;}");
GM_addStyle("#chanOverlay {z-index:777777; position: fixed; display:none;width:100%; height:100%; background-color: #000000; opacity: 0.8;top:0; left:0;}");
GM_addStyle("#chanMgrClose {background: #660000; border: 1px solid #aa0000; margin-right: 0; font-family:verdana; font-size: 10px; padding: 0 3px 3px 3px; color: #fff;}");
GM_addStyle("#chanMgrClose:hover {background: #aa0000;}");

var chanNames = new Array("1sttube","controversy","geek","meme","spacy","80s","cooking","grindhouse","metal","sports","actionpack","cult","happy","military","standup","animation","cute","health","money","talks","art","dance","hiphop","music","teens","asia","dark","history","mystery","terrible","blues","documentaries","horrorshow","nature","timeshift","books","downunder","howto","news","travel","brain","drugs","humanitarian","obscure","videogames","bravo","eco","islam","parody","vintage","british","eia","jazz","philosophy","viral","canada","election08","kids","politics","waronterror","catsanddogs","engineering","latenight","religion","wheels","cinema","fail","law","rocknroll","wildwestshow","comedy","fear","lies","science","wings","comics","femme","livemusic","scifi","woohoo","commercial","future","love","sexuality","worldaffairs","conspiracy","gay","magic","shortfilms","wtf");

var icoInvo = "http://static1.videosift.com/cdm/ico/comment_alert.png";
var arrInvos = new Array("beg", "discard","kill", "dead","notdead", "discuss", "findthumb", "brief", "long", "nsfw", "blocked", "channels", "nochannel", "dupeof", "amazon", "promote", "quality");
var arrIcons = new Array("http://i49.tinypic.com/2w207es.png","http://i47.tinypic.com/dlg77a.png", "http://i47.tinypic.com/dy3rd0.png","http://i48.tinypic.com/35ibuhv.png", 
										 "http://i45.tinypic.com/332w5cz.png", "http://i45.tinypic.com/2eo9y1l.png", "http://i47.tinypic.com/2d813qe.png", "http://i49.tinypic.com/2qlz6ab.png", 
										 "http://i49.tinypic.com/2qlz6ab.png", "http://i45.tinypic.com/2vanlp4.png","http://i46.tinypic.com/19a25z.png", "http://i49.tinypic.com/2vjudtt.png", 
										 "http://i50.tinypic.com/n4i0x5.png", "http://i45.tinypic.com/2vagp3o.png", "http://i45.tinypic.com/295d2j5.png", "http://i48.tinypic.com/2qd661w.png", 
										 "http://i48.tinypic.com/2wna6it.png", "http://i50.tinypic.com/1zf3msy.png", "http://i46.tinypic.com/2cr7pnc.png");
var iconUrl = "http://localhost/videosift/ico/";
var userName = $("#userlink").html();
if ($(".post").find(".profilelink").find("strong").size() == 0) 
	var posterName = $(".post").find(".profilelink").html();
else 
	var posterName = $(".post").find(".profilelink").find("strong").html();
var ownPost = (userName == posterName);
var chanChange = false;
var t;
var isAuto = false;


function autoComp() {
	var matches = new Array();
	var i = 0;
	isAuto = true;
	input = document.getElementById("chanMgrTxt");
	chanPart = $("#chanMgrTxt").val();
	while (matches.length < 2 && i < chanNames.length) {
		if (chanNames[i].indexOf(chanPart.toLowerCase()) == 0) matches.push(chanNames[i]);
		i++;
	}
	//$(matches).each(function(key, value) {GM_log(value);});
	if (matches.length > 0) {
		l = input.value.length;
		input.value = matches[0];
		input.selectionStart = l;
        input.selectionEnd = matches[0].length;
	}
	isAuto = false;
}

function findPos(obj) {
	var curtop = 0;
	var curleft = 0;
    if (obj.offsetParent)
    {
        while (obj.offsetParent)
        {
            curtop += obj.offsetTop
			curleft += obj.offsetLeft
            obj = obj.offsetParent;
        }
    }
    return {left:curleft,top:curtop}
}

function scrollPos() {
	var scrollLeft = 0;
	var scrollTop = 0;
	if (typeof window.pageYOffset != 'undefined') {
		scrollTop = window.pageYOffset;
		scrollLeft = window.pageXOffset;
	}
	else if (typeof document.compatMode != 'undefined' &&
		document.compatMode != 'BackCompat') {
		scrollTop = document.documentElement.scrollTop;
		scrollLeft = document.documentElement.scrollLeft;
	}
	else if (typeof document.body != 'undefined') {
		scrollTop = document.body.scrollTop;
		scrollLeft = document.body.scrollLeft;
	}
	return {left:scrollLeft,top:scrollTop}
}

function addChan() {
	var chanTxt = $("#chanMgrTxt").val();
	if (chanTxt != "") {
		$("#chanSel").append('<option name="'+chanTxt+'">'+chanTxt+'</option>');
		$("#chanMgrTxt").val("");
		chanChange = true;
	} else {
		alert("Please enter a channel name into the marked textbox");
		$("#chanMgrTxt").css("border-color", "#ff0000");
	}
	return false;
}

function showChanMgr(chans) {

	chanChange = false;
	$('<div id="chanOverlay">&nbsp;</div>').appendTo("body").fadeIn("slow");
	$('<div id="chanMgr" class="box"></div>').appendTo("body").fadeIn("slow");
	$("#chanMgr").append('<div style="margin: -4px -5px -5px; float: right;"><a id="chanMgrClose" href="#">x</a></div>'+
										 '<div class="title" style="vertical-align: middle; text-align: center; margin-top: 0pt; margin-left: 5px;">Manage Channels</div>'+
										 '<select style="width: 90%; margin-top: 10px; height: 60%;" multiple="" name="chanSel" id="chanSel"></select>'+
										 '<div style="width: 100%; margin-top: 5px;"><input type="text" id="chanMgrTxt" style="width: 43%;" /> <input id="chanMgrAdd" type="button" value="add" /> <input id="chanMgrRemove" type="button" value="remove" /></div>'+
										 '<div style="width: 100%; margin-top: 18px;"><input type="button" id="chanMgrSave" value="Save" /> <input type="button" id="chanMgrCancel" value="Cancel" /></div>');
	$("#chanMgr").css({'top':(window.innerHeight / 2 - 200) + 'px', 'left':(window.innerWidth / 2 - 125) + 'px'});
	
	$.each(chans, function(key,value) {
		$("#chanSel").append('<option name="'+value+'">'+value+'</option>');
	});
	
	$("#chanMgrCancel").add("#chanMgrClose").click(function() {
		$("#chanMgr").add("#chanOverlay").fadeOut("slow", function() {$(this).remove()});
		return false;
	});
	
	$("#chanMgrRemove").click(function() {
		$("#chanSel option:selected").remove();
		chanChange = true;
		return false;
	});
	
	$("#chanMgrAdd").click(addChan);
	
	$("#chanSel").focus(function() {
		$("#chanMgrTxt").css("border-color", "");
    });

	$("#chanMgrSave").click(function() {
		if (chanChange) {
			var commentTxt = "*nochannel";
			$("#chanSel option").each(function() {
				commentTxt += " *" + $(this).html();
			});
			$("textarea[id*=commenttxtbox]").val($("textarea[id*=commenttxtbox]").val() + commentTxt);
			$("#addcomment").find(".button").click();
		}
		$("#chanMgr").add("#chanOverlay").remove();
	});
	
	$("#chanMgrTxt").keyup(function(e) {
	
		//GM_log(e.keyCode);
		if (e.keyCode == "13") addChan();
		else if (isAuto == false) {	
			clearTimeout(t);
			t = setTimeout(autoComp, 400);
		}
		
	});
	
	$("#chanMgrTxt").keydown(function() {
	
		if (isAuto == false) {	
			clearTimeout(t);
		}
		
	});
}

function buildMenu() {

	$("body").append('<div class="box" id="invoDropMenu"><ul></ul></div>');
	$.each(arrInvos, function(key, value) {

		if (!((value == "beg" || value == "kill" || value == "discard") && !ownPost)) {
		
			$('<a href="#" name="'+value+'"><img class="invoIcon" src="'+arrIcons[key]+'" />'+value+'</a>').click(function() {
			
				check = true;
				invo =  $(this).attr("name");
				if (invo == "kill" || invo == "discard" || invo == "promote" || invo == "quality") check = confirm('Do you really want to '+invo+' this video?');
				if (invo == "dupeof" || invo == "amazon") { 
					url = prompt("Please enter the relevant URL", "");
					if (url != null) {
						$("textarea[id*=commenttxtbox]").val($("textarea[id*=commenttxtbox]").val() + "*" + $(this).attr("name") + "=" + url);
						$("#addcomment").find(".button").click();
					}
				} else if (invo == "channels") {
				
					var channels = "";
					$("#cont_flags").find("a span").each(function() {channels += ($(this).html() + ",");});
					channels = channels.substring(0, channels.length - 1);
					showChanMgr(channels.split(","));
					//var newchans = prompt("Please enter the channels you want to assign to this video.", channels);
					//newchans = newchans.replace(/[ ]/g, "");
				
				} else if (check) {
					$("textarea[id*=commenttxtbox]").val($("textarea[id*=commenttxtbox]").val() + "*" + $(this).attr("name"));
					$("#addcomment").find(".button").click();
				}
				$("#invoDropMenu").hide();
				return false;
				
			}).appendTo("#invoDropMenu ul").wrap('<li></li>');
			
		}
	
	});
}

buildMenu();
$("h1[class='title']").next().append('<a id="invoDropLink" href="#">&nbsp;<img src="'+icoInvo+'" />&nbsp;Invocations</a>');
$("#invoDropLink").mouseover(function() {

	posi = findPos(this);
	$("#invoDropMenu").css({'top' : ((posi.top  - scrollPos().top) + 14 ) + 'px', 'left' : (posi.left + 6) + 'px'});
	$("#invoDropMenu").show();

});

$("#invoDropMenu").mouseleave(function() {$("#invoDropMenu").hide();});
$("#invoDropLink").mouseleave(function(e){

	if (!($(e.relatedTarget).is('#invoDropMenu, #invoDropMenu *'))) {
	
		$("#invoDropMenu").hide();
	
	}

});