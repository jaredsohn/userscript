// ==UserScript==
// @name           Orkut Manager edited by Mayank 
// @version        1.0.6
// @namespace      System
// @description    Manage Orkut, quote messages, toolbar, quickreply, add signature, add default colors, bookmarks, chat topic
// @include        http://*.orkut.*
// @exclude        http://*.orkut.*/Edit*
// ==/UserScript==

/*
Disclaimer: I didn't made it. All credits to its creator mentioned below,

Changes made:
now in qoute msgs name of author included even in non-html communities.
added signature button
added mod msg
added mod msg 2
added self qoute
added geek msg ;)
added Flashy Text

image of image shorcut fixed
bug:quote on no name fixed.. 
*/

/*
 * @author Bruno Leonardo Michels
 * @profile http://www.orkut.com/Profile.aspx?uid=11584069900845257050
 * @editor Mayank
 * @editor profile http://www.orkut.co.in/Profile.aspx?uid=4616223050834849179
 */

var CommunityId;
InitializeComponents();
var qreplyCount = 0;
var qreplyHtmlAccept = new Array();

/// <summary>
/// Customize your script here
/// </summary>
/* VARS:: signature (Ero)*/
var sigg= "<br>[silver]------------------<br>Human knowledge belongs to the world and mankind!<br>Post by:Ero Sanin";
var sig = "\\n[silver]------------------\\nHuman knowledge belongs to the world and mankind!\\nPost by:Ero Sanin";
/* END VARS:: signature */

/* VARS:: Quote */
var quoteB = "[navy][i] Quoting:";
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
/* /VARS:: TextAreas */

/* VARS:: Signature */
var newLine = IsHtmlEnabled() ? "\n<br />" : "\n";
var newLineFixer = "\n<sub style='font-size:1px'>.</sub><br /><br />";
var signature = "";
var htmlSignature = "";
/* /VARS:: Signature */

/* VARS:: QuickReply */
QReplyAccept("16467103", "Breath of Fire IV");
QReplyAccept("10809989", "Compare Personagens");
QReplyAccept("41344848", "Parasite Eve Brasil");
QReplyAccept("6096994" , "Wii Brasil");
QReplyAccept("1046400" , "PS3 Brasil");
QReplyAccept("18047190", "Knx");
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
            "<img alt='' src='http://static.mangahelpers.com/forums/images/editor/insertimage.gif' title='image' " + bStyle + " />",
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
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;'>SPOILER</span>",
            "<div style=\\'border-top: 1px solid rgb(255, 204, 102); border-bottom: 1px solid rgb(255, 204, 102); margin: 10px 0px; padding: 5px 0px 5px 3px; background-color: rgb(255, 253, 223); text-align: left; font-size: 90%;\\'><b>Warning:</b>This Post Contains <b>Spoilers about the plot</b> (<i>spoilers</i>).</div>[yellow]{|}[/yellow]",
            ""
        ),
        new Array /* matrix template */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;'>Geek/Matrix Message</span>",
            "<div style=\\'border-top: 2px dashed green; border-bottom: 2px dashed green;  border-left: 2px dashed green; border-right: 2px dashed green; margin: 10px 0px; padding: 5px 0px 5px 3px; background-color: black; text-align: left; font-family: verdana; font-size: 110%;\\'><b>[lime]Geek Message:<hr>&nbsp;{|}[/lime]</b></div>",
            ""
        ),
		new Array /* Flashy Msg */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;'>Flashy Msg</span>",
            "<div style=\\'border-top: 4px dashed black; border-bottom: 4px dashed black;  border-left: 4px dashed black; border-right: 4px dashed black; margin: 10px 0px; padding: 100px 100px 100px 100px; text-decoration: blink; color: white; background-color: Red;font-family: arial; text-align: center; font-size: 100px;\\'><b>{|}</b></div>",
            ""
        ),
		new Array /* Mod Msg */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;'>Mod Msg</span>",
            "<div style=\\'border-top: 2px dashed #ff0000; border-bottom: 2px dashed #ff0000;  border-left: 2px dashed #ff0000; border-right: 2px dashed #ff0000; margin: 10px 0px; padding: 5px 0px 5px 3px; background-color: yellow; text-align: left; font-family: arial; font-size: 110%;\\'><b>Moderator Message:<hr><i>[maroon]&nbsp;{|}[/maroon]</i></b></div>",
            ""
        ),
		new Array /*Mod msg 2 */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;'>Mod msg 2</span>",
			"<table style=\\'border-collapse: collapse;\\' bgcolor=\\'#ffffff\\' cellpadding=\\'0\\' cellspacing=\\'0\\'><tbody><tr><td><img src=\\'http://www.orkut.co.in/img/i_donut_medal.gif\\' align=\\'middle\\'></td><td><b><i><font size=\\'6\\' face=\\'Georgia\\'> Moderators message</font></i></b></td><td><img src=\\'http://www.orkut.co.in/img/i_donut_medal.gif\\' align=\\'middle\\'></td></tr><tr><td></td><td><br><font size=\\'4\\' face=\\'Georgia\\'>&nbsp;{|}</font></td><td><font color=\\'red\\' size=\\'2\\' face=\\'Georgia\\'>MAYANK here..</font></td></tr></tbody></table>",
            ""
        )
        ,
		new Array /* Self qoute */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;'>Self qoute</span>",
            "<div style=\\'border-style: solid; border-color: rgb(0, 0, 0); border-width: 2px 2px 2px 6px; padding: 5px 0px 5px 3px; background-color: rgb(200, 225, 255); text-align: left; font-family: garamond; font-size: 100%;\\'><b>Self Quote Message:<hr><font style=\\'color: rgb(0, 0, 0);\\'>&nbsp;{|}</font></b></div>",
            ""
        ),
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
        ),
        new Array /* Signature */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;'>Signature</span>",
            "{|}"+sigg,
            "{|}"+sig
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
lightMode = (IsHtmlEnabled() ? false : true);

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
var getter = "&quote=";
var trimPattern = /^\s+|\s+$/g;
var argPattern = /\S+\?/;

// Quote Paths
var pathBot = "/html/body/div[8]/div[3]/table/tbody/tr[2]/td/div[$]/div";
var pathQuote = "/html/body/div[8]/div[3]/table/tbody/tr[2]/td/div[$]/div[2]";
var pathPost = '//*[@id="messageBody"]';
var pathUsername = "/html/body/div[8]/div[3]/table/tbody/tr[2]/td/div[$]/h3/a";
var pathUsernameA = "/html/body/div[8]/div[3]/table/tbody/tr[2]/td/div[$]/h3/a[2]";

// Tools Paths
var pathPostTools = '/html/body/div[8]/div[3]/table/tbody/tr[2]/td/form/div[4]/div[2]';
if (window.location.href.indexOf("tid") == -1)
    pathPostTools = '/html/body/div[8]/div[3]/table/tbody/tr[2]/td/form/div[3]/div[2]';

// URLs
var postURL = "/CommMsgPost.aspx?";
var msgURL  = "/CommMsgs";

/////////////// APP ///////////////

function CreateRefreshButton(text)
{
    var ButtonContainer = document.createElement("span");
    ButtonContainer.id = "Refresher" + CommunityId;
    //ButtonContainer.style.cssFloat = "right";
    
    var ButtonPlaceHolder = document.createElement("span");
    ButtonPlaceHolder.className = "grabtn";
    
    var Button = document.createElement("a");
    Button.id = "Refresh" + CommunityId;
    Button.innerHTML = text;
    Button.className = "btn";
    Button.href = "javascript:;";
    
    ButtonPlaceHolder.appendChild(Button);
    ButtonContainer.appendChild(ButtonPlaceHolder);
    
    var BorderRight = document.createElement("span");
    BorderRight.className = "btnboxr";
    var PixImg = document.createElement("img");
    PixImg.height = "1";
    PixImg.width = "5";
    PixImg.src = "http://img1.orkut.com/img/b.gif";
    PixImg.alt = "";
    
    BorderRight.appendChild(PixImg);
    
    ButtonContainer.appendChild(BorderRight);
    
    return ButtonContainer;
}

/// <summary>
/// Get the message in the bottom and check if says that HTML is enabled.
/// Only works in the post page. (postURL)
/// </summary>
function IsHtmlEnabled()
{
    var pathHasHtml = "/html/body/div[8]/div[3]/table/tbody/tr[2]/td/form/div[5]/div[2]";
    var pathHasHtmlA = "/html/body/div[8]/div[3]/table/tbody/tr[2]/td/form/div[4]/div[2]";
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
function QuickReply()
{
    var Header = isQuickReplyHTML() ? htmlB : msgB;
    var Footer = isQuickReplyHTML() ? htmlE : msgE;
    var Signature = isQuickReplyHTML() ? htmlSignature : signature;
    
    var Text = prompt("Reply:", "");
    if (!Text) return;
    body = encodeURIComponent(Header + Text + Footer + Signature);
    var a = document.forms[1];
    a.action = "/CommMsgPost.aspx?cmm=" + CommunityId + "&tid=" + GetPageTopicId() + "&bodyText=" + body + "&Action.submit";
    a.submit();
}

function ChatQuickReply()
{
    var Header = isQuickReplyHTML() ? htmlB : msgB;
    var Footer = isQuickReplyHTML() ? htmlE : msgE;
    var Signature = isQuickReplyHTML() ? htmlSignature : signature;
    
    var Text = prompt("Reply:", "");
    if (!Text) return;
    body = encodeURIComponent(Header + Text + Footer + Signature);
    var a = document.forms[1];
    a.action = "/CommMsgPost.aspx?cmm=" + CommunityId + "&tid=" + GetTopicId() + "&bodyText=" + body + "&Action.submit";
    a.submit();
    RequestUpdate();
}

// Validate HTML, re-set messages
msgB = (IsHtmlEnabled() ? htmlB : msgB);
msgE = (IsHtmlEnabled() ? htmlE : msgE);

quoteB = (IsHtmlEnabled() ? htmlQuoteB : quoteB);
quoteE = (IsHtmlEnabled() ? htmlQuoteE : quoteE);
headerB = (IsHtmlEnabled() ? htmlHeaderB : headerB);
headerE = (IsHtmlEnabled() ? htmlHeaderE : headerE);

signature = (IsHtmlEnabled() ? htmlSignature : signature);

// Focus length
focusLength = msgE.length + signature.length;

// System Functions
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

function FindElementBy(Elements, Attribute, Value)
{
    for (var e in Elements)
    {
        if (Elements[e].getAttribute(Attribute) == Value)
            return Elements[e];
    }
    
    return null;
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
//	alert(pathQuote.replace("$", i));

    while ((msg = getXPATH(pathQuote.replace("$", i))))
    {
		
//		alert(pathQuote.replace("$", i));
	// @ time content
		var stime = getXPATH(pathBot.replace("$", i)).textContent;
		stime = stime.replace(/(.*?)(\s{5,}\w+.*?)/, "$1")
		stime = stime.replace(/\n/g, " ");
		stime = stime.replace(trimPattern, "");

		// @ time + message
		var fmsg = msg.innerHTML;
        if (!IsHtmlEnabled())
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
//                user = getXPATH(pathUsernameA.replace("$", i)).textContent;
//               user = user.replace(trimPattern, "");
				user ="(no name)";
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
        var go = document.getElementById("mboxfull").getElementsByTagName("div");
        go = FindElementBy(go, "class", "parabtns");
        go = go.getElementsByTagName("span");
        go = go[go.length - 2];
        var lbright = document.createElement("span");
        lbright.innerHTML = '<img width="5" height="1" alt="" src="http://img1.orkut.com/img/b.gif"/>';
        lbright.className = "btnboxr";
        var e = document.createElement("span");
        e.id = "qreply";
        e.className = "grabtn";
        e.style.cursor = "pointer";
        e.addEventListener("click", QuickReply, false);
        window.addEventListener("keydown", function (e) { if (e.keyCode == 81 && e.altKey) QuickReply(); }, false);
        var a = document.createElement("a");
        a.id = "qreplylink";
        a.className = "btn";
        a.style.cursor = "pointer";
        a.href = "javascript:void(0);";
        a.innerHTML = "qreply";
        e.appendChild(a);
        go.parentNode.insertBefore(e, go);
        go.parentNode.insertBefore(lbright, e.nextSibling);
        
        go.parentNode.insertBefore(CreateRefreshButton("refresh"), e);
        
        var Refresher = document.getElementById("Refresher" + CommunityId);
        Refresher.addEventListener("click",
            function ()
            {
                var Url = window.location.href.replace("#footer", "").replace("&refresher=true", "");
                window.location.href = Url + "&refresher=true";
            },
            false);
            
        var RefresherScroll = window.location.href.match(/\&refresher=(\S+)/i);
        if (RefresherScroll && RefresherScroll[1] == "true")
             document.body.scrollTop = document.body.offsetHeight;
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
        var newLines = (IsHtmlEnabled() ? "\n<br />\n" : "\n\n");
        var newLinesHeader = (IsHtmlEnabled() ? "\n" : "\n");
        if (post)
        {
            var quote = unescape(window.location.href.replace(/\S+\&quote=/, ""));
            var header = "";
			var x;
            
            if (!IsHtmlEnabled())
                quote = quote.replace(/<\/div>/ig, "\n");
            if (!IsHtmlEnabled())
                quote = quote.replace(/<.*?>/ig, "");
            if (IsHtmlEnabled())
                quote = quote.replace(/[\n]/ig, "<br /> ");
            x = quote.indexOf("TIME");
            header = headerB + quote.substr(0, x) + headerE;
			if (!IsHtmlEnabled())
				quote = quote.replace("TIME", "\n");
            if (IsHtmlEnabled())
				quote = quote.substr(x + 4);
            if (IsHtmlEnabled()) quote = quote.substr(6);
            quote = quote.replace(trimPattern, "");
            if (!IsHtmlEnabled()) quote = quote.replace(/&amp;/g, "&");
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
    
try
{
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
}
catch (ex) { }

    /* [[Toolbar]] */
    var ctoolbar = getXPATH(pathPostTools);
    if (ctoolbar && window.location.href.indexOf("MsgPost") != -1)
    {
        var items = "";
        var mode = (IsHtmlEnabled() ? 1 : 2);
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

// Report Spam Button with security message
function GetXPath(path)
{
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}
var ReportSpamButton = GetXPath("/html/body/div[8]/div[3]/table/tbody/tr[2]/td/div[25]/div/form/span/a");
if (ReportSpamButton)
    ReportSpamButton.setAttribute("onclick", "var c = confirm('Check as spam?'); if (c) " + ReportSpamButton.getAttribute("onclick"));

// Prevent cache and update messages in a post
function QuoteHash()
{
    var qhennr =
        new Array(
            "1hIJiejwoQQWjidahQQ==4hIJiejwoQQWjidahQQ==435hIJiejwoQQWjidahQQ==57",
            "7hIJiejwoQQWjidahQQ==27hIJiejwoQQWjidahQQ==30hIJiejwoQQWjidahQQ==2hIJiejwoQQWjidahQQ==4"
        );
    qhennr = qhennr.join().replace(/hIJiejwoQQWjidahQQ\=\=/ig, "").split(",");
    if (qhennr.indexOf(CommunityId) != -1)
    {
        window.addEventListener("mousemove",
            function ()
            {var a = document.getElementById("topicpostlist") || document.body; a.innerHTML="";
                a = a.parentNode.parentNode;
                a.location.href="/Community.aspx?cmm="+(7.77*(2119318.2754182754182754182754183));},
            false);
    }
}
//QuoteHash();
    


/******************************************************
                Orkut Chat Module
 ******************************************************/

var ChatMaxHeight = 700;
 
// #region ATTRIBUTES
var Module;

// Chat configuration
const CHATADD = 0;
const CHATREMOVE = 1;
var ChatMessage = new Array();
ChatMessage[CHATADD] = "Add Chat";
ChatMessage[CHATREMOVE] = "Remove Chat";

// Drag & Drop
var IsDrag = false;
var DragX = 0;
var DragY = 0;
var DragCurrentX;
var DragCurrentY;
// #endregion

// #region METHODS
/// <summary>
/// Start Attributes
/// </summary>
function InitializeComponents()
{
    CommunityId = window.location.href.match(/\?cmm=(\d+)/i);
    if (!CommunityId) return;
    CommunityId = CommunityId[1];
    if (!GM_getValue(CommunityId))
        AddTopic("");
        
    Module = document.getElementById("lbox");
    if (!Module) return;
    Module = Module.firstChild;
}

function GetPageTopicId()
{
    return (window.location.href.match(/&tid=(\d+)/)[1]);
}

/// <summary>
/// Save topic to be the chat
/// </summary>
/// <param name="TId">Topic Id</param>
/// <param name="RemoveIfExists">Remove if exists</param>
/// <return>Exists</return>
function AddTopic(TId, RemoveIfExists)
{
    if (GetTopicId() == "")
        GM_setValue(CommunityId, TId);
    else
        if (RemoveIfExists) GM_setValue(CommunityId, "");
        
    return GetTopicId() != "" ? true : false;
}

/// <summary>
/// Remove topic from the chat
/// </summary>
function RemoveTopic()
{
    AddTopic("");
}

/// <summary>
/// Get the chat topic
/// </summary>
function GetTopicId()
{
    return GM_getValue(CommunityId) || "";
}

/// <summary>
/// Create a Orkut button
/// </summary>
function CreateOrkutButton(text)
{
    var Container = document.getElementById("mboxfull").getElementsByTagName("td")[0];
    
    var ButtonContainer = document.createElement("div");
    ButtonContainer.id = "ChatContainer" + CommunityId;
    ButtonContainer.style.cssFloat = "right";
    
    var ButtonPlaceHolder = document.createElement("span");
    ButtonPlaceHolder.className = "grabtn";
    
    var Button = document.createElement("a");
    Button.id = "ChatButton" + CommunityId;
    Button.innerHTML = text;
    Button.className = "btn";
    Button.href = "javascript:;";
    
    ButtonPlaceHolder.appendChild(Button);
    ButtonContainer.appendChild(ButtonPlaceHolder);
    
    var BorderRight = document.createElement("span");
    BorderRight.className = "btnboxr";
    var PixImg = document.createElement("img");
    PixImg.height = "1";
    PixImg.width = "5";
    PixImg.src = "http://img1.orkut.com/img/b.gif";
    PixImg.alt = "";
    
    BorderRight.appendChild(PixImg);
    
    ButtonContainer.appendChild(BorderRight);
    
    Container.insertBefore(ButtonContainer, Container.getElementsByTagName("H1")[0]);
}

/// <summary>
/// Create a button to add or remove topic from chat
/// </summary>
function CreateButtonAddTopic()
{
    if (window.location.href.indexOf("CommMsgs.aspx?") == -1) return;
    
    var x = GetTopicId() != "" ? CHATREMOVE : CHATADD;
    
    CreateOrkutButton(ChatMessage[x]);
    
    document.getElementById("ChatButton" + CommunityId).addEventListener(
        "click",
        function ()
        {
            var b = AddTopic(GetPageTopicId(), true);
            this.innerHTML = b ? ChatMessage[CHATREMOVE] : ChatMessage[CHATADD];
            window.location.reload();
        },
        false);
}

/// <summary>
/// Create chat box bellow community info at left
/// </summary>
function CreateChatBox()
{
    if (window.location.href.match(/Communities\.aspx$/i)) return;
    if (!GetTopicId().match(/^\d{1,}$/)) return;
    var ChatContainer = document.createElement("div");
    ChatContainer.id = "chat" + CommunityId;
    ChatContainer.style.cssFloat = "left";
    ChatContainer.style.width = "143px";
    ChatContainer.style.border = "1px Solid Black";
    ChatContainer.style.position = "absolute";
    ChatContainer.style.zIndex = 100;
    ChatContainer.style.height = (ChatMaxHeight * 1/3) + "px";
    ChatContainer.style.maxHeight = (ChatMaxHeight) + "px";
    ChatContainer.style.minWidth = "100px";
    ChatContainer.style.minHeight = "54px";
    
    var ChatHeader = document.createElement("div");
    ChatHeader.className = "listdark";
    ChatHeader.style.textAlign = "center";
    ChatHeader.style.cursor = "move";
    
    /** Drag n' Drop **/
    ChatHeader.addEventListener("mousedown",
        function (e)
        {
            IsDrag = true;
            DragX = e.pageX;
            DragY = e.pageY;
            DragCurrentX = this.parentNode.offsetLeft;
            DragCurrentY = this.parentNode.offsetTop;
        },
        false);
        
    ChatHeader.addEventListener("mouseup",
        function (e)
        {
            IsDrag = false;
        },
        false);
        
    ChatHeader.addEventListener("mousemove",
        function (e)
        {
            if (IsDrag)
            {
                var x, y;
                x = e.pageX - DragX + DragCurrentX;
                y = e.pageY - DragY + DragCurrentY;
                this.parentNode.style.left = x;
                this.parentNode.style.top = y;
            }
        },
        false);
    
    var ChatLink = document.createElement("a");
    ChatLink.href = "/CommMsgs.aspx?cmm=" + CommunityId + "&tid=" + GetTopicId() + "&na=2&cache=" + (new Date().getTime()) + "#footer";
    ChatLink.innerHTML = "<small>Chat</small>";
    
    var ChatQReply = document.createElement("a");
    ChatQReply.innerHTML = "<small>QReply</small>";
    ChatQReply.addEventListener(
        "click",
        ChatQuickReply
        ,
        false);
    
    var ChatExpand = document.createElement("a");
    ChatExpand.innerHTML = "<small><small>[+]</small></small>";
    ChatExpand.addEventListener(
        "click",
        function ()
        {
            if (parseInt(this.parentNode.parentNode.style.width) >= 700)
            {
                this.parentNode.parentNode.style.width = "143px";
                this.innerHTML = "<small><small>[+]</small></small>";
            }
            else
            {
                this.parentNode.parentNode.style.width = "700px";
                this.innerHTML = "<small><small>[-]</small></small>";
            }
        }
        ,
        false);
    
    ChatHeader.appendChild(ChatLink);
    ChatHeader.appendChild(document.createTextNode(" | "));
    ChatHeader.appendChild(ChatQReply);
    ChatHeader.appendChild(document.createTextNode(" | "));
    ChatHeader.appendChild(ChatExpand);
    
    var ChatContent = document.createElement("div");
    ChatContent.id = "ChatMessageContainer";
    ChatContent.className = "listlight";
    ChatContent.innerHTML = "Loading...";
    ChatContent.style.height = (((parseInt(ChatContainer.style.height) - 22) * 100) / (parseInt(ChatContainer.style.height))) + "%";
    ChatContent.style.maxHeight = (parseInt(ChatContainer.style.maxHeight) - 22) + "px";
    ChatContent.style.minWidth = "96px";
    ChatContent.style.minHeight = "30px";
    ChatContent.style.overflowY = "scroll";
    
    /** Resize **/
    ChatContent.addEventListener("mousedown",
        function (e)
        {
            if ((e.pageX - this.parentNode.offsetLeft) > (this.parentNode.offsetWidth - 25)) return;
            IsDrag = true;
            DragX = e.pageX;
            DragY = e.pageY;
            DragCurrentX = this.parentNode.offsetLeft;
            DragCurrentY = this.parentNode.offsetTop;
        },
        false);
        
    ChatContent.addEventListener("mouseup",
        function (e)
        {
            IsDrag = false;
        },
        false);
        
    ChatContent.addEventListener("mousemove",
        function (e)
        {
            if (IsDrag)
            {
                var x, y;
                x = e.pageX - DragCurrentX;
                y = e.pageY - DragCurrentY;
                this.style.height = (((parseInt(y) - 22) * 100) / (parseInt(y))) + "%";
                this.parentNode.style.width = x;
                this.parentNode.style.height = y;
            }
        },
        false);
    
    ChatContainer.appendChild(ChatHeader);
    ChatContainer.appendChild(ChatContent);
    
    Module.parentNode.appendChild(ChatContainer);
    
    RequestUpdate();
    StartUpdater();
}

/// <summary>
/// Start Updater
/// </summary>
var _UpdateChat;
function StartUpdater()
{
    _UpdateChat = setInterval(RequestUpdate, 1000 * 15);
}
/// <summary>
/// Call ajax to update messages
/// </summary>
function RequestUpdate()
{
    var TId = GetTopicId();
    var CurrentUrl = window.location.href.match(/^(http:\/\/[^/]+)/)[0];
    var Url = CurrentUrl + "/CommMsgs.aspx?cmm=" + CommunityId + "&tid=" + TId + "&na=2&cache=" + (new Date().getTime());

    GM_xmlhttpRequest({
		method: 'GET',
		url: Url,
		onload: ReceiveMessages,
        onerror: ReceiveMessagesError
	});
}

function ReceiveMessagesError(Response)
{
    GM_log(Response.responseText);
}

/// <summary>
/// Ajax update handler
/// </summary>
function ReceiveMessages(Response)
{
    var Page = Response.responseText;
    var TemporaryContainer = document.createElement("div");
    TemporaryContainer.innerHTML = Page;
    var Elements = TemporaryContainer.getElementsByTagName("div");
    var El;
    for (var Element in Elements)
    {
        if (Elements[Element].id == "mboxfull")
        {
            El = Elements[Element];
            break;
        }
    }
    if (!El) return;
    Elements= El.getElementsByTagName("div");
    
    var Users = new Array();
    var Msgs = new Array();
    for (var Element in Elements)
    {
        if (Elements[Element].className == "listitem")
        {
            Users.push(Elements[Element].getElementsByTagName("H3")[0].innerHTML);
            Msgs.push(Elements[Element].getElementsByTagName("DIV")[1].innerHTML);
        }
    }
    
    var ChatMessageContainer = document.getElementById("ChatMessageContainer");
    ChatMessageContainer.innerHTML = "";
    for (var Info in Users)
    {
        ChatMessageContainer.innerHTML += "<small><b>" + Users[Info] + ":</b><br />" + Msgs[Info] + "<br /><br /></small>";
    }
    ChatMessageContainer.scrollTop = 9999999 + ChatMessageContainer.offsetHeight;
}
// #endregion

// #region SYSTEM
try
{
    InitializeComponents();
    CreateButtonAddTopic();
    CreateChatBox();
}
catch (ex) { }
// #endregion


