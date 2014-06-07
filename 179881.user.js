// ==UserScript==
// @name              Fubar Chat Emoticons Bar
// @description       Adds an emoticon bar to Fubar Shoutbox chat
// @include           http://www.fubar.com/*
// @author            Jens Mueller
// @version           0.0.12
// @license           (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @Website           http://userscripts.org/scripts/show/50826
// ==/UserScript==

var EmoteURL  = "http://fubar.com/imgs/emote/";
var emotesInfo = new Array();

emotesInfo[0] = new Object();
emotesInfo[0]['altText'] = ':)';     emotesInfo[0]['infoText'] = 'Smile';
emotesInfo[0]['pic'] = 'Smile2.gif';

emotesInfo[1] = new Object();
emotesInfo[1]['altText'] = ':-)';    emotesInfo[1]['infoText'] = 'Tentative';
emotesInfo[1]['pic'] = 'Tentative.gif';

emotesInfo[2] = new Object();
emotesInfo[2]['altText'] = '=)';     emotesInfo[2]['infoText'] = 'Biggrin';
emotesInfo[2]['pic'] = 'Biggrin.gif';

emotesInfo[3] = new Object();
emotesInfo[3]['altText'] = ';)';     emotesInfo[3]['infoText'] = 'Winksmile';
emotesInfo[3]['pic'] = '16_winksmile.gif';

emotesInfo[4] = new Object();
emotesInfo[4]['altText'] = ':(';     emotesInfo[4]['infoText'] = 'Frownf';
emotesInfo[4]['pic'] = 'Frown.gif';

emotesInfo[5] = new Object();
emotesInfo[5]['altText'] = ':-(';    emotesInfo[5]['infoText'] = 'Tearful';
emotesInfo[5]['pic'] = 'Tearful.gif';

emotesInfo[6] = new Object();
emotesInfo[6]['altText'] = ':s';     emotesInfo[6]['infoText'] = 'Shy';
emotesInfo[6]['pic'] = 'Shy.gif';

emotesInfo[7] = new Object();
emotesInfo[7]['altText'] = ':-S';    emotesInfo[7]['infoText'] = 'Wink';
emotesInfo[7]['pic'] = 'Wink.gif';

emotesInfo[8] = new Object();
emotesInfo[8]['altText'] = ':-s';    emotesInfo[8]['infoText'] = 'Tentativegrin';
emotesInfo[8]['pic'] = 'Tentativegrin.gif';

emotesInfo[9] = new Object();  
emotesInfo[9]['altText'] = ':-o';    emotesInfo[9]['infoText'] = 'Skeptical';
emotesInfo[9]['pic'] = 'Skeptical.gif';

emotesInfo[10] = new Object();
emotesInfo[10]['altText'] = ':-O';   emotesInfo[10]['infoText'] = 'Hyper';
emotesInfo[10]['pic'] = 'Hyper.gif';

emotesInfo[11] = new Object();
emotesInfo[11]['altText'] = ':O';    emotesInfo[11]['infoText'] = 'Excited';
emotesInfo[11]['pic'] = 'Excited.gif';

emotesInfo[12] = new Object();
emotesInfo[12]['altText'] = ':o';    emotesInfo[12]['infoText'] = 'Surprised';
emotesInfo[12]['pic'] = 'Surprised.gif';

emotesInfo[13] = new Object();
emotesInfo[13]['altText'] = ':p';    emotesInfo[13]['infoText'] = 'Neener';
emotesInfo[13]['pic'] = 'Neener.gif';

emotesInfo[14] = new Object();
emotesInfo[14]['altText'] = ':-p';   emotesInfo[14]['infoText'] = 'Pant';
emotesInfo[14]['pic'] = 'Pant.gif';

emotesInfo[15] = new Object();
emotesInfo[15]['altText'] = ':P';    emotesInfo[15]['infoText'] = 'Slurp';
emotesInfo[15]['pic'] = 'Slurp.gif';

emotesInfo[16] = new Object();
emotesInfo[16]['altText'] = ':-P';  emotesInfo[16]['infoText'] = 'Smitten';
emotesInfo[16]['pic'] = 'Smitten.gif';

emotesInfo[17] = new Object();
emotesInfo[17]['altText'] = '8-P';   emotesInfo[17]['infoText'] = 'Uncertain';
emotesInfo[17]['pic'] = 'Uncertain.gif';

emotesInfo[18] = new Object();
emotesInfo[18]['altText'] = '8-p';   emotesInfo[18]['infoText'] = 'Worried';
emotesInfo[18]['pic'] = 'Worried.gif';

emotesInfo[19] = new Object();
emotesInfo[19]['altText'] = 'X(';    emotesInfo[19]['infoText'] = 'Angry';
emotesInfo[19]['pic'] = 'Angry.gif';

emotesInfo[20] = new Object();
emotesInfo[20]['altText'] = 'X)';    emotesInfo[20]['infoText'] = 'Grin';
emotesInfo[20]['pic'] = 'Grin.gif';

emotesInfo[21] = new Object();
emotesInfo[21]['altText'] = '=D';    emotesInfo[21]['infoText'] = 'Toothysmile';
emotesInfo[21]['pic'] = 'Toothysmile.gif';

emotesInfo[22] = new Object();
emotesInfo[22]['altText'] = ':D';    emotesInfo[22]['infoText'] = 'Manic';
emotesInfo[22]['pic'] = 'Manic.gif';

emotesInfo[23] = new Object();  
emotesInfo[23]['altText'] = ':-D';    emotesInfo[23]['infoText'] = 'Coolgrin';
emotesInfo[23]['pic'] = 'Coolgrin.gif';

emotesInfo[24] = new Object();
emotesInfo[24]['altText'] = ':@';    emotesInfo[24]['infoText'] = 'Devious';
emotesInfo[24]['pic'] = 'Devious.gif';

emotesInfo[25] = new Object();
emotesInfo[25]['altText'] = ':-@';   emotesInfo[25]['infoText'] = 'Angryprofile';
emotesInfo[25]['pic'] = 'Angryprofile.gif';

emotesInfo[26] = new Object();
emotesInfo[26]['altText'] = '^_^';   emotesInfo[26]['infoText'] = 'Foxy';
emotesInfo[26]['pic'] = 'foxy.gif';

emotesInfo[27] = new Object();
emotesInfo[27]['altText'] = '(a)';   emotesInfo[27]['infoText'] = 'Good';
emotesInfo[27]['pic'] = 'good.gif';

emotesInfo[28] = new Object();
emotesInfo[28]['altText'] = '(e)';   emotesInfo[28]['infoText'] = 'Evil';
emotesInfo[28]['pic'] = 'evil.gif';

emotesInfo[29] = new Object();
emotesInfo[29]['altText'] = '(h)';   emotesInfo[29]['infoText'] = 'Heart';
emotesInfo[29]['pic'] = 'heart.gif';

emotesInfo[30] = new Object();
emotesInfo[30]['altText'] = '(bh)';   emotesInfo[30]['infoText'] = 'Heart Broken';
emotesInfo[30]['pic'] = 'heartBroken.gif';

emotesInfo[31] = new Object();
emotesInfo[31]['altText'] = '(al)';  emotesInfo[31]['infoText'] = 'Alien';
emotesInfo[31]['pic'] = 'alien.gif';

emotesInfo[32] = new Object();
emotesInfo[32]['altText'] = '(50)';  emotesInfo[32]['infoText'] = 'Lovestruck';
emotesInfo[32]['pic'] = '1_lovestruck.gif';

emotesInfo[33] = new Object();
emotesInfo[33]['altText'] = '(51)';  emotesInfo[33]['infoText'] = 'Yelling';
emotesInfo[33]['pic'] = '2_yelling.gif';

emotesInfo[34] = new Object();
emotesInfo[34]['altText'] = '(52)';  emotesInfo[34]['infoText'] = 'Grim';
emotesInfo[34]['pic'] = '3_grim.gif';

emotesInfo[35] = new Object();
emotesInfo[35]['altText'] = '(53)';  emotesInfo[35]['infoText'] = 'Eager';
emotesInfo[35]['pic'] = '4_eager.gif';

emotesInfo[36] = new Object();
emotesInfo[36]['altText'] = '(54)';  emotesInfo[36]['infoText'] = 'Amused Devil';
emotesInfo[36]['pic'] = '5_devilAmused.gif';

emotesInfo[37] = new Object();
emotesInfo[37]['altText'] = '(55)';  emotesInfo[37]['infoText'] = 'Pissed Off';
emotesInfo[37]['pic'] = '6_pissedOff.gif';

emotesInfo[38] = new Object();
emotesInfo[38]['altText'] = '(56)';  emotesInfo[38]['infoText'] = 'teehee';
emotesInfo[38]['pic'] = '7_teehee.gif';

emotesInfo[39] = new Object();
emotesInfo[39]['altText'] = '(57)';  emotesInfo[39]['infoText'] = 'Grin';
emotesInfo[39]['pic'] = '9_grin.gif';

emotesInfo[40] = new Object();
emotesInfo[40]['altText'] = '(58)';  emotesInfo[40]['infoText'] = 'Sulking';
emotesInfo[40]['pic'] = '10_sulking.gif';

emotesInfo[41] = new Object();
emotesInfo[41]['altText'] = '(59)';  emotesInfo[41]['infoText'] = 'grrr';
emotesInfo[41]['pic'] = '11_grrr.gif';

emotesInfo[42] = new Object();
emotesInfo[42]['altText'] = '(60)';  emotesInfo[42]['infoText'] = 'Devil';
emotesInfo[42]['pic'] = '12_devil.gif';

emotesInfo[43] = new Object();
emotesInfo[43]['altText'] = '(61)';  emotesInfo[43]['infoText'] = 'Anxious';
emotesInfo[43]['pic'] = '13_anxious.gif';

emotesInfo[44] = new Object();
emotesInfo[44]['altText'] = '(62)';  emotesInfo[44]['infoText'] = 'Crying';
emotesInfo[44]['pic'] = '14_crying.gif';

emotesInfo[45] = new Object();
emotesInfo[45]['altText'] = '(63)';  emotesInfo[45]['infoText'] = 'Uncertain';
emotesInfo[45]['pic'] = '15_uncertain.gif';

emotesInfo[46] = new Object();
emotesInfo[46]['altText'] = '(sk)';  emotesInfo[46]['infoText'] = 'Skull';
emotesInfo[46]['pic'] = 'skull.gif';

emotesInfo[47] = new Object();
emotesInfo[47]['altText'] = '(fu)';  emotesInfo[47]['infoText'] = 'Fu';
emotesInfo[47]['pic'] = 'fu.gif';

emotesInfo[48] = new Object();
emotesInfo[48]['altText'] = '(b)';   emotesInfo[48]['infoText'] = 'Beermug';
emotesInfo[48]['pic'] = 'Beermug.gif';

emotesInfo[49] = new Object();
emotesInfo[49]['altText'] = '(d)';   emotesInfo[49]['infoText'] = 'Martini';
emotesInfo[49]['pic'] = 'Martini.gif';

emotesInfo[50] = new Object();
emotesInfo[50]['altText'] = '(y)';   emotesInfo[50]['infoText'] = 'Thumbs Up';
emotesInfo[50]['pic'] = 'Thumbsup.gif';

emotesInfo[51] = new Object();
emotesInfo[51]['altText'] = '(n)';   emotesInfo[51]['infoText'] = 'Thumbs Down';
emotesInfo[51]['pic'] = 'Thumbsdown.gif';

emotesInfo[52] = new Object();
emotesInfo[52]['altText'] = '(z)';   emotesInfo[52]['infoText'] = 'Bolt';
emotesInfo[52]['pic'] = 'bolt.gif';

emotesInfo[53] = new Object();
emotesInfo[53]['altText'] = '(s)';   emotesInfo[53]['infoText'] = 'Stop!';
emotesInfo[53]['pic'] = 'stop.gif';

emotesInfo[54] = new Object();
emotesInfo[54]['altText'] = '(sa)';  emotesInfo[54]['infoText'] = 'sa';
emotesInfo[54]['pic'] = 'sa.gif';

emotesInfo[55] = new Object();
emotesInfo[55]['altText'] = '(r)';   emotesInfo[55]['infoText'] = 'Rainbow';
emotesInfo[55]['pic'] = 'rainbow.gif';

emotesInfo[56] = new Object();
emotesInfo[56]['altText'] = '(r)';   emotesInfo[56]['infoText'] = 'Coffee';
emotesInfo[56]['pic'] = 'coffee.png';

var fEmotBarDom = document.createElement('div');
fEmotBarDom.setAttribute('style','padding:4px; margin-bottom:15px; background:#inherit; border:solid 1px #eeeeee; position: static;');
fEmotBarDom.setAttribute('id','emote_bar');

var fEmotsListDom = document.createElement('div');
fEmotsListDom.setAttribute('id','EmotsList');
fEmotBarDom.appendChild(fEmotsListDom);

for(i=0;i<emotesInfo.length;i++)
  {
  var emotesURL   = EmoteURL+emotesInfo[i]['pic'];
  var emoteID     = 'emote'+[i];
  var emoteSpacer = ' ';
  var emoteTitle  = emotesInfo[i]['infoText']+emoteSpacer+emotesInfo[i]['altText'];

  var fEmotsDom = document.createElement('img');
  fEmotsDom.setAttribute('src', emotesURL);
  fEmotsDom.setAttribute('alt', emotesInfo[i]['altText']);
  fEmotsDom.setAttribute('title', emoteTitle);
  fEmotsDom.setAttribute('style','cursor: pointer; padding-left:3px; width:17px; height:17px;');
  fEmotsDom.setAttribute('class','emote_img');
  fEmotsDom.setAttribute('id', emoteID);
  fEmotsListDom.appendChild(fEmotsDom);
  }

document.addEventListener("DOMNodeInserted", fInsertedNodeHandler, false);

function fInsertedNodeHandler(event) {

  if(document.getElementsByClassName('enter_data_desc')[0])
  {
  fInsertChatEmotBar(event.target);
  }

  if(document.getElementsByClassName('photo_comment_textarea')[0])
    {
    fInsertPhotoCommentEmotBar(event.target);
    }

  if(document.getElementById('new_lounge_shoutbox_enter_data'))
    {
    fChatToolBox = document.getElementById('new_lounge_shoutbox_enter_data');
    fChatToolBox.setAttribute('style','border:0.15em solid #778899; height:95px!important;');
    fInsertLoungeEmotBar(event.target);
    }
  }

function fInsertChatEmotBar(fChatWrapper) {
  fChatToolBox = document.getElementsByClassName('enter_data_desc')[0];
  fNewEmotBar = fEmotBarDom.cloneNode(true);

  for(i=0;i<fEmotBarDom.firstChild.childNodes.length;i++)
    {
    fEmotBarDom.firstChild.childNodes[i].addEventListener('click', fChatEmotClickHandler, false);
    }

  if(fChatToolBox.childNodes)
    {
    fChatToolBox.insertBefore(fEmotBarDom,fChatToolBox.firstChild);
    }
  else
    {
    fChatToolBox.appendChild(fEmotBarDom);
    }
  }

function fInsertPhotoCommentEmotBar(fCommentWrapper) {
  fCommentToolBox = document.getElementsByClassName('photo_comment_textarea')[0];

  for(i=0;i<fEmotBarDom.firstChild.childNodes.length;i++)
    {
    fEmotBarDom.firstChild.childNodes[i].addEventListener('click', fCommentEmotClickHandler, false);
    }

  if(fCommentToolBox.childNodes)
    {
    fCommentToolBox.insertBefore(fEmotBarDom,fCommentToolBox.firstChild);
    }
  else
    {
    fCommentToolBox.appendChild(fEmotBarDom);
    }
  }

function fInsertLoungeEmotBar(fLoungeWrapper) {
  fChatToolBox = document.getElementById('new_lounge_enter_data_form');

  for(i=0;i<fEmotBarDom.firstChild.childNodes.length;i++)
    {
    fEmotBarDom.firstChild.childNodes[i].addEventListener('click', fLoungeEmotClickHandler, false);
    }

  if(fChatToolBox.childNodes)
    {
    fChatToolBox.insertBefore(fEmotBarDom,fChatToolBox.firstChild);
    }
  else
    {
    fChatToolBox.appendChild(fEmotBarDom);
    }
  }

function fChatEmotClickHandler(event){
  var fChatInput = document.getElementById("shoutbox_msg");
  fChatInput.value += event.target.getAttribute('alt')+' ';
  fChatInput.focus();
  }

function fCommentEmotClickHandler(event){
  var fCommentInput = document.getElementById("comment_box");
  fCommentInput.value += event.target.getAttribute('alt')+' ';
  fCommentInput.focus();
  }

function fLoungeEmotClickHandler(event){
  var fCommentInput = document.getElementsByName("enter_data")[0];
  fCommentInput.value += event.target.getAttribute('alt')+' ';
  fCommentInput.focus();
  }
