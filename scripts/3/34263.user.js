// ==UserScript==
// @name           MassInvite
// @namespace      Help.com
// @description    Help.com posts: Easy blanket invites at help.com
// @include        http://help.com/post/*
// ==/UserScript==

function Invites()
{
   if (clearance == false)
   {
      alert("Setting all "+ friends.length + " friends to receive invites");
      for (var i = 0; i < friends.length; i++) { friends[i].checked=true; };
      clearance = true;
   }
   else
   {
      alert("Unsetting all "+ friends.length + " friends to receive invites");
      for (var i = 0; i < friends.length; i++) { friends[i].checked=false; };
      clearance = false;
   };
};


clearance = false;
var friends=document.getElementsByName("invite_uids[]");
// create an empty element node
// without an ID, any attributes, or any content
var input1 = document.createElement("input");


// give it an id attribute called 'newButton'
input1.setAttribute("id", "newButton");
input1.setAttribute("type", "button");
input1.setAttribute("value", "invite ALL friends");
input1.addEventListener("click", function(){ Invites(); }, false);

var input2 = document.getElementById("add-reply");;
var parentDiv = input2.parentNode;

// insert the new element into the DOM before input2
parentDiv.insertBefore(input1, input2.nextSibling.nextSibling);