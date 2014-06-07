// ==UserScript==
// @name          T-Mobile Bill Analiser
// @namespace      http://oldarney.com/
// @description	  Lets you analize your bill in a more intuitive fashion.
// @include       https://ebill.t-mobile.com/myTMobile/onPrintBill.do
// @include       */onPrintBill.do*
// ==/UserScript==
var GlobalArchive;

String.prototype.trim = function(){ return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '')};

Array.prototype.find = function(searchStr) {
  var returnArray = false;
  for (i=0; i<this.length; i++) {
    if (typeof(searchStr) == 'function') {
      if (searchStr.test(this[i])) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    } else {
      if (this[i]===searchStr) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    }
  }
  return returnArray;
};


function callbackFunc(a,b){

	if(a[1] == b[1]){
		return (a[1] < b[1]) ? -1 : 1;
	}

	return (a[1]> b[1]) ? -1 : 1;
}


Array.prototype.findTwoD = function(searchStr) {
var returnArray = false;
var i;
	for(ri=0; ri<this.length; ri++){
		for (i=0; i<this[ri].length; i++) {
			if (typeof(searchStr) == 'function') {
				if (searchStr.test(this[ri][i])) {
					if (!returnArray) {
						returnArray = [];
					}
					returnArray[returnArray.length] = [];
					returnArray[returnArray.length-1][0]=ri;
					returnArray[returnArray.length-1][1]=i;
				}
			} else {
				if (this[ri][i]===searchStr) {
					if (!returnArray) {
						returnArray = [];
					}
					returnArray[returnArray.length] = [];
					returnArray[returnArray.length-1][0]=ri;
					returnArray[returnArray.length-1][1]=i;
				}
			}
		}
	}
	return returnArray;
};

var TotalMinutes;
var tabletags = document.getElementsByTagName('table');
var MonthlyServ = new Array;
for(i=0;i<tabletags.length;i++){
	if(tabletags[i].getAttribute('id') == 'SvcPlnTransTable'){
		MonthlyServ.push(tabletags[i]);
	}
}

function addMins(mintable){
	var our5mins=0;
	var i;
	for(i=0; i<mintable.length; i++){
		our5mins=mintable[i][1]+our5mins;
	}
	return our5mins;
}

function MinuteConsumed(tbindex) {
	var allTableEntries=MonthlyServ[tbindex].getElementsByTagName("tr"); 
	var AllEntryCells;
	var MonthlyPlanMinsCons = 0;
	var DataArchive = [];
	var DA;
	var i;
	for (i=0; i<allTableEntries.length; i++) {
		//unsafeWindow.console.count(i);
		//throw new Error('Passage Perplxion');
		//Pick out the tags with our class name 
		if (allTableEntries[i].className=="data_row") {
			AllEntryCells=allTableEntries[i].getElementsByTagName("td"); 
			for (i1=0; i1<AllEntryCells.length; i1++) {
				if (AllEntryCells[i1].className=="mst_callDestination" && DataArchive.findTwoD(AllEntryCells[i1].innerHTML.replace('&nbsp;',"")) == false && AllEntryCells[i1].innerHTML.replace('&nbsp;',"").trim() != "") {
					DataArchive.push([]);
					//document.writeln('"'+AllEntryCells[i1].innerHTML+'"');
					DataArchive[DataArchive.length-1][0] = AllEntryCells[i1].innerHTML.replace('&nbsp;',"");
				}
				if (AllEntryCells[i1].className=="mst_minutes"  && !isNaN(parseInt(AllEntryCells[i1].innerHTML))) {
					DA=DataArchive[DataArchive.findTwoD(AllEntryCells[1].innerHTML.replace('&nbsp;',""))[0][0]][1]*1 || 0;
					DA = parseInt(AllEntryCells[i1].innerHTML)+DA;
					//throw(DA);
					DataArchive[DataArchive.findTwoD(AllEntryCells[1].innerHTML.replace('&nbsp;',""))[0][0]][1] = DA;
				}
			}
			//unsafeWindow.console.log("Mother Length "+allTableEntries.length+"; progeny length "+AllEntryCells.length);
		}
	}
	DataArchive.push(["Total",addMins(DataArchive)]);
	DataArchive.push(["Possible MyFaves",addMins(DataArchive.slice(0,5).sort(callbackFunc))]);
	DataArchive.sort(callbackFunc);
	return DataArchive;
};

function JoinDuplicates(TwoDA){
	var DataArchive = [];
	var DA;
	var i;
	for(i=0; i<TwoDA.length; i++){
		if (DataArchive.findTwoD(TwoDA[i][0]) == false) {
			DataArchive.push([]);
			DataArchive[DataArchive.length-1][0] = TwoDA[i][0];
			//unsafeWindow.console.log(" TwoDA entering value "+DataArchive.length);
		}
		DA=DataArchive[DataArchive.findTwoD(TwoDA[i][0])[0][0]][1]*1 || 0;
		DA = TwoDA[i][1]+DA;
		DataArchive[DataArchive.findTwoD(TwoDA[i][0])[0][0]][1] = DA;
	}
	return DataArchive;
}

function parseSpendage(TwoDArray, Title) {
	document.writeln('<table width="30%">');
	document.writeln("<tbody>");
	document.writeln('<tr><td colspan="9"><b>'+Title+'</b></td></tr><tr><td align="left" style="width: 12%;"><b>Destination</b></td><td align="right" style="width: 12%;"><b>Minutesor Messages</b></td></tr><tr><td style="width: 100%; height: 5px;" colspan="6"><hr width="100%"/></td></tr>');
	for (i=0; i<TwoDArray.length; i++) {
		document.writeln('<tr>');
		document.writeln('<td>'+TwoDArray[i][0]+'</td>');
		document.writeln('<td>'+TwoDArray[i][1]+'</td>');
		document.writeln('</tr>');
	}
	document.writeln('</tbody>');
	document.writeln('</table>');
}
//document.open();
//MinuteConsumed(1);

GlobalArchive=JoinDuplicates(MinuteConsumed(0).concat(MinuteConsumed(1)));
parseSpendage(GlobalArchive,"Total monthly transactions");
parseSpendage(MinuteConsumed(0),"Monthly service transactions");
parseSpendage(MinuteConsumed(1),"Monthly FlexAccount transactions");
//document.close();
//FlexAccMinsConsumed();