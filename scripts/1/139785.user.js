// ==UserScript==
// @name        sumally-add-via-link
// @namespace   swdyh
// @include     http://sumally.com/*
// @version     0.0.4
// @updateURL   https://userscripts.org/scripts/source/139785.user.js
// ==/UserScript==

document.addEventListener('DOMNodeInserted', function(ev) {
    if (ev.target && ev.target.className == 'oneblock') {
        addVia(ev.target)
    }
}, false)
Array.prototype.slice.call(document.querySelectorAll('.oneblock')).forEach(addVia)

function addVia(node) {
    var a = node.querySelector('.text a[href^="http://sumally.com/p/"]')
    if (!a || node.querySelector('a.via')) {
        return
    }
    var u = a.href
    var via = document.createElement('a')
    via.className = 'via'
    via.style.color = '#F8A41A'
    via.appendChild(document.createTextNode(' via '))
    a.parentNode.appendChild(via)

    var f = function() {
        via.removeChild(via.firstChild)
        via.appendChild(document.createTextNode(' ... '))
        via.removeEventListener('mouseover', f)

        var xhr = new XMLHttpRequest()
        xhr.onload = function() {
            var r = xhr.responseText.match(/data-gaq="product_via_link" href="([^\"]+)"[^>]*>([^<]*)</)
            if (r) {
                var viaUrl = document.createElement('a')
                viaUrl.href = r[1]
                viaUrl.style.color = '#F8A41A'
                viaUrl.target = '_blank'
                var t = ' '
                var ut = r[1].length > 30 ? (r[1].slice(0, 30) + '...') : r[1]
                if (r[1] == r[2]) {
                    t += ut
                }
                else {
                    t += [r[2], ut].join(' ')
                }
                viaUrl.appendChild(document.createTextNode(t))
                via.parentNode.appendChild(document.createElement('br'))
                via.parentNode.appendChild(viaUrl)
            }
            via.parentNode.removeChild(via)
        }
        xhr.open('GET', u)
        xhr.send()
    }
    via.addEventListener('mouseover', f)
}

