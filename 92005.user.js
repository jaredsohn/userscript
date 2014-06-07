// ==UserScript==
// @name           TVTropes MakeBetterScript
// @namespace      http://userscripts.org/users/sevenroundthings
// @include        http://tvtropes.org/pmwiki/pmwiki.php/*
// ==/UserScript==

// CONFIG STARTS HERE!

var removebadfolders = 1; // 0 = no; 1 = yes


var removethistroper = 1; // 0 = no; 1 = yes
//  !! WARNING! Potentially over-destructive
//  (removes more than it should). You may want
//  to turn this off. Will fix when I can figure out how to.

var un_hide_spoilers = 1; // 0 = no; 1 = yes
// TODO: Add other option, "2 - don't hide but set colour as red"


var badfolders = new Array("Anime",       // Feel free to edit this, hopefully
                           "Fan Fic",     // it's clear how to do so
                           "Fan Works",
                           "Web Comics",
                           "Webcomics",   // for old style
                           "Web Original",
                           "Web Animation");




// ======== Nothing user-editable beyond this point! =========================

if (removebadfolders == 1)
{
  // Folder removing (new style)
  var allfolderlabels = document.evaluate("//div[@class='folderlabel']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var i = 0; i < allfolderlabels.snapshotLength; i++)
  {
    var t = allfolderlabels.snapshotItem(i);
    for (var badthing in badfolders)
    {
      //if (t.innerHTML.toLowerCase().indexOf(badfolders[badthing].toLowerCase) != -1) // doesn't seem to work, case insensitivity TODO
      if (t.innerHTML.indexOf(badfolders[badthing]) != -1)
      {
        var foldernum = t.getAttribute("onclick");
        foldernum = foldernum.replace("togglefolder('", "");
        foldernum = foldernum.replace("');", "");

        var badfoldercontentdivlist = document.evaluate(("//div[@id='"+foldernum+"']"), document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var badfoldercontentdiv = badfoldercontentdivlist.snapshotItem(0);
        t.parentNode.removeChild(t);
      
      }
    }
  }
//  end folder removing (new style)

// Folder removing (old style)

  var allfolderlabelsold = document.evaluate("//span[@class='asscaps']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var i = 0; i < allfolderlabelsold.snapshotLength; i++)
  {
    var t = allfolderlabelsold.snapshotItem(i);
    for (var badthing in badfolders)
    {
       if (t.innerHTML.indexOf(badfolders[badthing]) != -1)
       {
         var todelete = t.nextSibling.nextSibling;
         todelete.parentNode.removeChild(todelete);
         t.parentNode.removeChild(t);
       }
    }
  }

// end Folder removing (old style)


}

if (removethistroper == 1)
{
  // "this troper" removing

  tropers = document.evaluate("//li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < tropers.snapshotLength; i++)
  {
    var t = tropers.snapshotItem(i);
    if (t.innerHTML.toLowerCase().indexOf("this troper") != -1)
    {
      t.parentNode.removeChild(t);
    }

  
  }

  // end "this troper" removing
}

if (un_hide_spoilers == 1)
{
  // spoiler tag removing
  spoilers = document.evaluate("//span[@class='spoiler']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < spoilers.snapshotLength; i++)
  {
    var t = spoilers.snapshotItem(i);
    t.className = "";
  
  }
  // end spoiler tag removing
}

