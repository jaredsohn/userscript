// ==UserScript==
// @name       rs28083s troop count
// @namespace  http://grepattcalc.tk/
// @version    0.6
// @description  rs28083's troop count
// @match      http://us11.grepolis.com/*
// @copyright  2012+, rs28083
// ==/UserScript==

jQuery(document).keyup(function(e){
    
    var enterPress = returnEnterPress(e);
    
    if(enterPress){
        pageBBcode();
    }
});

function returnEnterPress(e){
    var keynum; 
    
    
    if(window.event) 
    {keynum = e.keyCode;}

    else if(e.which) 
    {keynum = e.which;}

    else{ 
        alert('nothing found');
        keynum = 0;
    }

   
    if(keynum == 192){
        return true;
    }
    else{ 
        return false;
    }
}

window.onload=function(){
    a();
};
function a(){
    
    var newdiv = document.createElement('div');
    
    var divID = "update";
    
    newdiv.setAttribute('id',divID);
    
    var btn=document.createElement("BUTTON");
    var t=document.createTextNode("update TC");
    btn.appendChild(t);
    btn.addEventListener ("click", function() {formSet();}, false);
    
    newdiv.appendChild(btn);
    document.getElementById('top_bar').appendChild(newdiv);
    
    
    
}
function getCityGod(){
    var markup2 = document.getElementById('god_mini').outerHTML;
    markup2 = markup2.replace(/</g, "");
    markup2 = markup2.replace(/>/g, "");
    markup2 = markup2.replace("div id=\"god_mini\" class=\"god_mini ","");
    markup2 = markup2.replace("\" style=\"display: block;\"/div","");
    markup2 = markup2.replace('div style="display: block;" id="god_mini" class="god_mini ','');
    markup2 = markup2.replace('"/div','');
    return markup2;
}
function getPlayerName(){
    var headContent = document.getElementsByTagName('head')[0].innerHTML;
    var PNI = headContent.indexOf("player_name");
    var PHC = headContent.substring(PNI,PNI+30);
    PHC = PHC.replace(",","");
    var ENDC = PHC.indexOf(",");
    var name = PHC.substring(30,ENDC);
    name = name.replace("player_name","").replace("player","").replace(":","").replace(/\"/g, "-").replace(/,/g,"-").replace(/-/g,"").replace("**","__").replace("*","_");
    return name;
    
}
function getCityName(){
    return document.getElementById("town_name_link").innerHTML;
}
function formSet(){
    
    var markup = document.getElementById('units_sidebar').innerHTML;
    
    markup = markup.replace(/</g, "");
    markup = markup.replace(/>/g, "");
    
    var f = document.createElement("form");
    f.setAttribute('method',"get");
    f.setAttribute('action',"http://grepattcalc.tk/request.aspx");
    
    var i = document.createElement("input"); 
    i.setAttribute('type',"hidden");
    i.setAttribute('name',"TCT");
    i.setAttribute('value',markup);
    
    var i2 = document.createElement("input"); 
    i2.setAttribute('type',"hidden");
    i2.setAttribute('name',"cname");
    i2.setAttribute('value',getCityName());
    
    var i3 = document.createElement("input"); 
    i3.setAttribute('type',"hidden");
    i3.setAttribute('name',"cgod");
    i3.setAttribute('value',getCityGod());
    
    var s = document.createElement("input"); 
    s.setAttribute('type',"submit");
    s.setAttribute('value',"Submit");
    
    f.appendChild(i);
    f.appendChild(i2);
    f.appendChild(i3);
    f.appendChild(s);
    
    document.getElementById('top_bar').appendChild(f);
}
function pageBBcode(){

    var markup = document.getElementById('forum').innerHTML;

    if(markup.indexOf('[page]') !== -1){
        var ps = markup.indexOf("[page]");

    var pe = markup.indexOf("[/page]");

    var page = markup.substring(ps+"[page]".length,pe);
        
    var url = "http://grepattcalc.tk/" + page;
    var iframe = document.createElement('iframe');
    iframe.src = url;
        iframe.width="700px";
        var count = 0;
         if(markup.indexOf('gtcr') !== -1){
             
             while(markup.indexOf('gtcr'+count) !== -1){
                 count=count+1;
             }
         }
        markup=markup.replace("[page]"+page+"[/page]","<div id='gtcr"+count+"'></div>");
    document.getElementById('forum').innerHTML = markup; 
    document.getElementById('gtcr'+count).appendChild(iframe);
    }   
}