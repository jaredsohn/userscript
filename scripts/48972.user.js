// ==UserScript==
// @name           Jlab Cheater
// @description    jlab cheat (fake results to print and give your teacher ;) )
// @include        http://education.jlab.org/solquiz/results.php*
// ==/UserScript==
var NumOfQs = document.getElementsByClassName('resultquestion').length
var oC=document.getElementsByClassName('resultincorrect').length
var oR=document.getElementsByClassName('resultcorrect').length
for (var i=1;i<NumOfQs;i++) {
	if (!document.getElementsByClassName('resultincorrect')){
		break;
	}
	if (document.getElementsByClassName('resultincorrect').length!=0){
		document.getElementsByClassName('resultincorrect')[0].innerHTML='Correct!';
		document.getElementsByClassName('resultincorrect')[0].setAttribute('class','resultcorrect');
	}
}
document.getElementsByClassName('sectionscore1')[0].innerHTML='You answered '+NumOfQs+' questions out of '+NumOfQs+' correctly!';
document.getElementsByClassName('sectionscore2')[0].innerHTML='Score for this section: 100.00%';
document.getElementById('totalscore').innerHTML='Total Score: 100.00%';
document.getElementById('timeindex').contentEditable='true';
alert('Dont forget to edit the time it took you to finish so that it is believable ;)\nIt is right below "Results" in big letters. (Just click and type)\nYour score is really '+oC/NumOfQs*100+'%.\nThere is no way to tell this is a fake just print it.\nIt will be a perfect fake.\nDON\'T EMAIL RESULTS IT WILL SEND THE ORIGINAL GRADE!!!\nTo see why paste javascript:alert(unescape(document.cookie)) into your address bar.');
