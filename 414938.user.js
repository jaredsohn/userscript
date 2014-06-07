// ==UserScript==
// @name       Outlook.com Messenger Enhancements
// @namespace  encryptix/
// @version    0.4
// @description  This script adds noise when a new message arrives in the chat and moves the scrollbar for the main div left so emails can be read properly
// @include     https://*.mail.live.com/*
// ==/UserScript==

//http://msdn.microsoft.com/en-us/library/cc298451.aspx
//http://msdn.microsoft.com/en-us/library/ff749886.aspx

//Stop multiple executions
if (window.top != window.self)  //don't run on frames or iframes
{
    GM_log("Not running (frame)...");
    return;
}

//Settings
var ALWAYS_NOTIFY=false;
var NO_NOTIFICATIONS=false;
var FIX_MAIN_DIV_SCROLLBAR=true;
var HAVE_TYPING_NOTIFICATION=true;
var NOTIFICATION_SOUND_URL="https://dl.dropbox.com/u/7079101/coin.mp3";
var NOTIFICATION_TYPING_URL="http://www.freesfx.co.uk/rx2/mp3s/9/10906_1386516492.mp3";
var NUM_RETRY=9;
var START_WAIT=8000;
var WAIT=2000;

//Wait START_WAIT seconds before running script
window.setTimeout(init,START_WAIT);

//variables which have to be retrieved (not accessible at start)
var sidebar,mc,msh;

var notification_sound;
var typing_sound;
var notifications;
var my_email;

var notification_handler = function(sender,event){
    //Need to keep track of a UID per message and only play sound if item has not already been received
	//if(event.$1_0=="OnConversationMessageReceived"){
		//notification_sound.play();
	//}
    notifications.push(event);
    unsafeWindow.notifications.push(event);
    console.log("Old Handler");
	console.log(event);
};

var notification_handler_new = function(sender,event){
    //Need to keep track of a UID per message and only play sound if item has not already been received
	if(event.get_command()=="OnConversationMessageReceived"){
        //Params is a array of size 3
        var params = event.get_parameters();
        //params[1] can be an array of objects or an object
        var str_sender = params[0];
        if(str_sender.indexOf(my_email)==-1){
        }else{
            console.log("Not playing sound as Its send BY ME");
        }
        console.log(sender);
        unsafeWindow.messages.push(event);
        //I think it needs more...
        if(!document.hasFocus()||ALWAYS_NOTIFY){
            if(params[1].type==1){
                notification_sound.play();
            }else if(params[1].type==255){
                if(HAVE_TYPING_NOTIFICATION)
                    typing_sound.play();
            }else{
                alert("Unknown notification");
            }
        }
        
	}
    //e.get_message().get_type()
    //notifications.push(event);
    unsafeWindow.notifications_new.push(event);
    console.log("New Handler");
	console.log(event);	
}

function getMSH(){
    if(!msh){
        var JSItem = {is_js:true};
    	getItem("MSH",gotMSH,JSItem);
    }
}
function gotMSH(item){
    msh = item;
    cont();
}
function getSidebar(){
    if(!sidebar)
        getItem("sidebar",gotSidebar);
}
function getMainContent(){
    if(!mc)
        getItem("MainContent",gotMainContent);
}
function gotMainContent(item){
    mc = item;
	cont();
}
function gotSidebar(sb){
	sidebar = sb;
    cont();
}

function getDOMVariables(){
	getSidebar();
	getMainContent();
}

function getJSVariables(){
	getMSH();
}

function init(){
	getDOMVariables();
    getJSVariables();
    //no point calling here as items wont be retrieved yet - cont();
}

function cont(){
    if(!sidebar || !mc || !msh){
        GM_log("Still waiting on 1 or more items");
        return;
    }
    //Here sidebar is still not FULLY styled so has no width
    //Must change to using an observer
    //adjustMC();
    
    if(FIX_MAIN_DIV_SCROLLBAR){
    	sidebar_observer.observe(sidebar, { attributes: true });
    }
    //In Pure JS: MSH.PerfCollector.get_instance().$3[0].$1.add_messageReceived(callback_func);
    if(!NO_NOTIFICATIONS)
    	new_messages_observe_setup_new();
    new_messages_observe_setup();
}

//This watches #sidebar for changes to its style and resizes mc div when detected
var sidebar_observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mut) {
        if (mut.attributeName == "style" && mut.target.classList.contains("sidebar")) {
        	adjustMC();
        }
    });
});

function new_messages_observe_setup_new(){
	var perf_collector = msh.PerfCollector.get_instance();
    var JSItem = {is_js:true, js_obj: perf_collector};
    getItem("$3",got_channel_endpoint_1,JSItem);	
}
function got_channel_endpoint_1(endpoint_array){
    //Unwrap - Same again with time...
    var endpoint = endpoint_array[0];
    unsafeWindow.tester_aaa = endpoint;
    //UPDATE THIS TO GET
    var JSItem = {is_js:true, js_obj: endpoint};
    getItem("$1",got_channel_endpoint_2,JSItem);	
}
function got_channel_endpoint_2(channel){
    channel.add_messageReceived(notification_handler_new);
}

//These functions attach a handler to the wrong event...
function new_messages_observe_setup(){
	var perf_collector = msh.PerfCollector.get_instance();
    //perf_collector.$2 takes more time to get filled in so must check that I get it and not a blank OBJ.
    var JSItem = {is_js:true, js_obj: perf_collector};
    getItem("$2",got_messenger_instance_1,JSItem);

    notification_sound = new Audio(NOTIFICATION_SOUND_URL);
    typing_sound = new Audio(NOTIFICATION_TYPING_URL);
    notifications = new Array();
        unsafeWindow.messages = new Array();

    unsafeWindow.notifications = new Array();
    unsafeWindow.notifications_new = new Array();
}

function got_messenger_instance_1(messenger_instance_wrapped){
    //Unwrap - Same again with time...
    var JSItem = {is_js:true, js_obj: messenger_instance_wrapped};
    getItem("User-Contacts-Status",got_messenger_instance_2,JSItem);
}

function got_messenger_instance_2(messenger_instance){
    var messenger_user = messenger_instance.$4;
    my_email = messenger_user.$1.$0.liveId;
    var conversations = messenger_user.get_conversations();
    unsafeWindow.tester_e = conversations;
    conversations.add_propertyChanged(notification_handler);
    
    
    
}

//Should only be called after DomVariables have loaded
function adjustMC(){
   	var width=sidebar.offsetWidth;
	var width_str = width+"px";

	if(mc.style.right && mc.style.right==width_str)
        return;
	//alert(width_str);
    //Manually set the element so its quicker..ffs
    //document.getElementById("MainContent").style.right=width_str;
    //Not doing it anymore..
    //set to 300 
    //set to 300 
    //set to 300 
	mc.style.right=width_str;
	GM_log("set to "+width);
}


/*
 * 
 * Get Item can get an object in three ways
 * 
 * 1. From the document's DOM
 * 2. From the pages JS (uses unsafe window)
 * 3. From a JS object passed in
 * 
 * JSItem should have two pieces of data
 * JSItem.in_js = BOOLEAN
 * JSItem.js_obj = JS_OBJECT
 * 
 */
//Item is returned in callback
function getItem(id,callback,JSItem,check_count){
    if(typeof(check_count)==='undefined') check_count = 0;
    if(typeof(JSItem)==='undefined'){
        JSItem = {is_js:false};
    }

    if(JSItem.is_js){
        //Is Item in pages JS or in JS Object
        if(typeof(JSItem.js_obj)==='undefined'){
            //Pure JS item = window[id];
            //ActionScript JS
            var item = unsafeWindow[id];
        }else{
            var item = JSItem.js_obj[id];
        }
    }else{
        var item = document.getElementById(id);
    }
    
    if(item){
        GM_log("Got "+id);
        callback(item);
    }else{
        GM_log("no "+id+":"+check_count);
        if(check_count > NUM_RETRY){
            GM_log("Could not get "+id);
            alert("Script failed...check log");
            return null;
        }
        window.setTimeout(getItem,WAIT,id,callback,JSItem,++check_count);
    }
}
