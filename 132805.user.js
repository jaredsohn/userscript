// ==UserScript==
// @id             hf_close_verification
// @name           HF Close Verification
// @description    This will stop that "accidently clicked close" shit :D
// @author         Ksyrk
// @website        http://www.hackforums.net/member.php?action=profile&uid=1063260
// @version        1.0
// @include        *hackforums.net*
// ==/UserScript==
function stopEvent(e){
	if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;

    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
}
function form_submit(event){
  var form = event ? event.target : this;
  var theValue = "Close";
  var btns = document.getElementsByTagName('input');
  for(i=0;i<btns.length;i++)
	{
    if(btns[i].value==theValue)
    {
       var button = btns[i];
	Check = confirm("Do you really want to close this Thread?");
	if(Check == false){
	alert('You did not close the Thread!');
	stopEvent(event);
	}else{

	}
    }
	}
  }

window.addEventListener('submit',form_submit, true);