// ==UserScript==
// @name           Orkut Quote
// @namespace      std
// @description    Quote messages for orkut
// @include        http://www.orkut.com/CommMsg*
// ==/UserScript==

/*
 * @author Bruno Leonardo Michels
 */

var colors = new Array(
    "navy", "aqua", "blue", "fuchsia", "gold" , "gray", "green",
    "lime", "maroon", "navy", "olive", "orange", "pink", "purple",
    "red", "silver", "teal", "violet", "yellow"
);


/* Custom vars */

// Choose a color for the quoted text from the array above
// (e.g. 0 = navy | 18 = yellow | -1 = black)
var color = 5;
// header color, choose a color just like the color above
// this is (user posted @ <time>) color
var headerColor = 16;
// Choose the button onmouseover color (hex/name value)
var buttonColor = "#C40098";
// Place $USER$ where you want the name to be shown (user posted @ )
var quotedMessage = "$USER$ posted @ ";

/* Custom vars */



function getXPATH(path) {
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

var botPath = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/div";
var quotePath = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/div[2]";
var postPath = '//*[@id="messageBody"]';
var usernamePath = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/h3/a";

var trimPattern = /^\s+|\s+$/g;
var argPattern = /\S+\?/;

var getter = "##@quote##";

var postURL = "http://www.orkut.com/CommMsgPost.aspx?";
var msgURL  = "http://www.orkut.com/CommMsgs";

// page of messages
if (window.location.href.indexOf(msgURL) > -1) {
    var args = window.location.href.replace(argPattern, "").split("&");
    var cmm = args[0];
    var tid = args[1];

    var i = 3;
    var msg = "";
    while ((msg = getXPATH(quotePath.replace("$", i)))) {
		// @ time content
		var auxtime = getXPATH(botPath.replace("$", i)).textContent;
		auxtime = auxtime.replace(/\n/i, "");
		auxtime = auxtime.replace(/<br(.*?)>/i, "");
		auxtime = auxtime.replace(trimPattern, "");
		var stime = auxtime;
		stime = stime.replace(/\n/i, "");
		stime = stime.replace(/<br(.*?)>/i, "");
		stime = stime.replace(trimPattern, "");
		stime = stime.replace("delete", "");
		// @ time + message
		var fmsg = msg.innerHTML;
		fmsg = fmsg.replace(/<br(.*?)>/ig, "\n");
		fmsg = fmsg.replace(/<.*?>/ig, "");
        var sendMsg = stime + "TIME" + fmsg;

		// trim beggin/end
        sendMsg = sendMsg.replace(trimPattern, "");

		// get username
        var user = getXPATH(usernamePath.replace("$", i)).textContent;
        user = user.replace(trimPattern, "");           // trim

        //sendMsg = user + " @ " + sendMsg;               // User @ Time
        sendMsg = quotedMessage.replace("$USER$", user) + sendMsg;
        if (sendMsg.length > 1800)
            sendMsg = sendMsg.substr(0, 1800) + " [...]";
        sendMsg = escape(sendMsg);

		// location to insert a new button
        var bot = getXPATH(botPath.replace("$", i));
		var button = '<span class="grabtn" onclick="self.location=\'' + postURL + cmm + '&' + tid + getter + sendMsg + '\';" style="cursor: pointer;">' +
				'<a  href="javascript:void(0);" onclick="self.location=\'' + postURL + cmm + '&' + tid + getter + sendMsg + '\';" style="cursor: pointer;" class="btn">quote</a>' +
				'</span>' +
				'<span class="btnboxr">' +
				'<img width="5" height="1" alt="" src="http://img1.orkut.com/img/b.gif"/>' +
				'</span>';
		bot.innerHTML = bot.innerHTML + button;
        i += 2;
    }
}
else // new post page
    if (window.location.href.indexOf(getter) > -1) {
        var post = getXPATH(postPath);
        if (post) {
            var quote = unescape(window.location.href.replace(/\S+##@quote##/, ""));
			var aquote = quote;
            var header = "";
			var x;
            if (headerColor > -1 && headerColor <= 18) {
				x = quote.indexOf("TIME");
                aquote =  "[" + colors[headerColor] + "][b]" + quote.substr(0, x) + "    [/" + colors[headerColor] + "]";
			}
            else
                aquote = "[b]" + quote.substr(0, x) + "[/b]"
            header = aquote;
            quote = quote.substr(header.length - 15);
            quote = quote.replace(trimPattern, "");
            if (!post.value) {
                if (color > -1 && color <= 18)
                    post.value = "[b][i]" + header + "\n\n[" + colors[color] + "]"
                                    + quote +
                                    "[/" + colors[color] + "][/i]\n\n\n\n" +
                                    post.value;
                else
                    post.value = "[b][i]" + header + "\n\n\n\n"
                                    + quote +
                                    "[/i]\n\n" +
                                    post.value;
                post.focus();
            }
        }
    }
