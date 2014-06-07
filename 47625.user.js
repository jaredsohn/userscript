// ==UserScript==
// @name           Hammerfall RPG Helper
// @namespace      http://hammerfallhelper.dustywilson.com
// @include        http://apps.facebook.com/hammerfall/*
// ==/UserScript==

// THIS CODE IS LICENSED GPL.  Copyright 2009 Dusty Wilson, http://www.dustywilson.com/

try
{
  var version = 33;
  var updateUrl = 'http://userscripts.org/scripts/source/47625.user.js';
  var timeLoaded = (new Date()).getTime();

  var failReload = setTimeout('document.location.href=document.location.href', 30000); // 30 secs

  document.getElementsByTagName('body')[0].style.backgroundColor = '#CCC';

  var correctLocation = 0;
  var delayDone = 0;
  var recharging = 1;
  var ur = GM_getValue('ur') || Math.floor(Math.random() * 99999999).toString(32);
  GM_setValue('ur', String(ur));
  var attribs = new Object();
  attribs.staminaInterval = 300; // in seconds
  attribs.staminaIncrement = (GM_getValue('incr/stamina') || 1); // 2
  attribs.healthInterval = 180; // in seconds
  attribs.healthIncrement = (GM_getValue('incr/health') || 1); // 12
  attribs.energyInterval = 120; // in seconds
  attribs.energyIncrement = (GM_getValue('incr/energy') || 1); // 12
  attribs.guildMax = 0;
  attribs.guildCount = 0;
  attribs.guildEffective = 0;
  var flashDelaySeconds = 300;
  var flashDelayDiv;
  var jobReq = new Object();
  var invInfo = new Object();
  var autoPlay = new Array();
  var sayFade = new Array();
  var monstersHere = new Object();
  var isAttack = 0;

  var initInfo = new Array();
  var info = document.createElement('div');
  info.id = 'GM-INFOBOX';
  info.style.zIndex = '99999999';
  info.style.position = 'fixed';
  //info.style.overflow = 'auto';
  //info.style.height = '50px';
  info.style.height = 'auto';
  info.style.width = '600px';
  info.style.bottom = '0';
  info.style.left = '50%';
  info.style.margin = '0 0 0 -300px';
  info.style.padding = '0';
  info.style.color = '#FFFFFF';
  info.style.backgroundColor = '#172C40';
  info.style.textAlign = 'left';
  var infoTitle = document.createElement('div');
  infoTitle.innerHTML = '<a style="color: #FFFFFF; text-decoration: underline" href="http://userscripts.org/scripts/show/47625" target="hfrpgsite">Hammerfall RPG Helper</a>';
  infoTitle.style.backgroundColor = '#3b5998';
  infoTitle.style.margin = '0 0 3px 0';
  infoTitle.style.padding = '2px 5px';
  infoTitle.style.fontSize = '80%';
  info.appendChild(infoTitle);
  //initInfo.push(say("<b>[ LOADING ]</b>", 1));
  document.getElementsByTagName('body')[0].appendChild(info);

  var $J;
  var GM_JQ = document.createElement('script');
  GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';
  GM_JQ.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(GM_JQ);
  function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined')
    {
      window.setTimeout(GM_wait, 100);
    }
    else
    {
      $J = unsafeWindow.jQuery.noConflict();
      //initInfo.push(say("<b>[ READY ]</b>", 1));
      setTimeout(initInfoWipe, 500);
      ready();
    }
  }
  GM_wait();

  function initInfoWipe()
  {
    try
    {
      if (initInfo.length)
      {
        var obj = initInfo.shift();
        $J(obj).fadeOut(500, function() {
          $J(this).remove();
        });
        if (initInfo.length)
        {
          setTimeout(initInfoWipe, 1);
        }
      }
    }
    catch(e)
    {
      say(e);
    }
  }

  // All your GM code must be inside this function
  function ready()
  {
    try
    {
      clearTimeout(failReload);

      // create the sidebarLeft background container
      var sidebarLeftBgContainer = document.createElement('div');
      sidebarLeftBgContainer.style.margin = '0';
      sidebarLeftBgContainer.style.position = 'fixed';
      sidebarLeftBgContainer.style.width = '166px';
      sidebarLeftBgContainer.style.top = '0';
      sidebarLeftBgContainer.style.left = '0';
      sidebarLeftBgContainer.style.height = '100%';
      sidebarLeftBgContainer.style.zIndex = '1';
      sidebarLeftBgContainer.style.backgroundColor = '#000000';
      sidebarLeftBgContainer.style.opacity = '0.8';
      document.getElementsByTagName('body')[0].appendChild(sidebarLeftBgContainer);
      $J(sidebarLeftBgContainer).append('&nbsp;');

      // create the sidebarRight background container
      var sidebarRightBgContainer = document.createElement('div');
      sidebarRightBgContainer.style.margin = '0';
      sidebarRightBgContainer.style.position = 'fixed';
      sidebarRightBgContainer.style.width = '166px';
      sidebarRightBgContainer.style.top = '0';
      sidebarRightBgContainer.style.right = '0';
      sidebarRightBgContainer.style.height = '100%';
      sidebarRightBgContainer.style.zIndex = '1';
      sidebarRightBgContainer.style.backgroundColor = '#000000';
      sidebarRightBgContainer.style.opacity = '0.8';
      document.getElementsByTagName('body')[0].appendChild(sidebarRightBgContainer);
      $J(sidebarRightBgContainer).append('&nbsp;');

      if ($J('title').text().match('Error loading'))
      {
        var reloadTime = Math.ceil(Math.random() * 17) + 3;
        say("Error loading Hammerfall.  Reloading in " + reloadTime + " seconds.", 9);
        setTimeout("window.location.href=window.location.href", 1000 * reloadTime);
        return false;
      }

      setInterval(sayFadeWipe, 1000);

      autoPlay = autoPlay.concat((GM_getValue('autoplay/once') || '').split(','), (GM_getValue('autoplay/repeat') || '').split(','));

      var location = '';
      var locationLabel = $J('b:contains("Location:")');
      if (locationLabel && locationLabel.length)
      {
        var locationLabelNode = locationLabel[0];
        var locationContainer = locationLabelNode.parentNode;
        var locationContent = $J(locationContainer).text();
        location = locationContent.replace('Location: ', '');
      }
      //if (location)
      //{
      //  var locationHfwiki = location.replace(/\s+/g, '-').toLowerCase();
      //  say('Location: <b><i><a style="color: #BBBBFF; text-decoration: underline" target="hfwiki" href="http://hfwiki.wikidot.com/location:' + locationHfwiki + '">' + location + '</a></i></b>', 1);
      //}
      //else
      //{
      //  say('[ <b><i>Location Unknown</i></b> ]', 1);
      //}
      if (!location)
      {
        var reloadTime = Math.ceil(Math.random() * 60) + 30;
        say('<b style="color: lime"><i>Automatically going to QUESTS screen in ' + reloadTime + ' seconds.</i></b>', 9);
        setTimeout('document.location.href="/hammerfall/quest"', 1000 * reloadTime); // 30 secs
      }

      // Detect gained items (from quests/battles/etc)
      var flashGains = $J('div[class="flash"] img ~ br');
      if (flashGains && flashGains.length)
      {
        for (var i=0; i<flashGains.length; i++)
        {
          var container = flashGains[i].parentNode;
          var itemName = container.innerHTML;
          itemName = itemName.replace(/<.*/g, '');
          itemName = itemName.replace(/^\s+/g, '');
          itemName = itemName.replace(/\s+$/g, '');
          var gotQty = 1;
          var gotQtyAry = $J(container.parentNode.parentNode.parentNode).text().match(/(received|dropped)\s+([0-9]+)/);
          if (gotQtyAry && gotQtyAry.length) gotQty = parseInt(gotQtyAry[2]);
          GM_setValue('inv/' + itemName + '/qty', parseInt(GM_getValue('inv/' + itemName + '/qty') || '0') + gotQty);
          var itemHfwiki = itemName.replace(/\s+/g, '-').toLowerCase();
          say('You gained ' + gotQty + ' and now have ' + GM_getValue('inv/' + itemName + '/qty') + 'x <a style="color: #BBBBFF; text-decoration: underline" target="hfwiki" href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '">' + itemName + '</a>.', 1);
        }
      }

      //autoPlay.push(808); // Go Fishing @ South Sea to Leafy Forest
      //autoPlay.push(520); // Coyote @ Leafy Forest Beach
      //autoPlay.push(814); // Trader @ East Leafy Forest 1
      //autoPlay.push(523); // Vikram @ Chandabrook Bridge
      //autoPlay.push(931); // Search for an Oasis @ Crossing the Desert 1
      //autoPlay.push(932); // Relax at the Oasis @ Crossing the Desert 1
      //autoPlay.push(529); // Brown Back Auroch @ Crossing the Desert 2
      //autoPlay.push(933); // Search for Precious Metals @ Crossing the Desert 2
      //autoPlay.push(522); // Desert Wolf @ Crossing the Desert 2
      //autoPlay.push(935); // Shieldsmith @ Avgard
      //autoPlay.push(934); // Swordsmith @ Avgard
      //autoPlay.push(614); // Head North into Lindellin Forest @ Avgard

      //var chance = Math.ceil(Math.random() * 4); // 1/3 chance
      //autoPlay.push(chance == 1 ? 522 : (chance == 2 ? 933 : 529)); // 1/4 for 522, 1/4 for 933, 2/4 for 529

      //var chance = Math.ceil(Math.random() * 2); // 1/2 chance
      //autoPlay.push(chance == 1 ? 935 : 934); // 1/2 for 935, 1/2 for 934

      //if (0) // to auto-farm for Spiked Shield/Tempest Blade in Avgard
      //{
      //  var items = Array('Iron Ore', 'Steel Ore', 'Black Crystal', 'Orihalcon Ore', 'Mithril Ore', 'Spiked Shield', 'Tempest Blade');
      //  for (var i in items)
      //  {
      //    var item = items[i];
      //    say('You have ' + (GM_getValue('inv/' + item + '/qty') || 0) + 'x ' + item + '.');
      //  }
      //
      //  var oreMin = 6;
      //  if (parseInt(GM_getValue('inv/Iron Ore/qty')) >= oreMin && parseInt(GM_getValue('inv/Steel Ore/qty')) >= oreMin && parseInt(GM_getValue('inv/Black Crystal/qty')) >= oreMin && parseInt(GM_getValue('inv/Orihalcon Ore/qty')) >= oreMin && parseInt(GM_getValue('inv/Mithril Ore/qty')) >= oreMin)
      //  {
      //    say("<b style='color: green'>We have enough ore, let's go back to Avgard.</b>");
      //    autoPlay.push(425); // Head West to Avgard @ Crossing the Desert 2
      //  }
      //  else if (parseInt(GM_getValue('inv/Iron Ore/qty')) < oreMin || parseInt(GM_getValue('inv/Mithril Ore/qty')) < oreMin)
      //  {
      //    autoPlay.push(529); // Brown Back Auroch @ Crossing the Desert 2
      //  }
      //  else if (parseInt(GM_getValue('inv/Steel Ore/qty')) < oreMin)
      //  {
      //    autoPlay.push(522); // Desert Wolf @ Crossing the Desert 2
      //  }
      //  else
      //  {
      //    autoPlay.push(933); // Search for Precious Metals @ Crossing the Desert 2
      //  }
      //
      //  autoPlay.push(parseInt(GM_getValue('inv/Spiked Shield/qty')) < parseInt(GM_getValue('inv/Tempest Blade/qty')) ? 935 : 934); // "load balancing" - get a sword or shield depending on quantity comparison
      //  autoPlay.push(parseInt(GM_getValue('inv/Spiked Shield/qty')) < parseInt(GM_getValue('inv/Tempest Blade/qty')) ? 934 : 935); // "load balancing" - get a sword or shield depending on quantity comparison
      //  autoPlay.push(424); // Head East Towards Chandabrook Bridge @ Avgard
      //}
      //
      //if (0) // Lindellin Forest 1 pass prerequisite
      //{
      //  var items = Array('Money Pouch', 'Stag Antlers');
      //  for (var i in items)
      //  {
      //    var item = items[i];
      //    say('You have ' + (GM_getValue('inv/' + item + '/qty') || 0) + 'x ' + item + '.');
      //  }
      //  if (!parseInt(GM_getValue('inv/Money Pouch/qty')))
      //  {
      //    if (parseInt(GM_getValue('inv/Stag Antlers/qty')) >= 3)
      //    {
      //      autoPlay.push(940); // Forest Ranger @ Lindellin Forest 1
      //    }
      //    else
      //    {
      //      autoPlay.push(524); // Mystic Stag @ Lindellin Forest 1
      //    }
      //  }
      //  else
      //  {
      //    autoPlay.push(616); // Head North Towards Lindellin @ Lindellin Forest 1
      //  }
      //}
      //
      //if (0) // Lindellin Forest 2 pass prerequisite
      //{
      //  var items = Array('Onx Spirit', 'Norg Spirit', 'Fire Crystal');
      //  for (var i in items)
      //  {
      //    var item = items[i];
      //    say('You have ' + (GM_getValue('inv/' + item + '/qty') || 0) + 'x ' + item + '.');
      //  }
      //  if (!parseInt(GM_getValue('inv/Fire Crystal/qty')))
      //  {
      //    if (!parseInt(GM_getValue('inv/Onx Spirit/qty')))
      //    {
      //      autoPlay.push(533); // Onx @ Lindellin Forest 2
      //    }
      //    else if (!parseInt(GM_getValue('inv/Norg Spirit/qty')))
      //    {
      //      autoPlay.push(534); // Norg @ Lindellin Forest 2
      //    }
      //    else
      //    {
      //      autoPlay.push(941); // Ethina @ Lindellin Forest 2
      //    }
      //  }
      //  else
      //  {
      //    autoPlay.push(618); // Head North to Lindellin @ Lindellin Forest 2
      //  }
      //}
      //
      //if (0) // Lindellin pass prerequisite
      //{
      //  //autoPlay.push(); // Wallace @ Lindellin // forgot to get job id
      //  var items = Array('Daniels Help', 'Expert Riding', 'Armored Horse');
      //  for (var i in items)
      //  {
      //    var item = items[i];
      //    say('You have ' + (GM_getValue('inv/' + item + '/qty') || 0) + 'x ' + item + '.');
      //  }
      //  if (!parseInt(GM_getValue('inv/Armored Horse/qty')))
      //  {
      //    if (parseInt(GM_getValue('inv/Daniels Help/qty')))
      //    {
      //      autoPlay.push(942); // Sherwin @ Lindellin
      //    }
      //    else
      //    {
      //      if (!parseInt(GM_getValue('inv/Expert Riding/qty')))
      //      {
      //        autoPlay.push(945); // Become an Expert Rider @ Lindellin
      //      }
      //      else
      //      {
      //        //autoPlay.push(943); // Claire @ Lindellin // gives white horses
      //        autoPlay.push(944); // Daniel @ Lindellin
      //      }
      //    }
      //  }
      //  else
      //  {
      //    //autoPlay.push(618); // Head East into Lindellin Forest @ Lindellin
      //  }
      //}
      //
      //if (0) // to auto-farm for Rebuilds in Tarnwood
      //{ // rocks x33, wood x37, vines x5, log x4, indebted inn, indebted tavern
      //  var items = Array('Indebted Inn', 'Indebted Tavern', 'Rocks', 'Wood', 'Vines', 'Log');
      //  for (var i in items)
      //  {
      //    var item = items[i];
      //    say('You have ' + (GM_getValue('inv/' + item + '/qty') || 0) + 'x ' + item + '.');
      //  }
      //
      //  autoPlay.push(972); // Rebuild Ellias Home @ Tarnwood
      //  autoPlay.push(971); // Rebuild Inn @ Tarnwood
      //  autoPlay.push(974); // Rebuild Tavern @ Tarnwood
      //
      //  if (parseInt(GM_getValue('inv/Wood/qty') || 0) < 37)
      //  {
      //    autoPlay.push(969); // Gather Wood @ East Lindellin Forest 2
      //  }
      //  else if (parseInt(GM_getValue('inv/Rocks/qty') || 0) < 33)
      //  {
      //    autoPlay.push(968); // Gather Rocks @ East Lindellin Forest 2
      //  }
      //  else if (parseInt(GM_getValue('inv/Vines/qty') || 0) < 5)
      //  {
      //    autoPlay.push(543); // Forest Troll @ East Lindellin Forest 2
      //  }
      //  else if (parseInt(GM_getValue('inv/Log/qty') || 0) < 4)
      //  {
      //    autoPlay.push(513); // Young Boar @ East Lindellin Forest 2
      //  }
      //  else
      //  {
      //    autoPlay.push(630); // Head East to Tarnwood Bridge @ East Lindellin Forest 2
      //    autoPlay.push(632); // Head East to Tarnwood @ Tarnwood Bridge
      //  }
      //}
      //
      //if (0) // to auto-farm for Lindellin Forest 4
      //{ // x20 Red Elixir, x3 Bear Claw, x1 Forest Orb
      //  var items = Array('Red Elixir', 'Bear Claw', 'Forest Orb');
      //  for (var i in items)
      //  {
      //    var item = items[i];
      //    say('You have ' + (GM_getValue('inv/' + item + '/qty') || 0) + 'x ' + item + '.');
      //  }
      //
      //  if (parseInt(GM_getValue('inv/Red Elixir/qty') || 0) < 20)
      //  {
      //    autoPlay.push(996); // Trader @ West Lindellin Forest Bridge
      //  }
      //  else
      //  {
      //    autoPlay.push(1207); // Rhia @ Lindellin Forest 4
      //    autoPlay.push(1009); // Forest Shaman @ Lindellin Forest 4
      //    autoPlay.push(720); // Head West Through the Lindellin Forest @ West Lindellin Forest Bridge
      //    autoPlay.push(722); // Head West @ Lindellin Forest 3
      //  }
      //
      //  if (!parseInt(GM_getValue('inv/Forest Orb/qty') || 0))
      //  {
      //    if (parseInt(GM_getValue('inv/Bear Claw/qty') || 0) < 3)
      //    {
      //      autoPlay.push(550); // Shambling Bear @ Lindellin Forest 4
      //    }
      //    else
      //    {
      //      autoPlay.push(1008); // Forest Ranger @ Lindellin Forest 4
      //    }
      //  }
      //}
      //
      //if (0) // to auto-farm for Unprocessed Crystal @ Guldin Falls Road 1
      //{ // x25 Unprocessed Crystal
      //  var items = Array('Unprocessed Crystal');
      //  for (var i in items)
      //  {
      //    var item = items[i];
      //    say('You have ' + (GM_getValue('inv/' + item + '/qty') || 0) + 'x ' + item + '.');
      //  }
      //
      //  if (parseInt(GM_getValue('inv/Unprocessed Crystal/qty') || 0) < 25)
      //  {
      //    autoPlay.push(1016); // Pick Through the Rocks @ Guldin Falls Road 1
      //  }
      //  else
      //  {
      //    autoPlay.push(739); // Head South to Guldin Falls @ Guldin Falls Road 1
      //    autoPlay.push(707); // Head West Through Lindellin Forest @ Guldin Falls
      //    autoPlay.push(1010); // Bernard @ Guldin Falls
      //  }
      //}
      //
      //if (0) // auto-farm Fairy Flute @ West Lindellin Forest 2
      //{
      //  if (parseInt(GM_getValue('inv/Blue Fairy Charm/qty') || 0) < 1)
      //  {
      //    if (parseInt(GM_getValue('inv/Fairy Flute/qty') || 0) < 1)
      //    {
      //      autoPlay.push(551); // Woodland Dragon @ West Lindellin Forest 2
      //    }
      //    else
      //    {
      //      autoPlay.push(710); // Head South Along the Hidden Path @ West Lindellin Forest 2
      //      autoPlay.push(1025); // Blue Fairy @ Hidden Path - Moving Forest
      //    }
      //  }
      //  else
      //  {
      //    autoPlay.push(709); // Head Back to the Road @ Hidden Path - Moving Forest
      //  }
      //}
      //
      //if (0) // auto-farm Ancient Stone, Aellia Flower @ West Lindellin Forest 1
      //{
      //  var items = Array('Ancient Stone', 'Aellia Flower');
      //  for (var i in items)
      //  {
      //    var item = items[i];
      //    say('You have ' + (GM_getValue('inv/' + item + '/qty') || 0) + 'x ' + item + '.');
      //  }
      //  if (parseInt(GM_getValue('inv/Ancient Stone/qty') || 0) < 3)
      //  {
      //    autoPlay.push(552); // Rock Golem @ West Lindellin Forest 1
      //  }
      //  if (parseInt(GM_getValue('inv/Aellia Flower/qty') || 0) < 3)
      //  {
      //    autoPlay.push(551); // Woodland Dragon @ West Lindellin Forest 1
      //  }
      //}

      //autoPlay.push(699); // Head West Across Grandeur Lake @ Thistledown Beach
      //autoPlay.push(701); // Head South to Thistledown Beach @ Thistledown
      //autoPlay.push(1036); // Fish (Spinning Lure) @ Across Grandeur Lake
      //autoPlay.push(1035); // Fish (Sinking Lure) @ Across Grandeur Lake
      //autoPlay.push(1033); // Fish off the Dock @ Thistledown Beach
      //autoPlay.push(1028); // Oreli @ Thistledown
      //autoPlay.push(1029); // Viri @ Thistledown
      //autoPlay.push(556); // Lake Dragon @ Across Grandeur Lake
      //autoPlay.push(1082); // Rita @ Styrewood Dock
      //autoPlay.push(1083); // Milford @ Styrewood Dock
      //autoPlay.push(1212); // Rit @ Styrewood Dock
      //autoPlay.push(1084); // Aresai @ East Whispering Forest

      autoPlayOrder();

      // If the page has an ID, get it (battles use this to see who we're attacking)
      var pageIdAry = window.location.href.match('/([0-9]+)(\\?.*)?$');
      var pageId = 0;
      if (pageIdAry)
      {
        pageId = parseInt(pageIdAry[1]);
      }

      // Figure out if we're in a battle right now
      if (window.location.href.match('/attack/')) isAttack = 1;
      if (isAttack) say("This is a fight.");

      // Figure out what page we're on
      var pageNameAry = window.location.href.match('/([^\\s\\?/]+)(\\?.*)?$');
      var pageName = 'unknown';
      if (pageNameAry)
      {
        pageName = pageNameAry[1];
      }

      if (location && pageName == 'quest')
      {
        // log (not for spying, intended for mapping)
        var mapImgs = $J('img[id*="_mapImage"]');
        for (var i=0; i<mapImgs.length; i++)
        {
          var mapImg = mapImgs[i];
          var mapImgUrl = mapImg.src;
          if (mapImgUrl)
          {
            var logPixel = document.createElement('img');
            logPixel.setAttribute('height', 1);
            logPixel.setAttribute('width', 1);
            logPixel.setAttribute('src', 'http://www.dustywilson.com/hammerfall/log.cgi?v=' + version + '&ur=' + ur + '&type=location&id=' + pageName + '&l=' + escape(location) + '&m=' + escape(mapImgUrl));
            document.getElementsByTagName('body')[0].appendChild(logPixel);
          }
        }
      }

      // If we're on the character/inventory screen...
      if (pageName == 'character')
      {
        say('<i><b>Viewing My Character</b></i>', 1);
        var allVars = GM_listValues();
        // erase existing stored inventory info
        for (var i=0; i<allVars.length; i++)
        {
          var thisVar = allVars[i];
          if (thisVar.match('^inv/') && thisVar.match('/qty$'))
          {
            GM_deleteValue(thisVar);
          }
        }
        // get inventory info
        var qtys = new Object();
        var allImgs = $J('img[src*="small"]');
        for (var i=0; i<allImgs.length; i++)
        {
          var itemImg = allImgs[i];
          var itemDiv = itemImg.parentNode;
          var itemContent = itemDiv.innerHTML;
          var itemQtyAry = itemContent.match('<b>([0-9]+)x</b>');
          var itemQty = 1;
          if (itemQtyAry) itemQty = itemQtyAry[1];
          var itemName = itemContent;
          itemName = itemName.replace(/<.*/g, '');
          itemName = itemName.replace(/^\s+/g, '');
          itemName = itemName.replace(/\s+$/g, '');
          if (!itemName) continue;
          qtys[itemName] = itemQty;
          //say("I: [" + itemName + "] == " + itemQty);
        }
        // update stored inventory info
        for (var item in qtys)
        {
          if (typeof(item) == 'string')
          {
            GM_setValue('inv/' + item + '/qty', qtys[item]);
          }
        }
      }

      // get guild count info
      var guildCountAry = $J('a:contains("Guild ")');
      if (guildCountAry.length)
      {
        var guildCount = guildCountAry[0];
        var guildCountContent = guildCount.innerHTML;

        var guildCountCurrentAry = guildCountContent.match('\\(([0-9]+)/');
        if (guildCountCurrentAry)
        {
          attribs.guildCount = parseInt(guildCountCurrentAry[1]);
        }

        var guildMaxCurrentAry = guildCountContent.match('/([0-9]+)\\)');
        if (guildMaxCurrentAry)
        {
          attribs.guildMax = parseInt(guildMaxCurrentAry[1]);
        }

        attribs.guildEffective = (attribs.guildCount < attribs.guildMax ? attribs.guildCount : attribs.guildMax);

        //say('<b>Guild Count:</b> ' + attribs.guildCount);
        //say('<b>Guild Usable:</b> ' + attribs.guildMax);
        //say('<b>Guild Effective:</b> ' + attribs.guildEffective);
      }


      ///// LEFT SIDE

      // create the sidebarLeft container
      var sidebarLeftContainer = document.createElement('div');
      sidebarLeftContainer.id = 'GM-SIDEBARLEFT';
      sidebarLeftContainer.style.margin = '0';
      sidebarLeftContainer.style.position = 'fixed';
      sidebarLeftContainer.style.width = '166px';
      sidebarLeftContainer.style.height = String(window.innerHeight - 50) + 'px';
      sidebarLeftContainer.style.top = '27px';
      sidebarLeftContainer.style.left = '0';
      sidebarLeftContainer.style.zIndex = '5';
      sidebarLeftContainer.style.color = '#FFFFFF';
      sidebarLeftContainer.style.overflow = 'auto';
      document.getElementsByTagName('body')[0].appendChild(sidebarLeftContainer);
      $J(window).bind('resize', function()
      {
        document.getElementById('GM-SIDEBARLEFT').style.height = String(window.innerHeight - 50) + 'px';
      });

      // create the toggle container
      var toggleLeftContainer = document.createElement('div');
      toggleLeftContainer.style.margin = '0';
      toggleLeftContainer.style.textAlign = 'center';
      sidebarLeftContainer.appendChild(toggleLeftContainer);

      // create the infoLeft container
      var infoLeftContainer = document.createElement('div');
      infoLeftContainer.style.margin = '0';
      infoLeftContainer.style.padding = '0';
      sidebarLeftContainer.appendChild(infoLeftContainer);

      // create the attribs container
      var attribsContainer = document.createElement('div');
      attribsContainer.style.padding = '5px 5px 20px 5px';
      infoLeftContainer.appendChild(attribsContainer);
      if (GM_getValue('show/attribs') != true && GM_getValue('show/attribs') != false) GM_setValue('show/attribs', 1); // set default on
      if (GM_getValue('show/attribs'))
      {
        $J(attribsContainer).show();
      }
      else
      {
        $J(attribsContainer).hide();
      }
      if (location)
      {
        var locationHfwiki = location.replace(/\s+/g, '-').toLowerCase();
        $J(attribsContainer).append('<div style="clear: both"><span style="float: left; width: 20px; margin: 2px 0">Location</span><span style="float: right; width: 100px; font-weight: bold; text-align: right; margin: 2px 0; color: violet"><a style="color: #BBBBFF; text-decoration: underline" target="hfwiki" href="http://hfwiki.wikidot.com/location:' + locationHfwiki + '">' + location + '</a></span></div>');
      }
      else
      {
        $J(attribsContainer).append('<div style="clear: both"><span style="float: left; width: 20px; margin: 2px 0">Location</span><span style="float: right; width: 100px; font-weight: bold; text-align: right; margin: 2px 0; color: violet"><i>Unknown</i></span></div>');
      }

      // show attribs button
      var showAttribsToggle = GM_getValue('show/attribs') || 0;
      var showAttribsBtn = document.createElement('input');
      showAttribsBtn.setAttribute('value', 'I');
      showAttribsBtn.setAttribute('type', 'button');
      showAttribsBtn.style.width = '20px';
      showAttribsBtn.style.backgroundColor = (showAttribsToggle > 0 ? '#66CC66' : '#CC6666');
      showAttribsBtn.addEventListener('click', function(event) {
        var btn = event.wrappedJSObject.originalTarget;
        GM_setValue('show/attribs', !GM_getValue('show/attribs'));
        showAttribsEnabled = GM_getValue('show/attribs');
        btn.style.backgroundColor = (showAttribsEnabled ? '#66CC66' : '#CC6666');
        if (showAttribsEnabled)
        {
          $J(attribsContainer).fadeIn(100);
        }
        else
        {
          $J(attribsContainer).fadeOut(250);
        }
      }, false);
      toggleLeftContainer.appendChild(showAttribsBtn);

      // create the health items container
      var healthItemsContainer = document.createElement('div');
      healthItemsContainer.style.margin = '5px';
      infoLeftContainer.appendChild(healthItemsContainer);
      if (GM_getValue('show/health') != true && GM_getValue('show/health') != false) GM_setValue('show/health', 1); // set default on
      if (GM_getValue('show/health'))
      {
        $J(healthItemsContainer).show();
      }
      else
      {
        $J(healthItemsContainer).hide();
      }
      var healthItems = Array(
        ['Dragon Flesh', 500, 0],
        ['Chocolate', 400, 0],
        ['Dumplings', 300, 0],
        ['Apples', 200, 0],
        ['Fish', 150, 0],
        ['Watermelon', 100, 0],
        ['Mushrooms', 75, 0],
        ['Bread', 50, 0],
        ['Fresh Water', 25, 0],
        ['Herb', 15, 0]
      );
      $J(healthItemsContainer).append('<div style="clear: both; text-align: center; font-weight: bold; padding: 5px">Health Items</div>');
      for (var i in healthItems)
      {
        var itemGroup = healthItems[i];
        var item = itemGroup[0];
        var healthValue = itemGroup[1];
        var energyValue = itemGroup[2];
        var qty = (GM_getValue('inv/' + item + '/qty') || 0);
        if (qty)
        {
          var itemHfwiki = item.replace(/\s+/g, '-').toLowerCase();
          $J(healthItemsContainer).append('<div style="clear: both"><span style="float: left; width: 100px; margin: 2px 0"><a href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '" style="color: #FFFFFF; text-decoration: none" target="hfwiki">' + item + '</a><br /><small style="color: #BBBBBB">(' + (healthValue ? (healthValue > 0 ? '+' : '') + healthValue + ' hp' : '') + (healthValue && energyValue ? ', ' : '') + (energyValue ? (energyValue > 0 ? '+' : '') + energyValue + ' ep' : '') + ')</small></span><span style="float: right; width: 25px; font-weight: bold; text-align: right; margin: 2px 0; color: #66CC66">' + qty + '</span></div>');
        }
      }

      // show health items button
      var showHealthItemsToggle = GM_getValue('show/health') || 0;
      var showHealthItemsBtn = document.createElement('input');
      showHealthItemsBtn.setAttribute('value', 'H');
      showHealthItemsBtn.setAttribute('type', 'button');
      showHealthItemsBtn.style.width = '20px';
      showHealthItemsBtn.style.backgroundColor = (showHealthItemsToggle > 0 ? '#66CC66' : '#CC6666');
      showHealthItemsBtn.addEventListener('click', function(event) {
        var btn = event.wrappedJSObject.originalTarget;
        GM_setValue('show/health', !GM_getValue('show/health'));
        showHealthItemsEnabled = GM_getValue('show/health');
        btn.style.backgroundColor = (showHealthItemsEnabled ? '#66CC66' : '#CC6666');
        if (showHealthItemsEnabled)
        {
          $J(healthItemsContainer).fadeIn(100);
        }
        else
        {
          $J(healthItemsContainer).fadeOut(250);
        }
      }, false);
      toggleLeftContainer.appendChild(showHealthItemsBtn);

      // create the energy items container
      var energyItemsContainer = document.createElement('div');
      energyItemsContainer.style.margin = '5px';
      infoLeftContainer.appendChild(energyItemsContainer);
      if (GM_getValue('show/energy') != true && GM_getValue('show/energy') != false) GM_setValue('show/energy', 1); // set default on
      if (GM_getValue('show/energy'))
      {
        $J(energyItemsContainer).show();
      }
      else
      {
        $J(energyItemsContainer).hide();
      }
      var energyItems = Array(
        ['Black Elixir', -100, 250],
        ['Lotus Blossom', 0, 150],
        ['Dragon Tear', 0, 125],
        ['Green Elixir', 0, 100],
        ['Red Elixir', 0, 80],
        ['Blue Elixir', 0, 60],
        ['Sprites', 0, 40],
        ['Lotus Petal', 0, 20]
      );
      $J(energyItemsContainer).append('<div style="clear: both; text-align: center; font-weight: bold; padding: 5px">Energy Items</div>');
      for (var i in energyItems)
      {
        var itemGroup = energyItems[i];
        var item = itemGroup[0];
        var healthValue = itemGroup[1];
        var energyValue = itemGroup[2];
        var qty = (GM_getValue('inv/' + item + '/qty') || 0);
        if (qty)
        {
          var itemHfwiki = item.replace(/\s+/g, '-').toLowerCase();
          $J(energyItemsContainer).append('<div style="clear: both"><span style="float: left; width: 100px; margin: 2px 0"><a href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '" style="color: #FFFFFF; text-decoration: none" target="hfwiki">' + item + '</a><br /><small style="color: #BBBBBB">(' + (energyValue ? (energyValue > 0 ? '+' : '') + energyValue + ' ep' : '') + (energyValue && healthValue ? ', ' : '') + (healthValue ? (healthValue > 0 ? '+' : '') + healthValue + ' hp' : '') + ')</small></span><span style="float: right; width: 25px; font-weight: bold; text-align: right; margin: 2px 0; color: #66CC66">' + qty + '</span></div>');
        }
      }

      // show energy items button
      var showEnergyItemsToggle = GM_getValue('show/energy') || 0;
      var showEnergyItemsBtn = document.createElement('input');
      showEnergyItemsBtn.setAttribute('value', 'E');
      showEnergyItemsBtn.setAttribute('type', 'button');
      showEnergyItemsBtn.style.width = '20px';
      showEnergyItemsBtn.style.backgroundColor = (showEnergyItemsToggle > 0 ? '#66CC66' : '#CC6666');
      showEnergyItemsBtn.addEventListener('click', function(event) {
        var btn = event.wrappedJSObject.originalTarget;
        GM_setValue('show/energy', !GM_getValue('show/energy'));
        showEnergyItemsEnabled = GM_getValue('show/energy');
        btn.style.backgroundColor = (showEnergyItemsEnabled ? '#66CC66' : '#CC6666');
        if (showEnergyItemsEnabled)
        {
          $J(energyItemsContainer).fadeIn(100);
        }
        else
        {
          $J(energyItemsContainer).fadeOut(250);
        }
      }, false);
      toggleLeftContainer.appendChild(showEnergyItemsBtn);

      // create the mount items container
      var mountItemsContainer = document.createElement('div');
      mountItemsContainer.style.margin = '5px';
      infoLeftContainer.appendChild(mountItemsContainer);
      if (GM_getValue('show/mount') != true && GM_getValue('show/mount') != false) GM_setValue('show/mount', 0); // set default off
      if (GM_getValue('show/mount'))
      {
        $J(mountItemsContainer).show();
      }
      else
      {
        $J(mountItemsContainer).hide();
      }
      var mountItems = Array(
        ['Fire Dragon', 45, 45],
        ['Behemoth', 42, 42],
        ['Wyvern', 40, 40],
        ['Forest Dragon', 38, 38],
        ['Dragon Whelp', 35, 35],
        ['Phoenix', 32, 32],
        ['Gryphon', 30, 30],
        ['Pegasus', 30, 30],
        ['Armored Horse', 35, 20],
        ['Black Stallion', 25, 15],
        ['White Horse', 20, 10],
        ['Pack Horse', 10, 0],
        ['Old Horse', 7, 0],
        ['Pack Mule', 5, 0]
      );
      $J(mountItemsContainer).append('<div style="clear: both; text-align: center; font-weight: bold; padding: 5px">Mounts <small style="color: #BBBBBB">(<a style="color: #BBBBBB" href="#" onclick="alert(' + "'Colors show guild item usage.  Please report inaccurate showing of item priority.  Currently sorted by ATK+DEF,ALPHA.  GREEN means the item is actively used in your guild, ORANGE means only some of this quantity is used in your guild, RED means this item is not used in your guild.  If you do not have enough items for your guild, the last item shows the number of guild members needing items.  An ORANGE number in parenthesis shows how many are in use by your guild.'" + '); return false">info</a>)</small></div>');
      var guildI = attribs.guildEffective;
      for (var i in mountItems)
      {
        var itemGroup = mountItems[i];
        var item = itemGroup[0];
        var defValue = itemGroup[1];
        var atkValue = itemGroup[2];
        var qty = (GM_getValue('inv/' + item + '/qty') || 0);
        if (qty)
        {
          guildI = guildI - qty;
          var qtyColor = (guildI >= 0 ? '#66CC66' : (Math.abs(guildI) < qty ? 'orange' : '#CC6666'));
          var itemHfwiki = item.replace(/\s+/g, '-').toLowerCase();
          $J(mountItemsContainer).append('<div style="clear: both"><span style="float: left; width: 100px; margin: 2px 0"><a href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '" style="color: #FFFFFF; text-decoration: none" target="hfwiki">' + item + '</a><br /><small style="color: #BBBBBB">(' + (defValue ? (defValue > 0 ? '+' : '') + defValue + ' def' : '') + (defValue && atkValue ? ', ' : '') + (atkValue ? (atkValue > 0 ? '+' : '') + atkValue + ' atk' : '') + ')</small></span><span style="float: right; width: 25px; font-weight: bold; text-align: right; margin: 2px 0; color: ' + qtyColor + '">' + (guildI < 0 && Math.abs(guildI) < qty ? qty + '<br/>(' + (qty - Math.abs(guildI)) + ')' : qty) + '</span></div>');
        }
      }
      if (guildI > 0)
      {
        $J(mountItemsContainer).append('<div style="clear: both"><span style="float: left; width: 100px; margin: 2px 0">Unmounted</span><span style="float: right; width: 25px; font-weight: bold; text-align: right; margin: 2px 0; color: #CC6666">' + guildI + '</span></div>');
      }

      // show mount items button
      var showMountItemsToggle = GM_getValue('show/mount') || 0;
      var showMountItemsBtn = document.createElement('input');
      showMountItemsBtn.setAttribute('value', 'M');
      showMountItemsBtn.setAttribute('type', 'button');
      showMountItemsBtn.style.width = '20px';
      showMountItemsBtn.style.backgroundColor = (showMountItemsToggle > 0 ? '#66CC66' : '#CC6666');
      showMountItemsBtn.addEventListener('click', function(event) {
        var btn = event.wrappedJSObject.originalTarget;
        GM_setValue('show/mount', !GM_getValue('show/mount'));
        showMountItemsEnabled = GM_getValue('show/mount');
        btn.style.backgroundColor = (showMountItemsEnabled ? '#66CC66' : '#CC6666');
        if (showMountItemsEnabled)
        {
          $J(mountItemsContainer).fadeIn(100);
        }
        else
        {
          $J(mountItemsContainer).fadeOut(250);
        }
      }, false);
      toggleLeftContainer.appendChild(showMountItemsBtn);

      // create the armor items container
      var armorItemsContainer = document.createElement('div');
      armorItemsContainer.style.margin = '5px';
      infoLeftContainer.appendChild(armorItemsContainer);
      if (GM_getValue('show/armor') != true && GM_getValue('show/armor') != false) GM_setValue('show/armor', 0); // set default off
      if (GM_getValue('show/armor'))
      {
        $J(armorItemsContainer).show();
      }
      else
      {
        $J(armorItemsContainer).hide();
      }
      var armorItems = Array(
        ['Elemental Shield', 70, 35],
        ['Bone Armor', 65, 35],
        ['Darkness Cloak', 75, 20],
        ['Fading Cloak', 75, 20],
        ['Fire Cloak', 75, 20],
        ['Ice Cloak', 75, 20],
        ['Majestic Cloak', 75, 20],
        ['Fire Shield', 80, 30],
        ['Thunder Shield', 70, 30],
        ['Amrit\'s Cape', 90, 0],
        ['Mithiril Armor', 65, 20],
        ['Serrated Shield', 70, 15],
        ['Mirror Shield', 60, 15],
        ['Sorcery Armor', 58, 12],
        ['Celestial Shield', 57, 12],
        ['Tempest Shield', 50, 15],
        ['Adamantite Armor', 52, 10],
        ['Spiked Shield', 40, 20],
        ['Champion Armor', 50, 7],
        ['Darkness Shield', 53, 4],
        ['Paladin Armor', 45, 8],
        ['Onyx Tower Shield', 48, 0],
        ['Barbed Shield', 30, 10],
        ['Dwarven Shield', 35, 5],
        ['Chainmail', 25, 0],
        ['Leather Armor', 20, 0],
        ['Bronze Shield', 15, 0],
        ['Wooden Shield', 10, 0]
      );
      $J(armorItemsContainer).append('<div style="clear: both; text-align: center; font-weight: bold; padding: 5px">Armor <small style="color: #BBBBBB">(<a style="color: #BBBBBB" href="#" onclick="alert(' + "'Colors show guild item usage.  Please report inaccurate showing of item priority.  Currently sorted by ATK+DEF,ALPHA.  GREEN means the item is actively used in your guild, ORANGE means only some of this quantity is used in your guild, RED means this item is not used in your guild.  If you do not have enough items for your guild, the last item shows the number of guild members needing items.  An ORANGE number in parenthesis shows how many are in use by your guild.'" + '); return false">info</a>)</small></div>');
      var guildI = attribs.guildEffective;
      for (var i in armorItems)
      {
        var itemGroup = armorItems[i];
        var item = itemGroup[0];
        var defValue = itemGroup[1];
        var atkValue = itemGroup[2];
        var qty = (GM_getValue('inv/' + item + '/qty') || 0);
        if (qty)
        {
          guildI = guildI - qty;
          var qtyColor = (guildI >= 0 ? '#66CC66' : (Math.abs(guildI) < qty ? 'orange' : '#CC6666'));
          var itemHfwiki = item.replace(/\s+/g, '-').toLowerCase();
          $J(armorItemsContainer).append('<div style="clear: both"><span style="float: left; width: 100px; margin: 2px 0"><a href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '" style="color: #FFFFFF; text-decoration: none" target="hfwiki">' + item + '</a><br /><small style="color: #BBBBBB">(' + (defValue ? (defValue > 0 ? '+' : '') + defValue + ' def' : '') + (defValue && atkValue ? ', ' : '') + (atkValue ? (atkValue > 0 ? '+' : '') + atkValue + ' atk' : '') + ')</small></span><span style="float: right; width: 25px; font-weight: bold; text-align: right; margin: 2px 0; color: ' + qtyColor + '">' + (guildI < 0 && Math.abs(guildI) < qty ? qty + '<br/>(' + (qty - Math.abs(guildI)) + ')' : qty) + '</span></div>');
        }
      }
      if (guildI > 0)
      {
        $J(armorItemsContainer).append('<div style="clear: both"><span style="float: left; width: 100px; margin: 2px 0">Armorless</span><span style="float: right; width: 25px; font-weight: bold; text-align: right; margin: 2px 0; color: #CC6666">' + guildI + '</span></div>');
      }

      // show armor items button
      var showArmorItemsToggle = GM_getValue('show/armor') || 0;
      var showArmorItemsBtn = document.createElement('input');
      showArmorItemsBtn.setAttribute('value', 'Ar');
      showArmorItemsBtn.setAttribute('type', 'button');
      showArmorItemsBtn.style.width = '23px';
      showArmorItemsBtn.style.backgroundColor = (showArmorItemsToggle > 0 ? '#66CC66' : '#CC6666');
      showArmorItemsBtn.addEventListener('click', function(event) {
        var btn = event.wrappedJSObject.originalTarget;
        GM_setValue('show/armor', !GM_getValue('show/armor'));
        showArmorItemsEnabled = GM_getValue('show/armor');
        btn.style.backgroundColor = (showArmorItemsEnabled ? '#66CC66' : '#CC6666');
        if (showArmorItemsEnabled)
        {
          $J(armorItemsContainer).fadeIn(100);
        }
        else
        {
          $J(armorItemsContainer).fadeOut(250);
        }
      }, false);
      toggleLeftContainer.appendChild(showArmorItemsBtn);

      // create the weapon items container
      var weaponItemsContainer = document.createElement('div');
      weaponItemsContainer.style.margin = '5px';
      infoLeftContainer.appendChild(weaponItemsContainer);
      if (GM_getValue('show/weapon') != true && GM_getValue('show/weapon') != false) GM_setValue('show/weapon', 0); // set default off
      if (GM_getValue('show/weapon'))
      {
        $J(weaponItemsContainer).show();
      }
      else
      {
        $J(weaponItemsContainer).hide();
      }
      var weaponItems = Array(
        ['Sword of a Hundred Truths', 40, 110],
        ['Equinox', 35, 90],
        ['Templar', 25, 100],
        ['Eclipse', 30, 80],
        ['Lear', 35, 75],
        ['Alpha Sword', 35, 65],
        ['Marrow', 30, 70],
        ['Harmony', 20, 75],
        ['Haste', 20, 75],
        ['Hatred', 20, 75],
        ['Havok', 20, 75],
        ['Hope', 20, 75],
        ['Dragonsceptre', 15, 70],
        ['Mythic Axe', 20, 65],
        ['Nightslayer', 15, 62],
        ['Blue Octave', 12, 60],
        ['Farcatcher', 10, 63],
        ['Moonspear', 18, 54],
        ['Vaulter', 11, 56],
        ['Demoneater', 0, 65],
        ['Celestial Sword', 12, 52],
        ['Grand Halberd', 4, 58],
        ['Mauler', 10, 50],
        ['Razor Bow', 0, 52],
        ['Tempest Blade', 10, 42],
        ['Gilded Arc Staff', 14, 36],
        ['Battle Axe', 2, 45],
        ['Sunspear', 8, 38],
        ['Long Bow', 0, 37],
        ['Long Sword', 8, 28],
        ['Iron Axe', 2, 30],
        ['Broad Sword', 5, 25],
        ['Wind Spear', 2, 20],
        ['Dagger', 0, 15],
        ['Knife', 0, 10]
      );
      $J(weaponItemsContainer).append('<div style="clear: both; text-align: center; font-weight: bold; padding: 5px">Weapons <small style="color: #BBBBBB">(<a style="color: #BBBBBB" href="#" onclick="alert(' + "'Colors show guild item usage.  Please report inaccurate showing of item priority.  Currently sorted by ATK+DEF,ALPHA.  GREEN means the item is actively used in your guild, ORANGE means only some of this quantity is used in your guild, RED means this item is not used in your guild.  If you do not have enough items for your guild, the last item shows the number of guild members needing items.  An ORANGE number in parenthesis shows how many are in use by your guild.'" + '); return false">info</a>)</small></div>');
      var guildI = attribs.guildEffective;
      for (var i in weaponItems)
      {
        var itemGroup = weaponItems[i];
        var item = itemGroup[0];
        var defValue = itemGroup[1];
        var atkValue = itemGroup[2];
        var qty = (GM_getValue('inv/' + item + '/qty') || 0);
        if (qty)
        {
          guildI = guildI - qty;
          var qtyColor = (guildI >= 0 ? '#66CC66' : (Math.abs(guildI) < qty ? 'orange' : '#CC6666'));
          var itemHfwiki = item.replace(/\s+/g, '-').toLowerCase();
          $J(weaponItemsContainer).append('<div style="clear: both"><span style="float: left; width: 100px; margin: 2px 0"><a href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '" style="color: #FFFFFF; text-decoration: none" target="hfwiki">' + item + '</a><br /><small style="color: #BBBBBB">(' + (atkValue ? (atkValue > 0 ? '+' : '') + atkValue + ' atk' : '') + (defValue && atkValue ? ', ' : '') + (defValue ? (defValue > 0 ? '+' : '') + defValue + ' def' : '') + ')</small></span><span style="float: right; width: 25px; font-weight: bold; text-align: right; margin: 2px 0; color: ' + qtyColor + '">' + (guildI < 0 && Math.abs(guildI) < qty ? qty + '<br/>(' + (qty - Math.abs(guildI)) + ')' : qty) + '</span></div>');
        }
      }
      if (guildI > 0)
      {
        $J(weaponItemsContainer).append('<div style="clear: both"><span style="float: left; width: 100px; margin: 2px 0">Unarmed</span><span style="float: right; width: 25px; font-weight: bold; text-align: right; margin: 2px 0; color: #CC6666">' + guildI + '</span></div>');
      }

      // show weapon items button
      var showWeaponItemsToggle = GM_getValue('show/weapon') || 0;
      var showWeaponItemsBtn = document.createElement('input');
      showWeaponItemsBtn.setAttribute('value', 'W');
      showWeaponItemsBtn.setAttribute('type', 'button');
      showWeaponItemsBtn.style.width = '20px';
      showWeaponItemsBtn.style.backgroundColor = (showWeaponItemsToggle > 0 ? '#66CC66' : '#CC6666');
      showWeaponItemsBtn.addEventListener('click', function(event) {
        var btn = event.wrappedJSObject.originalTarget;
        GM_setValue('show/weapon', !GM_getValue('show/weapon'));
        showWeaponItemsEnabled = GM_getValue('show/weapon');
        btn.style.backgroundColor = (showWeaponItemsEnabled ? '#66CC66' : '#CC6666');
        if (showWeaponItemsEnabled)
        {
          $J(weaponItemsContainer).fadeIn(100);
        }
        else
        {
          $J(weaponItemsContainer).fadeOut(250);
        }
      }, false);
      toggleLeftContainer.appendChild(showWeaponItemsBtn);

      // create the accessories items container
      var accessoriesItemsContainer = document.createElement('div');
      accessoriesItemsContainer.style.margin = '5px';
      infoLeftContainer.appendChild(accessoriesItemsContainer);
      if (GM_getValue('show/accessories') != true && GM_getValue('show/accessories') != false) GM_setValue('show/accessories', 0); // set default off
      if (GM_getValue('show/accessories'))
      {
        $J(accessoriesItemsContainer).show();
      }
      else
      {
        $J(accessoriesItemsContainer).hide();
      }
      var accessoriesItems = Array(
        ['Hidden Wristblade', 20, 20],
        ['One-Handed Blade', 15, 10],
        ['Throwing Knives', 12, 12],
        ['Hidden Dagger', 10, 10],
        ['Dragon Gauntlets', 2, 14],
        ['Ice Gauntlets', 10, 4],
        ['Fire Gauntlets', 3, 10],
        ['Twin Pendants', 5, 5],
        ['Jade Talisman', 0, 8],
        ['Iron Helmet', 5, 0],
        ['Jet Pendant', 0, 5],
        ['Sapphire Ring', 2, 2]
      );
      $J(accessoriesItemsContainer).append('<div style="clear: both; text-align: center; font-weight: bold; padding: 5px">Accessories <small style="color: #BBBBBB">(<a style="color: #BBBBBB" href="#" onclick="alert(' + "'Colors show guild item usage.  Please report inaccurate showing of item priority.  Currently sorted by ATK+DEF,ALPHA.  GREEN means the item is actively used in your guild, ORANGE means only some of this quantity is used in your guild, RED means this item is not used in your guild.  If you do not have enough items for your guild, the last item shows the number of guild members needing items.  An ORANGE number in parenthesis shows how many are in use by your guild.'" + '); return false">info</a>)</small></div>');
      var guildI = attribs.guildEffective;
      for (var i in accessoriesItems)
      {
        var itemGroup = accessoriesItems[i];
        var item = itemGroup[0];
        var defValue = itemGroup[1];
        var atkValue = itemGroup[2];
        var qty = (GM_getValue('inv/' + item + '/qty') || 0);
        if (qty)
        {
          guildI = guildI - qty;
          var qtyColor = (guildI >= 0 ? '#66CC66' : (Math.abs(guildI) < qty ? 'orange' : '#CC6666'));
          var itemHfwiki = item.replace(/\s+/g, '-').toLowerCase();
          $J(accessoriesItemsContainer).append('<div style="clear: both"><span style="float: left; width: 100px; margin: 2px 0"><a href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '" style="color: #FFFFFF; text-decoration: none" target="hfwiki">' + item + '</a><br /><small style="color: #BBBBBB">(' + (defValue ? (defValue > 0 ? '+' : '') + defValue + ' def' : '') + (defValue && atkValue ? ', ' : '') + (atkValue ? (atkValue > 0 ? '+' : '') + atkValue + ' atk' : '') + ')</small></span><span style="float: right; width: 30px; font-weight: bold; text-align: right; margin: 2px 0; color: ' + qtyColor + '">' + (guildI < 0 && Math.abs(guildI) < qty ? qty + '<br/>(' + (qty - Math.abs(guildI)) + ')' : qty) + '</span></div>');
        }
      }
      if (guildI > 0)
      {
        $J(accessoriesItemsContainer).append('<div style="clear: both"><span style="float: left; width: 100px; margin: 2px 0">Unsupplied</span><span style="float: right; width: 25px; font-weight: bold; text-align: right; margin: 2px 0; color: #CC6666">' + guildI + '</span></div>');
      }

      // show accessories items button
      var showAccessoriesItemsToggle = GM_getValue('show/accessories') || 0;
      var showAccessoriesItemsBtn = document.createElement('input');
      showAccessoriesItemsBtn.setAttribute('value', 'Ac');
      showAccessoriesItemsBtn.setAttribute('type', 'button');
      showAccessoriesItemsBtn.style.width = '23px';
      showAccessoriesItemsBtn.style.backgroundColor = (showAccessoriesItemsToggle > 0 ? '#66CC66' : '#CC6666');
      showAccessoriesItemsBtn.addEventListener('click', function(event) {
        var btn = event.wrappedJSObject.originalTarget;
        GM_setValue('show/accessories', !GM_getValue('show/accessories'));
        showAccessoriesItemsEnabled = GM_getValue('show/accessories');
        btn.style.backgroundColor = (showAccessoriesItemsEnabled ? '#66CC66' : '#CC6666');
        if (showAccessoriesItemsEnabled)
        {
          $J(accessoriesItemsContainer).fadeIn(100);
        }
        else
        {
          $J(accessoriesItemsContainer).fadeOut(250);
        }
      }, false);
      toggleLeftContainer.appendChild(showAccessoriesItemsBtn);

      ///// RIGHT SIDE

      // create the sidebarRight container
      var sidebarRightContainer = document.createElement('div');
      sidebarRightContainer.id = 'GM-SIDEBARRIGHT';
      sidebarRightContainer.style.margin = '0';
      sidebarRightContainer.style.position = 'fixed';
      sidebarRightContainer.style.width = '166px';
      sidebarRightContainer.style.height = String(window.innerHeight - 50) + 'px';
      sidebarRightContainer.style.top = '27px';
      sidebarRightContainer.style.right = '0';
      sidebarRightContainer.style.zIndex = '5';
      sidebarRightContainer.style.color = '#FFFFFF';
      sidebarRightContainer.style.overflow = 'auto';
      sidebarRightContainer.style.textAlign = 'center';
      document.getElementsByTagName('body')[0].appendChild(sidebarRightContainer);
      $J(window).bind('resize', function()
      {
        document.getElementById('GM-SIDEBARRIGHT').style.height = String(window.innerHeight - 50) + 'px';
      });

      // update-checker container
      var updateCheckerContainer = document.createElement('div');
      updateCheckerContainer.style.margin = '0';
      updateCheckerContainer.style.padding = '15px 0';
      updateCheckerContainer.style.opacity = '0.8';
      updateCheckerContainer.style.textAlign = 'center';
      updateCheckerContainer.style.fontWeight = 'bold';
      updateCheckerContainer.style.backgroundPosition = '-10px 14px';
      updateCheckerContainer.style.backgroundRepeat = 'no-repeat';
      updateCheckerContainer.style.backgroundImage = 'url(http://www.dustywilson.com/img/progressBar.gif)';
      sidebarRightContainer.appendChild(updateCheckerContainer);
      $J(updateCheckerContainer).hide();
      $J(updateCheckerContainer).append('Checking for updates.');

      // update-checker button
      var updateCheckerBtn = document.createElement('input');
      updateCheckerBtn.setAttribute('value', 'Check for Updates');
      updateCheckerBtn.setAttribute('type', 'button');
      updateCheckerBtn.style.width = '150px';
      updateCheckerBtn.style.backgroundColor = '#CCCCFF';
      updateCheckerBtn.addEventListener('click', function(event) {
        var btn = event.wrappedJSObject.originalTarget;
        try
        {
          // check for newest version number
          GM_xmlhttpRequest({
            method: 'GET',
            url: updateUrl,
            onload: function(responseDetails) {
              $J(updateCheckerContainer).fadeOut(250);
              var content = responseDetails.responseText;
              var verMatch = content.match(/var version = (\d+);/i);
              var verNewest = parseInt(verMatch[1]);
              if (!verNewest)
              {
                alert("Couldn't fetch newest version.  Make sure you are online.  Try again shortly.");
              }
              else if (verNewest == version)
              {
                alert("You seem to have the newest version of Hammerfall RPG Helper.");
              }
              else if (verNewest > version)
              {
                var doit = confirm("There is a newer version of Hammerfall RPG Helper.  Do you want to install it?");
                if (doit)
                {
                  document.location.href = updateUrl;
                }
              }
              else
              {
                alert("You seem to have a version of Hammerfall RPG Helper newer than the newest available.");
              }
            },
            onerror: function(responseDetails) {
              $J(updateCheckerContainer).fadeOut(250);
              alert(responseDetails.statusText);
            }
          });
          $J(updateCheckerContainer).fadeIn(100);
        }
        catch(e)
        {
          alert(e);
        }
      }, false);
      sidebarRightContainer.appendChild(updateCheckerBtn);

      // create the toggle container
      var toggleRightContainer = document.createElement('div');
      toggleRightContainer.style.margin = '0';
      toggleRightContainer.style.textAlign = 'center';
      sidebarRightContainer.appendChild(toggleRightContainer);

      // create the infoRight container
      var infoRightContainer = document.createElement('div');
      infoRightContainer.style.margin = '0';
      sidebarRightContainer.appendChild(infoRightContainer);

      // create the viri quest container
      var viriContainer = document.createElement('div');
      viriContainer.style.margin = '5px';
      infoRightContainer.appendChild(viriContainer);
      if (pageName == 'quest' && GM_getValue('show/viri'))
      {
        $J(viriContainer).show();
      }
      else
      {
        $J(viriContainer).hide();
      }
      var viriQuestItems1 = Array('Log', 'Sapling', 'Straw', 'Seed', 'Web', 'Poison Apple', 'Vines', 'Moon Flower', 'Fernwood', 'Earth Elemental Leaves');
      var viriQuestItems2 = Array('King Boar Skull', 'Stag Antlers', 'Red Boar Tooth', 'Lava Skull', 'Razorback Tooth', 'Bear Claw', 'Lava Link', 'Lion Claw', 'Steel Plate', 'Dragon Tooth');
      var viriQuestItems3 = Array('Spectral Serpent Spirit', 'Onx Spirit', 'Norg Spirit', 'Sea Beast Spirit', 'Bone Fish Spirit', 'Spark Spirit', 'Mantor Spirit', 'Lurker Spirit', 'Barax Spirit', 'Thorn Spirit');
      $J(viriContainer).append('<div style="clear: both; text-align: center; font-weight: bold; padding: 5px"><a href="http://hfwiki.wikidot.com/location:hidden-path-shortcut-1" style="color: #FFFFFF; text-decoration: underline" target="hfwiki">Viri Quest #1</a></div>');
      for (var i in viriQuestItems1)
      {
        var item = viriQuestItems1[i];
        var qty = (GM_getValue('inv/' + item + '/qty') || 0);
        var itemHfwiki = item.replace(/\s+/g, '-').toLowerCase();
        $J(viriContainer).append('<div style="clear: both"><span style="float: left; width: 25px; font-weight: bold; margin: 2px 0; color: ' + (qty >= 100 ? '#66CC66' : '#CC6666') + '">' + qty + '</span><span style="float: right; width: 100px; text-align: right; margin: 2px 0"><a href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '" style="color: #FFFFFF; text-decoration: none" target="hfwiki">' + item + '</a></span></div>');
      }
      $J(viriContainer).append('<div style="clear: both; text-align: center; font-weight: bold; padding: 5px"><a href="http://hfwiki.wikidot.com/location:hidden-path-shortcut-2" style="color: #FFFFFF; text-decoration: underline" target="hfwiki">Viri Quest #2</a></div>');
      for (var i in viriQuestItems2)
      {
        var item = viriQuestItems2[i];
        var qty = (GM_getValue('inv/' + item + '/qty') || 0);
        var itemHfwiki = item.replace(/\s+/g, '-').toLowerCase();
        $J(viriContainer).append('<div style="clear: both"><span style="float: left; width: 25px; font-weight: bold; margin: 2px 0; color: ' + (qty >= 100 ? '#66CC66' : '#CC6666') + '">' + qty + '</span><span style="float: right; width: 100px; text-align: right; margin: 2px 0"><a href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '" style="color: #FFFFFF; text-decoration: none" target="hfwiki">' + item + '</a></span></div>');
      }
      $J(viriContainer).append('<div style="clear: both; text-align: center; font-weight: bold; padding: 5px"><a href="http://hfwiki.wikidot.com/location:hidden-path-shortcut-2" style="color: #FFFFFF; text-decoration: underline" target="hfwiki">Viri Quest #3</a></div>');
      for (var i in viriQuestItems3)
      {
        var item = viriQuestItems3[i];
        var qty = (GM_getValue('inv/' + item + '/qty') || 0);
        var itemHfwiki = item.replace(/\s+/g, '-').toLowerCase();
        $J(viriContainer).append('<div style="clear: both"><span style="float: left; width: 25px; font-weight: bold; margin: 2px 0; color: ' + (qty >= 100 ? '#66CC66' : '#CC6666') + '">' + qty + '</span><span style="float: right; width: 100px; text-align: right; margin: 2px 0"><a href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '" style="color: #FFFFFF; text-decoration: none" target="hfwiki">' + item + '</a></span></div>');
      }


      // get our recharging status
      var rechargeInfo = $J('div.rechargeInfo').text();
      if (rechargeInfo)
      {
        var attrs = Array('stamina', 'health', 'energy');
        for (var i in attrs)
        {
          var attr = attrs[i];
          var attrMatchAry = rechargeInfo.match(attr + ' in ([0-9]+) (min|sec)');
          if (attrMatchAry)
          {
            var time = attrMatchAry[1];
            var unit = attrMatchAry[2];
            attribs[attr + 'More'] = time * (unit == 'min' ? 60 : 1);
          }
        }
      }

      // get current attributes for Stamina/Health/Energy/Experience
      var progressBars = Array('Stamina', 'Health', 'Energy', 'Exp');
      for (var i in progressBars)
      {
        var v = progressBars[i];
        var attribBar = $J('tr td.btitle:contains("' + v + ':") ~ td div.progressBar');
        if (attribBar.length)
        {
          attribs[v.toLowerCase() + 'Bar'] = attribBar[0]; // for later updating

          var attribContainerDiv = document.createElement('div');
          attribContainerDiv.style.backgroundImage = false;
          attribContainerDiv.style.position = 'relative';
          attribContainerDiv.style.top = '2px';
          attribContainerDiv.style.zIndex = '99997';
          attribContainerDiv.style.right = '253px';
          attribContainerDiv.style.width = '100px';
          attribContainerDiv.style.textAlign = 'right';
          attribContainerDiv.style.padding = '0 2px 0 2px';
          attribContainerDiv.style.margin = '0';
          attribContainerDiv.innerHTML = '';
          attribBar[0].parentNode.parentNode.appendChild(attribContainerDiv);
          attribs[v.toLowerCase() + 'Container'] = attribContainerDiv;

          var attribProgressDiv = document.createElement('div');
          attribProgressDiv.style.backgroundColor = '#AAA';
          if (v.toLowerCase() == 'health') attribProgressDiv.style.backgroundColor = '#098e89';
          if (v.toLowerCase() == 'stamina') attribProgressDiv.style.backgroundColor = '#972900';
          if (v.toLowerCase() == 'energy') attribProgressDiv.style.backgroundColor = '#978b00';
          attribProgressDiv.style.opacity = '0.65';
          attribProgressDiv.style.position = 'absolute';
          attribProgressDiv.style.top = '0';
          attribProgressDiv.style.zIndex = '99998';
          attribProgressDiv.style.right = '0';
          attribProgressDiv.style.width = '0';
          attribProgressDiv.style.height = '0';
          attribProgressDiv.style.textAlign = 'right';
          attribProgressDiv.style.padding = '0';
          attribProgressDiv.style.margin = '0';
          attribProgressDiv.style.paddingLeft = '0';
          attribProgressDiv.style.paddingTop = '14px';
          attribProgressDiv.innerHTML = '&nbsp;';
          attribContainerDiv.appendChild(attribProgressDiv);
          attribs[v.toLowerCase() + 'Progress'] = attribProgressDiv;

          var attribInfoDiv = document.createElement('div');
          attribInfoDiv.className = 'transBox';
          attribInfoDiv.style.position = 'absolute';
          attribInfoDiv.style.top = '0';
          attribInfoDiv.style.zIndex = '99999';
          attribInfoDiv.style.right = '0';
          attribInfoDiv.style.width = '100px';
          attribInfoDiv.style.textAlign = 'right';
          attribInfoDiv.style.padding = '0 2px 0 2px';
          attribInfoDiv.style.margin = '0';
          attribInfoDiv.innerHTML = v;
          attribInfoDiv.setAttribute('title', v);
          // set the click event for the attributes bars (to set increment)
          attribInfoDiv.addEventListener('click', function(event)
          {
            var div = event.wrappedJSObject.originalTarget;
            var typeMatchAry = div.innerHTML.match('<!-- (.*?) -->');
            if (typeMatchAry && typeMatchAry.length)
            {
              var attributeLabel = typeMatchAry[1];
              var newIncrement = parseInt(prompt(' Set new ' + attributeLabel + ' increment.'));
              if (newIncrement)
              {
                attribs[attributeLabel.toLowerCase() + 'Increment'] = newIncrement;
                GM_setValue('incr/' + attributeLabel.toLowerCase(), newIncrement);
              }
            }
          }, false);
          attribInfoDiv.style.cursor = 'pointer';
          attribContainerDiv.appendChild(attribInfoDiv);
          $J(attribInfoDiv).fadeOut(0);
          attribs[v.toLowerCase() + 'Info'] = attribInfoDiv;

          var attribAry = attribBar[0].innerHTML.match(">([0-9,]+)");
          attrib = parseInt(attribAry[1].replace(/,/g, ''));
          attribs[v.toLowerCase()] = attrib;

          var attribMaxAry = attribBar[0].innerHTML.match("([0-9,]+)<");
          attribMax = parseInt(attribMaxAry[1].replace(/,/g, ''));
          attribs[v.toLowerCase() + 'Max'] = attribMax;

          attribPct = Math.round(attrib / attribMax * 10000) / 100;
          attribs[v.toLowerCase() + 'Pct'] = attribPct;

          var attribColor = attribProgressDiv.style.backgroundColor;
          if (v.toLowerCase() == 'health') attribColor = '#0ED8D1';
          if (v.toLowerCase() == 'stamina') attribColor = '#E63D00';
          if (v.toLowerCase() == 'energy') attribColor = '#CCBB00';

          $J(attribsContainer).append('<div style="clear: both"><span style="float: left; width: 20px; margin: 2px 0">' + (v.toLowerCase() == 'exp' ? 'XP' : v) + '</span><span style="float: right; width: 100px; font-weight: bold; text-align: right; margin: 2px 0; color: ' + attribColor + '"><span id="' + v.toLowerCase() + 'Attr">' + attrib + '</span> / ' + attribMax + '</span></div>');

          // say("<b>" + (v.toLowerCase() == 'exp' ? 'XP' : v) + ":</b> <span id='" + v.toLowerCase() + "Attr'>" + attrib + "</span>/" + attribMax + " [" + (v.toLowerCase() == 'exp' ? '-' : attribPct + "%, -") + (attribMax - attrib) + "]" + (attribs[v.toLowerCase() + 'More'] ? ' +' + attribs[v.toLowerCase() + 'More'] + ' secs' : ''), 1);
        }
      }

      // are we recharging any attributes?
      if (attribs.staminaMax <= attribs.stamina && attribs.healthMax <= attribs.health && attribs.energyMax <= attribs.energy) recharging = 0; // no recharge if full

      // get current attributes for Level/Gold
      var progressInfo = Array('Level', 'Gold');
      for (var i in progressInfo)
      {
        var v = progressInfo[i];
        var levelInfo = $J('tr td.btitle:contains("' + v + ':")').parent().find('td');
        if (levelInfo.length)
        {
          attrib = parseInt(levelInfo[1].innerHTML.replace(/,/g, ''));
          //say("<b>" + v + ":</b> " + attrib);
          attribs[v.toLowerCase()] = attrib;

          $J(attribsContainer).append('<div style="clear: both"><span style="float: left; width: 20px; margin: 2px 0">' + v + '</span><span style="float: right; width: 100px; font-weight: bold; text-align: right; margin: 2px 0; color: ' + (v.toLowerCase() == 'gold' ? 'gold' : 'violet') + '">' + attrib + '</span></div>');
        }
      }

      // append guild info to attribs box
      $J(attribsContainer).append('<div style="clear: both"><span style="float: left; width: 20px; margin: 2px 0">Guild</span><span style="float: right; width: 100px; font-weight: bold; text-align: right; margin: 2px 0; color: orange">(' + attribs.guildEffective + ')<br/>' + attribs.guildCount + ' / ' + attribs.guildMax + '</span></div>');

      // Barrenhoff auto-farm Dumplings & Fire Dragon
      //if (location == 'Barrenhoff')
      //{
      //  if (attribs.gold >= 80000 && GM_getValue('inv/Fire Dragon/qty') < attribs.guildEffective)
      //  {
      //    say("<b style='color: Lime'><i>I would like to buy a Fire Dragon...</i></b>", 9);
      //    autoPlay.push(1878); // Helen @ Barrenhoff (Fire Dragon)
      //  }
      //  else if (attribs.gold >= 150)
      //  {
      //    say("<b style='color: Lime'><i>Let's farm Dumplings...</i></b>", 9);
      //    autoPlay.push(1882); // Barrenhoff Cafe @ Barrenhoff (Dumplings)
      //  }
      //  else
      //  {
      //    say("<b style='color: Magenta'><i>Sell some Dumplings or something!  I need cash.</i></b>, 9");
      //  }
      //}

      // inventory items
      invInfo[769] = new Object(); // Fresh Water
      invInfo[769].name = 'Fresh Water';
      invInfo[769].singular = 'Fresh Water';
      invInfo[769].plural = 'Fresh Waters';
      invInfo[771] = new Object(); // Mushrooms
      invInfo[771].name = 'Mushrooms';
      invInfo[771].singular = 'Mushroom';
      invInfo[771].plural = 'Mushrooms';
      invInfo[772] = new Object(); // Watermelon
      invInfo[772].name = 'Watermelon';
      invInfo[772].singular = 'Watermelon';
      invInfo[772].plural = 'Watermelons';
      invInfo[773] = new Object(); // Fish
      invInfo[773].name = 'Fish';
      invInfo[773].singular = 'Fish';
      invInfo[773].plural = 'Fish';
      invInfo[774] = new Object(); // Apples
      invInfo[774].name = 'Apples';
      invInfo[774].singular = 'Apple';
      invInfo[774].plural = 'Apples';
      invInfo[775] = new Object(); // Dumplings
      invInfo[775].name = 'Dumplings';
      invInfo[775].singular = 'Dumpling';
      invInfo[775].plural = 'Dumplings';
      invInfo[776] = new Object(); // Dragon Flesh
      invInfo[776].name = 'Dragon Flesh';
      invInfo[776].singular = 'Dragon Flesh';
      invInfo[776].plural = 'Dragon Flesh';
      invInfo[785] = new Object(); // Sprites
      invInfo[785].name = 'Sprites';
      invInfo[785].singular = 'Sprite';
      invInfo[785].plural = 'Sprites';
      invInfo[786] = new Object(); // Blue Elixir
      invInfo[786].name = 'Blue Elixir';
      invInfo[786].singular = 'Blue Elixir';
      invInfo[786].plural = 'Blue Elixirs';
      invInfo[787] = new Object(); // Red Elixir
      invInfo[787].name = 'Red Elixir';
      invInfo[787].singular = 'Red Elixir';
      invInfo[787].plural = 'Red Elixirs';
      invInfo[1101] = new Object(); // Green Elixir
      invInfo[1101].name = 'Green Elixir';
      invInfo[1101].singular = 'Green Elixir';
      invInfo[1101].plural = 'Green Elixirs';
      invInfo[1321] = new Object(); // Dragon Tear
      invInfo[1321].name = 'Dragon Tear';
      invInfo[1321].singular = 'Dragon Tear';
      invInfo[1321].plural = 'Dragon Tears';

      // jobReq entries (used for battles)
      jobReq[0] = new Object(); // DEFAULT FIGHT OPTIONS
      jobReq[0].attack = 1;
      jobReq[0].healthMin = attribs.healthMax;
      jobReq[0].energyMin = attribs.energyMax;
      jobReq[0].healthHealMin = attribs.healthMax * 0.75;
      jobReq[0].energyHealMin = 8;
      //jobReq[538] = new Object(); // Goblin @ Throncrest
      //jobReq[538].attack = 1;
      //jobReq[538].healthMin = 30;
      //jobReq[538].energyMin = 32;
      //jobReq[538].healthHealMin = 30;
      //jobReq[538].energyHealMin = 8;
      //jobReq[520] = new Object(); // Coyote @ East Leafy Forest 1
      //jobReq[520].attack = 1;
      //jobReq[520].healthMin = 30;
      //jobReq[520].energyMin = 32;
      //jobReq[520].healthHealMin = 30;
      //jobReq[520].energyHealMin = 8;
      //jobReq[523] = new Object(); // Vikram @ Chandabrook Bridge
      //jobReq[523].attack = 1;
      //jobReq[523].healthMin = attribs.healthMax;
      //jobReq[523].energyMin = attribs.energyMax;
      //jobReq[523].healthHealMin = 60;
      //jobReq[523].energyHealMin = 8;
      //jobReq[529] = new Object(); // Brown Back Auroch @ Crossing the Desert 2
      //jobReq[529].attack = 1;
      //jobReq[529].healthMin = 30;
      //jobReq[529].energyMin = 32;
      //jobReq[529].healthHealMin = 30;
      //jobReq[529].energyHealMin = 8;
      //jobReq[522] = new Object(); // Desert Wolf @ Crossing the Desert 2
      //jobReq[522].attack = 1;
      //jobReq[522].healthMin = 30;
      //jobReq[522].energyMin = 32;
      //jobReq[522].healthHealMin = 30;
      //jobReq[522].energyHealMin = 8;
      //jobReq[524] = new Object(); // Mystic Stag @ Lindellin Forest 1
      //jobReq[524].attack = 1;
      //jobReq[524].healthMin = 60;
      //jobReq[524].energyMin = 40;
      //jobReq[524].healthHealMin = 45;
      //jobReq[524].energyHealMin = 8;
      //jobReq[533] = new Object(); // Onx @ Lindellin Forest 2
      //jobReq[533].attack = 1;
      //jobReq[533].healthMin = 80;
      //jobReq[533].energyMin = 40;
      //jobReq[533].healthHealMin = 45;
      //jobReq[533].energyHealMin = 8;
      //jobReq[534] = new Object(); // Norg @ Lindellin Forest 2
      //jobReq[534].attack = 1;
      //jobReq[534].healthMin = 80;
      //jobReq[534].energyMin = 40;
      //jobReq[534].healthHealMin = 45;
      //jobReq[534].energyHealMin = 8;
      //jobReq[32] = new Object(); // Shadow Knives Henchmen @ Tarnwood Bridge
      //jobReq[32].attack = 1;
      //jobReq[32].healthMin = attribs.healthMax;
      //jobReq[32].energyMin = attribs.energyMax;
      //jobReq[32].healthHealMin = 75;
      //jobReq[32].energyHealMin = 8;
      //jobReq[543] = new Object(); // Forest Troll @ East Lindellin Forest 2
      //jobReq[543].attack = 1;
      //jobReq[543].healthMin = 80;
      //jobReq[543].energyMin = 40;
      //jobReq[543].healthHealMin = 75;
      //jobReq[543].energyHealMin = 8;
      //jobReq[513] = new Object(); // Young Boar @ East Lindellin Forest 2
      //jobReq[513].attack = 1;
      //jobReq[513].healthMin = 80;
      //jobReq[513].energyMin = 40;
      //jobReq[513].healthHealMin = 75;
      //jobReq[513].energyHealMin = 8;
      //jobReq[550] = new Object(); // Shambling Bear @ Lindellin Forest 4
      //jobReq[550].attack = 1;
      //jobReq[550].healthMin = 80;
      //jobReq[550].energyMin = 40;
      //jobReq[550].healthHealMin = 75;
      //jobReq[550].energyHealMin = 8;
      //jobReq[551] = new Object(); // Woodland Dragon @ West Lindellin Forest 2
      //jobReq[551].attack = 1;
      //jobReq[551].healthMin = 80;
      //jobReq[551].energyMin = 40;
      //jobReq[551].healthHealMin = 75;
      //jobReq[551].energyHealMin = 8;
      //jobReq[552] = new Object(); // Rock Golem @ West Lindellin Forest 1
      //jobReq[552].attack = 1;
      //jobReq[552].healthMin = 80;
      //jobReq[552].energyMin = 80;
      //jobReq[552].healthHealMin = 75;
      //jobReq[552].energyHealMin = 8;
      //jobReq[556] = new Object(); // Lake Dragon @ Across Grandeur Lake
      //jobReq[556].attack = 1;
      //jobReq[556].healthMin = 80;
      //jobReq[556].energyMin = 80;
      //jobReq[556].healthHealMin = 100;
      //jobReq[556].energyHealMin = 8;
      //jobReq[561] = new Object(); // Ogre @ North Whispering Forest
      //jobReq[561].attack = 1;
      //jobReq[561].healthMin = 80;
      //jobReq[561].energyMin = 80;
      //jobReq[561].healthHealMin = 100;
      //jobReq[561].energyHealMin = 8;
      //jobReq[563] = new Object(); // Orc Scout @ South Whispering Forest
      //jobReq[563].attack = 1;
      //jobReq[563].healthMin = 80;
      //jobReq[563].energyMin = 80;
      //jobReq[563].healthHealMin = 100;
      //jobReq[563].energyHealMin = 8;
      //jobReq[564] = new Object(); // Orc Pirate @ Farrian Sea 3
      //jobReq[564].attack = 1;
      //jobReq[564].healthMin = 80;
      //jobReq[564].energyMin = 80;
      //jobReq[564].healthHealMin = 100;
      //jobReq[564].energyHealMin = 8;
      //jobReq[565] = new Object(); // Orc First Mate @ Farrian Sea 3
      //jobReq[565].attack = 1;
      //jobReq[565].healthMin = 80;
      //jobReq[565].energyMin = 80;
      //jobReq[565].healthHealMin = 100;
      //jobReq[565].energyHealMin = 8;
      //jobReq[566] = new Object(); // Orc Lieutenant @ Farrian Sea 3
      //jobReq[566].attack = 1;
      //jobReq[566].healthMin = 100;
      //jobReq[566].energyMin = 100;
      //jobReq[566].healthHealMin = 100;
      //jobReq[566].energyHealMin = 8;
      //jobReq[478] = new Object(); // Orc Captain @ Farrian Sea 3
      //jobReq[478].attack = 1;
      //jobReq[478].healthMin = attribs.healthMax;
      //jobReq[478].energyMin = attribs.energyMax;
      //jobReq[478].healthHealMin = 125;
      //jobReq[478].energyHealMin = 8;
      //jobReq[494] = new Object(); // Sand Diver @ Windy Triangle Intersection
      //jobReq[494].attack = 1;
      //jobReq[494].healthMin = 100;
      //jobReq[494].energyMin = 100;
      //jobReq[494].healthHealMin = 100;
      //jobReq[494].energyHealMin = 8;
      //jobReq[495] = new Object(); // Phoenix @ Windy Triangle West
      //jobReq[495].attack = 1;
      //jobReq[495].healthMin = attribs.healthMax * 0.5;
      //jobReq[495].energyMin = attribs.energyMax * 0.5;
      //jobReq[495].healthHealMin = attribs.healthMax * 0.5;
      //jobReq[495].energyHealMin = 8;
      //jobReq[504] = new Object(); // Drones @ Kalamar West Gate
      //jobReq[504].attack = 1;
      //jobReq[504].healthMin = attribs.healthMax;
      //jobReq[504].energyMin = attribs.energyMax;
      //jobReq[504].healthHealMin = 175;
      //jobReq[504].energyHealMin = 8;
      //jobReq[505] = new Object(); // Sea Beast @ Boat Ride
      //jobReq[505].attack = 1;
      //jobReq[505].healthMin = attribs.healthMax;
      //jobReq[505].energyMin = attribs.energyMax;
      //jobReq[505].healthHealMin = 185;
      //jobReq[505].energyHealMin = 8;
      //jobReq[1198] = new Object(); // Skeleton Warrior @ Kyndale
      //jobReq[1198].attack = 1;
      //jobReq[1198].healthMin = attribs.healthMax * 0.75;
      //jobReq[1198].energyMin = attribs.energyMax * 0.75;
      //jobReq[1198].healthHealMin = 185;
      //jobReq[1198].energyHealMin = 8;
      //jobReq[1199] = new Object(); // Clanks @ Kyndale
      //jobReq[1199].attack = 1;
      //jobReq[1199].healthMin = attribs.healthMax;
      //jobReq[1199].energyMin = attribs.energyMax;
      //jobReq[1199].healthHealMin = 200;
      //jobReq[1199].energyHealMin = 8;
      //jobReq[1200] = new Object(); // Bones @ Kyndale
      //jobReq[1200].attack = 1;
      //jobReq[1200].healthMin = attribs.healthMax;
      //jobReq[1200].energyMin = attribs.energyMax;
      //jobReq[1200].healthHealMin = 200;
      //jobReq[1200].energyHealMin = 8;
      //jobReq[1201] = new Object(); // Nightbane @ Kyndale
      //jobReq[1201].attack = 1;
      //jobReq[1201].healthMin = attribs.healthMax;
      //jobReq[1201].energyMin = attribs.energyMax;
      //jobReq[1201].healthHealMin = 200;
      //jobReq[1201].energyHealMin = 8;
      //jobReq[1202] = new Object(); // Bone Mage @ Kyndale Dock
      //jobReq[1202].attack = 1;
      //jobReq[1202].healthMin = attribs.healthMax;
      //jobReq[1202].energyMin = attribs.energyMax;
      //jobReq[1202].healthHealMin = 200;
      //jobReq[1202].energyHealMin = 8;
      //jobReq[1256] = new Object(); // Sea Hydra @ Crossing the Farrian (tactic: wait for energy drain and then kill it)
      //jobReq[1256].attack = 1;
      //jobReq[1256].healthMin = attribs.healthMax;
      //jobReq[1256].energyMin = attribs.energyMax;
      //jobReq[1256].healthHealMin = 230;
      //jobReq[1256].energyHealMin = 8;
      //jobReq[1257] = new Object(); // Savannah Lion @ South Mistyvale Plains
      //jobReq[1257].attack = 1;
      //jobReq[1257].healthMin = attribs.healthMax;
      //jobReq[1257].energyMin = attribs.energyMax;
      //jobReq[1257].healthHealMin = 150;
      //jobReq[1257].energyHealMin = 8;
      //jobReq[1258] = new Object(); // @
      //jobReq[1258].attack = 1;
      //jobReq[1258].healthMin = attribs.healthMax;
      //jobReq[1258].energyMin = attribs.energyMax;
      //jobReq[1258].healthHealMin = 200;
      //jobReq[1258].energyHealMin = 8;
      //jobReq[1259] = new Object(); //  @
      //jobReq[1259].attack = 1;
      //jobReq[1259].healthMin = attribs.healthMax;
      //jobReq[1259].energyMin = attribs.energyMax;
      //jobReq[1259].healthHealMin = 200;
      //jobReq[1259].energyHealMin = 8;
      //jobReq[1327] = new Object(); // Forest Drake @ South Oakwood Forest 1
      //jobReq[1327].attack = 1;
      //jobReq[1327].healthMin = attribs.healthMax;
      //jobReq[1327].energyMin = attribs.energyMax;
      //jobReq[1327].healthHealMin = 250;
      //jobReq[1327].energyHealMin = 8;
      //jobReq[1330] = new Object(); // Greenspell Dragon @ South Oakwood Forest 1
      //jobReq[1330].attack = 1;
      //jobReq[1330].healthMin = attribs.healthMax;
      //jobReq[1330].energyMin = attribs.energyMax;
      //jobReq[1330].healthHealMin = 250;
      //jobReq[1330].energyHealMin = 8;
      //jobReq[1328] = new Object(); // Elder Seed @ South Oakwood Forest 2
      //jobReq[1328].attack = 1;
      //jobReq[1328].healthMin = attribs.healthMax;
      //jobReq[1328].energyMin = attribs.energyMax;
      //jobReq[1328].healthHealMin = 250;
      //jobReq[1328].energyHealMin = 8;
      //jobReq[1329] = new Object(); // Forest Elemental @ South Oakwood Forest 2
      //jobReq[1329].attack = 1;
      //jobReq[1329].healthMin = attribs.healthMax;
      //jobReq[1329].energyMin = attribs.energyMax;
      //jobReq[1329].healthHealMin = 250;
      //jobReq[1329].energyHealMin = 8;
      //jobReq[1331] = new Object(); // Tempest Druid @ Oakwood Forest Dungeon 2
      //jobReq[1331].attack = 1;
      //jobReq[1331].healthMin = attribs.healthMax;
      //jobReq[1331].energyMin = attribs.energyMax;
      //jobReq[1331].healthHealMin = 250;
      //jobReq[1331].energyHealMin = 8;
      //jobReq[1332] = new Object(); // Tempest Druid @ Oakwood Forest Dungeon 3
      //jobReq[1332].attack = 1;
      //jobReq[1332].healthMin = attribs.healthMax;
      //jobReq[1332].energyMin = attribs.energyMax;
      //jobReq[1332].healthHealMin = 250;
      //jobReq[1332].energyHealMin = 8;
      //jobReq[1333] = new Object(); // Swamp Drake @ Oakwood Forest Dungeon 4
      //jobReq[1333].attack = 1;
      //jobReq[1333].healthMin = attribs.healthMax;
      //jobReq[1333].energyMin = attribs.energyMax;
      //jobReq[1333].healthHealMin = 250;
      //jobReq[1333].energyHealMin = 8;
      //jobReq[1334] = new Object(); // Thorny Dragon @ Oakwood Forest Dungeon 5
      //jobReq[1334].attack = 1;
      //jobReq[1334].healthMin = attribs.healthMax;
      //jobReq[1334].energyMin = attribs.energyMax;
      //jobReq[1334].healthHealMin = 250;
      //jobReq[1334].energyHealMin = 8;
      //jobReq[1335] = new Object(); // Dreamcutter Dragons @ Oakwood Forest Dungeon 6
      //jobReq[1335].attack = 1;
      //jobReq[1335].healthMin = attribs.healthMax;
      //jobReq[1335].energyMin = attribs.energyMax;
      //jobReq[1335].healthHealMin = 325;
      //jobReq[1335].energyHealMin = 8;
      //jobReq[1384] = new Object(); // Captain Reith @ Hidden Path - Guldin Falls
      //jobReq[1384].attack = 1;
      //jobReq[1384].healthMin = attribs.healthMax;
      //jobReq[1384].energyMin = attribs.energyMax;
      //jobReq[1384].healthHealMin = 325;
      //jobReq[1384].energyHealMin = 8;
      //jobReq[1385] = new Object(); // Twin Giants @ Guldin Falls Road 3
      //jobReq[1385].attack = 1;
      //jobReq[1385].healthMin = attribs.healthMax;
      //jobReq[1385].energyMin = attribs.energyMax;
      //jobReq[1385].healthHealMin = 325;
      //jobReq[1385].energyHealMin = 8;
      //jobReq[1494] = new Object(); // Vikram the Necromancer @ Kalamar
      //jobReq[1494].attack = 1;
      //jobReq[1494].healthMin = attribs.healthMax;
      //jobReq[1494].energyMin = attribs.energyMax;
      //jobReq[1494].healthHealMin = 450;
      //jobReq[1494].energyHealMin = 5;
      //jobReq[1542] = new Object(); // Eartha @ Falhill Dungeon 1
      //jobReq[1542].attack = 1;
      //jobReq[1542].healthMin = attribs.healthMax;
      //jobReq[1542].energyMin = attribs.energyMax;
      //jobReq[1542].healthHealMin = 750;
      //jobReq[1542].energyHealMin = 8;
      jobReq[513] = new Object(); // Young Boar @ Boar Island Beach
      jobReq[513].attack = 1;
      jobReq[513].healthMin = 30;
      jobReq[513].energyMin = 30;
      jobReq[513].healthHealMin = 20;
      jobReq[513].energyHealMin = 8;
      jobReq[514] = new Object(); // Red Boar @ Boar Island 1
      jobReq[514].attack = 1;
      jobReq[514].healthMin = 30;
      jobReq[514].energyMin = 30;
      jobReq[514].healthHealMin = 20;
      jobReq[514].energyHealMin = 8;
      jobReq[515] = new Object(); // Razorback Boar @ Boar Island 1
      jobReq[515].attack = 1;
      jobReq[515].healthMin = 50;
      jobReq[515].energyMin = 50;
      jobReq[515].healthHealMin = 30;
      jobReq[515].energyHealMin = 8;
      jobReq[519] = new Object(); // King Boar @ Boar Island 2
      jobReq[519].attack = 1;
      jobReq[519].healthMin = 30;
      jobReq[519].energyMin = 30;
      jobReq[519].healthHealMin = 20;
      jobReq[519].energyHealMin = 8;

      // set some state info
      var thisJobReq = jobReq[pageId] || (isAttack ? jobReq[0] : jobReq[pageId]); // the job or the default-if-fighting (used in the fight itself, not from the quests page)
      var autoAttackEnabled = GM_getValue('autofight/attack') || 0; // enable if you don't wish to pick your own attacks
      var autoHealEnabled = GM_getValue('autofight/heal') || 0; // enable if you don't wish to pick your own heals
      var autoEnergyEnabled = GM_getValue('autofight/energy') || 0; // enable if you don't wish to pick your own energy
      var autoRunAway = GM_getValue('autofight/runaway') || 0; // enable if you want to auto-runaway when out of needed supplies
      var autoDefUpEnabled = GM_getValue('autofight/defup') || 0; // enable if you want to autouse Defense Up spell
      var autoAtkUpEnabled = GM_getValue('autofight/atkup') || 0; // enable if you want to autouse Attack Up spell

      // clear any attack-specific state info
      if (!isAttack)
      {
        GM_setValue('attack/hasDefUp', 0);
        GM_setValue('attack/hasAtkUp', 0);
      }

      // monster info
      if (isAttack)
      {
        // auto-play button
        var autoPlayRepeatAry = (GM_getValue('autoplay/repeat') || '').split(',');
        var autoPlayRepeatBtn = document.createElement('input');
        autoPlayRepeatBtn.setAttribute('value', 'Auto Play Repeat');
        autoPlayRepeatBtn.setAttribute('type', 'button');
        autoPlayRepeatBtn.setAttribute('jobId', pageName);
        autoPlayRepeatBtn.style.width = '150px';
        autoPlayRepeatBtn.style.backgroundColor = (autoPlayRepeatAry.indexOf(pageName) >= 0 ? '#66CC66' : '#CC6666');
        autoPlayRepeatBtn.addEventListener('click', function(event) {
          var btn = event.wrappedJSObject.originalTarget;
          var added = autoPlayRepeat(btn.getAttribute('jobId'));
          btn.style.backgroundColor = (added ? '#66CC66' : '#CC6666');
        }, false);
        toggleRightContainer.appendChild(autoPlayRepeatBtn);
        toggleRightContainer.appendChild(document.createElement('br'));

        // autofight/attack button
        var autoAttackToggle = GM_getValue('autofight/attack') || 0;
        var autoAttackBtn = document.createElement('input');
        autoAttackBtn.setAttribute('value', 'Auto Attack');
        autoAttackBtn.setAttribute('type', 'button');
        autoAttackBtn.setAttribute('jobId', pageName);
        autoAttackBtn.style.width = '150px';
        autoAttackBtn.style.backgroundColor = (autoAttackToggle > 0 ? '#66CC66' : '#CC6666');
        autoAttackBtn.addEventListener('click', function(event) {
          var btn = event.wrappedJSObject.originalTarget;
          GM_setValue('autofight/attack', !GM_getValue('autofight/attack'));
          autoAttackEnabled = GM_getValue('autofight/attack');
          btn.style.backgroundColor = (autoAttackEnabled ? '#66CC66' : '#CC6666');
        }, false);
        toggleRightContainer.appendChild(autoAttackBtn);
        toggleRightContainer.appendChild(document.createElement('br'));

        // autofight/heal button
        var autoHealToggle = GM_getValue('autofight/heal') || 0;
        var autoHealBtn = document.createElement('input');
        autoHealBtn.setAttribute('value', 'Auto Heal');
        autoHealBtn.setAttribute('type', 'button');
        autoHealBtn.setAttribute('jobId', pageName);
        autoHealBtn.style.width = '150px';
        autoHealBtn.style.backgroundColor = (autoHealToggle > 0 ? '#66CC66' : '#CC6666');
        autoHealBtn.addEventListener('click', function(event) {
          var btn = event.wrappedJSObject.originalTarget;
          GM_setValue('autofight/heal', !GM_getValue('autofight/heal'));
          autoHealEnabled = GM_getValue('autofight/heal');
          btn.style.backgroundColor = (autoHealEnabled ? '#66CC66' : '#CC6666');
        }, false);
        toggleRightContainer.appendChild(autoHealBtn);
        toggleRightContainer.appendChild(document.createElement('br'));

        // autofight/energy button
        var autoEnergyToggle = GM_getValue('autofight/energy') || 0;
        var autoEnergyBtn = document.createElement('input');
        autoEnergyBtn.setAttribute('value', 'Auto Energy');
        autoEnergyBtn.setAttribute('type', 'button');
        autoEnergyBtn.setAttribute('jobId', pageName);
        autoEnergyBtn.style.width = '150px';
        autoEnergyBtn.style.backgroundColor = (autoEnergyToggle > 0 ? '#66CC66' : '#CC6666');
        autoEnergyBtn.addEventListener('click', function(event) {
          var btn = event.wrappedJSObject.originalTarget;
          GM_setValue('autofight/energy', !GM_getValue('autofight/energy'));
          autoEnergyEnabled = GM_getValue('autofight/energy');
          btn.style.backgroundColor = (autoEnergyEnabled ? '#66CC66' : '#CC6666');
        }, false);
        toggleRightContainer.appendChild(autoEnergyBtn);
        toggleRightContainer.appendChild(document.createElement('br'));

        // autofight/runaway button
        var autoRunAwayToggle = GM_getValue('autofight/runaway') || 0;
        var autoRunAwayBtn = document.createElement('input');
        autoRunAwayBtn.setAttribute('value', 'Auto Run Away');
        autoRunAwayBtn.setAttribute('type', 'button');
        autoRunAwayBtn.setAttribute('jobId', pageName);
        autoRunAwayBtn.style.width = '150px';
        autoRunAwayBtn.style.backgroundColor = (autoRunAwayToggle > 0 ? '#66CC66' : '#CC6666');
        autoRunAwayBtn.addEventListener('click', function(event) {
          var btn = event.wrappedJSObject.originalTarget;
          GM_setValue('autofight/runaway', !GM_getValue('autofight/runaway'));
          autoRunAway = GM_getValue('autofight/runaway');
          btn.style.backgroundColor = (autoRunAway ? '#66CC66' : '#CC6666');
        }, false);
        toggleRightContainer.appendChild(autoRunAwayBtn);
        toggleRightContainer.appendChild(document.createElement('br'));

        // autofight/defup button
        var autoDefUpToggle = GM_getValue('autofight/defup') || 0;
        var autoDefUpBtn = document.createElement('input');
        autoDefUpBtn.setAttribute('value', 'Auto Defense Up');
        autoDefUpBtn.setAttribute('type', 'button');
        autoDefUpBtn.setAttribute('jobId', pageName);
        autoDefUpBtn.style.width = '150px';
        autoDefUpBtn.style.backgroundColor = (autoDefUpToggle > 0 ? '#66CC66' : '#CC6666');
        autoDefUpBtn.addEventListener('click', function(event) {
          var btn = event.wrappedJSObject.originalTarget;
          GM_setValue('autofight/defup', !GM_getValue('autofight/defup'));
          autoDefUpEnabled = GM_getValue('autofight/defup');
          btn.style.backgroundColor = (autoDefUpEnabled ? '#66CC66' : '#CC6666');
        }, false);
        toggleRightContainer.appendChild(autoDefUpBtn);
        toggleRightContainer.appendChild(document.createElement('br'));

        // autofight/atkup button
        var autoAtkUpToggle = GM_getValue('autofight/atkup') || 0;
        var autoAtkUpBtn = document.createElement('input');
        autoAtkUpBtn.setAttribute('value', 'Auto Attack Up');
        autoAtkUpBtn.setAttribute('type', 'button');
        autoAtkUpBtn.setAttribute('jobId', pageName);
        autoAtkUpBtn.style.width = '150px';
        autoAtkUpBtn.style.backgroundColor = (autoAtkUpToggle > 0 ? '#66CC66' : '#CC6666');
        autoAtkUpBtn.addEventListener('click', function(event) {
          var btn = event.wrappedJSObject.originalTarget;
          GM_setValue('autofight/atkup', !GM_getValue('autofight/atkup'));
          autoAtkUpEnabled = GM_getValue('autofight/atkup');
          btn.style.backgroundColor = (autoAtkUpEnabled ? '#66CC66' : '#CC6666');
        }, false);
        toggleRightContainer.appendChild(autoAtkUpBtn);
        toggleRightContainer.appendChild(document.createElement('br'));

        //say('<i><b>Battle!</b></i>', 1);
        var vsTDs = $J('table.vsBox td > h1').parent();
        var monsterTD = vsTDs.eq(vsTDs.length - 1);
        // monster name
        attribs.monsterName = $J(monsterTD).find("h1").eq(0).text();
        // monster health
        var monsterHealthMatch = $J(monsterTD).find("td:contains('health')").eq(0).text().match("([0-9]+)/([0-9]+)");
        attribs.monsterHealth = monsterHealthMatch[1];
        attribs.monsterHealthMax = monsterHealthMatch[2];
        //say("Monster Health: " + attribs.monsterHealth, 1);
        //say("Monster Health Max: " + attribs.monsterHealthMax, 1);
        // monster energy
        var monsterEnergyMatch = $J(monsterTD).find("td:contains('energy')").eq(0).text().match("([0-9]+)/([0-9]+)");
        attribs.monsterEnergy = monsterEnergyMatch[1];
        attribs.monsterEnergyMax = monsterEnergyMatch[2];
        //say("Monster Energy: " + attribs.monsterEnergy, 1);
        //say("Monster Energy Max: " + attribs.monsterEnergyMax, 1);
        // monster attack
        var monsterAttackMatch = $J(monsterTD).find("td:contains('Atk')").eq(0).text().match("Atk: ([0-9]+)");
        attribs.monsterAttack = monsterAttackMatch[1];
        //say("Monster Attack: " + attribs.monsterAttack, 1);
        // monster defense
        var monsterDefenseMatch = $J(monsterTD).find("td:contains('Def')").eq(0).text().match("Atk: ([0-9]+)");
        attribs.monsterDefense = monsterDefenseMatch[1];
        //say("Monster Defense: " + attribs.monsterDefense, 1);
        // log (not for spying, intended for mapping and boss info)
        var logPixel = document.createElement('img');
        logPixel.setAttribute('height', 1);
        logPixel.setAttribute('width', 1);
        logPixel.setAttribute('src', 'http://www.dustywilson.com/hammerfall/log.cgi?v=' + version + '&ur=' + ur + '&type=attack&id=' + pageName + '&h=' + attribs.monsterHealth + '&hm=' + attribs.monsterHealthMax + '&e=' + attribs.monsterEnergy + '&em=' + attribs.monsterEnergyMax + '&a=' + attribs.monsterAttack + '&d=' + attribs.monsterDefense + '&n=' + escape(attribs.monsterName) + '&l=' + escape(location) + '&pl=' + attribs.level + '&pg=' + attribs.gold + '&ph=' + attribs.health + '&phm=' + attribs.healthMax + '&ps=' + attribs.stamina + '&psm=' + attribs.staminaMax + '&pe=' + attribs.energy + '&pem=' + attribs.energyMax + '&pxp=' + attribs.exp);
        document.getElementsByTagName('body')[0].appendChild(logPixel);
      }

      // if we're on the quest screen...
      if (pageName == 'quest')
      {
        // show viri button
        var showViriToggle = GM_getValue('show/viri') || 0;
        var showViriBtn = document.createElement('input');
        showViriBtn.setAttribute('value', 'Show Viri Items');
        showViriBtn.setAttribute('type', 'button');
        showViriBtn.style.width = '150px';
        showViriBtn.style.backgroundColor = (showViriToggle > 0 ? '#66CC66' : '#CC6666');
        showViriBtn.addEventListener('click', function(event) {
          var btn = event.wrappedJSObject.originalTarget;
          GM_setValue('show/viri', !GM_getValue('show/viri'));
          showViriEnabled = GM_getValue('show/viri');
          btn.style.backgroundColor = (showViriEnabled ? '#66CC66' : '#CC6666');
          if (showViriEnabled)
          {
            $J(viriContainer).fadeIn(100);
          }
          else
          {
            $J(viriContainer).fadeOut(250);
          }
        }, false);
        toggleRightContainer.appendChild(showViriBtn);
        toggleRightContainer.appendChild(document.createElement('br'));
      }

      // perform auto-fight
      if (isAttack && thisJobReq && thisJobReq.attack)
      {
        say("<b>Health Min:</b> " + thisJobReq.healthHealMin, 1);
        say("<b>Energy Min:</b> " + thisJobReq.energyHealMin, 1);
        say("<b>Gold:</b> " + attribs.gold, 1);

        recharging = 0; // no recharge during attack
        if (thisJobReq.healthHealMin <= attribs.health)
        {
          if (thisJobReq.energyHealMin <= attribs.energy)
          {
            if (autoDefUpEnabled && !GM_getValue('attack/hasDefUp') && attribs.energy >= 25 && attribs.monsterEnergy > 20)
            {
              autoPlay.push(374); // Heal spell
              GM_setValue('attack/hasDefUp', 1);
            }
            else if (autoAtkUpEnabled && !GM_getValue('attack/hasAtkUp') && attribs.energy >= 100 && attribs.monsterEnergy > 20)
            {
              autoPlay.push(373); // Power Up spell
              GM_setValue('attack/hasAtkUp', 1);
            }
            if (autoAttackEnabled)
            {
              if (attribs.energy >= 5 && (pageId == "1494" || pageId == "1744" || pageId == "991745") && attribs.monsterEnergy >= 100) autoPlay.push(20); // basic attack to Vikram (he heals too fast for anything else it seems? wait until his energy is low enough before really attacking)
              if (attribs.energy >= 25 && attribs.monsterHealth > 1250) autoPlay.push(375); // oblivion
              //if (attribs.energy >= 50) autoPlay.push(370); // inferno
              //if (attribs.gold >= 150 && attribs.energy >= 5) autoPlay.push(366); // gold bomb
              if (attribs.energy >= 10 && attribs.health - thisJobReq.healthHealMin >= 50) autoPlay.push(46); // force strike
              if (attribs.energy >= 10) autoPlay.push(367); // fire blast
              if (attribs.energy >= 8) autoPlay.push(45); // two-handed slash
              if (attribs.energy >= 7) autoPlay.push(22); // double strike
              if (attribs.energy >= 6) autoPlay.push(31); // stun
              if (attribs.energy >= 5) autoPlay.push(20); // basic
            }
          }
          else
          {
            say("<b style='color: red'><i>NEED MORE ENERGY!</i></b>", 1);
            if (autoEnergyEnabled)
            {
              if (attribs.monsterEnergy > 20)
              { // don't waste big energy items if the monster can't attack you
                if (attribs.energyMax - attribs.energy >= 125) autoPlay.push(1321, 1101, 787, 786, 785); // dragontear +125, greenelixir +100, redelixir +80, blueelixir +60, sprites +40
                if (attribs.energyMax - attribs.energy >= 100) autoPlay.push(1101, 787, 1321, 786, 785); // greenelixir +100, redelixir +80, dragontear +125, blueelixir +60, sprites +40
                if (attribs.energyMax - attribs.energy >= 60) autoPlay.push(786, 787, 1101, 1321, 785); // blueelixir +60, redelixir +80, greenelixir +100, dragontear +125, sprites +40
                if (attribs.energyMax - attribs.energy >= 40) autoPlay.push(785, 786, 787, 1101, 1321); // sprites +40, blueelixir +60, redelixir +80, greenelixir +100, dragontear +125
              }
              autoPlay.push(785, 786, 787, 1101, 1321); // sprites +40, blueelixir +60, redelixir +80, greenelixir +100, dragontear +125
              if (autoRunAway)
              {
                autoPlay.push(21); // runaway
              }
            }
          }
        }
        else
        {
          say("<b style='color: red'><i>NEED MORE HEALTH!</i></b>", 1);
          if (autoHealEnabled)
          {
            if (attribs.healthMax - attribs.health >= 450) autoPlay.push(776, 775, 774, 773, 772, 771, 769); // dragon flesh +500, dumplings +300, apples +200, fish +150, watermelon +100, mushrooms +75, fresh water +25
            if ((attribs.health + 30) / attribs.healthMax < 0.7 && attribs.energy >= 25) autoPlay.push(1080); // heal spell (+30% of max health + 30 hp)
            if (attribs.healthMax - attribs.health >= 275) autoPlay.push(775, 774, 776, 773, 772, 771, 769); // dumplings +300, apples +200, dragon flesh +500, fish +150, watermelon +100, mushrooms +75, fresh water +25
            if (attribs.healthMax - attribs.health >= 190) autoPlay.push(774, 775, 773, 772, 776, 771, 769); // apples +200, dumplings +300, fish +150, watermelon +100, dragon flesh +500, mushrooms +75, fresh water +25
            if (attribs.healthMax - attribs.health >= 150) autoPlay.push(773, 774, 775, 772, 771, 776, 769); // fish +150, apples +200, dumplings +300, watermelon +100, mushrooms +75, dragon flesh +500, fresh water +25
            if (attribs.healthMax - attribs.health >= 100) autoPlay.push(772, 773, 771, 774, 775, 776, 769); // watermelon +100, fish +150, mushrooms +75, apples +200, dumplings +300, dragon flesh +500, fresh water +25
            if (attribs.healthMax - attribs.health >= 75) autoPlay.push(771, 772, 773, 769, 774, 775, 776); // mushrooms +75, watermelon +100, fish +150, fresh water +25, apples +200, dumplings +300, dragon flesh +500
            if (attribs.healthMax - attribs.health >= 25) autoPlay.push(769, 771, 772, 773, 774, 775, 776); // fresh water +25, mushrooms +75, watermelon +100, fish +150, apples +200, dumplings +300, dragon flesh +500
            autoPlay.push(769, 771, 772, 773, 774, 775, 776); // fresh water +25, mushrooms +75, watermelon +100, fish +150, apples +200, dumplings +300, dragon flesh +500
            if (autoRunAway)
            {
              autoPlay.push(21); // runaway
            }
          }
        }
      }

      // if we're on the guild screen...
      if (pageName == 'myguild')
      {
        say('<i><b>Viewing My Guild</b></i>', 1);
        var allMembers = $J('h1:contains("Friends") ~ table tr td div:nth-child(2)');
        for (var i=0; i<allMembers.length; i++)
        {
          memberNameDiv = allMembers[i];
          var x = i + 1;
          if (x <= attribs.guildEffective)
          {
            $J(memberNameDiv).prepend('<b style="color: green">#' + x + '</b>: ');
          }
          else
          {
            $J(memberNameDiv).prepend('<b style="color: red">#' + x + '</b>: ');
          }
        }
      }

      // dig into the page for all forms we care about
      var allPlayForms = $J('form');
      if (allPlayForms.length)
      {
        for (var i=0; i<allPlayForms.length; i++)
        {
          var form = allPlayForms[i];
          var formAction = form.getAttribute('action');
          var formActionAry = formAction.match('/hammerfall/.*?/([0-9]+)$');
          if (formActionAry)
          {
            var formId = formActionAry[1];
            var section = '';

            var jobName = 'Job #' + formId;
            var jobParent = $J(form).parent().parent().parent().parent().parent().parent();
            var jobNameDiv = $J(jobParent).find('div.itemName');
            if (jobNameDiv)
            {
              jobName = jobNameDiv.text() || jobName;
              jobName = jobName.replace(/\s*\(Back\)\s*/, '');
              jobName = jobName.replace(/^\s+/, '');
              jobName = jobName.replace(/\s+$/, '');
              var jobImageCell = $J(jobParent).find('td.itemCol0');
              if (jobImageCell)
              {
                jobImageCell = jobImageCell[0];
                if (jobImageCell)
                {
                  var jobIdentify = document.createElement('div');
                  jobIdentify.innerHTML = '<div style="width: 120px; padding: 2px; margin: 2px; text-align: center"><nobr><b>Job ID: ' + formId + '</b><br /><b>' + section + '</b></nobr></div>';
                  jobImageCell.appendChild(jobIdentify);
                }
              }
            }

            // if we're on the quest screen...
            if (pageName == 'quest')
            {
              var myH1 = $J(form).parent().parent().parent().parent().parent().parent().parent().parent().prevAll('h1').eq(0);
              section = $J(myH1).text() || 'Unknown';
              form.setAttribute('jobtype', section);

              // log (not for spying, intended for mapping)
              var logPixel = document.createElement('img');
              logPixel.setAttribute('height', 1);
              logPixel.setAttribute('width', 1);
              logPixel.setAttribute('src', 'http://www.dustywilson.com/hammerfall/log.cgi?v=' + version + '&ur=' + ur + '&type=questitem&l=' + escape(location) + '&t=' + escape(section) + '&id=' + formId + '&n=' + escape(jobName) + '&pl=' + attribs.level + '&pg=' + attribs.gold + '&ph=' + attribs.health + '&phm=' + attribs.healthMax + '&ps=' + attribs.stamina + '&psm=' + attribs.staminaMax + '&pe=' + attribs.energy + '&pem=' + attribs.energyMax + '&pxp=' + attribs.exp);
              document.getElementsByTagName('body')[0].appendChild(logPixel);

              $J(form).find('input').css('height', '50px');

              form.style.textAlign = 'right';

              var brTag = document.createElement('br');
              form.appendChild(brTag);

              var autoPlayOnceAry = (GM_getValue('autoplay/once') || '').split(',');
              var autoPlayOnceBtn = document.createElement('input');
              autoPlayOnceBtn.setAttribute('value', 'Auto Play Once');
              autoPlayOnceBtn.setAttribute('type', 'button');
              autoPlayOnceBtn.setAttribute('jobId', formId);
              autoPlayOnceBtn.style.backgroundColor = (autoPlayOnceAry.indexOf(formId) >= 0 ? '#66CC66' : '#CC6666');
              autoPlayOnceBtn.style.margin = '2px';
              autoPlayOnceBtn.addEventListener('click', function(event) {
                var btn = event.wrappedJSObject.originalTarget;
                var added = autoPlayOnce(btn.getAttribute('jobId'));
                btn.style.backgroundColor = (added ? '#66CC66' : '#CC6666');
              }, false);
              form.appendChild(autoPlayOnceBtn);

              var brTag = document.createElement('br');
              form.appendChild(brTag);

              // if the item is a monster...
              if (section == 'Monsters')
              {
                monstersHere[formId] = 1;
              }

              // if the item is NOT a trip...
              if (section != 'Trip')
              {
                var autoPlayRepeatAry = (GM_getValue('autoplay/repeat') || '').split(',');
                var autoPlayRepeatBtn = document.createElement('input');
                autoPlayRepeatBtn.setAttribute('value', 'Auto Play Repeat');
                autoPlayRepeatBtn.setAttribute('type', 'button');
                autoPlayRepeatBtn.setAttribute('jobId', formId);
                autoPlayRepeatBtn.style.backgroundColor = (autoPlayRepeatAry.indexOf(formId) >= 0 ? '#66CC66' : '#CC6666');
                autoPlayRepeatBtn.style.margin = '2px';
                autoPlayRepeatBtn.addEventListener('click', function(event) {
                  var btn = event.wrappedJSObject.originalTarget;
                  var added = autoPlayRepeat(btn.getAttribute('jobId'));
                  btn.style.backgroundColor = (added ? '#66CC66' : '#CC6666');
                }, false);
                form.appendChild(autoPlayRepeatBtn);
              }

              $J(form).find('input').css('width', '150px');
            }

            // if we're on the store page...
            if (pageName == 'store')
            {
              var myH1 = $J(form).parent().parent().parent().parent().parent().parent().parent().parent().prevAll('h1').eq(0);
              section = $J(myH1).text() || 'Unknown';
              form.setAttribute('jobtype', section);

              var costAry = $J(form).parent().parent().parent().find("span.goldDesc").parent().eq(0).text().match("([0-9]+)g");
              var cost = 0;
              if (costAry && costAry.length)
              {
                var cost = costAry[1] || 0;
              }

              // log (not for spying, intended for mapping)
              var logPixel = document.createElement('img');
              logPixel.setAttribute('height', 1);
              logPixel.setAttribute('width', 1);
              logPixel.setAttribute('src', 'http://www.dustywilson.com/hammerfall/log.cgi?v=' + version + '&ur=' + ur + '&type=storeitem&l=' + escape(location) + '&t=' + escape(section) + '&id=' + formId + '&n=' + escape(jobName) + '&c=' + cost + '&pl=' + attribs.level + '&pg=' + attribs.gold + '&ph=' + attribs.health + '&phm=' + attribs.healthMax + '&ps=' + attribs.stamina + '&psm=' + attribs.staminaMax + '&pe=' + attribs.energy + '&pem=' + attribs.energyMax + '&pxp=' + attribs.exp);
              document.getElementsByTagName('body')[0].appendChild(logPixel);
            }
          }
        }
      }

      // auto-set our stamina increment based on possession of these items
      if (GM_getValue('inv/Moon Boots/qty'))
      {
        if (GM_getValue('incr/stamina') != 4)
        {
          say('Setting stamina increment to 4.');
          GM_setValue('incr/stamina', 4);
          attribs.staminaIncrement = 4;
        }
      }
      else if (GM_getValue('inv/Time Powder/qty'))
      {
        if (GM_getValue('incr/stamina') != 3)
        {
          say('Setting stamina increment to 3.');
          GM_setValue('incr/stamina', 3);
          attribs.staminaIncrement = 3;
        }
      }
      else if (GM_getValue('inv/Guide Boots/qty'))
      {
        if (GM_getValue('incr/stamina') != 2)
        {
          say('Setting stamina increment to 2.');
          GM_setValue('incr/stamina', 2);
          attribs.staminaIncrement = 2;
        }
      }
      else
      {
        if (GM_getValue('incr/stamina') != 1)
        {
          say('Setting stamina increment to 1.');
          GM_setValue('incr/stamina', 1);
          attribs.staminaIncrement = 1;
        }
      }

      autoPlayCheck();

      if (recharging)
      {
        setInterval(rechargeStatus, 1000);
      }
    }
    catch(e)
    {
      say(e);
    }
  }

  // if the requested job ID exists on this screen...
  function jobAvailable(id)
  {
    return $J('form[action$="/' + id + '"]').length;
  }

  // determine the order of auto-play
  function autoPlayOrder()
  {
    if (autoPlay.length)
    {
      var autoPlayOrderAry = new Array();
      for (var i=0; i<autoPlay.length; i++)
      {
        var jobId = autoPlay[i];
        if (jobAvailable(jobId)) autoPlayOrderAry.push(jobId);
      }
      if (autoPlayOrderAry.length)
      {
        say("<b>Auto Play Order:</b>");
        for (var i=0; i<autoPlayOrderAry.length; i++)
        {
          var jobId = autoPlayOrderAry[i];
          say("> Job ID: " + jobId);
        }
      }
      else
      {
        say("<b>No Auto Play Jobs in this area.</b>");
      }
    }
    else
    {
      say("<b>No Auto Play Jobs are set.</b>");
    }
  }

  // see if we have any auto-play to do (happens on page load and every time an attribute has increased)
  function autoPlayCheck()
  {
    try
    {
      for (var i in autoPlay)
      {
        var id = autoPlay[i];
        var thisJob = jobReq[id];
        if (!thisJob && !isAttack && monstersHere && monstersHere[id]) thisJob = jobReq[0]; // if it's a monster and no specific entry is set, use the default entry
        var forms = $J('form[action$="/' + id + '"]');
        if (forms.length)
        {
          var form = forms[0];
          var jobParent = $J(form).parent().parent().parent().parent().parent().parent();

          var jobGivesDiv = $J(jobParent).find('td.itemCol1 div.itemGives')[0];
          var jobGivesText = $J(jobGivesDiv).text();
          var expAry = jobGivesText.match('Experience: \\+([0-9]+)');
          if (expAry)
          {
            var experience = expAry[1];
            //say('<b>Job ' + id + ' gives ' + experience + ' Exp.</b>');
            var turnsToLevel = Math.ceil((attribs.expMax - attribs.exp) / experience);
            say('Level up in ' + turnsToLevel + ' turns with job ' + id + '.');
            attribs['expInfo'].innerHTML = turnsToLevel + ' turns @ #' + id;
            $J(attribs['expInfo']).fadeIn(500);
          }

          var jobInfoCell = $J(jobParent).find('td.itemCol2');
          var jobReqItemsDivs = $J(jobInfoCell).find('div[class="requiredItemName"]');
          var inventoryRequiredMet = 1;
          var itemUsed = new Object();
          if (jobReqItemsDivs && jobReqItemsDivs.length)
          {
            for (var iDiv=0; iDiv<jobReqItemsDivs.length; iDiv++)
            {
              var jobReqItemDiv = jobReqItemsDivs[iDiv];
              var itemReq = $J(jobReqItemDiv).text().replace(/^[\r\n\s]+/, '').replace(/[\r\n\s]+$/, '').replace(/[\r\n\s]+/g, ' ');
              var itemUsed = 0;
              if (itemReq.match(/\s+\*\s*$/))
              {
                itemReq = itemReq.replace(/\s+\*\s*$/, '');
                itemUsed = 1;
              }
              var itemQtyReqAry = itemReq.match(/ x([0-9]+)$/);
              var itemQtyReq = 1;
              if (itemQtyReqAry && itemQtyReqAry.length)
              {
                itemQtyReq = itemQtyReqAry[1];
                itemReq = itemReq.replace(/ x([0-9]+)$/, '');
              }
              if (itemUsed)
              {
                itemUsed[itemReq] = itemQtyReq;
              }
              var itemQtyHas = GM_getValue('inv/' + itemReq + '/qty') || 0;
              //say("ITEM: [" + itemReq + "] [" + itemQtyReq + "] [" + itemQtyHas + "]");
              if (parseInt(itemQtyReq) > parseInt(itemQtyHas))
              {
                var itemHfwiki = itemReq.replace(/\s+/g, '-').toLowerCase();
                say('<b style="color: red">Need ' + itemQtyReq + 'x <a style="color: #BBBBFF; text-decoration: underline" target="hfwiki" href="http://hfwiki.wikidot.com/item:' + itemHfwiki + '">' + itemReq + '</a> for job ' + id + '.</b>', 1);
                inventoryRequiredMet = 0;
              }
            }
          }
          // if we have enough of the require items for this job...
          if (inventoryRequiredMet)
          {
            var jobInfoText = $J(jobInfoCell).text();
            var required = 0;
            var staminaAry = jobInfoText.match('Stamina: ([0-9]+)');
            if (staminaAry)
            {
              required = staminaAry[1];
            }
            // got enough stamina?
            if (attribs.stamina >= required)
            {
              // got enough health?
              if (thisJob && thisJob.healthMin > attribs.health)
              {
                say("<b style='color: orange'>Not enough health for job " + id + ".</b>");
              }
              // got enough energy?
              else if (thisJob && thisJob.energyMin > attribs.energy)
              {
                say("<b style='color: orange'>Not enough energy for job " + id + ".</b>");
              }
              // we have enough stamina, health, and energy...
              else
              {
                say("<b style='color: orange'>Auto-play job " + id + ".</b>");
                var item = invInfo[id];
                if (item)
                {
                  say("<b style='color: red'><i>Using a " + item.singular + ".</i></b>");
                  GM_setValue('inv/' + item.name + '/qty', (GM_getValue('inv/' + item.name + '/qty') || 1) - 1);
                }
                for (var itemReq in itemUsed)
                {
                  say("<b style='color: red'>Using " + itemUsed[itemReq] + "x " + itemReq + ".</b>");
                  GM_setValue('inv/' + itemReq + '/qty', (GM_getValue('inv/' + itemReq + '/qty') || itemUsed[itemReq]) - itemUsed[itemReq]);
                }
                var autoPlayOnce = GM_getValue('autoplay/once').split(',');
                for (var ap=0; ap<autoPlayOnce.length; ap++)
                {
                  if (autoPlayOnce[ap] == id)
                  {
                    delete autoPlayOnce[ap];
                  }
                }
                var autoPlayOnceStr = autoPlayOnce.join(',').replace(/,+/g, ',').replace(/^,/g, '').replace(/,$/g, '');
                GM_setValue('autoplay/once', autoPlayOnceStr);
                form.submit();
              }
            }
            // we don't have enough stamina...
            else
            {
              say("<b style='color: orange'>Not enough stamina for job " + id + ".</b>");
            }
            break;
          }
        }
      }
    }
    catch(e)
    {
      say(e);
    }
  }

  // show the recharge status (controls the timers, progress bars, increments, etc)
  function rechargeStatus()
  {
    try
    {
      var rechargeInfo = $J('div.rechargeInfo');
      if (rechargeInfo)
      {
        rechargeInfo = rechargeInfo[0];
        rechargeInfo.innerHTML = "";
        rechargeInfo.style.display = 'none';

        var attrs = Array('Stamina', 'Health', 'Energy');
        for (var i in attrs)
        {
          var attr = attrs[i];
          var attrL = attr.toLowerCase();
          var time = attribs[attrL + 'More'];
          if (time > 0 && attribs[attrL] < attribs[attrL + 'Max'])
          {
            var timeNow = (new Date()).getTime();
            var targetTime = time * 1000 + timeLoaded;
            var remainingTime = Math.round((targetTime - timeNow) / 10) / 100;
            if (remainingTime > 0)
            {
              //$J(rechargeInfo).append(attr + ' in ' + remainingTime.toFixed(0) + ' sec' + (remainingTime == 1 ? '' : 's') + '<br />');
              attribs[attr.toLowerCase() + 'Info'].innerHTML = '+' + attribs[attrL + 'Increment'] + ' in ' + remainingTime.toFixed(0) + ' sec' + (remainingTime.toFixed(0) == 1 ? '' : 's') + '<!-- ' + attr + ' -->';
              //attribs[attr.toLowerCase() + 'Progress'].style.paddingLeft = Math.round(remainingTime / attribs[attr.toLowerCase() + 'Interval'] * 346) + 'px';
              $J(attribs[attr.toLowerCase() + 'Progress']).animate({'paddingLeft': Math.round(remainingTime / attribs[attr.toLowerCase() + 'Interval'] * 243 + 103) + 'px'}, 'slow');
              $J(attribs[attr.toLowerCase() + 'Info']).fadeIn(500);
            }
            else
            {
              attribs[attrL + 'More'] = time + attribs[attrL + 'Interval'];
              attribs[attrL] += attribs[attrL + 'Increment'];
              attribs[attrL] = (attribs[attrL] > attribs[attrL + 'Max'] ? attribs[attrL + 'Max'] : attribs[attrL])
              $J('#' + attrL + 'Attr').text(attribs[attrL]);
              autoPlayCheck();
            }
          }
          else
          {
            $J(attribs[attr.toLowerCase() + 'Info']).fadeOut(500);
            attribs[attr.toLowerCase() + 'Progress'].style.paddingLeft = '0';
          }
          var progressBar = attribs[attrL + 'Bar'];
          var progressBarLabel = progressBar.firstChild;
          var progressBarImage = progressBar.lastChild;
          progressBar.style.backgroundColor = '#000';
          progressBar.style.backgroundPosition = '-10px -5px';
          progressBar.style.backgroundImage = (attribs[attrL] < attribs[attrL + 'Max'] ? 'url(http://www.dustywilson.com/img/progressBar.gif)' : '');
          progressBarLabel.style.top = '-3px';
          progressBarLabel.style.left = '-4px';
          progressBarLabel.innerHTML = attribs[attrL] + ' / ' + attribs[attrL + 'Max'];
          progressBarImage.style.width = (attribs[attrL] / attribs[attrL + 'Max'] * 73) + 'px';
          progressBarImage.style.opacity = '0.4';
          progressBarLabel.style.zIndex = '99999';
        }
      }
    }
    catch(e)
    {
      say(e);
    }
  }

  // add/remove a job ID to/from the auto-play-once list... (it's a toggle)
  function autoPlayOnce(id)
  {
    try
    {
      var autoPlayOnceAry = (GM_getValue('autoplay/once') || '').split(',');
      var autoPlayOnceIndex = autoPlayOnceAry.indexOf(id);
      var autoPlayRepeatAry = (GM_getValue('autoplay/repeat') || '').split(',');
      var autoPlayRepeatIndex = autoPlayRepeatAry.indexOf(id);
      var autoPlayIndex = autoPlay.indexOf(id);
      var added = 0;
      if (autoPlayOnceIndex < 0)
      {
        say("Adding job " + id + " to Auto Play Once.");
        autoPlayOnceAry.push(id);
        if (autoPlayIndex < 0)
        {
          autoPlay.push(id);
        }
        added = 1;
      }
      else
      {
        say("Removing job " + id + " from Auto Play Once.");
        autoPlayOnceAry[autoPlayOnceIndex] = '';
        if (autoPlayIndex >= 0 && autoPlayRepeatIndex < 0)
        {
          autoPlay[autoPlayIndex] = '';
        }
        added = 0;
      }
      var autoPlayOnceStr = autoPlayOnceAry.join(',').replace(/,+/g, ',').replace(/^,/g, '').replace(/,$/g, '');
      GM_setValue('autoplay/once', autoPlayOnceStr);
      autoPlayOrder();
      autoPlayCheck();
      return added;
    }
    catch(e)
    {
      say(e);
    }
  }

  // add/remove a job ID to/from the auto-play-repeat list... (it's a toggle)
  function autoPlayRepeat(id)
  {
    try
    {
      var autoPlayOnceAry = (GM_getValue('autoplay/once') || '').split(',');
      var autoPlayOnceIndex = autoPlayOnceAry.indexOf(id);
      var autoPlayRepeatAry = (GM_getValue('autoplay/repeat') || '').split(',');
      var autoPlayRepeatIndex = autoPlayRepeatAry.indexOf(id);
      var autoPlayIndex = autoPlay.indexOf(id);
      var added = 0;
      if (autoPlayRepeatIndex < 0)
      {
        say("Adding job " + id + " to Auto Play Repeat.");
        autoPlayRepeatAry.push(id);
        if (autoPlayIndex < 0)
        {
          autoPlay.push(id);
        }
        added = 1;
      }
      else
      {
        say("Removing job " + id + " from Auto Play Repeat.");
        autoPlayRepeatAry[autoPlayRepeatIndex] = '';
        if (autoPlayIndex >= 0 && autoPlayOnceIndex < 0)
        {
          autoPlay[autoPlayIndex] = '';
        }
        added = 0;
      }
      var autoPlayRepeatStr = autoPlayRepeatAry.join(',').replace(/,+/g, ',').replace(/^,/g, '').replace(/,$/g, '');
      GM_setValue('autoplay/repeat', autoPlayRepeatStr);
      autoPlayOrder();
      autoPlayCheck();
      return added;
    }
    catch(e)
    {
      say(e);
    }
  }
}
catch(e)
{
  say(e);
}

// say something in the log/info box
function say(content, keep)
{
  keep = (keep == 9 ? 1 : 0);
  var newDiv = document.createElement('div');
  newDiv.innerHTML = '<nobr>' + content + '</nobr>';
  newDiv.style.padding = '0 5px 2px 5px';
  info.appendChild(newDiv);
  if ($J)
  {
    infoSizer();
    $J(newDiv).fadeOut(0, function() {
      $J(this).fadeIn(1500);
    });
  }
  else
  {
    info.style.height = 'auto';
  }
  if (keep == 0) sayFade.push(newDiv);
  return newDiv;
}

// fade away items from "say" when they timeout
function sayFadeWipe()
{
  try
  {
    if (sayFade.length)
    {
      var obj = sayFade.shift();
      $J(obj).fadeOut(5000, function() {
        $J(this).remove();
        infoSizer();
      });
    }
  }
  catch(e)
  {
    say(e);
  }
}

// do a fancy resize of the log/info box
function infoSizer()
{
  return; // this disables the fancy sizer since it doesn't seem all that useful or "good" right now
  var height = info.childNodes[0].offsetHeight + (info.childNodes.length > 1 ? (info.childNodes[1].offsetHeight * (info.childNodes.length - 1)) : 0) + 5;
  $J(info).animate({'height': height + 'px'}, 'fast');
}
