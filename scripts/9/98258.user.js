// ==UserScript==
// @name             microformats
// @version          1.1
// @namespace        microformats
// @author           CupIvan <mail@cupivan.ru>
// @homepage         http://js.cupivan.ru/microformats/
// @description      Find microformats (hCard, hRecipe) in HTML
// @include          *
// ==/UserScript==

/** парсим hCard */
parseMicroformat('hCard', ['#EEF', '#99F'],
{
	fn:  'Имя / ник',
	org: 'Название организации',
	adr:
	{
		_: 'Адрес',
		country_name: 'Страна',
		region:       'Субъект федерации / район',
		locality:     'Населенный пункт',
		street_address:   'Адрес с точностью до здания',
		extended_address: 'Подъезд, этаж и др., описание',
		postal_code: 'Индекс',
	},
	url:      'Ссылка на сайт',
	category: 'Род деятельности организации',
	email:    'Электронный адрес',
	geo:
	{
		_: 'Координаты',
		latitude:  'Широта',
		longitude: 'Долгота',
	},
	tel: 'Телефонный номер',
	workhours: 'Время работы организации',
});

/** парсим рецепты */
parseMicroformat('hRecipe', ['#EFE', '#9F9'],
{
	fn: 'Название рецепта или блюда',
	ingredient:
	{
		_: 'Ингредиент и его объем/количество',
		name:   'Название продукта',
		value:  'Кол-во единиц',
		type:   'Единица измерения',
		amount: 'Кол-во штук',
	},
	category: 'Тип блюда',
	instructions:
	{
		_: 'Инструкции по приготовлению блюда',
		instruction: 'Отдельный шаг',
		photo: 'Фотография',
	},
	yield:    'Кол-во порций',
	duration: 'Длительность приготовления блюда',
	author:   'Автор рецепта',
	nutrition:
	{
		_: 'Энергетическая или пищевая ценность',
		value: 'Кол-во',
		type:  '',
		calories: 'Калорийность',
		fat:      'Жиры',
		saturatedFat:   'Насыщенные жиры',
		unsaturatedFat: 'Ненасыщенные жиры',
		carbohydrates:  'Углеводы',
		sugar:       'Сахар',
		fiber:       'Клетчатка',
		protein:     'Белки',
		cholesterol: 'Холестерин',
		servingSize: 'Размер порции, для которой указывается пищевая/энергетическая ценность',
	},
	sub_category: 'Подтип блюда',
	tag:          'Метка',
	cuisine_type: 'Национальная кухня',
	weight: 'Вес готового блюда',
	result_photo: 'Фотография готового блюда',
});

/** функция парсинга микроформата */
function parseMicroformat(type, color, fields)
{
	var st = '';
	// функция обработки значения поля микроформата
	var _ = function (e, field, title, is_padding)
	{
		value = e.innerHTML; colored = e;
		if (colored.tagName.toLowerCase() == 'abbr' && colored.title) value = colored.title;
		if (',result_photo,photo,'.indexOf(','+field+',') != -1 && colored.src)  value = colored.src;
		if (field == 'url'   && colored.href) value = colored.href;
		if ($$(e, '.value-title').length)
			value = $$(e, '.value-title')[0].getAttribute('title');
		$$(e, '.value', function(e)
		{
			style(e, 'background: '+color[1]);
			if (colored) value = ''; colored = null;
			value  += e.innerHTML;
		});
		style(colored, 'background: '+color[1]);
		if (colored) colored.title = title;
		value = value.replace(/<[^>]+?>/g, '');
		if (value.length > 100) value = value.substr(0, 100) + '...';
		st += '<div title="'+title+'">'+(is_padding?'- ':'')+'<b>'+field+':</b> '+value+'</div>';
	}
	// ищем данный микроформат на странице
	var t = type.toLowerCase();
	if (t == 'hcard') t = 'vcard';
	$$('.'+t, function(x){
		st = '';
		x.innerHTML = '<span style="background: '+color[1]+'; color: #FFF; border: 1px solid '+color[1]+
			'; cursor: pointer; margin: 0; padding: 0;" onclick="'+
			'var t=this.getElementsByTagName(\'span\')[1];'+
			't.style.display=t.style.display==\'none\'?\'block\':\'none\'">'+
			'<span style="padding: 2px 10px; margin: 0; font-weight: bold;">'+type+'</span>'+
			'<span style="display: none; background: #FFF; color: #000;"></span>'+
			'</span>'+x.innerHTML;
		style(x, 'border: 1px solid '+color[1]+'; background: '+color[0]);
		// функция ищет поля в микроформате, выделяет цветом и запоминает значения
		var field, f2, t; // TODO: здесь где-то могла бы быть рекурсия
		for (field in fields) // field - имя переменной поля, например: adr, fn, org
		$$(x, '.'+field.replace(/_/g,'-'), function(e) // ищем все вхождения класса
		{
			t = typeof(fields[field]) == 'object';
			_(e, field, t?fields[field]._:fields[field], 0);
			if (t) // если есть вложенные поля - перебираем их
			for (f2 in fields[field]) // ищем все вхождения подкласса
			$$(e, '.'+f2.replace(/_/g,'-'), function(e)
			{
				_(e, f2, fields[field][f2], 1);
			});
		});
		// сохраняем список обработанных полей
		$$(x, 'span span')[1].innerHTML = st;
	});
}

// dollar.js 1.9
function $$(a,b,c){var h,i,j,k,l=document,m,n;if(typeof(a)!='string'){l=a;a=b;b=c};l=[l];a=a.split(' ');k=a.length;for(h=0;h<k;h++){m=[];for(i=0;i<l.length;i++){if(a[h][0]=='#')n=[l[i].getElementById(a[h].replace(/./,''))];else if(a[h][0]=='.')try{n=l[i].getElementsByClassName(a[h].replace(/./,''))}catch(n){n=_getElementsByClassName(l[i],a[h].replace(/./,''))}else try{n=l[i].getElementsByTagName(a[h])}catch(n){};for(j=0;j<n.length;j++)if(n[j]){m.push(n[j]);if(h==k-1&&b!=undefined)b(n[j])}};l=[].concat(m)};return l};function $(d,e){var o,p,a,q,h;if(typeof(d)=='function'){$('',{'onDOMContentLoaded':d})};if(typeof(d)=='string'){if('..div.span.iframe.script.style.select.option.input.'.indexOf('.'+d+'.')!=-1){q=document;if(d)q=q.createElement(d);if(typeof(e)!='object')q.innerHTML=e;else for(h in e)if(h=='style')style(q,e[h]);else if(h.indexOf('on')==0)if(q.attachEvent){if(h=='onDOMContentLoaded'){var r=window.onload;window.onload=function(){if(r)r();e[h]()}}else q.attachEvent(h,e[h])}else q.addEventListener(h.replace(/^on/,''),e[h],false);else q[h]=e[h];return q};q=document.getElementById(d);if(!q)return null}else if(d==undefined)q=document.body;if(typeof(e)=='string')q.innerHTML=e;return q};function _getElementsByClassName(f,g){var s=[],h,t;var u=new RegExp('\\b'+g+'\\b');var v=f.getElementsByTagName('*');for(h=0;h<v.length;h++){t=v[h].className;if(u.test(t))s.push(v[h])};return s};
// style.js 1.7
function style(a,b){var f;if(typeof(a)=='string')a=$(a);if(!a)return false;if(a.length!=undefined&&a.firstChild==undefined){for(var g=0;g<a.length;g++)style(a[g],b);return};if(typeof(b)=='object')for(f in b){f.replace(/-(.)/g,function(c,a){return a.toUpperCase()});a.style[f]=b[f]}else{var g,f,h,c;c=function(d,e){d=d.split('|');return(d[1]&&e==d[0])?d[1]:d[0]};if(b.indexOf(':')==-1)return a.className=c(b,a.className);b=b.split(';');for(g=0;g<b.length;g++){f=b[g].split(':');if(f.length!=2)continue;h=f[1];f=f[0];f=f.replace(/\s/g,'');f=f.replace(/-(.)/g,function(c,a){return a.toUpperCase()});h=h.replace(/['"]/g,'');h=h.replace(/^\s+|\s+$/g,'');a.style[f]=c(h,a.style[f])}}}
