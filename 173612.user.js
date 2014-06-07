// ==UserScript==
// @name       CodeChef Marker
// @namespace  http://milindmathur.com/blog/codechefMarker
// @version    0.1
// @description  Mark Attempted Questions codechef
// @include http://www.codechef.com/*
// @match      http://www.codechef.com/problems/*
// @copyright  2012+, CptCharisma
// ==/UserScript==
var xmlhttp,username;
if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
}

function markSolved(pname)
{
    var elems = document.getElementsByTagName('tr'),i;
    for (i in elems)
    {
        if( (' ' + elems[i].className + ' ').indexOf(' problemrow ') > -1)
        {
            var cnt = elems[i].innerHTML;
            if(cnt.indexOf('href="/submit/'+pname+'"') > -1 || 
              cnt.indexOf('<td>'+pname+'</td>') > -1)
            {
                var tmp = elems[i].innerHTML.replace('<td id="cpt"> </td>','<td id="cpt" align="center"><img src="http://www.codechef.com/misc/tick-icon.gif" /></td>');
                tmp = tmp.replace('<td>','<td><del>');
                tmp = tmp.replace('</td>','</del></td>');
                elems[i].innerHTML = tmp;
                return true;
            }
        }
    }
}

function statusContestProblem(pname)
{
    var xhr;
    var ret = '<td id="cpt"> </td>',cnt;
    
    if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
  		xhr=new XMLHttpRequest();
	}
    
    xhr.onreadystatechange=function()
  	{
      	//alert(xmlhttp.statusText);
  		if (xhr.readyState==4 && xhr.status==200)
    	{
            //alert(xhr.responseText);
            var resp = xhr.responseText;
            resp = resp.substring(resp.indexOf('<tr class="kol"'));
            resp = resp.substring(resp.indexOf('>') + 1);
            resp = resp.substring(0,resp.indexOf('</tr>'));
            cnt = resp;
            if(cnt.indexOf('<td class="centered"') > -1)
            {
                cnt = cnt.substring(cnt.indexOf('<td class="centered"')+1);
                cnt = cnt.substring(cnt.indexOf('>')+1,cnt.indexOf('</td>'));
                var elems2 = document.getElementsByTagName('tr'), i;
                for(i in elems2) {
                    if((' ' + elems2[i].className + ' ').indexOf(' problemrow ') > -1) {
                        var tmp = elems2[i].innerHTML;
                        //alert(tmp);
                        if(tmp.indexOf('<td id="cpt"> </td>') != -1)
                        {
                            var pname2 = tmp.substring(tmp.indexOf('<a href="') + 9);
                            pname2 = pname2.substring(0,pname2.indexOf('"'));
                            pname2 = pname2.replace('/problems/','/status/');
                            pname2 = pname2 + ',' + username;
                            
                            if(pname2 == pname)
                                elems2[i].innerHTML = elems2[i].innerHTML.replace('<td id="cpt"> </td>', '<td id="cpt" align="center">'+ cnt +'</td>');
                        }
                    }
                }
            }
    	}
    };
    //alert(pname);
    xhr.open('GET',pname,true);
    xhr.send();
}

function markContestProblems()
{
    var pathArray = window.location.pathname.split( '/' );
    //alert(pathArray[1]);
    if (pathArray[1] != 'problems') //check if contest page
    {
        //alert('contest page');
        var elems2 = document.getElementsByTagName('tr'), i;
     	for(i in elems2) {
        	if((' ' + elems2[i].className + ' ').indexOf(' problemrow ') > -1) {
            	var tmp = elems2[i].innerHTML;
                //alert(tmp);
                if(tmp.indexOf('<td id="cpt"> </td>') != -1)
                {
                    var pname2 = tmp.substring(tmp.indexOf('<a href="') + 9);
                    pname2 = pname2.substring(0,pname2.indexOf('"'));
                    pname2 = pname2.replace('/problems/','/status/');
                    pname2 = pname2 + ',' + username;
                    //alert(pname2);
                    
                    statusContestProblem(pname2);
                }
        	}
    	}
    }
}

xmlhttp.onreadystatechange=function()
  {
      //alert(xmlhttp.statusText);
  	if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        var resp=xmlhttp.responseText;
        resp = resp.substring(resp.indexOf('Practice Problems')+16);
        resp = resp.substring(1,resp.indexOf('</td>'));
        //alert(resp);
        //alert(resp.indexOf('/status/'));
        var pname;
        
        while(resp.indexOf('/status/') > -1)
        {
            resp = resp.substring(resp.indexOf('/status/')+7);
            pname = resp.substring(1,resp.indexOf(','));
            //alert(pname);
            markSolved(pname);
            resp = resp.substring(resp.indexOf(','));
        }
        
        markContestProblems();
    }
    
  };

function isloggedIn()
{
    var elems = document.getElementsByTagName('div'),i;
    for (i in elems)
    {
        if( (' ' + elems[i].className + ' ').indexOf(' login-user ') > -1)
        {
            username = elems[i].innerHTML;
            username = username.substring(username.indexOf('/users/') + 6);
            username = username.substring(1,username.indexOf('"'));
            return true;
        }
    }
    return false;
}

function addContentStartContainer(matchClass,content) {
    var elems = document.getElementsByTagName('*'), i;
    for(i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')> -1) {
            elems[i].innerHTML = content + elems[i].innerHTML;
        }
    }
}

if (isloggedIn())
{
    var fnd=false;
    var elems = document.getElementsByTagName('table'), i;
     for(i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' problems ')> -1) {
            fnd=true;
        }
    }
    if(!fnd)
        return false;
	addContentStartContainer("headerrow",'<th align="center" width="9%\"><a href="" style="color:white; text-decoration:underline;">Status</a></th>');
	//alert('/users/'+username);
    xmlhttp.open('GET','/users/'+username,true);
    xmlhttp.send();
    addContentStartContainer("problemrow",'<td id="cpt"> </td>');   
}