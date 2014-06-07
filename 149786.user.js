// ==UserScript==
// @name        Scripts_FacebooK
// @namespace   none
// @include     http://www.facebook.com/
// @include     https://www.facebook.com/
// @include     http://facebook.com/
// @include     https://facebook.com/
// @include     http://www.facebook.com
// @include     https://www.facebook.com
// @include     http://facebook.com
// @include     https://facebook.com
// @include     http://www.facebook.com/index.php*
// @include     https://www.facebook.com/index.php*
// @include     http://facebook.com/index.php*
// @include     https://facebook.com/index.php*
// @include     http://www.fr-fr.facebook.com/
// @include     https://www.fr-fr.facebook.com/
// @include     http://fr-fr.facebook.com/
// @include     https://fr-fr.facebook.com/
// @include     http://www.fr-fr.facebook.com
// @include     https://www.fr-fr.facebook.com
// @include     http://fr-fr.facebook.com
// @include     https://fr-fr.facebook.com
// @include     http://www.fr-fr.facebook.com/index.php*
// @include     https://www.fr-fr.facebook.com/index.php*
// @include     http://fr-fr.facebook.com/index.php*
// @include     https://fr-fr.facebook.com/index.php*
// @version     1
// ==/UserScript==

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

var scripts_icons	= "http://niark.spaceswars.fr/userscripts/NiArK_SpacesWars/images/";

function build_node (type, attr, attrValue, content, event, eventFunc)
{
	var elem = document.createElement(type);
	for (var i=0; i<attr.length; i++)
		elem.setAttribute(attr[i], attrValue[i]);
	if (event)
		elem.addEventListener(event, eventFunc, false);
	elem.innerHTML = content;
	return elem;
}
function set_config_scripts()
{
	list = {};
	list.ClicNGo = {};
		list.ClicNGo.usernames	= [];
		list.ClicNGo.passwords	= [];
	GM_setValue("config", JSON.stringify(list));
	return list;
}
function get_dom_xpath(xpath, inDom, row)
{
	var tab = [];
	var alltags = document.evaluate(xpath, inDom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<alltags.snapshotLength; i++)
		tab[i] = alltags.snapshotItem(i);
	if (row == -1)		return tab;
	if (row == -42)		return tab[tab.length-1];
	else				return tab[row];
}

var config		= eval("("+GM_getValue("config")+")");
				if (config == undefined) config = set_config_scripts();

{
		document.getElementsByTagName("body")[0].appendChild(build_node("script", ["type"], ["text/javascript"], function putLogs(uni, pseudo, pass) {document.getElementById("email").value=pseudo;document.getElementById("pass").value=pass;document.getElementById("uwfrwtr4").click();}));
		var clicngo	= build_node("div", ["style", "id"], ["float:right;cursor:pointer;position:relative;bottom:10px;", "clicngo"], "<img src='"+scripts_icons+"Clic&Go/connecting_people.png'></img>");
		var script	= build_node("script", ["type"], ["text/javascript"], "document.getElementById('clicngo').addEventListener('click', function(){document.getElementById('clicngo_contents').style.display='block';document.body.style.opacity='0.2';}, false);");
		var div		= build_node("div", ["style", "id"], ["padding:5px;font:12px Times New Roman normal;width:40%;display:none;background-color:black;color:white;border-radius:5px 5px 5px 5px;border:1px solid white;position:absolute;top:10%;left:30%;", "clicngo_contents"], "");
		document.body.parentNode.appendChild(div);
		clicngo.appendChild(script);
		get_dom_xpath("id('login_form')", document, 0).appendChild(clicngo);
		var clicngo_contents = document.getElementById("clicngo_contents");
		var html  = "<div onclick='document.getElementById(\"clicngo_contents\").style.display=\"none\";document.body.style.opacity=\"1\";' style='padding-bottom:5px;cursor:pointer;text-align:center;color:#A6FF94;border-bottom:1px solid white;font-weight:bold;'>Clic & Go !</div>";
			html += "<div id='clicngo_id'></div>";
			html += "<div style='width:50%;border-bottom:1px solid white;margin:10px 0 10px 0;'></div>";
			html += "<div><input id='remove_nb' onclick='this.value=\"\";' type='text' value='#' style='width:20px;border:1px solid #545454;height:15px;padding:1px;vertical-align:middle;background-color:black;border-radius:5px 5px 5px 5px;color:#CDD7F8;font:13px Times New Roman normal;margin:5px 5px 1px 2px;text-align:center;'/>";
			html += "<img id='remove_submit' style='cursor:pointer;position:relative;top:7px;' src='"+scripts_icons+"Clic&Go/remove.png' alt='remove'/></div>";
			html += "<div>";
			html += "<input id='add_username' onclick='this.value=\"\";'  type='text' value='email@hot.fr' style='border:1px solid #545454;height:15px;padding:1px;vertical-align:middle;background-color:black;border-radius:5px 5px 5px 5px;color:#CDD7F8;font:13px Times New Roman normal;margin:5px 0 1px 2px;text-align:center;'/>";
			html += "<input id='add_password' onclick='this.value=\"\";'  type='password' value='password' style='border:1px solid #545454;height:15px;padding:1px;vertical-align:middle;background-color:black;border-radius:5px 5px 5px 5px;color:#CDD7F8;font:13px Times New Roman normal;margin:5px 0 1px 2px;text-align:center;'/>";
			html += "<img id='add_submit' style='cursor:pointer;position:absolute;'src='"+scripts_icons+"Clic&Go/add.png' alt='add'/></div>";
		clicngo_contents.innerHTML += html;

		function insert_clicngo_contents()
		{
			for (var i=0; i<config.ClicNGo.usernames.length; i++)
			{
				div = build_node("div", ["id", "name", "style"], ["clicngo_"+i, "clicngo_"+i, "margin:5px;"], "#"+(i+1)+": "+config.ClicNGo.usernames[i]);
				document.getElementById("clicngo_id").appendChild(div);
			}
			for (var i=0; i<config.ClicNGo.usernames.length; i++)
			{
				var img = build_node("img", ["name", "src", "alt", "style"], ["clicngo_"+i, scripts_icons+"Clic&Go/login.png", "go", "margin-left:5px;cursor:pointer;position:absolute;"], "");
				img.addEventListener("click", function(){	var index = /clicngo_(\d*)/.exec(this.name)[1];
															document.getElementById("email").value	= config.ClicNGo.usernames[index];
															document.getElementById("pass").value	= config.ClicNGo.passwords[index];
															document.getElementById("login_form").submit();}, false);
				document.getElementById("clicngo_"+i).appendChild(img);
			}
		}
		insert_clicngo_contents();
		document.getElementById("add_submit").addEventListener("click", function(){
							var index = config.ClicNGo.usernames.length;
							config.ClicNGo.usernames[index] = document.getElementById("add_username").value;
							config.ClicNGo.passwords[index] = document.getElementById("add_password").value;
							GM_setValue("config", JSON.stringify(config));
							document.getElementById("clicngo_id").innerHTML = "";
							insert_clicngo_contents();}, false);
		document.getElementById("remove_submit").addEventListener("click", function(){
							var nb = parseInt(document.getElementById("remove_nb").value);
							config.ClicNGo.usernames.splice(nb-1, 1);
							config.ClicNGo.passwords.splice(nb-1, 1);
							GM_setValue("config", JSON.stringify(config));
							document.getElementById("clicngo_id").innerHTML = "";
							insert_clicngo_contents();}, false);
}


