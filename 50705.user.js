// ==UserScript==
// @name          E2E for eBay.com.au UI Plus
// @author        Allen.Jiang - netnewer@gmail.com
// @namespace     http://eBayUIPlus.net/gm
// @description   Show Ebay detail information(BuyerFullName,notes to buyer,notes to self,ShippingAndHandling1,insuranceFee) on listing webpage.Only test in www.ebay.com.au
// @include       http*://*search.ebay.com/*
// @include       http*://*.listings.ebay.com/*
// @include       http*://*.ebay.com.au/*
// @date          2009-05-16
// @version       1.0
// @GM_version    0.8.2
// ==/UserScript==

(function(){

function showDetailInfo(detailUrl,buyerIdC,emailLnk,emailC,loadingC,ppC){  
   
   if(!detailUrl){loadingC.innerHTML = "Access URL Fail!";return;}
   
    GM_xmlhttpRequest({ method:"GET", url:detailUrl,
        onload:function(result) {
            if (result){
                loadingC.parentNode.removeChild(loadingC);
                //var theTables = result.responseText.replace(/[\n\r]/gm, ' ').match(re);
                var re_shipping = /id\s*=\s*"ShippingAndHandling1".*value\s*=\s*"([^"]*)"/ig;
                var re_insurance = /id\s*=\s*"insurancefee".*value\s*=\s*"([^"]*)"/ig;
                var re_fullName = /name\s*=\s*"buyercontactname".*value\s*=\s*"([^"]*)"/ig;
                var re_noteSelf = /id\s*=\s*"sellernotes"[^>]*>([\s\S]*?)<\/textarea>/i;
                var re_noteBuyer = /id\s*=\s*"buyernotes"[^>]*>([\s\S]*?)<\/textarea>/i;
                
                //show shipping and insurance fee
                var shipping_v = re_shipping.exec(result.responseText)[1];
                var insurance_v = re_insurance.exec(result.responseText)[1];
                shipping_v = (shipping_v && !isNaN(shipping_v))? parseFloat(shipping_v):0;
                insurance_v = (insurance_v && !isNaN(insurance_v))? parseFloat(insurance_v):0;
                ppC.innerHTML = "<div>AU $" + (shipping_v + insurance_v).toFixed(2).toString() + "</div>";
                
                //show buyer full name
                var s_fullName = re_fullName.exec(result.responseText)[1];
                buyerIdC.innerHTML += "&nbsp;[" + s_fullName + "]";
                
                //show Pop buyer full-name and email address
                var popDiv = document.createElement("DIV");
                popDiv.style.backgroundColor = "lightblue";
                //popDiv.style.fontWeight = "bold";
                
                var spanPopFN = document.createElement("SPAN");
                spanPopFN.style.marginRight = 10;
                spanPopFN.style.cursor = "pointer";
                spanPopFN.innerHTML = "PoP FullName";
                spanPopFN.addEventListener('click', function(){alert(s_fullName);}, true);
                
                var spanPopEmail = document.createElement("SPAN");
                spanPopEmail.style.marginLeft = 10;
                spanPopEmail.style.cursor = "pointer";
                spanPopEmail.innerHTML = "PoP Email";
                spanPopEmail.addEventListener('click', function(){alert(emailLnk.innerHTML);}, true);
                
                popDiv.appendChild(spanPopFN);
                popDiv.appendChild(spanPopEmail);
                emailC.appendChild(popDiv);
                
                //show Notes to Self
                var noteDiv = document.createElement("DIV");
                noteDiv.style.backgroundColor = "#FFFF99";
                noteDiv.innerHTML = re_noteSelf.exec(result.responseText)[1].replace(/[\n\r]/gm,"</br>");
                emailC.appendChild(noteDiv);
                
                //show Notes to Buyer
                var noteBuyerDiv = document.createElement("DIV");
                noteBuyerDiv.style.backgroundColor = "#FFFF99";
                //alert(re_noteBuyer.exec(result.responseText)[1]);
                noteBuyerDiv.innerHTML = re_noteBuyer.exec(result.responseText)[1].replace(/[\n\r]/gm,"<br />");
                emailC.appendChild(noteBuyerDiv);
            }
            else {
                loadingC.innerHTML = 'Could not load detail inforamtion.'
            }
        }
    });

}

var g_navMenuDiv = document.getElementById("LeftNav");
var g_containerDiv = document.getElementById("ContainerWrapperSMPage");
var g_nav_ml = g_containerDiv.style.marginLeft;
var g_nav_mr = g_containerDiv.style.marginRight;
function switchNavMenu()
{

   if(g_navMenuDiv.style.display != "none")
   {
       g_navMenuDiv.style.display = "none";
       g_containerDiv.style.marginLeft = 0;
       g_containerDiv.style.marginRigh = 0;
    }
    else
    {
       g_navMenuDiv.style.display = "block";
       g_containerDiv.style.marginLeft = g_nav_ml;
       g_containerDiv.style.marginRigh = g_nav_mr;
    }
}

var topBarDiv = document.evaluate("//div[@id='areaTitle']//div//div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(topBarDiv && topBarDiv.snapshotLength >0)
{
    var nab_btn = document.createElement("SPAN");
    nab_btn.style.backgroundColor = "lightgreen";
    nab_btn.style.fontWeight = "bold";
    nab_btn.style.cursor = "pointer";
    nab_btn.style.marginLeft = 10;
    nab_btn.innerHTML = "NavMenu&nbsp;[Show/Hidden]";
    nab_btn.addEventListener('click',switchNavMenu, true);
    topBarDiv.snapshotItem(0).appendChild(nab_btn);
}
var LstTable = document.getElementById("SMSoldListings");
if(!LstTable || LstTable.rows.length == 0){return;}
var LstHeader = LstTable.rows[0];

//gen a new header-column for paid postage
var ppHCell = LstHeader.insertCell(7);
ppHCell.innerHTML = "<span class='CHi'>Paid Postage</span>";
ppHCell.align = "right";
ppHCell.className = "h_SalePrice";
ppHCell.style.backgroundColor = "#e0e0e0";
ppHCell.style.paddingLeft = 15;
ppHCell.style.paddingRight = 15;

var Cells_Email = document.evaluate("//table[@id='SMSoldListings']//tbody//tr[@class='BDtC4n']//td[@class='c_BuyerEmail']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(!Cells_Email || Cells_Email.snapshotLength == 0){alert("E2E.ebay.ui.plus parse 'Email' Cells fail!");return;}

var Strong_buyerIds = document.evaluate("//table[@id='SMSoldListings']//tbody//tr[@class='BDtC4n']//td[@class='c_BuyerEmail']//div[1]//a[1]//strong[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(!Strong_buyerIds || Strong_buyerIds.snapshotLength == 0){alert("E2E.ebay.ui.plus parse 'Buyer ID' hyperLink fail!");return;}

var hyperLink_EmailAdd = document.evaluate("//table[@id='SMSoldListings']//tbody//tr[@class='BDtC4n']//td[@class='c_BuyerEmail']//div[1]//strong[1]//a[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(!hyperLink_EmailAdd || hyperLink_EmailAdd.snapshotLength == 0){alert("E2E.ebay.ui.plus parse 'Buyer Email Address' hyperLink fail!");return;}

var dLinks = document.evaluate("//table[@id='SMSoldListings']//tbody//tr[@class='BDtC4n']//td[@class='c_TotalPrice']//div[1]//a[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(!dLinks || dLinks.snapshotLength == 0){alert("E2E.ebay.ui.plus parse 'detail link' url fail!");return;}

var loadDiv = document.createElement("DIV");
loadDiv.style.backgroundColor = "lightgray";
loadDiv.style.fontWeight = "bold";
loadDiv.style.color = "red";
loadDiv.innerHTML = "Loading Data...";


//for each Cell Items
for(var i=0;i<Cells_Email.snapshotLength;i++)
{
   //border-color black
   var LstRowCells = Cells_Email.snapshotItem(i).parentNode.cells;
   if(LstRowCells)
   for(var j=0;j<LstRowCells.length;j++)
   {
      LstRowCells[j].style.borderTopColor = "black";
   }
   
   var emailDivs = Cells_Email.snapshotItem(i).getElementsByTagName("DIV");
   if(!emailDivs || emailDivs.length == 0)continue;
   
   var buyerId_Label = Strong_buyerIds.snapshotItem(i);
   var buyerEmailLink = hyperLink_EmailAdd.snapshotItem(i);
   
   //insert a new cell for paid postage with each items
   var ppCell = Cells_Email.snapshotItem(i).parentNode.insertCell(7);
   ppCell.align = "right";
   ppCell.className = "h_SalePrice";
   ppCell.setAttribute("nowrap","true");
   ppCell.style.paddingLeft = 15;
   ppCell.style.paddingRight = 15;
   
   var dlink = dLinks.snapshotItem(i);
   var loadDivItem = loadDiv.cloneNode(true);
   Cells_Email.snapshotItem(i).appendChild(loadDivItem);
   showDetailInfo(dlink.href,buyerId_Label,buyerEmailLink,emailDivs[0],loadDivItem,ppCell);
   
   
}

})();