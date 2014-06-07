// ==UserScript==
// @name          Chats Privclass Order
// @namespace     http://electricjonny.deviantart.com
// @description   This adds an /orderalpha and an /orderjoin command to switch the order of the privclasses based on alphabetical order or join order.  It makes the list based on join time by default when you enter
// @include       http://chat.deviantart.com/chat/*
// ==/UserScript==

//unsafeWindow.dAmnChatMembers_SortMember = function(a,b){ return 1; }

//myScript = unsafeWindow.dAmnChatMembers_SortMember = function(a,b){ return 0; };

//document.body.appendChild(document.createElement("script")).innerHTML="(" + myScript + ")()";

var sortOrder_script = document.createElement('script')

	sortOrderScript = freeFunctionString((function(){
	
	//Set join order based on join time for when you first enter the chats
	window.dAmnChatMembers_SortMember = function(a,b){ return 0; };

/*function sortOrder(){
	if(typeof sortOrder.joinOrder == 'undefined')
		sortOrder.joinOrder = true;
	sortOrder.joinOrder = !sortOrder.joinOrder;
	if(sortOrder.joinOrder == true){
		window.dAmnChatMembers_SortMember = function(a,b){ return 0; }; //Join order based on join time
		dAmn_Command( 'send', 'get '+dAmnChatTab_active+'\np=members\n' ); // Refresh your current channel member list
		orderButton.setAttribute("value", "Join \nOrder"); // Change the button text
	}
	else{
		window.dAmnChatMembers_SortMember = function(a,b){if(a.name.toLowerCase()>b.name.toLowerCase()){return 1;}return -1;} // Join order based on alphabetical order
		dAmn_Command( 'send', 'get '+dAmnChatTab_active+'\np=members\n' ); // Refresh your current channel member list
		orderButton.setAttribute("value", "Alpha \nOrder"); // Change the button text
	}
}

// The button
var orderButton = document.createElement("input");
orderButton.setAttribute("type", "button");
orderButton.setAttribute("value", "Join \nOrder");
orderButton.setAttribute("id", "Chat-Sort-Order");
orderButton.setAttribute('style',"background:#dce7dc; border:1px solid black; position:absolute; right:15px; bottom:3px; padding:1px; font-size:8pt; font-family:verdana; cursor:pointer; -moz-border-radius:6px; opacity:.25;");
orderButton.addEventListener('click', function(){sortOrder();}, true);
orderButton.addEventListener('mouseover', function(event){this.style.opacity = "1";}, false);
orderButton.addEventListener('mouseout', function(event){this.style.opacity = ".25";}, false);

document.body.appendChild(orderButton);*/

	trigger = 0;

	function orderSwitcher() {
		if (trigger == 0) {
			dAmn_objForEach(dAmnChats,function(chan,name) {dAmnChatMembers_SortMember = function(a,b){if(a.name.toLowerCase()>b.name.toLowerCase()){return 1;}return -1;}}); // Join order based on alphabetical order
			dAmn_objForEach(dAmnChats,function(chan,name) {dAmn_Command( 'send', 'get '+name+'\np=members\n' );}); // Refresh the member list of channels
			trigger = 1;
		} else {
			dAmn_objForEach(dAmnChats,function(chan,name) {dAmnChatMembers_SortMember = function(a,b){ return 0; }}); //Join order based on join time
			dAmn_objForEach(dAmnChats,function(chan,name) {dAmn_Command( 'send', 'get '+name+'\np=members\n' );}); // Refresh the member list of channels
			trigger = 0;
		}
	}

//register commands
dAmnChanChat.prototype.order_Init = dAmnChanChat.prototype.Init;
dAmnChanChat.prototype.Init = function(cr, name, parent_el) {
	this.order_Init(cr, name, parent_el);
	var cie = this.input;
	cie.cmds['order'] = [0, ''];
	cie.cmds['clearall'] = [0, ''];
}

//more registering of commands
dAmnChatInput_onKey_order = dAmnChatInput_onKey;
dAmnChatInput_onKey = function(e, kc, force) {
	var el = this.chatinput_el;
	if (kc == 13 && (force || !this.multiline || e.shiftKey || e.ctrlKey)) {
		var input = el.value;
		var args = /^\/(\S*)\s*(.*)$/i.exec(input);
		if (args) {
			var cmd = args[1];
			var param = args[2];
			var did = false;
			if (cmd) {
				switch (cmd) {
				case 'order':
					orderSwitcher();
					
/*					dAmnChatMembers_SortMember = function(a,b){ return 0; }; //Join order based on join time
					dAmn_Command( 'send', 'get '+dAmnChatTab_active+'\np=members\n' ); // Refresh your current channel member list
*/
					did = true;
					break;
				case 'clearall':
					dAmn_objForEach(dAmnChats,function(chan){chan.channels.main.Clear();}); //Clear all of the rooms
					did = true;
					break;
				}
				if (did) {
					if (el.value) {
						el.value = '';
						el.focus();
					}
				}
			}
		}
	}
	if (!did) {
		return this.onKey_order(e, kc, force) ? true: false;
	}
	else return false;
}

//necessary prototyping
dAmnChatInput.prototype.onKey = dAmnChatInput_onKey;
dAmnChatInput.prototype.onKey_order = dAmnChatInput_onKey_order;

}).toString());

sortOrder_script.appendChild(document.createTextNode(sortOrderScript))

document.getElementsByTagName('head')[0].appendChild(sortOrder_script);

// taken from electricnet's SuperdAmn
// Utility
function freeFunctionString(str){
	return str.replace(/^\s*function\s*\(\)\s*\{/, "").replace(/\}\s*$/, "")
}
