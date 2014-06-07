// ==UserScript==
// @name CitizenSlick
// @namespace citizenray, Shinseinaryu, icemouse
// @description  Version 3.4. Now maintained by Shinseinaryu!
// @include http://endoftheinter.net/*
// @include http://boards.endoftheinter.net/*
// @include http://links.endoftheinter.net/*
// @include https://endoftheinter.net/*
// @include https://boards.endoftheinter.net/*
// @include https://links.endoftheinter.net/*
// @include http://archives.endoftheinter.net/*

// ==/UserScript==

// CHANGELOG for v3.4.1
// +  Changed domain name from LL D:
// +  Removed the  "Force links to use www" options


var scripts=[];
var descrip=[];
scripts[0]="Dramalinks";
descrip[0]="Display the dramalinks ticker.";
scripts[1]="Buddy List";
descrip[1]="Show LL Buddy List.";
scripts[2]="Userbar";
descrip[2]="Display userbar on bottom of topic pages.";
scripts[3]="TC Noter";
descrip[3]="Denote the TC when possible.";
scripts[4]="Toggle Spoilers";
descrip[4]="Add Toggle Spoilers link in topics.";
scripts[5]="i480";
descrip[5]="Add i480 link in topics.";
scripts[6]="Links2Images";
descrip[6]="Add Links2Images link in topics.";
scripts[7]="FilterMe";
descrip[7]="Add Filter Me link in topics.";
scripts[8]="PM Link";
descrip[8]="Add PM link to post headers.";
scripts[9]="Wiki Link";
descrip[9]="Add Wiki link to post headers.";
scripts[10]="Youtube Embed";
descrip[10]="Add [embed] link next to youtube links.";
scripts[11]="Youtube Revealer";
descrip[11]="Enable Youtube title reveal on mouseover.";
scripts[12]="TimeLapse";
descrip[12]="Display time between posts.";
scripts[13]="Wider Boxes";
descrip[13]="Make posting boxes wider.";
scripts[14]="AutoPost";
descrip[14]="When the post timer runs out, post message.";
scripts[15]="%n";
descrip[15]="%n%n%n%n%n%n%n <span style='color: red;'>THIS WILL BREAK YOUR SHIT DON'T USE IT JESUS CHRIST</span>";
scripts[16]="Search Highlighter";
descrip[16]="Highlight your terms in the search results.";
scripts[17]="MH Link";
descrip[17]="Display Mostly Harmless board link in menu.";
scripts[18]="Top Rated";
descrip[18]="Change Top Voted Links back to Top Rated.";
scripts[19]="LL Mart";
descrip[19]="Enable LL Mart helper.";
scripts[20]="Token Count";
descrip[20]="Display earned CTs in a link.";
scripts[21]="LUEfaqs";
descrip[21]="Make LL use the gfaqs browsing style (LUEfaqs)";
scripts[22]="No Updates";
descrip[22]="Do not have Citizenslick automatically check for updates (Useful if you like using an old version).";
scripts[23]="Wikileaks";
descrip[23]="Include Wikileaks in dramalinks";

function getUrlVars(urlz)
{
	var vars = [], hash;
	var hashes = urlz.slice(urlz.indexOf('?') + 1).split('&');
	 
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
		if (hash[1]!=null && hash[1].indexOf("#")>=0)
		{
			vars[hash[0]]=hash[1].slice(0,hash[1].indexOf("#"));
		}
	}
	 
	return vars;
}
function readcookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ')
				{c = c.substring(1,c.length);}
			if (c.indexOf(nameEQ) == 0)
			{
				return c.substring(nameEQ.length,c.length);
			}
		}
	return null;
}
function nextRealSibling(node)
{
	var cnode=node.nextSibling;
	while (cnode.nodeName=="#text")
	{
		cnode=cnode.nextSibling;
	}
	return cnode;
}
Array.prototype.contains=function(obj)
{
	for (var i=0; i<this.length; i++)
	{
		if (this[i]==obj)
		{
			return true;
		}
	}
	return false;
}
String.prototype.escape=function()
{
	return encodeURI(this);
}
String.prototype.decode=function()
{
	return decodeURI(this);
}

var get=getUrlVars(window.location.href);
var truebody=document.body.firstChild.parentNode;
var page=location.pathname;
var divs=document.getElementsByTagName("div");
var as=document.getElementsByTagName("a");

if (readcookie("slickvars")==null)
{
	var tt="";
	for (var i=0; i<scripts.length; i++)
	{
		tt+="0";
	}
	var expires=new Date;
	expires.setTime((new Date()).getTime()+3600000*24*10000);
	document.cookie="slickvars="+tt+";expires="+expires.toGMTString()+";domain=.endoftheinter.net";
}
var slickvarsraw=readcookie("slickvars").split("");
var slickvars=[];
for (var i=0; i<slickvarsraw.length; i++)
{
	slickvars[scripts[i]]=slickvarsraw[i];
}
var slickfields=[];
slickfields["topichighlight"]=readcookie("topichighlight") || "";
slickfields["topicignore"]=readcookie("topicignore") || "";
slickfields["userignore"]=readcookie("userignore") || "";
slickfields["buddylist"]=readcookie("buddylist") || "";
slickfields["highlightcolor"]=readcookie("highlightcolor") || "yellow";
if (page=="/editprofile.php" && get["slick"]=="settings")
{
	document.title="LUElinks - Slick Settings";
	var div=document.createElement("div");
	var str="";
	str+="<div id='message' style='color:red;font-weight:bold;'></div>";
	str+="<table class='grid' id='slicktable'><tr><th colspan='2'>Slick Settings - Go to the Slick <a href='http://www.luerpg.net/slick/'>Homepage</a></th></tr>";
	for (var i=0; i<scripts.length; i++)
	{
		str+="<tr><td style='width:2em;'><input type='checkbox' id='slickvar"+i+"'"+(slickvarsraw[i]=="1"?" checked='checked'":"")+"/></td><td>"+descrip[i]+"</td></tr>";
	}
	str+="<tr><td colspan='2'><button onclick='slicksave();'>Save</button></td></tr>";
	str+="</table><table class='grid'>";
	str+="<tr><th colspan='2'>More Settings (separate lists with commas)</th></tr>";
	str+="<tr><td style='width:10em;'>Words to highlight in topic titles:</td><td><textarea id='topichighlight' rows='2' cols='40'>"+slickfields["topichighlight"].decode()+"</textarea></td></tr>";
	str+="<tr><td style='width:10em;'>Ignore topics containing these words:</td><td><textarea id='topicignore' rows='2' cols='40'>"+slickfields["topicignore"].decode()+"</textarea></td></tr>";
	str+="<tr><td style='width:10em;'>Users to include on buddy list (userids):</td><td><textarea id='buddylist' rows='2' cols='40'>"+slickfields["buddylist"].decode()+"</textarea></td></tr>";
	str+="<tr><td style='width:10em;'>Users to ignore (usernames):</td><td><textarea id='userignore' rows='2' cols='40'>"+slickfields["userignore"].decode()+"</textarea></td></tr>";
	str+="<tr><td style='width:10em;'>Highlight color:</td><td><input type='text' id='highlightcolor' value='"+slickfields["highlightcolor"]+"'/></td></tr>";
	str+="<tr><td colspan='2'><button onclick='slicksave();'>Save</button></td></tr>";
	str+="</table>";
	div.innerHTML=str;
	var forms=document.getElementsByTagName("form");
	for (var i=forms.length-1; i>=0; i--)
	{
		if (forms[i].action=="editprofile.php");
		{
			forms[i].parentNode.insertBefore(div,forms[i]);
			forms[i].parentNode.removeChild(forms[i]);
		}
	}
	(document.getElementsByTagName("h1"))[0].innerHTML="Edit Slick Settings";
	unsafeWindow.slicksave=function() {
		var t="";
		for (var i=0; i<scripts.length; i++)
		{
			if (document.getElementById("slickvar"+i).checked)
			{
				t+="1";
			}
			else
			{
				t+="0";
			}
		}
		var expires=new Date;
		expires.setTime((new Date()).getTime()+3600000*24*10000);
		document.cookie="slickvars="+t+";expires="+expires.toGMTString()+";domain=.endoftheinter.net";
		document.cookie="topichighlight="+document.getElementById("topichighlight").value.escape()+";expires="+expires.toGMTString()+";domain=.endoftheinter.net";
		document.cookie="topicignore="+document.getElementById("topicignore").value.escape()+";expires="+expires.toGMTString()+";domain=.endoftheinter.net";
		document.cookie="buddylist="+document.getElementById("buddylist").value.escape()+";expires="+expires.toGMTString()+";domain=.endoftheinter.net";
		document.cookie="userignore="+document.getElementById("userignore").value.escape()+";expires="+expires.toGMTString()+";domain=.endoftheinter.net";
		document.cookie="highlightcolor="+document.getElementById("highlightcolor").value.escape()+";expires="+expires.toGMTString()+";domain=.endoftheinter.net";
		document.getElementById("message").innerHTML="Your preferences have been saved!";
		window.scrollTo(0,0);
	};
}
if (page!="/l.php" && page!="/u.php" && page!="/index.php")
{
	if (page=="/profile.php" && get["user"]==readcookie("userid"))
	{
		var ntr=document.createElement("tr");
		var ntd=document.createElement("td");
		ntd.colSpan="2";
		ntd.innerHTML="<a href='editprofile.php?slick=settings'>Edit Slick Settings</a>";
		ntr.appendChild(ntd);
		var as=document.getElementsByTagName("a");
		for (var i=0; i<as.length; i++)
		{
			if (as[i].innerHTML=="Edit My Password")
			{
				as[i].parentNode.parentNode.parentNode.insertBefore(ntr,as[i].parentNode.parentNode);
			}
		}
	}
	//Begin scripts
	//-----------------------------------------------------------------------------------------------
	if (slickvars["Userbar"]==1 && (page=="/showmessages.php" || page=="/showtopics.php"))
	{
		var reading;
		for (var i=0; i<divs.length; i++)
		{
			if (divs[i].className=="infobar")
			{
				reading=divs[i];
			}
		}
		for (var i=0; i<divs.length; i++)
		{
			if (divs[i].className=="userbar")
			{
				var nub=document.createElement("div");
				nub.className="infobar";
				nub.innerHTML=divs[i].innerHTML;
				reading.parentNode.insertBefore(nub,reading.nextSibling);
				break;
			}
		}
	}
	if (slickvars["TC Noter"]==1 && page=="/showmessages.php")
	{
		var tc;
		var numba1=null;
		if (get["page"]=="1" || get["page"]==null)
		{
			for (var i=0; i<divs.length; i++)
			{
				if (divs[i].className=="message-top")
				{
					numba1=divs[i];
					break;
				}
			}
		}
		if (get["tc"]!=null || numba1!=null)
		{
			if (numba1!=null)
			{
				var as2=numba1.getElementsByTagName("a");
				tc=as2[0].innerHTML;
			}
			else
			{
				tc=get["tc"].decode();
				if (tc.indexOf("#")>-1)
				{
					tc=tc.slice(0,tc.indexOf("#"));
				}
			}
			for (var i=0; i<divs.length; i++)
			{
				if (divs[i].className=="message-top")
				{
					var as2=divs[i].getElementsByTagName("a");
					if (as2[0].innerHTML==tc)
					{
						var s=document.createElement("i");
						s.innerHTML=" (tc)";
						divs[i].insertBefore(s,as2[0].nextSibling);
					}
				}
				if (divs[i].className=="infobar")
				{
					var as2=divs[i].getElementsByTagName("a");
					for (var j=0; j<as2.length; j++)
					{
						if (as2[j].href.indexOf("showmessages.php?")>0)
						{
							as2[j].href=as2[j].href+"&tc="+escape(tc);
						}
					}
				}
			}
		}
	}
	if (slickvars["Search Highlighter"]==1 && (page=="/search.php" || (page=="/links.php" && get["mode"]=="as")))
	{
		var terms=get['s_aw'].split("+");
		var tables=document.getElementsByTagName("table");
		for (var i=0; i<tables.length; i++)
		{
			if (tables[i].className=="grid")
			{
				for (var j=0; j<tables[i].rows.length; j++)
				{
					var asi=tables[i].rows[j].cells[0].getElementsByTagName("a");
					for (var k=0; k<asi.length; k++)
					{
						for (var l=0; l<terms.length; l++)
						{
							asi[k].innerHTML=asi[k].innerHTML.replace(eval("/("+terms[l]+")/i"),"<span style='background-color: "+slickfields["highlightcolor"]+";'>$1</span>");
						}
					}
				}
			}
		}
	}
	if ((slickfields["topicignore"]!="" || slickfields["topichighlight"]!="" || slickfields["userignore"]!="") && page=="/showtopics.php")
	{
		var trs=document.getElementsByTagName("tr");
		var terms=slickfields["topicignore"].toLowerCase().replace("/, /",",").split(",");
		var terms2=slickfields["topichighlight"].toLowerCase().replace("/, /",",").split(",");
		var dealtwith;
		for (var i=trs.length-1; i>=0; i--)
		{
			if (trs[i].className=="r0" || trs[i].className=="r1")
			{
				
				dealtwith=false;
				//Is we ignoring because of terms?
				var asi=trs[i].getElementsByTagName("a");
				var words=asi[0].innerHTML.toLowerCase().replace(/[^a-z0-9 ]/gi,"").split(" ");
				if (slickfields["topicignore"]!="")
				{
					for (var j=0; j<words.length; j++)
					{
						if (words[j]!=" " && words[j]!="" && terms.contains(words[j]))
						{
							trs[i].parentNode.removeChild(trs[i]);
							dealtwith=true;
							break;
						}
					}
				}
				//k what aboot the user though eh?
				if (!dealtwith && slickfields["userignore"]!="")
				{
					if (slickfields["userignore"].toLowerCase().replace("/, /",",").split(",").contains(asi[1].innerHTML.toLowerCase()))
					{
						trs[i].parentNode.removeChild(trs[i]);
						dealtwith=true;
					}
				}
				//aight then can we highlight this shit?
				if (!dealtwith && slickfields["topichighlight"]!="")
				{
					for (var j=0; j<words.length; j++)
					{
						if (terms2.contains(words[j].toLowerCase()))
						{
							asi[0].innerHTML=asi[0].innerHTML.replace(eval("/("+words[j]+")/ig"),"<span style='background-color: "+slickfields["highlightcolor"]+";'>$1</span>");
						}
					}
				}
			}
		}
	}
	if ((slickvars["Toggle Spoilers"]==1 || slickvars["i480"]==1 || slickvars["Links2Images"]==1 || slickvars["FilterMe"]) && (page=="/showmessages.php" || page=="/linkme.php"))
	{
		for (var i=0; i<divs.length; i++)
		{
			if (divs[i].className=="infobar")
			{
				if (slickvars["Toggle Spoilers"]==1) divs[i].innerHTML=divs[i].innerHTML+" | <a href='javascript:void(0);' onclick='var spans=document.getElementsByTagName(\"span\"); for (var i=0; i<spans.length; i++) { if (spans[i].className==\"spoiler_on_close\") { var nnode=spans[i].firstChild; while (nnode.nodeName!=\"A\") { nnode=nnode.nextSibling; } toggle_spoiler(nnode); } }' title='Toggler All Spoilers'>Toggle Spoilers</a>";
				if (slickvars["i480"]==1) divs[i].innerHTML=divs[i].innerHTML+" | <a href='javascript:void(0);' onclick='var i480=document.getElementsByTagName(\"img\"); for (var i=0; i<i480.length; i++) {i480[i].height=\"480\";}' title='Activate i480'>i480</a>";
				if (slickvars["Links2Images"]==1)
				{
					var cod="";
					cod+="var as=document.getElementsByTagName('a'); ";
					cod+="for (var i=0; i<as.length; i++) { ";
					cod+="if (as[i].className=='l') { ";
					cod+="var dots=as[i].href.split('.'); switch (dots[dots.length-1].toLowerCase()) { ";
					cod+="case 'jpg': case 'gif': case 'png': case 'bmp': case 'jpeg': ";
					cod+="as[i].innerHTML='<img src='+as[i].href+' border=0/>'; ";
					cod+="break; default: break; }}}";
					divs[i].innerHTML=divs[i].innerHTML+" | <a href='javascript:void(0);' onclick=\""+cod+"\"  title='Turn image links into images'>links2images</a>";
				}
				if (slickvars["FilterMe"]==1 && page=="/showmessages.php") divs[i].innerHTML=divs[i].innerHTML+" | <a href='showmessages.php?board="+get["board"]+"&topic="+get["topic"]+"&u="+readcookie("userid")+"' title='Filter Yoself'>Filter Me</a>";
				break;
			}
		}
	}
	if ((slickvars["PM Link"]==1 || slickvars["Wiki Link"]==1) && page=="/showmessages.php")
	{
		for (var i=0; i<divs.length; i++)
		{
			if (divs[i].className=="message-top")
			{
				var asi=divs[i].getElementsByTagName("a");
				if (slickvars["PM Link"]==1)
				{
					divs[i].innerHTML+=" | <a href='priv.php?userid="+getUrlVars(asi[0].href)["user"]+"'>PM</a>";
				}
				if (slickvars["Wiki Link"]==1)
				{
					var asb=asi[0].innerHTML;
					divs[i].innerHTML+=" | <a href='http://wiki.endoftheinter.net/index.php/User:"+escape(asb.replace(/ /g,"_"))+"'>Wiki</a>";
				}
			}
		}
	}
	if (slickvars["Youtube Embed"]==1 && page=="/showmessages.php")
	{
		for (var i=0; i<as.length; i++)
		{
			if (as[i].innerHTML.indexOf("youtube.com/watch?v=")>=0)
			{
				var sp=document.createElement("span");
				var vv=getUrlVars(as[i].href);
				sp.innerHTML=" <a href='javascript:void(0);' onclick='this.parentNode.innerHTML=\"<div><object width=\\\"425\\\" height=\\\"344\\\"><param name=\\\"movie\\\" value=\\\"http://www.youtube.com/v/"+vv['v']+"&hl=en&fs=1\\\"></param><param name=\\\"allowFullScreen\\\" value=\\\"true\\\"></param><embed src=\\\"http://www.youtube.com/v/"+vv['v']+"&hl=en&fs=1\\\" type=\\\"application/x-shockwave-flash\\\" allowfullscreen=\\\"true\\\" width=\\\"425\\\" height=\\\"344\\\"></embed></object></div>\"'>[embed]</a>";
				as[i].parentNode.insertBefore(sp,as[i].nextSibling);
			}
		}
	}
	if (slickvars["Youtube Revealer"]==1)
	{
		for (var i=0; i<as.length; i++)
		{
			if (as[i].href.search(/http:\/\/([A-Za-z0-9]+\.)*youtube\.com\/watch/i)-0>=0)
			{
				var vid=as[i].href.match(/v=[A-Za-z0-9_\-]+/i);
				vid=(vid+"").slice(2);
				as[i].id=vid;
				as[i].title="Title loading...";
				
				GM_xmlhttpRequest({
					method: 'GET',
					url: as[i].href,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Youtube Link Revealer',
					},
					onload: function(responseDetails) {
						var id=responseDetails.responseText;
						id=id.slice(id.indexOf("var pageVideoId = '")+19);
						id=id.slice(0,id.indexOf("'"));
						var t=responseDetails.responseText;
						t=t.slice(t.indexOf("<title>")+7);
						t=t.slice(0,t.indexOf("</title>"));
						var as=document.getElementsByTagName("a");
						for (var i=0; i<as.length; i++)
						{
							if (as[i].id==id)
							{
								as[i].title=t;
							}
						}
					}
				});
			}
		}
	}
	if (slickvars["Wider Boxes"]==1)
	{
		if (page=="/postmsg.php")
		{
			var mbox=document.getElementById("message");
			if (mbox!=null)
			{
				mbox.cols=75;
			}
		}
	}
	if (slickvars["AutoPost"]==1 && page=="/postmsg.php")
	{
		if (document.getElementById("countdown")!=null)
		{
			unsafeWindow.tryAndSubmitDisBitch = function ()
			{
				var cd=document.getElementById("countdown");
				if (cd.innerHTML!="0")
				{
					setTimeout("tryAndSubmitDisBitch()",100);
				}
				else
				{
					var forms=document.getElementsByTagName("form");
					for (var i=0; i<forms.length; i++)
					{
						if (forms[i].action.indexOf("postmsg.php")>=0)
						{
							var pb=document.createElement("input");
							pb.type="hidden";
							pb.name="submit";
							pb.value="Post Message";
							forms[i].appendChild(pb);
							forms[i].submit();
							break;
						}
					}
				}
			}
			setTimeout("tryAndSubmitDisBitch()",100);
		}
	}
	if ((page=="/showmessages.php" || page=="/showtopics.php" || page=="/showfavorites.php") && slickvars["%n"]==1)
	{
		/*var reading;
		for (var i=0; i<divs.length; i++)
		{
			if (divs[i].className=="userbar")
			{
				reading=divs[i];
			}
		}
		var asi=reading.getElementsByTagName("a");
		asi=asi[0].innerHTML.slice(0,asi[0].innerHTML.indexOf("(")-1);
		document.body.innerHTML=document.documentElement.innerHTML.replace(/%n/g,asi);*/
		alert("srsly turn off %n k");
	}
	if (slickvars["MH Link"]==1)
	{
		for (var i=0; i<as.length; i++)
		{
			if (as[i].innerHTML=="Boards")
			{
				var s=document.createElement("span");
				s.innerHTML=" | <a href='http://endoftheinter.net/showtopics.php?board=58'>Mostly Harmless</a>";
				as[i].parentNode.appendChild(s);
			}
		}
	}
	if (slickvars["Top Rated"]==1)
	{
		for(var x = 0; x < as.length; x++)
		{
			if(as[x].innerHTML == "Top voted links")
			{
				as[x].href = 'links.php?mode=top';
				as[x].innerHTML= "Top rated links";
				break;
			}
		}
	}
	if (slickfields["userignore"]!="" && page=="/showmessages.php")
	{
		var ignored=slickfields["userignore"].decode().replace(/, /,",").split();
		for (var i=0; i<divs.length; i++)
		{
			if (divs[i].className=="message-top")
			{
				var asi=divs[i].getElementsByTagName("a");
				for (var j=0; j<ignored.length; j++)
				{
					if (asi[0].innerHTML.toLowerCase()==ignored[j].toLowerCase())
					{
						var np=divs[i].nextSibling;
						while (np.nodeName.toLowerCase()=="#text")
						{
							np=np.nextSibling;
						}
						np.parentNode.removeChild(np);
						divs[i].parentNode.removeChild(divs[i]);
						i--;
						break;
					}
				}
			}
		}
	}
	//Dramalinks, oh god
	var dbgcol;
	if (slickvars["Dramalinks"]==1 && page=="/showtopics.php")
	{
		var ticker=document.createElement("center");
		var update=document.createElement("center");
		ticker.innerHTML="Dramalinks loading...";
		ticker.id="dramalinks_ticker";
		update.innerHTML="";
		update.id="dramalinks_update";
		for (var i=0; i<divs.length; i++)
		{
			if (divs[i].className=="userbar")
			{
				divs[i].parentNode.insertBefore(ticker,divs[i]);
				divs[i].parentNode.insertBefore(update,divs[i]);
				break;
			}
		}

		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://wiki.endoftheinter.net/index.php?title=Dramalinks/current&action=raw&section=0&maxage=30',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Dramalinks Script',
			},
			onload: function(responseDetails) {
				var t=responseDetails.responseText;
				t=t.replace(/\[\[(.+?)(\|(.+?))\]\]/g,"<a href=\"http://wiki.endoftheinter.net/index.php/$1\">$3</a>");
				t=t.replace(/\[\[(.+?)\]\]/g,"<a href=\"http://wiki.endoftheinter.net/index.php/$1\">$1</a>");
				t=t.replace(/\[(.+?)\]/g,"<a href=\"$1\" style=\"padding-left: 0px\"><img src=\"http://wiki.endoftheinter.net/skins/monobook/external.png\"></a>");
				t=t.replace(/href="\/index\.php/g,"href=\"http://wiki.endoftheinter.net/index.php");
				t=t.replace(/style=/gi,"");
				t=t.replace(/<script/gi,"<i");
				t=t.replace(/(on)([A-Za-z]*)(=)/gi,"");
				t=t.slice(t.indexOf("<!--- NEW STORIES GO HERE --->")+29);
				var dramas=t.slice(0,t.indexOf("<!--- NEW STORIES END HERE --->"));
				t=t.slice(t.indexOf("<!--- CHANGE DRAMALINKS COLOR CODE HERE --->"));
				t=t.slice(t.indexOf("{{")+2);
				dbgcol=t.slice(0,t.indexOf("}}"));
				var col;
				var bgcol;
				var kermit=false;
				switch (dbgcol.toLowerCase())
				{
					case "kermit":
					document.getElementById("dramalinks_ticker").style.border="2px solid #990099";
					bgcol="black";
					kermit=true;
					case "black":
					case "blue":
					case "green":
					col="white";
					break;
					default:
					col="black";
					break;
				}
				if (!kermit)
				{
				dramas="<span style='text-transform:capitalize'>Current Dramalinks Level: <font color='" + dbgcol + "'>" + dbgcol + "</font></span><div style='background-color: "+dbgcol+"; color: "+col+";'>" + dramas.slice(2).replace(/\*/g,"&nbsp;&nbsp;&nbsp;&nbsp;")+"</div>";
				}
				else
				{
				dramas="Current Dramalinks Level: <blink><font color='" + bgcol + "'>CODE KERMIT</font></blink><div style='background-color: "+bgcol+"; color: "+col+";'>" + dramas.slice(2).replace(/\*/g,"&nbsp;&nbsp;&nbsp;&nbsp;")+"</div>";
				}

				document.getElementById("dramalinks_ticker").innerHTML=dramas;
			}
		});
	}
if (slickvars["Wikileaks"]==1 && slickvars["Dramalinks"] && page=="/showtopics.php")
	{
		var ticker=document.createElement("center");
		var update=document.createElement("center");
		ticker.innerHTML="Wikileaks loading...";
		ticker.id="wikileaks_ticker";
		update.innerHTML="";
		update.id="wikileaks_update";
		for (var i=0; i<divs.length; i++)
		{
			if (divs[i].className=="userbar")
			{
				divs[i].parentNode.insertBefore(ticker,divs[i]);
				divs[i].parentNode.insertBefore(update,divs[i]);
				break;
			}
		}

		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://wiki.endoftheinter.net/index.php?title=WikiLeaks&action=raw&section=0&maxage=30',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Dramalinks Script',
			},
			onload: function(responseDetails) {
				var t=responseDetails.responseText;
				t=t.replace(/\[\[(.+?)(\|(.+?))\]\]/g,"<a href=\"http://wiki.endoftheinter.net/index.php/$1\">$3</a>");
				t=t.replace(/\[\[(.+?)\]\]/g,"<a href=\"http://wiki.endoftheinter.net/index.php/$1\">$1</a>");
				t=t.replace(/\[(.+?)\]/g,"<a href=\"$1\" style=\"padding-left: 0px\"><img src=\"http://wiki.endoftheinter.net/skins/monobook/external.png\"></a>");
				t=t.replace(/href="\/index\.php/g,"href=\"http://wiki.endoftheinter.net/index.php");
				t=t.replace(/style=/gi,"");
				t=t.replace(/<script/gi,"<i");
				t=t.replace(/(on)([A-Za-z]*)(=)/gi,"");
				t=t.slice(t.indexOf("<!--- NEW STORIES GO HERE --->")+29);
				var dramas=t.slice(0,t.indexOf("<!--- NEW STORIES END HERE --->"));
				var col;
				var bgcol = dbgcol.toLowerCase();
				var kermit=false;
				switch (bgcol)
				{
					case "kermit":
					document.getElementById("wikilinks_ticker").style.border="2px solid #990099";
					bgcol="black";
					kermit=true;
					case "black":
					case "blue":
					case "green":
					col="white";
					break;
					default:
					col="black";
					break;
				}
			dramas="<div style='background-color: "+bgcol+"; color: "+col+";'>" + dramas.slice(2).replace(/\*/g,"&nbsp;&nbsp;&nbsp;&nbsp;")+"</div>";
				document.getElementById("wikileaks_ticker").innerHTML=dramas;
			}
		});
	}
	if (slickvars["LL Mart"]==1)
	{
		for (var i=0; i<as.length; i++)
		{
			if (as[i].innerHTML=="Boards")
			{
				var s=document.createElement("span");
				s.innerHTML=" | <a href='http://endoftheinter.net/showtopics.php?board=419'>LL Mart</a>";
				as[i].parentNode.appendChild(s);
			}
		}
		// Feedback link
		if (page=="/showmessages.php" && (get["board"]==419 || get["board"]==418))
		{
			for (var i=0; i<divs.length; i++)
			{
				if (divs[i].className=="message-top")
				{
					//http://endoftheinter.net/search.php?s_aw=USERNAME&board=418&submit=Submit
					var as=divs[i].getElementsByTagName("a");
					divs[i].innerHTML+=" | <a href='http://endoftheinter.net/search.php?s_aw="+as[0].innerHTML.replace(/ /g,"+")+"&board=418&submit=Submit'>Feedback</a>";
				}
			}
		}

		// Markers
		if (page=="/showtopics.php" && get["board"]==419)
		{
			var today = new Date();
			today.setTime( today.getTime() );
			var expplus=60*60*24*21; //three weeks; change 21 to the number of days you want
			var expires_date = new Date(today.getTime()+(expplus));
			var expired_date = new Date(today.getTime()-3600);

			var tables=document.getElementsByTagName("table");
			for (var j=tables.length-1; j>=0; j--)
			{
				if (tables[j].className=="grid")
				{
					var trs=tables[j].getElementsByTagName("tr");
					for (var i=0; i<trs.length; i++)
					{
						if (trs[i].innerHTML.indexOf("<th>Topic</th>")>-1)
						{
							var th=document.createElement("th");
							th.innerHTML="!";
							trs[i].insertBefore(th,trs[i].firstChild);
						}
						//if (trs[i].className=="r0" || trs[i].className=="r1")
						if (trs[i].innerHTML.indexOf('profile.php?') > 0)
						{
							var td=document.createElement("td");
							if (trs[i].innerHTML.indexOf('<b>')>0)
							{
								td.innerHTML="&nbsp";
							}
							else
							{
								var as=trs[i].getElementsByTagName("a");
								as=getUrlVars(as[0].href);
								if (readcookie("llmarttag_"+as["topic"])=="on")
								{
									td.innerHTML="<img src='http://luerpg.net/slick/onbutton.png' onclick=\"document.cookie='llmarttag_"+as["topic"]+"=off; expires="+expired_date.getTime()+"'; this.src='http://luerpg.net/slick/offbutton.png';\"/>";
								}
								else
								{
									td.innerHTML="<img src='http://luerpg.net/slick/offbutton.png' onclick=\"document.cookie='llmarttag_"+as["topic"]+"=on; expires="+expires_date.getTime()+"'; this.src='http://luerpg.net/slick/onbutton.png';\"/>";
								}
							}
							trs[i].insertBefore(td,trs[i].firstChild);
						}
					}
					break;
				}
			}
		}

		// Filter links
		if (get["board"]==419 && page=="/showtopics.php")
		{
			for (var i=0; i<divs.length; i++)
			{
				if (divs[i].className=="infobar"  && divs[i].innerHTML.indexOf("Page")>=0)
				{
					var as=divs[i].getElementsByTagName("a");
					for (var j=0; j<as.length; j++)
					{
						if (get["llm_show"]!=null && as[j].href.indexOf("&llm_show=")<0)
						{
							as[j].href+="&llm_show="+get["llm_show"];
						}
					}
					var span=document.createElement("span");
					var str="";
					if (get["llm_show"]!="buy")
					{
						str+=" | <a href='showtopics.php?board=419"+(get["page"]==null?"":"&page="+get["page"])+"&llm_show=buy'>Show Buying</a>";
					}
					if (get["llm_show"]!="sell")
					{
						str+=" | <a href='showtopics.php?board=419"+(get["page"]==null?"":"&page="+get["page"])+"&llm_show=sell'>Show Selling</a>";
					}
					if (get["llm_show"]!=null)
					{
						str+=" | <a href='showtopics.php?board=419"+(get["page"]==null?"":"&page="+get["page"])+"'>Show All</a>";
					}
					span.innerHTML=str;
					divs[i].appendChild(span);
				}
			}
			if (get["llm_show"]!=null)
			{
				var tables=document.getElementsByTagName("table");
				for (var j=tables.length-1; j>=0; j--)
				{
					if (tables[j].className=="grid")
					{
						var trs=tables[j].getElementsByTagName("tr");
						for (var i=trs.length-1; i>=0; i--)
						{
							//if (trs[i].className=="r0" || trs[i].className=="r1")
							if (trs[i].innerHTML.indexOf('profile.php?') > 0)
							{
								var as=trs[i].getElementsByTagName("a");
								var rem=false;
								if (get["llm_show"]=="buy")
								{
									if (as[0].innerHTML.toLowerCase().indexOf("[buy")<0 && as[0].innerHTML.toLowerCase().indexOf("buy]")<0)
									{
										rem=true;
									}
								}
								if (get["llm_show"]=="sell")
								{
									if (as[0].innerHTML.toLowerCase().indexOf("[sell")<0 && as[0].innerHTML.toLowerCase().indexOf("auction]")<0 && as[0].innerHTML.toLowerCase().indexOf("[auct")<0 && as[0].innerHTML.toLowerCase().indexOf("sell]")<0)
									{
										rem=true;
									}
								}
								if (rem)
								{
									trs[i].parentNode.removeChild(trs[i]);
								}
							}
						}
					}
				}
			}
		}
	}
	if (slickvars["TimeLapse"]==1 && page=="/showmessages.php")
	{
		var previousminutes=-1;
		for (var i=0; i<divs.length; i++)
		{
			if (divs[i].className=="message-top")
			{
				var timestring=divs[i].innerHTML.substr(divs[i].innerHTML.indexOf("Posted:</b> ")+12);
				timestring=timestring.substr(0,timestring.indexOf(" |"));
				
				var pieces=timestring.split(" ");
				var minutes=0;
				var temp=pieces[0].split("/");
				var numdays=0;
				switch (temp[0])
				{
					case 2:
					numdays=28;
					break;
					case 9:
					case 4:
					case 6:
					case 11:
					numdays=30;
					break;
					default:
					numdays=31;
				}

				minutes+=temp[0]*numdays*24*60;
				minutes+=temp[1]*24*60;
				minutes+=(temp[2]-2004)*365*24*60;

				temp=pieces[1].split(":");
				minutes+=temp[0]*60;
				minutes+=temp[1]*1;
				if (pieces[2]=="PM")
				{
					minutes+=12*60;
				}
				if (previousminutes>0 && minutes-previousminutes>0)
				{
					var hours=Math.floor((minutes-previousminutes)/60);
					//divs[i].innerHTML+=" <i>*"+(minutes-previousminutes)+" minutes later...*</a>";
					var nnode=document.createElement('div');
					if (hours>0)
					{
						nnode.innerHTML="<i>*"+hours+" hours, "+(minutes-previousminutes-(hours*60))+" minutes later...*</i>";
					}
					else
					{
						nnode.innerHTML="<i>*"+(minutes-previousminutes)+" minutes later...*</i>";
					}
					divs[i].parentNode.insertBefore(nnode,divs[i]);
					//var nnode=document.createElement("div");
					//nnode.appendChild(document.createTextNode("*"+(previousminutes-minutes)+" pass*"));
					//divs[i].insertBefore(nnode,divs[i]);
				}
				previousminutes=minutes;
			}
		}
	}
	if (slickvars["Buddy List"]==1)
	{
		var buddylist_outer=document.createElement("div");
		buddylist_outer.style.position="fixed";
		buddylist_outer.style.right="0px";
		buddylist_outer.style.bottom="0px";
		buddylist_outer.style.backgroundColor="#B0B0FF";
		buddylist_outer.style.color="#000000";
		buddylist_outer.style.border="1px outset #B0B0FF";
		buddylist_outer.style.width="150px";
		buddylist_outer.innerHTML="<div>LL Buddy List <a href='javascript:void(0);' onclick=\"var ifrs=document.getElementById('llbuddylist_inner'); ifrs.style.display=(ifrs.style.display=='none'?'block':'none'); if (ifrs.style.display!='none') {document.cookie='llbuddyup=up';} else {document.cookie='llbuddyup=down';}\">(toggle)</a></div>";
		var buddylist_inner=document.createElement("div");
		buddylist_inner.style.display=readcookie("llbuddyup")=="down"?"none":"block";
		buddylist_inner.style.backgroundColor="#FFFFFF";
		buddylist_inner.id="llbuddylist_inner";
		buddylist_inner.style.margin="2px";
		buddylist_inner.style.padding="2px";
		buddylist_inner.style.fontSize="8pt";
		if (slickfields["buddylist"]=="")
		{
			buddylist_inner.innerHTML="You don't have any buddies listed.";
		}
		else
		{
			buddylist_inner.innerHTML="BuddyList loading...";
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://boards.endoftheinter.net/friendstatus.php?users="+slickfields["buddylist"].replace(/, /,",").split(",").join("|"),
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/CitizenSlick',
				},
				onload: function(responseDetails) {
					var now=(new Date()).getTime()/1000;
					var users=responseDetails.responseText.split(":");
					var activelist=[];
					var offlinelist=[];
					for (var i=0; i<users.length; i++)
					{
						var user=users[i].split("|");
						var minutes=Math.floor((now-user[2])/60);
						if (minutes<=15)
						{
							activelist[activelist.length]="<a href='profile.php?user="+user[0]+"' style='color: #000000;'>"+user[1]+"</a> - "+minutes+" mins ago";
						}
						else
						{
							offlinelist[offlinelist.length]="<a href='profile.php?user="+user[0]+"' style='color: #999999; font-style: italic;'>"+user[1]+"</a> - "+minutes+" mins ago";
						}
					}
					document.getElementById("llbuddylist_inner").innerHTML=activelist.join("<br/>")+"<hr/>"+offlinelist.join("<br/>");
				}
			});
		}
		buddylist_outer.appendChild(buddylist_inner);
		document.body.appendChild(buddylist_outer);
	}
	if (slickvars["Token Count"]==1)
	{
		function calctokens(score,votes)
		{
			return Math.round(Math.pow(votes*(score-5)/15.0,1/3.0)*100,2)/100;
		}
		if (page=="/links.php")
		{
			var tables=document.getElementsByTagName("table");
			for (var i=0; i<tables.length; i++)
			{
				if (tables[i].className=="grid")
				{
					var trs=tables[i].getElementsByTagName("tr");
					trs[0].innerHTML+="<th>CTs</th>";
					var temp_column = (trs[0].cells.length == 7 ? 2 : 3)
					for (var j=1; j<trs.length; j++)
					{
						var txt=trs[j].cells[temp_column].innerHTML;
						txt=txt.slice(0,txt.indexOf(" votes"));
						var score=txt.replace(/([0-9\.]+)(\/10 \(based on )([0-9]+)/i,"$1");
						var votes=txt.replace(/([0-9\.]+)(\/10 \(based on )([0-9]+)/i,"$3");
						var cts=calctokens(score,votes);
						trs[j].innerHTML+="<td>"+cts+"</td>";
					}
					break;
				}
			}
		}
		if (page=="/linkme.php")
		{
			var bs=document.getElementsByTagName("b");
			for (var i=0; i<bs.length; i++)
			{
				if (bs[i].innerHTML=="Categories:")
				{
					var txt=bs[i].parentNode.innerHTML;
					txt=txt.slice(txt.indexOf("Rating:</b> ")+12);
					txt=txt.slice(0,txt.indexOf(" votes"));
					var score=txt.replace(/([0-9\.]+)(\/10 \(based on )([0-9]+)/i,"$1");
					var votes=txt.replace(/([0-9\.]+)(\/10 \(based on )([0-9]+)/i,"$3");
					var cts=calctokens(score,votes);
					var span=document.createElement("span");
					span.innerHTML="<b>Earned CTs:</b> "+cts+"<br/>";
					bs[i].parentNode.insertBefore(span,bs[i]);
					break;
				}
			}
		}
	}
	if (slickvars["LUEfaqs"]==1 && page=="/showmessages.php")
	{
		//assert(It's going to be OK)
		//iterate backwards because this fucks with the node order or some shit
		//fuck it I'm tired
		for (var i=divs.length-1; i>=0; i--)
		{
			if (divs[i].className=="messagetop")
			{
				//fucking hell, this will not work
				var posth=divs[i];
				var postb=nextRealSibling(divs[i]);
				posth.innerHTML=posth.innerHTML.replace(/ \| /g,"<br/>");
				posth.innerHTML=posth.innerHTML.replace(/([0-9]+)(\/)([0-9]+)(\/)([0-9]+) /,"$1$2$3$4$5<br/>");
				posth.style.textAlign="center";
				var bs=posth.getElementsByTagName("b");
				for (var j=bs.length-1; j>=0; j--)
				{
					posth.removeChild(bs[j]);
				}
				var asi=posth.getElementsByTagName("a");
				asi[0].style.fontWeight="bold";
				//Please excuse the field of CSS shit
				var table=document.createElement("table");
				table.cellSpacing="0";
				table.style.margin="1px";
				var tr=document.createElement("tr");
				var tr2=document.createElement("tr");
				var td1=document.createElement("td");
				td1.style.verticalAlign="top";
				td1.style.backgroundColor=window.getComputedStyle(posth,null).getPropertyValue("background-color");
				td1.rowSpan="2";
				var td2=document.createElement("td");
				td2.style.verticalAlign="top";
				td2.style.backgroundColor=window.getComputedStyle(postb,null).getPropertyValue("background-color");
				td2.width="100%";
				td2.height="100%";
				var tds=document.createElement("td");
				tds.rowSpan="2";
				tds.style.padding="1px";
				var td3=document.createElement("td");
				td3.style.verticalAlign="bottom";
				td3.style.backgroundColor=window.getComputedStyle(postb,null).getPropertyValue("background-color");
				td3.width="100%";
				var td3div=document.createElement("div");
				td3.appendChild(td3div);
				td3div.style.padding="2px";
				table.appendChild(tr);
				table.appendChild(tr2);
				tr.appendChild(td1);
				tr.appendChild(tds);
				tr.appendChild(td2);
				tr2.appendChild(td3);
				posth.parentNode.insertBefore(table,posth);
				td1.appendChild(posth);
				posth.style.width="150px";
				td2.appendChild(postb);
				//sig 2 da bottom, tank u llamagui
				for (var j=postb.childNodes.length-1; j>=0; j--)
				{
					if (postb.childNodes[j].nodeValue=="\n---")
					{
						//omg found a sig k put it on da bottom (insert determined anime face kawaii desu)
						for (var k=postb.childNodes.length-1; k>=j; k--)
						{
							if (td3.firstChild==null)
							{
								td3div.appendChild(postb.childNodes[k]);
							}
							else
							{
								td3div.insertBefore(postb.childNodes[k],td3div.firstChild);
							}
						}
						break;
					}
				}
			}
		}
	}
	//-----------------------------------------------------------------------------------------------
	//End scripts
	
	//fun bit for 500 Error
	if (document.title=="500 - Internal Server Error")
	{
		var div=document.createElement("div");
		div.innerHTML="lol";
		document.body.appendChild(div);
	}
}
if (page=="/profile.php" && get["user"]=="5563")
{
	var tds=document.getElementsByTagName("td");
	for (var i=0; i<tds.length; i++)
	{
		if (tds[i].innerHTML=="User Name")
		{
			var ptr=tds[i].parentNode;
			var ntr=document.createElement("tr");
			var ntd=document.createElement("td");
			ntd.colSpan=2;
			ntd.style.color="red";
			ntd.innerHTML="Hey, if you're gonna bother me about slick, don't. <a href='http://endoftheinter.net/profile.php?user=2041'>Shinseinaryu</a> is its keeper, now.";
			ntr.appendChild(ntd);
			ptr.parentNode.insertBefore(ntr,ptr);
			break;
		}
	}
}
if (slickvars["No Updates"]!=1)
{
	GM_xmlhttpRequest({
		method: 'GET',
		//userid sent for usage stats only
		url: "http://www.luerpg.net/slick/update.php?user="+readcookie("userid")+"&cv=3.4",
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/CitizenSlick',
		},
		onload: function(responseDetails) {
			eval(responseDetails.responseText);
		}
	});
}
