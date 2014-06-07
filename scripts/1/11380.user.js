// ==UserScript==
// @name           eval all evil
// @namespace      eval_on_every_page
// @include        *
// ==/UserScript==

var fnEvalIsEvil=function(evt) {
  gsEvalAllEvilCommand=prompt('yes, what will it be?',gsEvalAllEvilCommand);
  if (gsEvalAllEvilCommand) {
    try {
      var sResult=eval(gsEvalAllEvilCommand);
      document.getElementById('idEvalIsEvil').title=sResult;
    }catch(e) {
      alert('Error: '+e);
    }
  }
  /*
  if (!evt) evt=window.event; // support ie, for compatibility with trixy (ie userscripts)
  evt.cancelBubble = true;
  if (evt.stopPropagation) {
    evt.stopPropagation();
  }
  */
  return true;
}

var oEvalIsEvil=document.createElement("div");
oEvalIsEvil.id='idEvalIsEvil';
oEvalIsEvil.style.position='absolute';
oEvalIsEvil.style.top='2px';
oEvalIsEvil.style.left='2px';
oEvalIsEvil.style.width='5px';
oEvalIsEvil.style.height='5px';
oEvalIsEvil.style.backgroundColor='red';
oEvalIsEvil.style.border='1px solid yellow';
if(window.addEventListener){ 
  oEvalIsEvil.addEventListener('contextmenu',fnEvalIsEvil,false);
}else{
  oEvalIsEvil.attachEvent('oncontextmenu',fnEvalIsEvil);
}
var gsEvalAllEvilCommand='';
document.body.appendChild(oEvalIsEvil);
