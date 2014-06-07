// ==UserScript==
// @name           Orkut Message/Poll Comment Quoter
// @namespace      std
// @author         Bruno Leonardo Michels
// @author         Personalized By Bean 
// @description    Quote messages/poll comments in orkut
// @include        http://www.orkut.com/CommMsg*
// @include        http://www.orkut.com/CommPoll*
// ==/UserScript==

/*
	Complete Credit of the script goes to the author. I Bean has just personalized the 

fonts to suit our eyes better.

*/

var colors = new Array(
    "navy", "aqua", "blue", "fuchsia", "gold" , "gray", "green",
    "lime", "maroon", "navy", "olive", "orange", "pink", "purple",
    "red", "silver", "teal", "violet", "yellow"
);


/* Custom vars */

// Choose a color for the quoted text from the array above
// (e.g. 0 = navy | 18 = yellow | -1 = black)
var color = 0;
// header color, choose a color just like the color above
// this is (user posted @ <time>) color
var headerColor = -1;
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

var botPath = "/html/body/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[$]/td[2]/div";
var quotePath = "/html/body/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[$]/td[2]";
var postPath = '//*[@id="messageBody"]';
var usernamePath = "/html/body/table[2]/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[$]/td";

var trimPattern = /^\s+|\s+$/g;
var argPattern = /\S+\?/;

var getter = "##@quote##";

var postURL = "http://www.orkut.com/CommMsgPost.aspx?";
var msgURL  = "http://www.orkut.com/CommMsgs";

if (window.location.href.indexOf(msgURL) > -1) {
    var args = window.location.href.replace(argPattern, "").split("&");
    var cmm = args[0];
    var tid = args[1];

    var i = 1;
    var msg = "";
    while ((msg = getXPATH(quotePath.replace("$", i)))) {

        var sendMsg = msg.innerHTML;
        sendMsg = sendMsg.replace(/<br>/ig, "\n");          // line break
        sendMsg = sendMsg.replace(/(<.*?>)/ig, "");         // strip html
        sendMsg = sendMsg.replace(/(\S)\(/, "$1 (");        // fix time
        sendMsg = sendMsg.replace(trimPattern, "");         // trim beggin/end

        var user = getXPATH(usernamePath.replace("$", i)).innerHTML;
        user = user.replace(/(<.*?>)/ig, "");           // strip html
        user = user.replace(/\(.*?\)/, "");             // strip (manage)
        user = user.replace(/\n/g, "");                 // strip new lines
        user = user.replace(trimPattern, "");           // trim

        //sendMsg = user + " @ " + sendMsg;               // User @ Time
        sendMsg = quotedMessage.replace("$USER$", user) + sendMsg;
        if (sendMsg.length > 1800)
            sendMsg = sendMsg.substr(0, 1800) + " [...]";
        sendMsg = escape(sendMsg);

        var bot = getXPATH(botPath.replace("$", i));
        bot.innerHTML += '<table cellpadding="0" cellspacing="0" style="display: inline">' +
            '<tr id="b1" onclick="self.location=\'' + postURL + cmm + '&' + tid + getter + sendMsg + '\';" style="cursor: pointer;" ' +
                'onmouseover="this.style.color=\'' + buttonColor + '\'" ' +
                'onmouseout="this.style.color=\'#000000\'">' +
                '<td><img alt="" src="http://img2.orkut.com/img/bl.gif"/></td>' +
                '<td nowrap="" style="background: transparent url(http://img2.orkut.com/img/bm.gif) repeat scroll 0%; font-size: 11px; width: 39px;" align="center">' +
                    'quote' +
                '</td>' +
                '<td><img alt="" src="http://img3.orkut.com/img/br.gif"/></td>' +
                '</tr>' +
            '</table>';
        ++i;
    }
}
else 
    if (window.location.href.indexOf(getter) > -1) {
        var post = getXPATH(postPath);
        if (post) {
            var quote = unescape(window.location.href.replace(/\S+##@quote##/, ""));
            var header = "";
            if (headerColor > -1 && headerColor <= 18)
                quote = quote.replace(/^(.*?)\n/, "[" + colors[headerColor] + "][b]$1[/b][/" + colors[headerColor] + "]");
            else
                quote = quote.replace(/^(.*?)\n/, "[b]$1[/b]");
            var x = quote.indexOf("\n");
            header = quote.substr(0, x);
            quote = quote.replace(header, "");
            quote = quote.replace(trimPattern, "");
            if (!post.value) {
                if (color > -1 && color <= 18)
                    post.value = "[b]" + header + "\n\n[" + colors[color] + "]"
                                    + quote +
                                    "[/" + colors[color] + "][/b]\n\n" +
                                    post.value;
                else
                    post.value = "[b]" + header + "\n\n"
                                    + quote +
                                    "[/b]\n\n" +
                                    post.value;
                post.focus();
            }
        }
    }

    /* Pools */
var poolBotPath = "/html/body/table[2]/tbody/tr/td[3]/table[2]/tbody/tr[4]/td/div/table/tbody/tr[2]/td/table/tbody/tr[$]/td[4]/div";
var poolPath = '//*[@id="replyTopicForm"]';
var poolMsgPath = '//*[@id="postText"]';
var poolQuotePath = "/html/body/table[2]/tbody/tr/td[3]/table[2]/tbody/tr[4]/td/div/table/tbody/tr[2]/td/table/tbody/tr[$]/td[4]";
var poolUser = "/html/body/table[2]/tbody/tr/td[3]/table[2]/tbody/tr[4]/td/div/table/tbody/tr[2]/td/table/tbody/tr[$]/td[2]/a[2]";
var poolURL = "http://www.orkut.com/CommPollResults.aspx?";

if (window.location.href.indexOf(poolURL) > -1) {
    var args = window.location.href.replace(argPattern, "").split("&");
    var cmm = args[0];
    var pct = args[1];
    var pid = args[2];
    
    var poolBot = "";
    var i = 1;
    while ((poolBot = getXPATH(poolBotPath.replace("$", i)))) {

        var msg = getXPATH(poolQuotePath.replace("$", i));
        var sendMsg = msg.innerHTML;
        var user = getXPATH(poolUser.replace("$", i));
        user = user.innerHTML;

        user = user.replace(/(<.*?>)/ig, "");           // strip html
        user = user.replace(/\(.*?\)/, "");             // strip (manage)
        user = user.replace(/\n/g, "");                 // strip new lines
        user = user.replace(trimPattern, "");           // trim

        sendMsg = sendMsg.replace(/<br>/ig, "\n");          // line break
        sendMsg = sendMsg.replace(/(<.*?>)/ig, "");         // strip html
        sendMsg = sendMsg.replace(/(\S)\(/, "$1 (");        // fix time
        sendMsg = sendMsg.replace(trimPattern, "");         // trim beggin/end
        sendMsg = sendMsg.replace(/&nbsp;/ig, "");
        sendMsg = sendMsg.replace(/\s\n/ig, "");
        sendMsg = escape(sendMsg);

        sendMsg = quotedMessage.replace("$USER$", user) + sendMsg;

        var poolDisp = getXPATH(poolPath);
        poolDisp.style.display = "block";
        poolDisp.style.visibility = "visible";
    
        var bot = poolBot;
        bot.innerHTML += '<table cellpadding="0" cellspacing="0" style="display: inline">' +
            '<tr id="b1" onclick="self.location=\'' + poolURL + cmm + '&' + pct + '&' + pid + '@@quote@@' + sendMsg + '\';" style="cursor: pointer;" ' +
                'onmouseover="this.style.color=\'' + buttonColor + '\'" ' +
                'onmouseout="this.style.color=\'#000000\'">' +
                '<td><img alt="" src="http://img2.orkut.com/img/bl.gif"/></td>' +
                '<td nowrap="" style="background: transparent url(http://img2.orkut.com/img/bm.gif) repeat scroll 0%; font-size: 11px; width: 39px;" align="center">' +
                    'quote' +
                '</td>' +
                '<td><img alt="" src="http://img3.orkut.com/img/br.gif"/></td>' +
                '</tr>' +
            '</table>';
        ++i;
    }

    if (window.location.href.indexOf("@@quote@@") > -1) {
        var quote = unescape(window.location.href.replace(/\S+@@quote@@/, ""));
        var poolMsg = getXPATH(poolMsgPath);
        
        var header = "";
        if (headerColor > -1 && headerColor <= 18)
            quote = quote.replace(/^(.*?)\n/, "[" + colors[headerColor] + "][b]$1[/b][/" + colors[headerColor] + "]\n");
        else
            quote = quote.replace(/^(.*?)\n/, "[b]$1[/b]\n");
        var x = quote.indexOf("\n");
        header = quote.substr(0, x);
        quote = quote.replace(header, "");
        quote = quote.replace(trimPattern, "");
        if (!poolMsg.value) {
            if (color > -1 && color <= 18)
                poolMsg.value = "[b]" + header + "\n\n[" + colors[color] + "]"
                                + quote +
                                "[/" + colors[color] + "][/b]\n\n" +
                                poolMsg.value;
            else
                poolMsg.value = "[b]" + header + "\n\n"
                                + quote +
                                "[/b]\n\n" +
                                poolMsg.value;
        }
    }
}
