// ==UserScript==
// @name           	 Mako
// @namespace        faggot.faggot.faggot/faggot?faggot
// @description      Because nobody likes writing shit themselves.
// @include       	 http://chat.deviantart.com*
// @author       	 i-haet-mushrooms<infernowasp@gmail.com>
// ==/UserScript==
var Vybe_script = document.createElement('script')
Vybe_script.appendChild(document.createTextNode((<r><![CDATA[

function shn(stringToshn) {
		return stringToshn.replace(/^\s+|\s+$/g,"");
}
dAmnChatInput_onKey_rewire=dAmnChatInput_onKey;
dAmnChatInput_onKey = function (e,kc,force, channel)	{
		var el = this.chatinput_el;
		if( kc == 13 && ( force || !this.multiline || e.shiftKey || e.ctrlKey ) ) {
		var input = el.value;
		var args = /^\/(\S*)\s*(.*)$/i.exec(input);
		if(args) { var cmd = args[1]; var param = shn(args[2]); var act = false; 
        if(cmd) {
		switch(cmd) {
		case 'about':
		act = true;
dAmnChats[dAmnChatTab_active].channels.main.makeText('',
'** Script information: ','Mako, named in accordance to my odd obsession with sharks. Just a few things to make shit that much easier. '+
'Script by =<a href="http://i-haet-mushrooms.deviantart.com">i-haet-mushrooms</a>.');
	break;                   
		case 'quit':
act = true;
		if(!param) { 
dAmn_Command('send','disconnect\n');
	break; 
} else {
dAmn_objForEach(dAmnChats,function(chan,name) {
dAmn_Command('send','disconnect\n');
dAmn_Client_retry_connect = false;
}                        
	break;					
}
		case 'reconn':
act = true;
		if(!param) { 
dAmn_Command('send','disconnect\n');
	break; 
} else {
dAmn_objForEach(dAmnChats,function(chan,name) {
dAmn_Command('send','disconnect\n');
}                        
	break;
		if(act) {
		if (el.value) {
		if (this.history_pos != -1  && this.history[this.history_pos] == el.value) { 
		var before = this.history.slice(0,this.history_pos);
		var after  = this.history.slice(this.history_pos+1);
		this.history = before.concat(after).concat( this.history[this.history_pos] );
} else {
		this.history = this.history.concat( el.value );
		if( this.history.length > 5000 )
		this.history = this.history.slice(1);
}
		this.history_pos = -1;
el.value = '';
el.focus();
}
}
}
}
}
if(!act) return this.onKey_rewire(e,kc,force)?true:false;
else return false;

}
dAmnChatInput.prototype.onKey = dAmnChatInput_onKey;
dAmnChatInput.prototype.onKey_rewire = dAmnChatInput_onKey_rewire;
]]></r>).toString()))
document.getElementsByTagName('head')[0].appendChild(Mako_script)
