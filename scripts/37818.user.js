// ==UserScript==
// @name           GameFAQs New Posts script
// @namespace      TheAmazingOne@gamefaqs.com
// @description    Adds new post icons to topics on GameFAQs.
// @include        http://www.gamefaqs.com/boards/*
// @version        1.2
// ==/UserScript==
//
//
//  GameFAQs New Posts script
//  Author: The Amazing One (the_amazing_one3000@yahoo.com)
//
//  Version 1.2 Notes:
//  - Updated the script to be compatible with the new URL format. Let
//    me know if there are any problems.
//  - Fixed a really old bug where jumping to the first new post in a
//    multi-page topic would always go to post #50.
//
// 
//  Known issues:
//  - It turns out that if you set Firefox not to allow 3rd-party
//    cookies, it partly breaks this script. Specifically, it makes it
//    so this script can't load GameFAQs pages in the background on
//    your behalf (that is, logged into your account), which it needs
//    when it tries to figure out what the first new post in a topic
//    is. I'm still trying to find a work-around.
//_____________________________________________________________________
var curSession = GM_getValue("curSession",0)/1;
var d = new Date();
if(curSession<d.getTime()-1000*60*GM_getValue("sessionTimeout",60))
{
   GM_setValue("lastSession",""+curSession);
   GM_setValue("seenTopics","");
}
GM_setValue("curSession",""+d.getTime());
var lastSession = GM_getValue("lastSession",0)/1;
var firstTime = GM_getValue("firstTime",true);
GM_setValue("firstTime",false);
if(firstTime)
   GM_setValue("SettingsFlag",true);
if(GM_getValue("SettingsFlag",false))
   makeSettingsDialog();
GM_setValue("SettingsFlag",false);
GM_registerMenuCommand("GameFAQs New Posts script - Settings",openSettings);

var postsPerPage = GM_getValue("postsPerPage",50)/1;
var url = window.location.href;

var Icons =
{
   newPost: "data:image/gif,GIF89a%12%00%09%00%B3%09%00%00%00%00%FE%CC%9A%DB"
      + "%A9w%FB%C9%97%FF%CD%9B%F7%C5%93%F4%C2%90%ED%BB%89%F9%C7%95%FF%FF%FF"
      + "%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00"
      +  "%00%09%00%2C%00%00%00%00%12%00%09%00%00%0420%C9I%81%B5%B4V%C2qN%1E"
      + "%C8%0D%97t%9Df%A0%AA%80y%96%C0%20%0FG%0B%BE6%80%14%7C%FD%85%80%82a("
      + "%B0i%26%80%83%60Y%FCdp%AD%08%00%3B",
   loading: "data:image/gif,GIF89a%12%00%09%00%F2%00%00%FF%FF%FF%92%92%92%82"
      +  "%82%82%C2%C2%C2bbb%00%00%00BBB%00%00%00!%FF%0BNETSCAPE2.0%03%01%00"
      +"%00%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%09%00%09%00B%03%14%08%BA"
      +"%BC%22%CB%14%D3j%25ce%CB%E3%E4%86%10%04C%96%00%00!%F9%04%09%0A%00%00"
      + "%00%2C%00%00%02%00%06%00%07%00%02%03%11%08P%A6jC%11%23%9C0%C4%A9%10"
      + "-%EF%CA0%24%00!%F9%04%09%0A%00%00%00%2C%00%00%00%00%06%00%08%00B%03"
      +  "%13%08%0Af%F1K%19%D1%D4%88%AB%14E.%08B%80%0D%5E%02%00!%F9%04%09%0A"
      + "%00%00%00%2C%00%00%00%00%08%00%06%00%02%03%12%08%0AB%BB%C6%BC%10%88"
      +  "0E%8D%A1%CD%E6%CF%F7%00%09%00!%F9%04%09%0A%00%00%00%2C%02%00%00%00"
      + "%07%00%06%00B%03%0F%08%10%A1%EE%A6%8C%19%84q%CC%0DM%9E%8A%09%00!%F9"
      +"%04%09%0A%00%00%00%2C%04%00%00%00%05%00%08%00%02%03%118%03%AC%0Cj%84"
      + "'%1F%10%E6%91%0C90%05%90%00%00!%F9%04%09%0A%00%00%00%2C%04%00%02%00"
      + "%05%00%07%00B%03%0E%080%A3%2Bn%85R%A2j.%08c6H%00!%F9%04%01%0A%00%00"
      + "%00%2C%02%00%04%00%07%00%05%00%02%03%10%08%AA3%CB%C380%02(%86%88%20"
      + "%961K%02%00!%FE%1ACreated%20with%20ajaxload.info%00%3B"
};

function openSettings()
{
   GM_setValue("SettingsFlag",true);
   window.location.reload();
}

function makeSettingsDialog()
{
   var dialog = document.createElement('div');
   dialog.style.position="fixed";
   dialog.style.zIndex="100";
   dialog.style.top="50px";
   dialog.style.left="50px";
   dialog.style.backgroundColor="#DDDDDD";
   dialog.style.border="solid 1px black";

   var div1 = document.createElement('div');
   div1.style.width="300px";
   div1.style.backgroundColor="#3366BB";
   div1.style.display="block";
   div1.style.padding="2px";
   var header = document.createElement('span');
   header.style.fontSize="12px";
   header.style.fontFamily="arial, sans-serif";
   header.style.color="white";
   header.appendChild(document.createTextNode("Settings"));
   div1.appendChild(header);
   dialog.appendChild(div1);
   
   var div2 = document.createElement('div');
   div2.style.width="294px";
   div2.style.display="block";
   div2.style.padding="5px";
   div2.style.fontSize="12px";
   div2.style.color="black";
   div2.style.fontFamily="arial, sans-serif";
   var radio1 = document.createElement("input");
   radio1.type="radio";
   radio1.name="showIcons";
   var radio2 = document.createElement("input");
   radio2.type="radio";
   radio2.name="showIcons";
   if(GM_getValue("showAllIcons",true))
      radio2.checked = true;
   else
      radio1.checked = true;
   write(div2,"Display new post icons");
   div2.appendChild(document.createElement('br'));
   div2.appendChild(radio1);
   write(div2,"only on active messages page");
   div2.appendChild(document.createElement('br'));
   div2.appendChild(radio2);
   write(div2,"on topic list and on active messages page");
   div2.appendChild(document.createElement('br'));
   div2.appendChild(document.createElement('hr'));
   var input1 = document.createElement("input");
   input1.type="text";
   input1.value=GM_getValue("postsPerPage",50);
   input1.style.width="20px";
   write(div2,"My GameFAQs settings are ");
   div2.appendChild(input1);
   write(div2," posts per page.");
   div2.appendChild(document.createElement('hr'));
   var input2 = document.createElement("input");
   input2.type="text";
   input2.value=GM_getValue("sessionTimeout",60);
   input2.style.width="20px";
   write(div2,"Start new session after ");
   div2.appendChild(input2);
   write(div2," minute(s) of inactivity.");
   div2.appendChild(document.createElement('hr'));
   var cancelButton = document.createElement("input");
   cancelButton.type="button";
   cancelButton.style.lineHeight="27px";
   cancelButton.style.height="27px";
   cancelButton.style.width="60px";
   cancelButton.style.fontSize="12px";
   cancelButton.style.fontFamily="arial, sans-serif";
   cancelButton.style.cssFloat="right";
   cancelButton.value="Cancel";
   cancelButton.addEventListener("click",function(event)
   {
         dialog.parentNode.removeChild(dialog);
         dialog = null;
   },true);
   var saveButton = document.createElement("input");
   saveButton.type="button";
   saveButton.style.lineHeight="27px";
   saveButton.style.height="27px";
   saveButton.style.width="60px";
   saveButton.style.fontSize="12px";
   saveButton.style.fontFamily="arial, sans-serif";
   saveButton.style.cssFloat="right";
   saveButton.value="OK";
   saveButton.addEventListener("click",function(event)
   {
      if(input1.value/10!=1 &&
         input1.value/10!=2 &&
         input1.value/10!=3 &&
         input1.value/10!=4 &&
         input1.value/10!=5)
      {
         alert("Invalid number of posts per page");
         return;
      }
      if(Math.floor(input2.value)!=input2.value)
      {
         alert("Invalid number of minutes");
         return;
      }
      GM_setValue("showAllIcons",radio2.checked);
      GM_setValue("postsPerPage",input1.value);
      GM_setValue("sessionTimeout",input2.value);
      window.location.reload(true);
   },true);
   var defaultButton = document.createElement("input");
   defaultButton.type="button";
   defaultButton.style.lineHeight="27px";
   defaultButton.style.height="27px";
   defaultButton.style.width="60px";
   defaultButton.style.fontSize="12px";
   defaultButton.style.fontFamily="arial, sans-serif";
   defaultButton.style.cssFloat="left";
   defaultButton.value="Defaults";
   defaultButton.addEventListener("click",function(event)
   {
      radio2.checked = true;
      input1.value=50;
      input2.value=60;
   },true);
   div2.appendChild(defaultButton);
   div2.appendChild(cancelButton);
   div2.appendChild(saveButton);
   dialog.appendChild(div2);
   document.body.appendChild(dialog);
}

function write(obj,text)
{
   obj.appendChild(document.createTextNode(text));
}

function parsePostDate(dateString)
{
   var now = new Date();
   dateString = dateString.replace(/^\s+|\s+$/g,'').replace(/(A|P)M/,' $1M');
   postDate = Date.parse(dateString.replace(/([0-9]+\/[0-9]+)/,'$1/'+now.getFullYear()));
   if(postDate<now) return postDate;
   return Date.parse(dateString.replace(/([0-9]+\/[0-9]+)/,'$1/'+(now.getFullYear()-1)));
}

function parseSeenTopics(string)
{
   var result = new Array();
   if(string=="") return result;
   var pairs = string.split('\n');
   for(i in pairs)
   {
      var tmp = pairs[i].split('|');
      result[tmp[0]] = tmp[1]/1;
   }
   
   return result;
}

function writeSeenTopics(seenTopics)
{
   var result = "";
   for(i in seenTopics)
   {
      if(seenTopics[i]!=0)
      {
         result+=i;
         result+='|';
         result+=seenTopics[i];
         result+='\n';
      }
   }
   result = result.substring(0,result.length-1);
   
   return result;
}

function parseTopicRow(topic)
{
   for(var i in topic.title.childNodes)
   {
      if(topic.title.childNodes[i].tagName=="A")
      {
         topicLink = topic.title.childNodes[i];
         break;
      }
   }
   var thisTitle = topicLink.textContent;
   var thisLink = topicLink.href;
   var thisID = topicLink.href.replace(/^.*boards\/.*\/([0-9]+).*$/,'$1');
   var thisAuthor = topic.author.textContent;
   var thisCount = topic.count.textContent.replace(/^\s+|\s+$/g,'')/1;
   var thisTime = parsePostDate(topic.time.textContent);
   
   return {title: thisTitle, link: thisLink, id: thisID,
           author: thisAuthor, count: thisCount, time: thisTime};
}

function parseAMTopicRow(topic)
{
   for(var i in topic.title.childNodes)
   {
      if(topic.title.childNodes[i].tagName=="A")
      {
         topicLink = topic.title.childNodes[i];
         break;
      }
   }
   var thisTitle = topicLink.textContent;
   var thisLink = topicLink.href;
   var thisID = topicLink.href.replace(/^.*boards\/.*\/([0-9]+).*$/,'$1');
   var thisCount = topic.count.textContent.replace(/^\s+|\s+$/g,'')/1;
   var thisLastPost = parsePostDate(topic.lastPost.textContent);
   var thisYourPost = parsePostDate(topic.yourPost.textContent);
   
   return {title: thisTitle, link: thisLink, id: thisID, count: thisCount,
            lastPost: thisLastPost, yourPost: thisYourPost};
}

function getPosts()
{
   var posts = document.evaluate('//table[@class="board message"]//tr/td',
               document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
   if(!posts||posts.snapshotLength==0) return null;
   var result = new Array();
   for(var i=0; i<posts.snapshotLength-1; i+=2)
   {
      result.push({head: posts.snapshotItem(i), body: posts.snapshotItem(i+1)});
   }
   
   return result;
}

function getTopics()
{
   var topics = document.evaluate('//table[@class="board topics"]//tr/td',
                document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
   if(!topics||topics.snapshotLength==0) return null;
   var result = new Array();
   for(var i=0; i<topics.snapshotLength-4; i+=5)
   {
      result.push({title: topics.snapshotItem(i+1),
                   author: topics.snapshotItem(i+2),
                   count: topics.snapshotItem(i+3),
                   time: topics.snapshotItem(i+4)});
   }
   
   return result;
}

function getAMTopics()
{
   var topics = document.evaluate('//table[@class="board topics"]//tr/td',
                document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
   if(!topics||topics.snapshotLength==0) return null;
   var result = new Array();
   for(var i=0; i<topics.snapshotLength-4; i+=5)
   {
      result.push({board: topics.snapshotItem(i),
                   title: topics.snapshotItem(i+1),
                   count: topics.snapshotItem(i+2),
                   lastPost: topics.snapshotItem(i+3),
                   yourPost: topics.snapshotItem(i+4)});
   }
   
   return result;
}

function markRead(topicID,count)
{
   var seenTopics = parseSeenTopics(GM_getValue("seenTopics",""));
   if(!seenTopics['t'+topicID] || seenTopics['t'+topicID] < count)
      seenTopics['t'+topicID]=count;
   GM_setValue("seenTopics",writeSeenTopics(seenTopics));
}

function makeNewIcon(topicLink,author,count)
{
   var newIcon = document.createElement('img');
   newIcon.src = Icons.newPost;
   newIcon.style.border="none";
   var newestPost = "";
   var pageInfo = "";
   if(count!=0)
   {
      newestPost = count+1;
     if(newestPost>postsPerPage)
     {
        page = Math.floor((newestPost-1)/postsPerPage);
        pageInfo = "?page="+page;
        if(author!="")
           pageInfo += "&tc="+author.replace(/ /g,'+');
     }
     if(newestPost<10) newestPost = "00"+newestPost;
     else if(newestPost<100) newestPost = "0"+newestPost;
     newestPost = "#p" + newestPost;
   }
   else if(author!="")
   {
      pageInfo="?tc="+author.replace(/ /g,'+');
   }
   var newLink = document.createElement('a');
   newLink.href = topicLink+pageInfo+newestPost;
   newLink.appendChild(newIcon);
   if(count==0)
   {
      newLink.addEventListener("click",findNewPost,true);
   }
   else
   {
      newLink.addEventListener("click",function(event)
         { this.firstChild.src = Icons.loading; },true);
   }
   return newLink;
}

function findNewPost(event)
{
   var curLink = this.href;
   this.firstChild.src = Icons.loading;
   GM_xmlhttpRequest({
      method: "GET",
      url: this.href,
      onerror: function(response) { followLink(curLink) },
      onload: function(response) { checkPosts(0,curLink,response) }
      });
   event.stopPropagation();
   event.preventDefault();
}

function checkPosts(curPage,curLink,response)
{
   var ind = response.responseText.indexOf("<table class=\"board message\"");
   if (ind == -1) {
      followLink(curLink);
      return;
   }
   var ind2 = response.responseText.indexOf("</table>",ind);
   var table = response.responseText.substring(ind,ind2);
   var posts = table.match(/<td[^>]*>([^<]|<[^\/]|<\/[^t]|<\/t[^d]|<\/td[^>])*<\/td>/g); // matches all tds
   if(getDateOfPost(posts[posts.length-2])<=lastSession)
   {
      var pageLink = response.responseText.match(/page=([0-9]+)\">Last Page<\/a>/);
      if(pageLink.length > 1 && pageLink[1]/1 > curPage)
      {
         GM_xmlhttpRequest({
            method: "GET",
            url: curLink+"&page="+(curPage+1),
            onerror: function(response) { followLink(curLink) },
            onload: function(response) { checkPosts(curPage+1,curLink,response) }
            });
      }
      else
      {
         newestPost = curPage*postsPerPage+posts.length/2;
         if(newestPost<10) newestPost = "00"+newestPost;
         else if(newestPost<100) newestPost = "0"+newestPost;
         newestPost = "#p" + newestPost;
         if(curPage!=0)
            newestPost = "&page="+curPage+newestPost;
         else
            curLink = curLink.replace(/&tc=[^&]*/,'');
         var newLocation = curLink + newestPost;
         followLink(newLocation);
      }
   }
   else
   {
      for(var i=0; i<posts.length-1; i+=2)
      {
         if(getDateOfPost(posts[i])>lastSession || i>=posts.length-2)
         {
            newestPost = curPage*postsPerPage+i/2+1;
            if(newestPost<10) newestPost = "00"+newestPost;
            else if(newestPost<100) newestPost = "0"+newestPost;
            newestPost = "#p" + newestPost;
            if(curPage!=0)
               newestPost = "&page="+curPage+newestPost;
            else
               curLink = curLink.replace(/&tc=[^&]*/,'');
            var newLocation = curLink + newestPost;
            followLink(newLocation);
            break;
         }
      }
   }
}

function followLink(link)
{
   window.location.href = link;
}

function getDateOfPost(headHTML)
{
   return Date.parse(headHTML
      .replace(/^(?:.|\n)*Posted([^|]*)(?:.|\n)*$/,'$1').replace(/^\s+|\s+$/g,''));
}





//--------------
// Message list 
//--------------
if(/\/boards\/.*\/[0-9]+/.test(url))
{
    var topicID = url.replace(/^.*boards\/.*\/([0-9]+).*$/,'$1');
    var page;
    if(/page=[0-9]+/.test(url))
       page = url.replace(/^.*page=([0-9]+).*$/,'$1');
    else
       page = 0;
    var count = getPosts().length;
    markRead(topicID,page*postsPerPage+count);
}

//--------------
// Topic list
//--------------
if(/\/boards\/[0-9]+[^\/]+$/.test(url) && GM_getValue("showAllIcons",true))
{
   var topics = getTopics();
   var icons = new Array();
   var infos = new Array();
   var seenTopics = parseSeenTopics(GM_getValue("seenTopics",""));
   
   for(var i=0; i<topics.length; i++)
   {
      var topicInfo = parseTopicRow(topics[i]);
      if(topicInfo.time>lastSession &&
        (!seenTopics['t'+topicInfo.id] || seenTopics['t'+topicInfo.id]<topicInfo.count))
      {
         var newLink = makeNewIcon(topicInfo.link,topicInfo.author,
               (seenTopics['t'+topicInfo.id])?
               seenTopics['t'+topicInfo.id]:0);
         var space = document.createTextNode(' ');
         topics[i].title.insertBefore(space,topics[i].title.firstChild);
         topics[i].title.insertBefore(newLink,topics[i].title.firstChild);
         topics[i].title.setAttribute("num",i);
         icons[i] = newLink;
         infos[i] = topicInfo;
         topics[i].title.addEventListener("dblclick", function(event) {
            var num = this.getAttribute("num");
            markRead(infos[num].id,infos[num].count);
            icons[num].style.display="none";
         },true);
      }         
   }
   
   var topicsHeader = document.evaluate('//table[@class="topics"]//tr[@class="head"]//th',
                      document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
   if(topicsHeader && topicsHeader.snapshotLength>1)
      topicsHeader.snapshotItem(1).addEventListener("dblclick", function(event)
      {
         for(var num in icons)
         {
            markRead(infos[num].id,infos[num].count);
            icons[num].style.display="none";
         }
      },true);
}

//-----------------------
// Active messages page
//-----------------------
if(/myposts\.php/.test(url))
{
   var topics = getAMTopics();
   var icons = new Array();
   var infos = new Array();
   var seenTopics = parseSeenTopics(GM_getValue("seenTopics",""));
   var lastSession = GM_getValue("lastSession",0);
   
   for(var i=0; i<topics.length; i++)
   {
      var topicInfo = parseAMTopicRow(topics[i]);
      if(topicInfo.lastPost>lastSession &&
        (!seenTopics['t'+topicInfo.id] || seenTopics['t'+topicInfo.id]<topicInfo.count))
      {
         var newLink = makeNewIcon(topicInfo.link,"",
               (seenTopics['t'+topicInfo.id])?
               seenTopics['t'+topicInfo.id]:0);
         var space = document.createTextNode(' ');
         topics[i].title.insertBefore(space,topics[i].title.firstChild);
         topics[i].title.insertBefore(newLink,topics[i].title.firstChild);
         topics[i].title.setAttribute("num",i);
         icons[i] = newLink;
         infos[i] = topicInfo;
         topics[i].title.addEventListener("dblclick", function(event) {
            var num = this.getAttribute("num");
            markRead(infos[num].id,infos[num].count);
            icons[num].style.display="none";
         },true);
      }
   }
}

// --------------------------------------------------------------------------
// Check for updates
// 
// Much thanks to Jarett - http://userscripts.org/users/38602 - for the code
//---------------------------------------------------------------------------
var version_scriptNum = 37818; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1273877062109; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/&#x000A;/g,"\n").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
