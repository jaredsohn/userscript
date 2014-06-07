// ==UserScript==
// @name            Craigslist Enhancer
// @namespace       lecapitan
// @description     Let's you search multiple cities at the same time and presents results in a clean and concise fashion.
// @include         http://*.craigslist.org/*
// @resource        res_searchgif http://schedule.msu.edu/img/InProgress.gif
// ==/UserScript==

document.datatable = [{"name":"US","list":[{"name":"Alabama","list":[{"name":"auburn","url":"http://auburn.craigslist.org/"},{"name":"birmingham","url":"http://bham.craigslist.org/"},{"name":"dothan","url":"http://dothan.craigslist.org/"},{"name":"florence / muscle shoals","url":"http://shoals.craigslist.org/"},{"name":"gadsden-anniston","url":"http://gadsden.craigslist.org/"},{"name":"huntsville / decatur","url":"http://huntsville.craigslist.org/"},{"name":"mobile","url":"http://mobile.craigslist.org/"},{"name":"montgomery","url":"http://montgomery.craigslist.org/"},{"name":"tuscaloosa","url":"http://tuscaloosa.craigslist.org/"}]},{"name":"Alaska","list":[{"name":"anchorage / mat-su","url":"http://anchorage.craigslist.org/"},{"name":"fairbanks","url":"http://fairbanks.craigslist.org/"},{"name":"kenai peninsula","url":"http://kenai.craigslist.org/"},{"name":"southeast alaska","url":"http://juneau.craigslist.org/"}]},{"name":"Arizona","list":[{"name":"flagstaff / sedona","url":"http://flagstaff.craigslist.org/"},{"name":"mohave county","url":"http://mohave.craigslist.org/"},{"name":"phoenix","url":"http://phoenix.craigslist.org/"},{"name":"prescott","url":"http://prescott.craigslist.org/"},{"name":"show low","url":"http://showlow.craigslist.org/"},{"name":"sierra vista","url":"http://sierravista.craigslist.org/"},{"name":"tucson","url":"http://tucson.craigslist.org/"},{"name":"yuma","url":"http://yuma.craigslist.org/"}]},{"name":"Arkansas","list":[{"name":"fayetteville ","url":"http://fayar.craigslist.org/"},{"name":"fort smith","url":"http://fortsmith.craigslist.org/"},{"name":"jonesboro","url":"http://jonesboro.craigslist.org/"},{"name":"little rock","url":"http://littlerock.craigslist.org/"},{"name":"texarkana","url":"http://texarkana.craigslist.org/"}]},{"name":"California","list":[{"name":"bakersfield","url":"http://bakersfield.craigslist.org/"},{"name":"chico","url":"http://chico.craigslist.org/"},{"name":"fresno / madera","url":"http://fresno.craigslist.org/"},{"name":"gold country","url":"http://goldcountry.craigslist.org/"},{"name":"hanford-corcoran","url":"http://hanford.craigslist.org/"},{"name":"humboldt county","url":"http://humboldt.craigslist.org/"},{"name":"imperial county","url":"http://imperial.craigslist.org/"},{"name":"inland empire","url":"http://inlandempire.craigslist.org/"},{"name":"los angeles","url":"http://losangeles.craigslist.org/"},{"name":"mendocino county","url":"http://mendocino.craigslist.org/"},{"name":"merced","url":"http://merced.craigslist.org/"},{"name":"modesto","url":"http://modesto.craigslist.org/"},{"name":"monterey bay","url":"http://monterey.craigslist.org/"},{"name":"orange county","url":"http://orangecounty.craigslist.org/"},{"name":"palm springs","url":"http://palmsprings.craigslist.org/"},{"name":"redding","url":"http://redding.craigslist.org/"},{"name":"sacramento","url":"http://sacramento.craigslist.org/"},{"name":"san diego","url":"http://sandiego.craigslist.org/"},{"name":"san francisco bay area","url":"http://sfbay.craigslist.org/"},{"name":"san luis obispo","url":"http://slo.craigslist.org/"},{"name":"santa barbara","url":"http://santabarbara.craigslist.org/"},{"name":"santa maria","url":"http://santamaria.craigslist.org/"},{"name":"siskiyou county","url":"http://siskiyou.craigslist.org/"},{"name":"stockton","url":"http://stockton.craigslist.org/"},{"name":"susanville","url":"http://susanville.craigslist.org/"},{"name":"ventura county","url":"http://ventura.craigslist.org/"},{"name":"visalia-tulare","url":"http://visalia.craigslist.org/"},{"name":"yuba-sutter","url":"http://yubasutter.craigslist.org/"}]},{"name":"Colorado","list":[{"name":"boulder","url":"http://boulder.craigslist.org/"},{"name":"colorado springs","url":"http://cosprings.craigslist.org/"},{"name":"denver","url":"http://denver.craigslist.org/"},{"name":"eastern CO","url":"http://eastco.craigslist.org/"},{"name":"fort collins / north CO","url":"http://fortcollins.craigslist.org/"},{"name":"high rockies","url":"http://rockies.craigslist.org/"},{"name":"pueblo","url":"http://pueblo.craigslist.org/"},{"name":"western slope","url":"http://westslope.craigslist.org/"}]},{"name":"Connecticut","list":[{"name":"eastern CT","url":"http://newlondon.craigslist.org/"},{"name":"hartford","url":"http://hartford.craigslist.org/"},{"name":"new haven","url":"http://newhaven.craigslist.org/"},{"name":"northwest CT","url":"http://nwct.craigslist.org/"}]},{"name":"Delaware","list":[{"name":"delaware","url":"http://delaware.craigslist.org/"}]},{"name":"District of Columbia","list":[{"name":"washington","url":"http://washingtondc.craigslist.org/"}]},{"name":"Florida","list":[{"name":"daytona beach","url":"http://daytona.craigslist.org/"},{"name":"florida keys","url":"http://keys.craigslist.org/"},{"name":"fort lauderdale","url":"http://fortlauderdale.craigslist.org/"},{"name":"ft myers / SW florida","url":"http://fortmyers.craigslist.org/"},{"name":"gainesville","url":"http://gainesville.craigslist.org/"},{"name":"heartland florida","url":"http://cfl.craigslist.org/"},{"name":"jacksonville","url":"http://jacksonville.craigslist.org/"},{"name":"lakeland","url":"http://lakeland.craigslist.org/"},{"name":"north central FL","url":"http://lakecity.craigslist.org/"},{"name":"ocala","url":"http://ocala.craigslist.org/"},{"name":"okaloosa / walton","url":"http://okaloosa.craigslist.org/"},{"name":"orlando","url":"http://orlando.craigslist.org/"},{"name":"panama city","url":"http://panamacity.craigslist.org/"},{"name":"pensacola","url":"http://pensacola.craigslist.org/"},{"name":"sarasota-bradenton","url":"http://sarasota.craigslist.org/"},{"name":"south florida","url":"http://miami.craigslist.org/"},{"name":"space coast","url":"http://spacecoast.craigslist.org/"},{"name":"st augustine","url":"http://staugustine.craigslist.org/"},{"name":"tallahassee","url":"http://tallahassee.craigslist.org/"},{"name":"tampa bay area","url":"http://tampa.craigslist.org/"},{"name":"treasure coast","url":"http://treasure.craigslist.org/"},{"name":"west palm beach","url":"http://westpalmbeach.craigslist.org/"}]},{"name":"Georgia","list":[{"name":"albany ","url":"http://albanyga.craigslist.org/"},{"name":"athens","url":"http://athensga.craigslist.org/"},{"name":"atlanta","url":"http://atlanta.craigslist.org/"},{"name":"augusta","url":"http://augusta.craigslist.org/"},{"name":"brunswick","url":"http://brunswick.craigslist.org/"},{"name":"columbus ","url":"http://columbusga.craigslist.org/"},{"name":"macon / warner robins","url":"http://macon.craigslist.org/"},{"name":"northwest GA","url":"http://nwga.craigslist.org/"},{"name":"savannah / hinesville","url":"http://savannah.craigslist.org/"},{"name":"statesboro","url":"http://statesboro.craigslist.org/"},{"name":"valdosta","url":"http://valdosta.craigslist.org/"}]},{"name":"Hawaii","list":[{"name":"hawaii","url":"http://honolulu.craigslist.org/"}]},{"name":"Idaho","list":[{"name":"boise","url":"http://boise.craigslist.org/"},{"name":"east idaho","url":"http://eastidaho.craigslist.org/"},{"name":"lewiston / clarkston","url":"http://lewiston.craigslist.org/"},{"name":"twin falls","url":"http://twinfalls.craigslist.org/"}]},{"name":"Illinois","list":[{"name":"bloomington-normal","url":"http://bn.craigslist.org/"},{"name":"champaign urbana","url":"http://chambana.craigslist.org/"},{"name":"chicago","url":"http://chicago.craigslist.org/"},{"name":"decatur","url":"http://decatur.craigslist.org/"},{"name":"la salle co","url":"http://lasalle.craigslist.org/"},{"name":"mattoon-charleston","url":"http://mattoon.craigslist.org/"},{"name":"peoria","url":"http://peoria.craigslist.org/"},{"name":"rockford","url":"http://rockford.craigslist.org/"},{"name":"southern illinois","url":"http://carbondale.craigslist.org/"},{"name":"springfield ","url":"http://springfieldil.craigslist.org/"},{"name":"western IL","url":"http://quincy.craigslist.org/"}]},{"name":"Indiana","list":[{"name":"bloomington","url":"http://bloomington.craigslist.org/"},{"name":"evansville","url":"http://evansville.craigslist.org/"},{"name":"fort wayne","url":"http://fortwayne.craigslist.org/"},{"name":"indianapolis","url":"http://indianapolis.craigslist.org/"},{"name":"kokomo","url":"http://kokomo.craigslist.org/"},{"name":"lafayette / west lafayette","url":"http://tippecanoe.craigslist.org/"},{"name":"muncie / anderson","url":"http://muncie.craigslist.org/"},{"name":"richmond ","url":"http://richmondin.craigslist.org/"},{"name":"south bend / michiana","url":"http://southbend.craigslist.org/"},{"name":"terre haute","url":"http://terrehaute.craigslist.org/"}]},{"name":"Iowa","list":[{"name":"ames","url":"http://ames.craigslist.org/"},{"name":"cedar rapids","url":"http://cedarrapids.craigslist.org/"},{"name":"des moines","url":"http://desmoines.craigslist.org/"},{"name":"dubuque","url":"http://dubuque.craigslist.org/"},{"name":"fort dodge","url":"http://fortdodge.craigslist.org/"},{"name":"iowa city","url":"http://iowacity.craigslist.org/"},{"name":"mason city","url":"http://masoncity.craigslist.org/"},{"name":"quad cities","url":"http://quadcities.craigslist.org/"},{"name":"sioux city","url":"http://siouxcity.craigslist.org/"},{"name":"southeast IA","url":"http://ottumwa.craigslist.org/"},{"name":"waterloo / cedar falls","url":"http://waterloo.craigslist.org/"}]},{"name":"Kansas","list":[{"name":"lawrence","url":"http://lawrence.craigslist.org/"},{"name":"manhattan","url":"http://ksu.craigslist.org/"},{"name":"northwest KS","url":"http://nwks.craigslist.org/"},{"name":"salina","url":"http://salina.craigslist.org/"},{"name":"southeast KS","url":"http://seks.craigslist.org/"},{"name":"southwest KS","url":"http://swks.craigslist.org/"},{"name":"topeka","url":"http://topeka.craigslist.org/"},{"name":"wichita","url":"http://wichita.craigslist.org/"}]},{"name":"Kentucky","list":[{"name":"bowling green","url":"http://bgky.craigslist.org/"},{"name":"eastern kentucky","url":"http://eastky.craigslist.org/"},{"name":"lexington","url":"http://lexington.craigslist.org/"},{"name":"louisville","url":"http://louisville.craigslist.org/"},{"name":"owensboro","url":"http://owensboro.craigslist.org/"},{"name":"western KY","url":"http://westky.craigslist.org/"}]},{"name":"Louisiana","list":[{"name":"baton rouge","url":"http://batonrouge.craigslist.org/"},{"name":"central louisiana","url":"http://cenla.craigslist.org/"},{"name":"houma","url":"http://houma.craigslist.org/"},{"name":"lafayette","url":"http://lafayette.craigslist.org/"},{"name":"lake charles","url":"http://lakecharles.craigslist.org/"},{"name":"monroe","url":"http://monroe.craigslist.org/"},{"name":"new orleans","url":"http://neworleans.craigslist.org/"},{"name":"shreveport","url":"http://shreveport.craigslist.org/"}]},{"name":"Maine","list":[{"name":"maine","url":"http://maine.craigslist.org/"}]},{"name":"Maryland","list":[{"name":"annapolis","url":"http://annapolis.craigslist.org/"},{"name":"baltimore","url":"http://baltimore.craigslist.org/"},{"name":"eastern shore","url":"http://easternshore.craigslist.org/"},{"name":"frederick","url":"http://frederick.craigslist.org/"},{"name":"southern maryland","url":"http://smd.craigslist.org/"},{"name":"western maryland","url":"http://westmd.craigslist.org/"}]},{"name":"Massachusetts","list":[{"name":"boston","url":"http://boston.craigslist.org/"},{"name":"cape cod / islands","url":"http://capecod.craigslist.org/"},{"name":"south coast","url":"http://southcoast.craigslist.org/"},{"name":"western massachusetts","url":"http://westernmass.craigslist.org/"},{"name":"worcester / central MA","url":"http://worcester.craigslist.org/"}]},{"name":"Michigan","list":[{"name":"ann arbor","url":"http://annarbor.craigslist.org/"},{"name":"battle creek","url":"http://battlecreek.craigslist.org/"},{"name":"central michigan","url":"http://centralmich.craigslist.org/"},{"name":"detroit metro","url":"http://detroit.craigslist.org/"},{"name":"flint","url":"http://flint.craigslist.org/"},{"name":"grand rapids","url":"http://grandrapids.craigslist.org/"},{"name":"holland","url":"http://holland.craigslist.org/"},{"name":"jackson ","url":"http://jxn.craigslist.org/"},{"name":"kalamazoo","url":"http://kalamazoo.craigslist.org/"},{"name":"lansing","url":"http://lansing.craigslist.org/"},{"name":"monroe ","url":"http://monroemi.craigslist.org/"},{"name":"muskegon","url":"http://muskegon.craigslist.org/"},{"name":"northern michigan","url":"http://nmi.craigslist.org/"},{"name":"port huron","url":"http://porthuron.craigslist.org/"},{"name":"saginaw-midland-baycity","url":"http://saginaw.craigslist.org/"},{"name":"southwest michigan","url":"http://swmi.craigslist.org/"},{"name":"the thumb","url":"http://thumb.craigslist.org/"},{"name":"upper peninsula","url":"http://up.craigslist.org/"}]},{"name":"Minnesota","list":[{"name":"bemidji","url":"http://bemidji.craigslist.org/"},{"name":"brainerd","url":"http://brainerd.craigslist.org/"},{"name":"duluth / superior","url":"http://duluth.craigslist.org/"},{"name":"mankato","url":"http://mankato.craigslist.org/"},{"name":"minneapolis / st paul","url":"http://minneapolis.craigslist.org/"},{"name":"rochester ","url":"http://rmn.craigslist.org/"},{"name":"southwest MN","url":"http://marshall.craigslist.org/"},{"name":"st cloud","url":"http://stcloud.craigslist.org/"}]},{"name":"Mississippi","list":[{"name":"gulfport / biloxi","url":"http://gulfport.craigslist.org/"},{"name":"hattiesburg","url":"http://hattiesburg.craigslist.org/"},{"name":"jackson","url":"http://jackson.craigslist.org/"},{"name":"meridian","url":"http://meridian.craigslist.org/"},{"name":"north mississippi","url":"http://northmiss.craigslist.org/"},{"name":"southwest MS","url":"http://natchez.craigslist.org/"}]},{"name":"Missouri","list":[{"name":"columbia / jeff city","url":"http://columbiamo.craigslist.org/"},{"name":"joplin","url":"http://joplin.craigslist.org/"},{"name":"kansas city","url":"http://kansascity.craigslist.org/"},{"name":"kirksville","url":"http://kirksville.craigslist.org/"},{"name":"lake of the ozarks","url":"http://loz.craigslist.org/"},{"name":"southeast missouri","url":"http://semo.craigslist.org/"},{"name":"springfield","url":"http://springfield.craigslist.org/"},{"name":"st joseph","url":"http://stjoseph.craigslist.org/"},{"name":"st louis","url":"http://stlouis.craigslist.org/"}]},{"name":"Montana","list":[{"name":"billings","url":"http://billings.craigslist.org/"},{"name":"bozeman","url":"http://bozeman.craigslist.org/"},{"name":"butte","url":"http://butte.craigslist.org/"},{"name":"great falls","url":"http://greatfalls.craigslist.org/"},{"name":"helena","url":"http://helena.craigslist.org/"},{"name":"kalispell","url":"http://kalispell.craigslist.org/"},{"name":"missoula","url":"http://missoula.craigslist.org/"},{"name":"montana (old)","url":"http://montana.craigslist.org/"}]},{"name":"Nebraska","list":[{"name":"grand island","url":"http://grandisland.craigslist.org/"},{"name":"lincoln","url":"http://lincoln.craigslist.org/"},{"name":"north platte","url":"http://northplatte.craigslist.org/"},{"name":"omaha / council bluffs","url":"http://omaha.craigslist.org/"},{"name":"scottsbluff / panhandle","url":"http://scottsbluff.craigslist.org/"}]},{"name":"Nevada","list":[{"name":"elko","url":"http://elko.craigslist.org/"},{"name":"las vegas","url":"http://lasvegas.craigslist.org/"},{"name":"reno / tahoe","url":"http://reno.craigslist.org/"}]},{"name":"New Hampshire","list":[{"name":"new hampshire","url":"http://nh.craigslist.org/"}]},{"name":"New Jersey","list":[{"name":"central NJ","url":"http://cnj.craigslist.org/"},{"name":"jersey shore","url":"http://jerseyshore.craigslist.org/"},{"name":"north jersey","url":"http://newjersey.craigslist.org/"},{"name":"south jersey","url":"http://southjersey.craigslist.org/"}]},{"name":"New Mexico","list":[{"name":"albuquerque","url":"http://albuquerque.craigslist.org/"},{"name":"clovis / portales","url":"http://clovis.craigslist.org/"},{"name":"farmington","url":"http://farmington.craigslist.org/"},{"name":"las cruces","url":"http://lascruces.craigslist.org/"},{"name":"roswell / carlsbad","url":"http://roswell.craigslist.org/"},{"name":"santa fe / taos","url":"http://santafe.craigslist.org/"}]},{"name":"New York","list":[{"name":"albany","url":"http://albany.craigslist.org/"},{"name":"binghamton","url":"http://binghamton.craigslist.org/"},{"name":"buffalo","url":"http://buffalo.craigslist.org/"},{"name":"catskills","url":"http://catskills.craigslist.org/"},{"name":"chautauqua","url":"http://chautauqua.craigslist.org/"},{"name":"elmira-corning","url":"http://elmira.craigslist.org/"},{"name":"finger lakes","url":"http://fingerlakes.craigslist.org/"},{"name":"glens falls","url":"http://glensfalls.craigslist.org/"},{"name":"hudson valley","url":"http://hudsonvalley.craigslist.org/"},{"name":"ithaca","url":"http://ithaca.craigslist.org/"},{"name":"long island","url":"http://longisland.craigslist.org/"},{"name":"new york city","url":"http://newyork.craigslist.org/"},{"name":"oneonta","url":"http://oneonta.craigslist.org/"},{"name":"plattsburgh-adirondacks","url":"http://plattsburgh.craigslist.org/"},{"name":"potsdam-canton-massena","url":"http://potsdam.craigslist.org/"},{"name":"rochester","url":"http://rochester.craigslist.org/"},{"name":"syracuse","url":"http://syracuse.craigslist.org/"},{"name":"twin tiers NY/PA","url":"http://twintiers.craigslist.org/"},{"name":"utica-rome-oneida","url":"http://utica.craigslist.org/"},{"name":"watertown","url":"http://watertown.craigslist.org/"}]},{"name":"North Carolina","list":[{"name":"asheville","url":"http://asheville.craigslist.org/"},{"name":"boone","url":"http://boone.craigslist.org/"},{"name":"charlotte","url":"http://charlotte.craigslist.org/"},{"name":"eastern NC","url":"http://eastnc.craigslist.org/"},{"name":"fayetteville","url":"http://fayetteville.craigslist.org/"},{"name":"greensboro","url":"http://greensboro.craigslist.org/"},{"name":"hickory / lenoir","url":"http://hickory.craigslist.org/"},{"name":"jacksonville ","url":"http://onslow.craigslist.org/"},{"name":"outer banks","url":"http://outerbanks.craigslist.org/"},{"name":"raleigh / durham / CH","url":"http://raleigh.craigslist.org/"},{"name":"wilmington","url":"http://wilmington.craigslist.org/"},{"name":"winston-salem","url":"http://winstonsalem.craigslist.org/"}]},{"name":"North Dakota","list":[{"name":"bismarck","url":"http://bismarck.craigslist.org/"},{"name":"fargo / moorhead","url":"http://fargo.craigslist.org/"},{"name":"grand forks","url":"http://grandforks.craigslist.org/"},{"name":"north dakota","url":"http://nd.craigslist.org/"}]},{"name":"Ohio","list":[{"name":"akron / canton","url":"http://akroncanton.craigslist.org/"},{"name":"ashtabula","url":"http://ashtabula.craigslist.org/"},{"name":"athens ","url":"http://athensohio.craigslist.org/"},{"name":"chillicothe","url":"http://chillicothe.craigslist.org/"},{"name":"cincinnati","url":"http://cincinnati.craigslist.org/"},{"name":"cleveland","url":"http://cleveland.craigslist.org/"},{"name":"columbus","url":"http://columbus.craigslist.org/"},{"name":"dayton / springfield","url":"http://dayton.craigslist.org/"},{"name":"lima / findlay","url":"http://limaohio.craigslist.org/"},{"name":"mansfield","url":"http://mansfield.craigslist.org/"},{"name":"sandusky","url":"http://sandusky.craigslist.org/"},{"name":"toledo","url":"http://toledo.craigslist.org/"},{"name":"tuscarawas co","url":"http://tuscarawas.craigslist.org/"},{"name":"youngstown","url":"http://youngstown.craigslist.org/"},{"name":"zanesville / cambridge","url":"http://zanesville.craigslist.org/"}]},{"name":"Oklahoma","list":[{"name":"lawton","url":"http://lawton.craigslist.org/"},{"name":"northwest OK","url":"http://enid.craigslist.org/"},{"name":"oklahoma city","url":"http://oklahomacity.craigslist.org/"},{"name":"stillwater","url":"http://stillwater.craigslist.org/"},{"name":"tulsa","url":"http://tulsa.craigslist.org/"}]},{"name":"Oregon","list":[{"name":"bend","url":"http://bend.craigslist.org/"},{"name":"corvallis/albany","url":"http://corvallis.craigslist.org/"},{"name":"east oregon","url":"http://eastoregon.craigslist.org/"},{"name":"eugene","url":"http://eugene.craigslist.org/"},{"name":"klamath falls","url":"http://klamath.craigslist.org/"},{"name":"medford-ashland","url":"http://medford.craigslist.org/"},{"name":"oregon coast","url":"http://oregoncoast.craigslist.org/"},{"name":"portland","url":"http://portland.craigslist.org/"},{"name":"roseburg","url":"http://roseburg.craigslist.org/"},{"name":"salem","url":"http://salem.craigslist.org/"}]},{"name":"Pennsylvania","list":[{"name":"altoona-johnstown","url":"http://altoona.craigslist.org/"},{"name":"cumberland valley","url":"http://chambersburg.craigslist.org/"},{"name":"erie","url":"http://erie.craigslist.org/"},{"name":"harrisburg","url":"http://harrisburg.craigslist.org/"},{"name":"lancaster","url":"http://lancaster.craigslist.org/"},{"name":"lehigh valley","url":"http://allentown.craigslist.org/"},{"name":"meadville","url":"http://meadville.craigslist.org/"},{"name":"philadelphia","url":"http://philadelphia.craigslist.org/"},{"name":"pittsburgh","url":"http://pittsburgh.craigslist.org/"},{"name":"poconos","url":"http://poconos.craigslist.org/"},{"name":"reading","url":"http://reading.craigslist.org/"},{"name":"scranton / wilkes-barre","url":"http://scranton.craigslist.org/"},{"name":"state college","url":"http://pennstate.craigslist.org/"},{"name":"williamsport","url":"http://williamsport.craigslist.org/"},{"name":"york","url":"http://york.craigslist.org/"}]},{"name":"Rhode Island","list":[{"name":"rhode island","url":"http://providence.craigslist.org/"}]},{"name":"South Carolina","list":[{"name":"charleston","url":"http://charleston.craigslist.org/"},{"name":"columbia","url":"http://columbia.craigslist.org/"},{"name":"florence","url":"http://florencesc.craigslist.org/"},{"name":"greenville / upstate","url":"http://greenville.craigslist.org/"},{"name":"hilton head","url":"http://hiltonhead.craigslist.org/"},{"name":"myrtle beach","url":"http://myrtlebeach.craigslist.org/"}]},{"name":"South Dakota","list":[{"name":"northeast SD","url":"http://nesd.craigslist.org/"},{"name":"pierre / central SD","url":"http://csd.craigslist.org/"},{"name":"rapid city / west SD","url":"http://rapidcity.craigslist.org/"},{"name":"sioux falls / SE SD","url":"http://siouxfalls.craigslist.org/"},{"name":"south dakota","url":"http://sd.craigslist.org/"}]},{"name":"Tennessee","list":[{"name":"chattanooga","url":"http://chattanooga.craigslist.org/"},{"name":"clarksville","url":"http://clarksville.craigslist.org/"},{"name":"cookeville","url":"http://cookeville.craigslist.org/"},{"name":"jackson ","url":"http://jacksontn.craigslist.org/"},{"name":"knoxville","url":"http://knoxville.craigslist.org/"},{"name":"memphis","url":"http://memphis.craigslist.org/"},{"name":"nashville","url":"http://nashville.craigslist.org/"},{"name":"tri-cities","url":"http://tricities.craigslist.org/"}]},{"name":"Texas","list":[{"name":"abilene","url":"http://abilene.craigslist.org/"},{"name":"amarillo","url":"http://amarillo.craigslist.org/"},{"name":"austin","url":"http://austin.craigslist.org/"},{"name":"beaumont / port arthur","url":"http://beaumont.craigslist.org/"},{"name":"brownsville","url":"http://brownsville.craigslist.org/"},{"name":"college station","url":"http://collegestation.craigslist.org/"},{"name":"corpus christi","url":"http://corpuschristi.craigslist.org/"},{"name":"dallas / fort worth","url":"http://dallas.craigslist.org/"},{"name":"deep east texas","url":"http://nacogdoches.craigslist.org/"},{"name":"del rio / eagle pass","url":"http://delrio.craigslist.org/"},{"name":"el paso","url":"http://elpaso.craigslist.org/"},{"name":"galveston","url":"http://galveston.craigslist.org/"},{"name":"houston","url":"http://houston.craigslist.org/"},{"name":"killeen / temple / ft hood","url":"http://killeen.craigslist.org/"},{"name":"laredo","url":"http://laredo.craigslist.org/"},{"name":"lubbock","url":"http://lubbock.craigslist.org/"},{"name":"mcallen / edinburg","url":"http://mcallen.craigslist.org/"},{"name":"odessa / midland","url":"http://odessa.craigslist.org/"},{"name":"san angelo","url":"http://sanangelo.craigslist.org/"},{"name":"san antonio","url":"http://sanantonio.craigslist.org/"},{"name":"san marcos","url":"http://sanmarcos.craigslist.org/"},{"name":"southwest TX","url":"http://bigbend.craigslist.org/"},{"name":"texoma","url":"http://texoma.craigslist.org/"},{"name":"tyler / east TX","url":"http://easttexas.craigslist.org/"},{"name":"victoria ","url":"http://victoriatx.craigslist.org/"},{"name":"waco","url":"http://waco.craigslist.org/"},{"name":"wichita falls","url":"http://wichitafalls.craigslist.org/"}]},{"name":"Utah","list":[{"name":"logan","url":"http://logan.craigslist.org/"},{"name":"ogden-clearfield","url":"http://ogden.craigslist.org/"},{"name":"provo / orem","url":"http://provo.craigslist.org/"},{"name":"salt lake city","url":"http://saltlakecity.craigslist.org/"},{"name":"st george","url":"http://stgeorge.craigslist.org/"}]},{"name":"Vermont","list":[{"name":"vermont","url":"http://burlington.craigslist.org/"}]},{"name":"Virginia","list":[{"name":"charlottesville","url":"http://charlottesville.craigslist.org/"},{"name":"danville","url":"http://danville.craigslist.org/"},{"name":"fredericksburg","url":"http://fredericksburg.craigslist.org/"},{"name":"hampton roads","url":"http://norfolk.craigslist.org/"},{"name":"harrisonburg","url":"http://harrisonburg.craigslist.org/"},{"name":"lynchburg","url":"http://lynchburg.craigslist.org/"},{"name":"new river valley","url":"http://blacksburg.craigslist.org/"},{"name":"richmond","url":"http://richmond.craigslist.org/"},{"name":"roanoke","url":"http://roanoke.craigslist.org/"},{"name":"southwest VA","url":"http://swva.craigslist.org/"},{"name":"winchester","url":"http://winchester.craigslist.org/"}]},{"name":"Washington","list":[{"name":"bellingham","url":"http://bellingham.craigslist.org/"},{"name":"kennewick-pasco-richland","url":"http://kpr.craigslist.org/"},{"name":"moses lake","url":"http://moseslake.craigslist.org/"},{"name":"olympic peninsula","url":"http://olympic.craigslist.org/"},{"name":"pullman / moscow","url":"http://pullman.craigslist.org/"},{"name":"seattle-tacoma","url":"http://seattle.craigslist.org/"},{"name":"skagit / island / SJI","url":"http://skagit.craigslist.org/"},{"name":"spokane / coeur d'alene","url":"http://spokane.craigslist.org/"},{"name":"wenatchee","url":"http://wenatchee.craigslist.org/"},{"name":"yakima","url":"http://yakima.craigslist.org/"}]},{"name":"West Virginia","list":[{"name":"charleston ","url":"http://charlestonwv.craigslist.org/"},{"name":"eastern panhandle","url":"http://martinsburg.craigslist.org/"},{"name":"huntington-ashland","url":"http://huntington.craigslist.org/"},{"name":"morgantown","url":"http://morgantown.craigslist.org/"},{"name":"northern panhandle","url":"http://wheeling.craigslist.org/"},{"name":"parkersburg-marietta","url":"http://parkersburg.craigslist.org/"},{"name":"southern WV","url":"http://swv.craigslist.org/"},{"name":"west virginia (old)","url":"http://wv.craigslist.org/"}]},{"name":"Wisconsin","list":[{"name":"appleton-oshkosh-FDL","url":"http://appleton.craigslist.org/"},{"name":"eau claire","url":"http://eauclaire.craigslist.org/"},{"name":"green bay","url":"http://greenbay.craigslist.org/"},{"name":"janesville","url":"http://janesville.craigslist.org/"},{"name":"kenosha-racine","url":"http://racine.craigslist.org/"},{"name":"la crosse","url":"http://lacrosse.craigslist.org/"},{"name":"madison","url":"http://madison.craigslist.org/"},{"name":"milwaukee","url":"http://milwaukee.craigslist.org/"},{"name":"northern WI","url":"http://northernwi.craigslist.org/"},{"name":"sheboygan","url":"http://sheboygan.craigslist.org/"},{"name":"wausau","url":"http://wausau.craigslist.org/"}]},{"name":"Wyoming","list":[{"name":"wyoming","url":"http://wyoming.craigslist.org/"}]},{"name":"Territories","list":[{"name":"guam-micronesia","url":"http://micronesia.craigslist.org/"},{"name":"puerto rico","url":"http://puertorico.craigslist.org/"},{"name":"U.S. virgin islands","url":"http://virgin.craigslist.org/"}]}]},{"name":"Canada","list":[{"name":"Alberta","list":[{"name":"calgary","url":"http://calgary.craigslist.ca/"},{"name":"edmonton","url":"http://edmonton.craigslist.ca/"},{"name":"ft mcmurray","url":"http://ftmcmurray.craigslist.ca/"},{"name":"lethbridge","url":"http://lethbridge.craigslist.ca/"},{"name":"medicine hat","url":"http://hat.craigslist.ca/"},{"name":"peace river country","url":"http://peace.craigslist.ca/"},{"name":"red deer","url":"http://reddeer.craigslist.ca/"}]},{"name":"British Columbia","list":[{"name":"cariboo","url":"http://cariboo.craigslist.ca/"},{"name":"comox valley","url":"http://comoxvalley.craigslist.ca/"},{"name":"fraser valley","url":"http://abbotsford.craigslist.ca/"},{"name":"kamloops","url":"http://kamloops.craigslist.ca/"},{"name":"kelowna / okanagan","url":"http://kelowna.craigslist.ca/"},{"name":"kootenays","url":"http://cranbrook.craigslist.ca/"},{"name":"nanaimo","url":"http://nanaimo.craigslist.ca/"},{"name":"prince george","url":"http://princegeorge.craigslist.ca/"},{"name":"skeena-bulkley","url":"http://skeena.craigslist.ca/"},{"name":"sunshine coast","url":"http://sunshine.craigslist.ca/"},{"name":"vancouver","url":"http://vancouver.craigslist.ca/"},{"name":"victoria","url":"http://victoria.craigslist.ca/"},{"name":"whistler","url":"http://whistler.craigslist.ca/"}]},{"name":"Manitoba","list":[{"name":"winnipeg","url":"http://winnipeg.craigslist.ca/"}]},{"name":"New Brunswick","list":[{"name":"new brunswick","url":"http://newbrunswick.craigslist.ca/"}]},{"name":"Newfoundland and Labrador","list":[{"name":"st john's","url":"http://newfoundland.craigslist.ca/"}]},{"name":"Northwest Territories","list":[{"name":"territories","url":"http://territories.craigslist.ca/"},{"name":"yellowknife","url":"http://yellowknife.craigslist.ca/"}]},{"name":"Nova Scotia","list":[{"name":"halifax","url":"http://halifax.craigslist.ca/"}]},{"name":"Ontario","list":[{"name":"barrie","url":"http://barrie.craigslist.ca/"},{"name":"belleville","url":"http://belleville.craigslist.ca/"},{"name":"brantford-woodstock","url":"http://brantford.craigslist.ca/"},{"name":"chatham-kent","url":"http://chatham.craigslist.ca/"},{"name":"cornwall","url":"http://cornwall.craigslist.ca/"},{"name":"guelph","url":"http://guelph.craigslist.ca/"},{"name":"hamilton-burlington","url":"http://hamilton.craigslist.ca/"},{"name":"kingston","url":"http://kingston.craigslist.ca/"},{"name":"kitchener-waterloo-cambridge","url":"http://kitchener.craigslist.ca/"},{"name":"london ","url":"http://londonon.craigslist.ca/"},{"name":"niagara region","url":"http://niagara.craigslist.ca/"},{"name":"ottawa-hull-gatineau","url":"http://ottawa.craigslist.ca/"},{"name":"owen sound","url":"http://owensound.craigslist.ca/"},{"name":"peterborough","url":"http://peterborough.craigslist.ca/"},{"name":"sarnia","url":"http://sarnia.craigslist.ca/"},{"name":"sault ste marie","url":"http://soo.craigslist.ca/"},{"name":"sudbury","url":"http://sudbury.craigslist.ca/"},{"name":"thunder bay","url":"http://thunderbay.craigslist.ca/"},{"name":"toronto","url":"http://toronto.craigslist.ca/"},{"name":"windsor","url":"http://windsor.craigslist.ca/"}]},{"name":"Prince Edward Island","list":[{"name":"prince edward island","url":"http://pei.craigslist.ca/"}]},{"name":"Quebec","list":[{"name":"montreal","url":"http://montreal.craigslist.ca/"},{"name":"quebec city","url":"http://quebec.craigslist.ca/"},{"name":"saguenay","url":"http://saguenay.craigslist.ca/"},{"name":"sherbrooke","url":"http://sherbrooke.craigslist.ca/"},{"name":"trois-rivieres","url":"http://troisrivieres.craigslist.ca/"}]},{"name":"Saskatchewan","list":[{"name":"regina","url":"http://regina.craigslist.ca/"},{"name":"saskatoon","url":"http://saskatoon.craigslist.ca/"}]},{"name":"Yukon Territory","list":[{"name":"whitehorse","url":"http://whitehorse.craigslist.ca/"}]}]},{"name":"Europe","list":[{"name":"Austria","list":[{"name":"vienna","url":"http://vienna.craigslist.at/"}]},{"name":"Belgium","list":[{"name":"belgium","url":"http://brussels.craigslist.org/"}]},{"name":"Bulgaria","list":[{"name":"bulgaria","url":"http://bulgaria.craigslist.org/"}]},{"name":"Croatia","list":[{"name":"croatia","url":"http://zagreb.craigslist.org/"}]},{"name":"Czech Republic","list":[{"name":"prague","url":"http://prague.craigslist.cz/"}]},{"name":"Denmark","list":[{"name":"copenhagen","url":"http://copenhagen.craigslist.org/"}]},{"name":"Finland","list":[{"name":"finland","url":"http://helsinki.craigslist.fi/"}]},{"name":"France","list":[{"name":"bordeaux","url":"http://bordeaux.craigslist.org/"},{"name":"brittany","url":"http://rennes.craigslist.org/"},{"name":"grenoble","url":"http://grenoble.craigslist.org/"},{"name":"lille","url":"http://lille.craigslist.org/"},{"name":"loire valley","url":"http://loire.craigslist.org/"},{"name":"lyon","url":"http://lyon.craigslist.org/"},{"name":"marseille","url":"http://marseilles.craigslist.org/"},{"name":"montpellier","url":"http://montpellier.craigslist.org/"},{"name":"nice / cote d'azur","url":"http://cotedazur.craigslist.org/"},{"name":"normandy","url":"http://rouen.craigslist.org/"},{"name":"paris","url":"http://paris.craigslist.org/"},{"name":"strasbourg","url":"http://strasbourg.craigslist.org/"},{"name":"toulouse","url":"http://toulouse.craigslist.org/"}]},{"name":"Germany","list":[{"name":"berlin","url":"http://berlin.craigslist.de/"},{"name":"bremen","url":"http://bremen.craigslist.de/"},{"name":"cologne","url":"http://cologne.craigslist.de/"},{"name":"dresden","url":"http://dresden.craigslist.de/"},{"name":"dusseldorf","url":"http://dusseldorf.craigslist.de/"},{"name":"essen / ruhr","url":"http://essen.craigslist.de/"},{"name":"frankfurt","url":"http://frankfurt.craigslist.de/"},{"name":"hamburg","url":"http://hamburg.craigslist.de/"},{"name":"hannover","url":"http://hannover.craigslist.de/"},{"name":"heidelberg","url":"http://heidelberg.craigslist.de/"},{"name":"kaiserslautern","url":"http://kaiserslautern.craigslist.de/"},{"name":"leipzig","url":"http://leipzig.craigslist.de/"},{"name":"munich","url":"http://munich.craigslist.de/"},{"name":"nuremberg","url":"http://nuremberg.craigslist.de/"},{"name":"stuttgart","url":"http://stuttgart.craigslist.de/"}]},{"name":"Greece","list":[{"name":"greece","url":"http://athens.craigslist.gr/"}]},{"name":"Hungary","list":[{"name":"budapest","url":"http://budapest.craigslist.org/"}]},{"name":"Iceland","list":[{"name":"reykjavik","url":"http://reykjavik.craigslist.org/"}]},{"name":"Ireland","list":[{"name":"dublin","url":"http://dublin.craigslist.org/"}]},{"name":"Italy","list":[{"name":"bologna","url":"http://bologna.craigslist.it/"},{"name":"florence / tuscany","url":"http://florence.craigslist.it/"},{"name":"genoa","url":"http://genoa.craigslist.it/"},{"name":"milan","url":"http://milan.craigslist.it/"},{"name":"napoli / campania","url":"http://naples.craigslist.it/"},{"name":"perugia","url":"http://perugia.craigslist.it/"},{"name":"rome","url":"http://rome.craigslist.it/"},{"name":"sardinia","url":"http://sardinia.craigslist.it/"},{"name":"sicilia","url":"http://sicily.craigslist.it/"},{"name":"torino","url":"http://torino.craigslist.it/"},{"name":"venice / veneto","url":"http://venice.craigslist.it/"}]},{"name":"Luxembourg","list":[{"name":"luxembourg","url":"http://luxembourg.craigslist.org/"}]},{"name":"Netherlands","list":[{"name":"amsterdam / randstad","url":"http://amsterdam.craigslist.org/"}]},{"name":"Norway","list":[{"name":"norway","url":"http://oslo.craigslist.org/"}]},{"name":"Poland","list":[{"name":"poland","url":"http://warsaw.craigslist.pl/"}]},{"name":"Portugal","list":[{"name":"faro / algarve","url":"http://faro.craigslist.pt/"},{"name":"lisbon","url":"http://lisbon.craigslist.pt/"},{"name":"porto","url":"http://porto.craigslist.pt/"}]},{"name":"Romania","list":[{"name":"romania","url":"http://bucharest.craigslist.org/"}]},{"name":"Russian Federation","list":[{"name":"moscow","url":"http://moscow.craigslist.org/"},{"name":"st petersburg","url":"http://stpetersburg.craigslist.org/"}]},{"name":"Spain","list":[{"name":"alicante","url":"http://alicante.craigslist.es/"},{"name":"baleares","url":"http://baleares.craigslist.es/"},{"name":"barcelona","url":"http://barcelona.craigslist.es/"},{"name":"bilbao","url":"http://bilbao.craigslist.es/"},{"name":"cadiz","url":"http://cadiz.craigslist.es/"},{"name":"canarias","url":"http://canarias.craigslist.es/"},{"name":"granada","url":"http://granada.craigslist.es/"},{"name":"madrid","url":"http://madrid.craigslist.es/"},{"name":"malaga","url":"http://malaga.craigslist.es/"},{"name":"sevilla","url":"http://sevilla.craigslist.es/"},{"name":"valencia","url":"http://valencia.craigslist.es/"}]},{"name":"Sweden","list":[{"name":"sweden","url":"http://stockholm.craigslist.se/"}]},{"name":"Switzerland","list":[{"name":"basel","url":"http://basel.craigslist.ch/"},{"name":"bern","url":"http://bern.craigslist.ch/"},{"name":"geneva","url":"http://geneva.craigslist.ch/"},{"name":"lausanne","url":"http://lausanne.craigslist.ch/"},{"name":"zurich","url":"http://zurich.craigslist.ch/"}]},{"name":"Turkey","list":[{"name":"turkey","url":"http://istanbul.craigslist.com.tr/"}]},{"name":"Ukraine","list":[{"name":"ukraine","url":"http://ukraine.craigslist.org/"}]},{"name":"United Kingdom","list":[{"name":"aberdeen","url":"http://aberdeen.craigslist.co.uk/"},{"name":"bath","url":"http://bath.craigslist.co.uk/"},{"name":"belfast","url":"http://belfast.craigslist.co.uk/"},{"name":"birmingham / west mids","url":"http://birmingham.craigslist.co.uk/"},{"name":"brighton","url":"http://brighton.craigslist.co.uk/"},{"name":"bristol","url":"http://bristol.craigslist.co.uk/"},{"name":"cambridge, UK","url":"http://cambridge.craigslist.co.uk/"},{"name":"cardiff / wales","url":"http://cardiff.craigslist.co.uk/"},{"name":"coventry","url":"http://coventry.craigslist.co.uk/"},{"name":"derby","url":"http://derby.craigslist.co.uk/"},{"name":"devon &amp; cornwall","url":"http://devon.craigslist.co.uk/"},{"name":"dundee","url":"http://dundee.craigslist.co.uk/"},{"name":"east anglia","url":"http://norwich.craigslist.co.uk/"},{"name":"east midlands","url":"http://eastmids.craigslist.co.uk/"},{"name":"edinburgh","url":"http://edinburgh.craigslist.co.uk/"},{"name":"essex","url":"http://essex.craigslist.co.uk/"},{"name":"glasgow","url":"http://glasgow.craigslist.co.uk/"},{"name":"hampshire","url":"http://hampshire.craigslist.co.uk/"},{"name":"kent","url":"http://kent.craigslist.co.uk/"},{"name":"leeds","url":"http://leeds.craigslist.co.uk/"},{"name":"liverpool","url":"http://liverpool.craigslist.co.uk/"},{"name":"london","url":"http://london.craigslist.co.uk/"},{"name":"manchester","url":"http://manchester.craigslist.co.uk/"},{"name":"newcastle / NE england","url":"http://newcastle.craigslist.co.uk/"},{"name":"nottingham","url":"http://nottingham.craigslist.co.uk/"},{"name":"oxford","url":"http://oxford.craigslist.co.uk/"},{"name":"sheffield","url":"http://sheffield.craigslist.co.uk/"}]}]},{"name":"Asia, Pacific and Middle East","list":[{"name":"","list":[{"name":"guam-micronesia","url":"http://micronesia.craigslist.org/"}]},{"name":"Bangladesh","list":[{"name":"bangladesh","url":"http://bangladesh.craigslist.org/"}]},{"name":"China","list":[{"name":"beijing","url":"http://beijing.craigslist.com.cn/"},{"name":"chengdu","url":"http://chengdu.craigslist.com.cn/"},{"name":"chongqing","url":"http://chongqing.craigslist.com.cn/"},{"name":"dalian","url":"http://dalian.craigslist.com.cn/"},{"name":"guangzhou","url":"http://guangzhou.craigslist.com.cn/"},{"name":"hangzhou","url":"http://hangzhou.craigslist.com.cn/"},{"name":"nanjing","url":"http://nanjing.craigslist.com.cn/"},{"name":"shanghai","url":"http://shanghai.craigslist.com.cn/"},{"name":"shenyang","url":"http://shenyang.craigslist.com.cn/"},{"name":"shenzhen","url":"http://shenzhen.craigslist.com.cn/"},{"name":"wuhan","url":"http://wuhan.craigslist.com.cn/"},{"name":"xi'an","url":"http://xian.craigslist.com.cn/"}]},{"name":"Hong Kong","list":[{"name":"hong kong","url":"http://hongkong.craigslist.hk/"}]},{"name":"India","list":[{"name":"ahmedabad","url":"http://ahmedabad.craigslist.co.in/"},{"name":"bangalore","url":"http://bangalore.craigslist.co.in/"},{"name":"bhubaneswar","url":"http://bhubaneswar.craigslist.co.in/"},{"name":"chandigarh","url":"http://chandigarh.craigslist.co.in/"},{"name":"chennai (madras)","url":"http://chennai.craigslist.co.in/"},{"name":"delhi","url":"http://delhi.craigslist.co.in/"},{"name":"goa","url":"http://goa.craigslist.co.in/"},{"name":"hyderabad","url":"http://hyderabad.craigslist.co.in/"},{"name":"indore","url":"http://indore.craigslist.co.in/"},{"name":"jaipur","url":"http://jaipur.craigslist.co.in/"},{"name":"kerala","url":"http://kerala.craigslist.co.in/"},{"name":"kolkata (calcutta)","url":"http://kolkata.craigslist.co.in/"},{"name":"lucknow","url":"http://lucknow.craigslist.co.in/"},{"name":"mumbai","url":"http://mumbai.craigslist.co.in/"},{"name":"pune","url":"http://pune.craigslist.co.in/"},{"name":"surat surat","url":"http://surat.craigslist.co.in/"}]},{"name":"Indonesia","list":[{"name":"indonesia","url":"http://jakarta.craigslist.org/"}]},{"name":"Iran","list":[{"name":"iran","url":"http://tehran.craigslist.org/"}]},{"name":"Iraq","list":[{"name":"iraq","url":"http://baghdad.craigslist.org/"}]},{"name":"Israel and Palestine","list":[{"name":"haifa","url":"http://haifa.craigslist.org/"},{"name":"jerusalem","url":"http://jerusalem.craigslist.org/"},{"name":"tel aviv","url":"http://telaviv.craigslist.org/"},{"name":"west bank","url":"http://ramallah.craigslist.org/"}]},{"name":"Japan","list":[{"name":"fukuoka","url":"http://fukuoka.craigslist.jp/"},{"name":"hiroshima","url":"http://hiroshima.craigslist.jp/"},{"name":"nagoya","url":"http://nagoya.craigslist.jp/"},{"name":"okinawa","url":"http://okinawa.craigslist.jp/"},{"name":"osaka-kobe-kyoto","url":"http://osaka.craigslist.jp/"},{"name":"sapporo","url":"http://sapporo.craigslist.jp/"},{"name":"sendai","url":"http://sendai.craigslist.jp/"},{"name":"tokyo","url":"http://tokyo.craigslist.jp/"}]},{"name":"Korea","list":[{"name":"seoul","url":"http://seoul.craigslist.co.kr/"}]},{"name":"Kuwait","list":[{"name":"kuwait","url":"http://kuwait.craigslist.org/"}]},{"name":"Lebanon","list":[{"name":"beirut, lebanon","url":"http://beirut.craigslist.org/"}]},{"name":"Malaysia","list":[{"name":"malaysia","url":"http://malaysia.craigslist.org/"}]},{"name":"Pakistan","list":[{"name":"pakistan","url":"http://pakistan.craigslist.org/"}]},{"name":"Philippines","list":[{"name":"bacolod","url":"http://bacolod.craigslist.com.ph/"},{"name":"bicol region","url":"http://naga.craigslist.com.ph/"},{"name":"cagayan de oro","url":"http://cdo.craigslist.com.ph/"},{"name":"cebu","url":"http://cebu.craigslist.com.ph/"},{"name":"davao city","url":"http://davaocity.craigslist.com.ph/"},{"name":"iloilo","url":"http://iloilo.craigslist.com.ph/"},{"name":"manila","url":"http://manila.craigslist.com.ph/"},{"name":"pampanga","url":"http://pampanga.craigslist.com.ph/"},{"name":"zamboanga","url":"http://zamboanga.craigslist.com.ph/"}]},{"name":"Singapore","list":[{"name":"singapore","url":"http://singapore.craigslist.com.sg/"}]},{"name":"Taiwan","list":[{"name":"taiwan","url":"http://taipei.craigslist.com.tw/"}]},{"name":"Thailand","list":[{"name":"thailand","url":"http://bangkok.craigslist.co.th/"}]},{"name":"United Arab Emirates","list":[{"name":"united arab emirates","url":"http://dubai.craigslist.org/"}]},{"name":"Vietnam","list":[{"name":"vietnam","url":"http://vietnam.craigslist.org/"}]}]},{"name":"Oceania","list":[{"name":"Australia","list":[{"name":"adelaide","url":"http://adelaide.craigslist.com.au/"},{"name":"brisbane","url":"http://brisbane.craigslist.com.au/"},{"name":"cairns","url":"http://cairns.craigslist.com.au/"},{"name":"canberra","url":"http://canberra.craigslist.com.au/"},{"name":"darwin","url":"http://darwin.craigslist.com.au/"},{"name":"gold coast","url":"http://goldcoast.craigslist.com.au/"},{"name":"melbourne","url":"http://melbourne.craigslist.com.au/"},{"name":"newcastle, NSW","url":"http://ntl.craigslist.com.au/"},{"name":"perth","url":"http://perth.craigslist.com.au/"},{"name":"sydney","url":"http://sydney.craigslist.com.au/"},{"name":"tasmania","url":"http://hobart.craigslist.com.au/"},{"name":"wollongong","url":"http://wollongong.craigslist.com.au/"}]},{"name":"New Zealand","list":[{"name":"auckland","url":"http://auckland.craigslist.org/"},{"name":"christchurch","url":"http://christchurch.craigslist.org/"},{"name":"dunedin","url":"http://dunedin.craigslist.co.nz/"},{"name":"wellington","url":"http://wellington.craigslist.org/"}]}]},{"name":"Latin America and Caribbean","list":[{"name":"","list":[{"name":"caribbean islands","url":"http://caribbean.craigslist.org/"}]},{"name":"Argentina","list":[{"name":"buenos aires","url":"http://buenosaires.craigslist.org/"}]},{"name":"Bolivia","list":[{"name":"bolivia","url":"http://lapaz.craigslist.org/"}]},{"name":"Brazil","list":[{"name":"belo horizonte","url":"http://belohorizonte.craigslist.org/"},{"name":"brasilia","url":"http://brasilia.craigslist.org/"},{"name":"curitiba","url":"http://curitiba.craigslist.org/"},{"name":"fortaleza","url":"http://fortaleza.craigslist.org/"},{"name":"porto alegre","url":"http://portoalegre.craigslist.org/"},{"name":"recife","url":"http://recife.craigslist.org/"},{"name":"rio de janeiro","url":"http://rio.craigslist.org/"},{"name":"salvador, bahia","url":"http://salvador.craigslist.org/"},{"name":"sao paulo","url":"http://saopaulo.craigslist.org/"}]},{"name":"Chile","list":[{"name":"chile","url":"http://santiago.craigslist.org/"}]},{"name":"Colombia","list":[{"name":"colombia","url":"http://colombia.craigslist.org/"}]},{"name":"Costa Rica","list":[{"name":"costa rica","url":"http://costarica.craigslist.org/"}]},{"name":"Dominican Republic","list":[{"name":"dominican republic","url":"http://santodomingo.craigslist.org/"}]},{"name":"Ecuador","list":[{"name":"ecuador","url":"http://quito.craigslist.org/"}]},{"name":"El Salvador","list":[{"name":"el salvador","url":"http://elsalvador.craigslist.org/"}]},{"name":"Guatemala","list":[{"name":"guatemala","url":"http://guatemala.craigslist.org/"}]},{"name":"Mexico","list":[{"name":"acapulco","url":"http://acapulco.craigslist.com.mx/"},{"name":"baja california sur","url":"http://bajasur.craigslist.com.mx/"},{"name":"chihuahua","url":"http://chihuahua.craigslist.com.mx/"},{"name":"ciudad juarez","url":"http://juarez.craigslist.com.mx/"},{"name":"guadalajara","url":"http://guadalajara.craigslist.com.mx/"},{"name":"guanajuato","url":"http://guanajuato.craigslist.com.mx/"},{"name":"hermosillo","url":"http://hermosillo.craigslist.com.mx/"},{"name":"mazatlan","url":"http://mazatlan.craigslist.com.mx/"},{"name":"mexico city","url":"http://mexicocity.craigslist.com.mx/"},{"name":"monterrey","url":"http://monterrey.craigslist.com.mx/"},{"name":"oaxaca","url":"http://oaxaca.craigslist.com.mx/"},{"name":"puebla","url":"http://puebla.craigslist.com.mx/"},{"name":"puerto vallarta","url":"http://pv.craigslist.com.mx/"},{"name":"tijuana","url":"http://tijuana.craigslist.com.mx/"},{"name":"veracruz","url":"http://veracruz.craigslist.com.mx/"},{"name":"yucatan","url":"http://yucatan.craigslist.com.mx/"}]},{"name":"Nicaragua","list":[{"name":"nicaragua","url":"http://managua.craigslist.org/"}]},{"name":"Panama","list":[{"name":"panama","url":"http://panama.craigslist.org/"}]},{"name":"Peru","list":[{"name":"peru","url":"http://lima.craigslist.org/"}]},{"name":"Puerto Rico","list":[{"name":"puerto rico","url":"http://puertorico.craigslist.org/"}]},{"name":"Uruguay","list":[{"name":"montevideo","url":"http://montevideo.craigslist.org/"}]},{"name":"Venezuela","list":[{"name":"venezuela","url":"http://caracas.craigslist.org/"}]},{"name":"Virgin Islands, U.S.","list":[{"name":"virgin islands","url":"http://virgin.craigslist.org/"}]}]},{"name":"Africa","list":[{"name":"Egypt","list":[{"name":"egypt","url":"http://cairo.craigslist.org/"}]},{"name":"Ethiopia","list":[{"name":"ethiopia","url":"http://addisababa.craigslist.org/"}]},{"name":"Ghana","list":[{"name":"ghana","url":"http://accra.craigslist.org/"}]},{"name":"Kenya","list":[{"name":"kenya","url":"http://kenya.craigslist.org/"}]},{"name":"Morocco","list":[{"name":"morocco","url":"http://casablanca.craigslist.org/"}]},{"name":"South Africa","list":[{"name":"cape town","url":"http://capetown.craigslist.co.za/"},{"name":"durban","url":"http://durban.craigslist.co.za/"},{"name":"johannesburg","url":"http://johannesburg.craigslist.co.za/"},{"name":"pretoria","url":"http://pretoria.craigslist.co.za/"}]},{"name":"Tunisia","list":[{"name":"tunisia","url":"http://tunis.craigslist.org/"}]}]}];

function postObject(title, description, link, date, viewed) {
    var parenindex = title.indexOf('(');
    var dollarindex = title.indexOf('$');
    if (parenindex > 0) {
        this.title = title.substring(0, parenindex);
        this.subtitle = title.substring(parenindex);
    }
    else if (dollarindex > 0) {
        this.title = title.substring(0, dollarindex);
        this.subtitle = title.substring(dollarindex);
    }
    else {
        this.title = title;
    }
    this.description = description;
    this.link = link;
    this.date = new Date(date);
    this.viewed = viewed;
}

document.clobject = 
{
    SearchTextElement: undefined,
    CategorySelectionElement: undefined,
    SubCategorySelectionElement: undefined,
    PriceMinElement: undefined,
    PriceMaxElement: undefined,
    RegionListElement: undefined,
    AreaListElement: undefined,
    CityListElement: undefined,
    SearchCitiesListElement: undefined,
    SearchGifElement: undefined,
    NumberOfSearchRequests: undefined,
    NumberOfResponsesReceived: undefined,
    SearchResults: undefined,
    SearchResultsDiv: undefined,
    LastSelectedDiv: undefined,
    ViewedLinks: undefined,
        
    CategorySelectionChanged: function()
        {
            //console.log('inside CategorySelectionChanged()');
            if (!this.SubCategorySelectionElement) {
                return;
            }
            // Remove options
            while (this.SubCategorySelectionElement.options.length > 0) {
                this.SubCategorySelectionElement.options.remove(0);
            }
            // Add in new options
            if (this.CategorySelectionElement.options[this.CategorySelectionElement.selectedIndex].innerHTML === 'community') {
                this.SubCategorySelectionElement.add(new Option('all', 'ccc'), null);
                this.SubCategorySelectionElement.add(new Option('activity partners', 'act'), null);
                this.SubCategorySelectionElement.add(new Option('artists', 'ats'), null);
                this.SubCategorySelectionElement.add(new Option('childcare', 'kid'), null);
                this.SubCategorySelectionElement.add(new Option('general', 'com'), null);
                this.SubCategorySelectionElement.add(new Option('groups', 'grp'), null);
                this.SubCategorySelectionElement.add(new Option('local news', 'vnn'), null);
                this.SubCategorySelectionElement.add(new Option('lost & found', 'laf'), null);
                this.SubCategorySelectionElement.add(new Option('musicians', 'muc'), null);
                this.SubCategorySelectionElement.add(new Option('pets', 'pet'), null);
                this.SubCategorySelectionElement.add(new Option('politics', 'pol'), null);
                this.SubCategorySelectionElement.add(new Option('rideshare', 'rid'), null);
                this.SubCategorySelectionElement.add(new Option('volunteers', 'vol'), null);
            }
            if (this.CategorySelectionElement.options[this.CategorySelectionElement.selectedIndex].innerHTML === 'events') {
                this.SubCategorySelectionElement.add(new Option('all', 'eve'), null);
                this.SubCategorySelectionElement.add(new Option('classes', 'ccc'), null);
                this.SubCategorySelectionElement.add(new Option('events', 'eee'), null);
            }
            if (this.CategorySelectionElement.options[this.CategorySelectionElement.selectedIndex].innerHTML === 'gigs') {
                this.SubCategorySelectionElement.add(new Option('all', 'ggg'), null);
                this.SubCategorySelectionElement.add(new Option('adult gigs', 'adg'), null);
                this.SubCategorySelectionElement.add(new Option('computer gigs', 'cpg'), null);
                this.SubCategorySelectionElement.add(new Option('creative gigs', 'crg'), null);
                this.SubCategorySelectionElement.add(new Option('crew gigs', 'cwg'), null);
                this.SubCategorySelectionElement.add(new Option('domestic gigs', 'dmg'), null);
                this.SubCategorySelectionElement.add(new Option('event gigs', 'evg'), null);
                this.SubCategorySelectionElement.add(new Option('labor gigs', 'lbr'), null);
                this.SubCategorySelectionElement.add(new Option('talent gigs', 'tlg'), null);
                this.SubCategorySelectionElement.add(new Option('writing gigs', 'wrg'), null);
            }
            if (this.CategorySelectionElement.options[this.CategorySelectionElement.selectedIndex].innerHTML === 'housing') {
                this.SubCategorySelectionElement.add(new Option('all', 'hhh'), null);
                this.SubCategorySelectionElement.add(new Option('all apartments', 'aap'), null);
                this.SubCategorySelectionElement.add(new Option('all no fee apts', 'nfa'), null);
                this.SubCategorySelectionElement.add(new Option('apts wanted', 'hou'), null);
                this.SubCategorySelectionElement.add(new Option('apts/housing for rent', 'apa'), null);
                this.SubCategorySelectionElement.add(new Option('housing swap', 'swp'), null);
                this.SubCategorySelectionElement.add(new Option('housing wanted', 'hsw'), null);
                this.SubCategorySelectionElement.add(new Option('office & commercial', 'off'), null);
                this.SubCategorySelectionElement.add(new Option('parking & storage', 'prk'), null);
                this.SubCategorySelectionElement.add(new Option('real estate (by broker)', 'reb'), null);
                this.SubCategorySelectionElement.add(new Option('real estate (by owner)', 'reo'), null);
                this.SubCategorySelectionElement.add(new Option('real estate for sale', 'rea'), null);
                this.SubCategorySelectionElement.add(new Option('real estate wanted', 'rew'), null);
                this.SubCategorySelectionElement.add(new Option('rooms & shares', 'roo'), null);
                this.SubCategorySelectionElement.add(new Option('rooms wanted', 'sha'), null);
                this.SubCategorySelectionElement.add(new Option('sublet/temp wanted', 'sbw'), null);
                this.SubCategorySelectionElement.add(new Option('sublets & temporary', 'sub'), null);
                this.SubCategorySelectionElement.add(new Option('vacation rentals', 'vac'), null);
            }
            if (this.CategorySelectionElement.options[this.CategorySelectionElement.selectedIndex].innerHTML === 'jobs') {
                this.SubCategorySelectionElement.add(new Option('all', 'jjj'), null);
                this.SubCategorySelectionElement.add(new Option('accounting/finance jobs', 'acc'), null);
                this.SubCategorySelectionElement.add(new Option('admin/office jobs', 'ofc'), null);
                this.SubCategorySelectionElement.add(new Option('art/media/design jobs', 'med'), null);
                this.SubCategorySelectionElement.add(new Option('biotech/science jobs', 'sci'), null);
                this.SubCategorySelectionElement.add(new Option('business/mgmt jobs', 'bus'), null);
                this.SubCategorySelectionElement.add(new Option('customer service jobs', 'csr'), null);
                this.SubCategorySelectionElement.add(new Option('education jobs', 'edu'), null);
                this.SubCategorySelectionElement.add(new Option('engineering jobs', 'egr'), null);
                this.SubCategorySelectionElement.add(new Option('etcetera jobs', 'etc'), null);
                this.SubCategorySelectionElement.add(new Option('government jobs', 'gov'), null);
                this.SubCategorySelectionElement.add(new Option('human resource jobs', 'hum'), null);
                this.SubCategorySelectionElement.add(new Option('internet engineering jobs', 'eng'), null);
                this.SubCategorySelectionElement.add(new Option('legal jobs', 'lgl'), null);
                this.SubCategorySelectionElement.add(new Option('marketing jobs', 'mar'), null);
                this.SubCategorySelectionElement.add(new Option('medical/healthcare jobs', 'hea'), null);
                this.SubCategorySelectionElement.add(new Option('nonprofit jobs', 'npo'), null);
                this.SubCategorySelectionElement.add(new Option('retail/food jobs', 'ret'), null);
                this.SubCategorySelectionElement.add(new Option('sales jobs', 'sls'), null);
                this.SubCategorySelectionElement.add(new Option('skilled trades jobs', 'trd'), null);
                this.SubCategorySelectionElement.add(new Option('software jobs', 'sof'), null);
                this.SubCategorySelectionElement.add(new Option('systems/networking jobs', 'sad'), null);
                this.SubCategorySelectionElement.add(new Option('tech support jobs', 'tch'), null);
                this.SubCategorySelectionElement.add(new Option('tv video radio jobs', 'tfr'), null);
                this.SubCategorySelectionElement.add(new Option('web design jobs', 'web'), null);
                this.SubCategorySelectionElement.add(new Option('writing jobs', 'wri'), null);
            }
            if (this.CategorySelectionElement.options[this.CategorySelectionElement.selectedIndex].innerHTML === 'personals') {
                this.SubCategorySelectionElement.add(new Option('all', 'ppp'), null);
                this.SubCategorySelectionElement.add(new Option('casual encounters', 'cas'), null);
                this.SubCategorySelectionElement.add(new Option('erotic services', 'ers'), null);
                this.SubCategorySelectionElement.add(new Option('men seeking men', 'm4m'), null);
                this.SubCategorySelectionElement.add(new Option('men seeking women', 'm4w'), null);
                this.SubCategorySelectionElement.add(new Option('misc romance', 'msr'), null);
                this.SubCategorySelectionElement.add(new Option('missed connections', 'mis'), null);
                this.SubCategorySelectionElement.add(new Option('rants & raves', 'rnr'), null);
                this.SubCategorySelectionElement.add(new Option('strictly platonic', 'stp'), null);
                this.SubCategorySelectionElement.add(new Option('women seeking men', 'w4m'), null);
                this.SubCategorySelectionElement.add(new Option('women seeking women', 'w4w'), null);
            }
            if (this.CategorySelectionElement.options[this.CategorySelectionElement.selectedIndex].innerHTML === 'resumes') {
                this.SubCategorySelectionElement.add(new Option('all', 'res'), null);
            }
            if (this.CategorySelectionElement.options[this.CategorySelectionElement.selectedIndex].innerHTML === 'for sale') {
                this.SubCategorySelectionElement.add(new Option('all', 'sss'), null);
                this.SubCategorySelectionElement.add(new Option('antiques', 'atq'), null);
                this.SubCategorySelectionElement.add(new Option('appliances', 'app'), null);
                this.SubCategorySelectionElement.add(new Option('arts & crafts', 'art'), null);
                this.SubCategorySelectionElement.add(new Option('auto parts', 'pts'), null);
                this.SubCategorySelectionElement.add(new Option('baby & kid stuff', 'bab'), null);
                this.SubCategorySelectionElement.add(new Option('barter', 'bar'), null);
                this.SubCategorySelectionElement.add(new Option('bicycles', 'bik'), null);
                this.SubCategorySelectionElement.add(new Option('boats', 'boa'), null);
                this.SubCategorySelectionElement.add(new Option('books', 'bks'), null);
                this.SubCategorySelectionElement.add(new Option('business', 'bfs'), null);
                this.SubCategorySelectionElement.add(new Option('cars & trucks (all)', 'cta'), null);
                this.SubCategorySelectionElement.add(new Option('cars & trucks (by dealer)', 'ctd'), null);
                this.SubCategorySelectionElement.add(new Option('cars & trucks (by owner)', 'cto'), null);
                this.SubCategorySelectionElement.add(new Option('cds / dvds / vhs', 'emd'), null);
                this.SubCategorySelectionElement.add(new Option('cell phones', 'mob'), null);
                this.SubCategorySelectionElement.add(new Option('clothing', 'clo'), null);
                this.SubCategorySelectionElement.add(new Option('collectibles', 'clt'), null);
                this.SubCategorySelectionElement.add(new Option('computers & tech', 'sys'), null);
                this.SubCategorySelectionElement.add(new Option('electronics', 'ele'), null);
                this.SubCategorySelectionElement.add(new Option('farm & garden', 'grd'), null);
                this.SubCategorySelectionElement.add(new Option('free stuff', 'zip'), null);
                this.SubCategorySelectionElement.add(new Option('furniture (all)', 'fua'), null);
                this.SubCategorySelectionElement.add(new Option('furniture (by dealer)', 'fud'), null);
                this.SubCategorySelectionElement.add(new Option('furniture (by owner)', 'fuo'), null);
                this.SubCategorySelectionElement.add(new Option('garage sales', 'gms'), null);
                this.SubCategorySelectionElement.add(new Option('general', 'for'), null);
                this.SubCategorySelectionElement.add(new Option('health and beauty', 'hab'), null);
                this.SubCategorySelectionElement.add(new Option('household', 'hsh'), null);
                this.SubCategorySelectionElement.add(new Option('items wanted', 'wan'), null);
                this.SubCategorySelectionElement.add(new Option('jewelry', 'jwl'), null);
                this.SubCategorySelectionElement.add(new Option('materials', 'mat'), null);
                this.SubCategorySelectionElement.add(new Option('motorcycles/scooters', 'mcy'), null);
                this.SubCategorySelectionElement.add(new Option('musical instruments', 'msg'), null);
                this.SubCategorySelectionElement.add(new Option('photo/video', 'pho'), null);
                this.SubCategorySelectionElement.add(new Option('recreational vehicles', 'rvs'), null);
                this.SubCategorySelectionElement.add(new Option('sporting goods', 'spo'), null);
                this.SubCategorySelectionElement.add(new Option('tickets', 'tix'), null);
                this.SubCategorySelectionElement.add(new Option('tools', 'tls'), null);
                this.SubCategorySelectionElement.add(new Option('toys & games', 'tag'), null);
                this.SubCategorySelectionElement.add(new Option('video gaming', 'vgm'), null);
            }
            if (this.CategorySelectionElement.options[this.CategorySelectionElement.selectedIndex].innerHTML === 'services') {
                this.SubCategorySelectionElement.add(new Option('all', 'bbb'), null);
                this.SubCategorySelectionElement.add(new Option('automotive services', 'aos'), null);
                this.SubCategorySelectionElement.add(new Option('computer services', 'cps'), null);
                this.SubCategorySelectionElement.add(new Option('creative services', 'crs'), null);
                this.SubCategorySelectionElement.add(new Option('event services', 'evs'), null);
                this.SubCategorySelectionElement.add(new Option('financial services', 'fns'), null);
                this.SubCategorySelectionElement.add(new Option('household services', 'hss'), null);
                this.SubCategorySelectionElement.add(new Option('labor & moving', 'lbs'), null);
                this.SubCategorySelectionElement.add(new Option('legal services', 'lgs'), null);
                this.SubCategorySelectionElement.add(new Option('lessons & tutoring', 'lss'), null);
                this.SubCategorySelectionElement.add(new Option('real estate services', 'rts'), null);
                this.SubCategorySelectionElement.add(new Option('skilled trade services', 'sks'), null);
                this.SubCategorySelectionElement.add(new Option('small biz ads', 'biz'), null);
                this.SubCategorySelectionElement.add(new Option('therapeutic services', 'ths'), null);
            }
            //console.log('exiting CategorySelectionChanged()');
        },
        
    RegionSelectionChanged: function()
        {
            //console.log('inside RegionSelectionChanged()');
            if (!this.AreaListElement) {
                return;
            }
            // Remove options
            while (this.AreaListElement.options.length > 0) {
                this.AreaListElement.options.remove(0);
            }
            // Add in new options
            for (var i = 0; i < document.datatable.length; i++) {
                if (document.datatable[i].name === this.RegionListElement.options[this.RegionListElement.selectedIndex].text) {
                    for (var ii = 0; ii < document.datatable[i].list.length; ii++) {
                        this.AreaListElement.add(new Option(document.datatable[i].list[ii].name, ''), null);
                    }
                }
            }
            document.clobject.AreaSelectionChanged();
            //console.log('exiting RegionSelectionChanged()');
        },
        
    AreaSelectionChanged: function()
        {
            //console.log('inside AreaSelectionChanged()');
            if (!this.CityListElement) {
                return;
            }
            // Remove options
            while (this.CityListElement.options.length > 0) {
                this.CityListElement.options.remove(0);
            }
            // Add in new options
            for (var i = 0; i < document.datatable.length; i++) {
                for (var ii = 0; ii < document.datatable[i].list.length; ii++) {
                    if (document.datatable[i].list[ii].name === this.AreaListElement.options[this.AreaListElement.selectedIndex].text) {
                        for (var iii = 0; iii < document.datatable[i].list[ii].list.length; iii++) {
                            this.CityListElement.add(new Option(document.datatable[i].list[ii].list[iii].name, document.datatable[i].list[ii].list[iii].url), null);
                        }
                    }
                }
            }
            //console.log('exiting AreaSelectionChanged()');
        },
        
    AddCity: function(url)
        {
            //console.log('inside AddCity()');
            // Add the desired city
            if (url) {
                if (this.SearchCitiesListElement) {
                    // Check if the city is already added
                    for (var i = 0; i < this.SearchCitiesListElement.options.length; i++) {
                        if (this.SearchCitiesListElement.options[i].value === url) {
                            return;
                        }
                    }
                    // Look for the city in the datatable
                    for (var i = 0; i < document.datatable.length; i++) {
                        for (var ii = 0; ii < document.datatable[i].list.length; ii++) {
                            for (var iii = 0; iii < document.datatable[i].list[ii].list.length; iii++) {
                                if (document.datatable[i].list[ii].list[iii].url === url) {
                                    this.SearchCitiesListElement.add(new Option(document.datatable[i].list[ii].list[iii].name, document.datatable[i].list[ii].list[iii].url), null);
                                }
                            }
                        }
                    }
                    GM_setValue('craigslist_enhancer_searchcitylist', this.GetSearchCities());
                }
            }
            // Add the selected city
            else {
                if (this.CityListElement && this.SearchCitiesListElement) {
                    for (var i = 0; i < this.CityListElement.options.length; i++) {
                        if (this.CityListElement.options[i].selected) {
                            var selectedOption = this.CityListElement.options[i];
                            this.SearchCitiesListElement.add(new Option(selectedOption.text, selectedOption.value), null);
                        }
                    }
                    GM_setValue('craigslist_enhancer_searchcitylist', this.GetSearchCities());
                }
            }
            //console.log('exiting AddCity()');
        },
        
    AddCities: function()
        {
            //console.log('inside AddCities()');
            if (this.CityListElement && this.SearchCitiesListElement) {
                for (var i = 0; i < this.CityListElement.options.length; i++) {
                    var selectedOption = this.CityListElement.options[i];
                    this.SearchCitiesListElement.add(new Option(selectedOption.text, selectedOption.value), null);
                }
                GM_setValue('craigslist_enhancer_searchcitylist', this.GetSearchCities());
            }
            //console.log('exiting AddCities()');
        },
        
    DeleteCities: function()
        {
            //console.log('inside DeleteCities()');
            if (this.SearchCitiesListElement) {
                var i = 0;
                while (i < this.SearchCitiesListElement.options.length) {
                    if (this.SearchCitiesListElement.options[i].selected) {
                        this.SearchCitiesListElement.remove(i);
                        continue;
                    }
                    i++;
                }
                GM_setValue('craigslist_enhancer_searchcitylist', this.GetSearchCities());
            }
            //console.log('exiting DeleteCities()');
        },
        
    GetSearchCities: function()
        {
            //console.log('inside GetSearchCities()');
            var searchCities = '';
            if (this.SearchCitiesListElement) {
                for (var i = 0; i < this.SearchCitiesListElement.options.length; i++) {
                    searchCities += this.SearchCitiesListElement.options[i].text + '|' + this.SearchCitiesListElement.options[i].value + ',';
                }
            }
            //console.log('exiting GetSearchCities()');
            return searchCities;
        },
        
    Insert: function()
        {
            //console.log('inside Insert()');
            var div = document.createElement('div');
            
            var titleSpan = document.createElement('span');
            titleSpan.style['fontStyle'] = 'italic';
            var title = document.createTextNode('search enhanced');
            titleSpan.appendChild(title);
            
            var selCategory = (document.getElementsByName('catAbb'))[0].cloneNode(true);
            selCategory.id = 'selCategory';
            
            var txtSearch = document.createElement('input');
            txtSearch.id = 'txtSearch';
            txtSearch.type = 'text';
            
            var btnSearch = document.createElement('input');
            btnSearch.name = 'btnSearch';
            btnSearch.type = 'button';
            btnSearch.onclick = function() { document.clobject.Setup(); };
            btnSearch.value = 'search';
            
            div.appendChild(titleSpan);
            div.appendChild(document.createElement('br'));
            div.appendChild(txtSearch);
            div.appendChild(document.createElement('br'));
            div.appendChild(selCategory);
            div.appendChild(btnSearch);
            
            //console.log('created search enhanced html elements');
            var searchForm = document.getElementById('search');
            //console.log('got search form element: ' + searchForm);
            searchForm.parentNode.insertBefore(div, searchForm);
            //console.log('inserted search enhanced html elements');
            //console.log('exiting Insert()');
        },
        
    Setup: function()
        {
            //console.log('inside Setup()');
            // self reference
            var clobject = document.clobject;
            // Search text
            var searchtext = document.getElementById('txtSearch').value;
            var searchcategory = document.getElementById('selCategory').value;
        
            while (document.body.hasChildNodes()) {
                document.body.removeChild(document.body.lastChild);
            }
            document.body.className = '';
            
            var styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.innerHTML =  'input{ width: 140px; font-family: Verdana; font-size: 10px; } ';
            styleElement.innerHTML += 'select{ width: 144px; font-family: Verdana; font-size: 10px; }';
            styleElement.innerHTML += 'a{ text-decoration: none; } ';
            styleElement.innerHTML += 'body{ font-family: Verdana; font-size: 10px; } ';
            styleElement.innerHTML += '.post { border-bottom: 1px solid #AAAAAA; font-size: 12px; min-width: 950px; } ';
            styleElement.innerHTML += '.postTitleTable { width: 100%; } ';
            styleElement.innerHTML += '.postTitleTable td { padding: 8px 0 8px 0; } ';
            styleElement.innerHTML += '.postTitle { color: #1155cc; padding: 0 0 0 8px; } ';
            styleElement.innerHTML += '.postTitleDeleted { color: #999999; } ';
            styleElement.innerHTML += '.postSubTitle { color: #999999; } ';
            styleElement.innerHTML += '.postDate { width: 150px; color: #999999; text-align: right; } ';
            styleElement.innerHTML += '.postOriginalLink { width: 18px; height: 14px; background: url("http://i.imgur.com/zBU9ObQ.png") no-repeat scroll left -4px top -1px; cursor:pointer; opacity: 0.4; } ';
            styleElement.innerHTML += '.postText { padding: 12px; display: inline-block; max-width: 600px; vertical-align: top; border-right: 1px solid #eeeeee; word-wrap: break-word; } ';
            styleElement.innerHTML += '.postPictures { padding: 12px; display: inline-block; width: 300px; vertical-align: top; word-wrap: break-word; } ';

            document.head.appendChild(styleElement);
            
            // Add title
            var titleDiv = document.createElement('div');
            titleDiv.innerHTML = 'Craigslist Enhancer <span style="font-size: 10px;"> <a href="http://www.craigslist.org">[Back to Craigslist]</a> <a href="http://userscripts.org/scripts/show/126399">[Update this script]</a></span><form style="display: inline; font-size: 10px;" id="ppform" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"><input type="hidden" name="business" value="donaldbenson@earthlink.net"><input type="hidden" name="cmd" value="_xclick"><input type="hidden" name="item_name" value="Craigslist Enhanced Search"><input type="hidden" name="item_number" value="Buy Me A Beer"><input type="hidden" name="amount" value="5.00"><input type="hidden" name="currency_code" value="USD"><a href="#" onclick="this.parentNode.submit();"> [buy me a beer!]</a></form>';
            titleDiv.style['borderBottom'] = '1px solid #999999';
            titleDiv.style['fontSize'] = '24px';
            document.body.appendChild(titleDiv);
            
            // Create fieldset
            var fieldSet = document.createElement('fieldset');
            fieldSet.id = 'searchfieldset';
            fieldSet.style['margin'] = '10px 0 0 0';
            fieldSet.style['background'] = 'none';
            fieldSet.style['border'] = '1px solid #CCCCCC';
            
            // Legend
            var legend = document.createElement('legend');
            legend.innerHTML = 'search enhanced';
            fieldSet.appendChild(legend);
            
            // Search labels
            var searchLabelDiv = document.createElement('div');
            searchLabelDiv.style['width'] = '100px';
            searchLabelDiv.style['cssFloat'] = 'left';
            var searchForLabelDiv = document.createElement('div');
            searchForLabelDiv.innerHTML = 'search for:';
            searchForLabelDiv.style['width'] = '100px';
            searchForLabelDiv.style['height'] = '22px';
            searchLabelDiv.appendChild(searchForLabelDiv);
            var searchOptionsLabelDiv = document.createElement('div');
            searchOptionsLabelDiv.innerHTML = 'options:';
            searchOptionsLabelDiv.style['width'] = '100px';
            searchOptionsLabelDiv.style['height'] = '25px';
            searchLabelDiv.appendChild(searchOptionsLabelDiv);
            var searchInLabelDiv = document.createElement('div');
            searchInLabelDiv.innerHTML = 'in:';
            searchInLabelDiv.style['width'] = '100px';
            searchInLabelDiv.style['height'] = '24px';
            searchLabelDiv.appendChild(searchInLabelDiv);
            var searchPriceLabelDiv = document.createElement('div');
            searchPriceLabelDiv.innerHTML = 'price:';
            searchPriceLabelDiv.style['width'] = '100px';
            searchPriceLabelDiv.style['height'] = '18px';
            searchLabelDiv.appendChild(searchPriceLabelDiv);
            fieldSet.appendChild(searchLabelDiv);

            // Search input
            var searchInputDiv = document.createElement('div');
            searchInputDiv.style['width'] = '292px';
            searchInputDiv.style['cssFloat'] = 'left';
            // Search Text
            var searchTextDiv = document.createElement('div');
            searchTextDiv.style['height'] = '22px';
            this.SearchTextElement = document.createElement('input');
            this.SearchTextElement.id = 'searchtext';
            this.SearchTextElement.type = 'text';
            this.SearchTextElement.style['width'] = '286px';
            this.SearchTextElement.onkeydown = function(e) {
                if (e.keyCode === 13) {
                    clobject.Search();
                }
            };
            searchTextDiv.appendChild(this.SearchTextElement);
            searchInputDiv.appendChild(searchTextDiv);
            // Option Buttons
            var searchOptionsDiv = document.createElement('div');
            searchOptionsDiv.style['height'] = '25px';
            var rad = document.createElement('input');
            rad.type = 'radio';
            rad.id = 'radtitleonly';
            rad.name = 'searchtype';
            rad.value = 't';
            rad.checked = true;
            rad.style['width'] = '10px';
            searchOptionsDiv.appendChild(rad);
            var label = document.createElement('label');
            label.innerHTML = 'title only';
            label.htmlFor = 'radtitleonly';
            label.style['marginRight'] = '8px';
            searchOptionsDiv.appendChild(label);
            rad = document.createElement('input');
            rad.type = 'radio';
            rad.id = 'radentirepost';
            rad.name = 'searchtype';
            rad.value = 'a';
            rad.style['width'] = '10px';
            searchOptionsDiv.appendChild(rad);
            label = document.createElement('label');
            label.innerHTML = 'entire post';
            label.htmlFor = 'radentirepost';
            label.style['marginRight'] = '8px';
            searchOptionsDiv.appendChild(label);
            var check = document.createElement('input');
            check.type = 'checkbox';
            check.id = 'chkhaspic';
            check.name = 'chkhaspic';
            check.style['width'] = '10px';
            searchOptionsDiv.appendChild(check);
            label = document.createElement('label');
            label.innerHTML = 'has image';
            label.htmlFor = 'chkhaspic';
            searchOptionsDiv.appendChild(label);
            searchInputDiv.appendChild(searchOptionsDiv);
            // Category Selection
            var searchCategoryDiv = document.createElement('div');
            searchCategoryDiv.style['height'] = '24px';
            this.CategorySelectionElement = document.createElement('select');
            this.CategorySelectionElement.add(new Option('community', ''), null);
            this.CategorySelectionElement.add(new Option('events', ''), null);
            this.CategorySelectionElement.add(new Option('gigs', ''), null);
            this.CategorySelectionElement.add(new Option('housing', ''), null);
            this.CategorySelectionElement.add(new Option('jobs', ''), null);
            this.CategorySelectionElement.add(new Option('personals', ''), null);
            this.CategorySelectionElement.add(new Option('resumes', ''), null);
            this.CategorySelectionElement.add(new Option('for sale', ''), null);
            this.CategorySelectionElement.add(new Option('services', ''), null);
            this.CategorySelectionElement.selectedIndex = 7;
            this.CategorySelectionElement.onchange = function() {clobject.CategorySelectionChanged();};
            searchCategoryDiv.appendChild(this.CategorySelectionElement);
            this.SubCategorySelectionElement = document.createElement('select');
            searchCategoryDiv.appendChild(this.SubCategorySelectionElement);
            searchInputDiv.appendChild(searchCategoryDiv);
            // Search price
            var searchPriceDiv = document.createElement('div');
            searchPriceDiv.style['height'] = '18px';
            this.PriceMinElement = document.createElement('input');
            this.PriceMaxElement = document.createElement('input');
            this.PriceMinElement.id = 'pricemin';
            this.PriceMaxElement.id = 'pricemax';
            this.PriceMinElement.type = 'text';
            this.PriceMaxElement.type = 'text';
            this.PriceMinElement.onkeydown = function(e) {
                if (e.keyCode === 13) {
                    clobject.Search();
                }
            };
            this.PriceMaxElement.onkeydown = function(e) {
                if (e.keyCode === 13) {
                    clobject.Search();
                }
            };
            searchPriceDiv.appendChild(this.PriceMinElement);
            searchPriceDiv.appendChild(this.PriceMaxElement);
            searchInputDiv.appendChild(searchPriceDiv);
            fieldSet.appendChild(searchInputDiv);
            
            // Region list
            var citySelectionDiv = document.createElement('div');
            citySelectionDiv.style['padding'] = '0 0 0 4px';
            citySelectionDiv.style['width'] = '436px';
            citySelectionDiv.style['cssFloat'] = 'left';
            this.RegionListElement = document.createElement('select');
            this.RegionListElement.id = 'regionlist';
            for (var i = 0; i < document.datatable.length; i++) {
                this.RegionListElement.add(new Option(document.datatable[i].name, ''), null);
            }
            this.RegionListElement.size = 7;
            this.RegionListElement.onchange = function() {clobject.RegionSelectionChanged();};
            citySelectionDiv.appendChild(this.RegionListElement);
            // Area list
            this.AreaListElement = document.createElement('select');
            this.AreaListElement.id = 'arealist';
            this.AreaListElement.size = 7;
            this.AreaListElement.onchange = function() {clobject.AreaSelectionChanged();};
            citySelectionDiv.appendChild(this.AreaListElement);
            this.RegionSelectionChanged();
            // City list
            this.CityListElement = document.createElement('select');
            this.CityListElement.id = 'citylist';
            this.CityListElement.size = 7;
            this.CityListElement.multiple = 'multiple';
            citySelectionDiv.appendChild(this.CityListElement);
            fieldSet.appendChild(citySelectionDiv);
            
            // Add City Buttons
            var cityButtonDiv = document.createElement('div');
            cityButtonDiv.style['padding'] = '32px 0 0 0';
            cityButtonDiv.style['width'] = '140px';
            cityButtonDiv.style['cssFloat'] = 'left';
            var button = document.createElement('input');
            button.type = 'button';
            button.id = 'btnaddcity';
            button.value = 'add >';
            button.onclick = function() {clobject.AddCity();};
            cityButtonDiv.appendChild(button);
            cityButtonDiv.appendChild(document.createElement('br'));
            button = document.createElement('input');
            button.type = 'button';
            button.id = 'btnaddallcities';
            button.value = 'add all >>';
            button.onclick = function() {clobject.AddCities();};
            cityButtonDiv.appendChild(button);
            fieldSet.appendChild(cityButtonDiv);
            
            // Search Cities list
            var searchCitiesDiv = document.createElement('div');
            searchCitiesDiv.style['width'] = '146px';
            searchCitiesDiv.style['cssFloat'] = 'left';
            searchCitiesDiv.appendChild(document.createTextNode('Search in these cities:'));
            searchCitiesDiv.appendChild(document.createElement('br'));
            this.SearchCitiesListElement = document.createElement('select');
            this.SearchCitiesListElement.id = 'searchcitylist';
            this.SearchCitiesListElement.size = 6;
            this.SearchCitiesListElement.multiple = 'multiple';
            this.SearchCitiesListElement.onkeydown = function(e) {
                if (e.keyCode === 46) {
                    clobject.DeleteCities();
                }
            };
            searchCitiesDiv.appendChild(this.SearchCitiesListElement);
            fieldSet.appendChild(searchCitiesDiv);
            
            // Search button
            var searchButtonDiv = document.createElement('div');
            searchButtonDiv.style['width'] = '140px';
            searchButtonDiv.style['cssFloat'] = 'left';
            var searchButton = document.createElement('input');
            searchButton.type = 'button';
            searchButton.value = 'search';
            searchButton.style['height'] = '88px';
            searchButton.onclick = function() { clobject.Search(); };
            searchButtonDiv.appendChild(searchButton);
            fieldSet.appendChild(searchButtonDiv);
            
            document.body.appendChild(fieldSet);
            
            this.SearchResultsDiv = document.createElement('div');
            this.SearchResultsDiv.id = 'searchresults';
            document.body.appendChild(this.SearchResultsDiv);
            
            this.SearchResults = [];
            
            // Load resources (search gif)
            if (!this.SearchGifElement) {
                var div = document.createElement('div');
                var img = document.createElement('img');
                img.src = GM_getResourceURL('res_searchgif');
                div.appendChild(img);
                div.style.textAlign = 'center';
                this.SearchGifElement = div;
            }
            
            // Load search options
            if (searchtext !== '')
                this.SearchTextElement.value = searchtext;
            else if (GM_getValue('craigslist_enhancer_searchtext'))
                this.SearchTextElement.value = GM_getValue('craigslist_enhancer_searchtext');
            if (GM_getValue('craigslist_enhancer_searchtype')) {
                if (GM_getValue('craigslist_enhancer_searchtype') === 'T') {
                    document.getElementById('radtitleonly').checked = true;
                    document.getElementById('radentirepost').checked = false;
                }
                else {
                    document.getElementById('radtitleonly').checked = false;
                    document.getElementById('radentirepost').checked = true;
                }
            }
            if (GM_getValue('craigslist_enhancer_haspic'))
                document.getElementById('chkhaspic').checked = GM_getValue('craigslist_enhancer_haspic') === 1;
            if (searchcategory != '') {
                this.CategorySelectionElement.value = searchcategory;
                this.CategorySelectionChanged();
            }
            else if (GM_getValue('craigslist_enhancer_category')) {
                this.CategorySelectionElement.value = GM_getValue('craigslist_enhancer_category');
                if (GM_getValue('craigslist_enhancer_subcategory'))
                    this.SubCategorySelectionElement.value = GM_getValue('craigslist_enhancer_subcategory');
            }
            if (GM_getValue('craigslist_enhancer_pricemin'))
                this.PriceMinElement.value = GM_getValue('craigslist_enhancer_pricemin');
            if (GM_getValue('craigslist_enhancer_pricemax'))
                this.PriceMaxElement.value = GM_getValue('craigslist_enhancer_pricemax');
            if (GM_getValue('craigslist_enhancer_searchcitylist')) {
                var cities = GM_getValue('craigslist_enhancer_searchcitylist').split(',');
                for (var i = 0; i < cities.length - 1; i++) { // last in the list is empty
                    var city = cities[i].split('|');
                    this.SearchCitiesListElement.add(new Option(city[0], city[1]), null);
                }
            }
            if (GM_getValue('craigslist_enhancer_viewedlinks'))
                this.ViewedLinks = GM_getValue('craigslist_enhancer_viewedlinks').split('|');
            else
                this.ViewedLinks = [];
            
            // Load the current city
            this.AddCity(window.location.href);
            
            // Perform the search
            if (this.SearchTextElement.value.trim() != '' && this.SearchCitiesListElement.options.length > 0) {
                this.Search();
            }
            //console.log('exiting Setup()');
        },
        
    Search: function()
        {
            //console.log('inside Search()');
            // Gather options
            var searchType = (document.getElementById('radtitleonly').checked) ? 'T' : 'A';
            var hasPic = (document.getElementById('chkhaspic').checked) ? 1 : 0;
            // Clear search results
            this.SearchResults.splice(0, this.SearchResults.length);
            this.SearchResultsDiv.innerHTML = "";
            // Append the search gif
            this.SearchResultsDiv.appendChild(this.SearchGifElement);
            // Loop through cities and fire of searches
            this.NumberOfSearchRequests = this.SearchCitiesListElement.options.length;
            this.NumberOfResponsesReceived = 0;
            var searchCityList = '';
            for (var i = 0; i < this.SearchCitiesListElement.options.length; i++) {
                var address = this.SearchCitiesListElement.options[i].value + 'search/?' + 'catAbb=' + this.SubCategorySelectionElement.value + '&query=' + escape(this.SearchTextElement.value) + '&srchType=' + searchType + '&minAsk=' + escape(this.PriceMinElement.value) + '&maxAsk=' + escape(this.PriceMaxElement.value) + '&hasPic=' + hasPic + '&format=rss';
                searchCityList += this.SearchCitiesListElement.options[i].text + '|' + this.SearchCitiesListElement.options[i].value + ',';
                GM_xmlhttpRequest({
                    method: 'get',
                    url: address,
                    onload: function(response) {document.clobject.SearchResultsReceived(response);}
                });
            }
            // If search cities is empty
            if (this.SearchCitiesListElement.options.length == 0) {
                this.SearchResultsDiv.innerHTML = '<center>Please add at least one city to search in.</center>';
                document.onkeydown = undefined;
            }
            // Save search options
            GM_setValue('craigslist_enhancer_searchtext', this.SearchTextElement.value);
            GM_setValue('craigslist_enhancer_searchtype', searchType);
            GM_setValue('craigslist_enhancer_haspic', hasPic);
            GM_setValue('craigslist_enhancer_category', this.CategorySelectionElement.value);
            GM_setValue('craigslist_enhancer_subcategory', this.SubCategorySelectionElement.value);
            GM_setValue('craigslist_enhancer_pricemin', this.PriceMinElement.value);
            GM_setValue('craigslist_enhancer_pricemax', this.PriceMaxElement.value);
            GM_setValue('craigslist_enhancer_searchcitylist', searchCityList);
            //console.log('exiting Search()');
        },
        
    SearchResultsReceived: function(response)
        {
            //console.log('inside SearchResultsReceived()');
            var xmlDoc = this.ParseXML(response.responseText);
            var items = xmlDoc.getElementsByTagName('item');
            for (var i = 0; i < items.length; i++) {
                // Get the post information
                var rsstitle = items[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
                var description = items[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
                var link = items[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;
                // Search query rss it not returning date
                var date = Date.now();
                var dateTags = items[i].getElementsByTagName('dc:date');
                if (dateTags.length > 0) {
                    var dateTag = dateTags[0];
                    if (dateTag.childNodes.length > 0) {
                        date = dateTag.childNodes[0].nodeValue;
                    }
                }
                // Create post object
                this.SearchResults.push(
                    new postObject(
                        rsstitle, description, link, date, this.PreviouslyViewed(link)));
            }
            // When we've received all the search responses
            if (this.NumberOfSearchRequests == (++this.NumberOfResponsesReceived)) {
                // Remove search gif
                this.SearchResultsDiv.innerHTML = "";
                // Check for results
                if (this.NumberOfSearchRequests > 0) {
                    // Sort array
                    this.SearchResults.sort(this.SearchResultsSort);
                    // Display
                    for (var i = 0; i < this.SearchResults.length; i++) {
                        this.DisplaySearchResult(this.SearchResults[i], this.SearchResultsDiv);
                    }
                    // If search results is empty
                    if (this.SearchResults.length == 0) {
                        this.SearchResultsDiv.innerHTML = '<center>No results found.</center>';
                    }
                    // Insert key down event
                    document.onkeydown = function(e) {
                        if (e.keyCode === 38 ) { // up
                            document.clobject.MoveUp();
                        }
                        if (e.keyCode === 40 ) { // down
                            document.clobject.MoveDown();
                        }
                    };
                }
            }
            //console.log('exiting SearchResultsReceived()');
        },
    
    PreviouslyViewed: function(link)
        {
            for (var i = 0; i < this.ViewedLinks.length; i++) {
                if (this.ViewedLinks[i] == link) {
                    return true;
                }
            }
            return false;
        },
    
    ParseXML: function(responseText)
        {
            //console.log('inside ParseXML()');
            var xmlDoc;
            if (window.DOMParser)
            {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(responseText,"text/xml");
            }
            else // Internet Explorer
            {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async=false;
                xmlDoc.loadXML(responseText);
            }
            //console.log('exiting ParseXML()');
            return xmlDoc;
        },
    
    ParseTitle: function(text)
        {
            //console.log('inside ParseTitle()');
            if (text.indexOf("(") > 0) {
                var regex = /^([^\(]*)/;
                var match = regex.exec(text);
                //console.log('exiting ParseTitle()');
                return match[1];
            }
            else if (text.indexOf("$") > 0) {
                var regex = /^([^\$]*)/;
                var match = regex.exec(text);
                //console.log('exiting ParseTitle()');
                return match[1];
            }
            else {
                //console.log('exiting ParseTitle()');
                return text;
            }
        },
        
    ParseLocation: function(text)
        {
            //console.log('inside ParseLocation()');
            if (text.indexOf("(") > 0) {
                var regex = /^[^\(]*(\([^\)]*\))/;
                var match = regex.exec(text);
                //console.log('exiting ParseLocation()');
                return match[1];
            }
            else {
                //console.log('exiting ParseLocation()');
                return "(no location)";
            }
        },
    
    ParsePrice: function(text)
        {
            //console.log('inside ParsePrice()');
            if (text.indexOf("$") > 0) {
                var regex = /^[^\$]*(\$[0-9]*)/;
                var match = regex.exec(text);
                //console.log('exiting ParsePrice()');
                return match[1];
            }
            else {
                //console.log('exiting ParsePrice()');
                return "$no price";
            }
        },
        
    SearchResultsSort: function(a, b)
        {
            if (!a.viewed && !b.viewed) {
                if (a.date < b.date) return 1;
                if (a.date > b.date) return -1;
                if (a.date == b.date) return 0;
            }
            if (a.viewed && b.viewed) {
                if (a.date < b.date) return 1;
                if (a.date > b.date) return -1;
                if (a.date == b.date) return 0;
            }
            if (a.viewed && !b.viewed) {
                return 1;
            }
            if (!a.viewed && b.viewed) {
                return -1;
            }
        },
        
    DisplaySearchResult: function(post, parent)
        {
            var div = document.createElement('div');
            div.className = 'post';
            
            var titleDiv = document.createElement('div');
            if (post.viewed)
                titleDiv.style['backgroundColor'] = '#eeeeee';
            
            var titleTable = document.createElement('table');
            titleTable.className = 'postTitleTable';
            var tbody = document.createElement('tbody');
            var tr = document.createElement('tr');
            titleTable.appendChild(tbody);
            tbody.appendChild(tr);
            
            var td = document.createElement('td');
            var titleSpan = document.createElement('span');
            titleSpan.className = 'postTitle';
            titleSpan.innerHTML = post.title;
            td.appendChild(titleSpan);
            
            var subTitleSpan = document.createElement('span');
            subTitleSpan.className = 'postSubTitle';
            subTitleSpan.innerHTML = ' - ' + post.subtitle;
            td.appendChild(subTitleSpan);
            tr.appendChild(td);
            
            td = document.createElement('td');
            td.className = 'postDate';
            td.innerHTML = post.date.toDateString();
            
            tr.appendChild(td);
            
            td = document.createElement('td');
            var link = document.createElement('div');
            link.className = 'postOriginalLink';
            link.onclick = function(e) {
                window.open(post.link);
                if (!e) var e = window.event
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();
            };
            td.appendChild(link);
            td.style['width'] = '14px';
            tr.appendChild(td);
            
            titleDiv.appendChild(titleTable);
            div.appendChild(titleDiv);
            
            div.infoDiv = document.createElement('div');
            div.appendChild(div.infoDiv);
            
            div.open = false;
            div.link = post.link;
            div.titleDiv = titleDiv;
            div.titleSpan = titleSpan;
            
            titleDiv.onclick = function() {
                if (!div.open)
                    document.clobject.OpenDiv(div);
                else
                    document.clobject.CloseDiv(div);
            }
            
            parent.appendChild(div);
        },
    
    OpenDiv: function(div)
        {
            //console.log('inside OpenDiv()');
            div.infoDiv.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;loading...';
            this.PushViewed(div.link);
            GM_xmlhttpRequest({
                method: 'get',
                url: div.link,
                onload: function(response) {document.clobject.InnerInformationReceived(response, div);}
            });
            div.open = true;
            //console.log('exiting OpenDiv()');
        },
        
    CloseDiv: function(div)
        {
            //console.log('inside CloseDiv()');
            div.infoDiv.innerHTML = '';
            div.open = false;
            //console.log('exiting CloseDiv()');
        },
    
    InnerInformationReceived: function(response, div)
        {
            //console.log('inside InnerInformationReceived()');
            var lastDiv = document.clobject.LastSelectedDiv;
            if (lastDiv && lastDiv != div) {
                document.clobject.CloseDiv(lastDiv);
            }
            
            div.titleDiv.style['backgroundColor'] = '#eeeeee';
            div.infoDiv.innerHTML = '';
            
            var deletedRegex = /<h2>This posting has been deleted by its author.<\/h2>/;
            var matchDeleted = deletedRegex.exec(response.responseText);
            var removedRegex = /<h2>This posting has been flagged for removal\. <a[^>]*>[^<]*<\/a><\/h2>/;
            var matchRemoved = removedRegex.exec(response.responseText);
            if (matchDeleted || matchRemoved) {
                div.titleSpan.innerHTML = 'deleted/removed';
                div.titleSpan.className = 'postTitleDeleted';
                div.titleDiv.onclick = undefined;
                return;
            }
            
            var postTextDiv = document.createElement('div');
            postTextDiv.className = 'postText';
            
            var userbodyRegex = /<section id="postingbody">([^]*)<\/section>[^<]*<section class="cltags">/;
            var match = userbodyRegex.exec(response.responseText);
            if (match) {
                var text = match[1];
                text = text.replace(/<img[^>]*>/g, '');
                text = text.replace(/<\/?font[^>]*>/g, '');
                text = text.replace(/<\/?center[^>]*>/g, '');
                text = text.replace(/<\/?hr[^>]*>/g, '');
                text = text.replace(/<table[^>]*>/g, '<table>');
                text = text.replace(/<td[^>]*>/g, '<td>');
                // Remove new script
                text = text.replace(/<!--/g, '');
                text = text.replace(/-->/g, '');
                text = text.replace(/<script[^>]*>[^<]*<\/script>/g, '');
                text = text.replace(/<div class="tn"[^>]*>[^<]*<a[^>]*>[^<]*<\/a>[^<]*<\/div><br>/g, '');
                text = text.replace(/<div id="iwt"[^>]*>[^<]*<\/div>/g, '');
                text = text.replace(/<div id="ci"[^>]*>([^<]*<span>[^<]*<\/span>)?[^<]*<\/div>/g, '');
                text = text.replace(/<div class="iw"[^>]*>[^<]*<\/div>/g, '');
                // Replace garbage text at end of post - not ready yet... not sure how to identify this, maybe switch to DOM parsing instead of regex
                //text = text.replace(/<br>[^<]<br>[^<]<br>(?:[^<]*(?:<br>)*)*$/, '');
                // Replace multiple break lines
                text = text.replace(/<br>[^<]<br>[^<]<br>/g, '');
                postTextDiv.innerHTML = text;
            }
            
            var postPictureDiv = document.createElement('div');
            postPictureDiv.className = 'postPictures';
            var paragraphElement = document.createElement('p');
            postPictureDiv.appendChild(paragraphElement);
            
            var imageRegex = /<a href="(http:\/\/images.craigslist.org[^"]*)"[^>]*>/g;
            while (match = imageRegex.exec(response.responseText)) {
                var image = document.createElement('img');
                image.style['width'] = '60px';
                image.style['height'] = '60px';
                image.src = match[1];
                paragraphElement.appendChild(image);
            }
            
            div.infoDiv.appendChild(postTextDiv);
            div.infoDiv.appendChild(postPictureDiv);
            
            if (!this.IsVisible(div))
                div.scrollIntoView();
            
            document.clobject.LastSelectedDiv = div;
            //console.log('exiting InnerInformationReceived()');
        },
    
    PushViewed: function(link)
        {
            //console.log('inside PushViewed()');
            this.ViewedLinks.push(link);
            if (this.ViewedLinks.length > 1000) {
                this.ViewedLinks.splice(1000, this.ViewedLinks.length - 1000);
            }
            GM_setValue('craigslist_enhancer_viewedlinks', this.ViewedLinks.join('|'));
            //console.log('exiting PushViewed()');
        },
        
    IsVisible: function(element)
        {
            //console.log('inside IsVisible()');
            var scrollTop = 0;
            if (window.pageYOffset)
                scrollTop = window.pageYOffset;
            else
                scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                
            var elementY = 0;
            while(!!element && element.tagName.toLowerCase() !== "body") {
                elementY += element.offsetTop;
                element = element.offsetParent;
            }
            
            //console.log('exiting IsVisible()');
            return (elementY > scrollTop);
        },
        
    MoveUp: function()
        {
            //console.log('inside MoveUp()');
            if (this.LastSelectedDiv) {
                if (this.LastSelectedDiv.previousSibling && this.LastSelectedDiv.previousSibling.className == 'post') {
                    this.CloseDiv(this.LastSelectedDiv);
                    this.OpenDiv(this.LastSelectedDiv.previousSibling);
                    this.LastDiv = this.LastSelectedDiv.previousSibling;
                }
            }
            //console.log('exiting MoveUp()');
        },
        
    MoveDown: function()
        {
            //console.log('inside MoveDown()');
            if (this.LastSelectedDiv) {
                if (this.LastSelectedDiv.nextSibling && this.LastSelectedDiv.nextSibling.className == 'post') {
                    this.CloseDiv(this.LastSelectedDiv);
                    this.OpenDiv(this.LastSelectedDiv.nextSibling);
                    this.LastDiv = this.LastSelectedDiv.nextSibling;
                }
            }
            //console.log('exiting MoveDown()');
        },
        
    WindowWidth: function()
        {
            //console.log('WindowWidth()');
            if (document.width) {
                return document.width;
            }
            else if (window.innerWidth) {
                return window.innerWidth;
            }
            else if (document.documentElement && document.documentElement.clientWidth) {
                return document.documentElement.clientWidth;
            }
        },

    WindowHeight: function()
        {
            //console.log('WindowHeight()');
            if (window.innerHeight) {
                return window.innerHeight;
            }
            else if (document.height) {
                return document.height;
            }
            else if (document.documentElement && document.documentElement.clientHeight) {
                return document.documentElement.clientHeight;
            }
        }
};

document.clobject.Insert();