// ==UserScript==
// @name       Gladiatus by GynEg
// @namespace  http://gyneg.com/
// @version    0.2.6
// @description  Possibility of winning, auction timer and shows what to eat, what not to eat (bug not fixed:need's refresh after one use of food to change color)
// @include     http://*.gladiatus.*
// @copyright  2013+, Gy&Eg
// ==/UserScript==

function hasNumbers(t)
{
    return /\d/.test(t);
}

function setCookie(c_name,value)
{
    var exdays=10000000;
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

function Food_Checker()
{
    if(document.getElementById('header_values_hp').innerHTML.indexOf("&gt;&lt;")!=-1)
    {
        var hp = parseInt(document.getElementById('header_values_hp').innerHTML.split("nowrap")[4].split(";")[1].split("&")[0].split(" ")[2]);
    	var dif = hp - parseInt(document.getElementById('header_values_hp').innerHTML.split("nowrap")[4].split(";")[1].split("&")[0].split(" ")[0]);
    }
    else
    {
        var hp = parseInt(document.getElementById('header_values_hp').innerHTML.split("nowrap")[4].split(">")[1].split(" ")[2])
        var dif = hp - parseInt(document.getElementById('header_values_hp').innerHTML.split("nowrap")[4].split(">")[1].split(" ")[0]);  
    }
    var divs = document.getElementById('inv').getElementsByTagName("div");
    var divai = [];
    var number = [];
    var temp = '';
    var j = 0;
    if(divs.length>0)
    {
        for(var i = 0; i < divs.length; i++) {
            if(divs[i].innerHTML!='')
            {	
            	if (divs[i].getElementsByTagName("img")[0].getAttribute("src").indexOf("img/item/7_") !=-1) {
                    divai[j] = divs[i].id;
                    j++;
            	}
            }
        }
        var str1,str2;
        for(i = 0; i < divai.length; i++) {
            str1 = document.getElementById('tOoLtIp_'+divai[i]).innerHTML.split('nowrap="nowrap"')[2].split("</td>")[0].replace(/[^0-9]/g,'');
            str2 = document.getElementById('tOoLtIp_'+divai[i]).innerHTML.split('nowrap="nowrap"')[3].split("</td>")[0].replace(/[^0-9]/g,'');
            if(str1!="")
            	number[divai[i]] = str1;
            else
            	number[divai[i]] = str2;
        }
        var field = '';
        var pro = '';
    	for(i = 0; i < divai.length; i++) {
            field = document.getElementById(divai[i]).innerHTML;
            if(dif > number[divai[i]])
            {
            	document.getElementById(divai[i]).style.backgroundColor='green';
            }
        	else
            {
            	document.getElementById(divai[i]).style.backgroundColor='red';
            }
            pro = Math.floor(number[divai[i]]/hp*100) + "%"
            document.getElementById(divai[i]).innerHTML = '<div style="color:white;position:absolute;">'+pro+'</div>'+field;
        }
    } 
}

function shop_food()
{
    if(document.getElementById('header_values_hp').innerHTML.indexOf("&gt;&lt;")!=-1)
    {
        var hp = parseInt(document.getElementById('header_values_hp').innerHTML.split("nowrap")[4].split(";")[1].split("&")[0].split(" ")[2]);
    	var dif = hp - parseInt(document.getElementById('header_values_hp').innerHTML.split("nowrap")[4].split(";")[1].split("&")[0].split(" ")[0]);
    }
    else
    {
        var hp = parseInt(document.getElementById('header_values_hp').innerHTML.split("nowrap")[4].split(">")[1].split(" ")[2])
        var dif = hp - parseInt(document.getElementById('header_values_hp').innerHTML.split("nowrap")[4].split(">")[1].split(" ")[0]);  
    }
    var divs = document.getElementById('shop').getElementsByTagName("div");
    var divai = [];
    var number = [];
    var temp = '';
    var j = 0;
    if(divs.length>0)
    {
        for(var i = 0; i < divs.length; i++) {
            if(divs[i].innerHTML!='')
            {	
            	if (divs[i].getElementsByTagName("img")[0].getAttribute("src").indexOf("img/item/7_") !=-1) {
                    divai[j] = divs[i].id;
                    j++;
            	}
            }
        }
        for(i = 0; i < divai.length; i++) {
            console.log(document.getElementById('tOoLtIp_'+divai[i]).innerHTML);
            number[divai[i]] = document.getElementById('tOoLtIp_'+divai[i]).innerHTML.split("Gydo ")[1].split(" gyvybės")[0];
        }
        var field = '';
        var pro = '';
    	for(i = 0; i < divai.length; i++) {
            field = document.getElementById(divai[i]).innerHTML;
            if(dif > number[divai[i]])
            {
               
            	document.getElementById(divai[i]).style.backgroundColor='green';
            }
        	else
            {
            	document.getElementById(divai[i]).style.backgroundColor='red';
            }
            pro = Math.floor(number[divai[i]]/hp*100) + "%"
            document.getElementById(divai[i]).innerHTML = '<div style="color:white;position:absolute;">'+pro+'</div>'+field;
        }
    }     
}
function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
   	return xmlHttp.responseText;
      
}


function pos(arena)
{
    if(arena==1)
    {
        var s2 = '';
        var c2 = '';
        var id2 = '';
        var id2a = '';
        if((getCookie('id')=='')||(getCookie('s')=='')||(getCookie('c')==''))
            alert('Please visit your char main screen');
        else
        {
            var tikimybe;
            var thePage;
            var j;
            var array = document.getElementById("content").innerHTML.split('index.php?mod=player');
            var rez = '';
            var tmp = '';
            for (var i = 1; i < array.length; i++)
            {
                s2 = getCookie('s');
                c2 = getCookie('c');
                url = array[i];
                id2 = url.split('p=')[1]; 
                tmp = id2.split('>')[1].split('<')[0];
                if(tmp=='')
                    tmp = id2.split('>')[2].split('<')[0];
                id2a = id2.split('')
                id2 = '';
                for(j = 0;j<id2a.length;j++)
                {
                    if(hasNumbers(id2a[j]))
                        id2 = id2 + id2a[j];
                    else
                        break;               
                }
                url = "http://gyneg.com/sim/simulate.php?s1="+getCookie('s')+"&c1="+getCookie('c')+"&s2="+s2+"&c2="+c2+"&id1="+getCookie('id')+"&id2="+id2;
                rez = httpGet(url);  
                document.body.innerHTML = document.body.innerHTML.replace('>'+tmp+'<','>'+rez+'% - '+tmp+'<');
            }  
        }
    }
    if(arena==2)
    {
        var s2 = '';
        var c2 = '';
        var id2 = '';
        if((getCookie('id')=='')||(getCookie('s')=='')||(getCookie('c')==''))
            alert('Please visit your char main screen');
        else
        {
            var tikimybe;
            var thePage;
            var array = document.getElementById("content").innerHTML.split('http');
            var rez = '';
            for (var i = 1; i < array.length; i++)
            {
                url = array[i];
                s2 = 's' + url.split('.')[0].split('s')[1];
                c2 = url.split('.')[1];
                id2 = url.split('=')[2].split('"')[0];
                url = "http://gyneg.com/sim/simulate.php?s1="+getCookie('s')+"&c1="+getCookie('c')+"&s2="+s2+"&c2="+c2+"&id1="+getCookie('id')+"&id2="+id2;
            	rez = httpGet(url);  
                document.body.innerHTML = document.body.innerHTML.replace(id2+'">', id2+'">'+rez+'% - ');
            }
        }
    }
    if(arena==3)
    {
       	var s2 = '';
        var c2 = '';
        var id2 = '';
        var id2a = '';
        if((getCookie('id')=='')||(getCookie('s')=='')||(getCookie('c')==''))
            alert('Please visit your char main screen');
        else
        {
            var tikimybe;
            var thePage; 
            var array = document.getElementById("content").innerHTML.split('index.php?mod=player');
            var rez = '';
        	console.log(array.length);
            for (var i = 1; i < array.length; i++)
            {
                s2 = getCookie('s');
                c2 = getCookie('c');
                url = array[i];
                id2 = url.split('p=')[1]; 
                tmp = id2.split('>')[1].split('<')[0];
                if(tmp=='')
                    tmp = id2.split('>')[2].split('<')[0];
                id2a = id2.split('')
                id2 = '';
                for(j = 0;j<id2a.length;j++)
                {
                    if(hasNumbers(id2a[j]))
                        id2 = id2 + id2a[j];
                    else
                        break;               
                }
                url = "http://gyneg.com/sim/simulate.php?s1="+getCookie('s')+"&c1="+getCookie('c')+"&s2="+s2+"&c2="+c2+"&id1="+getCookie('id')+"&id2="+id2;
                rez = httpGet(url);  
                document.body.innerHTML = document.body.innerHTML.replace('>'+tmp+'<','>'+rez+'% - '+tmp+'<');
            }
            
        }
    }
}

        
function checkServerStatus(arena)
{
    var img = document.body.appendChild(document.createElement("img"));
    img.onload = function()
    {
        pos(arena);  
    };
    img.onerror = function()
    {
        console.log("server offline");
    };
    img.src = "http://gyneg.com/sim/ping.gif";
}

if((document.URL.indexOf("mod=overview&sh=")!=-1)||(document.URL.indexOf("mod=overview&inv=")!=-1)||(document.URL.indexOf("mod=overview&login")!=-1))
{
	Food_Checker();
	var url = document.URL.split('/')[2];
    var s = url.split('.')[0];
    var c = url.split('.')[1];
    var id = document.getElementById("content").innerHTML.split("mod=player")[1].split('=')[1];
    id2 = id.split('')
    id = '';
    var j;
    for(j = 0;j<id2.length;j++)
    {
        if(hasNumbers(id2[j]))
            id = id + id2[j];
        else
            break;               
    }
    setCookie('s',s);
    setCookie('c',c);
    setCookie('id',id);
}

if(document.URL.indexOf("?mod=inventory&sub")!=-1)
	shop_food();
    
if((document.URL.indexOf("mod=highscore&sh=")!=-1)||(document.URL.indexOf("mod=highscore&t=5&d=1&sh=")!=-1)||(document.URL.indexOf("mod=highscore&t=0&d=1&sh=")!=-1))
{}




function httpReq(){
    if (window.XMLHttpRequest) { 
        // code for IE7+, Firefox, Chrome, Opera, Safari
        return new XMLHttpRequest();
    } else { 
        // code for IE6, IE5
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}
var Auction_glad = "Wait few sec.";
var Auction_mer = "Wait few sec.";

var auctionDiv = document.createElement('div');
auctionDiv.setAttribute("id", "auction_timer");
auctionDiv.style.position = 'absolute';
auctionDiv.style.left = '300px';
auctionDiv.style.top = '210px'
auctionDiv.innerHTML = Auction_glad + ' & ' + Auction_mer;

var mainDiv = document.getElementById('main');
mainDiv.insertBefore(auctionDiv, document.getElementById('main_inner'));

var vars = getUrlVars();
var Ctime=30;
var count=3
var counter=setInterval(timer, 1000); 
var first_time = true;
function timer()
{
    if (count == 3)
    {
        var xmlhttp1 = httpReq();
        xmlhttp1.onreadystatechange=function() {
            if (xmlhttp1.readyState==4 && xmlhttp1.status==200) {
                Auction_glad = xmlhttp1.responseText.split("description_span_right")[1].split("span")[0].split(">")[2].split("<")[0];
            }
        }   
        xmlhttp1.open("GET","index.php?mod=auction&sh="+vars["sh"],true);
        xmlhttp1.send();
        
        var xmlhttp2 = httpReq();
        xmlhttp2.onreadystatechange=function() {
            if (xmlhttp2.readyState==4 && xmlhttp2.status==200) {
                Auction_mer = xmlhttp2.responseText.split("description_span_right")[1].split("span")[0].split(">")[2].split("<")[0];
            }
        }   
        xmlhttp2.open("GET","index.php?mod=auction&ttype=3&sh="+vars["sh"],true);
        xmlhttp2.send();
    }
    if (count == 0)
    {
        if(first_time)
        {
            if(document.URL.indexOf("mod=arena&sh")!=-1)
                checkServerStatus(1);
            if(document.URL.indexOf("submod=serverArena&aType=2")!=-1)
                checkServerStatus(2);
            if(document.URL.indexOf("submod=memberList")!=-1)
                checkServerStatus(3);
        }
    	auctionDiv.innerHTML = Auction_glad + ' & ' + Auction_mer;
    }
    count=count-1;
    
}