// ==UserScript==
// @name           QGForo
// @namespace      quegrande.org
// @description    Cosillas para facilitarme la vida en el foro
// @include        *quegrande.org/foro/*
// ==/UserScript==

(function(){
	
	function getElementsByClassName(classname, node) {
		if(!node) node = document.getElementsByTagName("body")[0];
		var a = [];
		var re = new RegExp('\\b' + classname + '\\b');
		var els = node.getElementsByTagName("*");
		for(var i=0,j=els.length; i<j; i++)
			if(re.test(els[i].className))a.push(els[i]);
		return a;
	}

	var doc = unsafeWindow.document;
	var urlForo = 'http://quegrande.org/foro/';


	if ((new RegExp("&qgmode=gotoindex$").test(doc.location))||(new RegExp("mode=log(in|out)").test(doc.location))) {
		doc.location=urlForo;
	}
	else if (new RegExp("&mark=topics$").test(doc.location)) {
		doc.location=new String(doc.location).split('&mark=topics')[0];
	}
	else if (new RegExp("&qgmode=backforum$").test(doc.location)) {
		var aux=(new String(doc.location).split('&')[0]).split('viewtopic');
		doc.location = aux[0]+'viewforum'+aux[1];
	}
	else if (new RegExp("viewforum.php").test(doc.location)) {
		var aux=doc.getElementsByTagName('dl');
		for (var i=1; i<aux.length; i++) {
			var row = aux[i];
			if (new RegExp('\\bicon\\b').test(row.className)) {
				var a = row.getElementsByTagName('a');
				// hay post sin leer
				if ((a.length>0)&&(new RegExp("unread$").test(a[0].href)))
					row.setAttribute("ondblclick",
					"self.document.location='"+a[a.length-1].href+"&qgmode=backforum';");
			}
		}
	}
	else if (new RegExp("(viewtopic.php)|(posting.php)").test(doc.location)) {
		// Decid adiós malvados scroll en attach images muahahahahah
		var attachImg=getElementsByClassName('attach-image',doc);
		var len = attachImg.length;
		var maxImgLen=window.innerWidth-360;
		if (len>0) {
			for (var i=0; i<len; i++) {
				var obj=attachImg[i];
				obj.className="";
				var img=obj.getElementsByTagName('img')[0];
				if (img.width>maxImgLen) {
					img.style.cursor='pointer';
					img.setAttribute("onclick", "self.document.location='"+img.src+"';");
				}
			}
		}
		// Decid adiós imagenes impías que no cabeis a lo ancho
		doc.getElementsByTagName('body')[0].innerHTML+='<style type="text/css">img {max-width:100%;}</style>';
	}
	else if (new RegExp("foro/(index\.php)?$").test(doc.location)) {
			
		var sub=getElementsByClassName('row',doc);

		for (var i=0; i<sub.length; i++) {
			var row = sub[i];
			var url = row.getElementsByTagName("a")[0].href+'&mark=topics&qgmode=gotoindex';
			row.setAttribute("ondblclick", "self.document.location='"+url+"';");
		}	
	}

})();