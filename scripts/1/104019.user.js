// ==UserScript==
// @name                VZ.lt unlimiter
// @namespace	        http://justinas.me
// @description	        VZ.lt naujienų portalas nemokamai
// @include				http://vz.lt/*
// @include				http://www.vz.lt/*
// @include				https://vz.lt/*
// @include				https://www.vz.lt/*
// ==/UserScript==

/*
..............................................................-------------------------------`      
.....................................................................------------------------.`     
............................................................................-----------------`      
````..............................................-...............................-----------.      
``````````....................................------------....................................      
```````````````.............................----::::///::---..................................      
``````````````````.................----..--..-:////sysssso+/:--...............................      
````````````````````````.........--://///::---:/:+ssssyyhhhhyso/--............................      
```````````````````````````....-:+ossyssso:---:-///+ooyhddmmmmmmdhs+:.......................`       
```````````````````````````..-/osyhhhhhhyo/:--:/+++syddmmmmmmmmmmmmmmdo-.....................       
`````````````````````````-//+yyhyhhdddddddhs--://os+hddddmmmmmmmmmmmmmmd+.....................`     
```````````````````  `.:/+oohhyyhhhddhhyyyyys+/ooyhyyhhhddddmmmmmmmmmmmmdy....................`     
````````` `````....-.-:/+shmNNdyhhhhhysooooos+:..-/syyhhhdddddddmmmmmmmmddo/..................`     
`  ```````.-::/++///////++mmmhyyhhyyo+///+++oo/--::oyyhhhhhhhddddddmmmmmdhhdo-................`     
  `.:::://+////sssso+oosshmhssyyyys+::::///+sy+////+shyyyyhhhhhhhhhddddddhhydy-...............`     
 `-/+oooooso++/+ss/:+yhddmysyyhhss+/+//:-:/yhoo++++++syhhyyyyyyyyyyyhhddhdmdydy:..............`     
 -:/+oooo::+oo+++o+osyyhhhymmmmdso/sssso:/yyo++++/////+oyhdhyyyyssyyhddmmNNNdsds-``````````````     
`-//++oo//+oo+/oooss+/ddmmNmhhhhhsyyyyyyyyso++++////////+oossyyyyyyyyhmNNNNNmdsdo-..```````````     
.:/+/oo+oooo/:+osso-.smNNNmddddhhyhhhhhss+oo++///////////++oooo+++++osdNNNNNmmhhh/....`````````     
-:///+++oo+//oooo-``-ymNNhs/:::/+syyyso/oooooo+++//////++osyyyysso+++ohNNNNNmmmydy:.```````````     
-:///++oo/:+oooo.```/hds:::////+yhysyysssyyyysso++/////+ooosoo+/////+oymNNNNNmmddh/..``````````     
:////+oooo+ooo+. ```/s/.::://+ohyyyssso++++oooooo+/::///+osssysso++//+omNNNNNmmddds-.....`.....     
:///++ooooooo:`````.//`-///+oyhyssssooosyyyyyysoo//::://+oyhhddddyyso++yNNNNNmmmdhh/--.........     
::://+oooooo/  ```.-//://++oddhyssssyhddmdhyyyso/./::::/++oooooo+++++++omNNNNmmmdhh+----.......     
-::///+++ooo`  ```-//////+yNNdysoossyysssoooooo/.:/::-:////++++////////+yNNNNNmmdhhs--:--...---     
-::///++ooo+://:-/+//////yNNNdys++++ooo+++++++/.-///::-:///////////::://omNNNNmmdhhs:--........     
-::://++o++ooo++///+////oNNNNmys//:+++++++/////.-///:::::////////::::::/+mNNNNmdmhhy/--........     
.:::://+o+ooo+++///////+ymNNNmhs//./////////////.//:::::::://///:::::::/+mNNNNNdmhhy/:---....``     
/++++///+o++++///////++osdmNmmds/:`://////////++///+////////++///::::::/oNmNNNmdddhh+/:-......      
dmmddhso+++//////////++yysdmmmdh+:..//////////++/+oyso+++ss++/////:::::/ymmNNNNmdddho/:-..``.`      
Nmmmmmmmhsoo////////++/syoydmmdhs/-`:///////////+++o+++++ooo+//////:::/+ddmNNNmmdddhs//:-..`.`      
mmmNmmmmmmmdys//////+//+yoyhddhdyo:..//++++/++///::////////////////:::/odmmNNNNmdddhs/::--..`       
mmNNmmmmmNNNNmyy+/++/:/:sooshdhhyy+:..:++++++////////://///////////::/+sNNmNNNNNmdddyo:/-..`        
mmNNNNNNNNmNNNNmdo+:-:::+s+sshhhhhs/:..-/+++++///////+++++++//////:::/+hNNNNNNNNNdddhs/:-....       
NNNNNNNNNNNNNNNNNmy/--::/o/s+hhmmmyo/:-..:++++++ooosssssssssoos++/:://omNNNNNmNNNmhdhy+:-.`..       
mmmNNNNNNNNNNNNNNNNh:-:::++o+hddmdhyo/-.-://+osso++++ooooo++++o//////+hNNNNNmmmNNNddhys/-...-       
dddddydmmNNNNNNNNNNNy-:://+++hdmmmdhys+:--:/:-/oooooooooooooo+//////+sNNNNNNmmNNNNddhhs+-```.       
NNNmmdmddmmmNNNNNNNNNh+//++oshdmmNmmmhso/:-::-.-/osssssssooo+///////smNNNNNNNNNNNNddhhyo:   `       
mmmmNNNNmmmmmNNNNNNNNd///ossydhmNNNmNNdyo+/::----:+oosssooo+///////ymNNNNNNNNNNNNNmddhhs+...:`      
NNNmmmNNNmmmmmNNNNmmdo://oyyydymmNNmNNNmdyo+::..-:::::+o++///:::/+hNNNNNNNNNNNNNNNmmdhhso:../`      
NNNNNNNNmmmmNmNNmdyoo+/:/ohhsdhddmNmmNNNNNdyo/:-`.....-////:::/+ymNNNNNNNNNNNNNNNmmmmdhyo/``/.      
NNNNNNNNmNmmmmmmooo++////ohdhhhmhdmmmNNNNNNNmhs/:.`.-:///////+sdNNNNNNNNNNNNNNNNNmmmmdhys+:-+`      
NNNNNNNNNmNNNNmh+/++/:+ooshddyhdmdddmNNNNNNNNNNmdyo++oooossshdmNNNNNNNNNNNNNNNNmmmmmmdhys+/.:`      
NNNNNNNNNNNNNNms/:/++//ooyhddyhdmmdddmmNNNNNNNNNNNNNNmmddddddmmNNNNNNNNNNNNNNNNmmmmmmddyso/--`      
NNNNNNNNNNNNNNh+//:o+//osshddhddddddmmmNNNNNNNNNNNNNNNNNNNmmddmmmmdmNNNNNNNNNNmmmmmmmmdyso+-.       
NNNNNNNNNNNNNm+++//++//+ssyddddddhdhmNmmNNNNNNNNNNNNNNNNNNNNNNNmmmNNNNNNNmmNNNNmmNmmdmdhs++-        
NNNNNNNmNNNNNs/++oo++::/osshddddddddmNNmmNNNNNNNNNNNNNNNNNNNNdmmNNNNmmmmNNmNmNNmmmmmdmdhs+/:`       
NNNNNNNNNNNNh+//+ohy+::/syyyhhddhdddNNNmmmNNNNNNNNNNNNmmmdmmmmNNmmmmmNmNNNNNmNNNNmNmdmmdso++/-      
NNNNNNNNNNNm++:/osyso/:/oyyyyhhhyhdmNNNNmmmNmmNNNmmmmmmNNNNNNmdmmNNNNNNNNNNNNNNNmmNmdmmdyo++oo/     
NNNNNNNNNNms//:/ossys/osoooyyyhhyydmNNNNNNmmmNNNNNNNNNNNNNmmmmNNmNNNNNNNNNNNNNNNmNNmdmmdyo++/:.``   
NNNNNNNNNmo///:+ooyss+shs/ossshyoshmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmddmhhs++:.....``
NNNNNNNNm/:+++/ooyyyooyh+/osssdhs/hmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmhmmdhso++.``````
NNNNNNNNd:/+++++yyhyooyy/oyysydds/yNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNdmmdhyooo-``````
NNNNNNNNs//+s++shyhyssyoosyyyhdms/smNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNdmmdhhsooo/:-..`
NNNNNNNm://os++hdhdhyssoosyhhymdyosmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmdmdhyysoohdddhy
NNNNNNNo://yooyddhhdhsos+ohhhhddhsydNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNdddhhysssyhmmmm
NNNNNmy/:/ososhddhdmy+yy+ohhyddmhsydNNNNNNNNNNNNNNNNNNNNNNNNNNMMMNNNNNNNNNNNNNNNNNNNNmmdhhyyyyyhdmmm
NNNNNh+/:+osohhhhhhdsohs+shhhmddhysmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmdhyyyhyyydmmm
NNNmmds++oosohhdhhhdsyhooshddmdhhohmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmdhyhyhhyyddmm
NNNNNmhso+ooshdhdydhyyysoyyddmdhysmmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmdhydhydhhhdmN
NNNNNmmhsoooyhhhdhdhyyysoydmmmmhhyNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmmdydmyhhhdmmm
NNNNNNmhysosyhhhddhhhyyoyhmmNmmhsdNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmdhmmdddddmNm
NNNNNNddyysshyhdhhhhdys+ddmmmmhhdNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmddNmmmmddmm+
NNNNNmmmdhssdyhhyhdhys+ydmmmmmmmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmmNNmNNNNm+`
NNNNNNNmdmyymhhyyhyys+ohmNmmmmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmmmNNNNNNNs` 
NNNNNNNNmNdmdddhysys+shdmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNy``.
NNNNNNNNNNdmdmdshyyoshddNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmNNNNNNNNNNNNNh--:/
NNNNNNNNNmNNmmhdddhyddmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmNNNNNNNNNNNmy::::
NNNNNNNNNNNNNNmNNmdmNdmmNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmNNNNNNNNmNo:::/
NNNNNNNNNNNNNNNNNNNNMNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmNNNNNNNmd/:///
NNNNNNNNNNNNNNNNNNNMMMNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmmNNNNNmdy+:/:
NNNNNNNNNNNNMNNNNNNMMMNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmmNNNmmNmo+o
NNNNNNNNNNNNNNNNNNNNMMMNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmmmmmmmmmmNNmyy
NNNNNNNNNNNNNNNNNNNNNMMNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmhdmNNNhy
NNNNNNNNNNNNNNNNNNNNNNMMNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNmmmmmmmNNNh:
*/
function own() {
document.styleSheets[1].insertRule('#articleLoginOverlay {display: none;}',0)
0
document.styleSheets[1].insertRule('#articleLoginForm { display:none; }',0)
console.log('finished owning VZ.lt')
}

own()
