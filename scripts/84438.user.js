// ==UserScript==
// @name           MoreAttributes
// @namespace      madd.in
// @include        http://www.geocaching.com/hide/attributes.aspx*
// ==/UserScript==

var attributeTable = document.getElementById('ctl00_ContentBody_Attributes_AttributesTable');

attributeTable.innerHTML += '<tr><th colspan="2">New Attributes added by USERSCRIPT</th><th>Yes</th><th>No</th><th>N/R</th>	</tr>';



if(document.getElementById('ctl00_ContentBody_Attributes_landf45')){
	var tr = document.getElementById('ctl00_ContentBody_Attributes_landf45').parentNode.parentNode;
	tr.parentNode.removeChild(tr);
} 

if(document.getElementById('ctl00_ContentBody_Attributes_field_puzzle47')){
	var tr = document.getElementById('ctl00_ContentBody_Attributes_field_puzzle47').parentNode.parentNode;
	tr.parentNode.removeChild(tr);
} 


attributeTable.innerHTML +='<tr><td><img id="ctl00_ContentBody_Attributes_landf45" title="Lost And Found Tour" src="/images/attributes/landf-yes.gif" alt="Lost And Found Tour" style="height: 30px; width: 30px; border-width: 0px;"></td><td>Lost And Found Tour</td><td><span><input id="ctl00_ContentBody_Attributes_45-yes" name="ctl00$ContentBody$Attributes$45" value="45-yes"  type="radio"></span></td><td><span><input id="ctl00_ContentBody_Attributes_45-no" name="ctl00$ContentBody$Attributes$45" value="45-no"  type="radio"></span></td><td><span><input id="ctl00_ContentBody_Attributes_45-na" name="ctl00$ContentBody$Attributes$45" value="45-na"  type="radio" checked="checked" ></span></td></tr>';


attributeTable.innerHTML += '<tr><td><img id="ctl00_ContentBody_Attributes_field_puzzle47" title="Field Puzzle" src="/images/attributes/field_puzzle-yes.gif" alt="Field Puzzle" style="height: 30px; width: 30px; border-width: 0px;"></td><td>Field Puzzle</td><td><span><input id="ctl00_ContentBody_Attributes_47-yes" name="ctl00$ContentBody$Attributes$47" value="47-yes" type="radio"></span></td><td><span><input id="ctl00_ContentBody_Attributes_47-no" name="ctl00$ContentBody$Attributes$47" value="47-no" type="radio"></span></td><td><span><input id="ctl00_ContentBody_Attributes_47-na" name="ctl00$ContentBody$Attributes$47" value="47-na" type="radio" checked="checked"></span></td></tr>';
