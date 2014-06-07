// ==UserScript==
// @name           Enhanced Reddit Submit Page
// @namespace      reddit.com
// @description    Enhance the Reddit submission dialog
// @include        http://www.reddit.com/r/*/submit
// @include        http://www.reddit.com/submit*
// @author         violentacrez
// ==/UserScript==

/*
2010-02-04
  Initial version
  Replace the default suggested reddits with my own list of reddits
  Modify to work with Imgur submit
2010-06-13
  Split reddits into groups
  Moved linkbuilder into function
*/

function buildLines( blockTitle, redditArray )
{
  var before = '<ul><li><b>' + blockTitle + '</b></li>';
  var after = '</ul><hr>';
  var redditLinks = before;
  for (var i=0; i < redditArray.length; i++) {
    redditLinks += '<li><a href="#" tabindex="100" onclick="set_sr_name(this); return false">';
    redditLinks += redditArray[i];
    redditLinks += '</a>&#32;</li>';
  };
  redditLinks += after;
  return redditLinks;
}

(function() {

// Add your favorite reddits here

var redditsAnythingGoes = [
  'AnythingGoesFunny'
  ];
var redditsCommon = [
  'Ass' ,'Boobies' , 'gaolbait', 'buttsex' ,'Celebs' ,'faces','Fugly','ginger', 'hardbodies'
  ,'LegalTeens'  ,'mandingo' ,'milf','Models','MuscleGirls' ,'penis' ,'RealGirls'
  ,'starlets', 'tgirls', 'thick' ,'violentacrez' ,'Wallpaper' ,'WomenofColour'
  ];
var redditsLessCommon = [
  'asshole' ,'buttsharpies', 'MaleModels' ,'PrettyGirls' ,'SexyAthletes', 'Sorayama', 'teengirls','chestybait','Playboy'
  ];
var redditsMainstream = [
  'CSSLibrary', 'ChoppedPenis', 'SaayaIrie', 'TheHenselTwins', 'Collared', 'Bad_Cop_No_Donut' ,'Dallas' ,'FoundArt' ,'HelloKitty','ReportTheSpammers' ,'southcarolina',
  'Bachmann2012','Perry2012','Romney2012','HealthCare','Crime','ShoePorn',
  'GlobalWarming','diabetes','abortion','KateMiddleton','JordanCarver','SexyAthletes',
  'Alternative_Music' ,'Archaeology' ,'Bad_Cop_No_Donut' ,'BigPharma', 'Womens_Rights',
  'atheism' ,'cancer' ,'censorship', 'cogsci' ,'corruption' ,'cyberlaws' ,'design' ,'economics',
  'economy' ,'entertainment' ,'environment' ,'europe' ,'fibro' ,'gay' ,'gaza',
  'geek' ,'gossip' ,'green' ,'health' ,'history' ,'hot' ,'immigration','justice',
  'ladyboners' ,'lgbt' ,'military' ,'movies' ,'nature' ,'news' ,'nsfw_wtf',
  'offbeat' ,'parenting' ,'pics' ,'politics' ,'rape' ,'science' , 'Sorayama', 'starvin_marvins' ,'technology',
  'television' ,'terrorism' ,'trueblood' ,'unitedkingdom' ,'vintage' ,'westbank',
  'worldnews' ,'worldpolitics'
  ];
var redditsNew = [
  'DeadPeople', 'BeatingWomen', 'AngieVarona' ,'GentlemanBoners',  'BridgetRegan', 
  'VAFanClub', 'CelebFakes', 'Gravure','AsianHotties', 'LadyBoners', 
    'EllyTranHa', 'Kokopelli', 'BurnVictims', 'ElleFanning', 'VictoriaJustice', 
  'AimeeTeegarden', 'EmmaStone', 'ClopClop', 'HappyGirls','Alternative_Music','Playboy','FistInMouth',
  'GirlsinStripedSocks','GirlsinPinkUndies','GirlsinSchoolUniforms','GirlsinLaceFishnets','GirlsWithBigGuns','GirlsInDiapers'
  ];

var redditsCelebs = [
  'ChristinaHendricks' ,'ChristinaRicci','DakotaFanning' ,'ElleFanning','EmmaWatson' ,'KatyPerry' ,'MichelleTrachtenberg'
  ,'MileyCyrus' ,'ZooeyDeschanel' ,'CelebrityWallpaper', 'ChloeMoretz', 'SelenaGomez'
  ];
var redditsTrolls = [
  'creepy' ,'fatties' ,'gape' ,'gore' ,'scarred' ,'sick',
  'Bad_Israel_No_Donut' ,'blasphemy'  ,'fuckhead'
  ,'incest' ,'justmean' ,'misogyny' ,'Niggaz'
  ,'PicsOfDeadKids' ,'Pricks' ,'rape' ,'retards'
  ,'WhineyBitch'
  ];
var redditsNeedsWork = [
  'CollegeSluts' ,'facials' ,'FrenchMaid' ,'GirlsKissing'
  ,'GirlsWithGlasses' ,'GothSluts' ,'HighHeels' ,'HotAmputees'
  ,'HotChicksWithTattoos' ,'ManLove' ,'MidgetSmut' ,'Panties' ,'PigTails'
  ,'PornStars' ,'PortalPorn', 'SceneGirls' ,'TanLines' ,'VintageErotica'
  ,'VolleyballGirls' ,'WomenInUniform'
  ,'SexyButNotPorn' ,'ShinyPorn' ,'SnowGirls'
  ];
var redditsRemainder = [
  'africans' ,'AnimatedGIF' ,'beach' ,'blondes', 'bodymods' ,'bondage' ,'corsets'
  ,'EroticArt' ,'eyes'  ,'Fellatio' ,'fisting' ,'flexi'
  ,'futanari' ,'gilf' ,'gymnasts'  ,'kinky'
  ,'legs' ,'lingerie'  ,'piercing' ,'pregnant' ,'sappho' ,'smokin'
  ,'vagina' ,'Waif' ,'WebCam'
  ];

  var myDiv = document.getElementById('suggested-reddits');
  var redditLinks = "";

  redditLinks += buildLines('Anything Goes', redditsAnythingGoes);
  redditLinks += buildLines('Most Common', redditsCommon);
  redditLinks += buildLines('Celebrities', redditsCelebs);
  redditLinks += buildLines('Less Common', redditsLessCommon);
  redditLinks += buildLines('Mainstream', redditsMainstream);
  redditLinks += buildLines('New', redditsNew);
  redditLinks += buildLines('Trolls', redditsTrolls);
  redditLinks += buildLines('Needs Work', redditsNeedsWork);
  redditLinks += buildLines('the rest', redditsRemainder);

  myDiv.innerHTML = redditLinks;

  document.getElementById('sr-autocomplete').value = "";

})();
