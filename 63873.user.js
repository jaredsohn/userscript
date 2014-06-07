// ==UserScript==
// @name           NCore-Preview
// @namespace      torrent
// @description    NCore Image Preview
// @include        http://ncore.nu/letoltes.php*
// @include        http://ncore.cc/letoltes.php*
// ==/UserScript==

function doEvent()
{
  var Id = parseInt(this.href.substring(19));
  var elementId = document.getElementById(Id);
  if (elementId.style.display == "none" && elementId.getAttribute("isOpened") == null)
  {
    elementId.setAttribute("isOpened", "true");
    var Pics = elementId.getElementsByTagName("a");
    for (var i = 0;i<Pics.length; i++)
    {
      var Pic = Pics[i];
      var x = Pic.href.indexOf("kep.php?kep=");
      if (x!=-1)
      {
        var id = Pic.href.substring(x+12);
        var td = Pic.parentNode;
        var tr = td.parentNode;
        var table = tr.parentNode;
        var div = table.parentNode;
        var divParent = div.parentNode;
      
        var newtd = document.createElement("a");
        newtd.setAttribute("onclick", Pic.getAttribute('onclick'));
        newtd.setAttribute("href", "#");
        newtd.innerHTML = '<img src="/ncorekep.php?kep='+id+'" style="max-width: 255px;">';
        divParent.appendChild(newtd);

        table.style.display = "none";
      }
    }
  }
}

var Tags = document.getElementsByTagName("a");
for (var i=0; i<Tags.length; i++)
{
  if (Tags[i].addEventListener)
  {
    Tags[i].addEventListener("click",doEvent,false);
  }
  else if (Tags[i].attachEvent)
  {
    Tags[i].attachEvent("click",doEvent);
  }
}