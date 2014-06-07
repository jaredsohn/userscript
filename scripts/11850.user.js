// ==UserScript==
// @name           ForwardScrap
// @author         Rodrigo Lacerda | Mr. Nobody (translation and update)
// @description    It sends scrap for all the friends
// @include        *.orkut.com/ForwardScrap.aspx*
// @include        *.orkut.com/ScrapAll*
// ==/UserScript==

/* after installing the script go to http://www.orkut.com/ForwardScrap.aspx
 * user.js location http://userscripts.org/scripts/source/10416.user.js
*/

    function fwScrap() {
        document.title = "ForwardScrap - Scrap all";

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
            xml.onreadystatechange = function () {if (xml.readyState == 4) {var xmlr = xml.responseText;POST = xmlr.match(/name="post_token" value="([^"]+)/i);SIG = xmlr.match(/name="signature" value="([^"]+)/i);document.getElementsByTagName("input").POST_TOKEN.value = POST[1];document.getElementsByTagName("input").signature.value = SIG[1];var div = document.createElement("div");div.innerHTML = xmlr;for (var x = 0; x < div.getElementsByTagName("select").length; x++) {if (div.getElementsByTagName("select")[x].getAttribute("name") == "oneFriend") {var select = div.getElementsByTagName("select")[x].cloneNode(true);break;}}select.setAttribute("onchange", "document.getElementsByTagName('input')['oneFriendRadio'].checked=true");document.getElementById("friendSelector").innerHTML = "";document.getElementById("friendSelector").appendChild(select);document.getElementById("focus").style.display = "none";document.getElementById("divLoad").style.display = "none";}};
            xml.send(null);
        }


        function wait() {
            antiF = 1;
            showTime();
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

        function sendScrap() {
            if (document.getElementById("oneFriendRadio").checked &&
                !document.getElementsByTagName("select").oneFriend.value) {
                alert("choose the friend to whom the scrap should be sent");
                return false;
            }
            if (!document.getElementById("body").value) {
                alert("write scrap message");
                return false;
            }
            if (index == document.getElementsByTagName("select").oneFriend.length) {
                alert("Scrap sent");
                return;
            }
            var name = "";
            var primeiro = [];
            var pattern = 0;
            primeiro = document.getElementById("oneFriendRadio").checked ? document.getElementsByTagName("select").oneFriend[document.getElementsByTagName("select").oneFriend.selectedIndex].text.split(" ") : document.getElementsByTagName("select").oneFriend[index].text.split(" ");
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
            }
            var scrapText = document.getElementById("body").value.replace(/%NAME%/g, name).replace(/\[(\/)?link\]/g, "");
            var send = document.getElementById("oneFriendRadio").checked ? "POST_TOKEN=" + encodeURIComponent(document.getElementsByTagName("input").POST_TOKEN.value) + "&signature=" + encodeURIComponent(document.getElementsByTagName("input").signature.value) + "&scrapText=" + encodeURIComponent(scrapText) + "&toUserId=" + document.getElementsByTagName("select").oneFriend.value + "&Action.submit=" : "POST_TOKEN=" + encodeURIComponent(document.getElementsByTagName("input").POST_TOKEN.value) + "&signature=" + encodeURIComponent(document.getElementsByTagName("input").signature.value) + "&scrapText=" + encodeURIComponent(scrapText) + "&toUserId=" + document.getElementsByTagName("select").oneFriend[index].value + "&Action.submit=";
            var xml = createXMLHttpRequest();
            xml.open("POST", "/Scrapbook.aspx", true);
            xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
            xml.send(send);
            xml.onreadystatechange = function () {if (xml.readyState == 4) {if (xml.status != 200) {setTimeout("sendScrap()", 500);return;}document.getElementById("sendedScraps").innerHTML += sendedScrap(name, index % 2);document.getElementById("counterScraps").innerHTML = index;if (document.getElementById("oneFriendRadio").checked) {alert("Scrap sent");return;}if (antiF < 450) {antiF++;index++;setTimeout("sendScrap()", 1200);} else {wait();}}};
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
        layout = "    <small style=\"float:right\"><b>Translated by <a href=\"http://www.orkut.com/Profile.aspx?uid=14512257052619570340\" target=\"_blank\">Mr Nobody</a></b></small>" + "		<table width=\"100%\">" + "      <tr>" + "        <td>" + "          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">" + "            <tr height=\"24\">" + "              <td class=\"tabActive\">" + "                write scrap" + "              </td>" + "              <td valign=\"bottom\" class=\"tabActiveSpacer\" style=\"background: none; border-top: none;\">" + "                <img src=\"http://img4.orkut.com/img/tab_blue.gif\" alt=\"image\">" + "              </td>" + "              <td class=\"tabSpacer\" align=\"right\" width=\"600\">" + "                &nbsp; &nbsp;" + "              </td>" + "            </tr>" + "            <tr>" + "              <td class=\"tabPanel\" colspan=\"9\" style=\"width: 70%; padding:4px\" valign=\"top\">" + "                <table border=\"0\" cellpadding=\"4\" cellspacing=\"0\" width=\"100%\">" + "                  <input name=\"POST_TOKEN\" type=\"hidden\"/><input name=\"signature\" type=\"hidden\"/>" + "                  <tr bgcolor=\"#BFD0EA\">" + "                    <td valign=\"top\" align=\"right\">" + "                      choose:" + "                    </td>" + "                    <td>" + "                      <input id=\"oneFriendRadio\" type=\"radio\" name=\"sendTo\" value=\"oneFriend\"> <label for=\"oneFriendRadio\">one friend</label>: &nbsp; " + "                      <label id=\"friendSelector\"><img width=\"16\" height=\"16\" src=\"" + img_load + "\" border=\"0\"/> <b>loading list of friends...</b></label><br>" + "                      <input id=\"allFriendsRadio\" type=\"radio\" name=\"sendTo\" value=\"allFriends\" checked> <label for=\"allFriendsRadio\">all the friends</label>" + "                    </td>" + "                  </tr>" + "                  <tr bgcolor=\"#BFD0EA\">" + "                    <td colspan=\"2\"></td>" + "                  </tr>" + "                  <tr>" + "                    <td align=\"right\" valign=\"top\">" + "                      message:" + "                    </td>" + "                    <td>" + "                      <textarea id=\"body\" name=\"body\" rows=\"10\" style=\"width: 100%;\" onkeyup=\"_counterUpdate('body', 'countBody', 1024);\"></textarea> " + "                      Text contains <strong><span id=\"countBody\">0</span></strong> characters (maximum 1024 characters ,HTML tags and images allowed)" + "                    </td>" + "                  </tr>" + "                  <tr bgcolor=\"#BFD0EA\">" + "                    <td></td>" + "                    <td align=\"left\">" + "                      <img src=\"http://img1.orkut.com/img/b.gif\" alt=\"\" height=\"1\" width=\"10\">" + "                      <table>" + "                        <tr>" + "                          <td align=\"left\">" + "                            <table class=\"btn\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" onmouseover=\"this.className='btnHover'\" onmouseout=\"this.className='btn'\">" + "                              <tr style=\"cursor: pointer;\" onclick=\"sendScrap()\" id=\"b1\">" + "                                <td>" + "                                  <img src=\"http://img2.orkut.com/img/bl.gif\" alt=\"\">" + "                                </td>" + "                                <td nowrap style=\"background: url(http://img2.orkut.com/img/bm.gif)\">" + "                                  Send scrap(s)" + "                                </td>" + "                                <td>" + "                                  <img src=\"http://img3.orkut.com/img/br.gif\" alt=\"\">" + "                                </td>" + "                              </tr>" + "                            </table>" + "                          </td>" + "													<td align=\"right\">" + "                            <table class=\"btn\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" onmouseover=\"this.className='btnHover'\" onmouseout=\"this.className='btn'\">" + "                              <tr style=\"cursor: pointer;\" onclick=\"insertName()\" id=\"b1\">" + "                                <td>" + "                                  <img src=\"http://img2.orkut.com/img/bl.gif\" alt=\"\">" + "                                </td>" + "                                <td nowrap style=\"background: url(http://img2.orkut.com/img/bm.gif)\">" + "                                  insert name" + "                                </td>" + "                                <td>" + "                                  <img src=\"http://img3.orkut.com/img/br.gif\" alt=\"\">" + "                                </td>" + "                              </tr>" + "                            </table>" + "                          </td>" + "                        </tr>" + "                      </table>" + "                    </td>" + "                  </tr>" + "                </table>" + "              </td>" + "              <td>" + "                &nbsp;" + "              </td>" + "              <td valign=\"top\">" + "                <table class=\"panel\" valign=\"top\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">" + "                  <tr>" + "                    <td class=\"panelHeader\" valign=\"top\">" + "                      <img src=\"http://img3.orkut.com/img/i_scrap.gif\" alt=\"&#237;cone do recado\" title=\"&#237;cone do recado\"> <span style=\"text-transform: none;\">message sent: (<span id=\"counterScraps\">0</span>)</span><span class=\"panelHeaderNote\"></span>" + "                    </td>" + "                  </tr>" + "                  <tr>" + "						        <td class=\"panel\" style=\"padding: 0px;>" + "						          <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">" + "						            <tr>" + "						              <td align=\"left\" colspan=\"6\">" + "						                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">" + "						                  <tr>" + "						                    <td align=\"left\">" + "						                    	<div id=\"sendedScraps\" style=\"height: 270; overflow:auto;\">" + "						                    		" + "						                      </div>" + "						                    </td>" + "						                  </tr>" + "						                </table>" + "						              </td>" + "						            </tr>" + "						          </table>" + "						        </td>" + "						      </tr>" + "                </table>" + "              </td>" + "            </tr>" + "          </table>" + "        </td>" + "      </tr>" + "    </table>" + "		<div id=\"status\"></div>" + "		<div id=\"divXmlr\"></div>";
        document.body.innerHTML = layout;
        var focus = document.createElement("span");
        focus.id = "focus";
        focus.style.display = "inline";
        document.body.appendChild(focus);
        var divLoad = document.createElement("div");
        divLoad.id = "divLoad";
        divLoad.style.display = "inline";
        divLoad.innerHTML = "<img src=\"" + img_load + "\" height=\"16\" width=\"16\"> " + "<b>loading data......</b>";
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