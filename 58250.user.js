// ==UserScript==
// @name           Journal Preference Saver
// @namespace      http://userscripts.org/users/48349
// @include        http://*.okcupid.com/journal*
// ==/UserScript==

var filterForm = document.getElementById('filter_form');
var goBtn = document.evaluate("//p[@class='btn small  ']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (goBtn) {		
	loadFormValues();
    	var saveLink = document.createElement('a');       
   	saveLink.innerHTML ='Save';
	saveLink.setAttribute('href','javascript:void(0);');    
    	saveLink.addEventListener('click', function(evt) {
    			saveFormValues();
    
    	}, false);

    goBtn.parentNode.insertBefore(saveLink, goBtn.nextSibling);
} 

var strangersLink = document.evaluate("//ul[@id='site_nav_2']/li[1]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (strangersLink) {
	strangersLink.href='/journal?strangers=1&gentation=' + GM_getValue('gentation','63')+ '&age_min=' + GM_getValue('age_min','0') + '&age_max=' +  GM_getValue('age_max','99');
}

function saveFormValues(){
	GM_setValue('gentation',filterForm.elements.namedItem('gentation').value);
	GM_setValue('age_min',filterForm.elements.namedItem('age_min').value);
	GM_setValue('age_max',filterForm.elements.namedItem('age_max').value);
}

function loadFormValues(){
	filterForm.elements.namedItem('gentation').value = GM_getValue('gentation','63');
	filterForm.elements.namedItem('age_min').value = GM_getValue('age_min','0');
	filterForm.elements.namedItem('age_max').value = GM_getValue('age_max','99');	
	
}




