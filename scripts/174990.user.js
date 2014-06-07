// ==UserScript==
// @name       rs28083s def template2
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://us11.grepolis.com/*
// @copyright  2012+, rs28083
// ==/UserScript==

jQuery( b());
function b(){
     var newdiv2 = document.createElement('div');
    
    var divID2 = "LeftAtt";
    
    newdiv2.setAttribute('id',divID2);
    newdiv2.style.float = "center";
    
    var btn=document.createElement("BUTTON");
	var t=document.createTextNode("def template");
    btn.style.color = "red";
    btn.appendChild(t);
    btn.addEventListener ("click", function() {getData();}, false);
    
    newdiv2.appendChild(btn);
    document.getElementById('top_bar').appendChild(newdiv2);
};
function getData(){
    formSet();
}
function getCityName(){
    return document.getElementById("town_name_link").innerHTML;
};
function formSet(){
    
    var markup = document.getElementById('unit_movements').innerHTML;
    
    markup = markup.replace(/</g, "");
    markup = markup.replace(/>/g, "");
    
    var f = document.createElement("form");
	f.setAttribute('method',"get");
	f.setAttribute('action',"http://grepattcalc.tk/request.aspx");

	var i = document.createElement("input"); 
	i.setAttribute('type',"hidden");
	i.setAttribute('name',"DEF");
	i.setAttribute('value',markup);
    
    var i2 = document.createElement("input"); 
	i2.setAttribute('type',"hidden");
	i2.setAttribute('name',"cName");
	i2.setAttribute('value',getCityName());
    
    var i3 = document.createElement("input"); 
	i3.setAttribute('type',"hidden");
	i3.setAttribute('name',"cgod");
	i3.setAttribute('value',getCityGod());
    
	var s = document.createElement("input"); 
	s.setAttribute('type',"submit");
	s.setAttribute('value',"Submit");

	f.appendChild(i);
    f.appendChild(i2);
    f.appendChild(i3);
	f.appendChild(s);

	document.getElementById('top_bar').appendChild(f);
};
function getCityGod(){
    var markup2 = document.getElementById('god_mini').outerHTML;
    markup2 = markup2.replace(/</g, "");
    markup2 = markup2.replace(/>/g, "");
    markup2 = markup2.replace("div id=\"god_mini\" class=\"god_mini ","");
    markup2 = markup2.replace("\" style=\"display: block;\"/div","");
    markup2 = markup2.replace('div style="display: block;" id="god_mini" class="god_mini ','');
    markup2 = markup2.replace('"/div','');
    return markup2;
}