// ==UserScript==
// @name           Moderatrix
// @namespace      http://userscripts.org/users/73030
// @description    Your second chance when moderating slashdot
// @include        slashdot.org/*
// @include        *.slashdot.org/*
// @version        2009/06/02
// ==/UserScript==


// Create functions to be inserted into the document head
var newScript= document.createTextNode("\nvar arrVerbage = [\"Leave unmoderated\",\n                \"Burn this user's karma!\",\n                \"Burn this user's karma!\",\n                \"Burn this troll's karma!\",\n                \"Burn this user's karma!\",\n                \"Mod up!\",\n                \"Mod up!\",\n                \"Mod up!\",\n                \"LOLZ!\",\n                \"Mod Down!\",\n                \"Mod up!\"]\nfunction writeConfirmation(object)\n{\n   var id = object.id;\n   var selectedValue=object.value;\n   if(!document.getElementById(\"bttn_\" + id))\n   {\n      var parentDiv = object.parentNode;\n      var button = document.createElement(\"button\");\n\n      button.appendChild(document.createTextNode(arrVerbage[selectedValue]));\n      button.setAttribute(\"onclick\",\"return doTheModThing(document.getElementById(\\\"\" + id + \"\\\"));\");\n      button.setAttribute(\"id\",\"bttn_\" + id);\n      parentDiv.appendChild(button);\n   }\n   else\n   {\n      if(selectedValue == 0)\n         document.getElementById(\"bttn_\" + id).parentNode.removeChild(document.getElementById(\"bttn_\" + id));\n        else\n         document.getElementById(\"bttn_\" + id).innerHTML = arrVerbage[selectedValue];\n   }\n}\n\nvar doTheModThing = D2.doModerate;\nD2.doModerate = function(obj) { writeConfirmation(obj);}\n");

// Create the element
var newNode = document.createElement("script");
newNode.appendChild(newScript);

// Insert the code and watch it go!
document.getElementsByTagName("head").item(0).appendChild(newNode);