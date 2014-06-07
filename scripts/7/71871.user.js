// ==UserScript==
// @name           pic_dictionary
// @namespace      http://userscripts.org/scripts/show/71871
// @source         http://userscripts.org/scripts/show/71871
// @include        *
// @version        0.0.3
// ==/UserScript==

//Global variables
var dictMod, pronunciationMod, definitionMod, imageElementMod, imgsoundMod, soundMod, exampleMod,  googleMod;
var dictShowTimer;
var currentAudio;
var SOUNDIMAGEDATA_64 = 'iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAADAFBMVEWEgoRswvys3vzM7vwUivyE0vy85vxEovyczvzE4vTk9vREnvyc2vzM6vxssvyEwvy04vzU7vwElvzE6vw0qvys2vwAAAAAAAAAAD8DABcAABAAAKIoADbpAAISAIUAAAPpABflAACBAAB8AAAAAQEAAAABAAAAAABWGhkAAAAAAAAAAAAwABHoAAASAAAAAABzANEAADkAAAkAAFtQFYTpAAASAAAAAAAYFYjuABaRAAx8AFtwDRUFAACSAAB8AAD/DRj/AAD/AAD/AABtP5UFFzmSEAl8oluFNgjnAm2BhTN8AwAAF24AAAUVAAkAAABgAfgDAGwAADMAAACIGdtFABrcAAkCAFtAEQxvAPcVABIAAAAAASAAACAAAEYAAAB+B4QAAAAAAADAAAAACG4AAAUAAAkAAAD/CYT/AAD/AAD/AAD/AAD/AAD/AAD/AAAAARgAAAAAAC0AAAAAMAQA6gAAEgAAAAAA0OQAPAQVCQAAWwAr8GDFbZ4AM4AAAHxgGNDpAMcSABkAAACfLQDrAACBAAB8AABK8Afj6gCBEgB8AACgRgB30ABQCgAAWwBA8ABvbcABMxkAAABsBQAAAAAAAAAAAACcKwDoxQASAAAAAAA0eAAA6gAAEgDAAAAIhQD8KwASgwAAfAAYAGjuAJ6RAIB8AHxwAP8FAP+SAP98AP//AGD/AJ7/AID/AHxtAFMFAQCSAAB8AABK6VP0KwCAgwB8fAAAnGQA6vQVEhIAAAAAxP8AK/8Ag/8AfP9AAABvAAAVAAAAAAAA0KQBx+sAGRIAAAAANPYAZDgAg0wAfABX/4T0/+uA/xJ8/wCIoHfq6xASEk8AAABAbbhvZOsVgxIAfACgaDQALGQAT4MAAHwfgIMANewATxIAAAARAKsAAf8AAP8AAH8EnDAA6uwAEhIAAAADANAAAccAABkAAAAAiDQAZGQAg4MAfHwAAdAAAMcAABkAAAAEACsAMMUAAAAAXAADUAAAYgAAQwAASgAAS40AXOIAAEcAAAAMkv2oAAAACXBIWXMAAAsSAAALEgHS3X78AAAAY0lEQVQYlZWQ6wqAIAxGD5GXwrxkvf+rZiahFkHfn7GzjX0b80P8RNAjJkp6l4KkZBknxbBUgyCTomzQjpfeN0gzGKMpW3N0aCFc02WTnK19nRvVpnqrrGPt62Kqd/924+dzDnRdCxLwVntoAAAAAElFTkSuQmCC';
var CSS_DEFS = 'background:inherit !important;border:0px none !important;border-collapse:collapse !important;border-spacing:0 !important;bottom:auto !important;caption-side:top !important;clear:none !important;clip:auto !important;color:inherit !important;counter-increment:none !important;counter-reset:none !important;cursor:auto !important;direction:ltr !important;empty-cells:show !important;float:none !important;font:normal normal 400 11px/normal Arial !important;font-size-adjust:none !important;font-stretch:normal !important;height:auto !important;left:auto !important;letter-spacing:normal !important;line-height:normal !important;list-style:disc outside none !important;margin:0 !important;marker-offset:auto !important;marks:none !important;max-height:none !important;max-width:none !important;min-height:0 !important;min-width:0 !important;orphans:2 !important;outline:invert none medium !important;overflow:visible !important;padding:0 !important;page:auto !important;page-break-after:auto !important;page-break-before:auto !important;page-break-inside:auto !important;position:static !important;right:auto !important;size:auto !important;table-layout:auto !important;text-decoration:none !important;text-indent:0 !important;text-shadow:none !important;text-transform:none !important;top:auto !important;unicode-bidi:normal !important;vertical-align:baseline !important;visibility:inherit !important;white-space:normal !important;widows:2 !important;width:auto !important;word-spacing:normal !important;z-index:auto !important';
var MAIN_CSS = ' text-align:left;position:fixed;left:0;top:0;z-index:10000; font-size:14px;margin:5px;padding:2px;padding-top:0;padding-bottom:3px;border:3px ridge;border-color:#6495ed;display:none;background: #FDEF8C;opacity: 0.9';
var GOOGLE_IMG_SRV = "http://images.google.com/images?q=";
var DICT_CN_SRV = "http://dict.cn/ws.php?utf8=true&q=";
var GOOGLE_SERVER_USER = 'translate.google.com';
var GOOGLE_SERVER_FAST = 'http://ajax.googleapis.com/ajax/services/language/translate';
var maxGoogleURISize = 2074;
var GoogleMaxRequestSize = 5000;
var definitionFontSize = '125%';
var MEDIA_TYPE = "application/x-mplayer2";
// VLC:'application/x-vlc-plugin',  QUICKTIME:'video/quicktime', MPLAYER:'application/x-mplayer2', REALPLAYER:'audio/x-pn-realaudio-plugin'

var mouse_cx, mouse_cy;
var active_lookup, mouse_up_lookup;

createDictMod();  
  
function init() 
{
  var OS = navigator.appVersion;
  active_lookup = false;

  if (OS.toLowerCase().indexOf('mac') != -1)  
  {MEDIA_TYPE = "audio/x-pn-realaudio-plugin"; } 
  else {MEDIA_TYPE = "application/x-mplayer2"; } 
}

function addElementToBody(elem)
{
  if (document.body.body)
  { document.body.appendChild(elem); }
  else if (document.documentElement)
  { document.documentElement.appendChild(elem); }
  else { document.appendChild(elem); }
}

function createDictMod()
{
  dictMod = document.createElement("div");

  dictMod.id = 'main_dict_';
  dictMod.innerHTML = '<div id="message_dict_" style="display:block;">' +
    '<div id="pron_navi_dict_">' +
    '  <img id="imgsound_dict_"  style="float:left; cursor: pointer; cursor: hand;" src="data:image/png;base64,' + SOUNDIMAGEDATA_64 + '"' + 
    '    <span id="sound_dict_"></span>' +
    ' </img> ' + 
    '  <span id="pronunciation_dict_" >Pronunciation</span>' +
    '</div>' +
    '<div id="content_dict_" style="clear:both;  text-align:left;   font-size:75%;  padding:4 0 0 0px;  border-top:1px solid #ddd;">' +
    '  <div id="image_dict_"></div>' +
    '  <div id="definition_dict_">Defintion, synonyms, antonyms and image</div>' +
    '  <div id="example_dict_">Examples</div>' +
    '</div>' +
    '</div>' +
    '<div style="text-align:left;margin-top:2px;padding-top:1px;border-top:medium solid #c8c8c8;font:inherit;display:block">' +
    '  <div id="google_dict_" style="text-align:left;font:inherit;font-size:100%;color:black"></div>' +
    '</div>' +
    '</div>';

  addElementToBody(dictMod);

  dictMod = document.getElementById('main_dict_');
  pronunciationMod = document.getElementById('pronunciation_dict_');
  soundMod = document.getElementById('sound_dict_');
  imgsoundMod = document.getElementById('imgsound_dict_');
  definitionMod = document.getElementById('definition_dict_');
  imageElementMod = document.getElementById('image_dict_');
  exampleMod = document.getElementById("example_dict_");
  googleMod = document.getElementById("google_dict_");

  imgsoundMod.addEventListener('click',  function(){updateSound('_RE_AUDIO_');},  false);

  dictMod.style.display = "none";

  //dictMod.setAttribute("style",  MAIN_CSS);
  
  dictMod.setAttribute("style",
   "max-width:50%;  " + 
   "text-align:left;" + 
   "position:absolute;" + 
   "left:0; top:0; z-index:10000; " + 
   "font-size:18px; margin:5px;padding:2px; padding-top:0; padding-bottom:3px;" + 
    "border:3px ridge; border-color:#6495ed; display:none; background: #FDEF8C; opacity: 0.9';" 
   );
}

function updateSound(audio)
{
  var contentElement = document.createElement('span');
  
  if (audio=="_NO_AUDIO_")  
  {
    imgsoundMod.style.display = "none";
    if (soundMod.hasChildNodes()) 
    { 
    	for (var n=0; n<soundMod.childNodes.length; n++)  soundMod.removeChild(soundMod.childNodes[n]);
    }
  }
  else 
  {
  	if (audio=="_RE_AUDIO_")
  	{
      contentElement.innerHTML  = "<embed type='" + MEDIA_TYPE + "' showControls='false' hidden='true' autostart='true' src='" + currentAudio + "'/>";
    }
    else 
    {
       contentElement.innerHTML  = "<embed type='" + MEDIA_TYPE + "' showControls='false' hidden='true' autostart='true' src='" + audio + "'/>";
       currentAudio = audio;
       //alert(contentElement.innerHTML);
    }
   
  	imgsoundMod.style.display = "";
    if (soundMod.hasChildNodes())
    { soundMod.replaceChild(contentElement, soundMod.firstChild); }
    else
    { soundMod.appendChild(contentElement); }
  }
}


function addToken(token)
{    
  showToken(token);
  return false; 
}

function _trim (str)
{
   return str.replace(/^\s+|\s+$/g, "");
}

function showToken(token)
{
  var keyword = _trim(token), wordsCount=0;
  var orig_keyword = keyword;
  
  //replace the space with "+"
  while (keyword.indexOf(" ")>0) {keyword = keyword.replace(" ","+"); wordsCount++;}
  var _url = DICT_CN_SRV + keyword;
  var isChinese;
  
  isChinese = hasChinese(orig_keyword);
  if ( (wordsCount<=1) && (isChinese==false) ) 
  {
    GM_xmlhttpRequest({
      method: 'GET',
      url: _url,
      headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',  'Accept': 'application/atom+xml,application/xml,text/xml', },
      onload: function(response)
      {
        if (response.responseText != "")
        {  
          var parser = new DOMParser();
          var dom = parser.parseFromString(response.responseText, "application/xml");
        
          needGoogle = (!checkExists(keyword, dom));
          if (!needGoogle)
          {
            googleMod.style.display = 'none';
            // getImage(keyword);
            getPronunciation(orig_keyword, dom);
            getVoice(dom);
            getDefinition(dom);
            getExamples(dom, orig_keyword);
          }
          else getGoogle(keyword, 'en');
        }
      }
    });
  }
  else
  { 
  	if (isChinese) 	getGoogle(keyword, 'zh');
  	else getGoogle(keyword, 'en');
  }
}

//

function checkExists(keyword, dom)
{
   var entries = dom.getElementsByTagName('key');
   return (entries.length>0);
}

function getPronunciation(keyword, dom)
{
   var content="";   //content later fetched 
   var entries = dom.getElementsByTagName('pron');
   
   pronunciationMod.style.display = "";
   for (var i = 0; i < entries.length; i++) 
   {
      if (_trim(entries[i].textContent) != "") 
      {
       	content += entries[i].textContent;
      }
   }
   content = _trim(content);
   pronunciationMod.innerHTML = '<span style="font:inherit !important;color:green !important" >' + keyword + '</span>';
   if (content!="")  pronunciationMod.innerHTML +=  "    [" + content + "]";
}

//
function getVoice(dom)
{
    var entries = dom.getElementsByTagName('audio');
    var audio="";
    for (var i = 0; i < entries.length; i++) 
    {
       if (_trim(entries[i].textContent) != "") 
       {
       	audio = entries[i].textContent;
           break;
       }
    }
    if (audio!="")  { updateSound(audio); }
    else updateSound("_NO_AUDIO_");
}


function getDefinition(dom)
{
    var entries = dom.getElementsByTagName('def');
    var content="";
    for (var i = 0; i < entries.length; i++) 
    {
       if (_trim(entries[i].textContent) != "") 
       {
       	content += entries[i].textContent;
       }
    }
    content = _trim(content);
    if (content!="")
    {
      definitionMod.style.display = ""
      definitionMod.innerHTML = '<span style="color:darkblue !important; font-size: ' + definitionFontSize + '  !important;">' + content + '</span>';
    }
    else definitionMod.style.display = "none";
} 

function getExamples(dom, keyword)
{
    var entries = dom.getElementsByTagName('sent');
    var contentorig="", contenttrans="";
    var qDivs;
    if (entries.length>0)
    {
      qDivs = new Array(entries.length);

     while ( exampleMod.firstChild ) exampleMod.removeChild( exampleMod.firstChild );
    
     if (entries.length>0)
     {
     	 var regExpWord = new RegExp(keyword, 'gi');
     	 var colorKeyword = '<span style="font:inherit !important;color:green !important" >' + keyword + '</span>';
 
       exampleMod.style.display = '';
       exampleMod.appendChild(document.createElement("hr")); 
       
        for (var i = 0; i < entries.length; i++) 
        {
           var orig_entries = entries[i].getElementsByTagName('orig');
           var trans_entries = entries[i].getElementsByTagName('trans');
           contentorig = orig_entries[0].textContent;
           contenttrans = trans_entries[0].textContent;
         
           qDivs[i] = new Array(2);
           qDivs[i][0] = document.createElement("div"); 
           qDivs[i][1] = document.createElement("div"); 
           qDivs[i][0].innerHTML = (i+1) + '. ' + contentorig.replace(regExpWord, colorKeyword);
           qDivs[i][1].innerHTML =  '\u2192 <span style="color:darkblue !important">' +  contenttrans + '</span><br/><br/>';
	    
           exampleMod.appendChild(qDivs[i][0]); 
           exampleMod.appendChild(qDivs[i][1]); 
        }
      }
    }
    else 
    {
    	exampleMod.style.display = 'none';
    }
}

function selectLang()
{
  var text = window.navigator.language;
  if ( (text != 'zh-cn') && (text=='zh-tw') ) text = 'en';
  return text;
};

function hasChinese(txt)
{
  var l = txt.length;
  var i=0;
  var isChinese = false;
  while( i<l && ! isChinese)
  {
    var n = txt.charCodeAt(i);
    isChinese = (n >= 0x4E00 && n <= 0x9FA5) || (n >= 0x3400 && n <= 0x4DB5);
    i++;
  }

  return isChinese;
};

function getGoogle(keyword, srcLang)
{ 
	var destLang = selectLang();
	googleMod.style.display = '';
	pronunciationMod.style.display = 'none';
	definitionMod.style.display = 'none';
	exampleMod.style.display = 'none';
	imgsoundMod.style.display = 'none';
	
   if (srcLang != 'en')   destLang = 'en';
	
	GM_xmlhttpRequest ({
		method:	'GET',
		url:	GOOGLE_SERVER_FAST + '?v=1.0&q=' + keyword + '&langpair=' + srcLang + '%7C' + destLang,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8.2',
		},
		onload: function(req) {
			var res = eval( '(' + req.responseText + ')' );
			googleMod.innerHTML = res.responseData.translatedText;
		}
	});}

function getImage(keyword)
{ 
  var _url = GOOGLE_IMG_SRV + keyword;
  var imgurl; //url of img later fetched

  GM_xmlhttpRequest({
    method: 'GET',
    url: _url,
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(response){
      if(response.responseText != "")
      {    
        imgurl = analyze(response.responseText,2);//get the img block
        imgurl = analyze(imgurl,2); //twice as always
        imgurl = analyze(imgurl,3); //get the url exactly
        addImage(imgurl, keyword);
      }
    }
  });
}

function addImage(imgurl, keyword)
{
  var dimage = document.createElement("img"); 
  dimage.src = imgurl;

  if(!imageElementMod.hasChildNodes())
  {
    var linkElement = document.createElement("a");
    imageElementMod.appendChild(linkElement);
    imageElementMod.firstChild.appendChild(dimage);
    imageElementMod.firstChild.setAttribute("href",imgurl); //add link to the img
    imageElementMod.firstChild.setAttribute("target","_blank");//open in the new tab
  }
  else{ 
        imageElementMod.firstChild.setAttribute("href",imgurl); //replace link to the img         
        imageElementMod.firstChild.replaceChild(dimage,imageElementMod.firstChild.firstChild);
      }
  imageElementMod.firstChild.firstChild.setAttribute("alt",keyword); 
  imageElementMod.firstChild.firstChild.setAttribute("title","view large size"); //tooltip
  imageElementMod.setAttribute("style",  "border:#bbc 1px solid;  width:132px !important; height:116px !important; float:right; margin:2px;");
  dimage.setAttribute("style",  "border:#bbc 1px solid;  width:132px !important; height:116px !important; float:right; margin:2px;");
  //imageElementMod.height = 350;
}
 

function analyze(response, id)
{
  var l,r;//left and right position of the wanted string
  //id 0:pronuciation,1:definition,2:image block,3:img url,4:synonyms
  if (id == 0)
  {
    l = response.indexOf('<span class="pinyin">');
    r = response.indexOf('<script>pronu');
    return response.substr(l,r);
  }
  else if(id == 1)
  {
    l = response.indexOf('<div class="explain">');
    r = response.lastIndexOf('<div id="ft">');                     
    return response.substr(l,r);
  }
  else if(id == 2)
  {
    var l = response.indexOf('imgurl=');
    var r = response.indexOf('&imgrefurl=');
    return response.substr(l,r);
  }
  else if(id == 3)
  {
    var l = response.indexOf('http');
    var r = response.length;
    return response.substr(l,r);
  }
  else if(id == 4)
  {
    var l = response.indexOf('<div class="hr">');
    var r = response.indexOf('<p class="light-blue">');
    return response.substr(l,r);
  }
  else return false;
}


function isChildOf(lostChild, theParent)
{
	var nextParent = lostChild;
	while((nextParent=nextParent.parentNode)!= undefined) if(nextParent==theParent) return true;
	return false;
}

function LookupDict(w) 
{
  var sel = window.getSelection(), word;
  if (sel) word = sel.toString().toLowerCase().replace(/^\s+|\s+$/g, "");
  
  word = w || word;

  if (word != "")
  {
    var node = sel.anchorNode;;
        
    //if (!w || !isChildOf(node, dictMod)) 
    if ( (!node) || (!isChildOf(node, dictMod))  ) 
    {
      dictMod.style.left = mouse_cx + "px";
      dictMod.style.top = mouse_cy + "px";
    } 
    dictMod.style.display = "";
    currentAudio = "";
    addToken(word);
     
    if (dictMod)
    {
      dictMod.addEventListener("mouseout", function(e) 
          {
             if (!e) var e = window.event;
	         var tg = (window.event) ? e.srcElement : e.target;
	         if (tg.nodeName != 'DIV') return;
	         var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
	         while ((reltg) && (reltg != tg) && (reltg.nodeName != 'BODY')) reltg= reltg.parentNode;
	         if (reltg== tg) return;
	      	  
          	  clearTimeout(dictShowTimer);
          	  if (!isChildOf(e.target, dictMod)) 
          	  {
          	  	 dictShowTimer = window.setTimeout( function() {dictMod.style.display = 'none'}, 200);
          	  }
          	}, false);
      dictMod.addEventListener("mouseover", function(e) {clearTimeout(dictShowTimer);}, false);
    }
  }
}  

function closeDict(e)
{
  	if ( (dictMod.style.display != "none") && (!isChildOf(e.target, dictMod)) )
  	{
  	  dictMod.style.display = "none";
  	  while ( exampleMod.firstChild ) exampleMod.removeChild( exampleMod.firstChild );
  	  while ( soundMod.firstChild ) soundMod.removeChild( soundMod.firstChild );
  	  imgsoundMod.setAttribute("style", "");
  	  definitionMod.innerHTML = "";
     pronunciationMod.innerHTML = "";
   }
}

window.addEventListener('load',  init,  false);

document.addEventListener("keydown", function(e) 
   {
   	  active_lookup = (e.altKey || e.metaKey);
	}, false);
	
document.addEventListener("keyup", function(e) {active_lookup = false;}, false);

document.addEventListener("dblclick", function() {if (active_lookup) LookupDict();}, false);

document.addEventListener("select", function(e) 
  {
  	  var obj = e.target;
  	  var start = obj.selectionStart, end = obj.selectionEnd;
	  if (active_lookup)  LookupDict(obj.value.substring(start,end));
  }, false);

	  
document.addEventListener("mouseup", function(e) 
   {
 	  var coords = getPageEventCoords(e);
 	  var sel = window.getSelection();
	  mouse_cx = coords.left + 5;
	  mouse_cy = coords.top + 10;
	  if (active_lookup && sel && (sel.toString()!="")) LookupDict();
	}, false);
	
function getPageEventCoords(evt) 
{
  var coords = {left:0, top:0};
  
  if (evt.pageX) 
  {
    coords.left = evt.pageX;
    coords.top = evt.pageY;
  } 
  else if (evt.clientX) 
  {
    coords.left = evt.clientX + document.body.scrollLeft - document.body.clientLeft;
    coords.top = evt.clientY + document.body.scrollTop - document.body.clientTop;
    if (document.body.parentElement && document.body.parentElement.clientLeft) 
    {
      var bodParent = document.body.parentElement;
     coords.left += bodParent.scrollLeft - bodParent.clientLeft;
     coords.top += bodParent.scrollTop - bodParent.clientTop;
    }
  }
  
  return coords;
}

document.addEventListener("click", function(e) 
  {
   if (active_lookup==false) closeDict(e); 
 }, false);

document.addEventListener("keypress", function(e) 
   {  
	 var kC  = (window.event)?event.keyCode : e.keyCode; // MSIE : Firefox
	 var Esc = (window.event)? 27 : e.DOM_VK_ESCAPE; // MSIE : Firefox
    if (kC==Esc) closeDict(e);
  }, true);
   
// ==============================================================
var AutoUpdater_71871 = {
    id: 71871,
    days: 2,
    name: 'pic_dictionary',
    version: '0.0.3',
    time: new Date().getTime(),
    call: function(response) {
        GM_xmlhttpRequest({
            method: 'GET',
	    url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	    onload: function(xpr) {AutoUpdater_71871.compare(xpr,response);}
        });
    },
    enable: function() {
        GM_registerMenuCommand("Enable "+this.name+" updates", function() {
            GM_setValue('updated_71871', new Date().getTime()+'');
            AutoUpdater_71871.call(true)
        });
    },
    compareVersion: function(r_version, l_version) {
        var r_parts = r_version.split('.'),
            l_parts = l_version.split('.'),
            r_len = r_parts.length,
            l_len = l_parts.length,
            r = l = 0;
        for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
            r = +(r_parts[i] || '0');
            l = +(l_parts[i] || '0');
        }
        return (r !== l) ? r > l : false;
    },
    compare: function(xpr,response) {
        this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
        if ( (this.xversion) && (this.xname[1] == this.name) ) {
            this.xversion = this.xversion[1];
            this.xname = this.xname[1];
        } else {
            if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	    GM_setValue('updated_71871', 'off');
            return false;
        }
        var updated = this.compareVersion(this.xversion, this.version);
        if ( updated && confirm('A new version of '+this.xname+' is available.\nDo you wish to install the latest version?') )
            GM_openInTab('https://userscripts.org/scripts/source/'+this.id+'.user.js');
        else if ( this.xversion && updated ) {
            if(confirm('Do you want to turn off auto updating for this script?')) {
	        GM_setValue('updated_71871', 'off');
	        this.enable();
	        alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
            }
        } else if (response)
            alert('No updates available for '+this.name);
    },
    check: function() {
        if (GM_getValue('updated_71871', 0) == "off")
            this.enable();
        else {
            if (+this.time > (+GM_getValue('updated_71871', 0) + 1000*60*60*24*this.days)) {
                GM_setValue('updated_71871', this.time+'');
                this.call();
            }
            GM_registerMenuCommand("Check "+this.name+" for updates", function() {
                GM_setValue('updated_71871', new Date().getTime()+'');
                AutoUpdater_71871.call(true)
            });
        }
    }
};
if ((top ? self.location == top.location : true) && typeof GM_xmlhttpRequest !== 'undefined') 
    AutoUpdater_71871.check();
