// ==UserScript==
// @name wz
// @author Outku
// @description
// @create
// @lastmodified
// @namespace http://userscripts.org/users/Rabbit
// @updateURL
// @version
// @include
// ==/UserScript==
var debug=false;
var CleanHideObj=new CleanHideClass();
function getRGB(colorString){var RGB = new Array;var tempSting=colorString.substring(4,colorString.length-1);var tempArray=tempSting.split(",");RGB[0]=parseInt(tempArray[0]);RGB[1]=parseInt(tempArray[1]);RGB[2]=parseInt(tempArray[2]);return RGB;}
	function CleanHideClass() {
		this.on=function(){
			var page=document;
			this.RemoveHide(page,"span");
			this.RemoveHide(page,"font");
			this.RemoveHide(page,"div");
			this.RemoveHide(page,"p");
		}
		this.getobjstyle=function(node,prop){
			try{return node.ownerDocument.defaultView.getComputedStyle(node, "").getPropertyValue(prop);}
			catch(e){if(debug){alert(e.message);}return "200";}
		}
		this.RemoveHide=function(page,objname){
			try{
				var minValue=25;
				var objs=page.getElementsByTagName(objname);
				if(objs.length == 0){
					if(debug){alert("no object found!:"+objname);}
				}
				else{
					for(var i=objs.length-1;i>=0;i--){
						var node=objs.item(i);
						if(this.getobjstyle(node,"display") == "none" ||
							this.getobjstyle(node,"visibility") =="hidden" ||
							parseInt(this.getobjstyle(node,"font-size")) == 0){if(debug){alert("remove invisiable!");}node.parentNode.removeChild(node);}
						else{
							if(node.parentNode){
								var orgNode=node;
								var orgColor=this.getobjstyle(orgNode,"color");
								var orgRGB=getRGB(orgColor);
								var parentNode=node.parentNode
								var parentBgColor=this.getobjstyle(parentNode,"background-color");
								var isLast=false;
								regtest=/rgba\((\s)*0,(\s)*0,(\s)*0,(\s)*0\)/;
								while(regtest.test(parentBgColor)){
									if(parentNode.parentNode == null){isLast=true;break;}
									parentNode=parentNode.parentNode;
									parentBgColor=this.getobjstyle(parentNode,"background-color");
									parentBgColor=parentBgColor+"";
									if(!regtest.test(parentBgColor)){break;}
								}
								if(isLast){
									if(debug){alert("last!!");}
									if((Math.abs(orgRGB[0]-255)<=minValue)&&(Math.abs(orgRGB[1]-255)<=minValue)&&(Math.abs(orgRGB[2]-255)<=minValue)){orgNode.parentNode.removeChild(orgNode);}
								}
								else{
									if(debug){alert("compare color and parent bgcolor!");}
									parentBgRGB=getRGB(parentBgColor);
									if((Math.abs(orgRGB[0]-parentBgRGB[0])<=minValue)&&(Math.abs(orgRGB[1]-parentBgRGB[1])<=minValue)&&(Math.abs(orgRGB[2]-parentBgRGB[2])<=minValue)){orgNode.parentNode.removeChild(orgNode);}
								}
							}
						}
					}
				}
				var itemFrames = page.getElementsByTagName("frame");
				var itemiFrames = page.getElementsByTagName("iframe");
				var frame, iframe;
				if (itemFrames.length > 0){for (var i = 0 ; i< itemFrames.length ; i++) {frame = itemFrames[i].contentDocument;this.RemoveHide(frame,objname);}}
				if (itemiFrames.length > 0){for (var i = 0 ; i < itemiFrames.length ; i++) {iframe = itemiFrames[i].contentDocument;this.RemoveHide(iframe,objname);}}
			}
			catch(e){if(debug){alert(e.message);}}
		}
	}
	function dec2hex(i){
        var r='00';
        i=parseInt(i);
        if(i>=0 && i<=15) r='0'+i.toString(16);
        else if(i>=16 && i<=255) r=i.toString(16);
        return(r);
	}
	function fixColor(x){
        if(x.length==7 && x.indexOf('#')==0) return(x);
        else if(x=='transparent') return(x);
        else if(x.length==4 && x.indexOf('#')==0) return('#'+x.charAt(1)+x.charAt(1)+x.charAt(2)+x.charAt(2)+x.charAt(3)+x.charAt(3));
        else if(x.indexOf('rgb')==0){var y=x.substr(4, x.length-5);var a=y.split(',');return('#'+dec2hex(a[0])+dec2hex(a[1])+dec2hex(a[2]));}
        else if(x=='white') return('#ffffff');
        else if(x=='black') return('#000000');
        else return(x);
	}
	function removeHidden(x){
        var objs = document.getElementsByTagName(x);
        for(var j=objs.length-1; j>=0; j--){
			if(objs[j].currentStyle.display=='none'||objs[j].currentStyle.visibility=='hidden'||objs[j].currentStyle.fontSize.indexOf('0')==0||objs[j].currentStyle.width=='0px'||objs[j].currentStyle.height=='0px'){objs[j].removeNode(true);}
			else{
				var y=fixColor(objs[j].currentStyle.color);
				var yR=parseInt(y.substr(1,2),16);
				var yG=parseInt(y.substr(3,2),16);
				var yB=parseInt(y.substr(5,2),16);
				var z=objs[j].parentElement;
				while(z){
					var c=fixColor(z.currentStyle.backgroundColor);
					f(z.tagName=='BODY' && c=='transparent') c='#ffffff';
					f(c==y){objs[j].removeNode(true);break;}
					else if(Math.abs(parseInt(c.substr(1,2),16)-yR)<20 && Math.abs(parseInt(c.substr(3,2),16)-yG)<20 && Math.abs(parseInt(c.substr(5,2),16)-yB)<20){objs[j].removeNode(true);break;}
					else if(c!='transparent') break;
					else z=z.parentElement;
				}
			}
        }
	}
if(navigator.userAgent.indexOf('MSIE') > 0){removeHidden('font');removeHidden('span');document.body.oncopy=null;document.body.onbeforecopy=null;document.oncopy=null;document.onbeforecopy=null;oncopy=null;onbeforecopy=null;}
else
CleanHideObj.on();