// ==UserScript==
// @name          Facebook Video SDN
// @namespace     http://forum.shiftdelete.net
// @description	  Kolay yoldan facebooktan video ekleme, sadece Public videolar için.
// @author        __kadıköyRAP__
// @include       http://forum.shiftdelete.net/*
// @run-at        document-end
// ==/UserScript==
(function() {

window.addEventListener("load", function(e) {
  addButton();
}, false);
 
function addButton(){
 var i=0;
 var count=0;
 var buttonElems = document.getElementsByTagName('span');
 for(i=0; i<buttonElems.length; i++)
 {
	
	if(buttonElems[i].className=="cke_toolgroup")
	{
		count++;
		if(count==4)
		{
			buttonElems[i].innerHTML = buttonElems[i].innerHTML + '<span class="cke_button" id="greasemonkeyButton"><a onfocus="return CKEDITOR.tools.callFunction(43, event);" onkeydown="return CKEDITOR.tools.callFunction(42, event);" onblur="this.style.cssText = this.style.cssText;" aria-labelledby="cke_22_label" role="button" hidefocus="true" tabindex="-1" title="Facebook Video" class="cke_off cke_button_videotag" id="cke_22"><span class="cke_icon">&nbsp;</span><span class="cke_label" id="cke_22_label">Facebook Video</span></a></span>';
			addButtonListener();
		}
	}
 }
}
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',doMonkey,true);
}
 
function doMonkey(){
	var i=0;
	var j=0;
	var faceid="";
	var facelink = window.prompt("Facebook Video Linkini Girin","");
	for(i=0; i<facelink.length; i++)
	{
		if(facelink[i]+facelink[i+1]+facelink[i+2]+facelink[i+3]+facelink[i+4]+facelink[i+5]+facelink[i+6]=='.php?v=')
		{
			for(j=i+7; ;j++)
			{
				if(facelink[j]=='0' || facelink[j]=='1' || facelink[j]=='2' || facelink[j]=='3' || facelink[j]=='4' || facelink[j]=='5' || facelink[j]=='6' || facelink[j]=='7' || facelink[j]=='8' || facelink[j]=='9')
					faceid+=facelink[j];
				else
					break;
			}
		}
	}
	window.prompt("Linki Kopyalayın (Ctrl + C)","[flash]http://sn.im/facesdn/" + faceid + ".flv[/flash]");
}

})();
