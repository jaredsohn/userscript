// ==UserScript==
// @name        ocscout
// @namespace   *elite*
// @description outer core scout
// @include     *elite*
// @version     1
// @author      Jacques van den Berg
// ==/UserScript==
var version = "0.1";



if ( window.location.toString().indexOf("map/E") != -1 ) {
    var isRegion = document.location.href.match(/[E][0-9][0-9].[0-9][0-9]$/);
    if (isRegion) {        
        addRegionButton();
    }    
}


function defScoutBar() {
    var str =  "<div id='scoutbar' "
          + "style='background:green; "
          + "border-bottom: 1px solid #888;"
          + "margin-bottom:5px;"
          + "padding:5px;"
          + "position:fixed;"
          + "width:100%;"
          + "top:10;"
          + "left:0;"
          + "z-index:99999;"
          + "text-align: center;"
          + "display:block;'>";
    return str;
}

function addRegionButton() {
    var ScoutRegionButton = document.createElement("div");
    ScoutRegionButton.innerHTML = defScoutBar()
        + "<a id='scoutbar_all' style='color: blue';>Scout ALL Systems</a>" + "(Scout for fleet and bases)" + "<a id='debris_all' style='color: blue';>Scout for debris</a>"
        + "(Scout for debris - This bar will close after you click this link.)<div>";
    document.body.style.paddingTop = '29px';
    document.body.insertBefore(ScoutRegionButton, document.body.firstChild);
    document.addEventListener ('click', function(event) {
       if(event.target == document.getElementById("scoutbar_close")) {
           var e = document.getElementById('scoutbar');
           e.parentNode.removeChild (e);
           document.body.style.paddingTop = '0';
       }
       else if(event.target == document.getElementById("scoutbar_all")) {
           scoutRegion();
       }
       else if(event.target == document.getElementById("debris_all")) {
           scoutDebris();
       }

     }, true);
}

function scoutDebris() {
  var e = document.getElementById('scoutbar');
    e.style.background = '#0AC';
    var allTables = document.getElementsByTagName('a');
    var last = ''
    for (i=0; i<allTables.length; i++) {
        if ( allTables[i].href.match(/[E][0-9][0-9].[0-9][0-9].[0-9][0-9]$/) ) {
            if (last != allTables[i].href ) { 
                 getSection2(allTables[i].href);
            }
            last = allTables[i].href;
        }
    }
    e.style.background = '#CA0';
    e.parentNode.removeChild (e);
    document.body.style.paddingTop = '0';
}

function scoutRegion() {
    var e = document.getElementById('scoutbar');
    e.style.background = '#0AC';
    var allTables = document.getElementsByTagName('a');
    var last = ''
    for (i=0; i<allTables.length; i++) {
        if ( allTables[i].href.match(/[E][0-9][0-9].[0-9][0-9].[0-9][0-9]$/) ) {
            if (last != allTables[i].href ) { 
                 getSection(allTables[i].href);
            }
            last = allTables[i].href;
        }
    }
    e.style.background = '#CA0';
    e.parentNode.removeChild (e);
    document.body.style.paddingTop = '0';
}

function getSection(uri) {
   
  if ( uri.match(/[E][0-9][0-9].[0-9][0-9].[0-9][0-9]$/) ) 
  {      

GM_xmlhttpRequest({
  method: "GET",
  url: uri,
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onload: function(response) {
    var responseXML = null;
    // Inject responseXML into existing Object (only appropriate for XML content).
    if (!response.responseXML) {
      responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }

    var from = response.responseText.indexOf('<thead><tr><th>Coord</th><th>Astro</th><th>Base</th><th>Owner</th><th>Debris</th><th>Occupied by</th><th>Fleets</th> </tr></thead>');
    var to = response.responseText.length;    
    var text = response.responseText.substr(from, to);    
    var to2 = text.indexOf('</tbody>');
    var from2  = text.indexOf('<a href=');
    
    text = text.substr(from2, to2);
    if ( text.indexOf('1 fleet') > -1 || text.indexOf('2 fleet') > -1 || text.indexOf('3 fleet') > -1 || text.indexOf('4 fleet') > -1 || text.indexOf('5 fleet') > -1 ) {
         GM_openInTab(uri);
    }  
    openBase(text);
        
  }
  });
  }
}
    
function getSection2(uri) {
   
  if ( uri.match(/[E][0-9][0-9].[0-9][0-9].[0-9][0-9]$/) ) 
  {      

GM_xmlhttpRequest({
  method: "GET",
  url: uri,
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onload: function(response) {
    var responseXML = null;
    // Inject responseXML into existing Object (only appropriate for XML content).
    if (!response.responseXML) {
      responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }

    var from = response.responseText.indexOf('<thead><tr><th>Coord</th><th>Astro</th><th>Base</th><th>Owner</th><th>Debris</th><th>Occupied by</th><th>Fleets</th> </tr></thead>');
    var to = response.responseText.length;    
    var text = response.responseText.substr(from, to);    
    var to2 = text.indexOf('</tbody>');
    var from2  = text.indexOf('<a href=');    
    text = text.substr(from2, to2);
    if (text.indexOf('Asteroid Belt') > -1) {
         GM_openInTab(uri);
    }  
    
  
    
  }
});
  }
}

function openBase(text) {
   var div = document.createElement('div');
   div.innerHTML = text;
   var el = div.getElementsByTagName('a');
   for (var i=0;i<el.length;i++) {       
       if ( el[i].href.match(/base/) ) {             
          GM_openInTab(el[i]);
       }                 
   }
}




