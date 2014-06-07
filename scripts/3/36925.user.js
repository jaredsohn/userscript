// ==UserScript==
// @author         foobla
// @version        0.02
// @name           googlebilingual
// @description    Adds english google hits to your result
// @include        http://www.google.tld/search?*
// ==/UserScript==

document.getElementByXPath = function(XPath, contextNode)
{
  var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  return (a.snapshotLength ? a.snapshotItem(0) : null);
};

document.getElementsByXPath = function(XPath, contextNode)
{
  var ret=[], i=0;
  var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  while(a.snapshotItem(i)){
    ret.push(a.snapshotItem(i++));
  }
  return ret;
};

function addEnglish(responseText)
{
  var navbar = document.getElementByXPath("//*[@id='navbar' or @id='nav']");
  var nextResult = navbar.appendChild(document.createElement('div'));
  nextResult.style.display = "none";
  nextResult.innerHTML = responseText;
  var list = document.getElementsByXPath(".//div[@id='res']/div//li[@class='g'] | .//div[@id='res']/div//li/div[@class='g']", nextResult);
  for (var i = 0; i < list.length; i++){
    resultsToTable(list, i, 1);
  }
}

function buildResultTable()
{
       
  hue = "transparent";
  BGBorder = "background-color:";
  addStyle("@namespace url(http://www.w3.org/1999/xhtml); .ta, .ra, #mbEnd, #tads { display: none !important; } #GoogleTabledResults {width: 100%};");
  addStyle("@namespace url(http://www.w3.org/1999/xhtml); a:visited {color:#AAAA8B !important;} li.g, div.g { margin-top: 0.15em !important; margin-right: 0.25em !important; margin-bottom: 0.15em !important; margin-left: 0.25em; -moz-border-radius: 10px ! important; " + BGBorder + " "+ hue +" ! important; padding: 0.5em ! important; } li.g {list-style-image:none;list-style-position:outside;list-style-type:none;");
		
  var table = document.createElement("table");
  resultsTable=table;
  table.setAttribute("id", "GoogleTabledResults");
  table.setAttribute("cellspacing", "5%");
  table.setAttribute("cellpadding", "0");

  var div = document.getElementByXPath("//div/div[@class='g']/parent::div | //div[@id='res']/div");
  if(div){
    div.parentNode.appendChild(table);
    var list = document.getElementsByXPath("//div//li[@class='g'] | //div//li/div[@class='g']");
    for (var i = 0; i < list.length; i++){
      resultsToTable(list, i, 0);
    }
  }

  var nextLink = document.getElementByXPath("//table[@id='nav']//td[@class='b'][2]/a");
  if(nextLink){

    var href = nextLink.href;
    query = href.substr(href.indexOf("?"));
    startNumber = (query.match(/start=(\d*)/))[1] - 0;
    var tmp = this.query.match(/num=(\d*)/);
    numResults = tmp ? (tmp[1] - 0)  : 10;
    searchstart = query.indexOf("q=");
    searchstop = query.indexOf("&start");
    query = query.substring(searchstart+2, searchstop);
    query = query+"&hl=en"+"&num="+numResults+"&start="+(startNumber-numResults);//"&meta=lr%3Dlang_de";
	  
  }

  GM_xmlhttpRequest({
    method :"GET",
    url :"http://www.google.com/search?q="+query,
    onload :function(xhr) { addEnglish(xhr.responseText); }
  });
}

function resultsToTable(list, i, col)
{
  var link = list[i];

  if(col == 0)
    currentRow = resultsTable.insertRow(i);
  else{
    currentRow = resultsTable.rows[i];
  }
       
  var cell = currentRow.insertCell(col);
  cell.setAttribute("valign", "top");
  var cellWidth = "50%";
  cell.setAttribute("width", cellWidth);

  cell.appendChild(link);
}
    
function addStyle(css)
{
  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
  } else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.innerHTML = css;
      heads[0].appendChild(node); 
    }
  }
}

buildResultTable();
