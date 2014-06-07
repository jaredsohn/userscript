// ==UserScript==
// @name          Clean Language II
// @namespace     justizin.bravehost.com
// @description	  Clean Language II - The Janitor of Swear Words on the web, replacing them with ***.
// ==/UserScript==

//Clean Language II by Justin Chong of Hong Kong, China. (www.justizin.bravehost.com)
//Contact: justinchong@hotmail.com - Be sure to state Clean Language II letter in subject.
//|-----|    |-----|
//|     |    |      |
//|     |    |      |
//|     |----       |
//                  |
//|     |----|      |
//|     |    |      |ONG KONG ROX!! VISIT HONG KONG!
//|     |    |      |
//|-----|    |------|
  
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
//

(function() {
//edit the words here but ...
var badwords=['ass
arse
ass face
assmonkey
ass licker
dick
ass crack
ars3
bastardz
basterds
basterdz
Biatch
bitch
bitches
Blow Job
boffing
butthole
buttwipe
c0ck
c0cks
c0k
Carpet Muncher
cawk
cawks
Clit
cnts
cntz
cock
cockhead
cock-head
cocks
CockSucker
cock-sucker
crap
cum
cunt
cunts
cuntz
dick
dild0
dild0s
dildo
dildos
dilld0
dilld0s
dominatricks
dominatrics
dominatrix
dyke
enema
f u c k
f u c k e r
fag
fag1t
faget
fagg1t
faggit
faggot
fagit
fags
fagz
faig
faigs
fart
flipping the bird
fuck
fucker
fuckin
fucking
fucks
Fudge Packer
fuk
Fukah
Fuken
fuker
Fukin
Fukk
Fukkah
Fukken
Fukker
Fukkin
g00k
gay
gayboy
gaygirl
gays
gayz
God-damned
h00r
h0ar
h0re
hells
hoar
hoor
hoore
jackoff
jap
japs
jerk-off
jisim
jiss
jizm
jizz
knob
knobs
knobz
kunt
kunts
kuntz
Lesbian
Lezzian
Lipshits
Lipshitz
masochist
masokist
massterbait 
masstrbait
masstrbate
masterbaiter
masterbate
masterbates
Motha Fucker
Motha Fuker
Motha Fukkah
Motha Fukker
Mother Fucker
Mother Fukah
Mother Fuker
Mother Fukkah
Mother Fukker
mother-fucker
Mutha Fucker
Mutha Fukah
Mutha Fuker
Mutha Fukkah
Mutha Fukker
n1gr
nastt 
nigger;
nigur;
niiger;
niigr;
orafis
orgasim;
orgasm
orgasum
oriface
orifice
orifiss
packi
packie
packy
paki
pakie
paky
pecker
peeenus
peeenusss
peenus
peinus
pen1s
penas
penis
penis-breath
penus
penuus
Phuc
Phuck
Phuk
Phuker
Phukker
polac
polack
polak
Poonani
pr1c
pr1ck
pr1k
pusse
pussee
pussy
puuke
puuker
queer
queers
queerz
qweers
qweerz
qweir
recktum
rectum
retard
sadist
scank
schlong
screwing
semen
sex
sexy
Sh!t
sh1t
sh1ter
sh1ts
sh1tter
sh1tz
shit
shits
shitter
Shitty
Shity
shitz
Shyt
Shyte
Shytty
Shyty
skanck
skank
skankee
skankey
skanks
Skanky
slut
sluts
Slutty
slutz
son-of-a-bitch
tit
turd
va1jina
vag1na
vagiina
vagina
vaj1na
vajina
penis
c0ck sucker
vullva
vulva
w0p
wh00r
wh0re
whore
xrated
xxx];

//do not touch anything below here
var bw="\\b("+badwords.join("|")+")\\b";
bw=new RegExp(bw, "gi");
 
var els = document.evaluate('//*', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var el,i=0;
while (el=els.snapshotItem(i++)) {
	//don't mess with these tags
	if ('SCRIPT'==el.tagName) continue;
	if ('STYLE'==el.tagName) continue;

	for (var j=0; j<el.childNodes.length; j++) {
		if ('#text'==el.childNodes[j].nodeName) {
			el.childNodes[j].textContent=el.childNodes[j].textContent.replace(bw, '***');
		}
	}
}
document.title=document.title.replace(bw, '***');
})
();