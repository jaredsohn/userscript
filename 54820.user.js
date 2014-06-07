// ==UserScript==
// @name          Trac: edit ticket in place
// @namespace     http://code.google.com/p/ecmanaut/
// @description   Instead of putting the change ticket form, if you have sufficient privileges to see it, at the end of the ticket, where it is annoying, have it be a hidden tab for the ticket summary field, where you would expect it to be.
// @require       http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @include       http*://*/ticket/1*
// @include       http*://*/ticket/2*
// @include       http*://*/ticket/3*
// @include       http*://*/ticket/4*
// @include       http*://*/ticket/5*
// @include       http*://*/ticket/6*
// @include       http*://*/ticket/7*
// @include       http*://*/ticket/8*
// @include       http*://*/ticket/9*
// ==/UserScript==

var ticket = $("ticket");
var change = $("properties");

if (change && ticket) {
  ticket.removeAttribute("id");
  var t2 = node({ replace: ticket, tag: <fieldset id="ticket"><legend>
    <a href={ showhide("properties", "ticket") }>edit ticket</a>
  </legend></fieldset> });
  node({ append: t2, tag: ticket });

  var c2 = node({ after: t2, tag: <fieldset id="properties"><legend>
    <a href={ showhide("ticket", "properties") }>show ticket</a>
  </legend></fieldset> });
  [].slice.call(change.childNodes).filter(function(n) {
    return !n.nodeName || !/^legend$/i.test(n.nodeName);
  }).forEach(function(n) {
    c2.appendChild(n);
  });

  change.parentNode.removeChild(change);
  c2.style.marginTop = "1em";
  c2.style.display = "none";
}

function showhide(show, hide) {
  function change(id, to) {
    return 'document.getElementById("'+ id +'").style.display="'+ to +'"';
  }
  return 'javascript:'+
    change(show, "block") +';void('+
    change(hide, "none") +')';
}

function $(id) {
  return document.getElementById(id);
}
