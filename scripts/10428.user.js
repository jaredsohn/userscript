// ==UserScript==
// @name           iGoogle Change Layout
// @namespace      Google
// @description    Change IGoogle layout
// @include        http://www.google.*/ig*
// ==/UserScript==

GM_log("Changing IGoogle layout");

var imgsrc=new Array();
imgsrc[0]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAIAAACkSXkKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAElJREFUSEtjYKAi+E8xgDoGaA6ms8gRhOg5gASAXFIFQU4hVQ9WK0cNAgUL/tAcDaPRMBrNtHgLnMGcRdCKbTLLbArrESpWaQwAuel/rlGT5+AAAAAASUVORK5CYII=";
imgsrc[1]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAIAAACkSXkKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAGBJREFUSEtjYKAi+E8xgDoGaA6ms7AKYnU9QiWEdQAJALmYgsgK4Gy4SpAdowaNhtFwTkdo+YjMvEZh/seX+4kvpvDlfqyJmJyUPWoQMASwlJDERxPOFEdhIiI+6RLlVgBpYaGJYQDFRQAAAABJRU5ErkJggg==";
imgsrc[2]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAIAAACkSXkKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAFtJREFUSEtjYKAi+E8xgDoGaA4eZ0Fswa8AxaAD2ABQBdwgPApGDYIG9mgYMQzjdIQrN5GW1yjM/0TlfoLlFaJsgLCwxhpBQUjxQDj3jxpEg1ijTjoimFKIUQAANbevoueE4RwAAAAASUVORK5CYII=";

var tabMenu=null;
var __activeTab=0;
for (var num1=0;num1<10;num1++)
{
	tabMenu=document.getElementById("DD_tab_"+num1);
	if (tabMenu!=null) {__activeTab=num1; break;}
}
unsafeWindow.__activeTab=__activeTab;

if (tabMenu!=null)
{
	for(var num1=0;num1<imgsrc.length;num1++)
	{
		//old version
		//var item=document.createElement("DIV");
		//item.className="dd_item";
		//item.setAttribute("onclick","changeLayout("+num1+");");
		//item.innerHTML="<a href=\"javascript:void(0);\"><img src="+imgsrc[num1]+"></a>"; 
		//tabMenu.appendChild(item);

		var item=document.createElement("A");
		item.className="dd_item";
		item.href="javascript:void(0);";
		item.setAttribute("onblur","IG_DD_restoreFocus=false; return true;");
		item.setAttribute("onmouseover","return _IG_DD_select(this);");
		item.setAttribute("onclick","changeLayout("+num1+"); _IG_DD_hide(); return false;");
		item.innerHTML="<img src="+imgsrc[num1]+">";
		tabMenu.appendChild(item);
	}
}

changeLayout(GM_getValue(__activeTab));
unsafeWindow.changeLayout=changeLayout;

function changeLayout(layoutType)
{
	if (layoutType==null) layoutType=0;
	
	var style1="";
	var style2="";
	var style3="";

	//0.7.20080121.0 compatibility: http://wiki.greasespot.net/0.7.20080121.0_compatibility
	//GM_setValue(__activeTab,layoutType);
	window.setTimeout(GM_setValue, 0, __activeTab, layoutType);
	
	
	switch(layoutType)
	{
		case 0:
			style1="float:left;width:32%;padding:0% 1% 0% 0%;";
			style2="float:left;width:32%;padding:0% 1% 0% 1%;";
			style3="float:left;width:32%;padding:0% 0% 0% 1%;";
			break;
		case 1:
			style1="float:left;width:32%;padding:0% 1% 0% 0%;";
			style2="float:left;width:66%;padding:0% 0% 0% 1%;";
			style3="float:left;width:100%;";
			break;
		case 2:
			style1="float:left;width:49%;padding:0% 1% 0% 0%;";
			style2="float:left;width:49%;padding:0% 0% 0% 1%;";
			style3="float:left;width:100%;";
			break;
	}
	
	var zone1=document.getElementById("c_1");
	var zone2=document.getElementById("c_2");
	var zone3=document.getElementById("c_3");
	
	if (zone1!=null)
	{
		zone1.className="";
		zone1.setAttribute("style",style1);
	}
	
	if (zone2!=null)
	{
		zone2.className="";
		zone2.setAttribute("style",style2);
	}
	
	if (zone3!=null)
	{
		zone3.className="";
		zone3.setAttribute("style",style3);
	}
}