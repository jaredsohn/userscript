// ==UserScript==
// @name           			Check My Dubs
// @namespace     		dubs
// @description    		Love checking dubs? Now you can check 'em all the time!
// @icon						http://i1237.photobucket.com/albums/ff473/edlolington/checkemicon-1.jpg
// @version					1.0
// ==/UserScript==

if(location.href.split("/")[2] == "boards.4chan.org") {
	var jsQuotes = new Array();
	var jsQuoteLinks = new Array();
	var jsReplyLinks = new Array();
	
	var jsQuotes_SAVE = new Array();
	var jsQuoteLinks_SAVE = new Array();
	var jsReplyLinks_SAVE = new Array();
	
	function resetQuotes(event) {
		GM_log("Shzzam! Just found the quote save");
		var str = this.href;
		for (var i in jsQuotes) {
			if (str == jsQuotes[i].href) {
				
				this.href = jsQuotes_SAVE[i];
				window.setTimeout(doPageEdits, 750);
				break;
			}
		}
	}
	
	function resetQuoteLinks(event) {
		alert(event.href);
		var str = this.href;
		for (var i in jsQuoteLinks) {
			
			if (str == jsQuoteLinks[i].href) {
				
				this.href = jsQuoteLinks_SAVE[i];
				window.setTimeout(doPageEdits, 750);
				break;
			}
		}
	}

	function doPageEdits() { //BEGIN MAIN FUNCTION
	//change number display
	for (i in jsQuotes) {
		var temp = jsQuotes[i].innerHTML+"";
		temp = temp.split("");
		temp[temp.length-1] = temp[temp.length-2];
		jsQuotes[i].innerHTML = temp.join("");
	}
	
	//change links
	for (i in jsQuotes) {
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
	
	for (i in jsQuoteLinks) {
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
			temp1[temp1.length-1] = temp1[temp1.length-2];
			temp1 = temp1.join("");
		
			temp2 = linkNums[1].split("");
			temp2[temp2.length-1] = temp2[temp2.length-2];
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
		temp[temp.length-1] = temp[temp.length-2];
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
	
	var postNumberFormatted = (function() {
		str = "";
		for (var i in jsQuotes) {
			str += jsQuotes[i].innerHTML+", "
		}
		return str;
	})();
	//alert(postNumberFormatted);
	
}
