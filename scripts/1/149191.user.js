// ==UserScript==
// @name        eRepublik WAM
// @namespace   http://www.erepublik.com
// @description Works as manager YO
// @include     http://www.erepublik.com/*/economy/myCompanies
// @version     1
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var jSecondTable    = $(".area");

//--- Insert my table before it.
jSecondTable.before 
(
    'Selektiraj prvih <input type="text" name="prvih" id="prvih"> kompanija. <a href="#" onclick="radi();" >SELEKTIRAJ BRE</a>'
);

document.addEventListener('click', function(event) {
	//alert("Event: " + event + " || " + event.target + " || " + event.target.innerHTML);
	if(event.target.innerHTML == "SELEKTIRAJ BRE")
	{
		event.stopPropagation();
    	event.preventDefault();
		
		for(var i = 0; i < $("#prvih").val(); i++)
		{
			$(".as_employee").get(i).click();
		}
		// Fix the hover
		//document.getElementById("latesttab").children[0].setAttribute("class", "");
		///document.getElementById("topratedtab").children[0].setAttribute("class", "on");
	//	document.getElementById("internationaltab").children[0].setAttribute("class", "");
	}	
}, true);