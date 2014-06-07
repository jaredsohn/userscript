// ==UserScript==
// @name          WarriorChat
// @namespace     http://www.directcpu.com
// @description   Adds chat capability to bottom of page for StarDriftEmpires and Nova Universe for starfleetcommander.  You will need to have a chatango account and/or room name with chatango for this to work
// @include       http://*stardriftempires*
// @include       http://*playstarfleet*
// @version       1.0.00
// ==/UserScript==
//1.0.00 - Major rework of code to clean it up and make it easy to update in the future. Now works on all Starfleet universes including Stardrift empires. 
//0.3.57 - Correct minor spelling mistakes
//0.3.56 - Added ability to run on Chrome.
//0.3.55 - Added ability to Change Placement to two spots.
//0.3.50 - Added Chat capability to the Nova universe.
//0.3.21 - Changed Placement of script to a better spot.
//0.3.20 - Corrected issues with another script, Removed bug where script where white box would appear before enabling chat room. Also Changed placement of script.
//0.3.15 - Complete update to script to allow multiple alliances/people to use script
//0.1.11 - added initiall release



//update from version < 0.3.57 of WarriorChat if need too.
function updateScript(){
    if(localStorage.getItem('sdeWarriorChatName')!=null){
        localStorage.setItem('warriorchat.name',localStorage.getItem('sdeWarriorChatName'));
        localStorage.removeItem('sdeWarriorChatName');
    }
    if(localStorage.getItem('sdeWarriorChatPos')!=null){
        localStorage.setItem('warriorchat.position',localStorage.getItem('sdeWarriorChatPos'));
        localStorage.removeItem('sdeWarriorChatPos');
	    if(localStorage.getItem('warriorchat.position')=='bot'){localStorage.setItem('warriorchat.position','bottom');}
    }
    if(localStorage.getItem('sdeWarriorChatUse')!=null){
        localStorage.setItem('warriorchat.enabled',localStorage.getItem('sdeWarriorChatUse'));
        localStorage.removeItem('sdeWarriorChatUse');
    }
}

//Get Current Settings
var wChatEnabled=nullBlank(localStorage.getItem('warriorchat.enabled'));
var wChatName=nullBlank(localStorage.getItem('warriorchat.name'));
var wChatPos=nullBlank(localStorage.getItem('warriorchat.position'));

//Set Defaults if this is the first time loading script
if(wChatEnabled=='') { localStorage.setItem('warriorchat.enabled','false'); }
if(wChatName=='') { localStorage.setItem('warriorchat.name',''); wChatEnabled='false'; }
if(wChatPos=='') { localStorage.setItem('warriorchat.position','bottom'); }





//Update the script from older versions
updateScript()
//inputs the chat room
inputChat()

//If in options page, Load Chat room options
if(location.pathname.match(/^\/(options).*/)) {
	inputChatOption()
}

//If variable is Null, return empty string
function nullBlank(vItem) {
    var vReturn=(vItem==null) ? '' : vItem;
    return vReturn; 
}

//inputs the chat room
function inputChat() {
    if(wChatEnabled=='true') {
        var vDivs=document.getElementsByTagName('div');
        var className = (wChatPos=='top') ? 'title' : 'legalese';
	    for (i=0;i<vDivs.length;i++) { 
		    if (vDivs[i].getAttribute('class')==className) { 
		        var vPar=vDivs[i].parentNode;

		        var vDiv=document.createElement('div');
		        vDiv.setAttribute('id','ChatRoom');
		        vDiv.setAttribute('align','center');
		        vDiv.innerHTML='<object name="alliance_chat_obj" width="740" height="290" id="obj_1326323069797"><param id="alliance_chat_room" name="movie" value="http://' + wChatName + '.chatango.com/group"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="false"/><param name="flashvars" value="cid=1326323069797&a=000000&b=100&c=FFFFFF&d=CCCCCC&e=000000&g=F6F6F4&k=666666&l=333333&m=000000&n=FFFFFF&s=1&v=0&w=0"/><embed id="emb_1326323069797" name="alliance_chat_room"  src="http://' + wChatName + '.chatango.com/group" width="740" height="290" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="false" flashvars="cid=1326323069797&a=000000&b=100&c=FFFFFF&d=CCCCCC&e=000000&g=F6F6F4&k=666666&l=333333&m=000000&n=FFFFFF&s=1&v=0&w=0"></embed></object>';
		        vPar.insertBefore(vDiv, vDivs[i]);
		        break;
			}
		}
	}
}

//load chat room options in options page
function inputChatOption() {
    var vDivs=document.getElementsByTagName('div');
	for (i=0;i<vDivs.length;i++){
		if(vDivs[i].getAttribute('class')=='table_container'){
		    var vPar=vDivs[i].parentNode;
 
            var vDiv=document.createElement('div');
            vDiv.id='AllianceChat_option';
            vDiv.setAttribute('class','table_container');
            var vOptionTable=document.createElement('table');
            vOptionTable.setAttribute('class','option');
  
            var vTBody=document.createElement('tbody');
            var vTR=document.createElement('tr');
            var vNameTD=document.createElement('td');
            vNameTD.setAttribute('class','name');
            var vH3=document.createElement('h3');
            vH3.innerHTML='Alliance Chat';
            vNameTD.appendChild(vH3);
            vTR.appendChild(vNameTD);
     
            var vFormTD=document.createElement('td');
            vFormTD.setAttribute('class','form');
            var vForm=document.createElement('form');
            vForm.id='alliance_chat_form';
	
	        //-----Chat Room Name-----
            var vLabelChatName=document.createElement('label');
            vLabelChatName.id='alliance_room_name_label';
            vLabelChatName.innerHTML='Room Name: ';
            vForm.appendChild(vLabelChatName);   
            var vInputChatName=document.createElement('input');
            vInputChatName.id='alliance_room_name_setting';
            vInputChatName.type='text';
			vInputChatName.size='15';
            if(wChatName!='') {vInputChatName.setAttribute('value',wChatName);}
            vInputChatName.setAttribute('onblur','localStorage.setItem("warriorchat.name",this.value.toString());');
            vForm.appendChild(vInputChatName);
            vForm.appendChild(document.createElement('br'));
    
	        //-----Chat Room Position-----
            var vLabelChatPos=document.createElement('label');
            vLabelChatPos.id='alliance_room_pos_label';
            vLabelChatPos.innerHTML='Position: ';
            vForm.appendChild(vLabelChatPos);
			
            var vInputChatPosT=document.createElement('input');
            vInputChatPosT.id='alliance_room_pos_setting_top';
            vInputChatPosT.type='radio';
			vInputChatPosT.name='alliance_room_pos';
	        vInputChatPosT.value='top'
            if(wChatPos=='top') {vInputChatPosT.setAttribute('checked','checked');}
            //vInputChatPosT.setAttribute('onclick','alert(this.value.toString());');
            vInputChatPosT.setAttribute('onclick','localStorage.setItem("warriorchat.position",this.value.toString());');
            vForm.appendChild(vInputChatPosT);
			
            var vLabelChatPos=document.createElement('label');
            vLabelChatPos.id='alliance_room_pos_label_top';
            vLabelChatPos.innerHTML=' Top ';
            vForm.appendChild(vLabelChatPos);
			
            var vInputChatPosB=document.createElement('input');
            vInputChatPosB.id='alliance_room_pos_setting_bottom';
            vInputChatPosB.type='radio';
			vInputChatPosB.name='alliance_room_pos';
	        vInputChatPosB.value='bottom'
            if(wChatPos=='bottom') {vInputChatPosB.setAttribute('checked','checked');}
            //vInputChatPosB.setAttribute('onclick','alert(this.value.toString());');
            vInputChatPosB.setAttribute('onclick','localStorage.setItem("warriorchat.position",this.value.toString());');
            vForm.appendChild(vInputChatPosB);
			
            var vLabelChatPos=document.createElement('label');
            vLabelChatPos.id='alliance_room_pos_label_bottom';
            vLabelChatPos.innerHTML=' Bottom ';
            vForm.appendChild(vLabelChatPos);
            vForm.appendChild(document.createElement('br'));

			//-----Chat Room Enable-----
            var vLabelChatEnabled=document.createElement('label');
            vLabelChatEnabled.id='alliance_room_enable_label';
            vLabelChatEnabled.innerHTML='Enable Chat: ';
            vForm.appendChild(vLabelChatEnabled);
            var vInputChatEnabled=document.createElement('input');
            vInputChatEnabled.id='alliance_room_enable_setting';
            vInputChatEnabled.type='checkbox';
            if(wChatEnabled=='true') {vInputChatEnabled.setAttribute('checked','checked');}
            vInputChatEnabled.setAttribute('onclick','localStorage.setItem("warriorchat.enabled",this.checked.toString());');
            vForm.appendChild(vInputChatEnabled);
			
			vForm.appendChild(document.createTextNode('\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'));

	        //-----Chat Room Save-----
			var vButtonChatSave=document.createElement('input');
			vButtonChatSave.id='alliance_room_save';
			vButtonChatSave.type='button';
			vButtonChatSave.value='save';
			vButtonChatSave.setAttribute('onclick','window.location.reload();');
			vForm.appendChild(vButtonChatSave);
			
			//-----End Inputs-----
            vFormTD.appendChild(vForm);
            vTR.appendChild(vFormTD);

            var vInfoTD=document.createElement('td');
            vInfoTD.setAttribute('class','info');
            vIconDiv=document.createElement('div');
            vIconDiv.setAttribute('class','icon');
            vInfoTD.appendChild(vIconDiv);
            vDescDiv=document.createElement('div');
            vDescDiv.setAttribute('class','description');
            vDescDiv.id='arrow_key_description';
            vDescDiv.setAttribute('style','height:58px;');
            vDescDiv2=document.createElement('div');
            vDescDiv2.setAttribute('style','font-size:16px; margin-top:-15px;');
            vDescDiv2.innerHTML='<ul>'+
                                '<li>Requires a free chatroom by <a href=\'http://www.chatango.com\' target=\'_blank\'>chatango</a></li>'+
                                '<li>If all you get is a white box or busy sign your room name is probably incorrect.</li>'+
                                '<li> Make sure you have a chat room available to use by checking room name.</li>'+
					        	'</ul>';
            vDescDiv.appendChild(vDescDiv2);
            vInfoTD.appendChild(vDescDiv);

            vTR.appendChild(vInfoTD);
            vTBody.appendChild(vTR);
            vOptionTable.appendChild(vTBody);
            vDiv.appendChild(vOptionTable);
		    vPar.insertBefore(vDiv, vDivs[i]);
		    break;
        }
    }
}
