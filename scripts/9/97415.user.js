// ==UserScript==
// @name           Mangekyou Filler PRO
// @namespace      Mangekyou Filler PRO
// @description    Auto rellena el formulario de inscripcion de Hotmail y GPTreasure
// @include        https://signup.live.com/*
// @include        http://www.get-paid.com/register.php*
// @include        http://www.get-paid.com/
// @include        *www.facebook.com/index.php?stype*
// ==/UserScript==

//---------------------------------------------------CONFIGURACION----------------------------------------------------------------


//CONFIGURACION DE HOTMAIL

var Contraseña = "174563";//Cambiar por la contraseña que quieras para todas las cuentas que generes
var CodigoPostal = "8000";


//CONFIGURACION DE GPT
var Referido = GM_getValue("Referido");

if(!Referido){
Referido = prompt("Escribe el nombre del referido a usar");
GM_setValue("Referido", Referido);
}

GM_registerMenuCommand("Cambiar Referido", function(){Referido = prompt("Escribe el nombre del referido a usar", Referido); GM_setValue("Referido", Referido); });


//------------------------------------------------FIN DE CONFIGURACION------------------------------------------------------------


//                                            A PARTIR DE AQUI NO TOCAR NADA


//------------------------------------------------FUNCIONES ALEATORIAS------------------------------------------------------------


var emailGPT = GM_getValue("emailGPT")
var usuarioGPT = GM_getValue("usuarioGPT")
var contraseñaGPT = GM_getValue("contraseñaGPT")
var emailFacebook = GM_getValue("emailFacebook")


//E-MAIL ALEATORIO + EMAIL ALTERNATIVO


var Consonantes = new Array('l', 'g', 'r', 't', 's', 'c', 'v', 'n', 'm', 'p', 'f', 'd');
var Vocales = new Array('a', 'e', 'i', 'o', 'u');
var Silabas = new Array('tr', 'tl', 'br', 'bl', 'cr', 'cl', 'pr', 'pl');
var Letras = new Array('s', 'r', 'n', 'm');
var Numeros = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '0');

var aConsonante = Consonantes[Math.floor(Math.random()*Consonantes.length)];
var aConsonante1 = Consonantes[Math.floor(Math.random()*Consonantes.length)];
var aVocal = Vocales[Math.floor(Math.random()*Vocales.length)];
var aVocal1 = Vocales[Math.floor(Math.random()*Vocales.length)];
var aVocal2 = Vocales[Math.floor(Math.random()*Vocales.length)];
var aSilaba = Silabas[Math.floor(Math.random()*Silabas.length)];
var aLetra = Letras[Math.floor(Math.random()*Letras.length)];
var aNumero = Numeros[Math.floor(Math.random()*Numeros.length)];
var aNumero1 = Numeros[Math.floor(Math.random()*Numeros.length)];
var aNumero2 = Numeros[Math.floor(Math.random()*Numeros.length)];



function EmailAleatorio(){
var Email = aConsonante+aVocal+aConsonante1+aVocal1+aSilaba+aVocal2+aNumero+aNumero1+aNumero2;
emailGPT = Email+"@hotmail.com"
emailFacebook = Email+"@hotmail.com"
document.getElementById("imembernamelive").value = Email;
document.getElementById("idomain").value = "hotmail.com";
document.getElementById("iAltEmail").value = Email+"@alternativo.com";
printEmail('<center>El mail generado es<br>' + Email + "@hotmail.com</center>")
GM_setValue("emailGPT", emailGPT)
GM_setValue("emailFacebook", emailFacebook)
}


//NOMBRES ALEATORIOS

function NombreAleatorio(){ 
var Nombres = new Array()
Nombres[0] = "Matias" 
Nombres[1] = "Juán"
Nombres[2] = "Tomás"
Nombres[3] = "Guillermo"
Nombres[4] = "Roberto"
Nombres[5] = "Pedro"
Nombres[6] = "Agustín"
Nombres[7] = "Mariano"
Nombres[8] = "Ezequiel"
Nombres[9] = "Marcelo"
Nombres[10] = "Martín"
Nombres[11] = "Santiago"
Nombres[12] = "David"
Nombres[13] = "Diego"
Nombres[14] = "Gastón"
Nombres[15] = "Alan"
Nombres[16] = "Augusto"
Nombres[17] = "Ramiro"
Nombres[18] = "Nicolas"
Nombres[19] = "Franco"
aleat = Math.random() * (Nombres.length)
aleat = Math.floor(aleat)
if(Facebook){
document.getElementById("firstname").value = Nombres[aleat]
}else
document.getElementById("iFirstName").value = Nombres[aleat]
}


//APELLIDOS ALEATORIOS

function ApellidoAleatorio(){ 
var Apellidos = new Array()
Apellidos[0] = "Gutiérrez"
Apellidos[1] = "González"
Apellidos[2] = "Pérez"
Apellidos[3] = "Fernández"
Apellidos[4] = "López"
Apellidos[5] = "Díaz"
Apellidos[6] = "Martínez"
Apellidos[7] = "Gómez"
Apellidos[8] = "García"
Apellidos[9] = "Sánchez"
Apellidos[10] = "Rodríguez"
Apellidos[11] = "Romero"
Apellidos[12] = "Sosa"
Apellidos[13] = "Álvarez"
Apellidos[14] = "Torres"
Apellidos[15] = "Ruiz"
Apellidos[16] = "Ramírez"
Apellidos[17] = "Flores" 
Apellidos[18] = "Acosta"
Apellidos[19] = "Herrera"
aleat = Math.random() * (Apellidos.length)
aleat = Math.floor(aleat)
if(Facebook){
document.getElementById("lastname").value = Apellidos[aleat];
}else
document.getElementById("iLastName").value = Apellidos[aleat];
}


//AÑO DE NACIMIENTO ALEATORIO

function AñoNacimientoAleatorio(){
var AñoNacimiento = new Array()
AñoNacimiento[0] = "1985"
AñoNacimiento[1] = "1986"
AñoNacimiento[2] = "1987"
AñoNacimiento[3] = "1988"
AñoNacimiento[4] = "1989"
AñoNacimiento[5] = "1990"
AñoNacimiento[6] = "1991"
AñoNacimiento[7] = "1992"
AñoNacimiento[8] = "1993"
AñoNacimiento[9] = "1994"
var DiaNacimiento = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31');
var MesNacimiento = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
aleat = Math.random() * (AñoNacimiento.length)
aleat = Math.floor(aleat)
document.getElementById("iBirthDay").value = DiaNacimiento[aleat];
document.getElementById("iBirthMonth").value = MesNacimiento[aleat];
document.getElementById("iBirthYear").value = AñoNacimiento[aleat];
}


//NOMBRE DE USUARIO Y CONTRASEÑA ALEATORIA

var gConsonante = Consonantes[Math.floor(Math.random()*Consonantes.length)];
var gVocal = Vocales[Math.floor(Math.random()*Vocales.length)];
var gVocal2 = Vocales[Math.floor(Math.random()*Vocales.length)];
var gSilaba = Silabas[Math.floor(Math.random()*Silabas.length)];
var gNumero = Numeros[Math.floor(Math.random()*Numeros.length)];
var gNumero1 = Numeros[Math.floor(Math.random()*Numeros.length)];

var Username = gConsonante+gVocal+gSilaba+gVocal2+gNumero+gNumero1;

function UsuarioAleatorio(){
document.getElementsByName("username").item(0).value = Username;
GM_setValue("usuarioGPT", Username)
}

var gConsonante = Consonantes[Math.floor(Math.random()*Consonantes.length)];
var gVocal = Vocales[Math.floor(Math.random()*Vocales.length)];
var gConsonante1 = Consonantes[Math.floor(Math.random()*Consonantes.length)];
var gVocal1 = Vocales[Math.floor(Math.random()*Vocales.length)];
var gNumero = Numeros[Math.floor(Math.random()*Numeros.length)];
var gNumero1 = Numeros[Math.floor(Math.random()*Numeros.length)];

var Password = gConsonante+gVocal+gConsonante1+gVocal+gNumero+gNumero1;

function ContraseñaAleatoria(){
document.getElementsByName("password").item(0).value = Password;
document.getElementsByName("vef_password").item(0).value = Password;
GM_setValue("contraseñaGPT", Password)
}


function NombreAleatorioGPT(){ 
var Nombres = new Array()
Nombres[0] = "Matias" 
Nombres[1] = "Juán"
Nombres[2] = "Tomás"
Nombres[3] = "Guillermo"
Nombres[4] = "Roberto"
Nombres[5] = "Pedro"
Nombres[6] = "Agustín"
Nombres[7] = "Mariano"
Nombres[8] = "Ezequiel"
Nombres[9] = "Marcelo"
Nombres[10] = "Martín"
Nombres[11] = "Santiago"
Nombres[12] = "David"
Nombres[13] = "Diego"
Nombres[14] = "Gastón"
Nombres[15] = "Alan"
Nombres[16] = "Augusto"
Nombres[17] = "Ramiro"
Nombres[18] = "Nicolas"
Nombres[19] = "Franco"
var Apellidos = new Array()
Apellidos[0] = "Gutiérrez"
Apellidos[1] = "González"
Apellidos[2] = "Pérez"
Apellidos[3] = "Fernández"
Apellidos[4] = "López"
Apellidos[5] = "Díaz"
Apellidos[6] = "Martínez"
Apellidos[7] = "Gómez"
Apellidos[8] = "García"
Apellidos[9] = "Sánchez"
Apellidos[10] = "Rodríguez"
Apellidos[11] = "Romero"
Apellidos[12] = "Sosa"
Apellidos[13] = "Álvarez"
Apellidos[14] = "Torres"
Apellidos[15] = "Ruiz"
Apellidos[16] = "Ramírez"
Apellidos[17] = "Flores" 
Apellidos[18] = "Acosta"
Apellidos[19] = "Herrera"
aleat = Math.random() * (Nombres.length)
aleat = Math.floor(aleat)
aleat = Math.random() * (Apellidos.length)
aleat = Math.floor(aleat)
document.getElementsByName("full_name").item(0).value = Nombres[aleat] + " " + Apellidos[aleat];
}

var bNumero = Numeros[Math.floor(Math.random()*Numeros.length)];
var bNumero1 = Numeros[Math.floor(Math.random()*Numeros.length)];
var bNumero2 = Numeros[Math.floor(Math.random()*Numeros.length)];

function AddressAleatorioGPT(){ 
var Address = new Array()
Address[0] = "Zimmerman Lane" 
Address[1] = "Woodland Terrace"
Address[2] = "Hott Street"
Address[3] = "Wright Court"
Address[4] = "County Line Road"
Address[5] = "Concord Street"
Address[6] = "Canis Heights Drive"
Address[7] = "Steve Hunt Road"
Address[8] = "Shobe Lane"
Address[9] = "Oral Lake Road"
Address[10] = "Bridge Street"
Address[11] = "Cambridge Court"
Address[12] = "Front Street"
Address[13] = "Sheila Lane"
Address[14] = "Stratford Drive"
Address[15] = "Locust View Drive"
Address[16] = "Straford Park"
Address[17] = "Breezewood Court"
Address[18] = "Poplar Street"
Address[19] = "Still Street"
aleat = Math.random() * (Address.length)
aleat = Math.floor(aleat)
document.getElementsByName("address").item(0).value = bNumero + bNumero1 + bNumero2 + " " + Address[aleat]
}

function CityAleatorioGPT(){ 
var City = new Array()
City[0] = "Wolcottville" 
City[1] = "Memphis"
City[2] = "Berkeley"
City[3] = "Greenville"
City[4] = "Plains"
City[5] = "Norfolk"
City[6] = "Fresno"
City[7] = "West Roxbury"
City[8] = "Garden City"
City[9] = "Athens"
City[10] = "Teterboro"
City[11] = "Columbia"
City[12] = "Santa Clara"
City[13] = "Athens"
City[14] = "Grattan"
City[15] = "Culpeper"
City[16] = "Dedham"
City[17] = "Augusta"
City[18] = "Marietta"
City[19] = "Concord"
aleat = Math.random() * (City.length)
aleat = Math.floor(aleat)
document.getElementsByName("city").item(0).value = City[aleat]
}


//FECHA DE NACIMIENTO ALEATORIA
function NacimientoAleatorio(){
var Dia = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31');
var Mes = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
var Año = new Array('1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994');
document.getElementById("birthday_day").value = Dia[aleat]
document.getElementById("birthday_month").value = Mes[aleat]
document.getElementById("birthday_year").value = Año[aleat]
}


//AUTO RELLENO DE REFERIDO
function ReferidoGPT(){
if(document.getElementsByName("referrerid").item(0)){
document.getElementsByName("referrerid").item(0).value = Referido;
}};



//-----------------------------------------------FIN DE FUNCIONES ALEATORIAS------------------------------------------------------



//------------------------------------------------FUNCIONES DE AUTO RELLENO-------------------------------------------------------


//AUTORRELLENO DE HOTMAIL

function AutoFillHotmail(){
EmailAleatorio();
document.getElementById("iPwd").value = Contraseña;
document.getElementById("iRetypePwd").value = Contraseña;
NombreAleatorio();
ApellidoAleatorio();
document.getElementById("iCountry").value = "AR";
document.getElementById("iZipCode").value = CodigoPostal;
document.getElementById("iGender").value = "m";
AñoNacimientoAleatorio();
document.getElementById("iSMSCountry").value = "AR";
document.getElementById("iPhone").value = "2915123456"
}


//AUTORRELLENO DE GPTREASURE

function AutoFillGPT(){
ReferidoGPT();
document.getElementsByName("email").item(0).value = emailGPT;
UsuarioAleatorio();
ContraseñaAleatoria()
NombreAleatorioGPT();
AddressAleatorioGPT();
CityAleatorioGPT()
document.getElementsByName("country").item(0).value = "US";
document.getElementsByName("payid").item(0).value = emailGPT;
document.getElementsByName("disclaimer").item(0).click();
printEmail('<center>El user generado es: ' + Username + '<br>El pass generado es: ' + Password + '</center>')
}


//AUTORRELLENO DE FACEBOOK

function AutoFillFacebook(){
NombreAleatorio();
ApellidoAleatorio()
document.getElementById("reg_email__").value = emailFacebook
document.getElementById("reg_email_confirmation__").value = emailFacebook
document.getElementById("reg_passwd__").value = Contraseña
document.getElementById("sex").value = "2"
NacimientoAleatorio()
}






//-------------------------------------------FIN DE FUNCIONES DE AUTO RELLENO-----------------------------------------------------


//-----------------------------------------------AUTO RELLENO AUTOMATICO----------------------------------------------------------

//MENSAJE DE AUTO RELLENO
function printMsg(msg) {
    if (document.getElementById('info')) {
        document.getElementById('spam').innerhtml = msg;
    }
    else {
        var print = document.createElement('fuck');
        print.innerHTML = '<fuck id="info" style="font-family: Tahoma,Verdana,Arial,sans-serif; ' + 
		'line-height: normal; font-size: 100%; padding: 8px 16px; ' + 
		'clear: both; background-color: #ffffae; ' +
		'font-weight: bold; position: fixed; z-index: 2; bottom: 0em; ' + 
		'right: 0em; display: block;"><omg id="spam">' + msg + '</omg></fuck>';
        document.body.insertBefore(print, document.body.firstChild);
    }
}



//AUTO RELLENO AUTOMATICO
var HotmailForm = document.getElementById("signinsec")
var GPTForm = document.getElementsByName("payid").item(0)
var Facebook = document.getElementById("email")


if(HotmailForm){
AutoFillHotmail();
printMsg('Auto relleno completado');
}

if(GPTForm){
AutoFillGPT();
printMsg('Auto relleno completado');
}

if(Facebook){
AutoFillFacebook();
printMsg('Auto relleno completado');
}


//MENSAJES ALEATORIOS
function printComent(msg) {
    if (document.getElementById('info1')) {
        document.getElementById('spam1').innerhtml = msg;
    }
    else {
        var print = document.createElement('fuck1');
        print.innerHTML = '<fuck1 id="info1" style="font-family: Tahoma,Verdana,Arial,sans-serif; ' + 
		'line-height: normal; font-size: 100%; padding: 8px 16px; ' + 
		'clear: both; background-color: #ffffae; ' + 
		'font-weight: bold; position: fixed; z-index: 2; top: 0em; ' + 
		'style="text-justify:center"; display: block;"><omg1 id="spam1">' + msg + '</omg1></fuck1>';
        document.body.insertBefore(print, document.body.firstChild);
    }
}


var Mensajes = new Array()
Mensajes[0] = "<center>Recuerda que el script no rellena el captcha,<br>tienes que hacerlo tú mismo.</center>"
Mensajes[1] = "<center>Cuando rellenes el formulario de GPT,<br>el script pegara el mail generado anteriormente.</center>"
Mensajes[2] = "<center>El Auto Relleno es instantaneo, el tiempo que tarde<br>depende de la velocidad en que cargue la pagina.</center>"
Mensajes[3] = "<center>Cuando actives la cuenta de GPT, cambia la IP<br>para asi seguir creando mas y conseguir mas dinero.</center>"
Mensajes[4] = "<center>Este script fue creado por Greylar.</center>"
Mensajes[5] = "<center>El uso de este script es reservado.</center>"
Mensajes[6] = "<center>Es mejor que dejes abierta solo la pestaña<br>de Hotmail y la GPT para que el proceso sea mas rápido.</center>"
Mensajes[7] = "<center>Para cambiar el nombre de la cuenta referida debes ir a<br>User Scripts Commands>Cambiar Referido</center>"
Mensajes[8] = "<center>Script actualizado al 25/12/2012.</center>"


aleat = Math.random() * (Mensajes.length)
aleat = Math.floor(aleat)
printComent(Mensajes[aleat]);





//MENSAJE CON EL MAIL ALEATORIO
function printEmail(msg) {
    if (document.getElementById('info2')) {
        document.getElementById('spam2').innerhtml = msg;
    }
    else {
        var print = document.createElement('fuck2');
        print.innerHTML = '<fuck2 id="info2" style="font-family: Tahoma,Verdana,Arial,sans-serif; ' + 
		'line-height: normal; font-size: 100%; padding: 8px 16px; ' + 
		'clear: both; background-color: #ffffae; ' + 
		'font-weight: bold; position: fixed; z-index: 2; bottom: 0em; ' +
		'style="text-justify:center"; display: block;"><omg1 id="spam2">' + msg + '</omg2></fuck2>';
        document.body.insertBefore(print, document.body.firstChild);
    }
}




//--------------------------------------------FIN DE AUTO RELLENO AUTOMATICO------------------------------------------------------