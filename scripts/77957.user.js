// ==UserScript==
// @name           Facebook Auto Ignore All Requests
// @description    Automatically ignore all requests on the facebook request page
// @include        *facebook.com/*/reqs.php*
// ==/UserScript==


/* Update proc */
var SCRIPT={SCRIPTED:"Facebook Auto Ignore All Requests",VERSION:"1.0",SCRIPT_URL:"http://userscripts.org/scripts/source/77957.user.js"}
function updateCheck(){try{GM_xmlhttpRequest({method:'GET',url:SCRIPT.SCRIPT_URL+"?rnd="+Math.random(),onload:function(result){if(result.status!=200)throw"status="+result.status;var tmp=/VERSION[\s=]+"(.*?)"/.exec(result.responseText);if(tmp==null)throw"parse error";if(SCRIPT.VERSION!=tmp[1]){window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");if(window.confirm("New version "+tmp[1]+" is available. Update ?"))location.href=SCRIPT.SCRIPT_URL}else{window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");alert("Latest version\n\""+SCRIPT.SCRIPTED+"\"\nVersion: "+SCRIPT.VERSION+" ")}}})}catch(error){alert('Error updating: '+error)}}GM_registerMenuCommand("Check for update for  "+SCRIPT.SCRIPTED+"",updateCheck);
/* end Update */



function autoignored(){
var a = document.getElementsByTagName('input');
for (var i=0; i<a.length; i++) {
if (a[i].value.toLowerCase() == 'ignore') {
try {a[i].click();} 
catch(e){}
}}}

GM_registerMenuCommand('auto ignore', function() { autoignored(); });