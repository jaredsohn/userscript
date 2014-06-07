// ==UserScript==
// @name          What.CD - Top Filter
// @author        FerretGuy
// @version       1.1
// @namespace     http://what.cd
// @description   Allows for filter of top 100/250
// @include       http://what.cd/top10.php?type=torrents&limit=*
// @include       https://what.cd/top10.php?type=torrents&limit=*
// @include       https://ssl.what.cd/top10.php?type=torrents&limit=*
// ==/UserScript==

var tbl = document.getElementsByTagName('table'); 
if(tbl.length>1){ //if default top filter exists
tbl[0].style.display='none'; //hides default top filter, comment to unhide
tbl = tbl[1]; //choose second table
} else {
tbl = tbl[0]; //choose first table
}
formTable = tbl.tBodies[0];
var newRow = formTable.insertRow(0);
var newCell = newRow.insertCell(-1);
newCell.colSpan=8;
var filter_form = document.createElement('form');
newCell.appendChild(filter_form);
var require_input = document.createElement('input');
require_input.id = 'require_input';
require_input.size = 20;
filter_form.appendChild(document.createTextNode('Require: '));
filter_form.appendChild(require_input);
filter_form.appendChild(document.createTextNode('\u00A0\u00A0Exclude: '));
var exclude_input = document.createElement('input');
exclude_input.id = 'exclude_input';
exclude_input.size = 20;
filter_form.appendChild(exclude_input);
filter_form.appendChild(document.createTextNode('\u00A0\u00A0'));
var filter_button = document.createElement('input');
filter_button.type = 'button';
filter_button.name = 'filter_button';
filter_button.value = 'Filter';
filter_button.addEventListener('click', parseFilter, false);
filter_form.appendChild(filter_button);
filter_form.appendChild(document.createTextNode('\u00A0\u00A0'));
var reset_button = document.createElement('input');
reset_button.type = 'button';
reset_button.name = 'reset_button';
reset_button.value = 'Reset';
reset_button.addEventListener('click', resetFilter, false);
filter_form.appendChild(reset_button);
filter_form.appendChild(document.createTextNode('\u00A0\u00A0'));
var save_button = document.createElement('input');
save_button.type = 'button';
save_button.name = 'save_button';
save_button.value = 'Save';
save_button.addEventListener('click', saveFilter, false);
filter_form.appendChild(save_button);
var filter_text = document.createElement('strong');
filter_text.id = 'filter_text';
filter_form.appendChild(filter_text);

//Load Previous Values
if(!window.chrome) {
	require_input.value = GM_getValue('whatcd_filter_require') ? GM_getValue('whatcd_filter_require') : '';
	exclude_input.value = GM_getValue('whatcd_filter_exclude') ? GM_getValue('whatcd_filter_exclude') : '';
}else{
	require_input.value = localStorage.getItem('whatcd_filter_require') ? localStorage.getItem('whatcd_filter_require') : '';
	exclude_input.value = localStorage.getItem('whatcd_filter_exclude') ? localStorage.getItem('whatcd_filter_exclude') : '';
}
parseFilter();

function parseFilter()
{
	var i=0,j=0,count=0,ele;
	for (i=1;i<tbl.rows.length;i++) //reset to all visible
		tbl.rows[i].style.display='';

	var requireArray = require_input.value.split(',');
	var excludeArray = exclude_input.value.split(',');
	if(!((requireArray.length==1)&&(requireArray[0]==''))) {
		for(i=0;i<requireArray.length;i++) {
			for(j=2;j<tbl.rows.length;j++) {
				ele = tbl.rows[j].cells[2].innerHTML.replace(/<[^>]+>/g,"");
				if(ele.toLowerCase().indexOf(requireArray[i].toLowerCase().trim())<0)
					tbl.rows[j].style.display='none';
			}
		}
	}
	if(!((excludeArray.length==1)&&(excludeArray[0]==''))) {
		for(i=0;i<excludeArray.length;i++) {
			for(j=2;j<tbl.rows.length;j++) {
				ele = tbl.rows[j].cells[2].innerHTML.replace(/<[^>]+>/g,"");
				if(ele.toLowerCase().indexOf(excludeArray[i].toLowerCase().trim())>=0)
					tbl.rows[j].style.display='none';
			}
		}
	}
	for(i=2;i<tbl.rows.length;i++)
		if(tbl.rows[i].style.display=='none') {count++;}

	if(count>0)
		filter_text.innerHTML=('\u00A0\u00A0-'+count);
	else
		filter_text.innerHTML=('');
}

function resetFilter() {
	for (var i=1;i<tbl.rows.length;i++) //reset to all visible
		tbl.rows[i].style.display='';
	filter_text.innerHTML=('');
	require_input.value = '';
	exclude_input.value = '';
}
function saveFilter() {
	if(!window.chrome) {
		GM_setValue('whatcd_filter_require', (require_input.value));
		GM_setValue('whatcd_filter_exclude', (exclude_input.value));
	}else{
		localStorage.setItem('whatcd_filter_require', (require_input.value));
		localStorage.setItem('whatcd_filter_exclude', (exclude_input.value));
	}
}