// ==UserScript==
// @name           Block Meta Refresh
// @namespace     http://userscripts.org/users/28612
//@version           0.01.02
// @description    Block the meta refresh and adds on top of the page a div with a direct link, a count down before redirection and a close / cancel link
// @include        *
// ==/UserScript==

if (document.location.search.indexOf("BlockMetaRefresh=AllowRefresh")==-1) blockMetaRefresh();

function blockMetaRefresh()
{
	var metas=document.evaluate("//meta[translate(@http-equiv,'REFSH','refsh')='refresh']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var num1=0;num1<metas.snapshotLength;num1++)
	{
		var meta1=metas.snapshotItem(num1);
		if (meta1.getAttribute("content").match(/^(\d+)(?:;url='?(.+?)'?)?$/gmi))
		{
			window.addEventListener("load",function(){window.stop();},false);
			
			document.redirectUrl=RegExp.$2;
			var num1=parseInt(RegExp.$1);
			if (num1<1000) num1=num1*1000;
			if (num1<15000) num1=15000;
			document.timeleft=new Date().getTime()+num1;
			
			var head1=document.getElementsByTagName("head")[0];
			head1.appendChild(createElement("SCRIPT","function removeElement(element){element=typeof(element)==\"object\"?element:document.getElementById(element); if (element) element.parentNode.removeChild(element);}"));
			head1.appendChild(createElement("STYLE",".BlockMetaRefresh{background-color: #ffff99; font-size:12px; color: black; text-align: left;}"));
			
			var div1=createElement("DIV",null,{id:"MetaRefreshRedirection",class:"BlockMetaRefresh"});
			document.body.insertBefore(div1,document.body.firstChild);

			div1.appendChild(createElement("A","[Close/Cancel]",{class:"BlockMetaRefresh",style:"float:right",href:"javascript:void(0);",onclick:"removeElement('MetaRefreshRedirection');"}));
			
			var text1="";
			var text2="";
			var text3="";
			if (document.redirectUrl=="")
			{
				text1="Page will refresh in ";
				text2=document.location.href+(document.location.search?"&":"?")+"BlockMetaRefresh=AllowRefresh";
				text3="[Allow always to refresh]";
			}
			else
			{
				text1="Page will redirect in ";
				text2=document.redirectUrl;
				text3="["+(text2.length>100?text2.substring(0,97)+"...":text2)+"]";
			}
			
			div1.appendChild(createElement("A",text3,{class:"BlockMetaRefresh",style:"float:right",href:text2,title:text2,onclick:"removeElement('MetaRefreshRedirection');"}));
			
			div1.appendChild(createElement("B","Block Meta Refresh: "));
			div1.appendChild(document.createTextNode(text1));
			
			div1.appendChild(createElement("SPAN",formatMillisec(num1),{id:"CountDown"}));
			
			document.intervalId=window.setInterval(countDown,100);
			document.addEventListener("unload",stopCountDown,false);
			
			break;
		}
	}
}

function createElement(tagName,textContent,attributes)
{
	var element1=document.createElement(tagName);
	element1.textContent=textContent;
	for(var name1 in attributes) element1.setAttribute(name1,attributes[name1]);
	return element1;
}

function countDown()
{
	var span1=document.getElementById("CountDown");
	if (span1==null) {stopCountDown(); return;}
	var num1=document.timeleft-(new Date().getTime());
	if (num1<0) num1=0;
	span1.textContent=formatMillisec(num1);
	if (num1==0)
	{
		stopCountDown();
		if (document.redirectUrl) document.location.replace(document.redirectUrl);
		else document.location.reload(true);
	}
}

function stopCountDown(){window.clearInterval(document.intervalId);}

function formatMillisec(millisec)
{
	//var text1=(Math.round(millisec/100)/10).toString();
	//if (text1.indexOf(".")==-1) text1+=".0";
	var text1=Math.floor(millisec/1000).toString();
	return text1+" sec";
}