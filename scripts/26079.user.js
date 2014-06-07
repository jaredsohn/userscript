// --------------------------------------------------------------------
//
// ==UserScript==
// @name          VeryCD Download Selector
// @namespace     http://www.f2woool.com/hbb/
// @description   select the type of file to download
// @include       http://verycd.com/*
// @include       http://*.verycd.com/*
// ==/UserScript==


function VCDS_GetDownloadArea()
{
	var all = document.getElementsByTagName('div');
	for(var i=0, ii=all.length; i<ii; ++i){
		if('emulemain' == all[i].className.toLowerCase()){
			return all[i];
		}
	}
}
function VCDS_AddTypeCheckBox()
{
	VCDS_CheckBoxs = [];
	VCDS_CheckTypes = [];
	VCDS_ID = '';
	
	var td = document.createElement('td');
	
	var area = VCDS_GetDownloadArea();

	var type = {};
	var a = area.getElementsByTagName('input');
	for(var i=0, ii=a.length; i<ii; ++i){
		var v = a[i].value.toLowerCase();
		if(0 == v.indexOf('ed2k:')){
		
			if(!VCDS_ID) VCDS_ID = a[i].name;
		
			VCDS_CheckBoxs.push(a[i]);
			
			var t = VCDS_GetFileType(v);
			if(!t) continue;

			if(type[t]) continue;
			type[t] = true;

			var cb = document.createElement('input');
			cb.type = 'checkbox';
			cb.value = t;
			cb.id = 'VCDS_' + t;
			cb.addEventListener('click', VCDS_CheckType, false);
			var lab = document.createElement('label');
			lab.htmlFor = 'VCDS_' + t;
			lab.innerHTML = t;
			td.appendChild( cb );
			td.appendChild( lab );
			
			VCDS_CheckTypes[t] = cb;
		}
	}
	
	VCDS_Filter = document.createElement('input');
	VCDS_Filter.type = 'text';
	VCDS_Filter.addEventListener('keyup', VCDS_MatchType, false);
	td.appendChild( VCDS_Filter );
	
	var tr = document.createElement('tr');
	tr.appendChild(td);
	var table = area.getElementsByTagName('table')[0];
	table.appendChild( tr );
}

function VCDS_MatchType(event)
{
	var reg = new RegExp(VCDS_Filter.value, 'im');
	var size = 0;
	var a = VCDS_CheckBoxs;
	try{
	
	var input_checkall = document.getElementById("checkall_" + VCDS_ID);
	input_checkall.checked = true ;
	for(var i=a.length-1; i>-1; --i){
		var name = a[i].value;
		name = name.slice(13, name.indexOf('|', 13));
		if(a[i].checked = reg.test(name) && VCDS_Filter.value!=''){
			var piecesArray = a[i].value.split( "|" );
			size += piecesArray[3]*1;
		}else{
			input_checkall.checked = false;
		}
	}
	
	var test = document.getElementById("size_" + VCDS_ID);
	test.innerHTML = gen_size(size, 3, 1);
	
	}catch(e){
	}
}

function VCDS_CheckType(event)
{
	var str = '';
	for(var i in VCDS_CheckTypes){
		if(VCDS_CheckTypes[i].checked){
			str += '|.+\\'+i+'$';
		}
	}
	str = str.substr(1);
	VCDS_Filter.value = str;
	VCDS_MatchType(null);
}

function VCDS_GetFileType(v)
{
	var m = v.lastIndexOf('.');
	if(m == -1) return '';
	var n = v.indexOf('|', m);
	if(n == -1) return '';
	return v.slice( m, n ).toLowerCase();
}

function gen_size(val, li, sepa ) {
	sep = Math.pow(10, sepa); //С?????λ??
	li = Math.pow(10, li); //??????????
	var retval = val;
	var unit = 'Bytes';
	if (val >= li*1000000000) {
		val = Math.round( val / (1099511627776/sep) ) / sep;
		unit ='TB';
	} else if (val >= li*1000000) {
		val = Math.round( val / (1073741824/sep) ) / sep;
		unit ='GB';
	} else if (val >= li*1000) {
		val = Math.round( val / (1048576/sep) ) / sep;
		unit ='MB';
	} else if (val >= li) {
		val = Math.round( val / (1024/sep) ) / sep;
		unit ='KB';
	}
	return val + unit;
}

if(VCDS_GetDownloadArea())
{
VCDS_AddTypeCheckBox();
}