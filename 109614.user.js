// ==UserScript==
// @name           Pixiv Fullsize Links
// @description    Adds direct links to fullsize images on image listing pages
// @author         Kapow
// @include        http://*.pixiv.net/*
// ==/UserScript==


function findInTreeByTagName(root, name) {
  if (root.nodeName == name) { return root }
  for (var x=0; x<root.childNodes.length; x++) {
    var node = findInTreeByTagName(root.childNodes[x], name)
    if (node !== false && !(name == "#text" && node.nodeValue.replace(/^\s+|\s+$/g,"") == "")) {
      return node
    }
  }
  return false
}

var items = document.getElementsByTagName("li");
for (var i=0; i<items.length-6; i++) {
  var img = findInTreeByTagName(items[i], "IMG")
  if (img === false) { continue }
  
  var text = findInTreeByTagName(items[i], "H2")
  if (text === false) { text = findInTreeByTagName(items[i], "H1") } //fallback
  if (text === false) { text = findInTreeByTagName(items[i], "#text") } //fallback
  if (text === false) { continue }
  
  var src = img.src
  if (img.hasAttribute("data-src")) {
    src = img.getAttribute("data-src")
  }
  if (src.match(/([0-9]+)_(s|100)\./) == null) { continue }
  var id = src.match(/([0-9]+)_(s|100)\./)[1]
  var url = src.replace(/_(s|100)\.(...)(\?.+)?$/, ".$2")
  
  var full_link = document.createElement("A")
  full_link.setAttribute("href", url)
  full_link.setAttribute("style", "color:#333333")
  
  var main_link = text.parentNode
  if (main_link.tagName != "A") { //fallback
    main_link = main_link.parentNode
  }
  main_link.removeChild(text)
  full_link.appendChild(text)
  main_link.parentNode.insertBefore(full_link, main_link.nextSibling)
  
  var manga_link = document.createElement("A")
  manga_link.setAttribute("href", "http://www.pixiv.net/member_illust.php?mode=manga&illust_id="+id)
  manga_link.setAttribute("style", "color:#5E9ECE;font-size:75%;white-space:nowrap")
  manga_link.appendChild(document.createTextNode("[\u6F2B\u753B]"))
  
  full_link.parentNode.insertBefore(manga_link, full_link.nextSibling)
  full_link.parentNode.insertBefore(document.createTextNode(" "), manga_link)
}

var pages = document.getElementsByClassName("image-container");
var zooms = document.getElementsByClassName("full-size");
var images = []

function addMangaLinks(has_big) {
  for (var i=0; i<zooms.length; i++) {
    var biglink = document.createElement("A")
    if (has_big) {
      biglink.setAttribute("href", images[0].src.replace(/([0-9]+)_p[0-9]+\.(...)(\?.+)?$/,"$1_big_p"+i.toString()+".$2"))
    } else {
      biglink.setAttribute("href", images[0].src.replace(/([0-9]+)_p[0-9]+\.(...)(\?.+)?$/,"$1_p"+i.toString()+".$2"))
    }
//    biglink.innerHTML = "<img src='http://source.pixiv.net/source/images/member_illust_manga/zoom.png'>"
    biglink.innerHTML = "link"
    zooms[i].parentNode.parentNode.appendChild(biglink)
  }
}

var doManga = function(){
  for (var i=0; i<pages.length; i++) {
    images.push(pages[i].lastChild)
  }
  if (images.length > 0) {
    GM_xmlhttpRequest({
      method: "HEAD",
      url: images[0].src.replace(/([0-9]+)_p[0-9]+\.(...)(\?.+)?$/,"$1_big_p0.$2"),
      onload: function(responseDetails) {
        if (responseDetails.status == 404){
          addMangaLinks(false)
        } else {
          addMangaLinks(true)
        }
      }
    });
  }
}

window.addEventListener('load', doManga, true);
