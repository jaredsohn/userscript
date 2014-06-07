// JavaScript Document
// ==UserScript==
// @name           Ikariam Favorite Targets
// @autor          Ikariam World Beta: DLR Alliance
// @e-mail         email
// @description    Easily track favorite pillage/trade targets. Hover over any target and a link will appear to add to the 'favorites' panel in any military view.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

/**************************************************************************************************
Change log:

Outstanding Bugs/Features:
- Feature: Towns with same name cannot easily be distinguised. Plans to add player name to saved data.

Version 0.7:
- Feature: Can now move up/down targets for re-organization.

Version 0.6:
- Feature: Maximum height added to scratchpad.  Overflow now displays vertical scroll bars past 350px.

Version 0.5:
- Background of pillage counter now changes on hover, when count > 0
- Bug: Problem in Ikariam source when blockade/attack on-going. Timer(s) get mis-aligned. (fixed)
- Bug: Glass not saving correctly.

Version 0.4:
- Added support for counting pillages and saved CR data

Version 0.3:
- Modified save format to better track target data

Version 0.2:
- Added support for adding favorite from any valid "target" link

Version 0.1:
- Initial Version
**************************************************************************************************/

//GM_setValue('ikTargetData', ''); 
//window.alert(window.innerWidth);

//
// Globals
// 
var IK_TARGET_VERSION = 4;
var IK_TARGETS;
var IK_HOUR_OFFSET = getServerOffset();

//
// Load saved target data
//
LoadData();

// 
// First, draw the initial scratchpad
//
drawTargetsScratchPad();

//
// Next, update the (relavent) links for target addition
//
updateTargetLinks();

//
// Look for combat details
//
updateCombatReport();

//
// Next, draw any saved targets
//
updateTargetsScratchpad();


  
/**************************************************************************************************/

function drawTargetsScratchPad()
{
  var mainNode;
  var bodyNode = document.getElementsByTagName('body')[0];
  if (bodyNode != null)
  {
    switch (bodyNode.id)
    {
    case "militaryAdvisorReportView":
      mainNode = getNode("//div[@id='backTo']", "");
    break;
    case "militaryAdvisorCombatReports":
    case "militaryAdvisorMilitaryMovements": 
      mainNode = getNode("//div[@id='viewMilitaryImperium']", "");
    break;
    case "tradeAdvisor":
      //mainNode = getNode("//div[@id='viewCityImperium']", "");
    break;
    case "safehouse":
      //mainNode = getNode("//div[@id='buildingUpgrade']", "").nextSibling; 
    break;
    default: 
    break;
    }
  }

  if (mainNode != null)
  {
    var targetScratchPad = document.createElement('div');
    targetScratchPad.setAttribute('style', 'cursor: default;');
    targetScratchPad.setAttribute('class', 'dynamic');
    targetScratchPad.innerHTML = 
      '\n  <h3 class="header">Favorite Targets</h3>' +
      '\n    <div class="content" style="max-height: 350px; overflow: auto;">' +
      '\n      <table id="targetScratchPad" width="100%" border="0"></table>' +
//      '\n      <div class="centerButton" id="testingBox">test</div>' +
      '\n    </div>' +
      '\n  <div class="footer"></div>' +
      '\n';

    insertBefore(targetScratchPad, mainNode);

    // Bug: 
    // Problem in Ikariam source when blockade/attack on-going. Timer(s) get(s) mis-aligned if too many favorites. 
    if (bodyNode.id == "militaryAdvisorMilitaryMovements")
    {
      var test = executeQuery("//div[contains(@class, 'status')]");
      for (var i = 0; i < test.snapshotLength; i++) 
      {
        var t = test.snapshotItem(i);
        t.setAttribute('style', 'position: absolute; left: 0px;');
      }
      test = executeQuery("//div[contains(@class, 'nextEventETA')]");
      for (var i = 0; i < test.snapshotLength; i++) 
      {
        var t = test.snapshotItem(i);
        t.setAttribute('style', 'position: absolute; right: 0px;');
      }
    }
  }
}

function updateTargetsScratchpad()
{
  // Build up favorite target entries
  var targets = new Array();
  for (var t = 0; t < IK_TARGETS.length; t++)
  {
    var target = document.createElement('tr');
    var spacer1 = document.createElement('td');
    spacer1.setAttribute('width', '15');

	var moveup = document.createElement('img');
	moveup.setAttribute('class', 'favarrow');
	moveup.setAttribute('src', 'skin/layout/up-arrow.gif');
	moveup.setAttribute('alt', '');
	moveup.setAttribute('title', 'Move Up');
	moveup.setAttribute('name', IK_TARGETS[t].id);

	var movedown = document.createElement('img');
	movedown.setAttribute('class', 'favarrow');
	movedown.setAttribute('src', 'skin/layout/down-arrow.gif');
	movedown.setAttribute('alt', '');
	movedown.setAttribute('title', 'Move Down');
	movedown.setAttribute('name', IK_TARGETS[t].id);

	spacer1.appendChild(moveup);
	spacer1.appendChild(movedown);

	moveup.addEventListener('click', moveTargetHandler, false);
	movedown.addEventListener('click', moveTargetHandler, false);

    var linkColumn = document.createElement('td');
    linkColumn.innerHTML = '<a href="?view=island&cityId=' + IK_TARGETS[t].id + '">'+IK_TARGETS[t].name + '</a>';

    var hitsColumn = document.createElement('td');
    hitsColumn.setAttribute('align', 'center');
    hitsColumn.setAttribute('width', '30');
    hitsColumn.innerHTML = IK_TARGETS[t].crs.length;

    if (IK_TARGETS[t].crs.length > 0)
    {
      hitsColumn.setAttribute('style', "cursor: pointer");
      hitsColumn.setAttribute('onMouseOut', "this.style.backgroundColor = null; " +
                                            "this.firstChild.nextSibling.style.display = 'none'");
      hitsColumn.setAttribute('onMouseOver', "this.style.backgroundColor = '#deac63'; " +
                                             "updateFlyout(this.firstChild.nextSibling); " +
                                             "this.firstChild.nextSibling.style.display = 'block'");
      hitsColumn.innerHTML += 
        '<div class="tooltip2" style="z-index: 2000; position: fixed; top:250px; left:0px" align="left">' +
         '<h5>Attacks on ' + IK_TARGETS[t].name + '</h5>' +
        '</div>';
    }

    for (var cr = 0; cr < IK_TARGETS[t].crs.length; cr++)
    {
      var counterID = 'targetCount' + cr;
      var curr = new Date().getTime() / 1000;
      var reportImage = IK_TARGETS[t].crs[cr].type == "Land" 
            ? '<img src="skin/actions/plunder.gif" height="20" />' 
            : '<img src="skin/actions/blockade.gif" height="20" />';
      var entry = document.createElement('div');
      entry.setAttribute('class', 'unitBox');
      entry.innerHTML += 
        '<div class="icon" style="width:50px;">' + reportImage + '</div>' +
        '<div class="count" style="width:50px;" id="targetCounter"'+cr+' ' +
                'lang="' + IK_TARGETS[t].crs[cr].time + '"' +
                'title="' + IK_TARGETS[t].crs[cr].id + '"></div>';

      hitsColumn.childNodes[1].appendChild(entry);

      if (IK_TARGETS[t].crs[cr].type == "Land")
      {
        var wood = document.createElement('div');
        wood.setAttribute('class', 'unitBox');
        wood.setAttribute('title', 'Building Material');
        wood.innerHTML += '<div class="icon"><img src="skin/resources/icon_wood.gif" /></div>'
        wood.innerHTML += '<div class="count">' + IK_TARGETS[t].crs[cr].wood + '</div>';

        var wine = document.createElement('div');
        wine.setAttribute('class', 'unitBox');
        wine.setAttribute('title', 'Wine');
        wine.innerHTML += '<div class="icon"><img src="skin/resources/icon_wine.gif" /></div>'
        wine.innerHTML += '<div class="count">' + IK_TARGETS[t].crs[cr].wine + '</div>';

        var marble = document.createElement('div');
        marble.setAttribute('class', 'unitBox');
        marble.setAttribute('title', 'Marble');
        marble.innerHTML += '<div class="icon"><img src="skin/resources/icon_marble.gif" /></div>'
        marble.innerHTML += '<div class="count">' + IK_TARGETS[t].crs[cr].marble + '</div>';

        var glass = document.createElement('div');
        glass.setAttribute('class', 'unitBox');
        glass.setAttribute('title', 'Crystal Glass');
        glass.innerHTML += '<div class="icon"><img src="skin/resources/icon_glass.gif" /></div>'
        glass.innerHTML += '<div class="count">' + IK_TARGETS[t].crs[cr].glass + '</div>';

        var sulphur = document.createElement('div');
        sulphur.setAttribute('class', 'unitBox');
        sulphur.setAttribute('title', 'Sulphur');
        sulphur.innerHTML += '<div class="icon"><img src="skin/resources/icon_sulfur.gif" /></div>'
        sulphur.innerHTML += '<div class="count">' + IK_TARGETS[t].crs[cr].sulphur + '</div>';

        hitsColumn.childNodes[1].appendChild(wood);
        hitsColumn.childNodes[1].appendChild(wine);
        hitsColumn.childNodes[1].appendChild(marble);
        hitsColumn.childNodes[1].appendChild(glass);
        hitsColumn.childNodes[1].appendChild(sulphur);
      }

      hitsColumn.childNodes[1].appendChild(document.createElement('br'));
    }

    var removalColumn = document.createElement('td');
    removalColumn.setAttribute('align', 'right');
    removalColumn.setAttribute('width', '30');

    var removal = document.createElement('a');
    removal.setAttribute('id', IK_TARGETS[t].id);
    removal.setAttribute('name', IK_TARGETS[t].name);
    removal.innerHTML = '<span style="cursor: pointer;">' +
      '<img src="skin/img/action_back.gif" width="32" height="20" title="Remove Target" /></span>';
    removalColumn.appendChild(removal);

    target.appendChild(spacer1);
    target.appendChild(linkColumn);
    target.appendChild(hitsColumn);
    target.appendChild(removalColumn);

    targets.push(target);
    removal.addEventListener('click', removeTargetHandler, false);
  }

  // Write to table
  var scratchpad = document.getElementById("targetScratchPad");
  if (scratchpad != null)
  {
    scratchpad.innerHTML = "";
    for (var t=0; t<targets.length; t++)
    {
      scratchpad.appendChild(targets[t]);
    }
  }

  var head = document.getElementsByTagName('head');
  if (head != null)
  {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = '\nEvent.onDOMReady(function() { ';

    for (var t = 0; t < IK_TARGETS.length; t++)
    {
      for (var cr = 0; cr < IK_TARGETS[t].crs.length; cr++)
      {
        script.innerHTML +=
           '\ngetCountdown({' +
            'enddate: ' + IK_TARGETS[t].crs[cr].time + ', ' +
            'currentdate: ' + curr + ', ' +
            'el: "targetCount' + cr + '"}); \n';
      
      }
    }

    script.innerHTML += '\n})';
    head[0].appendChild(script);
  }
}

function updateTargetLinks()
{
  var head = document.getElementsByTagName('head');
  var links = document.getElementsByTagName('a');
  if (links != null && head != null)
  {
    // First, add in the new styles necessary
    var css = document.createElement('style');
    css.setAttribute('type', 'text/css');
    css.innerHTML += 'a.favorite { position:relative; } ';
    css.innerHTML += 'a.favorite span { display: none; z-index:100; } ';
    css.innerHTML += 'a.favorite:hover span { display:block; position:absolute; top:1em; left:0.2em; width:90px; } ';
    css.innerHTML += '.tooltip3 { background-color:#fdf7dd; border:1px solid #BE8D53; border-width:4px 1px 1px; line-height:1em; color:#542C0F; padding:0; }';
    css.innerHTML += '.addlink { text-decoration:none; font-size:11px; } ';
//    css.innerHTML += '.favaction { background:url(http://dlralliance.com/tools/img/favorite.gif) no-repeat top center; cursor: pointer; } ';
//    css.innerHTML += '#island #actions .favaction a { background:url(http://dlralliance.com/tools/img/favorite.gif) no-repeat top center; } ';
//    css.innerHTML += '#island #actions .favaction a:hover{background:url(http://dlralliance.com/tools/img/favorite_over.gif) no-repeat top center; } ';
	css.innerHTML += '.favarrow { height: 7px; width: 7px; padding: 0.1em; cursor: pointer;  } ';
    
    head[0].appendChild(css);

    // Find unique targets
    for (i = 0; i < links.length; i++) 
    {
      var addlink = makeTargetLink(links[i]);
      if (addlink != null)
      {
        // Adjust the link html for favorite
        links[i].setAttribute('class', 'favorite');
        var span = document.createElement('span');
        span.setAttribute('class', 'tooltip3');
        span.setAttribute('style', 'left:1em; margin: auto;');
        span.appendChild(addlink);
        insertBefore(span,links[i].childNodes[0]);
      }
    }
  }

  /* NOT WORKING
  // Next, if an island view, add the action button for each town not on favorite list
  var island = document.getElementById('island');
  if (island != null)
  {
    var cityActions = executeQuery("//ul[contains(@class, 'cityactions')]");
    for (var i = 0; i < cityActions.snapshotLength; i++) 
    {
      var actions = cityActions.snapshotItem(i);
      if (actions.parentNode.id.indexOf('cityLocation') != -1)
      {
        // First, need to find the city id
        var id;
        var links = actions.getElementsByTagName('a');
        for (var j = 0; j < links.length; j++) 
        {
          if (links[j].href.indexOf('destinationCityId=') != -1)
          {
            id = links[j].href.substr(links[j].href.indexOf('destinationCityId=') + 18);
            id = id.substr(0, id.indexOf('&'));
            name = "test";
            break;
          }
        }

        // Now create the HTML
        if (id != "" && !TargetSaved(id, name))
        {  
          var li = document.createElement('li');
          li.setAttribute('class', 'favaction');
          var link = document.createElement('a');
          link.setAttribute('id', id);
          link.setAttribute('name', name);
          link.setAttribute('onclick', 'this.parentNode.style.display = "none"; return false');
          link.innerHTML = '<span class="textLabel">Add to favorites</span>';
          link.addEventListener('click', addTargetHandler, false);
          li.appendChild(link);
          actions.appendChild(li);
        }
      }
    }
  }*/
}

function updateCombatReport()
{
  var mainNode = getNode("//body[@id='militaryAdvisorReportView']", "");
  if (mainNode != null)
  {
    var type = "", id = -1, target = -1, time = "";

    var links = mainNode.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++)
    {
      if (links[i].href.indexOf('detailedCombatId=') != -1)
      {
        id = links[i].href.substr(links[i].href.indexOf('detailedCombatId=') + 17);
        break;
      }
    }

    if (id != -1)
    {
      // Look for the target ID
      var battleNode = getNode("//td[@class='battle']", "");
      if (battleNode != null)
      {
        DebugAssert(battleNode.childNodes.length == 5, "battleNode");
        type = battleNode.childNodes[2].nodeValue.indexOf("Battle for") != -1 ? "Land" : "Sea";
        target = getTargetID(battleNode.childNodes[3].href);
        time = getDate(battleNode.childNodes[4].nodeValue.replace('(','').replace(')','').replace(/^\s+|\s+$/g,""), true).getTime() / 1000;
      }

      if (type != "" && target != -1 && time != "")
      {
        var report = new IKCombatReport(type, target, id, time);

        var battleDetail = document.getElementById('battleReportDetail')
        if (battleDetail != null)
        {
          var lists = battleDetail.getElementsByTagName('ul');
          for (var i = 0; i < lists.length; i++)
          {
            if (lists[i].className == "resources")
            {
              var resources = lists[i].getElementsByTagName('li');
              for (var j = 0; j < resources.length; j++)
              {
                switch (resources[j].className)
                {
                case "wood":
                  report.wood = resources[j].childNodes[0].nextSibling.nodeValue;
                break;
                case "wine":
                  report.wine = resources[j].childNodes[0].nextSibling.nodeValue;
                break;
                case "marble":
                  report.marble = resources[j].childNodes[0].nextSibling.nodeValue;
                break;
                case "glass":
                  report.glass = resources[j].childNodes[0].nextSibling.nodeValue;
                break;
                case "sulfur":
                  report.sulphur = resources[j].childNodes[0].nextSibling.nodeValue;
                break;
                default:
                break;
                }
              }
              break;
            }
          }
        }

        InsertCombatReport(report);
      }
    }
  }
}

function getTargetID(href)
{
  if (href.indexOf('selectCity=') != -1)
  {
    return href.substr(href.indexOf('selectCity=') + 11);
  }
  return -1;
}

function getDate(str, add)
{
  // Format should be:
  // DD.MM.YYYY HH:mm:ss
  var day = str.split(' ')[0].split('.');
  var time = str.split(' ')[1].split(':');

  var d = new Date(
    parseInt(day[2]),
    parseInt(day[1]) - 1,
    parseInt(day[0]),
    parseInt(time[0]),
    parseInt(time[1]),
    parseInt(time[2]),
    0);
  if (add) {
    d.setTime(d.getTime() + 1000 * 60 * 60 * ( 24 - IK_HOUR_OFFSET ));
  }
  return d;
}

function makeTargetLink(target)
{
  if (isCityLink(target))
  {
    var id = "", name = "";
    if (target.href.indexOf('cityId=') != -1 && target.href.indexOf('view=island') != -1)
    {
      id = target.href.substr(target.href.indexOf('cityId=') + 7);
      name = target.innerHTML;
    }
    else
    if (target.href.indexOf('selectCity=') != -1)
    {
      id = target.href.substr(target.href.indexOf('selectCity=') + 11);
      name = target.innerHTML;
    }
    else
    if (target.href.indexOf('view=city&id=') != -1 && target.innerHTML.indexOf("(") != -1)
    {
      id = target.href.substr(target.href.indexOf('view=city&id=') + 13);
      name = target.innerHTML.substr(0, target.innerHTML.indexOf("("));
    }

    if (id != "" && !TargetSaved(id, name))
    {  
      var link = document.createElement('a');
      link.setAttribute('id', id);
      link.setAttribute('name', name);
      link.setAttribute('onclick', 'this.parentNode.style.display = "none"; return false');
      link.setAttribute('class', 'addlink');
      link.innerHTML = 'Add to Favorites';
      link.addEventListener('click', addTargetHandler, false);
      return link;
    }
  }
  return null;
}

function isCityLink(link)
{
  return (link != null) && (link.href.indexOf("#") == -1)
    && (link.title == ""  || link.title.indexOf("Inspect the selected town") == -1);
}

/*************************************************************************************************
 * HTML Handlers (Events)
 *************************************************************************************************/

function addTargetHandler()
{
  if (!TargetSaved(this.id, this.name))
  {  
    // Load any new data, since this page was opened
    LoadData();

    // Insert new target
    IK_TARGETS.push(new IKTarget(this.id, this.name));
    
    // Save it for later
    SaveData();

    // Update the scratchpad
    updateTargetsScratchpad();
  }
}

function removeTargetHandler()
{
  RemoveTarget(this.id);
}

function moveTargetHandler()
{
  // Load any new data, since this page was opened
  LoadData();

  for (var i = 0; i < IK_TARGETS.length; i++)
  {
    if (IK_TARGETS[i].id == this.name)
    {
      if (this.title == 'Move Up' && i != 0)
      {
        var temp = IK_TARGETS[i];
        IK_TARGETS[i] = IK_TARGETS[i-1];
        IK_TARGETS[i-1] = temp;
      }
      else
      if (this.title == 'Move Down' && i != IK_TARGETS.length - 1)
      {
        var temp = IK_TARGETS[i];
        IK_TARGETS[i] = IK_TARGETS[i+1];
        IK_TARGETS[i+1] = temp;
      }

      // Save it away
      SaveData();

      // Update the scratchpad
      updateTargetsScratchpad();

      break;
    }
  } 
}

/*************************************************************************************************
 * Ikariam Target FUNCTIONS
 *************************************************************************************************/

function LoadData()
{
  IK_TARGETS = new Array();

  // RawData Format (v0.3):
  // VERSION::ID,NAME;CR0-CR1-...::ID,NAME;CR0-CR1...
  var rawData;
  var data = GM_getValue('ikTargetData');
  if (data != null)
  {
    rawData = data.split('::');
  
    if (rawData.length > 0)
    {
      //window.alert(data);
      var version = rawData[0];

      if (version <= 4)
      {
        for (var i = 1; i < rawData.length; i++)
        {
          try
          {
            var targetData = rawData[i].split(';');
            DebugAssert(targetData.length == 2, "TargetData Length Invalid");

            var targetDetails = targetData[0].split(',');
            DebugAssert(targetDetails.length == 2, "TargetDetails Length Invalid");

            var target = new IKTarget(targetDetails[0], targetDetails[1]);
  
            // CombatReport Format (v0.3+):
            // TYPE_TARGETID_ID_TIME_WOOD_WINE_MARBLE_CRYSTAL_SULPHUR
            var crs = targetData[1].split('-');
            for (var j = 0; j < crs.length; j++)
            {
              if (crs[j] != '')
              {
                var crDetails = crs[j].split('_');
                DebugAssert(crDetails.length == 9, "CombatReportDetails Length Invalid");

                var cr = new IKCombatReport(crDetails[0], crDetails[1], crDetails[2], crDetails[3]);
                cr.wood = crDetails[4];
                cr.wine = crDetails[5];
                cr.marble = crDetails[6];
                cr.glass = crDetails[7];
                cr.sulphur = crDetails[8];

                target.crs.push(cr);
              }
            }

            IK_TARGETS.push(target);
          }
          catch(err)
          {
            window.alert(err);
          }
        }
      }
    }
  }
}

function SaveData()
{
  var rawData = "";

  if (IK_TARGETS != null && IK_TARGETS.length > 0)
  {
    // RawData Format (v0.3+):
    // VERSION::ID,NAME;CR0-CR1,...::ID,NAME;CR0-CR1...

    if (IK_TARGET_VERSION <= 4)
    {
      // First, save the version format
      rawData += IK_TARGET_VERSION;
      rawData += "::";

      // Next, iterate through each target, and save all data
      for (var i = 0; i < IK_TARGETS.length; i++)
      {
        // Save the id and name, separated by comma
        rawData += IK_TARGETS[i].id;
        rawData += ',';
        rawData += IK_TARGETS[i].name;
        rawData += ';';

        // Finally, the individual combat reports
        for (var j = 0; j < IK_TARGETS[i].crs.length; j++)
        {
          // CombatReport Format (v0.3+):
          // TYPE_TARGETID_ID_TIME_WOOD_WINE_MARBLE_CRYSTAL_SULPHUR

          rawData += IK_TARGETS[i].crs[j].type + '_';
          rawData += IK_TARGETS[i].crs[j].target + '_';
          rawData += IK_TARGETS[i].crs[j].id + '_';
          rawData += IK_TARGETS[i].crs[j].time + '_';
          rawData += IK_TARGETS[i].crs[j].wood + '_';
          rawData += IK_TARGETS[i].crs[j].wine + '_';
          rawData += IK_TARGETS[i].crs[j].marble + '_';
          rawData += IK_TARGETS[i].crs[j].glass + '_';
          rawData += IK_TARGETS[i].crs[j].sulphur;

          rawData += j < IK_TARGETS[i].crs.length - 1 ? '-': '';
        }

        // Separate target data with double-colon
        rawData += i < IK_TARGETS.length - 1 ? '::': '';
      }
    }
  }

  // Save the data
  GM_setValue('ikTargetData', rawData);
}

function IKTarget(id, name)
{
  this.id = id;
  this.name = name;
  this.crs = new Array();
}

function IKCombatReport(type, target, id, time)
{
  this.type = type;
  this.target = target;
  this.id = id;
  this.time = time;
  this.wood = 0;
  this.wine = 0;
  this.marble = 0;
  this.glass = 0;
  this.sulphur = 0;
}

function TargetSaved(id, name)
{
  for (var i = 0; i < IK_TARGETS.length; i++)
  {
    if (IK_TARGETS[i].id == id)
      return true;
  }

  return false;
}

function InsertCombatReport(cr)
{
  for (var i = 0; i < IK_TARGETS.length; i++)
  {
    if (IK_TARGETS[i].id == cr.target)
    {
      for (var j = 0; j < IK_TARGETS[i].crs.length; j++)
      {
        if (IK_TARGETS[i].crs[j].id == cr.id)
        {
          IK_TARGETS[i].crs[j] = cr; SaveData(); updateTargetsScratchpad();
          return;
        }
      }

      IK_TARGETS[i].crs.push(cr); SaveData(); updateTargetsScratchpad();
      return;
    }
  }
}

function RemoveTarget(id)
{
  var j = 0;
  var tempTargets = new Array();

  for (var i = 0; i < IK_TARGETS.length; i++) 
  {
    if (IK_TARGETS[i].id != id) {
      tempTargets[j++] = IK_TARGETS[i];
    }
  }

  // Clear old data
  GM_setValue('ikTargetData', ''); 
  IK_TARGETS = tempTargets;

  // Save it for later
  SaveData();

  // Update the scratchpad
  updateTargetsScratchpad();
}

function RemoveCombatReport(id)
{
  for (var i = 0; i < IK_TARGETS.length; i++) 
  {
    var k = 0;
    var tempReports = new Array();

    for (var j = 0; j < IK_TARGETS[i].crs.length; j++) 
    {
      if (IK_TARGETS[i].crs[j].id != id) {
        tempReports[k++] = IK_TARGETS[i].crs[j];
      }
    }

    IK_TARGETS[i].crs = tempReports;
  }

  // Clear old data
  GM_setValue('ikTargetData', ''); 

  // Save it for later
  SaveData();

  // Update the scratchpad
  updateTargetsScratchpad();
}

/*************************************************************************************************
 * UTILITY FUNCTIONS
 *************************************************************************************************/

function getNode(path) {
  var value = executeQuery(path);
  if (value.snapshotLength == 1) {
    return value.snapshotItem(0);
  }
  return null;
}

function executeQuery(query) {
  return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function insertAfter(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

function insertBefore(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode);
}

function DebugAssert(condition, exception) {
  if (!condition)
    throw exception;
}

function twodigit(val) {
  if(val < 10) {
    return "0"+val;
  }
  return val;
}


/*************************************************************************************************/
var head = document.getElementsByTagName('head');
if (head != null)
{
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.innerHTML += 
//	'var tempX = 0; \n' +
//	'var tempY = 0; \n' +
//	'document.addEventListener("mousemove", onMouseMoveEvent, false); \n' +
//	'function onMouseMoveEvent(e) \n' +
//	'{ \n' +
//	'  tempX = e.pageX; \n' +
//	'  tempY = e.pageY; \n' +
//	'  if (tempX < 0) { tempX = 0; } \n' +
//	'  if (tempY < 0) { tempY = 0; } \n' +
//	'  var left = 0; \n' +
//	'  left += (window.innerWidth > 1100) ? window.innerWidth - 1100 : 0; \n' +
//	'  left += 225; \n' +
//	'  document.getElementById("testingBox").innerHTML = tempX + ":" + tempY + "<br>"; \n' +
//	'  document.getElementById("testingBox").innerHTML += window.innerWidth + ":" + left; \n' +
//	'  return true; \n' +
//	'}' +
	'function updateFlyout(fly) \n' +
	'{ \n' +
	'  var left = 0; \n' +
	'  left += (window.innerWidth > 996) ? (window.innerWidth - 996) / 2 : 0; \n' +
	'  left += 191; \n' +
	"  fly.style.left = left + 'px'; \n" +
	'}';
	head[0].appendChild(script);
}

function getServerOffset()
{
  var span = document.getElementById('servertime');
  if (span != null)
  {
    var server = getDate(span.innerHTML, false).getTime();
    var current = new Date().getTime();
    //window.alert("S: " + server + " C: " + current);
    return Math.round((server - current) / (1000*60*60));
  }
  return null;
}

timeCounter();
window.setInterval(timeCounter, 1000);
window.setTimeout(timeCounter, 1000);
function timeCounter() 
{
  var current = new Date().getTime();
  var ctrs = executeQuery("//div[contains(@id, 'targetCounter')]");

  for (var i = 0; i < ctrs.snapshotLength; i++) 
  {
    var ctr = ctrs.snapshotItem(i);
    var abstime = Math.round(ctr.lang) * 1000;
    hdata = (abstime - current) / 1000;
    if (hdata > 0) 
    {
      var hday = Math.floor(hdata / 86400);
      var hhor = Math.floor((hdata - (hday * 86400)) / 3600);
      var hmin = Math.floor((hdata - (hday * 86400) - (hhor * 3600)) / 60);
      var hsec = Math.floor(hdata - (hday * 86400) - (hhor * 3600) - (hmin * 60));
      var s = "";
      var b = false;
      if (b || hday > 0) { s += hday+"d "; b = true; }
      b = true; 
      if (b || hhor > 0) { s += hhor+":"; b = true; }
      if (b || hmin > 0) { s += twodigit(hmin)+":"; b = true; }
      if (b || hsec > 0) { s += twodigit(hsec)+""; b = true; }
      ctr.innerHTML = s;
    } 
    else 
    {
      RemoveCombatReport(ctr.title);
    }
  }
}
