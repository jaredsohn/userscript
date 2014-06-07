// ==UserScript==
// @name        	Reddcoin Gifts
// @description		Tipping everywhere made easy!
// @include			*
// @version			1.1
// @grant			none
// ==/UserScript==



// Functions
function injectCSS ()
{
	// Inject the CSS into the page
	var iframeBackgroundImage = '';
	var css = '<style>\
		.rdd-button-container{\
			position:fixed;\
			top:50%;\
			left:0;\
			background:transparent;\
			margin:0;\
			margin-top:-160px;\
			padding:0;\
			z-index:20001;\
		}\
		.rdd-button{margin:0;padding:0;border:0;opacity:0.75;}\
		.rdd-button:hover,.rdd-button:active{cursor:pointer; text-decoration:underline;}\
		.rdd-button:active{text-shadow:-1px -1px 0px #fff;}\
		.rdd-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:#222;opacity:0.8;z-index:30001;}\
		.rdd-iframe-container{display:none;width:640px;height:480px;position:fixed;top:50%;left:50%;padding:0;margin:0;margin-left:-320px;margin-top:-240px;background:url(http://i.cubeupload.com/v7vvRq.gif) no-repeat center center #fff;border:1px solid #999;z-index:30002;opacity:1;}\
		.rdd-iframe{display:none;position:absolute;top:0;left:0;width:100%;height:100%;border:0;margin:0;z-index:30003;opacity:1;}\
	</style>';
	jQ('head').append(css);
}

function injectIframe ()
{
	// Inject the iframe and its containers into the page
	var iframeContainerHtml = '<div class="rdd-overlay">\
	</div>';
	var iframeHtml = '<div class="rdd-iframe-container">\
		<iframe src="" class="rdd-iframe"></iframe>\
	</div>';
	jQ('body').append(iframeContainerHtml).append(iframeHtml);
}

function injectButton ()
{
	// Inject the button for showing the iframe and its containers
	var buttonHtml = '<div class="rdd-button-container">\
		<a href="#" class="rdd-button"><img src="http://i.cubeupload.com/pnLQsA.png" width="41" height="319"></a>\
	</div>';
	jQ('body').append(buttonHtml);
}

function fixButtons ()
{
	// Add onclick for the button
	var voucherDomain = 'http://www.reddcoin.gift/';
	jQ('.rdd-button, .rdd-overlay').click(function(event){
		jQ('.rdd-overlay, .rdd-iframe-container, .rdd-iframe').fadeToggle(200);
		if (jQ('.rdd-iframe').attr('src') == '')
		{
			jQ('.rdd-iframe').attr('src', voucherDomain + 'gifts');
		}
		event.preventDefault();
	});
}

function initializeScript ()
{
	// Do not inject this to the Reddvouchers website, in frames or in websites that uses HTTPS
	if (document.domain == 'www.reddcoin.gift'
		|| window.self !== window.top
		|| window.location.protocol == 'https:')
	{
		// Do NOT inject the script
		console.log ('RDD vouchers not run at ' + document.domain);
	}
	else if (typeof rddHasRun === 'undefined')
	{
		// Everything seems all right now, start the script
		rddHasRun = true;
		console.log ('RDD vouchers run at ' + document.domain);
		injectIframe ();
		injectButton ();
		injectCSS ();
		fixButtons ();
	}
	else
	{
		console.log ('RDD vouchers not run at ' + document.domain);
	}
}

function addJQuery()
{
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);" +
			injectIframe.toString() +
			injectButton.toString() +
			injectCSS.toString() + 
			fixButtons.toString() +
			//initializeScript.toString() + 
			"jQ(document).ready(function(){(" + initializeScript.toString() + ")();});";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}



// Intialize
addJQuery ();
