// ==UserScript==
// @name           Readable juridat.be & ejustice.just.fgov.be v1.1 (2008-05-10)
// @namespace      naja.nitewinds.org
// @description    Make the legislation on juridat.be and ejustice.just.fgov.be readable
// @include        http://www.ejustice.just.fgov.be/wet/wet.htm*
// @include        http://www.ejustice.just.fgov.be/loi/loi.htm*
// @include        http://www.ejustice.just.fgov.be/loi2.htm
// @include        http://www.ejustice.just.fgov.be/wet2.htm
// @include        http://www.ejustice.just.fgov.be/wetgeving.pl*
// @include        http://www.ejustice.just.fgov.be/legislation.pl*
// @include        http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl*
// ==/UserScript==

console =
{ 
  log : function (s) { unsafeWindow.console.log( s ); },
  info : function (s) { unsafeWindow.console.info( s ); },
  warn : function (s) { unsafeWindow.console.warn( s ); },
  error : function (s) { unsafeWindow.console.error( s ); }
};

var topNLstr =
{
search    : "zoeken",
results   : "zoekresultaten",
text      : "tekst",
info      : "Inhoud en termijn van update",
infoLink  : "http://www.ejustice.just.fgov.be/loi/inhoud2.htm"
}

var topFRstr =
{
search    : "chercher",
results   : "liste des resultats",
text      : "texte",
info      : "Contenu et délai de consolidation",
infoLink  : "http://www.ejustice.just.fgov.be/loi/contenu2.htm"
}


// the main page with the search frame

if( document.location.href.match( /http:\/\/www\.ejustice\.just\.fgov\.be\/(wet\/wet|loi\/loi)\.htm/ ) )
{
  var docLang    = ( RegExp.$1 == "wet/wet" ) ? "NL" : "FR",      //because the next statement clears the RegExp object
      topLangstr = ( docLang == "NL" )? topNLstr : topFRstr,
      newDoc = document.createDocumentFragment(),
      newHead = document.createElement( "head" ),
      newBody = document.createElement( "body" ),
      arrowBack   = "data:image/gif;base64,R0lGODlhFAAUAKIAABMsTvz%2B%2FVRsi4ubrsjW4qSxwrvG09jh6CH5BAAAAAAALAAAAAAUABQAAANxGLrc7seUac5jZIjNxSBXwQEkyRWOKJSsKaALsbVmuYGKRgPCwXqKw6w1UPx6AcPqZ1i0BE3Rz%2BL8oaQmx7OIJRUZT5TySQ08m8IlC3ak6mjF3zcgU%2F9sApxCtXPBGCp2PBt%2FDRkdHB8XCxEFAwUVDgkAOw%3D%3D",
      arrowForw   = "data:image/gif;base64,R0lGODlhFAAUAKIAAP3%2B%2FQ8oS4%2BdsDNMbWF3leLs8czX4Ky6ySH5BAAAAAAALAAAAAAUABQAAAN7CLrc3sUcIY4pb5VDuu8H5hgCMQxBGpyEYEAlqs5DKypxKs9ruxgmVWWnqr0ApZkAYCCmfAUBcYnjDQSRoJBx2NWy04ahSAArGU1yIRqu0rBIwrkg5%2FmY2oDL2TvGZSc8PVQKdHlWHTcKJCZELC4PGx8fIRmFEhQWigoJADs%3D";
      
  newHead.innerHTML = '<script language="javascript">function myGetElementsByClassName( classN ){var oResult = document.evaluate("//*[@class=\'" + classN + "\']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null ); if ( oResult != null ){var oElem,arry = []; while( oElem = oResult.iterateNext() ) arry.push(oElem); return arry;}} function toggleDivs( id ){myGetElementsByClassName(\'mainFrameDivs\').forEach(function(val,i, arr){arr[i].style.display=\'none\'});document.getElementById(id).style.display=\'block\';}</script><script language="javascript" id="scriptTag">\
\
function toggleTables( tableId, linkId, linkArr )\
{\
  var table = document.getElementById( tableId );\
  table.style.display = ( table.style.display == "block" )? "none" : "block";\
\
  if( linkId )\
  {\
    var aLink = document.getElementById( linkId );\
    aLink.innerHTML = ( aLink.innerHTML == linkArr[0])? linkArr[1] : linkArr[0];\
    aLink.blur();\
  }\
}\
function swapDivs( theDiv )\
{\
  document.getElementById( "searchDiv" ).style.display = document.getElementById( "resultsDiv" ).style.display = document.getElementById( "textDiv" ).style.display = document.getElementById( "infoDiv" ).style.display = document.getElementById( "navDivList" ).style.display = document.getElementById( "navDivText" ).style.display = "none";\
  theDiv.style.display = "block";\
  document.getElementById( "searchTab" ).style.fontWeight = document.getElementById( "resultsTab" ).style.fontWeight = document.getElementById( "textTab" ).style.fontWeight = document.getElementById( "infoTab" ).style.fontWeight = "normal";\
  document.getElementById( theDiv.id.replace( /Div/, "Tab" ) ).style.fontWeight = "bold";\
}\
\
function FirstHit(){}\
function LastHit(){}\
function PrvHit(){}\
function NxtHit(){}\
</script>';
      
  newBody.innerHTML = '<div id="topDiv"><div id="tabDiv"><span id="searchTab" class="navTabs"><a onclick=\'blur();\' href="javascript:swapDivs( document.getElementById(\'searchDiv\') );">' + topLangstr.search + '</a></span> - <span id="resultsTab" class="navTabs"><a onclick=\'blur();\' href="javascript:swapDivs( document.getElementById(\'resultsDiv\') );document.getElementById(\'navDivList\').style.display = \'block\';void(0);" >' + topLangstr.results + '</a></span> - <span id="textTab" class="navTabs"><a onclick=\'blur();\' href="javascript:swapDivs( document.getElementById(\'textDiv\') );document.getElementById(\'navDivText\').style.display = \'block\';void(0);">' + topLangstr.text + '</a></span> - <span id="infoTab" class="navTabs"><a onclick=\'blur();\' href="' + topLangstr.infoLink + '" target="hiddenFrame">' + topLangstr.info + '</a></span></div><div id="navDivText"><img src="' + arrowBack + '" id="textArrBack" /><img src="' + arrowForw + '" id="textArrForw" /></div><div id="navDivList"><img src="' + arrowBack + '" id="listArrBack" /><img src="' + arrowForw + '" id="listArrForw" /></div></div><hr /><div id="searchDiv" class="mainFrameDivs"></div><div id="resultsDiv" class="mainFrameDivs"></div><div id="textDiv" class="mainFrameDivs"></div><div id="infoDiv" class="mainFrameDivs"></div><iframe name="hiddenFrame" id="hiddenFrame"></iframe>';
      
  newDoc.appendChild( newHead );
  newDoc.appendChild( newBody );

  document.documentElement.innerHTML = "";
  document.documentElement.appendChild( newDoc );
  
  var topDiv      = document.getElementById( "topDiv" ),
      navDivList  = document.getElementById( "navDivList" ),
      navDivText  = document.getElementById( "navDivText" ),
      searchDiv   = document.getElementById( "searchDiv" ),
      resultsDiv  = document.getElementById( "resultsDiv" ),
      textDiv     = document.getElementById( "textDiv" ),
      infoDiv     = document.getElementById( "infoDiv" ),
      hiddenFrame = document.getElementById( "hiddenFrame" );

  function processLoad()
  {
    var hidFrame = unsafeWindow.hiddenFrame,
        href     = hidFrame.location.href,
        doc      = hidFrame.document;
    
    function swapDivs( theDiv )
    {
      searchDiv.style.display = resultsDiv.style.display = textDiv.style.display = infoDiv.style.display = navDivList.style.display = navDivText.style.display = "none";
      theDiv.style.display = "block";
      
      document.getElementById( "searchTab" ).style.fontWeight = document.getElementById( "resultsTab" ).style.fontWeight = document.getElementById( "textTab" ).style.fontWeight = document.getElementById( "infoTab" ).style.fontWeight = "normal";
      document.getElementById( theDiv.id.replace( /Div/, "Tab" ) ).style.fontWeight = "bold";
    }

  //If we loaded a law text
  
    if( hidFrame.Body && hidFrame.Body.document.location.href.match( /http:\/\/www\.ejustice\.just\.fgov\.be\/cgi_loi\/loi_a1\.pl/ ) )
    {
      textDiv.scrollTop = 0;
      
      textDiv.innerHTML = hidFrame.Body.document.body.innerHTML;

      if( hidFrame.Foot )
      {
        var row = $xPath1( "//tr[1]", hidFrame.Foot.document );
        row.deleteCell(0); row.deleteCell(0);

        var allForms = hidFrame.Foot.document.forms,
            formNum  = allForms.length;
          
        for( var i = formNum-1; i >= 0; --i )
        {
          allForms[i].setAttribute( "target", "hiddenFrame" );
          
          if(    ( prentje = $xPath1( "//input[@src='/img_l/vorige_tekst.gif']", allForms[i] ) )
              || ( prentje = $xPath1( "//input[@src='/img_l/txt_prec.gif']", allForms[i] ) )
            )
            prentje.src = arrowBack;
            
          else if(    ( prentje = $xPath1( "//input[@src='/img_l/volgende_tekst.gif']", allForms[i] ) )
                   || ( prentje = $xPath1( "//input[@src='/img_l/txt_suiv.gif']", allForms[i] ) )
                 )
            prentje.src = arrowForw;
        }
        navDivText.innerHTML = hidFrame.Foot.document.body.innerHTML;
      }
      
      swapDivs( textDiv );
      navDivText.style.display = "block";

    } //end of law text

  //If we loaded a list with results
  
    else if( hidFrame.loi_l1 )
    {
      var allForms = hidFrame.loi_l1.document.forms,
          formNum  = allForms.length;
          
      for( var i = formNum-1; i >= 0; --i )
        allForms[i].setAttribute( "target", "hiddenFrame" );
  
      resultsDiv.innerHTML = hidFrame.loi_l1.document.body.innerHTML;

      swapDivs( resultsDiv );
      navDivList.style.display = "block";
      
      if( hidFrame.loi_l2 )
      {
        var row = $xPath1( "//tr[1]", hidFrame.loi_l2.document );
        row.deleteCell(2);

        var allForms = hidFrame.loi_l2.document.forms,
            formNum  = allForms.length;
          
        for( var i = formNum-1; i >= 0; --i )
        {
          allForms[i].setAttribute( "target", "hiddenFrame" );
          
          if(    ( prentje = $xPath1( "//input[@src='/img_l/vorige_pg.gif']", allForms[i] ) )
              || ( prentje = $xPath1( "//input[@src='/img_l/pg_prec.gif']", allForms[i] ) )
            )
             prentje.src = arrowBack;
            
          else if(    ( prentje = $xPath1( "//input[@src='/img_l/volgende_pg.gif']", allForms[i] ) )
                   || ( prentje = $xPath1( "//input[@src='/img_l/pg_suiv.gif']", allForms[i] ) )
                 )
            prentje.src = arrowForw;
        }
        navDivList.innerHTML = hidFrame.loi_l2.document.body.innerHTML;
      }
    } // end of list
    
  //if we loaded information.
  
    else if(    hidFrame.document && hidFrame.document.location.href.match( /http:\/\/www\.ejustice\.just\.fgov\.be\/loi\/contenu2\.htm/ ) 
             || hidFrame.document && hidFrame.document.location.href.match( /http:\/\/www\.ejustice\.just\.fgov\.be\/loi\/inhoud2\.htm/ ) 
           )
    {

      infoDiv.innerHTML = doc.body.innerHTML;

      swapDivs( infoDiv );
    }
    

   // if i remember correct, this is when the search returns only the number of results, not the list.
    else if( 
                doc.forms[0] 
             && doc.forms[0].action.match( /loi_rech.pl/ )
           )
    {
      doc.forms[0].setAttribute( "target", "hiddenFrame" );   
      searchDiv.innerHTML = doc.body.innerHTML;
      
      swapDivs( searchDiv );
    }
  } // end of processLoad()
  
  hiddenFrame.addEventListener( "load", processLoad, false );
  hiddenFrame.src = ( docLang == "NL" )? "http://www.ejustice.just.fgov.be/wet/wet2.htm" : "http://www.ejustice.just.fgov.be/loi/loi2.htm";
  
}


//The actual article, if people link directly to it

if( document.location.href.match( /http:\/\/www\.ejustice\.just\.fgov\.be\/cgi_loi\/loi_a1.pl/ ) ) parsePage( document );

function parsePage( XMLDoc )
{

var NLstr   =
{

//maintables
preambule : "Aanhef",
modif     : "Wijzigingen",
content   : "Inhoud",
text      : "Tekst",
rapport   : "Verslag aan de koning",
workOn    : "Parlemetaire Werkzaamheden",

//toptable
raadVan   : "Raad van State",

//textTable
showOrig  : "Toon origineel",
hideOrig  : "Verberg origineel"

},

FRstr   =
{

//maintables
preambule : "Préambule",
modif     : "Modification(s)",
content   : "Table des matières",
text      : "Texte",
rapport   : "Rapport au roi",
workOn    : "Travaux parlementaires",

//toptable
raadVan   : "Conseil d'Etat",

//textTable
showOrig  : "Montrez l&rsquo;originel",
hideOrig  : "Cachez l&rsquo;origineel"


},
    newXMLDoc = XMLDoc.createDocumentFragment(),
    newHead   = XMLDoc.createElement( "head" ),
    newBody   = XMLDoc.createElement( "body" ),
    topTable = topBodyDiv = titleDiv = modDiv = modBodyDiv = workOnByDiv = workOnByTable = preambuleDiv = preambuleTable = royalReportTable = royalReportDiv = tocTable = tocDiv =  textTable = textDiv = 0,
    docLang,
    otherLang,
    langStr;
    //indexNum = 0; //This will be the index number to search for modifications
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////  

if( topTable = $xPath1( '//a[@name="top"]/following-sibling::table[1]' ) )
{
  var topHeadDiv = XMLDoc.createElement( "div" ),
      raadLink   = langLink = archLink = decreeLink = raadHref = langHref = archHref = decreeHref = "";
      
  if( raadHref   = $xPath1( './/a[contains( @href, "http://www.raadvst-consetat.be" )]/@href' , topTable ) ) raadHref = raadHref.value;
  if( raadHref.match( /mbid=([^&]+)/ ) ) indexNum = RegExp.$1;
  if( langHref   = $xPath1( '//a[contains(@href, "change_lg.pl")]/@href' , topTable ) ) langHref = langHref.value;
  if( decreeHref = $xPath1( '//tr[3]/td[4]//a/@href' , topTable ) ) decreeHref = decreeHref.value;
  if( archHref   = $xPath1( '//tr[3]/td[5]//a/@href' , topTable ) ) archHref = archHref.value;

  if( archHref   && archHref.match  ( /change_lg\.pl/ ) ) archHref   = ""; // for some peculiar reason i can't find out, it matches the translator link if the cell is empty...???
  if( decreeHref && decreeHref.match( /change_lg\.pl/ ) ) decreeHref = "";

  decreeText = $xPathGetText( '//tr[3]/td[4]//a/b/text()' , topTable );
  archText   = $xPathGetText( '//tr[3]/td[5]//a/b/text()' , topTable );  

  if( langHref.match( /language=fr/ ) )
       {
         docLang = "NL";
         otherLang = "FR";
         langStr = NLstr;
         delete FRstr;
       }  

  else if( langHref.match( /language=nl/ ) )
       {
         docLang = "FR";
         otherLang = "NL";
         langStr = FRstr;
         delete NLstr;

       }

  else throw new Error( "Unable to determine language of page! langHref = " + langHref );
  
//build the text for our links
  if( langHref   ) langLink = "/<a target=\"hiddenFrame\" href=\"" + langHref.replace( /"/g, "'" ) + "\">" + otherLang + "</a>";
  if( raadHref   ) raadLink = "<a class=\"topLinks\" href=\"" + raadHref.replace( /"/g, "'" ) + "\" target=\"_blank\">" + langStr.raadVan + "</a>";
  if( archHref   ) archLink = "<a class=\"topLinks\" href=\"" + archHref.replace( /"/g, "'" ) + "\" target=\"_blank\">" + archText + "</a>";
  if( decreeHref ) decreeLink = "<a class=\"topLinks\" href=\"" + decreeHref.replace( /"/g, "'" ) + "\" target=\"_blank\">" + decreeText + "</a>";

  topHeadDiv.innerHTML = raadLink + archLink + decreeLink + "<span id='langLinks'><b>" + docLang + "</b>" + langLink + "</span>&nbsp;";
  topHeadDiv.setAttribute( "id", "topHeaderDiv" );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

if( titleTable     = $xPath1( '//a[@name="titre"]/following-sibling::table[1]' )  )
{
  var titleCell      = $xPath1( './/tr[3]/th', titleTable ),
      titleDiv       = XMLDoc.createElement( "div" ),
      lines          = titleCell.innerHTML.split( "<br>" ),
      titleTextP     = XMLDoc.createElement( "p" ),
      titleText      = cleanHTML( lines.shift() ),
      titleInfo      = XMLDoc.createElement( "table" ),
      titleInfoTBody = XMLDoc.createElement( "tbody" );
      
  titleTextP.innerHTML = titleText;
  titleTextP.setAttribute  ( "id", "titleTextP" );  

  titleDiv.appendChild( titleTextP );
      
  while( lines[0] )
  {
    if( cleanHTML( lines[0] ).match( /^<font color="Red"> <b> (.*?): .*?<\/font> (.*)$/i ) )
    {
      var row    = titleInfoTBody.insertRow( -1 ),
          cell1  = row.insertCell( -1 ),
          cell1a = row.insertCell( -1 ),
          cell2  = row.insertCell( -1 );
      
      cell1.innerHTML  = RegExp.$1;
      cell1a.innerHTML = ": ";
      cell2.innerHTML  = RegExp.$2;

      cell1.setAttribute  ( "class", "titleInfoCell1" );
      cell1a.setAttribute ( "class", "titleInfoCell1" );
      cell2.setAttribute  ( "class", "titleInfoCell2" );      
      lines.shift();
      
      delete row, cell1, cell1a, cell2;
    }
    
    else
    {
      if( cleanHTML( lines[0] ) )
      {
        var myP = XMLDoc.createElement( "p" );
        myP.innerHTML = cleanHTML( lines[0] );
        titleDiv.appendChild( myP );
        delete myP;
      }
      lines.shift();
    }
  }
  
  titleInfo.appendChild( titleInfoTBody );
  titleDiv.appendChild( titleInfo );
  titleDiv.innerHTML += "<hr />";

  titleInfo.setAttribute( "class", "titleInfoTable" );  
  titleDiv.setAttribute ( "id", "titleTable" );
  titleDiv.setAttribute ( "class", "mainTables" );
  
  delete titleCell, lines, titleTextP, titleInfo, titleInfoTBody; 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Get the modTable

if( modTable = $xPath1( '//a[@name="modification"]/following-sibling::table[1]' ) )
{
  modTable.firstChild.deleteRow( 0 );  
  modTable.innerHTML = cleanHTML( modTable.innerHTML );
  modTable.innerHTML = modTable.innerHTML.replace( /<(\/?)th.*?>/gi, "<$1td>" );

  var expandText =" + ";
 
//Create containers

  modDiv      = XMLDoc.createElement( "div" );
  modBodyDiv  = XMLDoc.createElement( "div" );

  modBodyDiv.setAttribute( "id", "modTable" );
  modBodyDiv.setAttribute( "class", "mainTables" );
  modDiv.setAttribute( "id", "modTableHeaderDiv" );
  modDiv.setAttribute( "class", "HeaderDivs" );


  modDiv.innerHTML = "<div id='modTableHeaderLinkDiv'><a class='headerLINKS' id='modTableHeaderLink' href='javascript:toggleTables( \"modTable\", \"modTableHeaderLink\", [\" + \",\" - \"] );'>" + expandText + "</a> " +  "<a class='headerLINKStext' href='javascript:toggleTables( \"modTable\", \"modTableHeaderLink\", [\" + \",\" - \"] );' onclick=\'blur();\'>" + langStr.modif + "</a></div>&nbsp;";

  modTable.innerHTML = modTable.innerHTML.replace( /target= ?['"]?.*?(['"]| )/gi , "target=\"_blank\"" );
  modTable.setAttribute( "id", "realModTable" );
  

  modBodyDiv.appendChild( modTable );
   
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
if( workOnByTable   = $xPath1( '//a[@name="travauxpar"]/following-sibling::table[1]' ) )
{
  workOnByDiv = XMLDoc.createElement( "div" );

  workOnByDiv.innerHTML = "<a class='headerLINKS' id='workOnByTableHeaderLink' href='javascript:toggleTables( \"workOnByTable\", \"workOnByTableHeaderLink\", [\" + \",\" - \"] );'> + </a> " + "<a class='headerLINKStext' href='javascript:toggleTables( \"workOnByTable\", \"workOnByTableHeaderLink\", [\" + \",\" - \"] );' onclick=\'blur();\'>" + langStr.workOn + "</a>";
  workOnByDiv.setAttribute( "id", "workOnByTableHeaderDiv" );
  workOnByDiv.setAttribute( "class", "HeaderDivs" );

  var workOnByCell = $xPath1( './/tr[2]/th', workOnByTable ),
      content      = cleanHTML( workOnByCell.innerHTML );

  workOnByTable = XMLDoc.createElement( "div" );
  
  workOnByTable.setAttribute  ( "id", "workOnByTable" );
  workOnByTable.setAttribute  ( "class", "mainTables" );
  
  workOnByTable.innerHTML = cleanHTML( content );
} // end of workOnByTable IF

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if( preambuleTable = $xPath1( '//a[@name="preambule"]/following-sibling::table[1]' ) )
{
  preambuleDiv = XMLDoc.createElement( "div" );
  
  preambuleDiv.innerHTML = "<a class='headerLINKS' id='preambuleTableHeaderLink' href='javascript:toggleTables( \"preambuleTable\", \"preambuleTableHeaderLink\", [\" + \",\" - \"] );'> + </a> " + "<a class='headerLINKStext' href='javascript:toggleTables( \"preambuleTable\", \"preambuleTableHeaderLink\", [\" + \",\" - \"] );' onclick=\'blur();\'>" + langStr.preambule + "</a>";
  preambuleDiv.setAttribute( "id", "preambuleTableHeaderDiv" );
  preambuleDiv.setAttribute( "class", "HeaderDivs" );

  var allpreambuleCell = $xPath1( './/tr[2]/th', preambuleTable ),
      content          = cleanHTML( allpreambuleCell.innerHTML );

  preambuleTable = XMLDoc.createElement( "div" );
  
  preambuleTable.setAttribute ( "id", "preambuleTable" );
  preambuleTable.setAttribute ( "class", "mainTables" );

  
//Split per paragraph
  preambuleTable.appendChild( parseArticle( tokenizeArticle( [ content ], "<br>&nbsp;&nbsp;&nbsp;" ).content, "preambule" ) );

} // end of preambuleTable IF

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if( royalReportTable = $xPath1( '//a[@name="rapportroi"]/following-sibling::table[1]' ) )
{
  royalReportDiv = XMLDoc.createElement( "div" );
  
  royalReportDiv.innerHTML = "<a class='headerLINKS' id='royalReportTableHeaderLink' href='javascript:toggleTables( \"royalReportTable\", \"royalReportTableHeaderLink\", [\" + \",\" - \"] );'> + </a> " + "<a class='headerLINKStext' href='javascript:toggleTables( \"royalReportTable\", \"royalReportTableHeaderLink\", [\" + \",\" - \"] );' onclick=\'blur();\'>" + langStr.rapport + "</a>";
  royalReportDiv.setAttribute( "id", "royalReportTableHeaderDiv" );
  royalReportDiv.setAttribute( "class", "HeaderDivs" );
  
  var allroyalReportCell = $xPath1( './/tr[2]/th', royalReportTable ),
      content            = cleanHTML( allroyalReportCell.innerHTML );

  royalReportTable = XMLDoc.createElement( "div" );
  
  royalReportTable.setAttribute       ( "id", "royalReportTable" );
  royalReportTable.setAttribute       ( "class", "mainTables" );

  
//Split per paragraph
  royalReportTable.appendChild( parseArticle( tokenizeArticle( [ content ], "<br>&nbsp;&nbsp;&nbsp;" ).content, "royalReport" ) );

} // end of royalReportTable IF

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if( tocTable = $xPath1( '//a[@name="tablematiere"]/following-sibling::table[1]' ) )
{
  tocDiv = XMLDoc.createElement( "div" );
  
  tocDiv.innerHTML = "<a class='headerLINKS' id='tocTableHeaderLink' href='javascript:toggleTables( \"tocTable\", \"tocTableHeaderLink\", [\" + \",\" - \"] );'> - </a> " + "<a class='headerLINKStext' href='javascript:toggleTables( \"tocTable\", \"tocTableHeaderLink\", [\" + \",\" - \"] );' onclick=\'blur();\'>" + langStr.content + "</a>";
  tocDiv.setAttribute( "id", "tocTableHeaderDiv" );
  tocDiv.setAttribute( "class", "HeaderDivs" );

  tocTable.innerHTML = cleanHTML( tocTable.innerHTML );
  
//Split by articles and chapter titles

  var allTocCell        = $xPath1( './/tr[2]/th', tocTable ),
      textSplitContent  = allTocCell.innerHTML.split( /<br>/gi );
  
  
  tocTable = XMLDoc.createElement( "div" );
  tocTable.setAttribute( "id", "tocTable" );
  tocTable.setAttribute( "class", "mainTables" );
  tocTable.style.display = "block";
  
//Process each line
  for( var i = 0, j = textSplitContent.length; i < j; ++i )
  {
    tocTable.appendChild( processTocLine( textSplitContent[i], i ) );
  }     
} // end of tocTable IF
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if( textTable = $xPath1( '//a[@name="texte"]/following-sibling::table[1]' ) )
{
  textDiv = XMLDoc.createElement( "div" );
  
  textDiv.innerHTML = "<a class='headerLINKS' id='textTableHeaderLink' href='javascript:toggleTables( \"textTable\", \"textTableHeaderLink\", [\" + \",\" - \"] );'> - </a> " + "<a class='headerLINKStext' href='javascript:toggleTables( \"textTable\", \"textTableHeaderLink\", [\" + \",\" - \"] );' onclick=\'blur();\'>" + langStr.text + "</a>";
  textDiv.setAttribute( "id", "textTableHeaderDiv" );
  textDiv.setAttribute( "class", "HeaderDivs" );

  var allTextCell = $xPath1( './/tr[2]/th', textTable );
  
  textTable = parseTextTable( tokenizeBlock( allTextCell.innerHTML, "<br><br>&nbsp;&nbsp;", "<br>&nbsp;&nbsp;" ) );
  textTable.setAttribute( "id", "textTable" );
  textTable.setAttribute( "class", "mainTables" );
  textTable.style.display = "block";
} // end of textTable IF
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

newHead.innerHTML = "<title>" + titleText.replace( /<\/?b>/, "" ) + '</title><script language="javascript" id="scriptTag">\
\
function toggleTables( tableId, linkId, linkArr )\
{\
  var table = document.getElementById( tableId );\
  table.style.display = ( table.style.display == "block" )? "none" : "block";\
\
  if( linkId )\
  {\
    var aLink = document.getElementById( linkId );\
    aLink.innerHTML = ( aLink.innerHTML == linkArr[0])? linkArr[1] : linkArr[0];\
    aLink.blur();\
  }\
}\
\
function FirstHit(){}\
function LastHit(){}\
function PrvHit(){}\
function NxtHit(){}\
</script>';


if( titleDiv         ) newBody.appendChild( titleDiv );
if( topHeadDiv       ) newBody.appendChild( topHeadDiv );
if( modDiv           ) newBody.appendChild( modDiv );
if( modBodyDiv       ) newBody.appendChild( modBodyDiv );
if( workOnByDiv      ) newBody.appendChild( workOnByDiv );
if( workOnByTable    ) newBody.appendChild( workOnByTable );
if( preambuleDiv     ) newBody.appendChild( preambuleDiv );
if( preambuleTable   ) newBody.appendChild( preambuleTable );
if( royalReportDiv   ) newBody.appendChild( royalReportDiv );
if( royalReportTable ) newBody.appendChild( royalReportTable );
if( tocDiv           ) newBody.appendChild( tocDiv );
if( tocTable         ) newBody.appendChild( tocTable );
if( textDiv          ) newBody.appendChild( textDiv );
if( textTable        ) newBody.appendChild( textTable );
  
newXMLDoc.appendChild( newHead );
newXMLDoc.appendChild( newBody );

XMLDoc.documentElement.innerHTML = "";
XMLDoc.documentElement.appendChild( newXMLDoc );



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Parser
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// textTable = ( Article | ChapterTitle ), { BRBR, ( ChapterTitle | Article ) };

function parseTextTable( tokenStreams )
{
  
      var j     = tokenStreams.length,
      i         = -1,
      oFragment = XMLDoc.createDocumentFragment(),
      appIt     = oFragment.appendChild,
      newDiv    = XMLDoc.createElement( "div" );
      
  while( ++i < j )
  {
    switch( tokenStreams[0].blockType )
    {
      case "ChapterTitle" : oFragment.appendChild( parseChapterTitle( tokenStreams.shift().content, i ) );
                            break;
                            
      case "Article"      : //For the optional article title
                            if( tokenStreams[0].content[0].tokType == "ArtTitle" )
                            {
                              var nameLink   = XMLDoc.createElement( "a" ),
                                  headDiv    = XMLDoc.createElement( "div" ),
                                  origDiv    = XMLDoc.createElement( "div" ),
                                  backLink   = ( tokenStreams[0].content[0].prev_link ) ? "<a href=\"" +
                                                 tokenStreams[0].content[0].prev_link.replace( /"/g, "'" ) + "\"><img class=\"ArtArrImg\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAYAAADk3wSdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8BJREFUeNq0VVtoHFUYnjMzZ85cdmZvyW6y2Wxa3JJKg7RUCwoKqYhF4qV4aaEPgg9F8FXRXtQ8CKV99UGEgj741GDFWBH7kFLUVh%2BMGjdat022Jk02aTK7Zmf2Mnf%2FE5MyyYPtBj3wceacOXz%2F93%2FnP%2BcgZq1dOP0C7%2FtB3PN9DyFkPHf8vMO00YIguPPNrvVosVrvshzvNY5lT8I4cv69gxyzxUZJEUBe1Ov7JMIfSSfVV5NR%2BRUBc31bJaakPCDdsNwnIhJJdyVUvjcdO9URVQYxz1HFaCukhGNRtlwxMxLBEhF4rCkiznRqZzMd2jeyiOPtElOVAlicQAxKwgaxEIABxQzm2ACU7hIJ%2F9uCbhyFdaPtkFIVgtGw%2FYZluxBAYIFYkQnCmENAnBIF%2FPkPH76sV43mwIHXzy3cS%2FrrRcE4buDT0lgvD4HnGLACdcTkINcVj%2Fd1x%2Bcvv3%2Fk3dFTz%2FN3U8rwHOvlUhq1kqeyHdfzm5YL6bOrQT0%2FaEEYMxaRNCi5dwjm3%2F7yzItDLcv5GqoEplhvVVU4%2FaQmSXXLsTSFcD4I1VeaLp2XRMws%2FVW3LnxXnCnOVIrFWf3byz%2FPXPro2FAqoRK9YrTEzpjsPP3WSBC8sVEpbtouBuIohEQWyLz66y09m9Lk%2B7IJtTMqy3v7uyMjl37Xf7mxKKbi8u43Pxgbz6bUG4N7cvbY%2BEywOX1a3DFIv3%2FokfyTEJWM%2FfjnzbNf%2FDTl%2BR67oyehiWBsQpPInny6CqovTpaWp2sNWy%2Fr9drVyXm3ML20Sjo8PHyHlFrYB648dWDf9kOQvn%2BlMDcxt2SwmY5I%2Fugzu%2FOHHx%2FIqTIR4E5wF3XjYqlcHamarRLEqgo8a4Kn5YMnPmuFzz5VGoWJnpsLNbNQWr5SNVrjUALmSt1SirMVTpEEf0dvQoUjTBSJbI9GpMGoQvZHRGE%2FEbgB2%2FGvvzTYf%2Fv%2Bxw5vIGVXN9gPbgH5JHxPA2rUb0hTLpSWGII5L59NACfGcBgkVRaTWkTsgY3s9Tz%2Fe9v1%2Ftj56KEgTEp3egVQBuiAOsAENGjAetNRJqZuo6m5yorjeSacPEsWeQ7SZkHltfll49yzxz6d3expuA9CYwWwDfAg4AEojG6oWymTVOWHB3rUh3ZmHLNpj07NVT%2F5%2BKuJhbCn%2F3ZR0H8SIAPIA3KALkAnkAuaTEoIMWPgf6FSazXulXT9P6b3Ld1QQHKNmAajd8B1QIVa2A5peF04AO3tNf%2Fdf16T9kk3B9jwPG1%2Bo1B48F81lvkf2t8CDAA0c4TyUrf%2FvQAAAABJRU5ErkJggg%3D%3D\" /></a>" : "",
                                  forwLink   = ( tokenStreams[0].content[0].next_link ) ? "<a href=\"" +
                                                 tokenStreams[0].content[0].next_link.replace( /"/g, "'" ) + "\"><img class=\"ArtArrImg\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAYAAADk3wSdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5dJREFUeNq0lF1oU2cYx9%2Bv85mT5KT5Mqm2jU6JuOLUSmWzKuhkboPZ6cWGMCobXgheyDYGHV6MuVERdIyBF9suhhO8mHphdZs42KgTuw8Qp65uzolpq02a1nydnJyTnHfPkQSGRGl1e8mPNwnJ%2FzzP%2F32fP%2Baco%2F96EfQ%2FLHb%2FFxjje%2FupfVuxw5HgcEdEHJkv9R%2BvzlQU399%2BXRQf2fOiJjK6WhBoN8H4d4fzC47D78B7e%2FO7x53Ztu%2BqstFM8SlCSX%2FQ73k7FvJ9FAloX%2Fg1%2BQClpPfEB73B2YrSSEANTeaM1ZoiPRlt8YqtYX%2BkPRbo6Yi17OiIBQ6F%2FJ63Tg5smTNjT2EJU3kzdu7SaCAa0O5ghP3xiJf5VEn1KKLkUYSwpko7ZYnJ4PuBF975KtX448mBrVAkJ8089cK2TJWF5yO62gkiiq7JeOHcFvHldcloVzLewcBY06qV0tOFzyayhYOmVR23qk5IoGQtpdhuJqrAtgBYDrQDPsBPCA4mYrre%2F9rTbRu65s9TRCaA8PT4ZO7jP1LZb1WJbfN75FcFRn9p1r4FjAqMWPCAEUaJRjCKMEqTtybyC%2FcfuYChcuWZznlxWWT%2BkO7pNSp2lyaLG%2BAgZcOsjjUTda9Lfv2KDktTxMyapXOX5IoVY8%2FnQ2c654dZW8TXOnx5rJSYo%2BdjYa8iS0KiLRpIyCKVKKEom59KNxPl255dAteKO18P36hs6k4EF8T1Y2cPvoIZo1XbdkwdtIK6ChYSzigGJygT4VPFrpahI72Zp7h%2BV2UgBoShYuGT3Ru3r1wc79M1BREwWBIpkgSGwB4YOH5vaCbvlqYu30jvfdDsN56kAk8Uy1ZP34eD2efePHoY7q8FOiBGERwKYowgqBRB1S4UxB3yEEH3wMaBkfpOU%2Bm8d2nfp0OvDwz%2BdvP2tFUwKhzscNtzXwgsUKEr9WGVugGSBS4BZ4DTwM%2FA2OD5P1Prdh3%2B6deRMSNXKqOyaSPIBdcC7jiO8aBAaZYHGtAGLHaHA36WhCkLbe5ZFH3vjbWLYKR5jTulv1JT7880T90nF4BrwPfAN1DLcNG0b%2F5w8dbEvi%2FPX79bLPNc0cynp0sjbJb527DkIpCr1ZxMKlPoPvrdVaM96iu3RnxXrv6duT7T9pvZodTtWAUHtKzFK5dbw94fLbs29KiijdhU6vmQBGzgCpB6HNFGxWo9dNyVB4zHFW0Ik3%2FlBv9HgAEAb1VPhOUglMsAAAAASUVORK5CYII%3D\" /></a>" : "",
                                  HTMLString = '<div class="ArtTitleText">' + tokenStreams[0].content[0].tokText +
                                               '</div><div class="origLinkDiv"><a id="ArtOrigLink' + i + 
                                               '" href=\'javascript:toggleTables("ArticleOriginal#' + i +
                                               '", "ArtOrigLink' + i + '", ["' + langStr.showOrig + '", "' 
                                               + langStr.hideOrig + '"])\'>'+ 
                                               langStr.showOrig + '</a></div><div class="jumpArtArrows">' +
                                               backLink + forwLink +'</div>&nbsp;';
                              
                              nameLink.setAttribute( "name", tokenStreams[0].content.shift().name );
                              nameLink.setAttribute( "class", "ArticleAnchor" );
                              nameLink.appendChild( headDiv );
                            }
                            
                            else 
                            {
                              var headDiv    = XMLDoc.createElement( "div" ),
                                  origDiv    = XMLDoc.createElement( "div" ),
                                  HTMLString = '<div class="origLinkDiv"><a id="ArtOrigLink' + i + 
                                               '" href=\'javascript:toggleTables("ArticleOriginal#' + i +
                                               '", "ArtOrigLink' + i + '", ["' + langStr.showOrig + '", "' +
                                               langStr.hideOrig + '"])\'>'+ langStr.showOrig + '</a></div>&nbsp;';
                            } 
                           
                            headDiv.innerHTML = HTMLString;
                            headDiv.setAttribute( "id", "ArticleTitle#" + i );
                            headDiv.setAttribute( "class", "ArticleTitle" );

                            origDiv.setAttribute( "id", "ArticleOriginal#" + i );
                            origDiv.setAttribute( "class", "ArticleOriginal" );
                            origDiv.innerHTML = tokenStreams[0].content.original;

                            ( nameLink )? oFragment.appendChild( nameLink ) : oFragment.appendChild( headDiv );
                            oFragment.appendChild( origDiv );
                            oFragment.appendChild( parseArticle( tokenStreams.shift().content, i ) );                              

                            
                            break;
    }
  } // end of while

    newDiv.appendChild( oFragment );
    
    return newDiv;  
} // end parseTextTable( completeCellContent )

//////////////////////////////////////////////////////////////////////////////////////////////////////:


// chapterTitle = Paraf;

function parseChapterTitle( text, num )
{
  var myDiv = XMLDoc.createElement( "div" );
  myDiv.setAttribute( "id", "mainContentTitle#" + num );
  myDiv.setAttribute( "class", "mainContentTitleDivs" );
    
  myDiv.innerHTML = text;
  return myDiv;
}

//////////////////////////////////////////////////////////////////////////////////////////////


// Article = ( ArtStartLine | Summation | Quote | Paraf ),  { BR, ( Summation | Quote | Paraf ) };

function parseArticle( tokenStream, num )
{
  //For now we will just assume that the first line is an ArtStartLine with no further checks.
  //The condition that a summation cannot be followed by a quote or a summation, will be checked inside parseSummation
  
  var myDiv         = XMLDoc.createElement( "div" ),
      myP           = XMLDoc.createElement( "p" ),
      appIt         = myDiv.appendChild,
      tokenStream;

  myDiv.setAttribute( "id", "mainContentArticle#" + num );
  myDiv.setAttribute( "class", "mainContentArticleDivs" );


  while( tokenStream[0] )
  {
    switch( tokenStream[0].tokType )
    {
      case "Quote"          : var quoteDiv = XMLDoc.createElement( "div" );
                              quoteDiv.setAttribute( "class", "mainContentQuoteDivs" );
                              quoteDiv.appendChild( parseArticle( tokenStream.shift().content ) );
                                
                              myDiv.appendChild( quoteDiv );
                              delete quoteDiv;
                              break;
      
      case "noProcess"      : var myDiv2 = XMLDoc.createElement( "div" );
                              myDiv2.innerHTML = "&nbsp;&nbsp;" + tokenStream.shift().content;
                              myDiv2.setAttribute( "class", "mainContentNonProcessedDivs" ); 
                              myDiv.appendChild( myDiv2 );
                              delete myDiv2;
                              break;
                              
      case "SummationStart" :
      case "SummationSingle": 

      case "Summation"      :
      case "SummationLast"  : myDiv.appendChild( parseSummation( tokenStream ) );
                              break;
      
      /*tokenStream[1].tokText = tokenStream[0].tokText + tokenStream[1].tokText;
                              tokenStream.shift();*/

      case "Paraf"          : myP = XMLDoc.createElement( "p" );
                              myP.innerHTML = tokenStream.shift().tokText;
                              myDiv.appendChild( myP );
                              break;

      default               : throw new Error( "parseArticle; unexpected token: " + tokenStream[0].tokType );
    }
  }
  return myDiv;
} // end of parseArticle( splitArticle, num )

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Summation = FirstSumLine, { SumLine }, LastSumLine;

function parseSummation( tokenStream )
{
  var currentSumType  = tokenStream[0].sumType,
      myTable         = XMLDoc.createElement( "table" ),
      myTBody         = XMLDoc.createElement( "tbody" ),
      reStack         = new RegExp( "," + currentSumType + "$" ),
      beforeLast,
      receiver;
  
  tokenStream.stack += "," +  currentSumType;

//FirstSumline
  if( tokenStream[0].tokType == "SummationStart" ) parseSumLine( tokenStream, myTBody, currentSumType );

  while( tokenStream[0] && tokenStream[0].tokType == "Summation" )
  {
    parseSumLine( tokenStream, myTBody, currentSumType );
  }

//LastSumLine  
  if(    tokenStream[0] 
      && ( 
              tokenStream[0].tokType == "SummationLast" 
           || tokenStream[0].tokType == "SummationSingle"
         )
    )
    parseSumLine( tokenStream, myTBody, currentSumType );
  
  if( myTBody.rows[0].cells[0].innerHTML == "-" ) 
  {
    var myUL = XMLDoc.createElement( "ul" ),
        length = myTBody.rows.length,
        i = -1;
        
    while( ++i < length )
    {
      var myLI = XMLDoc.createElement( "li" );
      myLI.innerHTML = myTBody.rows[i].cells[1].innerHTML;
      myUL.appendChild( myLI );
    }
    tokenStream.stack = tokenStream.stack.replace( reStack, "" );
    return myUL;
  }
  
  tokenStream.stack = tokenStream.stack.replace( reStack, "" );
  
  myTable.appendChild( myTBody );
  myTable.setAttribute( "class", currentSumType );
  return myTable;
}


//FirstSumLine  = FirstSumIntro, SumText;
//SumLine       = SumIntro, SumText;
//LastSumLine   = LastSumIntro, LastSumText;

//this one does not return elements, because the tablefunctions like insertCell don't work if there is no tbody.
function parseSumLine( tokenStream, myTBody, currentSumType )
{
  var row     = myTBody.insertRow( -1 ),
      cell1   = row.insertCell( -1 ),
      cell2   = row.insertCell( -1 ),
      type    = tokenStream[0].tokType;
  
  cell1.innerHTML = tokenStream.shift().tokText;

  if(
          type == "SummationLast" 
       || type == "SummationSingle"
    )
  {
    cell2.appendChild( parseLastSumText( tokenStream, currentSumType ) );
  }
    
  else cell2.appendChild( parseSumText( tokenStream, currentSumType ) );
  
  cell1.setAttribute( "class", "sumIntroCell" );
  cell2.setAttribute( "class", "sumTextCell" );
}


//SumText = ( Paraf | Summation ),  { BR, ( Paraf | Summation | Quote ) };
function parseSumText( tokenStream, currentSumType )
{
  var oFragment = XMLDoc.createDocumentFragment();

  loop:
  while( tokenStream[0] )
  {
    switch( tokenStream[0].tokType )
    {
      case "Summation"      :
      case "SummationLast"  : if( tokenStream[0].sumType == currentSumType )
                                break loop;
      case "SummationSingle":
      case "SummationStart" : oFragment.appendChild( parseSummation( tokenStream ) );
                              break;

      case "Quote"          : var quoteDiv = XMLDoc.createElement( "div" );
                              quoteDiv.setAttribute( "class", "mainContentQuoteDivs" );
                              quoteDiv.appendChild( parseArticle( tokenStream.shift().content ) );
                              
                              oFragment.appendChild( quoteDiv );
                              delete quoteDiv;
                              break;

      case "noProcess"      : var myDiv = XMLDoc.createElement( "div" );
                              myDiv.innerHTML = "&nbsp;&nbsp;" + tokenStream.shift().content;
                              myDiv.setAttribute( "class", "mainContentNonProcessedDivs" ); 
                              oFragment.appendChild( myDiv );
                              delete myDiv;
                              break;

      case "Paraf"          : myP = XMLDoc.createElement( "p" );
                              myP.innerHTML = tokenStream.shift().tokText;
                              oFragment.appendChild( myP );
                              break;

      default               : throw new Error( "parseSumText(), unexpected token: " + tokenStream[0].tokType );
      
    } // end of switch( tokenStream[0].tokType )
  } // end of loop:

  return oFragment;
}

//LastSumText = Paraf, [BR, Summation] | Summation;
function parseLastSumText( tokenStream, currentSumType )
{
  var oFragment = XMLDoc.createDocumentFragment();

  switch( tokenStream[0].tokType )
  {
    case "Summation"      : 
    case "SummationLast"  : if( tokenStream.stack.indexOf( tokenStream[0].sumType ) >= 0 )
                              break;

    case "SummationStart" : 
    case "SummationSingle": oFragment.appendChild( parseSummation( tokenStream ) );
                            break;

    case "Paraf"          : myP = XMLDoc.createElement( "p" );
                            myP.innerHTML = tokenStream.shift().tokText;
                            oFragment.appendChild( myP );
                            
                            if( tokenStream[0] )
                              switch( tokenStream[0].tokType )
                              {
                                case "Summation"      : 
                                case "SummationLast"  : if( tokenStream.stack.indexOf( tokenStream[0].sumType ) >= 0  )
                                                          break;
                            
                                case "SummationStart" : 
                                case "SummationSingle": oFragment.appendChild( parseSummation( tokenStream ) );
                                                        break;

                                case "Quote"          : var quoteDiv = XMLDoc.createElement( "div" );
                                                        quoteDiv.setAttribute( "class", "mainContentQuoteDivs" );
                                                        quoteDiv.appendChild( parseArticle( tokenStream.shift().content ) );
                                                          
                                                        oFragment.appendChild( quoteDiv );
                                                        break;
                               
                                case "noProcess"      : var myDiv = XMLDoc.createElement( "div" );
                                                        myDiv.innerHTML = "&nbsp;&nbsp;" + tokenStream.shift().content;
                                                        myDiv.setAttribute( "class", "mainContentNonProcessedDivs" ); 
                                                        oFragment.appendChild( myDiv );
                                                        delete myDiv;
                                                        break;
                              }
                                                        
                            break;

    default               : throw new Error( "parseLastSumText(), unexpected token: " + tokenStream[0].tokType + " : " + tokenStream[0].tokText );
  }
     return oFragment;
} // end of parseLastSumText( tokenStream )


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function tokenizeBlock( cellContent, articleSplitter, lineSplitter )
{
  var splitCellContent = cellContent.split( articleSplitter ),
      tokenStreams     = [];

  while( splitCellContent[0] )
  {
    tokenStreams.push( tokenizeArticle( splitCellContent, lineSplitter ) );
  }
  
  return tokenStreams;

} // end of tokenizeBlock( cellContent )
 
function tokenizeArticle( splitCellContent, lineSplitter )
{
  var tokenStream  = [],
      splitArticle = cleanHTML( splitCellContent[0] ).split( lineSplitter ),
      reArtTitle   = /^<a(?: linkindex=['"]\d+?['"])? name=['"](Art.[\s\S]*?)['"](?: href=['"]([\s\S]*?)['"] ?)?>([\s\S]{0,10}?)<\/a>(?:\s*?<a (?:linkindex=['"]\d+?['"] )?href=['"](?!#hit)([\s\S]*?)['"] ?>([\s\S]{0,10}?)<\/a>)?([\s\S]{0,10}?\. ? ?-?)([\s\S]*)$/i,
      reChapTitle  = /^(<a )((?:linkindex=['"]\d+?['"] )?name=['"]LNK[\s\S]*?<\/a>[\s\S]*)$/i,
      nextBlockToo = checkForNextBlock();
      
  tokenStream.original = splitCellContent.shift();

//If it is a ChapterTitle, return fast
  if( splitArticle[0].match( reChapTitle ) )
  {
    var obj = {
                blockType : "ChapterTitle",
                content   : RegExp.$1 + "onclick='javascript:if( getElementById( \"tocTableHeaderLink\" ).innerHTML == " + " ) toggleTables( \"tocTable\", \"tocTableHeaderLink\", [\" + \",\" - \"] );' " + RegExp.$2
              };
              
    splitArticle.shift();
    
  //There are cases where they only put one <br> after a chapterTitle, in the encountered case, 
  //no chap title was present either. So if there is more to come, send it back for further processing
    if( splitArticle[0] ) splitCellContent.unshift( splitArticle.join( lineSplitter ) );
 
    return obj;
  }

  if( splitArticle[0].match( reArtTitle ) )
  {
  //We create an object for the ArtTitle with the links to the next and previous article
    tokenStream.push
    ( {
        tokType  : "ArtTitle",
        tokText  : RegExp.$3 + RegExp.$5 + RegExp.$6,
        prev_link: RegExp.$2,
        next_link: RegExp.$4,
        name     : RegExp.$1
    } );
    splitArticle[0] = RegExp.$7;
  }

//Loop through all the remaining lines
  while( splitArticle[0] || nextBlockToo )
  {
  //Add blocks if necessary
    if( !splitArticle[0] && nextBlockToo )
    {
      addBlocks( tokenStream );
      continue;
    }

    if( detectQuoteStart() )
    //make a tokType "Quote" and process everything in between
      tokenStream.push
      ( {
          tokType : "Quote",
          content : tokenizeQuote()
      } );

  //Else, fill it with summations and parafs
    else tokenStream.push( tokenizeLine( tokenStream ) );
  } // end of while loop
  
  return  {
            blockType : "Article",
            content   : findEndSummations( tokenStream )
          };


  function tokenizeQuote()
  {
    var quoteStream = [];
    
    while( splitArticle[0] || nextBlockToo )
    {
    //Add blocks if necessary
      if( !splitArticle[0] && nextBlockToo )
      {
        addBlocks( quoteStream );
        continue;
      }
      
    //Otherwise, fill our stream
      else quoteStream.push( tokenizeLine( quoteStream ) );

    //If that was the last line, break
      if( quoteStream[ quoteStream.length - 1 ].tokType == "noProcess" )
        var expR = /" ?<\/font>(<BR>)?$/i;
      
      else var expR = /" ?(\(\d\d?\))?(\.|;)?$/i;
      
      if( quoteStream[ quoteStream.length - 1 ].tokText.match( expR ) )
      {
      //We have to check the number of quotes on the current line, 
      //to make sure that we don't just have a quoted word at the "end".
      //If this was the line where the quote opened, and it openened with a summation token, we have to
      //count including the possible quote at the beginning of this line.
      //else we want to skip that opening quote...

        if
        ( 
             quoteStream.length == 2
          && quoteStream[ quoteStream.length - 2 ].tokType.match( /Summation/ )
          && quoteStream[ quoteStream.length - 2 ].tokText.match( /^ ?"/ )
        )
          var expR2 = /"/g;
        
        else var expR2 = /(^ *?" ?(\(\d\d?\))?(\.|;)?$| *?.+?")+/g;
        
        var arrMatches = quoteStream[ quoteStream.length - 1 ].tokText.match( expR2 );
        if( arrMatches.length % 2 == 1 ) break;
      }
      
    //Check that no new quote starts
      if( splitArticle[0] && detectQuoteStart() ) break;
    }
    
    return findEndSummations( quoteStream );
    
  } // end of tokenizeQuote
  

  function checkForNextBlock()
  {
    if( splitCellContent[1] )
    {
      if(    splitCellContent[1].match( reChapTitle )
          || splitCellContent[1].match( reArtTitle )
        )
        return 0;
        
      if( splitCellContent[0].match( /<font face="courier" size="-1">/ ) )
        return "noProcess";
       
      else return "addArt";    
    }
    else return 0;
  }
 
  function addBlocks( stream )
  {
    do
    {
      switch( nextBlockToo )
      {
        case 0           : return;
        
        case "noProcess" : stream.push
                           ( {
                               tokType : "noProcess",
                               content : replaceInwerking( splitCellContent[0] )
                           } );
                           
                           tokenStream.original += "<BR><BR>&nbsp;&nbsp;" + splitCellContent[0];
                           
                           nextBlockToo = checkForNextBlock();
                           splitCellContent.shift();
                           
                           if( !nextBlockToo ) return;
                           break;
  
        case "addArt"    : splitArticle = cleanHTML( splitCellContent[0] ).split( lineSplitter );
                           tokenStream.original += "<BR><BR>&nbsp;&nbsp;" + splitCellContent[0];
                           
                           nextBlockToo = checkForNextBlock();
                           splitCellContent.shift();
                           return;

        default          : throw new Error( "nextBlockToo contains illegal value: " + nextBlockToo );
      }
    } while( 1 )
  } // end of addBlocks( stream )

  function detectQuoteStart()
  {
    if( splitArticle[0].match( /^ ?" *?.+/i ) )
    {
    //We have to check the number of quotes on the current line, 
    //to make sure that we don't just have a quoted word at the start.
      var arrMatchess = splitArticle[0].match( / ?"(?!("|\.|;)? *?$)/g );
      if(
             arrMatchess
          && arrMatchess.length % 2 == 1 
          || splitArticle[0].match( /" ?(\(\d\d?\))?(\.|;)?$/i ) //we gamble here that the uneven number cancels
        )                                                        //the endquote, and not the start one... oops risky
      {
        return 1;
      }
    }
    return 0;
  } // end of detectQuote

  function tokenizeLine( stream )
  {
  //Sometimes Articles start with a text that has no links. Also it can happen in the middle of a block, so it is important to check every line, especially to properly process summations that might start on this first line. It is also common with quotes...
  
    if(  !splitArticle[0].match( /^("? ?Art(?:\.|ikel|icle)? ?\d.*?\. ?(?:\(.*?\)))$/i ) )
      if( splitArticle[0].match( /^("? ?Art(?:\.|ikel|icle)? ?(?:\d\.?)+[a-z\/\d]*(?:\.| - )(?:\(.*?\))?)(.+)/i ) )
      {
        splitArticle[0] = RegExp.$2;
        splitArticle.unshift( RegExp.$1 );
      }    
    
  //Check this line for summation tokens, this will only parse summations, not sumtexts, 
  //so we can still push a paraf after this. (A sumText cannot start with a quote)
    matchSummations( splitArticle, stream );
    
  //If it was nothing else, it was a paraf
    return  {
                tokType : "Paraf",
                tokText : splitArticle.shift()
            };

  } // end of tokenizeLine()
  
  function findEndSummations( stream )
  {
    for( var i = stream.length - 1, stack = []; i > 0; --i )
    {
    //Turn them to summationLast
      if
      (
           stream[i].tokType == "Summation" 
        && stack[ stack.length - 1] != stream[i].sumType
      )
      {
      //If the last on the stack is a dash, and the one before that is the same type we have now,
      //and it is alphabetically higher (-> last one not yet implemented), then we assume that the 
      //dash was just not properly closed. In that case we don't turn this to summationLast, and  
      //we pop the dash. This is not 100% waterproof, but it is as close as it get's im afraid.
        if( 
                stack[ stack.length - 1] == "dash"
             && stack[ stack.length - 2] == stream[i].sumType
          )
        {
            stack.pop();
        }
        
        else
        {
          stack.push( stream[i].sumType );
          stream[i].tokType = "SummationLast";
        }
      }
      
    //Take a summation of the stack when we meet the first one
      else if( stream[i].tokType == "SummationStart" && stack[ stack.length - 1] == stream[i].sumType )
      {
        stack.pop();
      }
      
      else if(      stream[i].tokType == "SummationStart"
                &&  ( !stack[0] || stack[ stack.length - 1] != stream[i].sumType )
              )
      {
        stream[i].tokType = "SummationSingle";
      }
      
    //forsee that dashes must not escalate out of other summations they are nested in...
      else if
      (
           stream[i].tokType  == "Summation"
        && stream[i].sumType  == "dash"
        && stack[ stack.length-2 ]
      )
      {
        for( var j = i-1; j >= 0; --j )
        {
          if( stream[j].tokType == "Summation" || stream[j].tokType == "SummationStart" )
          {
            if( stack[ stack.length-2 ] != stream[j].sumType )
              break;
              
            else
            { 
              stream[i].tokType = "SummationStart";
              ++i;                                                //recheck this line as SummationStart
              break;
            }
          }
        }
      } // end of check on dashes
    } // end of outer for loop
    
    return stream;
    
  } // end of findEndSummations()
} // end of tokenizeArticle( splitCellContent )


function matchSummations( splitArticle, tokenStream )
{
//Now we check for summations.
//Since a given line can only be of one type, we return if we catch one
  
  var reExpr,
      reFirst,
      isQuote = ( splitArticle[0].match( /^"/ ) )? '"' : '',
      romanType;


//Check if it starts a new paragraph § 1. § 2.
  reExpr = /(^"?|^"?.+?:) ?((?:\(.*?\))? ?(?:<span class="startDateAnnotation">.*?<\/span>)?)*? *?(\(?§ *?\d{1,3}(?:erbis|er|bis)?(?:\.| - | (?![a-z]))\)?)([^,].*)?/,
  reFirst = /^"?\(?§ *?1(?!bis)([^\d]|$)/;
  if( checkSum( "newParagraph" ) ) return;
  
//Check if it starts with a summation token like 1° 2°
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?\d{1,3} ?°\.?\)?(?: ?|[a-z\/\d]+?\.)\)?)(.*)/;
  reFirst = /^"?\(?1 ?°\.?\)?/;
  if( checkSum( "numDegree" ) ) return;

//Check if it starts with a summation token like 1. 2.
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?\d{1,3}\w?\.\)?)([^\d].*)/;
  reFirst = /^"?\(?1a?\./;
  if( checkSum( "numDot" ) ) return;

//Check if it starts with a summation token like 1.1 1.2 1.3
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?[1-9]{1,2}\.\d{1,2}\.?\)? ?)([^\d].*)/;
  reFirst = /^"?\(?[\d]\.1a?\./;
  if( checkSum( "numFloatDot" ) ) return;

//Check if it starts with a summation token like 1.2.1 1.2.2 1.2.3
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?[1-9]{1,2}\.\d{1,2}\.\d{1,2}\.?\)? ?)([^\d].*)/;
  reFirst = /^"?\(?[\d]\.[\d]\.1a?\.?/;
  if( checkSum( "numFloatFloatDot" ) ) return;
  
//Check if it starts with a summation token like -
  reExpr = /(^"?|^"?.+?: ?)( *?)(\(?-) *([^-].*)/;
  reFirst = /^"?\(?-/;
  if( checkSum( "dash" ) ) return;
  
//Check if it starts with a summation token like a) b)
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?[a-z]\) ?)(.*)$/;
  reFirst = /^"?\(?a\)/;
  romanType = ") ";
  if( checkSum( "letterBracket" ) ) return;

//Check if it starts with a summation token like i) ii) iii) iv)
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?(?:i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii|xiii|xiv|xv|xvi|xvii|xviii|xix|xx)\) ?)(.*)$/;
  reFirst = /^"?\(?i\)/;
  if( checkSum( "romanNumBracket" ) ) return;

//Check if it starts with a summation token like 1) 2)
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?\d{1,3}\) ?)(.*)/;
  reFirst = /^"?\(?1\)/;
  if( checkSum( "numBracket" ) ) return;
  
//Check if it starts with a summation token like 1§ 2§
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?\d{1,2}§(?:bis)?\)? ?)(.*)/;
  reFirst = /^"?\(?1§/;
  if( checkSum( "numParaf" ) ) return;
  
//Check if it starts with a summation token like a. b. or A. B.
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?[a-zA-Z]\.)(?! ?[A-Z \.-]{4}|\d{1,2}\.)( ?.*)?$/;
  reFirst = /^"?\(?[a]\./i;
  romanType = ". ";
  if( checkSum( "letterDot" ) ) return;
  
//Check if it starts with a summation token like i. ii. iii. iv. or I. II. III. IV
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?(?:i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii|xiii|xiv|xv|xvi|xvii|xviii|xix|xx)\. ?)(.*)$/i;
  reFirst = /^"?\(?i\./i;
  if( checkSum( "romanNumDot" ) ) return;

//Check if it starts with a summation token like a. 1.  a. 2.
  reExpr = /(^"?|^"?.+?: ?)(<span class="startDateAnnotation">.*?<\/span>)*? *?(\(?[a-z]\. \d{1,2}\.)(?![A-Z]{3})(.*)$/;
  reFirst = /^"?\(?[a-z]\. 1\./i;
  romanType = ". ";
  if( checkSum( "letterDotNumDot" ) ) return;

//Default, it is not summation
  return;
  
  function checkSum( sType )
  {
    if( !reExpr.test( splitArticle[0] ) ) return false;
    
    var sumText = RegExp.$3,
        newLine = RegExp.$2 + RegExp.$4; //because if we go in the if for roman numerals, we overwrite them!
        
  //if it is after a ':' instead of at the beginning of the line, just seperate and restart
    if( RegExp.$1 && RegExp.$1 != '"' )
    {
      splitArticle[0] = RegExp.$2 + RegExp.$3 + RegExp.$4;
      splitArticle.unshift( RegExp.$1 );

      //We put the second part to the next line, so now we first need to let matching of the first part continue
      //with the other sumTypes. We will process what we just found when it is the next line's time to get tested
      return;
    }

  //Prevent Roman numerals from being matched as letterBrackets
    if(
           ( sType == "letterBracket"   || sType == "letterDot" )
        && ( sumText.match( / *?\(?(i|v|x|I|V|X)(\.|\)) */ ) )
      )
      {
        var i           = tokenStream.length,
            cCode       = RegExp.$1.charCodeAt( 0 ) - 1,
            romType     = RegExp.$2,
            foundTarget = 0;

        while( --i >= 0 )
        {
          if(    ( tokenStream[i].sumType == "letterBracket" && romType == ")" )
              || ( tokenStream[i].sumType == "letterDot" && romType == "." )
            )
          {
            tokenStream[i].tokText.match( /.*?([a-zA-Z])(?:\.|\))/ );
            if( RegExp.$1.charCodeAt( 0 ) == cCode ) foundTarget = 1;
            else break;
          }
        }
        
        if( !foundTarget ) return false;
      }
    // end of prevent roman numerals


  //Prevent problems with summations like " - - " or "V.Z.W." 
    if(
        splitArticle[0].match( /^ *?V.Z.W./i )
      )
      return false;

    if( 
           tokenStream[ tokenStream.length - 1 ]
        && tokenStream[ tokenStream.length - 1 ].sumType == sType
      )
      return false;


    tokenStream.push
    ( {
        tokType : "Summation",
        sumType : sType,
        tokText : isQuote + sumText
    } );
    
    if( newLine ) splitArticle[0] = newLine;
    else splitArticle.shift();

  //next we set it to SummationStart
    checkFirst();

  //In case there are nested summations on a line starting with a sum token like "1. a) blablabla"
    matchSummations( splitArticle, tokenStream ); 

    return true;

    
    function checkFirst()
      {
      //Check if it matches for a first line
        if( !reFirst.test( tokenStream[ tokenStream.length-1 ].tokText ) ) return;
        
      //If it is not a dash or the last line ends with a semicolon, change it and return
        if( 
               !tokenStream[ tokenStream.length-2 ]                             //eg when a quote starts with a dash
            || tokenStream[ tokenStream.length-1 ].sumType != "dash"
            || ( 
                    tokenStream[ tokenStream.length-2 ].tokText 
                 && tokenStream[ tokenStream.length-2 ].tokText.match( /: ?(<span class="startDateAnnotation">.*?<\/span>)? ?$/i )
               )
            || tokenStream[ tokenStream.length-2 ].tokType == "SummationStart"
            || tokenStream[ tokenStream.length-2 ].tokType == "SummationSingle"
            || tokenStream[ tokenStream.length-2 ].tokType == "Summation"
            || tokenStream[ tokenStream.length-2 ].tokType == "SummationLast"
          )
        {
          tokenStream[ tokenStream.length-1 ].tokType = "SummationStart";
          return;
        }
 
      //now it is a dash and the last line does not end with ':'

      //if it is preceded by another dash, return especially to prevent them from nesting
        for( var i = tokenStream.length - 3; i >= 0; --i)
        {
          if( 
                 tokenStream[ i ].tokType == "Summation" 
              || tokenStream[ i ].tokType == "SummationStart"
            )
          {
            if( tokenStream[ i ].sumType == "dash" ) return;
          }
        }
        
      //If the last line before is a block like a quote or a noProcess, probably it is no new summation
        if( 
               tokenStream[ tokenStream.length-2 ].tokType == "Quote"
            || tokenStream[ tokenStream.length-2 ].tokType == "noProcess"
          )
          return;
          
      //If the last line before is anything else, we make it summationStart
        tokenStream[ tokenStream.length-1 ].tokType = "SummationStart";
      } // end of checkFirst()
  } // end of checkSum()
} // end of matchSummations( splitArticle, tokenStream )


/////////////////////////////////////////////////////////////////////////////////////////////////////

//just making different kinds of divs, so we can give it some css layout
function processTocLine( myString, lineNum )
{
  var myDiv = XMLDoc.createElement( "div" ),
      reIsTitle = /^<a/;

  if( reIsTitle.test( myString ) )
  {
    myDiv.setAttribute( "id", "tocTitle#" + lineNum );
    myDiv.setAttribute( "class", "tocTitles" );
  }

  else
  {
    myDiv.setAttribute( "id", "tocText#" + lineNum );
    myDiv.setAttribute( "class", "tocTexts" );
  }
  
  myDiv.innerHTML = myString;  
  return myDiv;
} // end of processTocLine( myString, lineNum )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cleanHTML( myString )
{
  myString = myString.replace( /[\n\r\t]/gi, "" ); //get rid of interfering characters that are not used in html anyway

  myString = replaceInwerking( myString );
  
  myString = myString.replace( /<a.{0,20}?href=["']#hit\d*?["'].*?>&lt;?<\/a><a name=["']hit\d*?["']><\/a>(<font color=['"]?Red["']?>.*?<\/font>)<a.{0,20}?href=["']#hit\d*?["'].*?>&gt;?<\/a>/gi, "$1");
  
  return myString;
}

function replaceInwerking( string )
{
// give some structure to <W 1997-06-25/41, art. 26, 002; Inwerkingtreding...>
// We use a negative lookahead to exclude some special cases like the links of highlighted words from search and
// some common mathematical uses. We need to use a function to make sure no <br> tags go between the two < >'s 

  var myString = string.replace( /&lt;(?!=| ?\d|<\/a>)[\s\S]*?(&gt;(?!<\/a>)|<br>)/gi, replaceWerking );

  function replaceWerking( sMatch, sCapt1 )
  {
    if( sCapt1 == "&gt;" ) return '<span class="startDateAnnotation">' + sMatch + '</span>';
    return sMatch;
  }
  
  return myString;
}
} // end of parsePage( XMLDoc )
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function $xPath1( p, context ) 
{
  if( !context ) context = document;
  return new XPathEvaluator().evaluate( p, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function $xPathGetText( p, context )
{
  if( !context ) context = document;
  var oResult = new XPathEvaluator().evaluate( p, context, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );

  if ( oResult == null ) return "";

  var oElem,
      arry = []; 

  //Put all of them in an array, because otherwise it invalidates the oResult if we make changes to any of the nodes
  while( oElem = oResult.iterateNext() ) arry.push( oElem.data ); 
  return arry.join( "" );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function myGetElementsByAttribute( attrib, value, context )
{
  if( !context ) context = document;
  var oResult = new XPathEvaluator().evaluate( 

  '//*[@' + attrib + '=\'' + value + '\']'
    
  , context, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );

  if ( oResult != null )
  {
    var oElem,
        arry = []; 
  
    //Put all of them in an array, because otherwise it invalidates the oResult if we make changes to any of the nodes
    while( oElem = oResult.iterateNext() ) arry.push(oElem); 
    return arry;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFormString( myForm )
{
  if( myForm.tagName.toLowerCase() != "form" ) throw new Error( "getFormString( myForm ): No form was passed in!" );
  
  var output = [],
      elems  = myForm.elements,
      len    = elems.length;
  
  for( var i = 0; i < len ; ++i )
    output.push( elems[i].name + "=" + elems[i].value );
 
  return encodeURI( output.join( "&" ) );
}

function post(url, data, cb)
{
  var req = new XMLHttpRequest();
  req.overrideMimeType('text/xml');
  
  req.onreadystatechange = function() { if ( req.readyState == 4 && req.status == 200 ) cb( req ); };
  req.open( 'POST', url, true );
  req.overrideMimeType('text/xml');
  req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  req.send( data );
}

function get( url, cb )
{
  var req = new XMLHttpRequest();
  
  //req.onreadystatechange = function() { if ( req.readyState == 4 && req.status == 200 ) cb( req ); };
  req.open( 'GET', url, true );
  req.overrideMimeType('text/xml');
  req.send( null );
}

