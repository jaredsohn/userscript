// ==UserScript==
// @name           Investools Toolbox Menu Bar
// @namespace      Namespace
// @description    Adds watchlist to the menu bar
// @include        http://toolbox.investools.com/*
// ==/UserScript==

//
DivNode = document.getElementById('pageTitle');
anchor = DivNode.childNodes[1].childNodes[7];
PageType = anchor.innerHTML;
span = DivNode.childNodes[1].childNodes[11];
PageTitle = span.innerHTML;

if(PageType.search(/Portfolio/) != -1)
  if(PageTitle.search(/Watch Lists/) != -1)
  {
    PortfolioClass = '';
    WatchlistClass = 'selected';
  }
  else
  {
    PortfolioClass = 'selected';
    WatchlistClass = '';
  }
else
{
  PortfolioClass = '';
  WatchlistClass = '';
}

// Create menu divider
TableCellDivider = document.createElement("td");
TableCellDivider.setAttribute("width","10");
TableCellDivider.setAttribute("align","center");
TableCellDivider.innerHTML = "<b>|</b>";

// Create menu selection (watchlist)
TableCellWatchlist = document.createElement("td");
TableCellWatchlist.setAttribute("align","center");
anchor = document.createElement("a");
anchor.setAttribute("href","http://toolbox.investools.com/portfolio/watchlist.iedu");
anchor.className = WatchlistClass;
anchor.innerHTML = "Watch Lists";
TableCellWatchlist.appendChild(anchor);


TableNodeList = document.getElementsByTagName('table');

for(i = 0; i < TableNodeList.length; i++)
  if(TableNodeList[i].id == 'topLink')
    Table = TableNodeList[i];

TableBody = Table.firstChild.nextSibling;
TableRow = TableBody.firstChild;
TableCell = TableRow.childNodes[8];

// Reset the color of the Portfolio link if on watchlists
PortfolioLink = TableRow.childNodes[5].childNodes[1];
PortfolioLink.className = PortfolioClass;

TableRow.insertBefore(TableCellWatchlist,TableCell);
TableRow.insertBefore(TableCellDivider,TableCell);

