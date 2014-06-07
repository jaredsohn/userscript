// ==UserScript==
// @name           Add titles to DA search
// @namespace      http://pile0nades.deviantart.com/
// @description    Shows titles of the deviations with the thumbs
// @include        http://browse.deviantart.com/*
// @include        http://search.deviantart.com/*
// ==/UserScript==


// get thumbnail titles
var thumbs = get("//div[@class='stream']/div/span/span[contains(@class, 'shadow')]/a");

for(var i = 0; i < thumbs.length; i++) {
  var text = thumbs[i].getAttribute("title");
  if(!text) continue;
  var title = text.slice(0, text.lastIndexOf(" by "));
  var artist = {
    name: text.slice(text.lastIndexOf(" by ") + 5),
    symbol: text.charAt(text.lastIndexOf(" by ") + 4)
  };
  
  var art = document.createElement("a");
  art.setAttribute("href", thumbs[i].getAttribute("href"));
  art.innerHTML = title;
  
  var by = document.createElement("a");
  by.setAttribute("href", "http://" + artist.name + ".deviantart.com/");
  by.innerHTML = artist.name;
  
  var box = document.createElement("div");
  box.setAttribute("class", "thumb-caption");
  box.appendChild(document.createTextNode(" "));
  box.appendChild(art);
  box.appendChild(document.createTextNode(" by " + artist.symbol));
  box.appendChild(by);
  
  if(thumbs[i].parentNode.parentNode.lastChild.tagName.toLowerCase() == "a") {
    box.appendChild(thumbs[i].parentNode.parentNode.lastChild.previousSibling);
    box.appendChild(thumbs[i].parentNode.parentNode.lastChild);
  }
  
  thumbs[i].parentNode.parentNode.appendChild(box);
}

GM_addStyle(".stream > div > span {height: 165px !important; vertical-align: middle !important;} .shadow {height: auto !important;}");



// xpath function
function get(query) {
  var array = [];
  var result = document.evaluate(query, document, null, 7, null);
  for(var i = 0; i < result.snapshotLength; i++) {
    array.push(result.snapshotItem(i));
  }
  return array;
}

