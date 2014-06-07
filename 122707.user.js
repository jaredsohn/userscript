// ==UserScript==
// @name           dev_journal_filter
// @namespace      dev_journal_filter
// @description    let you filter your journals in your journal-edit-page
// @include        http://*.deviantart.com/journal/?browse=1
// @author         dediggefedde
// @version        0.95
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/122707.meta.js
// ==/UserScript==

(function(){
var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
var curpage=0;
var user=$("#oh-menu-deviant.oh-hasmenu a.oh-l span.username-with-symbol span.username").html();
var warteico="data:image/gif,GIF89a%14%00%14%00%CC%00%00%00%00%00%00%00%00OOOiii%FF%FF%FF%D2%FF%C7%DA%A4%02%99%99%99%7F%7F%7F%A2z%02%FE%E4%95'''%93%93%93%5C%5C%5C%FD%CB5mmmttt444%88%88%88%B9%9EM%D3%D3%D3%A7%A7%A7%B4%B4%B4%CC%CC%CCdW.%A6%99rND%26LLL%7FrJ%80e%14%94y(%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%19%00%00%00%2C%05%00%01%00%0A%00%12%00%40%05Q%20%00%0CA%19%0Cb%1A%24E%90%8EB%2C%A3%40%608wa%B80A%18%05%01j%200%99%84%A2%95C%C7%13%11%09A%DA%D3%E7%8B%8E%0C%C0%C2o%98%90%C9%0CC%01%B6%A0%40%3A%C5%D6W%E0%D0z%D5~%DAf%C0g%80%12%5C%C4%83~o%26%99h!%00!%F9%04%09%0A%00%00%00%2C%05%00%01%00%0A%00%12%00%40%05R%20%00%0CA%19%0Cb%1A%24E%90%8EB%2C%A3%40%608wa%B80%E1%17%02%D4%40%602%05E%2B%87%8E'%1A%12%804%A7Aa%60%1D%07%BEg%81%20%24%C8d%06%A1%C0%60((%8E%CD1%F4U%3B%B4%D8%81%1F%81%19'%18%9Es%D8a%CFG%93L4!%00!%F9%04%09%19%00%00%00%2C%05%00%01%00%0A%00%12%00%40%05U%20%00%0CA%19%0Cb%1A%24E%90%8EB%2C%A3%40%E0%18%04Q8.L%24%3A%01j%200%99%84%A2%80%C2Q0%F4D%C4%20%8DhPT%0D%05%E4%20W(%E4%86%09%99%8C0%14%24%B0%0A%24T%80U%AB%0E%ADW%8D%80%25%3C%03t%03%CB%0E%3B%F8%FFj%24%264!%00!%F9%04%09%19%00%00%00%2C%05%00%01%00%0A%00%12%00%40%05Q%20%00%0CA%19%0Cb%1A%24E%90%8EB%2C%A3%40%E0%10xA%B8%B0%91(%05%01j%200%99%84%A2%80%C2Q0%F0DDB%90F4(%AC%86%E9(%A7%23%0C%092%99%17%96%90%82i%3D%ED%2Bph%BDj%B9%9D*a%F0%E9%5C%C4%83~%8F%1C%19i!%00!%F9%04%09%19%00%00%00%2C%05%00%01%00%0A%00%12%00%40%05P%20%00%0CA%19%0Cb%1A%24E%90%8EB%2C%A3%40%40%DCDA%B8%B0%92%18%05%01j%200%99%84%A2%80!g%E0%89%889%24%CC%A0%A0%02%91%83%5BAG%18%12d%B2.L%FB%A5M%83%E6%E4%A1%F5%AA%11%80%09%A7%D2%60%605a%87%BC%5EJ2%D1B%00!%F9%04%09%19%00%00%00%2C%03%00%01%00%0F%00%12%00%40%05z%20%20%8E%A2e%1Dd%1Ah%C9%25%04H%8A%04K%005i.6%15Q%BD%B0AC%60(%16%0C%9D%80.%D5%98!%0AN%DD%83P%20X%19%16%00%010%80Q%08%0CeJ%22%80%1C%26GNd%C9%9CFu%01%86%A0%86%20%1C%B2*%06%950%17Hr%0B%19Urb%233%02h%1B%0F)%03%0F%08%14%0A%06%05%1E8%8C%01%07%17%92%06%02%18p%0Be%05%13%9Cl%08%11%0D%03K!%00!%F9%04%09%19%00%00%00%2C%02%00%05%00%10%00%0A%00%40%05D%200%0C%40i%9E%23%10%08B%40%9Eb%40%B4%ABa%14%06q%10%05%E1%174%81%AF%F5%1A%ACx%C1%9B!%11%F4!%03%2B%22%2C6%83%0A%14%05E%F5%F8%0B*%12%85%84%ED%D0%EBZ%C5%D2%98%B0*zMK%A9%10%00!%F9%04%09%19%00%00%00%2C%02%00%01%00%0F%00%12%00%40%05%7B%20%20%02%C7%C3%8C(%8A%04%C2%95hH*%03%10%14%2CA%0C%0C%EB%22T%86%CAc%96%0A%1C%08%05%82r%D1%00%AC%10%06%C4%A2r%92I%18%06C!%3B%24%8E%02%0C%02E%3A%20F%8E%C8%03D%20%11%3D%0D%8F%A6%EC%B0(%F4%04%8C%80U%E0%DB%1A%F2fxZ%19%0B%5E%24%0F%1B%04%13%01%11%3A3%0D%14%13Ic%0Fe)%02%02H%04%17%07%01%96(%98%07j%7CzD%03%0D%8D%23!%00%3B";
var pdown="data:image/gif;base64,R0lGODlhEAAQAMIHACkwMDI6OjQ9PUFNTFVlY2FycWR2df%2F%2F%2FyH%2BEUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAcALAAAAAAQABAAAAMteLrc%2FjCyIKqtIAOjyPhg%2BHGdKJKlCaKpyS7eCcXhy9CD3cT6PkqwAnBIXCQAADs%3D";
var itemtempl=' <li class="f"> <span class="side"> <a href="##1##" class="a">Edit</a> <form style="display:inline" action="http://my.deviantart.com/journal/delete" method="post"> <input value="##2##" name="journalid" type="hidden"> <a href="#" class="a" onclick="return DWait.readyLink(\'jms/pages/art/deviation.js\', this, \'Deviation._delete(##2##)\')">Delete</a> </form> </span> <span class="side">##3##</span> <a class="a" href="##4##" title="##6##">##5##</a> </li>';

var getjid=new Array();
if(GM_getValue("getjid")){getjid=GM_getValue("getjid").split(".");}

var jlist=new Array();
var zarray=new Array();
var difinach=new Array();
var clist=new Array();
var cvlist=new Array();
var preparr = new Array();
if(GM_getValue("jlist")){
	jlist=$.map(GM_getValue("jlist").split(String.fromCharCode(21)),function(n,i){return [n.split(String.fromCharCode(20))];});
}

function getjournals(offset,prepend) {
	jlist=new Array();
	$.get("http://my.deviantart.com/journal/?browse=1&offset="+offset, function (data) {
			var rex = /(http:\/\/.*?.deviantart.com\/.*?)" class="a">Edit<\/a>[\s\S]*?id:(\d+)[\s\S]*?<span class="side">([^\r]*?)<\/span>\s*<a class="a" href="(.*?)">(.*?)<\/a>/gi;
			var iter="";
			while(iter = rex.exec(data)){
				if(prepend && getjid.indexOf(iter[2])!=-1){
					jlist=preparr.concat(jlist);
					window.setTimeout(function(){						
						GM_setValue("jlist", $.map(jlist,function(n,i){return n.join(String.fromCharCode(20));}).join(String.fromCharCode(21)));
						GM_setValue("getjid",getjid.join("."));
						full(0);						
						$(".gr h2>img:first-child").attr("src","http://st.deviantart.net/minish/gruzecontrol/icons/journal.gif?2");
					},0);
					return true;
				}
				
				if(prepend){
					preparr.push(new Array(iter[1],iter[2],iter[3],iter[4],iter[5],clist[cvlist.indexOf(iter[2])]));
				}else{
					jlist.push(new Array(iter[1],iter[2],iter[3],iter[4],iter[5],clist[cvlist.indexOf(iter[2])]));
				}
				getjid.push(iter[2]);
			}
			if(data.search(new RegExp('<a class="disabled">Next</a>',"i"))==-1){
				getjournals(offset+50,prepend); 
			}else{
				if(prepend){jlist=preparr.concat(jlist);}
				window.setTimeout(function(){GM_setValue("jlist", $.map(jlist,function(n,i){return n.join(String.fromCharCode(20));}).join(String.fromCharCode(21)));GM_setValue("getjid",getjid.join("."));},0); 
				full(0);
				$(".gr h2>img:first-child").attr("src","http://st.deviantart.net/minish/gruzecontrol/icons/journal.gif?2");
			}
        });
}
function getcategories(offset,prepend){
	$(".gr h2>img:first-child").attr("src",warteico);
	if(offset==0){clist=new Array();cvlist=new Array();}
	$.get("http://my.deviantart.com/global/difi/?c[]=%22Resources%22,%22htmlFromQuery%22,[%22by:"+user+"%20in:journals%22,"+offset+",24,%22thumb150%22,%22artist:0,title:1%22]&t=json", function (data) {
			var rex = /collect_rid=\\"\d+:(\d+)\\"[\s\S]*?symbol=\\".*?\\" category=\\"(.*?)">/gi;
			var iter="";
			var it=0;	
			while(iter = rex.exec(data)){
				it+=1;
				if(prepend && getjid.indexOf(iter[1])!=-1){
					getjournals(0,true);
					return true;
				}
				cvlist.push(iter[1]);
				clist.push(iter[2]);
			}
			if(it==24){
				getcategories(offset+24,prepend);
			}else{
				if(!prepend){getjid=new Array();}
				preparr=new Array();
				getjournals(0,prepend);
			}
        });
}
function getcatsnach(offset){
	if(offset==0){clist=new Array();cvlist=new Array();}
	$.get("http://my.deviantart.com/global/difi/?c[]=%22Resources%22,%22htmlFromQuery%22,[%22by:"+user+"%20in:journals%22,"+offset+",24,%22thumb150%22,%22artist:0,title:1%22]&t=json", function (data) {
			var rex = /collect_rid=\\"\d+:(\d+)\\"[\s\S]*?symbol=\\".*?\\" category=\\"(.*?)">/gi;
			var iter="";
			var it=0;	
			while(iter = rex.exec(data)){
				it+=1;
				if(cvlist.indexOf(iter[1])!=-1){return false;}
				if(difinach.indexOf(iter[1])!=-1){
					cvlist.push(iter[1]);
					clist.push(iter[2]);
					difinach.splice(difinach.indexOf(iter[1]),1);
					if(difinach.lenght==0){return true;}
				}
			}
			if(it==24){getcatsnach(offset+24);}
        });
}

function pruf(item){
	if($("#djf_search").val()!=""){
		if(item[4].search(new RegExp($("#djf_search").val(), "i"))==-1){
		return false;}
	}
	if(!item[5] || item[5]=="Not yet in difi, try again in some minutes!"){
		if(cvlist.indexOf(item[1])!=-1){item[5]=clist[cvlist.indexOf(iter[2])];return true}
		item[5]="Not yet in difi, try again in some minutes!";
		var idx = getjid.indexOf(item[5]);
		if(idx!=-1){getjid.splice(idx, 1);}
		difinach.push(item[1]);
		return true;
	}
	if(item[5].indexOf("/personal")!=-1 && $("#djf_catlist input")[0].checked){return true;}
	if(item[5].indexOf("/culture")!=-1 && $("#djf_catlist input")[1].checked){return true;}
	if(item[5].indexOf("/art")!=-1 && $("#djf_catlist input")[2].checked){return true;}
	if(item[5].indexOf("/fun")!=-1 && $("#djf_catlist input")[3].checked){return true;}
	if(item[5].indexOf("/deviantart")!=-1 && $("#djf_catlist input")[4].checked){return true;}
	return false
}
function full(site){
	curpage=site;
	if(jlist.length==0){return true;}
	$("#journal_sidebar li.f").remove();
	zarray=new Array();
	zarray=$.map(jlist,function(n,i){if(!pruf(n)){return null;}return [n];});
	$.each(zarray.slice(site*50,site*50+50),function(i,n){
		var item = itemtempl.replace("##1##",n[0]);
		item =item.replace(/##2##/g,n[1]);
		item =item.replace("##3##",n[2]);
		item =item.replace("##4##",n[3]);
		item =item.replace("##5##",n[4]);
		item =item.replace("##6##",n[5]);
		$("#journal_sidebar ul.f.list").append(item);
	});
	$("#journal_sidebar ul.f.list li.f").filter(":odd").attr("class","f a");
	if(curpage<(zarray.length/50)-1){
			$("#journal_sidebar .pages .next a").attr("class","");
	}else{
			$("#journal_sidebar .pages .next a").attr("class","disabled");
	}
	if(curpage>0){
			$("#journal_sidebar .pages .prev a").attr("class","");
	}else{
			$("#journal_sidebar .pages .prev a").attr("class","disabled");
	}
	if(difinach.length!=0){if(getcatsnach(0)){full(0);}}
}

var fjid=$("#journal_sidebar ul.f.list li.f form input").attr("value");
if(getjid.indexOf(fjid)==-1){getcategories(0);}


$(".gr-box .gr h2").append("<span id='djf_reit'>Search: <input type='text' id='djf_search' value=''/> <span id='djf_cats'>category <img alt='down' src='"+pdown+"' style='height:10px;'/></span></span>");
$(".gr-box").prepend("<div id='djf_contcatlist'><div id='djf_catlist'><input type='checkbox' checked='checked' />Personal<br /><input type='checkbox' checked='checked' />Culture<br /><input type='checkbox' checked='checked' />Art<br /><input type='checkbox' checked='checked' />Fun<br /><input type='checkbox' checked='checked' />Deviantart</div></div>");

$("#djf_catlist").css({"background-color": "#D6DED4","padding": "10px","border-radius": "15px","border": "1px solid #89968A","z-index": "99"});
$("#djf_contcatlist").css({"padding-top": "30px","position": "absolute","right": "45px","z-index": "999","display":"none"});
$("#djf_reit").css("float","right");
$("#journal_sidebar").css("overflow","visible");

$("#djf_contcatlist").mouseleave(function(){$("#djf_contcatlist").css("display","none");});
$("#djf_cats").mouseover(function(){$("#djf_contcatlist").css("display","");});

full(0);

$("#djf_catlist input").click(function(){full(0);});
$(".gr-box .gr h2>img:first-child").click(function(){jlist=new Array();clist=new Array();getcategories(0,false);});   
$("#journal_sidebar .pages .prev a").click(function(){
	if(curpage>0){
		full(curpage-1);
		return false;
	}else{return false;}
});
$("#journal_sidebar .pages .next a").click(function(){
	if(curpage<(zarray.length/50)-1){
		full(curpage+1);
		return false;
	}else{return false;}
});
if(zarray.length>50){$("#journal_sidebar .pages .next a").attr("class","");}
$("#djf_search").keyup(function(){full(0);})
})();