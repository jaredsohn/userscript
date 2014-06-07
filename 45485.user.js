scr_meta=<><![CDATA[
        // ==UserScript==
        // @name	Fighting Smileys for orkut By Sreejan
        // @version	1.10
        // @author	Sreejan Sur :P
        // @namespace	TEAM BLAKUT
        // @description	Use these animated smileys(violence) in your ScrapBook and HTML community Forums. Just click on the smiley to insert. Enjoy...
        // @include        http://*.orkut.*/*Scrapbook*
        // @include        http://*.orkut.*/*CommMsgs*
        // @include        http://*.orkut.*/*CommMsgPost*
        // ==/UserScript==
        ]]></>;
        
        addEventListener('load', function(event) {
        function getTextArea(n) {
        	return document.getElementsByTagName('textarea')[n];
        }
        
        
        function insertSmiley(){
        	var image = this.getElementsByTagName('img')[0].getAttribute("src");
        	getTextArea(this.getAttribute("gult")).focus();
        	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
        }
        
        function dip() {
        	var smileyarr = new Array();	
        smileyarr["sFi_yeeha"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDO4V9MRoI/AAAAAAAAAK8/VnyNDc5U0g0/sFi_yeeha.gif";
        smileyarr["sFi_wwe"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDO5SObvEI/AAAAAAAAALA/Tr3vgIPv-sA/sFi_wwe.gif";
        smileyarr["sFi_whip2"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDO6PeduNI/AAAAAAAAALE/4equQ_PydUw/sFi_whip2.gif";
        smileyarr["sFi_whip"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDO64789rI/AAAAAAAAALI/tcs_lnt6bJI/sFi_whip.gif";
        smileyarr["sFi_vikingwarrior"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDO7h_mGOI/AAAAAAAAALM/hqOXpNWlP00/sFi_vikingwarrior.gif";
        smileyarr["sFi_vikingspin"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDO8h5k3eI/AAAAAAAAALQ/ufNtx-cQovg/sFi_vikingspin.gif";
        smileyarr["sFi_vikingax"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDO92jVUKI/AAAAAAAAALU/8Q_aI39rVvA/sFi_vikingax.gif";
        smileyarr["sFi_UTtranslocatorfast"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDO-y1S48I/AAAAAAAAALY/OcGCHam2RUI/sFi_UTtranslocatorfast.gif";
        smileyarr["sFi_UTtranslocator"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDO_4pSoCI/AAAAAAAAALc/ejhqYx2sw1o/sFi_UTtranslocator.gif";
        smileyarr["sFi_UTshockrifle"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPAfBYNII/AAAAAAAAALg/agzTZKx0kYQ/sFi_UTshockrifle.gif";
        smileyarr["sFi_UTrocketlauncher"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPBp5baOI/AAAAAAAAALk/F7BixxIkkpQ/sFi_UTrocketlauncher.gif";
        smileyarr["sFi_UTripper"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPC3KXqSI/AAAAAAAAALo/qV-6Pp1NaX8/sFi_UTripper.gif";
        smileyarr["sFi_UTminigun"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPDwOfKmI/AAAAAAAAALs/Qqcah3vK03E/sFi_UTminigun.gif";
        smileyarr["sFi_UTlinkgun"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPEgl9gFI/AAAAAAAAALw/XQakqrvSDCU/sFi_UTlinkgun.gif";
        smileyarr["sFi_UTflackcannon"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPFTRR-dI/AAAAAAAAAL0/eVuPCNJwjvY/sFi_UTflackcannon.gif";
        smileyarr["sFi_UTenforcer"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPF1CraDI/AAAAAAAAAL4/2hc174zeVW0/sFi_UTenforcer.gif";
        smileyarr["sFi_UTbiorifle"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPGo68diI/AAAAAAAAAL8/b7LVNHuORwI/sFi_UTbiorifle.gif";
        smileyarr["sFi_tank"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDPHYSjuPI/AAAAAAAAAMA/Wx3QhD0Qm-k/sFi_tank.gif";
        smileyarr["sFi_swordfight"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPH0RzVBI/AAAAAAAAAME/s0z5Gm0B2Nw/sFi_swordfight.gif";
        smileyarr["sFi_stopbullets"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPImkLhPI/AAAAAAAAAMI/wKDMH9TLfuI/sFi_stopbullets.gif";
        smileyarr["sFi_stickwack"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPJ824p0I/AAAAAAAAAMM/wUKeFBIYcUc/sFi_stickwack.gif";
        smileyarr["sFi_stickpoke2"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPKgUzIpI/AAAAAAAAAMQ/XAZrB_KJkkc/sFi_stickpoke2.gif";
        smileyarr["sFi_stickpoke"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDPLGn4l9I/AAAAAAAAAMU/slK-hb5ze6M/sFi_stickpoke.gif";
        smileyarr["sFi_sniper2"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDPMBp0YdI/AAAAAAAAAMc/UrmNBZIk5aw/sFi_sniper2.gif";
        smileyarr["sFi_sniper"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDPNMI4guI/AAAAAAAAAMg/tlFpoTrnRXw/sFi_sniper.gif";
        smileyarr["sFi_slapfight"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPN3puFPI/AAAAAAAAAMk/GPDPGRF52dc/sFi_slapfight.gif";
        smileyarr["sFi_slapface"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPO3tUnPI/AAAAAAAAAMo/vH75CEWEQhw/sFi_slapface.gif";
        smileyarr["sFi_slap2"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPPzGgQrI/AAAAAAAAAMs/l9265nd9c_k/sFi_slap2.gif";
        smileyarr["sFi_slap"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPQiG4EVI/AAAAAAAAAMw/7b_b4SigEmo/sFi_slap.gif";
        smileyarr["sFi_shotgun"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPRtaFV6I/AAAAAAAAAM0/4oeSY9CQDys/sFi_shotgun.gif";
        smileyarr["sFi_semiauto"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPSYY6LpI/AAAAAAAAAM4/_e36mSf8Hrw/sFi_semiauto.gif";
        smileyarr["sFi_rockthrow"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPTYWEnCI/AAAAAAAAAM8/mP_je9AWGRk/sFi_rockthrow.gif";
        smileyarr["sFi_rockets"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPVH_NclI/AAAAAAAAANA/hRZ06OvAt_o/sFi_rockets.gif";
        smileyarr["sFi_rock-gun"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPZMhtkPI/AAAAAAAAANE/qjd2KR0idmg/sFi_rock-gun.gif";
        smileyarr["sFi_raygun"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPaFk6UtI/AAAAAAAAANI/Skfeo2weOqk/sFi_raygun.gif";
        smileyarr["sFi_punchingbag"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPa7T6_WI/AAAAAAAAANM/a2fWqFTyloQ/sFi_punchingbag.gif";
        smileyarr["sFi_punch"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPbZxtnqI/AAAAAAAAANQ/zjDxe2AJ2BQ/sFi_punch.gif";
        smileyarr["sFi_pop"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPc2I2pHI/AAAAAAAAANU/CwAqhz5ysrw/sFi_pop.gif";
        smileyarr["sFi_pistols2"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPdcBs8rI/AAAAAAAAANY/_kV2VP-iCas/sFi_pistols2.gif";
        smileyarr["sFi_pistols"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPeqoEovI/AAAAAAAAANc/act3yDQ26dI/sFi_pistols.gif";
        smileyarr["sFi_outgunned"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPft71gJI/AAAAAAAAANg/-odLTjDF1Wg/sFi_outgunned.gif";
        smileyarr["sFi_ninja"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPf4EYXYI/AAAAAAAAANk/wq1eNZjSWZk/sFi_ninja.gif";
        smileyarr["sFi_meteor"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPg_PbPtI/AAAAAAAAANo/TIbWq6yCtFU/sFi_meteor.gif";
        smileyarr["sFi_marines"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPhz_Q5-I/AAAAAAAAANs/XGUHgaWjo9U/sFi_marines.gif";
        smileyarr["sFi_machinegunsdual"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPk7UAn3I/AAAAAAAAANw/7TXGaWJA8yQ/sFi_machinegunsdual.gif";
        smileyarr["sFi_machinegunnest"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPoJgDLYI/AAAAAAAAAN0/Gp6WMQErJUQ/sFi_machinegunnest.gif";
        smileyarr["sFi_machinegune5"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPpHLdrwI/AAAAAAAAAN4/YkhuLzChTQ8/sFi_machinegune5.gif";
        smileyarr["sFi_machinegun4"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPr_pmZEI/AAAAAAAAAN8/erEheZ7t8uI/sFi_machinegun4.gif";
        smileyarr["sFi_machinegun2"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDPsu2ssxI/AAAAAAAAAOA/nJch5mOJYYM/sFi_machinegun2.gif";
        smileyarr["sFi_machinegun"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPtf2CPOI/AAAAAAAAAOE/O3lOI7X2I2w/sFi_machinegun.gif";
        smileyarr["sFi_machine3"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPuNUXXvI/AAAAAAAAAOI/xecPptVbNcU/sFi_machine3.gif";
        smileyarr["sFi_knight3"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDPvCwwxoI/AAAAAAAAAOM/wIa76uNPw28/sFi_knight3.gif";
        smileyarr["sFi_knight2"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDPwVf6aGI/AAAAAAAAAOQ/8BB4a4DBkIo/sFi_knight2.gif";
        smileyarr["sFi_knight"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPxYcsvRI/AAAAAAAAAOU/bhfiV4wizes/sFi_knight.gif";
        smileyarr["sFi_kickedout"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDPyCfxhPI/AAAAAAAAAOY/uAEWHlL_-pk/sFi_kickedout.gif";
        smileyarr["sFi_irritating"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDP0t-whCI/AAAAAAAAAOc/uY40OWCmZCA/sFi_irritating.gif";
        smileyarr["sFi_hammers"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDP1AUinUI/AAAAAAAAAOg/yaraKxDccw0/sFi_hammers.gif";
        smileyarr["sFi_hammerhead2"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDP1ih0J1I/AAAAAAAAAOk/aDVvh36NIkI/sFi_hammerhead2.gif";
        smileyarr["sFi_hammerhead1"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDP2JnxDYI/AAAAAAAAAOo/dQJbXFpHre4/sFi_hammerhead1.gif";
        smileyarr["sFi_hammer2"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDP2phHnbI/AAAAAAAAAOs/XukEyBYUHI4/sFi_hammer2.gif";
        smileyarr["sFi_hammer"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDP3qITmLI/AAAAAAAAAOw/tlRxDj8IV44/sFi_hammer.gif";
        smileyarr["sFi_gatefire"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDP4UB8kRI/AAAAAAAAAO0/Oylt-yNVj80/sFi_gatefire.gif";
        smileyarr["sFi_fryingpan"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDP5TfjjQI/AAAAAAAAAO4/mbFEHzgWQZQ/sFi_fryingpan.gif";
        smileyarr["sFi_flamethrowing"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDP6OqgoEI/AAAAAAAAAO8/9BwH_o4WRqA/sFi_flamethrowing.gif";
        smileyarr["sFi_flamethrower"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDP6_w4WNI/AAAAAAAAAPA/du6PPKo8HvY/sFi_flamethrower.gif";
        smileyarr["sFi_fishwack"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDP7qLsjLI/AAAAAAAAAPE/o0-FuDJ1xxI/sFi_fishwack.gif";
        smileyarr["sFi_fish"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDP8rjxutI/AAAAAAAAAPI/mwjXlY8Ul_g/sFi_fish.gif";
        smileyarr["sFi_fightingvehicle"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDP99RsC8I/AAAAAAAAAPM/jRJOHTEKZiM/sFi_fightingvehicle.gif";
        smileyarr["sFi_fencing"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDP-hyh7PI/AAAAAAAAAPQ/xZ26HeK7QxM/sFi_fencing.gif";
        smileyarr["sFi_chucks2"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDP_9lrKbI/AAAAAAAAAPU/4S_Z7LQz8vA/sFi_chucks2.gif";
        smileyarr["sFi_chucks"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDQAvp5zHI/AAAAAAAAAPY/B9dMqiabGQ0/sFi_chucks.gif";
        smileyarr["sFi_capred"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDQBH2q6OI/AAAAAAAAAPc/zEmFNuA5iJo/sFi_capred.gif";
        smileyarr["sFi_capblue"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDQBqkIn5I/AAAAAAAAAPg/EBA6HarIOvA/sFi_capblue.gif";
        smileyarr["sFi_brick"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDQCDHNNQI/AAAAAAAAAPk/cerAW4Mxjno/sFi_brick.gif";
        smileyarr["sFi_boxingmatch"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDQDQfkoVI/AAAAAAAAAPo/FH0yOL75exc/sFi_boxingmatch.gif";
        smileyarr["sFi_boxing"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDQFAysGaI/AAAAAAAAAPs/wxqmuUgNiLk/sFi_boxing.gif";
        smileyarr["sFi_boink3"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDQFvPM_dI/AAAAAAAAAPw/vPY88LlJ5YE/sFi_boink3.gif";
        smileyarr["sFi_blueflagrkt"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdDQGPcWHDI/AAAAAAAAAP0/gU0fTAJ9Ylg/sFi_blueflagrkt.gif";
        smileyarr["sFi_BlueFlag"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDQHb_jRFI/AAAAAAAAAP4/2V57SQTZ9XY/sFi_BlueFlag.gif";
        smileyarr["sFi_snowfight"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDRhQgbz9I/AAAAAAAAAQE/VLevKJpvRaY/sFi_snowfight.gif";
        smileyarr["sFi_sniper4"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDRhzN2xGI/AAAAAAAAAQI/T3hFBlK2CGQ/sFi_sniper4.gif";
        smileyarr["sFi_sniper3"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDRir_Fs-I/AAAAAAAAAQM/PL39R5KLduE/sFi_sniper3.gif";
        smileyarr["sFi_biggrinsmack"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDRjYa-s6I/AAAAAAAAAQQ/2kqjDoqTeCU/sFi_biggrinsmack.gif";
        smileyarr["sFi_bat"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdDRj-YQzkI/AAAAAAAAAQU/sujIHpJGBtM/sFi_bat.gif";
        smileyarr["sFi_annihilate"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdDRkWmEIAI/AAAAAAAAAQY/g3oUvCKYY9c/sFi_annihilate.gif";
        smileyarr["fighting0091"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEGitgu8YI/AAAAAAAAAQ4/OkqEMr9R75o/fighting0091.gif";
        smileyarr["fighting0087"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEGjZn3QMI/AAAAAAAAAQ8/uh9whk_tV6Q/fighting0087.gif";
        smileyarr["fighting0085"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEGkFUNMKI/AAAAAAAAARA/VjO7K3ioxFI/fighting0085.gif";
        smileyarr["fighting0083"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEGlq7JbqI/AAAAAAAAARE/PCTmWZ1mxnQ/fighting0083.gif";
        smileyarr["fighting0080"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEGmsgWF5I/AAAAAAAAARI/eCol8IOG7TU/fighting0080.gif";
        smileyarr["fighting0079"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEGn1H1WWI/AAAAAAAAARM/5F_9GsQVoJM/fighting0079.gif";
        smileyarr["fighting0070"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEGoyDuX2I/AAAAAAAAARQ/Pmqc-MyHG7s/fighting0070.gif";
        smileyarr["fighting0069"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEGqI-bK2I/AAAAAAAAARU/sgjCOcdbVB0/fighting0069.gif";
        smileyarr["fighting0057"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEGqy5bu7I/AAAAAAAAARY/NMzIcbuWV5w/fighting0057.gif";
        smileyarr["fighting0054"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEGrYRFD7I/AAAAAAAAARc/-Ft43NO63Z4/fighting0054.gif";
        smileyarr["fighting0044"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEGsoEcLoI/AAAAAAAAARg/phz6ZY4N2L8/fighting0044.gif";
        smileyarr["fighting0040"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEGtyme10I/AAAAAAAAARk/HwzAapk8jN0/fighting0040.gif";
        smileyarr["Violence_9"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdJbI4KT0rI/AAAAAAAAAqA/0O498new-jo/Violence_9.gif";
        smileyarr["Violence_6"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdJbJYBHj4I/AAAAAAAAAqE/ukD8AmVK5J0/Violence_6.gif";
        smileyarr["Violence_20"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdJbJ8GoinI/AAAAAAAAAqI/AaCLWfWp-R0/Violence_20.gif";
        smileyarr["Violence_2"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdJbKkYwFdI/AAAAAAAAAqM/zC-fuieWRa8/Violence_2.gif";
        smileyarr["Violence_19"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdJbLYx4NcI/AAAAAAAAAqQ/7iicLjPGNqY/Violence_19.gif";
        smileyarr["Violence_18"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdJbLpVhFaI/AAAAAAAAAqU/dzz5nb--VgA/Violence_18.gif";
        smileyarr["Violence_16"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdJbNWtOIyI/AAAAAAAAAqc/EydCvYx7lYc/Violence_16.gif";
        smileyarr["Violence"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdJbQ1SwOlI/AAAAAAAAAqw/nM14n7UWTeo/Violence.gif";
        smileyarr["Violence_17"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdJbMjzGG4I/AAAAAAAAAqY/hubij681DWE/Violence_17.gif";
        smileyarr["Violence_15"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdJbNxM8BtI/AAAAAAAAAqg/U3wBUP2bnpM/Violence_15.gif";
        smileyarr["Violence_14"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdJbOgmHfCI/AAAAAAAAAqk/ON-ASKqmOxY/Violence_14.gif";
        smileyarr["Violence_11"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdJbPryMEJI/AAAAAAAAAqo/7h_g38AUCVw/Violence_11.gif";
        smileyarr["Violence_10"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdJbQbDUpRI/AAAAAAAAAqs/IQHiOjNstRc/Violence_10.gif";
        	
        
        //DO NOT CHANGE ANY THING BELOW THIS LINE
        	var tb = document.getElementsByTagName('textarea');
        	for(i=0;i<tb.length;i++){
        		text=tb[i];
        		if (!text) return;
        		c=text.parentNode;
        		d=document.createElement("div");
        		d.className="T";
        		d.style.fontSize="11px";
        		d.align="left";
        		
        	        
        	    d.style.marginTop="10px";
        		c.appendChild(d);
        		
        		for(title in smileyarr){
        			mm=document.createElement("a");
        			mm.href="javascript:;";
        			mm.setAttribute("gult",i);
        			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
        			mm.addEventListener("click", insertSmiley, true);
        			d.appendChild(mm);
        		}
        	}	
        }
        dip();
        }, false);
        
        // Auto updater
        CheckScriptForUpdate = {
          // Config values, change these to match your script
         id: '45485', // Script id on Userscripts.org
         days: 2, // Days to wait between update checks
        
         // Don't edit after this line, unless you know what you're doing ;-)
         name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
         version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
         time: new Date().getTime() | 0,
         call: function(response) {
            GM_xmlhttpRequest({
              method: 'GET',
        	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
        	  headers: {
        	  'User-agent': window.navigator.userAgent,
        	    'Accept': 'application/atom+xml,application/xml,text/xml',
        	    },
        	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
              });
          },
         compare: function(xpr,response) {
            this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
            this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
            if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
              GM_setValue('updated', this.time);
              GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
            } else if ( (this.xversion) && (this.xversion != this.version) ) {
              if(confirm('Do you want to turn off auto updating for this script?')) {
        	GM_setValue('updated', 'off');
        	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
        	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
              } else {
        	GM_setValue('updated', this.time);
              }
            } else {
              if(response) alert('No updates available for '+this.name);
              GM_setValue('updated', this.time);
            }
          },
         check: function() {
        if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
        if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
              this.call();
            } else if (GM_getValue('updated', 0) == 'off') {
              GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
            } else {
              GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
            }
            }
        };
        if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();