// ==UserScript==
// @name        dA_clear_corrs
// @namespace   dA_clear_corrs
// @description clears expired/rejected/approved messages from your correspondence
// @match     	http://www.deviantart.com/messages/*
// @version     0.48
// @grant		GM_addStyle
// @grant		GM_getValue
// @grant		GM_setValue
// @author		dediggefedde
// ==/UserScript==

setTimeout(function(){
var disk="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QULDS01A9SgvwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA0ElEQVQ4y2NgGOyAEZnD6yr3nxxDPu9%2BBDeHBcMGUQ6iDYrU8GRYdng9AwMDwzIGBoYorAYiK8YHlt%2FYzrD8xnZkoQwGBoYZLLgMYxfjwe86Bk90AxnwuvDnqy9kRQpOAwm5EJeFLLjCJ5KBcBiS5EJcGsjyMjcfN8OXu28JJ2IsSYwFn4Yo20CcctD0R5qBuAzAZxETSfmUiFzERMVywY5iA%2F%2B%2F%2FsHwefej5QwMDIdgeZmi0gbJsBlYiy9Y%2BJNgJophuAyEGXqIiDCLonmJDQCW%2FTng1KHaLAAAAABJRU5ErkJggg%3D%3D";
var hdisk="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QULDS833%2ByjEQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAx0lEQVQ4y2NgGOyAEYVXIPOfLFMmPIGbw4IhqSdItDm7wucxuFUHMjAwMCxjYGCIwm4gkmJ8wG1lEoPbyiRkoQwGBoYZLLgM4%2BeSIuw6VAMZ8Lrw47dnZAUnTgMJuRCXhSy4woeYMCTJhbg0kOVlQTkJhvdbrhPWjSWJseCNydb1uL0MSX%2BkGYjLAHwWMZEUQETkIiYqlgt2lBt46T0Dw4QnyxkYGA7B8jJlpQ3CsBnYiy8IWEaCkSiG4TIQZughIsIsiuYlNgCW%2FjRKPBg%2BOgAAAABJRU5ErkJggg%3D%3D";
var hintbg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAVCAYAAAAD%2BKFvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUZJREFUeNrs201Kw0AYxvF3aKB%2BUKRgFwqCC0NT6CWq5gY9Zm5QqpcYTDTiwoUBK4hUakV0ZMZMaanJBfL%2FbTLJ8oWHZ%2FKlbh50W9Yk6XwpQEONB52T9XPlA%2BKDMTz%2BlLh%2FyKTQOJPbF9FP7Y2guIDYcAyPlhJHPaYEgpLNRBc7LiSBvxhHtjUM00Hj2Szo4t0VSODbQ2SfyQAlm4kklUfXIJf9rhjzw1SAks2ELj6k3GKxtQL%2B4wJCewA1AaFBgNqA0CBA9RaLBgFqGsR8Mwlgi%2FINwhYL2NbyT7FoEKAyIMJjXqDuJp2AAJUBmd59yUXYYhpAaZr%2F3XYE40FnL0llcR6%2BMRWglD0f2M%2FdT1efu1%2FlRkZnvA8Bru%2FVam1%2FmNq1iySdL%2Bwx6r3KKCQoaGAwciXZrOvWtj02AuL5oABN5IPh%2FQowAG3TbCRaGjgsAAAAAElFTkSuQmCC";
var hintbgh="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAVCAYAAAAD%2BKFvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAATdJREFUeNrs28tKw0AUgOEzNSDWBrSCCiqEUsE%2Bg5en6GPmKWz7BmIKSixe0CqKUA0unZNmQrw0i27n%2Fzaddnng52Roay7Ti1WpiJPZlwCe6vfCg%2Br74HcY3fajHEf3TAreGU32bQdyVw3F6AbROLrtJzmJHpgSvDec7Mn1224eScN9SBzAnxZMoNvjcGtqjw0mAxS0Cfu4dRvMi7GByApTAcotMpWr153ikm4MEwH%2BkQdihMcrYGEgmgiARRvEcP8AajYIj1hAzQYhEIA7CLDUBiEQoGaD8D0IwCUdWCqQQRrKaeeDaQCFQdqaB9Lvhc04keys88lUgML4ZVN%2F7h6Vf5g6v2kJkQC2hXS9POsfptb0ECezTF%2BPtt9tKBlTgodhNGX8vJGfdXv8CMRxoQA%2BcmE43wIMACLwUM%2BKtUUTAAAAAElFTkSuQmCC";

var settings={};


if(typeof GM_getValue("opt_accept")=="undefined")GM_setValue('opt_accept','checked=\"checked\"')
if(typeof GM_getValue("opt_expired")=="undefined")GM_setValue('opt_expired','checked=\"checked\"');
if(typeof GM_getValue("opt_declined")=="undefined")GM_setValue('opt_declined','checked=\"checked\"');
if(typeof GM_getValue("opt_decided")=="undefined")GM_setValue('opt_decided','checked=\"checked\"');
if(typeof GM_getValue("opt_additional")=="undefined")GM_setValue('opt_additional','');
if(typeof GM_getValue("opt_curpage")=="undefined")GM_setValue('opt_curpage','');
if(typeof GM_getValue("opt_confirm")=="undefined")GM_setValue('opt_confirm','checked=\"checked\"');
if(typeof GM_getValue("opt_nocomment")=="undefined")GM_setValue('opt_nocomment','checked=\"checked\"');
if(typeof GM_getValue("opt_waitdel")=="undefined")GM_setValue('opt_waitdel',1);

settings.opt_accept=GM_getValue("opt_accept");
settings.opt_expired=GM_getValue("opt_expired");
settings.opt_declined=GM_getValue("opt_declined");
settings.opt_decided=GM_getValue("opt_decided");
settings.opt_additional=GM_getValue("opt_additional");
settings.opt_curpage=GM_getValue("opt_curpage");
settings.opt_confirm=GM_getValue("opt_confirm");
settings.opt_nocomment=GM_getValue("opt_nocomment");
settings.opt_waitdel=GM_getValue("opt_waitdel");


var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
var but=$('<a onclick="return false;" class="gmbutton dA_clear_corrs_but" href=""><span>Clear ended/expired</span></a>');
var summarydiv=$("<div style='display:none;'></div>").appendTo("div.messages-right");
var settingsbut=$('<img src="" alt="dA_clear_corrs settings" title="dA_clear_corrs settings"></img>');
GM_addStyle(".gmbutton.dA_clear_corrs_but {color:#1f6b76;  width: 200px;background-image:url('"+hintbg+"')}");
GM_addStyle(".gmbutton.dA_clear_corrs_but:active {background-image:url('"+hintbgh+"')}");
GM_addStyle(".gmbutton.dA_clear_corrs_but > img {margin-bottom: 3px;margin-left: 5px;vertical-align: middle;}");
GM_addStyle("#devopts div input{float: right;}");
GM_addStyle("table.mczone-footer td.td-sr{width:auto}");
var counter=0;
var gesumt=false
var hilfsarray=new Array("Accepted","Declined","Expired","Decided");

var hilfsarray2=new Array(settings.opt_accept!="",settings.opt_declined!="",settings.opt_expired!="",settings.opt_decided!="");
var zusatz=settings.opt_additional.split("|");
hilfsarray=hilfsarray.concat(zusatz);
 
var werts=new Array();

function filter(){
	if(!gesumt){setTimeout(function(){
		if(settings.opt_curpage=="")window.location.href="http://www.deviantart.com/messages/#view="+(window.location.href.match(/view=(\d+|correspondence)/)[1]);},500);
	return;}
	var parr;
	// console.log($("div.mcb-modhtml div.vote-float div:not([dA_clear_corrs])").length);
	if($("div.mcb-modhtml div.vote-float div:not([dA_clear_corrs])").length==0){setTimeout(filter,1000);return;}
	var ncounter=0;
	$("div.mcb-modhtml div.vote-float div:not([dA_clear_corrs])").attr("dA_clear_corrs",1).each(function(){	
		parr=$(this).parents("div.mcbox.ch.mcbox-full.mcbox-full-group_module");
		// console.log(!/\d+\s+Comments/.test(parr.find("div.mcb-modhtml div.vote-float a.a").html()));
		// var erg=parr.html().match(/(?:\/messages\/(\d+?)\/)|(?:moduleid="(\d+?)")/);
		// console.log("mesid: "+erg[1]+" modid: "+erg[2]);
		
		if(settings.opt_nocomment!=""&&parr.find("div.mcb-modhtml div.vote-float a.a").length>0&&!/\d+\s+Comment/.test(parr.find("div.mcb-modhtml div.vote-float a.a").html())||settings.opt_nocomment==""||parr.find("div.mcb-modhtml div.vote-float a.a").length==0)
		for(var i=0;i<hilfsarray.length;i++){
			if((hilfsarray2[i]||i>hilfsarray2.length-1)&&$(this).html().indexOf(hilfsarray[i])!=-1&&hilfsarray[i]!=""){
				// parr.clone(true,true).appendTo(summarydiv);
				// var erg=parr.html().match(/(?:\/messages\/(\d+?)\/)|(?:moduleid="(\d+?)")/);
				// console.log("mesid: "+erg[1]+" modid: "+erg[2]);				
				// werts.push(erg[1]||erg[2]);
				// werts.push(parr.find("div.ch-ctrl span.mcx"));
				parr.find("div.ch-ctrl span.mcx").click();
				counter++;
				ncounter++;
				break;
				// console.log($(this));
			}
		}
	});
	if(ncounter>0){
		filter();
		return;
	}
		var forward=$("div.mcb-modhtml div.vote-float a.a").parents("div.mczone").find("td.td-footer div.alink span.shadow span a.r");
		if(settings.opt_curpage==""&&forward.length!=0){
			
			forward.click();
			// console.log($("div.mcb-modhtml div.vote-float div:not([dA_clear_corrs])").length);
			setTimeout(filter,500);
			// filter();
		}else{
			$("a.dA_clear_corrs_but span").html("Clear ended/expired");
			gesumt=false;
			if(counter!=0){
				var folderid=$("div#messages.messages table.messages tbody tr td.f div.messages-left div.messages-menu a.f.selected").attr("mcdata").match(/"aggid":"?(\d+)"?/)[1];
		
				if(settings.opt_confirm==""||(settings.opt_confirm!=""&&alert("You have successfully removed "+counter+" correspondences from your inbox!\n"+
				(settings.opt_accept!=""?"-> Accepted were removed\n":"")+
				(settings.opt_declined!=""?"-> Declined were removed\n":"")+
				(settings.opt_decided!=""?"-> Decided were removed\n":"")+
				(settings.opt_expired!=""?"-> Expired were removed\n":"")+
				(settings.opt_additional!=""?"-> Items flagged as "+settings.opt_additional+" were removed\n":"")+
				(settings.opt_nocomment!=""?"-> commented pieces were ignored\n":"")+
				(settings.opt_curpage!=""?"-> Only the current page was affected":"-> All pages were affected")))){					
					// summarydiv.find("div.mcbox.ch.mcbox-full.mcbox-full-group_module span.mcx").click();
					// for(var i=0;i<werts.length;i++){
						// for(var j=1;j<30;j++)
							// console.log("MessageCenter", "trash_messages", [folderid, "id:correspondence:"+j+":"+werts[i]]);
							// unsafeWindow.DiFi.pushPost("MessageCenter", "trash_messages", [folderid, "id:correspondence:"+j+":"+werts[i]],difipost);
						// unsafeWindow.DiFi.send();
						// if(!$.contains(document.documentElement, werts[i]))$("body").append(werts[i]);
						// werts[i].click();
						// console.log(werts[i]);
						// console.log($.contains(document.documentElement, werts[i]));
					// }
					// console.log(werts.length);
					// unsafeWindow.DiFi.send();
						// if(settings.opt_curpage=="")setTimeout(function(){reloadpage();},settings.opt_waitdel*1000);
				}			
			}else{
				alert("There are no Elements qualifying for deletion!");
			}
		}
}

function difipost(success, data) {
	if(data.response.content!="trashed"){console.log("Removing failed");
	console.log(data);}
}

//data?
// html body#deviantART-v7.mc-stacks div#output div#bubbleview-messages.bubbleview div#messages.messages table.messages tbody tr td.f div.messages-right div.mczone div.mczone-inner div.mcbox div.ch-ctrl div.mcbox-inner div div.mcb-modhtml div.hh div.hh div.stream div.tt-a

//folderid
// html body#deviantART-v7.mc-stacks div#output div#bubbleview-messages.bubbleview div#messages.messages table.messages tbody tr td.f div.messages-left div.messages-menu div.pager-holder div.pager2 div.page2 a.f

//deviationid?
// html body#deviantART-v7.mc-stacks div#output div#bubbleview-messages.bubbleview div#messages.messages table.messages tbody tr td.f div.messages-right div.mczone div.mczone-inner div.mcbox div.ch-ctrl div.mcbox-inner div div.mcb-modhtml div.vote-float a.a

//POST: c[]	"MessageCenter","trash_messages",["1305938","id:correspondence:5:460281215"]
// MessageCenter","trash_messages",["1305938","id:correspondence:5:460281245"]

// removed a couple accepted submissions and both resulted 5
// Every accepted submission gave 5 as number, then I got a request to add a picture in a group and accepted, removing the object resulted in a 17
// Expired also resulted 5
// Declined submission resulted 5 as well.
// Accepted group joins resulted 3 instead.
// A declined group join with 3 comments instead resulted 3 and there's "oq:correspondence:42:20:f" appearing 3 times
//20 probably not trash_messages but get_views.


function reloadpage(){
	// if(summarydiv.find("div.mcbox.ch.mcbox-full.mcbox-full-group_module span.mcx").length>0){console.log(summarydiv);console.log(summarydiv.children());setTimeout(reloadpage,1000);return;}
	window.location.href="http://www.deviantart.com/messages/#view="+(window.location.href.match(/view=(\d+|correspondence)/)[1]);
	window.location.reload();
}
function insertelements(){
	if($("table.mczone-footer td.f.td-sr a.dA_clear_corrs_but").length!=0||!/view=(\d+|correspondence)/.test(window.location.href))return;
	but.append(settingsbut);
	$("h2.mczone-title:contains(Correspondence)").siblings("div").find("table.mczone-footer td.f.td-sr").append(but);
	// console.log($("h2.mczone-title:contains(Correspondence)").siblings("div").find("table.mczone-footer td.f.td-sr"));
}

but.click(function(){
	if(!gesumt){
		$("div.mcb-modhtml div.vote-float div[dA_clear_corrs]").removeAttr("dA_clear_corrs");
		summarydiv.empty();
		$(this).find("span").html("Abort");
		gesumt=true;
		counter=0;
		werts=new Array();
		if(settings.opt_curpage=="")window.location.href="http://www.deviantart.com/messages/#view="+(window.location.href.match(/view=(\d+|correspondence)/)[1])+"&page=1";
		setTimeout(function(){
			filter();
		},500);
	}else{
		gesumt=false; //abort!		
		$(this).find("span").html("Clear ended/expired");
	}
});

settingsbut.attr("src",disk).hover(function(){$(this).attr("src",hdisk);},function(){$(this).attr("src",disk);});
settingsbut.click(function(){
	setTimeout(optionwindow,0);
	return false;
});
setInterval(insertelements,1000);

function optionwindow(){
	$("#devopts").remove();
	var opt = document.createElement('div');
	opt.id="devopts";
	opt.setAttribute('style',"font:10pt Verdana,Arial,Helvetica,sans-serif!important;background-color:#393;left:"+ ((window.innerWidth - 300)/2 - 20) +"px;top:"+ ((window.innerHeight - 480)/2 - 20) +"px;width:300px;height:480px;padding:10px;border:3px ridge black;position:fixed;z-index:999;border-radius:15px;box-shadow:2px 2px 5px black;");
	
	opt.innerHTML="<h2 align='center'>Options</h2>"+
	"<div style='width:150px;padding-bottom:10px;float:left;'><label for='dA_clear_corrs_opt_accept'>Clear Accepted</label></div><div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='checkbox' id='dA_clear_corrs_opt_accept' "+GM_getValue('opt_accept')+"/></div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'><label for='dA_clear_corrs_opt_expired'>Clear Expired</label></div><div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='checkbox' id='dA_clear_corrs_opt_expired' "+GM_getValue('opt_expired')+"/></div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'><label for='dA_clear_corrs_opt_declined'>Clear Declined</label></div><div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='checkbox' id='dA_clear_corrs_opt_declined' "+GM_getValue('opt_declined')+"/></div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'><label for='dA_clear_corrs_opt_decided'>Clear Decided</label></div><div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='checkbox' id='dA_clear_corrs_opt_decided' "+GM_getValue('opt_decided')+"/></div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'><label for='dA_clear_corrs_opt_additional'>Additional keywords to search for (separate by |)</label></div><div style='width:140px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:100px;margin-right: 15px;' type='text' id='dA_clear_corrs_opt_additional' value='"+GM_getValue('opt_additional')+"'/></div>"+
	"<br style='clear:both;' /><br />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'><label for='dA_clear_corrs_opt_curpage'>Affect only current page</label></div><div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='checkbox' id='dA_clear_corrs_opt_curpage' "+GM_getValue('opt_curpage')+"/></div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'><label for='dA_clear_corrs_opt_nocomment'>Do not remove commented items</label></div><div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='checkbox' id='dA_clear_corrs_opt_nocomment' "+GM_getValue('opt_nocomment')+"/></div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'><label for='dA_clear_corrs_opt_confirm'>Show log after removing items</label></div><div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='checkbox' id='dA_clear_corrs_opt_confirm' "+GM_getValue('opt_confirm')+"/></div>"+
	"<br style='clear:both;' />"+
	"<div style='width:250px;padding-bottom:10px;float:left;'><label for='dA_clear_corrs_opt_waitdel'>Waiting-time to let dA register deletions (increase if messages are not removed or an error-alert was shown; Firefox usually need <1s, chrome <2s)</label></div><div style='width:40px;padding-bottom:10px;padding-right:10px;float:right;'><input style='width:40px;' type='text' id='dA_clear_corrs_opt_waitdel' value='"+GM_getValue('opt_waitdel')+"'/></div>"+
	"<br style='clear:both;' />"+
	"<input type='button' value='Save' id='devoptsav' style='margin-left:80px;' />"+
	"<input type='button' value='Cancel' id='devoptcan' style='margin-left:30px;' />";
	document.body.appendChild(opt);	
	$("#devoptsav").click(function(){setTimeout(optsav,0);});
	$("#devoptcan").click(function(){setTimeout(optcan,0);});
}

function optcan(){
	$("#devopts").remove();
}

function optsav(){

	GM_setValue('opt_accept',($("#dA_clear_corrs_opt_accept:checked").length>0)?'checked=\"checked\"':"");
	GM_setValue('opt_expired',($("#dA_clear_corrs_opt_expired:checked").length>0)?'checked=\"checked\"':"");
	GM_setValue('opt_declined',($("#dA_clear_corrs_opt_declined:checked").length>0)?'checked=\"checked\"':"");
	GM_setValue('opt_decided',($("#dA_clear_corrs_opt_decided:checked").length>0)?'checked=\"checked\"':"");
	GM_setValue('opt_curpage',($("#dA_clear_corrs_opt_curpage:checked").length>0)?'checked=\"checked\"':"");
	GM_setValue('opt_nocomment',($("#dA_clear_corrs_opt_nocomment:checked").length>0)?'checked=\"checked\"':"");
	GM_setValue('opt_waitdel',parseInt($("#dA_clear_corrs_opt_waitdel").val()));
	GM_setValue('opt_additional',$("#dA_clear_corrs_opt_additional").val());

	
	settings.opt_accept=GM_getValue("opt_accept");
	settings.opt_expired=GM_getValue("opt_expired");
	settings.opt_declined=GM_getValue("opt_declined");
	settings.opt_decided=GM_getValue("opt_decided");
	settings.opt_additional=GM_getValue("opt_additional");
	settings.opt_curpage=GM_getValue("opt_curpage");
	settings.opt_confirm=GM_getValue("opt_confirm");
	settings.opt_nocomment=GM_getValue("opt_nocomment");
	settings.opt_waitdel=GM_getValue("opt_waitdel");
	
	
	hilfsarray2=new Array(settings.opt_accept!="",settings.opt_declined!="",settings.opt_expired!="",settings.opt_decided!="");
	zusatz=settings.opt_additional.split("|");
	hilfsarray=hilfsarray.concat(zusatz);

	$("#devopts").remove();
}


},0);