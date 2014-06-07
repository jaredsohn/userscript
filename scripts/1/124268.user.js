// ==UserScript==
// @name           HCI High School/College EMB Enhancer
// @namespace      embenhancer
// @description    This script enhances the EMB in too many aspects.
// @include        http://messages.hci.edu.sg/*
// @version        0.1
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
		
if (String(window.location).indexOf("http://messages.hci.edu.sg/smb/college_student/")!=-1) {
	if (!localStorage.userid||!localStorage.pass) {
		document.getElementsByName("login")[0].onclick=function(){
			localStorage.userid=document.getElementsByName("userid")[0].value;
			localStorage.pass=document.getElementsByName("password")[0].value;
		};
	} else {
		document.getElementsByName("userid")[0].value=localStorage.userid;
		document.getElementsByName("password")[0].value=localStorage.pass;
		document.getElementsByName("login")[0].click();
	}
} else if (String(window.location).indexOf("http://messages.hci.edu.sg/cgi-bin/smb/login.pl")!=-1) {
	window.location="http://messages.hci.edu.sg/cgi-bin/smb/logoutxyz.pl";
} else if (String(window.location).indexOf("http://messages.hci.edu.sg/cgi-bin/emb/menu_htm.pl")!=-1) {
	loadAndExecute("http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
		document.body.style.background="#5d5d5d";
		var menustring="<img src='http://dl.dropbox.com/u/3276634/emb/logo.png'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		menustring+="<a href='http://messages.hci.edu.sg/cgi-bin/emb/view.pl?date' target='content'><img src='http://dl.dropbox.com/u/3276634/emb/view.png'></a>&nbsp;";
		var m=$("a:eq(1)").attr("href");
		if (m.indexOf("http://messages.hci.edu.sg/cgi-bin/emb/add_htm.pl")!=-1) menustring+="<a href='http://messages.hci.edu.sg/cgi-bin/emb/add_htm.pl' target='content'><img src='http://dl.dropbox.com/u/3276634/emb/post.png'></a>&nbsp;";
		menustring+="<a href='http://messages.hci.edu.sg/cgi-bin/emb/view_archive.pl?date' target='content'><img src='http://dl.dropbox.com/u/3276634/emb/archives.png'></a>&nbsp;";
		menustring+="<a href='http://messages.hci.edu.sg/cgi-bin/emb/util.pl' target='content'><img src='http://dl.dropbox.com/u/3276634/emb/utilities.png'></a>&nbsp;";
		menustring+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='http://messages.hci.edu.sg/cgi-bin/smb/re_enter.pl?college_student' target='_top'><img src='http://dl.dropbox.com/u/3276634/emb/exit.png'></a>&nbsp;";
		menustring+="<a href='http://messages.hci.edu.sg/embhelp' target='_blank'><img src='http://dl.dropbox.com/u/3276634/emb/help.png'></a>&nbsp;";
		menustring+="<div style='position:absolute;top:0px;right:0px;padding:3px 13px;background:#6b6b6b;border-bottom-left-radius:5px;border-left:2px solid #525252;border-bottom:2px solid #525252;color:#fff;font:15px Arial;text-align:center;'>"+$("th:eq(6)").text().split("(")[1].split(")")[0]+"</div>";
		menustring+="<div style='position:absolute;top:23px;right:0px;padding:2px;background:#6b6b6b;border-bottom-left-radius:5px;border-left:2px solid #525252;border-bottom:2px solid #525252;color:#fff;font:8px Arial;text-align:center;'>"+$("th:eq(8)").text()+"</div>";
		document.body.innerHTML=menustring;
	});
} else if (String(window.location).indexOf("http://messages.hci.edu.sg/cgi-bin/emb/view.pl")!=-1) {
	loadAndExecute("http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
		$("body").prepend("<div id='markall' style='color:#FFF;position:absolute;right:0px;top:0px;padding:3px;background:#525252;'>:D</div>");
		$("#markall").click(function(){
			$("tr:gt(0)").find("td:eq(3)").find("a").find("b").each(function(){
				var xmlreq=new XMLHttpRequest();
				xmlreq.open("GET",$(this).parent().attr("href"),true);
				xmlreq.send(null);
				$(this).parent().parent().parent().find("b").each(function(){
					$(this).parent().html($(this).text());
				});
			});
		});
	});
}