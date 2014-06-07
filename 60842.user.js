// ==UserScript==
// @name man mobile's Keyboard Choice
// @include http://www.metroplexity.com/*
// ==/UserScript==
var position = GM_getValue("indicator", "Left");
var mode;
var target=1;
var names = new Array();
var choices = new Array();
forms = document.getElementsByTagName("form");
for(thing in forms) {
    if(forms[thing].name == "attack") mode = 2;
    if(forms[thing].name == "netcombat") mode = 3;
}
inputs = document.getElementsByTagName("input");
for(res in inputs) {
    if(inputs[res].type == "text") {
        mode = 0;
    }
    if(inputs[res].type == "submit") {
        names[res]=inputs[res].name;
        choices[choices.length]=inputs[res]
        if(mode==undefined) mode = 1;
    }
}
maps=document.getElementsByTagName("map");
if(maps[0]!= null && mode == undefined) mode = 4;

if(document.getElementsByTagName("textarea")[0] != null) mode = 0;

switch(mode) {
case 0:
    break;
case 1:
    window.down = false;
    document.addEventListener("keypress", function(e) {kpress(e)} , false);
    document.addEventListener("keydown", function(e) { if(e.which==107)  window.down = true;} , false);
    document.addEventListener("keyup", function(e) { if(e.which==107) window.down = false; } , false);
    var n;
    for (var i = 0; i < choices.length; i++)
    {
        n = document.createElement('text');
        if(position == "Left") {
            n.innerHTML = ' - ' + (i+1);
            choices[i].parentNode.insertBefore(n, choices[i].nextSibling);
        }
        if(position == "Right") {
            n.innerHTML = (i+1) + ' - ';
            choices[i].parentNode.insertBefore(n, choices[i]);
        }
    }
    break;
case 2:
case 3:
    pix = document.getElementsByTagName("img");
    enemies = 0;
    while(pix[enemies].id=="opponent"+enemies||pix[enemies].src=="http://www.metroplexity.com/images/skull.jpg"||pix[enemies].src=="whatever"){ 
        enemies++;
    }
    document.addEventListener("keypress", function(e) {cpress(e)} , false);
    var n;
    if(position == "Left") {
        n = document.createElement('text');
        n.innerHTML = " - Enter ";
        choices[0].parentNode.insertBefore(n, choices[0].nextSibling);
        n=document.createElement('text');
        n.innerHTML = " - *";
        choices[1].parentNode.insertBefore(n, choices[1].nextSibling);
        n=document.createElement('text');
        n.innerHTML = " - .";
        document.getElementsByName("clear")[0].parentNode.insertBefore(n, document.getElementsByName("clear")[0].nextSibling);
    }
    if(position == "Right") {
        n = document.createElement('text');
        n.innerHTML = "Enter - ";
        choices[0].parentNode.insertBefore(n, choices[0]);
        n=document.createElement('text');
        n.innerHTML = "* - ";
        choices[1].parentNode.insertBefore(n, choices[1]);
        n=document.createElement('text');
        n.innerHTML = " . - ";
        document.getElementsByName("clear")[0].parentNode.insertBefore(n, document.getElementsByName("clear")[0]);
    }
    break;
case 4:
    document.addEventListener("keypress", function(e) {mpress(e)} , false);
    var n;
	var map = maps[0];
    for (var i = 0; i < map.areas.length; i++)
    {	
        n = document.createElement('div');
        n.innerHTML = "<a href='"+map.areas[i].href+"'> <font color='red'>"+(i+1)+" </font> </a>";
		
		var x =0;
		var y =0;
		if(map.areas[i].shape=="CIRCLE") {
			foo = /(\d+)/g
			x = foo.exec(map.areas[i].coords);
			y = foo.exec(map.areas[i].coords);
			x=parseInt(x[0]);
			y=parseInt(y[0]);
		}
		else {
			var o = calc(map.areas[i].coords);
			x = o.x;
			y = o.y;
		}
        img = document.getElementsByTagName("img");
        for(pic in img) {
            if(img[pic].useMap != ""){  
                img = img[pic];
                break;
            }
        }
		n.style.position="absolute";
		n.style.fontSize="50px";
		n.style.width="10px";
		n.style.left=x+img.offsetLeft-5+"px";
		n.style.top=y+img.offsetTop+"px";
		n.style.color="white";
		map.parentNode.insertBefore(n, map)
	}
            
			
			//map.parentNode.insertBefore(n, map);
    
break;
default: 
    document.addEventListener("keypress", function(e) {if(e.which == 115 || e.which == 83) window.location.href="http://www.metroplexity.com/location.php"; if(e.which == 114 || e.which == 82) window.location.href="http://www.metroplexity.com/rest.php";} , false);
}

function calc(coords) {
	var coordarray = coords.split(',');
	var result = {x:0,y:0};
	for (var i = 0; i < coordarray.length; i+= 2) {
	result.x += parseInt(coordarray[i]);
	result.y += parseInt(coordarray[i+1]);
	}
	result.x /= coordarray.length/2;
	result.y /= coordarray.length/2;
	return result;
}
function indicatorClick(){
    if(position == "Left") position = "Right";
    else if(position == "Right") position = "Off";
    else if(position == "Off") position = "Left";
    GM_setValue("indicator", position)
    document.getElementById("indicatorbutton").innerHTML = position;
}

function kpress(e) {
    var num = null;
    if(e.which == 13){
        num = choices.length;
        if(choices[num-1].value=="Back to the Streets") num = 1;
    }
    if(e.which == 114 || e.which == 82) window.location.href="http://www.metroplexity.com/rest.php";
    if(e.which == 115 || e.which == 83) window.location.href="http://www.metroplexity.com/location.php";
    if(num==undefined) num = e.which-48;
    if(num<0||num>9) num = null;
    if (num == 0) num = 10;
    if(window.down == true && num != null) num= num + 10;
    if(num!=null&&num<=choices.length){
        choices[num-1].click();
    }
} 

function cpress(e) {
    switch(e.which){
        case 13: 
            choices[0].click();
            break;
        case 43: 
        target++;
        if(target>enemies) target = enemies;
        location.href = "javascript:void(targetclick("+(target-1)+"));";
            break;
        case 45: 
        target--;
        if(target<1) target = 1;
        location.href = "javascript:void(targetclick("+(target-1)+"));";
            break;
        case 46: 
            location.href = "javascript:void(clearall());";
            break;
        case 42: 
            choices[1].click();
            break;
        case 114:
        case 82:
            location.href = "javascript:void(techclick("+(num-1)+"));";
            break;
        default:
            num = e.which-48;
            if(mode == 2) if(num>0&&num<6) location.href = "javascript:void(techclick("+(num-1)+"));";
            if(mode == 3) if(num>0) location.href = "javascript:void(choosetool("+(num-1)+"));";
    }
}

function mpress(e) {
    var num;
    if(e.which == 114 || e.which == 82) window.location.href="http://www.metroplexity.com/rest.php";
    num = e.which-48;
    if(num<0||num>9) num = null;
    if (num == 0) num = 10;
    if(num!=null&&num<=map.areas.length){
        window.location.href=map.areas[num-1].href;
    }
}

if ((window.location.href) == "http://www.metroplexity.com/accountpref.php") {
    newspan = document.createElement("span")
    newspan.innerHTML='</br> <hr> </br> <b> man mobile\'s keyboard choice Options </b> </br> Indicator options: </br> <button type="button" id="indicatorbutton"> '+position+' </button> </br>'
    document.getElementsByName("change")[0].parentNode.insertBefore(newspan, document.getElementsByName("change")[0].nextSibling);

    document.getElementById('indicatorbutton').addEventListener('click', indicatorClick, false);
}