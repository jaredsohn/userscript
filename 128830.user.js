// ==UserScript==
// @name           Show localStorage entries
// @namespace      http://userscripts.org/users/75950
// @description    Show localStorage entries for every web page you visit
// @include        *
// @match          http://*/*
// @version        1.1.7
// ==/UserScript==

window.addEventListener('load', function() {
   var execute = true;
   var myBlockedDomains = [];
   if(GM_getValue("localStorageDomains")) {
      myBlockedDomains = GM_getValue("localStorageDomains").split(",");
      for(var j=0; j<myBlockedDomains.length; j++) {
         if(window.location.hostname == myBlockedDomains[j]) execute = false;
      }
   }
   if(execute) {
      var newCSS = "div.notification {position: fixed; top:0; left:0; width: 100%; border-bottom:3px solid white; color: white; background-color: red; padding: 10px; font-family: Verdana, Arial, sans-serif; font-size: 1em; z-index:200000; text-align: left;} ";
      newCSS += "input.notification {margin-left: 20px; font-size:0.7em;} ";
      newCSS += "table.notification{font-size: 1em; width: 750px; background-color: white; color: black;} ";
      newCSS += "table.notification th {color: white; background-color: black; font-weight: bold; padding: 5px;} ";
      newCSS += "table.notification td {padding: 5px; color: black;} ";
      newCSS += "h4.notification {font-size: 1em; font-weight: normal; color: white;} ";
      GM_addStyle(newCSS);
      if(localStorage.length >0) {
         
         var newNotification = document.createElement('div');
         newNotification.className = "notification";
         
         var newClose = document.createElement('img');
         newClose.src="http://mediacentre.steyr-traktoren.com/App_Themes/Dynamix/closeWhite.gif";
         newClose.style.cssText = "float: right; margin-right: 20px;";
         newNotification.appendChild(newClose);
         
         var newText = document.createTextNode("Something is stored in localStorage on this domain! Do you want to see it?");
         newNotification.appendChild(newText);
         
         var newButton = document.createElement('input');
         newButton.type = "button";
         newButton.className = "notification";
         newButton.value = "View localStorage for this domain";
         newNotification.appendChild(newButton);
         
         var newButton2 = document.createElement('input');
         newButton2.type = "button";
         newButton2.className = "notification";
         newButton2.value = "Never ask me again for this domain";
         newNotification.appendChild(newButton2);
         
         document.body.appendChild(newNotification);
         
         newClose.addEventListener('click', function() {
            newNotification.style.display = 'none';
         }, false);
         
         newButton.addEventListener('click', function() {
            newNotification.removeChild(newText);
            newNotification.removeChild(newButton);
            newNotification.removeChild(newButton2);
            
            var newHeading = document.createElement('h4');
            newHeading.className = "notification";
            var newHeadline = document.createTextNode('localStorage for ' + window.location.hostname);
            newHeading.appendChild(newHeadline);
            newNotification.appendChild(newHeading);
            
            var newTable = document.createElement('table');
            newTable.className = "notification";
            var newThead = document.createElement('thead');
            var newTR = document.createElement('tr');
            var newTH = document.createElement('th');
            newHeadline = document.createTextNode('key');
            newTH.appendChild(newHeadline);
            newTR.appendChild(newTH);
            newTH = document.createElement('th');
            newHeadline = document.createTextNode('value');
            newTH.appendChild(newHeadline);
            newTR.appendChild(newTH);
            newThead.appendChild(newTR);
            newTable.appendChild(newThead);
            
            var newTbody = document.createElement('tbody');
            for(var i=0; i<localStorage.length; i++) {
               newTR = document.createElement('tr');

               var newTD = document.createElement('td');
               newHeadline = document.createTextNode(localStorage.key(i));
               newTD.appendChild(newHeadline);
               newTR.appendChild(newTD);

               newTD = document.createElement('td');
               newHeadline = document.createTextNode(localStorage.getItem(localStorage.key(i)));
               newTD.appendChild(newHeadline);
               newTR.appendChild(newTD);

               newTbody.appendChild(newTR);
            }
            
            newTable.appendChild(newTbody);
            newNotification.appendChild(newTable);
         }, false);
         
         newButton2.addEventListener('click', function() {
            myBlockedDomains.push(window.location.hostname);
            GM_setValue("localStorageDomains", myBlockedDomains.join(","));
            newNotification.style.display = 'none';
         }, false);
      }
   }
}, false);