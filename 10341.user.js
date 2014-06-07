// ==UserScript==
// @name			Syrnia
// @namespace		Syrnia
// @author			NebuneX
// @include			http://www.syrnia.com/*
// @include			http://www.dw-hq.com/*
// @version			1.3.14
// @description		Enhaces the interface, adds some extra features
// ==/UserScript==

var myOptions = [
['Inventory', 'Inventory enhancements'],
['HPCombat', 'HP tooltip (combat)'],
['TravelMap', 'Travel map tooltip'],
['LocationMessages', 'Messages at location'],
['DWMessages', 'Messages on DWHQ'],
['MassMessages', 'Mass message'],
['Quest', 'Quest links'],
['TravelItems', 'Travel items summary'],
['BotFocus', 'Focus on botcheck inputbox'],
['CloseInfo', 'Click to close infobox'],
['MoreStats', 'Enhace stats page'],
['Refresh', 'Refresh links on side frames'],
['TotalInventory', 'Summarize total numbers<BR> in the inventory'],
['ExternalLinksOpen', 'Open external links<BR>upon login'],
['VoteGifts', 'Mark voting pages that<BR>(may) give green gifts'],
['DWFactors', 'Compute the level and XP factors<BR>on clan score (DWHQ)']
];

//Updated on 2007-06-30 using DWHQ info by [Master Traders] NebuneX
var Foods = [
['Beet', '1'],
['Cabbage', '3'],
['Corn', '6'],
['Cucumber', '11'],
['cucumber', '11'],
['Eggplant', '10'],
//['Grain', '0'],
['Green pepper', '8'],
['Onion', '4'],
['Radish', '1'],
['Spinach', '9'],
['Strawberry', '7'],
['Tomato', '5'],
['Beer', '0'],
['Bread', '3'],
['Carrots', '2'],
['Cooked Bass', '13'],
['Cooked Catfish', '5'],
['Cooked Cod', '7'],
['Cooked Frog', '2'],
['Cooked Giantcatfish', '10'],
['Cooked Herring', '5'],
['Cooked Lobster', '12'],
['Cooked Mackerel', '6'],
['Cooked Pike', '8'],
['Cooked Piranha', '3'],
['Cooked Salmon', '9'],
['Cooked Sardine', '4'],
['Cooked Saurus meat', '16'],
['Cooked Shark', '15'],
['Cooked Shrimps', '2'],
['Cooked Swordfish', '14'],
['Cooked Trouts', '7'],
['Cooked Tuna', '10'],
['Elven cocktail', '1'],
['Keg of rum', '0'],
['Pumpkin', '12'],
['Halloween pumpkin', '5'],
['Blue easter egg', '13'],
['Green easter egg', '9'],
['Orange easter egg', '23'],
['Pink easter egg', '20'],
['Purple easter egg', '26'],
['Red easter egg', '5'],
['Yellow easter egg', '17']
];

var Quests = [
['Damsel in destress or just clueless', '16'],
['Damsel in more destress or really clueless?', '17'],
['Earning the family respect', '8'],
['Frogs and Monkeys', '14'],
['Got to love locks', '10'],
['Huge problems', '2'],
['Lonely bard', '15'],
['Monster training', '1'],
['Protect the ancient woods', '12'],
['Sick fisher or sick of fishing?', '13'],
['Slaying the monster', '3'],
['The abandoned Shopping list', '11'],
['The kidnapped lunchbox', '9'],
['Thieving guild trail', '5'],
['Valera Knight', '7'],
['Witch Bluebell 2', '6'],
['Witch Bluebell', '4']
];

var XPs = [0, 1, 12, 48, 130, 283, 537, 922, 1472, 2225, 3219, 4497, 6101, 8079, 10477, 13346, 16736, 20701, 25297, 30580, 36608, 43440, 51140, 59769, 69392, 80074, 91884, 104890, 119161, 134769, 151787, 170288, 190348, 212043, 235451, 260651, 287722, 316746, 347806, 380984, 416365, 454036, 494082, 536592, 581655, 629361, 679800, 733066, 789250, 848448, 910754, 976264, 1045077, 1117288, 1192999, 1272308, 1355317, 1442127, 1532842, 1627565, 1726400, 1829454, 1936832, 2048643, 2164993, 2285993, 2411752, 2542381, 2677992, 2818698, 2964611, 3115845, 3272517, 3434741, 3602635, 3776316, 3955902, 4141512, 4333266, 4531285, 4735691, 4946606, 5164152, 5388453, 5619635, 5857822, 6103141, 6355719, 6615682, 6883160, 7158281, 7441176, 7731975, 8030809, 8337811, 8653112, 8976848, 9309151, 9650156, 10000000, 10358819];

var Horses = ['Beginners horse', 'Brown horse', 'Mule', 'White horse'];

var Boots = ['Leather boots', 'Eagle boots']

var Cookables = [
'Grain',
'Bass',
'Catfish',
'Cod',
'Frog',
'Giantcatfish',
'Herring',
'Lobster',
'Mackerel',
'Pike',
'Piranha',
'Salmon',
'Sardine',
'Saurus meat',
'Shark',
'Shrimps',
'Swordfish',
'Trouts',
'Tuna'
]

var Weaponry = [
'Staff',
'hatchet',
'axe',
'dagger',
'sword',
'mace',
'scimitar',
'Roodarus horn',
'spike',
'club',
'horn',
'machette',
'spear',

'boots',
'gloves',
'chainmail',
'hands',
'helm',
'shield',
'legs',
'plate',
'sabatons',
'mask',
'shirt',
'headdress'
];

var imageMes = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAKAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIRAAAgICAQQDAAAAAAAAAAAAAQIDBAURIQAGEjETFJH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAGBEAAgMAAAAAAAAAAAAAAAAAAAECERL/2gAMAwEAAhEDEQA/ANxRxtyx9u4zZPICxetIkaZaauKxWeRFHDgfFpRvQLKfQcHS2O0IJ6Ry9OxdsXDXvBVknkZyA0ELlV8iSFBY6BJIHsk7JZP21gZ5pJp8JjJJZGLO71IyzMeSSSOSemUMfSxsJhx1OvViZvIpBEqKW4G9Ae+B+dPNPNgQa1R//9k%3D'
var protoMsg = "&nbsp;<img src='" + imageMes + "' style='margin: 0px; display: inline; vertical-align: middle;' title='Send message' border=0>";

var imageRef = 'data:image/gif;base64,R0lGODlhDwAOAPcAAP////7+/v/8//v9//39//z+//3+/8kyLJBKQOXYz8BkSvTf3I+Hcv7//cOxrIlBKcRyV4o6L49ELMF1Voo8Nv/1+P/3+ufX0Yc0NotOQp5nYN5hUd1lVPzh5ero5f/4+/3+79OqqP7//4hSQ71GPP/9/v/4/P36/f/39MKGg//19rhqZLptbf/39+/Py5lEPebY0ZhdSPn379teOpVKPp47K+ja0ZdNTs67t8q0uJthSuvc2JBmRcCwrfbf3dJWO5VoYqowK9ZkU8hTNc6hne3d0vT13oRiU//8+f3/+Z4/Nfz/+v38+qZFMfTj6MWqq7mvofjr6X5WUbublZRCOd5jVIIxJ3JBMPb48v//95NdSv77/NXOxZJ2XcqTjNfl3dWjkPHRzty+umdCR/n29fbk3JJSNKNaVKFubJg4L5o5Luju38w1MINvYKqilf7//P/8/surpLmIZbJWP5lAL7NhVvHx9nEzLrdGOtnV0Ovj471HNohxce3q34hbXOm1q8ZjU9GupMNtV/jP1Z8uLf73/LpVNf/++Z2iiuJqUaNLMMZFPdlhTMFkTnokGK2pqv/q5+9gVLGPiZJQRMm3pfr9/+pgQ4BAOrqmh7tdUMxRQrhcQPfk3Xw5LrdXOPbz4v3z9efU08SNgOnv38BpT//p64xGPsGgnp9sY4VPR/v//shPML8pKr+2mf/48/n/99TDxP/y9e/q6dtTRYVcXm8sKYtkTY48KNSWgebb1oJeTb6plPj7/KRUQplQQNyemv38/8VKMe7n5MlfUfz368GtpuTR1JFAJ6tONdzLw6BHOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA4AAAjvAF99KFSgRAcXCfq4MqFiS4AAZIzFapBMA4JJGVCJQQKggAAntOJQstUL0DA8aS4VY1JpwCAMjiSQEkKixrFbVu5MQXGoDI0mmxTQ6dQGERRJfsbkqGBEiyAID664+cLLQqkFPR7Z4URBjbIItZ74WJGp0QQ5mD5FQZNK1xEpfHaAUbRqhqEYMLCcIlJk1BphYXAh+2EpmK9QSULcYPHrj5c6exglGuJJx4UWkFIQYsVGE4dIVeaY4dHFBqglxEQFOTBrwyIlI3a1YpDrhKo3IAKdeUHFFBAHMrLk0WOAAAERAGTBwsHFg4EBAuAACwgAOw%3D%3D';
var protoRfrR = '&nbsp;<img src = "' + imageRef + '" style="margin: 0px; display: inline;" title="Refresh frame" border=0>';
var protoRfrL = '&nbsp;<img src = "' + imageRef + '" style="margin: 0px; display: inline; vertical-align: middle;" title="Refresh frame" border=0>';

var loc = window.location + '';

function fMain()
{
if (GM_getValue('Inventory', true))
	{
	Inventory();
	}
if (GM_getValue('HPCombat', true))
	{
	HPCombat();
	}
if (GM_getValue('TravelMap', true))
	{
	TravelMap();
	}
if (GM_getValue('LocationMessages', true))
	{
	LocationMessages();
	}
if (GM_getValue('DWMessages', true))
	{
	DWMessages();
	}
if (GM_getValue('MassMessages', true))
	{
	MassMessages();
	}
if (GM_getValue('Quest', true))
	{
	Quest();
	}
if (GM_getValue('TravelItems', true))
	{
	TravelItems();
	}
if (GM_getValue('BotFocus', true))
	{
	BotFocus();
	}
if (GM_getValue('CloseInfo', true))
	{
	CloseInfo();
	}
if (GM_getValue('MoreStats', true))
	{
	MoreStats();
	}
if (GM_getValue('Refresh', true))
	{
	Refresh();
	}
if (GM_getValue('TotalInventory', true))
	{
	TotalInventory();
	}
if (GM_getValue('ExternalLinksOpen', true))
	{
	ExternalLinksOpen();
	}
if (GM_getValue('VoteGifts', true))
	{
	VoteGifts();
	}
if (GM_getValue('DWFactors', true))
	{
	DWFactors();
	}

Options();
}

function myTravel()
{//Travel items
myFrame = document.getElementsByTagName("iframe")[0];
var x;
var y;
var tt;
tt = 0;
x = '';
y = '';
if (myFrame)
	{
	if (myFrame.src.indexOf('http://www.syrnia.com/includes2/inventory.m2h') > -1)
		{
		if (myFrame.contentWindow.document.getElementById('ckh'))
			{
			myTable = myFrame.contentWindow.document.getElementsByTagName("a");
			for (i=0; i<myTable.length; i++)
				{
				if (myTable[i].href.indexOf('unwear=1') > -1)
					{
					myImg = myTable[i].getElementsByTagName("img")[0];
					if (myImg.title.indexOf('Travel time]') > -1)
						{
						tt += parseFloat(myImg.title.split('[')[1].split(' ')[0]);
						}
					for (j=0; j<Boots.length; j++)
						{
						if (myImg.title.indexOf(Boots[j]) > -1)
							{
							x = Boots[j];
							}
						}
					for (j=0; j<Horses.length; j++)
						{
						if (myImg.title.indexOf(Horses[j]) > -1)
							{
							y = Horses[j];
							}
						}
					}
				}
			if (y != '')
				{
				x = y;
				}
			else
				{
				x += (x == '' ? '' : ' & ') + tt + ' tt';
				}
			myBody = document.body;
			mySpan = document.createElement("span");
			mySpan.style.color = "red";
			mySpan.innerHTML = '<CENTER><small>Travel:&nbsp;<B>' + x + '</B><BR></small></CENTER>';
			mySmalls = document.getElementsByTagName("small");
			mySmall = mySmalls[mySmalls.length-1];
			mySmall.parentNode.insertBefore(mySpan, mySmall);
			myTR = mySmall.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			myTR.setAttribute('height', 0)
			}
		else
			{
			myControl = document.createElement("input");
			myControl.type = 'button';
			myControl.value = 'Travel items';
			myControl.id = 'travelItems';
			myControl.addEventListener("click", myTravel, false);
			myControl.style.display = 'none';
			myBody = document.body;
			myBody.appendChild(myControl);
			setTimeout('document.getElementById("travelItems").click();', 900);
			}
		}
	else
		{
		myControl = document.createElement("input");
		myControl.type = 'button';
		myControl.value = 'Travel items';
		myControl.id = 'travelItems';
		myControl.addEventListener("click", myTravel, false);
		myControl.style.display = 'none';
		myBody = document.body;
		myBody.appendChild(myControl);
		setTimeout('document.getElementById("travelItems").click();', 900);
		}
	}
}

function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do{curDate = new Date();}
while(curDate-date < millis);
}

function goMass()
{
myBody = document.body;
myCollection = document.getElementsByTagName("input");
s = document.getElementById("Msubject").value;
b = document.getElementById("Mbody").value;
if (b == '')
	{
	alert ('Please enter a message body');
	document.getElementById("Mbody").focus();
	return;
	}

if (myCollection)
	{
	if (myCollection.length > 0)
		{
		mySpan = document.createElement("span");
		myBody.appendChild(mySpan);
		document.getElementById("topic").value = s;
		document.getElementById("tekst").value = b;
		for (i=0; i<myCollection.length; i++)
			{
			if (myCollection[i].checked && myCollection[i].id!='Mbox')
				{
				document.getElementById("sendto").value = myCollection[i].id;
				myForm.submit();
				alert(myCollection[i].id);//added this both as a confirmation and due to the fact that the windows did not have the time to open when running with no delay (the user is usually taking enough time to allow the window to open :D)
				mySpan.innerHTML += myCollection[i].id + '<BR>';
				}
			}
			mySpan.innerHTML += '<font color="#0033FF">Please check the opened windows for success</font><BR>';
		}
	}
}

function goCheck()
{
myCollection = document.getElementsByTagName("input");
myObject = document.getElementById("Mbox");
if (myCollection && myObject)
	{
	if (myCollection.length > 0)
		{
		for (i=0; i<myCollection.length; i++)
			{
			if (myCollection[i].type == "checkbox" && myCollection[i].type != "Mbox")
				{
				myCollection[i].checked = myObject.checked;
				}
			}
		}
	}
}

function Inventory()
{//HP tooltips (inventory)
if (loc.indexOf('http://www.syrnia.com/includes2/inventory.m2h') > -1)
	{
	myHPs = 0;
	myRaws = 0;
	myBurnt = 0;
	myWeaponry = 0;
	myCollection = document.getElementsByTagName("img");
	if (myCollection)
		{
		if (myCollection.length > 0)
			{
			for (i=0; i<myCollection.length; i++)
				{
				for (j=0; j<Foods.length; j++)
					{
					if (myCollection[i].title.indexOf(Foods[j][0]) > -1 && myCollection[i].title.indexOf('seed') == -1)
						{
						myCollection[i].title += ' [' + Foods[j][1] + ' HP each]';
						myCollection[i].parentNode.parentNode.getElementsByTagName('table') [0].getElementsByTagName('td') [1].style.color = "lime";
						//Total HPs
						myHPs += parseInt(myCollection[i].parentNode.parentNode.getElementsByTagName('table')[0].getElementsByTagName('td')[1].innerHTML) * Foods[j][1];
						myCollection[i].parentNode.parentNode.id = 'HP';
						}
					}

				//Burnt
				if (myCollection[i].title.indexOf('Burnt') > -1)
					{
					myCollection[i].parentNode.childNodes[2].childNodes[0].childNodes[0].childNodes[1].style.color = "grey";
					myBurnt += parseInt(myCollection[i].parentNode.childNodes[2].childNodes[0].childNodes[0].childNodes[1].innerHTML);
					myCollection[i].parentNode.id = 'BURNT';
					}

				//Raw food
				for (j=0; j<Cookables.length; j++)
					{
					if (myCollection[i].title.split(' ')[1] == Cookables[j] || myCollection[i].title.indexOf(' seeds') > -1)
						{
						myCollection[i].parentNode.childNodes[2].childNodes[0].childNodes[0].childNodes[1].style.color = "blue";
						myRaws += parseInt(myCollection[i].parentNode.childNodes[2].childNodes[0].childNodes[0].childNodes[1].innerHTML);
						myCollection[i].parentNode.id = 'RAWFOOD';
						break;
						}
					}

				//Weaponry
				for (j=0; j<Weaponry.length; j++)
					{
					if (myCollection[i].title.indexOf(Weaponry[j]) > -1)
						{
						myCollection[i].parentNode.parentNode.childNodes[2].childNodes[0].childNodes[0].childNodes[1].style.color = "red";
						myCollection[i].parentNode.parentNode.id = 'WEAPONRY';
						try
							{
							myWu = parseInt(myCollection[i].parentNode.parentNode.getElementsByTagName('table')[0].getElementsByTagName('td')[1].innerHTML.split('>')[1].split('<')[0]);
							}
						catch (e)
							{
							myWu = parseInt(myCollection[i].parentNode.parentNode.getElementsByTagName('table')[0].getElementsByTagName('td')[1].innerHTML);
							}
						myWeaponry += myWu;
						break;
						}
					}
				}
			myCenter = document.createElement('center');
			mySpan = document.createElement('span');
			mySpan.style.color = 'grey';
			mySpan.innerHTML = 'Dragging ' + addCommas(myBurnt) + ' burnt food.';
			mySpan.title = 'Show / hide burnt items';
			mySpan.id = 'sBURNT';
			mySpan.addEventListener('click', showHideMe, false);
			myCenter.appendChild(mySpan);
			document.body.appendChild(myCenter);

			myCenter = document.createElement('center');
			mySpan = document.createElement('span');
			mySpan.style.color = 'blue';
			mySpan.innerHTML = 'Holding ' + addCommas(myRaws) + ' raw food items.';
			mySpan.title = 'Show / hide raw food items';
			mySpan.id = 'sRAWFOOD';
			mySpan.addEventListener('click', showHideMe, false);
			myCenter.appendChild(mySpan);
			document.body.appendChild(myCenter);

			myCenter = document.createElement('center');
			mySpan = document.createElement('span');
			mySpan.style.color = 'lime';
			mySpan.innerHTML = 'Holding ' + addCommas(myHPs) + ' HPs in food.';
			mySpan.title = 'Show / hide healing items';
			mySpan.id = 'sHP';
			mySpan.addEventListener('click', showHideMe, false);
			myCenter.appendChild(mySpan);
			document.body.appendChild(myCenter);

			myCenter = document.createElement('center');
			mySpan = document.createElement('span');
			mySpan.style.color = 'red';
			mySpan.innerHTML = 'Holding ' + addCommas(myWeaponry) + ' weaponry.';
			mySpan.title = 'Show / hide weaponry items';
			mySpan.id = 'sWEAPONRY';
			mySpan.addEventListener('click', showHideMe, false);
			myCenter.appendChild(mySpan);
			document.body.appendChild(myCenter);
			}
		}
	}
}

function HPCombat()
{//HP tooltips (combat)
myCollection = document.getElementsByTagName("a");
if (myCollection)
	{
	if (myCollection.length > 0)
		{
		for (i=0; i<myCollection.length; i++)
			{
			for (j=0; j<Foods.length; j++)
				{
				if (myCollection[i].title.indexOf(Foods[j][0]) > -1 && myCollection[i].title.indexOf('seed') == -1)
					{
					myCollection[i].title += ' [' + Foods[j][1] + ' HP each]';
					}
				}
			}
		}
	}
}

function TravelMap()
{//Travel map (show destination)
myCollection = document.getElementsByTagName("area");
if (myCollection)
	{
	if (myCollection.length > 0)
		{
		for (i=0; i<myCollection.length; i++)
			{
			myCollection[i].title = myCollection[i].href.split("=")[1].replace(/%20/g, " ");
			}
		}
	}
}

function LocationMessages()
{//Direct message (Syrnia)
myCollection = document.getElementsByTagName("a");
if (myCollection)
	{
	if (myCollection.length > 0)
		{
		for (i=0; i<myCollection.length; i++)
			{
			if (myCollection[i].href.indexOf('p=player') > -1)//Location
				{
				u = myCollection[i].href.split('u=')[1];
				if (u!=undefined)
					{
					var link = document.createElement("a");
					link.innerHTML = protoMsg;
					link.href="includes2/messages.m2h?p=messages&stuur=1&name=" + u + "&topic=[  ]";
					link.target="_blank";
					myCollection[i].parentNode.insertBefore(link, myCollection[i].nextSibling);
					}
				}

			if (myCollection[i].href.indexOf('page=highscore2') > -1)//Highscore
				{
				u = myCollection[i].href.split('high=')[1];
				if (u!=undefined)
					{
					var link = document.createElement("a");
					link.innerHTML = protoMsg;
					link.href="includes2/messages.m2h?p=messages&stuur=1&name=" + u + "&topic=[  ]";
					link.target="_blank";
					myCollection[i].parentNode.insertBefore(link, myCollection[i].nextSibling);
					}
				}
			}
		}
	}
}

function DWMessages()
{//Direct message (DWHQ)
myCollection = document.getElementsByTagName("a");
if (myCollection)
	{
	if (myCollection.length > 0)
		{
		for (i=0; i<myCollection.length; i++)
			{
			if (myCollection[i].href.indexOf('playerstats') > -1)
				{
				u = myCollection[i].href.split('p=')[1].replace(/\\/, "").replace(/'/, "").replace(/\)/,"");
				if (u!=undefined)
					{
					var link = document.createElement("a");
					link.innerHTML = protoMsg;
					link.href="http://www.syrnia.com/includes2/messages.m2h?p=messages&stuur=1&name=" + u + "&topic=[  ]";
					link.target="_blank";
					myCollection[i].parentNode.insertBefore(link, myCollection[i].nextSibling);
					}
				}
			}
		}
	}
}

function MassMessages()
{//Direct message (clan members)
if (loc == 'http://www.syrnia.com/includes2/clan.m2h?p=members')
	{
	myCollection = document.getElementsByTagName("tr");
	if (myCollection)
		{
		if (myCollection.length > 0)
			{
			for (i=0; i<myCollection.length; i++)
				{
				myObject = myCollection[i].getElementsByTagName("td")[1].getElementsByTagName("font")[0];
				if (myObject)
					{
					u = myObject.innerHTML.substring(1);
					if (u!=undefined)
						{
						var link = document.createElement("a");
						link.innerHTML = protoMsg;
						link.href="http://www.syrnia.com/includes2/messages.m2h?p=messages&stuur=1&name=" + u + "&topic=[  ]";
						link.target="_blank";
						myObject.parentNode.insertBefore(link, myObject.nextSibling);

						//Mass box
						var box = document.createElement("input");
						box.type = "checkbox";
						box.style.verticalAlign = 'middle';
						box.title = 'Queue for mass message';
						box.id = u;
						myObject.parentNode.insertBefore(box, myObject);
						}
					}
				}
			}
		}

	//Mass message
	var Mform = document.createElement("center");

	var Mbody = document.createElement("textarea");
	Mbody.rows = "10";
	Mbody.cols = "30";
	Mbody.id = 'Mbody';

	var Msubject = document.createElement("input");
	Msubject.id = 'Msubject';
	Msubject.size = "40"
	Msubject.maxlength = "20"
	Msubject.value = "[Mass]"

	var Mtitle = document.createElement("center");
	Mtitle.innerHTML = 'Mass message<BR>please do not abuse of this feature, it is annoying to get bilions of messages per minute';

	var Mbutton = document.createElement("input");
	Mbutton.type = 'button';
	Mbutton.id = 'Mbutton';
	Mbutton.addEventListener("click", goMass, false);
	Mbutton.value = "Go mass"

	var Mbox = document.createElement("input");
	Mbox.type = 'checkbox';
	Mbox.id = 'Mbox';
	Mbox.addEventListener("click", goCheck, false);

	var Mlabel = document.createElement("label");
	Mlabel.innerHTML = '(un)Check all';
	Mlabel.htmlFor = "Mbox";

	myObject = document.body;
	myObject.appendChild(document.createElement("hr"));
	myObject.appendChild(Mtitle);
	myObject.appendChild(Mform);
	Mform.appendChild(Msubject);
	Mform.appendChild(document.createElement("br"));
	Mform.appendChild(Mbody);
	Mform.appendChild(document.createElement("br"));
	Mform.appendChild(Mbox);
	Mform.appendChild(Mlabel);
	Mform.appendChild(document.createElement("br"));
	Mform.appendChild(Mbutton);

	myForm = document.createElement("form");
	myForm.action = 'http://www.syrnia.com/includes2/messages.m2h?stuur=1';
	myForm.target = '_blank';
	myForm.method = 'post';
	myForm.id = 'frm';
	myForm.style.display = 'none';

	myHidden = document.createElement("input");
	myHidden.type = 'hidden';
	myHidden.value = 'yess';
	myHidden.name = 'submit';

	myText1 = document.createElement("input");
	myText1.type = 'text';
	myText1.name = 'sendto';
	myText1.id = 'sendto';

	myText2 = document.createElement("input");
	myText2.type = 'text';
	myText2.name = 'topic';
	myText2.id = 'topic';

	myText3 = document.createElement("textarea");
	myText3.name = 'tekst';
	myText3.id = 'tekst';

	mySubmit = document.createElement("input");
	mySubmit.type = 'submit';
	mySubmit.value = 'Send';

	myForm.appendChild(myHidden);
	myForm.appendChild(myText1);
	myForm.appendChild(myText2);
	myForm.appendChild(myText3);
	myForm.appendChild(mySubmit);

	myObject.appendChild(myForm);
	}
}

function Quest()
{//Quests
if (loc == 'http://www.syrnia.com/includes2/quests.m2h')
	{
	myCollection = document.getElementsByTagName("tr");
	if (myCollection)
		{
		if (myCollection.length > 0)
			{
			for (i=0; i<myCollection.length; i++)
				{
				myObject = myCollection[i].getElementsByTagName("td")[0].getElementsByTagName("b")[0].getElementsByTagName("font")[0];
				if (myObject)
					{
					if (myObject.innerHTML.indexOf('Quests') > -1)
						{
						var link = document.createElement("a");
						link.innerHTML = "<B>?</B>";
						link.href = "http://www.dw-hq.com/index.php?page=quests";
						link.target = "_blank";
						myObject.parentNode.insertBefore(link, myObject);
						}
					for (j=0; j<Quests.length; j++)
						{
						if (myObject.innerHTML.indexOf(Quests[j][0]) > -1)
							{
							var link = document.createElement("a");
							link.innerHTML = "<B>?</B>";
							link.href = "http://www.dw-hq.com/index.php?page=questshow&id=" + Quests[j][1];
							link.target = "_blank";
							myObject.parentNode.insertBefore(link, myObject);
							break;
							}
						}
					}
				}
			}
		}
	}
}

function TravelItems()
{//Travel items
if (loc.indexOf('http://www.syrnia.com/includes2/inventory.m2h') > -1)
	{
	myControl = document.createElement("input");
	myControl.type = 'hidden';
	myControl.value = 'ok';
	myControl.id = 'ckh';
	myBody = document.body;
	myBody.appendChild(myControl);
	}
if (loc.indexOf('http://www.syrnia.com/index2_left.m2h') > -1)
	{
	myTravel();

	//Spacing - left
	myBR = document.getElementsByTagName("br")[0];//This was probably intended to better border the inventory from the wares worn, but I prefer to just see more without having to scroll
	myBR.style.display = 'none';
	}
}

function BotFocus()
{//Focus the botcheck inputbox to spare a mouseckick and be able to use the keyboard only
myImgs = document.getElementsByTagName("img");
for (i=0; i<myImgs.length; i++)
	{
	if (myImgs[i].src.indexOf('workimage.php') > -1)
		{
		myInputs = document.getElementsByTagName("input");
		for (j=0; j<myInputs.length; j++)
			{
			if (myInputs[j].type == 'text')
				{
				myInputs[j].focus();
				break;
				}
			}
		break;
		}
	}
}

function CloseInfo()
{//Close the gray infobox above the inventory
myTD = document.getElementsByTagName("td");
for (i=0; i<myTD.length; i++)
	{
	if (myTD[i].getAttribute('bgcolor')=='#cccccc')
		{
		myTD[i].addEventListener('click', hideMyGrandFather, false);
		break;
		}
	}
}

function hideMyGrandFather()
{
this.parentNode.parentNode.style.display = 'none';
}

function showHideMe()
{
myID = this.id.substring(1);
myObjects = document.getElementsByTagName('td');
for (i=0; i<myObjects.length; i++)
	{
		if (myObjects[i].id == myID)
			{
			if (myObjects[i].style.display == 'none')
				{
				myObjects[i].style.display = '';
				}
			else
				{
				myObjects[i].style.display = 'none';
				myObjects[i].parentNode.setAttribute('height', '0');
				}
			}
	}
}

function MoreStats()
{//Totals and ratios
if (location == 'http://www.syrnia.com/includes2/stats.m2h?showstats=1' || location == 'http://www.syrnia.com/includes2/stats.m2h')
	{
	var myLevels = 0;
	var myXPs = 0;
	var myCLXP = 0;
	myTables = document.getElementsByTagName("table");
	myStats = myTables[0];
	myTRs = myStats.getElementsByTagName("tr");
	myProgressH = document.createElement("td");
	myProgressH.setAttribute('width', '100');;
	myProgressH.innerHTML = "<B>Progress</B>";
	myTRs[0].appendChild(myProgressH);
	for (i=1; i<myTRs.length; i++)
		{
		myTDs = myTRs[i].getElementsByTagName("td");
		myLevels+=parseInt(myTDs[1].innerHTML);
		myXPs+=parseInt(myTDs[2].innerHTML);

		//Level percentage
		var myProgress = document.createElement("td");
		var myProgressS = document.createElement("hr");
		var myProgressX = document.createElement("hr");
		myProgressN = parseFloat(((1 - parseFloat(myTDs[3].innerHTML) / (XPs[parseInt(myTDs[1].innerHTML) + 1] - XPs[parseInt(myTDs[1].innerHTML)])) * 100).toFixed(2));
		myProgressS.style.backgroundColor = 'lime';
		myProgressS.style.width = myProgressN.toFixed(0)+'%';
		myProgressS.style.height = '5px';
		myProgressS.style.marginLeft = '0px';
		myProgressX.style.backgroundColor = 'red';
		myProgressX.style.width = 100 - myProgressN.toFixed(0)+'%';
		myProgressX.style.height = '5px';
		myProgressX.style.marginRight = '0px';
		myProgress.align = 'center';
		myProgress.innerHTML = addCommas(myProgressN)+'%<BR>';
		if (GM_getValue('PRogressBarStats', true))
			{
			myProgress.appendChild(myProgressS);
			}
		myTRs[i].appendChild(myProgress);

		//CLXP
		if (myTDs[0].innerHTML == 'Strength')
			{
			myCLTR = i;
			myCLXP+=parseInt(myTDs[2].innerHTML);
			}
		if (myTDs[0].innerHTML == 'Health')
			{
			myCLXP+=parseInt(myTDs[2].innerHTML);
			}
		if (myTDs[0].innerHTML == 'Defence')
			{
			myCLXP+=parseInt(myTDs[2].innerHTML);
			}
		if (myTDs[0].innerHTML == 'Attack')
			{
			myCLXP+=parseInt(myTDs[2].innerHTML);
			}
		myTDs[3].innerHTML = addCommas(parseInt(myTDs[3].innerHTML));
		myTDs[2].innerHTML = addCommas(parseInt(myTDs[2].innerHTML));
		}
	//CL
	if (window.opener)
		{
		myImgz = window.opener.document.getElementsByTagName('img');
		if (myImgz)
			{
			for (i=0; i<myImgz.length; i++)
				{
				if (myImgz[i].src == 'http://www.syrnia.com/images/level.gif')
					{
					myCL = myImgz[i].parentNode.previousSibling.getElementsByTagName('font')[0].innerHTML;
					}
				}
			}
		CLTR = document.createElement("tr");
		CLTD1 = document.createElement("td");
		CLTD1.innerHTML = "<I><B>CL</B></I>";
		CLTD2 = document.createElement("td");
		CLTD2.innerHTML = "<I><B>"+addCommas(myCL.toString())+"</B></I>";
		CLTD3 = document.createElement("td");
		CLTD3.innerHTML = "<I><B>"+addCommas(myCLXP.toString())+"</B></I>";
		CLTD4 = document.createElement("td");
		CLTD4.setAttribute('colspan', '2');
		CLTD4.innerHTML = "<CENTER><I><B title='Sorry, I don`t know the formula'>?</B></I></CENTER>";
		CLTR.appendChild(CLTD1);
		CLTR.appendChild(CLTD2);
		CLTR.appendChild(CLTD3);
		CLTR.appendChild(CLTD4);
		myTRs[myCLTR].parentNode.insertBefore(CLTR, myTRs[myCLTR]);
		}
	else
		{
		CLTR = document.createElement("tr");
		CLTD1 = document.createElement("td");
		CLTD1.innerHTML = "<I><B>CL</B></I>";
		CLTD2 = document.createElement("td");
		CLTD2.setAttribute('colspan', '4');
		CLTD2.innerHTML = "<CENTER><I><B>Connection lost</B><BR>Please click again on `Stats` in main window</I></CENTER>";
		CLTR.appendChild(CLTD1);
		CLTR.appendChild(CLTD2);
		myTRs[myCLTR].parentNode.insertBefore(CLTR, myTRs[myCLTR]);
		}

	SkillsTR = document.createElement("tr");
	SkillsTD1 = document.createElement("td");
	SkillsTD1.innerHTML = "<B>TOTAL</B>";
	SkillsTD2 = document.createElement("td");
	SkillsTD2.innerHTML = "<B>"+addCommas(myLevels.toString())+"</B>";
	SkillsTD3 = document.createElement("td");
	SkillsTD3.innerHTML = "<B>"+addCommas(myXPs.toString())+"</B>";
	SkillsTD4 = document.createElement("td");
	SkillsTD4.innerHTML = "<B>"+addCommas((myXPs/myLevels).toFixed(2))+"<BR>(XP/Lvl)</B>";
	SkillsTR.appendChild(SkillsTD1);
	SkillsTR.appendChild(SkillsTD2);
	SkillsTR.appendChild(SkillsTD3);
	SkillsTR.appendChild(SkillsTD4);
	myStats.appendChild(SkillsTR);

	var mySlots = 0;
	var myFarms = 0;
	myHouses = myTables[2];
	myTRs = myHouses.getElementsByTagName("tr");
	for (i=1; i<myTRs.length; i++)
		{
		myTDs = myTRs[i].getElementsByTagName("td");
		mySlots += parseInt(myTDs[1].innerHTML);
		myTDs[1].innerHTML = addCommas(myTDs[1].innerHTML);
		myFarms += parseInt(myTDs[2].innerHTML);
		}
	HousesTR = document.createElement("tr");
	HousesTD1 = document.createElement("td");
	HousesTD1.innerHTML = "<B>TOTAL</B>";
	HousesTD2 = document.createElement("td");
	HousesTD2.innerHTML = "<B>"+addCommas(mySlots.toString())+"</B>";
	HousesTD3 = document.createElement("td");
	HousesTD3.innerHTML = "<B>"+addCommas(myFarms.toString())+"</B>";
	HousesTR.appendChild(HousesTD1);
	HousesTR.appendChild(HousesTD2);
	HousesTR.appendChild(HousesTD3);
	myHouses.appendChild(HousesTR);

	var myShopSlots = 0;
	myShops = myTables[4];
	myTRs = myShops.getElementsByTagName("tr");
	for (i=1; i<myTRs.length; i++)
		{
		myTDs = myTRs[i].getElementsByTagName("td");
		myShopSlots += parseInt(myTDs[1].innerHTML);
		myTDs[1].innerHTML = addCommas(myTDs[1].innerHTML);
		}
	ShopsTR = document.createElement("tr");
	ShopsTD1 = document.createElement("td");
	ShopsTD1.innerHTML = "<B>TOTAL</B>";
	ShopsTD2 = document.createElement("td");
	ShopsTD2.innerHTML = "<B>"+addCommas(myShopSlots.toString())+"</B>";
	ShopsTR.appendChild(ShopsTD1);
	ShopsTR.appendChild(ShopsTD2);
	myShops.appendChild(ShopsTR);

	var myNXratio = 0;
	myX = myTables[5].getElementsByTagName("tr")[0].getElementsByTagName("td")[0];
	myA = myX.getElementsByTagName("a");
	if (myA.length==0)
		{
		myTxt = myX.innerHTML;
		myHours0 = myTxt.substring(0, myTxt.indexOf(' hours')).split(' ');
		myHours = parseInt(myHours0[myHours0.length-1]);

		myMinutes0 = myTxt.substring(0, myTxt.indexOf(' minutes')).split(' ');
		myMinutes = parseInt(myMinutes0[myMinutes0.length-1]);
		myTime = myHours + myMinutes/60;

		myDays0 = myTxt.substring(0, myTxt.indexOf(' days')).split(' ');
		myDays = parseInt(myDays0[myDays0.length-1]);
		myNXratio = addCommas((myTime / myDays).toFixed(2));

		myKills0 = myTxt.substring(0, myTxt.indexOf(' monsters')).split(' ');
		myKills = parseInt(myKills0[myKills0.length-1]);
		myKratio = addCommas((myKills / myDays).toFixed(2));

		myBRs = myX.getElementsByTagName("br");
		myNXspan = document.createElement('span');
		myNXspan.innerHTML = "<B>NebuneX ratio: "+myNXratio+" hours/day.</B><BR>"
		myX.insertBefore(myNXspan, myBRs[3]);

		myKspan = document.createElement('span');
		myKspan.innerHTML = "<BR><B>K ratio: "+myKratio+" creatures/day.</B><BR>"
		myX.insertBefore(myKspan, myBRs[7]);

		rTR = document.createElement("tr");
		rTD1 = document.createElement("td");
		rTD1.innerHTML = "<B>Time stats</B>";
		rTD2 = document.createElement("td");
		rTD2.innerHTML = "<B>"+addCommas((myLevels/myDays).toFixed(2).toString())+"<BR>(Lvl/day)</B>";
		rTD3 = document.createElement("td");
		rTD3.innerHTML = "<B>"+addCommas((myXPs/myTime).toFixed(2).toString())+"<BR>(XP/hour)</B>";
		rTD4 = document.createElement("td");
		rTD4.innerHTML = "<B>&nbsp;</B>";
		rTR.appendChild(rTD1);
		rTR.appendChild(rTD2);
		rTR.appendChild(rTD3);
		rTR.appendChild(rTD4);
		myStats.appendChild(rTR);
		}
	}
}

function addCommas(nStr)
{
sep = GM_getValue('NumberFormat', 'US') == 'US' ? ',' : '.';
dec = GM_getValue('NumberFormat', 'US') == 'US' ? '.' : ',';
nStr += '';
x = nStr.split('.');
x1 = x[0];
x2 = x.length > 1 ? dec + x[1] : '';
var rgx = /(\d+)(\d{3})/;
while (rgx.test(x1))
	{
	x1 = x1.replace(rgx, '$1' + sep + '$2');
	}
return x1 + x2;
}

function Refresh()
{//Link to refresh the right frame to see the stats and left frame to check for messages
if (loc.indexOf('http://www.syrnia.com/index2_right.m2h') > -1)
	{
	myImgs = document.getElementsByTagName('img');
	if (myImgs)
		{
		if (myImgs[6])
			{
			if (myImgs[6].src == 'http://www.syrnia.com/images/totalskill.gif')
				{
				myRefreshR = document.createElement('a');
				myRefreshR.innerHTML = protoRfrR;
				myRefreshR.href = 'javascript:window.location.reload();';
				myImgs[6].parentNode.appendChild(myRefreshR);
				
				}
			}
		}
	}
if (loc.indexOf('http://www.syrnia.com/index2_left.m2h') > -1)
	{
	myAs = document.getElementsByTagName('a');
	if (myAs)
		{
		if (myAs[0])
			{
			if (myAs[0].href == 'http://www.syrnia.com/includes2/inventory.m2h')
				{
				myRefreshL = document.createElement('a');
				myRefreshL.innerHTML = protoRfrL;
				myRefreshL.href = 'javascript:window.location="http://www.syrnia.com/index2_left.m2h";';
				myAs[0].parentNode.appendChild(myRefreshL);
				
				}
			}
		}
	}
}

function Options()
{//Enable / disable each feature
if (location == 'http://www.syrnia.com/includes2/options.m2h')
	{
	myTables = document.getElementsByTagName('table');
	if (myTables)
		{
		myTable = myTables[1];
		if (myTable)
			{
			mySep = document.createElement('hr');
			mySep.setAttribute('width', '90%');
			mySepTD = document.createElement('td');
			mySepTD.innerHTML = '<BR><CENTER><B><font face = "Monotype Corsiva, Bookman Old Style, verdana" color = "#cc0000" size = 40>Monkey Business</font></B></CENTER>';
			mySepTD.setAttribute('colspan', '3');
			mySepBR = mySepTD.getElementsByTagName('br')[0];
			mySepTD.insertBefore(mySep, mySepBR);
			mySepTR = document.createElement('tr');
			mySepTR.setAttribute('bgcolor', '#E2D3B2');
			mySepTR.appendChild(mySepTD);
			myTable.appendChild(mySepTR);

			myHeadTD1 = document.createElement('td');
			myHeadTD1.innerHTML = '<B>Setting</B>';
			myHeadTD2 = document.createElement('td');
			myHeadTD2.innerHTML = '<B>Enabled? / Value</B>';
			myHeadTR = document.createElement('tr');
			myHeadTR.setAttribute('bgcolor', '#E2D3B2');
			myHeadTR.appendChild(myHeadTD1);
			myHeadTR.appendChild(myHeadTD2);
			myTable.appendChild(myHeadTR);

			//Number format
			myNFTD1 = document.createElement('td');
			myNFTD1.innerHTML = 'Number format:';
			myNFTD2 = document.createElement('td');
			myNFOp1 = document.createElement('input');
			myNFOp1.type = 'radio'
			myNFOp1.name = 'NF';
			myNFOp1.id = 'NFUS';
			myNFOp1.checked = GM_getValue('NumberFormat', 'US') == 'US';
			myNFOp1.addEventListener('click', setNumberFormat, false);
			myNFOp2 = document.createElement('input');
			myNFOp2.type = 'radio'
			myNFOp2.name = 'NF';
			myNFOp2.id = 'NFUE';
			myNFOp2.checked = GM_getValue('NumberFormat', 'US') == 'UE';
			myNFOp2.addEventListener('click', setNumberFormat, false);
			myNFLbl1 = document.createElement('label');
			myNFLbl1.setAttribute('for', 'NFUS');
			myNFLbl1.innerHTML = 'US';
			myNFLbl2 = document.createElement('label');
			myNFLbl2.setAttribute('for', 'NFUE');
			myNFLbl2.innerHTML = 'UE';
			myNFTD2.appendChild(myNFLbl1);
			myNFTD2.appendChild(myNFOp1);
			myNFTD2.appendChild(myNFLbl2);
			myNFTD2.appendChild(myNFOp2);
			myNFTR = document.createElement('tr');
			myNFTR.appendChild(myNFTD1);
			myNFTR.appendChild(myNFTD2);
			myTable.appendChild(myNFTR);

			for (i=0; i<myOptions.length; i++)
				{
				var myOptionTD1 = document.createElement('td');
				var myOptionLbl = document.createElement('label');
				myOptionLbl.innerHTML = myOptions[i][1];
				myOptionLbl.setAttribute('for', myOptions[i][0]);
				myOptionTD1.appendChild(myOptionLbl);
				var myOptionChk = document.createElement('input');
				myOptionChk.type = 'checkbox';
				myOptionChk.addEventListener('click', setOption, false);
				myOptionChk.setAttribute('id', myOptions[i][0]);
				myOptionChk.checked = GM_getValue(myOptionChk.id, true);
				var myOptionTD2 = document.createElement('td');
				myOptionTD2.appendChild(myOptionChk);
				var myOptionTR = document.createElement('tr');
				myOptionTR.setAttribute('bgcolor', '#E2D3B2');
				myOptionTR.appendChild(myOptionTD1);
				myOptionTR.appendChild(myOptionTD2);
				myTable.appendChild(myOptionTR);

				if (myOptions[i][0] == 'MoreStats')
					{
					//Progress bar
					myProgressTD1 = document.createElement('td');
					myProgressLbl = document.createElement('label');
					myProgressLbl.innerHTML = '<I>&nbsp;progressbar on stats page</I>';
					myProgressLbl.setAttribute('for', 'PRogressBarStats');
					myProgressTD1.appendChild(myProgressLbl);
					myProgressChk = document.createElement('input');
					myProgressChk.type = 'checkbox';
					myProgressChk.addEventListener('click', setOption, false);
					myProgressChk.setAttribute('id', 'PRogressBarStats');
					myProgressChk.checked = GM_getValue(myProgressChk.id, true);
					myProgressTD2 = document.createElement('td');
					myProgressTD2.appendChild(myProgressChk);
					myProgressTR = document.createElement('tr');
					myProgressTR.setAttribute('bgcolor', '#E2D3B2');
					myProgressTR.appendChild(myProgressTD1);
					myProgressTR.appendChild(myProgressTD2);
					myTable.appendChild(myProgressTR);
					}

				if (myOptions[i][0] == 'ExternalLinksOpen')
					{
					//Game window
					myGameTD1 = document.createElement('td');
					myGameLbl = document.createElement('label');
					myGameLbl.innerHTML = '<I>&nbsp;open game window</I>';
					myGameLbl.setAttribute('for', 'GameWin');
					myGameTD1.appendChild(myGameLbl);
					myGameChk = document.createElement('input');
					myGameChk.type = 'checkbox';
					myGameChk.addEventListener('click', setOption, false);
					myGameChk.setAttribute('id', 'GameWin');
					myGameChk.checked = GM_getValue('GameWin', true);
					myGameTD2 = document.createElement('td');
					myGameTD2.appendChild(myGameChk);
					myGameTR = document.createElement('tr');
					myGameTR.setAttribute('bgcolor', '#E2D3B2');
					myGameTR.appendChild(myGameTD1);
					myGameTR.appendChild(myGameTD2);
					myTable.appendChild(myGameTR);

					//Forum address
					myForumTD1 = document.createElement('td');
					myForumLbl = document.createElement('label');
					myForumLbl.innerHTML = '<I>&nbsp;forum web address</I>';
					myForumLbl.setAttribute('for', 'ForumLink');
					myForumTD1.appendChild(myForumLbl);
					myForumTxt = document.createElement('input');
					myForumTxt.type = 'text';
					myForumTxt.addEventListener('keyup', setTextOption, false);
					myForumTxt.setAttribute('id', 'ForumLink');
					myForumTxt.value = GM_getValue('ForumLink', 'http://www.guilduniverse.com/mastertraders');
					myForumTD2 = document.createElement('td');
					myForumTD2.appendChild(myForumTxt);
					myForumTR = document.createElement('tr');
					myForumTR.setAttribute('bgcolor', '#E2D3B2');
					myForumTR.appendChild(myForumTD1);
					myForumTR.appendChild(myForumTD2);
					myTable.appendChild(myForumTR);

					//Clan tag
					myClanTD1 = document.createElement('td');
					myClanLbl = document.createElement('label');
					myClanLbl.innerHTML = '<I>&nbsp;Clan tag</I>';
					myClanLbl.setAttribute('for', 'ClanTag');
					myClanTD1.appendChild(myClanLbl);
					myClanTxt = document.createElement('input');
					myClanTxt.type = 'text';
					myClanTxt.addEventListener('keyup', setTextOption, false);
					myClanTxt.setAttribute('id', 'ClanTag');
					myClanTxt.value = GM_getValue('ClanTag', 'Love');
					myClanTD2 = document.createElement('td');
					myClanTD2.appendChild(myClanTxt);
					myClanTR = document.createElement('tr');
					myClanTR.setAttribute('bgcolor', '#E2D3B2');
					myClanTR.appendChild(myClanTD1);
					myClanTR.appendChild(myClanTD2);
					myTable.appendChild(myClanTR);
					}
				}
			}
		}
	}
}

function setOption()
{
Var = this.id;
Val = this.checked;
GM_setValue(Var, Val);
}

function setTextOption()
{
Var = this.id;
Val = this.value;
GM_setValue(Var, Val);
}

function TotalInventory()
{//summarize all the items in the inventory
var tot = 0;
if (loc.indexOf('http://www.syrnia.com/includes2/inventory.m2h') > -1)
	{
	myImgs = document.getElementsByTagName('img');
	if (myImgs)
		{
		for (i=0; i<myImgs.length; i++)
			{
			father = myImgs[i].parentNode;
			grandfather = myImgs[i].parentNode.parentNode;
			if (father.tagName.toLowerCase() == 'td')
				{
				father.addEventListener('click', selInventory, false);
				}
			else
				{
				if (grandfather.tagName.toLowerCase() == 'td')
					{
					grandfather.addEventListener('click', selInventory, false);
					}
				}
			if (!isNaN(parseInt(myImgs[i].title.split(' ')[0])))
				{
				tot += parseFloat(myImgs[i].title.split(' ')[0]);
				}
			}
		myTot = document.createElement("center");
		myTot.innerHTML = "Carrying " + addCommas(tot) + " items.";
		mySel = document.createElement("center");
		mySel.style.color = 'yellow';
		mySel.innerHTML = "Selected: <span id='sel'>0</span> items.";
		document.body.appendChild(myTot);
		document.body.appendChild(mySel);
		}
	}
}

function selInventory()
{
if (this.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].style.color == 'yellow')
	{
	this.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].style.color = 'white';
	}
else
	{
	this.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].style.color = 'yellow';
	}
countSel();
}

function countSel()
{
myTDs = document.getElementsByTagName('td');
var sel = 0;
if (myTDs)
	{
	for (i=0; i<myTDs.length; i++)
		{
		if (myTDs[i].style.color == 'yellow')
			{
			if (!isNaN(parseFloat(myTDs[i].innerHTML)))
				{
				sel += parseFloat(myTDs[i].innerHTML)
				}
			else
				{
				
				sel += parseFloat(myTDs[i].getElementsByTagName('u')[0].innerHTML)
				}
			}
		}
	document.getElementById('sel').innerHTML = addCommas(sel);
	}
}

function setNumberFormat()
{
val = this.id.substring(2, 4);
GM_setValue('NumberFormat', val);
}

function ExternalLinksOpen()
{//Open external forum (to do: configurable address)
if (loc.indexOf('http://www.syrnia.com/index.m2h') > -1 && loc.indexOf('page=loggedin') > -1)
	{
	forumLink = GM_getValue('ForumLink', 'http://www.guilduniverse.com/mastertraders');
	window.open(forumLink, '');
	window.open('http://www.syrnia.com/includes2/support.m2h?action=vote', '');
	if (GM_getValue('GameWin', true))
		{
		window.open('http://www.syrnia.com/index2.m2h?login=Welcome_back_!', '');
		}
	clanTag = GM_getValue('ClanTag', 'Love');
	window.open('http://www.dw-hq.com/clanstats.php?order=xpgain&clan=' + clanTag, '');
	}
}

function VoteGifts()
{//Mark gift votes
if (loc == 'http://www.syrnia.com/includes2/support.m2h?action=vote')
	{
	myAs = document.getElementsByTagName('a');
	for (i=0; i<myAs.length; i++)
		{
		if (myAs[i].href.indexOf('http://www.topwebgames.com/in.asp') > -1 || myAs[i].href.indexOf('http://www.toprpgames.com/vote.php') > -1)
			{
			myAs[i].innerHTML += '&nbsp;!';
			myAs[i].style.color = 'green';
			}
		if (myAs[i].href.indexOf('http://www.gamesites100.net/in.php') > -1 || myAs[i].href.indexOf('http://www.sweetonlinegames.com') > -1)
			{
			myAs[i].innerHTML += '&nbsp;?';
			myAs[i].style.color = 'navy';
			}
		}
	}
}

function DWFactors()
{//Compute the level factor
if (loc.indexOf('http://www.dw-hq.com/clanstats.php') > -1 && loc.indexOf('clan=') > -1)
	{
	myTables = document.getElementsByTagName('table');
	if (myTables)
		{
		MyBy = 0;
		myTable = myTables[2];
		MyMembers = parseInt(myTable.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML.split(': ')[1].split('<')[0]);
		MyLevels = parseInt(myTable.getElementsByTagName('tr')[0].getElementsByTagName('td')[2].innerHTML.split(': ')[1].split('<')[0]);
		MyXPs = parseInt(myTable.getElementsByTagName('tr')[0].getElementsByTagName('td')[4].innerHTML.split(': ')[1].split('<')[0]);
		MyBy = MyLevels / MyMembers
		MyByX = Math.sqrt(MyXPs) / Math.pow(MyMembers, 2);
		if (isNaN(MyBy))
			{
			MyBy = 300;
			}
		myTable = myTables[0];
		myRows = myTable.getElementsByTagName('tr');
		for (i=4; i<myRows.length-2; i++)
			{
			myCells = myRows[i].getElementsByTagName('td');
			if (myCells[2] && myCells[3] && myCells[4])
				{
				myLevels = myCells[2].innerHTML.split('>')[2].split('<')[0];
				myXPs = myCells[4].innerHTML.split('>')[2].split('<')[0];
				myGains = myCells[3].innerHTML.split('>')[2].split('<')[0].substring(1);
				myGainsX = myCells[5].innerHTML.split('>')[2].split('<')[0].substring(1);
				myNr = myCells[0].innerHTML.split('>')[2].split('<')[0];
				if (isNaN(myNr) || myNr == '')
					{
					//nothing here
					}
				else
					{
					myFactor = (parseInt(myLevels) * parseInt(myGains) / MyBy);
					myFactorX = (parseInt(myGainsX) / parseInt(myXPs)) * MyByX;
					if (isNaN(myFactorX))
						{
						myFactorX = 0;
						}
					if (isNaN(myFactor))
						{
						myFactor = 0;
						}
					myCells[3].innerHTML += '<BR><FONT COLOR="magenta"><B>' + addCommas(myFactor.toFixed(2)) + '</B></FONT>'
					myCells[5].innerHTML += '<BR><FONT COLOR="magenta"><B>' + addCommas(myFactorX.toFixed(2)) + '</B></FONT>'
					}
				}
			else
				{
				//nothing here
				}
			}
		}
	}
}

if (document.body) fMain();
else window.addEventListener('DOMContentLoaded', fMain, false);

/*
Version history:
<ul>v1.3.14 (2008-01-03)
	<li>Updated the DWHQ factors due to some modifications in the presentation there
</ul>

<ul>v1.3.13 (2007-10-31)
	<li>Corrected the case from Green Pepper to Green pepper [thanks, Calydor] so that they're counted too as food
</ul>

<ul>v1.3.12 (2007-10-31)
	<li>Added Halloween pumpkin to foods
</ul>

<ul>v1.3.11 (2007-10-27)
	<li>Spellchecks and correct case (Cucumbers may appear as cucunber [with lower case C])
</ul>

<ul>v1.3.10 (2007-09-18)
	<li>fixed a bug that randomly counted an item as food when Grain was present in inventory
</ul>

<ul>v1.3.09 (2007-09-10)
	<li>fixed a bug [thanks, Doru] that prevented the last character of external forum and Clan tag to be saved
</ul>

<ul>v1.3.08 (2007-09-04)
	<li>added XP factor to DWHQ Clan score page (gaining XP is harder at lower levels)
</ul>

<ul>v1.3.07 (2007-08-29)
	<li>updated the weaponry list
</ul>

<ul>v1.3.06 (2007-08-28)
	<li>updated the level factor [hi, Dale] to adapt to each clan
</ul>

<ul>v1.3.05b (2007-08-27)
	<li>reverted. The DWHQ Clan score was reverted.
</ul>

<ul>v1.3.05 (2007-08-27)
	<li>update to meet the DWHQ Clan highscore page slight change
</ul>

<ul>v1.3.04 (2007-08-22)
	<li>options to show / hide the classified items in the inventory
	<ul>please note:
		<li>to show / hide, click on the corresponding summary line at the bottom of the inventory
		<li>it doesn't rearrange the remaining items so that only complete rows are displayed, so hiding a category having only 1-2 distinct items or not spanning across at least one complete row is pretty useless
		<li>upon refresh (automatic or manual) the filter is lost
	</ul>
</ul>

<ul>v1.3.03 (2007-08-21)
	<li>digit grouping for house and shop slots
	<li>option to open the game page - this is under certain circumstances not automatically opened, even the popup blocker is off [hi, Blake]
	<li>option to open the DWHQ Clan stats page and configurable Clan tag
	<li>configurable external forum address
</ul>

<ul>v1.3.02 (2007-08-20)
	<li>summarize the total weaponry in the inventory
</ul>

<ul>v1.3.01 (2007-08-19)
	<li>fixed some bugs
</ul>

<ul>v1.3 (2007-08-19)
	<li>summarize the total raw foods in the inventory
	<li>summarize the total burnt food in the inventory
</ul>

<ul>v1.2.9 (2007-08-14)
	<li>summarize the total HP values of the food in the inventory
</ul>

<ul>v1.2.8 (2007-08-13)
	<li>fixed the level factor on DWHQ clan score to be correctly displayed for all the order criteria, and updated the formula
</ul>

<ul>v1.2.7 (2007-08-12)
	<li>compute the level factor on DWHQ clan score (gaining up levels is harder at higher levels)
</ul>

<ul>v1.2.6 (2007-08-11)
	<li>open vote page upon login [thanks, Diablo]
	<li>mark gift awarding links on vote page
</ul>

<ul>v1.2.5 (2007-08-09)
	<li>open external forum upon login [thanks, Blake]<BR>
	to do: configurable address
</ul>

<ul>v1.2.4 (2007-07-30)
	<li>enhaced Stats page (level progress percentage and bars)
</ul>

<ul>v1.2.3 (2007-07-28)
	<li>option to set preferred number format for Stats page [thanks, Nora]
</ul>

<ul>v1.2.2 (2007-07-27)
	<li>CL in stats page [thanks, Nora]
	<li>more stats and a bit more beautiful
</ul>

<ul>v1.2.1 (2007-07-24)
	<li>a line at the bottom of the inventory that totals the carried stuff
	<li>a selection count line at the bottom of the inventory<BR>
	<ul>please note:
		<li>to select / unselect something, click on it
		<li>selected stuff gets golden number label, unselected items keep / revert back to white
		<li>beware of edible / wear-able items - the selection click should happen in the lower third of the item box or directly on the number label
		<li>upon refresh (automatic or manual) the selection is lost
	</ul>
</ul>

<ul>v1.2 (2007-07-22)
	<li>checkboxes to enable / disable each of the features - on the options page [thanks, Nora]
	<li>fixed the double eat on refresh<BR>
		still I can do nothing when manually reloading via context menu or when changing the skill trained in combat
</ul>

<ul>v1.1.7 (2007-07-21)
	<li>refresh the left (inventory) frame to check the messages and inventory changes<BR>
		note that the last action performed in the inventory will be carried out again: if not enough time passed or an equip/unequip happaned since you ate something directly from the inventory, you'll eat that again. Actually that happens also when changing the train dropdown below the menu.
	<li>fixed the refresh the right (stats) so it's not hidden on certain circumstances
</ul>

<ul>v1.1.6 (2007-07-20)
	<li>refresh the right (stats) frame to easily see the modifications in GP, HP and all the skills' levels [thanks, whoever posted in the forum]
</ul>

<ul>v1.1.5 (2007-07-14)
	<li>hide the gray infobox above the inventory by clicking on it
	<li>enhace the Stats page with totals and ratios
</ul>

<ul>v1.1.4 (2007-07-09)
	<li>focus the botcheck inputbox to spare a mouseclick and be able to use the keyboard only
	<li>added easter eggs HP values
	<li>restructured the code
</ul>

<ul>v1.1.3 (2007-07-06)
	<li>summarize the -TT values of equipped items (displayed below the left hand menu) [thanks, whoever posted in the forum]<BR>
		this should be a warning when going into battle wearing travel gear and traveling with combat armor
	<li>remove the unnecesary spacing from the left frame, to make more content fit in 1024x768 screens
</ul>

<ul>v1.1.2 (2007-07-05)
	<li>links on Quests page to DWHQ walkthroughs
</ul>

<ul>v1.1.1 (2007-07-04)
	<li>HP food values works in combat pages too
</ul>

<ul>v1.1 (2007-07-03)
	<li>directly send a message to all the clan members from the member list in the in-game clan forum [thanks, Dale]<BR>
		had to add (and thought it's nice) alert confirmation for each message sent<BR>
		please do not abuse of this feature, it's annoying to get bilions of messages per minute
	<li>directly sent an IGM to players from clan members page
</ul>

<ul>v1.0.2 (2007-07-02)
	<li>directly sent an IGM to players from Syrnia highscore pages
	<li>directly sent an IGM to players from DWHQ site from anywhere a link to a player's stats is present<BR>
		(you'll need to browse DWHQ in the same browser as you play Syrnia, and to be logged into the game)
</ul>

<ul>v1.0.1 (2007-07-01)
	<li>directly sent an IGM to players at your location, including the offline ones
	<li>update tooltips on navigation map to show the destination city
</ul>

<ul>v1.0 (2007-06-30)
	<li>HP food values works in inventory<BR>
		but not in combat pages - will be updated within a week [thanks, Chimere]
<ul>
*/
