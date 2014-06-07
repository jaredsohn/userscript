// ==UserScript==
// @name           MyPRGenie press release helper 
// @namespace      MyPRGenie
// @include        http://localhost:3000/publication/upload_collateral?publication_type=2
// @include        http://staging.myprgenie.com/publication/upload_collateral?publication_type=2
// @include        http://myprgenie.com/publication/upload_collateral?publication_type=2
// ==/UserScript==



document.getElementById("publication_business_profile").onchange = function autofill(){
	document.getElementById("publication_name").value = "test name";
	document.getElementById("publication_mc_phone").value = "123213";
	document.getElementById("publication_mc_source_city").value = "test city";
	document.getElementById("publication_mc_source_state_province").value = "test province";
	document.getElementById("publication_mc_source_country").selectedIndex = 2;
	document.getElementById("publication_mc_source_company").value = "test company";
	document.getElementById("product").selectedIndex = 2;
	document.getElementById("tag").value = "asd a dasd";
	document.getElementById("publication_contact_person").value = "23423423";
	document.getElementById("publication_after_hours_phone").value = "23432423";
	document.getElementById("publication_agree_terms").checked = true;
}


