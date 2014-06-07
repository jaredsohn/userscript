// ==UserScript==
// @name       Ultimate Guitar show all favorites + random favorite button
// @version    0.3
// @description  Automatically shows all your favorites on Ultimate Guitar favorites page and adds a button to open a random favorite in a new tab
// @include      http://my.ultimate-guitar.com/main.php?mode=favorites*
// @copyright  Aviem Zur
// ==/UserScript==

document.evaluate("//a[@class='nx' and text()='All']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click()

var favorites = document.evaluate("//table[@id='list']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).firstChild.rows

randomBtn = document.createElement("BUTTON")
randomBtn.innerText = "Random"
randomBtn.id = "randomBtn"
randomBtn.onclick = function() { 
    evt = document.createEvent("MouseEvents")
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null)
    a = document.createElement("a")
    a.href = favorites[Math.floor((Math.random()*favorites.length))].firstChild.nextSibling.nextSibling.nextSibling.firstChild.href
    a.dispatchEvent(evt)
}

document.evaluate("//input[@value='Edit']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode.appendChild(randomBtn)