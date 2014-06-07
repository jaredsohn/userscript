// ==UserScript==
// @name                Script Dialog (userscripts.org)
// @description         Simple user script to display a basic dialog to the user.
// @namespace           holyschmidt
// @require             http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version             1.03
//
// @credits             Idea adapted from "Script Updater" by PhasmaExMachina: http://userscripts.org/scripts/show/57756
//
// @todolist            Rounded corners of Dialog in IE
// @todolist            Images not shown correctly in <=IE7
//
// @history             1.03 Fixed opacity issue in IE.
// @history             1.02 Fixed majority of CSS issues in IE
// @history             1.01 Added "tabbing" support
// @history             1.00 Initial release
//
// ==/UserScript==

ScriptDialog = {
	version:"1.03",
	isOpen:false,
	isTabbed:false,
	tabs:null,
	title:"New Dialog",
	width:"500px",
	init:function(title, width, tabs) {
		ScriptDialog.title = title;
		ScriptDialog.width = width;
		ScriptDialog.tabs = tabs;
		ScriptDialog.isTabbed = tabs != null && tabs.length > 1;
	},
	addStyle:function(css) {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'ScriptDialogCSS';
		document.getElementsByTagName('head')[0].appendChild(style);
		if (style.styleSheet) {		// IE
			style.styleSheet.cssText = css;
		} else {			// the world
			style.appendChild(document.createTextNode(css));
		}		
	},
	show:function(SettingsCallback) {
		ScriptDialog.addStyle(
			"#ScriptDialogMask { position:absolute; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; filter: alpha(opacity = 70); z-index:9997; } \
			#ScriptDialogWindow * { font-size:12px; color:#333; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; } \
			#ScriptDialogWindow { width:"+ScriptDialog.width+"; margin:auto; top:125px; position:fixed; left:25%; text-align:left; background:#f9f9f9; border:1px outset #333; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9998; color:#333; padding-bottom:1em ; } \
			#ScriptDialogWindow input { border:1px outset #666; padding:1px 3px 1px 2px; -moz-border-radius:3px; font-size:10px; } \
			#ScriptDialogHeader { padding:.5em; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em; } \
			#ScriptDialogHeader img { margin-right:.5em; margin-left:.5em; } \
			#ScriptDialogHeader h1 { display:inline; font-size:13px; font-weight:bold; color:#fff; } \
			#ScriptDialogHeader input.ScriptTabActive { background:no-repeat 4px center #eee; float:right; margin-right:.5em; } \
			#ScriptDialogHeader input.ScriptTabInactive { background:no-repeat 4px center #bbb; float:right; margin-right:.5em; } \
			#ScriptDialogHeader input.ScriptTabInactive:hover { background:no-repeat 4px center #FF0000; cursor:pointer; } \
			#ScriptDialogBody input.button:hover { background:no-repeat 4px center #FF0000; cursor:pointer; } \
			#ScriptDialogBody a { text-decoration:underline; color:#000099; font-weight:bold; } \
			#ScriptDialogBody strong { font-weight:bold; } \
			#ScriptDialogBody ul { margin-left:2em; } \
			#ScriptDialogBody li { list-style-type:circle; } \
			#ScriptDialogBody p { font-size:12px; font-weight:normal; margin:1em; } \
			#ScriptDialogBody .ScriptDialogTagBodyActive, #ScriptDialogBody .ScriptDialogTagBodyInactive { width:100%; height:100%; } \
			#ScriptDialogBody .ScriptDialogTagBodyInactive { display:none; } \
			#ScriptDialogClose { float:right; cursor:pointer; height:14px; opacity:.5; filter: alpha(opacity = 50); } \
			#ScriptDialogClose:hover { opacity:.9; filter: alpha(opacity = 90); } \
			#ScriptDialogFooter { margin:.75em 1em; } \
			#ScriptDialogFooter input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:70px; float:right; margin-left:.5em; } \
			#ScriptDialogFooter input:hover { background-color:#f9f9f9; } \
			#ScriptDialogFooter select { border:1px inset #666; }"
		);
			
		var dialogBg = document.createElement('div');							
		dialogBg.id = "ScriptDialogMask";
		document.body.appendChild(dialogBg);
		
		var dialogWrapper = document.createElement('div');
		dialogWrapper.setAttribute('style', 'position:absolute; width:100%; top:0; left:0; z-index:9999; max-width:auto; min-width:auto; max-height:auto; min-height:auto;');
		dialogWrapper.id = "ScriptDialogWindowWrapper";
			var html = new Array();
			var dialogBody = document.createElement('div');
			dialogBody.id = "ScriptDialogWindow";
			html.push('<div id="ScriptDialogHeader">');
				html.push('<img id="ScriptDialogClose" src="' + ScriptDialog.icons.close + '" title="Close" alt="close"/>');
				if (ScriptDialog.isTabbed) {
				for (t = ScriptDialog.tabs.length - 1; t >= 0; t--) {
					html.push('<input type="button" class="');
					html.push((t==0 ? 'ScriptTabActive' : 'ScriptTabInactive'));
					html.push('" value="' + ScriptDialog.tabs[t] + '" />');	
					}
				}
				html.push('<img src="' + ScriptDialog.icons.uso + '" align="absmiddle" style="margin-top:-2px;" alt="uso"/>');
				html.push('<h1 id="ScriptDialogHeaderTitle">')
				html.push(ScriptDialog.title);
				html.push('</h1>');
			html.push('</div>');
			html.push('<div id="ScriptDialogBody">');
				if (ScriptDialog.isTabbed) {
				for (t = ScriptDialog.tabs.length - 1; t >= 0; t--) {
					html.push('<div class="' + (t==0 ? 'ScriptDialogTagBodyActive' : 'ScriptDialogTagBodyInactive') + '" ');
					html.push('id="ScriptDialogTab' + ScriptDialog.tabs[t] + '">');
					html.push('<p>This is an example paragraph, and <a href="#">link</a> in the ' + ScriptDialog.tabs[t] + ' tab.</p>');
					html.push('</div>');
					}
				}
			html.push('</div>');
			html.push('<div id="ScriptDialogFooter">');
				html.push('<input type="button" id="ScriptDialogCloseButton" value="Close" style="background-image:url(');
				html.push(ScriptDialog.icons.close);
				html.push(')"/>');
			html.push('</div>');
			dialogBody.innerHTML = html.join('');
		dialogWrapper.appendChild(dialogBody);
		document.body.appendChild(dialogWrapper);

		ScriptDialog.isOpen = true;

		$('#ScriptDialogHeader img').error(function() { ScriptDialog.imageError(this); });
		$('#ScriptDialogHeader input.ScriptTabInactive').live('click', ScriptDialog.changeTab);
		$('#ScriptDialogClose').click(ScriptDialog.closeNotice);
		$('#ScriptDialogCloseButton').click(ScriptDialog.closeNotice);

		if (window.addEventListener) {
			window.addEventListener('keypress', ScriptDialog.keyPressHandler, true);
		} else if (document.addeventlistener) {
			document.addeventlistener('keypress', ScriptDialog.keyPressHandler, true);
		} else if (document.attachEvent){
			document.attachEvent('onkeypress', ScriptDialog.keyPressHandler);
		} 

		if(SettingsCallback != null && typeof(SettingsCallback.onshown) == 'function') {
			SettingsCallback.onshown();
		}		
	},
	changeTab:function() {
		this.blur();
		$('#ScriptDialogHeader input.ScriptTabActive').each(function() { $(this).attr('class', 'ScriptTabInactive') });
		$('#ScriptDialogBody .ScriptDialogTagBodyActive').each(function() { $(this).attr('class', 'ScriptDialogTagBodyInactive') });
		$(this).attr('class', 'ScriptTabActive');
		$('#ScriptDialogTab'+this.value).attr('class', 'ScriptDialogTagBodyActive');
	},
	closeNotice:function() {
		ScriptDialog.open = false;
		document.body.removeChild(document.getElementById('ScriptDialogWindowWrapper'));
		document.body.removeChild(document.getElementById('ScriptDialogMask'));
		document.getElementsByTagName('head')[0].removeChild(document.getElementById('ScriptDialogCSS'));

		if (window.removeEventListener) {
			window.removeEventListener('keypress', ScriptDialog.keyPressHandler, true);
		} else if (document.removeEventListener) {
			document.removeEventListener('keypress', ScriptDialog.keyPressHandler, true);
		} else if (document.attachEvent){
			document.detachEvent('onkeypress', ScriptDialog.keyPressHandler);
		} 
	},
	getBody:function() {
		if (!ScriptDialog.isOpen) {
			alert('script dialog not open!');
		} 
		else if (!ScriptDialog.isTabbed) {
			var body = document.getElementById('ScriptDialogBody');
			if (body != null)
				return body;
			alert('script dialog body not found!');
		} 
		else {
			alert('body not accessible due to tag setting!');
		}
		return null;
	},
	getTab:function(name) {
		if (!ScriptDialog.isOpen) {
			alert('script dialog not open!');
		} 
		else if (ScriptDialog.isTabbed) {
			var tag = document.getElementById('ScriptDialogTab' + name);
			if (tag != null)
				return tag;
			alert('tag not found!');
		}
		else {
			alert('tag setting not enabled!');
		}
		return null;
	},
	keyPressHandler:function (e) {
		if(e.keyCode == 27) { ScriptDialog.closeNotice(); }
	},
	icons:{
		close:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
		uso:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D"
	},
	imageError:function(img) {
		// In browsers <= IE7, the data:image/png;base64 is not supported.  In this case, you will need to save the two 
		// images above (close and uso) as close.png and uso.png and drop them in the same folder as this .js script.
		img.src = img.alt + '.png';
		if (img.alt == 'close') {
			$('#ScriptDialogCloseButton').attr('style', 'background-image:url(close.png)');
		}
	}
};

