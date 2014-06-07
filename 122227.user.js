// ==UserScript==
// @name           Rainbowdash Refresh
// @description    Reloads the post list on Rainbowdash.net on an interval
// @version        1.8.7
// @author		   Brendan Hagan & ponydude2143
// @include        http://*equestriacoffeehouse.com/*
// @include        https://*equestriacoffeehouse.com/*
// @exclude        http://*equestriacoffeehouse.com/settings/*
// @exclude        https://*equestriacoffeehouse.com/settings/*
// @exclude        http://*equestriacoffeehouse.com/notice/*
// @exclude        https://*equestriacoffeehouse.com/notice/*
// @exclude        http://*equestriacoffeehouse.com/main/*
// @exclude        https://*equestriacoffeehouse.com/main/*
// @exclude        http://*equestriacoffeehouse.com/doc/*
// @exclude        https://*equestriacoffeehouse.com/doc/*
// @exclude        http://*equestriacoffeehouse.com/search/*
// @exclude        https://*equestriacoffeehouse.com/search/*
// @exclude        http://*equestriacoffeehouse.com/group/*
// @exclude        https://*equestriacoffeehouse.com/group/*
// @exclude        http://*equestriacoffeehouse.com/tags/*
// @exclude        https://*equestriacoffeehouse.com/tags/*
// @exclude        http://*equestriacoffeehouse.com/favorited/*
// @exclude        https://*equestriacoffeehouse.com/favorited/*
// @exclude        http://*equestriacoffeehouse.com/attachment/*
// @exclude        https://*equestriacoffeehouse.com/attachment/*
// @exclude        http://*equestriacoffeehouse.com/background/*
// @exclude        https://*equestriacoffeehouse.com/background/*
// @include        http://*rainbowdash.net/*
// @include        https://*rainbowdash.net/*
// @exclude        http://*rainbowdash.net/settings/*
// @exclude        https://*rainbowdash.net/settings/*
// @exclude        http://*rainbowdash.net/notice/*
// @exclude        https://*rainbowdash.net/notice/*
// @exclude        http://*rainbowdash.net/main/*
// @exclude        https://*rainbowdash.net/main/*
// @exclude        http://*rainbowdash.net/doc/*
// @exclude        https://*rainbowdash.net/doc/*
// @exclude        http://*rainbowdash.net/search/*
// @exclude        https://*rainbowdash.net/search/*
// @exclude        http://*rainbowdash.net/group/*
// @exclude        https://*rainbowdash.net/group/*
// @exclude        http://*rainbowdash.net/tags/*
// @exclude        https://*rainbowdash.net/tags/*
// @exclude        http://*rainbowdash.net/favorited/*
// @exclude        https://*rainbowdash.net/favorited/*
// @exclude        http://*rainbowdash.net/attachment/*
// @exclude        https://*rainbowdash.net/attachment/*
// @exclude        http://*rainbowdash.net/background/*
// @exclude        https://*rainbowdash.net/background/*
// ==/UserScript==

var VERSION = '1.8.7'; // Keep in sync with above

var jQ = unsafeWindow.jQuery;

/* Logs Information to the Console */
var logging = true; 
function consoleLog(message) {
	if (logging)
		GM_log("RDN Refresh: " + message);
}

consoleLog("Refresh Script Active");

function update() { 
/* Check for updates 
   Courtesy of http://www.crappytools.net
   http://userscripts.org/scripts/show/20145 */
var SUC_script_num = 101164; 	// Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}

var totalNew = lastPost = styleVar = 0; 
var hasFocus = true; 
var displayReply = true; 		//Used to replace the blip above the post field with what message is being replied to. 
var defaultVal = 30000; 		//Default Reload Interval. 
var docTitle = document.title; 	//Gets the natural document title.
var currentUser, timeout, clearContext; 
var SPOILERTAGS = "spoiler spoilers spoileralert poiler soiler spiler spoler spoier spoilr spoile sspoiler sppoiler spooiler spoiiler spoiller spoileer spoilerr psoiler sopiler spioler spolier spoielr spoilre";
var USERNAMESTAGS = "";
var ANYHIGHLIGHT = "spam";
var selection = '';

	try { currentUser = jQ('#nav_personal a, #nav_profile a').attr('href').split('/')[3]; } catch(err) { consoleLog('Error getting Username'); currentUser = 'administrator'; } 
	initVar();
	setup();
	setFocusListeners();
	createMenu(); 
	updatePause(); 
	parseLinks();
	highlightUsername(document);
    highlightAny(document.getElementById('notices_primary'));
	rotPage(document); 
    timeout = setTimeout(reload, 2000);

/* Initialize the lastPost variable */
function setup() {
	lastPost = toFlatArray(splicePosts(document))[0];
	updateStyle('post');
	updateStyle('user');
    updateStyle('any');
	updateStyle('hideSpoilers');
	updateStyle('hideUsers');
	addStyle(
			'.dropDown { margin-left:30px }' + 
			'.rdn_more { font-size:x-small }' +
			'.notice-options { width: 130px !important; }', 'dropDown');	
	addStyle(
			'.notice-options .notice_reply, .notice-options .form_repeat, ' + 
			'.notice-options .form_favor, .notice-options .form_disfavor, ' + 
			'.notice-options .repeated { margin-left: 8.2%; }', 'noticeOptions');

    // Get number of new DMs and append it to the Personal link
    if(location.href.split('/')[4] == 'inbox') {
        var lastDM = jQ('.messages li').filter(':first').attr('id');
        GM_setValue('lastDM', lastDM);
    }
    else {
        var profile = jQ('#nav_personal a, #nav_profile a').filter(':first');
        profile.after(' <a title="Inbox" id="dmcounter" href="/' + currentUser + '/inbox"></a>');
        updateDM();
}

    var notice_data = document.getElementsByName('status_textarea')[0];
	notice_data.addEventListener('keyup', 
					function(event) { 
						contextClear(this);
					}, false);
	notice_data.addEventListener('change', 
					function(event) { 
						contextClear(this);
					}, false);
}

function updateDM() {
        GM_xmlhttpRequest({
                    method: 'GET',
                    url: '/' + currentUser + '/inbox',
                    onerror: function(response) { consoleLog('Unknown Error fetching New Data'); },
                    onload: function(response) {
                        var lastDM = styleLookup('lastDM');
                        var holder = document.createElement('div');
                            holder.innerHTML = response.responseText;
                            
                        // Passing the new page to post checker
                        var lastDM = jQ(holder).find('#' + lastDM);
                        if(lastDM.length) {
                            newDM = lastDM.prevAll().length;
                            consoleLog(newDM);
                        }
                        else {
                            newDM = jQ(holder).find('.messages li').length;
                        }
                        jQ('#dmcounter').html('(' + newDM + ')');
                        setTimeout(updateDM, 60000);

                    }});
}

function contextClear(target) { 
	if (styleLookup('contextToggle', true) && (target.value == null || target.value == "")) { 
		setPost("", "", "reset"); 
		consoleLog('CLEARED');
	}
}

/* Initialize the variables - To Ensure All Variables have a Default Value*/ 
function initVar() { 

    if(GM_getValue('Settings_Version', '-1') === VERSION) { consoleLog('No settings update required.'); return; }
    var vars = [ 'userHighlight',
        'postHighlight',
        'anyHighlight',
        'anyHighlightWords',
        'ReloadInterval',
        'ReloadState',

        'post_a',
        'post_hex',

        'user_bold',
        'user_italic',
        'user_color',

        'any_color',

        'slideToggle',
        'contextToggle',
        'hideSpoilers',
        'spoilerTags',
        'hideUsernames',
        'usernamesTags',
        ];

    for(each in vars) {
        GM_setValue(vars[each], styleLookup(vars[each]));
    }
    GM_setValue('Settings_Version', VERSION);
	
	try{
		jQ('#notice_data-text-label').mouseenter(function() { 
		modifyDataText(false); }).mouseleave(function() { 
		modifyDataText(true); });	
		} catch(e) { consoleLog('notice_data-text-label could not be found');} 
}
	
function modifyDataText(mouseOut) { 
	if(a = document.getElementById('notice_data-text-label')) { 
		if (mouseOut) { 
			a.innerHTML = "What's up, " + currentUser + "?"; 
		} else { 
			var inreplyto = document.getElementById('notice_in-reply-to').value;
			a.innerHTML = 'inReplyTo: <div style="display:inline" id="replytoValue">None</div> (<a id="clearVal" href="javascript:void(0);">Clear</a>)';
			jQ('a#clearVal').click(function() {
				setPost("", "", "reset"); 
				document.getElementById('replytoValue').innerHTML = 'None';
			 });	
			if (inreplyto) {
				try { document.getElementById('replytoValue').innerHTML = '<a target="_blank" href="notice/' + inreplyto + '">' + inreplyto + '</a>'; } catch(e) { }
			}
		}
	}
}

/* Calls a fresh version of the page information and replaces the 'ol' from the old with the new. */
function reload() {
	if (styleLookup('ReloadState')) {
		GM_xmlhttpRequest({
					method: 'GET',
					url: location.href,
					onerror: function(response) { consoleLog('Unknown Error fetching New Data'); },
					onload: function(response) {
						var oldPosts, newPosts;
                        var response = response.responseText.split('<ol class="notices xoxo">')[1].split('</ol')
                            response.pop()
                            response = '<ol class="notices xoxo">' + response.join('</ol') + '</ol>';
						var holder = document.createElement('div');
							holder.innerHTML = response;
							
						/* Passing the new page to post checker */
						getNewPosts(holder);
						
						parseLinks();
						consoleLog('Post Reload Process');
					}});
		timeout = setTimeout(reload,styleLookup('ReloadInterval'));
	}
}

/* Updates the javascript onClick handling for the in-page reply links */
function parseLinks() {
	var links = document.getElementsByClassName('notice_reply');
	for (var i=0, imax=links.length; i<imax; i++) {	
		links[i].addEventListener('click', 
			function(event) {
				/* Standard Link Cancellation */
				event.stopPropagation();
				event.preventDefault();
				
				var currentLink = this.href;
				var currentLink_array = currentLink.split("replyto=");
					/* 	0: 		url base
						1:		username&in
						2:		replyto=postid
					*/
				var username = currentLink_array[1].split("&");
					/*	0: 		username
						1:		=
					*/
				var postid = currentLink_array[2];
				
				/* New Function Call to Set the Post Data */
				setPost(postid.toString(), username[0], "");
			}, false);
	}
}

/* Scroll to Top and Append Field Data to Posting Element */
function setPost(inreplyto, username, content) {
    var notice_data = jQ('#notice_data-text, .notice_data-text');
    var notice_reply = jQ('#notice_in-reply-to');
	if (content == 'reset') { 
		notice_reply.val(""); // Sets the internal reply value
	} else {
		window.scrollTo(0,0); // Scrolls to position 0,0 
		notice_data.focus(); // Ensures that the post box has focus
		notice_reply.val(inreplyto); // Sets the internal reply value
		if (username != null && username.length > 0) {
			notice_data.val('@' + username + " " + content + notice_data.val()); // Updates the Post content with the user name (and optional content).
		} else { 
			notice_data.val(content + notice_data.val()); // Updates the Post content with the user name (and optional content).
		}
	}
}

/* Sets up the right hand menu for options */
function createMenu() {
    jQ(".form_notice").append('<span style="font-size: 8pt;">Before you post spoilers, please select text and press the green key button to ROT13 encrypt/decrypt them.</span>');
    jQ(".notice_data-attach, #notice_data-attach").after('<img width="16" height="16" title="Encrypt spoiler" alt="Encrypt selection" id="nav_encrypt" style="position: absolute; right: 10.5%; top: 50px; cursor: pointer;" src="http://s8.postimage.org/oi3q2xg5t/rot13_button.png">');
	var containerDiv = jQ('<div id="rdn_refresh" class="section"></div>');
        containerDiv.html('<h2>RDN Refresh</h2>' + 
				'<input id="reloadVal" size="4" value="' + (styleLookup('ReloadInterval') / 1000) + '"/>&nbsp;' + 
				'<img style="display: inline; vertical-align: middle" id="nav_pause" alt="Pause" title="Pause AutoRefresh" width="16" height="16"/>' + 
				'<div><input id="userHighlight" type="checkbox" value="userHighlight"/> Highlight User Mentions <a href="#" class="rdn_more" id="userToggle">config</a></div>' + 
				'<div id="userHide" class="dropDown" style="display:none">' + 
					'<input id="user_bold" type="checkbox"/> Bold' +
					'<br/><input id="user_italic" type="checkbox"/> Italic' +					
					'<br/><input id="userHighlightColor" size="6" value="' + styleLookup('user_color') + '"/>&nbsp;Color</div>' + 
				'<div><input id="postHighlight" type="checkbox" value="postHighlight"/> Highlight New Posts <a href="#" class="rdn_more" id="postToggle">config</a></div>' + 
				'<div id="postHide" class="dropDown" style="display:none">' +
					'<input id="postHighlightColor" size="6" value="' + styleLookup('post_hex') + '"/>&nbsp;Color' +
					'<br/><input id="postAlpha" size="6" value="' + styleLookup('post_a') + '"/>&nbsp; Alpha {0.0 - 1.0}</div>' +
                '<div><input id="anyHighlight" type="checkbox" value="anyHighlight"/> Hilite Any (Slow)<a href="#" class="rdn_more" id="anyToggle">config</a></div>' +
                '<div id="anyHide" class="dropDown" style="display:none">' +
                    '<input id="anyHighlightWords" size="20" value="' + styleLookup('anyHighlightWords') + '"/>&nbsp;Words<br/>' +
                    '<input id="anyHighlightColor" size="6" value="' + styleLookup('any_color') +'"/>&nbsp;Color</div>' +
				'<div><input id="contextToggle" type="checkbox" value="contextToggle"/> Clear Context After Post</div>' + 
				'<div><input id="slideToggle" type="checkbox" value="slideToggle"/> Slide Animation</div>' + 
				'<div><input id="hideSpoilers" type="checkbox" value="hideSpoilers"/> Hide Spoilers <a href="#" class="rdn_more" id="spoilerToggle">config</a></div>' + 
				'<div id="spoilerHide" class="dropDown" style="display:none">' +
					'<input id="spoilerTags" size="20" value="' + styleLookup('spoilerTags') + '"/>Tags</div>' +
				'<div><input id="hideUsernames" type="checkbox" value="hideUsernames"/> Hide Usernames <a href="#" class="rdn_more" id="usernamesToggle">config</a></div>' + 
				'<div id="usernamesHide" class="dropDown" style="display:none">' +
					'<input id="usernamesTags" size="20" value="' + styleLookup('usernamesTags') + '"/>Usernames and IDs</div>' +
				'<div><a title="Report a Problem to haganbmj&#10;&#13;You MUST be Logged In" id="report" href="">Report Problem</a></div>');
	
	/* Placing the Element As the First within the Side Panel */
	var aside_target = jQ('#aside_primary');
	aside_target.prepend(containerDiv);
	
	/* Sets the initial checkbox state, along with corrosponding style to update*/ 
    var checkboxes = {'userHighlight': 'user',
               'user_bold': 'user',
               'user_italic': 'user',
               'postHighlight': 'post',
               'anyHighlight': 'any',
               'contextToggle': '',
               'slideToggle': '',
               'hideSpoilers': 'hideSpoilers',
               'hideUsernames': 'hideUsers',
               };

    for(each in checkboxes){
        var checked = styleLookup(each);
        jQ('#' + each).attr('checked', checked);
        setCheck(each, checkboxes[each]);
    };
	
	/* Configures the JS calls for the Menu */	
    setSlider('userToggle','userHide');

								document.getElementById('userHighlightColor').addEventListener('change', 
									function(event) { 
										var hex = this.value.toString();
										if (hex.charAt(0)!='#') { hex = '#' + hex; }
										setValue('user_color', hex);
										updateStyle('user');
									}, false);
									
								setSlider('postToggle', 'postHide');

								document.getElementById('postHighlightColor').addEventListener('change', 
									function(event) { 
										setValue('post_hex', this.value);
										updateStyle('post');
									}, false);
								document.getElementById('postAlpha').addEventListener('change', 
									function(event) { 
										setValue('post_a', this.value);
										updateStyle('post');
									}, false);
                                setSlider('spoilerToggle','spoilerHide');
								document.getElementById('spoilerTags').addEventListener('change', 
									function(event) { 
										setValue('spoilerTags', this.value);
									}, false);
                                setSlider('usernamesToggle', 'usernamesHide');
								document.getElementById('usernamesTags').addEventListener('change', 
									function(event) { 
										setValue('usernamesTags', this.value);
									}, false);

				document.getElementById('reloadVal').addEventListener('change',
					function(event) {
						setValue('ReloadInterval', parseInt(this.value * 1000));
						consoleLog('Refresh Value: ' + styleLookup('ReloadInterval'));
						if (timeout) { clearTimeout(timeout); }
						reload();
						event.stopPropagation();
						event.preventDefault();
					}, false);
							
				document.getElementById('nav_pause').addEventListener('click', 
					function(event) { 
						setValue('ReloadState', !styleLookup('ReloadState')); 
						if (timeout) { clearTimeout(timeout) };
						updatePause();
						reload();
						parseLinks(); 
						event.stopPropagation();
						event.preventDefault();
					}, false);

                // Encrypt spoilers
				document.getElementById('nav_encrypt').addEventListener('click', 
					function(event) { 
                            var notice_data = jQ('#notice_data-text, .notice_data-text');
                        if(selection != '') {
                            rotted = rot13(selection);
                            notice_data.val(notice_data.val().replace(selection, rotted));
                        }
                        else {
                            rotted = rot13(notice_data.val());
                            notice_data.val(rotted);
                        }
                        selection = '';
						event.stopPropagation();
						event.preventDefault();
					}, false);

				document.getElementsByName('status_textarea')[0].addEventListener('mouseup', 
					function(event) { 
                        selection = getSelected();
					}, false);
				
                setSlider('anyToggle','anyHide');

                document.getElementById('anyHighlightColor').addEventListener('change', 
                    function(event) { 
                        var hex = this.value.toString();
                        if (hex.charAt(0)!='#') { hex = '#' + hex; }
                        setValue('any_color', hex);
                        updateStyle('any');
                    }, false);

								document.getElementById('anyHighlightWords').addEventListener('change', 
									function(event) { 
										setValue('anyHighlightWords', this.value);
									}, false);

					
				document.getElementById('report').addEventListener('click',
					function(event) { 
						event.stopPropagation();
						event.preventDefault();
						setPost("", "haganbmj", "#rdnrefreshBUG ");
					}, false);
				
}

/* Refreshes the state of the pause button */
function updatePause() {
        var nav_pause = jQ('#nav_pause');
	if (styleLookup('ReloadState')) {
		nav_pause.attr({'title': "Pause AutoRefresh",
                        'alt':   "Pause",
		                'src':   "http://i1196.photobucket.com/albums/aa412/haganbmj/pause_button.png",
        });
	} else {
		nav_pause.attr({'title': "UnPause AutoRefresh",
		                'alt':   "UnPause",
		                'src':   "http://i1196.photobucket.com/albums/aa412/haganbmj/play_button.png",
        });
	}
}

/* Collects the new and old posts, which are stored to an array for comparison */
function getNewPosts(holder) {
	/* Compiles an Array of NewPosts and an array of OldPosts */
	var newPosts = splicePosts(holder);	
	var oldPosts = splicePosts(document);
	
	/* Convert the Post Arrays to ID Numbers for comparison */
	var oldPostsID = toFlatArray(oldPosts);
	var newPostsID = toFlatArray(newPosts);
	
	consoleLog("Attempting to Match: " + lastPost);
	var location = contains(lastPost, newPostsID); //Sets the location at which the most recent post on the Old Listing is on the New. 
	consoleLog("Location of Match: " + location); 
	lastPost = newPostsID[0]; 
	
	/* Replacing Posts */
	//DO STUFF TO REPLACE INDIVIDUAL LI ELEMENTS - NOT BENEFICIAL. 
	
	/* Replaces the entire ol section - temporary */
		newPosts = holder.getElementsByTagName('ol')[0];

        // Remove spoilers
        if(styleLookup('hideSpoilers') && styleLookup('spoilerTags').replace(' ','') != '') {
            spoilerTags = styleLookup('spoilerTags').toLowerCase().split(' ');
            jQ(newPosts).find(".tag a").each(
                    function(){
                        tag = jQ(this);
                        jQ.each(spoilerTags, function() {
                            if(this == tag.html().toLowerCase()) {
                                //tag.parent().parent().parent().parent().remove();
								var target = tag.parent().parent().parent(); 
								//target.setAttribute('class', target.getAttribute('class') + ' hideSpoiler');
								target.attr('class', target.attr('class') + ' hideSpoiler'); 
								target.parent().attr('class', target.parent().attr('class') + ' hideSpoilerT'); //select LI
                                consoleLog("Spoiler Class added to " + target.attr('id'));
                            }
                        });
                        });
        }

        // Remove users
            if(styleLookup('hideUsernames') && styleLookup('usernamesTags').replace(' ','') != '') {
            usernamesTags = styleLookup('usernamesTags').split(' ');
            jQ(newPosts).find(".vcard.author").each(
                    function(){
                        tag = jQ(this).find(".nickname.fn");
                        jQ.each(usernamesTags, function() {
                            if(this == tag.html()) {
                                //tag.parent().parent().parent().parent().remove();
								var target = tag.parent().parent().parent(); 
								target.attr('class', target.attr('class') + ' hideUser');
								target.parent().attr('class', target.parent().attr('class') + ' hideUserT'); //select LI
								//target.setAttribute('class', target.getAttribute('class') + ' hideUser'); 
                                consoleLog("Blocked User Class added")
                            }
                        })
                    })
            }
					
        /* Update the title and highlight new posts */
        if (parseInt(location) > 0) {
            totalNew = totalNew + parseInt(location);
            flashTitle(totalNew);
        }
        highlightPosts(newPosts, location);
        highlightUsername(newPosts);
        highlightAny(newPosts);

        rotPage(newPosts);

		oldPosts = document.getElementsByTagName('ol')[0];
			if (oldPosts != null && newPosts != null) {
				oldPosts.parentNode.replaceChild(newPosts, oldPosts);
			} else {
				consoleLog('Error: oldPosts/newPosts null?');
			}

            if(styleLookup('slideToggle')) {
            jQ('.newPost').slideDown(500);
            }
	
}

				/* Converts a NodeList (Collection) To an Array */
				function collectionToArray(collection) {  
						var ary = [];  
						for(var i=0, len = collection.length; i < len; i++)  
						{  
							ary.push(collection[i]);  
						}  
						return ary;  
					} 
					
				/* Splices an array of Posts down to the size of the valid posts */
				function splicePosts(source) {
					var tempPosts = collectionToArray(source.getElementsByClassName('hentry notice'));
					var breakLocation = tempPosts.length;
					for (var i=0, tempSize = tempPosts.length; i < tempSize; i++) {
						if (tempPosts[i].getAttribute('id') != null) {
							continue;
						} else { 
							breakLocation = i;
							break;
						}
					}
					tempPosts.splice(breakLocation, (tempPosts.length - breakLocation));
					return tempPosts;
				}
				
				/* Converts an Array of li's to flat post ids */
				function toFlatArray(oldArray) {
					var newArray = [];
						for (var i=0; i < oldArray.length; i++) {
							var postID = oldArray[i].getAttribute('id');
							newArray[i] = postID;
						}
						//consoleLog("New Post Array Created");
						return newArray;
				}

				/* Checks if an array contains a specified value, and returns the index location if so 
				   If the array does /not/ contain the value, returns the total size of the array (last index + 1) */
				function contains(value, array) {
					for (var i=0, imax=array.length; i < imax; i++) {
						if (array[i] == value) { 
							return i; //Return the position of the matched element
						}
					}
					consoleLog("Post Match Failed. Either there are 20 new messages, or the post has been deleted.");
					//return array.length;
					return 0; 
				}

/* Changes/Updates the Window Title if/when New Posts are Available */
function flashTitle(newTitle) {
	if (hasFocus || newTitle == "reset") { //Check if the Window is in Focus, if so - break the function. 
		document.title = ".";
		document.title = docTitle; 
		totalNew = 0;
	} else {
		document.title = ".";
		document.title = "(" + newTitle + ") " + docTitle;
	}
}

/* Highlights the newest posts (from the most recent refresh cycle) */
function highlightPosts(newPosts, num) {
		post = splicePosts(newPosts);
		for (var i=0; i < num; i++) {
			//post[i].setAttribute("style", "background-color: rgba(239, 182, 29, .25);");
			post[i].setAttribute('class', post[i].getAttribute('class') + ' newPost'); 
			if (styleLookup('slideToggle', true)) { jQ(post[i]).hide(); } 
		}
}

/* Highlights any word the user has typed into the highlight any box. SLOW */
function highlightAny(newPosts) {
    if(styleLookup('anyHighlight') && styleLookup('anyHighlightWords').replace(' ','') != ''){
        var words = styleLookup('anyHighlightWords').split(' ');
		var posts = newPosts.getElementsByClassName('entry-content');
        for(word in words){
            wordex = new RegExp('(' + words[word] + ')', "gi");
            for (var i=0, imax=posts.length; i<imax; i++) {	
                posts[i].innerHTML = posts[i].innerHTML.replace(wordex, '<span class="anyHighlight">$1</span>');
            }
        }
		consoleLog('Words spanned.');
    }
}

/* Scans the page for the current user's name, then applys a highlight */
function highlightUsername(newPosts) {
		var mentionCounter = 0; 
		var posts = newPosts.getElementsByClassName('fn nickname');
		for (var i=0, imax=posts.length; i<imax; i++) {	
			//consoleLog('username: ' + posts[i].innerHTML); 
			if (posts[i].innerHTML.toLowerCase() == currentUser && (posts[i].getAttribute('class').substring(0,11) == 'fn nickname')) {
				//posts[i].setAttribute('style', 'color:red; font-weight:bold;');
				posts[i].setAttribute('class', posts[i].getAttribute('class') + ' userHighlight');
				mentionCounter++;
			}
		}
		consoleLog('Username: ' + currentUser + ', was mentioned ' + mentionCounter + ' time(s) on this page.');
}
		
function blurFunc() {
	hasFocus = false;
	//consoleLog('event blur');
}

function focusFunc() {
	hasFocus = true;
	flashTitle("reset");
}

function setFocusListeners() { 
	jQ(document).ready(function () {
		jQ(window).bind("focus", function(event) {
			focusFunc();
		}).bind("blur", function(event) {
			blurFunc();
		});
	});

	/* Updates the title when the body of the page is clicked */
	 jQ('body').click(function() {
		flashTitle("reset");
	 });
 }
 
//$(window).blur(blurFunc).focus(focusFunc);

/*
	  _   _ _____ ___ _     ___ _____ ___ _____ ____  
	 | | | |_   _|_ _| |   |_ _|_   _|_ _| ____/ ___| 
	 | | | | | |  | || |    | |  | |  | ||  _| \___ \ 
	 | |_| | | |  | || |___ | |  | |  | || |___ ___) |
	  \___/  |_| |___|_____|___| |_| |___|_____|____/ 
													  
*/

function setCheck(checkbox, style) {
    document.getElementById(checkbox).addEventListener('change', 
        function(event) { 
            setValue(checkbox, this.checked);
            if(style != '') {
                updateStyle(style);
            }
        }, false);
}


/* Sets a specified div combo as a slider */
function setSlider(link, slidediv) {
    var SPEED = 200;
    document.getElementById(link).addEventListener('click', 
        function(event) { 
            var target = document.getElementById(slidediv);
            if (target.style.display == 'none') { 
                jQ(target).slideDown(SPEED); 
            } else { 
                jQ(target).slideUp(SPEED); 
            }
            event.stopPropagation();
            event.preventDefault();
        }, false);
}

/* Stores values as defined by the user */
function setValue(key, value) {
	/*if (value == null || value <= 0) {
		value = defaultVal;
	}*/
	//prefs[key] = value;
	GM_setValue(key, value);
	consoleLog("Value: " + key + " - " + value);
}

/* Returns the value for reloadInterval only - Ensures that it is valid */
function getValue(key, value) {
	var checkVar = GM_getValue(key, value);
	if (checkVar == null || checkVar < 5000) {
		checkVar = value;
	}
	var x = parseInt(checkVar); 
	if (checkVar == x) {
		return checkVar;
	} else {
		return value; 
	}
}

/* Add Custom CSS Styles - Appends them within the <head>
   Attempts to use the GM function, but will backup to page searching if necessary 
   Style is created with the ID >> "RDN_Style" + styleID << */
function addStyle(css, styleID) {
	/*if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else */if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		style.id = 'RDN_Style' + styleID;
		heads[0].appendChild(style);
		consoleLog('Style: ' + style.id + ' added.');
	}
}

/* Removes a style, by ID number. Used for when a new/updated Style is set into place. 
   Takes only the StyleID (number) as an input. */
function removeStyle(styleID) { 
	if (style = document.getElementById('RDN_Style' + styleID)) { 
		style.parentNode.removeChild(style);
		consoleLog('Style: ' + 'RDN_Style' + styleID + ' removed.');
	}
}

function styleLookup(stylevar) {
	switch(stylevar) { 
		case 'post_a':
			return GM_getValue('post_a', '0.25'); break;
		case 'post_hex': 
			return GM_getValue('post_hex', '#efb61d'); break;
		case 'user_bold':
			return GM_getValue('user_bold', true); break;
		case 'user_italic':
			return GM_getValue('user_italic', true); break;
		case 'user_color':
			return GM_getValue('user_color', 'red'); break;
        case 'any_color':
            return GM_getValue('any_color', 'red'); break;
		case 'postHighlight':
			return GM_getValue('postHighlight', true); break;
		case 'userHighlight':
			return GM_getValue('userHighlight', true); break;
        case 'ReloadState':
            return GM_getValue('ReloadState', true); break;
        case 'ReloadInterval':
            return parseInt(GM_getValue('ReloadInterval', defaultVal)); break;
        case 'anyHighlight':
            return GM_getValue('anyHighlight', false); break;
		case 'contextToggle':
			return GM_getValue('contextToggle', true); break;
		case 'slideToggle':
			return GM_getValue('slideToggle', true); break;
		case 'hideSpoilers':
			return GM_getValue('hideSpoilers', false); break;
        case 'spoilerTags':
            return GM_getValue('spoilerTags', SPOILERTAGS); break;
		case 'hideUsernames':
			return GM_getValue('hideUsernames', false); break;
        case 'usernamesTags':
            return GM_getValue('usernamesTags', USERNAMESTAGS); break;
        case 'anyHighlightWords':
			return GM_getValue('anyHighlightWords', ANYHIGHLIGHT); break;
        case 'lastDM':
            return GM_getValue('lastDM', 'message-0'); break;
	}
}

function updateStyle(styleID) { 
	removeStyle(styleID);
		switch(styleID) {
			case 'post': 	
				var rgb = hex2rgb(styleLookup('post_hex'));
				if (styleLookup('postHighlight')) { 
					addStyle(
						'.newPost, .newPost:hover { background-color: rgba(' + 
							rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + 
							styleLookup('post_a') + ') !important; }', 'post');
				}
				break;
			case 'user':
				if (styleLookup('userHighlight')) { 
						var weight = 'normal';
						var italic = 'normal';
						if (styleLookup('user_bold')) { 
							weight = 'bold'; }
						if (styleLookup('user_italic')) {
							italic = 'italic'; }
					addStyle(
						'.userHighlight { ' + 
							'color:' + 			styleLookup('user_color') + ';' + 
							'font-weight:' +	weight + ';' + 
							'font-style:' + 	italic + '; }', 'user');
				}
				break;
			case 'hideSpoilers': 			
				if (styleLookup('hideSpoilers')) { 
					addStyle(
						'.hideSpoiler, .hideSpoilerT .entry-content, .hideSpoilerT .notice-options { ' + 
							'display: none; }' + 
						'.hideSpoilerT:before { ' + 
							'content: "Spoiler Hidden"; font-size: xx-small; font-style: italic; } ', 'hideSpoilers');
					}
				break; 
			case 'hideUsers': 
                if (styleLookup('hideUsernames')) { 
                    addStyle(
                            '.hideUser, .hideUserT div.entry-content, .hideUserT div.notice-options { ' + 
                                'display: none; }' + 
                                '.hideUserT:before { ' + 
                                    'content: "User Hidden"; font-size: xx-small; font-style: italic; } ', 'hideUsers');
                }
                break;
            case 'any':
                if (styleLookup('anyHighlight')) {
                    addStyle('.anyHighlight { ' +
                        'font-weight: bold;' +
                        'color:' + styleLookup('any_color') + '; }'
                        );
                }
				break; 
		}
	}
	
/* Converts a hex string to an array RGB */
function hex2rgb(hex){
	if (hex.charAt(0)=='#') { hex = hex.substring(1, hex.length); } 
	var rgbArray = new Array(3) 
		rgbArray[0] = parseInt(hex.substring(0,2),16);
		rgbArray[1] = parseInt(hex.substring(2,4),16);
		rgbArray[2] = parseInt(hex.substring(4,6),16);
	return rgbArray;
}

//Get user selected text
function getSelected(){
  var userSelection, ta;
  if (window.getSelection && document.activeElement){
    if (document.activeElement.nodeName == "TEXTAREA" ||
        (document.activeElement.nodeName == "INPUT" &&
        document.activeElement.getAttribute("type").toLowerCase() == "text")){
      ta = document.activeElement;
      userSelection = ta.value.substring(ta.selectionStart, ta.selectionEnd);
    } else {
      userSelection = window.getSelection();
    }
  } else {
    // all browsers, except IE before version 9
    if (document.getSelection){       
        userSelection = document.getSelection();
    }
    // IE below version 9
    else if (document.selection){
        userSelection = document.selection.createRange();
    }
  }
return userSelection;
}

//ROT13 any text
function rot13(text){
    return text.replace(/[a-zA-Z]/g, function(c){
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
}

function rotPage(newPosts) { 
	//consoleLog('rotpage entered'); 
    jQ(newPosts).find('.notice-options').each(function(){
    container = document.createElement('div');
    jQ(container).html('<form class="form_rot13" width="16" style="position: inherit; bottom: 0; margin-left: 8.2%; float: left;">' +
				'<img width="16" height="16" style="position: inherit; cursor: pointer;" title="Encrypt/Decrypt spoiler" src="http://s8.postimage.org/oi3q2xg5t/rot13_button.png"/>' +
        '</form>');
    container.addEventListener('click', function(){
        var target = this.parentNode.parentNode;
        var theContent = jQ(target).find('p.entry-content');
        theContent.text(rot13(theContent.text()));
    }, false);
        jQ(this).prepend(container);
    });
	}