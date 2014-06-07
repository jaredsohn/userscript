// ==UserScript==
// @name       nebo mobi bot
// @namespace  http://lefterov.at.ua/
// @version    0.5
// @description  Bot for nebo.mobi
// @match      http://nebo.mobi/bot
// @include    http://nebo.mobi/bot
// @copyright  2014, POCCOMAXA
// ==/UserScript==
var ifr;
var inprogress = false;
var progress = 0;
var attempts = 0;
var stop = false;
var text = ['Поднять|Опустить|Чаевые',
            'Собрать',
            'Закупить',
            'Выложить',
            'Построить|Да, подтверждаю',
            
            'Открыть',
            'Найти|Принять',
            ':-(&Выселить&filterNorm&:-|&Уволить',
            'Получить награду'];

var page = ['http://nebo.mobi/home',
            'http://nebo.mobi/home',
            'http://nebo.mobi/home',
            'http://nebo.mobi/home',
            'http://nebo.mobi/home',
            
            'http://nebo.mobi/home',
            'http://nebo.mobi/home',
            'http://nebo.mobi/humans',
            'http://nebo.mobi/quests'];

var order = [0,
             0,
             1,
             0,
             0,
             
             0,
             0,
             0,
             0];

var MAX_PROGRESS = text.length;
var MAX_ATTEMPTS = 25;
var SPEED = 1;
var t;

startbot();

function startbot()
{
    document.title='Бот активен. Статус 0';
    document.body.innerHTML='';
    document.body.style.margin='5px';
    var o=document.createElement('a');
    o.innerHTML='Stop';
    o.id='stopper';
    document.body.appendChild(o);
    o.href='javascript: var a=document.getElementById("botframe"); a=a.contentDocument.location; location.replace(a);';
    o=document.createElement('iframe');
    o.id='botframe';
    o.name='botframe';
    o.src='http://nebo.mobi';
    o.style.height=window.innerHeight-50+'px';
    o.style.width='100%';
    document.body.appendChild(o);
    submain();
}

function next()
{
	progress++;
    if(progress==MAX_PROGRESS)progress=0;
    document.title='Бот активен. Статус '+progress;
    location.replace('http://nebo.mobi/bot#'+progress);
    attempts = 0;
    submain();
}

function submain()
{
    clearTimeout(t);
    loadpage(page[progress]);
    t=setTimeout(main, 1000/SPEED);
}

function main()
{
    clearTimeout(t);
    if(progress==7)
    {
        t=setTimeout(humans, 1000/SPEED);
        return;
    }
    t=setTimeout(standard, 1000/SPEED);
}

function reload()
{
    ifr=document.getElementById('botframe');
    s=ifr.contentDocument.location;
    ifr.contentDocument.location.replace(s);
}

function loadpage(s)
{
    ifr=document.getElementById('botframe');
    ifr.contentDocument.location.replace(s);
}

function onload(f)
{
    ifr=document.getElementById('botframe');
    ifr.onload=f;
}

function findlink(s, order)
{
    ifr=document.getElementById('botframe');
    var a=ifr.contentDocument.links;
    if(!order)
    {
    	for(var i=0; i<a.length; i++)
    	{
        	if((a[i].href.indexOf(s) != -1 || a[i].innerHTML.indexOf(s) != -1) && a[i].innerHTML.indexOf('gold') == -1)
        	{
            	return a[i].href;
        	}
    	}
    }
    else
    {
        for(var i=a.length-1; i>=0; i--)
    	{
        	if((a[i].href.indexOf(s) != -1 || a[i].innerHTML.indexOf(s) != -1) && a[i].innerHTML.indexOf('gold') == -1)
        	{
            	return a[i].href;
        	}
    	}
    }
    return 0;
}

function standard()
{
    if(inprogress)return;
    attempts++;
    if(attempts == MAX_ATTEMPTS)
    {
        console.log('standard,'+progress+',error max attempts');
        next();
        return;
    }
    inprogress=true;
    loadpage(page[progress]);
    onload(standard_1_call);
}

function standard_1_call()
{
    clearTimeout(t);
	t=setTimeout(standard_1, 1000/SPEED);
}

function standard_1()
{
    var arr = text[progress].split('|');
    var o = order[progress];
    var link;
    for(var i=0; i<arr.length; i++)
    {
        link = findlink(arr[i], o);
        if(link) break;
    }
    if(link) 
    {
        loadpage(link);
        onload(standard_1_call);
    }
    else
    {
        inprogress = false;
        next();
    }
}

function humans()
{
    if(inprogress)return;
    attempts++;
    if(attempts == MAX_ATTEMPTS)
    {
		console.log('humans,'+progress+',error max attempts');
        next();
        return;
    }
    inprogress=true;
    loadpage(page[progress]);
    onload(humans_1_call);
}

function humans_1_call()
{
    clearTimeout(t);
    if(checkerror())
    {
        inprogress = false;
        t=setTimeout(humans, 1000/SPEED);    
    }
    else
    {
        t=setTimeout(humans_1, 1000/SPEED);
    }
}

function humans_1()
{
    var arr = text[progress].split('&');
    var o = order[progress];
    var link;
    for(var i=0; i<arr.length; i++)
    {
        if(arr[i]==':-(' || arr[i]==':-|') 
        {
            link = findhumans(arr[i]);
            link = link[getRandomInt(link.length)]
        }
        else
        {
            link = findlink(arr[i], o);
        }
        if(link) break;
    }
    if(link) 
    {
        loadpage(link);
        onload(humans_1_call);
    }
    else
    {
        inprogress = false;
        next();
    }
}

function findhumans(s)
{
    ifr=document.getElementById('botframe');
    var a=ifr.contentDocument.images;
    var temp = [];
    var b;
    for(var i=0; i<a.length; i++)
    {
        if(a[i].alt.indexOf(s) != -1)
        {
            b=a[i].parentNode.parentNode.parentNode;
            if(b.innerHTML.indexOf('>8<') == -1 && b.innerHTML.indexOf('>9<') == -1 && b.innerHTML.indexOf('(+)') == -1)
            {
                temp[temp.length]=b.childNodes[1].href;
            }
        }
    }
    return temp;
}

function getRandomInt(max)
{
  return Math.floor(Math.random() * max);
}

function checkerror()
{
    ifr=document.getElementById('botframe');
    var a=ifr.contentDocument.getElementsByClassName('feedbackPanelERROR');
    return a.length;    
}