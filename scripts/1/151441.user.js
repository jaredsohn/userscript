// ==UserScript==
// @name        postcode
// @namespace   mansionhill
// @include     https://www.vetone.co.uk/mhill/servlet/GemVetOne?module=GemClientManage&method=doClientNewClient
// @version     1
// @grant GM_xmlhttpRequest
// ==/UserScript==


var c ="//html/body/table/tbody/tr/td[2]/form/table/tbody/tr[2]/td/table/tbody/tr[10]/td[2]";
var result = document.evaluate(c,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

result.snapshotItem(0).innerHTML='<input onblur="this.className=\'forminput\'" onfocus="this.className=\'forminputHighlight\';" type="text" id="postcode" name="postcode" class="forminput" onKeyPress="ACPost(event, this);" maxlength="100"><input type=button id="pcbutton" value="Click to find"><div style="width:400px;height:300px;position:absolute;border:1px solid #000;background-color:#FFF;display:none;overflow:auto;" id="pcdiv"></div>';


document.getElementById('pcbutton').addEventListener('click', function(){
if (document.getElementById('postcode').value.length>3){
GM_xmlhttpRequest({
    method: 'GET',
    url: "http://192.168.27.3/postcodelookup.php?q="+document.getElementById('postcode').value,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
	document.getElementById("pcdiv").innerHTML=responseDetails.responseText;
	document.getElementById("pcdiv").style.display="";
        //alert('Request for Atom feed returned ' + responseDetails.status +
        //      ' ' + responseDetails.statusText + '\n\n' +
        //      'Feed data:\n' + responseDetails.responseText);
    }
});
}
}, true);




