// ==UserScript==
// @name           Scholar
// @namespace      http://www.gibbi.com/scripts
// @description    Scholar Plugin
// @include        http://scholar.google.*/scholar*
// @include        http://citeseerx.*
// ==/UserScript==

//
// version 1.4
//

// TODO: add document selection, text tooltips, other stuff.

String.prototype.startsWith = function(str)
    {return (this.match("^"+str)==str)}

function xpath(query,node) {
    return document.evaluate(query, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function fXPath(query,node) 
   {
      var elements = xpath(query,node);
      return elements.snapshotItem(0);
   }

function lXPath(query,node) 
   {
      var elements = xpath(query,node);
      return elements.snapshotItem(elements.snapshotLength-1);
   }

    
function normalize(str) {
       var temp = (str != null) ? parseInt(str) : 0;
       return (isNaN(temp)) ? 0 : temp;
}


function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}




var href = window.location.host;
//GM_log("HOST:"+href);

var scholar = href.startsWith("scholar");


//
// This path to be adapted when google scholar changes its page layout.
//
// NOTE: relies on a bug on the Firefox 3.5 DOM such that a <p> is not
// recognized as parent of the firt <font> tag in the expression below.
// 
var pathScholar = "/html/body/font/span[2]/a[1]";
var pathCiteseer = "/html/body/div/div/div/div/div/div/div/ul/li[4]/a";
var pathAuthors ="/html/body/font/span[1]";

function collectData()

{
    // data = will be filled up with citations per each paper
    // selfData = for citeseer, filled up with self citations per each paper
    var data = new Array();
    var selfData = new Array();
    
    //
    // Normalized cites per authors.
    //
    var authorCount = new Array();

    elements = xpath(scholar ? pathScholar : pathCiteseer,document);
    authorList = xpath(pathAuthors,document);
    
    // TODO: Add "totalcitations X out of data.length."
       
    //
    // First pass, extraction of citation values.
    // Assumes authorList and elements have same length.
    //
    
    for(var i = 0; i < elements.snapshotLength; i++)
    {
         var s;
         if ( (s = elements.snapshotItem(i)) != null)
         { 
           var a = new Array();
     
           a = s.innerHTML.split(" ");
           //GM_log("Parsing "+a);
     
           index = scholar ? a.length - 1 : 2;
           data[i] = normalize(a[index]);
           if (!scholar) {
                var b = new Array();
                //GM_log("Parsing2 "+a[index+1]);
                b = a[index+1].split("(");
                selfData[i] = normalize(b[1]);            
           };
           if ( (s = authorList.snapshotItem(i)) != null)
           { 
               var a = new Array();
               a = s.innerHTML.split("-");
               var b = new Array();
               b = a[0].split(",");
               while (b[b.length-1].match("[0-9]+"))
                  b.pop();
               authorCount[i] = b.length;
               GM_log("String="+a[0]+" Authors="+b.length+" are:"+b);
           }
           else authorCount[i] = 1;
       } // outer if
    } // outer for
    return new Array(data, selfData, authorCount);
}

var datas = collectData();

data = datas[0];
selfData = datas[1];
authorCount = datas[2];

data.sort(function(a,b){return b - a});
if (!scholar) selfData.sort(function(a,b){return b - a});

var goOn = !scholar;
var num = 10;
//
//  number of results per page in citeseerx.
//
var inc = 10;
goOn = false;

while (goOn)
{
   var uri = window.location+ "&start="+num;
   GM_log("Will query: "+uri);
   
   GM_xmlhttpRequest({
    method: 'GET',
    url: uri,
    onload: function(responseDetails) {
        var datas = collectData();
        data = data.concat(datas[0]);
        selfData = selfData.concat(datas[1]);
        if (datas[0].length == 0) goOn = false;
        GM_log('Data:'+data.length+" selfData:"+selfData.length);
    }
    }); 
    if (num > 100) goOn = false;
    num += inc; 
}

//
// Second pass, computes indices
//
//
// Number of decimals in results
//
var prec = 1;

var somethingWrong = 0;

function computeIndices(data) {

    var totalCitations = 0;
    var gIndex = 0;
    var hIndex = 0;
    var eIndex = 0;
    var computedH = false;
    var computedG = false;
    var citationsG = 0;
    var citationsH = 0;
    var deltaH = 0;
    var deltaG = 0;

    var str;

    for(i = 0; i < data.length; i++)
    {
           totalCitations += data[i];
           GM_log("i="+i+" Cites:"+totalCitations+" Curr:"+data[i]);
           if ( data[i] < i+1 && !computedH ) 
           {   
               hIndex = i.toFixed(prec);
               citationsH = totalCitations-data[i];  
               computedH = true;
               for (j = 0; j <= i && j < data.length; j++)
               {
                  deltaH +=  ( (i+1) > data[j] )  ? (i+1) - data[j] : 0;
               }
               deltaH = deltaH.toFixed(prec);  
           } 
           if ( totalCitations <= (i+1)*(i+1) && !computedG)
           {
              gIndex = i.toFixed(prec); 
              citationsG = totalCitations-data[i];  
              computedG = true;
              deltaG = ((i+1)*(i+1) - totalCitations).toFixed(prec);
           }
    }      
          if (!computedH) {
             hIndex = "<span id=\"rosso\">>"+data.length+"</span>";
             deltaH = "<span id=\"rosso\">-</span>";
          }
          if (!computedG) {
              gIndex = "<span id=\"rosso\">>"+data.length+"</span>";
              deltaG = "<span id=\"rosso\">-</span>";
          }
          
          if (computedH) 
          {
             eIndex = parseInt(Math.sqrt(citationsH - hIndex*hIndex)).toFixed(prec);
          }
          else eIndex = "<span id=\"rosso\">-</span>";

var what = "Click to see what's this.";

var hindexString = "<LNK><A href=\"http://en.wikipedia.org/wiki/H-index\">h-index<span>"+what+"</span></A></LNK>:";
var gindexString = "<LNK><A href=\"http://en.wikipedia.org/wiki/G-index\">g-index<span>"+what+"</span></A></LNK>:";
var eindexString = "<LNK><A href=\"http://www.plosone.org/article/info:doi%2F10.1371%2Fjournal.pone.0005429\">e-index<span>"+what+"</span></A></LNK>:";
var deltahString = "<LNK>delta-h<span>delta-h: the number of citations needed to increment h-index by 1</span></LNK>:";
var deltagString = "<LNK>delta-g<span>delta-g: the number of citations needed to increment g-index by 1</span></LNK>:";

          
          str = "<b>Citations in this page:</b> "+totalCitations.toFixed(prec)+
                               "&nbsp;<b>"+hindexString+"</b> "+hIndex+
                               "&nbsp;<b>"+gindexString+"</b> "+gIndex+ 
                               "&nbsp;<b>"+eindexString+"</b> "+eIndex+
                               "&nbsp;<b>"+deltahString+"</b> "+deltaH+ 
                               "&nbsp;<b>"+deltagString+"</b> "+deltaG;
          if (!computedH || !computedG ) {
             str += ". Data might be insufficient for computing ";
             if (!computedH)
                 str += "h-index";
             if (!computedH && !computedG)
                 str += " and ";
             if (!computedG)
                 str += "g-index";
             str += ".";  
             somethingWrong = 1;      
          }
    str += "<BR>";
    return str;
}

document.title = document.title+" GreaseMonkey";
var division = document.createElement("div");


//
// Remove annoying float bar
//
/*
elements = xpath("/html/body/div[@class='gbh']",document); 

    for(var i = 0; i < elements.snapshotLength; i++)
    {
         if ( (s = elements.snapshotItem(i)) != null)
              s.parentNode.removeChild(s);
    }
*/
division.innerHTML = "<span id=\"scholar\" size=\"+1\"><B>Impact indices:</B></span><BR>";

division.innerHTML += "<span id=\"scholar\">(Plain values)<BR>&nbsp;&nbsp;&nbsp;"+computeIndices(data)+
                         "</span>";

if (!scholar) {
   var noSelf = new Array();
   for (i = 0; i < data.length; i++)
   {
       noSelf[i] = data[i] - selfData[i];
   }
   division.innerHTML += "<span id=\"scholar\">(Without self citations)<BR>&nbsp;&nbsp;&nbsp;"+ computeIndices(noSelf)+
                         "</span>";
}

if (scholar && authorCount.length > 0) {
   var normalized = new Array();
   for (i = 0; i < data.length; i++)
   {
       normalized[i] = data[i]/authorCount[i];
   }
   division.innerHTML += "<span id=\"scholar\">(<LNK>Normalized<span>The citations of each paper are divided by the\
   corresponding number of authors (authors &gt;4 are rounded to 4)</span></LNK> per co-authorship)<BR>&nbsp;&nbsp;&nbsp;"+ 
                         computeIndices(normalized) +
                         "</span>";
}

if (somethingWrong && scholar)
{
   division.innerHTML += "<span id=\"scholar\"><BR>Insufficient data. Perhaps you didn't try with <A href=\""+
                          window.location+"&num=100\">100 results</A> instead?</BR></span>";
}

division.style.background = scholar ? "#dcf6db" : "#61c0ff";
division.style.color = scholar ? "#000000" : "#ffffff";
division.style.padding = "4px 4px 4px 4px";
division.style.borderTop = "1px solid green";
division.style.borderBottom = "1px solid green";

var td = document.createElement("td");

td.style.align = "left";
td.colSpan = 2;
td.style.borderTop = "1px solid green";
td.style.borderBottom = "1px solid green";
td.style.padding = "4px 4px 4px 4px";


if (scholar) {
    division.innerHTML = "<td align=\"left\" bgcolor=\"#dcf6db\" colspan=2 nowrap=\"nowrap\">" + division.innerHTML + "</td>";
  
    var element = fXPath("/html/body/form/table[2]/tbody/tr[2]",document);
    var daddy = fXPath("/html/body/form/table[2]/tbody",document);
    td.innerHTML = division.innerHTML;
}

/*
 *   Injected code for querying as words
 */

var clicWord = "var textField = document.gs.q;";
   

    clicWord += "var a = textField.value.split(' '); \
                    for( i = 0; i \< a.length; i++) \
                    { if ( a[i].match(':') ) \
                           a[i] = a[i].replace(/^.*:/,''); \
                     }\
                    textField.value = a.join(' '); \
                    document.gs.submit();";


/*
 *   Injected Code for querying as Author name
 */

var clicAuth = "var textField = document.gs.q;";
       
    clicAuth += "var a = textField.value.split(' '); \
                for( i = 0; i < a.length; i++) \
                { if ( a[i].match(':') ) \
                       a[i] = a[i].replace(/^.*:/,''); \
                  a[i] = 'author:'+a[i]; \
                 }";
    clicAuth += "document.gs.q.value = a.join(' '); \
                document.gs.submit(); ";

var radioOn = "checked=\"checked\"";

var checkAuth = "";
var checkWord = radioOn;

var queryField = lXPath("/html/body/form/table/tbody/tr/td[2]/table/tbody/tr/td[1]/input",document);

if (queryField.value.match(":"))
{
    checkAuth = radioOn;
    checkWord = "";
}


if (scholar) {
      insertAfter( daddy, td, element);
      var daddy2 = fXPath("/html/body/form/table[2]/tbody/tr[2]/td[1]",document);
      var comboBox = lXPath("/html/body/form/table[2]/tbody/tr[2]/td[1]/*",document);
      // here code for changing query type
      var fieldset = document.createElement('span');
      fieldset.innerHTML = "<input type='text' name='as_sauthors' style='display:none'>";
      fieldset.innerHTML += "<input type='text' name='as_publication' style='display:none'>";                           
      fieldset.innerHTML += "<font size='-1'> \
                             <fieldset> \
                               Redo the above query as: Author name\
                                  <input "+checkAuth+" type=\"radio\" name=\"query_as\" onClick=\""+clicAuth+"\" value=\"auth\"/>\
                               &nbsp;&nbsp;Matching of all the words\
                                  <input "+checkWord+" type=\"radio\" name=\"query_as\" onClick=\""+clicWord+"\" value=\"word\"/>\
                            </fieldset>\
                            </font>";

      insertAfter ( daddy2, fieldset, comboBox );
       
      }
else
      document.body.insertBefore(division, document.body.firstChild);
      



document.getElementsByTagName('head')[0].innerHTML += "<style> #rosso { color: red; } #blu { color: blu; } </style>";



if (scholar) {
    document.getElementsByTagName('head')[0].innerHTML += "<style> #scholar {font-size:80%} </style>";
} else {
    document.getElementsByTagName('head')[0].innerHTML += "<style> #scholar {text-align:left} </style>";
}


  document.getElementsByTagName('head')[0].innerHTML += "<style> \
                         fieldset { border: 0px solid #000000; } \
                         lnk {  position:relative; \
                                z-index:24; \
                                text-decoration: none}\
                                lnk:hover { background-color: lightgreen; z-index: 25 } \
                                lnk span {display: none} \
                                lnk:hover span{ \
                                display: block; position:absolute; font-weight:normal; \
                                top: 1em; left: 1em; width: 8em; padding: 2px 2px 3px 3px;\
                                border: 1px solid #000; background-color: #cff; color:#000;\
                                text-align: left} \
                                lnk a{ text-decoration: none; color: inherit } \
                                </style>";

