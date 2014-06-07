// ==UserScript==
// @name        auto mark
// @namespace   华理评选教系统自动评分
// @description 华理评选教系统
// @version     1.3
// @include     http://pjb.ecust.edu.cn/pingce/*
// ==/UserScript==


//辅助函数
function loadStyle(css)
{
    if(typeof GM_addStyle!='undefined')
    {
        GM_addStyle(css);
    }
    else
    {
        var heads=document.getElementsByTagName('head');
        if(heads.length>0)
        {
            var node=document.createElement('style');
            node.type='text/css';
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    }
}
function $(id)
{
	'use script';
	if(typeof id != 'undefined')
	{
		return document.getElementById(id);
	}
}


var b = document.getElementsByTagName('input');
var table = document.getElementsByTagName('table')[1];
var k = 0 , sum = 0;
var a = [b[0]];
for( var i = 0, l = b.length; i < l; i++ )
{
    if( b[i].type == 'radio' )
    {
        a[++k] = b[i];
    }
}
for ( var i = 1, len = a.length, dif = a[1].value - a[0].value; i < len ; i++)
{
	dif = Math.abs( a[i].value - a[i == 0 ? 0 : i - 1].value ) > dif ? dif : Math.abs( a[i].value - a[i - 1].value );
}

var isopen = 'closed';


//添加按钮
var float_window = document.createElement( 'div' );
var float_button = document.createElement( 'div' );
var float_content = document.createElement( 'div' );
float_button.id = 'float_button';
float_window.id = 'float_window';
float_content.id = 'float_content';
float_button.innerHTML = '<';
document.body.appendChild( float_window );
float_window.appendChild( float_button );
float_window.appendChild( float_content );
var box = '<div id = "score">分数在40到100之间</div>';
    box += '<div>';
    box += '<input type = "button" id = "haoping" value="好评"/>';
    box += '<input type = "button" id = "chaping" value="差评"/>';
    box += '</div>';
    box += '<div>';
    box += '<input type = "button" id = "suiji" value="随机"/>';
    box += '<label>大于等于</label>';
    box += '<input id = "range_low" class = "range" type="text" maxlength = 3></input>';
    box += '<label>小于等于</label>';
    box += '<input id = "range_upper" class = "range" type="text" maxlength = 3></input>';
    box += '</div>';
float_content.innerHTML = box;
var hpbutton = $('haoping');
var cpbutton = $('chaping');
var sjbutton = $('suiji');
var score = $('score');

var css = "@namespace url(http://www.w3.org/1999/xhtml);";
    css += '#float_window{ background-color:#FCFCFC;width:14px;height:14px;top:20%;right:10px;position:fixed;padding:4px;border:2px;border-radius:4px;box-shadow:0px 0px 8px #dddddd;z-index:9999; }';
    css += '#float_window >*{margin:2px;}';
    css += '#float_window input[type="button"]{border:1px solid #BBBBBB;border-radius:3px;background-color:#FCFCFC;margin:3px;}';
	css += '#float_content{ background-color:#f7f7f7;padding:1px;border:1px solid rgb(221,221,221);border-radius:4px;display:none; }';
	css += '#float_button{ background-color:whitesmoke;width:16px;height:16px;position:absolute;top:0px;right:0px;border:1px solid #BBBBBB;border-radius:4px;text-align:center;cursor:pointer;z-Index:9 }';
    css += '#score{margin:3px;position: relative;left:6px;font-size:14px}';
    css += 'input.range{width:30px;}'
loadStyle(css);

float_button.addEventListener( 'click',showmenu,false );

function showmenu()
{
	if( isopen == 'closed' )
	{
		float_button.innerHTML = '>';
		float_content.style.display = 'block';
		float_window.style.width = '220px';
		float_window.style.height = '86px';
		float_window.addEventListener( 'mouseleave',fadeout,false);
		float_window.addEventListener( 'mouseenter',fadein,false);
		isopen = 'opened';
	}
	else if ( isopen == 'opened' )
	{
		float_window.removeEventListener( 'mouseleave',fadeout,false );
		float_window.removeEventListener( 'mouseenter',fadein,false );
		float_button.innerHTML = '<';
		float_content.style.display = 'none';
		float_window.style.width = '14px';
		float_window.style.height = '14px';
		isopen = 'closed';
	}
}
function fadeout()
{
	var opac = float_window.style.opacity >= 1 ? float_window.style.opacity * 1 : 1;
	var timer = setInterval( function()
	{
		if( opac > 0.4 )
		{
			opac -= 0.1;
			float_window.style.opacity = opac;
		}
		else
		{
			clearInterval( timer );
		}
	},30)	
}
function fadein()
{
	var opac = float_window.style.opacity * 1;
	var timer = setInterval( function()
	{	
		if( opac < 1.0 )
		{
			opac += 0.1;
			float_window.style.opacity = opac;
		}
		else
		{
			clearInterval( timer );
		}
	},30)
}


//评价函数
hpbutton.addEventListener('click',haoping,false);
cpbutton.addEventListener('click',chaping,false);
sjbutton.addEventListener('click',suiji,false);

function haoping()
{
    sum = 0;
    for ( var i = 1, l = a.length; i < l - 1; i++)
    {
        if( i == 1 ? 1 : ( a[i].value * 1 > a[i + 1].value * 1 ) && a[i].value * 1 > a[i - 1].value * 1)
        {
            a[i].checked = 'checked';
            sum += a[i].value * 1;
        }
    }
    score.innerHTML = '总分：'  + sum;
}

function chaping()
{
    sum = 0;
    for ( var i = 1, l = a.length; i < l ; i++)
    {
        if( i == l - 1 ? 1 : (a[i].value * 1 < a[i + 1].value * 1) && a[i].value * 1 < a[i - 1].value * 1)
        {
            a[i].checked = 'checked';
            sum += a[i].value * 1;
        }
    }
    score.innerHTML = '总分：'  + sum;
}

function suiji()
{
	var upper = $('range_upper').value;
	var low = $('range_low').value;
	upper = parseInt( upper == ''  ? 100 : upper );
	low = parseInt( low == ''  ? 40 : low );
 	if(!(upper <= 100 && upper >= 40 && low >= 40 && low <= 100))
	{
		warning( Math.floor(Math.random() * 2 + 1),0);
		$('range_upper').value = '';
		$('range_low').value = '';
		score.innerHTML = '分数在40到100之间';
	} 
	else if( low > upper )
	{
	    warning( Math.floor(Math.random() * 2 + 1),1);
		$('range_upper').value = '';
		$('range_low').value = '';
		score.innerHTML = '分数在40到100之间';
	}
	else if( upper - low < dif && dif > 1 )
	{
		warning( Math.floor(Math.random() * 2 + 1),2);
		$('range_upper').value = '';
		$('range_low').value = '';
		score.innerHTML = '分数在40到100之间';
	}
	else
	{
		random(upper,low);
	}
}

function random(upper,low)
{
	sum = 0;
    for( var j = 0 , l = (a.length - 1) / 4; j < l; j++)
    {
        var index = Math.floor( Math.random() * 4 + 1);
        a[4 * j + index].checked = true;
        sum += a[4 * j + index].value * 1;
    }
    var row;
    var line;
    
    while(sum < low || sum > upper)
    {
        row = Math.floor( Math.random() * l );
        for(var i = 1; i < 5; i++)
        {
            if(a[4 * row + i].checked == true) line = i;
        }
        if(sum < low)
        {
            var min = a[4 * row + line].value * 1;
            line = line == 1 ? 1 : Math.floor( Math.random() * (line - 1) + 1 );
			a[4 * row + line].checked = true;
            sum += a[4 * row + line].value * 1 - min;
        }
        if(sum > upper)
        {
            var max = a[4 * row + line].value * 1;
            line = line == 4 ? 4 : Math.floor( Math.random() * (4 - line) + line );
			a[4 * row + line].checked = true;
            sum -= max - a[4 * row + line].value * 1;
        }
    }
    score.innerHTML = '总分：'  + sum;
}

//警告
function warning(style,id)
{
	switch(style){
	case 1 :
		switch(id){
		case 0 :
			alert('魂淡，都说了数字在40到100之间啊o(￣ヘ￣o＃)');
			break;
		case 1 :
			alert('魂淡，给我分清大小啊喂Σ(っ °Д °;)っ ');
			break;
		case 2 :
			alert('魂淡，差值那么小算不了啦(￣△￣；) ');
			break;
            }
		break;
	case 2 :
		switch(id){
		case 0 :
			alert('要填在40到100之间的数字哦↖(^ω^)↗');
			break;
		case 1 :
			alert('大小什么的搞错了哦(*￣︿￣)');
			break;
		case 2 :
			alert('差值不能那么小的啦(>^ω^<)');
			break;
            }
		break;
	}
}