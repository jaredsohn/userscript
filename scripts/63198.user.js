// ==UserScript==
// @name           leproarchive
// @namespace      leprosorium
// @description    Posts Filter based on rating for archived pages @ leprosorium.ru
// @include        http://leprosorium.ru/archive/*
// @include        http://www.leprosorium.ru/archive/*
// @include        http://www.leprosorium.ru/
// @include        http://leprosorium.ru/
// ==/UserScript==

// FUNCTIONS DEFINITION SECTION -----------------------------------------------
function setFilter () {
	if (isFilter) {
		GM_registerMenuCommand("Не применять фильтир автоматически", setFilter);
		GM_setValue("isFilter", false);
	} else {
		GM_registerMenuCommand("Применять фильтир автоматически", setFilter);
		GM_setValue("isFilter", true);
	}
	window.location.reload();
}

function setSorted () {
	if (isSorted) {
		GM_registerMenuCommand("Не сортировать посты", setSorted);
		GM_setValue("isSorted", false);
	} else {
		GM_registerMenuCommand("Сортировать посты", setSorted);
		GM_setValue("isSorted", true);
	}
	window.location.reload();
}

function filter () {

	if (isFilter) {
		isFilter = false;
		img.src = imgFilterAdd;
		img.title = "Спрятать всё что оценено ниже чем " + th;
	} else {
		isFilter = true;
		img.src = imgFilterDel;
		img.title = "Показать всё [и Суходрищева тоже]";
	}
	
	if (isNaN(input.value)) {
		input.value = th;
	} else {
		th = input.value;
	}

	for (var i=0; i<raitings.length; i++) {
		var item = raitings[i].parentNode.parentNode.parentNode.parentNode;
		if (parseInt(raitings[i].firstChild.innerHTML) < th) {
			if (isFilter) {
				item.style.display = 'none';
			} else {
				item.style.display = 'block';
			}
		} else {
			item.style.display = 'block';
		}
	}

}

function refilter () {
	if (isNaN(input.value)) {
		input.value = th;
	} else {
		if (th != input.value) {
			isFilter = false;
			img.src = imgFilterAdd;
			img.title = "Спрятать всё что оценено ниже чем " + input.value;
			filter();
		}
		th = input.value;
	}
}
	
function swapNodes(itemx, itemy) {
	var itemtmp = itemx.cloneNode(1);
	var parent = itemx.parentNode;
	itemy = parent.replaceChild(itemtmp, itemy);
	parent.replaceChild(itemy, itemx);
	parent.replaceChild(itemx,itemtmp);
	itemtmp = null;
}

// PROCESSOR ------------------------------------------------------------------
if (window.location.href == 'http://leprosorium.ru/' || window.location.href == 'http://leprosorium.ru/') {
	GM_setValue("wtf_vote", unsafeWindow.wtf_vote);
} else {
	var ph = document.getElementsByClassName('date')[0];

	var calendar = document.getElementsByTagName('table')[4];

	var president = document.getElementById('president');
	var today_date = new Date();
	var today_day = today_date.getDate();
	var today_month = today_date.getMonth() + 1;
	var paragraph = document.createElement('p');
	paragraph.appendChild(document.createTextNode('Сегодня: '));
	var today_link = document.createElement('a');
	today_link.setAttribute('href', '/archive/' + today_date.getFullYear() + (today_month<10?'0':'') + today_month + (today_day<10?'0':'') + today_day);
	today_link.appendChild(document.createTextNode((today_day<10?'0':'') + today_day + '.' + (today_month<10?'0':'') + today_month + '.' + today_date.getFullYear()));
	today_link.setAttribute('class', 'link');
	paragraph.appendChild(today_link);
	president.appendChild(paragraph);

	var raitings = document.getElementsByClassName('rating');
	var sum = 0;

	var imgFilterAdd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ8SURBVDjLpVLfS1NhGPYP8D6im8DKwrYhUaa1tEyyIXlRWtFFJlZQERIGUZKGI5dO7ZeUEl1YaKUYkyU1J0hE/ppzuOnUDbdpbp7Nue2crZ2J9fSeQ4LhdtUHLx/fx/c87/M+z5cEIOl/6p/DsjGnzWfIhnf0CJjhw2AGD2HpWxY8Xw/CPXAAi/378aNvHxY+p7viEhD416q/FTFfC2JLL8AvPkd0/gl+OhoRsdXDN1gsgLm4CghcE5opw6qvFeHpfHDm4wgZsxEcykLEroZ/tFQAryUcwTsij8WYZ4i6boGz5IE1HkWQxojY6xAwlZN0OVyfZClxCbzD8jMBywXEvC0IT50AazqG4Kgc3ORNcNYqeAYUcGllioQmklnhiKsavLsR3EQuQmPZCAxmitK9388RWFqRMAUCZyyPFSLGvKSOCoTG8xAcycEKOR+eeSSAfzs1e3lHdxo/17WHt79P5W3tO/nZNymMSEAxMezsbepO8y+Q484Gce6IrQ5hqwqsWUmkVQgaKhEYvosFbT4IHJl+vV30I4kyDlLGPGXMU8Y8Oc3P98p4zvoQvl4ZlvWkyliNro4iVDQX40pjIc4rc9iTd6SVm/7Bejl7JAMrhnKwEzUEvo/2tlN40HkJWkszTG4dmvqu4WyTBBnXt6rjEjg+ponSPf1FmPsgxUVV7prG/BiaqacQllp/GU36qwJBNB543KMvhFtXAHvHLr/t7Y4tBffS0Wt5hY2rZ6JZINgETnZ0SzDXmQZyum79PvPGtmi9rhS1uhIRXPulJL4CimmSYmIInLzxnh4qT6t3o0FXJnYWduG8yQP7u9SMRB+GHquoWEH2310l3P8B4M3c7jDaDNsAAAAASUVORK5CYII=";
	var imgFilterDel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ7SURBVDjLpVNLSFRRGP7u3Dt3JnMsdcAeNjrgAyoqWiQUZBYi6aYiFbEWbdsZJNEqaBO0bxdkENRKMXobmQVa4SPBfMyoPdQp9To6zfvec07/vTo4TbPrwMd/zn/v9/2vcyQhBP5nKekHbbjmvuDioikqOAc4Wba+t5DaM/69uG6o5B8BIrdu87aaFmDmj2wTBkN0+RPia75wivyXwPLgiZuqq9wGCqxrnRC6Aa7rEEkddvc5xFfHTTIjsis9qG0zOm93bj8IFp2wogl9HXb3GSTDc4it+sAZr8zsgSWw9PH4eXuOR4WkgkXGLAHODMi5hymLCEWfAkuEGjz1I9NZBSj6PUqfiBGCsVGzAZvDg1hw0szgqqdh5Gm2KUi/+o9Vyap7wFV8GsnlbnCqWVDtPB6HWnQWmu+BoK4nUxPgVnMtrJVf8Bcp9KFbdVWQQ4eSV0fWsEoADUIYHPklTZIwdMf6NDjCS0OUlS/KdXbUmgKpOsILbxNpM7ZsvrfZEZ99RG3ZDXvBESy8eQ1tcBKJxRCYLDTiNlZewi0p20389vhAb96uU9WKWkhZ6JjreQZjUUZFTSMc3n2Ijb7El3evWHBivM2WrTGURbXicCOyNArN34VA3+e1ciI7p3shdbQgZ6YTpSWFspBEm5JJ/tq1f9jpKkM4MICoNrVCYnsR5QHnDi9Qf2XzDdzYCZlLpUoGORfCdigW9IPpydtlLVPtpn+mQ5mPjjwp3tp9GYnYT0TJ9zskUy+wYMtI/QMRFwmuFNlcOQVFd8f6+4xAfAtCsh3BFQn+eYnajjuwXt4G/A8rq9LP6XjfvOfai1p5tuekwsn+eF4rXzf9fwCYD6X48OnVRgAAAABJRU5ErkJggg==";
	var img = new Image();
	var isFilter = false;
	var th = 0;

	var cnt = 0;
	// POSTS THRESHOLD
	var pth = 0;

	var input;

	// ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=
	// ~=~=~ Установки скрипта ~=~=~=~=~=~=~=~=
	// ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=
	var isFilter = GM_getValue("isFilter");
	if (isFilter == undefined) {
		isFilter = false;
	}

	if (isFilter) {
		GM_registerMenuCommand("Не применять фильтир автоматически", setFilter);
	} else {
		GM_registerMenuCommand("Применять фильтир автоматически", setFilter);
	}

	var isSorted = GM_getValue("isSorted");
	if (isSorted == undefined) {
		isSorted = false;
	}

	if (isSorted) {
		GM_registerMenuCommand("Не сортировать посты", setSorted);
	} else {
		GM_registerMenuCommand("Сортировать посты", setSorted);
	}
	
	var wtf_vote = GM_getValue("wtf_vote");
	if (wtf_vote != undefined) {
		unsafeWindow.wtf_vote = wtf_vote;
	}

	// ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=
	// ~=~=~ Подсветка даты текущего архива =~=
	// ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=
	
	var archs = document.evaluate('//a[contains(@href, "'+document.location.pathname+'")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	if(archs.snapshotLength > 0) {
		for (var i=0; i<archs.snapshotLength; i++) {
			var arch = archs.snapshotItem(i);
			if (arch.parentNode.tagName == 'TD') {
				arch.style.backgroundColor = '#CC0000';
				arch.style.padding = '2px';
				arch.style.color = 'White';
				arch.style.fontWeight = 'Bold';
			}
		}
	}
	

	// ~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=
	if (raitings.length>1) {

		if (isSorted) {
	//		GM_log('Сортировка');
			for (var i=0; i<raitings.length-1; i++) {
				var highestNode = raitings[i];
				for (var j=i+1; j<raitings.length; j++) {
					if (parseInt(highestNode.firstChild.innerHTML) < parseInt(raitings[j].firstChild.innerHTML)) {
						highestNode = raitings[j];
					}
				}
				if (raitings[i] != highestNode) {
					swapNodes(raitings[i].parentNode.parentNode.parentNode.parentNode, highestNode.parentNode.parentNode.parentNode.parentNode);
				}
			}
		}

		var scell = ph.parentNode.parentNode;
		var clone = scell.cloneNode(true);
		
		var table = document.createElement('table');
		table.setAttribute("cellpadding", 0);
		table.setAttribute("cellspacing", 0);
		var tbody = document.createElement('tbody');
		var row = document.createElement('row');

		row.appendChild(clone);

	// PIPE SEPARATOR FROM ARCHIVED DATE AND THE FILTER FORM
		var cell = document.createElement('td');
		cell.style.padding = "0 8px 0 8px";
		cell.appendChild(document.createTextNode('|'));
		row.appendChild(cell);

	// LABEL FOR THE FILTER FORM
		var cell = document.createElement('td');
		cell.style.padding = "0 8px 0 8px";
		var label = document.createElement('label');
		label.setAttribute('for', 'inp_threshold');
		label.setAttribute('class', 'small');
		label.appendChild(document.createTextNode('Порог показа: '));
		cell.appendChild(label);
		row.appendChild(cell);

	// INPUT THRESHOLD FIELD FOR THE FILTER FORM
		var cell = document.createElement('td');
		cell.style.padding = "0 8px 0 8px";
		input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('id', 'inp_threshold');
		input.setAttribute('size', 4);
		input.setAttribute('maxlength', 4);
		input.addEventListener('blur', refilter, false);
		cell.appendChild(input);
		row.appendChild(cell);

		cell = document.createElement('td');

	// SUBMIT BUTTON
		if (isFilter) {
			img.src = imgFilterDel;
		} else {
			img.src = imgFilterAdd;
		}
		img.style.cursor = 'pointer';
		img.addEventListener('click', filter, false);
		img.setAttribute("width", 16);
		img.setAttribute("height", 16);
		cell.appendChild(img);
		cell.style.padding = "0 8px 0 8px";
		row.appendChild(cell);

		tbody.appendChild(row);
		table.appendChild(tbody);

		cell = document.createElement('td');
		cell.appendChild(table);
		scell.parentNode.replaceChild(cell, scell);
		
		var cth = 0;
		for (var i=0; i<raitings.length; i++) {
			var raiting = parseInt(raitings[i].firstChild.innerHTML);
			cth = cth < raiting ? raiting : cth;
			if (raiting > pth) {
				sum += raiting;
				cnt++;
			}
	// ++
			var link = document.createElement('a');
			link.setAttribute('class', 'plus');
			link.setAttribute('onclick', 'votePost(this)');
			link.appendChild(document.createElement('em').appendChild(document.createTextNode('+')));
	//		link.addEventListener('click', process, false);
			raitings[i].parentNode.appendChild(link);
	// --
			link = document.createElement('a');
			link.setAttribute('class', 'minus');
			link.setAttribute('onclick', 'votePost(this)');
			link.appendChild(document.createElement('em').appendChild(document.createTextNode('—')));
	//		link.addEventListener('click', process, false);
			raitings[i].parentNode.appendChild(link);
		}

		th = Math.ceil(0.62*sum/cnt);
		input.value = th;
		img.title = "Спрятать всё что оценено ниже чем " + th;
	}

	if (isFilter) {
		isFilter = false;
	//	GM_log('Applying autofilter');
		filter();
	}
}
