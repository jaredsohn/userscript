// ==UserScript==
// @name           NicoFavSearch
// @description    お気に入りのサーチ結果に千早くアクセス
// @include        http://www.nicovideo.jp/*
// @exclude        http://www.nicovideo.jp/my*
// @comment        DnD実装（フォルダはまだ
// @version        0.11.7
// ==/UserScript==

(function(){

    var img_disable_addfavsearch = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFigAABYoBwNG8lwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANhSURBVDiNjVLPT2NVFP7uffe170F/2JKBFggwpYAKcWPFyI9pAtVB0pBMkIkJKxe6MCIr/wITV7pz4QYxQ9IYdcEsRCCZjAmiibOTKJmETqAGMiEG29DSvnfvuc+NJVg7CV9yFuecnO985wfzPA91rK+vfxgMBt8wTbOHc24QUYGIdrXWn2QyGY1rgHmeh5WVlbaOjo6vent7X/f7/X4iQt2klFStVn9kjL03MTHxZG1t7aNisfjZ0tJS0wYCANrb21eGhoayUkp9fHz8k1LqN8aYNE1zxLKsW6ZpThPRl6urq292dXW9K4R4CmCtGaExPDz8TiKRWPY8jx8eHn5xfn5+N5vNfp9IJDb7+vru5fN5MMZe01onhBCvxOPxUaUUHxgY+LoZIQ+FQlnbtq2Tk5Pdi4uLpfn5+f+Mkk6nPwbwQCnFhRCvEhECgcCtXC430JTQ5/P1EhGUUo8WFhaa7oUx9tBxHNi2HZJSwjTNSCgUev9ZO2whImitK/VgLpe7Y1lWmnMeNgwjLIQYZIyBMcallACAlpaWt7e3t18GUAJQYoyVtNZPBRH9SUQvmKZ5OYLnebuc8+VgMJi+2t11XTDG6m5MCBG7UnPEGFvmjuM8VkrBtu3pzc3NMQBYXFw8dV13plwur7uuCynlpTX6UkoQ0R8A7mYymfvG3NzcDud8zrKsmwCm8vl8a6FQeBIOh43W1tZW13XHpJSW1hp1q/+o1hpCiF99Pt+dqamp34F/H3tjY+Mt27Y/NQyjl4jged4ZAHJd94aUEpxz13Ec3/8OIIRqa2sbGx8ff3R5ZQCYnZ39znGc21LKh1rrv5RSUcdxbhiG8XckEvlFKVVpHFNKiWq1KohouvHKAICZmZnHAKZ2dnY6GWMZwzBabNveOjs7S1UqlW+ICIwxhEIh1Go1z3VdBgBSyuebEtYxOTl5AuBe3d/a2vqgVqshEAicxmKxytHR0U2/38+i0ahzenrql1IOXa3njYRN8FIsFtvq6em53dnZ+WJ/f/+DUqmEQqHg7+7uLpqm2X9wcBB9psJGRCKRz0dHR+9fCc0R0cbe3l56f3//ucHBwaNyuZwCsH0thQ1kSCaTF/F4PDsyMvIz5xzFYtFSSoWvrbAZkslkGcCMEOIHIcRKKpX6tp77Bx+CqhVJJjOGAAAAAElFTkSuQmCC"

    var img_enable_addfavsearch = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFigAABYoBwNG8lwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAM0SURBVDiNlZRdaNtVGMZ/5/z/+SdNuySta9eks+0cqVarQ1aYDFzBTqtQhDHRgoJMUETUiTgGgnM4EQYOvPDCi231A7wQQXejTBwTXO1YQcGPsVGYdpo0lNia0Xz8v87rRUjJXArzgZfD88J53ud9DhwlIjSw+NPzLxNLPYQd60dhIeYqJpjBhO+kh48abgJKRMh9v+cWldj8oe4eepBIPIoJqFeIhF6It/odop5LZ9+8kp+dOiDl4rG+3d+2HGADqETfCd137ySBZ2T5yjlC72eU9rGiIzjxXVjRcUxwMndu7yO6c8uz6EgB+KSlYH7umX06s22CoGZk6dIH4ldeymw/vjZ9cf7QG2j7dYy5XyX6vlDJzVkk3LueoCbeNYnTHpOVhRnxVq8TA0hn3zqCcAbja6zIDjEBRJO78uefyrYUVLYzgAkh8OYyoydbB6/VWfwaymlPEHpgO520pV5YJ0MdxwSAKTea+fNP7sGJj6HspNJWEm0PoTSgNIEHgIolphYvHtgOlICSQAmRgo3x/8QEw2JFmlaQGZS1X7Ulx+pc1Y/QazbTi470NogSs4CS/Rq/ellCH+V0jOd/fXUnQOa+T5cIag9LtfQlgct1FXpN5dbL+BdR6vH08NFTKnfh6Q61oXeWaGIEv/I7JjiOtj/CclxQU1JdOULopVpmiwI7dkFFok+kh97+o+5UhPwvrzymnPi76MgAJgCRZSCUoNZN6IG2PPyKs7Z6A1YkUB2bdqa3Hppbez+AzN3vfS6BO0HonkVMEeN3SVDrRtsrqqNnltAvE3jcsL5XtjFm/D+vXEfmrmOXgQcW5w9nsGO7lbbjymk/LatLo7ilzzAhKA1tneBXBL9Wtxu6d7QUbCCdPZwHPm7w/G+vvSheFWLJJZ3qL5vipS3KblN09LhyLRclcG9vvq9bh90cu9yjU/2n9cbshOocvFNvGjkj1WXk7/mo7rrtH2U5WwvF6a51Hd6A9p7304MHTzVogelHdSb8ylydHTO5H1MqvW2B2rVR4JubctgsBtC7cV9FpQYm9a07fkBbUC7GCN3k2kbNH+z/QaE4vUFKf32N5ZxIDx6cbvT/BcsDZgp0E4KLAAAAAElFTkSuQmCC"

    function filteredEach(base, cond, body) {
	var es = document.evaluate(cond, base, null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
	for ( var i = 0; i < es.snapshotLength; i++ ) {
	    body(es.snapshotItem(i))
	}
    }

    function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
    }
    
    addGlobalStyle("span.favsearch_open {"+
		   "color: #d9dfdf;" +
		   "cursor: pointer;" +
		   "text-decoration: underline;" +
		   "}" +
		   
		   "span.favsearch_open:hover {" +
		   "color: #e9efef;" +
		   "text-decoration: none;" +
		   "}" +
		   

		   ".favsearch_menu {" +
		   "background: transparent;" +
		   "z-index: 10000;" +
		   "padding: 0px;" +
		   "opacity: 0.9;" +
		   "margin: 0px;" +
		   "}" +

		   "#favsearch_menu_base{" +
		   "position: absolute;" +
		   "margin-top: 1px;" +
		   "margin-left: 0px;" +
		   "}" +

		   "#favsearch_menu_main {" +
		   "background: #090f0f;" +
		   "border: 2px solid #ffffff;" +
		   "padding: 2px;" +
		   "margin-top: 0px;" +
		   "margin-left: 0px;" +
		   "-khtml-user-drag: element;" +
		   "}" +

		   ".favsearch_item, .favsearch_sub_item {" +
		   "cursor: pointer;" +
		   "color: #c9cfcf;" +
		   "white-space: nowrap;" +
		   "padding: 0px 1px;" +
		   "margin: 1px;" +
		   "border: 2px solid transparent;" +
		   "}" +

		   ".favsearch_sub_item {" +
		   "padding: 0px 1px;" +
		   "margin: 1px;" +
		   "}" +

		   ".favsearch_item_icon, .favsearch_open_item_icon, " +
		   ".favsearch_sub_item_icon {" +
		   "display: inline;" +
		   "}" +

		   ".favsearch_open_sub {" +
		   "font-weight: bold;" + 
		   "}" +

		   ".favsearch_open_sub, .favsearch_item_elem, " +
		   ".favsearch_sub_item_elem  {" +
		   "display: block;" +
		   "padding: 0px;" +
		   "text-decoration: none !important;" +
		   "}"+

		   ".favsearch_open_sub:hover {" +
		   "border-right-color: #e99;" +
		   "border-left-color: #e99;" +
		   "background-color: #292f2f;" +
		   "color: #e9efef !important;" +
		   "}" +

		   ".favsearch_item:hover, .favsearch_sub_item:hover {" +
		   "background-color: #292f2f;" +
		   "border-right-color: #9e9;" +
		   "border-left-color: #9e9;" +
		   "color: #e9efef !important;" +
		   "}" +
		   
		   ".favsearch_menu .favsearch_sub_menu {" +
		   "background: #191f1f;" +
		   "position: absolute;" +
		   "z-index: 10001;" +
		   "border: 2px solid #ffffff;" +
		   "left: 56px;" +
		   "margin-top: 0px;" +
		   "margin-right: 0px;" +
		   "padding: 2px;" +
		   "-khtml-user-drag: element;" +
		   "}" +
		   


		   ".favsearch_tab_box {" +
		   "position: absolute;" +
		   "padding: 0px;" +
		   "margin: 0px;" +
		   "text-align: right;" +
		   "z-index: 10001;" +
		   "right: 100%;" +
		   "top: 0%;" +
		   "}" +

		   ".favsearch_tab {" +	
		   "display: block;" +
		   "cursor: pointer;" +
		   "white-space: nowrap;" +
		   "padding: 1px 1px 1px 2px;" +
		   "border: 1px solid #fff;" +
		   "-moz-border-radius: 5px 0px 0px 5px;" +
		   "-o-border-radius: 5px 0px 0px 5px;" +
		   "-webkit-border-radius: 5px 0px 0px 5px;" +
		   "border-radius: 5px 0px 0px 5px;" +
		   "}" +

		   ".favsearch_tab:hover {" +
		   "padding-right: 5px;" +
		   "}" +

		   "#favsearch_tab_delete {" +
		   "background: #210;" +
		   "color: #e60;" +
		   "border-color: #e60;" +
		   "}" +

		   "#favsearch_tab_normal {" +
		   "background: #021;" +
		   "color: #0e8;" +
		   "border-color: #0e8;" +
		   "}" +

		   "menu {" +
		   "list-style-type: none;" +
		   "}" +



		   ".fav_search_add_btn {" +
		   "padding: 2px;" +
		   "border: 1px solid transparent;" +
		   "}" +

		   "#favsearch_add_btn_enabled {" +
		   "-moz-border-radius: 3px;" +
		   "-o-border-radius: 3px;" +
		   "-webkit-border-radius: 3px;" +
		   "border-radius: 3px;" +
		   "}" +

		   "#favsearch_add_btn_enabled:hover {" +
		   "background: #ffe;" +
		   "}" +
		  "");

    var dataSeq = {seq:[]}

    // ========================= list section =========================

    var favs = []
    function addFavSub(_elem,_block) {
	favs.push({elem:_elem,block:_block})
    }
    function show(elem) { elem.style.display = '' }
    function hide(elem) { elem.style.display = 'none' }
    function hideAll(elems) { elems.forEach(function(e){hide(e)}) }

    function hrefSuffix(item) {
	var suffix = ""
	if (item.sort && item.sort != "") {
	    suffix = "?sort=" + item.sort
	    if (item.order && item.order != "") {
		suffix += "&order=" + otem.order
	    }
	}
	return suffix
    }

    var mainMenu = null
    var allItemIcon = []

    function toDeleteMode() {
	allItemIcon.forEach(function(i){
	    if (i.id.indexOf("item_icon_remove") != -1) {
		i.parentNode.style.display = ''
	    } else {
		i.parentNode.style.display = 'none'
	    }
	})
    }

    function toSelectMode() {
	allItemIcon.forEach(function(i){
	    if (i.id.indexOf("item_icon_remove") != -1) {
		i.parentNode.style.display = 'none'
	    } else {
		i.parentNode.style.display = ''
	    }
	})
    }

    var dropTarget = null
    function dragoverStyle(li) {
	li.style.borderTop = "2px solid #fff"
	dropTarget = li
    }
    function dragoutStyle(li) {
	li.style.borderTop = ""
    }
    function dragendStyle() {
	if (dropTarget) dragoutStyle(dropTarget)
	dropTarget = null
    }

    function mkQuickLink(e) { return mkQuickLinkT("favsearch", e) } 

    function itemDelete(classBase, li, e) { // <span <img(delete)><text> >
	var span = document.createElement('span')
	span.className = classBase + "_item_elem"
	span.style.display = 'none'
	var del_img = document.createElement('img')
	del_img.className = classBase + "_item_icon"
	del_img.id = classBase + "_item_icon_remove"
	del_img.alt = "×・"
	del_img.addEventListener('click', function(evn){
	    remove(e.url)
	    li.style.display = "none"
	},false)
	allItemIcon.push(del_img)
	span.insertBefore(del_img, null)
	span.insertBefore(document.createTextNode(" " + e.name), null)
	return span
    }

    var atag = null
    function itemSelect(classBase, li, e) { // <a <img(select)><text> >
	var a = document.createElement('a')
	a.className = classBase + "_item_elem"
	a.href = e.url + hrefSuffix(e)
	a.draggable = "true"
	var sel_img = document.createElement('img')
	sel_img.className = classBase + "_item_icon"
	sel_img.id = classBase + "_item_icon_link"
	sel_img.alt = "<・"
	a.addEventListener('dragover', function(evn){ evn.preventDefault() },false)
	a.addEventListener('dragenter', function(evn){
	    evn.preventDefault()
	    dragoverStyle(li)
	},false)
	a.addEventListener('dragleave', function(evn){
	    evn.preventDefault()
	    dragoutStyle(li)
	},false)
	a.addEventListener('drop', function(evn){
	    evn.preventDefault()
	    var url = evn.dataTransfer.getData("text")
	    if (atag) { li.parentNode.insertBefore(atag,li); atag = null }
	    var item = deleteItemByUrl(url)
	    var r = replace(item, getIndexByUrl(e.url))
	    if (!r) { dataSeq.seq.push(item) /* 応急処置 */ }
	},false)
	a.addEventListener('dragstart', function(evn){
	    evn.dataTransfer.setData("text", e.url)
	    atag = li
	},false)
	a.addEventListener('dragend', function(evn){ dragendStyle() },false)
	allItemIcon.push(sel_img)
	a.insertBefore(sel_img, null)
	a.insertBefore(document.createTextNode(" " + e.name), null)

	return a
    }
   
    function mkQuickLinkT(classBase, e) { // <li <span><a> > 
	var li = document.createElement('li')
	li.className = classBase + "_item"
	li.insertBefore(itemDelete(classBase, li, e), null)
	li.insertBefore(itemSelect(classBase, li, e), null)
	return li
    }

    function mkList(seq) {
	var node = document.createElement('menu')
	node.className = "favsearch_menu"
	node.id = "favsearch_menu_main"
	seq.forEach(function(e){
	    var ne = document.createElement('li')
	    ne.className = 'favsearch_item'
	    if (e.url) {
		ne = mkQuickLink(e)
	    } else if (e.seq) {
		var spe = document.createElement('span')
		spe.className = 'favsearch_open_sub'
		spe.id = "favsearch_sub_index_" + favs.length
		spe.innerHTML = "<span class='favsearch_open_item_icon' id='" + spe.id + "'>&gt;・</span>&nbsp;" + e.name
		var child = mkSubList(e.seq)
		ne.insertBefore(spe, null)
		addFavSub(spe, child)
		node.insertBefore(child, null)
		spe.addEventListener('dragenter', function(evn){
		    show(child)
		},false)
		spe.addEventListener('dragleave', function(evn){
		    if (evn.target.className.indexOf("favsearch_sub") == -1) {
			hide(child)
		    }
		},false)
	    }
	    node.insertBefore(ne, null)
	})
	return node
    }
    
    function mkSubList(seq) {
	var node = document.createElement('menu')
	node.className = "favsearch_sub_menu"
	node.style.display = 'none'
	seq.forEach(function(e){
	    node.insertBefore(mkQuickLinkT("favsearch_sub", e), null)
	})
	return node
    }
    
    function tabList() {
	var node = document.createElement('menu')
	node.className = "favsearch_tab_box"
	var sel = document.createElement('command')
	sel.label = "toSelectMode"
	sel.className = "favsearch_tab"
	sel.id = "favsearch_tab_normal"
	sel.innerHTML = "sel"
	sel.addEventListener('click', function(e){
	    toSelectMode()
	},false)
	var del = document.createElement('command')
	del.label = "toDeleteMode"
	del.className = "favsearch_tab"
	del.id = "favsearch_tab_delete"
	del.innerHTML = "del"
	del.addEventListener('click', function(e){
	    toDeleteMode()
	},false)
	node.insertBefore(sel, null)
	node.insertBefore(del, null)
	return node
    }

    var allBlock = null
    var allSubBlock = null
    function mouseout(evn) {
	if ( !evn.relatedTarget ) {return}
	if ( evn.relatedTarget.className.indexOf("favsearch") == -1 ) {
	    hideAll(allBlock)
	    toSelectMode()
	} else if ( evn.relatedTarget.className.indexOf("favsearch_sub") == -1 ) {
	    hideAll(allSubBlock)
	}
    }

    function mouseover(evn) {
	if (evn.target.className.indexOf("favsearch_open") != -1) {
	    for (var i = 0, l = favs.length; i < l; i++) {
		if (favs[i].elem.id == evn.target.id) {
		    show(favs[i].block)
		    break
		}
	    } 
	}
    }
    
    function addFSBlock() {
//	filteredEach(document, "//table[@class='headmenu']/tr/td"
	var e = document.getElementById("menu_switch").parentNode.firstChild
	if (!e) { return }
	var ne = document.createElement('td')
	ne.setAttribute("nowrap","")
	var ce = document.createElement('span')
	ce.className = "favsearch_open"
	ce.id = "favsearch_index_inf"
	ce.title = "お気に入りの検索パターンに手早くアクセスします"
	ce.innerHTML = "FavSearch"
	ne.insertBefore(ce, null)
	var n = mkList(dataSeq.seq)
	var menu_tab = tabList()
	var menu = document.createElement('div')
	mainMenu = n
	menu.id = "favsearch_menu_base"
	menu.className = "favsearch_menu"
	menu.style.display = 'none'
	menu.insertBefore(n, null)
	menu.insertBefore(menu_tab, null)
	allSubBlock = favs.map(function(e){return e.block})
	addFavSub(ce, menu)
	allBlock = favs.map(function(e){return e.block})
	ne.insertBefore(menu, null)
	ne.addEventListener('mouseover', function(evn){mouseover(evn)}, false)
	ne.addEventListener('mouseout', function(evn){mouseout(evn)}, false)
	e.parentNode.insertBefore(ne, e)
    }



    // ========================= list managerment section =========================
    
    function getQueryValue(atoms, extractor) {
	var e = null
	for (var i = 0; !e && i < atoms.length; i++) {
	    var m = extractor.exec(atoms[i])
	    if (m && m.length >= 2) {
		e = m[1]
	    }
	}
	return ((e) ? (e) : (""))
    }

    var urlItem = null

    function findFirstItem(seq, func) {
	var r = null
	for ( var i = 0, l = seq.length; !r && i < l; i++ ) {
	    r = func(seq, i)
	}
	return r
    }

    function finderBy(item, func) {
	if (item && item.seq) {
	    return findFirstItem(item.seq, function(a,i){
		return finderBy(a[i], func)
	    })
	} 
	return func(item)
    }
    
    function findItemByUrl(url) {
	return findFirstItem(dataSeq.seq, function(arr, index){
	    return finderBy(arr[index],function(i){
		if (i.url && i.url == url) {return i} else {return null} })
	})
    }
    function getIndexByUrl(url) {
	return findFirstItem(dataSeq.seq, function(arr, index){
	    if (arr[index].seq) {
		return findFirstItem(arr[index].seq, function(a,i){
		    if (a[i].url && a[i].url == url) { return [index,i] }
		    else { return null }
		})
	    } else if (arr[index].url && arr[index].url == url) {
		return [index]
	    } else {
		return null
	    }
	})
    }
    function deleteItemByUrl(url) {
	var indexSet = getIndexByUrl(url)
	var set = null
	if ( indexSet.length == 1 ) {
	    set = dataSeq.seq.splice(indexSet[0], 1)
	} else if (indexSet.length == 2 ) {
	    set = dataSeq.seq[indexSet[0]].seq.splice(indexSet[1], 1)
	}
	return (set) ? (set[0]) : (null)
    }

    function replace(item, indexSet) {
	if (!item) { console.log("item is null"); return false }
	if (!indexSet) { console.log("indexSet is null"); return false }
	if (indexSet.length == 1) {
	    dataSeq.seq.splice(indexSet[0], 0,item)
	} else if (indexSet.length == 2) {
	    dataSeq.seq[indexSet[0]].seq.splice(indexSet[1], 0, item)
	}
	save()
	return true
    }

    function add(_url,_sort,_order,_name) {
	if (urlItem) { console.log("Item already exists: " + urlItem.name); return }
	var data = {url:_url,sort:_sort,order:_order,name:_name}
	dataSeq.seq.push(data)
	save()
	urlItem = data
	updateAddBtn(urlItem)
	if (mainMenu) {
	    if (lastAddedItem) {
		lastAddedItem.style.display = ''
	    } else {
		lastAddedItem = mkQuickLink(data)
		mainMenu.insertBefore(lastAddedItem, null)
	    }
	}
    }

    function remove(url) {
	var item = deleteItemByUrl(url)
	if (!item){
	    console.log("[failure] remove :" + url)
	} else {
	    save()
	    if (urlItem && urlItem.url == url) {
		urlItem = null
		updateAddBtn(null)
	    }
	}
    }



    // ========================= add AddButton section =========================

    var addBtn = null
    var addBtnActive = null
    var addBtnInactive = null

    function updateAddBtn(cond) {
	if (!addBtn) { return }
	if (!cond) {
	    addBtnInactive.style.display = 'none'
	    addBtnActive.style.display = ''
	} else {
	    addBtnInactive.style.display = ''
	    addBtnActive.style.display = 'none'
	}
    }

    function addAddBtn() {
	var loc = /.*www\.nicovideo\.jp\/(tag\/[^\/]+)/.exec(document.location.href)
	if (!loc || loc.length < 2) { return }
	var e = document.getElementById("search_words")
	var ne = document.createElement('span')
	addBtnInactive = document.createElement('img')
	addBtnInactive.className = "fav_search_add_btn"
	addBtnInactive.id = "favsearch_add_btn_disabled"
	addBtnInactive.src = img_disable_addfavsearch
	addBtnInactive.alt = "NicoFavSearch"
	addBtnInactive.title = "この検索パターンは既に NicoFavSearch に登録されています"
	addBtnActive = document.createElement('img')
	addBtnActive.className = "fav_search_add_btn"
	addBtnActive.id = "favsearch_add_btn_enabled"
	addBtnActive.src = img_enable_addfavsearch
	addBtnActive.alt = "add to NicoFavSearch"
	addBtnActive.title = "NicoFavSearch にこの検索パターンを追加します"
	ne.insertBefore(addBtnInactive, null)
	ne.insertBefore(addBtnActive, null)
	var atoms = loc[1].split(/[?&]/)
	urlItem = findItemByUrl(atoms[0])
	addBtn = ne
	updateAddBtn(urlItem)
	var url = atoms.shift()
	ne.addEventListener('click', function(evn){
	    var text = e.textContent
	    if (atoms.length == 0) {
		add(url, "", "", text)
	    } else {
		var sort = getQueryValue(atoms, /sort=(.+)/)
		var order = getQueryValue(atoms, /order=(.+)/)
		add(url, sort, order, text)
	    }
	}, false)
	var pe = e.parentNode
	pe.parentNode.insertBefore(ne, pe.nextSibling)
    }
    
    var lastAddedItem = null

    // ========================= main section =========================

    function save() {
	window.localStorage.setItem("userscript_nicofavsearch", JSON.stringify(dataSeq))
	console.log("data saved")
    }

    function load() {
	var t = JSON.parse(window.localStorage.getItem("userscript_nicofavsearch"))
	if (t && t.seq) {dataSeq = t; console.log("data loaded")}
    }

    load()
    addFSBlock()
    addAddBtn()
    save()

})();