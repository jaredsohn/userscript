// ==UserScript==
// @name           ND_topic_pag
// @namespace      http://userscripts.org/users/107047
// @include        http://www.noticierodigital.com/forum/*
// ==/UserScript==
d=document;
c=(/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) ?'className':'class';
h=d.getElementsByTagName('span');
    var a=[];
    for(i=0,k=0;i<h.length;i++){
    if(h[i].getAttribute(c)=='nav')
      a[k++]=h[i];
  }
n=a.length;
s=(a[n-1].innerHTML.length>a[n-2].innerHTML.length)?1:2;
e=a[n-s];
g=a[n+s-3];
e.id='1';
up=g.lastChild.innerHTML; //up= ultima pagina
pa=g.firstChild.nextSibling.innerHTML; //pa = pagina actual
if (up>10)
        {
        sp='\u00a0'+'\u00a0';
        b=    e.getElementsByTagName('a');
      m=b.length;
      pa<3?(i1=m-3,i2=m-2):(i1=1,i2=2);    
        u=(e.getElementsByTagName('a')[0]+'').replace(/&start.*$/,'');
      function start(nod) { return (nod+'').match(/&start=\d+/)[0].match(/\d+/)[0] };
      pp=start(b[i2])-start(b[i1]);        
        fa=a[n-1].parentNode.parentNode.parentNode.insertRow(-1).insertCell(0);
        fa.setAttribute("colSpan","3");        
        nn=document.createElement('span');
        nn.setAttribute(c,"nav");               
        fa.appendChild(nn);
        ic=document.createTextNode('Ir a p\u00E1gina');
        nn.appendChild(ic);
        if (pa!=1)
            {
            ta=document.createTextNode(sp+'«'+sp);		
            v=(pa-2)*pp;
            lka=u+"&start="+escape(v);
            nka=document.createElement('A');
            nka.href=lka;
		nka.title='anterior';
            nka.appendChild(ta);
            nn.appendChild(nka);
            }
	  if (pa!==up)
            {
            tu=document.createTextNode(sp+'»'+sp);		
            r=pa*pp;
            lku=u+"&start="+escape(r);
            nku=document.createElement('A');
            nku.href=lku;
		nku.title='siguiente';
            nku.appendChild(tu);
            nn.appendChild(nku);
            }
        for (i=1;i<=up;i++)
            {
            if (i==pa)
                nlk=document.createElement('B');
            else
                {
                nlk=document.createElement('A');
                h=(i-1)*pp;
                lk=(h==0)?u:u+"&start="+escape(h);
                nlk.href=lk;
                }
            tt=document.createTextNode(i);
            nlk.appendChild(tt);
            nn.appendChild(nlk);
            if (i!=up)
                {
                tc=document.createTextNode(", ");
                nn.appendChild(tc);
                }
            }
               }