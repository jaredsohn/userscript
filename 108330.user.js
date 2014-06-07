// ==UserScript==
// @name           Incluir Login no CRM
// @namespace      www.eliezer.com.br
// @author         Eliezer Rodrigues
// @description    CRM web não sabe fazer comentarios em html
// @include        http://URL_CRM_AKI/*cmd=login*
// @version        0.0.1
// Change : Start tosk fix form tosk
// ==/UserScript==

window.addEventListener("load", function(){
	var xpath = document.evaluate( "/html/body/form/table/tbody/tr/td/table/tbody/tr[3]/td[2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null );
	var td = xpath.snapshotItem(0);
	var table= document.createElement('table');

	table.innerHTML ="<tr class='signInTable'>"+
			 "<td class='PSEDITBOXLABEL'>User ID:</td>"+
			 "<td colspan='3'>"+
			 "   <input type='text' id='userid' name='userid' value='' class='PSEDITBOX'>"+
			 "</td>"+
			 "</tr>"+
			 "<tr class='signInTable'>"+
			 "  <td class='PSEDITBOXLABEL'>Password:</td>"+
			 "  <td colspan='3'>"+
			 "  <input TYPE='password' id='pwd' name='pwd' class='PSEDITBOX'>"+
			 "  </td>"+
			 "</tr>"+
			 "<tr class='signInTable'>"+
			 "  <td class='signInTable'>&nbsp;</td>"+
			 "  <td colspan='3'>"+
			 "  <input type='submit' name='Submit' value='Sign In' class='PSPUSHBUTTON' >"+
			 "</td>"+
			 "</tr>";

	td.appendChild(table)}, false);

