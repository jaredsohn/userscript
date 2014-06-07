// ==UserScript==
// @name           Script Updater
// @namespace      userscripts.org/alien_scum
// @description    checks all your scripts for updates on user script.org
// @include        *
// ==/UserScript==


function getValue(query) {
  return eval(GM_getValue('cache','({})'))[query];
}

function setValue(query,value) {
  var values=eval(GM_getValue('cache','({})'));
  values[query]=value;
  GM_setValue('cache', uneval(values));
}

function $x(xpath) { 
  //xpath=xpath.replace(/((^|\|)\s*)([^/|]+)/g,'$2//$3').replace(/([^.])\.(\w*)/g,'$1[@class="$2"]').replace(/#(\w*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
  var got=document.evaluate(xpath,document,null,null,null), result=[];
  while(next=got.iterateNext()) result.push(next);
  if (x=result[0]) for(var i in x.wrappedJSObject) if(typeof result[i] =='undefined')
    if(typeof x[i]=='function') result[i]=Function('a','b','c','this.forEach(res=function (n) {if(n.'+i+') return n.'+i+'(a,b,c);return res})');
    else {result[i]=x[i]; result.watch(i,function(p,o,n){this.forEach(function (e){e[p]=n})});}
  result.addEventListener=function(t,f,b){this.forEach(function(n){n.addEventListener(t,f,b)})};
  return result;
}



function xhr(uri,f,a,b,c) {GM_xmlhttpRequest({method: 'get',headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},url: uri,onload:function(res){f(res.responseText,a,b,c)}});}

function iframe(src,show) {var f=document.createElement('iframe');f.style.display=show?'inline':'none';f.src=src;return f;}

function hash(s){
  s=s.replace(/&amp;/g,'&').replace(/&\w*;/g,'').replace(/[^\w(){}=.-+]/g,'');
  var h=0;
  for (i=0;i<s.length;i++) h=(h<<3)^(h>>29)^s.charCodeAt(i);
  return h 
}

function wait(c,f){
  if (c()) f()
  else window.setTimeout(function (){wait(c,f)},1000,false);
}

function upref(num) {return 'http://userscripts.org/scripts/source/'+num+'.user.js'}
function ckref(num) {return upref(num)+'?source'}

function cE(tag,content){
  var res=document.createElement(tag);
  if(content) res.innerHTML=content;
  return res;
}


function checkable() {
  try {
    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = getValue('CHECKING', null);
    var now = new Date().getTime();
    setValue('CHECKING', now.toString());
    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return false;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var lastChecked = getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < ONE_DAY) return false;
    setValue('LAST_CHECKED',now);
    return true
  } catch (ex) {return false}
}



profile=getValue('profile');
if (!profile) {
  setValue('profile',true);
  GM_openInTab('about:cache#scriptupdater') //get profile directory from cache page
} else {
  if(location.href=='about:cache#scriptupdater') {
    profile=document.getElementsByTagName('tt')[7].innerHTML.replace(/\\/g,'/').replace(/^\s*/g,'').replace(/ /g,'%20').replace(/cache$/i,'').replace(/<wbr>/g,'')
    if (/\w:\//.test(profile)){
      if(/\/local%20settings/i.test(profile))
        profile='file:///'+profile.replace(/\/local%20settings/i,'');
      else if (/\/AppData\/Local/.test(profe))
          profile='file:///'+profile.replace(/\/AppData\/Local/i,'\/AppData\/Roaming');
        else          
          profile='file:///'+profile.replace(/((\/[^/]*){2})\/[^/]*/i,'$1');
    }
    else 
      profile='file://'+profile.replace(/Caches(\/Firefox)/i,"Application%20Support$1");
    setValue('profile',profile);
    location.replace(profile+'bookmarks.html#scriptupdater'); //we need a file:/// page to get acsess to the scripts
  }
  if(location.href==profile+'bookmarks.html#scriptupdater'){
    document.body.innerHTML='';
    document.title='Update userscripts';
    GM_addStyle('#header td:hover {background:#EEEEEE}'+
                '#header {cursor:pointer}');
    mes=document.body.appendChild(document.createElement('h2'));
    mes.innerHTML='finding scripts...';
    f=document.body.appendChild(iframe(profile+'gm_scripts/config.xml'));
    window.setTimeout(function (){// waits for iframe to load
      d=f.contentDocument.documentElement;
      t=document.body.appendChild(document.createElement('table')).appendChild(document.createElement('tbody'));
      lnks=[];
      tr=t.appendChild(cE('tr'));
      tr.id='header';
      tr.appendChild(cE('td','Name'));
      tr.appendChild(cE('td','Filename'));
      tr.appendChild(cE('td','State'));
      tr.appendChild(cE('td','Hash')).style.display='none';
      cnt=0;
      scripts={};
      for (var i=0;n=d.childNodes[i];i++) if(n.nodeType!=3){
        tr=t.appendChild(cE('tr'));
        cnt++;
        tr.appendChild(cE('td',name=n.getAttribute('name')));
        tr.appendChild(cE('td',filename=n.getAttribute('filename')));
        if(n.getAttribute('enabled')=='false'){
          tr.style.background='#EEEEEE';
          tr.appendChild(cE('td','disabled')); 
          cnt--;
        } else xhr('http://userscripts.org/scripts/search?q='+name,function(res,p,s,ns){
          if (s.length>47) s=s.slice(0,47)+'...';
          var xs = s.replace(/\&/g, '&amp;').replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
          reg=new RegExp('<a[^>]*href[^>\\d]*/show/(\\d+)[^>]*>[\s\r\n]*'+xs+'[\s\r\n]*<\\\/a>','ig');
          var r=null,rs=[];
          while(e=reg.exec(res)) rs.push(e);
          if (rs.length>1) rs.forEach(function(n){xhr(ckref(n[1]),function(res,ns,n){
            var m=res.match(/@namespace\s*(.*)/)
            if (!m&&!ns||m&&m[1]==ns) {
              r=n;
              rs.splice(rs.indexOf(n),1);
            }
          },ns,n);}); 
          else r=rs[0];
          wait(function (){return r||(rs.length==0)},function (){
            p.innerHTML=r?r[1]:'Not on us.o';
            if (r) {
              scripts[s]={name:s,num:r[1],hash:p.nextSibling.innerHTML};
              xhr(ckref(r[1]),function(res){if(!(c=hash(res)==p.nextSibling.innerHTML)) p.innerHTML='<a href="'+upref(p.innerHTML)+'">Update</a>';p.nextSibling.innerHTML+='<br>'+hash(res);p.parentNode.style.background=c?'#CCFFCC':'#FFAA44'});
            }else p.parentNode.style.background='#FFCCCC';
            cnt--;
          });
        },tr.appendChild(cE('td')),name,n.getAttribute('namespace'));
        tr.appendChild(cE('td')).appendChild(iframe(profile+'gm_scripts/'+filename)).parentNode.style.display='none';
      }
      mes.innerHTML='looking on us.o for updates...';
      window.setTimeout(function (){//waits for iframe to load
        for (var i=1;n=t.childNodes[i];i++) 
          n.childNodes[3].innerHTML=hash(n.childNodes[3].childNodes[0].contentDocument.documentElement.innerHTML.match(/<pre>([\s\S]*)<\/pre>/)[1]);
        wait(function(){return cnt==0},function (){
          mes.innerHTML='Updates Found';
          f.parentNode.removeChild(f);
          setValue('scripts',scripts);
          [].forEach.call(t.childNodes[0].childNodes,function (td,i) {
            td.addEventListener('click',function(){
              nodes=[];
              while(t.childNodes[1]) nodes.push(t.removeChild(t.childNodes[1]));
              nodes.sort(function(a,b){return a.childNodes[i].innerHTML.toLowerCase()<b.childNodes[i].innerHTML.toLowerCase()?1:-1;})
              while(script = nodes.pop()) t.appendChild(script);
            },false);
          });    
       });
     },100,false);
   },30,false);
  } 
  if(/userscripts.org/.test(location.href)){
   $x('//a[contains(@href,".user.js")]').addEventListener('click',function(){num=this.href.match(/\d+/);xhr(ckref(num),function(res){
     scripts=getValue('scripts');
     name=res.match(/@name\s*(.*)/)[1];
     scripts[name]={name:name,num:num,hash:hash(res)};
     setValue('scripts',scripts);
   })});
  }
  if(!/#scriptupdater/.test(location.href) && checkable()) {
    scripts=getValue('scripts');
    for(s in scripts){
      xhr(ckref(scripts[s].num),function(res,s){
        script=scripts[s];
        if (hash(res)!=script.hash) {
         scpts=getValue('scripts');
         scpts[s].hash=hash(res);
         setValue('scripts',scpts);
         if(confirm('Update found for: \n'+script.name+'\n'+res.match(/@description\s*(.*)/)[1])) 
           GM_openInTab(upref(script.num))
        }
      },s);
    }
  }
}
