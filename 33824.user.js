// ==UserScript==
// @name            DT Gold Recruiter
// @author          darkyndy
// @description     Dark Throne Gold Recruiter
// @include         *darkthrone.com/recruiter*
// @version         1.0
// ==/UserScript==


if(location.href.match(/recruiter/)){
	setTimeout(function(){autoClick();},Random());
}

function autoClick(){
  //find the button
  recruitButton=document.getElementById('recruit_image');
  if(recruitButton){
    //create click
    var clickEvt = document.createEvent("MouseEvent");
    clickEvt.initEvent("click", true, true);
    //click on the button
    recruitButton.dispatchEvent(clickEvt);
  }
  else{
    //no more image to click on
  }
}

//create random time
function Random(minimum, maximum){
	if(minimum == null && maximum == null ){
		minimum = 2100; //in miliseconds
		maximum = 3000; //in miliseconds
	}
	return Math.round(minimum+Math.random()*(maximum-minimum));
		
};