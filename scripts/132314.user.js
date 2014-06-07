// ==UserScript== 
// @name           Campfire User Icons
// @author         Rob Middleton
// @description    Adds user icons to campfire.
// @version        1.0.0
// @license        MIT
// @include        http://*.campfirenow.com*
// @include        https://*.campfirenow.com*
// ==/UserScript== 


;(function () {

function addImage (person) {
  var author = person.querySelector(".author")
  var url = author.getAttribute("data-avatar")
  var icon = document.createElement("img")
  icon.setAttribute("src", url)

  icon.style.float = "right"
  icon.style.height = "32px"
  icon.style.padding = "0 0 0 6px"

  person.appendChild(icon)
  
  // don't put an icon on multi posts by the same person
  // the display:none isn't applied at this point so we have to wait a tick
  setTimeout(function () {
    if (author.style.display === "none") icon.style.display = "none"
  }, 0)
}

var chat = document.querySelector(".chat")

chat.addEventListener("DOMNodeInserted", function (e) {
  var p
  if (e.target.className && ~e.target.className.toString().indexOf("person")) {
    addImage(e.target)
  }
  else if (e.target.querySelector && (p = e.target.querySelector(".person"))) {
    addImage(p)
  }
}, false)

var posts = document.querySelectorAll(".chat .person")
for (var i = 0; i < posts.length; i++) {
  addImage(posts[i])
}

}())