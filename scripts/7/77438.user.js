// ==UserScript==
// @name OGame AutoLogin MultiLang
// @description AutoLogin script for OGame 
// @version 1.401
// @author      Glibnes <glibnes@gmail.com> [http://battlespace.pl]
// @include     http://*ogame.*
// @exclude     http://board.ogame.*

// ==/UserScript==

// Script Update Checker by Jarett (http://userscripts.org/scripts/show/20145) 
var SUC_script_num = 77438; // Change this to the number given to the script by userscripts.org (check the address bar)
var Version        = 1.401;   // Current Script Version (in var is easier to manipulate)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 3600000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseFloat(/@version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=Version;if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

// Translations
var Translation = new Array();
//English Translation
Translation['eng'] = new Array();
Translation['eng']['data_deleted']          = 'Your login data has been deleted!';
Translation['eng']['lang_deleted']          = 'Saved language has been deleted!';
Translation['eng']['menu_reset']            = 'Reset your login data';
Translation['eng']['menu_reset_lang']       = 'Reset your language';
Translation['eng']['menu_other_server']     = 'Login to the other server without loosing your current login data';
Translation['eng']['select_lang']           = 'Select language (type eng for English language)';
Translation['eng']['bad_lang']              = 'Bad language selected! Refresh page and select it again!';
Translation['eng']['selected']              = 'Selected English language!\nNow log in to the game, to save your login data!';
//Polish Translation - Polska Translacja
Translation['pl'] = new Array();
Translation['pl']['data_deleted']           = 'Twoje dane logowania zostały usunięte!';
Translation['pl']['lang_deleted']           = 'Usunięto zapisany język!';
Translation['pl']['menu_reset']             = 'Resetuj dane logowania';
Translation['pl']['menu_reset_lang']        = 'Resetuj język';
Translation['pl']['menu_other_server']      = 'Zaloguj na inny serwer bez usuwania danych';
Translation['pl']['select_lang']            = 'Wybierz język (wpisz pl dla języka Polskiego)';
Translation['pl']['bad_lang']               = 'Wybrano zły język! Odśwież stronę i wybierz ponownie!';
Translation['pl']['selected']               = 'Wybrano język Polski!\nTeraz zaloguj się, aby zapisać dane logowania!';
//German Translation - Deutsch-Übersetzung (by Google Translate & kekskruemel)
Translation['de'] = new Array();
Translation['de']['data_deleted']           = 'Deine Logindaten wurden gelöscht!';
Translation['de']['lang_deleted']           = 'Gespeicherte Sprache wurde gelöscht!';
Translation['de']['menu_reset']             = 'Zurücksetzen der Logindaten';
Translation['de']['menu_reset_lang']        = 'Zurücksetzen der Sprache';
Translation['de']['menu_other_server']      = 'Login auf einem anderen Server ohne dabei Ihre aktuellen Login-Daten zu verlieren';
Translation['de']['select_lang']            = 'Wählen Sie die Sprache (tippe de für deutsche Sprache)';
Translation['de']['bad_lang']               = 'Ungültige Sprachauswahl! Bitte Seite neu laden und erneut Sprache auswählen!';
Translation['de']['selected']               = 'Deutsche Sprache ausgewählt!\nJetzt einloggen, um Ihre Login-Daten zu speichern!';
//Spanish Translation – Traducción al Español (by leonardo57)
Translation['es'] = new Array();
Translation['es']['data_deleted']           = 'Sus datos de acceso han sido eliminados!';
Translation['es']['lang_deleted']           = 'El idioma guardado ha sido eliminado!';
Translation['es']['menu_reset']             = 'Resetear los datos de acceso';
Translation['es']['menu_reset_lang']        = 'Resetear su idioma';
Translation['es']['menu_other_server']      = 'Entrar a otro servidor sin perder sus datos de acceso actuales';
Translation['es']['select_lang']            = 'Seleccione su idioma (escriba es para idioma Español)';
Translation['es']['bad_lang']               = 'Ha seleccionado un lenguaje inadecuado! Actualice la página y selecciónelo de nuevo!';
Translation['es']['selected']               = 'Has seleccionado el idioma Español!\nAhora entra al juego, para guardar sus datos de acceso!';
//Hungarian Translation - Magyar fordítás (by vrnagy)
Translation['hu'] = new Array();
Translation['hu']['data_deleted']           = 'Bejelentkezési adatok törölve!';
Translation['hu']['lang_deleted']           = 'Nyelvi beállítások törölve!';
Translation['hu']['menu_reset']             = 'Bejelentkezési adatok törlése';
Translation['hu']['menu_reset_lang']        = 'Nyelvi beállítások törlése';
Translation['hu']['menu_other_server']      = 'Bejelentkezés másik szerverre (A mentett adatok megmaradnak)';
Translation['hu']['select_lang']            = 'Válassz nyelvet (A Magyar nyelvért írd be a következőt: hu)';
Translation['hu']['bad_lang']               = 'Hibás nyelv! Frissítsd az oldalt, és próbáld újra!';
Translation['hu']['selected']               = 'Magyar nyelv kiválasztva!\nAz adataid mentéséhez jelentkezz be a játékba!';
//French Translation (by Vincent Deff)
Translation['fr'] = new Array();
Translation['fr']['data_deleted'] = 'Vos infos de login ont été effacées!!';
Translation['fr']['lang_deleted'] = 'La langue choisie a été effacée!';
Translation['fr']['menu_reset'] = 'Réinit des infos de login';
Translation['fr']['menu_reset_lang'] = 'Réinit de la langue';
Translation['fr']['menu_other_server'] = 'Login sur un autre serveur sans perdre les infos sauvegardées';
Translation['fr']['select_lang'] = 'Choisissez votre langue (taper fr pour le français)';
Translation['fr']['bad_lang'] = 'Mauvaise langue choisie! Rechargez la page et recommencez';
Translation['fr']['selected'] = 'Langue française choisie!\nConnectez vous pour sauver vos infos de login!';
//PTBR Translation - Tradução em Portugues BR (by ZeeQ)
Translation['ptbr'] = new Array();
Translation['ptbr']['data_deleted'] = 'Seus dados de acesso foram removidos!';
Translation['ptbr']['lang_deleted'] = 'A lingua escolhida foi eliminada!';
Translation['ptbr']['menu_reset'] = 'Redefinir login';
Translation['ptbr']['menu_reset_lang'] = 'Redefinir seu idioma';
Translation['ptbr']['menu_other_server'] = 'Entrar noutro servidor sem perder os dados de acesso atuais';
Translation['ptbr']['select_lang'] = 'Selecione seu idioma (Escreva ptbr para Portugues Brasileiro)';
Translation['ptbr']['bad_lang'] = 'Você selecionou um idioma errado! Atualize a página e selecione novamente!';
Translation['ptbr']['selected'] = 'Você selecionou Portugues Brasileiro!\nAgora entra no jogo para salvar os dados!';
// End of Translations
var TranslationList = '{eng}{pl}{de}{es}{hu}{fr}{ptbr}';

function $(id){
    return document.getElementById(id);
}

function LoginMe(){
    $('loginForm').action = Uni;
    $('usernameLogin').value  = User;
    $('passwordLogin').value   = Pass;
    $('loginForm').submit();    
}

function clearData(){
    GM_deleteValue('OGameUni');
    GM_deleteValue('OGameUser');
    GM_deleteValue('OGamePass');
    alert(Translation[Language]['data_deleted']);
}

function clearLang(){
    GM_deleteValue('OGameLang');
    alert(Translation[Language]['lang_deleted']);
    Language = 'eng';
    location.reload(true);

}

function getData(){      
    Uni  = $('loginForm').action;
    User = $('usernameLogin').value;
    Pass = $('passwordLogin').value;
    
    GM_setValue('OGameUni', Uni);
    GM_setValue('OGameUser', User);
    GM_setValue('OGamePass', Pass);
}

function observeButton(){
    $('loginSubmit').addEventListener('click', getData, false);
}

function goToOtherServer(){
    GM_setValue('OGameOtherServer', 1);
    var loc = window.location.href.replace(/page=\w+/, 'page=logout');
    window.location.href = loc;
}

var Uni         = GM_getValue('OGameUni' , '');
var User        = GM_getValue('OGameUser', '');
var Pass        = GM_getValue('OGamePass', '');
var OtherServer = GM_getValue('OGameOtherServer', '');
var Language    = GM_getValue('OGameLang', '');

if(Language == ''){
    var SelectLang = '';
    for(x in Translation){
        SelectLang += Translation[x]['select_lang']+'\n';
    }
    var Lang = prompt(SelectLang, 'eng', 'Select your Language');
    if(TranslationList.indexOf('{'+Lang+'}') >= 0){
        GM_setValue('OGameLang', Lang);
        alert(Translation[Lang]['selected']);
        Language = Lang;
        GM_registerMenuCommand(Translation[Language]['menu_reset_lang'], clearLang);
    } else {
        var BadLang = '';
        for(x in Translation){
            BadLang += Translation[x]['bad_lang']+'\n';
        }
        alert(BadLang);
        Language = 'eng';
    }
} else {
    GM_registerMenuCommand(Translation[Language]['menu_reset_lang'], clearLang);
}

if(OtherServer == 0){
    if(location.href.indexOf('/game/') == -1){
        if(Uni == '' || User == '' || Pass == ''){
            setInterval(observeButton, 250);    
        } else {
            if(location.href.indexOf('main/loginError') >= 0){
                clearData();
            } else {
                setTimeout(LoginMe, 1000);
            }
        }
    } else {
        if(!(Uni == '' || User == '' || Pass == '')){
            GM_registerMenuCommand(Translation[Language]['menu_reset'], clearData);
            GM_registerMenuCommand(Translation[Language]['menu_other_server'], goToOtherServer);
        }
    }
} else {
    if(location.href.indexOf('/game/') >= 0){
        OtherServer--;
        GM_setValue('OGameOtherServer', OtherServer);
    }
}