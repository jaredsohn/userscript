// ==UserScript==
// @name            SU V4 Stumbler Icons
// @version	    	0.15
// @namespace       http://www.foresthippy.com
// @description     John
// @include         http://www.stumbleupon.com/stumblers/*
// @include			http://www.stumbleupon.com/stumbler/*
// @include			http://www.stumbleupon.com/url/*
// @copyright       © John Mackay 2010
// ==/UserScript==

var imgFan = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wEAAAAAAAAAAAAAAACoiGD/+vbyAP8B/wAFBQoAWnylAQAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAqIdb/wL//QAUGyMA/Pr6APr6+ADy7+4A' +
		'WnylAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAXGRwAPk9dAO3q5gDu7OYABgYI' +
		'AA4REgC5n37/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAABwXGAANFB4ASl91AEJW' +
		'bwDw7egAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAP369gAD' +
		'BQsAERcdAD5PXwACBQsA1cvEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAD9/f8A' +
		'AgMGAPv58wD9+/cACw0OAPjy6gAKDhIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAA' +
		'APv7/QACBQkA+/fvAPz48QD8+vYA7t3WADdLYwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAA' +
		'AAAAAAAACAcNAAMEBwAKEyMABAoUANbLwQAICxIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAABAAAAAAAAAAAAAAAA3bqb/+bs4wAAAAAALDhCAPTe1wAdRGkBAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAIAAAAAAAAAAAAAAAC29ioAIA8HADdBUAANDA8A3/8WAEev3P8AAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAQAAAAA+qNf/Fg4LAPgNDgB5G+4AEQcDAMH1DQCl8AsAEQcGAFL+6wBhMRYBAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAABWqrW/6YfKQArBAAAAvn6AAAAAAAH//0A7Pv/ACAKBwACBAMAGQMAACoH' +
		'/gB7KAMBAAAAAAAAAAAAAAAAAAAAAATK9P8ALQAAABn//gAABQUA/v/+AAD+AwAQBAAAAP8AAAD6/QDl' +
		'/v8AEv4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtz3/wAM9vsA/vr9AP35+wD/+v0A/vv9AP74/AD++PwA' +
		'/vn8AP75/ADd8vwASb31/wAAAAAAAAAAAAAAAAAAAAAEB/0AAP7t8gD+EwoA//0AAAAAAAAAAAAAAP//' +
		'AAAAAAD4+f0A/vj6AAMOCQD4+v0AAAAAAAAAAAAAAAAAAAAAAAQa//wAC/f0AA39CAAAAAAAAAAAAP/+' +
		'AAAAAP8AAAABAADx9wAA+fIADAkEAP/9AAAAAAAAAAAAAAAAAAAAAAAAIYPJLl1w26kAAAAASUVORK5C' +
		'YII=';

var imgFFan = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wEAAAAAAAAAAAAAAACoiGD/+vbyAP8B/wAFBQoAWnylAdmaIAEn' +
		'ZuD/15gfUAAAAJAAAAB+KWjhogAAAAAAAAAAAgAAAAAAAAAAqIdb/wL++AAcIykAGRwkAA4REgCmhFv/' +
		'J2bg/wAAAAAKDgNdFyAHHwoOA1oAAAAAAAAAAAAAAAABAAAAAAAAAAC/oHf/KTU+AMO2rAD9/PoAEhQa' +
		'APr6+AAFChEAIPuh7RIaBhMSGgUA8On7AOvj+uv8+/+9AgIAwwIAAAAAAAAAABwXGAANFB4ASl91AEJW' +
		'bwDw7egAAAAAAAAAAAAhMAoTFCMH/wECAP8SHwf7IjAKFQ8VBUz8+v8BBAAAAAAAAAAAAAAAAP369gAD' +
		'BQsAERcdAD5PXwACBQsA1cvEAOzk+/cUHAAJBQ0D/P31/gXt5fr28Oj6fS5v45UCAAAAAAAAAAD9/f8A' +
		'AgMGAPv58wD37+QACw0OAAH67QAKDhIA/Pr+1P//AAAABQED/v7/APz6/9zbyvahAAAAAAIAAAAAAAAA' +
		'APv7/QACBQkA+/fvAPz48QD8+vYA7t3WAA/kgiQCAwEg7eT6AODI9QDr4voAAgMBGC1CDRcAAAAAAgAA' +
		'AAAAAAAACAcNAAMEBwAKEyMABAoUANbLwQAICxIA/v7/JPHr+9Tt5vpdIVzeAu7n+lXw6fvV+/n+KgAA' +
		'AAABAAAAAAAAAAAAAAAA3bqb/+bs4wAAAAAALDhCAPTe1wAdRGkBAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAIAAAAAAAAAAAAAAAC29ioAIA8HADdBUAANDA8A3/8WAEev3P8AAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAQAAAAA+qNf/Fg4LAPgNDgB5G+4AEQcDAMH1DQCl8AsAEQcGAFL+6wBhMRYBAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAABWqrW/6YfKQArBAAAAvn6AAAAAAAH//0A7Pv/ACAKBwACBAMAGQMAACoH' +
		'/gB7KAMBAAAAAAAAAAAAAAAAAAAAAATK9P8ALQAAABn//gAABQUA/v/+AAD+AwAQBAAAAP8AAAD6/QDl' +
		'/v8AEv4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtz3/wAM9vsA/vr9AP35+wD/+v0A/vv9AP74/AD++PwA' +
		'/vn8AP75/ADd8vwASb31/wAAAAAAAAAAAAAAAAAAAAAEB/0AAP7t8gD+EwoA//0AAAAAAAAAAAAAAP//' +
		'AAAAAAD4+f0A/vj6AAMOCQD4+v0AAAAAAAAAAAAAAAAAAAAAAAQa//wAC/f0AA39CAAAAAAAAAAAAP/+' +
		'AAAAAP8AAAABAADx9wAA+fIADAkEAP/9AAAAAAAAAAAAAAAAAAAAAAAA560lrMoXelkAAAAASUVORK5C' +
		'YII=';

var imgFMutual = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANmaIAEA' +
		'AAAA15gfUNeYH+DXmB9eAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAqIhgAQAAAAAAAAAA' +
		'J2bg/6aEWwEKDgNdFyAHHwoOA1oAAAAAAAAAAAAAAAABAAAAAAAAAACoiWGw+PPvRQIEBAoEBAccAQID' +
		'5Pj27/oGBwwFNBfG7hIaBhMSGgUA8On7AOvj+uv8+/+9AgIAwwEAAAAAq4tfSwsLDLQCBAcA/vz9/vX0' +
		'8QIQERH++vv+AgICAQD8+egASUTY/wL7+gABBgL8+/T9Beng+vTv5/p4BAAAAAAlICH6Gy08APT2+ADj' +
		'2tMCFhIQACc+UALp5eMAz76tAAgMFgDr6ekBGBnr/P31/gXt5fr28Oj6fS5v45UEAAAAAAgGBwD//fsA' +
		'FhogABUbIgDn0L0AAAD+AB0lLwAODw4A9PT3AADw0wAABQED/v7/APz6/9zbyvahAAAAAAIAAAAA+fn8' +
		'AAIDCAD38+gA/vnxAPn49wACAwcA9OvcAAoLCgD+8Nr++u/zAODI9QDr4voAAgMBGC1CDRcAAAAAAgAA' +
		'AAAFBAoFBAcMAAoRHQDu6+kAA/8HAAYMEv8LEh0A1cm+AAP27vDy5uldIVzeAu7n+lXw6fvV+/n+KgAA' +
		'AAABAAAAAAAAAADTtp+z8ezYTBgjKwAJ/P0A9+TjAOUA+QAxP0wA9b2zxRlfhjwAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAIAAAAASafVm4kBQy4eLkAADP8SAOC0xAAjpp8AOQ4cAAzHyAAYn507/lo1wQAAAAD/bEsB' +
		'AAAAAAAAAAAAAAAAAV6p1OyoIisTKPz7AAv59ADGcRUA/xQZAAD59wABBAQAAPXzAP8UGP8BCgwBABge' +
		'7QGTtBQAAAAAAAAAAAAAAAAEt/D/CTUAAAAMAwIAAwIEAOYABgAaBQYAAAUGAAD//gAABggAAPz7AQDt' +
		'6gD/AAEM/zMFGwHN++UAAAAAAAAAAATr+AAAKO31APoHAwAD+PsA9Pf3AAD18gAA/f0AAAAAAAD+/QAB' +
		'//4A/Pj4AAT59wcAAQF9AAAAaAAAAAAAAAAABCD//PcL8vIABxIOAAT+/QAB/gAK9wEFAAEGCAAAAP4A' +
		'AAAAAAT38/br9/wAGQX7AQD5+vUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAQLHwAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsK4hbL5BBKkAAAAASUVORK5C' +
		'YII=';

var imgFSub = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wEAAAAAAAAAAAAAAACoiGD/+vbyAP8B/wAFBQoAWnylAdmaIAEn' +
		'ZuD/15gfUAAAAJAAAAB+KWjhogAAAAAAAAAAAgAAAAAAAAAAqIdb/wL++AAcIykAGRwkAA4REgCmhFv/' +
		'J2bg/wAAAAAKDgNdFyAHHwoOA1oAAAAAAAAAAAAAAAABAAAAAAAAAAC/oHf/KTU+AMO2rAD9/PoAEhQa' +
		'APr6+AAFChEAIPuh7RIaBhMSGgUA8On7AOvj+uv8+/+9AgIAwwIAAAAAAAAAABwXGAANFB4ASl91AEJW' +
		'bwDw7egAAAAAAAAAAAAhMAoTFCMH/wECAP8SHwf7IjAKFQ8VBUz8+v8BBAAAAAAAAAAAAAAAAP369gAD' +
		'BQsAERcdAD5PXwACBQsA1cvEAOzk+/cUHAAJBQ0D/P31/gXt5fr28Oj6fS5v45UCAAAAAAAAAAD9/f8A' +
		'AgMGAPv58wD37+QACw0OAAH67QAKDhIA/Pr+1P//AAAABQED/v7/APz6/9zbyvahAAAAAAIAAAAAAAAA' +
		'APv7/QACBQkA+/fvAPz48QD8+vYA7t3WAA/kgiQCAwEg7eT6AODI9QDr4voAAgMBGC1CDRcAAAAAAgAA' +
		'AAAAAAAACAcNAAMEBwAKEyMABAoUANbLwQAICxIA/v7/JPHr+9Tt5vpdIVzeAu7n+lXw6fvV+/n+KgAA' +
		'AAABAAAAAAAAAAAAAAAA3bqb/+bs4wAAAAAALDhCAPTe1wAdRGkBAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAD/Qxn/47WF//rnzv/86s///1gy//8vAP8AAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAQAAAAD0LAD/Cw0NAAANEAAAOUUAAA0QAADk3gAA2M8AAA0QAAASFQABmbwBAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAB/y8A/wAICwAAERQAAPf1AAAAAAAAAAAAAPf1AAATFwAABQYAAAoMAAAU' +
		'GQABlLUBAAAAAAAAAAAAAAAAAAAAAATf+QAAIRQOAAAEBQAADRAAAP/+AAD+/gAACgwAAAAAAAD7+gAA' +
		'7usAAAUHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAun8AAAA+/kAAPz7AAD49wAA+fkAAPr5AAD49gAA+PYA' +
		'APj2AAD49QAA5uAA/z8U/wAAAAAAAAAAAAAAAAAAAAAE/wAAAPjv7gAIAQIAAPz7AAAAAAAAAAAAAP7+' +
		'AAAAAAAA+PUA+Pz+AAgMDQAA+PUAAAAAAAAAAAAAAAAAAAAAAAIIAQAA+P4AAAAAAAAABAUAAAQFAAAD' +
		'AwAABQUAAAUFAPL7/gDw/QAAAP7+AAD+/gAAAAAAAAAAAAAAAAAAAAAA9hYPuHKm6EoAAAAASUVORK5C' +
		'YII=';

var imgMutual = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqIhgAQAAAAAAAAAA' +
		'AAAAAKaEWwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAACoiWGw+PPvRQIEBAoEBAccAQID' +
		'5Pj28PYGBwwHW32mBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAq4tfSwsLDLQCBAcA/vz9/vX0' +
		'8QIQERH++vv+AgICAv/y8e/fGyc1LzxQa/QAAAAAAAAAAAAAAAAAAAAABAAAAAAlICH6Gy08APT2+ADj' +
		'2tMCFhIQACc+UALp5eMAz76tAQoMDyL18Oo8AAAAuAAAAAAAAAAAAAAAAAAAAAAEAAAAAAgGBwD//fsA' +
		'FhogABUbIgDn0L0AAAD+AB0lLwAODw4A9PT3ANzTzf0AAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAA+fn8' +
		'AAIDCAD38+gA/vnxAPn49wACAwcA9OvcAAoLCgD+8uXnChIa3wAAAAAAAAAAAAAAAAAAAAAAAAAAAgAA' +
		'AAAFBAoFBAcMAAoRHQDu6+kAA/8HAAYMEv8LEh0A1cm+AAb9/9I8TWLcAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAABAAAAAAAAAADTtp+z8ezYTBgjKwAJ/P0A9+TjAOUA+QAxP0wA9b2zxRlfhjwAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAIAAAAASafVm4kBQy4eLkAADP8SAOC0xAAjpp8AOQ4cAAzHyAAYn507/lo1wQAAAAD/bEsB' +
		'AAAAAAAAAAAAAAAAAV6p1OyoIisTKPz7AAv59ADGcRUA/xQZAAD59wABBAQAAPXzAP8UGP8BCgwBABge' +
		'7QGTtBQAAAAAAAAAAAAAAAAEt/D/CTUAAAAMAwIAAwIEAOYABgAaBQYAAAUGAAD//gAABggAAPz7AQDt' +
		'6gD/AAEM/zMFGwHN++UAAAAAAAAAAATr+AAAKO31APoHAwAD+PsA9Pf3AAD18gAA/f0AAAAAAAD+/QAB' +
		'//4A/Pj4AAT59wcAAQF9AAAAaAAAAAAAAAAABCD//PcL8vIABxIOAAT+/QAB/gAK9wEFAAEGCAAAAP4A' +
		'AAAAAAT38/br9/wAGQX7AQD5+vUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAQLHwAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3SXVCLTp1c4AAAAASUVORK5C' +
		'YII=';

var imgSub = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wEAAAAAAAAAAAAAAACoiGD/+vbyAP8B/wAFBQoAWnylAQAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAqIdb/wL//QAUGyMA/Pr6APr6+ADy7+4A' +
		'WnylAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAXGRwAPk9dAO3q5gDu7OYABgYI' +
		'AA4REgC5n37/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAABwXGAANFB4ASl91AEJW' +
		'bwDw7egAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAP369gAD' +
		'BQsAERcdAD5PXwACBQsA1cvEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAD9/f8A' +
		'AgMGAPv58wD9+/cACw0OAPjy6gAKDhIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAA' +
		'APv7/QACBQkA+/fvAPz48QD8+vYA7t3WADdLYwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAA' +
		'AAAAAAAACAcNAAMEBwAKEyMABAoUANbLwQAICxIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAABAAAAAAAAAAAAAAAA3bqb/+bs4wAAAAAALDhCAPTe1wAdRGkBAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAD/Qxn/47WF//rnzv/86s///1gy//8vAP8AAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAQAAAAD0LAD/Cw0NAAANEAAAOUUAAA0QAADk3gAA2M8AAA0QAAASFQABmbwBAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAB/y8A/wAICwAAERQAAPf1AAAAAAAAAAAAAPf1AAATFwAABQYAAAoMAAAU' +
		'GQABlLUBAAAAAAAAAAAAAAAAAAAAAATf+QAAIRQOAAAEBQAADRAAAP/+AAD+/gAACgwAAAAAAAD7+gAA' +
		'7usAAAUHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAun8AAAA+/kAAPz7AAD49wAA+fkAAPr5AAD49gAA+PYA' +
		'APj2AAD49QAA5uAA/z8U/wAAAAAAAAAAAAAAAAAAAAAE/wAAAPjv7gAIAQIAAPz7AAAAAAAAAAAAAP7+' +
		'AAAAAAAA+PUA+Pz+AAgMDQAA+PUAAAAAAAAAAAAAAAAAAAAAAAIIAQAA+P4AAAAAAAAABAUAAAQFAAAD' +
		'AwAABQUAAAUFAPL7/gDw/QAAAP7+AAD+/gAAAAAAAAAAAAAAAAAAAAAAL+yzOt2AzssAAAAASUVORK5C' +
		'YII=';

function checkFlags () {
	if (subsFinished && fansFinished) {
		GM_log ('Subs (' + subsArray.length + '): ' + subsArray);
		GM_log ('Fans:' + fansArray.length + '): ' + fansArray);
		GM_log ('Friends:' + friendsArray.length + '): ' + friendsArray);
		subsStr = strArray (subsArray);
		fansStr = strArray (fansArray);
		friendsStr = strArray (friendsArray);
		GM_setValue ('Subs', subsStr);
		GM_setValue ('Fans', fansStr);
		GM_setValue ('Friends', friendsStr);
		GM_setValue ('SFTotal', currSFTotal);
		updateCtrl.textContent = 'Update Icons';
		updateMsg.textContent = '';
		updateIcons ();
		GM_setValue ('Pending', false);
	}
}

function strArray (array) {
	var i;
	var str=',';
	
	for (i=0; i<array.length; i++) {
		str += array[i] + ',';
	}
	return str;
}

function extractNames (page, array, getfriends) {
	var stumblerul = page.match (/<ul class="gridUsers clearfix">[\s\S]*?<\/ul>/i)[0];
	var stumblermatch = stumblerul.match (/<li class="">[\s\S]*?<\/li>/gi);
	var i;
	
	if (stumblermatch != null) {
		for (i=0; i<stumblermatch.length; i++) {
			var stumblerid = /title="([^\s]*?)\s/.exec (stumblermatch[i])[1];
			array.push (stumblerid);
			if (getfriends) {
				if (stumblermatch[i].search ("Direct share") != -1) {
					friendsArray.push (stumblerid);
				}
			}
		}
		return stumblermatch.length;
	} else return 0;
}

function processPage (url, index, array, getfriends) {
	var xmlhttp=null;
	
	GM_log ('Reading page: ' + url + index + '/');
	
	if (lastSFTotal > 0) {
		updateMsg.textContent = 'Updating - ' + Math.round ((100 * currSFTotal) / lastSFTotal) + '%';
	}		
	
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}

	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=function () { 
			if (xmlhttp.readyState < 4) {
			
			} else if (xmlhttp.readyState == 4) {
				var page = xmlhttp.responseText;
				var namecount = extractNames (page, array, getfriends);
				currSFTotal += namecount;
				if (namecount == 25) {
					processPage (url, index + 25, array, getfriends);
				} else {
					// finished
					if (array == subsArray) {
						subsFinished = true;
					} else {
						fansFinished = true;
					}
					checkFlags ();
				}
			}
		};
		xmlhttp.open('GET',url + index + '/',true);
		xmlhttp.send(null);
	}
}

function fullUpdate () {
	updateCtrl.textContent = '';
	updateMsg.textContent = 'Updating...';
	removeNewIcons ();
	currSFTotal = 0;
	GM_setValue ('Pending', true);
	subsFinished = false;
	fansFinished = false;
	processPage ('http://www.stumbleupon.com/stumblers/subscriptions/', 0, subsArray, true);
	processPage ('http://www.stumbleupon.com/stumblers/subscribers/', 0, fansArray, false);
}

function addControl () {
	var alldivs = document.getElementsByTagName ('div');
	var navdiv;
	var i;
	for (i=0; i<alldivs.length; i++) {
		if (alldivs[i].id == 'navSecondary') {
			navdiv = alldivs[i]; // get last one
		}
	}
	
	var navul = navdiv.getElementsByClassName ('right')[0];
	
	var tli = document.createElement ('li');
	
	updateCtrl = document.createElement ('a');
	updateMsg = document.createElement ('span');
		
	updateCtrl.href = 'javascript:void(0);';
	updateCtrl.textContent = 'Update Icons';
	updateCtrl.addEventListener ('click', fullUpdate, false);
	updateMsg.style.textDecoration = 'blink';
	updateCtrl.style.fontSize = '100%';
	tli.appendChild (updateCtrl);
	tli.appendChild (updateMsg);
	navul.insertBefore (tli, navul.firstChild);
}

function removeNewIcons () {
	var icons = document.getElementsByClassName ('jdmicon');
	var i;
	
	for (i=0; i<icons.length; i++) {
		icons[i].parentNode.removeChild (icons[i]);
		i--; // Irritating fudge
	}
}

function setIconForStumbler (uname, iconparent) {
	var unsearch = ',' + uname + ',';
	var isfriend = false, isfan = false, issub = false;
	var img;
	
	if (fansStr.search (unsearch) != -1) {
		isfan = true;
	}
	
	if (subsStr.search (unsearch) != -1) {
		issub = true;
	}
	
	if (friendsStr.search (unsearch) != -1) {
		isfriend = true;
	}
	
	//GM_log (unsearch + ' is a fan: ' + isfan + ' is a sub: ' + issub + ' is a friend: ' + isfriend);
	
	if (isfriend || isfan || issub) {
		img = document.createElement ('img');
		img.className = 'jdmicon';
		if (isfriend) {
			if (isfan) {
				if (issub) {
					img.src = imgFMutual;
					img.title = 'Mutual subscriber / Sharing';
				} else {
					img.src = imgFFan;
					img.title = 'Subscriber / Sharing';
				}
			} else {
				if (issub) {
					img.src = imgFSub;
					img.title = 'Subscription / Sharing';
				} else {
					img.src = imgFriend;
					img.title = 'Sharing'; // shouldn't happen
				}
			}
		} else {
			if (isfan) {
				if (issub) {
					img.src = imgMutual;
					img.title = 'Mutual subscriber';
				} else {
					img.src = imgFan;
					img.title = 'Subscriber';
				}
			} else {
				if (issub) {
					img.src = imgSub;
					img.title = 'Subscription';
				} // Else WTF?
			}
		}
		iconparent.appendChild (img);
	}
}

function updateIcons () {
	var stumblerul = document.getElementsByClassName ('gridUsers clearfix')[0];
	var stumblerli = stumblerul.getElementsByTagName ('li');
	
	var i;
	
	for (i=0; i<stumblerli.length; i++) {
		var uname = stumblerli[i].childNodes[3].childNodes[1].title;
		
		var iconparent = stumblerli[i].childNodes[3];
		var x;
		
		var oldicon = stumblerli[i].getElementsByClassName ('iconDirectShare')[0];
		
		if (oldicon != null) {
			oldicon.parentNode.removeChild (oldicon);
		}
		
		var subicon = stumblerli[i].getElementsByClassName ('iconSubscription')[0];
		
		if (subicon != null) {
			subicon.parentNode.removeChild (subicon);
		}
			
		setIconForStumbler (uname, iconparent);
	}
}

function addVisit () {
	var sidebar = document.getElementsByClassName ('colRight')[0];
	var i;
	var subs = subsStr.split (',');
	var toption;
	var tselect = document.createElement ('select');
	var tdiv = document.createElement ('div');
	
	subs.sort (function(x,y){ 
		var a = String(x).toLowerCase(); 
		var b = String(y).toLowerCase(); 
		if (a > b) 
			return 1 
		if (a < b) 
			return -1 
		return 0; 
    }); 
	
	toption = document.createElement ('option');
	toption.innerHTML = 'Choose someone...';
	tselect.appendChild (toption);
	
	for (i=0; i<subs.length; i++) {
		if (subs[i] != '') {
			toption = document.createElement ('option');
			toption.textContent = subs[i];
			tselect.appendChild (toption);
		}
	}
	
	tselect.addEventListener ('change', function () {
		if (this.selectedIndex > 0) window.location.href = 'http://www.stumbleupon.com/stumbler/' + this.options[this.selectedIndex].textContent + '/';
	}, false);
	tselect.selectedIndex = 0;
	tselect.addEventListener ('focus', function () {
		this.options[0].textContent = '';
	}, false);
	tselect.addEventListener ('blur', function () {
		this.options[0].textContent = 'Choose someone...';
	}, false);
	tselect.style.fontSize = '1.2em';
	
	tdiv.className = 'box borderBottom';
	tdiv.innerHTML = '<h3>Visit a subscription</h3>';
	tdiv.appendChild (tselect);
	sidebar.appendChild (tdiv);
	
	tdiv.previousSibling.previousSibling.className = 'box borderBottom';
}
	
function addSingleIcon () {	
	var headerul = document.getElementsByClassName ('headerControls')[0];
	var unameh1 = headerul.childNodes[3].childNodes[1];
	var uname = unameh1.textContent;
	uname = uname.replace (/\s/g, '');
	GM_log (uname);
	setIconForStumbler (uname, unameh1);
}	
	
var subsArray = new Array ();
var fansArray = new Array ();
var friendsArray = new Array ();
var subsFinished = false;
var fansFinished = false;
var updateCtrl;
var updateMsg;
var fansStr = GM_getValue ('Fans', '');
var subsStr = GM_getValue ('Subs', '');
var friendsStr = GM_getValue ('Friends', '');
var lastSFTotal = GM_getValue ('SFTotal', 0);
var currSFTotal = 0;
var currURL = window.location.toString();

if (currURL.search ('www.stumbleupon.com/stumblers/') != -1) {
	GM_log ('Friends page');
	addControl ();
	if (subsStr != '') {
		addVisit ();
	}
	updateIcons ();
	if (GM_getValue ('Pending', true)) {
		fullUpdate ();
	}
} else if (currURL.search ('www.stumbleupon.com/url/') != -1) {
	GM_log ('Review page');
	updateIcons ();
} else { // stumbler page
	GM_log ('Stumbler page');
	addSingleIcon ();
}


