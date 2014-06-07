// ==UserScript==
// @name           User Profiles
// @namespace      userprofiles
// @description    Insert of HTML into user profiles
// @include        http://www.lostpower.com/game/viewuser.php?*
// ==/UserScript==
//var bacon ="Bacon"
//<form method="POST" action="spy.php"><input type="hidden" name="u" value="21466"><input type="submit" value="Hire the Spy">

//	It will cost $45,998  to spy on Lunatik...<br /><br />
//	<form method='POST' action='spy.php'>
//	<input type='hidden' name='u' value='21823' />
//	<input type='submit' value='Hire the Spy' />
//	</form>
//var s;
//(function() {
// var textnodes;

//textnodes = document.evaluate( "//body//text()", document, null,
//XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//for (var i = 0; i < textnodes.snapshotLength; i++) {
//	if (textnodes.snapshotItem(i).data == "Location:") {
//				s = textnodes.snapshotItem(i+1).data;
//	}
//energy = textnodes.snapshotItem(i).data.replace(/%/g,'');
//}
//})();
var staffsection = document.getElementsByClassName('userAdmin');
var s,bacon,loc;
var replacements, regex, key, textnodes, node;

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    if (s=="Location:"){ 
	bacon=textnodes.snapshotItem(i+1).data;
	var LostCity = /Downtown/;
	if (LostCity.test(bacon)) {
	loc="Downtown";
	bacon="1";
	}
	var LostCity = /Southwest/;
	if (LostCity.test(bacon)) {
	loc="Southwest";
	bacon="2";
	}
	var LostCity = /Industrial Hell/;
	if (LostCity.test(bacon)) {
	loc="Industrial Hell";
	bacon="3";
	}
	var LostCity = /Mexico/;
	if (LostCity.test(bacon)) {
	loc="Mexico";
	bacon="4";
	}
	var LostCity = /Hollywood/;
	if (LostCity.test(bacon)) {
	loc="Hollywood";
	bacon="5";
	}
	var LostCity = /The Hills/;
	if (LostCity.test(bacon)) {
	loc="The Hills";
	bacon="6";
	}
	var LostCity = /Ashland Groves/;
	if (LostCity.test(bacon)) {
	loc="Ashland Groves";
	bacon="7";
	}
	var LostCity = /Metropolis/;
	if (LostCity.test(bacon)) {
	loc="Metropolis";
	bacon="8";
	}
	var LostCity = /Outlands/;
	if (LostCity.test(bacon)) {
	loc="Outlands";
	bacon="9";
	}
	var LostCity = /Sunset Point/;
	if (LostCity.test(bacon)) {
	loc="Sunset Point";
	bacon="10";
	}
	var LostCity = /Lost City/;
	if (LostCity.test(bacon)) {
	loc="Lost City";
	bacon="11";
	}
	var LostCity = /Death Valley/;
	if (LostCity.test(bacon)) {
	loc="Death Valley";
	bacon="12";
	}
	var LostCity = /Imperial Sand Dunes/;
	if (LostCity.test(bacon)) {
	loc="Imp Sand Dunes";
	bacon="13";
	}
	var LostCity = /Dark City/;
	if (LostCity.test(bacon)) {
	loc="Dark City";
	bacon="14";
	}
	var LostCity = /Desert Oasis/;
	if (LostCity.test(bacon)) {
	loc="Desert Oasis";
	bacon="22";
	}
	var LostCity = /Lost Angeles/;
	if (LostCity.test(bacon)) {
	loc="Lost Angeles";
	bacon="187";
	}
	var LostCity = /Area 51/;
	if (LostCity.test(bacon)) {
	loc="Area 51";
	bacon="15";
	}
	var LostCity = /Lost Canyon Lake/;
	if (LostCity.test(bacon)) {
	loc="Lost Canyon Lake";
	bacon="16";
	}
    }
    }

newdiv = document.createElement("div"); //Creates the div
newdiv.className = "x"; //Setting div attribs
newdiv.id = "mine";
staffsection[0].appendChild(newdiv);	// or some other node
//sometext = document.createTextNode("what a way to spend a life");
mydiv = document.getElementById("mine");	// finds it
//mydiv.appendChild(s);
		newdiv.innerHTML+= 
			"<form name='spy' method='POST' action='spy.php'>" +
			"<input type='hidden' name='u' value="+ location.href.substring(45) +" />" +
			"<input type='submit' value='Spy' />" +
			"</form><br><b>" + "<a href='http://www.lostpower.com/game/driving.php?to="+ bacon + "'>Drive("+ loc +")</a>"+
			"<br><a href='http://www.lostpower.com/game/hospital.php?u="+ location.href.substring(45) +"&heal=1'>Bribe out</a></b>";



//switch (s) {
//Case 1: result = 'Downtown'; alert("downtown!");
//}
//Downtown = 1
//Southwest = 2
//Industrial Hell = 3
//Mexico = 4
//Hollywood = 5
//The Hills = 6
//Ashland Groves = 7
//Metropolis = 8
//Outlands = 9
//Sunset Point = 10
//Lost City = 11
//Death Valley = 12
//Imperial Sand Dunes = 13
//Dark City = 14
//Desert Oasis = 22
//Lost Angeles = 187
//Area 51 = 15
//Lost Canyon Lake = 16





