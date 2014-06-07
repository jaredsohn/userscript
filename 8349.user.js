// ==UserScript==
// @name          ForumBookmarks
// @author        Joshua Heyer
// @namespace  http://shog9.com/greasemonkey/scripts/
// @description   Adds links to the forum that automatically post to pensieve.org
// @version        4
// @include       http://*.codeproject.com/*
// @include       http://*.codetools.com/*
// @include       http://*.thecodeproject.com/*
// ==/UserScript==

var BookmarkPage = "";  // enter a page name to override the default (your username)
var pensieveURL = "http://www.pensieve.org/ow.asp";
var Cookie = "C1910376851%3Fpe=cpian";

// no sense loading anything if this isn't even a forum - do a quick test for a forum table
var forumTable = document.evaluate("//table[@id='ForumTable']/tbody/tr[4]/td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( forumTable && forumTable.snapshotLength > 0 )
{   
   var userName = GM_getValue("AuthorName", "");
   if ( !userName )
   {      
      var strAction = "/script/comments/user_reply.asp?forumid=5137&select=1302912";
      GM_xmlhttpRequest({
         method: 'GET',
         url: "http://" + document.location.host + strAction,
         onload: function(responseDetails) 
         {
            if ( responseDetails.status == 200 )
            {
               var tmpDiv = document.createElement("DIV");
               tmpDiv.style.display = "none";
               tmpDiv.innerHTML = responseDetails.responseText;
               userName = document.evaluate(".//input[@name='AuthorName']/@value", tmpDiv, null, XPathResult.STRING_TYPE, null).stringValue;
               tmpDiv.innerHTML = userName;
               userName = tmpDiv.textContent;
               GM_setValue("AuthorName", userName);
            }
         }
      });      
   }
   
   if ( BookmarkPage == "" )
      BookmarkPage = userName;
      
   function AddBookmarkLink(el)
   {
      if ( el.href.match(/msg=(\d*)/) )
      {
         var msgID = RegExp.$1;
         var href = el.href;
         
         var newLink = document.createElement("A");
         newLink.id = "pensievebookmark" + msgID;
         newLink.href = "#";
         newLink.title = "Bookmark this post on Pensieve";
         newLink.textContent = "Bookmark";
         newLink.addEventListener("click", function(event)
         {
            BookmarkPost(href, msgID);
            event.preventDefault();
         }, true);
         el.parentNode.appendChild(document.createTextNode('['));
         el.parentNode.appendChild(newLink);
         el.parentNode.appendChild(document.createTextNode(']'));
      }
   }
   
   function BookmarkPost(href, msgID)
   {
      var comment = window.prompt("Please describe the link you're bookmarking:");
      var authorName = "";
      var postTitle = "";
      
      if ( !comment && comment != "")
         return;
         
      var bookmarking = document.createElement("B");
      bookmarking.style.color = "green";
      bookmarking.innerHTML = "Bookmarking...";
      bookmarking.id = "pensievebookmarkstatus" + msgID;
      var bookmark = document.getElementById("pensievebookmark" + msgID);
      if ( bookmark )
      {
         bookmark.parentNode.insertBefore(bookmarking, bookmark);
         bookmark.style.display = "none";
      }

      var subject = document.evaluate("//a[@name='"+msgID+"']/b | //tr[td/a[@name='xx"+msgID+"xx']]/td/b/span", document, null, 
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      if ( !subject || subject.snapshotLength == 0 )
         subject = document.evaluate("//a[@name='"+msgID+"']", document, null, 
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
      if ( subject && subject.snapshotLength > 0 )
      {
         postTitle = subject.snapshotItem(0).textContent.replace( /^\s+|\u00A0/g, "" );
      }

      var author = document.evaluate("//tr[descendant::a[@name='"+msgID+"']]/td[@width='140']/font", document, null, 
                           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      if ( author && author.snapshotLength > 0 )
         authorName = author.snapshotItem(0).textContent.replace( /^\s+|\u00A0/g, "" );

      GM_xmlhttpRequest({
         method: 'GET',
         url: pensieveURL + "?p=" + BookmarkPage + "&a=edit",
         headers: 
         {
           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
           'Accept': 'text/html,application/xml,text/xml',
            'Cookie': Cookie
         },
         onload: function(responseDetails) 
         {
            if ( responseDetails.status == 200 )
            {
               var tmpDiv = document.createElement("DIV");
               tmpDiv.style.display = "none";
               tmpDiv.innerHTML = responseDetails.responseText;
               
               var FormItems = 
               { 
                  "text" : "GetNodeContents('.//textarea[@name=\"text\"]')",
                  "rc" : "1",
                  "comment" : "GetNodeValue('.//input[@name=\"comment\"]/@value')",
                  "revision" : "''",
                  "newrev" : "GetNodeValue('.//input[@name=\"newrev\"]/@value')",
                  "p" : "GetNodeValue('.//input[@name=\"p\"]/@value')",
                  "save" : "'Save'"
               };
               
               function GetNodeContents(query)
               {
                  var result = document.evaluate(query, tmpDiv, null, 
                                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                  if ( !result || result.snapshotLength < 1 )
                     return "";
                  return result.snapshotItem(0).textContent;
               }
               
               function GetNodeValue(query)
               {
                  var result = document.evaluate(query, tmpDiv, null, 
                                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                  if ( !result || result.snapshotLength < 1 )
                     return "";
                  return result.snapshotItem(0).nodeValue;
               }
               
               for (var item in FormItems)
               {
                  FormItems[item] = eval(FormItems[item]);
               }
               
               if ( FormItems.text != "" )
                  FormItems.text += "\n";
               FormItems.text += "  ; [" + href + " " + authorName + " - \"" + postTitle + "\"] : " + comment;
               FormItems.comment = comment;
               
               var encodedForm = "";
               for (var item in FormItems)
               {
                  if ( encodedForm.length > 0 )
                     encodedForm += "&";
                  var strVal = escape(FormItems[item]);
                  strVal = strVal.replace(/\+/g, '%2B');  // work around broken escape()
                  encodedForm += item + "=" + strVal;
               }
               
               UpdateBookmarks(msgID, encodedForm);
            }               
            else
            {
               alert('Request returned ' + responseDetails.status +
                    ' ' + responseDetails.statusText + '\n\n' + responseDetails.responseText);
            }
         }
      });   
   }
   
   function UpdateBookmarks(msgID, encodedForm)
   {
      GM_xmlhttpRequest({
         method: 'POST',
         url: pensieveURL + "?a=edit",
         headers: 
         {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': Cookie
         },
         
         data: encodedForm,
         onload: function(responseDetails) 
         {
            var bookmarkstatus = document.getElementById("pensievebookmarkstatus" + msgID);
            if ( bookmarkstatus )
               bookmarkstatus.parentNode.removeChild(bookmarkstatus);
            var bookmark = document.getElementById("pensievebookmark" + msgID);
            if ( responseDetails.status == 200 )
            {
               var bookmarked = document.createElement("B");
               bookmarked.innerHTML = "Bookmarked.";
               if ( bookmark )
                  bookmark.parentNode.replaceChild(bookmarked, bookmark);
            }
            else
            {
               if ( bookmark )
                  bookmark.style.display = "";
               alert('Request returned ' + responseDetails.status +
                    ' ' + responseDetails.statusText + '\n\n' + responseDetails.responseText);
            }
         }
      });
   }
   
   // finally, action!   
   var linkLinks = document.evaluate("//a[text()='Go to Thread Start']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   for (var i=0; linkLinks && i<linkLinks.snapshotLength; ++i)
   {
      AddBookmarkLink(linkLinks.snapshotItem(i));
   }
   
   var linkBookmarks = document.evaluate("//table[@class='MemberNavBar']/tbody/tr/td[2]/a[1]", document, null, 
                                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   if ( linkBookmarks && linkBookmarks.snapshotLength > 0 )
   {
   
      var newLink = document.createElement("A");
      newLink.href = pensieveURL + "?" + BookmarkPage;
      newLink.title = "View your bookmarks on Pensieve";
      newLink.style.color = "green";
      newLink.style.fontWeight = "bold"
      newLink.textContent = "Forum Bookmarks";
      linkBookmarks.snapshotItem(0).parentNode.insertBefore(newLink, linkBookmarks.snapshotItem(0));
      linkBookmarks.snapshotItem(0).parentNode.insertBefore(document.createTextNode(" | "), linkBookmarks.snapshotItem(0));
   }   
}   
