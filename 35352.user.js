// ==UserScript==
// @name          UserNameCheck
// @namespace     http://jeffpalm.com/usernamechecked
// @description   Puts check boxes to allow you to skip over sites on usernamecheck.com
// @include       http://usernamecheck.com/*
// ==/UserScript==

/*
 * Copyright 2008 Jeffrey Palm.
 */

var INPUT_CLASS = 'my_input';
var running = false;

function $n(tag,on) {
	var e = document.createElement(tag);
	if (on) on.appendChild(e);
  if (arguments.length > 2) setId(e,arguments[2]);
	return e;
}

function $t(text,on) {
	var e = document.createTextNode(text);
	if (on) on.appendChild(e);
	return e;
}

function $(id) {
  if (typeof id == "string") {
    var el = document.getElementById(id);
    return el;
  }
  return id;
}

function selectAll() {
  doSelect(true);
}

function selectNone() {
  doSelect(false);
}

/** Checks the selcted inputs. */
function checkSelected() {
  if (running) return;
  var inputs = document.getElementsByTagName('input');
  var checks = []
  for (var i=0; i<inputs.length; i++) {
    var input = inputs[i];
    if (!keep(input)) continue;
    if (input.checked) {
      checks.push(input);
    }
  }
  check(checks,0);
}

function findIdForInput(input) {
  var em = input.parentNode.lastChild;
  while (em.nodeName != 'EM') em = em.previousSibling;
  return em.id;
}

/** Checks the given input. */
function check(inputs,i) {
  running = true;
  var input = inputs[i];
  var username = $('username').value;
  var id = findIdForInput(input);
  var el = $(id);
	var loading = setInterval (function(){ el.innerHTML = el.innerHTML+"."; }, 500);

  url = 'http://usernamecheck.com/check/' + id + '/' + username;
  GM_xmlhttpRequest({
    method: 'GET',
        url: url,
        headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
          },
        onload: function(responseDetails) {
        clearInterval(loading);
        el.innerHTML = responseDetails.responseText;
        i++;
        if (i<inputs.length) {
          check(inputs,i);
        } else {
          running = false;
        }
      },
        onerror: function(responseDetails) {
        el.innerHTML = "- Timeout Error, Sorry !";
        if (i<inputs.length) {
          check(inputs,i);
        } else {
          running = false;
        }
      }
});
}

/** Returns true if we should keep this input based on className and type. */
function keep(input) {
  return input.type && input.type == 'checkbox'
    &&   input.className && input.className == INPUT_CLASS
}

/** Sets the 'checked' attribute of all inputs with class INPUT_CLASS to 'val' */
function doSelect(val) {
  var inputs = document.getElementsByTagName('input');
  for (var i=0; i<inputs.length; i++) {
    var input = inputs[i];
    if (!keep(input)) continue;
    input.checked = val;
  }
}


function main() {

  // Check selected button
  var outerDiv = $('usernameCheck');
  var checkSel = $n('input',outerDiv);
  checkSel.addEventListener('click', checkSelected, true);
  checkSel.className = 'submit';
  checkSel.type = 'submit';
  checkSel.id = 'submiter2';
  checkSel.value = 'CHECK Selected';

  var ems = document.getElementsByTagName("em");
  for (var i=0; i<ems.length; i++) {
    var em = ems[i];
    var input = $n('input');
    em.parentNode.insertBefore(input, em.parentNode.firstChild);
    input.className = INPUT_CLASS;
    input.type = 'checkbox';
    input.checked = true;
  }
  var divs = document.getElementsByTagName("div");
   for (var i=0; i<divs.length; i++) { 
     var div = divs[i]; 
     if (div.className && div.className == 'columns') { 
   
      var newNode = $n('div');

      var selAll = $n('a',newNode);
      selAll.href = '#';
      selAll.innerHTML = 'select all';
      selAll.addEventListener('click', selectAll, true);

      $t(' | ',newNode);

      var selNone = $n('a',newNode);
      selNone.href = '#';
      selNone.innerHTML = 'select none';
      selNone.addEventListener('click', selectNone, true);

      newNode.style.marginBottom = '3px';

      div.insertBefore(newNode, div.firstChild);
      break;
     }
   }
}

main();
