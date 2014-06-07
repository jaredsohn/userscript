// ==UserScript==
// @name        All Users Script
// @namespace   Stripes
// @include     http://deathmatch.barafranca.com/*
// @version     1
// ==/UserScript==

var ranksArray = new Array();

if(window.location.href == "http://deathmatch.barafranca.com/allusers.php?start=0&order=lastrank&dead=HIDE&sort=DESC&version=3.5#Script" ) {
	main();
}
if(window.location.href == "http://deathmatch.barafranca.com/menu.php") {
	allTables = document.getElementsByTagName('table');
	myTable = allTables[1];
	myRow = myTable.insertRow(0);
	myCell = myRow.insertCell(0);
	myCell.innerHTML = "<a target=\"main\" href=\"http://deathmatch.barafranca.com/allusers.php?start=0&order=lastrank&dead=HIDE&sort=DESC&version=3.5#Script\" title=\"Returns the number of users per rank. Takes about 5 seconds.\" style=\"color: #FFFFFF; display: block; font-size: 11px; margin: 0; padding: 3px 15px; text-decoration: none;\">Parse Users</a>";

}


function main() {
	start_Array();
	var total_rankers;
	var page_start = 0;
	var link = "";

	while(page_start < 2000) {
			if( ranksArray['nextPage'] == false ) {
				display_results();
				return;
			}
			link = "http://deathmatch.barafranca.com/allusers.php?start="+page_start+"&order=lastrank&dead=HIDE&sort=DESC&version=3.5";
			GM_xmlhttpRequest({
				method: "GET",
				url: link,
				onload: function(response) {
					var body = window.document.createElement("body");
					body.innerHTML = response.responseText;
					ranksParse(body.innerHTML);
					delete(body);
				}
			});
			page_start += 15;
	}
	setTimeout(display_results,5000);

}

function start_Array() {
	ranksArray['EmptySuit'] = 0;
	ranksArray['DeliveryBoy'] = 0;
	ranksArray['Picciotto'] = 0;
	ranksArray['Shoplifter'] = 0;
	ranksArray['Pickpocket'] = 0;
	ranksArray['Thief'] = 0;
	ranksArray['Associate'] = 0;
	ranksArray['Mobster'] = 0;
	ranksArray['Soldier'] = 0;
	ranksArray['Swindler'] = 0;
	ranksArray['Assassin'] = 0;
	ranksArray['LocalChief'] = 0;
	ranksArray['Chief'] = 0;
	ranksArray['Bruglione'] = 0;
	ranksArray['Capodecina'] = 0;
	ranksArray['Godfather'] = 0;
	ranksArray['nextPage'] = true;
}

function ranksParse(str) {
	if(str.match(/(Godfather|First\sLady)/gi)) ranksArray['Godfather'] += str.match(/(Godfather|First\sLady)/gi).length;
	if(str.match(/Capodecina/gi)) ranksArray['Capodecina'] += str.match(/Capodecina/gi).length;
	if(str.match(/Bruglione/gi)) ranksArray['Bruglione'] += str.match(/Bruglione/gi).length;
	if(str.match(/Chief/gi)) ranksArray['Chief'] += str.match(/Chief/gi).length;
	if(str.match(/Local\sChief/gi)) ranksArray['LocalChief'] += str.match(/Local\sChief/gi).length;
	if(str.match(/Assassin/gi)) ranksArray['Assassin'] += str.match(/Assassin/gi).length;
	if(str.match(/Swindler/gi)) ranksArray['Swindler'] += str.match(/Swindler/gi).length;
	if(str.match(/Soldier/gi)) ranksArray['Soldier'] += str.match(/Soldier/gi).length;
	if(str.match(/Mobster/gi)) ranksArray['Mobster'] += str.match(/Mobster/gi).length;
	if(str.match(/Associate/gi)) ranksArray['Associate'] += str.match(/Associate/gi).length;
	if(str.match(/Thief/gi)) ranksArray['Thief'] += str.match(/Thief/gi).length;
	if(str.match(/Pickpocket/gi)) ranksArray['Pickpocket'] += str.match(/Pickpocket/gi).length;
	if(str.match(/Shoplifter/gi)) ranksArray['Shoplifter'] += str.match(/Shoplifter/gi).length;
	if(str.match(/Picciotto/gi)) ranksArray['Picciotto'] += str.match(/Picciotto/gi).length;
	if(str.match(/Delivery\s(Boy|Girl)/gi)) ranksArray['DeliveryBoy'] += str.match(/Delivery\s(Boy|Girl)/gi).length;
	if(str.match(/Empty-Suit/gi)) ranksArray['EmptySuit'] += str.match(/Empty-Suit/gi).length;
	if( str.match(/<center/gi).length == 1 ) {
		ranksArray['nextPage'] = false;
	}
}

function display_results() {
	var a = "Empty-Suit: " + ranksArray['EmptySuit']+ "\n";
	a += "Delivery Boy: " + ranksArray['DeliveryBoy']+ "\n";
	a += "Picciotto: " + ranksArray['Picciotto']+ "\n";
	a += "Shoplifter: " + ranksArray['Shoplifter']+ "\n";
	a += "Pickpocket: " + ranksArray['Pickpocket']+ "\n";
	a += "Thief: " + ranksArray['Thief']+ "\n";
	a += "Associate: " + ranksArray['Associate']+ "\n";
	a += "Mobster: " + ranksArray['Mobster']+ "\n";
	a += "Soldier: " + ranksArray['Soldier']+ "\n";
	a += "Swindler: " + ranksArray['Swindler']+ "\n";
	a += "Assassin: " + ranksArray['Assassin']+ "\n";
	a += "Local Chief: " + ranksArray['LocalChief']+ "\n";
	a += "Chief: " + (ranksArray['Chief']-ranksArray['LocalChief']) + "\n";
	a += "Bruglione: " + ranksArray['Bruglione']+ "\n";
	a += "Capodecina: " + ranksArray['Capodecina']+ "\n";
	a += "Godfather: " + ranksArray['Godfather'] + "\n"
	//a += "(" + ranksArray['nextPage'] + ")\n";
	a += "\n Queres enviar esta informação para a base de dados?";
	
	if(confirm(a)) sendToDB();
}

function sendToDB() {
	var myLink = "http://www.script.herobo.com/dmranks.php?"
	myLink += "es=" + ranksArray['EmptySuit'];
	myLink += "&db=" + ranksArray['DeliveryBoy'];
	myLink += "&pi=" + ranksArray['Picciotto'];
	myLink += "&sl=" + ranksArray['Shoplifter'];
	myLink += "&pp=" + ranksArray['Pickpocket'];
	myLink += "&t=" + ranksArray['Thief'];
	myLink += "&ac=" + ranksArray['Associate'];
	myLink += "&mob=" + ranksArray['Mobster'];
	myLink += "&so=" + ranksArray['Soldier'];
	myLink += "&sw=" + ranksArray['Swindler'];
	myLink += "&assa=" + ranksArray['Assassin'];
	myLink += "&lc=" + ranksArray['LocalChief'];
	myLink += "&ch=" + (ranksArray['Chief']-ranksArray['LocalChief']);
	myLink += "&brug=" + ranksArray['Bruglione'];
	myLink += "&cd=" + ranksArray['Capodecina'];
	myLink += "&gf=" + ranksArray['Godfather'];
	var currentTime = new Date();
	myLink += "&day=" + currentTime.getDate();
	myLink += "&month=" + (currentTime.getMonth() + 1);
	myLink += "&year=" + currentTime.getFullYear();
	myLink += "&hour=" + currentTime.getHours();
	myLink += "&minute=" + currentTime.getMinutes();
	//alert(myLink);
	GM_xmlhttpRequest({
		method: "GET",
		url: myLink,
		onload: function(response) {
			alert(response.responseText.match(/[\w\s]*/));
		}
	});
}