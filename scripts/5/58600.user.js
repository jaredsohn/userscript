// ==UserScript==
// @name           ExtraVillagersAssignment
// @namespace      http://userscripts.org
// @description    Adds a button to each row of the Villagers task section of the resources page which sets all unemployed villagers to gather that resource.
// @include        http://www.mythicwars.com/mythos/g_resources.asp*
// ==/UserScript==


// Get the population table element
var popTable = document.getElementsByTagName('table')[20];

// Get villagers info as a string.  Parsing thru and saving each just incase they are needed for later updates.
var villagersInfo = popTable.rows[3].cells[1].innerHTML;
villagersInfo = villagersInfo.substr(villagersInfo.indexOf('>')+1);
var currentVillagers = parseInt(villagersInfo.substring(0, villagersInfo.indexOf('&')).replace(/,/, ""));
villagersInfo = villagersInfo.substr(villagersInfo.indexOf('>')+1);
var employedVillagers = parseInt(villagersInfo.substring(0, villagersInfo.indexOf('&')).replace(/,/, ""));
villagersInfo = villagersInfo.substr(villagersInfo.indexOf('>')+1);
var gatheringVillagers = parseInt(villagersInfo.substring(0, villagersInfo.indexOf('&')).replace(/,/, ""));
villagersInfo = villagersInfo.substr(villagersInfo.indexOf('>')+1);
var unEmployedVillagers = parseInt(villagersInfo.substring(0, villagersInfo.indexOf('&')).replace(/,/, ""));
villagersInfo = villagersInfo.substr(villagersInfo.indexOf('>')+1);
villagersInfo = villagersInfo.substr(villagersInfo.indexOf('>')+1);
var unFilledJobs = parseInt(villagersInfo.substring(0, villagersInfo.indexOf('&')).replace(/,/, ""));

var availableVillagers = currentVillagers - employedVillagers - unFilledJobs;
if(availableVillagers < 0)
  availableVillagers = 0;


// Get the villagers task table element
var villagersTaskTable = document.getElementsByTagName('table')[21];

// Change the header to span across the new cell
villagersTaskTable.rows[0].cells[0].setAttribute('colspan','5');

// Add a new subheader
var newSubHeader = document.createElement('td');
newSubHeader.className = 'mainsubsubheader';
newSubHeader.innerHTML = "&nbsp;&nbsp;All&nbsp;&nbsp;";
villagersTaskTable.rows[1].appendChild(newSubHeader);

for(var i=2; i<villagersTaskTable.rows.length-1; i++)
{
	// Create new button to assign all available villagers
	var assignAllInput = document.createElement('input');
	assignAllInput.setAttribute('type','button');
	assignAllInput.setAttribute('value',availableVillagers);
	assignAllInput.setAttribute('class','button');

	var firstTextField;
	var secondTextField;
	var thirdTextField;
	if(i==2) {
		firstTextField  = 'document.getElementsByTagName("form")[0][0].value="'+availableVillagers+'";';
		secondTextField = 'document.getElementsByTagName("form")[0][2].value="0";';
		thirdTextField  = 'document.getElementsByTagName("form")[0][4].value="0";';
	}
	else if(i==3) {
		firstTextField  = 'document.getElementsByTagName("form")[0][0].value="0";';
		secondTextField = 'document.getElementsByTagName("form")[0][2].value="'+availableVillagers+'";';
		thirdTextField  = 'document.getElementsByTagName("form")[0][4].value="0";';
	}
	else if(i==4) {
		firstTextField  = 'document.getElementsByTagName("form")[0][0].value="0";';
		secondTextField = 'document.getElementsByTagName("form")[0][2].value="0";';
		thirdTextField  = 'document.getElementsByTagName("form")[0][4].value="'+availableVillagers+'";';
	}
	var submitIt = 'document.getElementsByTagName("form")[0].submit();';
	assignAllInput.setAttribute('onClick', firstTextField + secondTextField + thirdTextField + submitIt);
	//assignAllInput.style.width="4em";
	
	// Create a new column
	var newCol = document.createElement('td');
	newCol.appendChild(assignAllInput);
	villagersTaskTable.rows[i].appendChild(newCol);
}