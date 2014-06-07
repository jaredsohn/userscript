// ==UserScript==
// @name           YouPorn
// @namespace      youporn
// @description    youporn
// @include        http://www.youporn.com/watch/*
// @include        http://youporn.com/watch/*
// ==/UserScript==

function id(what) {
  return document.getElementById(what);
}

function resizePlayer() {
  //window.innerHeight/Width
  //document.documentElement.­clientHeight/Width
  id('mediaplayer').width=(window.innerHeight/3)*4;
  id('mediaplayer').height=window.innerHeight-18;
  id('rating').style.left=((window.innerHeight/3)*4+16)+'px';
  id('videotitle').style.left=((window.innerHeight/3)*4+8)+'px';
  return true;
}

//id('videotitle').style.position='absolute';
id('videotitle').style.fontSize='13px';
id('videotitle').style.float='right';
//id('videotitle').getElementsByTagName('img')[0].style.position='absolute';
//id('videotitle').getElementsByTagName('img')[0].style.right='0';
id('videotitle').style.position='absolute';
//id('videotitle').style.right='0px';
id('videotitle').style.marginBottom='15px';

document.body.style.margin='2px';
id('content').style.margin='2px';
id('videotitle').style.margin='2px';
id('header').style.display='none';
id('notice').style.display='none';

id('rating').style.position='absolute';
//id('rating').style.right='0px';
id('rating').style.top='90px';


var form = id('rating').getElementsByTagName('form')[0];
form.name='voteform';
form = form.getElementsByTagName('ul')[0];
form.innerHTML='<li><input type="radio" value="5" name="rating" id="frm_rating5" onchange="javascript:document.voteform.submit();"/><label for="frm_rating5" ><span style="font-family: monospace;">Excellent&nbsp;</span><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittle.gif"></label></li>';
form.innerHTML+='<li><input type="radio" value="4" name="rating" id="frm_rating4" onchange="javascript:document.voteform.submit();"/><label for="frm_rating4"><span style="font-family: monospace;">Good&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittleEmpty.gif"></label></li>';
form.innerHTML+='<li><input type="radio" value="3" name="rating" id="frm_rating3" onchange="javascript:document.voteform.submit();"/><label for="frm_rating3"><span style="font-family: monospace;">Average&nbsp;&nbsp;&nbsp;</span><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittleEmpty.gif"><img src="http://video.google.com/images/starLittleEmpty.gif"></label></li>';
form.innerHTML+='<li><input type="radio" value="2" name="rating" id="frm_rating2" onchange="javascript:document.voteform.submit();"/><label for="frm_rating2"><span style="font-family: monospace;">Bad&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittleEmpty.gif"><img src="http://video.google.com/images/starLittleEmpty.gif"><img src="http://video.google.com/images/starLittleEmpty.gif"></label></li>';
form.innerHTML+='<li><input type="radio" value="1" name="rating" id="frm_rating1" onchange="javascript:document.voteform.submit();"/><label for="frm_rating1"><span style="font-family: monospace;">Awful&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><img src="http://video.google.com/images/starLittle.gif"><img src="http://video.google.com/images/starLittleEmpty.gif"><img src="http://video.google.com/images/starLittleEmpty.gif"><img src="http://video.google.com/images/starLittleEmpty.gif"><img src="http://video.google.com/images/starLittleEmpty.gif"></label></li>';

id('rating').innerHTML+='<br/><img width="180" height="80" alt="logo" style="padding-top:30px;padding-bottom:30px" src="http://files2.youporn.com/images/pink.png"/>';
id('rating').innerHTML+='<br/><br/><a href="#" onclick="javascript:window.back(); return false;">&lt;&lt; go back ...</a>';

var iframes = document.getElementsByTagName('iframe');
for(x=0;x<iframes.length;x++) {
  iframes[x].style.display='none';
}

resizePlayer();