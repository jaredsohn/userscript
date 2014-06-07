// Ultibot's Clan Administrator
// Copyright (c) 2013, "Ultibot"<Ultimater at gmail dot com>
// You can reach me at the above email address if you have inquiries regarding this script
// Released under the GNU General Public License
// http://www.gnu.org/copyleft/gpl.html
// http://www.gnu.org/licenses/gpl.html
//
//Versions:
//1.1: initial release - July 12th 2013
//
// ==UserScript==
// @name	Ultibot's Clan Administrator
// @namespace	http://kol.ultimater.net/ultibot_clan_administrator/
// @version	1.1
// @description	Version 1.0 - Makes it easier to administrate clannies directly via their profile
// @copyright	2013, "Ultibot"<Ultimater at gmail dot com>
// @license	GNU-GPL http://www.gnu.org/licenses/gpl.html
// @include	*kingdomofloathing.com/showplayer.php?who=*
// @include	*127.0.0.1:*/showplayer.php?who=*
// @exclude	http://images.kingdomofloathing.com/*
// @exclude	http://forums.kingdomofloathing.com/*
// @grant	unsafeWindow
// ==/UserScript==



try
{

    var script_global={};
    script_global.dialogOpen=false;
    script_global.alreadyInitiated=false;
    
    function xmlhttpRequest(o)
    {
        var x=new XMLHttpRequest();
        x.open(o.method,o.url);
        x.onreadystatechange=function()
        {
            if(x.readyState!=4)return;
            o.onload(x);
        }
        x.send(null);
    }
    
    function requestPage(page,callback)
    {
        //GM_xmlhttpRequest({method:'GET',url:page,onload:function(x){callback(x.responseText||"");}});
        xmlhttpRequest({method:'GET',url:page,onload:function(x){callback(x.responseText||"");}});
        //if(page=='clan_detailedroster.php'){setTimeout(function(){callback('<a class="nounder" href="showplayer.php?who=1487928"><b>Ultibot</b>&nbsp;&nbsp;</a>');},100);}
        //if(page=='clan_members.php?begin=1'){setTimeout(function(){callback(unsafeWindow.document.getElementById('resp').value);},100);}
    }                
 
    function snipe_whois(obj)
    {
        var memberId=obj.memberId;
        var cmd='/whois '+memberId;
        (new unsafeWindow.Function("top.chatpane.submitchat('"+cmd+"');"))();
    }
    
	function administer(obj)
	{
        var memberId=obj.memberId;
        var html=obj.html;
		if(typeof obj.html=='undefined')
		{
			return pullFullClanRoster(function(html){obj.html=html;administer(obj)});
		}
		if(!(new RegExp("href=\"showplayer\\.php\\?who="+memberId+"\"","").test(html)))
		{
			return alert('Member not found in your clan roster!');
		}
        
        function addScript(head,s)
        {
        var script=unsafeWindow.document.createElement('script');
        script.src=s;
        script.type='text/javascript';
        head.appendChild(script);
        }
        function addStylesheet(head,s)
        {
        var link=document.createElement('link');
        link.rel='stylesheet';
        link.href=s;
        head.appendChild(link);
        }
        
        if(!script_global.alreadyInitiated)
        {
            script_global.alreadyInitiated=true;
            var head=document.getElementsByTagName('head')[0];
            var versions={
              jquery:'1.9.1',
              jqueryui:'1.10.0'
            };
            addStylesheet(head,'http://ajax.googleapis.com/ajax/libs/jqueryui/'+versions.jqueryui+'/themes/redmond/jquery-ui.css');
            addScript(head,'http://code.jquery.com/jquery-'+versions.jquery+'.js');
            addScript(head,'http://ajax.googleapis.com/ajax/libs/jqueryui/'+versions.jqueryui+'/jquery-ui.js');
            (new unsafeWindow.Function("$('<style>.ulti_dialog{font-size:12px;}</style>').appendTo('head');"))();
        }
        pullClanMembersByPage(1,function(page,html){
            var m=html.match(/Members (\d+) - (\d+) of (\d+)/);
            var perPage=m[2];
            var members=m[3];
            var pages=Math.ceil(members/perPage);
            //alert('pages: '+pages);
            html=html.substring(html.indexOf('<form'),html.lastIndexOf('</form>')+7);
            if(new RegExp("href=\"showplayer\\.php\\?who="+memberId+"\"","").test(html))
            {
                //Found on first page
                return processHTML(memberId,html);
            }else{
                //Need to go to 2nd page
                return pageThroughClanMembers(pages,memberId,2);
            }
        });
	}
    
    function pageThroughClanMembers(pages,memberId,start)
    {
        if(start>pages)return alert('Ran out of pages!\nIf you are seeing this error, the page counting algorithm is broken.\nPlease contact Ultibot!');
        pullClanMembersByPage(start,function(page,html){
            html=html.substring(html.indexOf('<form'),html.lastIndexOf('</form>')+7);
            if(new RegExp("href=\"showplayer\\.php\\?who="+memberId+"\"","").test(html))
            {
                return processHTML(memberId,html);
            }else{
                return pageThroughClanMembers(pages,memberId,start+1);
            }
        });
    }
    
    function processHTML(memberId,html)
    {
        found=false;
        var offset={open:-1,close:-1};
        for(var i=0;i<120;i++)
        {
            offset.open=html.indexOf('<tr>',offset.open+1);
            offset.close=html.indexOf('</tr>',offset.close+1)+5;
            var str=html.substring(offset.open,offset.close);
            if(!str)break;
            if(!(new RegExp("href=\"showplayer\\.php\\?who="+memberId+"\"","").test(str)))continue;
            found=true;break;
        }
        if(found)
        {
             //alert(str);
             var e=document.getElementById('dialog');
            var form=html.substring(0,html.indexOf('<tr>'));
            e.innerHTML=form+'<input type="hidden" autofocus="autofocus" /><center><table style="border: 1px solid black;margin-top:10px;" cellpadding="3" cellspacing="0"><tr><td align="center"><b>Player</b></td><td align="center"><b>Rank</b></td><td align="center"><b>Title</b></td><td align="center"><b>Boot</b></td></tr>'+str+'</table></center></form>';
            var inputs=e.getElementsByTagName('input');
            for(var i=0;i<inputs.length;i++){
            inputs[i].setAttribute('size','15');
            }
            var selects=e.getElementsByTagName('select');
            for(var i=0;i<selects.length;i++){
            selects[i].style.width='150px';
            }
            with(unsafeWindow){
            unsafeWindow.opts_obj={
                dialogClass:'ulti_dialog',
                width: 540, height: 170, position:{at:"top+15%"},
                buttons:{
                "Modify Member":function(){$( this ).dialog( "close" );document.forms['modify'].submit();},
                "Cancel": function(){$( this ).dialog( "close" );}
            },
                close:function(event,ui){script_global.dialogOpen=false;}
            };
            }
            var fn=new unsafeWindow.Function('setTimeout(function(){$( "#dialog" ).dialog(opts_obj);},100);');
             fn();
       }
    }
    function pullClanMembersByPage(page,callback)
    {
        requestPage('clan_members.php?begin='+page,function(html){callback(page,html);})
    }
	
	function pullFullClanRoster(callback)
    {
        requestPage('clan_detailedroster.php',function(html){callback(html);})
	}
	
	with(unsafeWindow)
	{
	
		var memberId="0";
		var body=document.getElementsByTagName('body')[0];
        
        
        var div=document.createElement("div");
        div.id="dialog";
        div.setAttribute('title',"Edit Member");
        div.appendChild(document.createTextNode('-'));
        div.style.display='none';
        div.style.padding="0";
        div.style.margin="0";
        body.appendChild(div);
        
		var m=body.innerHTML.match(/\(\#(\d+)\)/);
		if(m){memberId=m[1];}
		var a=document.createElement("a");
        //a.id="administer";
		a.appendChild(document.createTextNode("modify clan member"));
		a.href="#";
        a.addEventListener('click', function(evt){evt.preventDefault();script_global.dialogOpen=true;administer({memberId:memberId});}, false);
		var a2=document.createElement("a");
		a2.appendChild(document.createTextNode("whois"));
		a2.href="#";
        a2.addEventListener('click', function(evt){evt.preventDefault();snipe_whois({memberId:memberId});}, false);
		var tds=document.getElementsByTagName('td');
		var parentTarget=tds[tds.length-1].parentNode.previousSibling.firstChild;
		parentTarget.appendChild(document.createTextNode(" [ "));
		parentTarget.appendChild(a);
		parentTarget.appendChild(document.createTextNode(" | "));
		parentTarget.appendChild(a2);
        parentTarget.appendChild(document.createTextNode(" ] "));
	}

}catch(E){
	alert(E);
}