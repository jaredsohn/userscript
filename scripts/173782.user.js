// ==UserScript==
// @name           e-Sim Hun Shout
// @description    asd
// @version        0.21
// @include        http://primera.e-sim.org/index.html*
// @include        http://primera.e-sim.org/
// @grant       none
// ==/UserScript==

function getId() {
var patt1 = /[0-9]+/i;
var txt = $("#userName").attr("href");
var strtxt = txt.match(patt1);
return strtxt;
}


function loadXMLDoc()
    {
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
				//alert(xmlhttp.responseText);
                html=xmlhttp.responseText;
				//alert(html);
				//prompt("asd",html);
				//alert("megy")
				
				html = html.split("<div id=\"globalShouts\" style=\"width:370px;text-align: left\" class=\"testDivwhite \">");
				
				//alert(html[1]);
				//prompt("asd",html[1]);
				html=html[1]
				html= html.split("<div style=\"text-align: center\">");
				//alert(html[0]);
				//prompt("asd",html[0]);
				document.getElementById("flip").innerHTML="<p style=\"text-align: center;\"><a href=\"http://primera.e-sim.org/shouts.html?country=8\"><strong>Shout Fal</strong></a></p><div  style=\"width:346px;text-align: left\" class=\"testDivwhite\">"+html[0];
			
			}
        }
        xmlhttp.open("GET","http://primera.e-sim.org/shouts.html?country=8",true);
        xmlhttp.send();
    }


$(document).ready(function() {

	var id=getId();
	loadXMLDoc();
	
	
	
  //  $("#userMenu").html("<div class='plate' style='width: 93%'><iframe class='media_widget' marginwidth=0 marginheight=0 align=middle src=http://www.gatmax.info/bolist.php scrolling=no frameborder=0></iframe></div>");  
	
	$("<br/><br/><div  class='testDivblue' style='width: 93%'><div id='ud' style='width:48px; margin:auto'><img src='http://png.findicons.com/files/icons/977/rrze/48/transfer_up_down.png'/></div><div id='flip' style='border:0px solid; width:375px; ' ></div></div><script>$(document).ready(function(){$('#ud').click(function(){$('#flip').slideToggle('slow');});});</script>").appendTo($("#contentRow td:eq(2)"));
	
	$('#flip').slideToggle('slow');
	
});