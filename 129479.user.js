// ==UserScript==
// @name           Teclado en pantalla
// @namespace      *
// @include        *
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function init() {  
var head = document.getElementsByTagName('head')[0],
style = document.createElement('style'),
rules = document.createTextNode('.vk_key{ -moz-user-select:none;  background:none repeat scroll 0 0 #DDD;  border-radius:0.7em 0.7em 0.7em 0.7em;  box-shadow:0.1em 0.2em 0.3em 0 black;  float:left;  height:5em;  margin:0.5em;  text-align:center;  vertical-align:bottom;  width:5em; user-select:none} .vk_key span{ display:block;  font-size:1.4em;  font-weight:bold;  margin-top:1.1em; user-select:none} .mayus{ text-transform:uppercase} .vk_key span img{ height:1.5em} .vk_pressed{ background:none repeat scroll 0 0 #AAA;  box-shadow:0 0 0.3em 0 black;  margin:0.7em 0.4em 0 0.6em} .vk_before_a{ float:left;  margin-left:3em;  width:0.1em} .clear{ clear:both} #vk_board{ font-size:14px; } #vk_bs{ width:11.1em !important} #vk_enter{ width:8em} #vk_space{ width:70.7em} #vk_text{ font-size:36px;  height:50%;  width:100%;  font-weight:bold} .vk_numeric{display:none; text-shadow:1px 1px 1px rgba(0,0,0,.4); color:blue; float:left} .vk_letter{float:left} .vk_board{background:none repeat scroll 0 0 #666;  border-color:black;  border-radius:10px 10px 0 0;  border-style:solid solid none;  border-width:1px 1px 0;  bottom:-346px;  height:346px;  box-shadow:0 0 4px #000;  font-family:Tahoma;  font-size:0.9em;  left:110px;  position:fixed;  z-index: 99999; width:1010px; -webkit-user-select:none; user-select:none} #blf{background:transparent; width:100px; height:100px; position:absolute; top:0; left:0} #bri{background:transparent; width:100px; height:100px; position:absolute; top:0; right:0}');
style.type = 'text/css';
if(style.styleSheet)
    style.styleSheet.cssText = rules.nodeValue;
else style.appendChild(rules);
head.appendChild(style);

VirtualKeyboard = function(elmn_id){            
            var cursound=0;
            var vkshift = false;
            var tempkey = "";
            var oVK = this;
            var board; // = $("#vk_board")[0];//.clone().attr('id', '').appendTo('body')[0]; // Super Alpha!
            
            var elmnfocused = false;
            var tocf = 0; // timeout del checkfocus
            var active = false;
            var carretpos = 0;
            var mover = false;
        //    console.log(elmn_id);
        
//var vk_html = '<div id="vk_board" class="vk_board">';
var vk_html ='<div class="vk_letter">';
vk_html +='        <div class="vk_key" key="q"><span>q</span></div>';
vk_html +='        <div class="vk_key" key="w"><span>w</span></div>';
vk_html +='        <div class="vk_key" key="e"><span>e</span></div>';
vk_html +='    </div>';
vk_html +='    <div class="vk_numeric">';
vk_html +='        <div class="vk_key" key="7"><span>7</span></div>';
vk_html +='        <div class="vk_key" key="8"><span>8</span></div>';
vk_html +='        <div class="vk_key" key="9"><span>9</span></div>';
vk_html +='    </div>';
vk_html +='    <div class="vk_key" key="r"><span>r</span></div>';
vk_html +='    <div class="vk_key" key="t"><span>t</span></div>';
vk_html +='    <div class="vk_key" key="y"><span>y</span></div>';
vk_html +='    <div class="vk_key" key="u"><span>u</span></div>';
vk_html +='    <div class="vk_key" key="i"><span>i</span></div>';
vk_html +='    <div class="vk_key" key="o"><span>o</span></div>';
vk_html +='    <div class="vk_key" key="p"><span>p</span></div>';
vk_html +='    <div class="vk_key" id="vk_bs" key="backspace" style="text-transform: none;"><span>Backspace</span></div>';
vk_html +='    <div class="clear"></div>';
vk_html +='    <div class="vk_before_a" >&nbsp;</div> ';    
vk_html +='<div class="vk_letter">';
vk_html +='        <div class="vk_key" key="a"><span>a</span></div>';
vk_html +='        <div class="vk_key" key="s"><span>s</span></div>';
vk_html +='        <div class="vk_key" key="d"><span>d</span></div>';
vk_html +='    </div>';
vk_html +='    <div class="vk_numeric">';
vk_html +='        <div class="vk_key" key="4"><span>4</span></div>';
vk_html +='        <div class="vk_key" key="5"><span>5</span></div>';
vk_html +='        <div class="vk_key" key="6"><span>6</span></div>';
vk_html +='    </div>';
vk_html +='    <div class="vk_key" key="f"><span>f</span></div>';
vk_html +='    <div class="vk_key" key="g"><span>g</span></div>';
vk_html +='    <div class="vk_key" key="h"><span>h</span></div>';
vk_html +='    <div class="vk_key" key="j"><span>j</span></div>';
vk_html +='    <div class="vk_key" key="k"><span>k</span></div>';
vk_html +='    <div class="vk_key" key="l"><span>l</span></div>';
vk_html +='    <div class="vk_key" key="ñ"><span>ñ</span></div>';
vk_html +='    <div class="vk_key" id="vk_enter" key="enter" style="text-transform: none;"><span>Enter</span></div>';
vk_html +='    <div class="clear"></div>';
vk_html +='    <div class="vk_key" key="shift"><span>Shift</span></div>';    
vk_html +='    <div class="vk_letter">';
vk_html +='        <div class="vk_key" key="z"><span>z</span></div>';
vk_html +='        <div class="vk_key" key="x"><span>x</span></div>';
vk_html +='        <div class="vk_key" key="c"><span>c</span></div>';
vk_html +='    </div>';
vk_html +='    <div class="vk_numeric">';
vk_html +='        <div class="vk_key" key="1"><span>1</span></div>';
vk_html +='        <div class="vk_key" key="2"><span>2</span></div>';
vk_html +='        <div class="vk_key" key="3"><span>3</span></div>';
vk_html +='    </div>';
vk_html +='    <div class="vk_key" key="v"><span>v</span></div>';
vk_html +='    <div class="vk_key" key="b"><span>b</span></div>';
vk_html +='    <div class="vk_key" key="n"><span>n</span></div>';
vk_html +='    <div class="vk_key" key="m"><span>m</span></div>';
vk_html +='    <div class="vk_key" key="."><span>.</span></div>';
vk_html +='    <div class="vk_key" key="."><span>,</span></div>';
vk_html +='    <div class="vk_key" key="shift" style="width: 10.9em;"><span>Shift</span></div>';
vk_html +='    <div class="clear"></div>';
vk_html +='    <div class="vk_key" id="vk_space" key=" "><span></span></div>';
vk_html +='    <div class="clear"></div>';
//vk_html +='</div>';
board = $('<div>').html(vk_html).attr('id', 'vk_board').addClass('vk_board').appendTo('body');
//console.log(board);
            function getCarretPos(o) {
                if (o.createTextRange) {
                    var r = document.selection.createRange().duplicate()
                    r.moveEnd('character', o.value.length)
                    if (r.text == '') return o.value.length
                    return o.value.lastIndexOf(r.text)
                } else 
                return o.selectionStart
            }
        
            function setCarretPos(o, cp){
                o.selectionStart = cp;
                   o.selectionEnd = cp;
            }
            
            this.getAllInputs = function()
            {
                var elms = $('input');
                elms.push($('textarea'));
                elms.each(function(index){
                    elm=this;
                    if (elm.attr('vk')!='active')
                    {
                        oVK.addElement(elm);
                    }
                })
            }    
            
            this.addElement = function(elm)
            {
                if (elm.vk == undefined) {
                elm.vk=true;
                elm.addEventListener('focus',function () {
                    oVK.textelement=this;                
                    if (active) {
                        if (tocf>0) clearTimeout(board.tocf);
                        tocf = 0;
                    }
                    else
                    {
                        oVK.show();
                        //console.log(this);
                    }
                    elmnfocused = true;                
                },false)

                elm.addEventListener('blur',function () {
                    carretpos=getCarretPos(this);
                    elmnfocused=false;
                    tocf = setTimeout(function() { if (!elmnfocused && !mover) { oVK.hide();    } }, 500);            
                },false)
            }
            }
            
            this.init = function() {
                //console.log('init called');
                if (elmn_id != undefined) {                
                    this.addElement(elmn_id);
                    this.textelement = elmn_id;            
                }
                else
                {                
                    $(":input").each(function(index){
                        oVK.addElement(this);
                    })
                    setTimeout(oVK.init, 2000);
                }
            }
            
            
            this.init();
            
            
            
            this.show = function() {
                board.vk = oVK;
                if (active == false) $(board).animate({bottom: 0}, 500);                
                active = true;                
            }

            this.hide = function() {
                board.vk = oVK;                
                if (active == true) $(board).animate({bottom: -344}, 500);
                active = false;
                elmnfocused = false;
            }

            this.onkeypress = function(e) {
                var s=getCarretPos(this.textelement);
                var t = this.textelement.value;
                var after = t.substring(s);
                var before = t.substring(0, s);

                switch (e)
                {
                    case "shift":
                    if (vkshift) { e=e.toUpperCase(); vkshift=false; board.style.textTransform=""; }
                    else { board.style.textTransform="uppercase"; vkshift=true; }
                    break;
                    case "backspace":
                        if (s>0){
                            before=t.substring(0, s-1);
                            this.textelement.value=before+after;
                            carretpos--;
                            setCarretPos(this.textelement, carretpos);
                        }
                    break;
                    case "enter":
                        /*
                         * Movida ENTER        
                         */    
                        e="\n"
                        this.textelement.value=before+e+after;
                        carretpos++;
                        setCarretPos(this.textelement, carretpos);                
                    break;
                    case "numeric":
                        $('.vk_num').attr('key', 'letters');
                        $('.vk_num').children(0).text('ABC');
                        $('.vk_numeric').css('display', 'block');
                        $('.vk_letter').css('display','none');
                    break;
                    case "letters":
                        $('.vk_num').attr('key', 'numeric');
                        $('.vk_num').children(0).text('123');
                        $('.vk_numeric').css('display', 'none');
                        $('.vk_letter').css('display','block');
                    break;
                    default:
                        if (vkshift) { e=e.toUpperCase(); vkshift=false; board.style.textTransform=""; }
                        //if (this.textelement.value.length==0) {e=e.toUpperCase();}
                        this.textelement.value=before+e+after;
                        carretpos=carretpos+e.length;
                        setCarretPos(this.textelement, carretpos);        
                    break;
                    
                }
            }

$(board).click(function() { 
    
});

$(board).mouseover(function() { 
    mover=true;
    oVK.textelement.focus(); 
});
$(board).mouseout(function() { 
    mover = false;
});

$('.vk_key').each(function(index) {
                for (attr in $(this)[0].attributes)
                {
                    if ($(this)[0].attributes[attr].nodeName == "key")
                    {                        
                        $(this)[0].addEventListener('mousedown',function () { 
                            if (this.attributes["class"].nodeValue.indexOf("vk_pressed")==-1) this.attributes["class"].nodeValue+=" vk_pressed";                                                    
                            tempkey = this.attributes["key"].nodeValue;
                            //document.getElementById("vk_sound"+cursound).play(); Despues agregar sonido ACA!
                            board.vk.onkeypress(this.attributes["key"].nodeValue);    
                            cursound++;
                            if (cursound>6) cursound=0;
                        },false)
                        $(this)[0].addEventListener('mousemove',function () { 
                            if (this.attributes["class"].nodeValue.indexOf("vk_pressed")==-1) this.attributes["class"].nodeValue+=" vk_pressed";                                                    
                        },false)
                        $(this)[0].addEventListener('mouseout',function () { 
                            this.attributes["class"].nodeValue=this.attributes["class"].nodeValue.replace(" vk_pressed", "");                                                    
                        },false)
                        
                        $(this)[0].addEventListener('mouseup',function () { 
                            this.attributes["class"].nodeValue=this.attributes["class"].nodeValue.replace(" vk_pressed", "");                                                    
                        },false)
                        break;
                    }
                }
})

            
            
}
    if (window.VK == undefined) {
        window.VK = new VirtualKeyboard();
    }
}
addJQuery(init);