// ==UserScript==
// @name           Userscripts.org Cleanup
// @namespace      http://userscripts.org/scripts/show/94904
// @description    Remove ads from userscripts.org pages
// @version        1.0.4
// @include        http://userscripts.org/scripts/*
// @history        1.0.4 Added xpath check for //ins[contains(@id,'aswift_0_anchor')]
// @history        1.0.3 Fixed some message spam in the console due to not removing childnodes from the ads parent element
// @history        1.0.2 Fixed script Init
// @history        1.0.1 Added Autoupdate code
// @history        1.0.0 Initial release
// ==/UserScript==
//  Process Variables
var SUC_script_num  = 94904;


// Script Update Update Code
function UpdateCheck(forced) {
    // Checks once a day (24 h * 60 m * 60 s * 1000 ms) unless forced
    if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) {
        try {
            //read the script page on the USERSCRIPT.ORG web page
            GM_xmlhttpRequest( {
                method: 'GET',
                url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
                headers: {'Cache-Control': 'no-cache'},
                onload: function(resp) {

                    var local_version, remote_version, rt, script_name;

                    rt = resp.responseText;

                    //set the time of the last successful update
                    GM_setValue('SUC_last_update', new Date().getTime()+'');

                    //get the remote version number and save the scripts name
                    remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                    script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];

                    //get the local version number
                    local_version=parseInt(GM_getValue('SUC_current_version', '-1'));

                    if(local_version!=-1) {
                        // test to see if a new version is available

                        if (remote_version > local_version) {
                            if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
                                try {
                                    window.location.href = 'http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js';
                                } catch (err) {
                                };
                                GM_setValue('SUC_current_version', remote_version);
                            }
                        } else if (forced) {
                            alert('No update is available for "'+script_name+'."');
                        }
                    } else {
                        // if the script has never run save the version numnber
                        GM_setValue('SUC_target_script_name', script_name+'');
                        GM_setValue('SUC_current_version', remote_version+'');
                    }
                }
            });
        } catch (err) {
            if (forced)
                alert('An error occurred while checking for updates:\n'+err);
        }
    }
}

function ParsePage(){
	var obj = document.evaluate(
		"//div[contains(@class,'box')] | //div[contains(@class,'sponsors')] | //ins[contains(@id,'aswift_0_anchor')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for(var i = 0; i < obj.snapshotLength; i++) {
		var thisElement = obj.snapshotItem(i);
		if(thisElement){
			var node = thisElement;
			if(node.style.visibility !== 'hidden');
				node.style.visibility = 'hidden';
			if(node.nodeType === 1 && node.style.visibility === 'hidden'){
				while(node.childNodes.length>=1)
				{
					node.removeChild(node.firstChild);
					if(node.childNodes.length == 0)
						node.parentNode.removeChild(node)
				};
			}			
    }
	}
}

function Init()
{
	UpdateCheck(false);
}

document.addEventListener("DOMNodeInserted", ParsePage, true);
window.addEventListener("load", Init, false); //invoke 