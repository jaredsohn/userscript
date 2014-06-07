// ==UserScript==
// @name           Clockwork Llama V2
// @namespace      nuckchorris
// @description    Sends a message to the GiveALlamaGetALlama chatroom every 3 minutes.
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

if(typeof __PAGE_SCOPE_RUN__ == 'undefined') {
   (function page_scope_runner() {
      var script = document.createElement('script');
      script.setAttribute("type", "text/javascript");
      script.setAttribute("id", "CW-JS");
      script.textContent = "(function() { var __PAGE_SCOPE_RUN__ = 'yes'; (" + page_scope_runner.caller.toString() + ")(); })();";
      document.getElementsByTagName('head')[0].appendChild(script);
   })();
   return;
}

var cwCur = ({
	CWL: {
		name: "Clockwork Llama",
		updateStream: "release",
		version: 1.5,
		date: "2010/8/14 18:03",
		url: "http://userscripts.org/scripts/source/73698.user.js"
	}
});

var clockworkLlama = window.clockworkLlama = function(r, t){
	this.room = (!r)?'clockworkLlama':r;
	this.time = (!t)?({m:3,s:0}):t;
	this.name = dAmn_Client_Username;
}
clockworkLlama.prototype = window.cw = window.clockworkLlama.prototype = ({
	room: 'clockworkLlama',
	time: {m:3,s:0},
	i: 0,
	timer: "",
	showConfig: function() {
		MiddleMan.Interface.openDialog({'innerHTML':"<div style=\"z-index: 40; position: relative; width: auto;\" class=\"gr-box gr-configbox\" id=\"llama-modal\">\n<i class=\"gr1 gt1\"><i></i></i>\n<i class=\"gr2 gt2\"><i></i></i>\n<i class=\"gr3 gt3\"><i></i></i>\n<div class=\"gr-top\">\n<i class=\"tri\"></i>\n<div class=\"gr\">\n<h2><i class=\"icon i6\"></i>The Clockwork Llama</h2>\n</div>\n</div>\n<div style=\"overflow: hidden;\" class=\"gr-body\">\n<div style=\"margin-top: 0px;\" class=\"gr\">\n<div class=\"ppp\">\n<div class=\"cctextarea\" style=\"margin-bottom: 0px;\">\n<div class=\"cctextarea-ctrl\">\n<textarea class=\"text\" style=\"height: 110px; width: 500px; margin: 5px;\" name=\"llama-msg\" id=\"llama-msg\"></textarea>\n<div style=\"word-wrap: break-word; font-weight: normal; width: 575px; font-family: verdana; line-height: 17px; font-size: 12px; padding-left: 3px; padding-bottom: 3px; padding-right: 110px; padding-top: 3px; position: absolute; display: none; \">&nbsp;</div>\n</div>\n</div>\n</div>\n<div class=\"cw-toolbar\">\n<a onclick=\"Tools.Quality.b()\" class=\"mi iconset-quality\">\n<i class=\"i1\"></i><span class=\"cw-toolbar-button-text\">bold</span>\n</a>\n<div class=\"cw-sep\"></div>\n<a onclick=\"Tools.Quality.i()\" class=\"mi iconset-quality\">\n<i class=\"i2\"></i><span class=\"cw-toolbar-button-text\">italic</span>\n</a>\n<div class=\"cw-sep\"></div>\n<a onclick=\"Tools.Quality.u()\" class=\"mi iconset-quality\">\n<i class=\"i3\"></i><span class=\"cw-toolbar-button-text\">underline</span>\n</a>\n<div class=\"cw-sep\"></div>\n<a onclick=\"Tools.Quality.sup()\" class=\"mi iconset-quality\">\n<i class=\"i4\"></i><span class=\"cw-toolbar-button-text\">superscript</span>\n</a>\n<div class=\"cw-sep\"></div>\n<a onclick=\"Tools.Quality.sub()\" class=\"mi iconset-quality\">\n<i class=\"i5\"></i><span class=\"cw-toolbar-button-text\">subscript</span>\n</a>\n</div>\n<div class=\"subscription_pitch no_subscription\" style=\"display: block;\">\nBecome a SpecialLlama to unlock more features. <span id=\"upgradeLink\">How do I do that?</span><div id=\"upgradeInfo\" style=\"display: none;\"><p style=\"line-height: 0.25em;\"></p>To become a SpecialLlama, you can <b>(a)</b> write a journal promoting this chat or <b>(b)</b> start using <a href=\"http://neg0ne.deviantart.com/art/Free-Llama-Journal-160895443\" class=\"skinLink\">this great llama-themed journal skin</a> <i>(requires a deviantART subscription)</i>. <p style=\"line-height: 0.25em;\"></p>Either way, just tell a moderator in here afterwards.  <b>Do not</b> use a comment or a note to tell a mod, as they will not respond.</div>\n</div>\n<div class=\"gr-hijack c pp\">\n<table align=\"center\" class=\"f\">\n<tbody>\n<tr>\n<td style=\"padding: 0pt 8px;\">\n<a style=\"cursor: pointer;\" onclick=\"localStorage.llamaMessage=document.getElementById('llama-msg').value; MiddleMan.Interface.closeDialog();\" class=\"smbutton smbutton-blue smbutton-big\" id=\"CWL-savebtn\"><span class=\"post\">Save</span></a>\n</td>\n<td style=\"padding: 0pt 8px;\">\n<a style=\"cursor: pointer;\" onclick=\"MiddleMan.Interface.closeDialog();\" class=\"smbutton smbutton-big\"><span class=\"preview\">Cancel</span></a>\n</td>\n</tr>\n</tbody>\n</table>\n<span style=\"float: right; clear: none; position: relative; display: block;\" id=\"CWL-chars\">250</span>\n</div>\n</div>\n</div>\n<i class=\"gr3 gb\"></i>\n<i class=\"gr2 gb\"></i>\n<i class=\"gr1 gb gb1\"></i>\n</div>"});
		jQuery('#llama-msg').val(localStorage.llamaMessage);
		jQuery('#upgradeLink').click(function () {
			jQuery('#upgradeInfo').animate({
				height: "toggle"
			}, {
				duration: 250,
				step: function (cur) {
					var box = jQuery(this).parent().parent().parent().parent().parent().parent().parent();
					box.css('margin-top', -(box.height() / 2));
				}
			});
		});
		jQuery('img.modal-shadow').css('display','none');
		jQuery('a.x').addClass('cw-x');
		jQuery('#llama-msg').keyup(window.cw.charCount);
		window.cw.charCount();
		window.cw.util.fixToolbarPos();
		jQuery.each(dAmnChats["chat:"+this.room].members.pclist,function(key,value){
			if (value.name==dAmnChats["chat:"+this.room].members.members[dAmn_Client_Username].info.pc){
				this.order = value.order;
			}
		});
		if (this.pc == "SpecialLlamas" || this.order >= 85) {
			jQuery(".subscription_pitch").addClass("has_subscription");
		} else if (this.pc == "BabyLlamas") {
			jQuery(".subscription_pitch").addClass("no_subscription");
		}
	},
	addTimer: function() {
		if (!dAmnChats["chat:"+this.room]) {
			MiddleMan.Event.bind("dAmnChat_self", "join", this.addTimer, function (args) {
				if (args.param == "chat:"+this.room) {
					addTimer();
				}
			});
		} else {
			this.pc = dAmnChats["chat:"+this.room].members.members[this.name].info.pc;
			if (!localStorage.llamaMessage){
				localStorage.llamaMessage = localStorage.llamaMessage;
				localStorage.llamaMessage = undefined;
			}
			this.verAgent = "CWL ";
			this.verAgent += (cwCur.CWL.updateStream == "beta") ? cwCur.CWL.version + " Beta " + cwCur.CWL.betanum : cwCur.CWL.version.toString();
			this.verAgent += " [" + cwCur.CWL.date + "]";
			llamaSpacer = jQuery(document.createTextNode(" | "));
			if (this.time.s < 10) {
					sec = "0" + this.time.s;
				}
			llamaTimerEl = jQuery("<span id=\""+this.room+"-timer\" style=\"cursor: pointer;\" title=\"Click to change message\">"+this.time.m+":"+sec+"</span>");
			llamaBar = jQuery(dAmnChats['chat:'+this.room].channels.main.iconbar_el.firstChild);
			llamaBar.children("a:contains('Chatroom Settings')").before(llamaSpacer);
			llamaSpacer.before(llamaTimerEl);
			jQuery("#"+this.room+"-timer").click(this.showConfig);
			this.countdown();
		}
	},
	countdown: function() {
		if (this.i == 0) {
			MiddleMan.dAmnSend.msg("#"+this.room, localStorage.llamaMessage + "<abbr title=\"" + this.verAgent + "\"></abbr>");
			jQuery("#"+this.room+"-timer").css("color", "inherit");
		}
		this.llamaT = Number((this.time.m.valueOf()*60)+this.time.s.valueOf());
		this.timer = setInterval(function(that){that.interval(that)}, 1000, this);
	},
	interval: function (that) {
		that.llamaT--;
		if (that.llamaT > 0) {
			that.llamaM = Math.floor(that.llamaT / 60);
			that.llamaS = that.llamaT % 60;
			if (that.llamaS < 10) {
				that.llamaS = "0" + that.llamaS;
			}
			jQuery("#"+that.room+"-timer").html(that.llamaM + ":" + that.llamaS);
		} else {
			jQuery("#"+that.room+"-timer").html(that.llamaM + ":" + that.llamaS);
			clearInterval(that.timer);
			that.i++;
			if (that.i < 2 || that.admin == true) {
				that.countdown();
				MiddleMan.dAmnSend.msg("#"+that.room, localStorage.llamaMessage + "<abbr title=\"" + that.verAgent + "\"></abbr>");
			} else if (that.i == 2) {
				that.countdown();
				MiddleMan.dAmnSend.msg("#"+that.room, localStorage.llamaMessage + "<abbr title=\"" + that.verAgent + "\"></abbr>");
				jQuery("#"+that.room+"-timer").unbind("click");
				jQuery("#"+that.room+"-timer").css("color", "red");
			} else {
				jQuery("#"+that.room+"-timer").html("--:--").css("color", "red").bind("click",that,that.unpause);
			}
		}
	},
	unpause: function (thing) {
		console.log(thing);
		thing.data.i = 0;
		thing.data.countdown();
		jQuery("#"+thing.data.room+"-timer").unbind('click');
		jQuery("#"+thing.data.room+"-timer").click(thing.data.showConfig);
		return false;
	},
	charCount: function() {
		var msg = jQuery('#llama-msg').val();
		msg = msg.replace(/<\/?(b|i|u|s|p|li|ul|ol|sub|sup|code|bcode|a( href=".*")?( title=".*")?|img( src=".*").*\/|abbr title=".*"|acronym title=".*"|br ?\/?)(.|\n)*?>|:\w*:/g, " ");
		var msgLen = msg.length;
		jQuery('#CWL-chars').html('' + (250 - msgLen));
		if (msgLen <= 0) {
			jQuery('#CWL-chars').css('color', '#666666');
			jQuery('#CWL-savebtn').addClass('disabledbutton');
		} else {
			if (msgLen <= 250) {
				jQuery('#CWL-savebtn').removeClass('disabledbutton');
			} else {
				jQuery('#CWL-savebtn').addClass('disabledbutton');
			}
			if (msgLen > 225) {
				jQuery('#CWL-chars').css('color', '#d40d12');
			} else {
				if (msgLen > 200) {
					jQuery('#CWL-chars').css('color', '#5c0002');
				} else {
					jQuery('#CWL-chars').css('color', '#666666');
				}
			}
		}
	},
	util: {
		fixToolbarPos: function() {
			jQuery('.cw-toolbar a.mi').length;
			jQuery('.cw-toolbar a.mi').each(function () {
				var button = jQuery(this);
				var text = jQuery('.cw-toolbar-button-text', this);
				var icon = jQuery('i', this);
				text.css('margin-left', ((button.width() - (text.width() + 34)) / 2) + 28);
				icon.css('left', (button.width() - (text.width() + 36)) / 2);
			});
		}
	}
});
document.onload = "var cwl = new clockworkLlama('GiveALlamaGetALlama');cwl.addTimer();";
setTimeout(function(){
	var cwl = new clockworkLlama('GiveALlamaGetALlama');
	cwl.addTimer();
},1000);

var extraCSS = document.createElement("link");
extraCSS.setAttribute("rel", "stylesheet");
extraCSS.setAttribute("type", "text/css");
extraCSS.setAttribute("href", "http://st.deviantart.net/css/v6extra.css");
document.getElementsByTagName("head")[0].appendChild(extraCSS);

var cwCSS = "#llama-modal i.gr1, #llama-modal i.gr2, #llama-modal i.gr3 {margin: 0px}\
.cw-toolbar {\
	overflow: hidden;\
	border-bottom:1px solid #9EB1A2;\
	border-top:1px solid #9AB098;\
	background: -moz-linear-gradient(90deg, #D5DDD3, #DEE8DC) repeat scroll 0 0 transparent;\
	padding-left: 1px;\
}\
.cw-icon {\
    background-image:url(http://i46.tinypic.com/11ca7w7.jpg) !important;\
    top:12px;\
    left:0;\
}\
.cwupdatemenu .oh-l:hover .cw-icon, .cwupdatemenu .oh-l:focus .cw-icon {\
    height:80px;\
    top:-28px;\
}\
div a.oh-l#cw-updatelink .cw-icon {\
	background-image:url(http://i46.tinypic.com/11ca7w7.jpg) !important;\
	top:12px !important;\
	left:0 !important;\
}\
div#cw-updatebutton a.oh-l#cw-updatelink:hover .cw-icon, div#cw-updatebutton a.oh-l#cw-updatelink:focus .cw-icon, div.mmhover#cw-updatebutton a.oh-l#cw-updatelink .cw-icon {\
	height:80px !important;\
	top:-28px !important;\
}\
.mmhover .oh-l .cw-icon {\
	height:80px !important;\
	top:-28px !important;\
}\
div#cw-updatebutton a.oh-l#cw-updatelink {\
	padding-left: 28px !important;\
	padding-right: 10px !important;\
	padding-top: 16px !important;\
}\
.iconset-cw i {\
	background-image: url(http://fc03.deviantart.net/fs71/f/2010/097/0/e/Clockwork_Llama_Smiley_by_nuckchorris0.gif) !important;\
	height: 20px;\
	left: 6px;\
	top: 4px;\
	width: 18px;\
}\
#cw-updatecount {\
	background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#518FA1), to(#39798D));\
	background: -moz-linear-gradient(0% 100% -90deg, #518FA1, #39798D);\
	border-radius: 15px 15px;\
	-moz-border-radius: 15px 15px;\
	font-size: 8px;\
	font-weight: bold;\
	padding: 1px 5px;\
	border:1px solid #285F71;\
}\
span#upgradeLink, a.skinLink {\
	cursor: pointer;\
	text-decoration: none;\
	color: #F5DDDD !important;	\
}\
span#upgradeLink:hover, a.skinLink:hover {\
	text-decoration: underline;\
	color: #E5CCCC !important;\
	text-shadow: 0px 1px 0px #1F0B11;\
}\
div#llama-modal.gr-box {\
	margin-bottom: 0px !important;\
}\
div#llama-modal {\
	-moz-box-shadow: 0 0 5.333px rgba(0,0,0,0.7);\
}\
.gr-configbox#llama-modal i.gr3 i {\
	background-position: 0px -18px !important;\
	border-width: 1px !important;\
}\
.gr-configbox#llama-modal i.gr2 {\
	border-width: 1px !important;\
}\
div.modal a.cw-x {\
	-moz-border-radius: 7px;\
	border-radius: 7px;\
	height: 15px;\
	width: 15px;\
	right: 11px;\
	top: 11px;\
	-moz-box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);\
	-webkit-box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);\
}\
#llama-modal a.mi:hover {\
	background: -moz-linear-gradient(0deg, #c4d2c2, #A6B2A6) repeat scroll 0 0 transparent;\
	background: -webkit-gradient(linear, 0% 0%, 100% 0%, from(#c4d2c2), to(#A6B2A6)) repeat scroll 0 0 transparent !important;\
	padding-top: 0px;\
	padding-bottom: 0px;\
}\
.iconset-quality i {\
	background-image: url(http://i37.tinypic.com/55jlh.jpg) !important;\
	height: 34px;\
	width: 34px;\
	top: 2px;\
	left: 0px;\
}\
.iconset-quality i.i1 {\
	background-position: 0 0;\
}\
.iconset-quality i.i2 {\
	background-position: 0 -34px;\
}\
.iconset-quality i.i3 {\
	background-position: 0 -68px;\
}\
.iconset-quality i.i4 {\
	background-position: 0 -102px;\
}\
.iconset-quality i.i5 {\
	background-position: 0 -136px;\
}\
.cw-toolbar a.mi {\
	background: -moz-linear-gradient(90deg, #D5DDD3, #DEE8DC) repeat scroll 0 0 transparent;\
	color: #677066 !important;\
	float:left;\
	height: 30px;\
	text-align: left;\
	font-family: Verdana, sans-serif;\
	cursor: pointer !important;\
	font-size: 14px;\
	padding-top: 4px !important;\
	text-shadow: 0 1px 0 #F8FCF8;\
	width: 108px;\
	padding-left: 0px;\
}\
.cw-toolbar a.mi i {\
	margin-left: 0px !important;\
}\
.cw-toolbar a.mi:hover {\
	background:-moz-linear-gradient(90deg, #C2D2C0, #D2DBD0) repeat scroll 0 0 transparent !important;\
}";
var	cwStyle = document.createElement("style");
cwStyle.id  = "CWL-CSS";
cwStyle.appendChild(document.createTextNode(cwCSS));
document.getElementsByTagName("head")[0].appendChild(cwStyle);
window.Tools = {};
window.Tools.Quality = ({
	b: function () {
		var msg = jQuery('#llama-msg');
		var start = (msg[0].selectionStart+3);
		var end = (msg[0].selectionEnd+3);
		msg.val(msg.val().slice(0, msg[0].selectionStart) + "<b>" + msg.val().slice(msg[0].selectionStart, msg[0].selectionEnd) + "</b>" + msg.val().slice(msg[0].selectionEnd));
		msg[0].select(start,end);
		msg[0].setSelectionRange(start,end);
		cw.charCount();
	},
	i: function () {
		var msg = jQuery('#llama-msg');
		var start = (msg[0].selectionStart+3);
		var end = (msg[0].selectionEnd+3);
		msg.val(msg.val().slice(0, msg[0].selectionStart) + "<i>" + msg.val().slice(msg[0].selectionStart, msg[0].selectionEnd) + "</i>" + msg.val().slice(msg[0].selectionEnd));
		msg[0].select(start,end);
		msg[0].setSelectionRange(start,end);
		cw.charCount();
	},
	u: function () {
		var msg = jQuery('#llama-msg');
		var start = (msg[0].selectionStart+3);
		var end = (msg[0].selectionEnd+3);
		msg.val(msg.val().slice(0, msg[0].selectionStart) + "<u>" + msg.val().slice(msg[0].selectionStart, msg[0].selectionEnd) + "</u>" + msg.val().slice(msg[0].selectionEnd));
		msg[0].select(start,end);
		msg[0].setSelectionRange(start,end);
		cw.charCount();
	},
	sub: function () {
		var msg = jQuery('#llama-msg');
		var start = (msg[0].selectionStart+5);
		var end = (msg[0].selectionEnd+5);
		msg.val(msg.val().slice(0, msg[0].selectionStart) + "<sub>" + msg.val().slice(msg[0].selectionStart, msg[0].selectionEnd) + "</sub>" + msg.val().slice(msg[0].selectionEnd));
		msg[0].select(start,end);
		msg[0].setSelectionRange(start,end);
		cw.charCount();
	},
	sup: function () {
		var msg = jQuery('#llama-msg');
		var start = (msg[0].selectionStart+5);
		var end = (msg[0].selectionEnd+5);
		msg.val(msg.val().slice(0, msg[0].selectionStart) + "<sup>" + msg.val().slice(msg[0].selectionStart, msg[0].selectionEnd) + "</sup>" + msg.val().slice(msg[0].selectionEnd));
		msg[0].select(start,end);
		msg[0].setSelectionRange(start,end);
		cw.charCount();
	}
});