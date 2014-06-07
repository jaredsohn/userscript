// ==UserScript==
// @name           Hangar Summary
// @namespace      Hangar Summary by Arketypos
// @description    Adds Hangar Summary to Empire-->Fleets page
// @include        http://alpha.astroempires.com/empire.aspx?view=fleets
// @include        http://alpha.astroempires.com/empire.aspx?view=units
// @include        http://alpha.astroempires.com/base.aspx?*&view=production
// ==/UserScript==

// screenshot of units page http://i.imgur.com/ASNI1.png

var location = window.location.href;

var hangar_space_no_cap = 0
var hangar_space_cap = 0
var hangar_space_used = 0

var units = []
var unit_hanger = []

// FT = 2
// BO = 3
// HB = 4
// IB = 5
// CV = 6
// RC = 7
// DE = 8
// FR = 9
// IF = 10
// SS = 11
// OS = 12
// CR = 13
// CA = 14
// HC = 15
// BS = 16
// FC = 17
// DN = 18
// TI = 19
// LE = 20
// DS = 21




// unit_hanger["Fighters"] = -1
// unit_hanger["Bombers"] = -1
// unit_hanger["Heavy Bombers"] = -2
// unit_hanger["Ion Bombers"] = -2
// unit_hanger["Frigate"] = 4
// unit_hanger["Ion Frigate"] = 4
// unit_hanger["Cruiser"] = 4
// unit_hanger["Carrier"] = 60
// unit_hanger["Heavy Cruiser"] = 8
// unit_hanger["Battleship"] = 40
// unit_hanger["Fleet Carrier"] = 400
// unit_hanger["Dreadnought"] = 200
// unit_hanger["Titan"] = 1000
// unit_hanger["Leviathan"] = 4000
// unit_hanger["Death Star"] = 10000



build_hashes();
collect_data();
calculate_hangar_space();
print_data();


function build_hashes() {
  //GM_log("building hashes...");
  // there is a better way to get which page you are on right?
  if (location.indexOf('view=units') != -1 || location.indexOf('view=production') != -1) {
    GM_log("building hashes for units or production page..")
    unit_hanger["Fighters"] = -1
    unit_hanger["Bombers"] = -1
    unit_hanger["Heavy Bombers"] = -2
    unit_hanger["Ion Bombers"] = -2
    unit_hanger["Frigate"] = 4
    unit_hanger["Ion Frigate"] = 4
    unit_hanger["Cruiser"] = 4
    unit_hanger["Carrier"] = 60
    unit_hanger["Heavy Cruiser"] = 8
    unit_hanger["Battleship"] = 40
    unit_hanger["Fleet Carrier"] = 400
    unit_hanger["Dreadnought"] = 200
    unit_hanger["Titan"] = 1000
    unit_hanger["Leviathan"] = 4000
    unit_hanger["Death Star"] = 10000
  } else if (location.indexOf('view=fleets') != -1) {
    GM_log("building hashes for fleets page...")
    unit_hanger["FT"] = -1
    unit_hanger["BO"] = -1
    unit_hanger["HB"] = -2
    unit_hanger["IB"] = -2
    unit_hanger["FR"] = 4
    unit_hanger["IF"] = 4
    unit_hanger["CR"] = 4
    unit_hanger["CA"] = 60
    unit_hanger["HC"] = 8
    unit_hanger["BS"] = 40
    unit_hanger["FC"] = 400
    unit_hanger["DN"] = 200
    unit_hanger["TI"] = 1000
    unit_hanger["LE"] = 4000
    unit_hanger["DS"] = 10000
  }
}

function collect_data_units_page() {
  GM_log("collecting data from units page");
  var regex = /[0-9]+/;
  table = document.getElementById('empire_units_units').rows[0].cells[0].getElementsByTagName('table');
  row = table[0].rows

  for (i = 1; i < row.length; i++) {
    s = String(row[i].cells[0].innerHTML.replace(/(<([^>]+)>)/ig,""));
    value = regex.exec(row[i].cells[1].innerHTML);
    units[s] = Number(value);
    GM_log("units[" + s + "] = " + units[s]);
  }

}

function collect_data_fleets_page() {
  GM_log("collecting data from fleets page");
  var regex = /[0-9]+/;
  table = document.getElementById('empire_fleets').rows[1].cells[0].getElementsByTagName('table');
  row = table[0].rows

  for (j = 2; j < row[0].cells.length - 1; j++) {
    s = String(row[0].cells[j].innerHTML);
    units[s] = 0;
  }

  for (i=1; i < row.length; i++) {
    for (j=2; j < row[0].cells.length - 1; j++) {
      value = regex.exec(row[i].cells[j].innerHTML);
      if (value != null) {
        s = String(row[0].cells[j].innerHTML);
        units[s] += Number(value);
      }
    }
  }
}

function collect_data() {
    // there has got to be a better way to do this stupid page detection shit...
    if (location.indexOf('view=units') != -1) {
    collect_data_units_page();
    } 
    else if (location.indexOf('view=fleets') != -1) {
        collect_data_fleets_page();
    } 
    else if (location.indexOf('view=production') != -1) {
        collect_data_production_page();
    }
    else {
        alert("HURF DURF SHIT IS BROKE YOU ARE TRYING TO COLLECT DATA ON A PAGE WE DON'T SUPPORT SOMEHOW!");
    }



}

function calculate_hangar_space() {

  hanger_space_cap = 0;
  for (k in unit_hanger) {
    if (unit_hanger[k] > 0 && units[k] != null) {
      hanger_space_cap += unit_hanger[k] * units[k];
    }
  }
  
  if (location.indexOf('view=units') != -1 || location.indexOf('view=production') != -1) {
    delete unit_hanger["Dreadnought"];
    delete unit_hanger["Titan"];
    delete unit_hanger["Leviathan"];
    delete unit_hanger["Death Star"];
    
  } else if (location.indexOf('view=fleets') != -1) {
    delete unit_hanger["DN"];
    delete unit_hanger["TI"];
    delete unit_hanger["LE"];
    delete unit_hanger["DS"];
  }

  hanger_space_no_cap = 0;
  for (k in unit_hanger) {
    if (unit_hanger[k] > 0)
    hanger_space_no_cap += unit_hanger[k] * units[k];
  }

  hanger_space_used = 0;
  for (k in unit_hanger) {
    if (unit_hanger[k] < 0)
    hanger_space_used += unit_hanger[k] * units[k];
  }

  hanger_space_used *= -1;

  // didn't feel like renaming vars elsewhere...
  hangar_space_no_cap = hanger_space_no_cap;
  hangar_space_cap = hanger_space_cap;
  hangar_space_used = hanger_space_used;

}


function makeDiv(id, message) {
  var div = document.createElement("div");
  div.id = id;
  div.setAttribute("align","center");
  div.innerHTML = message;
  document.body.appendChild(div);
}

function print_units_data(label, value) {
    table = document.getElementById('empire_units_summary').rows[0].cells[0].getElementsByTagName('table');
    row = table[0].insertRow(table[0].rows.length - 2);
    row.align="center";
    text_cell=row.insertCell(0);
    value_cell=row.insertCell(1);
    text_cell.innerHTML = "<b>" + label + "</b>"
    value_cell.innerHTML = value
}

function print_data() {

    
    if (location.indexOf('view=fleets') != -1 || location.indexOf('view=production') != -1) {
        makeDiv("hangar_space_used", "Hangar Space Used: " + hangar_space_used + "<br /> <br />");
    
        makeDiv("hangar_space_no_cap", "Total Hangar Capacity (No Capitals): " + hangar_space_no_cap)
        makeDiv("empty_space_no_cap", "Remaining Hangar Capacity (No Capitals): " + (hangar_space_no_cap - hangar_space_used) + "<br /> <br />");
    
        makeDiv("hangar_space_cap", "Total Hangar Capacity (With Capitals): " + hangar_space_cap)
        makeDiv("empty_space_no_cap", "Remaining Hangar Capacity (With Capitals): " + (hangar_space_cap - hangar_space_used));
    }
    
    if (location.indexOf('view=units') != -1) {
        print_units_data("Hangar Space Used: ", hangar_space_used);
        print_units_data("Hangar Capacity (No Capitals): ", hangar_space_no_cap);
        print_units_data("Remaining Hangar Capacity (No Capitals): ", (hangar_space_no_cap - hangar_space_used));
        print_units_data("Total Hangar Capacity: ", hangar_space_cap);
        print_units_data("Remaining Total Hangar Capacity: ", (hangar_space_cap - hangar_space_used));
    }
    
}

function collect_data_production_page() { 
  GM_log("collecting data from production page");
  var regx_unit_amount = /[0-9]+/; //Heavy Bombers (19290 Available)
  var regx_unit_type = /[aA-zZ]+[\ aA-zZ]*/;
  table = document.getElementById('base_production').rows[1].cells[0].getElementsByTagName('table');
  row = table[0].rows;
  

  for (i = 1; i < row.length; i++) {
    row_id = row[i].id;
    if(/row[0-9]+/.test(row_id)) {
            s = String(row[i].cells[1].innerHTML.replace(/(<([^>]+)>)/ig,""));
            unit_type = String(regx_unit_type.exec(s));
            unit_type = unit_type.replace(/\ +$/, '');
            unit_amount = Number(regx_unit_amount.exec(s));
            
            if (unit_amount != null) {
                units[unit_type] = unit_amount;
            }    
         //GM_log("units[" + unit_type + "] = " + units[unit_type]);
        }
        
    
    
  }
}
