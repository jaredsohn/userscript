// ==UserScript==
// @name           tirtsozluk
// @namespace      eksisozluk
// @include        http://www.eksisozluk.com/stats.asp?id=2-1
// @include        http://www.eksisozluk.com/stats.asp?id=2-2
// @include        http://www.eksisozluk.com/stats.asp?id=2-3
// @version        1.1.1
// ==/UserScript==

var COLLAPSED = 1;
var EXPANDED = 2;
function setStorage(key,value) {
  if (GM_setValue) {
    GM_setValue(key, value);
  } else if (typeof localStorage!="undefined") {
    localStorage[key] = value;  
  }
}
function getStorage(key) {
  if (GM_getValue) {
    return GM_getValue(key);
  } else if (typeof localStorage!="undefined") {
    return localStorage[key];
  }
  return null;
}
function getEntryState() {
  return (getStorage('entryState')==COLLAPSED) ? COLLAPSED:EXPANDED;
}
function setEntryState(state) {
  setStorage('entryState', state);
  showExpanded(state==EXPANDED);
  showButtons();
  displayUserNames(state==COLLAPSED);  // show user names only if entries are not expanded
}
function loadEntry(id, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://www.eksisozluk.com/show.asp?id=" + id);
  xhr.onreadystatechange = function() {
    if (xhr.readyState==4) {
      callback(xhr.responseText);
    }
  }
  xhr.send(null);
}

//var reg = /\<ol id\=\"el\" class\=\"eol\" start\=\"(\d+)\"\>\<li value\=\"(\d+)\"  id\=\"d(\d+)\"\>([\s\S.]*)\<\/li\>\<\/ol\>/m;
var reg = /\<ol id\=\"el\" class\=\"eol\" start\=\"(\d+)\"\>([\s\S.]*)\<\/ol\>/m;
function parseEntry(responseText) {  
  var match = reg.exec(responseText);
  //return match ? match[4]:null;
  return match ? match[0]:null;
}

function loadEntryIntoDiv(id, divId) {
  console.log("loading entry " + id + " into " + divId);
  var div = document.getElementById(divId);
  loadEntry(id, function(responseText) {
    var entryText = parseEntry(responseText) + "<br><hr>";
    if (entryText) {
      div.innerHTML = entryText;
    } else {
      div.innerHTML = "Hata olustu. Entry: #" + id;
    }
  });
};


var entryContainer = document.getElementsByTagName("blockquote")[0];
var entryTable = entryContainer ? entryContainer.getElementsByTagName("table")[0]:null;

function loadEntries() {
  if (entryTable) {
    var html = entryTable.innerHTML;
    
    // Add the expansion divs
    var newHtml = html.replace(/\<a href=\"show.asp\?id\=(\d+)\"\>(.*)?\/\#(\d+)\<\/a\>/g, 
      "<a href='show.asp?id=$1'>$2/#$1</a><br><div id='entry$1' class='entryLoad'" +
      " style='white-space:normal; margin-top:25px'></div>"); 
    entryTable.innerHTML = newHtml;

    // Load the entries
    var divs = document.getElementsByClassName("entryLoad");
    for (var i=0; i<divs.length; i++) {  
      setTimeout(
        function(div){
          return function(){ 
            loadEntryIntoDiv(div.id.substring(5), div.id)
          }
        }(divs[i]),
        (i+1)*150);
    }
  }
}

function showExpanded(display) {
  // Expand the entries
  var divs = document.getElementsByClassName("entryLoad");
  for (var i=0; i<divs.length; i++) {
    divs[i].style.display = display ? "":"none";
  }
  // If entries expanded, hide user names. Otherwise show normal.
  displayUserNames(!display);
}

var buttonCollapse, buttonExpand;
function onExpandClicked() {
  setEntryState(EXPANDED);
}
function onCollapseClicked() {
  setEntryState(COLLAPSED);
}
function showButtons() {
  if (getEntryState()==EXPANDED) {
    buttonCollapse.style.display = "block";
    buttonExpand.style.display = "none";
  } else {
    buttonCollapse.style.display = "none";
    buttonExpand.style.display = "block";
  }
}
function addButtons() {
  function createButton(id, value) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = value;
    button.id = id;
    button.className = "but";
    return button;
  }
  var buttonContainer = document.createElement("div");
  buttonCollapse = createButton("btnCollapseEntries", "çökert");
  buttonExpand = createButton("btnExpandEntries", "genişlet");
  buttonContainer.appendChild(buttonCollapse);
  buttonContainer.appendChild(buttonExpand);
  if (entryContainer) {
    entryContainer.insertBefore(buttonContainer, entryContainer.childNodes[1]);
    buttonCollapse.addEventListener('click',onCollapseClicked,false);
    buttonExpand.addEventListener('click',onExpandClicked,false);
  }
}

function displayUserNames(display) {
  if (entryTable) {
    var rows = entryTable.rows;
    for (var i=0; i<rows.length; i++) {
      rows[i].cells[2].style.display = display ? "":"none";
    }
  }
}

function init() {
  addButtons();
  loadEntries();
  if (getEntryState()==COLLAPSED) {
    setEntryState(COLLAPSED);
  } else {
    setEntryState(EXPANDED);
  }    
}
init();