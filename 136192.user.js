// ==UserScript== 
// @name Prefix/Move test 
// @namespace http://www.exbii.com 
// @include http://www.exbii.com/showthread.php* 
// @include http://exbii.com/showthread.php* 
// @include http://www.desiproject.com/showthread.php* 
// @include http://www.desiproject.com/showthread.php* 
// @include http://142.4.35.138/showthread.php* 
// ==/UserScript== 

var threadid=document.getElementsByName('searchthreadid')[0].value;
var xyz=document.getElementsByTagName('td'); 
/*for(var i=0;i<xyz.length; i++) 
{ 

   if(xyz[i].id.substr(0,8)=='td_post_')
    {
	var threadname=xyz[i].getElementsByTagName('strong')[0].innerHTML;
	break;
    }
}*/


var xx=document.getElementById('xbwrap');
var threadname=xx.getElementsByTagName('strong')[0].innerHTML;
var yy=xx.getElementsByTagName('div')[0];
yy.innerHTML+='<form action="postings.php?do=updatethread&amp;t='+threadid+'" method="post" name="vbform"><input type="hidden" name="s" value="" /><input type="hidden" name="t" value="'+threadid+'" /><input type="hidden" name="do" value="updatethread" /><select name="threadprefix"><option value="Adultery" >Adultery</option><option value="Fantasy" >Fantasy</option><option value="Incest" >Incest</option><option value="Romance" >Romance</option><option value="Thriller" >Thriller</option><option value="Misc. Erotica" >Misc. Erotica</option><option value="Non-erotic" >Non-erotic</option></select><input type="hidden" class="bginput" name="title" value="'+threadname+'" size="50" maxlength="85" tabindex="1" title="Optional" /><input type="hidden" name="visible" value="yes" id="cb_visible"><input type="hidden" name="sticky" value="no" id="cb_sticky"><input type="hidden" name="open" value="yes" id="cb_open"><input type="submit" class="button" value="Change Prefix" accesskey="s" /></form></br><form action="postings.php?do=domovethread&amp;t='+threadid+'" method="post" name="vbform"><input type="hidden" name="s" value="" /><input type="hidden" name="t" value="'+threadid+'" /><input type="hidden" name="do" value="domovethread" /><input type="hidden" class="bginput" name="title" value="'+threadname+'" size="50" maxlength="85" /><select name="destforumid"><option value="77" class="fjdpth2" selected="selected" >English</option><option value="78" class="fjdpth2" >Hindi</option><option value="79" class="fjdpth2" >Regional</option></select><input type="hidden" name="redirect" value="none"/><input type="submit" class="button" value="Move Thread" accesskey="s" /></form>';
