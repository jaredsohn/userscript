// ==UserScript==
// @id             twitter.com-e5d89824-0f1b-ac4f-803a-5570db4e06ab@scriptish
// @name           Twitter Anonymizer
// @version        1.0
// @namespace
// @author         Rob Middleton (http://middlerob.com)
// @license        MIT
// @description    Fuzz avatars and names of everyone on twitter
// @include        https://twitter.com/
// @run-at         document-end
// ==/UserScript==

watchSelector(".fullname, .username b, .username span, .twitter-atreply b, .js-user-profile-link b", function (name) {
  name.innerHTML = hashText(name.innerHTML)
})

function hashText (text) {
  return text.split("").reverse().join("")
}

watchSelector(".avatar", function (avatar) {
  if (avatar.tagName === "CANVAS") {
    // prevent infinite recursion
    return
  }
  replaceImage(avatar)
})

function replaceImage (imageElement) {
  if (!imageElement.getAttribute("src")) return

  var img = document.createElement("img")
  img.addEventListener("load", function () {
    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext("2d")
    canvas.width = 3
    canvas.height = 3
    canvas.style.width = imageElement.style.width
    canvas.style.height = imageElement.style.width

    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 3, 3)
    canvas.className = imageElement.className

    imageElement.parentNode.insertBefore(canvas, imageElement)
    imageElement.parentNode.removeChild(imageElement)
  }, false)

  img.src = imageElement.src
  imageElement.removeAttribute("src")
}



function watchSelector (selector, cb) {
  function fireMatches (matches) {
    for (var i = 0; i < matches.length; i++) {
      cb(matches[i])
    }
  }

  document.addEventListener("DOMNodeInserted", function (e) {
    if (e.target.mozMatchesSelector(selector)) {
      fireMatches([e.target])
    }

    var matches = e.target.querySelectorAll(selector)
    fireMatches(matches)
  }, true)

  // Matches on load
  var matches = document.querySelectorAll(selector)
  fireMatches(matches)
}
