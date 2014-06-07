// ==UserScript==
// @name           msdnaaElmsExpandedListSearch
// @namespace      poem
// @author         poetic
// @description    for students with access to MSDN AA through ELMS's e-academy.com. replaces the dropdown list with an expanded list and a search field to filter the list
// @include        http*://*.e-academy.com/elms/Storefront/Storefront.aspx*
// ==/UserScript==

var productlist = document.getElementById('ddlProductPickList');
productlist.size = 20;

var listoptions = productlist.getElementsByTagName('option');

var searchfield = document.getElementById('txtProductSearch');


searchfield.addEventListener('keyup',updatelist,'true');


function updatelist(){
	var val = searchfield.value.toLowerCase();
	
	for(var j=0;j<listoptions.length;j++){
		if(listoptions[j].firstChild.nodeValue.toLowerCase().indexOf(val) != -1){
			listoptions[j].style.display = 'block';
		}else{
			listoptions[j].style.display = 'none';
		}
	}
}
