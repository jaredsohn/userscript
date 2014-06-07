// ==UserScript==
// @name           Coppermine Enhancer
// @namespace      Woot
// @description    Rewrites links to point straight to the images, and adds a color coding to thumbnails to show their size. (yellow - less than 0.5 megapixels, red 0.5-1.5 megapixels, blue 1.5-3.8 megapixels, green 3.8-5.3 megapixels, white - larger than 5.3 megapixels).
// @include http://coppermine-gallery.net/demo/*
// @include *displayimage*
// @include *album*
// @include *thumbnails*
// ==/UserScript==
var wordUp = function() {
	var getElementsByClassName = function(classname, node)  {
		if(!node) node = document.getElementsByTagName("body")[0];
		var a = [];
		var re = new RegExp('\\b' + classname + '\\b');
		var els = node.getElementsByTagName("*");
		
		for(var i=0,j=els.length; i<j; i++)
			if(re.test(els[i].className))a.push(els[i]);
		return a;
	}

	var colorCode = function(element) {
		var img = getElementsByClassName("image", element);
		if (img.length <= 0)
			return 0;
		img = img[0];
		var lst = img.title.split("=");
		var link = element.getElementsByTagName('a')[0];
		var href = img.src;
		var ext = href.split("/");
		var oldLink = link.href;
		img.style.padding = '4px';
		ext = ext[ext.length-1];
		if (ext.toLowerCase().search("_") >= 0)
			href = href.replace(ext,ext.slice(ext.toLowerCase().search("_")+1));
		else
			return 0;
		if (link.href.toLowerCase().search("displayimage") >= 0)
		{
			link.href = href;
			var blah = element.getElementsByTagName('table')[0].rows[0].cells[0];
			var newLink = document.createElement("a");
			newLink.href = oldLink;
			newLink.innerHTML = "Html Page";
			newLink.style.color = "black";
			blah.appendChild(newLink);
			//.getElementsByTagName('td');
			//blah.innerHTML = blah.innerHTML.split("</a>")[0]+"</a></br><a href = "+oldLink + " color='black'}>Html Page</a>"+blah.innerHTML.split("</a>")[1];
			element.getElementsByTagName('table')[0].rows[0].cells[0].appendChild(document.createElement("br"));
		}
		for(var i=0; i<lst.length; i++) {
			if(lst[i].search("Dimensions") >= 0 && lst[i].indexOf("Dimensions") == lst[i].length-10) {
				var m = lst[i+1].split("\n")[0].split("x");
				m[0] = Number(m[0]); m[1] = Number(m[1]);
				m = m[0]*m[1];

				var color = "rgb(";
				var number = 127;
				if (m <= 512000)
				{
					number = number + m*128/512000;
					number = Math.floor(number).toString();
					color += number + "," + number + "," + "0)";
				}
				else if (m < 1500000)
				{
					number = number + (m - 512000)*128/(1500000-512000);
					number = Math.floor(number).toString();
					color += number + ",0,0)";
				}
				else if (m < 3800000)
				{
					number = number + (m - 1500000)*128/(3800000-1500000);
					number = Math.floor(number).toString();
					color += "0,0," + number + ")";
				}
				else if (m < 5300000)
				{
					number = number + (m - 3800000)*128/(5300000-3800000);
					number = Math.floor(number).toString();
					color += "0," + number + ",0)";
				}
				else
					color = "#FFFFFF";
				img.style.backgroundColor = color;
			}
		}
		
		return 0;
	}
	if (document.location.href.search("displayimage") < 0)
	{
		var x = getElementsByClassName("thumbnails");
		for(var y = 0; y < x.length; y++)
			colorCode(x[y]);
	}
}
wordUp();
//window.addEventListener('load',wordUp,false);
