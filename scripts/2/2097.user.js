// ==UserScript==
// @name           RateBeer Locals New Message Icon
// @description    Indicates when a new message has been posted to a locals group
// @include        http://www.ratebeer.com/*
// ==/UserScript==

// Copied from: http://www.netspade.com/articles/javascript/cookies.xml
function getCookie(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin !== 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end === -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

// Copied from: http://www.netspade.com/articles/javascript/cookies.xml
function setCookie(name, value, expires, path, domain, secure)
{

    document.cookie= name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");

}

// Copied from: http://www.netspade.com/articles/javascript/cookies.xml
function deleteCookie(name, path, domain)
{
    if (getCookie(name))
    {
        document.cookie = name + "=" + 
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function setLocalsIcon(groupID)
{
  var box = document.createElement("div");
  box.style.border = "2px solid red";
  box.style.background = "orange";
  box.style.display = "inline";
  box.style.width = "40px";

  var link = document.createElement("a");
  link.href = "http://www.ratebeer.com/Groups/Group-View.asp?GroupID=" + groupID;
  link.innerHTML = "L";
  link.style.padding = "3px";

  box.appendChild(link);

  // Find the TD w/ the My Account link
  var allCells, thisCell;
  allCells = document.evaluate(
      "//td[child::a[@href='/messages.asp']][position()=1]",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);

  if (allCells.snapshotLength > 0)
  {
    thisCell = allCells.snapshotItem(0);
    thisCell.insertBefore(box, thisCell.childNodes[0]);
  }
}

function getNewestMessageID(elem)
{
  var messageID = "";
  var linkStart = "/Groups/Message-Show.asp?MessageID=";

  var allLinks, thisLink;
  allLinks = document.evaluate(
      ".//a[starts-with(@href, '" + linkStart + "')][position()=1]",
      elem,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);


  if (allLinks.snapshotLength > 0)
  {
    thisLink = allLinks.snapshotItem(0);

    var messageLink = thisLink.href;
    messageID = messageLink.substring(messageLink.indexOf(linkStart) + linkStart.length);
  }

  return messageID;
}

var g_monthOut = new Date(Date.now() + 24*60*60*1000*30); // Adds 30 days
var g_tenMinutesOut = new Date(Date.now() + 1000*60*10);
var g_groupID = getCookie("GroupID");
var g_location = String(window.location);

function setGroupID(groupID)
{
  setCookie("GroupID", groupID, g_monthOut, "/");
}

function setNewestMessageID(messageID)
{
  setCookie("NewestMessageID", messageID, g_monthOut, "/");
}

function setNewMessageFound()
{
  setCookie("NewMessageFound", "1", null, "/");
}

function setMessagesChecked()
{
  setCookie("MessagesChecked", "1", g_tenMinutesOut, "/");
}

if (g_location.indexOf("http://www.ratebeer.com/Groups/Group-View.asp") > -1)
{
  var groupIDName = "GroupID=";
  // the group ID of the page we're on
  var curGroupID = g_location.substring(g_location.indexOf(groupIDName) + groupIDName.length);

  if (getCookie("NewMessageFound") == "1")
  {
    // nuke the new message found cookie on the locals page for the selected group
    if (g_groupID == curGroupID)
    {
      deleteCookie("NewMessageFound", "/");
    }
    // Keep showing the icon for other groups
    else
    {
      setLocalsIcon(g_groupID);
    }
  }

  // Show the button for groups other than the current
  if (g_groupID != curGroupID)
  {

    // Find the Local Events label
    var elems, elem
    elems = document.evaluate(
        "//span[@class='greenbeerhed'][1]",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);

    if (elems.snapshotLength > 0)
    {
      elem = elems.snapshotItem(0);

      var btn = document.createElement("button");
      btn.innerHTML = "Display New Messages Icon for this Group";
      btn.onclick = function()
      {
        var groupID = g_location.substring(g_location.indexOf(groupIDName) + groupIDName.length);
        setGroupID(groupID);
        setLocalsIcon(groupID);

        var newestMessageID = getNewestMessageID(document);
        setNewestMessageID(newestMessageID);
        setMessagesChecked();


        alert("Success: group set to " + groupID + ".  The above orange icon is what you'll see when a new message arrives for this group.");
      }

      elem.parentNode.insertBefore(btn, elem);
      elem.parentNode.insertBefore(document.createElement("br"), elem);
    }
  }
}
else if(g_groupID)
{
  var messagesChecked = getCookie("MessagesChecked");
  var newMessageFound = getCookie("NewMessageFound");

  if (newMessageFound == "1")
  {
    setLocalsIcon(g_groupID);
  }
  // This will return null when the MessagesChecked cookie expires
  else if (!messagesChecked)
  {   
    // Check messages, get newest message ID, compare, and display icon if different
    var localsURL = "http://www.ratebeer.com/Groups/Group-View.asp?GroupID=" + g_groupID;

    GM_xmlhttpRequest({
        method: "GET",
        url: localsURL,
        headers: {
            "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
            "Accept": "application/atom+xml,application/xml,text/xml",
        },
        onload: function(responseDetails) {

          var prevNewestMessageID = getCookie("NewestMessageID");

          var tmp = document.createElement("div");
          tmp.innerHTML = responseDetails.responseText;

          var messageID = getNewestMessageID(tmp);

          if (messageID != "")
          {
            if (prevNewestMessageID)
            {
              if (prevNewestMessageID != messageID)
              {
                setNewestMessageID(messageID);
                setNewMessageFound();
                setLocalsIcon(g_groupID);
              }
            }
            else
            {
              // This should only fire when only the Group ID cookie is present - sort of an error condition
              setNewestMessageID(messageID);
              setLocalsIcon(g_groupID);
            }
            setMessagesChecked();
          }
        }
    });
  }
}