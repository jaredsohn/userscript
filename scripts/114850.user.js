// ==UserScript==
// @name           remove ads on 999.md
// @description    sterge primele anunturi platite de pe 999.md 
// @author         zalmolksis
// @include        http://999.md
// @version        1.0
// ==/UserScript==

//var dataCanvas = getElementById('boardItemList');
//alert(dataCanvas.innerHTML()) 

//alert('test');
function applyChangesTo999(){
log('applyChangesTo999');

if(document.getElementById('boardItemList')==null) {	
	log('inca nu e initializata');return;
}

if(document.getElementById('boardItemList').className=='med_view'){
	///detail view
	var itemsAll = document.getElementById('boardItemList').getElementsByTagName('div');	
	var items = new Array();
	for(var i=0;i<itemsAll.length;i++){	
		try{
			if(itemsAll[i].className=='item'){
			items[items.length]=itemsAll[i];
		}}catch(error){}	
	}
	for( i=0;i<items.length;i++){		
		if(items[i].getElementsByTagName('span').length==1){
			items[i].innerHTML="";
		}
	}
	
}else{

	var tableItems =  document.getElementById('boardItemList').getElementsByTagName('table');
	for(var i=0;i<tableItems.length;i++){	
		if(tableItems[i].getElementsByTagName('td').length==4) {
			//hide
			tableItems[i].style.height=0;
			tableItems[i].innerHTML="";		
	}else{		//do nothing	
	     }
	}
}
}


function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}
//window.onload = function onloadw(){applyChangesTo999();}
//document.ready= function readyw(){ applyChangesTo999();}
document.onchange= function readyw(){ applyChangesTo999();}
