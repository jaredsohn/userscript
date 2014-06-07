// ==UserScript==
// @name           GMail Hide Labels
// @namespace      http://www.geekyneighbor.com/
// @description    Hides labels ending in an underscore from GMail's default label view
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

var toggleSHa;

if (unsafeWindow.gmonkey) {
  unsafeWindow.gmonkey.load('1.0', function(gmail) {

    var navbar = gmail.getNavPaneElement().childNodes[0];

    var labelChildIndex = -1;

    // Surely this regular expression to find Labels object is a bit slow and tedius, but...
    // In my opinion, better than searching for the Element of class "HSZged"
    // because the class names will likely change during the next code rollout
    // as a result of new miniaturization!
    myLabelRegex = /<h2 [^>]+>Labels<\/h2>/;

    // Play nice with people who possibly re-order their navpane elements
    // Try to find the navpane Labels DOM element rather than hard-code it in
    for (var navbarIndex = 0; navbarIndex < navbar.childNodes.length; navbarIndex++) {
      if (myLabelRegex.test(navbar.childNodes[navbarIndex].innerHTML)) {
	labelChildIndex = navbarIndex;
	break;
      }
    }

    // We can't find the Labels navpane element -- did you mess with it?
    if (labelChildIndex != -1) {

      var labelsTable = navbar.childNodes[labelChildIndex].getElementsByTagName("tbody")[0];
      var labelsRows  = labelsTable.childNodes;

      for (var i = 0; i < labelsRows.length; i++) {
	var thislabel = labelsRows[i];
	var lname = thislabel.childNodes[1].childNodes[0].getAttribute("name");
	if (lname.charAt( lname.length - 1 ) == "_") {
	  thislabel.style.display = "none";
	}
      }

      // CODE TO CREATE SHOW/HIDE TOGGLE SWITCH

      var editLabelsDiv  = labelsTable.parentNode.parentNode.nextSibling;
      var editLabelsa    = editLabelsDiv.childNodes[0];
      var labelsPanel    = editLabelsDiv.parentNode;

      var toggleSHDiv    = document.createElement("div");
      toggleSHDiv.setAttribute("class", editLabelsDiv.className);
   
      toggleSHa = document.createElement("a");
      toggleSHa.setAttribute("id",    "gmpToggleSH");
      toggleSHa.setAttribute("href",  "#");

      toggleSHa.className = "gmpHidden";

      toggleSHa.style.color = "#006633";

      var toggleSHText = document.createTextNode("Show all labels");
      toggleSHa.appendChild(toggleSHText);
      toggleSHDiv.appendChild(toggleSHa);

      labelsPanel.insertBefore(toggleSHDiv, editLabelsDiv);

      //////////////////////////////////////////////////////////////////////
      // EVENT LISTENER -- TOGGLES SHOW/HIDE FEATURE
      //////////////////////////////////////////////////////////////////////

      toggleSHa.addEventListener("click", function(e) {
        var labelChildIndex = -1;

	myLabelRegex = /<h2 [^>]+>Labels<\/h2>/;

	for (var navbarIndex = 0; navbarIndex < navbar.childNodes.length; navbarIndex++) {
	  if (myLabelRegex.test(navbar.childNodes[navbarIndex].innerHTML)) {
	    labelChildIndex = navbarIndex;
	    break;
	  }
	}
	
	if (labelChildIndex != -1) {
	  var labelsTable = navbar.childNodes[labelChildIndex].getElementsByTagName("tbody")[0];
	  var labelsRows  = labelsTable.childNodes;

	  for (var i = 0; i < labelsRows.length; i++) {
	    var thislabel = labelsRows[i];
	    var lname = thislabel.childNodes[1].childNodes[0].getAttribute("name");
	    if (lname.charAt( lname.length - 1 ) == "_") {
	      if (thislabel.style.display == "none") {
		thislabel.style.display = "table-row";
	      } else {
		thislabel.style.display = "none";
	      }
	    }
	  }
	  
	  if (toggleSHa.className == "gmpHidden") {
	    var toggleSHText = document.createTextNode("Hide labels");
	    toggleSHa.className = "gmpShowingAll";
	  } else {
	    var toggleSHText = document.createTextNode("Show all labels");
	    toggleSHa.className = "gmpHidden";
	  }
	  toggleSHa.replaceChild(toggleSHText, toggleSHa.childNodes[0]);
	}
      }, true);
    }
  });
}
