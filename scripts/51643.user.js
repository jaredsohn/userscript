// ==UserScript==
// @name           The West Reporter SK/CZ
// @namespace      www.the-west.sk
// @description    Converts duel reports to text format so you can paste them on the forums. Open a duel report and click the new "Convert" button.
// @include        http://*.the-west.*/game.php*
// ==/UserScript==
// 
(function(){
	var doc = document;
	var console = unsafeWindow.console;
	function $(id) { return(doc.getElementById(id)); }
	function xp1(x, p) {
		var r = doc.evaluate(x, p, null, 9, null).singleNodeValue;
		return(r);
	}
	function xp(x, p) {
		var r = doc.evaluate(x, p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var len = r.snapshotLength;
		var ar = new Array(len);
		for(var i=0; i<len; i++) {
			ar[i] = r.snapshotItem(i).textContent;
		}
		return(ar);
	}

	function __tf(template, name) {
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				if (elName == name)
					return(p);
				if (p.children)
				{
					var q = __tf(p.children, name);
					if (q)
						return(q);
				}
			}
		}
		return(null);
	}
	function dc(template, parent)
	{
		// { thead: { el:null, attrs:{}, children: {} } }
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				p.el = doc.createElement(p.tag);
				if (parent)
					parent.appendChild(p.el);
				
				if (p.attrs)
				{
					for(var atName in p.attrs)
					{
						if (p.attrs.hasOwnProperty(atName))
						{
							var atValue = p.attrs[atName];
							if (atName == "text")
								p.el.textContent = atValue;
							else if (atName == "html")
								p.el.innerHTML = atValue;
							else
								p.el.setAttribute(atName, atValue);
						}
					}
				}
				
				if (p.children)
				{
					dc(p.children, p.el);
				}
			}
		}
		template.find = function(name) {
			return(__tf(template, name));
		};
		return(template);
	}
	function trim(str) {
		s = str.replace(/^(\s)*/, '');
		s = s.replace(/(\s)*$/, '');
		return s;
	}
	function whiteSpaceRemove(str) {
		s = str.replace(/\s+/g,' ');
		s = s.replace(/^(\s)*/, '');
		s = s.replace(/(\s)*$/, '');
		return s;
	}
	function antirtrim(str,num) {
		for (istr = str.length; istr<num; istr++)
			str = str + ' ';
		return str;
	}

	function convertTitle(title, player1, player2){
		var p1 = player1.split("\n");
		var p2 = player2.split("\n");
		var p1_name = trim(p1[1]);
		var p2_name = trim(p2[1]);
		reg = new RegExp(".* ([0-9]*)"); 
		var p1_level = trim(p1[2]).split (reg)[1]; 
		var p2_level = trim(p2[2]).split (reg)[1]; 
		reg = new RegExp(".* ([0-9]+)[\s\S]*"); 
		var p1_dlevel = trim(p1[3]).split (reg)[1]; 
		var p2_dlevel = trim(p2[3]).split (reg)[1]; 
		title = title.replace(p1_name,p1_name+' ('+p1_level+'/'+p1_dlevel+')');
		title = title.replace(p2_name,p2_name+' ('+p2_level+'/'+p2_dlevel+')');
		return title;
	}
	function convertHits(hits1, hits2) {
		var hits = '';
		reg = new RegExp(".*: (.*)");
		for (i=0; i<hits1.length;i++) {
			if ((hits1[i].indexOf(':') != -1) || (i == hits1.length-1)) {
				if (hits1[i].indexOf(':') != -1) {hits1[i] = whiteSpaceRemove(hits1[i]).split(reg)[1];} else {hits1[i] = whiteSpaceRemove(hits1[i]);}
				if (hits1[i].indexOf('-') != -1){hits1[i] = hits1[i].substr(0,hits1[i].lastIndexOf(' '));}
				} else {
					hits1[i] = whiteSpaceRemove(hits1[i]);
					}
			if ((hits2[i].indexOf(':') != -1) || (i == hits2.length-1)) {
				if (hits2[i].indexOf(':') != -1) {hits2[i] = whiteSpaceRemove(hits2[i]).split(reg)[1];} else {hits2[i] = whiteSpaceRemove(hits2[i]);}
				if (hits2[i].indexOf('-') != -1){hits2[i] = hits2[i].substr(0,hits2[i].lastIndexOf(' '));}
				} else {
					hits2[i] = whiteSpaceRemove(hits2[i]);
					}

			hits += antirtrim(hits1[i],30)+hits2[i]+'\n';
			if (i == 3 || i == hits1.length-2) {hits += '\n';}
			}
	return hits+'\n';
	}
	function convertFlashHits(hits) {
		hits_pom = hits.split('|');
		var hits1_dmg = new Array();
		var hits1_int = new Array();
		var hits1 = new Array();
		var hits2 = new Array();
		var hits2_dmg = new Array();
		var hits2_int = new Array();
		for (i=0; i<8; i++) {
			hits2_dmg[i] = hits_pom[i];
		}
		for (i=8; i<16; i++) {
			hits1_dmg[i-8] = hits_pom[i];
		}
		for (i=16; i<24; i++) {
			hits1_int[i-16] = hits_pom[i];
		}
		for (i=24; i<32; i++) {
			hits2_int[i-24] = hits_pom[i];
		}
		n = 8;
		hits = '';
		hits1[8] = 0;
		hits2[8] = 0;
		for (i = 0; i<n; i++) {
			if (hits1_dmg[i] < 0 || hits2_dmg[i]<0) {n=i;}
			hits1_dmg[i] = Math.abs(hits1_dmg[i]);
			switch (hits1_int[i]) {
				case '1': {hits1[i] = 'Hlava - '+hits1_dmg[i]; break;}
				case '2': {hits1[i] = 'Levé rameno - '+hits1_dmg[i]; break;}
				case '3': {hits1[i] = 'Pravé rameno - '+hits1_dmg[i]; break;}
				case '4': {hits1[i] = 'Levá ruka - '+hits1_dmg[i]; break;}
				case '5': {hits1[i] = 'Pravá ruka - '+hits1_dmg[i]; break;}
				default:  {hits1[i] = 'Žádný zásah';}
			}
			if (hits1_dmg[i] == 0) {hits1[i] = 'Žádný zásah';}
			hits1[8] += hits1_dmg[i];
			hits2_dmg[i] = Math.abs(hits2_dmg[i]);
			switch (hits2_int[i]) {
				case '1': {hits2[i] = 'Hlava - '+hits2_dmg[i]; break;}
				case '2': {hits2[i] = 'Levé rameno - '+hits2_dmg[i]; break;}
				case '3': {hits2[i] = 'Pravé rameno - '+hits2_dmg[i]; break;}
				case '4': {hits2[i] = 'Levá ruka - '+hits2_dmg[i]; break;}
				case '5': {hits2[i] = 'Pravá ruka - '+hits2_dmg[i]; break;}
				default:  {hits2[i] = 'Žádný zásah'; break;}
			}
			if (hits2_dmg[i] == 0) {hits2[i] = 'Žádný zásah';}
			hits2[8] +=hits2_dmg[i];
			hits += antirtrim(hits1[i],30)+hits2[i]+'\n';
			if (i == 3) {hits += '\n';}
		}
		if (hits1[8] != 0) {hits1[8] = 'Zásahy celkem - '+hits1[8];} else {hits1[8] = 'Žádný zásah';}
		if (hits2[8] != 0) {hits2[8] = 'Zásahy celkem - '+hits2[8];} else {hits2[8] = 'Žádný zásah';}
		hits += '\n'+antirtrim(hits1[8],30)+hits2[8]+'\n\n';
		return hits;
	}
	
	function convertDuelReport(div) {
		var x = {};
		x.title = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);
		x.p1 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[1]', div);
		x.loc = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[3]', div);
		x.p2 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[5]', div);
		var time = whiteSpaceRemove(trim(x.title.textContent).substring(trim(x.title.textContent).indexOf('\n')));
		var title = convertTitle(whiteSpaceRemove(trim(x.title.textContent).substring(0,trim(x.title.textContent).indexOf('\n'))), x.p1.textContent, x.p2.textContent)+'\n';
		var loc = whiteSpaceRemove(trim(x.loc.textContent).replace('\n',':'))+' ('+time+')\n\n';
		if (div.innerHTML.indexOf('<span style="font-size: 12px; font-weight: bold;">') != -1) {
			x.hitsBody = xp1('./table/tbody/tr[2]/td[2]/div/div/table[2]/tbody', div);
			x.p1hits = xp('./tr/td[1]', x.hitsBody);
			x.p2hits = xp('./tr/td[3]', x.hitsBody);
			x.outcome = xp1('./table/tbody/tr[2]/td[2]/div/div/h4', div);
			
			var hits = convertHits(x.p1hits,x.p2hits);
			var outcome = whiteSpaceRemove(x.outcome.textContent).replace(/\. /g,'.\n');
			} else {
				var x = document.getElementsByName('movie')[0].attributes; 
				var y = x.getNamedItem("value"); 
				var hits = y.value;
				hits = convertFlashHits(hits.substring(hits.indexOf('=')+1,hits.indexOf('&')));
				var outcome = y.value;
				outcome = whiteSpaceRemove(outcome.substring(outcome.lastIndexOf('=')+1)).replace(/\. /g,'.\n');
				}
		code = '[code]'+title+loc+hits+outcome+'[/code]';
		div.innerHTML = '<textarea style="width:100%;height:100%;">' + code + '</textarea>';
		div.childNodes[0].select();
	}
	
	function hookReport(div) {
		var titleRow = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);
		if (!titleRow) return;

		if (!titleRow.textContent.match(/Duel:/))
			return;
		
		var t = dc({
			"th": { 
				tag: "th", 
				children: {
					"btn": {
						tag: "button",
						attrs: {
							text: " ",
							title: "Konvertovať do textového formátu",
							style: "background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAAZCAMAAAB6r+I4AAAAAXNSR0IArs4c6QAAActQTFRF////NCEcMiAbNiIcNSIcKRgTKxoVPywjdGZWPisjRzYnX0o4YU88RzUqc2BHUj8wMSAbOScfXUw6MiEcNyUeWkk2VkMzNiMeQC0jYlA6Lx4ZX0w5SzgsQC0kSTYqUUAwXkw4MB4ZdGFGMB8aMyAbSTksNCMbNCEbMyEcMiEbPiseNSEcMR8ZLRwXMyEbNyIcOyohOSgfPiwjLx0YPSshMSAaMR8aPSsjMh8aMiAaMh4YMx8YPi0kLBoUKxkTKhgSPSwjMB4YPCsiOykgNCAbLBsWLh0XMyIbNiMdNiQdLx0XLRsWLh0YLhwXMh4ZLxwWMh8ZLhwWKhkUKhgTLBoVMx8ZMyAaNCAaMiAZMB0XLRsVMR4YMB8ZMB0YLx4YPSsiPCohNSMdNiQeNyQesaupZVhU5ePiSzs3Szw3ZFdUsqqosaqoYVRR5OLiTj04aFlUsqupfnRwfnNwTDw4gHRxZVZSe29sZFdTf3NwZlhUSTk0y8bFzMfGmZCNmY+NSzs2TDw3YFJO5OLhy8fFZVdTsauoem9slYyKZ1hUm5CNSjs3Y1dTmI+NZldURzg0fHFuTDs0YlVRZVdUr6mmY1ZS5eLisquoeW5qysbFw++OrQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfZBgsSODZmI8uaAAADHElEQVRIx61VW1fUMBBOhqrxHowXjKLEBNrttkWpmyWAukUErXoEH/YIXhD9///BSRtgF/GcPjhnm2T7Tb7OJTMhlALMRPTCRQWchz/AlZQWYDRaeT2c7wpcvECjGQBKySX2v+USucyuXL12/cZNnlgpudbSUtpLdJltuTfbg52dt++6AvzmjevXrl5hl8ksuyVu37l7TyQJpVzzIqKGW54kBVhlNVDTFRD37t65LW6xWTLH7ssHDzkHpUqptarf5x8kFwAWNPeiOwOcP3wg77M5Ms8ePZ5dAMWttZxHQWRhcJeUILRuAL2N+7lx5wCo3gBcwcLs40dsHnP0ZEFLbbiGgZTRiRgu4jyGMlcNYBP/gsYx/AWgcgNwgzwLT5ocLS7FCe9pLWJCGrpmougjfPRf0y2XJ7E2OlcQ0Fr3eBIvLTY5ShNB+1mu+hkhnqRlRgMKbf3XECg/IhD9Q1BdYD54nvWpSNImR54zUtpEihAkCcZ2Fq+PgUE7VdRw+hylsSjEcq7EMiFJdEJJ2hWO7ep0mIa8fFI8ofky8sQp5ugpS43oAdUGKCGUHHM2usezX00ST0EoubV7nzWFnjApe0qeed/xaEHO+fH2YEqgCnwnnBOL49UMTWjfk3jfn5EVlpZCK0PxObXnHIbW1b8s3yIEaGLiPlaT0qJM2Qp5ztKBsGCMAzMVso6cOIJzLo6NMWDFIGXPyZClq8K4tfV1tzZFR6IzYZxIzWnG/VgU42LsxutrzojVlA3Jhvf9xctXL/GZ3HqaiLOc0Vk7CanqvfqL5/C+byBnW0euyNxkHU1ZNc0ZtZThJFee0xWFc6GONsgo1HuWOZd5wanKsmp3F6M0LlzVGchCvY8wnm1fqjzS6uLQKu5nB3tfd7sCVehLQzxLbf8sV1cH2LOlLLfrajerP9WNIXsvDroCZeifK1jvbZ+neBbiMbZEdKLarw8OatyZubFzXQEa+vwc2Qz3EfbYD/hNa7/V339UAIOBc4eHPw9Hw66ACPfRJsbzf8uQhAvaxn2ruUiA409ZkHku5dHR0a/fv7sCsQ33+x9dwMp7U6hNVQAAAABJRU5ErkJggg=='); background-position: -2px 0px 0px 0px; border: none; width: 83px; height: 25px; cursor: pointer;"
						}
					}
				}
			}
		});
		titleRow.appendChild(t["th"].el);
		t.find("btn").el.addEventListener("click", function() { convertDuelReport(div); }, false);
	}
	
	//
	// Start up
	//
	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookReport(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;
	
})();

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_66', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_66', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=66&version=0.10';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();