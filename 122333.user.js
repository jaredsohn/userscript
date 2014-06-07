// ==UserScript==
// @name          NeoExportEBP
// @namespace     by_Bigpetroman
// @description   Botones para pasar los datos de la pagina de neobux a un div, listos para copiar y pegar
// @author 		  Bigpetroman
// @include       http://www.neobux.com/c/
// @include       http://www.neobux.com/c/?vl*
// @include 	  http://www.neobux.com/c/rl/*
// @include 	  http://www.neobux.com/c/rs/*
// @include 	  https://www.neobux.com/c/d/*
// @icon          http://c.nbx.bz/imagens/texto_32.png
// @version       2.6.3
// ==/UserScript==
// Changelog
// version 1 liberada 04 de Enero 2012
// los botones copian la información de la página en que estamos y los colocan en una ventana nueva en forma de texto
// separado por punto y coma (;), listo para copiar y pegar
// version 2 liberada 09 de Febrero 2012
// -- se coloco la opción de elegir un formato de fecha standar como formato de fecha para los diferentes campos de fecha
// la fecha será de la forma yyyy/mm/dd hh:mm, en el caso de el campo ultimo clic, como no lleva hora, se colocara como
// hora las 00:00
// -- el campo media, cuando NO tenga valores (muestra -.--), se regresara el valor 0.000
// -- ahora los datos son pasados a un div y NO a una pestaña nueva, en chrome me dio problemas con las ventanas y por eso
// decidi hacerlo con un div, y se ve mucho mejor
// version 2.1 liberada 29 de Febrero 2012
// se corrigio el script para cuando en el campo "Expira en" salía la palabra expirado
// version 2.2 liberada 04 de Abril 2012
// se agrego la opcion de poder exportar los datos de los referidos directos y rentados al mismo estilo que
// los exporta NeoBux, Nombre de Referido, Referido Desde, Fecha ultimo Clic y Total Clics; la fecha es en el
// mismo formato YYYYMMDD y los datos estan separados por coma
// version 2.3 liberada 06 de Abril 2012
// se corrigieron algunos errores
// version 2.4 liberada 26 de Abril 2012
// se corrigieron algunos errores
// version 2.5 liberada 07 de Mayo 2012
// se corrigieron algunos problemas que no dejaban crear los botones en la página de resumen
// version 2.6 liberada 26 de Julio 2012
// se corrigo un problema con los datos exportados de referidos directos y rentados cuando se usa el script Referrals comments for NeoBux
// version 2.6.1 liberada 20 de Mayo 2013
// se corrigo un problema con los datos exportados de la página resumen, en ocaciones no funcionaba el botón, ya fue corregido
// version 2.6.2 liberada 06 de Julio 2013
// se corrigo un problema con los datos exportados de la página de RR cuando la fecha referido desde estaba en formato relativa
// version 2.6.3 liberada 16 de marzo 2014
// se corrigo un problema con los datos exportados de las renovaciones y se agrego los datos de renovaciones manuales y automáticas

//Con esta línea, estamos declarando una función llamada trim() en la clase String
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };

//Bloque de idiomas para las tablas de referidos directos y rentados, para el caso de las fechas donde puede aparecer
//ayer, hoy y sin clics aún
var ebp_Idioma = document.body.innerHTML.indexOf("c0 f-") + 5;
ebp_Idioma = document.body.innerHTML.substring(ebp_Idioma, ebp_Idioma + 2);

var ebp_isToday = null;
var ebp_isYesterday = null;
var ebp_isTomorrow = null;
var ebp_isExpired = null;
var ebp_noClick = null;
var ebp_ffRelativa = null;
var ebp_ffExacta = null;
//estas variables son para los texto a mostrar en los datos exportados, sobre todo para los datos
//de la paginas de resumen y estadísticas
var ebp_CPTotalHoy = null;
var ebp_CPFijosFHoy = null;
var ebp_CPMicroHoy = null;
var ebp_CPMiniHoy = null;
var ebp_CPProlongadoHoy = null;
var ebp_CPStandarHoy = null;
var ebp_CPFijosNHoy = null;
var ebp_DirectText = null;
var ebp_TotClicsHoy = null;
var ebp_TotClicsAyer = null;
var ebp_TotClics10Dias = null;
var ebp_ClicsHoyRD = null;
var ebp_ClicsAyerRD = null;
var ebp_Clics10DiasRD = null;
var ebp_ClicsHoyRR = null;
var ebp_ClicsAyerRR = null;
var ebp_Clics10DiasRR = null;
var ebp_MontReciclaHoy = null;
var ebp_MontReciclaAyer = null;
var ebp_MontRecicla10Dias = null;
var ebp_ReciclaGratisHoy = null;
var ebp_MontRenuevaHoy = null;
var ebp_MontRenuevaAyer = null;
var ebp_MontRenueva10Dias = null;

var ebp_MontRenuevaHoyMan = null;
var ebp_MontRenuevaAyerMan = null;
var ebp_MontRenueva10DiasMan = null;
var ebp_MontRenuevaHoyAuto = null;
var ebp_MontRenuevaAyerAuto = null;
var ebp_MontRenueva10DiasAuto = null;

var ebp_MontAutoPagoHoy = null;
var ebp_MontAutoPagoAyer = null;
var ebp_MontAutoPago10Dias = null;
//estas variables son para el texto mostrado en las patallas de exportación
var ebp_TextConfig = null;
var ebp_TextDatos = null;
var ebp_TextGuarda = null;
var ebp_TextSalir = null;
var ebp_TextMensL1 = null;
var ebp_TextMensL2 = null;
var ebp_TextMensL3 = null;
var ebp_TextMensL4 = null;
var ebp_TextMensL5 = null;

//estas variables son para la pantalla de exportacion de datos
var ebp_AnchoED = 0;
var ebp_AltoED = 0;

//esta variable es para el tipo de formato de fecha a regresar
//si es 1, se regresa la fecha en formato standar, si es 0 se regresa tal cual como esta en la celda
var nFormaFecha = 0;
switch(ebp_Idioma)
{
    case "us": //Ingles
		ebp_DirectText = "Direct;Rented;You";
        ebp_isToday = "Today";
        ebp_isYesterday = "Yesterday";
		ebp_isTomorrow = "Tomorrow";
		ebp_isExpired = "Expired...";
        ebp_noClick = "No clicks yet";
		ebp_TotClicsHoy = "clicks today:";
		ebp_TotClicsAyer = "clicks yesterday:";
		ebp_TotClics10Dias = "clicks last 10 days:";
		ebp_CPTotalHoy = "Total own clicks:"; 
		ebp_CPFijosFHoy = "Fixed fuchsia clicks:";
		ebp_CPMicroHoy = "Micro clicks:";
		ebp_CPMiniHoy = "Mini clicks:";
		ebp_CPProlongadoHoy = "Extended clicks:";
		ebp_CPStandarHoy = "Standard clicks:";
		ebp_CPFijosNHoy = "Fixed orange clicks:";
		ebp_ClicsHoyRD = "clicks today RD:";
		ebp_ClicsAyerRD = "clicks yesterday RD:";
		ebp_Clics10DiasRD = "clicks last 10 days RD:";
		ebp_ClicsHoyRR = "clicks today RR:";
		ebp_ClicsAyerRR = "clicks yesterday RR:";
		ebp_Clics10DiasRR = "clicks last 10 days RR:";
		ebp_MontReciclaHoy = "recycling today:"; 
		ebp_MontReciclaAyer = "recycling yesterday:";
		ebp_MontRecicla10Dias = "recycling last 10 days:";
		ebp_ReciclaGratisHoy = "Automatic Recycling today:"; 
		ebp_MontRenuevaHoy = "renewal today:";
		ebp_MontRenuevaAyer = "renewal yesterday:";
		ebp_MontRenueva10Dias = "renewal last 10 days:";
		
		ebp_MontRenuevaHoyManual = "renewal today (Manual):";
		ebp_MontRenuevaAyerManual = "renewal yesterday (Manual):";
		ebp_MontRenueva10DiasManual = "renewal last 10 days (Manual):";
		ebp_MontRenuevaHoyAuto = "renewal today (AutoRenew):";
		ebp_MontRenuevaAyerAuto = "renewal yesterday (AutoRenew):";
		ebp_MontRenueva10DiasAuto = "renewal last 10 days (AutoRenew):";
		
		ebp_MontAutoPagoHoy = "AutoPay today:";
		ebp_MontAutoPagoAyer = "AutoPay yesterday:";
		ebp_MontAutoPago10Dias = "AutoPay last 10 days:"; 
		ebp_ffRelativa = "Relative";
		ebp_ffExacta = "Real";
		ebp_TextConfig = "Settings"
		ebp_TextDatos = "Data";
		ebp_TextGuarda = "Save";
		ebp_TextSalir = "Close";
		ebp_TextMensL1 = "Export Dates in Standard Format?";
		ebp_TextMensL2 = "The data is exported in the format YYYY/MM/DD HH:MM";
		ebp_TextMensL3 = 'in the data "last click", the hours are placed at 00:00';
		ebp_TextMensL4 = "Exporta Data in NeoBux format?";
		ebp_TextMensL5 = "This is only for the data of direct referrals and rented";
    break;
    case "es": //Español
		ebp_DirectText = "Directos;Alquilados;Usted";
        ebp_isToday = "Hoy";
        ebp_isYesterday = "Ayer";
		ebp_isTomorrow = "Mañana";
		ebp_isExpired = "Expirado...";
        ebp_noClick = "Sin clics aún";
		ebp_TotClicsHoy = "Clics Hoy:";
		ebp_TotClicsAyer = "Clics Ayer:";
		ebp_TotClics10Dias = "Clics Ult 10 Días:";
		ebp_CPTotalHoy = "total clics propios:";
		ebp_CPFijosFHoy = "clics Fijos fucsia:";
		ebp_CPMicroHoy = "clics Micro:";
		ebp_CPMiniHoy = "clics Mini:";
		ebp_CPProlongadoHoy = "clics Prolongados:";
		ebp_CPStandarHoy = "clics Standard:";
		ebp_CPFijosNHoy = "clics Fijos naranja:";
		ebp_ClicsHoyRD = "Clics Hoy RD:";
		ebp_ClicsAyerRD = "Clics Ayer RD:";
		ebp_Clics10DiasRD = "Clics Ult 10 Días RD:";
		ebp_ClicsHoyRR = "Clics Hoy RR:";
		ebp_ClicsAyerRR = "Clics Ayer RR:";
		ebp_Clics10DiasRR = "Clics Ult 10 Días RR:";
		ebp_MontReciclaHoy = "Reciclaje Hoy:"; 
		ebp_MontReciclaAyer = "Recicajes Ayer:";
		ebp_MontRecicla10Dias = "Reciclaje Ult 10 Días:";
		ebp_ReciclaGratisHoy = "Reciclaje Automático Hoy:"; 
		ebp_MontRenuevaHoy = "Renovaciones Hoy:";
		ebp_MontRenuevaAyer = "Renovaciones Ayer:";
		ebp_MontRenueva10Dias = "Renovaciones Ult 10 Días:";
		
		ebp_MontRenuevaHoyManual = "Renovaciones Hoy (Manual):";
		ebp_MontRenuevaAyerManual = "Renovaciones Ayer (Manual):";
		ebp_MontRenueva10DiasManual = "Renovaciones Ult 10 Días (Manual):";
		ebp_MontRenuevaHoyAuto = "Renovaciones Hoy (AutoRenovación):";
		ebp_MontRenuevaAyerAuto = "Renovaciones Ayer (AutoRenovación):";
		ebp_MontRenueva10DiasAuto = "Renovaciones Ult 10 Días (AutoRenovación):";
		
		ebp_MontAutoPagoHoy = "Autopago Hoy:";
		ebp_MontAutoPagoAyer = "Autopago Ayer:";
		ebp_MontAutoPago10Dias = "Autopago Ult 10 Días:"; 
		ebp_ffRelativa = "Relativas";
		ebp_ffExacta = "Exactas";
		ebp_TextConfig = "Configuración"
		ebp_TextDatos = "Datos";
		ebp_TextGuarda = "Guardar";
		ebp_TextSalir = "Cerrar";
		ebp_TextMensL1 = "Exportar las Fechas en Formato Standard?";
		ebp_TextMensL2 = "La Fecha se Exporta en el formato AAAA/MM/DD HH:MM";
		ebp_TextMensL3 = 'Para el campo "último Clic" las horas se colocan en 00:00';
		ebp_TextMensL4 = "Exporta datos en formato de NeoBux?";
		ebp_TextMensL5 = "Esto es solamente para los datos de referidos directos y rentados";
    break;
    case "pt": //Portugués
		ebp_DirectText = "Directos;Alugados;Você";
        ebp_isToday = "Hoje";
        ebp_isYesterday = "Ontem";
		ebp_isTomorrow = "Amanhã";
		ebp_isExpired = "Expirado...";
        ebp_noClick = "Sem cliques";
		ebp_TotClicsHoy = "cliques de hoje:";
		ebp_TotClicsAyer = "cliques ontem:";
		ebp_TotClics10Dias = "cliques últimos 10 dias:";
		ebp_CPTotalHoy = "totais próprios cliques:";
		ebp_CPFijosFHoy = "Cliques fúcsia fixos:";
		ebp_CPMicroHoy = "Cliques Micro:";
		ebp_CPMiniHoy = "Cliques Mini:";
		ebp_CPProlongadoHoy = "Cliques Prolongada:";
		ebp_CPStandarHoy = "Cliques Normal:";
		ebp_CPFijosNHoy = "Cliques laranja fixos:";
		ebp_ClicsHoyRD = "cliques de hoje RD:";
		ebp_ClicsAyerRD = "cliques ontem RD:";
		ebp_Clics10DiasRD = "cliques últimos 10 dias RD:";
		ebp_ClicsHoyRR = "cliques de hoje RR:";
		ebp_ClicsAyerRR = "cliques ontem RR:";
		ebp_Clics10DiasRR = "cliques últimos 10 dias RR:";
		ebp_MontReciclaHoy = "reciclagem hoje:"; 
		ebp_MontReciclaAyer = "reciclagem de ontem:";
		ebp_MontRecicla10Dias = "reciclagem últimos 10 dias:";
		ebp_ReciclaGratisHoy = "Reciclagem Automática hoje:"; 
		ebp_MontRenuevaHoy = "renovação hoje:";
		ebp_MontRenuevaAyer = "renovação de ontem:";
		ebp_MontRenueva10Dias = "renovação últimos 10 dias:";
		
		ebp_MontRenuevaHoyManual = "renovação hoje (Manual):";
		ebp_MontRenuevaAyerManual = "renovação de ontem (Manual):";
		ebp_MontRenueva10DiasManual = "renovação últimos 10 dias (Manual):";
		ebp_MontRenuevaHoyAuto = "renovação hoje (AutoRenovação):";
		ebp_MontRenuevaAyerAuto = "renovação de ontem (AutoRenovação):";
		ebp_MontRenueva10DiasAuto = "renovação últimos 10 dias (AutoRenovação):";
		
		ebp_MontAutoPagoHoy = "AutoPagamento hoje:";
		ebp_MontAutoPagoAyer = "AutoPagamento ontem:";
		ebp_MontAutoPago10Dias = "AutoPagamento últimos 10 dias:"; 
		ebp_ffRelativa = "Relativas";
		ebp_ffExacta = "Reais";
		ebp_TextConfig = "configurações"
		ebp_TextDatos = "dados";
		ebp_TextGuarda = "salvar";
		ebp_TextSalir = "fechar";
		ebp_TextMensL1 = "Exportar datas no formato Standard?";
		ebp_TextMensL2 = "Os dados são exportados no formato AAAA/MM/DD HH:MM";
		ebp_TextMensL3 = 'nos dados do "último clique", as horas são colocados às 00:00';
		ebp_TextMensL4 = "Exportar dados em formato NeoBux??";
		ebp_TextMensL5 = "Esta é apenas para os dados de referências diretas e referidos alugados";
    break;
    case "gr": //Griego - Greek
		ebp_DirectText = "Άμεσοι;Νοικιασμένοι;Εσείς";
        ebp_isToday = "Σήμερα";
        ebp_isYesterday = "Χθες";
		ebp_isTomorrow = "Αύριο στις";
		ebp_isExpired = "Έληξε...";
        ebp_noClick = "Χωρίς κλικ";
		ebp_TotClicsHoy = "κλικ σήμερα:";
		ebp_TotClicsAyer = "κλικ χθες:";
		ebp_TotClics10Dias = "κλικ τελευταίες 10 ημέρες:";
		ebp_CPTotalHoy = "σύνολο των ιδίων κλικ:";
		ebp_CPFijosFHoy = "Σταθερή κλικ φούξια:";
		ebp_CPMicroHoy = "Micro κλικ:";
		ebp_CPMiniHoy = "Μίνι κλικ:";
		ebp_CPProlongadoHoy = "Εκτεταμένη κλικ:";
		ebp_CPStandarHoy = "Κανονική κλικ:";
		ebp_CPFijosNHoy = "Σταθερά κλικ πορτοκαλί:";
		ebp_ClicsHoyRD = "κλικ σήμερα RD:";
		ebp_ClicsAyerRD = "κλικ χθες RD:";
		ebp_Clics10DiasRD = "κλικ τελευταίες 10 ημέρες RD:";
		ebp_ClicsHoyRR = "κλικ σήμερα RR:";
		ebp_ClicsAyerRR = "κλικ χθες RR:";
		ebp_Clics10DiasRR = "κλικ τελευταίες 10 ημέρες RR:";
		ebp_MontReciclaHoy = "ανακύκλωση σήμερα:"; 
		ebp_MontReciclaAyer = "ανακύκλωση χθες:";
		ebp_MontRecicla10Dias = "ανακύκλωση τελευταίες 10 ημέρες:";
		ebp_ReciclaGratisHoy = "auto-ανακυκλώνονται σήμερα:"; 
		ebp_MontRenuevaHoy = "ανανέωση σήμερα:";
		ebp_MontRenuevaAyer = "ανανέωση του χθες:";
		ebp_MontRenueva10Dias = "ανανέωση τελευταίες 10 ημέρες:";
		
		ebp_MontRenuevaHoyManual = "ανανέωση σήμερα (Χειροκίνητη):";
		ebp_MontRenuevaAyerManual = "ανανέωση του χθες (Χειροκίνητη):";
		ebp_MontRenueva10DiasManual = "ανανέωση τελευταίες 10 ημέρες (Χειροκίνητη):";
		ebp_MontRenuevaHoyAuto = "ανανέωση σήμερα (ΑυτοΑνανέωση):";
		ebp_MontRenuevaAyerAuto = "ανανέωση του χθες (ΑυτοΑνανέωση):";
		ebp_MontRenueva10DiasAuto = "ανανέωση τελευταίες 10 ημέρες (ΑυτοΑνανέωση):";
		
		ebp_MontAutoPagoHoy = "Autopay σήμερα:";
		ebp_MontAutoPagoAyer = "Autopay χθες:";
		ebp_MontAutoPago10Dias = "Autopay τελευταίες 10 ημέρες:"; 
		ebp_ffRelativa = "Σχετικές";
		ebp_ffExacta = "Ακριβείς";
		ebp_TextConfig = "Ρυθμίσεις"
		ebp_TextDatos = "δεδομένα";
		ebp_TextGuarda = "εκτός";
		ebp_TextSalir = "κοντά";
		ebp_TextMensL1 = "Ημερομηνίες Εξαγωγή σε τυποποιημένη μορφή;";
		ebp_TextMensL2 = "Τα δεδομένα που εξάγονται με τη μορφή YYYY/MM/DD HH:MM";
		ebp_TextMensL3 = 'δεδομένα στο "τελευταίο κλικ", οι ώρες που διατίθενται στις 00:00';
		ebp_TextMensL4 = "Εξαγωγή δεδομένων σε μορφή Neobux?";
		ebp_TextMensL5 = "Αυτό είναι μόνο για τα δεδομένα της άμεσης παραπομπής και ενοικιαζόμενα παραπομπές";
    break;
    case "id": //indonesio
		ebp_DirectText = "Langsung;Sewa;Anda";
        ebp_isToday = "Hari ini"; 
        ebp_isYesterday = "Kemarin";
		ebp_isTomorrow = "Besok";
		ebp_isExpired = "Kadaluarsa...";
        ebp_noClick = "Belum ada klik";
		ebp_TotClicsHoy = "klik Hari ini:";
		ebp_TotClicsAyer = "klik kemarin:";
		ebp_TotClics10Dias = "klik 10 hari terakhir:";
		ebp_CPTotalHoy = "Total klik sendiri:"; 
		ebp_CPFijosFHoy = "Klik fuchsia tetap:";
		ebp_CPMicroHoy = "klik Micro:";
		ebp_CPMiniHoy = "klik Mini:";
		ebp_CPProlongadoHoy = "klik diperpanjang:";
		ebp_CPStandarHoy = "klik standar:";
		ebp_CPFijosNHoy = "Klik oranye tetap:";
		ebp_ClicsHoyRD = "klik Hari ini RD:";
		ebp_ClicsAyerRD = "klik kemarin RD:";
		ebp_Clics10DiasRD = "klik 10 hari terakhir:";
		ebp_ClicsHoyRR = "klik Hari ini RR:";
		ebp_ClicsAyerRR = "klik kemarin RR:";
		ebp_Clics10DiasRR = "klik 10 hari terakhir:";
		ebp_MontReciclaHoy = "daur ulang Hari ini:"; 
		ebp_MontReciclaAyer = "daur ulang kemarin:";
		ebp_MontRecicla10Dias = "daur ulang 10 hari terakhir:";
		ebp_ReciclaGratisHoy = "Daur Ulang Otomatis Hari ini:"; 
		ebp_MontRenuevaHoy = "pembaharuan hari ini:";
		ebp_MontRenuevaAyer = "pembaharuan kemarin:";
		ebp_MontRenueva10Dias = "perpanjangan 10 hari terakhir:";
		
		ebp_MontRenuevaHoyManual = "pembaharuan hari ini (Manual):";
		ebp_MontRenuevaAyerManual = "pembaharuan kemarin (Manual):";
		ebp_MontRenueva10DiasManual = "perpanjangan 10 hari terakhir (Manual):";
		ebp_MontRenuevaHoyAuto = "pembaharuan hari ini (AutoRenew):";
		ebp_MontRenuevaAyerAuto = "pembaharuan kemarin (AutoRenew):";
		ebp_MontRenueva10DiasAuto = "perpanjangan 10 hari terakhir (AutoRenew):";
		
		ebp_MontAutoPagoHoy = "AutoPay hari ini:";
		ebp_MontAutoPagoAyer = "AutoPay kemarin:";
		ebp_MontAutoPago10Dias = "AutoPay 10 hari terakhir:"; 
		ebp_ffRelativa = "Relatif";
		ebp_ffExacta = "Sebenarnya";
		ebp_TextConfig = "pengaturan"
		ebp_TextDatos = "Data";
		ebp_TextGuarda = "menyimpan";
		ebp_TextSalir = "menutup";
		ebp_TextMensL1 = "Ekspor Tanggal Format Standar?";
		ebp_TextMensL2 = "Data tersebut diekspor dalam format YYYY/MM/DD HH:MM";
		ebp_TextMensL3 = 'dalam "klik terakhir" data, jam ditempatkan pada jam 00:00';
		ebp_TextMensL4 = "Ekspor data dalam format neobux?";
		ebp_TextMensL5 = "Ini hanya untuk data dari arahan langsung dan arahan disewa";
    break;
    case "fi": //finlandés
		ebp_DirectText = "Suorat;Vuokratut;Sinä";
        ebp_isToday = "Tänään";
        ebp_isYesterday = "Eilen";
		ebp_isTomorrow = "Huomenna";
		ebp_isExpired = "Erääntynyt...";
        ebp_noClick = "Ei klikkejä";
		ebp_TotClicsHoy = "napsauttaa tänään:";
		ebp_TotClicsAyer = "napsauttaa eilen:";
		ebp_TotClics10Dias = "napsauttaa viimeisen 10 päivän:";
		ebp_CPTotalHoy = "kaikista omista napsauttaa:"; 
		ebp_CPFijosFHoy = "Kiinteä fuksia napsauttaa:";
		ebp_CPMicroHoy = "Micro napsauttaa:";
		ebp_CPMiniHoy = "Mini napsauttaa:";
		ebp_CPProlongadoHoy = "Laajennettu napsauttaa:";
		ebp_CPStandarHoy = "Standard napsauttaa:";
		ebp_CPFijosNHoy = "Kiinteä oranssi napsauttaa:";
		ebp_ClicsHoyRD = "napsauttaa tänään RD:";
		ebp_ClicsAyerRD = "napsauttaa eilen RD:";
		ebp_Clics10DiasRD = "napsauttaa viimeisen 10 päivän RD:";
		ebp_ClicsHoyRR = "napsauttaa tänään RR:";
		ebp_ClicsAyerRR = "napsauttaa eilen RR:";
		ebp_Clics10DiasRR = "napsauttaa viimeisen 10 päivän RR:";
		ebp_MontReciclaHoy = "kierrätys tänään:"; 
		ebp_MontReciclaAyer = "kierrätys eilen:";
		ebp_MontRecicla10Dias = "kierrätys viimeisen 10 päivän:";
		ebp_ReciclaGratisHoy = "Automaattinen kierrätys Tänään:"; 
		ebp_MontRenuevaHoy = "uusiminen tänään:";
		ebp_MontRenuevaAyer = "uusiminen eilen:";
		ebp_MontRenueva10Dias = "uusiminen viimeisen 10 päivän:";
		
		ebp_MontRenuevaHoyManual = "uusiminen tänään (Manuaalisesti):";
		ebp_MontRenuevaAyerManual = "uusiminen eilen (Manuaalisesti):";
		ebp_MontRenueva10DiasManual = "uusiminen viimeisen 10 päivän (Manuaalisesti):";
		ebp_MontRenuevaHoyAuto = "uusiminen tänään (AutoRenew):";
		ebp_MontRenuevaAyerAuto = "uusiminen eilen (AutoRenew):";
		ebp_MontRenueva10DiasAuto = "uusiminen viimeisen 10 päivän (AutoRenew):";
		
		ebp_MontAutoPagoHoy = "AutoPay tänään:";
		ebp_MontAutoPagoAyer = "AutoPay eilen:";
		ebp_MontAutoPago10Dias = "AutoPay viimeisen 10 päivän:"; 
		ebp_ffRelativa = "Suhteelliset";
		ebp_ffExacta = "Reaaliset";
		ebp_TextConfig = "Asetukset"
		ebp_TextDatos = "tiedot";
		ebp_TextGuarda = "säästää";
		ebp_TextSalir = "lähellä";
		ebp_TextMensL1 = "Vie päivämäärät Standard Format?";
		ebp_TextMensL2 = "Data viedään muodossa YYYY/MM/DD HH:MM";
		ebp_TextMensL3 = 'in data "viimeinen klikkaa" tunnit sijoitetaan klo 00:00';
		ebp_TextMensL4 = "Vie Dataa NeoBux muodossa?";
		ebp_TextMensL5 = "Tämä on vain tiedot suoraan lähetteet ja vuokra lähetteitä";
    break;
    case "se": //Sueco
		ebp_DirectText = "Direkta;Hyrda;Du";
        ebp_isToday = "Idag";
        ebp_isYesterday = "Igår";
		ebp_isTomorrow = "I morgon";
		ebp_isExpired = "Utgången...";
        ebp_noClick = "Inga klick";
		ebp_TotClicsHoy = "klick idag:";
		ebp_TotClicsAyer = "klick igår:";
		ebp_TotClics10Dias = "klick senaste 10 dagarna:";
		ebp_CPTotalHoy = "totala egna klick:"; 
		ebp_CPFijosFHoy = "Fasta fuchsia klick:";
		ebp_CPMicroHoy = "mikro klick:";
		ebp_CPMiniHoy = "Mini klick:";
		ebp_CPProlongadoHoy = "Förlängda klick:";
		ebp_CPStandarHoy = "Standard klick:";
		ebp_CPFijosNHoy = "Fasta apelsin klick:";
		ebp_ClicsHoyRD = "klick idag RD:";
		ebp_ClicsAyerRD = "klick igår RD:";
		ebp_Clics10DiasRD = "klick senaste 10 dagarna RD:";
		ebp_ClicsHoyRR = "klick idag RR:";
		ebp_ClicsAyerRR = "klick igår RR:";
		ebp_Clics10DiasRR = "klick senaste 10 dagarna RR:";
		ebp_MontReciclaHoy = "återvinning idag:"; 
		ebp_MontReciclaAyer = "återvinning igår:";
		ebp_MontRecicla10Dias = "återvinning senaste 10 dagarna:";
		ebp_ReciclaGratisHoy = "Automatiskt referalbyte idag:"; 
		ebp_MontRenuevaHoy = "förnyelse idag:";
		ebp_MontRenuevaAyer = "förnyelse i går:";
		ebp_MontRenueva10Dias = "förnyelse senaste 10 dagarna:";
		
		ebp_MontRenuevaHoyManual = "förnyelse idag (Manuellt):";
		ebp_MontRenuevaAyerManual = "förnyelse i går (Manuellt):";
		ebp_MontRenueva10DiasManual = "förnyelse senaste 10 dagarna (Manuellt):";
		ebp_MontRenuevaHoyAuto = "förnyelse idag (AutoRenew):";
		ebp_MontRenuevaAyerAuto = "förnyelse i går (AutoRenew):";
		ebp_MontRenueva10DiasAuto = "förnyelse senaste 10 dagarna (AutoRenew):";
		
		ebp_MontAutoPagoHoy = "AutoPay idag:";
		ebp_MontAutoPagoAyer = "AutoPay igår:";
		ebp_MontAutoPago10Dias = "AutoPay senaste 10 dagarna:"; 
		ebp_ffRelativa = "Relativa";
		ebp_ffExacta = "Reella";
		ebp_TextConfig = "inställningar"
		ebp_TextDatos = "data som";
		ebp_TextGuarda = "Spara";
		ebp_TextSalir = "stänga";
		ebp_TextMensL1 = "Exportera datum i standardformat?";
		ebp_TextMensL2 = "Uppgifterna exporteras i formatet YYYY/MM/DD HH:MM";
		ebp_TextMensL3 = 'i data "Klick senast", är timmarna placerade vid 00:00';
		ebp_TextMensL4 = "Exportera data i NeoBux format?";
		ebp_TextMensL5 = "Detta är bara för uppgifter från direkta remisser och hyrda hänvisningar";
    break;
    case "de": //Aleman
		ebp_DirectText = "Direkte;Gemietete;Sie";
        ebp_isToday = "Heute";
        ebp_isYesterday = "Gestern";
		ebp_isTomorrow = "Morgen";
		ebp_isExpired = "Abgelaufen...";
        ebp_noClick = "Keine Klicks";
		ebp_TotClicsHoy = "Klicks heute:";
		ebp_TotClicsAyer = "Klicks gestern:";
		ebp_TotClics10Dias = "Klicks letzten 10 Tage:";
		ebp_CPTotalHoy = "Gesamt eigenen Klicks:"; 
		ebp_CPFijosFHoy = "Feste fuchsia Klicks:";
		ebp_CPMicroHoy = "Micro Klicks:";
		ebp_CPMiniHoy = "Mini Klicks:";
		ebp_CPProlongadoHoy = "Erweiterte Klicks:";
		ebp_CPStandarHoy = "Standard-Klicks:";
		ebp_CPFijosNHoy = "Fest Orange Klicks:";
		ebp_ClicsHoyRD = "Klicks heute RD:";
		ebp_ClicsAyerRD = "Klicks gestern RD:";
		ebp_Clics10DiasRD = "Klicks letzten 10 Tage RD:";
		ebp_ClicsHoyRR = "Klicks heute RR:";
		ebp_ClicsAyerRR = "Klicks gestern RR:";
		ebp_Clics10DiasRR = "Klicks letzten 10 Tage RR:";
		ebp_MontReciclaHoy = "Recycling heute:"; 
		ebp_MontReciclaAyer = "Recycling gestern:";
		ebp_MontRecicla10Dias = "Recycling letzten 10 Tage:";
		ebp_ReciclaGratisHoy = "Automatische Recycling heute:"; 
		ebp_MontRenuevaHoy = "Erneuerung heute:";
		ebp_MontRenuevaAyer = "Erneuerung gestern:";
		ebp_MontRenueva10Dias = "Erneuerung letzten 10 Tage:";
		
		ebp_MontRenuevaHoyManual = "Erneuerung heute (Manuell):";
		ebp_MontRenuevaAyerManual = "Erneuerung gestern (Manuell):";
		ebp_MontRenueva10DiasManual = "Erneuerung letzten 10 Tage (Manuell):";
		ebp_MontRenuevaHoyAuto = "Erneuerung heute (AutoRenew):";
		ebp_MontRenuevaAyerAuto = "Erneuerung gestern (AutoRenew):";
		ebp_MontRenueva10DiasAuto = "Erneuerung letzten 10 Tage (AutoRenew):";
		
		ebp_MontAutoPagoHoy = "AutoPay heute:";
		ebp_MontAutoPagoAyer = "AutoPay gestern:";
		ebp_MontAutoPago10Dias = "AutoPay letzten 10 Tage:"; 
		ebp_ffRelativa = "Relativ";
		ebp_ffExacta = "Echt";
		ebp_TextConfig = "Einstellungen"
		ebp_TextDatos = "Daten";
		ebp_TextGuarda = "sparen";
		ebp_TextSalir = "schließen";
		ebp_TextMensL1 = "Exportieren Sie Daten im Standard-Format?";
		ebp_TextMensL2 = "Die Daten werden im Format YYYY/MM/DD HH:MM exportiert";
		ebp_TextMensL3 = 'Daten in der "letzter Klick" werden die Stunden um 00:00 Uhr platziert';
		ebp_TextMensL4 = "Exportieren von Daten in NeoBux-Format?";
		ebp_TextMensL5 = "Dies ist nur für die Daten der direkte Verweise und Verweise vermietet";
    break;
    case "fr": //Frances
		ebp_DirectText = "Directs;Loués;Vous";
        ebp_isToday = "Aujourd'hui";
        ebp_isYesterday = "Hier";
		ebp_isTomorrow = "Demain";
		ebp_isExpired = "Expiré...";
        ebp_noClick = "Pas de clics";
		ebp_TotClicsHoy = "clics aujourd'hui:";
		ebp_TotClicsAyer = "clics hier:";
		ebp_TotClics10Dias = "clics derniers 10 jours:";
		ebp_CPTotalHoy = "totaux propres clics:"; 
		ebp_CPFijosFHoy = "Clics fuchsia fixes:";
		ebp_CPMicroHoy = "micro clics:";
		ebp_CPMiniHoy = "Mini clics:";
		ebp_CPProlongadoHoy = "clics étendues:";
		ebp_CPStandarHoy = "clics standard:";
		ebp_CPFijosNHoy = "Clics orange fixe:";
		ebp_ClicsHoyRD = "clics aujourd'hui RD:";
		ebp_ClicsAyerRD = "clics hier RD:";
		ebp_Clics10DiasRD = "clics derniers 10 jours RD:";
		ebp_ClicsHoyRR = "clics aujourd'hui RR:";
		ebp_ClicsAyerRR = "clics hier RR:";
		ebp_Clics10DiasRR = "clics derniers 10 jours RR:";
		ebp_MontReciclaHoy = "recyclage d'aujourd'hui:"; 
		ebp_MontReciclaAyer = "recyclage hier:";
		ebp_MontRecicla10Dias = "recyclage 10 derniers jours:";
		ebp_ReciclaGratisHoy = "Recyclage Automatique d'aujourd'hui:"; 
		ebp_MontRenuevaHoy = "renouvellement d'aujourd'hui:";
		ebp_MontRenuevaAyer = "renouvellement d'hier:";
		ebp_MontRenueva10Dias = "dernier renouvellement 10 jours:";
		
		ebp_MontRenuevaHoyManual = "renouvellement d'aujourd'hui (manuelle):";
		ebp_MontRenuevaAyerManual = "renouvellement d'hier (manuelle):";
		ebp_MontRenueva10DiasManual = "dernier renouvellement 10 jours (manuelle):";
		ebp_MontRenuevaHoyAuto = "renouvellement d'aujourd'hui (AutoRenew):";
		ebp_MontRenuevaAyerAuto = "renouvellement d'hier (AutoRenew):";
		ebp_MontRenueva10DiasAuto = "dernier renouvellement 10 jours (AutoRenew):";
		
		ebp_MontAutoPagoHoy = "AutoPaiement aujourd'hui:";
		ebp_MontAutoPagoAyer = "AutoPaiement hier";
		ebp_MontAutoPago10Dias = "AutoPaiement 10 derniers jours:"; 
		ebp_ffRelativa = "Relatives";
		ebp_ffExacta = "Réelles ";
		ebp_TextConfig = "Paramètres"
		ebp_TextDatos = "données";
		ebp_TextGuarda = "sauver";
		ebp_TextSalir = "fermer";
		ebp_TextMensL1 = "Exporter des dates dans un format standard?";
		ebp_TextMensL2 = "Les données sont exportées dans le format YYYY/MM/DD HH:MM";
		ebp_TextMensL3 = 'dans les données "Dernier clic", les heures sont placés à 00:00';
		ebp_TextMensL4 = "Exporter des données dans le format NeoBux?";
		ebp_TextMensL5 = "C'est seulement pour les données de références et de renvois directs loués";
    break;
    default: //por default se deja Inlges
		ebp_DirectText = "Direct;Rented;You";
        ebp_isToday = "Today";
        ebp_isYesterday = "Yesterday";
		ebp_isTomorrow = "Tomorrow";
		ebp_isExpired = "Expired...";
        ebp_noClick = "No clicks yet";
		ebp_TotClicsHoy = "clicks today:";
		ebp_TotClicsAyer = "clicks yesterday:";
		ebp_TotClics10Dias = "clicks last 10 days:";
		ebp_CPTotalHoy = "Total own clicks:"; 
		ebp_CPFijosFHoy = "Fixed fuchsia clicks:";
		ebp_CPMicroHoy = "Micro clicks:";
		ebp_CPMiniHoy = "Mini clicks:";
		ebp_CPProlongadoHoy = "Extended clicks:";
		ebp_CPStandarHoy = "Standard clicks:";
		ebp_CPFijosNHoy = "Fixed orange clicks:";
		ebp_ClicsHoyRD = "clicks today RD:";
		ebp_ClicsAyerRD = "clicks yesterday RD:";
		ebp_Clics10DiasRD = "clicks last 10 days RD:";
		ebp_ClicsHoyRR = "clicks today RR:";
		ebp_ClicsAyerRR = "clicks yesterday RR:";
		ebp_Clics10DiasRR = "clicks last 10 days RR:";
		ebp_MontReciclaHoy = "recycling today:"; 
		ebp_MontReciclaAyer = "recycling yesterday:";
		ebp_MontRecicla10Dias = "recycling last 10 days:";
		ebp_ReciclaGratisHoy = "Automatic Recycling today:"; 
		ebp_MontRenuevaHoy = "renewal today:";
		ebp_MontRenuevaAyer = "renewal yesterday:";
		ebp_MontRenueva10Dias = "renewal last 10 days:";
		
		ebp_MontRenuevaHoyManual = "renewal today (Manual):";
		ebp_MontRenuevaAyerManual = "renewal yesterday (Manual):";
		ebp_MontRenueva10DiasManual = "renewal last 10 days (Manual):";
		ebp_MontRenuevaHoyAuto = "renewal today (AutoRenew):";
		ebp_MontRenuevaAyerAuto = "renewal yesterday (AutoRenew):";
		ebp_MontRenueva10DiasAuto = "renewal last 10 days (AutoRenew):";
		
		ebp_MontAutoPagoHoy = "AutoPay today:";
		ebp_MontAutoPagoAyer = "AutoPay yesterday:";
		ebp_MontAutoPago10Dias = "AutoPay last 10 days:"; 
		ebp_ffRelativa = "Relative";
		ebp_ffExacta = "Real";
		ebp_TextConfig = "Settings"
		ebp_TextDatos = "Data";
		ebp_TextGuarda = "Save";
		ebp_TextSalir = "Close";
		ebp_TextMensL1 = "Export Dates in Standard Format?";
		ebp_TextMensL2 = "The data is exported in the format YYYY/MM/DD HH:MM";
		ebp_TextMensL3 = 'in the data "last click", the hours are placed at 00:00';
		ebp_TextMensL4 = "Exporta Data in NeoBux format?";
		ebp_TextMensL5 = "This is only for the data of direct referrals and rented";
    break;
}

/**
 * Creamos la Cookie(la copie de NeoBuxOX)
 * Arguments:
 * c_name
 * value
 * exdays
 * Cookie value: Option //este valor puede ser 0 para fecha Standar o 1 para fecha normal
 */
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    c_value = c_value + "; path=/";
    document.cookie=c_name + "=" + c_value;
}

/**
 * Get cookie value (la copie de NeoBuxOX)
 * Arguments:
 * c_name
 */
function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
    return null;
}

/**
 * Check if a cookie exists and, if not, ask for data (la copie de NeoBuxOX)
 * Return data entered
 */
function checkCookie()
{
    //Cookie value: Option //este valor puede ser 0 para fecha Standar o 1 para fecha normal
	//revisamos si existe la cookie, sino creamos una nueva cookie
    var data=getCookie("ebp_NeoExport");
	
    if (data != null && data != "")
    {	
		var DataActual = data.split("-");
		if(DataActual.length == 2) //Check for malformed cookie
        {
			return data;
        }
    }
    //la cookie no está o está mala, eliminamos la que este y creamos una nueva
    var d = new Date();
    document.cookie = "ebp_NeoExport=0-0;expires=" + d.toGMTString() + ";" + ";";
    
    //Create a new one
	setCookie("ebp_NeoExport","0-0",365);
	return "0-0";
}

//***********************************************************************************
//**** esta función es para pasar los campos de fecha a un formato standard		*****
//**** de la forma yyyy/mm/dd hh:mm												*****
//**** los parámetros son: 														*****
//**** dFechaOrg: fecha a validar												*****
//**** neoebp_today: fecha del día para comparar								*****
//**** dTipo: indica fecha referidos desde (1), expira en (2) o ultimo clic (3)	*****
//**** nTipoFecha: 0 indica que es fecha exacta, 1 que es relativa				*****
//**** nTipoExporta: 0 indica que es normal, 1 exportar datos al estilo neobux	*****
//***********************************************************************************
function EBP_Fecha_Standard(dFechaOrg,neoebp_today,dTipo,nTipFecha,nTipoExporta)
{
	//verificamos si la fecha por casualidad tiene el signo -, si es así lo eliminamos
	dFechaOrg = dFechaOrg.replace('-','');
	//ahora, verificamos si el campo dFechaOrg contiene la palabra sin clics aún, si es así
	//simplemente regresamos el mismo valor
	var nFormatof = 0;
	if(dFechaOrg.indexOf(ebp_noClick) != -1)
	{
		//si se exportan los datos al estilo neobux y no se han echo clics, se regresa
		//el valor de 20990101
		if(dTipo == 3 && nTipoExporta == 1)
		{
			return "20990101";
		}else{
			return 0;
		}
	}else{
		//lo segundo que debemos hacer es virificar si la variable contien datos entre parentesis,
		//estos datos son colocados por algún script, procedemos a eliminarlos para dejar solamente
		//los datos originales
		if(dFechaOrg.indexOf('(') != -1)
		{
			var posicion1 = dFechaOrg.indexOf('(');
			dFechaOrg = dFechaOrg.substring(0,posicion1);
		}
		//tenemos la fecha que vamos a regresar
		var neoebp_Fecha = new Date();
		//la variable dFechaOrg contiene bien una dato tipo fecha como "01/01/2012 a las 14:21"; Exacta
		//o bien un dato de texto del tipo "156 días"; Relativa
		//o un texto de la forma "hoy a las 11:00"; o salamente "hoy"; puede ser Exacta o Relativa
		//independientemente de cual sea el formato, lo vamos a llevar al formato yyyy/mm/dd hh:mm, en dado caso
		//que el dato original no tenga datos de hora, se coloca las 00:00; esto con la finalidad de que todas
		//las fechas tengan un mismo formato
		
		//vamos a manejar los campos en forma individual; 
		//el campo referido desde, se le resta la fecha y hora si es formato relativa, 
		//si es formato exacta, simplemente se toma la información sin restar nada
		if(dTipo != 3)
		{
			//obtenemos las horas y minutos de la fecha
			var dTiempo_temp = dFechaOrg.split(":");
			var dHora_temp = dTiempo_temp[0].substring(dTiempo_temp[0].length - 2);
			var dMinutos_temp = dTiempo_temp[1].replace("&nbsp;","");
			//pasamos las horas y minutos a milisegundos
			var msegHoras = parseInt(dHora_temp*60*60*1000);
			var msegMinutos = parseInt(dMinutos_temp*60*1000);
		}else{
			var dHora_temp = '00';
			var dMinutos_temp = '00';
			//pasamos las horas y minutos a milisegundos
			var msegHoras = parseInt(0*60*60*1000);
			var msegMinutos = parseInt(0*60*1000);
		}
		
		if(nTipFecha == 1)
		{
			// para el caso de las fechas relativas, hay que obtener los días a sumar o restar
			var dFechaOrg_temp = dFechaOrg.split(" ");
			//obtenemos los días a restar o sumar a la fecha actual
			var ebp_Dias_Dif = parseInt(dFechaOrg_temp[0]);
			//pasamos los días a milisegundos
			var milisegundos = parseInt(ebp_Dias_Dif*24*60*60*1000);
		}
		if(dTipo == 1)
		{		
			//Verificamos si contiene el texto hoy
			if(dFechaOrg.indexOf(ebp_isToday) != -1)
			{
				//obtenemos la fecha del día actual
				neoebp_Fecha.setFullYear(neoebp_today.getFullYear(),neoebp_today.getMonth(),neoebp_today.getDate());
				//si la fecha es exacta, simplemente colocamos las horas
				if(nTipFecha == 0)
				{
					neoebp_Fecha.setHours(dHora_temp);
					neoebp_Fecha.setMinutes(dMinutos_temp);
				//si la fecha es relativa, restamos las horas a la hora actual local
				}else{
					var msdHoy = neoebp_today.getTime(); //obtenemos el valor en milisegundos de la fecha actual.
					var totaltemp = neoebp_Fecha.setTime(parseInt(msdHoy - (msegHoras + msegMinutos))); //restamos el tiempo
				}
			//Verificamos si contiene el texto ayer
			}else if(dFechaOrg.indexOf(ebp_isYesterday) != -1)
			{
				//si la fecha es exacta, restamos uno al día y colocamos las horas
				if(nTipFecha == 0)
				{
					//obtenemos la fecha del día actual y le restamos uno
					neoebp_Fecha.setFullYear(neoebp_today.getFullYear(),neoebp_today.getMonth(),(neoebp_today.getDate()-1));
					neoebp_Fecha.setHours(dHora_temp);
					neoebp_Fecha.setMinutes(dMinutos_temp);
				//si la fecha es relativa, restamos las horas a la hora actual local
				}else{
					//obtenemos la fecha del día actual, y restamos las horas
					neoebp_Fecha.setFullYear(neoebp_today.getFullYear(),neoebp_today.getMonth(),neoebp_today.getDate());
					var msdHoy = neoebp_today.getTime(); //obtenemos el valor en milisegundos de la fecha actual.
					var totaltemp = neoebp_Fecha.setTime(parseInt(msdHoy - (msegHoras + msegMinutos))); //restamos el tiempo
				}
			}
			else
			{
				//Ahora, si es exacta (nTipFecha=0), tomamos la fecha y hora como estan
				if(nTipFecha == 0)
				{
					var dFechaOrg_temp = dFechaOrg.split(" ");
					var dFechaOrg_temp2 = dFechaOrg_temp[0].split("/");
					neoebp_Fecha.setFullYear(dFechaOrg_temp2[0],(dFechaOrg_temp2[1]-1),dFechaOrg_temp2[2]);
					neoebp_Fecha.setHours(dHora_temp);
					neoebp_Fecha.setMinutes(dMinutos_temp);
				}else{
					 //obtenemos el valor en milisegundos de la fecha actual.
					var tiempo = neoebp_today.getTime();
					//restamos el día a la fecha
					var total = neoebp_Fecha.setTime(parseInt(tiempo - milisegundos)); 
					//obtenemos el valor en milisegundos de la fecha actual.
					var msdHoy = neoebp_Fecha.getTime(); 
					//restamos las horas
					var totaltemp = neoebp_Fecha.setTime(parseInt(msdHoy - (msegHoras + msegMinutos))); 	
				}
			}
		//el campo expira en, se le suma la fecha y hora si es formato relativa, 
		//si es formato exacta, simplemente se toma la información sin sumar nada
		}else if(dTipo == 2){
			//Verificamos si contiene el texto hoy
			if(dFechaOrg.indexOf(ebp_isToday) != -1)
			{
				//obtenemos la fecha del día actual
				neoebp_Fecha.setFullYear(neoebp_today.getFullYear(),neoebp_today.getMonth(),neoebp_today.getDate());
				//si la fecha es exacta, simplemente colocamos las horas
				if(nTipFecha == 0)
				{
					neoebp_Fecha.setHours(dHora_temp);
					neoebp_Fecha.setMinutes(dMinutos_temp);
				//si la fecha es relativa, restamos las horas a la hora actual local
				}else{
					//obtenemos el valor en milisegundos de la fecha actual.
					var msdHoy = neoebp_today.getTime(); 
					//sumamos el tiempo
					var totaltemp = neoebp_Fecha.setTime(parseInt(msdHoy + (msegHoras + msegMinutos))); 
				}
			//Verificamos si contiene el texto Mañana
			}else if(dFechaOrg.indexOf(ebp_isTomorrow) != -1)
			{
				//obtenemos la fecha del día actual y le sumamos uno
				neoebp_Fecha.setFullYear(neoebp_today.getFullYear(),neoebp_today.getMonth(),(neoebp_today.getDate()+1));
				//si la fecha es exacta, simplemente colocamos las horas
				if(nTipFecha == 0)
				{
					neoebp_Fecha.setHours(dHora_temp);
					neoebp_Fecha.setMinutes(dMinutos_temp);
				//si la fecha es relativa, restamos las horas a la hora actual local
				}else{
					//obtenemos el valor en milisegundos de la fecha actual.
					var msdHoy = neoebp_today.getTime(); 
					//sumamos el tiempo
					var totaltemp = neoebp_Fecha.setTime(parseInt(msdHoy + (msegHoras + msegMinutos))); 
				}
			//Por último verificamos si tiene la palabra Expirado, lo cual significa que el referido ya murio, 
			//en este caso regresamos la fecha y hora actual
			}else if(dFechaOrg.indexOf(ebp_isExpired) != -1)
			{
				//obtenemos la fecha y hora del día actual
				neoebp_Fecha.setFullYear(neoebp_today.getFullYear(),neoebp_today.getMonth(),neoebp_today.getDate());
			}else{
				//Ahora, si es exacta (nTipFecha=0), tomamos la fecha y hora como estan
				if(nTipFecha == 0)
				{
					var dFechaOrg_temp = dFechaOrg.split(" ");
					var dFechaOrg_temp2 = dFechaOrg_temp[0].split("/");
					neoebp_Fecha.setFullYear(dFechaOrg_temp2[0],(dFechaOrg_temp2[1]-1),dFechaOrg_temp2[2]);
					neoebp_Fecha.setHours(dHora_temp);
					neoebp_Fecha.setMinutes(dMinutos_temp);
				}else{
					 //obtenemos el valor en milisegundos de la fecha actual.
					var tiempo = neoebp_today.getTime();
					//sumamos el día a la fecha
					var total = neoebp_Fecha.setTime(parseInt(tiempo + milisegundos)); 
					//obtenemos el valor en milisegundos de la fecha actual.
					var msdHoy = neoebp_Fecha.getTime(); 
					//sumamos las horas
					var totaltemp = neoebp_Fecha.setTime(parseInt(msdHoy + (msegHoras + msegMinutos))); 	
				}
			}
		//el campo último, se le resta la fecha si es formato relativa, 
		//si es formato exacta, simplemente se toma la información sin restar nada
		}else{
			
			//Verificamos si contiene el texto hoy
			if(dFechaOrg.indexOf(ebp_isToday) != -1)
			{
				//obtenemos la fecha del día actual
				neoebp_Fecha.setFullYear(neoebp_today.getFullYear(),neoebp_today.getMonth(),neoebp_today.getDate());
				//como este campo no tiene horas, colocamos las horas 00:00
				neoebp_Fecha.setHours(dHora_temp);
				neoebp_Fecha.setMinutes(dMinutos_temp);
				
			//Verificamos si contiene el texto ayer
			}else if(dFechaOrg.indexOf(ebp_isYesterday) != -1)
			{
				//obtenemos la fecha del día actual y le restamos uno
				neoebp_Fecha.setFullYear(neoebp_today.getFullYear(),neoebp_today.getMonth(),(neoebp_today.getDate()-1));
				//como este campo no tiene horas, colocamos las horas 00:00
				neoebp_Fecha.setHours(dHora_temp);
				neoebp_Fecha.setMinutes(dMinutos_temp);
			}
			else
			{
				//Ahora, si es exacta (nTipFecha=0), tomamos la fecha y hora como estan
				if(nTipFecha == 0)
				{
					var dFechaOrg_temp = dFechaOrg.split(" ");
					var dFechaOrg_temp2 = dFechaOrg_temp[0].split("/");
					neoebp_Fecha.setFullYear(dFechaOrg_temp2[0],(dFechaOrg_temp2[1]-1),dFechaOrg_temp2[2]);
					neoebp_Fecha.setHours(dHora_temp);
					neoebp_Fecha.setMinutes(dMinutos_temp);
				}else{
					 //obtenemos el valor en milisegundos de la fecha actual.
					var tiempo = neoebp_today.getTime();
					//restamos el día a la fecha
					var total = neoebp_Fecha.setTime(parseInt(tiempo - milisegundos)); 
					neoebp_Fecha.setHours(dHora_temp);
					neoebp_Fecha.setMinutes(dMinutos_temp);
				}
			}
		}
		var mesActual = neoebp_Fecha.getMonth();
		mesActual = mesActual + 1;
		if(mesActual < 10)
		{
			mesActual = "0" + mesActual;
		}
		var diaActual = neoebp_Fecha.getDate();
		if(diaActual < 10)
		{
			diaActual = "0" + diaActual;
		}
		var horaActual = neoebp_Fecha.getHours();
		if(horaActual < 10)
		{
			horaActual = "0" + horaActual;
		}
		var minutosActual = neoebp_Fecha.getMinutes();
		if(minutosActual < 10)
		{
			minutosActual = "0" + minutosActual;
		}
		
		if(nTipoExporta == 0)
		{
			var tMiFecha =	neoebp_Fecha.getFullYear() + '/' + mesActual + '/' + diaActual;
			tMiFecha = tMiFecha + ' ' + horaActual + ':' + minutosActual;
		}else{
			var tMiFecha =	neoebp_Fecha.getFullYear().toString() +  mesActual.toString() + diaActual.toString();
		}
		
		return tMiFecha;
	}
}

//***********************************************************************************
//**** Resumen de Cuenta, leemos la información actual							*****
//***********************************************************************************
function EBP_Copia_Resumen()
{
	//obtenemos la información general de la cuenta, obtenemos la matrix que indica cual es el item y la matrix con
	//el valor correspondiente a dicho item
	var EBP_Matrix_Item = document.evaluate("//td[@class='f_r2 x']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var EBP_Matrix_Valor = document.evaluate("//td[@class='f_r2']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	//creamos una matriz vacia para los items y sus valores
	var EBP_Matrix_Item_Text = new Array();
	var EBP_Matrix_Valor_Text = new Array();
	var mitexto ="";
	var posicion1 = 0;
	var posicion2 = 1;
	var porcion = "";
	var porcion2 = "";
	var bMiPermisivo = false;
	
	//para cada valor de la matrix, copiamos el item y el valor en un texto para luego
	//pasarlo a la nueva ventana
	var sTextoCompara = ebp_DirectText.split(";");
	
	for (var i=1; i<(EBP_Matrix_Item.snapshotLength); i++)
	{
		EBP_Matrix_Item_Text[i] = EBP_Matrix_Item.snapshotItem(i).innerHTML;
		EBP_Matrix_Valor_Text[i] = EBP_Matrix_Valor.snapshotItem(i).innerHTML;
		//le coloco este filtro porque en las cuentas golden hay varios
		//campos antes del total de referidos directos que no es necesario obtenerlos
		
		if(EBP_Matrix_Item_Text[i].indexOf(sTextoCompara[0]) !=-1 || EBP_Matrix_Item_Text[i].indexOf(sTextoCompara[1]) !=-1 || EBP_Matrix_Item_Text[i].indexOf(sTextoCompara[2]) !=-1 || bMiPermisivo)
		{
			bMiPermisivo = true;
			if(EBP_Matrix_Item_Text[i].indexOf("<")!=-1)
			{
				posicion1 = EBP_Matrix_Item_Text[i].indexOf('>');
				posicion2 = EBP_Matrix_Item_Text[i].lastIndexOf('<');
				porcion = EBP_Matrix_Item_Text[i].substring(posicion1+1,posicion2);
				porcion = porcion.replace(":","");
				EBP_Matrix_Item_Text[i] = porcion;
			}else{
				porcion = EBP_Matrix_Item_Text[i];
				porcion = porcion.replace(":","");
				EBP_Matrix_Item_Text[i] = porcion;
			}
			
			var TextoTempo = stripHTML(EBP_Matrix_Valor_Text[i]).split(";");
			porcion = TextoTempo[0];
			porcion = porcion.replace("&nbsp;","");
			porcion = porcion.replace("$","");
			
			EBP_Matrix_Valor_Text[i] = porcion;
			
			mitexto = mitexto + EBP_Matrix_Item_Text[i] + ":" + EBP_Matrix_Valor_Text[i] + "\n";
			
		}
	}
	
	
	//Obtenemos información sobre si hay Adprize Ganados el día de hoy
	//table width="100%" cellspacing="0" cellpadding="1"
	var EBP_Matrix_Premios = document.evaluate("//table[@width='100%'][@cellspacing='0'][@cellpadding='1']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	//var EBP_Matrix_Premios = document.evaluate("//td[@class='mbx'] [@width='49%'] [@style='border:1px solid #777;background-color:#fff;padding:15px;']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var EBP_Matrix_Historial = EBP_Matrix_Premios.snapshotItem(0).innerHTML.split("<tr>");
	var EBP_Total_AdPrize_Hoy = 0;
	
	for (var i=0; i<(EBP_Matrix_Historial.length-1); i++)
	{
		var EBP_Matrix_Historial_Tex = EBP_Matrix_Historial[i];
		//si conseguimos el texto AdPrize y el texto hoy, sumamos para el total de AdPrizes del día
		//campos antes del total de referidos directos que no es necesario
		//obtenerlos
		if(EBP_Matrix_Historial_Tex.indexOf('AdPrize') !=-1)
		{
			if(EBP_Matrix_Historial_Tex.indexOf(ebp_isToday) !=-1)
			{
				EBP_Total_AdPrize_Hoy = Number(EBP_Total_AdPrize_Hoy) + 1;
			}
		}
	}
	mitexto = mitexto + "AdPrize" + ":" + EBP_Total_AdPrize_Hoy + "\n";
	
	//Obtenemos la data de la gráfica de clics diarios
	//este código lo tome del nebuxox de proxen
    var EBP_scharts = document.evaluate("//script[contains(.,'eval(w(')]", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.split(" ");
		
    for(var i=0; i<EBP_scharts.length-1; i++)
    {
        EBP_chartValues = obtainChartValues(EBP_scharts[i].split("'")[1],1);
        switch(EBP_chartValues[0])
            {
            case "ch_cliques": //Clics Diarios Fijos + Extendidos
                
				EBP_chartValues = EBP_chartValues.reverse();
                EBP_dTodayClicks = EBP_chartValues[0];
				mitexto = mitexto + ebp_TotClicsHoy +  Number(EBP_dTodayClicks) + "\n";
                EBP_dYesterdayClicks = EBP_chartValues[1];
                mitexto = mitexto + ebp_TotClicsAyer +  Number(EBP_dYesterdayClicks) + "\n";
				var EBP_dTotalClicks = 0;
				for(var n=0;n<EBP_chartValues.length-1;n++)
                {
                    EBP_dTotalClicks = Number(EBP_dTotalClicks) + Number(EBP_chartValues[n]);
                }
				mitexto = mitexto + ebp_TotClics10Dias + EBP_dTotalClicks + "\n";
            break;
            default:
            break;
        }
    }
	//obtenemos el campo de los datos y le pasamos los mismos
	var ebpTextAreaDatos = document.getElementById('neoexportebp_export_field'); 
	ebpTextAreaDatos.innerHTML = mitexto;
	
	var el = document.getElementById('neoexportebp_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div	
	var ebpdivDatos = document.getElementById('neoexportebp_export_window'); //se define la variable "el" igual a nuestro div
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}
//***********************************************************************************
//**** para las página de estadísticas de la Cuenta								*****
//***********************************************************************************
function EBP_Copia_Estadisticas()
{	
	var mitexto ="";
	//Obtenemos la data de las gráficas para obtener el valor del día actual
	//este código lo tome del nebuxox de proxen
    var EBP_scharts = document.evaluate("//script[contains(.,'eval(w(')]", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.split(" ");
    for(var i=0; i<EBP_scharts.length-1; i++)
    {
		EBP_chartValues = obtainChartValues(EBP_scharts[i].split("'")[1],1);
        
		switch(EBP_chartValues[0])
            {
			case "ch_cliques": //gráfica de clics propios
				var EBP_dTotalClicks=0;
				EBP_chartValues = EBP_chartValues.reverse();
				EBP_dTodayClicks = EBP_chartValues[1];
				mitexto = mitexto + ebp_CPTotalHoy +  Number(EBP_dTodayClicks) + "\n";
                
				EBP_chartValues = obtainChartValues(EBP_scharts[i].split("'")[1],2);
				EBP_dTotalClicks=0;
				EBP_chartValues = EBP_chartValues.reverse();
				EBP_dTodayClicks = EBP_chartValues[1];
				mitexto = mitexto + ebp_CPFijosFHoy +  Number(EBP_dTodayClicks) + "\n";
				
				EBP_chartValues = obtainChartValues(EBP_scharts[i].split("'")[1],3);
				EBP_dTotalClicks=0;
				EBP_chartValues = EBP_chartValues.reverse();
				EBP_dTodayClicks = EBP_chartValues[1];
				mitexto = mitexto + ebp_CPMicroHoy +  Number(EBP_dTodayClicks) + "\n";
				
				EBP_chartValues = obtainChartValues(EBP_scharts[i].split("'")[1],4);
				EBP_dTotalClicks=0;
				EBP_chartValues = EBP_chartValues.reverse();
				EBP_dTodayClicks = EBP_chartValues[1];
				mitexto = mitexto + ebp_CPMiniHoy +  Number(EBP_dTodayClicks) + "\n";
				
				EBP_chartValues = obtainChartValues(EBP_scharts[i].split("'")[1],5);
				EBP_dTotalClicks=0;
				EBP_chartValues = EBP_chartValues.reverse();
				EBP_dTodayClicks = EBP_chartValues[1];
				mitexto = mitexto + ebp_CPProlongadoHoy +  Number(EBP_dTodayClicks) + "\n";
				
				EBP_chartValues = obtainChartValues(EBP_scharts[i].split("'")[1],6);
				EBP_dTotalClicks=0;
				EBP_chartValues = EBP_chartValues.reverse();
				EBP_dTodayClicks = EBP_chartValues[1];
				mitexto = mitexto + ebp_CPStandarHoy +  Number(EBP_dTodayClicks) + "\n";
				
				EBP_chartValues = obtainChartValues(EBP_scharts[i].split("'")[1],7);
				EBP_dTotalClicks=0;
				EBP_chartValues = EBP_chartValues.reverse();
				EBP_dTodayClicks = EBP_chartValues[1];
				mitexto = mitexto + ebp_CPFijosNHoy +  Number(EBP_dTodayClicks) + "\n";
            break;
			case "ch_cdd": //gráfica de referidos directos
                var EBP_dTotalClicks=0;
				EBP_chartValues = EBP_chartValues.reverse();
                EBP_dTodayClicks = EBP_chartValues[0];
				mitexto = mitexto + ebp_ClicsHoyRD +  Number(EBP_dTodayClicks) + "\n";
                EBP_dYesterdayClicks = EBP_chartValues[1];
				mitexto = mitexto + ebp_ClicsAyerRD +  Number(EBP_dYesterdayClicks) + "\n";
				for(var n=0;n<EBP_chartValues.length-1;n++)
                {
                    EBP_dTotalClicks = Number(EBP_dTotalClicks) + Number(EBP_chartValues[n]);
                }
				mitexto = mitexto + ebp_Clics10DiasRD + EBP_dTotalClicks + "\n";	
				
            break;
            case "ch_cr": //Gráfica de referidos rentados
                var EBP_rTotalClicks = 0;
				EBP_chartValues = EBP_chartValues.reverse();
                EBP_rTodayClicks = EBP_chartValues[0];
				mitexto = mitexto + ebp_ClicsHoyRR +  Number(EBP_rTodayClicks) + "\n";
                EBP_rYesterdayClicks = EBP_chartValues[1];
				mitexto = mitexto + ebp_ClicsAyerRR +  Number(EBP_rYesterdayClicks) + "\n";
                for(var n=0;n<EBP_chartValues.length-1;n++)
                {
                    EBP_rTotalClicks = Number(EBP_rTotalClicks) + Number(EBP_chartValues[n]);
                }
				mitexto = mitexto + ebp_Clics10DiasRR + EBP_rTotalClicks + "\n";
            break;
            case "ch_recycle": //Gráfica Costo de Reciclaje
                var EBP_recycledTotal = 0;
				EBP_chartValues = EBP_chartValues.reverse();
                EBP_recycledToday = EBP_chartValues[0];
				mitexto = mitexto + ebp_MontReciclaHoy +  Number(EBP_recycledToday) + "\n";
                EBP_recycledYesterday = EBP_chartValues[1];
				mitexto = mitexto + ebp_MontReciclaAyer +  Number(EBP_recycledYesterday) + "\n";
                for(var n=0;n<10;n++)
                {
                    EBP_recycledTotal = Number(EBP_recycledTotal) + Number(EBP_chartValues[n]);
                }
				var original=parseFloat(EBP_recycledTotal);
				var EBP_recycledTotal=Math.round(original*1000)/1000;
				mitexto = mitexto + ebp_MontRecicla10Dias + EBP_recycledTotal + "\n";
            break;
			case "ch_trar": //Gráfica Reciclajes Automáticos
                EBP_recycledTotal = 0;
				EBP_chartValues = EBP_chartValues.reverse();
                EBP_recycledToday = EBP_chartValues[0];
				mitexto = mitexto + ebp_ReciclaGratisHoy +  Number(EBP_recycledToday) + "\n";
            break;
			//ch_extensions; ch_extensions_all; ch_extensions_man; ch_extensions_aut
            case "ch_extensions_all": //Gráfica de renovaciones
                EBP_renewedTotal = 0;
				EBP_chartValues = EBP_chartValues.reverse();
				
                EBP_renewedToday = EBP_chartValues[0];
				mitexto = mitexto + ebp_MontRenuevaHoy +  Number(EBP_renewedToday) + "\n";
                EBP_renewedYesterday = EBP_chartValues[1];
				mitexto = mitexto + ebp_MontRenuevaAyer +  Number(EBP_renewedYesterday) + "\n";
                for(var n=1;n<11;n++)
                {
					EBP_renewedTotal = Number(EBP_renewedTotal) + Number(EBP_chartValues[n]);
                }
				var original=parseFloat(EBP_renewedTotal);
				var EBP_renewedTotal=Math.round(original*1000)/1000;
				mitexto = mitexto + ebp_MontRenueva10Dias + EBP_renewedTotal + "\n";
				
				
				EBP_renewedTotal = 0;
				EBP_chartValues = obtainChartValues(EBP_scharts[i].split("'")[1],2);
				EBP_chartValues = EBP_chartValues.reverse();
				
                EBP_renewedToday = EBP_chartValues[0];
				mitexto = mitexto + ebp_MontRenuevaHoyManual +  Number(EBP_renewedToday) + "\n";
                EBP_renewedYesterday = EBP_chartValues[1];
				mitexto = mitexto + ebp_MontRenuevaAyerManual +  Number(EBP_renewedYesterday) + "\n";
                for(var n=1;n<11;n++)
                {
                    EBP_renewedTotal = Number(EBP_renewedTotal) + Number(EBP_chartValues[n]);
                }
				var original=parseFloat(EBP_renewedTotal);
				var EBP_renewedTotal=Math.round(original*1000)/1000;
				mitexto = mitexto + ebp_MontRenueva10DiasManual + EBP_renewedTotal + "\n";
				
				
				EBP_renewedTotal = 0;
				EBP_chartValues = obtainChartValues(EBP_scharts[i].split("'")[1],3);
				EBP_chartValues = EBP_chartValues.reverse();
				
                EBP_renewedToday = EBP_chartValues[0];
				mitexto = mitexto + ebp_MontRenuevaHoyAuto +  Number(EBP_renewedToday) + "\n";
                EBP_renewedYesterday = EBP_chartValues[1];
				mitexto = mitexto + ebp_MontRenuevaAyerAuto +  Number(EBP_renewedYesterday) + "\n";
                for(var n=1;n<11;n++)
                {
                    EBP_renewedTotal = Number(EBP_renewedTotal) + Number(EBP_chartValues[n]);
                }
				var original=parseFloat(EBP_renewedTotal);
				var EBP_renewedTotal=Math.round(original*1000)/1000;
				mitexto = mitexto + ebp_MontRenueva10DiasAuto + EBP_renewedTotal + "\n";
				
				
            break;
            case "ch_autopay": //Gráfica de Autopago
                EBP_autopayTotal = 0;
				EBP_chartValues = EBP_chartValues.reverse();
                EBP_autopayToday = EBP_chartValues[0];
				mitexto = mitexto + ebp_MontAutoPagoHoy +  Number(EBP_autopayToday) + "\n";
                EBP_autopayYesterday = EBP_chartValues[1];
				mitexto = mitexto + ebp_MontAutoPagoAyer +  Number(EBP_autopayYesterday) + "\n";
                for(var n=0;n<10;n++)
                {
                    EBP_autopayTotal = Number(EBP_autopayTotal) + Number(EBP_chartValues[n]);
                }
				var original=parseFloat(EBP_autopayTotal);
				var EBP_autopayTotal=Math.round(original*1000)/1000;
				
				mitexto = mitexto + ebp_MontAutoPago10Dias + EBP_autopayTotal + "\n";
            break;
			default:
            break;
        }
    }
	//obtenemos el campo de los datos y le pasamos los mismos
	var ebpTextAreaDatos = document.getElementById('neoexportebp_export_field'); 
	ebpTextAreaDatos.innerHTML = mitexto;
	
	var el = document.getElementById('neoexportebp_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div	
	var ebpdivDatos = document.getElementById('neoexportebp_export_window'); //se define la variable "el" igual a nuestro div
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}

//***********************************************************************************
//**** para la página de los referidos directos									*****
//***********************************************************************************
function EBP_Copia_RD()
{
	//verificamos en la cookie cual es el tipo de formato para exportar los datos
	var sOpcCheckBox = checkCookie();
	sOpcCheckBox = sOpcCheckBox.split("-");
	nFormaFecha = sOpcCheckBox[0];
	if(sOpcCheckBox[1] == 1)
	{
		nFormaFecha = 2;
	}
	
    //Obtenemos la tabla de referidos
    var EBP_TablaRD = document.evaluate("//table[@style='border-top:1px solid #aaaaaa;']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	var mitexto ="";
	var largotexto = 10;
	var textoTemporal = "";
	var ebp_Fechahoy = new Date();
	//Recorremos toda la tabla
    //Iniciamos el la tercera fila (la primera es el encabezado y la segunda es una línea azul)
    for (var i=2; i<(EBP_TablaRD.rows.length-2); i++) {
	
		if(EBP_TablaRD.rows[i].cells[0].getAttribute('colspan') != null) continue;//continue if intermediate row
		
		//variables para el formato del tipo de fecha; 0 = exactas, 1=relativas
		var ebp_RrFfRefDesde = 0;
		var ebp_RrFfUltClic = 0;
		//Obtenemos el formato para los campos de fecha, Relativas o Exactas
		var EBP_TblFormato = document.evaluate("//div[@class='f_r']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var ebp_rrForTexto = stripHTML(EBP_TblFormato.snapshotItem(0).innerHTML);
		var ebp_rrFormatos = ebp_rrForTexto.split("·");
		
		var ebp_rrForIndv = ebp_rrFormatos[0].split(":");
		if(ebp_trim(ebp_rrForIndv[2]) == ebp_ffRelativa)
		{
			ebp_RrFfRefDesde = 1;
		}
		ebp_rrForIndv = ebp_rrFormatos[1].split(":");
		if(ebp_trim(ebp_rrForIndv[1]) == ebp_ffRelativa)
		{
			ebp_RrFfUltClic = 1;
		}
		//Obtenemos el número del referido
		var EBP_NumRD = EBP_TablaRD.rows[i].cells[0].innerHTML.replace(/&nbsp;/gi,"");
		//Obtenemos el nombre del referido
		var EBP_NombreRD = stripHTML(EBP_TablaRD.rows[i].cells[1].innerHTML);
		EBP_NombreRD = EBP_NombreRD.replace(/&nbsp;/gi,"");
		//Obtenemos el sitio de donde vino el referido
		var EBP_OrigenRD = EBP_TablaRD.rows[i].cells[2].innerHTML.replace(/&nbsp;/gi,"");
		//Obtenemos la fecha desde que es referido
		var EBP_NumRDDesde = EBP_TablaRD.rows[i].cells[3].innerHTML.replace(/&nbsp;/gi,"");
		EBP_NumRDDesde = stripHTML(EBP_NumRDDesde);
		if (nFormaFecha == 1)
		{
			EBP_NumRDDesde = EBP_Fecha_Standard(EBP_NumRDDesde, ebp_Fechahoy, 1,ebp_RrFfRefDesde,0)
		}else{
			if (nFormaFecha == 2)
			{
				EBP_NumRDDesde = EBP_Fecha_Standard(EBP_NumRDDesde, ebp_Fechahoy, 1,ebp_RrFfRefDesde,1)
			}else{
				//virificamos si la variable contien datos entre parentesis,
				//estos datos son colocados por algún script, procedemos a eliminarlos para dejar solamente
				//los datos originales
				if(EBP_NumRDDesde.indexOf('(') != -1)
				{
					var posicion1 = EBP_NumRDDesde.indexOf('(');
					EBP_NumRDDesde = EBP_NumRDDesde.substring(0,posicion1);
				}
			}
		}
		//Obtenemos la fecha del último clic
		var EBP_UltimoClic = EBP_TablaRD.rows[i].cells[4].innerHTML.replace(/&nbsp;/gi,"");
		EBP_UltimoClic = stripHTML(EBP_UltimoClic);
		if (nFormaFecha == 1)
		{
			EBP_UltimoClic = EBP_Fecha_Standard(EBP_UltimoClic, ebp_Fechahoy, 3,ebp_RrFfUltClic,0)
		}else{
			if (nFormaFecha == 2)
			{
				EBP_UltimoClic = EBP_Fecha_Standard(EBP_UltimoClic, ebp_Fechahoy, 3,ebp_RrFfUltClic,1)
			}else{
				//verificamos si la variable contien datos entre parentesis o corchetes,
				//estos datos son colocados por algún script, procedemos a eliminarlos para dejar solamente
				//los datos originales
				if(EBP_UltimoClic.indexOf('(') != -1 || EBP_UltimoClic.indexOf('[') != -1)
				{
					var posicion1 = EBP_UltimoClic.indexOf('(');
                    if(posicion1 == -1)
                    {
                       posicion1 = EBP_UltimoClic.indexOf('['); 
                    }
					EBP_UltimoClic = EBP_UltimoClic.substring(0,posicion1);
				}
			}
		}
		//Obtenemos el total de clics
		var EBP_TotalClic = EBP_TablaRD.rows[i].cells[5].innerHTML.replace(/&nbsp;/gi,"");
		//Obtenemos el valor de la media
		var EBP_ValorMedia = EBP_TablaRD.rows[i].cells[6].innerHTML.replace(/&nbsp;/gi,"");
		EBP_ValorMedia = stripHTML(EBP_ValorMedia);
        //verificamos si la variable contien datos entre parentesis o corchetes,
        //estos datos son colocados por algún script, procedemos a eliminarlos para dejar solamente
        //los datos originales
        if(EBP_ValorMedia.indexOf('(') != -1 || EBP_ValorMedia.indexOf('|') != -1)
            {
            var posicion1 = EBP_ValorMedia.indexOf('(');
            if(posicion1 == -1)
            {
                posicion1 = EBP_ValorMedia.indexOf('|'); 
            }
			EBP_ValorMedia = EBP_ValorMedia.substring(0,posicion1);
		}
		//Verificamos si es un numero el valor de la media, sino regresamo el valor 0.000
		if(isNaN(EBP_ValorMedia))
		{
			EBP_ValorMedia = '0.000';
		}
		
		EBP_NumRD = EBP_NumRD.trim();
		EBP_NombreRD = EBP_NombreRD.trim();
		EBP_OrigenRD = EBP_OrigenRD.trim();
		EBP_NumRDDesde = EBP_NumRDDesde.trim();
		EBP_UltimoClic = EBP_UltimoClic.trim();
		EBP_TotalClic= EBP_TotalClic.trim();
		EBP_ValorMedia= EBP_ValorMedia.trim();
		
		if (nFormaFecha == 2)
		{
			textoTemporal = EBP_NombreRD + "," + EBP_NumRDDesde + "," + EBP_UltimoClic + "," + EBP_TotalClic + "\n";
		}else{
			textoTemporal = EBP_NumRD + ";" + EBP_NombreRD + ";" + EBP_OrigenRD + ";" + EBP_NumRDDesde + ";" + EBP_UltimoClic + ";"; 
			textoTemporal += EBP_TotalClic + ";" +EBP_ValorMedia + "\n";
		}
		
		if(textoTemporal.length > largotexto)
		{
			largotexto = textoTemporal.length;
		}
		mitexto = mitexto + textoTemporal;
	}
	
	//obtenemos el campo de los datos y le pasamos los mismos
	var ebpTextAreaDatos = document.getElementById('neoexportebp_export_field'); 
	ebpTextAreaDatos.innerHTML = mitexto;
	
	var el = document.getElementById('neoexportebp_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div	
	var ebpdivDatos = document.getElementById('neoexportebp_export_window'); //se define la variable "el" igual a nuestro div
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}

//***********************************************************************************
//**** para la página de los referidos rentados									*****
//***********************************************************************************
function EBP_Copia_RR()
{
	//verificamos en la cookie cual es el tipo de formato para exportar los datos
	var sOpcCheckBox = checkCookie();
	sOpcCheckBox = sOpcCheckBox.split("-");
	nFormaFecha = sOpcCheckBox[0];
	if(sOpcCheckBox[1] == 1)
	{
		nFormaFecha = 2;
	}
    //Obtenemos la tabla de referidos
    var EBP_TablaRR = document.evaluate("//table[@style='border-top:1px solid #aaaaaa;']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	var mitexto = "";
	var largotexto = 10;
	var textoTemporal = "";
	var ebp_Fechahoy = new Date();
	//variables para el formato del tipo de fecha; 0 = exactas, 1=relativas
	var ebp_RrFfRefDesde = 0;
	var ebp_RrFfExpEn = 0;
	var ebp_RrFfUltClic = 0;
	//Obtenemos el formato para los campos de fecha, Relativas o Exactas
	var EBP_TblFormato = document.evaluate("//div[@class='f_r']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var ebp_rrForTexto = stripHTML(EBP_TblFormato.snapshotItem(0).innerHTML);
	var ebp_rrFormatos = ebp_rrForTexto.split("·");
	
	var ebp_rrForIndv = ebp_rrFormatos[0].split(":");
	if(ebp_trim(ebp_rrForIndv[2]) == ebp_ffRelativa)
    {
        ebp_RrFfRefDesde = 1;
    }
	ebp_rrForIndv = ebp_rrFormatos[1].split(":");
	if(ebp_trim(ebp_rrForIndv[1]) == ebp_ffRelativa)
    {
        ebp_RrFfExpEn = 1;
    }
	ebp_rrForIndv = ebp_rrFormatos[2].split(":");
	if(ebp_trim(ebp_rrForIndv[1]) == ebp_ffRelativa)
    {
        ebp_RrFfUltClic = 1;
    }
	
	//Recorremos toda la tabla
    //Iniciamos el la tercera fila (la primera es el encabezado y la segunda es una línea azul)
    for (var i=2; i<(EBP_TablaRR.rows.length-2); i++) {
	
		if(EBP_TablaRR.rows[i].cells[0].getAttribute('colspan') != null) continue;//continue if intermediate row
		
		//Obtenemos el número del referido
		var EBP_NumRR = EBP_TablaRR.rows[i].cells[0].innerHTML.replace(/&nbsp;/gi,"");
		//Obtenemos el nombre del referido
		var EBP_NombreRR = stripHTML(EBP_TablaRR.rows[i].cells[2].innerHTML);
		EBP_NombreRR = EBP_NombreRR.replace(/&nbsp;/gi,"");
		//Obtenemos la fecha desde que es referido
		var EBP_NumRRDesde = EBP_TablaRR.rows[i].cells[3].innerHTML.replace(/&nbsp;/gi,"");
		EBP_NumRRDesde = stripHTML(EBP_NumRRDesde);
		if (nFormaFecha == 1)
		{
			EBP_NumRRDesde = EBP_Fecha_Standard(EBP_NumRRDesde, ebp_Fechahoy, 1, ebp_RrFfRefDesde,0)
		}else{
			if (nFormaFecha == 2)
			{
				EBP_NumRRDesde = EBP_Fecha_Standard(EBP_NumRRDesde, ebp_Fechahoy, 1, ebp_RrFfRefDesde,1)
			}else{
				//virificamos si la variable contien datos entre parentesis,
				//estos datos son colocados por algún script, procedemos a eliminarlos para dejar solamente
				//los datos originales
				if(EBP_NumRRDesde.indexOf('(') != -1)
				{
					var posicion1 = EBP_NumRRDesde.indexOf('(');
					EBP_NumRRDesde = EBP_NumRRDesde.substring(0,posicion1);
				}
			}
		}
		//Obtenemos la fecha en que expira el referido
		var EBP_NumRRExpira = EBP_TablaRR.rows[i].cells[4].innerHTML.replace(/&nbsp;/gi,"");
		EBP_NumRRExpira = stripHTML(EBP_NumRRExpira);
		if (nFormaFecha == 1)
		{
			EBP_NumRRExpira = EBP_Fecha_Standard(EBP_NumRRExpira, ebp_Fechahoy, 2, ebp_RrFfExpEn,0)
		}else{
			//virificamos si la variable contien datos entre parentesis,
			//estos datos son colocados por algún script, procedemos a eliminarlos para dejar solamente
			//los datos originales
			if(EBP_NumRRExpira.indexOf('(') != -1)
			{
				var posicion1 = EBP_NumRRExpira.indexOf('(');
				EBP_NumRRExpira = EBP_NumRRExpira.substring(0,posicion1);
			}
		}
		//Obtenemos la fecha del último clic
		var EBP_UltimoClic = EBP_TablaRR.rows[i].cells[5].innerHTML.replace(/&nbsp;/gi,"");
		EBP_UltimoClic = stripHTML(EBP_UltimoClic);
		if (nFormaFecha == 1)
		{
			EBP_UltimoClic = EBP_Fecha_Standard(EBP_UltimoClic, ebp_Fechahoy, 3, ebp_RrFfUltClic,0)
		}else{
			if (nFormaFecha == 2)
			{
				EBP_UltimoClic = EBP_Fecha_Standard(EBP_UltimoClic, ebp_Fechahoy, 3, ebp_RrFfUltClic,1)
			}else{
				//verificamos si la variable contien datos entre parentesis o corchetes,
				//estos datos son colocados por algún script, procedemos a eliminarlos para dejar solamente
				//los datos originales
				if(EBP_UltimoClic.indexOf('(') != -1 || EBP_UltimoClic.indexOf('[') != -1)
				{
					var posicion1 = EBP_UltimoClic.indexOf('(');
                    if(posicion1 == -1)
                    {
                       posicion1 = EBP_UltimoClic.indexOf('['); 
                    }
					EBP_UltimoClic = EBP_UltimoClic.substring(0,posicion1);
				}
			}
		}
		//Obtenemos el total de clics
		var EBP_TotalClic = EBP_TablaRR.rows[i].cells[6].innerHTML.replace(/&nbsp;/gi,"");
		//Obtenemos el valor de la media
		var EBP_ValorMedia = EBP_TablaRR.rows[i].cells[7].innerHTML.replace(/&nbsp;/gi,"");
		EBP_ValorMedia = stripHTML(EBP_ValorMedia);
        //verificamos si la variable contien datos entre parentesis o corchetes,
        //estos datos son colocados por algún script, procedemos a eliminarlos para dejar solamente
        //los datos originales
        if(EBP_ValorMedia.indexOf('(') != -1 || EBP_ValorMedia.indexOf('|') != -1)
            {
            var posicion1 = EBP_ValorMedia.indexOf('(');
            if(posicion1 == -1)
            {
                posicion1 = EBP_ValorMedia.indexOf('|'); 
            }
			EBP_ValorMedia = EBP_ValorMedia.substring(0,posicion1);
		}
		//Verificamos si es un numero el valor de la media, sino regresamo el valor 0.000
		if(isNaN(EBP_ValorMedia))
		{
			EBP_ValorMedia = '0.000';
		}
		EBP_NombreRR = EBP_NombreRR.trim();
		EBP_NumRRDesde = EBP_NumRRDesde.trim();
		EBP_UltimoClic = EBP_UltimoClic.trim();
		EBP_TotalClic = EBP_TotalClic.trim();
		EBP_NumRR = EBP_NumRR.trim();
		EBP_NumRRExpira= EBP_NumRRExpira.trim();
		EBP_ValorMedia= EBP_ValorMedia.trim();
		
		if (nFormaFecha == 2)
		{
			textoTemporal = EBP_NombreRR + "," + EBP_NumRRDesde + "," + EBP_UltimoClic + "," + EBP_TotalClic + "\n";
		}else{
			textoTemporal = EBP_NumRR + ";" + EBP_NombreRR + ";" + EBP_NumRRDesde + ";" + EBP_NumRRExpira + ";" + EBP_UltimoClic;
			textoTemporal += ";" + EBP_TotalClic + ";" +EBP_ValorMedia + "\n";
		}
		
		if(textoTemporal.length > largotexto)
		{
			largotexto = textoTemporal.length;
		}
		mitexto = mitexto + textoTemporal;
	}
	
	var ebpTextAreaDatos = document.getElementById('neoexportebp_options_window');
	if (!ebpTextAreaDatos){
		EBP_Cuadro_Datos(2);
	} else {
		var padre = ebpTextAreaDatos.parentNode;
		padre.removeChild(ebpTextAreaDatos);
		EBP_Cuadro_Datos(2);
	}
	
	//obtenemos el campo de los datos y le pasamos los mismos
	var ebpTextAreaDatos = document.getElementById('neoexportebp_export_field'); 
	ebpTextAreaDatos.innerHTML = "";
	ebpTextAreaDatos.innerHTML = mitexto;
	
	var el = document.getElementById('neoexportebp_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div	
	var ebpdivDatos = document.getElementById('neoexportebp_export_window'); //se define la variable "el" igual a nuestro div
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}

//***********************************************************************************
//**** Para la página de Opciones Personales									*****
//***********************************************************************************
function EBP_Opciones_NeoExportEBP()
{
	var el = document.getElementById('neoexportebp_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div	
	var ebpdivSetting = document.getElementById('neoexportebp_settings_window'); //se define la variable "el" igual a nuestro div
	ebpdivSetting.style.display = (ebpdivSetting.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}

//***********************************************************************************
//****funcion para eliminar cualquier codigo html de una cadena de texto		*****
//***********************************************************************************
function stripHTML(cadena)
{
	return cadena.replace(/<[^>]+>/g,'');
}	
//***********************************************************************************
//****funcion para eliminar los espacios de una cadena de texto					*****
//***********************************************************************************
function ebp_trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
//***********************************************************************************
//****esta función retorna un array con los valores de la gráfica				*****
//****este código lo tome del nebuxox de proxen									*****
//***********************************************************************************
function obtainChartValues(arg,nidchart)
{
    var script = atob(arg);
	var chartId = script.split("'")[1];
    var temp = "";
    var values = new Array();
    values[0] = chartId;
	
	//ch_extensions; ch_extensions_all; ch_extensions_man; ch_extensions_aut
    if(chartId == "ch_cr" || chartId == "ch_recycle" || chartId == "ch_extensions_all" || chartId == "ch_autopay" || chartId == "ch_cliques" || chartId == "ch_cdd" || chartId == "ch_trar" || chartId == "ch_cliques")
    {
        temp = script.split("data:[")[nidchart];
        temp = temp.substring(0,temp.indexOf(']')).split(',');
    }
    return values.concat(temp);
}
//***********************************************************************************
//****esta Crea el div para los datos y/o opciones								*****
//***********************************************************************************
function EBP_Cuadro_Datos(nTipo)
{
	//para el div de opciones
	if(nTipo == 1)
	{
		//Creamos el Div para las opciones
		var dataOpciones = getCookie("ebp_NeoExport");
		var ebp_SeteoOpciones = dataOpciones.split("-");
		var ebp_formatdate = ebp_SeteoOpciones[0];
		var ebp_opt_formatdate_checked = (ebp_formatdate==1)?"checked":"";
		var ebp_formatDataneobux = ebp_SeteoOpciones[1];
		var ebp_opt_formatDataneobux_checked = (ebp_formatDataneobux==1)?"checked":"";
		var d = document.createElement('div');
		d.setAttribute('id','neoexportebp_options_window');
		d.setAttribute('style','position: fixed; top: 100px; text-align: center; width: 100%; display: none;');
		d.innerHTML = '<div style="width: 500px; height: 180px; margin: 0 auto; background: #FFF; border: 1px solid #333; padding: 10px; display: none;" id="neoexportebp_settings_window"><table><tr><td><img src="http://c.nbx.bz/imagens/texto_32.png" width="26" border="0" /></td><td style="font-size: 14px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: left;" width="300">NeoExportEBP ' + ebp_TextConfig +'</td><td id="neoexportebp_settings_submit" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="85">' + ebp_TextGuarda + '</td><td id="neoexportebp_settings_close" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="85">' + ebp_TextSalir +'</td></tr></table><table cellspacing="5" cellpadding="5" style="margin-top: 5px;"><tr><td>' + ebp_TextMensL1 + '</td><td><input id="neoexportebp_settings_format_1" type="checkbox" name="neoexportebp_settings_format_1" value="1" '+ebp_opt_formatdate_checked+'/></td></tr></table><span style="font-size:10px;color:#666;">' + ebp_TextMensL2 +' <br />' + ebp_TextMensL3 + '</span><table cellspacing="5" cellpadding="5" style="margin-top: 5px;"><tr><td>' + ebp_TextMensL4 + '</td><td><input id="neoexportebp_settings_format_2" type="checkbox" name="neoexportebp_settings_format_2" value="2" '+ebp_opt_formatDataneobux_checked+'/></td></tr></table><span style="font-size:10px;color:#666;">' + ebp_TextMensL5 +'</span></div>';
					
		document.body.appendChild(d); // Lo insertas al final del body
		//agregamos las funciones para cerrar (ocultar) el div y para guardar los datos
		var ebpbguarda = document.getElementById("neoexportebp_settings_submit");
		ebpbguarda.addEventListener('click', EBP_Opciones_Guardar, false);
					
		var ebpbcierra = document.getElementById("neoexportebp_settings_close");
		ebpbcierra.addEventListener('click', EBP_Opciones_Cerrar, false);
		
		var ebpbOpciones = document.getElementById("neoexportebp_settings_format_1");
		ebpbOpciones.addEventListener('click', EBP_Opciones_CheckBox, false);
		
		var ebpbOpciones2 = document.getElementById("neoexportebp_settings_format_2");
		ebpbOpciones2.addEventListener('click', EBP_Opciones_CheckBox_2, false);
		
	}else{
		//Creamos el Div para los datos a exportar
		var d = document.createElement('div');
		d.setAttribute('id','neoexportebp_options_window');
		d.setAttribute('style','position: fixed; top: 100px; text-align: center; width: 100%; display: none;');
		d.innerHTML = '<div style="width: ' + ebp_AnchoED + 'px; height: ' + ebp_AltoED + 'px; margin: 0 auto; background: #FFF; border: 1px solid #333; padding: 10px; display: none;" id="neoexportebp_export_window"><table><tr><td><img src="http://c.nbx.bz/imagens/texto_32.png" width="26" border="0" /></td><td style="font-size: 14px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: left;" width="' + ebp_AnchoED + '">NeoExportEBP ' + ebp_TextDatos + '</td><td id="neoexportebp_export_close" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="170">' + ebp_TextSalir +'</td></tr></table><textarea style="width: ' + (ebp_AnchoED - 5) + 'px; height: ' + (ebp_AltoED - 35) + 'px;" id="neoexportebp_export_field" onMouseOver="this.select();" onMouseUp="this.select();" onMouseDown="this.select();"></textarea></div>';
		// Lo insertas al final del body
		document.body.appendChild(d); 
		//agregamos las funciones para cerrar (ocultar) el div 
		var ebpbcierra = document.getElementById("neoexportebp_export_close");
		ebpbcierra.addEventListener('click', EBP_Datos_Cerrar, false);
	}
}

//***********************************************************************************
//****esta función deselecciona las opciones del cuadro según corresponda		*****
//***********************************************************************************
function EBP_Opciones_CheckBox()
{
	var nbo_opt_Standard_checked = (document.getElementById('neoexportebp_settings_format_1').checked)?1:0
	//si el botón de fechas standard es seleccionado, deseleccionamos el boton de exportar datos en el
	//formato de neobux
	if(nbo_opt_Standard_checked == 1)
	{
		var botOpcion = document.getElementById("neoexportebp_settings_format_2");
		botOpcion.checked = 0;
	}
}
function EBP_Opciones_CheckBox_2()
{
	var nbo_opt_DataNeobux_checked = (document.getElementById('neoexportebp_settings_format_2').checked)?1:0
	//si el botón de exportar datos en formato de neobux es seleccionado, deseleccionamos el boton de 
	//fechas standard
	if(nbo_opt_DataNeobux_checked == 1)
	{
		var botOpcion2 = document.getElementById("neoexportebp_settings_format_1");
		botOpcion2.checked = 0;
	}
}

//***********************************************************************************
//****esta función guarda los datos del cuadro de opciones						*****
//***********************************************************************************
function EBP_Opciones_Guardar()
{
	var nbo_opt_Standard_checked = (document.getElementById('neoexportebp_settings_format_1').checked)?1:0
	var nbo_opt_DataNeobux_checked = (document.getElementById('neoexportebp_settings_format_2').checked)?1:0
	var sDatosCheckBox = nbo_opt_Standard_checked + '-' + nbo_opt_DataNeobux_checked;
	setCookie("ebp_NeoExport",sDatosCheckBox,365);
	
	var ebpdivSetting = document.getElementById('neoexportebp_settings_window'); //se define la variable "el" igual a nuestro div
	ebpdivSetting.style.display = (ebpdivSetting.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
	
	var el = document.getElementById('neoexportebp_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}
//***********************************************************************************
//****esta función oculta el div que contiene el cuadro de opciones				*****
//***********************************************************************************
function EBP_Opciones_Cerrar()
{
	var ebpdivSetting = document.getElementById('neoexportebp_settings_window'); //se define la variable "el" igual a nuestro div
	ebpdivSetting.style.display = (ebpdivSetting.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
	var el = document.getElementById('neoexportebp_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}
//***********************************************************************************
//****esta función oculta el div que contiene los datos a exportar				*****
//***********************************************************************************
function EBP_Datos_Cerrar()
{
	var ebpdivDatos = document.getElementById('neoexportebp_export_window'); //se define la variable "el" igual a nuestro div
	ebpdivDatos.style.display = (ebpdivDatos.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
	var el = document.getElementById('neoexportebp_options_window'); //se define la variable "el" igual a nuestro div
	el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}

//para la página de estadísticas
if(location.href.indexOf("www.neobux.com/c/rs/") != -1)
{
	var Opciones_Nuevo_div = 'height:6px;font-size:6px;';
	var Opciones_mi_div = 'cursor: default; display: block;';
	var nuevodiv = document.createElement("div");
	var midiv = document.createElement("div");
	var Opciones_EBP_Estadisticas = '<table style="cursor: pointer;" id="NeoExportEBP_button"><tr><td><img border="0" width="20" ';
	Opciones_EBP_Estadisticas += 'src="http://c.nbx.bz/imagens/texto_32.png"></td><td style="font-size: 10px; font-weight: bold; ';
	Opciones_EBP_Estadisticas += 'padding-left: 2px;">ExportEBP</td></tr></table>';
		
	midiv.setAttribute("style",Opciones_mi_div);
	midiv.innerHTML = Opciones_EBP_Estadisticas;
	nuevodiv.setAttribute("style",Opciones_Nuevo_div);
	
	var elemento2 = document.getElementById('menu_wa');
	elemento2.parentNode.insertBefore(nuevodiv,elemento2);
	elemento2.parentNode.insertBefore(midiv,elemento2);
	var elemento = document.getElementById("NeoExportEBP_button");
	elemento.addEventListener('click', EBP_Copia_Estadisticas, false);
	var ebp_AnchoED = 400;
	var ebp_AltoED = 300;
	EBP_Cuadro_Datos(2);
		
		
}
else{
	//para la página de referidos directos
		if( location.href.indexOf("www.neobux.com/c/rl") != -1 && location.href.indexOf("ss3=1") != -1)
	{	
		var Opciones_Nuevo_div = 'height:6px;font-size:6px;';
		var Opciones_mi_div = 'cursor: default; display: block;';
		var midiv = document.createElement("div");
		var nuevodiv = document.createElement("div");
		var Opciones_EBP_Estadisticas = '<table style="cursor: pointer;" id="NeoExportEBP_button"><tr><td><img border="0" width="20" ';
		Opciones_EBP_Estadisticas += 'src="http://c.nbx.bz/imagens/texto_32.png"></td><td style="font-size: 10px; font-weight: bold; ';
		Opciones_EBP_Estadisticas += 'padding-left: 2px;">ExportEBP</td></tr></table>';
					
		nuevodiv.setAttribute("style",Opciones_Nuevo_div);
		midiv.setAttribute("style",Opciones_mi_div);
		midiv.innerHTML = Opciones_EBP_Estadisticas;
		var elemento2 = document.getElementById('menu_wa');
		elemento2.parentNode.insertBefore(nuevodiv,elemento2);
		elemento2.parentNode.insertBefore(midiv,elemento2);
				
		var elemento = document.getElementById("NeoExportEBP_button");
		elemento.addEventListener('click', EBP_Copia_RD, false);
		var ebp_AnchoED = 700;
		var ebp_AltoED = 400;
		EBP_Cuadro_Datos(2);
	}
	else{
		//para la página de referidos rentados
		if( location.href.indexOf("www.neobux.com/c/rl") != -1 && location.href.indexOf("ss3=2") != -1)
		{
			var Opciones_Nuevo_div = 'height:6px;font-size:6px;';
			var Opciones_mi_div = 'cursor: default; display: block;';
			var midiv = document.createElement("div");
			var nuevodiv = document.createElement("div");
			var Opciones_EBP_Estadisticas = '<table style="cursor: pointer;" id="NeoExportEBP_button"><tr><td><img border="0" width="20" ';
			Opciones_EBP_Estadisticas += 'src="http://c.nbx.bz/imagens/texto_32.png"></td><td style="font-size: 10px; font-weight: bold; ';
			Opciones_EBP_Estadisticas += 'padding-left: 2px;">ExportEBP</td></tr></table>';
						
			nuevodiv.setAttribute("style",Opciones_Nuevo_div);
			midiv.setAttribute("style",Opciones_mi_div);
			midiv.innerHTML = Opciones_EBP_Estadisticas;
			
			var elemento2 = document.getElementById('menu_wa');
			elemento2.parentNode.insertBefore(nuevodiv,elemento2);
			elemento2.parentNode.insertBefore(midiv,elemento2);
			var elemento = document.getElementById("NeoExportEBP_button");
			elemento.addEventListener('click', EBP_Copia_RR, false); 
			var ebp_AnchoED = 700;
			var ebp_AltoED = 400;
			//EBP_Cuadro_Datos(2);
		}
		else{
			//para la página de Opciones Personales
			if(location.href.indexOf("www.neobux.com/c/d/") != -1)
			{
				var Opciones_Nuevo_div = 'height:6px;font-size:6px;';
				var Opciones_mi_div = 'cursor: default; display: block;';
				var midiv = document.createElement("div");
				var nuevodiv = document.createElement("div");
				var Opciones_EBP_Estadisticas = '<table style="cursor: pointer;" id="NeoExportEBP_button"><tr><td><img border="0" width="20" ';
				Opciones_EBP_Estadisticas += 'src="http://c.nbx.bz/imagens/texto_32.png"></td><td style="font-size: 10px; font-weight: bold; ';
				Opciones_EBP_Estadisticas += 'padding-left: 2px;">Opt NeoExportEBP</td></tr></table>';
						
				nuevodiv.setAttribute("style",Opciones_Nuevo_div);
				midiv.setAttribute("style",Opciones_mi_div);
				midiv.innerHTML = Opciones_EBP_Estadisticas;
					
				var elemento2 = document.getElementById('menu_wa');
				elemento2.parentNode.insertBefore(nuevodiv,elemento2);
				elemento2.parentNode.insertBefore(midiv,elemento2);
				var elemento = document.getElementById("NeoExportEBP_button");
				elemento.addEventListener('click', EBP_Opciones_NeoExportEBP, false);
				var ebp_AnchoED = 300;
				var ebp_AltoED = 300;
				EBP_Cuadro_Datos(1);
			}
			else{
				//para la página resumen
				if(location.href.indexOf("www.neobux.com/c/") != -1 || location.href.indexOf("www.neobux.com/c/?vl") != -1)
				{
					var Opciones_Nuevo_div = 'height:6px;font-size:6px;';
					var Opciones_mi_div = 'cursor: default; display: block;';
					var midiv = document.createElement("div");
					var nuevodiv = document.createElement("div");
					var Opciones_EBP_Estadisticas = '<table style="cursor: pointer;" id="NeoExportEBP_button"><tr><td><img border="0" width="20" ';
					Opciones_EBP_Estadisticas += 'src="http://c.nbx.bz/imagens/texto_32.png"></td><td style="font-size: 10px; font-weight: bold; ';
					Opciones_EBP_Estadisticas += 'padding-left: 2px;">ExportEBP</td></tr></table>';
							
					nuevodiv.setAttribute("style",Opciones_Nuevo_div);
					midiv.setAttribute("style",Opciones_mi_div);
					midiv.innerHTML = Opciones_EBP_Estadisticas;
						
					var elemento2 = document.getElementById('menu_wa');
					elemento2.parentNode.insertBefore(nuevodiv,elemento2);
					elemento2.parentNode.insertBefore(midiv,elemento2);
					var elemento = document.getElementById("NeoExportEBP_button");
					elemento.addEventListener('click', EBP_Copia_Resumen, false);
					var ebp_AnchoED = 400;
					var ebp_AltoED = 330;
					EBP_Cuadro_Datos(2);
				}
			}
		}
	}
}
