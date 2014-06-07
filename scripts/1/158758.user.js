// ==UserScript==
// @name           e-Sim Hun DO
// @description    Napi DO lista
// @version        0.1
// @include        http://primera.e-sim.org/index.html*
// @include        http://primera.e-sim.org/
// ==/UserScript==

function getId() {
var patt1 = /[0-9]+/i;
var txt = $("#userName").attr("href");
var strtxt = txt.match(patt1);
return strtxt;
}


$(document).ready(function() {

	var id=getId();
	

  //  $("#userMenu").html("<div class='plate' style='width: 93%'><iframe class='media_widget' marginwidth=0 marginheight=0 align=middle src=http://www.gatmax.info/bolist.php scrolling=no frameborder=0></iframe></div>");  
	
	$("<div  class='testDivblue' style='width: 93%'><div id='ud' style='width:48px; margin:auto'><img src='http://png.findicons.com/files/icons/977/rrze/48/transfer_up_down.png'/></div><iframe id='flip' style='border:0px solid; width:350px; height:200px' src=http://esim-hadugy.pagodabox.com/do.php?id=" + id + " scrolling=no ></iframe></div><script>$(document).ready(function(){$('#ud').click(function(){$('#flip').slideToggle('slow');});});</script>").prependTo($("#contentRow td:eq(1)"));
	
});