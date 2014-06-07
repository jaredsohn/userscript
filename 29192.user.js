// ==UserScript==
// @name Ace CSM Stats
// @author Ace-_Ventura
// @version 0.0.2
// @include http://*.cs-manager.com/*
// @description Shows the total skills of each player and prints individual skills. More to be added later.
// ==/UserScript==

//Known Issues: None

//To be added:
//Average SP and value.
//Icon and limit search on TL



function createElem(tag, content)
{ 
  var ret = document.createElement(tag);  
  ret.innerHTML = content;  
  return ret;
}


function getNumber(str, initialPosition)
{//a number can only go up to 3 digits so this works just fine
  return parseInt(str.substring(initialPosition, initialPosition+3));   
}


function insertAfter(new_node, existing_node)
{
  // if the existing node has a following sibling, insert the current
  // node before it.  otherwise appending it to the parent node
  // will correctly place it just after the existing node.
  if (existing_node.nextSibling) {
    // there is a next sibling.  insert before it using the mutual
    // parent's insertBefore() method.
    existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
  } else {
    // there is no next sibling. append to the end of the parent's
    // node list.
    existing_node.parentNode.appendChild(new_node);
  }
}





function playerStats()
{
  var imgsrc = document.getElementsByTagName("img");
  var skills = 10; //10 skills. When it goes to 0, reset the values
  var totalSkills = 0;
  var totalEquipment = 0;
  var totalLimits = 0;
  for (var i = 0; i < imgsrc.length; i++)
  {
    var currentSkill = 0;
    var currentEquipment = 0;
    var currentLimit = 0;
    var index = imgsrc[i].src.indexOf("skill=");
    if(index != -1)
    {
      currentSkill = getNumber(imgsrc[i].src, index+6);

      //In the transfer list the links don't have the equipment.
      index = imgsrc[i].src.indexOf("&extra=", index);
      currentEquipment = index == -1 ? 0 : getNumber(imgsrc[i].src, index+7);
      index = imgsrc[i].src.indexOf("&limit=", index);
      currentLimit = index == -1 ? 0 : getNumber(imgsrc[i].src, index+7);

      totalSkills+= currentSkill;
      totalEquipment+= currentEquipment;
      totalLimits+= currentLimit;   
      imgsrc[i].parentNode.innerHTML = imgsrc[i].parentNode.innerHTML + "  " + currentSkill;

      skills--;
      if(!skills)
      { //New player time :)
      //Create the new Bar first.
      //Example of the image source: "/data/skill_bar.php?skill=85&extra=0&limit=85"
      //Example of the final link of the bar: <td align="right">Calmness:</td> <td colspan="2"><img src="/data/skill_bar.php?skill=85&extra=0&limit=85" title="Aim: 85 (Limit: 85)" /></td></tr>

        var totalBar = "\"/data/skill_bar.php?skill=" + ((totalSkills / 10 ) | 0) + (totalEquipment == 0 ? "" : "&extra=" + ((totalEquipment / 10 ) | 0)) + (totalLimits == 0 ? "" : "&limit=" + ((totalLimits / 10 ) | 0)) + "\"";  
        insertAfter(createElem("tr", "<td align=\"right\"><b>Total: </b></td><td colspan=\"2\"><img src=" + totalBar + " title=\"Total: " + totalSkills + (totalEquipment == 0 ? "" : " + " + totalEquipment) + (totalLimits == 0 ? "" : " (Limit: " + totalLimits + ")") + "\"/>" + "  " + totalSkills +  "</td>"), imgsrc[i++].parentNode.parentNode); 
        //We just appended a new element so we have to pass it.
        //Now reset the values           
        totalSkills = 0;
        totalEquipment = 0;
        totalLimits = 0;
        skills = 10;
      }
    }
  }
}


function scriptLink()
{
  var services = document.getElementById("community_services");
  if(services)
  {
    insertAfter(createElem("li", "<a href=\"http://userscripts.org/scripts/show/29192\" title=\"Ace CSM Stats\" target=\"_blank\" id=\"ace_csm_stats\"> &bull; Ace CSM Stats</a>"), services);
  }
}




function initAceStats()
{
  scriptLink();

  if((location.search.indexOf("clan_players") != -1 && location.search.indexOf("history") == -1 && location.search.indexOf("stats") == -1)
  || (location.search.indexOf("office_transfer") != -1 && location.search.indexOf("search") == -1))
  {
    playerStats();
  }
}


if (window.addEventListener)
  window.addEventListener("load", initAceStats, false);
else if (window.attachEvent) window.attachEvent("onload", initAceStats);
else window.onload = initAceStats;



