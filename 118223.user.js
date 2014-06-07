// ==UserScript==
// @name Forum Moderator Status
// @description Cosmetic Forum Moderator Status with Enhanced Forum Abilities.
// @version 4.0
// @author Unknown.
// @include http://services.runescape.com/m=forum*
// ==/UserScript==


// Username:
var nameList = "iLove Sam";

// Custom Title (customizable):
var customTitle = "Forum Mod";

// Forum Help Configuration:
var forumHelpQFC = "103-104-2-63330132";





generateFmods = true;
addQuickFindLinks = true;
addReportPostToForumHelp = true;
addQuickReplyBox = true;
addQuickEditBox = true;
addQuoteLink = true;
addLoadForumPosts = true;
addLastPageLink = true;
addiTest= true;
addBookmarksMenu = true;

//
//Options end.
//



//Compact giant single css line.[/code]

GM_addStyle('#contentmsg .fmod .leftpanel .avatar{border:1px solid #064C0E}#contentmsg .fmod{border-color:#04741E}#contentmsg .fmod .leftpanel{background:none repeat scroll 0 0 #08360D;border-color:#064C0E;border-style:solid;border-width:4px 3px 4px 4px;padding:0;vertical-align:top;width:20%}#contentmsg .fmod .rightpanel{background:none repeat scroll 0 0 #032606;border-bottom:4px solid #064C0E;border-right:4px solid #064C0E;border-top:4px solid #064C0E;padding-left:10px;vertical-align:top}.fmod .uname,.fmod .modtype{background:none repeat scroll 0 0 #08360D;color:white;font-size:12px;font-weight:bold;text-align:center}.fmod .msgcommands{border-top:2px solid #064C0E} #contentmsg .msghighlight { border: 1px solid #FFFF00;}#contentmsg .moved .leftpanel .avatar{border:1px solid #262659}');

//[code]

//
//Globals start.
//
var postMessage;
var postNode;
var messageNode;
var p;
var script;
var nameNode;
var name;
var accName;
var allPosts = [];
//Get account name
accName = document
.getElementById("accountName")
.firstChild
.nodeValue
.replace(/\u00a0/g, " ");
//
//Globals end.
//

//
//Main start.
//

//Added start function to restart forum enhancement suite on loaded posts.
function start() {

//Get number of posts on the page.
numPosts = document.anchors.length;

//Loop through every post.
for (p = 1; p < numPosts; p++) {
postNode = get_nextsibling(document.anchors[p]);

//Get messageNode.
messageNode = postNode
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[1]
.getElementsByTagName("div")[1];

//Get post contents, store in string.
postMessage = messageNode.innerHTML;

allPosts[p] = [];
//Save original post for quoting.
allPosts[p][0] = postMessage
.replace(/<br>/g, "\n")
.replace(/<img class="sm." alt="/g, "")
.replace(/" title="...?" src=/g, "")
.replace(/"http:\/\/www.runescape.com\/img\/blk.gif">/g, "")
.replace(/&lt;/g, "<")
.replace(/&gt;/g, ">")
.replace(/&amp;/g, "&");

//Try to get name from post.
//Will ignore errors from things like hidden posts.
try {
nameNode = postNode
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[0]
.getElementsByTagName("div")[0]
.getElementsByTagName("a")[0];

//Gets name and replaces non-breaking spaces with normal spaces.
name = nameNode
.firstChild
.nodeValue
.replace(/\u00a0/g, " ");

} catch (e) {
name = null;
}

//Save posters name.
allPosts[p][1] = name;

//[/code]
//Test for hidden posts.
var hidden = postMessage.match(/^(\r\n|\r|\n)The contents of this message have been hidden(\r\n|\r|\n)$/); 

//Only run if not hidden.
if ( !hidden ) {

//Generates Forum Moderator Status.
if ( generateFmods ) { GenerateFmods(); }

//Try to add Quick Find Links.
if ( addQuickFindLinks ) { QuickFindLinks(); }

//Write out finished post string.
messageNode.innerHTML = postMessage;

//Add report to forum help link.
if ( addReportPostToForumHelp &&
!( hasClass(postNode,"jmod") ||
hasClass(postNode,"moved")) &&
name !== accName ) { ReportPostToForumHelp(); }

//Add quick edit box.
if ( addQuickEditBox && 
name == accName ) { watchEditButton(); }

//Add quote link.
if ( addQuoteLink &&
name !== accName ) { QuoteLink(); }

if ( addiTest ) { iTest(); }

//Add delete link.
if ( generateFmods &&
name !== accName ) { DeleteLink(); }
}
}

//Add bookmarks.
if ( addBookmarksMenu &&
name !== accName ) { BookmarksMenu(); } 

//Add lock abilites.
if ( addLockThread ) { LockThread(); } 

//Add quick reply box.
if ( addQuickReplyBox ) { watchReplyButton(); }

//Add in page forum loading.
if ( addLoadForumPosts ) { watchPageLinks(); }

}


//
//Main end.
//
//
//Functions start.
//
//Generates Forum Moderator Status.


function GenerateFmods() {

//
//Locals start.
//
var crown;
var space;
//
//Locals end.
//

//Check if name is in list.
if (nameList.indexOf(name) >= 0) {

//Adds custom title to left side of post.
postNode
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[0]
.getElementsByTagName("div")[1]
.innerHTML = customTitle;

//Ignores moved posts.
if (! hasClass(postNode,"moved")) {

//Check if post is highlighted.
if ( hasClass(postNode,"msghighlight")) {

//Sets post class to "message fmod msghighlight".
//Changing post style to forum moderator with highlight
postNode.className = "message fmod msghighlight";
} else {

//Sets post class to "message fmod".
//Changing post style to forum moderator.
postNode.className = "message fmod";
}
}

//Create crown image element.
crown = document.createElement("img");
crown.setAttribute("src",
"http://www.runescape.com/img/forum/crown_green.gif");

//Create non-breaking space.
space = document
.createTextNode("\u00a0\u000a\u000a");

//Insert crown before name.
nameNode
.parentNode
.insertBefore(crown, nameNode);

//Insert space between crown and name.
nameNode
.parentNode
.insertBefore(space, nameNode);
}
}

//Try to change all posted quick-find codes to forum links.
function QuickFindLinks() {

//
//Locals start.
//
var quickFindCodes;
var j;
var quickFindCode;
var forumLink;
//
//Locals end.
//

try {

//Get all posted quickfind codes.
quickFindCodes = postMessage
.match(/\d{1,3}-\d{1,3}-\d{1,3}-\d{7,8}/g);

//Loop through quick find codes.
for (j = 0; j < quickFindCodes.length; j++) {

//Get one quick find code, and replace -'s with ,'s.
quickFindCode = quickFindCodes[j]
.replace(/-/g, ",");

//Generate forum link string.
forumLink = "<a href=\"forums.ws?" + quickFindCode +
"\">" + quickFindCodes[j] + "</a>";

//Replace quick find code in post string,
//with forum link.
//Fixed by Pah Psi, thanks!
postMessage = postMessage
.replace(RegExp(quickFindCodes[j],"g" ), forumLink);
}
} catch (e) {}
}

function ReportPostToForumHelp() {

//
//Locals start.
//
var msgcommandsNode;
var reportLinkText;
var reportLink;
var nbses;
var linebreak;
//
//Locals end.
//

//Get msgcommands node.
msgcommandsNode = postNode
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[0]
.getElementsByTagName("div")[3];


//Create report link text.
reportLinkText = document
.createTextNode("Escalate");

//Create report link element.
reportLink = document.createElement("a");
realReportLinkId = "reportLink" + p;
reportLink.id = realReportLinkId;
reportLink.setAttribute("href", "#");

//Add report link text to post link element.
reportLink.appendChild(reportLinkText);

//Create linebreak element.
linebreak = document.createElement("br");

//Add linebreak to msgcommands.
msgcommandsNode.appendChild(linebreak);

//Add reportLink to msgcommands.
msgcommandsNode.appendChild(reportLink);

realReportLink=document.getElementById(realReportLinkId);
realReportLink.addEventListener("click", reportPost, false);

forumHelpQFC = forumHelpQFC.replace(/-/g,",");
}

//New functions to handle class editing.
function hasClass(ele,cls) {
return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function watchPageLinks() {

//Navagation center.
var navCenter = document
.getElementById("bottom")
.getElementsByTagName("table")[0]
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[1]
.getElementsByTagName("td")[0]
.getElementsByTagName("form")[0]
.getElementsByTagName("ul")[0];

//Array of link nums.
links = [0, 1, 3, 4];

var l;
//Loop through links, adding listener.
for ( l = 0; l < 4; l++ ) {

//Add listener to each link.
navCenter
.getElementsByTagName("li")[links[l]]
.getElementsByTagName("a")[0]
.addEventListener("click", loadForumPosts, false);

}
}


//Define GM_addStyle for compatibility with Opera.
if (typeof GM_addStyle == "undefined") {
function GM_addStyle(css) {
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(css));
heads[0].appendChild(node);
}
}
}

//[/code]

function reportPost(e) {

e.preventDefault();
var postNumber = e.target.id.replace(/reportLink/, "");

var reportedPost = get_nextsibling(document.anchors[postNumber])
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[1]
.getElementsByTagName("div")[1];

//Reported Quick Find Code.
var reportedQuickFindCode = document
.getElementById("uid")
.innerHTML;

//Reported thread title.
var reportedThreadTitle;
if ( document
.getElementById("infopane")
.getElementsByTagName("div")[0]
.id == "forumViewCommunities" ) {

reportedThreadTitle = document
.getElementById("infopane")
.getElementsByTagName("div")[8]
.innerHTML;

} else {

reportedThreadTitle = document
.getElementById("infopane")
.getElementsByTagName("div")[0]
.innerHTML;
}

//Reported page.
var reportedPage = document
.getElementById("bottom")
.getElementsByTagName("table")[0]
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[1]
.getElementsByTagName("td")[0]
.getElementsByTagName("form")[0]
.getElementsByTagName("ul")[0]
.getElementsByTagName("li")[2]
.getElementsByTagName("input")[0]
.getAttribute("value");

//Report String.
var reportString = reportedQuickFindCode +
"\nThread Title: " + reportedThreadTitle +
"\nPage In Thread: " + reportedPage + "\nPost Number(s): " +
postNumber;




var reportedPostCopy = reportedPost.innerHTML;
//[/code]
reportedPost.innerHTML = unescape('%3Cform%20id%3D%22reportForm%22%20method%3D%22post%22%20action%3D%22forums.ws%3F') + forumHelpQFC + unescape('%2Cadd%22%3E%0A%3Cdiv%20id%3D%22qr%22%20style%3D%22display%3Anone%3B%22%3E%0A%3Cbr%3E%3Cbr%3E%0A%3C/div%3E%0A%3Ctable%3E%0A%3Ctbody%3E%3Ctr%3E%0A%3Ctd%20colspan%3D%222%22%3E%0A%3Ctextarea%20name%3D%22contents%22%20rows%3D%226%22%20cols%3D%2230%22%20style%3D%22margin-top%3A%202px%3B%20margin-bottom%3A%202px%3B%20height%3A%2078px%3B%20margin-left%3A%202px%3B%20margin-right%3A%202px%3B%20width%3A%20230px%3B%20%22%3E') + reportString + unescape('%3C/textarea%3E%3Cbr%3E%0A%3C/td%3E%0A%3C/tr%3E%0A%3Ctr%3E%0A%3Ctd%20colspan%3D%222%22%3E%0A%3Cinput%20type%3D%22submit%22%20name%3D%22add%22%20class%3D%22buttonmedium%22%20value%3D%22Report%22%3E%20%26nbsp%3B%20%26nbsp%3B%20%3Cinput%20id%3D%22reportCancle%22%20type%3D%22submit%22%20name%3D%22cancel%22%20class%3D%22buttonmedium%22%20value%3D%22Cancel%22%3E%0A%0A%3C/td%3E%0A%3C/tr%3E%0A%3C/tbody%3E%3C/table%3E%0A%3C/form%3E') + reportedPostCopy;

//[code]
reportCancle=document.getElementById("reportCancle");
reportCancle.addEventListener("click", CancleReport, false);
}

function CancleReport(e) {
e.preventDefault();
var reportForm = document.getElementById("reportForm");
reportForm.parentNode.removeChild(reportForm);
}

function addReplyBox(e) {

e.target.removeEventListener("click", addReplyBox, false);
e.preventDefault();

if ( !document.getElementById("QuickReplySection") ) {

replyUrl = e.target.getAttribute("href");


xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET",replyUrl,false);
xmlhttp.send();

replyHTML = xmlhttp.responseText
.split(/<div id="contrast_panel">/)[1]
.split(/<.script>(\r\n|\r|\n)<\/div>/)[0];

replyScript = document.createElement("script");
replyScript.id = "QuickReplyScript";

replyScript.innerHTML = replyHTML
.split(/<script type="text\/javascript">/)[1]
.replace(/<\/script>/, "")+"install_charlimiters();";

replyScript.innerHTML += replyHTML
.split(/<script type="text\/javascript">/)[2]
.replace(/<\/script>/, "");

replyForm = document.createElement("div");
replyForm.id = "QuickReplySection";
replyForm.innerHTML = replyHTML
.split(/<script type="text.javascript">/)[0];

document.getElementById("contrast_panel").appendChild(replyForm);
document.getElementsByTagName("head")[0].appendChild(replyScript);

var CancleReplyNode = document
.getElementById("command")
.getElementsByTagName("form")[0]
.getElementsByTagName("table")[0]
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[1]
.getElementsByTagName("td")[0]
.getElementsByTagName("input")[2];

CancleReplyNode.addEventListener("click", CancleReply, false);
}




if ( e.target.id ) {

//Get quoted post number.
var quotedPost = e.target.id.replace(/quoteLink/, "");

//Generate quote text.
quoteString = document
.getElementById("charlimit_text_a")
.value +
allPosts[quotedPost][1] +
" Posted:" +
allPosts[quotedPost][0];

//Copy post to text area.
document
.getElementById("charlimit_text_a")
.innerHTML = quoteString;
}

//Jump to reply box.
window.location='#bottom';
}

function LastPageLink() {
var forum = document.getElementById('content_forum');

for (x = 0; x <= 60; x++) {
var tag = forum.getElementsByTagName('td')[x];

if (tag.className == 'threadtitle')
{
var postcount = tag
.nextSibling
.nextSibling
.innerHTML;
var pagecount = Math.ceil(postcount/10);

var threadurl = tag
.getElementsByTagName('a')[0]
.getAttribute('href');

tag
.nextSibling
.nextSibling
.nextSibling
.nextSibling
.innerHTML
+= '<a href="'
+ threadurl
+ ',goto,'
+ pagecount
+ '#'
+ (postcount - 1)
+ '">>>></a>';
}
}
}

function watchReplyButton() {

var replyButtonNode = document
.getElementById("bottom")
.getElementsByTagName("table")[0]
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[0]
.getElementsByTagName("ul")[0]
.getElementsByTagName("li")[0]
.getElementsByTagName("a")[0];

if (replyButtonNode
.innerHTML
.match(/Reply/) == "Reply" ) {

replyButtonNode.addEventListener("click", addReplyBox, false);
}
}

function CancleReply(e) {
e.preventDefault();
var QuickReplySection = document.getElementById("QuickReplySection");
var QuickReplyScript = document.getElementById("QuickReplyScript");
QuickReplySection.parentNode.removeChild(QuickReplySection);
QuickReplyScript.parentNode.removeChild(QuickReplyScript);
}

//check if the next sibling node is an element node
function get_nextsibling(n) {

x=n.nextSibling;
while (x.nodeType!=1) {

x=x.nextSibling;
}
return x;
}


function QuoteLink() {

//
//Locals start.
//
var msgcommandsNode;
var quoteLinkText;
var quoteLink;
var realQuoteLinkId;
var nbses;
var linebreak;
var realQuoteLink;
var replyButtonNode;
var replyUrl;
//
//Locals end.
//

//Get reply link node.
replyButtonNode = document
.getElementById("bottom")
.getElementsByTagName("table")[0]
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[0]
.getElementsByTagName("ul")[0]
.getElementsByTagName("li")[0]
.getElementsByTagName("a")[0];

//Only add quote link, if you can reply to the page.
if (replyButtonNode
.innerHTML
.match(/Reply/) == "Reply" ) {

replyUrl = replyButtonNode.getAttribute("href");





//Get msgcommands node.
msgcommandsNode = postNode
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[0]
.getElementsByTagName("div")[3];

//Create quote link text.
quoteLinkText = document
.createTextNode("Quote");

//Create quote link element.
quoteLink = document.createElement("a");
realQuoteLinkId = "quoteLink" + p;
quoteLink.id = realQuoteLinkId;

//Add reply Url to quote link,
quoteLink.setAttribute("href", replyUrl);

//Add quote link text to quote link element.
quoteLink.appendChild(quoteLinkText);

//Create linebreak element.
linebreak = document.createElement("br");

//Add linebreak to msgcommands.
msgcommandsNode.appendChild(linebreak);
msgcommandsNode.appendChild(linebreak);
msgcommandsNode.appendChild(linebreak);

//Add quote link to msgcommands.
msgcommandsNode.appendChild(quoteLink);

realQuoteLink=document.getElementById(realQuoteLinkId);
realQuoteLink.addEventListener("click", addReplyBox, false);
}
}

function watchEditButton() {
try {

//Get editButtonNode node.
var editButtonNode = postNode
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[0]
.getElementsByTagName("div")[2]
.getElementsByTagName("a")[0];

if (editButtonNode
.innerHTML
.match(/Edit/) == "Edit" ) {

editButtonNode.addEventListener("click", addReplyBox, false);
}
} catch(e) {}
}

function loadForumPosts(e) {

e.preventDefault();

var loadUrl = e.target.parentNode.getAttribute("href");

xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET", loadUrl, false);
xmlhttp.send();

var postHTML = xmlhttp.responseText
.split(/<div id="contentmsg" class="">/)[1]
.split(/<\/table>(\r\n|\r|\n)<\/div>/)[0] +
"<\/table>";

var navHTML = xmlhttp.responseText
.split(/<div class="actions" id="bottom">/)[1]
.split(/<\/table>(\r\n|\r|\n)<\/div>/)[0] +
"<\/table>";

document.getElementById("contentmsg").innerHTML = postHTML;
document.getElementById("bottom").innerHTML = navHTML;
document.getElementById("top").innerHTML = navHTML;

//Rerun Forum Moderator Status.
start();

//Wait half second then jump to top.
setTimeout("window.location='#top'", 500);
}

function DeleteLink() {

//
//Locals start.
//
var msgcommandsNode;
var deleteLinkText;
var deleteLink;
var nbses;
var linebreak;
//
//Locals end.
//

//Get msgcommands node.
msgcommandsNode = postNode
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[0]
.getElementsByTagName("div")[4];

//Create report link text.
deleteLinkText = document
.createTextNode("Hide");

//Create report link element.
deleteLink = document.createElement("a");
realDeleteLinkId = "deleteLink" + p;
deleteLink.id = realDeleteLinkId;
deleteLink.setAttribute("href", "#");

//Add report link text to post link element.
deleteLink.appendChild(deleteLinkText);

//Create linebreak element.
linebreak = document.createElement("br");

//Add linebreak to msgcommands.
msgcommandsNode.appendChild(linebreak);

//Add reportLink to msgcommands.
msgcommandsNode.appendChild(deleteLink);


realDeleteLink=document.getElementById(realDeleteLinkId);
realDeleteLink.addEventListener("click", deletePost, false);

}

function deletePost(e) {

e.preventDefault();
var postNumber = e.target.id.replace(/deleteLink/, "");

var deletedPost = get_nextsibling(document.anchors[postNumber])
.getElementsByTagName("tbody")[0];

deletedPost.parentNode.removeChild(deletedPost);
}

//Fix msgcommands after update.
function iTest(){

var msgcommandsNode;
var insrt

msgcommandsNode = postNode
.getElementsByTagName("tbody")[0]
.getElementsByTagName("tr")[0]
.getElementsByTagName("td")[0]
.getElementsByTagName("div")[0]


insrt = document.createElement("div");

msgcommandsNode.appendChild(insrt);

}

//
//Functions end.
//

//Only run on pages with posts (Excluding the LastPageLink() function).
if ( document.getElementById("contentmsg") ) {

//Start Forum Moderator Status.
start();
}

// Add the last page link.
if ( addLastPageLink &&
document.getElementById("content_forum") ) { LastPageLink(); }
//
//Userscript end.

