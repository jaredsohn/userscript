// ==UserScript==
// @name Gagan - Comics links to image script
// @namespace Aditya
// @description Grease Monkey user script to show images on comics page
// @include file:///C:/Documents%20and%20Settings/Gagan%20Prakash/Contacts/Desktop/comics.html
// ==/UserScript==

/*
	Author: Aditya Banerjee
	
	----Change Log----
	v0.3.1 - Modified script to point to the correct table (an additional table for the top message had been inserted causing the script to break)

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
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth()+1;
		var year = today.getFullYear();
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
		//alert(date);
		var link = document.createElement('a');
		link.href = 'http://www.angadi.org/comics-archive/comics-'+date+'.html';
		link.innerHTML = 'Archive';
		document.body.appendChild(link);
	}
}
