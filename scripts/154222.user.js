// ==UserScript==
// @name           Vk.com likes & share counter
// @author		   Alex_ij
// @description    Shows a list of people who likes or shares some post on wall of group/page
// @include        htt*://vk.com/*
// @grant          none
// ==/UserScript==

// ********** ВРЕМЯ РАБОТЫ ******************* 
// "Понравилось"
// 5220 чел  -  2 мин 30 сек
// 1839 чел  -  36 сек

// "Поделились"
// 1022 чел  -  52 сек
//  336 чел  -  18 сек
// *******************************************

var likes = {
	targetElm: "XX_who_likes",
	wikiShow: function(pN) { showWiki({w: "likes\/wall" + pN}) },
	countElm: "like_count",
	getLinkFromWiki: function(pupilObj) { return pupilObj.getElementsByTagName("div")[1].getElementsByTagName("a")[0] }
}

var shares = {
	targetElm: "XX_who_shares",
	wikiShow: function(pN) { showWiki({w: "shares\/wall" + pN}) },
	countElm: "share_count",
	getLinkFromWiki: function(pupilObj) { return pupilObj.getElementsByTagName("div")[0].getElementsByTagName("div")[1].getElementsByTagName("div")[3].getElementsByTagName("a")[0] }
}
// добавляем ссылки для главного поста (пост группы) - если он есть
var mainPostCont = document.getElementById("wall_fixed")
if(mainPostCont != null)
{
	var mainPost = mainPostCont.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0]
	if(mainPost != null)
		addLinks(mainPost)
}

//т.к. при прокрутке догружаются записи на стене
setInterval(setLinks, 1500)

// добавляем ссылки на посты на стене
function setLinks() 
{
	var wallPosts = document.getElementById("page_wall_posts")
	if(wallPosts != null)
		for (i=1; i <= wallPosts.childNodes.length; i++)
			if(wallPosts.childNodes[i] != undefined)
				addLinks(wallPosts.childNodes[i])
}

function addLinks(post)
{
	var postID = post.id.substr(4)

	// проверяем, возможно для поста уже добавлены записи
	if(document.getElementById("XX_who_likes" + postID) == null)
	{
		//************************************* Кнопка "Лайкнули" ******************************************
		//кнопка вывода
		var v  = document.createElement("a")
		v.appendChild(document.createTextNode("Поставили лайк"))
		v.style.margin = "6px"; v.style.marginTop = "0px"; v.style.display = "block";
		v.onclick = handler(i, postID, likes)
		post.appendChild(v)
		
		//форма вывода
		var vt = document.createElement("div")
		vt.id = likes.targetElm + postID
		vt.style.display = "none"
		post.appendChild(vt)
		//***************************************************************************************************
		
		//************************************* Кнопка "Поделились" *****************************************
		//кнопка вывода
		var v2  = document.createElement("a")
		v2.appendChild(document.createTextNode("Поделились"))
		v2.style.margin = "6px"; v2.style.display = "block";
		v2.onclick = handler(i, postID, shares)
		post.appendChild(v2)

		//форма вывода
		var vt2 = document.createElement("div")
		vt2.id = shares.targetElm + postID
		vt2.style.display = "none"
		post.appendChild(vt2)
		//***************************************************************************************************	
	}
}

//************************************* Обработка списков ******************************************
// index   - порядковый номер поста
// postNum - номер поста на сайте вк
// type    - тип данных (лайки / поделились)
function handler(index, postNum, type){
	return function() 
	{
		//функция для обработки вики
		function parseWiki()
		{
			//создание массива ссылок
			var links = []
			var currLink = ""
			var wk = document.getElementById("wk_likes_rows")
			for(j = 0; j < wk.childNodes.length; j++)
			{
				progress("Обработка... " + (j + 1))
				
				currLink = (type.getLinkFromWiki(wk.childNodes[j])).href
				links[j] = currLink
			}
			
			var trueIdRegex = /id\d+/
			var linksId = []
			var linksWord = []	
			for(j = 0; j < links.length; j++)
			{
				currLink = links[j].substr(14)
				if(trueIdRegex.test(currLink))
					linksId.push(currLink)
				else
					linksWord.push(currLink)
			}			
			
			//закрываем вики
			document.getElementById("wk_close_link").onclick()
			
			var field = document.getElementById(type.targetElm + postNum)
			//выводим список (только страницы с номером)
			for(k = 0; k < linksId.length; k++)
			{	
				field.appendChild(document.createTextNode(linksId[k].substr(2))) 
				field.appendChild(document.createElement("br"))
			}
			field.appendChild(document.createElement("br"))
			
			// выводим список - короткие ссылки
			if(linksWord.length != 0)
				for(k = 0; k < linksWord.length; k++)
				{
					//вывод коротких ссылок вместе с общими результатами
					field.appendChild(document.createTextNode(linksWord[k])) 
					field.appendChild(document.createElement("br"))
				}
				
			var total = linksId.length + linksWord.length
			alert("Количество: " + total)
		}
		
		//полностью загружаем список
		function fillWiki()
		{
			progress("Запуск загрузки...")
			
			//создание списка ссылок для проверки количества (НЕПОЛНЫЙ, ТОЛЬКО ПРОВЕРКА)
			var wkT = document.getElementById("wk_likes_rows")
			for(j = ind; j < wkT.childNodes.length; j++)
				linksT[j] = type.getLinkFromWiki(wkT.childNodes[j])
			progress("Загрузка списка... " + j)
			ind = j
			
			if(linksT.length < likesCount)
			{
				//догружаем список
				WkView.likesMore()
				setTimeout(fillWiki, 500)			
			}
			else
				parseWiki()
		}
		
		function progress(str) 
		{ 			
			var pB = document.getElementById("wk_likes_title")
			if(pB != null) { pB.style.fontSize = "22pt"; pB.innerHTML = str }
		}
		
		//выводим кому понравилось
		var list = document.getElementById(type.targetElm + postNum)
		var likesCount = parseInt(document.getElementById(type.countElm + postNum).innerHTML)
		if(isNaN(likesCount))
			alert("Отметивших нет")
		else
		{
			if(list.style.display == "none")
			{
				list.style.display = "block"
				type.wikiShow(postNum)
				var linksT = []
				var ind = 0
				setTimeout(fillWiki, 3000)
			}
			else
			{
				list.innerHTML = ""
				list.style.display = "none"
			}
		}
	}
}
//*********************************************************************************************************************