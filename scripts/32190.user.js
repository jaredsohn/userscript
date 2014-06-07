// ==UserScript==
// @name           deviantART - X Chars Remaining (Editing Signatures)
// @namespace      http://davidjcobb.deviantart.com/
// @description    When editing your Comment Signature, this userscript shows how many more characters you can type.
// @include        http://my.deviantart.com/settings/identity
// ==/UserScript==

uTE=function(s){return s.replace(/[^\x00-\xff]/g,function(x){return "&#"+x.charCodeAt(0)+";"})}; // unicodeToEntities

checkbox=
function() {
   var B=window.box,L=window.label,val=uTE(B.value),VL=val.length;
   if(VL>=255&&B.value.length<255)VL=(B.value=val.substring(0,255)).length;
   if(B.value.length>255)VL=(val=uTE(B.value=B.value.substring(0,255))).length;
   L.innerHTML="("+val.length+"/255)";
   L.style.fontWeight=["","bold","bold"][(VL>244)+(VL>=255)];
   L.style.color=["","#F70","red"][(VL>244)+(VL>=255)];
};

var $=function(){return document.getElementById.apply(document,arguments)};
window.box=$("signature_id");
window.label=window.box.parentNode.parentNode.getElementsByTagName("label")[0].appendChild(document.createElement("span"));
window.label.style.marginLeft="4em";

box.addEventListener("keyup",checkbox,true);
checkbox();

// kill dA's jQuery-based counter, because it's not even placed in a nice location, and ours takes non-ASCII characters into account
if(unsafeWindow.$j&&unsafeWindow.$j.fn.countdown) {
   unsafeWindow.$j("#signature_id").unbind("keyup");
   unsafeWindow.$j("#signature_id").nextAll("span.countdown").eq(0).remove();
}