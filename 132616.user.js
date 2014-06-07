// ==UserScript==
// @name           dev_note_search
// @namespace      dev_note_search
// @description    Let you search in your notes! Regexp available!
// @match          http://*.deviantart.com/messages/notes/*
// @match      	   http://*.deviantart.com/notes/*
// @version        1.52
// @contributor    Dediggefedde
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// ==/UserScript==

(function(){
var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
var wartbild="data:image/gif;base64,R0lGODlhFAAUAMwAAAAAAAAAAE9PT%2F%2F%2F%2F2lpadqkApmZmaJ6An9%2Ff%2F7klScnJ5OTk%2F3LNVxcXG1tbXR0dDQ0NKenp7meTdPT04iIiLS0tMzMzExMTKaZck5EJmRXLn9ySoBlFJR5KAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJGQAAACwFAAEACgASAEAFTSAAEEEZEGIaHEaQjkIso0BQMPdRuPAwFAMBiiAwmYSiFUPHExF9yJ5viiQUgL7C8CCTaWHXQiIKLpCThkEz%2BfM1A9mpi2io26MkEy0EACH5BAkKAAAALAUAAQAKABIAQAVNIAAQQRkQYhocRpCOQiyjQFAw91G48OAPAhRBYDIFRSuGjica%2Bo69QqJwAAp%2Fv6tMVhAKCuAEFAYeIw0DJtJXZQZ8hZ9raKjboSQTLQQAIfkECRkAAAAsBQABAAoAEgBABVEgABBBGRBiGhxGkI5CLKNAwBTDcDAurOcCFEFgMgVFgQTjUOiJhkDasJCgFg5HQm47EGJlsS6MyUgcnwLqWWUYOJEDnFsVv%2BJcQ4N%2BfyaZaCEAIfkECRkAAAAsBQABAAoAEgBABUsgABBBGRBiGhxGkI5CLKNAwAw47sLFkRQCFEFgMgVFgQTjUNiJhoPDkff7SYW5HFYmGwgFh9yUOkYaBk5k1rkq9ApomGFOn5JMtBAAIfkECRkAAAAsBQABAAoAEgBABU0gABBBGRBiGhxGkI5CLKNAMNy4CydHUQgogsBkAooChUFPJxLejLBCQlo4GAk4XHAgkw2Cgiw0mhgfDQPmceA7MJFtn0toqNuhJBMtBAAh%2BQQJGQAAACwDAAEADwASAEAFdiAgjmJVGWQaZIclBEiKBErwNGkuNtEQvTBCQ1AoHgqcgC7VmCEGTp1jQKUuKoABgACbDBbKFEXwMEgShQ1kyZxGdYGFoPY0YFWL6lxAySkwVi8yAQISAxcOKQQOCBNoBR04igEGFgVHAhpwCmRmmWwIEA0ESyEAIfkECRkAAAAsAgAFABAACgBABUEgQBBAaZ4jEAhCQJ5iMLRrURzFYAx8Twu81ouwCgZqtsOvNzuyXLBYc5UoJKZAnzOBwxV2zB9OWCJmW6JXtEwKAQAh%2BQQJGQAAACwCAAEADwASAEAFdyAgAoazjCiKBIJ1ZEgqA88TKEEMEKsiRIWIY5YKGAZIpKIBWCEKCEXkJKMsCljskDgKLAaTKIEIOQ4MhoeAInIWHEyZQQG9CRaBqsCXxZPvWBgKXCQOFwMSARA6Mw0TEkhhDmMpAgJJFgYBlCiWaGo4XAQNiyMhADs%3D";

GM_addStyle("#dev_note_wartbild{margin:-10px 0px -5px 0px;}"+
"#dev_note_reset.smbutton{margin-left:30px!important;height:30px;line-height:10pt;}"+
".dev_note_formline{line-height:18pt;}"+
".dev_note_formlabel{float: left; width: 100px;}"+
"#dev_note_name,#dev_note_subj{width:295px;}"+
"#dev_note_name,#dev_note_subj,#dev_note_mess{width:290px;}"+
"#dev_note_datef{width: 85px;float: left;margin-right:10px}"+
"#dev_note_datet{width: 90px;}"+
"#dev_note_but.smbutton{height:30px;padding:0px;margin:0px;line-height:10pt}"+
".dev_note_butline{text-align:center;}");

var nids=[];
var nclass=[];
var dispelms=[];

var nusers=[];
var nmessage=[];
var ntitle=[];
var ndate=[];
var nparam=[];
var erst;
var lastindpage=-1;
var maxpag;
var shown=0;

var wartimg=null;

function forminsert(){
		if($("div.pagination li.next").length==0){setTimeout(forminsert,100);return true;}
		
		maxpag=$("div.pagination li.number a").last().html();
		$("div.pagination li.next").click(function(){
			var pg=parseInt($("div.pagination li.current a").html());
			if(pg==parseInt($("div.pagination li.number a").last().html())){return false;}
			filter(pg*10);
			return false;});
		$("div.pagination li.prev").click(function(){
			var pg=parseInt($("div.pagination li.current a").html());
			if(pg==1){return false;}		
			filter((pg-2)*10);
			return false;});	
		 $("div.pagination li.next a").attr("href","");
		 $("div.pagination li.prev a").attr("href","");
		 $("div.pagination div.gotobox a").click(function(){
			var pg=parseInt($("div.pagination div.gotobox input").attr("value"));
			if(pg<1||pg>parseInt($("div.pagination li.number a").last().html())||pg==parseInt($("div.pagination li.current a").html())){alert("Please insert a valid number!");return false}
			filter((pg-1)*10);
			return false;});
		$("div.pagination div.gotobox a").attr("onclick","return false;");
		$("div.pagination div.gotobox input").keydown(function(e){
			if(e.which==13){
				var pg=parseInt($("div.pagination div.gotobox input").attr("value"));
				if(pg<1||pg>parseInt($("div.pagination li.number a").last().html())||pg==parseInt($("div.pagination li.current a").html())){alert("Please insert a vvalid number!");return false}
				filter((pg-1)*10);
				$("div.pagination div.gotobox").hide();
				return false;
			}
			});
		$("a.gtab.gtabi-mc").click(function(){
			$("#current-note").html("");
			$("#note-intro").show();
			$("div.push.compose_frame").hide();
			return false
		})
		$("a.gtab.gtabi-mc").attr("href","");
	
		$("#note-intro").append('<div id="dev_note_search_form" style="width:400px" class="mc"><h3>Note-Search</h3>'+
			'<div class="dev_note_formline"><div class="dev_note_formlabel">Name:</div><input type="text" id="dev_note_name"></div>'+
			'<div class="dev_note_formline"><div class="dev_note_formlabel">Subject:</div><input type="text" id="dev_note_subj"></div>'+
			'<div class="dev_note_formline"><div class="dev_note_formlabel">Message:</div><textarea id="dev_note_mess"></textarea></div>'+
			'<div class="dev_note_formline"><div class="dev_note_formlabel">Date from:<br>(m d yyyy)</div><input type="text" id="dev_note_datef"></div>'+
			'<div class="dev_note_formline"><div class="dev_note_formlabel">Date to:<br>(m d yyyy)</div><input type="text" id="dev_note_datet"><br></div><br/>'+
			'<div class="dev_note_butline"><a id="dev_note_but" onclick="return false;" class="smbutton"><span>Search</span><a id="dev_note_reset" onclick="return false;" class="smbutton"><span>Reindex Notes</span><a></div>'+
			'</div>');
			
		$("#dev_note_but").click(function(){filter(0);});
		$("#dev_note_reset").click(function(){
			setTimeout(function(){clear();codins();laden();wartimg.css("display","inline");},0);			
		});
		$("#dev_note_name").keyup(function(){filter(0);});
		$("#dev_note_subj").keyup(function(){filter(0);});
		$("#dev_note_mess").keyup(function(){filter(0);});
		$("#dev_note_datef").keyup(function(){filter(0);});
		$("#dev_note_datet").keyup(function(){filter(0);});
		
		$("a.button_mark").click(function(){
		setTimeout(function(){
		$("a.notes_toggle[method=toggleRead]").click(function(){
			var el1=$(this);
			$("li.note.selected").each(function(){
				var ind=nids.indexOf($(this).attr("id"));
				setTimeout(function(){
					var stat="icon i9";
					if($("#"+nids[ind]).hasClass("replied"))stat="icon i11";
					if(el1.attr("value")=="true"){
						stat="icon i23";
						if($("#"+nids[ind]).hasClass("replied"))stat="icon i21";
						$("#"+nids[ind]).removeClass("unread");
					}else{
						$("#"+nids[ind]).addClass("unread");
					}
					nclass[ind]=$("#"+nids[ind]).attr("class").replace("selected","").replace("current-note","");
					nparam[ind]=nparam[ind].split(String.fromCharCode(1))[0]+String.fromCharCode(1)+nparam[ind].split(String.fromCharCode(1))[1]+String.fromCharCode(1)+stat;
					save();
				},100);
			});
		});	
		$("a.notes_toggle[method=toggleStarred]").click(function(){
			var el1=$(this);
			$("li.note.selected").each(function(){
				var ind=nids.indexOf($(this).attr("id"));
				var el=$(this).find("span.icon_star");
				setTimeout(function(){
					var stat=" ";
					if(el1.attr("value")=="true"){stat=" starred";}
					el.attr("class","icon_star"+stat);
					nparam[ind]=stat+String.fromCharCode(1)+nparam[ind].split(String.fromCharCode(1))[1]+String.fromCharCode(1)+nparam[ind].split(String.fromCharCode(1))[2];
					save();
				},100);
			});
		});	
		},100);
		});
		
		wartimg=$("<img src='"+wartbild+"' id='dev_note_wartbild'/>");
		$("#dev_note_reset span").prepend(wartimg);
		wartimg.attr("title","progress: 0%");
}

function laden(){
	if(wartimg==null||$("#dev_note_temp").length==0||parseInt($("#dev_note_temp").attr("page"))==lastindpage){setTimeout(laden,100);return true;}
	lastindpage=parseInt($("#dev_note_temp").attr("page"));		
	wartimg.attr("title","progress: "+(Math.round((lastindpage+1)/(maxpag*0.1)))+"%");
	var rex=/<li data-cached="false" data-noteid="(\d+)" class="(.*?)">[\s\S]*?<span class="icon_star(.*?)">[\s\S]*?<a data-noteid=.*?data-folderid="(\d+)".*?title="(.*?)"[\s\S]*?(from .<a class="u" .*?>.*?)<[\s\S]*?class="ts" title="(.*?)">(.*?)<[\s\S]*?<i class="(.*?)"><[\s\S]*?expandable">([\s\S]*?)<\/div>/gi
		var row,i=0;
		while(row=rex.exec($("#dev_note_temp").attr("inhalt"))){
			if(nids.indexOf(row[1])!=-1){continue;}
			if(lastindpage==0){
				nids.splice(i,0,row[1]);
				nclass.splice(i,0,row[2]);		
				nparam.splice(i,0,row[3]+String.fromCharCode(1)+row[4]+String.fromCharCode(1)+row[9]);
				ntitle.splice(i,0,row[5]);
				nusers.splice(i,0,row[6]);
				ndate.splice(i,0,row[7]+"|"+row[8]);
				nmessage.splice(i,0,row[10]);
				i++;
			}else{
				nids.push(row[1]);
				nclass.push(row[2]);		
				nparam.push(row[3]+String.fromCharCode(1)+row[4]+String.fromCharCode(1)+row[9]);
				ntitle.push(row[5]);
				nusers.push(row[6]);
				ndate.push(row[7]+"|"+row[8]);
				nmessage.push(row[10]);
			}
		}
	if(nids.length==0)console.log("Note's html-layout changed.");
	save();
	insert(parseInt($("#dev_note_temp").attr("page")));
	filter(0,parseInt($("#dev_note_temp").attr("page"))>30);		
	if($("#dev_note_temp").attr("temp")=="1"){
		setTimeout(laden,100);
	}else{		
	// console.log("s");
		wartimg.css("display","none");
		lastindpage=-1;		
		$("span.icon_star").click(function(){
			var ind=nids.indexOf($(this).parents("li[data-noteid]").attr("id"));
			var el=$(this);
			setTimeout(function(){
				nparam[ind]=el.attr("class").match(/icon_star(.*)/)[1]+String.fromCharCode(1)+nparam[ind].split(String.fromCharCode(1))[1]+String.fromCharCode(1)+nparam[ind].split(String.fromCharCode(1))[2];
				save();
			},100);
		});		
		$("li.note").click(function(event){
			var ind=nids.indexOf($(this).attr("id"));
			var el=$(this).find("span.statusicon i.icon");
			setTimeout(function(){
				var stat=el.attr("class");
				if(!$(event.target).hasClass("icon")){
					switch(el.attr("class")){
					case "icon i9": el.click();break;
					case "icon i21": el.click();break;
					case "icon i23": stat="icon i23";break;
					case "icon i11": stat="icon i11";break;
					}
					
				}
				nparam[ind]=nparam[ind].split(String.fromCharCode(1))[0]+String.fromCharCode(1)+nparam[ind].split(String.fromCharCode(1))[1]+String.fromCharCode(1)+stat;
				nclass[ind]=$("#"+nids[ind]).attr("class").replace("selected","").replace("current-note","");		
				
				$("a.send_note").click(function(event){	
					// console.log(ind+":"+nparam[ind]);
					nparam[ind]=nparam[ind].split(String.fromCharCode(1))[0]+String.fromCharCode(1)+nparam[ind].split(String.fromCharCode(1))[1]+String.fromCharCode(1)+"icon i11";
					$("#"+nids[ind]).addClass("replied");
					$("#"+nids[ind]+" .statusicon .icon").attr("class","icon i11");
					
					// console.log(ind+":"+nparam[ind]);
					setTimeout(save,0);
				}).css("color","red");
				
				save();
			},100);
		});
	}
	$("#dev_note_temp").remove();
	GM_setValue("lastindpage",lastindpage);
}

function clear(){	
	$("li.note").removeAttr("prot");
	nids=[];
	nclass=[];
	nusers=[];
	nmessage=[];
	ntitle=[];
	ndate=[];
	nparam=[];
	GM_deleteValue("nids");
	GM_deleteValue("nclass");
	GM_deleteValue("nusers");
	GM_deleteValue("nmessage");
	GM_deleteValue("ntitle");
	GM_deleteValue("ndate");
	GM_deleteValue("nparam");
}

function save(){
	GM_setValue("nids",nids.join(String.fromCharCode(2)));
	GM_setValue("nclass",nclass.join(String.fromCharCode(2)));
	GM_setValue("nusers",nusers.join(String.fromCharCode(2)));
	GM_setValue("nmessage",nmessage.join(String.fromCharCode(2)));
	GM_setValue("ntitle",ntitle.join(String.fromCharCode(2)));
	GM_setValue("ndate",ndate.join(String.fromCharCode(2)));
	GM_setValue("nparam",nparam.join(String.fromCharCode(2)));
}

function load(){
	if(!GM_getValue("nids")){return false;}
	nids=GM_getValue("nids").split(String.fromCharCode(2));
	nclass=GM_getValue("nclass").split(String.fromCharCode(2));
	nusers=GM_getValue("nusers").split(String.fromCharCode(2));
	nmessage=GM_getValue("nmessage").split(String.fromCharCode(2));
	ntitle=GM_getValue("ntitle").split(String.fromCharCode(2));
	ndate=GM_getValue("ndate").split(String.fromCharCode(2));
	nparam=GM_getValue("nparam").split(String.fromCharCode(2));
}
function filter(offset,nav){
    if(typeof nav=="undefined")nav=false;    
	if(!nav){
		shown=0;
		var inh=document.createElement("div");
		inh.id="dev_note_search_notes";
		for(var i=0;i<nids.length;i++){
		  if($("#dev_note_name").attr("value")!=""&&nusers[i].match(/>(.*)$/i)[1].search(new RegExp($("#dev_note_name").attr("value"),"i"))==-1)continue;
		  if($("#dev_note_subj").attr("value")!=""&&ntitle[i].search(new RegExp($("#dev_note_subj").attr("value"),"i"))==-1)continue;
		  if($("#dev_note_mess").attr("value")!=""&&nmessage[i].search(new RegExp($("#dev_note_mess").attr("value"),"i"))==-1)continue;
		  var dn=new Date(Date.parse(ndate[i].split("|")[0]));
		  if(!dn.getTime()){dn=new Date(Date.parse(ndate[i].split("|")[1]));}
		  var df=new Date(Date.parse($("#dev_note_datef").attr("value")));
		  var dt=new Date(Date.parse($("#dev_note_datet").attr("value")));
		  if($("#dev_note_datef").attr("value")!=""&&dn.getTime()<df.getTime()){continue;}
		  if($("#dev_note_datet").attr("value")!=""&&dn.getTime()>dt.getTime()){continue;}
		  if(shown<10+offset&&shown>=offset){$(inh).append(dispelms[i]);}
		  shown++;
		}
		$("#dev_note_search_notes").remove();
		$("li.note").remove();
		$("ul.notes div.footer").before(inh);
	}else{
		shown=nids.length;
	}
	var pages=Math.floor((shown-1)/10);
	var aktpage=Math.floor((offset)/10);
	$("#current-folder div.pagination .number").remove();
	$("#current-folder div.pagination .dotdotdot").remove();
	
	if(aktpage>0)$("#current-folder div.pagination li.prev a").attr("class","away");else $("#current-folder div.pagination li.prev a").attr("class","disabled");
	if(aktpage<pages)$("#current-folder div.pagination li.next a").attr("class","away");else $("#current-folder div.pagination li.next a").attr("class","disabled");
	
	if(aktpage==0||aktpage==1||aktpage==2){
		if(aktpage==0)$("#current-folder div.pagination li.next").before("<li class='number nomargin current'><a href=''>1</a></li>");
		if(aktpage==1||aktpage==2)$("#current-folder div.pagination li.next").before("<li class='number nomargin'><a href=''>1</a></li>");
		if(pages>0){
			if(aktpage==0||aktpage==2)$("#current-folder div.pagination li.next").before("<li class='number'><a href=''>2</a></li>");
			if(aktpage==1)$("#current-folder div.pagination li.next").before("<li class='number current'><a href=''>2</a></li>");
			if(aktpage==2)$("#current-folder div.pagination li.next").before("<li class='number current'><a href=''>3</a></li>");
			if(((aktpage==0||aktpage==1)&&pages>2)||((aktpage==2)&&pages>2)){
				$("#current-folder div.pagination li.next").before("<li class='dotdotdot'><a href=''>...</a></li>");
			}
			if(((aktpage==0||aktpage==1)&&pages>1)||((aktpage==2)&&pages>2)){			
				$("#current-folder div.pagination li.next").before("<li class='away number'><a href=''>"+(pages+1)+"</a></li>");
			}
		}
	}else if(aktpage==pages||aktpage==pages-1||aktpage==pages-2){
		$("#current-folder div.pagination li.next").before("<li class='nomargin number'><a href=''>1</a></li>");
		$("#current-folder div.pagination li.next").before("<li class='dotdotdot'><a href=''>...</a></li>");
		
		if(aktpage==pages-2)$("#current-folder div.pagination li.next").before("<li class='number nomargin current'><a href=''>"+(pages-1)+"</a></li>");
		if(aktpage==pages)$("#current-folder div.pagination li.next").before("<li class='number nomargin '><a href=''>"+(pages)+"</a></li>");
		if(aktpage==pages-1)$("#current-folder div.pagination li.next").before("<li class='number nomargin current'><a href=''>"+(pages)+"</a></li>");
		if(aktpage==pages-2)$("#current-folder div.pagination li.next").before("<li class='number nomargin '><a href=''>"+(pages)+"</a></li>");
		if(aktpage==pages)$("#current-folder div.pagination li.next").before("<li class='number nomargin current'><a href=''>"+(pages+1)+"</a></li>");
		if(aktpage==pages-1)$("#current-folder div.pagination li.next").before("<li class='number nomargin '><a href=''>"+(pages+1)+"</a></li>");
		if(aktpage==pages-2)$("#current-folder div.pagination li.next").before("<li class='number nomargin '><a href=''>"+(pages+1)+"</a></li>");
	}else{
		$("#current-folder div.pagination li.next").before("<li class='number nomargin'><a href='' >1</a></li>");
		$("#current-folder div.pagination li.next").before("<li class='dotdotdot'><a href='' class='a'>...</a></li>");
		$("#current-folder div.pagination li.next").before("<li class='number current'><a href=''>"+(aktpage+1)+"</a></li>");
		$("#current-folder div.pagination li.next").before("<li class='dotdotdot'><a href='' class='b'>...</a></li>");
		$("#current-folder div.pagination li.next").before("<li class='away number'><a href=''>"+(pages+1)+"</a></li>");
	}
	$("#current-folder div.pagination li.number a").attr("onclick","return false;");
	
	$("#current-folder div.pagination li.number a:not([filterakt])").click(function(){filter(($(this).html()-1)*10);return false;});	
	$("#current-folder div.pagination li.number a").attr("filterakt","1");
	$("#current-folder li.dotdotdot a:not([filterakt])").click(function(){
		$("#current-folder div.gotobox").toggle();
		$("#current-folder div.pagination div.gotobox input").focus();
		$("#current-folder div.pagination div.gotobox input").select();
		var left=0;  
		if(aktpage==0||aktpage==1)left=24*3-12;else
		if(aktpage==2)left=24*4-12;else
		if(aktpage==pages||aktpage==pages-1||aktpage==pages-2||$(this).hasClass('a'))left=24*2-12;else
		if ($(this).hasClass('b')){left=24*4-12;
			if(aktpage>8)left+=8;
		}
		$("#current-folder div.gotobox").css("left",left);
		return false;
		});
		
	$("#current-folder li.dotdotdot a").attr("filterakt","1");
}
function insert(offset){
    if(typeof offset=="undefined")offset=0;
	if(offset==0)dispelms=[];
	// if($("li.note").length>0)erst=$("li.note").first().clone();
	erst=$("<li class=\"odd note opened ui-draggable current-note\" data-noteid=\"123456789\" data-cached=\"false\"><div style=\"overflow: hidden\"> <!-- necessary for long word issue -->    <span class=\"icon_checkbox\"><i tabindex=\"1\" class=\"check ctrl\"></i></span>    <span class=\"icon_star \"><i tabindex=\"1\" class=\"ctrl starred\"></i></span>    <div class=\"note-details\"><span class=\"subject\"><a class=\"wrap-for-ts-abs\" title=\".\" href=\"#1_0/123456789\" data-folderid=\"1\" data-noteid=\"123456789\">.</a></span><span class=\"sender\">from =<a href=\"http://dediggefedde.deviantart.com/\" class=\"u\">Dediggefedde</a></span><br>    </div>    <span title=\"1w 2d ago\" class=\"ts\">Mar 1, 2013, 7:08:56 PM</span>    <span class=\"statusicon\">    <i class=\"icon i23\"></i>    </span>    <div class=\"note-preview expandable\">testmail!</div>    <div class=\"show_more_container hidden\" style=\"display: block;\"><a class=\"show_more jslink\"><b></b></a></div>    </div><span class=\"sel-arrow\"><i></i></span>    </li>")
	for(var i=offset;i<nids.length;i++){
		erst.attr("data-noteid",nids[i]);
		erst.attr("id",nids[i]);
		erst.attr("class",nclass[i]);
		erst.attr("data-cached","false");
		erst.attr("prot","true");		
		erst.find("span.icon_star").attr("class","icon_star"+nparam[i].split(String.fromCharCode(1))[0]);	
		var noteid=erst.find("a[data-noteid]");
		noteid.attr("data-noteid",nids[i]);
		noteid.attr("data-folderid",nparam[i].split(String.fromCharCode(1))[1]);
		noteid.attr("href","http://my.deviantart.com/notes/#1_0/"+nids[i]);
		noteid.attr("title",ntitle[i]);
		noteid.html(ntitle[i]);
		erst.find("span.statusicon i.icon").attr("class",nparam[i].split(String.fromCharCode(1))[2]);		
		erst.find("span.sender").html(nusers[i]);
		
		var d1=new Date(Date.parse(ndate[i].split("|")[0]));
		var d2=new Date(Date.parse(ndate[i].split("|")[1]));
		var e1="ago";
		var dn;
		if(!d1.getTime())dn=d2;else dn=d1;
		var dz=new Date(new Date()-dn);
		if(Math.floor((dz/1000)%60)!=0)e1=Math.floor((dz/1000)%60)+"s "+e1;
		if(Math.floor((dz/1000/60)%60)!=0)e1=Math.floor((dz/1000/60)%60)+"m "+e1;
		if(Math.floor((dz/1000/60/60)%24)!=0)e1=Math.floor((dz/1000/60/60)%24)+"h "+e1;
		if(Math.floor((dz/1000/60/60/24)%7)!=0)e1=Math.floor((dz/1000/60/60/24)%7)+"d "+e1;
		if(Math.floor((dz/1000/60/60/24/7)%52)!=0)e1=Math.floor((dz/1000/60/60/24/7)%52)+"w "+e1;
		if(dz.getMonth()!=0)e1=dz.getMonth()+"m "+e1;
		if((dz.getFullYear()-1970)!=0)e1=(dz.getFullYear()-1970)+"y "+e1;
		if(!d1.getTime())ndate[i]=e1+"|"+ndate[i].split("|")[1];else ndate[i]=ndate[i].split("|")[0]+"|"+e1;
		erst.find("span.ts").attr("title",ndate[i].split("|")[0]);
		erst.find("span.ts").html(ndate[i].split("|")[1]);
		erst.find("div.note-preview").html(nmessage[i]);
		if(nmessage[i].length<80)erst.find("div.show_more_container").css("display","");else erst.find("div.show_more_container").css("display","block");
		dispelms.push(erst);
		erst=erst.clone();		
	}
}

function contentEval(source) {
  if ('function' == typeof source) {
	var ind="\"asd\"";
	if(nids.length!=0){ind=nids[0];}
    source = '('+source + ')('+ind+','+(lastindpage+1)+');';
  }  
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

function codins(){
	contentEval(function (aktid,j) {
		var inh="";
		function getter(i){
			DiFi.pushPost('Notes', 'display_folder', [1,i,true], function (C, B, F, D) {
				if (B.response.status == 'SUCCESS') {
					$("#dev_note_temp").remove();
					var d = document.createElement("div");
					d.id="dev_note_temp";
					d.setAttribute("style","display:none;");
					if(B.response.content.body.indexOf("This folder is empty")==-1){
						inh = B.response.content.body;
						if(B.response.content.body.indexOf("data-noteid=\""+aktid+"\"")==-1){
							getter(i+10);								
							d.setAttribute("temp","1");
						}else{d.setAttribute("temp","0");}
					}else{
						d.setAttribute("temp","0");
					}					
					d.setAttribute("inhalt",inh);
					d.setAttribute("page",i);
					document.body.appendChild(d);
				}
			});
			DiFi.send();
		}
		getter(j);
	});
}
function start(){
	if(window.location.href.indexOf("#1_0")==-1){if($("#dev_note_reset").length>0)$("#dev_note_search_form").remove();return;}
	if($("#dev_note_reset").length>0)return
	if(typeof GM_getValue("lastindpage")!="undefined"){lastindpage=GM_getValue("lastindpage");}
	load();
	codins();
	forminsert();
	laden();
}

setInterval(start,1000);

})();