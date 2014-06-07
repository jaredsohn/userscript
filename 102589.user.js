// ==UserScript==
// @name          ScoutKings Functions
// @version        0.2
// @namespace      Kjoe
// @description   This is needed to run this forum effeciently 
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=4605126*
// ==/UserScript==


//Create the arrays and the Divs needed
var grabContent = document.getElementById('post_content_42015743').innerHTML;
var IDSet = new Array(20);
var PIDSet = new Array(20);
var i = 0;

//Run Required setTimeout function
window.setTimeout(function() {
	runScript();
}, 1000);


//Run the homepage script 
function runScript(){
splitNote(grabContent);
psplitNote(grabContent);
addImages();
post();
}

function post()
{
   var j = 0;
   var code="<div id=\"Contain\" width=\"100%\" height = \"100%\">";
   while(j<i)
   {
      code +=  IDSet[j]; 
      j++;
   }

code+= "</div>";
code+="<div id=\"Contain1\" width=\"845px\" height = \"200px\" style = \"float:left;\"><br><br><br><br><br><br></div>";

document.getElementById("post_content_42015743").innerHTML = code;
}

//Split the note page into readable array
function splitNote(parNote)
{
    
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
      i++;

    }
                        
}

//Split the notes p value into a readable array
function psplitNote(parNote)
{
    var k = 0;
    while(parNote.indexOf("[p]") != -1)
    {
        // get opponents team id
       var beginIndex = parNote.indexOf("[p]");
        var ID = parNote.substring(beginIndex+3);
        var endIndex = ID.indexOf("[/p]");
        parNote = parNote.replace("[p]", "");
        parNote = parNote.replace("[/p]", "");
        ID = ID.substring(0, endIndex);
        PIDSet[k] = ID; 
        k++;
    }
                        
}

function addImages(){
var j = 0;
while(j<i)
   {
      IDSet[j] = "<div style=\"width:120px; height:120px;  float:left;\"><a href=\"http://goallineblitz.com/game/team.pl?team_id=" + IDSet[j]+ " \"alt =\"" + PIDSet[j] + "\"><img src=\"http://goallineblitz.com/game/team_pic.pl?team_id=" + IDSet[j] + "\" width=\"75\" height =\"75\"></a><br>"+ PIDSet[j] + "</div>"; 
      j++;
   }
}

//Function created by www.anyexample.com to return elementsbyclass that equal the classes we are using
function getElementsByClass( searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(t=0,j=0; t<tags.length; t++) { 
		var test = " " + tags[t].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[t];
	} 
	return el;
}