// ==UserScript==
// @name           RL-noAds
// @namespace      Dean. H
// @include        *
// ==/UserScript==

var transloadBtnNames="btnDescargar,btnTransload";
var num=Math.floor(Math.random()*10000);
var transloadForm="<div style='position:absolute; top: 27pt; left: 0pt; right: 0pt;z-index: 999;height:20px;'><div style='border:1px solid white;padding:5px;background-color:black;'><b>RL-Noads Transload Form</b> </div><div style='width:100%;background-color:black;'><center><form  style='width:650px;border-color:red;background-color:black;color:white;' method=\"post\" name=\"transload\" action=\"/index.php\"> <table width=\"100%\" cellspacing=\"5\" id=\"tb1\" class=\"tab-content\"> <tbody> <tr> <td align=\"left\"> <b>Link to Transload:</b><br>&nbsp;<input type=\"text\" size=\"50\" id=\"link\" name=\"link\"><br><br> <b>Referrer:</b><br>&nbsp;<input type=\"text\" size=\"50\" id=\"referer\" name=\"referer\"> </td> <td align=\"center\"> <input type=\"submit\" value=\"Transload Now (No-Ads)\" name=\"btnTransload\"> <input type=\"reset\" style=\"display: none;\" size=\"1\" name=\"B2\" value=\"Restablecer\"> </td> </tr> <tr> <td align=\"left\"><input type=\"checkbox\" value=\"on\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('usernpass').style.display=displ;\" name=\"user_pass\">&nbsp;User &amp; Pass (HTTP/FTP)</td> </tr> <tr style=\"padding-left:20px;display: block;\" id=\"usernpass\"> <td align=\"center\"> User: <input type=\"text\" value=\"\" name=\"iuser\"><br> Pass: <input type=\"text\" value=\"\" name=\"ipass\"> </td> </tr> <tr> <td align=\"left\"><input type=\"checkbox\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('comment').style.display=displ;\" name=\"add_comment\">&nbsp;Add Comments</td> </tr> <tr style=\"display: block;padding-left:20px;\" id=\"comment\"> <td> <textarea cols=\"50\" rows=\"4\" name=\"comment\"></textarea> </td> </tr> <tr><td>&nbsp;</td></tr> <tr> <td align=\"left\"> <small style=\"color: rgb(85, 187, 255);\">PluginOptions:</small><hr> <label><input type=\"checkbox\" name=\"dis_plug\">&nbsp;<small>Disable All Plugins</small></label> </td> </tr> <tr> <td align=\"left\"> <label><input type=\"checkbox\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('ytubeopt').style.display=displ;\" name=\"ytube_mp4\">&nbsp;<small>YouTube Video Format Selector</small></label> <table width=\"150\" border=\"0\" style=\"display: block;padding-left:20px;\" id=\"ytubeopt\"> <tbody><tr> <td style=\"white-space: nowrap;\" colspan=\"2\"><input type=\"checkbox\" name=\"ytdirect\"><small>&nbsp;Direct Link</small></td> </tr> <tr> <td align=\"left\"><small>&amp;fmt=</small></td> <td align=\"left\"> <select id=\"yt_fmt\" name=\"yt_fmt\"> <option selected=\"selected\" value=\"highest\">Auto-get the highest quality format available</option> <option value=\"0\">0 [Video: FLV H263 251kbps 320x180 @ 29.896fps | Audio: MP3 64kbps 1ch @ 22.05kHz]</option> <option value=\"5\">5 [Video: FLV H263 251kbps 320x180 @ 29.885fps | Audio: MP3 64kbps 1ch @ 22.05kHz]</option> <option value=\"6\">6 [Video: FLV H263 892kbps 480x270 @ 29.887fps | Audio: MP3 96kbps 1ch @ 44.10kHz]</option> <option value=\"13\">13 [Video: 3GP H263 77kbps 176x144 @ 15.000fps | Audio: AMR 13kbps 1ch @ 8.000kHz]</option> <option value=\"17\">17 [Video: 3GP XVID 55kbps 176x144 @ 12.000fps | Audio: AAC 29kbps 1ch @ 22.05kHz]</option> <option value=\"18\">18 [Video: MP4 H264 505kbps 480x270 @ 29.886fps | Audio: AAC 125kbps 2ch @ 44.10kHz]</option> <option value=\"22\">22 [Video: MP4 H264 2001kbps 1280x720 @ 29.918fps | Audio: AAC 198kbps 2ch @ 44.10kHz]</option> <option value=\"34\">34 [Video: FLV H264 256kbps 320x180 @ 29.906fps | Audio: AAC 62kbps 2ch @ 22.05kHz]</option> <option value=\"35\">35 [Video: FLV H264 831kbps 640x360 @ 29.942fps | Audio: AAC 107kbps 2ch @ 44.10kHz]</option> <option value=\"37\">37 [Video: MP4 1920×1080 | Audio: AAC 2ch 44.10kHz]</option> </select> </td> </tr> </tbody></table> </td> </tr> <tr> <td align=\"left\"><label><input type=\"checkbox\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('torpremiumblock').style.display=displ;\" id=\"imageshack_tor\" name=\"imageshack_tor\">&nbsp;<small>ImageShack&reg; TorrentService</small></label><table width=\"150\" border=\"0\" style=\"display: block;padding-left:20px;\" id=\"torpremiumblock\"> <tbody><tr><td>Username:&nbsp;</td><td><input type=\"text\" value=\"\" size=\"15\" id=\"tor_user\" name=\"tor_user\"></td></tr> <tr><td>Password:&nbsp;</td><td><input type=\"password\" value=\"\" size=\"15\" id=\"tor_pass\" name=\"tor_pass\"></td></tr> </tbody></table> </td> </tr> <tr> <td align=\"left\"> <label><input type=\"checkbox\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('mupremiumblock').style.display=displ;\" name=\"mu_acc\">&nbsp;<small>Megaupload.com Cookie Value</small></label> <table width=\"150\" border=\"0\" style=\"display: block;padding-left:20px;\" id=\"mupremiumblock\"> <tbody><tr><td>user=</td><td><input type=\"text\" value=\"\" size=\"25\" id=\"mu_cookie\" name=\"mu_cookie\"></td></tr> </tbody></table> </td> </tr> <tr> <td align=\"left\"> <label><input type=\"checkbox\" name=\"vBulletin_plug\">&nbsp;<small>Use vBulletin Plugin</small></label> </td> </tr> <tr> <td align=\"left\"> <label><input type=\"checkbox\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('cookieblock').style.display=displ;\" name=\"cookieuse\">&nbsp;<small>Additional Cookie Value</small></label> <table width=\"150\" border=\"0\" style=\"display: block;padding-left:20px;\" id=\"cookieblock\"> <tbody><tr><td>Key=Value;</td><td><input type=\"text\" value=\"\" size=\"25\" id=\"cookie\" name=\"cookie\"></td></tr> </tbody></table> </td> </tr> </tbody> </table> <table width=\"100%\" cellspacing=\"5\" id=\"tb2\" class=\"hide-table\"> <tbody> <tr> <td align=\"center\"> <table align=\"center\" style=\"text-align: justify;\"> <tbody><tr> <td><input type=\"checkbox\" onclick=\"document.getElementById('emailtd').style.display=document.getElementById('splittd').style.display=this.checked?'':'none';document.getElementById('methodtd').style.display=(document.getElementById('splitchkbox').checked ? (this.checked ? '' : 'none') : 'none');\" id=\"domail\" name=\"domail\">&nbsp;Send File to Email</td> <td>&nbsp;</td> <td style=\"display: block;padding-left:20px;\" id=\"emailtd\">Email:&nbsp;<input type=\"text\" id=\"email\" name=\"email\"></td> </tr> <tr> <td></td> </tr> <tr style=\"display: block;padding-left:20px;\" id=\"splittd\"> <td> <input type=\"checkbox\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('methodtd').style.display=displ;\" name=\"split\" id=\"splitchkbox\">&nbsp;Split Files</td> <td>&nbsp;</td> <td style=\"display: block;padding-left:20px;\" id=\"methodtd\"> <table> <tbody><tr> <td>Method:&nbsp;<select name=\"method\"><option value=\"tc\">Total Commander</option><option value=\"rfc\">RFC 2046</option></select></td> </tr> <tr> <td>Parts Size:&nbsp;<input type=\"text\" value=\"10\" size=\"2\" name=\"partSize\">&nbsp;MB</td> </tr> </tbody></table> </td> </tr> <tr> <td><input type=\"checkbox\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('proxy').style.display=displ;\" name=\"useproxy\" id=\"useproxy\" style='display:block'>&nbsp;Use Proxy Settings</td> <td>&nbsp;</td> <td style=\"display: block;padding-left:20px;\" id=\"proxy\"> <table width=\"150\" border=\"0\"> <tbody><tr><td>Proxy:&nbsp;</td><td><input type=\"text\" size=\"20\" id=\"proxyproxy\" name=\"proxy\"></td></tr> <tr><td>Username:&nbsp;</td><td><input type=\"text\" size=\"20\" id=\"proxyuser\" name=\"proxyuser\"></td></tr> <tr><td>Password:&nbsp;</td><td><input type=\"text\" size=\"20\" id=\"proxypass\" name=\"proxypass\"></td></tr> </tbody></table> </td> </tr> <tr> <td></td> </tr> <tr> <td><input type=\"checkbox\" checked=\"checked\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('premiumblock').style.display=displ;\" id=\"premium_acc\" name=\"premium_acc\">&nbsp;Use Premium Account</td> <td>&nbsp;</td> <td style=\"display: block;padding-left:20px;\" id=\"premiumblock\"> <table width=\"150\" border=\"0\"> <tbody><tr><td>Username:&nbsp;</td><td><input type=\"text\" value=\"\" size=\"15\" id=\"premium_user\" name=\"premium_user\"></td></tr> <tr><td>Password:&nbsp;</td><td><input type=\"password\" value=\"\" size=\"15\" id=\"premium_pass\" name=\"premium_pass\"></td></tr> </tbody></table> </td> </tr> <tr> <td></td> </tr> <tr style=\"display: block;padding-left:20px;\"> <td><input type=\"checkbox\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('path').style.display=displ;\" id=\"saveto\" name=\"saveto\">&nbsp;Save To</td> <td>&nbsp;</td> <td style=\"display: none;\" id=\"path\">Path:&nbsp;<input type=\"text\" value=\"/var/www/html/files\" size=\"40\" name=\"path\"></td> </tr> <tr> <td></td> </tr> <tr> <td><input type=\"checkbox\" onclick=\"javascript:var displ=this.checked?'':'none';document.getElementById('clearsettings').style.display=displ;\" id=\"savesettings\" name=\"savesettings\">&nbsp;Save Settings</td> <td>&nbsp;</td> <td style=\"display:block;\" id=\"clearsettings\"><a href=\"javascript:clearSettings();\">Clear Current Settings</a></td> </tr> </tbody></table> </td> </tr> </tbody> </table> </form><br></div></center><br></div> ";
var btnStyle="background-image:url('');background-repeat:repeat-x;font-size:11px;cursor:pointer;color:#fff;border:none;text-weight:bold;height:20px;background-color:#000;";

optSel="<input onmouseover=\"this.style.color='#ECAE2F';\" onmouseout=\"this.style.color='#fff';\" style=\""+btnStyle+"\" type=\"button\" value=\" Fix Transload Button \" name=\"protected_"+num+"\" id=\"RL-noAdsSel1\">&nbsp;";
optSel+=" | <input onmouseover=\"this.style.color='#ECAE2F';\" onmouseout=\"this.style.color='#fff';\" style=\""+btnStyle+"\" type=\"button\" value=\" Fix All Buttons \" name=\"protected_"+num+"\" id=\"RL-noAdsSel2\">&nbsp;";
optSel+=" | <input onmouseover=\"this.style.color='#ECAE2F';\" onmouseout=\"this.style.color='#fff';\" style=\""+btnStyle+"\" type=\"button\" value=\" Force Submit \" name=\"protected_"+num+"\" id=\"RL-noAdsSel3\">&nbsp;";
optSel+=" | <input onmouseover=\"this.style.color='#ECAE2F';\" onmouseout=\"this.style.color='#fff';\" style=\""+btnStyle+"\" type=\"button\" value=\" Create Transload Form \" name=\"protected_"+num+"\" id=\"RL-noAdsSel4\">&nbsp;";
optBox = "<div style=\"color:white;background-image:url('http://i52.tinypic.com/rsv1xv.png');background-repeat:repeat-x;border-bottom: 1px #ECAE2F solid;font-size:9px;position:absolute; top: 0pt; left: 0pt; right: 0pt;background-color:black;z-index: 999;width: 100%;height:25px;\" id=\"RL-noAds1\"><table style=\"height:20px;width: 800px;padding=0;\" cellpadding=\"0\" cellspacing=\"0\"><tr style='padding=0;'><td style=\"border:none;padding:0px;width:132px;padding=0;\"><a href=\"http://userscripts.org/scripts/show/84705\" style=\"text-decoration:none;font-size:12px;text-align:center;color:#ECAE2F;padding-left:50px;\"><u>[ RL-noAds ]</u></a></td><td style=\"padding:0px;border:none;padding-left:50px;\">"+optSel+"</tr></table></div>";
document.body.innerHTML += optBox;

a = document.getElementById("RL-noAdsSel1");
a.addEventListener('click',function(){applyFix(1);},false);
a = document.getElementById("RL-noAdsSel2");
a.addEventListener('click',function(){applyFix(2);},false);
a = document.getElementById("RL-noAdsSel3");
a.addEventListener('click',function(){applyFix(3);},false);
a = document.getElementById("RL-noAdsSel4");
a.addEventListener('click',function(){applyFix(4);},false);

function applyFix(n)
{
	switch(n)
	{
	case 1:
		var btnList = transloadBtnNames.split(",");
		for(i=0;i<=btnList.length;i++)
		{
			a = document.getElementsByName(btnList[i])[0];
			if(a!=null)
			{
				a.onclick="#";
				a.type="submit";
				a.value="Transload Now (No-Ads)";
				a.disabled=false;
			}
		}
	break;
	case 2:
		for(i=0;i<document.getElementsByTagName('input').length;i++)
		{
			a=document.getElementsByTagName('input')[i];
			if(a.type=="button")
			{
				if(a.name!="protected_"+num)
				{
					a.onclick="";
					a.type="submit";
					a.value="Transload Now (No-Ads) ";
					a.disabled=false;
				}
			}
		}
	break;
	case 3:
		a = document.getElementsByTagName('form');
		
		frmL = a.length;
		if(frmL>2)
		{
			frmNum = prompt('I have detected more than one form ( '+frmL+' forms ), Which form number would you like to submit?');
			frmNum = frmNum-1;
			
			if(frmNum<0||frmNum>frmL)
			{
				alert("You must enter a number between 1 and " + frmL);
			}
		}
		else
		{
			frmNum = 0;
		}
		
		a[frmNum].submit();
		a[frmNum].innerHTML="<div style='font-size:25px;padding:5px;color:white;background-color:red;border:1px black solid;'>Form Sent.</div>";
	break;
	case 4:
			document.getElementsByTagName('body')[0].innerHTML+=transloadForm;
	break;
	}
}
applyFix(1);