// ==UserScript==
// @name		DeviantART Toolbox
// @namespace	http://aeonoftime.deviantart.com
// @description	Provides a Toolbox for DeviantART with a loadful of useful functions
// @include		http://*.deviantart.*
// @exclude		http://shout.deviantart.com/*
// @exclude		http://comments.deviantart.com/*
// @exclude		http://*.deviantart.com/friends/*
// ==/UserScript==

// Author.: Sebastian Mordziol aka AeonOfTime
// Link...: http://aeonoftime.deviantart.com

// Changelog:
//
// v0.1
// - Initial revision
//
// v0.2
// - Fixed error when user is not logged in
//
// v0.3
// - Added spanish language, courtesy of hateeyes.deviantart.com (thanks!)
// - Added collapsable categories (also memorize their state), controllable via option
// - Added option to set which categories to display
// - Added option to remove the displayed username
//
// v0.4
// - Converted file from utf-8 to ISO-8859-1 to avoid encoding corruption on userscripts.org
// - Added missing spanish translations, courtesy of hateeyes.deviantart.com
// - Added Tools category
// - Added DeviantART category
// - Added option to remove the footer "vanity" text
//
// v0.5
// - Added additional links
// - Fixed random deviation / deviant links
// - Added minimum functionality when user is not logged in, like all overall DA pages
// - Added some graphics (DA-internal)
// - Added "Follow mode" option to make the toolbox follow the scrolling position
// - Fixed encoding again :(
// - Improved the about screen
//
// v0.6
// - Added Yahoo! UI libraries to handle some functionality
//
// v0.7
// - Updated to work with deviantART v5
// - Added page check so the toolbox will not show up in the emoticons reference page.
// - Improved link styles
// - Added collapse/expand all sections links
// - Added option to remove the titlebar text ('Access toolbox'/'Close toolbox')
// - Added symbol to username display
// - Compacted the link lists a bit
// - Removed Yahoo! UI libraries, they take too much space.
// - Added the prints management pricing calculations enhancement
// - Fixed conflicts with DA-specific styles on some pages
// - Improved layout of categories selector, made category names clickable
// - Categorized the options screen
//
// v0.8
// - Fixed issue with the toolbox showing up in Google ads
// - Fixed issue with having to scroll after closing the options to update the toolbox' position
// - Added shortcut link for the follow mode to change it in a click
// - Added hover titles for the top right shortcut links
// - Added support for color themes with integrated images
// - Added the new Silver deluxe color scheme which includes custom images
// - Added option to force link titles to be cut at a specific length
// - Revamped the link lists to be a little more compact
// - Started building the color scheme editor
// - Changed the toolbox icon to the new DA fella icon

var deviantToolbox = {
	'version':'0.8',
	'releaseDate':'12.08.2006',
	'data':{},
	'prefix':'deviantToolbox_',
	'open':false,
	'optionsOpen':false,
	'openBtn':'<img src="http://i.deviantart.com/icons/favicon.png" style="float:left;"/>',
	'closeBtn':'<img src="http://i.deviantart.com/icons/favicon.png" style="float:left;"/>',
	'sections':['devs','user','prints','admin','tools','da'],
	'offset':[5,5],
	'updateDelay':800,
	'aboutCreated':false,
	'styleEditorCreated':false,
	'baseZIndex':'1000000',
	'positionTimer':null,
	'displayEl':null,
	'bulletImage':'http://e.deviantart.com/emoticons/p/pointr.gif',
	'disableOnPages':[
		'http://comments.deviantart.com/emoticons',
		'http://ads.deviantart.com',
		'http://pagead2.googlesyndication'
	],
	'optionDefaults':{
		'persistState':'yes',
		'layout':'vertical',
		'language':'en',
		'skin':'daClassic',
		'translateLinks':'yes',
		'displaySections':'devs,user,prints,admin,tools,da',
		'collapsableSections':'yes',
		'displayWelcome':'yes',
		'displayVanity':'yes',
		'displayTitleText':'yes',
		'sticky':'yes',
		'enablePricingEnhancement':'yes',
		'maxLinkLabelLength':40
	},
	'colorParts':[
		'frame',
		'frameText',
		'borders',
		'content',
		'contentText',
		'button',
		'buttonText',
		'buttonActive',
		'buttonActiveText',
		'footer',
		'footerText',
		'link',
		'linkActive'
	],
	'colors':{
		'daClassic':{
			'frame':'#88938d',
			'frameText':'#dedede',
			'borders':'#4a584a',
			'content':'#bbc2bb',
			'contentText':'#000000',
			'button':'#d6dbd6',
			'buttonText':'#000000',
			'buttonActive':'#000000',
			'buttonActiveText':'#ffffff',
			'footer':'#5e6a63',
			'footerText':'#aaaaaa',
			'link':'#333333',
			'linkActive':'#ffffff',
			'fontFamily':'verdana'
		},
		'aeoncyan':{
			'frame':'#7dafbb',
			'frameText':'#edfcff',
			'borders':'#446770',
			'content':'#c1dee4',
			'contentText':'#000000',
			'button':'#e6f6fb',
			'buttonText':'#000000',
			'buttonActive':'#000000',
			'buttonActiveText':'#ffffff',
			'footer':'#a5cbd4',
			'footerText':'#54808b',
			'link':'#0285a0',
			'linkActive':'#ffffff',
			'fontFamily':'verdana'
		},
		'grey':{
			'frame':'#b7bfc4',
			'frameText':'#ffffff',
			'borders':'#444444',
			'content':'#ffffff',
			'contentText':'#000000',
			'button':'#ffffff',
			'buttonText':'#000000',
			'buttonActive':'#000000',
			'buttonActiveText':'#ffffff',
			'footer':'#dfe6ea',
			'footerText':'#81898d',
			'link':'#666666',
			'linkActive':'#000000',
			'fontFamily':'verdana'
		},
		'silver':{
			'frame':'#b7bfc4',
			'frameText':'#444444',
			'borders':'#444444',
			'content':'#ffffff',
			'contentText':'#000000',
			'button':'#ffffff',
			'buttonText':'#000000',
			'buttonActive':'#000000',
			'buttonActiveText':'#ffffff',
			'footer':'#dfe6ea',
			'footerText':'#666666',
			'link':'#666666',
			'linkActive':'#000000',
			'fontFamily':'verdana',
			'imgFrameBackground':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAyCAMAAACqJUG4AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA2UExURfz9/dPY2/Dy88DHy7jAxf///+Xo6u3v8Pn6+szS1cbM0PX297e/xOvt7rzDyL3EyeDj5dre4BJ1xroAAAAsSURBVHjapMdBAoAQAACwKVRE/P+z/KHdJrkEn1fUnYpnfxqy5lDdfloCDAAxLACbcRNKJgAAAABJRU5ErkJggg==',
			'imgFooterBackground':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAyCAMAAACqJUG4AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABUUExURbvDx/////z8/fHy88jO0uDj5urt7v7+//T19v7+/tjc37rCx7/Gy+nr7cbN0c7U1/r7++Dk5tfc3uTn6Pf4+cHIzLe/xPb3+O7w8dDV2Pj5+ufq6xvbKQkAAAA+SURBVHjajMvHDcAwAMPAc3rvPfvvGY8Q8UMQkCBzaHUGo8Wsl9okQqRUR5s8TlXsl8JrlWvc8bn7sU+AAQBkAwGGZ9s8+wAAAABJRU5ErkJggg==',
			'imgCollapseAll':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFTSURBVHjaYnRxcWEAAmcgjgZieQbc4BUQbwLi5SAOCxC7+vv793t5eUkrKSkJ4NL1/v37Hxs3bjScM2cOGycn50IGoI1L79279+E/GgCKowv9f/ny5VcnJ6fVQHNEmYCEhJi4BP/Xb98ZYNjV1RVsC4hGFmdmYWVjZGTkgmlkeP/xExwH+PuBNc1ftARMg/gwuQ+fPsNczgzyI8Prt+/hfunqnwymE+Ni4GyY/K9fv+DqwDa+/fARBZcV5oIlQTSy+LuPH1E1/vv7F447G2vAEqU1jWAaxEeWhwGQU9/8//Prs6iYOC9YYd8kuCQyGwQ+fvjwGxi432AaF1w6f1bb0clZWl5eHmc8vnv39vuJKxcfffz48QiQ+5cRaAKDtbW1PxsbWxALC4sMLo1///598+XLl5OnT5/eB+Q+BWsEAWD8CILiB4i58CS7nyDLQWkBIMAAP3XZlTDTHbMAAAAASUVORK5CYII=',
			'imgExpandAll':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFVSURBVHjaYnRxcWEAAmcgjgZieQbc4BUQbwLi5SAOCxC7+vv793t5eUkrKSkJ4NL1/v37Hxs3bjScM2cOGycn50IGoI1L79279+E/EeDly5dfnZycVgPNEWUCEhJi4hL8X799ZwBhV1dXMEZngzAzCysbIyMjF0wjw/uPn+B4/qIlYKcF+PuBaRAfJvfh02eYy5nBGl+/fY+Cu/ong2VBNLL4m3cf4H4GBQ7D2w8f4QKdjTVgury+haGsMBfOBoHfv3/B1YFt/Pf3LxyX1jSiGADiI8sja3zz/8+vzyJCggww3Nk3CaIZSCOLc7Gz/wYG7jeYUxdcOn9W29HJWVpeXh4ej8tWrEKJx3fv3n4/ceXio48fPx4Bcv8yAk1gsLa29mdjYwtiYWGRwZUA/v79++bLly8nT58+vQ/IfQrWCALA+BEExQ8Qc+FJdj9BloPSAkCAAQCxydq0YyMmrAAAAABJRU5ErkJggg==',
			'imgStickyOn':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFaSURBVHjaYnRxcWEAAmcgjgZieQbc4BUQb9qzZ89yEIcFiF39/f37vby8pJWUlARw6Xr//v2PjRs3Gn7//p3t6NGjCxmANi69d+/eh/9oACiOLvT/5cuXX52cnFYDzRFlAhISYuIS/F+/fWeAYVdXV7AtIBpZnJmFlY2RkZELppHh/cdPcBzg7wfWNH/REjAN4sPkPnz6DHM5M8iPDK/fvof7pat/MgNMDJkNAr9+/YKrA2t8++EjXKCzsQZMl9e3oLBB4PdvhEawU//9/QvHpTWNKAaA+MjyyBrf/P/z67OIkCADDHf2TYJoBtLI4lzs7L+BgfsN5tQFl86f1XZ0cpaWl5eHx+OyFatQ4vHdu7ffT1y5+Ojjx49HgNy/jKCU8+3bN382NrYgFhYWGVwJ4O/fv2++fPly8vTp0/uA3KfgwOHi4toITEqHQPED4uJJdj9BloMCGiDAALt20UBpwMZwAAAAAElFTkSuQmCC',
			'imgStickyOff':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFuSURBVHjaYnRxcWEAAiUg1gViAQbc4CsQ3wTiyyAOCxAr+/v7u3t5efEpKSlx4NL1/v37Pxs3bpSYM2cOMycn5wUmoJiBt7c3hqbm5mYHZL6goCAL0HB+dnZ2tT179nCDNPKIiUtwfP32nQGGGxoaHP7+/QumkcWZWViZGRkZWYF6uJjAzvj4CY5bW1sdfv3+w5CSnnkARIP4MLkPnz7DHMAE8iPD67fv4U4KjYw5ABNDZoPAr1+/4OrAGt9++AgX2Lh6Bdhv/qERB5DZIPr3b4RGsFP/Af0Dw75BoQf+///PsGHVcgcQDeIjyyNr/Pb/z6+fIkKCDDCclJp+gJ2NDUwji3Oxs/8FGvYb5tQLl86fFXV0cuaTl5eHR0lFZeUB5Oh49+7t7xNXLn4EgkcgRzKCUs63b9802NjYNFlYWPhwJQBg9Hz78uXLk9OnT98Hcj+DA4eLi+sGMFIfgphAzIon2YE8+R1o2VeAAAMABu6+geNWcYUAAAAASUVORK5CYII=',
			'imgMinus':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEbSURBVHjaYmQAAhcXF2cgFQ3E8gy4wSsg3rRnz57lQPUMLEDC1d/fv9/Ly0taSUlJAJeu9+/f/9i4caPh9+/f2YDchSDblt67d+/DfyLAy5cvvzo5Oa0GahRlARISYuIS/F+/fWcgBJhZWNkYGRm5YBoZ3n/8xEAM+PnzJ8IMEPn67Xu4ZFlhLoaGrv7JYPrXr19wMbDGtx8+wgXK61swNMLkf/9G0/jv71+inIqsDqTxzf8/vz6LionzEtL48cOH38DA/QbTuODS+bPajk7O0vLy8jjj8d27t99PXLn46OPHj0eA3L+MIEErKyt/Nja2IBYWFhlcGv/+/fvmy5cvJ0+fPr0PyH3KiCQnCIofIObCFyMgy0FpASDAABKClJloEo2YAAAAAElFTkSuQmCC',
			'imgPlus':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE5SURBVHjaYnRxcWEAAmcgjgZieQbc4BUQbwLi5SAOCxC7+vv793t5eUkrKSkJ4NL1/v37Hxs3bjScM2cOGycn50IGoI1L79279+E/EeDly5dfnZycVgPNEWUCEhJi4hL8X799Z0DGrq6uDOhizCysbIyMjFwgjSxgZ3z8hN15aOI/f/6EMZnBGl+/fQ+XLCvMhbMT42LAdFf/ZDD969cvuBxY49sPH+EC5fUtYLqzsQbOhsn//o2m8d/fv1idii6OzAdpfPP/z6/PomLivMiKOvsmYRj08cOH38DA/QbTuODS+bPajk7O0vLy8jjj8d27t99PXLn46OPHj0eA3L+MQBMYrK2t/dnY2IJYWFhkcGn8+/fvmy9fvpw8ffr0PiD3KVgjCADjRxAUP0DMhSfZgeLjHSgtAAQYAHxStmD74nl4AAAAAElFTkSuQmCC',
			'imgBullet':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACpSURBVHjaYmQAAhcXl70MeMDu3budGWAK58+ff+M/DgCSA6kBMiGK/xMAUJsNmECmf/32HY5BwNXVFUMMBMCK33/8BMdPnr8EuZEhwN8PLgYDLCDi9dv3KB6SkRRnwCYOVvz2w0e4gIuNOdgZ5fUtKOJwxf/+/oUL7Dp4jKG0phFFDEXxuZPHbrp5eqtjC+Nd27fehLEZiYmUPXv2FMMVQ4EBA35wASDAAHAKlR6KYN74AAAAAElFTkSuQmCC'
		}
	},




   /** -------------------------------------------------------------------------------------------
	*  STARTUP
	*  -------------------------------------------------------------------------------------------
	*/




   /**
	* Starts the toolbox by setting up all the required
	* stuff and generating the necessary HTML code.
	*/
	start:function()
	{
		if( !this.allowedHere() ) {
			return false;
		}

		if( !this.collectData() ) {
			return false;
		}

		if( !this.createDisplayElement() ) {
			return false;
		}

		this.updateStickynessDisplay();

		if( GM_getValue( 'open' ) == true ) {
			this.expand();
		}

		this.updatePosition();
		this.runEnhancements();
	},
	collectData:function()
	{
		// DAv4 meta data and user state retrieval: get the
		// data from the special metatag containing a javascript
		// variable that can be eval'ed to access the data.
		if( !document.getElementById( 'deviantART-v5' ) ) {
			var metas = document.getElementsByTagName( 'meta' );
			var loggedIn = false;
			for( var idx in metas ) {
				if( !metas[idx].getAttribute || metas[idx].getAttribute( 'name' ) != 'deviantMETA' ) {
					continue;
				}

				eval( 'this.data = '+metas[idx].getAttribute( 'content' ) );
				loggedIn = true;
			}

			this.data.loggedIn = loggedIn;

		// DAv5-specific metadata: easy as 1+1 :)
		} else {
			this.data = unsafeWindow.deviantART.deviant;
		}

		// store default options
		if( !GM_getValue( 'defaultsSet', false ) ) {
			this.revertToDefaults();
		} else {
			for( var option in this.optionDefaults ) {
				if( GM_getValue( option ) == 'undefined' ) {
					GM_setValue( option, this.optionDefaults[option] );
				}
			}
		}

		if( GM_getValue( 'persistState' ) == 'yes' ) {
			this.open = GM_getValue( 'open', false );
		}

		// display the text in the toolbox title bar?
		if( GM_getValue( 'displayTitleText' ) == 'yes' ) {
			this.openBtn += '&#160;'+this.getString( 'openToolbox' );
			this.closeBtn += '&#160;'+this.getString( 'closeToolbox' );

			// use images or text depending on which is available
			// in the current color scheme.
			if( this.hasColor( 'imgPlus' ) && this.hasColor( 'imgMinus' ) ) {
				this.openBtn += '&#160;<img src="'+this.getColor( 'imgPlus' )+'" align="absmiddle"/>';
				this.closeBtn += '&#160;<img src="'+this.getColor( 'imgMinus' )+'" align="absmiddle"/>';
			} else {
				this.openBtn += '&#160;<span style="font:bold 11px monospace;">[+]</span>';
				this.closeBtn += '&#160;<span style="font:bold 11px monospace;">[-]</span>';
			}
		}

		if( this.hasColor( 'imgBullet' ) ) {
			this.bulletImage = this.getColor( 'imgBullet' );
		}

		return true;
	},




   /** -------------------------------------------------------------------------------------------
	*  PAGE STRUCTURE BUILDING METHODS
	*  -------------------------------------------------------------------------------------------
	*/



	createDisplayElement:function()
	{
		var el = document.createElement( 'div' );
		document.getElementsByTagName( 'body' )[0].appendChild( el );
		el.style.position = 'absolute';
		el.style.top = this.offset[0]+'px';
		el.style.right = this.offset[1]+'px';
		el.style.border = 'solid 1px '+this.getColor( 'borders' );
		el.style.borderRightWidth = '2px';
		el.style.borderBottomWidth = '1px';
		el.style.backgroundColor = this.getColor( 'frame' );
		el.style.zIndex = this.baseZIndex+1;
		el.id = this.makeID( 'Element' );
		var contentID = this.makeID( 'Content' );

		if( this.hasColor( 'imgFrameBackground' ) ) {
			el.style.backgroundRepeat = 'repeat-x';
			el.style.backgroundImage = 'url("'+this.getColor('imgFrameBackground')+'")';
		}

		var html =
		'<div style="font:normal 11px '+this.getColor( 'fontFamily' )+';color:'+this.getColor( 'frameText' )+';border-bottom:solid 1px '+this.getColor( 'borders' )+';padding:2px 6px;cursor:pointer;text-align:right;height:15px;" onclick="deviantToolbox.toggle();" id="'+this.makeID( 'Toggler' )+'">'+
			this.openBtn+
		'</div>'+
		'<div id="'+contentID+'" style="display:none;text-align:left;font:normal 11px '+this.getColor( 'fontFamily' )+'">'+
			'<style type="text/css">'+
				'#'+contentID+' A:link, #'+contentID+' A:visited{text-decoration:none;color:'+this.getColor( 'link' )+';}'+
				'#'+contentID+' A:active, #'+contentID+' A:hover{text-decoration:underline;color:'+this.getColor( 'linkActive' )+';}'+
			'</style>'+
			'<div style="background:'+this.getColor( 'content' )+';color:'+this.getColor( 'contentText' )+';padding:7px;padding-bottom:0;">'+
				this.buildShortcutLinks()+
				this.buildWelcome()+
				this.buildSection_devs()+
				this.buildSection_user()+
				this.buildSection_prints()+
				this.buildSection_admin()+
				this.buildSection_tools()+
				this.buildSection_da()+
				'<br clear="all"/>'+
			'</div>'+
			'<div id="'+this.makeID( 'OptionsPanel' )+'" style="display:none;border-top:solid 1px '+this.getColor( 'borders' )+';padding:11px;">'+
				this.buildOptions()+
				'<table cellpadding="2" cellspacing="0" style="border:none;margin-top:6px;">'+
					'<tr>'+
						'<td>'+
							'<div style="text-align:center;cursor:pointer;padding:2px 12px;border:solid 1px '+this.getColor( 'borders' )+';color:'+this.getColor( 'buttonText' )+';background:'+this.getColor( 'button' )+'" onclick="deviantToolbox.applyOptions();" onmouseover="deviantToolbox.focus( this );" onmouseout="deviantToolbox.blur( this );">'+
								this.getString( 'applyOptions' )+
							'</div>'+
						'</td>'+
						'<td>'+
							'<div style="text-align:center;cursor:pointer;padding:2px 12px;border:solid 1px '+this.getColor( 'borders' )+';color:'+this.getColor( 'buttonText' )+';background:'+this.getColor( 'button' )+'" onclick="deviantToolbox.collapseOptions();" onmouseover="deviantToolbox.focus( this );" onmouseout="deviantToolbox.blur( this );">'+
								this.getString( 'cancel' )+
							'</div>'+
						'</td>'+
					'</tr>'+
				'</table>'+
			'</div>'+
			'<div id="'+this.makeID( 'FrameFooter' )+'" style="color:'+this.getColor( 'footerText' )+';background:'+this.getColor( 'footer' )+';font-size:10px;padding:2px 6px;text-align:center;border-top:solid 1px '+this.getColor( 'borders' )+';border-bottom:solid 1px '+this.getColor( 'borders' )+'">'+
				this.buildFooter()+
			'</div>'+
		'</div>';

		el.innerHTML = html;
		this.displayEl = el;

		if( this.hasColor( 'imgFooterBackground' ) ) {
			var el = document.getElementById( this.makeID( 'FrameFooter' ) );
			el.style.backgroundRepeat = 'repeat-x';
			el.style.backgroundImage = 'url("'+this.getColor( 'imgFooterBackground' )+'")';
		}

		return true;
	},
	buildShortcutLinks:function()
	{
		var html = '<div align="right" style="font-size:9px;padding:0 0 2px 0;">';

		if( this.hasColor( 'imgExpandAll' ) && this.hasColor( 'imgCollapseAll' ) && this.hasColor( 'imgStickyOn' ) ) {
			html +=
				'<a href="javascript:deviantToolbox.expandAll();this.blur();" title="'+this.getString( 'btnExpandAllSections' )+'"><img src="'+this.getColor( 'imgExpandAll' )+'" style="margin-right:3px;"/></a>'+
				'<a href="javascript:deviantToolbox.collapseAll();this.blur();" title="'+this.getString( 'btnCollapseAllSections' )+'"><img src="'+this.getColor( 'imgCollapseAll' )+'" style="margin-right:3px;"/></a>'+
				'<a href="javascript:deviantToolbox.toggleStickyness();this.blur();" id="'+this.makeID( 'StickyDisplay' )+'" title="'+this.getString( 'btnStickynessToggler' )+'"></a>';
		} else {
			html +=
			'[<a href="javascript:deviantToolbox.expandAll();this.blur();" title="'+this.getString( 'btnExpandAllSections' )+'">++</a> '+
			'|'+
			'<a href="javascript:deviantToolbox.collapseAll();this.blur();" title="'+this.getString( 'btnCollapseAllSections' )+'">--</a>'+
			'|'+
			'<a href="javascript:deviantToolbox.toggleStickyness();this.blur();" id="'+this.makeID( 'StickyDisplay' )+'" title="'+this.getString( 'btnStickynessToggler' )+'"></a>]';
		}

		html += '</div>';

		return html;
	},
	buildFooter:function()
	{
		var html = '';
		if( GM_getValue( 'displayVanity', this.optionDefaults.displayVanity ) == 'yes' ) {
			html += 'DeviantART Toolbox v'+this.version+' | ';
		}

		html +=
		'<span onclick="deviantToolbox.expandOptions();" style="cursor:pointer;">'+this.getString( 'options' )+'</span>'+
		' | '+
		'<span onclick="deviantToolbox.about();" style="cursor:pointer;">'+this.getString( 'about' )+'</span>';

		return html;
	},
	buildWelcome:function()
	{
		var html = '';

		if( !this.data.loggedIn ) {
			html += '<div style="padding:0 0 10px 0;"><i>'+this.getString( 'pleaseLogIn' )+'</i></div>';
		} else {
			if( GM_getValue( 'displayWelcome', this.optionDefaults.displayWelcome ) == 'yes' ) {
				html += '<div style="padding:0 0 10px 0;">'+this.getString( 'welcomeUser' )+', ';
				if( typeof( this.data.symbol ) != 'undefined' ) {
					html += this.data.symbol;
				}
				html += this.data.username+'.</div>';
			}
		}

		return html;
	},



   /** -------------------------------------------------------------------------------------------
	*  LINK CATEGORY SECTION BUILDING
	*  -------------------------------------------------------------------------------------------
	*/



   buildSection_devs:function()
	{
		if( !this.sectionEnabled( 'devs' ) ) {
			return '';
		}

		if( !this.data.loggedIn ) {
			return '';
		}

		var html =
		'<div style="'+this.getListStyle()+'">'+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/gallery/', 'devGallery' )+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/scraps/', 'devScraps' )+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/store/', 'devPrints' )+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/wallpapers/', 'devWallpapers' )+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/dds/', 'devDDS' )+
			this.buildListEntry( 'http://www.deviantart.com/submit/', 'devSubmit' )+
		'</div>';

		return this.buildSection( 'devs', html );
	},
	buildSection_da:function()
	{
		if( !this.sectionEnabled( 'da' ) ) {
			return '';
		}

		var html =
		'<div style="'+this.getListStyle()+'">'+
			this.buildListEntry( 'http://www.deviantart.com/random/deviant', 'daRandomDeviant' )+
			this.buildListEntry( 'http://www.deviantart.com/random/deviation', 'daRandomDeviation' )+
			this.buildListEntry( 'http://today.deviantart.com/', 'daToday' )+
			this.buildListEntry( 'http://today.deviantart.com/features/', 'daTodaysFeaturedDeviations' )+
			this.buildListEntry( 'http://dd.deviantart.com/', 'daArchivedFeaturedDeviations' )+
			this.buildListEntry( 'http://shout.deviantart.com/popup', 'daShoutbox', 'onclick="return popup(\'http://shout.deviantart.com/popup\', \'shoutbox\', 500, 600);"' )+
		'</div>';

		return this.buildSection( 'da', html );
	},
	buildSection_user:function()
	{
		if( !this.sectionEnabled( 'user' ) ) {
			return '';
		}

		if( !this.data.loggedIn ) {
			return '';
		}

		var html =
		'<div style="'+this.getListStyle()+'">'+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com', 'userHomepage' )+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/favourites/', 'userFavourites' )+
			this.buildListEntry( 'http://my.deviantart.com/messages/', 'userMessages' )+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/friends/', 'userFriends', 'rel="popup(name:friends,width:400,height:600)"' )+
			this.buildListEntry( 'http://my.deviantart.com/devwatch/', 'userDevwatch' )+
			this.buildListEntry( 'http://my.deviantart.com/notes/', 'userNotes' )+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/journal/', 'userJournal' )+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/wishlist/', 'userWishlist' )+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/activity/', 'userActivity' )+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/stats/gallery/', 'userGalleryStats' )+
		'</div>';

		return this.buildSection( 'user', html );
	},
	buildSection_prints:function()
	{
		if( !this.sectionEnabled( 'prints' ) ) {
			return '';
		}

		if( !this.data.loggedIn ) {
			return '';
		}

		var html =
		'<div style="'+this.getListStyle()+'">'+
			this.buildListEntry( 'http://'+this.data.username+'.deviantart.com/store/', 'printHomepage' )+
			this.buildListEntry( 'http://services.deviantart.com/prints/', 'printAdmin' )+
			this.buildListEntry( 'http://store.deviantart.com/store/', 'printStorefront' )+
			this.buildListEntry( 'http://store.deviantart.com/manage/', 'printProducts' )+
			this.buildListEntry( 'http://store.deviantart.com/stats/', 'printStats' )+
			this.buildListEntry( 'http://faq.deviantart.com/printsize.php', 'printAspectCalc' )+
			this.buildListEntry( 'http://www.deviantart.com/submit/sell/', 'printSubmit' )+
		'</div>';

		return this.buildSection( 'prints', html );
	},
	buildSection_tools:function()
	{
		if( !this.sectionEnabled( 'tools' ) ) {
			return '';
		}

		var html =
		'<div style="'+this.getListStyle()+'">'+
			this.buildListEntry( 'http://comments.deviantart.com/emoticons', 'toolsEmoticons', 'onclick="return popup(\'http://comments.deviantart.com/emoticons\', \'emoticons\', 400, 600);"' )+
			this.buildListEntry( 'http://faq.deviantart.com/printsize.php', 'printAspectCalc' )+
			this.buildListEntry( 'javascript:deviantToolbox.displayStyleEditor();', 'toolsStyleEditor' )+
		'</div>';

		return this.buildSection( 'tools', html );
	},
	buildSection_admin:function()
	{
		if( !this.sectionEnabled( 'admin' ) ) {
			return '';
		}

		if( !this.data.loggedIn ) {
			return '';
		}

		var html =
		'<div style="'+this.getListStyle()+'">'+
			this.buildListEntry( 'http://my.deviantart.com/account/', 'adminAccount' )+
			this.buildListEntry( 'http://my.deviantart.com/journal/', 'adminJournal' )+
			this.buildListEntry( 'http://my.deviantart.com/profile/', 'adminProfile' )+
			this.buildListEntry( 'http://my.deviantart.com/settings/', 'adminSettings' )+
			this.buildListEntry( 'http://my.deviantart.com/wishlist/', 'adminWishlist' )+
			this.buildListEntry( 'http://my.deviantart.com/gallery/', 'adminGallery' )+
			this.buildListEntry( 'http://my.deviantart.com/deviants/', 'adminFriends' )+
			this.buildListEntry( 'http://my.deviantart.com/deviants/', 'adminDevwatch' )+
		'</div>';

		return this.buildSection( 'admin', html );
	},




   /** -------------------------------------------------------------------------------------------
	*  SECTION HANDLING METHODS
	*  -------------------------------------------------------------------------------------------
	*/



	buildSection:function( id, contentHTML )
	{
		if( GM_getValue( 'collapsableSections', this.optionDefaults.collapsableSections ) != 'yes' ) {
			var html =
			'<div'+this.getLayoutStyle()+'>'+
				'<div style="font-weight:bold;">'+
					this.getString( 'section_'+id )+
				'</div>'+
				'<div>'+
					contentHTML+
				'</div>'+
			'</div>';

			return html;
		}

		var display = 'block';
		if( GM_getValue( 'sectionCollapsed_'+id, false ) == true ) {
			display = 'none';
		}

		var html =
		'<div'+this.getLayoutStyle()+'>'+
			'<div style="font-weight:bold;cursor:pointer;" onclick="deviantToolbox.toggleSection( \''+id+'\' );" id="'+this.makeID( 'SectionToggler'+id )+'">'+
				this.getSectionLabel( id )+
			'</div>'+
			'<div id="'+this.makeID( 'Section'+id )+'" style="display:'+display+';">'+
				contentHTML+
			'</div>'+
		'</div>';

		return html;
	},
	expandAll:function()
	{
		var sections = this.getSections();
		for( var idx in sections ) {
			this.expandSection( sections[idx] );
		}
	},
	collapseAll:function()
	{
		var sections = this.getSections();
		for( var idx in sections ) {
			this.collapseSection( sections[idx] );
		}
	},
	toggleSection:function( id )
	{
		var el = document.getElementById( this.makeID( 'Section'+id ) );
		if( GM_getValue( 'sectionCollapsed_'+id, false ) == false ) {
			this.collapseSection( id );
			return true;
		}

		this.expandSection( id );
		return true;
	},
	expandSection:function( id )
	{
		var el = document.getElementById( this.makeID( 'Section'+id ) );
		var te = document.getElementById( this.makeID( 'SectionToggler'+id ) );

		el.style.display = 'block';
		GM_setValue( 'sectionCollapsed_'+id, false );
		te.innerHTML = this.getSectionLabel( id );
	},
	collapseSection:function( id )
	{
		var el = document.getElementById( this.makeID( 'Section'+id ) );
		var te = document.getElementById( this.makeID( 'SectionToggler'+id ) );

		el.style.display = 'none';
		GM_setValue( 'sectionCollapsed_'+id, true );
		te.innerHTML = this.getSectionLabel( id );
	},
	getSectionLabel:function( id )
	{
		var html = '';
		var sign = '-';
		var imgName = 'imgMinus';
		if( GM_getValue( 'sectionCollapsed_'+id, false ) ) {
			sign = '+';
			imgName = 'imgPlus';
		}

		if( this.hasColor( imgName ) ) {
			html = '<img src="'+this.getColor( imgName )+'" title="'+this.getString( 'section_'+id )+'" align="absmiddle"/> ';
		} else {
			html = '<span style="font:normal 11px monospace;" title="'+this.getString( 'section_'+id )+'">['+sign+']</span> ';
		}

		// only add the section label if we're in vertical mode
		if( GM_getValue( 'layout' ) == 'vertical' || sign == '-' ) {
			html += '<span onmouseover="this.style.color=\''+this.getColor( 'linkActive' )+'\';" onmouseout="this.style.color=\''+this.getColor( 'contentText' )+'\';">'+this.getString( 'section_'+id )+'</span>';
		}

		return html;
	},
	sectionEnabled:function( id )
	{
		sections = this.getSections();
		for( var idx in sections ) {
			if( sections[idx] == id ) {
				return true;
			}
		}

		return false;
	},
	getSections:function()
	{
		sections = GM_getValue( 'displaySections', this.optionDefaults.displaySections ).split( ',' );
		return sections;
	},




   /** -------------------------------------------------------------------------------------------
	*  OPTIONS HANDLING METHODS
	*  -------------------------------------------------------------------------------------------
	*/



	buildOptions:function()
	{
		var html =
			this.buildOptions_Layout()+
			this.buildOptions_Settings()+
			this.buildOptions_Enhancements()+
			'<br clear="all"/>';

		return html;
	},
	buildOptions_Layout:function()
	{
		var html =
		'<table cellpadding="3" cellspacing="0" style="border:none;margin-bottom:8px;">'+
			'<tr>'+
				'<td align="right">'+this.getString( 'layout' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'Flayout' )+'" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="horizontal" '+this.fieldSelected( GM_getValue( 'layout', this.optionDefaults.layout ), 'horizontal' )+'>'+this.getString( 'horizontal' )+'</option>'+
						'<option value="vertical" '+this.fieldSelected( GM_getValue( 'layout', this.optionDefaults.layout ), 'vertical' )+'>'+this.getString( 'vertical' )+'</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td align="right">'+this.getString( 'collapsableSections' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'FcollapsableSections' )+'" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="yes" '+this.fieldSelected( GM_getValue( 'collapsableSections', this.optionDefaults.collapsableSections ), 'yes' )+'>'+this.getString( 'yes' )+'</option>'+
						'<option value="no" '+this.fieldSelected( GM_getValue( 'collapsableSections', this.optionDefaults.collapsableSections ), 'no' )+'>'+this.getString( 'no' )+'</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td align="right">'+this.getString( 'displayTitleText' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'FdisplayTitleText' )+'" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="yes" '+this.fieldSelected( GM_getValue( 'displayTitleText', this.optionDefaults.displayTitleText ), 'yes' )+'>'+this.getString( 'yes' )+'</option>'+
						'<option value="no" '+this.fieldSelected( GM_getValue( 'displayTitleText', this.optionDefaults.displayTitleText ), 'no' )+'>'+this.getString( 'no' )+'</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td align="right">'+this.getString( 'displayWelcome' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'FdisplayWelcome' )+'" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="yes" '+this.fieldSelected( GM_getValue( 'displayWelcome', this.optionDefaults.displayWelcome ), 'yes' )+'>'+this.getString( 'yes' )+'</option>'+
						'<option value="no" '+this.fieldSelected( GM_getValue( 'displayWelcome', this.optionDefaults.displayWelcome ), 'no' )+'>'+this.getString( 'no' )+'</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td align="right">'+this.getString( 'displayVanity' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'FdisplayVanity' )+'" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="yes" '+this.fieldSelected( GM_getValue( 'displayVanity', this.optionDefaults.displayVanity ), 'yes' )+'>'+this.getString( 'yes' )+'</option>'+
						'<option value="no" '+this.fieldSelected( GM_getValue( 'displayVanity', this.optionDefaults.displayVanity ), 'no' )+'>'+this.getString( 'no' )+'</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td align="right">'+this.getString( 'skin' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'Fskin' )+'" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="daClassic" '+this.fieldSelected( GM_getValue( 'skin', this.optionDefaults.skin ), 'daClassic' )+'>'+this.getString( 'skinDAClassic' )+'</option>'+
						'<option value="aeoncyan" '+this.fieldSelected( GM_getValue( 'skin', this.optionDefaults.skin ), 'aeoncyan' )+'>'+this.getString( 'skinAeonCyan' )+'</option>'+
						'<option value="grey" '+this.fieldSelected( GM_getValue( 'skin', this.optionDefaults.skin ), 'grey' )+'>'+this.getString( 'skinGrey' )+'</option>'+
						'<option value="silver" '+this.fieldSelected( GM_getValue( 'skin', this.optionDefaults.skin ), 'silver' )+'>'+this.getString( 'skinSilver' )+'</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td align="right">'+this.getString( 'maxLinkLabelLength' )+'</td>'+
				'<td>'+
					'<input type="text" id="'+this.makeID( 'FmaxLinkLabelLength' )+'" style="'+this.getFieldStyle( 'select' )+'" size="2" maxlength="3" value="'+GM_getValue( 'maxLinkLabelLength', this.optionDefaults.maxLinkLabelLength )+'">'+
				'</td>'+
			'</tr>'+
		'</table>';

		return this.buildSection( 'options_layout', html );
	},
	buildOptions_Settings:function()
	{
		var html =
		'<table cellpadding="3" cellspacing="0" style="border:none;margin-bottom:8px;">'+
			'<tr>'+
				'<td align="right">'+this.getString( 'language' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'Flanguage' )+'" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="en" '+this.fieldSelected( GM_getValue( 'language', this.optionDefaults.language ), 'en' )+'>English</option>'+
						'<option value="de" '+this.fieldSelected( GM_getValue( 'language', this.optionDefaults.language ), 'de' )+'>Deutsch</option>'+
						'<option value="fr" '+this.fieldSelected( GM_getValue( 'language', this.optionDefaults.language ), 'fr' )+'>Français</option>'+
						'<option value="es" '+this.fieldSelected( GM_getValue( 'language', this.optionDefaults.language ), 'es' )+'>Español</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td align="right">'+this.getString( 'persistState' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'FpersistState' )+'" size="1" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="yes" '+this.fieldSelected( GM_getValue( 'persistState', this.optionDefaults.persistState ), 'yes' )+'>'+this.getString( 'yes' )+'</option>'+
						'<option value="no" '+this.fieldSelected( GM_getValue( 'persistState', this.optionDefaults.persistState ), 'no' )+'>'+this.getString( 'no' )+'</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td align="right">'+this.getString( 'translateLinks' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'FtranslateLinks' )+'" size="1" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="yes" '+this.fieldSelected( GM_getValue( 'translateLinks', this.optionDefaults.translateLinks ), 'yes' )+'>'+this.getString( 'yes' )+'</option>'+
						'<option value="no" '+this.fieldSelected( GM_getValue( 'translateLinks', this.optionDefaults.translateLinks ), 'no' )+'>'+this.getString( 'no' )+'</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td align="right">'+this.getString( 'sticky' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'Fsticky' )+'" size="1" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="yes" '+this.fieldSelected( GM_getValue( 'sticky', this.optionDefaults.sticky ), 'yes' )+'>'+this.getString( 'yes' )+'</option>'+
						'<option value="no" '+this.fieldSelected( GM_getValue( 'sticky', this.optionDefaults.sticky ), 'no' )+'>'+this.getString( 'no' )+'</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<td valign="top" align="right">'+this.getString( 'displaySections' )+'</td>'+
				'<td>'+
					this.buildOptions_displaySections()+
				'</td>'+
			'</tr>'+
		'</table>';

		return this.buildSection( 'options_settings', html );
	},
	buildOptions_Enhancements:function()
	{
		var html =
		'<table cellpadding="3" cellspacing="0" style="border:none;margin-bottom:8px;">'+
			'<tr>'+
				'<td align="right">'+this.getString( 'enablePricingEnhancement' )+'</td>'+
				'<td>'+
					'<select id="'+this.makeID( 'FenablePricingEnhancement' )+'" size="1" style="'+this.getFieldStyle( 'select' )+'">'+
						'<option value="yes" '+this.fieldSelected( GM_getValue( 'enablePricingEnhancement', this.optionDefaults.enablePricingEnhancement ), 'yes' )+'>'+this.getString( 'yes' )+'</option>'+
						'<option value="no" '+this.fieldSelected( GM_getValue( 'enablePricingEnhancement', this.optionDefaults.enablePricingEnhancement ), 'no' )+'>'+this.getString( 'no' )+'</option>'+
					'</select>'+
				'</td>'+
			'</tr>'+
		'</table>';

		return this.buildSection( 'options_enhancements', html );
	},
	buildOptions_displaySections:function()
	{
		var html = '<table cellpadding="0" cellspacing="0" border="0" style="border:none;">';

		for( var idx in this.sections ) {
			var sectionID = this.sections[idx];
			var checked = '';
			if( this.sectionEnabled( sectionID ) ) {
				checked = 'checked';
			}

			var itemID = this.makeID( 'FdisplaySections_'+sectionID );

			html +=
			'<tr valign="top">'+
				'<td><input type="checkbox" id="'+itemID+'" '+checked+'></td>'+
				'<td style="padding:2px 0 0 2px;"><label for="'+itemID+'">'+this.getString( 'section_'+sectionID )+'</label></td>'+
			'</tr>';
		}

		html += '</table>';
		return html;
	},
	applyOptions:function()
	{
		for( var option in this.optionDefaults ) {
			switch( option ) {
				case 'maxLinkLabelLength':
					var el = document.getElementById( this.makeID( 'F'+option ) );
					var value = parseInt( el.value );
					if( !isNaN( value ) ) {
						GM_setValue( option, value );
					}
					break;
				case 'displaySections':
					var newList = [];
					for( idx in this.sections ) {
						var sectionID = this.sections[idx];
						var el = document.getElementById( this.makeID( 'FdisplaySections_'+sectionID ) );
						if( el.checked ) {
							newList.push( sectionID );
						}
					}
					GM_setValue( option, newList.join( ',' ) );
					break;
				default:
					var el = document.getElementById( this.makeID( 'F'+option ) );
					if( !el || !el[el.selectedIndex] || !el[el.selectedIndex].value ) {
						alert( 'Option '+option+' has no value.' );
						continue;
					}
					var value = el[el.selectedIndex].value;
					GM_setValue( option, value );
					break;
			}
		}

		location.reload();
	},
	collapseOptions:function()
	{
		document.getElementById( this.makeID( 'OptionsPanel' ) ).style.display = 'none';
		this.optionsOpen = false;
		this.updatePosition();
	},
	expandOptions:function()
	{
		document.getElementById( this.makeID( 'OptionsPanel' ) ).style.display = 'block';
		this.optionsOpen = true;
	},
	revertToDefaults:function()
	{
		for( var option in this.optionDefaults ) {
			GM_setValue( option, this.optionDefaults[option] );
		}

		GM_setValue( 'defaultsSet', true );
	},




   /** -------------------------------------------------------------------------------------------
	*  MISCELLANEOUS METHODS
	*  -------------------------------------------------------------------------------------------
	*/



	getString:function( stringID, lang )
	{
		if( typeof( this.strings[stringID] ) == 'undefined' ) {
			return 'unknown';
		}

		if( typeof( lang ) == 'undefined' ) {
			lang = GM_getValue( 'language', this.optionDefaults.language );
		}

		if( typeof( this.strings[stringID][lang] ) == 'undefined' ) {
			return 'unknown';

			if( typeof( this.strings[stringID]['en'] ) == 'undefined' ) {
				return 'unknown';
			}
		}

		return this.strings[stringID][lang];
	},
	translateLink:function( stringID )
	{
		var lang = 'en';
		if( GM_getValue( 'translateLinks', this.optionDefaults.translateLinks ) == 'yes' ) {
			lang = GM_getValue( 'language', this.optionDefaults.language );
		}

		return this.getString( stringID, lang );
	},
	focus:function( el )
	{
		el.style.background = this.getColor( 'buttonActive' );
		el.style.color = this.getColor( 'buttonActiveText' );
	},
	blur:function( el )
	{
		el.style.background = this.getColor( 'button' );
		el.style.color = this.getColor( 'buttonText' );
	},
	getLayoutStyle:function()
	{
		if( GM_getValue( 'layout', this.optionDefaults.layout ) == 'vertical' ) {
			return '';
		}

		return ' style="float:left;margin:0 20px 0 0;"';
	},
	fieldSelected:function( value, expected )
	{
		if( value == expected ) {
			return 'selected';
		}

		return '';
	},
	makeID:function( name )
	{
		return this.prefix+name;
	},
	updateStickynessDisplay:function()
	{
		var el = document.getElementById( this.makeID( 'StickyDisplay' ) );
		var symbol = '=';
		var imgName = 'imgStickyOff';
		if( this.isSticky() ) {
			symbol = '~';
			imgName = 'imgStickyOn';
		}

		if( this.hasColor( imgName ) ) {
			el.innerHTML = '<img src="'+this.getColor( imgName )+'"/>';
		} else {
			el.innerHTML = symbol;
		}
	},
	toggleStickyness:function()
	{
		// if we're sticky, disable stickyness and
		// reset the toolbox's position to the default
		// values.
		if( this.isSticky() ) {
			GM_setValue( 'sticky', 'no' );
			this.displayEl.style.top = this.offset[0]+'px';
			this.displayEl.style.right = this.offset[1]+'px';
		} else {
			GM_setValue( 'sticky', 'yes' );
			this.updatePosition();
		}

		this.updateStickynessDisplay();
	},
	isSticky:function()
	{
		if( GM_getValue( 'sticky', this.optionDefaults.sticky ) == 'yes' ) {
			return true;
		}

		return false;
	},
   /**
	* Checks whether the toolbox is allowed on the current page. Some
	* pages, like the emoticons legend page do not need the toolbox
	* to show up, so we check if we are not one one of those pages.
	*
	* @return	bool
	*/
	allowedHere:function()
	{
		var cnt = this.disableOnPages.length;
		var where = window.location.href;
		for( var i=0; i < cnt; i++ ) {
			if( where.substring( 0, this.disableOnPages[i].length ) == this.disableOnPages[i] ) {
				return false;
			}
		}

		return true;
	},
	updatePosition:function()
	{
		if( !this.isSticky() ) {
			return;
		}

		if( !this.optionsOpen ) {
			var el = document.getElementById( deviantToolbox.makeID( 'Element' ) );
			var ypos = window.pageYOffset + deviantToolbox.offset[1];
			el.style.top = ypos + 'px';
		}

		clearTimeout( this.positionTimer );
		this.positionTimer = setTimeout( 'deviantToolbox.updatePosition()', deviantToolbox.updateDelay );
	},
	toggle:function()
	{
		if( this.open ) {
			this.collapse();
			return;
		}

		this.expand();
	},
	expand:function()
	{
		contentEl = document.getElementById( this.makeID( 'Content' ) );
		buttonEl = document.getElementById( this.makeID( 'Toggler' ) );
		contentEl.style.display = 'block';
		buttonEl.innerHTML = this.closeBtn;
		GM_setValue( 'open', true );
		this.open = true;
	},
	collapse:function()
	{
		contentEl = document.getElementById( this.makeID( 'Content' ) );
		buttonEl = document.getElementById( this.makeID( 'Toggler' ) );
		contentEl.style.display = 'none';
		buttonEl.innerHTML = this.openBtn;
		GM_setValue( 'open', false );
		this.open = false;
	},
	getColor:function( name )
	{
		var scheme = GM_getValue( 'skin', this.optionDefaults.skin );
		if( typeof( this.colors[scheme] ) == 'undefined' ) {
			scheme = this.optionDefaults.skin;
		}

		return this.colors[scheme][name];
	},

   /**
	* Checks whether the current color scheme has
	* the specified color.
	*/
	hasColor:function( name )
	{
		var scheme = GM_getValue( 'skin', this.optionDefaults.skin );
		if( typeof( this.colors[scheme] ) == 'undefined' ) {
			scheme = this.optionDefaults.skin;
		}

		if( typeof( this.colors[scheme][name] ) != 'undefined' ) {
			return true;
		}

		return false;
	},
	buildListEntry:function( target, stringID, attribs )
	{
		return '<div><img src="'+this.bulletImage+'" style="float:left;margin:2px 4px 0 0;"/>'+this.buildLink( target, stringID, attribs )+'</div>';
	},
	buildLink:function( target, stringID, attribs )
	{
		if( typeof( attribs ) == 'undefined' ) {
			attribs = '';
		}

		return '<a href="'+target+'" '+attribs+' title="'+this.translateLink( stringID )+'">'+this.adjustLinkLabel( this.translateLink( stringID ) )+'</a>';
	},
	adjustLinkLabel:function( label )
	{
		var maxlen = GM_getValue( 'maxLinkLabelLength', this.optionDefaults.maxLinkLabelLength );
		if( label.length > maxlen ) {
			label = label.substring( 0, maxlen )+'...';
		}

		return label;
	},
	getListStyle:function()
	{
		return 'padding:3px 0 8px 20px;';
	},
	getFieldStyle:function( fieldType )
	{
		var style =
			'background:'+this.getColor( 'button' )+';'+
			'color:'+this.getColor( 'buttonText' )+';'+
			'border:solid 1px '+this.getColor( 'borders' )+';'+
			'font-size:11px;';

		return style;
	},




   /** -------------------------------------------------------------------------------------------
	*  ABOUT SCREEN
	*  -------------------------------------------------------------------------------------------
	*/



	about:function()
	{
		if( !this.aboutCreated ) {
			this.buildAboutScreen();
		}

		var el = document.getElementById( this.makeID( 'AboutScreen' ) );
		var width = window.innerWidth;
		var height = window.innerHeight;
		var x = ( width / 2 ) - ( el.offsetWidth / 2 ) + window.pageXOffset;
		var y = ( ( height / 2 ) - ( el.offsetHeight / 2 ) ) + window.pageYOffset;

		el.style.top = y+'px';
		el.style.left = x+'px';
		el.style.visibility = 'visible';
	},
	closeAbout:function()
	{
		var el = document.getElementById( this.makeID( 'AboutScreen' ) );
		el.style.visibility = 'hidden';
	},
	buildAboutScreen:function()
	{
		var el = document.createElement( 'div' );
		document.getElementsByTagName( 'body' )[0].appendChild( el );
		el.style.position = 'absolute';
		el.style.top = '5px';
		el.style.left = '5px';
		el.style.visibility = 'hidden';
		el.style.border = 'solid 1px '+this.getColor( 'borders' );
		el.style.borderRightWidth = '2px';
		el.style.borderBottomWidth = '2px';
		el.style.width = '330px';
		el.style.backgroundColor = this.getColor( 'frame' );
		el.id = this.makeID( 'AboutScreen' );
		el.style.zIndex = this.baseZIndex+2;

		if( this.hasColor( 'imgFrameBackground' ) ) {
			el.style.backgroundRepeat = 'repeat-x';
			el.style.backgroundImage = 'url("'+this.getColor( 'imgFrameBackground' )+'")';
		}

		var closeLink = '<span style="font:normal 11px monospace;">[-]</span>';
		if( this.hasColor( 'imgMinus' ) ) {
			closeLink = '<img src="'+this.getColor( 'imgMinus' )+'" align="absmiddle"/>';
		}

		var html =
			'<div style="padding:2px 6px;color:'+this.getColor( 'frameText' )+';text-align:right;cursor:pointer;" onclick="deviantToolbox.closeAbout();">'+
				this.getString( 'about' )+' '+closeLink+
			'</div>'+
			'<div style="background:'+this.getColor( 'content' )+';color:'+this.getColor( 'contentText' )+';border-top:solid 1px '+this.getColor( 'borders' )+';padding:8px;">'+
				'<b>DeviantART Toolbox</b><br/><br/>'+
				'<img src="http://a.deviantart.com/avatars/a/e/aeonoftime.gif" style="float:right;"/>'+
				'<table cellpadding="2" cellspacing="2" style="border:none;margin-bottom:8px;">'+
					'<tr>'+
						'<td align="right" style="background:'+this.getColor( 'footer' )+';color:'+this.getColor( 'footerText' )+'">Version</td>'+
						'<td>'+this.version+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td align="right" style="background:'+this.getColor( 'footer' )+';color:'+this.getColor( 'footerText' )+'">Released</td>'+
						'<td>'+this.releaseDate+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td align="right" style="background:'+this.getColor( 'footer' )+';color:'+this.getColor( 'footerText' )+'">Deviation</td>'+
						'<td><a href="http://www.deviantart.com/view/32751353/" style="color:'+this.getColor( 'link' )+'">#32751353</a></td>'+
					'</tr>'+
					'<tr>'+
						'<td align="right" style="background:'+this.getColor( 'footer' )+';color:'+this.getColor( 'footerText' )+'">Author</td>'+
						'<td><a href="http://aeonoftime.deviantart.com" style="color:'+this.getColor( 'link' )+'">=AeonOfTime</a></td>'+
					'</tr>'+
					'<tr>'+
						'<td align="right" style="background:'+this.getColor( 'footer' )+';color:'+this.getColor( 'footerText' )+'">Homepage</td>'+
						'<td><a href="http://sebastian.mordziol.com" style="color:'+this.getColor( 'link' )+'">sebastian.mordziol.com</a> <small>(fr)</small></td>'+
					'</tr>'+
				'</table>'+
			'</div>'+
			'<div style="border-top:solid 1px '+this.getColor( 'borders' )+';background:'+this.getColor( 'frame' )+';color:'+this.getColor( 'frameText' )+';padding:2px 6px;" id="'+this.makeID( 'AboutFooter' )+'">'+
				'<i style="float:right;margin-top:5px;">Long live the community!</i> <img src="http://e.deviantart.com/emoticons/c/community.gif"/>'+
			'</div>';

		el.innerHTML = html;
		this.aboutCreated = true;

		if( this.hasColor( 'imgFooterBackground' ) ) {
			var fel = document.getElementById( this.makeID( 'AboutFooter' ) );
			fel.style.backgroundRepeat = 'repeat-x';
			fel.style.backgroundImage = 'url("'+this.getColor( 'imgFooterBackground' )+'");';
		}

		return true;
	},




   /** -------------------------------------------------------------------------------------------
	*  ENHANCEMENTS MANAGEMENT
	*  -------------------------------------------------------------------------------------------
	*/



	runEnhancements:function()
	{
		if( GM_getValue( 'enablePricingEnhancement' ) == 'yes' ) {
			this.enhancement_priceCalculators();
		}
	},
	enhancement_priceCalculators:function()
	{
		var activateUrl = 'http://services.deviantart.com/prints/manage/details';
		if( window.location.href.substring( 0, activateUrl.length ) != activateUrl ) {
			return true;
		}

		var inputs = document.getElementsByTagName( 'input' );
		var cnt = inputs.length;
		for( var i=0; i < cnt; i++ ) {
			if( inputs[i].name.substring( 0, 6 ) != 'prices' ) {
				continue;
			}

			var td = inputs[i].parentNode;
			if( !td.nextSibling.nextSibling || !td.nextSibling.nextSibling.nextSibling.nextSibling ) {
				alert(
					'Cannot find price cells.\n\n'+
					'The HTML structure of the page has probably\n'+
					'changed, the Toolbox needs to be updated for\n'+
					'the pricing calculators to work.'
				);

				return true;
			}

			var minimumEl = td.nextSibling.nextSibling;
			var profitEl = td.nextSibling.nextSibling.nextSibling.nextSibling;

			deviantToolbox_PriceManager.addPrice( inputs[i], minimumEl, profitEl );
		}

		deviantToolbox_PriceManager.setGain( GM_getValue( 'printsProfit' ) );
		deviantToolbox_PriceManager.enable();
		return true;
	},




   /** -------------------------------------------------------------------------------------------
	*  STYLE EDITOR SCREEN
	*  -------------------------------------------------------------------------------------------
	*/



	displayStyleEditor:function()
	{
		if( !this.styleEditorCreated ) {
			this.buildStyleEditorScreen();
		}

		var el = document.getElementById( this.makeID( 'StyleEditor' ) );
		var width = window.innerWidth;
		var height = window.innerHeight;
		var x = ( width / 2 ) - ( el.offsetWidth / 2 ) + window.pageXOffset;
		var y = ( ( height / 2 ) - ( el.offsetHeight / 2 ) ) + window.pageYOffset;

		el.style.top = y+'px';
		el.style.left = x+'px';
		el.style.visibility = 'visible';
	},
	closeStyleEditor:function()
	{
		var el = document.getElementById( this.makeID( 'StyleEditor' ) );
		el.style.visibility = 'hidden';
	},
	buildStyleEditorScreen:function()
	{
		var el = document.createElement( 'div' );
		document.getElementsByTagName( 'body' )[0].appendChild( el );
		el.style.position = 'absolute';
		el.style.top = '5px';
		el.style.left = '5px';
		el.style.visibility = 'hidden';
		el.style.border = 'solid 1px '+this.getColor( 'borders' );
		el.style.borderRightWidth = '2px';
		el.style.borderBottomWidth = '2px';
		el.style.width = '330px';
		el.style.backgroundColor = this.getColor( 'frame' );
		el.id = this.makeID( 'StyleEditor' );
		el.style.zIndex = this.baseZIndex+2;

		if( this.hasColor( 'imgFrameBackground' ) ) {
			el.style.backgroundRepeat = 'repeat-x';
			el.style.backgroundImage = 'url("'+this.getColor( 'imgFrameBackground' )+'")';
		}

		var closeLink = '<span style="font:normal 11px monospace;">[-]</span>';
		if( this.hasColor( 'imgMinus' ) ) {
			closeLink = '<img src="'+this.getColor( 'imgMinus' )+'" align="absmiddle"/>';
		}

		var html =
			'<div style="padding:2px 6px;color:'+this.getColor( 'frameText' )+';text-align:right;cursor:pointer;" onclick="deviantToolbox.closeStyleEditor();">'+
				this.getString( 'styleEditorTitle' )+' '+closeLink+
			'</div>'+
			'<div style="background:'+this.getColor( 'content' )+';color:'+this.getColor( 'contentText' )+';border-top:solid 1px '+this.getColor( 'borders' )+';padding:8px;">'+
				'<b>'+this.getString( 'UnderConstruction' )+'</b><br/><br/>'+
				'<table cellpadding="2" cellspacing="2" style="border:none;margin-bottom:8px;">';

		var cnt = this.colorParts.length;
		for( var i=0; i < cnt; i++ ) {
			var value = this.getColor( this.colorParts[i] ).replace( /#/, '' );
			if( GM_getValue( 'colorPart_'+this.colorParts[i] ) ) {
				value = GM_getValue( 'colorPart_'+this.colorParts[i] );
			}

			html +=
				'<tr>'+
					'<td align="right" style="background:'+this.getColor( 'footer' )+';color:'+this.getColor( 'footerText' )+'">'+this.colorParts[i]+'</td>'+
					'<td><input type="text" size="6" maxlength="6" id="'+this.makeID( 'colorPart'+this.colorParts[i] )+'" value="'+value+'" style="'+this.getFieldStyle()+';font-family:monospace;"/></td>'+
					'<td><div style="background:#'+value+';width:14px;height:14px;overflow:hidden;border:solid 1px #000;">&#160;</div></td>'+
				'</tr>';
		}

		html +=
				'</table>'+
			'</div>'+
			'<div style="border-top:solid 1px '+this.getColor( 'borders' )+';background:'+this.getColor( 'frame' )+';color:'+this.getColor( 'frameText' )+';padding:2px 6px;" id="'+this.makeID( 'StyleEditorFooter' )+'">'+
				'<i style="float:right;margin-top:5px;">Long live the community!</i> <img src="http://e.deviantart.com/emoticons/c/community.gif"/>'+
			'</div>';

		el.innerHTML = html;
		this.styleEditorCreated = true;

		if( this.hasColor( 'imgFooterBackground' ) ) {
			var fel = document.getElementById( this.makeID( 'StyleEditorFooter' ) );
			fel.style.backgroundRepeat = 'repeat-x';
			fel.style.backgroundImage = 'url("'+this.getColor( 'imgFooterBackground' )+'");';
		}

		return true;
	},




   /** -------------------------------------------------------------------------------------------
	*  LANGUAGE-DEPENDENT STRINGS
	*  -------------------------------------------------------------------------------------------
	*/



	'strings':{
		'openToolbox':{
			'en':'Access toolbox',
			'de':'Toolbox aktivieren',
			'fr':'Activer la boîte à outils',
            'es':'Accesa Toolbox'
		},
		'closeToolbox':{
			'en':'Close toolbox',
			'de':'Toolbox schliessen',
			'fr':'Fermer la boîte à outils',
            'es':'Cerrar toolbox'
		},
		'applyOptions':{
			'en':'Apply',
			'de':'Anwenden',
			'fr':'Appliquer',
            'es':'Aplicar'
		},
		'pleaseLogIn':{
			'en':'Log in to use the toolbox.',
			'de':'Logg dich ein um die Toolbox zu verwenden.',
			'fr':'Authentifie-toi pour activer la toolbox.',
            'es':'Ingresa a deviantart para usar toolbox'
		},
		'welcomeUser':{
			'en':'Welcome',
			'de':'Hallo',
			'fr':'Salut',
            'es':'Bienvenido'
		},
		'section_devs':{
			'en':'My deviations',
			'de':'Meine Deviations',
			'fr':'Mes déviations',
            'es':'Mis Imágenes'
		},
		'section_prints':{
			'en':'My prints',
			'de':'Meine Produkte',
			'fr':'Mes produits',
            'es':'Mis Impresiones'
		},
		'section_user':{
			'en':'My pages',
			'de':'Meine Seiten',
			'fr':'Mes pages',
            'es':'Mi Página'
		},
		'section_admin':{
			'en':'Administration',
			'de':'Administrieren',
			'fr':'Administrer',
            'es':'Administración'
		},
		'language':{
			'en':'Language',
			'de':'Sprache',
			'fr':'Langue',
            'es':'Lenguaje'
		},
		'layout':{
			'en':'Layout',
			'de':'Ausrichtung',
			'fr':'Agencement',
            'es':'Plantilla'
		},
		'horizontal':{
			'en':'Horizontal',
			'de':'Horizontal',
			'fr':'Horizontal',
            'es':'Horizontal'
		},
		'vertical':{
			'en':'Vertical',
			'de':'Hochkant',
			'fr':'Vertical',
            'es':'Vertical'
		},
		'persistState':{
			'en':'Keep open',
			'de':'Offen halten',
			'fr':'Garder ouvert',
            'es':'Mantener abierto'
		},
		'cancel':{
			'en':'Cancel',
			'de':'Abbrechen',
			'fr':'Annuler',
            'es':'Cancelar'
		},
		'skin':{
			'en':'Color scheme',
			'de':'Farbschema',
			'fr':'Couleurs',
            'es':'Esquema de color'
		},
		'yes':{
			'en':'Yes',
			'de':'Ja',
			'fr':'Oui',
            'es':'Si'
		},
		'no':{
			'en':'No',
			'de':'Nein',
			'fr':'Non',
            'es':'No'
		},
		'options':{
			'en':'Options',
			'de':'Optionen',
			'fr':'Options',
            'es':'Opciones'
		},
		'about':{
			'en':'About',
			'de':'Über',
			'fr':'À propos',
            'es':'Acerca de'
		},
		'translateLinks':{
			'en':'Translate links',
			'de':'Links Übersetzen',
			'fr':'Traduire les liens',
            'es':'Traducir Accesos'
		},
		'devGallery':{
			'en':'Gallery',
			'de':'Galerie',
			'fr':'Galerie',
            'es':'Galería'
		},
		'devScraps':{
			'en':'Scraps',
			'de':'Entwürfe',
			'fr':'Ébauches',
            'es':'Borradores'
		},
		'devPrints':{
			'en':'Prints',
			'de':'Produkte',
			'fr':'Produits',
            'es':'Impresiones'
		},
		'devWallpapers':{
			'en':'Wallpapers',
			'de':'Bildschirmhintergr?nde',
			'fr':'Fonds d\'écran',
            'es':'Fondo de pantalla'
		},
		'devDDS':{
			'en':'Daily Deviations',
			'de':'Tägliche Deviations',
			'fr':'Déviations journalières',
			'es':'Daily Deviations'
		},
		'devSubmit':{
			'en':'Submit',
			'de':'Hochladen',
			'fr':'Ajouter',
            'es':'Subir arte'
		},
		'userHomepage':{
			'en':'Homepage',
			'de':'Homepage',
			'fr':'Page d\'accueil',
            'es':'Página principal'
		},
		'userFavourites':{
			'en':'Favourites',
			'de':'Favoriten',
			'fr':'Favoris',
            'es':'Favoritos'
		},
		'userMessages':{
			'en':'Messages',
			'de':'Nachrichten',
			'fr':'Messages',
            'es':'Mensajes'
		},
		'userDevwatch':{
			'en':'deviantWatch',
			'de':'deviantWatch',
			'fr':'deviantWatch',
			'es':'deviantWatch'
		},
		'userNotes':{
			'en':'Notes',
			'de':'Notizen',
			'fr':'Notes',
            'es':'Notas'
		},
		'userJournal':{
			'en':'Journal',
			'de':'Tagebuch',
			'fr':'Journal',
            'es':'Mi Diario'
		},
		'userWishlist':{
			'en':'Wishlist',
			'de':'Wishlist',
			'fr':'Wishlist',
            'es':'Wishlist'
		},
		'userActivity':{
			'en':'Activity',
			'de':'Aktivität',
			'fr':'Activité',
            'es':'Actividad'
		},
		'userGalleryStats':{
			'en':'Gallery stats',
			'de':'Statistiken',
			'fr':'Statistiques',
            'es':'Estadisticas de la galeria'
		},
		'printHomepage':{
			'en':'Store homepage',
			'de':'Shop-Homepage',
			'fr':'Page d\'accueil',
            'es':'Pagina de Impresiones'
		},
		'printAdmin':{
			'en':'Store administration',
			'de':'Shop-Administration',
			'fr':'Administration du shop',
            'es':'Administrar impresiones'
		},
		'printStorefront':{
			'en':'Edit the storefront',
			'de':'Startseite bearbeiten',
			'fr':'Éditer la page d\'accueil',
            'es':'Editar las impresiones'
		},
		'printProducts':{
			'en':'Products editor',
			'de':'Produkte bearbeiten',
			'fr':'Éditer les produits',
            'es':'Editor de productos'
		},
		'printStats':{
			'en':'Sale statistics',
			'de':'Verkaufsstatistiken',
			'fr':'Statistiques de vente',
            'es':'Estadisticas de venta'
		},
		'printSubmit':{
			'en':'Submit',
			'de':'Hochladen',
			'fr':'Ajouter',
            'es':'Subir impresión'
		},
		'printAspectCalc':{
			'en':'Aspect ratio calculator',
			'de':'Bildformat-Rechner',
			'fr':'Calculateur format d\'image',
            'es':'Calcular aspecto'
		},
		'adminAccount':{
			'en':'Account',
			'de':'Konto',
			'fr':'Compte',
            'es':'Cuenta'
		},
		'adminJournal':{
			'en':'Journal',
			'de':'Tagebuch',
			'fr':'Journal',
            'es':'Diario'
		},
		'adminProfile':{
			'en':'Profile',
			'de':'Profil',
			'fr':'Profil',
            'es':'Profile'
		},
		'adminSettings':{
			'en':'Settings',
			'de':'Einstellungen',
			'fr':'Options',
            'es':'Opciones'
		},
		'adminWishlist':{
			'en':'Wishlist',
			'de':'Wishlist',
			'fr':'Wishlist',
			'es':'Wishlist'
		},
		'adminGallery':{
			'en':'Gallery',
			'de':'Galerie',
			'fr':'Galerie',
            'es':'Galería'
		},
		'adminFriends':{
			'en':'Friends',
			'de':'Freunde',
			'fr':'Amis',
            'es':'Amigos'
		},
		'adminDevwatch':{
			'en':'DevWatches',
			'de':'DevWatch',
			'fr':'DevWatch',
			'es':'DevWatch'
		},

		// since v0.3
		'collapsableSections':{
			'en':'Collapsable categories',
			'de':'Klappbare Kategorien',
			'fr':'Catégories pliables',
			'es':'Desplegar categorias'
		},
		'displaySections':{
			'en':'Categories to display',
			'de':'Kategorien anzeigen',
			'fr':'Afficher les catégories',
			'es':'Categorias a mostrar'
		},
		'displayWelcome':{
			'en':'Display username',
			'de':'Benutzername anzeigen',
			'fr':'Afficher le nom',
			'es':'Mostrar nombre'
		},

		// since v0.4
		'section_tools':{
			'en':'Tools',
			'de':'Werkzeuge',
			'fr':'Outils'
		},
		'section_da':{
			'en':'DeviantART',
			'de':'DeviantART',
			'fr':'DeviantART'
		},
		'displayVanity':{
			'en':'Display vanity',
			'de':'Fusszeile anzeigen',
			'fr':'Afficher la version'
		},
		'toolsEmoticons':{
			'en':'Emoticon Legend',
			'de':'Smileys-Referenz',
			'fr':'Référence des émoticônes'
		},
		'daRandomDeviant':{
			'en':'Random Deviant',
			'de':'Zufalls-Deviant',
			'fr':'Déviant au hasard'
		},
		'daRandomDeviation':{
			'en':'Random Deviation',
			'de':'Zufalls-Deviation',
			'fr':'Déviation au hasard'
		},
		'daTodaysFeaturedDeviations':{
			'en':'Daily deviations',
			'de':'Tägliche Deviations',
			'fr':'Déviations journalières'
		},
		'daArchivedFeaturedDeviations':{
			'en':'Daily deviations archive',
			'de':'Tägliche Deviations Archiv',
			'fr':'Archive des déviations journalières'
		},
		'daShoutbox':{
			'en':'Shoutbox',
			'de':'Shoutbox',
			'fr':'Shoutbox'
		},
		'daToday':{
			'en':'DeviantART today',
			'de':'DeviantART heute',
			'fr':'DeviantART aujourd\'hui'
		},

		// since v0.5
		'userFriends':{
			'en':'Friends',
			'de':'Freunde',
			'fr':'Amis',
			'es':'Amigos'
		},
		'sticky':{
			'en':'Follow mode',
			'de':'Verfolgungsmodus',
			'fr':'Mode poursuite'
		},

		// since v0.7
		'displayTitleText':{
			'en':'Display title text',
			'de':'Titeltext anzeigen',
			'fr':'Afficher le titre'
		},
		'section_options_layout':{
			'en':'Interface layout',
			'de':'Aussehen',
			'fr':'Interface'
		},
		'section_options_settings':{
			'en':'Settings',
			'de':'Einstellungen',
			'fr':'Réglages'
		},
		'section_options_enhancements':{
			'en':'Enhancements',
			'de':'Verbesserungen',
			'fr':'Améliorations'
		},
		'enablePricingEnhancement':{
			'en':'Prints pricing helper',
			'de':'Preisbrechnungs-Helfer',
			'fr':'Aide de calcul de prix'
		},
		'ApproximatePercentage':{
			'en':'Profit percentage',
			'de':'Prozentualer Gewinn',
			'fr':'Pourcentage de gain'
		},

		// since v0.8
		'toolsStyleEditor':{
			'en':'Color scheme editor',
			'de':'Farbschema-Editor',
			'fr':'Éditeur de couleurs'
		},
		'styleEditorTitle':{
			'en':'Color scheme editor',
			'de':'Farbschema-Editor',
			'fr':'Éditeur de couleurs'
		},
		'btnExpandAllSections':{
			'en':'Expand all sections',
			'de':'Alle Kategorien aufklappen',
			'fr':'Ouvrir toutes les catégories'
		},
		'btnCollapseAllSections':{
			'en':'Collapse all sections',
			'de':'',
			'fr':''
		},
		'btnStickynessToggler':{
			'en':'Toggle follow mode: [~] = active, [=] = off',
			'de':'Verfolgungsmodus umschalten: [~] = aktiv, [=] = stationär',
			'fr':'Basculer le mode poursuite: [~] = activé, [=] = désactivé'
		},
		'UnderConstruction':{
			'en':'This area is still undergoing some heavy duty development. You may not be able to use it at all, or erase everything from your current life. Nah, just kidding :)',
			'de':'An diesem Bereich wird noch mächtig entwickelt. Er ist wahrscheinlich noch nicht einsatzfähig und könnte alles aus Ihrem Leben in einem Klick löschen. Nee, wirklich :)',
			'fr':'Cette fonction est en cours de développement massif. Elle n\'est probablement pas encore fonctionnelle, et pourrait tout effacer dans votre vie en un click. Non vraiment, je vous jure :)'
		},
		'skinSilver':{
			'en':'Silver deluxe',
			'de':'Silber deluxe',
			'fr':'Chrome deluxe'
		},
		'skinGrey':{
			'en':'Elegant grey',
			'de':'Eleganz in Grau',
			'fr':'Gris élégance'
		},
		'skinAeonCyan':{
			'en':'Aeon\'s cyan',
			'de':'Aeon\'s cyan',
			'fr':'Le cyan par Aeon'
		},
		'skinDAClassic':{
			'en':'DeviantART classic',
			'de':'DeviantART klassisch',
			'fr':'DeviantART classique'
		},
		'maxLinkLabelLength':{
			'en':'Maximum link title length',
			'de':'Maximale Linktitellänge',
			'fr':'Longueur max. de titre de lien'
		}
	},

};




   /** -------------------------------------------------------------------------------------------
	*  PRICING HELPER
	*  -------------------------------------------------------------------------------------------
	*/




/**
 * Special class that handles the enhancements of the
 * prints pricing management screen.
 */
var deviantToolbox_PriceManager = {
	'prices':{},
	'pricesCount':0,
	'gain':20,
	'enabled':false,
	setGain:function( gain )
	{
		this.gain = gain;

		// if this is set when it has been enabled, propagate
		// the change to all prices.
		if( this.enabled ) {
			for( var id in this.prices ) {
				this.prices[id].setGain();
			}
		}
	},
	addPrice:function( inputEl, minEl, profitEl )
	{
		this.pricesCount = this.pricesCount + 1;
		this.prices[this.pricesCount] = {
			'id':this.pricesCount,
			'inputEl':inputEl,
			'minEl':minEl,
			'profitEl':profitEl,
			'percentDisplayEl':null,
			'minimum':null,
			'profit':null,
			'price':null,
			'gain':this.gain,
			'gainPrecision':0.1,
			'percentIncrement':1,
			/**
			* Enables the price editing controls
			*/
			enable:function()
			{
				this.minimum = this.minEl.firstChild.data.replace( /\$/, '' );
				this.price = parseFloat( this.inputEl.value );
				this.profit = ( this.price - this.minimum ) / 2;
				this.gain = this.profit*100/this.price;

				// disable changing anything while we update
				this.inputEl.setAttribute( 'disabled', 'disabled' );

				// track manual changes to the price
				this.inputEl.setAttribute( 'onChange', 'deviantToolbox_PriceManager.manualUpdate(\''+this.id+'\')' );

				// add direct price controls
				var cel1 = document.createElement( 'span' );
				cel1.style.fontSize = '13px';
				this.inputEl.parentNode.removeChild( this.inputEl.parentNode.firstChild );
				this.inputEl.parentNode.insertBefore( cel1, this.inputEl );
				cel1.innerHTML =
				' <a href="javascript:deviantToolbox_PriceManager.minusPrice( \''+this.id+'\', 0.5 );" title="-0.5" style="cursor:pointer;" tabindex="3000">&laquo;</a>'+
				' <a href="javascript:deviantToolbox_PriceManager.minusPrice( \''+this.id+'\', 1 );" title="-1" style="cursor:pointer;letter-spacing:-2px;" tabindex="3000">&laquo;&laquo;</a> '+
				' <a href="javascript:deviantToolbox_PriceManager.minusPrice( \''+this.id+'\', 5 );" title="-5" style="cursor:pointer;letter-spacing:-2px;" tabindex="3000">&laquo;&laquo;&laquo;</a> ';

				var cel2 = document.createElement( 'span' );
				cel2.style.fontSize = '13px';
				this.inputEl.parentNode.appendChild( cel2 );
				cel2.innerHTML =
				' <a href="javascript:deviantToolbox_PriceManager.plusPrice( \''+this.id+'\', 5 );" title="+5" style="cursor:pointer;letter-spacing:-2px;" tabindex="3000">&raquo;&raquo;&raquo;</a>'+
				' <a href="javascript:deviantToolbox_PriceManager.plusPrice( \''+this.id+'\', 1 );" title="+1" style="cursor:pointer;letter-spacing:-2px;" tabindex="3000">&raquo;&raquo;</a>'+
				' <a href="javascript:deviantToolbox_PriceManager.plusPrice( \''+this.id+'\', 0.5 );" title="+0.5" style="cursor:pointer;" tabindex="3000">&raquo;</a>';

				// add percentage display controls
				/*
				var cel = document.createElement( 'span' );
				this.inputEl.parentNode.appendChild( cel );
				cel.innerHTML =
				' <a href="javascript:deviantToolbox_PriceManager.plusPercent( \''+this.id+'\' );">[+]</a>'+
				' <a href="javascript:deviantToolbox_PriceManager.minusPercent( \''+this.id+'\' );">[-]</a> )';
				*/

				this.inputEl.removeAttribute( 'disabled' );
				this.update();

				return true;
			},
			manualUpdate:function()
			{
				this.price = parseFloat( this.inputEl.value );
				this.profit = ( this.price - this.minimum ) / 2;
				this.gain = this.profit*100/this.price;

				this.update();
			},
			update:function()
			{
				this.profit = ( this.price - this.minimum ) / 2;

				this.inputEl.value = this.formatPrice( this.price );
				this.profitEl.innerHTML = '<b>$'+this.formatPrice( this.profit )+'</b> <acronym title="'+this.getString( 'ApproximatePercentage' )+'">('+this.formatPercent( this.gain )+'%)</acronym>';
			},
			plusPercent:function()
			{
				var newGain = (this.profit*100/this.price)+this.percentIncrement;
				var newPrice = newGain*this.price/this.gain;

				this.price = newPrice;
				this.gain = newGain;
				this.update();
			},
			minusPercent:function()
			{
				newGain = (this.profit*100/this.price)-this.percentIncrement;
				newPrice = newGain*this.price/this.gain;
				if( newPrice < this.minimum ) {
					return true;
				}

				this.price = newPrice;
				this.gain = newGain;
				this.update();
			},
			plusPrice:function( amount )
			{
				this.price = this.price+amount;
				this.profit = ( this.price - this.minimum ) / 2;
				this.gain = this.profit*100/this.price;

				this.update();
			},
			minusPrice:function( amount )
			{
				newPrice = this.price-amount;
				if( newPrice < this.minimum ) {
					return true;
				}

				this.price = newPrice;
				this.profit = ( this.price - this.minimum ) / 2;
				this.gain = this.profit*100/this.price;

				this.update();
			},
			formatPrice:function( price )
			{
				price = parseFloat( price );
				return price.toFixed( 2 );
			},
			formatPercent:function( percent )
			{
				percent = parseFloat( percent );
				return percent.toFixed( 1 );
			},
			calcRealGain:function( price, gain )
			{
				var realGain = gain;
				while( this.calcRealPercent( price, realGain ) < gain ) {
					realGain = realGain+this.gainPrecision;
				}

				return realGain;
			},
			calcRealPercent:function( price, percent )
			{
				var endPrice = price+(price*percent/100);
				var realPercent = price*percent/endPrice;
				return realPercent;
			},
			getString:function( stringID )
			{
				return deviantToolbox.getString( stringID );
			}
		};
	},
	enable:function()
	{
		// enable the individual price controls
		for( var id in this.prices ) {
			if( !this.prices[id].enable() ) {
				return false;
			}
		}

		// add the pricing controls panel
		/*
		var inputs = document.getElementsByTagName( 'input' );
		var cnt = inputs.length;
		for( var i=0; i < cnt; i++ ) {
			if( inputs[i].getAttribute( 'value' ) == 'Update' ) {
				var el = document.createElement( 'div' );
				inputs[i].parentNode.appendChild( el );
				el.innerHTML =
				'<br/>'+
				'<b>Pricing controls:</b><br/>'+
				'<ul>'+
					'<li><a href="javascript:deviantToolbox_PriceManager.displayChangeGain();">Change profit percentage</a></li>';
				'</ul>';
				break;
			}
		}*/

		this.enabled = true;
		return true;
	},
	manualUpdate:function( id )
	{
		this.prices[id].manualUpdate();
	},
	plusPercent:function( id )
	{
		this.prices[id].plusPercent();
	},
	minusPercent:function( id )
	{
		this.prices[id].minusPercent();
	},
	plusPrice:function( id, amount )
	{
		this.prices[id].plusPrice( amount );
	},
	minusPrice:function( id, amount )
	{
		this.prices[id].minusPrice( amount );
	},
	displayChangeGain:function()
	{
		var gain = prompt( 'Target percentage', this.gain );
		this.setGain( gain );
	}
}

unsafeWindow.deviantToolbox = deviantToolbox;
unsafeWindow.deviantToolbox_PriceManager = deviantToolbox_PriceManager;
deviantToolbox.start();