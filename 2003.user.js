// ----------------------------------------------------------------------------
// This is a GreaseMonkey user script.  See http://greasemonkey.mozdev.org/
// ----------------------------------------------------------------------------
// version 0.6 2005-12-03 <- Firefox 1.5 compatible
// Copyright (c) 2005, Dominique Chastagnier
// Released under the GPL license http://www.gnu.org/copyleft/gpl.html
// ----------------------------------------------------------------------------
// ==UserScript==
// @name          meetic_chat_filter
// @namespace     http://qsdqsd.free.fr/GreaseMonkey
// @description   add personnal filter boutton in the chat page
// @include       http://www.meetic.fr/search/ons.php*
// @include       http://meetic.fr/search/ons.php*
// @include       http://www.meetic.de/search/ons.php*
// @include       http://meetic.de/search/ons.php*
// @include       http://www.meetic.com/search/ons.php*
// @include       http://meetic.com/search/ons.php*
// @include       http://www.meetic.be/search/ons.php*
// @include       http://meetic.be/search/ons.php*
// @include       http://www.meetic.dk/search/ons.php*
// @include       http://meetic.dk/search/ons.php*
// @include       http://www.meetic.co.uk/search/ons.php*
// @include       http://meetic.co.uk/search/ons.php*
// @include       http://www.meetic.it/search/ons.php*
// @include       http://meetic.it/search/ons.php*
// @include       http://www.meetic.nl/search/ons.php*
// @include       http://meetic.nl/search/ons.php*
// @include       http://www.meetic.at/search/ons.php*
// @include       http://meetic.at/search/ons.php*
// @include       http://www.meetic.se/search/ons.php*
// @include       http://meetic.se/search/ons.php*
// @include       http://www.meetic.ch/search/ons.php*
// @include       http://meetic.ch/search/ons.php*
// @include       http://es.meetic.com/search/ons.php*
// @include       http://asia.meetic.com/search/ons.php*
// ==/UserScript==

var div = document.createElement("div");
(function() {
  initFilterUI();
  //-- filters from pref.js :
  var data = GM_getValue("GM_meetic_filters", "");
  var zo, min, max, TFilter = data.split(";");
  for (var pt=0; pt<TFilter.length-1; ++pt) {
    data = TFilter[pt].split("/");
    zo = data[0]; // value
    min = data[1]; max = data[2];
    addLink(zone_val2txt(zo)+" "+min+"/"+max, zo, min, max, (data[3]!="0"));
  }
})();

function initFilterUI() {
  injectCSS("#filterDiv {"
+ "position: absolute;"
+ "width:652px; left:120px; top:164px;"
+ "padding: 0 2px;"
+ "text-align:right;"
+ "font-family: Helvetica;"
+ "font-size: 12px;"
+ "font-weight: bold;"
+ "}"
+ ".GM_bt {"
+ "border: 1px solid;"
+ "border-color: #aaa #000 #000 #aaa;"
+ "background: #C8E701;"
+ "padding:0 4px;"
+ "margin-left:3px;"
+ "color:#777;"
+ "text-decoration: none;"
+ "cursor:pointer;"
+ "}"
+ ".GM_bt:hover {"
+ "position: relative;"
+ "top: 1px;"
+ "left: 1px;"
+ "border-color: #000 #aaa #aaa #000;"
+ "text-decoration: none;"
+ "}"
+ "#GMFilterConfig {"
+ "position: fixed;"
+ "left: 50%; top: 50%;"
+ "width: 500px; margin-left: -250px;"
+ "height: 300px; margin-top: -150px;"
+ "border: 1px solid #000;"
+ "background: #fff;"
+ "font-family: Helvetica;"
+ "font-size: 12px;"
+ "}"
+ "#GMConfigTable {"
+ "margin:1em auto;"
+ "border-collapse:collapse;"
+ "border:1px solid gray;"
+ "}"
+ "#GMConfigTable td, #GMConfigTable th {"
+ "border:1px solid gray;"
+ "text-align:center;"
+ "}"
);
  div.id = "filterDiv";
  div.innerHTML = "<a id='affConfigUI' href='#' title='config my filters'>My Filters</a> :";
  document.body.appendChild(div);
  document.getElementById("affConfigUI").addEventListener('click', affConfigUI, false);
}

function addLink(txt, zone, min, max, photo) {
  var sp = document.createElement("span");
  sp.appendChild(document.createTextNode(txt));
  sp.setAttribute("class", "GM_bt");
  sp.addEventListener('click', function(event){GM_setFilter(zone, min, max, photo);}, false);
  div.appendChild(sp);
}

function GM_setFilter(zone, min, max, photo) {
  var ff = document.forms.namedItem("form_filters");
  var on = ff.elements.namedItem("veuxvoir_ons");
  var zo = ff.elements.namedItem("veuxvoir_pays_ons");
  var mi = ff.elements.namedItem("veuxvoir_age_mini_ons");
  var ma = ff.elements.namedItem("veuxvoir_age_maxi_ons");
  var ph = ff.elements.namedItem("veuxvoir_photo_ons");
  zo.disabled = mi.disabled = ma.disabled = ph.disabled = false;
  selectInSelect("1", on);
  selectInSelect(zone, zo);
  selectInSelect(min, mi);
  selectInSelect(max, ma);
  ph.checked = photo;
  ff.elements.namedItem("referer").value="/search/ons.php?first=0&"; // set page to number 1
  ff.submit();
}

function affConfigUI() {
  var div = document.createElement("div");
  var ff = document.forms.namedItem("form_filters");
  var zo = ff.elements.namedItem("veuxvoir_pays_ons");
  var min = ff.elements.namedItem("veuxvoir_age_mini_ons");
  var max = ff.elements.namedItem("veuxvoir_age_maxi_ons");
  var ph = ff.elements.namedItem("veuxvoir_photo_ons");
  div.id = "GMFilterConfig";
  div.innerHTML =
    "<div style='background:red;margin-top:0;border-bottom:1px solid #000'>"
  + "<div style='float:right;width:1em;text-align:center;border-left:1px solid #000;cursor:default;' onclick=\"document.body.removeChild(document.getElementById('"+div.id+"'))\">X</div>"
  + "&nbsp;Config my filters"
  + "</div>"
  + "<div style='text-align:center'>"
  + "<table id='GMConfigTable'>"
  + "<tr>"
  +   "<th>zone</th><th>min</th><th>max</th><th>photo</th>"
  +   "<th colspan='2'>&nbsp;</th>"
  + "</tr>"
  + "<tr id='GM_tr_new'>"
  +   "<td></td><td></td><td></td><td></td>"
  +   "<td><span id='GM_add_new_filter' class='GM_bt'>Add</span></td>"
  + "</tr>"
  + "</table>"
  + "<span id='GM_save_filter' class='GM_bt'>Ok</span>"
  + "<a href=\"javascript:void(document.body.removeChild(document.getElementById('"+div.id+"')))\" class='GM_bt' style='margin-left:5em'>Cancel</a>"
  + "</div>"
  ;
  //-- "new filter" line :
  var zo_new, min_new, max_new, ph_new;
  zo_new = zo.cloneNode(true); zo_new.id = "zo_new";
  min_new = min.cloneNode(true); min_new.id = "min_new";
  max_new = max.cloneNode(true); max_new.id = "max_new";
  ph_new = ph.cloneNode(true); ph_new.id = "ph_new";
  zo_new.selectedIndex=min_new.selectedIndex=max_new.selectedIndex=0;
  ph_new.checked=false;
  var GM_tr_new = div.getElementsByTagName("tr")[1];
  GM_tr_new.childNodes[0].appendChild(zo_new);
  GM_tr_new.childNodes[1].appendChild(min_new);
  GM_tr_new.childNodes[2].appendChild(max_new);
  GM_tr_new.childNodes[3].appendChild(ph_new);
  document.body.appendChild(div);
  document.getElementById("GM_save_filter").addEventListener("click", GM_save_filter, false)
  document.getElementById("GM_add_new_filter").addEventListener("click", GM_add_new_filter, false);

  //-- show in <tr> filters already define :
  var data = GM_getValue("GM_meetic_filters", "");
  var zo, TFilter = data.split(";");
  for (var pt=0; pt<TFilter.length-1; ++pt) {
    data = TFilter[pt].split("/");
    addTrConfigFilter(data[0], data[1], data[2], (data[3]!="0"));
  }
}

function GM_save_filter() {
  var trs = document.getElementById("GMConfigTable").getElementsByTagName("tr");
  var zo, zo_value, data = "";
  for (var pt=1; pt<trs.length-1; ++pt) {
    zo = trs[pt].childNodes[0].innerHTML;
    zo_value = zo.substring(zo.indexOf(" (")+2, zo.length-1);
    //alert(zo + " -> " + zo_value);
    data += zo_value + "/"
    + trs[pt].childNodes[1].innerHTML + "/"
    + trs[pt].childNodes[2].innerHTML + "/"
    + (trs[pt].childNodes[3].innerHTML=="yes"?1:0) + ";"
  }
  //alert("save:"+data);
  GM_setValue("GM_meetic_filters", data);
  window.location.reload();
}

function GM_add_new_filter() {
  var zo_new = document.getElementById("zo_new");
  var min_new = document.getElementById("min_new");
  var max_new = document.getElementById("max_new");
  var ph_new = document.getElementById("ph_new");
  zo_new = zo_new.options[zo_new.selectedIndex].value;
  min_new = min_new.options[min_new.selectedIndex].value;
  max_new = max_new.options[max_new.selectedIndex].value;
  ph_new = ph_new.checked;
  addTrConfigFilter(zo_new, min_new, max_new, ph_new);
}

function addTrConfigFilter(zo, min, max, ph) {
  var zoTxt = zone_val2txt(zo);
  var GM_tr_new = document.getElementById("GM_tr_new");
  var new_td, tr = document.createElement("tr");
  // don't work ??? : tr.innerHTML = "<td>"+zo+"</td><td>"+min+"</td><td>"+max+"</td><td>"+ph+"</td>" + "<td>edit</td><td>suppr</td>";
  new_td = document.createElement("td"); new_td.innerHTML=zoTxt+" ("+zo+")";
  tr.appendChild(new_td);
  new_td = document.createElement("td"); new_td.innerHTML=min;
  tr.appendChild(new_td);
  new_td = document.createElement("td"); new_td.innerHTML=max;
  tr.appendChild(new_td);
  new_td = document.createElement("td"); new_td.innerHTML=(ph?"yes":"no");
  tr.appendChild(new_td);
  //new_td = document.createElement("td"); new_td.innerHTML="<a href=''>edit</a>";
  tr.appendChild(new_td);
  new_td = document.createElement("td");
  new_td.innerHTML="<span class='GM_bt'>Suppr</span>";
  tr.appendChild(new_td);
  GM_tr_new.parentNode.insertBefore(tr, GM_tr_new);
  new_td.addEventListener("click", GM_delTr, false);
}

function GM_delTr(e) {
  var tr = e.target.parentNode.parentNode;
  tr.parentNode.removeChild(tr);
}

function selectInSelect(val, sel) {
  for (var pt = sel.length-1; pt>=0; --pt) {
    if (sel.options[pt].value == val) {
      sel.selectedIndex = pt;
      return;
    }
  }
  alert("option[value="+val+"] not found in select[name="+sel.name+"]");
}

function zone_val2txt(val) {
  var ff = document.forms.namedItem("form_filters");
  var zo = ff.elements.namedItem("veuxvoir_pays_ons");
  for (var pt = zo.length-1; pt>=0; --pt) {
    if (zo.options[pt].value == val) {
      zo = zo.options[pt].text;
      if(zo[0] == "-")zo = zo.substr(2); // suppr "- "
      return zo;
    }
  }
  alert("zone_val2txt : option[value="+val+"] not found");
}

function injectCSS(css) {
  var style = document.createElement("style");
  style.setAttribute("type", 'text/css');
  style.innerHTML = css;
  document.getElementsByTagName("head")[0].appendChild(style);
}
