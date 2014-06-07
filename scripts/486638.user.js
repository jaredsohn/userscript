// ==UserScript==
// @name       YTS.Blx Chat Tools
// @version    0.014
// @match      http://chat.yts.re/*
// @match      http://chat.yts.im/*
// @match      http://chat.yify-torrents.com/*
// @match      https://chat.yts.re/*
// @match      http://chats.yts.im/*
// @match      https://chat.yify-torrents.com/*
// ==/UserScript==

// Useless just logging saying it's started the tools
console.log("[YTS Blx Tools]: Started up the tools 0.014");

// This is Styling that replicates the Settings menu, without this the settings menu will not be in the right place.
var headHTML = '<style> \
#content #blxSettingsContainer {border-color:gray;background-color:#000; border-width:1px; border-style:solid; } \
#content #blxSettingsContainer #blxSettingsList table {border-collapse:collapse;} \
#content #blxSettingsContainer h3 {background-color:#212121;color:#FFF;} \
#content #blxSettingsContainer {position:absolute;right:20px;top:85px;width:300px;bottom:150px;} \
#content #blxSettingsContainer h3 {height:30px;padding-left:10px;padding-top:4px;padding-right:10px;padding-bottom:4px;margin:0px;text-align:center;} \
#content #blxSettingsContainer #blxSettingsList {position:absolute;left:0px;right:0px;top:25px;bottom:0px;overflow:auto;} \
#content #blxSettingsContainer #blxSettingsList td {padding:4px;vertical-align:top;} \
#content #blxSettingsContainer #blxSettingsList td {vertical-align:middle;} \
#content #blxSettingsContainer #blxSettingsList td.setting {width:115px;} \
#content #blxSettingsContainer #blxSettingsList td {font-size:0.9em;} \
#content #blxSettingsContainer #blxSettingsList input.text {width:100px;} \
#content #blxSettingsContainer #blxSettingsList select.left {text-align:right;} \
#content #blxSettingsContainer #blxSettingsList input.button {width:22px;height:22px;vertical-align:middle;margin-bottom:2px;} \
</style>';

// This code replaces the buttons entirely to add a button to the right of the menu, entire replacement needed as you need the toggles for my menu in the other menu arrays
var buttonsHTML = '<input type="image" src="img/pixel.gif" class="button" id="settingsButton" alt="Show/hide settings" title="Show/hide settings" onclick="toggleContainer(\'settingsContainer\', new Array(\'blxSettingsContainer\',\'onlineListContainer\',\'helpContainer\'));"/>'+
'<input type="image" src="img/pixel.gif" class="button" id="onlineListButton" alt="Show/hide online list" title="Show/hide online list" onclick="toggleContainer(\'onlineListContainer\', new Array(\'blxSettingsContainer\',\'settingsContainer\',\'helpContainer\'));"/>'+
'<input type="image" src="img/pixel.gif" class="button" id="audioButton" alt="Sound on/off" title="Sound on/off" onclick="ajaxChat.toggleSetting(\'audio\', \'audioButton\');"/>'+
'<input type="image" src="img/pixel.gif" class="button" id="autoScrollButton" alt="Autoscroll on/off" title="Autoscroll on/off" onclick="ajaxChat.toggleSetting(\'autoScroll\', \'autoScrollButton\');"/>'+
'<input type="image" src="http://icons.iconarchive.com/icons/alecive/flatwoken/48/Apps-settings-B-icon.png" class="button" id="blxButton" alt="Show/hide settings" title="Show/hide settings" onclick="toggleContainer(\'blxSettingsContainer\', new Array(\'settingsContainer\',\'onlineListContainer\',\'helpContainer\')); "/>';

// This is html for the settings menu itself
var settingsHTML = '<div id="blxSettingsContainer" style="display:none;"> \
    <h3>Blx Chat Tools Features</h3> \
    <div id="blxSettingsList"> \
        <table> \
			<tr class="rowOdd"> \
                <td><label for="colorSetting">Custom Colors?</label></td> \
                <td class="setting"><input type="checkbox" id="colorSetting" onclick="localStorage.setItem(\'colorsenabled\', this.checked);"/></td> \
            </tr> \
			<tr class="rowEven"> \
                <td><label for="timeSetting">Disable Timestamps?</label></td> \
                <td class="setting"><input type="checkbox" id="timeSetting" onclick="localStorage.setItem(\'timeremove\', this.checked);"/></td> \
            </tr> \
            <tr class="rowOdd"> \
                <td><label for="chatbotSetting">Disable Chatbot?</label></td> \
                <td class="setting"><input type="checkbox" id="chatbotSetting" onclick="localStorage.setItem(\'chatbotremove\', this.checked);"/></td> \
            </tr> \
			<tr class="rowEven"> \
                <td><label for="sucolorsSetting">Normalize Users?</label></td> \
                <td class="setting"><input type="checkbox" id="sucolorsSetting" onclick="localStorage.setItem(\'sucolors\', this.checked);"/></td> \
            </tr> \
			<tr class="rowOdd"> \
				<td><label for="sucolorSetting">User Color</label></td> \
				<td class="setting"><input type="text" class="text" id="sucolor" onchange="localStorage.setItem(\'sucolor\', this.value);"/></td> \
			</tr> \
			<tr class="rowEven"> \
                <td><label for="colorSetting">Enable IgnoreList?</label></td> \
                <td class="setting"><input type="checkbox" id="ignoreSetting" onclick="localStorage.setItem(\'ignore\', this.checked);"/></td> \
            </tr> \
			<tr class="rowOdd"> \
				<td><label for="ignoreList">Ignore List</label></td> \
				<td class="setting"><input type="text" class="text" id="ignoreList" onchange="localStorage.setItem(\'ignores\', this.value);"/></td> \
			</tr> \
			<tr class="rowEven"> \
<td style="vertical-align:text-top;"><label for="colorList">Color List</label></td> \
				<td class="setting"><textarea style="resize:both;" id="colorList" onchange="localStorage.setItem(\'colors\', this.value);" rows="14"></textarea></td> \
			</tr> \
        </table> \
    </div> \
</div>';

// This places all the HTML in the right places.
$('head').prepend(headHTML);
$('#optionsContainer').html(buttonsHTML);
$('#content').append(settingsHTML);

// This includes a remote JS library
document.head.appendChild(document.createElement('script')).src = 'http://daviddhont.com/jquery.xpath.js';

// These make sure that if the settings are enabled then the checkboxes are checked
// -----------------------------------------------------------------------------------
if(localStorage.getItem('chatbotremove') == 'true' || localStorage.getItem('chatbotremove') == '1')
{
	$("#chatbotSetting").attr('checked','checked');
}

if(localStorage.getItem('timeremove') == 'true' || localStorage.getItem('timeremove') == '1')
{
	$("#timeSetting").attr('checked','checked');
}

if(localStorage.getItem('colorsenabled') == 'true' || localStorage.getItem('colorsenabled') == '1')
{
	$("#colorSetting").attr('checked','checked');
}
if(localStorage.getItem('ignore') == 'true' || localStorage.getItem('ignore') == '1')
{
	$("#ignoreSetting").attr('checked','checked');
}
if(localStorage.getItem('sucolors') == 'true' || localStorage.getItem('sucolors') == '1')
{
	$("#sucolorsSetting").attr('checked','checked');
}
// -----------------------------------------------------------------------------------

// These fill the values of the current custom settings and fills the Input fields with it
$("#ignoreList").attr('value', localStorage.getItem('ignores'));
$("#colorList").attr('value', localStorage.getItem('colors'));
$("#sucolor").attr('value', localStorage.getItem('sucolor'));

// From here on it's all code that involes the chatlist being updated
ajaxChat.oldUpdateChatlistView = ajaxChat.updateChatlistView;
ajaxChat.updateChatlistView = function () {
    ajaxChat.oldUpdateChatlistView();
    console.log("Running updateChatlistView ");
    
    // If the chatbotremove feature is enabled
    if(localStorage.getItem('chatbotremove') == 'true' || localStorage.getItem('chatbotremove') == '1')
    {
    	$('span.chatBot').parent().remove(); // chat_bot remove code
    }
    
    // If the timeremove feature is enabled
    if(localStorage.getItem('timeremove') == 'true' || localStorage.getItem('timeremove') == '1')
    {
    	$('span.dateTime').remove(); // timestamps remove code
    }
    
    // If the standardusercolor feature is enabled
    if(localStorage.getItem('sucolors') == 'true' || localStorage.getItem('sucolors') == '1')
    {
        $(".user").css("color", localStorage.getItem('sucolor')); // standardusercolor code
        console.log("Make all users " + localStorage.getItem('sucolor'));
    }
    
    // If the colorsenabled feature is enabled
    if(localStorage.getItem('colorsenabled') == 'true' || localStorage.getItem('colorsenabled') == '1')
    {
        // Get the all from storage and split each entry them by semicolon
        var colors = localStorage.getItem('colors').split(";");
        
        // For each entry
        $.each(colors, function(index,value) {
            
            // Split each entry as key/value pairs (key=value)
            index = value.split("=");
            
            // Set the indexes to custom variables
            color = index[0];
            user  = index[1];
            
            // Split each sub-entry as value into users array
            users = index[1].split("|");
            
            // For each user
            $.each(users, function(index,value) {
                user = value;
                
                // User Selector
                $(".user:contains('"+user+"'),.VIP:contains('"+user+"'),.moderator:contains('"+user+"'),.super_moderator:contains('"+user+"'),.admin:contains('"+user+"')").css("color", color).css("font-weight", "bold");
                
                // Log the Action
                console.log("Make " + user +" " + color);
            });
        });
    }
    
    // If the feature is enabled
    if(localStorage.getItem('ignore') == 'true' || localStorage.getItem('ignore') == '1')
    {
        // Get the all from storage and split each entry them by semicolon
        var ignores = localStorage.getItem('ignores').split(";");
        
        // For each entry
        $.each(ignores, function(index,value) {
            var user = value;
            
            // User Selector
            $("span.user,span.VIP,span.moderator,span.super_moderator,span.admin").filter(function() {
                return $(this).text() == user;
            }).parent().remove(); // parent div remove code
            
            // Log the Action
            console.log("Ignoring " + user);
        });
    }
    
    ajaxChat.scrollChatToBottom();
    console.log("Finnished updateChatlistView");
};
