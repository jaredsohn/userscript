// ==UserScript==
// @Autor         Omar Antonio Melendez
// @Version		  1.0
// @name          HideSalesMoney
// @namespace     HideSalesMoney
// @description   Esconde el saldo disponible para la venta
// @include      http://www.cargamovil.com.mx/*
// ==/UserScript==

var elmDeleted = document.getElementById("ctl00_ContentPlaceHolder1_Sales_accountBalance_LabelSalesBalance");
var parentcell = elmDeleted.parentNode;
var mysaldo = parentcell.childNodes[1];
parentcell.innerHTML = '';
parentcell.appendChild(mysaldo);
myspan = document.createElement('span')
myspan.innerHTML = "Saldo";
myspan.style.cursor = "pointer";
myspan.style.color = "blue";
myspan.setAttribute("onmouseover",'this.innerHTML = document.getElementById("ctl00_ContentPlaceHolder1_Sales_accountBalance_LabelSalesBalance").innerHTML;');
myspan.setAttribute("onmouseout",'this.innerHTML = "Saldo"');
parentcell.appendChild(myspan);
elmDeleted.style.visbility = 'hidden';
elmDeleted.style.display = 'none';
//Gracias Omar del parte del Equipo de Recargas Gamma!!! 
//Este script es para los clientes de Recargas Gamma. 