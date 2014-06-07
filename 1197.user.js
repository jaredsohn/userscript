// ==UserScript==
// @name          Oskar SMS v 1.3
// @namespace     http://plathel.iglu.cz/mozilla/oskar
// @description	  Usnadni posilani sms z oskarovy brany
// @include       http://sms.oskarmobil.cz/s_main.php3*
// ==/UserScript==

var ogmForm = null;
var ogmPhonebookTable = null;

var ogmNumber = document.getElementsByName("number")[0];
var ogmMyName = document.getElementsByName("sender")[0];
var ogmMyNumber1 = document.getElementsByName("mypred1")[0];
var ogmMyNumber2 = document.getElementsByName("mynumber")[0];

var ogmFilledNumber = false;
var ogmFilledMyName = false;
var ogmFilledMyNumber = false;

function ogmAskPhonebookUrl() {
  var url = GM_getValue("phonebookUrl", "none");
  url = prompt("Enter url of your phonebook:", url, "Phonebook", 0);
  url = url ? url : "none";
  GM_setValue("phonebookUrl", url);
  ogmUpdatePhonebookUrl(url);
}
window.ogmAskPhonebookUrl = ogmAskPhonebookUrl;

function ogmSetPhoneNumber(select) {
  ogmNumber.value = select.getElementsByTagName("option")[select.selectedIndex].value;
}
window.ogmSetPhoneNumber = ogmSetPhoneNumber;

function ogmUpdatePhonebookUrl(url) {
  url = url ? url : "none";
  var a = document.getElementById("ogmPhonebookUrl");
  a.textContent = url;
  a.setAttribute("href", url);
  if (url == "none") {
    a.style.display = "none";
  } else {
    a.style.display = "inline";
  }
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    headers:{
      "User-Agent":"monkeyagent",
      "Accept":"text/monkey,text/xml",
      },
    onload: function(details) {
      var xml = details.responseText; 
      if (!xml) {
        alert("Error when loading phonebook.");
      } else {
        xml = (new DOMParser()).parseFromString(xml, "text/xml");
      }
      if (!xml || xml.documentElement.tagName != "phoneBook") {
          alert("Error when parsing phonebook!");
          ogmPhonebookTable.style.display = "none";
          return;
      }
      
      var phonebook = document.getElementById("ogmPhonebook");
      ogmPhonebookTable.style.display = "table";
      phonebook.tabIndex = 2;
      if (!ogmFilledNumber) phonebook.focus();
      
      var nodes = phonebook.getElementsByTagName("option");
      var copy = [];
      for (var i = 0; i < nodes.length; i++) copy.push(nodes[i]);
      for (var i = 0; i < copy.length; i++) {
        phonebook.removeChild(copy[i]);
      }
      
      phonebook.appendChild(document.createElement("option"));
      var nodes = xml.getElementsByTagName("item");
      for (var i = 0; i < nodes.length; i++) {                                                   
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode(nodes[i].getAttribute("name")));
        opt.setAttribute("value", nodes[i].getAttribute("number"));
        if (nodes[i].getAttribute("default") == "true") {
          opt.setAttribute("selected", "true");
        }
        phonebook.appendChild(opt);
      }
      
      if (!ogmFilledMyNumber && xml.documentElement.getAttribute("myNumber")) {
        var matches = /(\+(\d{3}))?(\d+)/.exec(xml.documentElement.getAttribute("myNumber"));
        if (matches) {
          matches[2] && (ogmMyNumber1.value = matches[2]);
          ogmMyNumber2.value = matches[3];
        }
      }
      
      if (!ogmFilledMyName && xml.documentElement.getAttribute("myName")) {
        ogmMyName.value = xml.documentElement.getAttribute("myName");
      }
      
      if (!ogmFilledNumber) ogmSetPhoneNumber(phonebook);
    }
  });
}

(function() {
  var div = document.evaluate('//div[@class="bodyText"]',
    document, null, XPathResult.ANY_TYPE, null).iterateNext();
    
  var childs = div.childNodes;
  var childsToRemove = [];
  for (var i = 0; i < childs.length; i++) {
    if (childs[i].nodeType == 1 && childs[i].tagName == "FORM") {
      ogmForm = childs[i];
    } else {
      childsToRemove.push(childs[i]);
    }
  }
  for (var i = 0; i < childsToRemove.length; i++) {
    div.removeChild(childsToRemove[i]);
  }
  
  ogmNumber.tabIndex = 1;
  var pict = document.getElementsByName("pictogram")[0];
  pict.tabIndex = 3;
  pict.focus();
  document.getElementsByName("message")[0].tabIndex = 4;
  document.getElementsByTagName("BUTTON")[0].tabIndex = 5;
  
  var matches = /number=(\d{9})/.exec(document.URL);
  if (matches) {
    ogmNumber.value = matches[1];
    ogmFilledNumber = true;
  }
  
  matches = /sender-number=(\+(\d{3}))?(\d+)/.exec(document.URL);
  if (matches) {
    matches[2] && (ogmMyNumber1.value = matches[2]);
    ogmMyNumber2.value = matches[3];
    ogmFilledMyNumber = true;
  } else {
    ogmMyNumber1.value = GM_getValue("myNumber1", "420");
    ogmMyNumber2.value = GM_getValue("myNumber2", "");
  }
  
  matches = /sender-name=([^&]+)/.exec(document.URL);
  if (matches) {
    ogmMyName.value = matches[1];
    ogmFilledMyName = true;
  } else {
    ogmMyName.value = GM_getValue("myName", "");
  }
  
  ogmForm.addEventListener("submit", function() {
      GM_setValue("myName", ogmMyName.value);
      GM_setValue("myNumber1", ogmMyNumber1.value);
      GM_setValue("myNumber2", ogmMyNumber2.value);
    }, false);
   
    
  addEventListener("load", function() {
      childs = ogmForm.childNodes;
      tables = [];
      for (var i = 0; i < childs.length; i++) {
        if (childs[i].nodeType == 1 && childs[i].tagName == "TABLE") {
          tables.push(childs[i]);
        }
      }
      var phonebookUrlTable = document.createElement("table");
      phonebookUrlTable.setAttribute("border", 0);
      phonebookUrlTable.setAttribute("width", 400);
      phonebookUrlTable.innerHTML =
        "<tbody><tr><td><span class='headline'>Url k telefonnimu seznamu:</span></td>"+
        "<td align='right'>"+
        "<a id='ogmPhonebookUrl' href=''></a> "+
        "<a href='javascript:ogmAskPhonebookUrl()'>zmen</a>"+
        "</td></tr></tbody>";
      ogmForm.insertBefore(phonebookUrlTable, tables[2].nextSibling);
      
      ogmPhonebookTable = document.createElement("table");
      ogmPhonebookTable.setAttribute("border", 0);
      ogmPhonebookTable.setAttribute("width", 400);
      ogmPhonebookTable.setAttribute("style", "display: none;");
      ogmPhonebookTable.innerHTML =
        "<tbody><tr><td><span class='headline'>Telefonni seznam:</span></td>"+
        "<td align='right'><select id='ogmPhonebook' onchange='ogmSetPhoneNumber(this);'>"+
        "<option></option></select>"+
        "</td></tr></tbody>";
      ogmForm.insertBefore(ogmPhonebookTable, tables[1]);
      
      ogmUpdatePhonebookUrl(GM_getValue("phonebookUrl", "none"));
      
    }, false);
})();


