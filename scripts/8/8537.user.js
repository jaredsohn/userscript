// ==UserScript==
// @name          SASS Ignore
// @namespace     http://sass.buttes.org/
// @description   Censors Shitposters
// @include       http://sass.buttes.org/*
// ==/UserScript==

/* this is the list of userids to ignore */
var ignore_list = [];
function match_end( str, end) {
    var sl = str.length;
    var el = end.length;
    if(-1 == (sl - el))
      return false;
    return (str.indexOf(end) == (sl - el));
}
function div_matches( div , profileid ) {
  var a = div.getElementsByTagName("A");
  var i = 0;
  var m = "profile.php?id="+profileid;
  for ( i = 0 ; i < a.length ; i++ ) {
    if (match_end(a[i].href, m)) {
      return true;
    }
  }
  return false;
}
function getposterid(div) {
  var a = div.getElementsByTagName("A");
  var offset;
  var value = 0;
  var str;
  for ( i = 0 ; i < a.length ; i++ ) {
    str = a[i].href;
    offset = str.indexOf("profile.php?id=");
    if(-1 == offset) {
      continue;
    
    }
    // is this even needed?
    if((str.length-offset) < 1) {
      continue;
    }
    value = str;
    value = 1 * str.slice(offset+15).valueOf();
    if(value == -1 || isNaN(value)) {
      continue;
    }
    //alert(value);
    return value;
  }
  return -1;
}
function unignorepost(event) {
  var buttonpressed = event.currentTarget;
  
  buttonpressed.parentNode.style.display = "none";
  buttonpressed.parentNode.nextSibling.style.display = null;
  
  /////////////////////////
  getposterid(buttonpressed.parentNode.parentNode);
  
  event.preventDefault();
}
function ignorepost(event) {
  var buttonpressed = event.currentTarget;
  
  var common = buttonpressed.parentNode.parentNode.parentNode.parentNode.parentNode;
  common.previousSibling.style.display = null;
  common.style.display = "none";
  
  event.preventDefault();
}
function isposterignored(div) {
  var value = getposterid(div);
  for (j = 0 ; j < ignore_list.length ; j++) {
    if(value == ignore_list[j]) {
      return true;
    }
  }
}
function removeignoreid(div) {
  var value = getposterid(div);
  for (j = 0 ; j < ignore_list.length ; j++) {
    if(value == ignore_list[j]) {
      ignore_list.splice(j,1);
    }
  }
}
function toggleignore(event) {
  var buttonpressed = event.currentTarget;
  
  var postdiv = buttonpressed.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  var test = isposterignored(postdiv);
  var r;
  var changed = false;
  if(test > 0) {
    r = confirm("Are you sure you want to REMOVE this poster from your ignore list?");
    if(true == r) {
      removeignoreid(postdiv);
      buttonpressed.textContent = "Ignore";
      changed = true;
    }
  }
  else {
    r = confirm("Are you sure you want to ADD this poster from your ignore list?");
    if(true == r) {
      ignore_list.push(getposterid(postdiv));
      buttonpressed.textContent = "***IGNORED***";
      changed = true;
    }
  }
  // Update the persistent cookie data
  if(changed) {
    GM_setValue("sassignorelist",ignore_list.join(','));
  }

  event.preventDefault();
}
function setupignores() {
  var divs = document.getElementsByTagName("DIV");
  var d;
  var i = 0, j = 0;
  for (i = 0 ; i < divs.length ; i++ ) {
    if (divs[i].className.match(/blockpost/)) {
      //for (j = 0 ; j < ignore_list.length ; j++) {
        //if (div_matches(divs[i],ignore_list[j])) {
        
          var isignored = isposterignored(divs[i]);
          
          var ignoredstatusstring = "Ignore";
          if(isignored) {
            ignoredstatusstring = "***IGNORED***";
          }
          
          /////
          
          var bigdiv = divs[i];
          var hiding = bigdiv.getElementsByTagName("div")[0];
          
          /////
          var clearer = document.createElement("div");
          clearer.class = "clearer";
          
          var optionslocation = bigdiv.getElementsByTagName("dl")[0];
          var ddarea = document.createElement("dd");
          var hidebutton = document.createElement("a");
          var toggleignorebutton = document.createElement("a");
          
          hidebutton.title = bigdiv.id//will be needed later i think
          hidebutton.href = "#";
          hidebutton.addEventListener("click",ignorepost,true);
          //
          toggleignorebutton.title = bigdiv.id//will be needed later i think
          toggleignorebutton.href = "#";
          toggleignorebutton.addEventListener("click",toggleignore,true);
          hidebutton.textContent = "Hide post";
          toggleignorebutton.textContent = ignoredstatusstring;
          ddarea.appendChild(hidebutton);
          ddarea.appendChild(clearer);
          ddarea.appendChild(toggleignorebutton);
          optionslocation.appendChild(ddarea);
          
          /////

          var showbuttonarea = document.createElement("div");
          var showbutton = document.createElement("a");
          showbutton.title = bigdiv.id//will be needed later i think
          showbutton.href = "#";
          showbutton.addEventListener("click",unignorepost,true);
          
          showbutton.textContent = "Show post";
          showbuttonarea.appendChild(showbutton);
          
          bigdiv.insertBefore(showbuttonarea,hiding);
          
          /////
          
          // Toggle these... (when one is on, turn the other off).
          if(isignored) {
            hiding.style.display = "none";
            //showbutton.parentNode.style.display = "none";
          }
          else {
            //hiding.style.display = "none";
            showbutton.parentNode.style.display = "none";
          }
          
        //}
      //}
    }
  }
}
function loadignorelist() {
  var savedlist = GM_getValue("sassignorelist","");
  
  ignore_list = savedlist.split(',');
}
loadignorelist();
setupignores();

