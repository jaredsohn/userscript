// SlaveHack Utilities
// version 0.32
// Copyright (c) 2007-2011 Philip & (c) 2009 Satori & (c) 2011 Acien
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 2 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
////
// Bad idea to ban me on #slavehack, I was retiring anyway, and just wanted to 
// give this out to one person.  They'd have retired in turn and the script 
// would have completely disappeared.  Now it's going to be completely public.
////////////////////////////////////////
// ==UserScript==
// @name          SlaveHack Utilities
// @namespace     http://slavehack.com
// @include       http://*.slavehack.com/index2.php*
// @include       http://slavehack.com/index2.php*
// ==/UserScript==
////
// CHANGELOG:
// 0.1 - 2007-07-23
// * Started
// * Get our IP address from the page, rather than hard coding like certain other utilities
// * Shrunk the foreign logfile textarea, so you don't have to scroll down to hit "edit"
// * Remove our IP from foreign logs, and put a warning that we need to submit under the log textarea.
// * Sort slaves in slave list by clicking on headers, and added headers for individual virus types
// * Reverse sort on the second click
// 0.2 - 2007-07-24
// * Added numbering to the slave list
// * Password and task are now not HTML stripped before sorting, so null entries will show up first (or last)
// * Process list is sorted by IP
// * "Internet" links on processes list
// * fixed bug: page=internet alone sometimes has the logfile, and it isn't modified.
// * Always show textbox to enter password
// * Never * out the password (change input type=password to type=text).
// 0.3 - 2007-07-25
// * Show space used by visible programs in software list
// * Keep track of which programs we already have
// * Remove download links for active viruses, and for software we already have.
// * Remove delete links for active viruses
// * Parse time from top of screen
// * Display time since modified instead of modification date in external host file list
// * Display time since modified instead of modification date in software list
// * Autosubmit log change if we automatically removed our IP
// * Display time since last captcha
// * Upload files is on file list on external hosts instead of a seperate page
// * Upload files doesn't display files that are already on the host (can't upload anyway).
// * Fixed bug: 'page=software' is similar to 'page=softwareext' (software & external HDD)
// * Sort slave list by IP if the primary sort item is the same, so sort is deterministic
// * Remember last sort in slave list
// * Remove "Options" from menu
// * Added "change password" and "change layout' options to "My Computer"
// * Hide hide link if we can't hide it any further on external computers.
// * Turn captcha timer in header red if 19 or more minutes since last captcha
// * Only show files on upload menu if there is room to upload them.
// * Automatically resubmit failed password cracking
// 0.4  - 2007-07-27
// * Change process list to h:m:s format
// * Change auto-submit on process list to refresh process list instead.
// * On process list, show "Continue" button with time remaining displayed on it
// * Select last selected account in collect income on slave list
// * Fixed bug on upload menu where x.0 versions didn't show up on upload menu
// * Fixed bug on upload menu where Photo collection(ZZZ).rip didn't show up on upload menu
// 0.5  - 2007-07-28
// * Every page now gets "seconds remaining" replaced with h:m:s remaining on the continue button, not just process list
// * Changes h:m:s to h:mm:ss (leading 0 in seconds and minutes if less than 10)
// * Hilight current IP on process list
// * Lowlight (anti-hilight) files on external computer if player doesn't have a high enough seeker to see it.
// * Don't display 0.0 in level 0.0 hidden
// * Added "View Upload Page" option to upload menu on external file menu
// * Clicking on "Options" now displays our automation menu instead of the donation page.
// * Brute Force Scan IPs - At 10 IPs per second, it would take 13.6 years to cover the entire IP range, and we take 4 seconds per IP (40 times longer). 
// 0.5  - 2007-07-29
// * Add numbering to process list
// * Remove unnecessary whitespace from process list
// * Completed tasks bubble up to the front of a particular IP's tasks
// * Slightly optimized their JS on the process list.
// * Trim unnecessary text in slaves list
// * MySlaves import list link added to slave list.
// * Process list has extra spacing processes with between different IPs
// 0.6  - 2007-10-10
// * Updates for new code
// * Disabled: Change javascript to hh:mm:ss format on every page
// * Disabled: Show "Continue" button with time remaining displayed on it
// * Temp Disabled: Autosubmit if we removed our IP
// 0.7  - 2007-10-29
// * Logfile auto-cleaner fixed (they intentionally broke it.)
// 0.8	- 2007-12-5
// * Self log camper
// * Mark NPCs in slaves list.
// 0.8.1 - 2007-12-6
// * Fixed a bug in NPC marking code
// * NPCs now get ratings too. (displayed in password field)
// 0.9 - 2007-12-9
// * NPCs go italic when passsword is unknown
// * Provide "crack" link in <font color=red>The slave 7.5.7.89 was removed from your list because you no longer have the admin password anymore and no virus is active.</font>
// * Mark NPCs in ...was removed from your list...
// 0.10 - 2008-07-07
// * Fixed bug where double newlines were completely removed instead of turning into single newlines in logfile.
// * Added NPC/VPC notification
// 0.11 - 2008-07-12
// * Added automatic connection speed analysis
// *******************************************
// ********** Continued by satori ************
// *******************************************
// This script may only work with the Theme: Black small Layout
// *******************************************
// 0.12 - 2009-02-06
// * Moddified to work with the Theme: Black small Layout
// * Link to Slave files next to Internet link in the menu
// * Show ones own highest app version beside slaves app version
// * Added file images to the upload form on the files page
// 0.13 - 2009-02-08
// * Added previous + next NPC link on Internet screen
// * Hilight own IP on process list (white)
// * Added IP logging/parsing of logfiles -> checks if known/slave/npc -> otherwise the IP will be saved into GM PotentialSlaves list
// * Added link to Internet screen which lets you go to next entry of PotentialSlaves and removes the IP from the list once visited
// * Added time needed to upload files on slave (~95% accurate)
// * Hide hide link on own Software page for files that can't hide any further
// 0.14 - 2009-02-10
// * Replace Textarea on Slaves with a DIV and added ip color highlighting
// * Fixed SlaveSort function, asc/desc is now safed and displayed correctly
// * Added: Display installed/active Virus(es) on Internet screen
// * Always select highest non deleteable(AV) spam virus in files/upload list
// * Automatically select highest spam virus that can't be deleted by the slaves AV
// * Highlight spam viruses in upload form in red if they can be deleted by the slaves AV
// 0.15 - 2009-02-13
// * Added: Save Slaves Connection/Apps/Viruses into GM AllSlaveApps and display it at the Internet screen
// * Save euros/h into GM AllSlaveApps and display it on Internet and Slaves screen
// * Connection (MBit) and Money (euros/h) now displayed on Slave page
// * Added highlighting of warez and ddos in upload form which can be deleted by the slaves AV
// * Fixed autoselection of highest not deletable virus on upload page, works now properly
// * Fixed MBit & money/h sort function on slave page
// 0.16 - 2009-02-16
// * Added GS detection, save GS name and show it on Slaves page
// * Highlight last connected slave on slaves page
// * Added: Show Slaves Apps and Viruses in a Tooltip on the Slaves page
// 0.17 - 2009-02-17
// * Switched to Base64 encoded images so they don't get loaded from the server all the time
// * Fixed Slave Info Virus display issue: Move Virus from apps to activ viruses in GM AllSlaveApps if it got activated
// * Added highlighting of highest app version on slave/files
// * Display ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ per (Mbit|Gb|Mhz) on hardware screen
// * Fixed a bug where viruses with .0 level werent highlighted as active on slaves/info tooltip
// * Fixed Own IP detection since the html code was changed
// * Fixed Bug that screwed up the slaves page
// 0.18 - 2009-02-19
// * Fixed: HDD format, IP/PW reset now showing up in process list
// * Fixed DDoS image display on slave page
// * Added Settings menu to turn on/off Autosubmit
// 0.19 - 2009-02-20
// * Fixed: Hopefully everything that was broken through the html change
// * Fixed: IP-link problem on process page
// * Fixed: Logfile on Internet page is now parsed properly
// 0.20- 2009-02-21
// * Added Auto Continue since this feature was disabled by the SH devs
// * Fixed another bunch of things caused by the html changes
// * Added: Remove annoying text over Logfile on Internet page
// * Added: Move ip's with a too high Firewall to crack to the end of the potential slave list
// * Fixed: Last Captcha displayed correctly
// * Fixed: Autorety on failed PW crack working again
// 0.21- 2009-02-22
// * Fixed: Timestamps in Logfiles shown correctly again
// * Fixed: Update of slave income working again
// Small changes (Anonymous)
// 0.22 - 2009-04-15
// * Added the new NPC IPs
// * Added the WHOIS/Buy a GS Links
// More anonymous changes
// 0.23 - 2009-04-22
// * Added the Launch DDoS and Collect All Links
// * Changed the direct slaves link to "Slaves List"
// * Added External HDD Link
// * Added Clear Log Link
// *******************************************
// ********** Continued by anonymous ************
// *******************************************
// 0.24 - 2009-10-24
// * Fixed some anti-SHU behaviour
// 0.25 - 2009-11-09
// * Fixed last captcha
// * Made last captcha timer more accurate
// * Last captcha timer updates in real time.
// * Added a few more NPC IPs from http://spreadsheets.google.com/pub?key=pHMQr9KOU6e0DY0G-c8Q_KA&gid=0
// * Fixed Clear Home Logs
// 0.26 - 2009-11-10
// * Made Clear Home Logs cleaner
// * Added reset PW link
// * Keep track of how many times we've been run, and some related items.
// 0.27 - 2010-06-09
// * Not detected again.
// 0.271 - 2010-06-09
// * added new NPC
// 0.28 - 2010-06-09
// * Read the code!
// 0.29 - 2010-06-17
// * Workaround for an SH bug
// 0.30 - 2010-06-20
// * Show real filetimes on hover
// *******************************************
// ********** Continued by acien ************
// *******************************************
// 0.31 - 2011-04-20 (well idk when i last edited it but this is the date i made the edits public)
// *  Fully updated the npc list to the 5.7 fwl (last npc i think) with a dummy 0.0.0.0 npc to fix a bug of it skiping the first one in the list
// *******************************************
// ********** Continued by Mr. Pengi ************
// *******************************************
// 0.32 - 2011-05-10
// * Good times.
////////////////////////////////////////
// Ideas:
// BUG: 0.29 GB free space on external file list is treated as 0.029GB
// Show outstanding processes for this IP & their status in page=internet ?
// Display Process timers on every page (ie. log edit timer)
// Check a list of IPs to see which are still valid.
// Add Income of all Slaves /h /day and display it somewhere
// Remove GM Slafe/Files if pressed DELETE on slave page
// Parse logfiles for bank transfers / account numbers and bank ip
// NPC on dropdown menus by type? (fwl, wwl, whois, banks, vspam)
// 
// Automated hack&slave (checkbox to start and stop?)
////////////////////////////////////////
// Rejected Ideas:
// Display in-line finances?	- What if someone hacks your bank account?  Effort not worth the return.
// Simplify Uploads?		- it's a POST form, so hard to do, and we simplified it enough having it be one page and removing unnecessary items
// Highlight self on hiscore list	- No good way to get our username
// Preload log edit? - Often we care about CPU speed, so we don't always want to do this.
// BUG: We don't handle captchas on IP scanner (IP Scanner is totally useless) -> I will probably rewrite the function to check if PotentialSlaves are available
// Keep track of our GS? Why? For collecting software, consider software on GS part of the collection? -> with the possibility to view slave apps/viruses this is already possible



/*
hhb improvements:
(cant remember what i changed anymore =(  )
cheat detection code disabler.
full auto hack.
moved the entire script INSIDE unsafeWindow (out of the greasemonkey sandbox)


*/


(function () { // function wrapper

function AutoActivateSlave()
{
	(function(){
		sl=new XMLHttpRequest();sl.originalOpen("GET","http://www.slavehack.com/index2.php?page=slaves",false);sl.send();
		sld=(new DOMParser()).parseFromString(sl.responseText,"text/html");
		ip="94.192.98.31";
		
		var arr=sld.getElementsByTagName("a");
		var i=0;
		for(i in arr)
		{
			if(arr[i]!=null && arr[i].textContent != null && arr[i].textContent.match(ip)){
				//alert("Found it!  ");
			try{

					alert(arr[i].parentNode.nextSibling.nextSibling.firstChild.firstChild.href);
					sl.originalOpen("GET",arr[i].parentNode.nextSibling.nextSibling.firstChild.firstChild.href,false);sl.send();
				}catch(e){
				alert("error activating slave! :(   (probably unable to find the activation link - botcheck maybe?)");
				}
				break;//job done.
			}	
		}
		alert("checked all...");
	})();
	



}

    function SHU_toString_function() {
        if (typeof (GM_getValue) === 'undefined') {
            function GM_setValue(key, value) {
                localStorage.setItem(key, value);
            }

            function GM_getValue(key, def) {
                if (localStorage.getItem(key) === null) {
                    return def;
                } else {
                    return localStorage.getItem(key);
                }
            }

            function GM_log(info) {
                console.log(info);
            }

        }
        var MyIP;
        var SHTime = (new Date()).getTime(); // Default value, gets overwritten by value in the HTML later on.
        var StartTime = (new Date()).getTime();
        var isCaptcha = false;
        var numPotSlaves = GM_getValue('PotentialSlaves', '').split('|').length;
        var aSettings = new Array();
        if (GM_getValue('MenuSettings', '') != '') {
            var aSet = GM_getValue('MenuSettings', '').split('|');
            for (var j = 0; j < aSet.length; j++) {
                var aTemp = aSet[j].split('#');
                aSettings[aTemp[0]] = aTemp[1];
            }
        }

        GM_setValue('RunTimes', parseInt(GM_getValue('RunTimes', 0)) + 1); // Keep track of how many times we've been executed.

        var NPC_IP = ["0.0.0.0", "1.1.1.1", "127.0.0.1", "2.2.2.2", "243.12.1.213", "129.94.140.59", "246.185.15.208", "255.0.255.0", "124.191.123.222", "136.208.245.59", "56.195.92.143", "251.153.56.29", "57.195.92.143", "135.132.154.124", "184.182.224.6", "121.142.212.124", "19.84.229.163", "237.139.128.181", "244.2.133.183", "102.244.136.190", "254.151.123.253", "13.232.147.158", "94.87.45.87", "0.156.244.201", "242.133.164.81", "33.53.184.126", "162.51.129.169", "109.198.68.77", "71.136.63.190", "132.21.163.202", "96.128.231.240", "7.5.7.89", "16.1.233.10", "42.7.239.13", "234.86.95.202", "48.121.47.116", "142.229.199.91", "249.11.136.34", "120.92.153.170", "214.172.152.188", "119.209.47.58", "63.203.160.21", "222.65.67.51", "3.131.143.254", "17.18.111.145", "149.201.199.233", "229.31.45.38", "129.141.138.119", "91.126.151.61", "9.195.12.154", "112.43.79.120", "101.133.111.159", "206.146.24.93", "203.103.59.47", "189.23.124.7", "19.188.239.174", "255.33.234.33", "193.198.230.16", "105.133.13.108", "152.158.115.148", "81.73.86.255", "138.76.73.28", "159.229.197.164", "243.100.166.15", "66.241.98.226", "252.81.175.188", "83.230.105.121", "247.163.249.66", "29.132.103.224", "91.112.13.12", "73.137.85.78", "227.62.179.117", "173.122.175.88", "94.192.98.31", "106.71.208.142", "61.169.234.43", "144.92.41.3", "14.233.123.137", "208.193.85.97", "207.118.73.177", "160.88.2.49", "114.198.119.21", "2.158.124.111", "12.69.38.5", "118.41.15.227", "96.154.255.246", "80.77.237.134", "15.35.62.224", "238.176.102.3", "101.52.91.79", "215.119.128.38", "250.3.107.51", "49.218.89.175", "250.117.216.18", "187.161.10.38", "225.99.248.46", "69.144.46.76", "104.248.113.147", "85.148.218.87", "68.152.119.206", "220.204.61.152", "113.113.217.204", "64.223.252.221", "247.140.133.168", "67.247.218.237", "121.15.223.76", "34.170.166.53", "58.231.184.217", "140.243.173.181", "189.63.250.247", "82.82.41.237", "172.0.47.201", "236.155.42.129", "241.105.225.118", "200.60.183.92", "51.176.101.166", "239.152.83.74", "110.38.135.166", "127.115.164.138", "213.104.0.229", "171.3.251.17", "26.223.183.134", "137.0.218.12", "254.206.104.178", "103.13.127.196", "209.222.239.129", "249.85.70.54", "96.37.77.96", "160.7.44.55", "188.40.32.42", "21.26.30.22", "115.253.239.244", "21.18.35.25", "144.25.116.39", "120.101.174.253", "173.22.203.196", "11.125.146.145", "170.4.54.69", "45.68.137.16", "135.99.182.134", "9.224.178.70", "152.11.194.106", "81.58.195.224", "168.153.111.194", "165.57.86.101", "141.56.234.45", "5.81.186.49", "56.105.200.131", "54.27.17.137", "165.92.38.152", "160.204.113.34", "58.145.5.177", "6.155.226.111", "177.240.29.129", "6.100.142.172", "232.82.137.4", "164.221.47.125", "160.125.181.166", "85.71.100.215", "222.29.243.43", "135.154.119.144", "148.90.86.220", "174.58.255.90", "169.244.20.135", "34.72.193.206", "252.115.199.40", "221.83.199.24", "132.195.23.9", "35.200.115.198", "254.201.59.25", "214.192.44.89", "19.39.19.45", "67.81.5.102", "86.91.172.8", "78.95.108.51", "25.23.182.61", "64.48.99.10", "165.111.158.1"];
        ////////////////////////////////////////////////////////////////////////////////
        // Base64 Encoded Images
        ////////////////////////////////////////////////////////////////////////////////
        var aImages = new Array();
        aImages['vspam'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAQABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQP/xAAmEAACAgEEAAUFAAAAAAAAAAABAgMEEQUGBxIACBMUQhYhIzEy/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEx/9oADAMBAAIRAxEAPwBviHhnj/Tdgw7tuUBrtoVzMxokX5JJ68pIlpuvQo/wCKFI+RJGRqonynwzxtqG2ItxRVfpyxqrZhiudatuOzalaxM7rI/55AowtfP8g9CP34lAPGnmHl0+pajaw+rVq0cUy15xVo+3o1Hb3EVanDlpLHoH1MhipAyeuG8WAjk/zJ6hq4U0IVrvplp4HoO8csE3bLxTGOWJbCSwFOjlGxkkBsH7sNf/2Q%3D%3D';

        aImages['fc'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAwUGB//EACgQAAEDAwQBAgcAAAAAAAAAAAECAwQFBhEAEhMhBxQVIjEyM1Fhgf/EABgBAAMBAQAAAAAAAAAAAAAAAAECBQME/8QAIhEAAAYBAwUAAAAAAAAAAAAAAAECAwQSESEiMTJBYXGh/9oADAMBAAIRAxEAPwDYPIdzXKzUEUa2nUe4qbBUgfdSVdhz4hxlISPluH7GMa45Dm6t0oP7gSJzz1yba57+gW3vIrkO20zLyAhPR+qhKb2qS1lexvnabKltLVlIwEkZPXWtDmNKXVB5IVUEsklfqxqGN5UiqJmRK9b1PEuvxgqKCdm30zmSoOcj8bICvpwSQT+M6EiMTng+ASbRe+Nwj3LAve9qkmRd7KKNHYiGMqG0ORqRvdS7hwsTio8am0lO5OP7pI0JLRY5DqVkf//Z';

        aImages['rddos'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgEC/8QAJBAAAQQBAwUBAQEAAAAAAAAAAwECBAUGBxESABMUISJBJDH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AEmrsrVLD6ONR45d+SJXTbMs05GCnLFYqEWIxxFcpHciKjOH1tsn50G9Oq7VDOMUk47leRPhLXHDISyrjNfOII4eYgEKJWo3gq/e6cl/zpQgzSomamyLKqWq8EmJWAViWCSGtlkJ6e7xyNa5Aoo13+kX3t66C4lGk6Wx6bHA0bJT78ks0iSKQ3vocSKX+gj0b3l7eyck/fzboP/Z';

        ////////////////////////////////////////////////////////////////////////////////
        // Helper Functions
        ////////////////////////////////////////////////////////////////////////////////

        ////
        // Let the script pause for x ms
        function SleepTimer(ms) {
            var zeit = (new Date()).getTime();
            var stoppZeit = zeit + ms;
            while ((new Date()).getTime() < stoppZeit) {};
        }
        ////
        // Check if IP is a NPC
        function checkIsNPC(sIp) {
            for (var o = 0; o < NPC_IP.length; o++) {
                if (NPC_IP[o] == sIp) {
                    return true;
                }
            }
            return false;
        }

        ////
        // Parse IPs from string and sort out npcs, own ip, double ips and already known slaves
        // Added highlighting of IP's
        // Added highlighting of Date/Time
        function ParseLog(sInput, type) {
            var aTemp = new Array();
            var aTemp2 = new Array();
            var aTemp3 = new Array();
            var check;

            // Transform Date/Time into elapsed Time
            if (type == 'highlight') {
                var regExp = /(\d+)-(\d+)-(\d+) (\d+):(\d+)/gm;
                var m = sInput.match(regExp);

                if (m != null) {
                    for (var k = 0; k <= 1; k++) {
                        if (k == 0) { // sort out double times
                            aTemp = m;
                            aTemp2 = new Array();
                            aTemp3 = new Array();
                        } else if (k == 1) { // highlight times
                            aTemp = aTemp3;
                            aTemp2 = new Array();
                            aTemp3 = new Array();
                        }

                        for (var j = 0; j < aTemp.length; j++) {
                            check = 0;
                            for (i = 0; i < aTemp2.length; i++) {
                                if (aTemp2[i] == aTemp[j]) {
                                    check = 1;
                                }
                            }

                            if (check == 0) {
                                if (k == 0) {
                                    aTemp3[aTemp3.length] = aTemp[j];
                                    aTemp2[aTemp2.length] = aTemp[j];
                                } else if (k == 1) {
                                    // ' + aTemp[j] + '
                                    sInput = sInput.replace(new RegExp(aTemp[j], "gm"), ' <b>(' + DisplayTimeDiff(Math.floor(SHTime / 60000) * 60000 - ParseTime(aTemp[j])) + ')</b> ago');
                                }
                            }
                        }
                    }
                }
            }

            var regExp = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
            var m = sInput.match(regExp);

            if (m != null) {
                for (var k = 0; k <= 3; k++) {
                    if (k == 0) { // sort out double ips
                        aTemp = m;
                        aTemp2 = new Array();
                        aTemp3 = new Array();
                    } else if (k == 1) { // sort out npcs and own ip
                        aTemp = aTemp3;
                        aTemp2 = NPC_IP;
                        aTemp2[aTemp2.length] = MyIP;
                        aTemp3 = new Array();
                    } else if (k == 2) { // sort out already known potential slaves
                        aTemp = aTemp3;
                        aTemp2 = GM_getValue('PotentialSlaves', '').split('|');
                        aTemp3 = new Array();
                    } else if (k == 3) { // sort out own slaves
                        aTemp = aTemp3;
                        aTemp2 = GM_getValue('AllSlaves', '').split('|');
                        aTemp3 = new Array();
                    }

                    for (var j = 0; j < aTemp.length; j++) {
                        check = 0;
                        for (var i = 0; i < aTemp2.length; i++) {
                            aTemp2[i] = ((k == 3) ? aTemp2[i].split('#')[0] : aTemp2[i]);
                            if (aTemp2[i] == aTemp[j]) {
                                check = 1;
                            }
                        }

                        if (type == 'highlight' && k > 0 && check == 1) {
                            if (k == 1) {
                                var hlc = ((aTemp[j] == MyIP) ? 'green' : '#FF33FF');
                            } else if (k == 2) {
                                var hlc = 'red';
                            } else if (k == 3) {
                                var hlc = 'blue';
                            }
                            sInput = sInput.replace(new RegExp(aTemp[j], "gm"), '&nbsp;<a href="index2.php?page=internet&var2=' + aTemp[j] + '"><font style="color: ' + hlc + '; font-weight: bold;">' + aTemp[j] + '</font></a>&nbsp;');
                        }

                        if (check == 0) {
                            aTemp3[aTemp3.length] = aTemp[j];
                            if (k == 0) {
                                aTemp2[aTemp2.length] = aTemp[j];
                            }
                        }
                    }
                }
            }

            if (type == 'highlight') {
                return sInput;
            } else if (type == 'collect' && m != null) {
                GM_setValue('PotentialSlaves', GM_getValue('PotentialSlaves', '') + ((GM_getValue('PotentialSlaves', '') == '' || aTemp3.length == 0) ? '' : '|') + aTemp3.join('|'));

                if (aTemp3.length > 0) {
                    GM_log('New Pot. Slaves: ' + aTemp3.join('|'));
                }
            }
        }

        ////
        // Function to keep track of our Slaves
        function manageSlaves(sIp, aData, sAction, sTyp) {
            if (sTyp == 'slave') {
                var aAllSlaves = GM_getValue('AllSlaves', '').split('|');
            } else if (sTyp == 'files') {
                var aAllSlaves = GM_getValue('AllSlaveApps', '').split('|');
            }

            var aOut = new Array();
            var found = false;
            var delIP = '';
            // check if ip is in list
            for (var j = 0; j < aAllSlaves.length; j++) {
                var aTemp = aAllSlaves[j].split('#');
                if (aTemp[0] == sIp && (sAction == 'update' || sAction == 'get')) {
                    found = j;
                    break;
                }

                if ((aTemp[0] != sIp && sAction == 'delete' && aData == '') || (aTemp[6] != sIp && sAction == 'delete' && aData == 'id')) {
                    aOut[aOut.length] = aAllSlaves[j];
                } else if (sAction == 'delete') {
                    GM_log('deleted: ' + aAllSlaves[j]); // debug show deleted entry
                    delIP = aTemp[0];
                }
            }

            if (sAction == 'update') {
                if (sTyp == 'slave') {
                    // 0: IP, 1: PW, 2: V1, 3: V2, 4: V3, 5: Typ
                    var regExp = / \d{1}\.\d{1}/;

                    if (aData != '') {
                        aOut[0] = sIp;
                        aOut[1] = ((aData[2] == '<i>No Spam virus</i>') ? '0' : ((aData[2].match(regExp) != null) ? aData[2].match(regExp)[0].replace(' ', '') : '0'));
                        aOut[2] = ((aData[3] == '<i>No DDoS virus</i>') ? '0' : ((aData[3].match(regExp) != null) ? aData[3].match(regExp)[0].replace(' ', '') : '0'));
                        aOut[3] = ((aData[4] == '<i>No sharewarez virus</i>') ? '0' : ((aData[4].match(regExp) != null) ? aData[4].match(regExp)[0].replace(' ', '') : '0'));
                        aOut[4] = ((aData[5] == 'Spam relay ') ? 'S' : ((aData[5] == 'DDoS bot') ? 'D' : ((aData[5] == 'File Share') ? 'W' : 'N')));
                        aOut[5] = ((found == false) ? SHTime : ((aAllSlaves[j].split('#')[5] != 'undefined') ? aAllSlaves[j].split('#')[5] : SHTime));
                        aOut[6] = ((aData[7] != '') ? (aData[7].match(/DELETE=\d+/gm)[0].split('=')[1]) : (aAllSlaves[j].split('#')[6]));
                    } else {
                        aOut = new Array(sIp, '', '', '', '', SHTime, '');
                        //GM_log('updated: ' + aOut.join('#'));
                    }
                    //GM_log(aOut.join('#'));

                    if (found != false) {
                        aAllSlaves[found] = aOut.join('#');
                    } else {
                        aAllSlaves[aAllSlaves.length] = aOut.join('#');
                    }

                    GM_setValue('AllSlaves', aAllSlaves.join('|'));
                } else if (sTyp == 'files') {
                    // 0: IP, 1: MBIT, 2: Money/h, 3: apps, 4: viruses, 5: last update, 6: GSname

                    // Move Virus app to Active Viruses if activated
                    if (aData[0] == 'app2vir') {
                        //manageSlaves(ConnectedToIP, new Array('app2vir', aTemp[0], aTemp[1]), 'update', 'files');
                        if (found != false) {
                            var aTemp = aAllSlaves[found].split('#');
                            var aApp = ((aTemp[3] != '') ? aTemp[3].split('@') : '');
                            var aVir = ((aTemp[4] != '') ? aTemp[4].split('@') : '');

                            if (aApp != '') {
                                if (aTemp[3] != (aData[1] + ' ' + aData[2])) {
                                    var aNew = new Array();
                                    for (var j = 0; j < aApp.length; j++) {
                                        var aApps = aApp[j].split(' ');
                                        if (aApps[0] == aData[1] && aApps[1] == aData[2]) {} else {
                                            aNew[aNew.length] = aApp[j];
                                        }
                                    }
                                    aTemp[3] = '';
                                    aTemp[3] = aNew.join('@');
                                } else {
                                    aTemp[3] = '';
                                }

                                if (aVir != '') {
                                    aTemp[4][aTemp[4].length] = aData[1] + ' ' + aData[2];
                                    var aNew = new Array();
                                    aNew['vspam'] = new Array();
                                    aNew['vshare'] = new Array();
                                    aNew['vddos'] = new Array();
                                    var added = false;
                                    for (var j = 0; j < aVir.length; j++) {
                                        var aVirs = aVir[j].split(' ');
                                        aNew[aVirs[0]][aNew[aVirs[0]].length] = aVir[j];
                                    }

                                    aNew[aData[1]][aNew[aData[1]].length] = aData[1] + ' ' + aData[2];
                                    aNew[aData[1]].sort();
                                    aNew[aData[1]].reverse();

                                    aTemp[4] = aNew['vspam'].join('@');
                                    if (aTemp[4] == '') {
                                        aTemp[4] = aNew['vshare'].join('@');
                                    } else if (aNew['vshare'].join('@') != '') {
                                        aTemp[4] = aTemp[4] + '@' + aNew['vshare'].join('@');
                                    }

                                    if (aTemp[4] == '') {
                                        aTemp[4] = aNew['vddos'].join('@');
                                    } else if (aNew['vddos'].join('@') != '') {
                                        aTemp[4] = aTemp[4] + '@' + aNew['vddos'].join('@');
                                    }

                                } else {
                                    aTemp[4] = aData[1] + ' ' + aData[2];
                                }

                                aAllSlaves[found] = aTemp.join('#');
                                GM_setValue('AllSlaveApps', aAllSlaves.join('|'));
                            }
                        }
                        return '';
                    } else {
                        aOut[0] = sIp;

                        for (var i = 1; i <= 6; i++) {
                            aOut[i] = ((aData[i] != '') ? aData[i] : ((found != false) ? (aAllSlaves[found].split('#')[i]) : ''));
                        }

                        if (found != false) {
                            aAllSlaves[found] = aOut.join('#');
                        } else {
                            aAllSlaves[aAllSlaves.length] = aOut.join('#');
                        }

                        GM_setValue('AllSlaveApps', aAllSlaves.join('|'));
                    }
                }
            }

            if (sAction == 'get') {
                if (found != false) {
                    return aAllSlaves[found];
                } else {
                    return '';
                }
            }

            if (sAction == 'delete') {
                if (sTyp == 'slave') {
                    GM_setValue('AllSlaves', aOut.join('|'));
                    if (aData == 'id') {
                        manageSlaves(delIP, '', 'delete', 'files');
                    }
                } else if (sTyp == 'files') {
                    GM_setValue('AllSlaveApps', aOut.join('|'));
                }
            }
        }

        ////
        // Calculate Up/Download time
        // Accuracy ~95%
        function getUpDownloadTime(iSize, iSpeed, sOutput) {
            var iSec = parseInt(iSize.replace(/(0\.00|0\.0|0\.|\.)/gm, '') * (1000 / iSpeed) * 1.045 + 3);

            if (sOutput == 'sec') {
                return iSec;
            }
            var iMin = 0;
            var iHou = 0;

            while (iSec >= 60) {
                iMin = iMin + 1;
                iSec = iSec - 60;
            }

            while (iMin >= 60) {
                iHou = iHou + 1;
                iMin = iMin - 60;
            }

            return ((iHou > 0) ? (iHou + 'h') : '') + ((iMin > 0) ? (((iHou > 0) ? ' ' : '') + iMin + 'm') : '') + ((iSec > 0) ? (((iHou > 0 || iMin > 0) ? ' ' : '') + iSec + 's') : '');
        }

        ////
        // Parse human readable time into javascript format.
        function ParseTime(str) {
            // Time as shown is UTC+2, but since we're using the same ParseTime function, 
            // it shouldn't matter as we're just doing time differences

            // As a side effect, returns current time if we can't parse the time.  
            // This is intentional, as it's the best "sane" value to default to. (but still not "good")
            if (str != '' && typeof str != 'undefined') {
                var retval = new Date();
                var reTime = /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)\.(\d+)/;

                if (str.match(reTime)) {
                    var match = reTime.exec(str);
                    retval.setMilliseconds(match[7]);
                    retval.setSeconds(match[6]);
                    retval.setMinutes(match[5]);
                    retval.setHours(match[4]);
                    retval.setDate(match[1]);
                    retval.setMonth(match[2]);
                    retval.setFullYear(match[3]);
                    return retval.getTime();
                }

                reTime = /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+).(\d+)/;
                if (str.match(reTime)) {
                    var match = reTime.exec(str);
                    retval.setMilliseconds(0);
                    retval.setSeconds(match[6]);
                    retval.setMinutes(match[5]);
                    retval.setHours(match[4]);
                    retval.setDate(match[1]);
                    retval.setMonth(match[2]);

                    retval.setFullYear(match[3]);
                    return retval.getTime();
                }

                reTime = /(\d+)-(\d+)-(\d+) (\d+):(\d+)/;
                if (str.match(reTime)) {
                    var match = reTime.exec(str);
                    retval.setMilliseconds(0);
                    retval.setSeconds(0);
                    retval.setMinutes(match[5]);
                    retval.setHours(match[4]);
                    retval.setDate(match[1]);
                    retval.setMonth(match[2]);
                    retval.setFullYear(match[3]);
                    return retval.getTime();
                }
                return retval.getTime();
            } else {
                return '';
            }
        }

        ////
        // Display Time diff in a human readable form
        function DisplayTimeDiff(diff) {
            var ret = '';
            diff = Math.abs(diff);
            // Milliseconds, if applicable
            if (diff % 1000 > 0) {
                if (diff % 1000 < 10) {
                    ret = '.00' + diff % 1000;
                } else if (diff % 1000 < 100) {
                    ret = '.0' + diff % 1000;
                } else {
                    ret = '.' + diff % 1000;
                }
            }
            diff = Math.floor(diff / 1000);

            // Seconds
            if ((diff % 60 == 0) && (ret == '')) {
                // Do nothing
            } else if (diff % 60 < 10) {
                ret = ':0' + (diff % 60) + ret;
            } else {
                ret = ':' + (diff % 60) + ret;
            }
            diff = Math.floor(diff / 60);

            // Minutes
            if (diff % 60 < 10) {
                ret = '0' + (diff % 60) + ret;
            } else {
                ret = '' + (diff % 60) + ret;
            }
            diff = Math.floor(diff / 60);

            // Hours
            if (diff % 24 < 10) {
                ret = '0' + (diff % 24) + ':' + ret;
            } else {
                ret = '' + (diff % 24) + ':' + ret;
            }
            diff = Math.floor(diff / 24);

            // Days if applicable
            if (diff == 1) {
                ret = '' + diff + ' day ' + ret;
            } else if (diff > 1) {
                ret = '' + diff + ' days ' + ret;
            }

            return ret;
        }

        ////////////////////////////////////////////////////////////////////////////////
        // The Code
        ////////////////////////////////////////////////////////////////////////////////

        ////
        // Place a Table beside slavehack logo to manage the settings
        {
            var regExp = /layout2_logo\.jpg/gm;
            var allImg = document.getElementsByTagName('img');
            var doOnce = 0;
            for (var i = 0; i < allImg.length; i++) {
                var m = allImg[i].src.match(regExp);
                if (m != null) {
                    if (doOnce == 0) {
                        var sTableRow1 = '<td width="50" align="center"><b>-SHU-</b></td><td width="20"></td><td>Auto Submit</td><td width="20"></td><td>Auto Continue</td>';
                        //HHBCODE
                        sTableRow1 += '<td width="20"></td><td>FullAutoHack</td><td width="20"></td><td>FullAutoHack pause</td>';
						sTableRow1+='<td width="20"></td><td>Reload Missing Slaves list</td>';
                        var sTableRow2 = '<td><b>Menu</b></td><td></td><td><div id="submit" style="font-weight:bold; color:' + ((aSettings['submit'] == 1) ? '#00FF00' : '#FF0000') + '">' + ((aSettings['submit'] == 1) ? 'On' : 'Off') + '</div><td></td><td><div id="continue" style="font-weight:bold; color:' + ((aSettings['continue'] == 1) ? '#00FF00' : '#FF0000') + '">' + ((aSettings['continue'] == 1) ? 'On' : 'Off') + '</div></td>';
                        //HHBCODE
                        sTableRow2 += '<td width="20"></td><td><div id="fullautohack" style="font-weight:bold; color:' + ((aSettings['fullautohack'] == 1) ? '#00FF00' : '#FF0000') + '">' + ((aSettings['fullautohack'] == 1) ? 'On' : 'Off') + '</div>';
                        sTableRow2 += '<td width="20"></td><td><div id="fullautohack_pause" style="font-weight:bold; color:' + ((aSettings['fullautohack_pause'] == 1) ? '#00FF00' : '#FF0000') + '">' + ((aSettings['fullautohack_pause'] == 1) ? 'On' : 'Off') + '</div>';
                        sTableRow2 += '<td width="20"></td><td><div id="fullautohack_reloadips" style="font-weight:bold; color:' + ((aSettings['fullautohack_reloadips'] == 1) ? '#00FF00' : '#FF0000') + '">' + ((aSettings['fullautohack_reloadips'] == 1) ? 'On' : 'Off') + '</div>';
                        sTableRow2 += '</input>'; //<<idk why its important, but IT IS VERY IMPORTANT
                        var sTableRow = '<table cellpadding="0" border="0" cellspacing="0"><tr align="center"><td rowspan="2" valign="top"><img src="templates/layout2_logo.jpg"></td><td width=40></td>' + sTableRow1 + '</tr><tr align=center><td></td>' + sTableRow2 + '</tr></table>';

                        newElement = document.createElement('div');
                        newElement.innerHTML = sTableRow;

                        doOnce = 1;
                        allImg[i].parentNode.insertBefore(newElement, allImg[i]);
                    } else if (doOnce == 1) {
                        doOnce = 2;
                        allImg[i].style.display = 'none';
                    }
                }
            }
        }

        ////
        // Switch settings on/off
        function changeSettings(sTyp) {
            var sSettings = GM_getValue('MenuSettings', '');
            if (sSettings.match(sTyp)) {
                var aSet = sSettings.split('|');
                for (var i = 0; i < aSet.length; i++) {
                    var aTemp = aSet[i].split('#');
                    if (aTemp[0] == sTyp) {
                        aSet[i] = sTyp + '#' + ((aTemp[1] == 1) ? 0 : 1);
                    }
                }
                sSettings = aSet.join('|');

            } else {
                sSettings = sSettings + ((sSettings != '') ? '|' : '') + sTyp + '#1';
            }

            document.getElementById(sTyp).innerHTML = ((document.getElementById(sTyp).innerHTML == 'On') ? 'Off' : 'On');
            document.getElementById(sTyp).style.color = ((document.getElementById(sTyp).innerHTML == 'On') ? '#00FF00' : '#FF0000');
            aSettings[sTyp] = ((document.getElementById(sTyp).innerHTML == 'On') ? '1' : '0');

            GM_setValue('MenuSettings', sSettings);
        }

        ////
        // Settings Eventlistener
        document.addEventListener('click', function (event) {
            target = event.target;
            //GM_log(target.nodeName);
            if (target.nodeName == 'DIV') {
                if (target.id == 'submit' || target.id == 'continue'
                //HHBCODE
                ||
                target.id == 'fullautohack' || target.id == 'fullautohack_pause' || target.id=='fullautohack_reloadips') {
                    changeSettings(target.id);
                    //HHBCODE
                    if (target.id == 'fullautohack') {
                        sessionStorage.setItem("hhbphase", 0);
                        fullautohackf();
                    }
                    if (target.id == 'fullautohack_reloadips') {
                        //sessionStorage.setItem("hhbphase", 0);
						fullautohack_reloadips_f();
						//var id=setTimeout(fullautohack_reloadips_f, 50);
                        	//alert("im a nigger1 and id:"+id.toString()+ " and toString(): "+fullautohack_reloadips_f.toString());
                    }
                }
            }
        }, true);
					function beep(){
						var a=document.createElement("audio");
						a.setAttribute('oncanplaythrough','Javascript:this.play();');
						a.setAttribute('onended','Javascript:this.parentNode.removeChild(this);');
//						a.addEventListener('canplaythrough',function(e){e.target.play();});
//						a.addEventListener('ended',function(e){e.target.parentNode.removeChild(e.target);});
						document.body.appendChild(a);
						a.src="http://hanshenrik.tk/temp/beep_7.ogg";
//						a.play();						
					}
					//
		var autohackspeed=888;
        var dcalltimes = 0;
        var lastmsg = "";
        var oldmessagesArray = new Array();
        var showDuplicates = false;

        function d(message) {
            try {
                message = message.toString();
            } catch (e) {
                message = "exception converting message to string...";
            }
            //		if(lastmsg.toString()==message.toString()){alert("d called! but detected as duplicate");return;/*no duplicates? plz keep this in 1 line for easy //*/}
            if (!showDuplicates && oldmessagesArray.indexOf(message) != -1) { /*duplicate*/
                return;
            }
            oldmessagesArray.push(message);
            lastmsg = message;
            dcalltimes++;

            var str = "d() call number: " + dcalltimes.toString() + "\n\nmessage: ";
            str += message;
            str += " and getStackTrace(): \n\n"
            try {
                str += getStackTrace().toString();
            } catch (e) {
                str += "exception trying to get stack trace! exception: " + e.toString();
            }

            //            alert(str);
            console.log(str);
        }


        //HHBCODE
        var autohackBlacklistedIPs = [
        /*bank*/
        '135.132.154.124', /*Ypesteiner bank*/
        /*bank*/
        '33.53.184.126', /*Ratepel bank*/
        /*bank*/
        '71.136.63.190', /*Mounstar bank*/
        /*bank*/
        '63.203.160.21', /*Cenmyr bank*/
        /*bank*/
        '207.118.73.177', /*Esmob bank*/
        /*bank*/
        '121.15.223.76', /*Sheiedam bank*/
        /*freeware4all*/
        '243.12.1.213', /*readonly access. CAN be infected, but not with 0.3 software.. i think*/
        /*freeware4all*/
        '129.94.140.59', /*readonly access. CAN be infected, but not with 0.3 software.. i think*/ 
		'165.111.158.1',/*cant hack the normal way (fixed password) - 5.7 firewall npc*/
		]
		//HACK: 184.101.17.60
		//		(function f(){if(document.body.innerHTML.match('You entered an invalid account number')){setTimeout(f,1000);document.getElementsByName('NUMBER')[0].value=Math.floor((Math.random()*999999)+100000);return true;} else {return false;}})();
		function fullautohack_reloadips_f(){
			try{
			fullautohack_reloadips_f_();
			}catch(e)
			{
				console.log(e);
			d("fullautohack_reloadips_f_() exception!"+e);
			}
		}
		function fullautohack_reloadips_f_(){
			//TODO: this function can probably be cpu-optimized allot. 
			//it currently does allot of loops that i think
			//can be merged/removed with some clever coding..
			//and use of (array object).filter() function
			//alert("fullautohack_reloadips_f called");
			if(!window.location.href.match("page=slaves")){
				alert("in order to reload missing slaves list, you must be on 'slaves' page");
				changeSettings('fullautohack_reloadips');
				return;
			}
			
			var i=0;
			var npcipstohack=new Array();
			var str='';
			var tmpAllSlaveApps=GM_getValue('AllSlaveApps').split('|');
			var tmpAllSlaves=GM_getValue('AllSlaves').split('|');
			var tmpPotentialSlaves=GM_getValue('PotentialSlaves').split('|');
			//alert("tmpAllSlaveApps:"+tmpAllSlaveApps);
			//alert("tmpAllSlaves:"+tmpAllSlaves);
			//alert("tmpPotentialSlaves:"+tmpPotentialSlaves);
/*			function myArrayCounter(arr,str){
				//asumes its an array containing strings.
				//counts the number of array elements that contains str.
				return arr.filter(function(v){return v.indexOf(str)!=-1}).length;
			}
	*/		

			function removeThis(/*string*/ip,/*bool*/isNPC){//not sure what to call it?
				isNPC=typeof(isNPC)==='undefined'? false:!!isNPC;
				ip=ip.toString();
				if(ip.length <3){return false;}
				var i=0;
				var wasFound=false;		
				for(i in tmpAllSlaves)
				{
				if(typeof(tmpAllSlaves[i])==='undefined' || tmpAllSlaves[i].toString().length<3){continue;}
				if(tmpAllSlaves[i].toString().match(ip))
				{
				delete tmpAllSlaves[i];
				wasFound=true;
				}
				}
			i=0;
			for(i in tmpAllSlaveApps)
			{
			if(typeof(tmpAllSlaveApps[i])==='undefined' || tmpAllSlaveApps[i].toString().length<3){continue;}
			if(tmpAllSlaveApps[i].toString().match(ip))
			{
			//if(isNPC)alert("deleting "+tmpAllSlaveApps[i]+" isNPC: "+isNPC.toString());
			delete tmpAllSlaveApps[i];
			wasFound=true;
			}
			}
			return wasFound;
			}//<<end of function removeThis
			for(i in NPC_IP){
				if(i==0 || typeof(NPC_IP[i])==='undefined' || NPC_IP[i].length<2/* || autohackBlacklistedIPs.indexOf(NPC_IP[i])!==-1*/){/*ignored.*/continue;}
				str=i;
				while(str.length<3){
					str='0'+str.toString();
				}
				str='NPC '+str;
				if(document.body.innerHTML.match(str)){continue;}
				
				//now we know its gone.		
				//alert("adding "+NPC_IP[i]+" to npcipstohack");
				npcipstohack.push(NPC_IP[i]);
				removeThis(NPC_IP[i].toString(),true);
			}
			sessionStorage.setItem('fullautohack_ipstohack',JSON.stringify(npcipstohack));
			var missingPlayerSlaves=new Array();
			i=0;
			for(i in tmpAllSlaves)
			{
			if(typeof(tmpAllSlaves[i])==='undefined'||tmpAllSlaves[i].toString().length<3){continue;}
			
			if(document.body.innerHTML.match(tmpAllSlaves[i].split("#")[0])){continue;}//<<its not gone.
			if(NPC_IP.indexOf(tmpAllSlaves[i].split("#")[0])!=-1){continue;}//<<its a npc. split("#")[0] WAS NOT MY IDEA! x.x
			//now we know its gone.
			tmpPotentialSlaves.push(tmpAllSlaves[i].split("#")[0]);
			missingPlayerSlaves.push(tmpAllSlaves[i].split("#")[0]);
			removeThis(tmpAllSlaves[i].split("#")[0],false);
			}
			changeSettings('fullautohack_reloadips');
			missingPlayerSlaves=missingPlayerSlaves.filter(function(value){return (value!=null||value!='undefined');});
			npcipstohack=npcipstohack.filter(function(value){return (value!=null||value!='undefined');});
			tmpAllSlaves=tmpAllSlaves.filter(function(value){return (value!=null||value!='undefined');});
			tmpAllSlaveApps=tmpAllSlaveApps.filter(function(value){return (value!=null||value!='undefined');});
			tmpPotentialSlaves=tmpPotentialSlaves.filter(function(value){return (value!=null||value!='undefined');});
			alert("Player IPs to hack:("+tmpPotentialSlaves.length+" total) "+tmpPotentialSlaves.toString()+"\n"+"NPC IPs to hack: ("+npcipstohack.length+" total) "+npcipstohack.toString());
//			alert("tmpAllSlaves.length:"+tmpAllSlaves.length+" GM_getValue('AllSlaves').split('|').length:"+GM_getValue('AllSlaves').split('|').length);			
//			alert("tmpAllSlaveApps.length:"+tmpAllSlaveApps.length+" GM_getValue('AllSlaveApps').split('|').length:"+GM_getValue('AllSlaveApps').split('|').length);
//		alert("tmpPotentialSlaves.length:"+tmpPotentialSlaves.length+" GM_getValue('PotentialSlaves').split('|').length:"+GM_getValue('PotentialSlaves').split('|').length);
			if(confirm("If the previous numbers seems VERY WRONG, press CANCEL NOW!.\n the Reload Missing Slaves list code is not stable/tested enough to be automatic yet..."))
			{
				//var tmpAllSlaveApps=GM_getValue('AllSlaveApps').split('|');
				GM_setValue('AllSlaveApps',tmpAllSlaveApps.join('|'));
				//var tmpAllSlaves=GM_getValue('AllSlaves').split('|');
				GM_setValue('AllSlaves',tmpAllSlaves.join('|'));
				//var tmpPotentialSlaves=GM_getValue('PotentialSlaves').split('|');
				GM_setValue('PotentialSlaves',tmpPotentialSlaves.join('|'));
			}
			
		}
		



            function autohack() {
                // alert("autohack() called!");
                if (!parseInt(aSettings['fullautohack'])) {
                    //	alert("autohack() disabled! or paused...");
                    if ( !! parseInt(aSettings['fullautohack_pause']) || document.getElementById('fullautohack_pause').innerHTML == "On") {
                        changeSettings('fullautohack_pause');
                    }
                    return;
                }
                if (document.body.innerHTML.match('<input class="input" value="I cannot see the numbers" type="submit">')) { /*botcheck...*/
                    //alert("botcheck!");
                    beep();
					setTimeout(autohack, autohackspeed);
                    return;
                }
                //		alert("not botcheck!");
				
                try {
                    _autohack()
                } catch (e) {
                    d("_autohack() exception!" + e.toString());
                }
            }




            function _autohack() {
                var debugthis = true; //<<mostly ignored.. TODO? more like TOLAZY
                if (autohackBlacklistedIPs.indexOf(document.getElementById('internetAdress').getAttribute('value')) !== -1) {
                    //alert("this IP is blacklisted!");
                    d('this IP is blacklisted!');
                    setPhase(13);
                }
                phase = parseInt(sessionStorage.getItem("hhbphase"));
                if (isNaN(phase)) {
                    setPhase(0);
                }

                function setPhase(i) {
//alert("setting phase: "+i);
                    phase = i;
                    sessionStorage.setItem("hhbphase", i);
                }

                function clickHere(ele, /*bool*/ withCtrl) {
                    withCtrl = !! withCtrl; //default:false
                    try {
                        /*
					  event.initMouseEvent(type, canBubble, cancelable, view, 
						detail, screenX, screenY, clientX, clientY, 
						ctrlKey, altKey, shiftKey, metaKey, 
						button, relatedTarget);
					*/
                        var evt = document.createEvent("MouseEvents");
                        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, withCtrl, false, false, false, 0, null); //<<simulate mouse click.
                        ele.dispatchEvent(evt);
                        //window.location.href=document.getElementsByClassName("internet")[1].firstChild.lastChild.href
                    } catch (e) {
                        d("clickHere exception:"+e);
                    }
                }

                var bs = document.getElementsByTagName('b');
                var as = document.getElementsByTagName('a');
                var imgs = document.getElementsByTagName('img');
                var tds = document.getElementsByTagName('td');

                function clickOnThisText(text, withCtrl) {
                    withCtrl = !! withCtrl;
                    var i = 0;
                    for (i in bs) {
                        if (bs[i].textContent == text) {
                            clickHere(bs[i], withCtrl);
                            return true;
                        }
                    }
                    i = 0;
                    for (i in as) {
                        if (as[i].textContent == text) {
                            clickHere(as[i], withCtrl);
                            return true;
                        }
                    }
                    i = 0;
                    for (i in imgs) {
                        if (imgs[i].textContent == text) {
                            clickHere(imgs[i], withCtrl);
                            return true;
                        }
                    }
                    i = 0;
                    for (i in tds) {
                        if (tds[i].textContent == text) {
                            clickHere(tds[i], withCtrl);
                            return true;
                        }
                    }
                    return false;
                }
                d("phase:" + phase);
                switch (phase) {
                case 0:
                    //
                    if (clickOnThisText('Go to login screen')) {
                        setPhase(1);
                    }
                    //console.log("admin: ",clickOnThisText('Admin')," Login:",clickOnThisText('Login'));
                    //if (clickOnThisText('Admin') && clickOnThisText('Login')) {
                    //    setPhase(3);
                    //}
                    /*TODO: IDK Why the above 3 lines of code was in phase0... probably remove it*/
                    break;
                case 1:
                    //start cracking password (or if the password is already known, jumps to phase 3)
                    i = 0;
                    var tmp = document.getElementsByName('loginpass');
                    if ( !! tmp[0] && !! tmp[0].value) {
                        var inputs = document.getElementsByTagName("input");
                        i = 0;
                        for (i in inputs) {
                            if (typeof (inputs[i]) !== 'undefined' && typeof (inputs[i].click) !== 'undefined' && inputs[i].value == 'Login') {
                                setPhase(3);
                                inputs[i].click();
                                break;
                            }
                        }
                    } else if (clickOnThisText('crack')) {
                        setPhase(2);
                    }
                    break;
                case 2:
                    //waits for password to be cracked...
                    if (clickOnThisText('Continue')) {
                        setPhase(3);
                    }
                    break;
                case 3:
                    //wait for IP to be removed..
                    if (clickOnThisText('Log updated')) {
                        setPhase(3331); //setPhase(4);
                    }
                    break;
                case 3331:
                    //preload log edit
                    var inputs = document.getElementsByTagName('input');
                    i=0;
					for (i in inputs) {
                        if (inputs[i].value == 'Edit log') {
                            clickHere(inputs[i]);
                            setPhase(4);
                            break;
                        }
                    }
                    break;
                case 4:
						if(document.readyState!='complete'){break;}
				while(true)//this loop adds lag protection.
				{
					var f=document.getElementsByTagName('form');
					if(f.length<1)break;
					try{f[0].parentNode.removeChild(f[0])}catch(e){}
				}
				
				//goes to Files page
                    i = 0;
                    for (i in as) {
                        if (as[i].textContent == 'Files' && as[i].href.match("var2=")) {
                            clickHere(as[i]);
                            setPhase(5);
                            break;
                        }
                    }
                    break;
                case 5:
					if(document.readyState!=='complete')break;
                    //Check if vspam installer is available (any version, we don't care.)
                    //layout/vspam.jpg
                    var isSpamVirusInstallerAvailable = false;
                    i = 0;
                    for (i in imgs) {
                        //WARNING: not all images have a src x.x
                        if ( !! imgs[i].src && imgs[i].src.match('layout/vspam.jpg')) {
                            isSpamVirusInstallerAvailable = true;
                            break;
                        }
                    }
                    d("isSpamVirusInstallerAvailable:" + isSpamVirusInstallerAvailable);
                    if (isSpamVirusInstallerAvailable) {
                        setPhase(10); /*skip all the upload stuff*/
                    } else {
                        setPhase(6);
                    }
                    break;
                case 6:
                    //navigate to file upload section..
                    if (clickOnThisText('Upload a file')) {
                        setPhase(7);
                    }
                    break;
                case 7:
                    //select virus upload... VSPAM 0.3 ALWAYS.
                    var optionss = document.getElementsByName('upload');
                    if (optionss.length < 1) {
                        d('phase 7, could not find upload menu (page not loaded yet?)');
                        break;
                    }
                    optionss = optionss[0];
                    if (typeof (optionss.options) === 'undefined') {
                        d('phase 7, ERROR: optionss.options is undefined!');
                        break;
                    }
                    if (optionss.options.length < 1) {
                        d('phase 7, ERROR: optionss.options.length <1, possibly under DDoS attack OR something else very wrong...');
                        break;
                    }
                    optionss = optionss.options;
                    var isFound = true;
                    var wasFoundOnce = false;
                    while (isFound) {
                        isFound = false;
                        i = 0;
                        optionss = document.getElementsByName('upload')[0].options
                        for (i in optionss) {
                            //Warning: sometimes, optionss[i] is undefined, and sometimes, optionss[i].parentNode is undefined.
                            //wtf?!?!?.. dunno how that is even possible in this context..
                            if (typeof (optionss[i]) !== 'undefined' && typeof (optionss[i].parentNode) !== 'undefined' && optionss[i].textContent != 'vspam 0.3 [OpenRelay-backdoor.vspam ] (0.003 Gb)')
							{
                                isFound = true;
                                optionss[i].parentNode.removeChild(optionss[i]);
                                i = 0;
                            }
							if(typeof (optionss[i]) !== 'undefined' && typeof (optionss[i].parentNode) !== 'undefined' && optionss[i].textContent == 'vspam 0.3 [OpenRelay-backdoor.vspam ] (0.003 Gb)')
							{
								 wasFoundOnce = true;
							}
							
                        }
                    }
                    if (wasFoundOnce) {
                        setPhase(8);
                    }
                    //alert("TODO: submit virus upload");
                    break;
                case 8:
                    //upload virus
                    try {
                        document.getElementsByName('upload')[0].parentNode.submit();
                        setPhase(9);
                    } catch (e) { /*this exception is almost expected. im too lazy to use lots of typeof()==='undefined'*/
                        /*d('phase 8, exception: '+e);*/
                        setPhase(8);
                    }
                    break;
                case 9:
                    //find out if virus upload is complete. IF YES, goto phase 9991
                    if (document.body.innerHTML.match('Upload finished !')) {
                        i = 0;
                        for (i in as) {
                            if (as[i].textContent == 'Files' && as[i].href.match("var2=")) {
                                //setPhase(10);
                                setPhase(9991);
                                break;
                            }
                        }
                    }
                    break;
                case 9991:
                    //navigate to logfiles
                    if (clickOnThisText('Access logfile')) {
                        setPhase(9992);
                    }
                    break;
                case 9992:
                    //waits until SHU has cleared IP...
                    //maintenance note: copy of case 3
                    if (clickOnThisText('Log updated')) {
                        setPhase(9993);
                    }
                    break;
                case 9993:
                    //preloads log clear, again...
                    //maintenance note: copy of case 3331
                    var inputs = document.getElementsByTagName('input');
                    i = 0;
                    for (i in inputs) {
                        if (inputs[i].value == 'Edit log') {
                            clickHere(inputs[i]);
                            setPhase(9994);
                            break;
                        }
                    }
                    break;
                case 9994:
                    //go back to Files page
                    //maintenance note: copy of case 4
						if(document.readyState!="complete"){break;}
					while(true)//this loop adds lag protection...
					{//when slavehack does a massive "NPC RESET", it can take like 20 seconds to load a single page btw.
					//happens like a few times every day.
						var f=document.getElementsByTagName('form');
						if(f.length<1)break;
						try{f[0].parentNode.removeChild(f[0])}catch(e){}
					}		
                    i = 0;
                    for (i in as) {
                        if (as[i].textContent == 'Files' && as[i].href.match("var2=")) {
                            clickHere(as[i]);
                            setPhase(10);
                            break;
                        }
                    }
                    break;
                case 10:
                    //
                    //Installs the virus.
                    //Check if vspam installer is available (any version, we don't care) code is copied from case 5
                    //layout/vspam.jpg
                    var isSpamVirusInstallerAvailable = false;
                    i = 0;
                    for (i in imgs) {
                        //WARNING: not all images have a src x.x
                        if ( !! imgs[i].src && imgs[i].src.match('layout/vspam.jpg')) {
                            isSpamVirusInstallerAvailable = true;
                            clickHere(imgs[i]);
                            setPhase(11);
                            break;
                        }
                    }
                    //d("isSpamVirusInstallerAvailable:" + isSpamVirusInstallerAvailable);
                    if (!isSpamVirusInstallerAvailable && document.readyState == 'complete') {
                        //setPhase(6);
                        var errorStr = "autohack() fatal error! phase 10, and isSpamVirusInstallerAvailable is false and document.readyState is complete!! (this should never happen at phase 10)";
                        d(errorStr);
                        alert(errorStr);
                        return false;
                        break;
                    }
                    break;
                case 11:
                    //check that virus install is finished
                    if (document.body.innerHTML.match('Virus install finished')) {
                        setPhase(11112);
                    }
                    break;
                case 11112:
                    //navigates to logfile
                    if (clickOnThisText('Access logfile')) {
                        setPhase(11113);
                    }
                    break;
                case 11113:
                    //make sure logs are deleted... since it should be pre-loaded, this should only take a second..
                    if (clickOnThisText('Log updated')) {
                        setPhase(12);
                    }

                    break;
                case 12:
                    //Yay! Finally! :D We're done hacking this computer.
                    //alert('We\'re done hacking this computer! :D');
					//activating slave.
					if(typeof(slaveshttp)!=='undefined'){break;}//Wtf srsly, is FF javascript engine multithreaded or not? -.-
					//sometimes it seems 2x of _autohack() runs at the same time!!!
					slaveshttp=new XMLHttpRequest();
					slaveshttp.originalOpen("GET","http://www.slavehack.com/index2.php?page=slaves",false);
					slaveshttp.send();
					if(slaveshttp.readyState!=4){d('phase12: error getting slaves page...');setPhase(13);break;}
					var slavesdocument=(new DOMParser()).parseFromString(slaveshttp.responseText,"text/html");
					d("phase12: slaveshttp: "+slaveshttp.toString()+" and running1..");
					var slavesIP=document.getElementById('internetAdress').getAttribute("value");
					var slavesarr=slavesdocument.getElementsByTagName("a");
					var i=0;
					for(i in slavesarr)
					{
						if(slavesarr[i]!=null && slavesarr[i].textContent != null && slavesarr[i].textContent.match(slavesIP)){
							try{
								d("phase12: Found slave's a tag!, url: "+slavesarr[i].parentNode.nextSibling.nextSibling.firstChild.firstChild.href);
								//alert(slavesarr[i].parentNode.nextSibling.nextSibling.firstChild.firstChild.href);
								slaveshttp.originalOpen("GET",slavesarr[i].parentNode.nextSibling.nextSibling.firstChild.firstChild.href,false);slaveshttp.send();
								}catch(e){
								var dstr="phase12: error activating slave! :(   (probably unable to find the activation link - botcheck maybe?), "+e.toString();
								try{
								dstr+="url is believed to be: "+slavesarr[i].parentNode.nextSibling.nextSibling.firstChild.firstChild.href;
								}catch(ee){dstr+="and ee exception...";}
								d(dstr);
								
							}
							break;//job done.
						}
					}
                    setPhase(13);
                    break;
                case 13:
                    
					//clickHere(document.getElementById('hhbcode_nextnpc'));
                    var ipstohack=JSON.parse(sessionStorage.getItem('fullautohack_ipstohack'));
					if(!Array.isArray(ipstohack) || ipstohack.length<1){
						alert("autohack has no more NPC IPs to hack. please navigate to Slaves page and refresh the 'unhacked NPCs list'");
						changeSettings('fullautohack');
						setPhase(0);
						break;
						} else {
					var e=document.getElementById('internetAdress');
					if(e==null){break;}
					e.value=ipstohack.pop();
					sessionStorage.setItem('fullautohack_ipstohack',JSON.stringify(ipstohack));
					e.parentNode.submit();
					setPhase(0);
					}
                    break;
                default:
                    break;
                } //end of switch
                setTimeout(autohack, autohackspeed)
            }

            function fullautohackf() {
                // alert("fullautohackf() called!");
                return autohack();
            }

            // Get our IP and put it on the MyIP var
            {
                var allSmall = document.getElementsByTagName('small');
                // For each <small> tag
                for (var i = 0; i < allSmall.length; i++) {
                    // If it contains Computer time: ..., retrieve and set data for later use
                    var thisSmall = allSmall[i];
                    var re = /Computer\s(time|time\sformat):\s(\d+)\sStandard\s(time|time\sformat):\s(.*)\s\[(.*?)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(.*?)\]/gm;
                    var thisMatch = re.exec(thisSmall.innerHTML);

                    if (thisSmall.innerHTML.match(re)) {
                        MyIP = thisMatch[6];
                        SHTime = Math.floor(ParseTime(thisMatch[4]) / 1000 + (thisMatch[2] % 60)) * 1000;

                        // Add last Captcha time
                        var TimeDiff = Math.abs((Math.floor(SHTime / 1000) - GM_getValue("LastCaptcha", SHTime))) * 1000;
                        if (TimeDiff >= 19 * 60 * 1000) { // If more than 19 minutes since last captcha, turn red
                            thisSmall.innerHTML = thisSmall.innerHTML + " <span  id=\"LastCaptcha\" style=\"color: red;\">Last captcha: " + (DisplayTimeDiff(TimeDiff)) + "</span>";
                        } else {
                            thisSmall.innerHTML = thisSmall.innerHTML + " <span id=\"LastCaptcha\">Last captcha: " + (DisplayTimeDiff(TimeDiff)) + "</span>";
                        }

                        function CaptchaClock() {
                            var TimeDiff = Math.abs((Math.floor((SHTime + ((new Date()).getTime() - StartTime)) / 1000) - GM_getValue("LastCaptcha", SHTime))) * 1000;
                            document.getElementById("LastCaptcha").innerHTML = "Last captcha: " + (DisplayTimeDiff(TimeDiff));
                            if (TimeDiff >= 19 * 60 * 1000) { // If more than 19 minutes since last captcha, turn red
                                document.getElementById("LastCaptcha").style.color = "red";
                            } else {
                                document.getElementById("LastCaptcha").style.color = "white";
                            }
                        }
                        window.setInterval(CaptchaClock, 1000); // Tick once per second
                        // Theoretically, there is a good chance of an unsmooth update every so often, but not worth the cpu cost to fix by ticking 10 times per second instead of once.
                    }
                }
            }

            ////
            // Some generic countermeasures, only runs for dedicated users or people who look here
        if (true || GM_getValue('RunTimes', 0) > 1000) {
            var allScript = document.getElementsByTagName('script');
            // For each <script> tag
            for (var i = 0; i < allScript.length; i++) {
                var thisScript = allScript[i];
                var re = /function (.+)\(\) \{ if\(document\.body\.innerHTML\.indexOf/;
                var thisMatch = re.exec(thisScript.innerHTML);
                if (thisScript.innerHTML.match(re)) {
                    unsafeWindow[thisMatch[1]] = function () {};
                }
            }
            clicked = false;
            document.addEventListener('click', function (event) {
                clicked = true;
            }, true);
            if (true || Math.abs(GM_getValue('LastRunTime', 0) - parseInt(StartTime / 1000)) > 3600) {
                document.addEventListener('onbeforeunload', function (event) {
                    if (!clicked) {
                        return 'Document is trying to navigate away without user interaction.  This may be due to anti-shu measures.  It is recommended that you disable SHU, report this, and check for updates.  Pressing cancel will avoid detection.';
                    }
                }, true);
            }
        }

        ////
        // More cat and mouse
        {
            if (false) { //disabled
                var _getElementsByTagName = document.getElementsByTagName;
                var _raw_images = _getElementsByTagName('img');
                document.getElementsByTagName = function (tag) {
                    if (tag.toLowerCase() == 'img') return _raw_images;
                    return _getElementsByTagName(tag);;
                };
            }
        }



        ////
        // Check if we've been captcha'ed
        {
            var allImg = document.getElementsByTagName('img');
            for (var i = 0; i < allImg.length; i++) {
                if (allImg[i].src.match(/workimage.php\?(rand|random)=/gm)) {
                    isCaptcha = true;
					break;//<<hhbcode
                }
            }
        }
	//HHBCODE
	if (aSettings['fullautohack']) {
		setTimeout(fullautohackf, autohackspeed);
	}
	
        ////
        // Save last Captcha time
        if (isCaptcha || document.body.innerHTML.match('<script type="text/javascript" src="http://api.recaptcha.net/challenge?')) {
            GM_setValue("LastCaptcha", Math.floor(SHTime / 1000));
            GM_setValue("CaptchaSolved", 0);
            // Set the captcha timer to unload time rather than load time.  If this event doesn't fire, we still have load time set.
            window.addEventListener("unload", function (event) {
                if (GM_getValue("CaptchaSolved", 0) == 0) // Catch race conditions if multiple copies of the captcha are opened, only count from the first solution.
                {
                    GM_setValue("LastCaptcha", Math.floor((SHTime + ((new Date()).getTime() - StartTime)) / 1000));
                    GM_setValue("CaptchaSolved", 1);
                }
            }, false);
			
			} else { // no chaptcha - start

            ////
            // Always display "collect income" on slaves list
            // Automatically resubmit failed password cracking
            {
                var allA = document.getElementsByTagName('a');
                // For each <a> tag
                for (var i = 0; i < allA.length; i++) {
                    if (allA[i].href.substr(allA[i].href.indexOf('/index2.php?page=software')) == '/index2.php?page=software') {
                        allA[i].innerHTML = 'Main HDD';
                    }
                    if (allA[i].href.substr(allA[i].href.indexOf('/index2.php?page=slaves')) == '/index2.php?page=slaves') {
                        allA[i].href = '/index2.php?page=slaves';
                        allA[i].innerHTML = 'Slaves List';
                    }

                    //http://www.slavehack.com/index2.php?page=internet&var2=174.58.255.90&var3=crack&var4=
                    if (allA[i].innerHTML.match('Try again')) {
                        window.location.href = allA[i].href;
                    }
                    /*if ( allA[i].href.match(/\?page=internet&var2(.*?)&action=crack$/) ) { // (OLD VERSION)
				allA[i].href = allA[i].href + '&crack=true';
			}*/
                }
            }

            ////
            // Auto-Continue
            if (aSettings['continue'] == 1) {
                var continueScript = document.createElement('script');
                continueScript.type = 'text/javascript';

                var sContScript = '' + 'if ( document.getElementsByTagName("script").length > 0 ) {\n' + '	function continueFunction() {\n' + '		var allForm = document.getElementsByTagName("form");\n' + '		var sFound = 0;' + '			for (var i = 0; i < allForm.length; i++) {\n' + '			if ( allForm[i].innerHTML.match("Continue") ) {\n' + '				allForm[i].submit();\n' + '				sFound = 1;\n' + '			}\n' + '		}\n' + '		if ( sFound == 0 ) {\n' + '			window.setTimeout("continueFunction()", 100);\n' + '		}\n' + '	}\n' + '	window.setTimeout("continueFunction()", 100);' + '}\n';
                continueScript.innerHTML = sContScript;
                document.getElementsByTagName('head')[0].appendChild(continueScript);
            }
            ////
            // Check if current ip is in potential slave list and if yes delete it from the list
            // http://www.slavehack.com/index2.php?gow=74.198.141.249&page=internet
            var regExp = /(\?page=internet\&var2=(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))/gm;
            if ((window.location.href.match(regExp))) {
                var aTemp = GM_getValue('PotentialSlaves', '').split('|');
                var aTemp2 = new Array();

                var regExp = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
                var m = window.location.href.match(regExp);

                if (m != null) {
                    for (var i = 0; i < aTemp.length; i++) {
                        if (aTemp[i] != m[0]) {
                            aTemp2[aTemp2.length] = aTemp[i];
                        }
                    }
                    GM_setValue('PotentialSlaves', aTemp2.join('|'));
                }
            }

            ////
            // Move IP tp potential slaves list if wwl is too low
            if (document.body.innerHTML.match('You cannot crack this system, a firewall is active and you haven\'t got a firewall bypasser which is good enough for this firewall.')) {
                var thisIP = window.location.href.match(/(\d+\.\d+\.\d+\.\d+)/);
                if (thisIP != null) {
                    if (checkIsNPC(thisIP[0]) == false) {
                        var sTemp = GM_getValue('PotentialSlaves', '');
                        sTemp = sTemp + ((sTemp == '') ? '' : '|') + thisIP[0];
                        GM_setValue('PotentialSlaves', sTemp);
                    }
                }
            }

            ////
            // Create new link to slave Files, next to Internet link
            var allTD = document.getElementsByTagName('A');
            // For each <td> tag
            for (var i = 0; i < allTD.length; i++) {
                if (allTD[i].innerHTML == ('Internet')) {
                    //GM_log(allTD[i].parentNode.innerHTML);
                    ///////////////////////////////////////////
                    // WHOIS LIST
                    ///////////////////////////////////////////
                    extra = "<strong>WHOIS Servers</strong>";
                    extra += "<li> <a href='index2.php?var2=1.1.1.1&page=internet'>WHOIS 1 [Louis]</a></li>";
                    extra += "<li> <a href='index2.php?var2=132.21.163.202&page=internet'>WHOIS 2 [Fav]</a></li>";
                    extra += "<li> <a href='index2.php?var2=152.158.115.148&page=internet'>WHOIS 3 [Alex]</a></li>";
                    // BANKS
                    extra += "<br /><strong>Banks</strong>";
                    // banks!
                    extra += "<li> <a href='index2.php?var2=135.132.154.124&page=internet'>Ypesteiner [135]</a></li>";
                    extra += "<li> <a href='index2.php?var2=33.53.184.126&page=internet'>Ratepel [33]</a></li>";
                    extra += "<li> <a href='index2.php?var2=71.136.63.190&page=internet'>Mounstar [71]</a></li>";
                    extra += "<li> <a href='index2.php?var2=63.203.160.21&page=internet'>Cenmyr [63]</a></li>";
                    extra += "<li> <a href='index2.php?var2=207.118.73.177&page=internet'>Esmob [207]</a></li>";
                    extra += "<li> <a href='index2.php?var2=121.15.223.76&page=internet'>Schiedam [121]</a></li>";
                    ///////////////////////////////////////////
                    // EXTRA LINKS
                    extra += "<br />";
                    // extra += "<li> <a href='index2.php?var2=&page=internet'>Link Name</a></li>";
                    extra += "<strong>Misc Links</strong>";
                    extra += "<li> <a href='index2.php?var2=152.11.194.106&page=internet'>Buy a GS</a></li>";
                    extra += "<li> <a href='index2.php?page=mycomputer&var2=changepass&var3=&var4='>Reset PW</a></li>";
                    // No user editable sections below
                    extra += "<br /><br />";
                    ////////////////////////////////////////// END
                    allTD[i].parentNode.innerHTML = allTD[i].parentNode.innerHTML.replace('<br>', '').replace('<br>', '') + '- <a href="http://www.slavehack.com/index2.php?page=internet&var3=files">Files</a><br /><br />' + extra;
                }
                if (allTD[i].innerHTML == ('Slaves List')) {
                    // Slaves options...
                    ext = "";
                    ext += "<li> <a href='index2.php?page=slaves&collect=1&slave=all'>Collect all</a></li>";
                    ext += "<li> <a href='index2.php?page=slaves&ddos=1'>Launch DDoS</a></li>";
                    ext += "<br />";
                    allTD[i].parentNode.innerHTML = allTD[i].parentNode.innerHTML.replace('<br>', '').replace('<br>', '') + ext;
                }
                if (allTD[i].innerHTML == ('Main HDD')) {
                    ext2 = "";
                    ext2 += "<li> <a href='index2.php?page=softwareext'>External HDD</a></li>";
                    ext2 += "<li> <a href='index2.php?page=logs&var3=&aktie=&var2=&editlog=%20'>Clear Home Logs</a></li>";
                    allTD[i].parentNode.innerHTML = allTD[i].parentNode.innerHTML.replace('<br>', '').replace('<br>', '') + ext2;
                }
            }

            ////
            // Calculate ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬/(Mhz|Gb|Mbit) for every Hardware
            if (window.location.href.match('page=hardware&var5=')) {
                var allTR = document.getElementsByTagName('tr');
                var found = false;
                if (window.location.href.match('var5=HD') || window.location.href.match('var5=extgb')) {
                    var sTyp = 'Gb';
                } else if (window.location.href.match('var5=cpu')) {
                    var sTyp = 'Mhz';
                } else if (window.location.href.match('var5=connection')) {
                    var sTyp = 'Mbit';
                }

                for (var i = 0; i < allTR.length; i++) {
                    if (found == true) {
                        var sTemp = allTR[i].innerHTML;
                        regExp = /((\d+)|(\d+)\s(\d+))\.(\d+)\s(Gb|Mbit|Mhz)/gm;
                        regExp = /((\d+)|(\d+)\s(\d+))\.(\d+)\s(Gb|Mbit|Mhz)/gm;
                        var iSize = parseFloat(sTemp.match(regExp)[0].replace(' ', '').replace(' ', '').replace(sTyp, ''));
                        regExp = /((\d+)|(\d+)\s(\d+))\s(\d+)?\seuros/gm;
                        var iPrice = parseFloat(sTemp.match(regExp)[0].replace(' ', '').replace(' ', '').replace('euros', ''));
                        var iPricePerSize = (iPrice / iSize).toFixed(2);
                        allTR[i].innerHTML = allTR[i].innerHTML + '<td></td><td>' + iPricePerSize + '</td>';
                    }

                    if (allTR[i].innerHTML == '<td><b>Name</b></td><td><b>Stock</b></td><td><b>Capacity</b></td><td width="10"></td><td align="right"><b>Price</b></td>' || allTR[i].innerHTML == '<td><b>Name</b></td><td><b>Stock</b></td><td><b>Speed</b></td><td width="10"></td><td align="right"><b>Price</b></td>') {

                        allTR[i].innerHTML = allTR[i].innerHTML + '<td></td><td width="30"></td><td><b>&euro; / ' + sTyp + '</b></td>';
                        found = true;
                    }
                }
            }
            //HHBCODE: moved nextNPC higher up
            var nextNPC = '';

            ////
            // Let us know if this is a VPC or NPC
            // Added links to next and previous npc
            // Added link to Next PotentialSlaves IP
            if (window.location.href.match(/page=internet/)) {
                var allInput = document.getElementsByTagName('input');
                var npcNum = '';

                var aPotTemp = GM_getValue('PotentialSlaves', '').split('|');
                var sPotTemp = '<font color="#000000" size="-2">PS: ';

                if (aPotTemp.length >= 1 && aPotTemp[0] != '') {
                    sPotTemp = sPotTemp + '<a href="http://www.slavehack.com/index2.php?page=internet&var2=' + ((aPotTemp.length > 0) ? aPotTemp[0] : '') + '">Next</a> [' + aPotTemp.length + ']' + ((aPotTemp.length - numPotSlaves > 0) ? ' (+' + (aPotTemp.length - numPotSlaves) + ')' : '') + '</font>';
                } else {
                    sPotTemp = sPotTemp + 'No more left :(</font>';
                }

                for (var i = 0; i < allInput.length; i++) {
                    if (allInput[i].name == 'var2') {
                        var isNPC = false;
                        for (var j = 0; j < NPC_IP.length; j++) {
                            isNPC = isNPC || (allInput[i].value == NPC_IP[j]);
                            if (isNPC && npcNum == '') {
                                npcNum = j;
                            }
                            var ConnectedToIP = allInput[i].value;
                        }

                        // Remove entry form AllSlaveApps if there is no VPC running any more
                        var regExp = /There is no webservice running at \<u\>(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
                        if (document.body.innerHTML.match(regExp) != null) {
                            manageSlaves(ConnectedToIP, '', 'delete', 'files');
                        }

                        // Check if PW has been Cracked, if yes add ip to GM AllSlaves
                        if (document.body.innerHTML.match('You cracked and decrypted the password.') != null) {
                            manageSlaves(ConnectedToIP, '', 'update', 'slave');
                        }

                        // Check if Virus has been activated, if yes update GM AllSlaves
                        if (document.body.innerHTML.match('Virus install finished !') != null) {
                            var regExp = /(vspam|vddos|vshare)\s(\d{1}\.\d{1})/gm;
                            var m = document.body.innerHTML.match(regExp);

                            if (m != null) {
                                var thisSlave = manageSlaves(ConnectedToIP, '', 'get', 'slave').split('#');
                                var aTemp = m[0].split(' ');
                                thisSlave[0] = ConnectedToIP;
                                thisSlave[2] = ((aTemp[0] == 'vspam') ? m[0] : '<i>No Spam virus</i>');
                                thisSlave[3] = ((aTemp[0] == 'vddos') ? m[0] : '<i>No DDoS virus</i>');
                                thisSlave[4] = ((aTemp[0] == 'vshare') ? m[0] : '<i>No sharewarez virus</i>');
                                thisSlave[5] = '';
                                thisSlave[6] = '';
                                thisSlave[7] = '';
                                //thisSlave[5] = ((aTemp[0] == 'vspam' ) ? 'Spam relay ' : ((aTemp[0] == 'vddos' ) ? 'DDoS bot' : ((aTemp[0] == 'vshare' ) ? 'File Share' : 'N')));

                                manageSlaves(ConnectedToIP, thisSlave, 'update', 'slave');

                                //Move Virus App to Virus active
                                manageSlaves(ConnectedToIP, new Array('app2vir', aTemp[0], aTemp[1]), 'update', 'files');
                            }
                        }

                        var allh1 = document.getElementsByTagName('h1');
                        var regExp = /\<img src=.?layout\/theinternet\.jpg.?\>/gm

                        for (var i = 0; i < allh1.length; i++) {
                            //if(allh1[i].innerHTML.search(regExp) >= 0 && allh1[i].innerHTML.search(regExp) < 50) {
                            if (allh1[i].innerHTML == 'Internet') {
                                var sVpcNpc = '';
                                if (isNPC) {
                                    nextNPC = '';
                                    var prevNPC = '';
                                    if (npcNum > 1) {
                                        prevNPC = ' - <a href="http://www.slavehack.com/index2.php?page=internet&var2=' + NPC_IP[(npcNum - 1)] + '"><<</a>';
                                    }
                                    if (npcNum < NPC_IP.length - 1) {
                                        nextNPC = ' - <a id="hhbcode_nextnpc" href="http://www.slavehack.com/index2.php?page=internet&var2=' + NPC_IP[(npcNum + 1)] + '">>></a>';
                                    }
                                    sVpcNpc = "<font color=\"#000080\" size=\"-2\"><b>NPC " + npcNum + prevNPC + nextNPC + "</b></font>";
                                } else {
                                    sVpcNpc = "<font color=\"#008000\" size=\"-2\"><b>VPC</b></font>";
                                }

                                // Display slave status in right Internet corner
                                var isSlave = manageSlaves(ConnectedToIP, '', 'get', 'slave');
                                sStatus = '<table cellspacing="0" cellpadding="0" border="0" align="right" style="font-family: Verdana; font-size: 10px; color: #000000;"><tr align="center">';

                                if (isSlave != '') {
                                    var aTemp = isSlave.split('#');
                                    //GM_log('is slave: ' + isSlave);

                                    if (aTemp[1] > 0) {
                                        aTemp[1] = ((aTemp[4] == 'S') ? ('<font style="background-color:#B5FFB3; font-weight: bold;">' + aTemp[1] + '</font>') : aTemp[1]);
                                        sStatus = sStatus + '<td width="30" style="border-right: 2px solid #333333;"><img border="0" src="' + aImages['vspam'] + '"><br>' + aTemp[1] + '</td>';
                                    }

                                    if (aTemp[2] > 0) {
                                        aTemp[2] = ((aTemp[4] == 'D') ? ('<font style="background-color:#B5FFB3; font-weight: bold;">' + aTemp[2] + '</font>') : aTemp[2]);
                                        sStatus = sStatus + '<td width="30" style="border-right: 2px solid #333333;"><img border="0" src="' + aImages['rddos'] + '"><br>' + aTemp[2] + '</td>';
                                    }

                                    if (aTemp[3] > 0) {
                                        aTemp[3] = ((aTemp[4] == 'W') ? ('<font style="background-color:#B5FFB3; font-weight: bold;">' + aTemp[3] + '</font>') : aTemp[3]);
                                        sStatus = sStatus + '<td width="30" style="border-right: 2px solid #333333;"><img border="0" src="' + aImages['fc'] + '"><br>' + aTemp[3] + '</td>';
                                    }

                                    // 0: IP, 1: MBIT, 2: Money/h, 3: apps, 4: viruses, 5: last update
                                    var SlaveApps = manageSlaves(ConnectedToIP, '', 'get', 'files');

                                    if (SlaveApps != '') {
                                        var aTemp2 = SlaveApps.split('#');

                                        if (aTemp2[1] != '') {
                                            sStatus = sStatus + '<td width="40" style="border-right: 2px solid #333333;"><b>MBit</b><br>' + aTemp2[1] + '</td>';
                                        }

                                        if (aTemp2[2] != '') {
                                            sStatus = sStatus + '<td width="55" style="border-right: 2px solid #333333;"><b>euros/h</b><br>' + aTemp2[2] + '</td>';
                                        }
                                    }

                                    sStatus = sStatus + '<td width="90"><b>Slaved:</b><br>' + DisplayTimeDiff(SHTime - aTemp[5]) + '</td>';
                                }

                                sStatus = sStatus + '</tr></table>';

                                var sTable = '<table c1ellspacing="0" cellpadding="3" border="0" width="600" style="background-color:#FFFFFF; color: #000000;"><tr><td width="5" rowspan="2"></td><td width="200">';
                                sTable = sTable + sVpcNpc + '</td><td align="right" rowspan="2">' + sStatus + '</td></tr><tr><td>' + sPotTemp + '</td></table>';

                                var thisTable = document.createElement('div');
                                thisTable.innerHTML = sTable;

                                allh1[i].parentNode.insertBefore(thisTable, allh1[i].nextSibling);
                                break;
                            }
                        }
                    }
                }
            }

            ////
            // LOGFILE
            // Remove any line with our IP from foreign log files.
            // Autosubmit if we removed our IP
            // Scan for unknown IPs in the logfile
            // Buggy: Remove text over log file <form> disappear mysteriously
            // Replace Textarea with a DIV for better Highlighting
            // Added Clear logfile button
            if ((window.location.href.indexOf('var3=log') >= 0) || (window.location.href.indexOf('page=logs') >= 0) || (window.location.href.match(/page=internet$/))) {
                var MyIPInLog = false;

                // Remove text over logfile
                var allDIV = document.getElementsByTagName('div');
                for (var i = 0; i < allDIV.length; i++) {
                    //GM_log(allDIV[i].innerHTML);
                    if (allDIV[i].innerHTML.match('<h1>Log file</h1>')) {
                        allDIV[i].innerHTML = allDIV[i].innerHTML.replace(/\<h1\>Log\sfile\<\/h1\>(.*?)The\slogfile\scan\snot\sexceed\s1\sGb\.\<br\>/gm, '<h1>Log file</h1>');
                    }
                }

                // Search Textarea
                var allTextareas = document.getElementsByTagName('textarea');
                for (var i = 0; i < allTextareas.length; i++) {
                    var thisTextarea = allTextareas[i];
                    if (thisTextarea.rows > 1) {
                        thisTextarea.rows = 15;
                        var sTemp = thisTextarea.value;

                        MyIPInLog = MyIPInLog || (thisTextarea.value.indexOf(MyIP) >= 0);
                        thisTextarea.value = thisTextarea.value.replace(new RegExp("^.*" + MyIP + ".*(\n|$)", "gm"), "");

                        // This fixes the bug where \ becomes \\ and counts against you in edit time.
                        thisTextarea.value.replace(/\\\\/g, "\\");


                        // Check for unknown IPs
                        ParseLog(thisTextarea.value, 'collect');

                        // Add Clear Log beside Edit Log
                        var allInput = document.getElementsByTagName('input');
                        for (var j = 0; j < allInput.length; j++) {
                            if (allInput[j].type == 'submit' && allInput[j].value == '      Edit logfile      ') {
                                //GM_log(allInput[j].type);
                                var clearLog = document.createElement('input');
                                clearLog.type = 'button';
                                clearLog.value = '      Clear logfile      ';

                                clearLog.addEventListener('click', function (event) {
                                    thisTextarea.value = '';

                                    var allForms = document.getElementsByTagName('form');
                                    for (var i = 0; i < allForms.length; i++) {
                                        if ((allForms[i].method == 'post') && (allForms[i].style[0] != "visibility")) {
                                            allForms[i].submit();
                                        }
                                    }


                                }, true);

                                allInput[j].parentNode.insertBefore(clearLog, allInput[j].nextSibling);
                            }
                        }

                        if (MyIPInLog) {
                            var Message = document.createElement('div');
                            Message.innerHTML = '<div style="font-size: large; color: #ff0000;">Own IP removed, submit changes.</div>';
                            thisTextarea.parentNode.insertBefore(Message, thisTextarea.nextSibling);
                            if (aSettings['submit'] == 1) {
                                var allForms = document.getElementsByTagName('form');
                                for (var i = 0; i < allForms.length; i++) {
                                    if ((allForms[i].method == 'post') && (allForms[i].style[0] != "visibility")) {
                                        allForms[i].submit();
                                    }
                                }
                            }
                        }

                        if (!MyIPInLog || (MyIPInLog && aSettings['submit'] == 0) || (MyIPInLog && aSettings['submit'] == 0)) {

                            // Replace Textarea with a DIV and add color highlighting
                            var replaceDiv = document.createElement('div');
                            var regExp = /-*?\n/gm;
                            var regExp2 = /\s{2}/gm;
                            var aText = ParseLog(sTemp.replace(regExp, '<br>'), 'highlight').replace(regExp2, '<br>').split('<br>');
                            thisTextarea.id = thisTextarea.name;

                            var sStyle = '<style type="text/css">#dl { border-right: 2px solid #333333; padding-left: 3px; width: 20px; font-weight: bold; } #dr { padding-left: 3px; } #tr { text-align:left; vertical-align:top; }</style>';
                            var sTable = sStyle + '<table align="left" cellpadding="0" border="0" cellspacing="0" style="color: #000000; font-size: 11px; font-family: Courier New, Andale Mono, Courier; width: 704;"><tr><td colspan="2"><div style="background-color: #FFFFFF; position: absolute; border-bottom: 2px solid #333333; width: 704;"><table width="100%" cellpadding="0" border="0" cellspacing="0" style="color: #000000; font-size: 11px; font-family: Courier New, Andale Mono, Courier; width: 704;"><tr><td id="dl">Nr</td><td id="dr" width="80" height="20"><b>Text</b></td><td align="right"><a href="javascript:switchDisplay();" style="font-weight:bold;">Switch to write mode</a></td></tr></table></div></td></tr><tr><td colspan="2" height="22">&nbsp;</td></tr>';

                            for (var j = 0; j < aText.length; j++) {
                                if (aText[j].indexOf(MyIP) >= 0) {
                                    aText[j] = '<font style="background-color: purple;" color="#FFFFFF"><i>' + aText[j] + '</i></font>';
                                }
                                sTable = sTable + '<tr id="tr"><td id="dl">' + (j + 1) + '</td><td id="dr">' + aText[j] + '</td>';
                            }

                            sTable = sTable + '<tr><td id="dl" height="100%"></td><td></td></tr></table>';

                            replaceDiv.innerHTML = sTable;
                            replaceDiv.id = 'logedt_div';
                            replaceDiv.style.width = 720;
                            replaceDiv.style.height = 234;
                            replaceDiv.style.background = '#FFFFFF';
                            replaceDiv.style.overflow = 'auto';


                            thisTextarea.style.display = 'none';
                            thisTextarea.parentNode.insertBefore(replaceDiv, thisTextarea.nextSibling);

                            var script = document.createElement('script');
                            script.type = "text/javascript";
                            script.innerHTML = 'function switchDisplay() { document.getElementsByName("editlog")[0].style.display="block"; document.getElementById("logedt_div").style.display="none"; }';
                            document.getElementsByTagName("head")[0].appendChild(script);
                        }
                    }
                }
            }

            ////
            // Sort slave list
            // Save and restore last selected account
            // Mark NPCs.
            // http://www.slavehack.com/index2.php?page=slaves&slave=all&collect=1
            if (window.location.href.match('page=slaves') && !window.location.href.match('ddos=1')) {
                // Calculate Money per hour 
                if (document.body.innerHTML.match('Collecting from all slaves....')) {
                    sSlaveIncome = document.body.innerHTML;
                    var allTD = sSlaveIncome.split('<td>');
                    for (var j = 0; j < allTD.length; j++) {
                        if (allTD[j].match('Collecting from all slaves')) {
                            var aSlaves = allTD[j].split('<hr>');
                            for (var i = 1; i < (aSlaves.length - 1); i++) {
                                var thisSlave = aSlaves[i];

                                var sTime = thisSlave.match(/\d+:\d{1,2}/gm)[0];
                                if (sTime != '0:0') {

                                    var aTime = sTime.split(':');
                                    var sIp = thisSlave.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm)[0];

                                    if (thisSlave.indexOf('times sold') >= 0) {
                                        var sMoney = thisSlave.match(/Income:\s(\d+\.\d{1,2}|\d+)/gm)[0].split(' ')[1];
                                    } else {
                                        var sMoney = thisSlave.match(/(\d+\.\d{1,2}|\d+)\seuros/gm)[0].split(' ')[0];
                                    }

                                    var sMin = parseInt(aTime[1]);
                                    var sHour = parseInt(aTime[0]);
                                    while (sHour > 0) {
                                        sMin = sMin + 60;
                                        sHour = sHour - 1;
                                    }

                                    //var sMoneyPerHour = Math.floor((sMoney*60)/sMin);
                                    var sMoneyPerHour = Math.round((sMoney * 60) / sMin);
                                    //var sMoneyPerHour = ((sMoney*60)/sMin).toFixed(2);
                                    //GM_log('>> ip: ' + sIp + ' | time: ' + aTime.join(':') + ' | money: ' + sMoney + ' | mph: ' + sMoneyPerHour);

                                    // 0: IP, 1: MBIT, 2: Money/h, 3: apps, 4: viruses, 5: last update , 6: GS-Name
                                    manageSlaves(sIp, new Array(sIp, '', sMoneyPerHour, '', '', '', ''), 'update', 'files');
                                }
                            }
                        }
                    }
                } else {
				function c(msg){return;/*Disabled.*/if(1){console.log("C() called, NOTCRASHED"+msg.toString())}}
                    // Remove entrys from GM AllSlaves and AllSlaveApps if deleted from slave list

                    // Provide "crack" link in <font color=red>The slave 7.5.7.89 was removed from your list because you no longer have the admin password anymore and no virus is active.</font>
                    // Mark NPCs in the same line
                    var LastConnectedIP = GM_getValue('LastConnectedIP', '');
                    var aAllSlaves = GM_getValue('AllSlaves', '').split('|');
                    var allFont = document.getElementsByTagName('font');
                    var sTemp = '';
                    var aDeleted = new Array();
                    for (var i = 0; i < allFont.length; i++) {
						var isNPC = false;
						var numNpc = '';
						c(1);
                        if (false && //CODE DISABLED. for now at least.
						allFont[i].innerHTML.indexOf('was removed from your list') >= 0) {
							c(2);
//CRASHRESEARCH: moved these vars                            var isNPC = false;
//CRASHRESEARCH: moved...                var numNpc = '';
                            for (var j = 0; j < NPC_IP.length; j++) {
                                isNPC = isNPC || (allFont[i].innerHTML.indexOf(NPC_IP[j]) >= 0);
                                if (isNPC && numNpc == '') {
                                    numNpc = j;
                                }
                            }

                            // Remove Slave from GM AllSlaves
                            var regExp = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
							c(3);
                            var delIP = allFont[i].innerHTML.match(regExp)[0];
							c(4);
                            aDeleted[aDeleted.length] = delIP;
                            manageSlaves(delIP, '', 'delete', 'slave');

                            var sSlaveApps = manageSlaves(delIP, '', 'get', 'files');
                            var sStats = '';
                            if (sSlaveApps != '') {
                                var aSlaveApps = sSlaveApps.split('#');

                                sStats = sStats + ((aSlaveApps[1] != '') ? ('MBit: ' + aSlaveApps[1]) : '');
                                sStats = sStats + ((sStats != '' && aSlaveApps[2] != '') ? ' | ' : '');
                                sStats = sStats + ((aSlaveApps[2] != '') ? ('&euro;/h: ' + aSlaveApps[2]) : '');

                                if (sStats != '') {
                                    sStats = ' [' + sStats + ']';
                                }
                            }
							c(5);
                            var re = / (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
                            allFont[i].innerHTML = allFont[i].innerHTML.replace(re, " <a href=\"http://www.slavehack.com/index2.php?page=internet&var2=$1&var3=crack&var4=\">$1" + ((isNPC) ? ' [NPC ' + numNpc + ']' : '') + sStats + "</a>");

                            if (isNPC) {
                                allFont[i].innerHTML = "<font color='#FF33FF'>" + allFont[i].innerHTML + "</font>";
                            } else {
                                // If VPC is removed from our slave list, readd the ip to the potential slaves list
                                var regExp = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
                                var m = allFont[i].innerHTML.match(regExp);
								c(6);
                                if (m != null) {
                                    if (sTemp != '') {
                                        sTemp = sTemp + ' - ';
                                    }
                                    sTemp = sTemp + m[0];
                                }
                            }
                        }
                    }

                    if (sTemp != '') { // The above readd is actually here
                        ParseLog(sTemp, 'collect');
                    }

                    if (window.location.href.indexOf('collect=1') >= 0) {
                        // Restore last selected account
                        var allSelect = document.getElementsByTagName('select');
                        for (var i = 0; i < allSelect.length; i++) {
                            if (allSelect[i].name == 'account') {
                                allSelect[i].selectedIndex = GM_getValue("LastCollectAccount", 1);
                            }
                        }
						c(7);
                        // Save last selected account
                        function SaveAccount() {
                            var allSelect = document.getElementsByTagName('select');
                            for (var i = 0; i < allSelect.length; i++) {
                                if (allSelect[i].name == 'account') {
                                    GM_setValue("LastCollectAccount", allSelect[i].selectedIndex);
                                    GM_setValue("LastCollectTime", SHTime);
                                }
                            }
                        }
                        window.addEventListener('submit', SaveAccount, true);
                    }

                    // Sort slave list
                    var allTR = document.getElementsByTagName('tr');
                    var MySlaves = new Array(); // [row#][0=IP, 1=Password, 2=SpamVir, 3=DDoSVir, 4=WarezVir, 5=Task, 6=TimeWorked]
                    var SlaveTable='';
                    var LastSort = '<b>IP</b>';
                    var aGSnames = new Array();
                    for (var i = 0; i < allTR.length; i++) {
                        var thisTR = allTR[i];
                        // Rewrite slave list header to show individual virus types
                        if (thisTR.innerHTML == '<td><b>IP</b></td><td><b>Password</b></td><td><b>Virusses</b></td><td></td><td></td><td><b>Task</b></td><td><b>Time worked</b></td>') {
                            thisTR.innerHTML = '<td><b>IP</b></td><td><b>Password</b></td><td><b>Spam Virus</b></td><td><b>DDoS Virus</b></td><td><b>Warez Virus</b></td><td><b>Task</b></td><td><b>Time worked</b></td>';
                        }
						c(8);
                        // Parse slave table into an array
                        // Trim unnecessary text
                        // Also, parse IPs into a string for the data URI
                        if ((thisTR.innerHTML.indexOf('delete') >= 0) && (thisTR.innerHTML.indexOf('Time worked') < 0)) {
                            var ThisSlave = new Array();
                            ThisSlave[0] = thisTR.childNodes[0].innerHTML;
                            ThisSlave[1] = thisTR.childNodes[1].innerHTML;
                            ThisSlave[2] = thisTR.childNodes[2].innerHTML;
                            ThisSlave[3] = thisTR.childNodes[3].innerHTML;
                            ThisSlave[4] = thisTR.childNodes[4].innerHTML;
                            ThisSlave[5] = thisTR.childNodes[5].innerHTML;
                            ThisSlave[6] = thisTR.childNodes[6].innerHTML;
                            ThisSlave[7] = thisTR.childNodes[7].innerHTML;

                            // Update GM AllSlaves
                            var regExp = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
                            var thisIP = ThisSlave[0].match(regExp)[0]
                            var check = 0;
                            c(9);
							for (var k = 0; k < aDeleted.length; k++) { // To make sure these slaves stay deleted
                                if (thisIP == aDeleted[k]) {
                                    check = 1;
                                }
                            }
c(10+"THIS IS LAST CHECK. SHOULD HAVE CRASHED BEFORE YOU SAW THIS MESSAGE :(");
                            if (check == 0) {
                                manageSlaves(thisIP, ThisSlave, 'update', 'slave');
                            }

                            // Add ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬/h and MBit
                            var sSlaveApps = manageSlaves(thisIP, '', 'get', 'files');
                            if (sSlaveApps != '') {
                                //GM_log(sSlaveApps);
                                var aSlaveApps = sSlaveApps.split('#');
                                ThisSlave[8] = ((aSlaveApps[1] != '') ? aSlaveApps[1] : '&nbsp;');
                                ThisSlave[9] = ((aSlaveApps[2] != '') ? aSlaveApps[2] : '&nbsp;');

                                // If the server is a GS save the name for later use into aGSnames array
                                if (typeof aSlaveApps[6] != 'undefined' && aSlaveApps[6] != '') {
                                    aGSnames[aSlaveApps[0]] = aSlaveApps[6];
                                }
                            } else {
                                ThisSlave[8] = '&nbsp;';
                                ThisSlave[9] = '&nbsp;';
                            }

                            // Mark NPCs.
                            for (var j = 0; j < NPC_IP.length; j++) {
                                if (ThisSlave[0].indexOf(NPC_IP[j]) >= 0) {
                                    //ThisSlave[0] = "<i><b>"+ThisSlave[0]+"</b></i>";
                                    ThisSlave[0] = "<a href='index2.php?page=internet&var2=" + NPC_IP[j] + "'><font color='#FF33FF'>" + NPC_IP[j] + "</font></a>";
                                    ThisSlave[1] = "NPC " + j;
                                    if (j < 100) {
                                        ThisSlave[1] = "NPC 0" + j;
                                    }
                                    if (j < 10) {
                                        ThisSlave[1] = "NPC 00" + j;
                                    }
                                }
                            }

                            if (thisTR.childNodes[1].innerHTML == "<i>Password unknown</i>") {
                                ThisSlave[1] = "<i>Unknown</i>";
                            }

                            // Remove " virus" from virus names link.
                            ThisSlave[2] = ThisSlave[2].replace(' virus', '');
                            ThisSlave[3] = ThisSlave[3].replace(' virus', '');
                            ThisSlave[4] = ThisSlave[4].replace(' virus', '');
                            // Remove " profit" from "Collect profit" link.
                            ThisSlave[6] = ThisSlave[6].replace(' profit', '');

                            MySlaves[MySlaves.length] = ThisSlave;
                            //GM_log(MySlaves[MySlaves.length-1].join('-'));

                            // Only need this once, but no harm resetting it each time.
                            SlaveTable = thisTR.parentNode;
                        }
                    }

                    function sortSlaves(str) {
                        var disp = false;
                        var aStr = GM_getValue("LastSort", "<b>IP</b>|asc").split('|');
                        var inc = 0;

                        if (str == '') {
                            str = aStr[0];
                            inc = 1;
                        }

                        function stripHTMLcompare(a, b) {
                            var re = /(<([^>]+)>)/ig;
                            var a1 = a.replace(re, "");
                            var b1 = b.replace(re, "");

                            return ((a1 < b1) ? -1 : ((a1 > b1) ? 1 : 0));
                        }

                        function stripINTcompare(a, b) {
                            var a1 = parseInt(a);
                            var b1 = parseInt(b);

                            if (isNaN(a1)) {
                                a1 = 0;
                            };
                            if (isNaN(b1)) {
                                b1 = 0;
                            };

                            return ((a1 < b1) ? -1 : ((a1 > b1) ? 1 : 0));
                        }

                        // If one of the table headers was clicked, sort by it.
                        if (str == '<b>IP</b>') {
                            MySlaves.sort(function (a, b) {
                                return stripHTMLcompare(a[0], b[0]);
                            });
                            disp = true;
                        }
                        if (str == '<b>Password</b>') { // No idea why anyone would, but for completeness
                            MySlaves.sort(function (a, b) {
                                return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : stripHTMLcompare(a[0], b[0])));
                            });
                            disp = true;
                        }
                        if (str == '<b>Spam</b>') {
                            MySlaves.sort(function (a, b) {
                                return (stripHTMLcompare(a[2], b[2]) == 0) ? stripHTMLcompare(a[0], b[0]) : stripHTMLcompare(a[2], b[2]);
                            });
                            disp = true;
                        }
                        if (str == '<b>DDoS</b>') {
                            MySlaves.sort(function (a, b) {
                                return (stripHTMLcompare(a[3], b[3]) == 0) ? stripHTMLcompare(a[0], b[0]) : stripHTMLcompare(a[3], b[3]);
                            });
                            disp = true;
                        }
                        if (str == '<b>Warez</b>') {
                            MySlaves.sort(function (a, b) {
                                return (stripHTMLcompare(a[4], b[4]) == 0) ? stripHTMLcompare(a[0], b[0]) : stripHTMLcompare(a[4], b[4]);
                            });
                            disp = true;
                        }
                        if (str == '<b>Task</b>') {
                            MySlaves.sort(function (a, b) {
                                return ((a[5] < b[5]) ? -1 : ((a[5] > b[5]) ? 1 : stripHTMLcompare(a[0], b[0])));
                            });
                            disp = true;
                        }
                        if (str == '<b>Time worked</b>') {
                            MySlaves.sort(function (a, b) {
                                return (stripHTMLcompare(a[6], b[6]) == 0) ? stripINTcompare(b[8], a[8]) : stripHTMLcompare(a[6], b[6]);
                            });
                            disp = true;
                        }
                        if (str == '<b>MBit</b>') {
                            MySlaves.sort(function (a, b) {
                                return stripINTcompare(a[8], b[8]);
                            });
                            disp = true;
                        }
                        if (str == '<b>euros/h</b>') {
                            MySlaves.sort(function (a, b) {
                                return stripINTcompare(a[9], b[9]);
                            });
                            disp = true;
                        }

                        // Output the sorted table
                        if (disp) {
                            // Clicking the same sort column twice reverses the sort order.
                            //GM_log(str + ' | ' + aStr[0] + ' - ' + aStr[1]);
                            if ((inc == 1 && aStr[1] == 'asc') || (inc == 0 && str == aStr[0] && aStr[1] == 'desc') || (inc == 0 && str != aStr[0])) {
                                aStr[1] = 'asc';
                                if (str != '<b>Time worked</b>') {
                                    MySlaves.reverse();
                                }
                            } else {
                                aStr[1] = 'desc';
                                if (str == '<b>Time worked</b>') {
                                    MySlaves.reverse();
                                }
                            }

                            if (inc == 0) {
                                GM_setValue("LastSort", str + '|' + aStr[1]); // Save sort method for when we return.
                            }

                            // Actual creation of the new table.
                            // Added 2 new Collums -> MBit and ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬/h
                            var newTable = '<tr><td><b>#</b></td><td><b>IP</b></td><td><b>Password</b></td><td align="center"><b>Spam</b></td><td><b align="center">DDoS</b></td><td align="center"><b>Warez</b></td><td align="center"><b>Task</b></td><td align="center"><b>Time worked</b></td><td>&nbsp;</td><td align="center"><b>MBit</b></td><td align="center"><b>euros/h</b></td><td align="center"><b>Info (A/V)</b></td></tr>';

                            var regExp = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
                            for (var i = 0; i < MySlaves.length; i++) {
                                var bgColor = '#444444';
                                if (i % 2) {
                                    bgColor = '#222222';
                                }

                                if (MySlaves[i][0].match(LastConnectedIP)) {
                                    bgColor = '#BBC4FF';
                                }

                                newTable = newTable + '<tr bgcolor=' + bgColor + '>';

                                newTable = newTable + '<td><b>' + (i + 1) + '.</b></td>';

                                var GSname = '';
                                var thisIP = '';
                                for (var j = 0; j < (MySlaves[i].length + 1); j++) {

                                    //aGSnames['143.12.245.243']
                                    if (j == 0) {
                                        var aIp = MySlaves[i][0].match(regExp);
                                        if (aIp != null) {
                                            thisIP = aIp[0];
                                            if (typeof aGSnames[aIp[0]] != 'undefined') {
                                                GSname = '<b>' + aGSnames[aIp[0]] + '</b>';
                                            }
                                        }
                                    }

                                    if (j == 0 && GSname != '') {
                                        newTable = newTable + '<td>' + MySlaves[i][j] + ' ' + GSname + '</td>';

                                    } else if (j == 2) {
                                        if (MySlaves[i][j] == '<i>No spam</i>') {
                                            newTable = newTable + '<td align="center">' + MySlaves[i][j].replace('No spam', '<i><small>None</small></i>') + '</td>';
                                        } else {
                                            newTable = newTable + '<td align="center">' + MySlaves[i][j].replace('Spam', '<img border="0" src="' + aImages['vspam'] + '">') + '</td>';
                                        }

                                    } else if (j == 3) {
                                        if (MySlaves[i][j] == '<i>No DDoS</i>') {
                                            newTable = newTable + '<td align="center">' + MySlaves[i][j].replace('No DDoS', '<i><small>None</small></i>') + '</td>';
                                        } else {
                                            newTable = newTable + '<td align="center">' + MySlaves[i][j].replace('DDoS', '<img border="0" src="' + aImages['rddos'] + '">') + '</td>';
                                        }

                                    } else if (j == 4) {
                                        if (MySlaves[i][j] == '<i>No sharewarez</i>') {
                                            newTable = newTable + '<td align="center">' + MySlaves[i][j].replace('No sharewarez', '<i><small>None</small></i>') + '</td>';
                                        } else {
                                            newTable = newTable + '<td align="center">' + MySlaves[i][j].replace('ShareWarez', '<img border="0" src="' + aImages['fc'] + '">') + '</td>';
                                        }

                                    } else if (j == 5) {
                                        if (MySlaves[i][j] == 'Spam relay ') {
                                            newTable = newTable + '<td align="center">' + MySlaves[i][j].replace('Spam relay ', '<img border="0" src="' + aImages['vspam'] + '">') + '</td>';
                                        } else if (MySlaves[i][j] == 'File Share') {
                                            newTable = newTable + '<td align="center">' + MySlaves[i][j].replace('File Share', '<img border="0" src="' + aImages['fc'] + '">') + '</td>';
                                        } else if (MySlaves[i][j] == 'DDoS bot') {
                                            newTable = newTable + '<td align="center">' + MySlaves[i][j].replace('DDoS bot', '<img border="0" src="' + aImages['rddos'] + '">') + '</td>';
                                        } else {
                                            newTable = newTable + '<td align="center">' + MySlaves[i][j].replace('No task assigned', 'None') + '</td>';

                                        }

                                    } else if (j == 6 || j == 8 || j == 9) {
                                        newTable = newTable + '<td align="center">' + MySlaves[i][j] + '</td>';

                                    } else if (j == 10) {
                                        if (MySlaves[i][8] != '&nbsp;') {
                                            var sThisSlaveApps = manageSlaves(thisIP, '', 'get', 'files');
                                            var sThisSlave = manageSlaves(thisIP, '', 'get', 'slave');
                                            if (sThisSlaveApps != '') {
                                                var aThisSlaveApps = sThisSlaveApps.split('#');
                                                if (aThisSlaveApps[5] != '' && typeof aThisSlaveApps[5] != 'undefined') {
                                                    aThisSlaveApps[5] = DisplayTimeDiff(SHTime - aThisSlaveApps[5]) + ' ago';
                                                }

                                                newTable = newTable + '<td align="center"><font onMouseOver="Tip(generateTooltip(\'' + sThisSlave + '\', \'' + aThisSlaveApps.join('#') + '\'));" onMouseOut="UnTip()"><b>Show</b>&nbsp;<small>(' + ((aThisSlaveApps[3] != '') ? aThisSlaveApps[3].split('@').length : '0') + '/' + ((aThisSlaveApps[4] != '') ? aThisSlaveApps[4].split('@').length : '0') + ')</small></font></td>';
                                            } else {
                                                newTable = newTable + '<td>&nbsp;</td>';
                                            }
                                        } else {
                                            newTable = newTable + '<td>&nbsp;</td>';
                                        }
                                    } else {
                                        newTable = newTable + '<td>' + MySlaves[i][j] + '</td>';
                                    }
                                }
                                newTable = newTable + '</tr>\n';
                            }
                            SlaveTable.innerHTML = newTable;
                        }
                    }

                    // Sort by last sort, (and add #)
                    sortSlaves('');

                    // Catch clicks, to allow user to sort.
                    document.addEventListener('click', function (event) {
                        sortSlaves(event.target.parentNode.innerHTML)
                    }, true);
                }
            }

            ////
            // PROZESS
            // Sort process list by IP
            // Make IPs in process list clickable
            // Change auto-submit to refresh process list instead.
            // Hilight processes for current IP on process list
            // Add count to process list
            if (window.location.href.indexOf('page=processes') >= 0) {
                var allTR = document.getElementsByTagName('tr');
                var MyProcs = new Array();
                var ProcHeaders = new Array();
                var ProcHeader = 0;
                var ProcTable;

                var reFindCurrIP = /Currently connected to (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\./;
                var CurrIP = '0.0.0.0';
                if (document.body.innerHTML.match(reFindCurrIP)) {
                    CurrIP = reFindCurrIP.exec(document.body.innerHTML)[1];
                }

                // Parse process list into an array
                for (var i = 0; i < allTR.length; i++) {
                    var thisTR = allTR[i];
                    // Rewrite slave list header to show individual virus types
                    if (thisTR.innerHTML.match(/^<td><img src\=\"layout\/processicon\.jpg\"> <b>.* processes<\/b><\/td>/)) {
                        ProcHeader += 1;
                        ProcHeaders[ProcHeader] = thisTR.innerHTML;
                        MyProcs[ProcHeader] = new Array();
                        ProcTable = thisTR.parentNode; // Only need it once, but no harm setting it repeatedly if more than one process type.
                    } else if (ProcHeader > 0) {
                        //var re = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/m;
                        var re = /Kill\sprocess/m;
                        if (thisTR.innerHTML.match(re)) {
                            MyProcs[ProcHeader][MyProcs[ProcHeader].length] = thisTR.innerHTML;
                        }
                    }
                }

                // Sort process lists
                for (var i = 1; i < MyProcs.length; i++) {
                    function FindAndCompareIPs(a, b) {
                        var re = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/m;
                        if (a.match(re)) {
                            var match = re.exec(a);
                            a1 = match[0];
                        } else {
                            a1 = a;
                        }
                        if (b.match(re)) {
                            var match = re.exec(b);
                            b1 = match[0];
                        } else {
                            b1 = b;
                        }
                        if ((a1 == b1) && (a.indexOf('has been finished') >= 0)) {
                            return -1;
                        }
                        if ((a1 == b1) && (b.indexOf('has been finished') >= 0)) {
                            return 1;
                        }
                        return ((a1 < b1) ? -1 : ((a1 > b1) ? 1 : 0));
                    }
                    MyProcs[i].sort(FindAndCompareIPs);
                }

                // Output process list
                var outHTML = '';
                ct = 0;
                for (var i = 1; i < MyProcs.length; i++) {
                    outHTML = outHTML + '<tr height=2><td></td><td><img src="layout/pixel.gif"></td></tr>';
                    outHTML = outHTML + "<tr  bgcolor=#333333 valign=middle>" + ProcHeaders[i] + "</tr>\n";
                    var LastIP = '';
                    for (var j = 0; j < MyProcs[i].length; j++) {

                        if (j > 0) {
                            outHTML = outHTML + '<tr height=2><td></td><td><img src="layout/pixel.gif"></td></tr>';
                        }
                        ct = ct + 1;
                        var re = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/m;
                        if (MyProcs[i][j].match(re)) {
                            var matches = re.exec(MyProcs[i][j]);
                            if (!(matches[0] == LastIP)) {
                                if (!(LastIP == '')) {
                                    outHTML = outHTML + "<tr><td></td></tr>\n";
                                }
                                LastIP = matches[0];
                            }
                        }
                        MyProcs[i][j] = MyProcs[i][j].replace("<td><small>", "<td>" + ct + ".<br><small>");
                        MyProcs[i][j] = MyProcs[i][j].replace("<br><br>", "");
                        outHTML = outHTML + "<tr bgcolor=#222222 valign=top>" + MyProcs[i][j] + "</tr>\n";

                    }
                }
                // http://www.slavehack.com/index2.php?gow=58.37.107.87&page=internet
                // Convert IPs into links
                var re = / (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/gm;
                outHTML = outHTML.replace(re, " <a href=\"http://www.slavehack.com/index2.php?page=internet&var2=$1\">$1</a>");

                // Highlight current IP with yellow background
                var prevHTML = '';
                while (!(prevHTML == outHTML)) {
                    prevHTML = outHTML;
                    outHTML = outHTML.replace('?page=internet&var2=' + CurrIP + '\">' + CurrIP + '</a>', '?page=internet&var2=' + CurrIP + '\" style=\"background-color:yellow\"><b>' + CurrIP + '</b></a>');
                }

                // Highlight own IP with white background
                var prevHTML = '';
                while (!(prevHTML == outHTML)) {
                    prevHTML = outHTML;
                    outHTML = outHTML.replace('?page=internet&var2=' + MyIP + '\">' + MyIP + '</a>', '?page=internet&var2=' + MyIP + '\" style=\"background-color:white\"><b>' + MyIP + '</b></a>');
                }

                if (ProcHeader > 0) {
                    ProcTable.innerHTML = outHTML;
                }
            }

            ////
            // Always show password textbox, and never * it out.
            if (window.location.href.match('var3=login')) {
                var allForm = document.getElementsByTagName('form');
                for (var i = 0; i < allForm.length; i++) {
                    var thisForm = allForm[i];
                    // <td>Username</td><td>Admin</td></tr><tr><td>Password</td><td> ???</td>
                    if (thisForm.innerHTML.match('<td>Username</td><td>Admin</td>')) {
                        thisForm.innerHTML = thisForm.innerHTML.replace("???", "<input name=loginpass type=text><tr><td><td><input type=submit value=login>");
                    }
                }
                allForm = document.getElementsByTagName('input');
                for (var i = 0; i < allForm.length; i++) {
                    var thisForm = allForm[i];
                    if (thisForm.type == "password") {
                        thisForm.type = "text";
                    }
                }
            }

            ////
            // OWN FILES/SOFTWRE
            // Add up file sizes
            // Change actual time to time diff
            // Hide hide link for files we can't hide further
            if (window.location.href.match(/page=software$/)) {
                var allTR = document.getElementsByTagName('tr');
                var MySoft = new Array();
                var SpaceUsed = 0;
                var AllSoft = '';

                // Find our hider level
                var allSmall = document.getElementsByTagName('small');
                var HiderLevel = 0;
                var maxUploadSpeed = 0;
                for (var i = 0; i < allSmall.length; i++) {
                    if (allSmall[i].innerHTML.substr(0, 43) == "Your hide software can hide files to level ") {
                        HiderLevel = allSmall[i].innerHTML.substr(43);
                        HiderLevel = parseFloat(HiderLevel.substr(0, HiderLevel.length - 1));
                    }
                }

                // Find highest seeker.
                var HighSeeker = 0;
                for (var i = 0; i < allTR.length; i++) {
                    if (allTR[i].innerHTML.substr(0, 22) == "<td bgcolor=\"#000000\">") {
                        var allTD = allTR[i].innerHTML.split('</td>');
                        if (allTD[1].indexOf('.skr') >= 0) {
                            HighSeeker = (HighSeeker > parseFloat(allTD[2].substr(4))) ? HighSeeker : parseFloat(allTD[2].substr(4));
                        }
                    }
                }

                // Parse software list into an array
                for (var i = 0; i < allTR.length; i++) {
                    var thisTR = allTR[i];
                    if (thisTR.innerHTML.substr(0, 22) == "<td bgcolor=\"#000000\">") {
                        var allTD = thisTR.innerHTML.split("</td>");
                        // Active viruses are not actually available
                        if (!(allTD[0] == "<td bgcolor=\"#000000\"><img src=\"layout/activevspam.jpg\" border=\"0\">")) {
                            // Keep track of all software
                            if (AllSoft == '') {
                                AllSoft = AllSoft + allTD[1].replace("<td> ", "") + " " + allTD[2].replace("<td>", "");
                            } else {
                                AllSoft = AllSoft + "|" + allTD[1].replace("<td> ", "") + " " + allTD[2].replace("<td>", "");
                            }
                        }
                        // Display time diff instead of time
                        allTD[4] = '<td><a title="' + allTD[4].substr(4) + '">' + DisplayTimeDiff(SHTime - ParseTime(allTD[4])) + ' ago</a>';

                        // Calc size
                        var ThisSize = allTD[3].replace("<td>", "");
                        var reGB = /GB/i;
                        ThisSize = ThisSize.replace(" ", "");
                        if (ThisSize.match(reGB)) { // GB
                            ThisSize = parseFloat(ThisSize);
                            ThisSize = ThisSize * 1024; // 1GB = 1024MB
                        } else { // MB
                            ThisSize = parseFloat(ThisSize);
                        }

                        SpaceUsed = SpaceUsed + ThisSize;
                        SpaceUsed = Math.round(SpaceUsed * 1000000) / 1000000;

                        // Hide hide link if applicable
                        if (parseFloat(allTD[6].substr(40)) >= HiderLevel) {
                            allTD[6] = allTD[6].replace("<img src=\"layout/hide.jpg\" border=\"0\">", '');
                        }

                        // Remove hide level 0.0
                        allTD[6] = allTD[6].replace('0.0', ' &nbsp; &nbsp; ');

                        // Replace file line
                        allTR[i].innerHTML = allTD.join('</td>');
                    }
                }

                GM_setValue("AllSoft", AllSoft);

                // Add Visible Space Used
                if (SpaceUsed < 1024) {
                    SpaceUsed = SpaceUsed + " mb";
                } else {
                    SpaceUsed = (SpaceUsed / 1024) + " gb";
                }

                textnodes = document.evaluate("//text()",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
                for (var i = 0; i < textnodes.snapshotLength; i++) {
                    node = textnodes.snapshotItem(i);
                    if (node.data.indexOf("Total space:") >= 0) {
                        TotalSpace = node.data.substr((node.data.indexOf("Total space: ") + 13), (node.data.indexOf(" gb.") - (node.data.indexOf("Total space:") + 13)));
                        // GM_log(node.data + " :: (" + TotalSpace+")");
                        // TODO: convert total space to # DDOSes required to 555
                    }
                    if (node.data.indexOf("Free:") >= 0) {
                        newElement = document.createElement('div');
                        newElement.innerHTML = "\t\tVisible Used: " + SpaceUsed + ".<br>\n";
                        node.parentNode.insertBefore(newElement, node);
                    }
                }
            }

            // SLAVE FILES/SOFTWRE
            // Remove download links for active viruses, and for software we already have.
            // Remove delete links for active viruses
            // Display time diff since edit instead of time
            // Add upload file box
            // Hide hide link for files we can't hide further
            // Show Uploadtime for every file in upload Form
            if (window.location.href.indexOf('var3=files') >= 0) {

                // Set LastConnectedIP
                GM_setValue('LastConnectedIP', ConnectedToIP);

                ////
                // Get highest app version, compared to slaves one
                function getHighestAppVersion(toCheck) {
                    var MySoft = GM_getValue("AllSoft", "").split('|');
                    var version = 'NA';
                    var aTyp = toCheck.split('.');
                    //GM_log(toCheck);
                    if (aTyp[1] == 'img' || aTyp[1] == 'txt' || aTyp[1] == 'exe' || toCheck.substr(0, 6) == '<td><a') {
                        return '';
                    } else {
                        for (var j = 0; j < MySoft.length; j++) {
                            var aTemp = MySoft[j].split(' ');
                            if (MySoft[j] != '') {
                                var ver = aTemp[(aTemp.length) - 1]
                                //GM_log(MySoft[j]);
                                var aMyTyp = aTemp[(aTemp.length) - 2].split('.');
                                if (aTyp[1] == aMyTyp[1] && (version == 'NA' || ver > version)) {
                                    version = ver;
                                }
                            }
                        }

                        // Trim X.0 Versions to X
                        if (version.length > 1) {
                            aTemp = version.split('.');
                            if (aTemp[1] == 0) {
                                version = aTemp[0];
                            }
                        }
                        return version;
                    }
                }

                // Find our hider level
                var allSmall = document.getElementsByTagName('small');
                var HiderLevel = 0;
                var maxUploadSpeed = 0;
                var aApps = '';
                var aViruses = '';
                var GSname = '';
                for (var i = 0; i < allSmall.length; i++) {
                    if (allSmall[i].innerHTML.substr(0, 43) == "Your hide software can hide files to level ") {
                        HiderLevel = allSmall[i].innerHTML.substr(43);
                        HiderLevel = parseFloat(HiderLevel.substr(0, HiderLevel.length - 1));
                    }

                    // Get max file upload speed
                    searchString = 'You can upload files with a speed of ';
                    var pos = allSmall[i].innerHTML.indexOf(searchString);
                    if (pos >= 0) {
                        maxUploadSpeed = allSmall[i].innerHTML.substr(searchString.length, 20).split(' ')[0];
                    }

                    var pos = allSmall[i].innerHTML.indexOf("(Target computer download speed: ");
                    if (pos >= 0) {
                        Upspeed = allSmall[i].innerHTML.substr(pos + 33, ((allSmall[i].innerHTML.indexOf(" Kb/s", pos + 33)) - (pos + 33)));
                        Upspeed = Math.round(Upspeed / 113.7); // Upspeed is now the mbit speed of the overall connection
                        newElement = document.createElement('div');
                        newElement.innerHTML = "<small>" + Upspeed + " Mbit connection.</small>";
                        allSmall[i].parentNode.insertBefore(newElement, allSmall[i].nextSibling);
                    }
                }

                var FreeSpace = document.body.innerHTML.substr(document.body.innerHTML.indexOf("Free: ") + 6, 10);
                FreeSpace = FreeSpace.substr(0, FreeSpace.indexOf(' '));
                FreeSpace = 1000 * FreeSpace;

                var allTR = document.getElementsByTagName('tr');
                var MySoft = GM_getValue("AllSoft", "").split('|');
                var SoftHere = new Array();
                //GM_log(GM_getValue("AllSoft", ""));

                // Find highest seeker.
                var HighSeeker = 0;
                for (var i = 0; i < allTR.length; i++) {
                    if (allTR[i].innerHTML.substr(0, 22) == "<td bgcolor=\"#000000\">") {
                        var allTD = allTR[i].innerHTML.split('</td>');
                        if (allTD[1].indexOf('.skr') >= 0) {
                            HighSeeker = (HighSeeker > parseFloat(allTD[2].substr(4))) ? HighSeeker : parseFloat(allTD[2].substr(4));
                        }
                    }
                }

                // Parse software list on external host
                // Get highest AV version
                var highestAV = '0.1';
                for (var i = 0; i < allTR.length; i++) {

                    // Check if Slave is a GS, if yes get Name
                    var regExp = /Property of \<b\>\[.*]\<\/b\>/gm;
                    if (allTR[i].innerHTML.match(regExp)) {
                        m = allTR[i].innerHTML.match(regExp);
                        if (m != null) {
                            GSname = m[0].split('Property of ')[1].replace('<b>', '').replace('</b>', '');
                        }
                    }

                    if (allTR[i].innerHTML.substr(0, 22) == "<td bgcolor=\"#000000\">") {
                        var allTD = allTR[i].innerHTML.split('</td>');
                        var ThisSoft = allTD[1].replace("<td> ", "") + " " + allTD[2].replace("<td>", "");
                        // Remove download and delete links for active viruses
                        if ((allTD[0] == "<td bgcolor=\"#000000\"><img src=\"layout/activevspam.jpg\" border=\"0\">") || (allTD[0] == "<td bgcolor=\"#000000\"><img src=\"layout/activevshare.jpg\" border=\"0\">") || (allTD[0] == "<td bgcolor=\"#000000\"><img src=\"layout/activevddos.jpg\" border=\"0\">")) {

                            allTD[5] = '<td bgcolor="#000000">';
                            allTD[8] = '<td bgcolor="#000000">';

                            if (allTD[2].replace("<td>", "") != '') {
                                if (aViruses != '') {
                                    aViruses = aViruses + '@';
                                }
                                aViruses = aViruses + allTD[1].split('.')[1] + " " + allTD[2].replace("<td>", "");
                            }

                        } else {
                            // Make a list of all software on this system
                            SoftHere[SoftHere.length] = allTD[1].replace("<td> ", "") + " " + allTD[2].replace("<td>", "");

                            if (allTD[2].replace("<td>", "") != '') {
                                if (aApps != '') {
                                    aApps = aApps + '@';
                                }
                                aApps = aApps + allTD[1].split('.')[1] + " " + allTD[2].replace("<td>", "");
                            }

                            // Get highest AV version
                            if (allTD[1].indexOf('.av') >= 0) {
                                var vers = allTD[2].replace("<td>", "");
                                if (vers > highestAV) {
                                    highestAV = vers;
                                }
                            }

                            // Display own File Versione beside Server version and make the higher one bold
                            var myFileVersion = getHighestAppVersion(allTD[1].replace("<td> ", ""));
                            myFileVersion = ((myFileVersion == 'NA') ? '0.1' : myFileVersion);
                            var iCompareSlave = parseInt(allTD[2].replace('<td>', '').replace('.', ''));
                            var iCompareOwn = (myFileVersion.length == 1) ? parseInt(myFileVersion + '0') : parseInt(myFileVersion.replace('.', ''));
                            allTD[2] = ((iCompareSlave > 0) ? ((iCompareSlave > iCompareOwn) ? ('<td><b>' + allTD[2].replace('<td>', '') + '</b>&nbsp;(' + ((myFileVersion == '0.1') ? 'NA' : myFileVersion) + ')') : (allTD[2] + '&nbsp;<b>(' + myFileVersion + ')</b>')) : '<td>');
                        }

                        // Remove download links for software we already have
                        for (var j = 0; j < MySoft.length; j++) {
                            if (MySoft[j] == ThisSoft) {
                                allTD[8] = '<td bgcolor="#000000">';
                                break;
                            }
                        }

                        // Display time diff instead of actual time
                        allTD[4] = '<td><a title="' + allTD[4].substr(4) + '">' + DisplayTimeDiff(SHTime - ParseTime(allTD[4])) + ' ago</a>';

                        // Hide hide link if applicable
                        if (parseFloat(allTD[6].substr(40)) >= HiderLevel) {
                            allTD[6] = allTD[6].replace("<img src=\"layout/hide.jpg\" border=\"0\">", '');
                        }

                        // Remove hide level 0.0
                        allTD[6] = allTD[6].replace('0.0', ' &nbsp; &nbsp; ');

                        // Lowlight (!hilight) if player can't see it.
                        if (parseFloat(allTD[6].substr(40)) > HighSeeker) {
                            allTD[1] = allTD[1].replace('<td>', '<td><i><font color=tan>');
                            allTD[1] = allTD[1] + '</font></i>';
                            allTD[2] = allTD[2].replace('<td>', '<td><i><font color=tan>');
                            allTD[2] = allTD[2] + '</font></i>';
                            allTD[3] = allTD[3].replace('<td>', '<td><i><font color=tan>');
                            allTD[3] = allTD[3] + '</font></i>';
                            allTD[4] = allTD[4].replace('<td>', '<td><i><font color=tan>');
                            allTD[4] = allTD[4] + '</font></i>';
                        }

                        // Replace file line
                        allTR[i].innerHTML = allTD.join('</td>');
                    }
                }

                // 0: IP, 1: MBIT, 2: Money/h, 3: apps, 4: viruses, 5: last update, 6: GS-Name
                manageSlaves(ConnectedToIP, new Array(ConnectedToIP, Upspeed, '', aApps, aViruses, SHTime, GSname), 'update', 'files');

                // Add upload form to file menu (instead of it being a seperate page)
                var allA = document.getElementsByTagName('a');
                var replaceMe;
                for (var i = 0; i < allA.length; i++) {
                    //if (allA[i].innerHTML == '<small>Upload a file</small>') {
                    if (0) { // Disabled for now
                        replaceMe = allA[i];
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: allA[i].href,
                            onload: function (responseDetails) {
                                var newForm = document.createElement('form');
                                var reSelect = /(<select name=upload>.*?<\/select>)/;
                                var sFileStyle = '';
                                var sFileImage = '';
                                var aFiles = new Array("wwl", "crc", "fwl", "vspam", "mailer", "av", "ana", "vshare", "fc", "skr", "hdr", "enc", "dec", "rip", "vddos", "rddos", "txt", "img", "exe");
                                var mySelect = 'no';
                                var aNewOptions = new Array();
                                newForm.method = 'post';
                                newForm.action = replaceMe.href;
                                if (responseDetails.responseText.match(reSelect)) {
                                    var selectOptions = (reSelect.exec(responseDetails.responseText))[1].split('<option');
                                    var newHTML = '<select name=upload>';

                                    // Only allow uploads of files that don't already exist here.
                                    for (var j = 1; j < selectOptions.length; j++) {
                                        var OnThisPage = false;
                                        var reOption = / (\d+\.?\d*) \[(.*?) *\]/;
                                        if (selectOptions[j].match(reOption)) {
                                            var SelectMatch = reOption.exec(selectOptions[j]);
                                            for (var k = 0; k < SoftHere.length; k++) {
                                                OnThisPage = OnThisPage || ((SelectMatch[2] + ' ' + SelectMatch[1]) == SoftHere[k]);
                                            }
                                        }

                                        var FileSize = selectOptions[j].substr(selectOptions[j].indexOf("]") + 3);
                                        FileSize = FileSize.substr(0, FileSize.indexOf(' ')) * 1000;

                                        selectOptions[j] = selectOptions[j].replace("</select>", "");

                                        if (!OnThisPage && (FileSize <= FreeSpace)) {
                                            aNewOptions[aNewOptions.length] = selectOptions[j];
                                        }
                                    }

                                    for (var j = 0; j < aNewOptions.length; j++) {
                                        var fileSize = aNewOptions[j].match(/\d{1}\.\d{3}/gm)[0];
                                        var selected = '';
                                        var deleteable = '';

                                        for (var k = 0; k < aFiles.length; k++) {
                                            if (aNewOptions[j].indexOf(aFiles[k]) > 0) {
                                                sFileImage = aFiles[k];
                                                // Red out deletable virus
                                                if (aFiles[k] == 'vshare' || aFiles[k] == 'vddos' || aFiles[k] == 'vspam') {
                                                    var regExp = /(vshare|vddos|vspam)\s((\d{1}\.\d{1})|(\d{1}))/gm;
                                                    var m = aNewOptions[j].match(regExp);
                                                    if (m != null) {
                                                        if (m[0].split(' ')[1] <= highestAV) {
                                                            deleteable = ' background-color: #FFD5D5;';
                                                        }
                                                    }
                                                }

                                                if (aFiles[k] == 'rip') {
                                                    sFileImage = 'warez';
                                                } else if (aFiles[k] == 'vshare') {
                                                    sFileImage = 'fc';
                                                } else if (aFiles[k] == 'vspam') {
                                                    //GM_log('-' + highestAV + '-');

                                                    if (mySelect == 'no') {
                                                        selected = 'selected ';
                                                        mySelect = 'ok';

                                                        if (getUpDownloadTime(fileSize, maxUploadSpeed, 'sec') > 120) {
                                                            if (aNewOptions.length > (j + 1)) {
                                                                var m2 = aNewOptions[(j + 1)].match(/vspam\s((\d{1}\.\d{1})|(\d{1}))/gm);
                                                                if (m2 != null) {
                                                                    if (m2[0].split(' ')[0] == 'vspam') {
                                                                        if (m2[0].split(' ')[1] > highestAV) {
                                                                            selected = '';
                                                                            mySelect = 'no';
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                                sFileStyle = 'style="padding-left: 20;' + deleteable + ' background-image: url(\'./layout/' + sFileImage + '.jpg\'); background-repeat: no-repeat;" ';
                                            }
                                        }

                                        // Calculate upload time for each file
                                        var uploadTime = getUpDownloadTime(fileSize, maxUploadSpeed, '');

                                        newHTML = newHTML + "<option " + selected + sFileStyle + aNewOptions[j].replace(' ]', ']') + ' [' + uploadTime + "]\n";
                                    }
                                    newHTML = newHTML + '<option value=\'\'>View Upload Page';
                                    newHTML = newHTML + '</select>';
                                    newHTML = newHTML + "<input type=submit value=\"Upload File\" class=form>";
                                    newForm.innerHTML = newHTML;
                                    replaceMe.parentNode.insertBefore(newForm, replaceMe);
                                    replaceMe.parentNode.removeChild(replaceMe);
                                }
                            }
                        });
                    }
                }
            }

            if (window.location.href.match('page=slaves')) {

                //////////////////////////////////////////////////////
                //////////// ADD AND CONFIGURE TOOLTIP ///////////////
                //////////////////////////////////////////////////////

                // BASE64 Encoded Images // URL to encoder: http://www.greywyvern.com/code/php/binary2base64
                var sImages = "var bas64Images = new Array();\n" + "bas64Images['wwl'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgQI/8QAJBAAAgEDAwQDAQAAAAAAAAAAAQIEAxESAAUhBhQxQSJRcYH/xAAXAQADAQAAAAAAAAAAAAAAAAACAwUE/8QAKBEAAQMDAgMJAAAAAAAAAAAAAgABEQMEIQUSEzHRFSJBQoGhseHw/9oADAMBAAIRAxEAPwDPu29Czmpd3upMOGtiygZViDbjEXxuDbnkH1omFSaurBO2n3i9vv8AZTXpijtsfcJMOJt6xFVAzEMTXa5Hlzd8DiDiGtf1rUduVON3mUTUuJwxIj3PPp0nPOJVm7dzJgPGjLhWqOqgki3DjEW/R96S6RaCLVWnOPlC5vXgoyasuCq1NwroqVJGJWkALNwrfI+WB8f3T7q9Ks7O/NmhX+ymMWEsAPh1X//Z';\n" + "bas64Images['crc'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABgf/xAAlEAABBAEEAgEFAAAAAAAAAAACAQMEBQYHERIhCBMiABQjMUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AX4RQ6dRtPcVcmYfRTJUimiSpD8xiMMiWZN7mEZCYcKTI+PY8kXcg7+XQR3ycwt2lu2Z64/Hp4X4YVfLiGCtTAZaLkZMJ22QB6g24jsqL2acVQKhQ5ZS2mlunsepycKO0pQbN6eUN+UrRBWyYBIDJN+twkdf/AKvHZFVF/SKBjy7zPG8hoceap5f3JMSnycT1ut7IrY7bewR+g//Z';\n" + "bas64Images['fwl'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAwQGCP/EACUQAAIBAwIGAwEAAAAAAAAAAAECAwQRIQASBQYTFDGRFVGB4f/EABcBAQEBAQAAAAAAAAAAAAAAAAMFBAb/xAAoEQABAwMCAwkAAAAAAAAAAAACAAERAwQhEjEFE9EVIkFRgaGx4fD/2gAMAwEAAhEDEQA/AM1UnAZmXq1R6MIyVGXIx68/zRvU8t1XpcJONVTuj7/X7Cq/gpODiDdTrTd3EZo13XlMe6wLN52ta4AOsg3A1Jh50q3wzl8whENLR69YxtMIMymVRBCu6WRlVb4BJOAPr3pmT3ZG9J2bGfhK8y8+zcVmhmKR9zDTpTLJEGVNiWYXD3LHLA4H7oraxGizs2zvK5/tVwJyDJl49F//2Q%3D%3D';\n" + "bas64Images['vspam'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAQABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQP/xAAmEAACAgEEAAUFAAAAAAAAAAABAgMEEQUGBxIACBMUQhYhIzEy/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEx/9oADAMBAAIRAxEAPwBviHhnj/Tdgw7tuUBrtoVzMxokX5JJ68pIlpuvQo/wCKFI+RJGRqonynwzxtqG2ItxRVfpyxqrZhiudatuOzalaxM7rI/55AowtfP8g9CP34lAPGnmHl0+pajaw+rVq0cUy15xVo+3o1Hb3EVanDlpLHoH1MhipAyeuG8WAjk/zJ6hq4U0IVrvplp4HoO8csE3bLxTGOWJbCSwFOjlGxkkBsH7sNf/2Q%3D%3D';\n" + "bas64Images['mailer'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgQH/8QAJhAAAQMCBgICAwAAAAAAAAAAAgEDEQQFAAYHEhMxCCEiUSMyYf/EABgBAAMBAQAAAAAAAAAAAAAAAAECBAMG/8QAHhEAAgICAgMAAAAAAAAAAAAAAQIABAMRBRJRYbH/2gAMAwEAAhEDEQA/AElp8c9HKoQaqLS43W8QvcY1lQQm2SJDgKh9T+6L7Ff4oljn2u5fPyU9BM21s0q09y9k5+65ZtjjQtuA21cHH3nUdXkEDUBU1HYkxuVPkvSJE4qqWXdtExHUASyo8ocpVVE1SVeXHKkGvYk4iKUxHsubdEIiRPUfWAePb1CMghrVbXqyZ2yq7Z6e2O0LxE2TfxFGvxmK9I4ULsGJRPpOsb16hRtxGfc//9k%3D';\n" + "bas64Images['av'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAIhAAAgICAQQDAQAAAAAAAAAAAQMCBAUSBgcREyEAFCIW/8QAGQEAAgMBAAAAAAAAAAAAAAAAAAMBAgQF/8QAIBEAAgIBBAMBAAAAAAAAAAAAAQMAAgQRITFBEiIyUf/aAAwDAQACEQMRAD8AN4jib9bjyW5bLNViv5tNiwtUG2zCrdrxrq1S6H1GEyOpgZegfitwdZ2g1TU1VUAN/ZF1nx+WhiOVPZk52KhXUsRQz7CyVXLKGIl45wgoS7R7yhE/g/Cotrr1FZGSopFAPccmCdBebZS/naXHZZmziry6dpGPyA8loawTOUT4GSkvZKwREeo6AAdpRG9zXeZa5ACSsjnuZvrLzu5kuR5rEKtvsVhdmLDWTZESK5/pYTt4wCwbSHYjaI19DvIAkPyPOtQB8if/2Q%3D%3D';\n" + "bas64Images['ana'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIhAAAwABBAICAwAAAAAAAAAAAQIDBAUGERIAEyEiFDFB/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEAP/EACERAAEEAQQDAQAAAAAAAAAAAAEAAgMRIQQSImFBkeGx/9oADAMBAAIRAxEAPwDAbm3brcdw58VzkVUVGAf0duThCpLF4UYkv9iSx58Dz+pZDXsJmy90a5bUbc5o7JGzTaXqV14uiAq04xYfUkfB8KZU9b2uq6xarHvkBhPMgcqkkXrD8d+AkKfZODxw3Un58klZKbotAxWM4+qCaOZxNOa0YrFnH1N0La/fPWWn2fIyaQeMoUqW7H2CxILJNQeoP7P882nZMDz210m0sc4dz211flf/2Q%3D%3D';\n" + "bas64Images['vshare'] = bas64Images['vspam'];\n" + "bas64Images['fc'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAwUGB//EACgQAAEDAwQBAgcAAAAAAAAAAAECAwQFBhEAEhMhBxQVIjEyM1Fhgf/EABgBAAMBAQAAAAAAAAAAAAAAAAECBQME/8QAIhEAAAYBAwUAAAAAAAAAAAAAAAECAwQSESEiMTJBYXGh/9oADAMBAAIRAxEAPwDYPIdzXKzUEUa2nUe4qbBUgfdSVdhz4hxlISPluH7GMa45Dm6t0oP7gSJzz1yba57+gW3vIrkO20zLyAhPR+qhKb2qS1lexvnabKltLVlIwEkZPXWtDmNKXVB5IVUEsklfqxqGN5UiqJmRK9b1PEuvxgqKCdm30zmSoOcj8bICvpwSQT+M6EiMTng+ASbRe+Nwj3LAve9qkmRd7KKNHYiGMqG0ORqRvdS7hwsTio8am0lO5OP7pI0JLRY5DqVkf//Z';\n" + "bas64Images['skr'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAABAUGB//EACUQAAEDAgUEAwAAAAAAAAAAAAIBAwQGEQAFBxIhCBMVMTJBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDPqj0bpHJ2kkD5yTEIlEHtsZq+0hHgSTcvLg+vV0vbFkS0DC0ppCe0TkadOacQEdGJJ7YOEClt3AogYkl/zEqw0q7qdk1Q0ITqYigo2sQPEvI+lsQEnF8DEo7rBIezLyD+Xq4720ZRvvijSAPxQWxaQRt9WwH/2Q%3D%3D';\n" + "bas64Images['hdr'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQMG/8QAJBAAAQMEAQQDAQAAAAAAAAAAAQIDBAUGBxEAEhMUMSEiQSP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJYzwrRY8GPGdpcCrXE9BjVCa7VS840PNClsRorLBHpCNuPKJ0fzgH5dxJZ1Tx/Dve0acmhVD6+dTErKo6wXewspJ2AUOeiPhQ4COPMw46ua2KbTbwjLYuKixRE8tHfSl+KgaH9I2l61raFfH6OBjMj5Jt+iUCbZ1nzZUuNIlJdSJKSGoMdBCxGY6/u5tY31KHrlH//Z';\n" + "bas64Images['enc'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgQH/8QAJBAAAQQABQQDAAAAAAAAAAAAAgEDBAUABgcREhMUITEiUqH/xAAYAQACAwAAAAAAAAAAAAAAAAACAwEEBf/EACARAAEEAgMAAwAAAAAAAAAAAAEAAgQRA0EFElETMfH/2gAMAwEAAhEDEQA/AMj0ryAxc5eubyTQu3/bkkeDCaeJjd1EQjXmBCvgTH3jPm5y0hod0vf6m427q1BqrlWupxp5sCodo+9aMJda64T6Nvsqm/F0lJS5IW+CgyfksWHdd+qcuPrqrSTRbXGoyDluxqJ0CRJcmSFfbeY4bIhAAKioSj66X7ihy/FvkkdSBXqOPla37tGtVdRK/OL0Q4bL7QsK4RddBRfnx8JxI/rguF4t0RpDiDfifOljLVaX/9k%3D';\n" + "bas64Images['dec'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABwj/xAAmEAABBAAFAwUBAAAAAAAAAAABAgMEBQAGBxESEyIxFCEjUWGB/8QAGAEAAgMAAAAAAAAAAAAAAAAABAYBAgP/xAAjEQACAgEEAAcAAAAAAAAAAAABAgADMQQFEiERIjJCYYHh/9oADAMBAAIRAxEAPwCaq/K99NejBuvkdGQUcX+kvp8FnbnzI48f3fbFGcCSBES4gaSJtLTLZrTUvxW2jFvvVuupWsFBX8SlFHelR+/5gCprun8eQb29dfc1bjjESMsa9adQtO6WlflONWcOGyxICo7itltNJbPclKgRun2/ML26bTqrbWKDyn5/YdpLq19RgFqJexLzNkuxhuF2O4G0ocIKd+CAnwoAjxhl22hqqFVsiCaywPYSMT//2Q%3D%3D';\n" + "bas64Images['rip'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQL/xAAjEAACAQMEAwEBAQAAAAAAAAACAwEEBQYHERITABQiIUJS/8QAGAEAAgMAAAAAAAAAAAAAAAAAAgMAAQT/xAAkEQABAwIFBQEAAAAAAAAAAAABAAIRAwQSITFBYRMUIiNCUf/aAAwDAQACEQMRAD8AP0wxDT/FsRpbxlVnpL7cbyqW05FwcS1En2euU3CaSlXAJVLCfy/kxg/0PFtuKb8vsbLO26puMNMvGvCJ1twjDa2xlleJWtFjilbKblSb7NawWDTMH1kdtIrqcMj8kAlsUxz+Z8HvKc4PvfhWLukIDj5u0CvSvWDATxlNj1BfUpZbI2tlUgGISAiIgs+y29dV7HVyDf8AzExJ/ZeMp29JmYEOOvKcGtbECDuULrBq1jNys8YzhneNplknW94cgKeQN3S6o51XI2fTpLjyMZL95z4BtKGLqFvs/VAwEAOE4dF//9k%3D';\n" + "bas64Images['warez'] = bas64Images['rip'];\n" + "bas64Images['vddos'] = bas64Images['vspam'];\n" + "bas64Images['rddos'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgEC/8QAJBAAAQQBAwUBAQEAAAAAAAAAAwECBAUGBxESABMUISJBJDH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AEmrsrVLD6ONR45d+SJXTbMs05GCnLFYqEWIxxFcpHciKjOH1tsn50G9Oq7VDOMUk47leRPhLXHDISyrjNfOII4eYgEKJWo3gq/e6cl/zpQgzSomamyLKqWq8EmJWAViWCSGtlkJ6e7xyNa5Aoo13+kX3t66C4lGk6Wx6bHA0bJT78ks0iSKQ3vocSKX+gj0b3l7eyck/fzboP/Z';\n" + "bas64Images['txt'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAQABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABAb/xAAhEAABBAMAAwADAAAAAAAAAAACAQMEBQYSEwcRFAghIv/EABYBAQEBAAAAAAAAAAAAAAAAAAIDBP/EAB0RAAIDAAIDAAAAAAAAAAAAAAABAgMRBBIhcfD/2gAMAwEAAhEDEQA/ABeP8HoBxzGOuKxpQXNa7ZOWAONS5JJE1GWYRZFfNMnhJ5owYE1AlbRE16Og5sq40J1uXbGgAvyOw7BarA4FpjdacInrX51+iuKtdEUZdPUBONEdMNSbDY9kXmi++iukeNxwZQ4bnNaHjvG6sMlp24oVCxLGon2USOPV7s2Smy9VWREog4K+uuiqnogVNt61KOb5X3smiO85WGHt+No9NQ21XOJu/OSLdc5C3KOUbmDzjUGHWtCRaf0mh6/pOip6RDZLsUP/2Q%3D%3D';\n" + "bas64Images['img'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAPAA8DAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAEFB//EACcQAAICAQIFAwUAAAAAAAAAAAECAwQFABEGEhMxQQchI0JDUXGR/8QAFgEBAQEAAAAAAAAAAAAAAAAABAMB/8QAHxEAAgEEAwEBAAAAAAAAAAAAAQIAAwQRIRIxkRVR/9oADAMBAAIRAxEAPwDBsBwCuYxcWRindOnzG7VKfL0l+9B4kQfUO6/r30atchcgbMXQtC++l/Y83geGaZYRGQVQQI7Dt8rD8soLJufIGo21w79xVa0pJS5bDZg3qNMK8Ar1OhPXAETxyFVUjsQAPGtWywSc55e+yf0DwCY0JM4izVTNVq9xgle/Gqwy14upyvt3m2beNN+3Kv8ANMC4gHct3P/Z';\n" + "bas64Images['exe'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAQABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQP/xAAmEAACAgEEAAUFAAAAAAAAAAABAgMEEQUGBxIACBMUQhYhIzEy/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEx/9oADAMBAAIRAxEAPwBviHhnj/Tdgw7tuUBrtoVzMxokX5JJ68pIlpuvQo/wCKFI+RJGRqonynwzxtqG2ItxRVfpyxqrZhiudatuOzalaxM7rI/55AowtfP8g9CP34lAPGnmHl0+pajaw+rVq0cUy15xVo+3o1Hb3EVanDlpLHoH1MhipAyeuG8WAjk/zJ6hq4U0IVrvplp4HoO8csE3bLxTGOWJbCSwFOjlGxkkBsH7sNf/2Q%3D%3D';\n" + "bas64Images['activespam'] = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAQABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAkEAACAwAABAcBAAAAAAAAAAACAwEEBQAREhMGFBYhIiMyFf/EABcBAAMBAAAAAAAAAAAAAAAAAAABBQb/xAAhEQACAQUAAgMBAAAAAAAAAAABAhEAAwQFEhNBFDFhIv/aAAwDAQACEQMRAD8AiMIbOq/0FhWM/cVtWYuaOoupaXsZK19grKfMugEgoDEljK5OCjq/MnEcTSqJZDcgmB6rUbDaZIzLq+a4FFxoHbfXR/abgW8l/oLesZ2KrFseezdY6lpuvrqb3yrK80jrSajJgrKTkIH4/romODm21ktyAYPqlr9pktmWl81wg3Fn+2+uh+1WYnjgcvGuap6Do1F1FUa9mFRZtBCfqQlNUumOwjn1comIKeZzMlPPiq74vwlAZS/IkSJqbstVnPsbx8N0objweGiOj7imv45HTwaepF9/9QqjqNh8rCtbIXfU5Tao9Ydh3sUj7wM/MZiRieBGxvhMCyhwpgSKet1Wcmxsnw3QguJJKNEdD3Ff/9k%3D';\n";

                // Function to generate Apps/Viruses Info for Slaves

                var sAppsTable = 'function generateTooltip(sSlave, sFiles) {\n' + sImages + '	var aFiles = new Array();\n' + '	aFiles["wwl"] = "Waterwall";\n' + '	aFiles["crc"] = "Password";\n' + '	aFiles["fwl"] = "Firewall";\n' + '	aFiles["vspam"] = "SpamVirus";\n' + '	aFiles["mailer"] = "MarketingMailer";\n' + '	aFiles["av"] = "AntiVirus";\n' + '	aFiles["ana"] = "Analyse";\n' + '	aFiles["vshare"] = "ShareWarez";\n' + '	aFiles["fc"] = "FtpCash";\n' + '	aFiles["skr"] = "Seeker";\n' + '	aFiles["hdr"] = "Hider";\n' + '	aFiles["enc"] = "Encryptor";\n' + '	aFiles["dec"] = "Decrypter";\n' + '	aFiles["rip"] = "Warez";\n' + '	aFiles["vddos"] = "DDoSVirus";\n' + '	aFiles["rddos"] = "RemoteDestruction";\n' + '	aFiles["txt"] = "TextFile";\n' + '	aFiles["img"] = "ImageFile";\n' + '	aFiles["exe"] = "Forum";\n' + '	aSlave = sSlave.split("#");\n' + '	aFile = sFiles.split("#");\n' + '	var aMark = new Array();\n' + '	aMark["vspam"] = "";\n' + '	aMark["vddos"] = "";\n' + '	aMark["vshare"] = "";\n' + '	var sTable = "<table><tr><td colspan=\\\"2\\\"><table><tr><td>Last Updated: </td><td>" + aFile[5] + "</td></tr></table></td></tr><tr><td valign=\\\"top\\\"><table><tr bgcolor=\\\"#222222\\\"><td width=\\\"16\\\"></td><td><b>Files</b></td><td width=\\\"10\\\"><b>Level</b></td></tr>";\n' + '	for (var i=0; i<=1; i++) {\n' + '		if ( i == 1 ) {\n' + '			sTable = sTable + "</table></td>";\n' + '			sTable = sTable + "<td valign=\\\"top\\\"><table><tr bgcolor=\\\"#222222\\\"><td width=\\\"16\\\"></td><td><b>Viruses</b></td><td width=\\\"10\\\"><b>Level</b></td></tr>";\n' + '		}\n' + '		if ( (aFile[3] != "" && i == 0) || (aFile[4] != "" && i == 1) ) {\n' + '			var aApps = aFile[((i==0) ? 3 : 4)].split("@");\n' + '			for (var j=0; j < aApps.length; j++) {\n' + '				var aApp = aApps[j].split(" ");\n' + '				//alert(aApp[0] + " == vddos && " + aMark["vspam"] + " ==  && " + aApp[1].replace(".0", "") + " == " + aSlave[2].replace(".0", "") );\n' + '				var color = "#000000";\n' + '				if ( i == 1 && aApp[0] == "vspam" && aMark["vspam"] == "" && aApp[1].replace(".0", "") == aSlave[1].replace(".0", "") ) {\n' + '					aMark["vspam"] = "found"\n' + '					var bgColor = ((aSlave[4] == "S") ? "#B5FFB3" : "#FFD5D5");\n' + '				} else if ( i == 1 && aApp[0] == "vddos" && aMark["vddos"] == "" && aApp[1].replace(".0", "") == aSlave[2].replace(".0", "") ) {\n' + '					aMark["vddos"] = "found"\n' + '					var bgColor = ((aSlave[4] == "D") ? "#B5FFB3" : "#FFD5D5");\n' + '				} else if ( i == 1 && aApp[0] == "vshare" && aMark["vshare"] == "" && aApp[1].replace(".0", "") == aSlave[3].replace(".0", "") ) {\n' + '					aMark["vshare"] = "found"\n' + '					var bgColor = ((aSlave[4] == "W") ? "#B5FFB3" : "#FFD5D5");\n' + '				} else {\n' + '					var bgColor = "#444444";\n' + '					var color = "#FFFFFF";\n' + '					if (j%2) {\n' + '						bgColor = "#222222";\n' + '					}\n' + '				}\n' + '				if ( i == 0 ) {\n' + '					sTable = sTable + "<tr bgcolor=\\\"" + bgColor + "\\\"><td bgcolor=\\\"#000000\\\"><img border=\\\"0\\\" src=\\\"" + bas64Images[((aApp[0] == \'rip\') ? \'warez\' : aApp[0])] + "\\\"></td><td>" + aFiles[aApp[0]] + "." + aApp[0] + "</td><td><b>" + aApp[1] + "</b></td></tr>";\n' + '				} else if ( i == 1 ) {\n' + '					sTable = sTable + "<tr bgcolor=\\\"" + bgColor + "\\\"><td bgcolor=\\\"#000000\\\"><img border=\\\"0\\\" src=\\\"" + bas64Images["activespam"] + "\\\"></td><td><font color=\\\"" + color + "\\\">" + aFiles[aApp[0]] + "." + aApp[0] + "</font></td><td><font color=\\\"" + color + "\\\"><b>" + aApp[1] + "</b></font></td></tr>";\n' + '				}\n' + '			}\n' + '		}\n' + '	}\n' + '	sTable = sTable + "</table></td></tr></table>";\n' + '	return sTable;\n' + '}';


                var sTooltip = 'var config = new Object(); var tt_Debug = true; var tt_Enabled = true; var TagsToTip = true; config. Above = false; config. BgColor = "#E2E7FF"; config. BgImg = ""; config. BorderColor = "#003099"; config. BorderStyle = "solid"; config. BorderWidth = 1; config. CenterMouse = false; config. ClickClose = false; config. ClickSticky = false; config. CloseBtn = false; config. CloseBtnColors = ["#990000", "#FFFFFF", "#DD3333", "#FFFFFF"]; config. CloseBtnText = "&nbsp;X&nbsp;"; config. CopyContent = true; config. Delay = 0; config. Duration = 0; config. Exclusive = false; config. FadeIn = 100; config. FadeOut = 100; config. FadeInterval = 30; config. Fix = null; config. FollowMouse = true; config. FontColor = "#000044"; config. FontFace = "Verdana,Geneva,sans-serif"; config. FontSize = "8pt"; config. FontWeight = "normal"; config. Height = 0; config. JumpHorz = false; config. JumpVert = true; config. Left = false; config. OffsetX = 14; config. OffsetY = 8; config. Opacity = 100; config. Padding = 3; config. Shadow = false; config. ShadowColor = "#C0C0C0"; config. ShadowWidth = 5; config. Sticky = false; config. TextAlign = "left"; config. Title = ""; config. TitleAlign = "left"; config. TitleBgColor = ""; config. TitleFontColor = "#FFFFFF"; config. TitleFontFace = ""; config. TitleFontSize = ""; config. TitlePadding = 2; config. Width = 0;\n' + 'function Tip() { tt_Tip(arguments, null); }\n' + 'function TagToTip() { var t2t = tt_GetElt(arguments[0]); if(t2t) { tt_Tip(arguments, t2t); } }\n' + 'function UnTip() { tt_OpReHref(); if(tt_aV[DURATION] < 0 && (tt_iState & 0x2)) { tt_tDurt.Timer("tt_HideInit()", -tt_aV[DURATION], true); } else if(!(tt_aV[STICKY] && (tt_iState & 0x2))) { tt_HideInit(); } }\n' + 'var tt_aElt = new Array(10); var tt_aV = new Array(); var tt_sContent; var tt_t2t; var tt_t2tDad; var tt_musX; var tt_musY; var tt_over; var tt_x; var tt_y; var tt_w; var tt_h;\n' + 'function tt_Extension() { tt_ExtCmdEnum(); tt_aExt[tt_aExt.length] = this; return this; }\n' + 'function tt_SetTipPos(x, y) { var css = tt_aElt[0].style; tt_x = x; tt_y = y; css.left = x + "px"; css.top = y + "px"; if(tt_ie56) { var ifrm = tt_aElt[tt_aElt.length - 1]; if(ifrm) { ifrm.style.left = css.left; ifrm.style.top = css.top; } } }\n' + 'function tt_HideInit() { if(tt_iState) { tt_ExtCallFncs(0, "HideInit"); tt_iState &= ~(0x4 | 0x8); if(tt_flagOpa && tt_aV[FADEOUT]) { tt_tFade.EndTimer(); if(tt_opa) { var n = Math.round(tt_aV[FADEOUT] / (tt_aV[FADEINTERVAL] * (tt_aV[OPACITY] / tt_opa))); tt_Fade(tt_opa, tt_opa, 0, n); return; } } tt_tHide.Timer("tt_Hide();", 1, false); } }\n' + 'function tt_Hide() { if(tt_db && tt_iState) { tt_OpReHref(); if(tt_iState & 0x2) { tt_aElt[0].style.visibility = "hidden"; tt_ExtCallFncs(0, "Hide"); } tt_tShow.EndTimer(); tt_tHide.EndTimer(); tt_tDurt.EndTimer(); tt_tFade.EndTimer(); if(!tt_op && !tt_ie) { tt_tWaitMov.EndTimer(); tt_bWait = false; } if(tt_aV[CLICKCLOSE] || tt_aV[CLICKSTICKY]) { tt_RemEvtFnc(document, "mouseup", tt_OnLClick); } tt_ExtCallFncs(0, "Kill"); if(tt_t2t && !tt_aV[COPYCONTENT]) { tt_UnEl2Tip(); } tt_iState = 0; tt_over = null; tt_ResetMainDiv(); if(tt_aElt[tt_aElt.length - 1]) { tt_aElt[tt_aElt.length - 1].style.display = "none"; } } }\n' + 'function tt_GetElt(id) { return(document.getElementById ? document.getElementById(id) : document.all ? document.all[id] : null); }\n' + 'function tt_GetDivW(el) { return(el ? (el.offsetWidth || el.style.pixelWidth || 0) : 0); }\n' + 'function tt_GetDivH(el) { return(el ? (el.offsetHeight || el.style.pixelHeight || 0) : 0); }\n' + 'function tt_GetScrollX() { return(window.pageXOffset || (tt_db ? (tt_db.scrollLeft || 0) : 0)); }\n' + 'function tt_GetScrollY() { return(window.pageYOffset || (tt_db ? (tt_db.scrollTop || 0) : 0)); }\n' + 'function tt_GetClientW() { return tt_GetWndCliSiz("Width"); }\n' + 'function tt_GetClientH() { return tt_GetWndCliSiz("Height"); }\n' + 'function tt_GetEvtX(e) { return (e ? ((typeof(e.pageX) != tt_u) ? e.pageX : (e.clientX + tt_GetScrollX())) : 0); }\n' + 'function tt_GetEvtY(e) { return (e ? ((typeof(e.pageY) != tt_u) ? e.pageY : (e.clientY + tt_GetScrollY())) : 0); }\n' + 'function tt_AddEvtFnc(el, sEvt, PFnc) { if(el) { if(el.addEventListener) { el.addEventListener(sEvt, PFnc, false); } else { el.attachEvent("on" + sEvt, PFnc); } } }\n' + 'function tt_RemEvtFnc(el, sEvt, PFnc) { if(el) { if(el.removeEventListener) { el.removeEventListener(sEvt, PFnc, false); } else { el.detachEvent("on" + sEvt, PFnc); } } }\n' + 'function tt_GetDad(el) { return(el.parentNode || el.parentElement || el.offsetParent); }\n' + 'function tt_MovDomNode(el, dadFrom, dadTo) { if(dadFrom) { dadFrom.removeChild(el); } if(dadTo) { dadTo.appendChild(el); } }\n' + 'var tt_aExt = new Array(); var tt_db; var tt_op; var tt_ie; var tt_ie56; var tt_bBoxOld; var tt_body; var tt_ovr_; var tt_flagOpa; var tt_maxPosX; var tt_maxPosY; var tt_iState = 0; var tt_opa; var tt_bJmpVert; var tt_bJmpHorz; var tt_elDeHref; var tt_tShow = new Number(0); var tt_tHide = new Number(0); var tt_tDurt = new Number(0); var tt_tFade = new Number(0); var tt_tWaitMov = new Number(0); var tt_bWait = false; var tt_u = "undefined";\n' + 'function tt_Init() { tt_MkCmdEnum(); if(!tt_Browser() || !tt_MkMainDiv()) { return; } tt_IsW3cBox(); tt_OpaSupport(); tt_AddEvtFnc(document, "mousemove", tt_Move); if(TagsToTip || tt_Debug) { tt_SetOnloadFnc(); } tt_AddEvtFnc(window, "unload", tt_Hide); }\n' + 'function tt_MkCmdEnum() { var n = 0; for(var i in config) { eval("window." + i.toString().toUpperCase() + " = " + n++); } tt_aV.length = n; }\n' + 'function tt_Browser() { var n; var nv; var n6; var w3c; n = navigator.userAgent.toLowerCase(); nv = navigator.appVersion; tt_op = (document.defaultView && typeof(eval("w" + "indow" + "." + "o" + "p" + "er" + "a")) != tt_u); tt_ie = n.indexOf("msie") != -1 && document.all && !tt_op; if(tt_ie) { var ieOld = (!document.compatMode || document.compatMode == "BackCompat"); tt_db = !ieOld ? document.documentElement : (document.body || null); if(tt_db) { tt_ie56 = parseFloat(nv.substring(nv.indexOf("MSIE") + 5)) >= 5.5 && typeof document.body.style.maxHeight == tt_u; } } else { tt_db = document.documentElement || document.body || (document.getElementsByTagName ? document.getElementsByTagName("body")[0] : null); if(!tt_op) { n6 = document.defaultView && typeof document.defaultView.getComputedStyle != tt_u; w3c = !n6 && document.getElementById; } } tt_body = (document.getElementsByTagName ? document.getElementsByTagName("body")[0] : (document.body || null)); if(tt_ie || n6 || tt_op || w3c) { if(tt_body && tt_db) { if(document.attachEvent || document.addEventListener) { return true; } } else { tt_Err("wz_tooltip.js must be included INSIDE the body section, immediately after the opening <body> tag.", false); } } tt_db = null; return false; }\n' + 'function tt_MkMainDiv() { if(tt_body.insertAdjacentHTML) { tt_body.insertAdjacentHTML("afterBegin", tt_MkMainDivHtm()); } else if(typeof tt_body.innerHTML != tt_u && document.createElement && tt_body.appendChild) { tt_body.appendChild(tt_MkMainDivDom()); } if(window.tt_GetMainDivRefs && tt_GetMainDivRefs()) { return true; } tt_db = null; return false; }\n' + 'function tt_MkMainDivHtm() { return( \'<div id="WzTtDiV"></div>\' + (tt_ie56 ? (\'<iframe id="WzTtIfRm" src="javascript:false" scrolling="no" frameborder="0" style="filter:Alpha(opacity=0);position:absolute;top:0px;left:0px;display:none;"></iframe>\') : "") ); }\n' + 'function tt_MkMainDivDom() { var el = document.createElement("div"); if(el) { el.id = "WzTtDiV"; } return el; }\n' + 'function tt_GetMainDivRefs() { tt_aElt[0] = tt_GetElt("WzTtDiV"); if(tt_ie56 && tt_aElt[0]) { tt_aElt[tt_aElt.length - 1] = tt_GetElt("WzTtIfRm"); if(!tt_aElt[tt_aElt.length - 1]) { tt_aElt[0] = null; } } if(tt_aElt[0]) { var css = tt_aElt[0].style; css.visibility = "hidden"; css.position = "absolute"; css.overflow = "hidden"; return true; } return false; }\n' + 'function tt_ResetMainDiv() { tt_SetTipPos(0, 0); tt_aElt[0].innerHTML = ""; tt_aElt[0].style.width = "0px"; tt_h = 0; }\n' + 'function tt_IsW3cBox() { var css = tt_aElt[0].style; css.padding = "10px"; css.width = "40px"; tt_bBoxOld = (tt_GetDivW(tt_aElt[0]) == 40); css.padding = "0px"; tt_ResetMainDiv(); }\n' + 'function tt_OpaSupport() { var css = tt_body.style; tt_flagOpa = (typeof(css.KhtmlOpacity) != tt_u) ? 2 : (typeof(css.KHTMLOpacity) != tt_u) ? 3 : (typeof(css.MozOpacity) != tt_u) ? 4 : (typeof(css.opacity) != tt_u) ? 5 : (typeof(css.filter) != tt_u) ? 1 : 0; }\n' + 'function tt_SetOnloadFnc() { tt_AddEvtFnc(document, "DOMContentLoaded", tt_HideSrcTags); tt_AddEvtFnc(window, "load", tt_HideSrcTags); if(tt_body.attachEvent) { tt_body.attachEvent("onreadystatechange", function() { if(tt_body.readyState == "complete") { tt_HideSrcTags(); } } ); } if(/WebKit|KHTML/i.test(navigator.userAgent)) { var t = setInterval(function() { if(/loaded|complete/.test(document.readyState)) { clearInterval(t); tt_HideSrcTags(); } }, 10); } }\n' + 'function tt_HideSrcTags() { if(!window.tt_HideSrcTags || window.tt_HideSrcTags.done) { return; } window.tt_HideSrcTags.done = true; if(!tt_HideSrcTagsRecurs(tt_body)) { tt_Err("There are HTML elements to be converted to tooltips. If you want these HTML elements to be automatically hidden, you must edit wz_tooltip.js, and set TagsToTip in the global tooltip configuration to true.", true); } }\n' + 'function tt_HideSrcTagsRecurs(dad) { var ovr; var asT2t; var a = dad.childNodes || dad.children || null; for(var i = a ? a.length : 0; i;) { --i; if(!tt_HideSrcTagsRecurs(a[i])) { return false; } ovr = a[i].getAttribute ? (a[i].getAttribute("onmouseover") || a[i].getAttribute("onclick")) : (typeof a[i].onmouseover == "function") ? (a[i].onmouseover || a[i].onclick) : null; if(ovr) { asT2t = ovr.toString().match(/TagToTip\\\s*\\\(\\\s*\\\'[^\\\'.]+\'\\\s*[\\\),]/); if(asT2t && asT2t.length) { if(!tt_HideSrcTag(asT2t[0])) { return false; } } } } return true; }\n' + 'function tt_HideSrcTag(sT2t) { var id; var el; id = sT2t.replace(/.+\'([^\'.]+)\'.+/, "$1"); el = tt_GetElt(id); if(el) { if(tt_Debug && !TagsToTip) { return false; } else { el.style.display = "none"; } } else { tt_Err("Invalid ID" + id + "passed to TagToTip().  There exists no HTML element with that ID.", true); } return true; }\n' + 'function tt_Tip(arg, t2t) { if(!tt_db || (tt_iState & 0x8)) { return; } if(tt_iState) { tt_Hide(); } if(!tt_Enabled) { return; } tt_t2t = t2t; if(!tt_ReadCmds(arg)) { return; } tt_iState = 0x1 | 0x4; tt_AdaptConfig1(); tt_MkTipContent(arg); tt_MkTipSubDivs(); tt_FormatTip(); tt_bJmpVert = false; tt_bJmpHorz = false; tt_maxPosX = tt_GetClientW() + tt_GetScrollX() - tt_w - 1; tt_maxPosY = tt_GetClientH() + tt_GetScrollY() - tt_h - 1; tt_AdaptConfig2(); tt_OverInit(); tt_ShowInit(); tt_Move(); }\n' + 'function tt_ReadCmds(a) { var i; i = 0; for(var j in config) { tt_aV[i++] = config[j]; } if(a.length & 1) { for(i = a.length - 1; i > 0; i -= 2) { tt_aV[a[i - 1]] = a[i]; } return true; } tt_Err("Incorrect call of Tip() or TagToTip(). Each command must be followed by a value.", true); return false; }\n' + 'function tt_AdaptConfig1() { tt_ExtCallFncs(0, "LoadConfig"); if(!tt_aV[TITLEBGCOLOR].length) { tt_aV[TITLEBGCOLOR] = tt_aV[BORDERCOLOR]; } if(!tt_aV[TITLEFONTCOLOR].length) { tt_aV[TITLEFONTCOLOR] = tt_aV[BGCOLOR]; } if(!tt_aV[TITLEFONTFACE].length) { tt_aV[TITLEFONTFACE] = tt_aV[FONTFACE]; } if(!tt_aV[TITLEFONTSIZE].length) { tt_aV[TITLEFONTSIZE] = tt_aV[FONTSIZE]; } if(tt_aV[CLOSEBTN]) { if(!tt_aV[CLOSEBTNCOLORS]) { tt_aV[CLOSEBTNCOLORS] = new Array("", "", "", ""); } for(var i = 4; i;) {--i; if(!tt_aV[CLOSEBTNCOLORS][i].length) { tt_aV[CLOSEBTNCOLORS][i] = (i & 1) ? tt_aV[TITLEFONTCOLOR] : tt_aV[TITLEBGCOLOR]; }} if(!tt_aV[TITLE].length) { tt_aV[TITLE] = " "; } } if(tt_aV[OPACITY] == 100 && typeof tt_aElt[0].style.MozOpacity != tt_u && !Array.every) { tt_aV[OPACITY] = 99; } if(tt_aV[FADEIN] && tt_flagOpa && tt_aV[DELAY] > 100) { tt_aV[DELAY] = Math.max(tt_aV[DELAY] - tt_aV[FADEIN], 100); } }\n' + 'function tt_AdaptConfig2() { if(tt_aV[CENTERMOUSE]) { tt_aV[OFFSETX] -= ((tt_w - (tt_aV[SHADOW] ? tt_aV[SHADOWWIDTH] : 0)) >> 1); tt_aV[JUMPHORZ] = false; } }\n' + 'function tt_MkTipContent(a) { if(tt_t2t) { if(tt_aV[COPYCONTENT]) { tt_sContent = tt_t2t.innerHTML; } else { tt_sContent = ""; } } else { tt_sContent = a[0]; } tt_ExtCallFncs(0, "CreateContentString"); }\n' + 'function tt_MkTipSubDivs() { var sCss = "position:relative;margin:0px;padding:0px;border-width:0px;left:0px;top:0px;line-height:normal;width:auto;"; var sTbTrTd = \' cellspacing="0" cellpadding="0" border="0" style="\' + sCss + \'"><tbody style="\' + sCss + \'"><tr><td \'; tt_aElt[0].style.width = tt_GetClientW() + "px"; tt_aElt[0].innerHTML = ("" + (tt_aV[TITLE].length ? (\'<div id="WzTiTl" style="position:relative;z-index:1;">\' + \'<table id="WzTiTlTb"\' + sTbTrTd + \'id="WzTiTlI" style="\' + sCss + \'">\' + tt_aV[TITLE] + "</td>" + (tt_aV[CLOSEBTN] ? (\'<td align="right" style="\' + sCss + \'text-align:right;">\' + \'<span id="WzClOsE" style="position:relative;left:2px;padding-left:2px;padding-right:2px;\' + \'cursor:\' + (tt_ie ? \'hand\' : \'pointer\') + \';" onmouseover="tt_OnCloseBtnOver(1)" onmouseout="tt_OnCloseBtnOver(0)" onclick="tt_HideInit()">\' + tt_aV[CLOSEBTNTEXT] + \'</span></td>\') : "") + "</tr></tbody></table></div>") : "") + \'<div id="WzBoDy" style="position:relative;z-index:0;">\' + "<table" + sTbTrTd + \'id="WzBoDyI" style="\' + sCss + \'">\' + tt_sContent + "</td></tr></tbody></table></div>" + (tt_aV[SHADOW] ? (\'<div id="WzTtShDwR" style="position:absolute;overflow:hidden;"></div><div id="WzTtShDwB" style="position:relative;overflow:hidden;"></div>\') : "") ); tt_GetSubDivRefs(); if(tt_t2t && !tt_aV[COPYCONTENT]) { tt_El2Tip(); } tt_ExtCallFncs(0, "SubDivsCreated"); }\n' + 'function tt_GetSubDivRefs() { var aId = new Array("WzTiTl", "WzTiTlTb", "WzTiTlI", "WzClOsE", "WzBoDy", "WzBoDyI", "WzTtShDwB", "WzTtShDwR"); for(var i = aId.length; i; --i) { tt_aElt[i] = tt_GetElt(aId[i - 1]); } }\n' + 'function tt_FormatTip() { var css; var w; var h; var pad = tt_aV[PADDING]; var padT; var wBrd = tt_aV[BORDERWIDTH]; var iOffY; var iOffSh; var iAdd = (pad + wBrd) << 1; if(tt_aV[TITLE].length) { padT = tt_aV[TITLEPADDING]; css = tt_aElt[1].style; css.background = tt_aV[TITLEBGCOLOR]; css.paddingTop = css.paddingBottom = padT + "px"; css.paddingLeft = css.paddingRight = (padT + 2) + "px"; css = tt_aElt[3].style; css.color = tt_aV[TITLEFONTCOLOR]; if(tt_aV[WIDTH] == -1) { css.whiteSpace = "nowrap"; } css.fontFamily = tt_aV[TITLEFONTFACE]; css.fontSize = tt_aV[TITLEFONTSIZE]; css.fontWeight = "bold"; css.textAlign = tt_aV[TITLEALIGN]; if(tt_aElt[4]) { css = tt_aElt[4].style; css.background = tt_aV[CLOSEBTNCOLORS][0]; css.color = tt_aV[CLOSEBTNCOLORS][1]; css.fontFamily = tt_aV[TITLEFONTFACE]; css.fontSize = tt_aV[TITLEFONTSIZE]; css.fontWeight = "bold"; } if(tt_aV[WIDTH] > 0) { tt_w = tt_aV[WIDTH]; } else { tt_w = tt_GetDivW(tt_aElt[3]) + tt_GetDivW(tt_aElt[4]); if(tt_aElt[4]) { tt_w += pad; } if(tt_aV[WIDTH] < -1 && tt_w > -tt_aV[WIDTH]) { tt_w = -tt_aV[WIDTH]; } } iOffY = -wBrd; } else { tt_w = 0; iOffY = 0; } css = tt_aElt[5].style; css.top = iOffY + "px"; if(wBrd) { css.borderColor = tt_aV[BORDERCOLOR]; css.borderStyle = tt_aV[BORDERSTYLE]; css.borderWidth = wBrd + "px"; } if(tt_aV[BGCOLOR].length) { css.background = tt_aV[BGCOLOR]; } if(tt_aV[BGIMG].length) { css.backgroundImage = "url(" + tt_aV[BGIMG] + ")"; } css.padding = pad + "px"; css.textAlign = tt_aV[TEXTALIGN]; if(tt_aV[HEIGHT]) { css.overflow = "auto"; if(tt_aV[HEIGHT] > 0) { css.height = (tt_aV[HEIGHT] + iAdd) + "px"; } else { tt_h = iAdd - tt_aV[HEIGHT]; } } css = tt_aElt[6].style; css.color = tt_aV[FONTCOLOR]; css.fontFamily = tt_aV[FONTFACE]; css.fontSize = tt_aV[FONTSIZE]; css.fontWeight = tt_aV[FONTWEIGHT]; css.textAlign = tt_aV[TEXTALIGN]; if(tt_aV[WIDTH] > 0) { w = tt_aV[WIDTH]; } else if(tt_aV[WIDTH] == -1 && tt_w) { w = tt_w; } else { w = tt_GetDivW(tt_aElt[6]); if(tt_aV[WIDTH] < -1 && w > -tt_aV[WIDTH]) { w = -tt_aV[WIDTH]; } } if(w > tt_w) { tt_w = w; } tt_w += iAdd; if(tt_aV[SHADOW]) { tt_w += tt_aV[SHADOWWIDTH]; iOffSh = Math.floor((tt_aV[SHADOWWIDTH] * 4) / 3); css = tt_aElt[7].style; css.top = iOffY + "px"; css.left = iOffSh + "px"; css.width = (tt_w - iOffSh - tt_aV[SHADOWWIDTH]) + "px"; css.height = tt_aV[SHADOWWIDTH] + "px"; css.background = tt_aV[SHADOWCOLOR]; css = tt_aElt[8].style; css.top = iOffSh + "px"; css.left = (tt_w - tt_aV[SHADOWWIDTH]) + "px"; css.width = tt_aV[SHADOWWIDTH] + "px"; css.background = tt_aV[SHADOWCOLOR]; } else { iOffSh = 0; } tt_SetTipOpa(tt_aV[FADEIN] ? 0 : tt_aV[OPACITY]); tt_FixSize(iOffY, iOffSh); }\n' + 'function tt_FixSize(iOffY, iOffSh) { var wIn; var wOut; var h; var add; var pad = tt_aV[PADDING]; var wBrd = tt_aV[BORDERWIDTH]; var i; tt_aElt[0].style.width = tt_w + "px"; tt_aElt[0].style.pixelWidth = tt_w; wOut = tt_w - ((tt_aV[SHADOW]) ? tt_aV[SHADOWWIDTH] : 0); wIn = wOut; if(!tt_bBoxOld) { wIn -= (pad + wBrd) << 1; } tt_aElt[5].style.width = wIn + "px"; if(tt_aElt[1]) { wIn = wOut - ((tt_aV[TITLEPADDING] + 2) << 1); if(!tt_bBoxOld) { wOut = wIn; } tt_aElt[1].style.width = wOut + "px"; tt_aElt[2].style.width = wIn + "px"; } if(tt_h) { h = tt_GetDivH(tt_aElt[5]); if(h > tt_h) { if(!tt_bBoxOld) { tt_h -= (pad + wBrd) << 1; } tt_aElt[5].style.height = tt_h + "px"; } } tt_h = tt_GetDivH(tt_aElt[0]) + iOffY; if(tt_aElt[8]) { tt_aElt[8].style.height = (tt_h - iOffSh) + "px"; } i = tt_aElt.length - 1; if(tt_aElt[i]) { tt_aElt[i].style.width = tt_w + "px"; tt_aElt[i].style.height = tt_h + "px"; } }\n' + 'function tt_DeAlt(el) { var aKid; if(el) { if(el.alt) { el.alt = ""; } if(el.title) { el.title = ""; } aKid = el.childNodes || el.children || null; if(aKid) { for(var i = aKid.length; i;) { tt_DeAlt(aKid[--i]); } } } }\n' + 'function tt_OpDeHref(el) { if(!tt_op) { return; } if(tt_elDeHref) { tt_OpReHref(); } while(el) { if(el.hasAttribute && el.hasAttribute("href")) { el.t_href = el.getAttribute("href"); el.t_stats = window.status; el.removeAttribute("href"); el.style.cursor = "hand"; tt_AddEvtFnc(el, "mousedown", tt_OpReHref); window.status = el.t_href; tt_elDeHref = el; break; } el = tt_GetDad(el); } }\n' + 'function tt_OpReHref() { if(tt_elDeHref) { tt_elDeHref.setAttribute("href", tt_elDeHref.t_href); tt_RemEvtFnc(tt_elDeHref, "mousedown", tt_OpReHref); window.status = tt_elDeHref.t_stats; tt_elDeHref = null; } }\n' + 'function tt_El2Tip() { var css = tt_t2t.style; tt_t2t.t_cp = css.position; tt_t2t.t_cl = css.left; tt_t2t.t_ct = css.top; tt_t2t.t_cd = css.display; tt_t2tDad = tt_GetDad(tt_t2t); tt_MovDomNode(tt_t2t, tt_t2tDad, tt_aElt[6]); css.display = "block"; css.position = "static"; css.left = css.top = css.marginLeft = css.marginTop = "0px"; }\n' + 'function tt_UnEl2Tip() { var css = tt_t2t.style; css.display = tt_t2t.t_cd; tt_MovDomNode(tt_t2t, tt_GetDad(tt_t2t), tt_t2tDad); css.position = tt_t2t.t_cp; css.left = tt_t2t.t_cl; css.top = tt_t2t.t_ct; tt_t2tDad = null; }\n' + 'function tt_OverInit() { if(window.event) { tt_over = window.event.target || window.event.srcElement; } else { tt_over = tt_ovr_; } tt_DeAlt(tt_over); tt_OpDeHref(tt_over); }\n' + 'function tt_ShowInit() { tt_tShow.Timer("tt_Show()", tt_aV[DELAY], true); if(tt_aV[CLICKCLOSE] || tt_aV[CLICKSTICKY]) { tt_AddEvtFnc(document, "mouseup", tt_OnLClick); } }\n' + 'function tt_Show() { var css = tt_aElt[0].style; css.zIndex = Math.max((window.dd && dd.z) ? (dd.z + 2) : 0, 1010); if(tt_aV[STICKY] || !tt_aV[FOLLOWMOUSE]) { tt_iState &= ~0x4; } if(tt_aV[EXCLUSIVE]) { tt_iState |= 0x8; } if(tt_aV[DURATION] > 0) { tt_tDurt.Timer("tt_HideInit()", tt_aV[DURATION], true); } tt_ExtCallFncs(0, "Show"); css.visibility = "visible"; tt_iState |= 0x2; if(tt_aV[FADEIN]) { tt_Fade(0, 0, tt_aV[OPACITY], Math.round(tt_aV[FADEIN] / tt_aV[FADEINTERVAL])); } tt_ShowIfrm(); }\n' + 'function tt_ShowIfrm() { if(tt_ie56) { var ifrm = tt_aElt[tt_aElt.length - 1]; if(ifrm) { var css = ifrm.style; css.zIndex = tt_aElt[0].style.zIndex - 1; css.display = "block"; } } }\n' + 'function tt_Move(e) { if(e) { tt_ovr_ = e.target || e.srcElement; } e = e || window.event; if(e) { tt_musX = tt_GetEvtX(e); tt_musY = tt_GetEvtY(e); } if(tt_iState & 0x4) { if(!tt_op && !tt_ie) { if(tt_bWait) { return; } tt_bWait = true; tt_tWaitMov.Timer("tt_bWait = false;", 1, true); } if(tt_aV[FIX]) { tt_iState &= ~0x4; tt_PosFix(); } else if(!tt_ExtCallFncs(e, "MoveBefore")) { tt_SetTipPos(tt_Pos(0), tt_Pos(1)); } tt_ExtCallFncs([tt_musX, tt_musY], "MoveAfter") } }\n' + 'function tt_Pos(iDim) { var iX; var bJmpMod; var cmdAlt; var cmdOff; var cx; var iMax; var iScrl; var iMus; var bJmp; if(iDim) { bJmpMod = tt_aV[JUMPVERT]; cmdAlt = ABOVE; cmdOff = OFFSETY; cx = tt_h; iMax = tt_maxPosY; iScrl = tt_GetScrollY(); iMus = tt_musY; bJmp = tt_bJmpVert; } else { bJmpMod = tt_aV[JUMPHORZ]; cmdAlt = LEFT; cmdOff = OFFSETX; cx = tt_w; iMax = tt_maxPosX; iScrl = tt_GetScrollX(); iMus = tt_musX; bJmp = tt_bJmpHorz; } if(bJmpMod) { if(tt_aV[cmdAlt] && (!bJmp || tt_CalcPosAlt(iDim) >= iScrl + 16)) { iX = tt_PosAlt(iDim); } else if(!tt_aV[cmdAlt] && bJmp && tt_CalcPosDef(iDim) > iMax - 16) { iX = tt_PosAlt(iDim); } else { iX = tt_PosDef(iDim); } } else { iX = iMus; if(tt_aV[cmdAlt]) { iX -= cx + tt_aV[cmdOff] - (tt_aV[SHADOW] ? tt_aV[SHADOWWIDTH] : 0); } else { iX += tt_aV[cmdOff]; } } if(iX > iMax) { iX = bJmpMod ? tt_PosAlt(iDim) : iMax; } if(iX < iScrl)  { iX = bJmpMod ? tt_PosDef(iDim) : iScrl; } return iX; }\n' + 'function tt_PosDef(iDim) { if(iDim) { tt_bJmpVert = tt_aV[ABOVE]; } else { tt_bJmpHorz = tt_aV[LEFT]; } return tt_CalcPosDef(iDim); }\n' + 'function tt_PosAlt(iDim) { if(iDim) { tt_bJmpVert = !tt_aV[ABOVE]; } else { tt_bJmpHorz = !tt_aV[LEFT]; } return tt_CalcPosAlt(iDim); } function tt_CalcPosDef(iDim) { return iDim ? (tt_musY + tt_aV[OFFSETY]) : (tt_musX + tt_aV[OFFSETX]); } function tt_CalcPosAlt(iDim) { var cmdOff = iDim ? OFFSETY : OFFSETX; var dx = tt_aV[cmdOff] - (tt_aV[SHADOW] ? tt_aV[SHADOWWIDTH] : 0); if(tt_aV[cmdOff] > 0 && dx <= 0) { dx = 1; } return((iDim ? (tt_musY - tt_h) : (tt_musX - tt_w)) - dx); }\n' + 'function tt_PosFix() { var iX; var iY; if(typeof(tt_aV[FIX][0]) == "number") { iX = tt_aV[FIX][0]; iY = tt_aV[FIX][1]; } else { if(typeof(tt_aV[FIX][0]) == "string") { el = tt_GetElt(tt_aV[FIX][0]); } else { el = tt_aV[FIX][0]; } iX = tt_aV[FIX][1]; iY = tt_aV[FIX][2]; if(!tt_aV[ABOVE] && el) { iY += tt_GetDivH(el); } for(; el; el = el.offsetParent) { iX += el.offsetLeft || 0; iY += el.offsetTop || 0; } } if(tt_aV[ABOVE]) { iY -= tt_h; } tt_SetTipPos(iX, iY); }\n' + 'function tt_Fade(a, now, z, n) { if(n) { now += Math.round((z - now) / n); if((z > a) ? (now >= z) : (now <= z)) { now = z; } else { tt_tFade.Timer( "tt_Fade(" + a + "," + now + "," + z + "," + (n - 1) + ")", tt_aV[FADEINTERVAL], true ); } } now ? tt_SetTipOpa(now) : tt_Hide(); }\n' + 'function tt_SetTipOpa(opa) { tt_SetOpa(tt_aElt[5], opa); if(tt_aElt[1]) { tt_SetOpa(tt_aElt[1], opa); } if(tt_aV[SHADOW]) { opa = Math.round(opa * 0.8); tt_SetOpa(tt_aElt[7], opa); tt_SetOpa(tt_aElt[8], opa); } }\n' + 'function tt_OnCloseBtnOver(iOver) { var css = tt_aElt[4].style; iOver <<= 1; css.background = tt_aV[CLOSEBTNCOLORS][iOver]; css.color = tt_aV[CLOSEBTNCOLORS][iOver + 1]; }\n' + 'function tt_OnLClick(e) { e = e || window.event; if(!((e.button && e.button & 2) || (e.which && e.which == 3))) { if(tt_aV[CLICKSTICKY] && (tt_iState & 0x4)) { tt_aV[STICKY] = true; tt_iState &= ~0x4; } else if(tt_aV[CLICKCLOSE]) tt_HideInit(); } }\n' + 'function tt_Int(x) { var y; return(isNaN(y = parseInt(x)) ? 0 : y); }\n' + 'Number.prototype.Timer = function(s, iT, bUrge) { if(!this.value || bUrge) { this.value = window.setTimeout(s, iT); } }\n' + 'Number.prototype.EndTimer = function() { if(this.value) { window.clearTimeout(this.value); this.value = 0; } }\n' + 'function tt_GetWndCliSiz(s) { var db; var y = window["inner" + s]; var sC = "client" + s; var sN = "number"; if(typeof y == sN) { var y2; return( ((db = document.body) && typeof(y2 = db[sC]) == sN && y2 &&  y2 <= y) ? y2  : ((db = document.documentElement) && typeof(y2 = db[sC]) == sN && y2 && y2 <= y) ? y2 : y ); } return( ((db = document.documentElement) && (y = db[sC])) ? y : document.body[sC] ); } function tt_SetOpa(el, opa) { var css = el.style; tt_opa = opa; if(tt_flagOpa == 1) { if(opa < 100) { if(typeof(el.filtNo) == tt_u) { el.filtNo = css.filter; } var bVis = css.visibility != "hidden"; css.zoom = "100%"; if(!bVis) { css.visibility = "visible"; } css.filter = "alpha(opacity=" + opa + ")"; if(!bVis) css.visibility = "hidden"; } else if(typeof(el.filtNo) != tt_u) css.filter = el.filtNo; } else { opa /= 100.0; switch(tt_flagOpa) { case 2: css.KhtmlOpacity = opa; break; case 3: css.KHTMLOpacity = opa; break; case 4: css.MozOpacity = opa; break; case 5: css.opacity = opa; break; } } } function tt_Err(sErr, bIfDebug) { if(tt_Debug || !bIfDebug) alert("Tooltip Script Error Message:" + sErr); } function tt_ExtCmdEnum() { var s; for(var i in config) { s = "window." + i.toString().toUpperCase(); if(eval("typeof(" + s + ") == tt_u")) { eval(s + " = " + tt_aV.length); tt_aV[tt_aV.length] = null; } } } function tt_ExtCallFncs(arg, sFnc) { var b = false; for(var i = tt_aExt.length; i;) {--i; var fnc = tt_aExt[i]["On" + sFnc]; if(fnc && fnc(arg)) { b = true; } } return b; } tt_Init();\n';

                var script = document.createElement('script');
                script.type = "text/javascript";
                script.innerHTML = sTooltip;
                document.getElementsByTagName('head')[0].appendChild(script);

                var script = document.createElement('script');
                script.type = "text/javascript";
                script.innerHTML = '\nconfig. Delay = 0;\nconfig. Left = true;\nconfig. ShadowWidth = 1;\nconfig. ShadowColor = "#FFFFFF";\nconfig. BgColor = "#000000";\nconfig. BorderWidth = 2;\nconfig. BorderColor = "#FFFFFF";\n' + sAppsTable;
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } // no chaptcha - end

        GM_setValue('LastRunTime', parseInt(StartTime / 1000));






        /* <![CDATA[ */
        function getStackTrace() {
            var callstack = [];
            var isCallstackPopulated = false;
            try {
                i.dont.exist += 0; //doesn't exist- that's the point
            } catch (e) {
                if (e.stack) { //Firefox
                    var lines = e.stack.split("\n");
                    for (var i = 0, len = lines.length; i < len; i++) {
                        if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
                            callstack.push(lines[i]);
                        }
                    }
                    //Remove call to printStackTrace()
                    callstack.shift();
                    isCallstackPopulated = true;
                } else if (window.opera && e.message) { //Opera
                    var lines = e.message.split("\n");
                    for (var i = 0, len = lines.length; i < len; i++) {
                        if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
                            var entry = lines[i];
                            //Append next line also since it has the file info
                            if (lines[i + 1]) {
                                entry += " at " + lines[i + 1];
                                i++;
                            }
                            callstack.push(entry);
                        }
                    }
                    //Remove call to printStackTrace()
                    callstack.shift();
                    isCallstackPopulated = true;
                }
            }
            if (!isCallstackPopulated) { //IE and Safari
                var currentFunction = arguments.callee.caller;
                while (currentFunction) {
                    var fn = currentFunction.toString();
                    var fname = fn.substring(fn.indexOf("function") + 8, fn.indexOf("(")) || "anonymous";
                    callstack.push(fname);
                    currentFunction = currentFunction.caller;
                }
            }
            //output(callstack);
            return callstack.join("nn");
        }

        function output(arr) {
            //Output whatever you want
            console.info('stack trace', arr.join("nn"));
        }

        /* ]]> */




    } //end of SHU_toString_function();
    /////START OF F**K YOU CHROME UNSAFEWINDOW/////
    var script = document.createElement('script');
    //	alert(hhb_9gag_toString_function.toString());
    script.innerHTML = 'try{(' + SHU_toString_function.toString() + ')();}catch(e){try{alert("Sorry! 9gag.com enhancements crashed, init000 :( exception info: "+e);console.log("e!!:");console.log(e);}catch(eee){alert("dafuq");}}';
    delete SHU_toString_function;
    //	console.log(script.innerHTML);
    document.getElementsByTagName('head')[0].appendChild(script);
    /////END OF F**K YOU CHROME UNSAFEWINDOW



})(); // function wrapper