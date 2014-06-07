// ==UserScript==
// @name           Gmail Custom Theme Advanced
// @description    Customize Gmail's custom theme even further with a background image, transparency, and more!
// @version        1.0.5
// @author         Stefan Koshy
// @namespace      http://k0shy.com
// @include        http*://mail.google.com/*
// @exclude        http*://mail.google.com/mail/h/*
// ==/UserScript==

// Special Thanks:
// Brian Huisman (AKA GreyWyvern) for his binary-to-base64 translator (http://www.greywyvern.com/code/php/binary2base64)
// Google for their Closure Compiler, which was used to compress Javascript code of some functions (http://closure-compiler.appspot.com/home)
// Numerous CSS optimizers, especially Icey's (http://iceyboard.no-ip.org/projects/css_compressor) and Online CSS Optimizer (http://www.cssoptimiser.com/)


// Current version of the script (IMPORTANT TO UPDATE for auto-updater)
var current_version = "1.0.5";
var emailAddress = unsafeWindow.GLOBALS[10].replace(/@/, '+++');

var gcta, $, jQuery;

function gctaVarMake() {
	gcta = '';
	gcta =
	{
		bgURL : 'http://imgur.com/koXef.jpg', // BG image URL.
		repeatStyle : 'no-repeat', // BG repeat style
		scrollType : 'fixed', // BG scroll style
		bgColor : '#C2B163', // BG color [default: transparent]
		bgTint : '#FFBD24', // BG Tint
		bgTintStrength : '0.15', // BG Tint Strength (Opacity)
		headerColorHex : '#ffffff', // Header color; MUST be in Hex
		headerOpacity : '0.50', // Header opacity
		headerLinksColor : '#3b2c00', // Header link color [default: 'default' or '']
		logoURL : 'https://mail.google.com/mail/images/2/5/ninja/logo.png', // Logo URL [default: 'default' or '']
		buzzIconURL : 'Default Google Buzz Icon', // Google Buzz Icon URL [default: 'default' or '']
		mainOpacity : '0.85', // Main Area opacity
		
		// Main Canvas
		canvasMainBorderColor: '#DECE9F',
		canvasMainBorderOpacity: '0.5',
		
		canvasMainEmptySpaceColor: '#FFFFFF',
		canvasMainEmptySpaceOpacity: '0.5',
		
		canvasMainReadColor: '#FFFFFF',
		canvasMainReadOpacity: '0.7',
		canvasMainUnreadColor: '#FFFFFF',
		canvasMainUnreadOpacity: '0.85',
		canvasMainReadSelectedColor: '#FFFFFF',
		canvasMainReadSelectedOpacity: '0.33',
		canvasMainUnreadSelectedColor: '#FFFFFF',
		canvasMainUnreadSelectedOpacity: '0.1',
		
		canvasMainButtonPanelTopColor: '#050505',
		canvasMainButtonPanelTopOpacity: '0.5',
		canvasMainButtonPanelBottomColor: '#777777',
		canvasMainButtonPanelBottomOpacity: '0.5',
		
		moduleOpacity : '0.15', // Module (side box) opacity
		moduleColor: '#FFFFFF', // Module (side box) color
		boxOpacity : '0.85', // Chat/Task box opacity
		sideMoreBG : '#000000', // Side 'More' link menu BG
		sideMoreBorder : '#ffffff', // Side 'More' link menu border
		sideMoreOpacity : '0.90' // Side 'More' link menu opacity
	};
}

gctaVarMake();

function initialVars(testOptions) {
	var stringHolder = '';
	var stringHolder2 = '';
	if (testOptions !== undefined) {
		var stringHolder2 = '_test';
	}
	for (x in gcta) {
		stringHolder = 'gcta_'+emailAddress+'.'+x+stringHolder2;
		gcta[x] = GM_getValue(stringHolder, gcta[x]);
	}
}

initialVars();

// Logging purposes, send to Firebug if it exists
/*
if (unsafeWindow.console) {
   var GM_log = unsafeWindow.console.log;
}
*/

var gm_style = 'gcta_'+emailAddress+'_style_1';
var gm_toggleStatus = 'gcta_'+emailAddress+'_toggle';

var styleSheet = GM_getValue(gm_style, "");
var toggleStatus = GM_getValue(gm_toggleStatus, "on");

var mainCanvas, options, documentOut, doc2, bar, barLink, headerCanvas, headerBG, bgCanvas, bgTintImage, css, cssToIncludeOnce, cssToKillOtherThemes, cssForChatAndTasks, head;
var nodeKilled, nodeOverride, nodeRegular, nodeChatTasksOverride, nodeChatTasksStyle, nodeCSSIncludedOnce;
var gcta_help_text;
var tries;

function saveStyle() {
	if (toggleStatus == 'on') {
		if(confirm("This is a quick overview of how saving a style works.\n\nSuppose you want to use a different theme when you're logged into another computer, such as a a friend's or a public one. GCTA can save all the settings from your Custom theme and apply them later. So, if you wanted, you could use the built-in Mountains theme when you're away from your computer, and your GCTA theme when you're on your main computer.\n\nGCTA must be disabled first before saving a style. Would you like to disable it and reload the page?")) {
			GM_setValue(gm_toggleStatus, "off");
			window.location.reload();
		}
	} else {
		if(confirm('Have you selected your custom theme and customized all the colors to your liking? If not, press Cancel and do so before saving your style.')) {
			if (styleSheet != '') {
				if(confirm('A saved style already exists. Are you sure you want to override it?')) {
					saveStyle2();
				}
			} else {
				saveStyle2();
			}
		}
	}
}

function saveStyle2() {
	var styleObject = findStyleObject();
	if (styleObject === undefined) {
		alert('You must wait for the page to fully load.');
	} else {
		GM_setValue(gm_style, styleObject.innerHTML);
		styleSheet = styleObject.innerHTML;
		if(confirm('Style saved! Reload the page and enable GCTA?')) {
			GM_setValue(gm_toggleStatus, "on");
			window.location.reload();
		}
	}
}

function deleteStyle() {
	if(confirm('The saved style will be deleted and Gmail will be reloaded. Continue?')) {
		GM_setValue(gm_style, "");
		window.location.reload();
	}
}

function enableScript() {
	if(confirm('GCTA will be enabled, and Gmail will be reloaded. Continue?')) {
		GM_setValue(gm_toggleStatus, "on");
		window.location.reload();
	}
}

function disableScript() {
	if(confirm('GCTA will be disabled, and Gmail will be reloaded. Continue?')) {
		GM_setValue(gm_toggleStatus, "off");
		window.location.reload();
	}
}

function findStyleObject() {
	for (elem=0;elem<=10;elem++) {
		var matchTo = 'html,body{margin:0;height:100%;width:100%;overflow:hidden}body.xE';
		if (doc2.getElementsByClassName('cQ')[0].firstChild.childNodes.item(elem).innerHTML.match("^"+matchTo)==matchTo) {
			return doc2.getElementsByClassName('cQ')[0].firstChild.childNodes.item(elem);
		}
	}
}

// HexToRGB functions, by Alexei Kourbatov (http://www.linuxtopia.org/online_books/javascript_guides/javascript_faq/hextorgb.htm)
// ---------------------------------------------------------------------------
function HexToR(h) {return parseInt((cutHex(h)).substring(0,2),16);}
function HexToG(h) {return parseInt((cutHex(h)).substring(2,4),16);}
function HexToB(h) {return parseInt((cutHex(h)).substring(4,6),16);}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h;}
// ---------------------------------------------------------------------------
// End Alexei Kourbatov's code

function createCSS() {
	// Stretch background if enabled
	var backgroundForBody = '';
	if (gcta['scrollType'] == 'stretch') {
		doc2.getElementById('StretchDivImage').src = gcta['bgURL'];
	} else {
		doc2.getElementById('StretchDivImage').src = '';
		backgroundForBody = gcta['bgURL'];
	}

	// Create the CSS
	css = '' +
		'.cP {background: url("'+backgroundForBody+'") '+gcta['repeatStyle']+' '+gcta['scrollType']+' center center '+gcta['bgColor']+' !important;} ' + // Background
		'.TM, .TL {-moz-border-radius: 10px; border: 1px solid '+gcta['sideMoreBorder']+'; background: none repeat scroll 0 0 '+gcta['sideMoreBG']+'; opacity: '+gcta['sideMoreOpacity']+';} ' + // Side 'More' Link Background
		'#tintDiv {background-color: '+gcta['bgTint']+'; opacity: '+gcta['bgTintStrength']+'; width: 100%; height: 100%; position: fixed; top: 0pt; left: 0pt; z-index: -10000;} ' + // Background Tint
		'.qp {background: none; background-color: rgba('+HexToR(gcta['headerColorHex'])+', '+HexToG(gcta['headerColorHex'])+', '+HexToB(gcta['headerColorHex'])+', '+gcta['headerOpacity']+') !important;} ' + // Header
		'.T0, .TZ {background: none; background-color: rgba('+HexToR(gcta['moduleColor'])+', '+HexToG(gcta['moduleColor'])+', '+HexToB(gcta['moduleColor'])+', '+gcta['moduleOpacity']+') !important;} ' + // Module
		'.vC, .s .pt {background-color: transparent !important;} ' + // More Module Stuff
		'.pt, .pl, .pU {background-color: transparent !important;} ' + // Module Stuff - Quick Links fix
		'.q0CeU, .pk {opacity: '+gcta['mainOpacity']+' !important;} ' + // Main Area
		
		//Outer border
		'.z .p, .y .p, .z .o, .y .o, .y .m, .z .q, .y .q, .z .i, .y .i, .z .j, .y .j, .z .h, .y .h, .z .mq, .nZ {background-color: rgba('+HexToR(gcta['canvasMainBorderColor'])+', '+HexToG(gcta['canvasMainBorderColor'])+', '+HexToB(gcta['canvasMainBorderColor'])+', '+gcta['canvasMainBorderOpacity']+')!important;}.mq{margin-top: 0px!important;}.z .n{border-left:4px solid rgba('+HexToR(gcta['canvasMainBorderColor'])+', '+HexToG(gcta['canvasMainBorderColor'])+', '+HexToB(gcta['canvasMainBorderColor'])+', '+gcta['canvasMainBorderOpacity']+') !important;margin-left:0!important;}.z .k{border-right:4px solid rgba('+HexToR(gcta['canvasMainBorderColor'])+', '+HexToG(gcta['canvasMainBorderColor'])+', '+HexToB(gcta['canvasMainBorderColor'])+', '+gcta['canvasMainBorderOpacity']+') !important;margin-right:0!important;}.z .n, .y .n, .z .m {background-color: transparent!important;}' +
		
		// Email Table Empty Space BG
		'.TB {background-color: rgba('+HexToR(gcta['canvasMainEmptySpaceColor'])+', '+HexToG(gcta['canvasMainEmptySpaceColor'])+', '+HexToB(gcta['canvasMainEmptySpaceColor'])+', '+gcta['canvasMainEmptySpaceOpacity']+')!important;} .TC {border-bottom: 0!important;}' +
		
		// Button panel
		'.A1 {background-color: rgba('+HexToR(gcta['canvasMainButtonPanelTopColor'])+', '+HexToG(gcta['canvasMainButtonPanelTopColor'])+', '+HexToB(gcta['canvasMainButtonPanelTopColor'])+', '+gcta['canvasMainButtonPanelTopOpacity']+')!important;}' +

		// Bottom Button panel
		'.AY {background-color: rgba('+HexToR(gcta['canvasMainButtonPanelBottomColor'])+', '+HexToG(gcta['canvasMainButtonPanelBottomColor'])+', '+HexToB(gcta['canvasMainButtonPanelBottomColor'])+', '+gcta['canvasMainButtonPanelBottomOpacity']+')!important;}' +
		
		// Unread rows
		'.zE {background-color: rgba('+HexToR(gcta['canvasMainUnreadColor'])+', '+HexToG(gcta['canvasMainUnreadColor'])+', '+HexToB(gcta['canvasMainUnreadColor'])+', '+gcta['canvasMainUnreadOpacity']+')!important;}' +

		// Read rows
		'.yO {background-color: rgba('+HexToR(gcta['canvasMainReadColor'])+', '+HexToG(gcta['canvasMainReadColor'])+', '+HexToB(gcta['canvasMainReadColor'])+', '+gcta['canvasMainReadOpacity']+')!important;}' +
		
		// Unread selected rows
		'.zE.x7 {background-color: rgba('+HexToR(gcta['canvasMainUnreadSelectedColor'])+', '+HexToG(gcta['canvasMainUnreadSelectedColor'])+', '+HexToB(gcta['canvasMainUnreadSelectedColor'])+', '+gcta['canvasMainUnreadSelectedOpacity']+')!important;}' +

		// Read selected rows
		'.yO.x7 {background-color: rgba('+HexToR(gcta['canvasMainReadSelectedColor'])+', '+HexToG(gcta['canvasMainReadSelectedColor'])+', '+HexToB(gcta['canvasMainReadSelectedColor'])+', '+gcta['canvasMainReadSelectedOpacity']+')!important;}' +
	'';
	
	// Chat/Tasks panel CSS
	cssForChatAndTasks = '.AD {opacity: '+gcta['boxOpacity']+' !important;} ';

	// Add custom logo if provided
	if (gcta['logoURL'] != 'Theme-Specific Logo' && gcta['logoURL'] != '') {
		css += '.Rgky9 {background-image: url("'+gcta['logoURL']+'") !important;} ';
	}

	// Change header links if provided
	if (gcta['headerLinksColor'] != 'default' && gcta['headerLinksColor'] != '') {
		css +=  'a.gb1.qq, a.gb3.qq {color: '+gcta['headerLinksColor']+' !important;} ' +
				'.a7, .a8 .e {color: '+gcta['headerLinksColor']+' !important;} ';
	}

	// Change Buzz icon if provided
	if (gcta['buzzIconURL'] != 'Default Google Buzz Icon' && gcta['buzzIconURL'] != '') {
		doc2.getElementsByClassName('Xo')[0].src = gcta['buzzIconURL'];
		doc2.getElementsByClassName('Xo')[0].style.backgroundImage = 'none';
	} else {
		doc2.getElementsByClassName('Xo')[0].src = 'https://mail.google.com/mail/images/cleardot.gif';
		doc2.getElementsByClassName('Xo')[0].style.backgroundImage = '';
	}
}

function createIncludedOnceCSS() {
	// Add background image if stretched
	var bgStretchDiv = doc2.createElement('div');
	bgStretchDiv.id = 'bgStretchDiv';
	bgStretchDiv.innerHTML = '<img id="StretchDivImage" src="" width="100%" height="100%"/>';
	doc2.getElementsByClassName('cP')[0].appendChild(bgStretchDiv);
	
	cssToIncludeOnce = '' +
		'#bgStretchDiv {position:fixed; top:0; left:0; width:100%; height:100%; z-index: -10001;}' +
		'#gcta_options_div_outer {position: fixed; left: 50%; top: 50%; border: 5px #C9C9BD solid; -moz-border-radius: 10px; overflow:hidden; height: 400px; width:700px; margin: -200px 0 0 -350px;  font-family: "Arial"; opacity: .85; z-index: 50;} ' +
		'#gcta_options_topbar {border-bottom: 1px white dotted; cursor:default; font-size: 11px; -moz-border-radius: 5px 5px 0 0; padding: 2px; color: #ffffff; background-color: #000000; display: block; height:20px;} ' +
		'#gcta_options_help {cursor:default; border-bottom: 1px black solid; text-align:center; background-color: black; color: white; padding: 2px; display: block; height:26px; font-size: 10px;} ' +
		'.gcta_options_top_link {margin-top: -2px; float: left; padding: 4px 8px; display: block;}' +
		'.gcta_options_top_left {margin-top: -2px; float: left; padding: 4px 8px; display: block;}' +
		'a.gcta_options_top_link {text-decoration: none; cursor:pointer;}' +
		'#gcta_options_div {display:block; overflow:scroll; height:100%; width:100%; margin: 0; position:relative;background-color: #ffffff; font-size: 14px;} ' +
		'.gcta_options_combobox_input {border: 0pt none; margin-right: 19px;}' +
		'' +
		'#gcta_options_form {padding:0px;} ' +
		'.gcta_options_block {border:1px solid black;} ' +
		'.gcta_options_block .content {padding:5px;} ' +
		'.gcta_options_block .content .centerized {text-align:center; margin-top: 20px;} ' +
		'.gcta_options_block .content .centerized.first {margin-top: 0px;} ' +
		'.gcta_options_block .content .centerized .color {width:163px!important;} ' +
		'.gcta_options_header {border-color:black; border-style:solid; border-width:1px 1px 2px;}' +
		'.gcta_options_header p {font-weight:bold; height:15px; line-height:14px; padding:0; margin:0; display:table-cell;}' +
		'.gcta_options_header .plus {font-family:"Trebuchet MS"; -moz-user-select:none; font-size:16px; border-color:black; border-style:solid; border-width:1px 2px 1px 1px; text-align: center; width: 15px; color:black; background-color: white;} ' +
		'.gcta_options_header .plus:hover {background-color:black; color:white; cursor:pointer;} ' +
		'.gcta_options_header .title {font-family:"Tahoma"; padding-left: 5px; font-size:13px;} ' +
		'.gcta_options_input_text {display: inline-block;} ' +
		'.gcta_options_line_block {text-align: center; padding: 0; margin:0; margin-left: auto; margin-right: auto; width: 636px;} ' +
		'*.gcta_options_line_block {vertical-align: middle;} ' +
		'.gcta_options_span_block {display: inline-block; padding-top: 3px;} ' +
		'#gcta_options_div h1 {padding: 0px 0px 10px 0px; margin:0;} ' +
		'#gcta_options_div h2 {padding: 0px 0px 10px 0px; margin:0;} ' + 
		// CSS for CARPE Slider (modified)
		'*.carpe_horizontal_slider_display_combo{clear:left;margin:0;display:inline-block;vertical-align:middle}*.carpe_vertical_slider_display_combo{float:left;margin:0}*.carpe_horizontal_slider_track{background-color:transparent;color:#333;width:120px;float:left;margin:0;line-height:0;font-size:0;text-align:left;padding:4px;}*.carpe_vertical_slider_track{background-color:transparent;color:#333;padding:3px 6px 15px;width:24px;height:100px;border:1px solid;border-color:#ddd #999 #999 #ddd}*.carpe_horizontal_slider_track *.carpe_slider_slit{background-color:#333;color:#ccc;width:110px;height:2px;margin:4px 4px 2px;line-height:0;position:absolute;z-index:1;border:1px solid;border-color:#999 #ddd #ddd #999}*.carpe_vertical_slider_track *.carpe_slider_slit{background-color:#000;color:#333;width:2px;height:100px;position:absolute;margin:4px 10px;padding:4px 0 1px;line-height:0;font-size:0;border:1px solid;border-color:#666 #ccc #ccc #666}*.carpe_horizontal_slider_track *.carpe_slider{width:16px;background-color:#666;color:#333;position:relative;margin:0;height:8px;z-index:1;line-height:0;font-size:0;text-align:left;border:2px solid;border-color:#999 #333 #333 #999}*.carpe_vertical_slider_track *.carpe_slider{width:20px;background-color:#666;color:#333;position:relative;margin:0;height:8px;z-index:1;line-height:0;font-size:0;text-align:left;border:2px solid;border-color:#999 #333 #333 #999}*.carpe_slider_display_holder{background-color:transparent;color:#333;width:34px;margin:0;float:left;padding:0 2px 0 0;height:20px;text-align:right;}.carpe_slider_display{background-color:transparent;color:#333;padding:3px 1px 0 0;width:30px;text-align:right;line-height:10px;border:0;cursor:default;font:700 11px verdana, arial, helvetica, sans-serif}' +
	'';
	
	// CSS to override some themes
	cssToKillOtherThemes = '' +
		// Removes all theme background images
		'.vI8oZc {display: none;}' +
		
		// Fixes Desk theme with logo positioning
		'.Rgky9 {background-position: center center !important; height:59px !important; margin:1px 10px 10px !important; width:143px !important;}' +
	'';
}

function buildOptions(first) {
	// Some temporary variables
	var cb_bgURL = comboBoxBuilder('bgURL', 670, '',[['Nature',['Beach'],['http://i.imgur.com/ulRMy.jpg']],['GT (Georgia Tech)',['Buzz + GT Logo (Bottom-Left)'],['http://imgur.com/koXef.jpg']]], 'Background Image URL', 'Insert a URL to an image here, or use the dropdown arrow to choose preconfigured images.');
	var cb_logoURL = comboBoxBuilder('logoURL', 670, '',[['Default Logo (Changes with Theme)',['Theme-Specific Logo'],['Theme-Specific Logo']],['Gmail Logos',['Ninja'],['https://mail.google.com/mail/images/2/5/ninja/logo.png']],['Gmail Logos (Beta)',['Original'],['https://mail.google.com/mail/images/2/5/logo.png']]], 'Logo Image URL', 'Insert a URL to a logo here, or use the dropdown arrow to choose preconfigured images.');
	var cb_buzzIconURL = comboBoxBuilder('buzzIconURL', 670, '',[['Google',['Google Buzz Icon'],['Default Google Buzz Icon']],['GT (Georgia Tech)',['Buzz'],['http://www.gatech.edu/favicon.ico']]], 'Buzz Icon URL', 'Insert a URL to an icon here, or use the dropdown arrow to choose preconfigured images.');
	var sel_repeatStyle = selectBoxBuilder('repeatStyle', 170, 'margin-right:5px;', ['no-repeat','repeat-x','repeat-y','repeat'], ['No Repeat','Repeat X','Repeat Y','Repeat X+Y'], 'Repeat Style', 'Change how the background image repeats itself. X = Horizontal, Y = Vertical.');
	var sel_scrollType = selectBoxBuilder('scrollType', 153, 'margin-right:5px;', ['fixed','scroll','stretch'], ['Fixed','Scroll','Stretch'], 'Background Scrolling Type', 'Change whether or not the background scrolls with the page (Scroll) or stays in the same place (Fixed). "Stretch" fixes the background and stretches it.');
	var sl_bgTintStrength = sliderBuilder('bgTintStrengthSlide', 'horizontal', 'bgTintStrength', '0', '1', '101', '2', gcta['bgTintStrength'], 'Background Tint Strength', 'Change the strength of the background tint. Set to 0 to get rid of the tint.');
	
	var sl_canvasMainBorderOpacity = sliderBuilder('canvasMainBorderOpacitySlide', 'horizontal', 'canvasMainBorderOpacity', '0', '1', '101', '2', gcta['canvasMainBorderOpacity'], 'Main Canvas - Border - Opacity', 'Change the opacity of the main canvas\\\'s border');
	var sl_canvasMainEmptySpaceOpacity = sliderBuilder('canvasMainEmptySpaceOpacitySlide', 'horizontal', 'canvasMainEmptySpaceOpacity', '0', '1', '101', '2', gcta['canvasMainEmptySpaceOpacity'], 'Main Canvas - Empty Email-Table Space - Opacity', 'Change the opacity of the main canvas\\\'s empty email-table space');
	var sl_canvasMainButtonPanelTopOpacity = sliderBuilder('canvasMainButtonPanelTopOpacitySlide', 'horizontal', 'canvasMainButtonPanelTopOpacity', '0', '1', '101', '2', gcta['canvasMainButtonPanelTopOpacity'], 'Main Canvas - Button Panel (Top) - Opacity', 'Change the opacity of the main canvas\\\'s top button panel');
	var sl_canvasMainButtonPanelBottomOpacity = sliderBuilder('canvasMainButtonPanelBottomOpacitySlide', 'horizontal', 'canvasMainButtonPanelBottomOpacity', '0', '1', '101', '2', gcta['canvasMainButtonPanelBottomOpacity'], 'Main Canvas - Button Panel (Bottom) - Opacity', 'Change the opacity of the main canvas\\\'s bottom button panel');
	
	var sl_canvasMainUnreadOpacity = sliderBuilder('canvasMainUnreadOpacitySlide', 'horizontal', 'canvasMainUnreadOpacity', '0', '1', '101', '2', gcta['canvasMainUnreadOpacity'], 'Main Canvas - Unread Rows - Opacity', 'Change the opacity of the main canvas\\\'s unread rows');
	var sl_canvasMainReadOpacity = sliderBuilder('canvasMainReadOpacitySlide', 'horizontal', 'canvasMainReadOpacity', '0', '1', '101', '2', gcta['canvasMainReadOpacity'], 'Main Canvas - Read Rows - Opacity', 'Change the opacity of the main canvas\\\'s read rows');
	var sl_canvasMainUnreadSelectedOpacity = sliderBuilder('canvasMainUnreadSelectedOpacitySlide', 'horizontal', 'canvasMainUnreadSelectedOpacity', '0', '1', '101', '2', gcta['canvasMainUnreadSelectedOpacity'], 'Main Canvas - Selected Rows - Unread - Opacity', 'Change the opacity of the main canvas\\\'s selected unread rows');
	var sl_canvasMainReadSelectedOpacity = sliderBuilder('canvasMainReadSelectedOpacitySlide', 'horizontal', 'canvasMainReadSelectedOpacity', '0', '1', '101', '2', gcta['canvasMainReadSelectedOpacity'], 'Main Canvas - Selected Rows - Read - Opacity', 'Change the opacity of the main canvas\\\'s selected read rows');
	
	var sl_headerOpacity = sliderBuilder('headerOpacitySlide', 'horizontal', 'headerOpacity', '0', '1', '101', '2', gcta['headerOpacity'], 'Header Opacity', 'Change the opacity of the header');
	var sl_mainOpacity = sliderBuilder('mainOpacitySlide', 'horizontal', 'mainOpacity', '0', '1', '101', '2', gcta['mainOpacity'], 'Main Area Opacity', 'Change the opacity of the main area');
	var sl_moduleOpacity = sliderBuilder('moduleOpacitySlide', 'horizontal', 'moduleOpacity', '0', '1', '101', '2', gcta['moduleOpacity'], 'Module Opacity', 'Change the opacity of the modules (left-hand boxes)');
	var sl_boxOpacity = sliderBuilder('boxOpacitySlide', 'horizontal', 'boxOpacity', '0', '1', '101', '2', gcta['boxOpacity'], 'Box Opacity', 'Change the opacity of the chat/tasks boxes');
	var sl_sideMoreOpacity = sliderBuilder('sideMoreOpacitySlide', 'horizontal', 'sideMoreOpacity', '0', '1', '101', '2', gcta['sideMoreOpacity'], 'Side "More" Opacity', 'Change the opacity of the side "More" area');
	
	// Build Options panel
	var optionsHTML = '' +
		'<div id="gcta_options_topbar"><span class="gcta_options_top_left">' +
		
		// Title
		'Gmail Custom Theme Advanced - Options' +
		
		'</span><span style="float:right; margin-right: -2px;">' +
		
		// Buttons
		'<a '+createMouseover('Save/Close Options', 'Save all your settings, then close the options window.')+' class="gcta_options_top_link" id="gcta_options_submit_close" style="color: #ABFFB6;">Save/Close</a>' +
		'<a '+createMouseover('Save Options', 'Save all your settings.')+' class="gcta_options_top_link" id="gcta_options_submit" style="color: #ABFFB6;">Save</a>' +
		'<a '+createMouseover('Test Options', 'Test out the current settings.')+' class="gcta_options_top_link" id="gcta_options_test" style="color: #9ECBFF;">Test</a>' +
		'<a '+createMouseover('Reset Options', 'Reset the options back to their saved configuration.')+' class="gcta_options_top_link" id="gcta_options_reset" style="color: #9ECBFF;">Reset</a>' +
		'<a '+createMouseover('Reset Options to Default', 'Resets all options back to the original, default settings.')+' class="gcta_options_top_link" id="gcta_options_reset_full" style="color: #FFA1A1;">Reset to Default</a>' +
		'<a '+createMouseover('Minimize Options', 'Minimize the options window')+' class="gcta_options_top_link" id="gcta_options_minimize" style="color: #FFA1A1; margin:-1px 0 0; padding: 3px;"><img src="data:image/gif;base64,R0lGODlhEQAEAIABAP///wAAACH5BAEKAAEALAAAAAARAAQAAAIHhI+py+1vCgA7"/></a>' +
		'<a '+createMouseover('Close Options', 'Closes this option window')+' class="gcta_options_top_link" id="gcta_options_close" style="color: #FFA1A1; margin:-1px 3px 0 0; padding: 3px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHGwEkLma1HzkAAAECSURBVDjLlZRBjoNAEAMHiUs+nwuBF+U7gIYHVO3Fs5mNgshyAQ1tt+2mKWoFNvWuDuWLSx3Ue3C15OHIfSqlFOAjuJ2rk7qph7qVKNjUqu7qcqFiSV0N7l6AIcx7mKv6AMbWGSjqCDzy/gB2dQKGPx2AmqIVmN8szMAK1NQt7xJbx4e6tm4hvsXCEfAKPE6zi+Q5BEcAzxC3s1kdT0PrpC+dol+LzcLZ9P4QATfg2TLK/Rlr1wSflCTM75SoY6ZwmkkyGz+BT6ejfj+dFNaucO4bZCp92Mv7Mk3qHhuXX2zqXl9svzvADlzuTupeu6NuYb7c4s7a1ONK20bg3/+T5uAHXNmeZ0W7hW0AAAAASUVORK5CYII%3D"/></a>' +
		
		// Help Box
		'</span></div><div id="gcta_options_help">'+gcta_help_text+'</div><div id="gcta_options_div"><form id="gcta_options_form">' +
	
		'<div class="gcta_options_block"><div class="gcta_options_header"><p '+plusMinusButton()+' class="plus">&minus;</p><p class="title">Background Options</p></div><div class="content">' +
		cb_bgURL +
		sel_repeatStyle +
		sel_scrollType +
		jscolorBuilder('bgColor', gcta['bgColor'], '80px', '0 5px 0 0', 'Background Color', 'Change the color of the background') +
		jscolorBuilder('bgTint', gcta['bgTint'], '80px', '0', 'Background Tint', 'Change the color of the background tint') +
		sl_bgTintStrength +
		
		'</div></div><div class="gcta_options_block"><div class="gcta_options_header"><p '+plusMinusButton()+' class="plus">&minus;</p><p class="title">Main Canvas Options</p></div><div class="content" style="text-align:center;"><div class="centerized first">' +
		
		jscolorBuilder('canvasMainBorderColor', gcta['canvasMainBorderColor'], '80px', '0', 'Main Canvas - Border - Color', 'Change the color of the main canvas\\\'s border') +
		jscolorBuilder('canvasMainEmptySpaceColor', gcta['canvasMainEmptySpaceColor'], '80px', '0', 'Main Canvas - Empty Email-Table Space - Color', 'Change the color of the main canvas\\\'s empty email-table space') +
		jscolorBuilder('canvasMainButtonPanelTopColor', gcta['canvasMainButtonPanelTopColor'], '80px', '0', 'Main Canvas - Button Panel (Top) - Color', 'Change the color of the main canvas\\\'s top button panel') +
		jscolorBuilder('canvasMainButtonPanelBottomColor', gcta['canvasMainButtonPanelBottomColor'], '80px', '0', 'Main Canvas - Button Panel (Bottom) - Color', 'Change the color of the main canvas\\\'s bottom button panel') +
		'<br/>' +
		sl_canvasMainBorderOpacity +
		sl_canvasMainEmptySpaceOpacity +
		sl_canvasMainButtonPanelTopOpacity +
		sl_canvasMainButtonPanelBottomOpacity +
		'</div><div class="centerized">' +
		
		jscolorBuilder('canvasMainUnreadColor', gcta['canvasMainUnreadColor'], '80px', '0', 'Main Canvas - Unread Rows - Color', 'Change the color of the main canvas\\\'s unread rows') +
		jscolorBuilder('canvasMainReadColor', gcta['canvasMainReadColor'], '80px', '0', 'Main Canvas - Read Rows - Color', 'Change the color of the main canvas\\\'s read rows') +
		jscolorBuilder('canvasMainUnreadSelectedColor', gcta['canvasMainUnreadSelectedColor'], '80px', '0', 'Main Canvas - Selected Rows - Unread - Color', 'Change the color of the main canvas\\\'s selected unread rows') +
		jscolorBuilder('canvasMainReadSelectedColor', gcta['canvasMainReadSelectedColor'], '80px', '0', 'Main Canvas - Selected Rows - Read - Color', 'Change the color of the main canvas\\\'s selected read rows') +
		'<br/>' +
		sl_canvasMainUnreadOpacity +
		sl_canvasMainReadOpacity +
		sl_canvasMainUnreadSelectedOpacity +
		sl_canvasMainReadSelectedOpacity +
		
		'</div>' +
		
		'</div></div><div class="gcta_options_block"><div class="gcta_options_header"><p '+plusMinusButton()+' class="plus">+</p><p class="title">Logo Options</p></div><div class="content" style="display:none;">' +
		
		cb_logoURL +
		
		'</div></div><div class="gcta_options_block"><div class="gcta_options_header"><p '+plusMinusButton()+' class="plus">+</p><p class="title">Buzz Icon Options</p></div><div class="content" style="display:none;">' +
		
		cb_buzzIconURL +
		
		'</div></div><div class="gcta_options_block"><div class="gcta_options_header"><p '+plusMinusButton()+' class="plus">+</p><p class="title">Top Header Options</p></div><div class="content" style="display:none;">' +
		
		jscolorBuilder('headerColorHex', gcta['headerColorHex'], '80px', '0', 'Header Background Color', 'Color for the header. Use "transparent" to get rid of the color.') +
		
		sl_headerOpacity +
		
		jscolorBuilder('headerLinksColor', gcta['headerLinksColor'], '80px', '0', 'Header Links Color', 'Color for the header links.') +
		
		'</div></div><div class="gcta_options_block"><div class="gcta_options_header"><p '+plusMinusButton()+' class="plus">+</p><p class="title">Module (boxes on the side) Options</p></div><div class="content" style="display:none;">' +
		
		sl_moduleOpacity +
		jscolorBuilder('moduleColor', gcta['moduleColor'], '80px', '0', 'Module Color', 'Change the color of the modules') +
		
		'</div></div><div class="gcta_options_block"><div class="gcta_options_header"><p '+plusMinusButton()+' class="plus">+</p><p class="title">Side \'More\' Menu (under Inbox, etc. links) Options</p></div><div class="content" style="display:none;">' +
		
		jscolorBuilder('sideMoreBG', gcta['sideMoreBG'], '80px', '0', 'Side More Background', 'Side More Menu Background color.') +
		jscolorBuilder('sideMoreBorder', gcta['sideMoreBorder'], '80px', '0', 'Side More Border', 'Side More Menu Border color.') +
		sl_sideMoreOpacity +
		
		'</div></div><div class="gcta_options_line_block">' +
	
		'</div><div class="gcta_options_line_block" style="text-align: center; margin-top: 5px;">' +
		
		'</div><div class="gcta_options_line_block" style="text-align: center; margin-top: 20px;">' +
	
		'</div><div class="gcta_options_line_block" style="text-align: center; margin-top: 20px;">' +
		
		'</div><div class="gcta_options_line_block" style="text-align: center; margin-top: 20px;">' +
		
		sl_mainOpacity +

		sl_boxOpacity +
		
		'</div><div class="gcta_options_line_block" style="text-align: center; margin-top: 20px;">' +
	
		'</div></form>' +
	
		'</div>';
	
	options.innerHTML = optionsHTML;
	
	// Start jscolor
	jscolor.init();
	
	// Create/reset sliders
	initSliders();
	
	// Handle Options buttons
	doc2.getElementById('gcta_options_close').addEventListener("click", hideOptions, true);
	doc2.getElementById('gcta_options_minimize').addEventListener("click", minimizeOptions, true);
	doc2.getElementById('gcta_options_submit_close').addEventListener("click", saveCloseOptions, true);
	doc2.getElementById('gcta_options_submit').addEventListener("click", saveOptions, true);
	doc2.getElementById('gcta_options_test').addEventListener("click", testOptions, true);
	doc2.getElementById('gcta_options_reset').addEventListener("click", resetOptions, true);
	doc2.getElementById('gcta_options_reset_full').addEventListener("click", resetFullOptions, true);
}

function sliderBuilder(ID, orien, dID, from, to, count, dec, val, mouseoverhead, mouseover) {
	return '<div '+createMouseover(mouseoverhead, mouseover)+' class="carpe_horizontal_slider_display_combo"><div class="carpe_horizontal_slider_track"><div class="carpe_slider_slit"></div><div class="carpe_slider" distance="100" id="'+ID+'" orientation="'+orien+'" display="'+dID+'"></div></div><div class="carpe_slider_display_holder"><input class="carpe_slider_display" id="'+dID+'" type="text" from="'+from+'" to="'+to+'" valuecount="'+count+'" decimals="'+dec+'" value="'+val+'" /></div></div>';
}

function jscolorBuilder(ID, val, width, margin, mouseoverhead, mouseover) {
	return '<input '+createMouseover(mouseoverhead, mouseover)+' class="color {hash:true,adjust:false} gcta_options_input_text" id="'+ID+'" type="text" value="'+val+'" style="width: '+width+';margin: '+margin+';"/>';
}

function createMouseover(header, text) {
	return 'onmouseover="setHelpText(setHelpHeader(\''+header.replace(/'/g, '&apos;').replace(/"/g, '&quot;')+'\')+\''+text.replace(/'/g, '&apos;').replace(/"/g, '&quot;')+'\');" onmouseout="returnHelpTextToNormal();"';
}

function plusMinusButton() {
	return 'onClick="if (this.innerHTML == \'+\'){this.parentNode.nextSibling.style.display = \'block\';this.innerHTML = \'&minus;\';}else{this.parentNode.nextSibling.style.display = \'none\';this.innerHTML = \'+\';}"';
}

function selectBoxBuilder(ID, width, style, values, names, mouseoverhead, mouseover) {
	var text = '<select '+createMouseover(mouseoverhead, mouseover)+' class="gcta_options_input_text" name="'+ID+'" style="width:'+width+'px;'+style+'">';
	for (i=0; i<values.length; i++) {
		text += '<option value="'+values[i]+'"';
		if (gcta[ID] == values[i]) {text += ' selected="selected"';}
		text += '>'+names[i]+'</option>';
	}
	return text+'</select>';
}

function comboBoxBuilder(ID, width, style, data, mouseoverhead, mouseover) {
	var text = '', i, j;
	text += '<select '+createMouseover(mouseoverhead, mouseover)+' onchange="document.getElementsByName(\''+ID+'\')[0].value = this.value;" style="width: '+width+'px;'+style+'"><optgroup label="Currently In Use"><option value="'+gcta[ID]+'">'+gcta[ID]+'</option></optgroup>';
	for (i=0; i<data.length; i++) {
		text += '<optgroup label="'+data[i][0]+'">';
		for (j=0; j<data[i][1].length; j++) {
			text += '<option value="'+data[i][2][j]+'">'+data[i][1][j]+' ['+data[i][2][j]+']</option>';
		}
		text += '</optgroup>';
	}
	text += '</select><input '+createMouseover(mouseoverhead, mouseover)+' type="text" style="width: '+(width-19)+'px; margin-left: -'+(width-1)+'px;" class="gcta_options_combobox_input" name="'+ID+'" value="'+gcta[ID]+'"/>';
	return text;
}

function addSliderNode() {
	var node = doc2.createElement('script');

	// CARPE Slider 1.5.1, by Tom Hermansson Snickars (heavily modified) (http://carpe.ambiprospect.com/slider/)
	node.innerHTML = 'var carpemouseover=false;var carpeDefaultSliderLength=100;var carpeSliderDefaultOrientation="horizontal";var carpeSliderClassName="carpe_slider";var carpeSliderDisplayClassName="carpe_slider_display";var carpesliders=[];var carpedisplays=[];var carpeslider={};var carpedisplay={};function carpeAddLoadEvent(func){var oldonload=window.onload;if(typeof window.onload!="function")window.onload=func;else window.onload=function(){oldonload();func()}} function carpeLeft(elmnt,pos){if(!(elmnt=document.getElementById(elmnt)))return 0;if(elmnt.style&&typeof elmnt.style.left=="string")if(typeof pos=="number")elmnt.style.left=pos+"px";else{pos=parseInt(elmnt.style.left,10);if(isNaN(pos))pos=0}else if(elmnt.style&&elmnt.style.pixelLeft)if(typeof pos=="number")elmnt.style.pixelLeft=pos;else pos=elmnt.style.pixelLeft;return pos} function carpeTop(elmnt,pos){if(!(elmnt=document.getElementById(elmnt)))return 0;if(elmnt.style&&typeof elmnt.style.top=="string")if(typeof pos=="number")elmnt.style.top=pos+"px";else{pos=parseInt(elmnt.style.top,10);if(isNaN(pos))pos=0}else if(elmnt.style&&elmnt.style.pixelTop)if(typeof pos=="number")elmnt.style.pixelTop=pos;else pos=elmnt.style.pixelTop;return pos} function moveSlider(evnt){evnt=!evnt?window.event:evnt;if(carpemouseover){carpeslider.x=carpeslider.startOffsetX+evnt.screenX;carpeslider.y=carpeslider.startOffsetY+evnt.screenY;if(carpeslider.x>carpeslider.xMax)carpeslider.x=carpeslider.xMax;if(carpeslider.x<0)carpeslider.x=0;if(carpeslider.y>carpeslider.yMax)carpeslider.y=carpeslider.yMax;if(carpeslider.y<0)carpeslider.y=0;carpeLeft(carpeslider.id,carpeslider.x);carpeTop(carpeslider.id,carpeslider.y);var sliderVal=carpeslider.x+carpeslider.y;var sliderPos= carpeslider.distance/carpedisplay.valuecount*Math.round(carpedisplay.valuecount*sliderVal/carpeslider.distance);var v=Math.round((sliderPos*carpeslider.scale+carpeslider.from)*Math.pow(10,carpedisplay.decimals))/Math.pow(10,carpedisplay.decimals);carpedisplay.value=v;document.getElementById(carpedisplay.id).value=v;return false}return} function sliderMouseUp(starting){if(carpemouseover){var v=carpedisplay.value?carpedisplay.value:0;var pos=(v-carpeslider.from)/carpeslider.scale;if(carpeslider.yMax===0){pos=pos>carpeslider.xMax?carpeslider.xMax:pos;pos=pos<0?0:pos;carpeLeft(carpeslider.id,pos)}if(carpeslider.xMax===0){pos=pos>carpeslider.yMax?carpeslider.yMax:pos;pos=pos<0?0:pos;carpeTop(carpeslider.id,pos)}if(starting);else if(document.removeEventListener){document.removeEventListener("mousemove",moveSlider,false);document.removeEventListener("mouseup", sliderMouseUp,false)}else if(document.detachEvent){document.detachEvent("onmousemove",moveSlider);document.detachEvent("onmouseup",sliderMouseUp);document.releaseCapture()}}carpemouseover=false} function slide(evnt,startingElem){if(evnt=="starting")carpeslider=startingElem;else{if(!evnt)evnt=window.event;carpeslider=evnt.target?evnt.target:evnt.srcElement}var dist=parseInt(carpeslider.getAttribute("distance"),10);carpeslider.distance=dist?dist:carpeDefaultSliderLength;var ori=carpeslider.getAttribute("orientation");var orientation=ori=="horizontal"||ori=="vertical"?ori:carpeSliderDefaultOrientation;var displayId=carpeslider.getAttribute("display");carpedisplay=document.getElementById(displayId); carpedisplay.sliderId=carpeslider.id;var dec=parseInt(carpedisplay.getAttribute("decimals"),10);carpedisplay.decimals=dec?dec:0;var val=parseInt(carpedisplay.getAttribute("valuecount"),10);carpedisplay.valuecount=val?val:carpeslider.distance+1;var from=parseFloat(carpedisplay.getAttribute("from"));from=from?from:0;var to=parseFloat(carpedisplay.getAttribute("to"));to=to?to:carpeslider.distance;carpeslider.scale=(to-from)/carpeslider.distance;if(orientation=="vertical"){carpeslider.from=to;carpeslider.xMax= 0;carpeslider.yMax=carpeslider.distance;carpeslider.scale=-carpeslider.scale}else{carpeslider.from=from;carpeslider.xMax=carpeslider.distance;carpeslider.yMax=0}carpeslider.startOffsetX=carpeLeft(carpeslider.id)-evnt.screenX;carpeslider.startOffsetY=carpeTop(carpeslider.id)-evnt.screenY;carpemouseover=true;if(evnt=="starting");else{document.onmousemove=moveSlider;document.onmouseup=sliderMouseUp}return false} function focusDisplay(evnt){if(!evnt)evnt=window.event;var carpedisplay=evnt.target?evnt.target:evnt.srcElement;var lock=carpedisplay.getAttribute("typelock");if(lock=="on")carpedisplay.blur();return} function carpeInit(){carpesliders=document.getElementsByClassName(carpeSliderClassName);for(var i=0;i<carpesliders.length;i++)carpesliders[i].onmousedown=slide;carpedisplays=document.getElementsByClassName(carpeSliderDisplayClassName);for(i=0;i<carpedisplays.length;i++){carpedisplays[i].value=carpedisplays[i].defaultValue;carpedisplays[i].onfocus=focusDisplay}for(var i=0;i<carpesliders.length;i++){slide("starting",carpesliders[i]);sliderMouseUp(true)}};';
	node.type = 'text/javascript';

	head.appendChild(node);
}

function addHelpTextNode() {
	var node = doc2.createElement('script');
	gcta_help_text = "<b><u>Help Text Box</u></b><br>Mouseover an option to get more information on it.";
	
	node.innerHTML = 'var gcta_help_text = "'+gcta_help_text+'"; function returnHelpTextToNormal() {document.getElementById("gcta_options_help").innerHTML = gcta_help_text} function setHelpText(text) {document.getElementById("gcta_options_help").innerHTML = text} function setHelpHeader(text) {return "<b><u>"+text+"</u></b><br>"}';
	node.type = 'text/javascript';

	head.appendChild(node);
}

function initSliders() {
	var sliderNode = doc2.createElement('script');
	sliderNode.innerHTML = 'carpeInit();';
	sliderNode.type = 'text/javascript';
	
	doc2.body.appendChild(sliderNode);
	doc2.body.removeChild(sliderNode);
}

// Main function
function deploy() {
	// Gets head element
	head = doc2.getElementsByTagName('head')[0] || doc2.documentElement;
	
	createIncludedOnceCSS();
	createCSS();
	
	// Adds some helpful code
	addSliderNode();
	addHelpTextNode();
	
	barLink = doc2.createElement('nobr');
	barLink.style.padding = '0px 0px 0px 5px';
	
	barLink.innerHTML = '<a href="#" id="gcta_showHideBar" class="gb1 qq">GCTA</a>';
	
	barLink = doc2.getElementById('gbar').appendChild(barLink);
	
	bar = doc2.createElement('div');
	bar.id = 'gctaToolbar';
	bar.className = 'nH qp';
	bar.style.marginTop = '-2px';
	bar.style.display = 'none';
	
	// Add custom bar node
	bar = doc2.getElementById('gbar').parentNode.parentNode.appendChild(bar);
	
	options = doc2.createElement('div');
	options.id = 'gcta_options_div_outer';
	options.style.display = 'none';
	
	options = doc2.getElementsByClassName('cP')[0].appendChild(options);
	
	// Create actual menu
	var menu = doc2.createElement('div');
	
	menu.style.paddingLeft = '8px';
	menu.style.paddingRight = '8px';
	menu.style.paddingTop = '4px';
	menu.style.height = '20px';
	menu.style.cssFloat = 'left';
	menu.style.fontSize = '13px';
	
	menu.innerHTML = '';
	
	// Create Disable/Enable GCTA link
	if (toggleStatus == 'on') {menu.innerHTML += '<a href="#" id="gcta_disableStyle" class="gb1 qq">Disable GCTA</a> ';}
	else {menu.innerHTML += '<a href="#" id="gcta_enableStyle" class="gb1 qq">Enable GCTA</a> ';}
	
	// Create Save/Override Style link
	if (styleSheet == '') {menu.innerHTML += '<a href="#" id="gcta_saveStyle" class="gb1 qq">Save Style</a> ';}
	else {menu.innerHTML += '<a href="#" id="gcta_saveStyle" class="gb1 qq">Overwrite Style</a> ';}
	
	// Create Delete Style link
	if (styleSheet != '') {menu.innerHTML += '<a href="#" id="gcta_deleteStyle" class="gb1 qq">Delete Style</a> ';}

	// Create Options link
	menu.innerHTML += '<a href="#" id="gcta_options" class="gb1 qq">Options</a> ';
	
	// Add custom menu node
	menu = bar.appendChild(menu);
	var menuSep1 = doc2.createElement('div');
	menuSep1.className = 'gbh';
	menuSep1.style.left = '0';
	bar.appendChild(menuSep1);
	var menuSep2 = doc2.createElement('div');
	menuSep2.className = 'gbh';
	menuSep2.style.right = '0';
	bar.appendChild(menuSep2);
	var menuRight = doc2.createElement('div');
	menuRight.innerHTML = '<div class="a8" id="guser2"><nobr><b>GCTA '+current_version+'</b> | <a href="#" id="gcta_checkupdate" class="gb1 qq" style="margin-right:0;">Check For Update</a></nobr></div>';
	bar.appendChild(menuRight);
	var menuSep3 = doc2.createElement('div');
	menuSep3.className = 'aL';
	menuSep3.style.clear = 'both';
	bar.appendChild(menuSep3);
	
	// Add tint div
	var tintDiv = doc2.createElement('div');
	tintDiv.id = 'tintDiv';
	doc2.getElementsByClassName('cP')[0].appendChild(tintDiv);
	
	// Handle Disable/Enable link
	if (toggleStatus == 'on') {
		// Handle Disable link
		doc2.getElementById('gcta_disableStyle').addEventListener("click", disableScript, true);
	}
	else {
		// Handle Enable link
		doc2.getElementById('gcta_enableStyle').addEventListener("click", enableScript, true);
	}
	
	// Handle Update link
	doc2.getElementById('gcta_checkupdate').addEventListener("click", CheckVersion, true);
	
	// Handle Options link
	doc2.getElementById('gcta_options').addEventListener("click", showOptions, true);
	
	// Handle GCTA Bar Show/Hide Bar link
	doc2.getElementById('gcta_showHideBar').addEventListener("click", showHideBar, true);
	
	// Handle Save/Override Style link
	doc2.getElementById('gcta_saveStyle').addEventListener("click", saveStyle, true);
	
	// Handle Delete Style link
	if (styleSheet != '') {doc2.getElementById('gcta_deleteStyle').addEventListener("click", deleteStyle, true);}
	
	// Check if Tasks link is clicked...
	doc2.getElementById(':rd').addEventListener("click", waitForTasks, true);
	
	if (toggleStatus == 'on') {
		// Begin Adding Nodes...
		// Insert CSS to be included that doesn't need to be dynamically updated
		node7 = doc2.createElement("style");
		node7.type = "text/css";
		node7.appendChild(doc2.createTextNode(cssToIncludeOnce));
		nodeCSSIncludedOnce = head.appendChild(node7);
		
		// Override current Gmail style (forcefully kill certain items)
		node5 = doc2.createElement("style");
		node5.type = "text/css";
		node5.appendChild(doc2.createTextNode(cssToKillOtherThemes));
		nodeKilled = head.appendChild(node5);
		
		// Override current Gmail style
		node2 = doc2.createElement("style");
		node2.type = "text/css";
		node2.appendChild(doc2.createTextNode(styleSheet));
		nodeOverride = head.appendChild(node2);
		
		// Rest of the settings...
		node1 = doc2.createElement("style");
		node1.type = "text/css";
		node1.appendChild(doc2.createTextNode(css));
		nodeRegular = head.appendChild(node1);
		
		// Used to apply stylesheet rules to chat tasks boxes
		node3 = documentOut.createElement("style");
		node3.type = "text/css";
		node3.appendChild(documentOut.createTextNode(styleSheet));
		nodeChatTasksStyle = documentOut.getElementById('canvas_frame').parentNode.parentNode.firstChild.appendChild(node3);
		
		// Used to apply stylesheet rules to chat tasks boxes
		node6 = documentOut.createElement("style");
		node6.type = "text/css";
		node6.appendChild(documentOut.createTextNode(cssForChatAndTasks));
		nodeChatTasksOverride = documentOut.getElementById('canvas_frame').parentNode.parentNode.firstChild.appendChild(node6);
		
		// If tasks shows up automatically, style it.
		waitForTasks(1);
	}
}

function showHideBar() {
	if (bar.style.display == 'block') {
		bar.style.display = 'none';
	} else {
		bar.style.display = 'block';
	}
}

function showOptions() {
	if (options.style.display == 'none') {
		options.style.display = 'block';
	}
	buildOptions();
}

function hideOptions() {
	if (options.style.display == 'block') {
		options.style.display = 'none';
	}
}

function minimizeOptions() {
	if (options.style.height == '24px') {
		options.style.height = '400px';
	} else {
		options.style.height = '24px';
	}
}

function testOptions() {
	setOptions(true);
	deleteTestOptions();
}

function resetOptions() {
	setOptions(undefined, true);
	deleteTestOptions();
}

function resetFullOptions() {
	gctaVarMake();
	deleteAllOptions();
	setOptions(undefined, true);
}

function saveCloseOptions () {
	saveOptions();
	hideOptions();
}

function saveOptions() {
	setOptions();
	buildOptions();
}

function setOptions(testOptions, resetOptions) {
	if (resetOptions !== true) {
		var options_form = doc2.forms.namedItem("gcta_options_form");
		var stringHolder = '';
		var stringHolder2 = '';
		if (testOptions !== undefined) { var stringHolder2 = '_test'; }
		for (x in gcta) {
			stringHolder = 'gcta_'+emailAddress+'.'+x+stringHolder2;
			GM_setValue(stringHolder, options_form.elements.namedItem(x).value);
		}
	}
	if (testOptions !== undefined) { initialVars(true); }
	else { initialVars(); }
	createCSS();
	updateNodes();
	buildOptions();
}

function deleteTestOptions() {
	for (x in gcta) {
		stringHolder = 'gcta_'+emailAddress+'.'+x+'_test';
		GM_deleteValue(stringHolder);
	}
}

function deleteAllOptions() {
	var stringHolder;
	for (x in gcta) {
		stringHolder = 'gcta_'+emailAddress+'.'+x;
		GM_deleteValue(stringHolder);
		stringHolder += '_test';
		GM_deleteValue(stringHolder);
	}
}

function updateNodes() {
	nodeKilled.removeChild(nodeKilled.firstChild);
	nodeKilled.appendChild(doc2.createTextNode(cssToKillOtherThemes));
	nodeOverride.removeChild(nodeOverride.firstChild);
	nodeOverride.appendChild(doc2.createTextNode(styleSheet));
	nodeRegular.removeChild(nodeRegular.firstChild);
	nodeRegular.appendChild(doc2.createTextNode(css));
	nodeChatTasksOverride.removeChild(nodeChatTasksOverride.firstChild);
	nodeChatTasksOverride.appendChild(doc2.createTextNode(cssForChatAndTasks));
}

// The functions waitForIframe and waitForTasks are modified versions of functions from 1nfected's script, "Pimp.my.Gmail" (http://userscripts.org/scripts/review/75047)
function waitForIframe() {
	if (tries > 15) {
		GM_log('Canvas frame not found, proceeding with styling...');
		/*
		var i = document.createElement('p');
		i.innerHTML = 'hello';

		document.getElementsByTagName('body')[0].insertBefore(i, document.getElementsByTagName('body')[0].firstChild);
		i.addEventListener("click", deploy, true);
		*/
		waitProceed();
	}
	else {
		if (mainCanvas.contentDocument.getElementsByClassName('cP')[0]) {
			GM_log('Found canvas frame');
			window.setTimeout(waitProceed, 500);
		} else {
			tries++;
			
			if (tries == 1) {window.setTimeout(waitForIframe, 2500);}
			else {window.setTimeout(waitForIframe, 500);}
		}
	}
}

function waitProceed() {
	// Main window document is made into documentOut
	documentOut = document;
	
	// Canvas frame is made into the real document
	document = mainCanvas.contentDocument;
	doc2 = mainCanvas.contentDocument;
	
	window.setTimeout(deploy, 500);;
}

function waitForTasks(taskTries) {
	if(taskTries > 10) {
		GM_log('Tasks not found, proceeding with styling...');
		styleTasks();
	}
	else {
		if (documentOut.getElementById('tasksiframe') && documentOut.getElementById('tasksiframe').contentDocument.getElementById(':rt.ab')) {
			GM_log('Found tasks frame');
			styleTasks();
		} else {
			window.setTimeout(waitForTasks, 2000, ++taskTries);
		}
	}
}

// Applies custom stylesheet to the Tasks panel
function styleTasks() {
	node4 = documentOut.createElement("style");
	node4.type = "text/css";
	node4.appendChild(documentOut.createTextNode(styleSheet));
	documentOut.getElementById('tasksiframe').contentDocument.getElementsByTagName("head")[0].appendChild(node4);
}

// ============================================================================== \\
// ========================== Weekly Auto-Update Check ========================== \\
// ============================================================================== \\
// CheckForUpdate() will verify if it's time to look if an update is available.   \\
// CheckVersion() will verify if this script version is the latest available.     \\
// ============================================================================== \\

var script_title = "Gmail Custom Theme Advanced";

var source_location = "";

var latest_version = " ";
var gm_updateparam = "gcta_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google Document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "https://docs.google.com/document/pub?id=14Sly3v3NPHnCClNE4JfySNeche35T8ulHIvdLg0dCoA";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("GCTA -> Force Update", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() {
        var today = new Date();
        GM_setValue(gm_updateparam, String(today));
        window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate()
{	
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
		CheckVersion();
}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = getTextBetween(responseDetails.responseText, 'gcta_version~~~', '</');				
				
				if(line !== null)
				{
					latest_version = line;
					source_location = getTextBetween(responseDetails.responseText, 'gcta_url~~~', '</');
					var change = getTextBetween(responseDetails.responseText, 'gcta_change~~~', '</').replace(/~NEWLINE~/g, "\n");
					
					if(current_version != latest_version && latest_version != "undefined")
					{
						if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\n\nChanges:\n"+change+"\n\nWould you like to get it now?"))
							GetNewVersion();
						else
							AskForReminder();
					} 
					else if(current_version == latest_version)
						alert("You have the latest version of " + script_title + ".");
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
					SkipWeeklyUpdateCheck();
				}
					
		    }
	});
}

function getTextBetween(strToParse, strStart, strFinish) {
	var str = strToParse.match(strStart + "(.*?)" + strFinish);
	 
	if (str != null) {
		return str[1];
	} else {
		return null;
	}
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)")) {
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms);

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	} else {
		SkipWeeklyUpdateCheck();
	}
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}
//=============================================================================== \\
// ========================== Weekly Auto-Update Check ========================== \\
//=============================================================================== \\

// Checks to see if this iss the correct frame

/*
if (document.childNodes.item(1).firstChild.childNodes.item(6).name == 'application-name') {
	mainCanvas = document.getElementById('canvas_frame');
	var tries = 0;
	waitForIframe();
}
*/

if (document.getElementById('canvas_frame') !== null) {
	mainCanvas = document.getElementById('canvas_frame');
	tries = 0;
	waitForIframe();
}
	
/**
 * jscolor, JavaScript Color Picker
 *
 * @version 1.3.0
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  Jan Odv?rko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2009-10-16
 * @link    http://jscolor.com
 */

var jscolor = {


	dir : '', // location of jscolor directory (leave empty to autodetect)
	bindClass : 'color', // class name
	binding : true, // automatic binding via <input class="...">
	preloading : true, // use image preloading?


	install : function() {
		jscolor.addEvent(window, 'load', jscolor.init);
	},


	init : function() {
		if(jscolor.binding) {
			jscolor.bind();
		}
		if(jscolor.preloading) {
			jscolor.preload();
		}
	},


	getDir : function() {
		return jscolor.dir;
	},


	bind : function() {
		var matchClass = new RegExp('(^|\\s)('+jscolor.bindClass+')\\s*(\\{[^}]*\\})?', 'i');
		var e = doc2.getElementsByTagName('input');
		for(var i=0; i<e.length; i+=1) {
			var m;
			if(!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
				var prop = {};
				if(m[3]) {
					try {
						eval('prop='+m[3]);
					} catch(eInvalidProp) {}
				}
				e[i].color = new jscolor.color(e[i], prop);
			}
		}
		
	},


	preload : function() {
		for(var fn in jscolor.imgRequire) {
			if(jscolor.imgRequire.hasOwnProperty(fn)) {
				jscolor.loadImage(fn);
			}
		}
	},


	images : {
		pad : [ 181, 101 ],
		sld : [ 16, 101 ],
		cross : [ 15, 15 ],
		arrow : [ 7, 11 ]
	},


	imgRequire : {},
	imgLoaded : {},


	requireImage : function(filename) {
		jscolor.imgRequire[filename] = true;
	},


	loadImage : function(filename) {
		if(!jscolor.imgLoaded[filename]) {
			jscolor.imgLoaded[filename] = new Image();
			jscolor.imgLoaded[filename].src = jscolor.getDir()+filename;
		}
	},


	fetchElement : function(mixed) {
		return typeof mixed === 'string' ? doc2.getElementById(mixed) : mixed;
	},


	addEvent : function(el, evnt, func) {
		if(el.addEventListener) {
			el.addEventListener(evnt, func, false);
		} else if(el.attachEvent) {
			el.attachEvent('on'+evnt, func);
		}
	},


	fireEvent : function(el, evnt) {
		if(!el) {
			return;
		}
		if(doc2.createEventObject) {
			var ev = doc2.createEventObject();
			el.fireEvent('on'+evnt, ev);
		} else if(doc2.createEvent) {
			var ev = doc2.createEvent('HTMLEvents');
			ev.initEvent(evnt, true, true);
			el.dispatchEvent(ev);
		} else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
			el['on'+evnt]();
		}
	},


	getElementPos : function(e) {
		var e1=e, e2=e;
		var x=0, y=0;
		if(e1.offsetParent) {
			do {
				x += e1.offsetLeft;
				y += e1.offsetTop;
			} while(e1 = e1.offsetParent);
		}
		while((e2 = e2.parentNode) && e2.nodeName !== 'BODY') {
			x -= e2.scrollLeft;
			y -= e2.scrollTop;
		}
		return [x, y];
	},


	getElementSize : function(e) {
		return [e.offsetWidth, e.offsetHeight];
	},


	getMousePos : function(e) {
		if(!e) { e = window.event; }
		if(typeof e.pageX === 'number') {
			return [e.pageX, e.pageY];
		} else if(typeof e.clientX === 'number') {
			return [
				e.clientX + doc2.body.scrollLeft + doc2.documentElement.scrollLeft,
				e.clientY + doc2.body.scrollTop + doc2.documentElement.scrollTop
			];
		}
	},


	getViewPos : function() {
		if(typeof window.pageYOffset === 'number') {
			return [window.pageXOffset, window.pageYOffset];
		} else if(doc2.body && (doc2.body.scrollLeft || doc2.body.scrollTop)) {
			return [doc2.body.scrollLeft, doc2.body.scrollTop];
		} else if(doc2.documentElement && (doc2.documentElement.scrollLeft || doc2.documentElement.scrollTop)) {
			return [doc2.documentElement.scrollLeft, doc2.documentElement.scrollTop];
		} else {
			return [0, 0];
		}
	},


	getViewSize : function() {
		if(typeof window.innerWidth === 'number') {
			return [window.innerWidth, window.innerHeight];
		} else if(doc2.body && (doc2.body.clientWidth || doc2.body.clientHeight)) {
			return [doc2.body.clientWidth, doc2.body.clientHeight];
		} else if(doc2.documentElement && (doc2.documentElement.clientWidth || doc2.documentElement.clientHeight)) {
			return [doc2.documentElement.clientWidth, doc2.documentElement.clientHeight];
		} else {
			return [0, 0];
		}
	},


	URI : function(uri) { // See RFC3986

		this.scheme = null;
		this.authority = null;
		this.path = '';
		this.query = null;
		this.fragment = null;

		this.parse = function(uri) {
			var m = uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
			this.scheme = m[3] ? m[2] : null;
			this.authority = m[5] ? m[6] : null;
			this.path = m[7];
			this.query = m[9] ? m[10] : null;
			this.fragment = m[12] ? m[13] : null;
			return this;
		};

		this.toString = function() {
			var result = '';
			if(this.scheme !== null) { result = result + this.scheme + ':'; }
			if(this.authority !== null) { result = result + '//' + this.authority; }
			if(this.path !== null) { result = result + this.path; }
			if(this.query !== null) { result = result + '?' + this.query; }
			if(this.fragment !== null) { result = result + '#' + this.fragment; }
			return result;
		};

		this.toAbsolute = function(base) {
			var base = new jscolor.URI(base);
			var r = this;
			var t = new jscolor.URI;

			if(base.scheme === null) { return false; }

			if(r.scheme !== null && r.scheme.toLowerCase() === base.scheme.toLowerCase()) {
				r.scheme = null;
			}

			if(r.scheme !== null) {
				t.scheme = r.scheme;
				t.authority = r.authority;
				t.path = removeDotSegments(r.path);
				t.query = r.query;
			} else {
				if(r.authority !== null) {
					t.authority = r.authority;
					t.path = removeDotSegments(r.path);
					t.query = r.query;
				} else {
					if(r.path === '') { // TODO: == or === ?
						t.path = base.path;
						if(r.query !== null) {
							t.query = r.query;
						} else {
							t.query = base.query;
						}
					} else {
						if(r.path.substr(0,1) === '/') {
							t.path = removeDotSegments(r.path);
						} else {
							if(base.authority !== null && base.path === '') { // TODO: == or === ?
								t.path = '/'+r.path;
							} else {
								t.path = base.path.replace(/[^\/]+$/,'')+r.path;
							}
							t.path = removeDotSegments(t.path);
						}
						t.query = r.query;
					}
					t.authority = base.authority;
				}
				t.scheme = base.scheme;
			}
			t.fragment = r.fragment;

			return t;
		};

		function removeDotSegments(path) {
			var out = '';
			while(path) {
				if(path.substr(0,3)==='../' || path.substr(0,2)==='./') {
					path = path.replace(/^\.+/,'').substr(1);
				} else if(path.substr(0,3)==='/./' || path==='/.') {
					path = '/'+path.substr(3);
				} else if(path.substr(0,4)==='/../' || path==='/..') {
					path = '/'+path.substr(4);
					out = out.replace(/\/?[^\/]*$/, '');
				} else if(path==='.' || path==='..') {
					path = '';
				} else {
					var rm = path.match(/^\/?[^\/]*/)[0];
					path = path.substr(rm.length);
					out = out + rm;
				}
			}
			return out;
		}

		if(uri) {
			this.parse(uri);
		}

	},


	/*
	 * Usage example:
	 * var myColor = new jscolor.color(myInputElement)
	 */

	color : function(target, prop) {


		this.required = true; // refuse empty values?
		this.adjust = true; // adjust value to uniform notation?
		this.hash = false; // prefix color with # symbol?
		this.caps = true; // uppercase?
		this.valueElement = target; // value holder
		this.styleElement = target; // where to reflect current color
		this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
		this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1

		this.pickerOnfocus = true; // display picker on focus?
		this.pickerMode = 'HSV'; // HSV | HVS
		this.pickerPosition = 'bottom'; // left | right | top | bottom
		this.pickerFace = 10; // px
		this.pickerFaceColor = 'ThreeDFace'; // CSS color
		this.pickerBorder = 1; // px
		this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color
		this.pickerInset = 1; // px
		this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
		this.pickerZIndex = 10000;


		for(var p in prop) {
			if(prop.hasOwnProperty(p)) {
				this[p] = prop[p];
			}
		}


		this.hidePicker = function() {
			if(isPickerOwner()) {
				removePicker();
			}
		};


		this.showPicker = function() {
			if(!isPickerOwner()) {
				var tp = jscolor.getElementPos(target); // target pos
				var ts = jscolor.getElementSize(target); // target size
				var vp = jscolor.getViewPos(); // view pos
				var vs = jscolor.getViewSize(); // view size
				var ps = [ // picker size
					2*this.pickerBorder + 4*this.pickerInset + 2*this.pickerFace + jscolor.images.pad[0] + 2*jscolor.images.arrow[0] + jscolor.images.sld[0],
					2*this.pickerBorder + 2*this.pickerInset + 2*this.pickerFace + jscolor.images.pad[1]
				];
				var a, b, c;
				switch(this.pickerPosition.toLowerCase()) {
					case 'left': a=1; b=0; c=-1; break;
					case 'right':a=1; b=0; c=1; break;
					case 'top':  a=0; b=1; c=-1; break;
					default:     a=0; b=1; c=1; break;
				}
				var l = (ts[b]+ps[b])/2;
				var pp = [ // picker pos
					-vp[a]+tp[a]+ps[a] > vs[a] ?
						(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
						tp[a],
					-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
						(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
						(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
				];
				drawPicker(pp[a], pp[b]);
			}
		};


		this.importColor = function() {
			if(!valueElement) {
				this.exportColor();
			} else {
				if(!this.adjust) {
					if(!this.fromString(valueElement.value, leaveValue)) {
						styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
						styleElement.style.color = styleElement.jscStyle.color;
						this.exportColor(leaveValue | leaveStyle);
					}
				} else if(!this.required && /^\s*$/.test(valueElement.value)) {
					valueElement.value = '';
					styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
					styleElement.style.color = styleElement.jscStyle.color;
					this.exportColor(leaveValue | leaveStyle);

				} else if(this.fromString(valueElement.value)) {
					// OK
				} else {
					this.exportColor();
				}
			}
		};


		this.exportColor = function(flags) {
			if(!(flags & leaveValue) && valueElement) {
				var value = this.toString();
				if(this.caps) { value = value.toUpperCase(); }
				if(this.hash) { value = '#'+value; }
				valueElement.value = value;
			}
			if(!(flags & leaveStyle) && styleElement) {
				styleElement.style.backgroundColor =
					'#'+this.toString();
				styleElement.style.color =
					0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? '#FFF' : '#000';
			}
			if(!(flags & leavePad) && isPickerOwner()) {
				redrawPad();
			}
			if(!(flags & leaveSld) && isPickerOwner()) {
				redrawSld();
			}
		};


		this.fromHSV = function(h, s, v, flags) { // null = don't change
			h<0 && (h=0) || h>6 && (h=6);
			s<0 && (s=0) || s>1 && (s=1);
			v<0 && (v=0) || v>1 && (v=1);
			this.rgb = HSV_RGB(
				h===null ? this.hsv[0] : (this.hsv[0]=h),
				s===null ? this.hsv[1] : (this.hsv[1]=s),
				v===null ? this.hsv[2] : (this.hsv[2]=v)
			);
			this.exportColor(flags);
		};


		this.fromRGB = function(r, g, b, flags) { // null = don't change
			r<0 && (r=0) || r>1 && (r=1);
			g<0 && (g=0) || g>1 && (g=1);
			b<0 && (b=0) || b>1 && (b=1);
			var hsv = RGB_HSV(
				r===null ? this.rgb[0] : (this.rgb[0]=r),
				g===null ? this.rgb[1] : (this.rgb[1]=g),
				b===null ? this.rgb[2] : (this.rgb[2]=b)
			);
			if(hsv[0] !== null) {
				this.hsv[0] = hsv[0];
			}
			if(hsv[2] !== 0) {
				this.hsv[1] = hsv[1];
			}
			this.hsv[2] = hsv[2];
			this.exportColor(flags);
		};


		this.fromString = function(hex, flags) {
			var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
			if(!m) {
				return false;
			} else {
				if(m[1].length === 6) { // 6-char notation
					this.fromRGB(
						parseInt(m[1].substr(0,2),16) / 255,
						parseInt(m[1].substr(2,2),16) / 255,
						parseInt(m[1].substr(4,2),16) / 255,
						flags
					);
				} else { // 3-char notation
					this.fromRGB(
						parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
						parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
						parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
						flags
					);
				}
				return true;
			}
		};


		this.toString = function() {
			return (
				(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
			);
		};


		function RGB_HSV(r, g, b) {
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if(m === 0) { return [ null, 0, v ]; }
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h, s, v) {
			if(h === null) { return [ v, v, v ]; }
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0: return [v,n,m];
				case 1: return [n,v,m];
				case 2: return [m,v,n];
				case 3: return [m,n,v];
				case 4: return [n,m,v];
				case 5: return [v,m,n];
			}
		}


		function removePicker() {
			delete jscolor.picker.owner;
			jscolor.picker.boxB.parentNode.removeChild(jscolor.picker.boxB);
			delete jscolor.picker;
		}


		function drawPicker(x, y) {
			if(!jscolor.picker) {
				jscolor.picker = {
					box : doc2.createElement('div'),
					boxB : doc2.createElement('div'),
					pad : doc2.createElement('div'),
					padB : doc2.createElement('div'),
					padM : doc2.createElement('div'),
					sld : doc2.createElement('div'),
					sldB : doc2.createElement('div'),
					sldM : doc2.createElement('div')
				};
				for(var i=0,segSize=4; i<jscolor.images.sld[1]; i+=segSize) {
					var seg = doc2.createElement('div');
					seg.style.height = segSize+'px';
					seg.style.fontSize = '1px';
					seg.style.lineHeight = '0';
					jscolor.picker.sld.appendChild(seg);
				}
				jscolor.picker.sldB.appendChild(jscolor.picker.sld);
				jscolor.picker.box.appendChild(jscolor.picker.sldB);
				jscolor.picker.box.appendChild(jscolor.picker.sldM);
				jscolor.picker.padB.appendChild(jscolor.picker.pad);
				jscolor.picker.box.appendChild(jscolor.picker.padB);
				jscolor.picker.box.appendChild(jscolor.picker.padM);
				jscolor.picker.boxB.appendChild(jscolor.picker.box);
				jscolor.picker.boxB.setAttribute('id', 'divcolorpicker');
			}

			var p = jscolor.picker;

			// recompute controls positions
			posPad = [
				x+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset,
				y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];
			posSld = [
				null,
				y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];

			// controls interaction
			p.box.addEventListener('mouseup', function() { target.focus(); }, false);
			p.box.addEventListener('mouseout', function() { target.focus(); }, false);
			p.box.addEventListener('mousedown', function() { abortBlur=true; }, false);
			p.box.addEventListener('mousemove', function(e) { holdPad && setPad(e); holdSld && setSld(e); }, false);
			p.padM.addEventListener('mouseup', function() { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } }, false);
			p.padM.addEventListener('mouseout', function() { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } }, false);
			p.padM.addEventListener('mousedown', function(e) { holdPad=true; setPad(e); }, false);
			p.sldM.addEventListener('mouseup', function() { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } }, false);
			p.sldM.addEventListener('mouseout', function() { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } }, false);
			p.sldM.addEventListener('mousedown', function(e) { holdSld=true; setSld(e); }, false);

			// picker
			p.box.style.width = 4*THIS.pickerInset + 2*THIS.pickerFace + jscolor.images.pad[0] + 2*jscolor.images.arrow[0] + jscolor.images.sld[0] + 'px';
			p.box.style.height = 2*THIS.pickerInset + 2*THIS.pickerFace + jscolor.images.pad[1] + 'px';

			// picker border
			p.boxB.style.position = 'absolute';
			p.boxB.style.clear = 'both';
			p.boxB.style.left = x+'px';
			p.boxB.style.top = y+'px';
			p.boxB.style.zIndex = THIS.pickerZIndex;
			p.boxB.style.border = THIS.pickerBorder+'px solid';
			p.boxB.style.borderColor = THIS.pickerBorderColor;
			p.boxB.style.background = THIS.pickerFaceColor;

			// pad image
			p.pad.style.width = jscolor.images.pad[0]+'px';
			p.pad.style.height = jscolor.images.pad[1]+'px';

			// pad border
			p.padB.style.position = 'absolute';
			p.padB.style.left = THIS.pickerFace+'px';
			p.padB.style.top = THIS.pickerFace+'px';
			p.padB.style.border = THIS.pickerInset+'px solid';
			p.padB.style.borderColor = THIS.pickerInsetColor;

			// pad mouse area
			p.padM.style.position = 'absolute';
			p.padM.style.left = '0';
			p.padM.style.top = '0';
			p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
			p.padM.style.height = p.box.style.height;
			p.padM.style.cursor = 'crosshair';

			// slider image
			p.sld.style.overflow = 'hidden';
			p.sld.style.width = jscolor.images.sld[0]+'px';
			p.sld.style.height = jscolor.images.sld[1]+'px';

			// slider border
			p.sldB.style.position = 'absolute';
			p.sldB.style.right = THIS.pickerFace+'px';
			p.sldB.style.top = THIS.pickerFace+'px';
			p.sldB.style.border = THIS.pickerInset+'px solid';
			p.sldB.style.borderColor = THIS.pickerInsetColor;

			// slider mouse area
			p.sldM.style.position = 'absolute';
			p.sldM.style.right = '0';
			p.sldM.style.top = '0';
			p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
			p.sldM.style.height = p.box.style.height;
			try {
				p.sldM.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.sldM.style.cursor = 'hand';
			}

			// load images 
			switch(modeID) 
			{
				case 0: 
					var padImg ="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"; 
				break;//hs
				
				case 1: 
					var padImg = "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"; 
				break;//hv
			}
			p.padM.style.background = "url(data:image/png;base64,R0lGODlhDwAPAKEBAAAAAP///////////yH5BAEKAAIALAAAAAAPAA8AAAIklB8Qx53b4otSUWcvyiz4/4AeQJbmKY4p1HHapBlwPL/uVRsFADs=) no-repeat";
			p.sldM.style.background = "url(data:image/png;base64,R0lGODlhBwALAKECAAAAAP///6g8eKg8eCH5BAEKAAIALAAAAAAHAAsAAAITTIQYcLnsgGxvijrxqdQq6DRJAQA7) no-repeat";
			p.pad.style.background = "url(data:image/png;base64,"+padImg+") 0 0 no-repeat";

			// place pointers
			redrawPad();
			redrawSld();


			jscolor.picker.owner = THIS;
			doc2.getElementsByTagName('body')[0].appendChild(p.boxB);
		}


		function redrawPad() {
			// redraw the pad pointer
			switch(modeID) {
				case 0: var yComponent = 1; break;
				case 1: var yComponent = 2; break;
			}
			var x = Math.round((THIS.hsv[0]/6) * (jscolor.images.pad[0]-1));
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.pad[1]-1));
			jscolor.picker.padM.style.backgroundPosition =
				(THIS.pickerFace+THIS.pickerInset+x - Math.floor(jscolor.images.cross[0]/2)) + 'px ' +
				(THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.cross[1]/2)) + 'px';

			// redraw the slider image
			var seg = jscolor.picker.sld.childNodes;

			switch(modeID) {
				case 0:
					var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
					for(var i=0; i<seg.length; i+=1) {
						seg[i].style.backgroundColor = 'rgb('+
							(rgb[0]*(1-i/seg.length)*100)+'%,'+
							(rgb[1]*(1-i/seg.length)*100)+'%,'+
							(rgb[2]*(1-i/seg.length)*100)+'%)';
					}
					break;
				case 1:
					var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
					var i = Math.floor(THIS.hsv[0]);
					var f = i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
					switch(i) {
						case 6:
						case 0: rgb=[0,1,2]; break;
						case 1: rgb=[1,0,2]; break;
						case 2: rgb=[2,0,1]; break;
						case 3: rgb=[2,1,0]; break;
						case 4: rgb=[1,2,0]; break;
						case 5: rgb=[0,2,1]; break;
					}
					for(var i=0; i<seg.length; i+=1) {
						s = 1 - 1/(seg.length-1)*i;
						c[1] = c[0] * (1 - s*f);
						c[2] = c[0] * (1 - s);
						seg[i].style.backgroundColor = 'rgb('+
							(c[rgb[0]]*100)+'%,'+
							(c[rgb[1]]*100)+'%,'+
							(c[rgb[2]]*100)+'%)';
					}
					break;
			}
		}


		function redrawSld() {
			// redraw the slider pointer
			switch(modeID) {
				case 0: var yComponent = 2; break;
				case 1: var yComponent = 1; break;
			}
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.sld[1]-1));
			jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.arrow[1]/2)) + 'px';
		}


		function isPickerOwner() {
			return jscolor.picker && jscolor.picker.owner === THIS;
		}


		function blurTarget() {
			if(valueElement === target) {
				THIS.importColor();
			}
			if(THIS.pickerOnfocus) {
				THIS.hidePicker();
			}
		}


		function blurValue() {
			if(valueElement !== target) {
				THIS.importColor();
			}
		}


		function setPad(e) {
			var posM = jscolor.getMousePos(e);
			var x = posM[0]-posPad[0];
			var y = posM[1]-posPad[1];
			switch(modeID) {
				case 0: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), 1 - y/(jscolor.images.pad[1]-1), null, leaveSld); break;
				case 1: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), null, 1 - y/(jscolor.images.pad[1]-1), leaveSld); break;
			}
		}


		function setSld(e) {
			var posM = jscolor.getMousePos(e);
			var y = posM[1]-posPad[1];
			switch(modeID) {
				case 0: THIS.fromHSV(null, null, 1 - y/(jscolor.images.sld[1]-1), leavePad); break;
				case 1: THIS.fromHSV(null, 1 - y/(jscolor.images.sld[1]-1), null, leavePad); break;
			}
		}


		var THIS = this;
		var modeID = this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
		var abortBlur = false;
		var
			valueElement = jscolor.fetchElement(this.valueElement),
			styleElement = jscolor.fetchElement(this.styleElement);
		var
			holdPad = false,
			holdSld = false;
		var
			posPad,
			posSld;
		var
			leaveValue = 1<<0,
			leaveStyle = 1<<1,
			leavePad = 1<<2,
			leaveSld = 1<<3;

		// target
		jscolor.addEvent(target, 'focus', function() {
			if(THIS.pickerOnfocus) { THIS.showPicker(); }
		});
		jscolor.addEvent(target, 'blur', function() {
			if(!abortBlur) {
				window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; }, 0);
			} else {
				abortBlur = false;
			}
		});

		// valueElement
		if(valueElement) {
			var updateField = function() {
				THIS.fromString(valueElement.value, leaveValue);
			};
			jscolor.addEvent(valueElement, 'keyup', updateField);
			jscolor.addEvent(valueElement, 'input', updateField);
			jscolor.addEvent(valueElement, 'blur', blurValue);
			valueElement.setAttribute('autocomplete', 'off');
		}

		// styleElement
		if(styleElement) {
			styleElement.jscStyle = {
				backgroundColor : styleElement.style.backgroundColor,
				color : styleElement.style.color
			};
		}

		// require images
		switch(modeID) {
			case 0: jscolor.requireImage('hs.png'); break;
			case 1: jscolor.requireImage('hv.png'); break;
		}
		jscolor.requireImage('cross.gif');
		jscolor.requireImage('arrow.gif');

		this.importColor();
	}

};
