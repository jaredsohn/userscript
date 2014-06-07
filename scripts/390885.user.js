// ==UserScript==
// @name        LibraryThing make cover voting bearable
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description Hides votes you've already made
// @include     http*://*librarything.tld/helpers_covers.php*
// @include     http*://*librarything.com/helpers_covers.php*
// @version     2.1
// @grant       none
// ==/UserScript==

var contentDiv = document.getElementById("coverflag_content");
var userlink = document.getElementsByClassName("mastuseritem")[0].firstElementChild.href;
var toggleVoted = localStorage.LThideVoted ? localStorage.LThideVoted : "hide";

// Thank you to Tiffany B. Brown for explanatory article on mutation observers at http://dev.opera.com/articles/view/mutation-observers-tutorial/
// This code based on samples at that article, which is licensed under CC-BY 3.0 Unported.
var callback = function(allmutations){
  allmutations.map( function(mr){
    if (mr.addedNodes.length > 1) { // If instead of the spinner we are returned a bunch of nodes, then run rest of script.
      if (toggleVoted == "hide") hideVotes();
    }
  });    
},
mo = new MutationObserver(callback),
options = {
    'childList': true, 
}
mo.observe(contentDiv, options);

// Add toggle to list at left to let somebody turn back on the items they've already voted on.
var leftList = document.querySelector(".cleft ul");
var newToggleLI = document.createElement("li");
newToggleLI.id = "gm-vote-toggle";
newToggleLI.style.marginTop = "1em";
newToggleLI.innerHTML = '<span id="gm-hidden">Hide voted | <a href="#" onclick="return false;" id="gm-show-votes">Show voted</a></span>\
                         <span id="gm-shown" style="display: none;"><a href="#" onclick="return false;" id="gm-hide-votes">Hide voted</a> | Show voted</span>';
leftList.appendChild(newToggleLI);
setToggle();

function setToggle() {
  var gmHidden = document.getElementById("gm-hidden");
  var gmShown  = document.getElementById("gm-shown");
  if (toggleVoted == "hide") {
    gmHidden.style.display = "inline";
    gmShown.style.display = "none";
  } else {
    gmHidden.style.display = "none";
    gmShown.style.display = "inline";
  }
}

document.querySelector("#gm-show-votes").addEventListener("click",showVotes);
document.querySelector("#gm-hide-votes").addEventListener("click", function(){
  hideVotes("reset");
});


// Function to hide the votes you've already done.  Run each page load unless you've specified it not to.
function hideVotes(reset) {
  var publicVotes = document.querySelectorAll(".publicvotes a");
  for (var j=0; j<publicVotes.length; j++) {
    var pv = publicVotes[j];
    if (pv.href == userlink) {
      while (pv = pv.parentNode) {
        if ((" " + pv.className + " ").indexOf(" coverflagitem ") > -1) {
          pv.style.display = 'none';
          break;
        }
      }
    }
  }
  if (reset) {
    localStorage.LThideVoted = toggleVoted = "hide";
    setToggle();
  }
}

// Function to show the vote you've already done (really just turns them all on).
function showVotes() {
  var coverFlagItems = document.getElementsByClassName("coverflagitem");
  for (var k=0; k<coverFlagItems.length; k++) {
    coverFlagItems[k].style.display = 'table';
  }
  localStorage.LThideVoted = toggleVoted = "show";
  setToggle();
}