// ==UserScript==
// @name          Clockwork Llama V2 - Page Script
// @namespace     nuck
// @description   Page scripts for Clockwork Llama V2
// @include       *
// ==/UserScript==
dAmnChat.prototype.onData_CW = 	dAmnChat.prototype.onData;
dAmnChat.prototype.onData = function(packet){
	if (packet.cmd == 'recv'){
		sub_packet=dAmn_ParsePacket(packet.body);
		if(sub_packet.cmd == 'msg'){
			if (sub_packet.body.indexOf('&abbr\tCWL\t&/abbr\t') == -1){
				this.onData_CW(packet);
				return packet;
			} else {
				packet.body = packet.body.replace(
					new RegExp("&dev\\t([^\\t])?\\t("+RegExp.escape(dAmn_Client_Username)+")\\t", "g"),
					function(){ return "&dev\t" + arguments[1] + "\tyou\." + superdAmn.strrev(arguments[2]) + "\t" }
				);
				packet.body = packet.body.replace(
					new RegExp("&avatar\\t("+RegExp.escape(dAmn_Client_Username)+")\\t(\\d+)\\t", "g"),
					function(){ return "&avatar\tyou\." + superdAmn.strrev(arguments[1]) + "\t" + arguments[2] + "\t" }
				);
				packet.body = packet.body.replace(
					new RegExp("\\nfrom=("+RegExp.escape(dAmn_Client_Username)+")\\n", "g"),
					function(){ return "\nfrom=Clockwork Llama\n" }
				);
				this.onData_CW(packet);
				return packet;
			}
		}
		packet = this.onData_CW(packet);
		return packet;
	}
	packet = this.onData_CW(packet);
	return packet;
}
dAmnChanChat.prototype.FormatMsg_CWL = dAmnChanChat.prototype.FormatMsg;
dAmnChanChat.prototype.FormatMsg = function(msg, bkcolor){
	// == Code stolen from SuperdAmn ==
	if (msg.indexOf('&abbr\tCWL\t&/abbr\t') == -1){
		msg = this.FormatMsg_CWL(msg,bkcolor);
		return msg;
	} else {
		// Handling avatars
		msg = msg.replace(
			new RegExp("&avatar\\tyou\\.([^\\t]+)\\t([^\\t]+)\\t", "g"),
			function(){ console.log(arguments); return "&avatar\t" + superdAmn.strrev(arguments[1]) + "\t" + arguments[2] + "\t"; }
		);
		// Handling devlinks
		msg = msg.replace(
			new RegExp("&dev\\t([^\\t])?\\tyou\\.([^\\t]+)\\t", "g"),
			function(){ console.log(arguments); return "&dev\t" + arguments[1] + "\t" + superdAmn.strrev(arguments[2]) + "\t"; }
		);
		msg = this.FormatMsg_CWL(msg, bkcolor);
		return msg;
	}
}
var cw = ({util:{
	// Stolen from SuperdAmn, which stole it from deviantPlus.
	surroundtext: function(tf, left, right){
		var tmpScroll     = tf.scrollTop
		var t             = tf.value, s = tf.selectionStart, e = tf.selectionEnd
		var selectedText  = tf.value.substring(s,e)
		tf.value          = t.substring(0,s) + left + selectedText + right + t.substring(e)
		tf.selectionStart = s + left.length
		tf.selectionEnd   = s + left.length + selectedText.length
		tf.scrollTop      = tmpScroll
		tf.focus();
	},
	hassub: function(r){
		var retData = ({});
		retData.pc = window.dAmnChats["chat:"+r].members.members[dAmn_Client_Username].info.pc;
		jQuery.each(window.dAmnChats["chat:"+r].members.pclist,function(key,value){
			if (value.name == retData.pc){
				retData.order = value.order;
			}
		});
		if (retData.pc == "SpecialLlamas" || retData.order >= 85) {
			retData.hassub = true;
		} else { // if (retData.pc == "BabyLlamas")
			retData.hassub = false;
		}
		return retData;
	},
	fixToolbarPos: function() {
		jQuery('.cw-toolbar a.mi').length;
		jQuery('.cw-toolbar a.mi').each(function () {
			var button = jQuery(this);
			var text = jQuery('.cw-toolbar-button-text', this);
			var icon = jQuery('i', this);
			text.css('margin-left', ((button.width() - (text.width() + 34)) / 2) + 28);
			icon.css('left', (button.width() - (text.width() + 36)) / 2);
		});
		return void(0);
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
	}
}});

var clockworkLlama = window.clockworkLlama = function(r, t){
	this.room = (!r)?'GiveALlamaGetALlama':r;
	this.time = (!t)?({m:3,s:0}):t;
	this.name = dAmn_Client_Username;
	if (!dAmnChats["chat:"+this.room]) {
		MiddleMan.Event.bind("dAmnChat_self", "join", "cw-"+this.room,this.init);
	} else {
		this.pc = dAmnChats["chat:"+this.room].members.members[this.name].info.pc;
		if (!localStorage.llamaMessage){
			localStorage.llamaMessage = "";
		}
		var llamaSpacer = jQuery(document.createTextNode(" | "));
		var llamaTimerEl = jQuery("<span id=\""+this.room+"-timer\" style=\"cursor: pointer;\" title=\"Click to change message\"></span>");
		var llamaBar = jQuery(dAmnChats['chat:'+this.room].channels.main.iconbar_el.firstChild);
		llamaBar.children("a:contains('Chatroom Settings')").before(llamaSpacer);
		llamaSpacer.before(llamaTimerEl);
		this.start();
		window.clockwork.rooms[this.room] = this;
		if (localStorage.CWfirstrun !== "false"){
			$('#GiveALlamaGetALlama-timer').addClass('cwFirstRunTimer').before('<div id="cw-firstrun"><div class="cwText"></div><div class="cwGetStarted">This is the timer.<br />Click it to get started.</div></div>').one("click",function(e){
				$('#cw-firstrun').fadeOut();
				$('.cwFirstRunTimer').removeClass('cwFirstRunTimer');
				localStorage.CWfirstrun = "false";
			});
			$('#cw-firstrun').css('left',($('#GiveALlamaGetALlama-timer').position().left-$('#cw-firstrun').width())/2).css('top',($('#GiveALlamaGetALlama-timer').position().top-$('#cw-firstrun').height()+3));
		}
	}
}
clockworkLlama.prototype = window.clockworkLlama.prototype = ({
	room: 'clockworkLlama',
	time: {m:3,s:0},
	i: 0,
	verAgent: "Clockwork Llama 2.0 Release Candidate 1",
	init: function(){
		this.pc = dAmnChats["chat:"+this.room].members.members[this.name].info.pc;
		if (!localStorage.llamaMessage){
			localStorage.llamaMessage = "";
		}
		var llamaSpacer = jQuery(document.createTextNode(" | "));
		var llamaTimerEl = jQuery("<span id=\""+this.room+"-timer\" style=\"cursor: pointer;\" title=\"Click to change message\"></span>");
		var llamaBar = jQuery(dAmnChats['chat:'+this.room].channels.main.iconbar_el.firstChild);
		llamaBar.children("a:contains('Chatroom Settings')").before(llamaSpacer);
		llamaSpacer.before(llamaTimerEl);
		this.start();
		window.clockwork.rooms[this.room] = this;
		if (localStorage.CWfirstrun !== "false"){
			$('#GiveALlamaGetALlama-timer').addClass('cwFirstRunTimer').before('<div id="cw-firstrun"><div class="cwText"></div><div class="cwGetStarted">This is the timer.<br />Click it to get started.</div></div>').one("click",function(e){
				$('#cw-firstrun').fadeOut();
				$('.cwFirstRunTimer').removeClass('cwFirstRunTimer');
				localStorage.CWfirstrun = "false";
			});
			$('#cw-firstrun').css('left',($('#GiveALlamaGetALlama-timer').position().left-$('#cw-firstrun').width())/2).css('top',($('#GiveALlamaGetALlama-timer').position().top-$('#cw-firstrun').height()+3));
		}
	},
	hassub: function(r){
		var retData = ({});
		retData.pc = dAmnChats["chat:"+r].members.members[dAmn_Client_Username].info.pc;
		jQuery.each(dAmnChats["chat:"+r].members.pclist,function(key,value){
			if (value.name == retData.pc){
				retData.order = value.order;
			}
		});
		if (retData.pc == "SpecialLlamas" || retData.order > 50) {
			retData.hassub = true;
		} else { // if (retData.pc == "BabyLlamas")
			retData.hassub = false;
		}
		return retData;
	},
	get msg(){ return localStorage.llamaMessage },
	set msg(val){ localStorage.llamaMessage = val },
	get timerEl(){ return jQuery("#" + this.room + "-timer") },
	formatTime: function(t,c){
		this.updateTimer(Math.floor(t / 60).toString()+":"+(((t % 60) < 10)?"0"+(t % 60).toString():(t % 60).toString()),c);
	},
	updateTimer: function(tstr,color){
		this.timerEl.html(tstr).css("color",((!color)?"inherit":color));
	},
	interval: function(that){
		that.llamaT--;
		if(that.llamaT == 0){
			if (that.i+1 < 10 || window.cw.util.hassub(that.room).order > 76){
				that.formatTime(that.llamaT);
				clearInterval(that.timer);
				that.start();
				that.send();
				that.i++;
			} else {
				that.updateTimer("--:--","red");
				clearInterval(that.timer);
				that.flashTimer = setInterval("var timerEl = jQuery(\"#"+that.room+"-timer\");timerEl.css('color',((timerEl.css('color') !== 'red')?'red':'black'));",750);
				that.send();
				that.timerEl.unbind("click").one("click",that,function(e){
					e.data.i = 0;
					clearInterval(e.data.flashTimer);
					e.data.timerEl.stop();
					e.data.start();
					return false;
				});
			}
		} else {
			that.formatTime(that.llamaT);
		}
	},
	send: function(){
		if (this.msg !== null || this.msg !== undefined || this.msg !== ""){
			MiddleMan.dAmnSend.msg("#"+this.room, this.msg + "<abbr title=\"CWL::" + this.verAgent + "\"></abbr><abbr title=\"CWL\"></abbr>");
		}
	},
	start: function(){
		this.llamaT = Number((this.time.m*60)+this.time.s);
		this.timer = setInterval(function(that){that.interval(that)}, 1000, this);
		this.timerEl.unbind("click").bind("click",this,this.showConfig);
	},
	showConfig: function(e) {
		MiddleMan.Interface.openDialog({'innerHTML':"<div style=\"z-index: 40; position: relative; width: auto;\" class=\"gr-box gr-configbox\" id=\"llama-modal\">\n<i class=\"gr1 gt1\"><i></i></i>\n<i class=\"gr2 gt2\"><i></i></i>\n<i class=\"gr3 gt3\"><i></i></i>\n<div class=\"gr-top\">\n<i class=\"tri\"></i>\n<div class=\"gr\">\n<h2><i class=\"icon i6\"></i>The Clockwork Llama</h2>\n</div>\n</div>\n<div style=\"overflow: hidden;\" class=\"gr-body\">\n<div style=\"margin-top: 0px;\" class=\"gr\">\n<div class=\"ppp\">\n<div class=\"cctextarea\" style=\"margin-bottom: 0px;\">\n<div class=\"cctextarea-ctrl\">\n<textarea class=\"text\" style=\"height: 110px; width: 500px; margin: 5px;\" name=\"llama-msg\" id=\"llama-msg\"></textarea>\n<div style=\"word-wrap: break-word; font-weight: normal; width: 575px; font-family: verdana; line-height: 17px; font-size: 12px; padding-left: 3px; padding-bottom: 3px; padding-right: 110px; padding-top: 3px; position: absolute; display: none; \">&nbsp;</div>\n</div>\n</div>\n</div>\n<div class=\"cw-toolbar\">\n<a onclick=\"cw.buttons.b()\" class=\"mi iconset-quality\">\n<i class=\"i1\"></i><span class=\"cw-toolbar-button-text\">bold</span>\n</a>\n<div class=\"cw-sep\"></div>\n<a onclick=\"cw.buttons.i()\" class=\"mi iconset-quality\">\n<i class=\"i2\"></i><span class=\"cw-toolbar-button-text\">italic</span>\n</a>\n<div class=\"cw-sep\"></div>\n<a onclick=\"cw.buttons.u()\" class=\"mi iconset-quality\">\n<i class=\"i3\"></i><span class=\"cw-toolbar-button-text\">underline</span>\n</a>\n<div class=\"cw-sep\"></div>\n<a onclick=\"cw.buttons.sup()\" class=\"mi iconset-quality\">\n<i class=\"i4\"></i><span class=\"cw-toolbar-button-text\">superscript</span>\n</a>\n<div class=\"cw-sep\"></div>\n<a onclick=\"cw.buttons.sub()\" class=\"mi iconset-quality\">\n<i class=\"i5\"></i><span class=\"cw-toolbar-button-text\">subscript</span>\n</a>\n</div>\n" + ((!window.cw.util.hassub(e.data.room).hassub)?"<div class=\"subscription_pitch no_subscription\" style=\"display: block;\">\nBecome a SpecialLlama to unlock more features. <span id=\"upgradeLink\">How do I do that?</span><div id=\"upgradeInfo\" style=\"display: none;\"><p style=\"line-height: 0.25em;\"></p>To become a SpecialLlama, you can <b>(a)</b> write a journal promoting this chat or <b>(b)</b> start using <a href=\"http://neg0ne.deviantart.com/art/Free-Llama-Journal-160895443\" class=\"skinLink\">this great llama-themed journal skin</a> <i>(requires a deviantART subscription)</i>. <p style=\"line-height: 0.25em;\"></p>Either way, just tell a moderator in here afterwards.  <b>Do not</b> use a comment or a note to tell a mod, as they will not respond.</div>\n</div>\n" : "<div class=\"subscription_pitch has_subscription\" style=\"display: block;\">\nYou have SpecialLlama privs.  Thank you for supporting GiveALlamaGetALlama!\n</div>\n") + "<div class=\"gr-hijack c pp\">\n<table align=\"center\" class=\"f\">\n<tbody>\n<tr>\n<td style=\"padding: 0pt 8px;\">\n<a style=\"cursor: pointer;\" onclick=\"if (!jQuery(this).hasClass('disabledbutton')){localStorage.llamaMessage=document.getElementById('llama-msg').value; MiddleMan.Interface.closeDialog();}\" class=\"smbutton smbutton-blue smbutton-big\" id=\"CWL-savebtn\"><span class=\"post\">Save</span></a>\n</td>\n<td style=\"padding: 0pt 8px;\">\n<a style=\"cursor: pointer;\" onclick=\"MiddleMan.Interface.closeDialog();\" class=\"smbutton smbutton-big\"><span class=\"preview\">Cancel</span></a>\n</td>\n</tr>\n</tbody>\n</table>\n<span style=\"float: right; clear: none; position: relative; display: block;\" id=\"CWL-chars\">250</span>\n</div>\n</div>\n</div>\n<i class=\"gr3 gb\"></i>\n<i class=\"gr2 gb\"></i>\n<i class=\"gr1 gb gb1\"></i>\n</div>"});
		jQuery('#llama-msg').val(e.data.msg);
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
		jQuery('#llama-msg').keyup(window.cw.util.charCount);
		window.cw.util.charCount();
		window.cw.util.fixToolbarPos();
		return void(0);
	},
});
window.clockwork = {'chats':{},'rooms':[]};

window.cw.buttons = ({
	b: function () {
		cw.util.surroundtext(jQuery('#llama-msg')[0], "<b>", "</b>");
		cw.util.charCount();
	},
	i: function () {
		cw.util.surroundtext(jQuery('#llama-msg')[0], "<i>", "</i>");
		cw.util.charCount();
	},
	u: function () {
		cw.util.surroundtext(jQuery('#llama-msg')[0], "<u>", "</u>");
		cw.util.charCount();
	},
	sub: function () {
		cw.util.surroundtext(jQuery('#llama-msg')[0], "<sub>", "</sub>");
		cw.util.charCount();
	},
	sup: function () {
		cw.util.surroundtext(jQuery('#llama-msg')[0], "<sup>", "</sup>");
		cw.util.charCount();
	}
});

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
.cwFirstRunTimer {\
	background: #321c0a;\
	border: none;\
	padding: 2px 5px;\
	-moz-border-radius: 0px 0px 3px 3px;\
	border-radius: 0px 0px 3px 3px;\
	-moz-box-shadow: 0px 1px 2px rgba(0,0,0,0.5);\
	box-shadow: 0px 1px 2px rgba(0,0,0,0.5);\
}\
#cw-firstrun {\
	background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#321c0a), to(#7d441b));\
	background: -moz-linear-gradient(0% 100% 90deg, #321c0a, #7d441b);\
	border-radius: 5px;\
	-moz-border-radius: 5px;\
	font-size: 8px;\
	display: block;\
	position: absolute;\
	height: 100px;\
	width: 300px;\
	z-index: 100;\
	font-family: Trebuchet MS, sans-serif;\
	padding: 1px 5px;\
}\
#cw-firstrun div.cwText {\
	background: url(\"http://i54.tinypic.com/2gufu5j.png\");\
	height: 31px;\
	width: 277px;\
	display: block;\
	margin: 8px;\
}\
#cw-firstrun div.cwGetStarted {\
	padding: 2px 20px;\
	text-shadow: 0 1px 0 #7d441b;\
	color: #150802;\
	font-size: 12pt;\
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

$(window).bind('load',function(){
	window.clockwork.chats["chat:GiveALlamaGetALlama"] = new clockworkLlama("GiveALlamaGetALlama",{'m':3,'s':0});
});