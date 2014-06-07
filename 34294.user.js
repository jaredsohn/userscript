// ==UserScript==
// @name           GLB Local Time
// @namespace      www.goallineblitz.com
// @description    Changes forum post time stamps to your local time
// @include        http://goallineblitz.com/game/forum_main.pl
// @include        http://goallineblitz.com/game/forum_thread_list.pl*
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// ==/UserScript==

window.setTimeout(function(){

var posts = getElementsByClassName('last_post',document);
var postOptions = getElementsByClassName('post_options',document);

if (postOptions.length == 0)
{
    for(i=0;i<posts.length;i++)
    {
        if (posts[i].innerHTML.split('<span class="last_post_user"></span>').length<2)
        {

            if (posts[i].innerHTML.split('<span')[1].split('<br').length>1)
            {
                var linkStart=posts[i].innerHTML.split('user">')[0];
                var linkDate=posts[i].innerHTML.split('user">')[1];
                var linkEnd='<br'+linkDate.split('<br')[1];
                linkDate=linkDate.split('<br')[0];
                var oldDate = new Date(Date.parse(linkDate));
                var newDate = new Date(oldDate.getTime()-(new Date().getTimezoneOffset()*60000)+21600000);
                posts[i].innerHTML=linkStart+'user">'+FormatDate(newDate)+linkEnd;
            }
            else
            {
                var linkStart=posts[i].innerHTML.split('>')[0];
                var linkDate=posts[i].innerHTML.split('>')[1];
                var linkEnd='</a>'+posts[i].innerHTML.split('</a>')[1];
                linkDate=linkDate.split('</')[0];
                var oldDate = new Date(Date.parse(linkDate));
                var newDate = new Date(oldDate.getTime()-(new Date().getTimezoneOffset()*60000)+21600000);
                posts[i].innerHTML=linkStart+'>'+FormatDate(newDate)+linkEnd;
            }
        }
    }
}
else
{
    for(i=0;i<postOptions.length;i++)
    {
        var linkStart=posts[i].innerHTML.split('>')[0];
        var linkDate=posts[i].innerHTML.split('>')[1];
        var linkEnd='</div>'+posts[i].innerHTML.split('</div>')[1];
        linkDate=linkDate.split('</')[0];
        var oldDate = new Date(Date.parse(linkDate));
        var newDate = new Date(oldDate.getTime()-(new Date().getTimezoneOffset()*60000)+21600000);
        postOptions[i].innerHTML=linkStart+'>'+FormatDate(newDate)+linkEnd;
    }
}



function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

function FormatDate(d)
{

var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
var mins=d.getMinutes();
mins=((mins < 10) ? "0" + mins : mins);
var secs=d.getSeconds();
secs=((secs < 10) ? "0" + secs : secs);
return m_names[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()+' '+d.getHours()+':'+mins+':'+secs;

}

},100);