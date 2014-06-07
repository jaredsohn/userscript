// ==UserScript==
// @name Comics links to image script
// @namespace Aditya
// @description Grease Monkey user script to show images on comics page, modified/updated to reflect latest
// @include http://*.angadi.org/comics.html
// @include http://angadi.org/comics.html
// @include http://angadi.dnsalias.com*/comics.html
// @include http://www.angadi.org/comics-archive/comics*.html
// ==/UserScript==

/*
	Author: Aditya Banerjee
			Ankit Modi
			KnightMare
	
	----Change Log----
	v0.4.1 - Modified script to show Foxtrot properly and added br to inserted addtl comics
	
	v0.4 - Added more comics

	v0.3.1 - Modified script to point to the correct table (an additional table for the top message had been 

inserted causing the script to break)

	v0.3 - Added link (with current date) to archives at bottom so that older pages can be viewed
		
	v0.2 - Formatted the images to show up below the title.
		Added other domains where the comic site is hosted
	
	v0.1 - Created basic script to replace links with images
*/

window.addEventListener('load',function(){ comics.load(); },true);

var comics = {
	load : function(){
		//alert('load');
		var comicsTable = document.getElementsByTagName('table')[1];
		var noRows = comicsTable.rows.length;
		//alert(noRows);

		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth()+1;
		var year = today.getFullYear();

		var Today_Date = (today.getYear()-100).toString();
		if (Today_Date.toString().length==1) {
			Today_Date = '0' + Today_Date;
		}
		if (month.toString().length==1) {
			Today_Date = Today_Date + '0' + month;
		}
		else {
			Today_Date = Today_Date + month;
		}
		if (day.toString().length==1) {
			Today_Date = Today_Date + '0' + day;
		}
		else {
			Today_Date = Today_Date + day;
		}

		if (day!=1) day--;
		else {
			if (month!=3) day = 30;
			else day =28
			if (month!=1) month--;
			else month = 12;
		}
		if (month.toString().length==1) month = '0' + month;
		if (day.toString().length==1) day = '0' + day;
		var date = month.toString() + day.toString() + year.toString();

		//Enable images for the links
		for (i=0;i<noRows;i++){
			var strong = comicsTable.rows[i].cells[1].getElementsByTagName('strong')[0];
			var br = document.createElement('br');
			strong.appendChild(br);
			var link = comicsTable.rows[i].cells[1].getElementsByTagName('a')[1];
			var img = document.createElement('img');
			img.src = link.href;
			img.alt = comicsTable.rows[i].cells[1].getElementsByTagName('a')[0].innerHTML;
			comicsTable.rows[i].cells[1].replaceChild(img, link);
		}

		insertCalvin(comicsTable,today);
		insertFoxtrot(comicsTable,today);
		insertAnimalCrackers(comicsTable,today);
		insertDennis(comicsTable,today);
		insertHaggar(comicsTable,today);

		//Add the archive link
		var link = document.createElement('a');
		link.href = 'http://www.angadi.org/comics-archive/comics-'+date+'.html';
		link.innerHTML = 'Archive';
		document.body.appendChild(link);
	}
}

function insertHaggar(comicsTable,today) {
	var month=today.getMonth()+1;
	var day = today.getDate();
	var Today_Date = (today.getYear()+1900).toString();
	Today_Date += "-";
	Today_Date += (month.toString().length%2)?("0" +month.toString()):(month.toString());
	Today_Date += "-";
	Today_Date += (day.toString().length%2)?("0" +day.toString()):(day.toString());
	HaggarImage = "http://cserver.king-online.com/content/Hagar_The_Horrible?date=" + Today_Date + 

"&referer=http://www.dailyink.com&uid=xvkv6o&token=ukcle6&size=hires";
	insertComic(comicsTable,"Haggar the 

horrible","http://www.kingfeatures.com/features/comics/hagar/about.htm",HaggarImage,7);
}

function insertFoxtrot(comicsTable,today) {
	var month=today.getMonth()+1;
	var year = today.getYear()-100;
	var day = today.getDate();
	var Today_Date = (year.toString().length%2)?("0" +year.toString()):(year.toString());
	Today_Date += (month.toString().length%2)?("0" +month.toString()):(month.toString());
	Today_Date += (day.toString().length%2)?("0" +day.toString()):(day.toString())-1;

	var FoxtrotImage = 

"http://images.ucomics.com/comics/ft/"+today.getFullYear().toString()+"/ft"+Today_Date+".gif";
	insertComic(comicsTable,"Foxtrot","http://www.foxtrot.com/",FoxtrotImage);
}

function insertDennis(comicsTable,today) {
	var month=today.getMonth()+1;
	var day = today.getDate();
	var Today_Date = (today.getYear()+1900).toString();
	Today_Date += "-";
	Today_Date += (month.toString().length%2)?("0" +month.toString()):(month.toString());
	Today_Date += "-";
	Today_Date += (day.toString().length%2)?("0" +day.toString()):(day.toString());
	DennisImage = "http://cserver.king-online.com/content/Dennis_The_Menace?date=" + Today_Date 

+"&referer=http://www.dailyink.com&uid=xvkv6o&token=sytlm5&size=hires";
	insertComic(comicsTable,"Dennis the 

menace","http://www.kingfeatures.com/features/comics/dennis/about.htm",DennisImage,7);
}

function insertCalvin(comicsTable,today) {
	var month=today.getMonth()+1;
	var year = today.getYear()-100;
	var day = today.getDate();
	var Today_Date = (year.toString().length%2)?("0" +year.toString()):(year.toString());
	Today_Date += (month.toString().length%2)?("0" +month.toString()):(month.toString());
	Today_Date += (day.toString().length%2)?("0" +day.toString()):(day.toString());

	var CalvinImage = 

"http://images.ucomics.com/comics/ch/"+today.getFullYear().toString()+"/ch"+Today_Date+".gif";
	insertComic(comicsTable,"Calvin &amp Hobbes","http://www.gocomics.com/calvinhobbes/",CalvinImage);
}

function insertAnimalCrackers(comicsTable,today) {
	var month=today.getMonth()+1;
	var year = today.getYear()-100;
	var day = today.getDate();
	var Today_Date = (year.toString().length%2)?("0" +year.toString()):(year.toString());
	Today_Date += (month.toString().length%2)?("0" +month.toString()):(month.toString());
	Today_Date += (day.toString().length%2)?("0" +day.toString()):(day.toString());
	
	var AnimalImage = "http://picayune.uclick.com/comics/tmani/" + (today.getYear()+1900).toString() 

+"/tmani" + Today_Date + ".gif";
	insertComic(comicsTable,"Animal Crackers","http://www.comicspage.com/animalcrackers/",AnimalImage,6);
}

//This function inserts a comic at the position/end of the table
function insertComic(Table,Title,ComicsURL,ImageURL,position) {
	if(position==null) {
		var NewRow = Table.insertRow(0);
	}
	else {
		var NewRow = Table.insertRow(position);
	}

	if(NewRow) {
		var firstCell = NewRow.insertCell(0);
		var secondCell = NewRow.insertCell(1);
		firstCell.width="10%";
		secondCell.innerHTML="<strong><a href=\"" + ComicsURL + "\">" + Title + "</a>:</strong><br><img 

src=\""+ImageURL+"\"><br><br>";
	}
}