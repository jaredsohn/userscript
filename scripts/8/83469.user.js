// ==UserScript==

// @name           xtremos color 1
// @namespace      xtremos
// @description    cambiarle el color a xtremos
// @include        http://*.xtremos.net/*

// ==/UserScript==

document.body.addEventListener("load", colores, false);
document.body.addEventListener("load", chatl, false)
var imagenes = "http://i197.photobucket.com/albums/aa70/gosht_/"

if(window.location.pathname=="/posts/1/chat") {chat();}
if(window.location.pathname=="/favoritos.php") {favos();}


function submit() {
  node = document.getElementById("znerp");
  setup = {dark:node.getElementsByTagName("input")[0].value,
           light:node.getElementsByTagName("input")[1].value,
           top:node.getElementsByTagName("input")[2].value,
           tophover:node.getElementsByTagName("input")[3].value};
  GM_setValue("setup", uneval(setup));
  window.clearInterval(inter);
  node.parentNode.removeChild(node);
}

function cancel() {
  node = document.getElementById("znerp");
  addStyle(eval(GM_getValue("setup",'({dark:"#F0F0F0", light:"#006088", top:"", tophover:"" })')));
  window.clearInterval(inter);
  node.parentNode.removeChild(node);
}

function setColours() {

  var setup = eval(GM_getValue("setup",'({dark:"#F0F0F0", light:"#006088", top:"", tophover:"" })'));

  newDiv = document.createElement("div");
  newDiv.setAttribute("id", "znerp");
  newDiv.setAttribute("style", "position: fixed; left: "+((window.innerWidth / 2) - 290)+"px; top: "+
((window.innerHeight / 2) - 200)+"px; z-index: 1337; background: rgba(255, 255, 255, 0.9) !important;-moz-border-
radius:7px;padding:7px !important;-moz-box-shadow:0px 0px 10px rgba(0, 0, 0, 0.8);width: 577px");
  newDiv.innerHTML += "<center><b><h2>Cambia colores xtremos 3.0 - por Rondamoun y Dinastia<h2></b></center>";
  
  table = document.createElement("table");
  
  row0 = document.createElement("tr");
  column01 = document.createElement("td");
  column02 = document.createElement("td");
  column01.innerHTML = "<center>Fondo</center>";
  column02.innerHTML = "<center>Contenido</center>";
  row0.appendChild(column01);
  row0.appendChild(column02);
  table.appendChild(row0);
  
  row1 = document.createElement("tr");
  column11 = document.createElement("td");
  column12 = document.createElement("td");
  darkDiv = document.createElement("div");
  darkDiv.setAttribute("id", "dark");
  lightDiv = document.createElement("div");
  lightDiv.setAttribute("id", "light");
  light = document.createElement("input");
  light.setAttribute("type", "text");
  light.setAttribute("class", "color");
  light.setAttribute("value", setup.light);
  lightDiv.appendChild(light);
  dark = document.createElement("input");
  dark.setAttribute("type", "text");
  dark.setAttribute("class", "color");
  dark.setAttribute("value", setup.dark);
  darkDiv.appendChild(dark);
  column11.appendChild(darkDiv);
  column12.appendChild(lightDiv);
  row1.appendChild(column11);
  row1.appendChild(column12);
  table.appendChild(row1);
  
  row2 = document.createElement("tr");
  column21 = document.createElement("td");
  column22 = document.createElement("td");
  row2.appendChild(column21);
  row2.appendChild(column22);
  table.appendChild(row2);

  newDiv.appendChild(table);
  
  buttonInput = document.createElement("form");
  button = document.createElement("input");
  button.setAttribute("type", "button");
  button.setAttribute("value", "Cancelar");
  button.addEventListener("click", cancel, false);
  button2 = document.createElement("input");
  button2.setAttribute("type", "button");
  button2.setAttribute("value", "Guardar!");
  button2.addEventListener("click", submit, false);
  buttonInput.appendChild(button2);
  buttonInput.appendChild(button);
  anotherDiv = document.createElement("div");
  anotherDiv.setAttribute("style", "float: right");
  anotherDiv.appendChild(buttonInput);
  newDiv.appendChild(anotherDiv);
  
  document.body.appendChild(newDiv);
  
  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  oldDark='';
  oldLight='';
  oldTop = '';
  oldHover = '';
  inter = window.setInterval(function (){
    var darkcolor = document.getElementById("znerp").getElementsByTagName("input")[0].value;
    var lightcolour = document.getElementById("znerp").getElementsByTagName("input")[1].value;
    var top = document.getElementById("znerp").getElementsByTagName("input")[2].value;
    var tophover = document.getElementById("znerp").getElementsByTagName("input")[3].value;
    if(oldDark!=darkcolor || oldLight !=lightcolour || oldTop != top || oldHover != tophover) {
      addStyle({dark:darkcolor, light:lightcolour, top:top, tophover:tophover});
    }
    oldDark = darkcolor;
    oldLight = lightcolour;
    oldTop = top;
    oldHover = tophover;
  },1000);
  
  /** The following code is taken and slightly modified from code by Bob Ippolito <bob@redivi.com>.
   ** See somewhere in the middle of this code for the original and unmodified copyright notice.
   **/
  var CROSSHAIRS_LOCATION = imagenes +"CROSSHAIRS.png";
  var HUE_SLIDER_LOCATION = imagenes +"HUE_SLIDER.png";
  var HUE_SLIDER_ARROWS_LOCATION = imagenes +"HUE_SLIDER_ARROWS.png";
  var SAT_VAL_SQUARE_LOCATION = imagenes +"sat_val.png";
     
  // Here are some boring utility functions. The real code comes later.
  function hexToRgb(hex_string, default_){
    if (default_ == undefined)
        default_ = null;
    if (hex_string.substr(0, 1) == '#')
        hex_string = hex_string.substr(1);
    var r;
    var g;
    var b;
    if (hex_string.length == 3) {
      r = hex_string.substr(0, 1);
      r += r;
      g = hex_string.substr(1, 1);
      g += g;
      b = hex_string.substr(2, 1);
      b += b;
    } else if (hex_string.length == 6) {
      r = hex_string.substr(0, 2);
      g = hex_string.substr(2, 2);
      b = hex_string.substr(4, 2);
    } else {
      return default_;
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    if (isNaN(r) || isNaN(g) || isNaN(b))
      return default_;
    else
      return {r: r / 255, g: g / 255, b: b / 255};
  }
  
  function rgbToHex(r, g, b, includeHash) {
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    if (includeHash == undefined)
      includeHash = true;
    r = r.toString(16);
    if (r.length == 1)
      r = '0' + r;
    g = g.toString(16);
    if (g.length == 1)
      g = '0' + g;
    b = b.toString(16);
    if (b.length == 1)
      b = '0' + b;
    return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
  }
  
  var arVersion = navigator.appVersion.split("MSIE");
  var version = parseFloat(arVersion[1]);
  
  function fixPNG(myImage) {
    if ((version >= 5.5) && (version < 7) && (document.body.filters)) {
      var node = document.createElement('span');
      node.id = myImage.id;
      node.className = myImage.className;
      node.title = myImage.title;
      node.style.cssText = myImage.style.cssText;
      node.style.setAttribute('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + 
myImage.src + "\', sizingMethod='scale')");
      node.style.fontSize = '0';
      node.style.width = myImage.width.toString() + 'px';
      node.style.height = myImage.height.toString() + 'px';
      node.style.display = 'inline-block';
      return node;
    } else {
      return myImage.cloneNode(false);
    }
  }
  
  function trackDrag(node, handler) {
    function fixCoords(x, y) {
      var nodePageCoords = pageCoords(node);
      x = (x - nodePageCoords.x) + document.documentElement.scrollLeft;
      y = (y - nodePageCoords.y) + document.documentElement.scrollTop;
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > node.offsetWidth - 1) x = node.offsetWidth - 1;
      if (y > node.offsetHeight - 1) y = node.offsetHeight - 1;
      return {x: x, y: y};
    }
    function mouseDown(ev) {
      var coords = fixCoords(ev.clientX, ev.clientY);
      var lastX = coords.x;
      var lastY = coords.y;
      handler(coords.x, coords.y);
      function moveHandler(ev) {
        var coords = fixCoords(ev.clientX, ev.clientY);
        if (coords.x != lastX || coords.y != lastY) {
          lastX = coords.x;
          lastY = coords.y;
          handler(coords.x, coords.y);
        }
      }
      function upHandler(ev) {
        myRemoveEventListener(document, 'mouseup', upHandler);
        myRemoveEventListener(document, 'mousemove', moveHandler);
        myAddEventListener(node, 'mousedown', mouseDown);
      }
      myAddEventListener(document, 'mouseup', upHandler);
      myAddEventListener(document, 'mousemove', moveHandler);
      myRemoveEventListener(node, 'mousedown', mouseDown);
      if (ev.preventDefault) ev.preventDefault();
    }
    myAddEventListener(node, 'mousedown', mouseDown);
    //node.onmousedown = function(e) { return false; };
    //node.onselectstart = function(e) { return false; };
    //node.ondragstart = function(e) { return false; };
  }
  
  var eventListeners = [];
  
  function findEventListener(node, event, handler) {
    var i;
    for (i in eventListeners)
      if (eventListeners[i].node == node && eventListeners[i].event == event && eventListeners[i].handler == handler)
        return i;
    return null;
  }
  
  function myAddEventListener(node, event, handler) {
    if (findEventListener(node, event, handler) != null)
      return;
    if (!node.addEventListener)
      node.attachEvent('on' + event, handler);
    else
      node.addEventListener(event, handler, false);
    eventListeners.push({node: node, event: event, handler: handler});
  }
  
  function removeEventListenerIndex(index) {
    var eventListener = eventListeners[index];
    delete eventListeners[index];
    if (!eventListener.node.removeEventListener)
      eventListener.node.detachEvent('on' + eventListener.event, eventListener.handler);
    else
      eventListener.node.removeEventListener(eventListener.event, eventListener.handler, false);
  }
  
  function myRemoveEventListener(node, event, handler) {
    removeEventListenerIndex(findEventListener(node, event, handler));
  }
  function cleanupEventListeners() {
    var i;
    for (i = eventListeners.length; i > 0; i--)
      if (eventListeners[i] != undefined)
        removeEventListenerIndex(i);
  }
  
  myAddEventListener(window, 'unload', cleanupEventListeners);
  
 function hsvToRgb(hue, saturation, value) {
    var red;
    var green;
    var blue;
    if (value == 0.0) {
      red = 0;
      green = 0;
      blue = 0;
    } else {
      var i = Math.floor(hue * 6);
      var f = (hue * 6) - i;
      var p = value * (1 - saturation);
      var q = value * (1 - (saturation * f));
      var t = value * (1 - (saturation * (1 - f)));
      switch (i) {
        case 1: red = q; green = value; blue = p; break;
        case 2: red = p; green = value; blue = t; break;
        case 3: red = p; green = q; blue = value; break;
        case 4: red = t; green = p; blue = value; break;
        case 5: red = value; green = p; blue = q; break;
        case 6: // fall through
        case 0: red = value; green = t; blue = p; break;
      }
    }
    return {r: red, g: green, b: blue};
  }
  
  function rgbToHsv(red, green, blue) {
    var max = Math.max(Math.max(red, green), blue);
    var min = Math.min(Math.min(red, green), blue);
    var hue;
    var saturation;
    var value = max;
    if (min == max) {
      hue = 0;
      saturation = 0;
    } else {
      var delta = (max - min);
      saturation = delta / max;
      if (red == max)
        hue = (green - blue) / delta;
      else if (green == max)
        hue = 2 + ((blue - red) / delta);
      else
        hue = 4 + ((red - green) / delta);
      hue /= 6;
      if (hue < 0) hue += 1;
      if (hue > 1) hue -= 1;
    }
    return {
      h: hue,
      s: saturation,
      v: value
    };
  }
  function pageCoords(node) {
    var x = node.offsetLeft;
    var y = node.offsetTop;
    var parent = node.offsetParent;
    while (parent != null) {
      x += parent.offsetLeft;
      y += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return {x: x, y: y};
  }
  
  // The real code begins here.
  var huePositionImg = document.createElement('img');
  huePositionImg.galleryImg = false;
  huePositionImg.width = 35;
  huePositionImg.height = 11;
  huePositionImg.src = HUE_SLIDER_ARROWS_LOCATION;
  huePositionImg.style.position = 'absolute';
  var hueSelectorImg = document.createElement('img');
  hueSelectorImg.galleryImg = false;
  hueSelectorImg.width = 35;
  hueSelectorImg.height = 200;
  hueSelectorImg.src = HUE_SLIDER_LOCATION;
  hueSelectorImg.style.display = 'block';
  var satValImg = document.createElement('img');
  satValImg.galleryImg = false;
  satValImg.width = 200;
  satValImg.height = 200;
  satValImg.src = SAT_VAL_SQUARE_LOCATION;
  satValImg.style.display = 'block';
  var crossHairsImg = document.createElement('img');
  crossHairsImg.galleryImg = false;
  crossHairsImg.width = 21;
  crossHairsImg.height = 21;
  crossHairsImg.src = CROSSHAIRS_LOCATION;
  crossHairsImg.style.position = 'absolute';
  
  function makeColorSelector(inputBox) {
    var rgb, hsv
    function colorChanged() {
      var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      var hueRgb = hsvToRgb(hsv.h, 1, 1);
      var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);
      previewDiv.style.background = hex;
      inputBox.value = hex;
      satValDiv.style.background = hueHex;
      crossHairs.style.left = ((hsv.v*199)-10).toString() + 'px';
      crossHairs.style.top = (((1-hsv.s)*199)-10).toString() + 'px';
      huePos.style.top = ((hsv.h*199)-5).toString() + 'px';
    }
    function rgbChanged() {
      hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      colorChanged();
    }
    function hsvChanged() {
      rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
      colorChanged();
    }
    var colorSelectorDiv = document.createElement('div');
    colorSelectorDiv.style.padding = '15px';
    colorSelectorDiv.style.position = 'relative';
    colorSelectorDiv.style.height = '275px';
    colorSelectorDiv.style.width = '250px';
    var satValDiv = document.createElement('div');
    satValDiv.style.position = 'relative';
    satValDiv.style.width = '200px';
    satValDiv.style.height = '200px';
    var newSatValImg = fixPNG(satValImg);
    satValDiv.appendChild(newSatValImg);
    var crossHairs = crossHairsImg.cloneNode(false);
    satValDiv.appendChild(crossHairs);
    function satValDragged(x, y) {
      hsv.s = 1-(y/199);
      hsv.v = (x/199);
      hsvChanged();
    }
    trackDrag(satValDiv, satValDragged)
    colorSelectorDiv.appendChild(satValDiv);
    var hueDiv = document.createElement('div');
    hueDiv.style.position = 'absolute';
    hueDiv.style.left = '230px';
    hueDiv.style.top = '15px';
    hueDiv.style.width = '35px';
    hueDiv.style.height = '200px';
    var huePos = fixPNG(huePositionImg);
    hueDiv.appendChild(hueSelectorImg.cloneNode(false));
    hueDiv.appendChild(huePos);
    function hueDragged(x, y) {
      hsv.h = y/199;
      hsvChanged();
    }
    trackDrag(hueDiv, hueDragged);
    colorSelectorDiv.appendChild(hueDiv);
    var previewDiv = document.createElement('div');
    previewDiv.style.height = '50px'
    previewDiv.style.width = '50px';
    previewDiv.style.position = 'absolute';
    previewDiv.style.top = '225px';
    previewDiv.style.left = '15px';
    previewDiv.style.border = '1px solid black';
    colorSelectorDiv.appendChild(previewDiv);
    function inputBoxChanged() {
      rgb = hexToRgb(inputBox.value, {r: 0, g: 0, b: 0});
      rgbChanged();
    }
    myAddEventListener(inputBox, 'change', inputBoxChanged);
    inputBox.size = 8;
    inputBox.style.position = 'absolute';
    inputBox.style.right = '15px';
    inputBox.style.top = (225 + (25 - (inputBox.offsetHeight/2))).toString() + 'px';
    colorSelectorDiv.appendChild(inputBox);
    inputBoxChanged();
    return colorSelectorDiv;
  }
  /** End of code that's not written by me. **/

  (node=document.getElementById("dark").getElementsByTagName("input")[0]).parentNode.insertBefore(makeColorSelector
(node), null);
  (node=document.getElementById("light").getElementsByTagName("input")[0]).parentNode.insertBefore(makeColorSelector
(node), null);
}


function addStyle(setup) {
  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  style.innerHTML = "a{color:"+setup.dark+";}" +
                    "body{background:"+setup.dark+";padding-top:10px;border-color:"+setup.light+";border-bottom:10px 
solid "+setup.dark+";}" +
                    "#centro .box_title{background:none;}" +
                    "#centro .box_txt{-moz-border-radius-topleft:6px;-moz-border-radius-topright:6px;background:url
(http://i.t.net.ar/images/box_titlebg.gif);padding:5px;padding-left:10px;width:275px !important;}" +
                    ".box_cuerpo{background:#e7e7e7;-moz-border-radius-bottomleft:6px;-moz-border-radius-
bottomright:6px;}" +
                    "#cuerpo1 br{display:none}" +
                    "#cuerpo1 span br{display:inline}" +
                    ".tags_cloud,#cuerpocontainer center iframe,ins,#monitor center object,#centro 
.box_rss,.banner,#logo,.tops_tags,.adsByT,.socialAds,#banner,#pie,#footer,.byYahoo,.container208,.byGoogle,.box_perfi
l_der iframe,.bbox,.cse-branding-logo,#mensaje-top,.rtop,.rbott,#derecha,.sticky,#estadisticasBox{display:none !
important}" +
                    ".comunidades #derecha,.box_cuerpo  hr,.box_perfil hr,.container940 center,.container740 center
{display:block !important}" +
                    ".comunidades #izquierda{width:160px !important;}" +
                    "#izquierda{width:634px !important;}" +
                    "#centro{margin-bottom:-32px;}" +
                    ".cita{-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;}" +
                    ".citacuerpo{-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;}" +
                    "input.login, .button,.mBtn,.btnOk{background-image:none !important;border:0px !important;-moz-
border-radius:12px;color:#fff !important;text-shadow: 0 0 0 !important;}" +
                    "#menu .menu_izq,#menu .menu_der{background:none;}" +
                    ".container740 .box_txt,.link_resultado{width:922px;}" +
                    ".container740 .box_cuerpo{width:924px;}" +
                    "#menu{-moz-border-radius-topleft:7px;-moz-border-radius-topright:7px;}" +
                    "#maincontainer{-moz-border-radius:10px;padding:12px;background:url("+ imagenes +"T-desing-
head.png)no-repeat;}" +
                    "#maincontainer,input.login, .button,.mBtn,.btnOk{background-color:"+setup.light+" !important}" +
                    ".container740 .box_title,#temaComunidad,.temaBubble,#monitor #resultados,#monitor 
#showResult,.container400, #centroDerecha{width:940px !important;}" +
                    ".temaCont{width:780px !important;}.comunidades #izquierda{display:none}" +
                    ".infoPost{width:893px !important;}.comunidades #centro{width:674px !important;}.comunidades 
#centro .box_txt{width:660px !important;}" +
                    ".answerTxt{width:808px !important;}" +
                    "#monitor #resultados .filterBy{width:925px !important;}" +
                    "#menu{-moz-border-radius-topleft:10px !important;}" +
                    "#tabbedPosts{-moz-border-radius-topleft:8px !important;}" +
                    ".tabsMenu{width:600px !important;}.tabsMenu .clearBoth{display:none !important;}" +
                    ".menuTabs,#tabbedPosts a{background:transparent !important;}";
}

function colores() {

var colores=document.createElement('li');
colores.setAttribute("id","colores");
colores.innerHTML='<a href="javascript:void(O)" title="Cambia los colores de xtremos"><img src="' +imagenes 
+'lapiz.png"></a>';
colores.addEventListener("click",setColours,true);

document.getElementsByClassName("menuTabs")[0].appendChild(colores);
}
colores();


function chatl() {
var chatl=document.createElement('li');
chatl.innerHTML='<a href="/posts/1/chat" title="Chat!">Chat</a>';

document.getElementsByClassName("tabsMenu")[0].appendChild(chatl);

}
chatl();


function chat() {

var user = document.getElementsByClassName("username")[0].innerHTML;
var contenido = document.getElementsByClassName("container400")[0];
contenido.innerHTML='<iframe frameborder="0" width="940" height="400" src="http://www6.cbox.ws/box/?
boxid=10708&amp;boxtag=wf731w&amp;sec=main" marginheight="2" marginwidth="2" scrolling="auto" allowtransparency="yes" 
name="cboxmain" style="border:#FFFFFF 1px solid;" id="cboxmain"></iframe><form name="cbox" target="cboxmain" 
action="http://www6.cbox.ws/box/index.php?boxid=10708&boxtag=wf731w&sec=submit" method="post" class="cfrm" 
onsubmit="return do_post();"><input type="hidden" name="key" value=""><input type="hidden" name="nme" 
value="'+user+'">\
<center><table border="0" cellpadding="0" cellspacing="0" width="936"><tr>\
<td width="20"><a href="http://www6.cbox.ws/box/index.php?boxid=10708&boxtag=wf731w&sec=main" target="cboxmain" 
onclick="return do_refresh();" id="rf"><span class="systemicons actualizar"></span></a></td>\
<td><input type="text" maxlength="1000" name="pst" autocomplete="off" size="9" value="" style="width:100%;"></td>\
<td width="50"><input type="submit" value="Enviar" name="sub" class="frmbtn" style="margin-
left:5px;padding:3px;"></form></td></tr></table></center>';
}

function favos() {
  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  style.innerHTML = ".comunidades #izquierda{display:block !important}.comunidades #centroDerecha{width:767px !
important;}";
}


function redireccionar() {location.href="http://www.xtremos.net/perfil/Rondamoun"}


GM_registerMenuCommand("Cambiar el color a xtremos.", setColours);
GM_registerMenuCommand("Ir al link del Script", redireccionar);
addStyle(eval(GM_getValue("setup",'({dark:"#3b5998", light:"#6d84b4", top:"", tophover:"" })')));
