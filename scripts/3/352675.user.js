// ==UserScript==
// @name           Bevel versturen verbeteren
// @version        0.6.20110705.2
// @author         Lekensteyn <lekensteyn@gmail.com>
// @namespace      http://home.deds.nl/~lekensteyn/p/
// @description    Voegt diverse extra's toe aan een bevel versturen
// @include        http://nl*.tribalwars.nl/game.php?*screen=place*try=confirm*
// @include        http://nl*.tribalwars.nl/game.php?*try=confirm*screen=place*
// ==/UserScript==
(function(GM_getValue, GM_setValue){
	var weergeefInTitel = true; //true om de aankomsttijd in de titel te weergeven, false om dat niet te doen.
	/*einde configuratie*/
	
	var win=window,doc=document;
	if(!GM_getValue){
		function getCookie(n){var c='; '+doc.cookie+';',s='; '+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
		function setCookie(n,v,l){var e=encodeURIComponent,L=parseInt(l)||0,c=doc.cookie;if(L&&c.length+e(n+v).length-e(('; '+c).indexOf('; '+n+'=')+1?n+getCookie(n):'').length>4027)throw alert('Cookie "'+n+'" kon niet opgeslagen worden: te weinig vrije ruimte voor cookies!');doc.cookie=e(n)+'='+e(v)+'; max-age='+L}
		var loSt=win.localStorage,
		getValue=loSt?function(n){return loSt.getItem(n)||''}:getCookie,setValue=loSt?function(n,v){v===0||v?loSt.setItem(n,v):loSt.removeItem(n)}:function(n,v){setCookie(n,v,1e7)},getValueC=loSt?function(n){var v=getCookie(n);if(v!=''){setValue(n,v);setCookie(n,0)}else return getValue(n);return v}:getCookie;
		
		var pfx='ttgm8';GM_getValue=function(n){return getValue(pfx+n)};GM_setValue=function(n,v){setValue(pfx+n,v)};
	}
	var nightBonus = [1, 7];
	if(location.host.indexOf('nl1.') != -1) nightBonus[0] = 0;
	var f=document.forms, a;
	if(!f.length) ;
	else{
		f = f[0];
		if(f.elements.namedItem('action_id')){
			if(!f.elements.namedItem("save_default_attack_building") && (b=f.elements.namedItem('building'))){
				var buildings = {};
				for(var i=0; i<b.options.length; i++) buildings[b.options[i].value] = b.options[i].label;
				var B = GM_getValue('building');
				if(B && buildings[B]) b.value = B;
				else B = '-';
				var s = document.createElement('input');
				var bc = ' Opgeslagen instelling: ';
				var c = document.createTextNode(bc+(buildings[B]?buildings[B]:'-'));
				s.type = 'button';
				s.style.border = '2px solid green';
				b.addEventListener('change', function(){
					s.style.borderColor = this.value == GM_getValue('building') ? 'green' : 'red';
				}, true);
				s.value = 'Wijzig instelling';
				s.addEventListener('click', function(){
					GM_setValue('building', b.value);
					this.nextSibling.nodeValue = bc+buildings[b.value];
					this.style.borderColor = 'green';
				}, true);
				b.parentNode.appendChild(s);
				b.parentNode.appendChild(c);
			}
			var d = document.getElementById('date_arrival');
			if(d){
				function d2(s){return parseFloat(s)<10?'0'+s:s;}
				var timeDiffC = new Date();
				var timeDiff = new Date();
				var sd = document.getElementById('serverDate').innerHTML.split('/');
				var sh = document.getElementById('serverTime').innerHTML.split(':');
				timeDiff.setDate(sd[0], sd[1]-1, sd[2]);
				timeDiff.setHours(sh[0], sh[1], sh[2]);
				timeDiff = timeDiff.getTime()-timeDiffC.getTime();
				var et = d.parentNode.previousSibling;
				while(et.nodeType != 1) et = et.previousSibling;
				et = et.cells[1].firstChild.nodeValue.split(':');
				var hour = parseFloat(et[0]);
				et = 1000*(hour*3600 + et[1]*60 + parseFloat(et[2])) + (et[3]?parseFloat(et[3]):0);
				var tr = d.parentNode.parentNode.rows[2].cells[1].firstChild.nodeValue == '' || f.elements.namedItem('attack') != null;
				if(tr){
					tr = 0;
					for(var i=f.elements.length-2; i>=0; i--){
						if(f.elements[i].type != 'hidden' || isNaN(f.elements[i].value)) continue;
						if(f.elements[i].name == 'spy') continue;
						tr += 1*f.elements[i].value;
						if(f.elements[i].name == 'spear' || tr > 0) break;
					}
					tr = tr > 0;
				}
				var m;
				var k=function(){
					var T = new Date();
					T.setTime(T.getTime()+timeDiff+et);
					var h = new Date();
					if(h.getMonth() == T.getMonth() && h.getDate() == T.getDate()) a = 'vandaag';
					else{
						h.setTime(h.getTime() + 86400000);
						if(h.getMonth() == T.getMonth() && h.getDate() == T.getDate()) a = 'morgen';
						else{
							a = 'op '+d2(T.getDate())+'.'+d2(T.getMonth()+1)+'.';
						}
					}
					h = T.getHours();
					a += ' om '+(m=d2(h)+':'+d2(T.getMinutes())+':'+d2(T.getSeconds()));
					if(weergeefInTitel){
					try{
						top.document.title = m+'-W'+location.host.match(/\d+/);
					}
					catch(e){}
					}
					if(tr && h >= nightBonus[0] && h < nightBonus[1]) a += '<br /><span class="warn">Nachtbonus actief!</span>';
					d.innerHTML = a;
				};
				k();
				setInterval(k, 1000);
			}
		}
	}
})(typeof unsafeWindow=='undefined'?0:GM_getValue,typeof unsafeWindow=='undefined'?0:GM_setValue)
