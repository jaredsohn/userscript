// ==UserScript==
// @name           Fixed Google+ Notification Bar (for Google Plus & Google Search)
// @description    Makes the Google+ notification bar fixed for quicker access to notifications, post form, parameters.. on Google Plus and Google Search
// @version        1.1.2
// @homepage       http://userscripts.org/users/83500/scripts
// @include        http://plus.google.*
// @include        https://plus.google.*
// @include        http://www.google.*
// @include        https://www.google.*
// ==/UserScript==

// get the fix bar mode from the cookie
var i,x,y,ARRcookies = document.cookie.split(";");
for(i=0; i<ARRcookies.length; i++){
	x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	x = x.replace(/^\s+|\s+$/g,"");
	if (x == 'fixed_gplus_bar_allofit'){
		var fixed_gplus_bar_allofit = y;
	}
}

// fix the bar
if(fixed_gplus_bar_allofit != 'enabled'){ // entire bar mode not enabled
	var gbg = document.getElementById("gbg");
	var fixed = false;
	gbg.style.zIndex='999';
	gbg.style.position='fixed';
	gbg.style.top='0';
	gbg.style.right='0';
	window.addEventListener("scroll", function(){
		if(window.scrollY>0 && fixed==false){
			gbg.style.backgroundColor='#2D2D2D';
			gbg.style.boxShadow='0px 1px 3px #2D2D2D';
			fixed=true;
		} else if(window.scrollY<=0 && fixed==true){
			gbg.style.backgroundColor='transparent';
			gbg.style.boxShadow='none';
			fixed=false;
		}
	}, false);
} else { // entire bar mode enabled
	var gb = document.getElementById("gb");
	gb.style.zIndex='999';
	gb.style.position='fixed';
	gb.style.top='0';
	var gbz = document.getElementById("gbz");
	gbz.style.position='fixed';
	gbz.style.top='0';
	gbz.style.left='0';
	var gbg = document.getElementById("gbg");
	gbg.style.position='fixed';
	gbg.style.top='0';
	gbg.style.right='0';
	var gbx3 = document.getElementById("gbx3");
	gbx3.style.position='fixed';
	var gbx4 = document.getElementById("gbx4");
	gbx4.style.position='fixed';
	var regex = new RegExp("^https?://plus\.google\..*$");
	if(regex.exec(window.location.href) == null){ // then we're on google search
		var cnt = document.getElementById("main");
		cnt.style.marginTop = '30px';
	} else { // then we are on google plus
		var body_els = document.body.children;
		for(i=0; i<body_els.length; i++){
			if(body_els.item(i).className == 'a-ha-R a-f-ha-R'){
				body_els.item(i).style.marginTop = '30px';
			} else if(body_els.item(i).className == 'Yt Lla'){
				body_els = body_els.item(i).children;
				for(i=0; i<body_els.length; i++){
					if(body_els.item(i).className == 'QO'){
						body_els.item(i).style.marginTop = '30px';
					}
				}
			}
		}
	}
}

// add options to the google menu
var anchorscript = 'var exdate=new Date();exdate.setDate(exdate.getDate()+999);var c_value="';
if(fixed_gplus_bar_allofit != 'enabled'){ // entire bar mode not enabled
	anchorscript += 'enabled';
	var anchortext = 'Fix the entire bar';
} else { // entire bar mode already enabled
	anchorscript += 'disabled';
	var anchortext = 'Fix only the right part of the bar';
}
anchorscript += '; expires="+exdate.toUTCString()+";path=/";document.cookie="fixed_gplus_bar_allofit="+c_value;window.location.reload();return false;';
var menu_els = document.getElementById("gbd5").children;
for(i=0; i<menu_els.length; i++){
	if(menu_els.item(i).className == 'gbmc'){
		var menu_els = menu_els.item(i).children;
		for(i=0; i<menu_els.length; i++){
			if(menu_els.item(i).className == 'gbmcc'){
				var li = document.createElement('li');
				li.setAttribute('class', 'gbmtc');
				var div = document.createElement("div");
				div.setAttribute('class', 'gbmt gbmh');
				li.appendChild(div);
				menu_els.item(i).appendChild(li);
				li = document.createElement('li');
				li.setAttribute('class', 'gbkp gbmtc');
				var span = document.createElement('span');
				span.setAttribute('style', 'padding:0 20px; font-weight: bold; text-decoration: underline;');
				var spantextnode = document.createTextNode('Fixed Google+ Notification Bar:');
				span.appendChild(spantextnode);
				var br = document.createElement("br");
				var a = document.createElement("a");
				a.setAttribute('href', '');
				a.setAttribute('class', 'gbmt');
				a.setAttribute('onclick', anchorscript);
				var anchortextnode = document.createTextNode(anchortext);
				a.appendChild(anchortextnode);
				li.appendChild(span);
				li.appendChild(br);
				li.appendChild(a);
				menu_els.item(i).appendChild(li);
			}
		}
	}
}