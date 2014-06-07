// ==UserScript==
// @name       Bangumi增加搜索按钮
// @namespace  com.ruocaled.bangumi
// @version    0.2
// @description  增加搜索按钮
// @match      http://bgm.tv/*
// @match      http://bangumi.tv/*
// @match      http://chii.in/*
// @copyright  2012+, Ruocaled
// ==/UserScript==

// http://www.designdeck.co.uk/a/1231 Pace Icon set
var search_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3QzhEQzQ5MEUwMjI2ODExODcxRkFGRTJCNjkzN0QzRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMDMwQjVDNEIyNEUxMUUwOUNDNEM5MEQzRkJGRERGQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMDMwQjVDM0IyNEUxMUUwOUNDNEM5MEQzRkJGRERGQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhENThFOTQ5NDQyMDY4MTE4NzFGRTIxRUZFMUVBQjREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdDOERDNDkwRTAyMjY4MTE4NzFGQUZFMkI2OTM3RDNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+O58b6AAAA7NJREFUeNrsV11Ik1EY9tt0/qRL2pqupYbNsoLshxLEwqukoAslhSjQ8E4QRFHxKogKQuimBO0mJPFit4O88GaKkIs1Uy8MjZwz1sw5f+fc3Px6XvmOfI39z/KiDjyw73znfO/zvud53/eM43k+6TCHJOmQx38Ch04giUQYiCgGZ7PZ8l0u17XZ2dnURGzGQoBzOp13tre33+/u7rp50fD7/Qsg82p+fr6Q1h00AW5qaioPhkf4CIOIra2tPcYe6UER4MbHx4t8Pt93Poaxubk5gL3JCRNob2/P8ng80/CMZ1haWrL09fW9rKqqqsOS252dnS3Dw8M6rHMFrHsSKhLREpDa7fanOF+eAdEYzMzMrMC7C0ABoAHo3K9UV1c/XF5eXhCt9w4NDZ0LpomoCLS2tip3dnZW2QdB5otcLi/FKzWQIXhHaSwD5ESkubm5Dnt22B6Hw/EW8ynxEJCYzeb7OHueoa2t7QHmc0KcLXmZBpw2Go0DbA+Eu4i5rHAEQhWi5PT09PNsEZRt7erqMmJ+FfAFO1bAAzgMBoOe7ZNKpaqmpiZVPJUwWSaTadiH3G63HXPrgDdcdgHuiYmJGbGHZWVleeEqbqhUkaCwuJgeQCZN8DxSmfSXlJSkiDNpZmbGFa44hWLGo+r9YA8Q39mampr0aEp0ZWXl9X02yISenp6fYYmHEGFaR0dHBULvh5BITPzi4uKbcMWFBnSi2trammd7UJo/CsLlYs0CMnQS4RsBCZ7g9Xr9aDx3Q4UTYktdWVl5R4bZnv7+/ha8yo4nDclINj5avbGx4YFXPAEh9eH5NVJNIQ47PL2KSmgGSZ6ttVgsU3hXJKRnXJWQCkwBvHhOemSAob1Sizyfxe8xkHJQ0SGPxesaGxvvYb8imM6iJUBROAIUo/a/QC3woMnwDOQlMyqeZ8D6z729vepEu6FEKLPFDQ0NjyYnJz8EM0ZA1mzMzc19DSBo0ul0x8IR4IJdQDiOCySRIYRTVV5efqq+vr40B0OhUByH0W9Wq9WGrjimVCpTRkdHn2k0mst73UwqpW990uv1t2pra51iArFeyThBE0cpO4AzwEXgktAZC4UmlZ+bm3tjenravL6+zhPoiBANozgS8V7J9ts0kCroI1OIjkyIFHW+XLVaXR5IAhhmnTFRApHGHgmtVntTTII00d3drf0bBH4jYTKZDMgIP+6Vg6QhOs5YRZgICTr3E8KdgERopa4qtvknCbCSniGQoVbupq4akcA/9dfslwADAME5uGe8EbxyAAAAAElFTkSuQmCC';
var search_button = document.createElement('input');
search_button.type = 'submit';
search_button.value = '搜索';
search_button.style.width = '24px';
search_button.style.height = '24px';
search_button.style.border = 'none';
search_button.style.color = 'transparent';
search_button.style.cursor = 'pointer';
search_button.style.background = 'transparent url('+search_icon+') 0 0 no-repeat';
search_button.style.backgroundSize = '24px';
search_button.onmouseover = function(){
	search_button.style.backgroundPosition = '1px 1px';
}
search_button.onmouseout = function(){
	search_button.style.backgroundPosition = '0 0';
}
try
{
	document.getElementById('search_text').parentNode.appendChild(search_button);
}
catch(err)
{
	//silent output
}



