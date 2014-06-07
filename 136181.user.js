// ==UserScript==
// @name        Extended Fahrzeugmarkt
// @namespace   Happy
// @include     *cp.rpg-city.de*
// @version     1
// ==/UserScript==
var version = "25.08.2013";

var cars = [
  ["Airport LS", "Maverick", "750000", "35.0", "120", "12", "135", "Fahrzeuglackiererei"],
  ["Airport LS", "Dodo", "150000", "24.8", "80", "6", "120", "Fahrzeuglackiererei"],
  ["Airport LS", "Shamal", "3000000", "450.0", "3000", "12", "210", "Fahrzeuglackiererei"],
  ["Coutt and Schutz", "PCJ-600", "12000", "11.6", "30", "1", "125", "Fahrzeuglackiererei"],
  ["Coutt and Schutz", "Faggio", "3000", "7.5", "15", "1", "86", "Fahrzeuglackiererei"],
  ["Coutt and Schutz", "Freeway", "22000", "11.3", "30", "1", "111", "Fahrzeuglackiererei"],
  ["Coutt and Schutz", "Sanchez", "16000", "10.8", "30", "1", "111", "Fahrzeuglackiererei"],
  ["Coutt and Schutz", "Wayfarer", "10000", "9.8", "30", "1", "111", "Fahrzeuglackiererei"],
  ["Coutt and Schutz", "BF-400", "14000", "10.0", "30", "1", "117", "Fahrzeuglackiererei"],
  ["Coutt and Schutz", "NRG-500", "50000", "21.1", "30", "1", "136", "Fahrzeuglackiererei"],
  ["Coutt and Schutz", "BMX", "1000", "0.0", "3", "1", "74", "Fahrzeuglackiererei"],
  ["Coutt and Schutz", "FCR-900", "14000", "14.1", "30", "1", "125", "Fahrzeuglackiererei"],
  ["Feld", "Tractor", "25000", "7.5", "25", "1", "54", "Fahrzeuglackiererei"],
  ["Feld", "DFT-30", "70000", "17.2", "40", "1", "101", "Fahrzeuglackiererei"],
  ["Feld", "Yosemite", "18000", "13.1", "40", "1", "111", "Fahrzeuglackiererei"],
  ["Grottis", "Super GT", "250000", "17.8", "40", "1", "139", "Transfender"],
  ["Grottis", "Sultan", "85000", "16.7", "50", "1", "131", "Wheel Arch Angels"],
  ["Grottis", "Jester", "200000", "17.1", "40", "1", "138", "Wheel Arch Angels"],
  ["Grottis", "Bullet", "225000", "18.2", "40", "1", "157", "Transfender"],
  ["Grottis", "Turismo", "325000", "21.1", "40", "1", "150", "Transfender", "Transfender"],
  ["Grottis", "Cheetah", "250000", "17.6", "40", "1", "149", "Transfender"],
  ["Grottis", "Infernus", "350000", "24.2", "40", "1", "172", "Transfender"],
  ["Grottis", "Buffalo", "225000", "13.3", "40", "1", "144", "Transfender"],
  ["Grottis", "Banshee", "200000", "19.2", "40", "1", "156", "Transfender"],
  ["Grottis", "Alpha", "250000", "17.2", "40", "1", "131", "Transfender"],
  ["Intercars", "Tornado", "12000", "12.1", "40", "1", "122", "Loco Low Co."],
  ["Intercars", "Broadway", "8000", "11.8", "40", "1", "122", "Loco Low Co."],
  ["Intercars", "Savanna", "16000", "12.1", "40", "1", "134", "Loco Low Co."],
  ["Intercars", "Blade", "16000", "11.1", "40", "1", "134", "Loco Low Co."],
  ["Intercars", "Slamvan", "18000", "13.1", "40", "1", "122", "Loco Low Co."],
  ["Intercars", "Remington", "16000", "12.1", "40", "1", "131", "Loco Low Co."],
  ["Intercars", "Buccaneer", "14000", "13.1", "40", "1", "127", "Transfender"],
  ["Intercars", "Esperanto", "16000", "12.1", "40", "1", "115", "Transfender"],
  ["Intercars", "Voodoo", "10000", "14.1", "40", "1", "131", "Loco Low Co."],
  ["Intercars", "Hustler", "12000", "13.1", "40", "1", "114", "Transfender"],
  ["Intercars", "Blista Compact", "4000", "10.8", "40", "1", "126", "Transfender"],
  ["Intercars", "Comet", "16000", "18.2", "40", "1", "143", "Transfender"],
  ["Intercars", "Elegy", "14000", "11.6", "40", "1", "138", "Wheel Arch Angels"],
  ["Intercars", "Huntley", "24000", "16.2", "50", "1", "122", "Transfender"],
  ["Intercars", "Mesa", "28000", "11.5", "40", "1", "109", "Transfender"],
  ["Intercars", "Moonbeam", "20000", "15.6", "50", "1", "89", "Transfender"],
  ["Intercars", "Tampa", "4600", "13.1", "40", "1", "119", "Transfender"],
  ["Intercars", "Bobcat", "18000", "14.8", "45", "1", "108", "Transfender"],
  ["Intercars", "Burrito", "16000", "17.2", "40", "1", "121", "Fahrzeuglackiererei"],
  ["Intercars", "Nebula", "12000", "11.8", "40", "1", "122", "Transfender"],
  ["Intercars", "Phoenix", "28000", "14.1", "40", "1", "133", "Transfender"],
  ["Ottos", "Bravura", "7000", "11.8", "40", "1", "114", "Transfender"],
  ["Ottos", "Oceanic", "16000", "12.1", "40", "1", "109", "Transfender"],
  ["Ottos", "Premier", "20000", "12.3", "40", "1", "134", "Transfender"],
  ["Ottos", "Sentinel", "14900", "11.3", "40", "1", "127", "Transfender"],
  ["Ottos", "Admiral", "12000", "12.1", "40", "1", "127", "Transfender"],
  ["Ottos", "Elegant", "20000", "11.3", "40", "1", "128", "Transfender"],
  ["Ottos", "Sabre", "22000", "11.3", "40", "1", "134", "Transfender"],
  ["Ottos", "Washington", "21000", "13.1", "40", "1", "119", "Transfender"],
  ["Ottos", "Cadrona", "11000", "11.8", "40", "1", "115", "Transfender"],
  ["Ottos", "Sunrise", "14000", "11.8", "40", "1", "112", "Transfender"],
  ["Ottos", "Stafford", "18000", "11.6", "40", "1", "118", "Transfender"],
  ["Ottos", "Greenwood", "7500", "11.6", "40", "1", "109", "Transfender"],
  ["Ottos", "Hermes", "15000", "12.3", "40", "1", "115", "Transfender"],
  ["Ottos", "Clover", "5000", "10.1", "40", "1", "127", "Transfender"],
  ["Strand", "Squallo", "500000", "19.2", "70", "6", "180", "Fahrzeuglackiererei"], //Squalo
  ["Strand", "Tropic", "750000", "22.3", "70", "12", "99", "Fahrzeuglackiererei"],
  ["Strand", "Jetmax", "500000", "19.1", "60", "6", "130", "Fahrzeuglackiererei"],
  ["Strand", "Speeder", "500000", "19.5", "70", "6", "130", "Fahrzeuglackiererei"],
  ["Strand", "Dinghy", "25000", "9.8", "30", "1", "83", "Fahrzeuglackiererei"],
  ["Wang Cars", "Solair", "16000", "12.1", "40", "1", "122", "Transfender"],
  ["Wang Cars", "Stratum", "16000", "13.1", "40", "1", "119", "Wheel Arch Angels"],
  ["Wang Cars", "BF Injection", "500000", "13.1", "40", "1", "105", "Fahrzeuglackiererei"],
  ["Wang Cars", "Landstalker", "18000", "16.7", "40", "1", "122", "Transfender"],
  ["Wang Cars", "Club", "22000", "11.3", "40", "1", "126", "Transfender"],
  ["Wang Cars", "Flash", "22000", "10.8", "40", "1", "127", "Wheel Arch Angels"],
  ["Wang Cars", "Uranus", "90000", "18.2", "40", "1", "121", "Wheel Arch Angels"],
  ["Wang Cars", "Quad", "80000", "9.8", "20", "1", "85", "Fahrzeuglackiererei"],
  ["Wang Cars", "Stretch", "1000000", "17.8", "50", "1", "122", "Transfender"],
  ["Wang Cars", "Euros", "90000", "15.3", "40", "1", "127", "Transfender"],
  ["Wang Cars", "Rancher", "20000", "16.7", "40", "1", "108", "Transfender"],
  ["Wang Cars", "Hotknife", "500000", "13.1", "40", "1", "129", "-"],
  ["Wang Cars", "Stallion", "26000", "12.5", "40", "1", "130", "Transfender"],
  ["Wang Cars", "Windsor", "24000", "15.1", "40", "1", "122", "Transfender"],
  ["Wang Cars", "Feltzer", "26000", "11.8", "40", "1", "129", "Transfender"],
  ["Wang Cars", "ZR-350", "120000", "17.2", "40", "1", "144", "Transfender"],
  ["-", "Kart", "-", "4.5", "12", "1", "72", "Zweiradtuning"]
];

if(typeof localStorage.getItem("showDescriptions") == "undefined") localStorage.setItem("showDescriptions", "true");


var a = document.getElementsByTagName("a");
var ul = document.getElementsByTagName("ul")[0];
var li = document.createElement("li");
var ticketid = a[2].href;
ticketid.search(/ticket=(.*)/);
ticketid = RegExp.$1;
li.innerHTML = "<a href='http://cp.rpg-city.de/index.php?funktion=_dealership&ticket=" + ticketid + "'>Fahrzeugmarkt</a>";
ul.insertBefore(li, ul.getElementsByTagName("li")[ul.getElementsByTagName("li").length - 1]);

var sortingContainer, filterList, direction;
var list = [];

if (location.href.search(/funktion=_dealership/) != -1 && location.href.search(/id=/) == -1 && location.href.search(/&add/) == -1)
{
  var iframe = document.createElement("iframe");
  iframe.src = "http://david97.php-friends.de/Sonstiges/dealershipVersioncheck.php?version=" + version;
  iframe.setAttribute("style", "display:none;");
  document.body.appendChild(iframe);

  var progressbar_length = 250;
  var a = document.getElementsByTagName("table")[0].getElementsByTagName("a");
  var replacements = [
    ["&Auml;", "Ä"],
    ["&auml;", "ä"],
    ["&Ouml;", "Ö"],
    ["&ouml;", "ö"],
    ["&Uuml;", "Ü"],
    ["&uuml;", "ü"],
    ["&szlig;", "ß"]
  ];

  var progressbarDiv = document.createElement("div");
  progressbarDiv.setAttribute("style", "width:" + progressbar_length + "px;background-color:white;height:15px;color:black;text-align:center;border:1px black solid;position:relative;z-index:0;");
  document.getElementsByTagName("select")[0].parentNode.insertBefore(progressbarDiv, document.getElementsByTagName("select")[0].nextSibling);

  var progressbar = document.createElement("div");
  progressbar.setAttribute("style", "width:0px;background-color:#5555DD;height:100%;border:1px black solid;position:absolute;top:-1px;left:-1px;z-index:-1;");
  progressbarDiv.appendChild(progressbar);

  var progress = document.createElement("span");
  progress.setAttribute("style", "z-index:1;");
  progress.innerHTML = "0 %";
  progressbarDiv.appendChild(progress);

  var progressText = document.createElement("div");
  progressText.innerHTML = "Lade Beschreibungen...";
  progressText.setAttribute("style", "color:#000000;margin-top:10px;");
  document.getElementsByTagName("select")[0].parentNode.insertBefore(progressText, document.getElementsByTagName("select")[0].nextSibling);
  
  var toggleButton = document.createElement("input");
  toggleButton.type = "button";
  toggleButton.value = "Beschreibungen "+((localStorage.getItem("showDescriptions") == "true") ? "aus" : "ein")+"blenden";
  toggleButton.setAttribute("style", "color:#000000;background-color:#eeeeee;border:1px solid black;margin-top:10px;");
  toggleButton.addEventListener("click", toggleDescriptions);
  document.getElementsByTagName("select")[0].parentNode.insertBefore(toggleButton, progressbarDiv.nextSibling);
  
  
  var threadText = document.createElement("span");
  threadText.innerHTML = "<a href='http://www.rpg-city.de/?page=Thread&threadID=23860' target='_blank'><b>Link zum Thread (erweiterter Fahrzeugmarkt)</b></a>";
  threadText.setAttribute("style", "color:#000000;float:right");
  document.getElementsByTagName("select")[0].parentNode.insertBefore(threadText, progressText);
  
  var loaded = 0;
  for (var k = 0; k < a.length; k++)
  {
    getCarinfo(k);
  }
}

function getCarinfo(index)
{
  document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].href.search(/id=(\d+)/);
  var itemID = RegExp.$1;
  if (localStorage.getItem(itemID + "_name") == null || localStorage.getItem(itemID + "_description") == null || localStorage.getItem(itemID + "_price") == null)
  {
    var xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.onreadystatechange = function ()
    {
      if (xmlhttprequest.readyState == 4 && xmlhttprequest.status == 200)
      {
        parseData(xmlhttprequest.responseText, index, itemID);

        var carinfo = {
          name: localStorage.getItem(itemID + "_name"),
          description: localStorage.getItem(itemID + "_description"),
          specialPaint: localStorage.getItem(itemID + "_specialPaint"),
          price: localStorage.getItem(itemID + "_price")
        };
        addContent(carinfo, index, itemID);
      }
    }
    xmlhttprequest.open("GET", document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].href, true);
    xmlhttprequest.send(null);
  }
  else
  {
    var carinfo = {
      name: localStorage.getItem(itemID + "_name"),
      description: localStorage.getItem(itemID + "_description"),
      specialPaint: localStorage.getItem(itemID + "_specialPaint"),
      price: localStorage.getItem(itemID + "_price")
    };
    addContent(carinfo, index, itemID);
  }
}

Array.prototype.inOf = function (value, start)
{
  if (typeof start == "undefined") start = 0;
  var value_exp = new RegExp(value, "i");
  for (var i = start; i < this.length; i++)
  {
    if (this[i].search(value_exp) != -1)
    {
      return i;
    }
  }
  return -1;
}

function car_id(name)
{
  for (var i = 0; i < cars.length; i++)
  {
    if (name.toLowerCase() == cars[i][1].toLowerCase()) return i;
  }
  return -1;
}

function format_punkte(number)
{
  number += "";
  number = number.split("");
  for (var i = number.length - 3; i > 0; i -= 3)
  {
    number.splice(i, 0, ".");
  }
  return number.join("");
}

function addContent(carinfo, index, itemID)
{
  var td = document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode;
  td.insertBefore(document.createElement("br"), td.getElementsByTagName("div")[td.getElementsByTagName("div").length - 1]);

  var carindex = car_id(carinfo.name);
  if (carindex == -1)
  {
    var div = document.createElement("div");
    div.setAttribute("style", "float:left;color:red;margin-top:-10px;");
    div.innerHTML = "[Erweiterter Fahrzeugmarkt]<br>Es sind keine Fahrzeuginformationen für dieses Fahrzeug verfügbar. Bitte wende dich an HappyKillerX.";
    td.insertBefore(div, td.getElementsByTagName("div")[td.getElementsByTagName("div").length - 1]);
  }
  else
  {
    var div = document.createElement("div");
    div.setAttribute("style", "width:170px; float:left;");
    div.innerHTML = "Höchstgeschwindigkeit:";
    td.insertBefore(div, td.getElementsByTagName("div")[td.getElementsByTagName("div").length - 1]);
    div = document.createElement("div");
    div.setAttribute("style", "width:100px; float:left;");
    div.innerHTML = cars[carindex][6] + " km/h";
    td.insertBefore(div, td.getElementsByTagName("div")[td.getElementsByTagName("div").length - 1]);

    div = document.createElement("div");
    div.setAttribute("style", "width:170px; float:left;");
    div.innerHTML = "Tuningwerkstatt:";
    td.insertBefore(div, td.getElementsByTagName("div")[td.getElementsByTagName("div").length - 1]);
    div = document.createElement("div");
    div.setAttribute("style", "width:100px; float:left;");
    div.innerHTML = cars[carindex][7];
    td.insertBefore(div, td.getElementsByTagName("div")[td.getElementsByTagName("div").length - 1]);


    if (cars[carindex][2] != "-")
    {
      var orig_price = parseInt(cars[carindex][2]);
      var diff = orig_price - carinfo.price;
      var text = "Ersparnis";
      var color = "green";
      if (diff < 0)
      {
        text = "Verlust";
        color = "red";
      }
      if(carinfo.specialPaint == 1) color = "blue";
      var div = document.createElement("div");
      div.setAttribute("style", "float:right;");
      div.innerHTML = "Originalpreis: " + format_punkte(orig_price) + "$";
      var div2 = document.createElement("div");
      div2.setAttribute("style", "float:right;color:" + color + ";");
      div2.innerHTML = text + ": <b>" + format_punkte(Math.abs(diff)) + "$</b>";
      var div3 = document.createElement("div");
      div3.setAttribute("style", "float:right;color:" + color + ";");
      div3.innerHTML = "Prozent: <b>" + Math.round(Math.abs(diff) * 1000 / orig_price) / 10 + "%</b>";
      var div4 = document.createElement("div");
      div4.setAttribute("style", "float:right;color:" + color + ";");
      div4.innerHTML = "Fahrzeug mit Sonderlackierung";
      document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.getElementsByTagName("i")[0].appendChild(document.createElement("br"));
      document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.getElementsByTagName("i")[0].appendChild(div2);
      document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.getElementsByTagName("i")[0].appendChild(document.createElement("br"));
      document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.getElementsByTagName("i")[0].appendChild(div3);
      if(carinfo.specialPaint == 1)
      {
        document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.getElementsByTagName("i")[0].appendChild(document.createElement("br"));
        document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.getElementsByTagName("i")[0].appendChild(div4);
      }
      document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.nextSibling.innerHTML += " (Neu: " + format_punkte(orig_price) + "$)";
    }
    else
    {
      var div = document.createElement("div");
      div.setAttribute("style", "float:right;");
      div.innerHTML = "Nicht regulär kaufbar";
      document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.getElementsByTagName("i")[0].appendChild(document.createElement("br"));
      document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.getElementsByTagName("i")[0].appendChild(div);
    }
  }

  br = document.createElement("br");
  td.insertBefore(br, td.getElementsByTagName("div")[td.getElementsByTagName("div").length - 1]);
  br = document.createElement("br");
  td.insertBefore(br, td.getElementsByTagName("div")[td.getElementsByTagName("div").length - 1]);


  var div = document.createElement("div");
  div.setAttribute("style", "border:1px grey dashed;padding:5px;font-style:italic;width:400px;overflow:visible;");
  div.innerHTML = carinfo.description.replace(/\n/g, "<br>");
  div.setAttribute("name", "carDescription");
  div.style.display = (localStorage.getItem("showDescriptions") == "true") ? "block" : "none";
  document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.appendChild(div);
  
  
  
  document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.getElementsByTagName("div")[4].innerHTML.search(/(\d+)\.(\d+)\.(\d+) (\d+):(\d+)/);
  var time = new Date(RegExp.$3, RegExp.$2-1, RegExp.$1, RegExp.$4, RegExp.$5, 0).getTime();
  
  var kilometers = document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.getElementsByTagName("div")[16+parseInt(carinfo.specialPaint)].innerHTML.replace(/ km/, "").replace(/ /g, "");
  kilometers = parseFloat(kilometers);
  list.push([
    0,
    time,
    carinfo.name,
    carinfo.price,
    cars[carindex][6],
    cars[carindex][3],
    kilometers,
    cars[carindex][0],
    cars[carindex][7],
    document.getElementsByTagName("table")[0].getElementsByTagName("a")[index].parentNode.parentNode.parentNode.parentNode.innerHTML
  ]);
  
  loaded++;
  progressbar.style.width = Math.round(loaded * progressbar_length / a.length) + "px";
  progress.innerHTML = Math.round(loaded * 100 / a.length) + " %";
  if (loaded / a.length == 1)
  {
    progressText.innerHTML = "Beschreibungen geladen!";
    finishedLoading();
  }
}

function parseData(response, ind, itemID)
{
  response = response.split("\n");
  var index = response.inOf("Beschreibung") + 2;
  var description = ["<b>Beschreibung des Verkäufers:</b>"];
  for (var i = index; true; i++)
  {
    if (response[i].search(/(.*)<form method/) != -1)
    {
      description.push(RegExp.$1.replace(/<[^>]*>/g, ""));
      description.push("<hr style=\"height:1px;border:1px black dotted;\">");
      description.push("<b>Keine Sonderausstattung</b>");
      break;
    }
    if (response[i].search(/^\s*(<strong>)?Sonderausstattung/) != -1)
    {
      i++;
      //var equip = response[i];
      var equip = "";
      for (var j = 0; true; j++)
      {
        if (response[i + j].search(/(.*)<form method/) != -1)
        {
          equip += RegExp.$1.replace(/<[^>]*>/g, "");
          break;
        }
        else
        {
          equip += response[i + j];
        }
      }
      equip = equip.replace(/<br[^>]*>/g, "\n");
      equip = equip.replace(/<[^>]*>/g, "");
      equip = equip.replace(/\s*Sonderausstattung\n*/, "");
      description.push("<hr style=\"height:1px;border:1px black dotted;\">");
      if (equip.replace(/\s*/g, "") != "")
      {
        description.push("<b>Sonderausstattung:</b>");
        description.push(equip.replace(/\n/g, "<br>"));
      }
      else
      {
        description.push("<b>Keine Sonderausstattung</b>");
      }
      break;
    }
    description.push(response[i].replace(/<[^>]*>/g, "").replace(/^\s*/, ""));
  }

  localStorage.setItem(itemID + "_name", document.getElementsByTagName("table")[0].getElementsByTagName("a")[ind].innerHTML);

  var price = document.getElementsByTagName("table")[0].getElementsByTagName("a")[ind].parentNode.nextSibling.innerHTML;
  price = parseInt(price.replace(/[\.\$]/g, ""));
  localStorage.setItem(itemID + "_price", price);
  
  document.getElementsByTagName("table")[0].getElementsByTagName("a")[ind].parentNode.parentNode.parentNode.getElementsByTagName("div")[4].innerHTML.search(/(\d+)\.(\d+)\.(\d+) (\d+):(\d+)/);
  var time = new Date(RegExp.$3, RegExp.$2-1, RegExp.$1, RegExp.$4, RegExp.$5, 0);
  localStorage.setItem(itemID + "_date", time.getTime());
  
  document.getElementsByTagName("table")[0].getElementsByTagName("img")[ind*3+1].src.search(/(\d+)\.png/);
  localStorage.setItem(itemID + "_specialPaint", (RegExp.$1 >= 128) ? "1" : "0");

  description = description.join("\n");
  for (var i = 0; i < replacements.length; i++)
  {
    description = description.replace(new RegExp(replacements[i][0], "g"), replacements[i][1]);
  }
  localStorage.setItem(itemID + "_description", description);
}

function sortingFunction(a, b)
{
  if(isNaN(a[filterList.selectedIndex]))
    return a[filterList.selectedIndex].toLowerCase().localeCompare(b[filterList.selectedIndex].toLowerCase())*(direction.selectedIndex == 0 ? 1 : -1);
  return (a[filterList.selectedIndex]-b[filterList.selectedIndex])*(direction.selectedIndex == 0 ? 1 : -1);
}

function sortList()
{
  list.sort(sortingFunction);
  
  document.getElementsByTagName("table")[0].innerHTML = "";
  tr = document.createElement("tr");
  tr.setAttribute("style", "height:8px;");
  document.getElementsByTagName("table")[0].appendChild(tr);
  var tr;
  for(var i=0;i<list.length;i++)
  {
    tr = document.createElement("tr");
    tr.innerHTML = list[i][list[i].length-1].replace(/display: ([^;]+);/g, "display: "+(localStorage.getItem("showDescriptions") == "true" ? "block" : "none")+";");
    document.getElementsByTagName("table")[0].appendChild(tr);
    tr = document.createElement("tr");
    tr.setAttribute("style", "height:8px;");
    document.getElementsByTagName("table")[0].appendChild(tr);
  }
}

function finishedLoading()
{
  var filters = ["-", "Datum", "Name", "Preis", "Höchstgeschwindigkeit", "Verbrauch", "Kilometerstand", "Fahrzeughaus", "Tuningwerkstatt"];
  
  sortingContainer = document.createElement("div");
  sortingContainer.setAttribute("style", "margin-top:10px;");
  sortingContainer.innerHTML = "Sortieren nach: ";
  
  filterList = document.createElement("select");
  filterList.setAttribute("style", "margin-right:5px;");
  filterList.addEventListener("change", sortList);
  var option;
  for(var i=0;i<filters.length;i++)
  {
    option = document.createElement("option");
    option.innerHTML = filters[i];
    filterList.appendChild(option);
  }
  
  direction = document.createElement("select");
  direction.addEventListener("change", sortList);
  option = document.createElement("option");
  option.innerHTML = "Aufsteigend";
  direction.appendChild(option);
  option = document.createElement("option");
  option.innerHTML = "Absteigend";
  direction.appendChild(option);
  
  
  sortingContainer.appendChild(filterList);
  sortingContainer.appendChild(direction);
  
  
  document.getElementsByTagName("select")[0].parentNode.insertBefore(sortingContainer, toggleButton.nextSibling);
  //document.getElementsByTagName("select")[0].parentNode.insertBefore(document.createElement("br"), filterList);
  //document.getElementsByTagName("select")[0].parentNode.insertBefore(document.createElement("br"), toggleButton);
  

  var now = new Date().getTime();
  var diff;
  var remove = [];
  
  for (var i = 0; i < localStorage.length; i++)
  {
    var key = localStorage.key(i);
    if (key.search(/(\d+)\_(.*)$/) != -1)
    {
      if(RegExp.$2 == "date")
      {
        diff = now-localStorage.getItem(key);
        if(diff/1000/60/60 <= 168)
        {
          continue;
        }
        if(remove.indexOf(RegExp.$1) == -1) remove.push(RegExp.$1);
      }
    }
  }
  for(var i=0;i<remove.length;i++)
  {
    localStorage.removeItem(remove[i]+"_name");
    localStorage.removeItem(remove[i]+"_price");
    localStorage.removeItem(remove[i]+"_description");
    localStorage.removeItem(remove[i]+"_date");
  }
}
function toggleDescriptions()
{
  var showDescriptions = localStorage.getItem("showDescriptions") == "true";
  for(var i=0;i<document.getElementsByName("carDescription").length;i++)
  {
      document.getElementsByName("carDescription")[i].style.display = (showDescriptions) ? "none" : "";
  }
  localStorage.setItem("showDescriptions", !showDescriptions);
  toggleButton.value = "Beschreibungen "+((showDescriptions) ? "ein" : "aus")+"blenden";
}