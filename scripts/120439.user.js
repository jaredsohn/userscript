// ==UserScript==
// @name           Planet Cleanup
// @namespace      Stardrift Empires
// @include        http://stardriftempires.com/fleet*
// ==/UserScript==

var location = document.getElementsByTagName("h3")[0];

var planetsTable = document.createElement("table");
var planetsBody = document.createElement("tbody");
var planetsRow1 = document.createElement("tr");
var planetsRow2 = document.createElement("tr");

planetsRow1.setAttribute("valign", "top");

location.innerHTML = "";
var previousPlanet = -1;
var listItems;

var selectList = document.getElementById("planet_drop_down");
if( selectList ) {
    listItems = selectList.getElementsByTagName("option");
    for( x = 0; x < listItems.length; x++ ) {
        addLink( listItems[x].getAttribute("tag"), x, listItems[x].getAttribute("type") == "moon", listItems[x].text );
    }
} else {
    var allDivs = document.getElementsByTagName("div");
    selectList = 0;
    for( x = 0; x < allDivs.length; x++ ) if( allDivs[x].className == "planet_selector" ) selectList = allDivs[x];
    if( ! selectList ) return;

    for( x = 0; x < 5; x++ ) location.appendChild(document.createElement("br") );
    selectList.setAttribute( "style", "top: -100px; width: 760px !important;" );
    
    var listItems = selectList.getElementsByTagName("div");
    var listLocation; var loseClear; 
    
    for( x = 0; x < listItems.length; x++ ) {
        if( listItems[x].className == "planets_box" ) {  
            listItems[x].setAttribute( "style", "width: 760px !important;" );
            if( ! listLocation ) { 
                listLocation = listItems[x]; 
                movePlanets = listItems[x].getElementsByTagName("div");
                for( y = 0; y < movePlanets.length; y++ ) { 
                    if( movePlanets[y].className == "clear" ) loseClear = movePlanets[y]; 
                    if( movePlanets[y].className == "planet_choice" || movePlanets[y].className == "planet_choice selected") {
                        var moon; var allSpans = movePlanets[y].getElementsByTagName("span");
                        for( z = 0; z < allSpans.length; z++ ) if( allSpans[z].className == "planet_type" ) moon = ( allSpans[z].innerHTML == "moon" );
                        movePlanets[y].setAttribute("style", "width: "+(moon?"32":"62")+"px !important;" );
                        movePlanets[y].getElementsByTagName("img")[0].setAttribute("style", "width: "+(moon?"30":"60")+"px !important; height: "+(moon?"30":"60")+"px !important;");
                    }
                }
            } else {
                movePlanets = listItems[x].getElementsByTagName("div");
                for( y = 0; y < movePlanets.length; y++ ) { 
                    if( movePlanets[y].className == "planet_choice" || movePlanets[y].className == "planet_choice selected" ) {
                        var moon; var allSpans = movePlanets[y].getElementsByTagName("span");
                        for( z = 0; z < allSpans.length; z++ ) if( allSpans[z].className == "planet_type" ) moon = ( allSpans[z].innerHTML == "moon" );
                        movePlanets[y].setAttribute("style", "width: "+(moon?"32":"62")+"px !important;" );
                        movePlanets[y].getElementsByTagName("img")[0].setAttribute("style", "width: "+(moon?"30":"60")+"px !important; height: "+(moon?"30":"60")+"px !important;");
                        listLocation.appendChild(movePlanets[y]);
                    }
                }
                if( loseClear ) listItems[x].appendChild(loseClear);
            }
        }
    }
}

planetsBody.appendChild(planetsRow1);
planetsBody.appendChild(planetsRow2);
planetsTable.appendChild(planetsBody);

location.appendChild(planetsTable);
location.appendChild( document.createElement("p") );

function addLink( img, item, moon, txt ) {
    
    var planetCell1 = document.createElement("td");
    var planetCell2 = document.createElement("td");
    planetCell2.setAttribute("align", "center");
    
    foo = document.createElement("a");
    foo2 = document.createElement("img");
    foo2.setAttribute("src", "http://stardriftempires.com"+img);
    foo2.setAttribute("width", (moon ? "30px" : "60px"));
    foo2.setAttribute("height", (moon ? "30px" : "60px"));
    planetCell1.setAttribute( "width", (moon ? "1px" : "70px") );
    if( moon ) foo2.setAttribute( "style", "position: relative; left: -20px;" );
    foo.appendChild(foo2);
    foo.addEventListener('click', function() { setSelect(item); }, false);
    
    planetCell1.appendChild(foo);
    planetCell1.setAttribute("id", "planetCell"+item);
    if( ! moon ) {    
        foo = document.createTextNode( txt );
        foo2 = document.createElement("span");
        foo2.setAttribute("style", "font-size: 0.5em;");
        foo2.appendChild(foo);
        planetCell2.appendChild(foo2);
    } else {
        planetCell2.appendChild( document.createTextNode(" ") );
    }
    
    planetsRow1.appendChild(planetCell1);
    planetsRow2.appendChild(planetCell2);
}

function setSelect( item ) {
    selectList.options[item].selected = "1";
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change",true,true);
    selectList.dispatchEvent( evt );
    if( previousPlanet != -1 ) document.getElementById("planetCell"+previousPlanet).style.backgroundColor = "transparent";
    document.getElementById("planetCell"+item).style.backgroundColor = "#BBBBBB";
    previousPlanet = item;    
}