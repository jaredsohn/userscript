// ==UserScript==
// @name       Multi Post Load Page
// ==/UserScript==


$(document).ready(function(){
$('#load').hide(2000);
$('#clickloadmoisrex').fadeOut(1000);
});
function moisrex_alert(text, title, width, height){
	try{
		if(!text) text='';
		if(!title) title='';
		text='<div style="color:#FFFFFF;top: 200%;background-color:rgba(0,0,0,0.7);margin-top:-192px;font-family:arial;text-shadow:0px 0px 18px white;box-shadow:0px 0px 44px gold; text-shadow:0px 0px 12px white;font-size:20px;text-align:center;border-radius:200em;border:15px double  rgba(225,180,40,0.4)">'+text+'</div>';
		moisrex_div_element=document.getElementById('moisrex_alert_box');
		if(!moisrex_div_element){
			moisrex_alert_box=document.createElement('div');
			moisrex_alert_box.id='moisrex_alert_box';
			moisrex_alert_box.innerHTML=text;
			document.documentElement.appendChild(moisrex_alert_box);
		}
		else{
			moisrex_div_element.innerHTML=text;
		}
		$(function(){
			$("#moisrex_alert_box").dialog({
				title:title,
				show:{
					effect: "bounce",
					duration: 1500
				},
				hide:{
					effect: "scale",
					duration: 500
				},
				modal:true,
				position:{
					my:"center top+200px",
					at:"center top",
				},
				width:width,
				height:height
			});
		});
	}
	catch(err){
		alert(err);
	}
}
 $(document).ready(function() {
    $("#flipayman").click(function() {
        $("#panelayman").slideToggle("slow");
    });
});
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ar_AR/all.js#xfbml=1&appId=480493688654446";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

