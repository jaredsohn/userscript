// ==UserScript==
// @name        SPA
// @namespace   SPA
// @include     http://userscripts.org/scripts/search?q=drone&submit=
// @version     1
// ==/UserScript==
window.setInterval(scan, 250); // timer to check the chat room four times every second

// initialize global variables
var	homeLoaded = true, chatLoaded = false, // bools to mark whether the chat has loaded yet
server = null, channel = null, bot = null, // will store the server, channel and bot names
sessId = null, // will store the bot's session ID
prevLength = 0, // will store the amount of lines scanned so the bot can detect when new lines appear
ircNick = GM_getValue('ircNick', ''), // the nickname you use on IRC, for commands that only you want to be able to execute, like setting bot options remotely
command = {}, // object to store all the custom commands
general = {}; // object to store all the general actions

// checks for new rows and sends commands to be processed
function scan() {
if (!init()) return; // exit the function if the chat hasn't loaded yet

var chat = $('#chats').children().eq(3), // get the first chat room, I'll add the ability for it to scan all chat rooms later
rows = chat.find('tr'), length = rows.length, // get all the message rows and count how many there are
newRows = length - prevLength; // get the difference between the amount of rows checked and the current number of rows

// if new rows have appeared, check them
if (newRows > 0) {
prevLength = length; // update the amount of rows checked
// loop through the new rows (slice isolates the new rows)
rows.slice(length - newRows, length).each(function() {
var row = $(this), // the current row
caller = row.children().eq(1).text(); // get the poster of this message
msg = row.children().eq(2).text(); // get the actual message

if (caller == bot) return; // if the caller is the bot don't scan this line

var cmd = false, param = false; // set the command and parameters to false at first, then check if this line is even a command
// check to see if the first character of the message was an exclamation mark (indicates a command to run)
if (msg.substr(0, 1) == '!') {
var parts = msg.split(' '); // split the message by spaces
cmd = parts.shift().substr(1); // set the command to the first word without the exclamation mark (e.g. "say" would be taken from "!say dog") and remove it
param = parts.join(' '); // set the parameter to the rest of the message

// if there is a command of this name, execute it and pass the message after the command and the caller as arguments
if (command[cmd]) command[cmd](param, caller);
}
// if no command was found loop through and execute all the general functions
if (!cmd) {
// loops through all general commands
for (var i in general) {
general(msg, caller); // executes the current command and passes the message and caller as arguments
}
}
});
}
}

// function that checks for the various loading stages, mainly if the chat has loaded so the bot can start scanning lines
function init() {
var	inputs = $('.ainput'), // get the input boxes on the home page
chats = $('#chats').children(); // get the tabbed panels

// if the home page has loaded but hasn't been auto filled, fill it now
if (homeLoaded && $('.ainput').length != 0) {
// if this is the script's first time running this will return true as the second part of GM_getValue defines what to return if the value hasn't been set yet
var firstRun = GM_getValue('firstRun', true);
// prompt the user to enter some details for automation if firstRun is true
if (firstRun) {
// ask the user if the want to set up the options now
var setup = confirm(
'This is your first time running the script, do you want to set up the default server/channel/channel the bot connects, auto login and you IRC nickname to now?' + "\n" +
'All these options can be set later through the Greasemonkey context menu'
);
// if the user clicked ok then start prompting for values
if (setup) {
optionServer(); // prompt for the server address
optionChannel(); // prompt for the channel name
optionBot(); // prompt for the bot's nickname
optionAuto(); // prompt for whether to auto login or not
optionIrcNick(); // prompt for the user's IRC nickname
}

GM_setValue('firstRun', false); // mark the script as have been run already
}
// autofils the server/channel/nick input boxes with the values stored
inputs.eq(0).val(GM_getValue('server', '')); inputs.eq(3).val('#' + GM_getValue('chan', '')); inputs.eq(2).val(GM_getValue('bot', ''));

// if auto login is on, connect to the IRC server
if (GM_getValue('autoLogin', false)) {
$('.abutton')[0].click(); // send a fake click event to the 'Go' button on Mibbit
}

homeLoaded = false; // mark the home as been dealth with
}

// if the chat windows have loaded but the session ID etc. have not yet been gotten, get them now. This will cause the bot to start monitoring the chat
if (!chatLoaded && chats.length > 3) {
// store the server and chan names and the bot's nick
server = inputs.eq(0).val(), channel = inputs.eq(3).val(), bot = inputs.eq(2).val();

prevLength = chats.eq(3).find('tr').length; // store the amount of rows currently checked
chatLoaded = true; // mark the chat as loaded

// store the session code, unsafeWindow lets GM scripts access variables on the target page
sessId = unsafeWindow.scomms.sessionid;
}

return chatLoaded; // this will return false until the chat windows have loaded
}

// -- Option Functions -- //
// GM_registerMenuCommand makes a new entry in the "User Script Commands..." menu in the Greasemonkey context menu
// the first argument is the name to display, the second is the function to run when it's clicked
// the prompt function takes a second argument which is the default text to display in the prompt box, set this to the current value of the option

function optionServer() {
var server = prompt('Enter the address of the IRC server to connect to.', GM_getValue('server')); // prompt for the server address
GM_setValue('server', server); // store the entered IRC server
}
GM_registerMenuCommand('Mibbit Bot: Set server address', optionServer);

function optionChannel() {
var chan = prompt('Enter the name of the channel to join.', GM_getValue('chan')); // prompt for the channel name
GM_setValue('chan', chan); // store the entered channel name
}
GM_registerMenuCommand('Mibbit Bot: Set channel name', optionChannel);

function optionBot() {
var bot = prompt('Enter the nickname you want your bot to have.', GM_getValue('bot')); // prompt for the user to enter the server address
GM_setValue('bot', bot); // store the bot's nick
}
GM_registerMenuCommand('Mibbit Bot: Set bot nickname', optionBot);

function optionAuto() {
// prompt for auto login or not
var autoLogin = confirm(
'Do you want the bot to automatically login?' + "\n" +
'OK = Yes' + "\n" +
'Cancel = No'
);
GM_setValue('autoLogin', autoLogin); // store the response
}
GM_registerMenuCommand('Mibbit Bot: Set auto login', optionAuto);

function optionIrcNick() {
// prompt for the user to enter the nickname they use on IRC
var nick = prompt(
'Enter your nickname on IRC' + "\n" +
'This is for commands that only you want to be to use, such as setting bot options remotely',
GM_getValue('nick')
);
GM_setValue('ircNick', nick); // store the nickname
}
GM_registerMenuCommand('Mibbit Bot: Set IRC nickname', optionIrcNick);

// -- Functions to it easier to make the bot do things -- //

// sends a message to the IRC server/channel
function sendMsg(msg) {
// Mibbit uses sequence numbers for each request, get the current number and use it for this request will also increasing its value on the page
var req = '{"seq":' + (unsafeWindow.scomms.seqno_send++) +
// set the text of the message and the channel and server it's going to
',"cmd":"text","chan":"' + channel + '","data":"' + msg + '","channel":"IRCClient:' + server + '"}';
// send the POST request to your session URL
$.post('http://mibbit.com/j/mibbit-s-' + sessId, req);
}

// gets the Body and Head tags from a respnose object or HTML string
function parsePage(resp) {
// if the response from a (GM_)xmlhttpRequest was passed set the HTML to it's response text, else presume a HTML string was passed
var	html = resp.responseText || resp,
pHead = html.slice(html.indexOf('>', html.indexOf('<head')) + 1, html.indexOf('</head>')); // cut the head tag out of the HTML
pBody = html.slice(html.indexOf('>', html.indexOf('<body')) + 1, html.indexOf('</body>')); // cut the body tag out of the HTML
// create the body and head elements to store the parsed HTML
var head = document.createElement('head'), body = document.createElement('body');
// set the HTML of the new elements to that of the parsed HTML
body.innerHTML = pBody, head.innerHTML = pHead;
// turn the elements into jQuery objects for easy searching and then return them
return {body: $(body), head: $(head)};
}

// loads the contents of a URL using the crossdomain GM_xmlhttpRequest function
// if you'd like to look up more of Greasemonkey's functions check out: Category:API Reference - GreaseSpot
function loadURL(url, callback, postData) {
var method = (postData) ? 'POST' : 'GET'; // if post data was passed then fetch the url with a POSR request, else use a GET request
// use the cross domain GM_xmlhttpRequest to load the contents of the URL
GM_xmlhttpRequest({
method: method, // set the request method
data: postData, // send the POST string to the URL, this will be ignored for a GET request
url: url, // set the request URL
// function for when the response is recieved
onload: function(resp) {
var html = parsePage(resp); // parse the page's HTML
callback(html); // call the user defined callback function with the HTML object as an argument
}
});
}

// -- Place Commands here -- //
// if you want to do something when !example is scanned, name your function command['example']
// the first argument of the function is the text after the action, the second is the nickname of the user that called the command

// looks for the currently playing song in the caller's (or the any one you specify) last.fm profile
command['np'] = function(profile, caller) {
profile = profile || caller; // if no profile was specified use the caller's nick as the profile name
// load the profile
loadURL('http://www.last.fm/user/' + profile, function(html) {
var lastPlayed = html.body.find('tr.first').eq(0); // find the last played/current song's info box
// if there is a "now playing" icon then there is a currently playing track so get the song and send it
if (lastPlayed.find('.playingnow_icon').length != 0) {
var track = $.trim(lastPlayed.find('.subjectCell').text()); // get the track in the format: artist - title, $.trim removes the extra whitespace that is taken
sendMsg(profile + "'s Now Playing: " + track); // send the message
// else just say the person is not playing a song
} else {
sendMsg(profile + 'is not playing a song');
}
});
}

// a magic 8-ball, ask it a question and it will spit out a random answer
command['8ball'] = function(question) {
if (!question) return; // exit if no question was asked

// define all possible answers
var ansArray = [
// postive answers
"As I see it, yes", "It is certain", "It is decidedly so", "Most likely", "Outlook good",
"Signs point to yes", "Without a doubt", "Yes", "Yes - definitely", "You may rely on it",

// neutral answers
"Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again",

// negative answers
"Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"
];
var rand = Math.floor(Math.random() * 20); // generate a random number between 0 and 20 inclusive
var answer = ansArray[rand]; // get a random answer
sendMsg('The Magic 8-ball says: ' + answer); // send the answer
}

// if something starts to go wrong with the bot you can reload it remotely, you need to have auto login on and have entered your IRC name for this to work
command['reload'] = function(message, caller) {
if (caller != ircNick) return; // if the reload is called by someone other than you, exit
unsafeWindow.onbeforeunload = function() {} // removes the event which Mibbit places on the window that casues a dialog box to appear when you try and reload/exit Mibbit
document.location.reload(); // reload the page
}

// -- Place general message actions here -- //
// general commands can be named whatever you want, just make sure the name doesn't conflict with another general function
// the first argument is the message on the line, the second is the nickname of the user that called the command

// searches a message for a URL and then posts its title
general['title'] = function(message, caller) {	
// regular expression that matches URLs, if this scares you check out: Regular-Expressions.info - Regex Tutorial, Examples and Reference ...
var URLexp = /((https?):\/)?\/?([^:\/\s]+)(\w+:{0,1}\w*@)?(\S+):)[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
// search for a URL in the message
// url will be an array since many different parts of the URL will be matched by different parts of the regular expression
url = URLexp.exec(message);

// domain block list, it will block anything that contains a string you list here. e.g. "wikipedia" will block any domain that contains the word wikipedia
var blockList = [
'google',
'last.fm',
'wikipedia'
];
// loop through all the words in the block list
for (var i in blockList) {
if (url[3].indexOf(blockList) != -1) return; // if the URL contains this blocked word, don't grab the URL
}

// url[0] contains the complete matched URL and url[2] contains the protocol (e.g. http), if no protocol was found use http
url = ((url[2]) ? '' : 'http://') + url[0];

// if the URL isn't the main part of the message don't grab the title, this stops it from annoyingly clogging up a channel
if ((url.length * 1.5) < message.length) return;

loadURL(url, function(html) {
// no point in clogging up the channel by repeating big URLs, if a URL is over 150 characters in length something like "user's big URL" will be used in place of the URL
if (url.length > 150) url = caller + "'s big URL";
var title = html.head.find('title').text() || 'No Title Gound'; // get the title, or set a default one if nothing was found
// display the title in the format "[ url ] title". e.g. "[ Google ] Google"
sendMsg('[ ' + url + ' ] ' + title);
});
}[/highlight][/SPOILER]