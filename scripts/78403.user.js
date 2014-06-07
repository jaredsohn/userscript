// ==UserScript==
// @name           Good Collection of Emoticons for Orkut! 
// @namespace      AR
// @description    Use in Orkut & works with reply boxes too! (old orkut version) 
// @include        http://*.orkut.*/Scrapbook*
// @include        http://*.orkut.*/CommMsgs*
// @include        http://*.orkut.*/CommMsgPost*
// ==/UserScript==

/********************************************************
//All credits to Original script writer.(I've updated emoticons only :D) 
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
	
        smileyarr["whistle"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEcFEqq3oTI/AAAAAAAAAaU/MrZKlY7tXA0/s72/whistle2.gif";
	smileyarr["taunts"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUS9Qar5qI/AAAAAAAAAYE/q67DDGYKbGM/s72/taunt.gif";
        smileyarr["mosking"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEURUBtiG_I/AAAAAAAAATI/4OH8ovYZ5Zw/s72/mosking.gif";
	smileyarr["laugh"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEURBVwOFMI/AAAAAAAAASM/A2YNUVr3SEM/s72/laugh1.gif";
        smileyarr["lol"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEURG-lrZnI/AAAAAAAAASo/N_DJyHFZ-4g/s72/lol.gif";
	smileyarr["grin"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUQaBCwCuI/AAAAAAAAARM/Xsu4HJfF-Bk/s72/grin.gif";
        smileyarr["hi"]="http://lh3.ggpht.com/_CKYXGFpij-s/TEUQgDR9fiI/AAAAAAAAARs/j5deZFUBKhQ/s72/hi.gif";
	smileyarr["bye"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUOyM4USYI/AAAAAAAAAN0/D2VL4adX3BY/s72/bye.gif";
        smileyarr["smile"]="http://lh3.ggpht.com/_CKYXGFpij-s/TEUSj7fq9KI/AAAAAAAAAXA/5ejE9cc1s4k/s72/smile3.gif";
	smileyarr["give rose"]="http://lh3.ggpht.com/_CKYXGFpij-s/TEUQUNDpeWI/AAAAAAAAAQ8/mbjV-XNefbk/s72/give_rose.gif";
        smileyarr["mad"]="http://lh3.ggpht.com/_CKYXGFpij-s/TEURHK0dXBI/AAAAAAAAASs/vpm9fYXCug4/s72/mad.gif";
	smileyarr["aggrasive"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUNtoLGBlI/AAAAAAAAAMQ/yZGxQP1k61k/s72/aggressive.gif";
    	smileyarr["bee"]="http://lh3.ggpht.com/_CKYXGFpij-s/TEUN9DdNr8I/AAAAAAAAANE/4FYNYpMQ-N0/s72/beee.gif";
	smileyarr["blush"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEUOsk7Nf0I/AAAAAAAAANk/nc4TeCU8FUk/s72/blush.gif";
        smileyarr["dance"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUPCEjYD6I/AAAAAAAAAOo/3KJYXfSedV8/s72/dance4.gif";
	smileyarr["derisive"]="http://lh3.ggpht.com/_CKYXGFpij-s/TEUPOjxfgcI/AAAAAAAAAPI/E9iI9Fy7qR4/s72/derisive.gif";
        smileyarr["diablo"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEUPO9X0plI/AAAAAAAAAPM/SppJ-zDYfxI/s72/diablo.gif";
	smileyarr["blum"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEUOsZ6dnfI/AAAAAAAAANc/cS_doIJsZA0/s72/blum2.gif";
        smileyarr["blind"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEUOmqf8SKI/AAAAAAAAANY/JRXIYlmypFc/s72/blind.gif";
	smileyarr["declare"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEUPHKRHKpI/AAAAAAAAAO4/sQ6Dn24DImI/s72/declare.gif";
        smileyarr["don't mention"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEUPT0BjH9I/AAAAAAAAAPc/QokQ9U_SfkI/s72/don-t_mention.gif";
	smileyarr["drinks"]="http://lh3.ggpht.com/_CKYXGFpij-s/TEUPYT74cKI/AAAAAAAAAPo/31fhLt0raEI/s72/drinks.gif";
        smileyarr["dwarf"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUPYhUC7uI/AAAAAAAAAPs/2MAVvjO6eLg/s72/dwarf.gif";
	smileyarr["game"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEUP4xlHivI/AAAAAAAAAQo/x03Ce3fxIV4/s72/gamer4.gif";
    	smileyarr["fie"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEUPsPv-zeI/AAAAAAAAAQA/RnwrAbTy324/s72/fie.gif";
	smileyarr["fool"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEUPxXMtTVI/AAAAAAAAAQU/nCj9nVEx418/s72/fool.gif";
	smileyarr["gamer.."]="http://lh5.ggpht.com/_CKYXGFpij-s/TEUPxrDpdcI/AAAAAAAAAQc/6Ujt1yzaRTo/s72/gamer1.gif";
        smileyarr["give heart"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUQT21tXjI/AAAAAAAAAQ4/ieD6mbXakq8/s72/give_heart.gif";
	smileyarr["good"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUQUr_OHwI/AAAAAAAAARI/rQ3rRnqOLG4/s72/good3.gif";
        smileyarr["haha"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUQaYWnL9I/AAAAAAAAARQ/1xy7I9mEafM/s72/haha.gif";
	smileyarr["heat"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEUQf7p8DNI/AAAAAAAAARk/9E_rsEvwhQ8/s72/heat.gif";
        smileyarr["help"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUQf0bdpSI/AAAAAAAAARo/j_slJgfteuk/s72/help.gif";
	smileyarr["ireful"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUQ9HQ4FjI/AAAAAAAAAR8/7-SWhHZzZmc/s72/ireful2.gif";
        smileyarr["king"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEUQ9Y6SWOI/AAAAAAAAASE/yzrQPUFolfw/s72/king.gif";
	smileyarr["lazy"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEURGnImssI/AAAAAAAAASc/KrhHgobspNg/s72/lazy2.gif";
    	smileyarr["mad"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEURPQvOtsI/AAAAAAAAAS4/ytfLgsnk8dg/s72/mda.gif";
	smileyarr["music"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEURUuUm8tI/AAAAAAAAATQ/3eXzdPYFUJM/s72/music2.gif";
        smileyarr["nea"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEURUqOJM1I/AAAAAAAAATU/GpVDlMfdA1s/s72/nea.gif";
	smileyarr["negative"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEURY4v49ZI/AAAAAAAAATY/ejjtiY5-WV4/s72/negative.gif";
        smileyarr["new"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEURZDobzQI/AAAAAAAAATg/VMf5RL3_MME/s72/new_russian.gif";
	smileyarr["no"]="http://lh3.ggpht.com/_CKYXGFpij-s/TEURei7jNXI/AAAAAAAAATs/191p4cr-VVk/s72/no.gif";
        smileyarr["ok"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEURkKefeCI/AAAAAAAAAUE/4oXYGMe5Qfc/s72/ok.gif";
	smileyarr["ph34r"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEURrHUMMxI/AAAAAAAAAUg/bE5lyaSc56s/s72/ph34r.gif";
        smileyarr["rap"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEUSDIygINI/AAAAAAAAAVg/lMV3kXwQXVk/s72/rap.gif";
	smileyarr["rofl"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEUSJbQO1zI/AAAAAAAAAVs/WhzG3hVN1Zc/s72/rofl.gif";
        smileyarr["rtfm"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEUSJuUogcI/AAAAAAAAAVw/9OYPU5d5k90/s72/rtfm.gif";
	smileyarr["sad"]="http://lh3.ggpht.com/_CKYXGFpij-s/TEUSN3pidAI/AAAAAAAAAV4/upiHyZ6FjIc/s72/sad.gif";
    	smileyarr["secret"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEUSbq6t38I/AAAAAAAAAWo/_2xlK2JvkW0/s72/secret.gif";
	smileyarr["shock"]="http://lh3.ggpht.com/_CKYXGFpij-s/TEUSceGQK-I/AAAAAAAAAWs/J43i0YQLqzI/s72/shok.gif";
        smileyarr["shout"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEUSdWOF-UI/AAAAAAAAAWw/FvDRJE_P3Fc/s72/shout.gif";
	smileyarr["sorry"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEUSpsQQEcI/AAAAAAAAAXM/A8Cy8Jhg9tk/s72/sorry.gif";
        smileyarr["stop"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEUSvsL1XOI/AAAAAAAAAXc/7G7UeM0qpjA/s72/stop.gif";
	smileyarr["swoon"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEUS16VXS7I/AAAAAAAAAX8/EqaxswwH0aE/s72/swoon.gif";
        smileyarr["tongue"]="http://lh6.ggpht.com/_CKYXGFpij-s/TEcE00zfJQI/AAAAAAAAAZg/b27pBkXus-0/s72/tongue.gif";
	smileyarr["victory"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEcE6soWfUI/AAAAAAAAAZ4/Ay9JSpFD7eU/s72/victory.gif";
        smileyarr["wink"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEcFFG8pjVI/AAAAAAAAAag/4g6czZ0tRew/s72/wink.gif";
	smileyarr["yahoo"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEcFKC2BNRI/AAAAAAAAAao/YtlxgJ9LFRU/s72/yahoo.gif";
        smileyarr["yes"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEcFK_iVZ-I/AAAAAAAAAaw/m7DLq27tVQU/s72/yes2.gif";
	smileyarr["yu"]="http://lh5.ggpht.com/_CKYXGFpij-s/TEcFOGblxNI/AAAAAAAAAa8/Xsugmv5GJLE/s72/yu.gif";
    	smileyarr["yes"]="http://lh4.ggpht.com/_CKYXGFpij-s/TEcFK3MlYeI/AAAAAAAAAa0/a8ch4jlco2A/s72/yes3.gif";
	smileyarr["lol-034"]="http://lh3.ggpht.com/_PrM5VcwpZio/S1vnsmrxJpI/AAAAAAAABQ0/fdMw8Jb57fQ/lol-034.gif";     
        smileyarr["yawn.1"]="https://lh4.googleusercontent.com/-ufSix1re47c/TRXywIV2ltI/AAAAAAAAAew/rbaDjSQg7Mg/2235_yawn.gif"; 
        smileyarr["angry00"]="https://lh4.googleusercontent.com/-KrfNjEio6T0/TRXywbg59MI/AAAAAAAAAe0/lphyo7HZyGA/angry.gif";     
        smileyarr["biggreen."]="https://lh5.googleusercontent.com/-IRcF0WjM4dI/TRXywTE69SI/AAAAAAAAAe4/Jdbl_xpTYPw/biggrin.gif"; 
        smileyarr["blink"]="https://lh6.googleusercontent.com/-xPeZRGLknh8/TRXywWST2EI/AAAAAAAAAfA/AZJwG1VT24o/blink.gif"; 
        smileyarr["cool"]="https://lh4.googleusercontent.com/-V10YbwHVxs8/TRXy4VaRAJI/AAAAAAAAAfE/gBvYskc3nvE/cool.gif";     
        smileyarr["yes"]="https://lh3.googleusercontent.com/-4vMIus8hpIo/TRXzPCalJ1I/AAAAAAAAAgI/WycFxONM6QE/yes.gif";
        smileyarr["dry"]="https://lh3.googleusercontent.com/-mrIMLRbHGPU/TRXy4UUoe4I/AAAAAAAAAfI/_jqM7y6-rfM/dry.gif";     
        smileyarr["facepalm"]="https://lh6.googleusercontent.com/-vztc5iDDb6U/TRXy4WwbFYI/AAAAAAAAAfM/hBobnpajh-w/facepalm.gif"; 
        smileyarr["laugh1"]="https://lh4.googleusercontent.com/-x7fCBsDJunk/TRXzAPwWl5I/AAAAAAAAAfY/b-evC_myPPY/laugh.gif";     
        smileyarr["wink00"]="https://lh6.googleusercontent.com/-ekj9X9LQIp0/TRXzPOUsWTI/AAAAAAAAAgE/QaeAPtgewlk/wink.gif"; 
        smileyarr["mellow"]="https://lh6.googleusercontent.com/-CHLhJme-cj4/TRXzAeqjpnI/AAAAAAAAAfg/JNrn5XxISM0/mellow.gif";     
        smileyarr["ohmy.."]="https://lh5.googleusercontent.com/-x58t2NVhSh8/TRXzAWLuKsI/AAAAAAAAAfk/MWgrOgyMsiQ/ohmy.gif"; 
        smileyarr["roflroll"]="https://lh6.googleusercontent.com/-Pl1rbjVr-Qg/TRXzAcHvORI/AAAAAAAAAfo/l9TtlZ0IfiI/roflroll.gif";     
        smileyarr["rolleyes00"]="https://lh4.googleusercontent.com/-_Hn4G2oG0eU/TRXzI3a34OI/AAAAAAAAAfs/pcu6YNPzmtk/rolleyes.gif";
        smileyarr["saddd"]="https://lh4.googleusercontent.com/-_uVHVjoXvto/TRXzJNzK0BI/AAAAAAAAAfw/J0u8wraUV4A/sad.gif";     
        smileyarr["tongue00"]="https://lh5.googleusercontent.com/-yffC6pugFek/TRXzJKjPPxI/AAAAAAAAAf8/yPfzJBO6XnE/tongue.gif"; 
        smileyarr["smile"]="https://lh6.googleusercontent.com/-Nxptvtpox0g/TRXzJAzIUPI/AAAAAAAAAf0/jQIm6L38AD8/smile.gif";     
        smileyarr["threatenlumber"]="https://lh5.googleusercontent.com/-fWPwI40dJ6k/TRXzJNBXsYI/AAAAAAAAAf4/abAVpXcjUjc/threatenlumber.gif"; 
        smileyarr["banana dance"]="https://lh3.googleusercontent.com/-OU-oVheD1dQ/TbzzdQn14XI/AAAAAAAAA8c/RYAzHqfaWQs/bananadance.gif"; 
        smileyarr["love.."]="https://lh5.googleusercontent.com/-xGfnlyidY9I/Tbzzdt4GJ5I/AAAAAAAAA8k/n_5cMobbn-8/love.gif";
        smileyarr["yucky"]="https://lh4.googleusercontent.com/-EJ93KbBqreQ/Tbzzd8QQ3cI/AAAAAAAAA8w/ZS2dpYDjDlU/yucky.gif";     
        smileyarr["loof and bored"]="https://lh6.googleusercontent.com/-0s9n0cGG9gg/TJOEWXPtj_I/AAAAAAAAAMg/mLC8-f5ikZk/aloofandbored0.gif"; 
        smileyarr["talking on phone"]="https://lh3.googleusercontent.com/-pkI2kARolNA/TJOEXIn7WBI/AAAAAAAAAMs/G2BO-53Bev8/character35.gif";     
        smileyarr["give up"]="https://lh6.googleusercontent.com/-tDI-Z5IfFzM/TJOEdNNyt1I/AAAAAAAAAM8/abf0eNdwkts/give%252520up.gif"; 
        smileyarr["confused15"]="https://lh3.googleusercontent.com/-muYAjT4SsDQ/TJOEco_RHtI/AAAAAAAAAM0/jt0KaqfM1g8/confused15.gif";     
        smileyarr["sleep.."]="https://lh5.googleusercontent.com/-vbIE4CYTtEo/TJOEiTpo3kI/AAAAAAAAANI/PATxYlrzlwM/shock.gif";
        smileyarr["slept"]="https://lh3.googleusercontent.com/-64yPPmT0Xnc/TJOEirwxIiI/AAAAAAAAANM/dwCOp-T6Y-U/sleep.gif";     
        smileyarr["smiley bounce"]="https://lh5.googleusercontent.com/-F80dR04gWps/TJOEjIaZHJI/AAAAAAAAANU/OrCSkUJ0EFU/smiley-bounce022.gif"; 
        smileyarr["voilent"]="https://lh5.googleusercontent.com/-WunUDqFblpM/TJOEja-c_UI/AAAAAAAAANY/-bpIVVNMiQs/violent10.gif";     
        smileyarr["hii"]="https://lh6.googleusercontent.com/-u5VHzbfYEZQ/S-orxjdx-GI/AAAAAAAAAHk/Ed8Z5Qlx5sc/hi.gif"; 
        smileyarr["l_o_l"]="https://lh4.googleusercontent.com/-gz2k7N3L_28/TJDbKyac46I/AAAAAAAAALg/hllM9qYnAhA/icon_lol.gif";     
        smileyarr["nuts"]="https://lh3.googleusercontent.com/-iM4AJ0UDSfU/TJDbK7kPUgI/AAAAAAAAALk/o52eE1_GEHs/nuts.gif";     
        smileyarr["drinking"]="https://lh5.googleusercontent.com/-jbUI0MXo0So/TAr8k7jb3mI/AAAAAAAAADY/-O7tIRNCEtI/drinking.gif";     
        smileyarr["beatenup"]="https://lh5.googleusercontent.com/-QImIfoCi-Cc/TAr8lL92zSI/AAAAAAAAADc/n-VTJZpL4xw/feeling%252520beat%252520up.gif"; 
        smileyarr["haha"]="https://lh6.googleusercontent.com/-Q28y3hAIGS4/TAr8lpBVdoI/AAAAAAAAADk/2E2LtYUszyI/haha.gif";     
        smileyarr["hitting"]="https://lh4.googleusercontent.com/-ruikjh09HAc/TAr8rt4jgVI/AAAAAAAAAD0/GchmgOoPEaY/hitting.gif"; 
        smileyarr["hurry up"]="https://lh4.googleusercontent.com/-hrKynNYSdYI/TAr8rldDeuI/AAAAAAAAAD4/pm_PHug8iv4/hurry%252520up%252521.gif";     
        smileyarr["dnt know"]="https://lh3.googleusercontent.com/-HOFJwF5Bfzo/TAr8zutiDQI/AAAAAAAAAD8/BtyheG1OgEA/I%252520don%252527t%252520know.gif"; 
        smileyarr["loser"]="https://lh6.googleusercontent.com/-1vWGpACaYTI/TAr80AIzGBI/AAAAAAAAAEM/K5ftbX8KQ1o/loser.gif";     
        smileyarr["nail bitting"]="https://lh4.googleusercontent.com/-p8fIo2VCCeg/TAr8-dPoiCI/AAAAAAAAAEU/sjq5mD6HpyM/nail%252520biting.gif";
        smileyarr["no talking"]="https://lh4.googleusercontent.com/-BbITirbDfBw/TAr8-o4r8TI/AAAAAAAAAEY/VSV_FydoDvs/no%252520talking.gif";     
        smileyarr["not worthy"]="https://lh6.googleusercontent.com/-Ee8NxiwdXac/TAr8-vLpCaI/AAAAAAAAAEc/f5cpcE4KJ8Y/not%252520worthy.gif"; 
        smileyarr["oh go on"]="https://lh6.googleusercontent.com/-PPBxuouNydc/TAr8-wKgFsI/AAAAAAAAAEg/dKDcsqgjIKg/oh%252520go%252520on.gif";     
        smileyarr["party..."]="https://lh3.googleusercontent.com/-ISkV7ezD154/TAr9H4BVjXI/AAAAAAAAAEk/q6FWLPdDXM0/party.gif"; 
        smileyarr["pray"]="https://lh5.googleusercontent.com/-YPm0l9GIs-c/TAr9IOY6LkI/AAAAAAAAAEo/ChtgwzQhfag/praying.gif";     
        smileyarr["raised eyebrows"]="https://lh4.googleusercontent.com/-JMvCQVDHoM8/TAr9ILFJz2I/AAAAAAAAAEs/DEQEVmhbBWk/raised%252520eyebrows.gif"; 
        smileyarr["rolling on the floor"]="https://lh6.googleusercontent.com/-XZhzfi9bomc/TAr9IWKah4I/AAAAAAAAAE0/0xcslWg75ws/rolling%252520on%252520the%252520floor.gif";     
        smileyarr["rose"]="https://lh3.googleusercontent.com/-pIA3ih9lwpE/TAr9SMVYHBI/AAAAAAAAAE4/ojLerdSVlME/rose.gif";
        smileyarr["sou"]="https://lh6.googleusercontent.com/--EAIkQ-1K10/TAr9SQa69kI/AAAAAAAAAFA/sbUKx4NBj4M/shame%252520on%252520you.gif";     
        smileyarr["smug"]="https://lh5.googleusercontent.com/-Vfbhm7SEA0I/TAr9cNL6KqI/AAAAAAAAAFQ/xZyH8-hRt98/smug.gif"; 
        smileyarr["thumbs"]="https://lh4.googleusercontent.com/-LxEEhbX3vcw/TAr9lpOjxoI/AAAAAAAAAFo/tDxnxnCCj4g/thumbs%252520up.gif";     
        smileyarr["thumbup"]="https://lh6.googleusercontent.com/-mfEMPFTust8/TAr9lwAYWUI/AAAAAAAAAFs/jthreHOmR_0/thumbup1.gif"; 
        smileyarr["wave"]="https://lh3.googleusercontent.com/-rWvXuhb2XSw/TRXzPP591wI/AAAAAAAAAgA/hGtvsshHTQw/wave.gif";     
        smileyarr["whew"]="https://lh5.googleusercontent.com/-KVjzT1TlzBQ/TAr9vWox6cI/AAAAAAAAAF8/pOclIS_eUM0/whew.gif"; 
        smileyarr["worried"]="https://lh3.googleusercontent.com/--BGdKm-l2oI/TAr91uMC-6I/AAAAAAAAAGI/MFp9htnPBHA/worried.gif";     
        smileyarr["yawn2"]="https://lh6.googleusercontent.com/-kqD7xeCwd7I/TAr91rRZJuI/AAAAAAAAAGM/sYEcMojHsoU/yawn.gif";
        smileyarr["anger2"]="https://lh3.googleusercontent.com/-NhG4c2eg9y8/TAsEe0_84BI/AAAAAAAAAGk/_u8RcEFRkpg/anger3.gif";     
        smileyarr["angry1"]="https://lh3.googleusercontent.com/-CnQfBTAaq3M/TAsEfCmTm_I/AAAAAAAAAGo/AiiNAjACZwI/angry.gif"; 
        smileyarr["l.o.l"]="https://lh3.googleusercontent.com/-BmpZOnyRZdM/TAsEu1oYgCI/AAAAAAAAAG4/zrIRhltWlcQ/lol.gif";     
        smileyarr["sad2"]="https://lh3.googleusercontent.com/-S3yw_hLJLws/TAsEvcm-RjI/AAAAAAAAAHA/vyGoP3ODmAw/sad.gif";     
        smileyarr["big smile"]="https://lh6.googleusercontent.com/-MJwg54vfpRI/TEUOmKjIEQI/AAAAAAAAANQ/h1NKIWqcYfw/biggrin.gif"; 
        smileyarr["heart...."]="https://lh5.googleusercontent.com/-_caHL0FUWzU/TEUQfrft5tI/AAAAAAAAARg/ewl3Cjeb9Jw/heart.gif";     
        smileyarr["cool"]="https://lh4.googleusercontent.com/-cSSteMZV-o8/TEUOmqf8SKI/AAAAAAAAANY/nT4Cbx61gC0/blind.gif";
        smileyarr["ireful"]="https://lh5.googleusercontent.com/-mwSNZhf66po/TEUQ8t7hfhI/AAAAAAAAAR4/SrqDUkI-nJc/ireful1.gif";     
        smileyarr["give rose"]="https://lh3.googleusercontent.com/-gYr-VSevAO4/TEUQUNDpeWI/AAAAAAAAAQ8/pUqsw2_epJU/give_rose.gif"; 
        smileyarr["nono"]="https://lh6.googleusercontent.com/-RTcY9ld5GQI/TEURe5JV4KI/AAAAAAAAAT0/u3V04cQIe1s/nono.gif";     
        smileyarr["arrow"]="https://lh6.googleusercontent.com/-L70BonYNhG8/THqmWxZY9FI/AAAAAAAAAdM/KVOT7nfMRWY/icon_arrow.gif"; 
        smileyarr["rolling eyes"]="https://lh3.googleusercontent.com/-ZrZ9wdWZDtA/THqmYNX4yHI/AAAAAAAAAdc/EqPNVci5c8Q/icon_rolleyes.gif"; 
        smileyarr["birthday"]="https://lh3.googleusercontent.com/-riMh1GZQEbU/TRXywTegaVI/AAAAAAAAAe8/ySbrOD6s3Lc/birthday.gif";   
        smileyarr["yay"]="https://lh6.googleusercontent.com/-uYIIRpqUnGg/TbzzdwD2NwI/AAAAAAAAA8o/dgUKNv2qNxg/yay.gif";
        smileyarr["hahahaha"]="https://lh6.googleusercontent.com/_CKYXGFpij-s/TEUQaYWnL9I/AAAAAAAAARQ/1xy7I9mEafM/haha.gif";


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




















