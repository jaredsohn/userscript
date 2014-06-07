// ==UserScript==
// @name           FPSBanana modules fixer
// @namespace      http://userscripts.org/users/63675
// @include        http://*fpsbanana.com/modules/user*
// @include        http://*rtsbanana.com/modules/user*
// @include        http://*rpgbanana.com/modules/user*
// ==/UserScript==


var version = "1.3";
var key = "57780";

var do_removeboxes = true;

var html_loading = '<b class="blue"><img src="http://image.fpsbanana.com/ico/load.gif"> Loading...</b>';
var html_error = '<b class="red">Error</b> - Please contact <u><a href="http://www.fpsbanana.com/members/125068">the script administrator</a></u>';


String.prototype.reverse = function()
{
splitext = this.split("");
revertext = splitext.reverse();
reversed = revertext.join("");
return reversed;
}

var site = document.location.toString().reverse();
site = site.substr(site.indexOf("banana".reverse())+"banana".length,3).reverse();
var module = document.location.toString().substr(document.location.toString().indexOf("?module=")+"?module=".length,5);

var type = "main";
if(document.location.toString().indexOf("useredit")>0)
{
type = "edit";
}

var user = document.location.toString();
user = user.substr(0,user.indexOf("?module="));
user = user.reverse();
user = user.substr(0,user.indexOf("/"));
user = user.reverse();

var div_id = "box"+module+"mdl";
var div = document.createElement("div");
div.className = "box box_title";
div.innerHTML = html_error;
div.id = div_id;
div.addEventListener('mousemove',checkDone,false);

var is_done = false;
function checkDone()
{
if(is_done)
{
return;
}
var html = document.getElementById(div_id).innerHTML;
if(html!=html_loading&&html!=html_error&&html!="")
{
var eles = document.getElementById(div_id).getElementsByTagName("form");
for(i=0;i<eles.length;i++)
{
ele = eles[i];
ele.addEventListener('submit',formSubmit,false);
}
is_done = true;
}
}

var sub_count = 0;

function formSubmit(e)
{
var str = "";
var ele = e.target;
var ele_cats = new Array("input","textarea","submit");
for(j=0;j<ele_cats.length;j++)
{
eles = ele.getElementsByTagName(ele_cats[j]);
for(i=0;i<eles.length;i++)
{
e = eles[i];
val = e.value;
if(!val)
{
val = e.innerHTML;
}
if(!val)
{
//val = e.selected.value;
}
str += "&postvars["+e.name+"]="+escape(val)+"";
}
}
var script = document.createElement("script");
script.type = "text/javascript";
script.innerHTML = ""+"\n";
script.innerHTML += "mdl"+module+"Obj_submit"+sub_count+" = new RawRequest('box"+module+"mdl','box"+module+"mdl',false);"+"\n";
script.innerHTML += "mdl"+module+"Obj_submit"+sub_count+".floodcheck = false;"+"\n";
script.innerHTML += "mdl"+module+"Obj_submit"+sub_count+".DoRequest('http://www."+site+"banana.com/responders/api?moduleid="+module+"&type="+type+"&entity_id="+user+""+str+"');"+"\n";
document.getElementById(div_id).innerHTML = html_error;
is_done = false;
document.getElementById(div_id).appendChild(script);
sub_count++;
return false;
}

document.getElementById("boxResp_unnamed_1").parentNode.appendChild(div);

var request_url = "http://www."+site+"banana.com/responders/api?moduleid="+module+"&type="+type+"&entity_id="+user+"";

var script = document.createElement("script");
script.type = "text/javascript";
script.innerHTML = ""+"\n";
script.innerHTML += "mdl"+module+"Obj = new RawRequest('box"+module+"mdl','box"+module+"mdl',false);"+"\n";
script.innerHTML += "mdl"+module+"Obj.floodcheck = false;"+"\n";
script.innerHTML += "mdl"+module+"Obj.DoRequest('"+request_url+"');"+"\n";

document.body.appendChild(script);

var url_update = "http://sleekupload.com/greasemonkey/update.php?id="+key+"&v="+version;
GM_xmlhttpRequest({
  method: "GET",
  url: url_update,
  onload: function(response) {
var currentversion = unescape(response.responseText);
if(currentversion!=version)
{
var url = prompt("You are using an outdated version of this script!\nYou have version "+version+", and the current version is "+currentversion+"\nPlease navigate to the url below to update:", "http://userscripts.org/scripts/show/"+key);
}
  }
});


if(do_removeboxes)
{

var ele_boxes = document.getElementsByTagName("div");
var eles_remove = new Array();

for(m=0;m<ele_boxes.length;m++)
{
box = ele_boxes[m];
if(box.className=="row_alt row_emboss")
{
if(box.parentNode.className=="toggle bit left"||box.parentNode.className=="toggle tstrong bold bit left")
{
eles_remove.push(box.parentNode);
}
}
}

if(eles_remove.length>0)
{
for(p=0;p<eles_remove.length;p++)
{
var elr = eles_remove[p];
elr.parentNode.removeChild(elr);
}
}

}