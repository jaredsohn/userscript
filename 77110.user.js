// ==UserScript==
// @name           MyFreeFarm HausMod
// @namespace      http://userscripts.org/scripts/show/77110
// @date           07.11.2010
// @include        http://s*.myfreefarm.de/main.php*
// ==/UserScript==

window.addEventListener("load",function(){

function $(ID) {return document.getElementById(ID)}
function removeElement(node){node.parentNode.removeChild(node);}
function createElement(type, attributes, append, inner){
	var node = document.createElement(type);
	for (var attr in attributes){
		if (attr=="checked") node.checked=attributes[attr];
		else if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	}
	if (append) append.appendChild(node);
	if (inner) node.innerHTML = inner;
	return node;
}

function explode(str){
	//GM_log("Begin explode "+ str);
	if (str == "") throw("Explode error Argument empty");
	if (str=="undefined") throw ("Explode error Argument is undefined");
	if (typeof str != "string") throw ("Explode error Argument not a String");

	try{
		return eval('(' + str + ')');
	} catch(err){
		GM_log("Explode error : " + err + " : " + str);
		throw ("Explode error : " + err);
	}
}

function implode(arr){//--- function written by Jan-Hans
  try{
    var line = new String();
    var InternalCounter = -1;
    var NoKey = new Boolean(false);
	if (typeof arr == "string"){ return arr; }
	if (typeof arr == "boolean"){ return arr.toString(); }
	if (typeof arr == "number"){ return arr.toString(); }
	if (typeof arr != "object"){ throw("Argument not a Object or Array" + typeof arr +"<br>"); }
    var type = (arr instanceof Array); //true->array | false->object

    line = (type)?"[":"{";
    for(var i in arr ){
    	if (typeof arr[i] == "function") continue;
    	InternalCounter++;
			if (type){
				while (i>InternalCounter){
					line += ",";
					InternalCounter++;
				}
			}else{ //arr == object
        line += "\"" + i + "\"";
        line += ":";
      }
      if (typeof arr[i] == "number" || typeof arr[i] == "boolean"){
        line += arr[i];
      } else if (typeof arr[i] == "string"){
        line += "\"" + arr[i] + "\"";
      } else if(typeof arr[i] == "undefined"){
        line += '';
      } else {
        line += implode(arr[i]);
      }
      line += ",";
    }
    var endChar = line.substring(line.length-1,line.length);
	  return line.substring(0,line.length-1) + (("{[".indexOf(endChar)!=-1)? endChar:"")+ ((type)?"]":"}");
  } catch (err){
    GM_log("Implode error : " + err);
    throw ("Implode error : " + err);
  }
}

var zufall = GM_getValue("zufall",false);
var data = {"farmhousecontainer":[2,2],"fhpicture":[2,2],"fhclock":[2,2],"fhcurtain":[2,2],"fhfloor":[2,2],"fhcarpet":[2,2],"fhtable":[2,2],"fhchair":[2,2],"fhplant":[2,2],"fhlights":[2,2]};
for(var t in data){
	data[t] = explode(GM_getValue("data_"+t,"[2,2]"));
	// [art 0-8, color 1-5]
}
var fhpets = GM_getValue("fhpets",2);

var arr = new Object();	
arr["farmhousecontainer"] = [1,2,3,4,5,6,7,75,85,"jpg"];
arr["fhpicture"] = [ 8, 9,10,11,12,13,14,76,86,"png"];
arr["fhclock"]   = [15,16,17,18,19,20,21,77,87,"png"];
arr["fhcurtain"] = [22,23,24,25,26,27,28,78,88,"png"];
arr["fhfloor"]   = [29,30,31,32,33,34,35,79,89,"gif"];
arr["fhcarpet"]  = [36,37,38,39,40,41,42,80,90,"png"];
arr["fhtable"]   = [43,44,45,46,47,48,49,81,91,"png"];
arr["fhchair"]   = [50,51,52,53,54,55,56,82,92,"png"];
arr["fhplant"]   = [57,58,59,60,61,62,63,83,93,"png"];
arr["fhlights"]  = [64,65,66,67,68,69,70,84,94,"png"];
arr["fhpets"]  = ["71_1","71_2","71_3","71_4","71_5","72_4","72_6","73_2","73_5","73_7","74_2","74_5","95_7","96_6","97_2","98_5","99_2","100_2","101_6","102_7","103_5","104_5"];

//$("farmhouselink").addEventListener("click",hausEinrichten,false);
$("headquarter").addEventListener("click",function(){window.setTimeout(hausEinrichten,500);},false);

function showConfig(){
	if($("farmhousemodconfig")){ removeElement($("farmhousemodconfig")); }
	var newdiv = createElement("div",{"id":"farmhousemodconfig","style":"position:absolute;top:50px;left:20px;width:660px;height:580px;background-color:#b8a789;z-index:101;display:block;"},$("garten_komplett"));
	createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/guild/help_back.jpg","style":"position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;"},newdiv);
	var newdiv1 = createElement("div",{"class":"tnormal","style":"position:absolute;width:90%;height:89%;margin:5%;overflow:auto;"},newdiv);
	var newimg = createElement("img",{"class":"link","src":"http://dqt9wzym747n.cloudfront.net/pics/close.jpg","style":"position:absolute;top:8px;right:8px;width:20px;height:20px;"},newdiv);
	newimg.addEventListener("click",function(){ 
		hausEinrichten();
		removeElement($("farmhousemodconfig")); 
	},false);

	newdiv = createElement("div",{},newdiv1);
	newimg = createElement("input",{"type":"checkbox","checked":zufall},newdiv);
	newimg.addEventListener("click",function(){
		zufall = this.checked;
		GM_setValue("zufall",zufall);
	},false);
	createElement("span",{},newdiv,"Random");

	for(var t in data){
	newdiv = createElement("div",{"style":"float:left;margin-bottom:30px;"},newdiv1);
	for(var v=0;v<9;v++){
	for(var c=1;c<6;c++){
		newimg = createElement("div",{"class":"link","typ":t,"val":v,"col":c,"style":"float:left;height:188px;width:188px;border:2px solid "+((data[t][0]==v)&&(data[t][1]==c)?"red":"black")+";background:url(http://dqt9wzym747n.cloudfront.net/pics/farmhouse/previews/"+arr[t][v]+"_"+c+".jpg) no-repeat scroll left top transparent;"},newdiv);
		newimg.addEventListener("click",function(){
			var t = this.getAttribute("typ");
			data[t] = [parseInt(this.getAttribute("val"),10),parseInt(this.getAttribute("col"),10)];
			GM_setValue("data_"+t,implode(data[t]));
			var cand = this.parentNode.getElementsByTagName("div");
			for(var v=0;v<cand.length;v++){
				cand[v].style.border = "2px solid black";
			}
			this.style.border = "2px solid red";
			cand=null;
		},false);
	}
	}
	}

	newdiv = createElement("div",{"style":"float:left;margin-bottom:30px;"},newdiv1);
	for(var t=0;t<arr["fhpets"].length;t++){
		newimg = createElement("div",{"class":"link","typ":t,"style":"float:left;height:188px;width:188px;border:2px solid "+(t==fhpets?"red":"black")+";background:url(http://dqt9wzym747n.cloudfront.net/pics/farmhouse/previews/"+arr["fhpets"][t]+".jpg) no-repeat scroll left top transparent;"},newdiv);
		newimg.addEventListener("click",function(){
			fhpets = parseInt(this.getAttribute("typ"),10);
			GM_setValue("fhpets",fhpets);
			var cand = this.parentNode.getElementsByTagName("div");
			for(var v=0;v<cand.length;v++){
				cand[v].style.border = "2px solid black";
			}
			this.style.border = "2px solid red";
			cand=null;
		},false);
	}	
	
	newdiv=null;newdiv1=null;newimg=null;
}
function hausEinrichten(){
	if (zufall){
		for(var t in data){
			data[t][0] = parseInt(9*Math.random(),10);
			data[t][1] = 1+parseInt(5*Math.random(),10);
		}
		fhpets = parseInt(arr["fhpets"].length*Math.random(),10);
	}
	if(!$("farmhousemod")){
		newdiv = createElement("div",{"id":"farmhousemod","class":"link","style":"position:absolute;right:30px;top:40px;color:white;font-weight:bold;"},$("farmhousecontainer"),"Mod");
		newdiv.addEventListener("mouseover",function(){window.setTimeout(hausEinrichten,500);},false);
		newdiv.addEventListener("click",function(){showConfig();},false);
	}
	
	for(var t in data){
	GM_log(t);
		$(t).setAttribute("style","display:block;background:url(http://dqt9wzym747n.cloudfront.net/pics/farmhouse/items/"+arr[t][data[t][0]]+"_"+data[t][1]+"."+arr[t][9]+") no-repeat scroll left top transparent;"); 
	}
	$("fhpets").setAttribute("style",	"background: url(http://dqt9wzym747n.cloudfront.net/pics/farmhouse/items/"+arr["fhpets"][fhpets]+".png) no-repeat scroll left top transparent;"); 
	$("fhpetsani").setAttribute("style","background: url(http://dqt9wzym747n.cloudfront.net/pics/farmhouse/items/"+arr["fhpets"][fhpets]+".gif) no-repeat scroll 0% 0% transparent;"   );
}

},false);