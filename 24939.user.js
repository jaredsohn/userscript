// ==UserScript==
// @name           imdb hide cast
// @namespace      znerp
// @description    gives the option of showing or hiding the cast list on main title pages on imdb.
// @include        http://www.imdb.com/title/tt*
// @include        http://us.imdb.com/title/tt*
// @include        http://imdb.com/title/tt*
// ==/UserScript==

cast = document.evaluate("//div[@class='headerinline']/h3",
                         document,
                         null,
                         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                         null)

for (i = cast.snapshotLength - 1; i >= 0; i--) {
  if (/Cast/.test(cast.snapshotItem(i).textContent)) {
    castHeader = cast.snapshotItem(i).parentNode
    showHide = document.createElement("a")
    showHide.setAttribute("class", "tn15more inline")
    showHide.style.color = "#003399"
    showHide.style.cursor = "pointer"
    showHide.addEventListener(
      "click",
      function() {
        GM_setValue("show cast", !(GM_getValue("show cast", true)))
        toggleShow()
      },
      true);
    castHeader.appendChild(showHide)
    toggleShow()
    break;
  }
}

function toggleShow() {
    castHeader.nextSibling.style.display = GM_getValue("show cast", true) ? "inline" : "none"
    showHide.textContent = GM_getValue("show cast", true) ? "Hide" : "Show"
}