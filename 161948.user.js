// ==UserScript==
// @name        Radio Filter
// @namespace   myanimelist.net
// @include     http://myanimelist.net/animelist/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @require     http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @grant       none
// ==/UserScript==

var typevar='All';
var scorevar='All';
var progressvar='All';
var airingvar='All';
var equalscore='0';
var select=1;
var rangescore='';
var animename='';

function myFunction() {
    var x=$(this).val();
    if ($(this).attr('class')=='type') { typevar=x; }
    else if ($(this).attr('class')=='score') { scorevar=x; }
    else if ($(this).attr('class')=='progress') { progressvar=x; begin=progressvar.split('-')[0]; end=progressvar.split('-')[1]; }
    else if ($(this).attr('class')=='airing') { airingvar=x; }
    else if ($(this).attr('id')=='select') { select=parseInt(x); }
    else if ($(this).attr('id')=='equal') { equalscore=x; }
    else if ($(this).attr('id')=='name') { animename=x; }
    
    $("tr:has(.td1,.td2)").hide(); 
    var exp="tr";
    
    if (typevar!='All' && select) { exp=exp+":has(td[width='50']:contains('"+typevar+"'))"; }
    else if (typevar!='All' && !select) { exp=exp+":has(td[width='50']:not(:contains('"+typevar+"')))"; }
    if (airingvar=='Airing') { exp=exp+":contains('Airing')"; }
    else if (airingvar=='Not Airing') { exp=exp+":not(:contains('Airing'))"; }
    if (scorevar!='All' && equalscore=='0') { exp=exp+":has(td[width='45']:contains('"+scorevar+"'))"; }
    else if (scorevar!='All' && equalscore=='1') { exp=exp+":has(td[width='45']:not(:contains('"+scorevar+"')))"; }
    if (exp == "tr") { exp=exp+":has(td)"; }
    
    if (progressvar!='All') { exp = $(exp).filter(function() { return parseInt($("td[width='70']", this).text()) < parseInt(end) && parseInt($("td[width='70']", this).text()) >= parseInt(begin); }); }
    if (scorevar!='All' && equalscore=='2') { exp=$(exp).filter(function() { return parseInt($("td[width='45']", this).text()) >= parseInt(scorevar); }); }
    else if (scorevar!='All' && equalscore=='3') { exp=$(exp).filter(function() { return parseInt($("td[width='45']", this).text()) <= parseInt(scorevar); }); }
    else if (equalscore=='4') { exp=$(exp).filter(function() { return parseInt($("td[width='45']", this).text()) <= parseInt(scoreend) && parseInt($("td[width='45']", this).text()) >= parseInt(scorebegin); }); }
    
    $(exp).each(function(){
        if ($(this).text().search(new RegExp(animename, "i")) >=0) { $(this).show(); }
    });
}

$(document).ready(function() {
    $(".type,.score,.progress,.airing,select").click(myFunction);
    $("#name").focusin(function() {
        if (this.value=='Enter a title') { $(this).val(''); }
    });
    $("#name").focusout(function() {
        if (this.value=='') { $(this).val('Enter a title'); }
    });
    $("#name").keyup(myFunction);
    
    $("#choose").click(function() {
        var bha = prompt('Choose score range separated by a minus','6-8');
        $(this).text(bha);
        rangescore=bha;
        scorebegin=rangescore.split('-')[0];
        scoreend=rangescore.split('-')[1];
        myFunction();
    });

    $(function() {
        $(".drag").draggable();
    });
    
    /*$(".drag div").hide();
    $(".drag").hover(function() {
        $("div", this).stop(true, true).slideToggle(200);
    })*/
});


table=document.createElement('table');
table.className='drag';
table.style.right='190px';
table2=document.createElement('table');
table2.className='drag';
table2.style.right='50px';
table3=document.createElement('table');
table3.className='drag';
table3.style.right='190px';
table4=document.createElement('table');
table4.className='drag';
table4.style.right='70px';

type=document.createElement('td');
type.className='td';
score=document.createElement('td');
score.className='td';
progress=document.createElement('td');
progress.className='td';
airing=document.createElement('td');
airing.className='td';

headtype=document.createElement('tr');
headscore=document.createElement('tr');
headprogress=document.createElement('tr');
headairing=document.createElement('tr');

divtype=document.createElement('div');
divscore=document.createElement('div');
divprogress=document.createElement('div');
divairing=document.createElement('div');

imagetype=document.createElement('img');
imagetype.src='http://dl.dropbox.com/u/40561772/type.png';
imagescore=document.createElement('img');
imagescore.src='http://dl.dropbox.com/u/40561772/score.png';
imageprogress=document.createElement('img');
imageprogress.src='http://dl.dropbox.com/u/40561772/progress.png';
imageairing=document.createElement('img');
imageairing.src='http://dl.dropbox.com/u/40561772/status.png';

tr1=document.createElement('tr');
tr2=document.createElement('tr');
tr3=document.createElement('tr');
tr4=document.createElement('tr');
tr5=document.createElement('tr');
tr6=document.createElement('tr');
tr7=document.createElement('tr');
tr8=document.createElement('tr');
tr9=document.createElement('tr');
tr10=document.createElement('tr');
tr11=document.createElement('tr');
tr12=document.createElement('tr');
tr13=document.createElement('tr');
tr14=document.createElement('tr');
tr15=document.createElement('tr');
tr16=document.createElement('tr');
tr17=document.createElement('tr');
tr18=document.createElement('tr');
tr19=document.createElement('tr');
tr20=document.createElement('tr');
tr21=document.createElement('tr');
tr22=document.createElement('tr');
tr23=document.createElement('tr');
tr24=document.createElement('tr');
tr25=document.createElement('tr');
tr26=document.createElement('tr');
tr27=document.createElement('tr');
tr28=document.createElement('tr');
tr29=document.createElement('tr');


alltype=document.createElement('input');
alltype.className='type';
alltype.value='All';
alltype.checked='yes';
alltypetext=document.createElement('a');
alltypetext.innerHTML='All';

tv=document.createElement('input');
tv.className='type';
tv.value='TV';
tvtext=document.createElement('a');
tvtext.innerHTML='TV';

movie=document.createElement('input');
movie.className='type';
movie.value='Movie';
movietext=document.createElement('a');
movietext.innerHTML='Movie';

ova=document.createElement('input');
ova.className='type';
ova.value='OVA';
ovatext=document.createElement('a');
ovatext.innerHTML='OVA';

ona=document.createElement('input');
ona.className='type';
ona.value='ONA';
onatext=document.createElement('a');
onatext.innerHTML='ONA';

special=document.createElement('input');
special.className='type';
special.value='Special';
specialtext=document.createElement('a');
specialtext.innerHTML='Special';


menutype=document.createElement('select');
menutype.id='select';

select=document.createElement('option');
select.value='1';
select.selected='selected';
select.innerHTML='Select';

remove=document.createElement('option');
remove.value='0';
remove.innerHTML='Remove';


allscore=document.createElement('input');
allscore.className='score';
allscore.value='All';
allscore.checked='yes';
allscoretext=document.createElement('a');
allscoretext.innerHTML='All';

score10=document.createElement('input');
score10.className='score';
score10.value='10';
score10text=document.createElement('a');
score10text.innerHTML='10';

score9=document.createElement('input');
score9.className='score';
score9.value='9';
score9text=document.createElement('a');
score9text.innerHTML='9';

score8=document.createElement('input');
score8.className='score';
score8.value='8';
score8text=document.createElement('a');
score8text.innerHTML='8';

score7=document.createElement('input');
score7.className='score';
score7.value='7';
score7text=document.createElement('a');
score7text.innerHTML='7';

score6=document.createElement('input');
score6.className='score';
score6.value='6';
score6text=document.createElement('a');
score6text.innerHTML='6';

score5=document.createElement('input');
score5.className='score';
score5.value='5';
score5text=document.createElement('a');
score5text.innerHTML='5';

score4=document.createElement('input');
score4.className='score';
score4.value='4';
score4text=document.createElement('a');
score4text.innerHTML='4';

score3=document.createElement('input');
score3.className='score';
score3.value='3';
score3text=document.createElement('a');
score3text.innerHTML='3';

score2=document.createElement('input');
score2.className='score';
score2.value='2';
score2text=document.createElement('a');
score2text.innerHTML='2';

score1=document.createElement('input');
score1.className='score';
score1.value='1';
score1text=document.createElement('a');
score1text.innerHTML='1';

scorenull=document.createElement('input');
scorenull.className='score';
scorenull.value='-';
scorenulltext=document.createElement('a');
scorenulltext.innerHTML='-';


menuscore=document.createElement('select');
menuscore.id='equal';

equal=document.createElement('option');
equal.value='0';
equal.selected='selected';
equal.innerHTML='Equal to';

notequal=document.createElement('option');
notequal.value='1';
notequal.innerHTML='Not equal to';

greater=document.createElement('option');
greater.value='2';
greater.innerHTML='Greater than';

smaller=document.createElement('option');
smaller.value='3';
smaller.innerHTML='Smaller than';

choose=document.createElement('option');
choose.value='4';
choose.id='choose';
choose.innerHTML='Choose range';


namee=document.createElement('input');
namee.id='name';
namee.type='text';
namee.style.width='80px';
namee.value='Enter a title';

allprogress=document.createElement('input');
allprogress.className='progress';
allprogress.value='All';
allprogress.checked='yes';
allprogresstext=document.createElement('a');
allprogresstext.innerHTML='All';

short=document.createElement('input');
short.className='progress';
short.value='0-25';
shorttext=document.createElement('a');
shorttext.innerHTML='Short';

medium=document.createElement('input');
medium.className='progress';
medium.value='25-50';
mediumtext=document.createElement('a');
mediumtext.innerHTML='Medium';

long=document.createElement('input');
long.className='progress';
long.value='50-100';
longtext=document.createElement('a');
longtext.innerHTML='Long';

infinite=document.createElement('input');
infinite.className='progress';
infinite.value='100-10000';
infinitetext=document.createElement('a');
infinitetext.innerHTML='Infinite';


allairing=document.createElement('input');
allairing.className='airing';
allairing.value='All';
allairing.checked='yes';
allairingtext=document.createElement('a');
allairingtext.innerHTML='All';

airingt=document.createElement('input');
airingt.className='airing';
airingt.value='Airing';
airingtext=document.createElement('a');
airingtext.innerHTML='Airing';

notairing=document.createElement('input');
notairing.className='airing';
notairing.value='Not Airing';
notairingtext=document.createElement('a');
notairingtext.innerHTML='Not Airing';

document.body.appendChild(table);
table.appendChild(type);
type.appendChild(headtype);
    headtype.appendChild(imagetype);
type.appendChild(divtype);
divtype.appendChild(tr27);
    tr27.appendChild(menutype);
        menutype.appendChild(select);
        menutype.appendChild(remove);
divtype.appendChild(tr16);
    tr16.appendChild(alltype);
    tr16.appendChild(alltypetext);
divtype.appendChild(tr1);
    tr1.appendChild(tv);
    tr1.appendChild(tvtext);
divtype.appendChild(tr2);
    tr2.appendChild(movie);
    tr2.appendChild(movietext);
divtype.appendChild(tr3);
    tr3.appendChild(ova);
    tr3.appendChild(ovatext);
divtype.appendChild(tr23);
    tr23.appendChild(ona);
    tr23.appendChild(onatext);
divtype.appendChild(tr4);
    tr4.appendChild(special);
    tr4.appendChild(specialtext);
   
document.body.appendChild(table2);
table2.appendChild(score);
score.appendChild(headscore);
    headscore.appendChild(imagescore);
score.appendChild(divscore);
divscore.appendChild(tr28);
    tr28.appendChild(menuscore);
        menuscore.appendChild(equal);
        menuscore.appendChild(notequal);
        menuscore.appendChild(greater);
        menuscore.appendChild(smaller);
        menuscore.appendChild(choose);
divscore.appendChild(tr17);
    tr17.appendChild(allscore);
    tr17.appendChild(allscoretext);
divscore.appendChild(tr5);
    tr5.appendChild(score10);
    tr5.appendChild(score10text);
divscore.appendChild(tr6);
    tr6.appendChild(score9);
    tr6.appendChild(score9text);
divscore.appendChild(tr7);
    tr7.appendChild(score8);
    tr7.appendChild(score8text);
divscore.appendChild(tr8);
    tr8.appendChild(score7);
    tr8.appendChild(score7text);
divscore.appendChild(tr9);
    tr9.appendChild(score6);
    tr9.appendChild(score6text);
divscore.appendChild(tr10);
    tr10.appendChild(score5);
    tr10.appendChild(score5text);
divscore.appendChild(tr11);
    tr11.appendChild(score4);
    tr11.appendChild(score4text);
divscore.appendChild(tr12);
    tr12.appendChild(score3);
    tr12.appendChild(score3text);
divscore.appendChild(tr13);
    tr13.appendChild(score2);
    tr13.appendChild(score2text);
divscore.appendChild(tr14);
    tr14.appendChild(score1);
    tr14.appendChild(score1text);
divscore.appendChild(tr15);
    tr15.appendChild(scorenull);
    tr15.appendChild(scorenulltext);
    
document.body.appendChild(table3);
table3.appendChild(progress);
progress.appendChild(headprogress);
    headprogress.appendChild(imageprogress);
progress.appendChild(divprogress);
divprogress.appendChild(tr29);
    tr29.appendChild(namee);
divprogress.appendChild(tr18);
    tr18.appendChild(allprogress);
    tr18.appendChild(allprogresstext);
divprogress.appendChild(tr19);
    tr19.appendChild(short);
    tr19.appendChild(shorttext);
divprogress.appendChild(tr20);
    tr20.appendChild(medium);
    tr20.appendChild(mediumtext);
divprogress.appendChild(tr21);
    tr21.appendChild(long);
    tr21.appendChild(longtext);
divprogress.appendChild(tr22);
    tr22.appendChild(infinite);
    tr22.appendChild(infinitetext);
    
document.body.appendChild(table4);
table4.appendChild(airing);
airing.appendChild(headairing);
    headairing.appendChild(imageairing);
airing.appendChild(divairing);
divairing.appendChild(tr24);
    tr24.appendChild(allairing);
    tr24.appendChild(allairingtext);
divairing.appendChild(tr25);
    tr25.appendChild(airingt);
    tr25.appendChild(airingtext);
divairing.appendChild(tr26);
    tr26.appendChild(notairing);
    tr26.appendChild(notairingtext);

    
$(".drag").css({"position":"fixed","top":"100px","background":"white","opacity":"0.7","padding":"10px","borderRadius":"10px"});
table3.style.top='325px';
table4.style.top='465px';
$(".td a").css({"color":"black"});
$(".type").attr({type:"radio",name:"group1"});
$(".score").attr({type:"radio",name:"group2"});
$(".progress").attr({type:"radio",name:"group3"});
$(".airing").attr({type:"radio",name:"group4"});
$(".select").attr({type:"radio",name:"group5"});
$(".equal").attr({type:"radio",name:"group6"});