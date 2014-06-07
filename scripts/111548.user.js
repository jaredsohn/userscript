// ==UserScript==
// @name           TuSecretoLink
// @namespace      TuSecreto
// @description    Links a Secretos referenciados
// @include        *tusecreto.com.ar/*
// ==/UserScript==

function esNumerico(p){
	 if (p == '0' || p == '1' || p == '2' || p == '3' || p == '4' || p == '5' || p == '6' || p == '7' || p == '8' || p == '9')
            return true;
        return false;
}

function analizar_referencias(texto){
	var maxS=8;
	var minS=5;
	var lista=new Array();
	for (x = 0; x < texto.length-7; x++)
        {
            for (y = 0; y < maxS; y++)
            {
                if (!esNumerico(texto[x + y]))
                {
                	if(y>minS){
                		numeroReferencia = texto.substring(x, x+y);
                		lista[lista.length]=numeroReferencia;
                		x=x+y;
                	}
                	y = maxS;
                }                
            }
        }
	return lista;
}

var ps=document.getElementsByTagName("p");
for(c=0;c<ps.length;c++){
   
   if(ps[c].getAttribute("class")=="secr_texto"){
	var referencias=analizar_referencias(ps[c].textContent);
	for(n=0;n<referencias.length;n++){
		ps[c].innerHTML=ps[c].innerHTML.replace(referencias[n],"<a href='http://www.tusecreto.com.ar/"+referencias[n]+"' target='_blank'>"+referencias[n]+"</a>");
	}

   }
   
}



