// ==UserScript==
// @name           .ini -> launchpad
// @namespace      http://ocportal.com
// ==/UserScript==

if (window.location.href.indexOf('translations.launchpad.net/ocportal')==-1) return;

// Load Google Translate
var link=document.createElement('script');
link.setAttribute('type',"text/javascript");
var url="http://www.google.com/jsapi?callback=doneLoadingJSAPI";
link.setAttribute('src',url);
document.getElementsByTagName('head')[0].appendChild(link);

unsafeWindow.doneLoadingJSAPI = function() { unsafeWindow.google.load('language','1', {"callback" : google_translate_all}); }

function google_translate_all()
{
   var labels=document.getElementsByTagName('label');
   for (var i=0;i<labels.length;i++)
   {
      if (labels[i].className=='no-translation')
      {
         test_match=labels[i].id.match(/^msgset\_(\d+)\_(\w+)\_translation\_0$/);

         if (test_match[0])
         {
            google_translate(test_match[1],test_match[2]);
         }
      }
   }
}
function google_translate(id,page_language)
{
   with (unsafeWindow)
   {
      var before = document.getElementById('msgset_'+id+'_singular');
      var text = html_entity_decode(before.innerHTML).replace(/<br \/>/g,"\n").replace(/\{/g,'(((').replace(/}/g,')))');
      var translated = document.getElementById('msgset_'+id+'_'+page_language+'_translation_0_new');
      if (translated.value!='') return;

      unsafeWindow.google.language.translate(text, "en", page_language,
         function(result) {
            if (result.translation)
            {
               result.translation = result.translation.replace(/\(\(\(/g,'{').replace(/\)\)\)/g,'}').replace(/«/g,'\'').replace(/»/g,'\'');
               translated.value = html_entity_decode(result.translation);
               document.getElementById('msgset_'+id+'_'+page_language+'_translation_0_new_select').checked=true;
            }
         });
   }
}

function html_entity_decode(str)
{
    //jd-tech.net
    var  tarea=document.createElement('textarea');
    tarea.innerHTML = str; return tarea.value;
    tarea.parentNode.removeChild(tarea);
}


// Now put a .ini file translation button up

var ocp_link=document.createElement('a');
ocp_link.innerHTML='.ini convert';
ocp_link.style.background='#FAA';
ocp_link.style.border='#D88';
ocp_link.style.position='absolute';
ocp_link.style.right='400px';
ocp_link.style.top='10px';
ocp_link.style.display='block';
ocp_link.href="Javascript: void(document.getElementById('ocp_lang').style.display='block');";
var form=document.createElement('form');
form.style.background='#FAA';
form.style.border='#D88';
form.style.position='absolute';
form.style.left='100px';
form.style.top='100px';
form.style.display='none';
form.id='ocp_lang';
// e.g. BLOCK_main_cc_embed_DESCRIPTION=test
form.innerHTML=
'<textarea style="display: none" name="codefiddle">\n'+
'      var split=window.initext.split(/\\n/);      \n'+
'      var classes=document.getElementsByClassName("discreet");      \n'+
'      for (var i=0;i&lt;split.length;i++)      \n'+
'      {      \n'+
'         var parts=split[i].split("=",2);      \n'+
'         if (parts.length==2)      \n'+
'         {      \n'+
'            for (var j=0;j&lt;classes.length;j++)   \n'+
'            {   \n'+
'               if (classes[j].cells[1].innerHTML.indexOf("[strings]"+parts[0])!=-1)\n'+
'               {   \n'+
'                  var input=classes[j].previousSibling.previousSibling.previousSibling.previousSibling.getElementsByTagName("input");\n'+
'                  if (input[1]) { input[0].checked=true; input[1].value=parts[1]; }  \n'+
'               }   \n'+
'            }   \n'+
'         }      \n'+
'      }      \n'+
'</textarea>'+
'<textarea name="ini" cols="80" rows="29">PASTE INI FILE CONTENTS IN HERE</textarea><br /><input type="button" value="Use" onclick="window.initext=this.form.elements[\'ini\'].value; eval(this.form.elements[\'codefiddle\'].value); this.form.style.display=\'none\';" />';
document.body.appendChild(form);
document.body.appendChild(ocp_link);