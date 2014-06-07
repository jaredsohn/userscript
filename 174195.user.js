// ==UserScript==
// @name        Hiszilla Greeter
// @namespace   greeter
// @include     https://hiszilla.his.de/*
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// @version     1.1.3
// @grant 
// ==/UserScript==


//Änderbare Variablen
var hello = 'Hallo';
var ciao = 'Viele Grüße';
var supporter = null;//'Daniel Hillmer';
// ******************
var gender_ar = new Array('Herr','Frau');
var greeting_button = "<a href='javascript:return;' id='greeter_button' value='Begrüßung' style='float:left'>Begrüßung</a><br>";

if ($("div[class='knob-buttons']").size() > 0){
	$("div[class='knob-buttons']").parent().prepend(greeting_button);
}else{

	$("textarea[id='comment']").parent().prepend("<div style='clear:both'></div>"+greeting_button);

}

$('a[id="greeter_button"]').click(function(){
		var text = $("textarea[id='comment']").val();
		var customer_name = $('a[class="email"] > span[class="fn"]').first().text().trim();
		customer_name = customer_name.replace(/\(.*\)/g,'')
		customer_name = customer_name.substring(customer_name.indexOf(" "),customer_name.length).trim();
		
		if (supporter == null){
			var supporter_surname = $('div[id="header"] > ul[class="links"] > li').last().text()
			supporter_surname = String(supporter_surname.match(/[a-zA-Z]{1,}@[a-zA-Z]{1,}\.de/));
			supporter_surname =  String(supporter_surname).charAt(0).toUpperCase() + supporter_surname.substr(1);
			supporter_surname = String(supporter_surname).replace(/@.*$/g,"")
			supporter = supporter_surname 
			var found = false;
			$('a[class="email"] > span[class="fn"]').each(function(item){
					
					if ($(this).text().indexOf(supporter_surname) > -1){
						supporter = $(this).text().replace(/\(.*\)$/g,"")
						found = true
						return;
					}
			});
			if (!found){
				supporter = prompt("Ihr Name?");
			}
		}
		var gn = getGender(customer_name)
		while (gn == null){
			gn = prompt("Anrede des Kunden:","Herr");
		}

		while (customer_name.length == 0){
			customer_name = prompt("Kundenname");
		}
		
		new_text = hello + " " + gn + " " +customer_name + ",\n\n" + text + "\n\n"+ciao+"\n"+supporter
		$("textarea[id='comment']").val(new_text)
});

function getGender(lastname){
	var gender = null;	
	$('pre[class="bz_comment_text"]').each(function(){
		if (gender == null){
			var item=$(this)
			for(var i=0;i<=gender_ar.length;i++){
				var text = (gender_ar[i]+" "+lastname).toLowerCase()
				if (item.text().toLowerCase().indexOf(text) > -1){
					 gender = gender_ar[i];
					 break;
				}
			}
		}
	});

	return gender;
}
