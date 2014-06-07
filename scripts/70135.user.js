// ==UserScript==
// @name           KKU std showpic
// @namespace      anui
// @description    show pic
// @include        http://reg*.kku.ac.th/registrar/learn_time.asp
// @match          http://reg*.kku.ac.th/registrar/learn_time.asp
// ==/UserScript==

var tags = document.getElementsByTagName('a');
//Style
var styleCode = new Array();
    styleCode.push('#img {height:30px; border:0px;}');
    styleCode.push('#popup { top:10px;right:10px; position:fixed !important; top:2px !important; padding:2px 4px; min-width:130px; z-index:99999 !important;}');

var style = document.createElement('style');
    style.innerHTML = styleCode.join('\n');

try { document.getElementsByTagName('head')[0].appendChild(style); }
catch(e) { console.debug(e)}

var div = document.createElement('div');
div.id = 'popup';
div.style.display = 'visible';
document.body.insertBefore(div, document.body.lastChild);

//Show popup
function showpopup(e){    
    for (i=0 ; i<tags.length ; i++)
    {
        if(tags[i].href == e.target){
            id = tags[i].innerHTML;
            //alert(i + ' : ' +id);

            var code = new Array();
            code.push('<img id="std" src="http://reg1.kku.ac.th/ephoto/getstudentimage.asp?id='+id+'"/>');

            div.innerHTML = code.join('\n');
            
            break;
        }
    }
}
function hidepopup(){
    div.innerHTML = '';
}
function show(){
    for (i=0 ; i<tags.length-1 ;i++)
    {
        if (tags[i].href.toString().search('learn_time.asp?') != -1)
        {
            try{
                var id = tags[i].innerHTML;
                var atmp = document.createElement('a');
                    atmp.id = id;
                    atmp.href = 'http://reg1.kku.ac.th/ephoto/getstudentimage.asp?id=' + id;
                    atmp.innerHTML = '<img id="img" src="'+atmp.href+'"/>';
                    atmp.target = '_blank';
                    tags[i].addEventListener('mouseover', function(e){showpopup(e)}, false);
                    tags[i].addEventListener('mouseout', function(e){hidepopup()}, false);
                    
                    tags[i].parentNode.appendChild(atmp);
            }catch(e){alert(e);}
        }
    }
}
try{
show();
}catch(e){alert(e);}