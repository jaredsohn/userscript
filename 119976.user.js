// ==UserScript==
// @name          LTS 1.6
// @namespace     http://airrivalspl.comastuff.com/
// @description   checking SH
// @include       http://logtool.airrivals.de/logs/speedhack/*
// @include       http://logtool.airrivals.de/logs/speedhack
// ==/UserScript==
// constants to define the title of the alert and button text.
var ALERT_TITLE = "Oops!";
var ALERT_BUTTON_TEXT = "Ok";

// over-ride the alert method only if this a newer browser.
// Older browser will see standard alerts
if(document.getElementById) {
	window.alert = function(txt) {
		createCustomAlert(txt);
	}
}

function createCustomAlert(txt) {
	// shortcut reference to the document object
	d = document;

	// if the modalContainer object already exists in the DOM, bail out.
	if(d.getElementById("modalContainer")) return;

	// create the modalContainer div as a child of the BODY element
	mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
	mObj.id = "modalContainer";
	 // make sure its as tall as it needs to be to overlay all the content on the page
	mObj.style.height = document.documentElement.scrollHeight + "px";

	// create the DIV that will be the alert 
	alertObj = mObj.appendChild(d.createElement("div"));
	alertObj.id = "alertBox";
	// MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert
	if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
	// center the alert box
	alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";

	// create an H1 element as the title bar
	h1 = alertObj.appendChild(d.createElement("h1"));
	h1.appendChild(d.createTextNode(ALERT_TITLE));

	// create a paragraph element to contain the txt argument
	msg = alertObj.appendChild(d.createElement("p"));
	msg.innerHTML = txt;
	
	// create an anchor element to use as the confirmation button.
	btn = alertObj.appendChild(d.createElement("a"));
	btn.id = "closeBtn";
	btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
	btn.href = "#";
	// set up the onclick event to remove the alert when the anchor is clicked
	btn.onclick = function() { removeCustomAlert();return false; }

	
}

// removes the custom alert from the DOM
function removeCustomAlert() {
	document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
	function color()
	{
		var arTableRows = document.getElementsByTagName('tr');
		var bHighlight = true;
		for (var j = arTableRows.length - 1; j >= 0; j--) {
			var elmRow = arTableRows[j];
			elmRow.style.backgroundColor = bHighlight ? '#ddd' : '#fff';
			elmRow.style.color = '#000';
			bHighlight = !bHighlight;
		}
		
		return(arTableRows.length - 1);
	} 
	function check (e)
	{
	
	var end = e;
var kto = new Array();
var poz = new Array();
var sumapoz8=0;
var nick = new Array();
for ( var i=1; i<end; i++ )
{
var headings = document.evaluate('//html/body/div[2]/div[2]/div[2]/table/tbody/tr['+i+']/td[7]', document, null, XPathResult.ANY_TYPE,null); 
var thisHeading = headings.iterateNext();

while (thisHeading) {
if(thisHeading.textContent==1)
{
				var j=0;
                var ktos = document.evaluate('//html/body/div[2]/div[2]/div[2]/table/tbody/tr['+i+']/td[1]', document, null, XPathResult.ANY_TYPE,null); 
                var thisktos = ktos.iterateNext();
                while (thisktos) 
                    {
				        if (nick.length-1<0)
				        {
					       nick[j] = (i); 
                           kto[0] =  thisktos.textContent;
                           poz[0] = 1;
				        }
				        else
				        {
					j = nick.length;
					nick[j] = (i);
                    for (var x=0; x<kto.length; x++)
                    {
                    if(kto[x]===thisktos.textContent)
                    {
                      poz[x]=poz[x]+1;   
                    }
                    else
                    {
                    var temp = kto.length;
                    kto[temp] = thisktos.textContent;
                    poz[temp]=1;
                    }
                    }
				        }
                    thisktos = ktos.iterateNext();
                    }
sumapoz8= sumapoz8 +1;
}

thisHeading = headings.iterateNext();
}
}
if(sumapoz8==0)
{
alert('Brak hackerow');
}
else
{
var temp="\n";
for (j=0; j<kto.length; j++)
{
    temp=temp+kto[j]+poz[j];
}
alert('Znaleziono podejrzanych wpisow: '+sumapoz8+temp);
}
	hnick = document.getElementsByTagName('tr');
	for (j=0; j<nick.length;j++)
	{
	
		var ehnick = hnick[nick[j]+1];
		ehnick.style.backgroundColor = 'red';
		//ehnick.style.color = 'red';
	}
}
var e = color();
check(e);