// ==UserScript==
// @name           Renren reply context
// @description    Show context of renren replys
// @author         yxnsu
// @include        http://blog.renren.com/*
// @version        1.5
// ==/UserScript==

//utilities


var funcs = new Array(
function ltrim(str){
    return str.replace(/(^\s*)/g,'');
},
function startswith(str,beg){
    if(str.length < beg.length)
        return false;
    for(var i=0;i<beg.length;i++)
        if(str[i]!=beg[i]){
            return false;
        }
    return true;
},
function min(a,b){
    if(a<b)return a;
    return b;
},
function pageX(elem) {//获取元素相对于整个文档的X位置的函数； 
    var p = 0; 
    while ( elem.offsetParent ) { 
        p += elem.offsetLeft; 
        elem = elem.offsetParent; 
    } 
    return p; 
},
function pageY(elem){ //获取元素相对于整个文档的Y位置的函数； 
    var p = 0; 
    while ( elem.offsetParent ) { 
        p += elem.offsetTop; 
        elem = elem.offsetParent; 
    } 
    return p; 
},
function in_array(str,arr){
    for(var i=0;i<arr.length;i++){
        if(str==arr[i])
            return true;
    }
    return false;
},
function some_in_array(a1,a2){
    for(var i=0;i<a1.length;i++)
        if(in_array(a1[i],a2))
            return true;
    return false;
},
function close_context(id){
    var it = document.getElementById("context_"+id);
    if(it!=null){
        if(it.style.backgroundColor == "rgb(230, 239, 247)")
            it.parentNode.removeChild(it);
    }
},
function toggle_context(id){
    var it = document.getElementById("context_"+id);
    if(it!=null)
        if(it.style.backgroundColor == "rgb(230, 239, 247)"){
            it.style.backgroundColor = "rgb(200, 209, 217)";
        }else{
            it.style.backgroundColor = "rgb(230, 239, 247)";
        }
},
function show_float(id,x,y,content){
    var it = document.getElementById(id);
    if(it==null){
        element = document.createElement('div');
        element.innerHTML = content;
        element.id = id;
        element.style.left = x;
        element.style.top = y;
        element.style.position = "absolute";
        element.style.backgroundColor = "rgb(230, 239, 247)";
        //element.style.height="50px";
        element.style.width ="300px";
        element.style.padding="5px";
        document.body.appendChild(element);
    }
},
function get_from_name(dd){
    var a_list = dd.getElementsByTagName("div")[0].getElementsByTagName("a");
    for(var i=0;i<a_list.length;i++)
        if(a_list[i].className!="x-to-hide"){
            return ltrim(a_list[i].innerHTML);
        }
    // return ltrim(dd.getElementsByTagName("div")[0].getElementsByTagName("a")[0].innerHTML);
},
function get_to_name(dd){
    var ret = -1;
    var divs = dd.getElementsByTagName("div");
    if(divs.length<2)return -1;
    var ps = divs[1].getElementsByTagName("p");
    if(ps.length<1)return -1;
    var text = ltrim(ps[0].innerHTML);
    //var text = ltrim(dd.getElementsByTagName("div")[1].getElementsByTagName("p")[0].innerHTML);
    if(startswith(text,"回复")){
        var p1 = text.indexOf(":");
        var p2 = text.indexOf("：");
        if(p1==-1 && p2==-1){
            ret = -1;
        }else if(p1==-1){
            ret = text.substr(2,p2-2);
        }else if(p2==-1){
            ret = text.substr(2,p1-2);
        }else{
            ret = text.substr(2,min(p1,p2)-2);
        }
    }
    return ret;
},
function get_at_names(dd){
    var ret = new Array();
    var divs = dd.getElementsByTagName("div");
    if(divs.length<2)return ret;
    var ps = divs[1].getElementsByTagName("p");
    if(ps.length<1)return ret;
    var a_list = ps[0].getElementsByTagName("a");
//    var a_list = dd.getElementsByTagName("div")[1].getElementsByTagName("p")[0].getElementsByTagName("a");
    for(var i=0;i<a_list.length;i++){
        var linktxt = ltrim(a_list[i].innerHTML);
        if(startswith(linktxt,"@"))
            ret.push(linktxt.substr(1));
    }
    return ret;
},
function get_reply_without_to(dd){
    var text = ltrim(dd.getElementsByTagName("div")[1].getElementsByTagName("p")[0].innerHTML);
    if(startswith(text,"回复")){
        var p1 = text.indexOf(":");
        var p2 = text.indexOf("：");
        if(p1==-1 && p2==-1){
            return text;
        }else if(p1==-1){
            return text.substr(p2+1);
        }else if(p2==-1){
            return text.substr(p1+1);
        }else{
            return text.substr(min(p1,p2)+1);
        }
    }else{
        return text;
    }
},
function show_context(id){
    //get information of dd correspond to given id
    var dd = document.getElementById(id);
    var from_name = get_from_name(dd);
    var to_name   = get_to_name(dd);
    var at_names  = get_at_names(dd);
    if(to_name!=-1)
        at_names.push(to_name);
    var id="context_"+dd.id;
    var posx=(pageX(dd)+470)+"px";
    var posy=pageY(dd)+"px";

    //collect information from other reply
    var context = "";

    var dl_list = document.getElementsByTagName("dl");
    for(var i=0;i<dl_list.length;i++){
        var dl = dl_list[i];
        if(dl.className!="replies") continue;
        var dd_list = dl.getElementsByTagName("dd");
        for(var j=0;j<dd_list.length;j++){
            var dd = dd_list[j];

            var fn = get_from_name(dd);
            var tn = get_to_name(dd);
            var an = get_at_names(dd);
            if(tn!=-1)
                an.push(tn);
            else
                tn=""
            
            if(in_array(from_name,an) && in_array(fn,at_names)){
                context = context + '<a onclick="window.scrollTo(0,'+pageY(dd)+');" href="javascript:;"><b>'+fn+' &#8594 '+tn+'</b></a><br/>\n';
                context = context + get_reply_without_to(dd)+"<br/>\n";
            }
            else 
            if( fn==from_name && some_in_array(at_names,an) ){
                context = context + '<a onclick="window.scrollTo(0,'+pageY(dd)+');" href="javascript:;"><b>'+fn+' &#8594 '+tn+'</b></a><br/>\n';
                context = context + get_reply_without_to(dd)+"<br/>\n";
            }
        }
    }

    show_float(id,posx,posy,context);
},
function add_context_link(){
    //traversal DOM and add a context link
    var dl_list = document.getElementsByTagName("dl");
    for(var i=0;i<dl_list.length;i++){
        var dl = dl_list[i];
        if(dl.className!="replies") continue;
        var dd_list = dl.getElementsByTagName("dd");
        for(var j=0;j<dd_list.length;j++){
            var dd = dd_list[j];
            var div_list = dd.getElementsByTagName("div");
            if(get_to_name(dd)==-1 && get_at_names(dd).length==0)
                continue;
            div_list[1].innerHTML = div_list[1].innerHTML+'<a onmousedown="toggle_context(\''+dd.id+'\');" onmouseout="close_context(\''+dd.id+'\');" onmouseover="show_context(\''+dd.id+'\');" href="javascript:;">[&#161]</a>';
        }
    }

    var more_but = document.getElementById('showMoreComments');
    more_but.setAttribute("onclick","Blog.showMoreComments(); add_context_link(); return false;");
}
);



function ltrim(str){
    return str.replace(/(^\s*)/g,'');
}
function startswith(str,beg){
    if(str.length < beg.length)
        return false;
    for(var i=0;i<beg.length;i++)
        if(str[i]!=beg[i]){
            return false;
        }
    return true;
}
function min(a,b){
    if(a<b)return a;
    return b;
}
function pageX(elem) {//获取元素相对于整个文档的X位置的函数； 
    var p = 0; 
    while ( elem.offsetParent ) { 
        p += elem.offsetLeft; 
        elem = elem.offsetParent; 
    } 
    return p; 
}
function pageY(elem){ //获取元素相对于整个文档的Y位置的函数； 
    var p = 0; 
    while ( elem.offsetParent ) { 
        p += elem.offsetTop; 
        elem = elem.offsetParent; 
    } 
    return p; 
}
function in_array(str,arr){
    for(var i=0;i<arr.length;i++){
        if(str==arr[i])
            return true;
    }
    return false;
}
function some_in_array(a1,a2){
    for(var i=0;i<a1.length;i++)
        if(in_array(a1[i],a2))
            return true;
    return false;
}
function close_context(id){
    var it = document.getElementById("context_"+id);
    if(it!=null){
        if(it.style.backgroundColor == "rgb(230, 239, 247)")
            it.parentNode.removeChild(it);
    }
}
function toggle_context(id){
    var it = document.getElementById("context_"+id);
    if(it!=null)
        if(it.style.backgroundColor == "rgb(230, 239, 247)"){
            it.style.backgroundColor = "rgb(200, 209, 217)";
        }else{
            it.style.backgroundColor = "rgb(230, 239, 247)";
        }
}
function show_float(id,x,y,content){
    var it = document.getElementById(id);
    if(it==null){
        element = document.createElement('div');
        element.innerHTML = content;
        element.id = id;
        element.style.left = x;
        element.style.top = y;
        element.style.position = "absolute";
        element.style.backgroundColor = "rgb(230, 239, 247)";
        //element.style.height="50px";
        element.style.width ="300px";
        element.style.padding="5px";
        document.body.appendChild(element);
    }
}
function get_from_name(dd){
    var a_list = dd.getElementsByTagName("div")[0].getElementsByTagName("a");
    for(var i=0;i<a_list.length;i++)
        if(a_list[i].className!="x-to-hide"){
            return ltrim(a_list[i].innerHTML);
        }
    // return ltrim(dd.getElementsByTagName("div")[0].getElementsByTagName("a")[0].innerHTML);
}
function get_to_name(dd){
    var ret = -1;
    var divs = dd.getElementsByTagName("div");
    if(divs.length<2)return -1;
    var ps = divs[1].getElementsByTagName("p");
    if(ps.length<1)return -1;
    var text = ltrim(ps[0].innerHTML);
    //var text = ltrim(dd.getElementsByTagName("div")[1].getElementsByTagName("p")[0].innerHTML);
    if(startswith(text,"回复")){
        var p1 = text.indexOf(":");
        var p2 = text.indexOf("：");
        if(p1==-1 && p2==-1){
            ret = -1;
        }else if(p1==-1){
            ret = text.substr(2,p2-2);
        }else if(p2==-1){
            ret = text.substr(2,p1-2);
        }else{
            ret = text.substr(2,min(p1,p2)-2);
        }
    }
    return ret;
}
function get_at_names(dd){
    var ret = new Array();
    var divs = dd.getElementsByTagName("div");
    if(divs.length<2)return ret;
    var ps = divs[1].getElementsByTagName("p");
    if(ps.length<1)return ret;
    var a_list = ps[0].getElementsByTagName("a");
//    var a_list = dd.getElementsByTagName("div")[1].getElementsByTagName("p")[0].getElementsByTagName("a");
    for(var i=0;i<a_list.length;i++){
        var linktxt = ltrim(a_list[i].innerHTML);
        if(startswith(linktxt,"@"))
            ret.push(linktxt.substr(1));
    }
    return ret;
}
function get_reply_without_to(dd){
    var text = ltrim(dd.getElementsByTagName("div")[1].getElementsByTagName("p")[0].innerHTML);
    if(startswith(text,"回复")){
        var p1 = text.indexOf(":");
        var p2 = text.indexOf("：");
        if(p1==-1 && p2==-1){
            return text;
        }else if(p1==-1){
            return text.substr(p2+1);
        }else if(p2==-1){
            return text.substr(p1+1);
        }else{
            return text.substr(min(p1,p2)+1);
        }
    }else{
        return text;
    }
}
function show_context(id){
    //get information of dd correspond to given id
    var dd = document.getElementById(id);
    var from_name = get_from_name(dd);
    var to_name   = get_to_name(dd);
    var at_names  = get_at_names(dd);
    if(to_name!=-1)
        at_names.push(to_name);
    var id="context_"+dd.id;
    var posx=(pageX(dd)+470)+"px";
    var posy=pageY(dd)+"px";

    //collect information from other reply
    var context = "";

    var dl_list = document.getElementsByTagName("dl");
    for(var i=0;i<dl_list.length;i++){
        var dl = dl_list[i];
        if(dl.className!="replies") continue;
        var dd_list = dl.getElementsByTagName("dd");
        for(var j=0;j<dd_list.length;j++){
            var dd = dd_list[j];

            var fn = get_from_name(dd);
            var tn = get_to_name(dd);
            var an = get_at_names(dd);
            if(tn!=-1)
                an.push(tn);
            else
                tn=""
            
            if(in_array(from_name,an) && in_array(fn,at_names)){
                context = context + '<a onclick="window.scrollTo(0,'+pageY(dd)+');" href="javascript:;"><b>'+fn+' &#8594 '+tn+'</b></a><br/>\n';
                context = context + get_reply_without_to(dd)+"<br/>\n";
            }
            else 
            if( fn==from_name && some_in_array(at_names,an) ){
                context = context + '<a onclick="window.scrollTo(0,'+pageY(dd)+');" href="javascript:;"><b>'+fn+' &#8594 '+tn+'</b></a><br/>\n';
                context = context + get_reply_without_to(dd)+"<br/>\n";
            }
        }
    }

    show_float(id,posx,posy,context);
}

function add_context_link(){
    //traversal DOM and add a context link
    var dl_list = document.getElementsByTagName("dl");
    for(var i=0;i<dl_list.length;i++){
        var dl = dl_list[i];
        if(dl.className!="replies") continue;
        var dd_list = dl.getElementsByTagName("dd");
        for(var j=0;j<dd_list.length;j++){
            var dd = dd_list[j];
            var div_list = dd.getElementsByTagName("div");
            if(get_to_name(dd)==-1 && get_at_names(dd).length==0)
                continue;
            div_list[1].innerHTML = div_list[1].innerHTML+'<a onmousedown="toggle_context(\''+dd.id+'\');" onmouseout="close_context(\''+dd.id+'\');" onmouseover="show_context(\''+dd.id+'\');" href="javascript:;">[&#161]</a>';
        }
    }

    var more_but = document.getElementById('showMoreComments');
    more_but.setAttribute("onclick","Blog.showMoreComments(); add_context_link(); return false;");
}


function inject(funcs){
    var script = document.createElement("script");
    script.setAttribute("type", "application/javascript");
    for(var i=0;i<funcs.length;i++)
        script.appendChild(document.createTextNode(funcs[i]));
    document.head.appendChild(script);
}


inject(funcs);
document.body.onload=add_context_link;



