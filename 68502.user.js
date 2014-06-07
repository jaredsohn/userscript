// ==UserScript==
// @name           Estiah - FindCard
// @namespace      WalburEstiahScripts
// @description    Filters charms according to user specification in the deck building page.
// @include        http://www.estiah.com/character/deck*
// @author         Walbur
// @version        0.1.0
// ==/UserScript==


var match;

function updateCards() {

  var userinput = document.getElementById('findcharm_userinput').value;
  var property = document.getElementById('findcharm_property').selectedIndex;
  var gt = document.getElementById('findcharm_gt').checked;
  var lt = document.getElementById('findcharm_lt').checked;
  var eq = document.getElementById('findcharm_eq').checked;
  var compval = parseInt(document.getElementById('findcharm_compval').value);
  var op;
  if (gt == 1) {
    op = 0;
  }
  else if (lt == 1) {
    op = 1;
  }
  else if (eq == 1) {
    op = 2;
  }

  var cardFWs = document.getElementsByClassName('common_file floating opacity bd1');	// floating windows
  for (var i = 0; i < cardFWs.length; i++) {
    var cardFW = cardFWs[i];
    var card = document.getElementById('CollectionCard' + cardFW.id.substring(14))
    if (card != null) {
      var properties = new Array();
      var title1    = cardFW.getElementsByClassName('title ccraft');
      var title2    = cardFW.getElementsByClassName('title ctreasure');
      var title3    = cardFW.getElementsByClassName('title crare');
      var title4    = cardFW.getElementsByClassName('title cclass');
      var title5    = cardFW.getElementsByClassName('title cvendor');
      var title6    = cardFW.getElementsByClassName('title cepic');
      properties[0] = cardFW.getElementsByClassName('melee');
      properties[1] = cardFW.getElementsByClassName('magic');
      properties[2] = cardFW.getElementsByClassName('spirit');
      properties[3] = cardFW.getElementsByClassName('armor');
      properties[4] = cardFW.getElementsByClassName('ward');
      properties[5] = cardFW.getElementsByClassName('willpower');
      var special   = cardFW.getElementsByClassName('special');
      var desc   = cardFW.getElementsByClassName('description');

      match = 0;
      testString(title1, userinput);
      testString(title2, userinput);
      testString(title3, userinput);
      testString(title4, userinput);
      testString(title5, userinput);
      testString(title6, userinput);
      testString(desc, userinput);
      
      if (property != 0 && match == 1) {
        if (property <= 6) {
          if (properties[property - 1] == null || properties[property - 1].length == 0) {
            match = 0;
          } else {
            testCompare(properties[property - 1], op, compval);
          }
        }
        if (property == 7) // % pierce
          match = match & testValue(desc, /([0-9]+)% P\)/, op, compval);
      }
      

      if (!match) {
        card.style.display = 'none';
      } else {
        card.style.display = '';
      }
    }
  }
}

function testValue(desc, pat, op, thresh) {
  var res = desc[0].innerHTML.match(pat);
  var prop = parseInt(res);
  if (res == null || prop == -1 || prop == null)
    return 0;
  if (op == 0 && prop < thresh && prop >= 0)
    return 0;
  if (op == 1 && prop > thresh && prop >= 0)
    return 0;
  if (op == 2 && prop != thresh && prop >= 0)
    return 0;
  GM_log(res);
  return 1;
}


function testString(toTest, pattern) {
  patternLC = pattern.toLowerCase();
  pats = patternLC.split(" ");
  for (var p = 0; p < toTest.length; p ++) {
    toTestLC = toTest[p].innerHTML.toLowerCase();

    var miss = 0;
    for (var i = 0; i < pats.length; i ++) {
      var end = toTestLC.indexOf(pats[i]);
      if (end < 0) {
        miss = 1;
      }
    }
    if (miss == 0) {
      match = 1;
    }
  }
}

function testCompare(str, op, compval) {
  var prop = -1;
  var end = str[0].innerHTML.indexOf('</strong>');
  if (end > -1) {
  	var findStart = end - 12;
  	if (findStart < 0) findStart = 0;
  	var start = str[0].innerHTML.indexOf('<strong>', findStart);
  	if (start > -1) {
  		prop = parseInt(str[0].innerHTML.substring(start + 8, end));
    }
  }
  if (prop == -1)
    match = 0;
  if (op == 0 && prop < compval && prop >= 0)
    match = 0;
  if (op == 1 && prop > compval && prop >= 0)
    match = 0;
  if (op == 2 && prop != compval && prop >= 0)
    match = 0;
}


var OperationDiv = document.createElement("div");
OperationDiv.innerHTML = ' \
<div class="configlist outline" id="PatternConfig"> \
  <form id="PatternForm"> \
    <label>Contains string:</label> \
    <input name="pat" value="" id="findcharm_userinput" width="20" /> <br>\
    <select name="prop" class="select" id="findcharm_property"> \
      <option label="none" value="none" selected="selected">none</option> \
      <option label="melee" value="melee">melee</option> \
      <option label="magic" value="magic">magic</option> \
      <option label="spirit" value="spirit">spirit</option> \
      <option label="armor" value="armor">armor</option> \
      <option label="ward" value="ward">ward</option> \
      <option label="willpower" value="willpower">willpower</option> \
      <option label="% pierce" value="pierce">% pierce</option> \
    </select> \
    <label><input type="radio" name="cond" value="0" id="findcharm_gt" checked="checked" class="radio" />&gt=</label>&nbsp; \
    <label><input type="radio" name="cond" value="1" id="findcharm_lt" class="radio" />&lt=</label>&nbsp; \
    <label><input type="radio" name="cond" value="2" id="findcharm_eq" class="radio" />=</label>&nbsp; \
    <input name="compval" value="0" id="findcharm_compval" width="10"/> \
  </form> \
</div>';

OperationDiv.id = "PatternDiv";
var cardlist = document.getElementsByClassName("cardlist");
cardlist[1].parentNode.insertBefore(OperationDiv, cardlist[1]);

var input_desc = document.getElementById("findcharm_userinput");
input_desc.addEventListener("keyup",updateCards,false);
var input_comp = document.getElementById("findcharm_compval");
input_comp.addEventListener("keyup",updateCards,false);
var input_prop = document.getElementById("findcharm_property");
input_prop.addEventListener("change",updateCards,false);
var input_gt = document.getElementById("findcharm_gt");
input_gt.addEventListener("click",updateCards,false);
var input_lt = document.getElementById("findcharm_lt");
input_lt.addEventListener("click",updateCards,false);
var input_eq = document.getElementById("findcharm_eq");
input_eq.addEventListener("click",updateCards,false);


