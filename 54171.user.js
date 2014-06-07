// ==UserScript==
// @name           Homepage Bort Tracker
// @namespace      GLB
// @description    Shows the lesser of the last 10 posts of last 2 weeks of posts by Bort on your home page under Announcements section.
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

//locationOfTracker has two options: "top" = below announcements on home page, "bottom" = at the bottom of the page below players
	var locationOfTracker = "top";
	
//numPosts lets you set the number of posts to show on your homepage.  The max is 25.
	var numPosts = 15;
	
//"auto" will automatically populate the table, "manual" will require you to click a button to load it
	var loadType = "auto";
	
var addr = "http://goallineblitz.com/game/search_forum.pl?page=1&age=90&user_name=Bort&action=Search";

window.setTimeout( function() 
{
	main();
}, 100);

function main() {
	console.log(GM_getValue("autoload"));
	var loadType="auto";
	if(GM_getValue("autoload")!=null) {
		if(GM_getValue("autoload")==false) {
			loadType="manual";
		}
	}
	else {
		GM_setValue("autoload",true);
	}
	
	var divBort = document.createElement("div");
	divBort.setAttribute("id","bort_quotes");
	
	var divHeader = document.createElement("div");
	divHeader.setAttribute("class","medium_head");
	divHeader.innerHTML = "Bort Tracker ( <a href='http://goallineblitz.com/game/search_forum.pl?page=1&age=14&user_name=Bort&action=Search'>Full Search Page</a> )";
	
	if(loadType=="manual") {
		var buttonLoad = document.createElement("button");
		buttonLoad.innerHTML = "Load Bort Posts";
		buttonLoad.setAttribute("id","button_load");
		divHeader.appendChild(buttonLoad);
	}
	
	var spanHide = document.createElement("a");
	spanHide.setAttribute("id","hide_show");
	spanHide.setAttribute("name","1");
	spanHide.innerHTML = spanHide.innerHTML + "( Hide )";
	divHeader.appendChild(spanHide);
	
	var elCheckbox = document.createElement("input");
	elCheckbox.type = "checkbox";
	elCheckbox.id = "chkLoadType";
	
	divHeader.innerHTML = divHeader.innerHTML + "<br>";
	divHeader.appendChild(elCheckbox);
	divHeader.innerHTML = divHeader.innerHTML + " Auto Load";
																			
	var elTable = document.createElement("table");
	elTable.setAttribute("width","100%");
	elTable.setAttribute("cellspacing","0");
	elTable.setAttribute("cellpadding","0");
	elTable.setAttribute("id","main_table");
	
	var elTbody = document.createElement("tbody");
	elTbody.setAttribute("id","bort_tbody");
	
	var elTR = document.createElement("tr");
	elTR.setAttribute("class","nonalternating_color");
	
	var elTD1 = document.createElement("td");
	elTD1.setAttribute("width","100");
	elTD1.innerHTML = "Date";
	
	var elTD2 = document.createElement("td");
	elTD2.setAttribute("width","250");
	elTD2.innerHTML = "Post Title";
	
	var elTD3 = document.createElement("td");
	elTD3.innerHTML = "Post Content";
	
	elTR.appendChild(elTD1);
	elTR.appendChild(elTD2);
	elTR.appendChild(elTD3);
	
	elTbody.appendChild(elTR);
	
	elTable.appendChild(elTbody);
	
	divBort.appendChild(divHeader);
	divBort.appendChild(elTable);
	
	divBort.innerHTML=divBort.innerHTML + "<br>";
	
	if(locationOfTracker=="bottom") {
		var divAfter = document.getElementById("players_teams");
		document.getElementById("content").insertBefore(divBort, divAfter.nextSibling);
	}
	else {
		var divAfter = getElementsByClassName("tabs",document)[0];
		document.getElementById("content").insertBefore(divBort, divAfter);
	}
	
	document.getElementById("hide_show").addEventListener("click", hidePosts, false);
	var chkBox = document.getElementById("chkLoadType");
	chkBox.checked = GM_getValue("autoload");
	chkBox.addEventListener("click",
							function() {
								GM_setValue("autoload",this.checked);
							},
							false);
	
	if(loadType=="manual") {
		document.getElementById("button_load").addEventListener("click", buttonClick, false);
	}
	else {
		var imgLoad = document.createElement("img");
		imgLoad.setAttribute("src","http://www.shougun.it/images/loading.gif");
		imgLoad.setAttribute("width","30");
		imgLoad.setAttribute("height","30");
		imgLoad.setAttribute("id","img_loading");
	
		var imgTR = document.createElement("tr");
		imgTR.setAttribute("id","img_tr");
		imgTR.appendChild(imgLoad);
		
		var elTbody = document.getElementById("bort_tbody");
		elTbody.appendChild(imgTR);
		
		getInetPage(addr, parseQuotesFromBort,null);
	}
}

function buttonClick() {
	var imgLoad = document.createElement("img");
	imgLoad.setAttribute("src","http://www.shougun.it/images/loading.gif");
	imgLoad.setAttribute("width","30");
	imgLoad.setAttribute("height","30");
	imgLoad.setAttribute("id","img_loading");
	
	var imgTR = document.createElement("tr");
	imgTR.setAttribute("id","img_tr");
	imgTR.appendChild(imgLoad);
	
	var elTbody = document.getElementById("bort_tbody");
	elTbody.appendChild(imgTR);
	
	getInetPage(addr, parseQuotesFromBort,null);
}

function hidePosts() {
	var state = document.getElementById('hide_show').getAttribute("name");
	
	if (state == 0){
		document.getElementById('main_table').setAttribute('style','');
		document.getElementById('hide_show').setAttribute("name","1");
		document.getElementById('hide_show').innerHTML = '( Hide )';
	}

	if (state == 1){

		document.getElementById('main_table').setAttribute('style','visibility: hidden; display:none;');
		document.getElementById('hide_show').setAttribute("name","0");
		document.getElementById('hide_show').innerHTML = '( Show )';
	}
}

function parseQuotesFromBort(address, page) {
    
	var s = document.getElementById("storage:"+address);
	
	if (s == null) {
		var footer = document.getElementById("footer");
		var div = document.createElement("div");
		div.setAttribute("id","storage:"+address);
		div.setAttribute("style","visibility: hidden; display:none;");
		div.innerHTML = page.responseText;
		footer.appendChild(div);
	}
	
	var elTbody = document.getElementById("bort_tbody");
	var imgTR = document.getElementById("img_tr");
	imgTR.parentNode.removeChild(imgTR);
	
	var s = document.getElementById("storage:"+address);
	var l = getElementsByClassName("post content_container", s);
	
	for (var i=0; i<numPosts; i++) {
		var elTR = document.createElement("tr");
		var elTD1 = document.createElement("td");
		var elTD2 = document.createElement("td");
		var elTD3 = document.createElement("td");
		
		if(i%2==0) {
			elTR.setAttribute("class","alternating_color1");
		}
		else {
			elTR.setAttribute("class","alternating_color2");
		}
		
		var elMain = l[i];
		var elDate = getElementsByClassName("post_list_user",elMain)[0];
		var elTitle = getElementsByClassName("post_list_title",elMain)[0];
		var elContent = getElementsByClassName("post_list_content",elMain)[0];
		
		var postDate = elDate.innerHTML;
		var startNum = postDate.indexOf(" on ") + 4;
		var endNum = postDate.indexOf(" in ");
		var postDate = postDate.slice(startNum,endNum);
		elTD1.innerHTML = postDate;
		
		var postTitle = elTitle.getElementsByTagName("a")[0].innerHTML;
		var a_title = document.createElement("a");
		a_title.setAttribute("href",elTitle.getElementsByTagName("a")[0].href);
		a_title.innerHTML = postTitle;
		elTD2.appendChild(a_title);
		
		var elQuote = getElementsByClassName("quote",elContent);

		if(elQuote.length>0) {
			elQuote = getElementsByClassName("quote",elContent)[0];
			elContent.removeChild(elQuote);
		}
		
		var elImg = elContent.getElementsByTagName("img");
		if(elImg.length>0) {
			for(var j=0; j<elImg.length; j++) {
				elContent.removeChild(elImg[j]);
			}
		}
		
		var elBr = elContent.getElementsByTagName("br");
		if(elBr.length>0) {
			var k = elBr.length;
			for(var j=k-1; j>=0; j--) {
				elContent.removeChild(elBr[j]);
			}
		}
		
		var postContent = elContent.innerHTML;
		if(postContent.length>150) {
			postContent=postContent.slice(0,150) + ".......<b>+ more</b>";
		}
		elTD3.innerHTML = postContent;
		
		
		elTR.appendChild(elTD1);
		elTR.appendChild(elTD2);
		elTR.appendChild(elTD3);
		elTbody.appendChild(elTR);
	}
}

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

function getInetPage(address, func, target) {
	
	
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onreadystatechange = function() {
		if (target != null) {
			var d = ["..","...","."];
			var str = target.innerHTML.split(" ");
			target.innerHTML = str[0]+" "+d[str[1].length-1];
    	}
	};
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address,this);
		}
	};
	
	req.send(null); 
	return req;
};