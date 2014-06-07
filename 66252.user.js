// ==UserScript==
// @name		Fuelly Partial Fillups
// @namespace	http://userscripts.org/users/126534
// @description	Calculate the MPG for the first full fillup after a partial
// @include		http://*fuelly.com*/driver/*/*
// @exclude
// ==/UserScript==

if (window.location.href.indexOf("/log")==window.location.href.length-4)
	detailed();
else
	overview();

// Test partial: http://www.fuelly.com/driver/helios/eclipse/log
// Test missed: http://www.fuelly.com/driver/piouspunk23/metro/log
function detailed()
{
	// Find all of the fillup cells
	allFills = document.evaluate("//div[contains(@class, 'copy')]/table/tbody/tr[count(td)=5]",
						document, 
						null, 
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
						null);
						
	allComments = document.evaluate("//div[contains(@class, 'copy')]/span[contains(@class, 'smallcopy')]",
						document, 
						null, 
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
						null);
						
	var sumgallons=0;
	var lastmiles=0;
	var summiles=0;
	var firstcell=1;
	for(var i=allFills.snapshotLength-1; i >=0; i-- ){
		thisFill = allFills.snapshotItem(i);
		thisComment = allComments.snapshotItem(i);
		
		cells=thisFill.getElementsByTagName('td');
		
		milescell=cells[0].getElementsByTagName('div');
		galloncell=cells[1].getElementsByTagName('div');
		mpgcell=cells[4].getElementsByTagName('div');
		
		if (milescell.length!=2 || galloncell.length!=2 || mpgcell.length!=2)
		{
			continue;
		}
		
		var curmiles=parseFloat(milescell[1].innerHTML);
		var mode=milescell[0].innerHTML;

		if (mpgcell[1].innerHTML=="0.0" && thisComment.innerHTML.indexOf('partial')==-1 && thisComment.innerHTML.indexOf('missed')==-1 && firstcell==0)		// first fillup after partial
		{
			sumgallons+=parseFloat(galloncell[1].innerHTML);
			
			if (mode=="Odometer")
				mpgcell[1].innerHTML=((curmiles-lastmiles)/sumgallons).toFixed(1)+"*";
			else
			{
				summiles+=curmiles;
				mpgcell[1].innerHTML=(summiles/sumgallons).toFixed(1)+"*";
			}
			lastmiles=curmiles;
			sumgallons=0;
		}
		
		if (thisComment.innerHTML.indexOf('partial')!=-1)	// partial fillup
		{
			sumgallons+=parseFloat(galloncell[1].innerHTML);
			if (mode=="Miles")
				summiles+=curmiles;
		}
		else
		{
			summiles=0;
			if (mode=="Odometer")
				lastmiles=curmiles;
		}
		firstcell=0;
	}
}

// Test partial: http://www.fuelly.com/driver/helios/eclipse
// Test missed: http://www.fuelly.com/driver/piouspunk23/metro
function overview()
{
	// Find all of the fillup cells
	allFills = document.evaluate("//div[contains(@class, 'col1')]/table/tbody/tr[count(td)=6 or count(td)=7]",
						document, 
						null, 
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
						null);
						
	var sumgallons=0;
	var summiles=0;
	var curmiles=0;
	var curgallons=0;
	var lastunk;
	for(var i=allFills.snapshotLength-1; i >=0; i-- ){
		thisFill = allFills.snapshotItem(i);
		cells=thisFill.getElementsByTagName('td');
		curmiles=parseFloat(cells[1].innerHTML);
		curgallons=parseFloat(cells[2].innerHTML);
		GM_log(cells[0]);
		if (cells[4].innerHTML=="-" && cells[1].innerHTML!="-")
		{
			summiles+=curmiles;
			sumgallons+=curgallons;
			lastunk=cells[4];
		}
		if (cells[4].innerHTML!="-" && sumgallons>0)
		{
			lastunk.innerHTML=(summiles/sumgallons).toFixed(1)+"*";
			summiles=0;
			sumgallons=0;
		}
	}
	if (summiles!=0 && summiles>curmiles+1)		// we found the last cell, and it isn't the partial
		lastunk.innerHTML=(summiles/sumgallons).toFixed(1)+"*";
}

