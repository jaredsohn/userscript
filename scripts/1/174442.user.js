// ==UserScript==
// @name        One Click Download
// @namespace   http://localhost
// @include     http://*.nowvideo.*/*
// @include     http://*.vidbux.*/*
// @include     http://*.vidxden.*/*
// @include     http://*.novamov.*/*
// @include     http://*.movshare.*/*
// @include     http://*.dailymotion.*/*
// @include     http://*.filenuke.*/*
// @include     http://filenuke.*/*
// @include     http://daclips.*/*
// @include     http://gorillavid.*/*
// @include     http://*.vidhog.*/*
// @include     http://*.nosvideo.*/*
// @include     http://nosvideo.*/*
// @include     http://*.divxstage.*/*
// @include     http://*.promptfile.*/*
// @include     http://*.sharesix.*/*
// @include     http://sharesix.*/*
// @include     http://*.videoweed.*/*
// @include     http://*.sharerepo.*/*
// @include     http://sharerepo.*/*
// @include     http://*.filebox.*/*
// @include     http://*.putlocker.*/*
// @include     http://*.sockshare.*/*
// @include     http://*.allmyvideos.*/*
// @include     http://*.watchfreeinhd.*/*
// @include     http://www.watchfreeinhd.*/*
// @include     http://*.vodly.to/*
// @include     http://vodly.to/*
// @include     http://vodly.unblocked.co/*
// @include     http://azdrama.sx/*
// @version     3.5
// @author      Hezron Barnabas
// @icon        data:image/png;base64,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
// ==/UserScript==

var appname = window.navigator.userAgent;

//Get Current Location
var get_location = window.location;
var location = get_location.toString();

//OCD CSS 
var ocd_css1 = "div#button_div{opacity:0.85;color:#d8d8d8;!important;text-align:center;line-height:65px;!important;}"; //Text Color & Alignment
if(appname.match(/chrome/i)){
var ocd_css2 = "div#button_div{border-style:solid;border-color:#d8d8d8;border-width:3px;height:70px;width:70px;background:#343333;}";  //Style
}else{
var ocd_css2 = "div#button_div{border-style:dotted;border-color:#d8d8d8;border-width:3px;height:70px;width:70px;background:#343333;}";  //Style
}
var ocd_css3 = "div#button_div{-moz-border-radius:35px;-webkit-border-radius:35px;-khtml-border-radius:35px;border-radius:35px;}";    //Curvature
var ocd_css4 = "div#button_div{font-size:20px;!important;font-family:georgia,sans-serif;!important;}";   //Font Style
var ocd_css5 = "a#ocd_button{display:block;text-decoration:none;color:#d8d8d8;!important;text-align:center;line-height:65px;!important;}"; //Text Color & Alignment
var ocd_css6 = "a#ocd_button:visited{display:block;text-decoration:none;outline:none;!important;color:#d8d8d8;!important;text-align:center;line-height:65px;!important;}";
var ocd_css7 = "a#ocd_button:active{display:block;outline:none;!important;text-decoration:none;!important;color:#bdbdbd;!important;text-align:center;line-height:65px;!important;}";
var ocd_css8 = "a#ocd_button:focus{display:block;outline:none;!important;text-decoration:none;!important;}div.player_hover_ad{display:none;!important;}";

var ocd_css = ocd_css1+ocd_css2+ocd_css3+ocd_css4+ocd_css5+ocd_css6+ocd_css7+ocd_css8;

//Vodly CSS Here
var vodly_css1 = "div#list_title_div{background:white;color:black;text-align:center;opacity:0.8;width:260px;}.col2{display:none;}.index_ratings{display:none;}";
var vodly_css2 = ".movie_info_actions{display:none;}a.download_now_mouseover{display:none;}div#hitchhacker-webtopbar{display:none}div#ZZpage_scrn{display:none;}";
var vodly_css3 = ".warning_message{display:none;}div#list1_div{display:true;}div#list2_div{display:true;text-align:right;}div#ZZlight{display:none;}";
var vodly_css4 = "div#line_div{display:true;width:260px;}a#featured_movie_links{text-decoration:none;color:red;}";
var vodly_css5 = "a#featured_movie_links{text-style:bold;text-decoration:none;color:red;}";

var vodly_css = vodly_css1+vodly_css2+vodly_css3+vodly_css4+vodly_css5;

//The OCD_INJECT to Host List CSS
var vodly_ocd1 = "div#button_div1{opacity:0.85;color:#d8d8d8;!important;text-align:center;line-height:65px;!important;}"; //Text Color & Alignment
var vodly_ocd2 = "div#button_div1{border-style:solid;border-color:#d8d8d8;border-width:2px;height:35px;width:35px;background:#343333;}div#hitchhacker-webtopbar{display:none}";  //Style
var vodly_ocd3 = "div#button_div1{-moz-border-radius:17.5px;-webkit-border-radius:17.5px;-khtml-border-radius:17.5px;border-radius:17.5px;}";    //Curvature
var vodly_ocd4 = "div#button_div1{font-size:10px;!important;font-family:georgia,sans-serif;!important;}";   //Font Style
var vodly_ocd5 = "a#ocd_button1{display:block;text-decoration:none;color:white;!important;text-align:center;line-height:35px;!important;}"; //Text Color & Alignment
var vodly_ocd6 = "a#ocd_button1:visited{display:block;text-decoration:none;outline:none;!important;color:white;!important;text-align:center;line-height:35px;!important;}";
var vodly_ocd7 = "a#ocd_button1:active{display:block;outline:none;!important;text-decoration:none;!important;color:white;!important;text-align:center;line-height:35px;!important;}";
var vodly_ocd8 = "a#ocd_button1:focus{display:block;outline:none;!important;text-decoration:none;!important;}";

var vodly_ocd = vodly_ocd1+vodly_ocd2+vodly_ocd3+vodly_ocd4+vodly_ocd5+vodly_ocd6+vodly_ocd7+vodly_ocd8;


//General OCD Style Injection Here
if(!location.match(/vodly|1channel/)){
var head = document.getElementsByTagName('head')[0];
var ocd_style = document.createElement('style');
ocd_style.type = "text/css";
ocd_style.innerHTML = ocd_css;
head.insertBefore(ocd_style,head.childNodes[1]);   
}


//Append OCD Button Function
var ocd_button = function(innerHTML,left,top) {
        var b = document.getElementsByTagName('body')[0];
        var t = document.createElement('div');
        t.innerHTML = innerHTML;
        t.style.position = 'absolute';
        t.style.left = left;
        t.style.top = top;
        b.appendChild(t);

}

if(location.match(/vodly|1channel/i)){

//Vodle Style Injection Here
var head = document.getElementsByTagName('head')[0];
var ocd_style = document.createElement('style');
ocd_style.type = "text/css";
ocd_style.innerHTML = ocd_css+vodly_css+vodly_ocd;
head.insertBefore(ocd_style,head.childNodes[1]); 


var addDiv = function() {
        var b = document.getElementsByTagName('body')[0];
        var t = document.createElement('div');
        t.innerHTML = '<div id="list_title_div"><hr><b>OCD Servers<b><br></div>';
        t.style.position = 'absolute';
        t.style.left = '870px';
        t.style.top = '77px';
        b.appendChild(t);
}
addDiv();

var addDiv1 = function() {
        var b1 = document.getElementsByTagName('body')[0];
        var t1 = document.createElement('div');
        t1.innerHTML = '<div id="list1_div">Filenuke<br>Nowvideo<br>Vidbux<br>Vidxden<br>Novamov<br>Movshare<br>Daclips<br>Gorillavid<br>Allmyvideos<br>WatchFreeInHD<br><br></div>';
        t1.style.position = 'absolute';
        t1.style.left = '870px';
        t1.style.top = '105px';
        b1.appendChild(t1);
}
addDiv1();

var addDiv2 = function() {
        var b2 = document.getElementsByTagName('body')[0];
        var t2 = document.createElement('div');
        t2.innerHTML = '<div id="list2_div">Vidhog<br>Nosvideo<br>Divxstage<br>Promptfile<br>Sharesix<br>Videoweed<br>Sharerepo<br>Filebox<br>Putlocker<br>Sockshare</div>';
        t2.style.position = 'absolute';
        t2.style.left = '1068px';
        t2.style.top = '105px';
        b2.appendChild(t2);
}
addDiv2();

var addDiv3 = function() {
        var b3 = document.getElementsByTagName('body')[0];
        var t3 = document.createElement('div');
        t3.innerHTML = '<div id="line_div"><br><hr></div>';
        t3.style.position = 'absolute';
        t3.style.left = '870px';
        t3.style.top = '310px';
        b3.appendChild(t3);
}
addDiv3();
/*
var addDiv4 = function() {
        var b4 = document.getElementsByTagName('body')[0];
        var t4 = document.createElement('div');
        t4.innerHTML = '<div id="tutorial" style="width:250px;overflow:auto;"><b><u>Tutorial</b></u> : <br><br>1. Scroll below and click on Version [no.] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;marked with the small OCD logo, after &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;choosing your movie. <br><br>2. Once the server loads, click<br>&nbsp;&nbsp;&nbsp;&nbsp; "continue to video", or whatever necessary.<br><br>3.  Then, you will see the large OCD button<br>&nbsp;&nbsp;&nbsp;&nbsp; on the top left corner of the page.<br><br>4. Left-click on the OCD button to watch the &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;video.<br><br>5. Right-click the OCD button, and click &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;save-link as, to download the video.<br><br>6. If the OCD button cannot be found, <br>&nbsp;&nbsp;&nbsp;&nbsp;the file must have been deleted, or the <br>&nbsp;&nbsp;&nbsp;&nbsp;server is under maintenance. </div>';
        t4.style.position = 'absolute';
        t4.style.left = '870px';
        t4.style.top = '365px';
        b4.appendChild(t4);
}
addDiv4();
*/
var ocd_button_img = function() {
        var b4 = document.getElementsByTagName('body')[0];
        var t4 = document.createElement('div');
        t4.innerHTML = '<div id="button_div" ><a id="ocd_button">OCD</a></div>';
        t4.style.position = 'absolute';
        t4.style.left = '960px';
        t4.style.top = '165px';
        b4.appendChild(t4);

}
ocd_button_img();

var host = document.getElementsByClassName("version_host"); //Get Server Names into array
var total_servers = host.length;


var z = document.createElement("div");
z.innerHTML='<div id="button_div1"><a id="ocd_button1">OCD</a></div>'; 

var div_array = [];
for(var i=0;i<total_servers;i++){
    div_array[i] = document.createElement("div");
    div_array[i].innerHTML = '<div id="button_div1"><a id="ocd_button1">OCD</a></div>'; 
}
if(!appname.match(/chrome/i)){
for(var i=0;i<total_servers;i++){
    if(host[i].innerHTML.match(/filenuke|nowvideo|vidbux|vidxden|novamov/ig)){
        host[i].appendChild(div_array[i]);
    }
    if(host[i].innerHTML.match(/movshare|watchfreeinhd|daclips|gorillavid|allmyvideos/ig)){
        host[i].appendChild(div_array[i]);
    }
    if(host[i].innerHTML.match(/vidhog|nosvideo|divxstage|promptfile|sharesix/ig)){
        host[i].appendChild(div_array[i]);
    }
    if(host[i].innerHTML.match(/videoweed|sharerepo|filebox|putlocker|sockshare/ig)){
        host[i].appendChild(div_array[i]);
    }
}
}else{
for(var i=0;i<total_servers;i++){
if(host[i].innerHTML.match(/filenuke|nowvideo.ws|movshare.me|sockshare.ws|novamov.me|watchfreeinhd|sharesix.net|promptfile/ig)){
        host[i].appendChild(div_array[i]);
    }
}

}

//New Script for Direct Vodly Download

var str = document.documentElement.innerHTML;
var iframe_no = str.match(/iframe/g);

if(iframe_no.length>4){
    var link = str.match(/src="http:\/\/[A-Za-z0-9-.?/]*/g)[7].toString().slice(5);
        if(link.toString().match(/filenuke|nowvideo|vidbux|vidxden|novamov|movshare|daclips|gorillavid|allmyvideos|watchfreeinhd|vidhog|nosvideo|divxstage|promptfile|sharesix|videoweed|sharerepo|filebox|putlocker|sockshare/i)){
    var movie_info_div = document.getElementsByClassName('movie_info')[0];
    var button = document.createElement('div');
    button.innerHTML="<a style=outline:none; href="+link+" target=new><b><font color=red>Server Domain - Click Here To Load OCD</a>";
    movie_info_div.appendChild(button);  
   }
    
}

    
}//End of Vodly Script





//Begin Script for Players With API    
if(location.match(/nowvideo.sx|nowvideo.eu|movshare.net|novamov.eu|divxstage.eu|videoweed.es|novamov.com|nowvideo.ch/i)){

//Get whole source as string
var str = document.documentElement.innerHTML; //make whole file to string

//Get Domain
var domain_matching = /http:\/\/www.nowvideo.sx|http:\/\/www.nowvideo.ch|http:\/\/www.nowvideo.eu|http:\/\/www.movshare.net|http:\/\/www.novamov.com|http:\/\/www.divxstage.eu|http:\/\/www.videoweed.es/i;	//Matching for domain
var domain = str.match(domain_matching);   //assign matched domain to a variable


window.onload=function nowvideo(){
src = document.documentElement.innerHTML;

file="&file="+src.match(/file=[A-Za-z0-9]*/).toString().slice(5);
filekey="&key="+src.match(/filekey=[A-Za-z0-9-.]*/).toString().slice(8);


var api="api/player.api.php?";
xml_link=domain+"/"+api+filekey+file;

GM_xmlhttpRequest({
  method: "GET",
  url: xml_link,
  onload: function(response){
  
    var final = response.responseText;  //Get from Page(2) With the Link
    
    //Begin Parse
    var parser = new DOMParser();
    var doc = parser.parseFromString(final, "text/html");
    
    //Make Doc as string
    var doc_str0 = doc.documentElement.innerHTML; 
    var doc_str = decodeURIComponent(doc_str0);
    var match_link = /url=http:[0-9A-Za-z./]*/i;
    var saved_match_link = doc_str.match(match_link);
    var str_final_link = saved_match_link.toString();
    var link = str_final_link.slice(4);
        
    var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
    var left = '5px';
    var top = '5px';
    
    ocd_button(innerHTML,left,top);
    

    }//End Onload
    
});//End GM_xmlhttpRequest
}
}//End of script for Players with API


//Begin Script for Filenuke

if(location.match(/filenuke/i)){
//document.body.style.background = "black"; //works
var str = document.documentElement.innerHTML; //make whole file to string

//Check Video Type
var vid_type = str.match(/type="application\/x-shockwave-flash"/i);

if(vid_type){
var link_matching = /file=http:\/\/[A-za-z0-9/.=?]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(5);

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'" >OCD</a></div>';
var left = '60px';
var top = '380px';
    
ocd_button(innerHTML,left,top);

}else{
var link_matching = /src="http:\/\/[A-za-z0-9/.]*\/video.[A-Za-z0-9]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(5);

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'"  >OCD</a></div>';
var left = '5px';
var top = '5px';
    
ocd_button(innerHTML,left,top);
}
}//End of Script for Filenuke


//Begin Vidbux Script
if(location.match(/vidbux/i)){

var str = document.documentElement.innerHTML; //make whole file to string

var vid_type = str.match(/"application\/x-shockwave-flash"/i);

if(!vid_type){
var link_matching = /value="http:\/\/[A-Za-z0-9/.:-]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var add_ext=".avi";
var link_noext = str_link.slice(7);
var link = link_noext + add_ext;
}else{
var link_matching = /file=http:\/\/[A-Za-z0-9/.:-]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var add_ext=".avi";
var link_noext = str_link.slice(5);
var link = link_noext + add_ext;
}

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '5px';   
ocd_button(innerHTML,left,top);


}//End Vidbux Script


//Begin Vidxden Script
if(location.match(/vidxden/i)){

var str = document.documentElement.innerHTML; //make whole file to string

var vid_type = str.match(/"application\/x-shockwave-flash"/i);  //Check Video Type

if(!vid_type){
var link_matching = /value="http:\/\/[A-Za-z0-9/.:-]*/ig;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var add_ext=".avi";
var link_noext = str_link.slice(64);
var link = link_noext + add_ext;
}else{
var link_matching = /file=http:\/\/[A-Za-z0-9/.:-]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var add_ext=".avi";
var link_noext = str_link.slice(5);
var link = link_noext + add_ext;
}


var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '5px';   
ocd_button(innerHTML,left,top);
}


//Begin GorillaVid & DaClips Script
if(location.match(/gorillavid|daclips/i)){

var str = document.documentElement.innerHTML; //make whole file to string
var link_matching = /file: "http[A-Za-z0-9-?/.:]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(7);

if(location.match(/gorillavid/i)){

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '5px';   
ocd_button(innerHTML,left,top);

}else{

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '5px';   
ocd_button(innerHTML,left,top);

} 
}//End GorillaVid & DaClips Script


//Begin Vidhog Script
if(location.match(/vidhog/i)){

var str = document.documentElement.innerHTML; //make whole file to string
var link_matching = /location.href = "http\:\/\/[A-Za-z0-9/_.:?-]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(17);

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '5px';   
ocd_button(innerHTML,left,top);

}//End Vidhog Script



//Begin Script for Promptfile

if(location.match(/promptfile/i)){
//document.body.style.background = "black"; //works
var str = document.documentElement.innerHTML; //make whole file to string
var link_matching = /http:\/\/www.promptfile.com\/file\/[0-9A-Za-z/.]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(0);

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '5px';   
ocd_button(innerHTML,left,top);


}//End of Script for Promptfile


//Begin Script for Sharesix

if(location.match(/sharesix/i)){
//document.body.style.background = "black"; //works
var str = document.documentElement.innerHTML; //make whole file to string
var link_matching = /file=http:\/\/[?=0-9A-Za-z/.]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(5);

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '155px';   
ocd_button(innerHTML,left,top);


}//End of Script for Sharesix


//Begin Script for Sharerepo

if(location.match(/sharerepo/i)){
//document.body.style.background = "black"; //works
var str = document.documentElement.innerHTML; //make whole file to string

//Check Video Type
var vid_type = str.match(/type="application\/x-shockwave-flash"/i);

if(vid_type){
var link_matching = /file=http:\/\/[0-9A-Za-z/.]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(5);

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '5px';   
ocd_button(innerHTML,left,top);

}else{

var link_matching = /src="http:\/\/[A-za-z0-9/.]*\/video.[A-Za-z0-9]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(5);

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '5px';   
ocd_button(innerHTML,left,top);
}


}//End of Script for Sharerepo



//Begin NosVideo Script 
if(location.match(/nosvideo/i)){
//document.body.style.background = "black"; //works
var str = document.documentElement.innerHTML; //make whole file to string
var link_matching = /flashvars="playlist=http:\/\/[A-Za-z0-9/.:?-]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var encoded_link = str_link.slice(20);


GM_xmlhttpRequest({
  method: "GET",
  url: encoded_link,
  onload: function(response){
  
    var final = response.responseText;  //Get from Page(2) With the Link
    
    //Begin Parse
    var parser = new DOMParser();
    var doc = parser.parseFromString(final, "text/xml");
    
    //Make Doc as string
    var doc_str = doc.documentElement.innerHTML; 
    var match_link = /<file>http:\/\/[A-Za-z0-9.:/]*/i;
    var saved_match_link = doc_str.match(match_link);
    var str_final_link = saved_match_link.toString();
    var link = str_final_link.slice(6);
    
    var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
    var left = '5px';
    var top = '5px';   
    ocd_button(innerHTML,left,top);
    }
    
});//End GM_xmlhttpRequest

}//End NosVideo Script



//Begin Script for Filebox

if(location.match(/filebox/i)){
//document.body.style.background = "black"; //works
var str = document.documentElement.innerHTML; //make whole file to string
var link_matching = /url: 'http:\/\/[A-Za-z0-9./:?]*/ig;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(64);

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '5px';   
ocd_button(innerHTML,left,top);


}//End of Script for Filebox



//Begin Putlocker & Sockshare Script 
if(location.match(/putlocker|sockshare.com/i)){
if(!location.match(/embed/i)){

var str = document.documentElement.innerHTML; //make whole file to string
var link_matching = /get_file.php\?stream=[A-Za-z0-9:./]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();

if(location.match(/putlocker/i)){var domain = "http://www.putlocker.com/"}
if(location.match(/sockshare/i)){var domain = "http://www.sockshare.com/"}

var encoded_link = domain+str_link;


GM_xmlhttpRequest({
  method: "GET",
  url: encoded_link,
  onload: function(response){
  
    var final = response.responseText;  //Get from Page(2) With the Link
    
    //Begin Parse
    var parser = new DOMParser();
    var doc = parser.parseFromString(final, "text/xml");
    
    //Make Doc as string
    var doc_str = doc.documentElement.innerHTML; 
    var match_link = /url="[A-Za-z0-9/_.?&=:%-;]*/i;
    var saved_matched_link = doc_str.match(match_link);
    var str_final_link = saved_matched_link.toString();
    var link = str_final_link.slice(5);
    
    
    var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
    var left = '5px';
    var top = '5px';   
    ocd_button(innerHTML,left,top);
    }//End Onload
    
});//End GM_xmlhttpRequest
}//Filter by embed
}//End Putlocker & Sockshare.com Script

//Sockshare.ws
if(location.match(/sockshare.ws/i)){

var str = document.documentElement.innerHTML; //make whole file to string
    
var link_matching = /player" href="[A-Za-z0-9.:?=\/]*/i;
var link = str.match(link_matching).toString().slice(14);
    
var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '50px';   
ocd_button(innerHTML,left,top);

}//End of Sockshare.ws

//Putlocker.ws
if(location.match(/putlocker.ws/i)){

var str = document.documentElement.innerHTML; //make whole file to string

var link_matching = /http:\/\/[A-Za-z0-9.:?=%_\/]*/i;
var configs = document.getElementById('player_api');
var str_configs = configs.innerHTML.toString();
var link = str_configs.match(link_matching).toString().replace(/%3d/i,'=');
 
var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '50px';   
ocd_button(innerHTML,left,top);

}//End of Putlocker.ws

//Begin AllMyVideos Script
if(location.match(/allmyvideos/i)){

var str = document.documentElement.innerHTML; //make whole file to string

if(str.match(/as free user/i)){

var addDiv = function() {
        var b = document.getElementsByTagName('body')[0];
        var t = document.createElement('div');
        t.innerHTML = '<div id="allmyvids_div" style="background:black;" ><font color="white"><blink>Click "Continue to Video" For OCD</blink></div>';
        t.style.position = 'absolute';
        t.style.left = '0px';
        t.style.top = '0px';
        b.appendChild(t);

    }

addDiv();


}else{

var link_matching = /file" : "http:\/\/[A-Za-z0-9./:-_]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(9);

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>';
var left = '5px';
var top = '5px';   
ocd_button(innerHTML,left,top);
}
}//End of Script for AllMyVideos


//Begin Script for .me
if(location.match(/novamov.me|movshare.me|nowvideo.ws|sharesix.net/i)){

var str = document.documentElement.innerHTML; //make whole file to string
var link_matching = /file: "[?=A-Za-z0-9./:-_]*/i;
var save_link = str.match(link_matching);
var str_link = save_link.toString();
var link = str_link.slice(7);

var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>'
var left = '5px';
var top = '40px';

ocd_button(innerHTML,left,top);
}


//Begin Script for watchfreeinHD
if(location.match(/watchfreeinhd/i)){

var str = document.documentElement.innerHTML; //make whole file to string
    
var filename_matching = str.match(/fileName  = "&key=[a-zA-z0-9]*/i).toString().slice(18);
var url_matching = str.match(/movieURL = "[A-Za-z0-9:\/.]*/i).toString().slice(12);
var link = url_matching+'?key='+filename_matching;

if(link.match(/streams/i)){  
var innerHTML = '<div id="button_div" ><a id="ocd_button" href="'+link+'">OCD</a></div>'
var left = '5px';
var top = '38px';

ocd_button(innerHTML,left,top);
}
}
    

var ocd_complete = true;























