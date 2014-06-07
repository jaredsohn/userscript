// ==UserScript==
// @name           Apache server-status
// @version        1.0
// @author         MeXaon
// @email          svgmail@mail.ru
// @namespace      server-status
// @include        http://*/server-status*
// ==/UserScript==

var cssStyle =	'body{background-color:white;}' +
								'hr{clear:both;}' +
								'pre{letter-spacing:2px;}' +
								'pre a:hover{background-color:#555}' +
								'table{border-collapse:collapse;border:2px solid #000}' +
								'table#iTable1{float:left;margin-right:10px;}' +
								'table th{background-color:#525d76;}' +
								'table#mTable th{cursor:pointer;}' +
								'table td,table th{border:1px solid #AAA;padding:2px;}' +
								'table .row0{background-color:#d6d7e9}' +
								'table .row1{background-color:#eaebff}' +
								'table#mTable tr:hover{background-color:#c0c0e4;}' +
								'.block{background-color:#D6D7E9;border:2px solid #000000;padding:5px;}';

var jScript = <![CDATA[
	function sort(id, col, type, rClass, useNumber) { 
		if (typeof rClass == "undefined") rClass=true;
		if (typeof useNumber == "undefined") useNumber=false;
			var table = document.getElementById(id); 
			var tbody = table.tBodies[0]; 
			var rows = tbody.rows; 
			var arr = new Array; 

			for (var i = 0; i < rows.length; i++) arr[i] = rows[i]; 
			if (table.getAttribute("sortcol") == col) arr.reverse(); 
			else arr.sort(generateCompareTRs(col, type)); 

			var t = document.createDocumentFragment(); 
			var iclass = 0;
			for (var i = 0; i < arr.length; i++) {
				if(rClass) arr[i].className = 'row' + iclass;
				if(useNumber) arr[i].getElementsByTagName('td')[0].innerHTML = i + 1;
				t.appendChild(arr[i]);
				iclass = iclass ^ 1;
			}

			tbody.appendChild(t); 
			table.setAttribute("sortcol", col); 
	}

	function generateCompareTRs(col, type) {       
		return function compareTRs(TR1, TR2) { 
			var v1 = convert(TR1.cells[col], type); 
			var v2 = convert(TR2.cells[col], type); 

			if (v1 < v2) return -1; 
			else if (v1 > v2) return 1; 
			else return 0; 
		}; 
	}

	function convert(element, type) {
		element = element.innerHTML.replace(/\<[^\<]+\>/g, '');
		switch(type) { 
			case "int": return ((element == '') || !element.match(/\d+/)) ? 0 : parseInt(element.replace(/\s/g, '')); 
			case "float": return ((element == '') || !element.match(/\d+/)) ? 0 : parseFloat(element); 
			default: return (element == '') ? '' : element.toLowerCase();
		} 
	}
	
	function refreshMTable(el){
		f = document.getElementById('Ms');
		fi = f.getElementsByTagName('input');
		
		if(el.name == 'all') {
			for(i=0;i<fi.length;i++){
				fi[i].checked = f.all.checked;
			}
		} else {
			var a = true;
			for(i=0;i<fi.length;i++){
				if(!fi[i].checked && (fi[i].name != 'all')) a = false;;
			}
			if(a) f.all.checked = true; else f.all.checked = false;
		}
		
		var t = document.getElementById('mTable');
		var trs = t.getElementsByTagName('tr');
		var d;
		for(i=0;i<trs.length;i++){
			if(d = trs[i].getAttribute('datam')){
				if(document.getElementById('ms_' + d).checked){
					trs[i].style.display = '';
				} else {
					trs[i].style.display = 'none';
				}
			}
		}
		//alert(el.name);
	}
]]>;


function main(){
	addGlobalStyle(cssStyle);
	addGlobalJs(jScript);
	
	var Ms = new Object();
	var VHosts = new Object();
	
	// 
	var mTable = document.getElementsByTagName('table')[0];
	
	var mHead = document.createElement('thead');
	var mFoot = document.createElement('tfoot');
	
	var trs = mTable.getElementsByTagName('tr'); 
	var tr = trs[0];
	var tds = tr.getElementsByTagName('th');
	
	var rClass = 0;
	for(i=1;i<trs.length;i++) {
		itd = trs[i].getElementsByTagName('td');
		m = itd[3].innerHTML.replace(/\<[^\<]+\>/g, '').replace(/(^\s+)|(\s+$)/g, "");
		v = itd[10].innerHTML.replace(/\<[^\<]+\>/g, '').replace(/(^\s+)|(\s+$)/g, "");
		
		//alert(Ms[m]);
		if(Ms[m] == undefined) Ms[m] = true;
		if(VHosts[v] == undefined) VHosts[v] = true;
		trs[i].setAttribute('datam', m);
		trs[i].setAttribute('datavhost', v);
		trs[i].className = 'row' + rClass;
		rClass = rClass ^ 1;
		
	}
	
	tds[0].setAttribute('onclick', "sort('mTable', 0, 'str', true)"); /* Srv */
	tds[1].setAttribute('onclick', "sort('mTable', 1, 'int', true)"); /* PID */
	tds[2].setAttribute('onclick', "sort('mTable', 2, 'str', true)"); /* Acc */
	tds[3].setAttribute('onclick', "sort('mTable', 3, 'str', true)"); /* M */
	tds[4].setAttribute('onclick', "sort('mTable', 4, 'int', true)"); /* SS */
	tds[5].setAttribute('onclick', "sort('mTable', 5, 'int', true)"); /* Req */
	tds[6].setAttribute('onclick', "sort('mTable', 6, 'float', true)"); /* Conn */
	tds[7].setAttribute('onclick', "sort('mTable', 7, 'float', true)"); /* Child */
	tds[8].setAttribute('onclick', "sort('mTable', 8, 'float', true)"); /* Slot */
	tds[9].setAttribute('onclick', "sort('mTable', 9, 'str', true)"); /* Client */
	tds[10].setAttribute('onclick', "sort('mTable', 10, 'str', true)"); /* VHost */
	tds[11].setAttribute('onclick', "sort('mTable', 11, 'str', true)"); /* Request */
	
	mHead.appendChild(tr);
	mFoot.appendChild(tr.cloneNode(true));
	
	mTable.id = 'mTable';
	mTable.appendChild(mHead);
	mTable.appendChild(mFoot);
	
	var f = document.createElement('form');
	f.id = 'Ms';
	f.className = 'block';
	var h = 'Show:<label><input name="all" type="checkbox" checked="checked" onclick="refreshMTable(this)" />All</label>';
	for(var i in Ms){
		h += ' <label><input name="'+i+'" id="ms_'+i+'"type="checkbox" checked="checked" onclick="refreshMTable(this)" />'+i+'</label> ';
	}
	f.innerHTML = h;
	
	mTable.parentNode.insertBefore(f, mTable);
	
	//
	
	iP = document.getElementsByTagName('p')[0];
	
	data = iP.innerHTML.match(/\<code\>(.)\<\/code\>\<\/b\>"\s([\w\s]+)/g);
	
	var iTable1 = document.createElement('table');
	var iBody1 = document.createElement('tbody');
	iTable1.appendChild(iBody1);
	
	iTable1.id = 'iTable1';
	
	rClass = 0;
	for(i=0;i<data.length;i++) {
		d = data[i].match(/\<code\>(.)\<\/code\>\<\/b\>"\s([\w\s]+)/);
		tr1 = document.createElement('tr');
		th1 = document.createElement('th');
		td1 = document.createElement('td');
		th1.innerHTML = d[1];
		td1.innerHTML = d[2];
		
		tr1.appendChild(th1);
		tr1.appendChild(td1);
		tr1.className = 'row' + rClass;
		iBody1.appendChild(tr1);
		
		rClass = rClass ^ 1;
	}
	
	var iTable2 = document.getElementsByTagName('table')[1];
	iTable2.parentNode.insertBefore(iTable1, iTable2);
	
	iP.parentNode.removeChild(iP);
	
	//
	
	trs = iTable2.getElementsByTagName('tr');
	rClass = 0;
	for(i=0;i<trs.length;i++) {
		trs[i].className = 'row' + rClass;
		rClass = rClass ^ 1;
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addGlobalJs(js) {
    var head, javascript;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    javascript = document.createElement('script');
    javascript.setAttribute('language', 'javascript');
    javascript.innerHTML = js;
    head.appendChild(javascript);
}


main();
