// ==UserScript==
// @name           MultiPorn
// @namespace      FoShizzle
// @description    show multiple porn vids on a single page
// @version 1.0.2
// @include        http://pornhub.com/*
// @include        http://*.pornhub.com/*
// ==/UserScript==

//MAXIMUM NUMBER OF PORN VIDEOS ON A SINGLE PAGE
var maxPornWins = 3;  

//DO NOT EDIT BELOW THIS LINE!
//porn win calculations w/h = 1.28
var h = (screen.availWidth-(10+maxPornWins*10))/(maxPornWins*1.28) + 40	

window.addEventListener(
    "load", 
	function(){
		for(i=0;i<document.links.length;i++){
			if((document.links[i].href).search(/view_video/)>0){
				document.links[i].addEventListener('click', getVideo, false);}}	
			
		document.getElementsByTagName("body")[0].style.background = "black";
		document.getElementsByTagName("body")[0].style.margin = "35px 0 0 0"; 
		
		createInfoBar();
		
		//init slots
		for(var i=0;i<maxPornWins;i++){new slot(i,maxPornWins);}},
	false);

function createInfoBar(){
	//create info bar
	var MPInfoBar = document.createElement("div");
	MPInfoBar.innerHTML = "<p style='position:absolute;top:10px;left:10px;color:red;'>MultiPorn userscript active. <a href='http://userscripts.org/scripts/show/69347'>Check here for updates</a></p>";
	document.body.insertBefore(MPInfoBar, document.body.firstChild);}
	
function getVideo(ev){
	if(ev.target.tagName=="IMG" && ev.target.parentNode.tagName=="A") url = ev.target.parentNode; // image click
	else url = ev.target;		//text link click
	ev.preventDefault();
	GM_xmlhttpRequest({
		method: 'GET',
        url: url,
        onload: parsePornhub});}
	
function parsePornhub(responseDetails){
    var mt = null, fpcode = null, swfobj = null;
    if(responseDetails.status==200){
        if(responseDetails.responseText){
            mt = responseDetails.responseText.match(/title>(.*?)<\//i);
            fpcode = captureSWFObj(responseDetails.responseText, /new\s*SWFObject/);}}
	addVideo(fpcode);}

function captureSWFObj(html,test){
    var rfp = new RegExp("<script.*?>((?:.*?[\r\n]*?)*?)<\/script>", "g");
    var fpcode = null;
    while((fpcode=rfp.exec(html))!=null){
        var newobj = fpcode[1].match(test);
        if(newobj)
            return fpcode[1];}}
			
function addVideo(fpcode){
	if(countPornWins()<maxPornWins){	
		for(var i=0;i<slot.instances.length;i++){
			//find first free slot then break
			if(slot.instances[i].occupied == false){
				//create new div
				var player = document.createElement("div");
				player.id = "pornContainer"+i; 
				//fill new div with player div
				player.innerHTML += "<div id='player"+i+"' style='margin:0;padding:0;position:absolute;top:"+slot.instances[i].ypos+"px;left:"+slot.instances[i].xpos+"px;z-index:1000;'/></div><p style='margin:0;position:absolute;top:"+(slot.instances[i].ypos+slot.instances[i].height+10)+"px;left:"+slot.instances[i].xpos+"px;width:"+slot.instances[i].width+"px;z-index:1000;text-align:center;margin:0;cursor:pointer;'/>[ close ]</p>";
				//add event listener to close vid
				player.childNodes[1].addEventListener("click",removeElement,false);
				//insert alternated swfObject
				jsnode = document.createElement("script");
				fpcode = fpcode.replace(/"608", "481"/g, "'"+slot.instances[i].width+"', '"+slot.instances[i].height+"'");
				fpcode = fpcode.replace(/\.write\(.*?\);/,".write('player"+i+"');");
				jsnode.appendChild(document.createTextNode(fpcode)); 
				player.appendChild(jsnode); 
				document.body.insertBefore(player,document.body.firstChild);
				//set slot to occpupied
				slot.instances[i].occupied = true;
				//top bar height control
				document.getElementsByTagName("body")[0].style.margin = h+"px 0 0 0";
				break;}}}

	else{alert("video limit reached");}}

function removeElement(ev){
	//extract slot number
	var x=(ev.target.parentNode.id).substr(ev.target.parentNode.id.length-1);
	//free slot
	slot.instances[x].occupied = false;
	//delete element
	var node = document.getElementById(ev.target.parentNode.id);
	if(typeof node == 'object'){ 
		node.parentNode.removeChild(node);}
	//top bar height control
	if(countPornWins() == 0) document.getElementsByTagName("body")[0].style.margin = "35px 0 0 0";}
		
function slot(nb,max){								//slotNumber, MaxSlots
    if (!slot.instances) slot.instances=[this];		//create first instance
	else slot.instances.push(this);					//push new instance
	
	this.occupied = false;
	this.height = (screen.availWidth-(10+max*10))/(max*1.28)-5;
	this.width = this.height * 1.28;
	this.xpos = (10+nb*(this.width+10));
	this.ypos = 10;}

function countPornWins(){
	var x = 0;
	for(var i=0;i<slot.instances.length;i++){
		if(slot.instances[i].occupied == true) x++;}
	//returns number of occupied slots
	return x;}