// ==UserScript==
// @name           Pygame.org Comments
// @namespace      http://jaredforsyth.com
// @description    Show pygame comments
// @include        http://pygame.org/*
// ==/UserScript==
(function(){

/***helper functions***/
function findPos(obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft
            curtop += obj.offsetTop
        } while (obj = obj.offsetParent);
    }
    return [curleft,curtop];
}

function findall(x,y,i){
    var ret = [];
    y.replace(x,function(a,o){
        var r = Array.prototype.slice.call(arguments,0,-1);
        if (typeof(i)!='undefined')r = r[i];
        ret.push(r);
    });
    return ret;
}
function findall(x,y,i){var ret = [];y.replace(x,function(a,o){var r = Array.prototype.slice.call(arguments,0,-1);if (typeof(i)!='undefined')r = r[i];ret.push(r);});return ret;}

function range(x){var r=[];for (var i=0;i<x;i++){r.push(i);}return r;}

function min(x){x.sort();return x[0];}

function zip(){
    var res = [];
    var ml = min([arguments[i].length for(i in range(arguments.length))]);
    return [[arguments[i][a] for(i in range(arguments.length))] for(a in range(ml))]; 
}

function sendRequest(url,func){//alert(url);
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.4; en-US; rv:1.9b5) Gecko/2008032619 Firefox/3.0b5',
            'Accept': 'application/atom+xml,application/xml,text/xml,text/html,text/plain,*',
        },
        onload: function(x) {
            func(x);
        }
    });
}

function cE(e){return document.createElement(e);}

/***main code***/
var cb = document.body.appendChild(cE('div'));
cb.style.width='100%';
cb.style.height='25px';
cb.style.position='fixed';
cb.style.bottom='0px';
cb.style.left='0px';
cb.style.backgroundColor = 'darkgreen';
var list = cb.appendChild(cE('ul'));
list.className = 'cprojects';
list.style.padding='0';
list.style.margin='5px';

//check if logged in
if (findall(/form method="post" action="http:\/\/pygame\.org\/login\/login\.php/g,document.body.innerHTML).length){
    //not logged in
    cb.style.textAlign='center';
    cb.style.fontWeight='bold';
    cb.innerHTML = "Not logged in";
    return;
}

styletext = 'div.ccomments{background-color:lightgreen;padding:10px;max-width:500px;bottom:25px;visibility:hidden;left:0px;position:fixed;font-size:.8em;cursor:pointer;}ul.cprojects li{list-style-type:none;display:inline;}ul.cprojects a{text-decoration:none;color:lightgreen;padding:5px;cursor:pointer;}ul.cprojects a:hover{background-color:lightgreen;color:black;}';
document.body.appendChild(cE('style')).innerHTML = styletext;

sendRequest('http://pygame.org/members/projects/index.php',function(x) {
        if (x.status!=200)alert('Status: '+x.status+"\ntxt"+x.responseText);
        var txt = x.responseText;
        var projects = findall(/(\d+)\/view\.php/g,txt,1);
        
        var projects = findall(/<td align=''>([^<]+)<td align='center'><a href="(\d+)\/view.php">/g,txt);
        
        for (var i=0;i<projects.length;i++){
            (function(name,num){
            sendRequest("http://pygame.org/project/"+num+"/index.php",function(x){
                var lnk = list.appendChild(cE('li')).appendChild(cE('a'));
                var comments = document.body.appendChild(cE('div'));
                comments.addEventListener('click',function(){
                    document.location = "/project/"+num+"/";
                },true);
                comments.className = 'ccomments';
                comments.style.left = findPos(lnk)[0]+'px';
                lnk.addEventListener('click',function(e){
                    if (comments.style.visibility=='visible')
                        comments.style.visibility='hidden';
                    else
                        comments.style.visibility='visible';
                    e.stopPropagation();
                },true);
                document.body.addEventListener('click',function(){
                    if (comments.style.visibility=='visible')
                        comments.style.visibility='hidden';
                },true);
                //document.body.appendChild(document.createElement('h3')).innerHTML = name;
                var txt = x.responseText.replace(/\n/g,'').replace(/\r/g,'');
                var res = findall(/<table class\='comments'>(.+?)<\/table>/g,txt,1)[0];
                var headers = findall(/<th.*?>(.+?)<tr>/g,res,1);
                var bodies = findall(/<div>(.+?)<\/div>/g,res,1);
                lnk.innerHTML = name+" ("+headers.length+")";
                for (var i=0;i<headers.length;i++){
                    comments.appendChild(cE("div")).innerHTML = "<strong>"+headers[i]+"</strong><br/>"+bodies[i]+"<br/>";
                }
            });
            })(projects[i][1],projects[i][2]);
        }
    });

})();

