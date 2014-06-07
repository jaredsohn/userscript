// ==UserScript==
// @name        Trulia Score Card
// @namespace   net.pwlk
// @include     http://www.trulia.com/rental/*
// @version     1
// @grant       none
// ==/UserScript==

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

var require = new Object
require.bedrooms = [moreThan, 3];
require.price = [lessThan, 1801];
require.bath_full = [moreThan, 1];
require.sqft = [moreThan, 1699];
require.floors = [contains, 'carpet'];
require.built = [moreThan, 1949];
require.rating = [moreThan, 3];


// this array contains words that want to be contained in the posting
require.general = new Array()
require.general.push("dishwasher");
require.general.push("refrigerator");
require.general.push("disposal");
require.general.push("garage");
require.general.push("deck");

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

var html = document.body.innerHTML;

var lists = document.getElementsByClassName("listBulleted")

var list_master = new Array();
for (var i=0 ; i<lists.length ; i++)
{
	// Iterate through all the lists
	for (var j=0 ; j<lists[i].children.length ; j++)
	{
		list_master.push(lists[i].children[j].innerHTML);
	}
}
	
var tmp;
var info = new Object;
info.general = new Array();
// Get specific information
for (var i=0 ; i<list_master.length ; i++)
{
	/* Pulling out specific information
	   If not put in the general array
	*/
	var element = list_master[i].replace(/<\/?[^>]+(>|$)/g, "");	// strip html
	element = element.replace(/[\n\r]/ig, " ");	// replace new lines with space
	element = element.replace(/[\s]{2,}/ig, "");	// remove duplicate spaces
	
	tmp = html.match(/value: \d/ig);
	if (tmp) info.rating = parseFloat(tmp[0].replace("value: ", ""))
	else info.rating = -1;
	if (element.indexOf("Price:") != -1)
	{
		// Found price; format: Price: $1,400
		info.price = parseFloat(element.replace(/Price:\s*/ig, "").replace(/\$|,/ig, ""));
	}
	else if (element.indexOf("Bedrooms") != -1)
	{
		// Found bedrooms; format: 4 Bedrooms
		info.bedrooms = parseFloat(element.replace(/ Bedrooms/ig, ""));
	}
	else if (element.indexOf("Bathroom") != -1)
	{
		// Found bathrooms;
		// format: 2 full Bathrooms
		//         1 full, 1 partial Bathrooms
		//         1 full Bathroom
		info.bath_full = parseFloat(element.match(/\d full/ig)[0].replace(/ full/ig, ""));
		//info.bathrooms = new Object
		//info.bathrooms.full = parseFloat(element.match(/\d full/ig)[0].replace(/ full/ig, ""));
		if (element.indexOf("partial") != -1)
		{
			// There are partial baths
			//info.bathrooms.part = parseFloat(element.match(/\d partial/ig)[0].replace(/ partial/ig, ""));
			info.bath_part = parseFloat(element.match(/\d partial/ig)[0].replace(/ partial/ig, ""));
		} else {
			//info.bathrooms.part = 0;
			info.bath_part = 0;
		}
	}
	else if (element.indexOf("sqft") != -1)
	{
		// Found square footage;
		// format: 1,706 sqft
		info.sqft = parseFloat(element.replace(/\s*sqft/ig, "").replace(/,/ig, ""));
	}
	else if (element.indexOf("MLS/Source ID") != -1)
	{
		// Found ML
		// format: MLS Source ID: 1349434
		info.mls = parseFloat(element.replace(/MLS\/Source ID:\s*/ig, ""));
	}
	else if (element.indexOf("Zip") != -1)
	{
		// Found Zip
		// format: Zip: 23502
		info.zip = element.replace(/Zip:\s*/ig, "");
	}
	else if (element.indexOf("Status") != -1)
	{
		// Found status
		// format: Status: For Rent
		info.status = element.replace(/Status:\s*/ig, "");
	}
	else if (element.indexOf("Floors") != -1)
	{
		// Found floors
		// format: Floors: Carpet, Tile Ceramic
		info.floors = element.replace(/Floors:\s*/ig, "");
	}
	else if (element.indexOf("Roof") != -1)
	{
		// Found roof
		// format: Roof: Asphalt
		info.roof = element.replace(/Roof:\s*/ig, "");
	}
	else if (element.indexOf("Heating") != -1)
	{
		// Found Heating
		// format: Heating Fuel: Natural Gas
		info.heating = element.replace(/Heating Fuel:\s*/ig, "");
	}
	else if (element.indexOf("Range") != -1)
	{
		// Found Range
		// format: Range: Electric
		info.range = element.replace(/Range:\s*/ig, "");
	}
	else if (element.indexOf("Built in") != -1)
	{
		// Found built
		// format: Built in 1958
		info.built = parseFloat(element.replace(/Built in\s*/ig, ""));
	}
	else if (element.indexOf("Neighborhood") != -1)
	{
		// Found neighborhood
		// format: Neighborhood: Poplar Hills
		info.neighborhood = element.replace(/Neighborhood:\s*/ig, "");
	}
	else if (element.indexOf("School Districts") != -1)
	{
		// Found school district
		// format: School Districts: Norfolk School District,Chesapeake School District, Virginia Beach City Public Sd
		info.school_district = element.replace(/School Districts:\s*/ig, "");
	}
	else if (element.indexOf("Schools") != -1)
	{
		// Found schools
		// format: Schools: Poplar Halls Elementary School, St Matthew School, Norfolk Technical Center
		info.schools = element.replace(/Schools:\s*/ig, "");
	}
	else if (element.indexOf("Provided By") != -1)
	{
		// Found lister
		// format: Provided By: 1st Class Real Estate
		info.lister = element.replace(/Provided By:\s*/ig, "");
	}
	else if (element.indexOf("Deposit") != -1)
	{
		// Found deposit
		// format: Deposit: $1,000
		info.deposit = parseFloat(element.replace(/Deposit:\s*/ig, "").replace(/\$|,/ig, ""));
	}
	else
	{
		// Add to the general array
		info.general.push(element);
	}
}

function contains(words, element)
{
	if (!words) return false;
	tmp_words = words.toLowerCase();
	tmp_element = element.toLowerCase();
	return tmp_words.indexOf(tmp_element) != -1;
}

function moreThan(item1, item2)
{
	if (!item1) return false;
	return item1 > item2;
}

function lessThan(item1, item2)
{
	if (!item1) return false;
	return item1 < item2;
}

function equalTo(item1, item2)
{
	if (!item1) return false;
	return item1 == item2;
}

function formatScoreLine(property)
{
	var output = "";
	if (!info[property])
	{
		// General
		return '<li>' + property + '</li>';
	}
		
	output += '<li>' + property + ': ' + info[property];
	if (require[property][0] == contains)
		output += ' (contains ';
	if (require[property][0] == moreThan)
		output += ' (> ';
	if (require[property][0] == lessThan)
		output += ' (< ';
	if (require[property][0] == equalTo)
		output += ' (== ';
	output += require[property][1] + ')</li>';
	
	return output;
}





var pros = new Array();
var cons = new Array();
for (property in require)
{
	if (property == "general")
	{
		for (var i=0 ; i<require[property].length ; i++)
		{
			var success = false;
			var arg = require[property][i];
			for (var j=0 ; j<info[property].length ; j++)
			{
				if (contains(info[property][j], require[property][i]))
				{
					pros.push(require[property][i]);
					success = true;
				}
			}
			if (!success) cons.push(require[property][i]);
			success = false;
		}
	} else {
		var compare = require[property][0];
		var arg = require[property][1];
		if (compare(info[property], arg)) pros.push(property);
		else cons.push(property);
	}
}

//alert("Pros: " + pros + "\n\n" + "Cons: " + cons);

output = "";
output += '<div style="position:fixed; max-width:21%; top:45px; z-index:999; border:solid; background-color:white; padding:5px;"><b>Score Card</b><br>';
output += "<table><tr>";
output += "<td valign=top><i>Pros (" + pros.length + "):</i><br><ul>";
for (var i=0 ; i<pros.length ; i++)
{
	output += formatScoreLine(pros[i]);//"<li>" + pros[i] + ': ' + info[pros[i]] + '</li>';
}
output += "</ul></td>";

output += "<td valign=top><i>Cons (" + cons.length + "):</i><br><ul>";
for (var i=0 ; i<cons.length ; i++)
{
	output += formatScoreLine(cons[i]);//"<li>" + cons[i] + ": " + info[cons[i]] + '</li>';
}
output += "</ul></td>";
output += "</table>";

output += "<!-- end of score card --></div>";

if (window == window.top)
	document.body.innerHTML = output + document.body.innerHTML;

//if (window.frames.length > 1)
//{
//	var correct = 2;
//	window.frames[correct].document.body.innerHTML = output + window.frames[correct].document.body.innerHTML;
//}

var debug = "";
debug += "Bedrooms: " + info.bedrooms + "\n";
debug += "Price: " + info.price + "\n";
debug += "Full Bath: " + info.bath_full + "\n";
debug += "Partial Bath: " + info.bath_part + "\n";
debug += "Sqft: " + info.sqft + "\n";
debug += "MLS: " + info.mls + "\n";
debug += "Zip: " + info.zip + "\n";
debug += "Status: " + info.status + "\n";
debug += "Floors: " + info.floors + "\n";
debug += "Roof: " + info.roof + "\n";
debug += "Heating: " + info.heating + "\n";
debug += "Range: " + info.range + "\n";
debug += "Built: " + info.built + "\n";
debug += "Neighborhood: " + info.neighborhood + "\n";
debug += "School District: " + info.school_district + "\n";
debug += "Schools: " + info.schools + "\n";
debug += "Lister: " + info.lister + "\n";
debug += "Deposit: " + info.deposit + "\n";
debug += "\nGeneral: " + info.general + "\n";
//alert(debug);