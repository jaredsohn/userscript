// ==UserScript==
// @name          Hompage ForumReader Warrior General
// @version        4.0
// @namespace      briansimoneau
// @description   This code will put a div of new posts based on the links you give it in the homenotes
// @description   use the tags [p]Private Forum ID[/p] and [t]Team Forum ID[/t] to get the groups you want. 
// @include        http://glb.warriorgeneral.com/game/forum_thread_list.pl?*
// @include        http://glb.warriorgeneral.com/game/home.pl
// @include        http://glb.warriorgeneral.com/game/home
// ==/UserScript==

if(window.location == "http://glb.warriorgeneral.com/game/home.pl" || window.location == "http://glb.warriorgeneral.com/game/home"){
//Create the arrays and the Divs needed
var IDSet = new Array(10);
var GrabSet = new Array(10);
var PIDSet = new Array(10);
var PGrabSet = new Array(10);
var DevTemp = document.getElementById('sort_announcements');
var newDiv = document.createElement('div');
//Run Required setTimeout function
window.setTimeout(function() {
	runScript();
}, 1000);
}
else
{
    window.setTimeout(function() {
        forumButton();
    }, 1000);
}


//Run the homepage script 
function runScript(){
    DevTemp.parentNode.insertBefore(newDiv, DevTemp);  
    var grabNote = document.getElementById('my_note').innerHTML;
    splitNote(grabNote);
    psplitNote(grabNote);
    grabTeamForum(IDSet[0], 0);
    DevTemp.parentNode.insertBefore(newDiv, DevTemp);   
}

//Run the forum Button Page
function forumButton()
{
    var targetDiv = document.getElementById('threads');
    // Create a div to surround the button  
    var newDiv = document.createElement('div');  
    newDiv.setAttribute('id', 'subscribe'); 
    // Create the button and set its attributes  
    var inputButton = document.createElement('input');  
    inputButton.name = 'autoCheckOrderButton';  
    inputButton.type = 'button';  
    inputButton.value = 'Subscribe';  
    inputButton.setAttribute("onclick", "inputID(window.location);");
    if(window.location.href.indexOf("&team_id=0")!= -1){inputButton.addEventListener('click', ptinputID, false);  }
    else if(window.location.href.indexOf("forum_id=0&") != -1){inputButton.addEventListener('click', ttinputID, false);  }
    else if(window.location.href.indexOf("team_id") != -1){inputButton.addEventListener('click', tinputID, false);  }
    else{inputButton.addEventListener('click', inputID, false);}

    // Append the button to the div  
    newDiv.appendChild(inputButton);  
    targetDiv.parentNode.insertBefore(newDiv, targetDiv); 
}

//Parse Private ID
function inputID(){
    var data= window.location.toString();
    var beginIndex = data.indexOf("=");
    var ID = "<b>Please copy and paste in your Homepage custom user notes:</b> ";
    ID += "[p]" + data.substring(beginIndex+1) + "[/p]";
    var targetDiv = document.getElementById('subscribe');
    targetDiv.innerHTML = ID;
}

//Parse Team Id
function tinputID(){
    var data= window.location.toString();
    var beginIndex = data.indexOf("=");
    var ID = "<b>Please copy and paste in your Homepage custom user notes:</b> ";
    ID += "[t]" + data.substring(beginIndex+1) + "[/t]";
    var targetDiv = document.getElementById('subscribe');
    targetDiv.innerHTML = ID;
}

function ptinputID(){
    var data= window.location.toString();
    var beginIndex = data.indexOf("=");
    data = data.substring(beginIndex+1)
    var endIndex = data.indexOf("\&");;
    data =  data.substring(0, endIndex);
    var grab = "<b>Please copy and paste in your Homepage custom user notes:</b> ";
    grab += "[p]" + data+ "[/p]";
    var targetDiv = document.getElementById('subscribe');
    targetDiv.innerHTML = grab;
}

function ttinputID(){
    var data= window.location.toString();
    var beginIndex = data.indexOf("\&");
    data = data.substring(beginIndex+1)
    beginIndex = data.indexOf("=");
    data = data.substring(beginIndex+1)
    var grab = "<b>Please copy and paste in your Homepage custom user notes:</b> ";
    grab += "[t]" + data+ "[/t]";
    var targetDiv = document.getElementById('subscribe');
    targetDiv.innerHTML = grab;
}

//Split the note page into readable array
function splitNote(parNote)
{
    var i = 0;
    while(parNote.indexOf("[t]") != -1)
    {
        // get opponents team id
        var beginIndex = parNote.indexOf("[t]");
        var ID = parNote.substring(beginIndex+3);
        var endIndex = ID.indexOf("[/t]");
        parNote = parNote.replace("[t]", "");
        parNote = parNote.replace("[/t]", "");
        ID = ID.substring(0, endIndex);
        IDSet[i] = ID; 
        GrabSet[i] = 1;          
        if(IDSet[i] == ""){GrabSet[i] = 0;}
        i++;
    }
                        
}

//Split the notes p value into a readable array
function psplitNote(parNote)
{
    var i = 0;
    while(parNote.indexOf("[p]") != -1)
    {
        // get opponents team id
        var beginIndex = parNote.indexOf("[p]");
        var ID = parNote.substring(beginIndex+3);
        var endIndex = ID.indexOf("[/p]");
        parNote = parNote.replace("[p]", "");
        parNote = parNote.replace("[/p]", "");
        ID = ID.substring(0, endIndex);
        PIDSet[i] = ID; 
        PGrabSet[i] = 1;          
        //alert(IDSet[i]);
        if(PIDSet[i] == ""){PGrabSet[i] = 0;}
        i++;
    }
                        
}

//Grab Team Forum Data
function grabTeamForum(parID, parInt){
GM_xmlhttpRequest({ 
    method: 'GET',
    url: 'http://glb.warriorgeneral.com/game/forum_thread_list.pl?team_id=' + parID,
    headers: {
        'User-agent': navigator.userAgent,
	'Accept': 'text/xml'
    },
    onload: function(response){

         var team = response.responseText;
          //Grab the Team Name
          var beginIndex = team.indexOf("Forum -");
          var teamName = team.substring(beginIndex+8);
          var endIndex = teamName.indexOf("- Goal Line Blitz");
          teamName = teamName.substring(0, endIndex);
                                        

	var count = response.responseText.split("images/game/forum/new_posts.gif").length-1;  
        if(count >=1){
            newDiv.setAttribute('class', 'content_container'); 
            var myA = document.createElement("a");
            myA.setAttribute("style","color:#A03C19; text-decoration: none; ");
            myA.setAttribute("class","sort_forumbutton");
	    myA.href="http://glb.warriorgeneral.com/game/forum_thread_list.pl?team_id=" +parID;
	    myA.innerHTML = teamName + '(<b>' + count + '</b>) | ';

	    // Append the button to the div  
           newDiv.appendChild(myA);
        }

        if(GrabSet[parInt+1] ==1)
        {
            grabTeamForum(IDSet[parInt+1], parInt+1);
        }
        else{
            grabPrivateForum(PIDSet[0], 0);
        }		
}
	});	
}



//Grab Private Forum Data
function grabPrivateForum(parID, parInt){
GM_xmlhttpRequest({ 
    method: 'GET',
    url: 'http://glb.warriorgeneral.com/game/forum_thread_list.pl?forum_id=' + parID,
    headers: {
        'User-agent': navigator.userAgent,
	'Accept': 'text/xml'
    },
	onload: function(response){

         var team = response.responseText;
         //Grab the Team Name
         var beginIndex = team.indexOf("Forum -");
         var teamName = team.substring(beginIndex+8);
         var endIndex = teamName.indexOf("- Goal Line Blitz");
         teamName = teamName.substring(0, endIndex);
                                        

	var count = response.responseText.split("images/game/forum/new_posts.gif").length-1;  
        if(count >=1){
            newDiv.setAttribute('class', 'content_container'); 

	    var myA = document.createElement("a");

            myA.setAttribute("style","color:#3A5FCD; text-decoration: none; ");

	    myA.setAttribute("class","sort_forumbutton");
	    myA.href="http://glb.warriorgeneral.com/game/forum_thread_list.pl?forum_id=" +parID;
	    myA.innerHTML = teamName + '(<b>' + count + '</b>) | ';

	    // Append the button to the div  
            newDiv.appendChild(myA);
        }
        if(PGrabSet[parInt+1] ==1)
        {
            grabPrivateForum(PIDSet[parInt+1], parInt+1);
        }			
        }
    });	
}