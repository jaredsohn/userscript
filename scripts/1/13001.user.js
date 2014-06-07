// ==UserScript==
// @name           CuzTheFaceAintListening
// @namespace      http://www.irrelephant.com
// @description    hides LiveJournal entries by a selected user -- Expressive layout only
// @include        http://YOUR NAME HERE.livejournal.com/friends*
// ==/UserScript==

// This is basically a hacked-up version of "Talk To the Hand", which 
// allows you to hide posts from specific users.  It only puts the (x) on posts 
// in communities, since avoiding their other posts is easy. (defriend them!)
// This edition only works with the Expressive layout.  You need
// to modify the @include field above, replacing 'YOUR NAME HERE' with your username.

var kills = 0;
var blist = new Array();

userList = document.evaluate( "//span[@class='ljuser']", document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < userList.snapshotLength; i++) 
{
   var redx = document.createElement('span');
   redx.style.color = "gray";
   redx.style.fontWeight = "bold";
   redx.style.cursor = "pointer";
   var theex = document.createTextNode("(x)");
   redx.appendChild(theex);
   var thisuser = userList.snapshotItem(i);
   //redx.setAttribute("user",thisuser.getAttribute('lj:user'));
   redx.setAttribute("user",thisuser.firstChild.firstChild.nextSibling.getAttribute('lj:user'));
   var mom = thisuser.parentNode;
   if (mom.nextSibling && !mom.id && mom.nextSibling.nodeName == 'BR')
   {
      mom.insertBefore(redx , thisuser.nextSibling);
      redx.addEventListener("click", killUser, false);
      redx.addEventListener("mouseover", changeColor, true);
      redx.addEventListener("mouseout", changeAgain, true);
   }
   var baleeted;
   if (thisuser.getAttribute('lj:user'))
   {
      baleeted = GM_getValue(thisuser.getAttribute('lj:user'));
   }

  if (baleeted > 0) {
     blist[kills] = thisuser.getAttribute('lj:user');
     kills++;
     var walker = thisuser.parentNode;
     while (walker.className != 'post-asset asset' && walker.className != 'item') 
     {
        walker = walker.parentNode;
     }
     walker.parentNode.removeChild(walker);
  }
}

if (kills > 0) 
{
   var main = document.getElementById("alpha-inner");
   var report = document.createElement("div");

   report.setAttribute("class", "box");
   report.style.cursor = "pointer";
   report.style.fontWeight = "bold";
   report.style.color = "blue";
   report.addEventListener("click", popup, true);
   report.addEventListener("mouseover", changeColor, true);
   report.addEventListener("mouseout", changeBack, true);
   if (kills == 1)
   {
      var killcount = document.createTextNode( "One entry deleted.")
   } 
   else 
   {
      var killcount = document.createTextNode( kills + " entries deleted.")
   }
   report.appendChild(killcount);
   main.insertBefore(report, main.firstChild);
}

function killUser()
{
   user = this.getAttribute("user");
   if (confirm('Do you want to hide all entries by ' + user +'?'))
   {
      GM_setValue(user, 1);
      location.reload();
   }
}

function changeColor()
{
   this.style.color = "red";
}

function changeAgain()
{
   this.style.color = "gray";
}

function changeBack()
{
   this.style.color = "blue";
}

function popup()
{
   var deletedusers = document.createElement("div");
   deletedusers.style.color = "black";
   report.removeEventListener("click", popup, true);
   report.removeEventListener("mouseover", changeColor, true);
   report.removeEventListener("mouseout", changeBack, true);
   deletedusers.style.backgroundColor = "yellow";
   deletedusers.style.position = "absolute";
   deletedusers.style.border = "yellow outset .3em";
   deletedusers.style.padding = ".3em";
   deletedusers.style.zIndex = "100";
   var header = document.createTextNode("Select the users you want to restore.");
   deletedusers.appendChild(header);
   var contents = document.createElement("form");
   deletedusers.appendChild(contents)
   contents.setAttribute("name", "userslist");
   contents.setAttribute("id", "userslist");
   for (i=0; i < kills; i++)
   {
      var box = document.createElement("input");
      box.setAttribute("type", "checkbox");
      box.setAttribute("name", blist[i]);
      if (!contents.innerHTML.match(blist[i]))
      {
         contents.appendChild(box);
         var caption = document.createElement("span");
         var username = blist[i].match(/[\w\-]+(?=\.)/);
         caption.appendChild(document.createTextNode(blist[i]));
         contents.appendChild(caption);
         contents.appendChild(document.createElement("br"));
      }
   }
   var undelete = document.createElement("input");
   undelete.setAttribute("type", "button");
   undelete.setAttribute("value", "undelete");
   undelete.setAttribute("name", "undelete");
   contents.appendChild(undelete);
   undelete.addEventListener("click", process, false);
   report.appendChild(deletedusers);
}

function process()
{
   var userslist = document.forms.namedItem("userslist");
   for (i = 0; i < kills; i++) {
      var userzz = userslist.elements.namedItem(blist[i]);
      if (userzz.checked)
      {
         GM_setValue(blist[i], 0);
      }
   }
   location.reload();
}
