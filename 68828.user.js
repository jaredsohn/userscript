// ==UserScript==
// @name           Pooflinger's Facebook App Bar
// @namespace      Pooflinger
// @include        http://*
// @version        0.0.5

// ==/UserScript==

var your_version = "0.0.5";
var current_version = -1;
var BM, Icon, IsMatch;

var SearchResize;
var OutsideStyle;
var InsideStyle;
var ProfileIcon;
var DragFrom;

function ReadValues()
{
SearchResize = GM_getValue("SearchResize", 100);
OutsideStyle = GM_getValue("OutsideStyle", "v"); // horizontal, vertical, disabled
InsideStyle = GM_getValue("InsideStyle", "f"); // fixed to menu, vertical, horizontal
ProfileIcon = GM_getValue("ProfileIcon", true);
}
function main()
{

	ReadValues();

	if (window.location.toString().indexOf("http://www.favicon.cc/")==0)
		{
		var newElement=document.createElement('div'); 
		newElement.style.width = "100%";
		newElement.style.backgroundColor = "lightblue";
		Find_Icon();
		newElement.innerHTML = "<div style='color:black;font:8pt verdana;'>"
			+"<img id=icon_preview src='"+Icon+"' style='border:2px solid black;' />"

			+" Icon URL: <input onfocus=this.select(); id=icon_URL style=width:300px;font:inherit; type=text value='"+Icon+"' />"
			+" <a id=refresh_icon href=javascript:;>Refresh Icon</a>"
			+" <I>[This bar is inserted by PF]</I> "
			+"</div>";	
					
		document.body.insertBefore(newElement, document.body.childNodes[0]);
		
		$("refresh_icon").addEventListener("click", function () {
			Find_Icon();
			$("icon_preview").src = Icon;
			$("icon_URL").value = Icon;
		}, false);
		}

	if (
		(window.location.toString().indexOf("facebook.com")==-1 && OutsideStyle!="d")
		|| ($("headNavIn") && InsideStyle!="f")
		)
		{
		var newElement=document.createElement('style'); 
		newElement.id = "style1";
		newElement.setAttribute('type','text/css');
		var str = "#PF_MENU_BIGBAR {z-index:1000;background-color:#A2BAED;627AAD; font:8pt 'lucida grande',tahoma,verdana,arial,sans-serif;  border:1px solid black; padding:1px; top:0px; left:0px; }";
		str += "\n#PF_MENU_BAR li{float:left;list-style:none outside none; margin:0;}";
		str += "\n#PF_MENU_BAR a{display:inline-block; color:#FFFFFF; font-weight:bold; height:18px; text-decoration:none;}";
		str += "\n#PF_MENU_BAR a:hover,#PF_MENU_BAR a:focus,#PF_MENU_BAR a:active ";
		str += "{background-color:#6D86B7;6D86B7; outline:medium none;}";
		str += "\n#PF_MENU_BAR IMG{border:0px;width:16px;height:16px;}";
		str += "\n#BOX_BM_MNG {background-color:#DDDDED; font:8pt 'lucida grande',tahoma,verdana,arial,sans-serif; position:fixed;z-index:99;padding:20px; display:none; top:45px; left:5px; width:880px; }";
		str += "\n#BOX_BM_MNG input, #BOX_BM_MNG ul {text-align:left;font:inherit;color:#000000;}";
		str += "\n#BOX_BM_MNG .inputsubmit {background-color:#3B5998;border-color:#D9DFEA #0E1F5B #0E1F5B #D9DFEA;border-style:solid;border-width:1px;color:#FFFFFF;padding:2px 15px 3px;text-align:center;}";
		str += "\n#BOX_BM_MNG a{color:#3B5998;text-decoration:none;}";
		
		if (($("headNavIn") && InsideStyle=="v")
			||
			(!$("headNavIn") && OutsideStyle=="v"))
			{
			str += "\n#PF_MENU_BAR {width:25px;}";
			str += "\n#PF_MENU_BAR a{padding:5px;}";
			str += "\n#PF_MENU_BM_ADD a{padding:1px 1px 0;}";
			str += "\n#PF_MENU_BM_DEL a{padding:1px 3px 0;}";
			}
		else if (($("headNavIn") && InsideStyle=="h")
			||
			(!$("headNavIn") && OutsideStyle=="h"))
			str += "\n#PF_MENU_BAR a{padding:2px 5px 0;}";
			
		var TextNode = document.createTextNode(str);
		newElement.appendChild(TextNode);
		document.getElementsByTagName("head")[0].appendChild(newElement);
		
		var newElement=document.createElement('div'); 
		newElement.id = "PF_MENU_BIGBAR";
		newElement.style.position = 'fixed';
		newElement.innerHTML = "<div id=PF_MENU_BAR style=margin:0;padding:0>"

			+"<li id=PF_MENU_BM_ADD><A href=javascript:;>ADD</A></li>"
			+"<li id=PF_MENU_BM_DEL><A href=javascript:;>DEL</A></li>"
			+"<DIV id=PF_MENU></DIV><div id=PF_MENU_MOVE style='cursor:move;font-size:10px;padding-top:3px;float:left;'>Move</div></div>";
		
		var msgCoords = GM_getValue("BoxPos", "45px_300px");
		msgCoords = msgCoords.split("_");
		newElement.style.top = msgCoords[0];
		newElement.style.left = msgCoords[1];
		
		if (GM_getValue("BoxAlign", "h") == "v") // vertical
			newElement.style.width = "25px";

		
		document.body.appendChild(newElement);
		

		makeDraggable($('PF_MENU_MOVE'));

		}
	else if ($("headNavIn") && InsideStyle=="f")
		{
		var newElement=document.createElement('style'); 
		newElement.setAttribute('type','text/css');
		newElement.id = "style2";
		var str = "#PF_MENU {padding:0; left:333px; list-style:none outside none; margin:0; position:absolute; top:0px;}";
		str += "\n#PF_MENU li{float:left;}";
		str += "\n#PF_MENU img {border:0px;width:16px;height:16px;}";
		str += "\n#PF_MENU a{display:inline-block; color:#FFFFFF; font-weight:bold; height:22px; padding:7px 5px 0; text-decoration:none;}";
		str += "\n#PF_MENU a:hover,#PF_MENU a:focus,#PF_MENU a:active ";
		str += "{background-color:#6D86B7; outline:medium none;}";
		str += "\n#BOX_BM_MNG {background-color:#DDDDED; position:absolute;z-index:99999;padding:20px; display:none; top:45px; left:5px; width:880px; }";
		str += "\n#BOX_BM_MNG input {font:inherit;}";
		var TextNode = document.createTextNode(str);
		newElement.appendChild(TextNode);
		document.getElementsByTagName("head")[0].appendChild(newElement);
	
		
		var newElement=document.createElement('ul'); 
		newElement.id = "PF_MENU";
		$("headNavIn").insertBefore(newElement, $("auxNav"));
		

		}
	else
		return;
		
	if ($("headNavIn")) // on FB
		{
		
		var newElement=document.createElement('style'); 
		newElement.setAttribute('type','text/css');
		newElement.id = "style3";
		var str = "#PF_MENU_BUTTON {padding:0; left:310px; list-style:none outside none; margin:0; position:absolute; top:0px;}";
		str += "\n#PF_MENU_BUTTON ul {border:solid #3A579A 1px;position:absolute;top:100%;display:none;}";
		str += "\n#PF_MENU_BUTTON a {display:inline-block; color:#FFFFFF; font-weight:bold; height:22px; padding:7px 5px 0; text-decoration:none;}";
		str += "\n#PF_MENU_BUTTON li a{z-index:100; background-color:#FFFFFF; display:inline-block; color:#3A579A; height:22px; width:70px; padding:7px 5px 0; text-decoration:none;}";
		str += "\n#PF_MENU_BUTTON a:hover {background-color:#6D86B7; color:white; outline:medium none;}";
		str += "\n#PF_FEED {border:solid #3A579A 1px;background-color:white;padding:5px 5px 0; display:block;position:absolute;left:80px;top:29px;width:150px;height:22px;}";
		str += "\n#PF_FEED .clear{display:inline-block;width:16px;height:16px;padding:1px; margin-right:3px;}";
		str += "\n#PF_FEED img{border:0px;width:16px;height:16px;}";
		
		var TextNode = document.createTextNode(str);
		newElement.appendChild(TextNode);
		document.getElementsByTagName("head")[0].appendChild(newElement);
		
		var newElement=document.createElement('script'); 
		newElement.type = "text/javascript";
		str = "var mm=false;"
		str += "\nfunction hidemenu() {mm=false;setTimeout(function () {if(!mm) document.getElementById('PF_MENU_DD').style.display='none';}, 1200);}";
		TextNode = document.createTextNode(str);
		newElement.appendChild(TextNode);
		document.getElementsByTagName('head')[0].appendChild(newElement);
		
		var newElement=document.createElement('ul'); 
		newElement.id = "PF_MENU_BUTTON";
		newElement.innerHTML = "<a href=javascript:; onmouseout=hidemenu(); onmouseover=mm=true;document.getElementById('PF_MENU_DD').style.display='inline-block';>PF</a>"
			+"<ul id=PF_MENU_DD>"
			
			+((InsideStyle=="f")?
			"<li onmouseover=mm=true; onmouseout=hidemenu();><a href=javascript:; title='' id=PF_MENU_BM_ADD style=display:none;color:orange>Bookmark</a></li>"
			+"<li onmouseover=mm=true; onmouseout=hidemenu();><a href=javascript:; title='' id=PF_MENU_BM_DEL style=display:none;color:red>Delete</a></li>"
			:
			""
			)
			
			+"<li onmouseover=mm=true; onmouseout=hidemenu();><a href=javascript:; title='' id=PF_MENU_BM_FEED onmouseover=mm=true;document.getElementById('PF_FEED').style.display='inline-block';>App Feed -></a><div id=PF_FEED class=PF_FEED></div></li>"

			+"<li onmouseover=mm=true; onmouseout=hidemenu();><a href=javascript:; title='' id=PF_MENU_BM_MNG>Manage</a></li>"
			+"<li onmouseover=mm=true; onmouseout=hidemenu();><a href=http://www.facebook.com/pooflinger>About PF</a></li>"
			+"</ul>";
			
		$("headNavIn").insertBefore(newElement, $("auxNav"));
		if(InsideStyle!="f")
			$("PF_FEED").style.top = "-1px";
		
		SetSearchSize();
		
		if (!$("BOX_BM_MNG"))
			{
			var newElement=document.createElement('div'); 
			newElement.id = "BOX_BM_MNG";
			document.body.appendChild(newElement);
			}
		
		$("PF_MENU_BM_MNG").addEventListener("click", function () {
			
				Populate_Box();
			
			}, false);
				

		}
		
		
		
	$("PF_MENU_BM_DEL").addEventListener("click", function () {
			get_BM(); // SUPPORTS opening multiple tabs simultaneously 
			
			BM.splice(IsMatch, 1);
			createCookie("PF_BM", BM.join("!!"));
			Populate_BM();
			$("PF_MENU_BM_DEL").style.display = "none";
			$("PF_MENU_BM_ADD").style.display = "inline-block";
		}, false);
			
	
	$("PF_MENU_BM_ADD").addEventListener("click", function () {
			get_BM();
			
			var Loc = ReturnLoc();
			if (document.body.innerHTML.match(/app_content_(\d+)/)
				&& Loc.indexOf("apps.facebook.com/")!=-1) // has found APP ID and is APP
				var AppID = document.body.innerHTML.match(/app_content_(\d+)/)[1];
			else
				var AppID = "";
			
			Find_Icon();
			
			BM.push(Loc+"||"+document.title+"||"+Icon+"||"+AppID);
			createCookie("PF_BM", BM.join("!!"));
			Populate_BM();
		}, false);
			
	Populate_BM();
	
}
function Find_Icon()
{
	Icon = "http://www.favicon.cc/favicon/169/41/favicon.png"; // DEFAULT
	
	if (ProfileIcon && $("profile_pic")
		/*
		&& !($("profile_connect")) || // setting and have pic and is friend
		($("profile_connect").innerHTML.indexOf("Become a Fan")!=-1) ||  // Or business page 
		($("profile_connect").innerHTML.indexOf("Join")!=-1) // GROUP
		*/
		)
		{
		//var FB_ID = document.body.innerHTML.match(/MessageComposer.php\?id=(\d+)\\/)[1];
		
		Icon = $("profile_pic").src; //.toString().replace("/n","/q");
		
		//http://profile.ak.fbcdn.net/v222/330/82/qxxxx_1097.jpg **
		//http://profile.ak.fbcdn.net/v222/330/82/nxxxx_1097.jpg
		
		var Loc = ReturnLoc();
		
		var LinkElements = document.getElementsByTagName("a");
		for (var i=0; i<LinkElements.length; i++)
			if(LinkElements[i].href.toString().indexOf(Loc)==0 &&
				LinkElements[i].childNodes.length > 0 &&
				LinkElements[i].childNodes[0].nodeName=="IMG")
				{
				Icon = LinkElements[i].childNodes[0].src;
				break;
				}
		
		}
	else
		{
		var LinkElements = document.getElementsByTagName("link");
		for (var i=0; i<LinkElements.length; i++)
			if (
				//LinkElements[i].type="image/x-icon" &&
				(LinkElements[i].rel.toLowerCase()=="shortcut icon" || LinkElements[i].rel.toLowerCase()=="icon") )
				{
				Icon = LinkElements[i].href;
				break;
				}
		}
}
function ReturnLoc()
{
var Loc = window.location.toString();
	
if (Loc.indexOf("#")!=-1 && Loc.indexOf("http://www.facebook.com")==0)
	Loc = "http://www.facebook.com/" + Loc.replace('#!/','#').substr(Loc.indexOf("#")+1,1000);
return Loc;

}
function Populate_BM() {

	if (!$("PF_MENU"))
		return;

	get_BM();
	IsMatch = -1;
	var Loc = ReturnLoc();
	if (BM)
		{
		var str = "", str2="", BM_FEEDCNT=0;
		for (var i=0, BM_element; i<BM.length; i++)
			{
			BM_element = BM[i].split("||");
			str += "<li id=BM_"+i+"><a href=\"" + BM_element[0] + "\" title=\"" + BM_element[1] +"\" >"+
				//"onclick='window.location=\""+BM_element[0]+"\";return false;'>"+
				"<img src=\"" + BM_element[2] + "\" /></a></li>";
			
			if (BM_element[3]) // FEED
				{
				BM_FEEDCNT++;
				str2 += "<a class=clear href=javascript:; onclick=window.location=\"http://www.facebook.com/home.php?filter=app_" + BM_element[3] + "&show_hidden=true&ignore_self=true\" title=\"" + BM_element[1] +"\">"+
					"<img src=\"" + BM_element[2] + "\" /></a>";
				}

			if (BM_element[0] == Loc)
				IsMatch = i;
			}
		$("PF_MENU").innerHTML = str;

		
		var cbox = document.createElement('div');
					cbox.id = "cbox";
					cbox.style.width = '100%';
					cbox.style.background = 'lightyellow';
					cbox.style.fontSize = '8pt';
					cbox.style.verticalAlign='center';
					cbox.style.textAlign='center';
					
					
					document.body.insertBefore(cbox, document.body.childNodes[0]);
					

			
		for (var i=0; i<BM.length; i++)
			{
				
			$("BM_"+i).addEventListener('mousedown', function (e) {
					e.preventDefault();
					DragFrom = parseInt(this.id.replace("BM_",""));

				}, false);
			$("BM_"+i).addEventListener('mouseup', function (e) {
					e.preventDefault();
					if (DragFrom==null)
						return;
					var BM_tmp = BM[DragFrom];
					var HTML_tmp = $("BM_"+DragFrom).innerHTML;
					var this_id = parseInt(this.id.replace("BM_",""));
					if(DragFrom < this_id)
						{
						for (var i=DragFrom; i<this_id; i++)
							{
							BM[i] = BM[i+1];
							$("BM_"+i).innerHTML = $("BM_"+(i+1)).innerHTML;
							}
						BM[this_id] = BM_tmp;
						$("BM_"+this_id).innerHTML = HTML_tmp;
						}
					else if (DragFrom > this_id)
						{
						for (var i=DragFrom; i>this_id; i--)
							{
							BM[i] = BM[i-1];
							$("BM_"+i).innerHTML = $("BM_"+(i-1)).innerHTML;
							}
						BM[this_id] = BM_tmp;
						$("BM_"+this_id).innerHTML = HTML_tmp;
						}
					createCookie("PF_BM", BM.join("!!"));
					DragFrom =  null;
					
					
				}, false);

			}
		
		if($("PF_FEED"))
			{
			if (BM_FEEDCNT==0)
				{
				$("PF_MENU_BM_FEED").style.display = "none";
				$("PF_FEED").style.display = "none";
				
				}
			else
				{
				$("PF_MENU_BM_FEED").style.display = "inline-block";
				$("PF_FEED").style.display = "block";
				$("PF_FEED").innerHTML = str2;
				$("PF_FEED").style.width = (21*BM_FEEDCNT)+"px";
				}
			}
		}

	

	if (IsMatch!=-1)
		{
		$("PF_MENU_BM_DEL").style.display = "inline-block";
		$("PF_MENU_BM_ADD").style.display = "none";

		}
	else
		{
		$("PF_MENU_BM_DEL").style.display = "none";
		$("PF_MENU_BM_ADD").style.display = "inline-block";

		}
}

function Populate_Box_BM()
{
	var str="";
	get_BM();
	if (BM.length==0)
		str = "<i>No bookmarks found.</i>"
	else
		for (var i=0, BM_element, Loc=ReturnLoc(); i<BM.length; i++)
			{
			BM_element = BM[i].split("||");
			str += "<img src=\"" + BM_element[2] + "\" width=16 height=16 /> "
				+"Text <input id=text_"+i+" value=\"" + BM_element[1] +"\" style=width:150px /> "
				+"URL <input id=url_"+i+" value=\"" + BM_element[0] + "\" style=width:200px /> "
				+"Icon <input id=icon_"+i+" value=\"" + BM_element[2] +"\" style=width:200px /> "
				+"AppID <input id=appid_"+i+" value=\"" + (BM_element[3]? BM_element[3]:"") +"\" style=width:100px /> "
				+"<A href=javascript:; id=up_"+i+">Up</A> "
				+"<A href=javascript:; id=down_"+i+">Down</A> "
				+"<A href=javascript:; id=delete_"+i+">Delete</A>"
				;
				
				
			if (BM_element[0] == Loc)
				IsMatch = i;
			}
	$("BOX_BM_LIST").innerHTML = str;
	
			for (var i=0; i<BM.length; i++)
				{
				$("up_"+i).addEventListener("click", function () {
							for (var i=0; i<BM.length; i++)
								BM[i]=$("url_"+i).value+"||"+$("text_"+i).value+"||"+$("icon_"+i).value+"||"+$("appid_"+i).value;
				
							id = parseInt(this.id.replace("up_",""));
							if (id==0)
								return;
							var tmp = BM[id-1];
							BM[id-1] = BM[id];
							BM[id] = tmp;
							createCookie("PF_BM", BM.join("!!"));
							Populate_Box_BM();
						}, false);
				$("down_"+i).addEventListener("click", function () {
							for (var i=0; i<BM.length; i++)
								BM[i]=$("url_"+i).value+"||"+$("text_"+i).value+"||"+$("icon_"+i).value+"||"+$("appid_"+i).value;
				
							id = parseInt(this.id.replace("down_",""));
							if (id==BM.length-1)
								return;
							var tmp = BM[id+1];
							BM[id+1] = BM[id];
							BM[id] = tmp;
							createCookie("PF_BM", BM.join("!!"));
							Populate_Box_BM();
						}, false);		
				$("delete_"+i).addEventListener("click", function () {
							for (var i=0; i<BM.length; i++)
								BM[i]=$("url_"+i).value+"||"+$("text_"+i).value+"||"+$("icon_"+i).value+"||"+$("appid_"+i).value;
				
							id = parseInt(this.id.replace("delete_",""));
							BM.splice(id, 1);
							createCookie("PF_BM", BM.join("!!"));
							Populate_Box_BM();
						}, false);
				}
}

function Populate_Box()
{

			
			var str = "<B style=font-size:12pt;>Manage FB App Bar</B> "
				+ "[ <A href=http://userscripts.org/scripts/show/68828 target=_blank>Script page</A>"
				+ " | <A href=http://furoma.com>PF Home</A>"
				+ " | <A href=http://www.facebook.com/pooflinger>PF on Facebook</A>"
				+ " ]<BR /><BR />"
				+ "Your version is: <B>"+your_version
				+ "</B>. Current version is: <B id=current_version>(checking...)</B>. "
				+ "<span id=update_now style=display:none;>[ <A href=http://userscripts.org/scripts/source/68828.user.js>Update Now</A> ]</span>"
				+ "<hr /><br />"
				+ "<B>Your Apps and Bookmarks:</B> [ <A href=http://www.facebook.com/editapps.php?v=allowed>All FB apps</A> ]"
				+ "<br /><br />"
				+ "<span id=BOX_BM_LIST></span>"
				;
			
			
			
			
			str += "<br /><br /><B>Did you know?</b> You can choose or create your own icon from icon websites such as <A href=http://www.favicon.cc/ target=_blank>Favicon.CC</A>.";
			str += "<br /><B>NOTE:</B> AppID is for displaying app feeds. Leave blank to hide. To reset, delete the app and re-bookmark it.";
			
			str += "<br /><br /><B>Other options:</b>";
			str += "<ul style=list-style-type:disc;margin:5px;margin-left:20px;padding:10px;>";
			str += "<li>Make FB search box <A href=javascript:; id=search_smaller>Smaller</a>, <A href=javascript:; id=search_bigger>Bigger</a>, or specify the width <input id=search_width style=width:30px /> (A smaller search box means more space for App Bar!)</li>";
			str += "<li><input type=checkbox id=profile_icon />Use FB profile pic instead of FB logo as icon where possible. (Yeah, you can bookmark your friends, FB fan pages, and FB groups!)</li>";
			str += "<li>On Facebook, I want my App Bar to be <select id=inside_style><option value=f>fixed to menu bar</option><option value=v>vertical</option><option value=h>horizontal</option></select></li>";
			str += "<li>Outside Facebook, I want my App Bar to be <select id=outside_style><option value=d>disabled</option><option value=v>vertical</option><option value=h>horizontal</option></select></li>";
			str += "<li>You moved the App Bar to nowhere? <A href=javascript:; id=reset_pos>Get it back!</A></li>";
			
			str += "</ul>";
			
			str += "<br /><hr /><input type=button value='Save and Close' id=save class=inputsubmit />"
				
			$("BOX_BM_MNG").innerHTML = str;
			$("BOX_BM_MNG").style.display = "block";
			
			Populate_Box_BM();
			
			
			check_version();
			
				
			$("save").addEventListener("click", function () {
				for (var i=0; i<BM.length; i++)
					BM[i]=$("url_"+i).value+"||"+$("text_"+i).value+"||"+$("icon_"+i).value+"||"+$("appid_"+i).value;
				createCookie("PF_BM", BM.join("!!"));
				$("BOX_BM_MNG").style.display = "none";
				Populate_BM();
			}, false);	
			
			
			
			$("search_smaller").addEventListener("click", function () {
				SearchResize-=5;
				SetSearchSize();
			}, false);
			
			$("search_bigger").addEventListener("click", function () {
				SearchResize+=5;
				SetSearchSize();
			}, false);
			
			$("search_width").addEventListener("change", function () {
				SearchResize=this.value-298;
				SetSearchSize();
			}, false);	
			$("search_width").value = 298+SearchResize;
			
			$("profile_icon").addEventListener("click", function () {
				GM_setValue("ProfileIcon", this.checked);
				ProfileIcon = this.checked;
			}, false);
			$("profile_icon").checked = ProfileIcon;
			
			$("inside_style").addEventListener("change", function () {
				GM_setValue("InsideStyle", this.value);
				InsideStyle = this.value;
				if($("headNavIn"))
					{
					var obj = ["PF_MENU_BIGBAR", "PF_MENU", "PF_MENU_BUTTON", "style1", "style2", "style3"];
					for (o in obj)
						if($(obj[o]))
							$(obj[o]).parentNode.removeChild($(obj[o]));
					main();
					}
			}, false);	
			$("inside_style").value = InsideStyle;

			$("outside_style").addEventListener("change", function () {
				GM_setValue("OutsideStyle", this.value);
				OutsideStyle = this.value;
			}, false);	
			$("outside_style").value = OutsideStyle;	

			$("reset_pos").addEventListener("click", function () {
				GM_setValue("BoxPos", "0px_0px");
			}, false);				
}

/*
$("q").addEventListener("change", function () {
			var allDivs = document.GetElementByTagName("div");
			for (var i=0; i<allDivs.length; i++)
				if(allDivs[i].getAttribute("class").indexOf("typeahead_list_fbx")!=-1)
					{
					allDivs[i].style.width = "100px";
					//308
					break;
					}
	}, false);	
*/

function SetSearchSize()
{
	if ($("search_width"))
		$("search_width").value = 298+SearchResize;
	
	if (!$("q").style.width)
		$("q").style.width = "269px";
	
	if (!$("navSearch").style.width)
		$("navSearch").style.width = "298px";
		
	$("q").style.width = (269+SearchResize) + "px";
	$("q").parentNode.style.width = (290+SearchResize) + "px";
	$("navSearch").style.width = (298+SearchResize) + "px";
	
	$("PF_MENU").style.left = (333+SearchResize) + "px";
	$("PF_MENU_BUTTON").style.left = (310+SearchResize) + "px";
	
	GM_setValue("SearchResize", SearchResize);
	
}

function injectJS(file)
{

	var newElement=document.createElement('script'); 
	newElement.type = "text/javascript";
	newElement.src = file;
	
	document.getElementsByTagName('head')[0].appendChild(newElement);
}

function check_version()
{
	if (current_version != -1)
		{
		$("current_version").innerHTML = current_version;
		if(your_version==current_version)
			$("update_now").innerHTML = "<B><font color=green>OK!</font></B>";
		$("update_now").style.display = "inline";
		return;
		}
	
	xmlhttp('http://userscripts.org/scripts/review/68828?'+Math.random(), function (r) {

		already_check = true;
		current_version = String(r.match(/@version[ ]+[0-9].[0-9]?[0-9].[0-9]?[0-9]/));
		current_version = current_version.replace("@version","").replace(/ /g,"");
		
		$("current_version").innerHTML = current_version;
		if(your_version==current_version)
			$("update_now").innerHTML = "<B><font color=green>OK!</font></B>";
		$("update_now").style.display = "inline";
	});

}

function xmlhttp(url, fn)
{
	try
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Content-type':'application/x-www-form-urlencoded',
					},
				onload: function(responseDetails) {
					if (responseDetails.status != 200)
						{
						alert("Your internet connection or MH server is temporarily down.");
						return;
						}
					fn(responseDetails.responseText);
				}
			});
		}
	catch (e)
		{
		GM_log(e);
		}
}

/************************ Drag n drop*******************************/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}

function makeClickable(object){
	object.onmousedown = function(){
		dragObject = this;
	}
}

function getMouseOffset(target, ev){
	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}

function mouseMove(ev){
	var target   = ev.target;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		//dragObject.style.position = (usr_chk_tm_pos=='fixed box')? 'fixed':'absolute'; 
		dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
		dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev){
	if(dragObject) {
		
	GM_setValue("BoxPos", dragObject.style.top +"_"+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){	
var mousePos = mouseCoords(ev);
	var target = ev.target;
	iMouseDown = true;	
	if(target.getAttribute('DragObj')){
		return false;
	}	
}

function makeDraggable(item){
	if(!item) return;
	item.addEventListener("mousedown",function(ev){
		dragObject  = this.parentNode.parentNode; // RESTRICTS AREA TO MOVE
		mouseOffset = getMouseOffset(this.parentNode, ev);
		return false;
	}, false);
	
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);

/************************************************************************************/
// COOKIE FUNCTIONS from http://www.quirksmode.org/js/cookies.html

function createCookie(name,value,days) {

	if (typeof(GM_getValue)=="function")
		{
		GM_setValue(name, value);
		return;
		}
	//if (days) {
		var date = new Date();
		days = (days)? days : 365;
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	//}
	//else var expires = "";
	document.cookie = (name+"="+value+expires+"; path=/; domain=apps.facebook.com;");
}

function get_BM()
{
	BM = readCookie("PF_BM");
	if (BM)
		BM = BM.split("!!");
	else
		BM = new Array();
}

function readCookie(name) {

	if (typeof(GM_getValue)=="function")
		{
		return GM_getValue(name);
		}
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


function $(id)
{ return document.getElementById(id); }

/************************************************************************************/

main();
var currentLocation = "";
// Facebook reload profiles with AJAX. So GreaseMonkey script does not reload. Boo!
catchup_URL();
function catchup_URL()
{
	document.addEventListener("DOMNodeInserted", function () {

		if (window.location.href == currentLocation)
			return;
		currentLocation = window.location.href;
		
		var Loc = ReturnLoc();
		IsMatch = -1;
		for (i in BM)
			if (BM[i].split("||")[0]==Loc)
				IsMatch = i;
		if (IsMatch!=-1)
			{
			$("PF_MENU_BM_DEL").style.display = "inline-block";
			$("PF_MENU_BM_ADD").style.display = "none";

			}
		else
			{
			$("PF_MENU_BM_DEL").style.display = "none";
			$("PF_MENU_BM_ADD").style.display = "inline-block";

			}
	}, true);
}