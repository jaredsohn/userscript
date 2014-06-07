// ==UserScript==
// @name           dev_group_list_enlarger
// @description    RegExp in Group-list + all (more than 45!) your groups listed!
// @namespace      dev_group_list_enlarger
// @include        http://*.deviantart.com/*
// @exclude        http://adcast.deviantart.com/*
// @exclude        http://adsrv.deviantart.com/*
// @version        1.0
// @contributor    Dediggefedde
// ==/UserScript==
(function(){
var wartbild="data:image/gif;base64,R0lGODlhFAAUAMwAAAAAAAAAAE9PT%2F%2F%2F%2F2lpadqkApmZmaJ6An9%2Ff%2F7klScnJ5OTk%2F3LNVxcXG1tbXR0dDQ0NKenp7meTdPT04iIiLS0tMzMzExMTKaZck5EJmRXLn9ySoBlFJR5KAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJGQAAACwFAAEACgASAEAFTSAAEEEZEGIaHEaQjkIso0BQMPdRuPAwFAMBiiAwmYSiFUPHExF9yJ5viiQUgL7C8CCTaWHXQiIKLpCThkEz%2BfM1A9mpi2io26MkEy0EACH5BAkKAAAALAUAAQAKABIAQAVNIAAQQRkQYhocRpCOQiyjQFAw91G48OAPAhRBYDIFRSuGjica%2Bo69QqJwAAp%2Fv6tMVhAKCuAEFAYeIw0DJtJXZQZ8hZ9raKjboSQTLQQAIfkECRkAAAAsBQABAAoAEgBABVEgABBBGRBiGhxGkI5CLKNAwBTDcDAurOcCFEFgMgVFgQTjUOiJhkDasJCgFg5HQm47EGJlsS6MyUgcnwLqWWUYOJEDnFsVv%2BJcQ4N%2BfyaZaCEAIfkECRkAAAAsBQABAAoAEgBABUsgABBBGRBiGhxGkI5CLKNAwAw47sLFkRQCFEFgMgVFgQTjUNiJhoPDkff7SYW5HFYmGwgFh9yUOkYaBk5k1rkq9ApomGFOn5JMtBAAIfkECRkAAAAsBQABAAoAEgBABU0gABBBGRBiGhxGkI5CLKNAMNy4CydHUQgogsBkAooChUFPJxLejLBCQlo4GAk4XHAgkw2Cgiw0mhgfDQPmceA7MJFtn0toqNuhJBMtBAAh%2BQQJGQAAACwDAAEADwASAEAFdiAgjmJVGWQaZIclBEiKBErwNGkuNtEQvTBCQ1AoHgqcgC7VmCEGTp1jQKUuKoABgACbDBbKFEXwMEgShQ1kyZxGdYGFoPY0YFWL6lxAySkwVi8yAQISAxcOKQQOCBNoBR04igEGFgVHAhpwCmRmmWwIEA0ESyEAIfkECRkAAAAsAgAFABAACgBABUEgQBBAaZ4jEAhCQJ5iMLRrURzFYAx8Twu81ouwCgZqtsOvNzuyXLBYc5UoJKZAnzOBwxV2zB9OWCJmW6JXtEwKAQAh%2BQQJGQAAACwCAAEADwASAEAFdyAgAoazjCiKBIJ1ZEgqA88TKEEMEKsiRIWIY5YKGAZIpKIBWCEKCEXkJKMsCljskDgKLAaTKIEIOQ4MhoeAInIWHEyZQQG9CRaBqsCXxZPvWBgKXCQOFwMSARA6Mw0TEkhhDmMpAgJJFgYBlCiWaGo4XAQNiyMhADs%3D";

var grouplist =new Array();
if(GM_getValue("grouplist")){grouplist=GM_getValue("grouplist").split(String.fromCharCode(21));}

function fireEvent(obj, evt){
	var fireOnThis = obj;
	if (document.createEvent) {
		var evObj = document.createEvent('MouseEvents');
		evObj.initEvent(evt, true, false);
		fireOnThis.dispatchEvent(evObj);
	} else if (document.createEventObject) {
		fireOnThis.fireEvent('on' + evt);
	}
}



function getgroups(offset, by) {
	var but = document.getElementById("dev_gle_update");
	but.innerHTML="<img alt='loading groups' title='loading groups...' src='"+wartbild+"' style='position:relative;top:3px;margin-left:-10px;' />Update List of Groups<b></b>";
	
	GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://'+by+'.deviantart.com/mygroups/?offset='+offset,
        onload: function (responseDetails) {
			// get all grounames as they are text between a-tags
			var rex = /#<a .*? target="_blank">(.*?)<\/a>/gi;
			var iter="";
			while(iter = rex.exec(responseDetails.responseText)){
				grouplist.push(iter[1]);	
			}
			
			// check if browsing needed
			if(responseDetails.responseText.search(new RegExp('<a class="disabled">Next</a>',"i"))==-1){
				// Back up current state and switch to next page
				GM_setValue("grouplist",grouplist.join(String.fromCharCode(21)));	
				getgroups(offset+100,by); //100 groups per page
			}else{
				GM_setValue("grouplist",grouplist.join(String.fromCharCode(21)));	
				but.innerHTML="Update List of Groups<b></b>";
			}
        },
		onerror: function(error){
			console.log("Loading-Error: "+error)
		}
    });
}

function start(){

	// check, if group-window opened
	var g_olist=document.getElementById("groupname-search");
	if(!g_olist){setTimeout(start,500);return}
	
	// copy element to remove all Events, as the old list
	var g_list=g_olist.cloneNode(true);
	g_olist.parentNode.insertBefore(g_list,g_olist);
	g_olist.parentNode.removeChild(g_olist); 
	
	// Add own handler for own list
	if(window.opera){
		g_list.onkeyup =rem;
		document.getElementById("manual_input").onclick = function(){updatebutton(true);}; 
		document.getElementById("favourites_list").onclick = function(){updatebutton(false);};
	}else{
		g_list.addEventListener("keyup",rem);
		document.getElementById("manual_input").addEventListener("click",function(){updatebutton(true);});
		document.getElementById("favourites_list").addEventListener("click",function(){updatebutton(false);});
	}
}

function rem(){

	var altlist = document.getElementsByClassName("popup2 popup2-groupsearch")[0];
	if(altlist){altlist.parentNode.removeChild(altlist);}
	
	if(this.value==""){return;}
	
	var textbox=document.getElementById("groupname-search");
	var ttop = parseInt(textbox.offsetTop)+parseInt(textbox.offsetHeight);
	var tleft = parseInt(textbox.offsetLeft);
	var tparent=textbox.offsetParent;
	while(tparent){
		ttop += parseInt(tparent.offsetTop);
		tleft += parseInt(tparent.offsetLeft);
		tparent=tparent.offsetParent;
	}
	
	var pop = document.createElement("div");
	pop.className="popup2 popup2-groupsearch";	
	pop.setAttribute("style","visibility:visible;left:"+tleft+"px; top:"+ttop+"px;");
	document.getElementsByClassName("container")[0].appendChild(pop);
	var cont = document.createElement("div");
	cont.id="groups-list-popup";
	pop.appendChild(cont);
	var contlist=document.createElement("ul");
	contlist.id="groups-list";
	cont.appendChild(contlist);
	for(var i in grouplist){
		if(!grouplist[i].match(new RegExp(this.value,"i"))){continue;}
		var contentry=document.createElement("li");
		contentry.id=grouplist[i];
		contentry.className="group-option";
		contentry.setAttribute("style","display:list-item;");
		contlist.appendChild(contentry);
		var contli = document.createElement("a");
		contli.innerHTML="#"+grouplist[i];
		contli.href="#";
		contentry.appendChild(contli);
		if(window.opera){
			contentry.onmouseover = function(){this.className="group-option mock-hover";};
			contentry.onmouseout = function(){this.className="group-option";};
			contentry.onclick= function(){
				document.getElementById("groupname-search").value=this.id;
				var altlist = document.getElementsByClassName("popup2 popup2-groupsearch")[0];
				if(altlist){altlist.parentNode.removeChild(altlist);}
							fireEvent(document.getElementById("groupname-check"), 'click');
			};
		}else{
			contentry.addEventListener("mouseover",function(){this.className="group-option mock-hover";});
			contentry.addEventListener("mouseout",function(){this.className="group-option";});
			contentry.addEventListener("click",function(){
				document.getElementById("groupname-search").value=this.id;
				var altlist = document.getElementsByClassName("popup2 popup2-groupsearch")[0];
				if(altlist){altlist.parentNode.removeChild(altlist);}
							fireEvent(document.getElementById("groupname-check"), 'click');
			});
		}
	}
}

function updatebutton(buttadd){
	if(buttadd){
		var but=document.createElement("a");
		but.innerHTML="Update list of groups<b></b>";
		but.className="gmbutton2 gmbutton2c";
		but.id="dev_gle_update";
		but.setAttribute("style","position:absolute;right:25px;bottom:65px;cursor:pointer;text-decoration:none;");
		document.getElementsByClassName("container")[0].appendChild(but);
		if(window.opera){
			but.onclick = function (){grouplist=new Array(); getgroups(0,user);}; 
		}else{
			but.addEventListener("click",function (){grouplist=new Array(); getgroups(0,user);});
		}
	}else{
		var but = document.getElementById("dev_gle_update");
		if(but){but.parentNode.removeChild(but);}
		var altlist = document.getElementsByClassName("popup2 popup2-groupsearch")[0];
		if(altlist){altlist.parentNode.removeChild(altlist);}
	}
}

if(!location.href.match(/AdServer/i)){
var user=document.getElementById("oh-menu-deviant").getElementsByClassName('oh-l')[0].getElementsByTagName('b')[0].innerHTML;

start();
}
})();
