// ==UserScript==
// @name           GLB Auto Train
// @namespace      GLB
// @description    Trains repeatedly until $ or TPs have been exhausted
// @include        http://goallineblitz.com/game/training.pl?player_id=*
// ==/UserScript==
// 
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
    if (document.getElementsByName("training_type")[0].value !=''){
        document.cookie="autotrain=" + escape(document.getElementsByName("training_type")[0].value) + "; expires=15/02/2011 00:00:00";
        //click button
        var inputs = document.getElementsByTagName("input");
        for (var q=0;q<inputs.length ;q++) {
            if (inputs[q].src == 'http://goallineblitz.com/images/game/buttons/train.gif') {
                inputs[q].click();
            }
        }
    }else{
        alert('No value selected for training. Please try again.');
    }
};


var errors = getElementsByClassName('error under_tabs', document);
if (errors.length > 0) {
    //delete cookie
    document.cookie='autotrain=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
}else{

    var javcookie ='';
    if (document.cookie.length>0){
        var c_start=document.cookie.indexOf("autotrain=");
        var c_name='autotrain';
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1; 
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            javcookie = unescape(document.cookie.substring(c_start,c_end));
            //delete cookie
            //document.cookie='autotrain=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        } 
    }
    if (javcookie!='') {
        var optionslist = document.getElementsByName("training_type");
        for (var t =0; t<optionslist[0].options.length;t++) {
            if (optionslist[0].options[t].text == javcookie){
                optionslist[0].options[t].selected = true;
            };
        };
        var inputs = document.getElementsByTagName("input");
        for (var q=0;q<inputs.length ;q++) {
            if (inputs[q].src == 'http://goallineblitz.com/images/game/buttons/train.gif') {
                inputs[q].click();
            }
        }
    }



    //build max upgrade button
    var maxupgrade = document.createElement('input');
    maxupgrade.setAttribute('type', 'button');
    maxupgrade.setAttribute('name', 'maxupgrade');
    maxupgrade.setAttribute('id', 'maxupgrade');
    maxupgrade.setAttribute('value', 'Max Train');
    maxupgrade.addEventListener('click', setupupgrade, false);
    var spacer = document.createElement('div');
    spacer.innerHTML = '<br>';
    var insertloc = getElementsByClassName('form_button_container');
    insertloc[0].parentNode.insertBefore(maxupgrade,insertloc[0]);
    insertloc[0].parentNode.insertBefore(spacer,insertloc[0]);
}

