// ==UserScript==
// @name           kinonetbynetru_imdb_rating
// @namespace      
// @description    adds imdb rating to kino.netbynet.ru pages
// @include        http://kino.netbynet.ru/*

// ==/UserScript==

v=0;
t="";
rating=0;
votes=0;
page=document.body.innerHTML;

//предварительный парсинг названий, годов, и элементов возле которых вставляем
titles=page.match(/<td class="main_title" height="40" width="50%"><b>(.{0,170})<\/td>/gi);
years=page.match(/<td class="info_right">\d{1,4}<\/td>/gi);
voters=page.match(/voter\d{1,4}(?=")/g);

//цикл по всем названиям
for ( i=0;i<titles.length;i++)
//i=0;
{
// вытаскиваем название фильма
ind_title=titles[i].indexOf('<br>');
if(ind_title==-1) {ind_title=titles[i].indexOf('<b>')+3;
                   t=titles[i].slice(ind_title,titles[i].indexOf('<',ind_title));}
else t=titles[i].slice(ind_title+5,titles[i].indexOf('</td>')-2);
// проверяем есть ли сохраненный рейтинг


if(add=GM_getValue(voters[i])) 
{
        v=document.getElementById(voters[i]);
        if (v) v.parentNode.insertBefore(document.createElement('b'), v).innerHTML+=add;

}

else
(function (k) {
// поиск по названию на imdb
GM_xmlhttpRequest({
      method: 'get',
      headers: 
      {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: "http://www.imdb.com/find?s=tt&q="+t+"&sourceid=greasemonkey",
      onload: function (node) 
      {	  
// берем первое название (без проверки на год)
        res=node.responseText;
        film_id = res.match(/tt\d{7}/);
        if(!film_id) 
{
 	  GM_setValue(voters[k], "ne naiden");
        v=document.getElementById(voters[k]);
        if (v) v.parentNode.insertBefore(document.createElement('b'), v).innerHTML+="ne naiden";
	  return;
}


// переходим на страницу фильма
(function (film_id) 
{GM_xmlhttpRequest(
{
      method: 'get',
      headers: 
      {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: "http://www.imdb.com/title/"+film_id,
      onload: function (node) 
      {
        
        res=node.responseText;
        //rating = res.slice(res.indexOf('<b>User Rating:</b>')+19,res.indexOf("</b>",res.indexOf('<b>User Rating:</b>')+19)+4);
        // парсим рейтинг
        rating = res.match(/<b>User Rating:<\/b>\s*<b>([^<]*)<\/b>\s*<small>\(<a href="ratings">([0-9,]{0,10}) votes<\/a>\)<\/small>/);
        //ind=res.lastIndexOf('<a href="ratings">')+18;
        votes='<font color="#FF0000">'+rating[2]+' votes</font>';
        go_link='<a href=http://imdb.com/title/'+film_id+'>go<\a>';
	  add="IMDB: "+rating[1]+" "+votes+" "+go_link;
        // записываем в память результат
	  GM_setValue(voters[k], add);
	  // добавляем элемент на страницу	  
	  v=document.getElementById(voters[k]);
        if (v) v.parentNode.insertBefore(document.createElement('b'), v).innerHTML+=add;
      }

      });})(film_id)


}
});
})(i)
}
