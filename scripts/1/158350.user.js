// ==UserScript==
// @name        TF Isteni küldetések
// @namespace   http://userscripts.org/scripts/show/158350
// @description TF Isteni küldetések kezelése a Web Hyperben
// @include     http://hyper.pbm.hu/webhyper/isteni.php?f=i*
// @match		http://hyper.pbm.hu/webhyper/isteni.php?f=i*
// @grant		none
// @version     2.1.0
// @downloadURL	https://userscripts.org/scripts/source/158350.user.js
// @updateURL	https://userscripts.org/scripts/source/158350.meta.js
// @author		MIvan
// ==/UserScript==

if(supports_html5_storage()){
	var tick = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC';
	var cross = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==';
	var visible = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAF7D1XuAAAAB3RJTUUH1wcPDBochJoVgQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAAVUExURf///5mZmWZmZszMzP///wAAADMzM1hwz48AAAABdFJOUwBA5thmAAAAXklEQVR42o2OQRKAMAwCAwT//2SJHUcdPbiHNE2Bpip4ipDGrAs6I1iuJ4SU6Ui7+/V8B6YNlbZpouzUzok4gfqBGCe5xEiaT6gCkAVGoT7yJ1iea3Zc+dHETX38tgOr4wF7VTeViQAAAABJRU5ErkJggg==';
	var invisible = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAF7D1XuAAAAB3RJTUUH1wcPDBsLHlKhBwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAAbUExURf////8AAJmZmWZmZszMzP///wAAADMzM5nMzCOmpD0AAAABdFJOUwBA5thmAAAAaUlEQVR42m1OWxICQAgCVOr+J05qa/YjZtYVHyCwYEJrE/OwoFiASB/OE0vNrVYIh7/5G/yEbJtP9MPJgNl/HNkZxpG4HP8JxcpVUkZly+9KDmhImnZtpcfRh1Z3e/tkHQHtdvX30MvtBZtJAWUjLflzAAAAAElFTkSuQmCC';
	var plrs, plr;

	addGlobalStyle('tr.ik_row {opacity:1;}');
	addGlobalStyle('tr.ik_row.done {opacity:0.4;}');
	addGlobalStyle('span.ik_button {background: url('+cross+') no-repeat; width:16px; height:16px; cursor: pointer; display:inline-block; vertical-align:middle;}');
	addGlobalStyle('span.ik_button.done {background-image: url('+tick+');}');
	addGlobalStyle('span.ik_button.visible {background-image: url('+visible+');}');
	addGlobalStyle('span.ik_button.invisible {background-image: url('+invisible+');}');
	
	var isten_tabla = $('table').eq(3);
	var isten = $('b',isten_tabla).eq(0).html();
	isten = isten.substring(0,isten.length-4);

	plr_form();

	var kuldi_tabla = $('table').eq(4);
	var i=0;
	$('tr',kuldi_tabla).each(function(){
		var src;
		var status = localStorage.getItem(isten+'.'+plr+'.ik_'+i);
		var old1st = $('td',this).eq(0);
		old1st.css('width','6%');
		if(status!='done'){ 
			span_class = 'ik_button';
			$(this).addClass('ik_row');
		}
		else{
			span_class = 'ik_button done';
			$(this).addClass('ik_row done');
		}
		var span = $('<span/>',{'class':span_class,'id':'ik_'+i++});   
		span.click(toggle_ik);
		var td = $('<td/>',{'class':"px15von"});
		td.prepend(span);
		$(this).prepend(td);
	});
}

function plr_form(){
	var god_td = $('td',isten_tabla).eq(1);
	var visibility;
	
	plrs = JSON.parse(localStorage.getItem(isten+'.plrs'));
	if(!plrs){ plrs = {}; }
	plr = localStorage.getItem(isten+'.last_plr');
	if(!plr){ plr = ''; }
	else{
		var ok = 0;
		for(var id in plrs){ if(plr==id){ ok = 1; break; } }
		if(!ok){
			localStorage.removeItem(isten+'.last_plr'); 
			plr = '';
		}
	}

	var plr_select = $('<select/>',{'class':'forms','id':'plr_select'});
	$("<option />", {value: '', text: ''}).appendTo(plr_select);
	for(var i in plrs){ 
		$("<option />", {value: i, text: plrs[i]}).appendTo(plr_select);
	}
	$("option[value='" + plr + "']",plr_select).attr("selected","selected");

	plr_select.change(function(){ 
		localStorage.setItem(isten+'.last_plr',$('#plr_select').val()); 
		plr_form(); 
		refresh(); 
	});

	god_td.html(plr_select);
	
	var del_button = $("<span />",{'class':'ik_button'});
	del_button.click(function(){
		if(confirm("Tuti?")){
			var del_id = $('#plr_select').val();
			var ok = 0;
			for(var id in plrs){ if(del_id==id){ ok = 1; break; } }
			if(ok||del_id==''){
				delete plrs[del_id];
				localStorage.setItem(isten+'.plrs',JSON.stringify(plrs));
				localStorage.removeItem(isten+'.last_plr'); 
				purge(del_id);
				plr_form();
				refresh();
			}
		}
	});
	god_td.append(del_button);
	
	var inputs = " új #<input id='plr_id' name='plr_id' size='4' /> név:<input id='plr_name' name='plr_name' />";
	god_td.append(inputs);
	
	var save_button = $("<span />",{'class':'ik_button done'});
	save_button.click(function(){
		var new_id = $('#plr_id').val();
		var new_name = $('#plr_name').val();
		if(new_id){
			var ok = 1;
			for(var id in plrs){ if(new_id==id){ ok = 0; break; } }
			if(ok){
				plrs[new_id] = new_name;
				localStorage.setItem(isten+'.plrs',JSON.stringify(plrs));
				localStorage.setItem(isten+'.last_plr',new_id);
				clone(new_id);
				plr_form();
				refresh();
			}
		}
	});
	god_td.append(save_button);
	
	if(localStorage.getItem(isten+'.'+plr+'.invisible')=='invisible'){
		visibility = 'invisible'; setRule('tr.ik_row.done','display','none');
	}
	else{
		visibility = 'visible'; setRule('tr.ik_row.done','display','');
	}

	var hide_button = $("<span />",{'class':'ik_button '+visibility});
	hide_button.click(function(){
		if(getRule('tr.ik_row.done','display')=='none'){
			setRule('tr.ik_row.done','display','');
			localStorage.removeItem(isten+'.'+plr+'.invisible'); 
			$(this).removeClass('invisible');
			$(this).addClass('visible');
		}
		else{
			setRule('tr.ik_row.done','display','none');
			localStorage.setItem(isten+'.'+plr+'.invisible','invisible');
			$(this).removeClass('visible');
			$(this).addClass('invisible');
		}
		console.log(getRule('tr.ik_row.done','display'));
	});
	god_td.append(hide_button);
}

function purge(del_id){
	$('span.ik_button.done[id^="ik_"]',kuldi_tabla).each(function(){
		localStorage.removeItem(isten+'.'+del_id+'.'+$(this).attr('id')); 
	});
}

function clone(new_id){
	plr = $('#plr_select').val();
	$('span.ik_button.done[id^="ik_"]',kuldi_tabla).each(function(){
		localStorage.setItem(isten+'.'+new_id+'.'+$(this).attr('id'),'done');
	});
}

function refresh(){
	plr = $('#plr_select').val();
	localStorage.setItem(isten+'.last_plr',plr);
	$('span[id^="ik_"]',kuldi_tabla).each(function(){
		var status = localStorage.getItem(isten+'.'+plr+'.'+$(this).attr('id'));
		if(status!='done'){ 
			$(this).removeClass('done');
			$(this).closest('tr').removeClass('done');
		}
		else{
			$(this).addClass('done');
			$(this).closest('tr').addClass('done');
		}
	});
}

function toggle_ik(){
	var ik = isten+'.'+plr+'.'+$(this).attr('id');
	var status = localStorage.getItem(ik);
	if(status!='done'){ 
		localStorage.setItem(ik,'done'); 
		$(this).addClass('done');
		$(this).closest('tr').addClass('done');
	}
	else{
		localStorage.removeItem(ik); 
		$(this).removeClass('done');
		$(this).closest('tr').removeClass('done');
	}
}

function addGlobalStyle(css){
	$('<style />',{'type':'text/css','html':css}).appendTo('head');
}

function supports_html5_storage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function getRule(selectorText,prop){
	for(var i=0;i<document.styleSheets.length;i++){
		for(var j=0;j<document.styleSheets[i].cssRules.length;j++){
			if(document.styleSheets[i].cssRules[j].selectorText==selectorText){
				return document.styleSheets[i].cssRules[j].style[prop];
			}
		}
	}
}

function setRule(selectorText,prop,rule){
	for(var i=0;i<document.styleSheets.length;i++){
		for(var j=0;j<document.styleSheets[i].cssRules.length;j++){
			if(document.styleSheets[i].cssRules[j].selectorText==selectorText){
				document.styleSheets[i].cssRules[j].style[prop] = rule;
			}
		}
	}
}
