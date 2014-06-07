// ==UserScript==
// @author         Brian Nicholson
// @name           mint.com Transaction Clearing
// @include        https://wwws.mint.com/transaction.event
// ==/UserScript==

//array of transactions that have been checked
var checkedBoxes = document.getElementById('transaction-list')
    .getElementsByClassName('checked');

//token value for AJAX requests
var token = document.getElementById('javascript-token').value;

//id of the gmCleared tag
var clearedTagId = null;

//selected transaction row
var selectedRow = document.getElementById('transaction-list-selected');

function loadGmClear() {
    
    //change the style for uncleared transactions
    var style = document.createElement('style');
    style.innerHTML = '.gmUncleared * { font-weight: bold; }';
    document.getElementsByTagName('head')[0].appendChild(style);
   
    //set CSS classes for cleared/uncleared transactions
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://wwws.mint.com/app/getJsonData.xevent?' +
             'comparableType=8&query=-tag%3AgmCleared&offset=0' +
             '&task=transactions,merchants,txnfilters',
        onload: function(responseDetails) {
            
            var unclearedTransactions =
                eval( '(' + responseDetails.responseText + ')' )['set'][0]['data'];
            var allTransactions = document.getElementById('transaction-list-body')
                .getElementsByTagName('tr');
                
            var unclearedMap = {};
            for(var i = 0; i < unclearedTransactions.length; i++)
                unclearedMap['transaction-' + unclearedTransactions[i].id] = true;
            for(var i = 0; i < allTransactions.length; i++) {
                var id = allTransactions[i].id;
                if(unclearedMap[id])
                	document.getElementById(id).className += ' gmUncleared';
                else
                	document.getElementById(id).className += ' gmCleared';
            }
           
            //monitor keys/clicks to check if selected transaction row is cleared
            var selectedTransaction = document.getElementsByName('txnId')[0];
            var updateSelected = function() {
                selectedRow.className = selectedRow.className.replace(' gmUncleared', '');
                var selectedId = selectedTransaction.value;
                selectedId = 'transaction-' + selectedId.substring(0, selectedId.indexOf(':'));
                var trans = document.getElementById(selectedId).className;
                if(trans.indexOf('gmCleared') == -1)
                    selectedRow.className += ' gmUncleared';
            }
            window.addEventListener('keypress', updateSelected, true);
            document.getElementById('transaction-list').addEventListener('mouseup', function() {
                setTimeout(updateSelected, 1);
            }, true);

            //check if selected transaction row is cleared once it is loaded
            (function test() {
                if(document.getElementsByName('txnId')[0].value)
                    updateSelected();
                else
                    setTimeout(test, 100);
            }) ();
        }
    });

    //create button for clearing transactions
    var clearTab = document.createElement('input');
    clearTab.setAttribute('value', 'Clear Transactions');
    clearTab.setAttribute('title', "Clear selected transactions");
    clearTab.setAttribute('class', "submit disabled");
    clearTab.setAttribute('type', 'submit');
    clearTab.setAttribute('disabled', 'disabled');
    clearTab.addEventListener('click', clearTransactions, true);
    document.getElementById('controls-top').appendChild(clearTab);

    //monitor for checkbox clicks to display button
    var checkboxes = document.getElementsByClassName('checkboxes');
    for(var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].firstChild.addEventListener('click', function() {
            setTimeout(function() {
                if(checkedBoxes.length > 0) {
                    clearTab.className = clearTab.className.replace(' disabled', '');
                    clearTab.removeAttribute('disabled');
                } else {
                    if(!clearTab.className.match('disabled'))
                        clearTab.className += ' disabled';
                    clearTab.setAttribute('disabled', 'disabled');
                }
            }, 1);
        }, true);
    }
}

//clear the selected transactions
function clearTransactions() {

    var postContent = '';

    //copy all checked boxes into array
    var checkedBoxArray = [];
    for(var i = 0; i < checkedBoxes.length; i++) {
        postContent += checkedBoxes[i].id.substring(12) + '%3Afalse' + '%2C';
        checkedBoxes[i].className = checkedBoxes[i].className.replace('gmUncleared', '');
        checkedBoxes[i].className += ' gmCleared';
        checkedBoxArray.push(checkedBoxes[i].firstChild.firstChild);
    }
    
    //handle the special "selected" row and checkbox
    var selectedBox = document.getElementsByName('txn-edit-checkbox')[0];
    if(selectedBox.checked) {
        checkedBoxArray.push(selectedBox);
        selectedRow.className = selectedRow.className.replace(' gmUncleared', '');
    }
        
    //clear all checked boxes
    for(var i = 0; i < checkedBoxArray.length; i++)
        checkedBoxArray[i].click();

    var otherTags = document.getElementById('edit-tags')
        .nextSibling.getElementsByTagName('li');
    var otherTagsString = '';
    for(var i = 0; i < otherTags.length; i++) {
        if(otherTags[i].title != 'gmCleared')
            otherTagsString += otherTags[i].id.replace('-', '') + '=0&';
    }

    //submit cleared transactions to server
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'https://wwws.mint.com/updateTransaction.xevent',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': document.cookie
        }, 
        data: 'isInvestment=false&note=&price=&symbol=&' + clearedTagId +
              '=2&' + otherTagsString + 'task=txnedit&token=' + token +
              '&txn-details-num_shares=&txnId=' + postContent
    });

}

//find gmCleared tag
var tags = document.getElementById('edit-tags')
    .nextSibling.getElementsByTagName('li');
for(var i = 0; i < tags.length; i++) {
    if(tags[i].title == 'gmCleared') {
        clearedTagId = tags[i].id.replace('-', '');
        loadGmClear();
        break;
    }
}

//if gmCleared tag does not exist, create it
if(!clearedTagId) {
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'https://wwws.mint.com/updateTag.xevent',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': document.cookie
        }, 
        data: 'nameOfTag=gmCleared&task=C&token=' + token,
        onload: function(response) {
            clearedTagId = 'tag' + response.responseText.
                match(/<response><tagId>([0-9]+)<\/tagId><\/response>/)[1];
            loadGmClear();
        }
    });
}