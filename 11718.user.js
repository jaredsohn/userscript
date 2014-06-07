// ==UserScript==
// @name          Movies and Ebooks Forum Enhancer
// @description   Shows informations about movies and ebooks tested on phpBB, vBulletin, SMF 1.1.3 Simple Machines Forums
// @namespace     http://rapidsharedb.com/scripts/userscript.htm
// @include       *viewforum.php*
// @include       *forumdisplay.php*
// @include       http://*forum*
// @include       http://*movies*
// @creator       http://www.rapidsharedb.com/
// @source        http://userscripts.org/scripts/show/11718
// @version       0.5
// @date          2007-10-03
// ==/UserScript==

/*
   Contains code leeched and modified from various userscripts
*/
/*
   Changelog
   =========
   Version 0.4 0.5  - Fix bugs 
                - Added more info for the movies
   Version 0.3  - Added more phpBB forums   
   Version 0.2  - Added style options 
                - Fixed the » \d wrong request

   TO DO
   =====
   http://www.ware-zisto.com/forum/index.php?showforum=60

   -autoupdate
   -clean the code 
   -if it doesn't find image from imdb to search again for another
   -pause between some requests 
   -any suggestions ?
*/

var debug = false; // true or false ?

var images = "http://rapidsharedb.com/scripts/images/";

//---------------------	
// Style Examples
//between style_start and style_end will be the 
//content of the results of this script
//---------------------	
// Simple
//var style_start = '<div>';
//var style_end = '<div>';
//---------------------	
// Red Round Table

GM_addStyle(".xtop-left, .xtop-right, .xbottom-left, .xbottom-right {background-image: url('http://rapidsharedb.com/scripts/images/cornerstrasp1280x18.gif');height: 9px;font-size: 2px;} ");
GM_addStyle(".xtop-left, .xbottom-left {margin-right: 9px;}");
GM_addStyle(".xtop-right, .xbottom-right {margin-left: 9px; margin-top: -9px; }");
GM_addStyle(".xtop-right {background-position: 100% 0;}");
GM_addStyle(".xbottom-left  {background-position: 0 -9px;}");
GM_addStyle(".xbottom-right {background-position: 100% -9px;}");
GM_addStyle(".xinside {	border-left: 1px solid #C00000;border-right: 1px solid #C00000;padding-left: 10px;padding-right:10px;}");
GM_addStyle(".xnotopgap    { margin-top: 0; }");
GM_addStyle(".xnobottomgap { margin-bottom: -1px; padding-bottom: 1px; }");
var style_start = '	<div class="xtop-left"></div><div class="xtop-right"></div><div class="xinside"><div class="xnotopgap">';
var style_end = '</div><div class="xnobottomgap"></div></div><div class="xbottom-left"></div><div class="xbottom-right"></div>';


/* working/tested on 
phpBB                               
-----
http://www.pratechnet.com/viewforum.php?f=4
http://th3zone.com/forum/viewforum.php?f=8
http://www.warez-bb.org/viewforum.php?f=4
http://forumw.org/viewforum.php?f=3
http://www.greekhell.com/viewforum.php?f=5
http://www.grwarez.com/viewforum.php?f=6
http://rslinksforum.com/forums/viewforum.php?f=1
http://www.ultimatezone.org/viewforum.php?f=5
http://rapidshareforum.co.uk/forum/viewforum.php?f=7
http://www.varkoume.net/phpBB2/viewforum.php?f=6
http://hollywoodbitchslap.com/forum/viewforum.php?f=9725
http://www.comicworld.gr/forum/viewforum.php?f=10
http://www.scifinow.co.uk/forum/viewforum.php?f=15
http://www.isohunt.com/forum/viewforum.php?f=9
http://www.scteam.org/forum/viewforum.php?f=42
http://forum.xgam.net/viewforum.php?f=55
http://www.satudebol.com/viewforum.php?f=33
http://directory.ddloogle.com/viewforum.php?f=12
http://www.white-zone.info/viewforum.php?f=6
http://www.warez-bb.org/viewforum.php?f=4

vBulletin                         
---------
http://mainwarez.org/public-downloads-f42p3.html
http://www.phaz.us/forumdisplay.php?f=32 movies
http://www.phaz.us/forumdisplay.php?f=19 ebooks
http://peb.pl/filmy/
http://www.evilsfunhouse.com/index.php // bug !!
http://www.greekevolution.com/forum/foreign-movies-greek-subtitles-f111.html movies
http://www.greekwave.net/forums/forumdisplay.php?f=112&order=desc&page=2 movies

-----------------------

SMF 1.1.3 Simple Machines Forum   |//TABLE[@class='ipbtable']/TBODY/TR/TD[@class='row1']/DIV[2]/SPAN[@*]/A[@*]
-------------------------------
http://www.truforum.org/smf/index.php/board,77.0.html
http://www.ultimate-caffe.org/smf_new/index.php?board=79.0 ebooks
http://www.ultimate-caffe.org/smf_new/index.php?board=61.0 movies

IP.Board v1.3
--------------
http://softbase.bb2.org/index.php?showforum=10

IP.Board 
--------------
http://www.asianload.com/forums/index.php?showforum=282
http://quicksilverscreen.com/ipb/index.php?showforum=21
http://www.versuspictures.com/nt/index.php?showforum=4
http://www.funindia.us/index.php?showforum=21
http://www.versuspictures.com/nt/index.php?showforum=4

Unknown
-------
http://romaniainedit.3xforum.ro/topic/3/Movies/


http://64.233.183.104/search?q=cache:7jta1UgNWfEJ:83.149.99.14/forums/index.php%3Fshowforum%3D39&hl=en&ct=clnk&cd=4
BUGS
http://64.233.183.104/search?q=cache:7jta1UgNWfEJ:83.149.99.14/forums/index.php%3Fshowforum%3D39&hl=en&ct=clnk&cd=4

google query for I.P. board : intitle:movies dvdrip inurl:showforum -lofiversion -viewtopic -vBulletin -phpBB -SMF

*/

var lianks = document.evaluate(
// links we are searching for
//a[@class='topictitle']                                                === phpBB
//a[@class='topictitle link-new']                                       === phpBB
//tbody[@*]/tr/td[@class='alt1']/div[1]/a[@*]                           === vBulletin
//TR/TD[@class='windowbg']/SPAN[@*]/A                                   === SMF 1.1.3 Simple Machines Forum
//TR/TD[@class='windowbg']/SPAN/SPAN[@*]/A                              === SMF 1.1.3 Simple Machines Forum
//TABLE[@class='bordercolor']/TBODY/TR/TD[@class='windowbg']/SPAN[@*]/A === SMF 1.1.3 Simple Machines Forum
//TABLE[@class='ipbtable']/TBODY/TR/TD[@class='row1']/DIV[2]/SPAN[@id*]/A[@*]
//TBODY/TR/TD[@class='alt1']/DIV[1]/A[@*]                               === vBulletin Version 3.6.7           
//TBODY/TR/TD[@class='alt1']/DIV[1]/STRONG/A[@*]                                             === vBulletin Version 3.6.7 (only at http://www.greekwave.net/forums/forumdisplay.php?f=112&order=desc&page=2) 
//DIV[@id='ipbwrapper']/FORM/DIV[@class='tableborder']/TABLE/TBODY/TR/TD[@class='row4' and position()=3]/A   === IP.Board v1.3 

//html/body/table/tbody/tr/td[2]/a                                       === http://romaniainedit.3xforum.ro/topic/3/Movies/
//TABLE[@class='tborder' and @id='threadslist']/TBODY/TR/TD[@class='alt2']/DIV[1]/A  === http://mainwarez.org/movies-tv/

  "//TABLE[@class='tborder' and @id='threadslist']/TBODY/TR/TD[@class='alt2']/DIV[1]/A|/html/body/table/tbody/tr/td[2]/a|//DIV[@id='ipbwrapper']/FORM/DIV[@class='tableborder']/TABLE/TBODY/TR/TD[@class='row4' and position()=3]/A[@*]|//TBODY/TR/TD[@class='alt1']/DIV[1]/STRONG/A[@*]|//TBODY/TR/TD[@class='alt1']/DIV[1]/A[@*]|tbody[@*]/tr/td[@class='alt1']/div[1]/a[@*]|//a[@class='topictitle link-new']|//a[@class='topictitle']|//TABLE[@class='ipbtable']/TBODY/TR/TD[@class='row1']/DIV[2]/SPAN[@*]/A[@*]|//TR/TD[@class='windowbg']/SPAN[@*]/A|//TR/TD[@class='windowbg']/SPAN/SPAN[@*]/A",
  
  document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
//find the title of the document start
var tiatle = document.evaluate(
  "//title",
  document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for (var i = 0; i < tiatle.snapshotLength; i++) {
	title = tiatle.snapshotItem(i);
	var title_string = title.text;
    }
//find the title of the document end /is the title_string	

 


for (var i = 0; i < lianks.snapshotLength; i++) {
	var link = lianks.snapshotItem(i);


if ( (link.text.length > 2) && !(link.text.match(/» \d/)) && (link.text.match(/ /))) {
	// kai prepei na exei keno sto onoma gia na min einai onoma user tou border
//	ama to link exei mikos megalitero apo 2 kai den exei "� numero" (next link) tote 
	//main4()



getRating(link);



}

}


function getRating(link) {



	var orglink = link.href;
	var orglinktext = link.text;
	
	orglink = orglink.replace(/ /g,'+');
  orglink = orglink.replace(/&/g,'kcai');
  orglink = orglink.replace(/=/g,'ison');
	orglink = orglink.replace(/\?/g,'erotimatiko');

  orglinktext = orglinktext.replace(/ /g,'+');
  orglinktext = orglinktext.replace(/&/g,'kcai');
  orglinktext = orglinktext.replace(/=/g,'ison');

//GM_log(link.href + " =link.href= ");
//GM_log(link.text + " =link.text= ");
	  var string = link.text;
	  // Tring to remove the group names
    // this will remove anything after the '-digitword' so maybe not so good
    string = string.replace(/-.[a-zA-Z0-9]*/g,' ');
    // this will remove anything inside a ( ) but without digits / yes (dsd das) not (2000)
    string = string.replace(/\([~/\*a-zA-Z\s\.]*\)/g,' ');
    // this will remove [RS] [RS.com] [MS/RS] but not the [2001]
    string = string.replace(/\[[a-zA-Z\.\/ \,]*\]/g,' ');
    // this will remove {RS} {RS.com} {MS/RS} but not the {2001}
    string = string.replace(/\{[a-zA-Z\.\/ \,]*\}/g,' ');    
    // this will remove (RS) (RS.com) (MS/RS) but not the (2001)
    //string = string.replace(/\([a-zA-Z\,\.\/]*\)/g,' '); 
    // this will remove "RS" "RS.com" "MS/RS" but not the "2001"
    string = string.replace(/\"[a-zA-Z\.\/ \,]*\"/g,' '); 
    // this will remove "* something *"
    string = string.replace(/\*.*?\*/g,' ');
    //this will replace single numbers
    //string = string.replace(/\A[\d]*\z/g,' ');
    //string = string.replace(/\b[\d]\b/g,' ');
    // this will replace S01E05 to Season 1
    //string = string.replace(/S(\d){2}E[\d]{2}/g,"Season "$1"");
    string = string.replace(/S(\d){2}E[\d]{2}/ig, "Season $1"); 
    string = string.replace(/\./g,' ');
    string = string.replace(/\&/g,'and');
    string = string.replace(/\{/g,'\[');
    string = string.replace(/\}/g,'\]');
    string = string.replace(/- /g,'-');
    


    //general movies
    string = string.replace(/ DVDRip.*$/gi,'');
    //for Apps
    string = string.replace(/\[RS\.com \+ MU\]|\[RS.de\]|\[RS.com\]|\[REPOST\]|Retail|\:|Working Keygen|Serial|Full Version|Keymaker|Crack |\[RS\]|\[FH\]|Keygen| VCD|\[MS\]|CORE|\(Keygen Included\)/g,' '); 

    // Groups
    string = string.replace(/-BrG|-n00x|-DMT|-iHL|-NWO|-Rets|-ESiR|MediaFire|-dmN|-Sinners|-SSF|-ReCoDe|-MDP|BeStDivX|-X-Men|-Replica|-ASTEROiDS|-maVenssupplieR|-UNiVERSAL|-AXiNE|-20th|-REVEiLLE|-TFE|-REiGATE|-iNTENS|-uSk|-NoGrp|uSk|-Speed_hack|-JJXviD/g,' ');
    // Genikes Ekfraseis
    string = string.replace(/All Movies|and Links|Post Here|Top 200|imdb|FuLL DVD|R5LinePre-Dvdrip|Screencaps| INT | PDTV | WS |DSR|HDTV | VCD|Screen Shots|Screenshots|Screens|RECODED|700 MB|Very Good|\[Caps\]|\(ipod mp4\)|1080p|DTheater|\[Excellent Quality\]|DTS | PAL |2CD|\(CAM\)|DVD5|HDrip|WORKPRINT| HQ |BluRay|DVDscreener|DVDscreen|MegaMovies List|\[FTP\]|\.|SVCD| HQ\-DVDrip|x264|HDDVD|720p|Fully Cracked|with new crack|\[RS\+RnB\]|Awesome Quality|Rmvb format|Rmvb|\(no pwd\)|\||\(re up\)|Sexy Quality|7ooMB|High Definition|REPACK|STV|-iNTiMiD|movies|-DvF|Preview|Leaked|-PosTX|SYNCFIX|XViD|Screener|High Quality|divx|japanese|with english subs|VIDEO_TS|\@ MU \+ RS|-iKA|\@ MU|\[RS \+ MU\]|\[MU \+ RS\]|\[RS and MU\]|\[MU and RS\]|R5\.LINE|R5 LINE|R5|RETAIL|-HLS|-WHoRe|FLAiTE|INTERNAL|Original DVD|\(rs com\)|English|-FxM|\+CAPS|-XanaX|XanaX|-TKK|-MrNiCeGuY|Dvd Quality| SCR |-DoNE|-TURKiSO|- CAM|READNFO|\[MS\]|\(RS\.com\)|\(RS\)|\[RS\]|\[MU\]|\[SS\]|-iMBT|-NeDiVx|AC3\.5\.1|AC3|720p|x264|mkv|-MESS|\!|Direct DL|\*|Unrated|Edition|DvDrip|\[Eng\]|Great Quality|-PreVail|-QuidaM|VOB Cam|-VoMiT|-LuckyCharm|-DEiTY|Best Quality|-aXXo| Cam | cam | TS |\[RS.COM\]|\[MU\]| DVD RIP | DVDRip |\[RS\]|TELESYNC|\-|PUKKA|ESPiSE|ALLiANCE|SAPHiRE|aXXo|DiAMOND| CAM|-NEPTUNE|LIMiTED|PROPER|DVDSCR|DVDRip|LRC|mVs|EMERALD|DVDR|\(Very Good Quality\)/gi,' ');
	  string = string.replace(/Permanant Activation Crack|Crack and KeyMaker|Final Incl Keys|Greek Subs|DEAD MOVIE LINKS|\[ http\]|\[ http \]|\[http\]|\+ SAMPLE|\+SAMPLE|tvrip|\(TS\)|Merged topics|add here|All Versions Post Here|All Links Post Here|ALL POST HERE|ALL POSTS HERE|_| Eng |MegaUpload|rapidshare|DVD|rerip|Rip|merged|\-|\>|\<|\^|Complete/gi,' ');
	  // Ellinikes Ekfraseis
	  string = string.replace(/\(srt\)|Greek Subtitles|Greek Subtitle|Ensomatomenoi Ypotitloi|Me Ellinikous Ypotitlous/gi,' ');
	  // Greek Characters
	  // acsii convertor http://www.mikezilla.com/exp0012.html
	  string = string.replace(/\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03BF\u03AF|\u03A5\u03C0\u03CC\u03C4\u03B9\u03C4\u03BB\u03BF\u03B9/gi,' ');
	  // Elliniki alfavitos
	  string = string.replace(/\u03CE|\u03B1|\u03B2|\u03B3|\u03B4|\u03B5|\u03B6|\u03B7|\u03B8|\u03B9|\u03BA|\u03BB|\u03BC|\u03BD|\u03BE|\u03BF|\u03C0|\u03C1|\u03C3|\u03C4|\u03C5|\u03C6|\u03C7|\u03C8|\u03C9|\u03C2|\u03AC|\u03CC|\u03AF|\u03CD|\u03AD|\u0391|\u0392|\u0393|\u0394|\u0395|\u0396|\u0397|\u0398|\u0399|\u039A|\u039B|\u039C|\u039D|\u039E|\u039F|\u03A0|\u03A1|\u03A3|\u03A4|\u03A5|\u03A6|\u03A7|\u03A8|\u03A9/gi,'');

	  string = string.replace(/\[/g,'(');
    string = string.replace(/\]/g,')');
    string = string.replace(/  /g,' ');
    string = string.replace(/ /g,'+');	  
	  string = string.replace(/\+CAM\+/g,' ');
	  string = string.replace(/\+TC\+/g,' ');
	  string = string.replace(/\+TS\+/g,' ');
    string = string.replace(/\+\+/g,'+');
    string = string.replace(/\(\+\)/g,'+');
    
    string = string.replace(/\A1\z/g,' ');
    //string = string.replace(/1\+/g,' ');
    //string = string.replace(/1/g,' ');
    
//    if (debug){GM_log(string + " =string= ");}
var googlequery = "http://www.google.com/search?q=" + string; 
//http://www.google.gr/search?hl=en&btnG=%CE%91%CE%BD%CE%B1%CE%B6%CE%AE%CF%84%CE%B7%CF%83%CE%B7&num=2&meta=&q=123
//var googlequery = "http://www.google.com/search?num=2&hl=en&btnG=Search&q=site:imdb.com+" + string;
//function go_to_next() {
//var googlequery = "http://www.google.com/search?num=2&hl=en&btnG=Search&q=site:imdb.com+" + string;
//
//}
//window.setTimeout(go_to_next,150000);
//http://www.google.com/search?hl=en&btnG=%CE%91%CE%BD%CE%B1%CE%B6%CE%AE%CF%84%CE%B7%CF%83%CE%B7&num=2&meta=&q=site%3Aimdb.com+The+Terror 



	GM_xmlhttpRequest({
		method: 'GET',
url: googlequery,

onload: function (responseDetails) {
 if (responseDetails.status == 200) {
   //if (debug){GM_log(string.length + '=====string.length=====');}		
			  //var re = new RegExp("imdb.com/title/tt.*?/");
			  //var re = new RegExp("imdb\.com/title/tt.*?/|imdb\.com/Title\?\d{7}");
			  var re = new RegExp("imdb\.com/title/tt.*?/|imdb\.com/Title\?\d{7}", "i");
			  //us.imdb.com/Title?0462362
				var imdblink = re.exec(responseDetails.responseText);
				var amazregex = new RegExp("tp://www.amazon.com/[-A-Za-z0-9+&@#/%=~_|!:,.;]*/dp/[A-Z0-9]*");
                                  //new regex tp://www.amazon.com/[-A-Za-z0-9+&@#/%=~_|!:,.;]*/dp/[A-Z0-9]*
                                  //old regex	tp://www.amazon.com/.*?/dp/[A-Z0-9]*			
				var amazurl = amazregex.exec(responseDetails.responseText);
        	 if (title_string.match(/Video|New releases|dramat|Moviz|Documentaries on DVD|GREEK DVD|English Dvd|Series|TV Shows|movie|DVD With|moviez|Sci-Fi|pozostale gatunki|dramat|seriale|Guests|film|Free Downloads|Public Downloads/i)) { 
			        if (imdblink != null) {  


 if (debug){
 	//link.parentNode.innerHTML += style_start + "debug = true <br><a href="+googlequery+">" + string +"</a><br>" + movietitle[1] + "<br><a href=http://" + imdblink +">http://" + imdblink +"</a> <br> <b>" + rating[1]+" - "+rating[2] + " <img src='" +numberratingstars+"'/></b><br>" + smallimgm2x +" " + style_end;
    link.parentNode.innerHTML += style_start + "<quote>debug = true</quote><br><a href="+googlequery+">" + string +"</a><br><img src=http://rapidsharedb.com/cgi-bin/imdb/imdb.pl?tt=http://" +imdblink+"&orglink=" +orglink+"&orglinktext=" +orglinktext+"><br><a style='margin-left: 60px;' href=http://" + imdblink +">http://" + imdblink +"</a>" + style_end;
           }
	     //else{link.parentNode.innerHTML += style_start +" "+ movietitle[1] + "<br><a href=http://" + imdblink +">http://" + imdblink +"</a> <br><b>" + rating[1]+" - "+rating[2] + " <img src='" +numberratingstars+"'/></b><br>" + smallimgm2x +" " + style_end;  
			else{
			//link.parentNode.innerHTML += style_start +" "+ movietitle[1] + "<br><a href=http://" + imdblink +">http://" + imdblink +"</a> <br><b><img src=http://rapidsharedb.com/cgi-bin/imdb/imdb.pl?tt=http://" +imdblink+"&orglink=" +orglink+"&orglinktext=" +orglinktext+"></b><br>" + style_end; 
				link.parentNode.innerHTML += style_start +"<img src=http://rapidsharedb.com/cgi-bin/imdb/imdb.pl?tt=http://" +imdblink+"&orglink=" +orglink+"&orglinktext=" +orglinktext+"><br><a style='margin-left: 60px;' href=http://" + imdblink +">http://" + imdblink +"</a>" + style_end; 
				
				  }

}
else{
//debug link
 if (debug)       
link.parentNode.innerHTML += "<br>link.text = "+link.text+" <br>debug = true 3 Can't find imdb link<br><a href="+googlequery+">" + string +"</a><br>";
	
	
	}			
}
				

				else if (title_string.match(/book/i)) { 
	        // If the title of the html conteins those words like ebooks -> taking info from amazon

          // starting with amazon
          if (amazurl != null) {  // ama brei link gia imdb tote :

GM_xmlhttpRequest({
method: 'GET',
//url: "http://www.google.com/search?q=" + string,
url: "ht" + amazurl,
		onload: function (responseDetails) {
			if (responseDetails.status == 200) {
			//	GM_log("status 200");
				var bookratingexp = new RegExp("<b>.*?\/10</b>");
				var amazonimage = new RegExp('"http://.*\.images-amazon\.com/images/(I|G)/.*\.(jpg|gif)",');
// to palio regexpr "http://.*\.images-amazon\.com/images/(I|G)/.*_.(jpg|gif)",
// to neo   regexpr "http://.*\.images-amazon\.com/images/(I|G)/.*\.(jpg|gif)",
//"http://ec1.images-amazon.com/images/G/01/ciu/b7/61/5a0fb220dca0dcfc19b74010._AA240_.L.jpg",
//"http://ec1.images-amazon.com/images/I/51KSD0QJX1L._AA240_.jpg",				
				var bookrating = bookratingexp.exec(responseDetails.responseText);
				var amazonimageurl = amazonimage.exec(responseDetails.responseText);
			//	GM_log(bookrating);
link.parentNode.innerHTML +="<br> <a href=ht" + amazurl + ">amazon</a><br><a href=" + googlequery + ">Search about this with google</a><br><img src=" + amazonimageurl +"/>";
			
				if (amazonimage != null) {
 
}}}});
}
}
					{




// end amazon thing

		}

		}else{
//		
// ama den vriskei status 200
//debug link
 if (debug)       
link.parentNode.innerHTML += "link.text="+link.text+" <br>debug = true 4 Error cant find status 200<br><a href="+googlequery+">" + string +"</a><br>";
	
			    
		}
		
		}
		
	});
//	GM_log("3 ERROR status");



}


