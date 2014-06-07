// ==UserScript==
// @name eksi hayvan ara patch
// @description ek$i hayvan ara patch
// @include http://sozluk.sourtimes.org/index.asp*
// ==/UserScript==

if(window.location.href.indexOf("index.asp") >= 0){
	if(window.opera){
		window.opera.defineMagicFunction('os', function(realFunc, thisRef, id, f) {
			if(document.getElementById('bugun_dr') == null){
				var container = G('amain').getElementsByTagName('fieldset')[1];
				var bugun = document.createElement('input');
				bugun.className = 'but';
				bugun.type = 'button';
				bugun.value = 'bugün';
				bugun.id = 'bugun_dr';
				bugun.onclick = function() {
					var dateComps = container.getElementsByTagName('select');
					var day = dateComps[0];
					var month = dateComps[1];
					var year = dateComps[2];
					
					var now = new Date();
					
					day.selectedIndex = now.getDate();
					month.selectedIndex = now.getMonth() + 1;
					year.selectedIndex = 1;
				};
				
				var temizle = document.createElement('input');
				temizle.className = 'but';
				temizle.type = 'button';
				temizle.value = 'temizle';
				temizle.id = 'temizle_dr';
				temizle.onclick = function() {
					var dateComps = container.getElementsByTagName('select');
					var day = dateComps[0];
					var month = dateComps[1];
					var year = dateComps[2];
					
					day.selectedIndex = 0;
					month.selectedIndex = 0;
					year.selectedIndex = 0;
				};
				
				container.appendChild(document.createElement('br'));
				container.appendChild(bugun);
				container.appendChild(temizle);
			}
			realFunc.call(thisRef);
		});
	}
	else{
		var script = document.createElement("script");
		script.setAttribute('type', 'text/javascript');
		script.text = "function createInterceptor(fcn, scope) { var method = this; return function() { var me = this, args = arguments; fcn.target = me; fcn.method = method; return (fcn.apply(scope || me || window, args) !== false) ? method.apply(me || window, args) : null; }; }; function ehemm(){if(document.getElementById('bugun_dr') == null){ var container = G('amain').getElementsByTagName('fieldset')[1]; var bugun = document.createElement('input'); bugun.className = 'but'; bugun.type = 'button'; bugun.value = 'bugün'; bugun.id = 'bugun_dr'; bugun.onclick = function() { var dateComps = container.getElementsByTagName('select'); var day = dateComps[0]; var month = dateComps[1]; var year = dateComps[2]; var now = new Date(); day.selectedIndex = now.getDate(); month.selectedIndex = now.getMonth() + 1; year.selectedIndex = 1; }; var temizle = document.createElement('input'); temizle.className = 'but'; temizle.type = 'button'; temizle.value = 'temizle'; temizle.id = 'temizle_dr'; temizle.onclick = function() { var dateComps = container.getElementsByTagName('select'); var day = dateComps[0]; var month = dateComps[1]; var year = dateComps[2]; day.selectedIndex = 0; month.selectedIndex = 0; year.selectedIndex = 0; }; container.appendChild(document.createElement('br')); container.appendChild(bugun); container.appendChild(temizle); }}; try{os=createInterceptor.call(os, ehemm );}catch(exx){alert(exx);}";
		document.body.appendChild(script);
	}
}