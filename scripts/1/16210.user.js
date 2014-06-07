// ==UserScript==
// @name         styl-lich
// @namespace    http://eldar.cz/myf/firefox/
// @author       myf
// @description  loads external stylesheet on defined sites and/or disables its initial ones
// @include      *
// @version      0.6.1
// @grant        none
// ==/UserScript==

"use strict";

var log = function()
{	var args = Array.prototype.slice.call(arguments,0)
;	args.unshift('Styl-lich')
;	unsafeWindow.console.info.apply(this,args)
}

var Rules =
[	{	enabled: 1
	,	watchURLpattern: 'http://example.com/'
	,	killer: 1
	,	cssUrl: 'http://yourdomain.com/replacement-style.css'
	,	reladOnFocus: 1
	,	toggleOnDblClick: 1
	,	haltInFrames: 1
	}
,	{	enabled: 1
	,	watchURLpattern: /some\.pattern/
	,	killer: 0
	,	cssUrl: 'http://yourdomain.com/additional-style.css'
	}
,	{	enabled: 1
	,	watchURLpattern: functon(){var h = (new Date()).getHours(); return h > 18 || h < 6 }
	,	cssUrl: 'http://yourdomain.com/some-global-style-for-night.css'
	}
]


var head = document.getElementsByTagName("head")[0];
if( head )
{	var timestamp = (new Date()).getTime()
	,	i = -1
	,	rule
;	while ( rule = Rules[++i] )
	{	if( !rule.enabled ) continue
	;	if( rule.haltInFrames && window !== window.top ) continue
	;	var currentUrl = String( document.location.href )
	;	var urlPattern = rule.watchURLpattern
	;	if( !urlPattern ) continue
	;	var matchResult = false
	;	if( urlPattern.test ) // regex
		{	matchResult = urlPattern.test( currentUrl )
// 		;	log('checking',urlPattern.toSource(),'regex against',document.location.href,'result',matchResult)
		;	if( false == matchResult ) continue
		}
		else if( urlPattern.indexOf ) // string
		{	matchResult = 0 == currentUrl.indexOf(urlPattern)
// 		;	log('checking',urlPattern,'string against',document.location.href,'result',matchResult)
		;	if( false == matchResult ) continue
		}
		else if( typeof urlPattern == 'function' ) // function
		{	if( false == urlPattern( currentUrl ) ) continue
		}
	;	log('applying rule', rule)
	;	if( rule.killer )
		{	var j = -1
			,	_s
		;	while ( _s = document.styleSheets[++j] )
			{	if( 'yes it did' != _s['data-styl-lich-injected-this'] ) _s.disabled = true
// 			;	log( _s.href )
			}
		}
	;	if( rule.cssUrl )
		{	var cssNode = document.createElement('link')
		;	cssNode.type = 'text/css'
		;	cssNode.rel = 'stylesheet'
// 		;	cssNode.charset = 'utf-8'
		;	var cssUrl = rule.cssUrl
		;	var anticache_query = ( cssUrl.indexOf('?') == -1 ) ? '?' : '&'
		;	cssNode.href = cssUrl + anticache_query + timestamp
		;	cssNode.media = rule.media || 'screen'
		;	cssNode['data-styl-lich-injected-this'] = 'yes it did'
		;	head.appendChild(cssNode)
		;	log('added', cssNode)
		}
	;	if ( rule.jsUrl )
		{	var script = document.createElement('script')
		;	script.type = 'text/javascript'
		;	script.src = rule.jsUrl + '?' + timestamp
		;	unsafeWindow.document.body.appendChild( script );
		}
	;	if ( rule.reladOnFocus )
		{	unsafeWindow.addEventListener
			(	'focus'
			,	function()
				{	if( cssNode.disabled ) return false
				;	cssNode.href = cssNode.href.split(anticache_query)[0] + anticache_query + (new Date()).getTime()
				;	log('focus -> loading', cssNode.href )
				}
			,	false
			)
		}
	;	if( rule.toggleOnDblClick )
		{	unsafeWindow.addEventListener
			(	'dblclick'
			,	function(e)
				{	cssNode.disabled = !cssNode.disabled
				;	log('dblclck', ( cssNode.disabled ? 'disabled' : 'enabled'), cssNode.href )
				;	e.preventDefault()
				;	return false
				}
			,	true
			)
		}
	}
}



// thx
// http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS