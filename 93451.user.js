// ==UserScript==
// @name           PPM More than PRO pack
// @author         grizzly
// @version        3.02
// @description    A script for the powerplaymanager hockey
// @lastchanges    Inserted the updater, and repaired the advertisment remover
// @include        http://hockey.powerplaymanager.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=93451&days=7&show
// ==/UserScript==

//Building settings menu
GM_registerMenuCommand("PPM Settings",showSet);

var SettingsButtonImageLink='http://www.iconarchive.com/icons/icontexto/webdev/32/webdev-config-icon.png';
var SettingsFrameBackgroundColor='#5c9ccc';
var SettingsFrameTextColor='#FFF';

//Settings done
var TeamPro=1;
var ee=document.getElementsByTagName('table');
for(var j=0; j< ee.length ; j++)
    if(ee[j].getAttribute('class')=='ppm_lath_2')
    {
        if(ee[j].childNodes[1].childNodes[0].childNodes[1].childNodes[3])
        {
            if(ee[j].childNodes[1].childNodes[0].childNodes[1].childNodes[1].attributes[0].nodeValue=='http://images.powerplaymanager.com/ppm/flags/_pp.gif')
                TeamPro=0; 
            var TeamLink=ee[j].childNodes[1].childNodes[0].childNodes[1].childNodes[3].attributes[0].nodeValue;
            var TeamName=ee[j].childNodes[1].childNodes[0].childNodes[1].childNodes[3].childNodes[0].nodeValue;
            break;
        }
    }

//Language and globals
var a=document.location.href.split('/');
var lin=a[0]+"//"+a[2]+"/"+a[3]+"/";
var lang=a[3];
var page=a[4].split('?')[0];
//Language settings and arrays:
var pages=Array();
switch(lang)
{
    case "en"://English
        {
            pages=["team.html","calendar.html","game-summary.html","team-news.html","next-game.html","staff-market.html","staff-member.html","players-practice.html"];// ppm pages
            szoveg=["Played tactics"];// strings
            break;
        }
    case "hu"://Hungarian
        {
            pages=["csapat.html","naptar.html","merkzes-osszefoglalas.html","csapat-hirek.html","kovetkez-merkzes.html","alkalmazotti-piac.html","alkalmazott.html","jatekosok-edzese.html"];
            szoveg=["Mérkőzés adatok"];
            break;
        }
    case "ro"://Romanian
        {
            pages=["echipa.html","calendar.html","rezumatul-meciului.html","stirile-echipei.html","meciul-urmator.html","personalul-de-piata.html","angajat.html","antrenamentul-jucatorilor.html"];
            szoveg=["Tactici jucate"];
            break;
        }
    case "de"://Deutch
	{
	    pages=["team.html","kalender.html","spielzusammenfassung.html","team-neuigkeiten.html","nachstes-spiel.html","personalmarkt.html","angestellter.html","training-des-spielers.html"];
            szoveg=["Spieldaten"];
	    break;
	}
}
//
onload=function(){

if (document.getElementsByClassName == undefined) {
    document.getElementsByClassName = function(className)
    {
        var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
        var allElements = document.getElementsByTagName("*");
        var results = [];

        var element;
        for (var i = 0; (element = allElements[i]) != null; i++) {
            var elementClass = element.className;
            if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
                results.push(element);
        }

        return results;
    }
}
}

function setCookie(c_name,value)
{
var expiredays=365;
var exdate=new Date();

exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}

function getCookie(c_name,def)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return def;
}

//global variables
var stat_num=getCookie("stat_num","5");
//done globals

//Show settings windows, and save settings
function saveSet()
{
	var d=document.getElementById('settings');
	 setCookie("stat_num",document.getElementById('stat_num').value);
	 setCookie("rem_adv",document.getElementById('rem_adv').value);
         setCookie("ShowScore",document.getElementById('ShowScore').value);
         setCookie("ShowAgentStat",document.getElementById('ShowAgentStat').value);
         setCookie("ShowAgentEarn",document.getElementById('ShowAgentEarn').value);
         setCookie("ShowPlayerSkils",document.getElementById('ShowPlayerSkils').value);

	removeAdvert(d);
}

function cancelSet()
{
	var d=document.getElementById('settings');
	removeAdvert(d);
}

function genSet()
{
	var s='';
	var str = document.createElement('div');
	str.setAttribute('id', 'settings');
	str.setAttribute('style', 'position: absolute;border: 1px solid #5c9ccc;padding: 5px;background-color: '+SettingsFrameBackgroundColor+';color: '+SettingsFrameTextColor+';opacity: 0.95;-webkit-border-radius: 5px;-moz-border-radius: 5px;width: 300px;height: 300px;text-align: center;z-index: 100000;top:'+((window.innerHeight/2)-(300/2))+'px;left:'+((window.innerWidth/2)-(300/2))+'px;color:#000;');
	s+='<center><table border="1">';
	s+='<tr><td>Match Statistics num</td><td><input type="text" id="stat_num" value="'+getCookie("stat_num","5")+'" /></td></tr>';
	s+='<tr><td>Remove adverts</td><td><select id="rem_adv"><option value="0" '+((parseInt(getCookie("rem_adv","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("rem_adv","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
        s+='<tr><td>Score on News</td><td><select id="ShowScore"><option value="0" '+((parseInt(getCookie("ShowScore","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("ShowScore","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
        s+='<tr><td>Staff Stat on market</td><td><select id="ShowAgentStat"><option value="0" '+((parseInt(getCookie("ShowAgentStat","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("ShowAgentStat","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
        s+='<tr><td>Staff stat on staff profile</td><td><select id="ShowAgentEarn"><option value="0" '+((parseInt(getCookie("ShowAgentEarn","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("ShowAgentEarn","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
	s+='<tr><td>Show Player Skill on training page</td><td><select id="ShowPlayerSkils"><option value="0" '+((parseInt(getCookie("ShowPlayerSkils","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("ShowPlayerSkils","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
        s+='<tr><td colspan="2" align="center"><input type="button" id="save_but" value="Save"/> <input type="button" id="cancel_but" value="Cancel"/></td></tr></table></center>';
	str.innerHTML=s;
	document.getElementsByTagName('body')[0].appendChild(str);
	return str;
}

function showSet()
{
	genSet();
	document.getElementById('save_but').addEventListener('click',saveSet,true);
	document.getElementById('cancel_but').addEventListener('click',cancelSet,true);
}
//settings done

//add settings button to the menu
function SetBut()
{
    var el=document.getElementsByTagName("img");
    for(var i=0; i<el.length ;i++)
        if(el[i].getAttribute('onmouseout')=='changeImg(img_logout.src, this);')
        {
            var but=el[i].parentNode.parentNode;
            break;
        }
    if(but)
        {
            var im=document.createElement('img');
            im.setAttribute('src', SettingsButtonImageLink);
            im.setAttribute('title', 'PPM script SETTINGS');
            im.setAttribute('style', 'border:none;width:30px;height:30px;');
            im.addEventListener('click',showSet,true);
            but.appendChild(im);
        }
}

//Remove advertising
function removeAdvert(node)
{
	node.parentNode.removeChild(node);
}
//remove done

//functions
function getXML(merkozes)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET",merkozes,false);
    xmlhttp.send();
    var xmlDoc=xmlhttp.responseText;
    return xmlDoc;
}

function getScore(xmlDoc,i)
{
    sc=xmlDoc.split("<td class='score'>");
    if((i==1)||(i==2))
    {
        s=sc[i];
        s=parseInt(s.split("</td>")[0]);
        return s;
    }
    else
        return "Undefined score id!";
}

function getStat(xmlDoc,team)
{ 
    table=xmlDoc.split("<table class='report_period' cellspacing='0' cellpadding='1'>")[2];
    table=table.split("</table>")[0];
    tr1=table.split("<tr class='tr1'>")[1];
    tr1="<tr class='tr1'>"+tr1.split("</tr>")[0]+"</tr>";
    tr2=table.split("<tr class='tr0'>")[1];
    tr2="<tr class='tr0'>"+tr2.split("</tr>")[0]+"</tr>";

    if(team)
    {
        s1=getScore(xmlDoc,1);
        s2=getScore(xmlDoc,2);
        t1=xmlDoc.split("<td colspan='2' class='team_name'>")[1];
        t1=t1.split("</td>")[0];
        t2=xmlDoc.split("<td colspan='2' class='team_name'>")[2];
        t2=t2.split("</td>")[0];
        tr0="<tr><td colspan='7'><center>"+t1+" ("+s1+") - ("+s2+") "+t2+"</center></td></tr>";
        return "<br/><table border='1' width='100%'>"+tr0+tr1+tr2+"</table>";
    }
    else
        return "<br/><table border='1'>"+tr1+tr2+"</table>";
}

function ShowScore()
{
        for (var i=0; i < document.links.length; i++)
        {
            var sel = document.links[i];
            if(sel.href.split(pages[2])[1])
            {
                xmlDOC=getXML(sel.href);
                if(sel.href.split('nt')[1])
			{
                                document.getElementsByClassName('tr0td1')[1].innerHTML+=' - ( '+getScore(xmlDOC,2)+' )';
				document.getElementsByClassName('tr1td1')[1].innerHTML+=' - ( '+getScore(xmlDOC,1)+' )';
			}
			else
			{
				document.getElementsByClassName('tr0td1')[0].innerHTML+=' - ( '+getScore(xmlDOC,1)+' )';
				document.getElementsByClassName('tr1td1')[1].innerHTML+=' - ( '+getScore(xmlDOC,2)+' )';
			}
                

                document.getElementsByClassName('msg_table')[0].parentNode.innerHTML+=getStat(xmlDOC,0);
                break;
            }
        }
}

function getAgentInfo(xmlDOC)
{
    t=xmlDOC.split("<table class='table_page' cellspacing='0' cellpadding='0'>")[2].split("<tr>")[4];
    t=t.split("</tr>")[0];
    t1=t.split("<td class='a0'>");
    return "<table border='1' style='width:240px'><tr><td class='a0'>"+t1[1]+"</tr><tr><td class='a0'>"+t1[2]+"</tr></table>";
}

function AgentStatShow()
{
    xmlDoc=getXML(this.href);
    var str = document.createElement('div');
    str.setAttribute('id', 'AStat');
    str.setAttribute('style', 'position: fixed;border: 1px solid #000;padding: 5px;background-color:#C0C0C0;-webkit-border-radius: 5px;-moz-border-radius: 5px;width: 240px;height: 45px;text-align: center;z-index: 100000;left:'+(window.innerWidth-270)+'px;top:'+(window.innerHeight-60)+'px;');
    str.innerHTML=getAgentInfo(xmlDoc);
    document.getElementsByTagName('body')[0].appendChild(str);
}

function AgentStatHide()
{
    removeAdvert(document.getElementById('AStat'));
}

function ShowAgentStat()
{
    for (var i=0; i < document.links.length; i++)
        {
            var sel = document.links[i];
            if(sel.href.split(pages[6])[1])
            sel.addEventListener('mouseover',AgentStatShow,true);
            sel.addEventListener('mouseout',AgentStatHide,true);
        }
}

function ShowMatchStat()
{
    removeAdvert(document.getElementsByClassName('msg_mini_4')[0]);
    d=document.getElementsByClassName('table_page');
    parentTable=d[0].parentNode;
    ss=parentTable.childNodes
    for(i=0;i<ss.length;i++)
        if(ss[i].nodeName=='STRONG')
            removeAdvert(ss[i]);
    while(d[0])
    {
        removeAdvert(d[0]);
        d=document.getElementsByClassName('table_page');
    }

    teamid=0;
    for (var i=0; i < document.links.length; i++)
    {
       sel = document.links[i];
       if((sel.href.split(pages[0])[1])&&(sel.href!=TeamLink))
           {
                teamid=parseInt(sel.href.split(pages[0])[1].split('?data=')[1].split('-'));
                break;
           }
    }
    mi=stat_num
    parentTable.innerHTML+='<table witdh="100%">';
    for(i=1;i<=mi;i++)
	{
		myDate=new Date();
                myDate.setDate(myDate.getDate() - i);
                y=myDate.getFullYear();
                m=myDate.getMonth()+1;
                d=myDate.getDate();
                nap_link1=lin+pages[1]+"?data="+teamid+"-"+d+"-"+m+"-"+y;
                //alert(nap_link1);
                if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                  xmlhttp=new XMLHttpRequest();
                }
                else
                {// code for IE6, IE5
                  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.open("GET",nap_link1,false);
                xmlhttp.send();
                var xmlDoc=xmlhttp.responseText;
                if(xmlDoc.split("<td valign='top' width='50%' class='main_table'>")[1].split('</td>')[0].split("<a href='http://hockey.powerplaymanager.com/hu/merkzes-osszefoglalas.html?data=")[1])
                {
                    merk=parseInt(xmlDoc.split("<a href='http://hockey.powerplaymanager.com/hu/merkzes-osszefoglalas.html?data=")[1].split("'"));
                    merkozes='http://hockey.powerplaymanager.com/hu/merkzes-osszefoglalas.html?data='+merk;
                
                    xmlDoc=getXML(merkozes);
                    parentTable.innerHTML+='<tr><td>'+getStat(xmlDoc,1)+'</td></tr>';
                }
                else
                    mi++;
	}
        parentTable.innerHTML+='</table>';
}

function ShowAgentEarn()
{
    a1=parseInt(document.getElementsByClassName('c1')[0].innerHTML.split(' ')[0]);
    a2=parseInt(document.getElementsByClassName('c3')[0].innerHTML.split(' ')[0]);
    ujfiz=Math.round((((a1*a1*a1)/10) + ((a2*a2*a2)/10))*0.95);
    document.getElementsByClassName('b0')[3].innerHTML+=' / <font style="color:red;" title="next salary">'+ujfiz+'</font>';
}

function ShowPlayerSkill()
{
    sorok=document.getElementsByClassName("name tr1td1").length;
    for(i=0; i<sorok;i++)
    {
        kap=document.getElementsByClassName("right tr1td2")[(i*4)+0];
        ved=document.getElementsByClassName("right tr1td1")[(i*3)+0];
        tam=document.getElementsByClassName("right tr1td2")[(i*4)+1];
        lo=document.getElementsByClassName("right tr1td1")[(i*3)+1];
        at=document.getElementsByClassName("right tr1td2")[(i*4)+2];
        tch=document.getElementsByClassName("right tr1td1")[(i*3)+2];
        agr=document.getElementsByClassName("right tr1td2")[(i*4)+3];

        if(((parseInt(kap.innerHTML.split('<')[0]))>(parseInt(ved.innerHTML.split('<')[0])))&&((parseInt(kap.innerHTML.split('<')[0]))>(parseInt(tam.innerHTML.split('<')[0]))))
        {//kapus
            kap.style['backgroundColor']='#CCC';
            at.style['backgroundColor']='#CCC';
            tch.style['backgroundColor']='#CCC';
        }

        if(((parseInt(ved.innerHTML.split('<')[0]))>(parseInt(kap.innerHTML.split('<')[0])))&&((parseInt(ved.innerHTML.split('<')[0]))>(parseInt(tam.innerHTML.split('<')[0]))))
        {//vedo
            ved.style['backgroundColor']='#CCC';
            at.style['backgroundColor']='#CCC';
            agr.style['backgroundColor']='#CCC';
        }

        if(((parseInt(tam.innerHTML.split('<')[0]))>(parseInt(ved.innerHTML.split('<')[0])))&&((parseInt(tam.innerHTML.split('<')[0]))>(parseInt(kap.innerHTML.split('<')[0]))))
        {//tamado
             if((parseInt(at.innerHTML.split('<')[0]))>(parseInt(agr.innerHTML.split('<')[0])))
                 {
                    tam.style['backgroundColor']='#CCC';
                    at.style['backgroundColor']='#CCC';
                    tch.style['backgroundColor']='#CCC';
                 }
             else
                 {
                    tam.style['backgroundColor']='#CCC';
                    agr.style['backgroundColor']='#CCC';
                    tch.style['backgroundColor']='#CCC';
                 }
        }
    }
    sorok=document.getElementsByClassName("name tr0td1").length;
    for(i=0; i<sorok;i++)
    {
        kap=document.getElementsByClassName("right tr0td2")[(i*4)+0];
        ved=document.getElementsByClassName("right tr0td1")[(i*3)+0];
        tam=document.getElementsByClassName("right tr0td2")[(i*4)+1];
        lo=document.getElementsByClassName("right tr0td1")[(i*3)+1];
        at=document.getElementsByClassName("right tr0td2")[(i*4)+2];
        tch=document.getElementsByClassName("right tr0td1")[(i*3)+2];
        agr=document.getElementsByClassName("right tr0td2")[(i*4)+3];

        if(((parseInt(kap.innerHTML.split('<')[0]))>(parseInt(ved.innerHTML.split('<')[0])))&&((parseInt(kap.innerHTML.split('<')[0]))>(parseInt(tam.innerHTML.split('<')[0]))))
        {//kapus
            kap.style['backgroundColor']='#CCC';
            at.style['backgroundColor']='#CCC';
            tch.style['backgroundColor']='#CCC';
        }

        if(((parseInt(ved.innerHTML.split('<')[0]))>(parseInt(kap.innerHTML.split('<')[0])))&&((parseInt(ved.innerHTML.split('<')[0]))>(parseInt(tam.innerHTML.split('<')[0]))))
        {//vedo
            ved.style['backgroundColor']='#CCC';
            at.style['backgroundColor']='#CCC';
            agr.style['backgroundColor']='#CCC';
        }

        if(((parseInt(tam.innerHTML.split('<')[0]))>(parseInt(ved.innerHTML.split('<')[0])))&&((parseInt(tam.innerHTML.split('<')[0]))>(parseInt(kap.innerHTML.split('<')[0]))))
        {//tamado
             if((parseInt(at.innerHTML.split('<')[0]))>(parseInt(agr.innerHTML.split('<')[0])))
                 {
                    tam.style['backgroundColor']='#CCC';
                    at.style['backgroundColor']='#CCC';
                    tch.style['backgroundColor']='#CCC';
                 }
             else
                 {
                    tam.style['backgroundColor']='#CCC';
                    agr.style['backgroundColor']='#CCC';
                    tch.style['backgroundColor']='#CCC';
                 }
        }
    }
}

//end

//Main function
function main()
{
        //Remove adverts
	if(parseInt(getCookie("rem_adv","1")))
	{
		//alert(GM_getValue("rem_adv","1"));
                $('iframe').parents('table[class="table_profile"]').remove();
                $('iframe').parents('table[class="table_page"]').remove();
                $('iframe').parents('tr:eq(1)').remove();
	}

	switch(page)
	{
		case pages[3]://hirek => merkozes eredmeny beszuras
		{
		    if(parseInt(getCookie("ShowScore","1"))){ShowScore();}
		    break;
		}
                case pages[4]://kovetkezo merkozes statisztikai
                {
                    if((a[4]==(pages[4]+"?data=b"))&&(parseInt(stat_num)>0)){ShowMatchStat();}
                    break;
                }
		case pages[5]://alkalmazott piac => alkalmazott statisztika
		{
		    if(parseInt(getCookie("ShowAgentStat","1"))){ShowAgentStat();}
		    break;
		}
                case pages[6]://alkalmazott profil => alkalmazott elore szamitott fizetes
		{
		    if(parseInt(getCookie("ShowAgentEarn","1"))){ShowAgentEarn();}
		    break;
		}
                case pages[7]://Jatekos Edzes => edzendo skillek mutatasa
		{
		    if(parseInt(getCookie("ShowPlayerSkils","1"))){ShowPlayerSkill();}
		    break;
		}
	}
        

	

}
//main done

//Adding the settings button
SetBut();

//run script
main();
