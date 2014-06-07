// ==UserScript==
// @name           Facebook Mass Accept light Requests
// @description    Adds checkboxes to each request and a big accept button allowing you to accept them all at once
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @copyright      JoeSimmons
// @lighted by     Sylvain Cote
// @version        1.1.20
// ==/UserScript==

/*
Changelog
1.1.20 - lighted the code and show only  check and uncheck all and mass accept button
*/

var version = "1.1.20",
enableInGalleries = false; // for fb url cleaner

// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/scripts/show/51532
function $g(que, O) {
if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
var obj=O||({del:false,type:6,node:document}), r, t,
	idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
if(idclass_re.test(que)) {
var s=que.split(' '), r=new Array(), c;
for(var n=0; n<s.length; n++) {
switch(s[n].substring(0,1)) {
case '#': r.push(document.getElementById(s[n].substring(1))); break;
case '.': c=document.getElementsByClassName(s[n].substring(1));
		  if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
}
}
if(r.length==1) r=r[0];
} else if(xp_re.test(que)) {
r = (obj['doc']||document).evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
}
if(r && obj['del']===true) {
if(r.nodeType==1) r.parentNode.removeChild(r);
else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
} return r;
}

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

//GM_config
var GM_config = {
  get: function(name) {
	return GM_config.values[name];
 },
 values: {},
};

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\*\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

var main = {

// Created by avg, modified by JoeSimmons
create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) {
	if(prop.indexOf("on")==0 && typeof b[prop]=="function") ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop.indexOf("on")==0 && typeof b[prop]=="string") ret.setAttribute(prop, b[prop]);
		else if(",style,accesskey,id,name,src,href,accepted,ckd,type".find(","+prop.toLowerCase())) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		}
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
},

remove : function(e) {
var node = (typeof e=='string') ? document.getElementById(e) : e;
if(node&&node.parentNode&&node.nodeType==1&&node.parentNode.nodeType==1) node.parentNode.removeChild(node)
},

debug : function(s) {
if(!$g("#debugT")) document.body.insertBefore(main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(document.createTextNode(s))), document.body.firstChild);
	else $g("#debugT").innerHTML+="\n\n\n\n"+s;
if($g("#debugT").style.display=="none") $g("#debugT").style.display="";
},

// click something
click : function(e, type) {
if(!e && typeof e=='string') e=document.getElementById(e);
if(!e) return;
var evObj = e.ownerDocument.createEvent('MouseEvents');
evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
},

// get() function by JoeSimmons
// Syntax: get('http://www.google.com/', handleResponse);
get : function(url, cb) {
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    //headers: {'Accept': 'application/atom+xml,application/xml,text/xml,text/html'},
    onload: function(r) {if(cb) cb(r);}
});
},

// post() function by JoeSimmons
// Syntax: post('https://www.google.com/accounts/ServiceLoginAuth?service=youtube', 'Email=thetenfold&Passwd=catsdogs', handleResponse);
post : function(url, data, cb) {
GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    headers: {
		'Content-type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html'
    },
	data: encodeURI(data),
    onload: function(r) {if(cb) cb(r);}
});
},

addGlobalStyle : function(css) {
	if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = main.create("style", {type:"text/css"});
    document.getElementsByTagName('head')[0].appendChild(style).innerHTML=css;
},

get realURL() {
var u=location.href,
host=location.host,
protocol=location.protocol+"//",
hash=location.hash;
if(hash!="" && /#!\/.*\.php/.test(hash)) u=protocol+host+hash.split("#")[1];
else if(hash!="" && hash.find("#")) u=u.split("#")[0];
return u;
},

get currReqs() {
return $g(".//iframe",{node:$g("#mass_accept_frame_holder")}).snapshotLength;
},

status : function(e) {
$g("#fvma_status").textContent = "[FBMAR] "+main.currReqs+" requests currently.";
},

onTyLoad : function(e) {
$(e.target.getAttribute("id")).removeEventListener("load", main.onTyLoad, false);
main.remove(e.target.getAttribute("id"));
},

onFrameLoad : function(e) {
	var key = e.target.getAttribute("id"), doc=e.target.contentDocument, frame = $(key),
		tygift = $g(".//div[starts-with(@id, 'app_content_')]//div[@class='thank_you_gift']//form[starts-with(@id, 'req_form_')]//input[@name='send' and (@type='button') or @type='submit']", {doc:doc, node:doc, type:9}),
		helpfriend = $g(".//a[@class='bpri_acceptButton']", {doc:doc, node:doc, type:9}),
		choose = $g(".//input[@name='send_gift' and @value='Choose' and @type='submit']", {doc:doc, node:doc, type:7});

	if(choose.snapshotLength > 0) {
		choose.snapshotItem(Math.round(Math.random()*choose.snapshotLength)).click();
		frame.removeEventListener("load", main.onFrameLoad, false);
		frame.addEventListener("load", main.onTyLoad, false);
	} else if(GM_config.get("tygift") === true && tygift) {
	try {
		frame.removeEventListener("load", main.onFrameLoad, false);
		frame.addEventListener("load", main.onTyLoad, false);
		main.click(tygift); // click the "Send thank you gift" button
		var intv = window.setInterval(function(e) {
			var send = $g(".//div[@id='pop_content']//input[@type='button' and @name='sendit']", {doc:doc, node:doc, type:9}),
				skip = $g(".//input[@name='skip_ci_btn']", {doc:doc, node:doc, type:9}),
				okay = $g(".//div[@id='pop_content']//input[@type='button' and @name='ok']", {doc:doc, node:doc, type:9});
			if(skip) { // skip button
				main.click(skip);
				window.clearInterval(intv);
			} else if(okay) {
				main.click(okay);
				window.clearInterval(intv);
			} else if(send) { // send button, brings up the skip button
				main.click(send);
			}
		}, 250);
	} catch(e) { alert(e); }
	} else if(helpfriend) {
		frame.removeEventListener("load", main.onFrameLoad, false);
		frame.addEventListener("load", main.onTyLoad, false);
		frame.src = helpfriend.href;
	} else main.remove(key);
},

open : function(url) {
	var id=Math.round(Math.random()*1000000).toString(), max_time = 30;
        alert("test");
        var mafh = $("mass_accept_frame_holder");
        alert("test");
	mafh.appendChild(main.create("iframe", {src:url, id:id, style:"width:100%; height:100%;", onload:main.onFrameLoad}));
	window.setTimeout(main.remove, max_time * 1000, id);
},

actionsRegex : /actions\[([^\]]+)\]/,

checkall : function() {
	var array=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_')]");
	for(var i=0,item; (item=array.snapshotItem(i)); i++) {
		item.checked = true;
		item.setAttribute("ckd", "yes");
	}
},

uncheckall : function() {
	var array=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_')]");
	for(var i=0,item; (item=array.snapshotItem(i)); i++) {
		item.checked = false;
		item.setAttribute("ckd", "no");
	}
},

checkAccept : function() {
	var id = $("accept_select").options[$("accept_select").selectedIndex].value,
		type = $("accept_select_type").options[$("accept_select_type").selectedIndex].value,
		div = $g("//div"+(id != "all" ? "[contains(@id, '"+id+"') and contains(@class, 'mbl')]" : "[@id='contentArea']"), {type:7});

	for(var i=0, len=div.snapshotLength; i < len; i++) {
		var buttons = $g(".//ul[contains(@class, 'uiList') and contains(@class, 'requests')]/li[contains(@class, 'uiListItem')"+(type != "all" ? " and contains(., '"+type+"')" : "")+"]", {type:7, node:div.snapshotItem(i)});
		for(var x=0,button; (button=buttons.snapshotItem(x)); x++) if(button && button.nodeType == 1) {
			var check = $g(".//input[@type='checkbox' and starts-with(@id,'mass_accept_')]", {type:9, node:button});
			check.checked = true;
			check.setAttribute("ckd", "yes");
		}
	}
},

accept : function() {
		var total_max = 1; // maximum # of allowed requests
		if(main.currReqs >= total_max) {
			window.setTimeout(main.accept, 1000);
			return;
		}
		
		var maxSuddenRequests = total_max - main.currReqs,
			invites=$g("//input[@type='checkbox' and starts-with(@id,'mass_accept_') and @accepted='no' and @ckd='yes']"),
			max = invites.snapshotLength<maxSuddenRequests?invites.snapshotLength:maxSuddenRequests;
		for(var i=0,item; ((i<max) && (item=invites.snapshotItem(i))); i++) {
			var id=$g("#"+item.id.substring(12)),
				invite = $g(".//input[starts-with(@name, 'actions[http') and @type='submit' and @value] | .//input[@name='actions[accept]' and @value='Confirm']",{type:9, node:id});
			if(item.checked && invite && invite.name != "actions[accept]" && invite.value != "Confirm") {
				
				var hidden=$g(".//input[@type='hidden' and @name and @value]", {node:$g(".//ancestor::li[contains(@class, 'uiListItem')]", {type:9, node:id}), type:7}), othervars="";
				for(var x=0,op; (op=hidden.snapshotItem(x)); x++) if(op.name != "charset_test") othervars += op.getAttribute("name")+"="+op.getAttribute("value")+"&";
				othervars=othervars.substring(0, (othervars.length-1));
				if(othervars.substring(2,othervars.lenght).indexOf("post_form_id")>0)
				{
				othervars=othervars.substring(0,othervars.substring(2,othervars.lenght).indexOf("post_form_id")+1);
			        }
				//alert(othervars);
				//alert(invite.name.match(main.actionsRegex));
				main.post("http://www.facebook.com/ajax/reqs.php", othervars);
				//main.open(invite.name.match(main.actionsRegex)[1]);
				item.setAttribute("accepted", "yes");
				item.parentNode.parentNode.style.display="none";
				item.parentNode.parentNode.parentNode.removeChild(item.parentNode.parentNode);
			} else if(item.checked && invite && invite.name=="actions[accept]" && invite.value=="Confirm") invite.click();
		}
		if(max >= maxSuddenRequests) 
		{
			window.setTimeout(main.accept, 1000);
		}
},

run : function() {

		if(!main.realURL.find("reqs.php")) return;
		
		var box = GM_config.get("box");
		document.body.appendChild(main.create("div", {id:"mass_accept_div",style:"position:fixed; bottom:26px; right:200px;"},new Array(
			main.create("input", {type:"button", value:"Check All", onclick:main.checkall}),
			main.create("input", {type:"button", value:"Uncheck All", onclick:main.uncheckall}),
			main.create("input", {type:"button", value:"Mass Accept", onclick:main.accept, style:"display: block;"}),
			main.create("div", {id:"mass_accept_frame_holder",style:(debugMode===true ? "width:75%; height:60%; background: #FFFFFF; border:2px solid #000000;" : "width:1px; height:1px; background:transparent; border:0;")+" position:fixed; bottom:4px; left:4px; -moz-border-radius:6px; "})
		)));

		var accepts = new Array(),
			debugMode="",
			id = 'all',
			type = 'all',
			div = $g("//div"+(id != "all" ? "[contains(@id, '"+id+"')]" : "[@id='contentArea']"), {type:7});
		for(var i=0, len=div.snapshotLength; i < len; i++) {
			var buttons = $g(".//ul[contains(@class, 'uiList') and contains(@class, 'requests')]/li[contains(@class, 'uiListItem')"+(type != "all" ? "and contains(., '"+type+"')" : "")+"]/form", {type:7, node:div.snapshotItem(i)});
			for(var x=0,button; (button=buttons.snapshotItem(x)); x++) if(button && button.nodeType == 1) accepts.push(button);
		}

		if(accepts.length > 0) for(var q=0, len=accepts.length; q < len; q++) if(accepts[q].offsetHeight > 0) {
			var item = accepts[q],
				acc=$g(".//input[starts-with(@name, 'actions[http') and @type='submit' and @value] | .//input[@name='actions[accept]' and @value='Confirm']", {type:9, node:item}),
				postID = $g(".//input[@name='status_div_id' and @value]", {type:9, node:item}).value;
				item.parentNode.insertBefore(main.create("div", {style:"display: block;"}, new Array(main.create("input",{type:"checkbox", id:"mass_accept_"+postID, accepted:"no", ckd:"no", style:"width: 2em; height: 2em;", onchange:function(e){this.setAttribute("ckd", (this.checked ? "yes" : "no"));}}))), item);
				if(acc) acc.parentNode.parentNode.insertBefore(main.create("a", {href:acc.name.match(main.actionsRegex)[1], textContent:"Accept with link", target:"_blank", style:"margin-right: 10px;"}), acc.parentNode);
		}

			document.body.insertBefore(main.create("div", {id:"fvma_status",style:"position:fixed; bottom:20px; left:2px; padding:2px 8px; color:#000000; background-color:#FFFFFF; font-family: arial, verdana, sans-serif; font-size:1em; z-index:99998; border:1px solid #000000;",textContent:"[FBMAR] 0 requests currently."}), document.body.firstChild);
			window.setInterval(main.status, 1000); // update status every second
		
}

};

function hideFinished() {
	// Delete ignored requests
	$g("//div[@id='contentArea']//ul[contains(@class, 'uiList') and contains(@class, 'requests')]/li[contains(@class, 'uiListItem') and contains(., 'You hid a') and contains(., 'request') and contains(@class, 'byScript')]", {del:true});
}

if(location.href=="http://www.facebook.com/reqs.php") {
main.run();
// add options shortcut to user script commands
main.addGlobalStyle(".status_confirm {display:none !important;} #mass_accept_div input[type=\"button\"] {display:block;}");
}

window.addEventListener("DOMNodeInserted", function(e) {
if(location.href!="http://www.facebook.com/reqs.php" && (location.href.find("#!/reqs.php") || location.href.find("#confirm_")) && main.realURL.find("reqs.php")) window.location.replace("http://www.facebook.com/reqs.php");
}, false);

window.setInterval(hideFinished, 500);