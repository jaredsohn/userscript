// ==UserScript==
// @name           Minimizar citas
// @namespace      http://userscripts.org
// @description    Muestra las citas de forocoches en un tamaño reducido con barra de desplazamiento, con la opción de ver la cita en su tamaño normal.
// @version		   1.0
// @include        http://www.forocoches.com/foro/showthread.php?*
// ==/UserScript==

var citas = document.getElementsByTagName("div");
var minimizado = "25em";

script = 'javascript:if (this.nextSibling.style.maxHeight=="none")' + 
                    ' this.nextSibling.style.maxHeight="'+minimizado+'";' + 
                  ' else' + 
                    ' this.nextSibling.style.maxHeight="none";' +
					'void 0;';

for(i = 0; i < citas.length; i++){
	
	if(citas[i].innerHTML == "Cita:"){
				
		hermano=citas[i].nextSibling.nextSibling;
		            
		citas[i].innerHTML="<a href='javascript:void 0;' onclick='"+ script + "'>Ver Cita</a>";

		citas[i].parentNode.removeChild(hermano);
		
		oculto = document.createElement("div");
	
		oculto.style.maxHeight = minimizado;
		oculto.style.overflow = "auto";
		
		oculto.appendChild(hermano);
		
		citas[i].appendChild(oculto);
		
	}
	
}
