// ==UserScript==
// @name          CleanHide & Enable RightClick-Copy
// @namespace     http://notebk.spaces.live.com/
// @description   CleanHide.Hotkey:CRTL+Q. Created By Inorth. blueicejin@163.com.http://notebk.spaces.live.com/
// @include       *
// @version       0.3
// ==/UserScript==


var debug=false;		//debug or release switch!!
var CleanHideObj=new CleanHideClass();

function CleanHideClass() 
{	
	//functions;id mean cleanhid ,AppID mean call from firefox or mozilla (different! call from overlayFF or overlayMZ!)
	this.on=function(id,bMZ)
	{
		//this.strBundle = document.getElementById("cleanhide-strings");	//get the strings use in js!
		if(id == 0)
		{
			var page=/* document.getElementById("content").contentDocument */document;	//main page
			this.RemoveHide(page,"span");
			this.RemoveHide(page,"font");
			this.RemoveHide(page,"div");
			this.RemoveHide(page,"p");
			//alert(this.strBundle.getString("CleanHideSuccess"));
			//document.getElementById("statusbar-display").label=this.strBundle.getString("CleanHideSuccess");
		}
		
	}
	this.getobjstyle=function(node,prop)
	{
		try
		{
			return node.ownerDocument.defaultView.getComputedStyle(node, "").getPropertyValue(prop);
		}
		catch(e)
		{
			if(debug)
			{
				alert(e.message);
			}
			
			return "200";
		}
	}
	
	this.RemoveHide=function(page,objname)
	{
		try
		{
			var minValue=15;
			var objs=page.getElementsByTagName(objname);	//get all element

			if(objs.length == 0)	//no span or font object found!
			{
				if(debug)
				{
					alert("no object found!:"+objname);
				}
			}
			else
			{
				//determean every object!
				for(var i=objs.length-1;i>=0;i--)	//must from last to first!!! for detect every  element!!
				{
					var node=objs.item(i);	//get one element 
					
					//if this object is invisible,we delete it!!
					if(this.getobjstyle(node,"display") == "none" ||
						this.getobjstyle(node,"visibility") =="hidden" ||
						parseInt(this.getobjstyle(node,"font-size")) == 0)	//if this element'style is none,than remove it!!
					{
						if(debug)
						{
							alert("remove invisiable!");
						}
						node.parentNode.removeChild(node);
						
					}
					else	//normal object!have color!
					{
						if(node.parentNode)	//if it has parent node!!
						{
							var orgNode=node;
							var orgColor=this.getobjstyle(orgNode,"color")
							var orgRGB=getRGB(orgColor);	//get org node's RGB only color.
							
							var parentNode=node.parentNode
							var parentBgColor=this.getobjstyle(parentNode,"background-color");
								
							var isLast=false;
							
							while(parentBgColor == "transparent")	//parent bg is transparent!!,get last no transparent node!!
							{
								//if(debug && orgRGB[0] != 0)
								//{
								//	alert("org color:"+orgRGB[0]+","+orgRGB[1]+","+orgRGB[2]+"\n"
								//	+"parent bgcolor:"+parentBgRGB[0]+","+parentBgRGB[1]+","+parentBgRGB[2]+"\n"
								//	+"parentNode name:"+parentNode.nodeName+"parent id:"+parentNode.id+"bgcolor:"+this.getobjstyle(parentNode,"background-color"));
								//}
								
								if(parentNode.parentNode == null)
								{
									isLast=true;
									break;
								}
								parentNode=parentNode.parentNode;
								parentBgColor=this.getobjstyle(parentNode,"background-color");

								if(parentBgColor != "transparent")	//parent have color
								{
									break;
								}
							}
							if(isLast)	//body is RGB(255,255,255)!!!
							{
								if(debug)
								{
									alert("last!!");
								}
								if((Math.abs(orgRGB[0]-255)<=minValue)&&(Math.abs(orgRGB[1]-255)<=minValue)&&(Math.abs(orgRGB[2]-255)<=minValue))
								{
										orgNode.parentNode.removeChild(orgNode);		//color is near white,we delete it!
								}
							}
							else
							{
								if(debug)
								{
									alert("compare color and parent bgcolor!");
								}
								parentBgRGB=getRGB(parentBgColor);
								if((Math.abs(orgRGB[0]-parentBgRGB[0])<=minValue)&&(Math.abs(orgRGB[1]-parentBgRGB[1])<=minValue)&&(Math.abs(orgRGB[2]-parentBgRGB[2])<=minValue))
								{
										orgNode.parentNode.removeChild(orgNode);		//color is near white,we delete it!
								}
							}
						}//end of hava parent
					}//if invisible
				}//for ... every object
			}//object lentgth == 0
			
			//find sub frames
			var itemFrames = page.getElementsByTagName("frame");
			var itemiFrames = page.getElementsByTagName("iframe");
			
			var frame, iframe;
			if (itemFrames.length > 0)
			{
				for (var i = 0 ; i< itemFrames.length ; i++) 
				{
					frame = itemFrames[i].contentDocument;
					this.RemoveHide(frame,objname); // recursion for frames
				}
			}
			if (itemiFrames.length > 0)
			{
				for (var i = 0 ; i < itemiFrames.length ; i++) 
				{
					iframe = itemiFrames[i].contentDocument;
					this.RemoveHide(iframe,objname); // recursion for iframes
				}
			}
		}
		catch(e)
		{
			if(debug)
			{
				alert(e.message);
			}
		}
	}
	
}
//this function for get R G B data from string rgb(r,g,b)  or blue,etc
function getRGB(colorString)
{
		var RGB = new Array;
		var tempSting=colorString.substring(4,colorString.length-1);
		var tempArray=tempSting.split(",");

		RGB[0]=parseInt(tempArray[0]);
		RGB[1]=parseInt(tempArray[1]);
		RGB[2]=parseInt(tempArray[2]);
		
		return RGB;
}

function antiCopy(){
	var attr = ['onmousedown','ondragstart','onselectstart','onselect','oncontextmenu','onbeforecopy','oncopy'];//anticopy attribute enum
	kill = new Function("return true");
	var tt = document.getElementsByTagName('*');
	for (var j=0;j<attr.length;j++){
		document[attr[j]] = kill;// top attribute
		for (var i=0;i<tt.length; i++){// child object
    		if(tt[i].getAttribute(attr[j])!=null)
    	    {
             tt[i].setAttribute(attr[j],'return true;')
        	}
		}
	}

	var antiCopyCSS = document.createElement('style');
	antiCopyCSS.innerHTML='*{-moz-user-select: auto!important; -webkit-user-select: auto!important; -ms-user-select: auto!important; -o-user-select:auto!important;user-select:auto!important}';
	document.body.appendChild(antiCopyCSS);
}

function keys(evt)  
  {  //var evt=evt?evt:(window.event?window.event:null);
      if(evt.ctrlKey && evt.keyCode=="81")  
      {  //var CleanHideObj=new CleanHideClass();
      	  CleanHideObj.on(0,1);
      	  
      	  //add enable right-click and copy feature
      	  antiCopy();
      	  //end
      	  
          alert("Clean Hide successfully! Remember Hotkeys: CTRL+Q"); 
 
      } 
  } 
document.addEventListener('keydown', keys, false); 
GM_registerMenuCommand  ('Clean Hide',
function(e){
CleanHideObj.on(0,1)
alert("Clean Hide successfully! Remember Hotkeys: CTRL+Q");
});
