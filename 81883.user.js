// ==UserScript==
// @name           Random thread
// @namespace      Yawn.
// @description    Takes you to a random thead on wbb      
// @include        http://*warez-bb.org/*
// ==/UserScript==

var allp = document.getElementsByTagName('p');
var newblah = document.createElement('a')
newblah.innerHTML = '<b>Random topic</b>'
newblah.setAttribute('href','javascript:;')
newblah.addEventListener('click', gotorandom, false);

for(i=0;i<allp.length;i++)
{
	if(allp[i].getAttribute('style') == 'font-size: 10px;')
	{
		allp[i].innerHTML = allp[i].innerHTML + '<br />'
		allp[i].appendChild(newblah)
	}
}

function gotorandom()
{
   var forumid = getforumid()
   if(forumid)
   {
      var posttourl = 'http://www.warez-bb.org/viewforum.php?f=' + forumid
      GM_xmlhttpRequest({
        method:"GET",
        url:posttourl,
        headers:{
          "User-Agent":"monkeyagent",
          "Content-Type":"application/x-www-form-urlencoded",
      	  "Cookie":document.cookie,
          },
        onload:function(details) {
         var forumsource = details.responseText
         //crappy code onwards but it works so meh
         if(forumsource.indexOf('Sub Forums') != -1)
         {
            forumsource = forumsource.replace('</a>&nbsp;<a href="',"")
            forumsource = forumsource.replace('</a>&nbsp;<a href="',"")
         }
         var endpos = forumsource.indexOf('</a>&nbsp;<a href="')
         var startpos = (forumsource.lastIndexOf('>',endpos)) + 1
         var howmany = forumsource.substr(startpos,endpos-startpos)
         howmany = howmany.valueOf()
         var rndpagenumber = Math.floor((Math.random() * howmany))
         rndpagenumber = rndpagenumber * 50
         var thefid = forumid
         posttolink = 'http://www.warez-bb.org/viewforum.php?f=' + thefid + '&start=' + rndpagenumber
         GM_xmlhttpRequest({
           method:"GET",
           url:posttolink,
           headers:{
             "User-Agent":"monkeyagent",
             "Content-Type":"application/x-www-form-urlencoded",
             "Cookie":document.cookie,
             },
           onload:function(details) {
            var startpostopic = details.responseText.indexOf('<span class="genmed"><b>Topics</b></span>')
            var howmanyloops = Math.floor(Math.random() * 50)
            for(i=0;i<howmanyloops;i++)
            {
               startpostopic = details.responseText.indexOf('<td height="34" class="row1"><a href="viewtopic.php?t=', startpostopic)
            }
            startpostopic = startpostopic + '<td height="34" class="row1"><a href="viewtopic.php?t='.length
            var endpostopic = details.responseText.indexOf('"',startpostopic)
            var topicid = 'http://www.warez-bb.org/viewtopic.php?t=' + details.responseText.substr(startpostopic,endpostopic - startpostopic)
            if(topicid.indexOf('><tr><td height=') > -1)
	    {
		gotorandom()
	    }
	    else
            {
		document.location = topicid
	    }
           }
         });
        }
      });
   }
}

function getforumid()
{
   var forumid = ""
   var allinput = document.getElementsByTagName('a')
   for(var x=0;x<allinput.length;x++)
   {
      if(allinput[x].getAttribute('href') != null)
      {
         if(allinput[x].getAttribute('href').indexOf('posting.php?mode=newtopic&f=') > -1)
         {
            startpos = allinput[x].getAttribute('href').indexOf('posting.php?mode=newtopic&f=') + 'posting.php?mode=newtopic&f='.length
            endpos = allinput[x].getAttribute('href').length
            forumid = allinput[x].getAttribute('href').substr(startpos, endpos-startpos)
            break;
         }
      }
   }
   return forumid;
}