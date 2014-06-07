// ==UserScript==
// @name           Sklavenzentrale
// @namespace      com.escon24
// @description    [0.4] Entfernt diverse Boxen. Verändert das Design (Hintergrundfarbe, Blöcke, SSL). corollary@web.de
// @include			http://www.sklavenzentrale.com/*
// @include			http://*.sklavenzentrale.com/*
// @include			https://www.sklavenzentrale.com/*
// @include			https://*.sklavenzentrale.com/*
// ==/UserScript==

// ALL (except gallery): remove top image
var m_actions = new Array();
m_actions[0] 											= new Object();
m_actions[0]["conditions"] 								= new Object();
m_actions[0]["conditions"]["exclude-url-contains"] 		= new Array("galPic.php");
m_actions[0]["actions"] 								= new Object();
m_actions[0]["actions"]["apply-mod"]					= new Array();
m_actions[0]["actions"]["apply-mod"][0] 				= new Object();
m_actions[0]["actions"]["apply-mod"][0]["xpath"] 		= "/html/body/center/table[1]/tbody/tr[1]";
m_actions[0]["actions"]["apply-mod"][0]["modification"] = new Array("style", "display", "none");
m_actions[0]["actions"]["apply-mod"][1] 				= new Object();
m_actions[0]["actions"]["apply-mod"][1]["xpath"] 		= "/html/body/center/table/tbody/tr[2]/td/table/tbody/tr";
m_actions[0]["actions"]["apply-mod"][1]["modification"] = new Array("style", "display", "none");
m_actions[0]["actions"]["apply-mod"][2] 				= new Object();
m_actions[0]["actions"]["apply-mod"][2]["xpath"] 		= "/html/body/center/table/tbody/tr[2]/td/table/tbody/tr[2]";
m_actions[0]["actions"]["apply-mod"][2]["modification"] = new Array("style", "display", "none");
m_actions[0]["actions"]["apply-mod"][3] 				= new Object();
m_actions[0]["actions"]["apply-mod"][3]["xpath"] 		= "/html/body/center/table/tbody/tr[2]/td/table/tbody/tr[4]";
m_actions[0]["actions"]["apply-mod"][3]["modification"] = new Array("style", "display", "none");
m_actions[0]["actions"]["apply-mod"][4] 				= new Object();
m_actions[0]["actions"]["apply-mod"][4]["xpath"] 		= "/html/body/center/table/tbody/tr[3]/td/table/tbody/tr";
m_actions[0]["actions"]["apply-mod"][4]["modification"] = new Array("style", "display", "none");
m_actions[0]["actions"]["apply-mod"][5] 				= new Object();
m_actions[0]["actions"]["apply-mod"][5]["xpath"] 		= "/html/body/center/table/tbody/tr[3]/td/table/tbody/tr[2]";
m_actions[0]["actions"]["apply-mod"][5]["modification"] = new Array("style", "display", "none");
m_actions[0]["actions"]["apply-mod"][6] 				= new Object();
m_actions[0]["actions"]["apply-mod"][6]["style"] 		= ".stdbox { border-width: 0px; } A, A.HI { text-decoration: none; } TD.REITER, TD.REITER FONT { background: #eeeeee; color: #000000; } TD.REITER { border-top:1px #999999 solid; border-bottom:1px #999999 solid; } A.subT, TD.subT { background: #eeeeee; color: #000000; border-top:1px #999999 solid; border-bottom:1px #999999 solid; } TD.REITER A, TD.REITER A FONT, TD.REITER A B, A.subT { color: #000000; }";
m_actions[0]["actions"]["apply-mod"][7] 				= new Object();
m_actions[0]["actions"]["apply-mod"][7]["xpath"] 		= "/html/body/center/table/tbody/tr[2]/td/table";
m_actions[0]["actions"]["apply-mod"][7]["modification"] = new Array("attribute", "bgcolor", "#eeeeee");
m_actions[0]["actions"]["apply-mod"][8] 				= new Object();
m_actions[0]["actions"]["apply-mod"][8]["xpath"] 		= "/html/body/center/table/tbody/tr[3]/td/table";
m_actions[0]["actions"]["apply-mod"][8]["modification"] = new Array("attribute", "bgcolor", "#dddddd");
m_actions[0]["actions"]["apply-mod"][9] 				= new Object();
m_actions[0]["actions"]["apply-mod"][9]["xpath"] 		= "/html/body";
m_actions[0]["actions"]["apply-mod"][9]["modification"] = new Array("attribute", "background", "imgs/b3.gif");

// CHAT: remove bottom ad
m_actions[1] 											= new Object();
m_actions[1]["conditions"] 								= new Object();
m_actions[1]["conditions"]["include-url-contains"] 		= new Array("act=chat");
m_actions[1]["actions"] 								= new Object();
m_actions[1]["actions"]["apply-mod"]					= new Array();
m_actions[1]["actions"]["apply-mod"][0] 				= new Object();
m_actions[1]["actions"]["apply-mod"][0]["xpath"] 		= "/html/body/center/p";
m_actions[1]["actions"]["apply-mod"][0]["modification"] = new Array("style", "display", "none");

// MYSZ: remove top right ad
m_actions[2] 											= new Object();
m_actions[2]["conditions"] 								= new Object();
m_actions[2]["conditions"]["include-url-contains"] 		= new Array("act=mysz");
m_actions[2]["actions"] 								= new Object();
m_actions[2]["actions"]["apply-mod"]					= new Array();
m_actions[2]["actions"]["apply-mod"][0] 				= new Object();
m_actions[2]["actions"]["apply-mod"][0]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td[5]/table";
m_actions[2]["actions"]["apply-mod"][0]["modification"] = new Array("style", "display", "none");
m_actions[2]["actions"]["apply-mod"][1] 				= new Object();
m_actions[2]["actions"]["apply-mod"][1]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td[5]/a";
m_actions[2]["actions"]["apply-mod"][1]["modification"] = new Array("style", "display", "none");
m_actions[2]["actions"]["apply-mod"][2] 				= new Object();
m_actions[2]["actions"]["apply-mod"][2]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td[5]/table[2]";
m_actions[2]["actions"]["apply-mod"][2]["modification"] = new Array("style", "display", "none");
m_actions[2]["actions"]["apply-mod"][3] 				= new Object();
m_actions[2]["actions"]["apply-mod"][3]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td[5]/iframe";
m_actions[2]["actions"]["apply-mod"][3]["modification"] = new Array("style", "display", "none");

// remove left ads
m_actions[2]["actions"]["apply-mod"][4] 				= new Object();
m_actions[2]["actions"]["apply-mod"][4]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td/center";
m_actions[2]["actions"]["apply-mod"][4]["modification"] = new Array("style", "display", "none");
m_actions[2]["actions"]["apply-mod"][5] 				= new Object();
m_actions[2]["actions"]["apply-mod"][5]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td/br[2]";
m_actions[2]["actions"]["apply-mod"][5]["modification"] = new Array("style", "display", "none");
m_actions[2]["actions"]["apply-mod"][6] 				= new Object();
m_actions[2]["actions"]["apply-mod"][6]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td/center[2]";
m_actions[2]["actions"]["apply-mod"][6]["modification"] = new Array("style", "display", "none");

// Userprofile (ZN=...)
m_actions[3] 											= new Object();
m_actions[3]["conditions"] 								= new Object();
m_actions[3]["conditions"]["include-url-contains"] 		= new Array("ZN=");
m_actions[3]["actions"] 								= new Object();
m_actions[3]["actions"]["apply-mod"]					= new Array();
m_actions[3]["actions"]["apply-mod"][0] 				= new Object();
m_actions[3]["actions"]["apply-mod"][0]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td[5]/table";
m_actions[3]["actions"]["apply-mod"][0]["modification"] = new Array("style", "display", "none");
m_actions[3]["actions"]["apply-mod"][1] 				= new Object();
m_actions[3]["actions"]["apply-mod"][1]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td[5]/a";
m_actions[3]["actions"]["apply-mod"][1]["modification"] = new Array("style", "display", "none");
m_actions[3]["actions"]["apply-mod"][2] 				= new Object();
m_actions[3]["actions"]["apply-mod"][2]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td[5]/table[2]";
m_actions[3]["actions"]["apply-mod"][2]["modification"] = new Array("style", "display", "none");
m_actions[3]["actions"]["apply-mod"][3] 				= new Object();
m_actions[3]["actions"]["apply-mod"][3]["xpath"] 		= "/html/body/center/table[2]/tbody/tr/td[5]/iframe";
m_actions[3]["actions"]["apply-mod"][3]["modification"] = new Array("style", "display", "none");
m_actions[3]["actions"]["apply-mod"][4] 				= new Object();
m_actions[3]["actions"]["apply-mod"][4]["xpath"] 		= "/html/body/center/p";
m_actions[3]["actions"]["apply-mod"][4]["modification"] = new Array("style", "display", "none");

// Userprofiles
m_actions[4] 											= new Object();
m_actions[4]["conditions"] 								= new Object();
m_actions[4]["conditions"]["include-url-contains"] 		= new Array("act=profile");
m_actions[4]["actions"] 								= new Object();
m_actions[4]["actions"]["apply-mod"]					= new Array();
m_actions[4]["actions"]["apply-mod"][0] 				= new Object();
m_actions[4]["actions"]["apply-mod"][0]["xpath"] 		= "/html/body/center/p";
m_actions[4]["actions"]["apply-mod"][0]["modification"] = new Array("style", "display", "none");

//m_actions[5] 											= new Object();
//m_actions[5]["conditions"] 								= new Object();
//m_actions[5]["conditions"]["include-url-contains"] 		= new Array("galPic.php");
//m_actions[5]["actions"] 								= new Object();
//m_actions[5]["actions"]["apply-mod"]					= new Array();
//m_actions[5]["actions"]["apply-mod"][0] 				= new Object();
//m_actions[5]["actions"]["apply-mod"][0]["move"] 		= Array("/html/body/table/tbody/tr/td/table/tbody/tr/td/a/img", "/html/body/table/tbody/tr/td/table/tbody/tr/td");
//m_actions[5]["actions"]["apply-mod"][1] 				= new Object();
//m_actions[5]["actions"]["apply-mod"][1]["move"] 		= Array("/html/body/table/tbody/tr/td/table/tbody/tr/td/a/img", "/html/body/table/tbody/tr/td/table/tbody/tr/td");
//m_actions[5]["actions"]["apply-mod"][2] 				= new Object();
//m_actions[5]["actions"]["apply-mod"][2]["xpath"] 		= "/html/body/table/tbody/tr/td/table/tbody/tr/td/a/img";
//m_actions[5]["actions"]["apply-mod"][2]["modification"] = new Array("attribute", "height", "0px");
//m_actions[5]["actions"]["apply-mod"][3] 				= new Object();
//m_actions[5]["actions"]["apply-mod"][3]["xpath"] 		= "/html/body/table/tbody/tr/td/table/tbody/tr/td/a/img";
//m_actions[5]["actions"]["apply-mod"][3]["modification"] = new Array("attribute", "width", "0px");

var m_url = window.location.href + "?" + window.location.search;
applyActions(m_actions, m_url);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function xpath(p_xpath) {
    return document.evaluate(p_xpath, document, null, XPathResult.ANY_TYPE, null);
}

function xpathType(p_xpath, p_type) {
    return document.evaluate(p_xpath, document, null, p_type, null);
}

function applyMove(p_xpathSource, p_xpathTarget)
{
	//alert(p_xpathSource + "\n\n"+ p_xpathTarget);
	var m_results1 = xpath(p_xpathSource);
	var m_results2 = xpath(p_xpathTarget);	
	var m_result1 = m_results1.iterateNext();
	var m_result2 = m_results2.iterateNext();	
	if(m_result1 && m_result2)
	{
		//m_result2.textContent = m_result1.textContent;
		//alert(m_result2.textContent + '\n' + m_result1.textContent)
		m_result2.setAttribute('width', '500');
		m_result2.setAttribute('height', '500');
	}
}

function applyMod(p_xpath, p_modification)
{
	//alert(p_xpath + "\n\n"+ p_modification);
	var m_results = xpath(p_xpath);
	var m_result = m_results.iterateNext();
	if(m_result)
	{
		switch(p_modification[0]) // find a better way to do this, evalute this somehow instead?
		{
			case "style":
				switch(p_modification[1])
				{
					case "display":
						m_result.style.display = p_modification[2];
					break;
				}
				break;
			case "attribute":
				m_result.setAttribute(p_modification[1], p_modification[2]);
				break;
		}
	}
}

function doesUrlContain(p_Surl, p_string)
{
	return p_Surl.indexOf(p_string) != -1;
}

function doesUrlIs(p_Surl, p_string)
{
	return p_Surl == p_string;
}

function applyActions(p_actions, p_Surl)
{
	var m_Oconditions;
	var m_Aconditions;
	var m_Oactions;
	var m_isAllowed;
	
	for(var m_outer = 0; m_outer < p_actions.length; m_outer++)
	{
		m_isExcluded 	= false;
		m_Oconditions 	= p_actions[m_outer]["conditions"];
		m_Oactions		= p_actions[m_outer]["actions"];
		
		if(m_Oconditions["exclude-url-contains"] != null)
		{
			for(var m_inner = 0; m_inner < m_Oconditions["exclude-url-contains"].length; m_inner++)
			{
				if(doesUrlContain(p_Surl, m_Oconditions["exclude-url-contains"][m_inner]) == true)
				{
					m_isExcluded = true;
					break;
				}
			}
		}
		
		if(m_isExcluded == false && m_Oconditions["exclude-url-is"] != null)
		{
			for(var m_inner = 0; m_inner < m_Oconditions["exclude-url-is"].length; m_inner++)
			{
				if(doesUrlIs(p_Surl, m_Oconditions["exclude-url-is"][m_inner]) == true)
				{
					m_isExcluded = true;
					break;
				}
			}
		}
		
		if(m_isExcluded == false
			&& m_Oconditions["include-url-contains"] == null 
				&& m_Oconditions["include-url-is"] == null)
		{
			m_isIncluded = true; // not excluded and no includes defined renders to true
		}
		else if(m_isExcluded == false
			&& (m_Oconditions["include-url-contains"] != null 
				|| m_Oconditions["include-url-is"] != null))
		{
			m_isExcluded = true; // now we are looking for a matching INCLUDE
			
			if(m_Oconditions["include-url-contains"] != null)
			{
				for(var m_inner = 0; m_inner < m_Oconditions["include-url-contains"].length; m_inner++)
				{
					if(doesUrlContain(p_Surl, m_Oconditions["include-url-contains"][m_inner]) == true)
					{
						m_isExcluded = false;
						break;
					}
				}
			}

			if(m_isExcluded == true && m_Oconditions["include-url-is"] != null)
			{
				for(var m_inner = 0; m_inner < m_Oconditions["include-url-is"].length; m_inner++)
				{
					if(doesUrlIs(p_Surl, m_Oconditions["include-url-is"][m_inner]) == true)
					{
						m_isExcluded = false;
						break;
					}
				}
			}
		}

		// finally we know whether to apply the modifications or not ... "lets do it"
		if(m_isExcluded == false)
		{
			for(var m_inner = 0; m_inner < m_Oactions["apply-mod"].length; m_inner++)
			{			
				if(m_Oactions["apply-mod"][m_inner]["style"] != null)
				{
					addGlobalStyle(m_Oactions["apply-mod"][m_inner]["style"]);	
				}	
				else if(m_Oactions["apply-mod"][m_inner]["xpath"] != null)
				{
					applyMod(m_Oactions["apply-mod"][m_inner]["xpath"], m_Oactions["apply-mod"][m_inner]["modification"]);
				}
				else if(m_Oactions["apply-mod"][m_inner]["move"] != null)
				{
					applyMove(m_Oactions["apply-mod"][m_inner]["move"][0], m_Oactions["apply-mod"][m_inner]["move"][1]);
				}				
			}
		}
	}
}