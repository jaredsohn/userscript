// ==UserScript==
// @name GoEar HotLink 2012
// @author laurenceHR
// @include *goear.com/listen/*/*
// @version 1.0
// @description  HotLink Goear 2012
// ==/UserScript==

// Script by laurenceHR - www.laurence.daxes.tk

//Get data to operate

// console.log('################## HOT LINK GOEAR 2012 ######################');

////// Get ID Song
var url = document.URL;
var urls = url.split('/');
var id = urls[4];
//////

////// Read XML
if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
}else{// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.open("GET","http://www.goear.com/externaltrackhost.php?f=" + id,false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;
///////

/////// Get HotLink
var song = xmlDoc.getElementsByTagName('song')[0];
var hotlink = song.getAttribute('path');
///////

////// Add HotLink
addHotLink(hotlink);
//////


/******  Function For Add Input *****/
function addHotLink(link){
    var style = document.createElement('style');
    var css = "#hot_link input {height: 19px;width: 552px;padding: 2px;font-size: 87.5%;}" + "\n" + 
              "#hot_link label {display: block;margin-bottom: 5px;font-size: 87.5%;}" + "\n" +
              "#hot_link {margin: 0 10px;padding: 10px 0;border-top: #CCC dashed 1px;}";
        style.textContent= css;
    
    var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
        
    var opt = document.getElementById('opt_share');
    
    var label = document.createElement('label');
        //label.for = "hotlink_song";
        label.textContent = "Hot Link (Save Link As...)";
    
    var a = document.createElement('a');
        a.href = link;
        a.appendChild(label);
    
    var input = document.createElement('input');
    var styleInput = "height: 19px;width: 552px;padding: 2px;font-size: 87.5%;";
        input.type = "text";
        input.id = "hotlink_song";
        input.name = "hotlink_song";
        input.className = "radius_3";
        input.value = link;
        input.style = styleInput;
    
    var fieldset= document.createElement('fieldset');
        fieldset.appendChild(a);
        fieldset.appendChild(input);
    
    var form = document.createElement('form');
    var styleForm = "margin: 0 10px;padding: 10px 0;border-top:#CCC dashed 1px;";
    
        form.id = "hot_link";
        form.appendChild(fieldset);
        form.style = styleForm;
    
    opt.appendChild(form);
}