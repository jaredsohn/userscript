// ==UserScript==
// @name           NL TW - Nachtbonus Checker
// @description    In gecombineerd overzicht te zien of clear wel/niet in nachtbonus aankomt.
// @author         warrior MdefPdef
// @include        http://nl*.tribalwars.nl/game.php*screen=overview_villages*
// @include        http://nl*.tribalwars.nl/game.php*screen=info_village*
// ==/UserScript==
var win=window,doc=document;
function getCookie(n){var c='; '+doc.cookie+';',s='; '+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
function setCookie(n,v,l){var e=encodeURIComponent,L=parseInt(l)||0,c=doc.cookie;if(L&&c.length+e(n+v).length-e(('; '+c).indexOf('; '+n+'=')+1?n+getCookie(n):'').length>4027)throw alert('Cookie "'+n+'" kon niet opgeslagen worden: te weinig vrije ruimte voor cookies!');doc.cookie=e(n)+'='+e(v)+'; max-age='+L}
var loSt=win.localStorage,
getValue=loSt?function(n){return loSt.getItem(n)||''}:getCookie,setValue=loSt?function(n,v){v===0||v?loSt.setItem(n,v):loSt.removeItem(n)}:function(n,v){setCookie(n,v,1e7)},getValueC=loSt?function(n){var v=getCookie(n);if(v!=''){setValue(n,v);setCookie(n,0)}else return getValue(n);return v}:getCookie;
var wrld = location.host.replace("nl","")
wrld = wrld.replace('.tribalwars.nl',"");
if (document.location.href.match('info_village')) {
	var psw = document.getElementById('content_value');
	var psa = psw.getElementsByTagName('tbody');
	var psn = psa[0].getElementsByTagName('tr');
	var psq = psa[0].getElementsByTagName('td');
	var nwtr = document.createElement('tr');
	var nwtd = document.createElement('td');
	nwtd.setAttribute("colspan", "2");
	nwtr.appendChild(nwtd);
	psa[0].appendChild(nwtr);
	var fgj
	for (var tf = 0; tf < psn.length; tf++) {
		if (psq[tf].innerHTML.match('Â» Troepen sturen')) {
			for (var ak = psq.length; ak > (tf + 2); ak--) {
				psq[ak - 1].innerHTML = psq[ak - 2].innerHTML;
			}
			psq[tf + 1].innerHTML = '<a id="nbcdo" href="javascript:void(0)">Â» Nachtbonus-Checker invoeren</a>'
			var nbcda = document.getElementById("nbcdo");
			nbcda.addEventListener('click', function() {
				setValue('w' + wrld + '.target', psq[1].innerHTML);
				alert("Nachtbonus-Checker co\xf6rdinaten: " + psq[1].innerHTML);
			},
			true);
			break
		}
	}
}
else{
	var table = document.getElementById("combined_table");
	var tabs = table.getElementsByTagName("tr");
	if(wrld != '1'){ var Bnb = 1; }else{ var Bnb = 0; }
	if(!getValue('w'+wrld+'.nhd')) { setValue('w'+wrld+'.nhd', 'spear'); } 
	var nhd = getValue('w'+wrld+'.nhd');
	if(!getValue('w'+wrld+'.nbc')) { setValue('w'+wrld+'.nbc', 'on'); } 
	var nbc = getValue('w'+wrld+'.nbc');
	if(!getValue('w'+wrld+'.target')) { var trgt = setValue('w'+wrld+'.target', '000|000'); }
	var trgt = getValue('w'+wrld+'.target').replace(/\s+/g, '');
	var trgtER = 'false'
	if(trgt.length < 7){ trgtER = 'true' }
	if(trgt.length > 7){ trgt = trgt.split(trgt.charAt(7))[0] }
	trgt = trgt.replace(trgt.charAt(3),'|');
	var strValidChars = '0123456789'
	for (var gt = 0; gt < 6; gt++){	if(gt != 3){ if (strValidChars.indexOf(trgt.charAt(gt)) == -1){ trgtER = 'true'; } } }
	var xcrdf = trgt.split('|')[0]  
	var ycrdf = trgt.split('|')[1] 
	if (nhd == 'spear'){ var Uspeed = '18' }
	if (nhd == 'sword'){ var Uspeed = '22' }
	if (nhd == 'axe'){ var Uspeed = '18' }
	if (nhd == 'archer'){ var Uspeed = '18' }
	if (nhd == 'spy'){ var Uspeed = '9' }
	if (nhd == 'light'){ var Uspeed = '10' }
	if (nhd == 'marcher'){ var Uspeed = '10' }
	if (nhd == 'heavy'){ var Uspeed = '11' }
	if (nhd == 'ram'){ var Uspeed = '30' }
	if (nhd == 'catapult'){ var Uspeed = '30' }
	if (nhd == 'knight'){ var Uspeed = '10' }
	if (nhd == 'snob'){ var Uspeed = '35' }
	if ( wrld != '2' ) { var spdwrld = 1 }else{ var spdwrld = 0.5 }
	var snnhd = Uspeed * spdwrld
	var posit = document.getElementById("edit_group_href");
	var newa = document.createElement("a");
	newa.appendChild(document.createTextNode('» Nachtbonus-Checker instellingen'));
	newa.setAttribute("id", "edit_nbc_href");
	newa.setAttribute("onClick", "javascript:toggle_element('#nbc_config');");
	newa.setAttribute("href","#");
	posit.parentNode.insertBefore(newa,posit);
	document.getElementById('edit_group_href').innerHTML = '» Groepen Bewerken'
	var insven = document.createElement("div");
	insven.innerHTML += '<table style="white-space: nowrap;" class="vis"><tbody><tr><th><b><font size="5">Instellingen Wereld '+wrld+'</font></b></th></tr><tr class="nowrap row_a"><td><b>Voer hier de co\xf6rdinaten in van het aan te vallen dorp.</b></td></tr><tr class="nowrap row_b"><td><input class="numbersOnly" type="text" id="invtrg" size="5" style="text-align: center" value='+trgt+'><input id="sbmtrg" type="button" value="OK"></td></tr><tr class="nowrap row_a"><td><b>Selecteer de langzaamste eenheid bij de aanval.</b></td></tr><tr class="nowrap row_b"><td><a id="spear" href=""><img id="Uspear" src="/graphic/unit/unit_spear.png?1" ></a><a id="sword" href=""><img id="Usword" src="/graphic/unit/unit_sword.png?1" ></a><a id="axe" href=""><img id="Uaxe" src="/graphic/unit/unit_axe.png?1" ></a><a id="archer" href=""><img id="Uarcher" src="/graphic/unit/unit_archer.png?1" ></a><a id="spy" href=""><img id="Uspy" src="/graphic/unit/unit_spy.png?1" ></a><a id="light" href=""><img id="Ulight" src="/graphic/unit/unit_light.png?1" ></a><a id="marcher" href=""><img id="Umarcher" src="/graphic/unit/unit_marcher.png?1" ></a><a id="heavy" href=""><img id="Uheavy" src="/graphic/unit/unit_heavy.png?1" ></a><a id="ram" href=""><img id="Uram" src="/graphic/unit/unit_ram.png?1" ></a><a id="catapult" href=""><img id="Ucatapult" src="/graphic/unit/unit_catapult.png?1" ></a><a id="knight" href=""><img id="Uknight" src="/graphic/unit/unit_knight.png?1" ></a><a id="snob" href=""><img id="Usnob" src="/graphic/unit/unit_snob.png?1" ></a></td></tr><tr class="nowrap row_a"><td><b>Het invoegen van extra kolom aan/uit zetten:</b></td></tr><tr class="nowrap row_b"><td> <a id="scon" href=""><img id="scimgon" width="13" src="/graphic/dots/green.png?1" ></a><b><font class="hidden" size="4">/</font></b><a id="scoff" href=""><img id="scimgoff" width="13" src="/graphic/dots/red.png?1" ></a></td></tr></tbody></table>'
	insven.setAttribute("style","display: none;");
	insven.setAttribute("id","nbc_config");
	posit.parentNode.insertBefore(insven,posit);
	var insafb = insven.getElementsByTagName("a");
	for (var dh = 0; dh < 12; dh++){
		insafb[dh].addEventListener('click', function(){
		setValue('w'+wrld+'.nhd', this.id);
		location.reload();
		}, true);
	}
	var xtg = document.getElementById("sbmtrg");
	var ytg = document.getElementById("invtrg");
	xtg.addEventListener('click', function(){
		setValue('w'+wrld+'.target', ytg.value);
		location.reload();
	}, true);
	var onsc = document.getElementById("scon");
		onsc.addEventListener('click', function(){
		setValue('w'+wrld+'.nbc', 'on');
		location.reload();
	}, true);
	var ofsc = document.getElementById("scoff");
		ofsc.addEventListener('click', function(){
		setValue('w'+wrld+'.nbc', 'off');
		location.reload();
	}, true);
	var spatie = document.createElement("br");
	posit.parentNode.insertBefore(spatie,posit);
	var crst = document.getElementById('U'+nhd);
	crst.setAttribute("style", "border: 3px solid black");
	var scau = document.getElementById('scimg'+nbc);
	scau.setAttribute("style", "border: 3px solid black");
	if(tabs[0].innerHTML.match('archer')){ var boog = 0; }else{ var boog = 3;
	var ardel = document.getElementById('archer');ardel.parentNode.removeChild(ardel);
	var madel = document.getElementById('marcher');madel.parentNode.removeChild(madel);
	var kndel = document.getElementById('knight');kndel.parentNode.removeChild(kndel); }
	if(nbc == 'on'){
		var newth = document.createElement("th");
		newth.appendChild(document.createTextNode('hi'));
		tabs[0].appendChild(newth);
		var hoofd = tabs[0].getElementsByTagName("th");
		for (var i = hoofd.length-1; i > hoofd.length-14-1+boog; i--){ hoofd[i].innerHTML = hoofd[i-1].innerHTML; }
		if(trgtER != 'true'){ 
			hoofd[hoofd.length-15+boog].innerHTML = '<td style="Border: 1px solid black" ><font size="1"><center><b>'+trgt+'</b></center></font></td>'
		}else{ 
			hoofd[hoofd.length-15+boog].innerHTML = '<td style="Border: 1px solid black" ><font size="1"><center><b>xxx|xxx</b></center></font></td>' 
		}
		for (var j = 1; j < tabs.length; j++) {
			var newtd = document.createElement("td");
			newtd.appendChild(document.createTextNode(j));
			tabs[j].appendChild(newtd);
			var currtd = tabs[j].getElementsByTagName("td");
			var gtspan = currtd[0].getElementsByTagName("span");
			var splitco = gtspan[1].innerHTML.split('(');
			var splitc1 = splitco[1].split(')');
			var splitc2 = splitc1[0].split('|');
			var xcrat = splitc2[0];
			var ycrat = splitc2[1];
			var atid = (gtspan[0].id).replace("label_","");
			for (var q = currtd.length-1; q > currtd.length-14-1+boog; q--){
				currtd[q].innerHTML = currtd[q-1].innerHTML;
				currtd[q].setAttribute("class", "hidden");
				if (currtd[q].innerHTML.match('[1-9]')) {
					currtd[q].removeAttribute("class");		
				}
			}
			if(trgtER != 'true'){
			var uitkomst = Math.sqrt(((xcrat-xcrdf)*(xcrat-xcrdf)+(ycrat-ycrdf)*(ycrat-ycrdf)))
			var afst = snnhd * uitkomst
			var dt = new Date();
			var chour = dt.getHours();
			var cmin = dt.getMinutes();
			var csec = dt.getSeconds();
			for (var thour = 0; afst > 60; thour++){ afst = afst - 60; }
			for (var tmin = 0; afst > 1; tmin++) { afst = afst -1; }
			afst = afst*100
			tsec = Math.round(((afst*60)/100)*1)/1
			var ahour = chour*1+thour*1
			var amin = cmin*1+tmin*1
			var asec = csec*1+tsec*1
			if (asec >= 60) { amin = amin+1; asec=asec-60 }
			if (amin >= 60) { ahour = ahour+1; amin=amin-60 }
			for (var aday = 0; ahour > 23; aday++){ ahour = ahour -24 }
			var endtitle = '<center><a href="/game.php?village='+atid+'&screen=place&mode=command"><img title="Arrival in: '+aday+' day(s) @ '+ahour+':';
			if (amin < 10) { endtitle = endtitle + '0'};
			endtitle = endtitle +amin+':';
			if (asec < 10) { endtitle = endtitle + '0'}; 
			endtitle = endtitle +asec+'" src="/graphic/'
			if (ahour == '6' & amin > 49) { endtitle = endtitle + 'dots/yellow.png?1" ></a></center>'; }
			else if (ahour < Bnb | ahour > 6) { endtitle = endtitle + 'dots/green.png?1" ></a></center>'; }
			else if (ahour >= Bnb & ahour < 7) { endtitle = endtitle + 'dots/red.png?1" ></a></center>'; }
			currtd[currtd.length-14-1+boog].innerHTML = endtitle 
			}else{
				endtitle = '<center><a href="/game.php?village='+atid+'&screen=place&mode=command"><img title="Fill in target" src="/graphic/dots/grey.png?1"></a></center>' 
				currtd[currtd.length-14-1+boog].innerHTML = endtitle 
			}
		}	
	}
}