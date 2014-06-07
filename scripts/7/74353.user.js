// ==UserScript==
// @name           GTAF Peacekeeper
// @namespace      www.userscript.org/sripts/show
// @date           2010-04-14
// @creator        mkey
// @include        http://www.gtaforums.com*
// ==/UserScript==

	var d=document, byId=d.getElementById, create=d.createElement, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName,
	skin,
	style= ".list_bx {width:200px;margin:2px;} .list_bx.fix {width:206px;} .list_bx.btn {width:85px;} .div_act {color:white;background-color:red;font:bold 15px sans-serif;padding:3px 0px 3px 5px;} .div_act a {color:black;} .div_act a:hover {color:grey;} .span_pt {padding-top:4px; padding-bottom:6px;}";
	const AFTERFUTURE=0,
	C_AFTERFUTURE=1,
	C_CERBERA=2,
	C_GTANET=3,
	C_MILITANT=4,
	GTA3COM=5,
	GTALCS=6,
	GTANET=7,
	GTANET_LIGHT=8,
	GTANET_XMAS=9,
	GTANET_PLUS=10,
	GTASA=11,
	GTAVICE=12,
	HASHCAKE=13,
	INVISION=14,
	SSH=15,
	CONNECTION=16;
	
	if (navigator.userAgent.search('Firefox')<0){
		GM_getValue= function (name, def){		// multiplatform value storage
			var val= window.localStorage.getItem(name);
			if (val==null) val= def;
			return val;
		}
		
		GM_setValue= function (name, val){		// multiplatform value retrieval
			window.localStorage.setItem(name, val);
		}
	}
	
(function(){
	skin= GM_getValue("gtaf_skin", -1);
	//console.log("Skin detected: "+skin);
	if (d.URL.indexOf("UserCP&CODE=06")>-1){
		if (skin<0) alert("GTAF Peacekeeper has now been activated!");
		GM_setValue("gtaf_skin", byTag("select")[1].selectedIndex);
	}
	else if (skin<0) Activation();
	else if (d.URL.indexOf("showtopic")>-1 || d.URL.indexOf("act=ST")>-1) Thread();
	else if (d.URL.indexOf("act=Post")>-1 || d.URL=="http://www.gtaforums.com/index.php?") PostEdit();
	else if (d.URL.indexOf("showuser")>-1) Profile();
})()

function Activation(){				// script activation for skin setting
	_addStyle(style);
	var div= create("div");
	div.className= "div_act";
	div.innerHTML= "To activate the GTAF Peacekeeper script, visit the <a href=\"http://www.gtaforums.com/index.php?act=UserCP&CODE=06\" ><u>Skin and Languages</u></a> page";
	d.body.insertBefore(div, d.body.firstChild);
}

function AddHandler(){				// profile control panel add button
	var input= byId("panel_1");
	var nick= input.value;
	if (nick!=0){
		var data= GM_getValue("gtaf_ignore_list", 0);
		if (data==0) GM_setValue("gtaf_ignore_list", nick+"|");
		else {
			var datas= data.split("|");
			var i;
			for (i=0; i<datas.length-1; i++) if (datas[i]==nick) break;
			if (i==datas.length-1) GM_setValue("gtaf_ignore_list", data+nick+"|");
			else { input.value= ""; return; }
		}
		var opt= create("option");
		opt.textContent= nick;
		byId("list_id").appendChild(opt);
		input.value= "";
	}
}

function FixQuotes(users){			// cover the "offending" quotes with spoiler tags
	// if (1){
		var p= byClass("postcolor"), t, q, c, s, i, j, k;
		for (i=0; i<p.length; i++){
			t= p[i].getElementsByTagName("td");
			for (j=0; j<t.length; j++){
				q= t[j].textContent;
				if (q.indexOf("QUOTE (")==0){
					nick= q.substring(7, q.indexOf(" @ "), 7);
					for (k=0; k<users.length-1; k++) if (nick==users[k]) break;
					if (k==users.length-1) continue;
					
					t[j+1].innerHTML= "<span onmouseout=\"this.style.color=this.style.backgroundColor='#000000'\" onmouseover=\"this.style.color='#FFFFFF';\" class=\"spoiler\" style=\"background-color: rgb(0, 0, 0); color: rgb(0, 0, 0);\">"+t[j+1].innerHTML+"</span>";
				}
			}
		}
	// }
}

function PostEdit(){				// post edit page
	var users= GM_getValue("gtaf_ignore_list", 0);
	if (!users) return;
	var nick, nicks, t, i, j, r=0;
	users= users.split("|");
	
	if (skin==AFTERFUTURE || (skin>GTA3COM && skin<HASHCAKE)){
		nicks= byClass("tableborder")[1].getElementsByClassName("row4");
		for (i= nicks.length-2; i>-1; i-=2){
			nick= nicks[i].textContent;
			for (j=0; j<users.length-1; j++) if (nick==users[j]) break;
			if (j==users.length-1) continue;
			// console.log("Removed post from: "+nick+" at post "+i);
			r++;
			nick= nicks[i].parentNode.nextSibling.nextSibling;
			nick.parentNode.removeChild(nick);
			nick= nicks[i].parentNode;
			nick.parentNode.removeChild(nick);
		}
	} else if (skin<GTA3COM){
		nicks= byClass("w20 bg1");
		for (i= nicks.length-1; i>-1; i--){
			nick= nicks[i].textContent;
			for (j=0; j<users.length-1; j++) if (nick==users[j]) break;
			if (j==users.length-1) continue;
			// console.log("Removed post from: "+nick+" at post "+i);
			r++;
			nick= nicks[i].parentNode.parentNode.parentNode;
			nick.parentNode.removeChild(nick);
		}
		
	} else if (skin==HASHCAKE){
		nicks= byClass("tableborder")[1].getElementsByClassName("titlemedium");
		for (i= nicks.length-3; i>-1; i-=2){
			nick= nicks[i].textContent;
			for (j=0; j<users.length-1; j++) if (nick==users[j]) break;
			if (j==users.length-1) continue;
			// console.log("Removed post from: "+nick+" at post "+i);
			r++;
			nick= nicks[i].parentNode.nextSibling.nextSibling;
			nick.parentNode.removeChild(nick);
			nick= nicks[i].parentNode;
			nick.parentNode.removeChild(nick);
		}
		
	} else if (skin==INVISION || skin==SSH){
		nicks= byClass("tableborder")[1].getElementsByClassName("row4");
		for (i= nicks.length-2; i>-1; i-=2){
			nick= nicks[i].textContent;
			for (j=0; j<users.length-1; j++) if (nick==users[j]) break;
			if (j==users.length-1) continue;
			// console.log("Removed post from: "+nick+" at post "+i);
			r++;
			nick= nicks[i].parentNode.nextSibling;
			nick.parentNode.removeChild(nick);
			nick= nicks[i].parentNode;
			nick.parentNode.removeChild(nick);
		}
	
	} else if (skin==GTA3COM || skin==CONNECTION){
		nicks= byClass("postdetails");
		for (i= nicks.length-1; i>-1; i--){
			nick= nicks[i].getElementsByTagName("b");
			nick= nick[0].textContent;
			for (j=0; j<users.length-1; j++) if (nick==users[j]) break;
			if (j==users.length-1) continue;
			nicks[i].parentNode.removeChild(nicks[i]);
			r++;
			// console.log("Removed post from: "+nick+" at post "+i);
		}
	
	} else console.log("ERROR: Unsupported skin format!");
	
	if (r>0){
		FixQuotes(users);
		GM_setValue("gtaf_ignored", Number(GM_getValue("gtaf_ignored", 0))+r);
		console.log("Removed some posts in this thread");
	}
}

function Profile(){					// profile page
	_addStyle(style);
	var row, nick, tr;
	
	if (skin>AFTERFUTURE && skin<GTA3COM){					// conventional
		//console.log("conventional");
		nick= byClass("content")[0].getElementsByTagName("a");
		if (nick[1].textContent!= byTag("h2")[0].textContent) return;
		
		tr= create("tr");
		byTag("table")[3].appendChild(tr);
		tr.innerHTML= "<td>User ignore list</td><td>"+ProfilePanel()+"</td>";
		
	} else if (skin==GTASA){									// gtasa
		//console.log("gtasa");
		nick= byClass("topsign")[0].getElementsByTagName("a");
		if (nick[0].textContent!= byClass("newcat")[0].textContent)	return;
		
		tr= create("tr");
		row= byClass("plainborder")[2].getElementsByTagName("tr");
		row[0].parentNode.insertBefore(tr, row[row.length-1]);
		
		tr.innerHTML= "<td class=\"row3\" valign=\"top\" style=\"font-weight:900;\" >User ignore list:</td><td class=\"row1\" align=\"left\" >"+ProfilePanel()+"</td>";
		
	} else if (skin==GTA3COM || skin==CONNECTION){				// gta3, connection
		//console.log("gta3");
		if (skin==GTA3COM) nick= byClass("maintitle")[0].getElementsByTagName("a");		// gta3.com
		else nick= byTag("strong")[0].getElementsByTagName("a");					// the connection
		if (nick[0].textContent!= byClass("pagetitle")[0].textContent) return;
		
		tr= create("tr");
		byClass("row3")[1].parentNode.parentNode.appendChild(tr);
		tr.innerHTML= "<td class=\"row3\" width=\"30%\" valign=\"top\" style=\"font-weight:900;\" >User ignore list</td><td class=\"bottomborder\" align=\"left\" >"+ProfilePanel()+"</td>";
		
	} else {										// afterfuture, 2k4, 2k4 lite, 2k4 xmas, lcs, gtavice, hashcake, invision, ssh
		//console.log("other");
		nick= (skin==SSH) ? byClass("maintitle")[0].getElementsByTagName("a") : byTag("strong")[0].getElementsByTagName("a");
		if (byId("profilename").textContent!= nick[0].textContent) return;
		
		tr= create("tr");
		row= (skin==GTANET_PLUS) ? byClass("tableborder")[2] : byClass("plainborder")[2];					// 2k4 plus fix
		row= row.getElementsByTagName("tr");
		if (skin>GTA3COM && skin<INVISION) row[0].parentNode.insertBefore(tr, row[row.length-1]); 			// 2k4 default, 2k4 light, 2k2 plus
		else row[0].parentNode.appendChild(tr);
		tr.innerHTML= "<td class=\"row3\" valign=\"top\" style=\"font-weight:900;\" >User ignore list:</td><td class=\"row1\" align=\"left\" >"+ProfilePanel()+"</td>";
	}
	
	byId("panel_1").addEventListener("keypress", function(e){
		var k= window.e || e;
		k= k.charCode || k.keyCode;
		if (k==13) BtnHandler();
	}, false);
	
	byId("panel_2").addEventListener("click", AddHandler, false);
	
	var list= byId("list_id");
	byId("panel_3").addEventListener("click", function(){
		var opt= list.selectedIndex;
		if (opt>-1){
			opt= list.getElementsByTagName("option")[opt];		// handler
			GM_setValue("gtaf_ignore_list", GM_getValue("gtaf_ignore_list").replace(opt.textContent+"|", ""));
			list.removeChild(opt);
		}
	}, false);
	
}

function ProfilePanel(){			// profile control panel
	var panel, cls, option="";
	
	if (byId("content")) cls= "forminput list_bx fix";					// lcs fix
	else if (byId("www-gtaforums-com") || byId("logostrip")) cls= "forminput list_bx fix";	// conventional & invision fix
	else cls= "forminput list_bx";
	
	var data= GM_getValue("gtaf_ignore_list", 0);
	if (data!=0){
		data= data.split("|");
		for (var i=0; i<data.length-1; i++) option+= "<option>"+data[i]+"</option>";
	}
	panel= "<input id=\"panel_1\" class=\"forminput list_bx\" type=\"text\" title=\"Press return to add\" /><input id=\"panel_2\" class=\"forminput list_bx btn\" type=\"button\" value=\"Add\" /><br/>";
	panel+= "<select id=\"list_id\" class=\""+cls+"\">"+option+"</select><input id=\"panel_3\" class=\"forminput list_bx btn\" type=\"button\" value=\"Remove\" /><br/>";
	panel+= "<div class=\"span_pt\">(Non-unique) posts blocked to date: "+GM_getValue("gtaf_ignored", 0)+"</div>";
	
	return panel;
}

function Thread(){					// thread
	var users= GM_getValue("gtaf_ignore_list", 0);
	if (users!=0){
		var nick, t, j, r=0;
		users= users.split("|");
		var nicks= (skin<GTA3COM) ? byClass("w20 bg1") : byClass("normalname");
		// console.log("nicks ignored: "+nicks.length);
		for (var i=nicks.length-1; i>-1; i--){
			nick= nicks[i].firstChild.textContent;
			for (j=0; j<users.length-1; j++) if (nick==users[j]) break;
			if (j==users.length-1) continue;
			
			if (skin<GTA3COM) t= nicks[i].parentNode.parentNode.parentNode;
			else if (skin==GTA3COM || skin==HASHCAKE){
				t= nicks[i].parentNode.parentNode;
				t.parentNode.removeChild(t.nextSibling.nextSibling.nextSibling.nextSibling);
				t.parentNode.removeChild(t.nextSibling.nextSibling.nextSibling);
				t.parentNode.removeChild(t.nextSibling.nextSibling);
				// t.parentNode.removeChild(t.nextSibling);
			}
			else if (skin==GTASA) t= nicks[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			else if (skin==GTAVICE) t= nicks[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			else if (skin==INVISION || skin==SSH) t= nicks[i].parentNode.parentNode.parentNode.parentNode;
			else if ((skin>GTA3COM && skin<GTASA) || skin==CONNECTION) t= nicks[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			else console.log("ERROR: Unsupported skin format!");
			
			if (skin==GTALCS || skin==GTANET_LIGHT) t.parentNode.removeChild(t.nextSibling.nextSibling);
			else if (skin>C_MILITANT && skin!=GTASA) t.parentNode.removeChild(t.nextSibling);
			t.parentNode.removeChild(t);
			r++;
			// console.log("Removed post from: "+nick+" at post "+i);
		}
		if (r>0){
			GM_setValue("gtaf_ignored", Number(GM_getValue("gtaf_ignored", 0))+r);
			console.log("Removed some posts in this thread");
		}
		FixQuotes(users);
	}
}

function _addStyle(style_){		// add style sheet to the document
	var s= d.createElement('style');
	s.textContent= style;
	d.getElementsByTagName('head')[0].appendChild(s);
}