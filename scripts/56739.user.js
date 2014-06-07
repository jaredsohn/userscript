// ==UserScript==
// @name           MegaUpload Auto-Retry
// @description    Auto retry download from Megaupload and Megaporn
// @include        http://www.megaporn.com/?c=premium*
// @include        http://www.megaupload.com/?c=premium*
// ==/UserScript==

var retry_countdown = 60; //seconds to wait before retry

retry_id=setInterval(function(){
	if(retry_countdown>0){
		document.title = 'Trying again in '+retry_countdown+' seconds';
		retry_countdown--;
		}
	else{
		clearInterval(retry_id);
		window.history.back();
		}
	},1000);