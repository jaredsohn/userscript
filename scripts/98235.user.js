// ==UserScript==
// @name           gaSwitchr
// @namespace      turoman.com
// @description	Switch between profiles while keeping the exact same report you're looking at, with the same set of dates.
// @include        http://www.google.com/analytics/*
// @include        https://www.google.com/analytics/*
// @include        https://adwords.google.com/analytics/*
// @version		1.1.1
// ==/UserScript==

//Developer: Turo
//Updated Mar 8, 2011

myPatt1 = /(\?|&)id=/;    // pattern to identify "?id=" or "&id=" in the URL (i.e URL is profile-specific)
myPatt2 = /\/settings\/$/;    // pattern to identify "/settings/$" in case of multiple accounts (i.e URL is NOT profile-specific)

//deactivate the script when looking at the general settings pages (not profile-specific)
if(myPatt1.exec(window.location.href) && !myPatt2.exec(window.location.href) && !window.location.href.match('/settings/home'))
{
	//Display the button
	a0wi=document.getElementById('profile').innerHTML;
	a0p5=/ selected( |=\"\"|=\"selected\")/;
	a0p6=/<option value=\"0\">[^<]*<\/option>/;
	button_element = window.document.createElement("span");
	void(button_element.setAttribute('style','border-left:1px solid white;margin-left:10px;padding-left:10px;color:white;'));
	button_html = 'Duplicate:&nbsp;<select id="a0sc" onchange="try{a0ou=document.location.href;a0p1=/[0-9]{8}-[0-9]{8}/;a0p2=/pdr=[^&]*/;a0p3=/id=[^&]*/;a0p4=/scid=[^&]*/;a0p7=/#.*/;if(document.getElementById(\'Graph_vis\')){a0gd=a0p1.exec(document.getElementById(\'Graph_vis\').firstChild.getAttribute(\'flashvars\'));a0gu=a0p1.exec(a0ou);if(a0gu){a0nu=a0ou.replace(a0p2,\'pdr=\'+a0gd);}else{a0nu=a0ou+\'&pdr=\'+a0gd;}}else{a0nu=a0ou;}/* if(document.getElementById(\'a0sc\').selectedIndex==1){for(i=2;i<document.getElementById(\'a0sc\').length;i++){if(a0p3.exec(a0ou)!=\'id=\'+document.getElementById(\'a0sc\').options[i].value){if(a0p3.exec(a0nu) && !a0p4.exec(a0nu)){window.open(a0nu.replace(a0p3,\'id=\'+document.getElementById(\'a0sc\').options[i].value));}else{return;}}}}else{ */ if(a0p3.exec(a0nu) && !a0p4.exec(a0nu)){if(document.getElementById(\'a0in\').checked){window.open(a0nu.replace(a0p3,\'id=\'+document.getElementById(\'a0sc\').value));}else{document.location.href=a0nu.replace(a0p3,\'id=\'+document.getElementById(\'a0sc\').value);}}else{return;} /* } */ this.options[0].selected=true;}catch(err){}"><option disabled selected>---</option><!-- <option value="1">**All**</option> -->'+a0wi.replace(a0p5,"").replace(a0p6,"")+'</select><input type="checkbox" style="margin:0px 2px 2px 8px;vertical-align:middle;" id="a0in"><label for="a0in">New tab ?</label>';
	button_element.innerHTML = button_html;
	
	html_insert_it_after(document.getElementById('profile'),button_element);
}

// This function will integrate the new drop-down menu into the page.
function html_insert_it_after(element, new_element) {
    //shortcut function to insert html after an element
    element.parentNode.insertBefore(new_element, element.nextSibling);
}
