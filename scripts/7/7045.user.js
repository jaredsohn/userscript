// ==UserScript==
// @name	Banco de Chile Depósitos
// @namespace	http://www.hardings.cl/hacking/greasemonkey/bancochile
// @description	Corrige las deficiencas en los depositos a plazos. (basado en versión de Andrés Junge <ajunge@totexa.cl>)
// @include	https://www.bancochile.cl/cgi-bin/cgi_capsolnew*
// @include	http://www.bancochile.cl/cgi-bin/cgi_siminv00
// @include	https://www.bancochile.cl/cgi-bin/cgi_capctenew
// ==/UserScript==

// Definido en cgi_capsolnew
unsafeWindow.levantar_tab = function(nombreTab) {
   forms_base=unsafeWindow.Reconoce_Form('Tab2','FORM2');
   if (navigator.appName=='Netscape'){
      document.getElementById('Tab1').style.visibility="hidden";
      document.getElementById('Tab2').style.visibility="hidden";
      document.getElementById(nombreTab).style.visibility="visible";
   } else {
      document.all['Tab1'].style.visibility="hidden";
      document.all['Tab2'].style.visibility="hidden";
      document.all[nombreTab].style.visibility="visible";
   }
}

// Definido en cgi_capsolnew
unsafeWindow.Reconoce_Form = function(id_Tab, id_form) {
   if (navigator.appName=='Netscape')
      forms_base=document.getElementsByName(id_form)[0];
   else 
      forms_base=document.forms[id_form];
   
 return (forms_base);
}

// Definido en cgi_capsolnew
unsafeWindow.popup = function(Tabla,forma,pagina) {
 forms_base = unsafeWindow.Reconoce_Form(Tabla,forma);      
 portal = forms_base.elements.namedItem("pagina").value;
 ruta="https://www.bancochile.cl/cgi-bin/navega?pagina=captaciones/"+pagina; 
 if (pagina='ayuda') {
   window.open(ruta,"V2", "resizable=no,menubar=no,location=no,toolbar=no,status=no,scrollbars=yes,directories=no,width=420,height=420");
 } else {
   window.open(ruta,"V2", "resizable=no,menubar=no,location=no,toolbar=no,status=no,scrollbars=no,directories=no,width=420,height=420");
 }
}

// Definido en cgi_capsolnew
unsafeWindow.popup_tasa = function(Tabla,forma,pagina) {
 forms_base=unsafeWindow.Reconoce_Form(Tabla,forma);
 portal = forms_base.elements.namedItem("pagina").value;
 ruta2="https://www.bancochile.cl/cgi-bin/cgi_pizarra?pagina=inversiones/captaciones/"+pagina;
 
 if (pagina='depplaz') {
   window.open(ruta2,"V2", "resizable=no,menubar=no,location=no,toolbar=no,status=no,scrollbars=yes,directories=no,width=550,height=400");
 }
}

// Definido en cgi_capsolnew
unsafeWindow.valida_producto = function(Tabla,forma) {
  forms_base=unsafeWindow.Reconoce_Form(Tabla,forma);      
  forms_base.elements.namedItem("Recalcular").value = "0"; 
  forms_base.getElementsByTagName("img").namedItem("msg1").src = "img/m0.gif";
  if (forms_base.name=="FORM2") {
     forms_base.elements.namedItem("Retsol").value = "NULL";
     tipo  = forms_base.elements.namedItem("TipoOperacion").options[forms_base.elements.namedItem("TipoOperacion").selectedIndex].value;
     if (tipo == "" || unsafeWindow.VerificaCeros(tipo))                                      
     {
       forms_base.getElementsByTagName("img").namedItem("msg1").src = "img/m8.gif";
       return false;                                                              
     }  
     unsafeWindow.SetMoneda(Tabla,forma);
  }
  return true;                                                                  
}                                                                               

// Definido en cgi_capsolnew
unsafeWindow.valida_monto = function(forma) {
  forma.getElementsByTagName("img").namedItem("msg1").src = "img/m0.gif";
  valor  = forma.elements.namedItem("Capital").value;
  forma.elements.namedItem("Recalcular").value = "0";
  if (forma.name=="FORM1"){
     minimo = forma.elements.namedItem("Minimo").value;
     minimo = desformat(minimo);
  }
  if (valor == "" || unsafeWindow.VerificaCeros(valor))
  {
     forma.getElementsByTagName("img").namedItem("msg1").src = "img/m2.gif";
     forma.elements.namedItem("Retsol").value = "NULL";
     return false;
  }
  valor = unsafeWindow.desformat(valor);
  if (!unsafeWindow.ValidaValor(valor,forma,2,11,4))                                               
  {                                                                             
    forma.getElementsByTagName("img").namedItem("msg1").src = "img/m1.gif";                         
    forma.elements.namedItem("Retsol").value = "NULL";
    return false;                                                            
  }
  if (forma.name=="FORM1") {
     if ( parseInt(valor,11) < parseInt(minimo,11) ) {
       forma.getElementsByTagName("img").namedItem("msg1").src = "img/m3.gif";
       forma.elements.namedItem("Retsol").value = "NULL";
       return false; 
     }
  }
  return true;
}                                         

// Definido en cgi_capsolnew
unsafeWindow.valida_plazo = function(f) {
  f.elements.namedItem("Recalcular").value = "0";
  plazo = f.elements.namedItem("Plazo").value;
  plazonum = "";

  if (f.name=="FORM1") {
     tipo  = f.elements.namedItem("TipoOperacion").value;
     for (h=0; h < plazo.length; h++) {                                                                     
        if (plazo.charAt(h)!= "0"){
           plazonum = plazonum + plazo.charAt(h);
        }
     }
     plazo = plazonum;
  }
  else
     tipo  = f.elements.namedItem("TipoOperacion").options[f.elements.namedItem("TipoOperacion").selectedIndex].value;
  if (plazo == "" || unsafeWindow.VerificaCeros(plazo))
  {
    f.getElementsByTagName("img").namedItem("msg1").src = "img/m5.gif";
    f.elements.namedItem("Retsol").value = "NULL";
    return false;
  }
  else if (!unsafeWindow.Numerico(plazo))
  {
    f.getElementsByTagName("img").namedItem("msg1").src = "img/m4.gif";
    f.elements.namedItem("Retsol").value = "NULL";
    return false;
  }
  if(tipo == "1100100"){
    if(parseInt(plazo) >= 30 && parseInt(plazo) <= 89){
      return true;
    } 
    else{
      f.getElementsByTagName("img").namedItem("msg1").src = "img/m6.gif";
    }
  }

  if(tipo == "1110198"){
    if(parseInt(plazo) >= 90 && parseInt(plazo) <= 365){
      return true;
    } 
    else{
      f.getElementsByTagName("img").namedItem("msg1").src = "img/m6.gif";
    }
  }
  if(tipo == "1200100"){
    if(parseInt(plazo) == 30 || parseInt(plazo) == 35 || parseInt(plazo) == 60){
      return true;
    } 
    else{
      f.getElementsByTagName("img").namedItem("msg1").src = "img/m6.gif";
    }
  }
  //if(tipo == "1210100"){
  //  if(parseInt(plazo) == 90 || parseInt(plazo) == 180){
  //    return true;
  //  } 
  //  else{
  //    f.elements["msg1"].src = "img/m6.gif";
  //  }
  //}
  if(tipo == "1210198"){
    if(parseInt(plazo) == 90 || parseInt(plazo) == 91){
      return true;
    } 
    else{
      f.getElementsByTagName("img").namedItem("msg1").src = "img/m6.gif";
    }
  }
}

// Definido en cgi_capsolnew
unsafeWindow.valida = function(id_Tab,f,cgi) {
 forms_base=unsafeWindow.Reconoce_Form(id_Tab,f);
 recal = forms_base.elements.namedItem("Recalcular").value;
 recal2= forms_base.elements.namedItem("Retsol").value;
 forms_base.getElementsByTagName("img").namedItem("msg1").src = "img/m0.gif";
 if ( (cgi == "cgi_capctenew") && (recal == "0")) {
     forms_base.getElementsByTagName("img").namedItem("msg1").src = "img/m7.gif";
   }  
  else if ( (!unsafeWindow.valida_producto(id_Tab,f)) || (!unsafeWindow.valida_plazo(forms_base)) || (!unsafeWindow.valida_monto(forms_base)) ){ 
      forms_base.elements.namedItem("Recalcular").value = "0";
      recal = forms_base.elements.namedItem("Recalcular").value;     
    }
   else {
     if (f=='FORM2'){
       forms_base.elements.namedItem("GLTOPERACION").value = forms_base.elements.namedItem("TipoOperacion").options[forms_base.elements.namedItem("TipoOperacion").selectedIndex].text;
       texto2 = forms_base.elements.namedItem("TipoOperacion").options[forms_base.elements.namedItem("TipoOperacion").selectedIndex].text;
        texto1= "";
        to = forms_base.elements.namedItem("TipoOperacion").options[forms_base.elements.namedItem("TipoOperacion").selectedIndex].value.substring(0,2);
        if (to=="11") {
          texto1 = "DEPOSITO A PLAZO FIJO ";
        }
        else { 
          texto1 = "DEPOSITO A PLAZO INDEFINIDO RENOVABLE ";
        }
     }
     if (f=='FORM1'){ 
       forms_base.elements.namedItem("TipoOperOf").value = forms_base.elements.namedItem("TipoOperacion").value;
       forms_base.elements.namedItem("CapitalOf").value = forms_base.elements.namedItem("Capital").value;
       forms_base.elements.namedItem("PlazoOf").value = forms_base.elements.namedItem("Plazo").value;
        texto1= "";
        texto2 = forms_base.elements.namedItem("GLTOPERACION").value;
     }
     forms_base.elements.namedItem("Recalcular").value = "1";
     forms_base.action= "/cgi-bin/" + cgi;
     forms_base.elements.namedItem("GLTOPERACION").value = texto1 + texto2;
     forms_base.submit();
     return true;
   }
 }

// Definido en cgi_capsolnew
unsafeWindow.SetMoneda = function(Tabla,f) {
  forms_base=unsafeWindow.Reconoce_Form(Tabla,f);
  tm = forms_base.elements.namedItem("TipoOperacion").options[forms_base.elements.namedItem("TipoOperacion").selectedIndex].value.substring(5,7);
  for (i = forms_base.elements.namedItem("moneda").options.length; i > 0; i--)
  {
   forms_base.elements.namedItem("moneda").options[i] = null;
  }
  if (tm == "00") {
     forms_base.elements.namedItem("moneda").options[0] = new Option("PESOS ");
     forms_base.elements.namedItem("moneda").options[0].value = "PESOS ";
     forms_base.elements.namedItem("moneda").options[0].selected = true; 
  }
  else if (tm == "98") {
     forms_base.elements.namedItem("moneda").options[0] = new Option("U.F.  ");
     forms_base.elements.namedItem("moneda").options[0].value = "U.F.  ";
     forms_base.elements.namedItem("moneda").options[0].selected = true; 

  }else {
     forms_base.elements.namedItem("moneda").options[0] = new Option("PESOS ");
     forms_base.elements.namedItem("moneda").options[0].value = "PESOS ";
     forms_base.elements.namedItem("moneda").options[0].selected = true; 
  }
  return true;
}

// Definido en cgi_capsolnew
unsafeWindow.SetPro = function(f) {
//alert("SETPRO");
  f.elements.namedItem("Recalcular").value = "0";
  op = f.elements.namedItem('TipoOperacion').options[0].value;
  if ((f.elements.producto[0].checked)){
     unsafeWindow.Borra_Select("TipoOperacion",f);
     unsafeWindow.Muestra_NewSelect("TipoOperacion",f,"11",op);
  }
  if ((f.elements.producto[1].checked)){
     unsafeWindow.Borra_Select("TipoOperacion",f);
     unsafeWindow.Muestra_NewSelect("TipoOperacion",f,"12",op);
  }
 
 return true;
}

// Definido en cgi_capsolnew
unsafeWindow.Muestra_NewSelect = function(obj,f,tipo,oldTOper)
{
  //oldTOper = f.elements["TipoOperacion"].options[f.elements["TipoOperacion"].selectedIndex].value;
  if (oldTOper=="") {
     if (tipo=="11") {
       f.elements.namedItem(obj).options[0].value = "1100100";
       oldTOper = f.elements.namedItem(obj).options[f.elements.namedItem(obj).selectedIndex].value;
       f.elements.namedItem("GLTOPERACION").value="$ DESDE 30 A 89 DIAS";
     }
     else {
       f.elements.namedItem(obj).options[0].value = "1200100";
       oldTOper = f.elements.namedItem(obj).options[f.elements.namedItem(obj).selectedIndex].value;
       f.elements.namedItem("GLTOPERACION").value="$ 30,35,60 DIAS";
    }
  }
  if (tipo=="11"){ 
     f.elements.namedItem(obj).options[0] = new Option("$ DESDE 30 A 89 DIAS");
     f.elements.namedItem(obj).options[0].value = "1100100";
     //f.elements.namedItem(obj).options[1] = new Option("UF DESDE 90 A 365 DIAS");
     //f.elements.namedItem(obj).options[1].value = "1110198";
     if(oldTOper=="1100100") {
       f.elements.namedItem(obj).options[0].selected = true; 
     }
     else {
       //f.elements.namedItem(obj).options[1].selected = true; 
     }
  }
  if (tipo=="12"){ 
     f.elements.namedItem(obj).options[0] = new Option("$ 30,35,60 DIAS");
     f.elements.namedItem(obj).options[0].value = "1200100";
     f.elements.namedItem(obj).options[0].selected = true;
       //f.elements.namedItem(obj).options[1] = new Option("$ 90,180 DIAS");
       //f.elements.namedItem(obj).options[1].value = "1210100";
     //f.elements.namedItem(obj).options[1] = new Option("UF 90,91 DIAS");
     //f.elements.namedItem(obj).options[1].value = "1210198";
     if (oldTOper=="1200100") {
       f.elements.namedItem(obj).options[0].selected = true; 
     }
      //else if (oldTOper=="1210100")
      //  f.elements.namedItem(obj).options[1].selected = true; 
     else {
       //f.elements.namedItem(obj).options[1].selected = true; 
     }
  }
  unsafeWindow.SetMoneda("Tab2","FORM2");
}

// Definido en cgi_capsolnew
unsafeWindow.MuestraCheck = function(valor)
{
  f=unsafeWindow.Reconoce_Form('Tab2','FORM2');
  op = f.elements.namedItem('TipoOperacion').options[0].value;
  if (valor=="11")
      buscaElemento(f, "producto", 0).checked=true;
  if (valor=="12")
      buscaElemento(f, "producto", 1).checked=true;
  unsafeWindow.Muestra_NewSelect("TipoOperacion",f,valor,op);
}

// función auxiliar de MuestraCheck.
function buscaElemento(form, nombre, n) {
  var i = -1, j = 0;
  for (var j = 0; j < form.length; j++) {
    if (form.elements[j].name == nombre) {
    	i++;
    	if (i == n) {
    	  return form.elements[j];
    	}
    }
  }
  return null;
}

// Definido en cgi_capsolnew
unsafeWindow.ValidaValor = function(forma, objeto,tipo, lentero, ldecimal)
/*** 1 tasa  2  Monto ****/
{
  aux="";
  aux1="";
  flag=0;
  for (h=0; h < forma.length; h++)
  {
     if ((forma.charAt(h) == "." || forma.charAt(h) == ",") && flag==0)
     {
       flag=1
     }
     else{
       if (flag==1)
         aux1=aux1 + forma.charAt(h);
       else
         aux=aux + forma.charAt(h);
       if (isNaN(parseInt(forma.charAt(h),10)))
       {
         return false;
       }
   }
 }
 if (aux.length > lentero || aux1.length >ldecimal)
    return false;
 if (tipo==1){
    document.forms[0].TasaEntero.value = aux;
    document.forms[0].TasaDecimal.value = aux1;}
 else{
    objeto.elements.namedItem("CapitalFinalE").value = aux;
    objeto.elements.namedItem("CapitalFinalD").value = aux1;
 }
 return true;
}

// definido en cgi_capctenew
unsafeWindow.envia_simulacion = function(Tabla,forma) {
     if (navigator.appName=='Netscape')
        if (document.getElementById) //es NS6+
          f=document.getElementsByName('formcapt')[0];
        else 
          f=document.layers['menu'].document.forms['formcapt'];
     else
        f=document.forms[0];
     if (f.elements.namedItem("retorno").value == "0") {
        alert("En capctenew 3");
        unsafeWindow.esconder();
        f.elements.namedItem("retorno").value="1";
        document.forms[0].action = document.forms[0].action + "cgi_caprnvnew";
        return true;
     }
}
