// ==UserScript==
// @name           SFC Page Titles and Heph fixes
// @namespace      http://sneezingtiger.com
// @description    Set meaningful Starfleet Commander page titles and fix the moving planet (heph) links
// @version        1.0.5
// @include        http://*playstarfleet*.com/*
// ==/UserScript==

var newTitle = document.title;
var areaTitle = '';
var divs=document.getElementsByTagName('DIV');

// Get name of selected colony. Moon name isn't in the HTML, so leave it as moon
var selectedPlanet = '';
var snapPlanet = document.evaluate("//div[contains(@class,'selected')]//div[@class='planet_name']//a",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
if (snapPlanet.snapshotLength == 1)
 selectedPlanet = snapPlanet.snapshotItem(0).innerHTML;
else
 selectedPlanet = 'moon';


// Heph fixes are pasted in here so I don't need to have a separate
// userscript.

// Heph fixes - look for an "<a" with "<img" alt="Roaming_planet"
// and convert links to the specific error-giving pages to link to the
// heph home page.
var hephLinks = document.evaluate("//a/img[@alt='Roaming_planet']/parent::*",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
if (hephLinks.snapshotLength == 1) {
  thisLink = hephLinks.snapshotItem(0);
  url = thisLink.href;
  url = url.replace("/buildings/home","");
  url = url.replace("/buildings/research_lab","");
  url = url.replace("/buildings/shipyard","");
  url = url.replace("/buildings/fortifications","");
  url = url.replace("/buildings/factory","");
  url = url.replace("/buildings/workers","");
  thisLink.href = url;
}

// Heph fix - make the galaxy link in the moving heph page take you
// to the galaxy view of your homeworld.
if (/roaming_planet_move\/moving/.test(window.location)) {
  var hephLinks = document.evaluate("//div[@class='label']/span[@class='name']/a",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
  var altHephLinks = document.evaluate("//div[@class='label']/span[@class='name']",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
  if (hephLinks.snapshotLength == 1) {
    thisLink = hephLinks.snapshotItem(0);
    url = thisLink.href;
    url = url.replace(/current_planet=[0-9]*&/,"");
    thisLink.href = url;
  }
  else if (altHephLinks.snapshotLength == 1) {
    // Version of the above for unis that don't make it a link anymore
    thisLink = altHephLinks.snapshotItem(0);
    origText = thisLink.innerHTML.match(/\[.*\]/)[0];  // just the [12:34:5]
    url = origText.match(/[0-9]*:[0-9]*/)[0];  // 12:34
    url = url.replace(":","&solar_system=");
    url = '<a href="http://' + window.location.host + '/galaxy/show?galaxy=' + url;
    url = url + '">' + origText + "</a>";
    thisLink.innerHTML = url;
  }
}


// Get resource totals - as strings
var tbl = document.getElementById('user_stats').getElementsByTagName('table')[0];
var vOre = tbl.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML;
var vCrys = tbl.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML;
var vHydro = tbl.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML;

// Change to "xxxK" for easier reading
if (vOre.length > 3)
 vOre = vOre.slice(0,-4) + 'k';
if (vCrys.length > 3)
 vCrys = vCrys.slice(0,-4) + 'k';
if (vHydro.length > 3)
 vHydro = vHydro.slice(0,-4) + 'k';

vRes = vOre + '/' + vCrys + '/' + vHydro;


// Universe name.  Removed since it doesn't seem as useful as I thought.
//var uniAbbr='';

//if (/^http:\/\/uni2\.playstarfleetextreme/.test(window.location))
// uniAbbr='Ex-2';
//else if (/^http:\/\/uni2\.playstarfleet/.test(window.location))
// uniAbbr='Uni 2';
//else if (/^http:\/\/playstarfleetextreme/.test(window.location))
// uniAbbr='Extreme';
//else if (/^http:\/\/playstarfleet/.test(window.location))
// uniAbbr='Orig';


// Home page - 1 planet
if (/\.com\/\?current_planet/.test(window.location) ||
    /\.com\/\?activate_planet/.test(window.location)) {
 areaTitle='Home';
}

// Home page - all planets
else if (/\.com\/profile\/overview/.test(window.location)) {
 areaTitle='Home: All Planets';
}

// Missions page
else if (/\.com\/missions/.test(window.location)) {
 areaTitle='Missions';
}

// Fleets page
else if (/\.com\/fleet/.test(window.location)) {
 areaTitle='Fleets';
}

// Tech page
else if (/\.com\/technology/.test(window.location)) {
 areaTitle='Tech Tree';
}

// Galaxy # on galaxy page
else if (/\.com\/galaxy\/show/.test(window.location)) {
 var mySystem = document.getElementById("solar_system").value;
 var myGalaxy = document.getElementById("galaxy").value;

 areaTitle='Solar System ' + myGalaxy + ':' + mySystem;
}

// Leaders page
else if (/\.com\/leaderboard/.test(window.location)) {
 areaTitle='Leaderboard';
}

// Messages page
else if (/\.com\/messages\?/.test(window.location)) {
 areaTitle='Messages';
}

// New message (compose) page
else if (/\.com\/messages\/new/.test(window.location)) {
 areaTitle='Compose message';
}

// New message (compose) page to specific person
else if (/\.com\/messages\/new.*&recipients=/.test(window.location)) {
 var toPerson = document.evaluate("//div[@id='to']",
            document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue.innerHTML;
 areaTitle='Compose message' + toPerson;
}

// Alliance message topic
else if (/\.com\/topics\/show/.test(window.location)) {
 for (i=0; i<divs.length; i++) {
   if (divs[i].getAttribute('class')=='title') {
     areaTitle = divs[i+1].innerHTML;
   }
 }
}

// Alliance post
else if (/\.com\/topics\/new/.test(window.location)) {
 areaTitle='New Alliance Post';
}

// Buddy list
else if (/\.com\/buddy_list/.test(window.location)) {
 areaTitle='Buddy List';
}

// Buildings page
else if (/\.com\/buildings\/home/.test(window.location)) {
  areaTitle = 'Buildings';
}

// Research page
else if (/\.com\/buildings\/research_lab/.test(window.location)) {
  areaTitle = 'Research Lab';
}

// Shipyard page
else if (/\.com\/buildings\/shipyard/.test(window.location)) {
  areaTitle = 'Shipyard';
}

// Defense page
else if (/\.com\/buildings\/fortifications/.test(window.location)) {
  areaTitle = 'Defense';
}

// Scans page (moon)
else if (/\.com\/scan\?/.test(window.location)) {
  areaTitle = 'Scans';
}

// One scan (planet activity) (moon)
else if (/\.com\/scan\/show/.test(window.location)) {
  areaTitle = 'Planet Activity';
}

// Factory page
else if (/\.com\/buildings\/factory/.test(window.location)) {
  areaTitle = 'Factory';
}

// Workers page
else if (/\.com\/workers/.test(window.location)) {
  areaTitle = 'Workers';
}

// Moving heph page
else if (/\.com\/roaming_planet_move/.test(window.location)) {
  areaTitle = 'Moving Heph';
}

if (areaTitle != '') {
 document.title = areaTitle + ' - ' + selectedPlanet + ' - ' + vRes;
}
