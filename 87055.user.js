// ==UserScript==
// @name           Steam Forums UI - FF4beta
// @namespace      http://userscripts.org/scripts/show/
// @description    Steam forums user interface interface improvements
// @include        http://forums.steampowered.com/forums/forumdisplay.php?*
// @include        http://forums.steampowered.com/forums/
// @include        http://forums.steampowered.com/forums/index.php
// @include        http://forums.steampowered.com/forums/profile.php?do=editoptions
// ==/UserScript==

	var d= document;
	var url_fav= "http://i1018.photobucket.com/albums/af304/mkey82/fav-2.png";
	var url_no_fav= "http://i1018.photobucket.com/albums/af304/mkey82/no_fav-2.png";
	var fav_only;
	
	var style= (<r><![CDATA[
		.activate { color:black; background-color:red; margin:3px; padding:3px; }
		.activate a { font-weight:700; text-decoration:underline; }
		#fav_link a { margin:3px; text-decoration:underline; }
		.fav_icon { margin-right:1px; vertical-align:middle; border:none; }
	]]></r>).toString();
	
(function (){
	if (d.getElementById("navbar_username")) return;
	GM_addStyle(style);
	
	if (d.URL.indexOf("editoptions")>-1) Options();
	else if (GM_getValue("sui_active", -1)<0) Activate();
	else if (d.URL.indexOf("forumdisplay")>-1 && d.URL.indexOf("f=53")<0) ThreadPages();
	else Favorites();
})()

function Activate(){
	var div= d.createElement("div");
	div.className= "activate";
	d.body.insertBefore(div, d.body.firstChild);
	div.innerHTML= "To activate the Steam UI script, wisit <a href=\"http://forums.steampowered.com/forums/profile.php?do=editoptions\" >this</a> page in your profile";
}

function CreateFavIcon(fav, name){
	var img= d.createElement("img");
	img.className= "fav_icon";
	img.alt= fav;
	if (fav){
		img.src= url_fav;
		img.title= "Unmark as favorite";
	} else {
		img.src= url_no_fav;
		img.title= "Mark as favorite";
	}
	var a= d.createElement("a");
	a.href= "#";
	a.title= name;
	a.addEventListener("click", function(e){
		var img_= this.firstChild;
		if (img_.alt==0){
			img_.src= url_fav;
			img_.alt=1;
			GM_setValue(this.title, 1);
		} else {
			img_.src= url_no_fav;
			img_.alt=0;
			GM_setValue(this.title, 0);
		}
		e.preventDefault();
	}, false);
	a.appendChild(img);
	return a;
}

function Favorites(){
	var t= d.getElementById("collapseobj_forumbit_53");
	if (!t){
		t= d.getElementsByClassName("tborder")[2];
		if (!t){ GM_log("script broken"); return; }
	}
	
	var img= t.getElementsByClassName("inlineimg");
	var name, fav, td, td_, j;
	fav_only= GM_getValue("fav_only", 0);
	var t_= d.createElement("tbody");
	var tr= d.createElement("tr");
	t.parentNode.insertBefore(t_, t);
	t_.innerHTML= "<tr><td class=\"alt1\"></td><td class=\"alt1\" colspan=\"4\"><div class=\"smallfont\"><span><span id=\"fav_link\" ></span><table width=\"100%\" align=\"center\" ><tr><td><table id=\"first_sui\" width=\"100%\" ></table></td></tr></table></span></div></td></tr>";
	t_= d.getElementById("first_sui");
	
	for (var i=img.length-1; i>-1; i--){
		td= img[i].parentNode;
		name= td.textContent.trim();
		td.title= name;
		fav= GM_getValue(name, 0);
		
		if (fav_only && fav){
			td_= tr.getElementsByTagName("td");
			for (j=0; j<td_.length; j++) if (td.title>td_[j].title){ tr.insertBefore(td, td_[j]); break; }
			if (j==td_.length) tr.appendChild(td);
		} else td.insertBefore(CreateFavIcon(fav, name), img[i]);
	}
	
	var a= d.createElement("a"); a.href= "index.php";
	a.addEventListener("click", function(){
		if (GM_getValue("fav_only", 0)) GM_setValue("fav_only", 0);
		else GM_setValue("fav_only", 1);
	}, false);
	
	if (fav_only){
		a.textContent= "Show all subforums";
		a.title= "Click to show all game subforums";
		
		td_= tr.getElementsByTagName("td");
		j=3;
		for (var i=td_.length-1; i>-1; i--){
			if (j>2){
				j=0;
				tr= d.createElement("tr");
				t_.appendChild(tr);
			}
			j++;
			tr.appendChild(td_[i]);
		}
		t.parentNode.removeChild(t);
	} else {
		a.textContent= "Show favorites only";
		a.title= "Click to show only favorite game subforums";
	}
	d.getElementById("fav_link").appendChild(a);
	
	var a= d.createElement("a"); a.href= "index.php";
	a.textContent= "Clear favorites";
	a.addEventListener("click", function(e){
		var td;
		if (confirm("Are you sure you want to clear favorites?")){
			if (fav_only){
				td= d.getElementById("first_sui").getElementsByTagName("td");
				if (td.length){
					for (var i=0; i<td.length; i++)	GM_setValue(td[i].title, 0);
					GM_setValue("fav_only", 0);
				}
			} else {
				td= d.getElementById("collapseobj_forumbit_53").getElementsByTagName("td");
				if (td.length) for (var i=0; i<td.length; i++) GM_setValue(td[i].title, 0);
			}
		} else e.preventDefault();
	},false);
	d.getElementById("fav_link").appendChild(a);
}

function Options(){
	SetPostCount(d.getElementById("sel_umaxposts").selectedIndex);
	var inp= d.getElementsByClassName("panelsurround")[4].getElementsByTagName("input");
	inp[0].addEventListener("click", function(){ SetPostCount(d.getElementById("sel_umaxposts").selectedIndex); }, false);
	if (GM_getValue("sui_active", -1)<0){ GM_setValue("sui_active", 1); alert("The script has now been activated"); }
}

function SetPostCount(i){
	switch (i){
		case 0: i=15; break;
		case 1: i=5; break;
		case 2: i=10; break;
		case 3: i=20; break;
		case 4: i=30; break;
		default : i=40; break;
	}
	GM_setValue("sel_umaxposts", i);
}

function ThreadPages(){
	var td= d.getElementById("threadslist");
	if (!td) return;
	//var div= td.getElementsByTagName("div");
	td= td.getElementsByClassName("alt1");
	if (td.length<3) return;
	var a, k, span;
	for (var i=0; i<td.length; i+=3){
		GM_log(td.length+":"+i);
		k= td[i+2].textContent;
		if (k!="-"){
			k= Math.ceil((Number(k)+1)/GM_getValue("sel_umaxposts", 15));
			if (k>1){
				//a= div[i].getElementsByTagName("a");
				a= td[i+1].getElementsByTagName("a");
				if (a.length>0){
					span= d.createElement("span");
					span.setAttribute("style", "font-size:8px; vertical-align:text-top;");
					//div.appendChild(span);
					a= a[a.length-1];
					a.parentNode.appendChild(span);
					a= a.href;
					if (k==2) span.innerHTML= "(<a href=\""+a+"&page=1\" >1</a> <a href=\""+a+"&page=2\" >2</a>)";
					else if (k==3) span.innerHTML= "(<a href=\""+a+"&page=1\" >1</a> <a href=\""+a+"&page=2\" >2</a> <a href=\""+a+"&page=3\" >3</a>)";
					else if (k==4) span.innerHTML= "(<a href=\""+a+"&page=1\" >1</a> <a href=\""+a+"&page=2\" >2</a> <a href=\""+a+"&page=3\" >3</a> <a href=\""+a+"&page=4\" >4</a>)";
					else span.innerHTML= "(<a href=\""+a+"&page=1\" >1</a> <a href=\""+a+"&page=2\" >2</a> <a href=\""+a+"&page=3\" >3</a> ... <a href=\""+a+"&page="+k+"\" >"+k+"</a>)";
				}
			}
		}
	}
}

