// ==UserScript==
// @name			eRepublik Quick Subscriber
// @description		Subscribes faster than you can think
// @include			http://*.erepublik.com/*/article/*
// @version			0.2
// @namespace		fast-sub
// ==/UserScript==

var res='var res,res1,res0;\n\
var i,id;\n\
var token=document.getElementById("_token").value;\n\
res1=document.getElementsByClassName("preview")[0].getElementsByTagName("a");\n\
document.getElementById("total").innerHTML=res1.length;\n\
if(res1.length==0) {\n\
	$j("#subs").hide();\n\
	$j("#black").hide();\n\
}\n\
var br=0;\n\
for(i=0;i<res1.length;i++) {\n\
	res0=res1[i];\n\
	if(res0.href.search("http://www.erepublik.com/en/newspaper/")>-1) {\n\
		res=res0.href;\n\
		res=res.split("/");\n\
		res=res[5];\n\
		res=res.split("-");\n\
		res=parseInt(res[res.length-1]);\n\
		br++;\n\
		//alert(br+" "+res);\n\
		jQuery.post("/subscribe",{_token:$j("#_token").val(),type:"subscribe",n:res},function() {\n\
			$j("#comp").html(parseInt($j("#comp").html())+1);\n\
			if($j("#comp").html()==$j("#total").html()) {\n\
				$j("#subs").hide();\n\
				$j("#black").hide();\n\
			}\n\
		},"json");\n\
	}\n\
}\n\
//alert(br);\n\
document.getElementById("total").innerHTML=br;\n\
if(br==0) {\n\
	$j("#subs").hide();\n\
	$j("#black").hide();\n\
}';
var res1;
res1=document.createElement("div");
res1.setAttribute("id","black");
res1.setAttribute("style","width: 100%; height: 100%; left: 0; right: 0; position: fixed; z-index: 999998; background: black; opacity: 0.5;");
res1.innerHTML="&nbsp;";
document.body.appendChild(res1);
res1=document.createElement("div");
res1.setAttribute("id","subs");
res1.setAttribute("style","width: 200px; height: 100px; left: 50%; top: 50%; position: fixed; z-index: 999999; background: #224488; opacity: 0.8; margin-left: -100px; margin-top: -50px; -moz-border-radius: 20px; padding: 20px; color: white;");
res1.innerHTML="&#1040;&#1073;&#1086;&#1085;&#1080;&#1088;&#1072;&#1085;&#1077;...<br />\n\
&#1042;&#1077;&#1089;&#1090;&#1085;&#1080;&#1094;&#1080;: <span id=\"comp\">0</span> / <span id=\"total\">0</span>";
document.body.appendChild(res1);
res1=document.createElement("script");
res1.setAttribute("type","text/javascript");
res1.innerHTML=res;
document.body.appendChild(res1);