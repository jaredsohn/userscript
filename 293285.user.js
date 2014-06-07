// ==UserScript==
// @name        ChristianMingle Chat Timestamps
// @namespace   battle_of_wits
// @description Add Timestamps to ChristianMingle Chat
// @include     http://connect.christianmingle.com/chatroom/messages.html?*
// @version     2
// @grant       none
// ==/UserScript==

// Get the current time in HH:MM
function nowTime() {
	var now = new Date();
	var hour    = now.getHours();
	var minute  = now.getMinutes();
	if(hour.toString().length == 1) {
		hour = '0'+hour;
	}
	if(minute.toString().length == 1) {
		minute = '0'+minute;
	}
	var stringNow = hour+':'+minute;
	return stringNow;
}

function expand_style(f, c, s, b, i, u) {
	try {
		// The font, color, size come in as the drop down options, not actual values
		// Accessing the form from fake_form in form.html (which is in the ftchat_form frame) is heavy based on scope
		// instead, having a hard set of values. Down side is if CM ever adds in additional fonts/sizes/colors, meh
		var fonts = ["Arial","Courier","Times","Verdana"];
		var colors = ["Black","Blue","Fuchsia","Gray","Green","Maroon","Navy","Olive","Purple","Red","Teal"];
		var sizes = ["8","9","10","11","12","13"];
		var mf = fonts[f];
		var mc = colors[c];
		var ms = sizes[s];
		var style = "font-family: " + mf + "; color: " + mc + "; font-size: " + ms + "pt;";
		if (b == 1) style += " font-weight: bold;";
		if (i == 1) style += " font-style: italic;";
		if (u == 1) style += " text-decoration: underline;";
		return style;
	} catch(er) {
		//CM doesn't care about the error for this, so just eat it and give undefined
	}
}

// Two types of items, unsafeWindow for Mozilla and Opera, none for Chrome
if (typeof unsafeWindow === 'undefined') {
	message_generic = function(msgid, msg, from, clr) {
		try {
			writechat("<table height=21 border=0 width=100% cellspacing=0 ");
			writechat("cellpadding=2>");
			writechat("<tr><td style='padding-right: 4px; font-family:monospace; font-size: 8pt;'>"+nowTime()+"</td>");
			writechat("<td width=100%><font face=verdana size=2 color=" + clr + "><i>");
			writechat(msg + "</i></font></td></tr>");
			writechat("</table>\n");

			message_finish(msgid);
		} catch(er) {
			catchError(er, "message_generic");
		}
	};
	message_whisper_me = function(msg, to, clr) {
		try {
			writechat("<table height=21 border=0 width=100% cellspacing=0 ");
			writechat("cellpadding=2>");
			writechat("<tr><td style='padding-right: 4px; font-family:monospace; font-size: 8pt;'>"+nowTime()+"</td>");
			writechat("<td width=100%><font face=verdana,arial size=2 color=" + clr);
			writechat(">You whisper to " + to + ": " + msg + "</font></td></tr>");
			writechat("</table>\n");

			message_finish(0);
		} catch(er) {
			catchError(er, "message_whisper_me");
		}
	};
	message_whisper = function(msgid, msg, from, clr) {
		try {
			writechat("<table height=21 border=0 width=100% cellspacing=0 ");
			writechat("cellpadding=2 bgcolor=#f5f5ff>");
			writechat("<tr><td style='padding-right: 4px; font-family:monospace; font-size: 8pt;'>"+nowTime()+"</td>");
			writechat("<td width=100%><font face=verdana,arial size=2 color=" + clr);
			writechat(">" + from + " whispers: " + msg + "</font></td></tr>");
			writechat("</table>\n");

			message_finish(msgid);
		} catch(er) {
			catchError(er, "message_whisper");
		}
	};
	message_whisper_other = function(msgid, msg, from, to, clr) {
		try {
			writechat("<table height=21 border=0 width=100% cellspacing=0 ");
			writechat("cellpadding=2>");
			writechat("<tr><td style='padding-right: 4px; font-family:monospace; font-size: 8pt;'>"+nowTime()+"</td>");
			writechat("<td width=100%><font face=verdana,arial size=2 color=" + clr);
			writechat(">" + from + " whispers to " + to + ": " + msg + "</font></td></tr>");
			writechat("</table>\n");

			message_finish(msgid);
		} catch(er) {
			catchError(er, "message_whisper");
		}
	};

	message_normal = function(msgid, msg, from, name_clr, icon, mf, mc, ms, mb, mi, mu) {
		try {
			if (top.ftchat_form.document.extra.show_styles.value == 0) {
				msg_style = "font-family: verdana; color: black; font-size: 10pt;";
				name_clr = "black";
			} else {
				msg_style = expand_style(mf, mc, ms, mb, mi, mu);
			}
			writechat("<table height='21' border='0' width='100%' cellspacing='0' ");
			writechat("cellpadding='2'>");
			writechat("<tr><td style='padding-right: 4px; font-family:monospace; font-size: 8pt;'>"+nowTime()+"</td>");
			writechat("<td width='27' valign='top'><img src='/images/chatim/icons/" + icon + "'");
			writechat(" width='21' height='21' border='0'/></td>");
			writechat("<td width=100% valign=top style=\"padding-top: 3px;\">");
			writechat("<font face='verdana,arial' size='2' color='" + name_clr + "'>");
			writechat("<b>" + from + ":&nbsp;</b></font>");
			writechat("<span style=\"" + msg_style + "\">");
			writechat(msg + "</span></td></tr>");
			writechat("</table>\n");

			message_finish(msgid);
		} catch(er) {
			catchError(er, "message_normal");
		}
	};
}
else { // Mozilla/Opera
	unsafeWindow.message_generic = function(msgid, msg, from, clr) {
		try {
			unsafeWindow.writechat("<table height=21 border=0 width=100% cellspacing=0 ");
			unsafeWindow.writechat("cellpadding=2>");
			unsafeWindow.writechat("<tr><td style='padding-right: 4px; font-family:monospace; font-size: 8pt;'>"+nowTime()+"</td>");
			unsafeWindow.writechat("<td width=100%><font face=verdana size=2 color=" + clr + "><i>");
			unsafeWindow.writechat(msg + "</i></font></td></tr>");
			unsafeWindow.writechat("</table>\n");

			unsafeWindow.message_finish(msgid);
		} catch(er) {
			unsafeWindow.catchError(er, "message_generic");
		}
	};
	unsafeWindow.message_whisper_me = function(msg, to, clr) {
		try {
			unsafeWindow.writechat("<table height=21 border=0 width=100% cellspacing=0 ");
			unsafeWindow.writechat("cellpadding=2>");
			unsafeWindow.writechat("<tr><td style='padding-right: 4px; font-family:monospace; font-size: 8pt;'>"+nowTime()+"</td>");
			unsafeWindow.writechat("<td width=100%><font face=verdana,arial size=2 color=" + clr);
			unsafeWindow.writechat(">You whisper to " + to + ": " + msg + "</font></td></tr>");
			unsafeWindow.writechat("</table>\n");

			unsafeWindow.message_finish(0);
		} catch(er) {
			unsafeWindow.catchError(er, "message_whisper_me");
		}
	};
	unsafeWindow.message_whisper = function(msgid, msg, from, clr) {
		try {
			unsafeWindow.writechat("<table height=21 border=0 width=100% cellspacing=0 ");
			unsafeWindow.writechat("cellpadding=2 bgcolor=#f5f5ff>");
			unsafeWindow.writechat("<tr><td style='padding-right: 4px; font-family:monospace; font-size: 8pt;'>"+nowTime()+"</td>");
			unsafeWindow.writechat("<td width=100%><font face=verdana,arial size=2 color=" + clr);
			unsafeWindow.writechat(">" + from + " whispers: " + msg + "</font></td></tr>");
			unsafeWindow.writechat("</table>\n");

			unsafeWindow.message_finish(msgid);
		} catch(er) {
			unsafeWindow.catchError(er, "message_whisper");
		}
	};
	unsafeWindow.message_whisper_other = function(msgid, msg, from, to, clr) {
		try {
			unsafeWindow.writechat("<table height=21 border=0 width=100% cellspacing=0 ");
			unsafeWindow.writechat("cellpadding=2>");
			unsafeWindow.writechat("<tr><td style='padding-right: 4px; font-family:monospace; font-size: 8pt;'>"+nowTime()+"</td>");
			unsafeWindow.writechat("<td width=100%><font face=verdana,arial size=2 color=" + clr);
			unsafeWindow.writechat(">" + from + " whispers to " + to + ": " + msg + "</font></td></tr>");
			unsafeWindow.writechat("</table>\n");

			message_finish(msgid);
		} catch(er) {
			unsafeWindow.catchError(er, "message_whisper");
		}
	};

	unsafeWindow.message_normal = function(msgid, msg, from, name_clr, icon, mf, mc, ms, mb, mi, mu) {
		try {
			if (top.ftchat_form.document.extra.show_styles.value == 0) {
				msg_style = "font-family: verdana; color: black; font-size: 10pt;";
				name_clr = "black";
			} else {
				msg_style = expand_style(mf, mc, ms, mb, mi, mu);
			}
			unsafeWindow.writechat("<table height='21' border='0' width='100%' cellspacing='0' ");
			unsafeWindow.writechat("cellpadding='2'>");
			unsafeWindow.writechat("<tr><td style='padding-right: 4px; font-family:monospace; font-size: 8pt;'>"+nowTime()+"</td>");
			unsafeWindow.writechat("<td width='27' valign='top'><img src='/images/chatim/icons/" + icon + "'");
			unsafeWindow.writechat(" width='21' height='21' border='0'/></td>");
			unsafeWindow.writechat("<td width=100% valign=top style=\"padding-top: 3px;\">");
			unsafeWindow.writechat("<font face='verdana,arial' size='2' color='" + name_clr + "'>");
			unsafeWindow.writechat("<b>" + from + ":&nbsp;</b></font>");
			unsafeWindow.writechat("<span style=\"" + msg_style + "\">");
			unsafeWindow.writechat(msg + "</span></td></tr>");
			unsafeWindow.writechat("</table>\n");

			unsafeWindow.message_finish(msgid);
		} catch(er) {
			unsafeWindow.catchError(er, "message_normal");
		}
	};
}
