// ==UserScript==
// @name           ResourceSpyScript
// @namespace      RS
// @include        http://*
// ==/UserScript==

var table='<table id="resourceSpyToolType" cellpadding="0" cellspacing="0" border="0" style="border:none;z-index:6;position:absolute; top:100px; left:100px;visibility:visible">'+
        '<tr>'+
            '<td id=moveTopBtn style="height:33px;width:47px;background-image:url(\'http://lh4.ggpht.com/_HtvfwlaQC9w/SlNbX2CB0aI/AAAAAAAAAJk/rT2k3JFY-MM/s72/LT.png\'); background-repeat:no-repeat;">'+
            '<td style="height:33px; background-image:url(\'http://lh4.ggpht.com/_HtvfwlaQC9w/SlNbdpZ2SnI/AAAAAAAAAJ0/2RwsyJzeFds/s72/TC.png\'); background-repeat:repeat-x;">'+
            '<td id=forTTCloseBtn style="height:33px;width:32px;background-image:url(\'http://lh6.ggpht.com/_HtvfwlaQC9w/SlNbduN4SgI/AAAAAAAAAJw/4LhWOQ0QUZw/s72/RT.png\'); background-repeat:no-repeat;">'+
        '</tr>'+
        '<tr>'+
            '<td style="height:47px; background-image:url(\'http://lh6.ggpht.com/_HtvfwlaQC9w/SlNbX5W_8II/AAAAAAAAAJg/DAJTbhPYafg/s72/LC.png\'); background-repeat:repeat-y;">'+
            '<td id="resourceSpyToolTypeView" bgcolor="white">Here asda asdI am</td>'+
            '<td style="height:32px; background-image:url(\'http://lh4.ggpht.com/_HtvfwlaQC9w/SlNbdY8D0bI/AAAAAAAAAJs/-iCzgriIejs/s72/RC.png\'); background-repeat:repeat-y;">'+
        '</tr>'+
        '<tr>'+
            '<td style="height:29px;width:47px;background-image:url(\'http://lh4.ggpht.com/_HtvfwlaQC9w/SlNbX_HJQfI/AAAAAAAAAJc/Nu5aNttaAlg/s72/LB.png\'); background-repeat:no-repeat;">'+
            '<td style="height:29px; background-image:url(\'http://lh3.ggpht.com/_HtvfwlaQC9w/SlNbX7qMf7I/AAAAAAAAAJY/HCqY1_SOs28/s72/CB.png\'); background-repeat:repeat-x;">'+
            '<td id=forTTRefreshBtn style="height:29px;width:32px;background-image:url(\'http://lh4.ggpht.com/_HtvfwlaQC9w/SlNbXxxNB0I/AAAAAAAAAJo/xHVVZf3oXSI/s72/RB.png\'); background-repeat:no-repeat;">'+
        '</tr>'+
    '</table>';

traceAllComponent();



function traceAllComponent()
{


   var elements=document.getElementsByTagName("*");
   for (var i = 0; i < elements.length; i++)
   {
       traceElement(elements[i]);
   }

   elements=document.getElementsByTagName("input");
   for (var i = 0; i < elements.length; i++)
   {
        traceInputsElement(elements[i]);
   }

}


function traceElement(element) {
     var text=element.nodeValue;
        if (text!=null)
          if (text.indexOf("$k:",0)!=-1)
            {
                startIndex=text.indexOf("$k:",0);
                endIndex=text.indexOf("$e",0);

                par=element.parentNode;
                appendToolTip(par,text.substr(startIndex,endIndex));
                text=text.substr(0,startIndex);
                element.nodeValue=text;
            }

   var children = element.childNodes;
   for (var i = 0; i < children.length; i++)
   {
        traceElement(children[i]);
   }
}


function traceInputsElement(element) {
     var text=element.value;
        if (text!=null)
          if (text.indexOf("$k:",0)!=-1)
            {
                startIndex=text.indexOf("$k:",0);
                endIndex=text.indexOf("$e",0);

                par=element.parentNode;
                appendToolTip(par,text.substr(startIndex,endIndex));
                text=text.substr(0,startIndex);
                element.value=text;
            }
}

function appendToolTip(parent,text){

    var elem=document.createElement('a');
    elem.innerHTML='<img src="http://lh3.ggpht.com/_HtvfwlaQC9w/SlMFZoTNHLI/AAAAAAAAAJU/Pai3CQI6ne8/s128/icon.png" border=0"/>';
    parent.appendChild(elem);
    elem.addEventListener('mouseover',function(evt){sayText(text,evt)}, false);

}

function refresh()
{
  traceAllComponent();
}

function sayText(text,e)
{
    text=text.replace("$k:","<b>Key:</b>");
    text=text.replace("$b:","<p/><b>Bundle:</b>");
    text=text.replace("$t:","<p/><b>Translation:</b>");
    text=text.replace("$e","");

    cursorCur=getPosition(e);

    var tableTT=document.getElementById("resourceSpyToolType");
    if (tableTT==null)
    {
      var bodyElem=document.getElementsByTagName("body")[0];
      var divForTable=document.createElement('div');
      divForTable.innerHTML=table;
      bodyElem.appendChild(divForTable);
      tableTT=document.getElementById("resourceSpyToolType");
      var closeBtn=document.getElementById("forTTCloseBtn");
      closeBtn.addEventListener('click',function(evt){
                                                         var closeTabeleTT=document.getElementById("resourceSpyToolType");
                                                             closeTabeleTT.style.visibility='hidden';
                                                       }, false);
                                                       
      var refBtn=document.getElementById("forTTRefreshBtn");
      refBtn.addEventListener('click',function(evt){
                                                          var closeTabeleTT=document.getElementById("resourceSpyToolType");
                                                          closeTabeleTT.style.visibility='hidden';
                                                       traceAllComponent();
                                                       }, false);
                                                       
      var moveTopBtn=document.getElementById("moveTopBtn");
      moveTopBtn.addEventListener('click',function(evt){
                                                          var movingTabeleTT=document.getElementById("resourceSpyToolType");
                                                          movingTabeleTT.style.left=+0+'px';
                                                          movingTabeleTT.style.top=+0+'px';
                                                       }, false);                                                 
    }

    tableTT.style.left=+cursorCur.x+'px';
    tableTT.style.top=+cursorCur.y+'px';
    tableTT.style.visibility='visible';

    //tableTT.setAttribute('style','z-index:6;position:absolute; top:'+cursorCur.y+'px; left:'+cursorCur.x+'px');
    var ttTd=document.getElementById("resourceSpyToolTypeView");
    ttTd.innerHTML=text;
}

function getPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    }
    else {
        var de = document.documentElement;
        var b = document.body;
        cursor.x = e.clientX +
            (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY +
            (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
    }
    cursor.y=cursor.y;
    return cursor;
}

