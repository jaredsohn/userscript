// ==UserScript==
// @name          Location-Ripper Version 1.0
// @namespace     http://www.michael-richter.de
// @description	  Splits the Location-String up into its parts and parameters
// @include       *
// ==/UserScript==

GM_registerMenuCommand( "Location Ripper", LocationRipping, "d", "shift strg", "d" );

function LocationRipping()
{
var LCR_URL_COMPLETE      = document.URL;
var LCR_VERSION_OFFLINE   = "1.0";
var LCR_PARAM_BEGINN      = LCR_URL_COMPLETE.indexOf("?");
var LCR_WOTSESSION_BEGINN = LCR_URL_COMPLETE.indexOf(";WOTSession");
var LCR_WOT_SESSION       = "";
var LCR_URL_DATASET       = new Array();
var LCR_DATAROW           = new Array();

if (LCR_PARAM_BEGINN != -1)
{	
  LCR_QUERYSTRING = LCR_URL_COMPLETE.substring(LCR_PARAM_BEGINN+1,LCR_URL_COMPLETE.length);
  LCR_URL_NO_PARAMS = LCR_URL_COMPLETE.substring(0,LCR_PARAM_BEGINN);
 	LCR_URL_DATASET = LCR_QUERYSTRING.split("&");
}
else
{
  LCR_URL_NO_PARAMS = LCR_URL_COMPLETE;
}

if (LCR_WOTSESSION_BEGINN != -1)
{
    LCR_WOT_SESSION   = LCR_URL_NO_PARAMS.substring(LCR_WOTSESSION_BEGINN+12,LCR_URL_NO_PARAMS.length);
    LCR_URL_NO_PARAMS = LCR_URL_NO_PARAMS.substring(0, LCR_WOTSESSION_BEGINN);
}

for (var i=0; i < LCR_URL_DATASET.length; ++i)
{   
    LCR_DATAROW[i]    = new Array();
    LCR_TEMP_ARRAY    = LCR_URL_DATASET[i].split("=");
    LCR_DATAROW[i][0] = LCR_TEMP_ARRAY[0];
    LCR_DATAROW[i][1] = (LCR_TEMP_ARRAY[1])? LCR_TEMP_ARRAY[1] : "";
    LCR_DATAROW[i][2] = (LCR_TEMP_ARRAY[1])? LCR_TEMP_ARRAY[1].length : "0";
}





    var body = document.getElementsByTagName("body")[0];


    var scripte = document.createElement("script");
        scripte.setAttribute("type","text/javascript");
        scripte.setAttribute("id","LCRScripte");
        scripte.appendChild(document.createTextNode("var active_object = null;var start_x = 0;var start_y = 0;document.onmousemove = start_moving;document.onmouseup   = stop_moving; var mouse_x = 0;var mouse_y = 0;"));

        scripte.appendChild(document.createTextNode("function prepare_move(obj) { active_object = document.getElementById(obj); start_x = mouse_x - active_object.offsetLeft; start_y = mouse_y - active_object.offsetTop;}"));
        scripte.appendChild(document.createTextNode("function stop_moving() {active_object=null;}"));
        scripte.appendChild(document.createTextNode("function start_moving(event) {mouse_x = document.all ? window.event.clientX : event.pageX;mouse_y = document.all ? window.event.clientY : event.pageY;if(active_object != null) {    active_object.style.left = (mouse_x - start_x) + 'px';    active_object.style.top = (mouse_y - start_y) + 'px';  }}"));      
        scripte.appendChild(document.createTextNode("function LCR_schliessen() { var lcr_ref = document.getElementById('LCR_WINDOW'); document.getElementsByTagName('body')[0].removeChild(lcr_ref); var lcr_ref = document.getElementById('LCRScripte'); document.getElementsByTagName('body')[0].removeChild(lcr_ref);}"));
        
        body.appendChild(scripte);

	   
    
    
    var newElement = document.createElement("div");
    
    var id = document.createAttribute("id");
        id.nodeValue = "LCR_WINDOW";
        
    newElement.setAttributeNode(id);
    newElement.style.zIndex='999999';
    newElement.style.position='absolute';
    newElement.style.top='200px';
    newElement.style.left='700px';
    newElement.style.fontFamily='arial';
    newElement.style.fontSize='8pt';
   

    
    var table1 = document.createElement("table");
        table1.setAttribute("bgcolor","#000000");
        table1.setAttribute("cellpadding","0");
        table1.setAttribute("cellspacing","1");
        table1.setAttribute("width","450px");
    
    
    newElement.appendChild(table1);
    
    var row1table1 = document.createElement("tr");
    table1.appendChild(row1table1);
    
    var cell1row1table1 = document.createElement("td");
    row1table1.appendChild(cell1row1table1);
    
    
    var table2 = document.createElement("table");
        table2.setAttribute("bgcolor","#dddddd");
        table2.setAttribute("cellpadding","2");
        table2.setAttribute("cellspacing","0");
        table2.setAttribute("valign","middle");
        table2.setAttribute("align","center");
        table2.setAttribute("width","100%");
    
    cell1row1table1.appendChild(table2);
    
    var row1table2 = document.createElement("tr");
    table2.appendChild(row1table2);
    
    var cell1row1table2 = document.createElement("td");
    row1table2.appendChild(cell1row1table2);
    
    
    var table3 = document.createElement("table");
        table3.setAttribute("bgcolor","#dddddd");
        table3.setAttribute("cellpadding","2");
        table3.setAttribute("cellspacing","0");
        table3.setAttribute("valign","middle");
        table3.setAttribute("align","center");
        table3.setAttribute("width","100%");
            
    
    
    cell1row1table2.appendChild(table3);
    
    var row1table3 = document.createElement("tr");
    var onmousedownRow1Table3 = document.createAttribute("onmousedown");
        onmousedownRow1Table3.nodeValue='prepare_move("LCR_WINDOW")';
        row1table3.setAttributeNode(onmousedownRow1Table3);
    
    
    table3.appendChild(row1table3);
    
    var cell1row1table3 = document.createElement("td");
    row1table3.appendChild(cell1row1table3);
    headermessage1 = document.createTextNode("Location Ripper V. 1.0");
    cell1row1table3.appendChild(headermessage1);
    cell1row1table3.style.fontSize='8pt';
    cell1row1table3.style.fontWeight='bold';
    
    var cell2row1table3 = document.createElement("td");
        cell2row1table3.setAttribute("align","right");
    row1table3.appendChild(cell2row1table3);
     
    
    var table4 = document.createElement("table");
        table4.setAttribute("bgcolor","#000000");
        table4.setAttribute("cellpadding","1");
        table4.setAttribute("cellspacing","0");
        table4.setAttribute("widht","100%");
    
    cell2row1table3.appendChild(table4);
    
    var row1table4 = document.createElement("tr");
    table4.appendChild(row1table4);
    
    var cell1row1table4 = document.createElement("td");
        cell1row1table4.setAttribute("align","right");

    row1table4.appendChild(cell1row1table4);
    
    var table5 = document.createElement("table");
        table5.setAttribute("bgcolor","#dddddd");
        table5.setAttribute("cellpadding","0");
        table5.setAttribute("cellspacing","0");
        table5.setAttribute("valign","middle");
        table5.setAttribute("align","right");
        table5.setAttribute("width","100%");

    
    
   cell1row1table4.appendChild(table5);
    
   var row1table5 = document.createElement("tr");
    table5.appendChild(row1table5);
    
    var cell1row1table5 = document.createElement("td");
    row1table5.appendChild(cell1row1table5); 
    
    schliessenLink = document.createElement("a");
    
    var onclickRow1Table3 = document.createAttribute("onclick");
        onclickRow1Table3.nodeValue='LCR_schliessen()';
        schliessenLink.setAttributeNode(onclickRow1Table3);
    
    var onmouseoverRow1Table3 = document.createAttribute("onmouseover");
        onmouseoverRow1Table3.nodeValue='this.style.cursor="pointer"';
        row1table5.setAttributeNode(onmouseoverRow1Table3);
        
    var onmouseoutRow1Table3 = document.createAttribute("onmouseout");
        onmouseoutRow1Table3.nodeValue='this.style.cursor="pointer"';
        row1table5.setAttributeNode(onmouseoutRow1Table3);
        
    schliessenLink.appendChild(document.createTextNode("\u00A0x\u00A0"));
    
    cell1row1table5.style.fontSize='8pt';
    cell1row1table5.setAttribute("valign","middle");
    cell1row1table5.setAttribute("align","right");
    
    cell1row1table5.appendChild(schliessenLink);
    
    var row2table3 = document.createElement("tr");
    table3.appendChild(row2table3);
    
    var cell1row2table3 = document.createElement("td");
        cell1row2table3.setAttribute("bgcolor","#eeeeee");
        cell1row2table3.setAttribute("colspan","2");
   
    row2table3.appendChild(cell1row2table3); 
  
    
    var table6 = document.createElement("table");
        table6.setAttribute("cellpadding","2");
        table6.setAttribute("cellspacing","2");
        table6.setAttribute("width","100%");

    
    cell1row2table3.appendChild(table6); 
    
    //ÜBERSCHRIFT ==============================================================
    //var row1table6 = document.createElement("tr");
    //table6.appendChild(row1table6);
    //var cell1row1table6 = document.createElement("td");
    //var colspan116              = document.createAttribute("colspan");
    //    colspan116.nodeValue    = "3";
    //    cell1row1table6.setAttributeNode(colspan116);
    
    //row1table6.appendChild(cell1row1table6);
    //cell1row1table6.appendChild(document.createTextNode("Location"));
    //cell1row1table6.style.fontSize='8pt';
    //cell1row1table6.style.fontWeight='bold';
   
    //URL ======================================================================
    var row2table6 = document.createElement("tr");
    table6.appendChild(row2table6);
    var cell1row2table6 = document.createElement("td");
    row2table6.appendChild(cell1row2table6);
    cell1row2table6.appendChild(document.createTextNode("URL"));
    cell1row2table6.style.fontSize='8pt';
    cell1row2table6.style.fontWeight='bold';
    var cell2row2table6 = document.createElement("td");
        cell2row2table6.setAttribute("colspan","2");
    row2table6.appendChild(cell2row2table6);
    cell2row2table6.appendChild(document.createTextNode(LCR_URL_NO_PARAMS));
    cell2row2table6.style.fontSize='8pt';
    
    
    //SESSION ==================================================================
    if (LCR_WOTSESSION_BEGINN != -1)
    {
        var row3table6 = document.createElement("tr");
        table6.appendChild(row3table6);
        var cell1row3table6 = document.createElement("td");
        row3table6.appendChild(cell1row3table6);
        cell1row3table6.appendChild(document.createTextNode("WOTSession"));
        cell1row3table6.style.fontSize='8pt';
        cell1row3table6.style.fontWeight='bold';
        var cell2row3table6 = document.createElement("td");
            cell2row3table6.setAttribute("colspan","2");
        row3table6.appendChild(cell2row3table6);
        cell2row3table6.appendChild(document.createTextNode(LCR_WOT_SESSION));
        cell2row3table6.style.fontSize='8pt';
    }

    //ÜBERSCHRIFTEN ============================================================
    var row4table6 = document.createElement("tr");
        row4table6.setAttribute("bgcolor","#d6d6d6");
    table6.appendChild(row4table6);
    var cell1row4table6 = document.createElement("td");
    row4table6.appendChild(cell1row4table6);
    cell1row4table6.appendChild(document.createTextNode("Parameter"));
    cell1row4table6.style.fontSize='8pt';
    cell1row4table6.style.fontWeight='bold';
    var cell2row4table6 = document.createElement("td");
    row4table6.appendChild(cell2row4table6);
    cell2row4table6.appendChild(document.createTextNode("Value"));
    cell2row4table6.style.fontSize='8pt';
    cell2row4table6.style.fontWeight='bold';
    var cell3row4table6 = document.createElement("td");
        cell3row4table6.setAttribute("width","50px");
    row4table6.appendChild(cell3row4table6);
    cell3row4table6.appendChild(document.createTextNode("Length"));
    cell3row4table6.style.fontSize='8pt';
    cell3row4table6.style.fontWeight='bold';

    //Einträge =================================================================
    if (LCR_DATAROW.length > 0)
    {
        for (var i=0; i < LCR_DATAROW.length; ++i)
        {    
            a = document.createElement("tr");
            a.setAttribute("bgcolor","#dadada");
            table6.appendChild(a);	
            b = document.createElement("td");
            a.appendChild(b);
            b.appendChild(document.createTextNode(LCR_DATAROW[i][0]));
            b.style.fontSize='8pt';	
            c = document.createElement("td");
            a.appendChild(c);
            c.appendChild(document.createTextNode(LCR_DATAROW[i][1]));
            c.style.fontSize='8pt';	
            d = document.createElement("td");
            d.setAttribute("align","right");
            a.appendChild(d);
            d.appendChild(document.createTextNode(LCR_DATAROW[i][2]));
            d.style.fontSize='8pt';		 
        }
    }
    else
    {
            a = document.createElement("tr");
            a.setAttribute("bgcolor","#dadada");
            table6.appendChild(a);	
            b = document.createElement("td");
            b.setAttribute("colspan","3");
            a.appendChild(b);
            b.appendChild(document.createTextNode("No Parameters found!"));
            b.style.fontSize='8pt';	
            
    }

    //FOOTER ======================================================================
    var row2table6 = document.createElement("tr");
    table6.appendChild(row2table6);
    var cell1row2table6 = document.createElement("td");
    cell1row2table6.setAttribute("colspan","3");
    cell1row2table6.setAttribute("align","right");
    row2table6.appendChild(cell1row2table6);
    footermessage1 = document.createTextNode("Send Questions, Comments and Bugs to\u00A0");
    cell1row2table6.appendChild(footermessage1);
    footermessage2 = document.createElement('a');
    footermessage2.setAttribute('href', 'mailto:mrjs@arcor.de?subject=LocationRipper');
    footermessage2.appendChild(document.createTextNode("Michael Richter"));
    cell1row2table6.appendChild(footermessage2);
    cell1row2table6.style.fontSize='8pt';
    cell1row2table6.style.fontStyle='italic';    

    body.appendChild(newElement);

//CHECK UPDATE MOZILLA==========================================================   
GM_xmlhttpRequest(
{
  method: 'GET',
  url: 'http://184184.vserver.de/HPMR/LocationRipper/lcr_version.xml',
  headers: 
  {
      'User-agent': 'Mozilla/4.0 (compatible) LocationRipper',
      'Accept': 'application/atom+xml,application/xml,text/xml',
  },
  onload: function(responseDetails) 
          {
              if (responseDetails.status == 200) 
              {
                  var LCR_PARSER         = new DOMParser();
                  var LCR_XML_DOM        = LCR_PARSER.parseFromString(responseDetails.responseText, "application/xml");
                  var LCR_VERSION_NODE   = LCR_XML_DOM.getElementsByTagName("LCR_VERSION").item(0);
                  var LCR_VERSION_ONLINE = LCR_VERSION_NODE.firstChild.data;
                  if ((LCR_VERSION_ONLINE*1) > (LCR_VERSION_OFFLINE*1))
                  {
                      headermessage3 = document.createElement('a');
                      headermessage3.setAttribute('href', 'http://184184.vserver.de/HPMR/index.php?option=com_content&task=view&id=13&Itemid=27');
                      headermessage3.style.color ='red';
                      headermessage2 = document.createTextNode("Update available!");
                      headermessage3.appendChild(headermessage2);
                      
                      cell1row1table3.appendChild(document.createTextNode("\u00A0\u00A0\u0028\u00A0")); 
                      cell1row1table3.appendChild(headermessage3);
                      cell1row1table3.appendChild(document.createTextNode("\u00A0\u0029\u00A0"));
                  }     
              }
              else
              {
                  cell1row1table3.appendChild(document.createTextNode("no"));
              }   
          }
});
//==============================================================================   
    

    

}    
