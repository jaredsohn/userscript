// ==UserScript==
// @name            No FBChat
// @namespace       Platypus
// @include         *.facebook.com/*
// @exclude         www.facebook.com/home.php
// @exclude         www.facebook.com/

function do_platypus_script() {
remove_it(window.document,document.getElementById('presence'),null,null,null);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing all the code to implement Platypus
//  actions.  Can be "included" into the Platypus script.
//
// 
// 
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
//.user.js