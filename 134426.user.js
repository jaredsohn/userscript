// ==UserScript==
// @name           MonFontTagger
// @namespace      hv-986.mnwfonttagger
// @description    Tag right font-family for between Mon and Unicode
// @include        http://*
// @include        https://*
// @include        file:///*
// @version 1.3
// @uso:version 1.3
// ==/UserScript==

var SUC_script_num=103745;try
{function updateCheck(forced)
{if((forced)||(parseInt(GM_getValue('FT_last_update','0'))+86400000<=(new Date().getTime())))
{try
{GM_xmlhttpRequest({method:'GET',url:'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(resp)
{var local_version,remote_version,rt,script_name;rt=resp.responseText;GM_setValue('FT_last_update',new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('FT_current_version','-1'));if(local_version!=-1)
{script_name=(/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('FT_target_script_name',script_name);if(remote_version>local_version)
{if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
{GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('FT_current_version',remote_version);}}
else if(forced)
alert('No update is available for "'+script_name+'."');}
else
GM_setValue('FT_current_version',remote_version+'');}});}
catch(err)
{if(forced)
alert('An error occurred while checking for updates:\n'+err);}}}
GM_registerMenuCommand(GM_getValue('FT_target_script_name','MyanmarFontTagger')+' - Manual Update Check',function()
{updateCheck(true);});updateCheck(false);}
catch(err)
{}

var regexMM = new RegExp("[\u1000-\u109f\uaa60-\uaa7f]+");
var regexUni = new RegExp("[ဃငၚဆဇဈဉညဋဌဍဎဏဒဓနဘရဝဟဠအၜၝ]်|ျ[က-အ]ါ|ျ|ၠ|ၞ|ၟ[ါ-း]|\u103e|\u103f|\u1031[^\u1000-\u1021\u103b\u1040\u106a\u106b\u107e-\u1084\u108f\u1090]|\u1031$|\u1031[က-အ]\u1032|\u1025\u102f|\u103c\u103d[\u1000-\u1001]|ည်း|ျင်း|င်|န်း|ျာ");
var regexZG = new RegExp("\s\u1031| ေ[က-အ]်|[က-အ]း");
var timerID = undefined;
var mmFonts = new RegExp("Mon|MON3Anonta1|TharLon|Yunghkio|Parabaik|WinUni Innwa|Win Uni Innwa|Padauk|MyMyanmar|Panglong");
var unicodeFonts = new RegExp("MON3Anonta1|TharLon|Yunghkio|Parabaik|WinUni Innwa|Win Uni Innwa|Padauk|MyMyanmar|Panglong|Myanmar Sangam");
var useUnicodeFont = "MON3Anonta1,'TharLon','Myanmar Sangam MN',Myanmar3,Yunghkio,Parabaik,'WinUni Innwa','Win Uni Innwa',Padauk,Panglong,'MyMyanmar Unicode','Myanmar MN'";

var facebook_wordbreaking_classes = ['messageBody', 'commentBody', 'uiAttachmentTitle', 'uiAttachmentDesc', 'ministoryInlineMessage', 'msg'];

var dummySpanEl = document.createElement('span');
dummySpanEl.style.fontFamily = useUnicodeFont;
useUnicodeFont = dummySpanEl.style.fontFamily;

var tagPage = function()
{
    for (var i = 0; i < facebook_wordbreaking_classes.length; i++) {
        var els = document.getElementsByClassName(facebook_wordbreaking_classes[i])
        for (var j = 0; j < els.length; j++) {
            var thisNode = els[j];
            var text = thisNode.textContent;
        
            if (!regexMM.test(text)) {
    			continue;
    		}
		
    		var computedStyles = document.defaultView.getComputedStyle(thisNode, null);
		
    		if (computedStyles.fontFamily.indexOf(useUnicodeFont) == -1 && unicodeFonts.test(computedStyles.fontFamily)) {
    		    thisNode.style.fontFamily = computedStyles.fontFamily + "," + useUnicodeFont;
    		    continue;
    		}
		
    		if (mmFonts.test(computedStyles.fontFamily)) {
    			continue;
    		}
		
            if (regexUni.test(text) && !regexZG.test(text)) {
                thisNode.style.fontFamily = computedStyles.fontFamily + "," + useUnicodeFont;
            } else {
                thisNode.style.fontFamily = computedStyles.fontFamily + "," + "Mon";
            }
        }
    }
    
    var el = document.getElementsByTagName('*');
     for (var i = 0; i < el.length; i++)
     {
         var childs = el[i].childNodes;
         for (var j = 0; j < childs.length; j++)
         {
             var thisNode = childs[j];
             if (thisNode.nodeType == 3) {
    
                 var prNode = thisNode.parentNode;
                 var text = thisNode.textContent;
    
                 if (!regexMM.test(text)) {
                     continue;
                 }
                 
                 var computedStyles = document.defaultView.getComputedStyle(prNode, null);
                 
                 if (computedStyles.fontFamily.indexOf(useUnicodeFont) == -1 && unicodeFonts.test(computedStyles.fontFamily)) {
                     prNode.style.fontFamily = useUnicodeFont;
                     continue;
                 }
                 
                 if (mmFonts.test(computedStyles.fontFamily)) {
                     continue;
                 }
                 
                 var nextNode = thisNode;
                    while (nextNode.nextSibling) {
                        nextNode = nextNode.nextSibling;
                        text += nextNode.textContent;
                    }
                    
                    if (text) {
                        if (regexUni.test(text) && !regexZG.test(text)) {
                            prNode.style.fontFamily = computedStyles.fontFamily + "," + useUnicodeFont;
                        } else {
                            prNode.style.fontFamily = computedStyles.fontFamily + "," + "Mon";
                        }
                    }
             }
         }
     }
}
tagPage();

document.body.addEventListener("DOMNodeInserted", function () {
	if (timerID) {
		clearTimeout(timerID);
	}
	timerID = window.setTimeout(tagPage, 500);
}, false);