// ==UserScript==
// @name        Xero: Invoice Billable Expenses
// @namespace   InvoiceBillableExpenses.Xero.cyberninjas.com
// @description This plugin makes it so that if you look at any accounts transaction detail in Xero (Settings -> Chart of Accounts -> (Click on YTD Value), you can automatically select trasactions and create an invoice for them. This is useful if you have billable expenses you need to pass on to a customer. To make this easier I've created an account "Billable Expenses" which I put all my billable expenses within. I then have a revenue account "Expense Reimbursement" which I put any revenue from these invoices to.
// @include     https://*xero.com/GeneralLedger/AccountDetails.aspx*
// @version     1.0
// @grant       none
// @require     https://userscripts.org/scripts/source/145813.user.js
// ==/UserScript==

var CSRFToken = "";
var newInvoiceID = "";
var nextInvoice = "";
var lineItems = [];
setValues();                                

var b = document.getElementsByTagName("h2")[1];
d = document.createElement("span");
d.style="font-size:-2; font-weight:normal;float:right;";
d.innerHTML="Select Invoice to Add To: <select id='invoicesDD' ><option value='" + newInvoiceID + "'>New Invoice</option></select><input id='invBut' type='button' value='Add Selected'>";
b.appendChild(d);
document.getElementById('invBut').onclick = function (){
                                                var dd = document.getElementById('invoicesDD');
                                                var targetInvoice = dd.options[dd.selectedIndex].value;
                                                var inputs = document.getElementsByClassName("billable_code");
                                                lineItems = [];
                                                for(var i = 0; i < inputs.length; i++){
                                                    if(inputs[i].checked){
                                                        var lineGUID = "";
                                                        var x = 0;
                                                        var results = [];
                                                        var a = inputs[i].parentNode;
                                                        while(a = a.nextSibling){
                                                            if(a.nodeType == 1 && a.textContent.trim() != ""){
                                                                x++;
                                                                
                                                                if(/href="[^"]+"/.test(a.innerHTML)){
                                                                  results[0] = a.innerHTML.match(/href="([^"]+)"/)[1]; 
                                                                  lineGUID = results[0].match(/eventID=([^&]+)&/)[1];
                                                                }
                                                                results[x] = a.textContent.trim();
                                                            }
                                                        }
                                                        lineItems[lineItems.length] = new LineItem(lineGUID, targetInvoice, results[1] + " - " + results[2], 1, parseFloat(results[3]), results[0]); 
                                                        
                                                    }
                                                }
                                                setLineResults(lineItems);
                                                var invDetails = dd.options[dd.selectedIndex].textContent.split(" | ");
                                                saveInvoice(targetInvoice, invDetails[0], invDetails[1], lineItems);
                                            };
//Get a list of all existing Draft Invoices
a('GET', '/AccountsReceivable/Search.aspx?invoiceStatus=INVOICESTATUS/DRAFT', null, function(xmlHTTP){
                                    var d = document.createElement('div');
                                    d.innerHTML = this.responseText || "";
                                    var nodes = getNodes(d);
                                    var dd = document.getElementById('invoicesDD');
                                    dd.onchange = function() {GM_setValue("chosenInvoice", this.children[this.selectedIndex].value);};
                                    for (var i = 0; i < nodes.length; i++) {
                                       dd.appendChild(nodes[i]);
                                    }
                                });
selectChosenInvoice();
addCheckboxes();


function setLineResults(lineItems){
    for(var i = 0; i < lineItems.length; i++){
        var lineItem = lineItems[i];
        var x = i;
        GM_xmlhttpRequest({
            method: 'GET',
            synchronous: true,
            url: lineItem.URL,
            onload: function(x) {
                return function(xhr) {
                    var d = document.createElement('div');
                    d.innerHTML = xhr.responseText || "";
                    var it = document.evaluate("//td[text()=" + lineItems[x].unitAmount + "]/..", d, null, 5, null);
                    node = it.iterateNext();
                    var tds =  node.getElementsByTagName("td");
                    lineItems[x].itemCode = tds[0].textContent;
                    lineItems[x].description = tds[1].textContent;
                    lineItems[x].quantity = tds[2].textContent;
                    lineItems[x].unitAmount = tds[3].textContent;
                    lineItems[x].taxAmount = (tds.length > 7) ? tds[6].textContent : 0;
                }
            }(x)
        });
        
    };
}




function addCheckboxes(){
    var it = document.evaluate("//a[text()='Transaction']/ancestor::table/descendant::tr", document.body, null, 5, null);

    var trs = [];
    var i = 0;
    while (tr = it.iterateNext()){
        trs[i] = tr;
        i++;
    }
    for(var i = 0; i < trs.length; i++){
        var td = document.createElement('td');
        if(trs[i].parentNode.tagName == "THEAD"){
            td.onclick = function (e){
                            var inputs = document.getElementsByClassName("billable_code");
                            for(var i = 0; i < inputs.length; i++){
                                inputs[i].checked = this.firstChild.checked;
                            }
                         }
        } else {
            td.onclick = function(e){
                            var chk = this.firstChild;
                            chk.checked = (chk.checked) ? true : false;                       
                            e.stopPropagation(); 
                            }
        }
        td.innerHTML = "<input id='chk" + i + "' type='checkbox' class='billable_code' >";
        trs[i].insertBefore(td, trs[i].firstChild);
    }

}

function selectChosenInvoice(){
    var val = GM_getValue("chosenInvoice");
    var dd = document.getElementById("invoicesDD");
    for(var i=0; i < dd.children.length; i++){
        if(dd.children[i].value == val){
           dd.children[i].selected = true; 
        }
    }
}

function a(method, url, data, f){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onload=f;
    xmlhttp.open(method,url,false);
    if(method.toUpperCase() == "POST") 
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
}

//@@@@@@@@@@@@@@@@@@@@@@@@ Functions For Saving Invoices @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function LineItem(lineItemID, invoiceID, description, quantity, unitAmount, URL){
    this.toString = function(){
        return '{"LineItemID": "' + this.lineItemID + '", "InvoiceID": "' + this.invoiceID + '", "Description": "' + this.description + '", "Quantity": ' + this.quantity + ', "UnitAmount": ' + unitAmount + '}';
    }
    
    this.getGUID = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
            });
    }
    
    this.lineItemID = (!lineItemID) ? this.getGUID() : lineItemID;
    this.invoiceID = (!invoiceID) ? this.getGUID() : invoiceID;
    this.description = description;
    this.quantity = parseInt(quantity);
    this.unitAmount = parseFloat(unitAmount);
    this.URL = (!URL) ? "" : URL;
    this.itemCode = "";
    this.taxAmount = 0;
}

function saveInvoice(invoiceID, invoiceNumber, paidToName, oLineItems){
    var ID = (!invoiceID) ? oLineItems[0].invoiceID : invoiceID; //Grab InvoiceID from first item if not set.
    var cleanID = ID.replace(/-/g, '');
    var qString = "Action=SaveDraftAndContinue&PaidToName_" + cleanID + "_value=" + paidToName + "&InvoiceNumber_" + cleanID + "=" + invoiceNumber;
    if(CSRFToken)
       qString = qString + "&CsrfToken=" +  CSRFToken;
    var lineItems = '[';
    
    //Cycle Through and add all LineItems
    for (var i = 0; i < oLineItems.length; i++) {
        var lineItem = oLineItems[i];
        lineItem.invoiceID = ID;
        lineItems = lineItems  + lineItem.toString() + ((i + 1 < oLineItems.length) ? ', ' : '');  
    }    
    var lineItems = lineItems + ']';
    qString = qString + '&LineItemsToSaveJSON=' + encodeURIComponent(lineItems).replace(/%20/g,'+');
    a('POST', '/AccountsReceivable/Edit.aspx?InvoiceID=' + ID, qString, function(xmlHTTP){alert('Successfully added!');});
    var inputs = document.getElementsByClassName("billable_code");
    for(var i = 0; i < inputs.length; i++){
        inputs[i].checked = false;
    }
}

//@@@@@@@@@@@@@@@@@@@@@@@@ Functions For Modifying GUI @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function getNodes(target ){
    var it = document.evaluate("//tbody/tr", target, null, 5, null);
    var nodes1 = [];
    
    while (node = it.iterateNext()) {
        var s = "";    
        var it2 = document.evaluate("td[not(@style='display:none;')]", node, null, 5, null);
        while (node2 = it2.iterateNext()) {
            var add = (node2.textContent.trim() == "") ? "" : node2.textContent.trim() + " | ";
            var s = s + add;
        }
        s = s.slice(0,-3);
        var p = /href="Edit.aspx\?InvoiceID=([^"]+)/i;
        o = document.createElement("option");
        o.text = s;
        o.value = p.exec(node.innerHTML)[1];
        nodes1.push(o);
    };
    return nodes1;
}

function setValues(){
    a('GET', '/AccountsReceivable/Edit.aspx', null, function(){
                                        var d = document.createElement('div');
                                        d.innerHTML = this.responseText || "";
                                        CSRFToken = d.getElementsByAttributeValue("name", "CsrfToken")[0].value;
                                        newInvoiceID = d.getElementsByAttributeValue("name", "NewInvoiceID")[0].value;
                                        var cleanInvoiceID = newInvoiceID.replace(/-/g, '');
                                        nextInvoice = d.getElementsByAttributeValue("name", "InvoiceNumber_" + cleanInvoiceID)[0].value;
                                    });
}



//*/
