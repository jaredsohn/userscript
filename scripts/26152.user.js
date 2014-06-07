// ==UserScript==
// @name           eBay hide duplicate results
// @description    easy toggle to show or hide bunches of repeated results in eBay searches
// @namespace      znerp
// @include        http://*search.ebay.co.uk/*
// @include        http://*search.ebay.com/*
// @include        http://*shop.ebay.co.uk/*
// @include        http://*shop.ebay.com/*
// ==/UserScript==

var plus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMA%2FwD%2FA" +
           "P83WBt9AAAAZElEQVR4nL2SUQ6AMAhDH2Q38v430DPhh4YsyHCLif0jK21hiJkBIgdvMNsAnWQ7TWCfYTtacKzl" +
           "70jp8yhn3lBguaH1RYjhZT%2FeNwdXurTTvf08tKP4xOXT0Poins5aBwhs4ATOOiHsGI5R2gAAAABJRU5ErkJgg" +
           "g%3D%3D"
var minus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMA%2FwD%2F" +
           "AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARklEQVR4nGP8%2F%2F8%2FAwMDIyMjAyEAUQmjiAMkKYYCh" +
           "Evw64a7mYlUG2ivAQHw%2BAFZimQbWIi0hHwb6BlKxAJSEx8T8XogygC6eSP5CxYWpwAAAABJRU5ErkJggg%3D%" +
           "3D"
var thisResult, nextResult

switch (true) {
  case /search/.test(location.host):
    var allResults = document.evaluate('//table[@class="ebItemlist single"]/tbody/tr[contains(@class,"single")]/td[@class="ebcTtl"]/h3/a',
                                       document,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                       null);

    for (i = 0; i < allResults.snapshotLength - 1; i++) {
      thisResult = allResults.snapshotItem(i)
      nextResult = allResults.snapshotItem(i + 1)
      if (thisResult.textContent == nextResult.textContent) {
        nextResult.parentNode.parentNode.parentNode.style.display = "none"
        nextResult.parentNode.parentNode.parentNode.setAttribute("znerp", "hidden")
        nextResult.parentNode.appendChild(document.createTextNode("  <<duplicate>>"))
        if (thisResult.parentNode.parentNode.parentNode.style.display != "none") {
          icon = document.createElement("img")
          icon.src = plus
          icon.setAttribute("style", "padding: 3px; cursor: pointer;")
          thisResult.parentNode.parentNode.insertBefore(icon, thisResult.parentNode.parentNode.firstChild)
          icon.addEventListener(
            'click',
            function() {
              this.src = (this.src == plus ? minus : plus)
              foo = this.parentNode.parentNode
              if (this.src == minus)
                while((foo = foo.nextSibling).getAttribute("znerp") == "hidden") {
                  foo.style.display = ""
            foo.setAttribute("znerp", "showing")
                }
              else
                while((foo = foo.nextSibling).getAttribute("znerp") == "showing") {
            foo.style.display = "none"
            foo.setAttribute("znerp", "hidden")
                }
            },
            true)
        }
      }
    }

    var otherStuff = document.evaluate('//table[@class="ebItemlist single"]/tbody/tr/td/script',
                                       document,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                       null);

    for (i = otherStuff.snapshotLength - 1; i >= 0; i--)
      (foo = otherStuff.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo)
    break;
  case /shop/.test(location.host):
    var allResults = document.evaluate('//div[contains(@class,"lview")]/table[@class="nol"]/tbody/tr/td[@class="details"]/div[@class="ttl"]/a',
                                       document,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                       null);
    for (i = 0; i < allResults.snapshotLength - 1; i++) {
      thisResult = allResults.snapshotItem(i)
      nextResult = allResults.snapshotItem(i + 1)
      if (thisResult.textContent == nextResult.textContent) {
        nextResult.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none"
        nextResult.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.style.display = "none"
        nextResult.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("znerp", "hidden")
        nextResult.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.setAttribute("znerp", "hidden")
        nextResult.parentNode.appendChild(document.createTextNode("  <<duplicate>>"))
        if (thisResult.parentNode.parentNode.parentNode.parentNode.parentNode.style.display != "none") {
          icon = document.createElement("img")
          icon.src = plus
          icon.setAttribute("style", "padding: 3px; cursor: pointer;")
          thisResult.parentNode.parentNode.insertBefore(icon, thisResult.parentNode.parentNode.firstChild)
          icon.addEventListener(
            'click',
            function() {
              this.src = (this.src == plus ? minus : plus)
              foo = this.parentNode.parentNode.parentNode.parentNode
              if (this.src == minus)
                while((foo = foo.nextSibling.nextSibling.nextSibling).getAttribute("znerp") == "hidden") {
                  foo.style.display = ""
                  foo.nextSibling.style.display = ""
                  foo.setAttribute("znerp", "showing")
                  foo.nextSibling.setAttribute("znerp", "showing")
                }
              else
                while((foo = foo.nextSibling.nextSibling.nextSibling).getAttribute("znerp") == "showing") {
                  foo.style.display = "none"
                  foo.nextSibling.style.display = "none"
                  foo.setAttribute("znerp", "hidden")
                  foo.nextSibling.setAttribute("znerp", "hidden")
                }
            },
            true)
        }
      }
    }
  
    break;
}