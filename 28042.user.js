// ==UserScript==
// @name           Orkut Manager
// @namespace      std
// @description    Manage Orkut
// @include        http://www.orkut.com*
// @exclude        http://www.orkut.com/Edit*
// ==/UserScript==

/*
 * @author Zamaan
 * @profile http://www.orkut.co.in/Profile.aspx?uid=14982845311889996953
 */

var colors =
    new Array
    (
        "navy"/* 0 */,
        "aqua"/* 1 */, "blue"/* 2 */, "fuchsia"/* 3 */, "gold"/* 4 */ , "gray"/* 5 */,
        "green"/* 6 */, "lime"/* 7 */, "maroon"/* 8 */, "navy"/* 9 */, "olive"/* 10 */,
        "orange"/* 11 */, "pink"/* 12 */, "purple"/* 13 */, "red"/* 14 */, "silver"/* 15 */,
        "teal"/* 16 */, "violet"/* 17 */, "yellow"/* 18 */
    );

var i;
var x;


/// <summary>
/// Customize your script here
/// </summary>
/* VARS:: Quote */
var quoteB = "[navy][i]";
var quoteE = "[/i][/navy]";
var headerB = "[navy][i]";
var headerE = "[/i][/navy]";

var htmlQuoteB = "<div style='background: #C8E1FF; border: 2px LightSkyBlue solid; color: black; font-size: 90%; margin-left: 20px; margin-right: 20px; padding: 2px 3px 2px 3px'>";
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

var htmlAccept =
    new Array
    (
        "16467103", /** BoFIV **/
        "10809989", /** CP **/
        "1443557",  /** DNB **/
        "798",      /** FFI **/
        "18047190"  /** Knx **/
    );
/* /VARS:: TextAreas */

/* VARS:: Signature */
var newLine = isHTMLEnabled() ? "\n<br />" : "\n";
var signature = "Sourish And Zamaan's Script !";
var htmlSignature = "";
/* /VARS:: Signature */

/* VARS:: Toolbar */
var toolbarColor = "#FFFFFF";
// Use only once {|} to set the cursor position
// [0] Image/text(HTML), [1] Code HTML, [2] Code
var bToolsize = "18px";
var bStyle = "style='cursor: pointer; height: " + bToolsize + "; width: " + bToolsize + "'";
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
        new Array /* New Line template*/
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;'>&lt;br /&gt;</span>",
            "<br />{|}",
            ""
        )
        ,
        new Array /* Navy template*/
        (
            "<span style='cursor: pointer; background: navy;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: navy\\'>{|}</span>",
            "[navy]{|}[/navy]"
        )
        ,
        new Array /* Blue template*/
        (
            "<span style='cursor: pointer; background: blue;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: blue\\'>{|}</span>",
            "[blue]{|}[/blue]"
        )
        ,
        new Array /* Red template*/
        (
            "<span style='cursor: pointer; background: red;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: red\\'>{|}</span>",
            "[red]{|}[/red]"
        )
        ,
        new Array /* Green template*/
        (
            "<span style='cursor: pointer; background: green;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: green\\'>{|}</span>",
            "[green]{|}[/green]"
        )
        ,
        new Array /* Yellow template*/
        (
            "<span style='cursor: pointer; background: yellow;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: yellow\\'>{|}</span>",
            "[yellow]{|}[/yellow]"
        )
        ,
        new Array /* Gray template*/
        (
            "<span style='cursor: pointer; background: gray;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: gray\\'>{|}</span>",
            "[gray]{|}[/gray]"
        )
        ,
        new Array /* Silver template*/
        (
            "<span style='cursor: pointer; background: silver;'>&nbsp;&nbsp;&nbsp;&nbsp;</span>",
            "<span style=\\'color: silver\\'>{|}</span>",
            "[silver]{|}[/silver]"
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


/////////////// APP ///////////////

function isHTMLEnabled()
{
    var x;
    x = window.location.href;
    x = x.match(/cmm=(\d+)/);
    if (!x) return false;
    x = x[1];
    return (htmlAccept.indexOf(x) != -1 ? true : false);
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

function getXPATH(path) {
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

// Quote Paths
var pathBot = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/div";
var pathQuote = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/div[2]";
var pathPost = '//*[@id="messageBody"]';
var pathUsername = "/html/body/div[6]/div[3]/table/tbody/tr[2]/td/div[$]/h3/a";

// Tools Paths
var pathPostTools = '/html/body/div[6]/div[3]/table/tbody/tr[2]/td/form/div[4]/div[2]';
if (window.location.href.indexOf("tid") == -1)
    pathPostTools = '/html/body/div[6]/div[3]/table/tbody/tr[2]/td/form/div[3]/div[2]';

var trimPattern = /^\s+|\s+$/g;
var argPattern = /\S+\?/;

var getter = "##@quote##";

var postURL = "http://www.orkut.com/CommMsgPost.aspx?";
var msgURL  = "http://www.orkut.com/CommMsgs";

// page of messages
if (window.location.href.indexOf(msgURL) > -1)
{
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
        if (!isHTMLEnabled())
            fmsg = fmsg.replace(/<.*?>/ig, "");

        var sendMsg = stime + "TIME" + fmsg;
        sendMsg = sendMsg.replace(trimPattern, "");

		// get username
        var user = getXPATH(pathUsername.replace("$", i)).textContent;
        user = user.replace(trimPattern, "");

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
			var aquote = quote;
            var header = "";
			var x;
            x = quote.indexOf("TIME");
            header = headerB + quote.substr(0, x) + headerE;
            quote = quote.substr(x + 4);
            quote = quote.replace(trimPattern, "");
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
        if (textarea[i].value.indexOf(msgB) == -1 ||
            textarea[i].value.indexOf(msgE) == -1)
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
    var toolbar = getXPATH(pathPostTools);
    if (toolbar && window.location.href.indexOf("MsgPost") != -1)
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
        toolbar.innerHTML += "<div style='line-height: 5px;'>&nbsp;</div>" +
            "<div id='kToolBar' style='border: 1px solid silver; padding: 2px 2px 2px 2px; background-color: " + toolbarColor + "'>" + items + "</div>";
    }
    /* [[/Toolbar]] */

}