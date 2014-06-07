// /////////////////
// foaf-discovery.user.js
// $Author: greg $
// $Date: 2005-04-21 18:00:10 -0700 (Thu, 21 Apr 2005) $
// $Rev: 35 $
////////////////////
// userscript metadata follows...
// ==UserScript==
// @name			FOAF Discovery
// @namespace		http://greg.vario.us/ns/greasemonkey
// @description		Basic auto-discovery of FOAF data
// @include         http://*
// @include         https://*
// ==/UserScript==
// 

(function() {

            var NSFOAF="http://xmlns.com/foaf/0.1/";
            var NSRDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#";
            var NSRDFS="http://www.w3.org/2000/01/rdf-schema#";
            var NS=new Array();
            var PREF=new Array();
            var Props= new Array();
            Props[NSFOAF+"name"]= "foafName";
            Props[NSFOAF+"firstName"]="foafFirstName";
            Props[NSFOAF+"surname"]="foafSurname";
            Props[NSFOAF+"nick"]="foafNick";
            Props[NSFOAF+"mbox_sha1sum"]="foafMboxSha1Sum";
            Props[NSFOAF+"homepage"]="foafHomepage";
            Props[NSFOAF+"depiction"]="foafDepiction";
            Props[NSFOAF+"workplaceHomepage"]="foafWorkplaceHomepage";
            Props[NSFOAF+"workInfoHomepage"]="foafWorkInfoHomepage";
            Props[NSFOAF+"schoolHomepage"]="foafSchoolHomepage";
            Props[NSFOAF+"phone"]="foafPhone";
            Props[NSFOAF+"mbox"]="foafMbox";
            Props[NSRDFS+"seeAlso"]="rdfsSeeAlso";
            var FOAF_EXPLORER_ICON='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAvNJREFUeNqlU1tIk2EYfv7TNndq/zbnNmdK01lNO+jKdaASyiKioKR5ZUYgRQV1EUR0UTcdCboIKgMpOl11xi46UFoglc7KDurwVG2uLebaXE737//7t9goqate+Pie73vf9/ne0wf8pxAZ4HA8fCoIWCBCeeO5ig4QRFnrpWFZyDv+Q6KgPASEA3cuO+9PJaB+OT+qZWTUJtsivbxwrkZiLlWZxWuakAxCZQwwukKJEUl1rUZVtzFPt6XF670UyRJUVT2xiDR3XYfLjB/agrLFrgLQDJlWjt5qxolgL4r7noMs19K6pXNNA+7QZh1bd8vvvxpO2ZACwW0vqzZIFSxDr99XCqmcyoZXgkkc6ezAFY8H+DyAvBkKrN5ZrJHlMGczNqRMybjsy/XqqblpZFEE6AkcrKhAg80GwmBO3xutCqXFPi13/vwHjtSZFngYVSwDf/tLjAZHIC8wY8FSK0iCR9TpwsnYAASpBZo5VVlyxwazarArvE2EHVSRdethA/uF8rS3gR+fABf9An2ZE+G4GppcE/JLzBC0xVnne6f6wE0KOr8nSplM9WtIiiaFb34fKitXwm5fBCVrQZyT/rPvNTusGVieTHJ7aZmCCvFyi/F1/wuw2jwochMo0njx6bsJg+/fYHi8H6RqOgpsC9NeqSJXrjO9azpkL0/XQKljWqOBXNeShsbsK94IB4MihJdDj+FYW4jA51fiSsBQsOSXgSA8ynaBBrErODQ28XuYCZ6Gf0wPpVaGthtt6H7WjbGwL62LR7nvzbu7nFmC602Ob+v3z17zt3xDQR7LNi3DvBXzIFeZIPACbh77OJyY5M//McotF44PjXSuPDTQGU6kqjujkk0r+aQEgU9SUPQsUMTM6O2jPSOx0cRFt7vmzB8EKcnPryfisWRxjorpISliXBxnDQmWjIdZX1dLLPD24ddgPMbvcbtXXfw9SjoDOI4+TdNcja83cs3bE7Gnain+Tk7ce8RP26JWU09ftFfHp6b5E3q6DFm9GCeUAAAAAElFTkSuQmCC';
               
            var FOAF = {
                rdfUri: function(node){
                    if(m = String(node.nodeName).match(/^([^:]+)(:(.*?))?$/)){
                        if(m[3] && PREF[m[1]]){
                            return PREF[m[1]]+m[3];
                        }else if(!m[3] && PREF['']){
                            return PREF['']+m[1];
                        }
                    }
                    return null;
                
                },
                findAttrVal: function(ns,ln,n){
                    for(var i=0;i<n.attributes.length;i++){
                        var att = n.attributes.item(i);
                        if(FOAF.rdfUri(att)==ns+ln){
                            return att.nodeValue;
                        }
                    }
                    return null;
                },
                findTextVal: function(n){
                    if(n.firstChild && n.firstChild.nodeType==Node.TEXT_NODE)
                        return n.firstChild.nodeValue;
                    return null;
                },
                findAttrOrText: function(ns,ln,node){
                    var a = FOAF.findAttrVal(ns,ln,node);
                    if(a) return a;
                    return FOAF.findTextVal(node);
                },
                parsePerson: function(node){
                    var pp=new Object();
                    var ps = new Array();
                    var knows = new Array();
                    var n = node.firstChild;
                    while(n){
                        var uri = FOAF.rdfUri(n);
                        if(Props[uri]){
                            ps[Props[uri]]=FOAF.findAttrOrText(NSRDF,"resource",n);
                        }else if(uri==NSFOAF+"img"){
                            var z=FOAF.findAttrOrText(NSRDF,"resource",n);
                            if(z && z.match(/^http/i)){
                                ps['foafImg']=z;
                            }else if(n.firstChild){
                                var t = n.firstChild;
                                while(t){
                                    if(FOAF.rdfUri(t)==NSFOAF+"Image"){
                                        z = FOAF.findAttrVal(NSRDF,"about",t);
                                        if(z){
                                            ps['foafImg']=z;
                                            break;
                                        }
                                    }
                                    t=t.nextSibling;
                                }
                            }
                        }
                        else if(uri==NSFOAF+"knows"){
                            var t= n.firstChild;
                            while(t){
                                if(FOAF.rdfUri(t)==NSFOAF+"Person"){
                                    knows.push(FOAF.parsePerson(t));
                                    break;
                                }
                                t=t.nextSibling;
                            }
                        }
                        n=n.nextSibling;
                    }
                    ps["knows"] = knows;
                    return ps;
        
                },
                renderPersonNameLink: function(pers){
                    var name=FOAF.renderPersonName(pers);
                    var link = pers['foafHomepage'];
                    if(!link) link= pers['foafWorkplaceHomepage'];
                    if(!link) link= pers['foafWorkInfoHomepage'];
                    if(!link) link= pers['foafSchoolHomepage'];
                    if(!link) link= pers['foafMbox'];
                    if(!link) link= pers['rdfsSeeAlso'];
                    var a;
                    if(link){
                        a = document.createElement("a");
                        a.href=link;
                    }else{
                        a = document.createElement("span");
                    }
                    if(pers['foafImg'] || pers['foafDepiction']){
                        var i = document.createElement("img");
                        var u = pers['foafImg'];
                        if(!u) u=pers['foafDepiction'];
                        i.src=u;
                        i.width="16";
                        i.height="16";
                        a.appendChild(i);
                        a.appendChild(document.createTextNode(name));
                    }else{
                        a.innerHTML=name;
                    }
                    return a;
                },
                renderPersonName: function(pers){
                    var name="(Unknown Person)";
                    if(pers['foafFirstName'] && pers['foafSurname']){
                        name=pers['foafFirstName'];
                        if(pers['foafNick']){
                            name+=" \""+pers['foafNick']+"\"";
                        }
                        name+=" "+pers['foafSurname'];
                    }else if(pers['foafName']){
                        name=pers['foafName'];
                        if(pers['foafNick']){
                            name+=" \""+pers['foafNick']+"\"";
                        }
                    }
                   else if(pers['foafNick']) {
                       name="\"" + pers['foafNick'] + "\"";
                   }
                    return name;
                },
                renderPerson: function(pers,url){
                    var div = document.createElement("div");
                    div.setAttribute("class","foafPerson");
                    var name=FOAF.renderPersonName(pers);
                    var ln = document.createElement("a");
                    ln.href=url;
                    ln.setAttribute("title","FOAF source: "+url);                    
                    ln.innerHTML="[FOAF]";
                    if(pers['foafImg'] || pers['foafDepiction']){
                        var ai = document.createElement("a");

                        var u = pers['foafImg'];
                        if(!u) u=pers['foafDepiction'];
                        ai.href=u;
                        var img = document.createElement("img");
                        img.src=u;
                        img.width="32";
                        img.height="32";
                        ai.appendChild(img);
                        div.appendChild(ai);
                    }
                    if(pers['foafHomepage']){
                        var a = document.createElement("a");
                        a.href=pers['foafHomepage'];
                        a.innerHTML=name;
                        a.setAttribute("title","Homepage");
                        div.appendChild(a);
                    }else{
                        div.innerHTML+=" "+name;
                    }
                    if(pers['foafMbox']){
                        var a = document.createElement("a");
                        a.href=pers['foafMbox'];
                        a.innerHTML="@";
                        a.setAttribute("title","Mailbox");
                        div.innerHTML+=" ";
                        div.appendChild(a);
                    }
                    div.innerHTML+=": ";
                    var prev=0;
                    if(pers['foafWorkplaceHomepage']){
                        var a = document.createElement("a");
                        a.href=pers['foafWorkplaceHomepage'];
                        a.innerHTML="Work";
                        a.setAttribute("title","Workplace Homepage for "+name);
                        div.innerHTML+=" ";
                        div.appendChild(a);
                        prev=1;
                    }
                    if(pers['foafWorkInfoHomepage']){
                        var a = document.createElement("a");
                        a.href=pers['foafWorkInfoHomepage'];
                        a.innerHTML="Work Info";
                        a.setAttribute("title","Workplace Info Page for "+name);
                        div.innerHTML+= prev>0?", ":" ";
                        div.appendChild(a);
                        prev=1;
                    }
                    if(pers['foafSchoolHomepage']){
                        var a = document.createElement("a");
                        a.href=pers['foafSchoolHomepage'];
                        a.innerHTML="School";
                        a.setAttribute("title","School Homepage for "+name);
                        div.innerHTML+= prev>0?", ":" ";
                        div.appendChild(a);
                        prev=1;
                    }
                    div.innerHTML+=". ";
                    var ka = document.createElement("a");
                    ka.setAttribute("onclick","var i=document.getElementById(\"foafKnows\");if(i.style.display==\"none\"){i.style.display=\"inline\";}else{i.style.display=\"none\";}");
                    ka.innerHTML+=" [knows: "+pers['knows'].length+" &raquo;]";
                    ka.setAttribute("title","knows: "+pers['knows'].length+" people.  Click to view/hide");
                    ka.style.cursor="pointer";
                    div.appendChild(ka);
                    var dd = document.createElement("span");
                    dd.style.display="none";
                    dd.setAttribute("id","foafKnows");
                    if(pers['knows'] && pers['knows'].length>0){
                        var l = document.createElement("ul");
                        for(var i=0;i<pers['knows'].length;i++){
                            var li = document.createElement("li");
                            li.appendChild(FOAF.renderPersonNameLink(pers['knows'][i]));
                            if(pers['knows'][i]['rdfsSeeAlso']){
                                var ex = document.createElement("a");
                                ex.setAttribute("href", "http://xml.mfd-consult.dk/foaf/explorer/?foaf=" + escape(pers['knows'][i]['rdfsSeeAlso']))
                                var ex_img = document.createElement("img");
                                // Embedded image, see http://rifers.org/blogs/gbevin/2005/4/11/embedding_images_inside_html
                                ex_img.src=FOAF_EXPLORER_ICON;
                                ex_img.width="16";
                                ex_img.height="16";
                                ex_img.style.border="0";
                                ex.appendChild(ex_img);
                                li.appendChild(document.createTextNode(" "));
                                li.appendChild(ex);
                            }
                            l.appendChild(li);
                        }
                        dd.appendChild(l);
                    }
                    var ex = document.createElement("a");
                    ex.setAttribute("href", "http://xml.mfd-consult.dk/foaf/explorer/?foaf=" + escape(url))
                    var ex_img = document.createElement("img");
                    // Embedded image, see http://rifers.org/blogs/gbevin/2005/4/11/embedding_images_inside_html
                    ex_img.src=FOAF_EXPLORER_ICON;
                    ex_img.width="16";
                    ex_img.height="16";
                    ex_img.style.border="0";
                    ex.appendChild(ex_img);
                    div.appendChild(ln);
                    div.appendChild(document.createTextNode(" "));
                    div.appendChild(ex);
                    div.appendChild(dd);
                    return div;
                }
                
            };
			var lnm = window._content.document.getElementsByTagName('link');
			var lnh;
            var d;
            for(var i = 0; i<lnm.length;i++){
                if((lnm[i].getAttribute('rel') == 'meta' || lnm[i].getAttribute('REL') == 'meta')
                 && (lnm[i].getAttribute('title')=='FOAF' || lnm[i].getAttribute('TITLE')=='FOAF')
                 && (lnm[i].getAttribute('type')=='application/rdf+xml' || lnm[i].getAttribute('TYPE')=='application/rdf+xml')){
                   lnh = lnm[i].getAttribute('href');
                   if(!lnh){
                    lnh = lnm[i].getAttribute('HREF');
                   }
                   break;
                }else{
                    //alert("link: "+lnm[i]);
                }
            }
            if(!lnh){
                lnm = window._content.document.getElementsByTagName('LINK');
                
                for(var i = 0; i<lnm.length;i++){
                    if((lnm[i].getAttribute('rel') == 'meta' || lnm[i].getAttribute('REL') == 'meta')
                     && (lnm[i].getAttribute('title')=='FOAF' || lnm[i].getAttribute('TITLE')=='FOAF')
                     && (lnm[i].getAttribute('type')=='application/rdf+xml' || lnm[i].getAttribute('TYPE')=='application/rdf+xml')){
                       lnh = lnm[i].getAttribute('href');
                       if(!lnh){
                        lnh = lnm[i].getAttribute('HREF');
                       }
                       break;
                    }else{
                        //alert("LINK: "+lnm[i]);
                    }
                }
            }
            if(!lnh && String(document.location).match(/\.rdf$/)){
              //see if current page is foaf.
              //XXX: doesn't seem to work correctly?  firefox displays the HTML preformatted.
              //lnh=String(document.location);
            }else if(!lnh){
                //lnh="foaf.rdf";//guess
            }
            var callback = function(details){
                if(details.status=="200"){
                    var x =details.responseText;
                    var dp = new DOMParser();
                    d = dp.parseFromString(String(x),"text/xml");
                    if(d){
                        do_parse(d);
                    }
                }
            };
            if(lnh){
                
                 var a = String(document.location);
                if(lnh.match(/^\//)){

                    lnh = a.replace(/(https?:\/\/[^\/]+)\/?.*$/,"$1"+lnh);
                }else if(!lnh.match(/^https?:\/\//i)){
                    lnh = a.replace(/\/?[^\/]*$/,"/"+lnh);
                }
                //alert("getting: '"+lnh+"'");
                try{
                    GM_xmlhttpRequest({
                      method:"GET",
                      url:lnh,
                      headers:{"Accept":"*/*"},
                      onload:callback
                    });
                }catch(e){
                    //alert("error: "+e);
                    throw e;
                }
            }
            function do_parse(d){
                var pt="";
                var foafpref;
                var rdfpref;
                var rdfspref;
                var seenrdf;
                var seenfoaf;
                for(var i=0;i<d.documentElement.attributes.length;i++){
                    var p = d.documentElement.attributes.item(i);
                    if(String(p.nodeName).match(/^xmlns:?.*$/)){
                        var z = (String(p.nodeName).match(/^xmlns:?(.*)$/))[1];
                        var uri=p.nodeValue;
                        
                        PREF[z] = uri;
                        if(NS[uri]){
                            NS[uri].push(z);
                        }else{
                            NS[uri] = [z];
                        }

                    }
                }
                if(NS[NSFOAF] && NS[NSRDF]){
                    var me;
                    var pers = d.documentElement.firstChild;
                    while(pers){
                        var uri = FOAF.rdfUri(pers);
                        
                        if(uri==NSFOAF+"Person"){
                            me=FOAF.parsePerson(pers);
                            break;
                        }
                        pers = pers.nextSibling;
                    }
                    if(me){
                        css = document.createElement("style");
                        css.setAttribute("type","text/css");
                        css.innerHTML=".foafPerson {padding:4px;background: #f0f0f0; border-bottom: 1px solid #a3a3a3;margin:0;text-align:left; vertical-align:middle;}"
                                      +".foafPerson img{vertical-align:middle; border:1px solid #aaa;}";
                        document.body.insertBefore(css,document.body.firstChild);
                        document.body.insertBefore(FOAF.renderPerson(me,lnh),document.body.firstChild);
                    
                    }
                }
            }
            
		

})();

