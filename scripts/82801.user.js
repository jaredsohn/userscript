// ==UserScript==
// @name           Ikariam smileys
// @namespace      ikariam-emotion
// @description    İkariam Mesaj Modülü v.1.2 farklı bir bakış açısı ekleyelim ve Ikariam Smileys V.1.1 yaptık :)
// @version        0.2
// @include        http://*.ikariam.*/*
// ==/UserScript==

var smilies = new Array();
smilies[0] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArVJREFUeNpkk1tIFGEUx387ey1QXHNruymhCT1FFyvLKFIqKOpBeogiym4PCeGDBFmYhEEERaAPWxp0Q+gCBhFsJBXdoIuhEUW5lpJo7bquZrbuNrOdb7fBrQ4zzHzn+///c+Z/vmPhn3h8mEZDpyJh4CIhCYtcGlHNyoWSExxIxyYSCbWdiidHWavH8BeUbWH6oo3g9oIhCppAhgbof3WbrnvXsTpYt+I4d/8SEPI2TePKkv1n0LwZ8klJJ+KgG2DVZG1XaIyB7zz3VWEYKRElYFMCRlyR62i9dI2XD14I2EI0qnPaX01V6SmcLiua1ULR6iI27azjma/Wn/o50X9cQ2PesrIi9+yftHWuonj7fvpDw9Sf3wGjr1m7YztZhYsJRApITC5m6cK34omX8vzuqblrjt3RpJzdOfnz0UMt7Du0ixvn7tEXnEWvswbCb+h1HaHJFyb8zcne6gr0YAsKr3iqAps47bQ5bMSD4Og5TMPFpqSpsYif8ZEvzBjz47vqS+aMz3uI/RBSjvy58FICaiM6jD4OP7ubIdA80SbVwvb1xM2E5U9bBW+GTRluxCIYv8zekmz/v5Hk/mm6wpvvmnwlFpU+J3QXne0Cks5ZdNlRgvHUU61VvkP2FS6JF15SIDRK62DPR3F2Nh43PLwPoX7hRSfEgrJ++ghmeUniFF7xzMpypZU9BQvycdqH6Pscpr0DxqKmETDJBSuXy+H0ZDP+y03X6wAl9eTJQepVJva+7OGoZgscn1PoYfpMNxs8I6rWNDOtchgzif6w8ulDgLb3VCqeWYGK7LpytpbOoyFnmoOsLDt2+4SBcfEiEokT+hqj7R2VtTe5LOmRv4ZJIlPuuTcPcsiTwWaZIYc5jTJTseB3bpWf5aRkPiryf9OYFrlyT1EGp+XETgbNstPH+bcAAwDqTx9DvZUusgAAAABJRU5ErkJggg%3D%3D';
smilies[1] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtZJREFUeNpkk21IFFEUhp+d3dYtU7I0tyL9kQVREBQrlZGRpkSikARFIlGEVEL0Q4o+MJGCCJIif0RkUP2xEiz6QLHow5A+xELBQMvKajcyF3Xddsfdmc6d1dC6zOXOOed93znnnjk2/lmtR6k1ouw2DVyY4rDJoxHS7NStO82ByVjTNFU4tl6cIC+q05SRu415qwogyQ2GKGgC8fvwtt+jt+UWdif5WdU0TxEQ8k5N40ZmWQ2aO0E+KW5zDKIG2DWxpyk0hm+EV5cOYRgxESXgUALGmCJX0XjtJm+evBawjVAoyrmmCg7lnCXOZUez2/Bs8FC4q4q2S5VNseJEv/UYtemrcz1Jab953JnN2pIyfAPDnLpcCoEO8kpLSFri4cPQEohfQ+bKLrkTN8WLPs5N23jygSbp7EnJWAGD9eyv2Evj1Wd4B9Ppdx0TXxf9049Td2WIYX88+ySOvx6FVzyVgcNmEud0OXh+xyDQvJnCvHIWrdrCvGAL+shXFvxu4UhlNb1v7vOwJp+ZGGQVOVA8S0DKJRIcItMj9TheSf2lRL+D3k+six2bSLXD/IVipMm9RmJ4c7x/mrrwaHiISBju3oZ3byEo74ZcvOGMncpWfhVXOIW3jQs45Ct6yO912iMusteHaGuHOfW5mHEGvuanuPOysYU1vNktEhfymAvd71XZ6VYGAwEaBz73SK4LsUnb12VBuL+biLebhOWp1qls5VdxhVN4xbMEtl6g4kffN4IBFZ1NNAihdD8DvlHM+HjrHFs2aPlVXOEUXvEsAdlf2j9zoq/zA+Gg3JY5i5TtIQKhIJ9e9lnn7IKw5VdxhXv8nnLFY+JvUtJVxezIWcrFZLeTpGQHzhnWECFDhT4q7f8VkWx0HnVTXtnAdeEMTxkmWYmyFzcc5HBKIkUyQ86JgMyU/nOYO8XnOSNmjyL/N42TlnSbOePl/dWQ/Wsi7cnj/EeAAQBuJUZ/HpqiqwAAAABJRU5ErkJggg%3D%3D';
smilies[2] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtpJREFUeNpkk1tIVFEUhr85Z2YcKy8ZZVfToqhIyC5YGT1EVg9BDxJRvmU3aCAfikAxqCiKKLKy20Mv+lCYohCIVkIxZRBGQWQho1ZGmpZOWurMnLNb+0wDWouzzubs8/9rr7X+tV38Y4ESKmyLvcrGh5INlzwGo4bJnQ1nOTweq5TSv2P2rIwtdpjGhZt3MmvVdkidqRHCFshgD19bHxB8VI3hZWveaZomBBByoWlStebAZYyZSTGSCkPUBtMAw4POxu4Z4uXtYiwrFkQHcOsAdoSq3H1nuHLyOl86v2BbNh6vh3M1fi7sr6Snux9DAs3NmoO/5AwtN0obY8WBO1BKxfy1+ZiTgizLNii+uktOtmBE/Gcnxy5tBJ+c4zWpv/jUwWXmbSFQ2lQh/MNuyaIoffEKntfe5HH9GA/rOgiP2pRX5mJFbEyPwZEdL/D6TAwpLWN2NctzD9HV0lTkBJDaEjwJJq0vhthVmMLK9SmoiCIc6kLZCstwcfnWbFweF6+ehwg0h8jZaOqeJDgl6Jf1ewD/QV1ViGh/SDcJW0v4V0YlLjKyYinkLInh4+aONXyACqloRhqkpbrwuBPwehPxiUeiY4xFRp11MAS93232Fw84QjkBRKjwyI9ub9aabWTuaWCK5DTZB1MkQVmIiA/L65eo+isKiVXbETyapwMY/cPUfesMkpf1mu6Go87sqKgjrWMylc633v90r4h181vReM2Ll5EhUqre+/NU311TPb6Yo4If3qgRFbOIeFf7W/WkfLXzX+M0XvPig/Sp9SNlhvvz6QWLp5I96x3B2jx6p+aTnJrO8FAf/Ghi2bwwVjSZjrbPNL/Hr3nEp0ks7VQBuzct5dr0dDepKUgjrdisCyISdTMwCP3fojS34T9RQ6Vwfk64TGLJ4otqjnB8ehI7RH5vXEaRNNw3RH1BOedlp12T/7uN4yxDfJpu8Lg9aTrf42mPv85/BBgAoT1JaMKxwuQAAAAASUVORK5CYII%3D';
smilies[3] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAr9JREFUeNpkU11IFFEU/mZ3dtzM9f8vSsulzAIjqSDZHsLIIoIeeogSXzJ6SSjoR0osTIgifDDyISJ7UCgjI18SpQRD60lKEC1tNVcT/1fXNd2Z2bmdM+OW1WHO3HvP+c53D+fcI+Ef6byBWiOMs8KAE4IMEn02rNjsqDtwBxfWYoUQ7Lbk4y0UQkdrVsEppOUdA+LSCWGY0ViYwOSnNxhubwRkHMmvRFuEwMabDxUokmWp9f2PPYh25wLxGqANAuo3a6Uz29nPOMIXRi42CcIaGvKKK7E9O4C756vQVf+MrKOA7jNXPrOd/YwjfOtvgs5y1GbuPwS7vRe7rg1gPMqDt819uHzwHhF4zZXP44oHuVcHTBzjOc4kMAyUpGzdDX32BTZKE3Al52AxvRjXu6iCcz0o6xQIpBfBlZqDTeQPE47xHMcEMlU6yqHYoQeAqLFyPHj6xEzNwBLUuSEkuYOorr1vVX2kBKGfgCPZDo4zCSTqg1AXYNOpXr46YLiOqssEloQ7XFahrHaaexFagLTaP5MAmh+PHgOpCUAiqSI7oDjWwalEQwuHEFKXoeohzM9LmJoDzl3y/yGgm9QV/5ji3ncUW860IEYG1juBGErQydykQfotqaSU5VDDcRCeM1TNIs4E8Xpq2AtP1meMtVwx0xcENDTrBnqV5pntvsYS5G/uBuM5LtLKTGqJmHyZIaaf28W76jzh/dojloUlGun3wV7RUbPX9DOO8RzHL5EShq97BBU2ebTKnZ2A3A198L7yYDLhMGLj0xBcnKZ2tmFnhoqwHouh/lG0f0Epx63W1pTE2ydxumAHHqakyYiPo1bJYWtYCKHpMvzzwMyUjvZ+lN5sQj3FBP4aJpJY0m1NF1GW4sIJmwQlMo2GgDq9iOaTNaDniUEO/m8a10gmaVJkTlaFn8VsJO214/xLgAEAIi4/dUpx5wsAAAAASUVORK5CYII%3D';
smilies[4] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsRJREFUeNpkk11IVFEQx3/33v0KtfxIrazMMqKXKEuiLAg0fYl6KIIQopIiUKieiixMpCAKoUjCh3ypp2IpQQ3LgsgoClMIKlitVgMl13LLr73Xvducu7thNezcnTNn5n9mzv+Mxj/SfZYmO8qRmI2PmDg0+enM6AYt2y5RPTc2Foup7bi8OEd5NELnyrJ9LN64Cz1jUXxDk5DxEYZ72ujvuofhoaKkgUd/AUhypVh3ig5fwbcwFXSVOCv/su11ie1W0dgjv3jdfArbjoMoAJcCiFrc2VRVjy9tSBY+sGyFD26dk+VX8c1zoRsaxTuK2X2onpfNdZ3x5sDVXUtT/uadzEv9JMsQ2Auc09QxWBaNbQ287ZukrT3EiFaI4e0jf0sZ3bVdTZJQ7ZLYqtw16+luvcn9uzMOcMyOMWvNcv32Or5m+Wm5VY3Pm8KFy0fh/UKyC0/x5VVXlQMglXrdHoPeVxNUHlxA0dZ0OV36jUaxwoMsmX7KmboGAm/aedhYQYpmU7LHhSZ5TgvqY02Oc/yYGHqYyGjYqV51IVSi9ZSSI93m5sl+XtwfnQoTS/Cnq6uIzoQxp+HZYznckrWZULFnRU2xI9NxtaTLaCTssOsACKA5/WNYEn1kZ0GrH0aG4qUJeRgSoCtShFXbxImbkXiV57QQmuDBWDCwP2fpMlbkBZzAjg6YmEgw6YGC/IQWCGDKMkLBACqPBJfLn9cSLNywCo/xQ3C/C+f8KTF5F+peNE8mpp1Bf+8A2y+SLw9pUL25wZ4g5z+/GyAyaWCTgTllEJEKlJqTqm9DLi2DiPhV3NOP1Ki8ZAVKMuv3cqB0LTeycjykp7txu0nOknpPjI9bjH0zefKBmjo/t8X9869hEpkvutp/gtPZaeyRMfAkEeRZmKO/aN17jcviCajk/6ZxjiwXzSI+UklRPIwly547zr8FGAAr1TRVoSlw5QAAAABJRU5ErkJggg%3D%3D';
smilies[5] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAq5JREFUeNpkk1tsTGEQx3/nnN21aAVL8bAqmkpIqHvSlCei9aAN4hZP6vZAUpFIhbQiIuFFEBJVlbpEeWiCt5XwgohoSQitFKtSt26vqG539+wxc3aXYrKT2W/m/5+Zb858Bv/Ig4OcdWzKnSR+HHEY8jOJGhYXlxxl13Cs4zgaTsnDKlY4cUL5xRvJWVQKo6eI1xa1YOAznU9u0xa6juGluOgIdzIJzDR5s2URKtpzkp/+IDdrr3KwbL1E3rtWz+rXuOK0WKaw28H9/TiFOw9z60aIV03PmVuYx8wF08lbPIM3j1/T0hzm+eMwsxbOpnRDMY/OVbP0GIbbgd45t3A5lq+VT5RSVFHP0w9TmFYwD3pfkDtnHjnzSxjKXSfxVYJrQfHK0+JmMsnWCXkF2F0N7KjcQmPtXT53B/k4qgqn/yUdo6u5WNtDb2QEO/aVY0caULzyNIFHJj3C4/MQj4Cv/QBnLl1w75boD2EPdBCMhqi5dt71Jd9vIzYgpAkelJdKoIFoP/YQDL6rwwzX4RWvx6v9ibaWkIhDPCE4Jz04wWfEY8gYk0N92PGUwxRi0zM4UQfRKPj9sHc7FMziD0bwRnoBTMcgFu37gpOQvRGAlYSay7IG0uCkQMrW1Kf8Glecixeem6DrBze72tvkX9C9RjKW+rbZUjnLl7J6Vr/GFad45bkJ1pxm39fwRwYHpIQ5noS0PTZLBioLqLNQq2f1a1xxilce6TF9aG6nKvziLbGfFrYzjk0rLUbKLAzJ6Rdbvjrl17ji7rWyW3m/N1Fk/OG1bFo2kzMTJ/sIBLyMlLvroGTZGJTq3T1xIl9i3G1h96FGrgjn21+PSWSMaH5jBZU52ZSZJr5MQJYm1vmdW2tPcVyObUr+7zUOk6migfT1fucQ7c60Pfw5/xJgACgUIR+c+CDRAAAAAElFTkSuQmCC';
smilies[6] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArNJREFUeNpkk1tIFGEUx387szeCSlcq09TCioyKLoSS1UMXewkipKR6604J+hJBEhFhFFF0s9tDL/YWhkIEWvlQawZlQT0UbNumZG612Zhd3NlmpvPttLHaYc7AnPmf/3fO/5zPwxgLH6LJttju2ARxJOCRR2NE07m+/Dj7s7GO46jfrnUdpso2aS9ds4mpS9ZDTr5CSLZAjDgDPbeJ3ruJ5mdd5TE6RhFI8jZd58bS3WfR8se7SY4Jv23QNdB8qGrs+DBPrtVjWS6JIvAqAjvFjfKdjZw/eon+WD+2ZePz+zjRUsupXc3E3yfQhGjajEJqDzXSfbmh3W0OvOEGmkoq1qKPizJ3vkb9hRo52YJf4t9iHDizEoJyjl+n7fSDNG56ZRXhho4myd/vlSp2TJm9kEe3rnC/Lcnd1reYIzbnmsuxUja6T6Nuw2P8QR1NWisuuMm88r286+7YkSaQ3gK+gE5P9zA1W3NYvGwijvRuGu+wRQJLJDh7tQCPED3rGiLcabBopa40CaRbUK/fPwz27ZGYx8BMGIgE6QGkhfO4rgnRgjLxOS4+Y14lhZ0covMO5BdAKIQIKFPMcQFqIJ/irmSDgxD/AKs2DpFZAK8cYv78OuCvqAjy7OkIL55DKjV6uRSJV2qdVggKJ3hVnJkmSHynNRGLbJ5SVMTiBRGWLHQTxppqyVFr4S3iYyyCyuPvLIsfNtA7c1Epfu2rtDOY3uCxpoBaIIRp5/LmeZQVjZTIIvWJNPT19HI49jJK8qeoq+VimzpWkn+uvlVc/Ve4ztfUqrwMsbLQ0Wq2rC7jYt5kvwjow+dubxqgNDGMFF8+mdx/Re2RFpol/G3UZRKbID6rpY6Dk8azQfPgzzDYDubnYdqqz3FSIhGV/N9tzLJi8TzVclZM5ONLpuzs6/xHgAEARVUbYg/cRp4AAAAASUVORK5CYII%3D';
smilies[7] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqxJREFUeNpkk1tIVFEUhr9zZhwHpbC0gShTGg0M0uwGYr1EpC8pJFlRD2VhDwn2IkWhUBHUW0VBZUpRZD0I2tsECWFRkRUYpjGaFzTLS45pNvfT2ufMmNXiLDb7X/9a699rn63xjz0/w3UjQoURxYkhgCafjl+z0bj1AscXcg3DUGHLXtSy0wjhyS7ah2tzCSQvFzQiboOfo4y9eYzX8xAtgaLC8zyJF9BjyQdsNjyFJy4z50ynpf4+Z0rLJTJgrmqvcBVXPNUs3thU0H4Ko+DYWVofefjY0cn6Ajc5G1fj3rKG3tef6H7bT+frftZuWkfJ3iJe3qhj20U0U4E6c0bBDmyOHr5QQmH1Hd4NLSczLx+mPpCRm49rQzGBjD0S3yW8bhRf5anmejTKkTR3HpGJJipPHqa5/imjk+mMJNViTHcxnFxHY/13psYTqaypIDLehOKrPFXALpNOtDvshMbBMXiaa3dvm2cL+jwEZ4ZZ8cvDzQe3TCw6cJTgT0lKs6PyrAIq4J8mEoC5zw1ofQ3WYLSYvy8mbE5cXIvBwo+bXRMkGvARCWFeuy57XbfWuIlcyw2rgC58LRa3S9Wg3/fVoYedUsGPJpran4G3F5OkOmdnwdZtwg4rFU6Er9QEzQITs7RMDHrLXSvTic55edcBKYvh0ME/Cro+wptXsD5XuielI3xUnnkLu69S861/hF+zolFfSrID1mRCQIYVmLVWtVe4iiue4qs8s4D40NtBavs/9AnZhjtrCeGAjYhfFMtgrdXCVVzx2nqoUnnzf6LY0nNl7N+ew7VUl4OUlAQSEoi/JUIyYJ8vxORYkLZuquqauSfwj78ek5icnOzmak4uW0Sp3IIjXkGmHxyfobXsCpcE8ark/17jAlslnho73vxNik/GZS98zr8FGADkBCPaDyrVMQAAAABJRU5ErkJggg%3D%3D';

function jsGet(type)
{
	if(location.href.match(type))
	{
		return location.href.split(type+'=')[1].split('&')[0];
	}
}

function inject_styles()
{
	var stl = document.createElement('style');
	stl.innerHTML = '.smill_w { padding: 3px; cursor: pointer;vertical-align:middle;}';
	document.getElementsByTagName('head')[0].appendChild(stl);
}

unsafeWindow.add_sml = function(id)
{
	var smil = id.replace('sm','');
	var txt = document.getElementById('text');
	var smilies = new Array();
	smilies[0] = ':)'; smilies[1] = ':p'; smilies[2] = ':D'; smilies[3] = '>:'; smilies[4] = ';)'; smilies[5] = ':o'; smilies[6] = ':|'; smilies[7] = ':('; 
	unsafeWindow.insertInPlace(txt,smilies[smil]);
}
unsafeWindow.insertInPlace = function(myField, myValue)
{
	myValue = ' '+myValue+' ';
	if (myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
		}
	else
	{
		myField.value += myValue;
	}
}
unsafeWindow.doAddTags = function(tag1,tag2,obj)
{
	textarea = document.getElementById(obj);
	var len = textarea.value.length;
	var start = textarea.selectionStart;
	var end = textarea.selectionEnd;
	var scrollTop = textarea.scrollTop;
	var scrollLeft = textarea.scrollLeft;
	var sel = textarea.value.substring(start, end);
	var rep = tag1 + sel + tag2;
	textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
	textarea.scrollTop = scrollTop;
	textarea.scrollLeft = scrollLeft;
}

if(jsGet('view')=='sendIKMessage')
{
	inject_styles()
	var textarea = document.getElementsByClassName('textfield')[0];
	var txt = document.getElementById('text');
	var smilct = document.createElement('span');
	smilct.setAttribute('id','smilies');

	var toolbar = document.createElement('div');
	toolbar.setAttribute('id','toolbar');
	toolbar.innerHTML = "<a class=\"button\" href=\"#\" name=\"btnBold\" title=\"Bold\" onClick=\"doAddTags('[b]','[/b]','text');\" style=\"margin:0px;\"><b>B</b></a><a class=\"button\" href=\"#\" name=\"btnItalic\" title=\"Italic\" onClick=\"doAddTags('[i]','[/i]','text');\" style=\"margin:0px;\"><i>I</i></a><a class=\"button\" href=\"#\" name=\"btnUnderline\" title=\"Underline\" onClick=\"doAddTags('[u]','[/u]','text');\" style=\"margin:0px;\"><u>U</u></a>";
	
	var tools = document.getElementById('mailSubject').nextSibling.nextSibling;
	tools.innerHTML = '';
	tools.appendChild(toolbar);
	toolbar.appendChild(smilct);
	
	var smajliji = document.getElementById('smilies');
	for(var i in smilies)
	{
		var img = document.createElement('img');
		img.setAttribute('src',smilies[i]);
		img.setAttribute('class','smill_w');
		img.setAttribute('id','sm'+i);
		img.setAttribute('onClick','add_sml(this.id);');
		smajliji.appendChild(img);
	}
	var br = document.getElementById('nr_chars_div').previousSibling.previousSibling;
	br.parentNode.removeChild(br);
	document.getElementsByClassName('centerButton')[0].getElementsByTagName('input')[0].style.margin = '0px';
}

if(jsGet('view')=='diplomacyAdvisor'||jsGet('view')=='diplomacyAdvisorOutBox')
{
	var allInputs = document.getElementById("deleteMessages").getElementsByTagName("input");
	for (var i=0; i<allInputs.length; i++) {
		 if (allInputs[i].getAttribute("type") == "checkbox")
		 {
			var id = allInputs[i].name.replace("deleteId[","").replace("]","");
			var msg = document.getElementById("tbl_mail"+id).childNodes[1].childNodes[1];
			msg.innerHTML = msg.innerHTML.replace('[b]','<b>').replace('[/b]','</b>').replace('[i]','<i>').replace('[/i]','</i>').replace('[u]','<u>').replace('[/u]','</u>').replace(/\:\)/g,' <img src="'+smilies[0]+'" /> ').replace(/\:p/gi,' <img src="'+smilies[1]+'" /> ').replace(/\:d/gi,' <img src="'+smilies[2]+'" /> ').replace(/\>\:/g,' <img src="'+smilies[3]+'" /> ').replace(/\&gt\;\:/g,' <img src="'+smilies[3]+'" /> ').replace(/\;\)/g,' <img src="'+smilies[4]+'" /> ').replace(/\:o/gi,' <img src="'+smilies[5]+'" /> ').replace(/\:\|/g,' <img src="'+smilies[6]+'" /> ').replace(/\:\(/g,' <img src="'+smilies[7]+'" /> ');
		 }
	}
}