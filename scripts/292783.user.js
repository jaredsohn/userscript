// ==UserScript==
// @name        Inline Equipment Changer 
// @namespace   hentaiverse.org
// @description	Show and change equipped set on the left panel 
// @include     http://hentaiverse.org/*
// @start-at   document-end
// @version     1.2.2
// @author      holy_demon
// ==/UserScript==

//Change log: 
//- fix bug that messes with moogle mail scrolling
//- fix a bug that will empty Equipment Compare storage if open equipment popup during battle

function init() {
   init.current_set = localStorage.HVequip_set || 0;
   init.total_set = 3;
   init.equip_row = null;
   init.equip_page = null;
   init.equip_options = null;
}

function checkCombat() {
   var xmlhttp = new XMLHttpRequest();

   xmlhttp.open("GET", "http://hentaiverse.org/", true);
   xmlhttp.responseType = "document";
   xmlhttp.onreadystatechange = function() {

      if (xmlhttp.readyState === 4 && !xmlhttp.responseXML.getElementById("battleform")) {
         getEquip();
      }
   }
   xmlhttp.send(null);
}

function getEquip() {

   init.equip_page = document.body.appendChild(document.createElement('iframe'));
   init.equip_page.style.cssText = 'width: 0px; height: 0px; overflow: hidden; white-space: nowrap; visibility: hidden;';
   init.equip_page.onload = function() {
      var equip_tab = init.equip_page.contentDocument.querySelector("#setform>div");
      if (equip_tab) {
         init.total_set = equip_tab.getElementsByTagName("div").length;
         init.current_set = equip_tab.querySelector("img:not([onclick])").src.match(/\d/);
         localStorage.HVequip_set = init.current_set;
         refreshEquip();
      } else {
         //init.equip_row.textContent = "Loading failed";
         refreshEquip();
      }

   }
   init.equip_page.src = "http://hentaiverse.org/?s=Character&ss=eq";
}

function setEquip(new_set) {
   var equip_to_set = init.equip_page.contentDocument.querySelector("img[onclick*='value\=" + new_set + "']");
   if (equip_to_set) {
      equip_to_set.click();
   } else { // couldn't change equipment, reload frame to show the correct equip set (trigger getEquip)
      //init.equip_page.src = init.equip_page.src; // reloading frame by setting frame src to itself
   }
}

function displayOptions(e) {

   function optionHandle(e) {
      init.equip_row.style.display = "inline";
      init.equip_row.style.fontStyle = "normal";
      init.equip_row.textContent = this.textContent;
      setEquip(this.value);
      options.parentNode.removeChild(options);
      delete options;
   }

   init.equip_row.style.display = "none";

   var options = init.equip_row.parentNode.appendChild(document.createElement('div'));
   options.style.cssText = init.equip_row.style.cssText;
   options.style.cursor = "pointer";
   options.style.display = "block";

   init.equip_options = options;

   for (var i = 1; i <= init.total_set; i++) {
      var option = options.appendChild(document.createElement('div'));
      option.innerHTML = "Equipping set " + i;
      option.value = i;
      option.onclick = optionHandle;
   }


}

function displayEquip() {

   var info_pane = document.querySelector(".clb");

   if (info_pane) { //main HV page
      var table = info_pane.appendChild(document.createElement("table"));
      table.className = "cit";
      var tbody = table.appendChild(document.createElement("tbody"));
      var tr = tbody.appendChild(document.createElement("tr"));
      var td = tr.appendChild(document.createElement("td"));
      var div0 = td.appendChild(document.createElement("div"));
      div0.className = "fd4";
      init.equip_row = div0.appendChild(document.createElement("div"));
      init.equip_row.style.cssText = info_pane.querySelector("table div>div").style.cssText;
   } else { // equipment pop up
      info_pane = document.getElementById("equipment");
      var div0 = info_pane;
      init.equip_row = div0.appendChild(document.createElement("div"));
      init.equip_row.style.fontWeight = "bold";
   }

   init.equip_row.id = "inline_equip";
   init.equip_row.textContent = "Equipped set: " + init.current_set;
}

function refreshEquip() {
   init.equip_row.style.display = "inline";
   init.equip_row.style.fontStyle = "italic";
   init.equip_row.style.cursor = "pointer";
   init.equip_row.textContent = "Equipped set: " + init.current_set;
   init.equip_row.onclick = displayOptions;
}

if (window.self === window.top && !document.getElementById('battleform')) {
   init();
   displayEquip();
   checkCombat();
}