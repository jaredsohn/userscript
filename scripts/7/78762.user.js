// ==UserScript==
// @name          mhfMonInfo edit
// @namespace     bluelenz@mensakorea.org
// @description	  mhf inven
// @date          June 2010
// @include       *dataninfo/monster/detail.php?code=*
// @enable        true
// ==/UserScript==

(function(){

	var rate = 0.72;
	
	var colsE = document.createElement('col');
	colsE.className = "value";

	var colgroups = document.getElementsByTagName('colgroup');
	var i, j;

	var cols = document.getElementsByTagName('col');

	var colNum;

	colNum = 0;

	for(i = 0;i < 4; i++)
	{
		if(cols[i * 9].className == "name")
			colNum++;
		else
			break;
	}


	for(i = colNum - 1; i >= 0; i--)
	{

		if(cols[i * 9].className == "name")
			cols[i * 9].style.width = 74;

		if(cols[i * 9 + 8].className == "value")
			cols[i * 9 + 8].parentNode.insertBefore(colsE, cols[i * 9 + 8]);

	}


	var divs = document.getElementsByTagName('div');

	var theDiv;

	for(i = 0; i < divs.length; i++)
	{
		if(divs[i].className == "wFree1M tableType1")
		{
			theDiv = divs[i];


			var theTables = theDiv.getElementsByTagName('table');

			var theTheads = theTables[0].getElementsByTagName('thead');


			var lanceTH = document.createElement('th');

			lanceTH.innerHTML = "lance";


			theTheads[0].children[0].insertBefore(lanceTH, theTheads[0].children[0].children[3]);

		
			var theTbodys = theTables[0].getElementsByTagName('tbody');

			var theTRs = theTbodys[0].getElementsByTagName('tr');


			for(j = 0; j < theTRs.length; j++)
			{

				var lanceTD = document.createElement('td');

				/*
				if (parseInt(theTRs[j].children[1].innerHTML) >= parseInt(theTRs[j].children[2].innerHTML))
				{
					lanceTD.innerHTML = parseInt(theTRs[j].children[1].innerHTML)
				}
				else
				{
					lanceTD.innerHTML = parseInt(parseInt(theTRs[j].children[2].innerHTML) * rate);
				}
				*/
				
				lanceTD.innerHTML = parseInt(MAX(parseInt(theTRs[j].children[1].innerHTML), parseInt(theTRs[j].children[2].innerHTML), rate));

				if(lanceTD.innerHTML <= 20)
					lanceTD.className = "red";
				else if(lanceTD.innerHTML >= 80)
					lanceTD.className = "blue";

				theTRs[j].insertBefore(lanceTD, theTRs[j].children[3]);
			
			}

		}

	}

	function MAX(a, b, rate)
	{

		b = b * rate;

		if(a > b)
			return a;
		else
			return b;
	
	}

})();
