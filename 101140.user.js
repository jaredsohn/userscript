// ==UserScript==
// @name           Smekalka User hidden
// @namespace      Smekalka
// @description    user hidden
// @include        http://www.smekalka.pp.ru/forum/index.php*
// @version        1.0.0
// ==/UserScript==

function str_str() {
var _r = {obj:false, von: 0, bis: 0, _pause: 0};
var NAZVA = {
    fname: ["CD_Eater"],       // Имя неугодного(-ых) пол'зователя(-ей), через запятую: ["user","admin"]
    cool: false,
    
    fimage: [1638],             // Номер(-a) неугодного(-ых) аватаров, через запятую: [123,321]
    fimage_cens: "http://img26.imageshack.us/img26/5012/censoredlarge.gif", // картинка замешение
    fname_color: '#FFAAAA',     // Цвет неугодного пол'зователя
    fname_hidde: true,          // Неугодный пол'зовател' изначал'но свернут?
    online: true,               // Подкрашиват' пол'зователей Online?
    online_color: '#EEFEEE',    // Цвет пол'зователей Online
    who_online: 15,              // Обновлят' информацию "кто Online" в табличке каждые Х сек. 0 = не испол'зоват'
    
    
    
    _onlineTable: null,
    _newTable: null,
    
    init: function ()
    {
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
                //document.body.style.opacity = '0.4';
            };
            
            this._onlineTable.onmouseout = function() {
                this.style.overflow = 'hidden';
                this.style.opacity = '0.5';
                //document.body.style.opacity = '1';
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
                //document.body.style.opacity = '0.4';
            };
            
            this._newTable.onmouseout = function() {
                this.style.overflow = 'hidden';
                this.style.opacity = '0.5';
                //document.body.style.opacity = '1';
            };
            
            this._newTable.innerHTML = '...';
    
        	document.body.appendChild(this._newTable);
            
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
        if(this.cool)
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
        if(this.cool)
            _rotate();
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
    //_r.obj.style.width = (918 - _r.von * 5) + 'px';
        
    if(_r.von == _r.bis)
        return;
    
    if(_r.von < _r.bis)
        _r.von = _r.von + 5;
    else
        _r.von = _r.von - 5;

    setTimeout(_rotate, _r._pause);
}
    

} //str_str

//////////////////
var _script = document.createElement("script"); //create new <script> element
_script.id = '_script';
_script.text =""+ //closure function
str_str.toString().substr(18)+"\n"+ //attach our load function
''+ //execute closure function
'NAZVA.init();'

document.body.appendChild(_script); //inject the script

