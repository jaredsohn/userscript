// ==UserScript==
// @name           cwCMS acesskeye
// @namespace      http://eldar.cz/myf/pub/firefox/
// @description    …
// @include        http://*/cms2ViewWeb/*
// ==/UserScript==

/*
changelog:
2010-03-31 : trim hodnot v editaci (confirmovaný; už žádné mezezy na konci stringů)
2010-03-18 : publikace: ckick na contentové věci změněné aktuálním uživatelem.
2009-11-25 : accesskeye: vícero úprav, zpět pro edity, pryč pro "new"y (stejně si je nejspíš schováváte)
2009-11-24 : § rolldown menu OFF
2009-11-23 : opraven saveNquit
2009-06-19 : opraven link na preview aktuálně editovaného
2009-06-19 : opraven bug s ukládáním divnejch typů stránek
2009-06-16 : titler překopán na triviální komplexitu : )
2009-06-16 : pokud pouštěné v iframe : return (kvůli CK)
2009-05-11 : zničit codepress , pryč save nepřenačte stránku (už tam asi je nativně)
2007-06-27 : save nepřenačte stránku ^_^
2007-06-21 : do tajtlu při editaci jméno souboru
2007-06-08 : do statusbaru délka hodntoty aktuálního inputu

TOC
 § rolldown menu : OFF
 § codepress : OFF
 § accesskeys : ADD
 § document.title : MAKE more INFORMATIVE

*/


// trim
if( !String.prototype.trim )
{ String.prototype.trim = function()
  { var str = this.replace(/^\s\s*/,''), ws = /\s/, i = str.length
  ; while(ws.test(str.charAt(--i)))
  ; return str.slice(0,i+1)
  }
}


// hlavní klouzůra ZAČÁTEK:
(function(){


if ( window != window.top ) return;
// ^ jsme pravděpodobně v CK iframu nebo něčem obdobnym,takže nemá smysl se spouštět


//
// předvyplnit login (při přístupu z bookmarků)
(function()
{ if( document.location.hash.length < 2 ) return
; var i = document.getElementById('username')
; if( !i ) return
; setTimeout
  ( function()
    { var i = document.getElementById('username')
    ; i.value = document.location.hash.substring(1)
    ; i.focus()
    }
  , 1500
  )
})();



//
// § rolldown menu : OFF
// !! VYPNI POKUD NEPOUŽÍVÁŠ ALTERNATIVU
// (protože jinak ti budou meníčka viset)
//
unsafeWindow.RollDownMenu = function(){ this.Init = function(){} };


//
// § codepress : OFF
(function()
{ if ( 0 || !unsafeWindow.CodePress) return
; unsafeWindow.removeEventListener('DOMContentLoaded',unsafeWindow.CodePress.run,false)
})();


//
// § accesskeys : ADD
//
(function(){
 var allKeys = 'yxsaqwedcvfrgbnhtzjmkuilop'
 ,tmpLink,lnki = -1, tmpClass, tmpHref
 ,rgx_CP = /(toggle|save)CP\(\);?/;
while ( tmpLink = document.links[++lnki] ) {
  if ( !allKeys.length || lnki > 500 ) { break } // došly klávesy nebo to už běží "moc dlouho"
  tmpClass = tmpLink.className;
  tmpHref = tmpLink.href;
  // měl by asi následovat switch, ale od zašátku to byl tenhle monstrózní ifátor, tak to tak nechávám
  if (      tmpClass == 'icoOdejit' )   { setAK('q'); continue }  // quit
  else if ( tmpClass == 'icoUloz' )     { setAK('s');    // save
   /* Ukládací submit na pozadí */
   if
   (  document.location.href.indexOf('edit.do') > -1
   && document.forms[0]
   )
   { tmpLink.href = 'javascript:document.forms[0].submit()'
   ; tmpLink.setAttribute('onclick','')
   ; var targetName = 'cmsFormTargetAddedByMyfsUserscript'
   ; window.newFrame = document.createElement('iframe') // proč mi tu asi funguje prosté window?
   ; newFrame.setAttribute('name',targetName)
   ; newFrame.setAttribute('style','display:none;')
   ; document.body.appendChild(newFrame)
   ; tmpLink.addEventListener('click', function(){document.forms[0].setAttribute('target',targetName)}, false)
   ; tmpLink.addEventListener('blur', function(){document.forms[0].removeAttribute('target')}, false)
   }
   /* */
   // pravděpodobně by tu mělo být po dokončení submitu vyhození iframu z docu, aby to nemátlo ItsAllText (?)
   // ale popravdě zrovna moc nevím, jestli se dá spoléhat na onload tohohle iframu
   // doufejme že má Firefox v tomhle směru dobrej garbage collector : )
  ; continue
  }
  else if ( tmpClass == 'icoUlozJdi' )  { setAK('d');
   if ( rgx_CP.test( tmpLink.getAttribute('onclick') ) )
   { tmpLink.setAttribute('onclick','')
   ; tmpLink.href = 'javascript:document.forms[0].action=document.forms[0].action+"&exit=true";document.forms[0].submit()';
   }
   continue
  }  // saveNquit
  else if ( tmpClass == 'icoUvod' )     { setAK('q'); continue}  // uvod
  else if ( tmpClass == 'icoObsah' )    { setAK('c'); continue}  // content
  else if ( tmpClass == 'icoSablona' )  { setAK('t'); continue}  // templates
  else if ( tmpClass == 'icoTrida' )    { setAK('e'); continue}  // classes
  else if ( tmpClass == 'icoTbl' )      { setAK('p'); continue}  // publikace
  else if ( tmpClass.indexOf('icoNovy') > -1 )
                                        { setAK('w'); continue}  // THE "new button"
  else if ( tmpClass.match('icoAdmin') ){ setAK('a'); continue}  // administrace
  else if ( tmpClass == 'logout' )      { setAK('l'); continue}  // logout
//   else if ( /new\.do/.test(tmpHref) )   { setAK('w'); continue}  // any "new…"
//   else if ( tmpClass == 'edit' )        { setAK(); continue}     // any edit (by class)
//   else if ( /editAtt/.test(tmpHref) )     { setAK(); continue}   // any edit (by URL)
  else if ( tmpLink.innerHTML == '..' ) { setAK('a'); continue}  // go up
  else if ( tmpLink.parentNode.className == 'edit' )
                                        { setAK(); continue}     // any edit (by parents class)
  else if ( tmpClass == 'icoWebPreview' || tmpLink.id =='webpreview' )  { setAK('p');
   var ng = document.getElementsByClassName('objectPath');
   var ngngn = ng[0];
   if ( ngngn )
   { var pth = ngngn.innerHTML
   ; var suff = '.html'
   ; var sffRX = /\.([^\.]{2,4})\s*$/
   ; if ( sffRX.test(pth) ) {suff = '' }
   ; tmpLink.href = tmpLink.href.replace
     ( /index\.html$/
     , ngngn.innerHTML.match(/\/(.*)/)[1] + suff
     )
   ; continue
   }
  }
  else if ( /ico/.test(tmpClass) )      { setAK(); continue}     // any ico
  else if ( tmpHref.match('allowed') )  { setAK(); continue} // ??
  else if ( tmpClass )                  { setAK(); }         // any class
 }

 // číslíčkový accesskeye prvním deseti použitelnejm inputům
 // + FOCUS do prvního!
 function tellLength()
 { var mxl , s = this.value.length
 ; if ( mxl = this.original_maxlength )
   { s += ' /' + mxl
   ; if ( this.value.length > mxl ) s += ' !!!'
   }
 ; window.status = s
 };
 function trimValue()
 { if( /^\s|\s$/.test(this.value) ) if( confirm('Trim?') ) this.value = this.value.trim()
 };
 var focused = false;
 var elm , accki = 0 , mxl;
 for ( var j = 0, fl = document.forms.length; j < fl; j++ ) {
  for ( var i = 0, fel = document.forms[j].elements.length; i < fel; i++ ) {
   elm = document.forms[j].elements[i];
   if ( mxl = elm.getAttribute('maxlength') ) {
    // hotfix, půjde pryč, doufejme
    elm.original_maxlength = mxl
    elm.removeAttribute('maxlength');
    elm.value=elm.getAttribute('value');
   }
   if ( elm.getAttribute('type') == 'text')
   {
    elm.addEventListener('keyup',tellLength,false);
    elm.addEventListener('blur',trimValue,false);
   } else if ( elm.tagName == 'TEXTAREA' )
   {
    elm.setAttribute('wrap','off');
    // tohle je dost strašitedně vypadající hack pro zlozillu
    // : neumí přenastavit wrap takhle snadno : (
    par = elm.parentNode;
    par.removeChild( elm );
    par.appendChild( elm );
   };
   if ( elm.getAttribute('type') != 'hidden'
     && elm.getAttribute('disabled') != 'true'
     && elm.form.id != 'filterform'
     // focus do filteru v contentu mi přišel spíš otravný
     )
   {
    if ( focused == false )
    { if ( elm.getAttribute('type') == 'file' )
      { elm.setAttribute( 'type' , 'text' )
      // další strašidelný hack
      // : mozilla od nějaké trojkové (?) verze z bezpečnostních (?) důvodů
      // ignoruje .focus() zavolaný nad file inputem
      ; elm.focus()
      ; elm.setAttribute( 'type' , 'file' )
      // tohle nechá focus na "textovém" políčku (psát se tam taky nedá, GRRR!)
      // před buttonem "browse", na který se potom dá snadno dotabnout
      // a mezerníkem otevřít fileselectový dialog.
      // Legrační je, že zpět na onen "textový" input se už dotabovat nedá : |
      } else
      { elm.focus()
      }
    ; focused = true
    }
    if ( accki > 9 ) { continue }
    if ( accki == 9 ) { elm.setAttribute('accesskey',0); ++accki; continue }
    elm.setAttribute('accesskey',++accki);
   }
  }
 }

 // ...
 function setAK( key ) {
  if ( !allKeys.length || !tmpLink  ) { return false }
  if ( tmpLink.getAttribute('accesskey') ) {
   var key = tmpLink.getAttribute('accesskey') ;
   // a pokračujeme, aby se následně vyhodil z allKeys coby použitej
  }
  if ( !key ) {
   var key = allKeys.substring(0,1);
   allKeys = allKeys.substring(1);
  }
   else
  {
   if ( allKeys.indexOf(key) == -1 ) {
    // nojo, co dělat když už bude použitej?
    setAK(); // zavoláme se bez keye
    return false // pro jistotu
   } else {
    allKeys = allKeys.replace(key,'');
   }
  }
  tmpLink.setAttribute('accesskey',key);
  return key // kdyby to bylo někdy potřeba třeba vypisovat
 }

 // to je asi vše
})();


//
// § document.title : MAKE more INFORMATIVE
// @todo nezaškodolo by to tu navázat na konkrétní akce v URL a nezkoušet to tak všechno naráz
//
(function ()
{ var t = document.getElementsByTagName('h1')
; var h1 = /* t[0] ? t[0].innerHTML : */ ''
; if( document.getElementsByClassName )
  { var op = document.getElementsByClassName('objectPath')
  ; if ( op && op[0] )
    { document.title = '*) '
      + op[0].innerHTML.match(/[^/]*$/) //  + ' « Edit Content'
    ; var op = document.getElementsByClassName('currentEditLanguage')
    ; if ( op && op[0] ) document.title
      += ' ' + h1 + ' /' + op[0].innerHTML
    ; return
    }
  ; var op = document.getElementsByClassName('crumbNavig')
  ; if ( op && op[0] )
    { var tmptxt = op[0].innerHTML.match(/[^> ]*$/)
    ; if ( /Templates/.test(tmptxt) )
      { document.title = 'T) '
        + 'Templates List'
      ; return
      }
    ; document.title = 'M) '
      + tmptxt  + ' ' + h1 // + ' « Manage'
    ; return
    }
  ; setTimeout
    ( function()
      { var l = document.getElementsByClassName('currentLinkOpen')
      ; if ( l && l[0] ) document.title = 'C) '
        + l[0].innerHTML // + ' « Content List'
      }
    , 1500
    )
  // ^ @todo tohle by bylo lepší udělat přes DOM polling
  // a vůbec se podívat jestli jsme ve výpisu contentu a pak to teprv zkoušet
}
})();


(function()
{ if ( document.location.href.indexOf( 'modules/webmodul/publish/index.do' )  == -1 ) return
; var un = document.getElementsByClassName('username')
; if ( !un || !un.length) return
; un = un[0].innerHTML; if ( !un.length) return
; var cells = document.getElementById('item').getElementsByTagName('td')
; if ( !cells.length ) return
; var i = -1 , cell , tick = false , cnt = 0 , inp
; while ( cell = cells[++i] )
  { if ( tick == true )
    { inp = cell.getElementsByTagName('input')[0]
    ; if(!inp) return
    ; inp.click()
    ; tick = false
    } else if ( cell.innerHTML.indexOf( un ) > -1 )
    { tick = true
    ; ++cnt
    }
  }
// ; alert( cnt )
})()

// hlavní klouzůra KONEC:
})();
// EOF
