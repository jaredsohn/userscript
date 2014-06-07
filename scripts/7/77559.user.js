// ==UserScript==
// @name           Bulk Player Retirement
// @namespace      goallineblitz.com
// @description    Lets you retire players in bulk.
// @include        http://goallineblitz.com/game/home.pl
// @copyright      2010, garrettFoster
// @version        2010.05.25
// ==/UserScript==

window.setTimeout(main,10); //needed to start greasemonkey

function main(){
    var option = document.getElementsByTagName('option');
    if(option[3].selected){
        //add button
        var div = document.createElement('div');
        div.setAttribute('id','retireDiv');        
        
        var button = document.createElement('input');
        button.setAttribute('type','button');
        button.setAttribute('value','Retire Selected Players');
        button.setAttribute('style','float: right;');
        button.addEventListener('click',getPass,false);
        
        div.appendChild(button);
        
        var location = document.getElementById('players');
        location.parentNode.insertBefore(div,location);
        
        div = document.createElement('div');
        div.setAttribute('id','hidden-div');
        div.setAttribute('style','visibility:hidden; display:none;');
        
        location = document.getElementById('retireDiv');
        location.parentNode.insertBefore(div,location.nextSibling);
        
        div = document.createElement('div');
        div.setAttribute('style','clear: both;');
        
        location = document.getElementById('hidden-div');
        location.parentNode.insertBefore(div,location.nextSibling);
        
        //add headings
        var tr = document.getElementById('playerTable').getElementsByTagName('tr');
        var th = document.createElement('th');
        
        var a = document.createElement('a');
        a.innerHTML = 'Retire Player?';
        a.setAttribute('style','cursor:pointer;cursor:hand;');
        a.addEventListener('click',function(){toggle('retirePlayer');},false);
        
        th.appendChild(a);
        
        tr[0].appendChild(th);
        
        th = document.createElement('th');
        a = document.createElement('a');
        a.innerHTML = 'Delete Name?';
        a.setAttribute('style','cursor:pointer;cursor:hand;');
        a.addEventListener('click',function(){toggle('retireName');},false);
        
        th.appendChild(a);
        
        tr[0].appendChild(th);
        
        //add checkboxes
        for(var i=1;i<tr.length;i++){
              var id = tr[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].href.split('player_id=')[1];
              var td = document.createElement('td');
              
              var chk = document.createElement('input');
              chk.setAttribute('type','checkbox');
              chk.setAttribute('value',id);
              chk.setAttribute('class','retirePlayer');
              
              td.appendChild(chk);
              
              tr[i].appendChild(td);
              
              td = document.createElement('td');
              
              chk = document.createElement('input');
              chk.setAttribute('type','checkbox');
              chk.setAttribute('value','keep_name');
              chk.setAttribute('class','retireName');
              
              td.appendChild(chk);
              
              tr[i].appendChild(td);  
        } 
    }
}

function getPass(){
    var player = document.getElementsByClassName('retirePlayer');
    var num = 0;
    for(var i=0;i<player.length;i++){
        if(player[i].checked){
            num++;
        }
    }
    
    var span = document.createElement('span');
    span.setAttribute('style','float: right;');
    span.innerHTML = 'Please enter your password to confirm retirement of ' + num + ' player(s): ';
    
    var input = document.createElement('input');
    input.setAttribute('type','password');
    input.setAttribute('id','retire_pass');
    input.setAttribute('value','');
    input.setAttribute('style','float: right;');
    
    var button = document.createElement('input');
    button.setAttribute('type','button');
    button.setAttribute('value','OK');
    button.setAttribute('style','float: right;');
    button.addEventListener('click',retirePlayers,false);    
    
    var location = document.getElementById('retireDiv');
    
    location.innerHTML = '';
    location.appendChild(button);
    location.appendChild(input);
    location.appendChild(span);
}

function retirePlayers(){
    var player = document.getElementsByClassName('retirePlayer');
    var retireId = new Array();
    for(i=0;i<player.length;i++){
        if(player[i].checked){
            retireId.push(player[i].value);
        }else{
            retireId.push(0);
        }
    }
    
    var names = document.getElementsByClassName('retireName');
    var retireName = new Array();
    for(i=0;i<names.length;i++){
        if(names[i].checked){
            retireName.push(0);
        }else{
            retireName.push(1);
        }
    }
    
    var password = document.getElementById('retire_pass').value;
    var url = 'http://goallineblitz.com/game/retire_player.pl';
    
    document.getElementById('retireDiv').innerHTML = '<span style="color: green; float: right;">Retiring Players...</span>'; 
    
    for(var i=0;i<retireId.length;i++){
        if(retireId[i] != 0){
            params = '?player_id='+retireId[i]+'&keep_name='+retireName[i]+'&password='+password+'&action=Retire';
            var txt = get(url+params);
            if(checkError(txt)){
                break;
            }
        }
    }
    document.getElementById('retireDiv').innerHTML = '<span style="color: green; float: right;">Done!</span>';        
}

function toggle(className){
    var chk = document.getElementsByClassName(className);
    for(var i=0;i<chk.length;i++){
        if(chk[i].checked){
            chk[i].checked = false;
        }else{
            chk[i].checked = true;
        }
    }
}

function get(url){
    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open('GET',url,false);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(null);
    return xmlhttp.responseText;
}

function checkError(txt){
    var div = document.getElementById('hidden-div');
    div.innerHTML = txt;
    var error = document.getElementsByClassName('error');
    if(error.length != 0){
        document.getElementById('retireDiv').innerHTML = '<span style="color: red; float: right;">'+error[0].innerHTML+'</span>';
        return true;
    }       
    return false;
}
    


