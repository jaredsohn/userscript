// ==UserScript==
// @Autor         Omar Antonio Melendez
// @Version 	  1.0
// @name          CargaMovilSalesConfirmation
// @namespace     CargaMovilSalesConfirmation
// @description   Confirmacion de Venta en Cargamovil
// @include      http://www.cargamovil.com.mx/*
// ==/UserScript==

myhead = document.getElementsByTagName("head")[0];//MYHEAD SE DECLARA Y SE LE ASIGNA EL CONTENIDO DEL OBJETO <HEAD><HEAD> DE LA PAGINA html
codetext = "\n function dotest() {"; //DECLARA LA FUNCION//CODETEXT SE DECLARA Y SE LE ASINGA COMO VALOR LOS DATOS DE LA FUNCION DOTEST() ENCARGADA DE MOSTRAR EL MENSAJE DE EL MONTO A CARGAR
codetext += "\n monto = document.getElementById('ctl00_ContentPlaceHolder1_Sales_LabelSelectedProduct');"; //SE DECLARA MONTO Y SE LE ASIGNA EL VALOR DEL OBJETO QUE CONTIENE EL MENSAJE DEL MONTO EN LA PAGINA
codetext += "\n tel1 = document.getElementById('ctl00_ContentPlaceHolder1_Sales_TextBoxPhone').value ; "; // SE DECLARA TEL1 Y SE LE ASIGNA EL VALOR DE EL OBJETO QUE CONTIENE EL PRIMER NUMERO DE TELEFONO
codetext += "\n tel2 = document.getElementById('ctl00_ContentPlaceHolder1_Sales_TextBoxPhoneConfirm').value ;"; // SE DECLARA TEL2 Y SE LE ASIGNA EL VALOR DE EL OBJETO QUE CONTIENE LA CONFIRMACION DEL NUMERO DE TELEFONO
codetext += "\n mycapcha = document.getElementById('ctl00_ContentPlaceHolder1_Sales_CodeNumberTextBox').value ;"; //// SE DECLARA MYCAPCHA Y SE LE ASIGNA EL VALOR DE EL OBJETO QUE CONTIENE EL VALOR DEL CODIGO QUE APARECE EN LA IMAGEN
codetext += "\n if(tel1 != '' && (tel1 === tel2)){"; //SE VALIDA QUE EL TELEFONO ESTE CORRECTO EN LOS 2 CAMPOS
codetext += "\n if (monto.innerHTML != 'No ha seleccionado producto.'){"; //SE vALIDA QUE EL MONTO ESTE SELECCIONADO
codetext += "\n if(mycapcha != ''){;";// sE VALIDA QUE EL CODIGO DE LA IMAGEN HAYA SIDO INGRESADO
codetext += "\n var myconfirm = confirm('Datos:\\n\\nMonto: '+monto.innerHTML+'\\n\\nTelefono: '+ tel1 )";//se delcara myconfirm y se le asigna el valor tru o false del mensaje para confirmar la venta
codetext += "\n if(myconfirm){DoSale();"; //se ejecuta la venta
codetext += "\n }else{} ";//se cancela y se regresa
codetext += "}else{alert('Error\\nInserte El codigo que aparece en la imagen')};"; //alerta si no se ha ingresado el codigo de la imagen
codetext += "\n }else{alert('Error\\nNo Hay Una Cantidad Seleccionada\\nSelecciona La Cantidad Por Favor');";//alerta del si la cantidad no ha sido seleccionada
codetext += "\n }}else{alert('Error\\nEl Numero de Telefono no coincide');";//alerta si el telefono esta mal
codetext += "\n }}";//fin de funcion
mytext = document.createTextNode(codetext) //se crea un elemento de tipo texto que contiene el valor de codetext es decir la funcion de javascript
myscript = document.createElement('script') //se crea un elemento de tipo script
myscript.appendChild(mytext);//se le agrega o anida el valor de el elemento de tipo texto al elemento tipo script
myhead.appendChild(myscript);//se le agrega al elemento<head> de la pagina el nuevo elemento con el contenido del div el cual asi vez tiene el contenido del script el cual a su vez contiene el codigo del script
mySale = document.getElementById('ctl00_ContentPlaceHolder1_Sales_LinkSale'); // se declara mySale y se le asigna el objeto "Realizar Venta"
mySale.href = "javascript:dotest();"; //se le asigna la funcion dotest() en vez de la que tiene por ende que es doSale() para asi ejecutar primero nuesta funcion
	
//Gracias Omar del parte del Equipo de Recargas Gamma!!! 
//Este script es para los clientes de Recargas Gamma. 	
