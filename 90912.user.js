// ==UserScript==
// @name          مساعد القادة & مدير المنتدى
// @version       2.8.1
// @author        Samuel Essig (http://c1b1.de) تعريب  : الـقـيصر
// @description   Erweiterung und Unterstützung für Stammesführer und normale Member in der Mitgliederliste und im Forum von Die Stämme
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2008-2010, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://ae*.tribalwars.ae/forum.php*
// @include       http://www.tribalwars.ae/redir.php*
// @include       http://ae*.tribalwars.ae/game.php*
// @exclude       http://forum.tribalwars.ae/*
// @exclude       http://ae*.tribalwars.ae/*t=*
// ==/UserScript==


/*
Version 2.8.1

DS Duke & Forum Assistant



############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.
2008-2009

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################

For further information on translations of
scripts please contact me!
If you have any questions, comments,
ideas, etc, feel free to contact me

I will do my best to respond.

         mail:info@c1b1.de

         skype:c1b1_se

         http://c1b1.de


####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en


######################################################


Uploaded @ http://userscripts.org/scripts/show/40049
DS Forum Thread @ http://forum.die-staemme.de/showthread.php?t=95452


######################################################


Ab Version 2.6 funktioniert dieses Script in Verbindung mit DS - Mitglieder sortieren von  Roman S. (Zombie74)
Thread: http://forum.die-staemme.de/showthread.php?t=101782
Script: http://userscripts.org/scripts/show/41120

Vorraussetzungen:
  - DS - Mitglieder sortieren ab Version: 1.0.7
  - DS Duke & Forum Assistant ab Version 2.6
  - "DS Duke & Forum Assistant" muss in der Greasemonkey-Verwaltung unterhalb von "DS - Mitglieder sortieren" stehen
    (die Scripte lassen sich in der GM-Verwaltung verschieben)
  - maximal 98 Stammesmitglieder


Farben in der Mitgliederliste aktualisieren, da sie beim Mouseover von DS - Mitglieder sortieren gelöscht werden.
(2 empfohlen)
*/
const updateAllyMemberPageColours_interval = 2; // Sekunden





// ########################################## Language Strings: ################
// Remove Language Objects that you don't need to save memory!


const text = {
  'ae' : {
    '_name' : 'فريق السكربتات العربي - الـقـيصر',
    '_author' : 'C1B1SE .. تعريب : الـقـيصر',
    '_contact' : 'mail:info@c1b1.de',
    '_support' : 'http://forum.die-staemme.de/showthread.php?t=95452',
    '_self' : 'http://userscripts.org/scripts/show/40049' ,
    'alert_programmInited' : 'يتم الان تهيئة السكربت ..',
    'label_name' : 'الاسم',
    'label_colour' : 'اللون',
    'label_warnings' : 'تحذيرات',
    'label_notes' : 'ملاحظة',
    'label_action' : 'التفاصيل',
    'label_details' : 'تحرير التفاصيل',
    'label_totalWarnings' : 'مجموع التحذيرات:',
    'label_average' : String.fromCharCode('0216') + ' Durchschnitt:',
    'label_DukeInfo' : 'معلومات الملك',
    'label_noReasonAvailable' : 'لا يوجد سبب معين',
    'label_editNotes' : String.fromCharCode('0187') + ' تحرير الملاحظات',
    'label_editColour' : String.fromCharCode('0187') + ' تغير اللون',
    'label_reprimand' : String.fromCharCode('0187') + ' إضافة تحذير',
    'label_repealWarning' : String.fromCharCode('0187') + ' إزالة تحذير',
    'label_infoAboutPlayer' : 'معلومات الاعب',
    'label_playerMenu' : 'الاعب',
    'label_close' : 'إغلاق',
    'label_cancel' : 'إلغاء',
    'label_save' : 'تم ..',
    'label_delete' : 'حذف',
    'label_finished' : 'تم !',
    'label_colourInForum' : 'اللون في المنتدى',
    'label_editYourNotes' : 'تحرير الملاحظات',
    'label_editNotes_nosymbol' : 'تحرير الملاحظات',
    'label_editColour_nosymbol' : 'تحرير لون',
    'label_repealWarning_nosymbol' : 'إزالة التحذير',
    'label_editForumColourOfThePlayer' : 'تغير لون الاعب في المنتدى',
    'label_currentColour' : 'اللون الحالي :',
    'label_newColourValueInHEX' : 'اللون الجديد (ادخل قيمة الهكس):',
    'alert_successfullySaved' : 'تم ..',
    'alert_shouldHeBeReprimanded' : ' ادخل سبب تحذيرك لـ %player%:',
    'label_chooseTheWarningToRemove' : 'حذف التحذيرات',
    'alert_reallyDeleteTheWarning' : 'هل تود إزالة التحذير بالفعل ؟',
    'label_settings' : 'إعدادات',
    'label_colourThreads' : 'تلوين :',
    'label_off' : ' ',
    'label_textbox' : 'النص',
    'label_title' : 'العنوان',
    'label_replaceSmilies' : 'استبدال الابتسامات',
    'label_maxFontsize' : 'الحد الاقصى لحجم الخط',
    'label_maxImageSize' : 'الحد الاقصى لحجم الصور',
    'label_inBrackets_widthXheight' : 'الطول × العرض',
    'label_autoRedirectExternalLinks' : 'فتح الوصلات الخارجية بشكل تلقائي',
    'label_inBrackets_onlyInDomain' : '(فقط التابعة لـae*.tribalwars.ae)',
    'label_dukeAssistantActivated' : 'تشغيل/إيقاف التفاصيل',
    'label_inBrackets_memberlist' : '(قائمة الاعضاء)',
    'label_generalSettings' : 'الإعدادات العامة',
    'label_jsonDownload' : 'تصدير البيانات',
    'label_exportData' : 'تصدير واستيراد',
    'label_doImport' : 'استيراد',
    'label_functionOnlyForDeveloper' : 'بإمكانك عمل نسخة من البيانات واسترجاعها في وقت لاحق ..',
    'label_import' : 'استيراد :',
    'label_export' : 'تصدير :',
    'label_NumberOfRecords' : 'تسجيل/تسجيلات',
    'label_aboutX' : 'ca.',
    'label_wrongInputCode' : 'Der eingegebene Code ist weder korrekter XML noch JSON Code.',
    'label_import_export' : ' ',
    'label_factory_settings' : 'الوضع الطبيعي',
    'alert_resetToFactorySettings' : 'ستتم إعادة السكربت كما كان عند تركيبه .. هل تود الاستمرار ؟',
    'alert_reallyReset' : 'هل انت متأكد ؟\n\n',
    'label_aboutMe' : 'عن مساعد القادة & مدير المنتدى',
    'alert_aboutMeString' : 'مساعد القادة & مدير المنتدى\n(النسخة الثانية)\n\nالمبرمج : C1B1SE 2008-2009 المعرب : الـقـيصر 2010-2011\n\n\tالدعم الفني :\n\t المبرمج : info@c1b1.de http://c1b1.de\n\tالمعرب : http://forum.tribalwars.ae/member.php?u=115 \n\nمع تحيات [ فريق السكربتات العربي ]\nhttp://forum.tribalwars.ae/group.php?groupid=138\n\nولا تنسونا من دعوآتكم\n. . . : ]',
    'label_scaledFontSizeDownFromTo' : 'Schriftgröße von %from% auf %to% reduziert',
    'ingameString_authorWrote_aboveAquote' : ' hat folgendes geschrieben:',
    'label_open' : 'الملف الشخصي',
    'label_edit' : 'تحرير التفاصيل',
    'label_newMessage' : 'إرسال رسالة',
    'label_rank' : 'الترتيب:',
    'label_player' : 'الاعب',
    'label_continent' : 'ترتيب الاعب على مستوى القارة',
    'label_oda' : 'افضل لاعب > كمهاجم',
    'label_odd' : 'افضل لاعب > كمدافع',
    'label_od_total' : 'افضل لاعب > المجموع',
    'label_withdrawAllInvitations' : 'سحب جميع الدعوات',
    'alert_reallyWithdrawAllInvitations' : 'هل انت متأكد من انك تريد سحب جميع الدعوات ؟',
    'alert_unsavedSettingsAreLostWhenYouExitNow' : 'هل انت متأكد ؟',
    'label_extras' : 'إضافات',
    'label_toolPages' : 'الاحصائيات',
    'label_TWPlus' : 'TWPlus',
    'label_DSReal' : ' ',
    'label_myWebtool' : ' ',
    'label_pushThread' : 'Thread pushen'
    }
  };

// ########################################## Beware of changing something after this line ################
const version = '2.8.1';


const ds_mitlieder_sortieren = test(function(){ document.getElementById('dsmitgliedersortierenaktiv').tagName; },false) !== false;

var c_zindex = 20;
const url = document.location.href;
const world = url.split('.').shift().split('de').pop();
const lang = url.split('.')[0].split(/\/\/(\D+)\d+/)[1];
const say = text[lang]?text[lang]:{};
delete(text);

function setValue(key,value) { return GM_setValue(world+'_'+key,value); };
function getValue(key,def) { return GM_getValue(world+'_'+key,def); };
function test(fct,elsewise) { try { fct(); } catch(error) { return typeof(elsewise) == 'undefined' ? void(0) : elsewise ; } };

var dom = new html();


if(getValue('search_active') == undefined || getValue('reset') === true)
  {
  // First Start Fill Config
  setValue('reset',false);
  setValue('search_active',false);
  setValue('colourThreads',2);
  setValue('colourThreadsNames','');
  setValue('replaceSmiliesOn',true);
  setValue('maxFontSize',20);
  setValue('maxImgSize','300x250');
  setValue('autoRedirect',false);
  setValue('memberlistSF',true);

  setValue('synchronizingEnabled',false);
  setValue('synchronizingLastRequest',0);
  setValue('synchronizingCurrentHash','');
  setValue('synchronizingGroupId',0);
  setValue('synchronizingGroupKey','');

  alert(say.alert_programmInited);
  document.location.reload();
  }

var replaceSmiliesOn = getValue('replaceSmiliesOn')?true:false;
var colourThreadsVar = parseInt(getValue('colourThreads'));   // 0 = off, 1 = textbox, 2 = namebar
var colourThreadsNames = getValue('colourThreadsNames');
var maxFontSize = parseInt(getValue('maxFontSize'));   // 0 > on
var maxImgSize = getValue('maxImgSize')?getValue('maxImgSize').split('x'):false; // false = off, split('x')[0,1]
var autoRedirect = getValue('autoRedirect')?true:false;
var memberlistSF = getValue('memberlistSF')?true:false;

// Synchronizing Vars    (Future Versions)
var synchronizingEnabled = getValue('synchronizingEnabled',true)?true:false;
var synchronizingLastRequest = parseInt(getValue('synchronizingLastRequest',0));
var synchronizingCurrentVersion = getValue('synchronizingCurrentVersion',0);
var synchronizingThreadId = getValue('synchronizingCurrentVersion',0);


var srcs = {
  "trash":"http://www.c1b1.de/smile/dsforum/trash.gif",
  "edit":"http://www.c1b1.de/smile/dsforum/edit.gif",
  "warning":"http://www.c1b1.de/smile/dsforum/warning.png",
  "close":"http://www.c1b1.de/close.png",
  "dialog_titlebar_bg":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAUCAMAAAB70KeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPFBMVEXKto/JtY3Is4rGsYfEr4TDrYHCq3/Cq33AqnzCq37DrIDFr4PHsYfHsojHs4rItIzGs4zGsozGtI7KuJO4buSOAAAAJUlEQVR4XgXAhQ2AMAAAsM4V//9XgiBKsqJqumFatsPpcnu8vh8JzgC/JMysQAAAAABJRU5ErkJggg==",
  "dialog_main_bg":"graphic/background/main.jpg",
  "chequer_plate":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAPCAYAAAAh6nXEAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAM5JREFUCB0BwwA8/wEAAABM////AAAAAAAC////AAAAAAAAAAAAAgEBAQAAAAAAAAAAAAL///8AAAAAAAAAAAACAAAAAAEBAQAAAAAAAgAAAAD///8AAAAAAAIAAAAAAQEBAAAAAAACAAAAAP///wAAAAAAAgAAAAABAQEAAAAAAAIAAAAA////AAAAAAACAAAAAAEBAQAAAAAAAgAAAAD///8AAAAAAAIAAAAAAAAAAAEBAQACAAAAAAAAAAD///8AAgAAAAAAAAAAAQEBAI8aGGfA8Mz7AAAAAElFTkSuQmCC",
  "push_thread":"http://www.c1b1.de/smile/dsforum/push_thread.png"
  };

var colours = new Array(
        "#FFEFAE", "#FFD7AE", "#FECDD7", "#F9CDFE", "#E3CDFE", "#D3D7FE", "#D3ECFE", "#D3FEFA", "#CFFED0", "#ECFEAF",
        "#FFE064", "#FFB66C", "#FD829A", "#F28EFD", "#C699FD", "#8B97FC", "#83C9FC", "#74FCEE", "#69FC6C", "#DEFD73",
        "#F4C400", "#F47A00",            "#E311FB", "#00ced1", "#1D33FA", "#0581DC", "#04C6B3", "#03A707", "#9CC903",
        "#AD966B", "#9E7A8B", "#AE6AA9", "#6B6398", "#6F8BAA", "#6DABAB", "#6BAD71",
        "#B79300", "#4F03AB", "#020F7D", "#034A7E", "#026258", "#014503", "#DFD9CE",
         "#660000", "#701a1a", "#7a3333", "#854d4d", "#8f6666", "#998080", "#a39999", "#adb3b3", "#b8cccc", "#c2e6e6",
         "#ccffff", "#ff0000", "#e60f00", "#cc1f00", "#b32e00", "#993d00", "#804d00", "#665c00", "#4d6b00", "#337a00",
         "#1a8a00", "#009900", "#ffcc00", "#e6c71a", "#ccc233", "#b3bd4d", "#99b866", "#80b380", "#66ad99", "#4da8b3",
         "#33a3cc", "#1a9ee6", "#0099ff", "#006600", "#007500", "#008500", "#009400", "#00a300", "#00b300", "#00c200",
         "#00d100", "#00e000", "#00f000", "#00ff00", "#99ff66", "#a3f075", "#ade085", "#b8d194", "#c2c2a3", "#ccb3b3",
         "#d6a3c2", "#e094d1", "#eb85e0", "#f575f0", "#ff66ff");

if(url.indexOf('forum.php') != -1 && url.indexOf('screen=view_thread') != -1  && url.indexOf('thread_id') != -1 ) // If we are in a thread
  {
  var smilies = {
  '^^':['img','http://www.c1b1.de/smile/dsforum/grin.gif'],

  'xD':['img','http://www.c1b1.de/smile/dsforum/biggrin.gif'],
  ':-D':['img','http://www.c1b1.de/smile/dsforum/biggrin.gif'],
  ':D':['img','http://www.c1b1.de/smile/dsforum/biggrin.gif'],
  '=D ':['img','http://www.c1b1.de/smile/dsforum/biggrin.gif'],

  'lol':['img','http://www.c1b1.de/smile/dsforum/lword.gif'],

  ':P':['img','http://www.c1b1.de/smile/dsforum/tongue.gif'],
  ':-P':['img','http://www.c1b1.de/smile/dsforum/tongue.gif'],
  '=P ':['img','http://www.c1b1.de/smile/dsforum/tongue.gif'],
  'xP':['img','http://www.c1b1.de/smile/dsforum/tongue.gif'],
  ';p':['img','http://www.c1b1.de/smile/dsforum/tongue.gif'],


  ' 8)':['img','http://www.c1b1.de/smile/dsforum/cool.gif'],
  '*cool*':['img','http://www.c1b1.de/smile/dsforum/cool.gif'],

  '???':['img','http://www.c1b1.de/smile/dsforum/questionMark.png'],

  ';)':['img','http://www.c1b1.de/smile/dsforum/wink.gif'],
  ';-)':['img','http://www.c1b1.de/smile/dsforum/wink.gif'],

  ';(':['img','http://www.c1b1.de/smile/dsforum/cry.gif'],

  ':S':['img','http://www.c1b1.de/smile/dsforum/undecided.gif'],

  ':|':['img','http://www.c1b1.de/smile/dsforum/worried.gif'],

  ':(':['img','http://www.c1b1.de/smile/dsforum/sad.gif'],
  ':-(':['img','http://www.c1b1.de/smile/dsforum/sad.gif'],

  ':)':['img','http://www.c1b1.de/smile/dsforum/classic.gif'],
  ':-)':['img','http://www.c1b1.de/smile/dsforum/classic.gif'],

  '=)':['img','http://www.c1b1.de/smile/dsforum/normal.gif']

    };
  }

// Start it
load();

function load()
  {
  if(url.indexOf('redir.php?url') != -1 && autoRedirect) // If we are on redirect page which ll appears if you klick on a external link
    {
    autoRedirectToExternalLink();
    }
  else if(url.indexOf('game.php') != -1 && url.indexOf('screen=ally') != -1 && url.indexOf('mode=members') != -1) // If we are on member page (of own tribe)
    {
    if(memberlistSF)
      {
      renderAllyMemberPage();
      }
    addPlayerLinksEvents();
    bar();
    }
  else if(url.indexOf('game.php') != -1 && url.indexOf('screen=ally') != -1 && ( url.indexOf('mode=overview') != -1 || url.indexOf('mode=profile') != -1 || url.indexOf('mode=contracts') != -1) ) // If we are on tribe profile or tribe overview or tribe contracts   (of own tribe)
    {
    addPlayerLinksEvents();
    bar();
    }
  else if(url.indexOf('game.php') != -1 && url.indexOf('screen=ally') != -1 && url.indexOf('mode=invite') != -1) // If we are on tribe invitings   (of own tribe)
    {
    // Order!
    bar();
    addInviteLinks();
    addPlayerLinksEvents();
    }
  else if(url.indexOf('game.php') != -1 && url.indexOf('screen=ally') != -1 && url.indexOf('mode=forum') != -1) // If we are on the forum page (Not in the forum, but on the frame-holding page)
    {
    fitForumFrameIntoPage();
    }
  else if(url.indexOf('game.php') != -1 && url.indexOf('screen=mail') != -1 && url.indexOf('mode=new') != -1 && url.indexOf('duke') != -1) // If we are on the message popup
    {
    adjustMessagePopup();
    }
  else if(url.substr(-10) == 'forum.php?') // If we are on the start page (of the forum)
    {
    addPlayerLinksEvents();
    bar();
    }
  else if(url.indexOf('forum.php') != -1 && url.indexOf('screen=view_forum') != -1  && url.indexOf('forum_id') != -1) // If we are in a forum
    {
    addAnswerEvents();
    addPlayerLinksEvents();
    bar();
    }
  else if(url.indexOf('forum.php') != -1 && url.indexOf('screen=view_thread') != -1 && url.indexOf('action=new_post') != -1 && url.indexOf('duke=push') != -1 ) // If replying is in progress and pushing thread was set and form submitted
    {
    alert('?');
    rememberPushedPost();
    }
  else if(url.indexOf('forum.php') != -1 && url.indexOf('screen=view_thread') != -1  && url.indexOf('thread_id') != -1 && url.indexOf('page=last') != -1 && url.indexOf('answer=true') == -1 && url.indexOf('duke=push') != -1 ) // If replying is finished and pushing thread was set
    {
    removePushPost();
    }
  else if(url.indexOf('forum.php') != -1 && url.indexOf('screen=view_thread') != -1  && url.indexOf('thread_id') != -1 && url.indexOf('answer=true') != -1 && url.indexOf('duke=push') != -1 ) // If we are to reply a thread and pushing thread was set
    {
    pushThread();
    }
  else if(url.indexOf('forum.php') != -1 && url.indexOf('screen=view_thread') != -1  && url.indexOf('thread_id') != -1 ) // If we are in a thread
    {
    // Order!
    colourThreads();
    scaleFontSize();
    scaleImgSize();
    replaceSmilies();
    addPlayerLinksEvents();
    addPushButton();
    bar();
    }


  // Synchronize with Server  (Future Versions)
  //synchronize();


  // Adware
  zIndexAdware();


  /*
  // Execute functions
  if(url.indexOf('function=') != -1)
    {
    var fkt = url.split('=').pop();
    // eval() won't work with setValue/getValue
    // may work with eval(expr,window);
    switch(fkt)
      {
      case 'showStartScreen':
        showStartScreen();
        break;

      }
    }
   */

  }

function synchronize() // (Future Versions)
  {
  return;

  // Check whether synchronizing is enabled
  if(!synchronizingEnabled)
    return;

  var now = parseInt(new Date().getTime()/1000);

  // Check for last request
  if(synchronizingLastRequest+60*60 > now)   // Every hour
    return false;

  // Perform Request
  onerror_fct = function(e) { alert('Error while GM_xmlhttpRequest');alert(e); }

  onload_fct = function(obj) {

    var text = obj.responseText;

    text = text.split('<div class="text">').pop();
    text = text.split('</div>').shift();


    alert(text);

    }


  var headers =
      {
      'User-Agent' : navigator.userAgent?navigator.userAgent:'Mozilla/5.0'
      };

  var args =
      {
      'method' : 'POST',
      'url' : 'http://de6.die-staemme.de/forum.php?screen=view_thread&thread_id&thread_id=849095',
      'headers' : headers ,
      'onload' : onload_fct ,
      'onerror' : onerror_fct
      };

  GM_xmlhttpRequest(args);




  }

function addPushButton()
  {

  // if Antworten vorhanden
  var main = document.getElementsByClassName('main')[0];
  var posts = main.getElementsByClassName('post');
  var tables = posts[0].parentNode.getElementsByTagName('table');
  var table = tables[tables.length-1];
  var a = table.getElementsByTagName('a')[0].cloneNode(true);
  var img = a.getElementsByTagName('img')[0];
  img.setAttribute('src',srcs.push_thread);
  img.setAttribute('alt',say.label_pushThread);
  img.setAttribute('title',say.label_pushThread);
  a.setAttribute('href',a.href+'&duke=push');
  table.getElementsByTagName('a')[0].parentNode.appendChild(a);
  }

function pushThread()
  {
  var textarea = document.getElementById('message');
  if(textarea)
    {
    textarea.value = 'Push';
    var form = textarea.parentNode.parentNode.parentNode.parentNode.parentNode;
    form.setAttribute('action',form.action+'&duke=push');
    form.submit();
    alert(form.action);
    }
  }

function rememberPushedPost()
  {
  alert('???');
  /*
  http://de6.die-staemme.de/forum.php?screen=view_thread&action=new_post&thread_id=846581&duke=push

         ||||||||||||||||||||||

  http://de6.die-staemme.de/forum.php?screen=view_thread&thread_id=846581&page=last
  */

  document.location.href = document.location.href.replace('action=new_post&','')+'&page=last ';
  }



function removePushPost()
  {
  var main = document.getElementsByClassName('main')[0];
  var posts = main.getElementsByClassName('post');
  var last = posts[posts.length-1];
  alert(last.innerHTML);
  }


function zIndexAdware()
  {
  var td = document.getElementById('ad_leaderboard');
  test(function(){

    if(td)
      {
      td.style.zIndex = 0;
      }

    });
  }

function fitForumFrameIntoPage()
  {
  var id = window.setInterval( function() {
    test(function() {
      var iframe = document.getElementsByTagName('iframe')[0];
      //var y = iframe.contentWindow.innerHeight + iframe.contentWindow.scrollMaxY;
      var y = iframe.contentDocument.getElementById('ds_body').clientHeight;
      if(y != parseInt(iframe.style.height))
        {
        iframe.style.height = y + 20 + 'px';
        }
      });
    },500);
  }

function renderAllyMemberPage()
  {
  var table = document.getElementsByClassName('vis')[1];

  var elist = table.getElementsByTagName('tr');

  var ar = colourThreadsNames.split(',');
  var names = new Array();
  for(var i = 0; i < ar.length; i++)
    {
    var sub = ar[i].split('=');
    if(sub[0] && sub[1])
      names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]?sub[3]:'',sub[4]!=undefined?sub[4]:'');
    }

  // Table Heading
  if(ds_mitlieder_sortieren)
    {
    var td = dom.n('td');     // Empty
    td.setAttribute('style','width:10px; background:rgb(247, 238, 211) url(graphic/background/content.jpg) 0px -28px; cursor: default;');
    elist[0].appendChild(td);

    var th = dom.n('th');
    th.setAttribute('title','Duke Info by c1b1.de');
    th.setAttribute('colspan','4');
    th.style.MozBorderRadiusTopleft = '10px';
    th.style.MozBorderRadiusTopright = '10px';
    th.style.textAlign = 'center';
    th.appendChild(dom.text('Duke Info'));
    elist[0].appendChild(th);

    var start_i = 1;
    }
  else
    {
    var start_i = 0;
    }



  // Table Head
  if(ds_mitlieder_sortieren) {
    var td = dom.n('td');     // Empty
    td.setAttribute('style','width:10px; background:rgb(247, 238, 211) url(graphic/background/content.jpg) 0px -28px; cursor: default;');
    elist[start_i].appendChild(td); }

  var th = dom.n('th');
  th.setAttribute('title',say.label_colour);
  th.appendChild(dom.text(' '));
  elist[start_i].appendChild(th);

  var th = dom.n('th');
  th.setAttribute('title',say.label_warnings);
  var img = new Image();
  img.alt = say.label_warnings;
  img.src = srcs['warning'];
  th.appendChild(img);
  elist[start_i].appendChild(th);

  var th = dom.n('th');
  th.setAttribute('title',say.label_notes);
  th.appendChild(dom.text(say.label_notes));
  elist[start_i].appendChild(th);

  var th = dom.n('th');
  th.appendChild(dom.text(say.label_action));
  elist[start_i].appendChild(th);

  var adjusted_arr = new Array();
  var start_i = ds_mitlieder_sortieren?2:1;
  var len = ds_mitlieder_sortieren?elist.length-5:elist.length ;
  var warnings = 0;
  var player_n = 0;
  for(var i = start_i; len > i; i++)
    {
    ++player_n;

    // newline bug
    var td_i = ds_mitlieder_sortieren?1:0;

    elist[i].getElementsByTagName('td')[td_i].style.whiteSpace = 'nowrap';

    var player = elist[i].getElementsByTagName('td')[td_i].getElementsByTagName('a')[0].firstChild.data;

    if(names[player])
      {
      if(ds_mitlieder_sortieren) {
        var td = dom.n('td');     // Empty
        td.setAttribute('style','width:10px; background:rgb(247, 238, 211) url(graphic/background/content.jpg) 0px -28px; cursor: default;');
        elist[i].appendChild(td); }

      var td = dom.n('td');     // Colour
      td.setAttribute('title',names[player][0])
      td.setAttribute('class','ds_duke_and_forum_assistant_member_page_colour_td')
      td.setAttribute('style','width:10px; border:'+invColour(names[player][0])+' 1px solid; background:'+names[player][0]+';');
      elist[i].appendChild(td);

      var td = dom.n('td');    // Warnings
      td.appendChild(dom.text(names[player][1]));
      warnings += parseInt(names[player][1]);
      elist[i].appendChild(td);

      var td = dom.n('td');   // Notes
      var tmp = unescape(names[player][2]);
      tmp = tmp.length>30?tmp.substr(0,27)+'...':tmp;
      td.appendChild(dom.text(tmp));
      elist[i].appendChild(td);

      var td = dom.n('td');
      var a = dom.n('a');
      a.setAttribute('href','#');
      a.appendChild(dom.text(say.label_details));
      dom.addEvent(a,'click',function() {
        var td_i = ds_mitlieder_sortieren?1:0;
        if(this.parentNode.parentNode.getElementsByTagName('td')[td_i].getElementsByTagName('a')[0])
          var id = this.parentNode.parentNode.getElementsByTagName('td')[td_i].getElementsByTagName('a')[0].firstChild.data;
        else
          var id = this.parentNode.parentNode.getElementsByTagName('td')[td_i].getElementsByTagName('span')[0].firstChild.data;
        dialog_playerMenu(id);
        return void(0);  });
      td.appendChild(a);
      elist[i].appendChild(td);

      // Save to new array
      adjusted_arr[player] = names[player];
      }
    else
      {
      // Search next colour
      var n = 0;
      var c = true;
      while(c)
        {
        if(n > colours.length)
          break;

       var free = true;
       for(var p in names)
          {
          if(names[p][0] == colours[n])
            {
            free = false;
            break;
            }
          }
        if(free)
          break;
        else
          n++
        }
      // Save new player to new array
      names[player] = new Array(colours[n],0,'','');
      adjusted_arr[player] = new Array(colours[n],0,'','');
      }
    }


  // Update
  if(names != adjusted_arr)
    {
    var saveThing = new Array();
    for(p in adjusted_arr)
      {
      void saveThing.push(escape(p) + '=' + adjusted_arr[p].join('='));
      }
    setValue('colourThreadsNames',saveThing.join(','));
    }


  // Update Colours every x seconds:
  if(ds_mitlieder_sortieren)
    {
    window.setInterval(updateAllyMemberPageColours,Math.round(updateAllyMemberPageColours_interval*1000));
    }

  // Footer
  if(ds_mitlieder_sortieren)
    {
    // Total:
    ++i;

    var td = dom.n('td');     // Empty
    td.setAttribute('style','width:10px; background:rgb(247, 238, 211) url(graphic/background/content.jpg) 0px -28px; cursor: default;');
    elist[i].appendChild(td);

    var td = dom.n('td');
    td.appendChild(dom.text(say.label_totalWarnings));
    td.setAttribute('colspan',3);
    td.style.color = 'Gray';
    elist[i].appendChild(td);

    var td = dom.n('td');
    td.appendChild(dom.text(warnings));
    elist[i].appendChild(td);


    // Average:
    ++i;

    var td = dom.n('td');     // Empty
    td.setAttribute('style','width:10px; background:rgb(247, 238, 211) url(graphic/background/content.jpg) 0px -28px; cursor: default;');
    elist[i].appendChild(td);

    var td = dom.n('td');
    td.appendChild(dom.text( say.label_average ));
    td.setAttribute('colspan',3);
    td.style.color = 'Gray';
    elist[i].appendChild(td);

    var td = dom.n('td');
    var av = Math.round( (warnings / player_n) * 10 ) / 10;
    av = av + '';
    av = av.replace('.',',');

    td.appendChild(dom.text( av ));
    elist[i].appendChild(td);


    // Heading again:
    ++i;

    var td = dom.n('td');     // Empty
    td.setAttribute('style','width:10px; background:rgb(247, 238, 211) url(graphic/background/content.jpg) 0px -28px; cursor: default;');
    elist[i].appendChild(td);

    var th = dom.n('th');
    th.setAttribute('title','Duke Info by c1b1.de');
    th.setAttribute('colspan','4');
    th.style.MozBorderRadiusBottomleft = '10px';
    th.style.MozBorderRadiusBottomright = '10px';
    th.style.textAlign = 'center';
    th.appendChild(dom.text( say.label_DukeInfo ));
    elist[i].appendChild(th);
    }
  }

function updateAllyMemberPageColours()
  {
  // Only used if ds_mitlieder_sortieren is active, cause its hover effect kills the colour
  if(!ds_mitlieder_sortieren)
    return false;

  var table = document.getElementsByClassName('vis')[1];

  var elist = table.getElementsByTagName('tr');

  var start_i = ds_mitlieder_sortieren?2:1;
  var len = ds_mitlieder_sortieren?elist.length-5:elist.length ;
  for(var i = start_i; len > i; i++)
    {
    test( function() {
      var td = elist[i].getElementsByClassName('ds_duke_and_forum_assistant_member_page_colour_td')[0];
      if(td.style.backgroundColor != td.title)
        td.style.backgroundColor = td.title;
      });
    }
  }


function dialog_playerMenu(name)
  {
  var ar = colourThreadsNames.split(',');
  var names = new Array();
  for(var i = 0; i < ar.length; i++)
    {
    var sub = ar[i].split('=');   //      colour,warnings,       notes,                     reasons
    if(sub[0] && sub[1])          //      0      1               2                          3
      names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]?unescape(sub[3]):'',sub[4]?sub[4]:'');
    }
  var data = names[name];


  var reasons_text = dom.text('الأسباب :');
  if(data[1] > 0)
    {
    var reasons = data[3].split(';');
    var reasons_select = dom.n('select');
    for(var i = 0; i < data[1]; i++)
      {
      var option = dom.n('option');
      option.appendChild(dom.text(unescape(reasons[i]?reasons[i]:say.label_noReasonAvailable)));
      reasons_select.appendChild(option);
      }
    }
  else
    {
    var reasons_select = dom.text('-');
    }


  var a_editNotes = dom.n('a');
  a_editNotes.setAttribute('href','#');
  a_editNotes.appendChild(dom.text( say.label_editNotes ));
  dom.addEvent(a_editNotes,'click',function()
    {
    dialog_playerMenu_editNotes(name);
    return false;
    });

  var a_editColour = dom.n('a');
  a_editColour.setAttribute('href','#');
  a_editColour.appendChild(dom.text( say.label_editColour ));
  dom.addEvent(a_editColour,'click',function()
    {
    dialog_playerMenu_editColour(name);
    return false;
    });


  var a_addWarning = dom.n('a');
  a_addWarning.setAttribute('href','#');
  a_addWarning.appendChild(dom.text( say.label_reprimand ));
  dom.addEvent(a_addWarning,'click',function()
    {
    dialog_playerMenu_addWarning(name);
    return false;
    });


  if(data[1] != 0)
    {
    var a_removeWarning = dom.n('a');
    a_removeWarning.setAttribute('href','#');
    a_removeWarning.appendChild(dom.text( say.label_repealWarning ));
    dom.addEvent(a_removeWarning,'click',function()
      {
      dialog_playerMenu_removeWarning(name);
      return false;
      });
    }
  else
    var a_removeWarning = false;

  var frame = new chuanghu('dialog_playerMenu');
  frame.setTitle( say.label_playerMenu +' - '+unescape(escape(name)));
  frame.setInstructions( say.label_infoAboutPlayer +' '+unescape(escape(name)));
  frame.setButton('close',say.label_close);

  frame.addContent('table',
    {
    0:[
      dom.text(say.label_name+':'),
      dom.text(unescape(escape(name)))
      ],
    1:[
      dom.text(say.label_warnings+':'),
      dom.text(data[1])
      ],
    2:[
      reasons_text,
      reasons_select
      ],
    3:[
      dom.text(say.label_colourInForum+':'),
        [
        dom.text(data[0]),
        'id=dialog_playerMenu_forum_color_td',
        'style=color:transparent; background:'+data[0]+';',
        'title='+data[0]
        ]
      ],
    4:[
        [
        dom.text(say.label_notes+':'),
        'colspan=2'
        ]
      ],
    5:[
        [
        dom.text(data[2]),
        'colspan=2',
        'style=border:1px solid #0082BE; white-space: pre-wrap; '
        ]
      ],
    6:[
        [
        a_editNotes,
        'colspan=2'
        ]
      ],
    7:[
        [
        a_editColour,
        'colspan=2'
        ]
      ],
    8:[
        [
        a_addWarning,
        'colspan=2'
        ]
      ],
    9:[
        [
        a_removeWarning,
        'colspan=2'
        ]
      ]

    },'border=0,');
  dialog_playerMenu_id = frame.render(document.getElementsByTagName('body')[0]);

  }

function dialog_playerMenu_editNotes(name)
  {
  var ar = colourThreadsNames.split(',');
  var names = new Array();
  for(var i = 0; i < ar.length; i++)
    {
    var sub = ar[i].split('=');   //      colour,warnings,       notes,                     reasons
    if(sub[0] && sub[1])          //      0      1               2                          3
      names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]?unescape(sub[3]):'',sub[4]?sub[4]:'');
    }
  var data = names[name];

  var textarea = dom.n('textarea');
  textarea.setAttribute('title',name);
  textarea.setAttribute('cols','60');
  textarea.setAttribute('rows','5');
  textarea.setAttribute('id','dialog_playerMenu_editNotes_textarea');
  textarea.setAttribute('style','background:white url(http://img688.imageshack.us/img688/5807/83662851.gif) bottom right no-repeat; ');
  textarea.appendChild(dom.text(data[2]));

  var frame = new chuanghu('dialog_playerMenu_editNotes');
  frame.setTitle(say.label_editNotes_nosymbol +' - '+unescape(escape(name)));
  frame.setInstructions(say.label_editYourNotes);
  frame.setButton('cancel',say.label_cancel);
  frame.setButton('button',say.label_save,dialog_playerMenu_editNotes_save);
  frame.addContent('table',
    {
    0:[
      dom.text('ملاحظات :')
      ],
    1:[
        [
        dom.text(data[2]),
        'style= border:2px solid #0082BE; white-space:pre-wrap; '
        ]
      ],
    2:[
      textarea
      ]

    },'border=0,');
  frame.setPosition('id',dialog_playerMenu_id,15);
  frame.render(document.getElementsByTagName('body')[0]);
  }

function dialog_playerMenu_editNotes_save()
  {
  var text = escape(dom.id('dialog_playerMenu_editNotes_textarea').value);
  var name = dom.id('dialog_playerMenu_editNotes_textarea').title;

  var ar = colourThreadsNames.split(',');
  var names = new Array();
  for(var i = 0; i < ar.length; i++)
    {
    var sub = ar[i].split('=');   //      colour,warnings,       notes,                     reasons
    if(sub[0] && sub[1])          //      0      1               2                          3
      names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]?unescape(sub[3]):'',sub[4]?sub[4]:'');
    }
  names[name][2] = text;

  var saveThing = new Array();
  for(p in names)
    {
    void saveThing.push(escape(p) + '=' + names[p].join('='));
    }
  setValue('colourThreadsNames',saveThing.join(','));
  alert(say.alert_successfullySaved);
  document.location.reload();
  }

function dialog_playerMenu_editColour(name)
  {
  var ar = colourThreadsNames.split(',');
  var names = new Array();
  for(var i = 0; i < ar.length; i++)
    {
    var sub = ar[i].split('=');   //      colour,warnings,       notes,                     reasons
    if(sub[0] && sub[1])          //      0      1               2                          3
      names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]?unescape(sub[3]):'',sub[4]?sub[4]:'');
    }
  var data = names[name];

  var input = dom.n('input');
  input.setAttribute('title',name);
  input.setAttribute('type','text');
  input.setAttribute('value',data[0]);
  input.setAttribute('id','dialog_playerMenu_editColour_input');
  input.appendChild(dom.text(data[2]));
  dom.addEvent(input,'change',function(){
    dom.id('dialog_playerMenu_editColour_color_td_updating').style.backgroundColor = this.value;
    updatecColorDiv(this.value);
    updateColorSliders();
  });


  var div = dom.n('div');

  var start_distance = 100;

  // Bar 1
  var b1 = dom.n('div');
  b1.setAttribute('style','height:10px; width:265px; background:silver; position:absolute; top:'+(start_distance+10)+'px; left:10px; ');

  var s1 = dom.n('div');
  s1.setAttribute('style','height:8px; width:10px; position:absolute; background:black; top:1px; left:0px; ');
  s1.setAttribute('id','color_picker_s1');
  b1.appendChild(s1);

  var current_position1 = parseInt(s1.style.left);
  var active1 = false;
  var click_position1;
  dom.addEvent(s1,'mousedown',function(e) {
    current_position1 = parseInt(s1.style.left);
    click_position1 = e.pageX - current_position1;
    active1 = true; });
  dom.addEvent(document,'mouseup',function() {
    active1 = false; });
  dom.addEvent(document,'mousemove',function(e) {
    if(active1) {
      var obj = s1;
      var diff = (e.pageX - click_position1);
      if(diff < 0)
        diff = 0;
      else if(diff > 255)
        diff = 255;
      obj.style.left = diff + 'px';
      dom.id('color_picker_input1').value = diff;
      updatecColorDiv(); } });

  div.appendChild(b1);

  var input1 = dom.n('input');
  input1.setAttribute('type','text');
  input1.setAttribute('id','color_picker_input1');
  input1.setAttribute('size','3');
  input1.setAttribute('value','0');
  input1.setAttribute('style','margin-top:'+(start_distance+50)+'px; ');
  dom.addEvent(input1,'change',function() {
    var n = parseInt(this.value);
    if(typeof(n) != typeof(2))
      n = 0;
    else if(n < 0)
      n = 0;
    else if(n > 255)
      n = 255;
    s1.style.left = n + 'px';
    this.value = n;
    updatecColorDiv(); });

  div.appendChild(input1);



  // Bar 2
  var b2 = dom.n('div');
  b2.setAttribute('style','height:10px; width:265px; background:silver; position:absolute; top:'+(start_distance+25)+'px; left:10px; ');

  var s2 = dom.n('div');
  s2.setAttribute('style','height:8px; width:10px; position:absolute; background:black; top:1px; left:0px; ');
  s2.setAttribute('id','color_picker_s2');
  b2.appendChild(s2);

  var current_position2 = parseInt(s2.style.left);
  var active2 = false;
  var click_position2;
  dom.addEvent(s2,'mousedown',function(e) {
    current_position2 = parseInt(s2.style.left);
    click_position2 = e.pageX - current_position2;
    active2 = true; });
  dom.addEvent(document,'mouseup',function() {
    active2 = false; });
  dom.addEvent(document,'mousemove',function(e) {
    if(active2) {
      var obj = s2;
      var diff = (e.pageX - click_position2);
      if(diff < 0)
        diff = 0;
      else if(diff > 255)
        diff = 255;
      obj.style.left = diff + 'px';
      dom.id('color_picker_input2').value = diff;
      updatecColorDiv(); } });

  div.appendChild(b2);

  var input2 = dom.n('input');
  input2.setAttribute('type','text');
  input2.setAttribute('id','color_picker_input2');
  input2.setAttribute('size','3');
  input2.setAttribute('value','0');
  input2.setAttribute('style','margin-top:'+(start_distance+50)+'px; ');
  dom.addEvent(input2,'change',function() {
    var n = parseInt(this.value);
    if(typeof(n) != typeof(2))
      n = 0;
    else if(n < 0)
      n = 0;
    else if(n > 255)
      n = 255;
    s2.style.left = n + 'px';
    this.value = n;
    updatecColorDiv(); });

  div.appendChild(input2);


  // Bar 3
  var b3 = dom.n('div');
  b3.setAttribute('style','height:10px; width:265px; background:silver; position:absolute; top:'+(start_distance+40)+'px; left:10px; ');

  var s3 = dom.n('div');
  s3.setAttribute('style','height:8px; width:10px; position:absolute; background:black; top:1px; left:0px; ');
  s3.setAttribute('id','color_picker_s3');
  b3.appendChild(s3);

  var current_position3 = parseInt(s3.style.left);
  var active3 = false;
  var click_position3;
  dom.addEvent(s3,'mousedown',function(e) {
    current_position3 = parseInt(s3.style.left);
    click_position3 = e.pageX - current_position3;
    active3 = true; });
  dom.addEvent(document,'mouseup',function() {
    active3 = false; });
  dom.addEvent(document,'mousemove',function(e) {
    if(active3) {
      var obj = s3;
      var diff = (e.pageX - click_position3);
      if(diff < 0)
        diff = 0;
      else if(diff > 255)
        diff = 255;
      obj.style.left = diff + 'px';
      dom.id('color_picker_input3').value = diff;
      updatecColorDiv(); } });

  div.appendChild(b3);

  var input3 = dom.n('input');
  input3.setAttribute('type','text');
  input3.setAttribute('id','color_picker_input3');
  input3.setAttribute('size','3');
  input3.setAttribute('value','0');
  input3.setAttribute('style','margin-top:'+(start_distance+50)+'px; ');
  dom.addEvent(input3,'change',function() {
    var n = parseInt(this.value);
    if(typeof(n) != typeof(2))
      n = 0;
    else if(n < 0)
      n = 0;
    else if(n > 255)
      n = 255;
    s3.style.left = n + 'px';
    this.value = n;
    updatecColorDiv(); });

  div.appendChild(input3);


  // Bar 4
  var b4 = dom.n('div');
  b4.setAttribute('style','height:10px; width:265px; background:silver; position:absolute; top:'+(start_distance+60)+'px; left:10px; ');

  var s4 = dom.n('div');
  s4.setAttribute('style','height:8px; width:10px; position:absolute; background:black; top:1px; left:0px; ');
  b4.appendChild(s4);

  var current_position4 = parseInt(s4.style.left);
  var active4 = false;
  var click_position4;
  var colour;
  dom.addEvent(s4,'mousedown',function(e) {
    current_position4 = parseInt(s4.style.left);
    click_position4 = e.pageX - current_position4;

    var r = parseInt(dom.id('color_picker_input1').value).toString(16);
    var g = parseInt(dom.id('color_picker_input2').value).toString(16);
    var b = parseInt(dom.id('color_picker_input3').value).toString(16);
    colour = "0x"+r+g+b;

    active4 = true; });
  dom.addEvent(document,'mouseup',function() {
    colour = false;
    active4 = false;
    s4.style.left = '0px'; });
  dom.addEvent(document,'mousemove',function(e) {
    if(active4) {
      var obj = s4;
      var diff = (e.pageX - click_position4);
      if(diff < 0)
        diff = 0;
      else if(diff > 255)
        diff = 255;
      obj.style.left = diff + 'px';

      diff = (diff.toString(16).length==1)?('0'+diff.toString(16)):(diff.toString(16));

      var re = lightenColor(colour,"0x"+diff+diff+diff);



      dom.id('color_picker_input1').value = parseInt(re.substr(2,2),16);
      dom.id('color_picker_input2').value = parseInt(re.substr(4,2),16);
      dom.id('color_picker_input3').value = parseInt(re.substr(6,2),16);

      updateColorSliders();

      var hex_string = re.replace('0x','#');
      dom.id('dialog_playerMenu_editColour_color_td_updating').style.backgroundColor = hex_string;
      dom.id('dialog_playerMenu_editColour_color_td_updating').title = hex_string;
      dom.id('dialog_playerMenu_editColour_input').value = hex_string;
       } });

  div.appendChild(b4);


  var distance_top = 80;
  var distance_left = 180;

  var max_top = 50;
  var max_left = 50;

  function getC(a,i)
    {
    var r = 0,g = 0,b = 0;

    a = Math.round((255 / max_left) * a);
    i = Math.round((255 / max_top) * i);

    r = a;
    g = 255-i;
    b = i

    return 'rgb('+r+','+g+','+b+')';
    }



  for(var i = 0; i < max_top; i++)
    {
    for(var a = 0; a < max_left; a++)
      {
      var c = dom.n('div');
      c.setAttribute('style','height:1px; width:1px; position:absolute; top:'+(start_distance+i+distance_top)+'px; left:'+(a+distance_left)+'px; ');
      c.style.backgroundColor = getC(a,i);
      c.addEventListener('click',colorClicked,false);
      div.appendChild(c);
      }
    }



  var frame = new chuanghu('dialog_playerMenu_editColour');
  frame.setTitle(say.label_editColour_nosymbol+' - '+unescape(escape(name)));
  frame.setInstructions(say.label_editForumColourOfThePlayer);
  frame.setButton('cancel',say.label_cancel);
  frame.setButton('button',say.label_save,dialog_playerMenu_editColour_save);
  frame.addContent('table',
    {
    0:[
      dom.text(say.label_currentColour),
      dom.text(''),
        [
        dom.text(data[0]),
        'id=dialog_playerMenu_editColour_color_td',
        'style=color:transparent; background:'+data[0]+'; ',
        'title='+data[0]
        ]
      ],
    1:[
      dom.text(say.label_newColourValueInHEX),
      input,
        [
        dom.text(''),
        'id=dialog_playerMenu_editColour_color_td_updating',
        'style=color:transparent; background:transparent; '
        ]
      ]
    },'border=0,');
  frame.addContent('node',div);
  frame.setPosition('id',dialog_playerMenu_id,15);
  frame.render(document.getElementsByTagName('body')[0]);

  updatecColorDiv(data[0]);
  updateColorSliders();
  }

function dec2hex(n){
    n = parseInt(n); var c = 'ABCDEF';
    var b = n / 16; var r = n % 16; b = b-(r/16);
    b = ((b>=0) && (b<=9)) ? b : c.charAt(b-10);
    return ((r>=0) && (r<=9)) ? b+''+r : b+''+c.charAt(r-10);
  }

function colorClicked()
  {
  var c = dom.trim(dom.trim(this.style.backgroundColor).substr(4));
  var c = c.substr(0,c.length-1).split(',');

  var r = dom.trim(c[0]);
  var g = dom.trim(c[1]);
  var b = dom.trim(c[2]);

  updatecColorDiv(r,g,b);
  updateColorSliders()
  }

function updatecColorDiv(r,g,b) {
  if(!r && !g)
    {
    var r = parseInt(dom.id('color_picker_input1').value).toString(16);
    var g = parseInt(dom.id('color_picker_input2').value).toString(16);
    var b = parseInt(dom.id('color_picker_input3').value).toString(16);
    }
  else if(!g && r)
    {
    var tmp = dom.n('div');
    tmp.setAttribute('style','color:'+r+'; ');
    var c = dom.trim(tmp.style.color);   // rgb(199, 153, 84)

    c = c.split(',');
    r = dom.trim(dom.trim(c[0]).substr(4));
    g = dom.trim(c[1]);
    b = dom.trim(c[2]).substr(0,dom.trim(c[2]).length-1);
    delete(c);
    dom.id('color_picker_input1').value = r;
    dom.id('color_picker_input2').value = g;
    dom.id('color_picker_input3').value = b;

    r = dec2hex(parseInt(r));
    g = dec2hex(parseInt(g));
    b = dec2hex(parseInt(b));
    }
  else
    {
    dom.id('color_picker_input1').value = r;
    dom.id('color_picker_input2').value = g;
    dom.id('color_picker_input3').value = b;

    r = dec2hex(r);
    g = dec2hex(g);
    b = dec2hex(b);
    }

  r = r.length==1?'0'+r:r;
  g = g.length==1?'0'+g:g;
  b = b.length==1?'0'+b:b;

  var colour = '#'+r+g+b;
  dom.id('dialog_playerMenu_editColour_color_td_updating').style.backgroundColor = colour;
  dom.id('dialog_playerMenu_editColour_color_td_updating').title = colour;

  dom.id('dialog_playerMenu_editColour_input').value = colour; }

function updateColorSliders() {
  var r = parseInt(dom.id('color_picker_input1').value);
  var g = parseInt(dom.id('color_picker_input2').value);
  var b = parseInt(dom.id('color_picker_input3').value);

  dom.id('color_picker_s1').style.left = r + 'px';
  dom.id('color_picker_s2').style.left = g + 'px';
  dom.id('color_picker_s3').style.left = b + 'px'; }

function lightenColor(color,bn) {
  if(bn == undefined)
    bn = 0x888888;

  ra = (color & 0xff0000) >> 16;
  ga = (color & 0x00ff00) >> 8;
  ba = color & 0x0000ff;

  rb = (bn & 0xff0000) >> 16;
  gb = (bn & 0x00ff00) >> 8;
  bb = bn & 0x0000ff;

  rc = ra+rb;
  if(rc > 255)
    rc = 255;
  gc = ga+gb;
  if(gc > 255)
    gc = 255;
  bc = ba+bb;
  if(bc > 255)
    bc = 255;
  hex = "0x" + (rc << 16 | gc << 8 | bc).toString(16);
  return hex; }


function dialog_playerMenu_editColour_save()
  {
  var value = dom.id('dialog_playerMenu_editColour_input').value;
  var name = dom.id('dialog_playerMenu_editColour_input').title;

  var ar = colourThreadsNames.split(',');
  var names = new Array();
  for(var i = 0; i < ar.length; i++)
    {
    var sub = ar[i].split('=');   //      colour,warnings,       notes,                     reasons
    if(sub[0] && sub[1])          //      0      1               2                          3
      names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]?unescape(sub[3]):'',sub[4]);
    }
  names[name][0] = value;

  var saveThing = new Array();
  for(p in names)
    {
    void saveThing.push(escape(p) + '=' + names[p].join('='));
    }
  setValue('colourThreadsNames',saveThing.join(','));
  alert(say.alert_successfullySaved);
  document.location.reload();
  }

function dialog_playerMenu_addWarning(name)
  {
  var affirmation = confirm('...'+unescape(escape(name))+' هل ترغب حقاً بتحذيره ؟');
  if(affirmation)
    {
    var answer = prompt(say.alert_shouldHeBeReprimanded.replace(/%player%/g,unescape(escape(name))) ,'');

    var ar = colourThreadsNames.split(',');
    var names = new Array();
    for(var i = 0; i < ar.length; i++)
      {
      var sub = ar[i].split('=');   //      colour,warnings,       notes,                        reasons
      if(sub[0] && sub[1])          //      0      1               2                             3
        names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]!=''?unescape(sub[3]):'',sub[4]?sub[4]:'');
      }



    if(names[name][1] != 0)
      {
      names[name][3] = names[name][3].split(';');
      var new_reasons = new Array();
      for(var i = 0; i < parseInt(names[name][1]); i++)
        {
        if(names[name][3][i])
          new_reasons.push(names[name][3][i]);
        else
          new_reasons.push('');
        }
      new_reasons.push(escape(answer));
      names[name][3] = new_reasons.join(';');
      }
    else
      {
      names[name][3] = escape(answer);
      }

    names[name][1] = parseInt(names[name][1])+1;

    var saveThing = new Array();
    for(p in names)
      {
      void saveThing.push(escape(p) + '=' + names[p].join('='));
      }
    setValue('colourThreadsNames',saveThing.join(','));
    alert(say.alert_successfullySaved);

    document.location.reload();
    }
  }

function dialog_playerMenu_removeWarning(name)
  {

  var ar = colourThreadsNames.split(',');
  var names = new Array();
  for(var i = 0; i < ar.length; i++)
    {
    var sub = ar[i].split('=');   //      colour,warnings,       notes,                     reasons
    if(sub[0] && sub[1])          //      0      1               2                          3
      names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]?unescape(sub[3]):'',sub[4]?sub[4]:'');
    }
  var data = names[name];


  var reasons = data[3].split(';');
  var select = dom.n('select');
  select.setAttribute('id','dialog_playerMenu_removeWarning_select');
  select.setAttribute('title',name);
  for(var i = 0; i < data[1]; i++)
    {
    var option = dom.n('option');
    option.setAttribute('value',i);
    option.appendChild(dom.text(unescape(reasons[i]?reasons[i]:say.label_noReasonAvailable)));
    select.appendChild(option);
    }

  var frame = new chuanghu('dialog_playerMenu_removeWarning');
  frame.setTitle(say.label_repealWarning_nosymbol+' - '+unescape(escape(name)));
  frame.setInstructions(say.label_chooseTheWarningToRemove);
  frame.setButton('cancel',say.label_cancel);
  frame.setButton('button',say.label_delete,function() { dialog_playerMenu_removeWarning_save(name); });
  frame.addContent('table',
    {
    0:[
      dom.text(say.label_warnings+':'),
      select
      ]
     },'border=0,');
  frame.setPosition('id',dialog_playerMenu_id,15);
  frame.render(document.getElementsByTagName('body')[0]);

  }

function dialog_playerMenu_removeWarning_save(name)
  {
  var value = parseInt(dom.id('dialog_playerMenu_removeWarning_select').options[dom.id('dialog_playerMenu_removeWarning_select').selectedIndex].value);
  var affirmation = confirm(say.alert_reallyDeleteTheWarning);
  if(affirmation)
    {
    var ar = colourThreadsNames.split(',');
    var names = new Array();
    for(var i = 0; i < ar.length; i++)
      {
      var sub = ar[i].split('=');   //      colour,warnings,       notes,                        reasons
      if(sub[0] && sub[1])          //      0      1               2                             3
        names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]!=''?unescape(sub[3]):'',sub[4]?sub[4]:'');
      }

    if(names[name][1] != 0)
      {
      names[name][3] = names[name][3].split(';');
      var new_reasons = new Array();
      for(var i = 0; i < parseInt(names[name][1]); i++)
        {
        if(i != value)
          {
          if(names[name][3][i])
            new_reasons.push(names[name][3][i]);
          else
            new_reasons.push('');
          }
        }

      names[name][3] = new_reasons.join(';');

      names[name][1] = parseInt(names[name][1])-1;

      var saveThing = new Array();
      for(p in names)
        {
        void saveThing.push(escape(p) + '=' + names[p].join('='));
        }
      setValue('colourThreadsNames',saveThing.join(','));
      alert(say.alert_successfullySaved);

      document.location.reload();
      }
    }
  }


function autoRedirectToExternalLink()
  {
  if(document.getElementsByTagName('a')[0])
    {
    // Check whether its in domain
    var url = document.getElementsByTagName('a')[0].href
    url = url.split('?').pop();
    url = url.split('/')[2].split('.');
    void url.shift();
    url = url.join('.')
    if(url == 'die-staemme.de')
      document.location.href = document.getElementsByTagName('a')[0].href;
    }
  }


function dialog_settings()
  {

  var div = dom.n('div');
  div.id = 'dialog_settings';
  div.style.zIndex = 21;
  div.style.position = 'absolute';
  div.style.top = '100px';
  div.style.left = '200px';
  div.style.minHeight = '50px';
  div.style.minWidth = '150px';
  div.style.background = 'url(graphic/background/main.jpg) #F1EBDD';
  div.style.border = '3px outset #804000';
  div.style.borderTopColor = '#A0A0A0';

  var content = dom.n('table');

  var tr = dom.n('tr');
  var th = dom.n('th');
  th.setAttribute('colspan',2);
  th.appendChild(dom.text(say.label_settings));
  tr.appendChild(th);
  content.appendChild(tr);


  // <-Colour Threads
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text( say.label_colourThreads ));
  tr.appendChild(td);

  var select = dom.n('select');
  select.setAttribute('size','1');
  select.setAttribute('name','i_colourThreads');

  var option0 = dom.n('option');
  option0.setAttribute('value','0');
  option0.appendChild(dom.text( say.label_off ));
  if(colourThreadsVar == 0)
    option0.setAttribute('selected','selected');

  var option1 = dom.n('option');
  option1.setAttribute('value','1');
  option1.appendChild(dom.text( say.label_textbox ));
  if(colourThreadsVar == 1)
    option1.setAttribute('selected','selected');

  var option2 = dom.n('option');
  option2.setAttribute('value','2');
  option2.appendChild(dom.text(say.label_title));
  if(colourThreadsVar == 2)
    option2.setAttribute('selected','selected');

  dom.appendChilds(select,option0,option1,option2);

  var td = dom.n('td');
  td.appendChild(select);
  tr.appendChild(td);
  content.appendChild(tr);
  // Colour Threads->

  // <-Replace Smilies
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text( say.label_replaceSmilies ));
  tr.appendChild(td);

  var input = dom.n('input');
  input.setAttribute('value','true');
  input.setAttribute('type','checkbox');
  input.setAttribute('name','i_replaceSmilies');
  if(replaceSmiliesOn)
    input.setAttribute('checked','checked');

  var td = dom.n('td');
  td.appendChild(input);
  tr.appendChild(td);
  content.appendChild(tr);
  // Replace Smilies->

  // <-Scale Fontsize
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text( say.label_maxFontsize ));
  tr.appendChild(td);

  var input = dom.n('input');
  input.setAttribute('value','true');
  input.setAttribute('type','checkbox');
  input.setAttribute('name','i_scaleFontsize');
  if(maxFontSize > 0)
    input.setAttribute('checked','checked');
  dom.addEvent(input,'click',function()
    {
    if(this.checked)
      dom.name('i_scaleFontsize_text')[0].removeAttribute('disabled',1);
    else
      dom.name('i_scaleFontsize_text')[0].setAttribute('disabled','disabled');
    });

  var input_text = dom.n('input');
  input_text.setAttribute('type','text');
  input_text.setAttribute('name','i_scaleFontsize_text');
  if(maxFontSize > 0)
    input_text.setAttribute('value',maxFontSize);
  else
    {
    input_text.setAttribute('value','');
    input_text.setAttribute('disabled','disabled');
    }
  var td = dom.n('td');
  td.appendChild(input);
  td.appendChild(dom.text(' '));
  td.appendChild(input_text);
  tr.appendChild(td);
  content.appendChild(tr);
  // Scale Fontsize->

  // <-Scale Imgagesize
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text( say.label_maxImageSize ));
  tr.appendChild(td);

  var input = dom.n('input');
  input.setAttribute('value','true');
  input.setAttribute('type','checkbox');
  input.setAttribute('name','i_maxImgSize');
  if(maxImgSize)
    input.setAttribute('checked','checked');
  dom.addEvent(input,'click',function()
    {
    if(this.checked)
      {
      dom.name('i_maxImgSize_width')[0].removeAttribute('disabled',1);
      dom.name('i_maxImgSize_height')[0].removeAttribute('disabled',1);
      }
    else
      {
      dom.name('i_maxImgSize_width')[0].setAttribute('disabled','disabled');
      dom.name('i_maxImgSize_height')[0].setAttribute('disabled','disabled');
      }
    });

  var input_width = dom.n('input');
  input_width.setAttribute('type','text');
  input_width.setAttribute('name','i_maxImgSize_width');
  if(maxImgSize)
    input_width.setAttribute('value',maxImgSize[0]);
  else
    {
    input_width.setAttribute('value','');
    input_width.setAttribute('disabled','disabled');
    }

  var input_height = dom.n('input');
  input_height.setAttribute('type','text');
  input_height.setAttribute('name','i_maxImgSize_height');
  if(maxImgSize)
    input_height.setAttribute('value',maxImgSize[1]);
  else
    {
    input_height.setAttribute('value','');
    input_height.setAttribute('disabled','disabled');
    }

  var td = dom.n('td');
  td.appendChild(input);
  td.appendChild(dom.text(' '));
  td.appendChild(input_width);
  td.appendChild(dom.text('x'));
  td.appendChild(input_height);
  td.appendChild(dom.text(' '+say.label_inBrackets_widthXheight));
  tr.appendChild(td);
  content.appendChild(tr);
  // Scale Imagesize->


  // <-autoRedirect
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text( say.label_autoRedirectExternalLinks ));
  tr.appendChild(td);

  var input = dom.n('input');
  input.setAttribute('value','true');
  input.setAttribute('type','checkbox');
  input.setAttribute('name','i_autoRedirect');
  if(autoRedirect)
    input.setAttribute('checked','checked');

  var td = dom.n('td');
  td.appendChild(input);
  td.appendChild(dom.text( say.label_inBrackets_onlyInDomain ))
  tr.appendChild(td);
  content.appendChild(tr);
  // autoRedirect->


  // <-memberlistSF
  var tr = dom.n('tr');

  var td = dom.n('td');
  td.appendChild(dom.text( say.label_dukeAssistantActivated ));
  tr.appendChild(td);

  var input = dom.n('input');
  input.setAttribute('value','true');
  input.setAttribute('type','checkbox');
  input.setAttribute('name','i_memberlistSF');
  if(memberlistSF)
    input.setAttribute('checked','checked');

  var td = dom.n('td');
  td.appendChild(input);
  td.appendChild(dom.text( say.label_inBrackets_memberlist ))
  tr.appendChild(td);
  content.appendChild(tr);
  // memberlistSF->


  var frame = new chuanghu('dialog_settings');
  frame.setTitle('الإعدادات');
  frame.setInstructions(say.label_generalSettings);
  frame.setButton('cancel',say.label_cancel);
  frame.setButton('button',say.label_save,save_dialog_settings);
  frame.addContent('node',content);
  frame.render(document.getElementsByTagName('body')[0]);

  }


function save_dialog_settings()
  {
  // <-Colour Threads
  var select = dom.name('i_colourThreads')[0];
  colourThreadsVar = parseInt(select.options[select.selectedIndex].value);
  setValue('colourThreads',colourThreadsVar);
  // Colour Threads->

  // <-Replace Smilies
  replaceSmiliesOn = dom.name('i_replaceSmilies')[0].checked?true:false;
  setValue('replaceSmiliesOn',replaceSmiliesOn);
  // Replace Smilies->

  // <-Scale Fontsize
  if(dom.name('i_scaleFontsize')[0].checked)
    setValue('maxFontSize',dom.name('i_scaleFontsize_text')[0].value);
  else
    setValue('maxFontSize',0);
  // Scale Fontsize->

  // <-Scale Imgagesize
  if(dom.name('i_maxImgSize')[0].checked)
    setValue('maxImgSize',dom.name('i_maxImgSize_width')[0].value+'x'+dom.name('i_maxImgSize_height')[0].value);
  else
    setValue('maxImgSize',false);
  // Scale Imagesize->

  // <-autoRedirect
  autoRedirect = dom.name('i_autoRedirect')[0].checked?true:false;
  setValue('autoRedirect',autoRedirect);
  // autoRedirect->

  // <-memberlistSF
  memberlistSF = dom.name('i_memberlistSF')[0].checked?true:false;
  setValue('memberlistSF',memberlistSF);
  // memberlistSF->

  alert(say.alert_successfullySaved);
  dom.id('dialog_settings').parentNode.removeChild(dom.id('dialog_settings'));
  document.location.reload();
  }

function dialog_export()
  {
  var ar = colourThreadsNames.split(',');
  var names = new Array();
  for(var i = 0; i < ar.length; i++)
    {
    var sub = ar[i].split('=');   //      colour,warnings,       notes,                     reasons
    if(sub[0] && sub[1])          //      0      1               2                          3
      names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]?unescape(sub[3]):'',sub[4]?sub[4]:'');
    }


  // Create JSON
  var es = new Array();
  for(var p in names)
    {
    var str = '"'+p+'" : [\n';
    str += '  "'+names[p][0]+'" , \n';
    str += '  '+names[p][1]+' , \n';
    str += '  "'+names[p][2]+'" , \n';
    str += '  "'+names[p][3]+'"  \n';
    str += ' ]'
    es.push(str);
    }
  var str = '{\n';
  str += es.join(',\n');
  str += '\n}';

  // Base64 Encode JSON
  var base64 = base64_encode(str);

  // JSON Export Textarea
  var textarea_json_export = dom.n('textarea');
  textarea_json_export.setAttribute('style','float:left; white-space:pre-wrap; font-size:xx-small; ');
  textarea_json_export.setAttribute('cols','70');
  textarea_json_export.setAttribute('rows','20');
  textarea_json_export.appendChild(dom.text(str));

  // JSON Export Download Link
  var a_json_download = dom.n('a');
  a_json_download.setAttribute('href','data:application/octet-stream;base64,'+base64);
  a_json_download.setAttribute('type','application/octet-stream');
  a_json_download.appendChild(dom.text( say.label_jsonDownload ));

  // JSON Input Textarea
  var textarea_json_input = dom.n('textarea');
  textarea_json_input.setAttribute('style','float:left; white-space:pre-wrap; font-size:xx-small; ');
  textarea_json_input.setAttribute('cols','70');
  textarea_json_input.setAttribute('rows','20');
  textarea_json_input.setAttribute('id','textarea_json_input');
  textarea_json_input.addEventListener('keyup',function(event){ if(event.keyCode == 13) importJSONData(this.value); },false);

  // Import Button
  var input_import_button = dom.n('input');
  input_import_button.setAttribute('type','button');
  input_import_button.setAttribute('value',say.label_doImport);
  input_import_button.addEventListener('click',function(){ importJSONData(dom.id('textarea_json_input').value); },false);


  var frame = new chuanghu('dialog_export');
  frame.setTitle( say.label_exportData );
  frame.setInstructions( say.label_functionOnlyForDeveloper );
  frame.setButton('close',say.label_close);

  frame.addContent('table',
    {
    0:[
      dom.text(say.label_export),
      dom.text(say.label_import),
      ],
    1:[
      textarea_json_export,
      textarea_json_input
      ],
    2:[
        [
        dom.text(ar.length+' '+say.label_NumberOfRecords),
        'colspan=2'
        ]
      ],
    3:[
        [
        a_json_download,
        dom.text(' ('+say.label_aboutX+' '+round((base64.length*0.75)/1024,1)+'kB)')
        ],
      input_import_button
      ]

    },'border=0,');


  frame.setPosition(150,60);
  frame.render(document.getElementsByTagName('body')[0]);

  }

function importJSONData(str)
  {
  try
    {
    var str = dom.trim(str);
    eval('var names = '+str+';')
    names = eval(names);
    alert(dom.dumpObj(names,false));

    var saveThing = new Array();
    for(p in names)
      {
      void saveThing.push(escape(p) + '=' + names[p].join('='));
      }
    setValue('colourThreadsNames',saveThing.join(','));

    alert(say.alert_successfullySaved);

    document.location.reload();
    }
  catch(error)
    {
    var text = dom.dumpObj(error,false);
    text = say.label_wrongInputCode + '\n\n\nError description: \n\n' + text;
    alert(text);
    }
  }


function menu_extras()
  {
  if(dom.id('menu_extras'))
    {
    table = dom.id('menu_extras');
    table.style.display = 'block';
    }
  else
    {
    var table = dom.n('table');
    table.setAttribute('id','menu_extras');
    table.style.top = dom.id('link_menu_extras').offsetTop + 'px';
    table.style.left = dom.id('link_menu_extras').offsetLeft + 'px';
    table.style.backgroundColor = '#DED3B9';
    table.style.border = '#DED3B9 outset 3px';
    table.style.borderTop = '0px';
    table.style.borderLeft = '0px';
    table.style.position = 'absolute';

    var tr = dom.n('tr');
    var td = dom.n('td');
    var a = dom.n('a');
    a.href = '#';
    a.appendChild(dom.text(say.label_settings));
    dom.addEvent(a,'click',function()
      {
      dom.id('menu_extras').style.display = 'none';
      dialog_settings();
      return false; });
    td.appendChild(a);
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = dom.n('tr');
    var td = dom.n('td');
    var a = dom.n('a');
    a.href = '#';
    a.appendChild(dom.text( say.label_import_export ));
    dom.addEvent(a,'click',function()
      {
      dom.id('menu_extras').style.display = 'none';
      dialog_export();
      return false; });
    td.appendChild(a);
    tr.appendChild(td);
    table.appendChild(tr);


    var tr = dom.n('tr');
    var td = dom.n('td');
    var a = dom.n('a');
    a.href = '#';
    a.appendChild(dom.text( say.label_factory_settings ));
    dom.addEvent(a,'click',function()
      {
      dom.id('menu_extras').style.display = 'none';
      var q = confirm(say.alert_resetToFactorySettings);
      if(q)
        {
        var q = confirm( say.alert_reallyReset );
        if(q)
          {
          setValue('reset',true);
          document.location.reload();
          }
        }
      });
    td.appendChild(a);
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = dom.n('tr');
    var td = dom.n('td');
    var a = dom.n('a');
    a.href = '#';
    a.appendChild(dom.text( say.label_aboutMe ));
    dom.addEvent(a,'click',function()
      {
      dom.id('menu_extras').style.display = 'none';
      alert( say.alert_aboutMeString);
      return false;
      });
    td.appendChild(a);
    tr.appendChild(td);
    table.appendChild(tr);

    dom.id('ds_body').appendChild(table);

    table.style.top = (parseInt(table.style.top) - table.clientHeight) + 'px';

    }

  }


function addAnswerEvents()
  {
  var elist = dom.id('ds_body').getElementsByTagName('table')[2].getElementsByTagName('tr');
  for(var i = 1; i < elist.length; i++)
    {
    if(elist[i].getElementsByTagName('a')[0])
      {
      if(elist[i].getElementsByTagName('img')[0].src.indexOf('closed') == -1)
        {
        dom.addEvent(elist[i].getElementsByTagName('img')[0],'click',function() {
          var id = this.parentNode.getElementsByTagName('a')[0].href.split('=')[this.parentNode.getElementsByTagName('a')[0].href.split('=').length - 1];
          document.location.href = 'forum.php?screen=view_thread&answer=true&page=last&thread_id='+id;
          });
        }

      }
    }
  }


function scaleFontSize()
  {
  if(maxFontSize <= 0)
    return false;

  var elist = dom.class('text');
  for(var i = 0; i < elist.length; i++)
    {

    var nodeElements = elist[i].getElementsByTagName('*');
    for(var x = 0; x < nodeElements.length; x++)
      {
      if(nodeElements[x].style)
        {
        if(nodeElements[x].style.fontSize)
          {
          if(parseInt(nodeElements[x].style.fontSize) > maxFontSize)
            {
            nodeElements[x].title = say.label_scaledFontSizeDownFromTo.replace(/%from%/g,parseInt(nodeElements[x].style.fontSize).replace(/%to%/g,maxFontSize));
            nodeElements[x].style.fontSize = maxFontSize+'pt';
            }
          }
        }
      }

    }

  }

function scaleImgSize()
  {
  if(maxImgSize == false)
    return false;

  var elist = dom.class('text');
  for(var i = 0; i < elist.length; i++)
    {
    var imgs = elist[i].getElementsByTagName('img');
    for(var x = 0; x < imgs.length; x++)
      {
      imgs[x].style.maxWidth = maxImgSize[0]+'px';
      imgs[x].style.maxHeight = maxImgSize[1]+'px';
      }
    }

  }




function colourThreads()
  {

  var ar = colourThreadsNames.split(',');
  var names = new Array();
  for(var i = 0; i < ar.length; i++)
    {
    var sub = ar[i].split('=');   //      colour,warnings,       notes,                     reasons
    if(sub[0] && sub[1])          //      0      1               2                          3
      names[unescape(sub[0])] = new Array(sub[1],sub[2]?sub[2]:0,sub[3]?unescape(sub[3]):'',sub[4]!=undefined?sub[4]:'');
    }

  var elist = dom.class('text');
  for(var i = n = 0; i < elist.length; i++)
    {
    var a = elist[i].parentNode.getElementsByTagName('a')[0];
    var name = a.firstChild.data;
    name = dom.trim(name);

    // shared forum thing
    if(name.indexOf(' - '))
      {
      var new_name = name.split(' - ')[1];
      if(names[new_name])
        name = new_name;
      }
    /* alert(name);
    alert(names[name]);
    alert(names[escape(name)]);
    alert(names[unescape(name)]);  */
    if(name.indexOf(' - ') != -1)
      {
      // this could be a player in a shared forum
      // so, let's skip him to simplify it
      GM_log('Player: '+name+' skipped');

      a.parentNode.parentNode.style.backgroundImage = 'url('+srcs.chequer_plate+')';
      a.parentNode.parentNode.style.backgroundRepeat = 'repeat-x';
      }
    else if(names[name])
      {
      if(colourThreadsVar == 1)
        elist[i].style.backgroundColor = names[name][0];
      else if(colourThreadsVar == 2)
        a.parentNode.parentNode.style.backgroundColor = names[name][0];

      // Quotes:
      var quotes = elist[i].getElementsByClassName('quote_author');
      for(var x = 0; x < quotes.length; x++)
        {
         // Extract author's name
        var author = quotes[x].firstChild.data.split( say.ingameString_authorWrote_aboveAquote ).shift();
        if(names[author])
          {
          if(colourThreadsVar == 1)
            {
            quotes[x].style.backgroundColor = names[author][0];
            quotes[x].parentNode.nextSibling.getElementsByClassName('quote_message')[0].style.backgroundColor = names[author][0];
            quotes[x].parentNode.parentNode.parentNode.style.border = '1px solid black';
            quotes[x].parentNode.parentNode.parentNode.style.borderLeft = '0px';
            }
          else if(colourThreadsVar == 2)
            {
            quotes[x].style.backgroundColor = names[author][0];
            quotes[x].parentNode.nextSibling.getElementsByClassName('quote_message')[0].style.border = names[author][0] + ' 3px solid';
            }
          }
        }

      }
    else
      {
      // Search next Colour that is not in list
      var n = 0;
      var c = true;
      while(c)
        {
        if(n > colours.length)
          break;

       var free = true;
       for(var p in names)
          {
          if(names[p][0] == colours[n])
            {
            free = false;
            break;
            }
          }
        if(free)
          break;
        else
          n++
        }

      names[name] = new Array(colours[n],0,'','')

      if(colourThreadsVar == 1)
        elist[i].style.backgroundColor = names[name][0];
      else if(colourThreadsVar == 2)
        a.parentNode.parentNode.style.backgroundColor = names[name][0];

      // Quotes:
      var quotes = elist[i].getElementsByClassName('quote_author');
      for(var x = 0; x < quotes.length; x++)
        {
         // Extract author's name
        var author = quotes[x].firstChild.data.split( say.ingameString_authorWrote_aboveAquote ).shift();
        if(names[author])
          {
          if(colourThreadsVar == 1)
            {
            quotes[x].style.backgroundColor = names[author][0];
            quotes[x].parentNode.nextSibling.getElementsByClassName('quote_message')[0].style.backgroundColor = names[author][0];
            quotes[x].parentNode.parentNode.parentNode.style.border = '1px solid black';
            quotes[x].parentNode.parentNode.parentNode.style.borderLeft = '0px';
            }
          else if(colourThreadsVar == 2)
            {
            quotes[x].style.backgroundColor = names[author][0];
            quotes[x].parentNode.nextSibling.getElementsByClassName('quote_message')[0].style.border = names[author][0] + ' 3px solid';
            }
          }
        }

      n++;
      }
    }

  var saveThing = new Array();
  for(p in names)
    {
    void saveThing.push(escape(p) + '=' + names[p].join('='));
    }
  setValue('colourThreadsNames',saveThing.join(','));
  }


function replaceSmilies()
  {
  if(!replaceSmiliesOn)
    return true;
  var elist = dom.class('text');
  for(var i = 0; i < elist.length; i++)
    {
    for(var key in smilies)
      {
      if(smilies[key][0] == 'img')
        {
        elist[i].innerHTML = elist[i].innerHTML.split(key).join( '<img title="'+key+'" alt="'+key+'" src="' +smilies[key][1] + '" />' );
        }
      }
    }
  }

function addPlayerLinksEvents()
  {
  GM_addStyle(' .clickedPlayerMenu { position:absolute;background-color:#F1EBDD;border:#804000 2px solid;padding:3px; } .clickedPlayerMenu a:hover { background-color:#F7EED3; } .normal_link        { font-weight:bold; color: #804000; text-decoration:none; } .normal_link:active        {  font-weight:bold; color: #0082BE; text-decoration:none; } .normal_link:hover { font-weight:bold; color: #0082BE; text-decoration:none; }');

  var elist = document.getElementsByTagName('a');
  var i = 0;
  while(elist[i])
    {
    if(elist[i].href.indexOf('screen=info_player') != -1)
      {
      var span = dom.n('span');
      span.title = elist[i].href;
      span.setAttribute('class','normal_link');
      span.appendChild(elist[i].firstChild);
      span.addEventListener('click',function(e) { return clickedPlayerMenu(e,this); },false);
      span.addEventListener('dblclick',function() { parent.parent.frames[0].location.href = this.title;  },false);
      elist[i].parentNode.replaceChild(span,elist[i]);
      i--;
      }
    ++i;
    }
  }

function clickedPlayerMenu(e,span)
  {
  var x = rel_left(span);
  var y = rel_top(span) + span.offsetHeight;

  var id = span.title.match(/id=(\d+)/)[1];
  var name = dom.trim(span.innerHTML);

  var div = dom.n('div');
  div.setAttribute('class','clickedPlayerMenu');
  div.style.left = x + 'px';
  div.style.top = y + 'px';
  dom.tag('body')[0].appendChild(div);

  var a = dom.n('a');
  a.setAttribute('style','display:block;  border-bottom:1px solid rgb(234,225,204); ');
  a.href = span.title;
  a.target = 'main';
  a.appendChild(dom.text( say.label_open ));
  div.appendChild(a);

  var a = dom.n('a');
  a.setAttribute('style','display:block; ');
  a.href = '#';
  a.addEventListener('click',function() { dialog_playerMenu(name); return false; },false);
  a.appendChild(dom.text( say.label_edit ));
  div.appendChild(a);

  var a = dom.n('a');
  a.setAttribute('style','display:block; border-bottom:1px solid rgb(234,225,204); ');
  //a.href = 'game.php?screen=mail&mode=new&player='+id;
  a.href = '#';
  a.addEventListener('click',function(){
    messageWindow(id);
    this.parentNode.parentNode.removeChild(this.parentNode);
    return false;
    },false)
  a.target = 'main';
  a.appendChild(dom.text( say.label_newMessage ));
  div.appendChild(a);

  var span = dom.n('span');
  span.setAttribute('style','display:block; font-size:x-small; padding-top:3px;');
  span.appendChild(document.createTextNode( say.label_rank ));
  div.appendChild(span);

  var a = dom.n('a');
  a.setAttribute('style','display:block; ');
  a.setAttribute('href','#');
  a.addEventListener('click',function() { go2Ranking(name,'player'); },false);
  a.appendChild(document.createTextNode( say.label_player ));
  div.appendChild(a);

  var a = dom.n('a');
  a.setAttribute('style','display:block; ');
  a.setAttribute('href','#');
  a.addEventListener('click',function() { go2Ranking(name,'con_player'); },false);
  a.appendChild(document.createTextNode( say.label_continent ));
  div.appendChild(a);

  var a = dom.n('a');
  a.setAttribute('style','display:block; ');
  a.setAttribute('href','#');
  a.addEventListener('click',function() { go2Ranking(name,'kill_player&type=att'); },false);
  a.appendChild(document.createTextNode( say.label_oda ));
  div.appendChild(a);

  var a = dom.n('a');
  a.setAttribute('style','display:block; ');
  a.setAttribute('href','#');
  a.addEventListener('click',function() { go2Ranking(name,'kill_player&type=def'); },false);
  a.appendChild(document.createTextNode( say.label_odd ));
  div.appendChild(a);

  var a = dom.n('a');
  a.setAttribute('style','display:block; ');
  a.setAttribute('href','#');
  a.addEventListener('click',function() { go2Ranking(name,'kill_player&type=all'); },false);
  a.appendChild(document.createTextNode( say.label_od_total ));
  div.appendChild(a);

  var span = dom.n('span');
  span.setAttribute('style','display:block; font-size:x-small; padding-top:3px;');
  span.appendChild(document.createTextNode( say.label_toolPages ));
  div.appendChild(span);

  var a = dom.n('a');
  a.setAttribute('style','display:block; border-bottom:1px solid rgb(234,225,204); ');
  a.href = ''+world+'.twplus.org/file/player/'+id+'/';
  a.target = '_blank';
  a.appendChild(dom.text( say.label_TWPlus ));
  div.appendChild(a);

  var a = dom.n('a');
  a.setAttribute('style','display:block; border-bottom:1px solid rgb(234,225,204); ');
  a.href = 'http://www.dsreal.de/index.php?tool=akte&mode=player&world='+lang+world+'&id='+id;
  a.target = '_blank';
  a.appendChild(dom.text( say.label_DSReal ));
  div.appendChild(a);

  var a = dom.n('a');
  a.setAttribute('style','display:block; border-bottom:1px solid rgb(234,225,204); ');
  a.href = 'http://de.my-webtool.com/games/die-staemme/'+lang+world+'/users/'+id;
  a.target = '_blank';
  a.appendChild(dom.text( say.label_myWebtool ));
  div.appendChild(a);



  var img = new Image();
  img.alt = 'Close';
  img.src = srcs.close;
  img.setAttribute('style','position:absolute; top:0px; right:0px; ');
  img.addEventListener('click',function(){ this.parentNode.parentNode.removeChild(this.parentNode); },false);

  div.appendChild(img);

  return false;
  }


function go2Ranking(player_name,mode)
  {
  var form = document.createElement('form');
  form.setAttribute('method','post');
  form.setAttribute('target','main');
  form.setAttribute('action','/game.php?screen=ranking&mode='+mode+'&search');
  form.setAttribute('id','rankingForm');

  var name_i = document.createElement('input');
  name_i.setAttribute('type','hidden');
  name_i.setAttribute('name','name');
  name_i.setAttribute('value',player_name);

  form.appendChild(name_i);

  document.getElementsByTagName('body')[0].appendChild(form);
  document.getElementById('rankingForm').submit();
  }

function messageWindow(id)
  {
  var message_window = window.open('game.php?screen=mail&mode=new&player='+id+'&duke', say.label_newMessage, 'width=480,height=250,left=100,top=200,menubar=no,resizable=yes,location=no');
  }

function adjustMessagePopup()
  {
  parent.document.getElementsByTagName('frameset')[0].setAttribute('cols','*,0');
  var form = dom.id('form').cloneNode(true);

  while(dom.id('ds_body').firstChild)
    {
    dom.id('ds_body').removeChild(dom.id('ds_body').firstChild);
    }
  dom.id('ds_body').appendChild(form);
  dom.id('message').setAttribute('rows',5);
  dom.id('message').setAttribute('cols',50);

  dom.id('message').setAttribute('style','background:white url(http://img688.imageshack.us/img688/5807/83662851.gif) bottom right no-repeat; ');

  dom.id('igm_to').parentNode.parentNode.removeChild(dom.id('igm_to').parentNode);

  form.style.margin = '5px';
  form.getElementsByTagName('td')[0].style.MozBorderRadiusTopleft = '4px';
  form.getElementsByTagName('td')[1].style.MozBorderRadiusTopright = '4px';

  var last_td = form.getElementsByTagName('td')[form.getElementsByTagName('td').length - 2];
  while(last_td.firstChild)
    {
    last_td.removeChild(last_td.firstChild);
    }
  var submitB = dom.name('send')[0].cloneNode(true);

  dom.tag('p')[0].parentNode.removeChild(dom.tag('p')[0]);

  last_td.setAttribute('align','center');
  last_td.appendChild(submitB);
  last_td.style.MozBorderRadiusBottomleft = '4px';
  last_td.style.MozBorderRadiusBottomright = '4px';

  }



function addInviteLinks()
  {
  var name_input = document.getElementsByName('name')[0];

  var parent_e = name_input.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

  var c_bar = dom.id('adIntBar');
  var span = c_bar.getElementsByTagName('a')[0].parentNode;

  var a = dom.n('a');
  a.setAttribute('href','#dukeassistantBar_anchor');
  dom.addEvent(a,'click',function()
    {
    if(confirm( say.alert_reallyWithdrawAllInvitations ))
      returnAllInvitations();
    return false; });
  a.appendChild(dom.text(say.label_withdrawAllInvitations));

  span.appendChild(dom.text(' - '));
  span.appendChild(a);
  }

function returnAllInvitations()
  {
  var name_input = document.getElementsByName('name')[0];

  var table = name_input.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling;

  var elist = table.getElementsByTagName('tr');
  var i = 1;
  while(elist[i])
    {
    if(elist[i].getElementsByTagName('a')[1])
      var link = elist[i].getElementsByTagName('a')[1].href;
    else
      var link = elist[i].getElementsByTagName('a')[0].href;

    GM_xmlhttpRequest(
      {
      method : 'GET' ,
      url : link ,
      headers :
        {
        'User-Agent' : navigator.userAgent ,
        'Accept' : 'text/xml'
        }
      });

    ++i;
    }
  alert( say.label_finished );
  }


function chuanghu(id)
  {

  this.id = id;
  while(dom.id(this.id))
    this.id = id+'_'+dom.maxRand(100);

  this.position = false;
  this.content = false;
  this.titlebar = false;
  this.instructions = false;
  this.buttonset = false;
  this.primaryKeys = {'buttons':0,'content':0};

  this.rendered = false;

  this.setTitle = function(str)
    {
    this.titlebar = dom.n('div');
    this.titlebar.id = this.id+'_titlebar';
    this.titlebar.style.height = '20px';
    this.titlebar.style.verticalAlign = 'bottom';
    this.titlebar.style.paddingRight = '2px';
    this.titlebar.style.paddingBottom = '0px';
    this.titlebar.style.color = 'black';
    this.titlebar.style.background = '#c1aa7b url('+srcs['dialog_titlebar_bg']+') repeat-x top left';
    this.titlebar.style.textAlign = 'right';
    this.titlebar.style.fontFamily = 'Trebuchet MS,Verdana,sans-serif';
    this.titlebar.style.fontWeight = 'bolder';


    this.titlebar.appendChild(dom.text( str ));

    var img = new Image();
    img.src = 'http://www.c1b1.de/close.png';
    img.alt = this.id;
    img.title = say.close;
    img.style.position = 'absolute';
    img.style.left = '2px';
    img.style.top = '2px';
    dom.addEvent(img,'click',function() { dom.id(this.alt).parentNode.removeChild(dom.id(this.alt)); });
    this.titlebar.appendChild(img);
    return this.titlebar.id;
    }

  this.setInstructions = function(str)
    {
    this.instructions = dom.n('p');
    this.instructions.id = this.id+'_instructions';
    this.instructions.appendChild(dom.text( str ));
    return this.instructions.id;
    }

  this.addContent = function(type,obj,special)
    {
    switch(type)
      {
      case 0:
      case 'table':
        var main = dom.n('table');
        main.setAttribute('id',this.id+'_content_n'+(++this.primaryKeys.content));

        var special = special.split(',');
        for(var i = 0, len = special.length; len > i; i++ )
          {
          if(special[i])
            {
            var tmp = special[i].split('=');
            main.setAttribute(tmp[0],tmp[1]);
            }
          }

        var obj = eval(obj);
        for(var attr in obj)
          {
          var tr = dom.n('tr');
          for(var a = 0, alen = obj[attr].length; alen > a; a++ )
            {
            if(obj[attr][a] != undefined)
              {
              var td = dom.n('td');
              if(obj[attr][a][0] != undefined && obj[attr][a][0].tagName != 'OPTION')
                {
                if(obj[attr][a][0] !== false)
                  {
                  td.appendChild(obj[attr][a][0]);
                  // Attributes
                  var attributes = new Object();
                  for(var i = 1, len = obj[attr][a].length; len > i; i++)
                    {
                    if(typeof(obj[attr][a][i]) == typeof('string')) // If string => attribute
                      {
                      var tmp = obj[attr][a][i].split('=');
                      td.setAttribute(tmp[0],tmp[1]);
                      }
                    else   // Else if object => append node
                      {
                      td.appendChild(obj[attr][a][i]);
                      }
                    }
                  }
                }
              else
                {
                td.appendChild(obj[attr][a]);
                }
              }
            if(td)
              tr.appendChild(td);
            }
          main.appendChild(tr);
          }
        break;

      case 1:
      case 'node':
        if(obj)
          var main = obj;
        else
          return false;
        break;

      default:
        return false;

      }

    if(this.content)
      this.content.appendChild(main);
    else
      {
      this.content = dom.n('div');
      this.content.appendChild(main);
      }

    return main.id;
    }


  this.setButton = function(type,text,fnctn)
    {
    if(this.buttonset === false)
      {
      this.buttonset = dom.n('p');
      }

    switch(type)
      {
      case 0:
      case 'cancel':
      case 1:
      case 'close':
        var button = dom.n('input');
        button.setAttribute('value', text);
        button.setAttribute('type','button');
        button.setAttribute('id',this.id+'_button'+(++this.primaryKeys.buttons));
        if(type == 'cancel' || type == 0)
          dom.addEvent(button,'click',function()
          {
          if(confirm( say.alert_unsavedSettingsAreLostWhenYouExitNow ))
            dom.id(id).parentNode.removeChild(dom.id(id));
          });
        else
          dom.addEvent(button,'click',function()
          {
          dom.id(id).parentNode.removeChild(dom.id(id));
          });
        break;

      case 2:
      case 'button':
        var button = dom.n('input');
        button.setAttribute('value', text);
        button.setAttribute('type','button');
        button.setAttribute('id',this.id+'_button'+(++this.primaryKeys.buttons));
        dom.addEvent(button,'click',fnctn);
        break;

      case 3:
      case 'submit':
        var button = dom.n('input');
        button.setAttribute('value', text);
        button.setAttribute('type','submit');
        button.setAttribute('id',this.id+'_button'+(++this.primaryKeys.buttons));
        if(fnctn)
          dom.addEvent(button,'click',fnctn);
        break;

      default:
        return false;
      }
    this.buttonset.appendChild(button);
    return button.id;
    }

  this.setPosition = function(x,y,p)
    {
    if(x == 'id')
      {
      x = rel_left(dom.id(y));
      y = rel_top(dom.id(y));
      if(p)
        {
        x+=p;
        y+=p;
        }
      }

    if(this.rendered)
      {
      dom.id(this.id).style.left = x + 'px';
      dom.id(this.id).style.top = y + 'px';
      }
    else
      this.position = new Array(x+'px',y+'px');
    }


  this.render = function(obj)
    {
    this.rendered = true;

    var div = dom.n('div');
    div.id = this.id;
    div.style.zIndex = ++c_zindex;
    div.style.position = 'absolute';
    div.style.left = '300px';
    div.style.top = '60px';
    div.style.minHeight = '50px';
    div.style.minWidth = '150px';
    div.style.background = 'url('+srcs['dialog_main_bg']+') #F1EBDD';
    div.style.border = '3px solid #c1aa7b';

    if(this.position)
      {
      div.style.left = this.position[0];
      div.style.top = this.position[1];
      }

    if(this.titlebar)
      div.appendChild(this.titlebar);
    if(this.instructions)
      div.appendChild(this.instructions)
    if(this.content)
      div.appendChild(this.content);
    if(this.buttonset)
      div.appendChild(this.buttonset);

    if(!obj)
      document.getElementsByTagName('body')[0].appendChild(div);
    else
      obj.appendChild(div);

    // Foreground onlick...
    dom.addEvent(this.titlebar,'click',function()
      {
      if(this.parentNode.style.zIndex < c_zindex)
        this.parentNode.style.zIndex = ++c_zindex;
      });
    // ...foreground onlick


    // Drabable part...
    if(true)
      {

      // Save current Position of the element
      var current_position = new Array( parseInt(div.style.left) , parseInt(div.style.top) );

      var active = false;
      var click_position;
      var clone = false;

      dom.addEvent(this.titlebar?this.titlebar:div,'mousedown',function(e)
        {
        // Clone Node to work with original
        if(clone)
          {
          try {
            clone.parentNode.removeChild(clone);
            clone = false;
            }
          catch(e) {}

          }
        clone = div.cloneNode(true);
        div.parentNode.insertBefore(clone,div);

        // Set original semitransparent
        div['style']['opacity'] = 0.5;

        // save position
        current_position[0] = parseInt(  (this.id.split('_').pop()=='titlebar'?this.parentNode:this).style.left  );
        current_position[1] = parseInt(  (this.id.split('_').pop()=='titlebar'?this.parentNode:this).style.top  );
        click_position = new Array((document.all?window.event.clientX:e.pageX) - current_position[0],(document.all?window.event.clientY:e.pageY) - current_position[1]);

        // Set cursor
        (this.id.split('_').pop()=='titlebar'?this.parentNode:this) .style.cursor = 'move';

        active = true;
        });

      dom.addEvent(div,'mouseup',function()
        {
        // Remove cursor
        this.style.cursor = 'default';
        active = false;

        // Remove semitransparent
        div['style']['opacity'] = 1.0;
        // Remove clone
        try {
          clone.parentNode.removeChild(clone);
          clone = false; }
        catch(e) {}
        });

      dom.addEvent(document,'mousemove',function(e)
        {
        if(active)
          {
          var obj = div;
          obj.style.left = ((document.all?window.event.clientX:e.pageX) - click_position[0]) + 'px';
          obj.style.top = ((document.all?window.event.clientY:e.pageY) - click_position[1]) + 'px';
          }
        });
      }
    // ...drabable part

    // Hide on doubleclick...
    if(true)
      {
      var opacity_changing;
      dom.addEvent(div,'dblclick',function(e)
        {
        var current_opacity = div.style.opacity;
        opacity_changing = window.setInterval(function()
          {
          if(parseFloat(div.style.opacity) >= 0.3)
            div.style.opacity = parseFloat(div.style.opacity)- 0.1;
          else
            window.clearInterval(opacity_changing);
          },100);
        });
      }
    // ...hide on doubleclick


    // Fully enlarge on middleclick...
    if(true)
      {
      var size_changing;
      var mainTableWidth;
      var mainTableHeight;
      var mainTableOffsetLeft;
      var mainTableOffsetTop;
      window.clone = false;

      dom.addEvent(div,'mouseup',function(e)
        {
        if(e.button == 1)
          {
          mainTableWidth = parseInt(dom.class('main')[0].clientWidth);
          mainTableHeight = parseInt(dom.class('main')[0].clientHeight);

          mainTableOffsetLeft = rel_left(dom.class('main')[0]);
          mainTableOffsetTop = rel_top(dom.class('main')[0]);

          // Clone Node to work with clone
          if(clone !== false)
            {
            clone.parentNode.removeChild(clone);
            clone = false;
            }
          clone = div.cloneNode(true);
          clone.style.outline = '3px dashed black';
          clone.style.background = 'transparent';
          clone.style.border = '0px';
          clone.style.width = div.clientWidth;
          clone.style.height = div.clientHeight;
          dom.removeChilds(clone);

          div.parentNode.insertBefore(clone,div);
          div.style.display = 'none';


          size_changing = window.setInterval(function()
            {
            var a = false;

            if(parseInt(clone.clientWidth) < mainTableWidth)
              {
              clone.style.width = parseInt(clone.clientWidth) + 30 + 'px';
              a = true;
              }
            if(parseInt(clone.offsetLeft) > mainTableOffsetLeft)
              {
              clone.style.left = parseInt(clone.offsetLeft) - 10 + 'px';
              a = true;
              }
            if(parseInt(clone.clientHeight) < mainTableHeight)
              {
              clone.style.height = parseInt(clone.clientHeight) + 30 + 'px';
              a = true;
              }
            if(parseInt(clone.offsetTop) > mainTableOffsetTop)
              {
              clone.style.top = parseInt(clone.offsetTop) - 10 + 'px';
              a = true;
              }

            if(a === false)
              {
              window.clearInterval(size_changing);
              div.style.opacity = 1.0;
              div.style.width = clone.style.width;
              div.style.height = clone.style.height;
              div.style.left = clone.style.left;
              div.style.top = clone.style.top;
              div.style.display = 'block';
              // Remove clone
              clone.parentNode.removeChild(clone);
              clone = false;
              }
            },100);
          }

        });
      }
    // ...fully enlarge on middleclick




    // Enlarge part...
    if(true)
      {

      // Save current Position of the element
      var current_position = new Array( parseInt(div.style.left) , parseInt(div.style.top) );

      // Save min size of the element
      var min_size = new Array( parseInt(div.clientWidth) , parseInt(div.clientHeight) );

      var enlarge_active = false;

      dom.addEvent(div,'mousedown',function(e)
        {

        // Save current Position of the element
        current_position = new Array( parseInt(div.style.left) , parseInt(div.style.top) );

        if( this.clientWidth - ((document.all?window.event.clientX:e.pageX) - current_position[0]) > 10)
          return false;

        if( this.clientHeight - ((document.all?window.event.clientY:e.pageY) - current_position[1]) > 10)
          return false;

        // Set original semitransparent
        div['style']['opacity'] = 0.5;

        // save position
        current_position[0] = parseInt(  this.style.left  );
        current_position[1] = parseInt(  this.style.top  );
        //click_position = new Array((document.all?window.event.clientX:e.pageX) - current_position[0],(document.all?window.event.clientY:e.pageY) - current_position[1]);

        // Set cursor
        this.style.cursor = 'se-resize';

        enlarge_active = true;
        });

      dom.addEvent(div,'mouseup',function()
        {
        // Remove cursor
        this.style.cursor = 'default';
        enlarge_active = false;

        // Remove semitransparent
        div['style']['opacity'] = 1.0;
        });

      dom.addEvent(document,'mousemove',function(e)
        {
        if(enlarge_active)
          {
          obj = div;
          var new_width = obj.clientWidth + ((document.all?window.event.clientX:e.pageX) - (current_position[0]+obj.clientWidth));
          var new_height = obj.clientHeight + ((document.all?window.event.clientY:e.pageY) - (current_position[1]+obj.clientHeight));
          obj.style.width = (new_width>=min_size[0]?new_width:min_size[0]) + 'px';
          obj.style.height = (new_height>=min_size[1]?new_height:min_size[1]) + 'px';
          }
        });

      // Cursor onmouseover:
      dom.addEvent(div,'mousemove',function(e)
        {
        if(!enlarge_active)
          {
          // save position
          current_position[0] = parseInt(  this.style.left  );
          current_position[1] = parseInt(  this.style.top  );

          if(
          this.clientWidth - ((document.all?window.event.clientX:e.pageX) - current_position[0]) > 3
          ||
          this.clientHeight - ((document.all?window.event.clientY:e.pageY) - current_position[1]) > 3
          )
            {
            // Set cursor
            div.style.cursor = 'default';
            }
          else
            {
            // Set cursor
            div.style.cursor = 'se-resize';
            }

          }
        });


      }
    // ...enlarge part




    return div.id;
    }

  }


function rel_top(e)
  {
  var y = 0;
  while(e)
    {
    y += e.offsetTop + e.clientTop;
    e = e.offsetParent;
    }
  return y;
  }

function rel_left(e)
  {
  var x = 0;
  while(e)
    {
      x += e.offsetLeft + e.clientLeft;
      e = e.offsetParent;
    }
  return x;
  }

function bar()
    {
    if(dom.id('dukeassistantBar'))
      return false;

    var div = dom.n('div');
    div.setAttribute('id','adIntBar');
    div.style.backgroundColor = 'rgb(243,237,223)';
    div.style.border = 'rgb(128,64,0) 2px solid';
    div.style.marginTop = '15px';
    div.style.padding = '5px';

    var leftfont = dom.n('span');
    leftfont.setAttribute('style','float:left; ');

    var a = dom.n('a');
    a.setAttribute('id','dukeassistantBar_anchor');
    a.setAttribute('name','dukeassistantBar_anchor');
    leftfont.appendChild(a);

    var a = dom.n('a');
    a.setAttribute('href','#dukeassistantBar_anchor');
    dom.addEvent(a,'click',function()
      {
      menu_extras();
      return false; });
    a.setAttribute('id','link_menu_extras');
    a.appendChild(dom.text(say.label_extras));
    leftfont.appendChild(a);

    div.appendChild(leftfont);

    var rightfont = dom.n('span');
    rightfont.setAttribute('style','float:right; font-size:smaller; opacity:0.7; ');
    rightfont.appendChild(dom.text( say._name + ' (' + version + ')'));
    div.appendChild(rightfont);

    var clearfont = dom.n('div');
    clearfont.setAttribute('style','clear:both; ');
    div.appendChild(clearfont);

    return dom.id('ds_body').appendChild(div);
    }

function rand(max)
  {
  return Math.ceil(Math.random() * 1000) % max + 1;
  }

function invColour(s)
  {
  return '#'+new RegExp(/(\w{6})$/).exec('00000'+Number(16777215 - parseInt(new RegExp(/([A-Fa-f0-9]{6})$/).exec(s), 16)).toString(16))[1];
  }


function randomStr(min,max,chars)
  {
  if(!chars)
    {
    chars = " 01"; // Zeichen die im String vorkommen dürfen
    }
  stringlength = rand(max);
  i = 0;
  result = "";
  while(i < stringlength || i < min)
    {
    result = result + chars[rand(chars.length-1)];
    i++;
    }
  return result;
  }


function html()
  {
  this.n = function(type) // Returns a new element of the type [type]
    {
    return document.createElement(type);
    }

  this.text = function(c) // Returns a new textnode with the content [c]
    {
    return document.createTextNode(c);
    }

  this.img = function(c) // Returns a new textnode with the content [c]
    {
    if(c)
      {
      var img = new Image();
      img.src = c;
      return img;
      }
    return new Image();
    }

  // Search functions

  this.id = function(type)  // Returns the element with the id [type]
    {
    return document.getElementById(type);
    }

  this.tag = function(type) // Returns the list ob elements with the tag given in [type]
    {
    return document.getElementsByTagName(type);
    }

  this.name = function(type) // Returns the list ob elements with the tag name given in [type]
    {
    return document.getElementsByName(type);
    }

  this.class = function(type) // Returns the list ob elements with the class given in [type]
    {
    return document.getElementsByClassName(type);
    }

  this.findByAttr = function(obj,attr,value) // Returns a list ob elements that have an attribute [attr] with the value [value]
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i][attr] == value)
        {
        list[a] = obj.getElementsByTagName('*')[i];
        a++;
        }
      }
    list['length'] = a;
    return list;
    }

  this.findByInner = function(obj,value) // Returns a list ob elements that contain the value [value]
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i].firstChild)
        {
        if(obj.getElementsByTagName('*')[i].firstChild.data)
          {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1)
            {
            list[a] = obj.getElementsByTagName('*')[i];
            a++;
            }
          }
        }
      }
    list['length'] = a;
    return list;
    }

  this.getNextElement = function(obj,tname) {
    var tname = tname.toLowerCase();
    var obj = obj.nextSibling;
    while(true)
      {
      if(!obj)
        return false;
      if(!obj.tagName)
        obj = obj.nextSibling;
      else if(obj.tagName.toLowerCase() == tname)
        return obj;
      else
        obj = obj.nextSibling;
      }
    return obj; }


  this.appendChilds = function(obj)
    {
    for(var i = 1; i < arguments.length; i++)
      arguments[0].appendChild(arguments[i]);
    }

  this.removeChilds = function(obj)
    {
    while(obj.firstChild)
      {
      obj.removeChild(obj.firstChild);
      }
    }

  this.dumpObj = function(e,html,count)
    {
    if(!count)
      count = 0;
    var spaces = '  ';
    for(var i = 0; i < count; i++)
      spaces += '  ';
    if(html)
      n = '<br />\n';
    else
      n = '\n';
    var o = '( '+typeof(e)+' )'+n;
    for(var p in e)
      o+= spaces+p+' = '+'( '+typeof(e[p])+' ) '+(typeof(e[p]) == 'object'?(this.dumpObj(e[p],html,(count+2))):e[p])+n;
    return o;
    }

  this.grabText = function(node,maxDepth)
    {
    if(3 == node.nodeType)
      return node.nodeValue;
    else if((1 == node.nodeType) && (0 < maxDepth))
      {
      var result = '';
      for(var i = 0; i < node.childNodes.length; i++)
        {
        result += grabText(node.childNodes[i],maxDepth - 1);
        }
      return result;
      }
    return '';
    }


  // Gets the element (target) of a DOM Mouse Event Object
  // Returns false if there's no element
  this.mouseEventTarget = function(e)
    {
    if(e.target) // Mozilla, Opera, Safari
      return e.target;
    else if (e.srcElement) // IE
      return e.srcElement;
    else // No Target
      return false;
    }



  // Flexible Javascript Events by John Resig (ejohn.org)
  // http://ejohn.org/projects/flexible-javascript-events/
  this.addEvent = function( obj, type, fn )
    {
    if(obj.attachEvent)
      {
      obj['e'+type+fn] = fn;
      obj[type+fn] = function(){obj['e'+type+fn](window.event);}
      obj.attachEvent( 'on'+type, obj[type+fn] );
      }
    else
      obj.addEventListener( type, fn, false );
    }

  this.removeEvent = function( obj, type, fn )
    {
    if(obj.detachEvent)
      {
      obj.detachEvent( 'on'+type, obj[type+fn] );
      obj[type+fn] = null;
      }
    else
      obj.removeEventListener( type, fn, false );
    }

  this.valuePosition = function(arr,value)
    {
    for(var i = 0, len = arr.length; i < len; i++)
      {
      if(arr[i] == value)
        return i;
      }
    return false;
    }

   this.maxRand = function(max)
     {
     return Math.ceil(Math.random() * 1000) % max + 1;
     }

   this.trim = function(str)
    {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
    }


  return true;
  }

function in_array(obj,elem)
  {
  for(var attr in obj)
    {
    if(obj[attr] == elem)
      return true;
    }
  return false;
  }

function in_array_ext(obj,elem,subindex)
  {
  for(var attr in obj)
    {
    if(obj[attr][subindex] == elem)
      return true;
    }
  return false;
  }

function round(i,p)
  {
  return parseFloat(parseFloat(i).toFixed(p));
  }

function str_ireplace ( search, replace, subject ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Martijn Wieringa
    // +      input by: penutbutterjelly
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Jack
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: str_ireplace('l', 'l', 'HeLLo');
    // *     returns 1: 'Hello'

    var i, k = '';
    var searchl = 0;

    search += '';
    searchl = search.length;
    if (!(replace instanceof Array)) {
        replace = new Array(replace);
        if (search instanceof Array) {
            // If search is an array and replace is a string,
            // then this replacement string is used for every value of search
            while (searchl > replace.length) {
                replace[replace.length] = replace[0];
            }
        }
    }

    if (!(search instanceof Array)) {
        search = new Array(search);
    }
    while (search.length>replace.length) {
        // If replace has fewer values than search,
        // then an empty string is used for the rest of replacement values
        replace[replace.length] = '';
    }

    if (subject instanceof Array) {
        // If subject is an array, then the search and replace is performed
        // with every entry of subject , and the return value is an array as well.
        for (k in subject) {
            subject[k] = str_ireplace(search, replace, subject[k]);
        }
        return subject;
    }

    searchl = search.length;
    for (i = 0; i < searchl; i++) {
        reg = new RegExp(search[i], 'gi');
        subject = subject.replace(reg, replace[i]);
    }

    return subject;
}

function utf8_encode ( string ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'

    string = (string+'').replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    var utftext = "";
    var start, end;
    var stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if((c1 > 127) && (c1 < 2048)) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc != null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n+1;
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length);
    }

    return utftext;
}

function base64_encode( data ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara
    // +   improved by: Thunder.m
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode
    // *     example 1: base64_encode('Kevin van Zonneveld');
    // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='

    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof window['atob'] == 'function') {
    //    return atob(data);
    //}

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = ac = 0, enc="", tmp_arr = [];
    data = utf8_encode(data);

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;

        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch( data.length % 3 ){
        case 1:
            enc = enc.slice(0, -2) + '==';
        break;
        case 2:
            enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
}