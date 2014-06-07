// ==UserScript==
// @name			DSaddGroupname
// @namespace		none
// @author			Heinzel
// @description		Fuegt den aktuellen Gruppennamen in der Rekrutierungsuebersicht, dem Hauptgebaeude und der Schmiede ein
// @include		http://de*.die-staemme.de/game.php?*screen=overview_villages*
// @include		http://de*.die-staemme.de/game.php?*screen=train*
// @include		http://de*.die-staemme.de/game.php?*screen=smith*
// @include		http://de*.die-staemme.de/game.php?*screen=main*
// ==/UserScript==



if(location.href.match(/screen=overview_villages&mode=/))
{
  var links = document.getElementsByTagName("a");
  for(var x = 0; x < links.length; x++)
  {
	if(links[x].innerHTML.match(/»&nbsp;Gruppen/))
	{
	  var childs = links[x].parentNode.parentNode.getElementsByTagName("td")[1].childNodes;
	  break;
	}
  }
  
  var groups = "";
  var groupIDs = "";
  for(var x = 1; x < childs.length; x++)
  {
	var string = childs[x].innerHTML;
	
	if(string.match(/\[.+\]/))
	{
	  string = string.split("[")[1].split("]")[0];
	  
	  if(string == "alle")
	  {
		return;
      }
	  
	  var groupID = childs[x].href.split("group=")[1];
	} else {
      continue;
    }
  
	groups += string + ",";
	groupIDs += groupID + ",";
  }
  
  GM_setValue("groupID", groupIDs);
  GM_setValue("group", groups);
}

if(location.href.match(/screen=smith|screen=train|screen=main/))
{
  var h2s = document.getElementsByTagName("h2");
  for(var x = 0; x < h2s.length; x++)
  {
	if(h2s[x].innerHTML == "Rekrutieren" || h2s[x].innerHTML.match(/Schmiede|Hauptgebäude/))
	{
	  var h2 = h2s[x];
	  break;
	}
  }
  
  if(!h2)
	return;
  
  var imgs = document.getElementsByTagName("img");
  for(var x = 0; x < imgs.length; x++)
  {
	if(imgs[x].src.match(/villages\.png/))
	{
	  var AktGroupID = imgs[x].parentNode.href.split("group_id=")[1].split("&")[0];
	  break;
	}
  }
  
  var groupID = GM_getValue("groupID");
  var group = GM_getValue("group");
  var groups = (group) ? group.split(",") : "";
  var groupIDs = (groupID) ? groupID.split(",") : "";
  
  if(groups == "" || groupIDs == "")
	return;
  
  if(AktGroupID != "0")
  {
	for(var x = 0; x < groupIDs.length; x++)
	{
	  if(groupIDs[x] == AktGroupID)
	  {
		group = groups[x];
		break;
	  }
	}
  } else {
	group = "alle";
  }
  
  group = group.replace(/,/g, "");
  var span = document.createElement("span");
  span.innerHTML = "<b>Gruppe:</b> " + group + "<br /><br />";
  h2.parentNode.insertBefore(span, h2.nextSibling);
}