// ==UserScript==
// @name angadi.org Comic Image Viewer PLUS Comic Add
// @namespace http://userscripts.org/scripts/show/5923
// @description Any image in an anchor on angadi.org will be rewritten (and displayed) as a IMG tag.  Also adds the comics Diesel Sweeties, UserFriendly, and a fixed Calvin and Hobbes.  By William Rawls and Alan Hogan
// @include http://www.angadi.org/comic*
// @include http://angadi.org/comic*
// @include http://angadi.dnsalias.com:1234/comic*
// @include http://www.angadi.dnsalias.com:1234/comic*
// ==/UserScript==

// VERSION: 
var COMICSVERSION ='21';
// By Alan Hogan
// Thanks Also to William Rawls and Aditya Banerjee 

/* HOW IT WORKS

This version reduces stress on my server and eliminates server-side
date mucking... um..

So there are two parts of this script. It's included in the angadi pages, where it:

1. Adds a favicon
2. Turns the links into direct displays of the comic
3. Determines the current (or archived) date
4. Adds the other comics


*/


if( /gocomics\.com\/calvinandhobbes/.test(document.location.toString() )) { //it's calvin and hobbes iframe
	 //Find table with comic in it
	 var tableNode = document.getElementById("comicTools").getElementsByTagName("table")[0];
	 var tBodyNode = tableNode.getElementsByTagName("tbody")[0];
	//Remove junk from table
	tBodyNode.removeChild(tBodyNode.getElementsByTagName("tr")[0]);
	tBodyNode.removeChild(tBodyNode.getElementsByTagName("tr")[1]);
	var trNode = tBodyNode.getElementsByTagName("tr")[0];
	trNode.removeChild(trNode.getElementsByTagName("td")[0]);
	//Move table to beginning of document
	 var dBody = document.getElementsByTagName("body")[0];
	 dBody.insertBefore(tableNode,dBody.childNodes[0]); 
	 //Delete everything else from document
	 while (dBody.lastChild != dBody.firstChild) { dBody.removeChild(dBody.lastChild); }
	//STYLE THE PAGE
	var newSS, styles='  br {display:block;} * {color: white; background-color: #555}* ';
	if(document.createStyleSheet) {
		document.createStyleSheet("javascript:'"+styles+"'"); 
	} else {
	 newSS=document.createElement('link'); 
	 newSS.rel='stylesheet'; 
	 newSS.href='data:text/css,'+escape(styles); 
	 document.getElementsByTagName("head")[0].appendChild(newSS); 
	}
	
// end calvin and hobbes iframe
} else { //angadi - - - - - - - - - - - - - - - - - - - - -

	////Add favicon
	document.getElementsByTagName("head")[0].innerHTML += ' <link rel="shortcut icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L'
	  +'/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAATdSURBVHjapJV/TFV1GMY/59xzf4AgiFcgYkYMUe4U0UivRs6IiCkxR46ZMceQmG2MGXNW6pY1csSYWjnXWCojUyPG0JpriguVGJpDZGp4RbpTYgjXC'
	  +'1zgcjnn3HP6A0yw5iqff969e9/tu/d5n/f5Cnf6yw4lZOg6PmSmwoIJcUruQ0b7n3UN9BKlypsHQSO2m2vtoC/zxysdIOFDBcA7GR9BnJb9/7qGBjTqqXo9CDXG0MATYCl6Nn/B8okmjaeBiXDigQ626ipQpzs1FbAQTRKg4WMEqBB7DcVgKY8qWPw+eMquOb5fAdIUqqZPFPgYxY/jYX2Q03oJCJuEJHEXCBYpx1QCWpqa66sCNvmb1CQQmqUOy2XQnf5IJRjUVcMHel/miU88GRaiSAS9VGkeq4SA9tiNq5ohJO5F8t4APV9e520CQ2nw+vCFYC6LcCSEg9Y7fmq4C7QdY4mDcRMamBDP33fIYzueLrI2PVmvBMEq9Zq3w4yG+FOvXoNRT8exnwQwrJrRYHVDePnaK2U7YfTKrd4z50HO63c5dgGBSELoUzCgL9Vscg+Y7HOa59vA1GetjV8Aww03In5ohaAWW8raWPAf8O0ZugCGVTM2WjfD+OGe+PY9IIiGUtN6EP/SQOB/i0KbeMHoArV6qLI7He5vPymVjEJgcszslTVgOTo3dtl8UET3Fmc2yJf74259B8qOwZn3MoAKsc1gf8iA9uheEREnb2OEPqCTXXoY0M1hPWuySwXSBLdYB1qunOqtBeWEO6srD9Qtw8X3C8BtOm/ddxtMjjm75zlB/Xoktq8OyBBksQnwcJ1TIFGju7RIIFWQxC4gU9ujVICe7s9RFoKAodW8BjjDAm0L6JrqlTuBZkOesRTEQinMnA1CnzErRAZFHbR17wUyNEWpBn2Tum38TRAxVwe/B3SwX18NxJCPAwTn4v1Hlv+o6/5mX7YnBQxrLGJIIcyuee3Mzn1gigxzPB8Der0+okWBt60zt9EFIwduFJ88AvJql6OzBYLDFnVll4K0IXRZ9FtgCY9OXHoURuVbRWcPgafx6srj5SBkSuUW26RTSiBZ5kZnvtAJyvYB9W4ORLSuS9n7IRjDrTfnRU2uZYpJm7OeYREQ2mpv2JwMD8LOtXz2BwxV/Wo9EgVR1W9bjrrAV9dju+aDoa2XIg7ZQTwWmDarGgjCShUT9+cGUQ50xdz+AIzdYTFzr4AomQODa+B+fl1SUTB4rl9NO14Gmn0seSAXxr/ocbdHQa+ldua7ATDW5Kz9xQkzWSJtiAdv2J2U8zvAnXrB+flaEA8GhMzKBKLYIFQBKiO4Hw0kuL5teGVPgq4HmJ47scIHgt2Ybq6H3t01cYVfgt/uXeMuA2vk68UfnQS69FJ9LqjbBtV7CaBeGK12HQQlbiDmbj3IpfezfksEYakUak4HMoWZYg/gwkHTNCeVAER//UhhfwKMFfxeePEgKJUPYrpCISAnpvalRtAyZaN3NWjXfYWe9aCsG6y89ymMpjiyz6XCaKTDcbYA5NB+u6MKhCKjHOAB0gWf2AB4cdL8j1YiAgjej7u+uTim656W1g3Hf4axpLu2SxUQGm5f+M44iN2mmiBA2e8O6nLBwCfNaV8tAVEyDwZtA7YKFYYWwEU7pyf/Pu1fftfAnwMAAE4OGP0BwFYAAAAASUVORK5CYII%3D" />';
	
	/////Links to images - mostly by Wm Rawls
	var elements = document.getElementsByTagName("a");
		for (var i=0; (anchor=elements[i]); i++) {
			src = anchor.getAttribute("href");
			if(anchor.innerHTML==' Image ' && (src.indexOf('.gif') > -1 || src.indexOf('.jpg') > -1))
			{
				img = document.createElement('img');
				img.setAttribute('src',src);
				anchor.innerHTML = "<br />";
				anchor.appendChild(img);
			}
	
		}
	
	//document.location.pathname (==/comics-archive/comics-04012006.html)
	//                                                     MMDDYYYY
	
	//prep
	var results =
		 document.evaluate("//tbody",
											 document, null,
											 XPathResult.FIRST_ORDERED_NODE_TYPE,
											 null);
	var divnode = results.singleNodeValue;
	
	//Get the date
	var cDay, cMonth, cYear;
	var comicsDate = new Date();
	comicsDate.setHours(comicsDate.getHours()-5);
	if(/\/comics-archive\/comics-[0-9]{8}\.html/.test(document.location.pathname)) //archive
	{
		var cPath = document.location.pathname;
		cDay = '' + cPath.charAt(25) + cPath.charAt(26);
		cMonth = ('' + cPath.charAt(23) + cPath.charAt(24)) - 1; //JS months 0 to 11
		cYear = '' + cPath.charAt(27) + cPath.charAt(28) + cPath.charAt(29) + cPath.charAt(30);
		comicsDate.setDate(cDay);
		comicsDate.setMonth(cMonth);
		cMonth += 1; //so cMonth is now 1 thru 12
		comicsDate.setYear(cYear);
		//debug
		//alert("we took 'archive' route; cmonth is " + cMonth);
	} else { //today's page
		cDay = comicsDate.getDate();
		cMonth = comicsDate.getMonth() + 1;//JS months 0 to 11
		cYear = comicsDate.getFullYear();
		//debug
		//alert("we took 'today' route; cmonth is " + cMonth);
	}
	
	if (cMonth.toString().length==1) cMonth = '0' + cMonth;
	if (cDay.toString().length==1) cDay = '0' + cDay;
	//debug alert("Comics date set to " + comicsDate + " and cMonth is" + cMonth);
	

	

	
	//Add  comic: Calvin and Hobbes
	//debug
	//alert('http://www.gocomics.com/calvinandhobbes/' + cYear + '/' + cMonth + '/' + cDay)
	var comicBox3 = document.createElement('tr');
	divnode.insertBefore(comicBox3, divnode.lastChild.nextSibling);
	comicBox3.innerHTML =  '<td>&nbsp;</td><td> <strong> Calvin &amp; Hobbes '
	+'</strong> [I\'ll Do It Myself! Fixer] <a '
	+'href="http://www.gocomics.com/calvinandhobbes/">[failsafe]</a> <br /> '
	+'<iframe src="http://www.gocomics.com/calvinandhobbes/' 
	+ cYear + '/' + cMonth + '/' + cDay
	+'/" frameborder="0" width="702" style="border-width: 0 !important; " height="336"></iframe> <br /><br /></td>';

	 
	//STYLE THE PAGE
	var newSS, styles='  br {display:block;} * {color: white; background-color: #555}* ';
	if(document.createStyleSheet) {
		document.createStyleSheet("javascript:'"+styles+"'"); 
	} else {
	 newSS=document.createElement('link'); 
	 newSS.rel='stylesheet'; 
	 newSS.href='data:text/css,'+escape(styles); 
	 document.getElementsByTagName("head")[0].appendChild(newSS); 
	}
	
	
	/////Add archive link -- thanks to Aditya Banerjee 
	if(!( /comics-archive/.test(document.location))){ //if it's not an archive page
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth()+1;
		var year = today.getFullYear();
		if (day!=1) day--;
		else {
			if (month==1 || month==2 || month==4 || month==6 || month==8 || month==9 || month==11) day = 31;
			else if (month==3) day =28;
			else day = 30;
			if (month!=1) month--;
			else {month = 12; year--;}
		}
		if (month.toString().length==1) month = '0' + month;
		if (day.toString().length==1) day = '0' + day;
		var date = month.toString() + day.toString() + year.toString();
		//alert(date);
		var linkP = document.createElement('p');
		var link = document.createElement('a');
		link.href = 'http://www.angadi.org/comics-archive/comics-'+date+'.html';
		link.innerHTML = 'Archive: Previous Day\'s Comics';
		linkP.appendChild(link);
		document.body.appendChild(linkP);
		var updateDiv=  document.createElement('div');
		 updateDiv.innerHTML = '<iframe src="http://www.pixelsandpages.com/comicsversion/'
		 +COMICSVERSION+'.php' 
			+'" frameborder="0" width="700" style="border-width: 0 !important; " height="50"></iframe>';
		document.body.appendChild(updateDiv);

	}

}
// ==/UserScript==
