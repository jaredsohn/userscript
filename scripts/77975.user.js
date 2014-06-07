// ==UserScript==
// @name           The West - Menu plugin
// @namespace      http://www.puli.sk
// @include        http://*.the-west.*/game.php*
// @version        1.02
// ==/UserScript==

var ERROR_CANNOT_CREATE_MENU_BUTTON = {
  en:"MenuPlugin: Cannot create plugin functions. Possible collisions."
}

var ERROR_UNKNOWN_MENU_POSITION = {
  en:"MenuPlugin: Unknown menu position specified in plugin '%1'!"
}

var MENU_BUTTON_IMG = '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';

var uwin = unsafeWindow;
var LNG = "en";
var UNDEFINED = uwin.UNDEFINED;
var ver127;

var pluginActions = {};

function ActionClass(action, button, submenu, bCaption, sbCaption) {
  this.action = action;
  this.button = button;
  this.submenu = submenu;
  this.bCaption = bCaption;
  this.sbCaption = sbCaption;
}

function findPosY(obj)
{
  var curtop = 0;
  if(obj.offsetParent)
      while(true) {
        curtop += obj.offsetTop;
        if(!obj.offsetParent) break;
        obj = obj.offsetParent;
      }
  else if(obj.y) curtop += obj.y;
  return curtop;
}

function findPosX(obj)
{
  var curleft = 0;
  if(obj.offsetParent)
      while(true) {
        curleft += obj.offsetLeft;
        if(!obj.offsetParent) break;
        obj = obj.offsetParent;
      }
  else if(obj.x) curleft += obj.x;
  return curleft;
}

// Function for detecting language from server name
function detectLang() {
	var pos  = window.location.href.indexOf("//");
	var lang = window.location.href.substring(pos+2, pos+4);
	if (ERROR_CANNOT_CREATE_MENU_BUTTON[lang]) { LNG=lang; }
}

// Function for substituing %number in string for parameters sent to function
function hmParse(message) {
  for (i = arguments.length-1; i>0; i--) {
    message = message.replace('%'+i, arguments[i]);
  }
  return message;
}

// Function will remove onclick action from button
function unregisterAction(button_id) {
  var actionObj = pluginActions[button_id];
  actionObj.button.removeEventListener('click', actionObj.action, false);
  return actionObj;
}

// Function will create or add submenu
function addSubmenu(actionObj) {
  var submenu = document.getElementById(actionObj.button.getAttribute('Id')+'_submenu');
  if (!submenu) {
    submenu = document.createElement('DIV');
    submenu.setAttribute('id', actionObj.button.getAttribute('id')+'_submenu');
    // If sumenu is on the left
    if (ver127) {
      leftSide = (actionObj.button.parentNode.parentNode.getAttribute('id').indexOf('left')>=0);
    } else {
      leftSide = (actionObj.button.parentNode.getAttribute('id').indexOf('left')>=0);
    }
    if (leftSide) {
      submenuOffset = 104+25;
    } else {
      submenuOffset = -105;
    }
    submenu.setAttribute('style', 'position: absolute; top:'+(findPosY(actionObj.button))+'px;left:'+(findPosX(actionObj.button)+submenuOffset)+'px; width:104px; z-index:1; display:none');
    
    document.body.appendChild(submenu);
    actionObj.submenu = submenu;
    if (typeof(actionObj.button.childNodes[0].childNodes[0].childNodes[1])!='undefined') {
      actionObj.button.childNodes[0].childNodes[0].childNodes[1].nodeValue=actionObj.bCaption;
    } else {
      actionObj.button.childNodes[0].childNodes[0].childNodes[0].nodeValue=actionObj.bCaption;
    }
  }

  var sButton = document.createElement('DIV');
  sbutton_id = submenu.getAttribute('id')+'_'+submenu.childNodes.length;
  sButton.setAttribute('id',sbutton_id);
  sButton.addEventListener('click', actionObj.action, false);
  sButton.innerHTML = '<div style=\'float:right; width:104px; height:25px; background: url("../images/button/right_normal.png") right no-repeat\'><div style=\'float:left; width:104px; height:25px; background: url("../images/button/left_normal.png") left no-repeat\'><div style=\'position:relative; left:9px; width: 86px; height:25px; color: rgb(255, 255, 255); background: url("../images/button/middle_normal.png") center repeat-x\'><a href="#"><span style=\'left: 0px; width: 86px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 13px; position: relative; top: 4px; text-align: center;\'></span></a></div></div></div>';
  sButton.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML="<nobr>"+actionObj.sbCaption+"</nobr>";
  submenu.appendChild(sButton);
}

// Function will hide submenu after specified time period
function hidePluginSubmenu(submenu) {
  var timeout = submenu.getAttribute('visCounter')*1;
  timeout--;
  submenu.setAttribute('visCounter',timeout);
  if (timeout>0 && submenu.getAttribute('countDown')=='Y') {
    setTimeout(function(){hidePluginSubmenu(submenu)}, 1000);
  } else {
    if (submenu.getAttribute('countDown')=='Y') {
      submenu.style.display='none';
    }
  }
}
/*@Author Hamid Alipour Codehead @ webmaster-forums.code-head.com	*/
function is_child_of(parent, child) {
	if( child != null ) {			
		while( child.parentNode ) {
			if( (child = child.parentNode) == parent ) {
				return true;
			}
		}
	}
	return false;
}

/*@Author Hamid Alipour Codehead @ webmaster-forums.code-head.com	*/
function fixOnMouseOut(element, event, JavaScript_code) {
	var current_mouse_target = null;
	if( event.toElement ) {				
		current_mouse_target = event.toElement;
	} else if( event.relatedTarget ) {				
		current_mouse_target = event.relatedTarget;
	}
	if( !is_child_of(element, current_mouse_target) && element != current_mouse_target ) {
		eval(JavaScript_code);
	}
}

function closeAllOtherSubmenus(el) {
  var elems = uwin.document.getElementsByTagName('DIV');
  for (i=0; i<elems.length; i++) {
    if (!elems[i].getAttribute('id')) continue;
    if (elems[i].getAttribute('id')==el.getAttribute('id')+"_submenu") continue;
    if (elems[i].getAttribute('id').indexOf("_submenu")>=0 && elems[i].getAttribute('id').indexOf("_submenu")==elems[i].getAttribute('id').length-8) {
      elems[i].setAttribute('visCounter', 1);
      elems[i].setAttribute('countDown','Y')
      hidePluginSubmenu(elems[i]);
    }
  }
}

function registerAction(button, action, buttonCaption, submenuButtonCaption) {
  if(document.getElementById(button.getAttribute('id'))) {
    // Button already exists, so we need to add it into submenu
    // First we need to delete former action from main button
    formerAction = unregisterAction(button.getAttribute('id'));
    button = formerAction.button;
    // Now we create submenu from previous button action and add actions 
    if (!formerAction.submenu) {
      addSubmenu(formerAction);
      button.addEventListener('mouseover', function(){closeAllOtherSubmenus(this)}, false);
      eval("button.addEventListener('mouseover', function(){var mySubmenu = document.getElementById('"+button.getAttribute('id')+"_submenu'); mySubmenu.style.display='block'; mySubmenu.setAttribute('countDown','N');}, false);");
      eval("button.addEventListener('mouseout', function(event){fixOnMouseOut(this, event, \"var mySubmenu = document.getElementById('"+button.getAttribute('id')+"_submenu'); mySubmenu.setAttribute('countDown', 'Y'); setTimeout(function(){hidePluginSubmenu(mySubmenu)}, 1000);\")}, false);");
      eval("formerAction.submenu.addEventListener('mouseover', function(){var mySubmenu = document.getElementById('"+formerAction.submenu.getAttribute('Id')+"'); mySubmenu.style.display='block'; mySubmenu.setAttribute('countDown','N'); mySubmenu.setAttribute('visCounter','2');}, false)");
      eval("formerAction.submenu.addEventListener('mouseout', function (event) {fixOnMouseOut(this, event, \"var mySubmenu = document.getElementById('"+formerAction.submenu.getAttribute('Id')+"'); mySubmenu.setAttribute('countDown', 'Y'); setTimeout(function(){hidePluginSubmenu(mySubmenu)}, 1000);\")}, false)");
    }
    // For adding 
    addSubmenu(new ActionClass(action, button, formerAction.submenu, buttonCaption, submenuButtonCaption));

    return true;
  } else {
    // Sole button.
    // Register action for main button 
    button.addEventListener('click', action, false);
    pluginActions[button.getAttribute('id')] = (new ActionClass(action, button, null, buttonCaption, submenuButtonCaption));
    return null;
  };
}

// Function for adding new menu button on left or right side
function addPluginMenuButton(pluginName, side, buttonHTML_id, buttonCaption, submenuButtonCaption, action, MENU_ICO) {

  if (side != 'left' && side != 'right') {
    new uwin.HumanMessage(hmParse(ERROR_UNKNOWN_MENU_POSITION[LNG], pluginName), false);
    return;
  }

  work_bar = document.getElementById('workbar_'+side);
  ver127 = ((work_bar)!==null);

  var button = document.createElement('DIV');
  if (buttonHTML_id) {
    button.setAttribute('id', buttonHTML_id);
  }
  button.setAttribute('style','background: url(data:image/gif;base64,'+MENU_BUTTON_IMG+') '+side+' no-repeat; height:25px;');
  submenu = registerAction(button, action, buttonCaption, submenuButtonCaption);
  if (submenu) {
    return;
  }
  img = '';
  if (typeof(MENU_ICO) != 'undefined'){
    img = '<img src="data:image/png;base64,'+MENU_ICO+'" style="position: absolute; left: '+(side=='right'?-25:104)+'px; top:-3px; z-index:100;"/>';
  }
  button.innerHTML = '<a href="#"><span style="left:'+(25*(side=='right'?1:0))+'px ;width: 104px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 13px; position: relative; top: 4px; text-align: center;">'+img+submenuButtonCaption+'</span></a>'; 
  var menuDiv = document.getElementById(side+'_menu');
  if (ver127) { 
    // For new layout
    menuDiv.childNodes[1].appendChild(button);
  
    work_bar = document.getElementById('workbar_'+side);
    work_bar.style.top = (findPosY(work_bar)+26)+"px";
  } else {
    // For old layout
    menuDiv.appendChild(button);

    // fix "abdorments"
    document.getElementById('abdorment_'+side).style.zIndex = "5";
  }
}

// Function looks if there are som plugins, that have dependency on this plugin
function startDependentPlugins() {
  if (typeof(uwin.pluginList)== 'undefined') setTimeout(startDependentPlugins, 500);
  if (typeof(uwin.pluginList['The West - Menu plugin'])== 'undefined') setTimeout(startDependentPlugins, 500);
  try {
  if (uwin.pluginList['The West - Menu plugin'].length>0) {
    startDepPlug = uwin.pluginList['The West - Menu plugin'].pop();
    startDepPlug();
  }
  setTimeout(startDependentPlugins, 500);
  } catch(e) {
    alert(e.message);
  }
}

// Function adjusts right submenus when resizing occured
function adjustSubmenus() {
  for (i in pluginActions) {
    var submenu = pluginActions[i].submenu;

    if (!submenu) continue;

    // If submenu is on the left or right side?
    if (ver127) {
      leftSide = (pluginActions[i].button.parentNode.parentNode.getAttribute('id').indexOf('left')>=0);
    } else {
      leftSide = (pluginActions[i].button.parentNode.getAttribute('id').indexOf('left')>=0);
    }
    if (!leftSide) {
      submenu.style.left = (findPosX(pluginActions[i].button)-105)+'px'; 
    }
  }
}

function start() {
  detectLang();

  // Check whether there is a name collision
  if (uwin.addPluginMenuButton) {
    new uwin.HumanMessage(ERROR_CANNOT_CREATE_MENU_BUTTON[LNG], false);
    return;
  }
  
  uwin.addPluginMenuButton = addPluginMenuButton;
  uwin.addEventListener("resize", adjustSubmenus, false);
  
  // After initializing run dependent plugins
  startDependentPlugins();
}

uwin.addEventListener("load", function() {start()}, false);