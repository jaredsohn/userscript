// ==UserScript==
// @name        Scrap.tf Chat for chatjunkies
// @namespace   scraptf
// @description Improves the chat so it is more comfortable for the regulars. Only enabled on HOME/mobilechat!
// @include     http://scrap.tf/
// @include	http://*.scrap.tf/mobilechat.php
// @version     12
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.$jQ$=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function() {
	window.JKYmobile = (window.location.href == "http://scrap.tf/mobilechat.php");
	window.JKYenlarged = false;
	window.JKYsettingsOpen = false;
	window.JKYwidth = 300;
	window.JKYlastChat = {userid:-1,name:'',text:'',count:1};
	window.JKYsendTimeout = null;
	window.JKYfloodProtect = 0;
	window.JKYmoderator = ($('#ChatLimit').length > 0);
	window.onblur = function() {
		if(localStorage.JKYafkline == "false") return;
		$("#chat-history ul li:first").css({'border-top':'3px dashed red','padding-top':'2px'});
	}
	if(localStorage.beepTriggers) window.beepTriggers = localStorage.beepTriggers.split(',');
	else window.beepTriggers = [];
	if(localStorage.JKYautocomplete) window.JKYautocomplete = localStorage.JKYautocomplete.split('\n');
	else window.JKYautocomplete = [];
	
	
	//logChat overwrites scrap.tf's original logchat so that we can tweak some stuff...
	window.logChat = function(avatar,name,text,color,userid,title,bgColor,lvl) {
		bgColor=(bgColor==undefined)?"":bgColor;title=(title==undefined)?"User":title;
		color=color.replace(/;.*$/,'');
		var currentTime=new Date(), hours=currentTime.getHours(), minutes=currentTime.getMinutes();
		if(minutes < 10) minutes = "0"+minutes;
		
		if(userid==JKYlastChat.userid && text==JKYlastChat.text && name==JKYlastChat.name) {
			//stack the same subsequent messages and provide indicator...
			JKYlastChat.count++;
			$("#chat-history ul li .pull-left").filter(":first").html(
			  '<div class="badge badge-warning">'+JKYlastChat.count+'</div>'
			);
			return;
		}
		JKYlastChat.userid = userid; JKYlastChat.text = text; JKYlastChat.name = name; JKYlastChat.count = 1;
	
		//cook the chatlog entry together and output it...
		var txt = (text!='<br/>')? text : ' ';
		var entry = "<li style='clear:both;padding-bottom:1px;min-height:38px;' class='chatmsg lvl"+lvl+"'>"+
			"<div class='pull-left' style='width:40px;height:40px;border:1px solid "+color+";background:url(\""+avatar+"\");background-size:100% 100%;'></div>"+
			"<i class='pull-right' style='font-size:11px;'>"+hours+":"+minutes+"&nbsp;</i><span>"+
			"<a class='chat-ulink group"+lvl+"' title='"+title+" (id:"+userid+")' target='_blank' href='/profile?u="+userid+"'>"+
			name+"</a></span><div>"+txt+"</div></li>";
		if(localStorage.JKYfadein == "true") $(entry).hide().prependTo("#chat-history ul").fadeIn('fast');
		else $("#chat-history ul").prepend(entry);
		$("#chat-history .chat-ulink").filter(":first").tooltip(); //better performance if it just gets called once
		
		if($("#chat-history").children().children().length>200)
			$("#chat-history ul li").filter(":last").remove(); //better performance
		
		//trigger chat beep if the settings tell us to do so...
		if(localStorage.chatBeep == "trigger" && userid != window.userid) {
			for(p=0;p<beepTriggers.length;p++) {
				if (text.toUpperCase().indexOf(beepTriggers[p].toUpperCase())!=-1) {
					document.getElementById("chatBeep").play();
					break;
				}
			}
		} else if(userid == window.userid || userid==undefined) {
			JKYsendTimeout = window.setTimeout(function(){JKYsendTimeout = null;}, 2001);
		}
		if(userid==0 || userid==undefined) {
			if(text.indexOf("already in the chat! Kicked.")!=-1) {
				socket.disconnect(); socket.removeAllListeners();
				logSmall("<a href='javascript:location.reload()'>[Reload page]</a>");
			}
		} else if(JKYfloodProtect>0) JKYfloodProtect--;
	}
	window.logSmall = function(txt) { //small status messages... supress repeating messages (join/leave spam)
		//emergency shutdown in the rare condition that causes chat flooding (its an issue with jesses client logic)
		if(JKYfloodProtect>5) {
			socket.disconnect(); socket.removeAllListeners();
			txt = "PREVENTED FLOODING DUE TO WEAK CONNECTION!<br/><a href='javascript:location.reload()'>[Reload page]</a>";
		} else if ( txt == "<span style='color:red;'>Unknown socket error</span>" ||
					txt == "<span style='color:red;'>Reconnected!</span>" ) {
			JKYfloodProtect++;
		}
		if(localStorage.JKYlogsmall == "false") return;
		if(txt.indexOf("null left chat. (null)") != -1) return;
		txt = txt.replace(/'/gi,'"');
		var statusfeed = $("#chat-history ul .statusmsg");
		if(txt == $(statusfeed.get(0)).html()) return;
		$("#chat-history ul").prepend("<li class='statusmsg' style='text-align:right;font-size:12px;'>" + txt + "</li>");
	}
	window.sendchat = function(e) {
		if (e.which == 13 && !JKYsendTimeout) {
			var text = $("#chat-input-txt").val();
			if(text === '' || text === ' ') return;
			JKYsendTimeout = window.setTimeout(function(){JKYsendTimeout = null;}, 4000);
			sendChat2();
		}
	}
	
	var chatSymbols = [
		'&#x263A;','&#x2639;','&#x2764;','&#x2605;','&#x2606;','&#x2620;','&#x2622;','&#x2623;',
		'&#x2600;','&#x270C;','&#x2601;','&#x2602;','&#x2767;','&#x260E;','&#x2610;','&#x2611;',
		'&#x262D;','&#x262E;','&#x262F;','&#x265E;','&#x2665;','&#x266B;','&#x2615;','&#x2612;',
		'&#x266A;','&#x2728;','&#x272E;','&#x2736;','&#x2744;','&#x2791;','&#x2658;','&#x3393;',
		'&#x2708;','&#x2709;','&#x2714;','&#x2718;','&#x2508;','&#x241B;','&#x21F5;','&#x2794;',
		'&#x22D9;','&#x22D8;','&#x22C0;','&#x27B7;','&#x2404;','&#x2406;','&#x25B2;','&#x25B3;',
		];
	
	window.autocompleteList = function(query, process) {
		var list = [
			"!derpymail ","!factcore","!forget ","!helpme","!learn [","!mytwitch ","!myworth","!queuesim","!twitch","!youtube",
			"Pinkie: ","/me asks Pinkie Bot about their relation",
			"[pikaattack]","[pikaawesome]","[pikarape]","[pikasay]"
		];
		if(JKYmoderator) list.push("/kick ","!mute","!unmute","[pikamute]");
		if(JKYautocomplete.length>1) list = list.concat(JKYautocomplete);
		process(list);
	};
	$(function(){
		if(localStorage.JKYtypeahead == "true") {
		  $('#chat-input-txt').typeahead({
			items: 3,
			source: autocompleteList,
			matcher: function(item) {
				if(this.query===item) return false;
				if(this.query.length<3 && this.query[0]!=='!' && this.query[0]!='[') return false;
				if(item.toUpperCase().indexOf(this.query.toUpperCase())==0) return true;
			},
			updater: function (item) {
				if($("#chat-input-txt").val()!='') return item;
			}
		});
		$('.typeahead.dropdown-menu').filter(':last').css({
			'z-index':99999999999,
			'font-size':'12px',
			'opacity': 0.8
		});
	  }
	});
	if(JKYmoderator) {
		$(".chat-admin").css({height:24,fontSize:0});
		$('#ChatLimit').css({height:10,width:'92%',fontSize:10});
		$('#ChatLimit').attr('placeholder', 'Set chat limit level...');
	}
	$("#send-chat").html("&crarr;").css({width:'18px'});
	$("#chat-header").append('<div id="JKY-btn-right" class="pull-right" style="margin-top:-5px;margin-right:5px;"></div>');
	$("#chat-header").append('<div id="JKY-btn-left" class="pull-left" style="margin-top:-5px;margin-right:5px;"></div>');
	if(!JKYmobile) $("#JKY-btn-right").append(
		'&nbsp;<button id="JKY-togglechat" class="btn btn-inverse" onClick="JKYtoggleChat()"'+
		'title="expand/shrink chat">&#x25BA;</button>');
	else {
		$("#chat-content").css({width:'auto'});
		$("#chat-header").css({width:'100%'});
	}
	$("#JKY-btn-left").append(
		'<button id="JKY-settings" class="btn btn-inverse" onClick="JKYsettings()"'+
		'title="Chat settings">&#x2042;</button>&nbsp;');
	$("#JKY-btn-right").prepend('<div class="btn-group"><a class="btn dropdown-toggle" data-toggle="dropdown" href="#">&#x263A;</a><ul class="dropdown-menu" style="left:-162px;margin-top:40px;"></ul></div>');
	$(function(){
		var html = '<li>';
		$.each(chatSymbols, function(index, value) {
			if(index%8==0) html += '</li><li>';
			html += '<button class="btn" style="width:22px">'+value+'</button>';
		}); html += '</li>';
		$("#JKY-btn-right .dropdown-menu").append(html);
		$("#JKY-btn-right .dropdown-menu button").click(function(){
			var input = $("#chat-input-txt");
			input.val(input.val() + $(this).text());
		});
	});
	
	if(localStorage.chatBeep == "true")
		$("#JKY-btn-left").append(
			'<button id="JKY-notifier" class="btn btn-success" onClick="JKYtoggleBeep()"'+
			'title="Chat-beeps (green: all, yellow: triggers, red: off)">&#x266B;</button>');
	else if(localStorage.chatBeep == "false")
		$("#JKY-btn-left").append(
			'<button id="JKY-notifier" class="btn btn-danger" onClick="JKYtoggleBeep()"'+
			'title="Chat-beeps (green: all, yellow: triggers, red: off)"><s>&#x266B;</s></button>');
	else
		$("#JKY-btn-left").append(
			'<button id="JKY-notifier" class="btn btn-warning" onClick="JKYtoggleBeep()"'+
			'title="Chat-beeps (green: all, yellow: triggers, red: off)">&#x266A;</button>');

	window.JKYtoggleChat = function() {
	  if(!JKYenlarged) {
	    JKYwidth = (window.innerWidth < 600)? window.innerWidth-10 : 590;
		if(window.innerWidth > 740)
			$("#chat-hover").css({left:JKYwidth+'px',bottom:'2px'});
		$("#JKY-togglechat").html("&#x25C4;");
		$("#chat-pull-tab").animate({left:(JKYwidth-74)+'px'});
		$("#chat-sidebar-container").animate({width:JKYwidth+'px'});
		$("#chat-input-txt").animate({width:(JKYwidth-100)+'px'});
		JKYenlarged = true;
	  } else {
	    JKYwidth = 300;
		$("#JKY-togglechat").html("&#x25BA;");
		$("#chat-pull-tab").animate({left:(JKYwidth-74)+'px'});
	    $("#chat-sidebar-container").animate({width:JKYwidth+'px'});
		$("#chat-hover").css({left:'',bottom:'',display:'none'});
		$("#chat-input-txt").animate({width:(JKYwidth-100)+'px'});
		JKYenlarged = false;
	  }
	}
	window.JKYtoggleBeep = function() {
		if(localStorage.chatBeep == "true") {
			$("#JKY-notifier").html("&#x266A;");
			$("#JKY-notifier").removeClass("btn-success");
			$("#JKY-notifier").addClass("btn-warning");
			localStorage.chatBeep = "trigger";
		} else if(localStorage.chatBeep == "false") {
			$("#JKY-notifier").html("&#x266B;");
			$("#JKY-notifier").removeClass("btn-danger");
			$("#JKY-notifier").addClass("btn-success");
			localStorage.chatBeep = "true";
		} else {
			$("#JKY-notifier").html("<s>&#x266B;</s>");
			$("#JKY-notifier").removeClass("btn-warning");
			$("#JKY-notifier").addClass("btn-danger");
			localStorage.chatBeep = "false";
		}
	}
	window.JKYsettings = function() {
		if(JKYsettingsOpen)
			return $('#JKY-settings-panel').fadeOut(500,function(){$(this).remove();JKYsettingsOpen=false;});
		var panewidth = (JKYmobile)? '100%' : JKYwidth+'px';
		var settingsPane = document.createElement("div");
		settingsPane.setAttribute("id", "JKY-settings-panel");
		settingsPane.setAttribute("style", "position:fixed;z-index:99999999;bottom:0;left:0;width:"+panewidth+";padding:10px;background:#fff;display:none;font-size:10px!important;");
		document.body.appendChild(settingsPane);
		$("#JKY-settings-panel").append(
			'<fieldset><legend>Chat settings</legend>'+
			'<input id="JKY-settings-triggers" type="text" style="width:96%;font-size:10px;height:11px"'+ 'title="Words to trigger the chat-beep. Separate with COMMAS!" placeholder="your name,raffle,..."'+
			'value="'+beepTriggers+'"/>'+
			'<label class="checkbox"><input id="JKY-settings-fadein" type="checkbox" value="fading">'+
			'<small>Fade-in of new chat lines. May impact performance!</small></label>'+
			'<label class="checkbox"><input id="JKY-settings-afkline" type="checkbox" value="afkline">'+
			'<small>Indicator (red line) when you switched tabs/windows.</small></label>'+
			'<label class="checkbox"><input id="JKY-settings-logsmall" type="checkbox" value="logsmall">'+
			'<small>Show "small" status messages (join/leave/etc.)</small></label>'+
			'<label class="checkbox"><input id="JKY-settings-typeahead" type="checkbox" value="typeahead">'+
			'<small>Autocomplete text input [REQUIRES RELOAD]</small></label>'+
			'<textarea id="JKY-settings-autocomplete" title="Put your custom autocomplete-lines here." '+
			'style="width:96%;height:50px;font-size:10px;line-height:12px">'+JKYautocomplete.join('\n')+'</textarea>'+
			'<button class="btn btn-primary" onClick="JKYsave()">Save</button>'+
			'<button class="btn btn" onClick="JKYsettings()">Cancel</button>'+
			'&nbsp;&nbsp;&nbsp;<a href="javascript:window.sidebar.addPanel(\'Scrap.tf - Chat sidebar\',\'http://scrap.tf/mobilechat.php\',\'\');" style="font-size:8px">[Add sidebar-chat bookmark (FF only!)]</a></fieldset>'
		);
		if(localStorage.JKYfadein == "true") $("#JKY-settings-fadein").prop('checked', true);
		if(localStorage.JKYafkline != "false") $("#JKY-settings-afkline").prop('checked', true);
		if(localStorage.JKYlogsmall != "false") $("#JKY-settings-logsmall").prop('checked', true);
		if(localStorage.JKYtypeahead == "true") $("#JKY-settings-typeahead").prop('checked', true);
		$("#JKY-settings-panel").fadeIn();
		JKYsettingsOpen = true;
	}
	window.JKYsave = function() {
		if(!JKYsettingsOpen) return;
		var triggers = $("#JKY-settings-triggers").val().split(",");
		for(p=0;p<triggers.length;p++) triggers[p] = $.trim(triggers[p]);
		beepTriggers = triggers;
		localStorage.beepTriggers = triggers.join(",");
		
		if($("#JKY-settings-fadein").prop('checked')) localStorage.JKYfadein = "true";
		else localStorage.JKYfadein = "false";
		
		if($("#JKY-settings-afkline").prop('checked')) localStorage.JKYafkline = "true";
		else localStorage.JKYafkline = "false";
		
		if($("#JKY-settings-logsmall").prop('checked')) localStorage.JKYlogsmall = "true";
		else localStorage.JKYlogsmall = "false";
		
		if($("#JKY-settings-typeahead").prop('checked')) localStorage.JKYtypeahead = "true";
		else localStorage.JKYtypeahead = "false";
		var autocomplete = $('#JKY-settings-autocomplete').val();
		if(autocomplete.length>5) {
			localStorage.JKYautocomplete = autocomplete;
			JKYautocomplete = localStorage.JKYautocomplete.split('\n');
		} else {
			localStorage.JKYautocomplete = null;
			JKYautocomplete = [];
		}
		
		$("#JKY-settings-panel").fadeOut(500, function() {$(this).remove();})
		JKYsettingsOpen = false;
	}

});