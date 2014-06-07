// ==UserScript==
// @name           	Screw Your Dubs
// @namespace     	dubs
// @description    	Sick of gets? Now you don't have to see dubs ever again!
// @version		1.01
// @icon		http://i1237.photobucket.com/albums/ff473/edlolington/checkemicon-1-1.jpg
// ==/UserScript==

if(location.href.split("/")[2] == "boards.4chan.org") {
	var jsQuotes = new Array();
	var jsQuoteLinks = new Array();
	var jsReplyLinks = new Array();
	
	var jsQuotes_SAVE = new Array();
	var jsQuoteLinks_SAVE = new Array();
	var jsReplyLinks_SAVE = new Array();
	
	var dubsCount = 0;
	
	function rand() { return Math.floor(Math.random()*11); }
	
	function doPageEdits() { //BEGIN MAIN FUNCTION
	//change number display
	for (var i in jsQuotes) {
		var temp = jsQuotes[i].innerHTML+"";
		temp = temp.split("");
		if (temp[temp.length-1] == temp[temp.length-2]) 
			dubsCount++;
		while (temp[temp.length-1] == temp[temp.length-2]) {
			temp[temp.length-1] = parseInt(rand());
		}
		jsQuotes[i].innerHTML = temp.join("");
	}
	
	//change links
	for (var i in jsQuotes) {
		jsQuotes_SAVE[jsQuotes_SAVE.length] = jsQuotes[i].href;
		jsQuotes[i].addEventListener("mousedown", function()  {
				var str = this.href;
				var iterate = 0;
				for (var k in jsQuotes) {
					if (str == jsQuotes[k].href) {
						this.href = jsQuotes_SAVE[iterate];
						window.setTimeout(doPageEdits, 1000);
						break;
					}
					iterate++;
				}
			}, true);
	
		jsQuotes[i].href = "javascript:quote(\'"+jsQuotes[i].innerHTML+"\')";
	}
	
	for (var i in jsQuoteLinks) {
		if (jsQuoteLinks[i].innerHTML != "") { //if we catch bad links, ignore them. Don't wanna mess with the rest of the page
			var temp_href = jsQuoteLinks[i].href;

			jsQuoteLinks_SAVE[i] = jsQuoteLinks[i].href; 
			jsQuoteLinks[i].addEventListener("mousedown", function()  {
				var str = this.href;
				var iterate = 0;
				for (var k in jsQuoteLinks) {
					if (str == jsQuoteLinks[k].href) {
						this.href = jsQuoteLinks_SAVE[iterate];
						window.setTimeout(doPageEdits, 1000);
						break;
					}
					iterate++;
				}
			}, true);
			
			temp_href = temp_href.split("/")
			var linkNums = temp_href.splice(temp_href.length-1, 1);
			
			linkNums = linkNums[0].split("#");
		
			var temp1 = linkNums[0].split("");
			while (temp1[temp1.length-1] == temp1[temp1.length-2]) {
				temp1[temp1.length-1] = parseInt(rand());
			}
			temp1 = temp1.join("");
		
			temp2 = linkNums[1].split("");
			while (temp2[temp2.length-1] == temp2[temp2.length-2]) {
				temp2[temp2.length-1] = parseInt(rand());
			}
			temp2 = temp2.join("");
		
			linkNums = [temp1, temp2]
			linkNums = linkNums.join("#");
		
			temp_href.push(linkNums);
			temp_href = temp_href.join("/");
			
			jsQuoteLinks[i].href = temp_href;
		}
	}
	
	for (var i in jsReplyLinks) {
		
		jsReplyLinks_SAVE[jsReplyLinks_SAVE.length] = jsReplyLinks[i].href;  
		jsReplyLinks[i].addEventListener("mousedown", function()  {
				var str = this.href;
				var iterate = 0;
				for (var k in jsReplyLinks) {
					if (str == jsReplyLinks[k].href) {
						this.href = jsReplyLinks_SAVE[iterate];
						window.setTimeout(doPageEdits, 1000);
						break;
					}
					iterate++;
				}
			}, true);
		
		var temp_href = jsReplyLinks[i].href;
		temp_href = temp_href.split("/");
		var temp = temp_href.splice(temp_href.length-1, 1);
		temp = temp[0].split("");

		while (temp[temp.length-1] == temp[temp.length-2]) {
			temp[temp.length-1] = parseInt(rand());
		}
		temp = temp.join("");
		temp_href.push(temp);
		temp_href = temp_href.join("/");
		jsReplyLinks[i].href = temp_href;	
	}
	
	} //END MAIN FUNCTION
	
	var postNumberLinks = document.getElementsByTagName("a");
	for (var i=0; i<postNumberLinks.length; i++) {
			if (postNumberLinks[i].className == "quotejs" && postNumberLinks[i].innerHTML != "No.") {
				jsQuotes[jsQuotes.length] = postNumberLinks[i];
			}
			else if (postNumberLinks[i].className == "quotejs" && postNumberLinks[i].innerHTML == "No.") {
				jsQuoteLinks[jsQuoteLinks.length] = postNumberLinks[i];
			}
			else if (postNumberLinks[i].innerHTML == "Reply") {
				jsReplyLinks[jsReplyLinks.length] = postNumberLinks[i];
			}
	}
	
	doPageEdits();
	document.getElementById("footer").innerHTML = "<b>"+dubsCount+
			" instances of doubles have been removed from this page.</b><br />"+document.getElementById("footer").innerHTML;
	
	var postNumberFormatted = (function() {
		str = "";
		for (var i in jsQuotes) {
			str += jsQuotes[i].innerHTML+", "
		}
		return str;
	})();
	//alert(postNumberFormatted);
	
}
