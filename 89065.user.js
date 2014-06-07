// ==UserScript==
// @name           Madden Ultimate Team Collection Checklist
// @namespace      http://maddenultimate.com
// @include        http://maddenultimate.com/cards/search.php*collection1=By+Collection*
// @include        http://maddenultimate.com/cards/m11search.php*collection1=By+Collection*
// @include        http://maddenultimate.com/cards/collection*
// ==/UserScript==

var playerID;
var playerID2;
var colElement;
var myString;
var myCount = 0;
var amount;
var thisURL = document.URL;
var dTemp;


var checked = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%04%03%00%00%00%7F%1C%D2%8E%00%00%000PLTE333%FF%CC%FF%DD%DD%DDfff%EE%EE%EE%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00w_%5CJ%00%00%00%02tRNS%FF%00%E5%B70J%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%003IDAT%08%99c%10%04%01%06AcccA%06%E1%D0%D0PC%06%E1%20%25U%20%A9%C4%A0%04'%9D%94T%80%A4%8B%8B%8B!%83%20%03%03%10%83u%01%00%D4%7C%06%94%2F%D1Ae%00%00%00%00IEND%AEB%60%82";

var unchecked = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%08%06%00%00%00%8D2%CF%BD%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%004IDAT(Sc%FC%0F%04%0C%C4%00%90B%10HKK%C3%8Aa%F2%0C0E0%01t%1Ad%00%D8%D6a%A7%10%E4!ccc%AC%18%25xp%05%0D%B28%00o%8D%3C%07K%8Ay%A6%00%00%00%00IEND%AEB%60%82";

var headerLocations = document.evaluate("//td[@width='200']",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var headerLocation = headerLocations.snapshotItem(0);
colElement = document.createElement("td");
colElement.innerHTML = '&#10003;';	
headerLocation.parentNode.insertBefore(colElement,headerLocation);


var playerIDs = document.evaluate("//td[@id]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


var playerID2s = document.evaluate("//td/@id",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


var d = GM_getValue("mutChecklist","");

var selectWhat = GM_getValue("mutSelect","");

var playerID2Split;

for (var i=0;i < playerIDs.snapshotLength;i++)
{

	playerID = playerIDs.snapshotItem(i);
	playerID2 = playerID2s.snapshotItem(i);

	playerID2Split = playerID2.nodeValue;
	var playerID2SplitArray = playerID2Split.split('|');
	

	colElement = document.createElement("td");


	myString = playerID2SplitArray[0] + "_t";

	if(d.search(myString) != -1){
  

		//colElement.innerHTML = '<input type="checkbox" checked value='+ playerID2.nodeValue +'>';
		colElement.innerHTML = '<img src="' + checked + '" style="cursor: pointer;" title="Remove checked status" value="' + playerID2SplitArray[0] + '" border="0">';		

		playerID.parentNode.insertBefore(colElement,playerID);

		myCount++;

	}
	else
	{


		//colElement.innerHTML = '<input type="checkbox" value='+ playerID2.nodeValue +'>';
		colElement.innerHTML = '<img src="' + unchecked + '" style="cursor: pointer;" title="Mark as checked" value="' + playerID2SplitArray[0] + '" border="0">';

		playerID.parentNode.insertBefore(colElement,playerID);

	}

}

amount = myCount + "/" + i;

var tableEnds = document.evaluate("//br[@id='tableEnd']",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var tableEnd = tableEnds.snapshotItem(0);
var myButton = document.createElement("td");
myButton.setAttribute('class', 'text11'); 

myButton.innerHTML = amount + "<br><br><input type='button' value='Select All'/>&nbsp;<input type='button' value='Unselect All'/>";

tableEnd.parentNode.insertBefore(myButton,tableEnd);




document.addEventListener('click', function(event) {




	if(event.target.getAttribute('title')=='Remove checked status'){

		var d = GM_getValue("mutChecklist","");

		if(d !=''){

			if(d.search(event.target.getAttribute('value')) != -1){


				d=d.replace(d.substring(d.search(event.target.getAttribute('value')),d.search(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),event.target.getAttribute('value') + "_f");

			}
			else
			{
				
				d = d + event.target.getAttribute('value') + "_f, ";


			}
		

		}
		else
		{	

			d = d + event.target.getAttribute('value') + "_f, ";

		}	

			

		GM_setValue("mutChecklist", d);

		event.target.setAttribute('src', unchecked);
		event.target.setAttribute('title', 'Mark as checked');	
	        location.href = thisURL;


	}
	else if(event.target.getAttribute('title')=='Mark as checked')
	{

		var d = GM_getValue("mutChecklist","");

		

		if(d !=''){

			if(d.search(event.target.getAttribute('value')) != -1){

			d=d.replace(d.substring(d.search(event.target.getAttribute('value')),d.search(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),event.target.getAttribute('value') + "_t");


			}
			else
			{
				
				d = d + event.target.getAttribute('value') + "_t, ";

			}



		}
		else
		{

			d = d + event.target.getAttribute('value') + "_t, ";
			
		}
		

		GM_setValue("mutChecklist", d);		

		event.target.setAttribute('src', checked);
		event.target.setAttribute('title', 'Remove checked status');	
                location.href = thisURL;	

	}
/*
	if (event.target.getAttribute('type') == "checkbox"){

		var d = GM_getValue("mutChecklist","");

	
		if(d.search(event.target.getAttribute('value')) != -1){


			if(event.target.checked == true){
		
				d=d.replace(d.substring(d.search(event.target.getAttribute('value')),d.search(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),event.target.getAttribute('value') + "_t");

				GM_setValue("mutChecklist", d);

			}
			else
			{
				
					
				d=d.replace(d.substring(d.search(event.target.getAttribute('value')),d.search(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),event.target.getAttribute('value') + "_f");

			

				GM_setValue("mutChecklist", d);


			}
		
			
		}
		else
		{

			if(event.target.checked == true){

				GM_setValue("mutChecklist", d + event.target.getAttribute('value') + "_t, ");
			

			}
			else
			{

				GM_setValue("mutChecklist", d + event.target.getAttribute('value') + "_f, ");
			

			}			

		}

	}
*/
	if (event.target.getAttribute('value') == "Select All"){

		var d = GM_getValue("mutChecklist","");

		for (var i=0;i < playerIDs.snapshotLength;i++)
		{

			playerID = playerIDs.snapshotItem(i);
			playerID2 = playerID2s.snapshotItem(i);

			playerID2Split = playerID2.nodeValue;
			var playerID2SplitArray = playerID2Split.split('|');

			myString = playerID2SplitArray[0];
			
			
			if(d.search(myString) != -1){
				
				d = d.replace(d.substring(d.search(myString),(d.search(myString) + myString.length + 3)),myString + "_t,");
			
				GM_setValue("mutChecklist", d);

			}
			else
			{
				
				d = d + myString + "_t, ";
			
			}
			
				
		}

		GM_setValue("mutChecklist", d);
		location.href = thisURL;
		
		
	}	

	if (event.target.getAttribute('value') == "Unselect All"){

		var d = GM_getValue("mutChecklist","");

		for (var i=0;i < playerIDs.snapshotLength;i++)
		{

			playerID = playerIDs.snapshotItem(i);
			playerID2 = playerID2s.snapshotItem(i);

			playerID2Split = playerID2.nodeValue;
			var playerID2SplitArray = playerID2Split.split('|');

			myString = playerID2SplitArray[0];
			
			
			if(d.search(myString) != -1){
				
		
				d = d.replace(d.substring(d.search(myString),(d.search(myString) + myString.length + 3)),myString + "_f,");
	
				GM_setValue("mutChecklist", d);

			}
			else
			{
				
				d = d + myString + "_f, ";
			
			}
			
				
		}

		GM_setValue("mutChecklist", d);
		location.href = thisURL;
		
		
	}	


}, true);
