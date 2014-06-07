// ==UserScript==
// @name          Finance Hide Open Positions
// @description    Hides closed positions in in Google Finance
// @include        http://www.google.com/finance/portfolio?action=view*
// @include        http://www.google.tld/finance/portfolio?action=view*
// @include        https://www.google.tld/finance/portfolio?action=view*
// ==/UserScript==



timer = setInterval(testForTable,100);

function testForTable(){
	if (document.getElementsByClassName('gf-table')[0] != undefined){
	   hideClosedPositions();
	   clearInterval(timer);
	}	
}
function hideClosedPositions(){
	var FinanceTable = document.getElementsByClassName('gf-table')[0];
	if(typeof(FinanceTable) != "undefined" && typeof(FinanceTable.rows) != "undefined"){
	    for(i=0;i<FinanceTable.rows.length;i++){
        	if(typeof(FinanceTable.rows[i]) != "undefined" && typeof(FinanceTable.rows[i].cells[5]) != "undefined" && FinanceTable.rows[i].cells[5].innerHTML == "0.00 (closed)"){
             FinanceTable.rows[i].style.display="none"
       	 }
    	}
	}
}