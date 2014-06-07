// ==UserScript==
// @name           Check all checkboxes
// @author         Internet
// @description    Checks all checkboxes
// @include        
// @version        1.0.0
// ==/UserScript==

function CheckAll()
{
count = document.frm.elements.length;
    for (i=0; i < count; i++) 
	{
    if(document.frm.elements[i].checked == 0)
    	{document.frm.elements[i].checked = 1; }
    
	}
}