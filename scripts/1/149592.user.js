// ==UserScript==
// @name          Craigslist housing listing filter
// @namespace     unionp-craigslist-housing-filter
// @description   Filter craigslist housing listings by size and/or location, where location is a regex
// @include       http://*.craigslist.org/*
// ==/UserScript==

function showNode(node, show)
{
	if (show)
	{
		node.style.display = "inherit";
		shownListings++
	}
	else
	{
		node.style.display = "none";
	}
}

function $N(value, ifnull)
{
	if (value === null || value === undefined) return ifnull
    return value;
}

function filterListings()
{
	shownListings = 0
	var minSqFt = document.getElementById('sqFtTextBox').value
	var location = document.getElementById('locationTextBox').value
	var locationRegExp = new RegExp(location, "i")
	
	var allRows = document.getElementsByClassName('row');
    for (i = 0; i < allRows.length; i++)
    {
        var itemDetails = allRows[i].getElementsByClassName('itemph')[0];
        var sqFtOkay = true
		if (matches = itemDetails.innerText.match(/\d+ft/))
        {
            var sqFt = parseInt(matches[0]);
			sqFtOkay = sqFt >= minSqFt
        }
		
		var itemLocationNode = allRows[i].getElementsByClassName('itempn')[0].children[0]
		var locationOkay = true
		if (itemLocationNode)
		{
			locationOkay = itemLocationNode.innerText.match(locationRegExp)
		}
		
		showNode(allRows[i], sqFtOkay && locationOkay)
    }
	
	td.lastChild.textContent = ' ' + shownListings + ' shown listings'
}

var shownListings = 0

var sqFtTextBox = document.createElement("input");
sqFtTextBox.id = 'sqFtTextBox'
sqFtTextBox.type = "text"
sqFtTextBox.value = $N(localStorage['sqFt'], '700')
sqFtTextBox.maxLength = "4"
sqFtTextBox.style.width = 5 * 8 + 'px'  // each character is 8px, leave a little buffer
sqFtTextBox.onchange = function() { localStorage['sqFt'] = this.value; filterListings(); }

var locationTextBox = document.createElement("input");
locationTextBox.id = 'locationTextBox'
locationTextBox.type = "text"
locationTextBox.value = $N(localStorage['location'], 'cap.*hill')
locationTextBox.onchange = function() { localStorage['location'] = this.value; filterListings(); }

var td = document.createElement("td");
td.appendChild(document.createTextNode('sq.ft.: '))
td.appendChild(sqFtTextBox)
td.appendChild(document.createTextNode(' location: '))
td.appendChild(locationTextBox)
td.appendChild(document.createTextNode(''))

var table = document.getElementById("searchtable")
var row = table.getElementsByTagName("tr")[1]
row.appendChild(td)

// Filter listings
filterListings()