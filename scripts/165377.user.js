// ==UserScript==
// @name           Hilite Players
// @description    Highlights a set of players on the BritishTennis web site
// @author         Mark CE
// @include        http://www.britishtennis.net/gbtop*
// @version        1.0
// ==/UserScript==

// DON'T CHANGE THE ORDER OF THIS!!! THEY NEED CORE NUMBERS TO MATCH!
var Players = new Array("Anna Smith","Danielle Konotoptseva","Laura Deigman","Laura Robson","Heather Watson","Johanna Konta","Tara Moore","Lisa Whybourn","Amanda Carreras","Harriet Dart","Matthew Short","Kyle Edmund","Oliver Golding","Neil Pauffley","Jack Carpenter","Andrew Fitzpatrick","Dan Smethurst","Tom Farquharson","Andy Murray","Dan Evans","Jasmine Amber Asghar","Sophie Watts","Katie Boulter");
var corePlayers = new Array("anna-smith/2674","danielle-konotoptseva/62345","laura-deigman/28083","laura-robson/9018","heather-watson/7029","johanna-konta/15308","tara-moore/1774","lisa-whybourn/10182","amanda-carreras/2759","harriet-dart/28142","matthew-short/5284","kyle-edmund/37810","oliver-golding/13359","neil-pauffley/2039","jack-carpenter/8657","andrew-fitzpatrick/10491","daniel-smethurst/10272","tom-farquharson/18500","andy-murray/279","daniel-evans/2657","jasmine-amber-asghar/54996","sophie-watts/28074","katie-boulter/16343");

var nonPlayers = new Array("Jessica Ren","Jade Windley","Anna Fitzpatrick","Pippa Horn","Nicole Peterson","Anne Keothavong","Elena Baltacha","Samantha Murray","Francesca Stephenson","Lucy Brown","Eleanor Dean","Robyn Beddow","Samantha Vickers","Sabrina Bamburac","Daneika Borthwick","Alex Ward","David Rice","Edward Corrie","James Marsalek","Liam Broady","Richard Gabb","Ashley Hewitt","Brydan Klein","Tom Burn","Manisha Foster","Jessica Simpson","Katy Dunne");
var killPlayers = new Array("Naomi Broady","Melanie South","Emily Webley-Smith","Nicola Slater","James Ward","Jamie Baker","Josh Milton","Dan Cox","Chris Eaton","Sean Thornley","George Morgan","Morgan Phillips","Lewis Burton","Marcus Willis","Toby Martin","Josh Goodall","Alex Bogdanovic","Richard Bloomfield","Alex Slabinsky");

var maybePlayers = new Array("Alicia Barnett","Nicola George");


var myColours = new Array("Thistle","MistyRose","Moccasin","Lavender","PeachPuff","Tan","PaleGoldenrod","LightGreen","Aquamarine","CornflowerBlue","Pink");
var nonColour = "#CCCCEE";
var killColour = "#666699";
var myColour = "#EEEEEE";
var theColour = "";

var bucket = document.getElementsByTagName("body")[0].getElementsByTagName("span");
var bucket2 = document.getElementsByTagName("body")[0].getElementsByTagName("td");
var bucketHREF = document.getElementsByTagName("body")[0].getElementsByTagName("a");
var e;
var c;
var px;
var ex;
var myfound;
var oldrank;
var newrank;
var relative;

c = 0;

for (var p = 0; p < Players.length; p++) {
    myfound = 0;
    px = Players[p].replace( /\s\s+/g, " " );
for ( var i = 0; i < bucket.length; i++ ) {
    e = bucket[i];
    ex = e.innerHTML.replace( /\s\s+/g, " " );
    
    if (ex.indexOf(px)==0 ) {
        e.style.background=myColours[c];
        e.style.display="block";
	var aTd = e.parentNode.parentNode.parentNode.getElementsByTagName("td");
	var aTL = aTd[2].getElementsByTagName("a");
	for (var k=0; k < aTL.length; k++) {
		aTL[k].href = "http://www.coretennis.net/tennis-player/" + corePlayers[p] + "/stats.html";
	}
	for (var j=0; j < aTd.length; j++) {
	


	if (j==14){
		var myImg = aTd[j].getElementsByTagName("IMG");
		if (myImg.length != 0) {
		  	var aTx = aTd[2].getElementsByTagName("span");
			for (var k=0; k < aTx.length; k++) {
			  	aTx[k].style.background = "#ACF88A";
			}
			aTd[23].style.background = "#ACF88A";
		}

	}

	if (j==16){
		var myImg = aTd[j].getElementsByTagName("IMG");
		if (myImg.length != 0) {
			if (aTd[23].innerText.length >= 6) {
				console.log (aTd[23].innerText) ;
		  		var aTx = aTd[2].getElementsByTagName("span");
				for (var k=0; k < aTx.length; k++) {
			  		aTx[k].style.background = "LightGray";
				}
				aTd[23].style.background = "LightGray";
			}
		}

	}

	if (j==22){
		if (aTd[j].innerText !="") {
			myString = aTd[j].innerText;
			for (var z = 0; z < myString.length; z++) {
				if (myString[z] == ".") {
		  			var aTx = aTd[2].getElementsByTagName("span");
					for (var k=0; k < aTx.length; k++) {
			  			aTx[k].style.background = "Yellow";
					}
					aTd[23].style.background = "Yellow";
				}	
			}
		}
	}

	if (j==29){
	  aTd[j].innerText = Players[p];
	}
	if (aTd[j].style.background == "") {
	aTd[j].style.background=myColours[c];
	aTd[j].style.fontWeight=800;
	}
	if (j==8){
           newrank = aTd[j].innerText;
	}
	if (j==10){
	  oldrank = aTd[j].innerText;
          if (newrank <= oldrank) {
		oldrank = newrank;
		aTd[j].innerText = newrank;
		}
	relative = (newrank/1+15)/(oldrank/1+15);
	  aTd[j].style.color = "White";
	if (newrank == oldrank) {
		aTd[j].style.background = "Yellow";		
	  aTd[j].style.color = "Black";
	}
         else if (relative >= 1.251) {
		aTd[j].style.background = "Grey";		
	}
         else if (relative >= 1.101) {
		aTd[j].style.background = "Tan";		
	}
         else {
		aTd[j].style.background = "Orange";		
	}
	}
	}

        if (myfound ==0) {
           myfound = 1;
           c = c+1;

           if ( c > 6 ) {
              c = 0;
           }
        }
     }
}
}

for (var p = 0; p < nonPlayers.length; p++) {
    px = nonPlayers[p].replace( /\s\s+/g, " " );
for ( var i = 0; i < bucket.length; i++ ) {
    e = bucket[i];
    ex = e.innerHTML.replace( /\s\s+/g, " " );
    if (ex.indexOf(px)==0 ) {
        e.style.background=nonColour;
        e.style.display="block";
	var aTd = e.parentNode.parentNode.parentNode.getElementsByTagName("td");
	for (var j=0; j < aTd.length; j++) {
	   if (j==29){
	     aTd[j].innerText = nonPlayers[p];
	   }
	aTd[j].style.fontWeight=400;
	  }
    }
}
}

for (var p = 0; p < killPlayers.length; p++) {
    px = killPlayers[p].replace( /\s\s+/g, " " );
for ( var i = 0; i < bucket.length; i++ ) {
    e = bucket[i];
    ex = e.innerHTML.replace( /\s\s+/g, " " );    
    if (ex.indexOf(px)==0 ) {
        e.style.background=killColour;
        e.style.display="block";
	var aTd = e.parentNode.parentNode.parentNode.getElementsByTagName("td");
	for (var j=0; j < aTd.length; j++) {
	   if (j==29){
	     aTd[j].innerText = killPlayers[p];
	   }
	aTd[j].style.fontWeight=400;
	  }
    }
}
}

for ( var i = 0; i < bucketHREF.length; i++ ) {
    e = bucketHREF[i];
    px = "activeboard";
    if (e.href.indexOf(px)>=0 ) {
        e.style.background="PaleGoldenrod";
        e.style.display="block";
	e.href= e.href + "?sort=newestFirst";
    }
}