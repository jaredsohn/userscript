// ==UserScript==
// @name           Dirty Sheets
// @author         Constantine
// @namespace      http://userscripts.org/users/248610
// @description    Позволяет сворачивать пространные посты с одну линию убористого текста
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include        http://dirty.ru/
// @include        http://*.dirty.ru/
// @include        http://d3.ru/
// @include        http://*.d3.ru/
// @include        http://dirty.ru/my/
// @include        http://*.dirty.ru/my/
// @include        http://d3.ru/my/
// @include        http://*.d3.ru/my/
// @include        http://dirty.ru/pages/*
// @include        http://*.dirty.ru/pages/*
// @include        http://d3.ru/pages/*
// @include        http://*.d3.ru/pages/*
// @exclude        http://dirty.ru/my/*
// @exclude        http://*.dirty.ru/my/*
// @exclude        http://d3.ru/my/*
// @exclude        http://*.d3.ru/my/*
// @run-at         document-end
// @version        2.0.3
// ==/UserScript==

(function () {
    // return;
    var delCnt = 0;
    if (top !== self) {
        // don't run the user script in the frames
        return;
    }
    var icoExpand = "data:image/gif;base64,R0lGODlhCgAKAKIGAJmZmQiDyAFDaH/R/////7/o/wAAAAAAACH5BAEAAAYALAAAAAAKAAoAAAMjaGoRayAGQkIEKoxShntCKDxkaT5NQwoER4xQJAyDcIGwkgAAOw==";
    var icoCollapse = "data:image/gif;base64,R0lGODlhCgAKALMLAJmZmfUpKasBAf/R0f////+ioqoCAriMjKUDA8WGhqgCAgAAAAAAAAAAAAAAAAAAACH5BAEAAAsALAAAAAAKAAoAAAQncMlAg7yGjEGMBEAiFIVygNciIGnrvi6VgkBAEAE9FVthpYKg4BIBADs=";
    var icoDelete = "data:image/gif;base64,R0lGODlhCgAKAIABADc3N////yH5BAEAAAEALAAAAAAKAAoAAAIWjA+pGmB53nNxUYmalg7m7mlX1VhMAQA7";
    var icoRestore = "data:image/gif;base64,R0lGODlhCgAKAJEDAAB7wH+937/e7////yH5BAEAAAMALAAAAAAKAAoAAAIg3ICJBuYXQpMLhGNEvU1reHgDxw3CYx1Kcj2jEcWxUQAAOw==";
    var throbber = "data:image/gif;base64,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";
    var icoClose = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIzNDUxMzJGNEFENzExRTBBOThERjlFNDU5QzFBNTAyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIzNDUxMzMwNEFENzExRTBBOThERjlFNDU5QzFBNTAyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjM0NTEzMkQ0QUQ3MTFFMEE5OERGOUU0NTlDMUE1MDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjM0NTEzMkU0QUQ3MTFFMEE5OERGOUU0NTlDMUE1MDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4KDgLSAAAIXElEQVR42qxYaUxUVxQ+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";
    var cur = "data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAGAAAAFQAAACYAAAAuAAAAJwAAABYAAAAIAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAwAAAAjAAAANwAAAD8AAAA6AAAAJgAAABAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABAAAAAcAAAAIAAAACAAAAAcAAAALAAAAHwAAADgFBQVZFxcXbgEBAVkAAABBAAAAKQAAABAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABgAAAA0AAAAYAAAAIgAAACYAAAAlAAAAIwAAACYAAAA3FBQUYFpaWrh2dnbUUVFRtg4ODmgAAABBAAAAJwAAABAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAkAAAAaAAAALQAAADwAAABFAAAASAAAAEcAAABHAAAASwEBAVNmZma6p6en/cXFxf+ysrL+a2trxQ4ODmYAAAA/AAAAJwAAAA8AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAMAAAAIAAAADkAAABJAAAAWgcHB20PDw96CwsLdwEBAWwAAABcMTExh5qamvi/v7//1tbW/87Ozv/ExMT/cXFxxAsLC2QAAAA+AAAAJQAAAA4AAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAACQAAACEAAAA7AAAAVCgoKIVKSkq0aGhoz4KCgtqBgYHYa2tryk1NTbF7e3vdnJyc/srKyv/Pz8//19fX/9ra2v/Jycn/bGxswAkJCWAAAAA6AAAAHwAAAAoAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAcAAAAbAAAANwUFBVlISEioh4eH5KysrP/IyMj/0tLS/9PT0//Pz8//ubm5/qOjo/+YmJj/ysrK/93d3f/y8vL/8fHx/+Dg4P/Hx8f/aGhovAkJCVgAAAAvAAAAEwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAEgAAAC4HBwdSW1tbsaqqqvjCwsL/zMzM/9DQ0P/V1dX/29vb/9TU1P/R0dH/xcXF/6urq/+3t7f/8/Pz////////////9fX1/+Dg4P/Hx8f/YmJiswMDA0QAAAAdAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAfAAAAPlJSUqS9vb37zs7O/9XV1f/g4OD/4eHh//Dw8P/29vb/6Ojo/9ra2v/T09P/xsbG/7e3t//5+fn/////////////////9fX1/+zs7P/Dw8P7LS0tdQAAAB8AAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAACwICAiE0NDR0pqam8tvb2//l5eX/8vLy//39/f/9/f3/////////////////9vb2/+jo6P/b29v/ycnJ/+vr6////////////////////////v7+//X19f+IiIi/CgoKJAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAJDAwML4qKis/ExMT/5ubm////////////7e3t//r6+v////////////////////////////b29v/i4uL/1dXV//7+/v///////////////////////////9PT0/kmJiZFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMnJydFsLCw/tfX1//9/f3/8fHx/8DAwP/Hx8f/7e3t//////////////////////////////////v7+//i4uL/4uLi/+/v7//////////////////4+Pj/ysrK/Dc3NzUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk5OUy+vr7/+fn5//Dw8P+rq6v/m5ub/8bGxv/u7u7///////////////////////////////////////v7+//h4eH/zc3N/9vb2///////9vb2/8XFxf6enp6kOzs7BgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAEJiYmQ7CwsPzOzs7/qKio/5iYmP+8vLz/29vb//r6+v////////////////////////////////////////////r6+v/c3Nz/sbGx/76+vv/ExMT/jo6OxENDQycAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAABYNDQ08g4OD05KSkv+YmJj/wcHB/97e3v/29vb//////////////////f39/+Hh4f/8/Pz///////////////////////f39/+7u7v/nZ2d+3d3d5aAgIAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAWAAAAMgEBAURmZma5o6Oj/8LCwv/e3t7/9vb2/////////////v7+/9vb2/+8vLz/zc3N////////////////////////////8fHx/7e3t/6SkpKiWlpaDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAC0BAQFHNzc3iZiYmOfDw8P/3d3d//f39//////////////////g4OD/m5ub/7q6uv/z8/P//v7+/+Dg4P/+/v7////////////p6en/ra2t9lpaWkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAQEBPS4uLoCgoKDoysrK/9zc3P/39/f//////////////////////+fn5//Q0ND/9vb2//n5+f/FxcX/zs7O/////////////////+vr6/+pqanjQUFBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBASQoKChpl5eX4czMzP/d3d3/9/f3///////////////////////////////////////+/v7/0dHR/5qamv/x8fH/+Pj4/97e3v/+/v7/0NDQ/rCwsMsxMTENAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHx8fNYqKis3Kysr/3t7e//f39//////////////////+/v7/1dXV/+np6f////////////7+/v/i4uL/1tbW//Dw8P+6urr/19fX//f39/+wsLD7mZmZdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPT09fvLy8/93d3f/4+Pj//////////////////v7+/9PT0/+ysrL/6+vr/////////////f39///////+/v7/ysrK/56env/5+fn/7u7u/qWlpdU8PDwRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFtbW1nIyMj/+vr6//////////////////7+/v/h4eH/s7Oz/9vb2/////////////n5+f/o6Oj/+vr6//7+/v/j4+P/4ODg//7+/v/Z2dn7gICAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwHbm5udb+/v7////////////+/v7/4ODg+4yMjJGTk5Oq39/f//X19f/v7+//09PT/+zs7P/////////////////+/v7/6urq/JaWlqpoaGgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAODg4Cb29vTNHR0evq6ur/7e3t/9TU1PiPj499ZGRkCHh4eBqysrJ/sbGxuLCwsN63t7f/7Ozs/+Xl5f7ExMTn0tLS/Nzc3POlpaWoc3NzGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJSUkDn5+fU66urqarq6u3pKSkdGlpaQQAAAAAAAAAAKGhoQGNjY0jkJCQRK+vr5S8vLzDoqKiiZWVlUimpqZbvr6+U3x8fBoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////wB///8Af//AAD//AAAf/gAAD/wAAAf4AAAD8AAAA/AAAAPwAAAD4AAAA+AAAAPwAAAH+AAAB+AAAA/gAAAfwAAAP8AAAH/AAAB/wAAAf8AAAP/AAAD/wAAB/8AAAf/AAAP/4GAH/8=";
    var bubble = {
    	  topLeft: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANhJREFUeNpiXHD8PwMukGDJyMhAAmAh0gBGNJoBG58Fj0HIBuBio6hlwWIQukZCGNUwHAYxIWlgQsLIYiiuZcERPkxINDOInrjleSw3n2AwMwsb0GpGTqwxAI1NZI2sQMwGxCAN3EDMN33Px+lH7vz///T9//+///7HCRjQnM0CNYgDahB/38bHOSCD/uAxBAaY0LwHw8xQzMIrIBKkKAzkMBFOZ0xYDGJCciULKxuHo5QAcYmWCUfgw11GSg7A5zKyDcNmIMx1ZBnGgMN1FLkMPcESDQACDADjul2g/n6ELwAAAABJRU5ErkJggg=="
	  	, top: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAPCAYAAAAs9AWDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC9JREFUeNpiZGBgYGJAAyy4BFmwCbJiE2RDF2RccPz/fwzB//8xBTFsHqSCAAEGANR5B5j13d0SAAAAAElFTkSuQmCC"
  		, topRight: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQRJREFUeNqkk72KAkEMxyez47Jy+AFno52PYXm9lU9wDyD4JtfaCtZXXH+l4EvYiZ0gCiKoczHLZSHGGda9C/zJ7kzmR5LJgDEGTAWbLRFjeznIqTWM/GMZ2DIsV8KS31YJZCXvAwANqylpeBIBggbmm6lQTXgJDwGNBjqqextqJiKe/PW8PB52n5Nhd05LPyTP3rJHfShoF4+42SEuVojT7/2UQpukF1JdZF9kDJRUHFbY1f8CP77WYzrUYmDGQCf7aMvmKqGI/qsxjXZnpC4G9O26Zwa116aa0uyN45Fl2RdAdKaaOW681N2cVYUlsZmrCpND/NCzv8CCT+s/MAgBbwIMAHiefaHg6lB8AAAAAElFTkSuQmCC"
  		, left: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAFCAYAAACn39dKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1JREFUeNpiYGBgYAJiFiDmAGJeIBYGYmkgVgFivQXH/xMNQAZRDYwQwwACDACqpivhcwACHQAAAABJRU5ErkJggg=="
  		, right: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAFCAYAAACn39dKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC9JREFUeNpi+E8kWHD8/38GBgY9IFYBYmkgFgZiXiDmAGIWIGZiYqAiGCGGAQQYABfgK+FkEIjgAAAAAElFTkSuQmCC"
  		, bottomLeft: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAdCAYAAABIWle8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNrslDtOAzEQQO3xkk0kkPh1iAoqpKSno+MA9IhLcJEcAHEIJApKihyBhgKalJFA4ruxzXjjiQbLw+5SZ6UnR7v2y3g8Y6WUAqRA+sgGsoPsIYfI6HrivXOuFUHS+Hjv20yrI2qc2U61kEnr/dLTIbK8gP32/5DlpK6LDJK00OiIt9fZZPqia2ETkInIsdFOnx5un2daWdcsM7hAR4CNgfAN7m+uHo9Ozrd0f3towKtB4ZXW+W3qjGAt0kPKWMyDy/Hd2f7B8HR9c3cEYMq/ZJrJCkFYRnrsu6EdBIdJhBI8r3Q485DTOAaqQigHmpyKwuIqRv8rqoBUtJalQbFysUxiWK5rGYRbQSgPiq6KfCNfkU/kI/JOFJl+dvHfbFLMFBkkZUTRa6mdSEgFDOwdP31eEYsXbKs+c2qOnVqVbJvGmmU7JUIvCG1aDhzem6rhMFLpPJVrFIhXysWx1IVCb7a9q7rcZyvZSpY8PwIMAGV4CsYWmIpIAAAAAElFTkSuQmCC"
  		, bottom: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAdCAYAAACNKM0tAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGlJREFUeNrEzzEOgCAQBEAxFDZWlra+yBf6Gx+kBjgOkMIYdn2Al2wz2WxyJudcuuZMSglBP6CKEGNEEBGEEAKC9x7BOYew7QWhZm3B1pwMx9N84eKNhWFmmBhGhoHBMvQABV/5C24BBgAMJkJ5ZdTQcgAAAABJRU5ErkJggg=="
  		, tail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqJJREFUeNrslj9s00AUxt/ZjhOaIAQSUickBhgYWBFCQgyUhZEJWBBqGUCwMUAlhkosHTpR2gGkdqiAkYWhQgxUqBSqoLaopX+kkqYhbWjjGBw1luo7bMsXzpdn4w4oS096Ovty9u973909hziOw6ANTWOsLVwXDO1pGrQt433w/q7+T42MTMannNUZdJ20IaUmlzhXTsG3ihYPtup1/yKXzRLvXgjFi2fv7b7jR9X7Z47ZiaAVS4WJ1TRMjr/oHH50reYO0SBYEOAymeKtMbLOTQHd59N9hSqMFQwV+NyosHcBpos6WL+M6y7UkhJpNm+u4hWQg7kcwdzgWW+sLY18KbkvtAn4BSci8us61KxG/51LR94gQCKQQWE4ULRbfXj11Ixp1no/FdPgfVIYtMaqkYLCNh29daFjgAtGMvZ7b74Sc5zEycTNYnTTsIfmN/UWi383CMyWdViamRgTBKM2h6xOsvu9eP745tPlLR1+uhuI20spg8/rGahuVXr7715cxEAiM2R1zTRZ5CTB0am3r6zS94We6dIBsB3iD85XMrBh7Azfu9z5UnIfpOdDA9iuZhg0COqu97tqzRzI/8j4ma9s6/DkwZVB6chECRCsjrelCXTD4f3trsOD+bmVno/FDiivLXZ/nRqvB787EQJC7fXCIb9y+Tc3zhIiHSNVCC0Ifu3v2hOnz6WXZz80BGG7QThCHxLDKyXhNhPSAlYkARzMx4jgDBXgIpSP8TlNy7WENpPgZSwAU2n3Umk5KAYL//X5u+AsyJoJL8PEKMj5pFLmLfVZFkDkAoJYTiKKAkFEUalnyCmBOKvFTDiExVSjuCPIMLsJVjKlrOP6uIIDUdBIsASHyK8MDsZAycEIHGLg7J/1eS/gBAL2BBPbHwEGAKWzqKchJ3Q9AAAAAElFTkSuQmCC"
  		, bottomRight: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAdCAYAAABIWle8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVhJREFUeNrslDtOxDAQhmeDi22oKGmpOQEtB+AUdNyCikvQIQpoESdYIRqkLaiQFpB4NEHKKsBmHQ+T1Rgmg71xEBXC0qdEif3ljx8DzjlM4XCECACbxAaxTqwRq8SQMERmcNEnpQ06e5hUVUJDA9hLh4JAsp/JguK+MrcsXZLsscigLPIRyzygUnbLHL2+zQfwMLk+EyJUKbuTPU0zuHtZgYvx5Gh/d+uUHlklbA02x1fDqKzIny/vb8bnB3vbJyyqmeDcNTtxR8T2nedMRcyYd75W4r2V8uYYlELmRAcprNRgme7rN4mpiCvTWUZKbWTe0MtKJdMJrcJ/7NucZcSr4E0wi8xRcDWbqmJ4oNx8LpCyVtfwPuNV0ufORX4dlQj0AlSBo5HC5xgunAvZXMlC4tA9SJGX2UCZgYi41aTIy+o+NUgLWoW9Zz1b2jL4xfYv+0uyDwEGAHgZIuiEWNnKAAAAAElFTkSuQmCC"
    };
    
    stripHtml = function (el) {
        var txt = '';
        for (var e in el.childNodes) {
            if (el.childNodes[e].nodeType == 3) {
                txt += el.childNodes[e].nodeValue;
            } else {
                if (el.childNodes[e].nodeName != 'SCRIPT') {
                    if (el.childNodes[e].nodeName == 'BR') {
                        txt += ' ';
                    } else {
                        txt += stripHtml(el.childNodes[e]);
                    }
                }
            }
        }
        return txt;
    }
    

    show = function (pid) {
        var post = document.getElementById(pid);
        var ps = document.getElementById(pid + 'stripped');
        try {
            var dt = post.getElementsByClassName('dt')[0];
            dt.style.display = 'block';
            //dt.setAttribute('style', 'position: relative; height: 100%; opacity: 1; -moz-transition-property: height, opacity; overflow: hidden; -moz-transition-duration: 1s; -moz-transition-timing-function: ease;');
            ps.style.display = 'none';
        } catch (e) {
            // GM_log(e);
        }
    }

    hide = function (pid) {
        var post = document.getElementById(pid);
        var sId = pid + 'stripped';
        var ps = document.getElementById(sId);
        var dt = post.getElementsByClassName('dt')[0];
        if (!ps) {
            ps = document.createElement('div');
            ps.id = sId;
            var text = stripHtml(dt);
            ps.title = text;
            text = text.replace(/\n/g, ' ');
            text = text.replace(/^\s{1,}/, '');
            text = text.replace(/\s{2,}/g, ' ');
            text = text.length > 80 ? text.substr(0, 80) : text;
            text = text.replace(/\s{1,}$/, '');
            text = text.replace(/\.$/, '');
            text += "&#133;";
            ps.innerHTML = text;
            ps.style.MozOpacity = 0.62;
            post.insertBefore(ps, post.getElementsByClassName('dd')[0]);
        }
        // dt.setAttribute('style', 'position: relative; height: 0%; opacity: 0; -moz-transition-property: height, opacity; overflow: hidden; -moz-transition-duration: 1s; -moz-transition-timing-function: ease;');
        dt.style.display = 'none';
        ps.style.display = 'block';
    }

    locate = function (obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return curtop;
        }
    }

    toggle = function (e) {
        var ico = e.target;
        var layerY = e.layerY;
        var post = document.getElementById(ico.id.replace(/ico$/, ''));
        var entry = eval('(' + localStorage.getItem(post.id) + ')');
        //var entry = eval('(' + GM_getValue(post.id) + ')');
        if (entry && entry.rolled) {
            show(post.id);
            ico.setAttribute('src', icoCollapse);
            ico.title = 'Свернуть пост';
            localStorage.removeItem(post.id);
            //GM_deleteValue(post.id);
        } else {
            hide(post.id);
            ico.setAttribute('src', icoExpand);
            ico.title = 'Показать пост';
            var cd = new Date();
            entry = {rolled: true, registered: cd.getTime()};
            //GM_setValue(post.id, JSON.stringify(entry));
            localStorage.setItem(post.id, JSON.stringify(entry));
        }
        window.scrollTo(e.pageX, locate(e.currentTarget) - e.clientY + layerY - 2);
    }
    // event processing
    swap = function (e) {
        var ico = e.currentTarget;
        var post = document.getElementById(ico.id.replace(/remove$/, ''));
        var entry = eval('(' + GM_getValue(post.id) + ')');
        var reg = (new Date()).getTime();
        try {
            if (entry && entry.deleted) {
                if (entry.rolled) {
                    entry.deleted = false;
                    entry.refistered = reg;
                    //GM_setValue(post.id, JSON.stringify(entry));
                    localStorage.setItem(post.id, JSON.stringify(entry));
                } else {
                    //GM_deleteValue(post.id);
                    localStorage.removeItem(post.id);
                }
                delCnt = delCnt > 0 ? delCnt - 1 : 0;
                ico.src = icoDelete;
                ico.title = 'Удалить пост'
            } else {
                var ns = post.nextSibling.nextSibling;
                if (entry && entry.rolled) {
                    entry.deleted = true;
                    registered: reg;
                } else {
                    entry = {deleted: true, registered: reg};
                }
                ico.src = icoRestore;
                ico.title = 'Восстановить пост';
                delCnt++;
                localStorage.setItem(post.id, JSON.stringify(entry));
				GM_xmlhttpRequest({
					  method: 'POST'
					, url: 'http://www.dirty.ru/ratectl/'
				    , data: 'wtf=' + unsafeWindow.voteHandler.wtf + '&id=' + post.id + '&type=1&value=-1'
					, headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					  }
					, onload: function(response) {
						// response.responseText
						var res = eval('(' + response.responseText + ')');
						if (res.status == 'OK') {
							GM_log('WIPED: ' + post.id);
						}
					  }
				});
                // ns.scrollIntoView(true);
            }
            document.getElementById('tabDeleted').innerHTML = 'Удалённое ('+(delCnt)+')';
            post.style.display = 'none';
        } catch (e) {}
    }
    
    encapsulate = function (pid) {
    	try {
	        var post = document.getElementById(pid);
	        var icoRol = new Image();
	        icoRol.addEventListener('click', toggle, false);
	        var si = document.createElement('span');
	        icoRol.style.padding = '0 0 0 4px';
	        icoRol.style.cursor = 'pointer';
	        icoRol.id = pid + 'ico';
	        icoRol.setAttribute('src', icoCollapse);
	        icoRol.setAttribute('src', icoCollapse);
	        icoRol.title = 'Свернуть пост';
	        si.appendChild(icoRol);

	        icoDel = new Image();
	        icoDel.addEventListener('click', swap, false);
	        icoDel.style.padding = '0 0 0 6px';
	        icoDel.style.cursor = 'pointer';
	        icoDel.id = pid + 'remove';
	        si.appendChild(icoDel);
	        icoDel.src = icoDelete;
	        icoDel.title = 'Удалить пост';

	        //var entry = eval('(' + GM_getValue(pid) + ')');
	        var entry = eval('(' + localStorage.getItem(pid) + ')');
	        if (entry && entry.deleted) {
	            icoDel.src = icoRestore;
	            icoDel.title = 'Восстановить пост';
	            post.style.display = 'none';
	            delCnt++;
			} else {
				if (post.getElementsByClassName('vote_button vote_button_minus vote_voted')[0]) {
					var entry = {deleted: true, registered: (new Date()).getTime()};
					localStorage.setItem(pid, JSON.stringify(entry));
					icoDel.src = icoRestore;
					icoDel.title = 'Восстановить пост';
					post.style.display = 'none';
					delCnt++;
				}
			}
	        if (entry && entry.rolled) {
	            icoRol.setAttribute('src', icoExpand);
	            icoRol.title = 'Показать пост';
	            hide(pid);
	        }
	        //var ca = document.getElementsByClassName('dt')[0];
	        //ca.setAttribute('style', 'position: relative; height: 100%; opacity: 1; -moz-transition-property: height, opacity; overflow: hidden; -moz-transition-duration: 1s; -moz-transition-timing-function: ease;');

	        var footer = post.getElementsByClassName('dd')[0];
	        footer.insertBefore(si, footer.getElementsByClassName('vote')[0]);
	        document.getElementById('tabDeleted').innerHTML = 'Удалённое ('+(delCnt)+')';
		} catch (e) {
			//GM_log('ENCAPSULATE SAYS: ' + e);
		}
    }

/*
<div class="threshold_new" style="zoom:1;">
    <a class="threshold_pop_link" href="/all/spicy/">Популярное</a>
    <strong class="threshold_pop_link">Новое</strong>
    <a id="tabDeleted" class="threshold_pop_link" style="text-decoration: underline; cursor: pointer;">Удалённое (18)</a>
</div>
*/      
    swapView = function (e) {
        var obj = e.currentTarget;
        var filter = '';
        var pp = document.getElementsByClassName('post');
        if (obj.id == 'tabDeleted') {
            filter = 'url(#grayscale)';
            for (var p = 0; p < pp.length; p++) {
                var entry = eval('(' + localStorage.getItem(pp[p].id) + ')');
                document.getElementById(pp[p].id).style.display = ((entry && entry.deleted) ? 'block' : 'none');
            }
        } else {
            for (var p = 0; p < pp.length; p++) {
                var entry = eval('(' + localStorage.getItem(pp[p].id) + ')');
                document.getElementById(pp[p].id).style.display = ((entry && entry.deleted) ? 'none' : 'block');
            }
        }
        document.body.style.filter = filter;
        var ph = document.createElement('strong');
        ph.innerHTML = obj.textContent;
        ph.className = 'threshold_pop_link';
        var a = document.createElement('a');
        a.addEventListener('click', swapView, true);
        a.style.textDecoration = 'underline';
        a.style.cursor = 'pointer';
        a.className = 'threshold_pop_link';
        for (var i in obj.parentNode.children) {
            var tab = obj.parentNode.children[i];
            if (tab.nodeName == 'STRONG') {
                a.innerHTML = tab.textContent;
                var tabId = tab.id == 'tabDeleted' ? 'tabDeleted' : '';
                tab.parentNode.replaceChild(a, tab);
                a.id = tabId;
                
                tabId = obj.id == 'tabDeleted' ? 'tabDeleted' : '';
                obj.parentNode.replaceChild(ph, obj);
                ph.id = tabId;
                
                return;
            }
        }
    }

    var nav = document.getElementsByClassName('threshold_new')[0];
    if (nav) {
        var del = document.createElement('a');
        del.id = 'tabDeleted'
        del.className = 'threshold_pop_link';
        del.innerHTML = 'Удалённое';
        del.style.textDecoration = 'underline';
        del.style.cursor = 'pointer';
        del.addEventListener('click', swapView, true);
        nav.appendChild(del);
    }

    // Initialization goes here
    // Posts collection
    var pp = document.getElementsByClassName('post');
    // pp[p].getElementsByClassName('dt')[0].textContent
    for (var p = 0; p < pp.length; p++) {
        encapsulate(pp[p].id);
    }
    
    inflate = function (e) {
        var d = e.currentTarget;
        d.setAttribute('style', 'cursor: pointer; padding: 0 33px; height: 19px; line-height: 19px; -moz-border-radius: 3px; border-width: 1px; border-style: solid; text-decoration: none; font-family: Tahoma; font-size: 12px; color: #999; text-shadow: 0 1px 0 rgba(255,255,255,0.09); border-color: #9a9a9a; background-image: -moz-linear-gradient(center bottom, #EBEBEB 0%, #ECECEC 50%, #F3F3F3 50%, #FFFFFF 100%); -moz-box-shadow: inset 0 1px 0 rgba(255,255,255,1), 0 1px 0 rgba(0,0,0,0.09); text-align: center; vertical-align: middle;');
    }
    deflate = function (e) {
        var d = e.currentTarget;
        d.setAttribute('style', 'cursor: pointer; padding: 0 33px; height: 19px; line-height: 19px; border-width: 1px; border-style: solid; text-decoration: none; font-family: Tahoma; font-size: 12px; color: #ccc; text-shadow: 0 1px 0 rgba(255,255,255,0.09); border-color: Transparent; text-align: center; vertical-align: middle;');
    }
    complete = function () {
        var loader = document.getElementById('pageloader');
        var pp = loader.contentDocument.getElementsByClassName('post');
        var cnt = document.getElementById('contentLoader');
        var jsph = document.getElementById('js-posts_holder');
        var loaded = document.getElementsByClassName('post');

        for (var p in pp) {
            var shown = false;
            for (var l in loaded) {
                if (loaded[l].id == pp[p].id) {
                    shown = true;
                    break;
                }
            }
            if (!shown) {
                var pc = pp[p].cloneNode(true);
                jsph.insertBefore(pc, cnt);
                encapsulate(pp[p].id);
            }
        }
        var newTotalPages = loader.contentDocument.getElementById('total_pages');
        var oldTotalPages = document.getElementById('total_pages');
        var objTotalPages = newTotalPages.cloneNode(true);
        var intTotalPages = new Number(newTotalPages.children[0].firstChild.nodeValue);
        oldTotalPages.parentNode.replaceChild(objTotalPages, oldTotalPages);
        unsafeWindow.pag = new unsafeWindow.Paginator('paginator', intTotalPages, 15, 2, "", true);
        loader.parentNode.removeChild(loader);
        document.getElementById('throbber').src = icoDown;
    }
    load = function (e) {
        var d = e.target;
        d.firstChild.src = throbber;
        var page = document.getElementById('pageloader');
        if (!page) {
            page = document.createElement('iframe');
            page.id = 'pageloader';
            page.style.display = 'none';
            document.body.appendChild(page);
            page.addEventListener('load', complete);
        }
        page.src = 'http://dirty.ru/pages/2';
    }

    var post = document.createElement('div');
    post.id = 'contentLoader';
    post.className = 'post';
    var dt = document.createElement('div');
    dt.className = 'dt';
    dt.setAttribute('style', 'cursor: pointer; padding: 0 33px; height: 19px; line-height: 19px; border-width: 1px; border-style: solid; text-decoration: none; font-family: Tahoma; font-size: 12px; color: #ccc; text-shadow: 0 1px 0 rgba(255,255,255,0.09); border-color: Transparent; text-align: center; vertical-align: middle;');
    dt.innerHTML = "&#9660;";
    dt.addEventListener('mouseover', inflate, true);
    dt.addEventListener('mouseout', deflate, true);
    dt.addEventListener('click', load, true);
    var jsph = document.getElementById('js-posts_holder');
    post.appendChild(dt);
    jsph.appendChild(post);
    
/*
    // Clean up
    var ap = GM_listValues();
    // Threshold date/time
    // Data due is one week
    var tt = (new Date()).getTime() - 7*24*60*60*1000; 
    for (var p in ap) {
        var entry = eval('(' + GM_getValue(ap[p]) + ')');
        var pd = new Number(entry.registered);
        if (pd < tt) {
            GM_deleteValue(ap[p]);
        }
    }
*/
    
    setMenu = function () {
        // alert(1);
    }
    
    desaturate = function (e) {
        svgDocument = e.target.ownerDocument;

        var svgns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(svgns, 'svg');
        var filter = document.createElementNS(svgns, 'filter');
        filter.setAttributeNS(null, 'id', 'grayscale');
        var cm = document.createElementNS(svgns, 'feColorMatrix');
        cm.setAttributeNS(null, 'type', 'matrix');
        cm.setAttributeNS(null, 'values', '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0');
        filter.appendChild(cm);
        svg.appendChild(filter);
        document.body.appendChild(svg);
        
        /*
        for (var i in document.images) {
            document.images[i].style.filter = 'url(#grayscale)';
        }
        */
    }
    
    noscroll = function (e) {
        var k = e.keyCode;
        window.getSelection().removeAllRanges();
        if(k == 27) {
            nodrag(e);
            e.preventDefault();
            return false;
        }
        if(k >= 37 && k <= 40) {
            e.preventDefault();
            return false;
        }
    }
/*
    noselect = function (e) {
        document.body.style.MozUserSelect = 'none';
        window.getSelection().removeAllRanges();
        var k = e.keyCode;
        if(k == 65) { // CTRL+A
            e.preventDefault();
            return false;
        }
    }
*/
    nodrag = function (e) {
        var ol = document.getElementById('overlay');
        ol.style.display = 'none';
        ol.innerHTML = '';
        document.body.style.overflow = 'scroll';
        document.body.style.MozUserSelect = 'all';
        window.removeEventListener('keydown', noscroll, true);
    }
    
    setPopup = function (vid, data) {
    	try {
	    	var td = document.getElementById('data' + vid);
	    	var wrap = document.createElement('div');
	    	wrap.style.zIndex = 999;
	// CONTENT TABLE
	    	var pct = document.createElement('table');
	    	pct.className = 'popup-contents';
	    	pct.setAttribute('style', 'font-size: 12px; line-height: 1.2em; background-color: #fff; color: #666; font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", sans-serif;');
	    	var pcb = document.createElement('tbody');
	    	
	    	for (var d in data) {
		    	var pcr = document.createElement('tr');
	// TH ----------
		    	var pch = document.createElement('th');
		    	pch.setAttribute('style', 'text-align: right; text-transform: lowercase; padding: 0 4px 0 0');
		    	pch.width = 80;
		    	pch.innerHTML = data[d].name + ':';
		    	pcr.appendChild(pch);
	// TD ----------
		    	var pcc = document.createElement('td');
		    	pcc.setAttribute('style', 'text-align: left;');
		    	if (data[d].uri) {
		    		var a = document.createElement('a');
		    		a.href = 'http://www.youtube.com/user/' + data[d].value;
		    		a.target = '_blank';
		    		a.innerHTML = data[d].value;
		    		pcc.appendChild(a);
		    	} else {
		    		pcc.innerHTML = data[d].value;
		    	}
		    	pcr.appendChild(pcc);
		    	
		    	pcb.appendChild(pcr);
	    	}
	    	pct.appendChild(pcb);
	    	wrap.appendChild(pct);
	    	td.appendChild(wrap);
	    } catch (e) {
	    	GM_log('POPUP POPULATE ERROR: ' + e);
	    }
    }

    createPopup = function (el, vid) {
    	try {
	    	var t = document.createElement('table');
	    	t.className = 'popup';
	    	t.style.position = 'absolute';
	    	t.style.display = 'none';
	    	t.style.zIndex = 50;
	    	t.style.borderCollapse = 'collapse';
	    	var tb = document.createElement('tbody');
	    	var tr = document.createElement('tr');
	// TD ----------
	    	var td = document.createElement('td');
	    	td.setAttribute('style', 'height: 15px; width: 19px;');
	    	td.style.backgroundImage = 'url('+bubble.topLeft+')';
	    	td.id = 'topleft';
	    	tr.appendChild(td);
	// TD ----------
	    	td = document.createElement('td');
	    	td.className = 'top';
	    	td.style.backgroundImage = 'url('+bubble.top+')';
	    	tr.appendChild(td);
	// TD ----------
	    	td = document.createElement('td');
	    	td.setAttribute('style', 'height: 15px; width: 19px;');
	    	td.style.backgroundImage = 'url('+bubble.topRight+')';
	    	td.id = 'topright';
	    	tr.appendChild(td);

	    	tb.appendChild(tr);

	    	tr = document.createElement('tr');
	// TD ----------
	    	td = document.createElement('td');
	    	td.className = 'left';
	    	td.style.backgroundImage = 'url('+bubble.left+')';
	    	tr.appendChild(td);
	// TD ----------
	    	td = document.createElement('td');
	    	td.id = 'data' + vid;
	    	// DATA TO BE INJECTED
	    	tr.appendChild(td);
	// TD ----------
	    	td = document.createElement('td');
	    	td.className = 'right';
	    	td.style.backgroundImage = 'url('+bubble.right+')';
	    	tr.appendChild(td);

	    	tb.appendChild(tr);

	    	tr = document.createElement('tr');
	// TD ----------
	    	td = document.createElement('td');
	    	td.setAttribute('style', 'height: 15px; width: 19px;');
	    	td.id = 'bottomleft';
	    	td.style.backgroundImage = 'url('+bubble.bottomLeft+')';
	    	tr.appendChild(td);
	// TD ----------
	    	td = document.createElement('td');
	    	td.className = 'bottom';
	    	td.setAttribute('style', 'text-align: center;');
	    	td.style.backgroundImage = 'url('+bubble.bottom+')';
	    	var tail = new Image();
	    	tail.src = bubble.tail;
	    	tail.width = 30;
	    	tail.height = 29;
	    	tail.alt = '';
	    	tail.setAttribute('style', 'display: block; margin: 0 auto;');
	    	td.appendChild(tail);
	    	tr.appendChild(td);
	// TD ----------
	    	td = document.createElement('td');
	    	td.setAttribute('style', 'height: 15px; width: 19px;');
	    	td.id = 'bottomright';
	    	td.style.backgroundImage = 'url('+bubble.bottomRight+')';
	    	tr.appendChild(td);

	    	tb.appendChild(tr);
	    	
	    	t.appendChild(tb);
	    	
	    	el.appendChild(t);
	    } catch (e) {
	    	GM_log('POPUP ERROR: ' + e);
	    }
    }

    String.prototype.group = function () {
		var rgx = /(\d+)(\d{3})/;
		var str = this.valueOf();
		while (rgx.test(str)) {
			str = str.replace(rgx, '$1' + ' ' + '$2');
		}
		return str;
    }

    process = function (el, res) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(res.responseText, "text/xml");
        var evaluator = new XPathEvaluator();
        var resolver = evaluator.createNSResolver(xmlDoc.documentElement);
        var result = evaluator.evaluate("gd:rating", xmlDoc.documentElement, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        var rating = result.singleNodeValue;
        if (rating) {
            var average = rating.getAttribute('average');
            var max = rating.getAttribute('max');
            var min = rating.getAttribute('min');
            var numRaters = rating.getAttribute('numRaters');
            var likes = 100*(average-min)/(max-min);
            var dislikes = 100-likes;
            
            result = evaluator.evaluate("yt:statistics", xmlDoc.documentElement, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            var stat = result.singleNodeValue;
            var favoriteCount = stat.getAttribute('favoriteCount');
            var viewCount = stat.getAttribute('viewCount');
            
            result = evaluator.evaluate("media:group/yt:duration", xmlDoc.documentElement, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            var duration = result.singleNodeValue;
            var secs = duration.getAttribute('seconds');
			var hours = Math.floor(secs/(60*60));
			var sh = hours < 10 ? '0' + hours : hours;
			var divisor_for_minutes = secs%(60*60);
			var minutes = Math.floor(divisor_for_minutes/60);
			var sm = minutes < 10 ? '0' + minutes : minutes;
			var divisor_for_seconds = divisor_for_minutes%60;
			var seconds = Math.ceil(divisor_for_seconds);
			var ss = seconds < 10 ? '0' + seconds : seconds;
			var total = (hours ? (sh + ':') : '') + (minutes ? (sm + ':') : '') + ss;
			var published = xmlDoc.documentElement.getElementsByTagName('published')[0];
			var tt = published.firstChild.nodeValue;
			var re = /(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d+)?(Z|([+-])(\d\d):(\d\d))/;
			var d = [];
  			d = tt.match(re);
  			
  			var author = xmlDoc.documentElement.getElementsByTagName('author')[0];
  			var autName = author.children[0].firstChild.nodeValue;
  			var autUri  = author.children[1].firstChild.nodeValue;
  			
            // PROCCESS DATA
	    	var data = [
	    		  {name: 'голосов', value: numRaters.group()}
	    		, {name: 'за', value: (new String(Math.round(likes*numRaters/100))).group()}
	    		, {name: 'против', value: (new String(Math.round(dislikes*numRaters/100))).group()}
	    		, {name: 'оценка', value: Math.round(100*average)/100}
	    		, {name: 'в закладках', value: favoriteCount.group()}
	    		, {name: 'просмотров', value: viewCount.group()}
	    		, {name: 'длина', value: total}
	    		, {name: 'дата', value: d[3] + '.' + d[2] + '.' + d[1]}
	    		, {name: 'автор', value: autName, uri: autUri}
	    	];
	    	var vid = el.id.replace(/overlay/, '');
            setPopup(vid, data);

            var layer = document.createElement('div');
            with (layer.style) {
	            border = '1px solid #CCCCCC';
	            borderRadius = '3px 3px 3px 3px';
	            width = '120px';
	            height = '4px';
	            margin = '1px 0';
	            overflow = 'hidden';
	            cssFloat = 'right';
            }

            if (likes > 0) {
                var dl = document.createElement('div');
                with (dl.style) {
	                cssFloat = 'left';
	                backgroundColor = '#006600';
	                borderRight = '1px solid #FFFFFF';
	                width = Math.round(12*likes/10) + 'px';
	                height = '4px';
                }
                layer.appendChild(dl);
            }
            if (dislikes > 0) {
                var dd = document.createElement('div');
                with (dd.style) {
	                cssFloat = 'right';
	                backgroundColor = '#CC0000';
	                width = Math.round(12*dislikes/10) + 'px';
	                height = '4px';
	                marginRight = '-1px';
                }
                layer.appendChild(dd);
            }
            el.appendChild(layer);
        }
    }

    Function.prototype.bind = function( thisObject ) {
        var method = this;
        var oldargs = [].slice.call( arguments, 1 );
        return function () {
            var newargs = [].slice.call( arguments );
            return method.apply( thisObject, oldargs.concat( newargs ));
        };
    }

/*
<object width="425" height="350">
    <param value="http://www.youtube.com/v/38kv5phyAOg?fs=1" name="movie">
    <param value="transparent" name="wmode">
    <param value="true" name="allowFullScreen">
    <embed width="425" height="350" wmode="transparent" type="application/x-shockwave-flash" allowfullscreen="true" src="http://www.youtube.com/v/38kv5phyAOg?fs=1">
</object>
*/  
    overlay = function (e) {
        if (e.layerX <= 120 && e.layerY <= 90) {
            var ico = new Image();
            ico.src = icoClose;
            var pw = 480;
            var ph = 360;
            var ol = document.getElementById('overlay');
            ol.setAttribute('style', 'position: absolute; left: 0px; width:100%; height:100%; text-align: center; z-index: 1000; background-color: black; display: block; background: rgba(0, 0, 0, 0.62)');
            ol.style.top = self.pageYOffset + 'px';
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', noscroll, true);
            ol.addEventListener('mousedown', nodrag, true);

            var obj = document.createElement('object');
            obj.style.position = 'absolute';
            obj.style.top  = '50%';
            obj.style.left  = '50%';
            obj.style.marginTop  = '-' + (ph/2) + 'px';
            obj.style.marginLeft  = '-' + (pw/2) + 'px';
            obj.width = pw;
            obj.height = ph;
            
            var el = e.currentTarget;
            // background-image:url(http://img.youtube.com/vi/38kv5phyAOg/2.jpg);
            GM_log('OVERLAY ID: ' + el.id);
            var vid = el.id.replace(/^ytthumbnail/, '');

            var param = document.createElement('param');
            param.value = 'http://www.youtube.com/v/' + vid + '?fs=1&autoplay=1';
            param.name = 'movie';
            obj.appendChild(param);

            param = document.createElement('param');
            param.value = 'transparent';
            param.name = 'wmode';
            obj.appendChild(param);

            param = document.createElement('param');
            param.value = 'true';
            param.name = 'allowFullScreen';
            obj.appendChild(param);

            var embed = document.createElement('embed');
            with (embed) {
	            width = pw;
	            height = ph;
	            wmode = 'transparent';
	            type = 'application/x-shockwave-flash';
	            allowfullscreen = 'true';
	            modestbranding = '1';
	            rel = '0';
	            showinfo = '0';
	            showsearch = '0';
	            src = 'http://www.youtube.com/v/' + vid + '?fs=1&autoplay=1';
            }
            obj.appendChild(embed);
            ol.appendChild(obj);
            
            with (ico.style) {
	            position = 'absolute';
	            left = '50%';
	            top = '50%';
	            marginTop  = '-' + (ph/2) + 'px';
	            marginLeft = (pw/2) + 'px';
	            sIndex = '9999';
	            cursor = 'pointer';
            }
            ico.addEventListener('click', nodrag, false);
            ol.appendChild(ico);
            window.getSelection().removeAllRanges();
        }
    }
    
    toggleImage = function (e) {
    	var img = e.currentTarget;
    	var wh = img.getAttribute('dimensions').split(/x/);
    	if (img.getAttribute('collapsed') == 'yes') {
    		img.setAttribute('style', 'opacity: 1; width: '+wh[0]+'px; height: '+wh[1]+'px; -moz-transition-property: width, height, opacity; -moz-transition-duration: 1s; -moz-transition-timing-function: ease; cursor: url('+cur+'),default;');
    		img.setAttribute('collapsed', 'no');
    	} else {
    		img.setAttribute('style', 'opacity: .62; width: '+Math.round(wh[0]/4)+'px; height: '+Math.round(wh[1]/4)+'px; -moz-transition-property: width, height, opacity; -moz-transition-duration: 1s; -moz-transition-timing-function: ease; cursor: url('+cur+'),default;');
    		img.setAttribute('collapsed', 'yes');
    	}
    }

	var res = document.evaluate("//div[@class='dt feedtype_']/p/img", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (res){
	    for (var i=0, len=res.snapshotLength; i < len; i++) {
	    	res.snapshotItem(i).addEventListener('click', toggleImage, false);
	    	res.snapshotItem(i).id = res.snapshotItem(i).parentNode.parentNode.parentNode.id + 'image';
	    	res.snapshotItem(i).setAttribute('dimensions', res.snapshotItem(i).width + 'x' + res.snapshotItem(i).height);
	    	res.snapshotItem(i).setAttribute('style', 'opacity: 1; width: '+res.snapshotItem(i).width+'px; height: '+res.snapshotItem(i).height+'px; -moz-transition-property: width, height, opacity; -moz-transition-duration: 1s; -moz-transition-timing-function: ease;');
	    	res.snapshotItem(i).addEventListener('load', toggleImage, false);
	    }
	}

    
    var pv = document.getElementsByClassName('post_video');
    for (var v = 0; v < pv.length; v++) {
    	
        var rr = document.createElement('div');
        rr.style.backgroundColor = 'Transparent';
        rr.style.width = '230px';
        // rr.style.height = 'auto';
        rr.style.position = 'absolute';
        rr.style.left = '-110px';
        rr.style.top = '0px';
        rr.style.zIndex = 0;
        var thc = document.createElement('div');
        //thc.style.border = '1px Solid Red';
        thc.style.width = '120px';
        thc.style.cssFloat = 'right';
        thc.style.height = '90px';
        thc.style.overflow = 'hidden';
        var thn = new Image();
        thn.className = 'trigger';
        thn.style.cursor = 'pointer';
        thn.addEventListener('click', overlay, true);
        thc.appendChild(thn);
        rr.appendChild(thc);
        pv[v].appendChild(rr);
        pv[v].style.minHeight = '96px';
        var vid = pv[v].getAttribute('style').replace(/^.*\/vi\/(.{11})\/.*/, '$1');
        thn.src = 'http://img.youtube.com/vi/' + vid + '/2.jpg';
        thn.id = 'ytthumbnail' + vid;
        rr.id = 'overlay' + vid;
        rr.className = 'bubbleInfo';
        // rr.style.overflow = 'hidden';
        
		createPopup(rr, vid);

        GM_xmlhttpRequest({
                      method: 'GET'
                    , url: 'http://gdata.youtube.com/feeds/api/videos/' + vid
                    , onload: process.bind( {}, rr )
                });
    }
    
// popup processing

	$('.bubbleInfo').each(function () {
		var distance = 10;
		var time = 250;
		var hideDelay = 500;

		var hideDelayTimer = null;

		var beingShown = false;
		var shown = false;
		var trigger = $('.trigger', this);
		var info = $('.popup', this).css('opacity', 0);


	    $([trigger.get(0), info.get(0)]).mouseover(function () {
	        if (hideDelayTimer) clearTimeout(hideDelayTimer);
	        if (beingShown || shown) {
	            // don't trigger the animation again
	            return;
	        } else {
	            // reset position of info box
	            beingShown = true;

	            info.css({
	                  top: -155
	                , left: 55
	                , display: 'block'
	            }).animate({
	                  top: '-=' + distance + 'px'
	                , opacity: 1
	            }, time, 'swing', function() {
	                beingShown = false;
	                shown = true;
	            });
	        }
	        return false;
	    }).mouseout(function () {
	        if (hideDelayTimer) clearTimeout(hideDelayTimer);
	        hideDelayTimer = setTimeout(function () {
	            hideDelayTimer = null;
	            info.animate({
	                  top: '-=' + distance + 'px'
	                , opacity: 0
	            }, time, 'swing', function () {
	                shown = false;
	                info.css('display', 'none');
	            });

	        }, hideDelay);

	        return false;
	    });
	});
	
	document.getElementsByClassName('header')[0].style.zIndex = 0;
	document.getElementsByClassName('posts_threshold')[0].style.zIndex = 0;
	document.getElementsByClassName('content_left')[0].style.zIndex = 10;
	
	document.getElementsByClassName('header_tagline_inner')[0].style.MozBoxShadow = '0 0 5px #888';

    // video overlay
    var vol = document.createElement('div');
    vol.id = 'overlay';
    vol.style.display = 'none';
    document.body.appendChild(vol);
    
    window.addEventListener("pageshow", desaturate);
    
    // GM_registerMenuCommand ("Blah-blah-blah", setMenu);

/*
    for (var i in document.images) {
        document.images[i].style.filter = 'url(#grayscale)';
    }
*/
})();

