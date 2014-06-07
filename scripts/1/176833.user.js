// ==UserScript==
// @name        User-Ignore
// @namespace   worldoftanks.ru
// @include     http://forum.worldoftanks.ru/*
// @version     1.2.1
// ==/UserScript==

function str_str(){
var _r = {obj:false, von: 0, bis: 0, _pause: 0};
var NAZVA = {
    /////// настройки ///////
    fname: ["Wossad","LIV"],       // Имя неугодного(-ых) пользователя(-ей), через запятую: ["user","admin"]
    fimage: [1638],             // Номер(-a) неугодного(-ых) аватаров, через запятую: [123,321]
    fimage_cens: "http://img26.imageshack.us/img26/5012/censoredlarge.gif", // картинка замешение
    fname_color: '#FFAAAA',     // Цвет неугодного пользователя
    fname_hidde: true,          // Неугодный пользователь изначально свернут?
    online: true,               // Подкрашивать пользователей Online?
    online_color: '#EEFEEE',    // Цвет пользователей Online
    who_online: 0,             // Обновлять информацию "кто Online" в табличке каждые Х сек. 0 = не использовать
    snow_show: false,           // "Идет снег" (true, false)
    /////// конец  ///////
    _onlineTable: null,
    _newTable: null,
    
    init: function ()
    {

        var autors = $$(".author");
       for(i=0;i<autors.length;i++)
        {
                for(j=0;j<this.fname.length;j++)
                {
                    //if(document.links[i].innerHTML == this.fname[j])
                    if(autors[i].itemValue.trim() == this.fname[j])
                    {
                        this.createLink(autors[i], i, j);
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

    },
    
    createLink: function (link, i, j)
    {
        var ftable = link.parentNode.parentNode.parentNode;;
        console.log(ftable);
        
        ftable.style.backgroundColor = this.fname_color;
  
        var fa_el = document.createElement('a');
        fa_el.innerHTML = ' # Спрятать # ';
        fa_el.href = 'javascript:NAZVA.fhide('+i+', '+j+');';  
        ftable.parentNode.insertBefore(fa_el, ftable);

        if(this.fname_hidde)
            this.fhide(i, j);
        
        ftable.style.overflow = 'hidden';
    },
    
    getOlnine: function()
    {
    	//NAZVA._onlineTable.innerHTML = 'Ожидаю ответа сервера...';
    },
    
    getNew: function()
    {
    	//NAZVA._newTable.innerHTML = 'Ожидаю ответа сервера...';
    },
    
    fhide: function(i, j)
    {
        var autors = $$(".author");
        
        var ftable = autors[i].parentNode.parentNode.parentNode;
        var el = ftable.previousSibling

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
        var autors = $$(".author");

        var ftable = autors[i].parentNode.parentNode.parentNode;
        var el = ftable.previousSibling;

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
    {
    _r.obj.style.width = 'auto';
        return;
    }
    
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
str_str.toString().substr(18)+"\n"+ //attach our load function + execute function
'NAZVA.init();'
/*
console.log(_script);
return;*/

document.body.appendChild(_script); //inject the script