// ==UserScript==
// @name           devART v7 Full View
// @namespace      Scortis
// @include        http://*.deviantart.com/*
// @include        http://deviantart.com/*
// @include        http://*.deviantart.net/*
// @include        http://deviantart.net/*
// ==/UserScript==

/*
	Fix for fullview for dA v7
*/
fvinterval=setInterval(function(){
do{
if(!document.getElementById("gmi-ResourcePageMetaPane")) {
	break;
}
if(document.getElementById("fvbutton")){
clearInterval("fvinterval");
break;
}
loc = window.location;
reg = /(#+)/;
if (!reg.test(loc)) loc = "#";
xd = new Image();
xd.src = document.getElementById("gmi-ResViewSizer_fullimg").src;
w = xd.width;
h = xd.height;

rightpanel = document.getElementById("gmi-ResourcePageMetaPane").innerHTML;
if(document.getElementsByName("gmi-ResViewSizer_fullimg")[1]){
rightpanelnew = "<a id=\"fvbutton\" href=\""+loc+"\" class=\"smbutton\" onclick='DWait.readyLink(\"jms/pages/superbrowse/master.js\", document.getElementById(\"gmi-ResViewSizer_img\"), function () { GMI.up(document.getElementById(\"gmi-ResViewSizer_img\"), \"ResourcePageDisplayPane\").deviationChangeView(1,0,1) });document.getElementsByName(\"gmi-ResViewSizer_fullimg\")[1].style.width = "+ w +" + \"px\";document.getElementsByName(\"gmi-ResViewSizer_fullimg\")[1].style.height = "+ h +" + \"px\";document.getElementsByName(\"gmi-ResViewSizer_fullimg\")[1].style.marginLeft = \"20px\";document.getElementsByName(\"gmi-ResViewSizer_fullimg\")[0].style.width = "+ w +" + \"px\";document.getElementsByName(\"gmi-ResViewSizer_fullimg\")[0].style.height = "+ h +" + \"px\";document.getElementsByName(\"gmi-ResViewSizer_fullimg\")[0].style.marginLeft = \"20px\";'><span><i class=\"i12\" style=\"background-position: -520px;\"></i>Full View</span></a>" + rightpanel;
} else {
rightpanelnew = "<a id=\"fvbutton\" href=\""+loc+"\" class=\"smbutton\" onclick='DWait.readyLink(\"jms/pages/superbrowse/master.js\", document.getElementById(\"gmi-ResViewSizer_img\"), function () { GMI.up(document.getElementById(\"gmi-ResViewSizer_img\"), \"ResourcePageDisplayPane\").deviationChangeView(1,0,1) });document.getElementById(\"gmi-ResViewSizer_fullimg\").style.width = "+ w +" + \"px\";document.getElementById(\"gmi-ResViewSizer_fullimg\").style.height = "+ h +" + \"px\";document.getElementById(\"gmi-ResViewSizer_fullimg\").style.marginLeft = \"20px\";'><span><i class=\"i12\" style=\"background-position: -520px;\"></i>Full View</span></a>" + rightpanel;
}
document.getElementById("gmi-ResourcePageMetaPane").innerHTML = rightpanelnew;
}
while (false);
}, 300);