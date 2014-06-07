// ==UserScript==
// @name        KG - check screenshots
// @namespace   KG
// @include     http*://*karagarga.net/details.php?*
// @exclude	http*://forum.karagarga.net/*
// @version     0.5
// ==/UserScript==

var retry = 500;

// don't run in iFrames
if (window.frameElement) return;

var pics = new Array();
var keepGoing = 0;
var err = "";

var headings = document.querySelectorAll(".heading");

for (i=0; i < headings.length; i++) {
      if (headings[i].textContent.indexOf('Description') == 0) {
              var d = headings[i].parentNode;
      }
      if (headings[i].textContent.indexOf('Rip Specs') == 0) {
      		var specs = headings[i].parentNode.getElementsByTagName('td')[1];
      }
}

checkPics();

function checkPics() {

      var s = d.getElementsByTagName('img');

      for (i=s.length -1; i > -1; i--) {
            if (keepGoing > 9) { err += "<br>Some timed out or are broken - try refreshing"; break; }
            var pic = s[i];
            if (pic.naturalWidth == 0) {
	       	setTimeout(function(){
        	    keepGoing++;
        	    checkPics();
	       	}, retry);
         	return;
            }  
      }

      for (i=s.length -1; i > -1; i--) {
          var pic = s[i];
           if (pic.naturalWidth > 299) {   // don't match images with width < 300px, to ignore smileys, logos etc.
		var split = pic.src.split('?')[0];
		var split2 = split.split(".");
		var fileExt = split2[split2.length-1];
		pics.push(pic.naturalWidth +"x"+ pic.naturalHeight + "." + fileExt)
           }
	}
	
      var countPics = sortByFrequencyAndRemoveDuplicates(pics); 
      if (!countPics[0]) { countPics[0] = "no images found"; }
      
      var output = "<span style='font-weight:bold;'>" + countPics[0] + "</span>";
	
	for (i=1; i < countPics.length; i++) {
		output += ", " + countPics[i];
	}
	
      specs.innerHTML = "<span style='color: #333399;'>images: " + output + err + "</span><hr>" + specs.innerHTML;

} 



function sortByFrequencyAndRemoveDuplicates(array) {
    var frequency = {}, value;

    // compute frequencies of each value
    for(var i = 0; i < array.length; i++) {
        value = array[i];
        if(value in frequency) {
            frequency[value]++;
        }
        else {
            frequency[value] = 1;
        }
    }

	// add frequency to array text
    for(var i = 0; i < array.length; i++) {
    	array[i] += " (" + frequency[array[i]] + ")";
    }


   // compute again
   var frequency = {};
    for(var i = 0; i < array.length; i++) {
        value = array[i];
        if(value in frequency) {
            frequency[value]++;
        }
        else {
            frequency[value] = 1;
        }
    }

    // make array from the frequency object to de-duplicate
    var uniques = [];
    for(value in frequency) {
        uniques.push(value);
    }

    // sort the uniques array in descending order by frequency
    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }

    return uniques.sort(compareFrequency);
}
