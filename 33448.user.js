// ==UserScript==
// @name          BigSweeps Custom Features
// @description   10 September 2008 - Various enhancements for BigSweeps.com
// @namespace     http://userscripts.org/scripts/show/33448
// @include       http://www.bigsweeps.com/sweeps_mysweepsgrid.cfm*
// ==/UserScript==

/*///////////////////
// Version History //

    10 September 2008 - Initial release: Forces My List links to open in tabs
    
/**/


function openSelecteds(x) {
	var t = document.applets.sweepsGrid;
	if(x == 'a') {			// get all
		var sels = t.getAllItemIds(",");	
	} else {				// get selected rows
		var sels = t.getSelectedItemIds(",");	
	}
	
	//alert(sels)
	if(sels === '') {
		alert("No Rows were selected to be opened. You must select at least one row to open an entry window.");
	} else {
		var selRowIdArr = sels.split(",");	
		var j = 0;
		for (var i = 0; i <= selRowIdArr.length-1; ++i) {
			var ud = t.GetUserData(selRowIdArr[i]);
			var c = t.cells(selRowIdArr[i],1);
			var f = t.cells(selRowIdArr[i],0);
			var spon = c.getValue();
			//alert(spon);
			j = j + 2;	
      enterwin = window.open(ud,'_blank');
			var opencolor = '#FFFF00';
			f.setBgColor(opencolor);
		}
	}
}

function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}
 embedFunction(openSelecteds); 