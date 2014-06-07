// ==UserScript==
// @name            Nuttengame-Shortcutmenu v2.2.1
// @namespace       http://sassers.de && http://germanenland-clan.de
// @description     Dieses Script stellt frei definierbare Shortcuts im Nuttenspiel da. Wählbar als Menü oder Leiste
// @include         http://www.nuttenspiel.com/index.php
// @include         http://www.nuttenspiel.com/*
// @include         http://*.nuttenspiel.com/*
// @exclude         http://forum.nuttenspiel.com/*
// @exclude         http://www.nuttenspiel.com/pms.php* 
// @exclude         http://www.nuttenspiel.com/description.php*
// @exclude         http://www.nuttenspiel.com/index.php?action=logout*
// ==/UserScript==



//****************************************************************************//
//                      ==/EINSTELLUNGEN ANFANG/==                            //
//****************************************************************************//
// ==/MenüDesign/==
// 1 => Leiste
// 2 => Grafisches Menü
var menudesign = '1';
  
// ==/Scrollen/==
// 1 => Ja
// 0 => Nein
var scrollen = '1';

//------------------------------------------------------------------------------
//                    ==/Einstellungen der Leiste!/==
//                    (Nicht beim Grafischem Menü)
//                              Anfang
//------------------------------------------------------------------------------
// ==/Hintergrund der Menüleiste/==
// 1 => Transparent
// 2 => Farbe
// 3 => Bild
var leistebg = '3';                   

 
// ==/Hintergrundfarbe der Menüleiste/==
var leiste_farbe = '#000';

// ==/Linkfarbe/==
var linkcol =  '#ffccff';

// ==/Rahmen/==
// 1 => Ja
// 0 => Nein
var border = '1';

// ==/Rahmenfarbe/==
var rahmencol = '#5F5D5A';

//------------------------------------------------------------------------------
//                    ==/Einstellungen der Leiste!/==
//                              Ende
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//                        ==/Links Einstellungen/==
//                  Die Links können frei angepasst werden!
//------------------------------------------------------------------------------

// ==/Hier bitte die ID deiner gang eingeben/==
var gangid = 'XXXX';    


// ==/Hier kannst du die links definieren/==
link1 = 'gym.php';                    //standart: gym.php
linkname1 = 'Kampfsport-Schule';      //standart: Kampfsport-Schule

link2 = 'wellness.php';               //standart: wellness.php
linkname2 = 'Wellness';               //standart: Wellness

link3 = 'house.php';                  //standart: house.php
linkname3 = 'Wohnung';                //standart: Wohnung

link4 = 'store.php';                  //standart: store.php
linkname4 = 'Waffenladen';            //standart: Waffenladen

link5 = 'bstore.php';                 //standart: bstore.php
linkname5 = 'Boutique';               //standart: Boutique

link6 = 'pharmacy.php';               //standart: pharmacy.php
linkname6 = 'Drogerie';               //standart: Drogerie

link7 = 'jail.php';                   //standart: jail.php
linkname7 = 'Gefängnis';              //standart: Gefängnis

link8 = 'slots.php';                  //standart: slots.php
linkname8 = 'Einarmiger Bandit';      //standart: Einarmiger Bandit

link9 = 'search.php';                 //standart: search.php
linkname9 = 'Nuttensuche';            //standart: Nuttensuche

link10 = 'spylog.php';                //standart: spylog.php
linkname10 = 'Spionagelog';           //standart: Spionagelog


//****************************************************************************//
//                        ==/EINSTELLUNGEN ENDE/==                            //
//****************************************************************************//
//                                                                            //
//                                                                            //
//                                                                            //
//                                                                            //
//                                                                            //
//                                                                            //
//                                                                            //
//                                                                            //
//****************************************************************************//
//                                                                            //
//                                                                            //
//       ==/Nichts ändern wenn du nicht weisst, was du tust!!/==              //
//                                                                            //
//                                                                            //
//****************************************************************************//

shortcut();
function shortcut(){
var body_1 = document.getElementsByTagName('body')[0];
var newtags = document.createElement('div');
newtags.setAttribute('id', 'shortcut');
body_1.appendChild(newtags);
          
          
          
  if(menudesign == 1)
  {
    var linkstyle = ' style="text-decoration: none;color:'+linkcol+';font-weight:bold; width:138px;" ';
    var spacer = '&nbsp;<img src="http://www.nuttenspiel.com/images/screen/nav_pfeil_zu.gif">&nbsp;';

    if(leistebg == 0)
     {
      var leistebg_1 = ' background-color:transparent ';
     }
    if(leistebg == 2)
     {
      var leistebg_1 = ' background-color:'+leiste_farbe+' ';
     }
    if(leistebg == 3)
     {
      var leistebg_1 = ' background-image:url(http://www.nuttenspiel.com/images/screen/hg_nav_inside.jpg) ';
     }
    if(scrollen == 1)
    {
      var scroll = 'fixed';
    }
    if(scrollen == 0)
    {
      var scroll = 'absolute';
    }
  document.getElementById('shortcut').innerHTML = '<center><div style="left:5%;width:90%; height:10px; padding:10px;  position:'+scroll+'; top:0px; border: '+border+'px solid '+rahmencol+'; '+leistebg_1+'; ">'+spacer+'<a '+linkstyle+' href="'+link1+'">'+linkname1+'</a>'+spacer+'<a '+linkstyle+' href="'+link2+'">'+linkname2+'</a>'+spacer+'<a '+linkstyle+' href="'+link3+'">'+linkname3+'</a>'+spacer+'<a '+linkstyle+' href="'+link4+'">'+linkname4+'</a>'+spacer+'<a '+linkstyle+' href="'+link5+'">'+linkname5+'</a>'+spacer+'<a '+linkstyle+' href="'+link6+'">'+linkname6+'</a>'+spacer+'<a '+linkstyle+' href="'+link7+'">'+linkname7+'</a>'+spacer+'<a '+linkstyle+' href="'+link8+'">'+linkname8+'</a>'+spacer+'<a '+linkstyle+' href="'+link9+'">'+linkname9+'</a>'+spacer+'<a '+linkstyle+' href="'+link10+'">'+linkname10+'</a>'+spacer+'<a '+linkstyle+' href="viewgang.php?id='+gangid+'">Meine Gang</a>'+spacer+'<a '+linkstyle+' href="chat.php">Chat</a>'+spacer+'<a '+linkstyle+' href="http://forum.nuttenspiel.com/">Forum</a></div></center>';
  }



  if(menudesign == 2)
  {
    if(scrollen == 1)
    {
      var scroll = 'fixed';
    }
    if(scrollen == 0)
    {
      var scroll = 'absolute';
    }
    var begin = '<ul style="margin-left:0px; padding-left:20px; padding-top:0px; padding-bottom:20px; font-size:12px; color:#ffccff; list-style-image:url(http://www.nuttenspiel.com/images/screen/nav_pfeil_zu.gif);"><li>';
    var linkstyle = ' style="text-decoration: none;color:#ffccff;font-weight:bold; width:138px;display: block; padding: 5px;background: url(http://www.nuttenspiel.com/images/screen/navline.gif) no-repeat center bottom;" ';
    var spacer = '</li><li>';
    var end = '</li></ul>';
  
  document.getElementById('shortcut').innerHTML = '<div style="width:202px; height:49px; top:0px;  position:'+scroll+'; "><img src="http://www.nuttenspiel.com/images/screen/hg_menue_hl.jpg"></div><div style="left:0px;width:202px; height:370px; padding:0px;  position:'+scroll+'; top:49px; background-image:url(http://www.nuttenspiel.com/images/screen/hg_navs.jpg);"></div><div style="left:9px;width:184px; height:370px; padding:0px;  position:'+scroll+'; top:50px; background-image:url(http://www.nuttenspiel.com/images/screen/hg_nav_inside.jpg);"><br>'+begin+'<a '+linkstyle+' href="'+link1+'">'+linkname1+'</a>'+spacer+'<a '+linkstyle+' href="'+link2+'">'+linkname2+'</a>'+spacer+'<a '+linkstyle+' href="'+link3+'">'+linkname3+'</a>'+spacer+'<a '+linkstyle+' href="'+link4+'">'+linkname4+'</a>'+spacer+'<a '+linkstyle+' href="'+link5+'">'+linkname5+'</a>'+spacer+'<a '+linkstyle+' href="'+link6+'">'+linkname6+'</a>'+spacer+'<a '+linkstyle+' href="'+link7+'">'+linkname7+'</a>'+spacer+'<a '+linkstyle+' href="'+link8+'">'+linkname8+'</a>'+spacer+'<a '+linkstyle+' href="'+link9+'">'+linkname9+'</a>'+spacer+'<a '+linkstyle+' href="'+link10+'">'+linkname10+'</a>'+end+''+begin+'<a '+linkstyle+' href="viewgang.php?id='+gangid+'">Meine Gang</a>'+spacer+'<a '+linkstyle+' href="chat.php">Chat</a>'+spacer+'<a '+linkstyle+' href="http://forum.nuttenspiel.com/">Forum</a>'+end+'</div><div style="width:202px; height:36px; top:420px;  position:'+scroll+';"><img src="http://www.nuttenspiel.com/images/screen/hg_menue_fo.jpg"></div>';
  }
}