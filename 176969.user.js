// ==UserScript==
// @name		What.CD :: Am I Seeding?
// @namespace		http://userscripts.org/scripts/show/172119
// @description		Display an extra detail to your infobar (Up, Down, Ratio and Required) that tells you how many torrents you are seeding
// @include		http*://*.what.cd*
// @include		http*://what.cd*
// @version		1.0.5
// ==/UserScript==
	
    // YOU CAN EDIT THE ALIGN OF THE SEEDING VALUE ("left" or "right")
    var align = "right";
    
    var userid, userhref, infobar, json_object, cut_data, data_seed, nb_torrents_seeded;
    
    userid = document.getElementById("nav_userinfo").innerHTML;
    userid = userid.substring(userid.indexOf("?id=")+4, userid.indexOf("\" cl"));
    
    userhref = document.URL;
    userhref = userhref.substring(0, userhref.indexOf(".cd")+3);
    userhref = userhref + "/ajax.php?action=community_stats&userid=" + userid;
    
    infobar = document.getElementById("userinfo_stats");

    // AJAX REQUEST
	
    function get_seed_number(){
        
            GM_xmlhttpRequest({
                method: "GET",
                url: userhref,
                onload: function(retour) {
					
					
					// Turn response into variable depending on browser
					if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
						// If google chrome
						var ResponseText = retour.response;
					}else{
						// If firefox
						var ResponseText = retour.responseText;
					};
					
                    // JSON Content to String
					json_object = JSON.stringify(ResponseText);
					
                    // Cuting the string
                    cut_data = json_object.split('\"'); 
                    
                    // Getting the Seeding value from the String
                    data_seed = cut_data[12];
                    
                    // Fix with leeching
                    if(data_seed == "seeding\\") data_seed = cut_data[14];
                    
                    // Removing the last character of the seeded torrents
                    nb_torrents_seeded = data_seed.slice(0, -1);
                    
                    // If the Seeding Number is already created, we update is number
                    if(document.getElementById("nb_seeded_torrents")){
                        
                         document.getElementById("nb_seeded_torrents").innerHTML = nb_torrents_seeded;
                        
                    }
                    else {
                        
                        // Display of the Seeding Number
                        if(align == "left") infobar.innerHTML = "<li><a href='torrents.php?type=seeding&userid="+userid+"'>Seeding</a>: <span class='stat' title='" + nb_torrents_seeded + "' id='nb_seeded_torrents'>" + nb_torrents_seeded + "</span></li>" + infobar.innerHTML;
                        else			    infobar.innerHTML = infobar.innerHTML + "<li><a href='torrents.php?type=seeding&userid="+userid+"'>Seeding</a>: <span class='stat' title='" + nb_torrents_seeded + "' id='nb_seeded_torrents'>" + nb_torrents_seeded + "</span></li>";

                    }
                }
            });
              
	}

    // We get the Seeding Number directly after the page is loaded
    get_seed_number();
    
    // Update of the Sedding Number each 5 minutes
    setInterval(seed, 300000);


/* Script Update Checker from: http://userscripts.org/scripts/show/20145 */
var SUC_script_num = 176969; // Change this to the number given to the script by userscripts.org (check the address bar)
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
                        // Turn response into variable depending on browser
					if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
						// If google chrome
						 rt = resp.response;
					}else{
						// If firefox
						 rt = resp.responseText;
					};
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
/* Script Update Checker from: http://userscripts.org/scripts/show/20145 */