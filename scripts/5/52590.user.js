// ==UserScript==
// @name           AwesumFAQs Scripplement
// @author         Awesumness (GFAQS:Poo Poo Butter)
// @Notes          Enjoy.
// @include        http://www.gamefaqs.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://js-hotkeys.googlecode.com/files/jquery.hotkeys-0.7.9.min.js
// ==/UserScript==

var faviconLink = null;
var quickerPostShortcut = null;
var stampit = null;


// ##########################################
// ##############   READ ME!   ##############
// ##########################################
// THIS SCRIPT DOES NOTHING BY DEFAUT!
// Protip: Decomment means delete "//" at the beginning of a line.

// Decomment the next line if you would like to use a custom image for the GameFAQs favicon. (You can use your own link, too!)
//faviconLink = "http://dl.dropbox.com/u/386823/GameFAQs/Gfavicon.png";

// Decomment the next line if you would like to use a shortcut to display/hide QuickerPost. The small cake in the bottom right of the QuickerPost box means the box is static. Requires GameFOX.
//quickerPostShortcut = 'alt+q';

// Decomment the next line if you would like an inaccurate timestamp on your posts. Will replace ××:××:×× with the current time. requires GameFOX.
//stampit = true;


if( faviconLink ){
  var link = document.createElement("link");
  link.rel = "icon";
  link.href = faviconLink;
  document.childNodes[1].childNodes[0].appendChild(link);
}

var isHidden = false;
if( quickerPostShortcut ){
  $(document).bind('keydown', quickerPostShortcut, toggleQuickerPost );
}

if( stampit ){
  $('#gamefox-quickpost-btn').mousedown( stampMessage );
}




function toggleQuickerPost() {
  if( isHidden ){
    $('#gamefox-quickpost-normal').css({'padding':'',
                                        'border-width':'',
                                        '-moz-border-radius':'',
                                        'background-image':''});
    $('#gamefox-quickpost-normal form > *').not('#gamefox-message').css({'display':''});
    $('#gamefox-quickpost-normal #gamefox-message').css({'width':'',
                                                         'height':'',
                                                         'border':''});
  }else{
    $('#gamefox-quickpost-normal').css({'padding':'0',
                                        'border-width':'0',
                                        '-moz-border-radius':'0',
                                        'background-image':'url("http:\/\/dl.dropbox.com/u/386823/GameFAQs/cake.png")'});
    $('#gamefox-quickpost-normal form > *').not('#gamefox-message').css({'display':'inline-block'});
    $('#gamefox-quickpost-normal #gamefox-message').css({'width':'100%',
                                                         'height':'12em',
                                                         'border':'1px solid currentColor'});
  }
  isHidden = !isHidden;
};

function stampMessage(){
  postMessage = document.getElementsByTagName('textarea')[0];
  var d = new Date();
  var currtime = [d.getHours(), d.getMinutes(), d.getSeconds()];
  if(currtime[0] < 10){currtime[0] = "0" + currtime[0]}
  if(currtime[1] < 10){currtime[1] = "0" + currtime[1]}
  if(currtime[2] < 10){currtime[2] = "0" + currtime[2]}
  var displayTime = currtime[0] + ":" + currtime[1] + ":" + currtime[2];
  postMessage.value = postMessage.value.replace("××:××:××",displayTime);
}



