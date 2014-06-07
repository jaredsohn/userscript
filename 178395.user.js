// ==UserScript==
// @name        trav_test_1
// @namespace   trav_test_1
// @include     *ts5.travian.com/dorf1.php*
// @include     *ts5.travian.com/dorf2.php*
// @include     *ts5.travian.co.uk/dorf1.php*
// @include     *ts5.travian.co.uk/dorf2.php*
// @version     1
// ==/UserScript==
var timer;
var timerAsString;
var timerInSecs;
var hasSpoken = false;
var wood;
var clay;
var iron;
var wheat;
var wheatconsump;
var woodperhour;
var clayperhour;
var ironperhour;
var wheatperhour;
  var warehouse;
var granary;

var upgradecosts;

// fieldlvls[i] = [fieldnumber,fieldtype,level] ie: [3,1,5] = build.php?id=3, wood, level 5
var fieldlvls;

var genericlinktofield = "http://ts5.travian.com/build.php?id=";

// populate variables
wood = document.getElementById("l1").innerHTML;
clay = document.getElementById("l2").innerHTML;
iron = document.getElementById("l3").innerHTML;
wheat = document.getElementById("l4").innerHTML;

warehouse = document.getElementById("stockBarWarehouse").innerHTML;
granary = document.getElementById("stockBarGranary").innerHTML;

// get production per hour
woodperhour = document.querySelector("#production > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(3)").innerHTML;
clayperhour = document.querySelector("#production > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)").innerHTML;
ironperhour = document.querySelector("#production > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(3)").innerHTML;
wheatperhour = document.querySelector("#production > tbody:nth-child(2) > tr:nth-child(4) > td:nth-child(3)").innerHTML;


// check if gran or warehouse full, check for starvation
setInterval(function() {
	var isFull = false;
	if (wood >= warehouse * 0.9 || clay >= warehouse * 0.9 || iron >= warehouse * 0.9 || wheat >= granary * 0.9) 
	   playAlert()
	   alert("warehouse or granary full!")
	   
// check if starvation
    if ( wheat <= 0.05*granary && parseInt(wheatperhour) <=0)
        playAlert()
        alert("Granary lvl <= 5% ; troops gona starve soon")
    
}, 1000 * 60 * 40)



// alert when building finished
setInterval(function() {
	timer = document.getElementById("timer1");
	timerAsString = timer.innerHTML.split(":");
	timerInSecs = timerAsString[0] * 3600 + timerAsString[1] * 60 + timerAsString[2];
	if (timerInSecs < 32 && hasSpoken == false) {
	   // alert("building finished");
		playAlert();
		//openSound("http://www.youtube.com/watch?v=ThOXlmVbQGs");
		hasSpoken = true;
		//alert("worked");
		//buildnext()
	}
	if (timerInSecs > 66 && hasSpoken == true) {
		hasSpoken = false;
	}
}, 1000*30);


// get field lvls
function getFieldLvls () {
    var fieldtypenumber = 0;
    var fieldlvl = 0;
    for (var i=1;i<19;i++)
    {
        var tempstring = document.querySelector("#rx > area:nth-child("+i+")").outerHTML;
        var fieldtype = tempstring.substring(tempstring.indexOf("alt=")+5,tempstring.indexOf(" Level"));
        if (fieldtype.indexOf("Wood") != -1)
            fieldtypenumer = 1;
        else if (fieldtype.indexOf("Clay") != -1)
            fieldtypenumber = 2;
        else if (fieldtype.indexOf("Iron") != -1)
            fieldtypenumber = 3;
        else if (fieldtype.indexOf("Crop") != -1)
            fieldtypenumber = 4;           
        fieldlvl = tempstring.substring(tempstring.indexOf("Level ")+6,tempstring.indexOf("\">"));
        fieldlvls[i] = [i,fieldtypenumber,fieldlvl];
        }
}

/*
// build next field
buildNextField() {
  // get lowest field lvls of each type
  var lowestwood;
  var lowestclay;
  var lowestiron;
  var lowestwheat;
  for (var i =1; i<5;i++) {
   for (var j=1; j<19;j++) {
   
   }
  }

}
*/


// helper functions: alerts
function openSound(link) {
	window.open(link);
	setTimeout(function() {
		window.close();

	}, 9000);
}

function playAlert() {
	window.open("http://www.youtube.com/watch?v=BQI1Fvp6rBw");
}
