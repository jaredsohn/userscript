// ==UserScript==
// @name           HDFilm Arama
// @namespace      http://userscripts.org/users/sadikeker
// @description    HDFilm
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*
// ==/UserScript==


function getImdbCode() {
	var adres=window.location.href;
	var ilk='imdb.com/title/';
	var imdbCode=adres.substring(adres.indexOf(ilk)+15);
	if(imdbCode.indexOf('/')>0)
	imdbCode=imdbCode.replace('/','');	
	return imdbCode;
}


function getTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	regexp = /\(.*\)/g;
	title = title.replace(regexp, "");
	return title;
}


var title = getTitle();

var imdbID = getImdbCode();


//HDFilm
unsafeWindow.$('<a>')
	.attr('href', 'http://www.hdfilm.com.tr/search.php?do=process&q=' + imdbID)
	.attr('target','_blank')
	.css({ marginRight: '.25em', position: 'relative', top: 3 })
	.append('<img src="data:image/x-icon;base64,R0lGODlhEAAQAPf/AB0SCRUVFQUFBQ4NDQYFAg8KBgMCAYuLi4qKio6Ojs2ZL+KsMXJIJY2NjSMjI42MjIaGhhMREF07HuixMZFqOomJiRITEh8fHwEBAYV7crWCLFFHPt6pMVJSUoyLi29vbzIgEI9pOuqzMbqHLbuPQYtlOYWFhQgICIyMi42OjRMTEouKitmkMHR0dI1nORMUE4GBgYWFhIODgumyMcaSLn9XL3xjT2xmW4p2VOawM5aKdMaykYmIiEIvE7+SNu+3MVtbW3+Af0ZGRYhlI823k4FYL+u0Mo9vNLiLLMykWiMaCohhNLGbb6R8KKeAM355dX19fVQ+F5iUjKediYF+ellDHJRvPpqQe+OtMdCfPrCmk+CqMa6jkrCiiMayj59/QqR7Kd2qOHdgOd+qMnt7e8OULreslCAXCruaXceZNomDf5x0JtyoOWRkZKiFSaB8SM23kUBAQMyePsOrgTY2NoBYL35WL7mtld6rNhsTCLOGKxoZGWlpaTw7O3RVHgECANWpS8Wqek84FklJSHNgUGxsay8vLuu0MyglH7SRUtOfMMecTlZRS8+pZKqSZ7irlWZQLGBgYNGlRNSmScCMLal/KNOjP8ecQ6uRX6SYgKGbkLSHLbSMPbaJKZSOgT8tHY57WMuwghgYGEUxFEw3F9CrZ007HZSRh5aSi3pRKmBIG4htO2dFKDgnEWhPJLCljUY+LlE4I72PLZ57SKF6LN2oM6+DLIeIh21bS3tiMnh4eMutenp6eXh4dyodEnlZHzAwMKuBKsKZUVVVVS4dD4eHh8+xgM6ygc+yguSvNNynNX9/f4qKiRQUE2pHK553JyYnJl5FGVI9GGdlYYJ8eKaDSb2XTYtnJIl2UaJ+ScGeZmZmZkNDQ+GsNKSKXICAgCsrKkMqFuStMRwcHIKCglpaWaB+PjQ0NM64lM+4lIFZL5Z/VX9WL7mtlnpaIN6rNz07Nzw5Nh0UCbOGKsuaMBsaGZVwPs2wfmlqaSYbCzw8PHRWHoyMjBISEgAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgD/ACwAAAAAEAAQAAAI7wAd9BtIsGBBBwP8KVzIkOGAfgwxNGQ4cKJFfxXzBBuCAcM1W63AbNKzhlQzC/6i/djnT564ToImzBAx45ArFX8qYcnnL4oRd79E+Bk1b4Ksfkq2jGnyjF4OaUiSncHQY0KZF6pqKcPzLkwaU2x8DDhRpRutek6yHMllbtIXMYBWXUDEyRIkWIuEweuzrhEoTKW84UCTJFE8bNoclZsWCJmOUMiM3dsV6EYHJnOu9PIEZ8cUdOmIeOlCpcWHTK9OFZNiRoumO+0ecUEFAQIMGfwO8Nu9G4WHAwgQrEBgIsaBAw0SKE+QosEDfg90VwgIACH5BAUyAP8ALAAAAwAQAAwAAAixAP8JFEhMAoODB8MZGPjPn0MJkhZIlOgGhL9+Ah0WUMeBgzUKIFMRuPgPg0kQ1ViwWAKg5UiSJg1IuKRITogQRQqUJEnAQIQ6CoIGtefr3wkBAfYMsPApGw0aVly4iPVvnKhmF8BBM8SKBCUSzjZs4BZHHx1g54QMYlRjxIg3uPDx2dYmEpBh/9oUIjRLgwZ2T74FWQaFjC6BvMhRs1OihA0ECJhV4HGLoUA1GTJYthwQADs%3D">')
	.appendTo('h1.header');
