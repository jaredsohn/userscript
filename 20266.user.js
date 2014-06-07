// ==UserScript==
// @version 1
// @name Super Temp Added v.1
// @author  Mystique Ryu
// @namespace
// @description This Template Adds a Box in your Scrap
// @include http://www.orkut.com/Scrapbook.aspx*
// ==/UserScript==

/*****************Static Template*****************************/
//This is a static template and u need to change the variables and reinstall the script if u want to change your template.
function template(){
//Replace the content in quotes for this.pre and this.post with whatever u like if u need to use double quote use \"
//Enter html code of the template that would be present b4 ur scrap content. Leave blank if u want to use this as a signature
this.pre="<div style='border: 5px inset black; margin: 2px; padding: 5px; font-family: Modern; font-size: 14px; background-color: white; width: 85%; text-align: center;'>[b][navy]";
//Enter html code that comes after ur scrap content. Fill in only this if u want to use it as a signature. 
this.post="</div>";
}
/*****************Static Template*****************************/

/*****************Dynamic Template*****************************/
//This takes precedence if set.
//Mention a location of js file within the quotes where the template values are stored and thus can be modified dynamically
//Don't comment the next line use a blank value if u dont want to use this feature.
var templateURL = "";
//Use the value "http://praveen.vaka.googlepages.com/template.js" for sample
//Save the above file modify it and upload to your googlepages or your website and give the URL in the above variable.
//The variables and their function remains the same as in static template.
//I tried putting in a file on my local drive but javascript was escaping the forward slash and hence the script file could not be loaded
/*****************Dynamic Template*****************************/


function addButtons()
{
colorarray= new Array("aqua","blue","fuchsia","gold","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","violet","yellow");  
var crappy = "";
for(var i=0;i<colorarray.length;i++)
{
crappy += "craptext=craptext.replace(/([[]){1}("+
colorarray[i]+"]){1}/gi,'<font color=\""+colorarray[i]+"\">');"+
"craptext=craptext.replace(/([[]\\/){1}("+
colorarray[i]+"]){1}/gi,'</font>');";
}

var templateobject = new template();
var MainScrapBox = document.createElement("div");
if(templateURL != "")
MainScrapBox.innerHTML="  <script src=\""+templateURL+"\" type=\"text/javascript\"></script>"
MainScrapBox.innerHTML += "<script>"+
"if(typeof(pretemplate) == \"undefined\" || pretemplate == \"\")"+
"var pretemplate = \""+templateobject.pre+"\";"+
"if(posttemplate == \"\" || typeof(posttemplate) == \"undefined\")"+
"var posttemplate = \""+templateobject.post+"\";"+
"function getTextArea(n) {"+
"return document.getElementsByTagName('textarea')[n];"+
"}"+
"function sign(n){"+
"var text = getTextArea(n);"+
"if(n == 0){"+
"text.focus();"+
"}"+
"text.value=pretemplate+text.value+posttemplate;"+
"}"+
"function hidepreview(n){"+
"var gultuu = document.getElementById('pc_'+n);"+
"gultuu.style.display = 'none';"+
"}"+
"function ppreview(n){"+
"var gultuu = document.getElementById('pc_'+n);"+
"gultuu.style.display = 'inline';"+
"var gultus = document.getElementById('preview_'+n);"+
"var craptext = getTextArea(n).value;"+
"craptext=craptext.replace(/\\n/g,'<br/>');"+
"craptext=craptext.replace(/([[]){1}(b]){1}/gi,'<b>');"+
"craptext=craptext.replace(/([[]\\/){1}(b]){1}/gi,'</b>');"+
"craptext=craptext.replace(/([[]){1}(i]){1}/gi,'<i>');"+
"craptext=craptext.replace(/([[]\\/){1}(i]){1}/gi,'</i>');"+
"craptext=craptext.replace(/([[]){1}(u]){1}/gi,'<u>');"+
"craptext=craptext.replace(/([[]\\/){1}(u]){1}/gi,'</u>');"+
"craptext=craptext.replace(/([[]){1}(:\\(]){1}/gi,'<img src=\"http://img4.orkut.com/img/i_sad.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(8\\)]){1}/gi,'<img src=\"http://img3.orkut.com/img/i_cool.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(:x]){1}/gi,'<img src=\"http://img2.orkut.com/img/i_angry.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(:\\)]){1}/gi,'<img src=\"http://img1.orkut.com/img/i_smile.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(;\\)]){1}/gi,'<img src=\"http://img1.orkut.com/img/i_wink.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(:d]){1}/gi,'<img src=\"http://img1.orkut.com/img/i_bigsmile.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(:o]){1}/gi,'<img src=\"http://img1.orkut.com/img/i_surprise.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(:p]){1}/gi,'<img src=\"http://img3.orkut.com/img/i_funny.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(\\/\\)]){1}/gi,'<img src=\"http://img4.orkut.com/img/i_confuse.gif\"/>');"+crappy+
"gultus.innerHTML = craptext;"+
"}"+
"</script>"+
"<div class=\"listdivi ln\"></div><span class=\"grabtn\"><a href=javascript:void(0); onclick=\"sign(0);\" class=\"btn\">Insert Template</a></span><span class=\'btnboxr\'><img src=\'http://img3.orkut.com/img/castro/btnbox_r.gif\' alt=\'\' height=\'1\' width=\'5\'></span><span class=\"grabtn\"><a href=\"javascript: void(0);\" onclick=\"ppreview(0);\" class=\"btn\">preview</a></span><span class=\'btnboxr\'><img src=\'http://img3.orkut.com/img/castro/btnbox_r.gif\' alt=\'\' height=\'1\' width=\'5\'></span><span class=\"grabtn\"><a href=\"javascript: void(0);\" onclick=\"openFormattingTips(); return false;\" class=\"btn\">scrap tips</a></span><span class=\'btnboxr\'><img src=\'http://img3.orkut.com/img/castro/btnbox_r.gif\' alt=\'\' height=\'1\' width=\'5\'></span>";

var previewContainer = document.createElement("div");
previewContainer.setAttribute("id","pc_0");
previewContainer.setAttribute("style","display:none");
previewContainer.innerHTML = "<h2>preview</h2><div id ='preview_0' style='padding: 2px; background-color: EFF7FF; width: 800px;'></div><a href='javascript:void(0)' onclick='hidepreview(0);'>hide</a>";

var MainScrapHosted = document.getElementById("hosted");
var scrapInputContainer = document.getElementById("scrapInputContainer");
var scrapTips = scrapInputContainer.getElementsByTagName("a")[3];
scrapTips.style.display = "none";
//var removedtips = scrapInputContainer.removeChild(scrapTips);
MainScrapHosted.appendChild(MainScrapBox);
MainScrapHosted.appendChild(previewContainer);

if(typeof(document.getElementsByTagName('textarea')[1]) == "object")
for(var k = 1; k<=30; k++){
var ReplyScrapContainer = document.getElementById("scrap_"+k);
if(typeof(ReplyScrapContainer) != "object")
break;
var ReplyScrapBox = document.createElement("span");
ReplyScrapBox.innerHTML="<span class=\"grabtn\"><a href=javascript:void(0); onclick=\"sign("+k+");\" class=\"btn\">Insert Template</a></span><span class=\'btnboxr\'><img src=\'http://img3.orkut.com/img/castro/btnbox_r.gif\' alt=\'\' height=\'1\' width=\'5\'></span><span class=\"grabtn\"><a href=\"javascript: void(0);\" onclick=\"ppreview("+k+");\" class=\"btn\">preview</a></span><span class=\'btnboxr\'><img src=\'http://img3.orkut.com/img/castro/btnbox_r.gif\' alt=\'\' height=\'1\' width=\'5\'></span><span id='pc_"+k+"' style='display:none'><h2>preview</h2><span id ='preview_"+k+"'></span><br><a href='javascript:void(0)' onclick='hidepreview("+k+");'>hide</a></span>";
var ReplyScrapDivider  = ReplyScrapContainer .getElementsByTagName("div")[1];
var oldChild = ReplyScrapContainer.removeChild(ReplyScrapDivider);
ReplyScrapContainer .appendChild(ReplyScrapBox);
ReplyScrapContainer .appendChild(oldChild);
}

}

addEventListener('load', addButtons, false);