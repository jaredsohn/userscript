// ==UserScript==
// @version     1.8.5
// @name        DEBUG CODE - DO NOT DOWNLOAD
// @author      quangntenemy, Emilien Klein, DG-Root
// @description Forumwarz.com - Shows the status of INCIT and plays sounds.
// @include     http://forumwarz.com/incit
// @include     http://forumwarz.com/incit#
// @include     http://*.forumwarz.com/incit
// @include     http://*.forumwarz.com/incit#
// @resource    resSoundVoting http://zhost.tk/u/n2/voting.wav
// @resource    resSoundNewRound http://zhost.tk/u/zt/newround.wav
// @resource    resSoundResults http://zhost.tk/u/h0/results.wav
// @resource    resSoundNag http://zhost.tk/u/54/nag.wav
// @resource    resSoundUrgency http://zhost.tk/u/p8/urgency.wav
// @resource    resSoundNotify http://zhost.tk/u/42/notify.wav
// @resource    resSoundHighlight http://zhost.tk/u/rp/highlight.wav
// @resource    resSoundCelebrate http://incit.250free.com/alerts/celebrate.wav
// @resource    resImgSettings http://zhost.tk/u/na/settings.gif
// @resource    resImgGear http://zhost.tk/u/ug/gear.png
// ==/UserScript==
/* History:
05.11.2011 - v1.8.5 - Test changes.
09.04.2011 - v1.8.4 - Changed resource host to zhost.tk, 250free died. 
25.06.2010 - v1.8.3.1 - Added celebration alert, doesn't quite work. [never released]
24.06.2010 - v1.8.3 - Fixed a small bug where round history was generated backwards,
                      made 'reset' button refresh the history and display the most
                      recent round results.
24.06.2010 - v1.8.2 - Fixed bug with ads displaying, added option to remove ads,
                      made INCIT-Bot optional, made branch of code without chat
                      features not execute (faster script), added multiple previous
                      round results display,added optional alert box upon voting, sped 
                      up nick name matching by using generated regular expression,
                      fixed nickname highlighting so message sent and nickname 
                      highlight did not collide.
20.06.2010 - v1.8.1 - Moved settings, fixed console bug, inserted '@all' as a default nick,
                      added sub urgency nagging if you're the last one to submit, added settings tabs,
                      rewrote settings text, added settings titles for controls, added option groups,
                      added individual volume controls, removed individual checkboxes.
17.06.2010 - v1.8 - Updated to cache resources for local sounds and added a missing check for notify alerts.
17.06.2010 - v1.7 - Updated to add chat sounds and nick highlighting.
10.06.2010 - v1.6 - Updated to add nagging and cleaned up code.
09.06.2010 - v1.5 - Updated to add options, clean up code, and make audio a function.
31.05.2010 - v1.4 - Updated to fix audio, parse out INCIT-Bot, and to clean up code.
29.05.2010 - v1.3 - Updated to add an audiable tone to notify of voting sessions.
29.05.2010 - v1.2 - Updated minimum timer to be a product of the submissions received.
29.05.2010 - v1.1 - Updated to a non-polling version to be kinder to the ForumWarz servers.
29.05.2010 - v1.0 - First version uploaded to userscripts.org
*/
/* To Do: 
* [search for #TODO# & #REPLACEME#]
* Add: Titlebar formatting options. [mode, change on alert(type)]
* Add: Format parsing for autosub features.
* Add: Autosub sanitizing.
* Add: Autovoting features.
* Add: Fallback submit, detect {div id="spinner"} and fallback sub.
* Add: Master volume.
* Add: Image previews of submissions.
* Add: Improved assholes online counter.
* Del: Reliance on INCIT-Bot 5000 for newrounds; (store seconds counter, compare for higher number); hijack chat handler function?
* Mod: Better descriptions for autopilot features.
* Mod: Try to 
* Mod: Modify draw-settings code.
*/
// Settings information.
datCurrentUser = document.getElementById('talk_entry').childNodes[3].innerHTML.split('"your_name":"')[1].split('","colors"')[0];
datAuthToken = document.getElementById("logged_in_status").childNodes[6].childNodes[1].getAttribute('onclick').split("('value', '")[1].split("');")[0];

/* [['tabName',[
              [<!TABFAMILY>['variablename', 'defaultvalue', 'shortDescription', 'longDescription', 'type', ('resource'?), ('additionalAttribs'[[a,b],[c,d]]?)],
                           [...]],
              [<!TABFAMILY2>[...]]
              ]
    ],
    ['tabName2',[
               [[...]],
               [[...],
                [...]]
               ]
    ]]; */
// This variable identifies the groupings of the settings and their default avalues.
name_sets = [['Snd',[
                      [['useSound', true, 'Use sounds', 'Toggle the use of sounds by INCIT Monitor. Default: on', 'checkbox']],
                      [['useVoteAlert', false, '', 'Grabs your attention with a pop-up alert box when it is time for voting.', 'checkbox'],
                       ['volVoteSound', '1.0', '', 'Volume of the voting start sound. Number between 1.0 and 0.0. Default: 1.0', 'text', undefined, [['style','width: 15%; margin-right: 5px;'],['size',3]]],
                       ['urlVoteSound', 'http://www.mdn.fm/files/292806_jerwp/voting.wav', 'Voting started', 'URL to the sound file. Play an alert when voting starts.', 'text', 'resSoundVoting']],
                      [['useNewRoundAlert', false, '', 'Grabs your attention with a pop-up alert box when a new round starts.', 'checkbox'],
                       ['volNewRoundSound', '1.0', '', 'Volume of the new round sound. Number between 1.0 and 0.0. Default: 1.0', 'text', undefined, [['style','width: 15%; margin-right: 5px;'],['size',3]]],
                       ['urlNewRoundSound', 'http://zhost.tk/u/zt/newround.wav', 'New round', 'URL to the sound file. Play an alert when a new round begins.', 'text', 'resSoundNewRound']],
                      [['useResultsAlert', false, '', 'Grabs your attention with a pop-up alert box when results are displayed.', 'checkbox'],
                       ['volResultsSound', '1.0', '', 'Volume of the results displayed sound. Number between 1.0 and 0.0. Default: 1.0', 'text', undefined, [['style','width: 15%; margin-right: 5px;'],['size',3]]],
                       ['urlResultsSound', 'http://zhost.tk/u/h0/results.wav', 'Results shown', 'URL to the sound file. Play an alert when round results are displayed.', 'text', 'resSoundResults']],
//                      [['useCelebrateAlert', false, '', 'Grabs your attention with a pop-up alert box when you won.', 'checkbox'],
//                       ['volCelebrateSound', '1.0', '', 'Volume of the round won sound. Number between 1.0 and 0.0. Default: 1.0', 'text', undefined, [['style','width: 15%; margin-right: 5px;'],['size',3]]],
//                       ['urlCelebrateSound', 'http://incit.250free.com/alerts/celebrate.wav', 'Won round', 'URL to the sound file. Play an alert when user wins a round.', 'text', 'resSoundCelebrate']],
                      [['useNagAlert', false, '', 'Grabs your attention with a pop-up alert box when you haven\t submitted and the round gets extended.', 'checkbox'],
                       ['volSubNagging', '1.0', '', 'Volume of the submission nagging sound. Number between 1.0 and 0.0. Default: 1.0', 'text', undefined, [['style','width: 15%; margin-right: 5px;'],['size',3]]],
                       ['urlSubNagging', 'http://zhost.tk/u/54/nag.wav', 'Submission nagging', 'URL to the sound file. Play an alert if the user did not submit yet and the round gets extended.', 'text', 'resSoundNag'],
                       ['useNagUrgencyAlert', false, '', 'Grabs your attention with a pop-up alert box when you are the last required submission before voting starts.', 'checkbox'],
                       ['volSubNagUrgency', '1.0', '', 'Volume of the urgent submission nagging sound. Number between 1.0 and 0.0. Default: 1.0', 'text', undefined, [['style','width: 15%; margin-right: 5px;'],['size',3]]],
                       ['urlSubNagUrgency', 'http://zhost.tk/u/p8/urgency.wav', 'Urgent submission nag', 'URL to the sound file. Play an alert if the user did not submit and only one more submission is needed.', 'text', 'resSoundUrgency'],
                       ['varNagSensitivity', '1', 'Nagging sensitivity', 'Number of rounds pushed before submission nagging kicks in. (Applies to Urgent Nagging, too.)', 'text']],
                      ]
            ],
            ['Cht',[
                    [['useChatFeatures', true, 'Use chat features', 'Toggle the use of chat enhancing features.', 'checkbox']],
                    [['varKillAds', false, 'Remove text ads', 'Disables ads that are placed in INCIT chat.', 'checkbox']],
                    [['useChatNotifyAlert', false, '', 'Grabs your attention with a pop-up alert box when chat has activity.', 'checkbox'],
                     ['volChatNotify', '1.0', '', 'Volume of the chat activity sound. Number between 1.0 and 0.0. Default: 1.0', 'text', undefined, [['style','width: 15%; margin-right: 5px;'],['size',3]]],
                     ['urlChatNotify', 'http://zhost.tk/u/42/notify.wav', 'Chat activity', 'URL to the sound file. Play an alert whenever someone in the chat sends a new message.', 'text', 'resSoundNotify']],
                    [['useChatHighlightAlert', false, '', 'Grabs your attention with a pop-up alert box when one of the below names are mentioned.', 'checkbox'],
                     ['volChatHighlight', '1.0', '', 'Volume of chat highlight sound. Number between 1.0 and 0.0. Default: 1.0', 'text', undefined, [['style','width: 15%; margin-right: 5px;'],['size',3]]],
                     ['urlChatHighlight', 'http://zhost.tk/u/rp/highlight.wav', 'Nickname mentoined', 'URL to the sound file. Play an alert whenever one of the names below are mentioned.', 'text', 'resSoundHighlight'],
                     ['datChatHighlight', datCurrentUser+',@all', 'Nicknames list', 'A comma separated list of nicknames. Do not use spaces if the nickname does not include them, they count.', 'text'],
                     ['useChatHighlight2', true, 'Highlight alternate nicknames', 'Enable highlighting feature (whenever someone says your name normally) in INCIT Chat for alternate names.', 'checkbox']]
                    ]
            ],
			// #TODO# Options for voting should go here.
            ['Ato',[
                    [['useAutoPilot', false, 'Use autopilot features', 'Toggle the use of INCIT auto-sub/vote features.', 'checkbox']],
                    [['useAutoVote', false, 'Use autovote', 'Votes for a submission automatically.', 'checkbox']],
                    [['useAutoSubmit', false, 'Use autosubmit', 'Submits generated poster automatically.', 'checkbox'],
					 ['datAutoSubTitle', 'INCIT Monitor', '', 'Submission title format. #REPLACEME#', 'text'],
					 ['datAutoSubText', 'For President', '', 'Submission text format. #REPLACEME#', 'text']],
                    ]
            ],
            ['Hst',[]
            ]];
// This variable is dynamically populated with the variable-level contents of name_sets.
extr_sets = [];
// This variable serves as a means of telling where each tab sections off.
splt_sets = [];
i = -1;
for(a in name_sets){
    // Iterating the names and arrays.
    tempBegin = i+1;
    for(b in name_sets[a][1]){
        // Iterating the family groups.
        for(c in name_sets[a][1][b]){
            // Iterating each individual setting.
            extr_sets[extr_sets.length]=name_sets[a][1][b][c];
            i++;
        }
    }
    splt_sets[a] = [tempBegin,i+1];
}
sets = [];
lastStamp = Math.round(new Date().getTime() / 1000);
lastRound = [];
lastStats = [];
// lastStats[x][0] = Number of Assholes on.
// lastStats[x][1] = Image URL

// Stat variables.
numRoundsAttended = 0;
numPeopleInIncit = 0;
numSecondsLeft = 0;
numSubsInIncit = 0;
numRoundsPushed = 0;

// Flag variables.
numRoundMode = 0;
// 0 = No round change. (What the round type reverts to after alerting.)
// 1 = New Round.
// 2 = Pushed Round
// 3 = Voting Round
// 4 = Results Round
numLastChat = 3;
isPartyStrobe = 0;
isPartyStarted = 0;
isNagTime = 0;
isNagTrip = 0;
isHighlight = 0;
isSubbed = 0;
numMinSubs = 5;
numSecsIsPushed = 25;
numCurrentTab = 0;
incitmonitorsets_open = false;

// Constant variables.
initResizeText = document.getElementById('vertical_resizer').innerHTML;
numSoundLayers = 3;

// Stylesheet insertion.
GM_addStyle("#settings { z-index: 100; background-color: #c3d9ff; padding-left: 3px; padding-top: 3px; padding-right: 3px; height: 450px; } #settings div.settings_header { background-color: #FFFFFF; background-image: url("+GM_getResourceURL("resImgSettings")+"); background-position: 3px 3px; background-repeat: no-repeat; height: 56px; } #settings div.settings_header a { float: right; font-size: 18px; padding-right: 5px; padding-top: 3px; text-decoration: none; } #settings div.settings_header .nest {  padding-top: 30px; display: block; text-decoration: none; width: 100%;} #settings .scroll_list { overflow: auto; height: 358px; } #settings .scroll_list .setting { padding: 3px 3px 3px 3px; background-color: #fff; margin-top: 1px; display: block; text-decoration: none; width: 97%;} #settings .scroll_list .setting .name { text-decoration: underline; } #settings .scroll_list .setting .title { font-weight: bold; font-size: 120%; display: inline; } #settings .scroll_list .setting .text { font-size: 110%; } #settings .scroll_list .setting .votes { float: right; }");

// Inject settings icon.
newImg = document.createElement("img");
newImg.setAttribute('id', 'incit_monitor_settings');
newImg.setAttribute('src', GM_getResourceURL("resImgGear"));
newImg.setAttribute('alt', 'sets');
newImg.setAttribute('style', 'display: table-cell; vertical-align: middle');
document.getElementById('idc_form').appendChild(newImg);
document.getElementById('incit_monitor_settings').addEventListener("click", openSettings, true);
delete newImg;

// Establish sound layers.
document.getElementById('vertical_resizer').removeChild(document.getElementById('vertical_resizer').childNodes[0]);
newDiv = document.createElement('div');
newDiv.setAttribute('id', 'layers_text');
document.getElementById('vertical_resizer').appendChild(newDiv);
delete newDiv;
for(i=0;i<numSoundLayers;i++){
    newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'layers_'+i);
    newAudio = document.createElement('audio');
    newAudio.setAttribute('src', '');
    newAudio.setAttribute('hidden', 'true');
    newDiv.appendChild(newAudio);
    document.getElementById('vertical_resizer').appendChild(newDiv);
}
document.getElementById('layers_text').innerHTML = initResizeText;

// Settings display functions.
function establishSettings(){
    // Build the settings pane in the background.
    // Settings master container.
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'settings');
    newDiv.setAttribute('style', "overflow: visible; position: absolute; width: 250px; height: 450px; right: 1%; top: 0px; display: none;");
    // Settings wrapper container.
    var newDiv2 = document.createElement('div');
    newDiv2.setAttribute('id', 'settings_list');
    // Settings header.
    var newDiv3 = document.createElement('div');
    newDiv3.setAttribute('class', 'settings_header');
    // Tabs.
    var newDiv0 = document.createElement('div');
    newDiv0.setAttribute('class', 'panel');
    newDiv0.setAttribute('id', 'settings_panel');
    var newDiv1 = document.createElement('div');
    newDiv1.setAttribute('class', 'tabs');
    newDiv1.setAttribute('id', 'im_tab_container');
    var newUl = document.createElement('ul');
    newUl.setAttribute('id', 'im_tabs');
    
    // Build each individual tab.
    for(temp in name_sets){
        var newLi = document.createElement('li');
        newLi.setAttribute('id', name_sets[temp][0]+'_li');
        var newA2 = document.createElement('a');
        newA2.setAttribute('id', name_sets[temp][0]+'_link');
        if(temp==numCurrentTab){
            newA2.setAttribute('class', 'current');
        }else{
            newA2.setAttribute('class', 'not_current');
        }
        newA2.setAttribute('href', '#');
        var newSpan = document.createElement('span');
        newSpan.setAttribute('class', 'inner');
        newSpan.innerHTML = name_sets[temp][0];
        newA2.appendChild(newSpan);
        newLi.appendChild(newA2);
        newUl.appendChild(newLi);
        newDiv1.appendChild(newUl);
    }

    // Scroll list.
    var newDiv4 = document.createElement('div');
    newDiv4.setAttribute('class', 'scroll_list');
    newDiv4.setAttribute('id', 'settings_scroll');
    var newA = document.createElement("a");
    newA.setAttribute('id', 'settings_link');
    newA.setAttribute('href', '#');
    newA.innerHTML = "x";
    var newDiv5 = document.createElement('div');
    newDiv5.setAttribute('class', 'nest');
    var newInput = document.createElement('input');
    newInput.setAttribute('id', 'incit_monitor_save');
    newInput.setAttribute('type', 'button');
    newInput.setAttribute('value', 'Save');
    newInput.setAttribute('style', 'width: 50%;');
    var newInput2 = document.createElement('input');
    newInput2.setAttribute('id', 'incit_monitor_reset');
    newInput2.setAttribute('type', 'button');
    newInput2.setAttribute('value', 'Reset');
    newInput2.setAttribute('style', 'width: 50%;');
    // Attach everything.
    newDiv5.appendChild(newInput);
    newDiv5.appendChild(newInput2);
    newDiv3.appendChild(newA);
    newDiv3.appendChild(newDiv5);
    newDiv2.appendChild(newDiv3);
    newDiv2.appendChild(newDiv1);
    newDiv0.appendChild(newDiv4);
    newDiv2.appendChild(newDiv0);
    newDiv.appendChild(newDiv2);
    newDiv.setAttribute('style', "overflow: visible; position: absolute; width: 250px; height: 450px; right: 1%; top: 0px;");
    document.body.appendChild(newDiv);
    // Emulate "onclick" signals.
    document.getElementById("settings_link").addEventListener("click", closeSettings, true);
    document.getElementById("incit_monitor_settings").addEventListener("click", openSettings, true);
    document.getElementById('incit_monitor_save').addEventListener("click", storeSettings, false);
    document.getElementById('incit_monitor_reset').addEventListener("click", resetSettings, false);
    // Add individual tab onclick events with an ID for reference.
    for(temp in name_sets){
        document.getElementById(name_sets[temp][0]+'_li').addEventListener('click',{'tabid':temp,handleEvent:function(){tabSettings(this.tabid);}},false);
    }
}

function tabSettings(input) {
    if(input!=numCurrentTab){
        // Generate the current tab of the settings.
        storeSettings();
        document.getElementById(name_sets[numCurrentTab][0]+'_link').setAttribute('class','not_current');
        document.getElementById(name_sets[input][0]+'_link').setAttribute('class','current');
        numCurrentTab = input;
        if(input==3){
            generateLastRound(numRoundsAttended-1);
        }else{
            generateSettings();
        }
    }
}

function openSettings() {
    // Build the settings pane if it hasn't already been made, then bring it to front.
    var c = document.getElementById('settings');
    if (!incitmonitorsets_open) {
        if(c==null){
            establishSettings();
            if(numCurrentTab==3){
                generateLastRound(numRoundsAttended-1);
            }else{
                generateSettings();
            }
        }else{
            c.setAttribute('style', "overflow: visible; position: absolute; width: 250px; height: 450px; right: 1%; top: 0px;");
        }
        incitmonitorsets_open = true;
    }
}

function closeSettings() {
    // This can only be called from the settings pane itself, so hide it.
    incitmonitorsets_open = false;
    document.getElementById('settings').setAttribute('style', "overflow: visible; position: absolute; width: 250px; height: 450px; right: 1%; top: 0px; display: none;");
}

// Settings operation functions.
function getSettings(){
    for(i=0;i<extr_sets.length;i++){
        tempValue = GM_getValue(extr_sets[i][0],extr_sets[i][1]);
        if(tempValue == extr_sets[i][1] && typeof(extr_sets[i][5])!='undefined'){
            sets[extr_sets[i][0]] = GM_getResourceURL(extr_sets[i][5]);
        }else{
            sets[extr_sets[i][0]] = tempValue;
        }
    }
}

function storeSettings(){
    // Read the settings pane and save the settings.
    for(i=splt_sets[numCurrentTab][0];i<splt_sets[numCurrentTab][1];i++){
        tempElement = document.getElementById('sets_'+extr_sets[i][0]);
        if(extr_sets[i][4]=='checkbox'){
            tempValue = tempElement.checked;
        }else if(extr_sets[i][4]=='text'){
            tempValue = tempElement.value;
        }
        if(tempValue == extr_sets[i][1] && typeof(extr_sets[i][5])!='undefined'){
            tempValue = GM_getResourceURL(extr_sets[i][5]);
        }
        sets[extr_sets[i][0]] = tempValue;
        GM_setValue(extr_sets[i][0],tempValue);
    }
}

function generateSettings(){
    // Populate the settings pane.
    if(document.getElementById('settings_scroll')!=null){
        document.getElementById('settings_panel').removeChild(document.getElementById('settings_scroll'));
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'scroll_list');
        newDiv.setAttribute('id', 'settings_scroll');
        document.getElementById('settings_panel').appendChild(newDiv);
    }
    for(a in name_sets[numCurrentTab][1]){
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'setting');
        for(b in name_sets[numCurrentTab][1][a]){
            var newInput = document.createElement('input');
            newInput.setAttribute('id', 'sets_'+name_sets[numCurrentTab][1][a][b][0]);
            newInput.setAttribute('type', name_sets[numCurrentTab][1][a][b][4]);
            newInput.setAttribute('title', name_sets[numCurrentTab][1][a][b][3]);
            var newLabel = document.createElement('label');
            newLabel.setAttribute('for', 'sets_'+name_sets[numCurrentTab][1][a][b][0]);
            newLabel.innerHTML = name_sets[numCurrentTab][1][a][b][2];
            if(name_sets[numCurrentTab][1][a][b][4]=='checkbox'){
                if(sets[name_sets[numCurrentTab][1][a][b][0]]){ newInput.setAttribute('checked', 'checked'); }
                newDiv.appendChild(newInput);
                newDiv.appendChild(newLabel);
            }else if(name_sets[numCurrentTab][1][a][b][4]=='text'){
                newDiv.appendChild(newLabel);
                tempValue = sets[name_sets[numCurrentTab][1][a][b][0]];
                if(typeof(name_sets[numCurrentTab][1][a][b][5])!='undefined'  && tempValue == GM_getResourceURL(name_sets[numCurrentTab][1][a][b][5])){
                    newInput.setAttribute('value', name_sets[numCurrentTab][1][a][b][1]);
                }else{
                    newInput.setAttribute('value', sets[name_sets[numCurrentTab][1][a][b][0]]);
                }
                newInput.setAttribute('style', 'width: 93%;');
                newDiv.appendChild(newInput);
            }
            if(typeof(name_sets[numCurrentTab][1][a][b][6])!='undefined'){
                for(c in name_sets[numCurrentTab][1][a][b][6]){
                    newInput.setAttribute(name_sets[numCurrentTab][1][a][b][6][c][0],name_sets[numCurrentTab][1][a][b][6][c][1]);
                }
            }
        }
        document.getElementById('settings_scroll').appendChild(newDiv);        
    }
}

function generateLastRound(numRound){
    // Populate the last round display.
    if(document.getElementById('settings_scroll')!=null){
        document.getElementById('settings_panel').removeChild(document.getElementById('settings_scroll'));
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'scroll_list');
        newDiv.setAttribute('id', 'settings_scroll');
        document.getElementById('settings_panel').appendChild(newDiv);
    }
    if(numRound<0){
        numRound = 0;
    }
    if(lastRound.length>0){
        // Populate a drop-down.
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'setting');
        newDiv.setAttribute('style', 'height: 7%;');
        var newDiv2 = document.createElement('div');
        newDiv2.setAttribute('class', 'votes');
        var newDiv3 = document.createElement('div');
        newDiv3.setAttribute('class', 'text');
        newDiv3.setAttribute('style', 'display: table-cell; vertical-align: middle');
        var newInput = document.createElement('input');
        newInput.setAttribute('type', 'button');
        newInput.setAttribute('value', 'View');
        newInput.setAttribute('title', 'Click to view the selected previous round results of INCIT.');
        newInput.setAttribute('id', 'history_dropdown_action');
        var newSelect = document.createElement('select');
        newSelect.setAttribute('id', 'history_dropdown');
        for(i=0;i<lastRound.length;i++){
            var newOption = document.createElement('option');
            newOption.setAttribute('value', lastRound.length-(i+1));
            if((lastRound.length-(i+1))==numRound){
                newOption.setAttribute('selected', 'selected');
            }
            newOption.innerHTML = (i+1)+' round'+((i+1)>1 ? 's' : '')+' ago.';
            newSelect.appendChild(newOption);
        }
        newDiv3.appendChild(newSelect);;
        newDiv2.appendChild(newInput);        
        newDiv.appendChild(newDiv2);
        newDiv.appendChild(newDiv3)
        document.getElementById('settings_scroll').appendChild(newDiv);
        document.getElementById('history_dropdown_action').addEventListener('click',function handler(evt){generateLastRound(document.getElementById('history_dropdown').options[document.getElementById('history_dropdown').selectedIndex].value);},false);
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'setting');
        var newDiv2 = document.createElement('div');
        newDiv2.setAttribute('class', 'text');
        newDiv2.innerHTML = 'People: '+lastStats[numRound][0];
        var newDiv3 = document.createElement('div');
        newDiv3.setAttribute('class', 'votes');
        var newA = document.createElement('a');
        newA.setAttribute('href', lastStats[numRound][1]);
        newA.setAttribute('target', '_blank');
        newA.innerHTML = 'Image';
        newDiv3.appendChild(newA);
        newDiv.appendChild(newDiv3);
        newDiv.appendChild(newDiv2);
        document.getElementById('settings_scroll').appendChild(newDiv);
        for(a in lastRound[numRound]){
            // Populate the list of information.
            var newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'setting');
            var newDiv2 = document.createElement('div');
            newDiv2.setAttribute('class', 'name');
            newDiv2.innerHTML = lastRound[numRound][a][0];
            var newDiv3 = document.createElement('div');
            newDiv3.setAttribute('class', 'votes');
            newDiv3.innerHTML = lastRound[numRound][a][3];
            var newDiv4 = document.createElement('div');
            newDiv4.setAttribute('class', 'title');
            newDiv4.innerHTML = lastRound[numRound][a][1];
            var newDiv5 = document.createElement('div');
            newDiv5.setAttribute('class', 'text');
            newDiv5.innerHTML = lastRound[numRound][a][2];
            newDiv.appendChild(newDiv3);
            newDiv.appendChild(newDiv2);
            newDiv.appendChild(newDiv4);
            newDiv.appendChild(newDiv5);
            document.getElementById('settings_scroll').appendChild(newDiv);
        }
    }else{
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'setting');
        newDiv.innerHTML = 'This tab will display last round\'s results.';
        document.getElementById('settings_scroll').appendChild(newDiv);
    }
}

function resetSettings(){
    closeSettings();
    document.body.removeChild(document.getElementById('settings'));
    openSettings();
}

// Master function.
function updateINCITinfo(){
	// Determine if a submission has been made yet.
	if(document.getElementById('thanks_for_submission')==null || document.getElementById('thanks_for_submission').style.display == 'none'){
		isSubbed=0;
	}

    // Get the number of seconds left in the INCIT round.
    tempArray = document.getElementById('countdown').innerHTML.split(" minute");
    tempArray2 = document.getElementById('countdown').innerHTML.split(" second");
    tempArray3 = tempArray2[0].split(" and ");
    if(tempArray3.length>1){ tempArray2[0]=tempArray3[1]; }
    if(!isNaN(+tempArray2[0])){
        if(!isNaN(+tempArray[0])){
            numSecondsLeft = (+tempArray[0]*60)+(+tempArray2[0]);
         }else{
            numSecondsLeft = (+tempArray2[0]);
         }
    }else{
        numSecondsLeft = 0;
    }
    
    // Get the number of submissions for the INCIT round.
    if(document.getElementById('submissions_received')!=null){
        tempArray = document.getElementById('submissions_received').innerHTML.split(" submission");
    }
    if(!isNaN(+tempArray[0])){ numSubsInIncit = (+tempArray[0]); }

    // Get the number of people currently in the INCIT chat.
    tempArray = document.getElementById('show').innerHTML.split(" Asshole");
    tempArray2 = tempArray[0].split("\">");
    if(!isNaN(+tempArray2[1])){ numPeopleInIncit = (+tempArray2[1]); }

	// Parse chat messages.
    if(sets['useChatFeatures']){
        tempData = document.getElementById('talk_history');
        for(i=numLastChat;i<tempData.childNodes.length;i++){
            if(tempData.childNodes[i].className=='said' || tempData.childNodes[i].className=='said idc_highlight'){
                tempBy = tempData.childNodes[i].childNodes[1].innerHTML;
                tempSaid = tempData.childNodes[i].childNodes[2].innerHTML;
                tempId = tempData.childNodes[i].id;
                if(tempBy=='INCIT-Bot 5000: '){
                    // Determine what mode the INCIT round is in based off what INCIT-Bot is saying.
                    i--;
                    if(tempSaid=='<strong>A new round has begun!</strong>'){
                        numRoundMode=1;
                    }else if(tempSaid=='We need at least 5 submissions before we can begin voting. I’m extending the submission period.'){
                        numRoundMode=2;
                        isNagTime=1;
                        numRoundsPushed++;
                    }else if(tempSaid=='Hey, it’s time to vote! Remember, if you don’t vote, your entry will be disqualified.'){
                        numRoundMode=3;
                    }else{
                        numRoundMode=4;
                    }
                    document.getElementById('talk_history').removeChild(document.getElementById(tempId));
                }else if(tempBy!=datCurrentUser+': '){
					// Search for instances of names to highlight.
                    tempVar = new RegExp('('+sets['datChatHighlight'].split(',').join('|')+')');
                    if(tempSaid.search(tempVar)>(-1)){
                        if(sets['volChatHighlight']>0){
                            injectSound(1,sets['urlChatHighlight'],sets['volChatHighlight']);
                            if(sets['useChatHighlightAlert']){
                                alert(tempBy+tempSaid);
                            }
                            // Drop out.
                            isHighlight = 1;
                        }
                        if(sets['useChatHighlight2']){
                            document.getElementById(tempId).setAttribute('class', 'said idc_highlight');
                        }
                        
                    }
                    if(sets['volChatNotify']>0 && !isHighlight){
                        injectSound(1,sets['urlChatNotify'],sets['volChatNotify']);
                        if(sets['useChatNotifyAlert']){
                            alert(tempBy+tempSaid);
                        }
                    }
                    isHighlight = 0;
                }
            }else if(sets['varKillAds'] && tempData.childNodes[i].className=='ad'){
              document.getElementById('talk_history').removeChild(tempData.childNodes[i].id);
            }
        }
        numLastChat = i;
    }else{
        // Determine what round INCIT is on based on elements.
        if(document.getElementById('submitting')!=null && numRoundMode != 2){
            numRoundMode=1;
        }else if(document.getElementById('voting')!=null){
            numRoundMode=3;
        }else if(document.getElementById('final_scores')!=null){
            numRoundMode=4;
        }

        if(numSecondsLeft==numSecsIsPushed && (numRoundMode == 1 || numRoundMode == 2)){
            numRoundMode=2;
            numRoundsPushed++;
            isNagTime=1;
        }
    }
	// Handle autopilot.
	if(sets['useAutoPilot']){
		if(sets['useAutoSubmit'] && !isSubbed){
			if(numRoundMode==0 || numRoundMode==1 || numRoundMode==2){
				tempArray = genSub(sets['datAutoSubTitle'],sets['datAutoSubText']);
				if(document.getElementById("incit_title")!=null && document.getElementById("incit_motivational_text")!=null){
					autoSub(tempArray[0],tempArray[1]);
					isSubbed = 1;
				}
			}
		}
	}

    // Handle the current round mode.
	if(numRoundMode==1){
        numRoundMode=0;
        numRoundsPushed=0;
        isPartyStarted=0;
        if(sets['volNewRoundSound']>0){
            injectSound(0,sets['urlNewRoundSound'],sets['volNewRoundSound']);
        }
        if(sets['useNewRoundAlert']){
            alert('New round!');
        }
    }else if(numRoundMode==2){
        tempVar = '('+numRoundsPushed+') Pushed round.';
        if(numRoundsPushed >= (+sets['varNagSensitivity']) && !isSubbed && isNagTime){
            if(numSubsInIncit==(numMinSubs-1) && sets['volSubNagUrgency']>0){
                injectSound(2,sets['urlSubNagUrgency'],sets['volSubNagUrgency'],tempVar);
            }else if(sets['volSubNagging']>0){
                injectSound(2,sets['urlSubNagging'],sets['volSubNagging'],tempVar);
            }
            
            if(sets['useNagUrgencyAlert'] && numSubsInIncit==(numMinSubs-1)){
                alert('Only one more submission needed, please submit.');
            }else if(sets['useNagAlert'] && numSubsInIncit<(numMinSubs-1)){
                alert('Please submit.');
            }
                
            isNagTime = 0;
        }else{
            injectSound(2,'',0,tempVar);
        }
    }else if(numRoundMode==3){
        if(sets['volVoteSound']>0){
            injectSound(0,sets['urlVoteSound'],sets['volVoteSound'],'Voting!');
        }
        if(sets['useVoteAlert']&&!isPartyStarted){
            alert('Voting!');
        }
        isPartyStarted=1;
        if(document.getElementById('motivation')!=null){
            lastStats[numRoundsAttended]=[numPeopleInIncit,document.getElementById('motivation').childNodes[1].childNodes[1].childNodes[1].childNodes[0].src];
        }
    }else if(numRoundMode==4){
        if(sets['volResultsSound']>0){
            injectSound(0,sets['urlResultsSound'],sets['volResultsSound'],'Results.');
        }
        tempStep = 0;
        if(lastStamp<Math.round(new Date().getTime() / 1000)){
            if(document.getElementById('final_scores')!=null){
                lastRound[numRoundsAttended] = [];
                nodeDump = document.getElementById('final_scores').getElementsByTagName('tbody')[0];
                for(i=2;i<nodeDump.childNodes.length;i++){
                    lastRound[numRoundsAttended][tempStep] = [];
                    tempStep2 = 0;
                    if(nodeDump.childNodes[i].nodeName=='TR'){
                        for(q=0;q<nodeDump.childNodes[i].childNodes.length;q++){
                            if(nodeDump.childNodes[i].childNodes[q].nodeName=='TD'){
                                lastRound[numRoundsAttended][tempStep][tempStep2] = nodeDump.childNodes[i].childNodes[q].innerHTML;
                                tempStep2++;
                            }
                        }
                        tempStep++;
                    }
                }
                lastStamp=Math.round(new Date().getTime() / 1000)+30;
                numRoundsAttended++;
            }
        }
        if(sets['useResultsAlert']&&isPartyStarted){
            alert('Results.');
        }
        isPartyStarted=0;
        isPartyStrobe=0;
    }
    // Update the title bar.
    if(isPartyStarted && !isPartyStrobe){
        isPartyStrobe = 1;
        document.title = numSubsInIncit + "sub/" + numPeopleInIncit + "on/" + numSecondsLeft + "sec";
    }else if(isPartyStarted && isPartyStrobe){
        isPartyStrobe = 0;
        document.title = "voting/" + numPeopleInIncit + "on/" + numSecondsLeft + "sec";
    }else{
        document.title = numSubsInIncit + "sub/" + numPeopleInIncit + "on/" + numSecondsLeft + "sec";
    }
    
    // Re-run the script in a second.
    setTimeout(updateINCITinfo, 1000);
}

// Secondary feature functions.
function injectSound(layer,audio,volume,note){
    if(sets['useSound']){
        if(audio!=''){
            if(layer == 1 || layer == 2){
                document.getElementById('layers_'+layer).removeChild(document.getElementById('layers_'+layer).childNodes[0]);
            }
            if(document.getElementById('layers_'+layer).childNodes.length>0 && document.getElementById('layers_'+layer).childNodes[0].src!=decodeURIComponent(audio)){
                document.getElementById('layers_'+layer).removeChild(document.getElementById('layers_'+layer).childNodes[0]);
                var newAudio = document.createElement('audio');
                newAudio.setAttribute('id', 'layers_'+layer+'_audio');
                newAudio.setAttribute('src', decodeURIComponent(audio));
                newAudio.setAttribute('hidden', 'true');
                newAudio.setAttribute('autoplay', 'true');
                newAudio.volume = volume;
                document.getElementById('layers_'+layer).appendChild(newAudio);
            }else if(document.getElementById('layers_'+layer).childNodes.length>0 && document.getElementById('layers_'+layer).childNodes[0].src==decodeURIComponent(audio)){
                // YOU DO NOTHING. ABSOLUTELY NOTHING.
            }else{
                var newAudio = document.createElement('audio');
                newAudio.setAttribute('id', 'layers_'+layer+'_audio');
                newAudio.setAttribute('src', decodeURIComponent(audio));
                newAudio.setAttribute('hidden', 'true');
                newAudio.setAttribute('autoplay', 'true');
                newAudio.volume = volume;
                document.getElementById('layers_'+layer).appendChild(newAudio);
            }
        }
    }
    document.getElementById('layers_text').innerHTML=initResizeText + (typeof(note)=='undefined' ? '' : '| '+note);
}

function genSub(title,text){
	return [title, text]
}

function autoSub(title,text){
	/*GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.forumwarz.com/incit/new_submission",
		data: "authenticity_token="+encodeURIComponent(datAuthToken)+"&incit[title]="+encodeURIComponent(title)+"&incit[motivational_text]="+encodeURIComponent(text)+"&commit="+encodeURIComponent("Submit It!"),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			alert(response.responseText);
		}
	});*/
	document.getElementById("incit_title").value = title;
	document.getElementById("incit_motivational_text").value = text;
	document.getElementById("submit_it").click();
}

// Get the settings up and going.
getSettings();
updateINCITinfo();