// ==UserScript==
// @name           GLB Equip Auto Upgrade
// @namespace      GLB
// @description    Automatically upgrades a piece of equip as many times as possible
// @include        http://goallineblitz.com/game/upgrade_equipment.pl?player_id=*&id=*
// @include        http://goallineblitz.com/game/upgrade_equipment.pl?complete=1&id=*
// @include        http://goallineblitz.com/game/upgrade_equipment.pl?id=*
// ==/UserScript==
// 

function getElementsByClassName(classname, par)
{
    if (typeof(par) == 'undefined') {
        par = document;
    }
    var a=[];   
    var re = new RegExp('\\b' + classname + '\\b');
    var els = par.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++) 
    {       
        if(re.test(els[i].className)) 
        {	
            a.push(els[i]);
        }
    }
    return a;
};


function getElementsByClassNameMulti(classname,classname1, par)
{
    var a=[];   
    var re = new RegExp('\\b' + classname + '\\b');
    var re1 = new RegExp('\\b' + classname1 + '\\b');
    var els = par.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++) 
    {       
        if(re.test(els[i].className) || re1.test(els[i].className)) 
        {	
            a.push(els[i]);
        }
    }
    return a;
};

function setupupgrade(){
    //set cookie for select item
    if (document.getElementsByName("upgrade")[0].value !=''){
        document.cookie="autoupgrade=" + escape(document.getElementsByName("upgrade")[0].value) + "; expires=15/02/2011 00:00:00";
        //click button
        var button = document.getElementsByName("do");
        button[0].click();
    }else{
        alert('No value selected for upgrading. Please try again.');
    }
};


if (window.location.href.indexOf('complete=')>0) {
    //verify do another upgrade button exists
    if (document.body.innerHTML.indexOf('<span>Do another upgrade') > -1){
    
        var javcookie ='';
        if (document.cookie.length>0){
            var c_start=document.cookie.indexOf("autoupgrade=");
            var c_name='autoupgrade';
            if (c_start!=-1){ 
                c_start=c_start + c_name.length+1; 
                var c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                javcookie = unescape(document.cookie.substring(c_start,c_end));
                //delete cookie
                //document.cookie='autoupgrade=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
            } 
        }
        if (javcookie!='') {
            var links = document.getElementsByTagName('a');
            for (var q=0;q<links.length;q++) {
                if (links[q].href.indexOf('upgrade') > -1) {
                    //click do another upgrade button 
                    window.location.href = links[q].href;
                }
            }
        }
    }else{
        //delete cookie
        document.cookie='autoupgrade=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    }

    
    
}else{
    var errors = getElementsByClassName('error under_tabs', document);
    if (errors.length > 0) {
        //delete cookie
        document.cookie='autoupgrade=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    }else{
    
    var javcookie ='';
    if (document.cookie.length>0){
        var c_start=document.cookie.indexOf("autoupgrade=");
        var c_name='autoupgrade';
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1; 
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            javcookie = unescape(document.cookie.substring(c_start,c_end));
            //delete cookie
            //document.cookie='autoupgrade=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        } 
    }
    if (javcookie!='') {
        var optionslist = document.getElementsByName("upgrade");
        for (var t =0; t<optionslist[0].options.length;t++) {
            if (optionslist[0].options[t].text == javcookie){
                optionslist[0].options[t].selected = true;
            };
        };
        var button = document.getElementsByName('do');
        button[0].click();
    }



    //build max upgrade button
    var maxupgrade = document.createElement('input');
    maxupgrade.setAttribute('type', 'button');
    maxupgrade.setAttribute('name', 'maxupgrade');
    maxupgrade.setAttribute('id', 'maxupgrade');
    maxupgrade.setAttribute('value', 'Max Upgrade');
    maxupgrade.addEventListener('click', setupupgrade, false);
    var spacer = document.createElement('div');
    spacer.innerHTML = '<br>';
    var insertloc = getElementsByClassName('form_button_container');
    insertloc[0].parentNode.insertBefore(maxupgrade,insertloc[0]);
    insertloc[0].parentNode.insertBefore(spacer,insertloc[0]);
    }
}
