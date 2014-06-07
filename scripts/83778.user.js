//
//
// ==UserScript==
// @name          Dirty Comments Counter
// @namespace     http://dirty.ru/
// @description   Счётчик комментариев поста
// @include       http://dirty.ru/comments/*
// @include       http://dirty.ru/comments
// @include       http://www.dirty.ru/comments/*
// @include       http://www.dirty.ru/comments
// ==/UserScript==
//


var __$ = {
	$: function(id){

		return document.getElementById(id);
	},

	$t: function(name,obj){

		var obj = obj||document;

		return obj.getElementsByTagName(name);
	},

	$c: function(name,obj){

		var obj = obj||document;

		var Array = [];
		var checkArray = obj.getElementsByTagName('*');

		for(var i=0; i<checkArray.length; i++){

			if((' '+checkArray[i].className+' ').indexOf(' '+name+' ')>-1){
				Array[Array.length] = checkArray[i];
			}
		}

		return Array;
	},

	addCSS: function(cssStr){
		var head = __$.$t('head')[0];
		var styleSheets = head.getElementsByTagName('style');
		var styleSheet = null;
		if(styleSheets.length) styleSheet = styleSheets[styleSheets.length-1];
		else{
			styleSheet = document.createElement('style');
			styleSheet.type = 'text/css';
			head.appendChild(styleSheet);
		}
	
		if(styleSheet.styleSheet) styleSheet.styleSheet.cssText += cssStr;
		else styleSheet.appendChild(document.createTextNode(cssStr));
	},

	addEvent: function(obj,sEvent,sFunc){
		if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
		else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
	},

	event: function(e){

		e = e||window.event;

		if(e.pageX==null&&e.clientX!=null){
			var html = document.documentElement;
			var body = document.body;
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
		}

		if(!e.which&&e.button) e.which = e.button&1?1:(e.button&2?3:(e.button&4?2:0));

		return e;
	}
}

__$.table_sorter = {

	tab_class: 'tab_sort',
	sort_column: 0,
	sort_up: 1,
	sort_case_sensitive: false,

	_sort: function(a,b){
		var a = a[0];
		var b = b[0];
		var _a = (a+'').replace(/,/,'.');
		var _b = (b+'').replace(/,/,'.');
		if(parseFloat(_a)&&parseFloat(_b)){

			return parseFloat(_a)-parseFloat(_b);
		}
		else if(!__$.table_sorter.sort_case_sensitive){

			var anew = a.toLowerCase();
			var bnew = b.toLowerCase();
			if(anew<bnew) return -1;
			if(anew>bnew) return 1;
			return 0;
		}
		else{

			if(a<b) return -1;
			if(a>b) return 1;
			return 0;
		}
	},

	textContent: function(node){
		var _result = '';

		if(node==null) return _result;

		var childrens = node.childNodes;
		var i = 0;

		while(i<childrens.length){
			var child = childrens[i];
			switch (child.nodeType){
				case 1:
				case 5:
					_result += __$.table_sorter.textContent(child);
					break;
				case 3:
				case 2:
				case 4:
					_result += child.nodeValue;
					break;
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
				case 12:
				break;
			}
			i++;
		}
		return _result;
	},

	sort: function(e){

		var e = __$.event(e);
		var el = e.target;

		while(el.tagName.toLowerCase()!='td') el = el.parentNode;

		var a = [];
		var name = el.lastChild.nodeValue;
		var dad = el.parentNode;
		var table = dad.parentNode.parentNode;
		var up = table.up;
		var node,arrow,curcol;

		for(var i=0; (node=dad.getElementsByTagName('td')[i]); i++){

			if(node.lastChild.nodeValue==name){
				curcol = i;
				if(node.className=='curcol'){
					arrow = node.firstChild;
					table.up = Number(!up);
				}
				else{
					node.className = 'curcol';
					arrow = node.insertBefore(document.createElement('span'),node.firstChild);
					table.up = 0;
				}
				arrow.innerHTML = (table.up?'&#9660;':'&#9650;')+'&nbsp;';
			}
			else{
				if(node.className=='curcol'){
					node.className = '';
					if(node.firstChild) node.removeChild(node.firstChild);
				}
			}
		}

		var tbody = __$.$t('tbody',table)[0];

		for(i=0; (node=__$.$t('tr',tbody)[i]); i++){

			a[i] = [];
			a[i][0] = __$.table_sorter.textContent(__$.$t('td',node)[curcol]);
			a[i][1] = __$.table_sorter.textContent(__$.$t('td',node)[1]);
			a[i][2] = __$.table_sorter.textContent(__$.$t('td',node)[0]);
			a[i][3] = node;
		}

		a.sort(__$.table_sorter._sort);
		if(table.up) a.reverse();

		for(i=0; i<a.length; i++) tbody.appendChild(a[i][3]);
	},

	init: function(e){

		var thead;
		for(var j=0; j<__$.$c(__$.table_sorter.tab_class).length; j++){

			thead = __$.$t('thead',__$.$c(__$.table_sorter.tab_class)[j])[0];

			for(var i=0; i<__$.$t('td',thead).length; i++){

				__$.addEvent(__$.$t('td',thead)[i],'click',__$.table_sorter.sort);
				__$.$t('td',thead)[i].title = 'Нажмите на заголовок, чтобы отсортировать колонку';
			}
		        thead.parentNode.up = 0;
        
			var td_for_event = __$.$t('td',thead)[__$.table_sorter.sort_column];

			if(document.createEvent){
				var evt = document.createEvent('MouseEvents');
				evt.initMouseEvent('click',false,false,window,1,0,0,0,0,0,0,0,0,1,td_for_event);
				td_for_event.dispatchEvent(evt);
			}
			else if(td_for_event.fireEvent) td_for_event.fireEvent('onclick');

			if(__$.table_sorter.sort_up){
				if(td_for_event.dispatchEvent) td_for_event.dispatchEvent(evt);
				else if (td_for_event.fireEvent) td_for_event.fireEvent('onclick');
			}
		}
	}
};

function Count(){

	function array_search(needle,haystack,strict){

		var strict = !!strict;
 
		for(var key in haystack){

			if((strict&&haystack[key]===needle)||
			(!strict&&haystack[key]==needle)) return key;
		}
		return false;
	}

	var names = [];
	var comments = [];
	var rating = [];

	var divs = __$.$c('c_footer');
	var name,name_checker,rate,zero_coms;

	for(var i=0; i<divs.length; i++){

		name = __$.$t('a',divs[i])[1].innerHTML;
		rate = parseInt(__$.$c('vote_result',divs[i])[0].innerHTML);

		name_checker = array_search(name,names); 

		if(name_checker!==false){

			comments[name_checker]++;
			rating[name_checker] += rate;
		}
		else{
			names[names.length] = name;
			comments[comments.length] = 1;
			rating[rating.length] = rate;
		}
	}

	var output = '<table class="tab_sort" cellspacing="2" cellpadding="0" width="130" border="0"><thead><tr><td>К</td><td>П</td><td>Р</td></tr></thead><tbody>';
	var add_style;

	for(i=0; i<names.length; i++){

		add_style = (rating[i]<0)?' class="dcc_red"':((rating[i]>0)?' class="dcc_green"':'');

		output += '<tr><td align="right">'+comments[i]+'&nbsp;-&nbsp;</td><td><a href="/user/'+names[i]+'">'+names[i]+'</a></td><td align="right"'+add_style+'>'+rating[i]+'</td></tr>';
	}

	output += '</tbody></table>';

	__$.addCSS('.tab_sort tr td{font-size:10px;color:#aaa}.tab_sort thead tr td{cursor: pointer}.tab_sort tr td.dcc_red{color:red}.tab_sort tr td.dcc_green{color:green}.tab_sort thead tr td{border-bottom:1px solid #ddd;padding:3px;padding-top:0;color:#000}.tab_sort thead tr td span{color:#65aaff}.tab_sort thead tr td:hover{background-color:#ffedce}');

var contentLeft = document.querySelector('div.content_left ');
if ( contentLeft )
{
var div = document.createElement('div');
div.setAttribute('style','margin–top: 20px;');
div.innerHTML = output;
contentLeft.appendChild(div);
}

	__$.table_sorter.init();
}

Count();