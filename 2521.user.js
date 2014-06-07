// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey/
// @name          Web Sudoku Popup Numbers
// @description   Provides a list of numbers when you click on a square, so you can play with just a mouse. http://www.websudoku.com/ 
// @include       http://*.websudoku.com/*
// @version       0.4
// @GM_version    0.6.4
// @FF_version    1.5
// ==/UserScript==


function addGlobalStyle(css) { //found at http://diveintogreasemonkey.org/patterns/add-css.html
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var styles = 'a.selector:hover {background:blue !important;color:#fff;text-decoration:none;} ';
styles += 'a.selector {font-size:12pt;font-family:courier,monospaced;padding-top:1px;padding-bottom:1px;padding-left:4px;padding-right:5px}';
styles += 'table.selectorTable {width:4em;height:4em;text-align:center}';

addGlobalStyle(styles);

GM_setValue('id','');
GM_setValue('innerHTML','');
GM_setValue('value','');

function showNumbers(id){
     var square = document.getElementById(id);
     var readOnly = square.readOnly;
     if(!readOnly){
     	GM_setValue('id',id);
     	GM_setValue('innerHTML',square.parentNode.innerHTML);
     	(square.value != '') ? GM_setValue('value',square.value) : GM_setValue('value','');
     	var selector = '<table id="'+GM_getValue('id')+'" class="selectorTable">';
           	selector += '<tr><td><a class="selector"  href="javascript:;">1</a></td>';
           	selector += '<td><a class="selector"  href="javascript:;">2</a></td>';
           	selector += '<td><a class="selector"  href="javascript:;">3</a></td></tr>';
           	selector += '<tr><td><a class="selector"  href="javascript:;">4</a></td>';
           	selector += '<td><a class="selector"  href="javascript:;">5</a></td>';
           	selector += '<td><a class="selector"  href="javascript:;">6</a></td></tr>';
           	selector += '<tr><td><a class="selector"  href="javascript:;">7</a></td>';
           	selector += '<td><a class="selector"  href="javascript:;">8</a></td>';
           	selector += '<td><a class="selector"  href="javascript:;">9</a></td></tr>';
           	selector += '<tr><td colspan="3"><a class="selector"  href="javascript:;">Clear</a></td></tr>';           	
           	selector += '</table>';	     	
		square.parentNode.innerHTML = selector;
		var squareSelector = document.getElementById(id);
		var squareSelectorLinks = squareSelector.getElementsByTagName('a');
		for(i=0;i<9;i++){
			squareSelectorLinks[i].addEventListener('click',hideNumbers,false);
			if(squareSelectorLinks[i].innerHTML == GM_getValue('value')){ 
				squareSelectorLinks[i].setAttribute('style','color:white;background:red;');				
			}
		}
     }
}

function hideNumbers(e){
	var id = GM_getValue('id');
	if(id){
		var selector,tempValue,square;
		selector = document.getElementById(id);
		e.target.className=='selector' ? tempValue = e.target.innerHTML : tempValue = GM_getValue('value');
		selector.parentNode.innerHTML = GM_getValue('innerHTML');
		square = document.getElementById(id);
		tempValue=='Clear' ? square.value='' : square.value=tempValue;
		GM_setValue('id','');
		GM_setValue('innerHTML','');
		GM_setValue('value','');
	}
}


function clicky(e){
	if(e.target.id && GM_getValue('id') != e.target.id){
		hideNumbers(e);
		showNumbers(e.target.id);
	}
	else{
		hideNumbers(e);
	}
}

document.addEventListener('click',clicky,false);