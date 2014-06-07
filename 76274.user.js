// =============================================================================
// Auto-Reload 
// Version: R01.00.00 BETA
// Copyright (c) 2007, Gaafer Goreish 
// email: goreish@gmail.com
// http://www.knowledgeexcellence.com 
// =============================================================================
// Revision History:
// 03/12/2007   Beta Release D01.00.00
// 02/15/2008        Release R01.00.00
//-----------------------------------------------------------------------------
// USE AT YOUR OWN RISK
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESSED 
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
// SOFTWARE.
// -----------------------------------------------------------------------------
// This is a Greasemonkey user script.
// -----------------------------------------------------------------------------
// General information and configuration settings
// 
// Included in any web page using HTTP
// Excluded from any web page using HTTPS
//
// The plug-in is disabled by default and only its Enable/Disable button appears
// at the top of a page when it is loaded for the first time. 
//
// Enables Auto Reloading of any webpage per user configured timeout.
//  - Default Timeout configuration is Zero and timer is inactive 
//  - Timeout configuration ranges
//      - Hours:   0-23 
//      - Minutes: 0-59
//      - Seconds: 0-59
//
// Provide options for both Foreground and Background Reloads.
//  - Foreground reloads is similar to clicking refresh on the browser.  
//  - Background reloads are silent and do not make any changes to web page.
//  - Background reloads may require disabling page resident Timers 
//       - A prompt is displayed to provide page resident Timer ID to disable 
//       - If the Timer ID is not known click cancel to enter it later.
//       - If no timers exist enter NONE to prevent future prompts 
//
// Utilize browser cookies to preserve user configuration.
//  - Cookies are identified by visited hosts and URL path.
//  - Cookies are set to expire after 120 days from last update. 
//  - Configuration preserved in cookies includes:
//      - Disable/Enable Extension
//      - Reload type, Foreground/Background
//      - Timer ID to disable when using Background reload type 
//      - Timeout configuration 
//      - Auto-Reload removal from a specific page 
//
// -----------------------------------------------------------------------------
// ==UserScript==
// @name           Auto-Reload 
// @namespace      http://www.knowledgeexcellence.com 
// @description    Auto Reloads Web Pages at configurable intervals  
// @include        http://www.irctc.co.in*
// @include        https://www.irctc.co.in*
// ==/UserScript==
// =============================================================================

/** Stores all the script used to operate the plug-in extension */
var ZeScript     = '';

/** Auto-Reload version */
ZeScript += '\n const PR_VERSION       = "R01.00.00 BETA";';

/** Remove Auto-Reload Service */
ZeScript += '\n const PR_REMOVE        = "X";';
ZeScript += '\n const PR_REMOVED       = "PR_REMOVED";';
ZeScript += '\n const PR_INSTALLED     = "PR_INSTALLED";';

/** Reload Enable/Disable control */
ZeScript += '\n const PR_DISABLE       = "-";';
ZeScript += '\n const PR_ENABLE        = "+";';
ZeScript += '\n const PR_DEFAULTSTATE  = PR_ENABLE;';

/** Page Reload Type */
ZeScript += '\n const PR_FOREGROUND    = "Foreground";';
ZeScript += '\n const PR_BACKGROUND    = "Background";';
ZeScript += '\n const PR_DEFAULTTYPE   = PR_FOREGROUND;';

/** Reload Time Boundary Values */
ZeScript += '\n const PR_MINVALUE      = 0;';
ZeScript += '\n const PR_DEFAULTHOURS  = PR_MINVALUE;';
ZeScript += '\n const PR_MAXHOURS      = 23;';
ZeScript += '\n const PR_DEFAULTMINS   = PR_MINVALUE;';
ZeScript += '\n const PR_MAXMINS       = 59;';
ZeScript += '\n const PR_DEFAULTSECS   = PR_MINVALUE;';
ZeScript += '\n const PR_MAXSECS       = 59;';

/** General CSS style definitions */
ZeScript += '\n const PR_DEFAULT_FONT   = " font: 11px verdana, tahoma, geneva, lucida, arial, helvetica, sans-serif;"';
ZeScript += '\n const PR_DEFAULT_BORDER = " border: 1px double;"';
ZeScript += '\n const PR_INPUT_BORDER   = " border: 1px inset;"';
ZeScript += '\n const PR_TABLE_BG_COLOR = " background-color: #C0C0C0;"';
ZeScript += '\n const PR_TABLE_FG_COLOR = " color: #000000;"';
ZeScript += '\n const PR_INPUT_BG_COLOR = " background-color: #FFFFFF;"';
ZeScript += '\n const PR_INPUT_FG_COLOR = " color: #000000;"';
ZeScript += '\n const PR_BUTT_BG_COLOR = " color: #CCCCCC;"';
ZeScript += '\n const PR_BUTT_FG_COLOR = " color: #000000;"';
ZeScript += '\n const PR_BG_TIMER      = " background-color: #C0C0C0;"';
ZeScript += '\n const PR_FG_INACTIVE   = " color: #808080;"';
ZeScript += '\n const PR_FG_ACTIVE     = " color: #FFFFF0;"';
ZeScript += '\n const PR_FG_WARN       = " color: #FFFF00;"';
ZeScript += '\n const PR_FG_ALERT      = " color: #DC143C;"';
ZeScript += '\n const PR_TABLECSS = PR_TABLE_BG_COLOR+PR_TABLE_FG_COLOR+PR_DEFAULT_BORDER+PR_DEFAULT_FONT';
ZeScript += '\n const PR_TEXTCSS = PR_TABLE_BG_COLOR+PR_TABLE_FG_COLOR+PR_DEFAULT_FONT';
ZeScript += '\n const PR_BUTTONCSS = PR_BUTT_BG_COLOR+PR_BUTT_FG_COLOR+PR_DEFAULT_BORDER+PR_DEFAULT_FONT';
ZeScript += '\n const PR_INPUTCSS = PR_INPUT_BG_COLOR+PR_INPUT_FG_COLOR+PR_INPUT_BORDER+PR_DEFAULT_FONT';
ZeScript += '\n const PR_TIMER_DISABLED = PR_BG_TIMER+PR_FG_INACTIVE+PR_DEFAULT_FONT';
ZeScript += '\n const PR_TIMER_ACTIVE   = PR_BG_TIMER+PR_FG_ACTIVE+PR_DEFAULT_FONT';
ZeScript += '\n const PR_TIMER_WARN     = PR_BG_TIMER+PR_FG_WARN+PR_DEFAULT_FONT';
ZeScript += '\n const PR_TIMER_ALERT    = PR_BG_TIMER+PR_FG_ALERT+PR_DEFAULT_FONT';

/** Stores Service Removal Flag */
ZeScript += '\n var PR_serviceFlag     = PR_INSTALLED;';
ZeScript += '\n var PR_serButtonName   = PR_REMOVE;';

/** Stores Enable/Disable control value */
ZeScript += '\n var PR_ctlButtonName = PR_DEFAULTSTATE;';

/** Stores current set reload type */
ZeScript += '\n var PR_rldButtonName = PR_DEFAULTTYPE;';

/** Stores current page resident timer id */
ZeScript += '\n var PR_pageTimer     = "???";';

/** Stores current Hours Set*/
ZeScript += '\n var PR_hoursSet = PR_DEFAULTHOURS;';  

/** Stores current Minutes Set*/
ZeScript += '\n var PR_minSet = PR_DEFAULTMINS;';

/** Stores current Seconds Set*/
ZeScript += '\n var PR_secSet = PR_DEFAULTSECS;';

/** Stores original values before user updates */
ZeScript += '\n var PR_orgValue      = 0;';

/** Stores timeout in seconds */
ZeScript += '\n var PR_timeoutSecs   = 0;';

/** Stores the calculated expire time */
ZeScript += '\n var PR_expireTime    = 0;';

/** Stores the timer counter */
ZeScript += '\n var PR_timerTicks    = 0;';

/** Stores the timer display */
ZeScript += '\n var PR_counter ="Reload Time Remaining [ 00:00:00 ] sec";'

/** Stores reload callback timer pointer */
ZeScript += '\n var PR_reloadCtl     = null;';

/** Stores display callback timer pointer */
ZeScript += '\n var PR_displayCtl    = null;';

/** Adds a button based on input parameters */
ZeScript += '\n function PR_addButton(id, clickHandler, name, etc){';
ZeScript += '\n var b=document.createElement("input");';
ZeScript += '\n b.setAttribute("type", "button");';
ZeScript += '\n b.setAttribute("id", id);';
ZeScript += '\n b.setAttribute("onclick", clickHandler);';
ZeScript += '\n b.setAttribute("value", name);';
ZeScript += '\n b.setAttribute("title", etc);';
ZeScript += '\n b.setAttribute("style", PR_BUTTONCSS);';
ZeScript += '\n return b;';
ZeScript += '\n }';

/** Adds a text input box based on input parameters */
ZeScript += '\n function PR_addText(id, maxlen, size, dval, etc){';
ZeScript += '\n var i=document.createElement("input");';
ZeScript += '\n i.setAttribute("type","text");';
ZeScript += '\n i.setAttribute("id",id);';
ZeScript += '\n i.setAttribute("maxlength", maxlen);';
ZeScript += '\n i.setAttribute("size", size);';
ZeScript += '\n i.setAttribute("value", dval);';
ZeScript += '\n i.setAttribute("onfocus", "PR_orgValue=this.value");';
ZeScript += '\n i.setAttribute("onchange", "PR_handleInput(this.id)");';
ZeScript += '\n i.setAttribute("title", etc);';
ZeScript += '\n i.setAttribute("style", PR_INPUTCSS);';
ZeScript += '\n return i;';
ZeScript += '\n }';

/** Disables original page resident timer*/
ZeScript += '\n function PR_disableClock(){'
ZeScript += '\n if(PR_pageTimer == "???" || PR_pageTimer == null ){'
ZeScript += '\n PR_pageTimer = prompt("Enter Timer ID ", "");'
ZeScript += '\n if(PR_pageTimer != null){'
ZeScript += '\n PR_pageTimer = PR_pageTimer.replace(/^\\s+/,"").replace(/\\s+$/, "");'
ZeScript += '\n PR_pageTimer=="PR_timerDisplay"? PR_pageTimer="???": PR_pageTimer;'
ZeScript += '\n PR_pageTimer==""? PR_pageTimer="???": PR_pageTimer;'
ZeScript += '\n }else{'
ZeScript += '\n PR_pageTimer="???";'
ZeScript += '\n }'
ZeScript += '\n }'
ZeScript += '\n if(PR_pageTimer != "???" && PR_pageTimer.toUpperCase() != "NONE"){'
ZeScript += '\n var orgClock = document.getElementById(PR_pageTimer);'
ZeScript += '\n if(orgClock != null){'
ZeScript += '\n var disClock = document.createElement("span");'
ZeScript += '\n disClock.id = "PR_"+PR_pageTimer;'
ZeScript += '\n disClock.innerHTML = "["+PR_pageTimer+"] Disabled &nbsp &nbsp";'
ZeScript += '\n orgClock.parentNode.replaceChild(disClock, orgClock);'
ZeScript += '\n }'
ZeScript += '\n }'
ZeScript += '\n }'

/** Enables original page resident timer*/
ZeScript += '\n function PR_enableClock(){'
ZeScript += '\n if(PR_pageTimer != "???" && PR_pageTimer.toUpperCase() != "NONE"){'
ZeScript += '\n var disClock = document.getElementById("PR_"+PR_pageTimer);'
ZeScript += '\n if(disClock != null){'
ZeScript += '\n var enClock = document.createElement("span");'
ZeScript += '\n enClock.id = PR_pageTimer;'
ZeScript += '\n enClock.innerHTML = "["+PR_pageTimer+"] Enabled &nbsp &nbsp";'
ZeScript += '\n disClock.parentNode.replaceChild(enClock, disClock);'
ZeScript += '\n }'
ZeScript += '\n }'
ZeScript += '\n }'

/** Control changing the reload type configuration */
ZeScript += '\n function PR_chgReloadType(){'
ZeScript += '\n var type=document.getElementById("PR_reloadType");'
ZeScript += '\n if(type.value == PR_FOREGROUND){'
ZeScript += '\n PR_disableClock();'
ZeScript += '\n type.value = PR_BACKGROUND;'
ZeScript += '\n } else {'
ZeScript += '\n PR_enableClock();'
ZeScript += '\n type.value = PR_FOREGROUND;'
ZeScript += '\n }'
ZeScript += '\n PR_rldButtonName = type.value;'
ZeScript += '\n PR_saveCookie();'
ZeScript += '\n }'

/** Controls enabling and disabling page reload controls */ 
ZeScript += '\n function PR_pluginControler(){'
ZeScript += '\n var ctl=document.getElementById("control");'
ZeScript += '\n PR_getCookie();'
ZeScript += '\n if(ctl.value == PR_DISABLE){'
ZeScript += '\n ctl.value=PR_ENABLE;'
ZeScript += '\n PR_ctlButtonName = PR_ENABLE;'
ZeScript += '\n PR_disablePlugin();'
ZeScript += '\n }else {' 
ZeScript += '\n ctl.value=PR_DISABLE;'
ZeScript += '\n PR_ctlButtonName = PR_DISABLE;'
ZeScript += '\n PR_enablePlugin();'
ZeScript += '\n }'
ZeScript += '\n PR_saveCookie();'
ZeScript += '\n }'

/** Handles validating user input */
ZeScript += '\n function PR_handleInput(id){'
ZeScript += '\n var src=document.getElementById(id);'
ZeScript += '\n var input=src.value;'
ZeScript += '\n var reCalc=(PR_orgValue!=src.value);'
ZeScript += '\n if(input=="" || isNaN(input)){'
ZeScript += '\n PR_handleError(src);'
ZeScript += '\n reCalc=false;'
ZeScript += '\n }else{'
ZeScript += '\n var value=parseInt(input);' 
ZeScript += '\n if( id == "timerHour" ){'
ZeScript += '\n if( value < PR_MINVALUE || value > PR_MAXHOURS){'
ZeScript += '\n PR_handleError(src);'
ZeScript += '\n reCalc=false;'
ZeScript += '\n }'
ZeScript += '\n }else{'
ZeScript += '\n if( value < PR_MINVALUE || value > PR_MAXMINS){'
ZeScript += '\n PR_handleError(src);'
ZeScript += '\n reCalc=false;'
ZeScript += '\n }' 
ZeScript += '\n }'
ZeScript += '\n if(reCalc==true){'
ZeScript += '\n PR_calcTimeout();'
ZeScript += '\n }'
ZeScript += '\n }'
ZeScript += '\n }'

/** Handles error in user input */
ZeScript += '\n function PR_handleError(src){'
ZeScript += '\n var save=parseInt(PR_orgValue*1);'
ZeScript += '\n src.style.background="red";'
ZeScript += '\n alert("Error: " + src.title);'
ZeScript += '\n src.value=save;'
ZeScript += '\n PR_orgValue=save;'
ZeScript += '\n src.style.background="white";'
ZeScript += '\n }'

/** Clears and sets callback timers in the plug-in */
ZeScript += '\n function PR_setCall(func, delay){'
ZeScript += '\n switch(func){'
ZeScript += '\n case "PR_pageReload()":'
ZeScript += '\n clearTimeout(PR_reloadCtl);'
ZeScript += '\n PR_reloadCtl=setTimeout(func, delay);'
ZeScript += '\n break;'
ZeScript += '\n case "PR_displayTimer()":'
ZeScript += '\n clearTimeout(PR_displayCtl);'
ZeScript += '\n PR_displayCtl=setTimeout(func, delay);'
ZeScript += '\n break;'
ZeScript += '\n case "PR_calcTimeout()":'
ZeScript += '\n setTimeout(func, delay);'
ZeScript += '\n break;'
ZeScript += '\n }'
ZeScript += '\n }'

/** Create all plug-in controls and input */
ZeScript += '\n function PR_pluginInit(){';
ZeScript += '\n var tbl=null;';
ZeScript += '\n var b = null;';
ZeScript += '\n function addTD(a, n){';
ZeScript += '\n var td=document.createElement("td");';
ZeScript += '\n td.setAttribute("align", a);';
ZeScript += '\n td.appendChild(n);';
ZeScript += '\n return td;';
ZeScript += '\n }';
ZeScript += '\n tbl=document.createElement("table");';
ZeScript += '\n tbl.setAttribute("width","100%");';
ZeScript += '\n tbl.setAttribute("cellpadding","0");';
ZeScript += '\n tbl.setAttribute("style", PR_TABLECSS);';
ZeScript += '\n var tr=document.createElement("tr");';
ZeScript += '\n b= PR_addButton("control", "PR_pluginControler()", PR_ctlButtonName, "Enables/Disables The Reload Plug-in");';
ZeScript += '\n tr.appendChild(addTD("center", b));';
ZeScript += '\n b= PR_addButton("PR_reloadType", "PR_chgReloadType()", PR_rldButtonName, "Changes The Reload Type");';
ZeScript += '\n tr.appendChild(addTD("center", b));';
ZeScript += '\n b= PR_addButton("reloadButton", "PR_pageReload()", "Reload", "Performs A Manual Reload");';
ZeScript += '\n tr.appendChild(addTD("center", b));';
ZeScript += '\n var tt=document.createElement("span");';
ZeScript += '\n tt.innerHTML = "Hours "';
ZeScript += '\n tt.setAttribute("style", PR_TEXTCSS);';
ZeScript += '\n tr.appendChild(addTD("right", tt));';
ZeScript += '\n b= PR_addText("timerHour", "2", "2", PR_hoursSet, "Valid Range: "+PR_MINVALUE+"-"+PR_MAXHOURS+" Hours");';
ZeScript += '\n tr.appendChild(addTD("center", b));';
ZeScript += '\n tt=document.createElement("span");';
ZeScript += '\n tt.innerHTML = "Minutes "';
ZeScript += '\n tt.setAttribute("style", PR_TEXTCSS);';
ZeScript += '\n tr.appendChild(addTD("right", tt));';
ZeScript += '\n b= PR_addText("timerMin", "2", "2", PR_minSet, "Valid Range: "+PR_MINVALUE+"-"+PR_MAXMINS+" Minutes");';
ZeScript += '\n tr.appendChild(addTD("center", b));';
ZeScript += '\n tt=document.createElement("span");';
ZeScript += '\n tt.innerHTML = "Seconds"';
ZeScript += '\n tt.setAttribute("style", PR_TEXTCSS);';
ZeScript += '\n tr.appendChild(addTD("right", tt));';
ZeScript += '\n b=  PR_addText("timerSec", "2", "2", PR_secSet, "Valid Range: "+PR_MINVALUE+"-"+PR_MAXSECS+" Seconds");';
ZeScript += '\n tr.appendChild(addTD("center", b));';
ZeScript += '\n var sp=document.createElement("span");';
ZeScript += '\n sp.setAttribute("id","PR_timerDisplay");';
ZeScript += '\n sp.setAttribute("style", PR_TIMER_DISABLED);';
ZeScript += '\n sp.innerHTML=PR_counter;';
ZeScript += '\n tr.appendChild(addTD("right", sp));';
ZeScript += '\n b= PR_addButton("PR", "PR_about()", "About", "About Auto-Reload plugin");';
ZeScript += '\n tr.appendChild(addTD("center", b));';
ZeScript += '\n b= PR_addButton("service", "PR_confirmRemove()", PR_serButtonName, "Removes Auto-Reload Plugin from current page");';
ZeScript += '\n tr.appendChild(addTD("center", b));';
ZeScript += '\n tbl.appendChild(tr);';
ZeScript += '\n return tbl;';
ZeScript += '\n }';

/** Create plug-in with control button only */
ZeScript += '\n function PR_pluginDeinit(){';
ZeScript += '\n var b = PR_addButton("control", "PR_pluginControler()", PR_ctlButtonName, "Enables/Disables The Reload Plugin"); ';
ZeScript += '\n return b;';
ZeScript += '\n }';

/** Displays information about the plug-in */
ZeScript += '\n function PR_about(){'
ZeScript += '\n var about  = "\\n _____________ Auto-Reload ____________";'
ZeScript += '\n about     += "\\n              Version: "+PR_VERSION;'
ZeScript += '\n about     += "\\n       Copyright (c) 2007, Gaafer Goreish"'
ZeScript += '\n about     += "\\n           e-mail : goreish@gmail.com";'
ZeScript += '\n about     += "\\n       http://www.knowledgeexcellence.com";'
ZeScript += '\n about     += "\\n ________ USE AT YOUR OWN RISK _______";'
ZeScript += '\n alert(about);'
ZeScript += '\n }'

/** Saves the current input values to plug-in cookie */
ZeScript += '\n function PR_saveCookie(){'
ZeScript += '\n var c_name  = "PR_cookie_start"+window.location.hostname+"=";'
ZeScript += '\n var c_exp   = new Date();'
ZeScript += '\n c_exp.setDate(c_exp.getDate()+120 );'
ZeScript += '\n var c_value = ""; '
ZeScript += '\n c_value += "service="+PR_serviceFlag+":"; '
ZeScript += '\n c_value += "control="+PR_ctlButtonName+":"; '
ZeScript += '\n c_value += "PR_reloadType="+PR_rldButtonName+":"; '
ZeScript += '\n c_value += "timerHour="+PR_hoursSet+":";'
ZeScript += '\n c_value += "timerMin="+PR_minSet+":";'
ZeScript += '\n c_value += "timerSec="+PR_secSet+":";'
ZeScript += '\n c_value += "pageTimerId="+PR_pageTimer;'
ZeScript += '\n var cookie = c_name + escape(c_value) +"=PR_cookie_end;expires="+c_exp.toGMTString(); '
ZeScript += '\n document.cookie = cookie;'
ZeScript += '\n }'

/** Gets the saved input values from the plug-in cookie */
ZeScript += '\n function PR_getCookie(){'
ZeScript += '\n var c_name="PR_cookie_start"+window.location.hostname+"=";'
ZeScript += '\n var c_start=document.cookie.indexOf(c_name);'
ZeScript += '\n if(c_start != -1){'
ZeScript += '\n c_start += c_name.length;'
ZeScript += '\n var c_end = document.cookie.indexOf("=PR_cookie_end", c_start);'
ZeScript += '\n var cookie= unescape(document.cookie.substring(c_start, c_end));'
ZeScript += '\n var e = new Array();'
ZeScript += '\n var p = new Array();'
ZeScript += '\n e = cookie.split(":");'
ZeScript += '\n for(idx=0; idx< e.length; idx++){'
ZeScript += '\n p = e[idx].split("=");'
ZeScript += '\n if(p.length==2){'
ZeScript += '\n switch(p[0]){'
ZeScript += '\n case "service":'
ZeScript += '\n PR_serviceFlag=p[1]';
ZeScript += '\n break;'
ZeScript += '\n case "control":'
ZeScript += '\n PR_ctlButtonName=p[1];'
ZeScript += '\n break;'
ZeScript += '\n case "PR_reloadType":'
ZeScript += '\n PR_rldButtonName=p[1]; '
ZeScript += '\n break;'
ZeScript += '\n case "timerHour":'
ZeScript += '\n PR_hoursSet=p[1];'
ZeScript += '\n break;'
ZeScript += '\n case "timerMin":'
ZeScript += '\n PR_minSet=p[1];'
ZeScript += '\n break;'
ZeScript += '\n case "timerSec":'
ZeScript += '\n PR_secSet=p[1];'
ZeScript += '\n break;'
ZeScript += '\n case "pageTimerId":'
ZeScript += '\n PR_pageTimer=p[1];'
ZeScript += '\n break;'
ZeScript += '\n }'
ZeScript += '\n }'
ZeScript += '\n }'
ZeScript += '\n }'
ZeScript += '\n }'

/** Confirms Removal request of the plug-in */
ZeScript += '\n function PR_confirmRemove(){';
ZeScript += '\n var confirmed=confirm("Remove Auto-Reload from current Page?");';
ZeScript += '\n if(confirmed){'
ZeScript += '\n PR_removePlugin();';
ZeScript += '\n }'
ZeScript += '\n }'

/** Removes the plug-in */
ZeScript += '\n function PR_removePlugin(){';
ZeScript += '\n PR_serviceFlag=PR_REMOVED';
ZeScript += '\n PR_ctlButtonName = PR_ENABLE;'
ZeScript += '\n PR_disablePlugin();'
ZeScript += '\n PR_saveCookie();'
ZeScript += '\n var element=document.getElementById("PR_plugin");'
ZeScript += '\n if(element != null){'
ZeScript += '\n element.parentNode.removeChild(element);';
ZeScript += '\n }'
ZeScript += '\n var zescript=document.getElementById("PR_pluginScript");'
ZeScript += '\n if(zescript != null){'
ZeScript += '\n zescript.parentNode.removeChild(zescript);';
ZeScript += '\n }'
ZeScript += '\n }'

/** Creates the plug-in */
ZeScript += '\n function PR_createPlugin(){';
ZeScript += '\n PR_getCookie();'
ZeScript += '\n if(PR_serviceFlag==PR_REMOVED){';
ZeScript += '\n PR_removePlugin();';
ZeScript += '\n }else{'
ZeScript += '\n var element=document.getElementById("PR_plugin");'
ZeScript += '\n if(element == null){'
ZeScript += '\n var addTag=document.createElement("span");';
ZeScript += '\n addTag.setAttribute("id","PR_plugin");';
ZeScript += '\n addTag.innerHTML="Auto-Reload Plugin";';
ZeScript += '\n var orgBody=document.getElementsByTagName("body")[0];'
ZeScript += '\n orgBody.parentNode.insertBefore(addTag, orgBody);'
ZeScript += '\n }'
ZeScript += '\n }'
ZeScript += '\n }'

/** Inserts the plug-in into the current page */
ZeScript += '\n function PR_insertPlugin(){'
ZeScript += '\n if(PR_ctlButtonName == PR_DISABLE) {'
ZeScript += '\n PR_enablePlugin();'
ZeScript += '\n }else{'
ZeScript += '\n PR_disablePlugin();'
ZeScript += '\n }'
ZeScript += '\n }'

/** Sets the plug-in to disabled state */
ZeScript += '\n function PR_disablePlugin(){'
ZeScript += '\n var element=document.getElementById("PR_plugin");'
ZeScript += '\n if(element != null){'
ZeScript += '\n clearTimeout(PR_displayCtl);'
ZeScript += '\n var addSpan=document.createElement("SPAN");'
ZeScript += '\n addSpan.setAttribute("id", "PR_plugin");'
ZeScript += '\n addSpan.appendChild(PR_pluginDeinit());'
ZeScript += '\n element.parentNode.replaceChild(addSpan, element);'
ZeScript += '\n }'
ZeScript += '\n }'

/** Sets the plug-in to enabled state */
ZeScript += '\n function PR_enablePlugin(){'
ZeScript += '\n var element= element=document.getElementById("PR_plugin");'
ZeScript += '\n if(element != null){'
ZeScript += '\n var addDiv=document.createElement("DIV");'
ZeScript += '\n addDiv.setAttribute("id", "PR_plugin");'
ZeScript += '\n addDiv.appendChild(PR_pluginInit());'
ZeScript += '\n element.parentNode.replaceChild(addDiv, element);'
ZeScript += '\n if(PR_rldButtonName == PR_FOREGROUND){'
ZeScript += '\n PR_enableClock();'
ZeScript += '\n } else {'
ZeScript += '\n PR_disableClock();'
ZeScript += '\n }'
ZeScript += '\n PR_calcTimeout();'
ZeScript += '\n }'
ZeScript += '\n }'

/** Calculates remaining timeout */
ZeScript += '\n function PR_calcTimeout(){'
ZeScript += '\n var hrs=document.getElementById("timerHour");'
ZeScript += '\n var mins=document.getElementById("timerMin");'
ZeScript += '\n var secs=document.getElementById("timerSec");'
ZeScript += '\n isNaN(hrs.value)?hrs.value=PR_DEFAULTHOURS:hrs;'
ZeScript += '\n isNaN(mins.value)?mins.value=PR_DEFAULTMINS:mins;'
ZeScript += '\n isNaN(secs.value)?secs.value=PR_DEFAULTSECS:secs;'
ZeScript += '\n PR_hoursSet = parseInt(hrs.value*1);'
ZeScript += '\n PR_minSet = parseInt(mins.value*1);'
ZeScript += '\n PR_secSet = parseInt(secs.value*1);'
ZeScript += '\n PR_saveCookie();'
ZeScript += '\n PR_timeoutSecs=(PR_hoursSet*3600)+(PR_minSet*60)+(PR_secSet*1);'
ZeScript += '\n PR_expireTime=new Date().getTime()/1000; '
ZeScript += '\n PR_expireTime+=PR_timeoutSecs; '
ZeScript += '\n PR_timerTicks=PR_timeoutSecs+1; '
ZeScript += '\n PR_setCall("PR_displayTimer()", 0);'
ZeScript += '\n }'

/** Displays the timer on the page*/
ZeScript += '\n function PR_displayTimer(){'
ZeScript += '\n var secs = 0;'
ZeScript += '\n var mins = 0;'
ZeScript += '\n var hrs  = 0;'
ZeScript += '\n var sp =document.getElementById("PR_timerDisplay");'
ZeScript += '\n PR_counter ="Reload Time Remaining [ ";'
ZeScript += '\n if(PR_timeoutSecs==0 && PR_ctlButtonName == PR_DISABLE){' 
ZeScript += '\n sp.setAttribute("style", PR_TIMER_DISABLED);';
ZeScript += '\n PR_counter=PR_counter+"00:00:00 ] sec";'
ZeScript += '\n sp.innerHTML = PR_counter;'
ZeScript += '\n }else if(PR_updateTimer()==true){'
ZeScript += '\n hrs=aZero( parseInt(PR_timerTicks/3600) );'
ZeScript += '\n mins=aZero( parseInt((PR_timerTicks-(hrs*3600))/60) );'
ZeScript += '\n secs=aZero( parseInt(PR_timerTicks-(hrs*3600)-(mins*60)));'
ZeScript += '\n PR_counter=PR_counter+hrs+":"+mins+":"+secs+" ] sec";'
ZeScript += '\n if(hrs==0 && mins<10){'
ZeScript += '\n sp.setAttribute("style", PR_TIMER_ALERT);';
ZeScript += '\n sp.innerHTML = PR_counter;'
ZeScript += '\n }else if(hrs==0 && mins<30){'
ZeScript += '\n sp.setAttribute("style", PR_TIMER_WARN);';
ZeScript += '\n sp.innerHTML = PR_counter;'
ZeScript += '\n }else{ '
ZeScript += '\n sp.setAttribute("style", PR_TIMER_ACTIVE);';
ZeScript += '\n sp.innerHTML = PR_counter;'
ZeScript += '\n }'
ZeScript += '\n PR_setCall("PR_displayTimer()", 1000);'
ZeScript += '\n }'
ZeScript += '\n function aZero(num){'
ZeScript += '\n if(num<10){'
ZeScript += '\n num="0"+num;'
ZeScript += '\n }'
ZeScript += '\n return num;'
ZeScript += '\n }'
ZeScript += '\n }'

/** Updates the countdown timer and check for expiration */
ZeScript += '\n function PR_updateTimer(){'
ZeScript += '\n var cont=true; '
ZeScript += '\n var currentTime =new Date().getTime()/1000; '
ZeScript += '\n if(PR_expireTime <= currentTime || PR_timeoutSecs ==0){'
ZeScript += '\n PR_setCall("PR_pageReload()", 0);'
ZeScript += '\n cont = false;'
ZeScript += '\n }else{ '
ZeScript += '\n PR_timerTicks=PR_expireTime-currentTime;'
ZeScript += '\n }'
ZeScript += '\n return cont;'
ZeScript += '\n }'

/** Performs a page reload per configuration */
ZeScript += '\n function PR_pageReload(){'
ZeScript += '\n var type=document.getElementById("PR_reloadType");'
ZeScript += '\n if(type != null && type.value == PR_FOREGROUND || '
ZeScript += '\n typeof XMLHttpRequest == "undefined"){'
ZeScript += '\n location.reload();'
ZeScript += '\n }else{'
ZeScript += '\n function callback(){/*Do Nothing*/ }'
ZeScript += '\n var url = document.URL;'
ZeScript += '\n var req= new XMLHttpRequest();'
ZeScript += '\n req.open("GET", url, true);'
ZeScript += '\n req.onreadystatechange = callback;'
ZeScript += '\n req.send(null);'
ZeScript += '\n PR_setCall("PR_calcTimeout()", 0);'
ZeScript += '\n }'
ZeScript += '\n }'

/** Initialization call */
ZeScript += '\n PR_createPlugin();'
ZeScript += '\n PR_insertPlugin();'

/** Auto-Reload not allowed to run in HTTPS pages */
var url = document.URL;
var https = url.indexOf("https");
if(https != -1){
return;
}

/** Installs the script into current page */
var script = document.createElement("script");
script.setAttribute("id", "PR_pluginScript");
script.setAttribute("language", "JAVASCRIPT");
script.setAttribute("type", "text/javascript");
script.innerHTML=ZeScript;
var head=document.getElementsByTagName("head")[0];
head.appendChild(script);
