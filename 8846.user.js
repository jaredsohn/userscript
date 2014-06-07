// ==UserScript==
// @name           link fixer
// @namespace      userscripts.org/alien_scum
// @description    uses regular expressions to fix links
// @include        *
// ==/UserScript==


function $x(xpath,root) { 
  xpath=xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2//$3').replace(/([^.])\.([\w-]*)/g,'$1[@class="$2"]').replace(/#([\w-]*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
  var got=document.evaluate(xpath,root ||document,null,null,null), result=[];
  while(next=got.iterateNext()) result.push(next);
  return result;
}

function getValue(query) {
  return eval(GM_getValue(query,'[]'));
}

function setValue(query,value) {
  GM_setValue(query, uneval(value));
}

function $(el){return document.getElementById(el)}

var imlinks=document.evaluate('//a[@href]/img',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

function remove(node) {node.parentNode.removeChild(node);}

exps=getValue('exps');

orgs={
  href:{
    p:'//a[@href]',
    f:function(n){return[n,n.href]}
  },
  img:{
    p:'//a[@href]/img',
    f:function(n){return[n.parentNode,n.src]}
  }
 }

embeded=document.getElementsByTagName('linkfixer')
for(i=0;n=embeded[i];i++) {
  n.addEventListener('click',function(){alert(this.getAttribute('find'));},false);	
}

 
//alert(exps);

function fix() {
  for (var j=0; exp=exps[j++];) {
    org=orgs[exp.org]; dom=exp.dom, f=new RegExp(exp.fnd); g=exp.rep; r=exp.rem;
    //alert(r);
    var links=document.evaluate(org.p,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    if ((new RegExp('^'+dom+'$')).test(location.host.replace(/www\./,''))) 
      for (var i=0; node=links.snapshotItem(i++);) {
        link=org.f(node)[0];
        ref=org.f(node)[1];
        if (f.test(ref)) {
          //document.title=ref;
          link.href=ref.replace(f,g);
          if (r) while (link) {
            link.wrappedJSObject.onclick = null;
            link=link.parentNode;
          }
        }
      }
  }
}

fix();
opt=null;
document.addEventListener('keypress', function(e) {
  if (e.altKey && e.ctrlKey && String.fromCharCode(e.charCode) == 'l') {
    if (opt) {remove(opt);remove(bg);opt=null;window.clearInterval(tmr)} else {
    bg = document.body.appendChild(document.createElement("div"));
    bg.setAttribute('style','position: fixed; width: 100%; top:0px; left:0px; height:100%; background-color: grey; -moz-opacity: 0.5; z-index: 99999;');
    opt = document.body.appendChild(document.createElement("div"));
    opt.setAttribute('style','position: fixed; width:100%; top: '+window.innerHeight/2+'px; z-index: 999999;');
    opt.innerHTML='<center><div style="background-color: white; padding:20px; color: black; -moz-border-radius: 20px; margin: -20px 100px;">'+
    'Base <select id="orig"><option value="href" selected="selected">Link Href</option><option value="img">Image SRC</option></select> '+
    'Domain <input id="lnkdom"> Find <input id="lnkfnd" value="()"> Replace <input id="lnkrep"> Remove Events<input id="remevn" type="checkbox"><button id="lnkadd">Add</button>'+
    '</div><br><table cellspacing="0px" width="'+(window.innerWidth-300)+'px"id="lfres"></table></center>';
    GM_addStyle('#lfres *,#lfres * {border:none !important; padding: 0px; max-height:30px; overflow: hidden; color:black;}');
    GM_addStyle('.orig,.rep {max-width:400px}');
    var prev=$('lfres'),org=$('orig'),dom=$('lnkdom'),fnd=$('lnkfnd'),rep=$('lnkrep'),rem=$('remevn'),add=$('lnkadd');
    dom.value=location.host.replace(/www\./,'');
    add.addEventListener('click',function(e){epxs=getValue('exps');exps.push({org:org.value,dom:dom.value,fnd:fnd.value,rep:rep.value,rem:rem.checked});setValue('exps',exps);fix();remove(opt);remove(bg);opt=null;window.clearInterval(tmr);},false);
    fnd.focus();
    f=0, g=0,o=0;
    tmr=window.setInterval(function (){
     if(f!=fnd.value||g!=rep.value||o!=org.value){
        o=org.value;
        f=fnd.value;
        r=new RegExp(f);
        g=rep.value;
        cnt=0;
        prev.innerHTML='';s='<tbody><tr style="background: white; font-weight:bold"><td width="100px">Link</td><td>Before</td><td>After</td></tr>';
        var links=document.evaluate(orgs[o].p,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i=0; (node=links.snapshotItem(i)) && cnt<10; i++) {
          link=orgs[o].f(node)[0];
          ref=orgs[o].f(node)[1];
          if (r.test(ref)) {
            s+='<tr style="background: white;-moz-opacity:'+(10-cnt)/10+'"><td width="100px">'+link.innerHTML.replace(/(<[^>]*)(id|class)="\w+"([^>]*>)/g,'$1$3')+'</td><td><div class="orig">'+ref+'</div></td><td><div class="rep">'+ref.replace(r,g)+'</div></td></tr>';
            cnt++
          }
        }
        s+='</tbody>';
        prev.innerHTML=s;
      }
    },1000);
  }
  }
}, false);

function maketable(){
   s='<h1>Preferences</h1><table id="linkTable" style="background:white;"><tr><td>Base</td><td>Domain</td><td>Find</td><td>Replace</td><td>Remove Events</td><td>Save</td><td>Delete</td><td>Submit</td></tr>';
  for (var j=0; exp=exps[j++];) {
    org=exp.org; dom=exp.dom, f=new RegExp(exp.fnd); g=exp.rep; r=exp.rem;
     s+='<tr><td><select id="orig'+j+'"><option value="href"'+(org=='href'?' selected="selected"':'')+'>Link Href</option><option value="img"'+(org=='img'?' selected="selected"':'')+'>Image SRC</option></select></td>'+
    '<td><input id="lnkdom'+j+'" value="'+dom+'"></td><td><input id="lnkfnd'+j+'" value="'+f.source+'"></td><td><input id="lnkrep'+j+'" value="'+g+'"></td><td><input id="remevn'+j+'" type="checkbox"'+(r?'checked':'')+'></td><td><button id="lnksave'+j+'">save</button></td><td><button id="lnkdel'+j+'">delete</button></td><td><button id="lnksub'+j+'">submit</button></td></tr>';
  }
  s+='</table>';
  prefs.innerHTML=s;
  for (var j=1; row=prefs.getElementsByTagName('tr')[j];j++) {
    $('lnkdel'+j).addEventListener('click',del(j),false);
    $('lnksave'+j).addEventListener('click',save(j),false);    
    $('lnksub'+j).addEventListener('click',sub(j),false);    
  } 
}

function del(n) { return function () {
  tr=$('lnkrep'+n).parentNode.parentNode;
  exps.splice(n-1,1)
  setValue('exps',exps)
  maketable();
}}

function save(n) { return function () {
  var org=$('orig'+n),dom=$('lnkdom'+n),fnd=$('lnkfnd'+n),rep=$('lnkrep'+n),rem=$('remevn'+n);
  exps[n-1]={org:org.value,dom:dom.value,fnd:new RegExp(fnd.value),rep:rep.value,rem:rem.checked};
  setValue('exps',exps);
}}

function sub(n) { return function () {
  var org=$('orig'+n),dom=$('lnkdom'+n),fnd=$('lnkfnd'+n),rep=$('lnkrep'+n),rem=$('remevn'+n);
  $('add_comment_link').style.display='none';
  $('new_comment').style.display='block';
  $('comment_body').value+='<p class="linkfixer">\n'+
                           'orig: <code class="orig">'+org.value+'</code><br>\n'+
                           'domain: <code class="domain">'+dom.value+'</code><br>\n'+
                           'find: <code class="find">'+fnd.value+'</code><br>\n'+
                           'replace with: <code class="replace">'+rep.value+'</code><br>\n'+
                           'remove Events :<code class="remove">'+rem.checked+'</code></p>'
}}




if (location.href.indexOf('userscripts.org/scripts/show/8846')>-1)
{
  prefs= $('content').insertBefore(document.createElement("div"),$('full_description').nextSibling);
  maketable();
}

if (location.href.indexOf('userscripts.org/forums/')>-1  ||  location.href.indexOf('userscripts.org/scripts/show/8846')>-1)

{
  $x('.linkfixer').forEach(function (p) {
    p.innerHTML ='<a href="javascript:var foo=null;">Click to add</a> '+p.innerHTML;
    function m(r) {
      var mtch=p.innerHTML.match(new RegExp('class="'+r+'"[^>]*>([^<]*)<'))
      return mtch?mtch[1]:''
    }
    p.getElementsByTagName('a')[0].addEventListener('click',function(){
      var org=m('orig')||'href',dom=m('domain')||'.*',fnd=m('find'),rep=m('replace'),rem=m('remove')=='true';
      exps=getValue('exps');
      exps.push({org:org,dom:dom,fnd:new RegExp(fnd),rep:rep,rem:rem});
      setValue('exps',exps);
      if($('linkTable')) maketable();
      else alert('Link rule added.');
    },false);
  });
}