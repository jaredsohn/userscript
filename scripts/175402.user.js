// ==UserScript==
// @name       Twitch chat IRC like behaviour
// @namespace  http://www.skipcast.net
// @version    0.1
// @description  Enables some IRC like features for the Twitch chat.
// @match      http://www.twitch.tv/*
// @copyright  2013+, Skipcast
// ==/UserScript==

if (CurrentChat == undefined)
    return;

if (!$)
	$ = jQuery;
var chatInput = $("#chat_text_input");

if (chatInput.length == 0) // No chat input textarea found, no point in proceeding.
    return;

var BEEP_VOLUME = 0.25;
var USERS_REFRESH_RATE = 30000;

var audioContext;
var osc;
var volume;
try
{
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	var audioContext = new AudioContext();
    
    osc = audioContext.createOscillator();
    osc.type = 0;
    osc.frequency.value = 300;
    
    volume = audioContext.createGainNode();
    volume.gain.value = BEEP_VOLUME;
    
    osc.connect(volume);
    
    osc.start(0);
}
catch (e)
{
    log("AudioContext not supported: " + e);
}

CurrentChat.disable_chat_input(true); // Todo: Remove before release.

var users = [];
updateUsers();

function log(msg)
{
    console.log(msg);
}

function setText(text)
{
    chatInput.val(text);
}

function loadScript(url)
{
    var element = document.createElement("script");
    element.setAttribute("type", "text/javascript");
    element.setAttribute("src", url);
    
    $("body").append(element);
}

function updateUsers()
{
    var time = new Date().getTime();
    var channel = CurrentChat.channel;
    var chattersLink = "https://tmi.twitch.tv/group/user/" + channel + "/chatters?_=" + time + "&callback=" + "onGetChatters";
    
    loadScript(chattersLink);
    
    // Function continued at "onGetChatters" below.
}

onGetChatters = function(chatters)
{
    if (chatters.status != 200)
    {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        console.log("[" + h + ":" + m + ":" + s + "] (retrying in 5s) onGetChatters return status = " + chatters.status);
        setTimeout(updateUsers, 5000); // Retry in 5 seconds.
        return;
    }
    
    var allChatters = chatters.data.chatters;
    var admins = allChatters.admins;
    var moderators = allChatters.moderators;
    var staff = allChatters.staff;
    var viewers = allChatters.viewers;
    
    users.length = 0; // Clear users
    
    users = users.concat(admins).concat(moderators).concat(staff).concat(viewers);
    
    setTimeout(updateUsers, USERS_REFRESH_RATE);
}

function capitalize(str)
{
    return str[0].toUpperCase() + str.substr(1);
}

function completeName()
{
    var words = chatInput.val().split(/\s/g);
    var name = words[words.length - 1].toLowerCase();
    var result = words[words.length - 1];
    
    if (name == "")
        return result;
    
    if (users.length == 0)
        return result;
    
    for (var i = 0; i < users.length; ++i)
    {
        var existingUser = users[i].toLowerCase();
        
        if (existingUser.indexOf(name) == 0)
        {
            result = capitalize(users[i]);
            break;
        }
    }
    
    if (result == words[words.length - 1].toLowerCase())
    {
        return result;
    }
    
    if (chatInput.val().toLowerCase() == name)
        return result + ": ";
    else
        return result;
}

function beep()
{
    if (!volume)
        return;
    
    volume.connect(audioContext.destination);
    
    setTimeout(function()
               {
                   volume.disconnect();
               }, 75);
}

chatInput.keydown(function(e)
{
    if (e.which == 9) // tab
    {
        var words = chatInput.val().split(/\s/g);
        words[words.length - 1] = completeName();
        setText(words.join().replace(/,/g, " "));
        
        return false;
    }
});

if (!MutationObserver)
{
    log("No support for MutationObserver, no beeps for you.");
    return;
}

var observerTarget = document.querySelector("#chat_line_list");
var observerConfig = { attributes: true, childList: true, characterData: true };
var observer = new MutationObserver(function(mutations)
{
    for(var i = 0; i < mutations.length; ++i)
    {
        var mutation = mutations[i];
        
        for(var j = 0; j < mutation.addedNodes.length; ++j)
        {
            var node = mutation.addedNodes[j];
            
            if (node.attributes.length < 2) // If a user wrote a message, this is guaranteed to be atleast 2 (and is never above 1 when a non-user (jtv) user posted)
              	continue;
            
            var name = node.attributes[1].value;
            var message = node.innerText;
            
            if (name.toLowerCase() == CurrentChat.userData.name.toLowerCase()) // No need to beep if we posted it ourselves.
                continue;
            
            if (message.toLowerCase().indexOf(CurrentChat.userData.name.toLowerCase()) != -1) // holy shit someone mentioned us C':
            {
                node.innerHTML = "<div style='background-color: rgba(255, 255, 0, 0.2);'>" + node.innerHTML + "</div>"; // Highlight the message with a yellow semi transparent color.
                beep();
            }
        }
    }
});

observer.observe(observerTarget, observerConfig);