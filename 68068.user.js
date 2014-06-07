// ==UserScript==
// @name           TokyotoshoLessIsMore
// @namespace      http://sankakucomplex.com
// @description    Tired of seeing results you're not interested in? (cursed iPod/PSP releases..) Don't need 622 pixels of whitespace before the first result? (yes I measured it). This script will rearange some things and add a configurable blacklist so you can filter out results.
// @include        http*://*tokyotosho.info/*
// @exclude        http*://*tokyotosho.info/settings.php
// @exclude        http*://*tokyotosho.info/rss.php
// @exclude        http*://*tokyotosho.info/rss_customize.php
// @exclude        http*://*tokyotosho.info/new.php
// @exclude        http*://*tokyotosho.info/trac*
// @exclude        http*://*tokyotosho.info/donate.php
// @exclude        http*://*tokyotosho.info/contact.php
// ==/UserScript==

var noHidden = 0;
var inpCheck;
var btnAdd;
var tbWord;
var blacklist = eval( GM_getValue( 'blacklist', '({})' ) );
var divAdvanced;
var divBl;
var logging;

var torrentLinks = document.evaluate(
  "/html/body/div//table[@class='listing']/tbody/tr/td[@class='desc-top']/a",
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);

addLogging();
function addLogging()
{
  logging = document.createElement( 'div' );
  //logging.style.position = 'absolute';
  logging.style.backgroundColor = '#FFFFFF';
  logging.style.border = '2px solid #000000';
  logging.style.width = '99%';
  logging.style.top = '0';
  logging.style.height = '200px';
  logging.style.overflow = 'auto';
  logging.id = 'hiddenResults';
  document.body.appendChild( logging );
}

hide();
function hide()
{
  noHidden = 0;
  var table = document.createElement( 'table' );
  logging.appendChild( table );
  var tr = document.createElement( 'tr' );
  table.appendChild( tr );
  var th1 = document.createElement( 'th' );
  th1.textContent = 'Filtered out links';
  tr.appendChild( th1 );
  var th2 = document.createElement( 'th' );
  tr.appendChild( th2 );
  th2.textContent = 'Matched on';

  for( var i = 0; i < torrentLinks.snapshotLength; i++ )
  {
    var tLink = torrentLinks.snapshotItem( i );
    for( var key in blacklist )
    {
      //Force strings to lowercase if they shouldn't be case sensitive
      var str = blacklist[key] ? tLink.textContent : tLink.textContent.toLowerCase();
      var blacklistedWord = blacklist[key] ? key : key.toLowerCase();

      if(
        str.indexOf( blacklistedWord ) !== -1
        && tLink.parentNode != null //<- prevents error when toggling state 3 times in a a row.
        && tLink.parentNode.parentNode.nextSibling != null
      )
      {
        tLink.parentNode.parentNode.style.display = 'none';
        tLink.parentNode.parentNode.nextSibling.style.display = 'none';

        table.appendChild( getTableRow( tLink, key ) );
        //logging.appendChild( document.createTextNode( "Fitered on: "+ key ) );
        //logging.appendChild( document.createElement( 'br' ) );
        noHidden++;
      }
    }
  }
}
recolorOddEven();

/**
 * @param tLink HTMLElement  Element to insert in the first cell
 * @param str   String       String (keyword that triggered it)
 */
function getTableRow( tLink, str )
{
  var tr = document.createElement( 'tr' );

  //Make found word bold
  var oldContent = tLink.innerHTML;
  var startPos   = oldContent.indexOf( str );

  if( startPos == -1 )
    startPos = oldContent.toLowerCase().indexOf( str );

  tLink.innerHTML = oldContent.substr( 0, startPos );
  tLink.innerHTML += "<b>"+oldContent.substr( startPos, str.length )+"</b>";
  tLink.innerHTML += oldContent.substr( startPos + str.length );
  //Make found word bold

  var td1 = document.createElement( 'td' ) ;
  td1.appendChild( tLink );
  td1.style.width = '99%';
  tr.appendChild( td1 );

  var td2 = document.createElement( 'td' ) ;
  td2.appendChild( document.createTextNode( str ) );
  tr.appendChild( td2 );

  return tr;
}

/**
 * Recolors all the rows by adding the 'shaded' class
 * to all rows at an odd/even interval to the rows that aren't
 * hidden.
 */
function recolorOddEven()
{
  var visibleTableRows = document.evaluate(
    "//html//body//div//form//table[@class='listing']//tbody//tr[not(@style='display: none;')]//td[@class='desc-top']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  //Clear out old classes
  for( var i = 0; i < visibleTableRows.snapshotLength; i++ )
  {
    visibleTableRows.snapshotItem( i ).parentNode.className = "";
    visibleTableRows.snapshotItem( i ).parentNode.nextSibling.className = "";
  }

  //Apply shade class every other 'rowgroup' (i+=2)
  for( var i = 0; i < visibleTableRows.snapshotLength; i += 2 )
  {
    visibleTableRows.snapshotItem( i ).parentNode.className = "shade";
    visibleTableRows.snapshotItem( i ).parentNode.nextSibling.className = "shade";
  }
}

advBlacklist();
function advBlacklist()
{
  divAdvanced = document.createElement( 'div' );
  document.body.insertBefore( divAdvanced, document.getElementById( 'main' ) );
  divAdvanced.id = 'adv';

  //top
  tbWord = document.createElement( 'input' );
  divAdvanced.appendChild( tbWord );

  var lblCase = document.createElement( 'label' );
  lblCase.textContent = 'case sensitive';
  divAdvanced.appendChild( lblCase );
  inpCheck = document.createElement( 'input' );
  inpCheck.type = 'checkbox';
  lblCase.appendChild( inpCheck );

  divAdvanced.appendChild( document.createElement( 'br' ) );

  //left
  var allTags = document.createElement( 'select' );
  allTags.id = 'slct';
  allTags.multiple = 'multiple';
  divAdvanced.appendChild( allTags );

  for( var key in blacklist )
  {
    var option = document.createElement( 'option' );

    var tag = document.createElement( 'span' );
    tag.textContent = key;
    option.appendChild( tag );

    var bool = document.createElement( 'span' );
    bool.textContent = blacklist[key];
    option.appendChild( bool );

    allTags.appendChild( option );
  }

  //Right
  var divRight = document.createElement( 'div' );
  divAdvanced.appendChild( divRight );

  btnAdd = document.createElement( 'button' );
//  btnAdd.setAttribute( "disabled", "disabled" );
  btnAdd.textContent = 'add to blacklist';
  divRight.appendChild( btnAdd );

  var btnRemove = document.createElement( 'button' );
  btnRemove.textContent = 'Remove';
  btnRemove.setAttribute( "disabled", "disabled" );
  divRight.appendChild( btnRemove );

  var btnToggleCase = document.createElement( 'button' );
  btnToggleCase.textContent = 'Toggle Case';
  btnToggleCase.setAttribute( "disabled", "disabled" );
  divRight.appendChild( btnToggleCase );

  var testDiv = document.createElement( 'div' );
  divRight.appendChild( testDiv );


  //This is bugged, when you deselect items they still
  //give .selected back as true!
  allTags.addEventListener( 'change', function( e )
  {
    for (var i = 0; i < allTags.options.length; i++)
      if (allTags.options[ i ].selected)
      {
        btnRemove.removeAttribute( "disabled" );
        btnToggleCase.removeAttribute( "disabled" );
        break;
      }
  }, false );

  btnToggleCase.addEventListener( 'click', function( e )
  {
    for (var i = 0; i < allTags.options.length; i++)
    {
      if (allTags.options[i].selected)
        blacklist[allTags.options[i].getElementsByTagName( "span" )[0].textContent] =
          allTags.options[i].getElementsByTagName( "span" )[1].textContent == "false";
    }
    saveNewBlacklistAndReload();
  }, false );

  btnRemove.addEventListener( 'click', function( e )
  {
    for (var i = 0; i < allTags.options.length; i++)
    {
      if (allTags.options[i].selected)
        delete blacklist[allTags.options[i].getElementsByTagName( "span" )[0].textContent];
    }
    saveNewBlacklistAndReload();
  }, false );

  btnAdd.addEventListener( 'click', function( e )
  {
    if( tbWord.value != "" )
    {
      blacklist[tbWord.value] = inpCheck.checked;
      saveNewBlacklistAndReload();
    }
    else
      alert( "Please enter a word before trying to add it" );
  }, false );

/*  tbWord.addEventListener( 'change', function( e )
  {
    if( tbWord.value.trim() != "" )
      btnAdd.removeAttribute( "disabled" );
    else
      btnAdd.setAttribute( "disabled", "disabled" );
  }, false );*/
}

createBlacklistDiv();
function createBlacklistDiv()
{
  var toolbar = document.createElement( 'div' );
  document.body.insertBefore( toolbar, document.getElementById( 'main' ) );

  //<Right>
  divBl = document.createElement( 'div' );
  divBl.id = 'topRight';
  toolbar.appendChild( divBl );

  var aHiddenResults = document.createElement( 'a' );
  aHiddenResults.href = '#hiddenResults';
  aHiddenResults.textContent = noHidden +' results hidden due to the blacklist ';
  divBl.appendChild( aHiddenResults );

  var advanced = document.createElement( 'a' );
  advanced.id = 'more';
  advanced.textContent = GM_getValue( 'expanded', true ) ? '[ - ]' : '[ + ]';
  document.getElementById( 'adv' ).style.display = GM_getValue( 'expanded', true ) ? 'block' : 'none';
  divBl.appendChild( advanced );
  //</Right>

  advanced.addEventListener( 'click', function( e )
  {
    if( advanced.textContent == '[ - ]' )
    {
      document.getElementById( 'adv' ).style.display = 'none';
      advanced.textContent = '[ + ]';
      GM_setValue( 'expanded', false );
    }
    else
    {
      document.getElementById( 'adv' ).style.display = 'block';
      advanced.textContent = '[ - ]';
      GM_setValue( 'expanded', true );
    }
  }, false );
}

styleIt();
function styleIt()
{
  GM_addStyle(
    "#slct span:first-child { display: table-cell; display: block; width: 200px; }"+
    "#slct span:last-child { display: table-cell; width: 30px; }"+
    "#slct option{ display: table-row; }"+
    "#slct { float: left; max-height: 200px; min-height: 50px; }"+
    "#adv { position: absolute; right: 0; top: 30px; background-color: #fff; border: 2px solid #000; padding: 10px; }"+
    "#adv div:last-child{ float: left; }"+
    "#adv input { width: 245px; }"+ //#slct span first/last child combined width
    "#adv button"+
    "{"+
      "display: block; width: 100px;"+
      "font-size: 12px;"+
      "width: 120px;"+
      "height: 24px;"+
      "padding: 3px 16px 3px;"+
      "-moz-border-radius: 16px;"+
      "border: 2px solid #ccc;"+
      "margin: 1em 0 2em;"+
      "position: relative;"+
      "font-family: Lucida Sans, Helvetica, Verdana, sans-serif;"+
      "font-weight: 800;"+
      "color: #fff;"+
      "text-shadow: rgba(10, 10, 10, 0.5) 1px 2px 2px;"+
      "text-align: center;"+
      "vertical-align: middle;"+
      "white-space: nowrap;"+
      "display: block;"+
      "margin: 0 auto;"+
      "text-decoration: none;"+
      "background-color: rgba(255, 161, 39, 1.0);"+
      "border-top-color:    #c19f8b;"+
      "border-right-color:  #bf7f58;"+
      "border-bottom-color: #ca784f;"+
      "border-left-color:   #a58876;"+
      "-moz-box-shadow: rgba(240, 140, 66, 0.5) 0px 10px 16px;"+
      "margin: 10px 5px;"+
    "}"+
    "#adv button:first-child{ margin-bottom: 30px; }"+
    "#adv button:hover{ text-shadow: rgb(255, 255, 255) 0px 0px 5px; }"+
    "#adv button:active{ background-color: rgba(255, 140, 18, 1.0); }"+
    "#adv button:active:after{ background-color: rgba(255, 255, 255, 0.15); }"+
    "#adv button[disabled='disabled']{ background-color: rgba(90, 90, 90, 1.0); border-color: rgb(90,90,90); -moz-box-shadow: rgba(90, 90, 90, 0.5) 0px 10px 16px; }"+
    "#adv button:after"+
    "{"+
      "content: '';"+
      "position: absolute;"+
      "top: 1px;"+
      "left: -15px;"+
      "-webkit-border-radius: 8px;"+
      "-moz-border-radius: 8px;"+
      "height: 1px;"+
      "width: 97%;"+
      "padding: 8px 0;"+
      "background-color: rgba(255, 255, 255, 0.25);"+
    "}"+
    "#topRight a#more { background: #fff; border: 2px solid #000; padding: 5px 2px; cursor: pointer; font-family: courier, monospace; }"+
    "#topRight a#more:hover { text-decoration: none; }"+
    "#topRight { float: right; }"+

    "h1{ float: left; margin-left: 5px; }"+
    ".centertext{ font-size: 10pt; clear: left; float: left; padding-left: 5px; }"+
    "h2{ float: left; }"+
    "h3{ float: left; clear: left; margin: 5px; }"+
    "p.centertext { display: none; }"+
    ".menuwrapper{ clear: right; }"+
    ".news { clear: both; float: left; display: none; }"+
    ".news li { margin: 2px; padding: 0; }"+
    "#main form:nth-child(8) table{ clear: both; }"+
    ""
  );
}


function saveNewBlacklistAndReload()
{
  GM_setValue( 'blacklist', blacklist.toSource() );
  blacklist = eval( GM_getValue( 'blacklist', '{}' ) );

  //Remove all elements!
  divAdvanced.parentNode.removeChild( divAdvanced );
  divBl.parentNode.removeChild( divBl );
  logging.parentNode.removeChild( logging );

  addLogging();
  hide();
  recolorOddEven();
  advBlacklist();
  createBlacklistDiv();
}