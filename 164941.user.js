// ==UserScript==
// @name           OC Forum enhancer v1
// @include        http://forums.offensivecombat.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @description Adds extra functionality to Offensive combat's forums by HatemailPlease
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// Array of all the current categorys on the forums that is used when someone needs to unhide all threads
// Coded by HatemailPlease on 4/3/2013
var hrefs = ["http://forums.offensivecombat.com/vanilla/category/follow?categoryid=2006&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=6&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=2007&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=2008&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=1&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=3&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=2002&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=5&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=2&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=2001&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=2005&value=1&tkey=",
"http://forums.offensivecombat.com/vanilla/category/follow?categoryid=4&value=1&tkey="];
function addMenuGm() {
var newDiv = '<div id="menuGm"><span><img id="unhideButton" title="Unhide all threads" src="http://i.imgur.com/vPO1QZb.png"></img><br><img id="threadsButton" title="Open all unread post" src="http://i.imgur.com/RX7P5zs.png"></img></span></div>';
$('body.Vanilla').append(newDiv);
} 
function addSocial() {
var newDiv = '<span class="Social"><ul>'
+ '<li id="twitter" class="hidden"><a href=""><img border="0" title="Twitter" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAAVdEVYdENyZWF0aW9uIFRpbWUANi8xMS8wOYa/4QEAAAG5SURBVDiNlZNLaxRBEMf/0106O240iQm+NiEJepAlgRiDT/TgHvQD+IW8xQ/jyZNgCCSH9SDEQEIuYnzGFTLrPmCHmZ6u8rAy0x02YgqKbqqrfv2vajp41YovWZZ1gSziFBYg2NUqaFBq7caV8Gy9FoUI/rNYAPxI0sVWmm1QylLXWmE/SU4jAJOakLLUKbeCo9wUB+tv3mOreYBH9xfQeLp6IuAoN8itQBkGWEpv7sSoTNXQ3Im9+Cg3DJBhhoUUZIrOF6sbH2WGGWRYwE4eVSrF/uXaa6/g7uoMHjduOQABZVZgpSTosARUazc8wIePXTx8UuZmVv4qcJJcBcft2Z0ZL3ekAhfw4vmcB/jW62MgxxRkzD7AaWHz0yGmL0+WBE2AC2AGGesPsToWIc2HgbfvvoPNr+Ls5nwFy7fnyxaGCsR7rqXZCNs/h52OzfpD/NxvYwmuAgGllvF7kGM8IgDA9ekE6swF7McBstyrx4OFq2AZAAC6SY7UMoi0ir92sqlrAkxEGm2lMTfew71aFTpQHuBLt4e+EDqJxWE3A2kV07lQrXQSu73XSi769/37c1VD1Z6I9MofNyroYTibO14AAAAASUVORK5CYII="></a></li>'
+ '<li id="facebook" class="hidden"><a href=""><img border="0" title="Facebook" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABV0RVh0Q3JlYXRpb24gVGltZQA2LzI0LzA59sFr4wAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAFPSURBVDiNlZK9SgNBFIXPrBPUGIjEBH8KGwVry+39KbSxU5/AJkUsxEfQN7AUC0EQbNIIWtvFV7AxibgGk7hhf+69YxETskF2N7eaA/c7nDMz6qhyUwBmqsZYNiYYpeQF8PY1ka4uFLJ2qZiDUioVbIzBp/Njf7WoqsNQ2UpP4a3RmSQAcrMZhKGyNQmj7fqJAIUePPe7D88voe36IGFoJgazJMKXlW2srRYBAIdnDwAAJoYmFrCYWIOLERjAcJ9YoIkJJPEJ1v/gg9P7aDKm+Apu+yOiO60GAGAuv5iuwvN1+V+9V74bq5BwieMz2O9XiEmwdXILAHi6Oo7owTALNBMlPuMoENFE0CSMleV8KoPxPee9Di0s6La6mM5OJxoEXjA8+z0fwgJLTFBr1h34veTvPAo36w7EBDW1sXNeEso8GmNtpnYAoJS8Wjrc/QXn6cac0rbZ/wAAAABJRU5ErkJggg=="></a></li>'
+ '<li><a href="link to twit profile"><img border="0"  class="online_icon hidden" title="Online" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZ1JREFUeNpiYEADLOzsCUC8H4j/o2GQWAK6ekYkjQpAaj0QG4D4Iko8DFJ6/GC5Z5c+Mry59wWm9AIQB/75+fMBsq0KQPweZJOei9r/5cdn/H/46eb/z78+/L/x7tz/vY9W/+/dXfZf1UEK5pr3UAvhBpwHSQTne4A1/fn3GysGGeqYbggz5Dyyn/+bexji1AwSB2kGYZCLQK6EGpLACAocoDkOW0+sYNBQ1mKQ5lGCu+zdj5cMp1/sYTj4ZAPD9z9fGYQ4xBmSdGoZbty9xuBtEQFScgBkwH9QgK3buwSsAASefrkL1vj0yz30QGfgZOFmKDGZwqBnrA8OWBaQICi0l9/oYyAGgFxy+c1xBjs7W4Z197YzMDGQAa68OYGIAFg8kwLufLjEcPrYTTAb5IIDIL98fvmDaANAah/fegkORJABC0GsozPvEm0AktqFzP/+/r3AxMIS8OHJdwlGRlCACuDVfGbpQ4ar256DkzQwOWcyIuUDUMoSULQUZrBOV2bgFefAcDbI5vvH34K4H4DYEJQfqJOZKMnOAAEGAGin/5lLjz14AAAAAElFTkSuQmCC"></a>'
+ '<a href="link to twit profile"><img border="0"  class="online_icon" title="Offline" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAm9JREFUeNqck+9LE3Ecx9/3o9ts092yttD8tTXTkaRFPjLwUUX4YP0FJiEh1R8i9STwSVDYpEII2h4FYQ+yIgQfuCQZc2xNNm3LLW8/3Ha3u/t2d8TYxMj6wMHdfT+v9+f94fP9UDgQrMk03j7IT7ItjM9sPcbr/2RREWqSGiym9v3FVP59Yz7VAPJ2j22e77b46H0Cb5cXfR0uIyOWiCGc2gDFM9jPS8H0anZKFkWhsSp/asixdvZqN7lzf4Z824oRSZKIqqqkXC6TfKFIItGwdjZNXGMdxH2tZ01n6gJ2T3tAhx/NzRFZlg3wsKdarZLZhw+IWxPpGusM1Hv23Ogjt2em/wjrbgqFguFG/565d5d4J3pJ6xnbOOUcds63n7TdevNkCW1tbeB5W92ZVhHJ5Da+pzPQxMGyLDweNxiGxpWJUchW9RlLM5TP7eiHKEqoaEAlXTXA3d0cSqVS04R0kXA4gtHLF+HtGcFmOeRjW06Y+E57L5KpbRw1dFeD57z4urzK0/iP2M3mfr8R0FKpJmxnE/8koLfyZX0dZhsn0LWKEoymw6jVakcWIIRgM7kOUWPpXFjwE6uKV4FF0PTfO9JzXiw+B+cEinuSn1EVJUGbuOGdYnzAcbwDrj4XFEU5FOY4Dp9WPuD1uwXAzAaTn3dmGf1AystvW3tar4ciK6eF7B4ujVyAibNo82aM2esgxVbwdOExAksvYXa0hOLLmZta8WrTMjmG7PM2p9kn/1Aw0OtBv+u8sW/R+AYiWxFwDka7K2ow8TFTXybqoE39evJdlkmzlfWxNHgjgaEFsaoESz8lfyaUaVrnXwIMAJ0EUhUgm6mGAAAAAElFTkSuQmCC"></a></li>'
+ '</ul></span>';
$('.AuthorInfo').append(newDiv);
}
function updateSocial(userFb,userTw,usersToCheck) {
var $a
$a = $(".AuthorWrap .PhotoWrap[title=" + "'" + usersToCheck +"'" +"]").parent().next().find($(".Social"));
if(userTw.length > 0){
$a.find("#twitter").toggleClass("hidden");
$a.find($("#twitter>a[href]")).attr('href',userTw);
}

if(userFb.length > 0){
$a.find("#facebook").toggleClass("hidden");
$a.find($("#facebook>a[href]")).attr('href',userFb);
}
}
function openDiscussionLinks() {
   var unRead = document.evaluate("//tbody/tr[contains(concat(' ', normalize-space(@class), ' '), ' Unread ')]//div[@class='Wrap']/a",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   if (! unRead.snapshotLength) {
        return;
    } else {
        var hrefs = [];
        for (var i = 0, l = unRead.snapshotLength; i < l; i++) {
                hrefs[i] = unRead.snapshotItem(i).href;
                console.log(hrefs[i]);  
        }

       for (var i = 0, l = hrefs.length; i < l; i++) {
            GM_openInTab(hrefs[i]);
        }
    }
}
function addNewThreads(){
var allDivs, thisDiv, newValue, oldValue, keyValue, strToCheck, newComments, ReadUnreadXPath, str;
allDivs = document.evaluate("//tr/td[@class='CategoryName']/div[@class='Wrap']/h3",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
postCount = document.evaluate("//td[@class='BigCount CountComments' and position()=3]/div[@class='Wrap']/span[@class='Number']/@title",document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
ReadUnreadXPath = document.evaluate("//table[@class='DataTable CategoryTable']/tbody/tr/@class",document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    newValue = postCount.snapshotItem(i).textContent;
    keyValue = allDivs.snapshotItem(i).textContent;
    strToCheck = ReadUnreadXPath.snapshotItem(i).textContent;
    str = newValue.replace(/,/g,"");
    str = str.replace(/,|comment|s/g,"");
    /**
    Logic to determine if new post and if no new post or all topics read it saves the post count
    Coded by HatemailPlease on 4/3/2013
    **/
    if (strToCheck.toLowerCase().indexOf("read")  >= 0 && strToCheck.toLowerCase().indexOf("unread") <= 0)
    {
    GM_setValue(keyValue,str);
    //console.log(GM_getValue(keyValue) + " True");
    }
    
    oldValue = GM_getValue(keyValue);
    newValue = str;
    newComments = newValue - oldValue;
    //console.log("old: " +oldValue + " New: " + newComments);
    var ComElm = document.createElement('strong');
    ComElm.setAttribute("Class","hasNew NewCommentCount");
    ComElm.setAttribute("title",newComments +" new comment since you last read this.");
    ComElm.innerHTML = '<span title=' + newComments + ' new" class="Number">' + newComments + '</span> new';
    thisDiv.parentNode.insertBefore(ComElm, thisDiv.nextSibling); 
    //console.log(GM_getValue(keyValue));
    //console.log(GM_listValues());
}
}
/** Sends a get request of the url passed into the function
    Coded by HatemailPlease 4/12/13
**/
function xmlHttpReg(urlKey){
GM_xmlhttpRequest({
  method: "GET",
  url: urlKey,
});
}

/** Function that gets you're transientKey and appends it to the url of the discussions
    Calls The xmlHttpReg function and pass's the url with appended key.
    Coded by HatemailPlease 4/12/13
**/
function unhideThread() {
    var tKeyList = document.evaluate("//input[@type='hidden'][@id='TransientKey']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var tKey = tKeyList.snapshotItem(0).value;
        for (var i = 0, l = hrefs.length; i < l; i++) {
            xmlHttpReg(hrefs[i] + tKey); //Add in logic to determine which threads need the request so it doesn't send out each of them.
        }
}

function showLatestPost(){
var userTypeNodes = $(".LatestPost");

userTypeNodes.removeClass ("LatestPost");
}

function deleteAllStoredValues(){
var keys = GM_listValues();
for (var i=0, key=null; key=keys[i]; i++) {
  GM_deleteValue(key);
}
}
function checkOnlineStatus(onlineUsers) {
var usersToCheck = [];
$(".AuthorWrap .Author .Username").each(function (i,e) {usersToCheck.push($(e).text());});
usersToCheck = unique(usersToCheck);
for (var i = 0; usersToCheck.length > i; i++) {
if ( $.inArray(usersToCheck[i], onlineUsers) >= 0) {
//console.log(usersToCheck[i] + " Is Online");
var $a
$a = $(".AuthorWrap .PhotoWrap[title=" + "'" + usersToCheck[i] +"'" +"]").parent().next().find($(".Social")).find(".online_icon").toggleClass("hidden");
}

else {
//console.log(usersToCheck[i] + " Is Offline");
}
}   
}
function pullUserLinks() {
var usersToCheck = [];
var userTw = [];
var userFb = [];
var urls = [];
$(".AuthorWrap .Author .Username[href*='profile']").each(function (i,e) {urls.push($(e).attr('href'));});
urls = unique(urls);
$(".AuthorWrap .Author .Username").each(function (i,e) {usersToCheck.push($(e).text());});
usersToCheck = unique(usersToCheck);
for (var i = 0; urls.length > i; i++) {
$.ajax({
        url: 'http://forums.offensivecombat.com' + urls[i],
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
           $('#Content .ProfileExtend.ProfileFacebook>a', data).each(function(i,e){userFb.push($(e).attr('href'));});
           $('#Content .ProfileExtend.ProfileTwitter>a', data).each(function(i,e){userTw.push($(e).attr('href'));});           
           updateSocial(userFb,userTw,usersToCheck[i]);
           userFb = [];
           userTw = [];
        } 
     });    
}
}
function getOnlineUsers(){
var userString = [];
$.ajax({
        url: 'http://forums.offensivecombat.com/',
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
           $('.OnlineUserWrap.UserLink>a', data).each(function(i,e){userString.push($(e).text());});   
        } 
     });
    userString = unique(userString);
    checkOnlineStatus(userString);
}
function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}

function main() {
addNewThreads();
showLatestPost();
GM_registerMenuCommand("Delete",deleteAllStoredValues);
var url = "http://forums.offensivecombat.com/discussion/";
console.log("Script Started");
addMenuGm();
addSocial();
$("#unhideButton").click (unhideThread);
$("#threadsButton").click (openDiscussionLinks);
$("li.Rank-Admin").css('box-shadow','0px 80px 600px rgb(204, 51, 0) inset');
if(window.location.href.indexOf(url) > -1){
window.setTimeout(getOnlineUsers, 500);
window.setTimeout(pullUserLinks, 400);
}
}

main();