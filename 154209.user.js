// ==UserScript==
// @name        MembranaPlugin
// @namespace   http://www.membrana.ru/particle/
// @include     http://www.membrana.ru/particle/*
// @version     1
// @grant       none
// ==/UserScript==

//Один человек
function person () {
	this.pname;
	this.nComments=0;
	this.id = "nameid";
	this.linkHref;
	this.hidden = false;
	this.highlighted = false;
}

//Собирает человеков со страницы 
function getPeople () {
var temp;
allCommentsNumber=nodeList.length;
next:
for (var i = 0; i < nodeList.length; i++) {
    for (var j = 0; j < people.length; j++) {
      if (people[j].pname===nodeList[i].innerHTML) {
        people[j].nComments++;
        continue next;
        };
    };
temp=new person();
temp.pname=nodeList[i].innerHTML;
temp.nComments=1;
temp.linkHref=nodeList[i].getAttribute("href",0);
people.push(temp);
    };
return people;
};

//Быстрая запись для добавления HTML объекта.
function elem(name, attrs, style, text) {
    var e = document.createElement(name);
    if (attrs) {
        for (key in attrs) {
            if (key == 'class') {
                e.className = attrs[key];
            } else if (key == 'id') {
                e.id = attrs[key];
            } else {
                e.setAttribute(key, attrs[key]);
            }
        }
    }
    if (style) {
        for (key in style) {
            e.style[key] = style[key];
        }
    }
    if (text) {
        e.appendChild(document.createTextNode(text));
    }
    return e;
}

//Скрыть/показать человечище
function hide (fPerson) {
	if (fPerson.hidden) {
		for (var i = 0; i < nodeList.length; i++) {
			if (nodeList[i].innerHTML==fPerson.pname) {nodeList[i].parentNode.parentNode.style.display='block';};	
		};
		fPerson.hidden = false;
	} 
	else{
		for (var i = 0; i < nodeList.length; i++) {
			if (nodeList[i].innerHTML==fPerson.pname) {nodeList[i].parentNode.parentNode.style.display='none';};
		};
		fPerson.hidden = true;
	};
}

//Подсветить/рассветить человечище
function highlight (fPerson) {
	if (fPerson.highlighted) {
		for (var i = 0; i < nodeList.length; i++) {
			if (nodeList[i].innerHTML==fPerson.pname) {nodeList[i].parentNode.parentNode.style.backgroundColor='';};
		};
		fPerson.highlighted = false;
	} else{
		for (var i = 0; i < nodeList.length; i++) {
			if (nodeList[i].innerHTML==fPerson.pname) {nodeList[i].parentNode.parentNode.style.backgroundColor='#aFa';};
			
		};
		fPerson.highlighted = true;
	};
}

//Сделать кнопку. Костыли.
function makeButton (text,parent,funct,fPerson) {
	var but1 = elem(
	'div',
	{'class':'butt'},
	{'width': '18px','cssFloat':'right','backgroundColor':'#093','border':'1px solid black','textAlign':'center'},
	text
	);
but1.onmouseover=function(){this.style.backgroundColor="#0B6"};
but1.onmouseout=function(){this.style.backgroundColor="#093"};
but1.onclick=function(){
	funct(fPerson);
};
parent.appendChild(but1);
}

//Сделать из человечища HTML запись.
function createHumanDiv (fPerson) {   
	var human = elem(
	'div',
	{'class':'human'},
	{'clear':'right'},
	''
	);
	mnuDiv.appendChild(human);


	var nameDiv = elem(
	'div',
	{'class':'name'},
	{'cssFloat':'right','width':'250px','margin':'0 0 0 10px'},
	''
	);
	human.appendChild(nameDiv);

	var nameA = elem(
	'a',
	{'href': fPerson.linkHref}, 
	{},
	fPerson.pname
	);
	nameDiv.appendChild(nameA);
	nameDiv.innerHTML = nameDiv.innerHTML+ " (" + fPerson.nComments + ")"; 
	makeButton("X",human,hide,fPerson);
	makeButton("H",human,highlight,fPerson);		
}

//Создать пустой массив человеков!
var people = new Array();
var allCommentsNumber=0;
var nodeList = document.querySelectorAll(".nick");
//Собрать человеков в массив!
getPeople(); 

//Создать общий div
var mnuDiv = elem(
	'div',
	{'class':'mnu'},
	{'width':'300px','backgroundColor':'#00405c','position':'fixed','top':'0','left':'-290px','zIndex':'999','paddingRight':'20px'},
	''
	);
mnuDiv.onmouseover=function(){this.style.left='0';};
mnuDiv.onmouseout=function(){this.style.left='-290px';};
//if (people.length>45) {mnuDiv.style.position='absolute'};
if (people.length>45) {
	mnuDiv.style.overflow='scroll';
	mnuDiv.style.height='100%';
	mnuDiv.style.width='318px';
};
document.body.appendChild(mnuDiv);

//Создать шапку
var hdr = elem(
	'div',
	{'class':'hdr'},
	{'color':'white','margin':'0 0 5px 50px'},
	''
	);
hdr.innerHTML = "Комментариев: "+ allCommentsNumber;// 
mnuDiv.appendChild(hdr);

//Создать записи для всех человеков
for (var i = 0; i < people.length; i++) {
	createHumanDiv(people[i]);
};