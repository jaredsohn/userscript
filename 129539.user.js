// ==UserScript==
// @name           Element Info
// @namespace      Element Info
// @include        *
// @version        0.0.1
// ==/UserScript==


function clog(string)
{
    console.log(string);
}

//main class
var einfo={
    ge:null,
    boxdiv:null,
    div_style:"opacity: 0.8;filter:alpha(opacity=80);position:absolute;display:none;z-index:1000;border-left:solid 2px #AA0000;border-top:solid 2px #AA0000;border-right:solid 2px #AA0000;border-bottom:solid 2px #AA0000;background-color:#000000;padding: 2pt 3pt 2pt 3pt;color: #ffffff;font-size: 12px;text-align:left;",
    board_style:"display:none;overflow:hidden;position:absolute;height:2px;width:2px;z-index:1000;",
    cur_pos:{x:0,y:0},
    boards:null,
    flag_showbox:true,
    flag_moded:false,
    
    create_elements:function (){//create elements
        //create 4 elements for point the boundary of current element
        this.boards=new Array();
        var addionstyle=["border-top:2px solid #FF0000;","border-bottom:2px solid #FF0000;","border-left:2px solid #FF0000;","border-right:2px solid #FF0000;"];
        var d;
        for (i = 0; i < 4; i++) {
            d = document.createElement ("DIV");
            d.setAttribute("style", this.board_style+addionstyle[i]);
            document.body.appendChild(d);
            this.boards[i] = d;
        }

        //1 element for showing element info
        d = document.createElement("DIV");
        d.setAttribute("style", this.div_style);
        d.id = "elementinfoview";
        document.body.appendChild(d);
        this.boxdiv = d;
    },
    
    findValidElement:function(elem) {//form Aardvark
        var alwaysValidElements = {DIV: 1,IFRAME: 1, OBJECT: 1, APPLET: 1, BLOCKQUOTE: 1, H1: 1, H2: 1, H3: 1, FORM: 1, P: 1, TABLE: 1, TD: 1, TH: 1, TR: 1, IMG: 1};
        var validIfBlockElements = { SPAN: 1, A: 1 };
        var validIfNotInlineElements = { UL: 1, LI: 1, OL: 1, PRE: 1, CODE: 1 };
        while (elem) {
            if (alwaysValidElements[elem.tagName])
                return elem;
            else if (validIfBlockElements[elem.tagName]) {
                if (document.defaultView) {
                    if (document.defaultView.getComputedStyle
                            (elem, null).getPropertyValue("display") == 'block')
                        return elem;
                }
                else if (elem.currentStyle) {
                    if (elem.currentStyle["display"] == 'block')
                        return elem;
                }
            }
            else if (validIfNotInlineElements[elem.tagName]) {
                if (document.defaultView) {
                    if (document.defaultView.getComputedStyle
                            (elem, null).getPropertyValue("display") != 'inline')
                        return elem;
                }
                else if (elem.currentStyle) {
                    if (elem.currentStyle["display"] != 'inline')
                        return elem;
                }
            }
            elem = elem.parentNode;
        }
        return elem;
    },
    
    getpos:function(e) {//form Aardvark
        var originaleent = e;
        var pos={x:0,y:0};
        if (e.offsetParent) {
            while (e.offsetParent) {
                pos.x += e.offsetLeft;
                pos.y += e.offsetTop;

                if (e != originaleent && e != document.body && e != document.documenteent) {
                    pos.x -= e.scrollLeft;
                    pos.y -= e.scrollTop;
                }
                e = e.offsetParent;
            }
        }
        else if (e.x) {
            pos.x += e.x;
            pos.y += e.y;
        }
        return pos;
    },

    moveelement:function (o, x, y) {//form Aardvark
        o.style.left = x + "px";
        o.style.top = y + "px";
    },

    showbox:function (e) {//show boundary
        var pos = this.getpos(e);
        var y = pos.y;

        this.moveelement (this.boards[0], pos.x, y);
        this.boards[0].style.width = e.offsetWidth + "px";
        this.boards[0].style.display = "inline";

        this.moveelement (this.boards[1], pos.x, y + e.offsetHeight - 2);
        this.boards[1].style.width = (e.offsetWidth + 2)  + "px";
        this.boards[1].style.display = "inline";

        this.moveelement (this.boards[2], pos.x, y);
        this.boards[2].style.height = e.offsetHeight  + "px";
        this.boards[2].style.display = "inline";

        this.moveelement (this.boards[3], pos.x + e.offsetWidth - 2, y);
        this.boards[3].style.height = e.offsetHeight + "px";
        this.boards[3].style.display = "inline";
        
        return pos;
    },

    hideBox:function (){//hide boundary
        this.boards[0].style.display = "none";
        this.boards[1].style.display = "none";
        this.boards[2].style.display = "none";
        this.boards[3].style.display = "none";
        this.flag_showbox = false;
    },
    
    div_hide:function() {//hide info window
        this.flag_showbox = true;
        this.boxdiv.style.display = "none";
    },
    
    viewlinks:function () {//show links

        if (this.ge)
        {
            this.hideBox();
            var cells = this.ge.getElementsByTagName('a');
            var html = "";        
            this.div_setpos(this.cur_pos);

            if (cells && cells.length)
            {
                for (var i = 0; i < cells.length; i++) {
                    html += cells[i].href + '\n';
                }
            }
            else
                html += 'no link';
            this.div_show(html);
        }
    },

    viewsource:function () {//show source
        
        if (this.ge)
        {
            this.hideBox();
            this.div_setpos(this.cur_pos);
            this.div_show(this.ge.innerHTML);
        }
    },

    div_show:function (src) {//show info window
        var inhtml = '<p><form><input id="close" type=button value="close"><input id="source" type=button value="source"><input id="links" type=button value="links"><input type=button id="select" value="select"><br>';
        inhtml+= '<Textarea style="height:300px;width:300px;">'+src+'</Textarea></form>';
        this.boxdiv.innerHTML = inhtml;
        var nodes = this.boxdiv.getElementsByTagName('input');
        var nodes_ta= this.boxdiv.getElementsByTagName('Textarea');
        for(i=0;i<nodes.length;i++)
        {
            if(nodes[i].id=="close")
            {
                nodes[i].addEventListener('click', function(){einfo.div_hide()}, false);
            }
            else if(nodes[i].id=="source")
            {
                nodes[i].addEventListener('click', function(){einfo.viewsource()} , false);
            }
            else if(nodes[i].id=="links")
            {
                nodes[i].addEventListener('click', function(){einfo.viewlinks()} , false);
            }
            else if(nodes[i].id=="select")
            {
                nodes[i].addEventListener('click', nodes_ta[0].select , false);
            }
        }
        this.boxdiv.style.width = "auto";
        this.boxdiv.style.height = "auto";
        this.boxdiv.style.display = "inline";
    },

    div_setpos:function (pos){//set position of info window
        if(this.boxdiv.style.display == "inline")
            return;
        
        this.boxdiv.style.left = pos.x+ "px";
        this.boxdiv.style.top = pos.y + "px";
    },
    
    on_mousemove:function(e) {
        if(e.target!=this.ge)
            this.flag_moded = false;
        else
            this.flag_moded = true;
        return;
    },

    on_mouseover:function(e) {
        if (!keyevent.oswitch || this.flag_moded || this.boxdiv.style.display=="inline")
            return;

        if (this.flag_showbox && this.findValidElement(e.target) && e.target.nodeType == 1  && e.target != this.ge)
        {
            this.cur_pos=this.showbox(e.target);
            this.ge = e.target;
        }
    },
    
    init:function(){
        this.create_elements();
        document.addEventListener('mouseover', function(e){einfo.on_mouseover(e)}, false);    
        document.addEventListener('mousemove', function(e){einfo.on_mousemove(e)}, false);
    },

    uninit:function() {
        document.removeEventListener('mouseover', function(e){einfo.on_mouseover(e)}, false);    
        document.removeEventListener('mousemove', function(e){einfo.on_mousemove(e)}, false);
    },
};

//proc keyboard event
var keyevent = {
    cnt:0,
    flag:false,
    oswitch:false,
    proc:function(e) {

        if (e.charCode == 118)//118='v'
        {
            //list links
            if (this.oswitch)
                einfo.viewlinks();
        }
        else if (e.charCode == 115)//115='s'
        {
            //list source
            if (this.oswitch)
                einfo.viewsource();
        }
        else if (e.charCode == 101)//101='e'
        {
            this.cnt++;
            if(this.cnt==2)
            {
                //on/off
                this.oswitch = this.oswitch ? false : true;
                clog(this.oswitch?"true":"false");
                if (!this.oswitch)
                {
                    einfo.hideBox();
                    einfo.div_hide();
                }
            }
        }
        else if (e.charCode == 113)//113='q'
        {
            this.oswitch=false;
            this.cnt=0;
            einfo.hideBox();
            einfo.div_hide();
        }
        else
            this.cnt=0;
    }
};

//start
window.addEventListener("load",   function(){einfo.init()},   false);
window.addEventListener("unload", function(){einfo.uninit()}, false);
// Add keypress event handler
document.addEventListener('keypress', function(e){keyevent.proc(e)}, false);
