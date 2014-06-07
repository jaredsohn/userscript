scr_meta=<><![CDATA[
// ==UserScript==
// @name           Ikariam Notepad Online Editor
// @namespace      A-thanatos
// @description    Use CTRL-M to open the notepad and make report.
// @version        0.1
// @include        http://*/
// @include        http://s*.*.ikariam.com/*
// @exclude        http://board.*.ikariam.com/*
// @exclude        about:blank
// @exclude        about:config

// ==/UserScript==
]]></>.toString();


var script = document.createElement('script');
var body = document.getElementsByTagName('body')[0];
script.setAttribute('id','gSNote');
script.setAttribute('type','text/javascript');
script.innerHTML = <![CDATA[
   // Script Name
   var ScriptName = 'Notes';
   
   // Tabs for this script
   var InstalableTabs = [
     [['Notes'],['<div style="border: 1px solid #000; padding: 0px; width: 596px;"><div style="border-bottom: 1px solid #000; width: 100%; float: left; background-color: #ccc;"><div style="float: left; padding-left: 2px;">&nbsp;Edit note</div><div style="float: right; padding-right: 2px;"><a onclick="javascript:Uninstal(\''+ScriptName+'\');" href="javascript:void(0);">Remove note</a></div></div>[field type=textarea name=GSearchCode style=border-width:0px!important;width:100%;height:390px;]</div>'],['active']]
   ];
   
   // Some examples of fields
   // [field type=textarea name=GSearchCode style=border-width:0px;width:100%;height:365px;]
   // [field type=select name=GSearchCode value=test1:test2:test3 defaultvalue=test2]
   // [field type=radio name=GSearchCode defaultvalue=test2 value=test1:test2:test3]
   // [field type=checkbox name=GSearchCode defaultvalue=test2 value=test1:test2:test3]
   
   // Home/Copyright tab
   var Copyright = [
     [['Home'],['<font style="font-size:14;font-weight:bold;clear:both;">Admintool Editor</font>This is a note for admintool to make online reports. The note changed will be saved automaticaly in the globalStorage of your browser. GlobalStorage is a feature of firefox which enables websites to store information per domain and the information is not send over the internet and so it is safe.<div style="padding: 1em 0em 0em; width: 596px;"><img style="border: 1px dotted #ccc; float: left; display: inline-block; clear: none;" src="http://www.gravatar.com/avatar.php?gravatar_id=9c6c83c7bc15b8665be54b186938b739&r=PG&s=80&default=identicon"><div style="padding: 1em; float: left;"><font style="font-size: 14px; font-weight: bold;">Copyright</font>&copy; A-thanatos<br><a taget="_blank" href="http://testserver.gr.ikariam.com.netw.gr/admintool_admin_online_editor_export_report.html">Open Ikariam Admintool Online Editor</a><a taget="_blank" href="http://userscripts.org/users/297931">Visit me on Userscripts.org to download more scripts <b>WARNING</b> The scripts is accessible only for authorized Ikariam team members</a></div></div>'],['']]
   ];


   // Check if main globalStorage script already is installed
   if (typeof getItem!='function') {
     try{
       // Tests for globalStorage issues and setting globalStorage functions
       var storage  = globalStorage[location.host];

       // Store an item in the globalStorage
       function setItem(key,value) {
         storage.setItem(key,value);
       }

       // Get an item from the globalStorage
       function getItem(key) { 
         return storage.getItem(key);
       }

       // Remove an item from the globalStorage
       function removeItem(key) {
         storage.removeItem(key)
       }
     } catch(r) {

      // Store an item as cookie
      function setItem(key,value,days) {
        if (days) {
           var date = new Date();
           date.setTime(date.getTime()+(days*24*60*60*1000));
           var expires = "; expires="+date.toGMTString();
         }
         else var expires = "";
         document.cookie = key+"="+value+expires+"; path=/";
       }

       // Get an item from a cookie
       function getItem(key) {
         var nameEQ = key + "=";
         var ca = document.cookie.split(';');
         for(var i=0;i < ca.length;i++) {
           var c = ca[i];
           while (c.charAt(0)==' ') c = c.substring(1,c.length);
           if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
         }
         return null;
       }

       // Remove an item from a cookie
       function eraseCookie(name) {
         createCookie(name,"",-1);
       }

       // Error message
       setTimeout("viewOptions(300,100,\"<div style='width:100%;padding-top:2em;vertical-align:middle;font-family:arial;font-size:12px;'>globalStorage Issue! <br>Set 'dom.storage.enabled' true<br>in <a href='about:config' target='_blank'>about:config</a></div>\");",500);
     }
   }

   
   // Check if main script already is installed
   if (String(getItem('OLBElements'))!='') {
     // View OptionBox
     function viewOptions() {
       (viewOptions.arguments.length>=1)?w=viewOptions.arguments[0]:w=600;
       (viewOptions.arguments.length>=2)?h=viewOptions.arguments[1]:h=450;
       var body = document.getElementsByTagName('body')[0];
       var l    = document.getElementsByTagName('html')[0].scrollLeft+(window.innerWidth /2)-(w/2);
       var t    = document.getElementsByTagName('html')[0].scrollTop+(window.innerHeight/2)-(h/2);
       htmlW = window.innerWidth  > document.getElementsByTagName('html')[0].scrollWidth?window.innerWidth:document.getElementsByTagName('html')[0].scrollWidth;
       htmlH = window.innerHeight > document.getElementsByTagName('html')[0].scrollHeight?window.innerHeight:document.getElementsByTagName('html')[0].scrollHeight;

       if ((underbox = document.getElementById('underbox')) && (lightbox = document.getElementById('lightbox'))) {
         hideOptions();
         viewOptions(w,h,"");
       } else {
         var overlay = document.createElement('div');
         overlay.setAttribute('id','overlay');
         overlay.setAttribute('onclick','javascript:hideOptions();');
         overlay.setAttribute('style','position:absolute; background-color:#000; opacity:0.6; z-index:90;width:'+htmlW+'px; height:'+htmlH+'px; top:0; left:0;');
         overlay.innerHTML = "<div id='underbox' style='position:absolute; background-color:#fff; text-align:center; z-index:95; opacity:0.5; width:"+(w+30)+"px; height:"+(h+30)+"px; left:"+(l-15)+"px; top:"+(t-15)+"px; -moz-border-radius:5px;'>&nbsp;</div>";
         body.appendChild(overlay);
       
         var lightbox = document.createElement('div');
         lightbox.setAttribute('id','lightbox');
         lightbox.setAttribute('style','position:absolute; background-color:#fff; text-align:center; z-index:100; color:#151410; width:'+w+'px; height:'+h+'px; left:'+l+'px; top:'+t+'px; overflow:auto; border:1px solid #000; overflow:hidden;');
         lightbox.innerHTML = "&nbsp;";
         body.appendChild(lightbox);
       }
       (viewOptions.arguments.length>=3)?document.getElementById("lightbox").innerHTML=viewOptions.arguments[2]:TabLightbox('lightbox');
     }
     
     // Hide OptionBox
     function hideOptions() {
       if (overlay = document.getElementById('overlay')) {
         overlay.parentNode.removeChild(overlay);
       }
       if (lightbox = document.getElementById('lightbox')) {
         lightbox.parentNode.removeChild(lightbox);
       }
     }
     
     // Prepare CSS stylesheet for Tabs
     if (!document.getElementById('lbtCSS')) {
       var head = document.getElementsByTagName('head')[0];
       var style = document.createElement('style');
         style.setAttribute('id','lbtCSS');
         style.innerHTML = "#lbTabber {width:100%;height:100%;border-collapse:collapse;border:0px solid #000;font-family:arial;font-size:12px}#lbTabber *{text-align:left;}#lbTabber tr,#lbTabber tr>td:first-child {border:0px solid #000;}#lbTabber tr th.lbtHeader {border-bottom:1px solid #000;height:12px;background-color:#ccc;padding:0px;font-weight:normal;}#lbTabber tr th.lbtHeader div {float:right;}#lbTabber tr th.lbtHeader div:first-child {float:left;}#lbTabber tr th.lbtHeader a {width:100px;display:inline-block;font-variant:small-caps;border-left:1px solid #000; text-align:center}#lbTabber tr th.lbtHeader a:link {color:inherit;text-decoration:inherit;}#lbTabber tr#lbtContent * {display:none;}#lbTabber tr td.active,#lbTabber tr td.active * {display:table-cell!important;vertical-align:top;}#lbTabber tr td.active{padding:1em;} #lbTabber * a {text-decoration:none; color:#000;}#lightbox * {line-height:normal;}";
         head.appendChild(style);
       
     }
     
     // Initialize fields
     function FieldLoader() {
       var tagTypes = [
         /* tagName     type         eventType    value */
         [["textarea"],[""],        ["onkeyup"], ["innerHTML"]],
         [["select"],  [""],        ["onchange"],["selected"]],
         [["input"],   ["text"],    ["onkeyup"], ["value"]],
         [["input"],   ["password"],["onkeyup"], ["value"]],
         [["input"],   ["radio"],   ["onchange"],["checked"]],
         [["input"],   ["checkbox"],["onchange"],["checked"]]
       ];
       
       // loop: each element type
       for (i=0; i<tagTypes.length; i++) {
         var tags = document.getElementById('lbtContent').getElementsByTagName(tagTypes[i][0]);
         
         // loop: each element within element type group
         for (var ii=0; ii<tags.length; ii++) {
           
           if ((tagTypes[i][0]!="input")||((tagTypes[i][0]=="input")&&(tagTypes[i][1]==tags[ii].type))) {
             // set attribute to update globalStorage
             if (tagTypes[i][1]=="checkbox") {
               tags[ii].setAttribute(tagTypes[i][2],"javascript:if(this.checked){setItem('"+tags[ii].name+"',this.value);} else {setItem('"+tags[ii].name+"','');}");
             } else {
               tags[ii].setAttribute(tagTypes[i][2],"javascript:setItem('"+tags[ii].name+"',this.value);");
             }
           
             // if (value type) has a ":" than there are more than one types (for example: [text:value])
             if (String(tagTypes[i][2])!="") {
               FieldLoaderValue(tags[ii],tagTypes[i][3]);
             }
           }
         }
       }
     }
     
     // Value of the field
     function FieldLoaderValue(obj,type) {
       (FieldLoaderValue.arguments.length>=3)?value=FieldLoaderValue.arguments[2]:null;
       if (type=='innerHTML') {
         obj.innerHTML = getItem(obj.name);
       } else if (type=='value') {
         obj.value = getItem(obj.name);
       } else if (type=='selected') {
         child=obj.children;
         for (b=0; b<child.length; b++) {
           if (child[b].value==getItem(obj.name)) {
             child[b].setAttribute('selected',true);
           }
          }
       } else if (type=='checked') {
         obj.value==getItem(obj.name)?obj.checked=true:obj.checked=false;
       } else {/* nothing */}
     }
     
     
     // Load Tab Links
     function TabLoader() {
       var Header = document.getElementsByClassName("lbtHeader")[0].children[1].children;
       var Content= document.getElementById('lbtContent').children;
     
       i=0;
       while (i<Header.length) {
         Header[i].setAttribute('onclick','javascript:ShowTab("Tab'+i+'");');
         Header[i].setAttribute('href','javascript:void(0);');
         Content[i].setAttribute('id','Tab'+i);
         if (Header[i].getAttribute('active')=='active') {
           Content[i].setAttribute('class','active');
         } else {
           Content[i].setAttribute('class','');
         }
         i++;
       }
     }
     
     // Show a Single Tab
     function ShowTab(id) {
       var Content= document.getElementById('lbtContent').children;
       
       i=0;
       while (i<Content.length) {
         if (String(Content[i].id) == id) {
           Content[i].setAttribute('class','active');
         } else {
           Content[i].setAttribute('class','');
         }
         i++;
       }
     }
     
     // Create Tabs in LightBox
     function TabLightbox(id) {
       if (lightbox = document.getElementById(id)) {
         lightbox.innerHTML = "<table id='lbTabber'><tr><th class='lbtHeader'><div>&nbsp;</div><div></div></th></tr><tr id='lbtContent'></tr></table>";
         
         var Header = document.getElementsByClassName("lbtHeader")[0].children[1];//a
         var Content= document.getElementById('lbtContent'); //td
         
         i=0;
         while (i<tabs.length) {
           var lbtH = document.createElement('a');
           tabs[i][2]?lbtH.setAttribute('active',tabs[i][2]):null;
           lbtH.innerHTML = tabs[i][0];
           Header.appendChild(lbtH);
           
           var lbtC = document.createElement('td');
           lbtC.innerHTML = Code(tabs[i][1]);
           Content.appendChild(lbtC);
           i++;
         }
         TabLoader();
         FieldLoader();
       }
     }
     
     // Since string.replace(input,output) does not support functions very well on the output attribute, I created a new replace function
     function CFReplace(code) {
       code = code.split("]");
       
       for (a=0; a<code.length; a++) {
         if (String(code[a]).indexOf('[field ') >= 0) {
           prcd = code[a].split('[field ');
           code[a] = prcd[0]+CodeField(prcd[1]);
         }
       }
       return code.join("");
     }
     
     // in_array function
     Array.prototype.inArray = function (value) {
       var i;
       for (i=0; i < this.length; i++) {
         // Matches identical (===), not just similar (==).
         if (this[i] === value) {
           return true;
         }
       }
       return false;
     };
     
     // Create Fields | only used at instalation
     function CodeField(code) {
       var html;
       var code = code.split(" ");
       var prehtml = new Array();
       var attrlist ='';
       
       l=0;
       for (i=0; i<code.length; i++) {
         code[i] = code[i].split("=");
         prehtml[code[i][0]] = code[i][1];
         
         // Element attributes
         if ((code[i][0]!='type')&&(code[i][0]!='name')&&(code[i][0]!='value')&&(code[i][0]!='defaultvalue')) {
           attrlist += " "+code[i][0]+"=\""+code[i][1]+"\"";
         }
         
         // Process values (SELECT)
         if ((code[i][0]=='value')&&(prehtml['type']=='select')) {
           var def = (typeof prehtml['defaultvalue']!='undefined')?prehtml['defaultvalue']:null;
           var values = code[i][1].split(":");
           
           for (ii=0; ii<values.length; ii++) {
             var d = (values[ii]==def)?' SELECTED':'';
             values[ii] = "<option"+d+" value=\""+values[ii]+"\">"+values[ii]+"</option>";
           }
           prehtml[code[i][0]]=values.join("");
         }
         
         // Process values (checkbox)
         if ((code[i][0]=='value')&&(prehtml['type']=='radio')) {
           var def = (typeof prehtml['defaultvalue']!='undefined')?prehtml['defaultvalue'].split(":"):null;
           var values = code[i][1].split(":");
           
           for (ii=0; ii<values.length; ii++) {
             var d = (values[ii]==def)?' CHECKED':'';
             values[ii] = '<div'+attrlist+'><input type="'+prehtml['type']+'" name="'+prehtml['name']+'"'+d+' value="'+values[ii]+'">'+values[ii]+'</div>';
           }
           prehtml[code[i][0]]=values.join("");
         }
         
         // Process values (checkbox)
         if ((code[i][0]=='value')&&(prehtml['type']=='checkbox')) {
           var def = (typeof prehtml['defaultvalue']!='undefined')?prehtml['defaultvalue'].split(":"):null;
           var values = code[i][1].split(":");
           
           for (ii=0; ii<values.length; ii++) {
             var d = (values[ii]==def)?' CHECKED':'';
             values[ii] = '<div'+attrlist+'><input type="'+prehtml['type']+'" name="'+prehtml['name']+'"'+d+' value="'+values[ii]+'">'+values[ii]+'</div>';
           }
           prehtml[code[i][0]]=values.join("");
         }
       }
       
       // default values
       (typeof prehtml['value']=='undefined')?prehtml['value']='':null;
       (typeof prehtml['defaultvalue']=='undefined')?prehtml['defaultvalue']=prehtml['value']:null;
       
       // set default value in globalStorage
       setItem(prehtml['name'],prehtml['defaultvalue']);
       
       // create html
       switch (prehtml['type']) {
         case 'textarea':
           html = '<textarea name="'+prehtml['name']+'"'+attrlist+'>'+prehtml['defaultvalue']+'</textarea>';
           break;
         case 'select':
           html = '<select name="'+prehtml['name']+'"'+attrlist+'>'+prehtml['value']+'</select>';
           break;
         case 'radio':
           html = prehtml['value'];
           break
         case 'checkbox':
           html = prehtml['value'];
           break
         default:
           html = '<input type="'+prehtml['type']+'" name="'+prehtml['name']+'" value="'+prehtml['defaultvalue']+'"'+attrlist+'>';
       }
       
       return html;
     }
     
     // Code in the tab
     function Code(text) {
       var Scripts = String(getItem('OLBElements')).split("|");
         Scripts.pop();
       var now = new Date();
       
       var codes = new Array (
         /\[b\](.*?)\[\/b\]/ig,
         /\[i\](.*?)\[\/i\]/ig,
         /\[u\](.*?)\[\/u\]/ig,
         /LISTSCRIPT/ig,
         /NOWYEAR/ig,
         /NOWMONTH/ig,
         /NOWDATE/ig
       );
       var vervang = new Array (
         "<b>$1</b>",
         "<i>$1</i>",
         "<u>$1</u>",
         Scripts.join(", "),
         now.getFullYear(),
         now.getMonth() + 1,
         now.getDate()
       );
    
       for (var i = 0; i < codes.length; i++) {
         text = String(text).replace(codes[i], vervang[i]);
       }
       return text;
     }
     
     // Shortcut for the optionbox
     var isShft = false;
     var isCtrl = false;
     var isAlt  = false;
     document.onkeyup = function(e) {
       if(e.which == 16) isShft=false;
       if(e.which == 17) isCtrl=false;
       if(e.which == 18) isAlt =false;
     }
     document.onkeydown = function(e) {
       if(e.which == 16) isShft=true;
       if(e.which == 17) isCtrl=true;
       if(e.which == 18) isAlt =true;
       if(e.which == 77 && isCtrl == true) { /* Ctrl +M */ viewOptions(); }
     } 
     
     // Get tabs from globalStorage (this script and other scripts)
     function getTabs(ScriptName,InstalableTabs) {
       (getTabs.arguments.length>=3)?m=getTabs.arguments[2]:m=true;
       // if ScriptName in globalStorage then installed and tabs are in globalStorage
       if (getItem(ScriptName)) {
         var tabs = String(getItem(ScriptName)).split("|");
         var lboo = String(getItem('OLBElements')).split("|");
     
         // Options of this script
         i=0;
         while (i<tabs.length) {
           tabs[i] = tabs[i].split(",");
           i++;
         }
     
         // Options of other scripts
         j=0;
         while (j<lboo.length) {
           if (lboo[j]!=ScriptName) {
             t=String(getItem(lboo[j])).split("|");
             k=0;
             while (k<t.length) {
               tabs[i] = t[k].split(",");
               k++;
               i++;
             }
           }
           j++;
         }
         return tabs;
       // if ScriptName not in globalStorage then not installed
       } else {
         // Store scriptname in globalStorage so other scripts can find the options
         if (getItem('OLBElements')) {
           setItem('OLBElements',ScriptName+"|"+getItem('OLBElements'));
         } else {
           setItem('OLBElements',ScriptName+"|lboCopyright");
         }
         
         // set Copyright in globalStorage if not done
         (getItem("lboCopyright"))?null:setItem("lboCopyright",Copyright.join("|"));
     
         // set Options in globalStorage under the ScriptName so other scripts can use and change these options
         for (i=0; i<InstalableTabs.length; i++) { // create fields
           InstalableTabs[i][1] = CFReplace(String(InstalableTabs[i][1]));
         }
         setItem(ScriptName,InstalableTabs.join("|"));
         
         // Instal Message
         /*if (m) {
           setTimeout("viewOptions(300,100,\"<div style='width:100%;padding-top:2em;vertical-align:middle;font-family:arial;font-size:12px;'>Installation succesful!<br><br>Use Ctrl+M to view the option box...</div>\");",500);
         }*/
         
         // and use these tabs for now
         return InstalableTabs.concat(Copyright);
       }
     }
     
     // Uninstal script options
     function Uninstal(ScriptName) {
       (Uninstal.arguments.length>=2)?m=Uninstal.arguments[1]:m=true;
       // Store scriptname in globalStorage so other scripts can find the options
       if (ELBE = String(getItem('OLBElements')).split("|")) {
         var rELBE = new Array();
         // Recreate OLBElements
         var ii=0;
         for (i=0; i<ELBE.length; i++) {
           ELBE[i]!=ScriptName?(rELBE[ii]=ELBE[i],ii++):null;
         }
         // Remove what is necessery
         var all = rELBE.length>1?false:true;
         if (all) {
           removeItem('OLBElements');
           removeItem('lboCopyright');
         } else {
           setItem('OLBElements',rELBE.join("|"));
         }
         removeItem(ScriptName);
         
         // Instal Message
         if (m) {
           setTimeout("viewOptions(300,100,\"<div style='width:100%;padding-top:2em;vertical-align:middle;font-family:arial;font-size:12px;'><br>Item removed!</div>\");",500);
         }
       }
     }
   }


   
   // Load tabs
   var tabs = getTabs(ScriptName,InstalableTabs);
]]>;
body.appendChild(script);



