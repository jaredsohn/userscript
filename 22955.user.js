// ==UserScript==
// @name           Malware Script Detector v 1.1
// @namespace      http://yehg.co.nr
// @author		 d0ubl3_h3lix <http://yehg.co.nr>
// @description    Detect &amp; Alert Malicious JavaScript : XSSProxy, XSS-Shell, AttackAPI, Beef. But No guarantee for full prevention of XSS-Injection threats. Many ways to bypass it such as via iframes but I'm sure it protects you from casual attackers.The main objective of developing Malware Script Detector is that I'm so much afraid of XSSProxy, XSS-Shell, AttackAPI, Beef and I want to detect them. Malicious sites intentionally embed them. Firefox XSS Warning addon can't check this. Added more signatures detection.
// @include     *
// @exclude		localhost   
// ==/UserScript==

// If web developer has implemented Malware Script Detector Standalone version, 
// Disable checking

if (!unsafeWindow.MalwareScriptDetector)
{

// AttackAPI uses AttackAPI object
// BeEF uses beef_onload function

if(unsafeWindow.AttackAPI)
{
	unsafeWindow.AttackAPI = null;
	alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: AttackAPI\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");
}

if(unsafeWindow.beef_onload)
{
	unsafeWindow.beef_onload = function(){};
	unsafeWindow.beef_url = '';
	unsafeWindow.return_result = function(){};
	unsafeWindow.include = function(){};
      unsafeWindow.key_history = null;
	unsafeWindow.magic_seq = null;
	unsafeWindow.catch_key = null;
	alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: BeEF\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");
}
if ( typeof(return_result)== "function" && typeof(include)== "function" && typeof(save_page)== "function" )
{
	alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: BeEF\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");
}
if  ( (/(BeEFSession|hook\/return\.php\?BeEFSesion|hook\/autorun\.js\.php\?BeEFSession|hook\/command\.php\?BeEFSession|hook\/return\.php\?BeEFSession).*/i).test(document.location) )
{
	alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: BeEF\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");
}

// Let's detect XSS-Shell
// Left lots of function to avoid false alarms
// Below are suspicious functions even if target web sites don't use malware scripts
if ( (unsafeWindow.attachKeylogger) || (unsafeWindow.cmdDoS) || (unsafeWindow.cmdCrash) || (unsafeWindow.getInternalIP) || (unsafeWindow.getClipboard) || (unsafeWindow.logMouse))
{
	unsafeWindow.attachKeylogger = function(){};
	unsafeWindow.cmdDoS = function(){};
	unsafeWindow.cmdCrash= function(){};
	unsafeWindow.getInternalIP= function(){};
	unsafeWindow.getClipboard= function(){};
	unsafeWindow.logMouse= function(){};
	alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: XSS-Shell\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");	
	
}

// Let's detect XSS-Proxy
// Problem: XSS-Proxy uses innocent function names 
// So, we need to look inside their functions for effective detection
// May cause false alerts

if (unsafeWindow.showDoc)
{
	var ishowDoc = unsafeWindow.showDoc + '';
	if((/(nodesLen|snd0Back|sendBack|serverLen).*/i).test(ishowDoc))
	{
		alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: XSS-Proxy\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");		
	}	
	
}else if (unsafeWindow.scriptRequest)
{
	var iscriptRequest = unsafeWindow.scriptRequest + '';
	if((/(parms|scriptTag).*/i).test(iscriptRequest) && (unsafeWindow.onerror==unsafeWindow.reportError))
	{
		alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: XSS-Proxy\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");		
	}		
}

// Next we search for 'xss' keyword in script src

var scr = document.getElementsByTagName("script");
if(scr.length>=1)
{

		for(var i=0;i<=scr.length-1;i++)
		{
			if (document.getElementsByTagName("script")[i].src != '')

			{
			      var src = document.getElementsByTagName("script")[i].src; 
				if((/(xss2\.js|xss1\.js|xss\.js|xss\-proxy|xssproxy|XSS\-Proxy[\s\S\w\W]*\.pl).*/i).test(src))
					
				{
				    alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: XSS-Proxy\n\nSource:" + src + "\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");
				}
				else if((/(xssshell|xss\-shell|xss_shell).*/i).test(src))				
				{
				    alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: XSS-Shell\n\nSource:" + src + "\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");						
				}				
				else if((/(beef\.js|beefmagic\.js).*/i).test(src))				
				{
				    alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: BeEF\n\nSource:" + src + "\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");

				}				
				else if((/(attackapi|attackapi\-standalone).*/i).test(src))
				{
				    alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: AttackAPI\n\nSource:" + src + "\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");

				}				
				else if ((src.indexOf("xss") > 0) || (src.indexOf("evilscript") > 0))
				{
				    alert("Warning:\n\nThis site may have malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: Customized XSS Malware\n\nSource:" + src + "\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");						
				}
			}
		}

}


// Next we search for 'xss|<script|<iframe' keyword in document.location  to detect something like "><script>
// I know it's basic; but at least it works

var xss_path = document.location + '';

if  ((xss_path.indexOf("javascript:") > 0) ||(xss_path.indexOf("%3Cscript%3E") > 0) || (xss_path.indexOf("%3Ciframe%3E") > 0)  )
{
  alert("Warning:\n\nThis site URL may contain possible malicious scripts hosted or injected!\n\nSolutions: Close this window, Disable JavaScript\n\nDetected Malware: XSS URL Injection Malware\n\nSource:" + xss_path + "\n\n----------------------------------\nMalware Script Detector\nby d0ubl3_h3lix\nhttp://yehg.co.nr");							
}

	
} // end of if (!unsafeWindow.MalwareScriptDetector)


