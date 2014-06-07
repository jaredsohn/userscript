// ==UserScript==
// @name           gsLightBox
// @namespace      Jos van Nijnatten
// @description    Google Frontpage modifier
// @version        0.5.2
// @history        0.5.2 Added CSS support...
// @history        0.5.1 Just saw that I did not delete the NCBI - personal stuff...
// @history        0.5 First release - no bugs, but it needs a better workout for the optionbox
// @require        http://userscripts.org/scripts/source/57756.user.js
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/
// @include        http://www.google.*/
// @include        http://www.google.*/search*
// @include        http://www.google.*/search*
// @include        *google.*/firefox*
// @include        *google.*/firefox*
// @exclude        *images.google*
// @exclude        *video.google*
// ==/UserScript==


var currentVersion = "0.5.2";
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
  script.setAttribute('text', 'text/javascript');
  script.setAttribute('id', 'gsLightbox');
  script.innerHTML = <![CDATA[


   // Home/Copyright tab
   var Copyright = [
     [['Home'],['<div style="float:left; width:100%;"><font style="font-size:12;font-weight:bold;clear:both;">Google Search Lightbox</font>Google Search Lightbox is an enhancement for the Google frontpage&#44; to get the best out of Google. Every changed value will be saved automaticaly into the globalStorage of your browser. GlobalStorage is a feature of firefox which enables websites to store information per domain and the information is not send over the internet and therefore it is safe.</div><div style="padding: 1em 0em 0em; width: 100%;"><img style="border: 1px dotted #ccc; float: left; display: inline-block; clear: none;" src="http://www.gravatar.com/avatar.php?gravatar_id=fdd3cc761efe3e49ebd76438751b7e16&amp;r=PG&amp;s=80"><div style="padding: 1em; float: left;"><font style="font-size: 12px; font-weight: bold;">Copyright</font>&copy; NOWYEAR Jos van Nijnatten<br><a taget="_blank" href="http://userscripts.org/users/111706">Visit me on Userscripts.org</a><a taget="_blank" href="http://www.tripdownunder.nl/?p=123" style="display:block!important">Visit script homepage</a></div></div><div style="float:left; width:100%; padding: 1em 0em 0em;"><font style="font-size:12;font-weight:bold;clear:both">Installed tabs</font>LISTSCRIPT</div>'],['active']]
   ];
   
   // Some examples of fields
   // [field type=textarea name=GSearchCode style=border-width:0px;width:100%;height:365px;]
   // [field type=select name=GSearchCode value=test1:test2:test3 defaultvalue=test2]
   // [field type=radio name=GSearchCode defaultvalue=test2 value=test1:test2:test3]
   // [field type=checkbox name=GSearchCode defaultvalue=test2 value=test1:test2:test3]


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
       //setTimeout("viewOptions(300,100,\"<div style='width:100%;padding-top:2em;vertical-align:middle;font-family:arial;font-size:12px;'>globalStorage Issue! <br>Set 'dom.storage.enabled' true<br>in <a href='about:config' target='_blank'>about:config</a></div>\");",500);
     }
   }

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
       // tagName     type         eventType     value
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
     } else {
       // nothing
     }
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
         
       var tabs=getTabs();
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
         
       // Process values (radio)
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
   if (getItem('shortCut')=='Menu') {
     var nobr = document.getElementById('guser').children[0];
     nobrInnerHTML = nobr.innerHTML.split('|');
     var rest = nobrInnerHTML.slice(1);
     var NOBR = [];
     NOBR[0] = nobrInnerHTML.slice(0,1);
     NOBR[1] = "&nbsp;<a href='javascript:void(0);' onclick='javascript:viewOptions();'>gsLightBox</a>&nbsp;";
     NOBR = NOBR.concat(rest);
     nobr.innerHTML = NOBR.join("|");
   } else if (getItem('shortCut')=='Shortcut') {
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
       if(e.which == 77 && isCtrl == true) {
         // Ctrl +M
         viewOptions();
       }
     }
   } else if (getItem('shortCut')=='Both') {
     var nobr = document.getElementById('guser').children[0];
     nobrInnerHTML = nobr.innerHTML.split('|');
     var rest = nobrInnerHTML.slice(1);
     var NOBR = [];
     NOBR[0] = nobrInnerHTML.slice(0,1);
     NOBR[1] = "&nbsp;<a href='javascript:void(0);' onclick='javascript:viewOptions();'>LightBox</a>&nbsp;";
     NOBR = NOBR.concat(rest);
     nobr.innerHTML = NOBR.join("|");
     
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
       if(e.which == 77 && isCtrl == true) {
         // Ctrl +M
         viewOptions();
       }
     }
   }
    
   // Create tab content in global storage
   function createTabs(ScriptName,InstalableTabs) {
     (createTabs.arguments.length>=3)?m=createTabs.arguments[2]:m=true;
     // if ScriptName not in globalStorage then not installed
     if ((getItem(ScriptName)==null)&&(createTabs.arguments.length>=2)) {
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
         setTimeout("viewOptions(300,100,\"<div style='width:100%;padding-top:2em;vertical-align:middle;font-family:arial;font-size:12px;'>Installation succesful!<br><br>Use Ctrl+M or the Lightbox link to change the options...</div>\");",500);
       }*/
     }
   }
   
   // Get tabs from globalStorage (this script and other scripts)
   function getTabs() {
     var tabs = new Array();
     var lboo = String(getItem('OLBElements')).split("|");
     
     // Options of other scripts
     if(lboo.length>1) {
       i=j=0;
       while (j<lboo.length) {
         t=String(getItem(lboo[j])).split("|");
         k=0;
         while (k<t.length) {
           tabs[i] = t[k].split(",");
           k++;
           i++;
         }
         j++;
       }
     } else {
       tabs[0] = [['Error'],['No items to display...'],['active']];
       viewOptions(300,100,"<div style='width:100%;padding-top:2em;vertical-align:middle;font-family:arial;font-size:12px;'>No items to display...</div>");
     }
     return tabs;
   }
     
   // Uninstal script options
   function Uninstal(ScriptName) {
     (Uninstal.arguments.length>=2)?m=Uninstal.arguments[1]:m=false;
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
         setTimeout("viewOptions(300,100,\"<div style='width:100%;padding-top:2em;vertical-align:middle;font-family:arial;font-size:12px;'><br>Item removed!</div>\");",50);
       } else {
         viewOptions();
       }
     }
   }
   
//////////////////////////////////
//  Functions outside the menu  //
//////////////////////////////////

  // Make a list for the optionbox in Google Search Optionbox
    function ListGoogleSearchOptions() {
      if((document.title==='Google') || (document.title==='Mozilla Firefox Start Page')){
        var i=0;var ii=0;
        var optionList = new Array();
        var span = document.getElementsByTagName(getItem("listelementtype"))[getItem("listelementid")];
        var parent = span.parentNode;
 
        while (i<span.children.length) {
          if (span.children[i].tagName.toLowerCase()=="input") {
            optionList[ii] = new Array(4);
            a=i+1;
            optionList[ii]['title'] = span.children[a].innerHTML;
            optionList[ii]['id']    = span.children[i].id;
            optionList[ii]['value'] = span.children[i].value;
            optionList[ii]['name']  = span.children[i].name;
            ii++;
          }
          i++;
        }i=ii;
 
      optionList[i] = new Array(1);
        optionList[i]['title'] = 'hr';
        i++;
      optionList[i] = new Array(4);
        optionList[i]['title'] = 'Download sites';
        optionList[i]['id']    = null;
        optionList[i]['value'] = 'download (inurl:"megaupload.com" OR inurl:"mediafire.com" OR inurl:"filefactory.com" OR inurl:"rapidshare.com" OR inurl:"megashares.com" OR inurl:"seriesyonkis.com" OR inurl:"badongo.com" OR intitle:gigasize OR inurl:"filefront.com") -xxx -md5 -md5sums';
        optionList[i]['name']  = 'q';
        i++;    
      optionList[i] = new Array(4);
        optionList[i]['title'] = 'Torrent';
        optionList[i]['id']    = null;
        optionList[i]['value'] = '((filetype:torrent) OR (inurl:"torrentz.com"))';
        optionList[i]['name']  = 'q';
        i++;

      optionList[i] = new Array(1);
        optionList[i]['title'] = 'hr';
        i++;
      optionList[i] = new Array(4);
        optionList[i]['title'] = 'Music (mp3/aac)';
        optionList[i]['id']    = null;
        optionList[i]['value'] = 'intitle:"index.of" (mp3|aac) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3 -hyooge -audiozen -musicindexof -mp3s -musik';
        optionList[i]['name']  = 'q';
        i++;
      optionList[i] = new Array(4);
        optionList[i]['title'] = 'Movies (avi/mp4/etc)';
        optionList[i]['id']    = null;
        optionList[i]['value'] = 'intitle:"index.of" (avi|mp4|mpg|wmv) "Parent Directory" -htm -html -asp -php -listen77 -idmovies -airmp3 -shexy -moviez -musicindexof -mp3s -musik -eucontest -0x7 -inurl:htm -inurl:html -inurl:php';
        optionList[i]['name']  = 'q';
        i++;
      optionList[i] = new Array(4);
        optionList[i]['title'] = 'Ebooks (pdf/pdb/etc)';
        optionList[i]['id']    = null;
        optionList[i]['value'] = '"Parent Directory" intitle:"index.of" (chm|pdf|pdb|prc|lit|doc|rtf|txt) "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -opendivx -md5 -md5sums -htm -html -php -idpdf';
        optionList[i]['name']  = 'q';
        i++;
      optionList[i] = new Array(4);
        optionList[i]['title'] = 'FTP Folder';
        optionList[i]['id']    = null;
        optionList[i]['value'] = '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp -xxx -shtml -opendivx -md5 -md5sums -asp';
        optionList[i]['name']  = 'q';
        i++;
      
      return optionList;
      }
    }
    
  // Create Option
    function newoption(title,id,value,name){
      var search = document.getElementById('Toptions');
      var option = document.createElement('option');
      if(title=='hr'){
        title = '- - - - -';
        option.setAttribute('disabled', 'true');
      }else{
        option.setAttribute('Id', id);
        option.setAttribute('class', name);
        option.setAttribute('Value', value);
      }
      var text = document.createTextNode(title);
      search.appendChild(option);
      option.appendChild(text);
    }
    
  // Google Search Optionbox
    function GoogleSearchOptions() {
      if((document.title==='Google') || (document.title==='Mozilla Firefox Start Page')){
        var optionList = ListGoogleSearchOptions();
        
        document.getElementsByName('q')[0].focus();
        var span = document.getElementsByTagName(getItem("listelementtype"))[getItem("listelementid")];
        var parent = span.parentNode;
        parent.removeChild(span);
        var Tselect = document.createElement('select');
          Tselect.setAttribute('id', 'Toptions');
          Tselect.setAttribute('onchange','this.name=this.children[this.selectedIndex].className');
          parent.appendChild(Tselect);
 
        i=0;
        while (i<optionList.length) {
        optionList[i]['title']=='hr'?newoption(optionList[i]['title'],null,null,null):newoption(optionList[i]['title'],optionList[i]['id'],optionList[i]['value'],optionList[i]['name']);
          i++;
        }
      }
    }
    var move=0;


  // Logo replacer
    function GLogo() {
      if((getItem('gsLogo')!=null)&&(getItem('gsLogo')!='')){
        Logo = document.getElementById("logo");
        if (Logo.nodeName == "IMG") {
          Logo.src=getItem('gsLogo');
        }
      }
    }

  // gsLightBox Custom Style Sheet
    function gslbCSS() {
     if (document.getElementById('lbtCSS')) {
       var style = document.getElementById('lbtCSS');
     } else {
       var head = document.getElementsByTagName('head')[0];
       var style = document.createElement('style');
       style.setAttribute('id', 'lbtCSS');
       head.appendChild(style);
     }
     
     style.innerHTML = style.innerHTML + getItem('gslbCSS');
    }


////////////////////////
//  Tabs in the menu  //
////////////////////////

  // General Options
    var ScriptName = 'Options';
    var InstalableTabs = [
      [['Options'],['<div style="border: 1px solid #000; padding: 0px; width: 596px;"><div style="border-bottom: 1px solid #000; width: 100%; float: left; background-color: #ccc;"><div style="float: left; padding-left: 2px;">&nbsp;Access to this menu</div><div style="float: right; padding-right: 2px;"><a onclick="javascript:Uninstal(\''+ScriptName+'\');" href="javascript:void(0);">Remove tab</a></div></div>In the menu (upper right) or as a shortcut (CTRL+M)?<br>[field style=clear:left;float:left;padding-left:1em; type=radio name=shortCut defaultvalue=Both value=Menu:Shortcut:Both]</div>&nbsp;<div style="border: 1px solid #000; padding: 0px; width: 596px;"><div style="border-bottom: 1px solid #000; width: 100%; float: left; background-color: #ccc;"><div style="float: left; padding-left: 2px;">&nbsp;Edit Logo</div><div style="float: right; padding-right: 2px;">&nbsp;</div></div>[field type=text name=gsLogo style=width:99%;margin:0px;border-width:0px!important;]&nbsp;</div>&nbsp;<div style="border: 1px solid #000; padding: 0px; width: 596px;"><div style="border-bottom: 1px solid #000; width: 100%; float: left; background-color: #ccc;"><div style="float: left; padding-left: 2px;">&nbsp;Custom Style Sheet for Google</div></div>[field type=textarea name=gslbCSS style=width:100%;height:250px!important;margin:0px;border-width:0px!important;float:left;max-height:250px!important;]</div>'],['']]
    ];
    // Sample logo:
    // http://lh3.ggpht.com/_TSRaXEYfISA/SyJbrAC07FI/AAAAAAAAArA/RPDvDJZLxrg/google-left-dna-2003apr25.gif
    
    // Sample CSS:
    /*
      @-moz-document domain("www.google.nl") {
        body {padding:0px;margin:0px!important;overflow:hidden;}
        a:link,a:active,a:hover,a:visited{text-decoration:none!important;color:#000!important;}
        span#main div#ghead {background-color:#eee!important;padding:2px!important;border-bottom:1px solid #000;-moz-box-shadow:0 0 50px #AAA;}
        span#main div#ghead div#gbar nobr div#gbi.gbm {border-color:#000!important;border-top-width:0px!important;}
        span#main div#ghead div#guser {padding-bottom:2px!important;}
        span#main div#ghead div.gbh {display:none!important;}
        span#main > center {margin-top:10em;}
        span#main > center span#body > center form[name='f'] > table > tbody > tr[valign='top'] td#sbl * {display:none!important;}
        span#main > center span#body > center form[name='f'] > table > tbody > tr[valign='top'] td[align="center"] > input, td[align="center"]  font[size="-1"] > select{-moz-box-shadow:0 0 5px #ccc; text-shadow:0 0 3px #aaa;}
        span#main > center span#body > center > div.fade{display:none!important;}
        span#main > center span#footer {display:none!important;}

        form[name="f"] table * font[size="-1"] select {width:306px;margin-left:4px;}
        input:NOT([type='radio']),select{border:1px solid rgb(170,170,170)!important;background-color:#FFF;-moz-border-radius: 2px !important;-moz-appearance:none!important;margin-bottom: 5px;color:rgb(51,51,51);color:#222;}
        select option{color:#222!important;}
        input[type="submit"],select{margin-right:5px;width:150px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAeCAMAAAAxfD/2AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAtUExURfT09PLy8vHx8fv7+/j4+PX19fn5+fr6+vf39/z8/Pb29vPz8/39/f7+/v///0c8Y4oAAAA5SURBVHjaXMZJDgAgCMDAuouA/3+uHPRiMmlKzmhCFRorLOakVnpnDEpBBDHM8ODs/bz372+PAAMAXIQCfD6uIDsAAAAASUVORK5CYII=);}
      }
    */
    
    createTabs(ScriptName,InstalableTabs);
    
  // Google Search Optionbox
    var ScriptName = 'gsOption';
    var InstalableTabs = [
      [['gSearch'],['<div style="border: 1px solid #000; padding: 0px; width: 596px;"><div style="border-bottom: 1px solid #000; width: 100%; float: left; background-color: #ccc;"><div style="float: left; padding-left: 2px;">&nbsp;Element for the DropDown box</div><div style="float: right; padding-right: 2px;"><a onclick="javascript:Uninstal(\''+ScriptName+'\');" href="javascript:void(0);">Remove tab</a></div></div>[field type=text name=listelementtype defaultvalue=span style=width:75%;margin:0px;border-width:0px!important;float:left;]<span style="width:15px; text-align:center; float:left;">#</span>[field type=text name=listelementid defaultvalue=5 style=width:20%;margin:0px;border-width:0px!important;float:right;]</div>&nbsp;<div style="border: 1px solid #000; padding: 0px; width: 596px;"><div style="border-bottom: 1px solid #000; width: 100%; float: left; background-color: #ccc;"><div style="float: left; padding-left: 2px;">&nbsp;Edit DropDown box</div></div>No functionality yet...<!--[field type=textarea name=GSearchCode style=border-width:0px!important;width:100%;height:389px;]--></div>'],['']]
    ];
    createTabs(ScriptName,InstalableTabs);
    
  // Lightbox options
    var ScriptName = 'Notes';
    var InstalableTabs = [
      [['Notes'],['<div style="border: 1px solid #000; padding: 0px; width: 596px;"><div style="border-bottom: 1px solid #000; width: 100%; float: left; background-color: #ccc;"><div style="float: left; padding-left: 2px;">&nbsp;Edit note</div><div style="float: right; padding-right: 2px;"><a onclick="javascript:Uninstal(\''+ScriptName+'\');" href="javascript:void(0);">Remove tab</a></div></div>[field type=textarea name=GSearchNote style=border-width:0px!important;width:100%;height:389px;]</div>'],['']]
    ];
    createTabs(ScriptName,InstalableTabs);


   // Some examples of fields
   // [field type=textarea name=GSearchCode style=border-width:0px;width:100%;height:365px;]
   // [field type=select name=GSearchCode value=test1:test2:test3 defaultvalue=test2]
   // [field type=radio name=GSearchCode defaultvalue=test2 value=test1:test2:test3]
   // [field type=checkbox name=GSearchCode defaultvalue=test2 value=test1:test2:test3]


///////////////////////////////////////////////
//  Load everything that needs to be loaded  //
///////////////////////////////////////////////

    document.onload = document.getElementsByTagName('body')[0].setAttribute('onmousemove','if((String(document.getElementsByTagName("html")[0].onmousemove).search("fade")>0)&&(move==0)){setTimeout("GoogleSearchOptions()",25);move++;}else if((String(document.getElementsByTagName("html")[0].onmousemove).search("fade")<0)&&(move==0)) {GoogleSearchOptions();move++;}');
    document.onload = GLogo();
    document.onload = gslbCSS();

]]>;

head.appendChild(script);
ScriptUpdater.check(72846,currentVersion);