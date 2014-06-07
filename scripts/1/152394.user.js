// ==UserScript==
// @name       Diary.ru '+1'
// @namespace  http://userscripts.org/scripts/show/152394
// @author     dpleshakov (http://userscripts.org/users/473776)
// @version    0.1.3
// @description  Добавляет кнопку '+1' от Google к каждому посту на diary.ru.
// @include      *://*.diary.ru*
// @copyright  2012+, 
// ==/UserScript==

function getOneElementByClassName(parentElement, className) {
    return parentElement.getElementsByClassName(className)[0]
}
function insertAfter(parent, node, referenceNode) {
    parent.insertBefore(node, referenceNode.nextSibling);
}

function addLikeLinks() {
    var po = document.createElement('script')
    po.type = 'text/javascript'
    po.async = true
    po.src = 'https://apis.google.com/js/plusone.js'
    var lang = document.createTextNode("{ lang: 'ru' }")
    po.appendChild(lang)
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(po, s)

    var allPostLinksDiv = document.getElementsByClassName("postLinksBackg")
    for (var index = 0; index < allPostLinksDiv.length; index++) {
        var currentPostLinksDiv = allPostLinksDiv[index]
        if (currentPostLinksDiv.className != "postLinksBackg") {
            continue
        }
        var currentPostLinkUi = getOneElementByClassName(currentPostLinksDiv, "postLinks")
        if (currentPostLinkUi == null) {
            continue
        }
        var currentPostUrlElement = getOneElementByClassName(currentPostLinksDiv, "urlLink")
        if (currentPostUrlElement == null) {
            continue
        }
        var postUrl = currentPostUrlElement.getElementsByTagName("a")[0].href
        if (postUrl == null) {
            continue
        }

        var currentElementBefore = getOneElementByClassName(currentPostLinksDiv, "Attention")
        if (currentElementBefore == null) {
            currentElementBefore = currentPostUrlElement
        }

        // create google +1 button
        var gPlusone = document.createElement("g:plusone")
        gPlusone.setAttribute('size', "small")
        gPlusone.setAttribute('href', postUrl)
        gPlusone.setAttribute('annotation', "inline")
        gPlusone.setAttribute('width', 200)
        //var listLikeElement = document.createElement("li").appendChild(gPlusone)
        var spanLikeElement = document.createElement("span")
        spanLikeElement.appendChild(gPlusone)
        spanLikeElement.setAttribute("style", "float: left; margin-left:30px")

        insertAfter(currentPostLinksDiv, spanLikeElement, currentElementBefore)
    }
}

addLikeLinks()