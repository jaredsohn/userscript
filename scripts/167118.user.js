// ==UserScript==
// @name        IkariamController
// @version     4.0
// @author      Giuseppe De Rito
// @namespace   http://toolsdb.altervista.org/en/
// @include     http://s*.ikariam.*/index.php*
// @require     http://www.dynamicdrive.com/dynamicindex11/domdrag/dom-drag.js
// @updateURL   http://toolsdb.altervista.org/tools/updaters/en/IkariamController.meta.js
// @description Tool for Ikariam
// @run-at      document-end
// ==/UserScript==

// Language & info:

var homepage = 'http://toolsdb.altervista.org/en/';

var infoHTML = '<div style="padding: 4px;">' + 
               ' <b>Tool:</b> <i>Ikariam Controller</i><br>' +
               ' <b>Version:</b> <i>4.0</i><br>' +
               ' <b>Author:</b> <i>Giuseppe De Rito</i><br>' +
               ' <b>Description:</b> <i>This is a tool for Ikariam.<br>You may not distribute this in any form without express written permission of the author.</i><br>' +
               ' <b>Home Page:</b> <i><a href="' + homepage + '" target="_blank">home</a></i><br>' +
               ' <br>For technical support visit the official website.' +
               '</div>';

// Database:

//document.getElementsByTagName('blink')[1].style.display='none';

var tlist = new Array();

unsafeWindow.db = function() {
  this.serverName = unsafeWindow.dataSetForView['serverName'];
  this.serverId = location.href.split('.')[0].split('//s')[1];
  this.playerId = unsafeWindow.dataSetForView['avatarId'];
  this.allyId = unsafeWindow.dataSetForView['avatarAllyId'];
  this.ownCity = unsafeWindow.dataSetForView['isOwnCity'];
  this.hasAlly = unsafeWindow.dataSetForView['hasAlly'];
  this.language = location.href.split('.')[1];
  this.view = unsafeWindow.backgroundView;
  this.cityId = unsafeWindow.bgViewData['currentCityId'];
  this.underConstruction = unsafeWindow.bgViewData['underConstruction'];
  if (this.underConstruction && this.underConstruction>0)
    this.upgradeTime = (unsafeWindow.bgViewData['endUpgradeTime'] - unsafeWindow.dataSetForView['serverTime']);
  else this.upgradeTime = 0;
  this.islandName = document.getElementById('js_islandBreadName').innerHTML;
  this.islandPosition = document.getElementById('js_islandBreadCoords').innerHTML.split('[')[1].split(']')[0].split(':');
  this.reset = function() {
    db = new unsafeWindow.db();
  }
  this.addMenuItem = function(item) {
    unsafeWindow.optionsList.push(item);
    resetMenuItems();
  }
  this.addTool = function(tool) {
    unsafeWindow.toolsList.push(tool);
  }
  this.save = function(key, el) {
    localStorage.setItem(key, el);
  }
  this.load = function(key) {
    return localStorage.getItem(key);
  }
  this.del = function(key) {
    delete localStorage[key];
  }
  this.addToolName = function(nm) {
    tlist.push(nm);
    this.save('tlist', tlist.sort());
  }
}

unsafeWindow.database = new unsafeWindow.db();

// Ajax:

unsafeWindow.ajaxController = function() {
  this.httpRequest = function(url, f) {
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded',
        'Cookie': document.cookie
      },
      onload: f
    });
  }
}

// BoxInterceptor:
unsafeWindow.boxInterceptor = function() {
  this.names = new Array();
  this.functions = new Array();
  this.active = new Array();
  this.interceptSidebar = false;
  this.sidehtml = '';
  this.sidebar = null;
  this.sidefunctions = new Array();
  this.getMain = function() {
    var mainBox = getByClass('mainContentBox');
    if (mainBox.length>0) return mainBox[0];
    return false;
  }
  this.getSidebar = function() {
    var bar = getById('sidebar');
    if (bar) return bar;
    return false;
  }
  this.setInterceptor = function(name, f) {
    this.names.push(name);
    this.active.push(false);
    this.functions.push(f);
  }
  this.setSidebarInterceptor = function(f) {
    this.interceptSidebar = true;
    this.sidefunctions.push(f);
  }
  // Private functions:
  this.controller = function() {
    for (i=0; i<this.names.length; i++) {
      var main = this.getMain(this.names[i]);
      if (!main | this.names[i] != main.id) {
        this.active[i] = false;
      } else {
        if (this.names[i] == main.id && this.active[i] == false) {
          this.active[i] = true;
          this.functions[i]();
          main.style = 'ok';
        } else {
          if (this.names[i] == main.id && main.style != 'ok') {
            this.active[i] = false;
          }
        }
      }
    }
    this.sidebar = getById('sidebar');
    if (this.interceptSidebar && this.sidebar && this.sidebar.innerHTML != '' && this.sidebar.innerHTML != this.sidehtml) {
      this.sidehtml = this.sidebar.innerHTML ;
      for (i=0; i<this.sidefunctions.length; i++) this.sidefunctions[i]();
    }
  }
}

unsafeWindow.interceptor = new unsafeWindow.boxInterceptor();

// Basic Functions:

unsafeWindow.loader = ' function getById(id) { return document.getElementById(id); } ' +
                      ' function getByClass(c) { return document.getElementsByClassName(c); } ' +
                      ' function getByTag(t) { return document.getElementsByTagName(t); } ' +
                      ' function createFrame(x, y, w, h, t) { return new unsafeWindow.frameBox(x, y, w, h, t); } ' +
                      ' var ajax = new unsafeWindow.ajaxController();  ' +
                      ' var interceptor = unsafeWindow.interceptor;  ' +
                      ' var db = unsafeWindow.database; ' ;

eval(unsafeWindow.loader);

// Timer:

unsafeWindow.toolsList = new Array();
setInterval(scheduleTimer,1000);

function scheduleTimer() {
  for (i=0; i<unsafeWindow.toolsList.length; i++) {
    eval(unsafeWindow.toolsList[i]);
  }
}

// Interceptor start:

db.addTool('unsafeWindow.interceptor.controller()');

// Menu:

var GF_toolbar = getById('GF_toolbar').getElementsByTagName('ul')[0];
GF_toolbar.innerHTML += ' <li class="ikaController" style="float: left"> ' + 
                        '  <a href="javascript: openIkaControllerMenu()"> ' +
                        '   <span id="ikaCtrl"> ' +
                        '    IkariamController ' +
                        '   </span> ' +
                        '  </a> ' +
                        ' </li> ' ;

var menuBox  = document.createElement('div');;

function resetMenuItems() {

  menuBox.innerHTML = ' <style> ' +
                      '  #menuBox { ' +
                      '   min-width: 100px; ' +
                      '   padding: 4px; ' +
                      '   background-color: rgb(255, 244, 197); ' +
                      '   position: absolute; ' +
                      '   z-index: 9999; ' +
                      '   border: solid 2px; ' +
                      '   font: 12px Arial,Helvetica,sans-serif; ' +
                      '   border-radius: 0px 6px 6px 6px; ' +
                      '   opacity: 0.9; ' +
                      '   visibility:hidden; ' +
                      '   transition: height 0.3s; ' +
                      '   -moz-transition: height 0.3s; ' +
                      '   -webkit-transition: height 0.3s; ' +
                      '   -o-transition: height 0.3s; ' +
                      '   overflow: hidden; ' +
                      '  } ' +
                      '  #menuBox a {  ' +
                      '   font-weight: bold; ' +
                      '   text-decoration: none; ' +
                      '   padding: 1px; ' +
                      '   border-radius: 4px; ' +
                      '   padding-left: 3px; ' +
                      '   padding-right: 3px; ' +
                      '  } ' +
                      '  #menuBox a:hover {  ' +
                      '   transition: background-color 1s; ' +
                      '   -moz-transition: background-color 1s; ' +
                      '   -webkit-transition: background-color 1s; ' +
                      '   -o-transition: background-color 1s; ' +
                      '   background-color: #C0C0C0; ' +
                      '    ' +
                      '  } ' +
                      ' </style> ';

  for (i=unsafeWindow.optionsList.length-1; i>=0; i--) {
    menuBox.innerHTML += unsafeWindow.optionsList[i]+'<br/>';
  }

  menuBox.style.height = '';
  menuBoxHeight = (menuBox.clientHeight - 8) + 'px';
  menuBox.style.height = '0px';

}

menuBox.id = 'menuBox';
menuBox.style.visibility == 'hidden';
document.body.appendChild(menuBox);
var menuBoxHeight = (menuBox.clientHeight - 8) + 'px';
menuBox.style.height = '0px';

unsafeWindow.optionsList = new Array();
db.addMenuItem('<a href="http://toolsdb.altervista.org/en/ikariamcontroller" target="_blank" onclick="hideMenu();">Tools Market</a>');
//db.addMenuItem('<a href="http://toolsdb.altervista.org/en/" target="_blank" onclick="hideMenu();">ToolsDB</a>');
//db.addMenuItem('<a href="http://www.facebook.com/pages/IkariamToolsDB/340480116047081" target="_blank" onclick="hideMenu();">Facebook</a>');
db.addMenuItem('<a href="javascript: openInfoWindow();" onclick="hideMenu();">Info</a>');

window.addEventListener('resize', setLeftMargin);

function setLeftMargin() {
  var op = getById('ikaCtrl');
  menuBox.style.left = (op.offsetLeft+getById('GF_toolbar').getElementsByTagName('ul')[0].offsetLeft)+'px';
}

unsafeWindow.openIkaControllerMenu = function() {
  var op = getById('ikaCtrl');
  menuBox.style.left = (op.offsetLeft+100)+'px';
  menuBox.style.top = (op.offsetTop+12)+'px';
  if (menuBox.style.visibility == 'visible') {
    menuBox.style.visibility = 'hidden';
    menuBox.style.height = '0px';
  }
  else {
    menuBox.style.visibility = 'visible';
    menuBox.style.height = menuBoxHeight;
  }
  return void(0);
}

unsafeWindow.hideMenu = function() {
  menuBox.style.visibility = 'hidden';
  menuBox.style.height = '0px';
}

// UpdateServer:

var updateIframe = document.createElement('iframe');
updateIframe.style.visibility = 'hidden';
updateIframe.style.display = 'none';
var lastlist = db.load('tlist');
if (lastlist && lastlist!=null) {
  updateIframe.src = 'http://toolsdb.altervista.org/tools/servers/EnUpdateServerV4.php?tools='+lastlist;
  db.del('tlist');
}
else updateIframe.src = 'http://toolsdb.altervista.org/tools/servers/EnUpdateServerV4.php';
document.body.appendChild(updateIframe);

// FrameBox:

unsafeWindow.frameBox = function(x, y, w, h, t) {
  this.title = t;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.div = document.createElement('div');
  this.div.id = this.title+'Frame';
  this.div.className = 'frameBox';
  document.body.appendChild(this.div);
  this.div.style.top = this.y+'px';
  this.div.style.left = this.x+'px';
  this.div.style.width = this.w+'px';
  this.div.style.height = this.h+'px';
  this.div.style.visibility = 'hidden';
  this.titleDiv = document.createElement('div');
  this.titleDiv.className = 'titleDiv';
  this.titleDiv.innerHTML = '<span class="titleSpan">' + this.title + '</span>' +
                            '<span class="closeDiv"><a href="javascript: closeFrame(\'' + this.title+'Frame' + '\')">X</a></span>';
  this.div.appendChild(this.titleDiv);
  this.container = document.createElement('div');
  this.container.className = 'containerDiv';
  this.container.style.height = (this.h-15) + 'px';
  this.div.appendChild(this.container);
  Drag.init(this.titleDiv, this.div);

  this.addInnerHtml = function(html) {
    this.container.innerHTML = html;
  }
  this.show = function() {
    this.div.style.visibility = 'visible';
  }
  this.hide = function() {
    this.div.style.visibility = 'hidden';
  }
}

function onMove(e) {
  var frame = e.target.parentNode;

}

unsafeWindow.closeFrame = function(id) {
  document.getElementById(id).style.visibility = 'hidden';
}

var frameStyle = document.createElement('style');
frameStyle.innerHTML = ' .frameBox { ' +
                       '   position: absolute; ' +
                       '   background-color: rgb(255, 244, 197); ' +
                       '   z-index: 9999; ' +
                       '   border: solid 2px; ' +
                       '   border-radius: 6px; ' +
                       '   opacity: 0.9; ' +
                       '   overflow: hidden; ' +
                       '  } ' +
                       '    ' +
                       ' .titleDiv { ' +
                       '   margin: 0px; ' +
                       '   width: 100%; ' +
                       '   border-bottom: solid 2px; ' +
                       '   background-color: rgb(84, 44, 15); ' +
                       '   color: rgb(255, 244, 197); ' +
                       '   font-weight: bold; ' +
                       '   height: 15px; ' +
                       '   cursor: move; ' +
                       '  } ' +
                       '    ' +
                       ' .titleSpan { ' +
                       '   position:relative; ' +
                       '   margin-left: 4px; ' +
                       '   bottom: 1px; ' +
                       ' }  ' +
                       '    ' +
                       ' .closeDiv { ' +
                       '   position:relative; ' +
                       '   bottom: 1px; ' +
                       '   right: 4px; ' +
                       '   float: right; ' +
                       ' }  ' +
                       '    ' +
                       ' .closeDiv a { ' +
                       '   margin: 0px; ' +
                       '   text-decoration: none; ' +
                       '   color: rgb(255, 244, 197); ' +
                       '   font-weight: bold; ' +
                       ' }  ' +
                       '    ' +
                       ' .closeDiv a:hover { ' +
                       '   color: #C0C0C0; ' +
                       ' }  ' +
                       '    ' +
                       ' .containerDiv {   ' +
                       '   width: 100%; ' +
                       '   margin: 0px; ' +
                       '   overflow: auto; ' +
                       '   margin-top: -2px; ' +
                       ' }  ' ;
document.body.appendChild(frameStyle);

// InfoWindow:

var infoBox = createFrame(600, 200, 300, 178, 'Ikariam Controller Info');
infoBox.addInnerHtml(infoHTML);

unsafeWindow.openInfoWindow = function() {
  infoBox.show();
  return void(0);
}

// External exec:

var exec = db.load('exec');
if (exec && exec != null) eval(exec);