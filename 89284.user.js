// ==UserScript==
// @name           dispbbsAddPostForm
// @namespace      club.kdnet.net
// @description    凯迪社区已禁止回复的帖子加回复表单
// @include        http://club*.kdnet.net/dispbbs.asp?*boardid=*&id=*
// @include        http://club*.kdnet.net/dispbbs.asp?id=*&boardid=*
// ==/UserScript==

(function ()
{
	var url = document.URL;
	var p = url.indexOf("?");
	if( p<0 )
	    return;
	var paramA = url.substring(p+1).split("&");
    var params = {};
    for(var i=0;i<paramA.length;i++)
    {
	    p = paramA[i].indexOf("=");
		if( p<0 )
		    continue;
	    params[paramA[i].substring(0,p)] = paramA[i].substring(p+1);		
    }	
	/*
	for(var p in params)
	{
	   console.log(p+" = "+params[p]);
	} */
	var boardid = params.boardid;
	var id = params.id;
	if (boardid==null || id==null )
	{
	    return;
	}
	var club_dispbbs_l_1 = document.getElementById('club_dispbbs_l_1');
	if ( club_dispbbs_l_1!=null )
	{
	   club_dispbbs_l_1.style.display = "none";
	}
	var club_dispbbs_l_2 = document.getElementById('club_dispbbs_l_2');
	if ( club_dispbbs_l_2!=null )
	{
	   club_dispbbs_l_2.style.display = "none";
	}
	var  club_dispbbs_l_3 = document.getElementById('club_dispbbs_l_3');
	if ( club_dispbbs_l_3==null )
	{
	    console.log("club_dispbbs_l_3:Not found");
	}
	club_dispbbs_l_3.style.display = "none";
	var fastReplay = club_dispbbs_l_3.nextSibling;
	for(;fastReplay!=null && fastReplay.className!="quick-reply";
	         fastReplay=fastReplay.nextSibling)
	    ;
	if( fastReplay==null )
	{
	    return;
	}
	//console.log("fastReplay:"+fastReplay.className);
	var postIFrame = null;
	for( var i=0;i<fastReplay.childNodes.length;i++)
	{
	   //console.log( fastReplay.childNodes[i].tagName );
	    if ( fastReplay.childNodes[i].tagName=="IFRAME" )
		{
		    postIFrame = fastReplay.childNodes[i];
            break; 			
		}
	}
//console.log("postIFrame="+postIFrame);	
	if ( postIFrame!=null )
	{
	    return;
	}
	var userName = "", pwd = "";
	postIFrame = document.createElement("IFRAME");
	  postIFrame.width = "100%";postIFrame.height = "450";
	  postIFrame.frameBorder="8"; postIFrame.scrolling="no"; 
	  postIFrame.allowTransparency="true"; 
	  postIFrame.id="pic"; postIFrame.name="baidu";
	  postIFrame.src = "http://upfile1.kdnet.net/GetPost.asp?boardid="+boardid
	     +"&followup=1&rootid="+id+"&star=1&TotalUseTable=DV_BBS7"
		 +"&UserName="+userName+"&password="+pwd
		 +"&topicname=猫眼看人&pages=1&lay=150"; 
	fastReplay.appendChild(postIFrame);	 
})()
