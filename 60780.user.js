// ==UserScript==
// @name           Facebook Mafia Wars Exp Remaining
// @namespace      inthemafia.thatoneguy.net
// @description    Show the experience remaining to level
// @include        http://apps.facebook.com/inthemafia/*
// ==/UserScript==

var useEncode = false;

//Encode/Decode Base64 from http://ostermiller.org/calc/encode.html
var END_OF_INPUT = -1;

var base64Chars = new Array(
    'A','B','C','D','E','F','G','H',
    'I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v',
    'w','x','y','z','0','1','2','3',
    '4','5','6','7','8','9','+','/'
);

var reverseBase64Chars = new Array();
for (var i=0; i < base64Chars.length; i++){
    reverseBase64Chars[base64Chars[i]] = i;
}

var base64Str;
var base64Count;
function setBase64Str(str){
    base64Str = str;
    base64Count = 0;
}
function readBase64(){    
    if (!base64Str) return END_OF_INPUT;
    if (base64Count >= base64Str.length) return END_OF_INPUT;
    var c = base64Str.charCodeAt(base64Count) & 0xff;
    base64Count++;
    return c;
}
function encodeBase64(str){
    setBase64Str(str);
    var result = '';
    var inBuffer = new Array(3);
    var lineCount = 0;
    var done = false;
    while (!done && (inBuffer[0] = readBase64()) != END_OF_INPUT){
        inBuffer[1] = readBase64();
        inBuffer[2] = readBase64();
        result += (base64Chars[ inBuffer[0] >> 2 ]);
        if (inBuffer[1] != END_OF_INPUT){
            result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30) | (inBuffer[1] >> 4) ]);
            if (inBuffer[2] != END_OF_INPUT){
                result += (base64Chars [((inBuffer[1] << 2) & 0x3c) | (inBuffer[2] >> 6) ]);
                result += (base64Chars [inBuffer[2] & 0x3F]);
            } else {
                result += (base64Chars [((inBuffer[1] << 2) & 0x3c)]);
                result += ('=');
                done = true;
            }
        } else {
            result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30)]);
            result += ('=');
            result += ('=');
            done = true;
        }
        lineCount += 4;
        if (lineCount >= 76){
            result += ('\n');
            lineCount = 0;
        }
    }
    return result;
}
function readReverseBase64(){   
    if (!base64Str) return END_OF_INPUT;
    while (true){      
        if (base64Count >= base64Str.length) return END_OF_INPUT;
        var nextCharacter = base64Str.charAt(base64Count);
        base64Count++;
        if (reverseBase64Chars[nextCharacter]){
            return reverseBase64Chars[nextCharacter];
        }
        if (nextCharacter == 'A') return 0;
    }
    return END_OF_INPUT;
}

function ntos(n){
    n=n.toString(16);
    if (n.length == 1) n="0"+n;
    n="%"+n;
    return unescape(n);
}

function decodeBase64(str){
    setBase64Str(str);
    var result = "";
    var inBuffer = new Array(4);
    var done = false;
    while (!done && (inBuffer[0] = readReverseBase64()) != END_OF_INPUT
        && (inBuffer[1] = readReverseBase64()) != END_OF_INPUT){
        inBuffer[2] = readReverseBase64();
        inBuffer[3] = readReverseBase64();
        result += ntos((((inBuffer[0] << 2) & 0xff)| inBuffer[1] >> 4));
        if (inBuffer[2] != END_OF_INPUT){
            result +=  ntos((((inBuffer[1] << 4) & 0xff)| inBuffer[2] >> 2));
            if (inBuffer[3] != END_OF_INPUT){
                result +=  ntos((((inBuffer[2] << 6)  & 0xff) | inBuffer[3]));
            } else {
                done = true;
            }
        } else {
            done = true;
        }
    }
    return result;
}

//END Encode/Decode Base64 from http://ostermiller.org/calc/encode.html

var gm_mw_LinkHref = null;
var gm_mw_OnClickStart = null;
var gm_mw_OnClickEnd = null;
var gm_mw_LinkQuery = "xw_controller=&xw_action=&xw_city=";
var maxAlerts = 100;
var useLogForAlerts = true;

var prevCurrentExp = -2;
var prevUserHealth = -2;

var logCount = 0;

//Script update checker from http://userscripts.org/scripts/review/20145
var SUC_script_num = 45937; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


//move to top/center is inspired by http://userscripts.org/scripts/review/44656
//Then modified by me (ThatOneGuy) to fix ads overlaying game area)
function SetVisualChanges() {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ' #app10979261223_mainDiv { position: relative; }' // 'div.app { margin-top: -5px ! important; }'
//             + ' .UIStandardFrame_Container { padding-top: 0px; }'
//             + ' .UIStandardFrame_Content { float: none !important; margin: auto !important; }'
//             + ' body { background: #000000 !important; }'
             + ' #app10979261223_user_stamina { text-decoration: none !important }'
             + ' .user_xp_level img { display: none; }'
             + ' .user_xp_level .stat br { display: none; }'
             + ' .user_xp_level .stat .stat_title br { display: block; }'
             + ' .user_xp_level .stat { margin-left: 3px !important; width: 200px !important; font-size: smaller; }'
             + ' .user_xp_level .level_stat { margin-right: 3px !important; width: 35px !important; }'
             + ' .fb_email_prof_header, .zbar_main_cont { display: none !important; }';
    head.appendChild(style);
    
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.innerHTML = ''
                   + '\n //modified callback method, cleaner code but still needs more testing so we don\'t have to modify the title'
	 //the return false but link still goes bug may be caused by an extention??!'
                   + '\n function GM_MW_CustomCallback(location, action, upgradeKey)'
                   + '\n {'
                   + '\n   var newAction = action;'
                   + '\n   if (upgradeKey != \'\')'
                   + '\n   {'
                   + '\n     newAction = action + \'&upgrade_key=\' + upgradeKey;'
                   + '\n   }'
                   + '\n   GM_MW_DoLog(location + \' \' + action + \' \' + upgradeKey);'
                   + '\n   ajaxRequest("http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=&xw_action=&xw_city=1".replace(\'xw_controller=\', \'xw_controller=\' + location).replace(\'xw_action=\', \'xw_action=\' + newAction),"GET", null, handle,null);'
                   + '\n   return false;'
                   + '\n }'
                   + '\n '
                   + '\n function GM_MW_DoLog(message)'
                   + '\n {'
                   + '\n 		//Components.utils.reportError(message); //can not do this...'
                   + '\n }'
                   + '\n '
                   + '\n function handle(httpRequest)'
                   + '\n {'
                   + '\n 	httpResponse = httpRequest.responseText;	'
                   + '\n         if (doc'+'ument.getElementById(\'app10979261223_LoadingOverlay\'))'
                   + '\n         {'
                   + '\n           doc'+'ument.getElementById(\'app10979261223_LoadingOverlay\').style[\'display\'] = \'none\';'
                   + '\n         }'
                   + '\n '
                   + '\n 	if(!httpResponse)'
                   + '\n         {'
                   + '\n 		GM_MW_DoLog("connection problem");'
                   + '\n 	}'
                   + '\n 	else'
                   + '\n         {'
                   + '\n           var msg=null;'
                   + '\n           if(httpResponse.split("message_body\\">")[1]!=null)'
                   + '\n           {'
                   + '\n             msg=httpResponse.split("message_body\\">")[1]'
                   + '\n             msg=msg.split("</td>")[0];'
                   + '\n             DisplayMessage(msg.replace("<strong>","").replace("</strong>",""));'
                   + '\n             if(httpResponse.split("app10979261223_stats_row\\"")[1]!=null)'
                   + '\n             {'
                   + '\n               newStats = httpResponse.split("app10979261223_stats_row\\"")[1]'
                   + '\n               newStats = newStats.substring(newStats.indexOf(">") + 1, newStats.length - newStats.indexOf(">"));'
                   + '\n               newStats = newStats.split("</td>")[0];'
                   + '\n               doc'+'ument.getElementById(\'app10979261223_stats_row\').innerHTML = newStats;'
                   + '\n             }'
                   + '\n             if(httpResponse.split("app10979261223_user_nav\\"")[1]!=null)'
                   + '\n             {'
                   + '\n               newEnergy=httpResponse.split("app10979261223_user_nav\\"")[1]'
                   + '\n               newEnergy = newEnergy.substring(newEnergy.indexOf(">") + 1, newEnergy.length - newEnergy.indexOf(">"));'
                   + '\n               newEnergy=newEnergy.split("</td>")[0];'
                   + '\n               newEnergy = newEnergy.substring(0, newEnergy.lastIndexOf("</div>"));'
                   + '\n               newEnergy = newEnergy.substring(0, newEnergy.lastIndexOf("</div>"));'
                   + '\n               doc'+'ument.getElementById(\'app10979261223_user_nav\').innerHTML = newEnergy;'
                   + '\n             }'
                   + '\n 	    GM_MW_DoEvents(doc'+'ument);'
                   + '\n           }'
                   + '\n         }'
                   + '\n }'
                   + '\n '
                   + '\n function ajaxRequest(url, method, param, onSuccess, onFailure){'
                   + '\n 	GM_MW_DoLog("request : "+url);'
                   + '\n 	var xmlHttpRequest = new XMLHttpRequest();'
                   + '\n '
                   + '\n 	xmlHttpRequest.onreadystatechange = function() {'
                   + '\n 		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest);'
                   + '\n 		else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);'
                   + '\n 	};'
                   + '\n 	//GM_MW_DoLog(method);'
                   + '\n 	xmlHttpRequest.open(method, url, true);'
                   + '\n '
                   + '\n 	if (method == \'POST\') xmlHttpRequest.setRequestHeader(\'Content-Type\', \'application/x-www-form-urlencoded\');'
                   + '\n 	xmlHttpRequest.send(param);'
                   + '\n         if (doc'+'ument.getElementById(\'app10979261223_LoadingOverlay\'))'
                   + '\n         {'
                   + '\n           doc'+'ument.getElementById(\'app10979261223_LoadingOverlay\').style[\'display\'] = \'block\';'
                   + '\n         }'
                   + '\n 	return true;'
                   + '\n 	}'
                   + '\n function DisplayMessage(msg)'
                   + '\n {'
                   + '\n   var displayBox = doc'+'ument.getElementById(\'gm_mw_MessageWin'+'dow\');'
                   + '\n   if (!displayBox)'
                   + '\n   {'
                   + '\n     var mainWin'+'dow = doc'+'ument.getElementById(\'app10979261223_mainDiv\');'
                   + '\n     if (mainWin'+'dow)'
                   + '\n     {'
                   + '\n       mainWin'+'dow.innerHTML = \'<div id="gm_mw_MessageWin'+'dow" style="position: absolute; top: 0px; left: 7px; border: solid 3px gold; padding: 10px; font-size: 20px; background: black; color: gold; z-index:9999; display:none;"></div>\' + mainWin'+'dow.innerHTML;'
                   + '\n       displayBox = doc'+'ument.getElementById(\'gm_mw_MessageWin'+'dow\');'
                   + '\n     }'
                   + '\n   }'
                   + '\n   if (displayBox && msg != \'\')'
                   + '\n   {'
                   + '\n     displayBox.innerHTML = msg;'
                   + '\n     displayBox.style["display"] = \'block\';'
                   + '\n     setTimeout(\'var displayBox = doc'+'ument.getElementById(\\\'gm_mw_MessageWin'+'dow\\\'); if (displayBox) { displayBox.style["display"] = \\\'none\\\';  displayBox.innerHTML=\\\'\\\';}\', 3000);'
                   + '\n   }'
                   + '\n }'
                   + '\n DisplayMessage(\'\');';

    head.appendChild(js);
}
SetVisualChanges();
//end move to top/center


function GM_MW_DoCalcExp(searchNode){
/* code to always run goes here */
            /* code for updating exp */
            var curExp = -1;
            var userEnergy = -1;
            var neededExp = -1;

            var statsNode = document.getElementById('app10979261223_user_stats');
            var expCurrentNode = document.getElementById('app10979261223_user_experience');
            if (statsNode && expCurrentNode)
            {
		curExp = parseInt(expCurrentNode.innerHTML);
	      var elExp = statsNode.getElementsByTagName('span');
	       for(var h=0; h<elExp.length; h++)
	       {
	         if (elExp[h].className == "stat_title" && prevCurrentExp != curExp) // && elExp[h].innerHTML.indexOf("Experience") != -1 && elExp[h].innerHTML.indexOf("Experience (") == -1)
	         {

                   var expNeededNode = document.getElementById('app10979261223_exp_for_next_level');
                   var userEnergyNode = document.getElementById('app10979261223_user_energy');
                   var userMaxEnergyNode = document.getElementById('app10979261223_user_max_energy');
                   if (expNeededNode && userEnergyNode && userMaxEnergyNode)
                   {
		       neededExp = parseInt(expNeededNode.innerHTML);
                       userEnergy = parseInt(userEnergyNode.innerHTML);
                       userMaxEnergy = parseInt(userMaxEnergyNode.innerHTML);
                       elExp[h].innerHTML = "Exp (" + ((neededExp - curExp) * -1) + ") [" + Math.round(100 * (neededExp - curExp) / userEnergy) / 100 + "]<br />+Full [" + Math.round(100 * (neededExp - curExp) / (userEnergy + userMaxEnergy)) / 100 + "] +E-Pack [" + Math.round(100 * (neededExp - curExp) / (userEnergy + (userMaxEnergy * 1.25))) / 100 + "]";
                       break;
                   }
	         }
               }
            }
            /* end code for updating exp */

            /* fix fight link */
            var linksNode = document.getElementById('app10979261223_game_nav');
            if (linksNode)
            {
	      var elLinksDivs = linksNode.getElementsByTagName('div');
	      for(var p=0; p<elLinksDivs.length; p++)
	      {
		if(elLinksDivs[p].className == "nav_link fight_link") {// && ElementCheck(elLinksDivs[p], 'fight_link')) {
                        var myMafiaStyle = elLinksDivs[p].getElementsByTagName('a')[0].style.cssText;
			elLinksDivs[p].innerHTML = getLinkCode('Fight', null, myMafiaStyle, 'fight', 'view');
		}
	      }
            }
            /* end fix fight link */

            /* change Inventory links */
            var linksNode = document.getElementById('app10979261223_game_nav');
            if (linksNode)
            {
	      var elLinksDivs = linksNode.getElementsByTagName('div');
	      for(var p=0; p<elLinksDivs.length; p++)
	      {
		if(elLinksDivs[p].className == "nav_link inventory_link" && ElementCheck(elLinksDivs[p], 'inv link')) {
                        var myMafiaStyle = elLinksDivs[p].getElementsByTagName('a')[0].style.cssText;
			elLinksDivs[p].innerHTML = getLinkTabCode('W', null, myMafiaStyle, 'item', 'view', '1');
			elLinksDivs[p].innerHTML += getLinkTabCode('A', null, myMafiaStyle, 'item', 'view', '2');
			elLinksDivs[p].innerHTML += getLinkTabCode('V', null, myMafiaStyle, 'item', 'view', '3');
			elLinksDivs[p].innerHTML += ' &nbsp;' + getLinkCode('L', null, myMafiaStyle, 'loot', 'view');
			elLinksDivs[p].innerHTML += ' ' + getLinkCode('C', null, myMafiaStyle, 'collection', 'view');
			elLinksDivs[p].innerHTML += ' ' + getLinkCode('G', null, myMafiaStyle, 'gift', 'view');
		}
	      }
            }
            /* change Inventory links */

            /* Inspired by TRW, modified by original author: Added to replace the "My Mafia" link to go to the list instead of the recruit screen. */
            var navNode = document.getElementById('app10979261223_user_nav');
            if (navNode)
            {
	      var elDivs = navNode.getElementsByTagName('div');
	      for(var p=0; p<elDivs.length; p++)
	      {
		if(elDivs[p].className == "mafia_link" && ElementCheck(elDivs[p], 'mafia link')) {
                        var myMafiaStyle = elDivs[p].getElementsByTagName('a')[0].style.cssText;
                        var mafiaSize = elDivs[p].getElementsByTagName('a')[1].innerHTML;
                        var mafiaSizeStyle = elDivs[p].getElementsByTagName('a')[1].style.cssText;
			elDivs[p].innerHTML = getLinkCode('My Mafia', null, myMafiaStyle, 'group', 'view') + '  (' + getLinkCode(mafiaSize, null, mafiaSizeStyle, 'recruit', 'view') + ')';
		}
              }
            }
            /* End Inspired by TRW, modified by original author: Added to replace the "My Mafia" link to go to the list instead of the recruit screen. */

  /* code for updating user health with link */
            var userHealth = -1;
            var userHealthMax = -1;
            var userHealthElement = document.getElementById('app10979261223_user_health');
            var userHealthMaxElement = document.getElementById('app10979261223_user_max_health');
            var userHealthHospitalElement = document.getElementById('app10979261223_clock_health');
            if (userHealthElement && userHealthMaxElement && parseInt(userHealthElement.innerHTML).toString() == userHealthElement.innerHTML.toString())
            {
                userHealth = parseInt(userHealthElement.innerHTML);
                userHealthMax = parseInt(userHealthMaxElement.innerHTML);
                if (userHealth != userHealthMax)
                {
                  var healLink = '[' + getLinkCodeNoAjax('Heal', null, null, 'hospital','heal') + ']';
                  if (userHealthHospitalElement.childNodes.length > 2)
                  {
                    var healLinkExists = userHealthHospitalElement.childNodes[1].innerHTML.search("GM_MW_CustomCallback");
                    if (healLinkExists == -1)
                    {
                      userHealthHospitalElement.childNodes[1].innerHTML +=healLink;
                    }
                  }
                  //userHealthElement.innerHTML = getLinkCodeNoAjax(userHealth, null, null, 'hospital','heal');
                  //simple callback for heal by: Juraj Petrovic
                  //userHealthElement.getElementsByTagName('a')[0].addEventListener('click',clickF, false);
	          //userHealthElement.getElementsByTagName('a')[0].id="healing";
                }
	    }

            
  /* end code for updating user health with link */

  /* code for updating with stat upgrade links */
              var navNode = document.getElementById('app10979261223_user_nav');
              if (navNode)
              {
	        var elDivs = navNode.getElementsByTagName('div');
	        for(var p=0; p<elDivs.length; p++)
	        {
	          if (elDivs[p].className == "nav_link profile_link" && ElementCheck(elDivs[p], 'profile'))
	          {
	            var elLinks = elDivs[p].getElementsByTagName('a');
                    var myProfileStyle = elLinks[0].style.cssText;
		    var linkText2 = getLinkCode((elLinks.length > 1 ? ' P' : 'Profile'), null, myProfileStyle, 'stats', 'view');
		    if (elLinks.length > 1)
		    { 
                      var myStatClass = elLinks[1].className;
	              var myStatStyle = elLinks[1].style.cssText;
		      linkText2 += ' ' + getLinkCode(elLinks[1].innerHTML, myStatClass, myStatStyle, 'stats', 'view');
		      linkText2 += ' ' + getUpgradeLinkCode('A', myStatClass, myStatStyle, 'stats', 'upgrade', 'attack');
		      linkText2 += ' ' + getUpgradeLinkCode('D', myStatClass, myStatStyle, 'stats', 'upgrade', 'defense');
		      linkText2 += ' ' + getUpgradeLinkCode('H', myStatClass, myStatStyle, 'stats', 'upgrade', 'max_health');
		      linkText2 += ' ' + getUpgradeLinkCode('E', myStatClass, myStatStyle, 'stats', 'upgrade', 'max_energy');
		      linkText2 += ' ' + getUpgradeLinkCode('S', myStatClass, myStatStyle, 'stats', 'upgrade', 'max_stamina');
		    }
                    elDivs[p].innerHTML = linkText2;
//GM_log('links set');
                    upgradeLinks=elDivs[p];
	            for(var x=1; x<6; x++)
                    {
                      if(upgradeLinks.getElementsByTagName('a')[x]!=null)
                      {
//GM_log('clickf setup');
                        //upgradeLinks.getElementsByTagName('a')[x].addEventListener('click',clickF, false);
                      }
                    }
	          }
	        }
                //skip the first one, it's the profile link
              }

  /* end code for updating with stat upgrade links */

/* end code to always run */
	if (document.getElementsByTagName) // && ElementCheck(searchNode, 'main search node'))
	{
            var elJobs = searchNode.getElementsByTagName('table');
            for(var t=0; t<elJobs.length; t++)
            {
             if(elJobs[t].className == "job_list" && ElementCheck(elJobs[t], 'job list'))
             {
              var elRows = elJobs[t].getElementsByTagName("tr");
              for(var r=0; r<elRows.length; r++)
              {
               var expGain = -1;
               var energyNeed = -1;
               var editContainer = null;
               var elCells = elRows[r].getElementsByTagName("td");
               for(var c=0; c<elCells.length; c++)
               {
                if(elCells[c].className == "job_reward" && ElementCheck(elCells[c],'job reward'))
                {
                 var expContainers = elCells[c].getElementsByTagName("span");
                 for(var e=0; e<expContainers.length; e++)
                 {
                  if(expContainers[e].className == "bold_number")
                  {
                   expGain = parseInt(expContainers[e].innerHTML);
                   break;
                  }
                 }
                }
                else if (elCells[c].className == "job_energy" && ElementCheck(elCells[c],'job energy'))
                {
                 var energyContainers = elCells[c].getElementsByTagName("span");
                 for(var e=0; e<energyContainers.length; e++)
                 {
                  if(energyContainers[e].className == "bold_number")
                  {
                   energyNeed = parseInt(energyContainers[e].innerHTML);
                   editContainer = elCells[c];
                   break;
                  }
                 }
                }
                if (expGain != -1 && energyNeed != -1 && editContainer != null)
                {
                 editContainer.innerHTML = editContainer.innerHTML + "<br />(" + Math.round(100 * expGain / energyNeed) / 100 + ")";
                 break;
                }
               }
              }
             }
            }
	 }
}

//GM_MW_AddRate Inspired By: Juraj Petrovic
//Re-written by: ThatOneGuy
function GM_MW_AddRate()
{
  var searchNodes;
  var totalTr;
  var listOfTr;
  var income;
  var income2;
  var nodes;
  var price;
  var xxx;
  var rate;

  var prevBuyInputValue = 1;
  var prevBuyInput = null;

  var baseContainer = document.getElementById('app10979261223_inner_page');
var baseTables = null;

        if (baseContainer && baseContainer.childNodes[1] && baseContainer.childNodes[1].childNodes[3] && baseContainer.childNodes[1].childNodes[3].innerHTML.indexOf('Properties') != -1)
        {
        }
        else
        {
              baseContainer = document.getElementById('app10979261223_property');
        }
        if (baseContainer)
        {
              baseTables = baseContainer.getElementsByTagName('table');

              var tableNo = 0;
              for (var i = 0; i < baseTables.length; i++)
              {
                if (baseTables[i].className == "main_table")
                {
                  tableNo = i;
                  break;
                }
              }
              searchNodes=baseTables[tableNo].getElementsByTagName('tr');
              for(var p=0; p < searchNodes.length; p++)
              {
               propertyTDs = searchNodes[p].getElementsByTagName('td');
               if (propertyTDs.length == 9 || propertyTDs.length == 11)
               {
                incomeTD = propertyTDs[1];
                if (incomeTD && incomeTD.childNodes[3].childNodes[1])
                {
                             income=incomeTD.childNodes[3].childNodes[1].innerHTML.split("$")[1].split(",");
                             income2=income[0];
                             if(income[1]!=null)
                                income2=income[0]*1000;
                             else
                                income2=income[0]*1;

		 costTD = propertyTDs[3];

                 if (costTD.childNodes.length == 5 && costTD.innerHTML.indexOf("Rate:") == -1)
                 {
                                cost=costTD.childNodes[3].innerHTML.split("$")[1];

                                if(cost)
                                {
                                  cost=cost.split(",");
                                  if(cost[2]!=null)
                                    price=cost[0]+cost[1]+cost[2];
                                  else if(cost[1]!=null)
                                    price=cost[0]+cost[1];
                                  else
                                    price=cost[0]*1;                                  
                                  rate=price/income2;

                               costTD.innerHTML += " <br /> Rate: <strong class=\"money\">" + rate.toFixed(1) +"</strong><strong>";
                               }
                 }
		 buyInput = propertyTDs[5].getElementsByTagName('select')[0];
                 if (buyInput)
                 {
                   if (prevBuyInput != null &&  buyInput.selectedIndex && parseInt(buyInput.options[buyInput.selectedIndex].value) == 10)
                   {
                     if (parseInt(prevBuyInputValue) != 10)
                     {                       
                       //Set other drop down back to it's value because we've already done this!
                       gm_mw_SelectValue(prevBuyInput, prevBuyInputValue);
                     }
                     return;
                   }
                   else
                   {
                       prevBuyInputValue = buyInput.options[buyInput.selectedIndex].value
                       prevBuyInput = buyInput;
                       if (parseInt(prevBuyInputValue) == 10)
                       {
                         return;
                       }
                       gm_mw_SelectValue(buyInput, "10");
                   }
                 }
                }
               }
              }
        }                  
}
              
function gm_mw_SelectValue(buyInput, value)
{
  for (var i=0; i < buyInput.length; i++) 
  {
    if (parseInt(buyInput[i].value) == parseInt(value))
    {
      buyInput[i].selected = true;
      break;
    }
  }
}

gm_mw_DefaultLinkHref = "http://apps.facebook.com/inthemafia/remote/html_server.php?";
gm_mw_DefaultOnClickStart = "";
gm_mw_DefaultOnClickEnd = "";
gm_mw_LinkQuery = "xw_controller=&xw_action=&xw_city=";
gm_mw_DefaultClass = "";
gm_mw_DefaultStyle = "";
gm_mw_DefaultLinkSetup = false;
function gm_mw_verifyLinks()
{
      if (gm_mw_DefaultLinkSetup == false)
      {
         var cityNo = document.getElementById('app10979261223_mw_city_wrapper').className.substring(7); //mw_cityX
         gm_mw_DefaultLinkHref = gm_mw_DefaultLinkHref.replace('xw_city=', 'xw_city=' + cityNo)
         gm_mw_DefaultLinkSetup = true;
      }

      /*  Add ajax to links, inspired by TRW */
      if (gm_mw_LinkHref == null)
      {
            var statsNode = document.getElementById('app10979261223_game_stats');
            if (statsNode)
            {
              var elLinks = statsNode.getElementsByTagName('a');
	      //var elExp = statsNode.getElementsByTagName('span');
	       for(var h=0; h<elLinks.length; h++)
	       {
	         if( elLinks[h].className == 'bank_deposit')
		 {
		   var stealLink = elLinks[h];//.getElementsByTagName('a')[0];
		   var link_href = stealLink.getAttribute("href");
                   useEncode = link_href.indexOf('query_params=') != -1;

		   var link_query = link_href.substring(link_href.indexOf('query_params='));
		   var link_onclick = stealLink.getAttribute("onclick");

                   linkQuerySubstringIndex = (useEncode ? link_href.indexOf('query_params=') + 13 : link_href.indexOf('xw_controller='))
		   gm_mw_LinkQuery = (useEncode ? decodeBase64(link_href.substring(linkQuerySubstringIndex)) : link_href.substring(linkQuerySubstringIndex));
                   gm_mw_LinkQuery = gm_mw_LinkQuery.replace('xw_controller=bank','xw_controller=').replace('xw_action=view','xw_action=');
		   gm_mw_LinkHref = link_href.substring(0,linkQuerySubstringIndex);

                   linkQuerySubstringIndex = (useEncode ? link_onclick.indexOf('query_params=') + 13 : link_onclick.indexOf('xw_controller='))
                   gm_mw_OnClickStart = link_onclick.substring(0,linkQuerySubstringIndex);
                   gm_mw_OnClickEnd = (link_onclick.substring(link_onclick.indexOf((useEncode ? 'query_params=' : 'xw_controller='))));
                   gm_mw_OnClickEnd = gm_mw_OnClickEnd.substring(gm_mw_OnClickEnd.indexOf('\''));
//AlertCount(gm_mw_LinkHref);
//AlertCount(gm_mw_LinkQuery);
//AlertCount(gm_mw_OnClickStart);
//AlertCount(gm_mw_OnClickEnd);
                 }
	       }
            }
      }
}

function getStdLinkCode(linkText, class, style, queryStr)
{
      return '<a class="' + (class == null ? gm_mw_DefaultClass : class) + '" style="' + (style == null ? gm_mw_DefaultStyle : style) + '" href="' + getLinkEncoded(queryStr) + '" onclick="' + getOnClickEncoded(queryStr) + '">' + linkText + '</a>';
}

function getLinkCode(linkText, class, style, location, action)
{
      gm_mw_verifyLinks();
      var queryStr = gm_mw_LinkQuery.replace('xw_controller=', 'xw_controller=' + location).replace('xw_action=', 'xw_action=' + action);
      return getStdLinkCode(linkText, class, style, queryStr);
}

function getLinkTabCode(linkText, class, style, location, action, tab)
{
      gm_mw_verifyLinks();
      var queryStr = gm_mw_LinkQuery.replace('xw_controller=', 'xw_controller=' + location).replace('xw_action=', 'xw_action=' + action) + '&tab=' + tab;
      return getStdLinkCode(linkText, class, style, queryStr);
}

function getLinkCodeNoAjax(linkText, class, style, location, action)
{
      gm_mw_verifyLinks();
////      return '<a class="' + (class == null ? gm_mw_DefaultClass : class) + '" style="' + (style == null ? gm_mw_DefaultStyle : style) + '" href="' + (gm_mw_LinkHref == null ? gm_mw_DefaultLinkHref : gm_mw_LinkHref).replace('xw_controller=', 'xw_controller=' + location).replace('xw_action=', 'xw_action=' + action) + '">' + linkText + '</a>';
//      return '<a class="' + (class == null ? gm_mw_DefaultClass : class) + '" style="' + (style == null ? gm_mw_DefaultStyle : style) + '" href="#">' + linkText + '</a>';
      return getUpgradeLinkCode(linkText,class,style,location,action, '');
}

function getLinkEncoded(queryString)
{
  return (gm_mw_LinkHref == null ? gm_mw_DefaultLinkHref : gm_mw_LinkHref) + (useEncode ? encodeBase64(queryString) : queryString);
}
function getOnClickEncoded(queryString)
{
  var rtn= (gm_mw_OnClickStart == null ? gm_mw_DefaultOnClickStart : gm_mw_OnClickStart) + (useEncode ? encodeBase64(queryString) : queryString) + (gm_mw_OnClickEnd == null ? gm_mw_DefaultOnClickEnd : gm_mw_OnClickEnd);
  return rtn;
}

function getUpgradeLinkCode(linkText, class, style, location, action, upgradeKey)
{
      return '<a class="' + (class == null ? gm_mw_DefaultClass : class) + '" style="' + (style == null ? gm_mw_DefaultStyle : style) + '" href="#" onclick="GM_MW_CustomCallback(\'' + location + '\',\'' + action + '\',\'' + upgradeKey + '\');">' + linkText + '</a>';
//      return replaceAll(getLinkCodeNoAjax(linkText, class, style, location, action), 'xw_action=' + action, 'xw_action=' + action + '&upgrade_key=' + upgradeKey);
}

function replaceAll(text, strA, strB)
{
    return text.replace( new RegExp(strA,"g"), strB );    
}

var eventAdded = false;


var messageCount = 0;
function AlertCount(message)
{
 if (messageCount < maxAlerts)
 {
  messageCount++;
  if (useLogForAlerts && GM_log)
  {
   GM_log(message);
  }
  else
  {
   alert(message);
  }
 }
}


var lastTime = (new Date()).getTime() - 60000;
function GM_MW_DoEvents(currentTarget)
{
  try
  {
    var thisTime = (new Date()).getTime();
    if ((currentTarget) && (thisTime > (lastTime + 3000)))
    {
      lastTime = thisTime;
      GM_MW_RemoveListener();
      GM_MW_DoCalcExp(currentTarget);
      if (!document.getElementById('pauseButton'))
      {
        //Disable property stuff for now
        //GM_MW_AddRate();
      }
      GM_MW_AddListener();
    }
  }
  catch (err)
  {
    AlertCount('Exception caught: ' + err.name + ' - ' + err.message);
  } 
}

GM_MW_DoEvents(document.body);

function GM_MW_nodeInserted(event) {
      if(event.relatedNode.id && event.relatedNode.id.search("countdown") == -1  && event.relatedNode.id.search("buy_timer") == -1 && event.relatedNode.id.search("hiddenContent") == -1)
      { //HACK:avoid calling checkPropertiesPage if update is due to the countdown in page
        //Hack taken from http://userscripts.org/topics/24747
//AlertCount(event.relatedNode.id);
         GM_MW_DoEvents(event.currentTarget);
      }
}

function GM_MW_AddListener()
{
  if (!eventAdded)
  {
    //var mainDiv = document.getElementById('app10979261223_mainDiv');
    //if (mainDiv)
    //{
      //mainDiv.addEventListener('DOMNodeInserted', GM_MW_nodeInserted, false);
      //eventAdded = true;
    //}
    document.addEventListener("DOMNodeInserted", GM_MW_nodeInserted, false);
    //document.addEventListener("DOMSubtreeModified", GM_MW_nodeInserted, false);
    eventAdded = true;
  }
}

function GM_MW_RemoveListener()
{
  if (eventAdded)
  {
    //var mainDiv = document.getElementById('app10979261223_mainDiv');
    //if (mainDiv)
    //{
      eventAdded = false;
      //mainDiv.removeEventListener('DOMNodeInserted', GM_MW_nodeInserted, false);
    //}
    document.removeEventListener("DOMNodeInserted", GM_MW_nodeInserted, false);
    //document.removeEventListener("DOMSubtreeModified", GM_MW_nodeInserted, false);
  }
}


//Callback for heal by: Juraj Petrovic 
function clickF(){
//GM_log('clickF');
   if(this.title)
    this.href=this.title + '#';
  if(this.href.split("#")[0]!=null)
    this.href=this.href.split("#")[0]
  ajaxRequest(this.href,"GET", null, handle,null);
  this.title=this.href;
  this.href=document.URL+ "#";
  return false;
}


/************* SECTION CONVERTED TO JS ENCODED ON PAGE *****************
//modified callback method, cleaner code but still needs more testing so we don't have to modify the title
//the return false but link still goes bug may be caused by an extention??!
function GM_MW_CustomCallback(location, action, upgradeKey)
{
  var newAction = action;
  if (upgradeKey != '')
  {
    newAction = action + '&upgrade_key=' + upgradeKey;
  }
//GM_log(location + ' ' + action + ' ' + upgradeKey);
  var queryStr = gm_mw_LinkQuery.replace('xw_controller=', 'xw_controller=' + location).replace('xw_action=', 'xw_action=' + newAction);
  ajaxRequest(getLinkEncoded(queryStr), "GET", null, handle,null);
  return false;
}

function handle(httpRequest)
{
	httpResponse = httpRequest.responseText;	
        if (document.getElementById('app10979261223_LoadingOverlay'))
        {
          document.getElementById('app10979261223_LoadingOverlay').style['display'] = 'none';
        }

	if(!httpResponse)
        {
		GM_log("connection problem");
	}
	else
        {
          var msg=null;
          if(httpResponse.split("message_body\">")[1]!=null)
          {
            msg=httpResponse.split("message_body\">")[1]
            msg=msg.split("</td>")[0];
            DisplayMessage(msg.replace("<strong>","").replace("</strong>",""));
            if(httpResponse.split("app10979261223_stats_row\"")[1]!=null)
            {
              newStats = httpResponse.split("app10979261223_stats_row\"")[1]
              newStats = newStats.substring(newStats.indexOf(">") + 1, newStats.length - newStats.indexOf(">"));
              newStats = newStats.split("</td>")[0];
              document.getElementById('app10979261223_stats_row').innerHTML = newStats;
            }
            if(httpResponse.split("app10979261223_user_nav\"")[1]!=null)
            {
              newEnergy=httpResponse.split("app10979261223_user_nav\"")[1]
              newEnergy = newEnergy.substring(newEnergy.indexOf(">") + 1, newEnergy.length - newEnergy.indexOf(">"));
              newEnergy=newEnergy.split("</td>")[0];
              newEnergy = newEnergy.substring(0, newEnergy.lastIndexOf("</div>"));
              newEnergy = newEnergy.substring(0, newEnergy.lastIndexOf("</div>"));
              document.getElementById('app10979261223_user_nav').innerHTML = newEnergy;
            }
	    GM_MW_DoEvents(document);
          }
        }
}

function ajaxRequest(url, method, param, onSuccess, onFailure){
	GM_log("request : "+url);
	var xmlHttpRequest = new XMLHttpRequest();

	xmlHttpRequest.onreadystatechange = function() {
		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest);
		else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);
	};
	xmlHttpRequest.open(method, url, true);

	if (method == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttpRequest.send(param);
        if (document.getElementById('app10979261223_LoadingOverlay'))
        {
          document.getElementById('app10979261223_LoadingOverlay').style['display'] = 'block';
        }
	return true;
	}
function DisplayMessage(msg)
{
  var displayBox = document.getElementById('gm_mw_MessageWindow');
  if (!displayBox)
  {
    var mainWindow = document.getElementById('app10979261223_mainDiv');
    if (mainWindow)
    {
      mainWindow.innerHTML = '<div id="gm_mw_MessageWindow" style="position: absolute; top: 0px; left: 7px; border: solid 3px gold; padding: 10px; font-size: 20px; background: black; color: gold; z-index:9999; display:none;"></div>' + mainWindow.innerHTML;
      displayBox = document.getElementById('gm_mw_MessageWindow');
    }
  }
  if (displayBox && msg != '')
  {
    displayBox.innerHTML = msg;
    displayBox.style["display"] = 'block';
    setTimeout('var displayBox = document.getElementById(\'gm_mw_MessageWindow\'); if (displayBox) { displayBox.style["display"] = \'none\';  displayBox.innerHTML=\'\';}', 3000);
  }
}
DisplayMessage('');
************* END SECTION CONVERTED TO JS ENCODED ON PAGE *****************/


function ElementCheck(element, checkPoint)
{
  var rtn = false;

  //check if element has the gm_checked attribute
  if (!Boolean(element.getAttribute('gm_checked')))
  {
    rtn = true;
    element.setAttribute('gm_checked', 'true')
  }
//logCount++;
//GM_log('LogCount ' + logCount + ' Checkpoint: ' + checkPoint);
  return rtn;
}
