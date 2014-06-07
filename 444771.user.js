// ==UserScript==  
// @name       Cemetech Ultimate User Script 
// @namespace  http://use.i.E.your.homepage/  
// @version    0.1  
// @description A small but usefull userscript for the cemetech.net website 
// @include    http://www.cemetech.net/* 
// @exclude    http://www.cemetech.net/forum/posting.php?mode=editpost* 
// @copyright  2012+, You
// @grant      none 
// ==/UserScript== 



var name = 'Your name here!';
var ShowJsTIfied = true;





unsafeWindow.showjstified = function(){ 
    var jstified = document.getElementById('JsTIfied');
    if (jstified.height == 0){
        jstified.contentWindow.scrollTo(275,250);
        jstified.width = 280;
        jstified.height = 800;
        jstified.style.left = "0px";
        jstified.style.top = "-100px";
        jstified.style.position = "fixed";
        jstified.style.visibility = "visible";
    }else{
        jstified.contentWindow.scrollTo(0,0);
        jstified.width = 0;
        jstified.height = 0
        jstified.style.top = "-100px";
        jstified.style.left = "0px";
        jstified.style.position = "absolute";
        jstified.style.visibility = "hidden";
    }
    
} 

unsafeWindow.parse = function(str) {  
    
    search = new Array(
        /Copyright 2000-2014 Cemetech &amp; (.*?)<\/a>/gi,
        /Spud2451/gi,
        /ElectronicsGeek/gi,
        /KermMartian/gi,  
        /ComicIdiot/gi,  
        /tifreak8x/gi,  
        /LuxenD/gi,
        RegExp(name,"gi"),
        /<span class="name"><a name="(.*?)"><\/a><b>(.*?\w)<\/b><\/span>/gi,
        /:jstified:/gi,
        /<a href="style:\/\/(.*?)\">(.*?)<\/a>/gi,
        /<a href="iframe:\/\/(.*?)\">(.*?)<\/a>/gi,
        /--/g
        
        
    );  
    
    replace = new Array(
        'Copyright 2000-2014 Cemetech & <a href="mailto:admin@cemetech.net">Kerm Martian</a> :: :jstified: :: <a href="javascript: getimgsrc();">Get Image Source</a>',
        'Spud',
        'E-Geek',
        'Kerm',  
        'Comic',  
        'TI-Freak',  
        'Luxen',
        '<span style="background-color: black; color: white;">'+name+'</span>',
        '<b>$2</b><br /><button onClick="document.getElementById(\'saxtalk\').value = \'$2++\';saxAdd();"/>$2++</button>',
        '<iframe width="0" height="0" frameborder="0" scrolling="no" name="JsTIfied" id="JsTIfied" style="visibility:hidden;left:0;top:0;position:absolute;border:5px solid #000;z-index: 9002;"></iframe><br /><a href="http://www.cemetech.net/projects/jstified" target="JsTIfied" onclick="setTimeout(showjstified,2000);">Show JsTIfied</a>',
        '<div style="$1">$2</div>',
        '<iframe src="$1">$2</iframe>',
        ' '
        
        
        
    );  
    
    for (i = 0; i < search.length; i++) {
        str = str.replace(search[i],replace[i]);
        console.log(replace[i]);
    }  
    
    return str;}  

document.body.innerHTML = parse(document.body.innerHTML);


unsafeWindow.getimgsrc = function(){
    document.body.innerHTML = document.body.innerHTML.replace(/<img src="(.*?)">/gi,'<a href="$1"><img src="$1"></a>');
    return true;
}

document.body.innerHTML = "<style>::selection {background: #000000;color:#ffffff;}::-moz-selection {background: #000000;color:#ffffff;}</style>" + document.body.innerHTML;