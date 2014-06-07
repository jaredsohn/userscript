// ==UserScript==
// @name			Farmville Türkiye - Toplu İstek Kabul Etme
// @namespace		Farmville Türkiye - Toplu İstek Kabul Etme
// @description		Farmville Türkiye Gelen Farmville, Fishville, Fishisle, Yoville, Cafe World, Castel Cage, Mobsters, Vampire, Friends, İsteklerini Toplu Olarak Otomatik Kabul Eder
// @require			http://code.jquery.com/jquery-latest.js
// @include			http://www.facebook.com/reqs.php*
// @version			1.0.4
// ==/UserScript==

function safeWrap(f) {
	return function() {
		setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
	};
}

unsafeWindow._getFishvilleGift = safeWrap(_getFishvilleGift);
unsafeWindow._getCafeGift = safeWrap(_getCafeGift);
unsafeWindow._getFarmVilleGift = safeWrap(_getFarmVilleGift);
unsafeWindow._getFishisleGift = safeWrap(_getFishisleGift);
unsafeWindow._getVampire = safeWrap(_getVampire);
unsafeWindow._getCage = safeWrap(_getCage);
unsafeWindow._getYoville = safeWrap(_getYoville);
unsafeWindow._acceptFriends = safeWrap(_acceptFriends);
unsafeWindow._acceptMobsters = safeWrap(_acceptMobsters);

(function(E){E.fn.drag=function(L,K,J){if(K){this.bind("dragstart",L)}if(J){this.bind("dragend",J)}return !L?this.trigger("drag"):this.bind("drag",K?K:L)};var A=E.event,B=A.special,F=B.drag={not:":input",distance:0,which:1,dragging:false,setup:function(J){J=E.extend({distance:F.distance,which:F.which,not:F.not},J||{});J.distance=I(J.distance);A.add(this,"mousedown",H,J);if(this.attachEvent){this.attachEvent("ondragstart",D)}},teardown:function(){A.remove(this,"mousedown",H);if(this===F.dragging){F.dragging=F.proxy=false}G(this,true);if(this.detachEvent){this.detachEvent("ondragstart",D)}}};B.dragstart=B.dragend={setup:function(){},teardown:function(){}};function H(L){var K=this,J,M=L.data||{};if(M.elem){K=L.dragTarget=M.elem;L.dragProxy=F.proxy||K;L.cursorOffsetX=M.pageX-M.left;L.cursorOffsetY=M.pageY-M.top;L.offsetX=L.pageX-L.cursorOffsetX;L.offsetY=L.pageY-L.cursorOffsetY}else{if(F.dragging||(M.which>0&&L.which!=M.which)||E(L.target).is(M.not)){return }}switch(L.type){case"mousedown":E.extend(M,E(K).offset(),{elem:K,target:L.target,pageX:L.pageX,pageY:L.pageY});A.add(document,"mousemove mouseup",H,M);G(K,false);F.dragging=null;return false;case !F.dragging&&"mousemove":if(I(L.pageX-M.pageX)+I(L.pageY-M.pageY)<M.distance){break}L.target=M.target;J=C(L,"dragstart",K);if(J!==false){F.dragging=K;F.proxy=L.dragProxy=E(J||K)[0]}case"mousemove":if(F.dragging){J=C(L,"drag",K);if(B.drop){B.drop.allowed=(J!==false);B.drop.handler(L)}if(J!==false){break}L.type="mouseup"}case"mouseup":A.remove(document,"mousemove mouseup",H);if(F.dragging){if(B.drop){B.drop.handler(L)}C(L,"dragend",K)}G(K,true);F.dragging=F.proxy=M.elem=false;break}return true}function C(M,K,L){M.type=K;var J=E.event.handle.call(L,M);return J===false?false:J||M.result}function I(J){return Math.pow(J,2)}function D(){return(F.dragging===false)}function G(K,J){if(!K){return }K.unselectable=J?"off":"on";K.onselectstart=function(){return J};if(K.style){K.style.MozUserSelect=J?"":"none"}}})(jQuery);
var _imgShow = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABPklEQVR42rVSQUrDUBB9CQZaSAVBcGNQ60ISpFDoXtJ1XQklm+7+LhSU7F14gR7AWSVZlJwkR8iqdwgJ9BMC46K2arS/EXFgmPn8eW8eMwO0s5N9H3oL8CmAu78QDFUEGhEJ0zRfPc/TiIiFEM34EgTBs23bX4CdTgdSygdEUcQHFCyqquKmZ1nGcRyzPpvNNAV4/PlR1zWklFiv1+j3+5BSQicilYLBfD5/VMnThRAqBReTyWQzyeHwZ4IDCuC67i4fjUbft/AejwFcArgCcAbgHMA1gIHjOLfbYuZNrzRN0e12EYYhoFAw9n2fy7LksizZcRy2bZvzPOc8z7mqKiYiPlLM4N6yrF1XZkaapgAAwzA+qpbLJf9m/1tfrVacJAlrAJAkCU+n0+YFPhHRYt"+
"9we70eiqK4Qdsj+jd7A1Zttuz+ZacaAAAAAElFTkSuQmCC";
var _imgHide = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH0wQXDDEsna+f8gAAAZFJREFUeJyNkz2LIkEQhp8udjAQNPCDBREzA8HgArNDGAwuOTAzM1+Mj/sHExoI/o5NNnHBRDA4mOBMznACuUBwnHZk8AwGvWDtxdVZmBeK6q6uKp4uuiGdHgH34j9IXfx34CVFo283+99yWbzMZjOiKOJ8Pt9Zr9djOBw+XccmkwnAlwfTqt1us1wuEZF3sywL3/dZrVZ0u93der1GKYWIUKvVAHi45hERNpsNSiksy8KyLDzPY7vdPjebTR0EAZVKhTiOUUrdNzCFpVIJEUFrjeM49Pv913K5jIiQz+cJggCRt9vLLYFS6t3CMCSXy1Gv10Nzdp33aQMzg9FoRKPR+GnbtjZxQ5"+
"pIcF3s+z7H4xHbtlcmlorgdDqhlGK32zGfz+l0Otpc6Zrg0yEWCgWq1SqO4zAYDH4Ui0VuZYgSCTKZDIvFAs/zaLVaf7XWhGHIfr8niiIOh0Mygeu6xHFMNpvF8zym0ynj8Vj7vv9huMa7rvtGfalvAH/uWO/f/q1+JQUfgRkJPy+tvgL/0ib/B3g1mB7EfHutAAAAAElFTkSuQmCC";
var _acceptAll = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiVJREFUeNpi/P//PwMlgIlUDS2ro4SAmJksAxqXh+WwMLK+/ff37x8g2wkkxkisF2oWBeZzsfNM8DKNZvj47S3D3gvrGf79++sJd0HZbG82XJqBcvksDGwT3I3CGN5/vs3AyvSLwUk3gOHv77/bwQYUTHGtA3J+gmggRjEIyM9nYWSb4GEazvDi/TWG919eA+n7DA9fXmH48eMnA/Mrnr0VwrziLSGOqQx/fv9yfPryvv7WY/M/eFsl3cnqsc1nZ+Gc4GMVzfD8/WWGL9/fM/z+84vh+evnDJdvXQaq/23LmNpq8T/MPZXh8ZsLDNIiWgzfv/9h2HVsDcOPX98qebj42v0d4xievLnI8P3XZ7CL3r5/z3Dv4SMGYNjZ"+
"zq05dYRZw1Lw572nV13YuZgZXn98xMAEjCBzHXeGT18+utibeDHcfXESGGhvGH4BbX7x+jXDnbsPGH4DbV7YcO4IPBZCStS7eHi4ShWUpRiYmJgYONh4GNRlzBnuPDvD8PXHR7DNH95/Znj88AXY5jU9N4/AwggejX458l3cPJylssriYEOQwcf3XxiePXwN1rxpysMjyHIo6cAjVbKLi5ezVFpJhIGRiREs9vn9V4YXD9+BNe+Y/fwIehRjJCSnOOFeLl6OIillIYYvH38wvHzwHqx536K3R7ClEawp0TaSr5edi63o1/ffIM0Oh5d/OogziYIMwIYtQzgNgJgZlzwMM1KanQECDABGPi0ENq7EYAAAAABJRU5ErkJggg%3D%3D";
var _loading = "data:application/octet-stream;base64,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%3D%3D";
var _imgLoadingRed = "data:application/octet-stream;base64,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";
var _ignoreAll = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAAHdElNRQfWBAUULRDsX0JHAAAA7ElEQVQoz72QMUvDUBSFv5qCg6PgLLhUMlToLDg4pdTxDM7S/APHtH8j/0DeKPqydPEHZHx0kKCQITo4SdWlPIeXlOoqeJbL5Tvcc7jwV0VhKIvzeN89tNvspDiOug2A69c7L69ZwPK3Xk+B7ITxfPCFYA7A/IoXOAyk355ITX7GBazgkpoFpAH0uhAl3J+zB6xYwNjYHxFgbGRr+uxSE9kObxk0WCdDPvy7H7JONPhl0JSlqCg+i7cKwVLTLYMyclFRwojTkgpBrmxTUr7FY2ND3RFHGEyv/WTcuEkDqbkBcI9x00wcpK7kP/QN44JSLNJT/ssAAAAASUVORK5CYII%3D";
var _imgClose = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yMi8wOXtixLEAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAAA9ElEQVQYlXWQvarCQBSEv82KG4NFIGJhETdB0uUR9v1fwMZCjCnsFgKB/QkEb3W9Sq7TDXycmTnCGPM8Ho9kWcY3ee+53W6s6romhMD5fCbGuACVUmitOZ1OJEop+r7/F5RSEmPkfr+zXq9JAKZpQkpJ27avOlprtNYAhBAAWP1emeeZx+NB0zR475FScrlcPpKSd2OtxVrLdrtlGAbmef4OF0VBURR0Xcd+v+dwOHzAq3ez2+24Xq+M44j3njzPARBC/MFKKWKMHx2dczjnAF"+
"6jkxgjVVWRpunidUIIsiyjLEumaUIYY55aazabzQJ+T+m6jh86CmFbC+aRtAAAAABJRU5ErkJggg%3D%3D";
var _imgCloseHover = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yMi8wOXtixLEAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAABC0lEQVQYlXWRMauCYBSGH6VFR4Wm0M3ZNWfHoL0lpb/Qb3Cr0TUUBH+AQ7/A2dlRPwiiTzfX7w4RN2/dd3vh4ZzDc7Ttdqv2+z2O46CUQinF3wghyLIM7Xq9qtvtRlmWPB6PD9C2beI4xrIsdMuyKIriK2iaJlJK8jx/wgDjOGKaJkmSsFqtAIiiiCiKALjf7wAsXlOmaaKqKo7HI33fYxgG5/N5tkl/L3VdU9c1nufRNA3TNP0PB0FAEARkWUYYhmw2mxm8eC/r9Zo0T"+
"Wnblq7r8H0fAE3TfmHbtpFScjqdZm6FEAA4jvM8YxgGDocDy+XyQ52u67iuy263Q0qJ9vrgS9m3CCG4XC78AIbyaugN8DI1AAAAAElFTkSuQmCC";
var _imgLog = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAkNJREFUOI11kc1qE1EYhp/zM3+ZREdqLFm0pbjQFoSIIN5EvQEXrly4Fbp22d6Bm4IX0EUvodSNy0ZxUYullCQ46U8sTTKTSSbnuIhJqU0/+ODjnPM+vO93BEC1WvXW19ffl8vlIoAQAiklQohpT84B4jjubmxsfKrVaplmXN7y8vKH+fn5BSEESqlpT0BSyikkiqIG8BmYAgBQ3/ZRxRKyfY55+IhDx8HzPDzPww8Cet0uURSh9bVsOiml0C9fobUez1pTlRKl1I1IACcnJ7MB6sd3VPQAcXZKXi5zrDSFIMBxXHzfp9PtcK9Umsa5BXCfv0AJgX7yFOU4PFMKYwxaK4SQVKhgjKHRaNwGSCnh8AAZRdizc4Zzc9S1xnU9HEfjOC69pIfruFhrZwPclVW0V"+
"MiFJYSjWTTjhxOB73tIqYjj+A4HjQZEEaOzU7gfEUuJVgoYLy9JEiyWfJjPBuhKBWlBLi6Ra01xMGCY54zyHGPsPyeWNE3vcHB1hQhDRu02ozAktZYsG2CMIUl6XLTbpMm1+AYAQHgeWAuFAjnQ7/cZjQztP21acYtO5wrHdW0rbv0EBgDTDxVCIIMCIiyC5yP9gGKxhFKKrJ/heR5ra6+tQHzd2dl5V6vV0lsORvFvZBAwurggc12a/T79LKPZbBKGod3d3d3f2tp6myTJ8cwIzsqqFUIgFpfws4zHacrl5SW9bo96vb6/vb39Zm9v79esHWSbm5sfS6WSO7mw1mKMwRjDcDjk6OjoS7fbPeC/+gsF5uVHXX2OyAAAAABJRU5ErkJggg%3D%3D";
var _imgSettings = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADeklEQVR4nGJgoBAAAAAA//9ihDHU1NS4vb29A8XExGw/ffr0YseOHTPOnz//HF0DJxODnBArA9+znwzf/zMwPAEAAAD//2KBSfDy8mpoaWlVe3l5aXBwcDCIi4tLP378OOfNmzc/YGpYGBkUW+05S61VuRTmn/lybs75n7MBAAAA//+Cm8zMzMyvoKAQ3tjYeOrHjx//371799fBwSEAyXLZLmOG+f8Xqvz9P0Hh/41krpv8rAwmAAAAAP//AEEAvv8CDQ0NBTY2NicXFxco4ODgtcXFxcbt7e0AERERAigoKEEAAAAAAgEAHYgzAIJ1YhVgACsPAgDu9ADU4fb1+/8A/wAAAP//AEEAvv8E+Pj4AhYWFjuYmJidsLCwshUVFTLp6ekA9fX0ADU5OzmenZ01gSz7ZHdhFF4ANx4AA"+
"LbnALDM79tqxQCc9vwA2wAAAP//AEEAvv8BAAAAAAoKCiyLi4uoODg4KwUFBQDQ0NAA3+PjAA0IC/n3onTbeWIPKAE7IAQAtucAscnp3V+6/Y7x+wCrAAAA7AAAAP//gsUCOycnp72Li0tpWFiYy+kzZ278YmQTUL20TCLP9zMDi60qA8O25wxrjz2/lrb//7R3PxmWMzAwvGNgYGAAAAAA//9CRmxCQkI+Pj4+p9nY2UOZmFjSsmx1Xn1OY/j/v1Xi/yZ35v+KPOw9DAyMPMiaAAAAAP//QkEsLCwiHBwchgwMDKKmJiaF/////98c7ft9lR3L/036Bv8L+IQeRcnKBiHrAQAAAP//wobYbGxsMv////8/PSNjGwMDQ6stM+eDTfoG/2/6+//vExT8lC8nVyLBycnMwMDAAAAAAP//QkFcXFzC9vb2Wf////+fmZm5hYGBwY6BgUFYkJExvEhA4MYFW9v/N/39/0/k5/9fJi09WYKdnRMAAAD//4LpZZKQkHD6DwWZmZnbGBgYvBgYGNhgZvMyMgbVi4ndP6yr+z+Nl/dMg4DA92BhYS8AAAAA//+CJ8ScnJwFMANERERSGBgY+NFcyCnMyBhZLSZ2Z6qs7Id0AYHzUiwsxgAAAAD//4K73sHBYdrkyZOviouLNzEwMCjhCB9eEWbmUCtOzulCTEy+DAwMXAAAAAD//3TSqREAIAwAsEiePdh/I3wXAMNdVSULRKUedCxMBDbeBxlouDgJAAD//wMAC+oGlxCRfiwAAAAASUVORK5CYII%3D";
var _imgUpdate = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuJJREFUeNqkU8lPE1EY/6ad6dAOSwttLcUolIrAASPVWEncIulBjVESl+jZg4l/ggdvnkz06EU8FA9iNMaIYvRgmhASUw2NQJQuLBZZOixtp515s/k9iojRxIOT/ObNm2/9fQtjmib8z8PS14n+pft4hP4ijyNuIzhEEYOJhq4TTdNAU9VfDnRdj4Fphi5F/CFFqWTEsgw8eTcP54837hbXiSebk8nsQlkydJhA8fefESz0hd6i6HV4YGg2ziAlqaCCIutAI6nEYATO6gv6HLvPHPZ02lgzgsECvzlQFcUPhtZzOuwN5ZYkqKoCIIqKxgQG32YKo+OL1VJZCa6KcmvkgHs/A/pF0zCcSGczA0L6mr18ML9SwtRNePRy"+
"Km5D1pqiACrF57Lrb17FZsqySgLikhTc5ea70OaIjnXYqAFRlJ6GaraeRk1kxBTeRx8+m6jkiE4sFuYjMvMlpnLdHf7ane4aVkGdYyh9UaEgy21WC+PQTANSmeU1XdNuYPS7iHi5WITC6hrNciidWeZRpwl1A2hzELGVgVTWjLyqmRvfRgmpcFwU+xFFCrTFMSmfj1pZVpA0s5YDg+oJW20ksvxhuSDX6gzLe9yCkp3LncLIQxzPw+Z8UIR9vjqnKBtgBbWENl+3d+H97DdxUgQu7WppwlqRozg03TJmgjI42dcTwjPs7mxtRR2Yy4oreB+hsooDQmLTX2YSVU4hmbUK6UBv2F6zwxXBWoQwVUiVGNh3oTeULFvAEOyQHJ9Oos1TOo0bDpDnmlwsPY4PDn9y1NlT83xd0jwULjZePleDxYN1Kw9jBSu46h0wFn0eJ5JEo88XX9+q1KAwcAUs3va0svds+fODUqezLSBAS7NN8ftMOkwGDoXdYsKCAdBx/Wooca+fmk1qixNRhm4jwzD0B62qh7G7GsDTLkC1n2NI3gBv1zVo2NP2x5qJU5PGyJ2b2x3YEA6EHcH8Y4vpxmm0fD8EGADFhK0+biwMlwAAAABJRU5ErkJggg%3D%3D";
var _imgIgnore = "data:image/png;base64,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";
var _donate = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAk9JREFUeNpi/P//PwMMMDIywtm5U0P///sHkWNiYmSYnL0aLomsh4UBDeROC235+/d/NR8vF4OlhQpY7PiJOwxZk4L/MzExPQUaVgMUWgC3FNm0/OlhBVxc7P3GBgoM7OxsDP+BkBHsAiYGRqAr3n/4ynDy1B2GSVmrGLG64O+f/52aGtIMbGysDN9//GS4dfsFw88ffxh+/fnDICUpwCAlIQh0P8M/ZD0oBgBtZBMS4Gb4++8fw1Ggs6+ffJCze8HJEyA5vywbN3ltybbn99+04DSAk5MdzhYR4mZQ0JZQBDKngvibph25B6R2AfFDhh6EHpQwyJkc+tfMTIVJgJ8T6HdGhqfP3zG8e/eF4emz99+YmJnmMTEylgP9/w0l5pA5Bo5qvjZB+mtVVMRZpaUEgS5iA/mL4feffwwPH71iuHP3FQMzM1PcxMyVi7EaAEwHID9oB+TaeQhL8/uIiPNZKsiLAgNQECz/4eN3htNn7qCkCfR08BOIz22YfOgBkF4NxHx+ObZedu7aTSpKEgxCglwMsMSF1QBgOjgBVGAGZEYAbVkFEgM6me/r118M/yHRhAFQDABqNrc0V2V48PD1yprF8Sv/Ab0nDIwNeVlRBlAq//HjNyhwf+M0AATevP3MoK0lC7SZkeHv33/gdA/KI//+/mc4e+E+w/O7r5uQ1aMEooyqmL1HikUVOzebm5AAD4OFOSIvvP/wheHTm6/zljTtKAXqeYcrFpiBlDwQCwJz4xm03GgCZL4A4qc40wFydgYCYzTfncWWnQECDAAfee7hcYrG5QAAAABJRU5ErkJggg%3D%3D";
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var _appVersion = '1.0.4';
var _name = "";
var _viso = 0;
var _groups = new Array();

var _request = new Object();
var _appSettings = new Object();

_appSettings = {
	'app_151044809337_0':{
		'name':'Fishville',
		'functionName': 'unsafeWindow._getFishvilleGift(\'app_151044809337_0\')'
	},
	'app_151044809337_1':{
		'name':'Fishville',
		'functionName': 'unsafeWindow._getFishvilleGift(\'app_151044809337_1\')'
	},
	'app_151044809337_2':{
		'name':'Fishville',
		'functionName': 'unsafeWindow._getFishvilleGift(\'app_151044809337_2\')'
	},
	'app_102452128776_0':{
		'name':'Farmville',
		'functionName': 'unsafeWindow._getFarmVilleGift(\'app_102452128776_0\')'
	},
	'app_102452128776_1':{
		'name':'Farmville',
		'functionName': 'unsafeWindow._getFarmVilleGift(\'app_102452128776_1\')'
	},
	'app_102452128776_2':{
		'name':'Farmville',
		'functionName': 'unsafeWindow._getFarmVilleGift(\'app_102452128776_2\')'
	},

	'app_25287267406_0':{
		'name':'Vampire wars',
		'functionName': 'unsafeWindow._getVampire(\'app_25287267406_0\')'
	}, //wampire
	
	'app_25287267406_1':{
		'name':'Vampire wars',
		'functionName': 'unsafeWindow._getVampire(\'app_25287267406_0\')'
	}, //wampire

	'app_101539264719_0':{
		'name':'Café',
		'functionName': 'unsafeWindow._getCafeGift(\'app_101539264719_0\')'
	}, //cafe
	
	'app_101539264719_1':{
		'name':'Café',
		'functionName': 'unsafeWindow._getCafeGift(\'app_101539264719_1\')'
	}, //cafe

	'app_154109904146_0':{
		'name':'Fishisle',
		'functionName': 'unsafeWindow._getFishisleGift(\'app_154109904146_0\')'
	}, //Fishisle

	'app_46755028429_0':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_0\')'
	}, //ca
	'app_46755028429_1':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_1\')'
	}, //ca
	'app_46755028429_2':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_2\')'
	}, //ca
	'app_46755028429_3':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_3\')'
	}, //ca
	'app_46755028429_4':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_4\')'
	}, //ca
	'app_46755028429_5':{
		'name':'Castle Age',
		'functionName': 'unsafeWindow._getCage(\'app_46755028429_5\')'
	}, //ca
	'app_21526880407_0':{
		'name':'Yoville',
		'functionName': 'unsafeWindow._getYoville(\'app_21526880407_0\')'
	}, //ca
	'app_21526880407_1':{
		'name':'Yoville',
		'functionName': 'unsafeWindow._getYoville(\'app_21526880407_1\')'
	}, //ca
	'app_21526880407_2':{
		'name':'Yoville',
		'functionName': 'unsafeWindow._getYoville(\'app_21526880407_2\')'
	}, //ca
	'friend_connect':{
		'name':'Friend request',
		'functionName': 'unsafeWindow._acceptFriends(\'friend_connect\')'
	}/*,
	'app_112462268161_0':{
		'name':'Mobsters 2',
		'functionName': 'unsafeWindow._acceptMobsters(\'app_112462268161_0\')'
	},
	'app_112462268161_1':{
		'name':'Mobsters 2',
		'functionName': 'unsafeWindow._acceptMobsters(\'app_112462268161_1\')'
	}
	*/
}

GM_addStyle(
'.log {position:absolute; width:400px; background:#333; display:none; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.logHeader:hover { cursor:move; }'+
'.logHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.logBody { height:200px; color:#FFF; overflow:auto; padding:0; background:#191919; margin:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'.foto {position:absolute; background:#333; display:none; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.fotoHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.fotoBody { color:#FFF; overflow:auto; padding:0; background:#191919; margin:5px; padding:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'hr { padding:0; margin:0; border: 1px solid #333; border-top-color:#666;}'+
'.close { cursor:pointer; width:11px; height:11px; position:absolute;  top:5px; right:5px; background:url("'+_imgClose+'") }'+
'.close:hover { background:url("'+_imgCloseHover+'") }'+
'.settings {position:absolute; width:260px; background:#333; display:none; -moz-border-radius: 6px; -webkit-border-radius: 6px;}' +
'.settingsHeader:hover { cursor:move; }'+
'.settingsHeader {color:#59CC0D; position:relative; font-size:12px; padding:3px 5px;}'+
'.settingsBody {color:#FFF; padding:5px; background:#191919; margin:5px; border:#666 1px solid; -moz-border-radius: 6px; -webkit-border-radius: 6px;}'+
'.settings input,select,textarea { font-size:11px; background:#333; border:#666 1px solid; color:#FFF; padding:0 2px; -moz-border-radius: 6px; -webkit-border-radius: 6px; }'+
'.log input,select,textarea { font-size:11px; background:#333; border:#666 1px solid; color:#FFF; padding:0 2px; -moz-border-radius: 6px; -webkit-border-radius: 6px; }'+
'.line {margin-bottom:3px}'+
'.lineRight {margin:2px 5px 5px 0;}'+
'.button {background:#000; border:#666 1px solid; color:#666; cursor:pointer;}'+
'.button:hover {color:#FFF; border-color:#FFF;}'+
'.bad {color:#F00;}'+
'#aaa img { cursor:pointer; }'+
'#aaa { width:650px; padding:3px; }'+
'#imgList div {margin:0px 0px 0 5px;}'+
'.good {color:#CCCCCC}'+
'.version { font-size:9px; }'
);

if (GM_getValue("AAGfirstTime") == undefined) {
	GM_setValue("AAGfirstTime","1");
	_getGroups();
	_getMyID();
	alert("Farmville Türkiye - Toplu İstek Kabul Etme Scriptini Çalıştırmak istiyormusunuz ?");
}

function _accept(_id){
	var _data = "__a=1&actions[reject]="+_request[_id].action+"&charset_test="+_request[_id].charset_test+"&fb_dtsg="+_request[_id].fb_dtsg+"&id="+_request[_id].id+"&params[app_id]="+_request[_id].appID+"&params[from_id]="+_request[_id].userID+"&params[is_invite]="+_request[_id].isInvite+"&params[req_type]="+_request[_id].reqType+"&post_form_id="+_request[_id].postForm+"&post_form_id_source=AsyncRequest&status_div_id="+_request[_id].status+"&type="+_request[_id].type;
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.facebook.com/ajax/reqs.php",
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:_data,
		onload: function(postResp){
			$('#'+_request[_id].status).html('Kabul Edildi');
			delete _request[_id];
		}
	});
}

function _cancel(_id){
	var _data = "__a=1&actions[reject]="+_request[_id].action+"&charset_test="+_request[_id].charset_test+"&fb_dtsg="+_request[_id].fb_dtsg+"&id="+_request[_id].id+"&params[app_id]="+_request[_id].appID+"&params[from_id]="+_request[_id].userID+"&params[is_invite]="+_request[_id].isInvite+"&params[req_type]="+_request[_id].reqType+"&post_form_id="+_request[_id].postForm+"&post_form_id_source=AsyncRequest&status_div_id="+_request[_id].status+"&type="+_request[_id].type;
	GM_xmlhttpRequest({
		method: "POST", url: "http://www.facebook.com/ajax/reqs.php", headers:{'Content-type':'application/x-www-form-urlencoded'}, data:_data,
		onload: function(postResp){
			$('#'+_request[_id].status).html('Canceled');
			delete _request[_id];
		}	
	});
}

function _viewAll(){
	$('.PYMK_Reqs_Sidebar').eq(0).hide();
	$("<div id='aaa'></div>").insertBefore('.confirm_boxes:eq(0)');	
	$('#aaa').append('<div id="foto" class="foto"><div class="fotoHeader">Photo</div><hr><div id="foroIMG" class="fotoBody"></div></div>');
	$('#aaa').append('<div class="main"><img src="' + _imgSettings + '" title="Ayarlar" class="settingsImg"> | <img src="' + _imgLog + '" title="İşlemleri Göster" class="appLog" > | <img src="' + _ignoreAll + '" title="Tüm İstekleri İptal Et" class="_cancelAllApp"> | <img src="' + _imgUpdate + '" title="Yenile" class="_refresh"> | <img src="'+_donate+'" title="Destek" class="_donate"></div>');
	_addOnclickEvent();
	$('#aaa').append('<div class="settings"><div class="settingsHeader">Ayarlar<div class="close closeSettings"></div></div><hr><div class="settingsBody"><div class="version" align="right">Versiyon: '+_appVersion+'</div><div class="line"> Arkadaş yada Grup Ekle: <select id="userSelect"></select> <div class="line">Otomatik Mesaj: </div><div class="line"><textarea id="txtMessage" cols="37" value=""/></div> <div align="center" class="line"><input type="button" id="update" class="button" value="Programı Güncelle"/></div > <div class="line" align="center"><input type="button" id="save" class="button" value="Kaydet"/></div></div></div>');
	$('#aaa').append('<div class="log"><div class="logHeader">Yapılan İşlemler<div class="close closeLog"></div></div><hr><div id="imgList" class="logBody"></div><div class="lineRight" align="right"><input type="button" id="clear" class="button" value="Temizle"/></div></div>');
	var _html = '<table cellspacing="0">';
	$('.confirm_boxes').each(function(){
		var _html = ''
		if ($(this).find('span').eq(0).attr('id') != 'fbpage_fan_main') var _appName = $(this).find('span').eq(0).attr('id').replace(/_main/,'').replace(/_label/,'');
		else var _appName = $(this).find('span').eq(0).attr('id');
		
		var _appTitle = $(this).find('span').eq(0).html();
		$(this).attr('appBlock',_appName)
		if($(this).attr('id') != 'friend_connect' && $(this).attr('id') != 'friend_suggestion' && $(this).attr('id') != 'event_invite' && $(this).attr('id') != 'group_invite' && $(this).attr('id') != 'fbpage_fan_confirm'){
			_html = '<div appMyBlock="'+_appName+'"><img class="' + $(this).find('img').eq(0).attr('class') + '" src="' + $(this).find('img').eq(0).attr('src') + '"> ' + _appTitle;
			$(this).find('form').each(function(){
				var tempArray = $(this).find('input[autocomplete="off"]');
				_request[$(this).find('.confirm').attr('id')] = {
					'appTitle': $(this).find('.info > a').eq(1).html(),
					'appName': _appName,
					'userName':$(this).find('.info > a').eq(0).html(), 
					'userID': tempArray.eq(4).val(),
					'appID': tempArray.eq(5).val(),
					'reqType': tempArray.eq(6).val(),
					'isInvite': tempArray.eq(7).val(),
					'link': $(this).find('.inputbutton').eq(0).attr('name'),
					
					'postForm': tempArray.eq(0).val(),
					'id': tempArray.eq(1).val(),
					'type': tempArray.eq(2).val(),
					'status': tempArray.eq(3).val(),
					'charset_test': $(this).find('input[name="charset_test"]').val(),
					'fb_dtsg': $(this).find('input[name="fb_dtsg"]').val(),
					'action': $(this).find('.inputbutton').eq(1).attr('name')
				};
				$(this).find('.inputbutton').eq(0).attr('accept',$(this).find('.confirm').attr('id')+'_accept');
				$(this).find('.inputbutton').eq(1).attr('cancel',$(this).find('.confirm').attr('id')+'_cancel');
			});
			_html += '<img src="'+_imgShow+'" app="'+_appName.replace(/app_/,'confirm_')+'" class="_hideApp" title="Sırayı Aç">'
			if(_appSettings[_appName]) _html += '<img src="'+_acceptAll+'" title="Kabul Et" class="_acceptApp" app="'+_appName+'">'
			_html += '<img src="'+_ignoreAll+'" class="_cancelApp" app="'+_appName+'" title="İptal">'
			_html += '</div>'
			$('#aaa').append(_html);
		}

		else if($(this).attr('id') == 'friend_connect') {
			_html = '<div appMyBlock="'+_appName+'"> <img class="' + $(this).find('img').eq(0).attr('class') + '" src="' + $(this).find('img').eq(0).attr('src') + '"> ' + _appTitle;
			$(this).find('.confirm').each(function(){
				var tempArray = $(this).find('form > input')
				_request[$(this).attr('id')] = {
					'appTitle': 'Friend request',
					'appName': _appName,
					'userName':$(this).find('.info > a').eq(0).html(),
					'photo': $(this).find('.image > a').eq(0).html(),					
					'userID': tempArray.eq(5).val(),
					'postForm': tempArray.eq(2).val(),
					'status': tempArray.eq(6).val(),
					'type': tempArray.eq(4).val(),
					'charset_test': tempArray.eq(0).val(),
					'fb_dtsg': tempArray.eq(1).val(),
					'action': $(this).find('.inputbutton').eq(0).val(),
					'msg': $(this).find('.msg_content').html()
				};
			});

			_html += '<img src="'+_imgShow+'" app="'+_appName.replace(/app_/,'confirm_')+'" class="_hideApp" title="Sırayı Aç">'
			if(_appSettings[_appName]) _html += '<img src="'+_acceptAll+'" title="Accept" class="_acceptApp" app="'+_appName+'">'
			_html += '<img src="'+_ignoreAll+'" class="_cancelApp" app="'+_appName+'" title="Cancel">'
			_html += '</div>'
			$('#aaa').append(_html);
		}
		else{
			_html = '<div appMyBlock="'+_appName+'"> <img class="' + $(this).find('img').eq(0).attr('class') + '" src="' + $(this).find('img').eq(0).attr('src') + '"> ' + _appTitle;
			_html += '<img src="'+_imgShow+'" app="'+_appName.replace(/app_/,'confirm_')+'" class="_hideApp" title="Sırayı Aç">'
			//_html += '<img src="'+_ignoreAll+'" class="_cancelApp" app="'+_appName+'" title="Cancel">'
			_html += '</div>'
			$('#aaa').append(_html);
		}
	});
	_html += '</table>';
	$('#aaa').append(_html);
}

function count(_str){
	var temp = 0;
	for (var i in _request){
		if(_request[i].appName == _str) {
			temp++;
		}
	}
	return temp;
}

function _hideAll(){
	$('.confirm_boxes').each(function(){
		$(this).hide();
		$('.appShowHide').each(function(){
			$(this).attr('src',_imgShow);
		});
	});
}

function _getGroups(){
	var _usrGroup = "";
	GM_xmlhttpRequest({ url:"http://www.facebook.com/friends/?ref=tn", method:'get',
		onload: function(resp){
			$('.UIFilterList_Item > a',resp.responseText).each(function(){
				var _param = $(this).attr('href').split('=')[1].split('_');
				if(_param[0] == 'flp') {
					_usrGroup += _param[1]+":"+$(this).find("div").eq(1).html()+","; //_usrGroup += _param[1]+":"+$(this).attr('title')+",";
				}
			});
			GM_setValue("usrGroups",_usrGroup);
			if (GM_getValue("setGroups") == undefined) { 
				GM_setValue("setGroups",_usrGroup.split(',')[0]);
			}
			_setSettings();			
		}
	});
}

function _getMyID(){
	var _link = $('[accesskey="2"]').attr("href");
	GM_xmlhttpRequest({ url:_link, method:'get',
		onload: function(resp){
			var _myID = $("#profileimage > a",resp.responseText).eq(0).attr("href").split("id=")[1];
			if(_myID){
				GM_setValue("myID",_myID);
			}
		}
	});
}

function _setSettings(){
	$('#userSelect').append('<option value="0">Seçili Değil</option>')
	if (GM_getValue("usrGroups") != undefined){
		var _tmp = GM_getValue("usrGroups");
		_tmp = _tmp.split(',');
		for(var i=0; i < _tmp.length-1; i++){
			var _selected = "";
			if (GM_getValue("setGroups") == _tmp[i]) _selected = "selected"
			$('#userSelect').append('<option value="'+_tmp[i].split(":")[0]+'"' + _selected + '>'+_tmp[i].split(":")[1]+'</option>');
		}
	}
	if (GM_getValue("setMsg") != undefined) $('#txtMessage').val(GM_getValue("setMsg"));
}

function _getCafeGift(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftCafeMain").html() == null) $("#imgList").append("<div id='giftCafeMain'>CafeWorld İsteği Kabul Edildi...<div id='giftCafeBody' style='padding-left:10px'></div>Kabul Edilen Sayı <span id='giftCafeSum'>0</span> Hediye / <span id='neibCafeSum'>0</span> Komşu.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/track.php/,'accept_request.php').replace(/actions\[/,'').replace(/]/,'');
			if(url_array.action == "accept_gift") var _isGift = 1;
			else _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift==1){
						if($('#app101539264719_gift_items > h1',resp.responseText).html()) {
							var _gift = /.*?this\s*(.*)\sfrom.*/.exec($('#app101539264719_gift_items > h1',resp.responseText).html());
							$("#giftCafeBody").append("<div>Kabul Edilen: <b>" + _gift[1] + "</b></div>");
							$("#giftCafeSum").html(parseInt($("#giftCafeSum").html(),10)+1);
							_accept(this.data);
						}
					}
					else{
						$("#giftCafeBody").append("<div>Kabul Edilen: <b>"+_request[this.data].userName+"</b> Sana Komşu Oldu.</div>");
						$("#neibCafeSum").html(parseInt($("#neibCafeSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});		
		}
	}	
}

function _getFishvilleGift(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftFishvilleMain").html() == null) $("#imgList").append("<div id='giftFishvilleMain'>Fishville İsteği Kabul Edildi...<div id='giftFishvilleBody' style='padding-left:10px'></div>Kabul Edilen Sayı <span id='giftFishvilleSum'>0</span> Hediye / <span id='neibFishvilleSum'>0</span> Komşu.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/track.php/,'accept_request.php').replace(/actions\[/,'').replace(/]/,'');
			if(url_array.action == "accept_gift") var _isGift = 1;
			else _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift==1){
						if($('#app151044809337_gift_items > h1',resp.responseText).html()) {
							var _gift = /.*?this\s*(.*)\sfrom.*/.exec($('#app151044809337_gift_items > h1',resp.responseText).html());
							$("#giftFishvilleBody").append("<div>Kabul Edilen: <b>" + _gift[1] + "</b></div>");
							$("#giftFishvilleSum").html(parseInt($("#giftFishvilleSum").html(),10)+1);
							_accept(this.data);
						}
					}
					else{
						$("#giftFishvilleBody").append("<div>Kabul Edilen: <b>"+_request[this.data].userName+"</b> Sana Komşu Oldu.</div>");
						$("#neibFishvilleSum").html(parseInt($("#neibFishvilleSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});
		}
	}
}

function _getFarmVilleGift(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftFarmVilleMain").html() == null) $("#imgList").append("<div id='giftFarmVilleMain'>Farmville İsteği Kabul Edildi...<div id='giftFarmVilleBody' style='padding-left:10px'></div>Kabul Edilen Sayı <span id='giftFarmVilleSum'>0</span> Hediye / <span id='neibFarmVilleSum'>0</span> Komşu.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			if(url_array.gift) var _isGift = 1;
			else var _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift == 1){
						if($('.giftConfirm_name > span',resp.responseText).html()) 
							$("#giftFarmVilleBody").append("<div> Kabul Edilen: <b>" + $('.giftConfirm_name > span',resp.responseText).html() + "</b></div>");
							$("#giftFarmVilleSum").html(parseInt($("#giftFarmVilleSum").html(),10)+1);
							_accept(this.data);
					}
					else{
						$("#giftFarmVilleBody").append("<div>Kabul Edilen: <b>"+_request[this.data].userName+"</b> Sana Komşu Oldu.</div>");
						$("#neibFarmVilleSum").html(parseInt($("#neibFarmVilleSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});			
		}
	}
}

function _getFishisleGift(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftFishisleMain").html() == null) $("#imgList").append("<div id='giftFishisleMain'>Fishisle İsteği Kabul Edildi...<div id='giftFishisleBody' style='padding-left:10px'></div>Kabul Edilen Sayı <span id='giftFishisleSum'>0</span> Hediye / <span id='neibFishisleSum'>0</span> Komşu.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			if(url_array.gift) var _isGift = 1;
			else var _isGift = 0;
			GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
				onload: function(resp){
					temp++;
					if(_isGift == 1){
						if($('.giftConfirm_name > span',resp.responseText).html()) 
							$("#giftFishisleBody").append("<div> Kabul Edilen: <b>" + $('.giftConfirm_name > span',resp.responseText).html() + "</b></div>");
							$("#giftFishisleSum").html(parseInt($("#giftFishisleSum").html(),10)+1);
							_accept(this.data);
					}
					else{
						$("#giftFishisleBody").append("<div>Kabul Edilen: <b>"+_request[this.data].userName+"</b> Sana Komşu Oldu.</div>");
						$("#neibFishisleSum").html(parseInt($("#neibFishisleSum").html(),10)+1);
						_accept(this.data);
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();					
					}
				}
			});		
		}
	}
}

function _getVampire(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftVampireMain").html() == null) $("#imgList").append("<div id='giftVampireMain'>Vampire İsteği Kabul Edildi...<div id='giftVampireBody' style='padding-left:10px'></div>Kabul Edilen Sayı <span id='giftVampireSum'>0</span> Hediye / <span id='neibVampireSum'>0</span> Komşu.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/track.php/,'landing.php').replace(/actions\[/,'').replace(/]/,'');
			if (url_array.source == "recruit+gift") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						_gift = $('.abilityImg > img',resp.responseText).attr("title");
						if(_gift) {
							$("#giftVampireBody").append("<div>Kabul Edilen: <b>" + _gift + "</b></div>");
							$("#giftVampireSum").html(parseInt($("#giftVampireSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});
			}			
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}
}

function _acceptMobsters(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	var iiii = 0
	if ($("#giftMobstersMain").html() == null) $("#imgList").append("<div id='giftMobstersMain'>Mobsters İsteği Kabul Edildi...<div id='giftMobstersBody' style='padding-left:10px'></div>Kabul Edilen Sayı <span id='giftMobstersSum'>0</span> Hediye / <span id='neibMobstersSum'>0</span> Komşu.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
		iiii++
			var url_array = getArgs(_request[i].link.replace(/actions\[/,'').replace(/]/,''));
			var _link = _request[i].link.replace(/mobsters-two\//,'mobsters-two/send_gift.php').replace(/actions\[/,'').replace(/]/,'');
			if (url_array.action == "claimGift") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				alert(_link)
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						alert(resp.responseText);
						var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
						var _resptxt = $('<div></div>').append(_resphtml.toString());
				//		_gift = $('.claimGiftContentDiv',_resptxt).length;
				//		alert(_gift);
				//		alert(_resptxt.replace(/(.*)You successfully claimed your (.*)!(.*)/,'<b>$2</b>'));
						var aaa = /Not so Fast/.exec(_resptxt.toString());
						alert(aaa[0]);
						alert(aaa[1]);
						if(_gift) {
							$("#giftVampireBody").append("<div>Kabul Edilen: <b>" + _gift + "</b></div>");
							$("#giftVampireSum").html(parseInt($("#giftVampireSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});
			}			
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	if(iiii == 1) return false;
	}
}

function _getCage(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftCAgeMain").html() == null) $("#imgList").append("<div id='giftCAgeMain'>Castle Age İsteği Kabul Edildi...<div id='giftCAgeBody' style='padding-left:10px'></div>Kabul Edilen Sayı <span id='giftCAgeSum'>0</span> Hediye / <span id='neibCAgeSum'>0</span> Komşu.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _link = "http://apps.facebook.com/castle_age/army.php?act=acpt&uid="+_request[i].userID;
			if (_request[i].isInvite == "0") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
						var _acceptG = /You have accepted the gift: (.*)/.exec(_resphtml);
						if (_acceptG){
							$("#giftCAgeBody").append("<div> Kabul Edilen: <b>" + _acceptG[1] + "</b></div>");
							$("#giftCAgeSum").html(parseInt($("#giftCAgeSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();					
						}
					}
				});	
			}
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}
}

function _getYoville(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#giftYovilleMain").html() == null) $("#imgList").append("<div id='giftYovilleMain'>Yoville İsteği Kabul Edildi...<div id='giftYovilleBody' style='padding-left:10px'></div>Kabul Edilen Sayı <span id='giftYovilleSum'>0</span> Hediye / <span id='neibYovilleSum'>0</span> Komşu.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _link = _request[i].link.replace(/actions\[/,'').replace(/]/,'');
			var url_array = getArgs(_link);
			if (url_array.src == "gift") var isGift = 1;
			else var isGift = 0;
			if (isGift){
				GM_xmlhttpRequest({ url: _link, method:'get', data: i, 
					onload: function(resp){
						temp++;
						var _resphtml = resp.responseText.toString().replace(/<!DOCTYP[\w|\t|\r|\W]*?>/,'').replace(/<meta[^>]*>[\w|\t|\r|\W]*?\/>/g,'').replace(/<script[^>]*>[\w|\t|\r|\W]*?<\/script>/g,'').replace(/(\s*?onclick|onchange|onmouseover|onmouseout)\s*?=\s*?[\"](.*?)[\"][^>]*?/g,'').replace(/<[\/]{0,1}(FB|fb)[^><]*>/g,'');
						var _resptxt = $('<div></div>').append(_resphtml.toString());
						_gift = $('.boddiv',_resptxt).find('h2').eq(0).html();
						if(_gift) {
							$("#giftYovilleBody").append("<div>Kabul Edilen: <b>" + _gift + "</b></div>");
							$("#giftYovilleSum").html(parseInt($("#giftYovilleSum").html(),10)+1);
							_accept(this.data);
						}
						if(temp == all){
							$('[appBlock="'+_str+'"]').hide();
							$('[appMyBlock="'+_str+'"]').remove();
						}
					}
				});
			}			
		}
		if(isGift == 0){
			alert("Coming soon...");
			$('[appMyBlock="'+_str+'"]').find('img[src="'+_loading+'"]').remove();
			return false;
		}
	}
}

function _acceptFriends(_str){ //done
	var all		=	count(_str);
	var temp	=	0;
	if ($("#FriendMain").html() == null) $("#imgList").append("<div id='FriendMain'>Arkadaşlık İsteği Kabul Edildi...<div id='FriendBody' style='padding-left:10px'></div>Kabul Edilen Sayı <span id='FriendSum'>0</span> friend.</div>");
	for (var i in _request){
		if(_request[i].appName == _str) {
			var _data="__a=1&actions[accept]=" + _request[i].action + "&charset_test=" + _request[i].charset_test + "&confirm=" + _request[i].userID + "&fb_dtsg=" + _request[i].fb_dtsg + "&id=" + _request[i].userID + "&post_form_id=" + _request[i].postForm + "&post_form_id_source=AsyncRequest&status_div_id=" + _request[i].status + "&type=" + _request[i].type + "&arrID=" + i;
			GM_xmlhttpRequest({	method: "POST",	url: "http://www.facebook.com/ajax/reqs.php", headers:{'Content-type':'application/x-www-form-urlencoded'},	data:_data,
				onload: function(postResp){
					temp++;
					var _invite = /error_adding_friend/.exec(postResp.responseText.toString());
					var _friend = />([^<]*)/.exec(postResp.responseText.toString());
					var url_array = getArgs("www.facebook.com/home.php?"+this.data);
					if(!_invite){
						$("#FriendBody").append("<div> Kabul Edilen: <b><a class='addfriend good' href='http://www.facebook.com/profile.php?id="+ _request[url_array.arrID].userID +"' target='_blank' ursID='"+ url_array.arrID +"'>" + _request[url_array.arrID].userName + "</a></b>.</div>");
						$("#FriendSum").html(parseInt($("#FriendSum").html(),10)+1);
						$('#'+url_array.arrID).hide();
						_addOnclickEvent();
					}
					else {
						$("#acceptFriend").append("<div class='bad'> Somethink wrong with: <b><a class='addfriend bad' href='http://www.facebook.com/profile.php?id="+ _request[url_array.arrID].userID +"' target='_blank' ursID='"+ url_array.arrID +"'>" + _request[url_array.arrID].userName + "</a></b>.</div>");
						_addOnclickEvent();
					}
					if(temp == all){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();
					}
				}
			});
		}
	}
}
/*
function _AddAllFriend(_str){
	_visoSF = $('[nameG="'+_str+'_accept"]').length;
	$('[nameG="'+_str+'_accept"]').each(function(i){
		var _id = $(this).attr("idG");
		var _imgfoto = $(this).attr("imageG");
		GM_xmlhttpRequest({ url:"http://www.facebook.com/addfriend.php?id="+_id, method:'get',
			onload: function(resp){
				var _postFormID = $('#post_form_id',resp.responseText).val();
				var _myID = GM_getValue("myID");
				var _data='__a=1&fb_dtsg=ybLx2&flids[0]='+ GM_getValue("setGroups") +'&message=' + GM_getValue("setMsg") + '&post_form_id='+ _postFormID +'&post_form_id_source=AsyncRequest&profile_id='+ _id +'&pymk_page=&pymk_score=-1&pymk_source=&source=friend_suggestion&submit=1&user='+_myID;
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://www.facebook.com/ajax/profile/connect.php",
					headers:{'Content-type':'application/x-www-form-urlencoded'},
					data:_data,
					onload: function(postResp){
						_visoSF = _visoSF - 1;
						var _invite = /Request sent/.exec(postResp.responseText.toString());
						if(!_invite) {
							$("#acceptFriendSuggest").append("<div class='bad' style='padding-left:10px'> Somethink wrong with: <b><a class='addfriend' style='color:#FF0000;' href='http://www.facebook.com/profile.php?id="+ _id +"' img='"+_imgfoto+"' target='_blank'> this person </a></b>.</div>");
							_addOnclickEvent();
						}
						else {
							$("#acceptFriendSuggest").append("<div style='padding-left:10px'> Invited: <b><a class='addfriend' style='color:#CCCCCC;' href='http://www.facebook.com/profile.php?id="+ _id +"' img='"+_imgfoto+"' target='_blank'> this person</a></b>.</div>");
							_addOnclickEvent();
						}
						if(_visoSF == 0) {
							$("#acceptFriendSuggest").append("<div>All invite send.</div>");
							$('[nameC="'+_str+'_box"]').hide();
							$('.'+_str+'_myBox').remove();		
						}
					}
				});
			}
		});	
	});	
}
*/
$(document).ready(function(){
	var _link = document.location.href;
	if(_link.indexOf("/reqs.php") != -1){
		_getGroups();
		_viewAll();
		_hideAll();

		$('._cancelApp').click(function(){
			var _str = $(this).attr('app');
			var temp = 0;
			var all = count(_str);

			for (var i in _request){
				if(_request[i].appName == _str) {
					temp++;
					_cancel(i);
					if(all == temp){
						$('[appBlock="'+_str+'"]').hide();
						$('[appMyBlock="'+_str+'"]').remove();
						$("#imgList").append("<div> Canceled: <b>" + _request[i].appTitle + "</b> request.</div>");
					}
				}
			}
		});

		$('._cancelAllApp').click(function(){
			if(confirm("Are you sure want cancel all aplication?")){
				$('._cancelApp').each(function(){
					$('[nameG="'+$(this).attr('app')+'_cancel"]').each(function(){
						_clickCancel($(this));
					});
					$('[nameC="'+$(this).attr('app')+'_box"]').hide();
					$('.'+$(this).attr('app')+'_myBox').remove();
					$("#imgList").append("<div> Canceled: <b>" + $(this).attr('app').replace(/_/g," ") + "</b> request.</div>");	
				});
			}
		});

		$('._acceptApp').click(function(){
			$('<img src="'+_loading+'">').insertAfter($(this));
			$(this).remove();
			eval(_appSettings[$(this).attr('app')].functionName);
		});
		
		$('._hideApp').click(function(){ //done
			if ($(this).attr('src') == _imgHide) {
				$(this).attr('src',_imgShow);
				$(this).attr('title','Sırayı Aç');
				$('div[id="'+$(this).attr('app')+'"]').hide();
			}
			else{
				$(this).attr('src',_imgHide);
				$(this).attr('title','Collapse');
				$('div[id="'+$(this).attr('app')+'"]').show();
			}
		});

		$('.closeLog').click(function(){
			$('.log').css('display','none')
		});
		
		$('._donate').click(function(){
			window.open('http://www.facebook.com/FvTurkiye')
		});
		
		$('.appLog').click(function(){
			$('.log').css('display','block')
		});

		$('.closeSettings').click(function(){
			$('.settings').css('display','none');
		});

		$('.settingsImg').click(function(){
			$('.settings').css('display','block');
		});
		
		$('._ignoreApp').click(function(){
			if(confirm("Are you sure want block this application?")){
				var _data = "__a=1&confirm=1&fb_dtsg="+ $('#fb_dtsg').val() +"&post_form_id="+ $('#post_form_id').val() +"&post_form_id_source=AsyncRequest";
				var _link = "http://www.facebook.com/ajax/block_app.php?app_id="+$(this).attr("idG")+"&source="+$(this).attr("requestG");
				var _appname = $(this).attr('app');
				$('<img src="'+_loading+'" >').insertBefore($(this));
				GM_xmlhttpRequest({
					method: "POST",
					url: _link,
					headers:{'Content-type':'application/x-www-form-urlencoded'},
					data:_data,
					onload: function(postResp){
						var _reg = postResp.responseText.toString().replace(/(.*You have blocked the)(.*)\."(.*)/,"$2");
						if(_reg){
							$("#imgList").append("<div> Blocked: <b>" + _reg + "</b>.</div>");
							$('[nameC="'+_appname+'_box"]').hide();
							$('.'+_appname+'_myBox').remove();							
						}
						else{
							$("#imgList").append("<div class='bad'> Dont block: <b>" + _reg + "</b>.</div>");	
						}
					}
				});
			}
		});

		$('#save').click(function(){
			if ($('#userSelect option:selected').attr("value") != "0") GM_setValue("setGroups",$('#userSelect option:selected').attr("value")+":"+$('#userSelect option:selected').html());
			else GM_setValue("setGroups",'');
			GM_setValue("setMsg",$('#txtMessage').val());
			$('.settings').css('display','none');
		});

		$('#clear').click(function(){
			$('#imgList').html('');
		});
		
		$('._refresh').click(function(){
			document.location.href = "http://www.facebook.com/reqs.php";
		});
		
		$('.logHeader').bind("drag", function(e){
			if(e.offsetY > 20 && e.offsetX > 0){
				$('.log').css({
					top: e.offsetY,
					left: e.offsetX
				});
			}
		});
		
		$('.settingsHeader').bind("drag", function(e){
			if(e.offsetY > 20 && e.offsetX > 0){
				$('.settings').css({
					top: e.offsetY,
					left: e.offsetX
				});
			}
		});
		
		$('#update').click(function(){
			if($("#updating").html() == null) $('<div id="updating" class="line">Güncelleme Bakılıyor..<img src="' + _imgLoadingRed + '"><div>').insertBefore($(this));
			else $("#updating").html('<div id="updating">Güncelleme Var..<img src="' + _imgLoadingRed + '"><div>');
			GM_xmlhttpRequest({ url:"http://userscripts.org/scripts/review/62772", method:'get',
				onload: function(resp){
					var _version = /@version([^&#]*)/.exec(resp.responseText.toString());
					_aaa = _version[1].replace(/	/g,"");
					$('#upLoading').remove();
					if(_appVersion != _aaa){
						$('#updating').html('Yeni Versiyon (' + _aaa + ') Yüklemek için <a href="http://userscripts.org/scripts/source/62772.user.js">TIKLA</a> ve Güncelle.');
					}
					else{
						$('#updating').html('Zaten Son Versiyon');
					}
				}
			});
		});
	}
});


function encode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}

function decode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);

   return output;
}

function _addOnclickEvent(){
	jQuery(function() {
		$('.addfriend').mouseover(function(e){
			$("#foto").css({
				"display":"block",
				"z-index":99999,
				"top":e.pageY,
				"left":(e.pageX+15)
			});
			$("#foroIMG").html('<div>'+_request[$(this).attr('ursID')].photo+'</div>');
			if(_request[$(this).attr('ursID')].msg)$("#foroIMG").append('<div><b>Otomatik Mesaj:</b>'+_request[$(this).attr('ursID')].msg+'</div>')
		});
		$('.addfriend').mousemove(function(e){
			$("#foto").css({
				"top":e.pageY,
				"left":(e.pageX+15)
			});
		});
		$('.addfriend').mouseout(function(e){
			$("#foto").css("display","none");
		});
	});
}
function getArgs(url) {
	var args = new Object();
	if (url == undefined){
		var query = location.search.substring(1);
	}else{
		var url_array = url.split('?');
		var query = url_array[1].replace(/&amp;/g,'&');
	}
	var pairs = query.split("&");
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}