// ==UserScript==
// @name           TDWTF Sanitiser
// @namespace      http://userscripts.org/users/45965
// @description    Makes The Daily WTF forums slightly more bearable. Use Tools > Greasemonkey > User Script Commands > Set Ignored Users on a TDWTF page to ignore users.
// @include        http://forums.thedailywtf.com/forums/*
// ==/UserScript==

// coll is a list of elements that support className property
function getElementsByClassShallow(coll, className)
{
  collList = new Array();
  if (coll == null) return collList;
  for (var i = 0; i < coll.length; i++)
  {
    if (coll[i].className == className)
    {
      collList.push(coll[i]);
    }
  }
  return collList;
}

function getElementsByTagNameShallow(coll, tagName)
{
  collList = new Array();
  if (coll == null) return collList;
  for (var i = 0; i < coll.length; i++)
  {
    if (coll[i].tagName == tagName)
    {
      collList.push(coll[i]);
    }
  }
  return collList;
}

// grab UL element for posts
function getPostList()
{
  return getElementsByClassShallow(document.getElementsByTagName("UL"), "ForumPostList")[0];
}

// do something with each LI in postlist
function forEachPost(callback)
{
  var list = getPostList();
  if (list == null) return;
  list = list.childNodes;
  for (var i = 0; i < list.length; i++)
  {
    if (list[i].tagName == "LI")
    {
      callback(list[i]);
    }
  }
}

// Hide a post
function doHide(obj, showText, accompaniment)
{
  var showAccompany = document.createElement("div");
  if (accompaniment != null)
  {
    showAccompany.innerHTML = accompaniment + "<br /><br />";
  }
  var showButton = document.createElement("div");
  showButton.appendChild(document.createTextNode(showText));
  showButton.className = "CommonTextButton";
  showButton.addEventListener("click", function (evt) {
      showAccompany.parentNode.removeChild(showAccompany);
      obj.style.display = "";
    }, false);
  showAccompany.appendChild(showButton);
  obj.style.display = "none";
  obj.parentNode.insertBefore(showAccompany, obj);
}

function randomTroll()
{
  var x = [
    "I'm a Troll, fol-de-rol, and I'll eat you up for supper.",
    "plz send teh codes",
    "The goggles do nothing.",
    "Have a mug.",
    "Brillant post hidden.",
    "Come back here, nice troll!",
    "Kill kill kill kill kill the trolls<br />hunt them down there shall be no clemency<br />Kill kill kill kill kill the trolls<br />Look under the bridges that's where they hide"
    ];
  return x[Math.floor(Math.random()*x.length)];
}

function sanitise()
{
  var ignoredUsers = GM_getValue("users", "").toLowerCase().split(";");

  forEachPost(function (li) {
      var postArea = getElementsByClassShallow(li.childNodes, "ForumPostArea")[0];
      // making some assumptions here
      // User properties
      var postUser = getElementsByClassShallow(postArea.getElementsByTagName("TD"), "ForumPostUserArea")[0];
      var postUserProperties = getElementsByClassShallow(postUser.getElementsByTagName("UL"), "ForumPostUserPropertyList")[0].childNodes;
      // Post content
      var postContent = getElementsByClassShallow(postArea.getElementsByTagName("TD"), "ForumPostContentArea")[0];
      // Post title
      var postTitle = getElementsByClassShallow(postContent.getElementsByTagName("DIV"), "ForumPostTitleArea")[0];
      // Post footer
      var postFooter = getElementsByClassShallow(postArea.getElementsByTagName("TD"), "ForumPostFooterArea")[0];

      // Who's that girl running around with you? Tell me:
      var postUsername = getElementsByClassShallow(postUserProperties, "ForumPostUserName")[0].getElementsByTagName("A")[0].firstChild.nodeValue.toLowerCase();

      // Now to sanitise
      for (var i = 0; i < ignoredUsers.length; i++)
      {
        if (postUsername == ignoredUsers[i])
        {
          doHide(postContent, "Show post", randomTroll());
        }
      }
    });
}

function setIgnoredUsers(e)
{
  GM_setValue("users", prompt("Enter a list of users to ignore, separated by a semicolon.", GM_getValue("users", "")));
}

GM_registerMenuCommand("Set Daily WTF Ignored Users", setIgnoredUsers);
sanitise();