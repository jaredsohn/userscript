 scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           GMail Compactor with Custom Icons
// @description    This maximized the vertical real estate in GMail by colapsing the links on the left to an image box, and moving the search to left side. Custom changes made by EC 
// @namespace      http://www.pavelgutin.com
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @version        09.06.02
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below

/*

CHANGES:
- Removed base64 conversion for (10) main button images
- Changed image references to custom set, still based on Tango Desktop Project
- Changed inboxLink and draftsLink evalXPath id to fix message count indicator on buttons (deliberately did not fix spam count)
- Changed name of the folder to 'Menu' instead of 'Folder'
- Changed the ID in update check
- Changed bottom and right css attributes to reposition message counts
- Changed link.style outline to none (to remove the dotted line around active buttons)

EC's TODO (this is a personal customization for my netbook, but I'm thinking of doing the following):
- Maybe a dropdown selection from menu for other buttons (Settings, Calendar, Signout, etc)
- Move the current email account address to the sidebar
- Maybe remove the whole top menubar to increase vertical space

Original TODO:
add a slight delay, and let the lab features load, this will preven the order from messing up
add option to hide spam count	 	
add option to hide spam link completly
add option to only collapse folders and/or the search function
convert to firefox add-on	 	
don't hardcode english words, instead get them from the text on the page
test the script with opers
replace the count with a sprite graphic so it looks cleaner
add styles, rather then hardcoding them inline
*/

window.addEventListener('load', function()
{
  if (unsafeWindow.gmonkey)
  {
    unsafeWindow.gmonkey.load('1.0', function(gmail) 
    {
    
      var inboxCount;
      var spamCount;
      var draftsCount;
   
      function updateCounts()
      {
        //only redraw when necessary, this will prevent flickering
        if (inboxCount != getCount(inboxLink.textContent))
        {
          inboxCount = getCount(inboxLink.textContent);
          newInboxButton.innerHTML = (inboxCount != null) ? "<div style='width:14px; height:12px;display:block; position:absolute; bottom:3px; right:3px; font-size:8px; background-color:#000000; color:#ffffff; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPlJREFUeNqckrEKglAUhu+1uIM2JBJNLUIELq1N0gM4+QRtrT1Kay/h5ANEk6uLYJBLY4hLttr540gNoRd/ONzL9f+413N+2TSNaCWlXNGyoVpTuXxcUKVUCXnz1jv+gQJaQi/wtvbCtk3HtHD+Kl91da+qLM7O5IkIjj9+3MjQ3j/4W8uxJuKP6rJ+Xo6XM21PgA1+XtgFQfgGD7xgRrQJ6Hm72XI2Fz1SplLKUtPH9XEz0Aj8k9AUe9cA3bYROmKva4iBAlig5boAewuAKeakC7I3BZhguJhTHwQPvGAMjlGE4XbBPwFAenLZZlUncgx9Izck5G8BBgCuZYv7nBU3oAAAAABJRU5ErkJggg==); text-align:center;padding-top:2px;'> " + inboxCount + " </div>" : "&nbsp;";
        }
        if (spamCount != getCount(spamLink.textContent))
        {
          spamCount = getCount(spamLink.textContent);
          newSpamButton.innerHTML = (spamCount != null) ? "<div style='width:14px; height:12px;display:block; position:absolute; bottom:0px; right:0px; font-size:8px; background-color:#000000; color:#ffffff; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPlJREFUeNqckrEKglAUhu+1uIM2JBJNLUIELq1N0gM4+QRtrT1Kay/h5ANEk6uLYJBLY4hLttr540gNoRd/ONzL9f+413N+2TSNaCWlXNGyoVpTuXxcUKVUCXnz1jv+gQJaQi/wtvbCtk3HtHD+Kl91da+qLM7O5IkIjj9+3MjQ3j/4W8uxJuKP6rJ+Xo6XM21PgA1+XtgFQfgGD7xgRrQJ6Hm72XI2Fz1SplLKUtPH9XEz0Aj8k9AUe9cA3bYROmKva4iBAlig5boAewuAKeakC7I3BZhguJhTHwQPvGAMjlGE4XbBPwFAenLZZlUncgx9Izck5G8BBgCuZYv7nBU3oAAAAABJRU5ErkJggg==); text-align:center;padding-top:2px;'> " + spamCount + " </div>" : "&nbsp;";
        }
        if (draftsCount != getCount(draftsLink.textContent))
        {
          draftsCount = getCount(draftsLink.textContent);
          newDraftsButton.innerHTML = (draftsCount != null) ? "<div style='width:14px; height:12px;display:block; position:absolute; bottom:3px; right:3px; font-size:8px; background-color:#000000; color:#ffffff; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPlJREFUeNqckrEKglAUhu+1uIM2JBJNLUIELq1N0gM4+QRtrT1Kay/h5ANEk6uLYJBLY4hLttr540gNoRd/ONzL9f+413N+2TSNaCWlXNGyoVpTuXxcUKVUCXnz1jv+gQJaQi/wtvbCtk3HtHD+Kl91da+qLM7O5IkIjj9+3MjQ3j/4W8uxJuKP6rJ+Xo6XM21PgA1+XtgFQfgGD7xgRrQJ6Hm72XI2Fz1SplLKUtPH9XEz0Aj8k9AUe9cA3bYROmKva4iBAlig5boAewuAKeakC7I3BZhguJhTHwQPvGAMjlGE4XbBPwFAenLZZlUncgx9Izck5G8BBgCuZYv7nBU3oAAAAABJRU5ErkJggg==); text-align:center;padding-top:2px;'> " + draftsCount + " </div>" : "&nbsp;";         
        }
        //GM_log(evalXPath("/html/body/div/div[2]/div/div/div/div[3]/div/div[2]/div[2]/div/div[2]/div[2]/div/table", mastHead)[0].style.display);
        
      }
      function initializeFolderImages()
      {
        //icons are from Tango Desktop Project http://tango.freedesktop.org/Tango_Desktop_Project
        var gFolders = new Array(new cLink("https://mail.google.com/mail/#compose", "Compose",  "http://dl.getdropbox.com/u/1192027/gmail/compose.png"), 
                       new cLink("https://mail.google.com/mail/#inbox",    "Inbox",    "http://dl.getdropbox.com/u/1192027/gmail/inbox.png"), 
                       new cLink("https://mail.google.com/mail/#starred",  "Starred",  "http://dl.getdropbox.com/u/1192027/gmail/starred.png"), 
                       new cLink("https://mail.google.com/mail/#chats",    "Chats",    "http://dl.getdropbox.com/u/1192027/gmail/chat.png"), 
                       new cLink("https://mail.google.com/mail/#sent",     "Sent",     "http://dl.getdropbox.com/u/1192027/gmail/sent.png"), 
                       new cLink("https://mail.google.com/mail/#drafts",   "Drafts",   "http://dl.getdropbox.com/u/1192027/gmail/drafts.png"), 
                       new cLink("https://mail.google.com/mail/#all",      "All",      "http://dl.getdropbox.com/u/1192027/gmail/all.png"), 
                       new cLink("https://mail.google.com/mail/#spam",     "Spam",     "http://dl.getdropbox.com/u/1192027/gmail/spam.png"), 
                       new cLink("https://mail.google.com/mail/#trash",    "Trash",    "http://dl.getdropbox.com/u/1192027/gmail/trash.png"), 
                       new cLink("https://mail.google.com/mail/#contacts", "Contacts", "http://dl.getdropbox.com/u/1192027/gmail/contacts.png"));
        for (var i in gFolders)
        {  
          link = document.createElement('a');
          link.href = gFolders[i].href;
          link.target = "_top";
          link.innerHTML = "&nbsp";
          link.id = "link" + gFolders[i].alt;
          link.title = gFolders[i].alt;
          link.style.background = "url(" + gFolders[i].b64 + ")"; 
          link.style.textAlign = "right";
          link.style.verticalAlign = "bottom";
          link.style.width = "32px";
          link.style.height = "32px";
          link.style.display = "block";
          link.style.position = "relative";
          link.style.cssFloat = "left";
          link.style.textDecoration = "none";
          link.style.backgroundRepeat = "no-repeat";
          link.style.margin = "0px";
          link.style.padding = "0px";
          link.style.verticalAlign = "middle";
		  link.style.outline = "none";
          moduleFolders.appendChild(link);
        }		
      }
      
      
      //this is being used in a whole bunch of scripts, but i don't know the source
      //i should figure out who the autor is, and credit him/her properly
      function evalXPath(expression, rootNode)
      {
        try
        {
          var xpathIterator = rootNode.ownerDocument.evaluate(
            expression,
            rootNode,
            null, // no namespace resolver
            XPathResult.ORDERED_NODE_ITERATOR_TYPE,
            null); // no existing results
        }
        catch (err)
        {
          GM_log("Error when evaluating XPath expression '" + expression + "'" + ": " + err);
          return null;
        }
        var results = [];

        // Convert result to JS array
        for (var xpathNode = xpathIterator.iterateNext();
             xpathNode;
             xpathNode = xpathIterator.iterateNext()) 
             {
               results.push(xpathNode);
             }
        return results;
      }
      //get the left side, and the header part of the page
      var navPane = gmail.getNavPaneElement();
      var mastHead = gmail.getMastheadElement();      

      //grab the existing inbox, spam and drafts link before hiding them
      var inboxLink = evalXPath("//*[@id=':r4']", navPane)[0].childNodes[0];
      var draftsLink = evalXPath("//*[@id=':qw']", navPane)[0].childNodes[0];
      var spamLink = evalXPath("//*[@id=':qq']", navPane)[0].childNodes[0];

      //grab the compose link, and the other folders
      var composeLink = navPane.childNodes[0].childNodes[0];
      var otherFolderLinks = navPane.childNodes[0].childNodes[1];
      
      //grab the alert box at the top
      var alertBox = evalXPath("/html/body/div/div[2]/div/div/div/div[3]/div/div[2]/div[2]/div/div[2]/div[2]/div", mastHead)[0];

      //====CREATE THE BUTTONS FOR ALL THE FOLDER, AND HIDE THE OLD LINKS====
      var moduleFolders = gmail.addNavModule('Menu');
      moduleFolders.getElement().style.marginTop = "0px";
      initializeFolderImages();
      navPane.childNodes[0].insertBefore(moduleFolders.getElement(), navPane.childNodes[0].childNodes[0]); //make the new module the first element
      //grab the newly created buttons
      var newInboxButton = evalXPath("//*[@id='linkInbox']", moduleFolders.getElement())[0];
      var newDraftsButton = evalXPath("//*[@id='linkDrafts']", moduleFolders.getElement())[0];
      var newSpamButton = evalXPath("//*[@id='linkSpam']", moduleFolders.getElement())[0];
      //hide the text on the left
      composeLink.style.display = "none";	  
      otherFolderLinks.style.display = "none";
      var timer = setInterval(updateCounts, 2000);  //2 seconds should be quick enough for most people
  	  updateCounts();  //this is probably not even needed

      //====CREATE A SEARCH MODULE, MOVE THE RELEVANT CONTENT INSIDE AND HIDE THE HEADER====
      //move the search box and the rest to the left

      var searchModule = gmail.addNavModule('Search');
      
      var searchBox = evalXPath("//*[@id=':ra']", mastHead)[0];
      var searchMailBtn = evalXPath("//*[@id=':r9']", mastHead)[0];

      
      searchMailBtn.getElementsByTagName('div')[4].innerHTML = '&nbsp;';
      searchMailBtn.getElementsByTagName('div')[4].style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANPSURBVHjabJNbTBRnFMfP9818Mzuzt4FdLgJbJMTuaoJKYYkshTSl2sYIAm7TGCravmliGxPrQx/70pg0TZ98UNuQ9qlN+4CYFG1jjLFYlJtEVlxKCsteZnBd2N2Zlbn3pVDa9Jec5Dz98j85+SP4D719vd8H6mqOEUI4y7aQpmnK8p+J78Z+vnUW/ge0tQQCdV09x3tunzl9hhEEH1I1w7YAIYZCUMjn7OFvh9XRkdHuZDI1vlNAAQDU1NaEo+/2//bR+Qv03bk1fWQmp8SymJpNG9Sd2dUCti08FD3GbhRyH6yuJkfloiz+SzB46uTix+cvMD9NZPS0JpCelspS5FVhs2NfNbtZKorxorM8mX6unx44Qmdza4NTk9OfbwvaI4cuRU9EDy9mkZl46SZ9B9xStcAjF88QimIYtVRcX1mKxwqkpoHS8nqV4ECiJMqpZGoCAAAfbN5/uS3cRiZTwLQ1Crrf5/OzvEtAmOEBIcrjFfwqclUo+ReZhReE6Yi87nit5eBXWwloQohtAUZOjxcyK/E5fZ3FyDZUy9S1QH3jnk8+/ewyxXIulveUOd85dZHjeCCE2NsCwzAMltCEIMuej6+IgUon5gk2RTGTGZ+OJ+XiepazLIsmrMPQVFNVVUrXDX2HwJxKJBKtbsKixRKUx+9Pj5eKubVSISdxLsFvqC8Vk+WcnsqGzloBI1EUVU3Tf98S4OmpmWs3bo5kesO7qIamtgjNcm6EMMaYolnO6cU0YRjeU7n3UPcbR5ur8PWvrxZi87E7219IpzMzwdCeS5RtqC1NIV5xNbZubuoVqpxdEqrqQ+W1of7w2ycHTzTR8ODemM05OMQwpP3p04VhwzBkCgBAEqVfvGXucxvisvjhwJseylVR7WsMv+V7JXQg0hzc1dfih+tXvrA62juwtCYRG2yye3f9UDqd+ZUCAJBlWUolU6Pl/rL3H09NPDc3lpXOkA8fba1jb/147dnNGz+U7t8bv2iD1dvV2QWyoqCBvigHYJ2ltm6RZVl6PDv3pWmaRYeDqfhjKd4w8fAByefzjxZiz648eTL/DUYUq5Tkzv7j/eDxeNGjyYf/lGkH+O9BO8qGAMAGAAgGg0OHj3RfBQA0Nnb7vb8GAD+nbWSrewERAAAAAElFTkSuQmCC)"; 
      searchMailBtn.getElementsByTagName('div')[4].style.backgroundRepeat = "no-repeat";
      searchMailBtn.getElementsByTagName('div')[4].style.backgroundPosition = "3px 1px";
      searchMailBtn.getElementsByTagName('div')[4].style.margin = "0px";
      searchMailBtn.getElementsByTagName('div')[4].style.width = "10px";

      var searchOptions = evalXPath("//*[@id=':r7']", mastHead)[0];
      var createFilter = evalXPath("//*[@id=':r6']", mastHead)[0];
      
      searchOptions.style.textDecoration = "underline";
      searchOptions.style.fontSize = ".7em";
      searchOptions.innerHTML = "[Search options]";
      searchOptions.style.paddingRight = "1em";
      searchOptions.style.paddingLeft = ".25em";
		
      createFilter.style.textDecoration = "underline";
      createFilter.innerHTML = "[Create filter]";
      createFilter.style.fontSize = ".7em";

      searchBox.style.width = "125px";
      searchModule.appendChild(searchBox);
      searchModule.appendChild(searchMailBtn);
      searchModule.appendChild(document.createElement('br'));
      searchModule.appendChild(searchOptions);
      searchModule.appendChild(createFilter);
      navPane.childNodes[0].insertBefore(searchModule.getElement(), navPane.childNodes[0].childNodes[1]); //make this the second module on the left
      //slightly reduce the margin around the top links, so it fits into a 1024px width without wrapping
      var topLinks = evalXPath("//*[@id='gbar']", mastHead)[0].getElementsByTagName('a');
      for (var i = 0; i < topLinks.length; i++)
      {
        topLinks[i].style.margin = "0px 2px 0px 0px";
      }
      //GMail text for consistency
      evalXPath("//*[@id='gbar']", mastHead)[0].getElementsByTagName('b')[0].style.margin = "0px 2px 0px 0px";
      
      
      //hide to header
      mastHead.getElementsByTagName('div')[19].style.display = 'none'; //i need to figure out a better way reference this
      //move the alert with "message sent" and "undo" buttons out of the hidden header
      alertBox.style.position = "absolute";
      alertBox.style.left = "360px";
      mastHead.insertBefore(alertBox, mastHead.childNodes[0]); 
      //append a dismiss button
      var dismissAlert = document.createElement('a');
      dismissAlert.href = "javascript:this.style.visible = 'false';";
      dismissAlert.innerHTML = "[hide me]";
      evalXPath("table/tbody/tr[2]/td[2]", alertBox)[0].appendChild(dismissAlert);
    });
  }
}, true);

window.cLink = function(_href, _alt, _b64) 
{
  this.href = _href;
  this.alt = _alt;
  this.b64 = _b64;
}
window.getCount = function(str)
{
  r = str.match(/\((\d+)\)/);      
  if (r!=null) return r[1];
  else return null;
}

//thanks to sizzlemctwizzle for this
//http://userscripts.org/scripts/show/38017
CheckScriptForUpdate = {
            // Config values, change these to match your script
           id: '50637', // Script id on Userscripts.org
           days: 1, // Days to wait between update checks
          name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
           version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
           time: new Date().getTime() | 0,
           call: function(response) {
              GM_xmlhttpRequest({
                method: 'GET',
          	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
          	  headers: {
          	  'User-agent': window.navigator.userAgent,
          	    'Accept': 'application/atom+xml,application/xml,text/xml',
          	    },
          	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
                });
            },
           compare: function(xpr,response) {
           GM_log(xpr.responseText);
              this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
              this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
              GM_log('this.xversion ' + this.xversion);
              if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
                GM_setValue('updated', this.time);
                GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
              } else if ( (this.xversion) && (this.xversion != this.version) ) {
                if(confirm('Do you want to turn off auto updating for this script?')) {
          	GM_setValue('updated', 'off');
          	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
          	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
                } else {
          	GM_setValue('updated', this.time);
                }
              } else {
                if(response) alert('No updates available for '+this.name);
                GM_setValue('updated', this.time);
              }
            },
           check: function() {
          if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
          if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
                this.call();
              } else if (GM_getValue('updated', 0) == 'off') {
                GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
              } else {
                GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
              }
              }
          };
          if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();