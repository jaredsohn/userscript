// ==UserScript==
// @name			Hos's Pants Upgrade
// @version			1.11p
// @description		Gives you the Pants
// @include			http://ev5.neondragon.net/*
// @author			~ravenlord~ (r4v3n10rd@gmail.com) - source
// @author			HETMAN (kanarinios@gmail.com) - upgrades
// @author			MadFrog (mbfrog@gmail.com) - upgrades
// ==/UserScript==
/*
    CHANGE LOG ---- PLEASE READ IT BEFORE UPDATING!!!!
    ===============================================================================
    Date            Version         Description
    -------------------------------------------------------------------------------
    22-Jun-2005     0.10a           Initial Version

    23-Jun-2005     0.11a           Fixed defense calculation formula and changed
                                    defenseboost to 40% for creatures

    23-Jun-2005     0.12a           Fixed fleet times to include anti-gravity unit
                                    of zippy :-), seems accurate now

    24-Jun-2005     0.13a           Made couple more corrections, thanks to
                                    drokliss of Opusville and WhyteWolf of wolf's
                                    den
    02-Jul-2005     1.01a           Version jumped to Major :)
                                    Added quick message system

    04-Jul-2005     1.02            Few fixes. Removed the flickering.

    08-Jul-2005     1.03            Added Ranking, thanks to Khlo

    15-Jul-2005     1.04            Added links to planets from coords, thanks to
                                    xerektik of plandeltre

    27-Aug-2005     1.06            Added bar with min and max score by Hetman

    11-Sep-2005     1.07            Added colour scores at Universe page

    27-Sep-2005     1.08            Working with new GUI

    1-Oct-2005      1.09            Maximum production of creautres,defence and scans.

    16-Oct-2005     1.10            Refresh on blur maximum production.

    17-Oct-2005     1.11            Color scores at View Members pages (description as at
									Uni page) & number or potential target from alliance

	31-Dec-2005		1.11p			First public version running with the new evo UI
									and for FireFox 1.5 only with Greasemonkey 0.6.4

	===============================================================================
*/

//configure
var enableExtraDataOnUserPanel = true;
var enableScoreColors = true;
var enableExtraDataOnFleetsPage = true;
var enableExtraDataOnNewsPage = true;
var enableOrderingAddOns = true;

var scriptversionID = 'evo+';

var UT_NATURAL = 0;
var UT_ENG     = 1;

function evoUnit(unitName, unitType, metal, mineral, attack, defence)
{
	this.unitName = unitName;
	this.unitType = unitType;
	this.metal = metal;
	this.mineral = mineral;
	this.attack = attack;
	this.defence = defence;
	return this;
}

var units = new Array();
units['monkey']           = new evoUnit('Monkey'           , UT_NATURAL, 500    ,250  , 4  , 4 );
units['sheep']            = new evoUnit('Sheep'            , UT_NATURAL, 3000   ,1500 , 13 , 9 );
units['horse']            = new evoUnit('Horse'            , UT_NATURAL, 4000   ,2000 , 15 , 10);
units['cow']              = new evoUnit('Cow'              , UT_NATURAL, 4500   ,2500 , 16 , 8 );
units['fox']              = new evoUnit('Fox'              , UT_NATURAL, 10000  ,4000 , 25 , 23);
units['hyena']            = new evoUnit('Hyena'            , UT_NATURAL, 11000  ,4500 , 28 , 26);
units['wolf']             = new evoUnit('Wolf'             , UT_NATURAL, 12000  ,5000 , 30 , 25);
units['python']           = new evoUnit('Python'           , UT_NATURAL, 18000  ,7500 , 45 , 35);
units['ostrich']          = new evoUnit('Ostrich'          , UT_NATURAL, 19000  ,8000 , 48 , 37);
units['kangaroo']         = new evoUnit('Kangaroo'         , UT_NATURAL, 28000  ,14000, 55 , 55);
units['lynx']             = new evoUnit('Lynx'             , UT_NATURAL, 20000  ,9000 , 50 , 38);
units['puma']             = new evoUnit('Puma'             , UT_NATURAL, 20000  ,8000 , 45 , 40);
units['lion']             = new evoUnit('Lion'             , UT_NATURAL, 20000  ,9000 , 42 , 45);
units['panther']          = new evoUnit('Panther'          , UT_NATURAL, 25000  ,12500, 30 , 60);
units['bear']             = new evoUnit('Bear'             , UT_NATURAL, 30000  ,15000, 60 , 50);
units['cheetah']          = new evoUnit('Cheetah'          , UT_NATURAL, 25000  ,12500, 60 , 25);
units['walrus']           = new evoUnit('Walrus'           , UT_NATURAL, 44000  ,22000, 70 , 50);
units['tiger']            = new evoUnit('Tiger'            , UT_NATURAL, 30000  ,15000, 55 , 55);
units['rhino']            = new evoUnit('Rhino'            , UT_NATURAL, 60000  ,36000, 80 , 40);
units['elephant']         = new evoUnit('Elephant'         , UT_NATURAL, 52000  ,26000, 75 , 55);
units['centaur']          = new evoUnit('Centaur'          , UT_ENG    , 5000   ,2500 , 25 , 20);
units['unicorn']          = new evoUnit('Unicorn'          , UT_ENG    , 12000  ,6000 , 40 , 30);
units['minotaur']         = new evoUnit('Minotaur'         , UT_ENG    , 50000  ,25000, 65 , 50);
units['gryphon']          = new evoUnit('Gryphon'          , UT_ENG    , 28000  ,14000, 55 , 40);
units['dragon']           = new evoUnit('Dragon'           , UT_ENG    , 100000 ,50000, 85 , 65);
units['fire sprite']      = new evoUnit('Fire Sprite'      , UT_ENG    , 6000   ,3000 , 35 , 17);
units['salamander']       = new evoUnit('Salamander'       , UT_ENG    , 15000  ,7500 , 56 , 26);
units['phoenix']          = new evoUnit('Phoenix'          , UT_ENG    , 36000  ,18000, 77 , 35);
units['wyvern']           = new evoUnit('Wyvern'           , UT_ENG    , 64000  ,32000, 91 , 45);
units['demon']            = new evoUnit('Demon'            , UT_ENG    , 140000 ,70000, 119, 59);
units['dyrad']            = new evoUnit('Dyrad'            , UT_ENG    , 4000   ,3750 , 28 , 22);
units['baskilisk']        = new evoUnit('Baskilisk'        , UT_ENG    , 12000  ,9000 , 44 , 33);
units['medusa']           = new evoUnit('Medusa'           , UT_ENG    , 30000  ,22500, 61 , 44);
units['cockatrice']       = new evoUnit('Cockatrice'       , UT_ENG    , 50000  ,37500, 71 , 55);
units['werewolf']         = new evoUnit('Werewolf'         , UT_ENG    , 100000 ,75000, 85 , 65);
units['avimimus']         = new evoUnit('Avimimus'         , UT_ENG    , 4000   ,2000 , 23 , 18);
units['therizinsaurus']   = new evoUnit('Therizinsaurus'   , UT_ENG    , 9600   ,4800 , 36 , 28);
units['styracosaurus']    = new evoUnit('Styracosaurus'    , UT_ENG    , 22400  ,11200, 50 , 35);
units['carnotaurus']      = new evoUnit('Carnotaurus'      , UT_ENG    , 40000  ,20000, 58 , 45);
units['giganotosaurus']   = new evoUnit('Giganotosaurus'   , UT_ENG    , 80000  ,40000, 77 , 58);
units['scarab beetle']    = new evoUnit('Scarab Beetle'    , UT_ENG    , 6500   ,3250 , 30 , 26);
units['mummy']            = new evoUnit('Mummy'            , UT_ENG    , 16000  ,8000 , 52 , 39);
units['sta']              = new evoUnit('Sta'              , UT_ENG    , 38000  ,19000, 75 , 52);
units['sphinx']           = new evoUnit('Sphinx'           , UT_ENG    , 70000  ,35000, 83 , 65);
units['anubis incarnate'] = new evoUnit('Anubis Incarnate' , UT_ENG    , 180000 ,90000, 110, 83);

units['fort']             = new evoUnit('Fort'             , UT_NATURAL, 2000   ,1000  , 25, 40);
units['satellite']        = new evoUnit('Satellite'        , UT_NATURAL, 8000   ,4000  , 30, 35);
units['nanowire wall']    = new evoUnit('Nanowire wall'    , UT_NATURAL, 12000  ,4500  , 65, 65);
units['satellite mark 2'] = new evoUnit('Satellite Mark 2' , UT_NATURAL, 8000   ,4000  , 35, 45);

units['wave reflector']   = new evoUnit('Wave Reflector'   , UT_NATURAL, 2000   ,2000);

units['biochemical missile']     = new evoUnit('Biochemical Missile'    , UT_NATURAL, 10000 , 20000);
units['nanovirus missile']       = new evoUnit('Nanovirus Missile'      , UT_NATURAL, 30000 , 15000);
units['bombs']                   = new evoUnit('Bombs'                  , UT_NATURAL, 11000 , 7000 );
units['neural reorganiser bomb'] = new evoUnit('Neural Reorganiser Bomb', UT_NATURAL, 50000 , 32000);
units['poison bombs']            = new evoUnit('Poison Bombs'           , UT_NATURAL, 16000 , 12000);


units['land scan']        = new evoUnit('Land Scan'        , UT_NATURAL, 1000   , 2000);
units['scan amplifier']   = new evoUnit('Scan Amplifier'   , UT_NATURAL, 1000   , 1000);
units['sector scan']      = new evoUnit('Sector Scan'      , UT_NATURAL, 2000   , 4000);
units['creature scan']    = new evoUnit('Creature Scan'    , UT_NATURAL, 3000   , 6000);
units['r&d scan']         = new evoUnit('R&D Scan'         , UT_NATURAL, 2000   , 3000);
units['news scan']        = new evoUnit('News Scan'        , UT_NATURAL, 10000  , 20000);
units['military scan']    = new evoUnit('Military Scan'    , UT_NATURAL, 6000   , 12000);
units['microwave pulse']  = new evoUnit('Microwave Pulse'  , UT_NATURAL, 520000 , 1040000);
units['overload pulse']   = new evoUnit('Overload Pulse'   , UT_NATURAL, 1600000, 3200000);

function getXPathSnapshotItem(xpath, snapshotType, index){
    var items = document.evaluate(xpath, document, null, snapshotType, null);
    return index > items.snapshotLength - 1 ? null : items.snapshotItem(index);
}

function evoFindCreateTable(s) {
    return getXPathSnapshotItem("//table/tbody/tr/td[contains(text(), 'You have')]/../../..", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, s);
}

function evoFindHelpTable() {
    return getXPathSnapshotItem("//table/tbody/tr/td[contains(text(), 'Key')]/../../..", XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 0);
}

function evoUniRun(trick,smin,tmax)
{
    if (!enableScoreColors) return;
	for(var i=2; i < trick.rows.length; i++) {
	    //var userPofileId = getUserProfileId(trick.rows[i]);
	    var cell3 = trick.rows[i].cells[3];
		var g = cell3.innerHTML;
		var g2 = evoFormatNumber2(g);
		if(g2 < smin ){cell3.style.color = "#CC4411";};
		if(g2 > tmax ){cell3.style.color ="#0000FF";};
		if(g2 <= tmax && g2 >= smin ){cell3.style.color = "#00FF00";};
	}

	var git = evoFindHelpTable();
	var d=git.insertRow(1);
	d.className = "lightblue_bg_row2";
	d.innerHTML = '<td>Text colours:</td><td colspan="3" align="center"><font color="#FFFFFF">White</font> name of continent shows that this person is online<BR><font color="#C4C4C4">Gray</font> name of continent shows that this person is offline<BR><font color="#646464">Dark gray</font> name shows that person is offline from more than week</td>';
	git.appendChild(d);

	var c=git.insertRow(1);
	c.className = "lightblue_bg_row1";
	c.innerHTML = '<td>Score colours:</td><td colspan="3" align="center">Player with that <font color="#CC4411">score</font> can attack you, but you can\'t<BR>Player with that <font color="#00FF00">score</font> can attack you, and you can also attack him<BR>Player with that <font color="#0000FF">score</font> can\'t attack you, but you can :D</td>';
	git.appendChild(c);
}

var evoRegX2 = /^(\d+)(\d{3})/g; /*To format a number*/

function evoFormatNumber(num){
  num = String(num);
	while(evoRegX2.test(num))
		num = num.replace(evoRegX2, '$1,$2');
	return num;
}

function evoFormatNumber2(num){
    return Number(num.replace(/,/g, ""));
}

var origMetal = 0, origMineral = 0, origFood = 0; //players resources
function evoResources() {
	var pt1 = document.getElementById("openpanel");
	var st1 = pt1.textContent;
	var idx1 = st1.indexOf('Metal:') + 7;
	st1 = st1.substring(idx1);
	idx1 = st1.indexOf(' ');
	var strme = st1.substring(0, idx1);
	origMetal = evoFormatNumber2(strme);

	idx1 = st1.indexOf('Mineral') + 9;
	st1 = st1.substring(idx1);
	idx1 = st1.indexOf(' ');
	var strmi = st1.substring(0, idx1);
	origMineral = evoFormatNumber2(strmi);

	idx1 = st1.indexOf('Food') + 6;
	st1 = st1.substring(idx1);
	idx1 = st1.indexOf(' ');
	var strf = st1.substring(0, idx1);
	origFood = evoFormatNumber2(strf);
}

function evoCreate(pi1) {
    var table = evoFindCreateTable(pi1);
	if(table == null) return;
	updateAvailableUnits(table);

	// hook up a confirmation dialog on the form
    var youSure = function(e) {
        if(! confirm('Are you sure to produce these items/creatures?'))
            e.preventDefault();
    }
    var daForm = table.getElementsByTagName('FORM')[0];
    daForm.addEventListener('submit', youSure, false);
}


function createData(unit, input, isTooMuch){
    this.unit = unit;
    this.input = input;
    this.isTooMuch = isTooMuch;
}

/*
    first pass
        - gather all necessary data for second pass
        - adjust metal/mineral amount
    second pass
        - ui logic
*/

var tmpMetal, tmpMineral, tmpFood;
function updateAvailableUnits(table){
    var onBlur = function(){ updateAvailableUnits(table); };
    tmpMetal = origMetal;
    tmpMineral = origMineral;
    tmpFood = origFood;
    var rows = table.rows;
    var createDataArray = new Array();
    var row, unit, input, unitsToOrder, maxUnitsAvailable, span, html;
	for(var i = 2; i < (rows.length - 1); i++){
	    row = rows[i];
        unit = row.cells[1].getElementsByTagName('SPAN')[0].textContent.toLowerCase();
        unit = units[unit];

        input = row.cells[3].getElementsByTagName('INPUT')[0];
        unitsToOrder = input.value == '' ? 0 : parseInt(input.value);
        maxUnitsAvailable = getMaxUnits(unit);

        createDataArray[i] = new createData(unit, input, unitsToOrder > maxUnitsAvailable);
        if (!createDataArray[i].isTooMuch){
            tmpMetal -= unitsToOrder * unit.metal
            tmpMetal = Math.max(tmpMetal, 0);
            tmpMineral -= unitsToOrder * unit.mineral
            tmpMineral = Math.max(tmpMineral, 0);
        }
	}
	for(var i = 2; i < (rows.length - 1); i++){
	    row = rows[i];
        maxUnitsAvailable = getMaxUnits(createDataArray[i].unit);

        html = "";
        if (createDataArray[i].isTooMuch)
            html += '<br/><font color="#ff4400">TOO MUCH!!!</font>';

        input = createDataArray[i].input;
        unitsToOrder = input.value == '' ? 0 : parseInt(input.value);
        html += '<br/>max: ' + (createDataArray[i].isTooMuch ? maxUnitsAvailable : (maxUnitsAvailable + unitsToOrder));

        span = row.cells[3].getElementsByTagName('SPAN');
        if (span.length > 0){
            span = span[0];
        } else {
            span = document.createElement('SPAN');
            row.cells[3].appendChild(span);
            input.addEventListener('blur', onBlur, false);
        }
        span.innerHTML = html;
	}
}

function getMaxUnits(unit){
    var maxUnitMetal = Math.floor(tmpMetal / unit.metal);
    var maxUnitMineral = Math.floor(tmpMineral / unit.mineral);
    return Math.min(maxUnitMetal, maxUnitMineral);
}

function boo(score)
{
	var smin = 0;
	var smax = 0;
	var tmin = 0;
	var tmax = 0;
	var sscore = 0;

	sscore = evoFormatNumber2(score);

	smin = Math.floor(sscore * 0.35);
	var smin2 = evoFormatNumber(smin);
	smin2 = String(smin2);
	tmax = Math.floor(sscore / 0.35);
	var tmax2 = evoFormatNumber(tmax);
	tmax2 = String(tmax2);
	if(location.href.toLowerCase().substring(0,44) == 'http://ev5.neondragon.net/alliances/members/') {
	    if (enableScoreColors){
	        var node = getXPathSnapshotItem("//text()[contains(., 'Ruler of Continent Name')]", XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 0);
          var nbr = 0;
          var sums1 = 0;
          if(node == null)alert('brak');
          var tab = node.parentNode.parentNode.parentNode;
          for(var i=1; i < tab.rows.length;i++) {
              var cell2 = tab.rows[i].cells[2];
              var str = cell2.innerHTML;
              var g2 =  evoFormatNumber2(str);
              sums1 = sums1 + g2;
              if(g2 < smin ){cell2.style.color = "#CC4411";};
              if(g2 > tmax ){cell2.style.color ="#0000FF"; nbr++;};
              if(g2 <= tmax && g2 >= smin ){cell2.style.color = "#00FF00"; nbr++;};
          }
          var g3=evoFormatNumber(sums1);
          tab.rows[0].cells[2].innerHTML = tab.rows[0].cells[2].innerHTML +'<font color="#00FF00"> '+ g3 + '</font><BR>Targets for me: <font color="#00FF00">' + nbr + '</font>';
      }
	}

	var trick = document.getElementById('cont_list');
	if( trick != null ) evoUniRun(trick,smin,tmax);

	if (enableExtraDataOnUserPanel){
    var content = document.getElementById('content');
    if(content == null) return;

    var maintd = content.parentNode;
    var c = document.createElement('DIV');
    c.style.textAlign="right";
    c.style.marginRight="5px";
    c.style.marginTop="3px";
    c.style.marginBottom="3px";

    addItemToContent(c, 'Min. TargetScore: ', 't_normal b', smin2, true);
    addItemToContent(c, 'Max. AttackerScore: ', 't_normal b', tmax2, false);

    maintd.insertBefore(c, content);
  }

	var span5 = document.createElement('DIV');
	span5.style.color = "#6A9C01";
	span5.style.fontSize = "8pt"; span5.style.fontWeight = "bold";
	span5.style.paddingLeft = "3px"; span5.style.paddingTop = "3px";
	span5.style.position = "absolute";
	span5.innerHTML = scriptversionID;
	var ui = document.getElementById('userinfo');
	ui.parentNode.insertBefore(span5, ui);
}

function addItemToContent(c, text, className, html, isLastItem){
    c.appendChild(document.createTextNode(text));
    var span = document.createElement('SPAN');
    span.className = className;
    if (isLastItem)
        html += "&nbsp;|&nbsp;";
    span.innerHTML = html;
    c.appendChild(span);
}

function updateFleets(){
    var h2 = document.evaluate("//h2", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
    var fleetsTable = h2.singleNodeValue.nextSibling;

    updateFleetsAddRow(fleetsTable, true);
    updateFleetsAddRow(fleetsTable, false);
}

var maxBoosts = new Array();
maxBoosts[UT_ENG]     = 33.126875; //max boost for eng
maxBoosts[UT_NATURAL] = 39.46625;  //max boost for natural

function updateFleetsAddRow(fleetsTable, isAttack){
  var row = fleetsTable.insertRow(fleetsTable.rows.length - 2);
  updateFleetsAddCell(row, 0, "alt1 b", (isAttack ? "Attack" : "Defence") + "<br/>max boosts");
  updateFleetsAddCell(row, 1, "red_bg", getFleetScore(1, fleetsTable, isAttack));
  updateFleetsAddCell(row, 2, "yellow_bg", getFleetScore(2, fleetsTable, isAttack));
  updateFleetsAddCell(row, 3, "green_bg", getFleetScore(3, fleetsTable, isAttack));
}

function updateFleetsAddCell(row, cellIndex, className, cellHtml){
  var cell = addCell(row, cellIndex,
                     new Array(new Array("class", className),
                               new Array("align", "center"),
                               new Array("colspan", "2")),
                     cellHtml);
  if (cellIndex > 0)
    cell.style.fontSize = "15px";
}

function addCell(row, cellIndex, attributes, html){
  var cell = row.insertCell(cellIndex);
  if (attributes)
    for (var i = 0; i < attributes.length; i++)
      cell.setAttribute(attributes[i][0], attributes[i][1]);

  if (html) cell.innerHTML = html;
  return cell;
}

function getFleetScore(fleetNo, table, isAttack){
    var rows = table.rows;
    var cell, fleetCell;
    var links;
    var unit;
    var quantity;
    var i, total = 0, baseScore, boost, noBoostScore = 0, maxBoostScore = 0;
    for (i = 1; i < rows.length; i++){
        cell = rows[i].cells[0];
        links = cell.getElementsByTagName("a");
        if (links.length == 0) break;
        unit = links[0].innerHTML.toLowerCase();
        unit = units[unit];
        fleetCell = rows[i].cells[fleetNo * 2 + 1];
        quantity = fleetCell.getElementsByTagName("span")[0].innerHTML;
        if (quantity.length > 0)
          total += parseInt(quantity);
        baseScore = isAttack ? calcAttack(unit, quantity, 0) : calcDefence(unit, quantity, 0);
        noBoostScore += baseScore;
        boost = (100 + maxBoosts[unit.unitType]) / 100;
        maxBoostScore += baseScore * boost * boost;
    }
    var totalRow;
    var cell;
    if (fleetNo == 1 && isAttack){
      totalRow = table.insertRow(i);
      addCell(totalRow, 0, new Array(new Array("class", "alt1 b")), "totals")
      addCell(totalRow, 1, new Array(new Array("class", "alt2"), new Array("colspan", "2")))
    } else
      totalRow = rows[i];
    if (isAttack){
      var cn = fleetNo == 1 ? "red_bg" :
               fleetNo == 2 ? "yellow_bg" :
               fleetNo == 3 ? "green_bg" : "alt2";
      cell = addCell(totalRow, fleetNo + 1,
                     new Array(new Array("class", cn),
                               new Array("colspan", "2"),
                               new Array("align", "center")), total);
      cell.style.fontSize = "15px";
    }
    rows[i + 2].cells[0].setAttribute("rowspan", "12");
    return Math.round(maxBoostScore);
}

function updateOpenScans(){
    var strong = document.evaluate("//div[@class='helpmessage']/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (!strong.singleNodeValue) return;
    var scan = strong.singleNodeValue.textContent;
    var table = getXPathSnapshotItem("//div[@class='helpmessage']/table", XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 0);
    if (scan.indexOf("Sector Scan of") != -1){
        var defenceData = new Array(
            new Array(8 , 'fort'),
            new Array(9 , 'satellite mark 2'),
            new Array(10, 'nanowire wall')
        );
        var overallAttack = 0, overallDefence = 0;
        for (var i = 0; i < defenceData.length; i++){
            var row = getXPathSnapshotItem("//div[@class='helpmessage']/table/tbody/tr[" + defenceData[i][0] + "]", XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 0);
            if (!row) continue;
            var cells = row.cells;
            cells[2].innerHTML = cells[2].innerHTML + "&nbsp;(att/def)";
            var nDef = parseInt(cells[3].innerHTML);
            if (isNaN(nDef))
                continue;
            var unit = units[defenceData[i][1]];
            var attack = calcAttack(unit, nDef, 0);
            var defence = calcDefence(unit, nDef, 0);
            overallAttack += attack;
            overallDefence += defence;
            cells[3].innerHTML = cells[3].innerHTML + "&nbsp;(" + attack + "/" + defence + ")";
        }
        var row = table.insertRow(10);
        var newCell = addCell(row, 0, new Array(new Array("colspan", "2")));
        newCell = addCell(row, 1, new Array(new Array("class", "alt1 b")), "Overall att/def");
        newCell = addCell(row, 2, null, overallAttack + "/" + overallDefence);
    } else if (scan.indexOf("Creature Scan of") != -1){
        var rows = table.rows;
        var row, cells, cell, unit, quantity, boost;
        var attack, defence, overallAttack = 0, overallDefence = 0;
        for (var i = 2; i < rows.length; i++){
            row = rows[i];
            cells = row.cells;
            for (var j = 0; j < cells.length; j = j + 2){
                unit = units[cells[j].innerHTML.toLowerCase()];
                cell = cells[j + 1];
                quantity = parseInt(cell.innerHTML);
                boost = maxBoosts[unit.unitType];
                attack = calcAttack(unit, quantity, boost);
                defence = calcDefence(unit, quantity, boost);
                overallAttack += attack;
                overallDefence += defence;
                cell.innerHTML = cell.innerHTML + "&nbsp;(" + attack + "/" + defence + ")";
            }
        }
        var newRow = table.insertRow(rows.length);
        var newCell = addCell(newRow, 0, new Array(new Array("class", "alt1 b")), "Overall att/def");
        newCell = addCell(newRow, 1, null, overallAttack + "/" + overallDefence);
    }
}

function calcAttack(unit, quantity, boost){
    var b = (100 + boost) / 100;
    return Math.round(unit.attack * unit.attack * b * b * quantity);
}

function calcDefence(unit, quantity, boost){
    var b = (100 + boost) / 100;
    return Math.round(unit.defence * unit.defence * b * b * quantity * 1.4);
}

function updateNews(){
  var battleReports = document.evaluate("//table/tbody/tr/td[contains(text(), 'Battle Report')]/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var battleReport;
  var rows, html, html2, html3, attDefRow, isAttacker, att, myAtt, def, myDef, idx, idx2,
      unit, quantity, boost, summaryRow, cell, j,
      landType, land, totalLand, myLand, totalMyLand, expectedLand, defLand, totalDefLand;
  var ruler = getXPathSnapshotItem("//p[@id='openpanel']/strong", XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 0).textContent;
  var attPrefixRegex = /.*att<sup>2<\/sup>:\s*/;
  var attSuffixRegex = /<br.*/;
  var defPrefixRegex = /.*def<sup>2<\/sup>:\s*/;
  for (var i = 0; i < battleReports.snapshotLength; i++){
    battleReport = battleReports.snapshotItem(i);
    battleReport = battleReport.nextSibling;
    battleReport = battleReport.firstChild.firstChild;
    rows = battleReport.rows;
    attDefRow = rows[0];
    isAttacker = attDefRow.cells[1].textContent.toLowerCase().indexOf(ruler.toLowerCase()) != -1;
    idx = isAttacker ? 1 : 2;
    att = attDefRow.cells[idx].innerHTML.replace(attPrefixRegex, "").replace(attSuffixRegex, "");
    att = parseInt(att ? att : 0);
    expectedLand = att / 300000;
    def = attDefRow.cells[idx].innerHTML.replace(defPrefixRegex, "");
    def = parseInt(def ? def : 0);
    myAtt = 0;
    myDef = 0;
    idx2 = isAttacker ? 1 : 6;
    for (j = 3; j < rows.length; j++){
      unit = units[rows[j].cells[0].innerHTML.toLowerCase()];
      if (!unit) break;
      idx = rows[j].cells[idx2].innerHTML.indexOf("<br>");
      quantity = parseInt(rows[j].cells[idx2].innerHTML.substring(idx + 4));
      boost = maxBoosts[unit.unitType];
      myAtt += calcAttack(unit, quantity, boost);
      myDef += calcDefence(unit, quantity, boost);
    }
    summaryRow = battleReport.insertRow(rows.length);
    cell = addCell(summaryRow, 0, new Array(new Array("colSpan", "11"), new Array("height", "3")));

    summaryRow = battleReport.insertRow(rows.length);
    cell = addCell(summaryRow, 0, new Array(new Array("class", "alt1 b")), "Summary");

    html = "Att: " + myAtt + " / <b>" + att + "</b> (" + parseInt(100 * myAtt / att) + "%)<br/>" +
           "Def: " + myDef + " / <b>" + def + "</b> (" + parseInt(100 * myDef / def) + "%)";
    if (isAttacker){
      cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "3")), html);
      html = html2 = html3 = "";
      for (; j < rows.length - 2; j++){
        if (rows[j].cells[0].innerHTML.indexOf("Land Capture") != -1){
          j++;
          break;
        }
      }
      totalMyLand = totalLand = 0;
      for (; j < rows.length - 2; j++){
        landType = rows[j].cells[0].innerHTML;
        land = rows[j].cells[2].firstChild.innerHTML;
        totalLand += parseInt(land);
        myLand = rows[j].cells[2].innerHTML.replace(/.*<br>/, "");
        totalMyLand += parseInt(myLand);
        defLand = rows[j].cells[4].innerHTML

        landType = landType.toLowerCase().indexOf("metal") != -1 ? "<img src='http://images.neondragon.net/ev5/resources/metal.png' />" :
        landType.toLowerCase().indexOf("mineral") != -1 ? '<img src="http://images.neondragon.net/ev5/resources/mineral.png" />' :
        landType.toLowerCase().indexOf("food") != -1 ? '<img src="http://images.neondragon.net/ev5/resources/food.png" />' : 'un'
        html += landType + ": " + myLand + " / <b>" + land + "</b> (" + parseInt(100 * myLand / land) + "%)<br/>";
        html3 += landType + ": " + land + " / <b>" + defLand  + "</b> (" + parseInt(100 * land / defLand) + "%)<br/>";
      }
      html2 = "total: " + totalMyLand + " / <b>" + totalLand + "</b> (" + parseInt(100 * totalMyLand / totalLand) + "%)<br/><br/>" +
      "Expected land: <b>" + Math.round(expectedLand) + "</b>";
      cell = addCell(summaryRow, 2, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "2")), html);
      cell = addCell(summaryRow, 3, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "3")), html2);
      cell = addCell(summaryRow, 4, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "2")), html3);
    } /*else {
      cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "5")));
      cell = addCell(summaryRow, 2, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "2")), html);
      cell = addCell(summaryRow, 3, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "3")));
    }   */
  }
}

function updateInventory(){
  var v = getXPathSnapshotItem("//div[contains(text(), 'Items')]", XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 0);
  var table = v.nextSibling;
  var row = table.insertRow(table.rows.length);
  var cell = addCell(row, 0, new Array(new Array("class", "row2")));
  var innerTable = document.createElement('table');
  cell.appendChild(innerTable);
  innerTable.className = "t_little";
  innerTable.border = "0";
  innerTable.cellspacing = "0";
  innerTable.cellpadding = "0";
  innerTable.width = "100%";
  row = innerTable.insertRow(0);
  var cell = addCell(row, 0, new Array(new Array("height", "60"),
                                       new Array("width", "60"),
                                       new Array("rowspan", "3"),
                                       new Array("valign", "top")));
  var a = document.createElement('a');
  cell.appendChild(a);
  a.href = "#";
  var img = document.createElement('img');
  a.appendChild(img);
  img.border = "0";
  img.width = "50";
  img.height = "50";
  img.src = "http://www.stylephreak.com/uploads/evo/pantsofhos.gif";
  cell = addCell(row, 1, new Array(new Array("class", "b yellow_bg"),
                                       new Array("colspan", "2"),
                                       new Array("height", "13")));
  var span = document.createElement('span');
  cell.appendChild(span);
  span.className = "t_normal";
  a = document.createElement('a');
  span.appendChild(a);
  a.href = "#";
  a.innerHTML = "Hos Pants";

  row = innerTable.insertRow(1);
  cell = addCell(row, 0, new Array(new Array("valign", "top"),
                                   new Array("width", "50")));
  span = document.createElement('span');
  cell.appendChild(span);
  span.className = "t_enormous";
  span.innerHTML = "1";
  cell = addCell(row, 1, new Array(new Array("valign", "top")),
  "\"He who weareth the pants, shall know no peace\"<br/>Cannot be given away. Will cause your alcohol<br/>supply to dissipate rapidly. Only by being<br/>attacked by enemy forces may you rid yourself<br/>of the Cursed Pants of Hos.");

  cell = addCell(row, 2, new Array(new Array("colspan", "2"), new Array("align", "right")));
}

function updateOverview(){
  var items = new Array("Creatures", "Defense Systems");
  var table, rows, row, cells, unit, quantity, boost,
      attack, defence, totalAttack = 0, totalDefence = 0;
  for (var k = 0; k < items.length; k++){
    table = getXPathSnapshotItem("//div[contains(text(), '" + items[k] + "')]/following-sibling::*/descendant::table", XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 0);
    rows = table.rows;
    attack = 0;
    defence = 0;
    for (var i = 0; i < rows.length; i++){
      row = rows[i];
      cells = row.cells;
      for (var j = 0; j < cells.length; j = j + 2){
        unit = units[cells[j].textContent.toLowerCase()];
        quantity = parseInt(cells[j + 1].textContent);
        boost = maxBoosts[unit.unitType];
        attack += calcAttack(unit, quantity, boost);
        defence += calcDefence(unit, quantity, boost);
      }
    }
    totalAttack += attack;
    totalDefence += defence;

    row = table.insertRow(rows.length);
    addCell(row, 0, new Array(new Array("height", "5")));

    row = table.insertRow(rows.length);
    addCell(row, 0, new Array(new Array("colspan", "2"), new Array("class", "row1 b")), items[k] + " att/def: ");
    addCell(row, 1, new Array(new Array("colspan", "2"), new Array("class", "row1 b")), attack + " / " + defence);
  }

  row = table.insertRow(rows.length);
  addCell(row, 0, new Array(new Array("height", "15")));

  row = table.insertRow(rows.length)
  addCell(row, 0, new Array(new Array("colspan", "4"), new Array("class", "row1 b")), "Total att/def: " + totalAttack + " / " + totalDefence);
}

(function () {
	evoResources();
  var score = '';
	var match;

	nodes = document.evaluate("//p[@id='openpanel']/strong[6]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if( node = nodes.snapshotItem(0) ) score = node.textContent;

	var loc = location.href.toLowerCase();
  if( loc == 'http://ev5.neondragon.net/create' && enableOrderingAddOns) {
    evoCreate(0);
		evoCreate(1);
		evoCreate(2);
  } else if( loc == 'http://ev5.neondragon.net/scans' && enableOrderingAddOns) {
    evoCreate(0);
    updateOpenScans();
  } else if( loc == 'http://ev5.neondragon.net/fleets' && enableExtraDataOnFleetsPage) {
    updateFleets();
  } else if( loc == 'http://ev5.neondragon.net/news' && enableExtraDataOnNewsPage) {
    updateNews();
  } else if( loc == 'http://ev5.neondragon.net/inventory') {
    updateInventory();
  } else if( loc == 'http://ev5.neondragon.net/overview') {
    updateOverview();
  }

  boo(score);
})();