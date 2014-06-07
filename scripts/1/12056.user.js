// ==UserScript==
// @name           APOD Arrows
// @namespace      http://bshort.org/code/greasemonkey/
// @description    Adding large arrows to the Astronomy Picture of the Day.
// @include        http://antwrp.gsfc.nasa.gov/apod/*
// @include        http://apod.gsfc.nasa.gov/*
// ==/UserScript==
all = document.getElementsByTagName('*');
var bodyElement;
var headingElement;
var title = "";
for (var i = 0; i < all.length; i++) {
    element = all[i];
   	if (element.nodeName == 'BODY') {
	   //alert(element.nodeName);
	   bodyElement = element;
	} else if (element.nodeName == 'H1') {
	   //alert(element.nodeName);
	   headingElement = element;
	} else if (element.nodeName == 'CENTER') {
	// this removes <style> elements defined in the page <head>
	//element.parentNode.removeChild(element);
	//alert(element.innerHTML.indexOf("<h1> Astronomy Picture of the Day </h1>"));
		if (element.innerHTML.indexOf("<h1> Astronomy Picture of the Day </h1>") == 1)
		{
			//alert('We found THE center tag!');

		}
    } else     if (element.nodeName == 'A') {
		//	alert("the <" + element.innerHTML.indexOf("&lt;"));
		if (element.innerHTML.indexOf("&lt;") == 0)
		{
			//alert("the <" + element.innerHTML.indexOf("&lt;") + "\n" + element);
			var leftArrow = element.href;
		}
		if (element.innerHTML.indexOf("&gt;") == 0)
		{
			//alert("the >" + element.innerHTML.indexOf("&gt;") + "\n" + element);
			var rightArrow = element.href;
		}
		if (element.href == "archivepix.html")
		{
			element.innerHTML = "";
		}
    } else     if (element.nodeName == 'B' && title == "") {
			//alert("the <" + element.innerHTML.indexOf("&lt;"));
			title = element;
			title.setAttribute('style', 'font-size:2em;');
    } else     {
	// this removes per-element styles and a variety of deprecated attributes
	//element.setAttribute('style', '');
	//element.setAttribute('size', '');
	//element.setAttribute('face', '');
	//element.setAttribute('color', '');
	//element.setAttribute('bgcolor', '');
	//element.setAttribute('background', '');
    }
}
for (var i = 0; i < all.length; i++) {
    element = all[i];
	 if (element.nodeName == 'CENTER') {
	// this removes <style> elements defined in the page <head>
	//element.parentNode.removeChild(element);
//	alert(element.innerHTML.indexOf("<h1> Astronomy Picture of the Day </h1>"));
		if (element.innerHTML.indexOf("<h1> Astronomy Picture of the Day </h1>") > 0)
		{
			element.setAttribute('style', 'font-size:.3em;');
	
			//element.innerHTML = "";
		//	alert('We found THE center tag!');
			var ourTable = document.createElement('table');
			ourTable.insertRow(0);


			ourTable.rows[0].insertCell(0);
			ourTable.rows[0].insertCell(1);
			ourTable.rows[0].insertCell(2);


			var leftArrowAnchor = document.createElement('a');
			leftArrowAnchor.appendChild(document.createTextNode("<---"));
			leftArrowAnchor.href = leftArrow;
			leftArrowAnchor.setAttribute('style', "font-size:45px;");
 			//element.appendChild(rightArrowAnchor);// "<a href='" + rightArrow + "'>&gt;</a>";
			ourTable.rows[0].cells[0].appendChild(leftArrowAnchor);
//alert(document.leftArrowAnchor);
			var rightArrowAnchor = document.createElement('a');
			rightArrowAnchor.appendChild(document.createTextNode("--->"));
			rightArrowAnchor.href = rightArrow;
			rightArrowAnchor.setAttribute('style', "font-size:45px;");
 			//element.appendChild(rightArrowAnchor);// "<a href='" + rightArrow + "'>&gt;</a>";
			ourTable.rows[0].cells[2].appendChild(rightArrowAnchor);

			var middleAnchor = document.createElement('a');
			middleAnchor.appendChild(document.createTextNode("today"));
			middleAnchor.href = "http://antwrp.gsfc.nasa.gov/apod/";
			middleAnchor.setAttribute('style', "font-size:25px;");
 			//element.appendChild(rightArrowAnchor);// "<a href='" + rightArrow + "'>&gt;</a>";
 			ourTable.rows[0].cells[1].appendChild(middleAnchor);


		
			ourTable.setAttribute('width', '100%');
			ourTable.setAttribute('align', 'center');
			ourTable.rows[0].cells[0].setAttribute('align', 'center');
			ourTable.rows[0].cells[1].setAttribute('align', 'center');
			ourTable.rows[0].cells[2].setAttribute('align', 'center');
			
			ourTable.insertRow(0);
			ourTable.rows[0].insertCell(0);
			ourTable.rows[0].cells[0].setAttribute('colspan', '3');
			ourTable.rows[0].cells[0].setAttribute('align', 'center');
			ourTable.rows[0].cells[0].appendChild(title);
			
			
			
			
	  // alert(headingElement.node);

			//actualElement.appendChild(ourTable);
			//bodyElement.insertBefore(ourTable,headingElement);
			headingElement.appendChild(ourTable);
exit;
		}
    }
}
