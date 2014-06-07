// ==UserScript==
// @name           BWW tool cart
// @namespace      http://www.bww.com/tools
// @description    Add cart feature to BWW tools listings.
// @include        http://www.bww.com/Community/Tools/BSM_Catalog/Search/ToolSearchResults.aspx*
// ==/UserScript==

// created by sdsouza for IBOs world wide!  05-01-2006

function addQtyColumn()
{
  //
  // add column to table header
  //
  var searchResultHeaderRow = document.evaluate(
      "//table[@id='tblResults']/tbody/tr[@class='searchresulttop']",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null).snapshotItem(0);

  var newCell = document.createElement('td');
  newCell.innerHTML = 'Qty';
  searchResultHeaderRow.insertBefore(newCell, searchResultHeaderRow.firstChild);

  //
  // bugfix: last row is missing the class attribute
  //
  var searchResultRows = document.evaluate(
      "//table[@id='tblResults']/tbody/tr",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);
  var lastSearchResultRow = searchResultRows.snapshotItem(searchResultRows.snapshotLength-1);
  lastSearchResultRow.setAttribute("class", "searchresultrow"); 

  //
  // add columns to table rows 
  //
  searchResultRows = document.evaluate(
      "//table[@id='tblResults']/tbody/tr[@class='searchresultrow']",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);
  for (var i = 0; i < searchResultRows.snapshotLength; i++) 
  {
    var searchResultRow = searchResultRows.snapshotItem(i);
    newCell = document.createElement('td');
    newCell.setAttribute("class", "searchresultrow");
    newInput = document.createElement('input'); 
    newInput.setAttribute("type", "text");
    newInput.setAttribute("size", "1");
    newInput.setAttribute("id", "itemQuantity");
    newCell.appendChild(newInput);
    searchResultRow.insertBefore(newCell, searchResultRow.firstChild);
  }
}

//
// migrates link from sku & title columns to new info column
//
function addInfoColumn()
{
  //
  // add info column to table header
  //
  var searchResultHeaderRow = document.evaluate(
      "//table[@id='tblResults']/tbody/tr[@class='searchresulttop']",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null).snapshotItem(0);

  var newCell = document.createElement('td');
  newCell.innerHTML = 'Info';
  searchResultHeaderRow.appendChild(newCell);
  //
  // add info to table rows and migrate info links
  //
  var searchResultRows = document.evaluate(
      "//table[@id='tblResults']/tbody/tr[@class='searchresultrow']",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);
  for (var i = 0; i < searchResultRows.snapshotLength; i++) 
  {
    var searchResultRow = searchResultRows.snapshotItem(i);
    var tableColumnNodes = searchResultRow.getElementsByTagName("td");

    // get link target
    var link = tableColumnNodes.item(1).firstChild.href;

    // replace link nodes with text nodes
    var sku = document.createTextNode(tableColumnNodes.item(1).textContent);
    tableColumnNodes.item(1).replaceChild(sku, tableColumnNodes.item(1).firstChild);

    // multiple titles have multiple links (same href)
    var titleLinks = tableColumnNodes.item(2).getElementsByTagName("a");
    while (titleLinks.length > 0)
    {
      var linkNode = titleLinks.item(0);
      var title = document.createTextNode(linkNode.textContent);
      tableColumnNodes.item(2).replaceChild(title, linkNode); 
    }

    // add link node as trailing column
    var newCell = document.createElement('td');
    var newLink = document.createElement('a');
    var newText = document.createTextNode('info');
    newLink.href = link;
    newLink.appendChild(newText);
    newCell.appendChild(newLink);
    searchResultRow.appendChild(newCell); 
  }
}

function addCheckoutButton()
{
  var searchResultBody = document.evaluate(
      "//table[@id='tblResults']/tbody",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null).snapshotItem(0);
  
  var newRow = document.createElement('tr');

  var newCell = document.createElement('td');
  newCell.setAttribute("colspan", searchResultBody.firstChild.cells.length);
  newRow.appendChild(newCell);

  var newButton = document.createElement('button');
  newButton.setAttribute("id", "checkoutButton");
  newButton.innerHTML = "checkout";
  newButton.addEventListener('click', checkout, true );
  newCell.appendChild(newButton);

  newButton = document.createElement('button');
  newButton.setAttribute("id", "resetButton");
  newButton.innerHTML = "reset";
  newButton.addEventListener('click', reset, true );
  newCell.appendChild(newButton);
        
  searchResultBody.insertBefore(newRow, searchResultBody.lastChild);
}

function reset(event)
{
  var checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.innerHTML = "checkout";
  var checkoutTable = document.getElementById("tblCheckoutResults");
  if (checkoutTable)
  {
	checkoutTable.parentNode.removeChild(checkoutTable);
  }

  var searchResultRowQuantities = document.evaluate(
      "//input[@id='itemQuantity']",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);
  for (var i=0; i<searchResultRowQuantities.snapshotLength; i++)
  {
     var inputItem = searchResultRowQuantities.snapshotItem(i);
     inputItem.value = "";
  }
}

function checkout(event)
{
  var checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.innerHTML = "update";

  var checkoutTable = document.getElementById("tblCheckoutResults");
  if (checkoutTable)
  {
	checkoutTable.parentNode.removeChild(checkoutTable);
  }

  var searchResultTable = document.evaluate(
      "//table[@id='tblResults']",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null).snapshotItem(0);

  var searchResultHeaderCells = document.evaluate(
      "//table[@id='tblResults']/tbody/tr[@class='searchresulttop']/td", 
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);

  var searchResultRows = document.evaluate(
      "//table[@id='tblResults']/tbody/tr[@class='searchresultrow']",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);

  var colspan = searchResultRows.snapshotItem(0).cells.length;

  var searchResultRowQuantities = document.evaluate(
      "//input[@id='itemQuantity']",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);

  // generate checkout table
  var newTable = document.createElement("table");
  newTable.setAttribute("width", searchResultTable.width); 
  newTable.setAttribute("cellpadding", searchResultTable.cellPadding); 
  newTable.setAttribute("border", searchResultTable.border); 
  newTable.setAttribute("id", "tblCheckoutResults");

  var newTBody = document.createElement("tbody");
  newTable.appendChild(newTBody);

  var newTableRow = document.createElement("tr");
  newTableRow.setAttribute("class", "searchresulttop"); 
  newTBody.appendChild(newTableRow);

  for (var i = 0; i < searchResultHeaderCells.snapshotLength; i++) 
  {
    if ( i == 6 ) continue; // skip info column
    var newTableCell = document.createElement("td");
    newTableCell.appendChild(document.createTextNode(searchResultHeaderCells.snapshotItem(i).textContent));
    newTableRow.appendChild(newTableCell);
  }

  var newTableCell = document.createElement("td");
  newTableCell.appendChild(document.createTextNode("Taxable"));
  newTableRow.appendChild(newTableCell);

  var totalQty = new Number(0);
  var subTotal = new Number(0);
  var taxableTotal = new Number(0);
  
  for (var i = 0; i < searchResultRowQuantities.snapshotLength; i++) 
  {
    var qty = parseInt(searchResultRowQuantities.snapshotItem(i).value);
    if ( qty > 0 )
    {
      var newTableRow = document.createElement("tr");
      newTableRow.setAttribute("class", "searchresultrow");
      newTableRow.setAttribute("bgcolor", (i % 2 == 0 ? "#ffffff" : "#ededed"));
 
      var tableRow = searchResultRows.snapshotItem(i);
      var tableColumns = tableRow.cells;

      var sku = tableColumns.item(1).textContent;
      var title = tableColumns.item(2).textContent;
      var speakers = tableColumns.item(3).textContent;
      var price = parseFloat(tableColumns.item(4).textContent.replace("$", ""));
      var type = tableColumns.item(5).textContent;

      totalQty += qty;
      var itemSubTotal = Math.round(price * qty * 100)/100;
      subTotal += itemSubTotal;
      subTotal = Math.round(subTotal * 100) / 100;

      for (var j = 0; j < colspan + 1; j++)
      {
        if ( j == 6 ) continue; // skip info column
        var newTableCell = document.createElement("td");
        var newTableCellText;
        if ( j == colspan )
        {
          var type = tableColumns.item(5).textContent;
          var taxedType = false;
          for (var k=0; k < taxableTypes.length; k++)
          {
	     if (taxableTypes[k].indexOf(type) != -1)
	     {
		taxedType = true;
		break;	
	     }
          } 
          taxableTotal += (taxedType ? itemSubTotal : 0);
          newTableCellText = document.createTextNode((taxedType ? "T" : ""));
          newTableCell.setAttribute("align", "center");
        }
        else
        {
          newTableCellText = document.createTextNode((j == 0 ? qty : tableColumns.item(j).textContent));
          newTableCell.setAttribute("align", (j == 4 ? "right" : "left"));
        }
        newTableCell.appendChild(newTableCellText); 
        newTableRow.appendChild(newTableCell);
      }

      newTBody.appendChild(newTableRow);
    }
  }
  var totalTax = Math.round(taxableTotal * taxRate )/100;
  var total = Math.round((totalTax + subTotal) * 100)/100;

  // 
  // checkout table footer
  // 
  var newTableRow = document.createElement("tr");
  newTableRow.setAttribute("class", "searchresulttop");

  // total quantity
  var newTableCell = document.createElement("td");
  var newBold = document.createElement("b");
  newBold.appendChild(document.createTextNode(totalQty));
  newTableCell.appendChild(newBold);
  newTableRow.appendChild(newTableCell); 

  // empty cells
  newTableCell = document.createElement("td");
  newTableCell.setAttribute("colspan", 3);
  newTableCell.appendChild(document.createTextNode(""));
  newTableRow.appendChild(newTableCell); 

  // subtotal
  newTableCell = document.createElement("td");
  newTableCell.setAttribute("align", "right");
  subTotal = new String(subTotal);
  subTotal = (subTotal.indexOf(".") == -1 ? subTotal + ".00" : subTotal);
  subTotal = (subTotal.indexOf(".") + 3 != subTotal.length ? subTotal + "0" : subTotal);
  subTotal = "$" + subTotal;
  newBold = document.createElement("b");
  newBold.appendChild(document.createTextNode(subTotal));
  newTableCell.appendChild(newBold);
  newTableRow.appendChild(newTableCell); 

  // "Subtotal"
  newTableCell = document.createElement("td");
  newTableCell.setAttribute("colspan", 2);
  newBold = document.createElement("b");
  newBold.appendChild(document.createTextNode("Subtotal"));
  newTableCell.appendChild(newBold);
  newTableRow.appendChild(newTableCell); 

  newTable.appendChild(newTableRow);

  newTableRow = document.createElement("tr");
  newTableRow.setAttribute("class", "searchresulttop");

  // empty cells
  newTableCell = document.createElement("td");
  newTableCell.setAttribute("colspan", 4);
  newTableCell.appendChild(document.createTextNode(""));
  newTableRow.appendChild(newTableCell); 

  // total tax
  newTableCell = document.createElement("td");
  newTableCell.setAttribute("align", "right");
  totalTax = new String(totalTax);
  totalTax = (totalTax.indexOf(".") == -1 ? totalTax + ".00" : totalTax);
  totalTax = (totalTax.indexOf(".") + 3 != totalTax.length ? totalTax + "0" : totalTax);
  totalTax = "$" + totalTax;
  newBold = document.createElement("b");
  newBold.appendChild(document.createTextNode(totalTax));
  newTableCell.appendChild(newBold);
  newTableRow.appendChild(newTableCell); 

  // "Total Tax"
  newTableCell = document.createElement("td");
  newTableCell.setAttribute("colspan", 2);
  newBold = document.createElement("b");
  newBold.appendChild(document.createTextNode("Total Tax (" + taxRate + "%)"));
  newTableCell.appendChild(newBold);
  newTableRow.appendChild(newTableCell); 

  newTable.appendChild(newTableRow);

  newTableRow = document.createElement("tr");
  newTableRow.setAttribute("class", "searchresulttop");

  // empty cells
  newTableCell = document.createElement("td");
  newTableCell.setAttribute("colspan", 4);
  newTableCell.appendChild(document.createTextNode(""));
  newTableRow.appendChild(newTableCell); 

  // total 
  newTableCell = document.createElement("td");
  newTableCell.setAttribute("align", "right");
  total = new String(total);
  total = (total.indexOf(".") == -1 ? total + ".00" : total);
  total = (total.indexOf(".") + 3 != total.length ? total + "0" : total);
  total = "$" + total;
  newBold = document.createElement("b");
  newBold.appendChild(document.createTextNode(total));
  newTableCell.appendChild(newBold);
  newTableRow.appendChild(newTableCell); 

  // "Total"
  newTableCell = document.createElement("td");
  newTableCell.setAttribute("colspan", 2);
  newBold = document.createElement("b");
  newBold.appendChild(document.createTextNode("Total"));
  newTableCell.appendChild(newBold);
  newTableRow.appendChild(newTableCell); 

  newTable.appendChild(newTableRow);

  searchResultTable.parentNode.insertBefore(newTable, searchResultTable.nextSibling);
}

var taxableTypes = ['Audio CD', 'Audio Tape', 'Literature & Misc', 'Video Tape', 'Video DVD', 'Multimedia CD'];

var taxRate = 8.375; 

addQtyColumn();

addInfoColumn();

addCheckoutButton();


