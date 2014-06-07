// ==UserScript==
// @name           VU Add Total Cost for Ships
// @namespace      http://userscripts.org/users/125692
// @description    Adds a total cost to the shipyard for Vast Universe game
// @include        http://www.humugus.com/ds.php/c/shipyard/index/*
// ==/UserScript==
//adds a line with the total cost of the last selected ship design for VU
//kiwimage


(function() {

if (!window.addEventListener) {

    window.addEventListener = function (type, listener, useCapture) {

        attachEvent('on' + type, function() { listener(event) });

    }

}
    //Add one or more CSS style rules to the document
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {
	    return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
    }

addGlobalStyle('span.dblue { color: #0000FF; } ' +  //pure blue
	    'span.dred { color: #FF0000; } ' +          //pure red
	    'span.dyellow { color: #FFFF00; } '+//bright yellow
        'span.dgreen { color: #00FF00; } '+  // pure green
        'span.dgrey { color: #858585; } '+ // greyish?
        'span.ddgrey { color: #555555; } ' //darker grey?
        );


dqrsum=function(e){
    //var table= document.getElementById('prime');//get the table
    //var shipsstrings=table.getAttribute('shipidstringlist');
    //var idstrings=shipsstrings.split(':');
    var shipstring=e.target.id.match(/\d+/);
    var numofships=Number(e.target.value);
    var epercost=Number(document.getElementById('ene'+shipstring).innerHTML)
    var opercost=Number(document.getElementById('org'+shipstring).innerHTML);
    var mpercost=Number(document.getElementById('min'+shipstring).innerHTML);
    var cole=Number(document.getElementById('colene').title);
    var colo=Number(document.getElementById('colorg').title);
    var colm=Number(document.getElementById('colmin').title);
    var colmon=Number(document.getElementById('colmon').title);
    var monpercost=Number(document.getElementById('mon'+shipstring).innerHTML);
    var timecell=document.getElementById('mon'+shipstring).nextElementSibling
    var timepercost=timecell.getAttribute('sorttable_customkey');
    if (!timepercost){
        timepercost=timecell.innerHTML;
        var timematch;
        if ( timepercost.match(/\d+:\d+:\d+:\d+/) ){//       d/h/m/s
            timematch=timepercost.match(/(\d+):(\d+):(\d+):(\d+)/)
            timepercost=86400*Number(timematch[1])+
                        3600*Number(timematch[2])+
                        60*Number(timematch[3])+
                        Number(timematch[4])    
        }
        else if ( timepercost.match(/\d+:\d+:\d+/) ){//       h/m/s
            timematch=timepercost.match(/(\d+):(\d+):(\d+)/)
            timepercost=3600*Number(timematch[1])+
                        60*Number(timematch[2])+
                        Number(timematch[3])    
        }
        else if ( timepercost.match(/\d+:\d+/) ){//       m/s
            timematch=timepercost.match(/(\d+):(\d+)/)
            timepercost=60*Number(timematch[1])+
                        Number(timematch[2])    
        }
        else if (timepercost.match(/\d+/)){//just seconds
            timepercost=Number(timepercost.match(/\d+/))
        }
        else{                            //fubar set to zero
            timepercost=0;
        }
    }
    
    var totalene=epercost*numofships;
    var totalorg=opercost*numofships;
    var totalmin=mpercost*numofships;
    var totalmon=monpercost*numofships;
    var totaltime=Number(timepercost*numofships);
    var totalds='';
    var totalhs='';
    var totalms='';
    var totalss='';
    var fulltotaltime=totaltime;
    //convert time back to hour:min:sec;
//    if (totaltime>86400){
//        totald=Math.floor(totaltime/86400);
//        totaltime=totaltime%86400;
//        totalds=totald+":";
//        if (totald<10){
//           totalds='0'+totalds;
//        }
//        totalhs=totalms='00:';
//        totalss='00 s';
//    }
    if (totaltime>3600){
        totalh=Math.floor(totaltime/3600);
        totaltime=totaltime%3600;
        totalhs=totalh+":";
        if (totalh<10){
            totalhs='0'+totalhs;
        }
        totalms='00:';
        totalss='00 s';
    }
    if (totaltime>60){
        totalm=Math.floor(totaltime/60);
        totaltime=totaltime%60;
        totalms=totalm+":";
        if (totalm<10 ){
            totalms='0'+totalms;
        }
        totalss='00s';
    }
    totalss=Math.round(totaltime) + "s";
    if (Math.round(totaltime)<10 && fulltotaltime>10){
            totalss='0'+totalss;
        }
    totaltimestring=/*totalds+*/totalhs+totalms+totalss;
    
    //set the output strings
    if ( cole<totalene){
        var enecolour="<span class='dred'>"
    }
    else{
        var enecolour="<span class='dgreen'>"
    }
    if (colo<totalorg){
        var orgcolour="<span class='dred'>"
    }
    else{
        var orgcolour="<span class='dgreen'>"
    }

    if (colm<totalmin){
        var mincolour="<span class='dred'>"
    }
    else{
        var mincolour="<span class='dgreen'>"
    }
    if (colmon<totalmon){
        var moncolour="<span class='dred'>"
    }
    else{
        var moncolour="<span class='dgreen'>"
    }
    document.getElementById('totalE').innerHTML=enecolour+totalene+'</span>';
    document.getElementById('totalO').innerHTML=orgcolour+totalorg+'</span>';
    document.getElementById('totalM').innerHTML=mincolour+totalmin+'</span>';
    document.getElementById('total$').innerHTML=moncolour+totalmon+'</span>';
    document.getElementById('totaltime').innerHTML=totaltimestring;
    document.getElementById('totalships').innerHTML=numofships;
}   
//
//                        SETUP
//
//
//

var table= document.getElementById('prime');
 //alter width
if (table.getAttribute('danwidth')){
table.setAttribute('style','width: '+table.getAttribute('danwidth')+'px');
}
else{
var width=table.getAttribute('style').match(/\d+/);//get width of table
table.setAttribute('danwidth',width*1.08)
table.setAttribute('style','width: '+table.getAttribute('danwidth')+'px');
}

var tablefoot=table.lastElementChild;
allboxes = document.evaluate(
    ".//input[@class='qty']",//ffs it needed the leading .
    table,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
//allboxes.snapshotLength
var boxarray = new Array()
for (var i = 0 , targetbox ; targetbox = allboxes.snapshotItem(i);i++){
    boxarray.push( targetbox.id.match(/\d+/) );
    targetbox.addEventListener("change",dqrsum,false)
    targetbox.addEventListener("keyup",dqrsum,false)
}
boxarraystring= boxarray.join(':');
table.setAttribute('shipidstringlist',boxarraystring);//setup variable so can get easy in function
var newElement = document.createElement("tr");//make a row
table.lastElementChild.parentNode.insertBefore(newElement,table.lastElementChild.NextChild)
//tablefoot.innerHTML="<td>TOTAL COST</td><td></td><td id='totalE'></td><td id='totalO'></td><td id='totalM'></td><td //id='total$'></td><td id='totaltime'></td><td id='totalships'></td>"; //setup output
newElement.innerHTML="<td><span class='dblue' align='center'>TOTAL</span></td><td></td>"+
    "<td id='totalE' align='right'></td><td id='totalO' align='right'></td>"+
    "<td id='totalM' align='right'></td><td id='total$' align='right'></td>"+
    "<td id='totaltime' align='right'></td><td id='totalships' align='center'></td>"; //setup output
})();