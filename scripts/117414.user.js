// ==UserScript==
// @name           Newegg.com Discounted Price Revealer
// @namespace      JeffersonScher
// @version        1.1.1
// @description    Show discounted price on Newegg.com. Revised 9 Nov 2011.
// @copyright      © 2011 Jefferson Scher
// @license        CC BY http://creativecommons.org/licenses/by/3.0/
// @include        http://www.newegg.tld/*ProductList*
// @include        http://www.newegg.tld/*Store*
// @include        http://www.newegg.tld/DailyDeal.aspx*
// @include        http://www.newegg.tld/Product/Product.aspx*
// @include        http://www.newegg.tld/Product/Productcompare.aspx*
// ==/UserScript==

function showPrice(){
  var maps = document.querySelectorAll('.priceMAP, .priceRange');
  if (maps.length == 0) return;
  var i, hidbefore, sav, newLI;
  for (i=0; i<maps.length; i++){
    if (maps[i].nodeName.toLowerCase() == "li"){
      hidbefore = maps[i].parentNode.nextElementSibling;
      if (hidbefore.getAttribute("name") == "priceBefore"){
        maps[i].innerHTML = "<span class=\"label\">Now: </span>$<strong>" + hidbefore.value.substr(1, hidbefore.value.indexOf(".")-1) + 
          "</strong><sup>" + hidbefore.value.substr(hidbefore.value.indexOf(".")) + "</sup>";
        maps[i].className = "priceFinal";
        maps[i].style.color = "#00f";
        maps[i].style.maxHeight = "1.1em";
        if (!maps[i].hasAttribute("calcdone") && maps[i].previousElementSibling.innerHTML != ""){
          sav = calcDiff(maps[i].previousElementSibling.querySelector('span:last-child').textContent.substr(1), hidbefore.value.substr(1));
          newLI = document.createElement("li");
          newLI.className = "priceWas";
          newLI.innerHTML = "<span class=\"label\">Save: </span>$"+sav+ " ("+
            calcPct(sav.toString(), maps[i].previousElementSibling.querySelector('span:last-child').textContent.substr(1))+")";
          if (maps[i].nextElementSibling) maps[i].parentNode.insertBefore(newLI, maps[i].nextElementSibling);
          else maps[i].parentNode.appendChild(newLI);
        }
        maps[i].setAttribute("calcdone", "calcdone");
      }
    }
  }
}
function dig4price(){
  var tgt = document.querySelector('.grpPricing .wrapper');
  if (tgt.children[0].nodeName == "DIV"){ // Not a hidden price
    showPrice();
  } else { // Hidden -- or not yet fully loaded?
    tgt.children[0].innerHTML = "<em>Searching for price...</em>";
    var map = document.querySelector('#sel-baseitem .priceMAP');
    if (!map){  // try again in another second
      window.setTimeout(dig4price, 1000);
    } else {
      if (map.parentNode.nextElementSibling.getAttribute("name") == "priceBefore"){
        var pr = map.parentNode.nextElementSibling.value;
        tgt.innerHTML = "<div class=\"current\" style=\"color:#00f\"><span class=\"label\">Now: </span><span>$</span>" + 
          pr.substr(1, pr.indexOf(".")-1) + "<sup>" + pr.substr(pr.indexOf(".")) + "</sup></div>\n" +
          "<div class=\"original\" id=\"calcSave\"><span class=\"label\">Save: </span></div>";
        var sav = calcDiff(document.querySelector('.grpPricing div.original span:last-child').textContent.substr(1), pr.substr(1));
        document.getElementById("calcSave").appendChild(document.createTextNode("$"+sav+ " ("+
          calcPct(sav.toString(), document.querySelector('.grpPricing div.original span:last-child').textContent.substr(1))+")"));
      } else {
        tgt.children[0].innerHTML = "<em>Unable to retrieve price; please click to view</em>";
      }
    }
    showPrice();
  }
}
function showSaving(){
  var pfs = document.querySelectorAll('.priceFinal:not([calcdone="calcdone"])');
  if (pfs.length == 0) return;
  var i, was, pnow, sav, newLI;
  for (i=0; i<pfs.length; i++){
    if (pfs[i].nodeName.toLowerCase() == "li" && !pfs[i].hasAttribute("calcdone")){
      was = pfs[i].previousElementSibling;
      if (was.innerHTML != ""){
        pnow = pfs[i].textContent;
        sav = calcDiff(was.querySelector('span:last-child').textContent.substr(1), pnow.substr(pnow.indexOf("$")+1));
        newLI = document.createElement("li");
        newLI.className = "priceWas";
        newLI.innerHTML = "<span class=\"label\">Save: </span>$"+sav+ " ("+
          calcPct(sav.toString(), was.querySelector('span:last-child').textContent.substr(1))+")";
        if (pfs[i].nextElementSibling) pfs[i].parentNode.insertBefore(newLI, pfs[i].nextElementSibling);
        else pfs[i].parentNode.appendChild(newLI);
      }
    }
    pfs[i].setAttribute("calcdone", "calcdone");
  }
}
function calcDiff(s1, s2){
  return Math.round((parseFloat(s1.replace(/,/gi, "")) - parseFloat(s2.replace(/,/gi, "")))*100)/100;
}
function calcPct(s1, s2){
  return parseInt((parseFloat(s1.replace(/,/gi, "")) / parseFloat(s2.replace(/,/gi, ""))) * 100) + "%";
}
// DOM Mutation attachment and event handler
function addMutListener(){
  if (document.getElementById("bcaProductCell")) 
    document.getElementById("bcaProductCell").addEventListener("DOMSubtreeModified", domupdate, false);
  showPrice();
}
var ignoreClass = "|priceMAP|priceRange|priceFinal|";
var t_once;
function domupdate(e){
  if (e.target.hasAttribute("class")){
    if (ignoreClass.indexOf("|"+e.target.className+"|") > -1) return;
  }
  showPrice();
  if (t_once) window.clearTimeout(t_once);
  t_once = window.setTimeout(showSaving, 500);
}
// Run and schedule
showPrice();
if (window.location.pathname == "/Product/Product.aspx"){
  dig4price(); // On product page, find hidden product price
} else {
  window.setTimeout(addMutListener, 5000); // Monitor list-type pages for post-load updates
}
showSaving();
