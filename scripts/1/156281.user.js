// ==UserScript==
// @name      Remove_Hidden_Char
// @include   *.*
// @author    Remove_Hidden_Char
// ==/UserScript==

(function(){
document.addEventListener('DOMContentLoaded',removeHiddenChar,false)
function removeHiddenChar(){
//site color define,
//Each line has a site define, like ,"#e8e4e1,#e8e4e2" or "fae"
	var siteColorArr = new Array();
	var sci = 0;
	siteColorArr[sci++]=["chinapub.com",""];
	siteColorArr[sci++]=["kawadgarbo.com","#e8e4e1"];
	siteColorArr[sci++]=["jjwxc.net","fae"];

	var siteColor="";
	var bgColor="";

	try{
		var ObjList = new Array("span","font");

		for (var i=0;i<sci;i++){
			if (location.hostname.indexOf(siteColorArr[i][0]) > -1){
				siteColor=siteColorArr[i][1].toLowerCase();
				if (siteColor=="") siteColor="#ffffff";
				break;
			}
		}

		bgColor=document.bgColor;
		if(bgColor==null||bgColor==""){
			if(document.style!=null) bgColor=document.style.backgroundColor;
		}

		for (var n=0;n<ObjList.length;n++){
			var objs=document.getElementsByTagName(ObjList[n]);
			for (var i=0;i<objs.length;i++){
				var o=objs[i];
				var fs=o.style.fontSize;
				if(fs=="" && ObjList[n]=="font"){
					fs=o.getAttribute("size");
				}
				if(fs!=null&&fs!=""){
					if(fs.charAt(0)=="0"){
						o.parentNode.removeChild(o);i--;continue;
					}
					else{
						p=fs.charAt(fs.length-2).toLowerCase();
						if(p=='p'){
							f=parseInt(fs.substr(0,fs.length-2));
							if(f<2){//too small to remove
								o.parentNode.removeChild(o);i--;continue;
							}
							//var d=o.style.display.toLowerCase();
							//if(d=="none")o.parentNode.removeChild(o);i--;continue;
						}
					}
				}
				//if(c=="#ffffff"||c=="white"||c=="#eefaee"||c=="#eff0eb")
				var c=o.style.color.toLowerCase();
				if(c=="" && ObjList[n]=="font"){
					c=o.getAttribute("color");
				}
				if(c!=null&&c!=""){
					c=c.toLowerCase();
					if((siteColor!="")&&((siteColor.indexOf(c) > -1)||(c.indexOf(siteColor) > -1)
					||(bgColor.indexOf(c) > -1)||(c.indexOf(bgColor) > -1)))
					{
						o.parentNode.removeChild(o);i--;continue;
					}
				}
			}
		}
	}
	catch(e){
	}
}
})()
