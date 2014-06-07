// ==UserScript==

// @name           Galaxy Scan v2

// @namespace      Starfleet Commander

// @include        http://*playstarfleet*.com/galaxy/*

// ==/UserScript==

 

var scanning = GM_getValue("scanning");

var mySystem = document.getElementById("solar_system").value;

var myGalaxy = document.getElementById("galaxy").value;

 

function getElementsByClassName(cl,obj)

{

  var retnode = [];

  var myclass = new RegExp('\\b'+cl+'\\b');

 

  var elem = obj.getElementsByTagName("span");

  for (var i = 0; i < elem.length; i++)

  {

    var classes = elem[i].className;

    if (myclass.test(classes)) retnode.push(elem[i])

  }

  return retnode;

}

 

 

function getPlanetData(slot)

{

  // komplette <tr> mit den klassen

  // name, debris, player, status, alliance, actions

  var mySlot = document.getElementById("planet_"+slot);

 

  var myData = getElementsByClassName("not_attackable",mySlot);

  if( ! myData.length ) myData = getElementsByClassName("attackable",mySlot);

 

  if( ! myData.length )

  {

    myData = mySlot.getElementsByTagName("td");

    if( myData[1].innerHTML.indexOf("Unavailable") > -1 )

    {

      myPlanet   = "Unavailable";

      myPlayer   = "Heph Slot";

      myRank     = "Heph Slot";

      myAlliance = "Heph Slot";

      myStatus   = "";

      myMoon     = "";

      myNPC      = "";

     }

     else

       return;

    }

    else

    {

      myPlanet = myData[0].innerHTML;

      myPlayer = myData[1].innerHTML;

 

      myMoon = document.getElementById("planet_"+slot+"m");

      myMoon = ( myMoon ? myMoon.getElementsByTagName("span")[0].innerHTML : "&nbsp;" );

 

      myNPC  = document.getElementById("planet_"+slot+"e");

      myNPCName = ( myNPC ? myNPC.getElementsByTagName("td")[1].innerHTML : "&nbsp;" );

      myNPCStatus = ( myNPC ? myNPC.getElementsByTagName("span")[0].innerHTML : "&nbsp;" );

 

      myAlliance = ( myData[2] ? myData[2].getElementsByTagName("a")[0].innerHTML : "&nbsp;" );

      myStatus = mySlot.getElementsByTagName("td")[4].innerHTML;

 

      if( myData[1].getElementsByTagName("span").length > 1 )

      {

        myRank = myData[1].getElementsByTagName("span")[1].innerHTML;

        //myStatus = myData[1]. getElementsByTagName("span")[0].innerHTML;

      } 

      else

      {

        myRank = myData[1].getElementsByTagName("span")[0].innerHTML;

        //myStatus = "&nbsp;";

      }

 

      playerLength = myPlayer.indexOf("span");

      if ( playerLength > 0 ) myPlayer = myPlayer.substring(0, playerLength-2 );

    }

 

    myNPC = document.getElementById("planet_"+slot+"e");

 

 

 

    var dataString = GM_getValue("data");

    if( dataString == undefined ) dataString = "<div><table width=100%><tr>" +

                                               "<td><b><u>Location</u></b></td>" +

                                               "<td><b><u>Planet Name</u></b></td>" +

                                               "<td><b><u>Player Name</u></b></td>" +

                                              "<td><b><u>Rank</u></b></td>" +

                                               "<td><b><u>Alliance</u></b></td>" +

                                               "<td><b><u>Status</u></b></td>" +

                                               "<td><b><u>Moon</u></b></td>" +

                                               "<td colspan=2><b><u>NPC</u></b></td>" +

                                               "</tr>";

 

    dataString += "<tr>" +

                "<td><a href='show?galaxy="+myGalaxy+"&solar_system="+mySystem+"'>" +                    "["+myGalaxy+":"+mySystem+":"+slot+"]</a></td>"+

                "<td>" + myPlanet    + "</td>" +

                "<td>" + myPlayer    + "</td>" +

                "<td>" + myRank      + "</td>" +

                "<td>" + myAlliance  + "</td>" +

                "<td>" + myStatus    + "</td>" +

                "<td>" + myMoon      + "</td>" +

                "<td>" + myNPCName   + "</td>" +

                "<td>" + myNPCStatus + "</td>" +

                "</tr>";

    dataString = dataString.split("\n");

    dataString = dataString.join(" ");

    dataString = dataString.split(" ");

    dataString = dataString.join(" ");

 

  GM_setValue("data", dataString);

}

 

 

function hideScanLink() {

  document.getElementById("myText1").innerHTML = "&nbsp;";

  document.getElementById("myBreak1").innerHTML = "&nbsp;";

}

 

function hideViewLink() {

  document.getElementById("myText2").innerHTML = "&nbsp;";

  document.getElementById("myBreak1").innerHTML = "&nbsp;";

}

 

function hideLinks() {

  hideScanLink();

  hideViewLink();

}

 

function incrementSystem() {

  /*== NOTE: This does NOT go to the next system, it just changes the 2 to a 3, you still have to press [Go] ==*/

  var myForm = document.getElementById("set_coordinates_form");

  myLnk = myForm.getElementsByTagName("a")[3];

  var evObj = document.createEvent('MouseEvents');

  evObj.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);

  myLnk.dispatchEvent(evObj);

}

 

function beginScanning() { // Called from Hyperlink

  GM_deleteValue("data");

  GM_setValue("scanning",1);

  for (i=1;i<=15;i++) { getPlanetData(i); }

  incrementSystem();

  hideScanLink();

  document.getElementById("pressGo").innerHTML = "&nbsp;&nbsp;|&nbsp;&nbsp;Press [Go] to Scan next System.";

}

 

 

function showData() {  // Called from Hyperlink

  document.getElementById("planets").innerHTML = GM_getValue("data") + "</table></div>";

  GM_deleteValue("scanning");

  hideLinks();

  document.getElementById("pressGo").innerHTML = "&nbsp;";

}

 

 

function createLinks() {

  var linkLoc = document.getElementById("header");

  foo = document.createElement("a");

  foo.id = "myText1";

  foo.innerHTML = "<u>Scan galaxy from here</u>";

  foo.addEventListener('click', function() { beginScanning(); }, false);

  linkLoc.appendChild(foo);

 

  foo = document.createElement("span");

  foo.id = "myBreak1";

  foo.innerHTML = "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;";

  linkLoc.appendChild(foo);

 

  /*========= Create Link to View last Scan (And End Scan) ===========*/

  foo = document.createElement("a");

  foo.id = "myText2";

  foo.innerHTML = "<u>View current scan (ends scan)</u>";

  foo.addEventListener('click', function() { showData(); }, false);

  linkLoc.appendChild(foo);

 

  foo = document.createElement("span");

  foo.id = "pressGo";

  foo.innerHTML = (scanning ? "&nbsp;&nbsp;|&nbsp;&nbsp;Press [Go] to scan next System" : "&nbsp;" );

  linkLoc.appendChild(foo);

}

 

 

createLinks();

 

if( scanning ) {

  incrementSystem();

  document.getElementById("myText1").style.display = "none";

  document.getElementById("myBreak1").style.display = "none";

  for (i=1;i<=15;i++) { getPlanetData(i); }

}