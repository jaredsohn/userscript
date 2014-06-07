// ==UserScript==
// @name           Dirty.ru favico's
// @author         Vacuum
// @namespace      Nothing
// @description    dirty.icos
// @include        http://dirty.ru/*
// @include        http://www.dirty.ru/*
// @include        http://leprosorium.ru/*
// @include        http://www.leprosorium.ru/*
// ==/UserScript==

	var url_reg = new RegExp(/(http:\/\/.*?)\/.*/);

	elements = document.getElementsByTagName('div');

	for (i=0;i<elements.length;i++) {
		
		if (elements[i].className=='dt') {

			aelements = elements[i].getElementsByTagName("a");
			for (j=0;j<aelements.length;j++) {
				if (!aelements[j].getAttribute("href").match(new RegExp(/(comments|banned)/))) {
					ico_src=aelements[j].getAttribute("href").match(url_reg)[1];
					
					aelements[j].setAttribute("onMouseOver",'this.setAttribute("style","padding-top: 16px;background-image:url('+ico_src+'/favicon.ico);background-repeat:no-repeat")');
					aelements[j].setAttribute("onMouseOut",'this.setAttribute("style","background:none")');
				}
			}
			
		}
	}