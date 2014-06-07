// ==UserScript==
// @name			Gaia marketplace tax calculator
// @version			V0.9.5.3
// @description		Adds a calculated tax and profit element for posting items with (G) icon
// @include			http://www.gaiaonline.com/marketplace/mystore/sell/?item_id=*&item_param=*
// @include			http://www.gaiaonline.com/marketplace/mystore/sell/?login_success=1&item_id=*&item_param=*
// ==/UserScript==

/*
Change log:

V0.9.5.3 Now uses 'keyup' event, not 'change'. Updates happen every time a key is released in the Buy Now Price box. I'm so stupid for not thinking of that sooner!

V0.9.5.2 Remove debug stuff. Stupid me!

V0.9.5.1 Note to self: run spell check before uploading. >.>

V0.9.5 Fixed NaN errors! Out did my self, fixed two versions of the error! BTW, isNaN() passes back false for a blank var >.<

V0.9 Ran final spell check and testing

V0.8.9 Added (G) logo after imbedding the thing

V0.8.7 Found out that Gaia floors the tax; changed round() to floor() for tax calculation

V0.8.6 Cleaned out GM_log commands

V0.8 to V0.8.5 Tried using "onchange" as the event for updating the data; never worked.

V0.6 to 0.7 Tried to add text to the page and change it after

V0.1 to 0.5 Made attempts to get the buy now price value dumped to GM_log

V0.0 Idea came to me after seeing a toolbar do it, but hate the toolbar itself. Don't ask about it, I won't say anything about it.

*/

function updateMath() {
	if (input.value===""){
		var myNum=0;
	}
	else if (isNaN(input.value)==true)
	{
		var myNum=0;
	}
	else
	{
		var myNum = parseInt(input.value);
	}
	var taxvalue = Math.floor(myNum*0.02);
	var taxout = document.getElementById("taxout");
	taxout.firstChild.nodeValue=taxvalue;
	var profitout = document.getElementById("profitout");
	var profitvalue = myNum-taxvalue;
	profitout.firstChild.nodeValue=profitvalue;
};
var form = document.forms.namedItem("sellform");
var input = form.elements.namedItem("buy_now_price");
var goldLogo = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDvNV1z+0EimWESSTOUt0kO0IuNxJIyRxjOMknA6Yw2w/tSznElsyLgbsrISsp7KVIzjk5yT1455qTWtKn0iTAhWTTs/KTuAQZwo3AEqRnHPDDvnOKOmaPc6tfJHahbeyjdpGkRnkBkxjczEAZAbhR9c18NPD4z609Hz331/q34fp6alDk0eh//2Q==';
var sellform = document.getElementById('sellform');
var math = document.createElement("div");
math.innerHTML = '<strong>Tax 2%:</strong> <span id="taxout">0</span><img src="' + goldLogo + '" alt="gold.jpg" /><br/><strong>Profit:</strong> <span id="profitout">0</span><img src="' + goldLogo + '" alt="gold.jpg" />';
sellform.parentNode.insertBefore(math, sellform.nextSibling);
updateMath();
input.addEventListener('keyup', updateMath, false);