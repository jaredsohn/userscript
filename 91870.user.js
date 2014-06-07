// Stats Porn + Flag + Pulldown Script by threefingeredguy
// ==UserScript==
// @name           spfps
// @namespace      www.umbrella-alliance.com
// @description    stats porn + flag + pulldown script
// @include        http://www.cybernations.net/*
// @include        http://cybernations.net/*
// ==/UserScript==

(function(){

	//stats porn and pulldown menu only appear on stats_alliance_stats_custom.asp
	if(window.location.href.match(/ts_alli/)) 
	{
			
		//Grab page data
		var page = document.body.innerHTML;

		//Get number of nations in alliance
		var numbers = new Array();
		var nations = page.match(/sts of \d*? /i).toString();
		numbers[0] = parseInt(nations.substring(7,nations.length-1));

		//Get table cells with numbers in them (the base stats for the calculations)
		var matches = page.match(/r\">(\d[\d,]*?)</gim);
		var a=1;

		//Trim text from data and convert to integers
		for(var i in matches)
		{
			tempvar = matches[i].substring(3,matches[i].length-1);
			numbers[a]=parseInt(tempvar.replace(/,/g,''));
			a++;
		}

		//Calculate and format values
		var maxnukes = parseInt(page.match(/\d+?(?= Man)/))*20+parseInt(page.match(/\d+?(?= Hid)/))*5;
		stats_menu = document.createElement('div')
		stats_menu.innerHTML = '<table border="2" cellpadding="5" cellspacing="0" style="border-collapse: collapse" bordercolor="#000080" id="table17" bgcolor="#FFFFFF" width="100%"><tr><td colspan="6" bgcolor="#000080"><table border="0" width="100%" id="table9" cellspacing="0" cellpadding="0"><tr><td width="50%"><font color="#FFFFFF"><b>:. Alliance Statistics Porn</b></font></td><td width="50%"><p align="right"><font color="#FFFFFF">Created by [`_`] </font></p> </td></tr></table></td></tr><tr><td align="center" bgcolor="#C0C0C0"><b>Avg. Land</b></td><td align="center" bgcolor="#C0C0C0"><b>Avg. Infras.</b></td><td align="center" bgcolor="#C0C0C0"><b>Avg. Tech</b></td><td align="center" bgcolor="#C0C0C0"><b>Avg. Navy</b></td><td align="center" bgcolor="#C0C0C0"><b>Avg. Nukes</b></td><td align="center" bgcolor="#C0C0C0"><b>Max Nukes</b></td>	</tr><tr><td align="center">'+Math.round(numbers[1]*100/numbers[0])/100+'</td><td align="center">'+Math.round(numbers[2]*100/numbers[0])/100+'</td><td align="center">'+Math.round(numbers[3]*100/numbers[0])/100+'</td><td align="center">'+Math.round(numbers[10]*100/numbers[0])/100+'</td><td align="center">'+Math.round(numbers[5]*100/numbers[0])/100+'</td><td align="center">'+maxnukes+'('+Math.round(10000*numbers[5]/maxnukes)/100+'%)</td></tr><tr><td align="center" bgcolor="#C0C0C0"><b>%MP</b></td><td align="center" bgcolor="#C0C0C0"><b>%SDI</b></td><td align="center" bgcolor="#C0C0C0"><b>%WRC</b></td><td align="center" bgcolor="#C0C0C0"><b>%FAFB</b></td><td align="center" bgcolor="#C0C0C0"><b>%HNMS</b></td><td align="center" bgcolor="#C0C0C0"><b>Infra:Tech</b></td></tr><tr><td align="center">'+Math.round(10000*parseInt(page.match(/\d+?(?= Man)/))/numbers[0])/100+'%</td><td align="center">'+Math.round(10000*parseInt(page.match(/\d+?(?= Str)/))/numbers[0])/100+'%</td><td align="center">'+Math.round(10000*parseInt(page.match(/\d+?(?= Wea)/))/numbers[0])/100+'%</td><td align="center">'+Math.round(10000*parseInt(page.match(/\d+?(?= Foreign A)/))/numbers[0])/100+'%</td><td align="center">'+Math.round(10000*parseInt(page.match(/\d+?(?= Hid)/))/numbers[0])/100+'%</td><td align="center">'+Math.round(numbers[2]*100/numbers[3])/100+'</td></tr></table>';


		//Insert new table
	 	var mainMenu = document.getElementById('table4');
	 	var menuParent = mainMenu.parentNode;
	 	menuParent.insertBefore(stats_menu, mainMenu.nextSibling.nextSibling.nextSibling.nextSibling);

///////////////////////////////////////////////////////////---insert other alliances in the pulldown menu
///////////////////////////////////////////////////////////---the first string is the name of the alliance EXACTLY as it appears in CN
///////////////////////////////////////////////////////////---the second string is how you want it to appear in the box
///////////////////////////////////////////////////////////---third, the integer is where in the pulldown menu your option will go
		insert_select_option("=LOST=","=LOST=",13);

	}

///////////////////////////////////////////////////////////---insert flags on all alliance statistics pages
///////////////////////////////////////////////////////////---the first string is the name of the alliance EXACTLY as it appears in CN
///////////////////////////////////////////////////////////---the second string is the url to the flag
	insert_flag('=LOST=', 'http://i376.photobucket.com/albums/oo203/DevilynCaster/EmpireFlagStats.jpg');

//////End of main procedure

/////Pulldown menu option insert function
function insert_select_option(alliancename, displayname, location)
{
	//find pulldown menu
	var selectbox = document.getElementById('selbox').childNodes[1];

	//create new option object
	var selectoption = document.createElement('option');
	selectoption.setAttribute('value', alliancename);
	selectoption.textContent = displayname;

	//add option to menu
	selectbox.options.add(selectoption, location);
}


	
	
/////Flag insert function
function insert_flag(alliancename, flgSrc)
{
	alliancename = alliancename.toLowerCase();
	//are we on the alliance's stats pages?
	if((window.location.href.toLowerCase().match(new RegExp(alliancename.replace(/ /g,'%20'))) || window.location.href.toLowerCase().match(new RegExp(alliancename.replace(/ /g, '.')))) && !window.location.href.match(/rch\.a/))
	{

		//create the flag object
		var flag = document.createElement('img');
		flag.src = flgSrc;
		flag.setAttribute("style","padding-top: 3px; padding-bottom: 3;");

		//find the header (alliance name or "War Search Results"-type text)
		menuParent = document.getElementsByTagName('b')[4];

		//if it has :. in bold tag #4, switch to bold tag #6
		if(menuParent.innerHTML.match(/\:\./)) {menuParent = document.getElementsByTagName('b')[6];}

		//move to the next element until it reaches an image or a linebreak
		while(!(menuParent.nodeName.toLowerCase().match(/br|img/))) {menuParent=menuParent.nextSibling;}

		//if we hit an image, skip forward 2 more nodes
		if(menuParent.nodeName.toLowerCase().match(/img/)){menuParent=menuParent.nextSibling.nextSibling;}

		//insert flag after menuParent
		menuParent.parentNode.insertBefore(flag,menuParent.nextSibling);
	}
}
})();
