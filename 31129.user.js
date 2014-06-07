// ==UserScript==
// @name           Arto Opslagstavle Standardbesked
// @namespace      http://www.mathemaniac.org
// @description    Lader dig gemme en standardbesked på Opslagstavlen
// @include        http://arto.tld/section/user/common/board.aspx
// @include        http://*.arto.tld/section/user/common/board.aspx
// @version	1.0.1
// ==/UserScript==

(function() { // start script scope
	initiatePage(true); // we need to recycle later :)
})(); // end script scope

String.prototype.repeat = function(l){
	return new Array(l+1).join(this);
};

function initiatePage(firstRun) {
	if (!firstRun) { // delete the old buttons
		var bi = document.evaluate("//input[contains(@class,'aos_btn_mmo')]",document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
		var ba = new Array();
		var b;
		while (b = bi.iterateNext()) { ba.push(b); }
		for each (b in ba) { b.parentNode.removeChild(b); }
	}

	var overskrift = document.getElementById('ctl00_ctl00_Main_Main_ctl00_TitleTextBox');
	var tekstboks = document.getElementById('ctl00_ctl00_Main_Main_ctl00_DescriptionTextBox');
	var sendknap = document.getElementById('ctl00_ctl00_Main_Main_ctl00_MessageButton');
	
	if(firstRun) {
		tekstboks.value = '';
		tekstboks.removeChild(tekstboks.firstChild);
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click',true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		tekstboks.dispatchEvent(e); // irriterende clearing funktion sættes ud af spil
	}

	var antalDefs = GM_getValue('antalDefs',5);
	var gotOne = false; // har vi faktisk en værdi sat?
	
	for (var i=0; i<antalDefs; i++) {
		var btn = document.createElement('input');
		btn.setAttribute('type','button');
		btn.value = i+1; 
		btn.className='inputKnap aos_btn_mmo';
		btn.id = 'aos_btn_mmo_'+i;
		
		var stylin = '';
		if (i==0) { stylin += 'margin-left: 1em;'; }
		if (!GM_getValue('stdBesked'+(i+1),false)) { stylin += 'visibility: hidden;'; }
		else { gotOne=true; }
		btn.setAttribute('style',stylin);
		
		btn.addEventListener("click",function(e) {
			if (document.getElementById('aos_btn_mmo_gem').getAttribute('style').match(/visibility/) != 'visibility') {
				overskrift.value = GM_getValue('stdBesked'+this.value+'_overskrift',' '.repeat(15));
				tekstboks.value = GM_getValue('stdBesked'+this.value,' '.repeat(50));
			}
		},'false');
		sendknap.parentNode.appendChild(btn);
	}
	
	{ // Gem knap
		var gemBtn = document.createElement('input');
		gemBtn.setAttribute('type','button');
		gemBtn.value = 'Gem'; 
		gemBtn.className='inputKnap aos_btn_mmo';
		gemBtn.id = 'aos_btn_mmo_gem';
		gemBtn.setAttribute('style','margin-left: 1em');
		
		gemBtn.addEventListener('click',function(e) {
			hideBtns();
			for(var i=0; i<antalDefs; i++) {
				var butn = document.getElementById('aos_btn_mmo_'+i);
				butn.setAttribute('style',(i==0?'margin-left: 1em;':'')+(GM_getValue('stdBesked'+(i+1),false) ? 'background-color: red' : ''));
				butn.addEventListener('click',function(ev) {
					if (!GM_getValue('stdBesked'+this.value,false) || 
					     confirm("Der findes allerede en standardbesked med nummeret "+this.value+".\nEr du sikker på at du ønsker at gemme oven på den?")) {
						GM_setValue('stdBesked'+this.value+'_overskrift',overskrift.value);
						GM_setValue('stdBesked'+this.value,tekstboks.value);
						initiatePage();
					}
				},'true');
			}
		},'false');
		
		sendknap.parentNode.appendChild(gemBtn);
	}
	{ // Ryd knap
		var rydBtn = document.createElement('input');
		rydBtn.setAttribute('type','button');
		rydBtn.value = 'Ryd'; 
		rydBtn.className='inputKnap aos_btn_mmo';
		rydBtn.id = 'aos_btn_mmo_ryd';
		if (!gotOne) { rydBtn.setAttribute('style','visibility: hidden'); }
		
		rydBtn.addEventListener('click',function(e) {
			hideBtns();
			for(var i=0; i<antalDefs; i++) {
				var butn = document.getElementById('aos_btn_mmo_'+i);
				butn.addEventListener('click',function(ev) {
					if (confirm('Er du sikker på at du vil slette standardbesked '+this.value+'?')) {
						GM_setValue('stdBesked'+this.value+'_overskrift','');
						GM_setValue('stdBesked'+this.value,'');
						initiatePage();
					}
				},'false');
			}
		},'false');
		
		sendknap.parentNode.appendChild(rydBtn);
	}
	{ // Annuller knap
		var cancBtn = document.createElement('input');
		cancBtn.setAttribute('type','button');
		cancBtn.value = 'Annuller'; 
		cancBtn.className='inputKnap aos_btn_mmo';
		cancBtn.id = 'aos_btn_mmo_canc';
		cancBtn.setAttribute('style','margin-left: 1em; visibility: hidden');
		
		cancBtn.addEventListener('click',function(e) {
			initiatePage(false);
		},'false');
		
		sendknap.parentNode.appendChild(cancBtn);
	}
}

function hideBtns() {
	document.getElementById('aos_btn_mmo_gem').setAttribute('style','margin-left: 1em; visibility: hidden');
	document.getElementById('aos_btn_mmo_ryd').setAttribute('style','visibility: hidden');
	document.getElementById('aos_btn_mmo_canc').setAttribute('style','margin-left: 1em;');
}