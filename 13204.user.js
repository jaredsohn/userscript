// ==UserScript==
// @name           Investools ProSearch
// @namespace      Namespace
// @description    Modify links in the search result
// @include        http://toolbox.investools.com/prosearch/*
// ==/UserScript==

document.getElementById('resultSize').nextSibling.firstChild.innerHTML = "Download Results to CSV File";

/**********************************************************************
 *
 *  Function to grab a specific element with a spedific class name
 *
 **********************************************************************/
function getElementByClassName(element,className)
{
  AllElements = document.getElementsByTagName(element);

  for(k = 0; k < AllElements.length; k++)
    if(AllElements[k].getAttribute('class') == className)
      return AllElements[k];
}

count = 0;
var anchor;
var symbol;
var industry;
var url;

// Determine if this is a stock search page or an option search page
SearchType = getElementByClassName('span','pagetitle');
SearchType = SearchType.firstChild.data;
if(SearchType.search(/stock/i) == -1)
{ // Stock search
  StockSearch = false;
  OptionSearch = true;
}
else
{ // Option search
  StockSearch = true;
  OptionSearch = false;
}

/* Determine how many stocks are listed on the search page **************/
CounterString = document.getElementById('resultSize').firstChild.data
if(CounterString.length == 23)
  NumOfStocks = eval(CounterString.substr(4,2));
else
  NumOfStocks = eval(CounterString.substr(4,3));


/* Determine how many thumbnails per row ********************************/
ThumbnailCounterSelect = document.getElementById('chartsPerRowSel');
ThumbnailCounterOption = ThumbnailCounterSelect.firstChild.nextSibling;
while(ThumbnailCounterOption.getAttribute('selected') == null)
{
  NextCounterOption = ThumbnailCounterOption.nextSibling.nextSibling;
  ThumbnailCounterOption = NextCounterOption;
}
ThumbnailPerRow = eval(ThumbnailCounterOption.getAttribute('value'));


/* Calculate Total Number of Rows for both views ************************/
NonThumbnailRows = NumOfStocks;
BaseNumOfThumbnailRows = Math.floor(NumOfStocks/ThumbnailPerRow);
if(NumOfStocks % ThumbnailPerRow)
  ThumbnailRows = BaseNumOfThumbnailRows + 1;
else
  ThumbnailRows = BaseNumOfThumbnailRows;

TotalNumRows = NonThumbnailRows + ThumbnailRows;


/* Determine if view with or without thumbnails *************************/
Thumbnails = document.getElementById('chk_chartsOn').checked;

/******************************************************************************/
/******************************************************************************/

if(StockSearch) // If the results are for a stock search not an option search
{
  TableNode = document.getElementById('resultsBody');

  for(i = 0; i <= TotalNumRows; i++)
  {
    if(i == 0)
      TableRow = TableNode.firstChild.nextSibling;
    else if(i == TotalNumRows)
      TableRow = null;
    else
    {
      TableRow = TableRow.nextSibling;
      if(TableRow.nodeName == '#text')
        TableRow = TableRow.nextSibling;
    }

    if(TableRow != null)
    {
      if(TableRow.className != 'chartRow') // Non-Thumbnail Portion
      {
        symbol = TableRow.id;

        // Industry
        anchor = document.getElementById("Industry_"+symbol).firstChild.nextSibling;
        industry = anchor.firstChild.data;
        url="http://toolbox.investools.com/graphs/snapshot.iedu?symbol="+industry;
        anchor.setAttribute('href',url);

        // Stock Symbol
        anchor = document.getElementById("Symbol_"+symbol).firstChild.nextSibling.nextSibling.firstChild;
        url = "http://toolbox.investools.com/graphs/snapshot.iedu?symbol="+symbol;
        anchor.setAttribute('href',url);

        // Stock Options
        anchor = document.getElementById("Options_"+symbol).firstChild.nextSibling;
        if(anchor != null) // Must consider that not all stocks have options
        {
          url = "http://toolbox.investools.com/graphs/option/greeks.iedu?symbol="+symbol;
          anchor.setAttribute('href',url);
        }        
      }
      else // Thumbnail Portion
      {
        Cell = TableRow.firstChild.firstChild.firstChild.firstChild.firstChild;

        for(j = 1; j <= 3; j++)
        {
          if(Cell != null)
          {
          symbol = Cell.id.replace(/chart/i,'');

          // Stock Symbol
          Checkbox = document.getElementById("g_r_"+symbol);
          anchor = Checkbox.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild;
          url = "http://toolbox.investools.com/graphs/snapshot.iedu?symbol="+symbol;
          anchor.setAttribute('href',url);

          // Stock Options
          Checkbox = document.getElementById("g_r_"+symbol);
          ContainingTable = Checkbox.parentNode.parentNode.parentNode.parentNode;
          ContainingRow = ContainingTable.parentNode.parentNode;
          NextRow = ContainingRow.nextSibling.nextSibling;
          LastCell = NextRow.firstChild.nextSibling.nextSibling.nextSibling.nextSibling;
              LastCell = LastCell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;

          anchor = LastCell.firstChild.nextSibling;
          url = "http://toolbox.investools.com/graphs/option/greeks.iedu?symbol="+symbol;
          if(anchor != null)
            anchor.setAttribute('href',url);
          
          Cell = Cell.nextSibling; // Get the next chart block in the row
          }
        }
      }
    }
  } 
}
else // If the results are for a option search not an stock search
{
  alert('here');
}




