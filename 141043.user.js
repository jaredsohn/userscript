// ==UserScript==
// @name            WDYW
// @author          ndilallah
// @description     Add LINKS Menu on Kaskus Beta
// @version	        2.2.1
// @released        2012-08-16
// @compatible      Greasemonkey
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include         http://www.kaskus.co.id/*
// ==/UserScript==

// lastupdate:
// v.2.2.1 = 22-oktober-2012
// domain fix
//
// v.2.2 = 08-oktober-2012
//
// v.2.1 = 10-september-2012
// add and save links feature
// fix hide menu on click body
// 
// v.1.1 = 16-agustus-2012
// add new dropdown menu
// add links = manual edit

$(function() {
var myg = document.createElement('li');
var myfog = document.evaluate('//li[@class="vcard user dropdown tools-panel"]', document, null, 9, null ).singleNodeValue;
myg.setAttribute('class', 'menuku dropdown tools-panel');
myfog.parentNode.insertBefore(myg, myfog);
myg.innerHTML = ''
+'<a class="head_menu"><span class="wdyw">WDYW</span>'
+'<img class="logoWDYW" src="http://kkcdn-static.kaskus.co.id/images/2012/09/10/567661_20120910053351.png">'
+'</a>'
+'<ul class="sub-menu menu_body">'
+'<li><a class="wet" href="http://www.kaskus.co.id/myforum">Kulkas</a></li>'
+'<li class="wer"><a id="editWDYW" href="#" title="setting"><em>setting</em></a></li>'
+'</ul>';
		
//======= POPUP ELEMENT =======//		 
var mg = document.createElement('div');
mg.setAttribute('id','dialog-form');
document.body.appendChild(mg);
mg.innerHTML = ''
+'<div id="popi">' 		 
+'<div id="isian">'
+'<div id="isianD">'
+'<div class="headi">WDYW Link Setting'
+'<a href="#" class="tutupan"></a>'
+'</div>'
+'<form id="tasks-form">'
+'<label for="task" style="width:55px;font-weight:bold">Title: </label>'
+'<input type="text" id="task" class="disi" maxlength="20" />'
+'<div class="spani"></div>'
+'<label for="eling" style="width:55px;font-weight:bold">URL: </label>'
+'<input type="url" id="eling" class="disi" value="http://" />'
+'<input type="submit" class="kan" value="Save">'
+'</form>'
+'<ul id="tasks"><p class="kosong" TIPS:<br/><em>1. Pada input URL gunakan <strong>http://</strong><br/>'
+'2. Jika saat <strong>SAVE</strong> tdk ada respon, klik sekali lagi</em></p>'
+'</ul>'
+'<input type="submit" class="clear" value="Remove All">'
+'<button id="okk">OK</button>'
+'<br/><br/>'
+'</div>'
+'</div>'
+'</div>';		 
			 
//======= CSS/STYLE =======//
GM_addStyle(""
+".banner-top-ads, div #x_float_reg{display:none;}"
+".wdyw{background-color:green;color:#fff !important;font-weight:bold;font-size:12px;"
+"border-radius:3px;padding:3px 6px;box-shadow:0 1px 2px rgba(0, 0, 0, 0.7);"
+"border:1px solid #049204;text-shadow:-1px -1px rgba(0, 0, 0, 0.5)}"
+".logoWDYW{display:block;float:left;background:green;box-shadow:0 1px 2px rgba(0, 0, 0, 0.7);"
+"border-radius:5px;width:24px;height:20px;margin:-1px 1px 0px 0px;border:1px solid #848484;}"
+"li.wer a{font-size:10px;text-align:right;opacity:0.4;filter:alpha(opacity=40);"
+"background:url(http://kkcdn-static.kaskus.co.id/images/2012/09/10/567661_20120910063912.png) no-repeat 140px  !important}"
+"li.wer a:hover{opacity:1;filter:alpha(opacity=100)}"
//======= Menu =======//
+".head_menu{cursor:pointer}"	
+".menu_body {background:#EDF8EA!important;display:none;border:1px solid #8E8E8E !important;}"
+"position:absolute;width:200px;top:-12px;}"
+".menuku li{width:200px}"
+".menuku li a{color:#0B3B0B !important; text-decoration:none; display:block;}"
+".menuku li a:hover{color:#DF013A !important;}"
//======= Popup =======//
+"#dialog-form{display:none;}"
+"#popi{ position: fixed;z-index:100; top: 0; left: 0; width: 100%; height: 100%;}"
+"#isian{width:100%;height:100%;background: rgba(0,0,0,0.7);padding-top:40px;}"
+"#isianD{width:400px;height:450px;background:#eee;margin:0 auto;"
+"padding:10px;border:10px solid #444;box-shadow:0 20px 60px #000}"
+".headi{background:#000;color:#fff;font-size:16px;font-weight:bold;height:30px;padding:10px 0 0 25px}"
+".tutupan{float:right;width:20px;height:20px; margin:5px;"
+"background:url(http://ssl.gstatic.com/ui/v1/dialog/close-x.png) no-repeat}"
+".tutupan:hover{background-position:0 -1px;opacity:0.5;filter:alpha(opacity=50)}"
+".clear{margin:12px 0px !important;background:#DF0101;color:#FFF;border:1px solid #8A0808 !important;cursor:pointer;padding:3px 8px}"
+".clear:hover{background:#B40404;box-shadow: 0 0 0 1px #DDDDDD inset}"
+".apus{float:right;cursor:pointer;margin-top:6px;height:18px;width:18px;opacity:0.2;"
+"filter: alpha(opacity=30);background:url(http://ssl.gstatic.com/ui/v1/dialog/close-x.png) no-repeat}"
+".apus:hover{opacity:1;filter: alpha(opacity=100);background-position:0 1px}"
+"#tasks-form{margin:2px 0 10px;padding: 0 0 37px;background:#ddd;border:1px solid #ccc}"
+"#tasks{margin:0 0 10px;padding: 10px;background:#F5F6CE;border:1px solid #F3E2A9;height:200px;overflow:auto}"
+"#tasks li {width: 250px;font-size: 14px;border: 1px solid #fff;padding-left: 20px;margin: 2px 0 0 55px;}"
+"#tasks li:hover{}"
+"#tasks li:nth-child(2n) { background-color: #eee; }"
+"#tasks li:nth-child(2n+1) { background-color: #ddd; }"
+".kosong{padding:30px 0 0 30px;color:#444;display:none}"
+".spani{color:red;font-size:18px;display:none;position:absolute;margin:-20px 80px;text-align:center;background:#ccc;padding:20px 30px}"
+".highlight{background:#ff0000 !important}"
+"#task, #eling {margin:3px;width:300px;font-style:italic}"
+".tebl{font-style:normal !important;font-weight:bold;color:#0976BC !important}"
+".kan{float:right;cursor:pointer;margin:3px 30px !important;background:green;color:white;padding:3px 8px;border:1px solid #045004 !important}"
+".kan:hover{background:darkgreen;box-shadow: 0 0 0 1px #DDDDDD inset}"
+"#okk{float:right;margin: 12px 0; padding: 10px;cursor:pointer }"
+"#okk:hover{margin-right:1px;padding:9px}"
); //
	
//======= POPUP CLICK =======//	
$('#editWDYW').click(function() {
$('#dialog-form').show();
$('#task').focus();
$('ul.menu_body').slideUp('fast');
});
	
$(".tutupan").click(function(){
$("#dialog-form").hide();
});
	
$("#okk").click(function(){
$("#dialog-form").hide();
window.location.reload();
});
 
//======= DROPDOWN MENU =======//      
$('.head_menu').click(function(){ 
$('ul.menu_body').toggle();
$('.dropdown').removeClass('open');		
});

$('.tools').click(function(){
$('ul.menu_body').toggle().css({'display':'none'});
});
	
$('body').click(function(z){
$('ul.menu_body').css({'display':'none'});
});
	
$('.head_menu, ul.menu_body').click(function(z){
z.stopPropagation();
});
	
//======== CLEAR LINKS =======//
var i = 0;
$('.clear').on('click',function(e){

e.preventDefault();
$('#tasks li').remove();
localStorage.clear();
$(this).data('erase', true);
$('p.kosong').show();
$('.spani').html("Semua Data<br/>Berhasil dihapus").fadeIn(30).fadeOut(3000);
i = 0;

});

if(localStorage.length){  
for( i = 0; i < localStorage.length; i++){
var lsReturn = JSON.parse(localStorage.getItem('task-'+i));
if (lsReturn == null){
var b = 0; //
$("li.wet").show();
}

else{
$("#tasks").append("<li id='task-"+i+"'><a href='"+lsReturn.eling+"'>" + lsReturn.text  + "</a> <a class='apus' title='remove'></a></li>");
$(".menu_body li.wer").before("<li id='task-"+i+"'><a href='"+lsReturn.eling+"'>" + lsReturn.text  + "</a></li>");
}
}        
}

else{
$('p.kosong').show();
}

//========INPUT===========//
$("#task").focus(function(){
if($(this).val() == "isikan sebuah nama disini.."){$(this).val("").removeClass("tebl");}
else{$(this).removeClass("tebl");}
});

$("#task").focusout(function(){
if($(this).val() == ""){$(this).val("isikan sebuah nama disini..");}
else{$(this).addClass("tebl");}
});

$("#eling").focus(function(){
if($(this).val() == "http://"){$(this).val("").removeClass("tebl");}
else{$(this).removeClass("tebl");}
});

$("#eling").focusout(function(){
if($(this).val() == ""){$(this).val("http://");}
else{$(this).addClass("tebl");}
});
 
//======= ADD A LINK =======//
$(".kan").click(function() {

if ($("#task").val() != "" && $("#task").val() != "isikan sebuah nama disini.." && $("#eling").val() != "") {
var text = $("#task").val();
var eling = $('#eling').val();

var allNotes = {};
var note = {};

note.text = text;
note.eling = eling;
      
allNotes['task-'+i] = note;
     
var lsStore = JSON.stringify(allNotes['task-'+i ]);
var lsStoreReturn = JSON.parse(localStorage.getItem("task-"+i, lsStore));
localStorage.setItem( "task-"+i, lsStore);
	  
$("#tasks").append("<li id='task-"+i+"'><a href='"+ lsStoreReturn.eling +"'>"+ lsStoreReturn.text +"</a> <a class='apus' title='remove'></a></li>");
     
$("#task").val("");
$('.kosong').hide();
$('.spani').html("Sukses.. gan!!").fadeIn(30).fadeOut(3000, function(){
$('#task').focus();
$('#eling').val("http://").removeClass('tebl');
});
i++;
}

else{
$('.spani').html("Error..gan!!").fadeIn(30).fadeOut(3000);
}
return false;
});

//======= REMOVE A LINK ITEM =======//
$(".apus").live("click", function(e){

e.preventDefault();
localStorage.removeItem($(this).parent().attr("id"));
$(this).parent().remove();

for(i=0; i<localStorage.length; i++) {
if( !localStorage.getItem("task-"+i)) { 
localStorage.setItem("task-"+i, localStorage.getItem('task-' + (i+1)));
localStorage.removeItem('task-'+ (i+1) );        
}
}

});

	
})();