// ==UserScript==
// @name           Facemon Autobot
// @namespace      facemon
// @description    facemon auto battle
// @author	       yihyeh
// @include        http://apps.facebook.com/facemon/*
// ==/UserScript==


           
window.setInterval(function() {
   var d = new Date();
   var min = d.getMinutes();

   if(min==01)
   {
      window.setInterval(function() {
            var q = document.evaluate( '//center[text()=contains(.,"result")]', document, null, XPathResult.ANY_TYPE, null ); 
            var thisNode = q.iterateNext();     
            var str=thisNode.textContent;
            var str1=str.replace("What's the result of ","");
            var str2=str1.replace("?","");
            var str3=str2.replace("plus","+");
            document.getElementsByName("reponse")[0].value=eval(str3); 
            document.getElementsByName("captcha")[0].parentNode.submit();
      }, 20000);
   }
}, 1000);


var dv=document.createElement("div");
var lbl=document.createElement("label");
var dv2=document.createElement("div");
var atk=document.createElement("input");
var def=document.createElement("input");
var dge=document.createElement("input");
var spd=document.createElement("input");
var ptl=document.createElement("input");
var img=document.createElement("input");
var btn=document.createElement("input");
var btn2=document.createElement("input");
var frm=document.createElement("form");
var frm2=document.createElement("form");

dv.setAttribute("style", "margin-bottom: 3px; display: block; width: 738px; background-color: rgb(255, 255, 204);");
dv.setAttribute("class", "encadre");
dv2.setAttribute("style", "margin-bottom: 3px; display: block; width: 738px; background-color: rgb(255, 255, 204);");
dv2.setAttribute("class", "encadre");

img.setAttribute("name", "img_facemon_hidden");
img.setAttribute("id", "app116615171711717_img_facemon_hidden");
//img.setAttribute("fbcontext", "ba449ee2d732");


//atk.setAttribute("type", "hidden");
//def.setAttribute("type", "hidden");
//dge.setAttribute("type", "hidden");
//spd.setAttribute("type", "hidden");
//img.setAttribute("type", "hidden");

atk.setAttribute("name", "atk_hidden");  
atk.setAttribute("id", "app116615171711717_atk_hidden");
//atk.setAttribute("fbcontext", "ba449ee2d732");
atk.setAttribute("style", "width: 30px");

def.setAttribute("name", "def_hidden");
def.setAttribute("id", "app116615171711717_def_hidden");
//def.setAttribute("fbcontext", "ba449ee2d732");
def.setAttribute("style", "width: 30px");

dge.setAttribute("name", "esq_hidden");
dge.setAttribute("id", "app116615171711717_esq_hidden");
//dge.setAttribute("fbcontext", "ba449ee2d732");
dge.setAttribute("style", "width: 30px");

spd.setAttribute("name", "vit_hidden");
spd.setAttribute("id", "app116615171711717_vit_hidden");
//spd.setAttribute("fbcontext", "ba449ee2d732");
spd.setAttribute("style", "width: 30px");

ptl.setAttribute("id", "app116615171711717_points_left");
//ptl.setAttribute("fbcontext", "ba449ee2d732");
ptl.setAttribute("style", "width: 30px");

btn.setAttribute("class","handmade_button");
btn.setAttribute("type","submit");

btn2.setAttribute("class","handmade_button");
btn2.setAttribute("type","submit");

frm.setAttribute("method", "post");
frm.setAttribute("action", "?action=stats");
frm.setAttribute("id", "app116615171711717_stats_giver_form");
//frm.setAttribute("fbcontext", "ba449ee2d732");

frm2.setAttribute("method", "post");
frm2.setAttribute("action", "?action=model");
frm2.setAttribute("id", "app116615171711717_model_giver_form");
//frm2.setAttribute("fbcontext", "ba449ee2d732");

frm2.appendChild(document.createTextNode("Enter link to a image to change avatar (e.g.: http://94.23.220.187/facemon/img/facemon/vif/3_1.png)"));frm2.appendChild(document.createElement("br"));frm2.appendChild(img);frm2.appendChild(btn2);

frm.appendChild(document.createTextNode("Attack:"));frm.appendChild(atk);
frm.appendChild(document.createTextNode("Defense:"));frm.appendChild(def);
frm.appendChild(document.createTextNode("Dodge:"));frm.appendChild(dge);
frm.appendChild(document.createTextNode("Speed:"));frm.appendChild(spd);
frm.appendChild(document.createTextNode("Point:"));frm.appendChild(ptl);
frm.appendChild(btn);
frm.appendChild(document.createTextNode("This only working if you have at least 1 (one) remaining point"));

dv.appendChild(frm);
dv2.appendChild(frm2);

//document.getElementById("app116615171711717_share_div").parentNode.insertBefore(dv,document.getElementById("app116615171711717_share_div"));
//document.getElementById("app116615171711717_share_div").parentNode.insertBefore(dv2,document.getElementById("app116615171711717_share_div"));