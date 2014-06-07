// ==UserScript==
// @name           4shared hacker
// @namespace      unloco_4sh
// @include        http://www.4shared.com/file/*
// ==/UserScript==


try{
em = document.getElementById("ply")
flvars = em.getAttribute("flashvars")
file = flvars.substring(flvars.indexOf("file=")+5,flvars.indexOf("&"))
dv = document.createElement("div")
dv.id="divforshared"
dv.setAttribute("style","font-weight:bold;")
dv.innerHTML='<a href="'+file+'">Download</a>'
em.parentNode.insertBefore(dv,em.nextSibling)
}catch(ex){}

