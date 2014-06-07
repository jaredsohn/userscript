// ==UserScript==
// @name        Q-See DVR/Firefox 20 Fix
// @include     http://*/WebClient.html
// @grant       none
// ==/UserScript==
unsafeWindow.OnLoadPage = function()
{
	var r="IE failed to run the client. \rThis IE may not support multi-tab to run the client or too many IE pages opened.";
	var s="the Plugin start failed!\r\nThe Web Client can only run one instance at a time.";
	unsafeWindow.WebClient=null;
	var p=false;
	var m=/msie/i.test(navigator.userAgent);
	if(m)
	{
		unsafeWindow.WebClient=document.getElementById("WebClient");
		p=true
	}
	else
	{
		unsafeWindow.WebClient=document.getElementById("WebClientPlugin");
		document.getElementById("work_area").style.width="0px";
		document.getElementById("work_area").style.height="0px";
		var k="";
		if(unsafeWindow.WebClient!=null)
		{
			var d=navigator.userAgent.toLowerCase();
			var h=navigator.platform.toLowerCase();
			var f=false;
			if(d.indexOf("macintosh")!=-1||d.indexOf("mac os x 10")!=-1||h.indexOf("macintel")!=-1)
			{
				f=true;
				try
				{
					k=unsafeWindow.WebClient.GetPluginVersion();
				}
				catch(t)
				{
					k="";
				}
			}
			if((f&&(k!=""||unsafeWindow.WebClient.constructor==Object))||(!f))
			{
				p=true;
				var d=navigator.userAgent.toLowerCase();
				var h=navigator.platform.toLowerCase();
				if(d.indexOf("windows nt")!=-1||h.indexOf("win32")!=-1)
				{
					if(d.indexOf("firefox")!=-1||d.indexOf("chrome")!=-1||d.indexOf("safari")!=-1)
					{
						var j="1.1.2.25";
					}
				}
				else
				{
					if(d.indexOf("macintosh")!=-1||d.indexOf("mac os x 10")!=-1||h.indexOf("macintel")!=-1)
					{
						unsafeWindow.WebClient.OnExcuteCmdNotifyReply=OnExcuteCmdNotifyReply;
						unsafeWindow.WebClient.OnNetDisconnect=OnNetDisconnect;
						unsafeWindow.WebClient.OnNetReLogined=OnNetReLogined;
						unsafeWindow.WebClient.OnDisconnectByServer=OnDisconnectByServer;
						var j="1.0.2.3";
					}
				}
				try
				{
					var c=unsafeWindow.WebClient.GetPluginVersion();
					var k=j.split(".");
					var o=c.split(".");
					for(i=0;i<4;i++)
					{
						var x=parseInt(k[i]);
						var w=parseInt(o[i]);
						if(w<x)
						{
							g_bupdate=true;
							p=false;
							break;
						}
					}
				}
				catch(l)
				{
					g_bupdate=true;
					p=false;
				}
			}
			else{}
		}
	}
	var q=navigator.systemLanguage||navigator.language;
	q=q.toLowerCase();
	if(q.indexOf("zh")!=-1)
	{
		if(q=="zh-cn")
		{
			unsafeWindow.g_langName="chinese_prc";
		}
		else
		{
			unsafeWindow.g_langName="chinese_cht"
		}
		r="IE ????????\nIE??????????????????IE???";
		s="??????!\r\n???????????????.";
	}
	
	else
	{
		if(q=="cs")
		{
			unsafeWindow.g_langName="Czech";
		}
		else
		{
			if((q.indexOf("fr-")!=-1)||(q=="fr"))
			{
				unsafeWindow.g_langName="french_fr";
			}
			else
			{
				if(q.indexOf("pt")!=-1)
				{
					unsafeWindow.g_langName="portuguese";
				}
				else
				{
					if(q.indexOf("es")!=-1)
					{
						unsafeWindow.g_langName="Spanish";
					}
					else
					{
					if(q=="tr")
					{
						unsafeWindow.g_langName="turkish_tr";
					}
					else
					{
						if(q=="bg")
						{
							unsafeWindow.g_langName="bulgarian";
						}
						else
						{
							if(q=="el")
							{
								unsafeWindow.g_langName="greek";
							}
							else
							{
								if(q=="he")
								{
									unsafeWindow.g_langName="english_us";
								}
								else
								{
									if(q.indexOf("it")!=-1)
									{
										unsafeWindow.g_langName="italian";
									}
									else
									{
										if((q.indexOf("de-")!=-1)||(q=="de"))
										{
											unsafeWindow.g_langName="germany";
										}
										else
										{
											if(q.indexOf("ru")!=-1)
											{
												unsafeWindow.g_langName="russian_ru";
											}
											else
											{
												if(q.indexOf("pl")!=-1)
												{
													unsafeWindow.g_langName="polish";
												}
												else
												{
													if(q.indexOf("ja")!=-1)
													{
														unsafeWindow.g_langName="japanese";
													}
													else
													{
														if(q.indexOf("in")!=-1||q.indexOf("id")!=-1)
														{
															unsafeWindow.g_langName="indonesian";
														}
														else
														{
															if(q.indexOf("th")!=-1)
															{
																unsafeWindow.g_langName="thai";
															}
															else
															{
																if(q.indexOf("hu")!=-1)
																{
																	unsafeWindow.g_langName="Hungarian";
																}
																else
																{
																	if(q.indexOf("lt")!=-1)
																	{
																		unsafeWindow.g_langName="Lithuania";
																	}
																	else
																	{
																		if(q.indexOf("vi")!=-1)
																		{
																			unsafeWindow.g_langName="vietnamese";
																		}
																		else
																		{
																			if(q.indexOf("nl")!=-1)
																			{
																				unsafeWindow.g_langName="Dutch";
																			}
																			else
																			{
																				if(q.indexOf("fi")!=-1)
																				{
																					unsafeWindow.g_langName="Finnish";
																				}
																				else
																				{
																					if(q.indexOf("sv")!=-1)
																					{
																						unsafeWindow.g_langName="Swedish";
																					}
																					else
																					{
																						if(q.indexOf("da")!=-1)
																						{
																							unsafeWindow.g_langName="Danish";
																							}
																							else
																							{
																								if(q.indexOf("no")!=-1)
																								{
																									unsafeWindow.g_langName="Norwegian";
																								}
																								else
																								{
																									if(q.indexOf("uk")!=-1)
																									{
																										unsafeWindow.g_langName="russian_ru";
																									}
																									else
																									{
																										if(q.indexOf("fa")!=-1)
																										{
																											unsafeWindow.g_langName="farsi";
																										}
																										else
																										{
																											unsafeWindow.g_langName="english_us";
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	try
	{
		if(m&&!unsafeWindow.WebClient.CanInitialize())
		{
			window.alert(r);
			window.close();
			return;
		}
		if(!m&&!unsafeWindow.WebClient.CanInitialize())
		{
			window.alert(s);
			window.close();
			return;
		}
	}
	catch(l)
	{
	}
	if(!p&&!m)
	{
		LoadMultiString("string.js",GotoWebKitPage);
		if(unsafeWindow.g_langName!="????")
		{
			var u=new Array("device_param.js","cfg_main.js");
			ReLoadMultiJS(u);
		}
		return;
	}
	try
	{
		var g="<request>\r\n";
		g+='<command name="'+STR_LM_SET_LANGUAGE+'">\r\n';
		g+="<language>"+g_langName+"</language>\r\n";
		g+="</command>\r\n";
		g+="</request>\r\n";
		unsafeWindow.WebClient.ExcuteLocalCmd(g);
		strRequest="<request>\r\n";
		strRequest+='<command name="'+STR_LM_GET_HOST_INFO+'"></command>\r\n';
		strRequest+="</request>\r\n";
		strReply=unsafeWindow.WebClient.ExcuteLocalCmd(strRequest);
		if(g_xmlDoc!=null)
		{
			delete g_xmlDoc;
			g_xmlDoc=null;
		}
		g_xmlDoc=FormatToXmlDOM(strReply);
		cmdElements=g_xmlDoc.documentElement.getElementsByTagName("command");
		if(cmdElements.length>0)
		{
			var v=cmdElements[0].getElementsByTagName(STR_HOST_NAME);
			var n=cmdElements[0].getElementsByTagName(STR_HOST_MAC);
			HostInfo.hostname=v[0].childNodes[0].nodeValue;
			HostInfo.hostmac=n[0].childNodes[0].nodeValue;
		}
		LoadMultiString("string.js",GotoLoginPage);
		if(unsafeWindow.g_langName!="????")
		{
			if(!m)
			{
				var u=new Array("device_param.js","cfg_main.js");
				ReLoadMultiJS(u);
			}
		}
	}
	catch(t)
	{
		g_loadPageTimeOut=setTimeout(OnLoadPage);
		return;
	}
	if(g_loadPageTimeOut!=0)
	{
		clearTimeout(g_loadPageTimeOut);
	}
}
