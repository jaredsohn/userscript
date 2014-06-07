// ==UserScript==
// @name           Orkut Manager - Ice Version
// @namespace      std
// @description    Manage Orkut
// @include        http://www.orkut.com*
// @exclude        http://www.orkut.com/Edit*
// ==/UserScript==

/*
 * @author Bruno Leonardo Michels
 * @profile http://www.orkut.com/Profile.aspx?uid=11584069900845257050
 */

var qreplyCount = 0;
var qreplyHtmlAccept = new Array();

/// <summary>
/// Customize your script here
/// </summary>
/* VARS:: Quote */
var quoteB = "[navy][i]";
var quoteE = "[/i][/navy]";
var headerB = "[navy][i]";
var headerE = "[/i][/navy]";

var htmlQuoteB = "<div style='background: #00FFFF; border: 2px Blue solid; color: black; font-size: 90%; margin-left: 20px; margin-right: 20px; padding: 2px 3px 2px 3px'>";
var htmlQuoteE = "</div>";
var htmlHeaderB = "<div style='font-size: 75%'>Quote (";
var htmlHeaderE = ")</div>";

var buttonColor = "#C40098";
var quotedMessage = "$USER$ @ ";
var lightMode = true;
/* /VARS:: Quote */

/* VARS:: TextAreas default color */
var msgB = "";
var msgE = "";

var htmlB = "";
var htmlE = "";
/* /VARS:: TextAreas */

/* VARS:: Signature */
var newLine = isHTMLEnabled() ? "\n<br />" : "\n";
var signature = "==-->ash ice";
var htmlSignature = "<br /><br />http://images.orkut.com/orkut/albums3/ATcAAAApGx0sR4wTvnesxy-THo6F63H2YSze1Yqwe3dnOPb2z8X_q3HEaGhVaIE4jqC4Z05KufDe-YT8L_rG6TlLBQP6AJtU9VC4nlJfuSXz80hIUlDLWjDIb4ej7g.jpg";
/* /VARS:: Signature */

/* VARS:: QuickReply */
QReplyAccept("16467103", "Breath of Fire IV");
QReplyAccept("10809989", "Compare Personagens");
QReplyAccept("1443557" , "Death Note Brasil");
QReplyAccept("7273024" , "Guitar Hero Brasil");
QReplyAccept("6096994" , "Wii Brasil");
QReplyAccept("1046400" , "PS3 Brasil");
QReplyAccept("18047190", "Knx");
QReplyAccept("36907180", "TPPC Brasil");
QReplyAccept("55705569", "TPPC Brasil Suporte");
/* /VARS:: QuickReply */

/* VARS:: Toolbar */
var toolbarColor = "#FFFFFF";
// Use only once {|} to set the cursor position
// [0] Image/text(HTML), [1] Code HTML, [2] Code
var bToolsize = "17px";
var bStyle = "style='cursor: pointer; height: " + bToolsize + "; width: " + bToolsize + "'";
var stylePointer = "style='cursor:pointer'";
var tools =
    new Array(
        new Array /* Bold template */
        (
            "<img alt='' src='http://www.ok.gov/guide/images/bold.jpg' title='bold' " + bStyle + " />",
            "<b>{|}</b>",
            "[b]{|}[/b]"
        )
        ,
        new Array /* Italic template */
        (
            "<img alt='' src='http://www.ok.gov/guide/images/italic.jpg' title='italic' " + bStyle + " />",
            "<i>{|}</i>",
            "[i]{|}[/i]"
        )
        ,
        new Array /* Underline template */
        (
            "<img alt='' src='http://www.ok.gov/guide/images/underline.jpg' title='underline' " + bStyle + " />",
            "<u>{|}</u>",
            "[u]{|}[/u]"
        )
        ,
        new Array /* Strike template */
        (
            "<img alt='' src='http://www.ok.gov/guide/images/strikethrough.jpg' title='strike' " + bStyle + " />",
            "<s>{|}</s>",
            ""
        )
        ,
        new Array /* Link template */
        (
            "<img alt='' src='http://www.ok.gov/guide/images/insert-link.jpg' title='link' " + bStyle + " />",
            "<a href=\\'{|}\\' title=\\'\\'></a>",
            "[link={|}][/link]"
        )
        ,
        new Array /* Image template */
        (
            "<img alt='' src='http://www.smileonmymac.com/PDFpen/help/images/insert.jpg' title='link' " + bStyle + " />",
            "<img alt=\\'\\' src=\\'{|}\\' title=\\'\\' />",
            "[link]{|}[/link]"
        )
        ,
        new Array /* Source template */
        (
            "<img alt='' src='http://www.caris.com/products/images/ico_cpdsource.gif' title='source' " + bStyle + " />",
            "<div style=\\'border: 1px dashed rgb(47, 111, 171); padding: 1em; background-color: rgb(249, 249, 249); color: black; line-height: 1.1em;\\'><pre style=\\'margin:0px;\\'>{|}</pre></div>",
            ""
        )
        ,
        new Array /* Spoilers template */
        (
            "<span style='cursor: pointer; color: red; font-weight: bold'>SPOILER</span>",
            "<div style=\\'border-top: 1px solid rgb(255, 204, 102); border-bottom: 1px solid rgb(255, 204, 102); margin: 10px 0px; padding: 5px 0px 5px 3px; background-color: rgb(255, 253, 223); text-align: left; font-size: 90%;\\'><b>Aviso:</b> Esta area contém <b>revelações sobre o enredo</b> (<i>spoilers</i>).</div>[yellow]{|}[/yellow]",
            ""
        )
        ,
        new Array /* Quotation template */
        (
            "<img alt='' src='http://www.scotlandcottages.uk.com/graphics/quote-right.png' title='quote' " + bStyle + " />",
            "<q style=\\'font-style:italic;\\'>{|}</q>",
            ""
        )
        ,
        new Array /* New Line template */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;'>&lt;br /&gt;</span>",
            "<br />{|}",
            ""
        )
        ,
        new Array /* Crypt template */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;' onclick='var t = document.getElementById(\"messageBody\"); function crypt(s, secret){var i = 0;var x = 0;var f =\"\";for (i=0;i<s.length;++i){x = s.charCodeAt(i);if (x == 32){f += String.fromCharCode(x); continue;} f += String.fromCharCode(x+secret);}return f;} t.value = (crypt(t.value, 77))'>Crypt</span>",
            "{|}",
            "{|}"
        )
        ,
        new Array /* Decrypt template */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;' onclick='var t = document.getElementById(\"messageBody\"); function crypt(s, secret){var i = 0;var x = 0;var f =\"\";for (i=0;i<s.length;++i){x = s.charCodeAt(i);if (x == 32){f += String.fromCharCode(x); continue;} f += String.fromCharCode(x+secret);}return f;} t.value = (crypt(t.value, -77))'>Decrypt</span>",
            "{|}",
            "{|}"
        )
        ,
        new Array /* Date template */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;' onclick='var t = document.getElementById(\"messageBody\"); function GetDate(){var dt = new Date();var d = dt.getDate() < 10 ? \"0\" + dt.getDate() : dt.getDate();var m = dt.getMonth() < 10 ? \"0\" + (dt.getMonth()+1) : (dt.getMonth()+1);var y = dt.getFullYear(); return y + \"-\" + m + \"-\" + d;} t.value= t.value.substr(0, t.selectionStart) + GetDate() + t.value.substring(t.selectionEnd);'>Date</span>",
            "{|}",
            "{|}"
        )
        ,
        new Array /* Time template */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;' onclick='var t = document.getElementById(\"messageBody\"); function GetTime(){var dt = new Date();var s = dt.getSeconds() < 10 ? \"0\" + dt.getSeconds() : dt.getSeconds();var m = dt.getMinutes() < 10 ? \"0\" + (dt.getMinutes()) : (dt.getMinutes());var h = dt.getHours() < 10 ? \"0\" + dt.getHours() : dt.getHours(); return h + \":\" + m + \":\" + s;} t.value= t.value.substr(0, t.selectionStart) + GetTime() + t.value.substring(t.selectionEnd);'>Time</span>",
            "{|}",
            "{|}"
        )
        ,
        new Array /* Separator template */
        (
            "<br />",
            "{|}",
            "{|}"
        )
        ,
        new Array /* Navy template */
        (
            "<span style='cursor: pointer; background: navy;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: navy\\'>{|}</span>",
            "[navy]{|}[/navy]"
        )
        ,
        new Array /* Blue template */
        (
            "<span style='cursor: pointer; background: blue;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: blue\\'>{|}</span>",
            "[blue]{|}[/blue]"
        )
        ,
        new Array /* Red template */
        (
            "<span style='cursor: pointer; background: red;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: red\\'>{|}</span>",
            "[red]{|}[/red]"
        )
        ,
        new Array /* Green template */
        (
            "<span style='cursor: pointer; background: green;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: green\\'>{|}</span>",
            "[green]{|}[/green]"
        )
        ,
        new Array /* Yellow template */
        (
            "<span style='cursor: pointer; background: yellow;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: yellow\\'>{|}</span>",
            "[yellow]{|}[/yellow]"
        )
        ,
        new Array /* Gray template */
        (
            "<span style='cursor: pointer; background: gray;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: gray\\'>{|}</span>",
            "[gray]{|}[/gray]"
        )
        ,
        new Array /* Silver template */
        (
            "<span style='cursor: pointer; background: silver;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: silver\\'>{|}</span>",
            "[silver]{|}[/silver]"
        )
        ,
        new Array /* Emoteicon :) template */
        (
            "<img alt='' src='http://img1.orkut.com/img/i_smile.gif' " + stylePointer + " title='emoteicon' />",
            "[:)]{|}",
            "[:)]{|}"
        )
        ,
        new Array /* Emoteicon ;) template */
        (
            "<img alt='' src='http://img1.orkut.com/img/i_wink.gif' " + stylePointer + " title='emoteicon' />",
            "[;)]{|}",
            "[;)]{|}"
        )
        ,
        new Array /* Emoteicon :D template */
        (
            "<img alt='' src='http://img1.orkut.com/img/i_bigsmile.gif' " + stylePointer + " title='emoteicon' />",
            "[:D]{|}",
            "[:D]{|}"
        )
        ,
        new Array /* Emoteicon :P template */
        (
            "<img alt='' src='http://img3.orkut.com/img/i_funny.gif' " + stylePointer + " title='emoteicon' />",
            "[:P]{|}",
            "[:P]{|}"
        )
        ,
        new Array /* Emoteicon /) template */
        (
            "<img alt='' src='http://img4.orkut.com/img/i_confuse.gif' " + stylePointer + " title='emoteicon' />",
            "[/)]{|}",
            "[/)]{|}"
        )
        ,
        new Array /* Emoteicon 8) template */
        (
            "<img alt='' src='http://img3.orkut.com/img/i_cool.gif' " + stylePointer + " title='emoteicon' />",
            "[8)]{|}",
            "[8)]{|}"
        )
        ,
        new Array /* Emoteicon :o template */
        (
            "<img alt='' src='http://img4.orkut.com/img/i_surprise.gif' " + stylePointer + " title='emoteicon' />",
            "[:o]{|}",
            "[:o]{|}"
        )
        ,
        new Array /* Emoteicon :( template */
        (
            "<img alt='' src='http://img4.orkut.com/img/i_sad.gif' " + stylePointer + " title='emoteicon' />",
            "[:(]{|}",
            "[:(]{|}"
        )
        ,
        new Array /* Emoteicon :x template */
        (
            "<img alt='' src='http://img2.orkut.com/img/i_angry.gif' " + stylePointer + " title='emoteicon' />",
            "[:x]{|}",
            "[:x]{|}"
        )
    );
/* /VARS:: Toolbar */

/**
 * Edit false and/or true
 * if HTML ?    false   :   true
 * if HTML ? USE HEADER : DONT USE
 */
lightMode = (isHTMLEnabled() ? false : true);

/// <summary>
/// Customization END
/// </summary>

/**
 * System
 */
var i;
var x;
var isHTMLHandler;

// Quote tools
var getter = "##@quote##";
var trimPattern = /^\s+|\s+$/g;
var argPattern = /\S+\?/;

// Quote Paths
var pathBot = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/div";
var pathQuote = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/div[2]";
var pathPost = '//*[@id="messageBody"]';
var pathUsername = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/h3/a";
var pathUsernameA = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/h3/a[2]";

// Tools Paths
var pathPostTools = '/html/body/div[6]/div[3]/table/tbody/tr[2]/td/form/div[4]/div[2]';
if (window.location.href.indexOf("tid") == -1)
    pathPostTools = '/html/body/div[6]/div[3]/table/tbody/tr[2]/td/form/div[3]/div[2]';

// URLs
var postURL = "/CommMsgPost.aspx?";
var msgURL  = "/CommMsgs";

/////////////// APP ///////////////

/// <summary>
/// Get the message in the bottom and check if says that HTML is enabled.
/// Only works in the post page. (postURL)
/// </summary>
function isHTMLEnabled()
{
    var pathHasHtml = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/form/div[5]/div[2]";
    var pathHasHtmlA = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/form/div[4]/div[2]";
    var isHtml;
    if (window.location.href.indexOf("&tid=") != -1)
        isHtml = getXPATH(pathHasHtml);
    else
        isHtml = getXPATH(pathHasHtmlA);
    if (!isHtml) return false;
    var content = isHtml.textContent.split(";");
    content = content[content.length-1];
    if (content.match(/^\s*HTML.{10,}\.\s*$/i))
        return true;
    return false;
}

/// <summary>
/// Add a id to the qreply list
/// </summary>
function QReplyAccept(id, desc)
{
    qreplyHtmlAccept[qreplyCount] = id;
    ++qreplyCount;
}

/// <summary>
/// Check if the community is in the list
/// </summary>
function isQuickReplyHTML()
{
    var x;
    x = window.location.href;
    x = x.match(/cmm=(\d+)/);
    if (!x) return false;
    x = x[1];
    return (qreplyHtmlAccept.indexOf(x) != -1 ? true : false);
}

/// <summary>
/// QuickReply
/// </summary>
function qReply()
{
    var header = isQuickReplyHTML() ? htmlB : msgB;
    var footer = isQuickReplyHTML() ? htmlE : msgE;
    var sig = isQuickReplyHTML() ? htmlSignature : signature;

    f = prompt("Reply:", "");
    if (!f) return;
    body = encodeURIComponent(header + f + footer + sig);
    cmm = location.href.match(/cmm.*/i);
    if (!cmm) return;
    a = document.forms[1];
    a = document.forms[1];
    a.action = postURL + cmm + "&bodyText=" + body + "&Action.submit";
    a.submit();
}

// Validate HTML, re-set messages
msgB = (isHTMLEnabled() ? htmlB : msgB);
msgE = (isHTMLEnabled() ? htmlE : msgE);

quoteB = (isHTMLEnabled() ? htmlQuoteB : quoteB);
quoteE = (isHTMLEnabled() ? htmlQuoteE : quoteE);
headerB = (isHTMLEnabled() ? htmlHeaderB : headerB);
headerE = (isHTMLEnabled() ? htmlHeaderE : headerE);

signature = (isHTMLEnabled() ? htmlSignature : signature);

// Focus length
focusLength = msgE.length + signature.length;

function addslashes(str)
{
    str=str.replace(/\'/g,'\\\'');
    str=str.replace(/\"/g,'\\"');
    str=str.replace(/\\/g,'\\\\');
    str=str.replace(/\0/g,'\\0');
    return str;
}

function getXPATH(path)
{
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

// page of messages
if (window.location.href.split(getter)[0].indexOf(msgURL) > -1)
{
    // [[Quote]]
    var args = window.location.href.replace(argPattern, "").split("&");
    var cmm = args[0];
    var tid = args[1];

    var i = 3;
    var msg = "";

    while ((msg = getXPATH(pathQuote.replace("$", i))))
    {
		// @ time content
		var stime = getXPATH(pathBot.replace("$", i)).textContent;
		stime = stime.replace(/(.*?)(\s{5,}\w+.*?)/, "$1")
		stime = stime.replace(/\n/g, " ");
		stime = stime.replace(trimPattern, "");

		// @ time + message
		var fmsg = msg.innerHTML;
		fmsg = fmsg.replace(/<br(.*?)>/ig, "\n");

        var sendMsg = stime + "TIME" + fmsg;
        sendMsg = sendMsg.replace(trimPattern, "");

		// get username
        var user = getXPATH(pathUsername.replace("$", i));
        if (!user)
        {
            user = "Anonymous";
        }
        else
        {
            var reverseChar = String.fromCharCode(8238);
            var re = new RegExp(reverseChar, "g");
            user = user.textContent;
            user = user.replace(trimPattern, "");
            user = user.replace(re, "");
            if (user.length <= 0)
            {
                user = getXPATH(pathUsernameA.replace("$", i)).textContent;
                user = user.replace(trimPattern, "");
            }
        }

		// User @ Time
        sendMsg = quotedMessage.replace("$USER$", user) + sendMsg;
        if (sendMsg.length > 1800)
            sendMsg = sendMsg.substr(0, 1800) + " [...]";
        sendMsg = escape(sendMsg);

		// location to insert a new button
        var bot = getXPATH(pathBot.replace("$", i));
		var button = '<span class="grabtn" onclick="self.location=\'' + postURL + cmm + '&' + tid + getter + sendMsg + '\';" style="cursor: pointer;">' +
				'<a class="btn" onclick="self.location=\'' + postURL + cmm + '&' + tid + getter + sendMsg + '\';" style="cursor: pointer;" href="javascript:void(0);">quote</a>' +
				'</span>' +
				'<span class="btnboxr">' +
				'<img width="5" height="1" alt="" src="http://img1.orkut.com/img/b.gif"/>' +
				'</span>';
		bot.innerHTML = bot.innerHTML + button;
        i += 2;
    }
    // [[/quote]]
    
    // [[Quick Reply]]
    if (window.location.href.split(getter)[0].indexOf(msgURL) != -1)
    {
        var replyPath = '/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/span';
        var go;
        for (i = 4; i <= 25; ++i)
        {
            go = getXPATH(replyPath.replace("$", i));
            if (go) break;
        }
        var lbright = document.createElement("span");
        lbright.innerHTML = '<img width="5" height="1" alt="" src="http://img1.orkut.com/img/b.gif"/>';
        lbright.className = "btnboxr";
        var e = document.createElement("span");
        e.id = "qreply";
        e.className = "grabtn";
        e.style.cursor = "pointer";
        e.addEventListener("click", qReply, false);
        window.addEventListener("keydown", function (e) { if (e.keyCode == 81 && e.altKey) qReply(); }, false);
        var a = document.createElement("a");
        a.id = "qreplylink";
        a.className = "btn";
        a.style.cursor = "pointer";
        a.href = "javascript:void(0);";
        a.innerHTML = "qreply";
        e.appendChild(a);
        go.parentNode.insertBefore(e, go);
        go.parentNode.insertBefore(lbright, e.nextSibling);
    }
    // [[/Quick Reply]]
}
else
{
    var post = getXPATH(pathPost);
    // new post page
    if (window.location.href.indexOf(getter) > -1)
    {
        /* [[Quote]] */
        var newLines = (isHTMLEnabled() ? "\n<br />\n" : "\n\n");
        var newLinesHeader = (isHTMLEnabled() ? "\n" : "\n");
        if (post)
        {
            var quote = unescape(window.location.href.replace(/\S+##@quote##/, ""));
            var header = "";
			var x;
            
            if (!isHTMLEnabled())
                quote = quote.replace(/<\/div>/ig, "\n");
            if (!isHTMLEnabled())
                quote = quote.replace(/<.*?>/ig, "");
            if (isHTMLEnabled())
                quote = quote.replace(/[\n]/ig, "<br />\n");
            x = quote.indexOf("TIME");
            header = headerB + quote.substr(0, x) + headerE;
            quote = quote.substr(x + 4);
            if (isHTMLEnabled()) quote = quote.substr(6);
            quote = quote.replace(trimPattern, "");
            if (!isHTMLEnabled()) quote = quote.replace(/&amp;/g, "&");
            header += newLinesHeader;
            if (lightMode) header = "";
            if (!post.value)
            {
                post.value = header +
                    quoteB + quote + quoteE +
                    newLines;
                post.focus();
            }
        /* [[/Quote]] */
    
        }
    }
    
    /* [[TextArea Colorizer]] */
    var textarea = document.getElementsByTagName("textarea");
    for (i = 0; i < textarea.length; ++i)
    {
        textarea[i].focus();
        if (textarea[i].value.indexOf(msgB) == -1 &&
            textarea[i].value.indexOf(msgE) == -1)
        {
            textarea[i].value += msgB + msgE;
            continue;
        }
        if ((document.referrer.indexOf(msgURL) != -1 &&
            window.location.href.indexOf(getter) != -1))
            textarea[i].value += msgB + msgE;
    }
    if (i > 0)
    {
        if (post != textarea[0])
        {
            x = 0;
            textarea[x].focus();
            textarea[x].selectionStart =
                textarea[x].selectionEnd = textarea[x].value.length - focusLength;
        }
    }
    /* [[/TextArea Colorizer]] */
    
    if (i > 0)
    {
        var msgText;

        post = textarea[0];
        /* [[Signature]] */
        if (post.value.indexOf(signature) == -1)
        {
            post.value += signature;
        }
        /* [[/Signature]] */
        
        /* FOCUS */
        post.focus();
        post.selectionStart =
            post.selectionEnd = post.value.length - focusLength;
    }
    
    /* [[Toolbar]] */
    var ctoolbar = getXPATH(pathPostTools);
    if (ctoolbar && window.location.href.indexOf("MsgPost") != -1)
    {
        var items = "";
        var mode = (isHTMLEnabled() ? 1 : 2);
        for (i = 0; i < tools.length; ++i)
        {
            if (tools[i][mode].length == 0) continue;
            items +=
                "<span style='vertical-align:middle;' onclick=\"var post = document.getElementById('messageBody');"+
                "var psel = post.value.substr((post.selectionStart), (post.selectionEnd - post.selectionStart));"+
                "post.value = post.value.substr(0, post.selectionStart) + '" +
                tools[i][mode] +
                "' + post.value.substr(post.selectionEnd);" +
                "var focus = post.value.lastIndexOf('{|}');" +
                "post.value = post.value.replace('{|}', psel);" + 
                "post.selectionStart = post.selectionEnd = focus;" +
                "post.focus(); \">" +
                tools[i][0] +
                "</span>" +
                " <span style='border-left: 1px solid silver; padding-top: 0px;'>&nbsp;</span>";
        }
        ctoolbar.innerHTML += "<div style='line-height: 5px;'>&nbsp;</div>" +
            "<div id='kToolBar' style='border: 1px solid silver; padding: 2px 2px 2px 2px; background-color: " + toolbarColor + "'>" + items + "</div>";
    }
    /* [[/Toolbar]] */

}