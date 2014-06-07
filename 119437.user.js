// JavaScript Document
// ==UserScript==
// @name          Modify title bar "image to text"
// @namespace     http://www.tuwien.ac.at
// @description   Modify an image title bar to text
// @include       http://irishrail.ie/*
// ==/UserScript==



var images, image;
	images = document.getElementsByTagName('img');
	for ( var i = 0; i < images.length; i++) 
    {
		image = images[i];
		var string = image.src;
		var s = string.substring(string.lastIndexOf("/") + 1, string
				.lastIndexOf("."));


     if (s == "grey_bar") 
          {
			var td = image.parentNode;
			var tr = td.parentNode;
			var td1 = document.createElement('td');
			tr.replaceChild(td1, td);

			var td2 = document.createElement('th');
			td2.textContent = "Reservation&Times";
			td2.className = "title1";
			tr.insertBefore(td2, td1.nextSibling);

			var td3 = document.createElement('td');
			tr.insertBefore(td3, td2.nextSibling);

			var td4 = document.createElement('th');
			td4.textContent = "Fare Deals";
			td4.className = "title1";
			tr.insertBefore(td4, td3.nextSibling);

			var td5 = document.createElement('td');
			tr.insertBefore(td5, td4.nextSibling);

			var td6 = document.createElement('th');
			td6.textContent = "Travel Alerts&News";
			td6.className = "title1";
			tr.insertBefore(td6, td5.nextSibling);
		}
    }
