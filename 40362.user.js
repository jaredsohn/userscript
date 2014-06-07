// ==UserScript==
// @name           IMDB Turkish subtitles
// @namespace      http://userscripts.org/scripts/show/40362
// @description    Searching for Turkish subtitles for movies listed on IMDB.com
// @version        21012009
// @license        GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include        http://*imdb.com/title/tt*
// ==/UserScript==

//----------------------------------
// New Additions version 21012009
// @include correction
// Turkish translate
//----------------------------------
// New Additions version 12012009
// http://www.turkcealtyazi.org/ correction
//----------------------------------
// New Additions version 31122008
// http://www.divxforever.in/ correction
//----------------------------------
// New Additions version 07112008 EPOE FACK edition
// http://www.all4divx.com/
// http://www.divxsubtitles.net/
//---------------------------------- 
// History
// Previous version 09092998
//----------------------------------
// To Do ?
// http://www.divxplanet.com/


var rootlength=document.getElementsByTagName("div");
function alternativetitle(){
for (i=0; i<rootlength.length; i++){

if (rootlength[i].className=="info"){

if (rootlength[i].innerHTML.match(/English title|\(USA\)\(/)){

for (y=0; rootlength[i].childNodes.length; y++){
	
	if (rootlength[i].childNodes[y].textContent.match(/English title|\(USA\)/)){
		var engishTitle = rootlength[i].childNodes[y].textContent;
		engishTitle = engishTitle.replace(/\(.*?\)/g,"");
		return engishTitle;
		
	        }
	      }
      }
    }
  }
}



getgreeksubs(1);






function getgreeksubs(vipx){
if ((document.getElementById('tn15crumbs')) && (window == top)) {

GM_registerMenuCommand('IMDB TR subtitles - Türkçe altyazı arama kutucuğunun yerini değiştir', function(){change_box_position();});
GM_registerMenuCommand('IMDB TR subtitles - Alternatif isimlerinde ara', function(){new_name_search();});

  function new_name_search(){
  	removeDaBox = document.getElementById('grsub_box')
    removeDaBox.parentNode.removeChild(removeDaBox);  	
  	getgreeksubs(3);
  }  	
  
  function change_box_position(){
  	removeDaBox = document.getElementById('grsub_box')
    removeDaBox.parentNode.removeChild(removeDaBox);  	
  	getgreeksubs(2);
  }

//if ((GM_getValue("xposit")) || isNaN(parseInt(GM_getValue("xposit")) != "NaN")){
	if (!(isNaN(GM_getValue("xposit")))){
var xposit = GM_getValue("xposit");
var yposit = GM_getValue("yposit");
}else{
var	xposit = 806;
var yposit = 108;
GM_setValue("xposit", xposit);
GM_setValue("yposit", yposit);
	};

function bakeValue(name,value,days) {
	GM_setValue(name, value);
	//alert(name+ '  ' +value);
}
		
var mybox = document.createElement("div");



if (vipx == 2){
    mybox.innerHTML = '<div  id="grsub_box" style="left: '+parseInt(xposit)+'px; top: '+parseInt(yposit)+'px; margin: 5px; padding: 5px; overflow: hidden; -moz-border-radius: 10px; position: absolute; width: 175px; opacity: 0.7; z-index: 100; height: 12px; font-size: 8pt; font-weight: bold; font-family: arial,sans-serif; background-color: rgb(243, 238, 173);">'+
                      '<span title="Yavaşça hareket ettir, kayıt etmek için tıkla"  style="-moz-border-radius:10px; background-color:white; border-color:yellow; position: absolute; top: 2px; height: 16px; border-style:groove; border-width:1px; width: 16px; left: 5px;"  border="2" cellspacing="1" cellpadding="1" >&nbsp;'+
                      '<span id="aplog2o" style="cursor:move" width="100%" ></span>'+
                      '</span>'+ 
                    	'<span id="aplogo" style="height:12px; width:18px; left:27px; background-image: url(http://www.all4divx.com/flags/223.png); position: inherit;">&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;'+
                    	'</span>'+
    	               	'<span  style="left:57px; position:absolute;  top:-5; width:200px; cursor: pointer;">Türkçe Altyazı</span>'+
    	               	'<p id="grsub_results"/>'+
                      '</div>';

 function listenToList(e){
    offsetx=e.clientX;
    offsety=e.clientY;
    nowX=document.getElementById("grsub_box").style.left;
    nowX = nowX.replace(/px/i,"");
    offsety = offsety.toString(10) + 'px';
    lefti = parseInt(e.clientX)-18;
    topi = parseInt(e.clientY)-18;
    moveit(lefti,topi);
  } 

function saveToList(e){
    aLIx = document.getElementById("grsub_box").style.left;
    aLIx = aLIx.replace(/px/i,"");
    aLIy = document.getElementById("grsub_box").style.top;
    aLIy = aLIy.replace(/px/i,"");    	
    
bakeValue('xposit', aLIx); 	
bakeValue('yposit', aLIy); 
alert("Yeni pozisyon kayıt edildi\n\nsoldan = "+aLIx +"px\nyukarıdan = "+aLIy+"px");
}


addEventHandler(mybox.firstChild.firstChild, "mousemove", listenToList , true);
addEventHandler(mybox.firstChild.firstChild, "click", saveToList , true);                      

}else if(vipx == 3){
	the_alternativetitle = alternativetitle();
    mybox.innerHTML = '<div  id="grsub_box" style="left: '+xposit+'px; top: '+yposit+'px; margin: 5px; padding: 5px; overflow: hidden; -moz-border-radius: 10px; position: absolute; width: 274px; opacity: 0.7; z-index: 100; height: 12px; font-size: 8pt; font-weight: bold; font-family: arial,sans-serif; background-color: rgb(243, 238, 173);">'+
                      '<span id="aplogo" style="height:12px; width:18px; left:12px; background-image: url(http://www.all4divx.com/flags/223.png); position: inherit;">&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;'+
                    	'</span>'+
    	               	'<span  style="left:36px; position:absolute;  top:-5; width:auto; cursor: pointer;">Türkçe Altyazılarda ara : </span>'+
    	               	'<input style="top:2px; left:172px; font-size:0.8em; height:10px; position:absolute;  top:-5; width:96px; cursor: cell;" id="searchquery" type="text" title="Search" value="'+the_alternativetitle+'" maxlength="2048" size="41" name="q"/>'+ 
                    	'<p id="grsub_results"/>'+
                      '</div>';

	
	}
	else{
    mybox.innerHTML = '<div  id="grsub_box" style="left: '+xposit+'px; top: '+yposit+'px; margin: 5px; padding: 5px; overflow: hidden; -moz-border-radius: 10px; position: absolute; width: 146px; opacity: 0.7; z-index: 100; height: 12px; font-size: 8pt; font-weight: bold; font-family: arial,sans-serif; background-color: rgb(243, 238, 173);">'+
                      //'</span>'+ 
                    	'<span id="aplogo" style="height:12px; width:18px; left:12px; background-image: url(http://www.all4divx.com/flags/223.png); position: inherit;">&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;'+
                    	'</span>'+
    	               	'<span  style="left:36px; position:absolute;  top:-5; width:200px; cursor: pointer;">Türkçe Altyazı</span>'+
    	               	'<p id="grsub_results"/>'+
                      '</div>';
}



 
                       

function moveit(lefti,topi){
	document.getElementById("grsub_box").style.left=lefti+'px'; 
	document.getElementById("grsub_box").style.top=topi+'px';
	return;
}	


if(vipx == 3){
    addEventHandler(mybox.firstChild.childNodes[1], "click",
 			function() {
				var box = document.getElementById('grsub_box');
				if (box.style.height.split('px')[0]<250 ) {
					box.style.height = 'auto';
					box.style.minWidth = '269px';
					box.style.minHeight = '12px';
					box.style.opacity  = '1';
					box.style.setProperty( "background-color", "#F7F3C5", "" );
					box.style.width = 'auto';
					box.style.overflowX = 'hidden';
				  box.style.overflowY = 'auto';
				  box.childNodes[1].style.setProperty( "font-style", "oblique", "" );
				  //box.childNodes[1].style.setProperty( "text-align", "center", "" );				  
				} else{
					box.style.height = 12 + 'px';
					//+box.style.width = '146px';
					box.style.opacity  = '0.7';
					box.style.setProperty( "background-color", "#F3EEAD", "" );
					box.childNodes[1].style.setProperty( "font-style", "normal", "" );
					
					//box.childNodes[1].style.setProperty( "text-align", "justify", "" );
					box.style.overflow = 'hidden';
				}
			
			var gotitonce = document.getElementById('flag_gr2');
			//if (!gotitonce){
				

  var search_query = mybox.firstChild.childNodes[2].value;

				getresults_for_grsubs(search_query);
				//}	

		  }
		, true);
	}else{   
    
		addEventHandler(mybox.firstChild.lastChild.previousSibling, "click",
			function() {
				var box = document.getElementById('grsub_box');
				if (box.style.height.split('px')[0]<250 ) {
					box.style.height = 'auto';
					box.style.minWidth = '146px';
					box.style.minHeight = '12px';
					box.style.opacity  = '1';
					box.style.setProperty( "background-color", "#F7F3C5", "" );
					box.style.width = 'auto';
					box.style.overflowX = 'hidden';
				  box.style.overflowY = 'auto';
				  box.childNodes[1].style.setProperty( "font-style", "oblique", "" );
				  //box.childNodes[1].style.setProperty( "text-align", "center", "" );				  
				} else{
					box.style.height = 12 + 'px';
					box.style.width = '146px';
					box.style.opacity  = '0.7';
					box.style.setProperty( "background-color", "#F3EEAD", "" );
					box.childNodes[1].style.setProperty( "font-style", "normal", "" );
					
					//box.childNodes[1].style.setProperty( "text-align", "justify", "" );
					box.style.overflow = 'hidden';
				}
			
			var gotitonce = document.getElementById('flag_gr2');
			if (!gotitonce){
				getresults_for_grsubs(1);
				}
 	

		  }
		, true);
}

   document.body.insertBefore(mybox, document.body.firstChild);
  }
function addEventHandler(target, eventName, eventHandler)
{
	if (target.addEventListener)
		target.addEventListener(eventName, eventHandler, false);
	else if (target.attachEvent)
		target.attachEvent("on" + eventName, eventHandler);
}
  
//---------------------------------- na  
function getresults_for_grsubs(getresults_for_grsubs){
	if (getresults_for_grsubs != '1'){
		//alert (getresults_for_grsubs);
		var movname = getresults_for_grsubs;
		sentittothesites(movname);
sentitttoOpensubs();
		
		
	}else{

  var regexTitle = /(?!".+")^(.+?) \(\d{4}(?:\/[IV]+)?\)/;
  var strTitle = document.getElementsByTagName("title")[0].textContent;
  strTitle = strTitle.replace(/"/g,'')
  var arrResult = regexTitle.exec(strTitle);
  var movname = arrResult[1];
    //alert (movname+'  '+movname.length);
    if (movname && movname.length > 1) {
    	sentitttoOpensubs();
    	sentittothesites(movname);
  	  	//--- old start ---\\
  	  	//getsubs4u_gr(movname);
  	  	//greeksubs_com(movname);
  	  	//---  old end  ---\\

     

  	}	
  	
}

function  sentitttoOpensubs(){
  // Regex to get this film's imdb number
  var regexImdbNum = /\/title\/tt(\d{7})\//;
  var arrImdbNum = regexImdbNum.exec(document.location);
  


  // Check that we got valid results from regex
    if (arrImdbNum && arrImdbNum.length == 2) {
  	getOpensubsResults(arrImdbNum[1]);
	turkceltyazi_org(arrImdbNum[1]);
  	   }
}  	   
 
function sentittothesites(movname){
        divxforever_in(movname.replace(/:/g,'').replace(/ /g,'+'));
		all4divx_com(movname.replace(/:/g,'').replace(/ /g,'+'));
        divxsubtitles_net(movname.replace(/:/g,'').replace(/ /g,'+'));

      }   

    // Check if the film's title was found


function divxsubtitles_net(moviename){
	var link = document.getElementById('grsub_results');
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.divxsubtitles.net/page_searchedsubtitles.php?_language=22&_format=-1&_framerate=-1&_date=-1&nbcd=-1&_grade=-2&_character=-1&_free=' + moviename + '&firstSearch=true&pageNo=1&recPerPage=40',
    headers: {
             'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
             'Accept': 'application/atom+xml,application/xml,text/xml',
             },
    onload: function (responseDetails) {


			if (responseDetails.status == 200) {
	      var re = new RegExp("&nbsp;&nbsp;Turkish", "g");
				var rating = re.exec(responseDetails.responseText);
				if (rating != null) {
				var whoManyResults = responseDetails.responseText.match(/&nbsp;&nbsp;Turkish/g);
				
					 if (whoManyResults.length > 0 ) {
 link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.divxsubtitles.net/favicon.ico  width='14' height='12'> <a href='http://www.divxsubtitles.net/page_searchedsubtitles.php?_language=22&_format=-1&_framerate=-1&_date=-1&nbcd=-1&_grade=-2&_character=-1&_free="+escape(moviename) + "&firstSearch=true&pageNo=1&recPerPage=40'>Found "+whoManyResults.length+" subtitles @ divxsubtitles.net</a></span>"; 			
           }
				}else{
					link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.divxsubtitles.net/favicon.ico  width='14' height='12'> <a href='http://www.divxsubtitles.net/page_searchedsubtitles.php?_language=22&_format=-1&_framerate=-1&_date=-1&nbcd=-1&_grade=-2&_character=-1&_free="+escape(moviename) + "&firstSearch=true&pageNo=1&recPerPage=40'>Status "+responseDetails.statusText+" 0 subtitles @ divxsubtitles.net</a></span>"; 			
	      }
					

			
     }else{
	 link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.divxsubtitles.net/favicon.ico  width='14' height='12'> <a id='not_flag_gr2' href='http://www.divxsubtitles.net/page_searchedsubtitles.php?_language=22&_format=-1&_framerate=-1&_date=-1&nbcd=-1&_grade=-2&_character=-1&_free="+escape(moviename)+"&firstSearch=true&pageNo=1&recPerPage=40'>"+responseDetails.status+" @ divxsubtitles.net</a></span>"; 			
				}
		}
	});	
	
	}

	

function all4divx_com(moviename){
	var link = document.getElementById('grsub_results');
	GM_xmlhttpRequest({
		method: 'GET',
    url: 'http://www.all4divx.com/subtitles/' + moviename + '/Turkish/1',
    headers: {
             'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
             'Accept': 'application/atom+xml,application/xml,text/xml',
             },
    onload: function (responseDetails) {


			if (responseDetails.status == 200) {
	      var re = new RegExp("movie_row_name_link_1", "g");
				var rating = re.exec(responseDetails.responseText);
				if (rating != null) {
				var whoManyResults = responseDetails.responseText.match(/movie_row_name_link_1/g);
				
					 if (whoManyResults.length > 0 ) {
 link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.all4divx.com/favicon.ico  width='14' height='12'> <a href='http://www.all4divx.com/subtitles/"+escape(moviename) + "/Turkish/1'>Found "+whoManyResults.length+" subtitles @ all4divx.com</a></span>"; 			
           }
				}else{
					link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.all4divx.com/favicon.ico  width='14' height='12'> <a href='http://www.all4divx.com/subtitles/"+escape(moviename) + "/Turkish/1'>Status "+responseDetails.statusText+" 0 subtitles @ all4divx.com</a></span>"; 			
	      }
					

			
     }else{
	 link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.all4divx.com/favicon.ico  width='14' height='12'> <a id='not_flag_gr2' href='http://www.all4divx.com/subtitles/"+escape(moviename)+"/Turkish/1'>"+responseDetails.status+" @ all4divx.com</a></span>"; 			
				}
		}
	});	
	
	}

	
	
function divxforever_in(moviename){
	var link = document.getElementById('grsub_results');
	GM_xmlhttpRequest({
		method: 'GET',
    url: 'http://www.divxforever.in/index.php?act=subz&CODE=66&mname=' + moviename,
    headers: {
             'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
             'Accept': 'application/atom+xml,application/xml,text/xml',
             },
    onload: function (responseDetails) {


			if (responseDetails.status == 200) {
	      var re = new RegExp("lang_TR.gif", "g");
				var rating = re.exec(responseDetails.responseText);
				if (rating != null) {
				var whoManyResults = responseDetails.responseText.match(/lang_TR.gif/g);
				
					 if (whoManyResults.length > 0 ) {
 link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.divxforever.in/favicon.ico  width='14' height='12'> <a href='http://www.divxforever.in/index.php?act=subz&CODE=66&mname="+escape(moviename)+">Found "+whoManyResults.length+" subtitles @ divxforever.in</a></span>"; 			
           }
				}else{
					link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.divxforever.in/favicon.ico  width='14' height='12'> <a href='http://www.divxforever.in/index.php?act=subz&CODE=66&mname="+escape(moviename)+">Status "+responseDetails.statusText+" 0 subtitles @ divxforever.in</a></span>"; 			
	      }
					

			
     }else{
	 link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.divxforever.in/favicon.ico  width='14' height='12'> <a id='not_flag_gr2' href='http://www.divxforever.in/index.php?act=subz&CODE=66&mname="+escape(moviename)+">"+responseDetails.status+" @ divxforever.in</a></span>"; 			
				}
		}
	});	
	
	}
	

	
function getOpensubsResults(movieid){
	var link = document.getElementById('grsub_results');
	var openlink = 'http://www.opensubtitles.com/en/search/sublanguageid-tur/imdbid-'+movieid;

	GM_xmlhttpRequest({
		method: 'GET',
		url: openlink,
    headers: {
             'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
             'Accept': 'application/atom+xml,application/xml,text/xml',
             },
    onload: function (responseDetails) {


			if (responseDetails.status == 200) {
var found_more_than_2_subs = new RegExp(/Results <b>1<\/b> - <b>\d{1,}<\/b> of <b>(\d{1,})<\/b>/);
var no_results = new RegExp("No results", "g");
var found_one_result = new RegExp("About movie", "g");
				
//Results <b>1<\/b> - <b>\d{1,}<\/b> of <b>\d{1,}<\/b>  - found_more_than_2_subs
//No results 
//About movie - found one result

var found_more_than_2_subs_f = found_more_than_2_subs.exec(responseDetails.responseText);
var no_results_f = no_results.exec(responseDetails.responseText);
var found_one_result_f = found_one_result.exec(responseDetails.responseText);
// found none
if (no_results_f !=null){
 link.innerHTML += "<br><span id='flag_gr2'><img src=http://www.opensubtitles.com/favicon.ico width='14' height='12'> <a href='"+openlink+">Status "+responseDetails.statusText+" 0 subtitles @ opensubtitles.com</a></span>";}
if (found_one_result_f !=null){
	link.innerHTML += "<br><span id='flag_gr2'><img src=http://www.opensubtitles.com/favicon.ico width='14' height='12'> <a href='"+openlink+">Found 1 subtitle</a></span>";
	}
if (found_more_than_2_subs_f !=null){
link.innerHTML += "<br><span id='flag_gr2'><img src=http://www.opensubtitles.com/favicon.ico width='14' height='12'> <a href='"+openlink+">Found "+found_more_than_2_subs_f[1]+" subtitles  @ opensubtitles.com</a></span>";
	}
	
	}else{
		link.innerHTML += "<br><span id='flag_gr2'><img src=http://www.opensubtitles.com/favicon.ico width='14' height='12'> <a href='"+openlink+">Error "+responseDetails.statusText+"  @ opensubtitles.com</a></span>";
		}
	}
		});
	}

	

  //turkcealtyazi.org now working
function turkceltyazi_org(movieid){
	var link = document.getElementById('grsub_results');
	var turkcealtyaziurl = 'http://www.turkcealtyazi.org/tt'+movieid;
	
	GM_xmlhttpRequest({
		method: 'GET',
    url: turkcealtyaziurl,
    headers: {
             'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
             'Accept': 'application/atom+xml,application/xml,text/xml',
             },
    onload: function (responseDetails) {


			if (responseDetails.status == 200) {
	      var re = new RegExp("tr.gif", "g");
				var rating = re.exec(responseDetails.responseText);
				if (rating != null) {
				var whoManyResults = responseDetails.responseText.match(/tr.gif/g);
				
					 if (whoManyResults.length > 0 ) {
 link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.turkcealtyazi.org/images/favicon.ico  width='14' height='12'> <a href='"+turkcealtyaziurl+">Found "+whoManyResults.length+" subtitles @ turkcealtyazi.com</a></span>"; 			
           }
				}else{
					link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.turkcealtyazi.org/images/favicon.ico  width='14' height='12'> <a href='"+turkcealtyaziurl+">Status "+responseDetails.statusText+" 0 subtitles @ turkcealtyazi.com</a></span>"; 			
	      }
					

			
     }else{
	 link.innerHTML += 
"<br><span id='flag_gr2'><img src=http://www.turkcealtyazi.org/images/favicon.ico  width='14' height='12'> <a id='not_flag_gr2' href='"+turkcealtyaziurl+">"+responseDetails.status+" @ turkcealtyazi.com</a></span>"; 			
				}
		}
	});	
	
	}


	
	
//GM_addStyle('span#flag_gr2 {font-size:0.4em;margin-left:17px;padding-top:6px} ');
GM_addStyle('span#flag_gr2 {font-size:0.9em;margin-left:2px;} ');
}


}



/*
pages 
http://www.greeksubs.com/ is using "post" OK
http://www.subs4u.gr/search_report.php?search=Dark+Star OK
http://www.greeksubtitlesproject.com/greek_subtitles.php?start=1000 OK

http://www.allsubs.org/search-subtitle stupid
http://greek-subtitles.mysubtitles.org/movie/dark-star_94919.html stupid
http://subscene.com/greek/Iron-Man-Ironman/subtitle-144741.aspx den mporo na psakso
http://divxtitles.com/Dark%20Star/Greek/any/1
http://www.podnapisi.net/ppodnapisi/search?tbsl=1&sK=Dark+Star&sJ=16&sY=&submit=Search skata
http://www.all4divx.com/subtitles/The+Big+Sleep/Greek/any/1 :-)
http://www.all4divx.com/subtitles/National+Treasure+Book+of+Secrets/Greek/any/1  :-)
moviesubtitles.org 
subtitlesbox.com


*/