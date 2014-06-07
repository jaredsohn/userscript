// ==UserScript==
// @name          Cskinner
// @namespace     http://blog.thedt.net/cskinner
// @description	  Css skinner by dt
// @include       *
// ==/UserScript==
//darktempler@gmail.com
//compleatly rewritten to be better and now uses the GM data stuff 


//register the gm menu "Skinner" and to call edit_css when its called
GM_registerMenuCommand("Skinner(url)", editcss_u);
GM_registerMenuCommand("Skinner(domain)",editcss_d);


//Load the custom css
get_css();  



//This function retrives external stylesheets from the current document then gives the url of them to fetch_externalcss()
function add_externalcss(){
var e = document.getElementsByTagName("link");
var href , src,rel,type;
//get all the inline css
for(var i=0;i<e.length;i++){
href = e[i].getAttribute('href');
src = e[i].getAttribute('src');
rel = e[i].getAttribute('rel');
type = e[i].getAttribute('type');

if(rel.toLowerCase()=='stylesheet'){ //make sure the link tag is a style sheet

if(isset(e[i].getAttribute('href'))){
fetch_externalcss(href);
continue;
}
else if(isset(e[i].getAttribute('src'))){
fetch_externalcss(src);
continue;
}
}
}
}

//this function adds text to the main css edit textbox
function add_tocont(css){
document.dtskin.dtskinstyles.value += css;

}


//this function decides what xmlhttprequest to use nonrelitive GM_xmlhttpRequest or the normal xmlhttpRequest then retrives the external style sheet and adds it to the main css edit box
function fetch_externalcss(page){
var css;


if(page.substr(0,7)=='http://'){
//page is external

GM_xmlhttpRequest({
  method:"GET",
  url:page,
  onload:function(details) {

  if(details.readyState=='4'){
    //details.readyState
	css = details.responseText;
	add_tocont('/*'+page+'*/\n' + css);
  }
  }
});


}else{
//page is internal

var xmlhttp = new XMLHttpRequest();
var a;
 xmlhttp.open("GET", page,true);
 xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4) {
   css = xmlhttp.responseText;
  add_tocont('/* Stylesheet '+page+" */\n" + css);
  }
 }
 xmlhttp.send(null);

}
}




//retirves all inline css and adds it to the main css edit box
function add_inlinecss(){
var allstyles = document.getElementsByTagName("style");
var css='';

//get all the inline css
for(var i=0;i<allstyles.length;i++){
css += allstyles[i].innerHTML;
}

add_tocont(css);
}



//edit css for domain
function editcss_d(){
editcss(2);
}
//edit css for url
function editcss_u(){
editcss(1);
}		


//greasemonkey data storage and yea :P
function get_data(name) {
return GM_getValue('skin_'+name);
}

function write_data(name,value){
return GM_setValue('skin_'+name, value);
}


//save css for domain or the page 
function savecss_domain(css){
var d = window.location.host;
write_data(d,css);
}

function savecss_page(){
var d = window.location.href;
write_data(d,css);
}


//get the css data if domain and page has css , the page css will be loaded.
function get_css(){
var domain = window.location.host;
var url = window.location.href;

var data_u = get_data(url);

if(isset(data_u)){
applycss(data_u);
return;
}

var data_d = get_data(domain);

if(isset(data_d)){  //if page isnt set load domain css
applycss(data_d);
return;
}

return;
}




//apply the css to the webpage
function applycss(css){
head = window.document.getElementsByTagName("head")[0];
script = window.document.createElement("style");
script.setAttribute("type", 'text/css');
script.setAttribute("id", 'dtskincsscontainer');
script.innerHTML = css;
head.appendChild(script);
}



//a function which acts like php's isset() :D 
function isset(vari){
if(typeof(vari)=='undefined'){
return false;
}
return true;
}


//creates / reuses the cssedit layer which open from the tools menu and sets all the event listeners for the buttons
function editcss(type){
var domain = window.location.host;
var url = window.location.href;
var data_u = get_data(url);
var data_d = get_data(domain);
if(!isset(data_u)){data_u='';}
if(!isset(data_d)){data_d='';}
if(type==1){ //type 1 = user wants page css
var title = "Editing css for url " + url;
var data = data_u;
}else{
var title = "Editing css for domain " + domain; 
var data = data_d;
}




//the edit css data layer

var topmenu =
'<div id="dtfloatskin" style="float:left;padding: 3px;width:93%">' + title+'</div>'+
'<span id="dtskinhidebutton" style="float:right;padding: 3px;cursor:pointer;"> X </span>'+
'<span id="dtfloatminimize" style="float:right;padding: 3px;cursor:pointer;"> _ </span>'
;



var htmldata = topmenu +
'<div id="dtskinbottom"><form name="dtskin"><textarea style="width:99%;height:100%" name="dtskinstyles" rows=15 cols=80>'+data+'</textarea><br>'+
'<input type="button" value="Save" id="dtskinsavebutton">'+
'<input type="button" value="Clear" id="dtskinreloadbutton"/>'+
'<input type="button" value="Test" id="dtskintestbutton">'+
'<input type="button" value="Add inline" id="dtskinaddinlinebutton">'+
'<input type="button" value="Add external" id="dtskinaddexternalbutton">'+
'<span id="dtskinstatus" style="float:right"></span></form></div>';

var style = 'position:fixed;z-index: 99;left:5px;top:9px;width:17.6cm;-moz-border-radius: 7px; background: #fad163;padding: 3px;';

var cssbox = document.getElementById("dteditcss");


try{
cssbox.style.display = "block";
cssbox.innerHTML = htmldata;
}

catch(e){
body = window.document.getElementsByTagName("body")[0];
script = window.document.createElement("div");
script.setAttribute("id", 'dteditcss');
script.setAttribute("style", style);
script.innerHTML = htmldata;
body.appendChild(script);
}

//activate the dragging stuff for the cssediting window
int_drag('dtfloatskin','dteditcss');

//add events to the buttons
var save = document.getElementById("dtskinsavebutton");
var test = document.getElementById("dtskintestbutton");
var reload = document.getElementById("dtskinreloadbutton");
var hide = document.getElementById("dtskinhidebutton");
var addinline = document.getElementById("dtskinaddinlinebutton");
var addexternal = document.getElementById("dtskinaddexternalbutton");
var clear = document.getElementById("dtskinaddclearbutton");
var minimize = document.getElementById("dtfloatminimize");


if(type==1){
save.addEventListener('click' , form_url_save, true);
}else{
save.addEventListener('click' , form_domain_save, true);
}

//have to use mousedown because there semi links not buttons 
minimize .addEventListener('mousedown' , form_min_max, true); //also controls maximazing the window back to normal size
hide.addEventListener('mousedown' , form_hide, true);


test.addEventListener('click' , form_test, true);
addinline.addEventListener('click' , add_inlinecss, true);
addexternal.addEventListener('click' , add_externalcss, true);
reload.addEventListener('click' , form_clear, true);
}


//clears the form
function form_clear(){
document.dtskin.dtskinstyles.value ='';
}

//mimimizes the editbox into a little titlebar
function form_min_max(){
bottom = document.getElementById("dtskinbottom");
button = document.getElementById("dtfloatminimize");
if(bottom.style.display == "none"){
button.innerHTML = " _ ";
bottom.style.display = "block";
}else{
button.innerHTML = " [] ";
bottom.style.display = "none";
}


}

//hides the form
function form_hide(){
var form = document.getElementById("dteditcss");
form.style.display = "none";
}


//retrives css from css edit textbox then saves for domain
function form_domain_save(){
var domain = window.location.host;
var status = document.getElementById('dtskinstatus');
write_data(domain , document.dtskin.dtskinstyles.value);
status.innerHTML = "Saved";
}

//retrives css from css edit textbox then saves for url
function form_url_save(){
var url = window.location.href;
var status = document.getElementById('dtskinstatus');
write_data(url , document.dtskin.dtskinstyles.value);
status.innerHTML = "Saved";
}

//tests the current css
function form_test(){
var cssc = document.getElementById("dtskincsscontainer");
var status = document.getElementById('dtskinstatus');
var css = document.dtskin.dtskinstyles.value;

try{

cssc.innerHTML = css;
}

catch(e)
{
//used for testing css if cannot get the usal cssbox
head = window.document.getElementsByTagName("head")[0];
script = window.document.createElement("style");
script.setAttribute("type", 'text/css');
script.setAttribute("id", 'dtskincsscontainer');
script.innerHTML = css;
head.appendChild(script);
}
status.innerHTML = 'Applied';
}


//----------------------------------------------------------------
// FLOATable layer thing by me (-dt-) :D 
// this floating layer thing uses event listeners so it dosnt mess up anything on the page (hopefully)
//----------------------------------------------------------------

var ismoving= false;
var inside = true;

//start the event listeners
function int_drag(layerd,layerc){ //layerd = dragable layer ID , layerc is the container to move
layer = document.getElementById(layerd); 
layer.style.cursor = "move";
layer.addEventListener('mousedown', function(e){move_drag(e,layerd,layerc);} ,false);
}


//stop the drag and remove the event listener
function stop_drag(e){
ismoving=false;

try{
document.removeEventListener('mousemove',drag_moving,false);
document.removeEventListener('mouseup', stop_drag ,false);
}
catch(e){ //error but blah cbf putting in error checking :P}

}
}


//move the layer
function drag_moving(e){
var left = e.pageX-dx;
var top = e.pageY-dy;
layercont.style.left=left+"px";
layercont.style.top=top+'px';

}


//prepare for moving the layer
function move_drag(e,layerd,layerc){
firstmove = true;
ismoving = true;
layercont = document.getElementById(layerc); 
top = layercont.style.top;
top = top.substr(0,top.length-2);
left = layercont.style.left;
left = top.substr(0,left.length-2);

dx= e.pageX - top;
dy= e.pageY - left;

try{
document.addEventListener('mousemove',drag_moving,false);
document.addEventListener('mouseup', stop_drag ,false);
}

catch(e){ //error but blah cbf putting in error checking :P
}
}