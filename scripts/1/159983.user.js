// ==UserScript==
// @name AventaHighlighter
// @namespace LuaWeaver
// @description Private use.
// @include http://aventa.blackboard.com/webapps/blackboard/content/listContent.jsp?*
// @grant none
// @version 1.2
// ==/UserScript==

var completed=[]

function finish(){
        var pat=/>.+</i
        var list=document.getElementsByClassName("item clearfix");
        for(i=0;i<completed.length;i++){
			for(i2=0;i2<list.length;i2++){
					var str=pat.exec(list[i2].getElementsByTagName("a")[0].innerHTML);
					if(str.toString()==completed[i].toString()){
						list[i2].style.backgroundColor="green"
					}
			}
        }
}

function alertValid(tr){
        var lastActivity=tr.childNodes[7].innerHTML
        if(lastActivity==""){
                return false;
        }else{
                return true;
        }
}

var variable=new XMLHttpRequest;
variable.onreadystatechange=
function(){
        if(variable.readyState==4){
                var doc = document.implementation.createHTMLDocument("example");
                doc.documentElement.innerHTML = variable.responseText;
                var items=doc.getElementsByTagName("tr");
                var pat=/>.+</i
                for(i=0;i<items.length;i++){
                        if(alertValid(items[i])){
                                completed[completed.length]=pat.exec(items[i].childNodes[1].innerHTML)
                        }else{
                        }
                }
                finish();
        }
}

var cID=/\?course_id=\w+/i
var cIDstring=cID.exec(document.URL)
variable.open("GET","http://aventa.blackboard.com/webapps/gradebook/do/student/viewGrades"+cIDstring.toString()+"&callback=portal");
variable.send();