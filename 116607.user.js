// ==UserScript==
// @name           FindAndReplace
// @namespace      https://customer.mri.com.au/bigbird
// @description    Finds and Replaces data in BigBird.
// @include        https://customer.mri.com.au/bigbird/*
// ==/UserScript==
// This Script was made by Darcy Prior for MRI QLD.
//Version 1.5
//This version fixed: Decimal Places should now be perfect.

//global functions

//This function makes it so that if a key is pressed everything updates. keyCode 35 is the End Key.
function KeyCheck(e)
{
//alert(e.keyCode);
	if (e.keyCode=35)
	{
		init()
	}
}

//function CheckGrade()
//{
//	//Grade
//	grade = document.getElementById('grade');


//}



//The Function where it all starts!
init = function(){	

	//Every keypress updates the entry.
	window.addEventListener('keydown', KeyCheck, true);
	var haystackText = "";
	//alert('Finding...'); 
		
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

	//Thing?
	asset = document.getElementsByTagName('input')[92];
	var asset_upper = asset.value.toUpperCase();
	asset_upper = asset_upper.replace(/N\/A/i, "NA");
	asset_upper = asset_upper.replace(/NONE/i, "NA");
	asset.value = asset_upper;
	//Thing?
	asset = document.getElementsByTagName('input')[91];
	var asset_upper = asset.value.toUpperCase();
	asset_upper = asset_upper.replace(/N\/A/i, "NA");
	asset_upper = asset_upper.replace(/NONE/i, "NA");
	asset.value = asset_upper;
//Thing?
	asset = document.getElementsByTagName('input')[90];
	var asset_upper = asset.value.toUpperCase();
	asset_upper = asset_upper.replace(/N\/A/i, "NA");
	asset_upper = asset_upper.replace(/NONE/i, "NA");
	asset.value = asset_upper;
	//Thing?
	asset = document.getElementsByTagName('input')[89];
	var asset_upper = asset.value.toUpperCase();
	asset_upper = asset_upper.replace(/N\/A/i, "NA");
	asset_upper = asset_upper.replace(/NONE/i, "NA");
	asset_upper = asset_upper.replace(/HP /i, "");
	asset_upper = asset_upper.replace(/ SFF/i, "");
	asset_upper = asset_upper.replace(/ Small Form Factor/i, "");
	asset_upper = asset_upper.replace(/ Convertible Minitower/i, "");
	asset.value = asset_upper;
//Thing?
	asset = document.getElementsByTagName('input')[88];
	var asset_upper = asset.value.toUpperCase();
	asset_upper = asset_upper.replace(/N\/A/i, "NA");
	asset_upper = asset_upper.replace(/NONE/i, "NA");
	asset.value = asset_upper;

	
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
	
	if (invtype.value=='COMP-SERVER' || invtype.value=='COMP-DESKTOP' || invtype.value=='COMP-LAPTOP' || invtype.value=='COMP-SERVER-SML'|| invtype.value=='COMP-SERVER-MED'|| invtype.value=='COMP-SERVER-LGE')
	{
	
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
	
	//Processor
	processor = document.getElementById('processor');
	var processor_test = processor.value;	
	processor_test = processor_test.replace(/"GHZ",/i, "");
	processor.value = processor_test;
	
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
			speed.value = ((new_speed / 1000)+ '.00GHz');
		}
		if ((new_speed % 1000)!=0)
		{
			speed.value = ((new_speed / 1000)+ 'GHz');
		}
	}
	if (speed.value > 100)
	{
	
		var new_speed = speed.value.toUpperCase();
		if ((new_speed % 1000)==0)
		{
			new_speed = Math.round((new_speed / 1000)*100)/100;
			speed.value = (new_speed + 'GHz');
		}
		if ((new_speed % 1000)!=0)
		{
			new_speed = Math.round((new_speed / 1000)*100)/100;
			speed.value = (new_speed + 'GHz');
		}
		//speed.value = ((new_speed / 1000)+ 'GHz');
	}
	
		if (speed.value.search("GHz")!=-1)
	{
		var new_speed = speed.value.toUpperCase();
		new_speed = new_speed.replace(/GHz/i, "");
		new_speed = Math.round((new_speed)*100)/100;
			new_speed = new_speed.toFixed(2);
			speed.value = (String(new_speed + 'GHz'));
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
	
	reload()
}
init()
//window.addEventListener('load', init, false);

