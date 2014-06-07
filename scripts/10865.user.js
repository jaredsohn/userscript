// ==UserScript==
// @name           Orkut Community Message Quoter
// @namespace      Zamaan
// @description    Without Copy/Pasting The Message, This Is Like Replying The Message With The Quote ~
// @include        http://www.orkut.com/CommMsg*
// ==/UserScript==

/*
 * @author Zamaan Haseeb 
 */

var colors = new Array(
    "blue", "aqua", "blue", "fuchsia", "gold" , "gray", "green",
    "lime", "maroon", "navy", "olive", "orange", "pink", "purple",
    "red", "silver", "teal", "violet", "yellow"
);


/* Custom vars */
var color = -1;                                  // Choose a color from the array (e.g. 0 = blue)
                                                    // -1 = default
var buttonColor = "#C40098";                    // Choose the button overcolor (hex/name value)
var quotedMessage = "[b]$USER$'s[/b] Quoted message @ "; // Place $USER$ where you want the name to be shown
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
        sendMsg = sendMsg.replace(/(am|pm)\(/, "$1 (");     // fix time
        sendMsg = sendMsg.replace(trimPattern, "");         // trim beggin/end

        var user = getXPATH(usernamePath.replace("$", i)).innerHTML;
        user = user.replace(/(<.*?>)/ig, "");           // strip html
        user = user.replace(/\(.*?\)/, "");             // strip (manage)
        user = user.replace(/\n/g, "");                 // strip new lines
        user = user.replace(trimPattern, "");           // trim

        //sendMsg = user + " @ " + sendMsg;               // User @ Time
        sendMsg = quotedMessage.replace("$USER$", user) + sendMsg;
        sendMsg = escape(sendMsg);

        var bot = getXPATH(botPath.replace("$", i));
      bot.innerHTML += '<img alt="" src="http://img2.orkut.com/img/bl.gif">' +
  '<span style="cursor: pointer; vertical-align: super; padding-left: 5; padding-right: 5; padding-top: 4; padding-bottom: 3; font-size: 103%; background: transparent url(http://img2.orkut.com/img/bm.gif) repeat"' +
  'onmouseover="this.style.color=\'' + buttonColor + '\'"' +
  'onmouseout="this.style.color=\'#000000\'"'  +
  'onclick="self.location=\'' + postURL + cmm + '&' + tid + '##' + sendMsg + '\';">' +
  'quote' +
  '</span>' +
  '<img alt="" src="http://img3.orkut.com/img/br.gif">';
        ++i;
    }
}
else 
    if (window.location.href.indexOf("##") > -1) {
        var post = getXPATH(postPath);
        if (post) {
            var quote = unescape(window.location.href.replace(/\S+##/, ""));
            quote = quote.replace(/^(.*?\))/, "[b]$1[/b]");
            quote = quote.replace(trimPattern, "");
            if (color > -1 && color <= 18)
                post.value = "[i][" + colors[color] + "]"
                                + quote +
                                "[/" + colors[color] + "][/i]\n\n";
            else
                post.value = "[i][navy]" + quote + "[/navy][/i]\n\n";
        }
    }