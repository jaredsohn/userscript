// ==UserScript==
// @name          UTSC Tweaks
// @namespace     http://userscripts.org/scripts/show/113895
// @description   Various UTSC tweaks: improves intranet course layout and auto-selects current courses only; makes pressing enter in the timetable course code box actually load that course instead of all the courses; stops coop site from sending you back to the login page
// @version       1.04
// @date 	  Mon Feb 13 2012
// @include       https://utsc-utoronto-csm.symplicity.com/*
// @include       http*://www.utsc.utoronto.ca/~registrar/scheduling/timetable*
// @include       http*://intranet.utsc.utoronto.ca/home.php*
// @include       http*://intranet.utsc.utoronto.ca/courses.php*
// ==/UserScript==

/*
	Author: misuse-our-scripts.org
*/

var local_version = 1.04;
var local_v_str = "1.04";
var msec_per_day = 1000 * 60 * 60 * 24;
var uid = "utsc_tweaks_";

// GM emulation for chrome below created from code by James Campos
// and G.I.Joe

if (typeof GM_deleteValue == 'undefined')
{
	//unsafeWindow = window;
    GM_addStyle = function(css)
	{
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name)
	{
        localStorage.removeItem(uid + name);
    }

    GM_getValue = function(name, defaultValue)
	{
		var value = localStorage[uid + name];
		return value == null ? defaultValue : JSON.parse(value);
	}

	GM_setValue = function(name, value)
	{
		localStorage[uid + name] = JSON.stringify(value);
	}

    GM_log = function(message)
	{
        console.log(message);
    }

    GM_openInTab = function(url)
	{
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk)
	{
		//todo
    }

	GM_xmlhttpRequest=function(obj)
	{
        var request=new XMLHttpRequest();
        request.onreadystatechange = function()
		{
			if(request.readyState == 4 && request.status == 200 && obj.onload)
				obj.onload(request);
		}
		
		request.open(obj.method,obj.url,true);
		
		for(name in obj.headers)
			request.setRequestHeader(name,obj.headers[name]);
			
        request.send(obj.data);
		return request;
	}
}

var update_interval = GM_getValue("update_interval", 1);
var auto_update = GM_getValue("auto_update", 1);

var department_fs = GM_getValue("department_fs", "14pt");
var coop_fs = GM_getValue("coop_fs", "16pt");
var coop_cl = GM_getValue("coop_cl", "red");
var ddown_default = GM_getValue("ddown_default", 1);

update();
//update(1);
//GM_setValue("last_check", String(Number(new Date()) - msec_per_day * update_interval - 1));

function update(manual) {
	var date = new Date();
	var timestamp = date.getTime();
	var last_check = Number(GM_getValue("last_check", 0));

	if (manual || ((( (timestamp - last_check) / msec_per_day ) > update_interval) && auto_update))
	{
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: "http://userscripts.org/scripts/source/113895.meta.js",
			onload: function(results)
			{
				resp = results.responseText;
				if ((version_index = resp.indexOf("version")) != -1)
				{
					var version_start = resp.slice(version_index);
					var num_start = version_start.slice(version_start.search(/[0-9]/i));

					online_v_str = num_start.slice(0, num_start.search(/[^0-9.]/i));
					online_version = parseFloat(online_v_str);

					if (online_version && online_version > local_version)
					{
						var update_notice = document.createElement("div");

						function close()
						{
							update_notice.style['display'] = 'none';
						}

						document.body.insertBefore(update_notice, document.body.firstChild);
						update_notice.style["fontSize"] = "14pt";
						update_notice.style["fontFamily"] = "Times New Roman";
						update_notice.style["textAlign"] = "center";
						update_notice.style["backgroundColor"] = "lightgrey";
						update_notice.style["position"] = "relative";
						update_notice.style["zIndex"] = "100";

						update_notice.innerHTML = "(Greasemonkey) UTSC Tweaks : Version " + online_v_str + " is now available (current version " + local_v_str + "). You can either get a ";
						update_notice.innerHTML += "<a target='_blank' href='http://userscripts.org/scripts/source/113895.user.js'>Direct Download</a> or open in a new tab the ";
						update_notice.innerHTML += "<a target='_blank' href='http://userscripts.org/scripts/show/113895'>Home Page</a> ";

						var dismiss = document.createElement("button");
						dismiss.innerHTML = "Close Notice";
						dismiss.addEventListener('click', function(event){close();});
						update_notice.appendChild(dismiss);

						var reset_interval = document.createElement("button");
						reset_interval.innerHTML = "Notify me in " + update_interval + " day(s)";
						reset_interval.addEventListener('click', function(event){GM_setValue("last_check", String(timestamp)); close();});
						update_notice.appendChild(reset_interval);

						 /*
						var turn_off = document.createElement("button");
						update_notice.appendChild(turn_off);
						turn_off.innerHTML = "Turn off autmatic update checks";
						turn_off.addEventListener('click', function(event){GM_setValue("auto_update", 0); close();});
						// */

						//if (confirm("(Greasemonkey) UTSC Tweaks : Version " + online_version + " is now available. Go to home page in new tab?"))
						//	GM_openInTab("http://userscripts.org/scripts/show/113895");
					}
					else
					{
						GM_setValue("last_check", String(timestamp));
						if (manual)
							alert("UTSC Tweaks : No new version found.");
					}
				}
			}
		});
	}
}

if (window.location.hostname == "utsc-utoronto-csm.symplicity.com")
{
	//var time1 = new Date();
	var warning;
	var replace = function(logouttarget)
	{
		//var time2 = new Date();
		//var warning = arguments.callee.warning;
		if (typeof(warning) == typeof(undefined))
		{
			warning = document.createElement("span");
			document.body.insertBefore(warning, document.body.firstChild);
			warning.style["fontSize"] = coop_fs;
			warning.style["color"] = coop_cl;
			warning.innerHTML = "You have been logged out of the system, so you must relogin before you try to do anything with the site. \
			Here is the link to login in a new tab, and then come back and refresh this page to continue as normal.\
			<a target='_blank' href='https://utsc-utoronto-csm.symplicity.com/students/'>Relogin</a>";
			//warning.innerHTML += "<br>" + time1 + "<br>" + time2;
		}
		//arguments.callee.warning = warning;
	};

	if (unsafeWindow.logoutUserExpireSession)
		unsafeWindow.logoutUserExpireSession = replace;
	else
	{
		var script = document.createElement('script');
		script.appendChild(document.createTextNode(' var coop_fs = "' + coop_fs + '";\n var coop_cl = "' + coop_cl +
													'";\n var warning;\n window.logoutUserExpireSession = ' + replace + ';'));
		(document.body || document.head || document.documentElement).appendChild(script);
	}
}
else if (window.location.href.indexOf("utsc.utoronto.ca/~registrar/scheduling/timetable") != -1)
{
	/*
	out_div = document.createElement("div");
	parent_div = document.getElementById("content");
	parent_div.insertBefore(out_div, parent_div.getElementsByTagName("h1")[0].nextSibling);
	vars = document.createElement("div");
	focus_stat = document.createElement("div");
	out_div.appendChild(vars);
	out_div.appendChild(focus_stat);
	//*/

	var c2_focus, c2_submit, course2, forms, form1;

	function catch_submit(event){
		if (c2_focus && !c2_submit){
			c2_submit = 1;
			event.preventDefault();
			setTimeout("document.getElementsByName('submit2')[0].click();", 0);
			return false;
		}
	}

	function course2_enter(event){
		c2_focus = 1;
		if (event.keyCode == 13 && c2_submit)
			event.preventDefault();
	}

	forms = document.forms;
	for (var i=0; forms[i]; i++)
		if (forms[i].name == "form1")
		{
			form1 = forms[i];
			break;
		}

	form1.addEventListener('submit', catch_submit);
	course2 = form1.elements.namedItem("course2");
	c2_focus = 0;
	c2_submit = 0;
	course2.addEventListener('focus', function(event){c2_focus = 1;});
	course2.addEventListener('blur', function(event){c2_focus = 0;});
	course2.addEventListener('keydown', course2_enter);
	course2.addEventListener('keyup', course2_enter);

} else if (window.location.hostname == "intranet.utsc.utoronto.ca")
{
	/*
	out_div = document.createElement("div");
	document.body.insertBefore(out_div, document.getElementById("mainnav2").nextSibling);
	vars = document.createElement("div");
	out = document.createElement("div");
	out_div.appendChild(vars);
	out_div.appendChild(out);
	//*/

	var forms = document.forms, tmp;

	for (var i=0; forms[i]; i++)
		if (forms[i].name == "tmp")
		{
			tmp = forms[i];
			break;
		}

	if (window.location.pathname.indexOf("home.php") != -1)
	{
		var links = tmp.getElementsByTagName("a");
		for (var i in links)
		{
			if (links[i].href == "http://www.utsc.utoronto.ca/timetable")
				courses = links[i].parentNode.parentNode;
		}
		tmp.insertBefore(courses, tmp.firstChild);

	} else if (window.location.pathname.indexOf("courses.php") != -1)
	{
		var ddown = tmp.elements.namedItem("filter");

		if (!sessionStorage["utsc_tweaks_revisit"])
		{
			sessionStorage["utsc_tweaks_revisit"] = 1
			ddown.selectedIndex = ddown_default;
			tmp.submit();
		}
		else
		{
			var sdetails = tmp.getElementsByClassName("hidenav");
			for (var i=0, newl=""; sdetails[i]; i++)
			{
				var cur = sdetails[i]
				var prev = cur.previousSibling;

				while (prev.nodeType != 1)
					prev = prev.previousSibling;

				prev.style["fontSize"] = department_fs;
				if (i == 1)
					newl = "<br>";
				prev.innerHTML = newl + prev.innerHTML;
			}
		}
	}
}
