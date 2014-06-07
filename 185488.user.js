// ==UserScript==
// @name        MLS Summary
// @namespace   net.pwlk
// @description Prints box of summary information
// @include     http://rein.fusionmls.com/DotNet/Pub/GetViewEx.aspx
// @version     1.2.0
// @grant       none
// ==/UserScript==

var F_DEBUG = false;
var doesContain = new Object;
var isLT = new Object;
var isGT = new Object

// doesContain["High School"] must be an array of strings that should be contained in info["High School"]
// isLT["Rent"] is what info["Rent"] must be less than
// isGT["Bedrooms"] is what info["Bedrooms"] must be greater than

isLT["Rent"] = 1800;
isGT["Bedrooms"] = 3;
isGT["Full Baths"] = 1;
isGT["Appx Acres"] = 0.25;
doesContain["Appliances"] = new Array();
doesContain["Appliances"].push("Refrigerator");
doesContain["Appliances"].push("Disposal");
doesContain["Appliances"].push("Dishwasher");
doesContain["Parking"] = new Array();
doesContain["Parking"].push("Garage");





function formatScoreLine(procon)
{
	output = "";
	var title = "";
	if (typeof procon == "string")
		title = procon;
	else
		title = procon[0];
		
	output += '<li>' + title + ': ' + info[title];
	if (doesContain[title])
	{
		output += ' (contains ' + procon[1] + ')';
	}
	if (isLT[title]) output += ' (< ' + isLT[title] + ')';
	if (isGT[title]) output += ' (> ' + isGT[title] + ')';
	output += "</li>";
	
	return output;
}

var debug = "<br>-----debug-----<br>";

var html = document.body.innerHTML;


var nobr = document.body.innerHTML.match(/<nobr>(.*)<\/nobr>/ig);

// Build the info object, info["High School"] is the amount.  "High School" is the title on the page, "High School:" 
var info = new Object;
var title = "";
for (var i=0; i<nobr.length; i++)
{
	// no html tags, no dollar signs, commas
	var line = nobr[i].replace(/<\/?[^>]+(>|$)/g, "").replace(/\$/g,"").replace(/,/g,"").trim();
	
	// Check for rent ... clunky
	if (i+1 < nobr.length && !info.rent && nobr[i+1].replace(/<\/?[^>]+(>|$)/g, "").trim() == "Market Time:")
	{
		// Found rent
		info.Rent = line;
	}
	
	debug += "line: " + line + " [-1] is " + line.charAt(line.length-1) + "<br>";
	
	if (line.charAt(line.length-1) == ":")
	{
		debug += "We have a title in queue<br>";
		// We have a title in queue
		if (title == "")
		{
			debug += line + "<br>";
			title = line.substr(0, line.length-1);
		}
		else
		{
			// Got a new title before the last one was populated, make it blank
			debug += title + ": empty<br>";
			info[title] = "n/a";
			title = line.substr(0, line.length-1);
		}
	}
	else
	{
		debug += "We have a non-title in queue<br>";
		// We have a non-title in queue
		if (title == "")
		{
			// Forget about it, skip it
		}
		else
		{
			debug += title + ": " + line + "<br>";
			info[title] = line
			title = "";
		}
	}
}


//alert(html);
//alert("length: " + nobr);
var output = '';

var url_address = encodeURIComponent(info['Address'] + ' ' + info['City/Zip']);

output += '<div style="position:absolute; left:900px; width:960px; height:720px;"><iframe src="https://mapsengine.google.com/map/embed?mid=zyB2fK6OjZzU.kdfve4b7crtk" width="960" height="720"></iframe></div>';
output += '<div style="position:absolute; left:900px; width:300px; top:740px; border:solid;">';
output += '<b>Links</b><br>';
output += '<ul>';
output += '<li><a href="https://www.google.com/search?q=trulia+rental+' + url_address + '" target="_blank">Trulia</a>';
output += '</ul>';
output += '<b>Score Card</b><br>';


// --- show all properties --- //
/*for (property in info) {
	output += property + ': ' + info[property]+'<br>';
}*/
// --- end show all properties --- //

var pros = new Array();
var cons = new Array();

for (property in isLT) {
	if (parseFloat(info[property]) < isLT[property]) {
		// Good
		pros.push(property);
	} else {
		// Bad
		cons.push(property);
	}
}

for (property in isGT) {
	if (parseFloat(info[property]) > isGT[property]) {
		// Good
		pros.push(property);
	} else {
		// Bad
		cons.push(property);
	}
}

for (property in doesContain) {
	for (var i=0 ; i<doesContain[property].length ; i++)
	{
		var element = doesContain[property][i];
		if (info[property].indexOf(element) != -1) {
			// Good
			pros.push([property, element])
		} else {
			// Bad
			cons.push([property, element])
		}
	}
}


output += "<i>Pros:</i><br><ul>";
for (var i=0 ; i<pros.length ; i++)
{
	output += formatScoreLine(pros[i]);//"<li>" + pros[i] + ': ' + info[pros[i]] + '</li>';
}
output += "</ul>";

output += "<i>Cons:</i><br><ul>";
for (var i=0 ; i<cons.length ; i++)
{
	output += formatScoreLine(cons[i]);//"<li>" + cons[i] + ": " + info[cons[i]] + '</li>';
}
output += "</ul>";

output += "<!-- end of score card --></div>";

debug += "<br>-----/debug--------<br>"

if (F_DEBUG) output = debug + output;
document.body.innerHTML = output + document.body.innerHTML;
