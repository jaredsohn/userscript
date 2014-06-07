// ==UserScript==
// @name              img u413
// @namespace         
// @description       123
// @author            lina
// @version           2.1
// @include           http://*.u413.com//*
// @match             http://*.u413.com/*
// @require           http://sizzlemctwizzle.com/updater.php?id=107919
    
// ==/UserScript==
function expandimg(a, H, F, C, G, E, A) {
   element = document.getElementById("thumb" + a); 
   var currentPath = element.getElementsByTagName("img")[0].getAttribute("src").toLowerCase().replace("%21", "!");
   if(currentPath != F.toLowerCase()) {
    var D = '<img src="' + F + '" alt="' + a + '" class="thumb" width="' + E + '" height="' + A + '">'; 
      element.innerHTML = D;
        } else {
      element.innerHTML = '<img src="' + H + '" alt="' + a + '" class="thumb" height="' + G + '" width="' + C + '">'
        }
   