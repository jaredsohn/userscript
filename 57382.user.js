// pickleclicky v2.7
// Maked by Goosey
// 4th October 2012
// Released under a dowhatyoulikeidontcare licence
//=====================================================================
// This is a Greasemonkey user script for use with the RHMB.
// It requires Greasemonkey.
// Get Greasemonkey for Firefox at https://addons.mozilla.org/en-US/firefox/addon/748
// IE and Opera versions also exist afaik, tho this script has not been tested on them.
//====================================================================
// ==UserScript==
// @name pickleclicky
// @namespace	thegooseking.co.uk
// @description Converts URLS into clickable links and attempts to display images.
// @include	http://radiohead.com/msgboard/*
// @include	http://www.radiohead.com/msgboard/*
// @include	http://radiohead.co.uk/msgboard/*
// @include	http://www.radiohead.co.uk/msgboard/*
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var blockedIPs = new Array(); // The blocked IP addresses
var blockedNames = new Array();  // The blocked names.
var megaBlockedNames = new Array(); // The megablocked names
var boardColour;
var blockIcon;
var blockIconColour;
var blockNotify;
var blockMsgColour;
var replyHighlightColour;
var enterSuppressesSubmit;
var whiterThanWhite;
var showReplyCount;
var clickToSearch;
var linksOpenInNewTabs;
var userName;
var b_sfw;
var replySummary = new Array();
const brokenCharacterForm = /([0-9]{3,5}\;)/;
const delimiter = "&#x263a"; // The delimiter we use for storing arrays as strings

/*********************************************************************
 * GLOBAL functions                                                  *
 * We need these for event handlers; these are functions that will   *
 * still be required after the script has stopped executing. We make *
 * them a member of the windows object to do that. Which is kind of  *
 * extreme, and can interfere with other scripts, but it beats       *
 * copypasting a lot of code.                                        *
 *********************************************************************/


window.isValidColour = function(col) {
  var colform = /[a-fA-F0-9]{6}/;
  if(colform.test(col)){
    return true;
  }
  alert("\"" + col + "\" is not a valid colour. Please enter a standard 6-character hexadecimal code.");
  return false;
}

loadSettings();
document.body.style.backgroundColor = boardColour;
addMenuOptions();
blockMessages();
postBody();

function blockMessages() {
  var messages = document.getElementsByTagName("li");
  if(whiterThanWhite){
    var fonts = document.getElementsByTagName("font");
    for(f in fonts) {
      if(fonts[f].color == "#dddddd") {
        fonts[f].color = "#ffffff";
      }
      if(fonts[f].color == "#f7f700") {
        fonts[f].color = "#123456";
      }
      
    }
  }
    for(elem in messages){
      if (elem == 'length') break;
      while(brokenCharacterForm.test(messages[elem].innerHTML)) {
        messages[elem].innerHTML = messages[elem].innerHTML.replace(brokenCharacterForm, "&#" + RegExp.$1);
      }
      name = grabName(messages[elem]);
      var nameHTML = messages[elem].getElementsByTagName("b")[0];
      var subject = messages[elem].getElementsByTagName("a")[0];
      var hideForm = /(\u200f|\u200c|\u200d|\u200e)+/;
      if(hideForm.test(subject.innerHTML)) subject.innerHTML = "<font size = \"0.8em\"<strong>pickleclicky:</strong> " + name + " is playing silly buggers.</font>";
      // Vanity line!
      // if(name == "pickleclicky") nameHTML.style.color = "0000FF";
      if(name == "pickleclicky") {
        nameHTML.innerHTML = name;
        nameHTML.style.color = "0000FF";
      }
      if(name == userName) {
        var replies = messages[elem].getElementsByTagName("a");
        for (r in replies) {
          if(r > 0 && !checkLinkVisited(replies[r])) {
            replies[r].style.backgroundColor = replyHighlightColour;
          }
        }
        replies[0].style.backgroundColor = boardColour;
      }
      
      if(clickToSearch == true) {
        nameHTML.style.cursor = "pointer";
        nameHTML.addEventListener("click",
          function() {
            document.getElementsByName("Handle")[0].value = escapeHTML(grabName(this.parentNode));
            document.getElementsByName("searchForm")[0].submit();
          },
          true);
      }
      
      if(showReplyCount == true) {  
        var replyCountSpan = document.createElement("span");
        var replyCount = messages[elem].getElementsByTagName("li").length;
        replyCountSpan.innerHTML = " (" + replyCount + ")";
        replyCountSpan.style.color = "#000000";
        nameHTML.parentNode.insertBefore(replyCountSpan, nameHTML.nextSibling);
      }
      
      var blockHTML = document.createElement("span");
      blockHTML.innerHTML +=
      " <a href=\"\" title=\"Block " + name + "\" style = \"color: " + blockIconColour + "; font-size: 0.8em; text-decoration: none; cursor: pointer;\"><b>" + blockIcon + "</b></a>";
      blockHTML.getElementsByTagName("a")[0].addEventListener("click",
          function() {
            name = this.title.replace("Block ", "");
            if(blockedNames.indexOf(name) == -1) {
              blockedNames.push(name);
              var nameList = blockedNames.join(delimiter);
              GM_setValue("blockedNames", nameList);
            }
          },
          true);
      nameHTML.parentNode.insertBefore(blockHTML, nameHTML.nextSibling);
        
      for (n in blockedNames) {
      if(name == blockedNames[n]) { 
        var mess = messages[elem].getElementsByTagName("a")[0];
        var blockedMsg = document.createElement("span");
        blockedMsg.innerHTML = blockNotify +
          " <a href=\"\" title=\"Unblock\" style = \" font-size: 0.8em; cursor: pointer;\">Unblock?</a></font>";
        blockedMsg.innerHTML = blockedMsg.innerHTML.replace("\$user", name);
        blockedMsg.style.color = blockMsgColour;
        mess.parentNode.replaceChild(blockedMsg, mess);
        nameHTML.parentNode.removeChild(nameHTML);
      
        messages[elem].getElementsByTagName("a")[0].addEventListener("click",
          function() {
            name = this.title.replace("Unblock ", "");
            blockedNames.splice(blockedNames.indexOf(name), 1);
            var nameList = blockedNames.join(delimiter);
            GM_setValue("blockedNames", nameList);
          },
        true);
      }
    }
    if(megaBlockedNames.length > 0) {
      for (m in megaBlockedNames) {
        if (name == megaBlockedNames[m]) {
          messages[elem].style.display="none";
        }
      }
    }
  }
}

function addMenuOptions() {

  var menu = document.getElementsByTagName("td")[1];
  var secondLine = menu.getElementsByTagName("p")[1];
  if(document.URL.indexOf("dim.html") != -1) menu = document.getElementsByTagName("p")[1];
  var newMenu = document.createElement("p");
  //newMenu.style.marginLeft = '13em';
  newMenu.className = "Menu";
  if(secondLine != null) {
    secondLine.appendChild(newMenu);
  } else {
    menu.appendChild(newMenu);
  }
  var newSpan = document.createElement("span");
  
  var menu2 = document.createElement("p");
  menu2.id = "menu";
  menu2.className = "Body a";
  menu2.style.display = "none";
  menu.appendChild(menu2);
  
  var newDiv = document.createElement("div");
  newDiv.style.minHeight = "25.3em";
  newDiv.style.width = document.width * 0.6;
  newDiv.style.border = "inset";
  
  var infoBox = document.createElement("div");
  infoBox.id = "info";
  infoBox.style.cssFloat = "right";
  infoBox.style.width = "50%";
  infoBox.style.minHeight = "25em";
  infoBox.style.border = "outset";
  newDiv.appendChild(infoBox);
  
  // BOARD COLOUR
  newSpan.innerHTML = "Board colour: #";
  var newInput = document.createElement("input");
  newInput.type = "text";
  newInput.id = "boardColour";
  newInput.value = boardColour;
    
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "This is the colour that the board will be. Recommended values are" +
                          " FFFFFF (whiteboard) or CCCCCC (greyboard). Usernames may be hard" +
                          " to read on other colours, but don't be scared to give it a try!";
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);
  
  var breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);
  
  // BLOCK ICON
  newSpan = document.createElement("span");
  newSpan.innerHTML = "Block Icon: ";
  newInput = document.createElement("input");
  newInput.type = "text";
  newInput.id = "blockIcon";
  newInput.value = blockIcon;
    
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "This is where you enter the icon you wish to use for your " +
                          "block button. You don't need to enter a single character: " +
                          "you can enter a string. You can even enter some HTML if you " +
                          "for example want to change the icon's size.";
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);
  
  breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);
  
  // BLOCK ICON COLOUR
  newSpan = document.createElement("span");
  newSpan.innerHTML = "Block icon colour: #";
  newInput = document.createElement("input");
  newInput.type = "text";
  newInput.id = "blockIconColour";
  newInput.value = blockIconColour;
    
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "This is the colour your block icon will be. Use a standard " +
                          "six character hex code - you can find lists of these all " +
                          "over the interwebs. Just make sure your block icon colour " +
                          "is easy to see on your chosen board colour! (Or not, should " +
                          "you so choose).";
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);
  
  breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);
  
  //BLOCK MESSAGE
  newSpan = document.createElement("span");
  newSpan.innerHTML = "Block message: ";
  newInput = document.createElement("input");
  newInput.type = "text";
  newInput.id = "blockNotify";
  newInput.value = blockNotify;
    
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "This is the message you will see when you block someone by clicking the " +
                          "block icon. You can use the string $user if you want the username in the " +
                          "message, so you can see who you're blocking, or just leave it if you just " +
                          "want to know someone is blocked."
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);
  
  breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);
  
  // BLOCK MESSAGE COLOUR
    newSpan = document.createElement("span");
  newSpan.innerHTML = "Block message colour: #";
  newInput = document.createElement("input");
  newInput.type = "text";
  newInput.id = "blockMsgColour";
  newInput.value = blockMsgColour;
    
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "This is the colour your block message will be. Use a standard " +
                          "six character hex code - you can find lists of these all " +
                          "over the interwebs.";
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);
  
  breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);
  
  // REPLY HIGHLIGHT COLOUR
  newSpan = document.createElement("span");
  newSpan.innerHTML = "Reply highlight colour: #";
  newInput = document.createElement("input");
  newInput.type = "text";
  newInput.id = "replyHighlightColour";
  newInput.value = replyHighlightColour;
    
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "This is the colour replies to your posts will be. Use a standard " +
                          "six character hex code - you can find lists of these all " +
                          "over the interwebs. Your highlight colour should contrast with " +
                          "your chosen board colour.";
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);
  
  breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);
  
  // ENTER SUPPRESS SUBMIT OPTION
  newSpan = document.createElement("span");
  newSpan.innerHTML = "Enter suppresses message submit: ";
  newInput = document.createElement("input");
  newInput.type = "checkbox";
  newInput.id = "enterSuppressesSubmit";
  newInput.checked = enterSuppressesSubmit;
  
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "Normally, when you press enter in any field of the message form, " +
                          "the message will be submitted. Suppressing this behaviour is a " +
                          "good idea, so you don't accidentally submit a message before you're " +
                          "ready. <em>Some</em> people, however (*glare @ Brooke and Harri*), " +
                          "are <strong>too lazy</strong> to press tab twice before submitting a " +
                          "subject-only message, so I've made this optional. Leave it checked if " +
                          "you don't want to be known as having a problem with premature... " +
                          "posting. Uncheck it if you're lazy.";
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);
  
  breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);
  
  // WHITER THAN WHITE
  newSpan = document.createElement("span");
  newSpan.innerHTML = "Whiter than white: ";
  newInput = document.createElement("input");
  newInput.type = "checkbox";
  newInput.id = "whiterThanWhite";
  newInput.checked = whiterThanWhite;
  
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "People who choose white as their username colour actually get their " +
                          "usernames light gray. With the award winning pickleclicky&trade; " +
                          "formula, you can get your whites 17% whiter!";
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);
  
  breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);
  
  // SHOW REPLY COUNT
  newSpan = document.createElement("span");
  newSpan.innerHTML = "Show reply count: ";
  newInput = document.createElement("input");
  newInput.type = "checkbox";
  newInput.id = "showReplyCount";
  newInput.checked = showReplyCount;
  
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "In the old days, the RHMB provided an at-a-glance view of how many " +
                          "replies a message had got. This was removed, presumable because of " +
                          "the clutter factor (pickleclicky knows pocki likes the uncluttered " +
                          "look). Nevertheless, some people miss it, so now you can choose " +
                          "whether you want a reply count or not!";
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);

  breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);
    
  // CLICKY NAMES
  newSpan = document.createElement("span");
  newSpan.innerHTML = "Click-to-search: ";
  newInput = document.createElement("input");
  newInput.type = "checkbox";
  newInput.id = "clickToSearch";
  newInput.checked = clickToSearch;
  
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "Want to search for all the posts a boardie's made recently, but too " +
                          "lazy to go to the search page? Well, with this option checked, you " +
                          "can simply click a boardie's name to search for posts by that " +
                          "boardie!";
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);
  
  breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);
  
  // LINKS OPEN IN NEW TABS
  newSpan = document.createElement("span");
  newSpan.innerHTML = "Links open in new tabs: ";
  newInput = document.createElement("input");
  newInput.type = "checkbox";
  newInput.id = "linksOpenInNewTabs";
  newInput.checked = linksOpenInNewTabs;
  
  newSpan.addEventListener("mouseover",
    function() {
      infoBox.innerHTML = "If this box is checked, links created by pickleclicky and clickken " +
                          "on a boardie's name to search will open in new Firefox tabs rather " +
                          "than in the same tab. Or, y'know, you could just middle click on the " +
                          "links. That won't work on clicky names, though.";
    },
  true);
  newSpan.addEventListener("mouseout",
    function() {
      infoBox.innerHTML = "";
    },
  true);
  newSpan.style.cssFloat = "right";
  newSpan.appendChild(newInput);
  newDiv.appendChild(newSpan);
  
  breaker = document.createElement("br");
  breaker.style.fontSize = "1.65em";
  newDiv.appendChild(breaker);

  // UPDATE BUTTON
  var newButton = document.createElement("button");
  newButton.type = "button";
  newButton.innerHTML = "Update";
  newButton.style.cssFloat = "right";
  newButton.addEventListener("click",
    function(){
      var boardCol = document.getElementById("boardColour").value;
      var blockIcon = document.getElementById("blockIcon").value;
      var blockCol = document.getElementById("blockIconColour").value;
      var blockNot = document.getElementById("blockNotify").value;
      var blockMsgCol = document.getElementById("blockMsgColour").value;
      var replyCol = document.getElementById("replyHighlightColour").value;
      var suppressSubmit = document.getElementById("enterSuppressesSubmit").checked;
      var whiter = document.getElementById("whiterThanWhite").checked;
      var showrc = document.getElementById("showReplyCount").checked;
      var cts = document.getElementById("clickToSearch").checked;
      var nt = document.getElementById("linksOpenInNewTabs").checked;
      if(isValidColour(boardCol) &&
          isValidColour(blockCol) &&
          isValidColour(replyCol) &&
          isValidColour(blockMsgCol)) {
        GM_setValue("boardColour", boardCol);
        GM_setValue("blockIcon", blockIcon);
        GM_setValue("blockIconColour", blockCol);
        GM_setValue("blockNotify", blockNot);
        GM_setValue("blockMsgColour", blockMsgCol);
        GM_setValue("replyHighlightColour", replyCol);
        GM_setValue("enterSuppressesSubmit", suppressSubmit);
        GM_setValue("whiterThanWhite", whiter);
        GM_setValue("showReplyCount", showrc);
        GM_setValue("clickToSearch", cts);
        GM_setValue("linksOpenInNewTabs", nt);
        window.location.reload();
      }
    },
    true);
  newDiv.appendChild(newButton);
  
  menu2.appendChild(newDiv);
  
  menu2 = document.createElement("p");
  menu2.id = "mbmenu";
  menu2.className = "Body a";
  menu2.style.display = "none";
  menu.appendChild(menu2);
  
  newDiv = document.createElement("div");
  newDiv.style.minHeight = "20.3em";
  newDiv.style.width = document.width * 0.6;
  newDiv.style.border = "inset";
  
  newSpan = document.createElement("span");
  newSpan.innerHTML = "Megablock hides posts by certain users and " +
                      "all replies to that post. No message, no nothin'. Use in extremis.<br />" +
                      "<br />You have the following people Megablocked:-<br />";
  var newTable = document.createElement("table");
  newTable.style.fontSize = "1em";
  newTable.id = "mbnametable";
  newTable.style.border = "inset";
  newSpan.appendChild(newTable);
  if(megaBlockedNames.length > 0) {
    for (mn in megaBlockedNames){
      var row = newTable.insertRow(mn);
      var nameCell = row.insertCell(0);
      nameCell.innerHTML =  megaBlockedNames[mn];
      var boxCell = row.insertCell(1);
        newInput = document.createElement("input");
        newInput.type = "checkbox";
        newInput.id = megaBlockedNames[mn];
        newInput.title = megaBlockedNames[mn];
      boxCell.appendChild(newInput);
    }
    
  } else {
    newSpan.innerHTML += "No-one! Wow, you're tolerant!<br />";
  }
  newDiv.appendChild(newSpan);
    
  var ubButton = document.createElement("button");
  ubButton.type = "button";
  ubButton.innerHTML = "Unblock";
  //newButton.style.cssFloat = "left";
  ubButton.addEventListener("click",
      function() {
        var mb = 0;
        var j = megaBlockedNames.length;
        for(mb = 0; mb < j; mb++) {
          // Find out which checkboxes are checked
          if(document.getElementById(megaBlockedNames[mb]).checked){
              // remove this person from the list
              megaBlockedNames.splice(mb, 1);
              mb -= 1;
              j -= 1;
          }
        }
        var nameList = megaBlockedNames.join(delimiter);
        GM_setValue("megaBlockedNames", nameList);

        document.location.reload();
      },
      true);
  
  newDiv.appendChild(ubButton);
  
  newSpan = document.createElement("span");
  newSpan.innerHTML = "<br /><br />";
  
  newSpan.innerHTML += "To Megablock someone, copy and paste their username below.<br />";
    newInput = document.createElement("input");
    newInput.type = "text";
    newInput.id = "megaBlockRequest";
  newSpan.appendChild(newInput);
  
  var bButton = document.createElement("button");
  bButton.type = "button";
  bButton.innerHTML = "Block";
  bButton.addEventListener("click",
    function(){
        var MBfield = document.getElementById("megaBlockRequest");
        var nameToMB = MBfield.value;
        if(megaBlockedNames.indexOf(nameToMB) == -1 && nameToMB.length > 0) {
              megaBlockedNames.push(nameToMB);
              var nameList = megaBlockedNames.join(delimiter);
              GM_setValue("megaBlockedNames", nameList);
              
              var table = document.getElementById("mbnametable");
              var tSize = table.rows.length;
              row = table.insertRow(tSize);
                var nameCell = row.insertCell(0);
                nameCell.innerHTML = nameToMB;
                var boxCell = row.insertCell(1);
                  newInput = document.createElement("input");
                  newInput.type = "checkbox";
                  newInput.id = nameToMB;
                  newInput.title = nameToMB;
                boxCell.appendChild(newInput);
                
              MBfield.value = "";
              MBfield.focus();
        } else if (nameToMB.length == 0) {
          alert("If you're going to block someone, please enter a name to block!");
        }
      },
      true);
  newSpan.appendChild(bButton);
  
  newDiv.appendChild(newSpan);
  
  menu2.appendChild(newDiv);
  
  newSpan = document.createElement("span");
  newSpan.innerHTML = "<a style = \"text-decoration: underline; cursor: pointer;\">PICKLECLICKY</a>&nbsp;&nbsp;|&nbsp;&nbsp;";
  newSpan.getElementsByTagName("a")[0].addEventListener("click",
      function() {
        alert("You are using pickleclicky, a tool of champions. Conglaturation!!!"
                + "\n\nThanks to Brooke, James, Jimmy Jams, Marcel, undy, pocki, frad and anyone I've"
                + "\nforgotten because I'm thick."
                + "\n\nProblems, ideas and questions should be addressed to Goosey on the RHMB, or "
                + "\ngoose.king@gmail.com. Complaints should be channelled into incoherent rage.");
      
      },
      true);
  newMenu.appendChild(newSpan);
  
  newSpan = document.createElement("span");
  if(b_sfw == false) {
    newSpan.innerHTML = "<a href=\"\" title=\"SFW mode is off. Click to turn it on.\">SFW MODE:</a><font color = \"#FF0000\"> OFF</font>&nbsp;&nbsp;|&nbsp;&nbsp;";
    newSpan.getElementsByTagName("a")[0].addEventListener("click",
      function() {
        GM_setValue("sfw", true);
      },
      true);
  }
  if(b_sfw == true) {
    newSpan.innerHTML = "<a href=\"\" title=\"SFW mode is on. Click to turn it off.\">SFW MODE:</a><font color = \"#00FF00\"> ON</font>&nbsp;&nbsp;|&nbsp;&nbsp;";
    newSpan.getElementsByTagName("a")[0].addEventListener("click",
      function() {
        GM_setValue("sfw", false);
      },
      true);
  }
  newMenu.appendChild(newSpan);
  
  newSpan = document.createElement("span");
  newSpan.innerHTML = "<a style = \"text-decoration: underline; cursor: pointer;\">OPTIONS &#x25BC;</a>&nbsp;&nbsp;|&nbsp;&nbsp;";
  newSpan.getElementsByTagName("a")[0].addEventListener("click",
      function() {
        var target = document.getElementById("menu");
        if(target.style.display == "none") {
          target.style.display = "block";
          this.innerHTML = "OPTIONS &#x25b2";
        } else {
          target.style.display = "none";
          this.innerHTML = "OPTIONS &#x25bc";
        }
      },
      true);
  newMenu.appendChild(newSpan);
  
  newSpan = document.createElement("span");
  newSpan.innerHTML = "<a style = \"text-decoration: underline; cursor: pointer;\">MEGABLOCK &#x25BC;</a>";
  newSpan.getElementsByTagName("a")[0].addEventListener("click",
      function() {
        var target = document.getElementById("mbmenu");
        if(target.style.display == "none") {
          target.style.display = "block";
          this.innerHTML = "MEGABLOCK &#x25b2";
        } else {
          target.style.display = "none";
          this.innerHTML = "MEGABLOCK &#x25bc";
        }
      },
      true);
  newMenu.appendChild(newSpan);
  
  var submitForm = document.getElementsByTagName("form")[0];
  // The second BR comes after the username field
  var lineBreak = submitForm.getElementsByTagName("br")[1];
  var saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.onclick = "return false;";
  saveBtn.innerHTML="Save to pickleclicky";
  saveBtn.addEventListener("click",
      function() {
        var uName = document.getElementsByName("Name")[0].value;
        GM_setValue("username", uName);
        alert("Excellent! pickleclicky now knows your name is " + uName + "!");
        return false;
      },
      true);
  lineBreak.parentNode.insertBefore(saveBtn, lineBreak);
  
  var infields = document.getElementsByTagName("input");
  for(i in infields){
    if(infields[i].type == "text" || infields[i].type == "password"){
      infields[i].addEventListener("keypress",
        function(evt) {
          var evt  = (evt) ? evt : ((event) ? event : null);
          if(evt.keyCode == 13 && enterSuppressesSubmit) {
            evt.preventDefault();
          }
        },
      true);
    }
  }
  
  // Create hidden form for submitting search by boardie query
  var searchForm = document.createElement("form");
  searchForm.name = "searchForm";
  searchForm.method = "post";
  searchForm.action = "SearchByBoardiePart2.html";
  if(linksOpenInNewTabs == true) searchForm.target = "_blank";
  searchForm.style.display = "none";
  var searchHandle = document.createElement("input");
  searchHandle.name = "Handle";
  searchHandle.type = "text";
  searchForm.appendChild(searchHandle);
  menu.appendChild(searchForm);
  
}

function postBody() {
  var paragraphs = document.getElementsByTagName("p");
  var ipaddress;
  //
  var name;
  for(p in paragraphs) {
    while(brokenCharacterForm.test(paragraphs[p].innerHTML)) {
      paragraphs[p].innerHTML = paragraphs[p].innerHTML.replace(brokenCharacterForm, "&#" + RegExp.$1);
    }
    if(paragraphs[p].className == "Body") {
      ipaddress = grabIP(paragraphs[p]);
      var nameHTML = paragraphs[p].getElementsByTagName("b")[0];
      name = grabName(paragraphs[p]);
      // Vanity line!
      if(name == "pickleclicky") nameHTML.firstChild.style.color = "0000FF";
      if(name == "FACT") nameHTML.innerHTML = " [citation needed]";
      var newSpan = document.createElement("span");
      newSpan.innerHTML = " <a href=\"\" title=\"Block " + name + "\" style = \"color: " + blockIconColour + "; font-size: 0.8em; text-decoration: none; cursor: pointer;\"><b>" + blockIcon + "</b></a>";
      newSpan.getElementsByTagName("a")[0].addEventListener("click",
          function() {
            name = this.title.replace("Block ", "");
            if(blockedNames.indexOf(name) == -1) {
              blockedNames.push(name);
              var nameList = blockedNames.join(delimiter);
              GM_setValue("blockedNames", nameList);
            }
          },
          true);
      nameHTML.parentNode.insertBefore(newSpan, nameHTML.nextSibling);
      
      newSpan = document.createElement("span");
      newSpan.innerHTML = " (" + ipaddress + ") <a href=\"\" title=\"Block " + ipaddress + "\" style = \"color: " + blockIconColour + "; font-size: 0.8em; text-decoration: none; cursor: pointer;\"><b>" + blockIcon + "</b></a>";
       newSpan.getElementsByTagName("a")[0].addEventListener("click",
          function() {
            ipaddress = this.title.replace("Block ", "");
            if(blockedIPs.indexOf(ipaddress) == -1) {
              blockedIPs.push(ipaddress);
              var IPList = blockedIPs.join(delimiter);
              GM_setValue("blockedIPs", IPList);
            }
          },
          true);
      nameHTML.parentNode.insertBefore(newSpan, nameHTML.nextSibling.nextSibling); //insertAfter ;)
    }
    if(paragraphs[p].className == "IndividualMessageSubject" ||
       paragraphs[p].className == "IndividualMessageBody") {
      var nameHTML = document.getElementsByTagName("b")[1].parentNode;
      name = grabName(nameHTML);
      var ipHTML =  document.getElementsByTagName("p")[4];
      ipaddress = grabIP(ipHTML);
      for(n in blockedNames) {
        if(blockedNames[n] == name) {
          paragraphs[p].innerHTML = "<b></b>User " + name + " blocked. <a href=\"\" title=\"Unblock " + name + "\" style = \" font-size: 0.8em; cursor: pointer;\">Unblock?</a></font>";
          paragraphs[p].getElementsByTagName("a")[0].addEventListener("click",
            function() {
              name = this.title.replace("Unblock ", "");
              blockedNames.splice(blockedNames.indexOf(name), 1);
              var nameList = blockedNames.join(delimiter);
              GM_setValue("blockedNames", nameList);
            },
        true);
        }
      }
      for(i in blockedIPs) {
        if(blockedIPs[i] == ipaddress) {
          paragraphs[p].innerHTML = "<b></b>User at " + ipaddress + " blocked. <a href=\"\" title=\"Unblock " + ipaddress + "\" style = \" font-size: 0.8em; cursor: pointer;\">Unblock?</a></font>";
          paragraphs[p].getElementsByTagName("a")[0].addEventListener("click",
            function() {
              ipaddress = this.title.replace("Unblock ", "");
              blockedIPs.splice(blockedIPs.indexOf(ipaddress), 1);
              var ipList = blockedIPs.join(delimiter);
              GM_setValue("blockedIPs", ipList);
            },
            true);
        }
      }
      URLer(paragraphs[p]);
    }   
  }
}

function URLer(target) {
  var urlform = /((www\.|http\:\/\/|https\:\/\/|spotify\:|about\:)(\S+[^).,:;?\]\} \r\n$]+))/;
  var imgform = /(\S+)(\.jpg|\.gif|\.bmp|\.tga|\.png)/i;
  var ytform = /(\S+)(\.youtube\.com\/|youtu\.be\/)(\S+)/;
  var spotiform = /(http\:\/\/open\.spotify\.com\/|spotify\:)(\S+)/;
  var text = target.innerHTML;
  var words = text.split(/\s/);
  for(w in words) {
  var word = words[w].replace(/<\/?[^>]+(>|$)/g, ""); // strip out HTML tags
    if(urlform.test(word) && ((!imgform.test(word) && !ytform.test(word) && !spotiform.test(word)) || b_sfw == true)) {
      var link = "<a href=\"";
      if(word.substring(0,4) == "www.") link += "http://";
      link += word + "\"";
      if(linksOpenInNewTabs == true) link += "target=\"_blank\"";
      link += ">" + word + "</a>";
      
      // Domain handling - keep us on the same board, please
      var currentDomain = document.domain;
      var rhmbForm = /((www\.)*(radiohead)(\.com|\.co\.uk))/;
      link = link.replace(rhmbForm, currentDomain);
      
      // Replace the word with the linkified version
      // Replace the word with the linkified version.
      target.innerHTML = target.innerHTML.replace(word, link);
    }
    if(urlform.test(word) && imgform.test(word) && b_sfw == false) {
      var img = "<img src=\"";
      if(word.substring(0,4) == "www.") img += "http://";
      img += word + "\" alt=\"" + word + "\" /><br />" + word;
      target.innerHTML = target.innerHTML.replace(word, img);
    }
    if(urlform.test(word) && ytform.test(word) && b_sfw == false) {
      /*var ytid = word.split(/(\?v=)/)[2];
      ytid = ytid.substring(0,11);*/
      
      // if the URL contains youtube.com, we want to get the v param
      if(word.indexOf("youtube.com") != -1) ytid = getUrlVars(word)["v"];
      // if the URL is in youtu.be form, we need to get the name of the page
      // (used someone else's code here, so sorry about ternary operators)
      if(word.indexOf("youtu.be\/") != -1) {
        ytid = word.substring(0, (word.indexOf("#") == -1) ? word.length : word.indexOf("#"));
        ytid = ytid.substring(0, (ytid.indexOf("?") == -1) ? ytid.length : ytid.indexOf("?"));
        ytid = ytid.substring(ytid.lastIndexOf("/") + 1, ytid.length);
      }
      var vid = "<iframe width=\"640\" height=\"480\" src=\"http://www.youtube.com/embed/";
      vid += ytid;
      vid += "\" frameborder=\"0\" allowfullscreen></iframe><br />" + word;
      
      target.innerHTML = target.innerHTML.replace(word, vid);
    }
  if(urlform.test(word) && spotiform.test(word) && b_sfw == false) {
      var spotiuri = word;
      if(spotiuri.indexOf("open.spotify.com") != -1) {
        spotiuri = spotiuri.replace("http:\/\/open.spotify.com\/", "spotify:");
        spotiuri = spotiuri.replace(/\//g, ":");
      }
      
      var spot = "<iframe src=\"https:\/\/embed.spotify.com\/?uri=" + spotiuri + 
                  "\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"><\/iframe><br \/>" + word;
      
      target.innerHTML = target.innerHTML.replace(word, spot);
    }
  }
}

/***********************************
 * loadSettings()
 * Loads the list of blocked names
 * and IP addresses from the script
 * preferences.
 ***********************************/
function loadSettings() {
  // get blocklists
  var ipList = GM_getValue("blockedIPs");
  if(ipList != null) blockedIPs = ipList.split(delimiter);
  var nameList = GM_getValue("blockedNames");
  if(nameList != null) blockedNames = nameList.split(delimiter);
  var mbNameList = GM_getValue("megaBlockedNames");
  if(mbNameList != null && mbNameList.length > 0) megaBlockedNames = mbNameList.split(delimiter);
  
  // get board colour
  var bc = GM_getValue("boardColour");
  if(bc != null) {
    boardColour = bc
  } else {
    boardColour = "FFFFFF";
  }
  
  // get block icon
  var bi = GM_getValue("blockIcon");
  if(bi != null) {
    blockIcon = bi;
  } else {
    blockIcon = "\u20e0";
  }
  
  // get block icon colour
  var bic = GM_getValue("blockIconColour");
  if(bic != null) {
    blockIconColour = bic;
  } else {
    blockIconColour = "FF0000";
  }
  
  // get block message
  var rn = GM_getValue("blockNotify");
  if(rn != null) {
    blockNotify = rn;
  } else {
    blockNotify = "User $user has been blocked!";
  }
  
  // get block message colour
  var bmc = GM_getValue("blockMsgColour");
  if(bmc != null) {
    blockMsgColour = bmc;
  } else {
    blockMsgColour = "8888FF";
  }
  
  // get reply highlight colour
  var rhc = GM_getValue("replyHighlightColour");
  if(rhc != null) {
    replyHighlightColour = rhc;
  } else {
    replyHighlightColour = "FFFF00";
  }
  
  // get whether enter suppresses submitting message
  var ess = GM_getValue("enterSuppressesSubmit");
  if(ess != null) {
    enterSuppressesSubmit = ess;
  } else {
    enterSuppressesSubmit = true;
  }
  
  // get whether whiter than white
  var wtw = GM_getValue("whiterThanWhite");
  if(wtw != null) {
    whiterThanWhite = wtw;
  } else {
    whiterThanWhite = false;
  }
  
  // get whether to show the reply count
  var showrc = GM_getValue("showReplyCount");
  if(showrc != null) {
    showReplyCount = showrc;
  } else {
    showReplyCount = false;
  }
  
  // get whether to click to search
  var cts = GM_getValue("clickToSearch");
  if(cts != null) {
    clickToSearch = cts;
  } else {
    clickToSearch = false;
  }
  
  // get whether to open links in new tabs
  var newTab = GM_getValue("linksOpenInNewTabs");
  if(newTab != null) {
    linksOpenInNewTabs = newTab;
  } else {
    linksOpenInNewTabs = false;
  }
  
  // get username
  var uN = GM_getValue("username");
  if(uN != null) userName = uN;
  
  // get SFW setting
  var sfw = GM_getValue("sfw");
  if(sfw == null) {
    sfw = true;
    GM_setValue("sfw", true);
  }
  b_sfw = sfw;
}

function grabName(target) {
  var nameHTML = target.getElementsByTagName("b");
  var name = nameHTML[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, ""); // strip out HTML tags
  name = name.replace(/^\s+(.*?)\s+$/, "$1");   // trim leading and trailing spaces
  return name;
}

function grabIP(target) {
  var ipaddress;
  var IPform = /[0-9]+(.)[0-9]+(.)[0-9]+(.xxx)/
  var targetText = target.innerHTML;
	var words = targetText.split(/\s/);
	for (var j=0; j < words.length; j++) {
		if (IPform.test(words[j])) {
			ipaddress = words[j];
			break;
		}
	}
	return ipaddress;
}

function checkLinkVisited(link) {
  var computed_color = document.defaultView.getComputedStyle(link, null).getPropertyValue('color');
  if(computed_color == "rgb(102, 102, 102)") return true;
  if(computed_color == "rgb(0, 0, 0)") return false;
}

function escapeHTML (s)
{
		var e = "";
		for (var i = 0; i < s.length; i++)
		{
			var c = s.charAt(i);
			if (c < " " || c > "~")
			{
				c = "&#" + c.charCodeAt() + ";";
			}
			e += c;
		}
		// stealed D:
				var arr1 = new Array('&#160;','&#161;','&#162;','&#163;','&#164;','&#165;','&#166;','&#167;','&#168;','&#169;','&#170;','&#171;','&#172;','&#173;','&#174;','&#175;','&#176;','&#177;','&#178;','&#179;','&#180;','&#181;','&#182;','&#183;','&#184;','&#185;','&#186;','&#187;','&#188;','&#189;','&#190;','&#191;','&#192;','&#193;','&#194;','&#195;','&#196;','&#197;','&#198;','&#199;','&#200;','&#201;','&#202;','&#203;','&#204;','&#205;','&#206;','&#207;','&#208;','&#209;','&#210;','&#211;','&#212;','&#213;','&#214;','&#215;','&#216;','&#217;','&#218;','&#219;','&#220;','&#221;','&#222;','&#223;','&#224;','&#225;','&#226;','&#227;','&#228;','&#229;','&#230;','&#231;','&#232;','&#233;','&#234;','&#235;','&#236;','&#237;','&#238;','&#239;','&#240;','&#241;','&#242;','&#243;','&#244;','&#245;','&#246;','&#247;','&#248;','&#249;','&#250;','&#251;','&#252;','&#253;','&#254;','&#255;','&#34;','&#38;','&#60;','&#62;','&#338;','&#339;','&#352;','&#353;','&#376;','&#710;','&#732;','&#8194;','&#8195;','&#8201;','&#8204;','&#8205;','&#8206;','&#8207;','&#8211;','&#8212;','&#8216;','&#8217;','&#8218;','&#8220;','&#8221;','&#8222;','&#8224;','&#8225;','&#8240;','&#8249;','&#8250;','&#8364;','&#402;','&#913;','&#914;','&#915;','&#916;','&#917;','&#918;','&#919;','&#920;','&#921;','&#922;','&#923;','&#924;','&#925;','&#926;','&#927;','&#928;','&#929;','&#931;','&#932;','&#933;','&#934;','&#935;','&#936;','&#937;','&#945;','&#946;','&#947;','&#948;','&#949;','&#950;','&#951;','&#952;','&#953;','&#954;','&#955;','&#956;','&#957;','&#958;','&#959;','&#960;','&#961;','&#962;','&#963;','&#964;','&#965;','&#966;','&#967;','&#968;','&#969;','&#977;','&#978;','&#982;','&#8226;','&#8230;','&#8242;','&#8243;','&#8254;','&#8260;','&#8472;','&#8465;','&#8476;','&#8482;','&#8501;','&#8592;','&#8593;','&#8594;','&#8595;','&#8596;','&#8629;','&#8656;','&#8657;','&#8658;','&#8659;','&#8660;','&#8704;','&#8706;','&#8707;','&#8709;','&#8711;','&#8712;','&#8713;','&#8715;','&#8719;','&#8721;','&#8722;','&#8727;','&#8730;','&#8733;','&#8734;','&#8736;','&#8743;','&#8744;','&#8745;','&#8746;','&#8747;','&#8756;','&#8764;','&#8773;','&#8776;','&#8800;','&#8801;','&#8804;','&#8805;','&#8834;','&#8835;','&#8836;','&#8838;','&#8839;','&#8853;','&#8855;','&#8869;','&#8901;','&#8968;','&#8969;','&#8970;','&#8971;','&#9001;','&#9002;','&#9674;','&#9824;','&#9827;','&#9829;','&#9830;');
		var arr2 = new Array('&nbsp;','&iexcl;','&cent;','&pound;','&curren;','&yen;','&brvbar;','&sect;','&uml;','&copy;','&ordf;','&laquo;','&not;','&shy;','&reg;','&macr;','&deg;','&plusmn;','&sup2;','&sup3;','&acute;','&micro;','&para;','&middot;','&cedil;','&sup1;','&ordm;','&raquo;','&frac14;','&frac12;','&frac34;','&iquest;','&agrave;','&aacute;','&acirc;','&atilde;','&Auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&Ouml;','&times;','&oslash;','&ugrave;','&uacute;','&ucirc;','&Uuml;','&yacute;','&thorn;','&szlig;','&agrave;','&aacute;','&acirc;','&atilde;','&auml;','&aring;','&aelig;','&ccedil;','&egrave;','&eacute;','&ecirc;','&euml;','&igrave;','&iacute;','&icirc;','&iuml;','&eth;','&ntilde;','&ograve;','&oacute;','&ocirc;','&otilde;','&ouml;','&divide;','&oslash;','&ugrave;','&uacute;','&ucirc;','&uuml;','&yacute;','&thorn;','&yuml;','&quot;','&amp;','&lt;','&gt;','&oelig;','&oelig;','&scaron;','&scaron;','&yuml;','&circ;','&tilde;','&ensp;','&emsp;','&thinsp;','&zwnj;','&zwj;','&lrm;','&rlm;','&ndash;','&mdash;','&lsquo;','&rsquo;','&sbquo;','&ldquo;','&rdquo;','&bdquo;','&dagger;','&dagger;','&permil;','&lsaquo;','&rsaquo;','&euro;','&fnof;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&alpha;','&beta;','&gamma;','&delta;','&epsilon;','&zeta;','&eta;','&theta;','&iota;','&kappa;','&lambda;','&mu;','&nu;','&xi;','&omicron;','&pi;','&rho;','&sigmaf;','&sigma;','&tau;','&upsilon;','&phi;','&chi;','&psi;','&omega;','&thetasym;','&upsih;','&piv;','&bull;','&hellip;','&prime;','&prime;','&oline;','&frasl;','&weierp;','&image;','&real;','&trade;','&alefsym;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&crarr;','&larr;','&uarr;','&rarr;','&darr;','&harr;','&forall;','&part;','&exist;','&empty;','&nabla;','&isin;','&notin;','&ni;','&prod;','&sum;','&minus;','&lowast;','&radic;','&prop;','&infin;','&ang;','&and;','&or;','&cap;','&cup;','&int;','&there4;','&sim;','&cong;','&asymp;','&ne;','&equiv;','&le;','&ge;','&sub;','&sup;','&nsub;','&sube;','&supe;','&oplus;','&otimes;','&perp;','&sdot;','&lceil;','&rceil;','&lfloor;','&rfloor;','&lang;','&rang;','&loz;','&spades;','&clubs;','&hearts;','&diams;');
  for(a in arr1){
    e = e.replace(arr1[a], arr2[a]);
  }
		return e;

}

function getUrlVars(word) {
    var vars = {};
    var parts = word.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        if(key.indexOf("amp;") == 0) { key = key.replace("amp;", ""); }
        vars[key] = value;
    });
    return vars;
}