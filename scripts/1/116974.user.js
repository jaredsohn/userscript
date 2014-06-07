// ==UserScript==
// @name           Syrnia Auto-Pickup Dropped
// @include        *syrnia*game.php*
// @version                1.4
// ==/UserScript==
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}
function checkDropped() {
try
  {
  for (var i = 0; i < document.getElementById("centerDropList").childNodes.length; i++) {
if (!document.getElementById("centerDropList").childNodes[i].getAttribute("title").toLowerCase().startsWith("broken") && !document.getElementById("centerDropList").childNodes[i].getAttribute("title").toLowerCase().startsWith("burnt")) {
document.getElementById("moveMuch").value = document.getElementById("centerDropList").childNodes[i].outerText;
 usePopUp("New Item","Syrnia Auto-Pickup Dropped has gotten the item, " + document.getElementById("centerDropList").childNodes[i].getAttribute("title") + ".");
     eventFire(document.getElementById("centerDropList").childNodes[i], 'click');
}
}
  }
catch(err)
  {
  }
setTimeout(checkDropped, 1);
}
checkDropped();
function eventFire(el, etype){
  if (el.fireEvent) {
   (el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
function usePopUp(titleHTML,messageHTML) {
    popBox = document.getElementById('messagePopup');
    popTitle = document.getElementById('popupTitle');
    popMsg = document.getElementById('popupMessage');
    var indo = -1;
    try{
    	indo = popBox.getAttribute('style').indexOf("visibility: visible");
  }catch(err){}
    if (indo > -1) {
        popTitle.innerHTML = "<b>Multi-Message Popup</b>";
        popMsg.innerHTML = popMsg.innerHTML + "<br /><br /><hr><br />" + messageHTML;
    }else{
			   popBox.setAttribute('style','visibility: visible;');
	 		   popTitle.innerHTML = titleHTML;
			   popMsg.innerHTML = messageHTML;
    }
}