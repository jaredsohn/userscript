// ==UserScript==
// @name			hwmResLink
// @namespace		hwm
//@version			0.0.1
// @description		hwm_res_link
// @include		http://www.heroeswm.ru/*
// ==/UserScript==




function appendLink(imgTitle){
var img = document.getElementsByTagName('img');
var linkChap = ['http://www.heroeswm.ru/auction.php?cat=res&sort=0&type=', 'http://www.heroeswm.ru/hwm_donate_page_new.php','http://www.heroeswm.ru/transfer.php','1','2','3','4','5','6'];
var imgArr = []; 
  
  for(i=0;i<img.length;i++){
  
    if(img[i].title == imgTitle){
	  imgArr.push(img[i]);
	  concretImg = imgArr[0];
    }
  }

var newLink = document.createElement('a');

switch (imgTitle) {
  case 'Золото':
    newLink.setAttribute('href',linkChap[2]);
    break;

  case 'Древесина':
    newLink.setAttribute('href',linkChap[0]+linkChap[3]);
    break;

  case 'Руда':
    newLink.setAttribute('href',linkChap[0]+linkChap[4]);
    break;
  
  case 'Ртуть':
    newLink.setAttribute('href',linkChap[0]+linkChap[5]);
    break;

  case 'Сера':
    newLink.setAttribute('href',linkChap[0]+linkChap[6]);
    break;

  case 'Кристаллы':
    newLink.setAttribute('href',linkChap[0]+linkChap[7]);
    break;

  case 'Самоцветы':
    newLink.setAttribute('href',linkChap[0]+linkChap[8]);
    break;

  case 'Бриллианты':
    newLink.setAttribute('href',linkChap[1]);
    break;
}

  var td = concretImg.parentNode;
  td.removeChild(concretImg);
  td.appendChild(newLink);
  newLink.appendChild(concretImg);
}

appendLink('Золото');
appendLink('Древесина');
appendLink('Руда');
appendLink('Ртуть');
appendLink('Сера');
appendLink('Кристаллы');
appendLink('Самоцветы');
appendLink('Бриллианты');

