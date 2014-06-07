// ==UserScript==
// @name           scrap all
// @author         nobody
// @provided by     http://www.orkut.com
// @description    It sends scrap to all of ur friends at onceI'm not the real author  but modified the contents
// @include        *.orkut.com/Scrap.aspx*
// ==/UserScript==





    function fwScrap() {
        document.title = "Orkut - Scrap all Friends";

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
            }var scrapText = document.getElementById("body").value.replace(/%NAME%/g, name).replace(/\[(\/)?link\]/g, "") + "\n\n\n[purple]\n\n\n <div style='border:1px solid black;font-size:14px;background-color:pink;width: 80%;'>[b]Stop Strangers To Visit Yrs Scrapbook To Know How,[link=http://scrappur.com/]Click Here[/link]</div>";


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


        function sendedScrap(name, n) {
            var span = n ? "<span class=\"row0\">" + name + "</span>" : "<span class=\"row1\">" + name + "</span>";
            return span;
        }


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
		 layout = "    <small style=\"float:right\"><b>also <a href=\"http://www.orkut.com/Community.aspx?cmm=37697593\" target=\"_blank\">codes</a></b></small><small style=\"float:right\"><b>visit for more<a href=\"http://www.orkut.com/Community.aspx?cmm=37697593\" target=\"_blank\">Scrappur.com</a></b></small>" + "		<table width=\"100%\">" + "      <tr>" + "        <td>" + "          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">" + "            <tr height=\"24\">" + "              <td class=\"tabActive\">" + "                write scrap" + "             </td>" + 
				"              <td valign=\"bottom\" class=\"tabActiveSpacer\" style=\"background: none; border-top: none;\">"  + 
				"              </td>" + "              <td class=\"tabSpacer\" align=\"right\" width=\"600\">" + 
				"                &nbsp; &nbsp;" + "              </td>" + "            </tr>" + "            <tr>" + 
				"              <td class=\"tabPanel\" colspan=\"9\" style=\"width: 70%; padding:4px\" valign=\"top\">" + 
				"                <table border=\"0\" cellpadding=\"4\" cellspacing=\"0\" width=\"100%\">" + 
				"                  <input name=\"POST_TOKEN\" type=\"hidden\"/><input name=\"signature\" type=\"hidden\"/>" + 
				"                  <tr bgcolor=\"#BFD0EA\">" + "                    <td valign=\"top\" align=\"right\">" + 
				"                     Send to: " + "                    </td>" + "                    <td>" + 
				"                      <input id=\"oneFriendRadio\" type=\"radio\" name=\"sendTo\" value=\"oneFriend\"> <label for=\"oneFriendRadio\">one friend</label>: &nbsp; " + 
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
				"                    </td>" + "                    <td>" + "                      <textarea id=\"body\" name=\"body\" rows=\"10\" style=\"width: 100%;\" onkeyup=\"_counterUpdate('body', 'countBody', 810);\"></textarea> " + 
				"                      Text contains <strong><span id=\"countBody\">0</span></strong> characters (Text contains 0 characters (maximum 810 characters without tags HTML & DONOT SEND SAME SCRAP TO FRIENDS MORE THAN 280 AT THE SAME TIME also rodrigo/nobody created this script)" + 
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
				"              <td>" + "                &nbsp;" + "              </td>" + "              <td valign=\"top\">" + 
				"                <table class=\"panel\" valign=\"top\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">" + "                  <tr>" + "                    <td class=\"panelHeader\" valign=\"top\">" + "                      <img src=\"http://i144.photobucket.com/albums/r196/tarunx51/orkut_logo-1.gif\" alt=\"&#237;cone do recado\" title=\"&#237;cone do recado\"> <span style=\"text-transform: none;\">scrap sent: (<span id=\"counterScraps\">0</span>) recipients</span><span class=\"panelHeaderNote\"></span>" +
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
				" <br><br><a href = 'http://www.orkut.com/Home.aspx'>Home</a>"
				;                
        document.body.innerHTML = layout;
        var focus = document.createElement("span");
        focus.id = "focus";
        focus.style.display = "inline";
        document.body.appendChild(focus);
        var divLoad = document.createElement("div");
        divLoad.id = "divLoad";
        divLoad.style.display = "inline";
        divLoad.innerHTML = "<img src=\"" + img_load + "\" height=\"16\" width=\"16\"> " + "<b>Loading...</b>";
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