// ==UserScript==
// @name            FtN to uT WebUI
// @namespace      greasemonkey
// @description     Adds link beside "DL" to send torrent to uT webui v0.3
// @include         http*://feedthe.net*
// ==/UserScript==

// Timeout for popup
var timeout = 1000;
var image = "data:image/png;base64,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%3D";



//iframe for adding torrents
var iframe = document.createElement('iframe');
var ifEventListener = false;

//set default protocol


function scanLinks() {
  //set iframe options
  document.body.appendChild(iframe);
  iframe.style.display = "none";
  
  var protocol = GM_getValue("protocol");
  var host = GM_getValue("host");
  var port = GM_getValue("port");
  
  if (!host || !port) {
    alert('You need to configure the "FtN to uT" user script with your uTorrent WebUI parameters before using it. Please go to your profile page');
  
  }
  if(!protocol) {
    protocol = location.protocol.toString().slice(0, -1);
  }
  
  var links = getLinks();

//for (var i=0, link; link = document.links[i++];){
  for (var i=0, link; link = links[i++]; ) {
    if (match(link.href)) {
        link.href = link.href.replace(/https?/, protocol);

        var uTorrentLink = makeUTorrentLink(link, host, port);
        
        link.parentNode.insertBefore(uTorrentLink, link.nextSibling);
        
    }
  }
 
}

function makeUTorrentLink(link, host, port) {
    var uTorrentLink  = document.createElement('a');
    uTorrentLink.href = link.href;
    uTorrentLink.addEventListener("click", 
      function(e) {

        iframe.setAttribute("src", makeUTorrentUrl(link.href, host, port));
        if(!ifEventListener) {
          iframe.addEventListener("load", function() {
            window.alert("Torrent added!");
          }, false);
          
          ifEventListener = true;
        }
        
        //this stops the click from redirecting to the location of the href
        e.preventDefault();
        return false;
      }, 
      false);

    uTorrentLink.innerHTML = '<img src="' + image + '" style="border: 0px" title="Add directly to WebUI" />';

    return uTorrentLink; 

}

function match(url) {
    return url.match(/https?:\/\/.feedthe\.net\/download\.php/);
}

function makeUTorrentUrl(url, host, port) {
  var uTorrentUrl = "http://"+host+":"+port+"/gui/"; 
  return uTorrentUrl + "?action=add-url&s="+ escape(url);
}


// Modifing a link in a collection, will break the collection with greasemonkey.
// take the links in the document, and return them as a normal array, avoiding gm's limitations
function getLinks() {
   var doc_links = document.links;
   var links = [];
 
   for (var i=0, link; link = doc_links[i++];) {
       links.push(link);
   }
   return links;
}


function addPreferences() {
  var pmRow = document.getElementsByClassName("g_my_maintable")[0]
      .getElementsByClassName("heading")[1].parentNode;
  
  var row = document.createElement("tr");
  
  var labelCell = document.createElement("td");
  labelCell.className = "heading";
  labelCell.style.width = "110px";
  labelCell.innerHTML = 'uTorrent WebUI settings <img src="' + image + '" />';
  row.appendChild(labelCell);
  
  var settingsCell = document.createElement("td");
  settingsCell.className = "";
  settingsCell.style.width = "625px";
  

  var hostInput = document.createElement("input");
  hostInput.type="text";
  hostInput.name = "gmwebui_hostinput";
  hostInput.id = "gmwebui_hostinput";
  hostInput.value = GM_getValue("host", "");
  
  var hostSettings = document.createElement("td");
  hostSettings.appendChild(hostInput);
  
 
  var protocolInput = document.createElement("input");
  protocolInput.type="text";
  protocolInput.name = "gmwebui_protocolinput";
  protocolInput.id = "gmwebui_protocolinput";
  protocolInput.value = GM_getValue("protocol", ""); 

  var protocolSettings = document.createElement("td");
  protocolSettings.appendChild(protocolInput);
  
  

  var portInput = document.createElement("input");
  portInput.type="text";
  portInput.name = "gmwebui_portinput";
  portInput.id = "gmwebui_portinput";
  portInput.value = GM_getValue("port", "");
  
  
  var portSettings = document.createElement("td");
  portSettings.appendChild(portInput);
  

  var portDesc = document.createElement("td");
  portDesc.innerHTML = '<label for="gmwebui_portinput">Server Port<strong>(1 - 65535)</strong></label>';
  
  var hostDesc = document.createElement("td");
  hostDesc.innerHTML = '<label for="gmwebui_hostinput">Server Address <strong>(example: slashdot.org, www.gotapi.com)</strong>.</label>';
  
  
  var protocolDesc = document.createElement("td");
  protocolDesc.innerHTML = '<label for="gmwebui_protocolinput">Protocol sent with outgoing links to the WebUI. https or http. Leave blank for dynamic.</label>';
  
  
  var portRow = document.createElement('tr');
  portRow.style.width= "625px";
  portRow.appendChild(portDesc);
  portRow.appendChild(portSettings);
  
  var hostRow = document.createElement('tr');
  hostRow.style.width= "625px";
  hostRow.appendChild(hostDesc);
  hostRow.appendChild(hostSettings);
  
  var protocolRow = document.createElement('tr');
  hostRow.style.width= "625px";
  protocolRow.appendChild(protocolDesc);
  protocolRow.appendChild(protocolSettings);
  
  
  var settingsTable = document.createElement("table");
  settingsTable.style.width = "625px";
  settingsTable.appendChild(portRow);
  settingsTable.appendChild(hostRow);
  settingsTable.appendChild(protocolRow);
  
  var saveButton = document.createElement("button");
  saveButton.innerHTML ="Save uTorrent WebUI settings";
  saveButton.addEventListener("click", function(e) {
    GM_setValue("port", portInput.value);
    GM_setValue("protocol", protocolInput.value);
    GM_setValue("host", hostInput.value);
    
    alert( "Your settings have been saved!");
  
    e.preventDefault();
    
  } ,false);
  
  settingsCell.appendChild(settingsTable);
  settingsCell.appendChild(saveButton);
  row.appendChild(settingsCell);
  pmRow.parentNode.insertBefore(row, pmRow);
  
  //when form is submitting, do not send private information

  hostInput.form.addEventListener('submit', function() {
    hostInput.disabled = true;
    protocolInput.disabled = true;
    portInput.disabled = true;

  }, false);
  
  //alert user if invalid data is entered
  portInput.addEventListener("blur", function() {
    var num = parseInt(portInput.value, 10);
    
    if(!num || num != portInput.value || num < 1 || num > 65535) {
      alert("Make sure the port field is a number between 1 and 65535!");
    }
  
  }, false);
  
  protocolInput.addEventListener("blur", function() {
    var val = protocolInput.value.toLowerCase();
    
    if( val.length && val != 'http' && val != 'https')  {
      alert("Make sure that the protocol field is blank or contains either 'http' or 'https'!");
    }
  
  }, false);
  
  
  
  
}

if(GM_setValue && document.getElementsByClassName) {


  if(location.pathname == "/my.php" ) {
    addPreferences();
  
  } else {   
    scanLinks();
  }
  
} else {
  alert("Please make sure that both greasemonkey is installed and getElementsByClassName is supported in your browser!");

}
