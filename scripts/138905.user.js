// ==UserScript==
// @name        Form State
// @author      Sergio Abreu
// @namespace   http://software.sitesbr.net
// @description Saves / apply the form elements state.
// @include     *
// @version    1.6
// ==/UserScript==

// Added form names in list 27/01/2013

if(self == top){

var s = function(){
 
   
   function getFormState(){
     var _s = "";
     var n=document.getElementById('pageforms').selectedIndex;
     if( n >= 0){
        fo = document.forms[n];
        for( var i=0; i < fo.elements.length; i++){
          el = fo.elements[i];
          if( el.tagName == 'SELECT'){
            _s+= "{select: ";
            for(j=0; j<el.options.length; j++){
              if( el.options[j].selected)_s+=j+",";
            }
            _s = _s.substring(0, _s.length-1) + "}\n";
          }else if( el.tagName == 'INPUT' && el.type=='radio'){ 
             _s += "{radio: "+(el.checked?1:0)+"}\n";
          }else if( el.tagName == 'INPUT' && el.type=='checkbox'){          
             _s += "{checkbox: "+(el.checked?1:0)+"}\n";          
          }else if( el.type == 'hidden'){ 
           _s += "{hidden: \"" + el.value + "\"}\n";          
          }else if(el.type == 'text' || el.tagName == 'TEXTAREA') { 
             v = escape(el.value + "");
             v = v.replace(/'/g, '%27');
             v = v.replace(/"/g, '%22');
             _s += "{text: \"" + v + "\"}\n";
          }else if(el.type == 'password') { 
             _s += "{password: \"\"}\n";
          }else if(el.type == 'button') { 
             _s += "{button: \""+el.value+"\"}\n";
          }else if(el.type == 'submit') { 
             _s += "{submit: \""+el.value+"\"}\n";
          } else _s += "{ignore: \"\"}\n"          
	  }
     }     
     document.getElementById('formstate').value= _s;
   }
   
   function setFormState(){
     var n=document.getElementById('pageforms').selectedIndex;
     if( n >= 0){

        fo = document.forms[n];
        cmds = document.getElementById('formstate').value.split(/\n/); 

        if(cmds.length > fo.elements.length + 1) alert("Select a correct form, fields don't match!");

        for( var i=0; i < cmds.length; i++){

             if( cmds[i] && cmds[i].indexOf("{select: ") == 0 ){	
                 objsel = fo.elements[i];
                 for(j=0; j < objsel.options.length; j++){
                    objsel.options[j].selected = false;
                 }
                 sels = cmds[i].substring(9, cmds[i].length-1).split(',');
                 for(j=0; j<sels.length;j++){
                    objsel.options[sels[j]].selected = true;
                 }
             }
             if( cmds[i] && cmds[i].indexOf("{radio: ") == 0){
                   fo.elements[i].checked = cmds[i].match(/1/);
             }
             if( cmds[i] && cmds[i].indexOf("{checkbox: ") == 0){
                   fo.elements[i].checked = cmds[i].match(/1/);             
             }
             if( cmds[i] && cmds[i].match(/^({text)|({password)/)){
                   s = cmds[i].match(/"[^"]*"/);
                   if(s){
                      s = s[0].replace(/"/g, '');
                      s = unescape(s);
                     }
                   fo.elements[i].value = s;
             }
        }
     }        
   }

function addDragger( name, objId){
   if( document.getElementById( objId)){
        eval(  "var " + name + "={"+
        " "+
        " obj: null,"+
        " offsettop: null,"+
        " offsetleft: null,"+
        ""+
        " init: function(id){"+
        "  obj = document.getElementById(id);"+
	"  obj.onmousedown = " + name + ".set;"+
        "  obj.style.top = obj.offsetTop + 'px';"+
        "  obj.style.left = obj.offsetLeft + 'px';"+
        "  obj.style.cursor = 'move';"+
        " },"+
        "  "+
        " set: function(e){"+
        "  if(!e) e = window.event; /* IE */"+
	"  if(e.target && e.target.tagName && e.target.tagName.match(/(SELECT)|(TEXTAREA)|(INPUT)/)) return;" +
        "  mx = (e.screenX ? e.screenX : e.x);"+
        "  my = (e.screenY ? e.screenY : e.y);"+
        "  offsettop = my - parseInt(obj.style.top);"+
        "  offsetleft = mx -  parseInt(obj.style.left);"+
        "  document.onmousemove = " + name + "." + name + ";"+
        "  document.onmouseup = " + name + ".stop;"+
        "  return false;"+
        " },"+
        " "+
        " " + name + ": function(e){"+
        "   if(!e) e = window.event; /* IE */"+
        "   if( e.target && e.target.tagName && e.target.tagName != 'SELECT'){"+
	"     mx = (e.screenX ? e.screenX : e.x);"+
        "     my = (e.screenY ? e.screenY : e.y);"+
        "     obj.style.top = (my - offsettop)+ 'px';"+
        "     obj.style.left = (mx - offsetleft)+ 'px';"+
	"   }"+
        "   obj.style.cursor = 'move';"+
        "   return false;"+
        " },"+
        ""+
        " stop: function(){"+
        "  obj.style.cursor = 'default';"+
        "  document.onmousemove = null;"+
        "  document.onmouseup = null;"+
        " } "+
        "};");
        eval( name + ".init('"+objId+"')");
  }
  else
  {
   setTimeout( "addDragger('" +name+ "','" +objId+ "')", 200);
   return;
  }
}
   
   window.addEventListener("load", function(){
   fs = document.forms;
   if( fs.length > 0){
   fops = "";
   for( var i=0; i < fs.length; i++){
        fops += "<opt"+"ion>"+"Form_"+i+" ("+(fs[i].name?fs[i].name:'anonymous')+")</opt"+"ion>";
   }

   dvfs = document.createElement('div');
   dvfs.id = 'formStateContainer';
   dvfs.setAttribute("style","position:absolute;padding:10px; z-index:10000;top:10px; right:10px;width:200px;height:auto;border:2px solid #ccc; opacity:.8;background-color:#ff0");
   dvfs.innerHTML = "<h3>Form State <i style='font-size:10px'>by Sergio Abreu</i></h3><fo"+"rm>";
   dvfs.innerHTML += fs.length > 0 ? "<sel"+"ect id='pageforms'>"+fops+"</sele"+"ct>" : "<i>No forms in this page!</i>";
   dvfs.innerHTML += "<in"+"put type='button' value='Get State' onclick='getFormState()'>  ";
   dvfs.innerHTML += "<te"+"xtarea id='formstate' style='width:190px'></text"+"area>"
   dvfs.innerHTML += "<in"+"put type='button' value='Apply State' onclick='setFormState()'></fo"+"rm>";
   dvfs.innerHTML += "<a style='position:absolute; top:5px; right:5px; color:#00f;font-family:Arial, helvetica, sans-serif;font-weight:bold' href='javascript:document.getElementById(\"formStateContainer\").style.display=\"none\";void(0);'>X</a>";
   document.body.appendChild(dvfs);   
   addDragger( 'dragable1', 'formStateContainer');   
   }  
   }, false);
};
   
s += "";
sc = document.createElement('script');
sc.innerHTML = s.substring(13, s.length-2);
document.getElementsByTagName('head')[0].appendChild(sc);   
}