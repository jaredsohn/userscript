// ==UserScript==
// @name           Travian 4 speed hero resources
// @author         Leonardo I
// @version        0.1
// @namespace      http://leonardosite.altervista.org/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Cambiare la produzione dell'eroe dalla pagina principale ed avere anche a disposizione un'anteprima della produzione che otterrete...
// @include        http://*.travian.*/*
// ==/UserScript==

/*** Settaggio variabili ***/
var host = location.hostname.replace("www.", "");
res = new Array();
res['0'] = 'Tutte';
res['1'] = 'Legno';
res['2'] = 'Argilla';
res['3'] = 'Ferro';
res['4'] = 'Grano';
checked = parseInt(dati(host+'checked'));
var page = unsafeWindow.Travian.currentPage;
var versione = '0.1';

if (page == 'dorf1') {
	$('table#production tbody tr td.ico').css({ 'width' : '100px' });
	$('table#production th').append('<img id="speed_hero_res_0" src="/img/x.gif" style="cursor: pointer; height: 18px; width: 18px; background-image: url(/gpack/travian_0006/img/a/closed-ltr.png);" '+tooltip('Setta come risorse dell\\\'eroe tutto...')+'>');
	$('table#production tbody tr td.ico img.r1').before('<img id="speed_hero_res_1" src="/img/x.gif" style="margin-left: -5px; cursor: pointer; height: 18px; width: 18px; background-image: url(/gpack/travian_0006/img/a/closed-ltr.png);" '+tooltip('Setta come risorse dell\\\'eroe il legno...')+'>&nbsp;&nbsp;'); // Legno
	$('table#production tbody tr td.ico img.r2').before('<img id="speed_hero_res_2" src="/img/x.gif" style="margin-left: -5px; cursor: pointer; height: 18px; width: 18px; background-image: url(/gpack/travian_0006/img/a/closed-ltr.png);" '+tooltip('Setta come risorse dell\\\'eroe l\\\'argilla...')+'>&nbsp;&nbsp;'); // Argilla
	$('table#production tbody tr td.ico img.r3').before('<img id="speed_hero_res_3" src="/img/x.gif" style="margin-left: -5px; cursor: pointer; height: 18px; width: 18px; background-image: url(/gpack/travian_0006/img/a/closed-ltr.png);" '+tooltip('Setta come risorse dell\\\'eroe il ferro...')+'>&nbsp;&nbsp;'); // Ferro
	$('table#production tbody tr td.ico img.r4').before('<img id="speed_hero_res_4" src="/img/x.gif" style="margin-left: -5px; cursor: pointer; height: 18px; width: 18px; background-image: url(/gpack/travian_0006/img/a/closed-ltr.png);" '+tooltip('Setta come risorse dell\\\'eroe il grano...')+'>&nbsp;&nbsp;'); // Grano
	
	for (i=0;i<5;i++) {
		res1 = parseInt(unsafeWindow.resources.production.l1);
		res2 = parseInt(unsafeWindow.resources.production.l2);
		res3 = parseInt(unsafeWindow.resources.production.l3);
		res4 = parseInt(unsafeWindow.resources.production.l4);
		//alert(res1+"\n"+res2+"\n"+res3+"\n"+res4);
		
		element = '<p id="new_res_'+i+'" style="display: none;"><b>Produzione se settiamo '+res[i]+'</b><br>';
		switch (checked) {
			case 0:
				res1 = res1-parseInt(dati(host+'res_0'));
				if (i==1) { res1 = res1+parseInt(dati(host+'res_1')); }
				if (i==0) { res1 = res1+parseInt(dati(host+'res_0')); }
				element += '<img alt="Legno" src="img/x.gif" class="r1"> '+res1+' all\'ora<br>';
				
				res2 = res2-parseInt(dati(host+'res_0'));
				if (i==2) { res2 = res2+parseInt(dati(host+'res_2')); }
				if (i==0) { res2 = res2+parseInt(dati(host+'res_0')); }
				element += '<img alt="Argilla" src="img/x.gif" class="r2"> '+res2+' all\'ora<br>';
				
				res3 = res3-parseInt(dati(host+'res_0'));
				if (i==3) { res3 = res3+parseInt(dati(host+'res_3')); }
				if (i==0) { res3 = res3+parseInt(dati(host+'res_0')); }
				element += '<img alt="Ferro" src="img/x.gif" class="r3"> '+res3+' all\'ora<br>';
				
				res4 = res4-parseInt(dati(host+'res_0'));
				if (i==4) { res4 = res4+parseInt(dati(host+'res_4')); }
				if (i==0) { res4 = res4+parseInt(dati(host+'res_0')); }
				element += '<img alt="Grano" src="img/x.gif" class="r4"> '+res4+' all\'ora<br>';
			break;
			case 1:
				res1 = res1-parseInt(dati(host+'res_1'));
				if (i==1) { res1 = res1+parseInt(dati(host+'res_1')); }
				if (i==0) { res1 = res1+parseInt(dati(host+'res_0')); }
				element += '<img alt="Legno" src="img/x.gif" class="r1"> '+res1+' all\'ora<br>';
				
				if (i==2) { res2 = res2+parseInt(dati(host+'res_2')); }
				if (i==0) { res2 = res2+parseInt(dati(host+'res_0')); }
				element += '<img alt="Argilla" src="img/x.gif" class="r2"> '+res2+' all\'ora<br>';
				
				if (i==3) { res3 = res3+parseInt(dati(host+'res_3')); }
				if (i==0) { res3 = res3+parseInt(dati(host+'res_0')); }
				element += '<img alt="Ferro" src="img/x.gif" class="r3"> '+res3+' all\'ora<br>';
				
				if (i==4) { res4 = res4+parseInt(dati(host+'res_4')); }
				if (i==0) { res4 = res4+parseInt(dati(host+'res_0')); }
				element += '<img alt="Grano" src="img/x.gif" class="r4"> '+res4+' all\'ora<br>';
			break;
			case 2:
				if (i==1) { res1 = res1+parseInt(dati(host+'res_1')); }
				if (i==0) { res1 = res1+parseInt(dati(host+'res_0')); }
				element += '<img alt="Legno" src="img/x.gif" class="r1"> '+res1+' all\'ora<br>';
				
				res2 = parseInt(unsafeWindow.resources.production.l2)-parseInt(dati(host+'res_2'));
				if (i==2) { res2 = res2+parseInt(dati(host+'res_2')); }
				if (i==0) { res2 = res2+parseInt(dati(host+'res_0')); }
				element += '<img alt="Argilla" src="img/x.gif" class="r2"> '+res2+' all\'ora<br>';
				
				if (i==3) { res3 = res3+parseInt(dati(host+'res_3')); }
				if (i==0) { res3 = res3+parseInt(dati(host+'res_0')); }
				element += '<img alt="Ferro" src="img/x.gif" class="r3"> '+res3+' all\'ora<br>';
				
				if (i==4) { res4 = res4+parseInt(dati(host+'res_4')); }
				if (i==0) { res4 = res4+parseInt(dati(host+'res_0')); }
				element += '<img alt="Grano" src="img/x.gif" class="r4"> '+res4+' all\'ora<br>';
			break;
			case 3:
				if (i==1) { res1 = res1+parseInt(dati(host+'res_1')); }
				if (i==0) { res1 = res1+parseInt(dati(host+'res_0')); }
				element += '<img alt="Legno" src="img/x.gif" class="r1"> '+res1+' all\'ora<br>';
				
				if (i==2) { res2 = res2+parseInt(dati(host+'res_2')); }
				if (i==0) { res2 = res2+parseInt(dati(host+'res_0')); }
				element += '<img alt="Argilla" src="img/x.gif" class="r2"> '+res2+' all\'ora<br>';
				
				res3 = parseInt(unsafeWindow.resources.production.l3)-parseInt(dati(host+'res_3'));
				if (i==3) { res3 = res3+parseInt(dati(host+'res_3')); }
				if (i==0) { res3 = res3+parseInt(dati(host+'res_0')); }
				element += '<img alt="Ferro" src="img/x.gif" class="r3"> '+res3+' all\'ora<br>';
				
				if (i==4) { res4 = res4+parseInt(dati(host+'res_4')); }
				if (i==0) { res4 = res4+parseInt(dati(host+'res_0')); }
				element += '<img alt="Grano" src="img/x.gif" class="r4"> '+res4+' all\'ora<br>';
			break;
			case 4:
				if (i==1) { res1 = res1+parseInt(dati(host+'res_1')); }
				if (i==0) { res1 = res1+parseInt(dati(host+'res_0')); }
				element += '<img alt="Legno" src="img/x.gif" class="r1"> '+res1+' all\'ora<br>';
				
				if (i==2) { res2 = res2+parseInt(dati(host+'res_2')); }
				if (i==0) { res2 = res2+parseInt(dati(host+'res_0')); }
				element += '<img alt="Argilla" src="img/x.gif" class="r2"> '+res2+' all\'ora<br>';
				
				if (i==3) { res3 = res3+parseInt(dati(host+'res_3')); }
				if (i==0) { res3 = res3+parseInt(dati(host+'res_0')); }
				element += '<img alt="Ferro" src="img/x.gif" class="r3"> '+res3+' all\'ora<br>';
				
				res4 = parseInt(unsafeWindow.resources.production.l4)-parseInt(dati(host+'res_4'));
				if (i==4) { res4 = res4+parseInt(dati(host+'res_4')); }
				if (i==0) { res4 = res4+parseInt(dati(host+'res_0')); }
				element += '<img alt="Grano" src="img/x.gif" class="r4"> '+res4+' all\'ora<br>';
			break;
			default:
				element += 'Errore!!! Il valore selezionato &egrave;:'+dati(host+'checked');
			break;
		}
		element += '<br><small>Travian 4 speed hero resources by <a href="http://leonardosite.altervista.org/" target="_blank">Leonardo I</a>, version '+versione+'</small></p>';
		$('table#production').after(element);
	}
	
	
	// Tutte
	$('#speed_hero_res_0').mouseover(function() { $('#new_res_0').show(); });
	$('#speed_hero_res_0').mouseout(function() { $('#new_res_0').hide(); });
	// Legno
	$('#speed_hero_res_1').mouseover(function() { $('#new_res_1').show(); });
	$('#speed_hero_res_1').mouseout(function() { $('#new_res_1').hide(); });
	// Argilla
	$('#speed_hero_res_2').mouseover(function () { $('#new_res_2').show(); });
	$('#speed_hero_res_2').mouseout(function () { $('#new_res_2').hide(); });
	// Ferro
	$('#speed_hero_res_3').mouseover(function () { $('#new_res_3').show(); });
	$('#speed_hero_res_3').mouseout(function () { $('#new_res_3').hide(); });
	// Grano
	$('#speed_hero_res_4').mouseover(function () { $('#new_res_4').show(); });
	$('#speed_hero_res_4').mouseout(function () { $('#new_res_4').hide(); });
	
	$('#speed_hero_res_0').click(function() { setResources(0); location.reload(); }); // Tutte
	$('#speed_hero_res_1').click(function() { setResources(1); location.reload(); }); // Legno
	$('#speed_hero_res_2').click(function() { setResources(2); location.reload(); }); // Argilla
	$('#speed_hero_res_3').click(function() { setResources(3); location.reload(); }); // Ferro
	$('#speed_hero_res_4').click(function() { setResources(4); location.reload(); }); // Grano
}else if (page == 'hero_inventory') {
	res_0 = parseInt($('label[for=resourceHero0]').text());
	res_1 = parseInt($('label[for=resourceHero1]').text());
	res_2 = parseInt($('label[for=resourceHero2]').text());
	res_3 = parseInt($('label[for=resourceHero3]').text());
	res_4 = parseInt($('label[for=resourceHero4]').text());
	checked = parseInt($('input[name=resource]:checked').val());
	//alert(res_0+'\n'+res_1+'\n'+res_2+'\n'+res_3+'\n'+res_4+'\n'+checked);
	GM_setValue(host+'res_0', res_0);
	GM_setValue(host+'res_1', res_1);
	GM_setValue(host+'res_2', res_2);
	GM_setValue(host+'res_3', res_3);
	GM_setValue(host+'res_4', res_4);
	GM_setValue(host+'checked', checked);
}

function tooltip(text) {
	return ' onmouseover="Travian.Tip.show(\''+text+'\');" onmouseout="Travian.Tip.hide();"';
}

function dati(nome) {
	valore = GM_getValue(nome);
	if (valore == null) {
		return '';
	}else{
		return valore;
	}
}

function setResources(resid) {
	if (resid >= 0 && resid <=4) {
		unsafeWindow.Travian.ajax({
			data: {
				cmd: "heroSetResource",
				resource: resid
			},
			onSuccess: function (c) {
				if (c.tooltip) {
					var b = $("attributes").down(".productionPoints");
					var a = b.getElements(".tooltip");
					if (b.hasClass("tooltip")) {
						a.push(b)
					}
					if (typeof c.tooltip != "undefined" && a.length) {
						a.setTipUnescaped(c.tooltip)
					}
				}
			}
		});
		GM_setValue(host+'checked', resid);
		return true;
	}else{
		return false;
	}
}