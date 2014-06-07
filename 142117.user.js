// ==UserScript==
// @id             HujiShnaton
// @name           hebrew university shnaton
// @version        1.1
// @author         Ohad Cohen
// @description    show information from the hebrew university shnaton in an easy way
// @include        http://shnaton.huji.ac.il/index.php
// @run-at         document-end
// ==/UserScript==
generate=function(){
    //0 - show in colors (not print friendly); 1- print friendly; 2 - print also
    var print=0;
    
    //open all courses
    var prisa=document.getElementById("prisa");
    if(prisa){
        prisa.value=2;
        prisa.onchange();
    }

    //create the table for the output
    var table=document.createElement("table");
    table.style.direction="rtl";
    document.body.appendChild(table);
    var thead=document.createElement("thead");
    table.appendChild(thead);
    var tr=document.createElement("tr");
    thead.appendChild(tr);
    var th=document.createElement("th");
    tr.appendChild(th);
    var days="אבגדה".split("");
    for(var day in days){
        th=document.createElement("th");
        th.innerHTML="יום "+days[day];
        tr.appendChild(th);
    }
    var tbody=document.createElement("tbody");
    table.appendChild(tbody);
    tbody.style.backgroundColor="#F7E8BE";
    for(var h=8;h<20;h++){
       tr=document.createElement("tr");
       th=document.createElement("th");
       th.innerHTML=h+":00-"+(h+1)+":00";
       tr.appendChild(th);
       for(var day in days){
           var td=document.createElement("td");
           tr.appendChild(td);
           td.id=days[day]+h;
           td.style.border="3px solid";
           td.style.direction= "rtl";
       }
       tbody.appendChild(tr);
    }
    document.getElementsByTagName("table")[0].style.display="none";//remove other elements
    
    //calculate courses id's and names
    var idToText=[];
    var texts=document.getElementsByClassName("courseTD text");
    for(var i in texts)
        if((texts[i].innerHTML)&&(texts[i].innerHTML.match(/\d{5}/)))
        idToText[texts[i].innerHTML.match(/\d{5}/)]=texts[i-1].innerHTML.replace(/<.*?>/g,"");

    //find each course hours
    var divs=document.getElementsByTagName("div");
    for(var div in divs){
        var course=divs[div];
        if(!((course.id) && (course.id.match(/details\d{5,7}/))))
            continue;
        var id=course.id.substr(7,5);
        var infoes=course.getElementsByTagName("tr");
        for(var inf in infoes)
            if((infoes[inf]) && (infoes[inf].innerHTML)){
                var tds=infoes[inf].getElementsByTagName("td");
                if((tds[2])){
                    var days=tds[2].innerHTML.split("<br>");
                    var places=tds[0].innerHTML.replace(/\(.*?\)/g,"").split("<br>");
                    var hours=tds[1].innerHTML.split("<br>");
                    for(var time=0;time<days.length-1;time++){
                        var day=days[time].charAt(4);
                        var startHour=Number(hours[time].substr(6,2));
                        var endHour=Number(hours[time].substr(0,2));
                        for(var hour=startHour;hour<=endHour;hour++){
	       	                document.getElementById(day+hour).innerHTML+="<div"+(print?"":" style=\"background-color:"+id%10+id+";color:white\"")+">"+places[time]+" "+tds[6].innerHTML.replace(/<.*>/g,"")+" "+idToText[id]+"<hr></div>";
		                }
		            }
                }
            }
    }
    if(print==2)
        window.print();
}

//inject button
var btns=document.getElementsByName("button2");
btns[0].outerHTML+=" <input type=\"button\" onmouseout=\"changeClass(this,\'button\');\"  onclick=\"generate();\" onmouseover=\"changeClass(this,\'button_over\');\" style=\"width:auto;\" class=\"button\" value=\"תצוגת טבלה\" name=\"button2\"> ";

//inject the script into the page, this is needed for the call to work
var myScript=document.createElement("script");
myScript.innerHTML="generate="+generate;
document.head.appendChild(myScript);