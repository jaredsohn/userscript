// ==UserScript==
// @name           ResistanceDecoder
// @namespace      kingdomofloathing.com/Drachefly
// @include        *.kingdomofloathing.com/charsheet.php
// @include        file://*/charsheet.php
// @description    Turns vaguely worded resistance degrees into hard numbers. 1.2
// ==/UserScript==


function getRank(node) {
  var text = node.firstChild.innerHTML;
  switch (text) {
    case 'Very Low': return 1;
    case 'Low': return 2;
    case 'Moderate': return 3;
    case 'Considerable': return 4;
  }
  var really = (text.indexOf('Really') != -1)? 1: 0;
  var very = (text.indexOf('Very') != -1)? 1: 0;
  var extremely = (text.indexOf('Extremely') != -1)? 1: 0;

  var rank = 0; // assume 'high', which is 5, and add on to that.
  if (text.length < 7*really + 5*very + 10*extremely + 7) rank = 5; // '<' so I have some room for error.
// last term would be  5 if I were trying to be exact.
  else if (text.indexOf('Amazingly'      ) != -1) rank = 11;
  else if (text.indexOf('Extraordinarily') != -1) rank = 17;
  else if (text.indexOf('Incredibly'     ) != -1) rank = 23;
  else if (text.indexOf('Staggeringly'   ) != -1) rank = 29;
  else if (text.indexOf('Mind-Bogglingly') != -1) rank = 35;
  else if (text.indexOf('Inconceivably'  ) != -1) rank = 41;
  else if (text.indexOf('Unthinkably'    ) != -1) rank = 47;
  else if (text.indexOf('Indescribably'  ) != -1) rank = 53;
  else 
     //if (text.indexOf('Impossibly'     ) != -1)
                                                  rank = 59;
  
  rank += really + very + 3 * extremely;
  return rank;
}


resPercents = [ 0.00, 10.00, 20.00, 30.00, 40.00];



function getResistance(ranks) {
  if (ranks < 5) return resPercents[ranks];
  return 90 - 50*Math.pow(0.833333333, ranks-4);
}

function getEffHP(rank, bonus, realHP) {
  var val = new String(realHP*100.0/(100.0-getResistance(rank)-bonus));
  var ind = val.indexOf('.');
  if (ind != -1) val = val.substring(0, ind);
  return val;
}
function makeTD(contents) {
  td = document.createElement("td");
  td.align = 'right';
  td.innerHTML = contents;
  return td;
}

var otable = document.getElementsByTagName('table')[2];

var otr;
var intable;
var orown = 0; // outer row number
var irown = 1;

var myst = (otable.rows[4].innerHTML.indexOf("Mana") != -1)? 5: 0

// skip HP, MP, 3 stats, and 2 borders. Start a touch early, just in case
for (orown = 8; orown < otable.rows.length; orown++) {
  otr = otable.rows[orown];

  if (otr.innerHTML.indexOf("Protection:") != -1) { // FIRST TIME
    otable.insertRow(orown);
    var newrow = otable.rows[orown++]; // we just added a new row, so need to increment orown to still point at protection

    var onecell = document.createElement("td");
    onecell.colSpan = 2;
    onecell.align = 'center';
    newrow.appendChild(onecell);

    intable = document.createElement("table");
    intable.frame = 1;
    onecell.appendChild(intable);

    intable.insertRow(0);
    var headerRow = intable.rows[0];

    headerRow.appendChild(makeTD('type'));
    headerRow.appendChild(makeTD('rank'));
    headerRow.appendChild(makeTD('protection'));
    headerRow.appendChild(makeTD('&nbsp; &nbsp;'));
    headerRow.appendChild(makeTD('eff. HP'));

    break; // done advancing orown, now it sits still.
  }

} // end searching for protections

var ebtn = document.getElementsByTagName('b');
var currHP = ebtn[3].innerHTML;
var maxHP = ebtn[4].innerHTML; // last use of ebtn
otr = otable.rows[orown];

while (otr.innerHTML.indexOf("Protection:") != -1) {
  var rank = getRank(otr.lastChild);
  intable.insertRow(irown);
  
  var itr = intable.rows[irown++];
  var dtype = otr.firstChild;
  var dtypes = dtype.innerHTML;
  dtype.innerHTML = dtypes.slice(0, dtypes.indexOf(' '));
  itr.appendChild(dtype);
  itr.appendChild(makeTD(rank));
  itr.appendChild(makeTD(new String(getResistance(rank)).substring(0,5) + '%'));
  itr.appendChild(makeTD('&nbsp; &nbsp;'));
  itr.appendChild(makeTD(getEffHP(rank, myst, currHP)+' / '+getEffHP(rank, myst, maxHP)));
  intable.appendChild(itr);

  otable.deleteRow(orown); // zap old outer row... no need to increment orown
  otr = otable.rows[orown]; // get row after the one we just had...
}
