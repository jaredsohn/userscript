// ==UserScript==
// @name           Strat-O-Matic Salary Calculator
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic*
// ==/UserScript==

var myTeam;
var myLink,myLink2;
var myClick,myClick2;
var playerName;
var mySalary,mySalary2;
var myBullets,myBullets2;
var salaryLeft;
var freeAgent;
var myLocation2;
var my_team_salary2;
var inputName, inputValue;
var thisURL = document.URL;
var myURL;
var myRecord;

var minus= "data:image/gif,GIF"+
"89a%0A%00%0A%00%B3%00%00%F9%3D%3D%BB%04%04%FBvv%FC%98%96%F9CC%F9LL%F6AB%F9KK%F9%3E%3E%F966%F9DD%F9%" +
"3A%3A%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%0C%00%2C%00%00%00%00%0A%00%0A%00%00%04%15" +
"%90%C9I%AB%BDT%80%BD)%18%03%40%2CY%60%9AX%AA%AET%04%00%3B";

var add = "data:image/gif,GIF" + 
"89a%0A%00%0A%00%F7%00%00Y%BDM%23%88%3F%84%D6%60%5D%C6RX%BBLF%A8%3CB%A4%3A%3A%9B2D%A6%3B5%95-K%AEA%3F" +
"%A17H%AB%3FQ%B4F%3D%9FX%3E%9F68%9903%93%2B%40%A27B%A49V%BAK%3C%9D47%97%2F%FF%FF%FF%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%17%00%2C%00%0" +
"0%00%00%0A%00%0A%00%00%08*%00%2F%08%1CH%90%20%00%00%05%07%02h%90%F0%20%00%05%0C%0A%10%24%20%60%00%82" +
"%09%0B%12V%80%90P%A0%85%08%1DC%8A%1C%19%10%00%3B";

var myDiv = document.createElement('div');

var my_team_salary = document.evaluate("//tr/td[1][contains(string(),'Cash')]/text()[5]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i2 = 0; i2 < my_team_salary.snapshotLength; i2++) {
	my_team_salary = my_team_salary.snapshotItem(0);
	my_team_salary2 = String(my_team_salary.nodeValue);
	my_team_salary2 = my_team_salary2.replace(/,/g,'');
	my_team_salary2 = my_team_salary2.replace(/^\s+|\s+$/g,'');
	my_team_salary2 = parseFloat(my_team_salary2);
	my_team_salary2 = my_team_salary2/1000000;

}

var myGet = GM_getValue('myTransaction2',"");

if (myGet != "")
{

	myDiv.innerHTML = '<br><b>Proposed Transactions: </b><br> ' + myGet;
	myDiv.innerHTML = myDiv.innerHTML + '<a href=' + thisURL + '>Clear Proposed Transactions</a>';
}


my_team_salary.parentNode.insertBefore(myDiv,my_team_salary.nextSibling);

if(document.location == "http://fantasygames.sportingnews.com/stratomatic/team/team.html"){

	var playerNames =  document.evaluate("//a[contains(@href,'&year=')]/text()",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var j = 0; j < playerNames.snapshotLength; j++) {
		playerName = playerNames.snapshotItem(j);
		playerName = playerName.nodeValue;

	var myTeams = document.evaluate("//a[contains(@href,'release_pickup_option.html?')]",	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var mySalaries = document.evaluate("//a[contains(@href,'release_pickup_option.html?')]/text()",	
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		mySalary = mySalaries.snapshotItem(j);

		myLink = document.createElement("a");
		myTeam = myTeams.snapshotItem(j);
		myLink.innerHTML = '<a href="#' + j + '"onclick="bullet"><img src=' + minus + ' border="0" hspace = "4"></a>';
		myTeam.parentNode.insertBefore(myLink,myTeam.nextSibling);

	}//for (var i = 0; i < playerNames.snapshotLength; i++) {

	var myRecords = document.evaluate("//tr/td[1][contains(string(),'Record:')]/text()[3]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		myRecord = myRecords.snapshotItem(0);
		myRecord = myRecord.nodeValue;
		myRecord = myRecord.substring(0,myRecord.indexOf("("));

	document.addEventListener('click', function(event) {
    
        	if (event.target.text == "Clear Proposed Transactions"){
			GM_setValue('mySalaryGM', "");
			GM_setValue('myTransaction2', "");
        	}

	if (event.target.parentNode.href != undefined)
	{
	

		myClick = event.target.parentNode.href;
		myClick = myClick.substring(myClick.lastIndexOf("#") + 1);

		var myBullet = document.evaluate("//a[contains(@onClick,'bullet')]/img",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			myBullets = myBullet.snapshotItem(myClick);
			mySalary = mySalaries.snapshotItem(myClick).nodeValue;
			mySalary = mySalary.substr(0, mySalary.length - 1);

			/*During the season, you receive 80% of a player's salary when you release him.*/

			if (myRecord != " 0-0 "){

				mySalary = mySalary * .8;
				mySalary = mySalary.toFixed(2);
			}

			/*During the season, you receive 80% of a player's salary when you release him.*/


			salaryLeft = parseFloat(my_team_salary2) + parseFloat(mySalary);
			salaryLeft = salaryLeft.toFixed(2);

			if (GM_getValue('mySalaryGM',"") != ""){

				var salaryLeft = GM_getValue('mySalaryGM',"")
				salaryLeft = parseFloat(salaryLeft) + parseFloat(mySalary);
				salaryLeft = salaryLeft.toFixed(2);
			}


			var myTransaction = GM_getValue('myTransaction2',"") + '<font color="red">- ' + playerNames.snapshotItem(myClick).nodeValue + ' (' + mySalary + ')' + '<br><font color="black"> Cash Left: ' + salaryLeft + '<br>';


			GM_setValue('mySalaryGM', salaryLeft);
			GM_setValue('myTransaction2', myTransaction);


			location.href = "http://fantasygames.sportingnews.com/stratomatic/trade/release_pickup_option.html";
		}

		}, true);

}

if(document.location != "http://fantasygames.sportingnews.com/stratomatic/team/team.html"){

	var myLocation = window.location.href;

	var NURL = new String(window.location.href);

	NURL = NURL.indexOf("release_pickup_confirm.html");

	if (NURL == -1)
	{
		var freeAgents = document.evaluate("//tr/td/a[contains(@href,'?add_id=')]",	
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; i < freeAgents.snapshotLength; i++) {
			myLink2 = document.createElement("a");
			freeAgent = freeAgents.snapshotItem(i);

			myLink2.innerHTML = '<a href="#' + i + '"onclick="bullet"><img src=' + add + ' border="0" hspace = "4">';
			freeAgent.parentNode.insertBefore(myLink2,freeAgent.nextSibling);

		}

	}//if (NURL == -1)

	var inputNames = document.evaluate("//td/form/input[@type='hidden']/@name",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var inputValues = document.evaluate("//td/form/input[@type='hidden']/@value",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	myURL = myLocation;

	for (var j = 0; j < inputNames.snapshotLength - 1; j++) {
		inputName = inputNames.snapshotItem(j);
		inputValue = inputValues.snapshotItem(j);

		if (inputValue.nodeValue.length != 0){

			if (j == 1)
			{
				myURL = myURL + "?" + inputName.nodeValue + "=" + inputValue.nodeValue;
			}
			else
			{
				myURL = myURL + "&" + inputName.nodeValue + "=" + inputValue.nodeValue;
			}

		}

	}


	var playerNames =  document.evaluate("//a[contains(@href,'&year=')]/text()",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var j = 0; j < playerNames.snapshotLength; j++) {
		playerName = playerNames.snapshotItem(j);
		playerName = playerName.nodeValue;

		var mySalaries = document.evaluate("//a[contains(@href,'release_pickup_confirm.html?')]/text()",	
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			mySalary = mySalaries.snapshotItem(j);

	}//for (var i = 0; i < playerNames.snapshotLength; i++) {

	document.addEventListener('click', function(event) {

        	if (event.target.text == "Clear Proposed Transactions"){
			GM_setValue('mySalaryGM', "");
			GM_setValue('myTransaction2', "");
        	}

		if (event.target.parentNode.href != undefined)
		{
	
			myClick2 = event.target.parentNode.href;
			myClick2 = myClick2.substring(myClick2.lastIndexOf("#") + 1);

			var myBullet = document.evaluate("//a[contains(@onClick,'bullet')]/img",
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

				myBullets = myBullet.snapshotItem(myClick2);
				mySalary = mySalaries.snapshotItem(myClick2).nodeValue;
				mySalary = mySalary.substr(0, mySalary.length - 1);

				var salaryLeft = GM_getValue('mySalaryGM',"");
				salaryLeft = salaryLeft - mySalary;
				salaryLeft = salaryLeft.toFixed(2);

				var myTransaction = GM_getValue('myTransaction2',"") + '<font color="green">+ ' + playerNames.snapshotItem(myClick2).nodeValue + ' (' + mySalary + ')' + '<br> <font color="black">Cash Left: ' + salaryLeft + '<br>';

				GM_setValue('myTransaction2', myTransaction);
				GM_setValue('mySalaryGM', salaryLeft);


				location.href = "http://fantasygames.sportingnews.com/stratomatic/team/team.html";

		}

		}, true);

}//if(document.location == "http://fantasygames.sportingnews.com/stratomatic/team/team.html"){

