// ==UserScript==
// @name          Freenet Mail Expander
// @author        numessiah@gmail.com
// @namespace     http://people.freenet.de/numessiah/freenet
// @description	  Expands the main mail area in Freenet Office
// @include       http://office.freenet.de/*
// ==/UserScript==

(function() {

  banner=document.getElementById('frnBanner');
  if(banner){banner.style.display='none';}

  footer=document.getElementById('frnFoot');
  if(footer){footer.style.display='none';}

  frameset=document.getElementsByTagName('FRAMESET')[0];
  if(frameset){frameset.rows='25%,75%';}

  document.body.setAttribute('onresize',"set_iframe_size();");

  script=document.getElementsByTagName('SCRIPT')[0];
  if(script && script.innerHTML.match(/- 253 - head_height/) && !script.innerHTML.match(/UserScript/)){
    var myScript=document.createElement('script');
    myScript.innerHTML=script.innerHTML.replace(/- 253 - head_height/g,'- 170');
    script.parentNode.replaceChild(myScript,script);
  }

})();
