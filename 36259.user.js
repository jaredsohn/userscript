// ==UserScript==
// @name           Script AutoUpdater
// @namespace      userscripts.org/eyalsoha
// @description    checks all your scripts for updates on user script.org
// @include        *
// ==/UserScript==

//This is just a rip-off of alien_scum's script updater but with patches to make it work better
(
function () {
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



  function xhr(uri,f,a,b,c,d) {GM_xmlhttpRequest({method: 'get',headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},url: uri,onload:function(res){f(res.responseText,a,b,c,d)}});}
  function iframe(src,show) {var f=document.createElement('iframe');f.style.display=show?'inline':'none';f.src=src;return f;}

  function hash(s){
    s=s.replace(/&amp;/g,'&').replace(/&\w*;/g,'').replace(/[^-\w(){}=.+]/g,'');
    var h=0;
    for (i=0;i<s.length;i++) h=(h<<3)^(h>>29)^s.charCodeAt(i);
    return h 
  }

  function wait(c,f){
    if (c()) f()
    else window.setTimeout(function (){wait(c,f)},1000,false);
  }

  function upref(num) {return 'http://userscripts.org/scripts/source/'+num+'.user.js';}
  function ckref(num) {return upref(num)+'?source';}
  function showref(num) {return 'http://userscripts.org/scripts/show/'+num;}

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

  if(GM_registerMenuCommand) {
    GM_registerMenuCommand("Check for script updates", function() {GM_openInTab("about:cache#scriptupdater")});
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
    if(location.href==profile+'bookmarks.html#scriptupdater') {
      document.body.innerHTML='';
      document.title='Update userscripts';
      GM_addStyle('#header td:hover {background:#EEEEEE}'+
                  '#header {cursor:pointer}');
      mes=document.body.appendChild(document.createElement('h2'));
      mes.innerHTML='finding scripts...';
      var config_iframe;
      f=document.body.appendChild(config_iframe=iframe(profile+'gm_scripts/config.xml'));
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
        tr.appendChild(cE('td','Ignore Updates'));
        var cnt=0;
        var cnt2=0;
        var scripts={};
        var oldscripts=getValue('scripts');
        var ignores;
        ignores = getValue('ignores') || {};
        for (var i=0;n=d.childNodes[i];i++) if(n.nodeType==1 && n.nodeName=="Script") {
          tr=t.appendChild(cE('tr'));
          cnt++;
          cnt2++;
          tr.appendChild(cE('td',name=n.getAttribute('name')));
          tr.appendChild(cE('td',filename=n.getAttribute('filename')));
          basedir=n.getAttribute('basedir');
          if(n.getAttribute('enabled')=='false'){
            tr.style.background='#EEEEEE';
            tr.appendChild(cE('td','disabled')); 
            cnt--;
          } else {
            xhr('http://userscripts.org/scripts/search?q='+encodeURIComponent(name),function(res,p,s,ns) {
              var oldname = s;
              if (s.length>47) s=s.slice(0,47)+'...';
              var xs = s.replace(/\&/g, '&amp;').replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
              reg=new RegExp('<a[^>]*href[^>\\d]*/show/(\\d+)[^>]*>[\s\r\n]*'+xs+'[\s\r\n]*<\\\/a>','ig');
              var r=null,rs=[];
              while(e=reg.exec(res)) rs.push(e);
              if (rs.length>1) //if there is more than one script with the same name!  :(
                rs.forEach(function(n){xhr(ckref(n[1]),function(res,ns,n,oldname){
                  var m=res.match(/@namespace\s*(.*)/)
                  if (((!m&&!ns)||(m&&m[1]==ns)) && //if the namespace is correct and
                      (r==null ||                   //(we don't yet have a result or this result is better)
                       (oldscripts != null && oldscripts[oldname] != null && n[1] == oldscripts[oldname].num))) {
                    r=n;
                  }
                  rs.splice(rs.indexOf(n),1);
                },ns,n,oldname);}); 
              else {
                r=rs[0];
                rs=[];
              }
              wait(function (){return(rs.length==0)},function (){
                if (r) {
                  p.innerHTML=r[1];
                  p.parentNode.childNodes[0].innerHTML = '<a href="' + showref(r[1]) + '">' + p.parentNode.childNodes[0].innerHTML + '</a>';
                  scripts[s]={name:s,num:r[1],hash:p.nextSibling.innerHTML};
                  xhr(ckref(r[1]),function(res) {
                    if(!(c=hash(res)==p.nextSibling.innerHTML))
                      p.innerHTML='<a href="'+upref(p.innerHTML)+'">Update</a>';
                    p.nextSibling.innerHTML+='<br>'+hash(res);
                    p.parentNode.style.background=c?'#CCFFCC':'#FFAA44';
                  });
                } else {
                  p.innerHTML='Not on us.o';
                  p.parentNode.style.background='#FFCCCC';
                }
                cnt--;
              });
            },tr.appendChild(cE('td')),name,n.getAttribute('namespace'));
          }
          var current_iframe;
          tr.appendChild(cE('td')).appendChild(current_iframe=iframe(profile+'gm_scripts/'+basedir+'/'+filename)).parentNode.style.display='none';
          current_iframe.addEventListener('load',function(){
            this.parentNode.parentNode.childNodes[3].innerHTML=hash(this.contentDocument.documentElement.innerHTML.match(/<pre>([\s\S]*)<\/pre>/)[1]);
            cnt2--;},false);
          var checkbox;
          checkbox = tr.appendChild(cE('td', '<input name="' + name + '" type="checkbox"' + ((ignores[name])?' checked':'') + '>'));
          checkbox.firstChild.addEventListener('click',function(){
            ignores = getValue('ignores') || {};
            ignores[this.name] = this.checked;
            setValue('ignores', ignores);
          }, false);
        }
        mes.innerHTML='looking on us.o for updates...';
        wait(function(){return cnt==0 && cnt2==0},function (){//waits for iframe to load
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
     },30,false);
    }
    if(/userscripts.org/.test(location.href)){
      $x('//a[contains(@href,".user.js")]').addEventListener('click',function(){var num=this.href.match(/\d+/)[0];xhr(ckref(num),function(res,num){
        scripts=getValue('scripts');
        name=res.match(/@name\s*(.*)/)[1];
        scripts[name]={name:name,num:num,hash:hash(res)};
        setValue('scripts',scripts);
      },num)});
    }
    if(!/#scriptupdater/.test(location.href) && checkable()) {
      scripts=getValue('scripts') || {};
      ignores=getValue('ignores') || {};
      for(s in scripts){
        if(ignores[s]) continue;
        xhr(ckref(scripts[s].num),function(res,s,script_name,script_hash,script_num){
          if (hash(res)!=script_hash) {
            scpts=getValue('scripts');
            scpts[s].hash=hash(res);
            setValue('scripts',scpts);
            if(confirm('Install update found for:\n'+script_name+'\n'+res.match(/@description\s*(.*)/)[1])) 
              GM_openInTab(upref(script_num))
            else if(confirm('The update was not installed.\n\nIgnore future updates for:\n'+script_name+'\n'+res.match(/@description\s*(.*)/)[1])) {
              my_ignores = getValue('ignores');
              ignores[script_name] = true;
              setValue('ignores',ignores);
              alert('If you change your mind, visit:\nabout:cache#scriptupdater');
            }
          }
        },s,scripts[s].name,scripts[s].hash,scripts[s].num);
      }
    }
  }
})();