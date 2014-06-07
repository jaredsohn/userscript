// ==UserScript==
// @name           WFTargettingScore
// @namespace      sk.seko
// @description    Computes targetting score for ship design.
// @include        http://*.war-facts.com/ship_designs.php*
// @version        2.4
// ==/UserScript==

// Version 1.0 = grab params from displayed design, calculate targeting score and display it
// Version 2.0 = added support for "dynamic" display, i.e. during design creation
// Version 2.1 = fixed sliders and input fields for armor/shields
// Version 2.2 = fixed keyboard input
// Version 2.3 = fixed float vs. int speed issue, and fixed score display during ship design
// Version 2.4 = fixed formula for H5 (it has been changed, apparently!)

// ----------------------------------------------------------------------------------------
// Note for v2.4:
// TS value calculated (and displayed) on View ship class screen is not accurate, i.e. real
// TS is probably lower. This is because formula is using 'Hull mass', not 'Total mass' and
// there is no way to find you what hull mass exactly is. This is only possible on Ship
// design screen, for wich TS displayed should be correct. Sorry for inconveniece!
//                      - Seko
// ----------------------------------------------------------------------------------------


function eval(s) {
  if (s) {return Math.round(parseFloat(s.replace(/[,\s]/g,'')));}
  return 0;
}

function evalNode(node) {
  if (node) {return eval(node.nodeValue);}
  return 0.0;
}

// returns number formatted with commas, like 1234567 => "1,234,567"
function addCommas(nStr) {
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

// calculate targeting score and return it as formatted string
function calculateAndFormatTS(firepower, base_armor, base_shield, hull_mass, speed) {
  // =====================================================================================
  // THIS is formula for targetting score (TS); it can change in the future instances :-(
  // =====================================================================================
  var ts = firepower * (base_armor + base_shield + hull_mass - speed) / 2;
  //alert('fire=' + firepower + ', armor=' + base_armor + ', shield=' + base_shield + ', mass=' + hull_mass + ', speed=' + speed + ', ts=' + ts);
  return addCommas(String(ts));
}

// grab params and compute targeting score for existing design
window.grabAndCalculateStatic = function() {
  // GET SHIP DESIGN ATTRIBUTES
  var speed = evalNode(document.evaluate("//td[(child::text() = 'Cruise Speed:')]/following-sibling::node()/child::text()",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  var fireIter = document.evaluate("//td[(child::text() = 'Full Strike:')]/following-sibling::node()/child::text()",
    document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var fire = 0.0;
  var fireVal = fireIter.iterateNext();
  while (fireVal) {
    if (fireVal.nodeValue && fireVal.nodeValue.replace(/\s/,'') != '') {
      fire += evalNode(fireVal);
    }
    fireVal = fireIter.iterateNext();
  }
  var shield = evalNode(document.evaluate("//td[(child::text() = 'Shield:')]/following-sibling::node()/child::text()",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  var armor = evalNode(document.evaluate("//td[(child::text() = 'Armor:')]/following-sibling::node()/child::text()",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  var mass = evalNode(document.evaluate("//td[(child::text() = 'Mass:')]/following-sibling::node()/child::text()",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  // CALCULATE TARGETING SCORE
  return calculateAndFormatTS(fire, armor, shield, mass, speed);
}

// compute targeting score for ship being designed
window.grabAndCalculateDynamic = function() {
  // GET SHIP DESIGN ATTRIBUTES
  var speed = evalNode(document.evaluate("//td/span[@id='drivespeed']/child::text()",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  var firegun = evalNode(document.evaluate("//td/span[@id='vgunAstrike']/child::text()",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  var firecannon = evalNode(document.evaluate("//td/span[@id='vcannonAstrike']/child::text()",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  var shield = evalNode(document.evaluate("//td/span[@id='vshieldarmor']/child::text()",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  var armor = evalNode(document.evaluate("//td/span[@id='varmorshield']/child::text()",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  var mass = evalNode(document.evaluate("//td[(child::text() = 'Hull Mass:')]/following-sibling::node()/child::text()",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  // CALCULATE TARGETING SCORE
  var fire = (firecannon ? firecannon : 0.0) + (firegun ? firegun : 0.0);
  return calculateAndFormatTS(fire, armor, shield, mass, speed);
}

// displays targeting score as a table row
window.displayTS = function(tablerow, ts) {
    var ncol1 = document.createElement('td');
    ncol1.setAttribute("class","strong");
    ncol1.appendChild(document.createTextNode('Targeting Score:'));
    var ncol2 = document.createElement('td');
    ncol2.setAttribute("colspan", "3");
    var scoreElem = document.createTextNode(ts);
    ncol2.appendChild(scoreElem);
    var nrow = document.createElement('tr');
    nrow.appendChild(ncol1);
    nrow.appendChild(ncol2);
    tablerow.parentNode.insertBefore(nrow, tablerow);
    return scoreElem;
}

// compute and display targeting score for ship being designed
unsafeWindow.processDynamic = function() {
  var ts = grabAndCalculateDynamic();
  if (unsafeWindow.scoreElem) {
    unsafeWindow.scoreElem.nodeValue = ts;
  } else {
    var tablerow = document.evaluate("//center/table/tbody/tr/td/form/table[1]/tbody/tr/td[1]/table/tbody/tr[last()]",
      document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
    if (tablerow) {
      unsafeWindow.scoreElem = displayTS(tablerow, ts);
    }
  }
  return false;
}

// compute and display targeting score for existing design
window.processStatic = function() {
  // check if this is design is displayed
  var tablerow = document.evaluate("//center/table/tbody/tr[2]",
    document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
  if (!tablerow) {
    return; // design is not displayed, just quit
  }
  // calculate targeting score
  var ts = grabAndCalculateStatic();
  // DISPLAY TARGETING SCORE
  displayTS(tablerow, 'less than ' + ts);
}

// adds 'processDynamic' callback to all elements matching elements event
window.registerDynamicElements = function(xpath, attr) {
  var it = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  if (it) {
    var b = it.iterateNext();
    var elems = [];
    while (b) {
      elems.push(b);
      b = it.iterateNext();
    }
    for (x in elems) {
      elems[x].setAttribute(attr,elems[x].getAttribute(attr) + ";setTimeout(\"processDynamic()\", 100);");
    }
  }
}

// compute and display targeting score for existing design
window.initializeScript = function() {
  // dynamic/callbacks only when designing a ship
  if (!document.evaluate("//select[@name='designid']",
      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
    registerDynamicElements("//select[@id='driveselect']", 'onchange');
    registerDynamicElements("//select[@id='gunselect']", 'onchange');
    registerDynamicElements("//select[@id='cannonselect']", 'onchange');
    registerDynamicElements("//select[@id='armorselect']", 'onchange');
    registerDynamicElements("//select[@id='shieldselect']", 'onchange');
    registerDynamicElements("/html/body", 'onmouseup');
  }
  processStatic();
}

window.addEventListener("load", initializeScript, false);
