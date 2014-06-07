// ==UserScript==
// @name       QAB
// @namespace  https://www.quora.com
// @version    0.1
// @description  enter something useful
// @match      *://*.quora.com/*
// @copyright  2012+, You
// ==/UserScript==

window.count = 0;
window.pageNum = 1;
window.contentLen = 0;
window.totalAnswers = parseInt((document.getElementsByClassName("answer_header_text")[0].firstChild.firstChild.nodeValue));
boxPerPage = 10;

if(window.totalAnswers <= boxPerPage)
  boxPerPage = window.totalAnswers;   



var boxButton = document.createElement("button");
boxButton.style.position = "fixed";
boxButton.style.zIndex = "300";
boxButton.style.top = "15px";
boxButton.style.right= "20px";
boxButton.style.width = "80px";
boxButton.style.height = "35px";
boxButton.style.backgroundColor = "#505050";
boxButton.style.fontSize = "1.4em";
boxButton.style.textAlign = "center";
boxButton.style.color = "#f0f0f0";
boxButton.style.padding = "2px";
boxButton.style.margin = "2px";
boxButton.addEventListener("click", container_);

var miniButton = document.createElement("button");
miniButton.style.position = "fixed";
miniButton.style.zIndex = "300";
miniButton.style.top = "15px";
miniButton.style.right= "100px";
miniButton.style.width = "40px";
miniButton.style.height = "35px";
miniButton.style.backgroundColor = "#505050";
miniButton.style.fontSize = "2.2em";
miniButton.style.textAlign = "center";
miniButton.style.color = "#f0f0f0";
miniButton.style.padding = "1px";
miniButton.style.margin = "2px";
miniButton.addEventListener("click", minimize_);

text = document.createTextNode("boxify");
boxButton.appendChild(text);
document.body.appendChild(boxButton);


text = document.createTextNode("-");
miniButton.appendChild(text);
document.body.appendChild(miniButton);



function container_()
{
if(document.getElementById("boxifyContainer"))
  minimize_();

var container = document.createElement("div");
container.style.display = "inline-block"; 
container.setAttribute("id", "boxifyContainer");  
container.style.overflow = "scroll";       
container.style.position = "fixed";
container.style.zIndex = "300";
container.style.top = "40px";
container.style.left = "2px";
container.style.width = "100%";
container.style.height = "90%";
container.style.backgroundColor = "#505050";
container.style.padding = "20px";
container.style.margin = "10px";
document.body.appendChild(container);

var nextButton = document.createElement("button");
nextButton.style.position = "absolute";
nextButton.style.zIndex = "300";
nextButton.style.top = "15px";
nextButton.style.right = "52%";
nextButton.style.width = "45px";
nextButton.style.height = "30px";
nextButton.style.backgroundColor = "#f0f0f0";
nextButton.style.fontSize = "1.3em";
nextButton.style.textAlign = "center";
nextButton.style.color = "#208060";
nextButton.style.padding = "2px";
nextButton.style.margin = "2px";
nextButton.style.display = "block";    
nextButton.addEventListener("click", nextBoxSet);    

text = document.createTextNode("next");
nextButton.appendChild(text);    
container.appendChild(nextButton);
    
boxify_();    
    
}  


function boxify_()
{
var container = document.getElementById("boxifyContainer");        
var content = document.getElementsByClassName("answer_text_wrapper");


	    
var contentHTML,i;
var contentBoxId = "contentBoxId";
window.contentLen = content.length;
    

    
 /***if(window.pageNum != 1)
    for(i=0;i<10;i++)
    {
    document.getElementById(contentBoxId +i).style.display = "none";
    
    } ***/
    
 
    
if( window.contentLen < boxPerPage * window.pageNum && window.contentLen < window.totalAnswers ) 
{   
          
    
    window.scrollBy(0,5000);
    //alert(window.contentLen);
    showProgBar(((window.pageNum * boxPerPage) - window.contentLen )/boxPerPage);
    setTimeout(boxify_,1000);
    return; 
    
} 

if(node = document.getElementById("tempPBar"))
    node.parentNode.removeChild(node);    
    
       
var i = (window.pageNum - 1)*boxPerPage;   
for(i;i<(window.pageNum * boxPerPage);i++)
		{
      	var contentBox = document.createElement("div");   
        contentBox.setAttribute("id", contentBoxId + i);    
        contentBox.style.position = "relative";
        contentBox.style.top = "20px"; 
        contentBox.style.opacity = "1";    
        contentBox.style.display = "inline-block";    
      	contentBox.style.zIndex = "300";
		contentBox.style.width = "43%";
		contentBox.style.height = "70%";
		contentBox.style.backgroundColor = "#f0f0f0";
        contentBox.style.overflow = "scroll";    
		contentBox.style.padding = "10px";
		contentBox.style.margin = "2%"; 
        contentBox.innerHTML = content[i].innerHTML;  
       	container.appendChild(contentBox);  
   		 }    
	    
    

}




function nextBoxSet()
{
 
 if(Math.ceil(window.totalAnswers/boxPerPage) == window.pageNum)
    {alert("EOP");return;}
 window.pageNum++;   
 alert(window.pageNum);
 node = document.getElementById("boxifyContainer");
 node.parentNode.removeChild(node);   
 container_(); 
}

function minimize_()
{
  
 node = document.getElementById("boxifyContainer");
 node.parentNode.removeChild(node);   
  
}  

function showProgBar(tempRatio)
{

    if(!(tempProgBar = document.getElementById("tempPBar")))
     {
	tempProgBar = document.createElement("div");
	tempProgBar.setAttribute("id", "tempPBar");    
	tempProgBar.style.position = "relative";
	tempProgBar.style.top = "40%";
	tempProgBar.style.left = "40%";
	tempProgBar.style.width = "300px";
	tempProgBar.style.height = "20px";
	tempProgBar.style.border = "4px solid #a0c0a0";
	tempProgBar.style.borderRadius = "10px"; 
     
    progBar = document.createElement("div");
	progBar.setAttribute("id", "pBar_");    
	progBar.style.position = "relative";
	progBar.style.width = "0px";
	progBar.style.height = "15px";
	progBar.style.margin = "2px";
	progBar.style.backgroundColor = "#00c0a0";   
    tempProgBar.appendChild(progBar);
    document.getElementById("boxifyContainer").appendChild(tempProgBar);    
	}
 
    
    document.getElementById("pBar_").style.width = (1 - tempRatio )* 300 + "px";
}
