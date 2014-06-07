// ==UserScript==
// @name           Google Finance + CARMA
// @namespace      http://ics.uci.edu/googlepluscarma
// @description    Display carbon production figures from CARMA
// @include        http://finance.google.com/finance?q=*
// ==/UserScript==

/* This script was written for IN4MTX 161, Fall 2008 */

var symbol = "";
var query = "";
var companyData = null;
var isPowerCompany = false;

function getStockSymbol() {
  var tmp = document.title;
  symbol = tmp.split(" ")[0];
}

function constructQuery() {
  query = "http://carma.org/api/1.1/getCompany?symbol=" + symbol;
}

function parseEnvInfo(data) {
  var response = data.responseText;

  if (response == "Error: no matching company") {
    isPowerCompany = false;
    return;
  }

  isPowerCompany = true;
  companyData = eval(response)[0];
}

function addEnvInfo() {
  if (isPowerCompany == false)
    return;

  var insertionPoint = document.getElementById("related");

  if (insertionPoint == null)
    return;

  var newTable = document.createElement("table");
  //newTable.setAttribute("border", "1");
  newTable.setAttribute("cellpadding", "7");
  newTable.setAttribute("cellspacing", "0");
  //newTable.style.borderCollapse = "collapse";
  var newTR = document.createElement("tr");
  newTable.appendChild(newTR);

  /* TABLE HEADERS */
  var newTD = document.createElement("th");
  newTR.appendChild(newTD);

  newTD = document.createElement("th");
  newTD.appendChild(document.createTextNode("Tons CO2"));
  newTR.appendChild(newTD);

  newTD = document.createElement("th");
  newTD.appendChild(document.createTextNode("MWh Energy"));
  newTR.appendChild(newTD);

  newTD = document.createElement("th");
  newTD.appendChild(document.createTextNode("% Fossil"));
  newTR.appendChild(newTD);

  newTD = document.createElement("th");
  newTD.appendChild(document.createTextNode("% Hydro"));
  newTR.appendChild(newTD);

  newTD = document.createElement("th");
  newTD.appendChild(document.createTextNode("% Nuclear"));
  newTR.appendChild(newTD);

  newTD = document.createElement("th");
  newTD.appendChild(document.createTextNode("% Other"));
  newTR.appendChild(newTD);

  newTD = document.createElement("th");
  newTD.appendChild(document.createTextNode("Pollution Rating"));
  newTR.appendChild(newTD);

  var highlightWhite = true; // used for zebra striping

  function roundedTD(number) {
    var td = document.createElement("td");
    td.setAttribute("align", "center");
    var n = new Number(number);
    n = Math.round(n * 10000) / 100;
    td.appendChild(document.createTextNode(n));
    return td;
  }

  function dataRow(set, label) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");

    if (highlightWhite == true) {
      highlightWhite = false;
      tr.setAttribute("class", "highlightWhite");
    } else {
      highlightWhite = true;
      tr.setAttribute("class", "highlightGrey");
    }
    td.appendChild(document.createTextNode(label + ":"));
    tr.appendChild(td);

    td = document.createElement("td");
    td.setAttribute("align", "center");
    td.appendChild(document.createTextNode(companyData["carbon"][set] * 1.0));
    tr.appendChild(td);

    td = document.createElement("td");
    td.setAttribute("align", "center");
    td.appendChild(document.createTextNode(companyData["energy"][set] * 1.0));
    tr.appendChild(td);

    tr.appendChild(roundedTD(companyData["fossil"][set]));
    tr.appendChild(roundedTD(companyData["hydro"][set]));
    tr.appendChild(roundedTD(companyData["nuclear"][set]));
    tr.appendChild(roundedTD(companyData["renewable"][set]));

    var intensity = companyData["intensity"][set];

    td = document.createElement("td");
    td.setAttribute("align", "center");
    var img = document.createElement("img");
    td.appendChild(img);

    if (intensity > 1750)
      img.setAttribute("src", "http://carma.org/images/icons/icon_square_red_2.gif");
    else if (intensity >= 1250)
      img.setAttribute("src", "http://carma.org/images/icons/icon_square_orange_2.gif");
    else if (intensity >= 750)
      img.setAttribute("src", "http://carma.org/images/icons/icon_square_yellow_2.gif");
    else if (intensity >= 250)
      img.setAttribute("src", "http://carma.org/images/icons/icon_square_blue_2.gif");
    else
      img.setAttribute("src", "http://carma.org/images/icons/icon_square_green_2.gif");

    tr.appendChild(td);
    return tr;
  }

  newTable.appendChild(dataRow("past", "2000"));
  newTable.appendChild(dataRow("present", "Present"));
  newTable.appendChild(dataRow("future", "Future"));

  var container = document.createElement("div");
  container.setAttribute("id", "environmentals");

  var header = document.createElement("div");
  header.setAttribute("class", "hdg");
  container.appendChild(header);

  var headerTitle = document.createElement("h3");
  headerTitle.appendChild(document.createTextNode("Environmental Information"));
  header.appendChild(headerTitle);

  var content = document.createElement("div");
  content.setAttribute("class", "content");

  var intensity = companyData["intensity"]["present"];
  var para = document.createElement("p");
  var message = "This power company owns " + companyData["plant_count"] + " power plants.";
  message += " At present, those power plants produce on average ";
  message += Math.round(intensity);
  message += " pounds of carbon dioxide for every megawatt-hour of electricity produced.";
  message += " This is considered a ";

  if (intensity > 1750)
    message += "high";
  else if (intensity >= 1250)
    message += "medium to high";
  else if (intensity >= 750)
    message += "medium";
  else if (intensity >= 250)
    message += "low to medium";
  else
    message += "low";

  message += " amount of CO2 to produce per megawatt-hour.";
  para.appendChild(document.createTextNode(message));

  content.appendChild(para);
  content.appendChild(newTable);

  para = document.createElement("p");
  message = "The above information is produced by the ";
  para.appendChild(document.createTextNode(message));
  message = document.createElement("a");
  message.setAttribute("href", "http://www.carma.org");
  message.appendChild(document.createTextNode("Carbon Monitoring for Action (CARMA) project"));
  para.appendChild(message);

  content.appendChild(para);

  container.appendChild(content);

  insertionPoint.parentNode.insertBefore(container, insertionPoint);
}

window.addEventListener('load', function() {
  getStockSymbol();
  constructQuery();

  GM_xmlhttpRequest({
    method: "GET",
    url: query,
    onload: function( data ) {
      try {
	parseEnvInfo(data);
	addEnvInfo();
      } catch( e ) {
	GM_log( e );
      }
    }
  });

  var logo = document.createElement("div");
  logo.setAttribute('id', 'fest_logo');
  logo.innerHTML = '<div style="margin: 0 auto 0 auto; '
    + 'border-bottom: 1px solid #000000; margin-bottom: 5px; '
    + 'font-size: small; background-color: #44CC55; '
    + 'color: #000000;"><p style="margin: 2px 0 1px 0;"> '
    + '<b>This site is running a script from the Firefox '
    + 'Environmental Sustainability '
    + 'Toolkit (FEST). Please visit '
    + '<a href="http://lotus.calit2.uci.edu/fest/index.html">'
    + ' our homepage</a>'
    + ' for more information on FEST.</b>'
    + '</p></div>';

  document.body.insertBefore(logo, document.body.firstChild);
}, true);

