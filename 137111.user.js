// ==UserScript==
// @name            Checking Helper 2
// @author          lerk08
// @description     Get image info on screenshots/cover art when mousing over them.
// @license         Creative Commons Attribution License
// @version	    2.0.2
// @include         http*://*passthepopcorn.me/torrents.php*
// @released        2012-6-26
// @updated         2012-7-08
// @compatible      Greasemonkey
// @require         http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// Improved upon trza's script to work properly
//Added script updater

//update script
var SUC_script_num = 137111; 

// Change this to the number given to the script by userscripts.org (check the address bar)

try {
    function updateCheck(forced) {
        if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) {
            try {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'http://userscripts.org/scripts/source/' + SUC_script_num + '.meta.js?' + new Date().getTime(),
                    headers: {
                        'Cache-Control': 'no-cache'
                    },
                    onload: function (resp) {
                        var local_version, remote_version, rt, script_name;
                        rt = resp.responseText;
                        GM_setValue('SUC_last_update', new Date().getTime() + '');
                        remote_version = parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                        local_version = parseInt(GM_getValue('SUC_current_version', '-1'));
                        if (local_version != -1) {
                            script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                            GM_setValue('SUC_target_script_name', script_name);
                            if (remote_version > local_version) {
                                if (confirm('There is an update available for the Greasemonkey script "' + script_name + '."\nWould you like to go to the install page now?')) {
                                    GM_openInTab('http://userscripts.org/scripts/show/' + SUC_script_num);
                                    GM_setValue('SUC_current_version', remote_version);
                                }
                            } else if (forced) alert('No update is available for "' + script_name + '."');
                        } else GM_setValue('SUC_current_version', remote_version + '');
                    }
                });
            } catch (err) {
                if (forced) alert('An error occurred while checking for updates:\n' + err);
            }
        }
    }
    GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function () {
        updateCheck(true);
    });
    updateCheck(false);
} catch (err) {}

(function (){
	var URL_MAX_LENGTH =  100;
	var MIN_SIZE_DISPLAY = 300;

	var url;
	document.addEventListener('mouseover',function(e){
	var tar = e.target;
	if(tar.nodeName.toLowerCase()=='img'){
		if (tar.naturalWidth > MIN_SIZE_DISPLAY || tar.naturalWidth == 0){
			imgSize = "[" + tar.naturalWidth + "px × "+ tar.naturalHeight +"px" + "]";
			
			url = tar.src;
			if(tar.src.match("data:image")){
				url = "(Base64 Image)";
			}
			else if(tar.src.length > URL_MAX_LENGTH){
				var str = tar.src;
				url = str.substr(0,50) + "..."+str.substr(str.length-50,50);
			}
			
			if (tar.title.indexOf("px ×")== -1){
				var c = document.getElementById("torrents");
				var d = document.createElement("div");
				d.setAttribute("id","imageInfo");
				d.setAttribute("style","bottom:50px; left:0px; background:#000; padding:10px; position:fixed; color:white; font-size:14pt; z-index: 3000;");
				var t = document.createTextNode(imgSize + " " + url); 
				d.appendChild(t); 
				c.appendChild(d); 
			}	
		}
	}
},false);
})();

(function (){
	document.addEventListener('mouseout',function(e){
		var tar = e.target;
		if(tar.nodeName.toLowerCase()=='img'){
			element = document.getElementById("imageInfo");
			element.parentNode.removeChild(element);
		}
},false);
})();

// ==/UserScript==