// Mafia Wars Property Calculator
// version 2.2
// 2009-12-11
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version History
// 0.1 Testing
// 1.0 Initial Release
// 1.1 Fixed the include to have the right url (d'oh)
// 1.2 Added the undeveloped space to the calculations and added some
//     formatting niceties
// 2.0 (2010-01-14)
//    - Updated the connection method to use a click listener instead
//      of the perpetual timer
//    - Added highlighting of current property that you can afford.
//    - Added numbering of all the properties.
// 2.1 (2010-01-14) Minor fix with the number
// 2.2 (2010-01-14) Wow, 3 fixes in one day.  More event wireup fixing
// --------------------------------------------------------------------
//  Please contact me at mwpropertycalculator@gmail.com for any
//  suggestions, bugs or update requests.
//
// ==UserScript==
// @name          Mafia Wars Property Calculator
// @namespace     http://obeliskprogramming.com
// @description   Will calculate the most beneficial property to buy
// @include       http://mwfb.zynga.com/mwfb/*
// ==/UserScript==



window.MafiaWarsPropertyCalculator = function() {
  try {

    var innerPage = document.getElementById("inner_page");
    var cash = document.getElementById("user_cash_nyc").innerHTML;
    cash = cash.substring(1, cash.length).replace(/,/g, '')

    var tables = innerPage.getElementsByTagName("table");
    var MainTable = null;
    for (table in tables) {
      if (tables[table].className == "main_table") MainTable = tables[table]
    }

    var rows = MainTable.getElementsByTagName("tr");

    var PropertiesFound = false;
    var Output;
    var Properties = new Array();



    for (rownum = 0; rownum < rows.length; rownum++) {
      var row = rows[rownum];
      if (row.className == "header" && Output == null) {
        Output = rows[rownum + 1].getElementsByTagName("td")[0];
        Output.innerHTML = "";
        continue;
      }

      var Property = null;
      strongs = row.getElementsByTagName("strong");
      if (strongs.length > 0) {
        for (strongcount = 0; strongcount < strongs.length; strongcount++) {
          strong = strongs[strongcount];
          if (strongcount == 0) {
            if (strong == null || strong.innerHTML[0] == "$" || strong.innerHTML == "Louie's Deli") continue;
            Property = new Object();
            Property.Name = strong.innerHTML;
            Property.elm = strong.parentNode;
          }
          if (Property == null) continue;
          if (strong.className == "money") {
            if (Property.Income == null) {
              var Income = strong.innerHTML
              if (Income[0] == "+") Income = Income.substring(1, Income.length);
              Property.IncomeFormatted = Income;
              Property.Income = Income.substring(1, Income.length).replace(/,/g, '');
            } else {
              Property.CostFormatted = strong.innerHTML;
              Property.Cost = strong.innerHTML.substring(1, strong.innerHTML.length).replace(/,/g, '');
            }
          }
        }
        if (Property != null) {
          Properties[Properties.length] = Property;
        }
      }


    }


    if (Properties.length > 0) {
      Properties.sort(function(a, b) { return (b.Income / b.Cost) - (a.Income / a.Cost); });

      var p = Properties[0];


      var factor = 0;
      var valstring = (p.Income / p.Cost).toString();
      while ((valstring[factor] == '0' || valstring[factor] == '.') && factor < valstring.length - 1) factor++;

      if (factor > 1) factor = factor + 2;

      var Outputstring = "<table><tr><th>Property</th><th>Income</th><th>Cost</th><th>Factor (10^" + factor + ")</th></tr>";

      factor = Math.pow(10, factor);
      var highestFound = false;
      var currPropNum = 1;
      for (Prop in Properties) {

        p = Properties[Prop];

        var ps = p.elm.getElementsByTagName("p")
        for (pix in ps) p.elm.removeChild(ps[pix]);

        if (!highestFound) {
          if (p.Cost * 10 < cash) {
            p.elm.parentNode.style.backgroundColor = "#009900";
            highestFound = true;
          } else {
            p.elm.innerHTML += "<p>You don't have enough money yet</p>";
          }
        }

        p.elm.innerHTML += "<p> #" + currPropNum.toString() + " buy</p>";
        currPropNum++;

        Outputstring +=
              "<tr><td style=\"padding: .25em\">" + p.Name +
              "</td><td style=\"padding: .25em\">" + p.IncomeFormatted +
              "</td><td style=\"padding: .25em\">" + p.CostFormatted +
              "</td><td style=\"padding: .25em\">" + (factor * p.Income / p.Cost).toFixed(2) +
              "</td></tr>";
      }
      Outputstring += "</table>";
      Output.innerHTML = Outputstring;
    }

  } catch (err) {
    window.setTimeout(MafiaWarsPropertyCalculator, 500);
    //console.log("MafiaWarsPropertyCalculator Error: " + err);
  }

}

window.MafiaWarsPropertyCalculatorCheckPage = function() {
try {
    var innerPage = document.getElementById("inner_page");
    var OnPropertyPage = false;
    var divs = innerPage.getElementsByTagName("div");
    for (div in divs) {
      if (divs[div].className == "title") {
        if (divs[div].innerHTML.search(/Properties/) != -1) OnPropertyPage = true;
      }
    }

    if (OnPropertyPage) window.setTimeout(MafiaWarsPropertyCalculator, 500);
  } catch (err) {
    window.setTimeout(MafiaWarsPropertyCalculatorCheckPage, 500);
  }
}



document.addEventListener('click', function(event) {
  var elm = event["target"];
  console.log(elm.value);
  if (elm.innerHTML != "Properties" && elm.value!="Buy" && elm.value !="Sell") return;
  window.setTimeout(MafiaWarsPropertyCalculatorCheckPage, 500);
}, true);



