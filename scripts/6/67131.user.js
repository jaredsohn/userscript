// ==UserScript==
// @name           VU Add Total Resources
// @namespace      http://userscripts.org/users/125692
// @description    Adds total resources to Intelligence Report pages of Vast Universe game
// @include        http://www.humugus.com/ds.php/espionage/index/*
// ==/UserScript==
//Crudely adds a line to the espionage report page.
//Line has Total Resources, Income and Total Lootable Resources
//Adds Second line with predicted Loot in hour jumps
//adds third line with daily income
//if less than 1 million loot adds fourth line with cycles till colony hits 1 million 
//Quite the cludge.
//last change:
//now it takes a guess at how many hours have passed since the scan and extrapolates from there.
//
//the addglobalstyle function copied from
//MediaTriggerWords.user.js
//	      by John Walker  -- http://www.fourmilab.ch/
//http://www.fourmilab.ch/webtools/greasemonkey/MediaTriggerWords/
//addcommas function from
//http://www.mredkj.com/javascript/nfbasic.html

(function() {
///aDD SYTLES FOR NUMBER HIGHLIGHTING
 
  addGlobalStyle('span.dblue { color: #0000FF; } ' +  //pure blue
	    'span.dred { color: #FF0000; } ' +          //pure red
	    'span.dyellow { color: #FFFF00; } '+//bright yellow
        'span.dgreen { color: #00FF00; } '+  // pure green
        'span.dgrey { color: #858585; } '+ // greyish?
        'span.ddgrey { color: #555555; } ' //darker grey?
        );  // greyish?

 function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}


    //	Add one or more CSS style rules to the document

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

var e1,e2,o1,o2,m1,m2,mon1,mon2,s1,prot,danrow;
var balance,income,availableloot;
var allElements, thisElement; 
var insertstring;
//var ddate = new Date( "Mar, 05 2010 06:00:51");
//var dhours = ddate.getHours();
//var dminutes = ddate.getMinutes();
//var dseconds = ddate.getSeconds();


allElements = document.evaluate(
    "//IMG[@title='energy']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElements.snapshotLength>=2) {
    e1=parseInt(allElements.snapshotItem(0).nextSibling.wholeText)
    e2=parseInt(allElements.snapshotItem(1).nextSibling.wholeText)   
}

allElements = document.evaluate(
    "//IMG[@title='organic']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElements.snapshotLength>=2) {
    o1=parseInt(allElements.snapshotItem(0).nextSibling.wholeText)
    o2=parseInt(allElements.snapshotItem(1).nextSibling.wholeText) 
}

allElements = document.evaluate(
    "//IMG[@title='mineral']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElements.snapshotLength>=2) {
    m1=parseInt(allElements.snapshotItem(0).nextSibling.wholeText)
    m2=parseInt(allElements.snapshotItem(1).nextSibling.wholeText) 
}
allElements = document.evaluate(
    "//IMG[@title='monetary']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElements.snapshotLength>=2) {
    mon1=parseInt(allElements.snapshotItem(0).nextSibling.wholeText)
    mon2=parseInt(allElements.snapshotItem(1).nextSibling.wholeText)   
}

allElements = document.evaluate(
    "//IMG[@title='power']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElements.snapshotLength>=1) {
    s1=allElements.snapshotItem(0).nextSibling.wholeText
    prot=parseInt(s1.match(/[0-9]*$/))//should get the last number
}


balance=e1+o1+m1+mon1;
income=e2+o2+m2+mon2;
availableloot=balance- 4*prot

if (allElements.snapshotLength>=1) {
    danrow=allElements.snapshotItem(0).parentNode.parentNode.nextSibling.nextSibling
    var newElement = document.createElement("tr");
    var newElement2 = document.createElement("tr");
    var newElement3 = document.createElement("tr");
    var newElement4 = document.createElement("tr");

    newElement.id="mageline1"
    newElement2.id="mageline2"
    newElement3.id="mageline3"
    newElement4.id="mageline4"
   
    var sloot;
    var incomecolour;
 
    if (availableloot<1000000){
        danrow.parentNode.insertBefore(newElement4, danrow.nextSibling);
        danrow.nextSibling.innerHTML= '<td align="left" colspan="9"> Est. Time to 1 Million: '
                 + '<span class="dgrey">' + (Math.ceil((1000000-availableloot) / income)) + ' cycles.'  + '</span>' +  '</td>';
    }
    danrow.parentNode.insertBefore(newElement3, danrow.nextSibling);
    danrow.nextSibling.innerHTML= '<td align="left" colspan="9"> Est. Loot Daily: '
                 + '<span class="dgrey">' + addCommas(24*income)   + '</span>' +  '</td>';
 
 //  danrow.parentNode.insertBefore(newElement2, danrow.nextSibling);
 //newElement2.innerHTML = '<td></td><td align="left" colspan="8"> Est. Loot next cycle : '
 //                + '<span class="dgrey">' + (availableloot+income)   + '</span>' + 
 //   ' +2 cyc.: ' + '<span class="dgrey">' + (availableloot+2*income) + '</span>' + 
 //   ' +3 cyc.: ' + '<span class="dgrey">' + (availableloot+3*income) + '</span>' + 
 //   ' +4 cyc.: ' + '<span class="dgrey">' + (availableloot+4*income) + '</span>' + 
 //   ' +5 cyc.: ' + '<span class="dgrey">' + (availableloot+5*income) + '</span>' + 
 //   ' +6 cyc.: ' + '<span class="dgrey">' + (availableloot+6*income) + '</span>' +  '</td>';
 //   danrow.nextSibling.innerHTML= '<td align="left" colspan="9"> Est. Loot next cycle : '
 //                + '<span class="dgrey">' + addCommas(availableloot+income)   + '</span>' + 
 //  + dhours +":"+ dminutes +":"+ dseconds+
 //  ' +2 cyc.: ' + '<span class="dgrey">' + addCommas(availableloot+2*income) + '</span>' + 
 //  ' +3 cyc.: ' + '<span class="dgrey">' + addCommas(availableloot+3*income) + '</span>' + 
 //  ' +4 cyc.: ' + '<span class="dgrey">' + addCommas(availableloot+4*income) + '</span>' + 
 //  ' +5 cyc.: ' + '<span class="dgrey">' + addCommas(availableloot+5*income) + '</span>' + 
 //  ' +6 cyc.: ' + '<span class="dgrey">' + addCommas(availableloot+6*income) + '</span>' +  '</td>';
  
    if (income<0){//change income text colour depending on whether its positive or not
        incomecolour='<span class="dred">';
    }
    else {
        incomecolour='<span class="dgreen">';
    }
    danrow.parentNode.insertBefore(newElement, danrow.nextSibling);
 
    //newElement.innerHTML = '<td align="left" colspan="8">Total Resources : ' + balance + 
    sloot =""+addCommas(availableloot)
    if (availableloot<0){
        sloot= "0 (" + sloot + ")";
    } 
 
    danrow.nextSibling.innerHTML = '<td align="left" colspan="9">Total Resources Scanned : ' + balance + 
        ' Total Income : ' +
        incomecolour + addCommas(income) + '</span>' +  
        ' Total Lootable Resources Scanned : ' + 
        //'<span class="dyellow">' + addCommas(availableloot) + '</span>' +
        '<span class="dyellow">' + sloot + '</span>' +
        '</td>';
    //danrow.parentNode.insertBefore(newElement, danrow.nextSibling);


 }
     //alert("start");
    //this section adds an estimate for the current amount to expect.
    var elementr = document.getElementById('reportstart')
    var scandatetext;
    var scandate; 
    var currElem=elementr.firstElementChild;
    while(currElem.tagName!="FIELDSET"){currElem=currElem.nextSibling;}
    currElem=currElem.firstElementChild;
    currElem=currElem.firstElementChild;
    currElem=currElem.firstElementChild;
    currElem=currElem.nextElementSibling;
    scandatetext=currElem.firstChild.innerHTML;//gets the date of the scan
    //alert(" scandatetext"+ scandatetext);
    var rs=scandatetext.match("^([0-9]*)-([0-9]*)-([0-9]*) ([0-9]*):([0-9]*):([0-9]*)")
    if (rs){
        //year,month,day,hour,min,sec
        scandate= new Date(rs[1], rs[2]-1,rs[3],rs[4],rs[5],rs[6],0)
     //alert(" scandatetext matched"+ scandate);
    }

    if (!(currElem=document.getElementById('mageline4'))){//if this works fine else goto mageline3
         if (!(currElem=document.getElementById('mageline3'))){//if this works fine else goto mageline2
            currElem= document.getElementById('mageline2')
        }
    }
    //alert("currElemid"+currElem.id)
    //thus we are were we need to be to add the line in.
    
    currdate=new Date();
    currdate.setHours(currdate.getHours()+(currdate.getTimezoneOffset()/60-7))//account for humugus timezone
    var diff=currdate-scandate;//millisecs?
    
   diff=diff/(1000*3600)//now in hours since scan
   // diff=diff/(1000*60)//now in minutes
   var hourspassed=Math.floor(diff);
   // var hourspassed=Math.floor(diff/60)
   //var extraminutes=diff-hourspassed;
   //if(scandate.getMinutes()+extraminutes>60){
   //    hourspassed++
   //}
   // alert("hourspassed"+hourspassed)
    var newElement5 = document.createElement("tr");
    newElement5.id="mageline5";
    //alert("id"+newElement5.id)
    currElem.parentNode.insertBefore(newElement5, currElem.nextSibling);
    currElem.nextSibling.innerHTML = '<td align="left" colspan="9"> '+
   '<span class="dgreen" title='+ (Math.round(diff*10000)/10000)  + '>' + hourspassed + '</span>' +
   ' hours passed since scan. If not already looted or spent there should be : ' + 
   '<span class="dyellow">' + addCommas(availableloot+hourspassed*income) + '</span>' +
    // "Current Date:"+currdate+ " ScanDate:"+scandate+
   ' loot available right now.</td>';
   //alert("currElem.nextSiblingid"+currElem.nextSibling.id)
    currElem=currElem.nextSibling;
    var newElement6 = document.createElement("tr");
    newElement6.id="mageline6";
    currElem.parentNode.insertBefore(newElement6, currElem.nextSibling);
    currElem.nextSibling.innerHTML= '<td align="left" colspan="9"> Est. Loot in 1 hour: '
                 + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+1)*income)   + '</span>' + 
    ' +2hrs: ' + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+2)*income) + '</span>' + 
    ' +3hrs: ' + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+3)*income) + '</span>' + 
    ' +4hrs: ' + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+4)*income) + '</span>' + 
    ' +5hrs: ' + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+5)*income) + '</span>' + 
    ' +6hrs: ' + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+6)*income) + '</span>' +  '</td>';
   
})();
// ==UserScript==
// @name           VU Add Total Resources
// @namespace      http://userscripts.org/users/125692
// @description    Adds total resources to Intelligence Report pages of Vast Universe game
// @include        http://www.humugus.com/ds.php/espionage/index/*
// ==/UserScript==
//Crudely adds a line to the espionage report page.
//Line has Total Resources, Income and Total Lootable Resources
//Adds Second line with predicted Loot in hour jumps
//adds third line with daily income
//if less than 1 million loot adds fourth line with cycles till colony hits 1 million 
//Quite the cludge.
//last change:
//now it takes a guess at how many hours have passed since the scan and extrapolates from there.
//now updated for new resource protection structures.
//the addglobalstyle function copied from
//MediaTriggerWords.user.js
//	      by John Walker  -- http://www.fourmilab.ch/
//http://www.fourmilab.ch/webtools/greasemonkey/MediaTriggerWords/
//addcommas function from
//http://www.mredkj.com/javascript/nfbasic.html

(function() {
///aDD SYTLES FOR NUMBER HIGHLIGHTING
 
  addGlobalStyle('span.dblue { color: #0000FF; } ' +  //pure blue
	    'span.dred { color: #FF0000; } ' +          //pure red
	    'span.dyellow { color: #FFFF00; } '+//bright yellow
        'span.dgreen { color: #00FF00; } '+  // pure green
        'span.dgrey { color: #858585; } '+ // greyish?
        'span.ddgrey { color: #555555; } ' //darker grey?
        );  // greyish?

 function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}


    //	Add one or more CSS style rules to the document

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

var e1,e2,o1,o2,m1,m2,mon1,mon2,s1,protr,power,protm,danrow;
var balance,income,availableloot;
var allElements, thisElement; 
var insertstring;
//var ddate = new Date( "Mar, 05 2010 06:00:51");
//var dhours = ddate.getHours();
//var dminutes = ddate.getMinutes();
//var dseconds = ddate.getSeconds();


allElements = document.evaluate(
    "//IMG[@title='energy']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElements.snapshotLength>=2) {
    e1=parseInt(allElements.snapshotItem(0).nextSibling.wholeText)
    e2=parseInt(allElements.snapshotItem(1).nextSibling.wholeText)   
}

allElements = document.evaluate(
    "//IMG[@title='organic']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElements.snapshotLength>=2) {
    o1=parseInt(allElements.snapshotItem(0).nextSibling.wholeText)
    o2=parseInt(allElements.snapshotItem(1).nextSibling.wholeText) 
}

allElements = document.evaluate(
    "//IMG[@title='mineral']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElements.snapshotLength>=2) {
    m1=parseInt(allElements.snapshotItem(0).nextSibling.wholeText)
    m2=parseInt(allElements.snapshotItem(1).nextSibling.wholeText) 
}
allElements = document.evaluate(
    "//IMG[@title='monetary']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElements.snapshotLength>=2) {
    mon1=parseInt(allElements.snapshotItem(0).nextSibling.wholeText)
    mon2=parseInt(allElements.snapshotItem(1).nextSibling.wholeText)   
}

allElements = document.evaluate(
    "//IMG[@title='power']",
    document,
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 
if (allElements.snapshotLength>=1) {
    s1=allElements.snapshotItem(0).nextSibling.wholeText
    var mat=s1.match(/(\d+)\D+(\d+)\D+(\d+)/)//gets attack. want numbers from string numbertextnumbertextnumber
    power=mat[1]//should be colony power remember [0] is the string matched. [1] is the first store section
    protr=mat[2]//should be hard resource prot number
    protm=mat[3]//should be monetary prot number
}


balance=e1+o1+m1+mon1;
//alert("e1:"+e1+" o1:"+o1+" m1:"+m1+" mon1:"+mon1)
//alert("protr:"+protr+" protm:"+protm)
income=e2+o2+m2+mon2;
//availableloot=balance- 4*prot
availableloot=(e1-protr)+(o1-protr)+(m1-protr)+(mon1-protm)
if (allElements.snapshotLength>=1) {
    danrow=allElements.snapshotItem(0).parentNode.parentNode.nextSibling.nextSibling
    var newElement = document.createElement("tr");
    var newElement2 = document.createElement("tr");
    var newElement3 = document.createElement("tr");
    var newElement4 = document.createElement("tr");

    newElement.id="mageline1"
    newElement2.id="mageline2"
    newElement3.id="mageline3"
    newElement4.id="mageline4"
   
    var sloot;
    var incomecolour;
 
    if (availableloot<1000000){
        danrow.parentNode.insertBefore(newElement4, danrow.nextSibling);
        danrow.nextSibling.innerHTML= '<td align="left" colspan="9"> Est. Time to 1 Million: '
                 + '<span class="dgrey">' + (Math.ceil((1000000-availableloot) / income)) + ' cycles.'  + '</span>' +  '</td>';
    }
    danrow.parentNode.insertBefore(newElement3, danrow.nextSibling);
    danrow.nextSibling.innerHTML= '<td align="left" colspan="9"> Est. Loot Daily: '
                 + '<span class="dgrey">' + addCommas(24*income)   + '</span>' +  '</td>';
 
 //  danrow.parentNode.insertBefore(newElement2, danrow.nextSibling);
 //newElement2.innerHTML = '<td></td><td align="left" colspan="8"> Est. Loot next cycle : '
 //                + '<span class="dgrey">' + (availableloot+income)   + '</span>' + 
 //   ' +2 cyc.: ' + '<span class="dgrey">' + (availableloot+2*income) + '</span>' + 
 //   ' +3 cyc.: ' + '<span class="dgrey">' + (availableloot+3*income) + '</span>' + 
 //   ' +4 cyc.: ' + '<span class="dgrey">' + (availableloot+4*income) + '</span>' + 
 //   ' +5 cyc.: ' + '<span class="dgrey">' + (availableloot+5*income) + '</span>' + 
 //   ' +6 cyc.: ' + '<span class="dgrey">' + (availableloot+6*income) + '</span>' +  '</td>';
 //   danrow.nextSibling.innerHTML= '<td align="left" colspan="9"> Est. Loot next cycle : '
 //                + '<span class="dgrey">' + addCommas(availableloot+income)   + '</span>' + 
 //  + dhours +":"+ dminutes +":"+ dseconds+
 //  ' +2 cyc.: ' + '<span class="dgrey">' + addCommas(availableloot+2*income) + '</span>' + 
 //  ' +3 cyc.: ' + '<span class="dgrey">' + addCommas(availableloot+3*income) + '</span>' + 
 //  ' +4 cyc.: ' + '<span class="dgrey">' + addCommas(availableloot+4*income) + '</span>' + 
 //  ' +5 cyc.: ' + '<span class="dgrey">' + addCommas(availableloot+5*income) + '</span>' + 
 //  ' +6 cyc.: ' + '<span class="dgrey">' + addCommas(availableloot+6*income) + '</span>' +  '</td>';
  
    if (income<0){//change income text colour depending on whether its positive or not
        incomecolour='<span class="dred">';
    }
    else {
        incomecolour='<span class="dgreen">';
    }
    danrow.parentNode.insertBefore(newElement, danrow.nextSibling);
 
    //newElement.innerHTML = '<td align="left" colspan="8">Total Resources : ' + balance + 
    sloot =""+addCommas(availableloot)
    if (availableloot<0){
        sloot= "0 (" + sloot + ")";
    } 
 
    danrow.nextSibling.innerHTML = '<td align="left" colspan="9">Total Resources Scanned : ' + balance + 
        ' Total Income : ' +
        incomecolour + addCommas(income) + '</span>' +  
        ' Total Lootable Resources Scanned : ' + 
        //'<span class="dyellow">' + addCommas(availableloot) + '</span>' +
        '<span class="dyellow">' + sloot + '</span>' +
        '</td>';
    //danrow.parentNode.insertBefore(newElement, danrow.nextSibling);


 }
     //alert("start");
    //this section adds an estimate for the current amount to expect.
    var elementr = document.getElementById('reportstart')
    var scandatetext;
    var scandate; 
    var currElem=elementr.firstElementChild;
    while(currElem.tagName!="FIELDSET"){currElem=currElem.nextSibling;}
    currElem=currElem.firstElementChild;
    currElem=currElem.firstElementChild;
    currElem=currElem.firstElementChild;
    currElem=currElem.nextElementSibling;
    scandatetext=currElem.firstChild.innerHTML;//gets the date of the scan
    //alert(" scandatetext"+ scandatetext);
    var rs=scandatetext.match("^([0-9]*)-([0-9]*)-([0-9]*) ([0-9]*):([0-9]*):([0-9]*)")
    if (rs){
        //year,month,day,hour,min,sec
        scandate= new Date(rs[1], rs[2]-1,rs[3],rs[4],rs[5],rs[6],0)
     //alert(" scandatetext matched"+ scandate);
    }

    if (!(currElem=document.getElementById('mageline4'))){//if this works fine else goto mageline3
         if (!(currElem=document.getElementById('mageline3'))){//if this works fine else goto mageline2
            currElem= document.getElementById('mageline2')
        }
    }
    //alert("currElemid"+currElem.id)
    //thus we are were we need to be to add the line in.
    
    currdate=new Date();
    currdate.setHours(currdate.getHours()+(currdate.getTimezoneOffset()/60-7))//account for humugus timezone
    var diff=currdate-scandate;//millisecs?
    
   diff=diff/(1000*3600)//now in hours since scan
   // diff=diff/(1000*60)//now in minutes
   var hourspassed=Math.floor(diff);
   // var hourspassed=Math.floor(diff/60)
   //var extraminutes=diff-hourspassed;
   //if(scandate.getMinutes()+extraminutes>60){
   //    hourspassed++
   //}
   // alert("hourspassed"+hourspassed)
    var newElement5 = document.createElement("tr");
    newElement5.id="mageline5";
    //alert("id"+newElement5.id)
    currElem.parentNode.insertBefore(newElement5, currElem.nextSibling);
    currElem.nextSibling.innerHTML = '<td align="left" colspan="9"> '+
   '<span class="dgreen" title='+ (Math.round(diff*10000)/10000)  + '>' + hourspassed + '</span>' +
   ' hours passed since scan. If not already looted or spent there should be : ' + 
   '<span class="dyellow">' + addCommas(availableloot+hourspassed*income) + '</span>' +
    // "Current Date:"+currdate+ " ScanDate:"+scandate+
   ' loot available right now.</td>';
   //alert("currElem.nextSiblingid"+currElem.nextSibling.id)
    currElem=currElem.nextSibling;
    var newElement6 = document.createElement("tr");
    newElement6.id="mageline6";
    currElem.parentNode.insertBefore(newElement6, currElem.nextSibling);
    currElem.nextSibling.innerHTML= '<td align="left" colspan="9"> Est. Loot in 1 hour: '
                 + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+1)*income)   + '</span>' + 
    ' +2hrs: ' + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+2)*income) + '</span>' + 
    ' +3hrs: ' + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+3)*income) + '</span>' + 
    ' +4hrs: ' + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+4)*income) + '</span>' + 
    ' +5hrs: ' + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+5)*income) + '</span>' + 
    ' +6hrs: ' + '<span class="dgrey">' + addCommas(availableloot+(hourspassed+6)*income) + '</span>' +  '</td>';
   
})();
