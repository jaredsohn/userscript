// ==UserScript==
// @name    UD Building State Colorizer
// @description    Colorizes a building's barricade level, door, ransack and ruin status, and presence, damage-level and status of machinery.
// @namespace    http://aichon.com
// @include    http://urbandead.com/map.cgi*
// @include    http://www.urbandead.com/map.cgi*
// @exclude    http://urbandead.com/map.cgi?logout
// @exclude    http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead Building State Colorizer
 * v1.4.1
 *
 * Copyright (C) 2010 Bradley Sattem -- bradkun@gmail.com
 * Copyright (C) 2008 Ville Jokela -- midianian@mbnet.fi
 *
 * Released under the terms of the GNU GPL V2, which can be found at http://www.gnu.org/copyleft/gpl.html
 *
 * Changes:
 *   1.4.1:
 *     * now works after the August 16th, 2010 game update
 *   1.4:
 *     * now works with forts that are open
 *     * colors and styles changed drastically
 *   1.3:
 *     * new phrases: "low on fuel", "only has a little fuel left", "enough to power"
 *     * changed machinery highlighting because "damaged" could also be found elsewhere in building descriptions
 *     * fix: spraypainted messages were still highlighted
 *     * "ransacked" in museums in the description "ransacked by looters" is no longer colourized
 *   1.2:
 *     * Opera and Greasemetal compatible
 *   1.1:
 *     * machinery damage now highlighted
 *     * doesn't highlight phrases in spraypainted messages anymore
 *     * colours tweaked
 */

function colorizeBarricades() {
  var div = document.evaluate('//td[@class="gp"]/div[@class="gt"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  processElement(div);
}

function processElement(element) {
  for (var i = 0; i < element.childNodes.length; i++) {
    var el = element.childNodes[i];
    switch (el.nodeType) {
    case el.ELEMENT_NODE:
      if (el.tagName == 'I')  // HTML returns all-caps
        return;
    case el.DOCUMENT_NODE:
    case el.DOCUMENT_FRAGMENT_NODE:
      processElement(el);
      break;
    case element.TEXT_NODE:
      processText(el);
      break;
    }
  }
}

function processText(element) {
  var highlights = [
    // darkness
    { str: 'lights out',        colour: '#ff0', bold: true,  append: ' (Your Safe)' },

    // barricade levels. must be in this order, otherwise HB will override VHB and EHB.
    { str: 'extremely heavily barricaded',    colour: '#inherit', underline: true,  append: ' (17-21+)' },
    { str: 'very heavily barricaded',    colour: '#3af',  append: ' (14-16)' },
    { str: 'heavily barricaded',      colour: '#3ff',  append: ' (11-13)' },
          { str: 'very strongly barricaded',    colour: '#3fa', bold: true, underline: true, append: ' (8-10)' },
          { str: 'quite strongly barricaded',    colour: '#af3',  append: ' (5-7)' },
    { str: 'lightly barricaded',      colour: '#ff3',  append: ' (2-4)' },
    { str: 'loosely barricaded',      colour: '#fa3', bold: true,  append: ' (1)' },

    // doors
    { str: 'have been secured',      colour: '#f33', bold: true },
    { str: 'left wide open',      colour: '#a00', bold: true,  append: ' (Run Fool)' },
    { str: 'hang open',        colour: '#a00', bold: true },  // forts
    { str: 'ragged rectangle has been cut',    colour: '#a00', bold: true },  // junkyards
    { str: 'opens directly onto the street',  colour: '#a00', bold: true },  // churches & cathedrals
    // TODO: zoo enclosures

    // ransack
    // KLUDGE: takes precedence over 'ransacked' to avoid highlighting it in museum descriptions that aren't actually ransacked
    { str: 'ransacked by looters',      colour: '#inherit' },
    { str: 'ransacked',        colour: '#a00' },

    // ruined
    { str: 'has been ruined',      colour: '#333' },
    { str: 'has fallen into ruin',      colour: '#333' },
    { str: 'are ruined',        colour: '#333' },  // malls

    // damaged machinery
    { str: 'badly damaged portable generator',  colour: '#a00', bold: true },
    { str: 'damaged portable generator',    colour: '#f33', bold: true },
    { str: 'battered portable generator',    colour: '#fa3', bold: true },
    { str: 'dented portable generator',    colour: '#ff3', bold: true },
    { str: 'badly damaged radio transmitter',  colour: '#a00', bold: true },
    { str: 'damaged radio transmitter',    colour: '#f33', bold: true },
    { str: 'battered radio transmitter',    colour: '#fa3', bold: true },
    { str: 'dented radio transmitter',    colour: '#ff3', bold: true },
    // unharmed machinery
    { str: 'portable generator',      colour: '#inherit', underline: true },
    { str: 'radio transmitter',      colour: '#inherit', underline: true },
    // machinery power
    { str: 'is out of fuel',      colour: '#333', bold: true },
    { str: 'powered-down',        colour: '#333', bold: true },
    { str: 'is running',        colour: '#0F0', underline: true,  append: ' (Not Safe)' },
    { str: 'powering',        colour: '#inherit', underline: true },
    { str: 'enough to power',      colour: '#inherit', underline: true },
    { str: 'low on fuel',        colour: '#faa', bold: true },
    { str: 'only little fuel left',    colour: '#faa', bold: true },
  ];

  for (var i = 0; i < highlights.length; i++) {
    var hl = highlights[i];
    var text = element.textContent;
    var index = text.indexOf(hl.str);
    if (index != -1) {
      if (index == 0 &&
                            ((hl.append && text.length == hl.str.length + hl.append.length)) ||
                             (text.length == hl.str.length))
        return;
      var frag = document.createDocumentFragment();
      frag.appendChild(document.createTextNode(text.substring(0, index)));
      var span = document.createElement('span');
      if (hl.bold)
        span.style.fontWeight = 'bold';
      if (hl.underline)
        span.style.textDecoration = 'underline';
      span.style.color = hl.colour;
                        var replacement;
                        if(hl.append)
                    replacement = hl.str + hl.append;
                        else
                    replacement = hl.str;
            span.textContent = replacement;
      frag.appendChild(span);
      frag.appendChild(document.createTextNode(text.substring(index + hl.str.length)));
      processElement(frag);
      element.parentNode.replaceChild(frag, element);
      return;
    }
  }
}

colorizeBarricades();