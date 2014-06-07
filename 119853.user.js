// ==UserScript==
// @name           Mass Edit
// @namespace      MRI QLD
// @description    Edit All Items from a Page.
// @include        https://customer.mri.com.au/bigbird/*
// ==/UserScript==
// This Script was made by Darcy Prior for MRI QLD.

//global functions
//Version 2.5

//This function makes it so that if a key is pressed everything updates. keyCode 35 is the End Key.
function KeyCheck(e)
{
//alert(e.keyCode);
	if (e.keyCode=35)
	{
		getContents();
	}
}

function openPage(page)
{
	var edit_link = "https://customer.mri.com.au/bigbird/inventory/edit/item_form?inventory_id=";
	//alert((edit_link + page));
	window.open((edit_link + page));

}

function getContents() 
{
	alert("All Inventory items in this shipment will be edited.");
	var table = document.getElementById('inventoryTable');
	var rows = table.getElementsByTagName("tr");
	alert(rows.length);
	var i = 1
	while (i <= rows.length)
	{
		var data = rows[i].getElementsByTagName("td");
		alert((i + ": " + (data[1].innerHTML-1)));
		openPage(data[1].innerHTML);
		i = i + 1;
	}
	//var data = rows[1].getElementsByTagName("td");
	//alert(data.length);
	//alert(data[1].innerHTML);
	//alert(table.childNodes[2].nodeValue);

}




//The Function where it all starts!
init = function(){	

	//Every keypress updates the entry.
	window.addEventListener('keydown', KeyCheck, true);
	var haystackText = "";
	//alert('Finding...'); 
	
	if (location.href.indexOf("https://customer.mri.com.au/bigbird/shipments2/edit/") != -1)
	{
	//https://customer.mri.com.au/bigbird/pallet_loc_2/inventory/view/
	//https://customer.mri.com.au/bigbird/shipments2/edit/
		//close page.
		self.close ();
	}
	
	if (location.href.indexOf("https://customer.mri.com.au/bigbird/inventory/view/") != -1)
	{
	//https://customer.mri.com.au/bigbird/pallet_loc_2/inventory/view/
	//https://customer.mri.com.au/bigbird/shipments2/edit/
		//close page.
		self.close ();
	}
		
	document.body.style.background = "#DDDDFF";
	
	invtype = document.getElementById('invtype');
	

	
	//Grade
	grade = document.getElementById('grade');
	
	//Brand
	brand = document.getElementById('brand');
	brand.value = brand.value.toUpperCase();
	switch (brand.value)
	{
		//Dell
		case 'DELL INC.':
			brand.value = "DELL";
			break;
		case 'DELL COMPUTER CORPORATION':
			brand.value = "DELL";
			break;
		case 'Dell':
			brand.value = "DELL";
			break;
		//HP
		case 'HEWLETT-PACKARD':
			brand.value = "HP";
			break;
		case 'HEWLETT PACKARD':
			brand.value = "HP";
			break;
		//Cisco
		case 'CISCO SYSTEMS':
			brand.value = "Cisco";
			break;
		//Ipex
		case 'IPEX I.T.G.':
			brand.value = "Ipex";
			break;
		//ASUS
		case 'ASUSTeK Computer Inc.':
			brand.value = "ASUS";
			break;
	}
	
	//Model
	asset = document.getElementsByTagName('input')[39];
	var asset_upper = asset.value.toUpperCase();
	asset_upper = asset_upper.replace(/N\/A/i, "NA");
	asset_upper = asset_upper.replace(/NONE/i, "NA");
	asset.value = asset_upper;
	
	//Asset Tag
	asset = document.getElementsByTagName('input')[40];
	var asset_upper = asset.value.toUpperCase();
	asset_upper = asset_upper.replace(/NONE/i, "NA");
	asset.value = asset_upper;
	
	//Serial Number
	serial = document.getElementsByTagName('input')[41];
	var serial_upper = serial.value.toUpperCase();
	serial_upper = serial_upper.replace(/NONE/i, "NA");
	serial.value = serial_upper;


	
	//Testing Comments
	
	if (location.href.indexOf("https://customer.mri.com.au/bigbird/inventory/view/") != -1)
	{
		testing_comment = document.getElementById('comment');
		testing_comment.value = testing_comment.value.toUpperCase();
	}
	
	testing_comment = document.getElementsByTagName('TEXTAREA')[0];
	var comment = testing_comment.value.toUpperCase();
	comment = comment.replace(/MINOR MARKS,/i, "");
	comment = comment.replace(/WIPED,/i, "");
	comment = comment.replace(/UNTESTED,/i, "");
	comment = comment.replace(/TESTED,/i, "");
	comment = comment.replace(/MINOR MARKS./i, "");
	comment = comment.replace(/WIPED./i, "");
	comment = comment.replace(/UNTESTED./i, "");
	comment = comment.replace(/TESTED./i, "");
	comment = comment.replace(/MINOR MARKS/i, "");
	comment = comment.replace(/WIPED/i, "");
	comment = comment.replace(/TESTED/i, "");
	testing_comment.value = comment.replace(/UNTESTED/i, "");
	
	//Punctuation Check
	if (comment.length >=1)
	{
	
		if (comment.substring(comment.length-1, comment.length) == " ")
		{
			comment = comment.substring(0, comment.length-1);
		}
		if (comment.substring(comment.length-1, comment.length) == ",")
		{
			comment = comment.substring(0, comment.length-1);
		}
		if (comment.substring(comment.length-1, comment.length) != ".")
		{
			comment = comment + ".";
		}
	
		testing_comment.value = comment
	}

	//More Grade Stuff.
	//Make Sure Beige things are atleast Grade 3
	if (comment.match("BEIGE")==-1)
	{
		if (grade.value='Grade 2')
			{
				grade.value = 'Grade 3';
			}
	}
	
	//Check Brands for Clones
	switch (brand.value.toUpperCase())
	{
		//Clone
		case 'CLONE':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (comment.value == '')
			{
				comment.value = 'CLONE.';
			}
			break;
		//Ipex
		case 'IPEX':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (comment.value == '')
			{
				comment.value = 'CLONE.';
			}
			break;
			
	}
	
	//################################
	//Check for Models
	
	model = document.getElementsByTagName('input')[39];
	var model_upper = model.value.toUpperCase();
	
	switch (model_upper)
	{
			case '9210D1M':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '8808H2M':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '9210D3M':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '817232M':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '8172BMM':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '9210DM1':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '9210G2M':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '847962X':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '8808K9M':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'VERITON 3700GX':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '818832M':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'LATITUDE D610':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '818832M':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case '818832M':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			
	}
	
	
	
	//################################
	
	if (invtype.value=='COMP-SERVER' || invtype.value=='COMP-DESKTOP' || invtype.value=='COMP-LAPTOP' || invtype.value=='COMP-SERVER-SML'|| invtype.value=='COMP-SERVER-MED'|| invtype.value=='COMP-SERVER-LGE')
	{
	
	asset = document.getElementsByTagName('input')[39];
	var asset_upper = asset.value.toUpperCase();
	asset_upper = asset_upper.replace(/N\/A/i, "NA");
	asset_upper = asset_upper.replace(/NONE/i, "NA");
	asset.value = asset_upper;
	
	//Processor
	processor = document.getElementById('processor');
	var new_processor = processor.value.toUpperCase();
	processor.value = new_processor;
	
		//################################
	//Check for Models
	
	switch (new_processor)
	{
			case 'CELERON':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'PENTIUM 1':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'PENTIUM 2':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'PENTIUM 3':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'PENTIUM 3 XEON':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'PENTIUM I':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'PENTIUM II':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'PENTIUM III':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'SPARC':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'G3':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'G4':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
			case 'PENTIUM M':
			if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 3';
			}
			if (testing_comment.value == '')
			{
				testing_comment.value = 'AGED.';
			}
			break;
	}
	
	//Hard Drives
	hard_disk = document.getElementById('hard_disk');
	var disk_test = hard_disk.value;
	var newStr = disk_test.substring(disk_test.length-1, disk_test.length);
	if (newStr==' ')
	{
		var new_disk = disk_test.substring(0, disk_test.length-1);
		hard_disk.value = new_disk;
	}
	disk_test = hard_disk.value;
	newStr = disk_test.substring(disk_test.length-1, disk_test.length);
	if (newStr==',')
	{
		var new_disk = disk_test.substring(0, disk_test.length-1);
		hard_disk.value = new_disk;
	}
	
	if (disk_test == '')
	{
		hard_disk.value='0';
	}
	if (hard_disk.value=='0')
	{
		grade.value = 'Grade 4';
	}
	
	//Remove Decimals from Hard Drives
	// if (disk_test != '')
	// {
		// if (disk_test.match(",")!==-1)
		// {
			// var new_disk = hard_disk.value.toUpperCase();
			// new_disk = new_disk.replace(/GB/i, "");
			// alert(new_disk);
			// new_disk = Math.round(new_disk);
			// if (new_disk.toString() !== "NaN")
			// {
				// new_disk = new_disk.toFixed(0);
			// }
			// if (hard_disk.value != 0)
			// {
				// hard_disk.value = (String(new_disk + 'GB'));
			// }
		// }
	// }
	
	//Optical Drives
	optical = document.getElementById('optical');
	var disk_test = optical.value;
	var newStr = disk_test.substring(disk_test.length-1, disk_test.length);
	if (newStr==' ')
	{
		var new_disk = disk_test.substring(0, disk_test.length-1);
		optical.value = new_disk;
	}
	disk_test = optical.value;
	newStr = disk_test.substring(disk_test.length-1, disk_test.length);
	if (newStr==',')
	{
		var new_disk = disk_test.substring(0, disk_test.length-1);
		optical.value = new_disk;
	}
	
		
	
	//Make Sure Computers without Hard Drives are atleast Grade 4
	if (comment.match("REMOVED FOR DESTRUCTION")==-1)
	{
		if (grade.value=='Grade 3')
			{
				grade.value = 'Grade 4';
			}
		if (grade.value=='Grade 2')
			{
				grade.value = 'Grade 4';
			}
	}
	
	//MHz to GHz
	speed = document.getElementById('speed');
	
	if (speed.value.search("MHz")!=-1)
	{
		var new_speed = speed.value.toUpperCase();
		new_speed = new_speed.replace(/MHz/i, "");
		if ((new_speed % 1000)==0)
		{
			speed.value = ((new_speed / 1000)+ '.00GHZ');
		}
		else
		{
			speed.value = ((new_speed / 1000)+ 'GHZ');
		}
	}
	
	if (speed.value > 100)
	{
		var new_speed = speed.value.toUpperCase();
		new_speed = new_speed.replace(/MHz/i, "");
		if ((new_speed % 1000)==0)
		{
			speed.value = ((new_speed / 1000)+ '.00GHZ');
		}
		else
		{
			speed.value = ((new_speed / 1000)+ 'GHZ');
		}
	}
	
	if (speed.value.search("GHz")!=-1)
	{
	//alert(speed.value);
		var new_speed = speed.value.toUpperCase();
		new_speed = new_speed.replace(/GHz/i, "");
		//new_speed = Math.round(new_speed);
		//alert(new_speed);
		new_speed = parseFloat(new_speed);
		new_speed = new_speed.toFixed(2);
		speed.value = (String(new_speed + 'GHZ'));
		//alert(speed.value);
	}
	

	
	//Meg to Gig
	ram = document.getElementById('ram');
	if (ram.value.search("MB")!=-1)
	{
		var new_ram = ram.value.toUpperCase();
		new_ram = new_ram.replace(/MB/i, "");
		if ((new_ram % 1024)==0)
		{
			ram.value = ((new_ram / 1024)+ '.00GB');
		}
		if ((new_ram % 1024)!=0)
		{
			new_ram = Math.round((new_ram / 1024)*100)/100;
			ram.value = (new_ram + 'GB');
		}
	}
	if (ram.value > 100)
	{
	
		var new_ram = ram.value.toUpperCase();
		if ((new_ram % 1024)==0)
		{
			ram.value = ((new_ram / 1024)+ '.00GB');
		}
		if ((new_ram % 1024)!=0)
		{
			new_ram = Math.round((new_ram / 1024)*100)/100;
			ram.value = (new_ram + 'GB');
		}
	}
	

	if (ram.value.search("GB")!=-1)
	{
		var new_ram = ram.value.toUpperCase();
		new_ram = new_ram.replace(/GB/i, "");
		new_ram = Math.round((new_ram)*100)/100;
			new_ram = new_ram.toFixed(2);
			ram.value = (String(new_ram + 'GB'));
	}

	
	}
	//Save the Edits.
	document.evaluate("//input[@value='Save' and @type='submit']", document, null, 9, null).singleNodeValue.click();
	reload()
}
init()
//window.addEventListener('load', init, false);

