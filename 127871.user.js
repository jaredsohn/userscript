// ==UserScript==
// @name           GoStefen Clicker
// @namespace      GoStefen Clicker
// @description    Para clicar online
// @include        http*://www.facebook.com/groups/146002408845675/*
// @require        http://code.jquery.com/jquery-latest.js
// @noframes          
// @author         GoStefen
// @version        0002
// @license        
// ==/UserScript==

var gridContainer = document.getElementById('contentArea'); 
if(gridContainer!=null)
{
    var newDiv = document.createElement('div'); 
    newDiv.setAttribute('id','divQuote'); 
    newDiv.style.fontFamily = 'Arial,sans-serif'; 
    newDiv.style.paddingTop = '7px'; 
    newDiv.color = '#555555'; 
    gridContainer.insertBefore(newDiv, gridContainer.firstChild); 
    
    var divResult = document.createElement('div'); 
    divResult.setAttribute('id','divResult'); 
    divResult.style.fontFamily = 'Arial,sans-serif'; 
    divResult.style.fontSize = '0.8em'; 
    divResult.color = '#555555'; 
    divResult.style.border = '1px solid #000';     
    divResult.style.width = '100%';     
    divResult.style.height = '50px';     
    divResult.style.overflow= 'auto';
    
    newDiv.appendChild(divResult);
    
    var btnGo = document.createElement("input");
    btnGo.type           = "button";
    btnGo.id             = "btnGo";
    btnGo.style.width    = "100px";
    btnGo.value          = "GO";
    newDiv.appendChild(btnGo);
    
    btnGo.addEventListener('click', function(){nextLink()});
}

var urls=new Array();
var i=0;
var index=-1;
var t;
var divResult = document.getElementById('divResult'); 
var myWindow;

divResult.innerHTML ="Application Started";

function OpenPage(){
    index++;
    myWindow.close();
    if(index<=i)
    {
        divResult.innerHTML += "Processing... "+index+": "+urls[index]+"<br />";
        myWindow = window.open(urls[index],"_blank","",true);
        window.focus();
    }
    else
    {
        myWindow.close();
        clearInterval(t);
        divResult.innerHTML +="END!!!";
    }
}

function nextLink(){
    i=0;
    index=0;
    divResult.innerHTML ="Start..."+"<br />";
    $(document).ready(function(){
        $("a[href*='hidden-chronicles']:not(:visited)").each(function(){
            urls[i] = $(this).attr('href');
            i++;
        });
    });
    myWindow = window.open(urls[index],"_blank","",true);
    //OpenPage();
    t=setInterval(function() { OpenPage(); }, 10000);
}
