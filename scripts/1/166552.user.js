// ==UserScript==
// @name        Use Chosen JQuery Plugin on Host My Site Website DropDowns
// @namespace   com.visionlinemedia.www
// @description Use Chosen JQuery Plugin on Host My Site Website DropDowns
// @include     https://my.hostmysite.com/*
// @matches     https://my.hostmysite.com/*
// @version     1
// @require     //code.jquery.com/jquery-latest.min.js
// @require     //raw.github.com/harvesthq/chosen/master/chosen/chosen.jquery.min.js
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addStuff() {  
	//REMOVE JUNK
	$("#header #sel_sub_id option").each(function() {
	    var text = $(this).text();
	    text = text.replace("(", "");
	    text = text.replace(")", "");
	    text = text.replace("Linux Shared Hosting Standard", "LSHS - ");
	    text = text.replace("Reseller Linux Starter Yearly", "RLSY");
	    text = text.replace("Reseller Linux Builder Yearly", "RLBY");
	    text = text.replace("Reseller Linux Builder Plus Yearly", "RLBY");
	    text = text.replace("Reseller Linux Standard Yearly", "RLSY");
	    text = text.replace("Reseller Foundation Yearly", "RFY");
	    text = text.replace("Linux Builder Yearly", "LBY");
	    $(this).text(text);
	});
	/*var link = document.createElement('LINK');
	link.rel = 'stylesheet';
	link.href = 'http://harvesthq.github.com/chosen/chosen/chosen.css';
	link.type = 'text/css';
	document.body.insertBefore(link, null);*/
	var link = document.createElement('LINK');
	link.rel = 'stylesheet';
	link.href = 'http://harvesthq.github.com/chosen/chosen/chosen.css';
	link.type = 'text/css';
	document.body.insertBefore(link, null);
	//main css
	var link = document.createElement('LINK');
	link.rel = 'stylesheet';
	link.href = 'http://visionlinemedia.com/hosted/hostmysite.com/chosen/main.css';
	link.type = 'text/css';
	document.body.insertBefore(link, null);
	//
	startChosen();
}

function startChosen()
{
    $('#header #sel_sub_id').chosen();
}
// load jQuery and execute the main function
addStuff();
//alert('test');