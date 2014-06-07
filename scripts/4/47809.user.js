// ==UserScript==
// @name           YouTube Lyrics+
// @namespace      http://userscripts.org/scripts/show/47809
// @version        3.1
// @changes        Added a parsing errors sending system,Added a feedback sending system,Changed lyrics parsing system,Support for different lyrics page layout,Added a menu option to show the lyrics panel
// @description    Adds a lyrics box to the YouTube sidebar under the video informations box. It can search in twelve different lyrics sites and it shows also all the results in a drop down.
// @include        http://*youtube.com/watch?*
// @require        http://userscripts.org/scripts/version/33024/65779.user.js

// @resource       Library1Resources http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_5_0/Library1.xml
// @resource       Library1Resources_de http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_5_0//Library1_de.xml
// @resource       Library1Resources_es http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_5_0/Library1_es.xml
// @resource       Library1Resources_fr http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_5_0/Library1_fr.xml
// @resource       Library1Resources_it http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_5_0/Library1_it.xml
// @resource       YoutubeLyricsResources http://www.fileden.com/files/2008/9/2/2077873/YoutubeLyrics/3_3_0/YoutubeLyrics.xml
// @resource       YoutubeLyricsResources_de http://www.fileden.com/files/2008/9/2/2077873/YoutubeLyrics/3_3_0/YoutubeLyrics_de.xml
// @resource       YoutubeLyricsResources_es http://www.fileden.com/files/2008/9/2/2077873/YoutubeLyrics/3_3_0/YoutubeLyrics_es.xml
// @resource       YoutubeLyricsResources_fr http://www.fileden.com/files/2008/9/2/2077873/YoutubeLyrics/3_3_0/YoutubeLyrics_fr.xml
// @resource       YoutubeLyricsResources_it http://www.fileden.com/files/2008/9/2/2077873/YoutubeLyrics/3_3_0/YoutubeLyrics_it.xml
// @resource       LyricsSitesDefinitions  http://userscripts.org/scripts/source/34831.user.js
// ==/UserScript==

var ScriptInfos={
	id: 22569,
	name: "Youtube Lyrics+",
	version: new Version("3.1"),
	language: "en",
	idPrefix: "YL",
}

var CM=null
var RM=null;
var SU=null;
var DU=null;
init();

function init()
{
	CM=new ConfigurationManager();
	RM=new ResoucesManager();
	SU=new Updater(22569,"Youtube Lyrics","updater","//div[@id='YLLyricsPanel']");
	DU=new Updater(34831,"Definitions","definitions","//div[@id='YLLyricsPanel']",installDefinitions);
	
	if (ScriptInfos.version.compareTo(CM.config.updater.version)==1) updateOptions();
	ScriptInfos.language=CM.config.language;
	
	ScriptInfos.requestsCounter=0;

	$rmc("MenuOptions",[ScriptInfos.name],showOptionsPanel);
	
	var text1=getVideoCategory();
	if (CM.config.showOnCategory==text1 || ($isa(CM.config.showOnCategory) && CM.config.showOnCategory.contains(text1)))
	{
		var flag1=false;
		try{addLyricsPanel();}
		catch(ex)
		{
			flag1=true;
			GM_log(ex.message);
		}
		SU.checkForNewVersion(flag1);
		if (!flag1) DU.checkForNewVersion(false,DU.config.autoInstall?installDefinitions:null);
	}
	else
	{
		$rmc("MenuShow",[ScriptInfos.name],addLyricsPanel);
	}
}

function updateOptions()
{
	var obj1={
		language:"en",
		showSendFeedbackConfirm:"on",
		updater:{
			lastCheckDate:new Date(),
			checkFrequency:1},
		showOnCategory:"10",
		showAlertOnSavePreferred:"on",
		showSearchTextBox:"on",
		showResultsDropDown:"on",
		showLinkOriginalPage:"on",
		showLinkSearchYoutube:"on",
		showLinkSendParsingError:"on",
		showSendParsingErrorConfirm:"on",
		preferredSite:"",
		activeSites:[],
		definitions:{
			autoInstall:"on",
			lastCheckDate:new Date(),
			checkFrequency:1},
		lyricsSitesDefinitions:[]
		};
	$mo(obj1,CM.config);
	obj1.updater.version=ScriptInfos.version;
	var text1=GM_getResourceText("LyricsSitesDefinitions");
	obj1.definitions.version=new Version(/version.*?((?:\.|\d)+)/gm.exec(text1)[1]);
	mergeLyricsSitesDefinitions(obj1,$t2o(text1));
	setOptions(obj1);
}

function mergeLyricsSitesDefinitions(config,obj1)
{
	var array1=new Array();
	var obj2=config.lyricsSitesDefinitions;
	for(var num1=0;num1<obj1.length;num1++)
	{
		var flag1=false;
		var obj3=obj1[num1];
		var num3=obj3.id;
		for(var num2=0;num2<obj2.length;num2++) 
		{
			if (obj2[num2].id==num3) 
			{
				flag1=true;
				obj2[num2]=obj3;
				break;
			}
		}
		if (!flag1) 
		{
			config.activeSites.push(num2.toString());
			obj2.push(obj3);
		}
	}
}

function setOptions(options)
{
	if (options) CM.config=options;
	CM.save();
}

function savePreferredSite()
{
	var select1=$idp("LyricsSites");
	var option1=select1.options[select1.selectedIndex];
	CM.config.preferredSite=option1.value;
	if (CM.config.showAlertOnSavePreferred) alert(RM.getText("SavedPreferredSite",option1.textContent));
	setOptions();
}

function overwriteDefinitions()
{
	if (confirm(RM.getText("ReinstallLyricsSitesDefinitionConfirm")))
	{
		DU.overwriteDefinitions=true;
		if (confirm(RM.getText("ReinstallLyricsSitesDefinitionChooseDialog"))) installDefinitionsDialog(true);
		else installDefinitionsCallback(DU,{responseText:GM_getResourceText("LyricsSitesDefinitions")});
	}
}

function installDefinitionsDialog(overwrite)
{
	DU.overwriteDefinitions=overwrite;
	DU.checkForNewVersion(true,$chf(DU,DU.newVersionDialog));
}

function installDefinitions(updater,response)
{
	if (updater.newVersionAvailable)
	{
		var version1=new RegExp("YoutubeLyrics.*?((?:\\.|\\d)+)","gmi").test(response.responseText)?new Version(RegExp.$1):null;
		if (version1 && version1.compareTo(ScriptInfos.version)!=-1)
		{
			var text1=RM.getText("NewLyricsSitesDefinitionNotSupported",[ScriptInfos.name,ScriptInfos.version,version1]);
			if (ScriptInfos.optionsPanelVisible) alert(text1);
			else createInfoMessage("NewVersionRequired",text1,null,"//div[@id='YLLyricsPanel']");
		}
		else sendGetRequest(updater.installUrl,$chf(this,installDefinitionsCallback,[updater]));
	}
}

function installDefinitionsCallback(updater,response)
{
	if (new RegExp("version.*?((?:\\.|\\d)+)","gmi").test(response.responseText)) updater.config.version=new Version(RegExp.$1);
	if (updater.overwriteDefinitions) CM.config.lyricsSitesDefinitions=new Array();
	mergeLyricsSitesDefinitions(CM.config,$t2o(response.responseText));
	setOptions();
	updater.hideNewVersionHTML(false);
	var text1=RM.getText("LyricsSitesDefinitionsInstalled",[updater.config.version]);
	if (ScriptInfos.optionsPanelVisible) 
	{
		alert(text1);
		showOptionsPanel(true);
	}
	else createInfoMessage("NewVersionInstalled",text1,null,"//div[@id='YLLyricsPanel']");
}

function sendLyricsRequest(url,handler,encoding)
{
	ScriptInfos.requestsCounter++;
	var callback=function(requestsCounter,handler){var num1=requestsCounter; return function(response){if (num1==ScriptInfos.requestsCounter) handler(response);};}(ScriptInfos.requestsCounter,handler);
	sendGetRequest(url,callback,encoding);
}

function getVideoCategory()
{
	var node1=$x1("//a[contains(@href,'browse?s=mp&t=t&c=')]");
	return node1?node1.href.match(/&c=(\d+)/i)[1]:null;
}

function addLyricsPanel(reset)
{
	var div1=$idp("LyricsPanel");
	if (div1 && reset) {div1.parentNode.removeChild(div1); div1=null;}
	if (div1==null)
	{
		addHiddenStyle();
		if (!isStyleAdded("LyricsPanelStyle")) addStyle("LyricsPanelStyle",null,[ScriptInfos.idPrefix,RM.getText("LoadingImageSrc")]);
		
		var array1=RM.getObject("LyricsPanelTexts");
		array1[0]=ScriptInfos.idPrefix;
		array1[2]=RM.getText("SaveImageSrc");
		array1[3]=RM.getText("SaveImageWidth");
		array1[4]=RM.getText("SaveImageHeight");
		array1[5]=array1[5].format(ScriptInfos.name,ScriptInfos.version);
		div1=stringToHTML(RM.getText("LyricsPanelHTML",array1));
		
		var div2=$id("more-from-panel") || $id("watch-channel-videos-panel");
		div2.parentNode.insertBefore(div1,div2);
		
		var select1=$idp("LyricsSites");
		select1.options.length=0;
		for(var num1=0;num1<CM.config.lyricsSitesDefinitions.length;num1++)
		{
			var obj1=CM.config.lyricsSitesDefinitions[num1];
			if (obj1.enabled && CM.config.activeSites.indexOf(obj1.id.toString())!=-1)
			{
				var text1=obj1.name;
				var option1=$ce("option",text1,{value:obj1.id});
				option1.selected=obj1.id==CM.config.preferredSite;
				select1.appendChild(option1);
			}
		}

		select1.addEventListener("change",function(e){searchForLyrics();},false);
		$idp("PanelSwitch").addEventListener("click",function(e){if (!e.target.onlyOnce) {e.target.onlyOnce=true; searchForLyrics();}},false);
		$idp("SavePreferredSite").addEventListener("click",savePreferredSite,false);
		$idp("SearchText").addEventListener("keypress",function(e){if (e.which==13){searchForLyrics(e.target.value); return false;}},false);
		$idp("ResultsList").addEventListener("change",function(e){loadLyricsPage(e.target.selectedIndex);},false);
		$idp("SendParsingError").addEventListener("click",function(e){sendParsingError(ScriptInfos.lyricsLinks[ScriptInfos.lyricsLinksIndex][0]);},false);
	}
	return div1;
}

function setLyricsDivContent(html,showLoadingIcon,showLyricsTextBox,showResultsDropDown,showLinkToOriginalPage,showLinkToSearchYoutube,showLinkToSendParsingError)
{
	with($idp("SearchText"))
	{
		className=showLyricsTextBox?"":"hidden";
		value=ScriptInfos.words;
	}
	
	var select1=$idp("ResultsList");
	select1.className=showResultsDropDown?"":"hidden";
	select1.options.length=0;
	if (ScriptInfos.lyricsLinks)
	{
		for(var num1=0;num1<ScriptInfos.lyricsLinks.length;num1++) 
		{
			var option1=new Option(decodeHTML(ScriptInfos.lyricsLinks[num1][1]));
			if (ScriptInfos.lyricsLinksIndex==num1) option1.selected=true;
			select1.options[num1]=option1;
		}
	}
	
	var text1="";
	var text2="";
	if (ScriptInfos.lyricsLinks && ScriptInfos.lyricsLinksIndex!=null)
	{
		var obj1=ScriptInfos.lyricsLinks[ScriptInfos.lyricsLinksIndex];
		text1=obj1[0];
		text2="http://{0}/results?search_query={1}".format(document.location.host,encodeURIComponent(obj1[1].replace(/-/gmi,"").replace(/lyrics/gmi,"").replace(/  /," ")).replace(/%20/gmi,"+"));
	}
	
	var link1=$idp("OriginalPage");
	link1[showLinkToOriginalPage?"setAttribute":"removeAttribute"]("href",text1);
	link1.className=showLinkToOriginalPage?"":"hidden";
	
	var link2=$idp("SearchYoutube");
	link2[showLinkToSearchYoutube?"setAttribute":"removeAttribute"]("href",text2);
	link2.className=showLinkToSearchYoutube?"":"hidden";
	
	var link3=$idp("SendParsingError");
	link3.className=showLinkToSendParsingError?"":"hidden";
	
	var text3="{0}Loading".format(ScriptInfos.idPrefix)
	var div1=$idp("LyricsContentDiv");
	var array1=div1.className.split(" ");
	if (!showLoadingIcon) array1.remove(text3);
	else if (array1.indexOf(text3)==-1) array1.push(text3);
	div1.className=array1.join(" ");
	
	$idp("Lyrics").innerHTML=html;
}

function initLyricsSiteDefinition(id)
{
	ScriptInfos.lyricsSiteId=id;
	var array1=CM.config.lyricsSitesDefinitions;
	for(var num1=0;num1<array1.length;num1++) if (array1[num1].id==id) {ScriptInfos.lyricsSite=$co(array1[num1]); break;}
	ScriptInfos.lyricsSite.parseListRegexp=new RegExp(ScriptInfos.lyricsSite.parseListRegexp,"gmi");
	var array2=ScriptInfos.lyricsSite.parseLyrics;
	for(var num2=0;num2<array2.length;num2++)
	{
		array2[num2].parseTitleRegexp=new RegExp(array2[num2].parseTitleRegexp,"gmi");
		array2[num2].parseLyricsRegexp=new RegExp(array2[num2].parseLyricsRegexp,"gmi");
	}
}

function searchForLyrics(words)
{	
	ScriptInfos.lyricsLinks=null;
	ScriptInfos.lyricsLinksIndex=null;
	
	var select1=$idp("LyricsSites");
	initLyricsSiteDefinition(parseInt(select1.options[select1.selectedIndex].value));

	if (words) ScriptInfos.words=words;
	if (ScriptInfos.words==null) ScriptInfos.words=document.title.replace(/youtube/gmi,"").replace(/-/gmi," ").replace(/"/gmi," ").replace(/video/gmi," ").replace(/ +/gmi," ").replace(/^\s+/gmi,"").replace(/\s+$/gmi,"");

	var text1=ScriptInfos.lyricsSite.name=="get-lyrics.net"?"-":"+";
	var text2=encodeURIComponent(ScriptInfos.words).replace(/%20/gmi,text1);
	var text3=ScriptInfos.lyricsSite.searchUrl.format(text2);
	
	setLyricsDivContent(RM.getText("Searching",[ScriptInfos.lyricsSite.name,ScriptInfos.words]),true,CM.config.showSearchTextBox);
	sendLyricsRequest(text3,parseSearchResponse,ScriptInfos.lyricsSite.searchEncoding);
}

function parseSearchResponse(response)
{
	var text1="";
	var text2="";
	ScriptInfos.lyricsLinks=new Array();

	//debugRegexp(ScriptInfos.lyricsSite.parseListRegexp,response.responseText);

	ScriptInfos.lyricsSite.parseListRegexp.lastIndex=0;
	var match1=ScriptInfos.lyricsSite.parseListRegexp.exec(response.responseText);
	while(match1)
	{
		//GM_log(match1[1]+" "+match1[2]);
		ScriptInfos.lyricsLinks.push([ScriptInfos.lyricsSite.lyricsUrl+decodeHTML(match1[1]),match1[2].replace(/<\/?(b|em)>/gmi,"")]);
		match1=ScriptInfos.lyricsSite.parseListRegexp.exec(response.responseText);
	}
	
	if (ScriptInfos.lyricsLinks.length!=0) loadLyricsPage(0);
	else setLyricsDivContent(RM.getText("FoundNothing",ScriptInfos.lyricsSite.name),false,CM.config.showSearchTextBox);
}

function loadLyricsPage(index)
{
	ScriptInfos.lyricsLinksIndex=index;
	setLyricsDivContent(RM.getText("Loading",[ScriptInfos.lyricsSite.name,ScriptInfos.lyricsLinks[index][1]]),true,CM.config.showSearchTextBox,CM.config.showResultsDropDown,CM.config.showLinkOriginalPage,CM.config.showLinkSearchYoutube);
	sendLyricsRequest(ScriptInfos.lyricsLinks[index][0],parseLyricsPage,ScriptInfos.lyricsSite.lyricsEncoding);
}

function parseLyricsPage(response)
{	
	var text1="";
	var flag1=false;
	
	if (response.status!=200) 
	{ 
		flag1=true;
		text1=RM.getText("LyricsParsingErrorHTML",[response.statusText,""]);
	}
	else
	{
		//GM_log(response.responseText);
		var array1=ScriptInfos.lyricsSite.parseLyrics;
		for(var num1=0;num1<array1.length;num1++)
		{
			array1[num1].parseTitleRegexp.lastIndex=0;
			array1[num1].parseLyricsRegexp.lastIndex=0;
			
			//debugRegexp(array1[num2].parseTitleRegexp,response.responseText);
			//debugRegexp(array1[num2].parseLyricsRegexp,response.responseText);
			
			var match1=array1[num1].parseTitleRegexp.exec(response.responseText);
			var match2=array1[num1].parseLyricsRegexp.exec(response.responseText);

			if (match1 && match2) 
			{
				if (match1.length!=1) match1.shift();
				if (match2.length!=1) match2.shift();
				
				var text2=match1.join(" ");
				var text3=match2.join(" ");
				
				text2=text2.replace(/<br ?\/?>/gmi,"");
				if (response.responseText.match(/<pre>/gmi)) text3=text3.replace(/\n/gmi,"<br/>").replace(/\r/gmi,"");
				text3=text3.replace(/<br ?\/?>/gmi,"<br/>").replace(/<br\/>(?:\s*<br\/>)+/gmi,"<br/>").replace(/^\s*(?:<br\/>\s*)+/gi,"");
				
				text1=RM.getText("LyricsParsingSuccessHTML",[ScriptInfos.idPrefix,text2,text3]);
				
				break;
			}
		}

		if (!text1)
		{
			flag1=true;
			text1=RM.getHTMLTexts("LyricsParsingError");
		}
	}

	setLyricsDivContent(text1,false,CM.config.showSearchTextBox,CM.config.showResultsDropDown,CM.config.showLinkOriginalPage,CM.config.showLinkSearchYoutube,CM.config.showLinkSendParsingError && flag1);
}

function showOptionsPanel(reset)
{
	var div1=addModalDiv(hideOptions);
	var div2=addOptionsPanel(reset);
	
	setFormValues($idp("OptionsForm"),CM.config);

	$idp("EditLyricsSitesDefinitions").disabled=false; 
	with($idp("LyricsSitesDefinitions"))
	{
		readOnly=true;
		disabled=true;
	}
	
	div1.className="";
	div2.className="";
	ScriptInfos.optionsPanelVisible=true;
}

function addOptionsPanel(reset)
{
	var div1=$idp("OptionsContainer");
	if (div1 && reset) {div1.parentNode.removeChild(div1); div1=null;}
	if (div1==null)
	{
		addStyle("OptionsContainerStyle");
		addNoPaddedListStyle();
		
		var array1=new Array();
		array1.push(RM.getHTMLTexts("OptionsGeneral",[ScriptInfos.idPrefix,,,,,,,,,,SU.homepageUrl]));
		array1.push(RM.getHTMLTexts("OptionsUpdater"));
		array1.push(RM.getHTMLTexts("OptionsDisplay"));
		array1.push(RM.getHTMLTexts("OptionsLyricsPanelContent"));
		array1.push(RM.getHTMLTexts("OptionsLyricsSites"));
		array1.push(RM.getHTMLTexts("OptionsLyricsSitesDefinitions"));
		div1=stringToHTML(RM.getHTMLTexts("OptionsContainer",[ScriptInfos.idPrefix,RM.getHTMLTexts("OptionsLeftSide",[ScriptInfos.idPrefix,ScriptInfos.name]),array1.join("\n")]));

		document.body.appendChild(div1);
		
		var li1=$idp("OptionsLyricsSites");
		var ul1=li1.parentNode;
		ul1.removeChild(li1);
		for(var num1=0;num1<CM.config.lyricsSitesDefinitions.length;num1++)
		{
			var obj1=CM.config.lyricsSitesDefinitions[num1];
			if (obj1.enabled)
			{
				var li2=li1.cloneNode(true);
				li2.innerHTML=li2.innerHTML.format(obj1.id,obj1.name);
				ul1.appendChild(li2);
			}
		}
		
		$idp("CheckForUpdate").addEventListener("click",function(e){SU.checkForNewVersion(true,$chf(SU,SU.newVersionDialog));},false);
		$idp("SendFeedback").addEventListener("click",function(e){sendFeedback($idp("SendFeedback"),$idp("FeedbackMessage"),$idp("SendFeedbackStatus"));},false);
		$idp("Apply").addEventListener("click",saveOptions,false);
		$idp("OK").addEventListener("click",saveOptions,false);
		$idp("Cancel").addEventListener("click",hideOptions,false);
		$idp("Definitions.CheckForUpdate").addEventListener("click",installDefinitionsDialog,false);
		$idp("EditLyricsSitesDefinitions").addEventListener("click",enableLyricsSitesDefinitionsTextarea,false);
		$idp("ReinstallLyricsSitesDefinitions").addEventListener("click",overwriteDefinitions,false);
	}
	return div1;
}

function enableLyricsSitesDefinitionsTextarea(e)
{
	if (confirm(RM.getText("EditLyricsSitesDefinitionsConfirm"))) 
	{
		$idp("EditLyricsSitesDefinitions").disabled=true; 
		with($idp("LyricsSitesDefinitions"))
		{
			readOnly=false;
			disabled=false;
		}
	}
}

function hideOptions()
{
	ScriptInfos.optionsPanelVisible=false;
	$idp("ModalDiv").className="hidden";
	$idp("OptionsContainer").className="hidden";
}

function saveOptions(e)
{
	try{setOptions(getFormValues(e.target.form));}
	catch(ex)
	{
		alert(RM.getText("LyricsSitesDefinitionsError",ex.message)); 
		getFormValues(e.target.form);
	}
	
	if (ScriptInfos.language!=CM.config.language || $idp("EditLyricsSitesDefinitions").disabled)
	{
		ScriptInfos.language=CM.config.language;
		showOptionsPanel(true);
		addLyricsPanel(true);
	}
	
	if (e.target.name=="OK") hideOptions();
}

function getFeedbackClient(){return new FeedbackClient("YoutubeLyrics@hotmail.com",Math.round(Math.exp(6*Math.log(2))*3*643));}

function sendFeedback(button,textarea,span)
{
	if (!CM.config.showSendFeedbackConfirm || confirm(RM.getText("ConfirmSendFeedback")))
	{
		var fc=getFeedbackClient();
		fc.button=button;
		fc.textarea=textarea;
		fc.span=span;
		fc.button.disabled=true;
		fc.textarea.disabled=true;
		fc.span.innerHTML=RM.getText("SendingFeedback");
		fc.login(sendFeedbackCallback1);
	}
}

function sendFeedbackCallback1(fc,response)
{
	if (fc.isLoggedIn)
	{
		fc.postMessage("topics/21769",fc.textarea.value,sendFeedbackCallback2);
	}
	else
	{
		fc.button.disabled=false;
		fc.textarea.disabled=false;
		fc.span.innerHTML=RM.getText("SendingFeedbackError");
		fc.logOut();
	}
}

function sendFeedbackCallback2(fc,response)
{
	fc.button.disabled=false;
	fc.textarea.disabled=false;
	fc.span.innerHTML=RM.getText("FeedbackSent",fc.lastPostedMessageUrl);
	fc.logout();
}

function sendParsingError(errorUrl)
{
	if ((!CM.config.showSendParsingErrorConfirm || confirm(RM.getText("ConfirmSendParsingError"))) && (!CM.config.showSendFeedbackConfirm || confirm(RM.getText("ConfirmSendFeedback"))))
	{
		setLyricsDivContent(RM.getText("SendingParsingError"),false,CM.config.showSearchTextBox,CM.config.showResultsDropDown,CM.config.showLinkOriginalPage,CM.config.showLinkSearchYoutube);
		var fc=getFeedbackClient();
		fc.errorUrl=errorUrl;
		fc.login(sendParsingErrorCallback1);
	}
}

function sendParsingErrorCallback1(fc,response)
{
	if (fc.isLoggedIn)
	{
		fc.postMessage("topics/21075",fc.errorUrl,sendParsingErrorCallback2);
	}
	else
	{
		setLyricsDivContent(RM.getText("SendingParsingErrorError"),false,CM.config.showSearchTextBox,CM.config.showResultsDropDown,CM.config.showLinkOriginalPage,CM.config.showLinkSearchYoutube);
		fc.logOut();
	}
}

function sendParsingErrorCallback2(fc,response)
{
	setLyricsDivContent(RM.getText("ParsingErrorSent",fc.lastPostedMessageUrl),false,CM.config.showSearchTextBox,CM.config.showResultsDropDown,CM.config.showLinkOriginalPage,CM.config.showLinkSearchYoutube);
	fc.logout();
}