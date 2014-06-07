// ==UserScript==

// @name           jv.com smiley

// @namespace      Smiley, forum Nuns

// @description    liste des smileys

// @include        http://www.jeuxvideo.com/smileys/legende.htm

// ==/UserScript==

function addImg(href){
var img = document.createElement('img');
img.src = href;
return img;
}

function addA(href, code){
var a = document.createElement('a');
a.href = 'javascript:passCode("newmessage","'+code+'");'
a.appendChild(addImg(href));
return a;
}

function addTd1(href, code){
var td = document.createElement('td');
td.appendChild(addA(href, code));
return td;
}

function addTd2(code){
var td = document.createElement('td');
td.innerHTML = code;
return td;
}

function addTr(i){
var tr = document.createElement('tr');
var classe = (i%2 == 0)? 'tr1' : 'tr2';
tr.setAttribute('class', classe);
return tr;
}

function nbTr(){
	return document.getElementsByTagName('tr').length;
}

function lastTr(){
return document.getElementsByTagName('tr')[nbTr()-1];
}

function nbTd(tr){
return lastTr().getElementsByTagName('td').length;
}

function addSmiley(tr, href, code){
if(nbTd(tr) == 8)
tr = tr.parentNode.appendChild(addTr(nbTr()));
tr.appendChild(addTd1(href, code));
tr.appendChild(addTd2(code));
}

function addSmileys(){
try{
addSmiley(lastTr(), "http://www.noelshack.com/uploads/aivlys048517.gif" , ":aivlys:");
addSmiley(lastTr(), "http://www.noelshack.com/voir/130309/celine2068356.gif" , ":celine:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/darky032620.gif" , ":darky:");
addSmiley(lastTr(), "http://www.noelshack.com/voir/130309/dhaos015930.gif" , ":dhaos:");
addSmiley(lastTr(), "http://www.noelshack.com/voir/130309/eryen099488.gif" , ":eryen:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/fubu003573.gif" , ":fubu:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/girlie037066.gif" , ":girlie:");
addSmiley(lastTr(), "http://www.noelshack.com/voir/130309/hypnose067526.gif" , ":hypnose:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/ichigo088166.gif" , ":ichigo:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/ichinoob023867.gif" , ":ichinoob:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/indian062960.gif" , ":indian:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/kakashi065861.gif" , ":kakashi:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/kiddon005181.gif" , ":kiddo:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/kiddoc099777.gif" , ":kiddoclown:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/kiwi035242.gif" , ":kiwi:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/kobe038308.gif" , ":kobe:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/M-I035117.gif" , ":M-I:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/madara073538.gif" , ":madara:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/madarave016150.gif" , ":madarave:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/mim014035.gif" , ":mim:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/mimc029567.gif" , ":mimcoeur:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/kiddorcc024175.gif" , ":modo:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/momo018562.gif" , ":momo:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/naruto079760.gif" , ":naruto:");
addSmiley(lastTr(), "http://www.noelshack.com/voir/090309/ooui022951.gif" , ":o-oui:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/ophelie1082889.gif" , ":ophelie:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/oro045241.gif" , ":oro:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/pitbull022534.gif" , ":pitbull:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/sakura092952.gif" , ":sakura:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/sakurar033794.gif" , ":sakurarose:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/shaka041743.gif" , ":shaka:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/shakab048217.gif" , ":shakabave:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/shaki040678.gif" , ":shaki:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/shiba075277.gif" , ":shiba:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/shiba080935.gif" , ":shibave:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/shibide015208.gif" , ":shibide:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/shin026219.gif" , ":shin:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/ssj5003523.gif" , ":ssj5:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/ssjbide017233.gif" , ":ssjbide:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/vanille024404.gif" , ":vanilles:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/nohap072698.gif" , ":nohap:")
addSmiley(lastTr(), "http://www.noelshack.com/uploads/mortn046377.gif" , ":noelmort:")
addSmiley(lastTr(), "http://www.noelshack.com/uploads/bavec008835.gif" , ":bavecoeur:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/bavenoel009791.gif" , ":bavenoel:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/baveh056618.gif" , ":bavehap:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/bavenh060557.gif" , ":bavenohap:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/bavange088162.gif" , ":bavange:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/bonneapp095345.gif" , ":bonapp:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/bonnenuit046230.gif" , ":bonnenuit:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/joker031996.gif" , ":joker:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/bide041116.gif" , ":bide:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/nuns099159.gif" , ":nuns:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/coeur076251.gif" , ":coeur2:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/snif027749.gif" , ":snifcoeur:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/aimer060853.gif" , ":aimer:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/cheriel000243.gif" , ":cherie:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/firefox008412.gif" , ":firefox:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/corde097899.gif" , ":corde:");
addSmiley(lastTr(), "http://www.noelshack.com/uploads/pendu078208.gif" , ":pendu:");
//la liste des smileys est à compléter sous la forme de addSmiley(lastTr(), "", "");

}
catch(e){
alert(e);
}
}

addSmileys();
