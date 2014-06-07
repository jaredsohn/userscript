// ==UserScript==
// @name           TSPatcher2
// @namespace      NameSpace
// @description    TSPatcher2
// @include        http://192.168.100.45/time/*
// ==/UserScript==

function onScrollhandler()
{
	document.title = 'scrolled to ' + window.pageYOffset;
	
	var mybody = document.getElementsByTagName("body")[0];
	var gridObj = document.getElementById('SheetGrid');
 	var tableHeaderClone = gridObj.getElementsByTagName('tr')[0].cloneNode(true);
 	
	//showFixedHeader(mybody, gridObj, tableHeaderClone);
	var fixedDivElem = document.getElementById('fixedDiv');
	
	
	var tableOffsetTop = gridObj.offsetTop;
 	var currPageYOffset = window.pageYOffset;
 	
 	if(currPageYOffset > tableOffsetTop){
 		if(fixedDivElem != null){
 			fixedDivElem.style.display = 'block';
 		}
 	}
 	
 	if(currPageYOffset <= tableOffsetTop){
 		if(fixedDivElem != null){
 			fixedDivElem.style.display = 'none';		
 		}
 	}

}

function searchTextbox(p_body)
{
	var textBoxes = p_body.getElementsByTagName('input');
	
	for(i = 0; i < textBoxes.length; i++){
		var aaa = textBoxes[i];
		
		if(textBoxes[i].className == 'workweeksel'){
			ScrollToElement(textBoxes[i]);
			break;
		}
	
	}
}

function ScrollToElement(theElement){

  var selectedPosX = 0;
  var selectedPosY = 0;
              
  while(theElement != null){
    selectedPosX += theElement.offsetLeft;
    selectedPosY += theElement.offsetTop;
    theElement = theElement.offsetParent;
  }
                        		      
 window.scrollTo(selectedPosX,selectedPosY - 50);

}

function showFixedHeader(t_body, t_table, t_tableRow){

	var myTableRow = t_tableRow;

	var fixedDiv = document.createElement('div');
	fixedDiv.setAttribute('style','position:fixed;top:0px;margin:0px;padding:0px;display:none;');
	fixedDiv.setAttribute('id','fixedDiv');
	
	var mytable     = document.createElement("table");
	
	for(i=0; i < t_table.attributes.length; i++){
		if(t_table.attributes[i].nodeName != 'id'){
			mytable.setAttribute(t_table.attributes[i].nodeName, t_table.attributes[i].nodeValue);
		}
	}
	
	var mytablebody = document.createElement("tbody");
	
	myTableRow.style.backgroundColor = '#F0F0F0';
	myTableRow.style.color = '#000';
	
	mytablebody.appendChild(myTableRow);
	mytable.appendChild(mytablebody);
	fixedDiv.appendChild(mytable);
	t_body.appendChild(fixedDiv);
}

function applyTableCellWidth(tableElem){
	tableElem.rows[0].cells[0].style.width = '95px';
	tableElem.rows[0].cells[1].style.width = '135px';
	tableElem.rows[0].cells[2].style.width = '255px';
	tableElem.rows[0].cells[3].style.width = '45px';
	tableElem.rows[0].cells[4].style.width = '45px';
	tableElem.rows[0].cells[5].style.width = '45px';
	tableElem.rows[0].cells[6].style.width = '45px';
	tableElem.rows[0].cells[7].style.width = '45px';
	tableElem.rows[0].cells[8].style.width = '45px';
	tableElem.rows[0].cells[9].style.width = '45px';
	tableElem.rows[0].cells[10].style.width = '80px';
	
	tableElem.rows[0].cells[11].innerHTML = '---';
	tableElem.rows[0].cells[12].innerHTML = '---';
	tableElem.rows[0].cells[13].innerHTML = '---';
	
	tableElem.rows[0].cells[11].style.width = '35px';
	tableElem.rows[0].cells[12].style.width = '100px';
	tableElem.rows[0].cells[13].style.width = '65px';
}

function improveGrid()
{
	window.onscroll = onScrollHandler;
	
	var mybody = document.getElementsByTagName("body")[0];
	mybody.setAttribute('style','margin:25px 10px 10px 10px;padding:0px;');
	
	var contentTable = mybody.getElementsByTagName('table')[0];
	contentTable.setAttribute('cellspacing','0');
	contentTable.setAttribute('cellpadding','0');
	contentTable.setAttribute('border','0');
	//contentTable.setAttribute('style','border-collapse:collapse;margin:0px;padding:0px;')
	
	var frm = document.getElementById('form1');
	var frmTbl = frm.getElementsByTagName('table')[0];
	frmTbl.style.width = '';
	
	var gridObj = document.getElementById('SheetGrid');
	gridObj.style.width = '';
	//gridObj.style.border = '1px solid #afafaf'
	
	for(i = 0; i < gridObj.rows.length; i++){
		for(j = 0; j < gridObj.rows[i].cells.length; j++){
			gridObj.rows[i].cells[j].style.width = '';
			
			if(gridObj.rows[i].cells[j].style.color != 'Red'){
				gridObj.rows[i].cells[j].style.color = ''
			}
		}
	}
	
	applyTableCellWidth(gridObj);
	
	// if(gridObj != null){
	// var root=gridObj.getElementsByTagName('tr')[0].parentNode;//the TBODY
	var clone=gridObj.getElementsByTagName('tr')[0].cloneNode(true);//the clone of the first row
	// root.appendChild(clone);//appends the clone
	// }
	showFixedHeader(mybody, gridObj, clone);
	searchTextbox(mybody);
}

improveGrid();