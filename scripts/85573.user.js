
// ==UserScript==
// @name           IkariamMemberOnline_And_ArmyScore
// @namespace      ikariamScript
// @description    Replaces the lightbulb with the date last online when viewing the Alliance Member List and show Military Score
// @include        http://*.ikariam.*/*
// ==/UserScript==

/*
This function lets us access an element by it's class name
Original Author: wphilipw
*/

document.getElementsByClass = function(className) {
  var all = document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}

getElementsByClass2 = function(inElement, className) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (all[e].className == className) {
      elements[elements.length] = all[e];
    }
  }
  return elements;
};

/*
This function extends the String prototype to add the trim method
Original Author: http://www.whadiz.com/
Source: "http://www.whadiz.com/what-is.aspx/programming/javascript/javascript-trim"
*/

String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}


/*
This function runs when the system starts
Original Author: Ektdeheba
For version: 0.1.0
Last changed: 0.1.0
*/

function init() {
    // if we are looking at the member listing
    var memberInformation = document.getElementById('memberList');
    if (memberInformation){
        // and if the list has any items in it -- but it always should...
        var listElements = memberInformation.getElementsByTagName('td');
        if (listElements.length > 0){
            // then call the script
            addLastOnline_fn();
        }
    }
	
	var memberList = document.getElementById('memberList');
	if (memberList) {
		var trList = memberList.getElementsByTagName('tr');
		for (var i=0; i<trList.length; i++) {
			getUserScore( trList[i] );
		}
	}
}


/*
This function helps convert the Ikariam internal date format (day.month.year)
to the javascript Date Object format (year,month,day).
Original Author: Ektdeheba
For version: 0.1.1
Last changed: 0.1.2
*/
function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}


/*
The main function
Original Author: Ektdeheba
For version: 0.1.0
Last changed: 0.1.1
*/

function addLastOnline_fn() {
    var e = 0;  // loop iterator
    var onlineMemberList = document.getElementsByClass("online");
    var offlineMemberList = document.getElementsByClass("offline");

    // Online Members - "Online Now"
    for ( e = 0; e < onlineMemberList.length; e++){
        onlineMemberList[e].innerHTML += "<b><font color=#008800>Online</font></b>"
        onlineMemberList[e].style.backgroundImage = "none"
    }
    
    var nowDateStr = document.getElementById('servertime').innerHTML.split(" ")[0].trim();
    var nowDate = convertIkariamDate( nowDateStr );
    var inactiveDate = new Date();
    inactiveDate.setDate( nowDate.getDate() - 7 );  // accounts generally go inactive after seven days
    
    // Offline Members - last date logged in
    for ( e = 0; e < offlineMemberList.length; e++){

        var lastOnline = offlineMemberList[e].title.split(":")[1].trim()
        var lastDate = convertIkariamDate( lastOnline );

        if( lastDate < inactiveDate ){
            offlineMemberList[e].innerHTML += "<B><font color=#F00000>"+lastOnline+" (i)</font></B>"
        }else{
            offlineMemberList[e].innerHTML += lastOnline
        }
        offlineMemberList[e].style.backgroundImage = "none"
    }
}


// find score and show it in the members row
getUserScore = function (tr) {
	tdList = tr.getElementsByTagName('td');
	if (tdList.length > 4) {
		var userName = tdList[1].innerHTML;
		var scoreTD = tdList[4];
		
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://'+top.location.host+'/index.php',
			data: "view=highscore&highscoreType=army_score_main&searchUser="+userName,
			headers: {
			  'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; pl; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1',
			  'Content-type': 'application/x-www-form-urlencoded',
			  'Accept': 'application/atom+xml,application/xml,text/xml',
			  'Referer': 'http://'+top.location.host+'/index.php'
			},
			onload: function(response) {
				var hdiv = document.createElement("div");
				hdiv.setAttribute("style", "display: none;");
				document.body.appendChild(hdiv);
				hdiv.innerHTML = response.responseText;
				var score = getElementsByClass2(hdiv, "score");
				if (score.length) {
					scoreTD.innerHTML = 
						'<table style="width: 100%; background-color: transparent !important; margin: 0"><tr>'+
						'<td style="width: 50%; text-align: right; padding: 0;">'+scoreTD.innerHTML+'</td>'+
						'<td style="padding: 0 5px;">•</td>'+
						'<td style="width: 50%; text-align: left; padding: 0;" title="General Score">'+score[0].innerHTML+'</td>'+
						'</tr></table>';
				}
				document.body.removeChild(hdiv);
			}
		});
	}
}

/*
The startup functions and global variables.
*/

init();