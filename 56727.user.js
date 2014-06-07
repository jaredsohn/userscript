// ==UserScript==
// @name            Better EDS
// @namespace       MYKDE
// @include         http://skywalker.netflix.com:8010/tools/ClientInfo*
// @Created by      Cory Hanson -=MyKDE=-, Shaun Davis
// @version         0.1.7
// @date            10-04-2009
// ==/UserScript==

var verNum = '0.1.7';


function do_platypus_script() {
	
	
//<br /> removes line breaks
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<br\/>/g,'',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<br>/g,'',null);
	
//Change title to include Better EDS ver#verNum# By -=MyKDE=- and SDavis
//EDS Client Info  >> Better EDS Client Info Tool ver#verNum# By -=MyKDE=- and SDavis
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/EDS Client Info/g,'Better EDS Client Info Tool</font><br /><font size=3>Version ' +verNum +' By -=MyKDE=- and SDavis',null);

// Fix wrap
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/nowrap="nowrap"/g,'',null);

// New line "debugMessage=
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/"debugMessage=/g,'<br />"debugMessage=',null);

//New line "dldist=
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/"dldist=/g,'<br />"dldist=',null);


//
//GPU Information
//

//gpuam=0  >> <hr /><strong style="color:red">GPU Acceleration Mode ~ 0 - NOT Attempted & NOT Enabled</strong><hr />
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,gpuam=0/g,'<hr /><strong style="color:red">GPU Acceleration Mode ~ 0 - NOT Attempted & NOT Enabled</strong><hr />',null);

//gpuam=1  >> <hr /><strong style="color:green">GPU Acceleration Mode ~ 1 - Attempted & Enabled</strong><hr />
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,gpuam=1/g,'<hr /><strong style="color:green">GPU Acceleration Mode ~ 1 - Attempted & Enabled</strong><hr />',null);

//gpuam=2  >> <hr /><strong style="color:red">GPU Acceleration Mode ~ 2 - Attempted & NOT Enabled</strong><hr />
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,gpuam=2/g,'<hr /><strong style="color:red">GPU Acceleration Mode ~ 2 - Attempted & NOT Enabled</strong><hr />',null);

//href="%20http: >> href="http:
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/href="%20http:/g,'href="http:',null);

//
//Process Information
//

//minpl= >> Min Process Load = 
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/minpl=/g,'Min Process Load = ',null);

//,maxpl= >> % <br />Max Process Load = 
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,maxpl=/g,'%&nbsp;&nbsp;&nbsp;|----|&nbsp;&nbsp;&nbsp;Max Process Load = ',null);

//,avgpl= >> % <br />Average Process Load = 
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,avgpl=/g,'%&nbsp;&nbsp;&nbsp;|----|&nbsp;&nbsp;&nbsp;Average Process Load = ',null);

//,minsl= >> % <br />Min System Load = 
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,minsl=/g,'% <br />Min System Load = ',null);

//,maxsl= >> % <br />Max System Load = 
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,maxsl=/g,'%&nbsp;&nbsp;&nbsp;&nbsp;|----|&nbsp;&nbsp;&nbsp;Max System Load = ',null);

//,avgsl= >> % <br />Average System Load = 
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,avgsl=/g,'%&nbsp;&nbsp;&nbsp;&nbsp;|----|&nbsp;&nbsp;&nbsp;Average System Load = ',null);

//
//Bitrate Stream Changes
//

//,bw= shows Predicted Future Bandwidth
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,bw=/g,'<hr /><strong style="color:green">Future Predicted Bandwidth = </strong>',null);

//,chgreason= shows Stream Change Reason
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,chgreason=/g,'<strong style="color:green">kbps</strong><br /><strong style="color:green">Stream Change Reason = </strong>',null);

//Up Changes:

//Bitstream changes bitrateold=375,bitrate=500,
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bitrateold=375,bitrate=500,/g,'<hr /><strong style="color:green">BitStream Change UP:<br />| 375 BitRate  |>>|  500 BitRate  |</strong><hr />',null);

//Bitstream changes bitrateold=500,bitrate=1000,
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bitrateold=500,bitrate=1000,/g,'<hr /><strong style="color:green">BitStream Change UP:<br />| 500 BitRate  |>>|  1000 BitRate  |</strong><hr />',null);

//Bitstream changes bitrateold=1000,bitrate=1500,
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bitrateold=1000,bitrate=1500,/g,'<hr /><strong style="color:green">BitStream Change UP:<br />| 1000 BitRate  |>>|  1500 BitRate  |</strong><hr />',null);

//Bitstream changes bitrateold=1500,bitrate=2600,
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bitrateold=1500,bitrate=2600,/g,'<hr /><strong style="color:green">BitStream Change UP:<br />HD Quality<br />| 1500 BitRate  |>>|  2600 BitRate  |</strong><hr />',null);

//Bitstream changes bitrateold=2600,bitrate=3800,
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bitrateold=2600,bitrate=3800,/g,'<hr /><strong style="color:green">BitStream Change UP:<br />HD Quality<br />| 2600 BitRate  |>>|  3800 BitRate  |</strong><hr />',null);

//Down Changes:

//Bitstream changes bitrateold=3800,bitrate=2600,
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bitrateold=3800,bitrate=2600,/g,'<hr /><strong style="color:red">BitStream Change DOWN:<br />| 3800 BitRate  |>>|  2600 BitRate  |</strong><hr />',null);

//Bitstream changes bitrateold=2600,bitrate=1500,
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bitrateold=2600,bitrate=1500,/g,'<hr /><strong style="color:red">BitStream Change DOWN:<br />| 2600 BitRate  |>>|  1500 BitRate  |</strong><hr />',null);

//Bitstream changes bitrateold=1500,bitrate=1000,
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bitrateold=1500,bitrate=1000,/g,'<hr /><strong style="color:red">BitStream Change DOWN:<br />| 1500 BitRate  |>>|  1000 BitRate  |</strong><hr />',null);

//Bitstream changes bitrateold=1000,bitrate=500,
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bitrateold=1000,bitrate=500,/g,'<hr /><strong style="color:red">BitStream Change DOWN:<br />| 1000 BitRate  |>>|  500 BitRate  |</strong><hr />',null);

//Bitstream changes bitrateold=500,bitrate=375,
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/bitrateold=500,bitrate=375,/g,'<hr /><strong style="color:red">BitStream Change DOWN:<br />| 500 BitRate  |>>|  375 BitRate  |</strong><hr />',null);

//
//Bitrate Info
//

//Initial Bandwidth

//,initialbw= shows Initial Bandwidth
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,initialbw=/g,'<hr /><strong style="color:blue">Initial Bandwidth (kbps) = </strong>',null);

//,initialbt= shows Initial Buffer time in MS
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,initialbt=/g,'&nbsp;&nbsp;&nbsp;|----|&nbsp;&nbsp;&nbsp;<strong style="color:blue">Initial Buffer Time (ms) = </strong>',null);

//Actual Bandwidth

//,actualbw= shows Actual Bandwidth
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,actualbw=/g,'<strong style="color:blue"></strong><br /><strong style="color:blue">Actual Bandwidth (kbps) = </strong>',null);

//,actualbt= shows Initial Buffer time in MS
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,actualbt=/g,'&nbsp;&nbsp;&nbsp;|----|&nbsp;&nbsp;&nbsp;<strong style="color:blue">Actual Buffer Time (ms) = </strong>',null);

//,tid= shows UI Trigger ID - only used for the hr break 
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,tid=/g,'<hr />UI Trigger ID = ',null);

//
//Error Info
//

//,errorcode= shows Error Code
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,errorcode=/g,'<hr /><strong style="font-size:1.5em;">Error = ',null);

//,errorsubcode= shows Error sub-Code
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,errorsubcode=/g,'-',null);

//,errorcat= shows Error Catagory
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,errorcat=/g,'</strong><br /><strong>Error Category = </strong>',null);

//,errormsg= shows Error Messaging
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/,"errormsg=/g,'<br /><strong>Error Messaging = "</strong>',null);

//
//Account on Hold
//

//On Hold Info
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<td>On Hold<\/td><td>true<\/td>/g,'<td>On Hold<\/td><td><strong style="color:red">On Hold<\/strong><td>',null);

//Can Watch Instantly Info
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<td>canWatchNow<\/td><td>false<\/td>/g,'<td>canWatchNow<\/td><td><strong style="color:red">On Hold<\/strong><td>',null);


}; // Ends do_platypus_script




window.addEventListener("load", function() { do_platypus_script() }, false);

var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");

//
//   -- Cory Hanson
//

function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};

function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};

//Auto Script to check for a updated userscript
var SUC_script_num = 56727;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

//.user.js