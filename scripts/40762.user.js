// ==UserScript==
// @name Script for DSVLoad.net 
// @author Dantes (Dantesik at www.dsvload.net, Mexican at Userscripts.org)
// @namespace dsv
// @version 1.3
// @description Script for DSVLoad.net by Dantes (Dantesik at www.DSVLoad.net, Mexican at Userscripts.org)
// @source http://userscripts.org/scripts/show/40762
// @identifier http://userscripts.org/scripts/show/40762.user.js
// @include http://dsvload.net/index.php?newsid=*
// @include http://www.dsvload.net/index.php?newsid=*
// @include http://dsvanime.ru/*.html
// @include http://www.dsvanime.ru/*.html
// @include http://www.dsvero.com/*.html
// @include http://dsvero.com/*.html
// ==/UserScript==

var VERSION = '1.3';

//Чего за сайт такой 0 - DSVLoad
var sait = 0;
    if (location.href.indexOf('dsvanime.ru')>0) sait = 1;
    if (location.href.indexOf('dsvero.com')>0) sait = 2;
    
//document.getElementById
function get(aID) {if (aID != "") {return document.getElementById(aID);} else {return undefined;}}

//Создаем элемент
function elem(tag){
	var el = document.createElement(tag);
    if (tag == 'table') {
    	el.setAttribute('width', '100%');
	    el.setAttribute('border', '0');
	    el.setAttribute('align', 'center');
	    el.setAttribute('cellpadding', '0');
	    el.setAttribute('cellspacing', '0');
	    var aStyle = 'font-family: Tahoma,Verdana; font-size: 11px; font-weight: normal; text-decoration: none; text-align: center; color: #000000;';
	    el.setAttribute('style', aStyle);
    }
    if (tag == 'a') {
	    var aStyle = 'font-family: Tahoma,Verdana; text-decoration: none; color: #000000;';
	    el.setAttribute('style', aStyle);
    }
    if (tag == 'td'){
    	var aStyle = '';
	    el.setAttribute('style', aStyle);
    }
    if (tag == 'span'){
    	var aStyle = 'font-weight: bold; text-decoration: underline; cursor: pointer;';
	    el.setAttribute('style', aStyle);
    }
      
	return el;
}

//Убиваем элемент
function removeElement(aElem) {
		if (aElem) { if (aElem.parentNode) { aElem.parentNode.removeChild(elem);}}
}

//Убиваем всех child
function removeAll(aElem) {
		if (aElem) { while (aElem.firstChild) aElem.removeChild(aElem.firstChild);}
}
	
//Убиваем табличку
function removeTable() {
	return function()   {
	 var aBig = get('big');
	 while (aBig.firstChild) aBig.removeChild(aBig.firstChild);  
	} 
}

//Определяем чего за сайт, 0 - DSVLoad
var sait = 0;
    if (location.href.indexOf('dsvanime.ru')>0) sait = 1;
    if (location.href.indexOf('dsvero.com')>0) sait = 2;
    
var image = Array();

	image["korz"] = 'data:image/gif;base64,' +'R0lGODlhEwAeANUAAGKp2mSt3nC+8mu46my36mq26F+m12Cl112j02Wu3m257WSu3miy5GKq2m++8Wmz5WCm11+k1W267W+98Waw4G677m257F+k1G+772ey42m05l+l1W+88Gy46mew4WOq2Wu362267F6k1Gy462+88WOq2l6j1G+77l+l1GWu32Kp2Wu36l6k02Or216k1WOs22Kn2GGn2GOr3G+98G6772mz5mCm1mGo2GOs3Giy416j02aw4W++8mq16F2i0nC/8yH5BAAAAAAALAAAAAATAB4AAAb/QJ/ucrgBcAsKo1YAWSozwe8nFNluDVzCw9AUBgraREpFRK6qVopb64ExE95U6ILAGrLFbul+zuRUOhEGNyV5HhkPPSthHA5zOhsQMSpaFBltBBIYM49UJhcGlDIBFDkPBQQhJxyAQmcxRwE7OV5ONCSuOiKTDS2zmD0jITSOc2Y2MR8yCTvBYBVxxyJFeFs5bR0SYp4+CCjJWQmmiqqcrt9XHy/Npz0dYX+QF5OySl4dT7nTB7Fae6g0QekmaFIJJKY0uFFQgQMZHyY2XBHHpsCIMCQIXrBxR0YKWm2cnIMksVAeZyHjdUNQ8oieRIuItTq28cayNbUsKuC0cpCRXRd63BGwIEYXPSxIaHlZYeHEmGMoIBT6h+1dCCiuWGwQBYAUyHcSsM6JKHXZAkQKR2zbF+jMjUpJgmk7EQWSi2SyaCkCUyzrhiIqmO1RCGKbtEDglHnFlmpT3R9BAAA7';

    image["yes1"] = 'data:image/gif;base64,' +'R0lGODlhGQAYAHAAACH5BAEAAP8ALAAAAAAZABgAh4wZGa3v7wAACCkZa63elAgZa4zelGuMnO/v5kprnClKWq3W3mut3ozO3mutnM7v3kqMnIyt3iEpGSEIGYytnGtrWq2t3s7O3ozv5kprWoyMnClrWilrnEpKWmtrnCkZQmuM3mvv3mtr3u9r3u/vWmvvWu9rWinv3ilr3q1r3q3vWinvWq1rWu+t3msp3mspWikp3u8p3u+tWmutWu8pWimt3q0p3q2tWimtWq0pWq3ete/vnK2tnClrGWtrGWvvnO9rnO/vGWvvGe9rGSnvnK1rnK3vGSnvGa1rGe+tnGspnGspGSkpnO8pnO+tGWutGe8pGSmtnK0pnK2tGSmtGa0pGUqtnAhrWkqt3ghrnErv3kpr3s5r3s7vWkrvWs5rWgjv3ghr3oxr3ozvWgjvWoxrWs6t3kop3kopWggp3s4p3s6tWkqtWs4pWgit3owp3oytWgitWowpWs7vnAhrGUprGUrvnM5rnM7vGUrvGc5rGQjvnIxrnIzvGQjvGYxrGc6tnEopnEopGQgpnM4pnM6tGUqtGc4pGQitnIwpnIytGQitGe/O3kpKnIyM3mtKWq2M3ilKnGtKnAgZQmvO3mtK3u9K3u/OWmvOWu9KWinO3ilK3q1K3q3OWinOWq1KWu+M3msI3msIWikI3u8I3u+MWmuMWu8IWimM3q0I3q2MWimMWq0IWozete/OnK2MnClKGWtKGWvOnO9KnO/OGWvOGe9KGSnOnK1KnK3OGSnOGa1KGe+MnGsInGsIGSkInO8InO+MGWuMGe8IGSmMnK0InK2MGSmMGa0IGQhKWkqM3ghKnErO3kpK3s5K3s7OWkrOWs5KWgjO3ghK3oxK3ozOWgjOWoxKWs6M3koI3koIWggI3s4I3s6MWkqMWs4IWgiM3owI3oyMWgiMWowIWs7OnAhKGUpKGUrOnM5KnM7OGUrOGc5KGQjOnIxKnIzOGQjOGYxKGc6MnEoInEoIGQgInM4InM6MGUqMGc4IGQiMnIwInIyMGQiMGQghGQAAAAj/AP8JHEjQwgEFGSIQXMhQoAYFECMpiLSh0YYEDRluUMABAoQDDg4cgJAAIcaMBy+CjNCKAUsHIUlmaHgwwQEKGBA8QKBzQYMGEUIm2MBQQQIHDHbqXIogQAAMHyg5SHBSoFEIDnY+ULr0QQANAhowmEpBYEmsAXjy9OrUKYVHAgI0oEDS6lEGa5u2dbpAw4S4GIBCELgBa4Ole9lqyCAg7tOgByxkgBBhQVq2eylUaKzA6U8GCSBkOPAzAOYGbPn8NbW3QcgMCaxE2BuAwge3HQR0oB0YgoaPrTDwrbC582YJvAMwOPAvdIQGbQ80FkAhN23PEQYrAEm7QWOwDq4HYXagMDQDBrQdNJ5geq/wBswFNiIP3alXxsKvNwDhYOCBow3k11Zn4jGgzEIeuSSgeE/x15BN9GEgoHDvjaVQQx6BwAB0ElIoFgjxZfSPBVgdoIyGKC53oYgEjfTRSJFlFBAAOw==';
    
    image["yes2"] = 'data:image/gif;base64,' +'R0lGODlhGQAYAHAAACH5BAEAAP8ALAAAAAAZABgAhyEZGQAAACljWq3v5ilrGa3elAhrWghrGYzelGuMnClCWkprnGut3u/v5ozO3kqMnGutnM7v3mtrWoyMnIytnIyt3ikZawgZa0prWq2t3s7O3ilCGUpKWilrnIzv5oxrWmuM3ozetWvv3mtr3u9r3u/vWmvvWu9rWinv3ilr3q1rWq1r3q3vWinvWu+t3mspWmsp3ikp3q0pWu8p3u+tWmutWu8pWimt3q0p3q2tWimtWq3eta2tnO/vnGtrGWtrnK1rGWvvnO9rnO/vGWvvGe9rGSnvnK1rnK3vGSnvGe+tnGspGWspnCkpnK0pGe8pnO+tGWutGe8pGSmtnK0pnK2tGSmtGUqtnEqt3ghrnErv3kpr3s5r3s7vWkrvWs5rWgjv3ghr3oxr3ozvWgjvWs6t3kopWkop3ggp3owpWs4p3s6tWkqtWs4pWgit3owp3oytWgitWs7vnEprGYxrGUrvnM5rnM7vGUrvGc5rGQjvnIxrnIzvGQjvGc6tnEopGUopnAgpnIwpGc4pnM6tGUqtGc4pGQitnIwpnIytGQitGQhCWkpKnO/O3mtKWoyM3q2M3ghCGSlKnIxKWmvO3mtK3u9K3u/OWmvOWu9KWinO3ilK3q1KWq1K3q3OWinOWu+M3msIWmsI3ikI3q0IWu8I3u+MWmuMWu8IWimM3q0I3q2MWimMWq2MnO/OnGtKGWtKnK1KGWvOnO9KnO/OGWvOGe9KGSnOnK1KnK3OGSnOGe+MnGsIGWsInCkInK0IGe8InO+MGWuMGe8IGSmMnK0InK2MGSmMGUqM3ghKnErO3kpK3s5K3s7OWkrOWs5KWgjO3ghK3oxK3ozOWgjOWs6M3koIWkoI3ggI3owIWs4I3s6MWkqMWs4IWgiM3owI3oyMWgiMWs7OnEpKGYxKGUrOnM5KnM7OGUrOGc5KGQjOnIxKnIzOGQjOGc6MnEoIGUoInAgInIwIGc4InM6MGUqMGc4IGQiMnIwInIyMGQiMGa3O3ikZQggZQggZEAAAAAj/AP8JHEgwQwIFGCoQXMhQ4AQBAiRFjIhBwIKGDCFKWvAggccECxZIwnARY4KIHSFQYOAgBAMKECCExNDwIIYEEPZFaMBzwgAHDipAANkh44IEDBrs3EkhQIMBHgZsYCCT5kCEDyoMUMozwg9/OwdMCOBSJgWBCwQ8yNn16QR/AQYMoMAhbtCTAhUcpcTV7Z4AcfftAQAAKl0FAtVCcND15we4hSdgACx3jz8OCTIISFAhqtIBHxQE4DdXAmAFYk2TfHAz6B+5DiQkKDzgB4AAP36+DaCAdUcKbxMMkDCB9Ny6GCr/ATwUZIINgAF4kGBawIDByUsHkF7hwb+jDCYHm9gjGjAF4LS/xvXgwPtmSg5Ew60A+McGfgGCjgsQtQKIsxwtNsBtFEQAQXSA9QNOAIxA1d5AN3U2QD9yDbBAXAkE8Ac//kC1DwgQDJTAWhJWOABqA4in1QAMeEfQAz+w5EFUJkYlAGoegMBAQx0xUIEDUEVFo4NUKcSjRzIGCVUF/iWA0UD7dJQACCD4x4CO/z3J0IgdSbkPRgEBADs=';
    
    image["l1"] = 'data:image/gif;base64,' +'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';
    
    image["del"] = 'data:image/gif;base64,' +'R0lGODlhJgAkAHAAACH5BAEAAP8ALAAAAAAmACQAhwAAAK339xlCWpTv5hkZOmutpZTW3kqMnEpzjEpSlIyUpYy1rRkhEK2UpWtazu/eEClazq3eEEopUmsZzu+cECkZzq2cEEprGUpazs7eEAhazozeEEoIUkoZzs6cEAgZzoycEEpKGc7v5oy13mut3u/372NrWmNKWilrlGspGRlrKa2U5q3mnO/W5msIGRlrCIyU5ozmnAhrWggZY63e5ilKlGtrlGuM3q21pc7O5mvv3mta7+9r3u/vY2vvWu9rWu/eMSnv3q1r3invWq1rWila763eMWspUu8p3q3vY2utWu8pWimt3q0p3imtWq0pWmsZ7++cMSkZ762cMWsplCkplGtrGWvvnO9rnO+tY2vvGe9rGSnvnK1rnCnvGa1rGe8pnK2tY2utGe8pGSmtnK0pnCmtGa0pGe/vpe+tpUqtnEqt3ghrlErv3s5r3s7vY0rvWs5rWgjv3oxr3gjvWoxrWs4p3ozvY0qtWs4pWgit3owp3gitWowpWkoplAgplErvnM5rnM6tY0rvGc5rGQjvnIxrnAjvGYxrGc4pnIytY0qtGc4pGQitnIwpnAitGYwpGc7vpc6tpWtKlGvO3kpa7+9K3u/OY2vOWu9KWs7eMSnO3q1K3inOWq1KWgha74zeMWsIUu8I3q3OY2uMWu8IWimM3q0I3imMWq0IWkoZ786cMQgZ74ycMWsIlCkIlGtKGWvOnO9KnO+MY2vOGe9KGSnOnK1KnCnOGa1KGe8InK2MY2uMGe8IGSmMnK0InCmMGa0IGe/Ope+MpUqM3ghKlErO3s5K3s7OY0rOWs5KWgjO3oxK3gjOWoxKWs4I3ozOY0qMWs4IWgiM3owI3giMWowIWkoIlAgIlErOnM5KnM6MY0rOGc5KGQjOnIxKnAjOGYxKGc4InIyMY0qMGc4IGQiMnIwInAiMGYwIGc7Opc6MpUJKUkJrWq213muMrUIpGRlCKSljWozeve+t5q3mvc6t5kIIGRlCCO+M5s6M5hkIECkZY2uMjAAZEAAAAAj/AP8JHEiQYIkcCxDUEFDjHY0SBSNKlFjiXQ15NdohkIfAhLwEGBHkmEiS4DuM7TLWSIAAAQoELNuBRDCipEQFF2ci6MezZ78D/Vq2ZHfAJsGNH3f2e1egwIIFJKAuKPAuqNAaNIwyZMmzAIl5I2gYGDsC7AipP1u2q0nyI0eeUWm0KEG3hIgcNGjMGyv1ndCsElEIaNmvwIh6dEXYrUs3r9ixTqu2HFlwQUYETBc8VLxYsecSAQLkNTDCwIIbViMKeGv4YeLEOe7mCBBbtOixX98dQLDgaI2dTjd3zpHDXV53CmycsBE6NN8RuhEMLCFAI9MRixMbDyBCRGgRBtgB/2Bne4DYqH7fCVQIPCxnES2Md2/eXES8fQRsP55H9QDEjEstME8OiwXgjgnwjPAdd6EBsA8C+/QTmnmkQUeTCCAVNoKCirWAQ1j+7KMAfQHsAw95+wAwgG1kFRDUCBwdYNg8rtHAnGgMnDCCdyLswwB5Iizgzzuh0TCAAWDp1k8NPC0wVmg59GPDfP2YcEI/IhDAAALehbYPeUUiCV1Q7RzAlAF5BTBCCAvQpwADDPiIZX3x5BeAeQNsSJVGQG1oAHcLEEDDggEY4KMAXXYpwD7NjTbPAlYFiOaKC8DTZqMAxBkhfSIwYOedYo1AFQzy/OQkmqLtkwBtXvrIzj4R8v8YgD9ginakAe841JJhYw3aYzzf+ciAd+x4KmEABwBQwISPQecfV7wOGkA/ALzTKQH7dBlAsQxgCQAAjRZqWq7/tHSdAea1CiejC4qAQJwEKFskqCOQYO0/C6BQWAG9Oucgu9pyV8C35ElLoajqrYeZn0YOasC37fwpK7UAyENfwwbc8A5b/yiw66nShhbPt1/KwwDJCFxMob0FFPTTOySUhuagDi8KLwHHMnvbCDcUANhAOZjL71grhkzixbaS1jPHBOWw28ZjoZvu0SQaqTRVJDmt24alGYnnnXcWjS6aN5BQQFElBf3TDWD1imfDbyu9ALlGubvUOzf42WvUoZI4UDYJB/xs1D8jYEbVDWXnvSEJMJSN8DstDF5QCSMcYKZTZpcNVX/vUCa5RDn4ZbnoZh7gDkQ2BQQAOw==';

    image["refr"] = 'data:image/gif;base64,' + 'R0lGODlhEgARAPcAAAAAABpAthlDuRlHvBpIvCZGtyNJuRlLwBpMwBhQxBhUyBhZzBde0Bdi1BZn2BZr3Bds3BZv3xdw3x9x3RVy4hV15RV35x575iJTwiRhziNm0j9oyiF+6Epkwkh30keC20WS62eM12iD0GiG0nuP03qU13yS1Xqa3GWa5GWg6GWh6nmm53qs63mu7niv74ag3YWw66S55ae96Ki55bG846fC7K3E6q3K76fG8KfJ8rDA57DJ773L6rDM8rfN8LbR9LzS88rT68rT7MnZ8dXc7tfe79je79nf8Nvh8Nzi8d7j8t/k8uDl8uHm8+Po9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAASABEAAAjjAP8JFFgkCZMmTZgkGYjkxsB/RJT0cAGCAwcQLnosUfLDAhOBRoa0uFChpMkLLXKUdCJwiAoKMGPKjMlSCYsIESSkwCEQRwoJOHE6KbJjwgMIMJoMbALk6IOnTpKscOAAhdKBPqhqdeCEyYcGDWoYGWgDrFmwS5poYMDg4b8jTJzIlbvkX5MMCxa43TuQiQcFCmTw3ZvkRIIEIa4OJJIkxsKBOjAcQPBCsd0XCDbwGKikxIABBEbMEDhjBIHPJR4KESGgtevXIoS4DWLCQIDbuA2YCMJXCQ0SHQoU6ECChpKHAQEAOw==';

	image["home"] = 'data:image/gif;base64,' + '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';
    
    image["copy"] = 'data:image/gif;base64,' + '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';
    
	image["down"] = 'data:image/gif;base64,' + 'R0lGODlhDwARANUAAAAAAP///2loalxcYX19f5qam4qKiz5DSJOUlbG0to6Pj7K/vaWpqFBSUcTFxKKjom6Da1ieSlGwNiuUBnbAXillEmO2QVhvS1CpCZvaYU5rMmO2CkmICW7JE5yuiURSL4ePcGZoNXJycWFhYEI9KHp1YUkxFN3d3dXV1f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACkALAAAAAAPABEAAAaJwJSQAIIYL8iDcJkaZDKUqGTSYApHFotks5lUPtbUSIIpY7xg65hc5kzSTKy5W7mEQRYMtzyxLw0iHhZcexgRIgopAhFZe4VeFQIOAhNlXB0bZRUVIwspCSOVl5mbDQ9LDBeWmBwVJAVWCBp6G60mBGEpBrOtJLi5KQQhriLAQiclHwIoxksCuUEAOw==';
	
	image["up"] = 'data:image/gif;base64,' + 'R0lGODlhDgAQANUAAAAAAP///5oKD2loalxcYX19f5qam4qKi1dncr3DxsnNz46Pj6WpqMTFxKKjopGTfmZoNWFhYMC+o/zmZY2FWOvHDvvTMLepdO+0EcGQFhIPCOmrKnRVGqSTdkkxFPmHDPtYDK9ULb45FIM3J+8ZD7u7u////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAAAOABAAAAZyQJNwWDAMj8fDg8JAHg2PyQRScpoYA6llE1EgGxEtBpMZIAeSiaXywXxChaHjMtl87h8QiLMwGTp1bnl6ICQjCQQbgoSFJCICBCYDEYwklpAIRyKNliQeTiGcJAIjoJ2XpUghp6OfSCKspE4CtLUariZBADs=';
	
	image["load"] = 'data:image/gif;base64,' + 'R0lGODlhTAAIAKIGAMbr4IzWwVLCoRitgjyEdv///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAGACwAAAAATAAIAAADJ0i63P4wyjmLvTjrzbv/nAKOZGli4qmua8q+cOfGND3XeEvtfO87CQAh+QQFCgAGACwCAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACwHAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACwMAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACwRAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACwWAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACwbAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACwgAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACwlAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACwqAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACwvAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACw0AAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACw5AAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACw+AAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACxDAAIABwAEAAADCTg61rbMQfdWAgAh+QQFCgAGACwAAAAAAQABAAADAmgJACH5BAUAAAYALAIAAgBIAAQAAAMlKCq27G1FNZ+E+GqaqfmdxW1iWZ0hSn7gmr5uPM4mC9Mqfpt7AgAh+QQFAAAGACwCAAIASAAEAAADJRgatuxtRTWfhPhqmqn5ncVtYlmdIUp+4Jq+bjzOJgvTKn6bewIAIfkEBQAABgAsAgACAEgABAAAAyUICrbsbUU1n4T4apqp+Z3FbWJZnSFKfuCavm48ziYL0yp+m3sCADs=';

//Убиваем табличку
function removeTable() {
	return function()   {
	 var z = get('big');
	 while (z.firstChild) z.removeChild(z.firstChild);  
	} 
}

//Убираем из массива ссылок дупликаты
function remDUP(m){
	var x = new Array();
	var fl = 0;
	x.push(m.shift());
	for (i=0; i < m.length; i++){
	  fl = 0;	
	  for (j=0; j < x.length; j++){if (m[i] == x[j]){fl = 1; break;}}
	  if (fl == 0){x.push(m[i]);}
	}
	return x;
};

//Получаем ссылы со странички
function getDU(){ 
	var a = document.getElementsByTagName('body');
	var mas = a[0].innerHTML.match(/(ftp:\/\/77\.35\.112\.8[234][^<"]+)|(dsv\d?.data.cod.ru\/\d+)/g);
	mas = remDUP(mas);
	return mas;	
}

//Прописать checbox в окне
function che_all(id,id2){
	return function (){
	 var m1 = get('cb'+id).checked;	
	 for (i=0; i < id2; i++) if(get(id + '_' + i + '_0')){get(id + '_' + i + '_0').checked = m1;}
	}
}

//Пытаемся взять ссылки с паролем
function yes_pass(dataURL,id,id2,q){
   return function(){
	var pass = get('inp_'+id+'_'+id2).value;
	 if (q==1){
		getU_pass(dataURL,id,id2,pass);
	 } else {
	     var aTR;
		 id2 = get('big_id2_'+id).value;	
	     for (var i=0; i < id2; i++){ 
	      aTR = get('inp_' + id + '_' + i);	
	      if(aTR) getU_pass(dataURL,id,i,pass);
         }
	 }
   }
}

//Проверка на удаление
function check1(hr,id,id2){
	var flag = false;
	if (hr == '<b style="color: red;">Файл удален</b>'){
	 get(id + '_' + id2 + '_0').checked = false;
	 get(id + '_' + id2 + '_1').setAttribute('name', 'no');		
	 get(id + '_' + id2 + '_3').innerHTML = "0";
	 get(id + '_' + id2 + '_4').innerHTML = '<b style="color: red;">Файл удален</b>';
	flag = true; 
	}
	if ((hr == '<p align="center">Файл не найден</p>')|(hr == '<b style="color: red;">Файл с таким идентификатором не найден</b>')){
	 get(id + '_' + id2 + '_0').checked = false;
	 get(id + '_' + id2 + '_1').setAttribute('name', 'no');		
	 get(id + '_' + id2 + '_3').innerHTML = "0";
	 get(id + '_' + id2 + '_4').innerHTML = '<b style="color: red;">Файл не найден!</b>';
	flag = true; 
	}
	return flag;
}

//Проверка на защиту паролем
function check2(hr,id,id2,dataURL){
       if (hr == '<p>Введите пароль</p>'){
		get(id + '_' + id2 + '_0').checked = false;	
		get(id + '_' + id2 + '_1').setAttribute('name', 'no');
		get(id + '_' + id2 + '_3').innerHTML = "????????";
						  
		var aTDb = get(id + '_' + id2 + '_4');
		    aTDb.innerHTML = "";
		
		var aTable = elem('table');
		    aTable.setAttribute('width', '100%');
		    
		var aTR = elem('tr');
		
		 var aTD = elem('td'); 
		     aTD.setAttribute('align', 'center');  
		  var aInput = elem('input');
              aInput.setAttribute('id', 'inp_'+id+ '_'+ id2);
              aInput.setAttribute('value','Пароль');
         aTD.appendChild(aInput);
        aTR.appendChild(aTD);
        
         aTD = elem('td');
         aTD.setAttribute('style', ' padding-left:10px; width:25px');
		  var aIMG = elem('img');
       		  aIMG.setAttribute('id', 'yes1_'+id + '_'+ id2);
       		  aIMG.setAttribute('src', image['yes1']);
       		  aIMG.setAttribute('style', ' cursor:pointer;');
      	  aTD.appendChild(aIMG);
      	aTR.appendChild(aTD);
      	
		 aTD = elem('td');
		 aTD.setAttribute('style', ' padding-left:10px; padding-right:10px; width:25px');				  
      	   aIMG = elem('img');
       	 	 aIMG.setAttribute('id', 'yes2_' +id+ '_'+ id2);
       		 aIMG.setAttribute('src', image['yes2']);
       		 aIMG.setAttribute('style', ' cursor:pointer;');
      	 aTD.appendChild(aIMG);
      	aTR.appendChild(aTD);
      	
      	aTable.appendChild(aTR);
      	aTDb.appendChild(aTable);
		  				  
      	get('yes1_'+id+ '_'+ id2).addEventListener("click", yes_pass(dataURL,id, id2,1), false);
      	get('yes2_'+id+ '_'+ id2).addEventListener("click", yes_pass(dataURL,id, id2,2), false);
		return true;
		} else return false;
}

//Проверка на старую дату
function check3(x,id,id2){
	var hr = x.match(/<p>размер <b>/);
    if (hr == '<p>размер <b>'){
    	
		var pos1 = x.indexOf('<p>размер <b>');
		var pos2 = x.indexOf('<',pos1+13);
		hr = x.substring(pos1+13, pos2);
		
		get(id + '_' + id2 + '_0').checked = false;
		get(id + '_' + id2 + '_1').setAttribute('name', 'no');	
		get(id + '_' + id2 + '_3').innerHTML = hr;
		get(id + '_' + id2 + '_4').innerHTML = '<b style="color: red;">Старый дата код. оО</b>';
						 
		return true;
		} else return false;
}

//Пароль
function getU_pass(dataURL,id, id2,pass){
	var aTD = get(id+'_'+id2+'_4');
	aTD.innerHTML ='';
	var aIMG = elem("img");
          aIMG.setAttribute('src', image['load']);
          aIMG.setAttribute('style', 'border:none');
      aTD.appendChild(aIMG);
      
	GM_xmlhttpRequest({ method: 'post', 
	                    headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                                  'Content-Type': 'application/x-www-form-urlencoded'},
					    url: dataURL,
						data : ('password='+pass),
						onload:
                      function(result) 
					   { 
					   	if (result.status != 200) return;
					   	 var x = result.responseText;
					   	 
						 hr = x.match(/<p>Введите пароль<\/p>/);
						 if (check2(hr,id,id2,dataURL)) return; 					   	

					   	  var hr = x.match(/http:\/\/files\d?.dsv[^>]+/);
					   	  if (hr == null) hr = '<b style="color: red;">Ошибка сервера</b>';
					      var pos1 = x.indexOf('title="');
					      var pos2 = x.indexOf('"',pos1+7);
					      //var aName = '<a href="'+dataURL+'">' + x.substring(pos1+7, pos2)+'</a>';
					      	  var aA = elem('a');
							  aA.setAttribute('href', dataURL);
							  var aSpan = elem('span');
							  var aStyle = aSpan.getAttribute('style');
	                          aStyle += 'color: green;';
	                          aSpan.setAttribute('style', aStyle);
	                          aSpan.innerHTML = x.substring(pos1+7, pos2);
                              aA.appendChild(aSpan);
                              removeAll(get(id + '_' + id2 + '_2'));
                              get(id + '_' + id2 + '_2').appendChild(aA); 
                              
					      pos1 = x.indexOf('<li>размер: <b>');
					      pos2 = x.indexOf('<',pos1+15);
					      var aRaz = x.substring(pos1+15, pos2); 
					      if (hr == null) {
					  	    var aLink = '<b style="color: red;">Ошибка сервера</b>';
						  	get(id + '_' + id2 + '_4').innerHTML = aLink;
						  	get(id + '_' + id2 + '_0').checked = false;
						  	get(id + '_' + id2 + '_1').setAttribute('name', 'no');
						  } else {
						  	aA = elem('a');
							aA.setAttribute('href', hr);
							aSpan = elem('span');
							aStyle = aSpan.getAttribute('style');
	                        aStyle += 'color: green;';
	                        aSpan.setAttribute('style', aStyle);
	                        aSpan.innerHTML = 'http://files.data.cod.ru/.....';
                            aA.appendChild(aSpan);
                            
						  	//var aLink = '<a href="'+hr+'"><b style="color: green;">' + 'http://files.data.cod.ru/.....' + '</b></a>';
						    get(id + '_' + id2 + '_1').setAttribute('name', 'yes');
						    get(id + '_' + id2 + '_0').checked = true;
						    removeAll(get(id + '_' + id2 + '_4'));
						    get(id + '_' + id2 + '_4').appendChild(aA);   
						} 
						get(id + '_' + id2 + '_3').innerHTML = aRaz;
						  return;	
					   }
						   });
}

//Получаем прямые ссылки с дата кода
function getU(dataURL,id, id2){
	GM_xmlhttpRequest({ method: 'get', 
					    url: dataURL, 
						onload: 
                      function(result) 
					   { 
					   	 if (result.status != 200) return;
					     var x = result.responseText;
					     
						 var hr = x.match(/<b style="color: red;">Файл удален<\/b>/);
					     if (check1(hr,id,id2)) return;
					     
					     var hr = x.match(/<p align="center">Файл не найден<\/p>/);
						 if (check1(hr,id,id2)) return;	
						 
						 var hr = x.match(/<b style="color: red;">Файл с таким идентификатором не найден<\/b>/);
						 if (check1(hr,id,id2)) return;	
						 
						 hr = x.match(/<p>Введите пароль<\/p>/);
						 if (check2(hr,id,id2,dataURL)) return;
						 
						 if (check3(x,id,id2))return;	

 					      var hr = x.match(/http:\/\/files\d?.dsv[^>]+/);
 					      var pos1 = x.indexOf('title="');
					      var pos2 = x.indexOf('"',pos1+7);
					      //var aName = '<a href="'+dataURL+'">' + x.substring(pos1+7, pos2)+'</a>';
					      var aA = elem('a');
							  aA.setAttribute('href', dataURL);
							  var aSpan = elem('span');
							  var aStyle = aSpan.getAttribute('style');
	                          aStyle += 'color: green;';
	                          aSpan.setAttribute('style', aStyle);
	                          aSpan.innerHTML = x.substring(pos1+7, pos2);
                              aA.appendChild(aSpan);
                              removeAll(get(id + '_' + id2 + '_2'));
                              get(id + '_' + id2 + '_2').appendChild(aA); 
                              
					      pos1 = x.indexOf('<li>размер: <b>');
					      pos2 = x.indexOf('<',pos1+15);
					      var aRaz = x.substring(pos1+15, pos2); 
					      if (hr == null) {
						  	var aLink = '<b style="color: red;">Ошибка сервера</b>';
						  	get(id + '_' + id2 + '_4').innerHTML = aLink;
						  	get(id + '_' + id2 + '_0').checked = false;
						  	get(id + '_' + id2 + '_1').setAttribute('name', 'no');
						  } else {
						  	var aA = elem('a');
							aA.setAttribute('href', hr);
							var aSpan = elem('span');
							var aStyle = aSpan.getAttribute('style');
	                        aStyle += 'color: green;';
	                        aSpan.setAttribute('style', aStyle);
	                        aSpan.innerHTML = 'http://files.data.cod.ru/.....';
                            aA.appendChild(aSpan);
                            
						  	//var aLink = '<a href="'+hr+'"><b style="color: green;">' + 'http://files.data.cod.ru/.....' + '</b></a>';
						    get(id + '_' + id2 + '_1').setAttribute('name', 'yes');
						    removeAll(get(id + '_' + id2 + '_4'));
						    get(id + '_' + id2 + '_4').appendChild(aA);  
						  }
						//get(id + '_' + id2 + '_2').innerHTML = aName;
						get(id + '_' + id2 + '_3').innerHTML = aRaz;
					   
					  }
  });
}
		
//Получаем Заголовок
function getZag () {
	 var x = document.getElementsByTagName('title')[0].innerHTML;
	 var pos = x.indexOf('»');
     return x.substring(0,pos);
}

//Получаем id новости
function getNewsid () {
	x = location.href;
	var pos = x.indexOf('index.php?newsid=');
	return x.substring(pos+17,x.length);
}

function addNews(id,aName,aNid){
 
  var aTable = get('tab'+id);
  //Верхняя часть
  var aTR = elem('tr');
      aTR.setAttribute('height', '30');
      
  var aTD = elem('td');
      aTD.setAttribute('id', 'td_up_'+id);
      aTD.setAttribute('style', 'width:25px; background-color: #C3EAFD; padding-left: 5px; padding-right: 5px; border: white 2px solid;');
	       
   var aIMG = elem('img');
       aIMG.setAttribute('id', 'img_up_'+id);
       aIMG.setAttribute('src', image['up']);
   aTD.appendChild(aIMG); 
      
   aTR.appendChild(aTD);
            
    aTD = elem('td');
     aTD.setAttribute('colSpan', '3');
     aTD.setAttribute('style', 'width:650px; background-color: #C3EAFD; padding-left: 5px; padding-right: 5px; border: white 2px solid; border-left:none; ');
     aTD.setAttribute('id', 'td_up_'+id);
          
     var aA = elem('a');
     var aSpan = elem('span');
     
     if (sait==0) aA.setAttribute('href', 'http://dsvload.net/index.php?newsid='+aNid);
	 else aA.setAttribute('href', location.href);
	 
	  var aStyle = aSpan.getAttribute('style');
	  aStyle += 'font-size: 13px; color: #000000;';
	  aSpan.setAttribute('style', aStyle);
	  
       aSpan.innerHTML = aName;
       aA.appendChild(aSpan);
      aTD.appendChild(aA);
     aTR.appendChild(aTD);
      
    aTable.appendChild(aTR);
    
    //get('up').addEventListener("click", removeTable(), false);
}

//Добавляем управление ссылками
function addUpr(id,id2){
	var aTable = get('tab'+id);
	var aTR = elem('tr');
	aTR.setAttribute('height', '20');
	aTR.setAttribute('id', 'tr_upr_'+id);
	 
    var aTD = elem('td');
    aTD.setAttribute('style', 'width:25px; background-color: #C3EAFD; border: white 2px solid; border-top: none; border-bottom: none;');
    aTD.innerHTML = '&nbsp';
    aTR.appendChild(aTD); 
     
    aTD = elem('td');
     aTD.setAttribute('colSpan', '3');
     aTD.setAttribute('style', 'background-color: #C3EAFD; border-right: white 2px solid;');
     
     var aTab2 = elem('table');
     var aTR2 = elem('tr');
     
     var aTD2 = elem('td');
        aTD2.setAttribute('style', 'width:5px;');
      aTR2.appendChild(aTD2);
     
      aTD2 = elem('td');
          aTD2.setAttribute('id', 'td_upr_'+id+'_0');
          aTD2.setAttribute('style', 'padding-left: 5px; padding-right: 5px; font-weight:bold; cursor: pointer; border: black 1px solid;');
          aTD2.innerHTML = 'dsv';
      aTR2.appendChild(aTD2);
      
      aTD2 = elem('td');
        aTD2.setAttribute('style', 'width:5px;');
      aTR2.appendChild(aTD2);
      
      aTD2 = elem('td');
      aTD2.setAttribute('id', 'td_upr_'+id+'_1');
      aTD2.setAttribute('style', ' padding-left: 5px; padding-right: 5px;font-weight:bold; cursor: pointer; border: black 1px solid;');
      aTD2.innerHTML = 'dsv2';
      aTR2.appendChild(aTD2);
      
      aTD2 = elem('td');
        aTD2.setAttribute('style', 'width:5px;');
      aTR2.appendChild(aTD2);
      
      aTD2 = elem('td');
      aTD2.setAttribute('id', 'td_upr_'+id+'_2');
      aTD2.setAttribute('style','padding-left: 5px; padding-right: 5px; font-weight:bold; cursor: pointer; border: black 1px solid;');
      if (sait == 0) aTD2.innerHTML = 'Копировать dsv'; 
       else aTD2.innerHTML = 'Копир. dsv';
      aTR2.appendChild(aTD2);
      //aTD2.innerHTML = 'Копировать dsv';
      aTR2.appendChild(aTD2);
      
      aTD2 = elem('td');
        aTD2.setAttribute('style', 'width:5px;');
      aTR2.appendChild(aTD2);
      
      aTD2 = elem('td');
      aTD2.setAttribute('id', 'td_upr_'+id+'_3');
      aTD2.setAttribute('style', 'padding-left: 5px; padding-right: 5px; font-weight:bold; cursor: pointer; border: black 1px solid;');
      aTD2.innerHTML = 'Удалить отмеченные';
      aTR2.appendChild(aTD2);
      
      aTD2 = elem('td');
        aTD2.setAttribute('style', 'width:5px;');
      aTR2.appendChild(aTD2);
      
      aTD2 = elem('td');
      aTD2.setAttribute('id', 'td_upr_'+id+'_4');
      aTD2.setAttribute('style', 'padding-left: 5px; padding-right: 5px; font-weight:bold; cursor: pointer; border: black 1px solid;');
      if (sait == 0) aTD2.innerHTML = 'Удалить без прямых ссылок'; 
       else aTD2.innerHTML = 'Удалить без прям. ссылок';
      aTR2.appendChild(aTD2);
      
      aTD2 = elem('td');
        aTD2.setAttribute('style', 'width:5px;');
      aTR2.appendChild(aTD2);
      
      aTab2.appendChild(aTR2);
      
	aTD.appendChild(aTab2); 
    aTR.appendChild(aTD); 
	aTable.appendChild(aTR); 
	
	get('td_upr_'+id+'_4').addEventListener("click", del_trouble(id,id2), false);
	get('td_upr_'+id+'_3').addEventListener("click", del_checked(id,id2), false);
	get('td_upr_'+id+'_0').addEventListener("click", dsv1(id,id2,1), false);
	get('td_upr_'+id+'_1').addEventListener("click", dsv1(id,id2,2), false);
	get('td_upr_'+id+'_2').addEventListener("click", openWin(id,id2,1), false);
}

//Шапко к табличке
function addShapko (id){
	var aTable = get('tab'+id);
    var aTR = elem('tr');
	aTR.setAttribute('height', '20'); 
	aTR.setAttribute('id', 'tr_'+id);
    
	var aTD = elem('td');
     aTD.setAttribute('style', 'width:25px; font-size:13px; background-color: #C3EAFD; border: white 2px solid;');
    var aCB = elem('input');
      aCB.setAttribute('type', 'checkbox');
      aCB.setAttribute('id', 'cb'+id);
	  aCB.setAttribute('checked', true);
      aTD.appendChild(aCB);      
      aTR.appendChild(aTD);
	      
    var  aTD = elem('td');
        aTD.setAttribute('style', 'width: 270px; background-color: #C3EAFD; font-weight:bold; border: white 2px solid; border-left: none;');
        aTD.innerHTML = 'Название файла';
      aTR.appendChild(aTD);  

      aTD = elem('td');
        aTD.setAttribute('style', 'width:60px; background-color: #C3EAFD; font-weight:bold; border: white 2px solid; border-left: none;');
        aTD.innerHTML = 'Размер';
      aTR.appendChild(aTD); 

      aTD = elem('td');
        aTD.setAttribute('style', 'font-weight:bold; background-color: #C3EAFD; border: white 2px solid; border-left: none;');
        aTD.innerHTML = 'Прямая ссылка';
        
      aTR.appendChild(aTD);	
      aTable.appendChild(aTR);
      
}

//Добавить строки со сцылками в табличку;
function addSc(id,id2,aLink){
	var aTable = get('tab'+id);
	
    var aTR = elem('tr');
		aTR.setAttribute('height', '20'); 
		aTR.setAttribute('id', 'tr_' + id + '_' + id2);
	
    var aTD = elem('td');
        aTD.setAttribute('style', 'width: 25px; background-color: #C3EAFD; border: white 2px solid; border-top: none;');
        
    var aInp = elem('input');
        aInp.setAttribute('type', 'hidden');
        aInp.setAttribute('name', 'yes');
    
    var res = 0;
	if (aLink.match(/dsv.data.cod.ru/)) res = 1;
    if (aLink.match(/dsv2.data.cod.ru/)) res = 2;
    if (aLink.match(/77\.35\.112\.82/)) res = 3;
    if (aLink.match(/77\.35\.112\.83/)) res = 4;
    if (aLink.match(/77\.35\.112\.84/)) res = 5;
	    
        aInp.setAttribute('value', res);
        aInp.setAttribute('id', id + '_' + id2 + '_1');    
        aTD.appendChild(aInp);
        
    var aCB = elem('input');
      aCB.setAttribute('type', 'checkbox');
      aCB.setAttribute('id', id + '_' + id2 + '_0');
	  aCB.setAttribute('checked', true);
      aTD.appendChild(aCB);      
      aTR.appendChild(aTD);
      
      aTD = elem('td');
        aTD.setAttribute('style', 'background-color: #C3EAFD; border: white 2px solid; border-top: none; border-left: none;');
        aTD.setAttribute('id', id + '_' + id2 + '_2');
        var k = "Размер";
        if (aLink.indexOf('ftp://')!=-1) {
			var pos = aLink.lastIndexOf('/');
			var aA = elem('a');
			aA.setAttribute('href', aLink);
			var aSpan = elem('span');
			aLink = aLink.replace(/%20/g,' ');
			aSpan.innerHTML = aLink.substring(pos+1); 			
			k = "???";
		} else {
			var aA = elem('a');
			aA.setAttribute('href', 'http://'+aLink);
			var aSpan = elem('span');
			aSpan.innerHTML = 'http://' + aLink; 
		}	
        aA.appendChild(aSpan);
		aTD.appendChild(aA); 
      aTR.appendChild(aTD);  

      aTD = elem('td');
        aTD.setAttribute('style', 'border: white 2px solid; background-color: #C3EAFD; border-top: none; border-left: none;');
        aTD.setAttribute('id', id + '_' + id2 + '_3');
        aTD.innerHTML = k;
      aTR.appendChild(aTD); 

      aTD = elem('td');
        aTD.setAttribute('id', id + '_' + id2 + '_4');
        aTD.setAttribute('style', 'border: white 2px solid; background-color: #C3EAFD; border-top: none; border-left: none;');
      
	  if (res < 3) {
      var aIMG = elem("img");
          aIMG.setAttribute('src', image['load']);
          aIMG.setAttribute('style', 'border:none');
        aTD.appendChild(aIMG);
      } else {
		  var aA = elem('a');
		  aA.setAttribute('href', aLink);
		  var aSpan = elem('span');
		  
		  aSpan.innerHTML = 'ftp://77.35.112.8'+(res-1)+'/.....';    
		  var aStyle = aSpan.getAttribute('style');
	      aStyle += 'color: green;';
	      aSpan.setAttribute('style', aStyle);   	  
	      aA.appendChild(aSpan);
		  aTD.appendChild(aA);
	    }
        
      aTR.appendChild(aTD);	
      aTable.appendChild(aTR);
}

function loadV(){
 return function(){
	 
	 var id = 1;
	 if (get('tab'+id)) {
	  alert('оО Зачем второй раз ссылки????');	
	  return;	
	 } 
	 
	 var aZag = getZag();
	 if (sait==0) var aNewsid = getNewsid(); else aNewsid = 0;
     var mas = getDU();
     
     var id2 = mas.length;
     
     //Создаем табличку на странице
     makeTable(id);
     
     var aInput = get('big_id2_'+id);
     aInput.setAttribute('value',id2);
     
     get('copy').addEventListener("click", openWin(id,id2,0), false);
     
     //Добавляем заголовок новости
     addNews(id, aZag, aNewsid);
     //Управление
     addUpr(id,id2);
     //Шапка
     addShapko(id);
     
     get('cb'+id).addEventListener("click", che_all(id,id2), false);
     
     //Типа парсим все сцылы по дата коду
     var ssilko;
     for (var i=0; i < id2; i++){
 	  addSc(id, i, mas[i]);
 	  ssilko = '<a href="http://'+mas[i]+'">http://'+mas[i]+'</a>';
 	  if (get(id+'_'+i+'_1').value < 3) getU('http://'+mas[i],id,i);
	  }
	}
}
 
function makeTable(id){
		
  var aTable = elem('table');
      aTable.setAttribute('id', 'tab'+id);
  	    	  
    var aInp = elem('input');
        aInp.setAttribute('id', 'big_id2_'+id);
        aInp.setAttribute('type', 'hidden');
        aInp.setAttribute('name', 'big_id2');
        aInp.setAttribute('value', '0');
        aTable.appendChild(aInp);
	get('big').appendChild(aTable);	  	  
}

//Создаем панельку сверху
function addpanel(){
	var aTable = elem('table');
	
	//Добавляем отступ до Новости на странице!!!
	var aStyle = aTable.getAttribute('style');
    aStyle += 'margin-bottom: 15px; margin-top: 5px;';
    aTable.setAttribute('style', aStyle);
		    
	var aTR = elem('tr'); 
	var aTD = elem('td');
    var aStyle = aTD.getAttribute('style');
    aStyle += 'border: 3px solid #DBF6FF;';
    aTD.setAttribute('style', aStyle);
    
	var aTable1 = elem('table');
	    aTable1.setAttribute('id', 'tr_big');
				    
	aTD.appendChild(aTable1);
	aTR.appendChild(aTD);	
	aTable.appendChild(aTR);
	
	aTR = elem('tr'); 
	var aTD = elem('td');
	    aTD.setAttribute('id', 'big');
	var aStyle = aTD.getAttribute('style');
	aStyle += 'border: 3px solid #DBF6FF; border-top: none; padding:10px;';
    aTD.setAttribute('style', aStyle);	
	
	aTR.appendChild(aTD);
	aTable.appendChild(aTR);   
  
  var z = get('dle-content');
  z.insertBefore(aTable, z.firstChild);
}

function addpanel2(){  
  var aTR = elem('tr'); 
  
  var aTD = elem("td");
  aTD.setAttribute('height', '50');
  aTD.setAttribute('nowrap', true);
  var aStyle = aTD.getAttribute('style');
	  aStyle += 'background:url('+image["korz"]+') repeat-y #70BFF3; padding-left: 5px; padding-right: 5px; color: white;';
  aTD.setAttribute('style', aStyle);
  aTD.innerHTML = 'Моя волшебная <br /> корзинка <br /> Версия ' + VERSION;
  aTR.appendChild(aTD);

  aTD = elem("td");
  aTD.setAttribute('height', '29');
  aTD.setAttribute('width', '20');
  aTD.setAttribute('style', 'background-color: #C3EAFD; padding-left: 15px;');
  var aIMG = elem("img");
      aIMG.setAttribute('src', image['home']);
      aIMG.setAttribute('id', 'home');
      aIMG.setAttribute('style', 'border:none; cursor: pointer;');
      aTD.appendChild(aIMG);
  aTR.appendChild(aTD);
  
  aTD = elem("td");
  aTD.setAttribute('height', '29');
  aTD.setAttribute('width', '20');
  aTD.setAttribute('style', 'background-color: #C3EAFD; padding-left: 15px;');
  
  var aIMG = elem("img");
      aIMG.setAttribute('src', image['l1']);
      aIMG.setAttribute('id', 'refr');
      aIMG.setAttribute('style', 'border:none; cursor: pointer;');
      aTD.appendChild(aIMG);
      aTR.appendChild(aTD);
	  
  aTD = elem("td");
  aTD.setAttribute('height', '29');
  aTD.setAttribute('width', '20');
  aTD.setAttribute('style', 'background-color: #C3EAFD; padding-left: 15px;');
  var aIMG = elem("img");
      aIMG.setAttribute('src', image['copy']);
      aIMG.setAttribute('id', 'copy');
      aIMG.setAttribute('style', 'border:none; cursor: pointer;');
      aTD.appendChild(aIMG);
      aTR.appendChild(aTD);
  aTR.appendChild(aTD); 	      
  
  aTD = elem("td");
  aTD.setAttribute('height', '29');
  aTD.setAttribute('width', '20');
  aTD.setAttribute('style', 'background-color: #C3EAFD; padding-left: 15px;');
  
  var aIMG = elem("img");
      aIMG.setAttribute('src', image['del']);
      aIMG.setAttribute('id', 'del');
      aIMG.setAttribute('style', 'border:none; cursor: pointer;');
      aTD.appendChild(aIMG);
      aTR.appendChild(aTD);  
  
  aTD = elem("td");
  aTD.setAttribute('width', '100%');
  aTD.setAttribute('style', 'background:#C3EAFD; color:#124364; font-weight:bold; font-size:12px; padding-left: 10px;');
  aTD.innerHTML = 'Скрипт для управления <br/>закачками';
  aTR.appendChild(aTD);
  
  aTD = elem("td");
  aTD.setAttribute('nowrap', true);
  aTD.setAttribute('style', 'background:#C3EAFD; color:#124364; font-size:10px; text-align:right; padding-right:5px;');
  aTD.innerHTML = 'Автор скрипта: <b>Dantesik</b><br />Категория: <b>Полезности)</b>';
  aTR.appendChild(aTD);
  
  get('tr_big').appendChild(aTR);
  
  get('home').addEventListener("click", openScript(), false);  
  get('refr').addEventListener("click", loadV(), false);  
  get('del').addEventListener("click", removeTable(), false); 
}

//Удалить проблемные
function del_trouble(id,id2) {
	return function (){
    var aTable = get('tab'+id);
	var aTR;
	for (var i=0;i<id2;i++){
		aTR = get('tr_' + id + '_' + i);
		if(aTR) {
		 if (get(id + '_' + i + '_1').name == 'no'){
		 	while (aTR.firstChild) aTR.removeChild(aTR.firstChild);
		   aTable.removeChild(aTR);
		  }
		} 
	}
}}

//Удалить отмеченные
function del_checked(id,id2) {
	return function (){
    var aTable = get('tab'+id);
	var aTR;
	for (var i=0;i<id2;i++){
		aTR = get('tr_' + id + '_' + i);
		if(aTR) {
		 if (get(id + '_' + i + '_0').checked == true){
		 	while (aTR.firstChild) aTR.removeChild(aTR.firstChild);
		   aTable.removeChild(aTR);
		  }
		} 
	}
}}

//Отмечаем dsv и dsv2, если 1 - dsv
function dsv1(id,id2,k){
	return function (){
	 var aTR;	
	 for (var i=0; i < id2; i++){ 
	  aTR = get('tr_' + id + '_' + i);	
	  if(aTR){
	   if (get(id+'_'+i+'_1').value == k){get(id+'_'+i+'_0').checked = true;
	    } else {get(id+'_'+i+'_0').checked = false;}
	  }
	 }
	}
}

//Ща как открою окно
function openWin(id,id2,num) { return function () {
 	var aTR;
 	var myWin = open('about:blank', 'Полученные ссылки', 'width=200,height=300,left=400,top=300, leftstatus=no,toolbar=no,menubar=no,scrollbars=yes');
 	var z;
 	myWin.document.open();
 	myWin.document.write('<html><head><title>Полученные ссылки</title>');
   //Стили
   myWin.document.write('<style type="text/css" media="all">');
   myWin.document.write('body {margin:0;padding:0; background:#C5E5FA; font-family: Tahoma,Verdana; font-size:11px;}');
   myWin.document.write('a {font-family: Tahoma,Verdana; font-size:11px; font-weight:bold; text-decoration: underline; cursor: pointer; font-color:green; }');
   myWin.document.write('</style>');
   myWin.document.write('</head><body><div style="height:50px"></div><table border="0">');
 	for (var i=0; i < id2; i++){
 	 aTR = get('tr_' + id + '_' + i);	
	 if(aTR){
	   if (get(id+'_'+i+'_1').name == 'yes')
	     {
	      myWin.document.write('<tr style="height:15px;"><td>');
		  if (num == 1){
			z = get(id+'_'+i+'_2').innerHTML;
		  } else z = get(id+'_'+i+'_4').innerHTML;	
		  myWin.document.write(z);
		  myWin.document.write('</td></tr>');
	    }
	  }	
	}
   myWin.document.write('</table></body></html>');
   myWin.document.close();
 }
}

function openScript() { return function () {
 	open('http://userscripts.org/scripts/show/40762', '', '');

 }
}

addpanel();
addpanel2();