// ==UserScript==
// @name           VU add fleet eta
// @namespace      http://userscripts.org/users/125692
// @description    adds fleet ETA in server time
// @include        http://www.humugus.com/ds.php/colony/index/*
// ==/UserScript==
function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
allTables = document.evaluate(
        "//table",
        document,
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null); 

        currdate=new Date();
        var offsetms=currdate.getTimezoneOffset()*60*1000 //to get UTC?
        offsetms-=(7*3600*1000)//compensate for server 7*3600*1000
        var offsetdate=new Date(currdate.valueOf()+offsetms)//hum server time or it should be. 
        //dunno if server is obeying Daylight savings though 
        var offsetdatems=offsetdate.valueOf();//do this once not manytimes
 
var numtablesfound=allTables.snapshotLength;
if (!document.getElementById('danetaheader') && numtablesfound>=4){//probably a fleet
    var targettable=allTables.snapshotItem(numtablesfound-1)//last table found is probably the one we want
    var targettableheader=targettable.firstElementChild
    var targettableheaderrow=targettableheader.firstElementChild
    
    if (targettableheaderrow.firstElementChild.innerHTML.match(/Fleet/)){//the table we want 
        //add new cell to end of this row
        var targettableheadercell=targettableheaderrow.lastElementChild
        var newcell= targettableheadercell.cloneNode(false)
        targettableheaderrow.insertBefore(newcell, targettableheaderrow.lastElementChild);
        newcell.innerHTML='<img width="16" border="0" src="http://www.humugus.com/public/images/icons/16/clock.png"'+
        'title="Server Time ETA" alt="Server Time ETA" style="vertical-align: middle; width: 16px; height: 16px;">'
        newcell.id='danetaheader'
        //for each row in the body make a new cell.
        var targettablebody=targettableheader.nextElementSibling;
        var allrows = document.evaluate(
            ".//tr",//ffs it needed the leading .
            targettablebody,
            null, 
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null); 
        var tempcell;
        var etadate,etah,etam,etas,datenum,targetrow;
        for (var i = 0 , targetrow ; targetrow = allrows.snapshotItem(i);i++){
            var targetcell=targetrow.lastElementChild
            //tempcell= targetcell.cloneNode(true)
            tempcell = document.createElement("td");
            var targetcellspan=targetcell.firstElementChild
            if (!targetcellspan.title==""){//there is a title so assume a fleet inbound.
               //alert("bravo")
               datenum=offsetdatems+ 1000*Number(targetcellspan.title)
               etadate=new Date(datenum)     
               etah=etadate.getHours();
               etam=etadate.getMinutes();
               etas=etadate.getSeconds();
               // add a zero in front of numbers<10
               etam=checkTime(etam);
               etas=checkTime(etas);
               tempcell.innerHTML='<span>'+etah+":"+etam+":"+etas+'</span.>';
            }
            targetrow.insertBefore(tempcell, targetrow.lastElementChild);
        }
    }
}