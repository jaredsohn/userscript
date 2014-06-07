// ==UserScript==
// @name           Pardus Druggy
// @namespace      pardus.at
// @description    Keep track of your druggenness...
// @include        http://*.pardus.at/main.php*
// @include        http://*.pardus.at/msgframe.php*
// @include        http://*.pardus.at/ship2opponent_combat.php*
// @include        http://*.pardus.at/ship2ship_combat.php*
// @include        http://*.pardus.at/building.php*
// ==/UserScript==

// Beta v1.12 - Fixed to work when using drugs in combat with MO.
//      v1.11 - Made more robust again, also added host variable, and additional config for moving from msg to main frame.
//      v1.10 - Made more robust when there is a failure communicating with the server.
//      v1.9  - Added password field to user config for multiCompFile on server.
//      v1.8  - Changed color when undrugged but still TC drugginess drop available.
//      v1.7  - Added multi computer support.  Also filtering logs to avoid duplicates.
//            - And... altered things a bit to allow for multiple users using the same computer.
//      v1.6  - Added logging to external webserver (not the pardus servers!) for scientific purposes.
//      v1.5  - Fixed bug.
//      v1.4  - Fixed bug.
//      v1.3  - Fixed bug.
//      v1.2  - added drug use detection when in combat.
// 
// Created by: Mentor in Pegasus
// Ideas and help by many members of Federation Underground!
//


// Leave this line alone....
var TCvalUsers = [];

//
//   ******   USER CONFIG  ******
//
//    - here, set your TC med level (0-5) and you 'alter ego' for logging
// 		Array elements entries are: "real username", TClevel, "alter ego username", "password"
// one of these for each users, 
// REMEMBER: increment the array # when you add a user!
//    - you can have as many users as you like.
//    - leaving the 'alter ego' blank will just use your real username by default.
//    - make sure you assign a password.
//
TCvalUsers[0] = ["Mentor",  5, "",      "apassword"];       
TCvalUsers[1] = ["Aguilar", 0, "AgPeg", "3apasswd"]; 
TCvalUsers[2] = ["Olivia",  0, "",      "passme1"];     

//    - here, indicate if you want to save your drugginess to a remote server.
//	      This will allow you to use multiple computers and maintain your drugginess between them.
//	      (Or, multiple users on the same computer!)
//            NOTE: your character ID will be used as the file name if not defined in the above array.
var multiCompFile = true;

//    - here, indicate if you want to send logs for science to a webserver
//            NOTE: your character ID will be used in the log if not defined in the above array.
var logDrugUsage = true;

//     - here, indicate if you want it in the msg frame, or in the status box on the main frame
var showInMsgFrame = true;

//
//  ****** End of USER CONFIG ******


//
//  Main scripting setup code
//

// druggy host
var druggyhost = "http://yourdrughost.forpardusdruggy.com/"


var menuframe = null;
if(window.parent.frames.length > 0)  menuframe = window.parent.frames[0].document;
var msgframe = null;
if(window.parent.frames.length > 1)  msgframe = window.parent.frames[1].document;
var mainframe = null;
if(window.parent.frames.length > 2)  mainframe = window.parent.frames[2].document;

var universe;
var myimg = msgframe.getElementsByTagName("IMG");
if (myimg[0].getAttribute('title').search(/Artemis/) != -1)
{
    universe = "Arty";
}
else if (myimg[0].getAttribute('title').search(/Pegasus/) != -1)
{
    universe = "Peg";
}
else
{
    universe = "Orion";
}

var userimg = msgframe.getElementsByTagName('img');
var username =  userimg[0].getAttribute('title').replace('Artemis: ', '').replace('Orion: ', '').replace('Pegasus: ', '').replace(/^\s+|\s+$/g, '');
var pusername = username;
var password = "";

for(var tc = 0;tc < TCvalUsers.length ; tc++)
{
    if (TCvalUsers[tc][0] == username)
    {
        GM_setValue("TCval"+username, TCvalUsers[tc][1]);
	// assign alter-ego if not blank
	if (TCvalUsers[tc][2] != "")
	    pusername = TCvalUsers[tc][2];
        if (TCvalUsers[tc][3])
	    password = TCvalUsers[tc][3];
    }
}

//
// End of Main scripting setup
//

//
// Functions
// First, trap the drug submit event.  
//
function mysubmit(event) {

	//
	// Check to see if it is the button we want, then make sure it's for drugs
	// 
 	for(var i = 0; i < mainframe.getElementsByTagName('input').length; i++)
  	{
    		var a = mainframe.getElementsByTagName('input')[i];
		// Our button will have a value of 'Use'
    		if (a.value == 'Use')
    		{
			// ensure not the retreat button
			if (event.target.innerHTML.search(/retreat|how many rounds/i) != -1)
			{
				//alert("retreat button pressed");
			}
			else 
			{
				if (a.parentNode.firstChild.name == 'resid')
				{
					// combat drug use.
					//var resid = a.parentNode.firstChild;
					//var amount = resid.nextSibling;
					
					// new method - test
					resid = a.previousSibling.previousSibling.previousSibling;
					amount = a.previousSibling.previousSibling;
				
				}
				else
				{
					// non-combat drug use.
					var resid = a.previousSibling.previousSibling.previousSibling;
					var amount = resid.previousSibling.previousSibling.previousSibling;
				}

				// Drugs have a value of 51 (bots are 8)
    				if ((resid.getAttribute('value') == 51)&&(parseInt(amount.value)))
				{
					// set overdrug and drugTime
					var overdrug = GM_getValue("overdrug" + universe, 0);
					var TCval = GM_getValue("TCval" + username, 0);
					if ((overdrug) <= 0)
					{
						// we have no drugginess
						var time = new Date()
						var timeMS = time.getTime() / 1000;
						var timeInt = parseInt(timeMS);
						var lastDT = parseInt(GM_getValue("drugTime"+universe,0));
	    					GM_setValue("lastDT"+universe, lastDT);
						GM_setValue("drugTime"+universe,timeInt);
    						GM_setValue("lastDH" + universe, timeInt)
					}
					overdrug = overdrug + parseInt(amount.value);
					GM_setValue("drugs" + universe, parseInt(amount.value));
					GM_setValue("overdrug" + universe, overdrug);
					// save multi comp info
					if (multiCompFile)
                                        {
						RS_setValue(pusername);
					}
				}
			}
    		}
  	}
}

window.addEventListener('submit', mysubmit, true);

//
// Next, When the msg frame comes up, show the initial drug time, and the drugginess as a #.
//
//window.addEventListener('load', function(e) {

if(document.URL.indexOf('msgframe.php') >= 0) 
{

        userimg = msgframe.getElementsByTagName('img');
        username =  userimg[0].getAttribute('title').replace('Artemis: ', '').replace('Orion: ', '').replace('Pegasus: ', '').replace(/^\s+|\s+$/g, '');
        pusername = username;
        password = "";
	for(var tc = 0;tc < TCvalUsers.length ; tc++)
	{
    	    if (TCvalUsers[tc][0] == username)
    	    {
        	GM_setValue("TCval"+username, TCvalUsers[tc][1]);
		// assign alter-ego if not blank
		if (TCvalUsers[tc][2] != "")
		    pusername = TCvalUsers[tc][2];
        	if (TCvalUsers[tc][3])
	    	    password = TCvalUsers[tc][3];
    	    }
	}

	// Try to load GM variables from external server
	if (multiCompFile)
	{
    	    var curtime = new Date();
	    var lastload = GM_getValue("ServerLoadTime",0);
	    curtime = parseInt(curtime.getTime() / 1000);
	    var lastUser = GM_getValue("lastUser",0);
	    var usingServer = GM_getValue("ServerLoaded", 0);
	    var sendServerFail = GM_getValue("ServerSaveFail"+pusername, 0);
    	    var sendServerTime = GM_getValue("SendServerTime"+pusername, curtime);
	    
	    // if save failed, retry every 60s or so..
	    if ((sendServerFail) && ((curtime - sendServerTime) > 60))
	    {
		RS_setValue(pusername);
	    }
		
	    // have we loaded this in the last hour? OR has the user changed?
	    if (!sendServerFail && (((curtime - lastload) > 3600) || (!(lastUser == username)) || ((usingServer == 0) && ((curtime-lastload) > 60))))
            {
		GM_setValue("ServerLoaded", 0);
    	        RS_getValue(pusername);
		GM_setValue("ServerLoadTime", curtime);
		GM_setValue("lastUser", username);
	    }
        }
	
	// Search for the ' You feel like you have XXX Action Points more than you just had.' text
	// Table where child.child.child.child.child nodeType is text (3).
	// nodeType is 1, innerHTML has the text above
	var myfont = msgframe.getElementsByTagName("FONT");
 	for(var i = 0; i < msgframe.getElementsByTagName('FONT').length; i++)
	{
	  if (logDrugUsage)
	  {
	    if( myfont[i].innerHTML.search(/Action Points more than you just had/) != -1) 
	    {
		// do something with the # APs.	
		//
    		var curtime = new Date();
		curtime = parseInt(curtime.getTime() / 1000);
    		var drugTime = GM_getValue("drugTime" + universe, 0);
    		var lasthour = GM_getValue("lastDH" + universe, 0);
    		var lastDTtime = GM_getValue("lastDT" + universe, 0);
    		var drugsTaken = GM_getValue("drugs" + universe, 0);
		var overdrug = GM_getValue("overdrug" + universe, 0);
		var TCval = GM_getValue("TCval" + username, 0);

		// filter variables
		var sentTime = GM_getValue("sentTime", 0);
		var sentAPs = GM_getValue("sentAPs", 0);
		var sentOverdrug = GM_getValue("sentOverdrug", 0);

 		//  innerHTML: You feel like you have 233 Action Points more than you just had.
		var apmessage = myfont[i].innerHTML.replace("You feel like you have ",'');
		var aps = apmessage.replace(' Action Points more than you just had.','');
		apmessage = pusername + "," + aps + "," + drugsTaken + "," + overdrug + "," + TCval + "," + curtime + "," + drugTime + "," + lasthour + "," + lastDTtime + "\n";

		// filter out POST if we already sent this one
		if (!((curtime-sentTime < 60) && (sentAPs == aps) && (sentOverdrug == overdrug)))
		{
		    GM_xmlhttpRequest({
			method: "POST",
			url:  druggyhost + "sendapinfo.php",
			headers: { "Content-type" : "application/x-www-form-urlencoded" },
			data: encodeURI("message=" + apmessage),
			onload: function(e) {  }
		    });
		}

		// To filter out a refresh on the page, if time since last < 60s, and APs same, and druginnes same.
		// then don't send again.
		// So, need to store: 1) curtime 2) APs 3) drugginess
		GM_setValue("sentTime",curtime);
		GM_setValue("sentAPs",aps);
		GM_setValue("sentOverdrug",overdrug);

	    }
	  }
	}
}

window.addEventListener('load', function(e) {

   if (showInMsgFrame == true)
   {
     if(document.URL.indexOf('msgframe.php') >= 0) 
     {
	//var root = msgframe.body;
	var table = document.getElementsByTagName('table');
	var root = table[0].firstChild.firstChild.childNodes[3];
	var Sdrug = msgframe.createElement("SPAN");
	var Sdrugi = msgframe.createElement("SPAN");
	Sdrug.id = "Sdrug";
	Sdrug.style.margin = "5px";
	Sdrugi.id = "Sdrugi";
	Sdrugi.style.margin = "5px";

	var div = msgframe.createElement("DIV");
	div.id = "druggy";
        div.setAttribute('style', "font-weight:bold; font-size:10px; color:#CCCCCC; font-family: arial, verdana, sans-serif");
	div.align = "right";
	div.appendChild(msgframe.createTextNode("DTIME:"));
	div.appendChild(Sdrug);
	div.appendChild(msgframe.createTextNode("DREFF:"));
	div.appendChild(Sdrugi);
	root.appendChild(div);
	getDrugTimer();

	// if you want to update the timer more than once per minute....
	//window.setInterval(function()
	//{
	//	getDrugTimer();
	//}, 10000);
      }
   }
   else 
   {
     if(document.URL.indexOf('main.php') >= 0) 
     {
	//search for the parent table of the cargo section
	var table = document.getElementsByTagName('table');
	
	//Get the picture name to search for based on the Display Location Reference
	for(i = 0; i < table.length; i++)
	{
		if(table[i].innerHTML.indexOf('status.png') != -1)
		{
			var root = table[i+1].parentNode;
		}
	}	

	var Sdrug = mainframe.createElement("SPAN");
	var Sdrugi = mainframe.createElement("SPAN");
	Sdrug.id = "Sdrug";
	Sdrug.style.margin = "6px";
	Sdrugi.id = "Sdrugi";
	Sdrugi.style.margin = "6px";

	var div = mainframe.createElement("DIV");
	div.id = "druggy";
        div.setAttribute('style', "font-weight:bold; font-size:10px; color:#CCCCCC; font-family: arial, verdana, sans-serif");
	div.align = "center";
	div.appendChild(mainframe.createTextNode("DTIME:"));
	div.appendChild(Sdrug);
	div.appendChild(mainframe.createTextNode("DREFF:"));
	div.appendChild(Sdrugi);
	root.appendChild(div);
	getDrugTimer();
	// if you want to update the timer more than once per minute....
	window.setInterval(function()
	{
		getDrugTimer();
	}, 10000);
      }
    }

}, false);


function getDrugTimer()
{
    var curtime = new Date();
    var difftime = new Date();
    var showframe;

    var overdrug = parseInt(GM_getValue("overdrug" + universe, 0));
    var drugTime = parseInt(GM_getValue("drugTime" + universe, 0)) * 1000;
    var lasthour = parseInt(GM_getValue("lastDH" + universe, 0)) * 1000
    var TCval = parseInt(GM_getValue("TCval" + username, 0));

    var timeSec = curtime.getTime();

    // Subtract current time from drugtime.
    var timeSince = timeSec - drugTime;
    difftime.setTime(timeSince);

    // frame to display values
    if (showInMsgFrame == true)
    {
	showframe = msgframe;
    }
    else
    {
	showframe = mainframe;
    }

    // initialization problems fix.
    if (overdrug <= 0)
    { 
	overdrug = 0; 
    }

    // how many hours since last checked
    var hours = parseInt((timeSec - lasthour) / 1000 / 3600);
    if ((hours > 0) && (overdrug > 0))
    {
	// drugginess goes down by # hours
	var drugdiff = overdrug - hours;
	if (drugdiff <= 0)
	{ 
	    // reset clock when DREFF goes to 0. - note only increment by overdrug*3600
	    var zeroDrugTime = (lasthour/1000) + (overdrug*3600);
	    GM_setValue("lastDT"+universe, (drugTime/1000));
	    GM_setValue("drugTime"+universe, zeroDrugTime);

	    // init display clock
	    timeSince = curtime.getTime() - (zeroDrugTime*1000);
	    difftime.setTime(timeSince);
	    
	    overdrug = 0;
	}
	else
	{
	    overdrug = drugdiff;
	}
	GM_setValue("overdrug" + universe, overdrug);
	GM_setValue("lastDH" + universe, ((lasthour/1000) + (hours * 3600)) );	

	if ((multiCompFile) && (GM_getValue("ServerLoaded", 0) == 1))
        {
		RS_setValue(pusername);
	}
			
    }

    if ((GM_getValue("ServerLoaded",0) == 1) && (GM_getValue("ServerSaveFail"+pusername, 0) == 0))
    {
           showframe.getElementById("druggy").setAttribute('style', "font-weight:bold; font-size:10px; color:#CCCCCC; font-family: arial, verdana, sans-serif");
    }
    else if (GM_getValue('ServerSaveFail'+pusername,0) == 1)
    {
           showframe.getElementById("druggy").setAttribute('style', "font-weight:bold; font-size:10px; color:red; font-family: arial, verdana, sans-serif");
    }
    else
    {
	if (GM_getValue('ServerLoaded',0) == 2)
           showframe.getElementById("druggy").setAttribute('style', "font-weight:bold; font-size:10px; color:blue; font-family: arial, verdana, sans-serif");
        else
           showframe.getElementById("druggy").setAttribute('style', "font-weight:bold; font-size:10px; color:yellow; font-family: arial, verdana, sans-serif");
    }

    if((overdrug-TCval) >= 1 )
    {
    	showframe.getElementById("Sdrug").style.color = "Red";
	showframe.getElementById("Sdrugi").style.color = "Red";
    }
    else
    {
        if (overdrug)
	{
    	    showframe.getElementById("Sdrug").style.color = "Yellow";
	    showframe.getElementById("Sdrugi").style.color = "Yellow";
	}
	else
	{
    	    showframe.getElementById("Sdrug").style.color = "Limegreen";
	    showframe.getElementById("Sdrugi").style.color = "Limegreen";
	}
    }

    if (overdrug == 0)
    {
        //showframe.getElementById("Sdrug").innerHTML = "<b>00:00</b>";
        showframe.getElementById("Sdrug").innerHTML = "<b>" + showTimeVal(difftime.getUTCHours()) + ":" + showTimeVal(difftime.getMinutes()) + ":" + showTimeVal(difftime.getSeconds())+"</b>";
    }
    else if ((overdrug-TCval) > 0)
    {
        showframe.getElementById("Sdrug").innerHTML = "<b>" + (overdrug-TCval-1) + ":" + showTimeVal(parseInt(59-difftime.getMinutes())) + ":" + showTimeVal(59-difftime.getSeconds())+"</b>";
    }
    else if ((overdrug-TCval) <= 0)
    {
        showframe.getElementById("Sdrug").innerHTML = "<b>" + (overdrug-1) + ":" + showTimeVal(parseInt(59-difftime.getMinutes())) + ":" + showTimeVal(59-difftime.getSeconds())+"</b>";
    }

    overdrug = overdrug - TCval;
    showframe.getElementById("Sdrugi").innerHTML = "<b>" + overdrug + "</b>";

//var buttons = ''
//buttons =  '<br><input type="button" id="reset2" value = "Init Drug"><br>';
//msgframe.getElementById("Sdrugi").innerHTML =  msgframe.getElementById("Sdrugi").innerHTML + buttons;
//msgframe.getElementById('reset2').addEventListener('click',resetDrugTimer,true);
}

function resetDrugTimer()
{
    var drugtime = new Date();
    var drugSecs = drugtime.getTime() / 1000;
    var drugint = parseInt(drugSecs);

    drugint = drugint - (59*60);
    GM_setValue("overdrug"+universe,1);
    GM_setValue("drugTime"+universe,drugint);
    GM_setValue("lastDH"+universe,drugint);
		RS_setValue(pusername);
}

function showTimeVal(value)
{
  return (value > 9) ? "" + value : "0" + value;
}

function RS_getValue(storageName)
{
    // note: default should return the local

    // to make it easier, and because it doesn't happen often 
    // - GET all the values from the file.
    // - put all values into GM_getValue stored variables.
    // file format:
    // <universe name = "Arty,Peg,Orion">
    //     <lastDH>value</lastDH>
    //     <lastDT>value</lastDT>
    //     <overdrug>value</overdrug>
    //     <drugTime>value</drugTime>
    var lastDH = GM_getValue("lastDH"+universe, 0);
    var lastDT = GM_getValue("lastDT"+universe, 0);
    var overdrug = parseInt(GM_getValue("overdrug"+universe, 0));
    var drugTime = GM_getValue("drugTime"+universe, 0);


    GM_xmlhttpRequest({
        method: 'POST',
	url:  druggyhost + "getuserinfo.php",
	headers: { "Content-type" : "application/x-www-form-urlencoded" },
	data: encodeURI("filename=" + storageName + "&universe=" + universe + "&lastDH=" + lastDH + "&lastDT=" + lastDT + "&overdrug=" + overdrug + "&drugTime=" + drugTime + "&pw=" + password),
        onload: function(responseDetails) {
//alert("b4get: filename=" + storageName + "&universe=" + universe + "&lastDH=" + lastDH + "&lastDT=" + lastDT + "&overdrug=" + overdrug + "&drugTime=" + drugTime + "&pw=" + password)
//alert("get:"+responseDetails.responseText);
	    var pwdok = responseDetails.responseText;
	    if (pwdok.search(/invalid password/) == -1)
	    {
                var parser = new DOMParser();
                var dom = parser.parseFromString(responseDetails.responseText,
                    "application/xml");
                var unis = dom.getElementsByTagName('Universe');
                for (var i = 0; i < unis.length; i++) {
		    if (unis[i].getAttribute('value') == universe)
		    {
		        // these are the values we want
                        lastDH = parseInt(unis[i].getElementsByTagName('lastDH')[0].getAttribute('value'));
                        lastDT = parseInt(unis[i].getElementsByTagName('lastDT')[0].getAttribute('value'));
                        overdrug = parseInt(unis[i].getElementsByTagName('overdrug')[0].getAttribute('value'));
                        drugTime = parseInt(unis[i].getElementsByTagName('drugTime')[0].getAttribute('value'));
		        if ((lastDT != 0) || (drugTime != 0))
		        {
	                    GM_setValue("lastDH" + universe, lastDH);
	                    GM_setValue("lastDT" + universe, lastDT);
	                    GM_setValue("overdrug" + universe, overdrug);
	                    GM_setValue("drugTime" + universe, drugTime);
	                    GM_setValue("ServerLoaded", 1);
    			    getDrugTimer();
		        }
		    }
                }
	    }
	    else
	    {
	        GM_setValue("ServerLoaded", 2);  // indicate invalid password
    		getDrugTimer();
	    }
        },
	onerror: function(responseDetails) {
	    GM_setValue("ServerLoaded", 0);
    	    getDrugTimer();
	}
    });

}

function RS_setValue(storageName)
{
    // make it one file per username - user gives username to help avoid conflict.
    // XML file with the following properties:
    // overdrug
    // drugTime
    // lastDH
    // lastDT
    // don't care about TCval and drugs.
    // security issue - if it is per user, someone else could messup/overwrite your file.
    // Invesitgate if I can get local IP or mac # or something.
	
    // to make it easier, and because it doesn't happen often 
    // - grab all values from GM_getValue stored variables.
    // - format for the XML file, then POST them to the file.
    var lastDH = parseInt(GM_getValue("lastDH"+universe, 0));
    var lastDT = parseInt(GM_getValue("lastDT"+universe, 0));
    var overdrug = parseInt(GM_getValue("overdrug"+universe, 0));
    var drugTime = parseInt(GM_getValue("drugTime"+universe, 0));
    var curtime = new Date();
    var failrequest = 1;
    curtime = parseInt(curtime.getTime() / 1000);

    // indicate we tried to send data from server
    GM_setValue("SendServerTime"+pusername, curtime);

    // send data to php script
    GM_xmlhttpRequest({
	method: "POST",
	url: druggyhost + "senduserinfo.php",
	headers: { "Content-type" : "application/x-www-form-urlencoded" },
	data: encodeURI("filename=" + storageName + "&universe=" + universe + "&lastDH=" + lastDH + "&lastDT=" + lastDT + "&overdrug=" + overdrug + "&drugTime=" + drugTime + "&pw=" + password),
	onload: function(responseDetails) {  
	    var pwdok = responseDetails.responseText;
	    failrequest = 0;
//alert("send:"+responseDetails.responseText);
	    if (pwdok.search(/invalid password/) == -1)
	    {
	        if (pwdok.search(/save ok/) != -1)
		{
    		    GM_setValue("ServerSaveFail"+pusername,0); 
	    	    RS_getValue(storageName);
//alert("saveok:"+responseDetails.responseText);
		}
		else 
		{
		    GM_setValue("ServerSaveFail"+pusername,1); 
	    	    getDrugTimer();
		}
	    }
	    else 
	    {
		GM_setValue("ServerSaveFail"+pusername,1); 
	    	getDrugTimer();
	    }
	},
	onerror: function(responseDetails) {
	    failrequest = 0;
	    GM_setValue("ServerSaveFail"+pusername,1); 
	    getDrugTimer();
	}
    });

    if (failrequest)
    {
	 // GM_xmlhttpRequest didn't call onload OR onerror!
	 GM_setValue("ServerSaveFail"+pusername,1); 
    }
}
