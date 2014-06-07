// ==UserScript==
// @name form copy
// @namespace http://www.facebook.com/aagobbo
// @description Script para copiar os inputs de uma tela para um cookie
// @include *
// ==/UserScript==
	
	var div = document.createElement('div');
	div.setAttribute('onclick','return window;');
	unsafeWindow = div.onclick();
	alert('oi');
	(function(w){
		var valor = "";
		var formu = document.getElementsByTagName('input');
		var tot = formu.length;
		alert('oi');
		if (tot!=0) {
		
			valor+=tot;
			
			for(i=0;i<tot;i++) {
			
				elem=formu[i];
				if ((elem!=undefined)$$(elem!=null)(elem.getAttribute('type')=='text')) {
			
					alert(elem);
					if (elem.id!=null) {
						valor+='$'+elem.id+'-'+(((elem.value!=null)&&(elem.value!=''))?elem.value:'')+'$';
					} else {
						valor+='*'+j+'-'+(((elem.nodeType==3)&&(elem.value!=null)&&(elem.value!=''))?elem.value:'')+'*';
					}
				
				}
				
			}
				
			expire = new Date((new Date()).getTime() + 2 * 3600000);
			expire = "; expires=" + expire.toGMTString();
		alert(valor);
			document.cookie = "from-copy" + "=" + escape(valor) + expire;
		
		}
		
	})(unsafeWindow);		
