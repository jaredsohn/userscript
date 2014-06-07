// ==UserScript==
// @name           Insert Penis and ignore
// @namespace      MannySoDope.GoalLineBlitz
// @description    It's an ignore list!
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// ==/UserScript==

window.setTimeout(function(){

// Check for add/rem query strings
if(GetQueryString('ignore') && GetQueryString('igpid'))
{
  // Always remove
  var existing=ArrayFromCsv(GM_getValue('ignorelist',''));
  var index = existing.indexOf(GetQueryString('igpid'));
  if(index != -1)
    {existing.splice(index, 1);}
  
  // Add?
  if (GetQueryString('ignore')=='add')
    {existing.push(GetQueryString('igpid'));}
    
  // Save
  GM_setValue('ignorelist',ArrayToCsv(existing));  
}

// Get ignore list
var agentIDs = ArrayFromCsv(GM_getValue('ignorelist',''));

// Check all posters
var allPosts=getElementsByClassName('post content_container',document);

for(i=0;i<allPosts.length;i++)
  {    
    var alreadyIgnored=false;
    // This agent in ignore list?
    for(aid=0;aid<agentIDs.length;aid++)
    {
      if(getElementsByClassName('user_name',allPosts[i])[0].innerHTML.indexOf('/game/home.pl?user_id='+agentIDs[aid]+'"') > -1)
        {alreadyIgnored=true;}      
    }
      
    if(alreadyIgnored)
    {
      allPosts[i].setAttribute('style','min-height:45px');
      if (getElementsByClassName('post_user',allPosts[i])[0].innerHTML.indexOf('<b>Admin</b>') < 0 &&
          getElementsByClassName('post_user',allPosts[i])[0].innerHTML.indexOf('<b>Moderator</b>') < 0)
        {getElementsByClassName('post_user',allPosts[i])[0].setAttribute('style','height:45px');}
      else
        {getElementsByClassName('post_user',allPosts[i])[0].setAttribute('style','height:60px');}
      getElementsByClassName('user_avatar',allPosts[i])[0].setAttribute('style','display:none');
      getElementsByClassName('post_content_container',allPosts[i])[0].setAttribute('style','display:none');
      var edited=getElementsByClassName('last_edit',allPosts[i]);
      if (edited.length>0)
        edited[0].setAttribute('style','display:none');
    }
    else
    {
      if (getElementsByClassName('post_user',allPosts[i])[0].innerHTML.indexOf('<b>Admin</b>') > 0 ||
          getElementsByClassName('post_user',allPosts[i])[0].innerHTML.indexOf('<b>Moderator</b>') > 0)
        {getElementsByClassName('post_user',allPosts[i])[0].setAttribute('style','min-height:175px');}
      else
        {getElementsByClassName('post_user',allPosts[i])[0].setAttribute('style','min-height:150px');}
    }
    
    // Add/Remove link
    var playerID = getElementsByClassName('user_name',allPosts[i])[0].innerHTML.split('/game/home.pl?user_id=')[1].split('" id=')[0];
    var nameDiv=getElementsByClassName('user_name',allPosts[i])[0];
    var link;
    if(window.location.href.indexOf('page') < 0)
      link="<br /><a href='"+window.location.href.split('&igpid=')[0]+"&igpid="+playerID+"&ignore=";
    else
      link="<br /><a href='"+window.location.href.split('&')[0]+"&igpid="+playerID+"&ignore="
    
    if(alreadyIgnored)
      {link+="rem";}
    else
      {link+="add";}
      
    if(window.location.href.indexOf('&page') > -1)
      link+='&page'+ window.location.href.split('&page')[1];
      
    if(alreadyIgnored)
      {link+="'>Remove penis</a>";}
    else
      {link+="'>Insert penis</a>";}
      
    nameDiv.innerHTML=nameDiv.innerHTML+link;
  }

});

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

function ArrayToCsv(lfArray) // Array to csv for storing
{
  var csv='';
  for(a=0;a<lfArray.length;a++)
    {csv+=lfArray[a]+((a==lfArray.length-1) ? '' : ':');}
  return csv;
}

function ArrayFromCsv(lfCsv) // Array from csv for retrievel
{
  var arr = new Array();
  if (lfCsv!='')
  {
    for(b=0;b<lfCsv.split(':').length;b++)
      {arr.push(lfCsv.split(':')[b]);}
  }
  return arr;
}

function GetQueryString(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)"; 
  var regex = new RegExp( regexS ); 
  var results = regex.exec(window.location.href); 
  if( results == null )    
    return null;
  else    
    return results[1];
}