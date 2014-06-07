// ==UserScript==
// @name           Gmail Peepshow
// @namespace      airportyh
// @include        https://mail.google.com/*, http://gmail.com/*
// ==/UserScript==

if (!window.peepshowInstalled){
    var cover = document.createElement('div')
    cover.id = 'cover'
    var style = cover.style
    style.position = 'absolute'
    style.width = '100%'
    style.height = '100%'
    style.top = '12.1em'
    style.left = '0px'
    style.backgroundColor = '#aaa'
    style.textAlign = 'center'
    style.cursor = 'pointer'
    cover.innerHTML = '\
    <h1>Gmail Peepshow</h1>\
    <p>Click here to see your mailbox</p>\
'
    cover.addEventListener('click', function(){
        style.MozTransition = style.WebkitTransition = 'top 1s ease-in-out'
        style.top = '1000px'
        setTimeout(function(){
            cover.parentNode.removeChild(cover)
        }, 1000)
    }, false)
    document.body.appendChild(cover)
    window.peepshowInstalled = true
    console.log('installed')
}