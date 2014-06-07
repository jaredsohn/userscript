// ==UserScript==
// @name           GameFAQs Sig Blacklist
// @namespace      TheAmazingOne@gamefaqs.com
// @description    Hides the signatures of GameFAQs users on a custom list
// @include        http://www.gamefaqs.com/boards/genmessage.php?board=*
// @version        1.2.1
// ==/UserScript==

//-----------------------------------------------------------------------------
// Version 1.2.1 notes
//
//   GameFAQs updated their layout and stuff got messed up. This version fixes
//   that.
//-----------------------------------------------------------------------------

var blacklist = GM_getValue("blacklist","").split(",");
if(blacklist=="") blacklist = [];

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

var posts = getPosts();
if(posts)
{
   for(var i=0; i<posts.length; i++)
   {
      for(var j=0; j<blacklist.length; j++)
      {
         if(posts[i].head.textContent.indexOf(blacklist[j])!=-1)
         {
            removeSig(posts[i].body);
            break;
         }
      }
   }
}

function removeSig(body)
{
   if(body.childNodes.length==1 && body.firstChild.tagName == "DIV")
      body = body.firstChild;
   if(body.lastChild.className=="gamefox-signature")
   {
      body.removeChild(body.lastChild);
      return;
   }

   var lines = body.innerHTML.split("<br>");
   var numdivs = 0;
   var len=lines.length;
   if(len>0 && lines[len-1].indexOf("---")!=-1) numdivs++;
   if(len>1 && lines[len-2].indexOf("---")!=-1) numdivs++;
   if(len>2 && lines[len-3].indexOf("---")!=-1) numdivs++;
   while(numdivs>0)
   {
      if(body.lastChild==null) break;         
      var txt = body.lastChild.textContent;
      body.removeChild(body.lastChild);
      GM_log(txt+" "+numdivs+"!");
      if(txt.indexOf("---")!=-1) numdivs--;
   }
}

function addUserPrompt()
{
   var promptText = blacklist.join("\n- ");
   promptText = "Current sig blacklist: \n\n- "+(promptText==""?"none":promptText);
   promptText = promptText + "\n\nEnter a comma-separated list of names (put a space to delete everyone's sigs):";
   var newUser = prompt(promptText);
   if(newUser!=null && newUser!="")
   {
      var names = newUser.split(",");
      for(var k=0; k<names.length; k++)
      {
         for(var i=0; i<blacklist.length; i++)
         {
            if(blacklist[i]==names[k])
               break;
            if(blacklist[i]>names[k])
            {
               blacklist.splice(i,0,names[k]);
               break;
            }
         }
         if(i==blacklist.length)
            blacklist.push(names[k]);
      }
      GM_setValue("blacklist",blacklist.join());
      window.location.reload();
   }
}

function removeUserPrompt()
{
   var promptText = blacklist.join("\n- ");
   promptText = "Current sig blacklist: \n\n- "+(promptText==""?"none":promptText);
   promptText = promptText + "\n\nEnter a comma-separated list of names:";
   var remUser = prompt(promptText);
   if(remUser!=null && remUser!="")
   {
      var names = remUser.split(",");
      for(var k=0; k<names.length; k++)
      {
         for(var i=0; i<blacklist.length; i++)
         {
            if(blacklist[i]==names[k])
            {
               blacklist.splice(i,1);
               break;
            }
            if(blacklist[i]>names[k])
               break;
         }
      }
      GM_setValue("blacklist",blacklist.join(","));
      window.location.reload();
   }
}

GM_registerMenuCommand("GameFAQs Sig Blacklist - Add users",addUserPrompt);
GM_registerMenuCommand("GameFAQs Sig Blacklist - Remove users",removeUserPrompt);

//---------------------------------------------------------------------------
// Check for updates
// 
// Much thanks to Jarett - http://userscripts.org/users/38602 - for the code
//---------------------------------------------------------------------------
var version_scriptNum = 40125; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1240951413585; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/&#x000A;/g,"\n").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
