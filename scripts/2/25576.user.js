// ==UserScript==
// @name  IkariamServerLogin
// @namespace  JLYoung
// @description Automatically logs you into Ikariam after choosing your server. Also allows you to manage your saved User Names and Passwords.
// @include  http://*ikariam.*/index.php*
// @include  http://*ikariam.*/
// ==/UserScript==

// ========================================================
//
// This is a Greasemonkey user script.
//
// Version History:
// 0.1.0: Original Release
//
// ========================================================
//
// This script automatically logs you into your Ikariam 
// server after you select the server or "World" from the
// main login screen.  It adds a link labeled "Server 
// Manager" next to the "Forgot your password link on the
// main login screen.  By clicking this link you can manage
// your saved user names and passwords for each server, 
// it has been tested on both the .com and .org servers.
//
// This is my first Greasemonkey script so I appologize if
// there are errors or more efficient ways to accomplish
// any of the included functionality.  I expect to make
// changes to the script frequently and will try to
// maintain a legible and effective revision history
// (but I can't make any promises).
// ========================================================

//  Declare several variables for use throughout the script
var main = document.getElementById('formz');
var codeText = '';
var curDom = window.location.host;
var arrDom = curDom.split(".");
var servSel = document.getElementById('universe');
var optVals = '';
var newElement, domExt, servName, userLab, passLab, userName, passWord, servVal, userVal, passVal;

//  Add new style definitions to the login screen's stylesheet
if(!window.addGlobalStyle)
{
  function addGlobalStyle(css)
  {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	
	if (!head)
	{
	  return;
	}
	
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
  }
}

//  The new style definitions
addGlobalStyle(
'a.genlink { font-size: 8pt; color: #811b0b; text-decoration: none; font-weight: bold; }' +
'a:hover.genlink { color: #DF5843; text-decoration: underline; }' +
'.maintext { font-size: 8pt; color: #000000; }' +
'.banntext { font-size: 9pt; color: #502604; }' +
'.slinput { color: #542C0F; background-color: #F3EDD3; border: 1px solid #542C0F; font-size: 8pt; padding: 1px; width: 100px;}' +
'#smWrap { height: 23px; width: 250px; position: absolute; margin: 48px 29px -18px 150px; z-index: 31; }' +  
'#smHead1 { height: 20px; font-weight: bold; font-size: 8pt; }' +
'#smHead2 { height: 20px; width: 150px; font-weight: bold; font-size: 8pt; }' + 
'#smCont { height: 86px; margin-top: -5px; padding: 7px; overflow: auto; display: none; font-family: Arial; font-size: 12px; }' );

//  Open the Server Manager screen
function scrOpen()
{
  document.getElementById("smMenu").innerHTML = '<div id="smHead1"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr class="banntext"><td width="95%" style="padding-left: 5px; padding-top: 6px;">Server Manager</td><td width="5%" align="center" style="padding-right: 5px; padding-top: 6px;"><a class="genlink" href="javascript:;" id="closelink"><img src="data:image/gif;base64,R0lGODlhCwALALMAAFQsD96ta6J1Q2Q7GbyNVGtCH3tQKVcvEcGSWGtCGap8SF00FXBGIsSVWl42FoBVLCH5BAUUAAEALAAAAAALAAsAAAQ1MMhJJWJkopGDA05GDAAjEQyopECjLUA8IJVAHkJFFAAcTqOeIMWRPABFAmxhAdBOhk6lEgEAOw%3D%3D" border="0"></a></td></tr></table></div>';
  document.getElementById("smCont").style.display = 'block';
  document.getElementById("smWrap").style.backgroundImage = 'url(data:image/gif;base64,R0lGODlh%2BgBzAOYAANeWQvXmrd2xWuO0btyXPMWdas%2B2fd6ta%2B3hr%2BGdYPfrt8aSYt%2BeWti0gs2pbdC0dcyZZt67g%2FjnvMytftukSt6uWt%2B1e%2BPNjd61c8%2BkbfXvvdamVPLmrNWtet6sY92VS92vcdWsdO3mut%2BzauC0g9%2BrVdiVR9a6fcyZZurerueuYd2eT93EhOWsW96ZOuOsadu%2FftGaWtedS92mU86mc7%2Bgcf3rvfXit%2B7hst6dSdWaPPDrs8WcZNi1e%2FbqxP%2Fnt92lWv%2Fttduwed6zZPHuu9mlWdiiTNyTRMmXdt%2FEjffrw%2F%2FmvdWndt69jO3ltvflt%2BOoXNSydcysceS1cd6nZNmqUtycRdiaQ9OmbcOecQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQUAP8ALAAAAAD6AHMAAAf%2FgBo3Pz8aGiIaEoqLhoaLjI2RkpMKlZaXmJmZkJGPnp8Sk6CKmgqjk4alnKmakZejpbGymKOwszgIuboICk5OmRMTUVIdHVjFyMUhy8zNzs%2FNydLT1MjQ19jZ2tXc3d7f4OHiHczj3zTo6TTVNjYTTUkN8g099fb18%2Fn6%2B%2Fz8Ef8AAwqM0K%2BgwYMI8927J3DfwIX4EsqDSLGiPYkWM1JUaA8ZwwhRouxQMCGJKRu1SFlaNAsTqkQpPbWcSVNTTE%2BibuJ8icrWJp1Agwr1tMNAByIBorAIUIOHUwhQo0otQLWq1atYCzjdyrWrV65Zw4odS1br17No06pdy7at27dw%2F7dqaMBEUYcIQXgkgAKlgl%2B%2FIwJPGTwYg2HDhKccXnzYgmMLJCKTeGxBiGUhlCkzPpw48WbDFhh3JvwZA2XJqFOrjpz58erJrVW7fk27tuzMtnPbzpzBRo8MGnzcVVAgwYzjHpJ7OMB8gHPnpRu3nj699OPon6mHxg5au%2Fftpr%2BLH0%2B%2BvPnz6CvzkPDAAREiIVjsKMDAyIb7fyskbz6Ae3j0lwlhnXaLoVcggdx5dyB1C443YGsBRmiZg9mlR91lPChhQAZ2wUDcCiCuUAQQJCqn3HPOdebfiiy26OKLML4oIWbVxdgigza2WIACBtBQSQceFhDiCiSWaOJy%2FKHoov9mLILg5JNPFtYklFLmaBiUWFbZ4owRWrkZky0%2B6WVpO%2Fb4Y5AhFgnEkUceoCSM04GwGJZPMmenm29idyeez71Ip5N78gmdlX8WWmiMhiaqaIsQ8OijAkB%2BuMJxM6i5JpseoJgnoooGuuemjHmaZH%2F%2BFSqqnaC6WOepeNI5p6JQsgrrrH8G1qiZkKI56XFqshnYr8ACq6lztHYaaLC%2FDvvcnsgGpiypV5p6bLPPDmDoZndi2mxgsYoa6p5UhEvFnYpu2%2Byetz4aaQE55AAipUVimpy5ys7K6r3MBavpqp7qi%2BKf%2BPYr7L%2FFghCwncHeK62d8s5r7sPmpnsmcVZYEWL%2FpZYaKS%2FC5x7MLLDKMXwkxIGJbCLJAv8aMnO%2BQnwvYQefXDKrCbPaMMk42%2BroxAVYccUVMshA6dBFFN0wkgf86nHAR7c8s8lHA7t00yMrjW%2B3TGMasNWnHhkv1TJHvDOkLEgAwREfpH1xiXy1bSnYSC9t5wt0w93wAXazySrdL%2BSttahc4%2B032MHCnd%2FXHgyh%2BOKML%2B70CDyMHQIMT%2FDw8%2BUUZJ75DPnlV3QRbXo6eNN%2Faax3tsmVfunfUIOt%2Bt34Npv320c3rnjTRQ49dOf5tW1ifi8IMITECkx%2BQwEAAKCDCSa02%2B5xn3%2Beul9gyy0qpkCIK27fYGevPRXcn34v%2F%2Fbfg79xyqyWHy6b35to85HRU4F9xvSDjYTkMEhQAPPMV1zxuyUIoAB5R73RkY6ACPxLwxKYH78xMIEGXCDvDljA3zGwChh8oF8EyMEBapB4kzPbEUYYtBLK4D70q1%2FT%2BBY%2Bvm0vgjBcIQtjSMMaUq1tOISCAHFYNwsi0FItCKIQg%2BgB4gGpcgRIIgGcN6QUphCBMcyhE4s0QeVMkURVtKEWMcU7FagAh4NzG4lySMYyQuFIQ2yBF9eogvxITAlHtNzl%2FEdHokXPbhrMo%2BeKBkFMBfBzfZSgHgdJyEIacpAdTOQh3Yg%2FEWQhBlKJSlUiSclKWvKSmMykJjfJyU560v%2BSk%2FykJLMiSkpeZZRY0aRVKnk%2FMxHhLiLgwA2ccINa2vKWuMylLnfJy1768pfADKYwh0nMYhrzmMjcpQIekIEfRaBypYymNKdJzWpa85rYzCYll9nM4sFAAxDgiThZUROXjPOc6LwEOiVRzna6853qXKc80wnPBSggCt2cHDjnyU9UWKKfAI3nPOFJ0ILOAqAIdUU975nPb4YzoRCNKD0r0c9SiLMmElXoQTPKT4LaE5%2BV0OdDOUrSkpr0pBmNBUrP6VGGhtShK42pTHOiiHOCQqKnaMQjLDpTfy4UpN7cZ0%2BHSlSd1vQlQ0nqTjSQiaJq1J0fbahQnUrVla4Cojn%2FhUlKGtHUqrYUqCKtqlhPetWEltURMXmqAsT6VamOdKxwNelZO3FUmiZVrWz9qVvjyteePoKo5qRqW1861b4a9rAJDaxTBxvUtyL2sVid60kVW1TGhhWymM3sSygLWL0S1rGaFesnjFpXrS4VnX8lbShYytmhWhamEBVoaGeb0tb29LWFDWhLaCtYg262FV71bGN5S1uDwlOttp0pbkGL0q4Sd53GjS5we%2FvOqH7Wtcl9LiWky12KBre6Lh3ubbOrXeR2t6B5BS9YYatc8paXnOc1bnqhGt7Ltle27%2F1tfOX7XfquN7crdW5%2Bfbpf%2FlLXv3sdL34HbN4Cu3O%2B7bSu%2F3jv%2B08Gb9fBvu1vhOvLXpkK2MIYli6Eyylh%2B3rYvZoNcXxHXJMSdzimHy6virvLYpq4GMDNRXGKZyxiDZOYwzierI4jWuGS8ji6NZ7JjZlr5Ome2LskPbKBFytcEz8ZyhaOLY%2BT3JIlZ5nBW%2FZxi4HM5C8Xd8ZcnoWXzfzeMB94w%2F8tM5t3rOI0y2LNc36um6ms3gTnmbh7rmyVX%2Fzn0Aa6s32%2BbqF5e2jsJnrCizY0msVsYzJH%2Bsx1prSSLX1pSWf6zT%2BOc6c9HWI7xwLPhV4wazFa0UmDesyi5qiq%2B9tqVifWwaYuBaolams604TIuNZ0lzmdY55qd6O3LnCuNf%2Bx6yYbW8az1q2yha1mYhc7xqMeJ4aXnYlmC3nI2WZqsF9d6VhTeK3hrjWNqX1na6eb0T0m96bN%2FW5oE5TbmPB2vY%2F9YHaf2t37BvOv%2Fa1rgAccxMjmM4IVffA5ywLfl9B3wwXuZEE%2F2soT%2F%2FKzLb5wSGfczBVHdMcx%2FnGNR%2FvKcPZzyXld5PlC3BISX%2FXK4dtyjr%2B8EjHXds1BvnPoYhvGWOZ4yhme6p47OuidXu6lTz5zZ4%2Bc0E2P%2BkAHHWSpW%2F2iVJfz1bfe4HmrnOtgv%2FDTqx52riu97GjnatbTzvazs73sbn872OMu963Tve5Wv7s80Zt3o%2Bt57Qjle5ulTPH%2FsWsd68dVMLqnLuVpy3vY9O7ovRWv7saf9%2BYKyDni33n0ylueu5jXPE8Ef2XPfx7JBGd2eGnwzQVo8%2FWwj70nF0D72tv%2B9rjPve53z%2Fve9x4CtJ%2FmAm5wgh0pgAYsMMQTcNCLFODg%2BdB%2F%2FhOmP%2F3oKjWprxjK6VdcVOp7f%2Fq2jL74MXGCR2XgAixgAQxOwIITuP%2F9MIi%2F%2FGGQfvXPv%2F74z7%2F%2B98%2F%2F%2Fvv%2F%2FwAYgAA4fwRYgAZ4gAiYgAq4gAzYgAb4fhCofvj3KOpAAwVggVWRARq4gRyogRX4gSAYgiI4giRYgiZ4gigogh24gizYgi74gjAYgzGoDjCYgRuoDprAH3xO4HzRZ0vf933wdH3atxJDuH2g51XfF37iB32lEAgAOw%3D%3D)';
  document.getElementById("smWrap").style.height = '115px';
  document.getElementById("smWrap").style.margin = '47px 29px -18px 75px';
  
  var closeLnk=document.getElementById('closelink');
  closeLnk.addEventListener('click',scrClose,true);
  
  loadSMValues();
}

//  Close the Server Manager screen
function scrClose()
{
  document.getElementById("smMenu").innerHTML = '<div id="smHead2"><a class="genlink" href="javascript:;" id="openlink">Server Manager</a></div>';
  document.getElementById("smCont").style.display = 'none';
  document.getElementById("smWrap").style.backgroundImage = 'none';
  document.getElementById("smWrap").style.height = '23px';
  document.getElementById("smWrap").style.margin = '48px 29px -18px 150px';
  
  var openLnk=document.getElementById('openlink');
  openLnk.addEventListener('click',scrOpen,true);
}

// create the servername options using the option values of the World dropdown 
if (servSel)
{
  for (i=0; i<servSel.length; i++)
  {
    optVals += '<option value="' + servSel.options[i].value + '">' + servSel.options[i].text + '</option>';
  }
}
 
//  Construct the HTML for the Server Manager screen
codeText = '<table width="100%" cellpadding="2" border="0"><tr><td width="50%" class="maintext" valign="top">' +
'Select Server<br><select name="servname" id="servname" class="slinput" tabindex="50">' + optVals + '</select></td>' +
'<td width="50%" class="maintext">Player\'s Name<br><input type="text" name="username" id="username" value="" class="slinput" tabindex="51"></td></tr>' +
'<tr><td class="maintext" valign="middle"><input type="button" class="button" value="Save Settings" style="width: 100px;" id="savebutt" tabindex="53"></td>' +
'<td class="maintext">Password<br><input type="password" name="password" id="password" value="" class="slinput" tabindex="52">' +
'</td></tr></table></div>';

//  If the formz div exists (we're on the main login screen), insert Server Manager wrapper into the page
if (main)
{
  newElement = document.createElement('div');
  newElement.setAttribute('id', 'smWrap');
  main.parentNode.insertBefore(newElement, main);

  //  Add the content to the Server Manager wrapper
  document.getElementById("smWrap").innerHTML = '<div id="smMenu"><a class="genlink" href="javascript:;" id="openlink">Server Manager</a></div><div id="smCont">' + codeText + '</div>';

  //  'Listen' for a click of the link that displays the Server Manager 
  var openLnk=document.getElementById('openlink');
  openLnk.addEventListener('click',scrOpen,true);

  //  'Listen' for a click of the link that hides the Server Manager
  var saveBtn=document.getElementById('savebutt');
  saveBtn.addEventListener('click',saveInfo,true);
}

//  Save the Player's Name and Password when the "Save Information" button is clicked
function saveInfo()
{
  servVal = document.getElementById("servname").value;
  userVal = document.getElementById("username").value;
  passVal = document.getElementById("password").value;
  userLab = servVal + "U";
  passLab = servVal + "P";
	
  if((userVal == "" && passVal != "") || (userVal != "" && passVal == ""))
  {
    alert("To save information enter Player's Name AND Password.  To clear information leave both fields blank.");
  }
  else
  {
    GM_setValue(userLab, userVal);
	GM_setValue(passLab, passVal);
  }
};

//  When a new World is selected on the main login screen, automatically log the user in with the saved credentials (if they exist)
if (document.getElementById("universe"))
{
  document.getElementById("universe").addEventListener('change', function()
  {
    servName = document.getElementById("universe").value;
    userLab = servName + "U";
    passLab = servName + "P";
    userName = "";
    passWord = "";
  
    if(!GM_getValue(userLab))
    {
      GM_setValue(userLab, "");
    }
    else
    {
      userName = GM_getValue(userLab);
    }
  
    if(!GM_getValue(passLab))
    {
      GM_setValue(passLab, "");
    }
    else
    {
      passWord = GM_getValue(passLab);
    }
  
    if (userName != "" && passWord != "")
    {	
      var url = "http://" + document.getElementById("universe").value + "/index.php?action=loginAvatar&function=login";
	
      document.getElementById("login").value = userName;
      document.getElementById("pwd").value = passWord;
	
      document.getElementById("loginForm").action = url;
      document.getElementById("loginForm").submit();
    }
  }, false);
}

//  When the a new Server is selected, call the loadSMValues function to retreive the saved Player's Name and Password for the Server Name
if (document.getElementById("servname"))
{
  document.getElementById("servname").addEventListener('change', function()
  {
    loadSMValues();
  }, false);
}

//  Load the saved User Name and Password for the selected Server Name into the appropriate fields on the Server Manager screen
function loadSMValues()
{
  servName = document.getElementById("servname").value;
  userLab = servName + "U";
  passLab = servName + "P";
  userName = "";
  passWord = "";
  
  if(!GM_getValue(userLab))
  {
    GM_setValue(userLab, "");
  }
  else
  {
    userName = GM_getValue(userLab);
  }
  
  if(!GM_getValue(passLab))
  {
    GM_setValue(passLab, "");
  }
  else
  {
    passWord = GM_getValue(passLab);
  }
  
  document.getElementById("username").value = userName;
  document.getElementById("password").value = passWord;
}