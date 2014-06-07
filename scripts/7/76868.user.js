// ==UserScript==
// @name           	 Vibe
// @namespace            Vibe@win.sk
// @description          A few handy commands.
// @include       	 http://chat.deviantart.com*
// @author       	 Skayleen
// ==/UserScript==
var Vibe_script = document.createElement('script')
Vibe_script.appendChild(document.createTextNode((<r><![CDATA[

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
                                       '** Script information: ','Vibe, a few handy commands for dAmn. '+
                                       'Script by =<a href="http://skayleen.deviantart.com">skayleen</a>. '+
                                       'More information on this script located at the deviation <a href="http://skayleen.deviantart.com/art/Vibe-script-for-dAmn-163994736">page</a>.');
		           break;                   
                           case 'cmd':
			               act = true;
                                       dAmnChats[dAmnChatTab_active].channels.main.makeText('',
                                       '** Script commands: ', 'about, cmd, exit, global, quit, update'
                                                                                           );
		           break;  
                           case 'update':
			              act = true;
                                      window.open('http://userscripts.org/scripts/source/76868.user.js');
                                       dAmnChats[dAmnChatTab_active].channels.main.makeText('',
                                       '** Vibe: ', 'Update successful, reload the page to make changes!'
                                                                                           );
		           break; 
                           case 'quit':
			               act = true;
			               if(!param) { 
                                       dAmn_Command('send','disconnect\n');
                                       break; 
                                       } else {
                                       dAmn_objForEach(dAmnChats,function(chan,name) {
                                       chan.channels.main.cr.Send('action','main', "Disconnecting: "+param); } );
                                       dAmn_Command('send','disconnect\n');
                                       } 
		           break; 
                           case 'global':
			               act = true;
			               if(!param) { 
                                        dAmnChats[dAmnChatTab_active].channels.main.makeText('',
                                       '** Error: ', 'Please enter a message!');                                                  
                                       break; 
                                       } else {
                                       dAmn_objForEach(dAmnChats,function(chan,name) {
                                       chan.channels.main.cr.Send( 'msg','main', param); } );
                                       } 
		           break; 
                           case 'exit':
			               act = true;
			               if(!param) { 
                                       dAmn_Command('send', 'disconnect\n'); 
                                       dAmn_Client_retry_connect = false; 
                                       break; 
                                       } else {
                                       dAmn_objForEach(dAmnChats,function(chan,name) {
                                       chan.channels.main.cr.Send('action','main', "Disconnecting: "+param); } );
                                       dAmn_Command('send','disconnect\n');
                                       dAmn_Client_retry_connect = false; 
                                       } 
		           break;            
                   
    break;						
} 


				if(act) {
					if (el.value) {
						if (this.history_pos != -1  && this.history[this.history_pos] == el.value) { 
							var before = this.history.slice(0,this.history_pos);
							var after  = this.history.slice(this.history_pos+1);
							this.history = before.concat(after).concat( this.history[this.history_pos] );
						} else {
							this.history = this.history.concat( el.value );
							if( this.history.length > 300 )
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
document.getElementsByTagName('head')[0].appendChild(Vibe_script)