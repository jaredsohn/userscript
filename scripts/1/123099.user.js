// ==UserScript==
// @name RateBeer Want/Have Ratebeer List
// @namespace none
// @description Add an Add to cellar/wantlist link
// @include http://*.ratebeer.com/beer/*
// ==/UserScript==

var list = document.getElementsByClassName("rightnav")[0]
var urlarray = (document.location.href).split("/")
var beerid = urlarray[urlarray.length -2]
var link = document.createElement('a')
var li = document.createElement('li')
li.setAttribute('style', 'padding: 10px; font-size: 20px;')
link.href = "http://www.ratebeer.com/Wishlist-AddWant.asp?BeerID="+beerid
link.innerHTML = '<span style="color: #fff;">Want/Have This</span>'
link.setAttribute('class', 'large orange awesome')
li.appendChild(link)
list.appendChild(li)