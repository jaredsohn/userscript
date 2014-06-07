// ==UserScript==
// @name           plus&minus
// @namespace      plus&minus
// @include        http://*wykop.pl/link/*
// @version         1.25
// ==/UserScript==

if (typeof $ == 'undefined') {
		if (unsafeWindow.jQuery) {
			var $ = unsafeWindow.jQuery;
			main();
		} else {
			addJQuery(main);
		}
	} else {
		main();
	}
function main(){



var buttons = '<table style="float: left;"><tr><td><button id="plus2all" style="background: #fff; border: 1px solid #1EAA1E; font-weight: bold; color: #1EAA1E; padding: 10px;">Plusy wszystkim</button></td><td><button id="minus2all" style="background: #fff; border: 1px solid #D21E1E; font-weight: bold; color: #D21E1E; padding: 10px;">Minusy wszystkim</button></td></tr><tr><td >plusy dla: <br><select id="voteup2one"></select></td><td >minusy dla: <br><select id="votedown2one"></select></td></tr></table></select>';
	$(buttons).appendTo($('div[class="content margin0 marginleft65"]'));

var x= $("ul#comments-list-entry");

var xx = x.find('header a[title^="profil"]');


var people = [];

$.each(xx, function(key, value) {
    if(!people[value.text]) 
    {
	people[value.text] = value.text
     $('#voteup2one')
         .append($("<option></option>")
         .attr("value",value.text)
         .text(value.text)); 

     $('#votedown2one')
         .append($("<option></option>")
         .attr("value",value.text)
         .text(value.text));
    }

});


$('select#voteup2one').change(function(){ 

var plusdla = x.find('header a[title^="profil"]:contains("'+$(this).val()+'")');
$.each(plusdla, function(key, value) {
     $(value).parent().find('a.plus').click();
});
});


$('select#votedown2one').change(function(){ 

var minusdla = x.find('header a[title^="profil"]:contains("'+$(this).val()+'")');
$.each(minusdla, function(key, value) {
     $(value).parent().find('a.minus').click();
});

});

$('button#plus2all').click(function(){$('a.plus').click();});
$('button#minus2all').click(function(){$('a.minus').click();});
}
function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}