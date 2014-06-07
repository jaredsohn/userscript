// ==UserScript==
// @name           Syrnia Auto-Drop Burnts/Broken Glass
// @include        *syrnia*game.php*
// @version                1.2
// ==/UserScript==
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}
function checkToDrop() {
try
  {
  for (var i = 0; i < document.getElementById("playerInventory").childNodes.length; i++) {
if (document.getElementById("playerInventory").childNodes[i].getAttribute("title").toLowerCase().startsWith("broken") || document.getElementById("playerInventory").childNodes[i].getAttribute("title").toLowerCase().startsWith("burnt")) {
document.getElementById("moveMuch").value = document.getElementById("playerInventory").childNodes[i].outerText;
document.getElementById('droppingAddOnButton').style.display = 'none';
document.getElementById('droppingAddOffButton').style.display = 'block';
eventFire(document.getElementById("playerInventory").childNodes[i],'click');
document.getElementById('droppingAddOnButton').style.display = 'block';
document.getElementById('droppingAddOffButton').style.display = 'none';
}
}
  }
catch(err)
  {
  }
setTimeout(checkToDrop, 1000);
}
checkToDrop();
function eventFire(el, etype){
  if (el.fireEvent) {
   (el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}