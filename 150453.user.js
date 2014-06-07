// ==UserScript==
// @name        checkpallet
// @namespace   https://customer.mri.com.au/bigbird
// @include     https://customer.mri.com.au/bigbird/pallet_loc_2/inventory/search/*
// @version     1
// ==/UserScript==

document.body.style.background = "#DDDDAA";

//Code to find the table
var data = document.getElementsByTagName("td");

function changeTextRed(item){
	oldHTML = data[item].innerHTML;
	var newHTML = "<span style='color:#ff0000'>" + oldHTML + "</span>";
	data[item].innerHTML = newHTML;
}

function changeTextYellow(item){
	oldHTML = data[item].innerHTML;
	var newHTML = "<span style='color:#ffAA00'>" + oldHTML + "</span>";
	data[item].innerHTML = newHTML;
}


//alert(data[1].innerHTML);
//alert(data[33].innerHTML);
//alert(data[65].innerHTML);

function checkscreen(item)
{
	leap = 9 + (32 * item)
	model = data[leap].innerHTML;

	if (model=="AL1723")
	{
		if (data[(leap+7)].innerHTML!='17in')
		{
			changeTextRed(leap);
			changeTextRed((leap +7));
		}
	}
	if (model=="AL1923")
	{
		if (data[(leap+7)].innerHTML!='19in')
		{
			changeTextRed(leap);
			changeTextRed((leap +7));
		}
	}
	if (model=="SYNCMASTER940N")
	{
		if (data[(leap+7)].innerHTML!='19in')
		{
			changeTextRed(leap);
			changeTextRed((leap +7));
		}
	}
	if (model=="SYNCMASTER913B")
	{
		if (data[(leap+7)].innerHTML!='19in')
		{
			changeTextRed(leap);
			changeTextRed((leap +7));
		}
	}
	
	if(model.indexOf("19") != -1)
	{
		if (data[(leap+7)].innerHTML!='19in')
		{
			changeTextYellow(leap);
			changeTextYellow((leap +7));
		}
	}
	if(model.indexOf("17") != -1)
	{
		if (data[(leap+7)].innerHTML!='17in')
		{
			changeTextYellow(leap);
			changeTextYellow((leap +7));
		}
	}
	if(model.indexOf("15") != -1)
	{
		if (data[(leap+7)].innerHTML!='15in')
		{
			changeTextYellow(leap);
			changeTextYellow((leap +7));
		}
	}
	if(model.indexOf("20") != -1)
	{
		if (data[(leap+7)].innerHTML!='20in')
		{
			changeTextYellow(leap);
			changeTextYellow((leap +7));
		}
	}
	if(model.indexOf("22") != -1)
	{
		if (data[(leap+7)].innerHTML!='22in')
		{
			changeTextYellow(leap);
			changeTextYellow((leap +7));
		}
	}

}


function checklaptop(item)
{
	leap = 9 + (32 * item)
	model = data[leap].innerHTML;
	processor = data[(leap +1)].innerHTML;

	if(model.indexOf("LATITUDE D6") != -1)
	{
		if (data[(leap+7)].innerHTML!='14in')
		{
			changeTextRed(leap);
			changeTextRed((leap +7));
		}
	}
	if (model=="6464BA2")
	{
		if (data[(leap+7)].innerHTML!='15in')
		{
			changeTextRed(leap);
			changeTextRed((leap +7));
		}
	}
	if (model=="7674G12")
	{
		if (data[(leap+7)].innerHTML!='12in')
		{
			changeTextRed(leap);
			changeTextRed((leap +7));
		}
	}
	if (model=="7661JR9")
	{
		if (data[(leap+7)].innerHTML!='14in')
		{
			changeTextRed(leap);
			changeTextRed((leap +7));
		}
	}
}


function checkdesktop(item)
{
	leap = 9 + (32 * item)
	model = data[leap].innerHTML;
	processor = data[(leap +1)].innerHTML;
}


var i = 1
while (i <= data.length)
{
	if(data[6].innerHTML == "MON-FLATPANEL")
	{
		checkscreen(i)
	}
	if(data[6].innerHTML == "COMP-LAPTOP")
	{
		checklaptop(i)
	}
	if(data[6].innerHTML == "COMP-DESKTOP")
	{
		checkdesktop(i)
	}
	i = i + 1;
}

