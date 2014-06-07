// ==UserScript==
// @name           NexusClashReadableInfusion
// @namespace      http://userscripts.org/users/125692
// @description    Makes infusion numbers readable
// @include        http://nexusclash.com/modules.php?name=Game*
// @include        http://www.nexusclash.com/modules.php?name=Game*
// @exclude        http://nexusclash.com/modules.php?name=Game&op=disconnect
// @exclude        http://www.nexusclash.com/modules.php?name=Game&op=disconnect

// ==/UserScript==

//<span style="opacity:1;background-color:white;font-family:'arial','gazzarelli','highlight let','ultra serif sf';color:#aa0099;font-size: .2em;font-weight:900;">(500)</span>
(function() {

//<div id="Map">
var mapdiv;

if ((document.getElementById('Map'))){
/*  
  var fonttags=mapdiv.getElementsByTagName('font');
    var fonttagslength=fonttags.length;
    var tempcolor;
    var tempfontinnerHTML;
    var fontparents = new Array();
    var fontcolors =new Array();
    var fontinnerHTMLs=new Array();
    for(i=0;i<fonttagslength;i++){
        fontparents[i]=fonttags[i].parentNode;
    }
    for(i=0;i<fonttagslength;i++){
        tempcolor=fonttags[i].color;
        tempfontinnerHTML=fonttags[i].innerHTML;
        fontparents[i].innerHTML= "<span style=\"opacity:1;background-color:white;font-family:'arial';color:"+tempcolor+";font-size: .75em;font-weight:900;\">"+tempfontinnerHTML+"</span>"
    }*/

//    styletext="style=\"opacity:1;background-color:white;font-family:'arial';color:"+tempcolor+";font-size: .75em;font-weight:900;\"";
//text.replace(/<font color=("#[ABCDEF0123456789]{6}")>(\(\d+\))<\/font>/.)


//<font color="#FF50C0">(455)</font>
//<span style='background-color:white;font-size:.2em;font-weight:900;color:"#aa0099"'>(500)</span>


mapdiv=document.getElementById('Map');
var fonttags=mapdiv.getElementsByTagName('font');
var fonttagslength=fonttags.length;
for(i=0;i<fonttagslength;i++){
        if (fonttags[i].parentNode.tagName=="TD"){
            fonttags[i].parentNode.align='left';
            fonttags[i].parentNode.setAttribute('valign','top');
        }
        else if(fonttags[i].parentNode.tagName=="CENTER"){
            fonttags[i].parentNode.parentNode.setAttribute('align','left');
            fonttags[i].parentNode.parentNode.setAttribute('valign','top');
fonttags[i].parentNode.parentNode.innerHTML=fonttags[i].parentNode.parentNode.innerHTML.replace(/<center>/,"").replace(/<\/center>/,"");
        }
}


//spantext1="<span style=\"opacity:1;background-color:white;font-family:'arial';color :";
//spantext2=';font-size: .75em;font-weight:900;\">';
//mapdiv.innerHTML=mapdiv.innerHTML.replace(/<font color=("#[ABCDEF0123456789]{6}")>(\(\d+\))<\/font>/g,spantext1+'$1'+spantext2+'$2'+"</span>")
//replace(/align="top"><font/,'align="center" valign="top"><font')
//<td width="59" height="59" align="center">  <font color="#FF50C0">(500)</font>  </td>

//mapdiv.innerHTML=mapdiv.innerHTML.replace(/<font color="(#[ABCDEF0123456789]{6})"/g,"<span style='background-color:white;vertical-align:text-top;font-size:.5em;font-weight:900;color:$1'").replace(/\/font/g,'/span');

//<font color="#FF50C0">(405)</font>
mapdiv.innerHTML=mapdiv.innerHTML.replace(/<font color="(#[ABCDEF0123456789]{6})">(\(\d+\))<\/font>/g,"<span style='background-color:white;vertical-align:text-top;font-size:.5em;font-weight:900;color:$1'>$2<\span>");


} 
/*
<font color="#FF50C0">(115)</font>
"<span style=\"opacity:1;background-color:white;font-family:'arial';color:'$1';font-size: .75em;font-weight:900;\">$2</span>"
*/

//document.getElementById('Map').innerHTML=document.getElementById('Map').innerHTML.replace(/<font color=("#[ABCDEF0123456789]{6}")>(\(\d+\))<\/font>/g,"<span style=\"opacity:1;background-color:white;font-family:'arial';color:'$1';font-size: .75em;font-weight:900;\">$2</span>")




//EOF
})();