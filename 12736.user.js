// ==UserScript==
// @name           Show TrophyManager Player Training Ordinals
// @namespace      http://twofourone.blogspot.com
// @description    For the game TrophyManager, show the training for a player in a tabular format that provides more detail than the graph.
// @include        http://trophymanager.com/showprofile.php?playerid=*
// ==/UserScript==


// Scrapes the URL of the training graph to pull out the individual 
// weeks of training
// This only works if the player is yours.  
document.getOrdinals = function(column) {
  var ordinals = [];
  var flashgraph = column.getElementsByTagName("embed");
  for (var i = 0; i < flashgraph.length; i++) {
    if (flashgraph[i].hasAttribute("flashvars")) {
      var flashvars = flashgraph[i].getAttribute("flashvars");
      if (flashvars != null) {
        if (flashvars.indexOf("importage") > -1) {
          var graphValues = (flashvars.substring(flashvars.indexOf("=")+1)).split(";");
          for (var k = 0; k < graphValues.length; k++) {
            ordinals.push(graphValues[k]);
          }
          i = flashgraph.length;
        }
      }
    }
  }
  return ordinals;
};

// Constructs the table in the same look and feel as the rest of TrophyManager.com
document.constructOrdinalTable = function(ordinals, column) {
  var retArray = [];
  var childNodes = column.childNodes;
  // Grab the header/content/footer look and feel for cloning.
  // Yes, we're being lazy here
  for (var n = 0; n < childNodes.length; n++) {   
    if (childNodes[n].nodeType == 1) {
      if (childNodes[n].getAttribute("class").indexOf("header") > -1) {
        var heading = childNodes[n].cloneNode(true);
      }
      if (childNodes[n].getAttribute("class").indexOf("content") > -1) {
        var content = childNodes[n].cloneNode(true);
      }
      if (childNodes[n].getAttribute("class").indexOf("footer") > -1) {
        var footer = childNodes[n].cloneNode(true);
      }
    }
  }
  // Fix the title to say Training
  var title = heading.getElementsByTagName("H2");
  title[0].innerHTML = "Training";
  retArray.push(heading);
  // update the content to show the training
  var tableBody = content.getElementsByTagName("TABLE");
  var theTable = tableBody[0];
  var childNodes = theTable.childNodes;
  for (var n = 0; n < childNodes.length; n++) { 
      theTable.removeChild(childNodes[0]);
  }
  var thisRow = document.createElement("tr");
  var week = document.createElement("td");
  week.innerHTML = "Week";
  thisRow.appendChild(week);
  var intensity = document.createElement("td");
  intensity.innerHTML = "Intensity";
  intensity.style.textAlign = "right";
  intensity.style.paddingRight = "20px";
  thisRow.appendChild(intensity);
  theTable.appendChild(thisRow);
  for (var j = 0; j < ordinals.length; j++) {
    thisRow = document.createElement("tr");
    week = document.createElement("td");
    week.innerHTML = j+1;
    thisRow.appendChild(week);
    intensity = document.createElement("td");
    intensity.innerHTML = ordinals[j];
    intensity.style.textAlign = "right";
    intensity.style.paddingRight = "30px";
    if (intensity.innerHTML == "") {
      intensity.innerHTML = "0.0";
    }
    thisRow.appendChild(intensity);
    theTable.appendChild(thisRow);
  }
  // remove the paragraphs that may appear.
  var contentPs = content.getElementsByTagName("P");
  if (contentPs.length > 0) {
    var parent = contentPs[0].parentNode;
    parent.removeChild(contentPs[0]);
  }
 
  retArray.push(content);
  // fix Footer
  var footerDivs = footer.getElementsByTagName("DIV");
  if (footerDivs.length > 0) {
    var footerKids = footerDivs[0].childNodes;
    for (var f = 0; f < footerKids.length; f++) {
      if (footerKids[f].nodeType == 1) {
        footerDivs[0].removeChild(footerKids[f]);
      }
    }
  }
  retArray.push(footer);

  return retArray;
};


(function() {
  var ordinalValues = document.getOrdinals(document.getElementById("graph"));
  var column3 = document.getElementById("column3");
  if (ordinalValues.length > 0) {
    var ordinalHTML = document.constructOrdinalTable(ordinalValues, column3);
    for (var i = 0; i < ordinalHTML.length; i++) {
      column3.appendChild(ordinalHTML[i]);
    }
  }
})();