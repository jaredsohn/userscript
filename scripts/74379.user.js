// ==UserScript==
// @name           youtube opera 10.51 fix
// @namespace      ftf.at.ua
// @description    lol, looks like opera have problems playing video from youtube. or youtube hates opera... this scripts fixes (or supposed to) this little problem
// @include        http://*.youtube.com/watch*
// @run-at	document-end
// ==/UserScript==
(function(){
var array_merge = function(arr1, arr2){
  if((arr1 && (arr1 instanceof Array)) && (arr2 && (arr2 instanceof Array))){
    for (var idx in arr2) {
      arr1.push(arr2[idx]);
    }
  }else if((arr1 && (arr1 instanceof Object)) && (arr2 && (arr2 instanceof Object))){
    for(var idx in arr2){
      if(idx in arr1){
        if (typeof arr1[idx] == 'object' && typeof arr2 == 'object') {
          arr1[idx] = array_merge(arr1[idx], arr2[idx]);
        }else{
          arr1[idx] = arr2[idx];
        }
      }else{
        arr1[idx] = arr2[idx];
      }
    }
  }
  return arr1;
}
function DO(){
	var swfc=window.yt.getConfig("SWF_CONFIG");
	var args=swfc.args;
	var flashvars='';
	for(i in args){
		flashvars+=(flashvars?"&":"")+i+"="+escape(args[i]);
	}
	var embed=document.createElement("embed");
	var attrs=array_merge({"flashvars":flashvars},swfc.attrs);
	attrs=array_merge(attrs,swfc.params);
	attrs.type="application/x-shockwave-flash";
	attrs.src=swfc.url;
	for(i in attrs){
		embed.setAttribute(i,attrs[i]);
	}
	var div=document.getElementById("watch-player");
	div.innerHTML="";
	div.appendChild(embed);
}
window.addEventListener("load",DO,0);
})()
