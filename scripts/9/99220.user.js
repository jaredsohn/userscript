// ==UserScript==
// @name           Ikariam Military Perks
// @namespace      imp
// @description    Adds troop and ship upkeep and count details to military advisor screen.  Displays true upkeep in Barracks and Shipyard, and adds Generals Score per unit.  Requires visit to finances screen to set upkeep discounts.  Still under development.
// @require        http://userscripts.org/scripts/source/68732.user.js
// @include        http://*.ikariam.*/*
// ==/UserScript==

/*  

    Authors Note:
    
    68732.user.js is a personal library of mine which contains no links to other external 
    libraries. I keep it separate due to having multiple scripts for this game, it also makes 
    things a little easier should you wish to customize this script in any way.  
    
*/

// [  Do not edit this section unless in game upkeep amounts change  ]
upkeep_base = {
  'Trade Ships'   : 0,
  'Hoplite'       : 3,  'Steam Giant'        : 12,
  'Spearmen'      : 1,  'Swordsman'          : 4,
  'Slinger'       : 2,  'Archer'             : 4,  'Sulphur Carabineers' : 3,
  'Battering ram' : 15, 'Catapult'           : 25, 'Mortar'              : 30,
  'Gyrocopter'    : 15, 'Balloon-Bombardier' : 45,
  'Cook'          : 10, 'Doctor'             : 20,
  
  'Ram Ship'      : 40, 'Fire Ship'          : 30, 'Paddle-Wheel-Ram'    : 90,
  'Ballista ship' : 45, 'Catapult Ship'      : 50, 'Mortar Ship'         : 130,
  'Diving boat'   : 70
};

resource_base = {
  'Trade Ships'   : 0,
  'Hoplite'       : 70,  'Steam Giant'        : 180,
  'Spearmen'      : 30,  'Swordsman'          : 60,
  'Slinger'       : 20,  'Archer'             : 55,  'Sulphur Carabineers' : 200,
  'Battering Ram' : 220, 'Catapult'           : 560, 'Mortar'              : 1550,
  'Gyrocopter'    : 125, 'Balloon-Bombardier' : 290,
  'Cook'          : 200, 'Doctor'             : 500,
  
  'Ram Ship'      : 270, 'Fire Ship'          : 310, 'Paddle-Wheel-Ram'    : 1800,
  'Ballista ship' : 340, 'Catapult Ship'      : 330, 'Mortar Ship'         : 1120,
  'Diving boat'   : 910
};


if ((window.location+"").match("view=militaryAdvisorMilitaryMovements") || (window.location+"").match("oldView=militaryAdvisorMilitaryMovements&actionRequest")) {
  rows = C_API.xpath("//div[@id='fleetMovements']//table[@class='locationEvents']//tr");
  troop_costs = 0.0;
  fleet_costs = 0.0;
  total_troops = 0;
  total_fleet = 0;
  details = {'troops' : {}, 'fleet' : {}};
  for (i=1; i< rows.snapshotLength; i++) {
    row = rows.snapshotItem(i);
    d = row.getElementsByTagName("td");
    troop_discount = C_API.get('troop_discount', 0);
    fleet_discount = C_API.get('fleet_discount', 0);
    row_action  = d[5].title;
    row_content = d[2];
    if (row_action.toLowerCase().match("station") || row_action.toLowerCase().match("pillage") || row_action.toLowerCase().match("occupy")  || row_action.toLowerCase().match("block")   || row_action.toLowerCase().match("defend")) {
      infos = d[2].getElementsByTagName("div");
      for (n=1; n< infos.length-1; n++) {
        t = infos[n].title;
        c = infos[n].textContent;
        if (t.length > 1) {
          if (t in upkeep_base) {
            if (t.match("ship") || t.match("Ship") || t.match("boat") || t.match("Wheel")) {
              price = (c * (upkeep_base[t] - (upkeep_base[t]*(fleet_discount/100))));
              price = price.toFixed(2);
              fleet_costs += price*1;
              if (price > 0) { total_fleet += c*1; }
              if (t in details['fleet']) { details['fleet'][t] += c*1; }
              else { details['fleet'][t] = c*1; }
            } else {
              price = (c * (upkeep_base[t] - (upkeep_base[t]*(troop_discount/100))));
              price = price.toFixed(2);
              troop_costs += price*1;
              if (price > 0) { total_troops += c*1; }
              if (t in details['troops']) { details['troops'][t] += c*1; }
              else { details['troops'][t] = c*1; }
            }
          }
        }
      }
    }
  }
  if (troop_costs > 0 || fleet_costs > 0) {
    if (troop_discount == 0) { troop_discount_string = "Discount 0% or not set."; }
    else                     { troop_discount_string = troop_discount + "% Discount"; }
    if (fleet_discount == 0) { fleet_discount_string = "Discount 0% or not set."; }
    else                     { fleet_discount_string = fleet_discount + "% Discount"; }
  
    fleet_cb = document.getElementById("fleetMovements");
    fleet_cb.appendChild(document.createElement('br'));
    e = document.createElement("h3");
    fleet_cb.appendChild(e);
    e.setAttribute('class', 'header');
    e.innerHTML = "<span class='textLabel'>Military Mission Upkeep Summary</span>";
    d = document.createElement("div");
    fleet_cb.appendChild(d);
    d.setAttribute('class', 'content');
    d.innerHTML = "<table align='center' width='50%'>" +
                    "<tr><td>Troops Total Upkeep (" + troop_discount_string + ")</td><td>" + C_API.addSep(troop_costs.toFixed(0)) + "</td></tr>" + 
                    "<tr class='alt'><td>Fleets Total Upkeep (" + fleet_discount_string + ")</td><td>" + C_API.addSep(fleet_costs.toFixed(0)) + "</td></tr>" +
                    "<tr><td>Combined Total Upkeep</td><td>" + C_API.addSep((troop_costs+fleet_costs).toFixed(0)) + "</td></tr>" + 
                  "</table>";
    d = document.createElement("div");
    fleet_cb.appendChild(d);
    d.setAttribute('class', 'footer');

    fleet_cb.appendChild(document.createElement('br'));
    e = document.createElement("h3");
    fleet_cb.appendChild(e);
    e.setAttribute('class', 'header');
    e.innerHTML = "<span class='textLabel'>Military Mission Unit Summary</span>";

    d = document.createElement("div");
    fleet_cb.appendChild(d);
    d.setAttribute('class', 'content');
    iHTML = "";
    iHTML += "<table align='center'><tr style='background-color: rgb(250, 234, 198);'>";
    for (i in details['troops']) { 
      s = i;
      if (s == "Hoplite") s = "Hops";
      if (s == "Steam Giant") s = "SGs";
      if (s == "Spearmen") s = "Spears";
      if (s == "Swordsman") s = "Swords";
      if (s == "Slinger") s = "Sling";
      if (s == "Archer") s = "Archer";
      if (s == "Sulphur Carabineers") s = "Guns";
      if (s == "Battering ram") s = "Rams";
      if (s == "Catapult") s = "Cats";
      if (s == "Mortar") s = "Mortars";
      if (s == "Gyrocopter") s = "Gyros";
      if (s == "Balloon-Bombardier") s = "Bombs";
      if (s == "Cook") s = "Cooks";
      if (s == "Doctor") s = "Docs";
      iHTML += "<th align='center'>" + s + "</th>";  
    }
    iHTML += "</tr>";
    iHTML += "<tr>";
    dc = ['', "class='alt'"];
    for (i in details['troops']) { 
      iHTML += "<td align='center' " + dc[0] + ">" + C_API.addSep(details['troops'][i]) + "</td>";  
      dc.reverse();
    }
    iHTML += "</tr>";
  
    iHTML += "<table align='center'><tr style='background-color: rgb(250, 234, 198);'>";
    for (i in details['fleet']) { 
      s = i;
      if (s == "Trade Ships")      s = "Trades";
      if (s == "Ram Ship")         s = "Rams";
      if (s == "Fire Ship")        s = "Flames";
      if (s == "Paddle-Wheel-Ram") s = "PWRs";
      if (s == "Ballista ship")    s = "Ballistas";
      if (s == "Catapult Ship")    s = "Cats";
      if (s == "Mortar Ship")      s = "Mortars";
      if (s == "Diving boat")      s = "Subs";
      iHTML += "<th align='center'>" + s + "</th>";  
    }
    iHTML += "</tr>";
    iHTML += "<tr>";
    dc = ['', "class='alt'"];
    for (i in details['fleet']) { 
      iHTML += "<td align='center' " + dc[0] + ">" + C_API.addSep(details['fleet'][i]) + "</td>";
      dc.reverse();
    }
    iHTML += "</tr></table>";
    iHTML += "<table align='center'>" +
              "<tr><td align='right'><b>Total Units</b></td><td align='right'>" + C_API.addSep(total_troops) + "</td></tr>" + 
              "<tr class='alt'><td align='right'><b>Total Fleet</b></td><td align='right'>" + C_API.addSep(total_fleet) + "</td></tr></table>";
    d.innerHTML += iHTML;

    d = document.createElement("div");
    fleet_cb.appendChild(d);
    d.setAttribute('class', 'footer');
  }
} else if ((window.location+"").match("view=finances")) {
  d = C_API.xpath("//tr[@class='altbottomLine']//td[@class='reason']");
  troop_discount = /- Research \(([0-9]+)\%\)/.exec(d.snapshotItem(0).textContent);
  fleet_discount = /- Research \(([0-9]+)\%\)/.exec(d.snapshotItem(1).textContent);
  C_API.set('troop_discount', troop_discount[1]);
  C_API.set('fleet_discount', fleet_discount[1]);
} else if ((window.location+"").match("view=barracks")) {
  tr = C_API.get('troop_discount', 'ns');
  if (tr != 'ns') {
    nodes = C_API.xpath("//li[@class='upkeep']");
    for (i=0; i<nodes.snapshotLength; i++) {
      nodes.snapshotItem(i).firstChild.nextSibling.textContent = (nodes.snapshotItem(i).firstChild.nextSibling.textContent - (nodes.snapshotItem(i).firstChild.nextSibling.textContent * (tr/100))).toFixed(2);
    }
    
    nodes = C_API.xpath("//ul[@id='units']/li");
    for (i=0; i<nodes.snapshotLength; i++) {
      cUnit = nodes.snapshotItem(i);
      uName = cUnit.getElementsByTagName('h4')[0].textContent;
      d = document.createElement('div');
      d.innerHTML = "<b>Generals</b>: " + (resource_base[uName]/50).toFixed(2) + " (Ea.)";
      d.setAttribute("style", "height:0px; position:relative; top:2px; left:310px;");
      cUnit.insertBefore(d, cUnit.firstChild);
    }
    
    
  }
} else if ((window.location+"").match("view=shipyard")) {
  sr = C_API.get('fleet_discount', 'ns');
  if (sr != 'ns') {
    nodes = C_API.xpath("//li[@class='upkeep']");
    for (i=0; i<nodes.snapshotLength; i++) {
      nodes.snapshotItem(i).firstChild.nextSibling.textContent = (nodes.snapshotItem(i).firstChild.nextSibling.textContent - (nodes.snapshotItem(i).firstChild.nextSibling.textContent * (sr/100))).toFixed(2);
    }
  }
}