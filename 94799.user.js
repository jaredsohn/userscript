// ==UserScript==
// @name           Facebook OfflineChatPlus
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @version        1.0.5
// @author         Giuseppe Maria D'Elia
// @description	   This script enables the chat window for all the friends offline directly from their profile (useful to review the previous conversations)
// ==/UserScript==
//

function getID(){
try{
    /*var arrayInput = document.getElementsByTagName('input');
    
    for(i = 0 ; i<arrayInput.length;i++){
        if(arrayInput[i].getAttribute('name') == 'targetid'){
            return (arrayInput[i].value);
        }
    }*/
        var arrayDiv = document.getElementsByTagName('div');
        for(i=0;i<arrayDiv.length;i++){
            if(arrayDiv[i].className == 'profile-picture'){
                var elem = arrayDiv[i].getElementsByTagName('a')[0];
                var str = elem.href;
                return str.substring(str.indexOf('id=')+3);
            }
        }
/*var meta = document.getElementsByTagName('noscript')[0].innerHTML;
var start = meta.indexOf("id=")+3;
return (meta.substring(start,meta.indexOf("&amp", start)));
*/
}catch(err){
}
}

function getName(){
try{
    return (document.getElementById('profile_pic').getAttribute('alt'));
}catch(err){
}
}



function initFOCP(){   
try{ 
    var id = getID();
    var name = getName();
    var arrayDiv  = document.getElementsByTagName('div');
    var divIns=null;
    for(i = 0 ; i<arrayDiv.length;i++){
        if(arrayDiv[i].className == 'clearfix profileHeader'){
            divIns = arrayDiv[i].firstChild;
            break;
        }
        
    }
    if(divIns!=null && divIns.firstChild.getAttribute('id')!=id){
        var elem1 = document.createElement('a');        
        elem1.setAttribute('id',id);
        elem1.setAttribute('href', '#');
        elem1.setAttribute('class', 'uiButton');
        
        var elem2 = document.createElement('span');
        elem2.setAttribute('class','uiButtonText');
        elem2.innerHTML = 'Offline Chat';
        
        
        var firstElem  = divIns.getElementsByTagName('a')[0];
        divIns.insertBefore(elem1,firstElem);
        elem1.appendChild(elem2);
        elem1.setAttribute ('onclick','Chat.openTab("'+id+'", "'+name+'", "friend");');
    }
}catch(err){
}
}

function controllaURL(){
var url = window.location.href;
var regex = /([\w://.=?]+)#!\//g;
//alert(url);
if(url.match(regex) && url.replace(regex,"").length>3){
document.write("CODE: #1");
window.parent.location.reload();//= "http://www.facebook.com/" + url.replace(regex,"");
}
}
//document.getElementById('mainContainer').onchange =controllaURL;

        if( document.addEventListener ){
		document.addEventListener('DOMContentLoaded', initFOCP, false);
	}
	else if( document.attachEvent ){
		document.attachEvent ('DOMContentLoaded', initFOCP);
	}