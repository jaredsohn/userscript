// ==UserScript==
// @name           KillieFC - Ignore User
// @namespace      www.killiefc.com
// @description    Forum, ignore certain user's posts
// @include        http://www.killiefc.com/forum/viewthread.php*
// @include        http://killiefc.com/forum/viewthread.php*
// ==/UserScript==

var ignore_list = [];
var hid =0;
function unignorepost(event) {
  var buttonpressed = event.currentTarget;
  var post = document.getElementById("hiddenpost" + buttonpressed.title);
  buttonpressed.style.display = "none";
  post.style.display = null;
  event.preventDefault();
}
function isposterignored(username) {
  username = username.replace(',','>');	
  for (j = 0 ; j < ignore_list.length ; j++) {
    if(username!='' && username == ignore_list[j]) {
      return true;
    }
  }
}
function removeignoreid(username) {
  username = username.replace(',','>');			
  for (j = 0 ; j < ignore_list.length ; j++) {
    if(username == ignore_list[j]) {
      ignore_list.splice(j,1);
    }
  }
}
function toggleignore(event) {
  var buttonpressed = event.currentTarget;
  var postdiv = buttonpressed.parentNode;
  
  var hrefs = postdiv.getElementsByTagName("A");
  var str = hrefs[0].href;  
  var offset = str.indexOf("member.php?action=viewpro&member=");
  var username=str.slice(offset+33);
  
  var test = isposterignored(username);
  var r;
  var changed = false;
  if(test > 0) {
    r = confirm("Are you sure you want to REMOVE [" + unescape(username) + "] from your ignore list?");
    if(true == r) {
      removeignoreid(username);
      buttonpressed.textContent = "Ignore";
      buttonpressed.style.color='#000';
      changed = true;
    }
  }
  else {
    r = confirm("Are you sure you want to ADD [" + unescape(username) + "] to your ignore list?");
    if(true == r) {
      username = username.replace(',','>');	
      ignore_list.push(username);
      buttonpressed.textContent = "***IGNORED***";
      buttonpressed.style.color='#D00';
      changed = true;
    }
  }
  // Update the persistent cookie data
  if(changed) {
    GM_setValue("sassignorelist",ignore_list.join(','));
  }
  window.location.reload();
  event.preventDefault();
}

function setupignores() {
  var hrefs = document.getElementsByTagName("A");
  var d;
  var i = 0, j = 0;
  for (i = 0 ; i < hrefs.length ; i++ ) {
  	var str = hrefs[i].href;  
  	var offset = str.indexOf("member.php?action=viewpro&member=");
    if(-1 == offset) continue;
    var username=str.slice(offset+33);
    var isignored = isposterignored(username);
    if (username!='' && hrefs[i].getElementsByTagName('img').length==0 && hrefs[i].innerHTML.indexOf('<strong>')>0 ) {
       
        var toggleignorebutton = document.createElement("a");
        toggleignorebutton.href = "#";
        toggleignorebutton.addEventListener("click",toggleignore,true);
        var ignoredstatusstring = "Ignore";
        toggleignorebutton.style.color='#000';
        if (isignored) {
        	ignoredstatusstring = "***IGNORED***";
        	toggleignorebutton.style.color='#D00';
        }
        
        toggleignorebutton.textContent =ignoredstatusstring;
        hrefs[i].parentNode.appendChild(toggleignorebutton); 		
        if (isignored) {
        	try {
        	var post = hrefs[i].parentNode.parentNode.nextSibling.nextSibling.childNodes[1];
        	hid++;
        	post.innerHTML = "<span id=\"hiddenpost" + hid + "\" style=\"display:none\">" + post.innerHTML + "</span>";
        	
        	var showbutton = document.createElement("a");
          	showbutton.title = hid;
          	showbutton.href = "#";
          	showbutton.addEventListener("click",unignorepost,true);
          	showbutton.style.color='#D00';
          	showbutton.textContent = "*** You are currently ignoring " + unescape(username) + "'s posts - click here to show post contents ***";
          	post.appendChild(showbutton);
          	} catch(ex) {};
        }
    }
  }
}

function loadignorelist() {
  var savedlist = GM_getValue("sassignorelist","");
  
  ignore_list = savedlist.split(',');
}
loadignorelist();
setupignores();

