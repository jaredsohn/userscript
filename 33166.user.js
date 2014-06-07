// ==UserScript==
// @name          Aeris Dies clicky
// @namespace     http://deltadesu.googlepages.com
// @include       http://www.aerisdies.com/cats/cat*img*.html
// ==/UserScript==

function getElementsByAttribute(tag, attrib, value, ele){
  if(ele) d = ele.getElementsByTagName(tag);
  else d = document.getElementsByTagName(tag);
  var cl = new Array()
  j=0;
  for(i=0;i<d.length;i++){
    if(d[i].getAttribute(attrib) && d[i].getAttribute(attrib).match(value)){
      cl[j] = d[i];
      j++
    }
  }
  return cl;
}



var nextURL = document.body.innerHTML.split("</b> - <a href=\"")[1].split("\" class")[0]
var imgURL = document.getElementsByTagName("noscript")[0].innerHTML.split('"')[1]
function go() {
  //var startURL = window.location.toString().split("\/")
  //startURL.pop()
  //startURL.join("\/")
  //alert(startURL)
  window.location="http://www.aerisdies.com/cats/"+nextURL
}
//getElementsByAttribute("img","src","/gallery/imgs",document.body)[0].addEventListener('click', go, false)

var bigbox = getElementsByAttribute("table","class", "box",document.body)[0].getElementsByTagName("table")[0].getElementsByTagName("tr")[4]
bigbox.getElementsByTagName("table")[0].style.display = "none"
bigbox.getElementsByTagName("table")[1].style.display = "none"

getElementsByAttribute("div","class","roundedcornr_box_651003",document.body)[0].style.display = "none"
getElementsByAttribute("div","class","roundedcornr_box_651003",document.body)[1].style.display = "none"
getElementsByAttribute("div","class","roundedcornr_box_894041",document.body)[0].style.display = "none"

function rep() {
  document.getElementById('abBP_1').parentNode.innerHTML = "<img id='usIMG' src='" + imgURL + "'></img>"
  document.getElementById('usIMG').addEventListener('click', go, false)
}

//window.setTimeout(rep, 2000)

rep()