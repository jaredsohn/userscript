// ==UserScript==
// @name       BC Green Party Grimes Processor
// @namespace  http://greenparty.bc.ca
// @version    0.1
// @description Adds phone and address entry fields to the Grimes foot canvassing data entry, and other things
// @match      https://*.grimes-siev.ca/en/footcanvass/footcanvassresults.php*
// @copyright  Burton Radons
// @require    http://code.jquery.com/jquery.min.js
// ==/UserScript==

var editorCode = null; // Just to make you go what
var pollNumber = null;

function updateVoterPhoneAndEmail(phone, email, sequenceNumber, onload) {
    var content = "phone=" + encodeURIComponent(phone) + "&email=" + encodeURIComponent(email) + "&Submit=Save&SEQ_NUM=" + sequenceNumber + "&POLLNUM=" + pollNumber;
    content += "&ED_CODE=" + editorCode;
    GM_xmlhttpRequest({
        method: "POST",
        url: "/en/individualvoterid/urbanvoterdataprocess.php",
        data: content,
        //"POLL_NUM=9999&SEQ_NUM=1&email=boopboopdewoop@dot.com&ED_CODE=59581",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        onload: onload,
    });
}

GM_xmlhttpRequest({
    method: "GET",
    url: "https://bc.grimes-siev.ca/en/individualvoterid/urbanviewrecord.php",
    onload: function(response) {//id="ED_CODE" value="XXX"
        editorCode = response.responseText.match(/id\=\"ED_CODE\" value\=\"([0-9]*)\"/i)[1];
    },
});

window.addEventListener("load", function() {
    pollNumber = document.body.innerHTML.match(/name\=\"POLLNUM\" type\=\"hidden\" value\=\"([0-9]*)\"/i)[1];
    var query = $(".results > tbody > tr > td:first-child + td + td + td");
    var headers = $(".results > tbody > tr > th:first-child + th + th + th");
    
    headers.html("Phone");
    headers.after("<th>Email</th>");
    var items = [];
    
    query.each(function(index, item) {
        var query = $(item);
        var sequenceNumber = item.nextSibling.nextSibling.firstChild.id.substr(7);
        
        var phone = query.html('<input type="text" size="10">').children();
        var email = query.after('<td><input type="text" size="15"></td>');
        items.push([sequenceNumber, item.firstChild, item.nextSibling.firstChild]);
    });
    
    var finished = false;
    var submit = $("#canvassdataentry");
    
    submit.submit(function(event) {
        var requestCount = 0;
        
        if(finished)
            return;
        finished = true;
        
        for(var index = 0; index < items.length; index++) {
            var item = items[index];
            var sequenceNumber = item[0], phone = item[1].value.trim(), email = item[2].value.trim();
            if(phone != "" || email != "") {
                requestCount++;
                updateVoterPhoneAndEmail(phone, email, sequenceNumber, function(response) {
                    requestCount--;
                    if(requestCount <= 0)
                        submit.submit();
                });
            }
        }
        
        event.preventDefault();
    });
}, false);
