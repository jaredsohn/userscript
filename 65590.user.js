// ==UserScript==
// @name           Mega Orkut smileys
// @namespace     http://www.orkut.co.in/Main#Profile?uid=3460094999052775382
// @author	Dheeraj Shah
// @description   Made this just for fun :D (please respect the creator of this smiley)..
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Original Base script by Mr.kewl
//Made the smileys just for fun and thought to share with you all..!!
// All credits to Original script writer. I hope u all enjoy the script! ;)
*********************************************************/

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
smileyarr["Animated smileys"]="http://lh3.ggpht.com/_Yg003HyxRmE/SyN3bCULsBI/AAAAAAAAACs/MO8kBBirB_U/s400/animated.JPG";
	smileyarr["CoolAnim"]="http://lh4.ggpht.com/_Ajoc8AujQC0/SvAqJZpO4iI/AAAAAAAAAN4/8M9dSIgWfA8/s400/i_cool.png";
	smileyarr["SadAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St1qhOu8rRI/AAAAAAAAAKQ/pcvCiQrAFvs/s400/i_sad.png";
	smileyarr["AngryAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St1viCDcCKI/AAAAAAAAAKY/ZIEuF_qdqvo/s400/i_angry.png";
	smileyarr["SmileAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/St2LOwuB5QI/AAAAAAAAALw/miyNfnfvj-U/s400/i_smile.png";
	smileyarr["WinkAnim"]="http://lh6.ggpht.com/_Ajoc8AujQC0/SvAx7TnUWMI/AAAAAAAAAOI/69ETthREJFo/s400/i_wink.png";
	smileyarr["Big SmileAnim"]="http://lh5.ggpht.com/_Ajoc8AujQC0/SvAiPxQ1n_I/AAAAAAAAANw/IVp5-BIj18Y/s400/i_bigsmile.png";
	smileyarr["SurpriseAnim"]="http://lh4.ggpht.com/_Ajoc8AujQC0/St2H3-QPksI/AAAAAAAAALo/e9nzXRGzmVg/s400/i_surprise.png";
	smileyarr["FunnyAnim"]="http://lh3.ggpht.com/_Ajoc8AujQC0/StHudlqXeHI/AAAAAAAAAJ4/sz7QRLqRW0c/s400/i_funny.png";
	smileyarr["ConfuseAnim"]="http://lh4.ggpht.com/_Ajoc8AujQC0/St1jfQI9YII/AAAAAAAAAKI/eTXmknPgpgw/s400/i_confuse.png";



smileyarr["Old Smileys"]="http://lh5.ggpht.com/_Yg003HyxRmE/SyN3kdpgv5I/AAAAAAAAADM/JwW-o0YPwe8/s400/old.JPG";
smileyarr["Cool"]="http://img1.orkut.com/img/i_cool.gif";
	smileyarr["Sad"]="http://img1.orkut.com/img/i_sad.gif";
	smileyarr["Angry"]="http://img1.orkut.com/img/i_angry.gif";
	smileyarr["Smile"]="http://img1.orkut.com/img/i_smile.gif";
	smileyarr["Wink"]="http://img1.orkut.com/img/i_wink.gif";
	smileyarr["Big Smile"]="http://img1.orkut.com/img/i_bigsmile.gif";
	smileyarr["Surprise"]="http://img1.orkut.com/img/i_surprise.gif";
	smileyarr["Funny"]="http://img1.orkut.com/img/i_funny.gif";
	smileyarr["Confuse"]="http://img1.orkut.com/img/i_confuse.gif";

smileyarr["inverted Smileys"]="http://lh5.ggpht.com/_Yg003HyxRmE/SyN3oGG9-MI/AAAAAAAAADU/23xPxt3oUnA/s400/upside%20down.JPG";

smileyarr["invertedCool"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIIoOaDvI/AAAAAAAAAC8/XsxILHcQqFI/s400/i_cool.png";
	smileyarr["invertedSad"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIW6OlG8I/AAAAAAAAADU/r2RE9DiuQF0/s400/i_sad.png";
	smileyarr["invertedAngry"]="http://lh3.ggpht.com/_UU3pei9R6Q4/SsNIITmKkvI/AAAAAAAAACw/I86zC8vKmbQ/s400/i_angry.png";
	smileyarr["invertedSmile"]="http://lh5.ggpht.com/_UU3pei9R6Q4/SsNIW4-WDaI/AAAAAAAAADQ/IBdK_9sp_ns/s400/i_smile.png";
	smileyarr["invertedWink"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIWjB6sHI/AAAAAAAAADI/NUbMPdq-QHw/s400/i_wink.png";
	smileyarr["invertedBig Smile"]="http://lh3.ggpht.com/_UU3pei9R6Q4/SsNIW4mgqxI/AAAAAAAAADY/Rejs7O_2p9M/s400/i_bigsmile.png";
	smileyarr["invertedSurprise"]="http://lh5.ggpht.com/_UU3pei9R6Q4/SsNIWg8rb-I/AAAAAAAAADM/4GDEHrWlHt0/s400/i_surprise.png";
	smileyarr["invertedFunny"]="http://lh4.ggpht.com/_UU3pei9R6Q4/SsNIIl0CijI/AAAAAAAAADA/yhYeMrT3eME/s400/i_funny.png";
	smileyarr["invertedConfuse"]="http://lh5.ggpht.com/_UU3pei9R6Q4/SsNIIUdknCI/AAAAAAAAAC0/zbOEH4_lud8/s400/i_confuse.png";


smileyarr["Zoo Zoo Smileys"]="http://lh4.ggpht.com/_Yg003HyxRmE/SyN3v6clhSI/AAAAAAAAADs/i2aVUfFDhLg/s400/zoozoo.JPG";

smileyarr["1. Arguing"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx02mTBz-UI/AAAAAAAAAgc/9xywaN5ZrFE/s800/1.%20Arguing%20copy.png";
	smileyarr["2. Blank"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx02mUmh-0I/AAAAAAAAAgg/4nrMKMA08iU/s800/2.%20Blank%20copy.png";
	smileyarr["3. Blissfull"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx02mXBeVpI/AAAAAAAAAgk/yKd9_vnRGUA/s800/3.%20Blissfull%20copy.png";
	smileyarr["4. Bored"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx05UVpAFLI/AAAAAAAAAiA/AnKK-9Dc_1M/s800/4.%20Bored%20copy.png";
	smileyarr["5. Crying"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx02mtQW9QI/AAAAAAAAAgs/5apVnUdkKfE/s800/5.%20Crying%20copy.png";
	smileyarr["6. Curious"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx02vbegdqI/AAAAAAAAAgw/nwERyAWZn0M/s800/6.%20Curious%20copy.png";
	smileyarr["7. Disapointed"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx02vTI1GwI/AAAAAAAAAg0/54Xpwh52tnA/s800/7.%20Disapointed%20copy.png";
	smileyarr["8. Disapproving"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx02vVP218I/AAAAAAAAAg4/R_BB7zP4ofk/s800/8.%20Disapproving%20copy.png";
	smileyarr["9. Distasteful"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx02vXJ6T_I/AAAAAAAAAg8/c3tXaLQr6l4/s800/9.%20Distasteful%20copy.png";
	smileyarr["10. Exhausted"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx02vo7N8AI/AAAAAAAAAhA/YP0sP6HThcU/s800/10.%20Exhausted%20copy.png";
	smileyarr["11. Frightened"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03DYZDRPI/AAAAAAAAAhE/TS9tY0FyOUE/s800/11.%20Frightened%20copy.png";
	smileyarr["12. Gigglling"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03DUS31YI/AAAAAAAAAhI/_SnTu2jG2Xc/s800/12.%20Gigglling%20copy.png";
	smileyarr["13. Happy"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx03DfBFPVI/AAAAAAAAAhM/l1OhS5-yWCY/s800/13.%20Happy%20copy.png";
	smileyarr["14. Horrified"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03Dja-QiI/AAAAAAAAAhQ/GGxEU-kztVo/s800/14.%20Horrified%20copy.png";
	smileyarr["15. Idiotic"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03DvP-7ZI/AAAAAAAAAhU/VVWUnVre8ZQ/s800/15.%20Idiotic%20copy.png";
	smileyarr["16. Indifferent"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx03StWfJII/AAAAAAAAAhY/gUVev7pDBEc/s800/16.%20Indifferent%20copy.png";
	smileyarr["17. Inocent"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx03SkA9LMI/AAAAAAAAAhc/haF0qP0myzo/s800/17.%20Inocent%20copy.png";
	smileyarr["18. Mischievous"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03S9cRUdI/AAAAAAAAAhg/gKm-bzNQzz0/s800/18.%20Mischievous%20copy.png";
	smileyarr["19. Puzzled"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx03S8JK7EI/AAAAAAAAAhk/d6Mj2cwUnDI/s800/19.%20Puzzled%20copy.png";
	smileyarr["20. Sad"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03S0gJNuI/AAAAAAAAAho/MIb4wrgUHDk/s800/20.%20Sad%20copy.png";
	smileyarr["21. Satisfied"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx03hoRkYAI/AAAAAAAAAhs/aYVUx0sg7Sg/s800/21.%20Satisfied%20copy.png";
	smileyarr["22. Screaming"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03hgi-VyI/AAAAAAAAAhw/FNwTe_dHkX4/s800/22.%20Screaming%20copy.png";
	smileyarr["23. Sleeping"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx03h-Xz8iI/AAAAAAAAAh0/UkBpIB6-MQU/s800/23.%20Sleeping%20copy.png";
	smileyarr["24. Surprised"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03hz5tr4I/AAAAAAAAAh4/GaZdZDVlUKQ/s800/24.%20Surprised%20copy.png";
       smileyarr["Yahoo! Smileys"]="http://lh4.ggpht.com/_Yg003HyxRmE/SyN3rDp8kUI/AAAAAAAAADc/l_4BS8ZS2S4/s400/yahoo.JPG";

smileyarr["hehe"]="http://lh6.google.com/fenil.rulez/SCKffqghQvI/AAAAAAAAAF0/UYVeu8yK6AY/0.gif";
	smileyarr["smile"]="http://lh6.google.com/fenil.rulez/SCKffqghQwI/AAAAAAAAAF8/OF26gKUCd_U/1.gif";
	smileyarr["sad"]="http://lh6.google.com/fenil.rulez/SCKffqghQxI/AAAAAAAAAGE/RrOvlLjQ2j4/2.gif";
	smileyarr["wink"]="http://lh3.google.com/fenil.rulez/SCKff6ghQyI/AAAAAAAAAGM/fNm7w9DW95w/3.gif";
	smileyarr["grin"]="http://lh3.google.com/fenil.rulez/SCKff6ghQzI/AAAAAAAAAGU/HPQQ4jyNqf8/4.gif";
	smileyarr["batting eyelashes"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ0I/AAAAAAAAAGc/AgaNXqqXGbo/5.gif";
	smileyarr["hug"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ1I/AAAAAAAAAGk/4Qa-FNOLtCY/6.gif";
	smileyarr["confuse"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ2I/AAAAAAAAAGs/PtzYfpMGMxM/7.gif";
	smileyarr["love struck"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ3I/AAAAAAAAAG0/MQkeAyScx4k/8.gif";
	smileyarr["blush"]="http://lh5.google.com/fenil.rulez/SCKfmaghQ4I/AAAAAAAAAG8/_LD2CzWH4dg/9.gif";
	smileyarr["funny"]="http://lh4.google.com/fenil.rulez/SCKf2KghQ5I/AAAAAAAAAHE/Jw2dObqME8c/10.gif";
	smileyarr["kiss"]="http://lh5.google.com/fenil.rulez/SCKf2aghQ6I/AAAAAAAAAHM/6MhueuDt_Es/11.gif";
	smileyarr["broken heart"]="http://lh5.google.com/fenil.rulez/SCKf2aghQ7I/AAAAAAAAAHU/BTYYh16WnW0/12.gif";
	smileyarr["surprise"]="http://lh6.google.com/fenil.rulez/SCKf2qghQ8I/AAAAAAAAAHc/LO22pD6pJxM/13.gif";
	smileyarr["angry"]="http://lh6.google.com/fenil.rulez/SCKf2qghQ9I/AAAAAAAAAHk/2RzHLFyzD1o/14.gif";
	smileyarr["smug"]="http://lh6.google.com/fenil.rulez/SCKf8qghQ-I/AAAAAAAAAHs/5eawzApIf1Q/15.gif";
	smileyarr["cool"]="http://lh6.google.com/fenil.rulez/SCKf8qghQ_I/AAAAAAAAAH0/JLRMTa_-Z8E/16.gif";
	smileyarr["worried"]="http://lh3.google.com/fenil.rulez/SCKf86ghRAI/AAAAAAAAAH8/dDF9fAkyOWs/17.gif";
	smileyarr["whew"]="http://lh3.google.com/fenil.rulez/SCKf86ghRBI/AAAAAAAAAIE/p0YlwTd1NZQ/18.gif";
	smileyarr["devil"]="http://lh3.google.com/fenil.rulez/SCKf86ghRCI/AAAAAAAAAIM/gt9_-w4PEHo/19.gif";
	smileyarr["cry"]="http://lh6.google.com/fenil.rulez/SCKgSqghRDI/AAAAAAAAAIU/UD4poyt8IA0/20.gif";
	smileyarr["laugh"]="http://lh6.google.com/fenil.rulez/SCKgSqghREI/AAAAAAAAAIc/uDBr8ILYSac/21.gif";
	smileyarr["straight face"]="http://lh6.google.com/fenil.rulez/SCKgSqghRFI/AAAAAAAAAIk/_yv_bISAVTg/22.gif";
	smileyarr["^ eyebrow"]="http://lh6.google.com/fenil.rulez/SCKgSqghRGI/AAAAAAAAAIs/hcOQnPcKTEc/23.gif";
	smileyarr["laughin on floor"]="http://lh6.google.com/fenil.rulez/SCKgSqghRHI/AAAAAAAAAI0/rswbPIMWhdI/24.gif";
	smileyarr["angel"]="http://lh6.google.com/fenil.rulez/SCKgeqghRII/AAAAAAAAAI8/bZydrIWQdmo/25.gif";
	smileyarr["nerd"]="http://lh3.google.com/fenil.rulez/SCKge6ghRJI/AAAAAAAAAJE/JkANsPSF-wc/26.gif";
	smileyarr["tlk 2 hand"]="http://lh4.google.com/fenil.rulez/SCKgfKghRKI/AAAAAAAAAJM/qXdz1dAhxlw/27.gif";
	smileyarr["sleep"]="http://lh4.google.com/fenil.rulez/SCKgfKghRLI/AAAAAAAAAJU/MDQVCTa75Mk/28.gif";
	smileyarr["rolling eyes"]="http://lh4.google.com/fenil.rulez/SCKgfKghRMI/AAAAAAAAAJc/v-Kmy0eC-Xw/29.gif";
	smileyarr["loser"]="http://lh3.google.com/fenil.rulez/SCKgt6ghRNI/AAAAAAAAAJk/jjHTzc_e_qA/30.gif";
	smileyarr["sick"]="http://lh3.google.com/fenil.rulez/SCKgt6ghROI/AAAAAAAAAJs/EUM87MtkPcw/31.gif";
	smileyarr["secret"]="http://lh3.google.com/fenil.rulez/SCKgt6ghRPI/AAAAAAAAAJ0/kESMqGEH3Aw/32.gif";
	smileyarr["not tlking"]="http://lh4.google.com/fenil.rulez/SCKguKghRQI/AAAAAAAAAJ8/RahDhhvSfqU/33.gif";
	smileyarr["clown"]="http://lh4.google.com/fenil.rulez/SCKguKghRRI/AAAAAAAAAKE/qR8khSq_IDI/34.gif";
	smileyarr["crazy"]="http://lh4.google.com/fenil.rulez/SCKg0KghRSI/AAAAAAAAAKM/U3wnnFYbK68/35.gif";
	smileyarr["party"]="http://lh4.google.com/fenil.rulez/SCKg0KghRTI/AAAAAAAAAKU/QmD2xZqsiO4/36.gif";
	smileyarr["yawn"]="http://lh6.google.com/fenil.rulez/SCKg0qghRUI/AAAAAAAAAKc/CyvdJ2EN6zE/37.gif";
	smileyarr["droolin"]="http://lh6.google.com/fenil.rulez/SCKg0qghRVI/AAAAAAAAAKk/uP4Zw96zIDM/38.gif";
	smileyarr["thinking"]="http://lh6.google.com/fenil.rulez/SCKg0qghRWI/AAAAAAAAAKs/YX47RqhdSJM/39.gif";
	smileyarr["doh"]="http://lh4.google.com/fenil.rulez/SCKg5KghRXI/AAAAAAAAAK0/cKkTi1jPq24/40.gif";
	smileyarr["applause"]="http://lh4.google.com/fenil.rulez/SCKg5KghRYI/AAAAAAAAAK8/vtOMcxyMuJg/41.gif";
	smileyarr["very worried"]="http://lh4.google.com/fenil.rulez/SCKg5KghRZI/AAAAAAAAALE/tVxhLY_BZ3M/42.gif";
	smileyarr["hypno"]="http://lh5.google.com/fenil.rulez/SCKg5aghRaI/AAAAAAAAALM/iEuJuemA07U/43.gif";
	smileyarr["liar"]="http://lh5.google.com/fenil.rulez/SCKg5aghRbI/AAAAAAAAALU/dbfTALWwiT0/44.gif";
	smileyarr["waiting"]="http://lh6.google.com/fenil.rulez/SCKhSqghRcI/AAAAAAAAALc/8gnITHRPong/45.gif";
	smileyarr["sigh"]="http://lh6.google.com/fenil.rulez/SCKhSqghRdI/AAAAAAAAALk/EK6qB1q8Uy0/46.gif";
	smileyarr["phbbt"]="http://lh6.google.com/fenil.rulez/SCKhSqghReI/AAAAAAAAALs/1lfHD5RCXU4/47.gif";
	smileyarr["cowboy"]="http://lh6.google.com/fenil.rulez/SCKhSqghRfI/AAAAAAAAAL0/gPof1Tpjfuc/48.gif";
	smileyarr["on call"]="http://lh6.google.com/fenil.rulez/SCKhSqghRgI/AAAAAAAAAL8/1GAtlnCiQWk/100.gif";
	smileyarr["call me"]="http://lh3.google.com/fenil.rulez/SCKha6ghRhI/AAAAAAAAAME/LPvQj4kHnOo/101.gif";
	smileyarr["irritated"]="http://lh3.google.com/fenil.rulez/SCKha6ghRiI/AAAAAAAAAMM/bwvltzLcjT8/102.gif";
	smileyarr["bye"]="http://lh3.google.com/fenil.rulez/SCKha6ghRjI/AAAAAAAAAMU/Alz7wy5Xu04/103.gif";
	smileyarr["time up"]="http://lh3.google.com/fenil.rulez/SCKha6ghRkI/AAAAAAAAAMc/esXzY4CYEHI/104.gif";
	smileyarr["day dreaming"]="http://lh4.google.com/fenil.rulez/SCKhbKghRlI/AAAAAAAAAMk/z0lmJ3l6DGc/105.gif";
	smileyarr["dun wanna see"]="http://lh5.google.com/fenil.rulez/SCKhraghRmI/AAAAAAAAAMs/Fwrq_98xe1Q/109.gif";
	smileyarr["hurry up"]="http://lh5.google.com/fenil.rulez/SCKhraghRnI/AAAAAAAAAM0/4tlsUt1H15E/110.gif";
	smileyarr["rock on"]="http://lh5.google.com/fenil.rulez/SCKhraghRoI/AAAAAAAAAM8/jWTex2apZzA/111.gif";
	smileyarr["thumbs down"]="http://lh5.google.com/fenil.rulez/SCKhraghRpI/AAAAAAAAANE/wMusLZLd9Wo/112.gif";
	smileyarr["thumbs up"]="http://lh5.google.com/fenil.rulez/SCKhraghRqI/AAAAAAAAANM/X4VuXKdVZP4/113.gif";
	smileyarr["i dunno"]="http://lh4.google.com/fenil.rulez/SCKh3KghRrI/AAAAAAAAANU/HKXemLzafrM/114.gif";
	smileyarr["bow"]="http://lh4.google.com/fenil.rulez/SCKh3KghRsI/AAAAAAAAANc/BjLIjfIk_zE/77.gif";
	smileyarr["chatterbox"]="http://lh5.google.com/fenil.rulez/SCKh3aghRtI/AAAAAAAAANk/r0_gLsT6MDs/76.gif";
	smileyarr["bring it on"]="http://lh5.google.com/fenil.rulez/SCKh3aghRuI/AAAAAAAAANs/yNwr8jdeMw8/70.gif";
	smileyarr["whistling"]="http://lh3.google.com/fenil.rulez/SCKiA6ghRvI/AAAAAAAAAN0/O3ukMSdjbj8/65.gif";
	smileyarr["money eyes"]="http://lh3.google.com/fenil.rulez/SCKiA6ghRwI/AAAAAAAAAN8/UAHgEDYtTWw/64.gif";
	smileyarr["pray"]="http://lh3.google.com/fenil.rulez/SCKiA6ghRxI/AAAAAAAAAOE/38xlLa3ILqM/63.gif";
	smileyarr["frustated"]="http://lh4.google.com/fenil.rulez/SCKiBKghRyI/AAAAAAAAAOM/Q1yj6LxCP0I/62.gif";
	smileyarr["dancing"]="http://lh4.google.com/fenil.rulez/SCKiBKghRzI/AAAAAAAAAOU/SYJMOwMAH_c/69.gif";
	smileyarr["not listening"]="http://lh5.google.com/fenil.rulez/SCKiNaghR0I/AAAAAAAAAOc/m7RffpUIJpk/107.gif";
	smileyarr["shame on u"]="http://lh5.google.com/fenil.rulez/SCKiNaghR1I/AAAAAAAAAOk/eVg86YsoBSU/68.gif";
	smileyarr["oh cum on"]="http://lh6.google.com/fenil.rulez/SCKiNqghR2I/AAAAAAAAAOs/iHZJL67ip7M/78.gif";
	smileyarr["no idea"]="http://lh6.google.com/fenil.rulez/SCKiNqghR3I/AAAAAAAAAO0/dUXWpcCbpOE/106.gif";
	smileyarr["feelin beat up"]="http://lh6.google.com/fenil.rulez/SCKiNqghR4I/AAAAAAAAAO8/Wdr6l6Amf_o/66.gif";
	smileyarr["bug"]="http://lh5.google.com/fenil.rulez/SCKiaaghR5I/AAAAAAAAAPE/YYuluyCX5UY/60.gif";
	smileyarr["skul"]="http://lh5.google.com/fenil.rulez/SCKiaaghR6I/AAAAAAAAAPM/EXs0tfktP1w/59.gif";
	smileyarr["idea"]="http://lh5.google.com/fenil.rulez/SCKiaaghR7I/AAAAAAAAAPU/5WeIQHQnrbU/58.gif";
	smileyarr["goodluck"]="http://lh5.google.com/fenil.rulez/SCKiaaghR8I/AAAAAAAAAPc/yUzmMqalQCQ/54.gif";
	smileyarr["rose"]="http://lh6.google.com/fenil.rulez/SCKiaqghR9I/AAAAAAAAAPk/YWmvdaDqu_k/53.gif";
	smileyarr["chic"]="http://lh6.google.com/fenil.rulez/SCKijqghR-I/AAAAAAAAAPs/tCSQaPDPR8U/52.gif";
	smileyarr["monkey"]="http://lh6.google.com/fenil.rulez/SCKijqghR_I/AAAAAAAAAP0/e_0FWxWoC1A/51.gif";
	smileyarr["cow"]="http://lh3.google.com/fenil.rulez/SCKij6ghSAI/AAAAAAAAAP8/w6YHjrbX7bc/50.gif";
	smileyarr["pig"]="http://lh3.google.com/fenil.rulez/SCKij6ghSBI/AAAAAAAAAQE/XsU2AA0wf_o/49.gif";
	smileyarr["dog"]="http://lh3.google.com/fenil.rulez/SCKij6ghSCI/AAAAAAAAAQM/_JxH2hvgM1s/108.gif";
	smileyarr["star"]="http://lh5.google.com/fenil.rulez/SCKiuaghSDI/AAAAAAAAAQU/iBH0R9P2HAk/79.gif";
	smileyarr["OD"]="http://lh5.google.com/fenil.rulez/SCKiuaghSEI/AAAAAAAAAQc/43VMyQoVtQc/72.gif";
	smileyarr["FENIL"]="http://lh6.google.com/fenil.rulez/SCKiuqghSFI/AAAAAAAAAQk/hKMJpiqV0a8/73.gif";
	smileyarr["NIYATI"]="http://lh6.google.com/fenil.rulez/SCKiuqghSGI/AAAAAAAAAQs/FSLkAll9vgg/74.gif";
	smileyarr["pirate"]="http://lh6.google.com/fenil.rulez/SCKizqghSHI/AAAAAAAAAQ0/xuO3al_YRfg/pirate_2.gif";
	smileyarr["transformer"]="http://lh6.google.com/fenil.rulez/SCKizqghSII/AAAAAAAAAQ8/kby9xg6pFoI/transformer.gif";
	smileyarr["alien"]="http://lh5.google.com/fenil.rulez/SCKjRaghSJI/AAAAAAAAARE/u68DVv1I9ks/61.gif";
	smileyarr["bee"]="http://lh6.google.com/fenil.rulez/SCKjRqghSKI/AAAAAAAAARM/cyg71VQRdaQ/115.gif";
	smileyarr["pumpkin"]="http://lh6.google.com/fenil.rulez/SCKjRqghSLI/AAAAAAAAARU/iyJGgK_dpnA/56.gif";
	smileyarr["tea"]="http://lh6.google.com/fenil.rulez/SCKjRqghSMI/AAAAAAAAARc/xxhTMrfSAqM/57.gif";
	smileyarr["FF rulez"]="http://lh4.google.com/fenil.rulez/SCMiK6ghThI/AAAAAAAAAcI/656o_XLJlVQ/infomilies14.gif";




smileyarr["War Smileys"]="http://lh4.ggpht.com/_Yg003HyxRmE/SyN3thZ68lI/AAAAAAAAADk/dxdyVqmXdkw/s400/war.JPG";	
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


smileyarr["Kittens Smileys"]="http://lh5.ggpht.com/_Yg003HyxRmE/SyN3deSEWeI/AAAAAAAAAC0/_8U0gwoQ8VU/s400/kittens.JPG";

smileyarr["Mr.kewl0099"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7SdQoGbI/AAAAAAAAAmM/ZJDqI-BJvDc/Mr.kewl0099.gif";
smileyarr["Mr.kewl0098"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7TYvOuLI/AAAAAAAAAmQ/lqInXsWCD3U/Mr.kewl0098.gif";
smileyarr["Mr.kewl0097"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7UQlhzkI/AAAAAAAAAmU/u52RIBBfLDI/Mr.kewl0097.gif";
smileyarr["Mr.kewl0096"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7VUqCO0I/AAAAAAAAAmY/94iRPNWJ4wE/Mr.kewl0096.gif";
smileyarr["Mr.kewl00957"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7WQYQmAI/AAAAAAAAAmc/8jZEn5HPNcA/Mr.kewl00957.gif";
smileyarr["Mr.kewl00956"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7YFWHkmI/AAAAAAAAAmg/ENFis91Vq4w/Mr.kewl00956.gif";
smileyarr["Mr.kewl00955"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7Z08RHLI/AAAAAAAAAmk/LXy0PM-Y-wQ/Mr.kewl00955.gif";
smileyarr["Mr.kewl00954"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7bgfgm2I/AAAAAAAAAmo/MPUSPFJItRE/Mr.kewl00954.gif";
smileyarr["Mr.kewl00953"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7cty2AUI/AAAAAAAAAms/SpNqrfWLIq8/Mr.kewl00953.gif";
smileyarr["Mr.kewl00952"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7dXcZYpI/AAAAAAAAAmw/KyQ_Kbz0mN8/Mr.kewl00952.gif";
smileyarr["Mr.kewl00951"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7eBXgNFI/AAAAAAAAAm0/w588APMpjKE/Mr.kewl00951.gif";
smileyarr["Mr.kewl00950"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7e2KDx_I/AAAAAAAAAm4/KmBxwN26d04/Mr.kewl00950.gif";
smileyarr["Mr.kewl0095"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7f2qMWJI/AAAAAAAAAm8/i7bW74Ky1lE/Mr.kewl0095.gif";
smileyarr["Mr.kewl00949"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7gt_coRI/AAAAAAAAAnA/JLl4YzZQiMQ/Mr.kewl00949.gif";
smileyarr["Mr.kewl00948"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7hUopXDI/AAAAAAAAAnE/3B1czdK0bVI/Mr.kewl00948.gif";
smileyarr["Mr.kewl00947"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7iLjlKMI/AAAAAAAAAnI/eg1TDyEL3Y4/Mr.kewl00947.gif";
smileyarr["Mr.kewl00946"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7jVPvezI/AAAAAAAAAnM/rZPdKk14z-I/Mr.kewl00946.gif";
smileyarr["Mr.kewl00945"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7lQQyAJI/AAAAAAAAAnQ/2-CiSgXP6F4/Mr.kewl00945.gif";
smileyarr["Mr.kewl00944"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7qmBeSkI/AAAAAAAAAnU/ThZAhmv1qU4/Mr.kewl00944.gif";
smileyarr["Mr.kewl00943"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7r4WBEQI/AAAAAAAAAnY/dsSKypjuZgo/Mr.kewl00943.gif";
smileyarr["Mr.kewl00942"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7sowVgMI/AAAAAAAAAnc/VeAIk4N0MfA/Mr.kewl00942.gif";
smileyarr["Mr.kewl00941"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7tYGi55I/AAAAAAAAAng/4goLmCw-Epw/Mr.kewl00941.gif";
smileyarr["Mr.kewl00940"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7u07CGXI/AAAAAAAAAnk/_fZs8ZYec4o/Mr.kewl00940.gif";
smileyarr["Mr.kewl0094"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7wLr-9gI/AAAAAAAAAno/olCM_cB_jtc/Mr.kewl0094.gif";
smileyarr["Mr.kewl00939"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7wzAcL2I/AAAAAAAAAns/lU4vTsLWSo8/Mr.kewl00939.gif";
smileyarr["Mr.kewl00938"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7xjCqigI/AAAAAAAAAnw/eGX0e-LRD24/Mr.kewl00938.gif";
smileyarr["Mr.kewl00937"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7ye1kicI/AAAAAAAAAn0/KHhHRL50Aec/Mr.kewl00937.gif";
smileyarr["Mr.kewl00936"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7y9Lm3aI/AAAAAAAAAn4/XYLC7YErHgc/Mr.kewl00936.gif";
smileyarr["Mr.kewl00935"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH71_tyeKI/AAAAAAAAAn8/6TigWo11_Ts/Mr.kewl00935.gif";
smileyarr["Mr.kewl00934"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH73mwNFcI/AAAAAAAAAoA/rW9v6MRIXOw/Mr.kewl00934.gif";
smileyarr["Mr.kewl00933"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH756HWvzI/AAAAAAAAAoE/iPlPF6w5KK8/Mr.kewl00933.gif";
smileyarr["Mr.kewl00932"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH76kgY0jI/AAAAAAAAAoI/j-cYYgpf4ME/Mr.kewl00932.gif";
smileyarr["Mr.kewl00931"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH77pmzt2I/AAAAAAAAAoM/upzAAIZmAQ0/Mr.kewl00931.gif";
smileyarr["Mr.kewl00930"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH78F0u8lI/AAAAAAAAAoQ/2oJqusWIKQ4/Mr.kewl00930.gif";
smileyarr["Mr.kewl0093"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH79Edvb6I/AAAAAAAAAoU/oVnWY2V9GL8/Mr.kewl0093.gif";
smileyarr["Mr.kewl00929"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7-GA4HrI/AAAAAAAAAoY/VjgNkfI0mgY/Mr.kewl00929.gif";
smileyarr["Mr.kewl00928"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7-zdfHWI/AAAAAAAAAoc/5hP3ycflAeE/Mr.kewl00928.gif";
smileyarr["Mr.kewl00927"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8AhTmS1I/AAAAAAAAAog/ASnmlT7aybM/Mr.kewl00927.gif";
smileyarr["Mr.kewl00926"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8BgdaAyI/AAAAAAAAAok/AwSQdXNf1hM/Mr.kewl00926.gif";
smileyarr["Mr.kewl00925"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8DkSuF6I/AAAAAAAAAoo/b8pdmWdl73E/Mr.kewl00925.gif";
smileyarr["Mr.kewl00924"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8FjZxM8I/AAAAAAAAAos/nyJffc_1w-c/Mr.kewl00924.gif";
smileyarr["Mr.kewl00923"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH8G9tLWeI/AAAAAAAAAow/vbKp3Jup6g0/Mr.kewl00923.gif";
smileyarr["Mr.kewl00922"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8Iayi1WI/AAAAAAAAAo0/YowguPzQyl8/Mr.kewl00922.gif";
smileyarr["Mr.kewl00921"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH8J2Mn2BI/AAAAAAAAAo4/cuNbM04f3k8/Mr.kewl00921.gif";
smileyarr["Mr.kewl00920"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8LL-ck5I/AAAAAAAAAo8/up9L34vxYCM/Mr.kewl00920.gif";
smileyarr["Mr.kewl0092"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH8MY1cPrI/AAAAAAAAApA/EacEmGJC6_g/Mr.kewl0092.gif";
smileyarr["Mr.kewl00919"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8NHbrKkI/AAAAAAAAApE/IqEGktKd_kk/Mr.kewl00919.gif";
smileyarr["Mr.kewl00918"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8N46degI/AAAAAAAAApI/fkXkJc7QuGs/Mr.kewl00918.gif";
smileyarr["Mr.kewl00917"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH8OhujcUI/AAAAAAAAApM/ivP3PsoAGJk/Mr.kewl00917.gif";
smileyarr["Mr.kewl00916"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8PNSLBlI/AAAAAAAAApQ/RtY36AKLWAc/Mr.kewl00916.gif";
smileyarr["Mr.kewl00915"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH8QKCqUpI/AAAAAAAAApU/4X8QJNIrvtM/Mr.kewl00915.gif";
smileyarr["Mr.kewl00914"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8RPGXulI/AAAAAAAAApY/ah28h2bzQ6g/Mr.kewl00914.gif";
smileyarr["Mr.kewl00913"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8SfIvv7I/AAAAAAAAApc/9ck0SeTO9Zs/Mr.kewl00913.gif";
smileyarr["Mr.kewl00912"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8TOdQAoI/AAAAAAAAApg/pYtYIluLRjY/Mr.kewl00912.gif";
smileyarr["Mr.kewl00911"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8VKVw69I/AAAAAAAAApk/1b89V0ToQcI/Mr.kewl00911.gif";
smileyarr["Mr.kewl00910"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH8WPqN1KI/AAAAAAAAApo/qgX286fdQdA/Mr.kewl00910.gif";
smileyarr["Mr.kewl0091"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8W9tkTaI/AAAAAAAAAps/6JJcI8VTGVk/Mr.kewl0091.gif";

smileyarr["Misc Smileys"]="http://lh3.ggpht.com/_Yg003HyxRmE/SyN3fyQYlJI/AAAAAAAAAC8/urJXaxrZgRQ/s400/misc.JPG";
smileyarr["amazed by soft"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skzi8VCHE6I/AAAAAAAAApM/Z1tLU2v0WZ4/s400/amazed.png";
	smileyarr["angry"]="http://lh3.ggpht.com/_35QFSJ1vbCE/SkzjAafV31I/AAAAAAAAApY/K8Q6DWNtA7U/s400/angry.png";
	smileyarr["beat_brick"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz1h1Zj2mI/AAAAAAAAAqU/gpoZC0l123A/s400/beat_brick.png";
	smileyarr["beat_plaster"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz1l4SvaLI/AAAAAAAAAqg/IC_FvTfO_VQ/s400/beat_plaster.png";
	smileyarr["beat_shot"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz1okyDecI/AAAAAAAAAqs/Hhgyi1HTij4/s400/beat_shot.png";
	smileyarr["beauty"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz1rmLNibI/AAAAAAAAAq4/EtLlGBoGCkw/s400/beauty.png";
	smileyarr["big_smile"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz1cc9UJgI/AAAAAAAAAqI/VJGV-6YjqhY/s400/big_smile.png";
	smileyarr["burn_joss_stick"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz1y2wtD3I/AAAAAAAAArE/pVnolf3ngw0/s400/burn_joss_stick.png";
	smileyarr["canny"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz18h7yCbI/AAAAAAAAArQ/E2N6mGAXGHw/s400/canny.png";
	smileyarr["choler"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz1_LLERAI/AAAAAAAAArc/VPvJabfQgwU/s400/choler.png";
	smileyarr["cold"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2BsNbjaI/AAAAAAAAAro/-uSEhA4V3LU/s400/cold.png";
	smileyarr["cool"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2ErCl22I/AAAAAAAAAr0/rnsP1uuJMsI/s400/cool.png";
	smileyarr["cry"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2HTAkUCI/AAAAAAAAAsA/8n_fdClKAfk/s400/cry.png";
	smileyarr["doubt"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz2Jlh6gEI/AAAAAAAAAsM/u3rIA5ldFys/s400/doubt.png";
	smileyarr["dribble"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2L_YD4MI/AAAAAAAAAsY/20DKZFsHxfg/s400/dribble.png";
	smileyarr["embarrassed"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2OM0FEII/AAAAAAAAAsk/0ypVBJtz1S4/s400/embarrassed.png";
	smileyarr["go"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2QTFSqwI/AAAAAAAAAsw/UPF-EEZ6Ucg/s400/go.png";
	smileyarr["haha"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2SmzTjrI/AAAAAAAAAs8/StBb4_r8cbQ/s400/haha.png";
	smileyarr["look_down"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2WthNAsI/AAAAAAAAAtI/-Mjdel2pOb0/s400/look_down.png";
	smileyarr["misdoubt"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz2axb4Y6I/AAAAAAAAAtg/DSU1GP6m4uI/s400/misdoubt.png";
	smileyarr["nosebleed"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2dDFSkVI/AAAAAAAAAts/-cNgIReiF6U/s400/nosebleed.png";
	smileyarr["oh"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2mCxRZbI/AAAAAAAAAuQ/CVz5EgU5vPU/s400/oh.png";
	smileyarr["pudency"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2pAblhuI/AAAAAAAAAuc/T9T0ORSuA3U/s400/pudency.png";
	smileyarr["rap"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2rl0nBSI/AAAAAAAAAuo/VxsnFfAC08M/s400/rap.png";
	smileyarr["shame"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz23QN7rhI/AAAAAAAAAvk/eOeh-Cdj-8g/s400/shame.png";
	smileyarr["smile"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz294c_VxI/AAAAAAAAAv8/1aFFq074XDI/s400/smile.png";
	smileyarr["sure"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz25nsZ5yI/AAAAAAAAAvw/lUJxBBky9Bc/s400/sure.png";
	smileyarr["sweat"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz3B4cLrXI/AAAAAAAAAwI/HTyedK33PNA/s400/sweat.png";
	smileyarr["waaaht"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz3FdSjT0I/AAAAAAAAAwU/4sdMHxrUH20/s400/waaaht.png";
	smileyarr["matrix"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2YxnfRMI/AAAAAAAAAtU/pfkmwrNV6pE/s400/matrix.png";
	smileyarr["amazing"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8aZlqSY9I/AAAAAAAAA1Y/tqyeq1S9oEg/s400/amazing.png";
	smileyarr["anger"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8ab2p3Z9I/AAAAAAAAA1k/_jgTJ3OudRI/s400/anger.png";
	smileyarr["bad_egg"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8ad20ACbI/AAAAAAAAA1w/o29w9ng-kP4/s400/bad_egg.png";
	smileyarr["bad_smile"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Sk8ag7Z260I/AAAAAAAAA18/zkRALbPl8OA/s400/bad_smile.png";
	smileyarr["beaten"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8ai6NRY6I/AAAAAAAAA2I/PZwgCUFd-lw/s400/beaten.png";
	smileyarr["big_smile1"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8ak9Ao_QI/AAAAAAAAA2U/v34i0Lc5yE0/s400/big_smile1.png";
	smileyarr["black_heart"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8am5UpicI/AAAAAAAAA2g/1G51x_Z4TWc/s400/black_heart.png";
	smileyarr["cry1"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8apNH6DtI/AAAAAAAAA2s/tMlIYA2xXyU/s400/cry1.png";
	smileyarr["electric_shock"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Sk8arFhNiwI/AAAAAAAAA24/ewmoGjDREEM/s400/electric_shock.png";
	smileyarr["exciting"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8as15PxfI/AAAAAAAAA3E/TLc1UT-QjOA/s400/exciting.png";
	smileyarr["eyes_droped"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8avXN-IaI/AAAAAAAAA3Q/pCFX0pVe6CI/s400/eyes_droped.png";
	smileyarr["girl"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8ayFfsvhI/AAAAAAAAA3c/X9tfyr57Bcw/s400/girl.png";
	smileyarr["greedy"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a0VmZ-HI/AAAAAAAAA3o/9E9asixzxVE/s400/greedy.png";
	smileyarr["grimace"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8a2hV6v5I/AAAAAAAAA30/uumVUCl2dXo/s400/grimace.png";
	smileyarr["haha1"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8a5IpTZoI/AAAAAAAAA4A/a6RkXoHvr5g/s400/haha1.png";
	smileyarr["happy"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a7i50FzI/AAAAAAAAA4M/_nmcC0upFwA/s400/happy.png";
	smileyarr["horror"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a9cwRsSI/AAAAAAAAA4Y/wk6wJbOhJIc/s400/horror.png";
	smileyarr["money"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8a_ZoJSZI/AAAAAAAAA4k/CHv7hVa300s/s400/money.png";
	smileyarr["nothing"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Skz2hhxg5DI/AAAAAAAAAt4/vkJv5qD5aBc/s400/nothing.png";
	smileyarr["nothing_to_say"]="http://lh5.ggpht.com/_35QFSJ1vbCE/Skz2j8J54sI/AAAAAAAAAuE/4PBD9yqmspQ/s400/nothing_to_say.png";
	smileyarr["red_heart"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2uFepESI/AAAAAAAAAu0/fubgF8AAefM/s400/red_heart.png";
	smileyarr["scorn"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Skz2zU3ILvI/AAAAAAAAAvM/-H9ckSXPxmc/s400/scorn.png";
	smileyarr["secret_smile"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Skz21NBPS2I/AAAAAAAAAvY/2pLmY0flx9s/s400/secret_smile.png";
	smileyarr["shame1"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8bCSxHGVI/AAAAAAAAA4w/l3uPvf8LtJw/s400/shame1.png";
	smileyarr["shocked"]="http://lh4.ggpht.com/_35QFSJ1vbCE/Sk8bE7jtOkI/AAAAAAAAA48/Z9jWZVCvpow/s400/shocked.png";
	smileyarr["super_man"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8bGyDnFmI/AAAAAAAAA5I/zJOWqcX5gd0/s400/super_man.png";
	smileyarr["the_iron_man"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8bIx8XfKI/AAAAAAAAA5U/WJgeaJZrE9E/s400/the_iron_man.png";
	smileyarr["unhappy"]="http://lh6.ggpht.com/_35QFSJ1vbCE/Sk8bLVkRExI/AAAAAAAAA5g/Tp3riIIinNA/s400/unhappy.png";
	smileyarr["victory"]="http://lh3.ggpht.com/_35QFSJ1vbCE/Sk8bNeb6g1I/AAAAAAAAA5s/pDeNaNj36bg/s400/victory.png";


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

// kewl's script