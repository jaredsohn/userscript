// Horde Compactor by Johnny Treehugger (#1427059)
//
// ==UserScript==
// @name           Horde Compactor
// @namespace      http://kol.coldfront.net/thekolwiki/index.php/User:Johnny_Treehugger
// @description    Version 1.1
// @include        http://*kingdomofloathing.com/charpane.php*
// ==/UserScript==

// Version 0.0	08/15/2012	IT BEGINS!
// Version 1.0	08/15/2012	IT'S ALIVE!
// Version 1.1	08/15/2012	Messing around with DOM.  Have to run it before backpack tracker and familiar drop tracker or it breaks their event thingies.  Gotta find a way to fix that.

/*
Squeezes horde image and counter into the spot on the char pane where your MP was, when you were alive.  Click on the image to toggle the big horde on or off.
 */

function togglePicture() {
  var removeHordePic = GM_getValue("removeHordePic", true);
  if (removeHordePic) GM_setValue("removeHordePic", false); else GM_setValue("removeHordePic", true);
  top.frames[1].location.reload();
}

function doCharPane() {
  var removeHordePic = GM_getValue("removeHordePic", true);
  var hordeRegex = /<img src="http:\/\/images.kingdomofloathing.com\/otherimages\/zombies\/horde_.*?gif" alt="Horde.*?" title="Horde.*?" height="100" width="167"><br>Horde: ([0-9]+)/;
  var items = document.body.innerHTML.match(hordeRegex);
  try {
    var horde = new Number(items[1]);
    //alert(horde);

    if (removeHordePic==true) {
      document.body.innerHTML = document.body.innerHTML.replace(hordeRegex, '');
    }

    var x = document.evaluate("//table/tbody/tr/td/img[@title='Hit Points']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    var anchorNode = x.singleNodeValue.parentNode.parentNode;
    //alert (anchorNode.innerHTML);

    var newElement = document.createElement("TR");
    newElement.innerHTML = '<img src="http://images.kingdomofloathing.com/itemimages/zombhead.gif" class="hand" title="Horde" alt="Horde" id="compactHordeCounter"><br><span class="black">' + horde + '</span>';
    newElement.setAttribute("align", "center");

    anchorNode.appendChild(newElement);

    newElement.addEventListener("click", togglePicture);
    //var hordeImg = document.getElementById('compactHordeCounter');
    //if (hordeImg!=null) hordeImg.addEventListener("click", togglePicture);
  } catch (err) {
  }
}

doCharPane();
