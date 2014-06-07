// ==UserScript==
// @name          Travian Angriffs-Berichte
// @author        DuckRain
// @description	  Zusätzliche Informationen in Angriffsberichten
// @include       http://*.travian.*/berichte.php*
// @include       http://travian.org/berichte.php*
// @exclude       http://forum.travian.*
// ==/UserScript==

(function () {


	function travianAngriffReportCalc(){	
	
		var Unit1Image,allRows, thisRow;
		Unit1Image = document.evaluate("//td[@class='report_detail']/table[1]/tbody[1]/tr[1]/td[2]/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		//GM_log("Unit 1: "+Unit1Image.snapshotItem(0).title);
		var capacities = new Array();
				
		switch (Unit1Image.snapshotItem(0).title) {
			case 'Phalanx':
				capacities[0]=30;	// Phalanx
				capacities[1]=45;	// Schwertkämpfer
				capacities[2]=0;	// Späher
				capacities[3]=75;	// Theutates Blitz
				capacities[4]=35;	// Druidenreiter
				capacities[5]=65;	// Heduaner
				break;
			case 'Legionär':
				capacities[0]=40;	// Legionär
				capacities[1]=20;	// Prätorianer
				capacities[2]=50;	// Imperianer
				capacities[3]=0;	// Equites Legati
				capacities[4]=100;	// Equites Imperatoris
				capacities[5]=70;	// Equites Caesaris
				break;
			case 'Keulenschwinger':
				capacities[0]=60;	// Keulenschwinger
				capacities[1]=40;	// Speerkämpfer
				capacities[2]=50;	// Axtkämpfer
				capacities[3]=0;	// Kundschafter
				capacities[4]=110;	// Paladin
				capacities[5]=80;	// Teutonenreiter
				break;
		}
		capacities[6]=0;	// Ramme
		capacities[7]=0;	// Katapult
		capacities[8]=0;	// Senator/Stammesführer/Häuptling
		capacities[9]=1600;	// Siedler
		capacities[10]=0;	// Held
			
		//alert(Unit1Image.snapshotItem(0));
	
		var capacity=0;
		allRows = document.evaluate("//th[text()='Einheiten']/../td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allRows.snapshotLength && i <11; i++) {
			capacity+=allRows.snapshotItem(i).innerHTML*capacities[i];
			// do something with thisRow
			//GM_log('Row: '+allRows.snapshotItem(i).innerHTML+" -> "+allRows.snapshotItem(i).innerHTML*capacities[i]);
		}
		//GM_log('Capacity: '+capacity);
		
		var beute=0;
		beuteRow = document.evaluate("//div[@class='goods']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		var text = beuteRow.snapshotItem(0).innerHTML;
		for (i=1;i<=4;i++)
		{	
			text=text.replace(/<img [^>]*>/, "");			
		}
		//GM_log('Orig Text: '+text);
		for (i=1;i<=4;i++)
		{	
			pos=text.indexOf("|");
			if (pos>-1)
			{
				num=text.substr(0,pos)*1;
				text=text.substr(pos+1);
			}
			else
				num=text*1;
				
			//GM_log('Num: '+num);
			beute+=num;
			//GM_log('Text: '+text);
		}
		//GM_log('Beute: '+beute);
		
		beuteRow.snapshotItem(0).innerHTML=beute+"/"+capacity+" - "+beuteRow.snapshotItem(0).innerHTML;
	
	}

	travianAngriffReportCalc();

})();