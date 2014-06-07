// ==UserScript==
// @name           TwitchRefresher
// @namespace      TwitchRefresher
// @include        http://www.twitch.tv/*
// @include        http://www.justin.tv/*
// @description    Adds a button which will cause a stream to periodically refresh
// ==/UserScript==

var TwitchRefresher = (function(window, document){

	//Local Variables
	var TR = {},
		SCRIPT_NUMBER = 124242, // Change this to the number given to the script by userscripts.org (check the address bar)
		SCRIPT_NAME = 'TwitchRefresher',
		_cache = {},
		CONFIG = {
			REFRESH_DELAY: 10
		},
		DOM = {
			STREAM_HOLDER: 'standard_holder',
			STREAM: 'object',
			CHANNEL_ACTIONS: 'channel_actions',
			CLONE_BUTTON: 'sharebtn',
			REFRESH_BUTTON: 'TR-refresh'
		},
		STATE = {
			REFRESHING: false,
			INTERVAL: 0
		};
	
	//Private Functions
	/**
	 * updateCheck(forced)
	 * @param forced	manual update via registered greasemonkey menu command
	 * Checks userscripts for updated script, if an update is available the script
	 * will prompt for an installation.
	 */
	function updateCheck(d){if(d||"undefined"!=typeof GM_getValue&&parseInt(GM_getValue("SUC_last_update","0"))+864E5<=(new Date).getTime())try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+SCRIPT_NUMBER+".meta.js?"+(new Date).getTime(),headers:{"Cache-Control":"no-cache"},onload:function(b){var c,a;a=b.responseText;GM_setValue("SUC_last_update",(new Date).getTime()+"");c=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(a)[1]);b=parseInt(GM_getValue("SUC_current_version","-1")); -1!=b?(a=/@name\s*(.*?)\s*$/m.exec(a)[1],GM_setValue("SUC_target_script_name",a),c>b?confirm('There is an update available for the Greasemonkey script "'+a+'."\nWould you like to go to the install page now?')&&(GM_openInTab("http://userscripts.org/scripts/show/"+SCRIPT_NUMBER),GM_setValue("SUC_current_version",c)):d&&alert('No update is available for "'+a+'."')):GM_setValue("SUC_current_version",c+"")}})}catch(e){d&&alert("An error occurred while checking for updates:\n"+e)}};
	
	
	//Public Attachments
	TR.version = "0.1.0";
	TR[toString] = function () {
		return  "TwitchRefresher namespace loaded. \nYou are now ready to refresh streams " + this.version;
	};
	
	TR.RefreshStream = function(){
		if(STATE.REFRESHING){
			var streamHolder = document.getElementById(DOM.STREAM_HOLDER);
			streamHolder.appendChild(streamHolder.removeChild(streamHolder.querySelector(DOM.STREAM)));	
		}
	};
	
	TR.PeriodicRefreshStream = function(){
		STATE.INTERVAL = window.setInterval(function(){return TR.RefreshStream();},CONFIG.REFRESH_DELAY*1000);
	};
	
	TR.StartStopRefreshing = function(){
		var rb = document.getElementById(DOM.REFRESH_BUTTON);
		
		if(STATE.REFRESHING){
			//stop refreshing
			STATE.REFRESHING = false;
			window.clearInterval(STATE.INTERVAL);
			rb.querySelector('span').textContent = 'Start Refreshing!';
		}else{
			//start refreshing
			STATE.REFRESHING = true;
			TR.PeriodicRefreshStream();
			rb.querySelector('span').textContent = 'Stop Refreshing!';
		}
	};
	
	TR.RefreshButton = function(){
		var ca = document.getElementById(DOM.CHANNEL_ACTIONS),
			rb = document.getElementById(DOM.CLONE_BUTTON).cloneNode(true);
		
		rb.id = DOM.REFRESH_BUTTON;
		rb.setAttribute('href','#');
		rb.querySelector('span').textContent = 'Start Refreshing!';
		//attach click event to refresh button
		rb.addEventListener('click',TR.StartStopRefreshing);
		
		ca.insertBefore(rb, ca.firstChild);
	};
	
	TR.init = function(){
		//create button
		TR.RefreshButton();
	
		//register greasemonkey menu command
		GM_registerMenuCommand(GM_getValue('SUC_target_script_name', SCRIPT_NAME) + ' - Manual Update Check', function(){
			updateCheck(true);
		});
		
		//check for update
		updateCheck(false);
	};
	
	//Return TR object
	return TR;

})(window,document);

TwitchRefresher.init();