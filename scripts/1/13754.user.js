// Copyright (C) 2008 Christoph Reiter <christoph.reiter@gmx.at>
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// Thanks to: FreakyJ, Mando, AFFEMANn, nm, Tekener, dossi, Deeper,
// AlienShooter, dernippo, Bra!n!, Sebastian Sollmann, me286,
// Henning Schaefer, nTech

// ==UserScript==
// @name           SVZ Sidebar
// @description    Zeigt alle Freunde die "online" sind auf jeder Seite in einer Sidebar an.
// @version        3.0.14
// @include        http://www.studivz.net/*
// @include        http://www.schuelervz.net/*
// @include        http://www.meinvz.net/*
// ==/UserScript==

//version string for update notification
var script_version = '3.0.14';

//------------------------------------------------------------------------------
// Add a stylesheet to the current page
addGlobalStyle = function(css)
{
  var head = document.getElementsByTagName('head')[0];
  if (!head)
    return;
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}

//------------------------------------------------------------------------------
// Update the public interface
updateInterface = function(id, value)
{
  var body = document.getElementsByTagName('body')[0];
  
  if (!body)
    return;
  
  var elm = document.getElementById(id);
  if(!elm)
  {
    var elm = document.createElement('div');
    elm.id = id;
    elm.style.display = 'none';
    body.appendChild(elm);
  }
  
  elm.innerHTML = value;
}

//------------------------------------------------------------------------------
// Gives back the value of the given cookie
readCookie = function(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for(var i = 0;i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ')
      c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0)
      return c.substring(nameEQ.length, c.length);
  }
  return null;
}

//------------------------------------------------------------------------------
// Returns the current time plus the update time (+/- 20% radnom)
addRandTime = function()
{
  var update = config.get('update');
  var now = new Date();
  var time = parseInt(now.getTime() + (update - update * 0.2 +
    Math.random() * update * 0.4) * 1000).toString();
  return time
}

//------------------------------------------------------------------------------
// Enables debug log eith the firebug addon
debug_log = function(text)
{
  //GM_log = uw.console.log;
  //GM_log('[SVZ-SB DEBUG] ' + text);
}

//------------------------------------------------------------------------------
// 'Main' function. Where it all starts.
if(!document.getElementById('jsEnabled'))
{
  // check if tow versions of the sidebar are installed and inform the user.
  // 'msg_widget' is best for this since it's included in all old releases.
  if(document.getElementById('msg_widget'))
  {
    alert('Es ist mehr als eine Version der SVZ Sidebar aktiv! Bitte ' +
      'deaktiviere alle bis auf eine. (Extras -> Greasemonkey usw.)');
  }
  
  // so opera can access the page
  uw = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

  //get jquery into the script and include the jquery color plugin
  //(a stripped down version without the color definitions)
  if(typeof uw.jQuery != 'undefined')
  {
    jQuery = $ = uw.jQuery;

    (function(jQuery){jQuery.each(['backgroundColor','borderBottomColor','borderLeftColor','borderRightColor','borderTopColor','color','outlineColor'],function(i,attr){jQuery.fx.step[attr]=function(fx){if(fx.state==0){fx.start=getColor(fx.elem,attr);fx.end=getRGB(fx.end);}
    fx.elem.style[attr]="rgb("+[Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2]),255),0)].join(",")+")";}});function getRGB(color){var result;if(color&&color.constructor==Array&&color.length==3)
    return color;if(result=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
    return[parseInt(result[1]),parseInt(result[2]),parseInt(result[3])];if(result=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
    return[parseFloat(result[1])*2.55,parseFloat(result[2])*2.55,parseFloat(result[3])*2.55];if(result=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
    return[parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16)];if(result=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
    return[parseInt(result[1]+result[1],16),parseInt(result[2]+result[2],16),parseInt(result[3]+result[3],16)];}
    function getColor(elem,attr){var color;do{color=jQuery.curCSS(elem,attr);if(color!=''&&color!='transparent'||jQuery.nodeName(elem,"body"))
    break;attr="backgroundColor";}while(elem=elem.parentNode);return getRGB(color);};})(jQuery);
  }
  else
  {
    $ = false;
  }

  //Global color...
  var footer = document.getElementById('Grid-Page-Center-Footer');
  var global_color = getComputedStyle(footer, '').backgroundColor;
  window.addEventListener('load', function()
  {
    global_color = getComputedStyle(footer, '').backgroundColor;
  }, false);
  addGlobalStyle('.delaycolor {border-right: 1px solid ' + global_color + '; border-bottom: 1px solid #ccc;}');

  //get profile id.. for "per profile configuration"
  var profId = document.evaluate('//ul[@id="Grid-Navigation-Main"]/li[2]/a',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  profId = profId.singleNodeValue.href;
  profId = profId.split('/')[4];

  //like the profid but now the hostname
  var host = window.location.host;
  var url = window.location.protocol + '//' + host + '/';
  var domain = host.slice(host.indexOf('.') + 1, host.length);
  var siteName = domain + '.' + profId;


  //background image
  var bg_image_url = 'http://static.pe.' + domain + '/Img/bg-photo.png';

  //create sidebar and config
  var config = new svzConfig();
  config.set('loggedin', 1);

  if(location.href.split('/')[3] == 'Profile' && config.get('toggle'))
    svzToggle();

  //create the sidebar...
  var sideb = new svzSB();
  sideb.init();

  //Sidebar-Headline Image
  var sb_img = 'data:image/png,' +
    '%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%04%00%00%00%B5%FA7' +
    '%EA%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%02bKGD%00%FF%87%8F%CC%BF%00%00%00%09' +
    'pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D8%02%0B%15%06%03' +
    'J%C6w%24%00%00%01%1EIDAT%28%CF%7D%91%BDJ%03A%14%85%BF%19%09%11A%2C%ACb%21%16%16j' +
    '%13%05%DF%40b%10g%60%2B%0B%8By%0C%CB%2C%EE%9B8V66%B3X%04m%AC%0D%A2%84T%8A%8BE%B4' +
    '%11%226Z%B8c1%D9%9F4%DE%E6%C2%3D%DF%3D%C3%9C%2B%22%FE%2F%19%9AQ%C6%1B5%A3L%27S%0' +
    '0%B7%07%AE%86%28%E3%F6%7Fq%25%60%C5%0D%5Dp%85n%5C%97%FE%9C%D5%20%8D2%1E%8C%82f%B' +
    '9n%14%F4%B1%9A%14%24%EE%D0%9Fx%9CbB%8B%F3S0%0A%87%3E%13%A4%00%E2R%E1%0E%7C.r%EFy' +
    '%16%2F%A0qh%9B%16n%22%0A%1B%00%EC%F0%CA%07%246%AE%3E%23%EA9%F4%7C%C6%1A%19h%7BE%' +
    '5E%03%DA-%C6%00%5B%AC%B2%CC7OT%8F%C8%20GD%EC2%E2-%19%B2%C4z%C8D%02%C8%F66%E3c22%' +
    '16%01%1B%A3%07%AC%B0%09%CE%C4%C1%E1%3EbDN%83%AF%10Y%8A%BEe%81%0D%E8%95%B7%904%F9' +
    '%E1%0E%3A%052%E0%BD%3A%D6%27%F34x%84%CE%C35%85K2%19%92%00%88%F8%88%0B%A0%26%CF%D' +
    '6%1F%8D%1Ea%AC%2C%CC%C2%19%00%00%00%00IEND%AEB%60%82';

  var sb_widget = new svzWidget(sb_img, config.openConfig);
  sb_widget.text('SVZ Sidebar');
  sideb.addWidget(sb_widget.node());

  //MSG Image
  var msg_img = 'data:image/png,' +
    '%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%04%00%00%0' +
    '0%B5%FA7%EA%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%02bKGD%00%FF%87%8F%C' +
    'C%BF%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD%7E%FC%00%00%00%07t' +
    'IME%07%D8%02%11%09%3A%26X%A97s%00%00%00%E3IDAT%28%CF%85%D1%3DJ%03%01%10%' +
    '86%E1g%93%ACK%FC%EF%D4%CA.V%C2%8A%20X%28%A8%95%5Dr%81%9C%C1%A3%E4%0C%5E%' +
    'C0%CA%C2%C2%CA%C6BXA%14%1BA%D0%C2%2A%85BpW%8D%16Y%D7%8D%F1g%AA%19%DE%8F%' +
    '99of%82%A6%BF%A3%F2%0FW%FBJ%DB%B1%A4%28V%F6%CF%07I%D0%2C%E1V%C1%0F%0AI.%' +
    '18%E0%7B%3D%99%27%CF%B6%0AI%A5%8Co%A5%C6%CDYp%A1E%D2%8E%3F%3D%24%9B%12%0' +
    'Fb%93%C6D%B8vj%C7q%22%C8MNKm%8Br%07%8F%A6%84%EA%E5-B%0Dg%96%91%CAd%EE%AC' +
    '%09%87%D7%9C%B1%E4%C4%3Cj%BA%D6%05%A3w%A8%9B%10%83CU%2F%A3%97%BC%B4%01%F' +
    'Av%5D%C9%BE%0Bn%ACz%F5%EE%0D%7D%8B%BA%C3%23z%1A%A8%16%DD%22%B3z%25A%E7h%' +
    'EF%C7OuJ%BF%F8-%3E%00%60g9%81%A0I%B7%D4%00%00%00%00IEND%AEB%60%82';

  var msg_widget = new svzWidget(msg_img, url + 'Messages');
  sideb.addWidget(msg_widget.node());
  msg_widget.node().id= 'msg_widget';
  var msg = new svzMsg(msg_widget);

  //AUTO LOGOUT
  var timeout = svzTimeout();

  //USERLIST Image
  var list_img = 'data:image/png,' +
    '%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%04%00%00%00%B5%FA7' +
    '%EA%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%02bKGD%00%FF%87%8F%CC%BF%00%00%00%09' +
    'pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D8%05%11%13%1D2%3' +
    'B%27%AB%DD%00%00%005tEXtComment%00%28c%29%202004%20Jakub%20Steiner%0A%0ACreated%' +
    '20with%20The%20GIMP%90%D9%8Bo%00%00%01oIDAT%28%CFe%D1%BDjS%01%00%C5%F1_ro%1A%AA%' +
    'B4J%B4BM%91b%A8v%E8%20.%C5%2F%24%08%05%C1%A18tqR%27%07%97%BE%82%E0%0B%F4%25%3A%D' +
    '9%AD%AB%08%A5C%86%82%20%08%1A%A3X%8CI%AD1%C6%A47Iss%1D%12Q%F0%AC%E7%CF%81sN%0AxZ' +
    '%AC%ADe%E6%86%83%EC%FB%E9%BD%8DM%FF%28%18%D9%93wo%16%96%5CL%CF%9C-%CF%DC%7E%5Bj%' +
    'FC%05R%F0%F0%D9%CA%95HO%5B%5B%27%E9%A5%D2%DD%E1%9E%8F%A3%A4%00.%AF%CFk%0B%1CiYN%' +
    'DD%B1%10%9E%9F%ABd%97%2B%A5%06iHD%BA%22M%B7%CCk9t%26%B5T%F0%841%D0%3D%E8%EBk%18%' +
    'CA%8B%9C%16%D8%97%0F%5D%1A%03%AB%C5%FE%B9%92%C0%84%81%8Eo%BE%FA%81%A8%AA%0D%E1j%' +
    'D1zA%DB%07uS%EAr%F6M%CA%26%B5%A9%E8%00%82%C5%8D%05%89y9%C7%0E%D4%E4%9D%94%F53%B5' +
    '%93i%E4f%93OoB%E8%A3%A2%EC%91m%BB%12%03%1D%C3%F4U%2F%1F%143%E9%D1%1C%9F%95%3D%F6' +
    '%CA%B4%15U7%DC%13%2A%2B%B2%96%86HO%A0%22%16%8B%3D%F7N%D3%D0%40%F5O%CDY%27%C4%12%' +
    'B1%D8%96%2F%06v%C4%A3%0D%05%8B%B5%C6%B5C-%3D%174u%04%BA%CA%86%8EdL%F8%3E%FA%02aq' +
    '%EB%BAD%DD%29%3D%F0%CB%B4%D0k%E1%18%18%1C%BF%D8%BD%EF%3F%25%9B%BF%010I%8A%C69%60' +
    '%10%A5%00%00%00%00IEND%AEB%60%82';

  //Userlist Widget and userlist
  var userlist_widget = new svzWidget(list_img, url + 'Friends/Friends/' + profId + '/online/1');
  sideb.addWidget(userlist_widget.node());

  var list_box = document.createElement('div');
  list_box.style.cssFloat = 'right';
  sideb.addWidget(list_box);

  var userlist = new svzUserlist(userlist_widget, list_box);

  //Add the update functions to the config callback queue
  //they will be called if a config value with 'trigger update' enabled
  //gets changed
  config.addCallback(sideb.update);
  config.addCallback(userlist.updateStyle);
}

//------------------------------------------------------------------------------
// Toggle the main boxes on each profile page
function svzToggle()
{
  var profile = document.getElementById('profileRight');
  var divs = profile.getElementsByTagName('div');
  var auto_divs = new Array('Friends-Connection', 'Mod-Education-Snipplet', 'Profile_InformationSnipplet', 'Mod-Groups-Snipplet', 'Mod-Pinboard-Snipplet', 'Profile_Work_List');
  var divs_to_hide = new Object();
  var toggle_lock = false;
  var old_state_str = '';

  getHeader = function(parent)
  {
    for(var i = 0; i < parent.childNodes.length; i++)
      if(parent.childNodes[i].tagName && parent.childNodes[i].tagName.toLowerCase() == 'h2')
        return parent.childNodes[i];
  }

  saveState = function()
  {
    var str = '{';
    for(var key in divs_to_hide)
    {
      str += '"' + key + '": ' + divs_to_hide[key] + ',';
    }
    str += '}';

    GM_setValue(siteName + '.toggle', encodeURIComponent(str));
  }

  getState = function()
  {
    var str = GM_getValue(siteName + '.toggle', '{}');
    var obj = eval('(' + decodeURIComponent(str) + ')');
    return obj;
  }

  toggle = function(id)
  {
    if(toggle_lock)
      return;

    toggle_lock = true;
    
    var div = document.getElementById(id);

    if(divs_to_hide[id] == 1)
    {
      divs_to_hide[id] = 0;
      $(div).show('fast');
    }
    else
    {
      divs_to_hide[id] = 1;
      $(div).hide('fast');
    }
    
    saveState();
    
    $(div).queue(function () {toggle_lock = false; $(div).dequeue();});
  }

  prepareHeader = function(header, id)
  {
    var button = document.createElement('a');
    button.href='javascript:;';
    button.style.cssFloat = 'right';
    button.style.textDecoration = 'none';
    button.addEventListener('click', function(){ toggle(id); }, false);
    button.innerHTML = '&uarr;&darr;';

    var info = document.createElement('span');
    info.style.cssFloat = 'left';
    info.innerHTML = header.innerHTML;

    header.innerHTML = '';
    header.appendChild(info);
    header.appendChild(button);

    var clear = document.createElement('div');
    clear.style.clear = 'both';
    header.appendChild(clear);
  }

  init = function()
  {
    divs_to_hide = getState();

    for(var u = 0; u < auto_divs.length; u++)
    {
      for(var i = 0; i < divs.length; i++)
      {
        if(divs[i].className.indexOf(auto_divs[u]) != -1 || divs[i].id == auto_divs[u])
        {
          var container = document.createElement('div');
          container.id = auto_divs[u] + '_toggle';
          var head = getHeader(divs[i]);
          if(!head)
            break;

          divs[i].style.width = '100%';
          
          prepareHeader(head, container.id);
          
          var current_node = head;

          if(auto_divs[u] == 'Mod-Pinboard-Snipplet')
            current_node = current_node.nextSibling.nextSibling;

          while(current_node.nextSibling)
            container.appendChild(current_node.nextSibling);

          divs[i].appendChild(container);

          if(divs_to_hide[container.id] == 1)
            container.style.display = 'none';
          
          break;
        }
      }
    }
  }

  init();
}

//------------------------------------------------------------------------------
// The whole config system
function svzConfig()
{
  var settings_version = 7;

  //name, default, min, max, desc, trigger update
  var settings_list =
  [
    ['pic', 1, 0, 1, 'Bild anzeigen', 1],
    ['message', 1, 0, 1, '"Nachricht schreiben" anzeigen', 1],
    ['pinboard', 1, 0, 1, '"auf Pinnwand schreiben" anzeigen', 1],
    ['poke', 1, 0, 1, '"Gruscheln" anzeigen', 1],
    ['chat', 1, 0, 1, '"Plaudern" (Chat) anzeigen', 1],
    ['status', 1, 0, 1, 'Status (Microblog) anzeigen', 1],
    ['icons', 1, 0, 1, '"Freunde/verlinkte Bilder/Fotoalben" Icons anzeigen', 1],
    ['p_update', 1, 0, 1, 'Profil Aktualisierungszeit/grund anzeigen', 1],
    ['sound', 0, 0, 1, 'Bei neuen Nachrichten einen Sound abspielen.', 0],
    ['menu_fixed', 1, 0, 1, 'Linkes Hauptmenü fixieren', 1],
    ['animations', 1, 0, 1, 'Animationen aktivieren', 0],
    ['toggle', 1, 0, 1, 'Profilbereiche ein/ausblendbar machen (Neuladen nötig)', 0],
    ['resetchat', 0, 0, 1, 'Chat-Fenster automatisch wieder ins Bild bringen', 0],
    ['width', 210, 150, 400, 'Breite der Sidebar in Pixel', 1],
    ['update', 20, 10, 120, 'Aktualisierungszeit in Sekunden', 0],
    ['idle', 0, 0, 60, 'Zeit (in Minuten), nach der bei Inaktivität automatisch ausgeloggt wird (0 = nie)', 0],
    ['loggedin', 1, 0, 1, '', 0]
  ];

  //global stuff
  var settings = new Object();
  var settings_old = new Array();
  var settings_raw_old = '';
  var first_time_flag = true;
  var dialog = false;
  var callback_list = new Array();
  var version_string = '';
  var version_check_done = false;

  this.addCallback = function(cb)
  {
    callback_list.push(cb);
  }

  //public getter
  this.get = function(name)
  {
    return settings[name];
  }

  //public setter
  this.set = function(name, value)
  {
    if(this.get(name) == value)
      return;

    for(var i = 0; i < settings_list.length; i++)
    {
      if(getName(i) == name)
      {
        settings_old[i] = value;
        config_new = checkAll(settings_old);
        GM_setValue(siteName + '.config', settings_version + ':' + config_new.join(','));
        upConfig(settings_old);
        break;
      }
    }
  }

  //getters
  getDefValue = function(number)
  {
    return settings_list[number][1];
  }

  getMinValue = function(number)
  {
    return settings_list[number][2];
  }

  getMaxValue = function(number)
  {
    return settings_list[number][3];
  }

  getName = function(number)
  {
    return settings_list[number][0];
  }

  getDescription = function(number)
  {
    return settings_list[number][4];
  }

  getTrigger = function(number)
  {
    return settings_list[number][5];
  }

  //validate/correct config value
  checkValue = function(value, default_value, min, max)
  {
    if(isNaN(value))
        return default_value;
    else if(value < min)
        return min;
    else if(value > max)
        return max;

    return value;
  }

  //validate/correct config array
  checkAll = function(config_raw)
  {
    var config_new = new Array();

    for(var i = 0; i < settings_list.length; i++)
    {
      var new_value = parseInt(config_raw[i]);

      var default_value = getDefValue(i);
      var min_value = getMinValue(i);
      var max_value = getMaxValue(i);

      config_new[i] = checkValue(new_value, default_value, min_value, max_value);
    }

    return config_new;
  }

  includeUserscriptVersion = function(id)
  {
    var elm = document.getElementById(id);
    
    if(version_check_done)
    {
      elm.innerHTML = version_string;
      return;
    }
    
    try
    {
      var xmlReq = GM_xmlhttpRequest(
      {
        method: 'GET',
        url: 'http://userscripts.org/scripts/source/13754.meta.js',
        onload: function(req)
        {
          if(req.status == 200)
          {
            var us_version = /\/\/\s*@version\s*(.*)\s*\n/i.exec(req.responseText)[1];
            
            if(script_version != us_version)
              version_string = 'Es ist eine neue Version (<strong>' + us_version + '</strong>) auf "userscripts.org" erhältlich. Du hast zur Zeit Version <strong>' + script_version + '</strong> installiert.';
            else
              version_string = 'Du hast die aktuellste Version <strong>' + script_version + '</strong> installiert.';

            
          }
          else
            version_string = '<strong>Fehlgeschlagen.</strong>';

          elm.innerHTML = version_string;
          version_check_done = true;
        }
      });
    }
    catch(err)
    {
      version_string = '<strong>Nicht unterstützt.</strong> (z.B.: Opera)';
      elm.innerHTML = version_string;
      version_check_done = true;
    }
  }

  upConfig = function(settings_split)
  {
    //split values & check
    settings_split = checkAll(settings_split);
    settings_raw_old = settings_split.join(',');

    //set
    var trigger_flag = false;
    for(var i = 0; i < settings_list.length; i++)
    {
      if(getTrigger(i) && settings_split[i] != settings_old[i])
        trigger_flag = true;

      settings[getName(i)] = settings_split[i];
    }

    if(trigger_flag && !first_time_flag)
    {
      for(var i = 0; i < callback_list.length; i++)
      {
        callback_list[i]();
      }
    }

    settings_old = settings_split;
  }

  getConfig = function()
  {
    //get config
    var settings_raw = GM_getValue(siteName + '.config', '');

    if(settings_raw.substr(0, settings_raw.indexOf(':')) != settings_version)
      settings_raw = '';
    else
      settings_raw = settings_raw.substr(settings_raw.indexOf(':') + 1, settings_raw.length)

    if(settings_raw != settings_raw_old)
      upConfig(settings_raw.split(','));

    first_time_flag = false;
  }

  //setting is textinput if max-min > 1... else checkbox
  isTextInput = function(number)
  {
    if((getMaxValue(number) - getMinValue(number)) > 1)
      return true;

    return false;
  }

  saveConfig = function()
  {
    var config_new = new Array();

    //get the data from the input widgets
    for(var i = 0; i < settings_list.length; i++)
    {
      var node = document.getElementById('sb_conf_' + getName(i));

      if(isTextInput(i))
        config_new[i] = parseInt(node.value)
      else
        config_new[i] = (node.checked) ? 1 : 0;
    }

    //check data
    config_new = checkAll(config_new).join(',');

    //save and get
    GM_setValue(siteName + '.config', settings_version + ':' + config_new);
    getConfig();

    //close window
    closeConfig();
  }

  this.openConfig = function()
  {
    //generate gui text
    var text = '<table>';

    for(var i = 0; i < settings_list.length; i++)
    {
      if(!getDescription(i).length)
        text += '<tr style="display:none">';
      else
        text += '<tr>';

      if(isTextInput(i))
        text += '<td style="text-align:center"><input type="text" id="sb_conf_'+getName(i)+'" maxlength="3" style="width:30px" /></td><td>'+getDescription(i)+' ('+getMinValue(i)+' - '+getMaxValue(i)+')</td>';
      else
        text += '<td style="text-align:center"><input type="checkbox" id="sb_conf_'+getName(i)+'"></td><td>'+getDescription(i)+'</td>';

      text += '</tr>';
    }

    text += '</table>';

    text += '<div style="text-align: center"><p>Update Information: <span id="sb_version" style="font-style: italic;">wird geladen...</span></p></div>';

    text += '<div style="text-align: center"><p><a href="http://userscripts.org/scripts/show/13754">SVZ-Sidebar @ Userscripts</a> | <a href="http://code.google.com/p/svz-scripts/">SVZ-Sidebar @ Google Code</a><br/>by <a href="http://www.student.tugraz.at/christoph.reiter/">Christoph Reiter</a></p></div>';

    text += '<br/><a id="sb_conf_submit" href="javascript:;" style="float:left;font-weight:bold;">[Änderungen übernehmen]</a>\
      <a id="sb_conf_close" href="javascript:;" style="float:right;font-weight:bold;">[Abbrechen]</a>';

    //open window
    dialog = uw.Phx.UI.Dialog.ButtonDialog(
        'SVZ Sidebar - Konfiguration',
        {
            'message' : text,
            'buttons' : []
        }
    );
    dialog.show()
    
    includeUserscriptVersion('sb_version');
    
    //set all widgets right
    for(var i = 0; i < settings_list.length; i++)
    {
      var node = document.getElementById('sb_conf_' + getName(i));

      if(isTextInput(i))
        node.value = settings[getName(i)];
      else
        node.checked = settings[getName(i)];

      if(i == 0)
        node.focus();
    }    

    //add handler for saving/closing window
    document.getElementById('sb_conf_submit').addEventListener('click', saveConfig, false);
    document.getElementById('sb_conf_close').addEventListener('click', closeConfig, false);
    uw.addEventListener('keypress', checkEvent, false);
  }

  checkEvent = function(event)
  {
    if(event.type)
    {
      if(event.keyCode == 13)
        saveConfig();
      else if(event.keyCode == 27)
        closeConfig();
    }
  }

  closeConfig = function()
  {
    uw.removeEventListener('keypress', checkEvent, false);
    dialog.close();
  }

  //init
  initConfig = function()
  {
    //poll for changes
    getConfig();
    window.setInterval(getConfig, 1000);
  }

  //here we go
  initConfig();
}

//------------------------------------------------------------------------------
// Autologout if nothing happens for a given time
function svzTimeout()
{
  var key_press = true;

  update = function()
  {
    if(!config.get('idle'))
      return;

    var date = new Date();
    var current_time = date.getTime();

    if(key_press)
    {
      GM_setValue(siteName + '.idle', current_time.toString())
      debug_log('update');
    }
    else
    {
      if((current_time - parseInt(GM_getValue(siteName + '.idle', 0))) > (config.get('idle') * 60000))
      {
        GM_xmlhttpRequest({method: 'GET', url: url + 'Logout'});
      }
    }

    key_press = false;
  }

  init = function()
  {
    update();
    window.setInterval(update, 3000);

    //prevent autologout while writing messages
    window.addEventListener('keypress', function () {key_press = true;}, false);
  }

  init();
}

//------------------------------------------------------------------------------
// The userlist
function svzUserlist(widget, box)
{
  var local_list = new Array();
  var old_time = 0;
  var data_too_old = false;
  var firstTime = true;
  var data_count = 7;
  var im_friends = new Object();
  var request_lock = false;

  updateSidebar = function(force)
  {
    var update_time = parseInt(GM_getValue(siteName + '.ul_time', 0));

    if(update_time != old_time || force == true)
    {
      if(data_too_old)
        updateText(-1);
      else
      {
        debug_log('ul update - remote/display');

        old_time = update_time;

        var list = GM_getValue(siteName + '.content', '');

        list = list.split(',');
        
        var interf_text = '';
        for(var i = 1; i < list.length; i += data_count)
        {
          interf_text += list[i] + ',' + list[i + 1] + ',';
        }
        
        updateInterface('svz_sbi_userlist', interf_text);

        for(var i = 0; i < list.length; i++)
        {
          list[i] = decodeURIComponent(list[i]);
        }

        var user_count = (list.length - 1) / data_count;
        
        updateText(user_count);
        updateInterface('svz_sbi_usercount', user_count.toString());
        
        for(var i = 1; i < local_list.length; i += data_count)
        {
          var search = searchList(list, local_list[i]);

          if(search >= 0)
              updateItem(list.slice(search,search + data_count), local_list.slice(i, i + data_count));
          else
              deleteItem(local_list[i]);
        }

        for(var i = 1; i < list.length; i += data_count)
        {
          var search = searchList(local_list, list[i]);

          if(search == -1)
            insertItem(list, i);
        }

        local_list = list;
        firstTime = false;
      }
    }
  }

  updateText = function(number)
  {
    if(!config.get('loggedin'))
      widget.text('Nicht eingeloggt!');
    else if(number < 0)
      widget.text('Initialisiere...');
    else if(number == 0)
      widget.text('Niemand online');
    else if(number == 1)
      widget.text(number + ' Freund online');
    else
      widget.text(number + ' Freunde online');
  }

  analyzeList = function(friends)
  {
    var users = friends.getElementsByTagName('tr');

    var content = '';
    for(var user = 0; user < users.length; user++)
    {
      if(users[user].id != "") //ignore ads
        continue;

      var profile_href = users[user].getElementsByTagName('a')[0].href;
      var img_src = users[user].getElementsByTagName('img')[0].src;

      var id = profile_href.substring(profile_href.lastIndexOf('/') + 1, profile_href.length);

      var chat = '';
      for(var key in im_friends)
      {
        for(var key2 in im_friends[key])
        {
          if(im_friends[key][key2]['id'] == id)
            chat = '1';
        }
      }

      var name = users[user].getElementsByTagName('img')[0].alt;
      var pic = img_src.replace('nopic-m.jpg', 'nopic-w.jpg').replace('nopicf-m.jpg', 'nopicf-w.jpg').replace('-m.jpg', '-s.jpg');

      var status = '';
      var dd_tags = users[user].getElementsByTagName('dd');
      for(var i = 0; i < dd_tags.length; i++)
      {
        if(dd_tags[i].className == 'microblog')
        {
          status = dd_tags[i].childNodes[0].nodeValue;
          break;
        }
      }

      var update_status = '';
      var update_status_type = '';
      var span_tags = users[user].getElementsByTagName('span');
      for(var i = 0; i < span_tags.length; i++)
      {
        if(span_tags[i].className == 'lastUpdate')
        {
          update_status = span_tags[i].innerHTML;
        }
        else if(span_tags[i].className == 'lastUpdateTypeName')
        {
          update_status_type = span_tags[i].innerHTML;
          update_status_type = update_status_type.substr(1, update_status_type.length - 2);
        }
      }

      content += ',' + id + ',' + encodeURIComponent(name) + ',' + encodeURIComponent(status) + ',' + encodeURIComponent(pic)
        + ',' + encodeURIComponent(update_status) + ',' + encodeURIComponent(update_status_type) + ',' +
        encodeURIComponent(chat);

    }

    return content;
  }

  userTimeout = function()
  {
    if(request_lock)
      request_lock = false;
  }

  getMoreUsers = function(start_content, pages)
  {
    var full_content = start_content;
    var current_page;
    var pages_done = 1;

    window.setTimeout(userTimeout, 3000);

    for(current_page = 2; current_page <= pages; current_page++)
    {
      var xmlReq = GM_xmlhttpRequest(
        {
          method: 'GET',
          url: url + 'Friends/Friends/' + profId + '/online/1/p/' + current_page,
          onload: function(originalRequest)
          {
            if(!request_lock)
              return;
              
            var friends = document.createElement('div');
            friends.innerHTML = originalRequest.responseText;

            full_content += analyzeList(friends);

            pages_done++;

            if(pages_done >= pages)
            {
              request_lock = false;
              GM_setValue(siteName + '.content', full_content);
              GM_setValue(siteName + '.ul_time', addRandTime());
              data_too_old = false;
              updateSidebar();
            }
          }
      });
    }
  }

  getfirstUsers = function()
  {
    window.setTimeout(userTimeout, 2000);
    
    var xmlReq = GM_xmlhttpRequest(
    {
      method: 'GET',
      url: url + 'Friends/Friends/' + profId + '/online/1',
      onload: function(originalRequest)
      {
        if(!request_lock)
          return;

        //get friends list
        var friends = document.createElement('div');
        friends.innerHTML = originalRequest.responseText;

        var login_forms = friends.getElementsByTagName('form');
        logged_in = 1;
        for(var i = 0; i < login_forms.length; i++)
        {
          if(login_forms[i].id.indexOf('Login') != -1)
          {
            logged_in = 0;
            break;
          }
        }
        if(!logged_in)
            firstTime = true;
        config.set('loggedin', logged_in);

        var pages = 0;
        var pcount = friends.getElementsByTagName('a');
        for(var i = 0; i < pcount.length; i++)
        {
          if(pcount[i].className == 'pager')
              pages = parseInt(pcount[i].title);
        }

        content = analyzeList(friends);

        if(pages == 0)
        {
          request_lock = false;
          GM_setValue(siteName + '.content', content);
          GM_setValue(siteName + '.ul_time', addRandTime());
          data_too_old = false;
          updateSidebar();
        }
        else
        {
          getMoreUsers(content, pages);
        }
      }
    });
  }

  imTimeout = function()
  {
    if(request_lock)
      getfirstUsers();
  }

  getUsers = function()
  {
    var update_time = parseInt(GM_getValue(siteName + '.ul_time', 0));
    var current_time = new Date().getTime();
    
    if((current_time - update_time) > (config.get('update') * 1000))
    {
      if(request_lock)
        return;

      request_lock = true;

      window.setTimeout(imTimeout, 1500);
      
      debug_log('ul update - local');

      var seq = readCookie('seq');
      if(!seq)
        seq = '0';

      try
      {
        GM_xmlhttpRequest({
          method: 'POST',
          url: 'http://im.' + domain + '/webx/re',
          headers:{'Content-type':'application/x-www-form-urlencoded'},
          data:encodeURI('rp=true&seq=' + seq),
          onload: function(xhr)
          {
            if(!request_lock)
              return;
            
            if(xhr.status == 200)
              im_friends = eval('(' + xhr.responseText + ')');
              
            getfirstUsers();
          }
        });
      }
      catch(err)
      {
        getfirstUsers();
      }

    }
  }

  updateItem = function (data, old)
  {
    if(data.join() != old.join())
    {
      writeItem(data);

      var item = document.getElementById('sb_' + data[0]).firstChild;
      var orig_color = '#FAF8F8';
      
      item.style.backgroundImage = 'none';
      $(item).animate({ backgroundColor: global_color }, 500);
      $(item).animate({ backgroundColor: orig_color }, 1500);
      $(item).queue(function () {item.style.backgroundImage = ''; $(item).dequeue(); });
    }
  }

  deleteItem = function (id)
  {
    var item = document.getElementById('sb_' + id);

    if($ && !firstTime && config.get('animations'))
    {
      $(item).animate({height: 'toggle', opacity: 'toggle'}, 2500);
      $(item).queue(function () {item.parentNode.removeChild(item); $(item).dequeue(); });
    }
    else
    {
      item.parentNode.removeChild(item);
    }
  }

  writeItem = function(data)
  {
    var text = '<div class="sb_cont delaycolor sb_bg_image"><div class="clearFix">'
    text += '<div class="sb_image">';

    var iconmode = '';
    if(!config.get('pic') && config.get('icons'))
      iconmode = ' sb_img_mode2';

    if(config.get('pic'))
      text += '<a href="'+url+'Profile/'+data[0]+'" title="Profil"><img src="'+data[3]+'" class="obj-profileImage" style="float:none"/></a><br/>';
    if(config.get('icons')) {
      text += '<a href="'+url+'Friends/Friends/'+data[0]+'" title="Freunde"><div class="sb_img_a'+iconmode+'"></div></a> ';
      text += '<a href="'+url+'Photos/Tags/'+data[0]+'" title="verlinkte Bilder"><div class="sb_img_b'+iconmode+'"></div></a> ';
      text += '<a href="'+url+'Photos/Album/'+data[0]+'" title="Fotoalben"><div class="sb_img_c'+iconmode+'"></div></a>';
    }

    var picmode = '';
    if (config.get('pic'))
        picmode = 'sb_item';
    else if(!config.get('pic') && config.get('icons'))
        picmode = 'sb_item_mode2';

    text += '<div class="clearFix"></div></div>';
    text += '<div class="'+picmode+'"><div class="sb_head"><a href="'+url+'Profile/'+data[0]+'" title="Profil">' + data[1] + '</a></div>';

    if(config.get('message'))
      text += '<a href="'+url+'Messages/WriteMessage/'+data[0]+'">&#8226; Nachricht schreiben</a><br/>';
    if(config.get('pinboard'))
      text += '<a href="'+url+'Pinboard/'+data[0]+'">&#8226; Pinnwand schreiben</a><br/>';
    if(config.get('poke'))
      text += '<a href="'+url+'Gruscheln/DialogGruscheln/'+data[0]+'">&#8226; Gruscheln</a><br/>';

    if(config.get('chat'))
    {
      if(data[6].length)
        text += '<a href="javascript:;" class="initiateChat" id="U'+data[0]+'">&#8226; Plaudern</a>';
      else
        text += '<span class="type-sub">&#8226; Plaudern</span>';
    }


    if(data[2] && config.get('status'))
      text += '<div class="type-sub">&raquo; ' + data[2] + ' &laquo;</div>';

    text += '</div></div>';

    if(data[5] && config.get('p_update'))
      text += '<div class="type-sub" style="font-style:italic;">' + data[4] + ': ' + data[5] + '</div>';
    var item = document.getElementById('sb_' + data[0]);
    item.innerHTML = text;
  }

  insertItem = function (list, i)
  {
    var item = document.createElement('div');

    var data = list.slice(i, i + data_count);

    var id = 'sb_' + data[0];
    if(document.getElementById(id))
      return;
    item.id = id;

    if($ && !firstTime && config.get('animations'))
      $(item).hide();

    if(i <= data_count)
      box.insertBefore(item, box.firstChild);
    else
      box.insertBefore(item, document.getElementById('sb_' + list[i - data_count]).nextSibling);

    writeItem(data);

    if($ && !firstTime && config.get('animations'))
    {
      $(item).opacity = '0';
      $(item).animate({height: 'toggle', opacity: 'toggle'}, 2500);
    }
  }

  searchList = function (array, key)
  {
    for(var i = 1; i < array.length; i += data_count)
    {
      if(array[i] == key)
          return i;
    }

    return -1;
  }

  this.updateStyle = function()
  {
    firstTime = true;

    for(var i = 1; i < local_list.length; i += data_count)
    {
      deleteItem(local_list[i]);
    }

    local_list = new Array();

    updateSidebar(true);
  }

  addStyle = function()
  {
    addGlobalStyle('.sb_head {font-weight: bold; font-size: 1.1em; padding-bottom: 3px;}\
      .sb_head a {color: #000;}\
      .sb_cont {border-top: none !important; padding:7px;}\
      .sb_bg_image {background-image:url(' + bg_image_url + '); background-position: 0 35%} \
      .sb_cont .label { width: auto;margin-top: 2px; float:none; clear:none !important;}\
      .sb_image {float:left;}\
      .sb_status2 {padding:3px;}\
      .sb_status {font-size: 1.1em; font-weight: bold; text-align:center;}\
      .sb_item {margin-left: 63px;}\
      .sb_item_mode2 {margin-left: 25px;}');

    addGlobalStyle('.sb_img_a {background-image: url(' + list_img + ');}');
    addGlobalStyle('.sb_img_b {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AILETMAdvdM9AAAASZJREFUKM+F0b9LlWEYxvHP8/jyopSFEiFiiloiWuTm1CbOjU5Bf4ODm9QiODc5CQ0RuLmJ7oI/FmkpOKDYMVRCtCN5zpHzNJxeFQS9p2v48r3gvsJbd192lcK7D2b/50+fP/otSLQMwyNtxl8vTug34KUf45XSyb7zwhAH570xysOmChYGz0pfIUyvmmDYK7uqkiRpeGG5WbYWptOUBg5EHRIoS7pFLMuo21bT7qkVZVGPMce2DIiITVNdt0174KcdTyQNCiB5oK4sM+e93JEgurgGghxRVLIkl0lO1Qsg4Y+gR/AFk7pUVW8aEirG9ArYMeSbC0ml+aiGXO5Ars8Iyjb89UxLscWhTjWtas79klxq81yrxxIyM+vztzf8XoTFcN/c/wB62lcoePv2RQAAAABJRU5ErkJggg==);}');
    addGlobalStyle('.sb_img_c {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH2AILETMWgiP5pQAAAP1JREFUKM91kb0uBGEUhp/3zJj9acVGbaPSaSUbjUKncgEa96BQbKHSuhGNgrASroFKokQlM0aM/b6jmF12Y+e85fuXc472aJr1WwZO2ki/bPS6lFiTQL02z3wvEqx53/sOo2FBSrrlwkgwjISckpzsBDrj5eOCJ1K407bfaMcvtev32nTj4Mj5YsyIgE699tcZOSUlhzyyygpvPGBGDSEMARmBD4xABaQRECCciANLJBiRjAwWJUAgYlRUgIEm5FTYnVvakon7D8xXTN36FULwmQpxJXEh41ziWsJDphafvNIBdOY2c8l3CrK4b3lsq6VIjv6/exCoPCWRAH4AMyJQTYAOn6QAAAAASUVORK5CYII=);}');


    addGlobalStyle('.sb_img_a, .sb_img_b, .sb_img_c {float:left; height: 22px; width: 18px;}');
    addGlobalStyle('.sb_img_a, .sb_img_b, .sb_img_c {opacity:0.7; -moz-opacity: 0.7; background-repeat: no-repeat;background-position: center center;}');
    addGlobalStyle('.sb_img_a:hover, .sb_img_b:hover, .sb_img_c:hover {-moz-opacity: 1; opacity: 1;}');
    addGlobalStyle('.sb_img_mode2 {height:18px; float: none}');
  }

  init = function()
  {
    addStyle();

    var update_time = parseInt(GM_getValue(siteName + '.ul_time', 0));
    var current_time = new Date().getTime();

    if((current_time - update_time) > (config.get('update') * 1000 * 1.25))
      data_too_old = true;

    // log into the chat before getting the userlist
    if(data_too_old)
    {
      try
      {
        GM_xmlhttpRequest({
          method: 'POST',
          url: 'http://im.' + domain + '/webx/login',
          headers:{'Content-type':'application/x-www-form-urlencoded'},
          data:encodeURI('sc=false&t=' + uw.sToken),
          onload: function(xhr)
          {
            window.setTimeout(getUsers, 250);
          }
        });
      }
      catch(err)
      {
        getUsers();
      }
    }
    else
    {
      getUsers();
    }

    window.setInterval(getUsers, 1750);

    updateSidebar();
    window.setInterval(updateSidebar, 1750);
  }

  init();
}

//------------------------------------------------------------------------------
// a widget (with image/url and text)
function svzWidget(image, callback)
{
  widget = document.createElement('div');
  widget.style.cssFloat = 'right';

  var elm = document.createElement('div');
  elm.className = 'delaycolor sb_bg_image';
  elm.style.padding = '2px';

  var text = document.createElement('div');
  text.style.lineHeight = '18px';
  text.className = 'type-sub';
  text.style.fontSize = '1.1em';
  text.style.textAlign = 'center';
  text.style.width = 'auto';
  text.style.cssFloat = 'none';

  if(image && callback)
  {
    var link = document.createElement('a');

    if(typeof(callback) == 'string')
      link.href = callback;
    else
    {
      link.href = 'javascript:;';
      link.addEventListener('click', function(){callback(); link.blur()}, false);
    }

    link.style.backgroundImage = 'url(' + image + ')';
    link.className = 'sb_img';
    link.style.height = '18px';
    link.style.width = '18px';
    link.style.position = 'absolute';
    link.style.backgroundRepeat = 'no-repeat';
    link.style.backgroundPosition = 'center center';
    elm.appendChild(link);

    text.style.paddingLeft = '18px';
  }

  elm.appendChild(text);
  widget.appendChild(elm);

  this.text = function(txt)
  {
    text.innerHTML = txt;
  }

  this.node = function()
  {
    return widget;
  }
}

//------------------------------------------------------------------------------
// Message update
function svzMsg(widget)
{
  var orig_title = document.title;
  var orig_color;
  var old_msg_count = -1;
  var data_too_old = false;
  var blink = false;
  var loggedin = true;

  update = function()
  {
    var update_time = parseInt(GM_getValue(siteName + '.msg_time', 0));
    var current_time = new Date().getTime();

    if((current_time - update_time) > (config.get('update') * 1000) || data_too_old)
    {
      debug_log('msg update - local');
      GM_setValue(siteName + '.msg_time', addRandTime());

      GM_xmlhttpRequest(
      {
        method: 'GET',
        url: url,
        onload: function(originalRequest)
        {
          var content = document.createElement('div');
          content.innerHTML = originalRequest.responseText;

          var links = content.getElementsByTagName('a');
          var logged_in = (links.length >= 1 && links[0].href.indexOf('Login') == -1) ? 1 : 0;
          config.set('loggedin', logged_in);

          if(logged_in)
          {
            var count = 0;
            for(var i = 0; i < links.length; i++)
            {
              if(links[i].className == 'Navi-Messages-Link')
              {
                text = links[i].innerHTML;
                left = text.indexOf('(');
                right = text.indexOf(')');
                if(left >= 0 && right >= 0)
                  count = parseInt(text.substring(left + 1,right));
                break;
              }
            }
            
            GM_setValue(siteName + '.messages', count);

            //play sound in the window where the update happend
            if(config.get('sound') && count > old_msg_count && old_msg_count >= 0)
              play();
          }
          
          data_too_old = false;

          //update display
          checkUpdate();
        }
      });
    }
  }

  checkUpdate = function ()
  {
    if(loggedin && !config.get('loggedin'))
    {
      loggedin = false;
      document.title = 'Ausgeloggt!! | ' + orig_title;
      return;
    }
    else if(!loggedin && config.get('loggedin'))
    {
      loggedin = true;
      document.title = orig_title;
    }

    if(!data_too_old)
    {
      var now = GM_getValue(siteName + '.messages', 0);

      if(old_msg_count != now)
      {
        debug_log('msg update - remote');
        updateMessages();

        old_msg_count = now;
      }
    }
    else
      widget.text('Initialisiere...');
  }

  blinkMessage = function ()
  {
    blink = true;
    
    var item = document.getElementById('msg_widget').firstChild;
    item.style.backgroundImage = 'none';
    orig_color = '#FAF8F8';

    $(item).animate({ backgroundColor: global_color }, 400);
    $(item).animate({ backgroundColor: orig_color }, 800);

    $(item).queue(function () {if(blink) {blinkMessage(); $(item).dequeue();};});
  }

  stopBlink = function ()
  {
    blink = false;
    if(orig_color)
    {
      var item = document.getElementById('msg_widget').firstChild;
      $(item).stop();
      $(item).animate({backgroundColor: orig_color}, 150);
      $(item).queue(function () {item.style.backgroundColor = ''; item.style.backgroundImage = '';});
    }
  }

  updateMessages = function ()
  {
    if(data_too_old)
      return;

    debug_log('msg update - display');
    var text;
    var now = GM_getValue(siteName + '.messages', 0);
    
    updateInterface('svz_sbi_msgcount', now.toString());

    if(now <= 0)
      text = 'Keine neuen Nachrichten';
    else if(now == 1)
      text = 'Eine neue Nachricht';
    else if(now < 11)
      text = now + ' neue Nachrichten';
    else
      text = '11+ neue Nachrichten';

    widget.text(text);

    if(now <= 0)
    {
      stopBlink();
      document.title = orig_title;
    }
    else
    {
      if(!blink)
      {
        blinkMessage();
      }
      document.title = text + ' | ' + orig_title;
    }
  }

  delayedCheck = function()
  {
    window.setTimeout(checkMessageCount, 150);
  }

  checkMessageCount = function()
  {
    var tags = document.getElementsByTagName('a');
    var count = 0;

    for(var i = 0; i < tags.length; i++)
    {
      if(tags[i].className.indexOf('boldIfNew') != -1 &&
        (getComputedStyle(tags[i], '').fontWeight == 'bold' ||
        getComputedStyle(tags[i], '').fontWeight == '700'))
      {
        count++;
      }
    }

    count /= 2;

    if(GM_getValue(siteName + '.messages') != count)
    {
      GM_setValue(siteName + '.messages', count);
      updateMessages();
    }
  }

  regReadEvents = function ()
  {
    var tags = document.getElementsByTagName('a');
    for(var i = 0; i < tags.length; i++)
    {
      if(tags[i].className.indexOf('boldIfNew') != -1 &&
        (getComputedStyle(tags[i], '').fontWeight == 'bold' ||
        getComputedStyle(tags[i], '').fontWeight == '700'))
      {
        tags[i].addEventListener('click', delayedCheck, false);
      }
    }
  }

  function addSound()
  {
    var body = document.getElementsByTagName('body')[0];
    var emb = document.createElement('embed');
    emb.id = 'sound';
    emb.src = 'http://www.thesoundarchive.com/email/youGotmail.wav';
    emb.setAttribute('autostart', 'true');
    emb.setAttribute('loop', 'false');
    emb.setAttribute('hidden', 'true');
    body.appendChild(emb);
  }

  function play()
  {
    var item = document.getElementById('sound');

    if(item)
      item.parentNode.removeChild(item);

    addSound();
  }

  init = function()
  {
    if(location.href.split('/')[3] == 'Messages')
    {
      checkMessageCount();
      regReadEvents();
    }

    var update_time = parseInt(GM_getValue(siteName + '.msg_time', 0));
    var current_time = new Date().getTime();

    if((current_time - update_time) > (config.get('update') * 1000 * 1.25))
      data_too_old = true;

    update();
    window.setInterval(update, 1450);

    checkUpdate();
    window.setInterval(checkUpdate, 1000);
  }

  init();
}

//------------------------------------------------------------------------------
// The sidebar itselfs. Alters the page and CSS so that everything looks nice.
function svzSB()
{
  var top = document.getElementById('Grid-Page-Center-Top');
  var navi = document.getElementById('Grid-Page-Center-Top-Navigation');
  var all = document.getElementById('Grid-Page');
  var ph = document.getElementById('Grid-Page-Center-Header');
  var main = document.getElementById('Grid-Page-Center');
  var left = document.getElementById('Grid-Page-Left');
  var footer = document.getElementById('Grid-Page-Center-Footer');

  var widget_list = new Array();

  this.init = function()
  {
    addGlobalStyle('.sb_img {opacity:0.7; -moz-opacity: 0.7;} .sb_img:hover {-moz-opacity: 1; opacity: 1;}');

    pinnboardInit();

    modPage();

    this.update();
    
    fixes();

    resetChatPosition();
  }

  // Chat-Fenster neu positionieren
  // by nTech
  resetChatPosition = function()
  {
    if (!config.get('resetchat'))
      return;

    var gridWrapperHeight = uw.getComputedStyle(document.getElementById('Grid-Wrapper'), '').getPropertyValue('height');
    var gridWrapperWidth = uw.getComputedStyle(document.getElementById('Grid-Wrapper'), '').getPropertyValue('width');
    var chatWindow = document.getElementById('Chat_Main');

    if (uw.getComputedStyle(chatWindow, '').getPropertyValue('top') > gridWrapperHeight)
      document.getElementById('Chat_Main').style.top = '25px';

    if (uw.getComputedStyle(chatWindow, '').getPropertyValue('left') > gridWrapperWidth)
      document.getElementById('Chat_Main').style.left = '25px';

    // Alle 5 Sekunden nochmal probieren
    window.setTimeout(resetChatPosition, 5000);
  }

  //some layout fixes/workarrounds
  fixes = function()
  {
    //fix the position of the 'ändern' links on the account page.
    if(document.location.href.indexOf('Account') >= 0)
    {
      var links = document.getElementsByTagName('a');
      for(var i = 0; i < links.length; i++)
      {
        if(getComputedStyle(links[i], '').position == 'absolute')
        {
          links[i].style.position = 'static';
          links[i].style.cssFloat = 'right';
        }
      }
    }
  }

  //open writearea on the pinnboard page if the url ends with '/p/'
  pinnboardInit = function()
  {
    var loc = window.location.href;
    if(loc.indexOf('Pinboard/') != -1 && loc.slice(loc.length-4, loc.length-1) != '/p/')
    {
      var messageBox = document.evaluate('//div[@class="pinboard-write obj-box write-pannel"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      messageBox.style.display = 'block';

      window.setTimeout('document.getElementById(\'Pinboard_entry\').focus()', 0);
    }
  }

  modPage = function()
  {
    //create wrapper
    var wrapper = document.createElement('div');

    if(!window.opera)
    {
      wrapper.style.width = parseInt(getComputedStyle(ph, '').width) +
        parseInt(getComputedStyle(ph, '').paddingRight) +
        parseInt(getComputedStyle(ph, '').paddingLeft) +
        parseInt(getComputedStyle(ph, '').borderRightWidth) +
        parseInt(getComputedStyle(ph, '').borderLeftWidth) + 'px';
    }

    wrapper.style.cssFloat = 'left';

    //put everything into the wrapper
    //no header and not iServerInterface, because the chat function needs it
    for(var i = 0; main.childNodes.length > i;)
    {
      if(main.childNodes[i].id == 'Grid-Page-Center-Top')
        i++;
      else
        wrapper.appendChild(main.childNodes[i]);
    }

    //include wrapper
    main.appendChild(wrapper);

    //create box
    box = document.createElement('div');
    box.style.cssFloat = 'right';
    main.appendChild(box);
  }

  this.update = function()
  {
    var old = parseInt(getComputedStyle(box, '').width);

    box.style.width = config.get('width') + 'px';

    for(var i = 0; i < widget_list.length; i++)
    {
      widget_list[i].style.width = config.get('width') + 'px';
    }

    all.style.width = parseInt(getComputedStyle(all, '').width) + config.get('width') - old + 'px';
    main.style.width = parseInt(getComputedStyle(main, '').width) + config.get('width') - old + 'px';
    top.style.width = parseInt(getComputedStyle(top, '').width) + config.get('width') - old + 'px';

    header = top.childNodes[1]
    header.style.width = parseInt(getComputedStyle(header, '').width) + config.get('width') - old + 'px';

    //fix left main menu
    if(config.get('menu_fixed'))
      left.style.position = 'fixed';
    else
      left.style.position = 'static';
  }

  this.addWidget = function(widget)
  {
    box.appendChild(widget);
    widget.style.width = config.get('width') + 'px';
    widget_list.push(widget);
  }
}

