// ==UserScript==
// @name        TrollKiller
// @namespace   TKlr
// @include     *.livejournal.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     2.1
// @grant unsafeWindow
// ==/UserScript==

troll_book = ["alexdihes", "poll59", "uncle_casey", "vir77", 
"pianitca", "elder2041", "toly322", "den001", "little_heels", "sergey_spb_spb", 
"andru_ha_ha", "mitinvm", "ptunik1", "lugermaxotto", "diabloforyou", 
"lightduty", "mes_polq", "gimalaysky", "georg_pik", "alexnes", "zart_sic", "galoperidolov",
"ramtamtager", "alien_nostromo", "sarkazm_marazm", "niklosich", "royal_guardian", "tnodder",
"leffchik_voodoo", "goryachee_leto", "oleguss1", "niklosich", "a_hramov", "ledstorm"]

change_pic = true
trollpic = "http://ic.pics.livejournal.com/liduk/50586609/491/600.png"

ptrns = [type1, type2, type3]
get_com_img = null
waitForKeyElements("span.ljuser.i-ljuser", yep)
function type3(uns)
{
	var res = true
	var com_cont = getParent(uns, 6);
	if(!com_cont || com_cont.className != "ljcmt_full")
		res = false
	var cmt = com_cont.getElementsByTagName("div")[1]
	if(!cmt)
		res = false
	var img = com_cont.getElementsByTagName("img")[0]
	if(!img)
		res = false
	var res_ = 
	{
		comment : res ? cmt : null,
		picture : res ? img : null,
		appr : res
	}
	return res_
}

function type2(uns)
{
	var res = true
	var comHolder = getParent(uns, 11);
	if(!comHolder || comHolder.className != "commentHolder")
		res = false
	var td = getParent(uns, 3)
	var img = getChildImg(getChildA(getChildByClassName(td, "commentUserinfo-usericon")))
	if(!img)
		res = false
	var res_ = 
	{
		comment : res ? comHolder.getElementsByClassName("commentText")[0] : null,
		picture : res ? img : null,
		appr : res
	}
	return res_
}

function type1(uns)
{
	var res = true
	var header = getParent(uns, 4)
	if(!header || header.className !="b-leaf-header" || !getChildByClassName(header.parentNode, "b-leaf-article"))
		res = false
	var blu = getChildByClassName(header, "b-leaf-userpic")
	var blui = getChildByClassName(blu, "b-leaf-userpic-inner")
	var bluic = getChildImg(blui)
	if(!bluic)
		res = false
	var res_ = 
	{
		comment : res ? getChildByClassName(getParent(uns, 5), "b-leaf-article") : null, 
		picture : res ? bluic : null,
		appr : res
	}
	return res_
}

function istroll(el)
{
	return troll_book.indexOf(el.getAttribute("lj:user")) != -1
}

function getParent(elem, lvl)
{
	var res = elem
	for(var i = 0; res && i < lvl; i++)
		res = res.parentNode
	return res
}

function yep(uns_)
{
	console.log("1")
	var uns = uns_[0]
	if(!istroll(uns))
		return
	if (!get_com_img)
		for(var x = 0; ptrns[x]; x++)
			if(ptrns[x](uns).appr)
			{
				get_com_img = ptrns[x];
				break;
			}
	if(!get_com_img)
		return
	res = get_com_img(uns)
	if(!res.appr)
		return
	if(res.comment)
		cover(res.comment)
	if(change_pic && res.picture)
	  	img_replace(res.picture)
}

function img_replace(img_element)
{
	if(!img_element || img_element.nodeName != "IMG")
		return
	img_element.src = trollpic;
	img_element.style.width = "100px"
	img_element.style.height = "100px"
}

function cover(el)
{
	var txt = '<div class="myspoiler">'
	txt += '<button type="button" onClick="toggler(this)">Показать</button>'
	txt += '<div class="hideabletext" style="display:none">'
	txt += el.innerHTML
	txt += '</div></div>'
	el.innerHTML = txt
}


function getChildByClassName(element, clname)
{
	if(!element)
		return null;
	var children = element.childNodes;
	for (var i = 0; children[i]; i++)
		if (children[i].nodeType == 1 && children[i].className == clname)
			return children[i]
	return null
}

function getChildImg(element)
{
	if(!element)
		return null;
	var children = element.childNodes;
	for (var i = 0; children[i]; i++)
		if(children[i].nodeType == 1 && children[i].nodeName == "IMG")
			return children[i]
	return null
}

function getChildA(element)
{
	if(!element)
		return null;
	var children = element.childNodes;
	for (var i = 0; children[i]; i++)
		if(children[i].nodeType == 1 && children[i].nodeName == "A")
			return children[i]
	return null
}

this.content.document.defaultView.wrappedJSObject.toggler = function(btn)
{
	var ht = getChildByClassName(btn.parentNode, 'hideabletext')
	if(ht == null)
		return
	if(ht.style.display == 'none')
	{
		ht.style.display = 'block';
		btn.innerHTML = "Скрыть";
	}
	else
	{
		ht.style.display = 'none';
		btn.innerHTML = "Показать";
	}
}