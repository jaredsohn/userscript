var menu=0;
    function cat(json){ //get categories of blog & sort them
       



 var mainentry = json.feed.title.$t; 
document.getElementById("css3menu1").innerHTML+="<li class='topmenu' ><a href='#' title='"+mainentry+"' style='height:25px;line-height:25px;'><span><img src='images/smoke-brown/file2.png' alt=''>"+mainentry+"</span></a><ul id='topmenu"+menu+"'></ul></li>";


        for (i=0; i<json.feed.entry.length; i++){

          for (i=0; i<json.feed.category.length && i<22; i++){
  
 
document.getElementById("topmenu"+menu).innerHTML+="<li id='ssmm"+menu+i+"'><a href='#' title='Installation'><span><img src='images/smoke-brown/wrench.png' alt=''>"+json.feed.category[i].term+"</span></a><ul id='submenu"+menu+i+"'></ul></li>";
   
        for (s=0; s<json.feed.entry.length; s++){
  var ff="#ssmm"+menu+i;
  if(json.feed.entry[s].category==undefined || 0 === json.feed.entry[s].title.$t.length){
  $(ff).css({"color":"red","border":"2px solid red","display":"none"});
  }
  
  
  else{ for (ct=0; ct<json.feed.entry[s].category.length; ct++){
  
  if(json.feed.entry[s].category[ct].term==json.feed.category[i].term)
  {
  $(ff).css({"color":"red","border":"2px solid green","display":"block"});
  document.getElementById("submenu"+menu+i).innerHTML+="<li><a href='#' title='Description of files'><img src='images/smoke-brown/file.png' alt=''>"+json.feed.entry[s].title.$t+"</a></li>";
  
  
  
  }
   
  }
  
  
  }

 
 
 
  }
   }
document.getElementById("topmenu"+menu).innerHTML+="<li><a href='#' title='Parameters info'><img src='images/smoke-brown/pencil.png' alt=''>Parameters info</a></li>"


}menu++;
 
        var rt="kk";  //use any sort if you need that 
    
 
 
  //get categories of blog & sort them json.feed.entry.length
    
        for (i=0; i<11; i++){
         






 var entry = json.feed.entry[i]; 
var title = entry.title.$t;
if(entry.summary==undefined){

var summa = entry.content.$t;
}else{
var summa = entry.summary.$t;}


var img="http://www.lovevedicastrology.com/images/astrology.jpg";
if(entry.media$thumbnail==undefined)
{var img="http://www.lovevedicastrology.com/images/astrology.jpg";}
else
{var img=entry.media$thumbnail.url;}


var linkk="www.orkut.com";

for (r=0; r<entry.link.length; r++)
{
if(entry.link[r].rel=="alternate")
{var linkk=entry.link[r].href;}


}

var slident ="<li class='opo'><div  class='ki'>uyuyuy<dd><a href='#'>more</a></dd></div><div  class='uyy'><ul class='yty'><li><img src='" +img+ "' height='91' width='111'></li><li>"+title+"</li></ul></div><div  class='uui'>"+summa+"</div></li>";




document.getElementById("cfcf").innerHTML+=slident;






        }
		
		 for (i=11; i<22; i++){
         






 var entry = json.feed.entry[i]; 
var title = entry.title.$t;
if(entry.summary==undefined){

var summa = entry.content.$t;
}else{
var summa = entry.summary.$t;}


var img="http://www.lovevedicastrology.com/images/astrology.jpg";
if(entry.media$thumbnail==undefined)
{var img="http://www.lovevedicastrology.com/images/astrology.jpg";}
else
{var img=entry.media$thumbnail.url;}


var linkk="www.orkut.com";

for (r=0; r<entry.link.length; r++)
{
if(entry.link[r].rel=="alternate")
{var linkk=entry.link[r].href;}


}





// ==UserScript==
// @name  Xbox 360 Emulator Madden [76123]  
// @include 
// @description  Xbox 360 Emulator Madden [76123]  

// @version 2.1

testinggg
// ==/UserScript==





var cocontnt ="<li ><div class='flipoo'><span><img src='" +img+ "'  /></span><span><a href='"+linkk+"'  class='tnt'>"+title+"</a></span></div><div id='condnnt' class='paa'> "+summa+"<div>More</div></div></li>";




document.getElementById("con").innerHTML+=cocontnt;


        }
		
        var rt="kk";  //use any sort if you need that 
    
 }
