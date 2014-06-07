// ==UserScript==
// @id             Go_to_bottom_and_go_to_top_floating_links
// @name           Go to bottom and go to top floating links
// @description    Displays floating links to quickly go to the bottom or to the top of the page. These links appear near the mouse pointer and are only displayed when this is near the side edges of the page.
// @version        4.5
// @author         REVerdi
// @namespace      http://userscripts.org/users/67570
// @copyright      2008+, REVerdi (http://userscripts.org/users/67570)
// @license        (CC) Attribution Non-Commercial No Derivative Works; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include        *
// @exclude        about:*
// @exclude        http*://mail.google.com/*
// @run-at         document-end
// ==/UserScript==

/*
 TEM que ter: // @include  *
e PRECISA de: // @exclude  about:*
não funciona: // @exclude  http?://mail.google.com/*
*/

/*******************************************************************************************/

/* TESTED ONLY ON FIREFOX */

/*
This is just a draft to substitute partly the RichScrollbar extension for Firefox (there is no longer in https://addons.mozilla.org/en-US/firefox/addon/1180).
Sorry, but I'm not a programmer, at least for now :).
Please, let me know the fixes and improvements made to this script.
*/

/*
KNOWN BUGS:
> In Gmail, the divs are saved in e-mails. [UNSOLVED - workaround: http?://mail.google.com/* were excluded]
> It doesn't work on the results page of Google search, because window.scrollMaxY is equal to zero immediately after loading the page. [workaround v3.1 2010-nov-15]
> It doesn't work on Orkut, because /Main# causes window.scrollMaxY is always equal to zero. [solved v4.3 2012-aug-26]
> It works in very small frames. [workaround v4.1 2011-mar-15]
> When the zoom is not 100%, the divs are not displayed on the far right and/or occurs overlaps with the scrollbar. [solved v4.3 2012-aug-26]
> The divs are not displayed on the far right on some pages. Exs.:
  http://alexsexton.com/                                 [solved v4.3 2012-aug-26]
  http://maujor.com/tutorial/fonttut.php                 [solved v4.3 2012-aug-26]
  http://www.w3schools.com/cssref/pr_font_font-size.asp  [UNSOLVED]
*/

/*
TO DO (someday, in the distant future, very far away):
> Clean and optimize the source code.
> Smoother motion for divs.
> Appearance of the divs from the looks of the page.
> Configurable options.
> Make this script into a Firefox extension.
*/

/*
SORRY FOR MY ENGLISH.
SORRY FOR THE COMMENTS.
SORRY FOR THE APOLOGIES.
*/

/*******************************************************************************************/

(function() {

/********************************************************************************************
 * DEBUG adicionado na v4.5
 */

//um objeto TEM que ter todas as suas propriedades inicializadas
var debug = {
  active          : 0, //0 = inativo / 1 = ativo
  winResizeCount  : 0,
  initCount       : 0,
  mainCount       : 0,
  showDivsCount   : 0,
  hideDivsCount   : 0,
  addEventsCount  : 0,
  delEventsCount  : 0,
  mouseMovCount   : 0,
  scrollMovCount  : 0,
  moveDivsCount   : 0,
  createDivsCount : 0,
  div            : null,
  divText        : null
};

function debugCreateDiv() {
  debug.div                  = window.document.createElement('div');
  debug.div.innerHTML        = "<a id='debug_div'></a>";
  debug.div.style.position   = 'fixed';
  debug.div.style.left       = '0';
  debug.div.style.bottom     = 0;           //'50%';
  debug.div.style.zIndex     = '1000';
  debug.div.style.visibility = 'visible';
  debug.div.style.color      = 'black';     //white / yellow
  debug.div.style.background = 'lightblue'; //red / lightgray
  debug.div.style.textAlign  = 'left';
  debug.div.style.fontSize   = 'xx-small';  //xx-small / x-small / small
  debug.div.style.padding    = '4px';
  debug.div.style.fontFamily = 'courier new';
  debug.div.style.lineHeight = 1;           //1.5
  debug.div.style.width      = 'auto';      //'50%'; //'180px';
  debugUpdateDiv();
  document.body.appendChild(debug.div);
}

function debugUpdateDiv() {
  //COM CARACTERES ALT+255
  debug.divText = '<br>';
  debug.divText = debug.divText + '       init() running count = ' + debug.initCount       + ' <br><br>';
  debug.divText = debug.divText + '       main() running count = ' + debug.mainCount       + ' <br><br>';
  debug.divText = debug.divText + '   showDivs() running count = ' + debug.showDivsCount   + ' <br>';
  debug.divText = debug.divText + '  addEvents() running count = ' + debug.addEventsCount  + ' <br>';
  debug.divText = debug.divText + ' createDivs() running count = ' + debug.createDivsCount + ' <br><br>';
  debug.divText = debug.divText + '   hideDivs() running count = ' + debug.hideDivsCount   + ' <br>';
  debug.divText = debug.divText + '  delEvents() running count = ' + debug.delEventsCount  + ' <br><br>';
  debug.divText = debug.divText + '   mouseMov() running count = ' + debug.mouseMovCount   + ' <br>';
  debug.divText = debug.divText + '  scrollMov() running count = ' + debug.scrollMovCount  + ' <br>';
  debug.divText = debug.divText + '   moveDivs() running count = ' + debug.moveDivsCount   + ' <br><br>';
  debug.divText = debug.divText + '      window resizing count = ' + debug.winResizeCount  + ' <br><br>';
//debug.divText = debug.divText + ' ' + content.location.href + ' <br><br>';
  debug.div.innerHTML = debug.divText;
}

/*******************************************************************************************/

var floatingDivs = 0;
var floatingDivToTop;    //ou header, head, roof
var floatingDivToBottom; //ou footer, foot, base
var parentElement;       //adicionada na v4.4

function createDivs() {
  if ( debug.active ) { debug.createDivsCount++; debugUpdateDiv(); } //GM_log('createDivs() running count = ' + debug.createDivsCount); }

  const to_bottom_char = '\u02c5';  //\u2304 ou \u2228 ou \u02c5
  const to_top_char    = '\u02c4';  //\u2303 ou \u2227 ou \u02c4

  floatingDivs = 1;

  floatingDivToTop                  = window.document.createElement('div');
//floatingDivToTop                  =        document.createElement('div');
//window.blur() falha quando há mais de uma janela aberta
//floatingDivToTop.innerHTML        = "<a id='to_top_div' style='background:#CEE3F8;color:#336699;text-decoration:none;font-size:small;font-family:verdana' href='#'                   onClick='javascript:window.scrollTo(0,0);window.blur();return false'>" + to_top_char + '</a>';
//floatingDivToTop.innerHTML        = "<a id='to_top_div' style='background:#CEE3F8;color:#336699;text-decoration:none;font-size:small;font-family:verdana' href='javascript:void(0);' onClick='javascript:window.scrollTo(0,0);window.blur();return false'>" + to_top_char + '</a>';
  floatingDivToTop.innerHTML        = "<a id='to_top_div' style='background:#CEE3F8;color:#336699;text-decoration:none;font-size:small;font-family:verdana'                            onClick='javascript:window.scrollTo(0,0);              return false'>" + to_top_char + '</a>';
  floatingDivToTop.style.cursor     = 'pointer';
  floatingDivToTop.style.position   = 'absolute'; //com 'fixed' eu tenho que mudar a fórmula de posicionamento da div
//floatingDivToTop.style.right      = '0';        //comentado na v4.2
  floatingDivToTop.style.zIndex     = '1000';
  //Oculta a div:
//floatingDivToTop.style.top        = 'none';
  floatingDivToTop.style.visibility = 'hidden';
//document.body.appendChild(floatingDivToTop);                            // comentado na v4.3
//document.getElementsByTagName('html')[0].appendChild(floatingDivToTop); //adicionado na v4.3 e comentado na v4.4
  parentElement.appendChild(floatingDivToTop);                            //adicionado na v4.4

//document.styleSheets[0].insertRule("#to_top_div:not(:hover) {opacity:0.7 !important;}",0);                                       //funciona no UOL, mas não no iG nem no Terra (?!)
//document.styleSheets[0].insertRule("#to_top_div:not(:hover) {opacity:0.7 !important;}",document.styleSheets[0].cssRules.lenght); //funciona no UOL, mas não no iG nem no Terra (?!)
//alert( document.styleSheets[0].cssRules.lenght );                                                                                //é undefinied no UOL e não funciona no iG nem no Terra
  
  floatingDivToBottom                  = window.document.createElement('div');
//floatingDivToBottom                  =        document.createElement('div');
//window.blur() falha quando há mais de uma janela aberta
//floatingDivToBottom.innerHTML        = "<a id='to_bottom_div' style='background:#CEE3F8;color:#336699;text-decoration:none;font-size:small;font-family:verdana' href='#'                   onClick='javascript:window.scrollTo(0,window.innerHeight+window.scrollMaxY);window.blur();return false'>" + to_bottom_char + '</a>';
//floatingDivToBottom.innerHTML        = "<a id='to_bottom_div' style='background:#CEE3F8;color:#336699;text-decoration:none;font-size:small;font-family:verdana' href='javascript:void(0);' onClick='javascript:window.scrollTo(0,window.innerHeight+window.scrollMaxY);window.blur();return false'>" + to_bottom_char + '</a>';
  floatingDivToBottom.innerHTML        = "<a id='to_bottom_div' style='background:#CEE3F8;color:#336699;text-decoration:none;font-size:small;font-family:verdana'                            onClick='javascript:window.scrollTo(0,window.innerHeight+window.scrollMaxY);              return false'>" + to_bottom_char + '</a>';
  floatingDivToBottom.style.cursor     = 'pointer';
  floatingDivToBottom.style.position   = 'absolute'; //com 'fixed' eu tenho que mudar a fórmula de posicionamento da div
//floatingDivToBottom.style.right      = '0';        //comentado na v4.2
  floatingDivToBottom.style.zIndex     = '1000';
  //Oculta a div:
//floatingDivToBottom.style.top        = 'none';
  floatingDivToBottom.style.visibility = 'hidden';
//document.body.appendChild(floatingDivToBottom);                            // comentado na v4.2
//document.getElementsByTagName('html')[0].appendChild(floatingDivToBottom); //adicionado na v4.3 e comentado na v4.4
  parentElement.appendChild(floatingDivToBottom);                            //adicionado na v4.4

//document.styleSheets[0].insertRule("#to_bottom_div:not(:hover) {opacity:0.7 !important;}",0);                                       //funciona no UOL, mas não no iG nem no Terra (?!)
//document.styleSheets[0].insertRule("#to_bottom_div:not(:hover) {opacity:0.7 !important;}",document.styleSheets[0].cssRules.lenght); //funciona no UOL, mas não no iG nem no Terra (?!)
//alert( document.styleSheets[0].cssRules.lenght );                                                                                   //é undefinied no UOL e não funciona no iG nem no Terra
}

/*******************************************************************************************/

/*
Os corretos:
dimensões visíveis da página:
    document.documentElement.clientWidth
    document.documentElement.clientHeight
posição do mouse nas partes visíveis da página:
    evt.pageX - window.pageXOffset
    evt.pageY - window.pageYOffset
*/

var mousePosX = 0; //posição do mouse em relação à area de exibição da página
var mousePosY = 0; //posição do mouse em relação à area de exibição da página
var viewWidth;     //largura da área de exibição da página
var viewHeight;    // altura da área de exibição da página
var _pageXOffset = 0;
var _pageYOffset = 0;
var _scrollMaxY;

var divsAreVisible  = 0;
var lastMousePosY   = 0;
var lastPageYOffset = 0;

function moveDivs() {
  if ( debug.active ) { debug.moveDivsCount++; debugUpdateDiv(); } //GM_log('moveDivs() running count = ' + debug.moveDivsCount); }

//viewWidth = window.innerWidth;                    // comentado na v4.3
  viewWidth = document.documentElement.clientWidth; //adicionado na v4.3
  _pageXOffset = window.pageXOffset;

//if   ( mousePosX > ( viewWidth + _pageXOffset ) - 64 ) {                     //64=4*16  // comentado na v4.2
  if ( ( mousePosX > ( viewWidth + _pageXOffset ) - 64 ) || ( mousePosX < 64 ) ) {        //adicionado na v4.2
    if ( mousePosX > ( viewWidth + _pageXOffset ) - 64 ) {                                //adicionado na v4.2
      floatingDivToTop.style.left          = null;
      floatingDivToBottom.style.left       = null;
      floatingDivToTop.style.right         = '0';
      floatingDivToBottom.style.right      = '0';
    }
    else {
      floatingDivToTop.style.left          = '0';
      floatingDivToBottom.style.left       = '0';
      floatingDivToTop.style.right         = null;
      floatingDivToBottom.style.right      = null;
    }
  //viewHeight = window.innerHeight;                    // comentado na v4.3
    viewHeight = document.documentElement.clientHeight; //adicionado na v4.3
    _pageYOffset = window.pageYOffset;
    _scrollMaxY  = window.scrollMaxY;
    if ( _pageYOffset != lastPageYOffset && ( _pageYOffset == 0 || _pageYOffset >= _scrollMaxY ) ) { divsAreVisible = 0; }
  //if ( Math.abs( mousePosY - lastMousePosY ) > 20 ) {                        //20=16+4
    if ( Math.abs( mousePosY - lastMousePosY ) > 20 || divsAreVisible == 0 ) { //20=16+4
      if ( mousePosY > 8 && mousePosY < ( viewHeight + _pageYOffset ) - 8 ) {  // 8=16/2
        //Move as divs:
        floatingDivToTop.style.top    = ( mousePosY - 16 ) + 'px';
        floatingDivToBottom.style.top =   mousePosY        + 'px';
        //Exibe ou oculta as divs:
        if ( _pageYOffset == 0 ) {
          floatingDivToTop.style.visibility    = 'hidden' ; //floatingDivToTop.style.top    = 'none' ;
          floatingDivToBottom.style.visibility = 'visible'; //floatingDivToBottom.style.top = 'block';
        }
        else if ( _pageYOffset >= _scrollMaxY - 16 ) {
          floatingDivToTop.style.visibility    = 'visible'; //floatingDivToTop.style.top    = 'block';
          floatingDivToBottom.style.visibility = 'hidden' ; //floatingDivToBottom.style.top = 'none' ;
        }
        else {
          floatingDivToTop.style.visibility    = 'visible'; //floatingDivToTop.style.top    = 'block';
          floatingDivToBottom.style.visibility = 'visible'; //floatingDivToBottom.style.top = 'block';
        }
        divsAreVisible = 1;
      }
      lastMousePosY   = mousePosY;
      lastPageYOffset = _pageYOffset;
    }
  }
  else {
    if ( divsAreVisible == 1 ) {
      floatingDivToTop.style.visibility    = 'hidden'; //floatingDivToTop.style.top    = 'none';
      floatingDivToBottom.style.visibility = 'hidden'; //floatingDivToBottom.style.top = 'none';
      divsAreVisible = 0;
    }
  }
}

/*******************************************************************************************/

//essas funções devem ser separadas porque o tratamento para translado e scroll é diferente e para aumentar a
//performance, já que numa única função teria que haver um if() para determinar qual foi o movimento do mouse

function mouseMov(evt) {
  if ( debug.active ) { debug.mouseMovCount++; debugUpdateDiv(); } //GM_log('mouseMov() running count = ' + debug.mouseMovCount); }
  mousePosX = evt.pageX;
  mousePosY = evt.pageY;
  moveDivs();
}

function scrollMov(evt) {
  if ( debug.active ) { debug.scrollMovCount++; debugUpdateDiv(); } //GM_log('scrollMov() running count = ' + debug.scrollMovCount); }
  mousePosX = mousePosX + ( window.pageXOffset - _pageXOffset );    //para corrigir o scroll
  mousePosY = mousePosY + ( window.pageYOffset - _pageYOffset );    //para corrigir o scroll
  moveDivs();
}

/*******************************************************************************************/

var events = 0;

function addEvents() {
  if ( debug.active ) { debug.addEventsCount++; debugUpdateDiv(); } //GM_log('addEvents() running count = ' + debug.addEventsCount); }
  if ( !events ) {
    document.addEventListener('mousemove',  mouseMov, false);
  //document.addEventListener('mouseover',  mouseMov, false); //comentado na v4.5
    document.addEventListener(   'scroll', scrollMov, false);
    events = 1;
  }
}

function delEvents() {
  if ( debug.active ) { debug.delEventsCount++; debugUpdateDiv(); } //GM_log('delEvents() running count = ' + debug.delEventsCount); }
  if ( events ) {
    document.removeEventListener('mousemove',  mouseMov, false);
  //document.removeEventListener('mouseover',  mouseMov, false); //comentado na v4.5
    document.removeEventListener(   'scroll', scrollMov, false);
    events = 0;
  }
}

/*******************************************************************************************/

function showDivs() {
  if ( debug.active ) { debug.showDivsCount++; debugUpdateDiv(); } //GM_log('showDivs() running count = ' + debug.showDivsCount); }
  if ( !floatingDivs ) createDivs();
}

function hideDivs() {
  if ( debug.active ) { debug.hideDivsCount++; debugUpdateDiv(); } //GM_log('hideDivs() running count = ' + debug.hideDivsCount); }
  if ( floatingDivs ) {
    floatingDivToTop.style.visibility    = 'hidden';
    floatingDivToBottom.style.visibility = 'hidden';
  }
}

/*******************************************************************************************/

function main() {
  if ( debug.active ) { debug.mainCount++; debugUpdateDiv(); } //GM_log('main() running count = ' + debug.mainCount); }
//if ( window.scrollMaxY ) {
//if ( window.scrollMaxY > ( 0.1 * window.innerHeight ) ) {                    //paliativo para evitar que esse script funcione em frames pequenos
  if ( window.scrollMaxY > ( 0.1 * document.documentElement.clientHeight ) ) { //modificado na v4.4
     showDivs();
    addEvents();
    //if ( intervalID ) clearInterval( intervalID );
  }
  else {
     hideDivs();
    delEvents();
    //if ( !intervalID ) intervalID = setInterval( main, 1000 );               //CONGELA O FIREFOX (testado na v4.5)
  }
}

/*******************************************************************************************/

//adicionada na v4.5 apenas para contar quantas vezes a janela é redimensionada
function winResize() {
  if ( debug.active ) { debug.winResizeCount++; debugUpdateDiv(); } //GM_log('window resizing count = ' + debug.winResizeCount); }
  main();
}

/*******************************************************************************************/

//var intervalID = 0; //tornada global na v4.5 para usar clearInterval() em main()

function init() {
  if ( debug.active ) { if ( !debug.div ) debugCreateDiv(); debug.initCount++; debugUpdateDiv(); } //GM_log('init() running count = ' + debug.initCount); }

//var intervalID = 0;                                                                  // comentada na v4.5
  var  timeoutID = 0;                                                                  //adicionada na v4.5

  parentElement = document.getElementsByTagName('html');
  if( parentElement[0] != null ) {                                                     //dessa forma o script só será executado se parentElement existir
    parentElement = parentElement[0];
  //window.addEventListener('resize', main, false);                                    //na v4.5 me dei conta que esse evento NUNCA é removido
    window.addEventListener('resize', winResize, false);                               //modificado na v4.5 apenas para depuração
  //if ( window.scrollMaxY ) main();
  //if ( window.scrollMaxY > ( 0.1 * window.innerHeight ) ) main();                    //paliativo para evitar que esse script funcione em frames pequenos
    if ( window.scrollMaxY > ( 0.1 * document.documentElement.clientHeight ) ) main(); //modificado na v4.4
    else {
    //intervalID = setInterval( main, 1000 );                                          //paliativo para resolver o bug na página de buscas do Google / 1000 ms = 1s
       timeoutID = setTimeout ( main, 1000 );                                          //modificado na v4.5
    //if ( !intervalID ) intervalID = setInterval( init, 1000 );                       //CONGELA O FIREFOX (testado na v4.5)
    }
  }
}

init(); //ponto de entrada

})();