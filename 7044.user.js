// ==UserScript==
// @name           Pago Servipag - Banco de Chile
// @namespace      http://www.hardings.cl/hacking/greasemonkey/bancochile
// @description    Corrige problemas de Javascript para poder realizar pagos en Servipag
// @include        https://www.empresas.bancochile.cl/cgi-bin/cgibanco
// ==/UserScript==

// Este es el inicia a utilizar antes de seleccionar el medio de pago
inicia1 = function()
{
  var frm = document.getElementsByName('forma')[0];
  var sel = frm.elements.namedItem("MPKEY");
  var med = frm.elements.namedItem("MEDIO");

  seguir = false;
  actMed = "";
  frm.elements.namedItem("ACTION").value = "PM";

  if (unsafeWindow.getCookie("MPSTAT") != "SelMed") {
    if (med.options.length > 0)
      med.selectedIndex = 0;
    unsafeWindow.selMedio();
  }
  else {
    document.cookie = "MPSTAT=LM; PATH=/;";
    if (med.options.length > 0) {
      med.selectedIndex = "0" + unsafeWindow.getCookie("SelMed");
      actMed = "0" + unsafeWindow.getCookie("ActMed");
    }
    if (sel.options.length > 0)
      sel.selectedIndex = 0;
    unsafeWindow.showSaldo();
  }
}

// Este es el inicia a utilizar después de haber seleccionado el medio de pago
inicia2 = function()
{
  var stat = getCookie ("MPSTAT");

  if (stat == "PP") {
//    url = escape("www.servipag.com/bcoChile/llamacom.asp?ACTION=CM");
    url = escape("https://www.empresas.bancochile.cl/cgi-bin/cgibanco?ACTION=CM&wait&HTM_BASE=per/");
    document.location.href = "https://www.empresas.bancochile.cl/eft/html/per/pagina_espera2.html?" + url;
  }
  else if (stat == "ER")
    window.history.go(-1);
  else
    window.history.go(-3);
}

inicia3 = function()
{
  seguir = false;
}

function getCookie(Name)
{
  var search = Name + "=";
  if (document.cookie.length > 0) {
    offset = document.cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length ;
      end = document.cookie.indexOf(";", offset) ;
      if (end == -1)
	end = document.cookie.length;
      return unescape(document.cookie.substring(offset, end));
    } 
  }
  return "";
}

var miURL = '' + unsafeWindow.salir;
if (miURL != '') {
  var comienzoURL = "var url = ";
  var indexURL = miURL.indexOf(comienzoURL, 0) + comienzoURL.length;
  var indexURLFin = miURL.indexOf(";", indexURL);
  miURL = miURL.substring(indexURL, indexURLFin);
  //alert("miURL = " + miURL);
}

// la función salir también es diferente en las diversas páginas...
salir1 = function()
{
  var acc = "L";
  var url = eval(miURL);
  //alert("en salir: url = " + miURL);

  if (acc == "C" && ! seguir) {
    seguir = true;
    this.close();
    if (url != "") {
      window.opener.parent.location.href = url;
      document.notifica.submit();
    }
  }
  else if (acc == "L" && ! seguir) {
    seguir = true;
    document.location.href = url;
  }
  else if (acc == "P" && ! seguir) {
    seguir = true;
    document.salida.submit();
  }
  else if (acc == "B" && ! seguir) {
    seguir = true;
    window.history.go(-2);
  }
  return (true);
}

salir3 = function(tipo)
{
  var acc = "L";
  var url = miURL;
  var cod;

  if (acc == "C" && ! seguir) {
    seguir = true;
    this.close();
    if (url != "")
      window.opener.parent.location.href = url;
  }
  else if (acc == "L" && ! seguir) {
    seguir = true;
    if (tipo == 1)
      document.location.href = url;
    else {
      var win, nombre = window.name;
      nombre = "";

      if (nombre == null || nombre == "_self" || nombre == "_parent" ||
	  nombre == "_top" || nombre == "_blank" || nombre == "")
        win = window.open(url);
      else
        win = window.open(url,nombre);
    }
  }
  else if (acc == "P" && ! seguir) {
    seguir = true;
    document.salida.submit();
  }
  else if (acc == "B" && ! seguir) {
    seguir = true;
    window.history.go(-4);
  }
  return (true);
}

// determinamos qué inicia y salir tenemos que usar.
var miMPSTAT = unsafeWindow.getCookie("MPSTAT");
var action = document.getElementsByName('forma')[0].elements.namedItem("ACTION").value;
//if (action == "PM") {
if (miMPSTAT == "PP" || miMPSTAT == "ER") {
  //alert("etapa 2, action = " + action);
  // action = PM
  unsafeWindow.inicia = inicia2;
  unsafeWindow.salir = salir1;
} else if (miMPSTAT == "CP") {
  //alert("etapa 3, action = " + action);
  unsafeWindow.inicia = inicia3;
  unsafeWindow.salir = salir3;
} else if (miMPSTAT == "SelMed" || miMPSTAT == "LM") {
  //alert("etapa 1, action = " + action);
  // action = LP
  unsafeWindow.inicia = inicia1;
  unsafeWindow.salir = salir1;
} else {
  alert("UserScript Greasemonkey posiblemente incompleto:\n MPSTAT = " + miMPSTAT + ", asmumiendo página 1");
  unsafeWindow.inicia = inicia1;
  unsafeWindow.salir = salir1;
}

unsafeWindow.envia = function()
{
  seguir = true;
  document.getElementsByName('forma')[0].submit();
  return (true);
}

var elAMedio = '' + unsafeWindow.selMedio;
if (elAMedio != '') {
  var comienzoAMedio = "var aMedio = ";
  var indexComienzo = elAMedio.indexOf(comienzoAMedio, 0) + comienzoAMedio.length;
  var indexFin = elAMedio.indexOf(");", indexComienzo) + 1;
  elAMedio = elAMedio.substring(indexComienzo, indexFin);
  //alert("elAMedio = " + elAMedio);
}

unsafeWindow.selMedio = function()
{
  var aMedio = eval(elAMedio);
  var frm = document.getElementsByName('forma')[0];
  var med = frm.elements.namedItem("MEDIO");
  var sel = frm.elements.namedItem("MPKEY");
  var alen = aMedio.length;
  var medval, i, opt;

  if (med.options.length == 0)
    return;

  if (document.all) {
    medval = med.value;
    if (medval == actMed)
      return;
    for (i = sel.options.length; i > 0; i--)
      sel.remove(i-1);
    actMed = medval;
    for (i = 0; i < alen; i += 4) {
      if (aMedio[i] == actMed) {
        opt = document.createElement("OPTION");
        opt.text = aMedio[i+2];
        opt.value = aMedio[i+1] + "|" + aMedio[i] + "|" + aMedio[i+2] + "|" + aMedio[i+3];
        sel.add(opt);
      }
    }
    if (sel.options.length > 0)
      sel.selectedIndex = 0;
    unsafeWindow.showSaldo();
  }
  else {
    medval = med.options[med.selectedIndex].value;
    if (medval == actMed)
      return;
    for (i = sel.options.length; i > 0; i--)
      sel.options[i-1] = null;
    actMed = medval;

    n = 0;
    for (i = 0; i < alen; i += 4) {
      if (aMedio[i] == actMed) {
	opt = new Option(aMedio[i+2], aMedio[i+1] + "|" + aMedio[i] + "|" + aMedio[i+2] + "|" + aMedio[i+3]);
	sel.options[n] = opt;
	n++;
      }
    }
    if (navigator.userAgent.indexOf("Netscape6") > 0 || navigator.appName=='Netscape')
     unsafeWindow.showSaldo();
    else {
      document.cookie = "MPSTAT=SelMed; PATH=/;";
      var noMed = med.selectedIndex;
      document.cookie = "SelMed=" + noMed.toString();
      document.cookie = "ActMed=" + actMed;
      seguir = true;
      history.go(0);
    }
  }
}

unsafeWindow.showSaldo = function()
{
  var sel = document.getElementsByName('forma')[0].elements.namedItem("MPKEY");
  var i, val, td;

  if ("" == "S")
    return;

  if (sel.options.length > 0) {
    if (document.all) {
      td = document.all.item("tdSaldo");
      val = sel.value;
      i = val.lastIndexOf ("|");
      if (i > 0) {
        val = val.substr(i + 1);
        if (val == "")
	  val = "Sin informacion";
      }
      else
	val = "Sin informacion";
      td.innerText = val;
    }
    else {
      val = sel.options[sel.selectedIndex].value;
      i = val.lastIndexOf ("|");
      if (i > 0) {
	val = val.substr(i + 1);
	if (val == "")
	  val = "Sin informacion";
      }
      else
	val = "Sin informacion";
      document.getElementsByName('forma')[0].elements.namedItem("fldSaldo").value = val;
    }
  }
}

unsafeWindow.verSaldo = function()
{
  var mpkVal = document.getElementsByName('forma')[0].elements.namedItem("MPKEY").options[document.getElementsByName('forma')[0].elements.namedItem("MPKEY").selectedIndex].value;
  var wsldFace = "toolbar=No,location=No,directories=no,status=Yes,menubar=no,scrollbars=auto,";
      wsldFace = wsldFace + "resizable=yes,close=yes,width=320,height=150,top=300,left=300";
  var wsldName = "Saldo"
  var urlCgi = escape("https://www.empresas.bancochile.cl/cgi-bin/cgibanco");

  wsldWin = window.open("https://www.empresas.bancochile.cl/eft/html/ver_saldo.html?" + urlCgi + "&" + mpkVal, wsldName, wsldFace);
  wsldWin.focus();
}
