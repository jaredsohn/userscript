// ==UserScript==
// @name           A Living Universe Trade Computer
// @namespace      http://www.crewstopia.com
// @description    A Living Universe: Analyzes the Universal Marketplace and reports on the most profitable routes.
// @include        http://www.alivinguniverse.com/UniversalMarketplace.asp?Action=BuySell*
// ==/UserScript==

// A NOTE ABOUT "Buy" and "Sell":
// These are used in the meaning they have on the Universal Market screen.
// That is, a "buy" is a offer to purchase goods, so you (the player) will be
// selling something to the vendor to complete his offered "buy" contract.

//window.alert('ALU_Trade_Computer');

var buyContracts = new Array();
var sellContracts = new Array();
var tradeRoutes = new Array();

var profitCutoff = 5000; // display only routes this profitable or better
var msgCutoff = 2000; // display only this many characters of the market report

function extractText(element)
{
   if (element.firstChild !== null)
   {
      return extractText(element.firstChild);
   }
   else
   {
      return element.nodeValue;
   }
}

function trim(s)
{
   while (s.indexOf(' ') == 0) s = s.substring(1);
   while (s.lastIndexOf(' ') == s.length - 1) s = s.substring(0, s.length - 1);
   return s;
}

// Does not calculate Bends; all that is necessary is raw distance comparison.
function distance(x1, y1, x2, y2)
{
   return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// Object for either a Buy or Sell contract.
function Contract(category, itemName, price, quantity, each, vendor, vendorX, vendorY)
{
   this.category = category;
   this.itemName = itemName;
   this.price = price;
   this.quantity = quantity;
   this.each = each;
   this.vendor = vendor;
   this.vendorX = vendorX;
   this.vendorY = vendorY;
}

// Object for a trade route.
function TradeRoute(buyContract, sellContract)
{
   if (buyContract.itemName != sellContract.itemName)
   {
      window.alert('Invalid Trade Route.  Item mismatch: ' + buyContract.itemName + ' vs. ' + sellContract.itemName);
      return null;
   }

   var quantity = Math.min(buyContract.quantity, sellContract.quantity);
   var totalProfit = quantity * (buyContract.price - sellContract.price);
   var dist = distance(buyContract.vendorX, buyContract.vendorY, sellContract.vendorX, sellContract.vendorY);

   this.buyContract = buyContract;
   this.sellContract = sellContract;
   this.itemName = buyContract.itemName;
   this.quantity = quantity;
   this.totalProfit = totalProfit;
   this.distance = dist;
}

function scanList()
{
   var allTDs = document.getElementsByTagName('TD');
   for (var ii = 0; ii < allTDs.length; ii++)
   {
      if (allTDs[ii].innerHTML.indexOf('Item(s) For Sale') != -1)
      {
         var sellTR = allTDs[ii].parentNode.nextSibling.nextSibling;
         while (sellTR.nextSibling != null && sellTR.nextSibling.nextSibling != null)
         {
            sellTR = sellTR.nextSibling.nextSibling;
            var trustworthy = true;
            for (var jj = 0; jj < sellTR.attributes.length; jj++)
            {
               if (sellTR.attributes[jj].name == 'bgcolor' && sellTR.attributes[jj].value == '#220000')
               {
                  trustworthy = false;
               }
            }
            if (! trustworthy) continue; // Untrustworthy ad, ignore.
            var category = trim(extractText(sellTR.childNodes[1]));
            var itemName = sellTR.childNodes[3].childNodes[1].innerHTML;
            var price = parseInt(extractText(sellTR.childNodes[5]));
            var quantity = parseInt(extractText(sellTR.childNodes[7]));
            var each = (sellTR.childNodes[9].innerHTML.indexOf('Each') != -1);
            var seller = trim(sellTR.childNodes[11].childNodes[1].innerHTML);
            var sellerX = parseInt(extractText(sellTR.childNodes[13]));
            var sellerY = parseInt(extractText(sellTR.childNodes[15]));
            var sellContract = new Contract(category, itemName, price, quantity, each, seller, sellerX, sellerY);
//            if (sellTR.style.backgroundColor == '#220000')
//            {
//               // Doubtful advertising
//               window.alert('Ignoring doubtful contract ' + contractSummary(sellContract);
//            }
//            else
            {
               sellContracts.push(sellContract);
            }
         }
      }

      if (allTDs[ii].innerHTML.indexOf('Item(s) Wanted') != -1)
      {
         var buyTR = allTDs[ii].parentNode.nextSibling.nextSibling;
         while (buyTR.nextSibling != null && buyTR.nextSibling.nextSibling != null)
         {
            buyTR = buyTR.nextSibling.nextSibling;
            var trustworthy = true;
            for (var jj = 0; jj < buyTR.attributes.length; jj++)
            {
               if (buyTR.attributes[jj].name == 'bgcolor' && buyTR.attributes[jj].value == '#220000')
               {
                  trustworthy = false;
               }
            }
            if (! trustworthy) continue; // Untrustworthy ad, ignore.
            var category = trim(extractText(buyTR.childNodes[1]));
            var itemName = buyTR.childNodes[3].childNodes[1].innerHTML;
            var price = parseInt(extractText(buyTR.childNodes[5]));
            var quantity = parseInt(extractText(buyTR.childNodes[7]));
            var each = (buyTR.childNodes[9].innerHTML.indexOf('Each') != -1);
            var buyer = trim(buyTR.childNodes[11].childNodes[1].innerHTML);
            var buyerX = parseInt(extractText(buyTR.childNodes[13]));
            var buyerY = parseInt(extractText(buyTR.childNodes[15]));
            var buyContract = new Contract(category, itemName, price, quantity, each, buyer, buyerX, buyerY);
//            if (buyTR.style.backgroundColor == '#220000')
//            {
//               // Doubtful advertising
//               window.alert('Ignoring doubtful contract ' + contractSummary(sellContract);
//            }
//            else
            {
               buyContracts.push(buyContract);
            }
         }
      }
   }
} // function scanList()

function sortTradeRoutes(a, b)
{
   // Profit = good, distance = bad
   return b.totalProfit - a.totalProfit - b.distance + a.distance;
}

function contractSummary(c)
{
   return c.category + '-' + c.itemName + ', price=' + c.price + ' ' + (c.each ? 'Each' : 'Lot') + ', vendor=' + c.vendor + '(' + c.vendorX + ',' + c.vendorY + ')';
}

function tradeRouteSummary(tr)
{
   return tr.sellContract.vendor + '-' + tr.buyContract.vendor + ' ' + tr.itemName + ' ' + tr.quantity + '/' + tr.sellContract.quantity + ' (buy @' + tr.sellContract.price + '/sell @' + tr.buyContract.price + '), total profit = ' + tr.totalProfit + ', dist = ' + tr.distance; // + ' (' + tr.sellContract.vendorX + ',' + tr.sellContract.vendorY + ') to (' +  tr.buyContract.vendorX + ',' + tr.buyContract.vendorY + ')';
}

function analyze()
{
   for (var ii = 0; ii < buyContracts.length; ii++)
   {
      var buy = buyContracts[ii];
      for (var jj = 0; jj < sellContracts.length; jj++)
      {
         var sell = sellContracts[jj];
         if (buy.itemName == sell.itemName)
         {
            var tradeRoute = new TradeRoute(buy, sell);
            if (tradeRoute.totalProfit > 0) tradeRoutes.push(tradeRoute);
         }
      }
   }
}

function sortAndDisplay()
{
   tradeRoutes.sort(sortTradeRoutes);

   // Filter to only the most profitable routes
   var maxProfit = (tradeRoutes.length > 0 ? (tradeRoutes[0].totalProfit > profitCutoff ? profitCutoff : tradeRoutes[0].totalProfit) : 0);
   var msg = 'No profitable trade routes found.';
   for (var ii = 0; ii < tradeRoutes.length; ii++)
   {
      var tr = tradeRoutes[ii];
      if (tr.totalProfit >= maxProfit)
      {
         if (msg == 'No profitable trade routes found.')
         {
            msg = 'Best Trade Routes:\n';
         }
         msg += tradeRouteSummary(tr) + '\n';
         var msgSameRoute = '';
         var msgSameItem = '';
         // Find alternate trade routes that share the same path.
         for (var jj = 0; jj < tradeRoutes.length; jj++)
         {
            var tr2 = tradeRoutes[jj];
            var annote = '+ ';
            if (tr2.totalProfit > 0 && tr2 != tr &&
                tr2.sellContract.vendorX == tr.sellContract.vendorX &&
                tr2.sellContract.vendorY == tr.sellContract.vendorY)
            {
               if (tr2.buyContract.vendorX == tr.buyContract.vendorX &&                  tr2.buyContract.vendorY == tr.buyContract.vendorY &&
               tr2.itemName != tr.itemName)
               {
                  // Same buyer location, different item.
                  msgSameRoute += annote + '>' + tradeRouteSummary(tr2) + '\n';
               } // same buyer location, different item

               // Profitable, same location, but not the same route.  Possible!
               if (tr2.itemName == tr.itemName && tr2.buyContract != tr.buyContract)
               {
                  // Amount left over that the first buyer won't take.
                  var leftoverQty = tr.sellContract.quantity - tr.buyContract.quantity;
                  if (leftoverQty > 0)
                  {
                     // Create a temporary fake buy contract for the remainder.
                     var newBuy = new Contract(tr2.buyContract.category, tr2.buyContract.itemName, tr2.buyContract.price, (tr2.buyContract.quantity > leftoverQty ? leftoverQty : tr2.buyContract.quantity), tr2.buyContract.each, tr2.buyContract.vendor, tr2.buyContract.vendorX, tr2.buyContract.vendorY);
                     var newRoute = new TradeRoute(newBuy, tr.sellContract);
                     msgSameItem += annote + tradeRouteSummary(newRoute);
                     if (newBuy.quantity != tr2.buyContract.quantity)
                     {
                        msgSameItem += ' (' + newBuy.quantity + '/' + tr2.buyContract.quantity + ')';
                     }
                     msgSameItem += '\n';
                  }
               } // same item, different Buy contract
            } // profitable route, same seller location
         } // for (var jj = 0; jj < tradeRoutes.length; jj++)
         msg += msgSameRoute;
         msg += msgSameItem;
      } // if (tr.totalProfit >= maxProfit)

      if (msg.length > msgCutoff) break;
   } // for (var ii = 0; ii < tradeRoutes.length; ii++)

   window.alert(msg);
}

scanList();
analyze();
sortAndDisplay();
