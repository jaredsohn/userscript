// ==UserScript==
// @name          DS Extensions Autobuild
// @namespace     http://gambrinus.beeven.de/ds/greasemonkey
// @description   Script to automate building
// @description   Builds everything automatically
// @include       http://de*.die-staemme.de/*
// ==/UserScript==
//

LVL_MAIN = 20;
LVL_WALL = 20;
LVL_SMITH = 20;
LVL_BARRACKS = 25;
LVL_STABLE=20;
LVL_SMITH = 20;
LVL_GARAGE = 9;
LVL_FARM = 30;
LVL_MARKET = 20;

TYPE_WALL = 1;
TYPE_NORMAL = 0;

BUILDING_TYPE = TYPE_NORMAL;

time_refresh_ = 60*5;
BUILDING_POSSIBLE = 1;
BUILDING_NOT_POSSIBLE_POPULATION_MISSING = 0;
BUILDING_NOT_POSSIBLE = 3;
BUILDING_NOT_POSSIBLE_RESS_MISSING = 2;
BUILDING_NOT_POSSIBLE_PRECONDITIONS_NOT_MET = -1;

villages_ = new Array();



window.xpath = function(query)
{
  return document.evaluate(query,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
}

//
// Gives us parameter in url by name.
// @param name Name of the parameter
// @return parameter Parameter or empty string if none found.
//
window.getUrlParameter = function(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec(window.location.href);
  if( results == null )
    return "";
  else
    return results[1];
}

window.getScreen = function()
{
  return getUrlParameter('screen');
}

window.refreshPage = function()
{
  time_refresh_rand_ = Math.round(Math.random()*(time_refresh_-1));
  //alert("Refresh seconds randomized: " + time_refresh_rand_);
  //alert("Refresh seconds given: " + time_refresh_);
  if(time_refresh_rand_ <= time_refresh_*0.5)
    setTimeout(function(){document.location.reload();} , time_refresh_*1000);
  else
    setTimeout(function(){document.location.reload();} , time_refresh_rand_*1000);
}

window.updateRefreshInterval = function()
{
  // next att is coming more and more close
  // p.e. if time_refresh_ is 5min, then the interval will be 1 min until 60 are left and so on...
  if(diff < time_refresh_*2)
  {
    if(diff < 5)
      attack(ind);
    // 10 seconds left
    if(diff < 10)
      time_refresh_ = 2; // 2 sec
    // 1 min left
    else if(diff < 60)
      time_refresh_ = 10; // 10 sec
    // more time 'til next scheduled att
    else
      time_refresh_ = 60; // 60 sec
  }
}

window.getLevel = function(building)
{
  all_links = xpath("//a");
  linkx = 0;
  lvl = 0;
  found = false;
  for(i=(all_links.snapshotLength-1); i>0; i--)
  {
    linkx = all_links.snapshotItem(i);
    if(linkx.getAttribute('href').match('id='+building) && linkx.getAttribute('href').match('action=build'))
    {
      found = true;
      break;
    }
  }
  if(found)
  {
//    GM_log(building);
    if(linkx.firstChild)
    {
      txt = linkx.firstChild.data;
      if(txt.match('Stufe'))
        lvl = parseInt(txt.split('Stufe ')[1])-1;
    }
    else
      return BUILDING_NOT_POSSIBLE_PRECONDITIONS_NOT_MET;
  }
  return(lvl);
}

window.isBuildingPossible = function(building)
{
  all_links = xpath("//a");
  linkx = 0;
  found = false;
  // Search for link - if available: Building is possible;
  for(i=(all_links.snapshotLength-1); i>0; i--)
  {
    linkx = all_links.snapshotItem(i);
    if(linkx.getAttribute('href').match('screen='+building))
    {
      found = true;
      break;
    }
  }
  if(!found)
  {
    return BUILDING_NOT_POSSIBLE;
/*    alert (linkx + " " + building);
    txt = linkx.parentNode.parentNode.lastChild.previousSibling.firstChild;
    if(txt.nodeType == 3)
    {
      if(txt.data.match('Rohstoffe'))
        return BUILDING_NOT_POSSIBLE_RESS_MISSING;
      else
        return BUILDING_NOT_POSSIBLE_POPULATION_MISSING;
    }*/
  }
  return BUILDING_POSSIBLE;
}

window.getFreeFarmPopulation = function()
{
  all_links = xpath("//a");
  linkx = 0;
  for(i=0; i<all_links.snapshotLength; i++)
  {
    linkx = all_links.snapshotItem(i);
    if(linkx.getAttribute('href').match('screen=farm'))
    {
      break;
    }
  }
  txt = linkx.parentNode.nextSibling.nextSibling.firstChild.data;
  pop = txt.split('/');
  return(pop[1]-pop[0]);
}

window.build = function(building, b_max_lvl)
{
  //GM_log('trying to build ' + building);
  build_poss = isBuildingPossible(building);
  if(build_poss == BUILDING_NOT_POSSIBLE_RESS_MISSING || build_poss == BUILDING_NOT_POSSIBLE)
    return 0;
  if(build_poss == BUILDING_NOT_POSSIBLE_POPULATION_MISSING)
  {
    if(getLevel('farm') == 30)
      return 0;
    else
    {
      buildFarm();
      return 0;
    }
  }
  lvl = getLevel(building);
  if(lvl == BUILDING_NOT_POSSIBLE_PRECONDITIONS_NOT_MET)
    return 0;
  if(lvl >= b_max_lvl)
    return 0;
  all_links = xpath("//a");
  linkx = 0;
  found = false;
  for(i=0; i<all_links.snapshotLength; i++)
  {
    linkx = all_links.snapshotItem(i);
    if(linkx.getAttribute('href').match('id='+building) && linkx.getAttribute('href').match('build'))
    {
      found = true;
      break;
    }
  }
  if(found)
  {
    GM_log("Building " + building + "...");
    window.location.href = linkx;
    return true;
  }
  else
  {
    GM_log("Building " + building + " not possible.");
    return 0;
  }
  return false;
}

window.buildFarm = function()
{
  if((getLevel('farm') == 30) || (!isBuildingPossible('farm')))
    return 0;
  all_links = xpath("//a");
  linkx = 0;
  found = false;
  for(i=0; i<all_links.snapshotLength; i++)
  {
    linkx = all_links.snapshotItem(i);
    if(linkx.getAttribute('href').match('id=farm') && linkx.getAttribute('href').match('build'))
    {
      found = true;
      break;
    }
  }
  if(found)
  {
    GM_log("Population problem: Building farm...");
    window.location.href = linkx;
    return 1;
  }
  else
  {
    GM_log("Population problem: Building farm not possible.");
    return 0;
  }
  return;
}

window.buildMine = function(full)
{
  l_wood = getLevel('wood');
  l_stone = getLevel('stone');
  l_iron = getLevel('iron');
  b = 0;
  if(!full)
  {
    if((l_wood+l_stone+l_iron) == 90)
      return false;
    if(l_wood < (l_stone-4))
      b = build('wood', 30);
    else if(l_iron < (l_stone-7))
      b = build('iron', 30);
    else if(l_stone < 30)
      b = build('stone', 30);
  }
  else
  {
    if(l_wood < 30)
      b = build('wood', 30);
    else if (l_iron < 30)
      b = build('iron', 30);
    else
      b = build('stone', 30);
  }
  return b;
}

window.alreadyBuilding = function()
{
  now_built = xpath("//tr[@class='sortable_row nowrap']");
  if(now_built.snapshotLength >=4)
    return true;
  return false;
/*  {
    if(now_built.snapshotItem(0).parentNode.getElementsByTagName('tr').length >= 6)
      return true;
    return false;
  }
  return false;*/
}

window.buildNormalOrder = function()
{
  if(!build('main', LVL_MAIN) && !build('storage', 22))
  {
    //GM_log('build normal \'!main\'');
    if(!buildMine(0))
    {
      //GM_log('build normal \'!mine - 0\'');
      if(!getLevel('barracks'))
        build('barracks', 1);
      if(!build('wall', LVL_WALL))
      {
       //GM_log('build normal \'!wall\'');
        if(getLevel('smith') < 5)
          build('smith', 5);
        if(!build('barracks', LVL_BARRACKS))
        {
          //GM_log('build normal \'!barracks\'');
          if(!build('stable', LVL_STABLE))
          {
            //GM_log('build normal \'!stable\'');
            if(!buildMine(1))
            {
              //GM_log('build normal \'!stable\'');
              if(!build('smith',15))
              {
                //GM_log('build normal \'!smith\'');
                if(!build('garage', LVL_GARAGE))
                {
                   //GM_log('build normal \'!garage\'');
                   if(!build('farm', LVL_FARM))
                   {
                     //GM_log('build normal \'!farm\'');
                     if(!build('market', LVL_MARKET))
                     {
                       GM_log('build normal failed');
                       return false;
                     }
                   }
                }
              }
            }
          }
        }
      }
    }
  }
  return true;
}

window.buildRandom = function()
{
  all_links = xpath("//a");
  linkx = 0;
  idx = new Array();
  for(i=0; i<all_links.snapshotLength; i++)
  {
    linkx = all_links.snapshotItem(i);
    if(linkx.getAttribute('href').match('action=build') && !linkx.getAttribute('href').match('id=main')
                                                        && !linkx.getAttribute('href').match('id=hide')
                                                        && !linkx.getAttribute('href').match('id=garage')
                                                        && !linkx.getAttribute('href').match('id=market'))
      idx.push(i);
  }
  if(idx.length == 0)
    return false;
  rand_idx = Math.floor(Math.random() * idx.length);
  if(idx.length == 1)
  {
    GM_log('building random building: ' + all_links.snapshotItem(idx[0]));
    window.location.href = all_links.snapshotItem(idx[0]);
    return true;
  }
  GM_log('building random building: ' + all_links.snapshotItem(idx[rand_idx]));
  window.location.href = all_links.snapshotItem(idx[rand_idx]);
  return true;
}

window.isBuildingVillage = function()
{
  for(i=0; i<villages_.length; i++)
  {
    if(villages_[i] == getUrlParameter('village'))
      return true;
  }
  return false;
}

window.switchVillage = function()
{
  gr = xpath("//a[@class='village_switch_link']");
  if(gr.snapshotLength > 0)
    window.location = "http://" + window.location.host + "/" +  gr.snapshotItem(1).getAttribute('href');
}


// MAIN
/* if(!isBuildingVillage())
{
  GM_log('Building is not in list.');
  return;
} */
scr = getScreen();
if(scr == 'main')
{
  if(BUILDING_TYPE == TYPE_NORMAL)
  {
    if(alreadyBuilding())
    {
      GM_log('Building in progress...');
      switchVillage();
      return;
    }
    var build_normal = buildNormalOrder();
    if(!build_normal)
    {
      var build_rand = buildRandom();
      if(build_rand)
        GM_log("building random");
      else
        GM_log("building random not possible");
    }
    if(!build_normal && !build_rand)
      switchVillage();
  }
  else
  {
    build('wall', 20);
  }
}

