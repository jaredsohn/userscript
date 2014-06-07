// ==UserScript==
// @name           GLB STPC Save as
// @namespace      GLB Special Team Creator Save As
// @include        http://test.goallineblitz.com/game/team_create_specialteam.pl?team_id=*
// ==/UserScript==

var node_list = document.getElementsByTagName('input')
for (var i = 0; i < node_list.length; i++) {
   var node = node_list[i];
   if (node.getAttribute('name') == 'play_id') {
	var id_box = node_list[i]
   }
}
var org = id_box.getAttribute('value')

function unchecked() {
	id_box.value = org
	checkbox.addEventListener("change", checked, false)
	checkbox.removeEventListener("change", unchecked, false)
}

function checked() {
	id_box.value = 0
	checkbox.removeEventListener("change", checked, false)
	checkbox.addEventListener("change", unchecked, false)
}

var node_list = document.getElementsByTagName('input')
for (var i = 0; i < node_list.length; i++) {
   var node = node_list[i];
   if (node.getAttribute('name') == 'name') {
	var container = node_list[i]
   }
}

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

//var container = document.getElementById('position_selections')
var title = document.createElement('b')
title.innerHTML = 'Save as new play? '
var br = document.createElement('br')
var checkbox = document.createElement('input')
checkbox.setAttribute('type', 'checkbox')
checkbox.setAttribute('style', 'vertical-align: middle')
checkbox.addEventListener("change", checked, false)
insertAfter(container.parentNode, checkbox, container)
insertAfter(container.parentNode, title, container)
insertAfter(container.parentNode, br, container)