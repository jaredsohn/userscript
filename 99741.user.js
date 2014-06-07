// ==UserScript==
// @name           Prizee Jackpot Code Exchanger
// @include        *prizee-jackpot.com/*
// @description    Exchange codes with other people! Shows position of next game and chip code 
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://rolmi.pl/gamesArray.js
// @resource game1 http://www.rolmi.pl/img/game1.jpg
// @resource game2 http://www.rolmi.pl/img/game2.jpg
// @resource game3 http://www.rolmi.pl/img/game3.jpg
// @resource game4 http://www.rolmi.pl/img/game4.jpg
// @resource game5 http://www.rolmi.pl/img/game5.jpg
// @resource game6 http://www.rolmi.pl/img/game6.jpg
// @resource game7 http://www.rolmi.pl/img/game7.jpg
// @resource game8 http://www.rolmi.pl/img/game8.jpg
// @resource game9 http://www.rolmi.pl/img/game9.jpg
// @resource game10 http://www.rolmi.pl/img/game10.jpg
// @resource code10 http://www.rolmi.pl/img/code10.jpg
// @resource code15 http://www.rolmi.pl/img/code15.jpg
// @resource code20 http://www.rolmi.pl/img/code20.jpg
// @author         Blues
// @version       1.37
// ==/UserScript==

login = "";              // Enter your username
pass = "";               // Enter your password
language = "en";         // Supported languages (pl, en, ro, it)
version = 1.37;
 
 
 
//============================================================== 
//
//              New things in 1.30:
//              - Now you can hide received codes
//              - Proper report code feature :)
//
//==============================================================
// Romanian version by Clara
// Italian version by Clara
// If you want to make translation email me at bluestp@ymail.com
//
//==============================================================
 

























































 function hideCode(login, pass, code){
     
     var data = "login=" + login + "&pass=" + pass + "&code=" + code; 
  GM_xmlhttpRequest(
 	{
 		method: "POST",
 		url: "http://www.rolmi.pl/hideCode.php",
 		data: data,
 		headers: {
 			"Content-Type": "application/x-www-form-urlencoded"
 		},
 		onload: function (response)
         {
               var codeToHide = response.responseText.slice(0,8);   
              // alert("Code to Hide: " + codeToHide);    
              if(response.responseText.indexOf('OK') > -1)
                              $('#' + codeToHide).hide();
          
          //alert(response.responseText);
             
 		}
 	});
     
 }


  function reportCode(login, pass, code){
     
    	
    var data = "username=" + login + "&password=" + pass +  "&code=" + code;

	GM_xmlhttpRequest(
	{
		method: "POST",
		url: "http://www.rolmi.pl/reportCode.php",
		data: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function (response)
		{
			var errorCode = response.responseText.slice(0, (response.responseText.length - 1));
            
            if (errorCode.indexOf('DB_alreadyReported') > -1){
                
                $('#reportResponse').html(text[language]['codeAlreadyReported1'] +  errorCode.slice(0,8) +  text[language]['codeAlreadyReported2']);
                
            }
            else{
                $('#reportResponse').html(text[language]['codeReported1']  +  errorCode.slice(0,8)  + text[language]['codeReported2']);
            }
            
            $('#report').show();
            $('#reportResponse').show();
		}
	});

 }


  // IT Per attivare il cono, clicca su: XXX
  // RO Pentru a activa contul, click pe link-ul: XXX



var text = new Array();


text['it'] = new Array();
text['it']['prevGameButton'] = "Il precedente";
text['it']['nextGameButton'] = "Il prossimo";
text['it']['setDiv'] = "Gettoni utilizzati";
text['it']['setGames'] = "OK";
text['it']['chipCode'] = "Codice di gettoni";
text['it']['chipNo'] = "Quantita di gettoni";
text['it']['addCode'] = "Inviare";
text['it']['invalidCode'] = "Codice non valido! Il tuo codice deve contenere 8 caratteri (A-Z / 0-9).";
text['it']['noAcc'] = "Tu non hai un conto? Clicca qui!";
text['it']['regOk'] = "Registrazione ha avuto successo! \nTi prego, modifica il script con i tuoi dettagli.\nEmail per attivazione e stato inviato a:";
text['it']['nextGame'] = "Il prossimo gioco a";
text['it']['previousGame'] = "Il precedente gioco a";
text['it']['nextCode'] = "Il prossimo codice a";
text['it']['previousCode'] = "Il precedente codice a";
text['it']['regTitle'] = "Formulario di registrazione";
text['it']['regUsername'] = "Nome utente";
text['it']['regPass'] = "Password";
text['it']['regRePass'] = "Riscrivi il Password";
text['it']['regEmail'] = "E-Mail";
text['it']['register'] = "Registrati";
text['it']['regUsernameFail'] = "Nome utente deve contenere da 4 a 24 caratteri. <br /> Puoi usare solo lettere e numeri. <br />";
text['it']['regPasswordFail'] = "Password deve contenere almeno 6 caratteri. <br /> Puoi usare solo lettere e numeri<br />";
text['it']['regPasswordFailMatch'] = "Password non corrisponde!<br />";
text['it']['regEmailFail'] = "L\'indirizzo di E-mail non e valido! <br />";
text['it']['wrongLoginInfo'] = "Nome utente/password sbagliato o conto inattivo.";
text['it']['DB_codeAdded'] = "<p> Il codice e stato aggiunto con succeso a base di dati! </p>";
text['it']['DB_codeAlreadyExists'] =  "<p> Codice gia esiste in base di dati</p>";
text['it']['DB_noCodeAvailabe'] = "Adesso non c\'e nessun codice disponibile. <br /> Ti prego di riprovare piu tardi.";
text['it']['newVersionAvailable'] = "C\'e una nuova versione disponibile, vuoi prenderla adesso? \nDopo installare ricordati di rimuovere quella vechhia! ";
text['it']['msgCodesWaiting'] = "<p id='hey'>Hey! Ci sono codice che ti aspettano! <br />"; 
text['it']['buttonReportCode'] = "Riporta codeice non valido";
text['it']['hello'] = "Ciao, ";
text['it']['yourCode1'] = "Il tuo codice: <br />";
text['it']['yourCode2'] = " gettoni";
text['it']['codeAlreadyReported1'] = "Il codice: ";
text['it']['codeAlreadyReported2'] = " e gia stato segnalato.";
text['it']['codeReported1'] = "Il codice: ";
text['it']['codeReported2'] = " e stato segnalato con successo!";
text['it']['showLastTitle'] = "Mostra i ultimi 10 codici che ho: ";
text['it']['showLastAddedCodes'] = "Aggiunto";
text['it']['showLastReceivedCodes'] = "Ricevuto";
text['it']['sec_lvl'] = "Potrai inserire un nuovo codice in circa ";
text['it']['minutes'] = " minuti";
text['it']['hide'] = "Nascondere";
text['it']['reportCode'] = "Segnala il codice";



text['pl'] = new Array();
text['pl']['prevGameButton'] = "Poprzedni";
text['pl']['nextGameButton'] = "Nastepny";
text['pl']['setDiv'] = "Rozegranych gier";
text['pl']['setGames'] = "Ustaw";
text['pl']['chipCode'] = "Kod";
text['pl']['chipNo'] = "Liczba zetonow";
text['pl']['addCode'] = "Wyslij";
text['pl']['invalidCode'] = "Kod nieprawidlowy! Kod musi zawierac 8 znakow (A-Z / 0-9)."
text['pl']['noAcc'] = "Nie masz jeszcze konta? Kliknij tutaj!";
text['pl']['regOk'] = "Rejestracja zakonczona pomyslnie! \nWprowadz teraz do skryptu swoje dane logowania.\n Email aktywacyjny zostal wyslany na adres: ";
text['pl']['nextGame'] = "Nastepna gra";
text['pl']['previousGame'] = "Poprzednia gra";
text['pl']['nextCode'] = "Nastepny kod";
text['pl']['previousCode'] = "Poprzedni kod";
text['pl']['regTitle'] = "Rejestracja";
text['pl']['regUsername'] = "Nazwa uztkownika";
text['pl']['regPass'] = "Haslo";
text['pl']['regRePass'] = "Powtorz haslo";
text['pl']['regEmail'] = "E-Mail";
text['pl']['register'] = "Zarejestruj";
text['pl']['regUsernameFail'] = "Nazwa uztkownika musi zawierac od 4 do 24 znakow. <br /> Mozna uzywac tylko liter i cyfr. <br />";
text['pl']['regPasswordFail'] = "Haslo musi zawierac min. 6 znakow. <br /> Mozna uzywac tylko liter i cyfr.<br />";
text['pl']['regPasswordFailMatch'] = "Hasla nie sa takie same! <br />";
text['pl']['regEmailFail'] = "Podany adres E-Mail jest niepoprawny!";
text['pl']['wrongLoginInfo'] = "Bledna nazwa uzytkownika/haslo lub konto nieaktywne.";
text['pl']['DB_codeAdded'] = "<p> Kod zostal pomyslnie dodany do bazy danych </p>";
text['pl']['DB_codeAlreadyExists'] =  "<p> Ten kod jest juz w bazie danych </p>";
text['pl']['DB_noCodeAvailabe'] = "Nie ma teraz dostepnego zadnego kodu spelniajacego kryteria. <br /> Sprawdz pozniej.";
text['pl']['newVersionAvailable'] = "Dostepna jest nowa wersja skryptu. \nChcesz ja teraz zainstalowac? \nPo instalacji nowej wersji, odinstaluj stara.";
text['pl']['msgCodesWaiting'] = "<p id='hey'>Czekaja na ciebie kody! <br />"; 
text['pl']['buttonReportCode'] = "Zglos zly kod";
text['pl']['hello'] = "Witaj, ";
text['pl']['yourCode1'] = "Twoj kod: <br />";
text['pl']['yourCode2'] = " zetonow";
text['pl']['codeAlreadyReported1'] = "Kod: ";
text['pl']['codeAlreadyReported2'] = " zostal juz zaraportowany.";
text['pl']['codeReported1'] = "Kod: ";
text['pl']['codeReported2'] = " zostal pomyslnie zaraportowany!";
text['pl']['showLastTitle'] = "Pokaz 10 kodow, ktore ostatnio: "
text['pl']['showLastAddedCodes'] = "Dodalem";
text['pl']['showLastReceivedCodes'] = "Otrzymalem";
text['pl']['sec_lvl'] = "Nast?pny kod b?dziesz m?g? doda? za: ";
text['pl']['minutes'] = " minut";
text['pl']['hide'] = "Ukryj";
text['pl']['reportCode'] = "Zglos bledny kod";


text['en'] = new Array();
text['en']['prevGameButton'] = "Previous";
text['en']['nextGameButton'] = "Next";
text['en']['setDiv'] = "Chips used";
text['en']['setGames'] = "Set";
text['en']['chipCode'] = "Chip Code";
text['en']['chipNo'] = "Amount of chips";
text['en']['addCode'] = "Send";
text['en']['invalidCode'] = "Invalid Code! Your code should contain 8 characters (A-Z / 0-9)."
text['en']['noAcc'] = "You don\'t have an account yet? Click here!";
text['en']['regOk'] = "Registration successful! \nPlease edit script with your details.\nActivation email has been sent to: ";
text['en']['nextGame'] = "Next game at";
text['en']['previousGame'] = "Previous game at";
text['en']['nextCode'] = "Next code at";
text['en']['previousCode'] = "Previous code at";
text['en']['regTitle'] = "Registration Form";
text['en']['regUsername'] = "Username";
text['en']['regPass'] = "Password";
text['en']['regRePass'] = "Re-Type Password";
text['en']['regEmail'] = "E-Mail";
text['en']['register'] = "Register";
text['en']['regUsernameFail'] = "Username must contain from 4 to 24 characters. <br /> You can only use letters and numbers. <br />";
text['en']['regPasswordFail'] = "Password must have at least 6 characters. <br /> You can only use letters and numbers<br />";
text['en']['regPasswordFailMatch'] = "Passwords do not match!<br />";
text['en']['regEmailFail'] = "Provided E-mail address is not valid! <br />";
text['en']['wrongLoginInfo'] = "Wrong username/password or account inactive.";
text['en']['DB_codeAdded'] = "<p> Code has been successfully added to the DB! </p>";
text['en']['DB_codeAlreadyExists'] =  "<p> Code already in the database</p>";
text['en']['DB_noCodeAvailabe'] = "There is no code available at this time. <br /> Please check back later.";
text['en']['newVersionAvailable'] = "There's new version available, do you want to get it now? \nAfter Installing it remember to remove the old one!";
text['en']['msgCodesWaiting'] = "<p id='hey'>Hey! There are codes waiting for you! <br />"; 
text['en']['buttonReportCode'] = "Report invalid code";
text['en']['hello'] = "Hello, ";
text['en']['yourCode1'] = "Your code: <br />";
text['en']['yourCode2'] = " chips";
text['en']['codeAlreadyReported1'] = "Code: ";
text['en']['codeAlreadyReported2'] = " has been already reported.";
text['en']['codeReported1'] = "Code: ";
text['en']['codeReported2'] = " has been successfully reported!";
text['en']['showLastTitle'] = "Show last 10 codes I recently: "
text['en']['showLastAddedCodes'] = "Added";
text['en']['showLastReceivedCodes'] = "Received";
text['en']['sec_lvl'] = "You will be able to add next code in: ";
text['en']['minutes'] = " minutes";
text['en']['hide'] = "Hide";
text['en']['reportCode'] = "Report invalid code";


text['ro'] = new Array();
text['ro']['prevGameButton'] = "Anterior";
text['ro']['nextGameButton'] = "Urmatorul";
text['ro']['setDiv'] = "Jetoane folosite";
text['ro']['setGames'] = "Seteaza";
text['ro']['chipCode'] = "Cod jetoane";
text['ro']['chipNo'] = "Nr. jetoane";
text['ro']['addCode'] = "Trimite";
text['ro']['invalidCode'] = "Cod Invalid! Codul trebuie sa contina 8 caractere (A-Z / 0-9)."
text['ro']['noAcc'] = "Nu ai un cont inca? Click aici!";
text['ro']['regOk'] = "Inregistrare reusita \nTe rog editeaza scriptul cu detaliile tale.\n Email-ul pentru activare a fost trimis la: ";
text['ro']['nextGame'] = "Urmatorul joc la";
text['ro']['previousGame'] = "Jocul anterior la";
text['ro']['nextCode'] = "Urmatorul cod la";
text['ro']['previousCode'] = "Codul anterior la";
text['ro']['regTitle'] = "Formular de Inregistrare";
text['ro']['regUsername'] = "Username";
text['ro']['regPass'] = "Parola";
text['ro']['regRePass'] = "Re-Scrie Parola";
text['ro']['regEmail'] = "E-Mail";
text['ro']['register'] = "Inregistreaza-te";
text['ro']['regUsernameFail'] = "Username trebuie sa contina intre 4 si 24 caractere. <br /> Poti folosi numai litere si numere. <br />";
text['ro']['regPasswordFail'] = "Parola trebuie sa aiba cel putin 6 caractere. <br /> Poti folosi numai numere si litere<br />";
text['ro']['regPasswordFailMatch'] = "Parola nu este buna!<br />";
text['ro']['regEmailFail'] = "Adresa de E-mail nu este valida! <br />";
text['ro']['wrongLoginInfo'] = "Username/parola gresite sau cont inactiv.";
text['ro']['DB_codeAdded'] = "<p> Codul a fost adaugat cu succes in baza de date! </p>";
text['ro']['DB_codeAlreadyExists'] =  "<p> Codul deja exista in baza de date</p>";
text['ro']['DB_noCodeAvailabe'] = "Nu exista niciun cod valabil pentru moment. <br /> Te rog incearca mai tarziu.";
text['ro']['newVersionAvailable'] = "O noua versiune este valabila, vrei sa o descarci acum?\nDupa ce instalezi, dezinstaleaza-l pe cel vechi!";
text['ro']['msgCodesWaiting'] = "<p id='hey'>Hey! Sunt coduri care te asteapta! <br />"; 
text['ro']['buttonReportCode'] = "Raporteaza cod invalid";
text['ro']['hello'] = "Buna, ";
text['ro']['yourCode1'] = "Codul tau: <br />";
text['ro']['yourCode2'] = " jetoane";
text['ro']['codeAlreadyReported1'] = "Cod: ";
text['ro']['codeAlreadyReported2'] = " a fost deja raportat.";
text['ro']['codeReported1'] = "Cod: ";
text['ro']['codeReported2'] = " a fost deja raportat!";
text['ro']['showLastTitle'] = "Arata ultimile coduri pe care le-am: ";
text['ro']['showLastAddedCodes'] = "adaugat";
text['ro']['showLastReceivedCodes'] = "primit";
text['ro']['sec_lvl'] =  " Vei putea introduce un nou cod in aprox:";
text['ro']['minutes'] = " minute";
text['ro']['hide'] = "Ascunde";
text['ro']['reportCode'] = "Raporteaza codul";




 
 //======
 
 text['pl']['useCode'] = "Uzyj tego kodu";
 text['en']['useCode'] = "Use this code";
 text['ro']['useCode'] = "Utilizati acest cod";
 text['it']['useCode'] = "Usa questo codice";
 
 //====== 
 
 
 
 
















    






//============================================================================================================

GM_addStyle("#contentWrapper{background: none !important;}");


if (window.innerWidth > 1850)
    {var windowSize = "22";
    var addonSize = "20";}
else if ((window.innerWidth > 1600) && (window.innerWidth < 1849))
    {var windowSize = "22";
    var addonSize = "18";}
else if ((window.innerWidth > 1281) && (window.innerWidth < 1498))
   { var windowSize = "1";
    var addonSize = "20";}
else if ((window.innerWidth <= 1280) && (window.innerWidth >1024))
    {var windowSize = "-1";
    var addonSize = "20";}
    else if ((window.innerWidth <= 1240) && (window.innerWidth > 800))
    {var windowSize = "-16";
    var addonSize = "16";}
    //alert(windowSize);
   // alert(window.innerWidth);


$('#winnersList, #footerBox').hide();
 

$('body').append('<div id=addon></div>');
GM_addStyle(" .codeBox{margin: 60px;} .useCode:hover{background-color: #ffb522;} .useCode{ width: 110px; height; 26px; text-weight: bold; background-color: rgb(220,88,16);border: 1px solid white; margin: 0 5px;}                                            #lastCodes{padding: 7px;} .reportCode:hover{background-color: #ffb522;} .reportCode{ width: 110px; height; 26px; text-weight: bold; background-color: rgb(220,88,16);border: 1px solid white;}                          .hideMe:hover{background-color: #ffb522;} .hideMe{ width: 95px; height; 26px; text-weight: bold; background-color: rgb(220,88,16);border: 1px solid white;} #showLastTitle{text-align: center; text-weight: bold;} #reportResponse{padding: 10px 0;} .button:hover{background-color: #ffb522;}#addedChipsSpan{color: green;} #usedChipsSpan{color: red;} p#hey{color: red; text-weight: bold;}   #addon{font-family: MS Sans Serif, Geneva, Sans-serif;font-size: 11.5pt;" + " position: absolute;z-index:20;top: 0px;left: 0px;width:" + addonSize +  "%;border: 2px black dashed;" + "  height: 800px; background-color: rgb(222,212,199);padding: 13px;margin: 0px;}" + "  .vipgold{background-color: rgb(169,143,30);} .button{background-color: rgb(220,88,16);border: 1px solid white; width: 92px; height: 30px; font-weight: bold;}" + " #globalWrapper{position: absolute !important; right : " + windowSize + "% !important; top: 0px !important;} #chipResponse, .button{margin-top: 5px;}" + ".txtField{height: 20px; width: 80px; text-align: center;} #nextGame, #set, #set2{text-align: center;} " + ".report {background-color: rgb(220,88,16);border: 1px solid white; width: 150px; height: 30px; font-weight: bold;} " + "#registrationForm {z-index: 999; border: 2px black dashed; position: fixed; right: 0px; top: 30%; width: 15%; height: 33%; font-family: MS Sans Serif, Geneva, Sans-serif;font-size: 11.5pt; font-weight: bold;" + "padding: 10px;  background-color: rgb(222,212,199);} #noAcc{color: blue; font-weight: bold;} #noAcc:hover{text-decoration: underline;}" + ".valid{border: 2px solid #15f833;} .error{background-color: #f9ed77;border: 2px solid #ff091c} #regResponse{padding: 12px;} " + "#regTitle{text-align: center; color: blue; text-weight: bold;} table{padding: 7px;} .longB{width: 150px; !important;} "

);
$('#pzNetwork').remove();
$('div').removeClass('shadow');
$('#addon').append('<div id=\"hello\"></div>');
$('#addon').append('<div id=\"set2\"><input type="button" class="button" value="' + text[language]["prevGameButton"] + '" id="prevGameButton"/><input type="button" class="button" value="' + text[language]["nextGameButton"] + '" id="nextGameButton"/><br /><br /></div>');
$('#addon').append('<div id=\"nextGame\"></div>');
$('#addon').append('<div id=\"set\">' + text[language]["setDiv"] + ': <input type="text" class="txtField" id="chips"/> <input type="button" class="button" value=' + text[language]["setGames"] + ' id="setChips" /><br /></div><hr />');


$('body').append('<div id="registrationForm"></div>');

$('#registrationForm').append('<p id="regTitle">' + text[language]["regTitle"] + ': </p><table><tr><td><label for="login">' + text[language]["regUsername"] + ': </label></td><td><input type="text" name="userName" id="login"/></td></tr>' + '<tr><td><label for="pass">' + text[language]["regPass"] + '</label></td><td><input type="password" name="password" id="pass"/></td></tr>' + '<tr><td><label for="repass">' + text[language]["regRePass"] + '</label></td><td><input type="password" name="repassword" id="repass"/></td></tr>' + '<tr><td><label for="email">' + text[language]["regEmail"] + '</label></td><td><input type="text" name="email" id="email"/></td></tr> ' + '<tr><td></td><td>  <input type="button" class="button" value=' + text[language]["register"] + ' id="regMe"/></td>   </tr>  </table></fieldset></form>' + '<div id="regResponse"></div>');

   if (login.length > 4)
{ 
    $('#registrationForm, #reportBadCode').hide();
    $('#addon').append(text[language]["chipCode"] + ': <input type="text" id="chipCode" class="txtField" size="14"/><br />');
$('#addon').append(text[language]["chipNo"] + ': <select size="1" id="chipValue"><option value="10">10</option><option value="15">15</option><option value="20">20</option>' + '<option value="13" class="vipgold">13</option><option value="19" class="vipgold">19</option><option value="26" class="vipgold">26</option></select><br />');

$('#addon').append('<input type="button" class="button" value="' + text[language]["addCode"]+ '" id="sendCC" /><br />');
//$('#addon').append('<input type="button" class="button" value=' + text[language]["checkQueue"]+ '" id="checkQueue" /><br />');
$('#addon').append('<div id="chipResponse"></div><hr/>');
$('#addon').append('<input type="button" class="button longB" value= "' + text[language]["buttonReportCode"]+ '" id="reportBadCode" />');
$('#addon').append('<div id="reportResponse"></div>');
$('#addon').append('<p id="showLastTitle">' + text[language]["showLastTitle"] + '</p>');  
$('#addon').append('<input type="button" class="button longB" value= "' + text[language]["showLastAddedCodes"]+ '" id="showLastAddedCodes" />');
$('#addon').append('<input type="button" class="button longB" value= "' + text[language]["showLastReceivedCodes"]+ '" id="showLastReceivedCodes" />');
  
$('#addon').append('<div id="lastCodes"></div>');  
} 


$('#registrationForm, #reportBadCode').hide();

    if(login.length <1 )
    $('#addon').append('<div id="noAcc">' + text[language]["noAcc"] +' </div>');
    
$('#noAcc').click(function ()
{

	$('#registrationForm').show(1100);

});


$('#showLastAddedCodes').click(function ()
{
    var data = "login=" + login + "&password=" + pass;
    GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.rolmi.pl/lastAddedCodes.php",
  data: data,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(response)
   {
    
    
    $('#lastCodes').html(response.responseText);
    
    
    
    
    
    
    
    }
  
});
});

$('#showLastReceivedCodes').click(function ()
{
    var data = "login=" + login + "&password=" + pass;
    GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.rolmi.pl/lastReceivedCodes.php",
  data: data,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(response)
   {
    
    
    $('#lastCodes').html(response.responseText);
    $('.hideMe').html(text[language]['hide']);
    $('.reportCode').html(text[language]['reportCode']);
    //hideCode(login, pass, "9R5ZL7CW");
    $('.useCode').html(text[language]['useCode']);
    
    
     $('.hideMe').click(function(){
     //alert($(this).parent().attr('id'));
     hideCode(login, pass, $(this).parent().attr('id'));
     
     });
    
    $('.reportCode').click(function(){
     //alert($(this).parent().attr('id'));
     reportCode(login, pass, $(this).parent().attr('id'));
     
     });
       
$('.useCode').click(function(){
  
  
  var userCode = $(this).parent().attr('id');  
    $.post("pjo/pjo/", { code:userCode},
 function(data) {
     $('#reportResponse').show();
     $('#report').show();
    if(data.indexOf('This Chip Pack has already been used.') > -1)
         $('#reportResponse').html('This Chip Pack has already been used.');
    else if(data.indexOf('You just won') > -1)
        {
            var startSlice = data.indexOf('<p>You opened');
               var endSlice = data.indexOf('</div>') 
        var openedMsg = data.slice(startSlice,( endSlice - 1));
          $('#reportResponse').html(openedMsg);
         }
    else 
          $('#reportResponse').html("Invalid Code");
       
    }
        );
    
});

    
    
    }
  
});
});
    
    //This Chip Pack has already been used.
/*
   <div class='' id='modal_1576790818'><div class='modalCustomContent smallMargin'><div class='formatter'>	
 		<div class="codeWrapper success">
 			<div class="codeContentWrapper">
 				
 									<h3>Congratulations!</h3>
 					<p>You opened the chest using the secret code!<br/>You just won 19 additional Chips!</p>
 								
 			</div>
 		</div>
 	<p class='marginBottom alignCenter marginTop'><a  class='noline nyroModalClose '  href='' ><span class="bouton"><span class="left"></span><span class="bt_tile">Close</span><span class="right"></span></span></a></p></div></div></div>
   
 */





$('#regMe').click(function ()
{

	if (checkRegForm()) 
    {
        
        var regUsername = $('#login').val();
       var regPassword = $('#pass').val();
       var regMail = $('#email').val();
	   var data = "username=" + regUsername + "&password=" + regPassword + "&email=" + regMail;
        
        GM_xmlhttpRequest({
	   method: "POST",
		url: "http://www.rolmi.pl/registerPJ.php",
		data: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function (response)
		{
			
           
        if(response.responseText.indexOf('DB_regOK') > -1)
        {
            
            var eAddr = response.responseText.slice(0, (response.responseText.indexOf('DB_regOK') - 1) );
            alert(text[language]["regOk"] + eAddr); 
        $('#login, #pass, #repass, #email').val('');
        $('#registrationForm').hide(1500);
        }
		else
             $('#regResponse').html(response.responseText);
        
        
        
        
        }
        
        
        
        
        
        
        
	});
    }




});


if (localStorage.getItem('chipsUsed') != null)
{

	var chipsUsedInit = (parseInt(localStorage.getItem('chipsUsed')) - 1);


	for (var i = chipsUsedInit; i <= 4999; i++)
	{
		if (games[i] != 0)
		{

			if (typeof(games[i]) != 'number')
			{
				$('#nextGame').html(text[language]["nextCode"] + ' ' + i + '( ' + games[i] + '):<br /> <img src=' + GM_getResourceURL("code" + games[i].slice(0, 2)) + ' height=40px width=70px/>');
			}
			else
			{
				$('#nextGame').html(text[language]["nextGame"] +  ':  ' + i + '<br /> <img src=' + GM_getResourceURL("game"  + games[i]) + ' height=40px width=70px/>');
			}
			localStorage.setItem('chipsUsed', (i + 1));
			break;
		}
	}



}



$('#setChips').click(function ()
{
	var chips = $('#chips').val();
	localStorage.clear();
	localStorage.setItem('chipsUsed', chips);
	
});

$('#nextGameButton').click(function ()
{

	var chipsUsed = parseInt(localStorage.getItem('chipsUsed'));


	if (localStorage.getItem('chipsUsedButton') == 'prev')
	{
		chipsUsed += 2;
	}

	for (var i = chipsUsed; i <= 4999; i++)
	{
		if (games[i] != 0)
		{

			if (typeof(games[i]) != 'number')
			{
				$('#nextGame').html(text[language]["nextCode"] + ' ' + i + '(' + games[i] + '):<br />  <img src=' + GM_getResourceURL("code" + games[i].slice(0, 2)) + ' height=40px width=70px/>');
			}
			else
			{
				$('#nextGame').html(text[language]["nextGame"] +  ':  ' + i + '<br /> <img src=' + GM_getResourceURL("game"  + games[i]) + ' height=40px width=70px/>');
			}
			localStorage.setItem('chipsUsed', (i + 1));
			localStorage.setItem('chipsUsedButton', 'next');
			break;
		}
	}
});

$('#prevGameButton').click(function ()
{

	var chipsUsed = parseInt(localStorage.getItem('chipsUsed'));



	if (localStorage.getItem('chipsUsedButton') == 'next')
	{
		chipsUsed -= 2;
	}

	for (var i = chipsUsed; i >= 2; i--)
	{
		if (games[i] != 0)
		{

			if (typeof(games[i]) != 'number')
			{
				$('#nextGame').html(text[language]["previousCode"] + ' ' + i + '(' + games[i] + '):<br />  <img src=' + GM_getResourceURL("code" + games[i].slice(0, 2)) + ' height=40px width=70px/>');
			}
			else
			{
				$('#nextGame').html(text[language]["previousGame"] +  ':  ' + i + '<br /> <img src=' + GM_getResourceURL("game"  + games[i]) + ' height=40px width=70px/>');
			}

			localStorage.setItem('chipsUsed', (i - 1));
			localStorage.setItem('chipsUsedButton', 'prev');
			break;
		}
	}
});





$('#sendCC').click(function ()
{

	var code = $('#chipCode').val();
	var codeRegxp = /^[a-zA-Z0-9]{8}$/;
	if (code.length != 8 || !codeRegxp.test(code)) $('#chipResponse').html(text[language]["invalidCode"]);
	else
	{
		var chips = $('#chipValue').val();
		var data = "login=" + login + "&pass=" + pass + "&code=" + code + "&chips=" + chips;
		$('#chipCode').val("");
		GM_xmlhttpRequest(
		{
			method: "POST",
			url: "http://www.rolmi.pl/codeManagementPrivate.php",
			data: data,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function (response)
			{
				var errorCode = response.responseText.slice(0, (response.responseText.length - 1));
                var msgCode = response.responseText.slice(0, (response.responseText.length - 1));
                
                 
                
                	if(response.responseText.indexOf('sec_lvl') > -1){
		      	   
                   
                   var time = response.responseText.slice(0, (response.responseText.indexOf('sec_lvl') - 1))
                   $('#chipResponse').html(text[language]['sec_lvl'] + time +  text[language]['minutes']);
                 
		      	}
				

				if (errorCode.indexOf('DB_noCodeAvailab') > -1 ) 
				{
					
					$('#report').hide();
					$('#reportResponse').hide();
                    errorCode = text[language]['DB_codeAdded'] + "<br />" + text[language]['DB_noCodeAvailabe'];
                    $('#chipResponse').html(errorCode);
				}
                else if (errorCode.indexOf('DB_codeAlreadyExist') > -1 ) 
                    {
                        
                    errorCode = text[language]['DB_codeAlreadyExists'];
                    
					$('#report').hide();
					$('#reportResponse').hide();
                    $('#reportBadCode').hide();
                   $('#chipResponse').html(errorCode);
                   
                    }
                
                
                if(errorCode.indexOf(' => ') > -1){
                    
                   msgCode = text[language]['DB_codeAdded'] + "<br />" +  text[language]['yourCode1'] + errorCode.slice(0,66) + text[language]['yourCode2'];
                    $('#chipResponse').html(msgCode + "" + errorCode.slice(67));
                }
                     	
		      
              
            
            
            
            }
                
            
                
                
		});






	}

});





function checkQueue(login, pass) {
	var data = "login=" + login + "&pass=" + pass;
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.rolmi.pl/checkQueue.php",
		data: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function (response) {
			if (response.responseText.indexOf('->') > -1) {
				$('#chipResponse').html("<b>" + text[language]['msgCodesWaiting'] + response.responseText + "</p></b>");
                
                
                
				var data = "login=" + login + "&pass=" + pass;
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://www.rolmi.pl/getUserInfo.php",
					data: data,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function (response3) {
						$('#hello').html(text[language]['hello'] + response3.responseText);
					}
				});
			} 
            
            
            else if (response.responseText.indexOf('loginFailed') > -1)
                $('#hello').html(text[language]['wrongLoginInfo'] + "<hr />");
            
            else{
                
                
                	var data = "login=" + login + "&pass=" + pass;
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://www.rolmi.pl/getUserInfo.php",
					data: data,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function (response3) {
						$('#hello').html(text[language]['hello'] + response3.responseText);
					}
				});
                
                
                
                
                
                
                
                
            }
            
            
            
   
		}
	});
}



function checkVersion(version){
    
    var data = "version=" + version; 
 GM_xmlhttpRequest(
	{
		method: "POST",
		url: "http://www.rolmi.pl/checkVersion.php",
		data: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function (response)
        {
            
            var msgCode = response.responseText.slice(0, (response.responseText.length - 1));
            
            if (msgCode.indexOf('DB_newVersionAvailable') > -1){
                
                var getNewVersion = confirm(text[language]["newVersionAvailable"]);
                if (getNewVersion) 
                    window.location = "http://www.rolmi.pl/pj-codesExchanger.latest.user.js";
                
            }
            //$('#addon').append(response.responseText);
            
		}
	});
    
}






if (login.length > 4)
{
checkQueue(login, pass);

}

checkVersion(version);












// validate registration form

function checkRegForm()
{
	var greenLight = true;
	var errorMsg = '<hr />';
	var fieldLen;
	var errors = 0;
	var usernamePat = /^[a-zA-Z0-9]{4,24}$/;
	var username = $('#login').val();
	var passwordPat = /^[a-zA-Z0-9]{6,32}$/;
	var password = $('#pass').val();
	var emailPat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	var email = $('#email').val();
    

	if (!usernamePat.test(username))
	{
		greenLight = false;
		errorMsg += text[language]["regUsernameFail"];
		$('#login').addClass("error").removeClass("valid");
	}
	else
	{
		$('#login').removeClass("error").addClass("valid");
	}





	if (passwordPat.test(password))
	{




		if ($('#pass').val() !== $('#repass').val())
		{
			errorMsg += text[language]["regPasswordFailMatch"];
			$('#pass, #repass').addClass("error").removeClass("valid");
			errors++;
			greenLight = false;
		}

		else
		{
			$('#pass, #repass').removeClass("error").addClass("valid");
		}

	}

	else
	{
		greenLight = false;
		errorMsg += text[language]["regPasswordFail"];
		$('#pass, #repass').addClass("error").removeClass("valid");
	}

	if (!emailPat.test(email))
	{
		greenLight = false;
		errorMsg += text[language]["regEmailFail"];
		$('#email').addClass("error").removeClass("valid");
	}

	else
	{
		$('#email').removeClass("error").addClass("valid");
	}

	if (greenLight == true)
	{
		//alert("OK");
		//$('#regResponse').html("Reg OK");
		return true;

	}
	else
	{

		$('#regResponse').html(errorMsg).show();
		return false;

	}

}



$('body').prepend('<div id="banner-jbp"></div>');
$('#banner-jbp').append('<a href="http://adv.justbeenpaid.com/?r=HEzqronZGR&s=splash1&c=pj"><img src="http://www.justbeenpaid.com/images/banners/jbp_1_728x90.gif" alt="banner"></a>');
GM_addStyle(' #banner-jbp{ position:absolute; bottom: 0; left: 25%; margin: 0; padding:0; z-index: 99999999; } ');


