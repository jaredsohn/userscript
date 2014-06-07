// ==UserScript==
// @name             Google Anonymizer
// @namespace    http://userscripts.org/users/28612
// @version         2.00.03
// @changes        Almost completly rewritten,Extended anonymization,Added WebProxy support,Added iGoogle support
// @description  Anonymizes search requests to google and removes tracking systems on the results page. It transforms you into a ghost for google.
// @include         http://*google.tld/*
// @require         http://userscripts.org/scripts/version/33024/45103.user.js
// @resource       Library1Resources http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_3_0/Library1.xml
// @resource       Library1Resources_de http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_3_0//Library1_de.xml
// @resource       Library1Resources_es http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_3_0/Library1_es.xml
// @resource       Library1Resources_fr http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_3_0/Library1_fr.xml
// @resource       Library1Resources_it http://www.fileden.com/files/2008/9/2/2077873/JavascriptLibrary/0_3_0/Library1_it.xml
// @resource      GoogleAnonymizerResources http://www.fileden.com/files/2008/9/2/2077873/GoogleAnonymizer/2_0_0/GoogleAnonymizer.xml
// ==/UserScript==

var ScriptInfos={
	name: "Google Anonymizer",
	version: "2.00.03",
	language: "en",
	idPrefix: "GA"
}

var rmga=null;
initGoogleAnonymizer();
		
function initGoogleAnonymizer()
{
	ScriptInfos.scriptUpdater=new Updater(10448,ScriptInfos.name,ScriptInfos.idPrefix,"//td[input[@name='q']]");

	getOptions();
	
	with(ScriptInfos.scriptUpdater)
	{
		actualVersion=new Version(ScriptInfos.version);
		newVersionDays=parseInt(ScriptInfos.options.GAUpdateCheckFrequency);
	}
	
	rmga=new ResoucesManager("GoogleAnonymizerResources");
	$rmc("MenuOptions",[ScriptInfos.name],showOptionsPanel);
	
	var flag1=false;
	try{anonymizeGoogle();}
	catch(ex)
	{
		flag1=true;
		GM_log(ex.message);
	}
	ScriptInfos.scriptUpdater.checkForNewVersion(ScriptInfos.scriptUpdater.newVersionHTML,flag1);
}

function anonymizeGoogle()
{
	var obj1=ScriptInfos.options;

	//removing mouse down events, removing dangerous sites redirection and adding confirm dialog for dangerous sites
	if (obj1.GARemoveMouseDown || obj1.GARewriteDangerousSitesUrl || obj1.GAConfirmDangerousSites || obj1.GARewriteImagesUrl)
	{
		//this event listener is useful if you are using scripts like autopaging or pagerization
		document.body.addEventListener("DOMNodeInserted",nodeInsertedHandler,false);
		sanitizeNode(document.body);
	}
	
	//clk function
	switch(obj1.GAClkFunction)
	{
		case "Delete": $ls("window.clk=undefined"); break;
		case "Rewrite": $ls("window.clk=function(){return true;}"); break;
	}
	
	//rwt function
	switch(obj1.GARwtFunction)
	{
		case "Delete": $ls("window.rwt=undefined"); break;
		case "Rewrite": $ls("window.rwt=function(){return true;}"); break;
	}
	
	//dealing with google's cookies
	dealWithGoogleCookies();
	
	//imilly annullated cookie
	var flag1=true;
	if (ScriptInfos.options.GAUseImillyPREFCookie)
	{
		if (getGooglePREFId()=="0000000000000000") flag1=false;
		else setImillyCookie();
	}
	
	//adding google search preferences
	var obj2=obj1.GAGoogleSearchPreferences;
	if (!$ise(obj2))
	{
		//as hidden fields to search forms
		if (obj1.GASearchPreferencesHiddenFields) addPreferencesToGoogleSearchForms(obj2);
		//to the google's PREF cook
		if (obj1.GASearchPreferencesCookie && flag1) addPreferencesToGoogleCookie(obj2);
	}
	
	//adding extra search preferences
	var obj3=obj1.GAGoogleExtraSearchPreferences;
	if (!$ise(obj3) && obj1.ExtraSearchPreferencesHiddenFields) addPreferencesToGoogleSearchForms(obj3);
	
	//Web Proxy
	if (obj1.GAUseWebProxy) changeFormsForWebProxy();
	
	//google search preferences pages
	if (location.pathname=="/preferences")
	{
		//removing google's saved preferences alert
		if (obj1.GARemoveGoogleAlertSavedPreferences) $ls("window.saving=function(){}");
		
		//catching google save preferences submit
		if (obj1.GASaveGooleSearchPreference) 
		{
			var form1=document.forms[0];
			if (obj1.GAGoogleSearchPreferences) setFormValues(form1,obj1.GAGoogleSearchPreferences);
			
			form1.addEventListener("submit",function(e){saveGoogleSearchPreferences(getFormValues(e.target,function(element,value){return element.type=="hidden"?null:value;}));},false);		
		}
	}
	
	//iGoogle preferences
	if (location.pathname=="/ig") setIGooglePreferences();
}

function getGooglePREFId(failReturnValue)
{
	var obj1=getCookie("PREF");
	return obj1?/ID=(\w+):/i.exec(obj1.value)[1]:failReturnValue;
}

function getIGTPCookie()
{
	var obj1=getCookie("IGTP");
	return obj1?obj1.value.split(":"):null;
}

function nodeInsertedHandler(e)
{
	dealWithGoogleCookies();
	sanitizeNode(e.relatedNode);
}

function changeFormsForWebProxy()
{
	var array1=document.forms;
	for(var num1=0;num1<array1.length;num1++)
	{
		var obj1=array1[num1];
		obj1.setAttribute("onsubmit","return false;");
		obj1.addEventListener("submit",submitToWebProxy,false);
	}
}

function submitToWebProxy(e)
{
	var obj1=ScriptInfos.options
	var text1="{0}?{1}".format(e.target.action,formValuesToString(getFormValues(e.target)));
	
	var obj2=$ce("form",null,{action:obj1.GAWebProxyAction,method:obj1.GAWebProxyMethod,target:obj1.GAWebProxyTarget,enctype:obj1.GAWebProxyEncoding});
	for(var text2 in obj1.GAWebProxyFields) obj2.appendChild($ce("input",null,{name:text2,value:obj1.GAWebProxyFields[text2].format(text1),type:"hidden"}));
	document.body.appendChild(obj2);
	obj2.submit();
	document.body.removeChild(obj2);
}

function isLoggedInGoogleNetwork()
{
	return getCookie("SID")!=null;
}

function dealWithGoogleCookies()
{
	var obj1=ScriptInfos.options;
	if (!obj1.GADeleteGoogleCookies || (obj1.GANotWhenLoggedInGoogleNetwork && isLoggedInGoogleNetwork())) return;
	if (obj1.GADeleteGoogleCookiesBeginning) deleteCookies();
	if (obj1.GADeleteGoogleCookiesEnd && !ScriptInfos.addedUnloadWindowListener)
	{			
		ScriptInfos.addedUnloadWindowListener=true;
		window.addEventListener("unload",deleteCookies,false);
	}
}

function deleteCookies()
{
	var array1=getAllCookies();
	var flag1=ScriptInfos.options.GALogDeletedCookies;
	for(var num1=0;num1<array1.length;num1++)
	{
		var obj1=array1[num1];
		if (obj1.name=="PREF" && ScriptInfos.options.GALeavePREFCookie) continue;
		if (obj1.name=="IGTP" && ScriptInfos.options.GAIGoogleLeaveIGTPCookie) continue;
		var flag2=deleteCookie(obj1);
		if (flag1) GM_log(rmga.getText("DeletedCookie",[obj1.name,flag2]));
	}
}

function setImillyCookie()
{
	//Setting imilly cookie
	var text1=location.hostname;
	text1=text1.substring(text1.indexOf(".")+1);
	setCookie({name:"PREF",value:"ID=0000000000000000:LD=en:TM=1115409441:LM=1129104254:S=kSuablMgN8pP9-91",expires:"Sun, 17-Jan-2038 19:14:07 GMT",domain:text1});
}

function setIGooglePreferences()
{
	var obj1=ScriptInfos.options;
	var array1=getIGTPCookie();
	if (array1 && obj1.GAIGoogleSaveIGTPCookie)
	{
		var text1=obj1.GAIGoogleSavedIGTPCookie;
		var flag1=text1==array1[0];
		if ($x1("//input[@class='setup_save_button']") && text1 && !flag1)
		{
			//resetting IGTP  cookie
			setCookie({name:"IGTP",value:"{0}:{1}".format(text1,array1[1]),path:location.pathname,domain:location.hostname});
			//reloading page
			if (obj1.GAIGoogleReloadPage) location.reload();
		}
		
		//checking every 1 sec if IGTP has changed
		setInterval(saveIGooglePreferences,1000);
	}
	
	//removing sign up label
	if (obj1.GAIGoogleRemoveSignUp)
	{
		var div1=$id("new_user_save_box");
		if (div1) div1.parentNode.removeChild(div1);
	}
}

function saveIGooglePreferences()
{
	var obj1=ScriptInfos.options;
	var array1=getIGTPCookie();
	if (array1)
	{
		var text1=obj1.GAIGoogleSavedIGTPCookie;
		var flag1=text1==array1[0];
		if (!flag1)
		{
			obj1.GAIGoogleSavedIGTPCookie=array1[0];
			setOptions();
		}
	}
}

function addPreferencesToGoogleSearchForms(preferences)
{
	Array.forEach(document.forms,function(form){setFormValues(form,preferences,function(form,element,value){if (typeof(element)=="string") form.appendChild($ce("input",null,{type:"hidden",name:element,value:value}));});});
}

function addPreferencesToGoogleCookie(values)
{
	var text1="http://"+document.domain;
	var request1=new XMLHttpRequest();
	request1.open("GET",text1+"/preferences",false);
	request1.send(null);
	if(request1.status!=200) {GM_log("Failed to get google's preference page, domain: "+text1); return;}
	var match1=/<input\s+type="hidden"\s+name="sig"\s+value="(.+?)">/gmi.exec(request1.responseText);
	if (match1==null) {GM_log("Failed to parse sig hidden field, domain: "+text1); return;}
	var match2=/<input\s+type=submit.+?value="(.+?)"\s+name="submit2">/gmi.exec(request1.responseText);
	if (match2==null) {GM_log("Failed to parse submit2 submit field, domain: "+text1); return;}
	var text2=text1+"/setprefs?sig="+encodeURIComponent(match1[1])+"&"+formValuesToString(values)+"&q=&prev="+encodeURIComponent(document.location.toString())+"&submit2="+encodeURIComponent(match2[1]);
	var request2=new XMLHttpRequest();
	request2.open("GET",text2,false);
	request2.send(null);
	if(request2.status!=200) {GM_log("Failed to set google's preferences, domain: "+text1+", get:"+text2); return;}
}

function sanitizeNode(node)
{
	var array1=node.getElementsByTagName("A");
	var flag1=ScriptInfos.options.GAGoogleSearchPreferences && ScriptInfos.options.GAGoogleSearchPreferences.newwindow=="1";
	var flag2=ScriptInfos.options.GARewriteDangerousSitesUrl || ScriptInfos.options.GAConfirmDangerousSites;
	var flag3=ScriptInfos.options.GARewriteImagesUrl || ScriptInfos.options.GAAddLinkImagesOriginalPage;
	for (var num1=0;num1<array1.length;num1++)
	{
		var link1=array1[num1];
		
		//removing mouse down event
		if (ScriptInfos.options.GARemoveMouseDown) link1.removeAttribute("onmousedown");
		
		//google's dangerous sites
		if (flag2 && link1.href.match(/google\.[^?]*?\/interstitial\?url=(.*)/gmi))
		{
			var text1=decodeURIComponent(RegExp.$1);
			//rewriting link
			if (ScriptInfos.options.GARewriteDangerousSitesUrl)
			{
				link1.setAttribute("href",text1);
				link1.setAttribute("title","Warning - visiting this web site may harm your computer!");
				link1.setAttribute("style","color:red;");
				
				link1.insertBefore($ce("img",null,{border:"0px",src:rmga.getText("WarningImage")}),link1.firstChild);
			}
			//adding confirm dialog
			if (ScriptInfos.options.GAConfirmDangerousSites) 
			{
				link1.setAttribute("onclick","return confirm('Warning - visiting this web site may harm your computer!\\nContinue to "+text1+" at your own risk?');");
			}
		}

		//googe's images
		if (flag3 && link1.href.match(/imgres\?imgurl=(.*?)&imgrefurl=(.*?)(?:&|$)/gmi))
		{
			//rewriting image link
			if (ScriptInfos.options.GARewriteImagesUrl)
			{ 
				link1.setAttribute("href",decodeURIComponent(RegExp.$1));
				if (flag1) link1.target="_blank";
			}
			//adding link to the original page
			if (ScriptInfos.options.GAAddLinkImagesOriginalPage)
			{
				var element1=link1.parentNode;
				var element2=link1.nextSibling;
			
				element1.insertBefore($ce("br"),element2);
				element1.insertBefore($ce("a","Source Page",{href:decodeURIComponent(RegExp.$2),target:flag1?"_blank":""}),element2);
			}
		} 
		
		//fixing similar page links
		if (link1.href.indexOf("related:/interstitial?url=http://")!=-1) link1.setAttribute("href",link1.href.replace("related:/interstitial?url=http://",""));
	}
}

function showOptionsPanel(reset)
{
	var div1=addModalDiv(hideOptions);
	var div2=addOptionsPanel(reset);
	
	setFormValues($id("{0}FormOptions".format(ScriptInfos.idPrefix)),ScriptInfos.options);
	if ($isd(ScriptInfos.scriptUpdater.lastNewVersionCheckDate)) $id("{0}LastUpdate".format(ScriptInfos.idPrefix)).textContent=ScriptInfos.scriptUpdater.lastNewVersionCheckDate.toLocaleString();
	$id("{0}GoogleId".format(ScriptInfos.idPrefix)).textContent=getGooglePREFId(rmga.getText("NoGooglePREFId"));
	$id("{0}WebProxyFields".format(ScriptInfos.idPrefix)).value=$o2t(ScriptInfos.options.GAWebProxyFields);
	$id("{0}GoogleSearchPreferences".format(ScriptInfos.idPrefix)).value=$o2t(ScriptInfos.options.GAGoogleSearchPreferences);
	$id("{0}GoogleExtraSearchPreferences".format(ScriptInfos.idPrefix)).value=$o2t(ScriptInfos.options.GAGoogleExtraSearchPreferences);
	
	div1.className="";
	div2.className="";
	ScriptInfos.optionsPanelVisible=true;
}

function addOptionsPanelStyle()
{
	if (!ScriptInfos.addedOptionPanelStyle)
	{
		ScriptInfos.addedOptionPanelStyle=true;
		$as(rmga.getText("OptionsContainerStyle",ScriptInfos.idPrefix));
	}
}

function addOptionsPanel(reset)
{
	var div1=$id("{0}OptionsContainer".format(ScriptInfos.idPrefix));
	if (reset) {div1.parentNode.removeChild(div1); div1=null;}
	if (div1==null)
	{
		addOptionsPanelStyle();
		addNoPaddedListStyle();
		
		var array1=new Array();
		array1.push(rmga.getHTMLTexts("OptionsGeneral"));
		array1.push(rmga.getHTMLTexts("OptionsUpdater"));
		array1.push(rmga.getHTMLTexts("OptionsWebProxy"));
		array1.push(rmga.getHTMLTexts("OptionsCookies"));
		array1.push(rmga.getHTMLTexts("OptionsJavascriptFunctions"));
		array1.push(rmga.getHTMLTexts("OptionsLinkRedirection"));
		array1.push(rmga.getHTMLTexts("OptionsSearchPreferences"));
		array1.push(rmga.getHTMLTexts("OptionsExtraSearchPreferences"));
		array1.push(rmga.getHTMLTexts("OptionsIGooglePreferences"));

		div1=stringToHTML(rmga.getHTMLTexts("OptionsContainer",[ScriptInfos.idPrefix,rmga.getHTMLTexts("OptionsLeftSide",[ScriptInfos.idPrefix,null,ScriptInfos.version]),array1.join("\n")]));
		document.body.appendChild(div1);
		
		$id("{0}CheckForUpdate".format(ScriptInfos.idPrefix)).addEventListener("click",function(){ScriptInfos.scriptUpdater.checkForNewVersion(ScriptInfos.scriptUpdater.newVersionDialog,true);},false);
		$id("{0}Apply".format(ScriptInfos.idPrefix)).addEventListener("click",saveOptions,false);
		$id("{0}OK".format(ScriptInfos.idPrefix)).addEventListener("click",saveOptions,false);
		$id("{0}Cancel".format(ScriptInfos.idPrefix)).addEventListener("click",hideOptions,false);
	}
	
	return div1;
}

function hideOptions()
{
	ScriptInfos.optionsPanelVisible=false;
	$id("{0}ModalDiv".format(ScriptInfos.idPrefix)).className="hidden";
	$id("{0}OptionsContainer".format(ScriptInfos.idPrefix)).className="hidden";
}

function saveOptions(e)
{
	var obj1=getFormValues(e.target.form);
	try{obj1.GAWebProxyFields=$t2o(obj1.GAWebProxyFields);}
	catch(ex)
	{
		alert(rmga.getText("ConveringTextToObjectError","Search Preferences",ex.message)); 
		$t2o(obj1.GAWebProxyFields);
	}

	try{obj1.GAGoogleSearchPreferences=$t2o(obj1.GAGoogleSearchPreferences);}
	catch(ex)
	{
		alert(rmga.getText("ConveringTextToObjectError","Search Preferences",ex.message)); 
		$t2o(obj1.GAGoogleSearchPreferences);
	}
	try{obj1.GAGoogleExtraSearchPreferences=$t2o(obj1.GAGoogleExtraSearchPreferences);}
	catch(ex)
	{
		alert(rmga.getText("ConveringTextToObjectError","Extra Search Preferences",ex.message)); 
		$t2o(obj1.GAGoogleExtraSearchPreferences);
	}
	ScriptInfos.options=obj1;
	if (e.target.id=="{0}OK".format(ScriptInfos.idPrefix)) hideOptions();
	setOptions();
}

function saveGoogleSearchPreferences(preferences)
{
	var obj1=ScriptInfos.options;
	if (!obj1.GAGoogleSearchPreferences || preferences.toSource()!=obj1.GAGoogleSearchPreferences.toSource())
	{
		obj1.GAGoogleSearchPreferences=preferences;
		setOptions();
		if (ScriptInfos.options.GAShowAnonymizerAlertSavedPreferences) alert(rmga.getText("SearchPreferencesSavedLocally",ScriptInfos.name));
	}
}

function setOptions()
{
	setObject("GAOptions",ScriptInfos.options);
	ScriptInfos.language=ScriptInfos.options.GALanguage;
}

function getOptions()
{
	ScriptInfos.options=getObject("GAOptions");
	if (ScriptInfos.options==null) ScriptInfos.options=new Object();
	if (ScriptInfos.options.GAVersion!=ScriptInfos.version)
	{
		var obj1=ScriptInfos.options;
		var obj2={
			GALanguage:"en",
			GAUpdateCheckFrequency:"1",
			GAWebProxyAction:"http://filtersbite.com/includes/process.php?action=update",
			GAWebProxyMethod:"Post",
			GAWebProxyEncoding:"application/x-www-form-urlencoded",
			GAWebProxyFields:({u:"{0}", stripJS:"on", stripObjects:"on"}),
			GADeleteGoogleCookies:"on",
			GANotWhenLoggedInGoogleNetwork:"on",
			GADeleteGoogleCookiesBeginning:"on",
			GARemoveMouseDown:"on",
			GAClkFunction:"Delete",
			GARwtFunction:"Delete",
			GARewriteDangerousSitesUrl:"on", 
			GAConfirmDangerousSites:"on", 
			GARewriteImagesUrl:"on", 
			GAAddLinkImagesOriginalPage:"on",
			GASaveGooleSearchPreference:"on",
			GARemoveGoogleAlertSavedPreferences:"on", 
			GAShowAnonymizerAlertSavedPreferences:"on",
			GASearchPreferencesHiddenFields:"on", 
			GAGoogleSearchPreferences:undefined,
			GAGoogleExtraSearchPreferences:undefined,
			GAIGoogleIGTPCookie:"Leave",
			GAIGoogleReloadPage:null,
			GAIGoogleRemoveSignUp:null,
			GASavedIGoogleIGTPCookie:""
		};
		for(var name in obj2) if (obj1[name]!=null) {obj2[name]=obj1[name];}
		obj2.GAVersion=ScriptInfos.version;
		
		ScriptInfos.options=obj2;
		
		setOptions();
	}
	ScriptInfos.language=ScriptInfos.options.GALanguage;
	return ScriptInfos.options;
}