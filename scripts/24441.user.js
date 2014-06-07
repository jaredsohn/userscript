// ==UserScript==
// @name           PenisEnlarger
// @include        http://*
// @description    Enlarge Your Penis

var penis = "penis"
var p = new RegExp( penis, "gi" )
var size = 100
bigpenis = "<span style='font-size:" + size + "px;'>" + penis + "</span>"
var body = document.body.innerHTML
var body = body.replace(p, bigpenis)
document.body.innerHTML = body
