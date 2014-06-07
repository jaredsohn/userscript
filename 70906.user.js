// ==UserScript==
// @name           blogTV Switcher
// @namespace      http://userscripts.org/users/101501
// @description    Adds a list to switch shows/chats.
// @include        http://www.blogtv.com/People/*
// ==/UserScript==

newDiv = document.createElement("div");

newTable = document.createElement("table");
newRow = document.createElement("tr");

newData = document.createElement("td");
cbox = document.createElement("input");
cbox.setAttribute("type","checkbox");
cbox.setAttribute("id","isVideoPrivate");
cbox.addEventListener("change",function(){
	document.location.assign('javascript:document.getElementById(AdDivName).innerHTML=document.getElementById(AdDivName).innerHTML.replace(/ps=./,"ps="+(document.getElementById("isVideoPrivate").checked?1:0));void(0);');
}, false);
newData.appendChild(cbox);
newRow.appendChild(newData);

newData = document.createElement("td");
select = document.createElement("select");
select.style.width="200px";
select.setAttribute("id","VideoSelect");

select.addEventListener("change",function(){
	for (i = 0; i < this.length; i++)
	{
		this[i].style.backgroundColor="#FFFFFF";
	};
	this[this.selectedIndex].style.backgroundColor="#FFFF00";
	if (this.selectedIndex > 0) 
	{
		if (GM_getValue("isVideoSelect","null")!=1)
		{
			GM_setValue("isVideoSelect",1);
			document.getElementById("VideoAndChatSelect").disabled=true;
			document.getElementById("LoadLiveBtn").disabled=true;
		};
		document.location.assign('javascript:if (typeof window.oVideoDiv=="undefined") {window.oVideoDiv=document.getElementById(AdDivName).innerHTML;window.oTitle=document.title};document.getElementById(AdDivName).innerHTML=\'<div style="position: relative; visibility: visible; border: 0px none; background-color: transparent; left: 0px; width: 468px; height: 0px; z-index: 5000; display: none;" id="adaptv_ad_player_div"></div><embed width="469" height="436" align="middle" src="http://www.blogtv.com/Flash/BTP_55.swf?4.2" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" scale="showall" wmode="transparent" devicefont="false" bgcolor="#FFFFCC" name="BlogTvPanel" menu="false" allowfullscreen="true" allowscriptaccess="always" allownetworking="all" salign="" flashvars="extAd=adaptv&amp;iniLocation=http://www.blogtv.com/en/FXml/&amp;liveEnc='+this[this.selectedIndex].value.split("|")[5]+'&amp;showTitle=&amp;ApplicationName=BlogTV&amp;ServerName='+this[this.selectedIndex].value.split("|")[2]+'&amp;EdgeServerName=edge.\'+_FMServerName+\'&amp;BroadCasterUserid='+this[this.selectedIndex].value.split("|")[0]+'&amp;UserId=\'+window._UserId+\'&amp;ProgId='+this[this.selectedIndex].value.split("|")[1]+'&amp;PlayerName='+this[this.selectedIndex].text.split(" ")[0]+'&amp;channelId='+this[this.selectedIndex].value.split("|")[3]+'&amp;programRate=&amp;videoad=&amp;linkad=&amp;chNameAd=&amp;chDescUrlAd=&amp;durationAd=0&amp;tagsAd=&amp;keyId=\'+window._keyId+\'&amp;ps='+(document.getElementById("isVideoPrivate").checked?1:0)+'&amp;ut=&amp;extAddress=&amp;extStream=&amp;ts=" type="application/x-shockwave-flash">\';document.title="'+this[this.selectedIndex].text.split(" ")[0]+' - '+this[this.selectedIndex].value.split("|")[4]+' - blogTV";void(0);');
	}
	else
	{
		if (GM_getValue("isVideoSelect","null")==1)
		{
			GM_deleteValue("isVideoSelect");
			if (GM_getValue("isChatSelect","null")!=1)
			{
				document.getElementById("VideoAndChatSelect").disabled=false;
				document.getElementById("LoadLiveBtn").disabled=false;
			}
		};
		document.location.assign('javascript:(' + function() {
			if (typeof window.oVideoDiv!="undefined")
			{
				if (window.oVideoDiv!="")
				{
					document.getElementById(AdDivName).innerHTML=window.oVideoDiv;
				}
				else if (window.oVideoDiv=="")
				{
					document.location.assign('javascript:VideoContainer.innerHTML=VideoContainerContents;void(0);');
				};
				delete window.oVideoDiv;
			};
			if (typeof window.oTitle!="undefined")
			{
				document.title=window.oTitle;
			}
		} + ')();');
	}
}, false);
newData.appendChild(select);
newRow.appendChild(newData);

newData = document.createElement("td");
input = document.createElement("input");
input.setAttribute("id","ChatVersion");
input.addEventListener("change",function(){
	document.location.assign('javascript:document.getElementById("FCAobject").innerHTML=document.getElementById("FCAobject").innerHTML.replace(/FCA_.*\.swf/,"FCA_'+document.getElementById("ChatVersion").value+'.swf");void(0);');
	document.location.assign('javascript:if (typeof window.oFCAobject!="undefined") {window.oFCAobject=window.oFCAobject.replace(/FCA_.*\.swf/,"FCA_'+document.getElementById("ChatVersion").value+'.swf")};void(0);');
},false);
newData.appendChild(input);
newRow.appendChild(newData);

newData = document.createElement("td");

select = document.createElement("select");
select.style.width="200px";
select.setAttribute("id","ChatSelect");

select.addEventListener("change",function(){
	for (i = 0; i < this.length; i++)
	{
		this[i].style.backgroundColor="#FFFFFF";
	};
	this[this.selectedIndex].style.backgroundColor="#FFFF00";
	if (this.selectedIndex > 0) 
	{
		if (GM_getValue("isChatSelect","null")!=1)
		{
			GM_setValue("isChatSelect",1);
			document.getElementById("VideoAndChatSelect").disabled=true;
			document.getElementById("LoadLiveBtn").disabled=true;
		};
		document.location.assign('javascript:if (typeof window.oFCAobject=="undefined") {window.oFCAobject=document.getElementById("FCAobject").innerHTML};document.getElementById("FCAobject").innerHTML=\'<embed type="application/x-shockwave-flash" src="http://www.blogtv.com/Flash/FCA_'+document.getElementById("ChatVersion").value+'.swf?4.6" id="FCA" name="FCA" bgcolor="#FFFFFF" quality="high" flashvars="iniLocation=http://www.blogtv.com/en/FXml/&amp;userEnc=\'+window._userNameEnc+\'&amp;userId=\'+window._UserId+\'&amp;showId='+this[this.selectedIndex].value.split("|")[1]+'&amp;keyEnc=\'+window._ChatKeyId+\'&amp;isEmbed=false&amp;age=16&amp;oUserId=" allowscriptaccess="always" height="406" width="507">\';void(0);');
	}
	else
	{
		if (GM_getValue("isChatSelect","null")==1)
		{
			GM_deleteValue("isChatSelect");
			if (GM_getValue("isVideoSelect","null")!=1)
			{
				document.getElementById("VideoAndChatSelect").disabled=false;
				document.getElementById("LoadLiveBtn").disabled=false;
			}
		};
		document.location.assign('javascript:(' + function() {
			if (typeof window.oFCAobject!="undefined")
			{
				if (window.oFCAobject!="")
				{
					document.getElementById("FCAobject").innerHTML=window.oFCAobject;
				}
				else if (window.oFCAobject=="")
				{
					document.location.assign('javascript:ChatContainer.innerHTML=ChatContainerContents;void(0);');
				};
				delete window.oFCAobject;
			};
		} + ')();');
	}
}, false);
newData.appendChild(select);
newRow.appendChild(newData);

newData = document.createElement("td");
select = document.createElement("select");
select.style.width="200px";
select.setAttribute("id","VideoAndChatSelect");

select.addEventListener("change",function(){
	for (i = 0; i < this.length; i++)
	{
		this[i].style.backgroundColor="#FFFFFF";
	};
	this[this.selectedIndex].style.backgroundColor="#FFFF00";
	if (this.selectedIndex > 0) 
	{
		document.getElementById("VideoSelect").disabled=true;
		document.getElementById("ChatSelect").disabled=true;
		document.getElementById("LoadLiveBtn").disabled=true;
		document.location.assign('javascript:if (typeof window.oVideoDiv=="undefined") {window.oVideoDiv=document.getElementById(AdDivName).innerHTML;window.oTitle=document.title};document.getElementById(AdDivName).innerHTML=\'<div style="position: relative; visibility: visible; border: 0px none; background-color: transparent; left: 0px; width: 468px; height: 0px; z-index: 5000; display: none;" id="adaptv_ad_player_div"></div><embed width="469" height="436" align="middle" src="http://www.blogtv.com/Flash/BTP_55.swf?4.2" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" scale="showall" wmode="transparent" devicefont="false" bgcolor="#FFFFCC" name="BlogTvPanel" menu="false" allowfullscreen="true" allowscriptaccess="always" allownetworking="all" salign="" flashvars="extAd=adaptv&amp;iniLocation=http://www.blogtv.com/en/FXml/&amp;liveEnc='+this[this.selectedIndex].value.split("|")[5]+'&amp;showTitle='+this[this.selectedIndex].value.split("|")[4]+'&amp;ApplicationName=BlogTV&amp;ServerName='+this[this.selectedIndex].value.split("|")[2]+'&amp;EdgeServerName=edge.\'+_FMServerName+\'&amp;BroadCasterUserid='+this[this.selectedIndex].value.split("|")[0]+'&amp;UserId=\'+window._UserId+\'&amp;ProgId='+this[this.selectedIndex].value.split("|")[1]+'&amp;PlayerName='+this[this.selectedIndex].text.split(" ")[0]+'&amp;channelId='+this[this.selectedIndex].value.split("|")[3]+'&amp;programRate=&amp;videoad=&amp;linkad=&amp;chNameAd=&amp;chDescUrlAd=&amp;durationAd=0&amp;tagsAd=&amp;keyId=\'+window._keyId+\'&amp;ps='+(document.getElementById("isVideoPrivate").checked?1:0)+'&amp;ut=&amp;extAddress=&amp;extStream=&amp;ts=" type="application/x-shockwave-flash">\';document.title="'+this[this.selectedIndex].text.split(" ")[0]+' - '+this[this.selectedIndex].value.split("|")[4]+' - blogTV";void(0);');
		document.location.assign('javascript:if (typeof window.oFCAobject=="undefined") {window.oFCAobject=document.getElementById("FCAobject").innerHTML};document.getElementById("FCAobject").innerHTML=\'<embed type="application/x-shockwave-flash" src="http://www.blogtv.com/Flash/FCA_'+document.getElementById("ChatVersion").value+'.swf?4.6" id="FCA" name="FCA" bgcolor="#FFFFFF" quality="high" flashvars="iniLocation=http://www.blogtv.com/en/FXml/&amp;userEnc=\'+window._userNameEnc+\'&amp;userId=\'+window._UserId+\'&amp;showId='+this[this.selectedIndex].value.split("|")[1]+'&amp;keyEnc=\'+window._ChatKeyId+\'&amp;isEmbed=false&amp;age=16&amp;oUserId=" allowscriptaccess="always" height="406" width="507">\';void(0);');
	}
	else
	{
		document.getElementById("VideoSelect").disabled=false;
		document.getElementById("ChatSelect").disabled=false;
		document.getElementById("LoadLiveBtn").disabled=false;
		document.location.assign('javascript:(' + function() {
			if (typeof window.oVideoDiv!="undefined")
			{
				if (window.oVideoDiv!="")
				{
					document.getElementById(AdDivName).innerHTML=window.oVideoDiv;
				}
				else if (window.oVideoDiv=="")
				{
					document.location.assign('javascript:VideoContainer.innerHTML=VideoContainerContents;void(0);');
				};
				delete window.oVideoDiv;
			};
			if (typeof window.oTitle!="undefined")
			{
				document.title=window.oTitle;
			}
		} + ')();');
		document.location.assign('javascript:(' + function() {
			if (typeof window.oFCAobject!="undefined")
			{
				if (window.oFCAobject!="")
				{
					document.getElementById("FCAobject").innerHTML=window.oFCAobject;
				}
				else if (window.oFCAobject=="")
				{
					document.location.assign('javascript:ChatContainer.innerHTML=ChatContainerContents;void(0);');
				};
				delete window.oFCAobject;
			};
		} + ')();');
	}
}, false);
newData.appendChild(select);
newRow.appendChild(newData);

newData = document.createElement("td");
btn = document.createElement("button");
btn.setAttribute("id","LoadLiveBtn");
btntxt = document.createTextNode("Load Live");
btn.appendChild(btntxt);
btn.addEventListener("click", function() {
	document.getElementById("VideoSelect").innerHTML = "";
	document.getElementById("ChatSelect").innerHTML = "";
	document.getElementById("VideoAndChatSelect").innerHTML = "";
	
	options = document.createElement("option");
	optionstxt = document.createTextNode("");
	options.appendChild(optionstxt);
	options.setAttribute("value","|");
	document.getElementById("VideoSelect").appendChild(options);
	options = document.createElement("option");
	optionstxt = document.createTextNode("");
	options.appendChild(optionstxt);
	options.setAttribute("value","|");
	document.getElementById("ChatSelect").appendChild(options);
	options = document.createElement("option");
	optionstxt = document.createTextNode("");
	options.appendChild(optionstxt);
	options.setAttribute("value","|");
	document.getElementById("VideoAndChatSelect").appendChild(options);

	if (document.getElementById("uname")==null)
	{
		hidden = document.createElement("input");
		hidden.setAttribute("id","uname");
		hidden.setAttribute("type","hidden");
		document.body.appendChild(hidden);

		document.location.assign("javascript:("+function () {
			document.getElementById("uname").value=window.CookieUserName;
		}+")();void(0);");
	};
	
	setTimeout(function(){
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.blogtv.com/"+document.getElementById("uname").value+"/Friends/All/0/0/0/",
			onerror: function(r) {
				alert("error getting friend count");
			},
			onload: function(e) {
				document.getElementById("LoadLiveBtn").innerHTML = "Loading...";
				//document.getElementById("LoadLiveBtn").disabled = true;
				if (e.readyState==4) {
					numFriends = e.responseText.match(/<td id='TotalamountOfItemssearch' class='.*'>([0-9]*)<\/td>/)[1];
					numPages = numFriends/21;
					friendsList = "";
					for (i = 0; i < numPages; i++)
					GM_xmlhttpRequest({
						method: "GET",
						url: "http://www.blogtv.com/"+document.getElementById("uname").value+"/Friends/All/"+i+"/0/0/",
						onerror: function(r) {
							alert("error getting friends");
						},
						onload: function(r) {
							if (r.readyState==4) {
								document.getElementById("LoadLiveBtn").innerHTML = "Getting friends...";
								m = r.responseText.match(/\/People\/([A-Za-z0-9_-]*)'.*title='\1'/g);
								if (m != null)
								{
									for (x = 0; x < m.length; x++)
									{
										friendsList += m[x].replace(/\/People\/([A-Za-z0-9_-]*).*title='\1'/,"$1") + "|";
									}
								}
								document.getElementById("LoadLiveBtn").innerHTML = "Getting friends...("+friendsList.slice(0,-1).split("|").length+"/"+numFriends+")";
								if (friendsList.slice(0,-1).split("|").length==numFriends)
								{
									GM_xmlhttpRequest({
										method: "GET",
										url: "http://www.blogtv.com/Xml/AllLiveShows_en.xml?"+(new Date).getTime(),
										onerror: function(r) {
											alert("error getting live");
										},
										onload: function(e) {
											if (e.readyState==4) {
												document.getElementById("LoadLiveBtn").innerHTML = "Getting live shows...";
												if (!e.responseXML) {
												  e.responseXML = new DOMParser()
													.parseFromString(e.responseText, "text/xml");
												}
												var liveFriends = new Array();
												c = 0;
												for (i = 0; i < e.responseXML.childNodes[0].childNodes.length; i++)
												{
													u = e.responseXML.childNodes[0].childNodes[i].getAttribute("username");
													if (friendsList.search(u)>=0)
													{
														uid = e.responseXML.childNodes[0].childNodes[i].getAttribute("userid");
														pid = e.responseXML.childNodes[0].childNodes[i].getAttribute("programid");
														svr = e.responseXML.childNodes[0].childNodes[i].getAttribute("server");
														cid = e.responseXML.childNodes[0].childNodes[i].getAttribute("programTypeId");
														nam = e.responseXML.childNodes[0].childNodes[i].getAttribute("programname");
														enc = e.responseXML.childNodes[0].childNodes[i].getAttribute("Live");
														liveFriends[c] = {text:u+" + ",value:uid+"|"+pid+"|"+svr+"|"+cid+"|"+nam+"|"+enc};
														c++;
													}
												};
												liveFriends.sort(function(x,y){
													var a=x.text.toLowerCase();
													var b=y.text.toLowerCase();
													if (a>b) return 1;
													if (a<b) return -1;
													return 0;
												});
												var liveBroadcasters = new Array();
												c = 0;
												for (i = 0; i < e.responseXML.childNodes[0].childNodes.length; i++)
												{
													u = e.responseXML.childNodes[0].childNodes[i].getAttribute("username");
													if (friendsList.search(u)==-1)
													{
														uid = e.responseXML.childNodes[0].childNodes[i].getAttribute("userid");
														pid = e.responseXML.childNodes[0].childNodes[i].getAttribute("programid");
														svr = e.responseXML.childNodes[0].childNodes[i].getAttribute("server");
														cid = e.responseXML.childNodes[0].childNodes[i].getAttribute("programTypeId");
														nam = e.responseXML.childNodes[0].childNodes[i].getAttribute("programname");
														enc = e.responseXML.childNodes[0].childNodes[i].getAttribute("Live");
														liveBroadcasters[c] = {text:u,value:uid+"|"+pid+"|"+svr+"|"+cid+"|"+nam+"|"+enc};
														c++;
													}
												};
												liveBroadcasters.sort(function(x,y){
													var a=x.text.toLowerCase();
													var b=y.text.toLowerCase();
													if (a>b) return 1;
													if (a<b) return -1;
													return 0;
												});
												var allLive = new Array();
												c = 0;
												for (i = 0; i < liveFriends.length; i++)
												{
													allLive[c] = liveFriends[i];
													c++;
												}
												for (i = 0; i < liveBroadcasters.length; i++)
												{
													allLive[c] = liveBroadcasters[i];
													c++;
												}
												
												for (i = 0; i < allLive.length; i++)
												{
													options = document.createElement("option");
													optionstxt = document.createTextNode(allLive[i].text+" ("+(i+1)+")");
													options.appendChild(optionstxt);
													options.setAttribute("value",allLive[i].value);
													document.getElementById("VideoSelect").appendChild(options);
													options = document.createElement("option");
													optionstxt = document.createTextNode(allLive[i].text+" ("+(i+1)+")");
													options.appendChild(optionstxt);
													options.setAttribute("value",allLive[i].value);
													document.getElementById("ChatSelect").appendChild(options);
													options = document.createElement("option");
													optionstxt = document.createTextNode(allLive[i].text+" ("+(i+1)+")");
													options.appendChild(optionstxt);
													options.setAttribute("value",allLive[i].value);
													document.getElementById("VideoAndChatSelect").appendChild(options);
												};
												
												//document.getElementById("LoadLiveBtn").disabled = false;
												document.getElementById("LoadLiveBtn").innerHTML = "Load Live";
											}
										}
									});
									
								};
							}
						}
					});
					setTimeout(function(){
					document.body.removeChild(document.body.lastChild);
					},0);
				}
			}
		});
	},0);
}, false);
newData.appendChild(btn);
newRow.appendChild(newData);
newTable.appendChild(newRow);
newDiv.appendChild(newTable);

if (document.getElementById("MoreLiveshowsDiv")!=null)
{
	document.getElementById("MoreLiveshowsDiv").parentNode.insertBefore(newDiv,document.getElementById("MoreLiveshowsDiv").nextSibling.nextSibling.nextSibling);
	document.location.assign('javascript:document.getElementById("ChatVersion").setAttribute("value",window._fcaPlayerName.match(/FCA_(.*)/)[1]);void(0);');
}

newDiv="";
newTable="";
newRow="";
newData="";
btn="";
btntxt="";
