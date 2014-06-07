// ==UserScript==
// @name           Spam
// @namespace      arkan.angrybeaver@gmail.com
// @description    Mobwars hitlist multiclick "hack" for FF/Opera
// @include      http://*.facebook.com/mobwars/hitlist/*
// @exclude      http://apps.facebook.com/mobwars/hitlist/add*
// ==/UserScript==

window.addEventListener('load', function() {
   f = document.forms; 
   for (i = 0; i < f.length; i++) {
   if(f[i].name == 'universal_search_form') continue;   
   var hitStr = null;   
      (location.hostname.indexOf('facebook') == - 1) ? hitStr = 'http://' + location.hostname + '/fight/do.php?' : hitStr = 'http://' + location.hostname + '/mobwars/fight/do.php?'; 
     var inputs = f[i].elements; 
     for (j = 0; j < inputs.length - 1; j++) {
         (j == 0) ? (hitStr = hitStr + inputs[j].name + '=' + inputs[j].value) : (hitStr = hitStr + '&' + inputs[j].name + '=' + inputs[j].value);
       }
       newForm = content.document.createElement("a"); newForm.href = hitStr; newButton = document.createElement("button"); appButton = newForm.appendChild(newButton); appForm = f[i].parentNode.appendChild(newForm); f[i].style.display = 'none'; appButton.style.width = '50px'; appButton.style.height = '25px'; appButton.textContent = 'Whack'; }
   }
, false);