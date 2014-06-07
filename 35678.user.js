// ==UserScript==

// @name           dAxInterface

// @namespace      realillusions

// @description    A popup user interface for various dAmn messages, timestamp handling, enabling /clearall and more!

// @include        http://chat.deviantart.com/chat/*

// ==/UserScript==

unsafeWindow.editdAx={edit:false};dAxGUI=document.createElement('script');dAxGUI.appendChild(document.createTextNode((<r><![CDATA[

//Code borrowed, with permission, from =Solitude12]

//Checking for presence of his icons and moving mine accordingly

right=82;

if(document.getElementById('shoutlink'))right+=37;

if (!document.getElementById('minimize_rockdock_icons'))right+=131;

if(document.getElementById('birthdaysmenu'))right+=37;

src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABHNCSVQICAgIfAhkiAAAAgJJREFUSIm1lrFr20AUxr8r9dyx4F1DRQZBGzAIDcVDPHnV7sF/QJZsqegWYzwWDLY8Z/VigjGZjLGSgmgLNf0DDKFdDCkY36HXwdH1zj0nJ4d+8KF7J+n93ukdZzMiwv/Wi4LPRwXntyIiW0e0VWQ5L/13YCEiMlZsmlchLAcwxqxAlsUQAJlQ7cktgN8FvZs8eihYq/ilMn47n8+tq43jGN1uV1b8APhARGCMRbv0vCe0Xq+tPZvNqNlsEgBSckW7eYlIWwmEENYrEUKg0+kgyzL0ej3C9itFpmcPhnDOIYRAu90GEaHf72vNxnaF7B8I59waIoRAkiQAgDAMkWUZBoOBCpJAdQvTcrm0hphULpfz5GqfmHascM6lK5WKcfyY87zfPt5AfFrJvBpks9lI53EQBJhMJgiCQLtvMgCs7ho4Oj/G4tcPMySvqFqtyhiAFjuOo11zO46D1V0DN5/v0bl4j6PzYxARM66kVqthOBzKGIAWp2kK13WRpqlcgeu6EvDl60+cnl1LgBECAPV6XYvVq+d5SJIEnufJeBcAfSvru2s6naKIfN/fC1BP9r276yn7vo9GeIJXr2MVYNTBkFyN8ASnZ9cYj8d7IQcfK6VSCfHlFQBgNBo9+q4GWSwW1pBWq2X9ntr4WwBvrClmfQfwDtAbz2x/35+jon+JDtIfV2hKu+jTk8kAAAAASUVORK5CYII=';

button=Tree.createFragment('<a id="interface"><img src="'+src+'"/>Interface</a>',true);

Tree.get('#rockdock-message-count').parentNode.appendChild(button);

helpsrc='data:image/gif;base64,R0lGODlhDwAPAKECAJKjmfX09P///////yH5BAEAAAMALAAAAAAPAA8AAAInnA2Zx6O/GJzniXsfShj0ZQlKNk1kOYpourJUq2yuJntqLKFNRR8FADs='

Tree.get('head').appendChild(Tree.createFragment('<style type="text/css">#interface{right:'+right+'px;width:91px;cursor:pointer;position:absolute;background-color:#313F3A;color:#707E77!important}#interface img{vertical-align:middle;margin:0px 5px 0px 2px;}div.modal{border:0px solid #E8F0EC;-moz-border-radius:12px;background-color:#D9E2DE!important;}img.modal-shadow{display:block!important;}#theform{border:solid #8C978C;border-width:1px 0 1px 0;overflow:hidden;background:#BAC5BA;font-size:8pt;padding:18px 13px 10px;}.settingsheader {text-align:center;padding:5px 33px;font-family:Verdana,sans-serif;font-size:8pt;color:#768176;}.settingsheader img{margin:7px 0px;position:relative;left:-14px;}#theform input[type=text]{padding:0px 3px;width:76%;margin-bottom:1px;border:1px solid #8C978C;-moz-border-radius:8px;background-color:#E8F0EC;float:right;}#theform input[type=checkbox]+span{position:relative;top:-1px;}#theform .preview{text-align:right;display:block;margin-right:5px;}.preview+label{height:29px;text-align:left!important;overflow:hidden;}#theform input[type=submit],#theform input[type=button]{color:#2C3635;background:#E8F0EC;border:1px solid #8C978C;-moz-border-radius:8px;cursor:pointer;font-size:8pt!important;}#theform input[type=submit]:hover,#theform input[type=button]:hover{background-color:#D9E2DE}#theform label{float:left;text-align:right;position:relative;top:1px;}#credit{text-align:center;font-size:8pt;margin:4px 0px;}#credit,#credit *{color:#819081;text-decoration:none!important;}#credit a:hover{color:#2C3635!important;}</style>',true));

if(!window.noAwayChans && !Tree.get("#extendspacer")){

gotcha=Tree.createFragment('<div style="width:500px;height:216px"><div class="settingsheader"><h2>Uh oh! Looks like you hit a snag!</h2></div><form name="daxsettings" id="theform" style="padding:10px 30px;text-align:center;"><div style="padding:0px">I know it sounds wild, but you need dAx to use the dAxInterface script! You can find it <a href="http://siebenzehn.deviantart.com/art/dAx-16684830" title="dAx">here</a>. Please install the script in order to use dAx Interface. Trust me, it\'s useless without it!<br /><br />I\'m serious. Install it.<br /><a href="http://siebenzehn.deviantart.com/art/dAx-16684830" title="dAx">Click</a></div><br /><br /><input type="submit" name="cancel" value="Close" /></form><div id="credit" style="position:relative;top:6px;width:100%;right:25px;text-align:right;">dAxInterface &copy;2008 by @<a href="http://realillusions.deviantart.com">realillusions</a></div></div>',true);

Modals.push(gotcha);

Tree.get("#interface").addEventListener('click',function(){Modals.push(gotcha);Tree.get("img.modal-shadow").style.display="block"},true);}

else{Tree.get('#interface').addEventListener('click',function(){createEditBox();},true);user=window.deviantART.deviant.username;

function createEditBox(){var node;

node=Tree.createFragment('<div style="width:750px;"><div class="settingsheader" style="text-align:left;"><img src="http://i34.tinypic.com/30m7e2x.png" alt="dAxInterface"/></div><form name="daxsettings" id="theform"><img alt="Help" style="cursor:pointer;position:absolute;right:30px; top:8px;" id="interfacehelp" src="'+helpsrc+'" /><label title="%AWAY% replaces away reason">/setaway message: </label><input onkeyup="makePreview(this)" type="text" name="away" /><br/><label class="preview">Preview:</label><label id="awaypreview"></label><br /><br /><label title="No macros applicable">/setback message: </label><input onkeyup="makePreview(this)" type="text" name="back" /><br/><label class="preview">Preview:</label><label id="backpreview"></label><br /><br /><label title="%FROM% replaces sending user. %AWAY% replaces away reason">Auto-Reply: </label><input onkeyup="makePreview(this)" type="text" name="highlight" /><br/><label class="preview">Preview:</label><label id="highlightpreview"></label><br /><br /><label title="%IGNORE% replaces ignored user">/ignore message:</label><input onkeyup="makePreview(this)" type="text" name="ignore" /><br/><label class="preview">Preview:</label><label id="ignorepreview"></label><br /><br /><label title="%IGNORE% replaces unignored user">/unignore message:</label><input onkeyup="makePreview(this)" type="text" name="unignore" /><br/><label class="preview">Preview:</label><label id="unignorepreview"></label><br /><br /><div style="position:relative;left:45px;float:left;"><input type="checkbox" name="autokick" /><span>Automatically autokick every time</span><br /><input type="checkbox" name="clearall" /><span>Enable /clearall command</span><br /><input type="checkbox" name="logout" onchange="toggleDisable(this)" /><span>Disable logout button</span><br /><input type="checkbox" name="hidelogout" style="margin-left:27px;" disabled="true"/><span class="hidelogouttext">Hide logout button completely</span><br/><input type="checkbox" name="timestamps" onchange="toggleDisable(this)"/><span>Enable Timestamps</span> <select name="ampm" disabled="true"><option value="true">12 Hour (1:00 PM)</option><option value="false">24 Hour (13:00)</option></select></div><div style="padding-bottom:6px;padding-top:15px;text-align:center;clear:both;"><input type="button" name="save" value="Save" style="margin:0px 5px;";/><input type="submit" name="cancel" value="Cancel" style="margin:0px 5px;" onclick="javascript:editdAx.edit=false;"/></div></form><div id="credit" style="height:27px;margin:0px;position:relative;top:6px;right:15px;text-align:right;">dAxInterface &copy;2008 by @<a href="http://realillusions.deviantart.com">realillusions</a></div></div>', true);

Modals.push(node);Tree.get('#interfacehelp').addEventListener('click',function(e){createhb()},false);editdAx.edit=true;

if(window.dAxsettings){boxes=document.daxsettings;

for(m in window.dAxsettings){

if((m=="away"||m=="back"||m=="highlight"||m=="ignore"||m=="unignore")){

boxes[m].previousSibling.style.width=parseInt(boxes.unignore.previousSibling.clientWidth)+"px";

Tree.get('#'+m+'preview').previousSibling.style.width=boxes[m].previousSibling.clientWidth+"px"

boxes[m].style.width=Tree.get('#'+m+'preview').style.width=parseFloat(716-boxes.unignore.previousSibling.clientWidth)+"px";

if(window.dAxsettings[m]!="null"){boxes[m].value=window.dAxsettings[m];makePreview(boxes[m])}}

if(m=="binarys"){h=0;

for(i=0,j=boxes.elements.length;i<j;i++){

if(boxes[i].type=="checkbox"){

boxes[i].checked=(window.dAxsettings[m].charAt(h)==0)?false:true;

if(boxes[i].name=="logout"||boxes[i].name=="timestamps"){toggleDisable(boxes[i])}

if(window.dAxsettings.hour=="false"){boxes.ampm.selectedIndex=1}h++;}}}}}

styles=Modals.getStyles(node);

setStyles(Modals.stack[Modals.stack.length-1][0], styles);

LinkedShadows.remove(Modals.stack[Modals.stack.length-1][0],"modal");//Throws error for some reason

LinkedShadows.add(Modals.stack[Modals.stack.length-1][0],"modal",styles,1);}

function createhb(){

hb=Tree.createFragment('<div style="width:700px;"><div class="settingsheader"><h2>WHAT THE F*$! IS A MACRO?</h2><sub>For more extensive help, see the <a href="http://realillusions.deviantart.com/art/dAxInterface-v0-1-101144964">deviation description</a></sub></div><form name="daxsettings" id="theform"><b>/setaway, /setback, /ignore, /unignore messages</b><div style="padding-left:15px">These are the messages sent when you use the commands.</div><br><b>Auto-reply</b><div style="padding-left:15px">This is the message sent when someone highlights you while you\'re away</div><br><h4>Macros</h4><br><b>%AWAY%</b> <span style="font-size:75%">/setaway /setback Auto-Reply</span><div style="padding-left:15px">Use where you\'d want your away message to appear, ie if you save your away message as "can\'t respond because I\'m %AWAY%", then you could expect this:</div><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>/setaway going to the store</i> >>> *<b><i>'+user+'</b> can\'t respond because I\'m going to the store</i><br><br><b>%FROM%</b> <span style="font-size:75%">Auto-Reply</span><div style="padding-left:15px">Use where you want the user who highlighted you.</div><br><b>%IGNORE%</b> <span style="font-size:75%">/ignore /unignore</span><div style="padding-left:15px">Use to indicate user being (un)ignored</div><br><h4>Checkboxes</h4><br><b>Automatically autokick</b>: Appends <i>(autokicked)</i> to every kick to prevent dAmn.pwn autojoins<br><b>Enable /clearall</b>: Creates /clearall command, allowing you to /clear every room at one time<br><b>Disable logout button</b>: Does just that. Select sub-option to remove it completely<br><b>Timestamps</b>: Handles timestamps and formatting</form><div id="credit" style="font-size:6pt">dAxInterface &copy;2008<br/>Created by: @<a href="http://realillusions.deviantart.com">realillusions</a><br/><br>Beta Tested by:<br/>`<a href="http://eskirinabsolute.deviantart.com">eskirinabsolute</a> `<a href="http://dammitmel.deviantart.com">dammitMEL</a> =<a href="http://spiff-johnson.deviantart.com">Spiff-Johnson</a> @<a href="http://anjules.deviantart.com">anjules</a> `<a href="http://parliamentfunk.deviantart.com">ParliamentFunk</a> `<a href="http://junoknight.deviantart.com">junoknight</a> `<a href="http://ashwynmayr.deviantart.com">ashwynmayr</a> *<a href="http://kiwanji.deviantart.com>Kiwanji</a></div></div>',true);

Modals.push(hb);}

function makePreview(g){A=g.value;

if(g.name=='away'||g.name=='highlight'||g.name=='back'){A=A.replace(/%AWAY%/ig,'<span style="color:#79547F">previewing</span>')}

if(g.name=='highlight'){A=A.replace(/%FROM%/ig,'<span style="color:#547F60;">'+user+'</span>')}

if(/ignore/.test(g.name)){A=A.replace(/%IGNORE%/ig,'<span style="color:#7F7B54;">'+user+'</span>');}

Tree.get('#'+g.name+'preview').innerHTML=A;}

function toggleDisable(g){

switch(g.name){

case 'logout': g.checked==true?eval('Tree.get("span.hidelogouttext").setAttribute("style","color:#2C3635;");document.daxsettings.hidelogout.disabled=false'):eval('Tree.get("span.hidelogouttext").setAttribute("style","color:#768176;");document.daxsettings.hidelogout.disabled=true;');break;

case 'timestamps': if(getCookie("useTimeStamps")){g.checked=true};document.daxsettings.ampm.disabled=(g.checked==true)?false:true;if(getCookie("useTimeStamps") && getCookie("useAM")=='false'){document.daxsettings.ampm.selectedIndex=1};break;

default:break;}}

function reloading(){

if(window.confirm("Reload now to make all changes visible?")){

dAmn_objForEach(dAmnChats,function(chan){dAmn_Part(chan.ns)});

setTimeout("location.reload(true)",500);}

else{alert("Reload page to ensure all changes take effect");editdAx.edit=false;Modals.pop("cancel");};}}

]]></r>).toString()));

setTimeout(function(){document.getElementsByTagName('head')[0].appendChild(dAxGUI)},0);

if(unsafeWindow.noAwayChans || unsafeWindow.Tree.get("#extendspacer")){Tree=unsafeWindow.Tree;

doClick=function(){form=document.forms.namedItem("daxsettings");input=form.elements.namedItem("save");

if(form && input){input.addEventListener('click',function(){storeStuff()},false)}else{doClick()}}

unsafeWindow.editdAx.watch("edit",doClick);

storeStuff=function(){

g=document.forms.namedItem("daxsettings").elements;

if(window.confirm("Save Changes?")){

save(g);unsafeWindow.reloading();}}

save=function(obj){r="{";binarys="";

for(i=0,j=obj.length;i<j;i++){

switch(obj[i].type){

case 'text': g=(obj[i].value.length>0)?obj[i].value:null;r+='"'+obj[i].name+'":"'+g+'",';break;

case 'checkbox': binarys+=obj[i].checked?"1":"0";break;

default:break;}}

r+='"binarys":"'+binarys+'",';r+='"hour":"'+(binarys.charAt(binarys.length-1)=="1"?obj.namedItem("ampm").value:null)+'"}';

GM_setValue("settings",r);}

onesAndZeros=function(A){p="";

for(i=0,j=A.length;i<j;i++){

B=j-i;C=A.charAt(i);

if(C==1){switch(B){

case 5: p += 'dAmn_Kick='+unsafeWindow.dAmn_Kick.toSource().replace(/\(reason\)\;/,'(reason);reason += "<acronym title=\\\"(autokicked)\\\">&#09;</acronym>";')+';\n';break;

case 4: p +='function clearAll(){var tab=dAmnChatTab_active;dAmn_objForEach(dAmnChats,function(chan){chan.channels.main.Clear();});dAmn_objForEach(dAmnChatTabs,function(chan){if(chan.tab_el.style.fontWeight=="bold"){dAmnChatTabs_activate(chan.id,true);}});dAmnChatTabs_activate(tab,true);};\n'+"dAmnChatInput_onKey="+unsafeWindow.dAmnChatInput_onKey.toSource().replace(/case "emotes"/,'case "clearall":clearAll();didsmth=true;break;case "emotes"')+";\ndAmnChatInput.prototype.onKey=dAmnChatInput_onKey;\ndAmnChanChat.prototype.Init_interface=dAmnChanChat.prototype.Init;\ndAmnChanChat.prototype.Init=function(cr, name, parent_el){this.Init_interface(cr, name, parent_el);this.input.cmds['clearall']=[0, '']};\ndAmn_objForEach(dAmnChats,function(chan){chan.channels.main.input.cmds['clearall']=[0,''];chan.channels.main.input.onKey=dAmnChatInput_onKey;});\n";break;

case 3: if(A.charAt(B)==1){p+="Tree.destroy(Tree.get('#exitlink'));\n"}else{p+="Tree.get('#exitlink').removeAttribute('href');\n"}break;

case 1: p+='useTimeStamps=true;';break;}}}

return p;}

load=function(obj){q=document.createElement('script');h="";

for(m in obj){if(obj[m]!="null"){

switch(m){

case 'away': h += 'setAway=function(args,mode){isAway=true;if(!args)silentAway=true;awayMessage=args?args:window.prompt("Please enter away message",awayMessage);awayStatus=mode?mode:"away";if(awayMessage!=null)g="'+obj.away+'".replace(/%AWAY%/ig,awayMessage);dAmn_objForEach(dAmnChats,function(chan,name){if(!noAwayChans[name])chan.channels.main.cr.Send( "action","main",g)})};\n';break;

case 'back': h += 'setBack=function(){isAway=silentAway=false;g="'+obj.back+'".replace(/%AWAY%/ig,awayMessage);dAmn_objForEach(dAmnChats,function(chan,name){if(!noAwayChans[name])chan.channels.main.cr.Send( "action","main", g );});};\n';break;

case 'highlight': h+='dAmnBeep=function(from, channel, body) {if (isAway) {if (!silentAway) {if (!noAwayChans[channel.cr.ns]) {window.clearTimeout(ar_timeout);silentAway=true;ar_timeout=window.setTimeout("silentAway=false", autoReplyInterval);r="'+obj.highlight+'".replace(/%AWAY%/ig,awayMessage).replace(/%FROM%/ig,from);channel.cr.Send("msg", "main", r);}}} else {}};\n';break;

case 'ignore': h+= 'dAmn_Ignore=function (username) {if (username.toLowerCase() == dAmn_Client_Username.toLowerCase()) {return dAmnChats[dAmnChatTab_active].channels.main.makeText("", "", "You can\'t ignore yourself!");}var ignorelist=dAmn_getIgnoreList();for (var i=0; i < ignorelist.length; i++) {if (ignorelist[i] == username.toLowerCase()) {dAmnChats[dAmnChatTab_active].channels.main.makeText("", username, "is already ignored");return;}}if (!window.confirm("Do you really want to ignore \'"+username+"\'?\\nIgnoring a user means you won\'t receive any messages\\nor actions this user sends.\\nUse this command without parameters to view the list of ignored users,\\nand remove users from this list with the /unignore command.")) {return;}ignorelist.push(username.toLowerCase());dAmn_setIgnoreList(ignorelist);m="'+obj.ignore+'".replace(/%IGNORE%/ig,username);dAmnChats[dAmnChatTab_active].Send("action","main",m);};\n';break;

case 'unignore': h+= 'dAmn_Unignore=function (username) {var ignorelist=dAmn_getIgnoreList();for (var i=0; i < ignorelist.length; i++) {if (ignorelist[i] == username.toLowerCase()) {ignorelist.splice(i, 1);q="'+obj.unignore+'".replace(/%IGNORE%/ig,username);dAmnChats[dAmnChatTab_active].Send("action", "main", q);return dAmn_setIgnoreList(ignorelist);}}dAmnChats[dAmnChatTab_active].channels.main.makeText("", username, "is currently not ignored");};\n';break;

case 'binarys': h+= onesAndZeros(obj[m]);break;

case 'hour': h+='useAM=';h += (obj[m]=="null")?"false":obj[m];break;}}}

q.innerHTML=h;document.getElementsByTagName('head')[0].appendChild(q);}

interfaceInit=function(){

if(GM_getValue("settings",-1)!=-1){

if(unsafeWindow.getCookie("useTimeStamps")){unsafeWindow.deleteCookie("useTimeStamps")}

if(unsafeWindow.getCookie("useAM")){unsafeWindow.deleteCookie("useAM")}

set=eval( '(' + GM_getValue("settings",-1) + ')' )

unsafeWindow.dAxsettings=set;load(set);unsafeWindow.dAmn_Client_Agent+=" (Edited with dAxInterface:"+set.binarys+")";}

else{GM_setValue("settings",'{"away":"null","back":"null","highlight":"null","ignore":"null","unignore":"null","binarys":"00000","hour":"true"}')

interfaceInit();}}

interfaceInit();}