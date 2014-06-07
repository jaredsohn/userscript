// ==UserScript==
// @name        Tribalwars Auto Recruiter
// @namespace   atutility.com
// @include     http://en64.tribalwars.net/*
// @version     1
// ==/UserScript==

var screen = getURLParameter("screen");
var trycmd= getURLParameter("try");
var mode= getURLParameter("mode");
var myid= getURLParameter("village");

if( "train"==screen){
	var spear=0;
	var sword=0;
	var axe=0;
	if( $("#trainqueue_wrap_barracks").size() > 0){
		//console.log( $("#trainqueue_wrap_barracks").html());
		//console.log(  $("#trainqueue_wrap_barracks > table > tbody > tr > td").size());
		$("#trainqueue_wrap_barracks > table > tbody > tr > td").each(function(){
			
			var training= $(this).text();
			//console.log(training.indexOf("Axemen"));
			if( training.indexOf("Spear fighters")>0){
				spear+= parseInt(training);
			}else if( training.indexOf("Swordsmen")>0){
				sword+= parseInt(training);
			}else if( training.indexOf("Axemen")>0){
			    //console.log( parseInt(training));
				axe+= parseInt(training);
			}
		});
	}
	
	if( axe >0){
		var current= $("#axe_0").parent().prev().text();
		var fields= current.split("/");
		var invillage= fields[0];
		var total= parseInt(fields[1]);
		
		$("#axe_0").parent().prev().text(current+" Training:"+axe+" Total:"+ (total+axe));
	}
	if( spear >0){
		var current= $("#spear_0").parent().prev().text();
		var fields= current.split("/");
		var invillage= fields[0];
		var total= parseInt(fields[1]);
		
		$("#spear_0").parent().prev().text(current+" Training:"+spear+" Total:"+ (total+spear));
	}
	if( sword >0){
		var current= $("#sword_0").parent().prev().text();
		var fields= current.split("/");
		var invillage= fields[0];
		var total= parseInt(fields[1]);
		
		$("#sword_0").parent().prev().text(current+" Training:"+sword+" Total:"+ (total+sword));
	}
	
	var light=0;
	var heavy=0;
	
	
	if( $("#trainqueue_wrap_stable").size() > 0){
		
		$("#trainqueue_wrap_stable > table > tbody > tr > td").each(function(){
			
			var training= $(this).text();
			//console.log(training.indexOf("Axemen"));
			if( training.indexOf("Heavy cavalry")>0){
				heavy+= parseInt(training);
			}else if( training.indexOf("Light cavalry")>0){
				light+= parseInt(training);
			}
		});
	}
	if( light >0){
		var current= $("#light_0").parent().prev().text();
		var fields= current.split("/");
		var invillage= fields[0];
		var total= parseInt(fields[1]);
		
		$("#light_0").parent().prev().text(current+" Training:"+light+" Total:"+ (total+light));
	}
	if( heavy >0){
		var current= $("#heavy_0").parent().prev().text();
		var fields= current.split("/");
		var invillage= fields[0];
		var total= parseInt(fields[1]);
		
		$("#heavy_0").parent().prev().text(current+" Training:"+heavy+" Total:"+ (total+heavy));
	}
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}