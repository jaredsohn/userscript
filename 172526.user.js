// ==UserScript==
// @name           BATracer Image Replacer
// @namespace      http://lolsaurus.rex
// @include        http://batracer.com/*
// @exclude        http://batracer.com/-cx
// @exclude        http://batracer.com/-cr?d*
// @exclude        http://batracer.com/-us*
// @exclude        http://batracer.com/-ua*
// ==/UserScript==
//written by racingstefan (http://batracer.com/-us?G5f) include and exclude stuff by gtpsharky

//Seriespics
var zevenennegentig = new Object(); 
zevenennegentig.src = "http://darioriccioni.net/replacer/175.gif";  

var nulacht = new Object(); 
nulacht.src = "http://darioriccioni.net/replacer/139.gif";  

var zesentachtig = new Object(); 
zesentachtig.src = "http://darioriccioni.net/replacer/79.jpg";  

var batseven = new Object(); 
batseven.src = "http://darioriccioni.net/replacer/107.jpg";  

var britishtourers = new Object(); 
britishtourers.src = "http://darioriccioni.net/replacer/78.jpg";  

var champcar = new Object(); 
champcar.src = "http://darioriccioni.net/replacer/82.jpg";  

var formulanations = new Object(); 
formulanations.src = "http://darioriccioni.net/replacer/77.jpg";  

var zupacars = new Object(); 
zupacars.src = "http://darioriccioni.net/replacer/83.jpg";  

var bestecarsetvanallemaal = new Object(); 
bestecarsetvanallemaal.src = "http://darioriccioni.net/replacer/106.gif";  

var mrtwee = new Object(); 
mrtwee.src = "http://darioriccioni.net/replacer/120.jpg";  

var negenennegentig = new Object(); 
negenennegentig.src = "http://darioriccioni.net/replacer/173.gif";  

var nulvijf = new Object(); 
nulvijf.src = "http://darioriccioni.net/replacer/174.gif";  

var champcartwee = new Object(); 
champcartwee.src = "http://darioriccioni.net/replacer/179.gif";  

var indycarnulacht = new Object(); 
indycarnulacht.src = "http://darioriccioni.net/replacer/195.jpg";  

var indyvijfhonderd = new Object(); 
indyvijfhonderd.src = "http://darioriccioni.net/replacer/202.jpg";  

var nulnegen = new Object(); 
nulnegen.src = "http://darioriccioni.net/replacer/213.gif";  

var DEUTSCHETOURWAGENSCH = new Object(); 
DEUTSCHETOURWAGENSCH.src = "http://darioriccioni.net/replacer/234.jpg";  

var grandprixtwee = new Object(); 
grandprixtwee.src = "http://darioriccioni.net/replacer/265.jpg";  

var formuladrie = new Object(); 
formuladrie.src = "http://darioriccioni.net/replacer/264.gif";  

var classictrans = new Object(); 
classictrans.src = "http://darioriccioni.net/replacer/267.jpg";  

var nulzeven = new Object(); 
nulzeven.src = "http://darioriccioni.net/replacer/119.gif";  

var nultien = new Object(); 
nultien.src = "http://darioriccioni.net/replacer/280.jpg";  

var supercartien = new Object(); 
supercartien.src = "http://darioriccioni.net/replacer/299.jpg";  

var msgt = new Object(); 
msgt.src = "http://darioriccioni.net/replacer/300.jpg";  

var nultwee = new Object(); 
nultwee.src = "http://darioriccioni.net/replacer/80.jpg";  

var nulzes = new Object(); 
nulzes.src = "http://darioriccioni.net/replacer/81.jpg";  

//Carselection
//1986
var achtzeswilliams = new Object(); 
achtzeswilliams.src = "http://darioriccioni.net/replacer/63.jpg"; 

var achtzesmclaren = new Object(); 
achtzesmclaren.src = "http://darioriccioni.net/replacer/64.jpg"; 

var achtzeslotus = new Object(); 
achtzeslotus.src = "http://darioriccioni.net/replacer/65.jpg"; 

var achtzesferrari = new Object(); 
achtzesferrari.src = "http://darioriccioni.net/replacer/66.jpg"; 

var achtzesligier = new Object(); 
achtzesligier.src = "http://darioriccioni.net/replacer/67.jpg"; 

var achtzesbenneton = new Object(); 
achtzesbenneton.src = "http://darioriccioni.net/replacer/68.jpg"; 

var achtzestyrell = new Object(); 
achtzestyrell.src = "http://darioriccioni.net/replacer/69.jpg"; 

var achtzeslola = new Object(); 
achtzeslola.src = "http://darioriccioni.net/replacer/70.jpg"; 

var achtzesbrabham = new Object(); 
achtzesbrabham.src = "http://darioriccioni.net/replacer/71.jpg"; 

var achtzesarrows = new Object(); 
achtzesarrows.src = "http://darioriccioni.net/replacer/72.jpg"; 

var achtzeszakspeed = new Object(); 
achtzeszakspeed.src = "http://darioriccioni.net/replacer/73.jpg"; 

var achtzesosella = new Object(); 
achtzesosella.src = "http://darioriccioni.net/replacer/74.jpg"; 

var achtzesags = new Object(); 
achtzesags.src = "http://darioriccioni.net/replacer/75.jpg"; 

var achtzesminardi = new Object(); 
achtzesminardi.src = "http://darioriccioni.net/replacer/76.jpg"; 

//2005
var nulvijfminardi = new Object(); 
nulvijfminardi.src = "http://darioriccioni.net/replacer/163.gif";  

var nulvijfjordan = new Object(); 
nulvijfjordan.src = "http://darioriccioni.net/replacer/164.gif";  

var nulvijftoyota = new Object(); 
nulvijftoyota.src = "http://darioriccioni.net/replacer/165.gif";  

var nulvijfredbull = new Object(); 
nulvijfredbull.src = "http://darioriccioni.net/replacer/166.gif";  

var nulvijfsauber = new Object(); 
nulvijfsauber.src = "http://darioriccioni.net/replacer/167.gif";  

var nulvijfmclaren = new Object(); 
nulvijfmclaren.src = "http://darioriccioni.net/replacer/168.gif";  

var nulvijfwilliams = new Object(); 
nulvijfwilliams.src = "http://darioriccioni.net/replacer/169.gif";  

var nulvijfrenault = new Object(); 
nulvijfrenault.src = "http://darioriccioni.net/replacer/170.gif";  

var nulvijfbar = new Object(); 
nulvijfbar.src = "http://darioriccioni.net/replacer/171.gif";  

var nulvijfferrari = new Object(); 
nulvijfferrari.src = "http://darioriccioni.net/replacer/172.gif";  

var eeneen = new Object(); 
eeneen.src = "http://darioriccioni.net/replacer/323.jpg";  

//1997
var negenzevenarrows = new Object(); 
negenzevenarrows.src = "http://darioriccioni.net/replacer/140.gif";  

var negenzevenwilliams = new Object(); 
negenzevenwilliams.src = "http://darioriccioni.net/replacer/141.gif";  

var negenzeventyrell = new Object(); 
negenzeventyrell.src = "http://darioriccioni.net/replacer/142.gif";  

var negenzevenbenneton = new Object(); 
negenzevenbenneton.src = "http://darioriccioni.net/replacer/143.gif";  

var negenzevenferrari = new Object(); 
negenzevenferrari.src = "http://darioriccioni.net/replacer/144.gif";  

var negenzevenmclaren = new Object(); 
negenzevenmclaren.src = "http://darioriccioni.net/replacer/145.gif";  

var negenzevenjordan = new Object(); 
negenzevenjordan.src = "http://darioriccioni.net/replacer/146.gif";  

var negenzevenprost = new Object(); 
negenzevenprost.src = "http://darioriccioni.net/replacer/147.gif";  

var negenzevensauber = new Object(); 
negenzevensauber.src = "http://darioriccioni.net/replacer/148.gif";  

var negenzevenminardi = new Object(); 
negenzevenminardi.src = "http://darioriccioni.net/replacer/149.gif";  

var negenzevenstewart = new Object(); 
negenzevenstewart.src = "http://darioriccioni.net/replacer/150.gif";  

var negenzevenrolflol = new Object(); 
negenzevenrolflol.src = "http://darioriccioni.net/replacer/151.jpg";  

//1999
var negennegenwilliams = new Object(); 
negennegenwilliams.src = "http://darioriccioni.net/replacer/152.gif";  

var negennegensauber = new Object(); 
negennegensauber.src = "http://darioriccioni.net/replacer/153.gif";  

var negennegenprost = new Object(); 
negennegenprost.src = "http://darioriccioni.net/replacer/154.gif";  

var negennegenstewart = new Object(); 
negennegenstewart.src = "http://darioriccioni.net/replacer/155.gif";  

var negennegenminardi = new Object(); 
negennegenminardi.src = "http://darioriccioni.net/replacer/156.gif";  

var negennegenmclaren = new Object(); 
negennegenmclaren.src = "http://darioriccioni.net/replacer/157.gif";  

var negennegenjordan = new Object(); 
negennegenjordan.src = "http://darioriccioni.net/replacer/158.gif";  

var negennegenferrari = new Object(); 
negennegenferrari.src = "http://darioriccioni.net/replacer/159.gif";  

var negennegenbenetton = new Object(); 
negennegenbenetton.src = "http://darioriccioni.net/replacer/160.gif";  

var negennegenbar = new Object(); 
negennegenbar.src = "http://darioriccioni.net/replacer/161.gif";  

var negennegenarrows = new Object(); 
negennegenarrows.src = "http://darioriccioni.net/replacer/162.gif";  

//2009
var nulnegenferrari = new Object(); 
nulnegenferrari.src = "http://darioriccioni.net/replacer/203.jpg";  

var nulnegenmclaren = new Object(); 
nulnegenmclaren.src = "http://darioriccioni.net/replacer/204.jpg";  

var nulnegenbmw = new Object(); 
nulnegenbmw.src = "http://darioriccioni.net/replacer/205.jpg";  

var nulnegenrenault = new Object(); 
nulnegenrenault.src = "http://darioriccioni.net/replacer/206.jpg";  

var nulnegentoyota = new Object(); 
nulnegentoyota.src = "http://darioriccioni.net/replacer/207.jpg";  

var nulnegentororosso = new Object(); 
nulnegentororosso.src = "http://darioriccioni.net/replacer/208.jpg";  

var nulnegenredbull = new Object(); 
nulnegenredbull.src = "http://darioriccioni.net/replacer/209.jpg";  

var nulnegenwilliams = new Object(); 
nulnegenwilliams.src = "http://darioriccioni.net/replacer/210.jpg";  

var nulnegenforceindia = new Object(); 
nulnegenforceindia.src = "http://darioriccioni.net/replacer/211.jpg";  

var nulnegenbrawn = new Object(); 
nulnegenbrawn.src = "http://darioriccioni.net/replacer/212.jpg";  

//DTM
var dtmaudizeven = new Object(); 
dtmaudizeven.src = "http://darioriccioni.net/replacer/214.jpg";  

var dtmaudizes = new Object(); 
dtmaudizes.src = "http://darioriccioni.net/replacer/218.jpg";  

var dtmaudivijf = new Object(); 
dtmaudivijf.src = "http://darioriccioni.net/replacer/222.jpg";  

var dtmmerczeven = new Object(); 
dtmmerczeven.src = "http://darioriccioni.net/replacer/224.jpg";  

var dtmmerczes = new Object(); 
dtmmerczes.src = "http://darioriccioni.net/replacer/228.jpg";  

var dtmmercvijf = new Object(); 
dtmmercvijf.src = "http://darioriccioni.net/replacer/232.jpg";  

//MR2
var mrawm = new Object(); 
mrawm.src = "http://darioriccioni.net/replacer/121.jpg";  

var mrswm = new Object(); 
mrswm.src = "http://darioriccioni.net/replacer/122.jpg";  

var mrzzwdries = new Object(); 
mrzzwdries.src = "http://darioriccioni.net/replacer/124.jpg";  

var mrzzwdrie = new Object(); 
mrzzwdrie.src = "http://darioriccioni.net/replacer/124.jpg";  

var mraw = new Object(); 
mraw.src = "http://darioriccioni.net/replacer/125.jpg";  

var mrsw = new Object(); 
mrsw.src = "http://darioriccioni.net/replacer/126.jpg";  

var mrzzw = new Object(); 
mrzzw.src = "http://darioriccioni.net/replacer/127.jpg";  

//LMES
var lmesbeemdrie = new Object(); 
lmesbeemdrie.src = "http://darioriccioni.net/replacer/84.jpg";  

var lmesbeemvier = new Object(); 
lmesbeemvier.src = "http://darioriccioni.net/replacer/85.jpg";  

var lmesteamwales = new Object(); 
lmesteamwales.src = "http://darioriccioni.net/replacer/86.jpg";  

var lmesporsche = new Object(); 
lmesporsche.src = "http://darioriccioni.net/replacer/87.jpg";  

var lmestvr = new Object(); 
lmestvr.src = "http://darioriccioni.net/replacer/88.jpg";  

var dubbeloseven = new Object(); 
dubbeloseven.src = "http://darioriccioni.net/replacer/89.jpg";  

var lmessupervett = new Object(); 
lmessupervett.src = "http://darioriccioni.net/replacer/90.jpg";  

var lmesdodge = new Object(); 
lmesdodge.src = "http://darioriccioni.net/replacer/91.jpg";  

var lmeswales = new Object(); 
lmeswales.src = "http://darioriccioni.net/replacer/92.jpg";  

var lmeslambo = new Object(); 
lmeslambo.src = "http://darioriccioni.net/replacer/93.jpg";  

var lmesrolflol = new Object(); 
lmesrolflol.src = "http://darioriccioni.net/replacer/94.jpg";  

var lmeszeikerdrie = new Object(); 
lmeszeikerdrie.src = "http://darioriccioni.net/replacer/95.jpg";  

var lmestiago = new Object(); 
lmestiago.src = "http://darioriccioni.net/replacer/96.jpg";  

var lmesobvious = new Object(); 
lmesobvious.src = "http://darioriccioni.net/replacer/97.jpg";  

var lmesboon = new Object(); 
lmesboon.src = "http://darioriccioni.net/replacer/98.jpg";  

var lmesaldi = new Object(); 
lmesaldi.src = "http://darioriccioni.net/replacer/99.jpg";  

var lmeslama = new Object(); 
lmeslama.src = "http://darioriccioni.net/replacer/100.jpg";  

var lmeszaczescupvierhonderd = new Object(); 
lmeszaczescupvierhonderd.src = "http://darioriccioni.net/replacer/101.jpg";  

var lmeszeikervier = new Object(); 
lmeszeikervier.src = "http://darioriccioni.net/replacer/102.jpg";  

var lmespesca = new Object(); 
lmespesca.src = "http://darioriccioni.net/replacer/103.jpg";  

var lmespan = new Object(); 
lmespan.src = "http://darioriccioni.net/replacer/104.jpg";  

var lmesbent = new Object(); 
lmesbent.src = "http://darioriccioni.net/replacer/105.jpg";  

//2010
var nultienmclaren = new Object(); 
nultienmclaren.src = "http://darioriccioni.net/replacer/268.jpg";  

var nultienmercedes = new Object(); 
nultienmercedes.src = "http://darioriccioni.net/replacer/269.jpg";  

var nultienredbull = new Object(); 
nultienredbull.src = "http://darioriccioni.net/replacer/270.jpg";  

var nultienferrari = new Object(); 
nultienferrari.src = "http://darioriccioni.net/replacer/271.jpg";  

var nultienwilliams = new Object(); 
nultienwilliams.src = "http://darioriccioni.net/replacer/272.jpg";  

var nultienrenault = new Object(); 
nultienrenault.src = "http://darioriccioni.net/replacer/273.jpg";  

var nultienforceindia = new Object(); 
nultienforceindia.src = "http://darioriccioni.net/replacer/274.jpg";  

var nultientororosso = new Object(); 
nultientororosso.src = "http://darioriccioni.net/replacer/275.jpg";  

var nultienlotus = new Object(); 
nultienlotus.src = "http://darioriccioni.net/replacer/276.jpg";  

var nultienhrt = new Object(); 
nultienhrt.src = "http://darioriccioni.net/replacer/277.jpg";  

var nultiensauber = new Object(); 
nultiensauber.src = "http://darioriccioni.net/replacer/278.jpg";  

var nultienvirgin = new Object(); 
nultienvirgin.src = "http://darioriccioni.net/replacer/279.jpg";  

//BTCC
var btccastra = new Object(); 
btccastra.src = "http://darioriccioni.net/replacer/19.jpg";  

var btcczs = new Object(); 
btcczs.src = "http://darioriccioni.net/replacer/20.jpg";  

var btccproton = new Object(); 
btccproton.src = "http://darioriccioni.net/replacer/21.jpg";  

var btcccivicr = new Object(); 
btcccivicr.src = "http://darioriccioni.net/replacer/22.jpg";  

var btccpeugvier = new Object(); 
btccpeugvier.src = "http://darioriccioni.net/replacer/23.jpg";  

var btccclio = new Object(); 
btccclio.src = "http://darioriccioni.net/replacer/24.jpg";  

var btccalfa = new Object(); 
btccalfa.src = "http://darioriccioni.net/replacer/25.jpg";  

var btcccivic = new Object(); 
btcccivic.src = "http://darioriccioni.net/replacer/26.jpg";  

var btccaccord = new Object(); 
btccaccord.src = "http://darioriccioni.net/replacer/27.jpg";  

var btccpeugdrie = new Object(); 
btccpeugdrie.src = "http://darioriccioni.net/replacer/28.jpg";  

var btccbeemah = new Object(); 
btccbeemah.src = "http://darioriccioni.net/replacer/29.jpg";  

//GP2, F3, A1, CC
var gptwee = new Object(); 
gptwee.src = "http://darioriccioni.net/replacer/239.gif";  

var aaeen = new Object(); 
aaeen.src = "http://darioriccioni.net/replacer/44.gif";  

var aaeencar = new Object(); 
aaeencar.src = "http://darioriccioni.net/replacer/45.jpg";  

var fdrieeen = new Object(); 
fdrieeen.src = "http://darioriccioni.net/replacer/235.gif";  

var fdrietwee = new Object(); 
fdrietwee.src = "http://darioriccioni.net/replacer/236.gif";  

var fdriedrie = new Object(); 
fdriedrie.src = "http://darioriccioni.net/replacer/237.gif";  

var fdrievier = new Object(); 
fdrievier.src = "http://darioriccioni.net/replacer/238.gif";  

var cceen = new Object(); 
cceen.src = "http://darioriccioni.net/replacer/41.jpg";  

var cctwee = new Object(); 
cctwee.src = "http://darioriccioni.net/replacer/42.jpg";  

var ccdrie = new Object(); 
ccdrie.src = "http://darioriccioni.net/replacer/43.jpg";  

var cctweeeen = new Object(); 
cctweeeen.src = "http://darioriccioni.net/replacer/176.jpg";  

var cctweetwee = new Object(); 
cctweetwee.src = "http://darioriccioni.net/replacer/177.jpg";  

var cctweedrie = new Object(); 
cctweedrie.src = "http://darioriccioni.net/replacer/178.jpg";  

//Indycar2008
var indycareen = new Object(); 
indycareen.src = "http://darioriccioni.net/replacer/180.jpg";  

var indycartwee = new Object(); 
indycartwee.src = "http://darioriccioni.net/replacer/181.jpg";  

var indycardrie = new Object(); 
indycardrie.src = "http://darioriccioni.net/replacer/182.jpg";  

var indycarvier = new Object(); 
indycarvier.src = "http://darioriccioni.net/replacer/183.jpg";  

var indycarvijf = new Object(); 
indycarvijf.src = "http://darioriccioni.net/replacer/184.jpg";  

var indycarzes = new Object(); 
indycarzes.src = "http://darioriccioni.net/replacer/185.jpg";  

var indycarzeven = new Object(); 
indycarzeven.src = "http://darioriccioni.net/replacer/186.jpg";  

var indycaracht = new Object(); 
indycaracht.src = "http://darioriccioni.net/replacer/187.jpg";  

var indycarnegen = new Object(); 
indycarnegen.src = "http://darioriccioni.net/replacer/188.jpg";  

var indycartien = new Object(); 
indycartien.src = "http://darioriccioni.net/replacer/189.jpg";  

var indycarelf = new Object(); 
indycarelf.src = "http://darioriccioni.net/replacer/190.jpg";  

var indycartwaalf = new Object(); 
indycartwaalf.src = "http://darioriccioni.net/replacer/191.jpg";  

var indycardertien = new Object(); 
indycardertien.src = "http://darioriccioni.net/replacer/192.jpg";  

var indycarveertien = new Object(); 
indycarveertien.src = "http://darioriccioni.net/replacer/193.jpg";  

var indycarvijftien = new Object(); 
indycarvijftien.src = "http://darioriccioni.net/replacer/194.jpg";  

var indycarzestien = new Object(); 
indycarzestien.src = "http://darioriccioni.net/replacer/196.jpg";  

var indycarzeventien = new Object(); 
indycarzeventien.src = "http://darioriccioni.net/replacer/197.jpg";  

var indycarachttien = new Object(); 
indycarachttien.src = "http://darioriccioni.net/replacer/198.jpg";  

var indycarnegentien = new Object(); 
indycarnegentien.src = "http://darioriccioni.net/replacer/199.jpg";  

var indycartwintig = new Object(); 
indycartwintig.src = "http://darioriccioni.net/replacer/200.jpg";  

var indycareenentwintig = new Object(); 
indycareenentwintig.src = "http://darioriccioni.net/replacer/201.jpg";  

//BAT7
var bateen = new Object(); 
bateen.src = "http://darioriccioni.net/replacer/11.jpg";  

var battwee = new Object(); 
battwee.src = "http://darioriccioni.net/replacer/12.jpg";  

var batdrie = new Object(); 
batdrie.src = "http://darioriccioni.net/replacer/13.jpg";  

var batvier = new Object(); 
batvier.src = "http://darioriccioni.net/replacer/14.jpg";  

var batvijf = new Object(); 
batvijf.src = "http://darioriccioni.net/replacer/15.jpg";  

var batzes = new Object(); 
batzes.src = "http://darioriccioni.net/replacer/16.jpg";  

var batzeven = new Object(); 
batzeven.src = "http://darioriccioni.net/replacer/17.jpg";  

var batacht = new Object(); 
batacht.src = "http://darioriccioni.net/replacer/18.jpg";  

//2007
var nulzevensa = new Object(); 
nulzevensa.src = "http://darioriccioni.net/replacer/108.jpg";  

var nulzevenbmw = new Object(); 
nulzevenbmw.src = "http://darioriccioni.net/replacer/109.jpg";  

var nulzevenferrari = new Object(); 
nulzevenferrari.src = "http://darioriccioni.net/replacer/110.jpg";  

var nulzevenhonda = new Object(); 
nulzevenhonda.src = "http://darioriccioni.net/replacer/111.jpg";  

var nulzevenmclaren = new Object(); 
nulzevenmclaren.src = "http://darioriccioni.net/replacer/112.jpg";  

var nulzevenredbull = new Object(); 
nulzevenredbull.src = "http://darioriccioni.net/replacer/113.jpg";  

var nulzevenrenault = new Object(); 
nulzevenrenault.src = "http://darioriccioni.net/replacer/114.jpg";  

var nulzevenspyker = new Object(); 
nulzevenspyker.src = "http://darioriccioni.net/replacer/115.jpg";  

var nulzevenstr = new Object(); 
nulzevenstr.src = "http://darioriccioni.net/replacer/116.jpg";  

var nulzeventoyota = new Object(); 
nulzeventoyota.src = "http://darioriccioni.net/replacer/117.jpg";  

var nulzevenwilliams = new Object(); 
nulzevenwilliams.src = "http://darioriccioni.net/replacer/118.jpg";  

//2008
var nulachtferrari = new Object(); 
nulachtferrari.src = "http://darioriccioni.net/replacer/128.jpg";  

var nulachtbmw = new Object(); 
nulachtbmw.src = "http://darioriccioni.net/replacer/129.jpg";  

var nulachtrenault = new Object(); 
nulachtrenault.src = "http://darioriccioni.net/replacer/130.jpg";  

var nulachtwilliams = new Object(); 
nulachtwilliams.src = "http://darioriccioni.net/replacer/131.jpg";  

var nulachtrbr = new Object(); 
nulachtrbr.src = "http://darioriccioni.net/replacer/132.jpg";  

var nulachttoyoya = new Object(); 
nulachttoyoya.src = "http://darioriccioni.net/replacer/133.jpg";  

var nulachtstr = new Object(); 
nulachtstr.src = "http://darioriccioni.net/replacer/134.jpg";  

var nulachthonda = new Object(); 
nulachthonda.src = "http://darioriccioni.net/replacer/135.jpg";  

var nulachtsa = new Object(); 
nulachtsa.src = "http://darioriccioni.net/replacer/136.jpg";  

var nulachtfi = new Object(); 
nulachtfi.src = "http://darioriccioni.net/replacer/137.jpg";  

var nulachtmclaren = new Object(); 
nulachtmclaren.src = "http://darioriccioni.net/replacer/138.jpg";  

//Trans-Am
var transeen = new Object(); 
transeen.src = "http://darioriccioni.net/replacer/254.jpg";  

var transtwee = new Object(); 
transtwee.src = "http://darioriccioni.net/replacer/255.jpg";  

var transdrie = new Object(); 
transdrie.src = "http://darioriccioni.net/replacer/256.jpg";  

var transvier = new Object(); 
transvier.src = "http://darioriccioni.net/replacer/257.jpg";  

var transvijf = new Object(); 
transvijf.src = "http://darioriccioni.net/replacer/258.jpg";  

var transzes = new Object(); 
transzes.src = "http://darioriccioni.net/replacer/259.jpg";  

var transzeven = new Object(); 
transzeven.src = "http://darioriccioni.net/replacer/260.jpg";  

var transacht = new Object(); 
transacht.src = "http://darioriccioni.net/replacer/261.jpg";  

var transnegen = new Object(); 
transnegen.src = "http://darioriccioni.net/replacer/262.jpg";  

var transtien = new Object(); 
transtien.src = "http://darioriccioni.net/replacer/263.jpg";  

//2002
var nultweeferrari = new Object(); 
nultweeferrari.src = "http://darioriccioni.net/replacer/0.jpg";  

var nultweewilliams = new Object(); 
nultweewilliams.src = "http://darioriccioni.net/replacer/1.jpg";  

var nultweemclaren = new Object(); 
nultweemclaren.src = "http://darioriccioni.net/replacer/2.jpg";  

var nultweerenault = new Object(); 
nultweerenault.src = "http://darioriccioni.net/replacer/3.jpg";  

var nultweesauber = new Object(); 
nultweesauber.src = "http://darioriccioni.net/replacer/4.jpg";  

var nultweejordan = new Object(); 
nultweejordan.src = "http://darioriccioni.net/replacer/5.jpg";  

var nultweejaguar = new Object(); 
nultweejaguar.src = "http://darioriccioni.net/replacer/6.jpg";  

var nultweebar = new Object(); 
nultweebar.src = "http://darioriccioni.net/replacer/7.jpg";  

var nultweeminardi = new Object(); 
nultweeminardi.src = "http://darioriccioni.net/replacer/8.jpg";  

var nultweetoyota = new Object(); 
nultweetoyota.src = "http://darioriccioni.net/replacer/9.jpg";  

var nultweearrows = new Object(); 
nultweearrows.src = "http://darioriccioni.net/replacer/10.jpg";  

//2006
var nulzesbmw = new Object(); 
nulzesbmw.src = "http://darioriccioni.net/replacer/30.jpg";  

var nulzesferrari = new Object(); 
nulzesferrari.src = "http://darioriccioni.net/replacer/31.jpg";  

var nulzesbar = new Object(); 
nulzesbar.src = "http://darioriccioni.net/replacer/32.jpg";  

var nulzesmclaren = new Object(); 
nulzesmclaren.src = "http://darioriccioni.net/replacer/33.jpg";  

var nulzesmidland = new Object(); 
nulzesmidland.src = "http://darioriccioni.net/replacer/34.jpg";  

var nulzesstr = new Object(); 
nulzesstr.src = "http://darioriccioni.net/replacer/35.jpg";  

var nulzesrenault = new Object(); 
nulzesrenault.src = "http://darioriccioni.net/replacer/36.jpg";  

var nulzessa = new Object(); 
nulzessa.src = "http://darioriccioni.net/replacer/37.jpg";  

var nulzesrbr = new Object(); 
nulzesrbr.src = "http://darioriccioni.net/replacer/38.jpg";  

var nulzestoyota = new Object(); 
nulzestoyota.src = "http://darioriccioni.net/replacer/39.jpg";  

var nulzeswilliams = new Object(); 
nulzeswilliams.src = "http://darioriccioni.net/replacer/40.jpg";  

//V8Supercars
var vachteen = new Object(); 
vachteen.src = "http://darioriccioni.net/replacer/46.jpg";  

var vachttwee = new Object(); 
vachttwee.src = "http://darioriccioni.net/replacer/47.jpg";  

var vachtdrie = new Object(); 
vachtdrie.src = "http://darioriccioni.net/replacer/48.jpg";  

var vachtvier = new Object(); 
vachtvier.src = "http://darioriccioni.net/replacer/49.jpg";  

var vachtvijf = new Object(); 
vachtvijf.src = "http://darioriccioni.net/replacer/50.jpg";  

var vachtzes = new Object(); 
vachtzes.src = "http://darioriccioni.net/replacer/51.jpg";  

var vachtzeven = new Object(); 
vachtzeven.src = "http://darioriccioni.net/replacer/52.jpg";  

var vachtacht = new Object(); 
vachtacht.src = "http://darioriccioni.net/replacer/53.jpg";  

var vachtnegen = new Object(); 
vachtnegen.src = "http://darioriccioni.net/replacer/54.jpg";  

var vachttien = new Object(); 
vachttien.src = "http://darioriccioni.net/replacer/55.jpg";  

var vachtelf = new Object(); 
vachtelf.src = "http://darioriccioni.net/replacer/56.jpg";  

var vachttwaalf = new Object(); 
vachttwaalf.src = "http://darioriccioni.net/replacer/57.jpg";  

var vachtdertien = new Object(); 
vachtdertien.src = "http://darioriccioni.net/replacer/58.jpg";  

var vachtveertien = new Object(); 
vachtveertien.src = "http://darioriccioni.net/replacer/59.jpg";  

var vachtvijftien = new Object(); 
vachtvijftien.src = "http://darioriccioni.net/replacer/60.jpg";  

var vachtzestien = new Object(); 
vachtzestien.src = "http://darioriccioni.net/replacer/61.jpg";  

var vachtzeventien = new Object(); 
vachtzeventien.src = "http://darioriccioni.net/replacer/62.jpg";  

//Generic GT
var gtvetteeen = new Object(); 
gtvetteeen.src = "http://darioriccioni.net/replacer/301.jpg";  

var gtaston = new Object(); 
gtaston.src = "http://darioriccioni.net/replacer/302.jpg";  

var gtmaserati = new Object(); 
gtmaserati.src = "http://darioriccioni.net/replacer/303.jpg";  

var gtsaleen = new Object(); 
gtsaleen.src = "http://darioriccioni.net/replacer/304.jpg";  

var gtford = new Object(); 
gtford.src = "http://darioriccioni.net/replacer/305.jpg";  

var gtporsche = new Object(); 
gtporsche.src = "http://darioriccioni.net/replacer/306.jpg";  

var gtbmw = new Object(); 
gtbmw.src = "http://darioriccioni.net/replacer/307.jpg";  

var gttvr = new Object(); 
gttvr.src = "http://darioriccioni.net/replacer/308.jpg";  

var gtmosler = new Object(); 
gtmosler.src = "http://darioriccioni.net/replacer/309.jpg";  

var gtvettetwee = new Object(); 
gtvettetwee.src = "http://darioriccioni.net/replacer/310.jpg";  

//V8 Supercars 2010
var vseen = new Object(); 
vseen.src = "http://darioriccioni.net/replacer/281.jpg";  

var vstwee = new Object(); 
vstwee.src = "http://darioriccioni.net/replacer/282.jpg";  

var vsdrie = new Object(); 
vsdrie.src = "http://darioriccioni.net/replacer/283.jpg";  

var vsvier = new Object(); 
vsvier.src = "http://darioriccioni.net/replacer/284.jpg";  

var vsvijf = new Object(); 
vsvijf.src = "http://darioriccioni.net/replacer/285.jpg";  

var vszes = new Object(); 
vszes.src = "http://darioriccioni.net/replacer/286.jpg";  

var vszeven = new Object(); 
vszeven.src = "http://darioriccioni.net/replacer/287.jpg";  

var vsacht = new Object(); 
vsacht.src = "http://darioriccioni.net/replacer/288.jpg";  

var vsnegen = new Object(); 
vsnegen.src = "http://darioriccioni.net/replacer/289.jpg";  

var vstien = new Object(); 
vstien.src = "http://darioriccioni.net/replacer/290.jpg";  

var vself = new Object(); 
vself.src = "http://darioriccioni.net/replacer/291.jpg";  

var vstwaalf = new Object(); 
vstwaalf.src = "http://darioriccioni.net/replacer/292.jpg";  

var vsdertien = new Object(); 
vsdertien.src = "http://darioriccioni.net/replacer/293.jpg";  

var vsveertien = new Object(); 
vsveertien.src = "http://darioriccioni.net/replacer/294.jpg";  

var vsvijftien = new Object(); 
vsvijftien.src = "http://darioriccioni.net/replacer/295.jpg";  

var vszestien = new Object(); 
vszestien.src = "http://darioriccioni.net/replacer/296.jpg";  

var vszeventien = new Object(); 
vszeventien.src = "http://darioriccioni.net/replacer/297.jpg";  

var vsachttien = new Object(); 
vsachttien.src = "http://darioriccioni.net/replacer/298.jpg";  

//2011
var eeneenrbr = new Object(); 
eeneenrbr.src = "http://darioriccioni.net/replacer/311.jpg";  

var eeneenmclaren = new Object(); 
eeneenmclaren.src = "http://darioriccioni.net/replacer/312.jpg";  

var eeneenferrari = new Object(); 
eeneenferrari.src = "http://darioriccioni.net/replacer/313.jpg";  

var eeneenmercedes = new Object(); 
eeneenmercedes.src = "http://darioriccioni.net/replacer/314.jpg";  

var eeneenrenault = new Object(); 
eeneenrenault.src = "http://darioriccioni.net/replacer/315.jpg";  

var eeneenwilliams = new Object(); 
eeneenwilliams.src = "http://darioriccioni.net/replacer/316.jpg";  

var eeneenfi = new Object(); 
eeneenfi.src = "http://darioriccioni.net/replacer/317.jpg";  

var eeneensauber = new Object(); 
eeneensauber.src = "http://darioriccioni.net/replacer/318.jpg";  

var eeneenstr = new Object(); 
eeneenstr.src = "http://darioriccioni.net/replacer/319.jpg";  

var eeneenlotus = new Object(); 
eeneenlotus.src = "http://darioriccioni.net/replacer/320.jpg";  

var eeneenhrt = new Object(); 
eeneenhrt.src = "http://darioriccioni.net/replacer/321.jpg";  

var eeneenvirgin = new Object(); 
eeneenvirgin.src = "http://darioriccioni.net/replacer/322.jpg";  

//Cars
//1986
var achtzeswilliamseen = new Object(); 
achtzeswilliamseen.src = "http://darioriccioni.net/replacer/07.0.0.png";  

var achtzeswilliamstwee = new Object(); 
achtzeswilliamstwee.src = "http://darioriccioni.net/replacer/07.0.1.png";  

var achtzeswilliamsdrie = new Object(); 
achtzeswilliamsdrie.src = "http://darioriccioni.net/replacer/07.0.2.png";  

var achtzesmclareneen = new Object(); 
achtzesmclareneen.src = "http://darioriccioni.net/replacer/07.1.0.png";  

var achtzesmclarentwee = new Object(); 
achtzesmclarentwee.src = "http://darioriccioni.net/replacer/07.1.1.png";  

var achtzesmclarendrie = new Object(); 
achtzesmclarendrie.src = "http://darioriccioni.net/replacer/07.1.2.png";  

var achtzeslotuseen = new Object(); 
achtzeslotuseen.src = "http://darioriccioni.net/replacer/07.2.0.png";  

var achtzeslotustwee = new Object(); 
achtzeslotustwee.src = "http://darioriccioni.net/replacer/07.2.1.png";  

var achtzeslotusdrie = new Object(); 
achtzeslotusdrie.src = "http://darioriccioni.net/replacer/07.2.2.png";  

var achtzesferrarieen = new Object(); 
achtzesferrarieen.src = "http://darioriccioni.net/replacer/07.3.0.png";  

var achtzesferraritwee = new Object(); 
achtzesferraritwee.src = "http://darioriccioni.net/replacer/07.3.1.png";  

var achtzesferraridrie = new Object(); 
achtzesferraridrie.src = "http://darioriccioni.net/replacer/07.3.2.png";  

var achtzesferarrivier = new Object(); 
achtzesferarrivier.src = "http://darioriccioni.net/replacer/07.3.3.png";  

var achtzesligiereen = new Object(); 
achtzesligiereen.src = "http://darioriccioni.net/replacer/07.4.0.png";  

var achtzesligiertwee = new Object(); 
achtzesligiertwee.src = "http://darioriccioni.net/replacer/07.4.1.png";  

var achtzesligierdrie = new Object(); 
achtzesligierdrie.src = "http://darioriccioni.net/replacer/07.4.2.png";  

var achtzesbenettoneen = new Object(); 
achtzesbenettoneen.src = "http://darioriccioni.net/replacer/07.5.0.png";  

var achtzesbenettontwee = new Object(); 
achtzesbenettontwee.src = "http://darioriccioni.net/replacer/07.5.1.png";  

var achtzesbenettondrie = new Object(); 
achtzesbenettondrie.src = "http://darioriccioni.net/replacer/07.5.2.png";  

var achtzestyrrelleen = new Object(); 
achtzestyrrelleen.src = "http://darioriccioni.net/replacer/07.6.0.png";  

var achtzestyrrelltwee = new Object(); 
achtzestyrrelltwee.src = "http://darioriccioni.net/replacer/07.6.1.png";  

var achtzestyrrelldrie = new Object(); 
achtzestyrrelldrie.src = "http://darioriccioni.net/replacer/07.6.2.png";  

var achtzeslolaeen = new Object(); 
achtzeslolaeen.src = "http://darioriccioni.net/replacer/07.7.0.png";  

var achtzeslolatwee = new Object(); 
achtzeslolatwee.src = "http://darioriccioni.net/replacer/07.7.1.png";  

var achtzesloladrie = new Object(); 
achtzesloladrie.src = "http://darioriccioni.net/replacer/07.7.2.png";  

var achtzesbrabhameen = new Object(); 
achtzesbrabhameen.src = "http://darioriccioni.net/replacer/07.8.0.png";  

var achtzesbrabhamtwee = new Object(); 
achtzesbrabhamtwee.src = "http://darioriccioni.net/replacer/07.8.1.png";  

var achtzesbrabhamdrie = new Object(); 
achtzesbrabhamdrie.src = "http://darioriccioni.net/replacer/07.8.2.png";  

var achtzesarrowseen = new Object(); 
achtzesarrowseen.src = "http://darioriccioni.net/replacer/07.9.0.png";  

var achtzesarrowstwee = new Object(); 
achtzesarrowstwee.src = "http://darioriccioni.net/replacer/07.9.1.png";  

var achtzesarrowsdrie = new Object(); 
achtzesarrowsdrie.src = "http://darioriccioni.net/replacer/07.9.2.png";  

var achtzeszakspeedeen = new Object(); 
achtzeszakspeedeen.src = "http://darioriccioni.net/replacer/07.10.0.png";  

var achtzeszakspeedtwee = new Object(); 
achtzeszakspeedtwee.src = "http://darioriccioni.net/replacer/07.10.1.png";  

var achtzeszakspeeddrie = new Object(); 
achtzeszakspeeddrie.src = "http://darioriccioni.net/replacer/07.10.2.png";  

var achtzesosellaeen = new Object(); 
achtzesosellaeen.src = "http://darioriccioni.net/replacer/07.11.0.png";  

var achtzesosellatwee = new Object(); 
achtzesosellatwee.src = "http://darioriccioni.net/replacer/07.11.1.png";  

var achtzesoselladrie = new Object(); 
achtzesoselladrie.src = "http://darioriccioni.net/replacer/07.11.2.png";  

var achtzesagseen = new Object(); 
achtzesagseen.src = "http://darioriccioni.net/replacer/07.12.0.png";  

var achtzesagstwee = new Object(); 
achtzesagstwee.src = "http://darioriccioni.net/replacer/07.12.1.png";  

var achtzesagsdrie = new Object(); 
achtzesagsdrie.src = "http://darioriccioni.net/replacer/07.12.2.png";  

var achtzesminardieen = new Object(); 
achtzesminardieen.src = "http://darioriccioni.net/replacer/07.13.0.png";  

var achtzesminarditwee = new Object(); 
achtzesminarditwee.src = "http://darioriccioni.net/replacer/07.13.1.png";  

var achtzesminardidrie = new Object(); 
achtzesminardidrie.src = "http://darioriccioni.net/replacer/07.13.2.png";  

//1997
var negenzevenarrowseen = new Object(); 
negenzevenarrowseen.src = "http://darioriccioni.net/replacer/12.0.0.png";  

var negenzevenarrowstwee = new Object(); 
negenzevenarrowstwee.src = "http://darioriccioni.net/replacer/12.0.1.png";  

var negenzevenarrowsdrie = new Object(); 
negenzevenarrowsdrie.src = "http://darioriccioni.net/replacer/12.0.2.png";  

var negenzevenwilliamseen = new Object(); 
negenzevenwilliamseen.src = "http://darioriccioni.net/replacer/12.1.0.png";  

var negenzevenwilliamstwee = new Object(); 
negenzevenwilliamstwee.src = "http://darioriccioni.net/replacer/12.1.1.png";  

var negenzevenwilliamsdrie = new Object(); 
negenzevenwilliamsdrie.src = "http://darioriccioni.net/replacer/12.1.2.png";  

var negenzevenferrarieen = new Object(); 
negenzevenferrarieen.src = "http://darioriccioni.net/replacer/12.2.0.png";  

var negenzevenferraritwee = new Object(); 
negenzevenferraritwee.src = "http://darioriccioni.net/replacer/12.2.1.png";  

var negenzevenferraridrie = new Object(); 
negenzevenferraridrie.src = "http://darioriccioni.net/replacer/12.2.2.png";  

var negenzevenferrarivier = new Object(); 
negenzevenferrarivier.src = "http://darioriccioni.net/replacer/12.2.3.png";  

var negenzevenbenettoneen = new Object(); 
negenzevenbenettoneen.src = "http://darioriccioni.net/replacer/12.3.0.png";  

var negenzevenbenettontwee = new Object(); 
negenzevenbenettontwee.src = "http://darioriccioni.net/replacer/12.3.1.png";  

var negenzevenbenettondrie = new Object(); 
negenzevenbenettondrie.src = "http://darioriccioni.net/replacer/12.3.2.png";  

var negenzevenmclareneen = new Object(); 
negenzevenmclareneen.src = "http://darioriccioni.net/replacer/12.4.0.png";  

var negenzevenmclarentwee = new Object(); 
negenzevenmclarentwee.src = "http://darioriccioni.net/replacer/12.4.1.png";  

var negenzevenmclarendrie = new Object(); 
negenzevenmclarendrie.src = "http://darioriccioni.net/replacer/12.4.2.png";  

var negenzevenjordaneen = new Object(); 
negenzevenjordaneen.src = "http://darioriccioni.net/replacer/12.5.0.png";  

var negenzevenjordantwee = new Object(); 
negenzevenjordantwee.src = "http://darioriccioni.net/replacer/12.5.1.png";  

var negenzevenjordandrie = new Object(); 
negenzevenjordandrie.src = "http://darioriccioni.net/replacer/12.5.2.png";  

var negenzevenprosteen = new Object(); 
negenzevenprosteen.src = "http://darioriccioni.net/replacer/12.6.0.png";  

var negenzevenprosttwee = new Object(); 
negenzevenprosttwee.src = "http://darioriccioni.net/replacer/12.6.1.png";  

var negenzevenprostdrie = new Object(); 
negenzevenprostdrie.src = "http://darioriccioni.net/replacer/12.6.2.png";  

var negenzevensaubereen = new Object(); 
negenzevensaubereen.src = "http://darioriccioni.net/replacer/12.7.0.png";  

var negenzevensaubertwee = new Object(); 
negenzevensaubertwee.src = "http://darioriccioni.net/replacer/12.7.1.png";  

var negenzevensauberdrie = new Object(); 
negenzevensauberdrie.src = "http://darioriccioni.net/replacer/12.7.2.png";  

var negenzeventyrrelleen = new Object(); 
negenzeventyrrelleen.src = "http://darioriccioni.net/replacer/12.8.0.png";  

var negenzeventyrrelltwee = new Object(); 
negenzeventyrrelltwee.src = "http://darioriccioni.net/replacer/12.8.1.png";  

var negenzeventyrrelldrie = new Object(); 
negenzeventyrrelldrie.src = "http://darioriccioni.net/replacer/12.8.2.png";  

var negenzevenminardieen = new Object(); 
negenzevenminardieen.src = "http://darioriccioni.net/replacer/12.9.0.png";  

var negenzevenminarditwee = new Object(); 
negenzevenminarditwee.src = "http://darioriccioni.net/replacer/12.9.1.png";  

var negenzevenminardidrie = new Object(); 
negenzevenminardidrie.src = "http://darioriccioni.net/replacer/12.9.2.png";  

var negenzevenstewarteen = new Object(); 
negenzevenstewarteen.src = "http://darioriccioni.net/replacer/12.10.0.png";  

var negenzevenstewarttwee = new Object(); 
negenzevenstewarttwee.src = "http://darioriccioni.net/replacer/12.10.1.png";  

var negenzevenstewartdrie = new Object(); 
negenzevenstewartdrie.src = "http://darioriccioni.net/replacer/12.10.2.png";  

var negenzevenlolaeen = new Object(); 
negenzevenlolaeen.src = "http://darioriccioni.net/replacer/12.11.0.png";  

var negenzevenlolatwee = new Object(); 
negenzevenlolatwee.src = "http://darioriccioni.net/replacer/12.11.1.png";  

var negenzevenloladrie = new Object(); 
negenzevenloladrie.src = "http://darioriccioni.net/replacer/12.11.2.png";  

//1999
var negennegenmclareneen = new Object(); 
negennegenmclareneen.src = "http://darioriccioni.net/replacer/13.0.0.png";  

var negennegenmclarentwee = new Object(); 
negennegenmclarentwee.src = "http://darioriccioni.net/replacer/13.0.1.png";  

var negennegenmclaremdrie = new Object(); 
negennegenmclaremdrie.src = "http://darioriccioni.net/replacer/13.0.2.png";  

var negennegenferarrieen = new Object(); 
negennegenferarrieen.src = "http://darioriccioni.net/replacer/13.1.0.png";  

var negennegenferraritwee = new Object(); 
negennegenferraritwee.src = "http://darioriccioni.net/replacer/13.1.1.png";  

var negennegenferraridrie = new Object(); 
negennegenferraridrie.src = "http://darioriccioni.net/replacer/13.1.2.png";  

var negennegenferrarivier = new Object(); 
negennegenferrarivier.src = "http://darioriccioni.net/replacer/13.1.3.png";  

var negennegenwilliamseen = new Object(); 
negennegenwilliamseen.src = "http://darioriccioni.net/replacer/13.2.0.png";  

var negennegenwilliamstwee = new Object(); 
negennegenwilliamstwee.src = "http://darioriccioni.net/replacer/13.2.1.png";  

var negennegenwilliamsdrie = new Object(); 
negennegenwilliamsdrie.src = "http://darioriccioni.net/replacer/13.2.2.png";  

var negennegenjordaneen = new Object(); 
negennegenjordaneen.src = "http://darioriccioni.net/replacer/13.3.0.png";  

var negennegenjordantwee = new Object(); 
negennegenjordantwee.src = "http://darioriccioni.net/replacer/13.3.1.png";  

var negennegenjordandrie = new Object(); 
negennegenjordandrie.src = "http://darioriccioni.net/replacer/13.3.2.png";  

var negennegenbenettoneen = new Object(); 
negennegenbenettoneen.src = "http://darioriccioni.net/replacer/13.4.0.png";  

var negennegenbenettontwee = new Object(); 
negennegenbenettontwee.src = "http://darioriccioni.net/replacer/13.4.1.png";  

var negennegenbenettondrie = new Object(); 
negennegenbenettondrie.src = "http://darioriccioni.net/replacer/13.4.2.png";  

var negennegensaubereen = new Object(); 
negennegensaubereen.src = "http://darioriccioni.net/replacer/13.5.0.png";  

var negennegensaubertwee = new Object(); 
negennegensaubertwee.src = "http://darioriccioni.net/replacer/13.5.1.png";  

var negennegensauberdrie = new Object(); 
negennegensauberdrie.src = "http://darioriccioni.net/replacer/13.5.2.png";  

var negennegenarrowseen = new Object(); 
negennegenarrowseen.src = "http://darioriccioni.net/replacer/13.6.0.png";  

var negennegenarrowstwee = new Object(); 
negennegenarrowstwee.src = "http://darioriccioni.net/replacer/13.6.1.png";  

var negennegenarrowsdrie = new Object(); 
negennegenarrowsdrie.src = "http://darioriccioni.net/replacer/13.6.2.png";  

var negennegenstewarteen = new Object(); 
negennegenstewarteen.src = "http://darioriccioni.net/replacer/13.7.0.png";  

var negennegenstewarttwee = new Object(); 
negennegenstewarttwee.src = "http://darioriccioni.net/replacer/13.7.1.png";  

var negennegenstewartdrie = new Object(); 
negennegenstewartdrie.src = "http://darioriccioni.net/replacer/13.7.2.png";  

var negennegenprosteen = new Object(); 
negennegenprosteen.src = "http://darioriccioni.net/replacer/13.8.0.png";  

var negennegenprosttwee = new Object(); 
negennegenprosttwee.src = "http://darioriccioni.net/replacer/13.8.1.png";  

var negennegenprostdrie = new Object(); 
negennegenprostdrie.src = "http://darioriccioni.net/replacer/13.8.2.png";  

var negennegenminardieen = new Object(); 
negennegenminardieen.src = "http://darioriccioni.net/replacer/13.9.0.png";  

var negennegenminarditwee = new Object(); 
negennegenminarditwee.src = "http://darioriccioni.net/replacer/13.9.1.png";  

var negennegenminardidrie = new Object(); 
negennegenminardidrie.src = "http://darioriccioni.net/replacer/13.9.2.png";  

var negennegenbareen = new Object(); 
negennegenbareen.src = "http://darioriccioni.net/replacer/13.10.0.png";  

var negennegenbartwee = new Object(); 
negennegenbartwee.src = "http://darioriccioni.net/replacer/13.10.1.png";  

var negennegenbardrie = new Object(); 
negennegenbardrie.src = "http://darioriccioni.net/replacer/13.10.2.png";  

//2005
var nulvijfferarrieen = new Object(); 
nulvijfferarrieen.src = "http://darioriccioni.net/replacer/14.0.0.png";  

var nulvijfferarritwee = new Object(); 
nulvijfferarritwee.src = "http://darioriccioni.net/replacer/14.0.1.png";  

var nulvijfferarridrie = new Object(); 
nulvijfferarridrie.src = "http://darioriccioni.net/replacer/14.0.2.png";  

var nulvijfferarrivier = new Object(); 
nulvijfferarrivier.src = "http://darioriccioni.net/replacer/14.0.3.png";  

var nulvijfbareen = new Object(); 
nulvijfbareen.src = "http://darioriccioni.net/replacer/14.1.0.png";  

var nulvijfbartwee = new Object(); 
nulvijfbartwee.src = "http://darioriccioni.net/replacer/14.1.1.png";  

var nulvijfbardrie = new Object(); 
nulvijfbardrie.src = "http://darioriccioni.net/replacer/14.1.2.png";  

var nulvijfrenaultnul = new Object(); 
nulvijfrenaultnul.src = "http://darioriccioni.net/replacer/14.2.0.png";  

var nulvijfrenaulteen = new Object(); 
nulvijfrenaulteen.src = "http://darioriccioni.net/replacer/14.2.1.png";  

var nulvijfrenaulttwee = new Object(); 
nulvijfrenaulttwee.src = "http://darioriccioni.net/replacer/14.2.2.png";  

var nulvijfwilliamseen = new Object(); 
nulvijfwilliamseen.src = "http://darioriccioni.net/replacer/14.3.0.png";  

var nulvijfwilliamstwee = new Object(); 
nulvijfwilliamstwee.src = "http://darioriccioni.net/replacer/14.3.1.png";  

var nulvijfwilliamsdrie = new Object(); 
nulvijfwilliamsdrie.src = "http://darioriccioni.net/replacer/14.3.2.png";  

var nulvijfmclareneen = new Object(); 
nulvijfmclareneen.src = "http://darioriccioni.net/replacer/14.4.0.png";  

var nulvijfmclarentwee = new Object(); 
nulvijfmclarentwee.src = "http://darioriccioni.net/replacer/14.4.1.png";  

var nulvijfmclarendrie = new Object(); 
nulvijfmclarendrie.src = "http://darioriccioni.net/replacer/14.4.2.png";  

var nulvijfsaubereen = new Object(); 
nulvijfsaubereen.src = "http://darioriccioni.net/replacer/14.5.0.png";  

var nulvijfsaubertwee = new Object(); 
nulvijfsaubertwee.src = "http://darioriccioni.net/replacer/14.5.1.png";  

var nulvijfsauberdrie = new Object(); 
nulvijfsauberdrie.src = "http://darioriccioni.net/replacer/14.5.2.png";  

var nulvijfredbulleen = new Object(); 
nulvijfredbulleen.src = "http://darioriccioni.net/replacer/14.6.0.png";  

var nulvijfredbulltwee = new Object(); 
nulvijfredbulltwee.src = "http://darioriccioni.net/replacer/14.6.1.png";  

var nulvijfredbulldrie = new Object(); 
nulvijfredbulldrie.src = "http://darioriccioni.net/replacer/14.6.2.png";  

var nulvijftoyotaeen = new Object(); 
nulvijftoyotaeen.src = "http://darioriccioni.net/replacer/14.7.0.png";  

var nulvijftoyotatwee = new Object(); 
nulvijftoyotatwee.src = "http://darioriccioni.net/replacer/14.7.1.png";  

var nulvijftoyotadrie = new Object(); 
nulvijftoyotadrie.src = "http://darioriccioni.net/replacer/14.7.2.png";  

var nulvijfjordaneen = new Object(); 
nulvijfjordaneen.src = "http://darioriccioni.net/replacer/14.8.0.png";  

var nulvijfjordantwee = new Object(); 
nulvijfjordantwee.src = "http://darioriccioni.net/replacer/14.8.1.png";  

var nulvijfjordandrie = new Object(); 
nulvijfjordandrie.src = "http://darioriccioni.net/replacer/14.8.2.png";  

var nulvijfminardieen = new Object(); 
nulvijfminardieen.src = "http://darioriccioni.net/replacer/14.9.0.png";  

var nulvijfminarditwee = new Object(); 
nulvijfminarditwee.src = "http://darioriccioni.net/replacer/14.9.1.png";  

var nulvijfminardidrie = new Object(); 
nulvijfminardidrie.src = "http://darioriccioni.net/replacer/14.9.2.png";  

//2006
var nulzesrenaulteen = new Object(); 
nulzesrenaulteen.src = "http://darioriccioni.net/replacer/03.0.0.png";  

var nulzesrenaulttwee = new Object(); 
nulzesrenaulttwee.src = "http://darioriccioni.net/replacer/03.0.1.png";  

var nulzesrenaultdrie = new Object(); 
nulzesrenaultdrie.src = "http://darioriccioni.net/replacer/03.0.2.png";  

var nulzesrenaultvier = new Object(); 
nulzesrenaultvier.src = "http://darioriccioni.net/replacer/03.0.3.png";  

var nulzesmclareneen = new Object(); 
nulzesmclareneen.src = "http://darioriccioni.net/replacer/03.1.0.png";  

var nulzesmclarentwee = new Object(); 
nulzesmclarentwee.src = "http://darioriccioni.net/replacer/03.1.1.png";  

var nulzesmclarendrie = new Object(); 
nulzesmclarendrie.src = "http://darioriccioni.net/replacer/03.1.2.png";  

var nulzesmclarenvier = new Object(); 
nulzesmclarenvier.src = "http://darioriccioni.net/replacer/03.1.3.png";  

//2007
var nulzevenmclareneen = new Object(); 
nulzevenmclareneen.src = "http://darioriccioni.net/replacer/09.0.0.png";  

var nulzevenmclarentwee = new Object(); 
nulzevenmclarentwee.src = "http://darioriccioni.net/replacer/09.0.1.png";  

var nulzevenmclarendrie = new Object(); 
nulzevenmclarendrie.src = "http://darioriccioni.net/replacer/09.0.2.png";  

var nulzevenrenaulteen = new Object(); 
nulzevenrenaulteen.src = "http://darioriccioni.net/replacer/09.1.0.png";  

var nulzevenrenaulttwee = new Object(); 
nulzevenrenaulttwee.src = "http://darioriccioni.net/replacer/09.1.1.png";  

var nulzevenrenaultdrie = new Object(); 
nulzevenrenaultdrie.src = "http://darioriccioni.net/replacer/09.1.2.png";  

var nulzevenferrarieen = new Object(); 
nulzevenferrarieen.src = "http://darioriccioni.net/replacer/09.2.0.png";  

var nulzevenferraritwee = new Object(); 
nulzevenferraritwee.src = "http://darioriccioni.net/replacer/09.2.1.png";  

var nulzevenferraridrie = new Object(); 
nulzevenferraridrie.src = "http://darioriccioni.net/replacer/09.2.2.png";  

var nulzevenferrarivier = new Object(); 
nulzevenferrarivier.src = "http://darioriccioni.net/replacer/09.2.3.png";  

var nulzevenhondaeen = new Object(); 
nulzevenhondaeen.src = "http://darioriccioni.net/replacer/09.3.0.png";  

var nulzevenbmween = new Object(); 
nulzevenbmween.src = "http://darioriccioni.net/replacer/09.4.0.png";  

var nulzevenbmwtwee = new Object(); 
nulzevenbmwtwee.src = "http://darioriccioni.net/replacer/09.4.1.png";  

var nulzevenbmwdrie = new Object(); 
nulzevenbmwdrie.src = "http://darioriccioni.net/replacer/09.4.2.png";  

var nulzeventoyotaeen = new Object(); 
nulzeventoyotaeen.src = "http://darioriccioni.net/replacer/09.5.0.png";  

var nulzeventoyotatwee = new Object(); 
nulzeventoyotatwee.src = "http://darioriccioni.net/replacer/09.5.1.png";  

var nulzeventoyotadrie = new Object(); 
nulzeventoyotadrie.src = "http://darioriccioni.net/replacer/09.5.2.png";  

var nulzevenrbreen = new Object(); 
nulzevenrbreen.src = "http://darioriccioni.net/replacer/09.6.0.png";  

var nulzevenrbrtwee = new Object(); 
nulzevenrbrtwee.src = "http://darioriccioni.net/replacer/09.6.1.png";  

var nulzevenrbrdrie = new Object(); 
nulzevenrbrdrie.src = "http://darioriccioni.net/replacer/09.6.2.png";  

var nulzevenwilliamseen = new Object(); 
nulzevenwilliamseen.src = "http://darioriccioni.net/replacer/09.7.0.png";  

var nulzevenwilliamstwee = new Object(); 
nulzevenwilliamstwee.src = "http://darioriccioni.net/replacer/09.7.1.png";  

var nulzevenwilliamsdrie = new Object(); 
nulzevenwilliamsdrie.src = "http://darioriccioni.net/replacer/09.7.2.png";  

var nulzevenstreen = new Object(); 
nulzevenstreen.src = "http://darioriccioni.net/replacer/09.8.0.png";  

var nulzevenstrtwee = new Object(); 
nulzevenstrtwee.src = "http://darioriccioni.net/replacer/09.8.1.png";  

var nulzevenstrdrie = new Object(); 
nulzevenstrdrie.src = "http://darioriccioni.net/replacer/09.8.2.png";  

var nulzevenspykereen = new Object(); 
nulzevenspykereen.src = "http://darioriccioni.net/replacer/09.9.0.png";  

var nulzevenspykertwee = new Object(); 
nulzevenspykertwee.src = "http://darioriccioni.net/replacer/09.9.1.png";  

var nulzevenspykerdrie = new Object(); 
nulzevenspykerdrie.src = "http://darioriccioni.net/replacer/09.9.2.png";  

var nulzevensaeen = new Object(); 
nulzevensaeen.src = "http://darioriccioni.net/replacer/09.10.0.png";  

var nulzevensatwee = new Object(); 
nulzevensatwee.src = "http://darioriccioni.net/replacer/09.10.1.png";  

var nulzevensadrie = new Object(); 
nulzevensadrie.src = "http://darioriccioni.net/replacer/09.10.2.png";  

//2008
var nulachtferrarieen = new Object(); 
nulachtferrarieen.src = "http://darioriccioni.net/replacer/11.0.0.png";  

var nulachtferraritwee = new Object(); 
nulachtferraritwee.src = "http://darioriccioni.net/replacer/11.0.1.png";  

var nulachtferraridrie = new Object(); 
nulachtferraridrie.src = "http://darioriccioni.net/replacer/11.0.2.png";  

var nulachtferrarivier = new Object(); 
nulachtferrarivier.src = "http://darioriccioni.net/replacer/11.0.3.png";  

var nulachtbmween = new Object(); 
nulachtbmween.src = "http://darioriccioni.net/replacer/11.1.0.png";  

var nulachtbmwtwee = new Object(); 
nulachtbmwtwee.src = "http://darioriccioni.net/replacer/11.1.1.png";  

var nulachtbmwdrie = new Object(); 
nulachtbmwdrie.src = "http://darioriccioni.net/replacer/11.1.2.png";  

var nulachtrenaulteen = new Object(); 
nulachtrenaulteen.src = "http://darioriccioni.net/replacer/11.2.0.png";  

var nulachtrenaulttwee = new Object(); 
nulachtrenaulttwee.src = "http://darioriccioni.net/replacer/11.2.1.png";  

var nulachtrenaultdrie = new Object(); 
nulachtrenaultdrie.src = "http://darioriccioni.net/replacer/11.2.2.png";  

var nulachtwilliamseen = new Object(); 
nulachtwilliamseen.src = "http://darioriccioni.net/replacer/11.3.0.png";  

var nulachtwilliamstwee = new Object(); 
nulachtwilliamstwee.src = "http://darioriccioni.net/replacer/11.3.1.png";  

var nulachtwilliamsdrie = new Object(); 
nulachtwilliamsdrie.src = "http://darioriccioni.net/replacer/11.3.2.png";  

var nulachtrbreen = new Object(); 
nulachtrbreen.src = "http://darioriccioni.net/replacer/11.4.0.png";  

var nulachtrbrtwee = new Object(); 
nulachtrbrtwee.src = "http://darioriccioni.net/replacer/11.4.1.png";  

var nulachtrbrdrie = new Object(); 
nulachtrbrdrie.src = "http://darioriccioni.net/replacer/11.4.2.png";  

var nulachttoyotaeen = new Object(); 
nulachttoyotaeen.src = "http://darioriccioni.net/replacer/11.5.0.png";  

var nulachttoyotatwee = new Object(); 
nulachttoyotatwee.src = "http://darioriccioni.net/replacer/11.5.1.png";  

var nulachttoyotadrie = new Object(); 
nulachttoyotadrie.src = "http://darioriccioni.net/replacer/11.5.2.png";  

var nulachtstreen = new Object(); 
nulachtstreen.src = "http://darioriccioni.net/replacer/11.6.0.png";  

var nulachtstrtwee = new Object(); 
nulachtstrtwee.src = "http://darioriccioni.net/replacer/11.6.1.png";  

var nulachtstrdrie = new Object(); 
nulachtstrdrie.src = "http://darioriccioni.net/replacer/11.6.2.png";  

var nulachthondaeen = new Object(); 
nulachthondaeen.src = "http://darioriccioni.net/replacer/11.7.0.png";  

var nulachthondatwee = new Object(); 
nulachthondatwee.src = "http://darioriccioni.net/replacer/11.7.1.png";  

var nulachthondadrie = new Object(); 
nulachthondadrie.src = "http://darioriccioni.net/replacer/11.7.2.png";  

var nulachtsaeen = new Object(); 
nulachtsaeen.src = "http://darioriccioni.net/replacer/11.8.0.png";  

var nulachtsatwee = new Object(); 
nulachtsatwee.src = "http://darioriccioni.net/replacer/11.8.1.png";  

var nulachtsadrie = new Object(); 
nulachtsadrie.src = "http://darioriccioni.net/replacer/11.8.2.png";  

var nulachtfieen = new Object(); 
nulachtfieen.src = "http://darioriccioni.net/replacer/11.9.0.png";  

var nulachtfitwee = new Object(); 
nulachtfitwee.src = "http://darioriccioni.net/replacer/11.9.1.png";  

var nulachtfidrie = new Object(); 
nulachtfidrie.src = "http://darioriccioni.net/replacer/11.9.2.png";  

var nulachtmclareneen = new Object(); 
nulachtmclareneen.src = "http://darioriccioni.net/replacer/11.10.0.png";  

var nulachtmclarentwee = new Object(); 
nulachtmclarentwee.src = "http://darioriccioni.net/replacer/11.10.1.png";  

var nulachtmclarendrie = new Object(); 
nulachtmclarendrie.src = "http://darioriccioni.net/replacer/11.10.2.png";  

//2009
var nulnegenferrarieen = new Object(); 
nulnegenferrarieen.src = "http://darioriccioni.net/replacer/18.0.0.png";  

var nulnegenferraritwee = new Object(); 
nulnegenferraritwee.src = "http://darioriccioni.net/replacer/18.0.1.png";  

var nulnegenferraridrie = new Object(); 
nulnegenferraridrie.src = "http://darioriccioni.net/replacer/18.0.2.png";  

var nulnegenferrarivier = new Object(); 
nulnegenferrarivier.src = "http://darioriccioni.net/replacer/18.0.3.png";  

var nulnegenmclareneen = new Object(); 
nulnegenmclareneen.src = "http://darioriccioni.net/replacer/18.1.0.png";  

var nulnegenmclarentwee = new Object(); 
nulnegenmclarentwee.src = "http://darioriccioni.net/replacer/18.1.1.png";  

var nulnegenmclarendrie = new Object(); 
nulnegenmclarendrie.src = "http://darioriccioni.net/replacer/18.1.2.png";  

var nulnegenbmween = new Object(); 
nulnegenbmween.src = "http://darioriccioni.net/replacer/18.2.0.png";  

var nulnegenbmwtwee = new Object(); 
nulnegenbmwtwee.src = "http://darioriccioni.net/replacer/18.2.1.png";  

var nulnegenbmwdrie = new Object(); 
nulnegenbmwdrie.src = "http://darioriccioni.net/replacer/18.2.2.png";  

var nulnegenrenaulteen = new Object(); 
nulnegenrenaulteen.src = "http://darioriccioni.net/replacer/18.3.0.png";  

var nulnegenrenaulttwee = new Object(); 
nulnegenrenaulttwee.src = "http://darioriccioni.net/replacer/18.3.1.png";  

var nulnegenrenaultdrie = new Object(); 
nulnegenrenaultdrie.src = "http://darioriccioni.net/replacer/18.3.2.png";  

var nulnegentoyotaeen = new Object(); 
nulnegentoyotaeen.src = "http://darioriccioni.net/replacer/18.4.0.png";  

var nulnegentoyotatwee = new Object(); 
nulnegentoyotatwee.src = "http://darioriccioni.net/replacer/18.4.1.png";  

var nulnegentoyotadrie = new Object(); 
nulnegentoyotadrie.src = "http://darioriccioni.net/replacer/18.4.2.png";  

var nulnegenstreen = new Object(); 
nulnegenstreen.src = "http://darioriccioni.net/replacer/18.5.0.png";  

var nulnegenstrtwee = new Object(); 
nulnegenstrtwee.src = "http://darioriccioni.net/replacer/18.5.1.png";  

var nulnegenstrdrie = new Object(); 
nulnegenstrdrie.src = "http://darioriccioni.net/replacer/18.5.2.png";  

var nulnegenrbreen = new Object(); 
nulnegenrbreen.src = "http://darioriccioni.net/replacer/18.6.0.png";  

var nulnegenrbrtwee = new Object(); 
nulnegenrbrtwee.src = "http://darioriccioni.net/replacer/18.6.1.png";  

var nulnegenrbrdrie = new Object(); 
nulnegenrbrdrie.src = "http://darioriccioni.net/replacer/18.6.2.png";  



var nulnegenwilliamseen = new Object(); 
nulnegenwilliamseen.src = "http://darioriccioni.net/replacer/18.7.0.png";  

var nulnegenwilliamstwee = new Object(); 
nulnegenwilliamstwee.src = "http://darioriccioni.net/replacer/18.7.1.png";  

var nulnegenwilliamsdrie = new Object(); 
nulnegenwilliamsdrie.src = "http://darioriccioni.net/replacer/18.7.2.png";  

var nulnegenfieen = new Object(); 
nulnegenfieen.src = "http://darioriccioni.net/replacer/18.8.0.png";  

var nulnegenfitwee = new Object(); 
nulnegenfitwee.src = "http://darioriccioni.net/replacer/18.8.1.png";  

var nulnegenfidrie = new Object(); 
nulnegenfidrie.src = "http://darioriccioni.net/replacer/18.8.2.png";  

var nulnegenbrawneen = new Object(); 
nulnegenbrawneen.src = "http://darioriccioni.net/replacer/18.9.0.png";  

var nulnegenbrawntwee = new Object(); 
nulnegenbrawntwee.src = "http://darioriccioni.net/replacer/18.9.1.png";  

var nulnegenbrawndrie = new Object(); 
nulnegenbrawndrie.src = "http://darioriccioni.net/replacer/18.9.2.png";  

//2010
var nultienmclareneen = new Object(); 
nultienmclareneen.src = "http://darioriccioni.net/replacer/24.0.0.png";  

var nultienmclarentwee = new Object(); 
nultienmclarentwee.src = "http://darioriccioni.net/replacer/24.0.1.png";  

var nultienmclarendrie = new Object(); 
nultienmclarendrie.src = "http://darioriccioni.net/replacer/24.0.2.png";  

var nultienmercedeseen = new Object(); 
nultienmercedeseen.src = "http://darioriccioni.net/replacer/24.1.0.png";  

var nultienmercedestwee = new Object(); 
nultienmercedestwee.src = "http://darioriccioni.net/replacer/24.1.1.png";  

var nultienmercedesdrie = new Object(); 
nultienmercedesdrie.src = "http://darioriccioni.net/replacer/24.1.2.png";  

var nultienrbreen = new Object(); 
nultienrbreen.src = "http://darioriccioni.net/replacer/24.2.0.png";  

var nultienrbrtwee = new Object(); 
nultienrbrtwee.src = "http://darioriccioni.net/replacer/24.2.1.png";  

var nultienrbrdrie = new Object(); 
nultienrbrdrie.src = "http://darioriccioni.net/replacer/24.2.2.png";  

var nultienferrarieen = new Object(); 
nultienferrarieen.src = "http://darioriccioni.net/replacer/24.3.0.png";  

var nultienferraritwee = new Object(); 
nultienferraritwee.src = "http://darioriccioni.net/replacer/24.3.1.png";  

var nultienferraridrie = new Object(); 
nultienferraridrie.src = "http://darioriccioni.net/replacer/24.3.2.png";  

var nultienferrarivier = new Object(); 
nultienferrarivier.src = "http://darioriccioni.net/replacer/24.3.3.png";  

var nultienwilliamseen = new Object(); 
nultienwilliamseen.src = "http://darioriccioni.net/replacer/24.4.0.png";  

var nultienwilliamstwee = new Object(); 
nultienwilliamstwee.src = "http://darioriccioni.net/replacer/24.4.1.png";  

var nultienwilliamsdrie = new Object(); 
nultienwilliamsdrie.src = "http://darioriccioni.net/replacer/24.4.2.png";  

var nultienrenaulteen = new Object(); 
nultienrenaulteen.src = "http://darioriccioni.net/replacer/24.5.0.png";  

var nultienrenaulttwee = new Object(); 
nultienrenaulttwee.src = "http://darioriccioni.net/replacer/24.5.1.png";  

var nultienrenaultdrie = new Object(); 
nultienrenaultdrie.src = "http://darioriccioni.net/replacer/24.5.2.png";  

var nultienfieen = new Object(); 
nultienfieen.src = "http://darioriccioni.net/replacer/24.6.0.png";  

var nultienfitwee = new Object(); 
nultienfitwee.src = "http://darioriccioni.net/replacer/24.6.1.png";  

var nultienfidrie = new Object(); 
nultienfidrie.src = "http://darioriccioni.net/replacer/24.6.2.png";  

var nultienstreen = new Object(); 
nultienstreen.src = "http://darioriccioni.net/replacer/24.7.0.png";  

var nultienstrtwee = new Object(); 
nultienstrtwee.src = "http://darioriccioni.net/replacer/24.7.1.png";  

var nultienstrdrie = new Object(); 
nultienstrdrie.src = "http://darioriccioni.net/replacer/24.7.2.png";  

var nultienlotuseen = new Object(); 
nultienlotuseen.src = "http://darioriccioni.net/replacer/24.8.0.png";  

var nultienlotustwee = new Object(); 
nultienlotustwee.src = "http://darioriccioni.net/replacer/24.8.1.png";  

var nultienlotusdrie = new Object(); 
nultienlotusdrie.src = "http://darioriccioni.net/replacer/24.8.2.png";  

var nultienhrteen = new Object(); 
nultienhrteen.src = "http://darioriccioni.net/replacer/24.9.0.png";  

var nultienhrttwee = new Object(); 
nultienhrttwee.src = "http://darioriccioni.net/replacer/24.9.1.png";  

var nultienhrtdrie = new Object(); 
nultienhrtdrie.src = "http://darioriccioni.net/replacer/24.9.2.png";  

var nultiensaubereen = new Object(); 
nultiensaubereen.src = "http://darioriccioni.net/replacer/24.10.0.png";  

var nultiensaubertwee = new Object(); 
nultiensaubertwee.src = "http://darioriccioni.net/replacer/24.10.1.png";  

var nultiensauberdrie = new Object(); 
nultiensauberdrie.src = "http://darioriccioni.net/replacer/24.10.2.png";  

var nultienvirgineen = new Object(); 
nultienvirgineen.src = "http://darioriccioni.net/replacer/24.11.0.png";  

var nultienvirgintwee = new Object(); 
nultienvirgintwee.src = "http://darioriccioni.net/replacer/24.11.1.png";  

var nultienvirgindrie = new Object(); 
nultienvirgindrie.src = "http://darioriccioni.net/replacer/24.11.2.png";  

//2011
var eeneenrbreen = new Object(); 
eeneenrbreen.src = "http://darioriccioni.net/replacer/28.0.0.png";  

var eeneenrbrtwee = new Object(); 
eeneenrbrtwee.src = "http://darioriccioni.net/replacer/28.0.1.png";  

var eeneenrbrdrie = new Object(); 
eeneenrbrdrie.src = "http://darioriccioni.net/replacer/28.0.2.png";  

var eeneenmclareneen = new Object(); 
eeneenmclareneen.src = "http://darioriccioni.net/replacer/28.1.0.png";  

var eeneenmclarentwee = new Object(); 
eeneenmclarentwee.src = "http://darioriccioni.net/replacer/28.1.1.png";  

var eeneenmclarendrie = new Object(); 
eeneenmclarendrie.src = "http://darioriccioni.net/replacer/28.1.2.png";  

var eeneenferrarieen = new Object(); 
eeneenferrarieen.src = "http://darioriccioni.net/replacer/28.2.0.png";  

var eeneenferraritwee = new Object(); 
eeneenferraritwee.src = "http://darioriccioni.net/replacer/28.2.1.png";  

var eeneenferraridrie = new Object(); 
eeneenferraridrie.src = "http://darioriccioni.net/replacer/28.2.2.png";  

var eeneenferrarivier = new Object(); 
eeneenferrarivier.src = "http://darioriccioni.net/replacer/28.2.3.png";  

var eeneenmercedeseen = new Object(); 
eeneenmercedeseen.src = "http://darioriccioni.net/replacer/28.3.0.png";  

var eeneenmercedestwee = new Object(); 
eeneenmercedestwee.src = "http://darioriccioni.net/replacer/28.3.1.png";  

var eeneenmercedesdrie = new Object(); 
eeneenmercedesdrie.src = "http://darioriccioni.net/replacer/28.3.2.png";  

var eeneenrenaulteen = new Object(); 
eeneenrenaulteen.src = "http://darioriccioni.net/replacer/28.4.0.png";  

var eeneenrenaulttwee = new Object(); 
eeneenrenaulttwee.src = "http://darioriccioni.net/replacer/28.4.1.png";  

var eeneenrenaultdrie = new Object(); 
eeneenrenaultdrie.src = "http://darioriccioni.net/replacer/28.4.2.png";  

var eeneenwilliamseen = new Object(); 
eeneenwilliamseen.src = "http://darioriccioni.net/replacer/28.5.0.png";  

var eeneenwilliamstwee = new Object(); 
eeneenwilliamstwee.src = "http://darioriccioni.net/replacer/28.5.1.png";  

var eeneenwilliamsdrie = new Object(); 
eeneenwilliamsdrie.src = "http://darioriccioni.net/replacer/28.5.2.png";  

var eeneenfieen = new Object(); 
eeneenfieen.src = "http://darioriccioni.net/replacer/28.6.0.png";  

var eeneenfitwee = new Object(); 
eeneenfitwee.src = "http://darioriccioni.net/replacer/28.6.1.png";  

var eeneenfidrie = new Object(); 
eeneenfidrie.src = "http://darioriccioni.net/replacer/28.6.2.png";  

var eeneensaubereen = new Object(); 
eeneensaubereen.src = "http://darioriccioni.net/replacer/28.7.0.png";  

var eeneensaubertwee = new Object(); 
eeneensaubertwee.src = "http://darioriccioni.net/replacer/28.7.1.png";  

var eeneensauberdrie = new Object(); 
eeneensauberdrie.src = "http://darioriccioni.net/replacer/28.7.2.png";  

var eeneenstreen = new Object(); 
eeneenstreen.src = "http://darioriccioni.net/replacer/28.8.0.png";  

var eeneenstrtwee = new Object(); 
eeneenstrtwee.src = "http://darioriccioni.net/replacer/28.8.1.png";  

var eeneenstrdrie = new Object(); 
eeneenstrdrie.src = "http://darioriccioni.net/replacer/28.8.2.png";  

var eeneenlotuseen = new Object(); 
eeneenlotuseen.src = "http://darioriccioni.net/replacer/28.9.0.png";  

var eeneenlotustwee = new Object(); 
eeneenlotustwee.src = "http://darioriccioni.net/replacer/28.9.1.png";  

var eeneenlotusdrie = new Object(); 
eeneenlotusdrie.src = "http://darioriccioni.net/replacer/28.9.2.png";  

var eeneenhrteen = new Object(); 
eeneenhrteen.src = "http://darioriccioni.net/replacer/28.10.0.png";  

var eeneenhrttwee = new Object(); 
eeneenhrttwee.src = "http://darioriccioni.net/replacer/28.10.1.png";  

var eeneenhrtdrie = new Object(); 
eeneenhrtdrie.src = "http://darioriccioni.net/replacer/28.10.2.png";  

var eeneenvirgineen = new Object(); 
eeneenvirgineen.src = "http://darioriccioni.net/replacer/28.11.0.png";  

var eeneenvirgintwee = new Object(); 
eeneenvirgintwee.src = "http://darioriccioni.net/replacer/28.11.1.png";  

var eeneenvirgindrie = new Object(); 
eeneenvirgindrie.src = "http://darioriccioni.net/replacer/28.11.2.png";  

//Logos
var ferrari = new Object(); 
ferrari.src = "http://darioriccioni.net/replacer/logos/0.gif";  

var bmwa = new Object(); 
bmwa.src = "http://darioriccioni.net/replacer/logos/1.gif";  

var mercedes = new Object(); 
mercedes.src = "http://darioriccioni.net/replacer/logos/2.png";  

var renault = new Object(); 
renault.src = "http://darioriccioni.net/replacer/logos/3.gif";  

var honda = new Object(); 
honda.src = "http://darioriccioni.net/replacer/logos/4.gif";  

var cosworth = new Object(); 
cosworth.src = "http://darioriccioni.net/replacer/logos/5.gif";  

var newminardi = new Object(); 
newminardi.src = "http://darioriccioni.net/replacer/logos/6.gif";  

var toyota = new Object(); 
toyota.src = "http://darioriccioni.net/replacer/logos/7.gif";  

var bridgestone = new Object(); 
bridgestone.src = "http://darioriccioni.net/replacer/logos/8.gif";  

var michelin = new Object(); 
michelin.src = "http://darioriccioni.net/replacer/logos/9.gif";  

var avon = new Object(); 
avon.src = "http://darioriccioni.net/replacer/logos/10.gif";  

var yokohama = new Object(); 
yokohama.src = "http://darioriccioni.net/replacer/logos/11.gif";  

var audi = new Object(); 
audi.src = "http://darioriccioni.net/replacer/logos/12.gif";  

var ford = new Object(); 
ford.src = "http://darioriccioni.net/replacer/logos/13.gif";  

var kawasaki = new Object(); 
kawasaki.src = "http://darioriccioni.net/replacer/logos/14.gif";  

var mgaa = new Object(); 
mgaa.src = "http://darioriccioni.net/replacer/logos/15.gif";  

var rover = new Object(); 
rover.src = "http://darioriccioni.net/replacer/logos/16.gif";  

var suzuki = new Object(); 
suzuki.src = "http://darioriccioni.net/replacer/logos/17.gif";  

var bfgoodrich = new Object(); 
bfgoodrich.src = "http://darioriccioni.net/replacer/logos/18.gif";  

var alfaromeo = new Object(); 
alfaromeo.src = "http://darioriccioni.net/replacer/logos/19.gif";  

var peugeot = new Object(); 
peugeot.src = "http://darioriccioni.net/replacer/logos/20.gif";  

var proton = new Object(); 
proton.src = "http://darioriccioni.net/replacer/logos/21.gif";  

var vauxhall = new Object(); 
vauxhall.src = "http://darioriccioni.net/replacer/logos/22.gif";  

var sauber = new Object(); 
sauber.src = "http://darioriccioni.net/replacer/logos/23.png";  

var jaguar = new Object(); 
jaguar.src = "http://darioriccioni.net/replacer/logos/24.gif";  

var newwilliams = new Object(); 
newwilliams.src = "http://darioriccioni.net/replacer/logos/25.gif";  

var mclaren = new Object(); 
mclaren.src = "http://darioriccioni.net/replacer/logos/26.gif";  

var arrows = new Object(); 
arrows.src = "http://darioriccioni.net/replacer/logos/27.gif";  

var bara = new Object(); 
bara.src = "http://darioriccioni.net/replacer/logos/28.gif";  

var jordan = new Object(); 
jordan.src = "http://darioriccioni.net/replacer/logos/29.gif";  

var caterham = new Object(); 
caterham.src = "http://darioriccioni.net/replacer/logos/30.gif";  

var westerfield = new Object(); 
westerfield.src = "http://darioriccioni.net/replacer/logos/31.gif";  

var daxa = new Object(); 
daxa.src = "http://darioriccioni.net/replacer/logos/32.gif";  

var tiger = new Object(); 
tiger.src = "http://darioriccioni.net/replacer/logos/33.gif";  

var rawengineering = new Object(); 
rawengineering.src = "http://darioriccioni.net/replacer/logos/34.gif";  

var locost = new Object(); 
locost.src = "http://darioriccioni.net/replacer/logos/35.gif";  

var birkin = new Object(); 
birkin.src = "http://darioriccioni.net/replacer/logos/36.gif";  

var donkervoort = new Object(); 
donkervoort.src = "http://darioriccioni.net/replacer/logos/37.gif";  

var midland = new Object(); 
midland.src = "http://darioriccioni.net/replacer/logos/38.gif";  

var redbull = new Object(); 
redbull.src = "http://darioriccioni.net/replacer/logos/39.gif";  

var superaguri = new Object(); 
superaguri.src = "http://darioriccioni.net/replacer/logos/40.gif";  

var midlandf = new Object(); 
midlandf.src = "http://darioriccioni.net/replacer/logos/41.gif";  

var tororosso = new Object(); 
tororosso.src = "http://darioriccioni.net/replacer/logos/42.gif";  

var newcosworth = new Object(); 
newcosworth.src = "http://darioriccioni.net/replacer/logos/43.gif";  

var goodyear = new Object(); 
goodyear.src = "http://darioriccioni.net/replacer/logos/44.gif";  

var firestone = new Object(); 
firestone.src = "http://darioriccioni.net/replacer/logos/45.gif";  

var lola = new Object(); 
lola.src = "http://darioriccioni.net/replacer/logos/46.gif";  

var penske = new Object(); 
penske.src = "http://darioriccioni.net/replacer/logos/47.gif";  

var reynard = new Object(); 
reynard.src = "http://darioriccioni.net/replacer/logos/48.gif";  

var cooper = new Object(); 
cooper.src = "http://darioriccioni.net/replacer/logos/49.gif";  

var zytek = new Object(); 
zytek.src = "http://darioriccioni.net/replacer/logos/50.gif";  

var holden = new Object(); 
holden.src = "http://darioriccioni.net/replacer/logos/51.gif";  

var dunlop = new Object(); 
dunlop.src = "http://darioriccioni.net/replacer/logos/52.gif";  

var pirelli = new Object(); 
pirelli.src = "http://darioriccioni.net/replacer/logos/53.gif";  

var williams = new Object(); 
williams.src = "http://darioriccioni.net/replacer/logos/54.gif";  

var lotus = new Object(); 
lotus.src = "http://darioriccioni.net/replacer/logos/55.gif";  

var ligier = new Object(); 
ligier.src = "http://darioriccioni.net/replacer/logos/56.gif";  

var benetton = new Object(); 
benetton.src = "http://darioriccioni.net/replacer/logos/57.gif";  

var tyrell = new Object(); 
tyrell.src = "http://darioriccioni.net/replacer/logos/58.gif";  

var brabham = new Object(); 
brabham.src = "http://darioriccioni.net/replacer/logos/59.gif";  

var zakspeed = new Object(); 
zakspeed.src = "http://darioriccioni.net/replacer/logos/60.gif";  

var osella = new Object(); 
osella.src = "http://darioriccioni.net/replacer/logos/61.gif";  

var agsa = new Object(); 
agsa.src = "http://darioriccioni.net/replacer/logos/62.gif";  

var minardi = new Object(); 
minardi.src = "http://darioriccioni.net/replacer/logos/63.gif";  

var taga = new Object(); 
taga.src = "http://darioriccioni.net/replacer/logos/64.gif";  

var motorimoderni = new Object(); 
motorimoderni.src = "http://darioriccioni.net/replacer/logos/65.gif";  

var porsche = new Object(); 
porsche.src = "http://darioriccioni.net/replacer/logos/66.gif";  

var tvra = new Object(); 
tvra.src = "http://darioriccioni.net/replacer/logos/67.gif";  

var astonmartin = new Object(); 
astonmartin.src = "http://darioriccioni.net/replacer/logos/68.gif";  

var chevrolet = new Object(); 
chevrolet.src = "http://darioriccioni.net/replacer/logos/69.gif";  

var generalm = new Object(); 
generalm.src = "http://darioriccioni.net/replacer/logos/70.gif";  

var dodge = new Object(); 
dodge.src = "http://darioriccioni.net/replacer/logos/71.gif";  

var lamborghini = new Object(); 
lamborghini.src = "http://darioriccioni.net/replacer/logos/72.gif";  

var welter = new Object(); 
welter.src = "http://darioriccioni.net/replacer/logos/73.gif";  

var courage = new Object(); 
courage.src = "http://darioriccioni.net/replacer/logos/74.gif";  

var pilbeam = new Object(); 
pilbeam.src = "http://darioriccioni.net/replacer/logos/75.gif";  

var dallara = new Object(); 
dallara.src = "http://darioriccioni.net/replacer/logos/76.gif";  

var lister = new Object(); 
lister.src = "http://darioriccioni.net/replacer/logos/77.gif";  

var pescarolo = new Object(); 
pescarolo.src = "http://darioriccioni.net/replacer/logos/78.gif";  

var danos = new Object(); 
danos.src = "http://darioriccioni.net/replacer/logos/79.gif";  

var bentley = new Object(); 
bentley.src = "http://darioriccioni.net/replacer/logos/80.gif";  

var judd = new Object(); 
judd.src = "http://darioriccioni.net/replacer/logos/81.gif";  

var mugen = new Object(); 
mugen.src = "http://darioriccioni.net/replacer/logos/82.gif";  

var mopar = new Object(); 
mopar.src = "http://darioriccioni.net/replacer/logos/83.gif";  

var aera = new Object(); 
aera.src = "http://darioriccioni.net/replacer/logos/84.gif";  

var mazda = new Object(); 
mazda.src = "http://darioriccioni.net/replacer/logos/85.gif";  

var kumho = new Object(); 
kumho.src = "http://darioriccioni.net/replacer/logos/86.gif";  

var newnewwilliams = new Object(); 
newnewwilliams.src = "http://darioriccioni.net/replacer/logos/87.gif";  

var spyker = new Object(); 
spyker.src = "http://darioriccioni.net/replacer/logos/88.gif";  

var forceindia = new Object(); 
forceindia.src = "http://darioriccioni.net/replacer/logos/89.gif";  

var yamaha = new Object(); 
yamaha.src = "http://darioriccioni.net/replacer/logos/90.gif";  

var hart = new Object(); 
hart.src = "http://darioriccioni.net/replacer/logos/91.gif";  

var supertec = new Object(); 
supertec.src = "http://darioriccioni.net/replacer/logos/92.gif";  

var playlife = new Object(); 
playlife.src = "http://darioriccioni.net/replacer/logos/93.gif";  

var prost = new Object(); 
prost.src = "http://darioriccioni.net/replacer/logos/94.gif";  

var stewart = new Object(); 
stewart.src = "http://darioriccioni.net/replacer/logos/95.gif";  

var brawn = new Object(); 
brawn.src = "http://darioriccioni.net/replacer/logos/96.gif";  

var mygale = new Object(); 
mygale.src = "http://darioriccioni.net/replacer/logos/97.gif";  

var slca = new Object(); 
slca.src = "http://darioriccioni.net/replacer/logos/98.gif";  

var arttech = new Object(); 
arttech.src = "http://darioriccioni.net/replacer/logos/99.gif";  

var volkswagen = new Object(); 
volkswagen.src = "http://darioriccioni.net/replacer/logos/100.gif";  

var fiat = new Object(); 
fiat.src = "http://darioriccioni.net/replacer/logos/101.png";  

var mercury = new Object(); 
mercury.src = "http://darioriccioni.net/replacer/logos/102.gif";  

var amca = new Object(); 
amca.src = "http://darioriccioni.net/replacer/logos/103.gif";  

var plymouth = new Object(); 
plymouth.src = "http://darioriccioni.net/replacer/logos/104.gif";  

var pontiac = new Object(); 
pontiac.src = "http://darioriccioni.net/replacer/logos/105.gif";  

var maserati = new Object(); 
maserati.src = "http://darioriccioni.net/replacer/logos/106.png";  

var saleen = new Object(); 
saleen.src = "http://darioriccioni.net/replacer/logos/107.png";  

var mosler = new Object(); 
mosler.src = "http://darioriccioni.net/replacer/logos/108.png";  

var newlotus = new Object(); 
newlotus.src = "http://darioriccioni.net/replacer/logos/109.png";  

var hrta = new Object(); 
hrta.src = "http://darioriccioni.net/replacer/logos/110.png";  

var virgin = new Object(); 
virgin.src = "http://darioriccioni.net/replacer/logos/111.png";  

var newrenault = new Object(); 
newrenault.src = "http://darioriccioni.net/replacer/logos/112.png";  

var imageList = new Object(); 

//Seriespics
imageList["http://batracer.com/-bP?77"] = {remove: false, newimage: formulanations.src};
imageList["http://batracer.com/-bP?78"] = {remove: false, newimage: britishtourers.src};
imageList["http://batracer.com/-bP?79"] = {remove: false, newimage: zesentachtig.src};
imageList["http://batracer.com/-bP?80"] = {remove: false, newimage: nultwee.src};
imageList["http://batracer.com/-bP?81"] = {remove: false, newimage: nulzes.src};
imageList["http://batracer.com/-bP?82"] = {remove: false, newimage: champcar.src};
imageList["http://batracer.com/-bP?83"] = {remove: false, newimage: zupacars.src};
imageList["http://batracer.com/-bP?106"] = {remove: false, newimage: bestecarsetvanallemaal.src};
imageList["http://batracer.com/-bP?107"] = {remove: false, newimage: batseven.src};
imageList["http://batracer.com/-bP?119"] = {remove: false, newimage: nulzeven.src};
imageList["http://batracer.com/-bP?120"] = {remove: false, newimage: mrtwee.src};
imageList["http://batracer.com/-bP?139"] = {remove: false, newimage: nulacht.src};
imageList["http://batracer.com/-bP?173"] = {remove: false, newimage: negenennegentig.src};
imageList["http://batracer.com/-bP?174"] = {remove: false, newimage: nulvijf.src};
imageList["http://batracer.com/-bP?175"] = {remove: false, newimage: zevenennegentig.src};
imageList["http://batracer.com/-bP?179"] = {remove: false, newimage: champcartwee.src};
imageList["http://batracer.com/-bP?195"] = {remove: false, newimage: indycarnulacht.src};
imageList["http://batracer.com/-bP?202"] = {remove: false, newimage: indyvijfhonderd.src};
imageList["http://batracer.com/-bP?213"] = {remove: false, newimage: nulnegen.src};
imageList["http://batracer.com/-bP?234"] = {remove: false, newimage: DEUTSCHETOURWAGENSCH.src};
imageList["http://batracer.com/-bP?264"] = {remove: false, newimage: formuladrie.src};
imageList["http://batracer.com/-bP?265"] = {remove: false, newimage: grandprixtwee.src};
imageList["http://batracer.com/-bP?267"] = {remove: false, newimage: classictrans.src};
imageList["http://batracer.com/-bP?280"] = {remove: false, newimage: nultien.src};
imageList["http://batracer.com/-bP?299"] = {remove: false, newimage: supercartien.src};
imageList["http://batracer.com/-bP?300"] = {remove: false, newimage: msgt.src};
imageList["http://batracer.com/-bP?323"] = {remove: false, newimage: eeneen.src};
imageList["http://batracer.com/-bP?324"] = {remove: false, newimage: eeneen.src};
//1986
imageList["http://batracer.com/-bP?63"] = {remove: false, newimage: achtzeswilliams.src};
imageList["http://batracer.com/-bP?64"] = {remove: false, newimage: achtzesmclaren.src};
imageList["http://batracer.com/-bP?65"] = {remove: false, newimage: achtzeslotus.src};
imageList["http://batracer.com/-bP?66"] = {remove: false, newimage: achtzesferrari.src};
imageList["http://batracer.com/-bP?67"] = {remove: false, newimage: achtzesligier.src};
imageList["http://batracer.com/-bP?68"] = {remove: false, newimage: achtzesbenneton.src};
imageList["http://batracer.com/-bP?69"] = {remove: false, newimage: achtzestyrell.src};
imageList["http://batracer.com/-bP?70"] = {remove: false, newimage: achtzeslola.src};
imageList["http://batracer.com/-bP?71"] = {remove: false, newimage: achtzesbrabham.src};
imageList["http://batracer.com/-bP?72"] = {remove: false, newimage: achtzesarrows.src};
imageList["http://batracer.com/-bP?73"] = {remove: false, newimage: achtzeszakspeed.src};
imageList["http://batracer.com/-bP?74"] = {remove: false, newimage: achtzesosella.src};
imageList["http://batracer.com/-bP?75"] = {remove: false, newimage: achtzesags.src};
imageList["http://batracer.com/-bP?76"] = {remove: false, newimage: achtzesminardi.src};
//1997
imageList["http://batracer.com/-bP?140"] = {remove: false, newimage: negenzevenarrows.src};
imageList["http://batracer.com/-bP?141"] = {remove: false, newimage: negenzevenwilliams.src};
imageList["http://batracer.com/-bP?142"] = {remove: false, newimage: negenzeventyrell.src};
imageList["http://batracer.com/-bP?143"] = {remove: false, newimage: negenzevenbenneton.src};
imageList["http://batracer.com/-bP?144"] = {remove: false, newimage: negenzevenferrari.src};
imageList["http://batracer.com/-bP?145"] = {remove: false, newimage: negenzevenmclaren.src};
imageList["http://batracer.com/-bP?146"] = {remove: false, newimage: negenzevenjordan.src};
imageList["http://batracer.com/-bP?147"] = {remove: false, newimage: negenzevenprost.src};
imageList["http://batracer.com/-bP?148"] = {remove: false, newimage: negenzevensauber.src};
imageList["http://batracer.com/-bP?149"] = {remove: false, newimage: negenzevenminardi.src};
imageList["http://batracer.com/-bP?150"] = {remove: false, newimage: negenzevenstewart.src};
imageList["http://batracer.com/-bP?151"] = {remove: false, newimage: negenzevenrolflol.src};
//1999
imageList["http://batracer.com/-bP?152"] = {remove: false, newimage: negennegenwilliams.src};
imageList["http://batracer.com/-bP?153"] = {remove: false, newimage: negennegensauber.src};
imageList["http://batracer.com/-bP?154"] = {remove: false, newimage: negennegenprost.src};
imageList["http://batracer.com/-bP?155"] = {remove: false, newimage: negennegenstewart.src};
imageList["http://batracer.com/-bP?156"] = {remove: false, newimage: negennegenminardi.src};
imageList["http://batracer.com/-bP?157"] = {remove: false, newimage: negennegenmclaren.src};
imageList["http://batracer.com/-bP?158"] = {remove: false, newimage: negennegenjordan.src};
imageList["http://batracer.com/-bP?159"] = {remove: false, newimage: negennegenferrari.src};
imageList["http://batracer.com/-bP?160"] = {remove: false, newimage: negennegenbenetton.src};
imageList["http://batracer.com/-bP?161"] = {remove: false, newimage: negennegenbar.src};
imageList["http://batracer.com/-bP?162"] = {remove: false, newimage: negennegenarrows.src};
//2005
imageList["http://batracer.com/-bP?163"] = {remove: false, newimage: nulvijfminardi.src};
imageList["http://batracer.com/-bP?164"] = {remove: false, newimage: nulvijfjordan.src};
imageList["http://batracer.com/-bP?165"] = {remove: false, newimage: nulvijftoyota.src};
imageList["http://batracer.com/-bP?166"] = {remove: false, newimage: nulvijfredbull.src};
imageList["http://batracer.com/-bP?167"] = {remove: false, newimage: nulvijfsauber.src};
imageList["http://batracer.com/-bP?168"] = {remove: false, newimage: nulvijfmclaren.src};
imageList["http://batracer.com/-bP?169"] = {remove: false, newimage: nulvijfwilliams.src};
imageList["http://batracer.com/-bP?170"] = {remove: false, newimage: nulvijfrenault.src};
imageList["http://batracer.com/-bP?171"] = {remove: false, newimage: nulvijfbar.src};
imageList["http://batracer.com/-bP?172"] = {remove: false, newimage: nulvijfferrari.src};
//2009
imageList["http://batracer.com/-bP?203"] = {remove: false, newimage: nulnegenferrari.src};
imageList["http://batracer.com/-bP?204"] = {remove: false, newimage: nulnegenmclaren.src};
imageList["http://batracer.com/-bP?205"] = {remove: false, newimage: nulnegenbmw.src};
imageList["http://batracer.com/-bP?206"] = {remove: false, newimage: nulnegenrenault.src};
imageList["http://batracer.com/-bP?207"] = {remove: false, newimage: nulnegentoyota.src};
imageList["http://batracer.com/-bP?208"] = {remove: false, newimage: nulnegentororosso.src};
imageList["http://batracer.com/-bP?209"] = {remove: false, newimage: nulnegenredbull.src};
imageList["http://batracer.com/-bP?210"] = {remove: false, newimage: nulnegenwilliams.src};
imageList["http://batracer.com/-bP?211"] = {remove: false, newimage: nulnegenforceindia.src};
imageList["http://batracer.com/-bP?212"] = {remove: false, newimage: nulnegenbrawn.src};
//DTM
imageList["http://batracer.com/-bP?214"] = {remove: false, newimage: dtmaudizeven.src};
imageList["http://batracer.com/-bP?218"] = {remove: false, newimage: dtmaudizes.src};
imageList["http://batracer.com/-bP?222"] = {remove: false, newimage: dtmaudivijf.src};
imageList["http://batracer.com/-bP?224"] = {remove: false, newimage: dtmmerczeven.src};
imageList["http://batracer.com/-bP?228"] = {remove: false, newimage: dtmmerczes.src};
imageList["http://batracer.com/-bP?232"] = {remove: false, newimage: dtmmercvijf.src};
//MR2
imageList["http://batracer.com/-bP?121"] = {remove: false, newimage: mrawm.src};
imageList["http://batracer.com/-bP?122"] = {remove: false, newimage: mrswm.src};
imageList["http://batracer.com/-bP?123"] = {remove: false, newimage: mrzzwdries.src};
imageList["http://batracer.com/-bP?124"] = {remove: false, newimage: mrzzwdrie.src};
imageList["http://batracer.com/-bP?125"] = {remove: false, newimage: mraw.src};
imageList["http://batracer.com/-bP?126"] = {remove: false, newimage: mrsw.src};
imageList["http://batracer.com/-bP?127"] = {remove: false, newimage: mrzzw.src};
//LMES
imageList["http://batracer.com/-bP?84"] = {remove: false, newimage: lmesbeemdrie.src};
imageList["http://batracer.com/-bP?85"] = {remove: false, newimage: lmesbeemvier.src};
imageList["http://batracer.com/-bP?86"] = {remove: false, newimage: lmesteamwales.src};
imageList["http://batracer.com/-bP?87"] = {remove: false, newimage: lmesporsche.src};
imageList["http://batracer.com/-bP?88"] = {remove: false, newimage: lmestvr.src};
imageList["http://batracer.com/-bP?89"] = {remove: false, newimage: dubbeloseven.src};
imageList["http://batracer.com/-bP?90"] = {remove: false, newimage: lmessupervett.src};
imageList["http://batracer.com/-bP?91"] = {remove: false, newimage: lmesdodge.src};
imageList["http://batracer.com/-bP?92"] = {remove: false, newimage: lmeswales.src};
imageList["http://batracer.com/-bP?93"] = {remove: false, newimage: lmeslambo.src};
imageList["http://batracer.com/-bP?94"] = {remove: false, newimage: lmesrolflol.src};
imageList["http://batracer.com/-bP?95"] = {remove: false, newimage: lmeszeikerdrie.src};
imageList["http://batracer.com/-bP?96"] = {remove: false, newimage: lmestiago.src};
imageList["http://batracer.com/-bP?97"] = {remove: false, newimage: lmesobvious.src};
imageList["http://batracer.com/-bP?98"] = {remove: false, newimage: lmesboon.src};
imageList["http://batracer.com/-bP?99"] = {remove: false, newimage: lmesaldi.src};
imageList["http://batracer.com/-bP?100"] = {remove: false, newimage: lmeslama.src};
imageList["http://batracer.com/-bP?101"] = {remove: false, newimage: lmeszaczescupvierhonderd.src};
imageList["http://batracer.com/-bP?102"] = {remove: false, newimage: lmeszeikervier.src};
imageList["http://batracer.com/-bP?103"] = {remove: false, newimage: lmespesca.src};
imageList["http://batracer.com/-bP?104"] = {remove: false, newimage: lmespan.src};
imageList["http://batracer.com/-bP?105"] = {remove: false, newimage: lmesbent.src};
//2010
imageList["http://batracer.com/-bP?268"] = {remove: false, newimage: nultienmclaren.src};
imageList["http://batracer.com/-bP?269"] = {remove: false, newimage: nultienmercedes.src};
imageList["http://batracer.com/-bP?270"] = {remove: false, newimage: nultienredbull.src};
imageList["http://batracer.com/-bP?271"] = {remove: false, newimage: nultienferrari.src};
imageList["http://batracer.com/-bP?272"] = {remove: false, newimage: nultienwilliams.src};
imageList["http://batracer.com/-bP?273"] = {remove: false, newimage: nultienrenault.src};
imageList["http://batracer.com/-bP?274"] = {remove: false, newimage: nultienforceindia.src};
imageList["http://batracer.com/-bP?275"] = {remove: false, newimage: nultientororosso.src};
imageList["http://batracer.com/-bP?276"] = {remove: false, newimage: nultienlotus.src};
imageList["http://batracer.com/-bP?277"] = {remove: false, newimage: nultienhrt.src};
imageList["http://batracer.com/-bP?278"] = {remove: false, newimage: nultiensauber.src};
imageList["http://batracer.com/-bP?279"] = {remove: false, newimage: nultienvirgin.src};
//BTCC
imageList["http://batracer.com/-bP?19"] = {remove: false, newimage: btccastra.src};
imageList["http://batracer.com/-bP?20"] = {remove: false, newimage: btcczs.src};
imageList["http://batracer.com/-bP?21"] = {remove: false, newimage: btccproton.src};
imageList["http://batracer.com/-bP?22"] = {remove: false, newimage: btcccivicr.src};
imageList["http://batracer.com/-bP?23"] = {remove: false, newimage: btccpeugvier.src};
imageList["http://batracer.com/-bP?24"] = {remove: false, newimage: btccclio.src};
imageList["http://batracer.com/-bP?25"] = {remove: false, newimage: btccalfa.src};
imageList["http://batracer.com/-bP?26"] = {remove: false, newimage: btcccivic.src};
imageList["http://batracer.com/-bP?27"] = {remove: false, newimage: btccaccord.src};
imageList["http://batracer.com/-bP?28"] = {remove: false, newimage: btccpeugdrie.src};
imageList["http://batracer.com/-bP?29"] = {remove: false, newimage: btccbeemah.src};
//GP2, F3, A1, CC
imageList["http://batracer.com/-bP?239"] = {remove: false, newimage: gptwee.src};
imageList["http://batracer.com/-bP?44"] = {remove: false, newimage: aaeen.src};
imageList["http://batracer.com/-bP?45"] = {remove: false, newimage: aaeencar.src};
imageList["http://batracer.com/-bP?235"] = {remove: false, newimage: fdrieeen.src};
imageList["http://batracer.com/-bP?236"] = {remove: false, newimage: fdrietwee.src};
imageList["http://batracer.com/-bP?237"] = {remove: false, newimage: fdriedrie.src};
imageList["http://batracer.com/-bP?238"] = {remove: false, newimage: fdrievier.src};
imageList["http://batracer.com/-bP?41"] = {remove: false, newimage: cceen.src};
imageList["http://batracer.com/-bP?42"] = {remove: false, newimage: cctwee.src};
imageList["http://batracer.com/-bP?43"] = {remove: false, newimage: ccdrie.src};
imageList["http://batracer.com/-bP?176"] = {remove: false, newimage: cctweeeen.src};
imageList["http://batracer.com/-bP?177"] = {remove: false, newimage: cctweetwee.src};
imageList["http://batracer.com/-bP?178"] = {remove: false, newimage: cctweedrie.src};
//Indycar2008
imageList["http://batracer.com/-bP?180"] = {remove: false, newimage: indycareen.src};
imageList["http://batracer.com/-bP?181"] = {remove: false, newimage: indycartwee.src};
imageList["http://batracer.com/-bP?182"] = {remove: false, newimage: indycardrie.src};
imageList["http://batracer.com/-bP?183"] = {remove: false, newimage: indycarvier.src};
imageList["http://batracer.com/-bP?184"] = {remove: false, newimage: indycarvijf.src};
imageList["http://batracer.com/-bP?185"] = {remove: false, newimage: indycarzes.src};
imageList["http://batracer.com/-bP?186"] = {remove: false, newimage: indycarzeven.src};
imageList["http://batracer.com/-bP?187"] = {remove: false, newimage: indycaracht.src};
imageList["http://batracer.com/-bP?188"] = {remove: false, newimage: indycarnegen.src};
imageList["http://batracer.com/-bP?189"] = {remove: false, newimage: indycartien.src};
imageList["http://batracer.com/-bP?190"] = {remove: false, newimage: indycarelf.src};
imageList["http://batracer.com/-bP?191"] = {remove: false, newimage: indycartwaalf.src};
imageList["http://batracer.com/-bP?192"] = {remove: false, newimage: indycardertien.src};
imageList["http://batracer.com/-bP?193"] = {remove: false, newimage: indycarveertien.src};
imageList["http://batracer.com/-bP?194"] = {remove: false, newimage: indycarvijftien.src};
imageList["http://batracer.com/-bP?196"] = {remove: false, newimage: indycarzestien.src};
imageList["http://batracer.com/-bP?197"] = {remove: false, newimage: indycarzeventien.src};
imageList["http://batracer.com/-bP?198"] = {remove: false, newimage: indycarachttien.src};
imageList["http://batracer.com/-bP?199"] = {remove: false, newimage: indycarnegentien.src};
imageList["http://batracer.com/-bP?200"] = {remove: false, newimage: indycartwintig.src};
imageList["http://batracer.com/-bP?201"] = {remove: false, newimage: indycareenentwintig.src};
//BAT7
imageList["http://batracer.com/-bP?11"] = {remove: false, newimage: bateen.src};
imageList["http://batracer.com/-bP?12"] = {remove: false, newimage: battwee.src};
imageList["http://batracer.com/-bP?13"] = {remove: false, newimage: batdrie.src};
imageList["http://batracer.com/-bP?14"] = {remove: false, newimage: batvier.src};
imageList["http://batracer.com/-bP?15"] = {remove: false, newimage: batvijf.src};
imageList["http://batracer.com/-bP?16"] = {remove: false, newimage: batzes.src};
imageList["http://batracer.com/-bP?17"] = {remove: false, newimage: batzeven.src};
imageList["http://batracer.com/-bP?18"] = {remove: false, newimage: batacht.src};
//2007
imageList["http://batracer.com/-bP?108"] = {remove: false, newimage: nulzevensa.src};
imageList["http://batracer.com/-bP?109"] = {remove: false, newimage: nulzevenbmw.src};
imageList["http://batracer.com/-bP?110"] = {remove: false, newimage: nulzevenferrari.src};
imageList["http://batracer.com/-bP?111"] = {remove: false, newimage: nulzevenhonda.src};
imageList["http://batracer.com/-bP?112"] = {remove: false, newimage: nulzevenmclaren.src};
imageList["http://batracer.com/-bP?113"] = {remove: false, newimage: nulzevenredbull.src};
imageList["http://batracer.com/-bP?114"] = {remove: false, newimage: nulzevenrenault.src};
imageList["http://batracer.com/-bP?115"] = {remove: false, newimage: nulzevenspyker.src};
imageList["http://batracer.com/-bP?116"] = {remove: false, newimage: nulzevenstr.src};
imageList["http://batracer.com/-bP?117"] = {remove: false, newimage: nulzeventoyota.src};
imageList["http://batracer.com/-bP?118"] = {remove: false, newimage: nulzevenwilliams.src};
//2008
imageList["http://batracer.com/-bP?128"] = {remove: false, newimage: nulachtferrari.src};
imageList["http://batracer.com/-bP?129"] = {remove: false, newimage: nulachtbmw.src};
imageList["http://batracer.com/-bP?130"] = {remove: false, newimage: nulachtrenault.src};
imageList["http://batracer.com/-bP?131"] = {remove: false, newimage: nulachtwilliams.src};
imageList["http://batracer.com/-bP?132"] = {remove: false, newimage: nulachtrbr.src};
imageList["http://batracer.com/-bP?133"] = {remove: false, newimage: nulachttoyoya.src};
imageList["http://batracer.com/-bP?134"] = {remove: false, newimage: nulachtstr.src};
imageList["http://batracer.com/-bP?135"] = {remove: false, newimage: nulachthonda.src};
imageList["http://batracer.com/-bP?136"] = {remove: false, newimage: nulachtsa.src};
imageList["http://batracer.com/-bP?137"] = {remove: false, newimage: nulachtfi.src};
imageList["http://batracer.com/-bP?138"] = {remove: false, newimage: nulachtmclaren.src};
//Trans-Am
imageList["http://batracer.com/-bP?254"] = {remove: false, newimage: transeen.src};
imageList["http://batracer.com/-bP?255"] = {remove: false, newimage: transtwee.src};
imageList["http://batracer.com/-bP?256"] = {remove: false, newimage: transdrie.src};
imageList["http://batracer.com/-bP?257"] = {remove: false, newimage: transvier.src};
imageList["http://batracer.com/-bP?258"] = {remove: false, newimage: transvijf.src};
imageList["http://batracer.com/-bP?259"] = {remove: false, newimage: transzes.src};
imageList["http://batracer.com/-bP?260"] = {remove: false, newimage: transzeven.src};
imageList["http://batracer.com/-bP?261"] = {remove: false, newimage: transacht.src};
imageList["http://batracer.com/-bP?262"] = {remove: false, newimage: transnegen.src};
imageList["http://batracer.com/-bP?263"] = {remove: false, newimage: transtien.src};
//2002
imageList["http://batracer.com/-bP?0"] = {remove: false, newimage: nultweeferrari.src};
imageList["http://batracer.com/-bP?1"] = {remove: false, newimage: nultweewilliams.src};
imageList["http://batracer.com/-bP?2"] = {remove: false, newimage: nultweemclaren.src};
imageList["http://batracer.com/-bP?3"] = {remove: false, newimage: nultweerenault.src};
imageList["http://batracer.com/-bP?4"] = {remove: false, newimage: nultweesauber.src};
imageList["http://batracer.com/-bP?5"] = {remove: false, newimage: nultweejordan.src};
imageList["http://batracer.com/-bP?6"] = {remove: false, newimage: nultweejaguar.src};
imageList["http://batracer.com/-bP?7"] = {remove: false, newimage: nultweebar.src};
imageList["http://batracer.com/-bP?8"] = {remove: false, newimage: nultweeminardi.src};
imageList["http://batracer.com/-bP?9"] = {remove: false, newimage: nultweetoyota.src};
imageList["http://batracer.com/-bP?10"] = {remove: false, newimage: nultweearrows.src};
//2006
imageList["http://batracer.com/-bP?30"] = {remove: false, newimage: nulzesbmw.src};
imageList["http://batracer.com/-bP?31"] = {remove: false, newimage: nulzesferrari.src};
imageList["http://batracer.com/-bP?32"] = {remove: false, newimage: nulzesbar.src};
imageList["http://batracer.com/-bP?33"] = {remove: false, newimage: nulzesmclaren.src};
imageList["http://batracer.com/-bP?34"] = {remove: false, newimage: nulzesmidland.src};
imageList["http://batracer.com/-bP?35"] = {remove: false, newimage: nulzesstr.src};
imageList["http://batracer.com/-bP?36"] = {remove: false, newimage: nulzesrenault.src};
imageList["http://batracer.com/-bP?37"] = {remove: false, newimage: nulzessa.src};
imageList["http://batracer.com/-bP?38"] = {remove: false, newimage: nulzesrbr.src};
imageList["http://batracer.com/-bP?39"] = {remove: false, newimage: nulzestoyota.src};
imageList["http://batracer.com/-bP?40"] = {remove: false, newimage: nulzeswilliams.src};
//V8Supercars
imageList["http://batracer.com/-bP?46"] = {remove: false, newimage: vachteen.src};
imageList["http://batracer.com/-bP?47"] = {remove: false, newimage: vachttwee.src};
imageList["http://batracer.com/-bP?48"] = {remove: false, newimage: vachtdrie.src};
imageList["http://batracer.com/-bP?49"] = {remove: false, newimage: vachtvier.src};

imageList["http://batracer.com/-bP?50"] = {remove: false, newimage: vachtvijf.src};
imageList["http://batracer.com/-bP?51"] = {remove: false, newimage: vachtzes.src};
imageList["http://batracer.com/-bP?52"] = {remove: false, newimage: vachtzeven.src};
imageList["http://batracer.com/-bP?53"] = {remove: false, newimage: vachtacht.src};
imageList["http://batracer.com/-bP?54"] = {remove: false, newimage: vachtnegen.src};
imageList["http://batracer.com/-bP?55"] = {remove: false, newimage: vachttien.src};
imageList["http://batracer.com/-bP?56"] = {remove: false, newimage: vachtelf.src};
imageList["http://batracer.com/-bP?57"] = {remove: false, newimage: vachttwaalf.src};
imageList["http://batracer.com/-bP?58"] = {remove: false, newimage: vachtdertien.src};
imageList["http://batracer.com/-bP?59"] = {remove: false, newimage: vachtveertien.src};
imageList["http://batracer.com/-bP?60"] = {remove: false, newimage: vachtvijftien.src};
imageList["http://batracer.com/-bP?61"] = {remove: false, newimage: vachtzestien.src};
imageList["http://batracer.com/-bP?62"] = {remove: false, newimage: vachtzeventien.src};
//Generic GT
imageList["http://batracer.com/-bP?301"] = {remove: false, newimage: gtvetteeen.src};
imageList["http://batracer.com/-bP?302"] = {remove: false, newimage: gtaston.src};
imageList["http://batracer.com/-bP?303"] = {remove: false, newimage: gtmaserati.src};
imageList["http://batracer.com/-bP?304"] = {remove: false, newimage: gtsaleen.src};
imageList["http://batracer.com/-bP?305"] = {remove: false, newimage: gtford.src};
imageList["http://batracer.com/-bP?306"] = {remove: false, newimage: gtporsche.src};
imageList["http://batracer.com/-bP?307"] = {remove: false, newimage: gtbmw.src};
imageList["http://batracer.com/-bP?308"] = {remove: false, newimage: gttvr.src};
imageList["http://batracer.com/-bP?309"] = {remove: false, newimage: gtmosler.src};
imageList["http://batracer.com/-bP?310"] = {remove: false, newimage: gtvettetwee.src};
//V8 Supercars 2010
imageList["http://batracer.com/-bP?281"] = {remove: false, newimage: vseen.src};
imageList["http://batracer.com/-bP?282"] = {remove: false, newimage: vstwee.src};
imageList["http://batracer.com/-bP?283"] = {remove: false, newimage: vsdrie.src};
imageList["http://batracer.com/-bP?284"] = {remove: false, newimage: vsvier.src};
imageList["http://batracer.com/-bP?285"] = {remove: false, newimage: vsvijf.src};
imageList["http://batracer.com/-bP?286"] = {remove: false, newimage: vszes.src};
imageList["http://batracer.com/-bP?287"] = {remove: false, newimage: vszeven.src};
imageList["http://batracer.com/-bP?288"] = {remove: false, newimage: vsacht.src};
imageList["http://batracer.com/-bP?289"] = {remove: false, newimage: vsnegen.src};
imageList["http://batracer.com/-bP?290"] = {remove: false, newimage: vstien.src};
imageList["http://batracer.com/-bP?291"] = {remove: false, newimage: vself.src};
imageList["http://batracer.com/-bP?292"] = {remove: false, newimage: vstwaalf.src};
imageList["http://batracer.com/-bP?293"] = {remove: false, newimage: vsdertien.src};
imageList["http://batracer.com/-bP?294"] = {remove: false, newimage: vsveertien.src};
imageList["http://batracer.com/-bP?295"] = {remove: false, newimage: vsvijftien.src};
imageList["http://batracer.com/-bP?296"] = {remove: false, newimage: vszestien.src};
imageList["http://batracer.com/-bP?297"] = {remove: false, newimage: vszeventien.src};
imageList["http://batracer.com/-bP?298"] = {remove: false, newimage: vsachttien.src};
//2011
imageList["http://batracer.com/-bP?311"] = {remove: false, newimage: eeneenrbr.src};
imageList["http://batracer.com/-bP?312"] = {remove: false, newimage: eeneenmclaren.src};
imageList["http://batracer.com/-bP?313"] = {remove: false, newimage: eeneenferrari.src};
imageList["http://batracer.com/-bP?314"] = {remove: false, newimage: eeneenmercedes.src};
imageList["http://batracer.com/-bP?315"] = {remove: false, newimage: eeneenrenault.src};
imageList["http://batracer.com/-bP?316"] = {remove: false, newimage: eeneenwilliams.src};
imageList["http://batracer.com/-bP?317"] = {remove: false, newimage: eeneenfi.src};
imageList["http://batracer.com/-bP?318"] = {remove: false, newimage: eeneensauber.src};
imageList["http://batracer.com/-bP?319"] = {remove: false, newimage: eeneenstr.src};
imageList["http://batracer.com/-bP?320"] = {remove: false, newimage: eeneenlotus.src};
imageList["http://batracer.com/-bP?321"] = {remove: false, newimage: eeneenhrt.src};
imageList["http://batracer.com/-bP?322"] = {remove: false, newimage: eeneenvirgin.src};
//Cars
//1986
imageList["http://batracer.com/-bV2?S&7&0&0"] = {remove: false, newimage: achtzeswilliamseen.src};
imageList["http://batracer.com/-bV2?S&7&0&1"] = {remove: false, newimage: achtzeswilliamstwee.src};
imageList["http://batracer.com/-bV2?S&7&0&2"] = {remove: false, newimage: achtzeswilliamsdrie.src};
imageList["http://batracer.com/-bV2?S&7&1&0"] = {remove: false, newimage: achtzesmclareneen.src};
imageList["http://batracer.com/-bV2?S&7&1&1"] = {remove: false, newimage: achtzesmclarentwee.src};
imageList["http://batracer.com/-bV2?S&7&1&2"] = {remove: false, newimage: achtzesmclarendrie.src};
imageList["http://batracer.com/-bV2?S&7&2&0"] = {remove: false, newimage: achtzeslotuseen.src};
imageList["http://batracer.com/-bV2?S&7&2&1"] = {remove: false, newimage: achtzeslotustwee.src};
imageList["http://batracer.com/-bV2?S&7&2&2"] = {remove: false, newimage: achtzeslotusdrie.src};
imageList["http://batracer.com/-bV2?S&7&3&0"] = {remove: false, newimage: achtzesferrarieen.src};
imageList["http://batracer.com/-bV2?S&7&3&1"] = {remove: false, newimage: achtzesferraritwee.src};
imageList["http://batracer.com/-bV2?S&7&3&2"] = {remove: false, newimage: achtzesferraridrie.src};
imageList["http://batracer.com/-bV2?S&7&3&3"] = {remove: false, newimage: achtzesferarrivier.src};
imageList["http://batracer.com/-bV2?S&7&4&0"] = {remove: false, newimage: achtzesligiereen.src};
imageList["http://batracer.com/-bV2?S&7&4&1"] = {remove: false, newimage: achtzesligiertwee.src};
imageList["http://batracer.com/-bV2?S&7&4&2"] = {remove: false, newimage: achtzesligierdrie.src};
imageList["http://batracer.com/-bV2?S&7&5&0"] = {remove: false, newimage: achtzesbenettoneen.src};
imageList["http://batracer.com/-bV2?S&7&5&1"] = {remove: false, newimage: achtzesbenettontwee.src};
imageList["http://batracer.com/-bV2?S&7&5&2"] = {remove: false, newimage: achtzesbenettondrie.src};
imageList["http://batracer.com/-bV2?S&7&6&0"] = {remove: false, newimage: achtzestyrrelleen.src};
imageList["http://batracer.com/-bV2?S&7&6&1"] = {remove: false, newimage: achtzestyrrelltwee.src};
imageList["http://batracer.com/-bV2?S&7&6&2"] = {remove: false, newimage: achtzestyrrelldrie.src};
imageList["http://batracer.com/-bV2?S&7&7&0"] = {remove: false, newimage: achtzeslolaeen.src};
imageList["http://batracer.com/-bV2?S&7&7&1"] = {remove: false, newimage: achtzeslolatwee.src};
imageList["http://batracer.com/-bV2?S&7&7&2"] = {remove: false, newimage: achtzesloladrie.src};
imageList["http://batracer.com/-bV2?S&7&8&0"] = {remove: false, newimage: achtzesbrabhameen.src};
imageList["http://batracer.com/-bV2?S&7&8&1"] = {remove: false, newimage: achtzesbrabhamtwee.src};
imageList["http://batracer.com/-bV2?S&7&8&2"] = {remove: false, newimage: achtzesbrabhamdrie.src};
imageList["http://batracer.com/-bV2?S&7&9&0"] = {remove: false, newimage: achtzesarrowseen.src};
imageList["http://batracer.com/-bV2?S&7&9&1"] = {remove: false, newimage: achtzesarrowstwee.src};
imageList["http://batracer.com/-bV2?S&7&9&2"] = {remove: false, newimage: achtzesarrowsdrie.src};
imageList["http://batracer.com/-bV2?S&7&10&0"] = {remove: false, newimage: achtzeszakspeedeen.src};
imageList["http://batracer.com/-bV2?S&7&10&1"] = {remove: false, newimage: achtzeszakspeedtwee.src};
imageList["http://batracer.com/-bV2?S&7&10&2"] = {remove: false, newimage: achtzeszakspeeddrie.src};
imageList["http://batracer.com/-bV2?S&7&11&0"] = {remove: false, newimage: achtzesosellaeen.src};
imageList["http://batracer.com/-bV2?S&7&11&1"] = {remove: false, newimage: achtzesosellatwee.src};

imageList["http://batracer.com/-bV2?S&7&11&2"] = {remove: false, newimage: achtzesoselladrie.src};
imageList["http://batracer.com/-bV2?S&7&12&0"] = {remove: false, newimage: achtzesagseen.src};
imageList["http://batracer.com/-bV2?S&7&12&1"] = {remove: false, newimage: achtzesagstwee.src};
imageList["http://batracer.com/-bV2?S&7&12&2"] = {remove: false, newimage: achtzesagsdrie.src};
imageList["http://batracer.com/-bV2?S&7&13&0"] = {remove: false, newimage: achtzesminardieen.src};
imageList["http://batracer.com/-bV2?S&7&13&1"] = {remove: false, newimage: achtzesminarditwee.src};
imageList["http://batracer.com/-bV2?S&7&13&2"] = {remove: false, newimage: achtzesminardidrie.src};
//1997
imageList["http://batracer.com/-bV2?S&12&0&0"] = {remove: false, newimage: negenzevenarrowseen.src};
imageList["http://batracer.com/-bV2?S&12&0&1"] = {remove: false, newimage: negenzevenarrowstwee.src};
imageList["http://batracer.com/-bV2?S&12&0&2"] = {remove: false, newimage: negenzevenarrowsdrie.src};
imageList["http://batracer.com/-bV2?S&12&1&0"] = {remove: false, newimage: negenzevenwilliamseen.src};
imageList["http://batracer.com/-bV2?S&12&1&1"] = {remove: false, newimage: negenzevenwilliamstwee.src};
imageList["http://batracer.com/-bV2?S&12&1&2"] = {remove: false, newimage: negenzevenwilliamsdrie.src};
imageList["http://batracer.com/-bV2?S&12&2&0"] = {remove: false, newimage: negenzevenferrarieen.src};
imageList["http://batracer.com/-bV2?S&12&2&1"] = {remove: false, newimage: negenzevenferraritwee.src};
imageList["http://batracer.com/-bV2?S&12&2&2"] = {remove: false, newimage: negenzevenferraridrie.src};
imageList["http://batracer.com/-bV2?S&12&2&3"] = {remove: false, newimage: negenzevenferrarivier.src};
imageList["http://batracer.com/-bV2?S&12&3&0"] = {remove: false, newimage: negenzevenbenettoneen.src};
imageList["http://batracer.com/-bV2?S&12&3&1"] = {remove: false, newimage: negenzevenbenettontwee.src};
imageList["http://batracer.com/-bV2?S&12&3&2"] = {remove: false, newimage: negenzevenbenettondrie.src};
imageList["http://batracer.com/-bV2?S&12&4&0"] = {remove: false, newimage: negenzevenmclareneen.src};
imageList["http://batracer.com/-bV2?S&12&4&1"] = {remove: false, newimage: negenzevenmclarentwee.src};
imageList["http://batracer.com/-bV2?S&12&4&2"] = {remove: false, newimage: negenzevenmclarendrie.src};
imageList["http://batracer.com/-bV2?S&12&5&0"] = {remove: false, newimage: negenzevenjordaneen.src};
imageList["http://batracer.com/-bV2?S&12&5&1"] = {remove: false, newimage: negenzevenjordantwee.src};
imageList["http://batracer.com/-bV2?S&12&5&2"] = {remove: false, newimage: negenzevenjordandrie.src};
imageList["http://batracer.com/-bV2?S&12&6&0"] = {remove: false, newimage: negenzevenprosteen.src};
imageList["http://batracer.com/-bV2?S&12&6&1"] = {remove: false, newimage: negenzevenprosttwee.src};
imageList["http://batracer.com/-bV2?S&12&6&2"] = {remove: false, newimage: negenzevenprostdrie.src};
imageList["http://batracer.com/-bV2?S&12&7&0"] = {remove: false, newimage: negenzevensaubereen.src};
imageList["http://batracer.com/-bV2?S&12&7&1"] = {remove: false, newimage: negenzevensaubertwee.src};
imageList["http://batracer.com/-bV2?S&12&7&2"] = {remove: false, newimage: negenzevensauberdrie.src};
imageList["http://batracer.com/-bV2?S&12&8&0"] = {remove: false, newimage: negenzeventyrrelleen.src};
imageList["http://batracer.com/-bV2?S&12&8&1"] = {remove: false, newimage: negenzeventyrrelltwee.src};
imageList["http://batracer.com/-bV2?S&12&8&2"] = {remove: false, newimage: negenzeventyrrelldrie.src};
imageList["http://batracer.com/-bV2?S&12&9&0"] = {remove: false, newimage: negenzevenminardieen.src};
imageList["http://batracer.com/-bV2?S&12&9&1"] = {remove: false, newimage: negenzevenminarditwee.src};
imageList["http://batracer.com/-bV2?S&12&9&2"] = {remove: false, newimage: negenzevenminardidrie.src};
imageList["http://batracer.com/-bV2?S&12&10&0"] = {remove: false, newimage: negenzevenstewarteen.src};
imageList["http://batracer.com/-bV2?S&12&10&1"] = {remove: false, newimage: negenzevenstewarttwee.src};
imageList["http://batracer.com/-bV2?S&12&10&2"] = {remove: false, newimage: negenzevenstewartdrie.src};
imageList["http://batracer.com/-bV2?S&12&11&0"] = {remove: false, newimage: negenzevenlolaeen.src};
imageList["http://batracer.com/-bV2?S&12&11&1"] = {remove: false, newimage: negenzevenlolatwee.src};
imageList["http://batracer.com/-bV2?S&12&11&2"] = {remove: false, newimage: negenzevenloladrie.src};
//1999
imageList["http://batracer.com/-bV2?S&13&0&0"] = {remove: false, newimage: negennegenmclareneen.src};
imageList["http://batracer.com/-bV2?S&13&0&1"] = {remove: false, newimage: negennegenmclarentwee.src};
imageList["http://batracer.com/-bV2?S&13&0&2"] = {remove: false, newimage: negennegenmclaremdrie.src};
imageList["http://batracer.com/-bV2?S&13&1&0"] = {remove: false, newimage: negennegenferarrieen.src};
imageList["http://batracer.com/-bV2?S&13&1&1"] = {remove: false, newimage: negennegenferraritwee.src};
imageList["http://batracer.com/-bV2?S&13&1&2"] = {remove: false, newimage: negennegenferraridrie.src};
imageList["http://batracer.com/-bV2?S&13&1&3"] = {remove: false, newimage: negennegenferrarivier.src};
imageList["http://batracer.com/-bV2?S&13&2&0"] = {remove: false, newimage: negennegenwilliamseen.src};
imageList["http://batracer.com/-bV2?S&13&2&1"] = {remove: false, newimage: negennegenwilliamstwee.src};
imageList["http://batracer.com/-bV2?S&13&2&2"] = {remove: false, newimage: negennegenwilliamsdrie.src};
imageList["http://batracer.com/-bV2?S&13&3&0"] = {remove: false, newimage: negennegenjordaneen.src};
imageList["http://batracer.com/-bV2?S&13&3&1"] = {remove: false, newimage: negennegenjordantwee.src};
imageList["http://batracer.com/-bV2?S&13&3&2"] = {remove: false, newimage: negennegenjordandrie.src};
imageList["http://batracer.com/-bV2?S&13&4&0"] = {remove: false, newimage: negennegenbenettoneen.src};
imageList["http://batracer.com/-bV2?S&13&4&1"] = {remove: false, newimage: negennegenbenettontwee.src};
imageList["http://batracer.com/-bV2?S&13&4&2"] = {remove: false, newimage: negennegenbenettondrie.src};
imageList["http://batracer.com/-bV2?S&13&5&0"] = {remove: false, newimage: negennegensaubereen.src};
imageList["http://batracer.com/-bV2?S&13&5&1"] = {remove: false, newimage: negennegensaubertwee.src};
imageList["http://batracer.com/-bV2?S&13&5&2"] = {remove: false, newimage: negennegensauberdrie.src};
imageList["http://batracer.com/-bV2?S&13&6&0"] = {remove: false, newimage: negennegenarrowseen.src};
imageList["http://batracer.com/-bV2?S&13&6&1"] = {remove: false, newimage: negennegenarrowstwee.src};
imageList["http://batracer.com/-bV2?S&13&6&2"] = {remove: false, newimage: negennegenarrowsdrie.src};
imageList["http://batracer.com/-bV2?S&13&7&0"] = {remove: false, newimage: negennegenstewarteen.src};
imageList["http://batracer.com/-bV2?S&13&7&1"] = {remove: false, newimage: negennegenstewarttwee.src};
imageList["http://batracer.com/-bV2?S&13&7&2"] = {remove: false, newimage: negennegenstewartdrie.src};
imageList["http://batracer.com/-bV2?S&13&8&0"] = {remove: false, newimage: negennegenprosteen.src};
imageList["http://batracer.com/-bV2?S&13&8&1"] = {remove: false, newimage: negennegenprosttwee.src};
imageList["http://batracer.com/-bV2?S&13&8&2"] = {remove: false, newimage: negennegenprostdrie.src};
imageList["http://batracer.com/-bV2?S&13&9&0"] = {remove: false, newimage: negennegenminardieen.src};
imageList["http://batracer.com/-bV2?S&13&9&1"] = {remove: false, newimage: negennegenminarditwee.src};
imageList["http://batracer.com/-bV2?S&13&9&2"] = {remove: false, newimage: negennegenminardidrie.src};
imageList["http://batracer.com/-bV2?S&13&10&0"] = {remove: false, newimage: negennegenbareen.src};
imageList["http://batracer.com/-bV2?S&13&10&1"] = {remove: false, newimage: negennegenbartwee.src};
imageList["http://batracer.com/-bV2?S&13&10&2"] = {remove: false, newimage: negennegenbardrie.src};
//2005
imageList["http://batracer.com/-bV2?S&14&0&0"] = {remove: false, newimage: nulvijfferarrieen.src};
imageList["http://batracer.com/-bV2?S&14&0&1"] = {remove: false, newimage: nulvijfferarritwee.src};
imageList["http://batracer.com/-bV2?S&14&0&2"] = {remove: false, newimage: nulvijfferarridrie.src};
imageList["http://batracer.com/-bV2?S&14&0&3"] = {remove: false, newimage: nulvijfferarrivier.src};
imageList["http://batracer.com/-bV2?S&14&1&0"] = {remove: false, newimage: nulvijfbareen.src};
imageList["http://batracer.com/-bV2?S&14&1&1"] = {remove: false, newimage: nulvijfbartwee.src};
imageList["http://batracer.com/-bV2?S&14&1&2"] = {remove: false, newimage: nulvijfbardrie.src};
imageList["http://batracer.com/-bV2?S&14&2&0"] = {remove: false, newimage: nulvijfrenaultnul.src};
imageList["http://batracer.com/-bV2?S&14&2&1"] = {remove: false, newimage: nulvijfrenaulteen.src};
imageList["http://batracer.com/-bV2?S&14&2&2"] = {remove: false, newimage: nulvijfrenaulttwee.src};
imageList["http://batracer.com/-bV2?S&14&3&0"] = {remove: false, newimage: nulvijfwilliamseen.src};
imageList["http://batracer.com/-bV2?S&14&3&1"] = {remove: false, newimage: nulvijfwilliamstwee.src};
imageList["http://batracer.com/-bV2?S&14&3&2"] = {remove: false, newimage: nulvijfwilliamsdrie.src};
imageList["http://batracer.com/-bV2?S&14&4&0"] = {remove: false, newimage: nulvijfmclareneen.src};
imageList["http://batracer.com/-bV2?S&14&4&1"] = {remove: false, newimage: nulvijfmclarentwee.src};
imageList["http://batracer.com/-bV2?S&14&4&2"] = {remove: false, newimage: nulvijfmclarendrie.src};
imageList["http://batracer.com/-bV2?S&14&5&0"] = {remove: false, newimage: nulvijfsaubereen.src};
imageList["http://batracer.com/-bV2?S&14&5&1"] = {remove: false, newimage: nulvijfsaubertwee.src};
imageList["http://batracer.com/-bV2?S&14&5&2"] = {remove: false, newimage: nulvijfsauberdrie.src};
imageList["http://batracer.com/-bV2?S&14&6&0"] = {remove: false, newimage: nulvijfredbulleen.src};
imageList["http://batracer.com/-bV2?S&14&6&1"] = {remove: false, newimage: nulvijfredbulltwee.src};
imageList["http://batracer.com/-bV2?S&14&6&2"] = {remove: false, newimage: nulvijfredbulldrie.src};
imageList["http://batracer.com/-bV2?S&14&7&0"] = {remove: false, newimage: nulvijftoyotaeen.src};
imageList["http://batracer.com/-bV2?S&14&7&1"] = {remove: false, newimage: nulvijftoyotatwee.src};
imageList["http://batracer.com/-bV2?S&14&7&2"] = {remove: false, newimage: nulvijftoyotadrie.src};
imageList["http://batracer.com/-bV2?S&14&8&0"] = {remove: false, newimage: nulvijfjordaneen.src};
imageList["http://batracer.com/-bV2?S&14&8&1"] = {remove: false, newimage: nulvijfjordantwee.src};
imageList["http://batracer.com/-bV2?S&14&8&2"] = {remove: false, newimage: nulvijfjordandrie.src};
imageList["http://batracer.com/-bV2?S&14&9&0"] = {remove: false, newimage: nulvijfminardieen.src};
imageList["http://batracer.com/-bV2?S&14&9&1"] = {remove: false, newimage: nulvijfminarditwee.src};
imageList["http://batracer.com/-bV2?S&14&9&2"] = {remove: false, newimage: nulvijfminardidrie.src};
//2006
imageList["http://batracer.com/-bV2?S&3&0&0"] = {remove: false, newimage: nulzesrenaulteen.src};
imageList["http://batracer.com/-bV2?S&3&0&1"] = {remove: false, newimage: nulzesrenaulttwee.src};
imageList["http://batracer.com/-bV2?S&3&0&2"] = {remove: false, newimage: nulzesrenaultdrie.src};
imageList["http://batracer.com/-bV2?S&3&0&3"] = {remove: false, newimage: nulzesrenaultvier.src};
imageList["http://batracer.com/-bV2?S&3&1&0"] = {remove: false, newimage: nulzesmclareneen.src};
imageList["http://batracer.com/-bV2?S&3&1&1"] = {remove: false, newimage: nulzesmclarentwee.src};
imageList["http://batracer.com/-bV2?S&3&1&2"] = {remove: false, newimage: nulzesmclarendrie.src};
imageList["http://batracer.com/-bV2?S&3&1&3"] = {remove: false, newimage: nulzesmclarenvier.src};
//2007
imageList["http://batracer.com/-bV2?S&9&0&0"] = {remove: false, newimage: nulzevenmclareneen.src};
imageList["http://batracer.com/-bV2?S&9&0&1"] = {remove: false, newimage: nulzevenmclarentwee.src};
imageList["http://batracer.com/-bV2?S&9&0&2"] = {remove: false, newimage: nulzevenmclarendrie.src};
imageList["http://batracer.com/-bV2?S&9&1&0"] = {remove: false, newimage: nulzevenrenaulteen.src};
imageList["http://batracer.com/-bV2?S&9&1&1"] = {remove: false, newimage: nulzevenrenaulttwee.src};
imageList["http://batracer.com/-bV2?S&9&1&2"] = {remove: false, newimage: nulzevenrenaultdrie.src};
imageList["http://batracer.com/-bV2?S&9&2&0"] = {remove: false, newimage: nulzevenferrarieen.src};
imageList["http://batracer.com/-bV2?S&9&2&1"] = {remove: false, newimage: nulzevenferraritwee.src};
imageList["http://batracer.com/-bV2?S&9&2&2"] = {remove: false, newimage: nulzevenferraridrie.src};
imageList["http://batracer.com/-bV2?S&9&2&3"] = {remove: false, newimage: nulzevenferrarivier.src};
imageList["http://batracer.com/-bV2?S&9&3&0"] = {remove: false, newimage: nulzevenhondaeen.src};
imageList["http://batracer.com/-bV2?S&9&4&0"] = {remove: false, newimage: nulzevenbmween.src};
imageList["http://batracer.com/-bV2?S&9&4&1"] = {remove: false, newimage: nulzevenbmwtwee.src};
imageList["http://batracer.com/-bV2?S&9&4&2"] = {remove: false, newimage: nulzevenbmwdrie.src};
imageList["http://batracer.com/-bV2?S&9&5&0"] = {remove: false, newimage: nulzeventoyotaeen.src};
imageList["http://batracer.com/-bV2?S&9&5&1"] = {remove: false, newimage: nulzeventoyotatwee.src};
imageList["http://batracer.com/-bV2?S&9&5&2"] = {remove: false, newimage: nulzeventoyotadrie.src};
imageList["http://batracer.com/-bV2?S&9&6&0"] = {remove: false, newimage: nulzevenrbreen.src};
imageList["http://batracer.com/-bV2?S&9&6&1"] = {remove: false, newimage: nulzevenrbrtwee.src};
imageList["http://batracer.com/-bV2?S&9&6&2"] = {remove: false, newimage: nulzevenrbrdrie.src};
imageList["http://batracer.com/-bV2?S&9&7&0"] = {remove: false, newimage: nulzevenwilliamseen.src};
imageList["http://batracer.com/-bV2?S&9&7&1"] = {remove: false, newimage: nulzevenwilliamstwee.src};
imageList["http://batracer.com/-bV2?S&9&7&2"] = {remove: false, newimage: nulzevenwilliamsdrie.src};
imageList["http://batracer.com/-bV2?S&9&8&0"] = {remove: false, newimage: nulzevenstreen.src};
imageList["http://batracer.com/-bV2?S&9&8&1"] = {remove: false, newimage: nulzevenstrtwee.src};
imageList["http://batracer.com/-bV2?S&9&8&2"] = {remove: false, newimage: nulzevenstrdrie.src};
imageList["http://batracer.com/-bV2?S&9&9&0"] = {remove: false, newimage: nulzevenspykereen.src};
imageList["http://batracer.com/-bV2?S&9&9&1"] = {remove: false, newimage: nulzevenspykertwee.src};
imageList["http://batracer.com/-bV2?S&9&9&2"] = {remove: false, newimage: nulzevenspykerdrie.src};
imageList["http://batracer.com/-bV2?S&9&10&0"] = {remove: false, newimage: nulzevensaeen.src};
imageList["http://batracer.com/-bV2?S&9&10&1"] = {remove: false, newimage: nulzevensatwee.src};
imageList["http://batracer.com/-bV2?S&9&10&2"] = {remove: false, newimage: nulzevensadrie.src};
//2008
imageList["http://batracer.com/-bV2?S&11&0&0"] = {remove: false, newimage: nulachtferrarieen.src};
imageList["http://batracer.com/-bV2?S&11&0&1"] = {remove: false, newimage: nulachtferraritwee.src};
imageList["http://batracer.com/-bV2?S&11&0&2"] = {remove: false, newimage: nulachtferraridrie.src};
imageList["http://batracer.com/-bV2?S&11&0&3"] = {remove: false, newimage: nulachtferrarivier.src};
imageList["http://batracer.com/-bV2?S&11&1&0"] = {remove: false, newimage: nulachtbmween.src};
imageList["http://batracer.com/-bV2?S&11&1&1"] = {remove: false, newimage: nulachtbmwtwee.src};
imageList["http://batracer.com/-bV2?S&11&1&2"] = {remove: false, newimage: nulachtbmwdrie.src};
imageList["http://batracer.com/-bV2?S&11&2&0"] = {remove: false, newimage: nulachtrenaulteen.src};
imageList["http://batracer.com/-bV2?S&11&2&1"] = {remove: false, newimage: nulachtrenaulttwee.src};
imageList["http://batracer.com/-bV2?S&11&2&2"] = {remove: false, newimage: nulachtrenaultdrie.src};
imageList["http://batracer.com/-bV2?S&11&3&0"] = {remove: false, newimage: nulachtwilliamseen.src};
imageList["http://batracer.com/-bV2?S&11&3&1"] = {remove: false, newimage: nulachtwilliamstwee.src};
imageList["http://batracer.com/-bV2?S&11&3&2"] = {remove: false, newimage: nulachtwilliamsdrie.src};
imageList["http://batracer.com/-bV2?S&11&4&0"] = {remove: false, newimage: nulachtrbreen.src};
imageList["http://batracer.com/-bV2?S&11&4&1"] = {remove: false, newimage: nulachtrbrtwee.src};
imageList["http://batracer.com/-bV2?S&11&4&2"] = {remove: false, newimage: nulachtrbrdrie.src};
imageList["http://batracer.com/-bV2?S&11&5&0"] = {remove: false, newimage: nulachttoyotaeen.src};
imageList["http://batracer.com/-bV2?S&11&5&1"] = {remove: false, newimage: nulachttoyotatwee.src};
imageList["http://batracer.com/-bV2?S&11&5&2"] = {remove: false, newimage: nulachttoyotadrie.src};
imageList["http://batracer.com/-bV2?S&11&6&0"] = {remove: false, newimage: nulachtstreen.src};
imageList["http://batracer.com/-bV2?S&11&6&1"] = {remove: false, newimage: nulachtstrtwee.src};
imageList["http://batracer.com/-bV2?S&11&6&2"] = {remove: false, newimage: nulachtstrdrie.src};
imageList["http://batracer.com/-bV2?S&11&7&0"] = {remove: false, newimage: nulachthondaeen.src};
imageList["http://batracer.com/-bV2?S&11&7&1"] = {remove: false, newimage: nulachthondatwee.src};
imageList["http://batracer.com/-bV2?S&11&7&2"] = {remove: false, newimage: nulachthondadrie.src};
imageList["http://batracer.com/-bV2?S&11&8&0"] = {remove: false, newimage: nulachtsaeen.src};
imageList["http://batracer.com/-bV2?S&11&8&1"] = {remove: false, newimage: nulachtsatwee.src};
imageList["http://batracer.com/-bV2?S&11&8&2"] = {remove: false, newimage: nulachtsadrie.src};
imageList["http://batracer.com/-bV2?S&11&9&0"] = {remove: false, newimage: nulachtfieen.src};
imageList["http://batracer.com/-bV2?S&11&9&1"] = {remove: false, newimage: nulachtfitwee.src};
imageList["http://batracer.com/-bV2?S&11&9&2"] = {remove: false, newimage: nulachtfidrie.src};
imageList["http://batracer.com/-bV2?S&11&10&0"] = {remove: false, newimage: nulachtmclareneen.src};
imageList["http://batracer.com/-bV2?S&11&10&1"] = {remove: false, newimage: nulachtmclarentwee.src};
imageList["http://batracer.com/-bV2?S&11&10&2"] = {remove: false, newimage: nulachtmclarendrie.src};
//2009
imageList["http://batracer.com/-bV2?S&18&0&0"] = {remove: false, newimage: nulnegenferrarieen.src};
imageList["http://batracer.com/-bV2?S&18&0&1"] = {remove: false, newimage: nulnegenferraritwee.src};
imageList["http://batracer.com/-bV2?S&18&0&2"] = {remove: false, newimage: nulnegenferraridrie.src};
imageList["http://batracer.com/-bV2?S&18&0&3"] = {remove: false, newimage: nulnegenferrarivier.src};
imageList["http://batracer.com/-bV2?S&18&1&0"] = {remove: false, newimage: nulnegenmclareneen.src};
imageList["http://batracer.com/-bV2?S&18&1&1"] = {remove: false, newimage: nulnegenmclarentwee.src};
imageList["http://batracer.com/-bV2?S&18&1&2"] = {remove: false, newimage: nulnegenmclarendrie.src};
imageList["http://batracer.com/-bV2?S&18&2&0"] = {remove: false, newimage: nulnegenbmween.src};
imageList["http://batracer.com/-bV2?S&18&2&1"] = {remove: false, newimage: nulnegenbmwtwee.src};
imageList["http://batracer.com/-bV2?S&18&2&2"] = {remove: false, newimage: nulnegenbmwdrie.src};
imageList["http://batracer.com/-bV2?S&18&3&0"] = {remove: false, newimage: nulnegenrenaulteen.src};
imageList["http://batracer.com/-bV2?S&18&3&1"] = {remove: false, newimage: nulnegenrenaulttwee.src};
imageList["http://batracer.com/-bV2?S&18&3&2"] = {remove: false, newimage: nulnegenrenaultdrie.src};
imageList["http://batracer.com/-bV2?S&18&4&0"] = {remove: false, newimage: nulnegentoyotaeen.src};
imageList["http://batracer.com/-bV2?S&18&4&1"] = {remove: false, newimage: nulnegentoyotatwee.src};
imageList["http://batracer.com/-bV2?S&18&4&2"] = {remove: false, newimage: nulnegentoyotadrie.src};
imageList["http://batracer.com/-bV2?S&18&5&0"] = {remove: false, newimage: nulnegenstreen.src};
imageList["http://batracer.com/-bV2?S&18&5&1"] = {remove: false, newimage: nulnegenstrtwee.src};
imageList["http://batracer.com/-bV2?S&18&5&2"] = {remove: false, newimage: nulnegenstrdrie.src};
imageList["http://batracer.com/-bV2?S&18&6&0"] = {remove: false, newimage: nulnegenrbreen.src};
imageList["http://batracer.com/-bV2?S&18&6&1"] = {remove: false, newimage: nulnegenrbrtwee.src};
imageList["http://batracer.com/-bV2?S&18&6&2"] = {remove: false, newimage: nulnegenrbrdrie.src};
imageList["http://batracer.com/-bV2?S&18&7&0"] = {remove: false, newimage: nulnegenwilliamseen.src};
imageList["http://batracer.com/-bV2?S&18&7&1"] = {remove: false, newimage: nulnegenwilliamstwee.src};
imageList["http://batracer.com/-bV2?S&18&7&2"] = {remove: false, newimage: nulnegenwilliamsdrie.src};
imageList["http://batracer.com/-bV2?S&18&8&0"] = {remove: false, newimage: nulnegenfieen.src};
imageList["http://batracer.com/-bV2?S&18&8&1"] = {remove: false, newimage: nulnegenfitwee.src};
imageList["http://batracer.com/-bV2?S&18&8&2"] = {remove: false, newimage: nulnegenfidrie.src};
imageList["http://batracer.com/-bV2?S&18&9&0"] = {remove: false, newimage: nulnegenbrawneen.src};
imageList["http://batracer.com/-bV2?S&18&9&1"] = {remove: false, newimage: nulnegenbrawntwee.src};
imageList["http://batracer.com/-bV2?S&18&9&2"] = {remove: false, newimage: nulnegenbrawndrie.src};
//2010
imageList["http://batracer.com/-bV2?S&24&0&0"] = {remove: false, newimage: nultienmclareneen.src};
imageList["http://batracer.com/-bV2?S&24&0&1"] = {remove: false, newimage: nultienmclarentwee.src};
imageList["http://batracer.com/-bV2?S&24&0&2"] = {remove: false, newimage: nultienmclarendrie.src};
imageList["http://batracer.com/-bV2?S&24&1&0"] = {remove: false, newimage: nultienmercedeseen.src};
imageList["http://batracer.com/-bV2?S&24&1&1"] = {remove: false, newimage: nultienmercedestwee.src};
imageList["http://batracer.com/-bV2?S&24&1&2"] = {remove: false, newimage: nultienmercedesdrie.src};
imageList["http://batracer.com/-bV2?S&24&2&0"] = {remove: false, newimage: nultienrbreen.src};
imageList["http://batracer.com/-bV2?S&24&2&1"] = {remove: false, newimage: nultienrbrtwee.src};
imageList["http://batracer.com/-bV2?S&24&2&2"] = {remove: false, newimage: nultienrbrdrie.src};
imageList["http://batracer.com/-bV2?S&24&3&0"] = {remove: false, newimage: nultienferrarieen.src};
imageList["http://batracer.com/-bV2?S&24&3&1"] = {remove: false, newimage: nultienferraritwee.src};
imageList["http://batracer.com/-bV2?S&24&3&2"] = {remove: false, newimage: nultienferraridrie.src};
imageList["http://batracer.com/-bV2?S&24&3&3"] = {remove: false, newimage: nultienferrarivier.src};
imageList["http://batracer.com/-bV2?S&24&4&0"] = {remove: false, newimage: nultienwilliamseen.src};
imageList["http://batracer.com/-bV2?S&24&4&1"] = {remove: false, newimage: nultienwilliamstwee.src};
imageList["http://batracer.com/-bV2?S&24&4&2"] = {remove: false, newimage: nultienwilliamsdrie.src};
imageList["http://batracer.com/-bV2?S&24&5&0"] = {remove: false, newimage: nultienrenaulteen.src};
imageList["http://batracer.com/-bV2?S&24&5&1"] = {remove: false, newimage: nultienrenaulttwee.src};
imageList["http://batracer.com/-bV2?S&24&5&2"] = {remove: false, newimage: nultienrenaultdrie.src};
imageList["http://batracer.com/-bV2?S&24&6&0"] = {remove: false, newimage: nultienfieen.src};
imageList["http://batracer.com/-bV2?S&24&6&1"] = {remove: false, newimage: nultienfitwee.src};
imageList["http://batracer.com/-bV2?S&24&6&2"] = {remove: false, newimage: nultienfidrie.src};
imageList["http://batracer.com/-bV2?S&24&7&0"] = {remove: false, newimage: nultienstreen.src};
imageList["http://batracer.com/-bV2?S&24&7&1"] = {remove: false, newimage: nultienstrtwee.src};
imageList["http://batracer.com/-bV2?S&24&7&2"] = {remove: false, newimage: nultienstrdrie.src};
imageList["http://batracer.com/-bV2?S&24&8&0"] = {remove: false, newimage: nultienlotuseen.src};
imageList["http://batracer.com/-bV2?S&24&8&1"] = {remove: false, newimage: nultienlotustwee.src};
imageList["http://batracer.com/-bV2?S&24&8&2"] = {remove: false, newimage: nultienlotusdrie.src};
imageList["http://batracer.com/-bV2?S&24&9&0"] = {remove: false, newimage: nultienhrteen.src};
imageList["http://batracer.com/-bV2?S&24&9&1"] = {remove: false, newimage: nultienhrttwee.src};
imageList["http://batracer.com/-bV2?S&24&9&2"] = {remove: false, newimage: nultienhrtdrie.src};
imageList["http://batracer.com/-bV2?S&24&10&0"] = {remove: false, newimage: nultiensaubereen.src};
imageList["http://batracer.com/-bV2?S&24&10&1"] = {remove: false, newimage: nultiensaubertwee.src};
imageList["http://batracer.com/-bV2?S&24&10&2"] = {remove: false, newimage: nultiensauberdrie.src};
imageList["http://batracer.com/-bV2?S&24&11&0"] = {remove: false, newimage: nultienvirgineen.src};
imageList["http://batracer.com/-bV2?S&24&11&1"] = {remove: false, newimage: nultienvirgintwee.src};
imageList["http://batracer.com/-bV2?S&24&11&2"] = {remove: false, newimage: nultienvirgindrie.src};
//2011
imageList["http://batracer.com/-bV2?S&28&0&0"] = {remove: false, newimage: eeneenrbreen.src};
imageList["http://batracer.com/-bV2?S&28&0&1"] = {remove: false, newimage: eeneenrbrtwee.src};
imageList["http://batracer.com/-bV2?S&28&0&2"] = {remove: false, newimage: eeneenrbrdrie.src};
imageList["http://batracer.com/-bV2?S&28&1&0"] = {remove: false, newimage: eeneenmclareneen.src};
imageList["http://batracer.com/-bV2?S&28&1&1"] = {remove: false, newimage: eeneenmclarentwee.src};
imageList["http://batracer.com/-bV2?S&28&1&2"] = {remove: false, newimage: eeneenmclarendrie.src};
imageList["http://batracer.com/-bV2?S&28&2&0"] = {remove: false, newimage: eeneenferrarieen.src};
imageList["http://batracer.com/-bV2?S&28&2&1"] = {remove: false, newimage: eeneenferraritwee.src};
imageList["http://batracer.com/-bV2?S&28&2&2"] = {remove: false, newimage: eeneenferraridrie.src};
imageList["http://batracer.com/-bV2?S&28&2&3"] = {remove: false, newimage: eeneenferrarivier.src};
imageList["http://batracer.com/-bV2?S&28&3&0"] = {remove: false, newimage: eeneenmercedeseen.src};
imageList["http://batracer.com/-bV2?S&28&3&1"] = {remove: false, newimage: eeneenmercedestwee.src};
imageList["http://batracer.com/-bV2?S&28&3&2"] = {remove: false, newimage: eeneenmercedesdrie.src};
imageList["http://batracer.com/-bV2?S&28&4&0"] = {remove: false, newimage: eeneenrenaulteen.src};
imageList["http://batracer.com/-bV2?S&28&4&1"] = {remove: false, newimage: eeneenrenaulttwee.src};
imageList["http://batracer.com/-bV2?S&28&4&2"] = {remove: false, newimage: eeneenrenaultdrie.src};
imageList["http://batracer.com/-bV2?S&28&5&0"] = {remove: false, newimage: eeneenwilliamseen.src};
imageList["http://batracer.com/-bV2?S&28&5&1"] = {remove: false, newimage: eeneenwilliamstwee.src};
imageList["http://batracer.com/-bV2?S&28&5&2"] = {remove: false, newimage: eeneenwilliamsdrie.src};
imageList["http://batracer.com/-bV2?S&28&6&0"] = {remove: false, newimage: eeneenfieen.src};
imageList["http://batracer.com/-bV2?S&28&6&1"] = {remove: false, newimage: eeneenfitwee.src};
imageList["http://batracer.com/-bV2?S&28&6&2"] = {remove: false, newimage: eeneenfidrie.src};
imageList["http://batracer.com/-bV2?S&28&7&0"] = {remove: false, newimage: eeneensaubereen.src};
imageList["http://batracer.com/-bV2?S&28&7&1"] = {remove: false, newimage: eeneensaubertwee.src};
imageList["http://batracer.com/-bV2?S&28&7&2"] = {remove: false, newimage: eeneensauberdrie.src};
imageList["http://batracer.com/-bV2?S&28&8&0"] = {remove: false, newimage: eeneenstreen.src};
imageList["http://batracer.com/-bV2?S&28&8&1"] = {remove: false, newimage: eeneenstrtwee.src};
imageList["http://batracer.com/-bV2?S&28&8&2"] = {remove: false, newimage: eeneenstrdrie.src};
imageList["http://batracer.com/-bV2?S&28&9&0"] = {remove: false, newimage: eeneenlotuseen.src};
imageList["http://batracer.com/-bV2?S&28&9&1"] = {remove: false, newimage: eeneenlotustwee.src};
imageList["http://batracer.com/-bV2?S&28&9&2"] = {remove: false, newimage: eeneenlotusdrie.src};
imageList["http://batracer.com/-bV2?S&28&10&0"] = {remove: false, newimage: eeneenhrteen.src};
imageList["http://batracer.com/-bV2?S&28&10&1"] = {remove: false, newimage: eeneenhrttwee.src};
imageList["http://batracer.com/-bV2?S&28&10&2"] = {remove: false, newimage: eeneenhrtdrie.src};
imageList["http://batracer.com/-bV2?S&28&11&0"] = {remove: false, newimage: eeneenvirgineen.src};
imageList["http://batracer.com/-bV2?S&28&11&1"] = {remove: false, newimage: eeneenvirgintwee.src};
imageList["http://batracer.com/-bV2?S&28&11&2"] = {remove: false, newimage: eeneenvirgindrie.src};
//2011-B
imageList["http://batracer.com/-bV2?S&29&0&0"] = {remove: false, newimage: eeneenrbreen.src};
imageList["http://batracer.com/-bV2?S&29&0&1"] = {remove: false, newimage: eeneenrbrtwee.src};
imageList["http://batracer.com/-bV2?S&29&0&2"] = {remove: false, newimage: eeneenrbrdrie.src};
imageList["http://batracer.com/-bV2?S&29&1&0"] = {remove: false, newimage: eeneenmclareneen.src};
imageList["http://batracer.com/-bV2?S&29&1&1"] = {remove: false, newimage: eeneenmclarentwee.src};
imageList["http://batracer.com/-bV2?S&29&1&2"] = {remove: false, newimage: eeneenmclarendrie.src};
imageList["http://batracer.com/-bV2?S&29&2&0"] = {remove: false, newimage: eeneenferrarieen.src};
imageList["http://batracer.com/-bV2?S&29&2&1"] = {remove: false, newimage: eeneenferraritwee.src};
imageList["http://batracer.com/-bV2?S&29&2&2"] = {remove: false, newimage: eeneenferraridrie.src};
imageList["http://batracer.com/-bV2?S&29&2&3"] = {remove: false, newimage: eeneenferrarivier.src};
imageList["http://batracer.com/-bV2?S&29&3&0"] = {remove: false, newimage: eeneenmercedeseen.src};
imageList["http://batracer.com/-bV2?S&29&3&1"] = {remove: false, newimage: eeneenmercedestwee.src};
imageList["http://batracer.com/-bV2?S&29&3&2"] = {remove: false, newimage: eeneenmercedesdrie.src};
imageList["http://batracer.com/-bV2?S&29&4&0"] = {remove: false, newimage: eeneenrenaulteen.src};
imageList["http://batracer.com/-bV2?S&29&4&1"] = {remove: false, newimage: eeneenrenaulttwee.src};
imageList["http://batracer.com/-bV2?S&29&4&2"] = {remove: false, newimage: eeneenrenaultdrie.src};
imageList["http://batracer.com/-bV2?S&29&5&0"] = {remove: false, newimage: eeneenwilliamseen.src};
imageList["http://batracer.com/-bV2?S&29&5&1"] = {remove: false, newimage: eeneenwilliamstwee.src};
imageList["http://batracer.com/-bV2?S&29&5&2"] = {remove: false, newimage: eeneenwilliamsdrie.src};
imageList["http://batracer.com/-bV2?S&29&6&0"] = {remove: false, newimage: eeneenfieen.src};
imageList["http://batracer.com/-bV2?S&29&6&1"] = {remove: false, newimage: eeneenfitwee.src};
imageList["http://batracer.com/-bV2?S&29&6&2"] = {remove: false, newimage: eeneenfidrie.src};
imageList["http://batracer.com/-bV2?S&29&7&0"] = {remove: false, newimage: eeneensaubereen.src};
imageList["http://batracer.com/-bV2?S&29&7&1"] = {remove: false, newimage: eeneensaubertwee.src};
imageList["http://batracer.com/-bV2?S&29&7&2"] = {remove: false, newimage: eeneensauberdrie.src};
imageList["http://batracer.com/-bV2?S&29&8&0"] = {remove: false, newimage: eeneenstreen.src};
imageList["http://batracer.com/-bV2?S&29&8&1"] = {remove: false, newimage: eeneenstrtwee.src};
imageList["http://batracer.com/-bV2?S&29&8&2"] = {remove: false, newimage: eeneenstrdrie.src};
imageList["http://batracer.com/-bV2?S&29&9&0"] = {remove: false, newimage: eeneenlotuseen.src};
imageList["http://batracer.com/-bV2?S&29&9&1"] = {remove: false, newimage: eeneenlotustwee.src};
imageList["http://batracer.com/-bV2?S&29&9&2"] = {remove: false, newimage: eeneenlotusdrie.src};
imageList["http://batracer.com/-bV2?S&29&10&0"] = {remove: false, newimage: eeneenhrteen.src};
imageList["http://batracer.com/-bV2?S&29&10&1"] = {remove: false, newimage: eeneenhrttwee.src};
imageList["http://batracer.com/-bV2?S&29&10&2"] = {remove: false, newimage: eeneenhrtdrie.src};
imageList["http://batracer.com/-bV2?S&29&11&0"] = {remove: false, newimage: eeneenvirgineen.src};
imageList["http://batracer.com/-bV2?S&29&11&1"] = {remove: false, newimage: eeneenvirgintwee.src};
imageList["http://batracer.com/-bV2?S&29&11&2"] = {remove: false, newimage: eeneenvirgindrie.src};
//Logos
imageList["http://batracer.com/-bL?0"] = {remove: false, newimage: ferrari.src};
imageList["http://batracer.com/-bL?1"] = {remove: false, newimage: bmwa.src};
imageList["http://batracer.com/-bL?2"] = {remove: false, newimage: mercedes.src};
imageList["http://batracer.com/-bL?3"] = {remove: false, newimage: renault.src};
imageList["http://batracer.com/-bL?4"] = {remove: false, newimage: honda.src};
imageList["http://batracer.com/-bL?5"] = {remove: false, newimage: cosworth.src};
imageList["http://batracer.com/-bL?6"] = {remove: false, newimage: newminardi.src};
imageList["http://batracer.com/-bL?7"] = {remove: false, newimage: toyota.src};
imageList["http://batracer.com/-bL?8"] = {remove: false, newimage: bridgestone.src};
imageList["http://batracer.com/-bL?9"] = {remove: false, newimage: michelin.src};
imageList["http://batracer.com/-bL?10"] = {remove: false, newimage: avon.src};
imageList["http://batracer.com/-bL?11"] = {remove: false, newimage: yokohama.src};
imageList["http://batracer.com/-bL?12"] = {remove: false, newimage: audi.src};
imageList["http://batracer.com/-bL?13"] = {remove: false, newimage: ford.src};
imageList["http://batracer.com/-bL?14"] = {remove: false, newimage: kawasaki.src};
imageList["http://batracer.com/-bL?15"] = {remove: false, newimage: mgaa.src};
imageList["http://batracer.com/-bL?16"] = {remove: false, newimage: rover.src};
imageList["http://batracer.com/-bL?17"] = {remove: false, newimage: suzuki.src};
imageList["http://batracer.com/-bL?18"] = {remove: false, newimage: bfgoodrich.src};
imageList["http://batracer.com/-bL?19"] = {remove: false, newimage: alfaromeo.src};
imageList["http://batracer.com/-bL?20"] = {remove: false, newimage: peugeot.src};
imageList["http://batracer.com/-bL?21"] = {remove: false, newimage: proton.src};
imageList["http://batracer.com/-bL?22"] = {remove: false, newimage: vauxhall.src};
imageList["http://batracer.com/-bL?23"] = {remove: false, newimage: sauber.src};
imageList["http://batracer.com/-bL?24"] = {remove: false, newimage: jaguar.src};
imageList["http://batracer.com/-bL?25"] = {remove: false, newimage: newwilliams.src};
imageList["http://batracer.com/-bL?26"] = {remove: false, newimage: mclaren.src};
imageList["http://batracer.com/-bL?27"] = {remove: false, newimage: arrows.src};
imageList["http://batracer.com/-bL?28"] = {remove: false, newimage: bara.src};
imageList["http://batracer.com/-bL?29"] = {remove: false, newimage: jordan.src};
imageList["http://batracer.com/-bL?30"] = {remove: false, newimage: caterham.src};
imageList["http://batracer.com/-bL?31"] = {remove: false, newimage: westerfield.src};
imageList["http://batracer.com/-bL?32"] = {remove: false, newimage: daxa.src};
imageList["http://batracer.com/-bL?33"] = {remove: false, newimage: tiger.src};
imageList["http://batracer.com/-bL?34"] = {remove: false, newimage: rawengineering.src};
imageList["http://batracer.com/-bL?35"] = {remove: false, newimage: locost.src};
imageList["http://batracer.com/-bL?36"] = {remove: false, newimage: birkin.src};
imageList["http://batracer.com/-bL?37"] = {remove: false, newimage: donkervoort.src};
imageList["http://batracer.com/-bL?38"] = {remove: false, newimage: midland.src};
imageList["http://batracer.com/-bL?39"] = {remove: false, newimage: redbull.src};
imageList["http://batracer.com/-bL?40"] = {remove: false, newimage: superaguri.src};
imageList["http://batracer.com/-bL?41"] = {remove: false, newimage: midlandf.src};
imageList["http://batracer.com/-bL?42"] = {remove: false, newimage: tororosso.src};
imageList["http://batracer.com/-bL?43"] = {remove: false, newimage: newcosworth.src};
imageList["http://batracer.com/-bL?44"] = {remove: false, newimage: goodyear.src};
imageList["http://batracer.com/-bL?45"] = {remove: false, newimage: firestone.src};
imageList["http://batracer.com/-bL?46"] = {remove: false, newimage: lola.src};
imageList["http://batracer.com/-bL?47"] = {remove: false, newimage: penske.src};
imageList["http://batracer.com/-bL?48"] = {remove: false, newimage: reynard.src};
imageList["http://batracer.com/-bL?49"] = {remove: false, newimage: cooper.src};
imageList["http://batracer.com/-bL?50"] = {remove: false, newimage: zytek.src};
imageList["http://batracer.com/-bL?51"] = {remove: false, newimage: holden.src};
imageList["http://batracer.com/-bL?52"] = {remove: false, newimage: dunlop.src};
imageList["http://batracer.com/-bL?53"] = {remove: false, newimage: pirelli.src};
imageList["http://batracer.com/-bL?54"] = {remove: false, newimage: williams.src};
imageList["http://batracer.com/-bL?55"] = {remove: false, newimage: lotus.src};
imageList["http://batracer.com/-bL?56"] = {remove: false, newimage: ligier.src};
imageList["http://batracer.com/-bL?57"] = {remove: false, newimage: benetton.src};
imageList["http://batracer.com/-bL?58"] = {remove: false, newimage: tyrell.src};
imageList["http://batracer.com/-bL?59"] = {remove: false, newimage: brabham.src};
imageList["http://batracer.com/-bL?60"] = {remove: false, newimage: zakspeed.src};
imageList["http://batracer.com/-bL?61"] = {remove: false, newimage: osella.src};
imageList["http://batracer.com/-bL?62"] = {remove: false, newimage: agsa.src};
imageList["http://batracer.com/-bL?63"] = {remove: false, newimage: minardi.src};
imageList["http://batracer.com/-bL?64"] = {remove: false, newimage: taga.src};
imageList["http://batracer.com/-bL?65"] = {remove: false, newimage: motorimoderni.src};
imageList["http://batracer.com/-bL?66"] = {remove: false, newimage: porsche.src};
imageList["http://batracer.com/-bL?67"] = {remove: false, newimage: tvra.src};
imageList["http://batracer.com/-bL?68"] = {remove: false, newimage: astonmartin.src};
imageList["http://batracer.com/-bL?69"] = {remove: false, newimage: chevrolet.src};
imageList["http://batracer.com/-bL?70"] = {remove: false, newimage: generalm.src};
imageList["http://batracer.com/-bL?71"] = {remove: false, newimage: dodge.src};
imageList["http://batracer.com/-bL?72"] = {remove: false, newimage: lamborghini.src};
imageList["http://batracer.com/-bL?73"] = {remove: false, newimage: welter.src};
imageList["http://batracer.com/-bL?74"] = {remove: false, newimage: courage.src};
imageList["http://batracer.com/-bL?75"] = {remove: false, newimage: pilbeam.src};
imageList["http://batracer.com/-bL?76"] = {remove: false, newimage: dallara.src};
imageList["http://batracer.com/-bL?77"] = {remove: false, newimage: lister.src};
imageList["http://batracer.com/-bL?78"] = {remove: false, newimage: pescarolo.src};
imageList["http://batracer.com/-bL?79"] = {remove: false, newimage: danos.src};
imageList["http://batracer.com/-bL?80"] = {remove: false, newimage: bentley.src};
imageList["http://batracer.com/-bL?81"] = {remove: false, newimage: judd.src};
imageList["http://batracer.com/-bL?82"] = {remove: false, newimage: mugen.src};
imageList["http://batracer.com/-bL?83"] = {remove: false, newimage: mopar.src};
imageList["http://batracer.com/-bL?84"] = {remove: false, newimage: aera.src};
imageList["http://batracer.com/-bL?85"] = {remove: false, newimage: mazda.src};
imageList["http://batracer.com/-bL?86"] = {remove: false, newimage: kumho.src};
imageList["http://batracer.com/-bL?87"] = {remove: false, newimage: newnewwilliams.src};
imageList["http://batracer.com/-bL?88"] = {remove: false, newimage: spyker.src};
imageList["http://batracer.com/-bL?89"] = {remove: false, newimage: forceindia.src};
imageList["http://batracer.com/-bL?90"] = {remove: false, newimage: yamaha.src};
imageList["http://batracer.com/-bL?91"] = {remove: false, newimage: hart.src};
imageList["http://batracer.com/-bL?92"] = {remove: false, newimage: supertec.src};
imageList["http://batracer.com/-bL?93"] = {remove: false, newimage: playlife.src};
imageList["http://batracer.com/-bL?94"] = {remove: false, newimage: prost.src};
imageList["http://batracer.com/-bL?95"] = {remove: false, newimage: stewart.src};
imageList["http://batracer.com/-bL?96"] = {remove: false, newimage: brawn.src};
imageList["http://batracer.com/-bL?97"] = {remove: false, newimage: mygale.src};
imageList["http://batracer.com/-bL?98"] = {remove: false, newimage: slca.src};
imageList["http://batracer.com/-bL?99"] = {remove: false, newimage: arttech.src};
imageList["http://batracer.com/-bL?100"] = {remove: false, newimage: volkswagen.src};
imageList["http://batracer.com/-bL?101"] = {remove: false, newimage: fiat.src};
imageList["http://batracer.com/-bL?102"] = {remove: false, newimage: mercury.src};
imageList["http://batracer.com/-bL?103"] = {remove: false, newimage: amca.src};
imageList["http://batracer.com/-bL?104"] = {remove: false, newimage: plymouth.src};
imageList["http://batracer.com/-bL?105"] = {remove: false, newimage: pontiac.src};
imageList["http://batracer.com/-bL?106"] = {remove: false, newimage: maserati.src};
imageList["http://batracer.com/-bL?107"] = {remove: false, newimage: saleen.src};
imageList["http://batracer.com/-bL?108"] = {remove: false, newimage: mosler.src};
imageList["http://batracer.com/-bL?109"] = {remove: false, newimage: newlotus.src};
imageList["http://batracer.com/-bL?110"] = {remove: false, newimage: hrta.src};
imageList["http://batracer.com/-bL?111"] = {remove: false, newimage: virgin.src};
imageList["http://batracer.com/-bL?112"] = {remove: false, newimage: newrenault.src};

var images = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i = 0; i < images.snapshotLength; i++) { 
var img = images.snapshotItem(i); 
if (imageList[img.src]) { 
img.src = imageList[img.src].newimage; 
} 
}