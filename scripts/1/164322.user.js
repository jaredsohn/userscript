// ==UserScript==
// @name        Metal Archives Video Embedder
// @namespace   seergjej
// @description Embeds videos for Metal Archives entries (full albums and single songs)
// @include     http://*metal-archives.com/bands*
// @include     http://*metal-archives.com/albums*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @version     0.9
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
//---------------------------------------------------------------------------------------------------
//    Copyright (C) 2013  Sergio Proietti
//
//    Partially based on the Video Embedder (C)2008 code written by Firtina Ozbalikci
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    For a copy of the latest GNU General Public License, see <http://www.gnu.org/licenses/gpl.html>.

// If you distribute a modified version of Metal Archives Video Embedder, you are encouraged to use
// my name in the credits, and a copy of the license above.
//---------------------------------------------------------------------------------------------------

function main(nat) {

var defaultSites = [
	{
		n:'Youtube',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)youtube\.com\/.*v=([a-zA-Z0-9_-]+).*',
		args:[
       			 ['match','v=([a-zA-Z0-9_-]+)',1],
			],
		width:425,
		height:344,
		embed:'http://www.youtube.com/v/{0}', //&ap=%2526fmt=18
	}		
]  

var isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';           
        
var sites = defaultSites;
var page_links = Array();
var parents = Array();
var tmp_arr = Array();
var arr_search=Array();
var arr_result=Array();
var band_name;
var type;
var tot_links;
var loading;

tot_links = 0; 
curlinkid = 0;

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

function eliminate_duplicates(arr) {
var i,
  len=arr.length,
  out=[],
  obj={};

 for (i=0;i<len;i++) {
 obj[arr[i]]=0;
 }
 for (i in obj) {
 out.push(i);
 }
 return out;
}

function clean_arr(arr, arr_search) {
    //arr = eliminate_duplicates(arr);
    for(var j=0;j<arr.length;j++) {
        //console.log("before: "+arr[j]); //DEBUG
        arr[j] = arr[j].replace(/[^\w\s]/gi, '').replace("wmv","");
        if (arr_search) {
            //console.log("search = "+arr_search);
            if (isNumber(arr[j]) && (arr_search.indexOf(arr[j]) == -1)) arr[j]= "";
        }
        //console.log("after: "+arr[j]); //DEBUG
    }
    arr.clean("");
    arr.clean("wmv");
    arr.clean("cover");
    return arr;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function find_matches(arr_search, arr_result){
    var present = 0;
    for (var k=0;k<arr_search.length;k++) {
        for (var kk=0;kk<arr_result.length;kk++){
            if (arr_search[k].toLowerCase() == arr_result[kk].toLowerCase()) {
                present++; 
                //console.log(arr_search[k].toLowerCase() + " same as " + arr_result[kk].toLowerCase()); //DEBUG
                arr_result.splice(kk,1);
                kk=arr_result.length;
            }
            else if (arr_search[k].length > 2) 
                if (arr_result[kk].toLowerCase().indexOf(arr_search[k].toLowerCase()) != -1) {
                    present++; 
                    //console.log(arr_search[k].toLowerCase() + " found in " + arr_result[kk].toLowerCase()); //DEBUG
                    arr_result.splice(kk,1);
                    kk=arr_result.length;
                }
        }
    } 
    return present;
}

function find_in_arr(arr, query){
    for (jj=0;jj<arr_result.length;jj++) {
        //console.log(query + " = " + arr[jj] + " ?");
        if (arr[jj].toLowerCase() == query) {
            return true;
            break;
        }
    }
    return false;
}

function checklinks2(page_links){	
	for (var i=0; i<page_links.length; i++){
	   //console.log("page_links[i][0]= "+page_links[i][0]+"\npage_links[i][1] = "+page_links[i][1]+"\npage_links[i][2][0] = "+page_links[i][2][0]); //DEBUG
	   if ((page_links[i][0] != undefined) && (page_links[i][1] != "") && (page_links[i][2][0] != undefined)) {
    	   for(var ii=0;ii<sites.length;ii++){
        	   cursite = sites[ii];
        	   curlink = new Object();
        	   curlink.parentNode = parents[i];
        	   curlink.href = page_links[i][2][0];
        	   if(curlink.href.match(cursite.l) != null){
    	           var tp = replacer(cursite,curlink,cursite.n+':{0}');
    			   //console.log(clean_arr(page_links[i][1].split(" "))); //DEBUG
    			   //console.log(page_links[i][2][1].split(" ")); //DEBUG     <------------------------------------------------------------------------------------------------------------------------------------------------
    			   doit(cursite,curlink);
    			   curlink.vembedded = 1;
    			   //pushed.push(tp);
    			   break;
    		   }
            }
		}
	}
}

function doit(cursite,curlink)
{
	curlink.emb = document.createElement("embed");
	//console.log(curlink.href.split("?v=")[1].substr(0,11));
	//curlink.emb.setAttribute('id',curlink.href.split("?v=")[1].substr(0,11));
	curlink.emb.setAttribute('allowFullScreen','true');
	curlink.emb.setAttribute('src',replacer(cursite,curlink,cursite.embed+'?version=3&enablejsapi=1'));
	curlink.emb.setAttribute('type','application/x-shockwave-flash');
	curlink.emb.setAttribute('width',cursite.width);
	curlink.emb.setAttribute('height',cursite.height);
	curlink.emb.setAttribute('bgcolor','#000000');
	curlink.emb.setAttribute('allowScriptAccess','always');
	if(cursite.attr){
		for(var iii=0;iii<cursite.attr.length;iii++){
			curlink.emb.setAttribute(cursite.attr[iii][0],replacer(cursite,curlink,cursite.attr[iii][1]));
		}
	}
	if (type == "album") curlink.nextSibling = $(curlink.parentNode).children();
	else curlink.nextSibling = $(curlink.parentNode).children();
	//console.log(curlink.nextSibling); //DEBUG    <------------------------------------------------------------------------------------------------------------------------------------------------
	//console.log(curlink.parentNode); //DEBUG
    curlink.emb.setAttribute("style","display:none;padding-bottom:20px;");
	curlink.parentNode.append(curlink.emb);
	curlink.parentNode.html(curlink.parentNode.html()+" <span class='show' style='font-size:10px;color:#A2787A;cursor:pointer;' onmouseover='this.style.textDecoration = \"underline\"' onmouseout='this.style.textDecoration = \"none\"'>Show video</span>");
	tot_links++;
}

function replacer(cursite,curlink,from)
{
	function replacex(str,p1){
		var method = cursite.args[p1][0];
    		switch (method) {
			case 'match':
				return curlink.href.match(cursite.args[p1][1])[cursite.args[p1][2]];
			case undefined:
				return eval(cursite.args[p1][1]);
		}
	}
	return from.replace(/{([0-9]+)}/g,replacex);
}

function checkupd(){
	var elmInsertPoint = document.body;
	var elmD = document.createElement("div");
	elmD.setAttribute('style',"position:fixed;background:white;border:1px solid yellow;bottom:0")
	var elmA = document.createElement("a");
	elmA.setAttribute('style',"color:black")
	elmA.setAttribute("href", "http://userscripts.org/scripts/show/164322");
	elmA.innerHTML = 'Checking for new version of Metal Archives Video Embedder';
	elmD.appendChild(elmA)
	elmInsertPoint.insertBefore(elmD, elmInsertPoint.lastChild);
	if (isGM) {    
        GM_xmlhttpRequest({
            method:"GET",
            url:'http://userscripts.org/scripts/source/164322.user.js',
            onload:function(result) {
                if (result.responseText.indexOf('@version     0.9') == -1) {
                    upddiv = document.createElement("div");
                    upddiv.setAttribute('style','padding:10;position:fixed;background:black;border:2px solid gray;left:5px;bottom:5px;color:white;z-index:999999;');
                    upddiv.innerHTML = '<a style="color:white;visited color:white" href="http://userscripts.org/scripts/show/164322">There is a new version of the "Metal Archives Video Embedder" userscript. Click here to install it!</a>';
                    document.body.appendChild(upddiv);
                    elmA.setAttribute('style',"display:none")
                }
                else
                    elmA.setAttribute('style',"display:none")
            }
        });
    }
    else {
        url="http://userscripts.org/scripts/show/164322";
        $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
                "q=SELECT%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(url)+
                "%22&format=xml&callback=?",
        function(data){
          if(data.results[0]){
              if (data.results[0].indexOf("<p><strong>Version:</strong> 0.9</p>") == -1) {
                upddiv = document.createElement("div");
                upddiv.setAttribute('style','padding:10;position:fixed;background:black;border:2px solid gray;left:5px;bottom:5px;color:white;z-index:999999;');
                upddiv.innerHTML = '<a style="color:white;visited color:white" href="http://userscripts.org/scripts/show/164322">There is a new version of the "Metal Archives Video Embedder" userscript. Click here to install it!</a>';
                document.body.appendChild(upddiv);
                elmA.setAttribute('style',"display:none")
            }
              else
                  elmA.setAttribute('style',"display:none")
          } else {
            var errormsg = 'Error: could not check for updates.';
            console.log(errormsg);
          }
        }
      );
    }
}

function init(){
	checkupd();
	window.addEventListener('load', reallystart, false);
}

function do_query(yt_url,search_title,type) {
    var arr=Array();
    var arr_search=Array();
    var arr_result=Array();
    $.ajax({
         type: "GET",
         url: yt_url,
         dataType:"json",
         async:false,
         success: function(response)
         {
            if ((response.data.totalitems != 0) && (response.data.items != undefined)) {
                for (j=0;j<response.data.items.length;j++) {
                    arr_search = clean_arr(search_title.split(" "));
                    arr_result = clean_arr(response.data.items[j].title.split(" "), arr_search);
                    result_title = arr_result.join(" ");
                    //console.log(j+" : search : "+arr_search); //DEBUG
                    //console.log(j+" : result : "+arr_result); //DEBUG
                    present = find_matches(arr_search, arr_result);
			        //console.log("matches: " + present); //DEBUG
                    if (present >= arr_search.length){
                        //console.log("FOUND : "+result_title);
                        if (type == "song") {
                            if (arr_result.length > 0) {
                                //console.log(arr_result); //DEBUG
                                find = (((find_in_arr(arr_result, "full")) && (find_in_arr(arr_result, "album"))) || (find_in_arr(arr_result, "live")));
                                //console.log(find); //DEBUG
                                if (!find) {
                                    arr[0] = String(response.data.items[j].player.default);
                                    //arr[1] = response.data.items[j].title;
                                    arr[1] = result_title;
                                    j = response.data.items.length;
                                }
                            }
                            else {
                                arr[0] = String(response.data.items[j].player.default);
                                arr[1] = result_title;
                                j = response.data.items.length;
                            }
                        }
                        else {
                            arr[0] = String(response.data.items[j].player.default);
                            arr[1] = result_title;
                            j = response.data.items.length;
                        }
                    }
                }  
            }
        }
    }); 
    return arr;
}

function getlinks(array,type){
    complete="";
    cover="";
    live="";
    if (!find_in_arr(array,"cover")) cover = "-cover+";
    if (!find_in_arr(array,"live")) live = "-live+";
    j=0;
    for (i=0;i<array.length;i++) {  
        tmp_arr[i] = Array();
        if ((array[i][1] != "") && (array[i][1] != undefined)) {
            clean_arr(array[i]);
            if (type == "album") {
                query = band_name + "+" + array[i][1]+" full album -review -tribute";
                array[i][1] = band_name + " " + array[i][1]+" full album";
            }
            else {
                query = '"'+band_name+'"' + "+" + '"'+array[i][0]+'"' + "+" + '"'+array[i][1]+'"' + "+" + cover + live + "-review+-tribute+-karaoke" ;
                array[i][1] = band_name + " " + array[i][1];
            }
            var yt_url='http://gdata.youtube.com/feeds/api/videos?q=' + query + '&format=5&max-results=5&v=2&alt=jsonc'; 
            //console.log("first query"); //DEBUG
            tmp_arr[i] = do_query(yt_url,array[i][1],type);
            //console.log(tmp_arr[i][0]); //DEBUG
            if (tmp_arr[i][0] == undefined) {
                //console.log("second query"); DEBUG
                if (type == "song") {
                    array[i][1] = array[i][1].replace(band_name + " ","");
                    query = '"'+band_name+'"' + "+" + '"'+array[i][1]+'"' + "+" + cover + live + "-review+-tribute+-karaoke"; 
                    array[i][1] = band_name + " " + array[i][1];
                    var yt_url='http://gdata.youtube.com/feeds/api/videos?q=' + query + '&format=5&max-results=5&v=2&alt=jsonc';
                    tmp_arr[i] = do_query(yt_url,array[i][1],type);
                    //console.log(tmp_arr[i][0]); //DEBUG
                    if (tmp_arr[i][0] == undefined) {
                        //console.log("third query"); //DEBUG
                        array[i][1] = array[i][1].replace(band_name + " ","");
                        query = '"'+band_name+'"' + "+" + '"'+array[i][1]+'"'; 
                        array[i][1] = band_name + " " + array[i][1];
                        var yt_url='http://gdata.youtube.com/feeds/api/videos?q=' + query + '&format=5&max-results=5&v=2&alt=jsonc';
                        tmp_arr[i] = do_query(yt_url,array[i][1],type);
                    }
                }
            }
        } 
    }
    return(tmp_arr);
}

function reallystart(){

    $(document).ready(function(){  

            if (nat == 1) {
                style = "<style>.ui-dialog { z-index: 1000 !important; }.ui-widget-overlay { z-index: 1000 !important; height:104.6%; }</style>";
                $("head").append(style);
            }

            loader = '<div id="loader" style="background-color:#110107;text-align:left;"><span class="title" style="margin-top:30px;">Loading video links</span></div>';
    		$('#affiliation').append(loader);
   		 	loading = setInterval(function(){ $('#loader .title').text($('#loader .title').text()+"."); }, 700);
            setTimeout(function(){ 
        	    j=0;
        	    k=0;
        	    var anchor;  
        	    type="song";
        	    band_name = $('.band_name').find('a').html().trim();   
                //band_country = $('#band_stats .float_left').children().children().html();
                //if ($('#album_info .float_left').children().length != 0)
                //    album_year = $('#album_info .float_left').children().next().next().next().html().replace(/[A-Za-z $-]/g, "").slice(-4);
                $(".table_lyrics tbody tr td").each(function(index, td) {
            	   if ( ($(td).parent().hasClass('even') || $(td).parent().hasClass('odd')) && (index == 1 || (index - 5) % 2 == 0) && ($(td).html().indexOf("<a id=\"") === -1 ) ) {
            	       page_links[j] = Array();
            	       page_links[j][1] = $(td).html().trim().replace("&nbsp;","").replace("<em>instrumental</em>","").trim();
            	       page_links[j][0] = $("#album_info .album_name").text();
            	       parents[j] = $(td);
            	       j++;
            	   } 
                });
                if (page_links.length == 0) {
                    type="album";
                    if ($("#member_box .member_logout").text() != "Log out") {
                        $("#ui-tabs-1 .discog tbody tr td").each(function(index, td) {
                        //console.log($(td).html());
                            if ( ((index-4)% 2 == 0) && ($(td).html().indexOf("<a id=\"") === -1 ) ) {
                	           if (k % 2 == 0) {
                	               page_links[j] = Array();
                	               anchor = $(td).find('a');
                	               if ($(anchor).hasClass('album')) {page_links[j][1] = $(anchor).html().trim();parents[j] = $(td);}
                	           } else {
                	               if (($(td).css('font-weight') == '700') || ($(td).css('font-weight') == 'bold')) {page_links[j][0] = $(td).html().trim();}
                	               j++;
                	           }
                	           k++;
                	        } 
                        });     
                    }
                    else {
                        $("#ui-tabs-1 .discog tbody tr td").each(function(index, td) {
                            //console.log(index+": "+$(td).text());
                            if ((index >0) && ((index) % 5 != 0) && ((index-4)% 5 != 0) && ((index-7)% 5 != 0)) {
                                if (k%2 == 0) {
                	                page_links[j] = Array();
                	                anchor = $(td).find('a');
                	                if ($(anchor).hasClass('album')) {page_links[j][1] = $(anchor).html().trim();parents[j] = $(td);}
            	                } else {
            	                    if (($(td).css('font-weight') == '700') || ($(td).css('font-weight') == 'bold')) {page_links[j][0] = $(td).html().trim();}
            	                    j++;
            	                }
            	                k++;
            	           }
        	           });
                    }
                }
                //console.log(page_links); //DEBUG
            	links = getlinks(page_links,type);
            	for (i=0;i<links.length;i++) {
            	   page_links[i][2] = links[i]
            	};	
                curlinkid = 0;
            	checklinks2(page_links);
                $('#loader').html($('#loader').html()+"<br /><h4 style='color:#6D3F40;margin-top:-10px;'>Found "+tot_links+" YouTube links.</h4>");
                $('#loader .title').text("Loading video links");
                setTimeout(function(){$('#loader .title').animate({opacity : 0},1000)},1000);
                setTimeout(function(){$('#loader').fadeOut("slow");},3000);
            	$('.show').click(function(e){
            	   if ($(e.target).html() == "Show video") {
            	       $('.show').each(function(){
                            if ($(this) !== $(e.target)) {
                                $(this).html("Show video");
                                var video = $(this).prev().attr("src");
                                $(this).prev().attr("src","");
                                $(this).prev().attr("src",video);
                                $(this).prev().hide();
                            }
                        });
                        $(e.target).prev().show();
                        $(e.target).html("<br />Hide video");
                   } else {
                        $(e.target).html("Show video");
                        var video = $(e.target).prev().attr("src");
                        $(e.target).prev().attr("src","");
                        $(e.target).prev().attr("src",video);
                        $(e.target).prev().hide();
                   }
clearInterval(blink);
$('.show').animate({opacity : 1},1000);
                });
                var blink = setInterval(function(){$('.show').animate({opacity : 0.5},1000).animate({opacity : 1},1000)},1000);
                clearInterval(loading);
            },2000);
    });
}

init();

}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js");
  var script2 = document.createElement("script");
  script2.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")(1);";
    document.body.appendChild(script);
  }, false);
  document.getElementsByTagName('head')[0].appendChild(script);
  document.getElementsByTagName('head')[0].appendChild(script2);
}

if ((typeof jQuery == 'undefined') || ('function' !== typeof(GM_xmlhttpRequest))) { addJQuery(main);  }
else main(0);