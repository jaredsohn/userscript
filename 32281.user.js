// x-wars hide script
// version 0.1.1 BETA!
// 2008-08-19
// Copyright (c) 2008 ebävs
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          X-Wars Hide
// @namespace     http://www.ebavs.net/x-wars/
// @description   script for transform x-wars on another think for play on work
// @include 	http://*x-wars*/*
// @exclude	    http://board.x-wars*/*
// ==/UserScript==


var egif = 'data:image/gif;base64,R0lGODlhAQABAIAAAP%2F%2F%2FwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D';
var galaxyButton = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167%2B3t%2B9f7vOec5%2FzOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP%2FwBr28AAgBw1S4kEsfh%2F4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv%2BCpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH%2BOD%2BQ5%2Bbk4eZm52zv9MWi%2FmvwbyI%2BIfHf%2FryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3%2FldM9sJoFoK0Hr5i3k4%2FEAenqFQyDwdHAoLC%2B0lYqG9MOOLPv8z4W%2Fgi372%2FEAe%2Ftt68ABxmkCZrcCjg%2F1xYW52rlKO58sEQjFu9%2Bcj%2FseFf%2F2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R%2BW%2FQmTdw0ArIZPwE62B7XLbMB%2B7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv%2FmPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5%2BASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1%2BTSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q%2B0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw%2BS3FDrFiOJMCaIkUqSUEko1ZT%2FlBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC%2FpdLoJ3YMeRZfQl9Jr6Afp5%2BmD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA%2BYb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV%2Bjvl%2F9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1%2BrTfaetq%2B2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z%2Bo%2B02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y%2FDMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS%2BKc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw%2BlXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r%2B00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle%2B70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l%2Bs7pAz7GPgKfep%2BHvqa%2BIt89viN%2B1n6Zfgf8nvs7%2Bsv9j%2Fi%2F4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww%2BFUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX%2BX0UKSoyqi7qUbRTdHF09yzWrORZ%2B2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY%2BybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP%2BWDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D%2BmiGT0Z1xjMJT1IreZEZkrkj801WRNberM%2FZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c%2FPbFWyFTNGjtFKuUA4WTC%2BoK3hbGFt4uEi9SFrUM99m%2Fur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl%2FVfPV5bdra3kq3yu3rSOuk626s91m%2Fr0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e%2B2Sba1r%2Fdd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q%2F5n7duEd3T8Wej3ulewf2Re%2FranRvbNyvv7%2ByCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9%2BmfHvjUOihzsPcw83fmX%2B39QjrSHkr0jq%2Fdawto22gPaG97%2BiMo50dXh1Hvrf%2Ffu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1%2F3yfPe549d8Lxw9CL3Ytslt0utPa49R35w%2FeFIr1tv62X3y%2B1XPK509E3rO9Hv03%2F6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r%2Fy%2B2v3qB%2FoP6n%2B0%2FrFlwG3g%2BGDAYM%2FDWQ%2FvDgmHnv6U%2F9OH4dJHzEfVI0YjjY%2BdHx8bDRq98mTOk%2BGnsqcTz8p%2BVv9563Or59%2F94vtLz1j82PAL%2BYvPv655qfNy76uprzrHI8cfvM55PfGm%2FK3O233vuO%2B638e9H5ko%2FED%2BUPPR%2BmPHp9BP9z7nfP78L%2FeE8%2Fsl0p8zAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn%2FAACA6QAAdTAAAOpgAAA6mAAAF2%2BSX8VGAAAE2UlEQVR42nSVTWxUVRTHf%2Fe9mTdvvqCllJZMO7QMRVI%2BhQiFEg3QBUmpJLDDmLAyURfGBBLdEBfGhQuiiShCJJoYDYFYBTcGbAwfNgQWkAJCW%2FoBbel02s60Heh8vPeOi0tbhHqSk%2Fvue7m%2Fe%2B75n3ueEhFetK1KqQKUuaa5vsG2N6yORusigUA5IOnp6aGOqanuK4XC9Zjn3f7L86aYx3wvvqhVavFqy3rzvZqa93etWbMxUFsLS5ZAOAwiMDkJySTZnh5%2B6%2Bho2%2B73fz3iOH90imSf56jnI25Sat3%2BpUs%2Fe3fbtmY2bYLSUlAKPE9DQc99Pj2OjlJob%2BfzS5e%2Bb8tkPmkT6X8JvEupjR%2FG49%2FtOXBgg9fYiJFOQzIJxeIczPfsgCJ6M78fTBNu3eLE%2BfN%2FnhwePnhdZGA2FaVKLfkqFju2p6Vlw3R5OU4iQbSyEgYHNXxgADIZePpUA00TDAMcR8%2Fr63nHcXaNtbYeDSn19lORvAqCuS8Y%2FOjH5uZPaWigMDzM9JYthPftw2cYOsJ0Wvvjx9DfD6mUzrXn6VN4HihF%2FvJldly8uP9v1%2F3FjEDF0eXLv41v3boQpTBdFzebhUQC34IFGhwM6nzH41BTA4mEHpVCRkdRxSJ4Hr5IBLOvr%2Fr1w4fPG1WmufbVmppqLAtyObBtAtksZjKJzFdH0SjEYjh1dWRGRihOTurUFAoQCLBz2bL1ccPYaFRZ1opwWdmc6oaBTymMR48gn58PjYyP4xw7hn3%2FPv7S0rlqAUpKSnwJy6ozAqa5kEwGRkbAdbUowSBGXx8qk5kXrCyLQHU1dkUF6hmQfB6SSVQuR9SywoYYhpoVKJXS6vt8qLExLdR8Fomg9u6FzZshm9XrZgQ1DFylMKaLRRG%2FXwvk9%2Buop6c1oL9%2FLh3ZrK7pGbMs2LEDtmzR63w%2BsG1cv59soaCMcceZGMvntSi2DaGQ9kWLYHxcC9rbC2fOQFubruXZhuCDlhYK27cjpgmhEAOZDIOFwpTR7zgP7vT16YgtCwIB%2FVxSglgWzoUL0NqqN3vwAO%2FsWWRiYpY91ttLsrMT17bBtrnR359%2F6LrdZg4KZZOTLW9UVy%2FyJRKzOSQchtJSvJ4ejPp61MqVUFGB09XFk64uJBZjcnCQ0ePHWZRKEaqqYuL2bb64efPKDfjGFHiS8rwF68fHd9SuWgW1tbr0QiFUNIpZX4%2BqrNTHjkQw4nGcoSGGL13iyfXrVEciRNeuxevu5uy5cxzP5Y48EWk3RMTtgh9ODQ1dGzh9GkZH9Q2LRud6gmXpmxcMogIBIuvWsbi8nKoVKwg2NEBvLzfPnOHUxETrKPz%2BrFEJIkIEdn4Md8ficZEjR0Ta20Xu3RPp6xNJpURyOZGpKZGHD0U6O7VfvSpy6JD0VFbKQbhsQf0MbxYMqAXQdAguP45GRZqbRU6eFOnoEEmnRVxXxPNEMhmRO3dETpwQ2b1b%2FgmH5S341YaNMywR%2BW%2BjB7CUeqURDn6g1L6mpUsT4aYmUzU2wrJlOs%2Fd3cjFi6Tb2oqt6fTdL0V%2Bugs%2FOyKP%2FvcPMlueStkG1NcZxradZWWvrYzF4qGFC4N4HpMjI9k7g4O9f2az1wagHegsihRfuvbzgWc%2FKhUwocRUarEC%2B5kmWRfGXJiQeYAz9u8ACB9Ulq9REvIAAAAASUVORK5CYII%3D';

if (location.hostname.match(/^uni\d+\./)) init();


function init() {		
	//para todas las paginas
	//ponemos el fondo blanco
	setWhiteColor(document.getElementsByTagName("body")[0]);
	
	//sustituimos las hojas de estilos por estilos nuevos mas discretos
	replaceStyleSheet();	
	
	//seleccionamos la pagina donde estamos para realizar acciones concretas
	selectPage(parseUrl(location.pathname));
}

function parseUrl(str){
	var dirs;
	var nameParts;
	
	if (str.indexOf('/') > -1) {
		dirs = str.split('/');
	}
	else 
		dirs = str;
	
	nameParts =dirs[dirs.length-1].split('.');
	
	return nameParts[0];
}

function selectPage(page){
    switch (page) {
        case "index": indexPage(); break;
		case "standard-menu": menuPage(); break;
		case "standard-left": break;
		case "standard-right": break;
		case "standard-top": topPage(); break;
		case "standard-power": replaceImages(); break;
		case "standard-status": statusPage(); break;
	}
	
}

function statusPage() {

    if (document.styleSheets.length > 0) {
		var sSheet = document.styleSheets[0];
		for (var i = 0; i < sSheet.cssRules.length; i++) {
		    var cT = sSheet.cssRules[i].cssText;

		    if (cT.indexOf('.newsStyle') > -1) {
		        sSheet.deleteRule(i);
		        sSheet.insertRule(".newsStyle {background-color: white; color:#808080; font-family:Arial, Helvetica; font-size: 0.6em }", i);
		    }
		}
    }

    replaceImages();    
}

function menuPage() {

    //sustituimos las imagenes por partes blancas
    replaceImages();
    
	var td = document.evaluate('//tr/td',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	//modificamos las imagenes y los tamaños de las tablas
	for(var i = 0; i < td.snapshotLength; ++i) {
		
		var tmp = td.snapshotItem(i);
		switch (i) {
			case 3: tmp.width = '12'; tmp.firstChild.width='12'; break;
			case 4: tmp.align='left'; break;
			case 6: tmp.firstChild.height = '10'; break;
			case 8: tmp.width = '12'; tmp.height = '200'; tmp.firstChild.width='12'; tmp.firstChild.height='200'; break; //izquierda menu
			case 9: tmp.height = '200'; break; //menu
			case 10: tmp.height = '200'; tmp.firstChild.height='200'; break; //derecha menu
			case 11: tmp.firstChild.height = '10'; break; //imagen inferior del menu
			case 13: tmp.width='12'; tmp.firstChild.width='12'; break; //imagen izquierda del selector de planeta
			case 14: tmp.align='left'; break; //contenedor del selector
		}
		
	}
	
	//boton de galaxia
	var galaxy = document.getElementById('galaxyButton');
	galaxy.firstChild.firstChild.src = galaxyButton;
	galaxy.style.left='85px';
	galaxy.style.top = '275px';
}

function topPage() {

    //sustituimos las imagenes por partes blancas
    replaceImages();

    var div = document.evaluate('//div[@id]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    //eliminamos la etiqueta font y reajustamos la tabla
    for (var i = 0; i < div.snapshotLength; ++i) {
        var font = div.snapshotItem(i).parentNode; //elemento a eliminar //<font>
        var td = font.parentNode; //td
        var nextTd = font.nextSibling;
        
        for(var x=0; x < font.childNodes.length; ++x) {
            td.insertBefore(font.childNodes[x], nextTd);
        }
        td.removeChild(font);

        //añadimos otra celda con el mismo contenido
        td.parentNode.insertBefore(td.cloneNode(true), td.nextSibling);
        td.removeChild(td.childNodes[1]); //eliminamos el div
        td.nextSibling.removeChild(td.nextSibling.childNodes[0]); //eliminamos el texto
        td.width = '10'; //modificamos el ancho de la celda
        td.align = 'left';
        
        //cambiamos a las iniciales
        switch (td.childNodes[0].nodeValue) {
            case "Hierro": td.childNodes[0].nodeValue = 'h:'; break;
            case "Cristal": td.childNodes[0].nodeValue = 'c:'; break;
            case "Frubin": td.childNodes[0].nodeValue = 'fr:'; break;
            case "Orizin": td.childNodes[0].nodeValue = 'o:'; break;
            case "Frurozin": td.childNodes[0].nodeValue = 'fz:'; break;
            case "Oro": td.childNodes[0].nodeValue = 'or:'; break;
        }
    }

    //eliminanos un td central con una imagen
    var centralTd = document.evaluate('//tr/td[@width="203"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (centralTd) centralTd.parentNode.removeChild(centralTd);

    //eliminamos un td lateral izquierdo con una imagen
    var leftTd = document.evaluate('//tr/td[@width="50"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (leftTd) leftTd.parentNode.removeChild(leftTd);

    //eliminamos la primera celda que tampoco la necesitamos
    var xTd = document.getElementsByTagName("td")[0];
    xTd.parentNode.removeChild(xTd);

    //eliminamos un td lateral derecho con una imagen
    var rightTd = document.evaluate('//tr/td[@width="51"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (rightTd) rightTd.parentNode.removeChild(rightTd);

    //eliminamos filas que contienen imagenes
    var tr = document.evaluate('//tr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < tr.snapshotLength; ++i) {
        var tmp = tr.snapshotItem(i);
        switch (i) {
            case 1: tmp.parentNode.removeChild(tmp); break;
            case 4: tmp.parentNode.removeChild(tmp); break;
            case 5: tmp.parentNode.removeChild(tmp); break;
            case 8: tmp.parentNode.removeChild(tmp); break;
        }
    }

    var img = document.evaluate('//img[@width="102"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (img) img.parentNode.removeChild(img);        
        
    //buscamos las tablas
    var table = document.evaluate('//table', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; i < table.snapshotLength; ++i) {
        var tmp = table.snapshotItem(i);
        switch (i) {
            case 0: tmp.align = 'left'; tmp.width = '400'; tmp.removeAttribute('height'); break;
            case 1: tmp.align = 'left'; tmp.removeAttribute('height'); tmp.parentNode.removeAttribute('height'); break;
            case 3: tmp.parentNode.removeAttribute('height'); break;
        }
    }
}

function indexPage() {
    //to do:
    //X. modify first row with images and description
    //2. change look and feel of rules pane
    //3. change look and feel of point pane

    var titleTd = document.evaluate('//tr/td[contains(@background, "bk-inhalt-topmiddle.jpg")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (titleTd) {
        var titulo = titleTd.textContent.replace(/^\s+|\s+$/g, '');
        var titleTr = titleTd.parentNode;
        var titleTbody = titleTr.parentNode;
        var titleTable = titleTbody.parentNode;
        var supTd = titleTable.parentNode;
        supTd.removeChild(titleTable);
        supTd.innerHTML = titulo;
    }

    //fuera centers en los tr!!!
    var trCenter = document.evaluate('//tr[@align="center"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < trCenter.snapshotLength; ++i) {
        var tmp = trCenter.snapshotItem(i);
        tmp.removeAttribute('align');
    }

    //eliminamos el primer td center para alinear a la izquierda la zona principal
    var tdCenter = document.evaluate('//td[@align="center"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (tdCenter) tdCenter.removeAttribute('align');


    // eliminamos algun que otro td innecesario
    var tdw24 = document.evaluate('//tr/td[@width="24"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);   
    for (var i = 0; i < tdw24.snapshotLength; ++i) {
        var tmp = tdw24.snapshotItem(i).parentNode;
        tmp.removeChild(tdw24.snapshotItem(i));
    }
       
    //selector de zona del frame que muestra el juego
    switch (titulo) {
        case "Visión general": indexPageVisionGeneral(); break;
		case "Producción" : indexPageProduccion(); break;
    }

    //eliminamos el pie de pagina
    var bottomTd = document.evaluate('//tr/td[contains(@background, "bk-inhalt-bottomflood.jpg")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (bottomTd) {
        var bottomTabla = bottomTd.parentNode.parentNode.parentNode;
        var bSupTd = bottomTabla.parentNode;
        bSupTd.removeChild(bottomTabla);
    }

    //como ya no necesitamos mas los backgrounds
    //(los uso de referencia) nos los cargamos
    replaceBackgrounds();
    
}

function indexPageVisionGeneral() {

    /* esta funcion debera modificarse para adaptarse a los siguientes
     * anuncios sin necesidad de reprogramarla */

    // areglamos un poco el anuncio
    var listTdGreenFirst = document.evaluate('//td[@class="green_first"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var firstTdGreenFirst = listTdGreenFirst.snapshotItem(0);
    firstTdGreenFirst.setAttribute('align', 'left');
    // primer br fuera
    firstTdGreenFirst.removeChild(firstTdGreenFirst.childNodes[0]);

    var insideFirstTdGreenFirst = firstTdGreenFirst.childNodes[1];
    var brTag = insideFirstTdGreenFirst.childNodes[2];

    var node = document.createTextNode(' / ');
    insideFirstTdGreenFirst.insertBefore(node, brTag);
    insideFirstTdGreenFirst.removeChild(brTag);

    var bTag = insideFirstTdGreenFirst.childNodes[4];

    brTag = bTag.childNodes[1];    
    bTag.insertBefore(node.cloneNode(true), brTag);
    bTag.removeChild(brTag);
  
    brTag = bTag.childNodes[2];
    bTag.removeChild(brTag);

    removeTag(bTag, bTag.childNodes[3]);

    var aGo = bTag.childNodes[5];
    removeTag(aGo, aGo.childNodes[1]);

    aGo = bTag.childNodes[7];
    removeTag(aGo, aGo.childNodes[1]);

    brTag = bTag.childNodes[9];
    bTag.removeChild(brTag);
    
    brTag = bTag.childNodes[12];
    bTag.removeChild(brTag);

    brTag = bTag.childNodes[12];
    bTag.insertBefore(node.cloneNode(true), brTag);
    bTag.removeChild(brTag);

    // nos cargamos 3 veces la 13 ya que al eliminar 1 las demas suben en el indice
    for (var i = 0; i < 2; ++i) {
        var textTag = bTag.childNodes[14];
        bTag.removeChild(textTag);
    }
}

function indexPageProduccion() {
	//eliminamos el font para que el mensaje se vea bien
	var tdFont = document.evaluate('//td[@bgcolor="#cc0000"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (tdFont)
		removeTag(tdFont, tdFont.childNodes[0]);
		
	//fuera la primera etiqueta center
    var centerTag = document.evaluate('//center', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (centerTag) {
	    var tmp = centerTag.parentNode;
	    for (var i = 0; i < centerTag.childNodes.length; ++i) {
            var newNode = centerTag.childNodes[i].cloneNode(true);
	        tmp.insertBefore(newNode, centerTag);
	    }
	    
	    tmp.removeChild(centerTag);
    }
	
	//eliminamos los td align center
	var tdCenter = document.evaluate('//td[@align="center"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < tdCenter.snapshotLength; ++i) {
        var tmp = tdCenter.snapshotItem(i);
        tmp.removeAttribute('align');
    }
		
}

// elimina elementos HTML conservando el texto que contienen
// principalmente diseñado para quitar FONT
function removeTag(parentTag, tag) {
    
    var nodeGo = document.createTextNode(tag.textContent);
    parentTag.insertBefore(nodeGo, tag);
    parentTag.removeChild(tag);
    
}

function setWhiteColor( tag) {
	tag.style.backgroundColor = 'white';
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function replaceStyleSheet() {

	if (document.styleSheets.length > 0) {
		var sSheet = document.styleSheets[0];
		
		// buscamos si existen estilos embebidos y los sustituimos!
		for (var i=0; i<sSheet.cssRules.length; i++){
		    var cT = sSheet.cssRules[i].cssText;
			
			if (cT.indexOf('td {') > -1) {
				sSheet.deleteRule(i);
				sSheet.insertRule("td {background-color: white; color:#808080; font-family:Arial, Helvetica; font-size: 0.8em }", i);
			}
					
			if (cT.indexOf('a {') > -1) {
				sSheet.deleteRule(i);
				sSheet.insertRule('a { color:#268826; text-decoration:none; font-family:Arial, Helvetica; font-size: 0.8em }', i);
			}
			
			if (cT.indexOf('a.visited {') > -1) {
				sSheet.deleteRule(i);
				sSheet.insertRule('a.visited { color:#268826; text-decoration:none; font-family:Arial, Helvetica; font-size: 0.8em }', i);
			}
			
			if (cT.indexOf('a.hover {') > -1) {
				sSheet.deleteRule(i);
				sSheet.insertRule('a:hover { color:#D83C3C; text-decoration:none; font-family:Arial, Helvetica; cursor:hand; font-size: 0.8em }', i);
			}		
		}
	}
	
	//eliminamos la llamada a la hoja de estilos
	var link = document.evaluate('//link[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if (link.snapshotLength > 0) {
			
		var rel = link.snapshotItem(0)
		rel.parentNode.removeChild(rel);
		
		//añadimos los estilos propios
		var css = "td.first		{ background-color: white; color:#808080; font-family:Arial, Helvetica; font-size: 8pt }\
					td.second		{ background-color: white; color:#606060; font-family:Arial, Helvetica; font-size: 8pt }\
					td.third		{ background-color: white; color:#505050; font-family:Arial, Helvetica; font-size: 8pt }\
					td.fourth		{ background-color: white; color:#404040; font-family:Arial, Helvetica; font-size: 8pt }\
					td.fifth		{ background-color: white; color:#303030; font-family:Arial, Helvetica; font-size: 8pt }\
					td.red			{ background-color: white; color:#DD0000; font-family:Arial, Helvetica; font-size: 8pt}\
					td.red_first		{ background-color: white; color:#882626; font-family:Arial, Helvetica; font-size: 8pt }\
					td.red_second		{ background-color: white; color:#882626; font-family:Arial, Helvetica; font-size: 8pt }\
					td.red_third		{ background-color: white; color:#882626; font-family:Arial, Helvetica; font-size: 8pt }\
					td.green_first		{ background-color: white; font-family:Arial, Helvetica;  font-size: 8pt; color: #268826  }";
		
		addGlobalStyle(css);

	}
	
}

function replaceImages() {
	var img = document.getElementsByTagName('img');
	for(var i=0; i<img.length; ++i) {
	    img[i].src=egif;
	}

	replaceBackgrounds()
}

function replaceBackgrounds() {		
	var td = document.evaluate('//tr/td[@background]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i = 0; i < td.snapshotLength; ++i) {
		td.snapshotItem(i).removeAttribute('background');
	}
}

