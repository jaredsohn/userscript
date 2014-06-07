// ==UserScript==
// @name           SHPwn (IPwntU NetWork)
// @description    SHPwn; Standard Theme: GREEN
// @include        http://www.slavehack.com/*
// @include        http://*slavehack.com/*
// @exclude        http://*slavehack.com/includes2/includes/forum.php*
// @version        0.9
// ==/UserScript==

/*###############
##  Features!  ##
#################

 *** This version only works with "Standard Theme: GREEN" ***

* Auto-Camper:
- Uses random refresh rate to avoid detection.
- Two modes, Fast and Slow. (Fast for camping for VPC collects, bank transfers ect; Slow for camping while AFK)
- Logs to new "Info" tab found in the Nav menu.
* BotCheck-Bypass:
- Saves what you are doing and redirects to Bypass.
- Auto-Bypass of botcheck. (No user input).
- Continue what you were doing before botcheck.
* Remove annoying text and headers:
- Makes editing logs twice as fast. (No scrolling)
* Add new links to Nav menu:
- "Info": Shows captured banks/IP's from camping.
- "Camp": Link to start camping the IP you are logged into. (You must be logged into a VPC/NPC/GS and hit access logfile before this link appears).
- "Stop": Stops the camping process.

#################
## Known Bugs! ##
#################
* Script must be disabled to login to or crack a bank account.

#################
##  ChangeLog  ##
#################
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
+ New in version: [0.2];
[*] AutoCamperPause:
	- Added a pause every 1000 loads on the camper. The pause ranges from 5-10 minutes. (To avoid SlaveHack BotDetect Script)
[*] Launch DDoS Tab:
	- Added "Launch DDoS" tab to Nav menu. (You must be logged into a VPC/NPC/GS and hit access logfile before this link appears).
[*] Upload File Tab:
	- Added upload a file to logged in IP. (You must be logged into a VPC/NPC/GS and hit access logfile before this link appears).
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
+ New in version: [0.3];
[*] AutoCamperPause:
	- Changed pause to 10 minutes. (Random wasnt working)
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
+ New in version: [0.4];
[*] AutoUpdate:
        - Added Auto-Update script, you will now be notified by alert when a new version of this script is available.
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
+ New in version: [0.5];
[*] AutoCamperPause:
        - Fixed, now works every 1000 loads and pauses from 5 to 10 minutes.
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
+ New in version: [0.6];
[*] ReWrite:
		- Re-Wrote entire SRC.
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
+ New in version: [0.7];
[*] Sleep:
		- Added Sleep(ms) function.
[*] BotCheckBypass:
		- Bypass now sleeps for 2 seconds before executing. (To avoid detection).
[*] Encrypt:
		- Encrypted a few more functions.
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
+ New in version: [0.8];
[*] UserSearch
		- Replaced slavehacks `© Slavehack` at the bottom of each page with search for user from high scores.
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
+ New in version: [0.9];
[*] BotCheckBypass
		- Toastie has stopped the botcheck bypass from working, so i have taken it out.
		  When there is a botcheck it will notify you via pop up window.
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-