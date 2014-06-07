// ==UserScript==
// @name          DICT.org Prettifier
// @namespace     http://queri.ac/zeke/oneoffs/greasemonkey
// @description   DICT.org provides a web interface to several freely available online dictionaries. The site's content is good, but the presentation is bad. This script removes the cruft and stylizes search results, making them more readable.
// @include       http://*dict.org/*
// ==/UserScript==

// Remove Header
// -----------------------------------------------------------------------------------
var logo = document.getElementsByTagName('center')[0]
var header_links = document.getElementsByTagName('p')[0]
logo.parentNode.removeChild(logo)
header_links.parentNode.removeChild(header_links)


// Tighten up the search form so it fits on a single horizontal line
// -----------------------------------------------------------------------------------

// Change the form's method from POST to GET
var form = document.getElementsByTagName('form')[0]
form.setAttribute('method','get')

// Collect the needed fields
var f1 = document.getElementsByTagName('td')[1].innerHTML.replace("<br>", "");
var f2 = document.getElementsByTagName('td')[3].innerHTML.replace("<br>", "");
var f3 = document.getElementsByTagName('td')[5].innerHTML.replace("<br>", "");
var f4 = "<input type=\"submit\" value=\"Search\" name=\"submit\"/>";

// Scrap the old fields
var old_fields = document.getElementsByTagName('center')[1]
old_fields.parentNode.removeChild(old_fields) 

// Add in the new fields
var new_fields = document.createElement("span")
new_fields.innerHTML = f1+f2+f3+f4
form.appendChild(new_fields)

// Clean up text styles
// -----------------------------------------------------------------------------------

// Create fresh div for each source/definition pair
var sources = document.getElementsByTagName('b');
for (var i=0; i<sources.length; i++) {
  var source = sources[i]
  if (source.innerHTML.indexOf("From") == 0) {
    var def = source.nextSibling
    var div = document.createElement("div")
    div.innerHTML = "<h2>" + source.innerHTML.replace("From ", "").replace(":", "") + "</h2>"
    div.style.width = "500px"
    div.style.borderLeft = "5px solid #DDDDDD"
    div.style.paddingLeft = "10px"
    div.style.marginRight = "20px"
    div.style.cssFloat = "left"
    document.body.appendChild(div)
    div.appendChild(def)    
  }
}

// Style the definitions
var defs = document.getElementsByTagName('pre')
for (var i = 0; i < defs.length; i++) {
  var def = defs[i]
  def.style.color = "#333333"
  def.style.fontSize = "12px"
  def.style.lineHeight = "16px"
  def.style.fontFamily = "'Lucida Grande', Verdana"
}

// Style the sources
var sources = document.getElementsByTagName('h2');
for (var i = 0; i < sources.length; i++) {
  var source = sources[i]
  source.style.color = "#666666"
  source.style.fontSize = "16px"
  source.style.fontWeight = "normal"
  source.style.fontFamily = "Georgia, Sans"
}

// Style all links
var links = document.getElementsByTagName('a')
for (var i = 0; i < links.length; i++) {
  var link = links[i]
  link.style.color = "#0489B7"
}

// Remove Footer, horizontal rules, and bold stuff
// -----------------------------------------------------------------------------------
var hrs = document.getElementsByTagName('hr')
for (var i=0; i<hrs.length; i++) {
  var hr = hrs[i]
  hr.style.display = 'none'
}

var centers = document.getElementsByTagName('center')
var footer = centers[centers.length-1]
footer.parentNode.removeChild(footer)

var bolds = document.getElementsByTagName('b')
for (var i = 0; i < bolds.length; i++) {
  var b = bolds[i]
  b.style.display = 'none'
}