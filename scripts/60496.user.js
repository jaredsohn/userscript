// ==UserScript==
// @name			AMO - Skip to Install
// @namespace		amo - SkipScreen
// @description		Removes extra pages when installing some add-ons on AMO 
// @include			https://addons.mozilla.org/*
// ==/UserScript==

// version 0.80
// - Changes made to Install Buttons on AMO
// - Inserted CSS to make the buttons looks normal

// test URI for roadblock: none as of [03/28/2010]
// test uri for policy: https://addons.mozilla.org/en-US/firefox/addon/10273

// As checked on [03/28/2010], no addon that uses the 'Meet the Developers' page can be found.
// There are still a lot of addons that use the 'Policy Blocker' page.

addGlobalStyle = function(css)
	{
		head = document.getElementsByTagName('head')[0]
    	if (!head)
    		{
    			return
    		}
    	style = document.createElement('style')
    	style.type = 'text/css'
    	style.innerHTML = css
    	head.appendChild(style)
}

addGlobalStyle(
'a.eula' +
'	{' +
'		background-image: -moz-linear-gradient(50% 0%, #93C85E 30%, #55A802 55%) !important;' +
'		border-top-color: #3A7404 !important;' +
'		border-right-color: #3A7404 !important;' +
'		border-bottom-color: #3A7404 !important;' +
'		border-left-color: #3A7404 !important;' +
'		-moz-border-radius-bottomleft:0.95em !important;' +
'		-moz-border-radius-bottomright:0.95em !important;' +
'		-moz-border-radius-topleft:0.95em !important;' +
'		-moz-border-radius-topright:0.95em !important;' +
'		-moz-box-shadow:0 0 1px rgba(255, 255, 255, 0.1) inset !important;' +
'	}' +
'' +
'a.eula > b' +
'	{' +
'		background-image: url(\'https://addons.mozilla.org/media//img/zamboni/icons/button-icons.png\') !important;' +
'		background-position: 25% -49px !important;' +
'		width: 16px !important;' +
'		font-weight: bolder !important;' +
'		color: white !important;' +
'		background-repeat: no-repeat !important;' +
'		margin-left: -7.8px !important;' +
'		padding-top: 4.68333px !important;' +
'		padding-right: 15.6px !important;' +
'		padding-bottom: 3.11667px !important;' +
'		padding-left: 13.2667px' +
'	}' +
'' +
'a.eula > span' +
'	{' +
'		color: white !important;' +
'		margin-right: 3.9px !important;' +
'		margin-left: -3.9px !important;' +
'		padding-right: 7.8px !important;' +
'		padding-left: 10.1333px !important;' +
'		border-left-width: 2px !important;' +
'		border-left-color: 	rgba\(150, 150, 150, 0.35\) !important;' +
'		border-left-style: groove !important;' +
'		text-shadow: 0 -1px 0 #3A7404 !important;' +
'	}' +
'' +
'div.eula' +
'	{' +
'		padding-bottom:3px !important;' +
'		padding-left:3px !important;' +
'		padding-right:3px !important;' +
'		padding-top:2px !important;' +
'		position:relative !important;' +
'	}' +
'' +
'.privacy-policy' +
'	{' +
'		display: none !important;' +
'	}'
)

zeldaMMO = document.getElementsByClassName('install-button')
    
for (i = 0; i < zeldaMMO.length; i++)
	{
		link = zeldaMMO[i].children[0]
		pass = false
		platform = ''

		if (link.href.match(/roadblock/i))
			{
				num = new RegExp('[0-9]+','i').exec(link.href)
				pass = true
			}

		if (link.href.match(/policy\/0/i))
			{
				num = new RegExp('policy\/0\/([0-9]+)','i').exec(link.href)[1]
				pass = true
			}

		if (pass)
			{
				if (link.href.match(/platform/i))
					platform = '/platform:' + new RegExp('platform\:(.)','i').exec(link.href)[1]

				lang = new RegExp('org/(.*?)/','i').exec(link.href)[1];
				mozilla = new RegExp('firefox|thunderbird|seamonkey|sunbird|mobile','i').exec(link.href);
				link.href = 'https://addons.mozilla.org/' + lang + '/' + mozilla  + '/downloads/latest/' + num + platform + '/addon-' + num + '-latest.xpi'
				if	(document.title.match('Search Add-ons') ||
					 !document.title.match('::'))
					
					Name = new RegExp('Add (.*?)  ?to ','i').exec(link.title)[1]
				else
					Name = new RegExp('(.*?) ::','i').exec(document.title)[1]
					link.children[1].innerHTML = 'Add to Firefox'
				
				possession = '\'s'

				if (/.$/i.exec(Name) == 's' | 'S')
					possession = '\''

// If you wish to prevent this script from writing to the Error Console, Comment out the next line (put '//' before the rest of the line)
				GM_log(Name + possession + ' install link is: ' + link.href)
			}
	}
