// ==UserScript==
// @name           USO Compare counts
// @namespace      http://userscripts.org/users/75950
// @description    Check install counts on userscripts.org script management
// @include        http://userscripts.org/home/scripts
// @include        http://userscripts.org:8080/home/scripts
// @version        1.0.3
// ==/UserScript==

var theTDArray = [];

window.addEventListener('load', function() {

   GM_addStyle("span.tiny {font-size: 0.8em; color: #ddd}");

   var allScripts = document.getElementById('main').getElementsByTagName('table')[0].getElementsByTagName('tr');
   
   // from 1 to length-1
   for(var i=1; i<allScripts.length; i++) {
      // id contains script-id
      // td[2] contains rating
      // td[3] contains posts
      // td[4] contains fans
      // td[5] contains intalls
      theTDArray = [];
      theTDArray.push(allScripts[i].getElementsByTagName('td')[2]);
      theTDArray.push(allScripts[i].getElementsByTagName('td')[3]);
      theTDArray.push(allScripts[i].getElementsByTagName('td')[4]);
      theTDArray.push(allScripts[i].getElementsByTagName('td')[5]);
      
      var theID = allScripts[i].id.match(/(\d+)/)[1];
      
      var theCounts = [];
      // fill array of integers for new values
      var theMatch = theTDArray[0].textContent.match(/(\d+)\sreview/);
      if(theMatch) {
         theCounts.push(parseInt(theMatch[1], 10));
      } else {
         theCounts.push(0);
      }
      theCounts.push(parseInt(theTDArray[1].innerHTML, 10));
      theCounts.push(parseInt(theTDArray[2].innerHTML, 10));
      theCounts.push(parseInt(theTDArray[3].innerHTML, 10));
      
      //console.log(theCounts);
      
      // already stored?
      if(localStorage.getItem(theID)) {
         var theOldCounts = localStorage.getItem(theID);
         if(theOldCounts.indexOf(",") != -1) {
            // new: All values
            // split values into an array of strings
            theOldCounts = theOldCounts.split(",");
            //console.log(theOldCounts);
            storeValues(theID, theCounts, theOldCounts);
         } else {
            // old: Not supported, initialize stored values
            console.warn('Old version of script not supported. Old values updated with new values');
            storeValues(theID, theCounts);
         }
      } else {
         // initialize stored values
         storeValues(theID, theCounts);
      }
   }
}, false);

function storeValues(id, counts, oldCounts) {
   if(!oldCounts) {
      //console.log('initial store');
      localStorage.setItem(id, counts.join(","));
   } else {
      //console.log('compare store');
      var result = [];
      for(var j=0;j<counts.length;j++) {
         var oc = parseInt(oldCounts[j], 10);
         if(counts[j] > oc) {
            result.push(counts[j]);
            theTDArray[j].style.backgroundColor = "green";
            theTDArray[j].innerHTML += '<span class="tiny"> +' + (counts[j]-oc) + '</span>';
            //console.log(j + ": " + counts[j] + "(" + oldCounts[j] + ")");
         } else {
            result.push(oldCounts[j]);
         }
      }
      localStorage.setItem(id, result.join(","));
   }
}