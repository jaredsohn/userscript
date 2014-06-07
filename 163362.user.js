// ==UserScript==
// @name          Hide Closed Positions and Add Cost price column
// @namespace     http://userscripts.org  
// @description    Hides closed positions in Google Finance and adds a useful cost price column
// @include        http://www.google.com/finance/portfolio?action=view*
// @include        http://www.google.tld/finance/portfolio?action=view*
// @include        https://www.google.tld/finance/portfolio?action=view*
// @version        1.2
// @author         NWadwalkar 
// ==/UserScript==
// change history
// Ver 1.2 - fixed the width of cost price column to 118px;
// Ver 1.1 - fixed issue with loading of performance chart
// Ver 1   - Initial version
var FinanceTable = document.getElementsByClassName('gf-table')[0];
if(typeof(FinanceTable) != "undefined" && typeof(FinanceTable.tBodies) != "undefined"){
    hideClosed (FinanceTable);
    addCPColumn (FinanceTable);
};
document.addEventListener('DOMNodeInserted', function(e) {   
    // check if gf-table is what's inserted.
    if (e.target.className=='gf-table') {   
        hideClosed (e.target);
        //addCPColumn (e.target);
    };
    // addCPColumn caused perf chart to not load, hence moved under here
    if (e.target.id=='chartElement'){
        var FinanceTable = document.getElementsByClassName('gf-table')[0];
        addCPColumn (FinanceTable);
    };
    return;
}, false);

function hideClosed(FinanceTable){  
    for(i=0;i<FinanceTable.tBodies.length;i++){
        for(j=0;j<FinanceTable.tBodies[i].rows.length;j++){
            if(typeof(FinanceTable.tBodies[i].rows[j]) != "undefined" && typeof(FinanceTable.tBodies[i].rows[j].cells[5]) != "undefined" && FinanceTable.tBodies[i].rows[j].cells[5].innerHTML == "0.00 (closed)"){
                FinanceTable.tBodies[i].style.display = 'none';
            }
        }
    }
}

function addCPColumn (FinanceTable){
    if(typeof(FinanceTable) != "undefined" && typeof(FinanceTable.rows) != "undefined"){
        if(typeof(FinanceTable.rows[0].cells[6]) != "undefined" && FinanceTable.rows[0].cells[6].firstChild.innerHTML == "Cost basis"){
                var x=document.createElement('th');
                var y=FinanceTable.rows[0].cells[6];
                x.style.width="118px";
                x.innerHTML="Avg. Cost / Shr";
                FinanceTable.rows[0].insertBefore(x,y);
                for(i=1;i<FinanceTable.rows.length;i++){
                    if(typeof(FinanceTable.rows[i]) != "undefined" && FinanceTable.rows[i].className!="cash" && FinanceTable.rows[i].className!="hilite portfolio-value-row" && typeof(FinanceTable.rows[i].cells[5]) != "undefined" && FinanceTable.rows[i].cells[5].innerHTML != "0.00 (closed)"){
                        var cp = parseFloat(FinanceTable.rows[i].cells[6].innerHTML.replace(',',''),10)/parseFloat(FinanceTable.rows[i].cells[5].innerHTML,10)
                        var x=FinanceTable.rows[i].insertCell(6);
                        x.innerHTML=roundToTwo(cp);
                        x.className="pf-table-cell rgt";
                    }
                }
                //for(i=0;j<FinanceTable.tFoot.rows.length;i++){
                    var c = FinanceTable.tFoot.rows[0].insertCell(4);
                    c.className="no-border";
                    FinanceTable.tFoot.rows[3].insertCell(4);
                //}
                
            }
        }
}

function roundToTwo(value) {
    return(Math.round(value * 100) / 100);
}