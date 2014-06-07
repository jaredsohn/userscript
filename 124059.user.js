// ==UserScript==
// @name            HKG XIcons
// @author	    C.Y.Fung
// @include         http://*.hkgolden.com/post.aspx*
// @include         http://*.hkgolden.com/view.aspx?*message=*
// @include         http://*.hkgolden.com/SendPM.aspx?userid=*
// @include         http://*.hkgolden.com/blog/newblog.aspx
// @copyright	    C.Y.Fung
// ==/UserScript==
/*




如果你禁左install之後睇到呢段野, 請先裝 https://addons.mozilla.org/zh-TW/firefox/addon/greasemonkey/





opened api(s):
window.iconlist: an object ( icon code =>  url )












*/
/*


    Copyright (C) 2011  C.Y.Fung

    The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.



*/









;(function(){





var log=window.console?function(x){console.log(x)}:function(){}

var GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
  var sel=document.createElement('style'); 
  sel.setAttribute('type','text/css'); 
  sel.appendChild(document.createTextNode(css));
  var hel=document.getElementsByTagName('head')[0]||document.getElementsByTagName('html')[0]
  if(hel) hel.appendChild(sel); else log('Cannot insert css')
  return sel;
}

if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };
}

if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array();
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
      {
        var val = this[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, this))
          res.push(val);
      }
    }

    return res;
  };
}




GM_addGlobalStyle([
//'.xicon_max{max-height:280px;overflow:auto;}',
//'.xicon_max:hover{max-height:600px}',
'.xiconlist th{margin:2px;cursor:pointer;float:left;border:1px solid black;opacity:.6;}',
'.xiconlist p{padding:0;margin:0}',
'.xiconlist p img{border:0}',
'img[onload^="xicon_imgResize"]{display:none;}',
'img[src="undefined"]{display:none;}'
].join(''))

var enc=encodeURIComponent;

                  
var win=this.unsafeWindow
if(!win){
//Chrome extension hack - a direct method obtaining the real window object
win=document.createElement('noscript')
win.setAttribute('oncut','return window')
win=win.oncut();
}

var _localStorage=null
try{
_localStorage=window.localStorage
}catch(e){}

if(!_localStorage){

try{
_localStorage=winx.localStorage
}catch(e){}

}

var localStorage=_localStorage

var localstorage_accessable=function(){
  return !!localStorage
  //return 'chrome' in window
}


if(localstorage_accessable() && 'xiconList' in localStorage) {
localStorage.xiconList='';
delete localStorage.xiconList;
}










//adding only
win.getIcons=function(x){
var r="\n";
var s;        
if(typeof(x)=='number') s=document.querySelectorAll('tr[id="Thread_No'+x+'"] td[valign="top"] img[src]');
if(x=='preview') s=document.querySelectorAll('#previewArea img');


if(typeof(s)!='object'){
x=x.replace(/(^|\n)(http:\/\/.+)(\n|$)/g,'$1[img]$2[/img]$3')
var k,g=/\[img\]([^\[]+)\[\/img\]/g;
while(k=g.exec(x))r+=/\/(\w+)\.\w+$/.exec(k[1])[1]+"	"+k[1]+"\n"
}else{
var o={};
for(var i=0,t,d;t=s[i];i++)if(t.src.indexOf('http://forum')<0){
d=(/\/([\w\-]+)\.\w+$/.exec(t.src)||/([\w\-]+)\W*$/.exec(t.src))[1];
if(!o[d])r+=d+"	"+t.src+"\n"
o[d]=1
}

}
return r;
}

win.getIcons2=function(){
var r=[];
for(var i=0,l=arguments.length;i<l;i++)
r.push(win.getIcons(arguments[i]).replace(/^\s+|\s+$/g,''))
return '\n'+r.join('\n')+'\n'
}  

//adding only


//cookies            

var set_Cookie=function ( name, value, expires, path, domain, secure )
{
// set time, it's in milliseconds
var today = new Date();
//today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = escape(name) + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}

var get_Cookie=function ( check_name ) {
  check_name=escape(check_name);
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

//cookies 


















var isRoot=document.baseURI.replace('//','').split(/\//).length<3







var table_decoration=function(xiconTr,xiconList,fx){



var pkey='#ctl00_ContentPlaceHolder1_QuickReplyTable table[width="100%"] td[style]>table[width="100%"][cellspacing="1"][cellpadding="3"]>tbody,'+
'table#ctl00_ContentPlaceHolder1_PMMsgTable>tbody>tr>td>table>tbody,'+
'#newmessage'

var cid=setInterval(function(){


var p=document.querySelector(pkey);


if(!p||!cid)return;
clearInterval(cid)
cid=0;




var pEl=p.lastElementChild;

var tr=document.createElement('tr');

var td=tr.appendChild(document.createElement('td'));
td.style.background='#F3F2F1';
td.style.textAlign='center';

td.innerHTML='<b>特別鳴謝各會員創作 Icon</b>'
pEl=pEl.parentNode.insertBefore(tr,pEl)


tr=document.createElement('tr')
tr.style.background='#F3F2F1';


td=tr.appendChild(document.createElement('td'))
td.setAttribute('rowspan','2');
td.style.textAlign='right';


td=tr.appendChild(document.createElement('td'))
td.innerHTML=
'<div class=xicon_max>\n'  

  +'<table cellpadding="0" cellspacing="0" id="Table1">\n'
    +'<tbody><\/tbody>'
  +'<\/table>\n'
+'</div>';


pEl.parentNode.insertBefore(tr,pEl)
pEl=tr.querySelector('tbody')

/*
if( !p.querySelector('tr>td[rowspan="2"]:first-child') ){

var tr=document.createElement('tr');

var td=tr.appendChild(document.createElement('td'));
td.style.background='#F3F2F1';
td.style.textAlign='center';

td.innerHTML='<b>特別鳴謝各會員創作 Icon</b>'
pEl=pEl.parentNode.insertBefore(tr,pEl)


tr=document.createElement('tr')
tr.style.background='#F3F2F1';


td=tr.appendChild(document.createElement('td'))
td.setAttribute('rowspan','2');
td.style.textAlign='right';


td=tr.appendChild(document.createElement('td'))
td.innerHTML=
'<div class=xicon_max>\n'  

  +'<table cellpadding="0" cellspacing="0" id="Table1">\n'
    +'<tbody><\/tbody>'
  +'<\/table>\n'
+'</div>';


pEl.parentNode.insertBefore(tr,pEl)
pEl=tr.querySelector('tbody')



}else{

var t=document.querySelector('td>table[id]')
if(!t){
if(document.querySelectorAll('#ctl00_ContentPlaceHolder1_Forum_Type_Row~tr').length==8){

var gtt=document.querySelector('#ctl00_ContentPlaceHolder1_Forum_Type_Row~tr:nth-last-child(3)')   
var tr,td
tr=document.createElement('tr')
gtt.parentNode.insertBefore(tr,gtt)
tr.style.background='#F3F2F1';

                           
td=tr.appendChild(document.createElement('td'))

td.style.textAlign='right';
                        

td=tr.appendChild(document.createElement('td'))
                      
td.innerHTML=
'<div class=xicon_max>\n'  

  +'<table cellpadding="0" cellspacing="0" id="Table1">\n'
    +'<tbody><\/tbody>'
  +'<\/table>\n'
+'</div>';
                      

pEl=tr.querySelector('tbody');


}
} else {
t.className+='xicon_max';
t.style.display='inline-block';
pEl=p.querySelector('tr>td[rowspan="2"]:first-child + td tbody')
}

}   */



win.xicon_thclick=function(ths){

  var p=ths.parentNode
  var k=p.nextElementSibling;
  if(k.style.display==='none'){
    var list=xiconList;
      if(ths.id in list) k.firstChild.firstChild.innerHTML=list[ths.id], delete list[ths.id];
    p.style.display='table';
    k.style.display='table';ths.style.opacity=1;set_Cookie(ths.id,'1',365*1000);
  }else{
    p.style.display='inline-block';
    k.style.display='none';ths.style.opacity=.6;set_Cookie(ths.id,'',-1);
  }

}


for(var i=0,t;t=xiconTr[i];i++){


var tr=document.createElement('tr')

tr.style.display='inline-block'
               
var th=document.createElement('th');
th.id=t.id;     
th.setAttribute('onclick','xicon_thclick(this)')

th.appendChild(document.createTextNode(t.title))
tr.appendChild(th)


pEl.appendChild(tr)    

tr=document.createElement('tr') 
tr.style.display='none' 
var div=tr.appendChild(document.createElement('td')).appendChild(document.createElement('div')) 
pEl.appendChild(tr)  




}
                                           



win.xicon_imgResize=function(c){

  if(!c.naturalWidth&&!c.width) return setTimeout(function(){win.xicon_imgResize(c)},100);
  
  if(c.width>300) c.height*=300/c.width,c.width=300;
  c.removeAttribute('onload')

  if(/^http:\/\/\w+\.imageshack\.us/.test(c.src) && c.width==246 && c.height==181  ) {
  c.style.display='none'
  log(c.alt+' , '+c.src)
  }

}


pEl.className='xiconlist';



xiconTr.forEach(function(obj){
  var id=obj.id
  if(get_Cookie(id)){ 
    try{
      win.xicon_thclick(document.querySelector('th[id="'+id+'"]'));
    }catch(e){}
  }
})



fx()



},100);


document.addEventListener('DOMContentLoaded',function(){
document.querySelector(pkey)||clearInterval(cid)
},false)

}

if(!win.xiconProgress)
win.xiconProgress=function(rList){




        

var xiconList={};

var xiconTr=[]

var ut={}


//insertion

var iconlist=win.iconlist;



var iconset=function (q){

  var suffix=q.suffix;
  var hidden=q.hidden;      
  var list=q.list;
  var i=0,t,r='';
  
  while(t=list[i++]){
    r+='<p>';
    for(var j=0,d;d=t[j];j++){
      var a=d.key.replace('|',suffix),b=d.val
      if(a in iconlist)
        log('xicon code repeated - '+a+' : '+ iconlist[a] +' => '+b);
      else {
        if(b.indexOf('//')>=0||b.indexOf('faces/lomore/')==0||b.indexOf('faces/lomore/')==1)
          ut[a]=b.replace(/^http:(\/\/)/,'$1');
        iconlist[a]=b;
        if(!hidden)
          r+= 
          '<a href="javascript:InsertText(\''+a+'\',false)" rel=noreferrer>'+
          '<img src="'+(isRoot?b:b.replace(/^faces(\/)/,'/$&'))+'" alt="'+a+'" onload=xicon_imgResize(this) rel=noreferrer><\/a>&nbsp;\n';
      }
    }
    r+='<\/p>\n';
  }
  
  if(!hidden){
    var eid=enc(q.code),nam=q.name  
    xiconTr.push({id:eid,title:nam});
    xiconList[eid]=r;
  }
  
}
          
// for start

var extend2=function(main,append){

for(var k in append)
  if(!(k in main))
    main[k]=append[k];

return main;

}

rList.forEach(function(q){
  
  iconset(extend2({
    suffix:q.suffix,
    hidden:q.hidden
  },q))
  
  
  q.hidden_suffixs.forEach(function(suffix_t){
    iconset(extend2({
      suffix:suffix_t,
      hidden:1
    },q))
  })


})
//for end
//win.iconlist.last=+new Date

//insertion End


table_decoration(xiconTr,xiconList,function(){

//--------------------

var hasher=function(arr){
  var larr={},lmax=0;
  for(var i=arr.length;i--;){
    var t=arr[i],l=t.length;
    (larr[l]||(larr[lmax<l?(lmax=l):l]=[])).push(t.replace(/[\[\]\|\^\$\.\:\\\+\*\?\{\}\,\=\!\-\(\)]/g,'\\$&'))
  }
  var lr=[];
  while(lmax){
    var lx=larr[lmax--];
    if(lx)
    lr.push(lx.join('|'))
  }
  return lr.join('|')
}

var utHash=[]
for(var k in ut)
utHash.push(k)


utHash=new RegExp(hasher(utHash),'g')

var convert=win.convert||function(s){return s};



win.convert_text=function convert_text(s) {

  function core(s){
    return convert(s
    .replace(utHash,function(_){
    var url=ut[_]
    var k=url.indexOf('faces/lomore/')
    if(k==0||k==1){
    var chr=_.charAt(0)
    if(chr=='[') return _.replace(/\]lm$/,'lm]')
    if(chr=='#') return _.replace(/#lm$/,'lm#')
    
    }
    //if(//faces/lomore/sosad.gif/)
    return '[img]'+url+'[/img]'
    })
    .replace(/\[(surprise2|beer)\]/g,function(_,a){return '[img]'+(isRoot?'':'/')+'faces/'+a+'.gif[/img]'})
    .replace(/\[(spacer)\]/g,function(_,a){return '[img]'+(isRoot?'':'/')+'images/'+a+'.gif[/img]'})
    );
  }

  return core('TeStiNg')=='TeStiNg'?core(s):s

} 






if(location.href.indexOf('newblog.aspx')>=0&&!win.BeforePost){

  win.BeforePost=function(){
    var x=document.getElementById('ctl00$ContentPlaceHolder1$btn_Submit')
    x.value=win.convert_text(x.value)
    x=document.getElementById('ctl00$ContentPlaceHolder1$messagesubject')
    x.value=win.convert_text(x.value)
  }

  var $get=function(x){return document.getElementById(x)}
  win.doPreview=function(){
  	var body = $get("ctl00_ContentPlaceHolder1_messagetext").value;
  	
  	body = win.convert_text(body);
  
  	$get('previewArea').innerHTML = "預覽中...";
  	win.MessageFunc.prev_message(body, win.OnPrevMsgSucceeded, win.OnPrevMsgFailed);
  }

}

})

}






var main=function(){


function pre_rList(rList){

  rList.filter(function(category){
  return category.code&&!category.disabled&&'list' in category
  })
  
  var mquote=['[',']'],dquote=['#','#'],nquote=['',''];
  rList.forEach(function(category){
  
  // -----------------------------------------
  
  if(category['-']==='')delete category['-']
  
  var code=category.code;
  var suffix=category.suffix='suffix' in category?category.suffix:code
  var hidden=category.hidden=+category.hidden||0;
   
  var suffixs=suffix.split('|')
  category.hidden_suffixs=suffixs.slice(1)
  category.suffix=suffix=suffixs[0]
  
  category.name='name' in category?category.name:suffix
  category.prefix='prefix' in category?q.category:'';
  category.noquote=+category.noquote||0;    
  
  // -----------------------------------------
  
    
    var noquote=category.noquote;
    var prefix=category.prefix,suffix=category.suffix
    
    category.list.forEach(function(row){
    
      row.forEach(function(cell){
      
        var a=cell.key
        var quote=null;
        if(noquote)quote=nquote;
        else if(/^\[(.*)\]$/.test(a))a=RegExp.$1,quote=mquote;
        else if(/^#(.*)#$/.test(a))a=RegExp.$1,quote=dquote;
        else quote=mquote
        cell.key=quote[0]+prefix+a+'|'+quote[1];
        
        cell.val=cell.val
        .replace(/^\$\d/g,function(_){return category[_]})
        .replace(/^(\/\/\w+)/,'http:$1');
      
      
      })
    
    })
  
  // -----------------------------------------
  
  })

}

function xiconProgressO(rList){


pre_rList(rList)
//if(inextension)
//chrome.extension.sendRequest({xiconlist:rList});
if(!win.iconlist)win.iconlist={};   
win.xiconProgress(rList)


}




//loading list





win.xiconGetList=function(x){



log('xiconlist loaded')
win.xicon=x

//var key_key='gsx$_cokwr',key_val='gsx$_cpzh4'
var key_key='',key_val=''


var begin=new Date;

var opened=false,tmp_r={},r=[tmp_r],lastRow,lastRowCached;

//var nosKey=false,nosVal=false

var s
if((s=x.feed)&&(s=s.entry))

for(var i=0,t;t=s[i];i++){


//if(!(key_key in t)) nosKey=true
//if(!(key_val in t)) nosVal=true

var key,val
//key=(key=t[key_key])?key['$t'].replace(/^'/,''):'';
//val=(val=t[key_val])?val['$t'].replace(/^'/,''):'';

key=t.title['$t']
if(!key_val){
key_val='gsx$'+t.content['$t'].match(/^(_\w+)\:\s/)[1]
}
val=(val=t[key_val])?val['$t'].replace(/^'/,''):'';

if(key=='['&&!val&&!opened){

opened=true
if(!tmp_r.list)tmp_r.list=[];
tmp_r.list.push(lastRow=[]),lastRowCached={}

}else if(key==']'&&!val&&opened){

opened=false

}else if(opened){

key=key||''
if(key in lastRowCached)
 log('xicon get error - '+key+' in code:'+tmp_r.code);
else 
 lastRowCached[key]=val,lastRow.push({key:key,val:val})

}else{

if(tmp_r.list)
  r.push(tmp_r={})

tmp_r[key]=val.replace(/^\s+|\s+$/g,'')

}





}

var end=new Date;

//log(r)

log('xicon spreadsheet: '+(end-begin))






if(localstorage_accessable()){ 



try{
localStorage.xiconList2=JSON.stringify(r);
localStorage.xiconListUpdate=+new Date;
}catch(e){
localStorage.xiconList2='';
delete localStorage.xiconList2
log('size err')
}

//win._xiconList=JSON.stringify(x)   //optional


}
   


xiconProgressO(r)

}


;(function(){

var sxiconList,sxiL;
if(localstorage_accessable()&&(sxiL=localStorage.xiconList2)){

if(sxiL.length>2){

sxiconList=JSON.parse(sxiL)

if((+new Date)-(+localStorage.xiconListUpdate||0)>5*60*1000) sxiconList=null;

}else{
log('x')
log(sxiL)
}

sxiL=null

}




if(sxiconList){

xiconProgressO(sxiconList)

sxiconList=null

}else{

var key='0AgtY-ohqku3bdC1wbFNHVkFxSW9BMGRPazZmbzF1dmc'
var sheetID='od5';
var callback='xiconGetList'

var requestURL='http://spreadsheets.google.com/feeds/list/'+key+'/'+sheetID+'/public/values?alt=json-in-script&callback='+callback    
;(document.querySelector('head')||document.querySelector('html')).appendChild(document.createElement('script')).src=requestURL
}



})();



}

main()



//an fix
var checkAN=function(){
if(!!document.getElementById('an')){
checkAN=null
clearInterval(checkANid)
log('A.N. is detected')

if(!location.href.match(/post\.aspx/))
GM_addGlobalStyle([
'.xicon_max{max-height:250px;overflow:auto;}',
'.xicon_max:hover{max-height:600px}',
].join(''))



}
}

var checkANid=0;

window.addEventListener('DOMContentLoaded',function(){



checkANid=setInterval(function(){checkAN()},1000);

//checkAN()




})
/*
window.addEventListener('load',function(){





if(checkAN)checkAN()
clearInterval(checkANid)


})
*/

function ACall(){

var arr=[]
var ok=false
return function (fx){
  if(!fx) {
    ok=true
    for(var i=0,t;t=arr[i];i++) t();
    arr.length=0
  }else if(ok) fx();
  else arr.push(fx);
}

}


var inextension=false
try{
chrome.extension;
inextension=true
}catch(e){}
