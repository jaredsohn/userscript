// ==UserScript==
// @name           Post-new page Enhance
// @description    Auto fill post slug and timestamp WordPress
// @version        0.1
// @author         sfufoet
// @namespace      http://blog.loland.net/
// @include        */wp-admin/post-new.php
// ==/UserScript==

// modify this variable
var url='http://www.appinn.com/wp-admin/edit.php';

// always show "post slug" box
var slugdiv = document.getElementById('slugdiv');
slugdiv.style.display='';
// Auto Fill "post slug" box
var title = document.getElementById('title');
title.addEventListener('blur', function(event) {
	if(title.value.split(" - ")[0]!=document.getElementById('title').value)
        document.getElementById('post_name').value=title.value.split(" - ")[0];
	if(title.value.split(" -- ")[0]!=document.getElementById('title').value){
		document.getElementById('post_name').value=title.value.split(" -- ")[0];
    	title.value=title.value.split(" -- ")[1];
    }
    else
    	title.value=temp;
    }, false);
    
// always show "Timestamp" box
document.getElementById('timestampdiv').style.display='';
// Auto Fill "Timestamp" box
document.getElementById("hh").value="07";
document.getElementById("mn").value="00";
// Create three buttons, you can click them to auto modify "Timestamp" box
var currentTime = document.createElement('span');
currentTime.innerHTML = '<input type=\"button\" onclick=\"javascript:document.getElementById(\'hh\').value=\'07\';document.getElementById(\'mn\').value=\'00\';\" value=\"07:00\"  class="save-timestamp button"/>';
currentTime.innerHTML = currentTime.innerHTML+'<input type=\"button\" onclick=\"javascript:document.getElementById(\'hh\').value=\'12\';document.getElementById(\'mn\').value=\'00\';\" value=\"12:00\"  class="save-timestamp button"/>';
currentTime.innerHTML = currentTime.innerHTML+'<input type=\"button\" onclick=\"javascript:document.getElementById(\'hh\').value=\'19\';document.getElementById(\'mn\').value=\'00\';\" value=\"19:00\"  class="save-timestamp button"/>';
currentTime.innerHTML = currentTime.innerHTML+'<input type=\"button\" onclick=\"javascript:var d=new Date();document.getElementById(\'jj\').value=d.getDate();document.getElementById(\'hh\').value=d.getHours();document.getElementById(\'mn\').value=d.getMinutes();\" value=\"Now\"  class="save-timestamp button"/>';
document.getElementById('hidden_mm').parentNode.insertBefore(currentTime, document.getElementById('hidden_mm'));

// get the newest post's timestamp
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
    	var jj=responseDetails.responseText.match(/<div class=\"jj\">\d\d<\/div>/g)[0];
    	jj=jj.replace(/<div class=\"jj\">(\d\d)<\/div>/g,"$1");
    	jj=parseInt(parseFloat(jj))+1;

		var mm=responseDetails.responseText.match(/<div class=\"mm\">\d\d<\/div>/g)[0];
    	mm=mm.replace(/<div class=\"mm\">(\d\d)<\/div>/g,"$1");
    	mm=parseInt(parseFloat(mm));
    	
		switch(mm){
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
			if(jj==32){
				jj=1;
				document.getElementById('mm').selectedIndex=mm;
			}
			break
		case 4:
		case 6:
		case 9:
		case 11:
			if(jj==31){
				jj=1;
				document.getElementById('mm').selectedIndex=mm;
			}
			break
		case 2:
			if(jj==29){
				jj=1;
				document.getElementById('mm').selectedIndex=mm;
			}
			if(jj==30){
				jj=1;
				document.getElementById('mm').selectedIndex=mm;
			}
			break
		case 12:
			if(jj==32){
				jj=1;
				document.getElementById('mm').selectedIndex=0;
				document.getElementById('aa').value=parseInt(parseFloat(document.getElementById('aa').value))+1;
			}
			break
    	}
    	oldjj=parseInt(parseFloat(document.getElementById('jj').value));
    	if(oldjj<jj || jj==1)
    		document.getElementById('jj').value=jj;
    }
});