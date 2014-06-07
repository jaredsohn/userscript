// ==UserScript==
// @name           MyAstro
// @namespace      http://myastros.tandyukhosting.com/AE/
// @description    Scout helper
// @include        http://*.astroempires.com/*
// @exclude        http://*.astroempires.com/forum*
// @exclude        http://*.astroempires.com/home*
// @exclude        http://*.astroempires.com/commander*
// @exclude        http://*.astroempires.com/messages*
// @exclude        http://*.astroempires.com/board*
// @exclude        http://*.astroempires.com/guild*
// @exclude        http://*.astroempires.com/login*
// @exclude        http://alpha.astroempires.com/*
// @exclude        http://beta.astroempires.com/*
// @exclude        http://ceti.astroempires.com/*
// @exclude        http://delta.astroempires.com/*
// @exclude        http://epsilon.astroempires.com/*
// @exclude        http://fenix.astroempires.com/*
// @exclude        http://gamma.astroempires.com/*
// @exclude        http://helion.astroempires.com/*
// @exclude        http://ixion.astroempires.com/*
// @exclude        http://juno.astroempires.com/*
// ==/UserScript==

// 
//

var variant='1';
var $siteurl='http://myastros.tandyukhosting.com';
var SW_Version = 'V3_4_1';
now= new Date();
request_last_time=now.getTime()/1000;
var objs=new Array();
var att_array=new Array();                                
var attname_array=new Array();                                

var newurl='';var thisaction=0; var server='';var fleet='';var basedata='';var mapbase='';var baseastro='';
var basestruc='';var tableastro='';var scoutflag=0;var debris=0;var pagerequest='';
var rootphp=$siteurl+'/myastros10.php';
var tester='';
var href = window.location.href+"  ";
var Uagent=navigator.userAgent
if (href.search('alpha')>0){server='A'}
if (href.search('delta')>0){server='D'}
if (href.search('epsilon')>0){server='E'}
if (href.search('fenix')>0){server='F'}
if (href.search('gamma')>0){server='G'}
if (href.search('helion')>0){server='H'}
if (href.search('ixion')>0){server='I'}
if (href.search('juno')>0){server='J'}
searchelem = document.getElementById('account').parentNode.getElementsByTagName('th');
thisID = searchelem[1].innerHTML;thisID2=thisID.split('.');thisID = thisID2[1];
//thisID = 99;
if (href.search('base.aspx?')>0){tester=href.split('&')}
//********************************
//********************************
if (href.search('&view=move')>0){targetelement=document.getElementById('start');
                                     if(targetelement != null ) {astro=encodeURIComponent(targetelement.innerHTML)
                                                           senddata="lp="+thisID+"&server="+server+"&astro="+astro; 
                                                            newurl=$siteurl+'/majgn2.php';
                                                            GM_xmlhttpRequest({method:'POST',
                                                            url: newurl,
                                                            headers: {'Content-Type': 'application/x-www-form-urlencoded','User-Agent':Uagent},
                                                            data: senddata,
                                                            onload: function(details){}
                                                                                })                                                                
                                                            }
                                }
//*************************************

if (href.search('empire.aspx ')>-1){thisaction=31;}
if (href.search('view=units ')>-1){thisaction=32;}
var href = window.location.href;

 //*************************************
if ((href.search('fleet.aspx?')>-1) && (href.search('view=attack')>-1) ){
            at=document.getElementById('fleets_attack-list')
            e=at.getElementsByTagName('tr');
            //attackbutval=GM_getValue("attackbuttons");
            //GM_log(e.length);
            tempstr='';
            attackbutval=GM_getValue("attackbuttons");
            att_array2=attackbutval.split(',')
            for(var i=0;i<att_array2.length;i++){temparray=att_array2[i].split(':');
                                                if (temparray.length==2){att_array[i]=temparray[0];
                                                                        attname_array[i]=temparray[1];}
                                                else {att_array[i]=temparray[0];
                                                        attname_array[i]=" ";}
                                                }
            j=0;
            for(var i=e.length-1;i>2;i--){enew=e[i].getElementsByTagName('td');
                                            //GM_log(enew.length);
                                            if(enew.length==4){tempstr2=e[i].firstChild.nextSibling.firstChild.getAttribute('href')
                                                                tempstr3=tempstr2.split('=');
                                                                tempstr4=tempstr3[1];
                                                                tempstr=tempstr+tempstr4+',';
                                                                test=found(tempstr4,att_array)
                                                                //GM_log(test)
                                                                if(test){tempstr2=e[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.firstChild;
                                                                                                tempstr2.style.backgroundColor = 'red';
                                                                                                if(attname_array[test] !=" "){GM_log(attname_array[test]);
                                                                                                                            tempstr2=e[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.firstChild;
                                                                                                                            tempstr2.value = attname_array[test];}
                                                                                                objs[j]=e[i];
                                                                                                j++;
                                                                                                }
                                          
            
            
            
                                                            }
                                            }
            //GM_log(objs.length);
            
            for (var i=objs.length-1;i>-1;i--){var elmNewContent = document.createElement('tr');
                                                elmNewContent.appendChild(objs[i])
	                                           e[2].parentNode.insertBefore(objs[i], e[2].nextSibling);

                                               
                                               }
            GM_log(tempstr);


            
            
            
            }
else if (href.search('fleet.aspx?')>-1){at=document.getElementById('fleets-list')
            if(at != null){e=at.getElementsByTagName('tr');
            d = new Date();
            current_time=d.getTime()
            newtemp='';
            for(var i=0;i<e.length;i++){enew=e[i].getElementsByTagName('td');
                                            if(enew.length==6){tempstr2=e[i].firstChild.nextSibling.nextSibling.nextSibling.getAttribute('title')
                                                                if(tempstr2){tempstr3=e[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
                                                                            tempstr4=tempstr3.replace(/\,/g,'');
                                                                            tempstr5=tempstr4.replace(/\ /g,'');
                                                                            newtemp=newtemp+tempstr5+':'+(current_time+(tempstr2*1000))+'**';
                                                                            
                                                                            }
                                                                }
                                        }
                                        senddata="lp="+thisID+"&server="+server+"&fleet="+newtemp; 
                                        newurl=$siteurl+'/ma_fleets.php';
                                        GM_xmlhttpRequest({method:'POST',
                                        url: newurl,
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded','User-Agent':Uagent},
                                        data: senddata,
                                        onload: function(details){}})
                                                                            
                                        }
            }

                                                                                                                               
//*************************************
if (href.search('profile.aspx?')>0){targetelement=document.getElementById('profile_show');
                                                                                                      
                              if(targetelement != null ) {player=href.split('=');
                                                           senddata="lp="+thisID+"&server="+server+"&player="+player[1]; 
                                                            newurl=$siteurl+'/ma_plp.php';
                                                            GM_xmlhttpRequest({method:'POST',
                                                            url: newurl,
                                                            headers: {'Content-Type': 'application/x-www-form-urlencoded','User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.6) Gecko/20100625 Firefox/3.6.6 (.NET CLR 3.5.30729)'},
                                                            data: senddata,
                                                            onload: function(details){}
                                                                                })                                                                
                                                            } 
                                }
//***************************************
                                
var oindex=0;
var mylink='';
var enable=0;
var details='';
if (document.body.innerHTML.search('Server is temporarily closed')<1 && tester.length<2){
if (href.search('base')>0){split1=document.body.innerHTML.split('map.aspx?loc=');split2=split1[1].split('">');baseastro=split2[0];}
else{verify=href.split(':');
        if (verify.length==5){if (document.body.innerHTML.search('Asteroid Belt')<1){
                                if (document.body.innerHTML.search('Gas Giant')<1){
                                    split1=document.body.innerHTML.split('Terrain:</b>');split2=split1[1].split('<br');tableastro=split2[0];
                                    var thisast=href.split('loc=');var baseastro=thisast[1];}
                                                                                    }
                                }        
        
         if (verify.length==3){ split0=document.getElementsByTagName('script')
            
                                split1=split0.length
                                teststr="COLOR('');UNDERLINE('');"
                                GM_log(split1+"scripts");
                                scoutflag=1;
                                for(var i in split0){thistag=split0[i].innerHTML;
                                                    if(thistag != null){
                                                                        //GM_log(thistag.toUpperCase());
                                                                        
                                                            if(thistag.toUpperCase()==teststr){scoutflag=0;}
                                                            }
                                                            }
                                
                                }
                                
         
                                
                                              
                                
}
searchelem1 = document.getElementById('myCanvas');
if (searchelem1 != null){thisaction=55;
                        finddefault=document.body.innerHTML.split('BR.jpg');
                        finddefault2=finddefault[0].split('-');
                        finddefault=finddefault2[finddefault2.length-1];
                        }

if (server!='') {
var orderindex=0; var bases=0;lastj=0;
var parsedata='';

searchelem = document.getElementById('map_fleets');
if(searchelem == null){searchelem = document.getElementById('base_fleets');}
if(searchelem != null){fleet=searchelem.innerHTML;}
searchelem = document.getElementById('base_processing-capacities');
if(searchelem != null){basedata=searchelem.innerHTML;}
searchelem = document.getElementById('map_base');
if(searchelem != null){mapbase=searchelem.innerHTML;}
searchelem = document.getElementById('base_resume-structures');
if(searchelem != null){basestruc=searchelem.innerHTML;
                        //GM_log(basestruc)
                        }
ticker='';
split1=document.body.innerHTML.split('</table>');split2=split1[split1.length-1];
if (split2.search(' credits in')>-1){split3=split2.split('center>');split4=split3[1].split(' ');debris=split4[0];}
split1=document.body.innerHTML.split('News:');
if(split1.length>1){split2=split1[1].split('</marquee>');
ticker=encodeURIComponent(split2[0]); }
//GM_log(split2[0]);
//GM_log(ticker);
//server='D';

encdata=encodeURIComponent(href);encfleet=encodeURIComponent(fleet);encbase=encodeURIComponent(basedata);encmapbase=encodeURIComponent(mapbase);encbasestruc=encodeURIComponent(basestruc);enctableastro=encodeURIComponent(tableastro);
newurl=rootphp; 
senddata="lp="+thisID+"&server="+server+"&level="+SW_Version+"&action="+thisaction+"&data="+encdata+"&table="+encfleet+"&base="+encbase+"&mapbase="+encmapbase+"&baseastro="+baseastro+"&basestruc="+encbasestruc+"&tableastro="+enctableastro+"&scout="+scoutflag+"&debris="+debris+"&ticker="+ticker                              
if(thisaction==55){senddata="lp="+thisID+"&server="+server+"&level="+SW_Version+"&action="+thisaction+"&data="+encdata+"&defaultgal="+finddefault}
//GM_log(thisaction);
//GM_log(senddata);
var details2='';
GM_xmlhttpRequest({method:'POST',
                    url: newurl,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','User-Agent':Uagent},
                    data: senddata,
                    onload: function(details){  details2=details;
                                                
                                                window.setTimeout(function() {
                                                var elmNewContent = document.createElement('div');
                                                alltext=details2.responseText.split('**MA**');
                                                elmNewContent.innerHTML=alltext[0];
                                                if(alltext.length>1){
                                                                    if(alltext[1]=='Messages'){//GM_log(alltext[2]);
                                                                                                mylink = document.createElement('div');
                                                                                                mylink.innerHTML=alltext[2];
                                                                                                targetelement=document.getElementById('messages');
                                                                                                targetlock=targetelement;
                                                                                                targetlock.nextSibling.appendChild(mylink)
                                                                                                //targetlock.innerHTML=targetlock.innerHTML+mylink;
                                                                                                }
                                                                    }
                                                //GM_log(details.responseText)
                                                var details='';
                                                //document.body.innerHTML=document.body.innerHTML+unescape(details.responseText);}
                                                document.body.appendChild(elmNewContent);
                                                var enable=0;
                                                searchelem = document.getElementById('myastrosweep'+variant);
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { sendrequestshell(oindex,thisID,server,SW_Version,enable) }, false);
                                                                        }
                                                searchelem = document.getElementById('sweeptimer'+variant);
                                                if (searchelem!=null){  
                                                                        user_sweep=GM_getValue("user_timer");
                                                                        if(user_sweep=='undefined'){user_sweep=0;GM_setValue("user_timer",0);}
                                                                        searchelem.value=user_sweep
                                                                        searchelem.addEventListener("change",function (f) { searchelem = document.getElementById('sweeptimer'+variant);
                                                                                                                            new_val=parseFloat(searchelem.value);
                                                                                                                            if(isNaN(new_val)){new_val=0}
                                                                                                                            if(new_val<0){new_val=0}
                                                                                                                            if(new_val>4){new_val=4}
                                                                                                                            searchelem.value=new_val;
                                                                                                                            GM_setValue("user_timer",new_val); 
                                                                                                                            }, false);
                                                                        }
                                                searchelem = document.getElementById('attackbuttons');
                                                if (searchelem!=null){  
                                                                        attackbutval=GM_getValue("attackbuttons");
                                                                        if(attackbutval=='undefined'){attackbutval=0;GM_setValue("attackbuttons","");}
                                                                        searchelem.value=attackbutval
                                                                        searchelem.addEventListener("change",function (f) { searchelem = document.getElementById('attackbuttons');
                                                                                                                            new_val=searchelem.value;
                                                                                                                            searchelem.value=new_val;
                                                                                                                            GM_setValue("attackbuttons",new_val); 
                                                                                                                            }, false);
                                                                        }
                                                searchelem = document.getElementById('getbases'+variant);
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { ajaxbases(thisID,server,SW_Version) }, false);
                                                                        }
                                                searchelem = document.getElementById('Map1');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map1') }, false);}
                                                searchelem = document.getElementById('Map2');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map2') }, false);}
                                                searchelem = document.getElementById('Map3');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map3') }, false);}
                                                searchelem = document.getElementById('Map4');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map4') }, false);}
                                                searchelem = document.getElementById('Map5');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map5') }, false);}
                                                searchelem = document.getElementById('Map6');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map6') }, false);}
                                                searchelem = document.getElementById('Map7');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map7') }, false);}
                                                searchelem = document.getElementById('Map8');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map8') }, false);}
                                                searchelem = document.getElementById('Map9');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map9') }, false);}
                                                searchelem = document.getElementById('Map10');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map10') }, false);}
                                                searchelem = document.getElementById('Map11');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map11') }, false);}
                                                searchelem = document.getElementById('Map12');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map12') }, false);}
                                                searchelem = document.getElementById('Map13');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map13') }, false);}
                                                searchelem = document.getElementById('Map14');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map14') }, false);}
                                                searchelem = document.getElementById('Map15');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map15') }, false);}
                                                searchelem = document.getElementById('Map16');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map16') }, false);}
                                                searchelem = document.getElementById('Map17');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map17') }, false);}
                                                searchelem = document.getElementById('Map18');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map18') }, false);}
                                                searchelem = document.getElementById('Map19');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map19') }, false);}
                                                searchelem = document.getElementById('Map20');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map20') }, false);}
                                                searchelem = document.getElementById('Map21');
                                                if (searchelem!=null){searchelem.addEventListener("click",function (f) { changemapshell('Map21') }, false);}
                                                                       
                                            
                                                }, 4000);
                                                }
                     })

        }
    
  
  }
function found(needle,haystackarray){for (hay in haystackarray){//GM_log(haystackarray[hay]);
                                                                if (needle==haystackarray[hay]){return hay;}
                                                                } 
                                    return false;
                                    }

function sendrequestshell(oindex,lp,server,SW_version){
                            if (enable==0){enable=1;
                                            sendrequest(oindex,lp,server,SW_version);} 
                                           }
function ajaxbases(lp,server,SW_version){   senddata="lp="+thisID+"&server="+server; 
                                            newurl=$siteurl+'/ma_pl_bases2.php';
                                            searchelem = document.getElementById('getbases'+variant);
                                            searchelem.value='Retrieving... please wait';
                                            GM_xmlhttpRequest({method:'POST',
                                                                url: newurl,
                                                                headers: {'Content-Type': 'application/x-www-form-urlencoded','User-Agent':Uagent},
                                                                data: senddata,
                                                                onload: function(details){  mybases = document.getElementById('rowstart');
                                                                        mybases.innerHTML=details.responseText;
                                                                        document.body.appendChild(mybases);
                                                                        searchelem = document.getElementById('myastrosweep'+variant);
                                                                        if (searchelem!=null){searchelem.addEventListener("click",function (f) { sendrequestshell(oindex,thisID,server,SW_Version,enable) }, false);
                                                                                            }
                                                                        }
                                                            })
                            
                                             
                                           }
function changemapshell(mapval){searchelem = document.getElementById(mapval);url=searchelem.firstChild.name;
                                searchelem1 = document.getElementById('myCanvas');
                                if (searchelem1 != null){searchelem2 = document.getElementById('myCanvas').parentNode;
                                if (searchelem != null){
                                newurl2=url;
                                searchelem2.setAttribute('background', newurl2)
                                                      }
                                                        }
                                }
                                          
function sendrequest(oindex,lp,server,SW_version){//GM_log(oindex);
                                searchelem = document.getElementById('myastrosweep'+variant);
                                searchelem.firstChild.setAttribute('value','Sweeping...'+(oindex+1))
                                searchelem= document.getElementById('row'+oindex+''+variant);
                                
                                if(searchelem==null){searchelem2= document.getElementById('row'+(oindex-1)+''+variant);
                                                    searchelem2.style.backgroundColor='transparent'
                                                    searchelem = document.getElementById('myastrosweep'+variant);
                                                    searchelem.firstChild.setAttribute('value','Sweep Done')
                                                    href = escape(window.location.href);
                                                    processurl=$siteurl+'/AE/gal_map_create.php?address='+href
                                                    if (verify.length==3){GM_xmlhttpRequest({method:'GET',
                                                                        url: processurl,
                                                                        headers: {'User-agent': Uagent,
                                                                        'Accept': 'application/atom+xml,application/xml,text/xml'}
                                                                        })
                                                                        }
                                                    }
                                else {if (oindex>0) {
                                                    searchelem2= document.getElementById('row'+(oindex-1)+''+variant);
                                                searchelem2.style.backgroundColor='transparent'}
                                                //GM_log(searchelem.style.backgroundColor);
                                                if(searchelem.style.backgroundColor !='rgb(136, 136, 136)'){searchelem.style.backgroundColor='#444444';
                                                                                                pagerequest='Base'}
                                                else{pagerequest='Structure'}
                                
                                nexturl=searchelem.firstChild.nextSibling.nextSibling.firstChild.getAttribute('href');
                                if (nexturl==null){nexturl=searchelem.firstChild.nextSibling.nextSibling.firstChild.firstChild.getAttribute('href');}
                                marked=searchelem.firstChild.innerHTML;
                                if (marked==null){marked=searchelem.firstChild.firstChild.innerHTML;}
                                GM_log(marked);
                                if (marked != 'x')
                                {now = new Date()
                                request_new_time = now.getTime()/1000;
                                time_gap=request_new_time-request_last_time;
                                if(time_gap<1){alert("Timer underrun : "+time_gap);}
                                request_last_time=now.getTime()/1000;
                                GM_xmlhttpRequest({method:'GET',
                                        url: nexturl,
                                        headers: {'User-agent': Uagent,
                                        'Accept': 'application/atom+xml,application/xml,text/xml'},
                                        onload: function(details){  temp=details.responseText;
                                                                    temptxt5=details.responseText;
                                                                    //GM_log(temptxt5);
                                                                    if (temp.search('pausedone')>-1){  //GM_log(temp);
                                                                                                    temptext2=temp.split('<ma>')
                                                                                                    oindex++;
                                                                                                    thisdelay=parseFloat(temptext2[1])
                                                                                                    if (thisdelay<0){thisdelay=.1;}
                                                                                                    if (thisdelay==''){thisdelay=2;}
                                                                                                    if (thisdelay==0){thisdelay=2;}
                                                                                                    user_sweep=parseFloat(GM_getValue("user_timer"));
                                                                                                    thisdelay=thisdelay+user_sweep
                                                                                                    window.setTimeout(function() { sendrequest(oindex,lp,server,SW_version) }, thisdelay*1000);
                                                                                                    }
                                                                    else {
                                                                    if (temp.search('images/astros/unknown.jpg')>-1){encdata='NoEyes';}
                                                                    else if (temp.search('Server is temporarily closed')>-1){encdata='ServerDown';}
                                                                    else {
                                                                        temp2=temp.split("table id='base_fleets'");
                                                                        if (temp2.length>1){temp3=temp2[1].split('</table>');
                                                                                        encdata=temp3[0];
                                                                                        }
                                                                        else {temp2=temp.split("table id='map_fleets'");
                                                                                if (temp2.length>1){temp3=temp2[1].split('</table>');
                                                                                                    encdata=temp3[0];
                                                                                                    }
                                                                                else {encdata='NoFleet'}
                                                                                }
                                                                        if (temptxt5.search("<table id='map_base'")>-1){
                                                                            temp2=temptxt5.split("<table id='map_base'")
                                                                            temp3=temp2[1].split("<br />")
                                                                            temp4="<table id='map_base'"+temp3[0];
                                                                            
                                                                            }
                                                                            else {temp4=''}
                                                                    encmapbase=encodeURIComponent(temp4);
                                                                    encdata=encodeURIComponent(encdata); 
                                                                    }
                                                                    if (temptxt5.search("<table class='system'")>-1){
                                                                            temp2=temptxt5.split("<table class='system'")
                                                                            temp3=temp2[1].split("</table>")
                                                                            temp4="<table class='system'"+temp3[0];
                                                                            encmapbase=encodeURIComponent(temp4);
                                                                            //GM_log(temp4);
                                                                            encdata=encodeURIComponent('System'); 
                                                                    
                                                                            }                                
                                                                    if (pagerequest=='Structure'){encdata=encodeURIComponent('Structure');
                                                                                                    if (temptxt5.search("<table id='base_resume-structures' align='center' width='600'>")>-1)
                                                                                                    {
                                                                                                    temp2=temptxt5.split("<table id='base_resume-structures' align='center' width='600'>")
                                                                                                    temp3=temp2[1].split("</table>")
                                                                                                    temp4="<tbody>"+temp3[0];
                                                                                                    }
                                                                                                    else {temp4=''}
                                                                                                    encmapbase=encodeURIComponent(temp4);
                                                                                                    //GM_log(temp4); 
                                                                                                    }
                                                                    sendondata(oindex,lp,server,SW_version,encdata,encmapbase);
                                                                    //GM_log('Im here');
                                                                    }
                                                                    
                                                                    
                                                                    
                                                                    }
                                                                    
                                                    })
                                                    }
                                        else {oindex++;sendrequest(oindex,lp,server,SW_version)}
                                        }
                                }
                                        
                                        
                         
function sendondata(oindex,lp,server,SW_version,encdata,encmapbase){searchelem= document.getElementById('row'+oindex+''+variant);
                                               sweepastro=searchelem.firstChild.nextSibling.nextSibling.firstChild.firstChild.innerHTML;
                                                if (sweepastro==null){sweepastro=searchelem.firstChild.nextSibling.nextSibling.firstChild.innerHTML;}
                                                if (sweepastro==null){alert(Line370);}//nexturl=rootphp+'?lp='+lp+'&server='+server+'&action=54&level='+SW_Version+'&astrosw='+sweepastro+"&mapbase="+encmapbase+'&alldata='+encdata;
                                               nexturl=rootphp;
                                               varaction=54
                                               if (encdata==escape('Structure')){varaction=550}
                                               $_data='lp='+lp+'&server='+server+'&action='+varaction+'&level='+SW_Version+'&astrosw='+sweepastro+"&mapbase="+encmapbase+'&alldata='+encdata;
                                               //GM_log($_data);
                                               GM_xmlhttpRequest({method:'POST',
                                               url: nexturl,
                                               headers: {'Content-Type': 'application/x-www-form-urlencoded',
                                                        'User-agent': Uagent,
                                                        'Accept': 'application/atom+xml,application/xml,text/xml'},
                                               data: $_data,
                                               onload: function(resdetails){  temptext=resdetails.responseText;
                                                                            //GM_log(temptext);
                                                                            temptext2=temptext.split('<ma>')
                                                                            var details='';
                                                                            if (temptext2[0]=='OK')
                                                                                         {searchelem= document.getElementById('row'+oindex+''+variant);
                                                                                            searchelem2= document.getElementById('flt'+oindex+''+variant);
                                                                                            if (temptext2[1]!='NoFleets'){
                                                                                                        searchelem2.innerHTML=temptext2[1];
                                                                                                        
                                                                                                        searchelem2.nextSibling.innerHTML='<small>0</small>';
                                                                                                                        }
                                                                                                        else {searchelem2.innerHTML='';}
                                                                                         
                                                                                            searchelem2.nextSibling.innerHTML='<small>0</small>';
                                                                                         searchelem.innerHTML=unescape(temptext2[2]);
                                                                                                     
                                                                                            oindex++;
                                                                                        //GM_log('Delay:'+temptext2[3])
                                                                                        thisdelay=parseFloat(temptext2[3])
                                                                                        if (thisdelay<0){thisdelay=.1;}
                                                                                        if (thisdelay==''){thisdelay=2;}
                                                                                        if (thisdelay==0){thisdelay=2;}
                                                                                        user_sweep=parseFloat(GM_getValue("user_timer"));
                                                                                        thisdelay=thisdelay+user_sweep
                                                                                        window.setTimeout(function() { sendrequest(oindex,lp,server,SW_version) }, thisdelay*1000);
                                                                                        
                                                                                        }
                                                                            else if (temptext2[0]=='System'){searchelem= document.getElementById('row'+oindex+''+variant);
                                                                                            searchelem2= document.getElementById('flt'+oindex+''+variant);
                                                                                            searchelem.innerHTML=unescape(temptext2[2]);
                                                                                                     
                                                                                            oindex++;
                                                                                        GM_log('clear bases:'+temptext2[6])
                                                                                        icon_list=temptext2[6].split(',')
                                                                                        for (var i in icon_list){searchelem= document.getElementById('chk_'+icon_list[i]);
                                                                                                                if(searchelem != null){searchelem.innerHTML='x';}
                                                                                                                } 
                                                                                        thisdelay=parseFloat(temptext2[3])
                                                                                        if (thisdelay<0){thisdelay=.1;}
                                                                                        if (thisdelay==''){thisdelay=2;}
                                                                                        if (thisdelay==0){thisdelay=2;}
                                                                                        user_sweep=parseFloat(GM_getValue("user_timer"));
                                                                                        thisdelay=thisdelay+user_sweep
                                                                                        window.setTimeout(function() { sendrequest(oindex,lp,server,SW_version) }, thisdelay*1000);
                                                                                        
                                                                                        }
                                                                            else if (temptext2[0]=='Structure'){searchelem= document.getElementById('row'+oindex+''+variant);
                                                                                                            nexturl=searchelem.firstChild.nextSibling.nextSibling.firstChild.getAttribute('href');
                                                                                                            if (nexturl==null){nexturl=searchelem.firstChild.nextSibling.nextSibling.firstChild.firstChild.getAttribute('href');
                                                                                                            searchelem.firstChild.nextSibling.nextSibling.firstChild.firstChild.setAttribute('href',temptext2[1]);}
                                                                                                            else {searchelem.firstChild.nextSibling.nextSibling.firstChild.setAttribute('href',temptext2[1]);}
                                                                                                            searchelem.style.backgroundColor='#888888'                    
                                                                                                            
                                                                                                            thisdelay=parseFloat(temptext2[2]);
                                                                                                            if (thisdelay<0){thisdelay=.1;}
                                                                                                            if (thisdelay==''){thisdelay=2;}
                                                                                                            if (thisdelay==0){thisdelay=2;}
                                                                                                            user_sweep=parseFloat(GM_getValue("user_timer"));
                                                                                                            thisdelay=thisdelay+user_sweep
                                                                                                            window.setTimeout(function() { sendrequest(oindex,lp,server,SW_version) }, thisdelay*1000);
                                                                                                            }
                                                                                                                                
                                                                            else if (temptext2[0]=='NotOK'){searchelem= document.getElementById('row'+oindex+''+variant);
                                                                                                            searchelem.innerHTML=temptext2[2];}
                                                                            else if (temptext2[0]=='galaxydone'){   thisdelay=parseFloat(temptext2[1]);
                                                                                                                    if (thisdelay<0){thisdelay=.1;}
                                                                                                                    if (thisdelay==''){thisdelay=2;}
                                                                                                                    if (thisdelay==0){thisdelay=2;}
                                                                                                                    oindex++;
                                                                                                                    user_sweep=parseFloat(GM_getValue("user_timer"));
                                                                                                                    thisdelay=thisdelay+user_sweep
                                                                                                                    window.setTimeout(function() { sendrequest(oindex,lp,server,SW_version) }, thisdelay*1000);
                                                                                                                    }
                                                                            
                                                                            
                                                                                                            
                                                                            }
                                                                })
                                            }

                            
                                
