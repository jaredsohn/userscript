// ==UserScript==
// @author         Cemre Gungor
// @name           Mint.com Mass Import Cash Transactions
// @include        https://wwws.mint.com/transaction.event*
// @namespace      http://cemre.gr/projects/mint-import
// ==/UserScript==

// Based on Brian Nicholson's "Transaction Clearing" GM Script's general structure.
// found at http://userscripts.org/scripts/show/65712
// Thanks Brian!

var GM_log = function(data) {
    console.log(data);
}

var txnData = [];
var otherTags = {};
var token = null;
var accountId = null;
var addedTagId = null;

// build query string from object
function serialize(obj) {
  var str = [];
  for(var p in obj)
     str.push(p + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}

function printTxn(txn) {
    return "<td>" + txn.date + "</td><td>" + txn.name + "</td><td>" + txn.catId+ "(" + txn.category + ")" + "</td><td>" + txn.amount+"</td>";
}

function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

// parse tab, newline and "" delimited CSV into array
function parse(strData) {
    var parsed = strData.split('\n').map(function(line) {return line.split('\t').map(function(item) {return item.replace(/\"/gi, "");})});
    if (parsed[0][0] == "Name") {
      parsed = parsed.slice(1);
      GM_log("First line was Name, scraped that line");
    }
    parsed.pop();
    return parsed;
}

// assign a mint category&ID for items with shorthand
function decideCategory(cat) {
    cat = cat.toLowerCase();
    
    if (cat == "r") {
        return Array("Restaurants", 707);
    } else if (cat == "b") {
        return Array("Alcohol & Bars", 708);
    } else if (cat == "t") {
        return Array("Rental Car & Taxi", 1503);
    } else if (cat == "c") {
        return Array("Coffee Shops", 704);
    } else if (cat == "f") {
        return Array("Fast Food", 706);
    } else {
        return Array("Uncategorized", 20);
    }
     
}

// create UI
function gmLoad() {
    
    var style = document.createElement('style');
    style.innerHTML = '#gmAddDiv { clear: both; } #gmAddDiv td {padding: 5px; border: 1px solid #ccc;}';
    document.getElementsByTagName('head')[0].appendChild(style);

    var gmAddDiv = document.createElement('div');
    gmAddDiv.setAttribute('id', 'gmAddDiv');
    document.getElementById('column-transactions').appendChild(gmAddDiv);
        
    var accountIdInput = document.createElement('input');
    accountIdInput.setAttribute('value', accountId);
    accountIdInput.setAttribute('id', 'accountId');
    gmAddDiv.appendChild(accountIdInput);
    
    var textArea = document.createElement('textarea');
    textArea.setAttribute('value', 'insert your CSV here');
    textArea.setAttribute('id', 'gmImport');
    textArea.setAttribute('rows', '10');
    textArea.setAttribute('cols', '70');
    gmAddDiv.appendChild(textArea);
    
    
    var importBtn = document.createElement('input');
    importBtn.setAttribute('value', 'Import');
    importBtn.setAttribute('class', "submit");
    importBtn.setAttribute('type', 'submit');
    importBtn.addEventListener('click', parseAndVerify, true);
    gmAddDiv.appendChild(importBtn);
    
    var verifyDiv = document.createElement('div');
    verifyDiv.setAttribute('id', 'gmVerify');
    gmAddDiv.appendChild(verifyDiv);

}


function parseAndVerify() {
    
    accountId = document.getElementById('accountId').value;
    var importStr = document.getElementById('gmImport').value;
    parsedData = parse(importStr);
    
    var verifyDiv = document.getElementById('gmVerify');
    verifyDiv.innerHTML = "";
    
    var verifyTable = document.createElement('table');
    verifyTable.setAttribute('id', 'gmVerifyTable');
    verifyDiv.appendChild(verifyTable);
    
    txnData = [];
    
    for (var items in parsedData) {
        item = parsedData[items];
        var txn = {};
        txn.catId = "";
        txn.category = "";
        txn.name = item[0];
        txn.amount = item[1].slice(2, item[1].length - 2);
        _date = new Date(item[2]);
        txn.date = _date.getMonth() + 1 + "/" + _date.getDate() + "/" + _date.getFullYear();
        
        if ( item[0][1] === " ") {
            txn.name = txn.name.slice(2);
            txn.category = decideCategory(item[0][0])[0];
            txn.catId = decideCategory(item[0][0])[1];
        } else {
            txn.category = decideCategory("")[0];
            txn.catId = decideCategory("")[1];
        }
        
        txnData.push(txn);
        
        
        verifyTable.innerHTML += "<tr>" + printTxn(txn) + "</tr>";
    }
    
    var verifyBtn = document.createElement('input');
    verifyBtn.setAttribute('value', 'Okay, looks right!');
    verifyBtn.setAttribute('class', "submit");
    verifyBtn.setAttribute('type', 'submit');
    verifyBtn.setAttribute('id', 'verifyBtn');
    verifyBtn.addEventListener('click', importTxns, true);
    
    verifyDiv.appendChild(verifyBtn);
    
    
}

function importOneTxn(txn) {
    var postData = {
        amount: txn.amount,
        cashTxnType: "on",
        catId: txn.catId,
        category: txn.category,
        date: txn.date,
        isInvestment: "false",
        merchant: txn.name,
        mtAccount: accountId,
        mtCashSplit: "on",
        mtCashSplitPref: "1",
        mtCheckNo: "",
        mtIsExpense: "true",
        mtType: "cash",
        note: " ",
        price: "",
        symbol: "",
        task: "txnadd",
        token: token,
        txnId: ":false"
    };


    otherTags[addedTagId] = "2";
    var postString = serialize(postData) + "&" + serialize(otherTags);

    GM_xmlhttpRequest({
        method: 'POST',
        url: 'https://wwws.mint.com/updateTransaction.xevent',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': document.cookie
        }, 
        data: postString,
        onload: function(response) {
            GM_log(response);
            
            if (response.finalUrl == "https://wwws.mint.com/updateTransaction.xevent") {
                document.getElementById('gmVerifyTable').innerHTML += "<tr>" + printTxn(txn) + "<td>SENT</td>" + "</tr>" ;                
            } else {
                document.getElementById('gmVerifyTable').innerHTML += "<tr>" + printTxn(txn) + "<td>FAILED</td>" + "</tr>" ;                
            }
        }    
    });
}

function importTxns() {
    var verifyDiv = document.getElementById('gmVerify');
    verifyDiv.innerHTML = "";
    
    var verifyTable = document.createElement('table');
    verifyTable.setAttribute('id', 'gmVerifyTable');
    verifyDiv.appendChild(verifyTable);
    
    for (var txnNo in txnData) {
        importOneTxn(txnData[txnNo]);
        pause(50);
    }
    
}


function gmInit() {
    token = document.getElementById('javascript-token').value;
    
    //find manual tag
    var tags = document.getElementById('edit-tags').nextSibling.getElementsByTagName('li');
    for(var i = 0; i < tags.length; i++) {
        var tagId = tags[i].id.replace('-', '');    
        if(tags[i].title == 'gmManualImport') {
            addedTagId = tagId;
        } else {
            otherTags[tagId] = "0";
        }
    }

    //find account ID
    var accounts = document.getElementById('edit-accounts').nextSibling.getElementsByTagName('li');
    accountId = accounts[1].id.replace('account-', ''); 
    GM_log(accountId);


    //if gmManualImport tag does not exist, create it
    if(!addedTagId) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'https://wwws.mint.com/updateTag.xevent',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': document.cookie
            }, 
            data: 'nameOfTag=gmManualImport&task=C&token=' + token,
            onload: function(response) {
                addedTagId = 'tag' + response.responseText.
                    match(/<response><tagId>([0-9]+)<\/tagId><\/response>/)[1];
            }
        });
    }
    
    gmLoad();
    
}

gmInit();
