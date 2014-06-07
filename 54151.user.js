// ==UserScript==
// @name           Us.o Script Install Visualizer
// @namespace      http://userscripts.org/scripts/source/54151.user.js
// @description    Adds a chart to the admin page of a script
// @version        2.1

// @author         Ron Troyer
// @authorWebsite  http://www.ronaldtroyer.com/

// @include        http://userscripts.org/*
// ==/UserScript==

/*********************************************************ADMIN PAGE GRAPH***********************************************/

/* This section is to display 2 graphs on the admin page of an individual script
   so that an author can better track the install rates of said script */
   
myGraph = function (columnToView) {
	var myString  = '';
	var myArray   = new Array();

	if (adminSection = document.getElementsByClassName('admin_section')[0]) {
		if (table = document.getElementsByClassName('admin_section')[0].childNodes[5].childNodes[1]) {
			var MaxNum = 0;
			var arrI = 0;
			
			//GET RAW DATA
			for (i=1; i < table.childNodes.length; i ++) {
				if (table.childNodes[i].firstChild) {
					if (table.childNodes[i].childNodes[columnToView*2+1] == undefined) {
						tempCol = columnToView;
					} else {
						tempCol = columnToView*2+1;
					}
					if (table.childNodes[i].childNodes[tempCol].innerHTML != '') {
						myArray[arrI] = parseFloat(table.childNodes[i].childNodes[tempCol].innerHTML);
					}
					if (myArray[arrI] > MaxNum) {
						MaxNum = myArray[arrI];
					}
					
					arrI ++;
				}
			}
			
			
			mySkip = 1;
			if (myArray.length > 365) {
				mySkip = Math.round(myArray.length / 365) + 1;
			}
			
			//PROCESS INTO PERCENTS OF 100
			for (i=myArray.length-1; i >= 0; i-= mySkip) {
				if (myArray[i]) {
					myArray[i] = 100 * myArray[i] / MaxNum;
					myArray[i] = Math.round(myArray[i]*10)/10;
					myString += myArray[i] + ',';
				}
			}
			myString = myString.substring(0,myString.length-1);
		}
	}
	
	if (sectionBR != true) {
		sectionBR = true;
		adminSection.childNodes[3].innerHTML += '<br/><br/>';
	}
	
	adminSection.childNodes[3].innerHTML += '<img style="float: right; margin-left: 5px; margin-bottom: 5px;" src="http://chart.apis.google.com/chart?cht=lc&chs=245x125&chd=t:' + myString + '" />';
}

window.addToday = function () {
	//GET CURRENT INSTALLS
	installs = document.getElementById('details').innerHTML;
	installStart = installs.indexOf('Installed',installs.indexOf('</span>'))+10;
	i=installStart;
	while (installs.substring(i, i+1) == ' ') {
		i++;
	}
	installStart = i;
	installEnd = installs.indexOf('times.',installStart)-1;
	installs = installs.substring(installStart,installEnd);
	installs = installs.replace(/,/g,'');
	
	//GET YESTERDAYS INSTALLS
	table = document.getElementsByClassName('admin_section')[0].childNodes[5].childNodes[1];
	yesterday = table.childNodes[2].childNodes[5].innerHTML;
	
	todayRow = document.createElement('tr');
	todayRow.id = "todayRow";
	insertPoint = table.childNodes[2];
	insertPoint.parentNode.insertBefore(todayRow, insertPoint);
	
	insertPoint = document.getElementById('todayRow');
	
	todayCell = document.createElement('td');
	todayCell.innerHTML = installs;
	insertPoint.insertBefore(todayCell, insertPoint.firstChild);
	
	todayCell = document.createElement('td');
	todayCell.innerHTML = parseFloat(installs) - parseFloat(yesterday);
	insertPoint.insertBefore(todayCell, insertPoint.firstChild);
	
	todayCell = document.createElement('td');
	todayCell.innerHTML = "Today (volatile)";
	insertPoint.insertBefore(todayCell, insertPoint.firstChild);
}

if (location.toString().match('userscripts.org/scripts/admin/')) {
	sectionBR = false;
	addToday();
	myGraph(2);
	myGraph(1);
}

/*********************************************************END ADMIN PAGE GRAPH*******************************************/
/*********************************************************SCRIPT MANAGEMENT GRAPH****************************************/

myPieGraph = function (columnToView) {
	var myString       = '';
	var myArray        = new Array();
	var myLabelString  = '';
	var myLabelArray   = new Array();
	
	if (mainSection = document.getElementById('main')) {
		for (i=0; i < mainSection.childNodes.length; i++) {
			if (mainSection.childNodes[i].innerHTML) {
				if (mainSection.childNodes[i].innerHTML.indexOf('<tr>') != -1) {
					tableID = i;
					i = mainSection.childNodes.length;
				}
			}
		}
		
		table = mainSection.childNodes[tableID].childNodes[1];
		var Total = 0;
		var OtherPercent = 0;
		var OtherCount = 0;
		var totalNum = 0;
		var arrI = 0;
		
		//GET RAW DATA
		for (i=1; i < table.childNodes.length; i ++) {
			if (table.childNodes[i].firstChild) {
				if (table.childNodes[i].childNodes[columnToView*2+1].innerHTML != '') {
					myArray[arrI] = parseFloat(table.childNodes[i].childNodes[columnToView*2+1].innerHTML);
					myLabelArray[arrI] = table.childNodes[i].childNodes[1].childNodes[1].innerHTML;
					//alert(myLabelArray[arrI] + ": " + myArray[arrI]);
				}
				
				Total += parseFloat(myArray[arrI]);
				arrI ++;
			}
		}

		for (i=0; i < myArray.length; i ++) {
			myNum = myArray[i];	
			totalNum += myNum;
			
			myArray[i] = 100 * myArray[i] / Total;
			if (myArray[i] < 1.5) {
				OtherPercent += myArray[i];
				if (myArray[i] != 0) {
					OtherCount ++;
				}
			} else {
				myString += myArray[i] + ',';
				simplePercent = parseFloat(myArray[i].toString().substring(0,4));
				if (simplePercent.toString().indexOf('.') == 1) {
					simplePercent = simplePercent.toString().substring(0,simplePercent.toString().length-1);
				}
				myLabelString += myLabelArray[i].replace('|', '') + ' (' + parseFloat(simplePercent) + ' %)|';
			}
		}
		
		
		if (OtherPercent != 0) {
			myString += OtherPercent + ',';
			
			simplePercent = parseFloat(OtherPercent.toString().substring(0,4));
			if (simplePercent.toString().indexOf('.') == 1) {
				simplePercent = simplePercent.toString().substring(0,simplePercent.toString().length-1);
			}
			
			if (OtherCount == 1) {
				plural = '';
			} else {
				plural = 's';
			}
			myLabelString += OtherCount + ' other script' + plural + ' (' + parseFloat(simplePercent) + ' %)|';
		}
		myString = myString.substring(0,myString.length-1);
		myLabelString = myLabelString.substring(0,myLabelString.length-1);
	}
	
	if (sectionBR != true) {
		sectionBR = true;
		
		pieID = tableID-2;
		
		mainSection.childNodes[pieID].innerHTML += '<br/><br/><a href="javascript: " id="pielink">Show Pie Charts</a><span id="mypies" style="display: none;"></span>';
		mypies = document.getElementById('mypies');
		document.getElementById('pielink').addEventListener('click',function () {
			window.togglePies();
		},false);
		
	}
	
	if (location.toString().match(/http\:\/\/userscripts\.org\/users\/.*\/scripts/)) {columnToView++;}
	
	if (columnToView == 3) {
		ChartTitle = totalNum + ' Posts';
		myColor = 'FF8800';
	} else if (columnToView == 4) {
		ChartTitle = totalNum + ' Fans';
		myColor = 'FF0088';
	} if (columnToView == 5) {
		ChartTitle = totalNum + ' Installs';
		myColor = '88FF00';
	} 
	
	myAdd = '<img style="margin: 5px; border: 1px solid #888;" src="http://chart.apis.google.com/chart?cht=p&chs=700x200&chd=t:' + myString + '&chl=' + myLabelString + '&chtt=' + ChartTitle + '&chco=' + myColor + '" />';
	mypies.innerHTML+= myAdd;
}

if (location.toString().match('userscripts.org/home/scripts')) {
	sectionBR = false;
	
	myPieGraph(5);				//Installs
	myPieGraph(4);				//Fans
	myPieGraph(3);				//Posts
}

if (location.toString().match(/http\:\/\/userscripts\.org\/users\/.*\/scripts/)) {
	sectionBR = false;
	
	myPieGraph(4);				//Installs
	myPieGraph(3);				//Fans
	myPieGraph(2);				//Posts
}

window.togglePies = function () {
	if (document.getElementById('mypies').style.display == 'none') {
		document.getElementById('pielink').innerHTML = 'Hide Pie Charts';
		document.getElementById('mypies').style.display = 'inherit';
	} else {
		document.getElementById('pielink').innerHTML = 'Show Pie Charts';
		document.getElementById('mypies').style.display = 'none';
	}
}

/*********************************************************END SCRIPT MANAGEMENT GRAPH************************************/