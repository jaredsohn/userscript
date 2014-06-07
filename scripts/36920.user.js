// ==UserScript==
// @name           Coup D' Bungie
// @namespace      http://www.example.com/
// @description    Nondesript
// @include        http://*bungie.net/Forums/posts.aspx*
// @include        http://*bungie.net/fanclub/*Forums/posts.aspx*
// ==/UserScript==


// Created By: CAVX, Editing/Cookies: LittleRat, Optimizing: Sprool
//Extenders
Array.prototype.contains = function(uda_Element)
{
    for (var udv_I = 0; udv_I < this.length; udv_I++)
    {
        if (this[udv_I] === uda_Element)
        {
            return true;
        }
    }
    return false;
};

var udv_PosterIdArray = [];
var udv_PostElementArray = [];
var udv_UserAvatarElementArray = [];
var udv_DebugAlertCurrent = 1;
var udv_DisplayTitleBarImages = false;
var udv_UserData = [
    // [0]UserName, [1]UserTitle, [2]UserTitleColor, [3]UserBarImage, [4]UserBarBackgroundColor, [5]UserBarBorderColor, [6]UserPostColor, [7]UserAvatarImage, [8] OPTIONAL UserAvatarImageHeight
	["llllIII", "The CUG SuperIntendent", "#FFFFF", "", "#000000", "#FFFFFF", "#83B164", "http://i110.photobucket.com/albums/n85/Mahrunes/SuperGod.jpg"],
    ["S3NATOR", "Senatorialpwnage", "", "http://img.photobucket.com/albums/v640/Senator24/Halo/test.jpg", "#000000", "#9ACD32", "#9ACD32", "http://img.photobucket.com/albums/v640/Senator24/Halo/halo3emblemashx.jpg"],
    ["The Benergizer", "Prodigy Child", "#66CCFF", "http://pics.homere.jmsp.net/t_24/64x64/CtnWms1059058997.gif", "#000000", "#0044FF", "#0044FF", "http://i181.photobucket.com/albums/x263/thebenergizer/General/BlueBall.jpg"],
    ["CostlyAxis", "Geo Emerald", "#33ff33", "http://i246.photobucket.com/albums/gg94/CostlyAxis/NewTitleBar3.png", "#006600", "#006600", "#009900", "http://i246.photobucket.com/albums/gg94/CostlyAxis/Avatars/ChiefyAv.png"],
    ["Rokit", "Vida en dicha", "", "", "#705C0D", "#FFD224", "#FFD224", "http://img379.imageshack.us/img379/103/avataraspxtk5.jpg"],
    ["K1RK H4MM3T", "Epic Member", "", "", "#705c0d", "#ffd224", "#ffd224", "http://upload.wikimedia.org/wikipedia/en/5/55/Hk_logo.PNG"],
    ["Bornswavia", "Ninja", "", "http://i207.photobucket.com/albums/bb127/Bornswavia/Ninjatitlebar.jpg", "#DBDBDB", "#ffffFF", "#ffffFF", "http://i189.photobucket.com/albums/z293/Pheonix092/Ninjas_by_cosmospixelkitty.gif"],
    ["Feanor", "Custodian", "#83b164 ", "", "#394a2e", "#83b164 ", "#83b164 ", "http://www.jjcleanteam.com/images/54_janitor_qfz0.gif"],
    ["ZayneHumphrey", "Can't Touch This", "", "", "#000000", "#ffffff", "#ffffff", "http://img301.imageshack.us/img301/6283/blurrbs1.jpg"],
    ["Blahoo", "SCT Webmaster", "", "http://img514.imageshack.us/img514/4472/blahoobar3gl5.jpg", "#000000", "#BBBBBB", "#BBBBBB", "http://i272.photobucket.com/albums/jj196/BL4H00G4N4/bavatar2.jpg"],
    ["ninja panda", "Ninja in Remission", "", "", "#3B5323", "#629632", "#629632", "http://betterthanhuman.files.wordpress.com/2007/07/panda-final-copy.jpg"],
    ["SonicJohn", "Webcam MVP", "#FFFFFF", "http://img58.imageshack.us/img58/719/backbaryx9.gif", "#FF0000", "#00BBFF", "#00BBFF", "http://img242.imageshack.us/img242/7254/sonicjohnnewxv7.gif"],
    ["Saint of Taint", "Way too Brutal...", "", "", "#320036", "#FFFF00", "#FFFF00", "http://babacoul.chez-alice.fr/BROLLY_SCREAM.JPG"],
    ["WalkinBonfire", "Bon-Bon", "", "", "#660000", "#FF3D0D", "#FF3D0D", "http://i76.photobucket.com/albums/j15/headonfire/Awesome_rrod.jpg"],
    ["BxR Twister", "Bungie.net Juggernaut", "", "", "#000000", "#616AFF", "#616AFF", "http://i56.photobucket.com/albums/g178/Pr1v4t3/The_final_jug.gif"],
    ["muffin man one", "Distributor of baked goodness", "", "", "#563324", "#CA9B81", "#CA9B81", "http://i156.photobucket.com/albums/t17/the-muffin-man-2007/reicel-1.jpg"],
    ["pimp33", "Rofl on my waffle", "", "", "#705c0d", "#ffd224", "#ffd224", "http://216.110.75.109/pimp3346648073b4ce4.jpg"],
    ["A Celtic Tiger", "Tankman", "", "http://i300.photobucket.com/albums/nn3/A_Celtic_Tiger/Bnet_customtitlebar.gif", "#000000", "#FFE303", "#FFE303", "http://i300.photobucket.com/albums/nn3/A_Celtic_Tiger/Bnet_avatarcustom.gif"],
    ["ShadowF0X", "Loves Lamp", "", "", "#394a2e", "#83b164", "#83b164", "http://i231.photobucket.com/albums/ee23/JadedRebellion/hypnotoad5uf.gif"],
    ["The Sage of Halo", "Dread Knight", "", "http://i95.photobucket.com/albums/l121/kodyack/banner.jpg", "#FF9900", "#FF9900", "#FF9900", "http://i95.photobucket.com/albums/l121/kodyack/AVATAR.jpg"],
    ["ElDude95", "Zealot", "", "http://i281.photobucket.com/albums/kk208/Eldude95/Avatars/background_phixr.jpg", "#000000", "#339900", "#339900", "http://i281.photobucket.com/albums/kk208/Eldude95/Avatars/elite_1024_phixr.jpg"],
    ["ChrisCross", "Se7en", "", "http://i3.photobucket.com/albums/y76/HeartU/Experiencebanner1.jpg", "#000000", "#9966CC", "#9966CC", "http://pinataisland.info/forum/image.php?u=9&dateline=1173825197"],
    ["Duck duck DEATH", "The Lord of Dance", "", "", "#4D0085", "#9900ff", "#9900ff", "http://i249.photobucket.com/albums/gg201/DuckduckDEATH/55720250vi4.jpg"],
    ["Caboose3729", "Daxter", "", "", "#336633", "#E0E0E3", "#E0E0E3", "http://s208.photobucket.com/albums/bb38/eheheheh/th_DaxterIcon.jpg"],
    ["th3m4dblimp3r", "Silent Walrus", "#000000", "http://i26.photobucket.com/albums/c110/themadblimper/lightning3.jpg", "#000000", "#A7BEDA", "#A7BEDA", "http://i26.photobucket.com/albums/c110/themadblimper/avatar2.jpg"],
    ["xXAmozonessXx", "Polymath", "", "", "#000000", "#00FF33", "#00FF33", "http://img.timeinc.net/time/2007/style_design/images/sd_opener.jpg"],
    ["Kamatzu", "Master Exploder", "", "", "#103349", "#568AE1", "#568AE1", "http://img.photobucket.com/albums/v216/Kamatzu/KamAvy.gif"],
    ["Stephen_Colbert", "God of the Iced Cream", "", "http://geocities.com/damncommies/bar4.jpg", "#000000", "#FFFFCC", "#FFFFCC", "http://geocities.com/damncommies/StephenColbert.JPG"],
    ["BeaverMonkey", "The Beaver", "", "", "#000099", "#0099CC", "#0099CC", "http://www.seattletoursaver.com/images/beta.seattletoursaver.com/Image/Mariners-web-logo.jpg"],
    ["RtG Electric", "Master Of Coolness", "", "", "#000033", "#333399", "#333399", "http://tbn0.google.com/images?q=tbn:Hk1gV2EA6XD3aM:http://www.123webs.com/info/images/goat-ears.jpg"],
    ["SK CRISIS", "Orbital Drop Shock Trooper", "", "http://i268.photobucket.com/albums/jj6/SK_CRISIS/Avatars/SKTitleBar_01.gif", "#1e241a", "#91a661", "#91a661", "http://i268.photobucket.com/albums/jj6/SK_CRISIS/Avatars/CustomAvatar_03.gif"],
    ["SpArTaNo9", "ONI", "", "http://i305.photobucket.com/albums/nn205/SpArTaNo9/titlebar1.png?t=1214502499", "#000000", "#FFFF00", "#FFFF00", "http://halo.necedemalis.net/EmblemMarathon.png"],
    ["Bumpityboo", "Static", "", "http://i203.photobucket.com/albums/aa259/lordpain93/wow.gif", "#000000", "#FFFFFF", "#FFFFFF", "http://i246.photobucket.com/albums/gg94/CostlyAxis/Stickman.gif"],
    ["hastypickle1", "A Hasty Pickle", "#9b3431", "http://i237.photobucket.com/albums/ff101/Hastypickle1/MyTitle.jpg", "#5886d3", "#ffffff", "#5a741b", "http://i237.photobucket.com/albums/ff101/Hastypickle1/pickleAvatar2.png"],
    ["Accidentus", "Getting Critted", "", "http://img221.imageshack.us/img221/4797/particleeffecter0.png", "#000000", "#FFFFFF", "#FFFFFF", "http://www.clockcrew.cc/talk/image.php?u=1983&dateline=1208660738"],
    ["Bob Bobinson", "Evil Superintendent", "", "", "#660000", "#660000", "#FF0000", "http://i272.photobucket.com/albums/jj196/BL4H00G4N4/si.jpg"],
    ["WhiffleBallTony", "Sexy Beast", "", "", "#330099", "#00FF00", "#00FF00", "http://www.exclusiveavatars.com/files/03.abstract/avatar0023.jpg"],
    ["Deathhawk7", "-Danger-|", "", "http://img517.imageshack.us/img517/2720/coupe32cg4.jpg", "#000000", "#CEB612", "#CEB612", "http://s45.photobucket.com/albums/f96/KillPie3/Halo%20Avatars/th_14.jpg"],
    ["X 10000 Fists X", "I Shave My Legs", "", "http://tiee.ecoed.net/vol/v3/issues/frontier_sets/yellowstone/img/forest_fire%5BHR%5D.jpg", "#000000", "#000000", "#FFFF15", "http://ec1.images-amazon.com/images/P/B000ARWIEO.01._SCLZZZZZZZ_.jpg"],
    ["cortana 5", "Queen of the Flood", "", "http://i208.photobucket.com/albums/bb114/CavAvx/cortanabar.png", "#00BDFF", "#CCCCFF", "#CCCCFF", "http://img170.imageshack.us/img170/2497/avatarbnetts9.png"],
    ["Mr Mousetrap", "Fightin' Texas Aggie", "", "", "#4F0000", "#FFFFFF", "#FFFFFF", "http://www.aggieathletics.com/images/2005design/header_tamu_logo.gif"],
    ["Cole The Hauss", "Diesel Beast", "", "", "#705c0d", "#ffd224", "#ffd224", "http://www.avatarist.com/avatars/Music/Metallica/Metallica-Damage-Inc.jpg"],
    ["Sight", "NAT Support Admin", "", "", "#705C0d", "#ffd224", "#ffd224", "http://tiles.xbox.com/tiles/Jj/6c/1Wdsb2JhbC8XCAQNBh4AGABUL3RpbGUvMC8yODAyYwAAAAAAAAD6sz4G.jpg"],
    ["JesusismyHomey", "AWESOME", "", "", "#5B9C64", "#D02090", "#D02090", "http://i98.photobucket.com/albums/l263/The1One1/ava1.jpg"],
    ["Spartan004", "SilverSniperx", "", "http://pics.homere.jmsp.net/t_24/64x64/CtnWms1059058997.gif", "#000000", "#0060CC", "#0060CC", "http://img371.imageshack.us/img371/9058/blueabstractjv1.jpg"],
    ["jmh9072", "root@jmh9072.com", "", "http://www.jmh9072.com/images/jmh9072_background.jpg", "#000000", "#FF0000", "#FF0000", "http://www.jmh9072.com/images/jmh9072_avatar.jpg"],
    ["The Sage Of Halo", "Forum Samurai", "", "", "#339933", "#FF9900", "#FF9900", "http://i95.photobucket.com/albums/l121/kodyack/AVATAR.jpg"],
    ["GoW I Lord Hood", "", "", "http://i208.photobucket.com/albums/bb114/CavAvx/gowbar.jpg", "#ff0000", "#1b1d1f", "#dddddd", "http://i208.photobucket.com/albums/bb114/CavAvx/gowavatar.jpg"],
    ["CAVX", "// syntax error", "", "http://i208.photobucket.com/albums/bb114/CavAvx/sibackground.jpg", "#000000", "#1b1d1f", "#dddddd", "http://i208.photobucket.com/albums/bb114/CavAvx/siavatar.jpg"],
    ["TheMasterLeaf", "Crazy Person Thing", "", "http://img32.picoodle.com/img/img32/4/6/16/f_prsdragonsem_9c9654b.jpg", "#00FF00", "#00FF00", "#00FF00", "http://s2d2.turboimagehost.com/t/422101_Final.gif"],
    ["EDOET", "Bungie.net Community Master", "", "", "#4D0000", "#D20000", "#D20000", "http://i208.photobucket.com/albums/bb114/CavAvx/boo.jpg"],
    ["Victoria Smith", "htimS airotciV", "", "", "#000000", "#6633FF", "#6633FF", "http://i299.photobucket.com/albums/mm293/VictoriaSmithOMG/VS.jpg"],
    ["Gzalzi", "Imperial Admiral", "", "", "#27282C", "#DDDDDD", "#DDDDDD", "http://i138.photobucket.com/albums/q264/Gzalzi/hlmesasymbolofficialsc490px.png"],
    ["parthath", "Prowling -blam!-", "", "", "", "", "", "http://i231.photobucket.com/albums/ee23/JadedRebellion/parth.jpg"],
    ["A Deaf Boy", "The Golden Knight", "", "http://i274.photobucket.com/albums/jj274/The_Diktator/bar2.jpg", "#ebe656", "#ebe656", "#ebe656", "http://i274.photobucket.com/albums/jj274/The_Diktator/knighavatar.jpg"],
    ["Fusionstudent", "The Fusion Master", "", "", "#7D0033", "#D20033", "#D20033", "http://i294.photobucket.com/albums/mm104/Fusion2156/thashowstoppa_picture-1.gif"],
    ["adidas77577", "OTC & MBT Employee", "", "", "#705c0d", "#ffd224", "#ffd224", "http://doctorheadly.files.wordpress.com/2007/10/halo3firstlook.jpg"],
    ["Dukoo", "Lord of Time", "", "http://i204.photobucket.com/albums/bb39/Douko1/space-desktop.png", "#2C77E0", "#46E00F", "#46E00F", "http://i204.photobucket.com/albums/bb39/Douko1/TARDIS.jpg"],
    ["Sled dog style", "Comanche Pilot", "", "", "#009900", "#00CC00", "#00CC00", "http://www.dunc-it.com/image/comanche.jpg"],
    ["BIZKIT5347", "The Bizkit", "#000000", "", "#394a2e", "#83b164", "#83b164", "http://h1.ripway.com/Bizkit2345/56adf494b47c.png"],
    ["Wildcard1992", "Trinitrotoluene", "", "", "#400000", "#dddddd", "#dddddd", "http://www.bungie.net/Forums/skins/default/avatars/CarnageZone.gif"],
    ["legit 38", "Bungie.Net LEGEND", "", "http://i7.photobucket.com/albums/y259/nicolepink/thgothic_rose_barbed_wire_md_wht.jpg", "#000000", "#FF0000", "#FF0000", "http://i176.photobucket.com/albums/w182/goobie15/HALO2SNIPESHOT.gif"],
    ["ShadowGuy1285", "A Sunset Guy", "", "http://i208.photobucket.com/albums/bb114/CavAvx/sgtitlebar.jpg", "#000000", "#FF0000", "#FF0000", "http://i208.photobucket.com/albums/bb114/CavAvx/sgavatar.jpg"],
    ["Primo84", "Detroit, MI", "", "http://img502.imageshack.us/img502/6463/customtitlebar2copyqu1.jpg", "#000000", "#FF9900", "#FF9900", "http://img502.imageshack.us/img502/8418/customavatar2copydh1.jpg"],
    ["ArchAssain", "Halo Pie", "", "", "#000066", "#FFCD00", "#FFCD00", "http://img175.imageshack.us/img175/9035/php3wtwdfc2pmui4.jpg"],
    ["Legendary Blue", "The Blue Ninja", "", "", "#0000FF", "#ffd224", "#ffd224", "http://www.bungie.net/Stats/Halo3/PlayerModel.ashx?p1=0&p 2=3&p3=3&p4=3&p5=3&p6=18&p7=9&p8=20"],
    ["Great_Pretender", "Forum Pirate", "", "http://img225.imageshack.us/img225/1341/titlebackgroundjm4.jpg", "#7A378B", "#E066FF", "#E066FF", "http://img74.imageshack.us/img74/2285/18090avatarbutnot18090lo7.gif"],
    ["HFC HEAVEN", "Waffle Administrator", "", "http://i286.photobucket.com/albums/ll81/Lotsofwaffles/images-2.jpg", "#000000", "#FFFFCC", "#FFFFCC", "http://i286.photobucket.com/albums/ll81/Lotsofwaffles/images-1.jpg"],
    ["rtbm24", "Civil Air Patrol Guy", "", "", "#dddddd", "#5151FF", "#5151FF", "http://www.semp.us/_images/securitas/v6_i3_a3_d.jpg"],
    ["weeeee123", "Messiah", "", "http://tinypic.com/view.php?pic=cl0dc&s=3", "#000000", "#F8F6E2", "#F8F6E2", "http://admin.bungie.net/Stats/halo2emblem.ashx?s=90&0=2&1=0&2=2&3=28&fi=39&bi=23&fl=0&m=1"],
    ["Evan56", "Post Hypnotic Suggestion", "", "", "#656654", "#CFCEA9", "#CFCEA9", "http://img236.imageshack.us/img236/7493/61348aa6.jpg"],
    ["lesions", "Ignorance is Bliss", "", "http://img340.imageshack.us/img340/3768/memberbarkt5.png", "#FF9933", "#660066", "#a23ca2", "http://img170.imageshack.us/img170/9523/purpleavviejh9.png"],
    ["tehviruss", "Guardian of the Pink", "", "http://img524.imageshack.us/img524/4553/bgkc3.png", "000000", "#FF1CAE", "#FF1CAE", "http://img504.imageshack.us/img504/339/pinkavkf0.png"],
    ["YahwehFreak4evr", "", "", "http://i419.photobucket.com/albums/pp274/YahwehFreak4evr/CoupdBungieuserbarMilkman2.jpg", "", "#FFFFFF", "#FFFFFF", "http://i419.photobucket.com/albums/pp274/YahwehFreak4evr/Coupd%20Bungie/CoupdBungieavatarMilkman.jpg"],
    ["CrypticGuardian", "Member", "", "", "#394631", "#afbfa5", "#afbfa5", "http://i208.photobucket.com/albums/bb114/CavAvx/CGLogo.jpg"],
    ["Mad Ogamons", "Guardian", "", "", "#00003d", "#5151FF", "#5151FF", "http://i246.photobucket.com/albums/gg94/CostlyAxis/devil_may_cry_3_masterchief.jpg"],
    ["Alkalies", "The Emo Beaner", "", "", "#000000", "#ff2327", "#ff2327", "http://marshelltransportation.com/assets/images/mexico-flag.gif"],
    ["GhostOfLockout9", "Jerk", "#009900", "", "#9DB68C", "#66CD00", "#66CD00", "http://www.oursportscentral.com/images/teams/mllwashbayhawks.gif"],
    ["shadowmad007", "Kaptain Kangaroo", "", "", "#000000", "#FFFF00", "#FFFF00", "http://i278.photobucket.com/albums/kk117/howsthisnamethen/untitled.jpg"],
    ["STRA7US", "Will Dance For Candy", "", "", "#000000", "#FF9900", "#FF9900", "http://i269.photobucket.com/albums/jj75/snuffie38/Mudkip.jpg"],
    ["littlerat", "Coke", "", "http://coke.soffish.com/content/33.headerbg.png", "#9C0810", "#ffffff", "#ffffff", "http://coke.soffish.com/content/718.coke_logo.png"],
    ["Master Skipper", "Skip", "", "http://i281.photobucket.com/albums/kk232/Mr_Skippy/ColoredBar.jpg", "#000000", "#146da5", "#146da5", "http://i281.photobucket.com/albums/kk232/Mr_Skippy/image6.jpg"],
    ["Mastersniper_123", "Death's Advocate", "", "http://eteamz.active.com/reapers14u/images/Grim-Reaper-Banner-2.jpg", "#00FF00", "#FF2222", "#FF2222", "http://i243.photobucket.com/albums/ff3/freakyjohn101/grim_reaper.jpg"],
    ["Duardo", "Hero of Bnet", "", "http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/titlebar.jpg", "#013F56", "#0093C9", "#0093C9", "http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/DuardoAvy2.jpg"],
    ["BerserkerBarage", "Pwner of Achilles1108", "", "", "#990000", "#1446cc", "#1446cc", "http://www.geekseyeview.com/wp-content/uploads/2007/09/buddy_christ1.jpg"],
    ["Emperor775", "Your Eminence", "", "", "#000000", "#ff0000", "#ff0000", "http://i226.photobucket.com/albums/dd171/Emperor775/39881167-Medium.jpg"],
    ["TrollUnderBridge", "EatzUrBillyGoatz", "", "http://img149.imageshack.us/img149/8712/tribute2drizzt9pu.jpg", "#000000", "#ffffff", "#ffffff", "http://www.comicsbulletin.com/news/images/0607/fre2.jpg"],
    ["XxBakedLeafxX", "Incredibly Black Obese Man", "", "", "#009900", "#FFFFFF", "#FFFFFF", "http://www.spscriptorium.com/Season6/IncrediblyObeseBlackMan.jpg"],
    ["nubyw00tz", "Caution!", "", "http://i293.photobucket.com/albums/mm51/nubywewtz/MemberTitle.jpg", "#000000", "#FCD116", "#FCD116", "http://i280.photobucket.com/albums/kk169/nubywo0tz/BNet%20Avatars/Beware-Flood.jpg"],
    ["Bane088", "Son of God", "", "http://i250.photobucket.com/albums/gg262/BANE119/aaa.jpg", "#82887B", "#82927B", "#82927B", "http://i250.photobucket.com/albums/gg262/BANE119/a-1.jpg"],
    ["Pain Relief", "Mr. Medic", "", "", "#000000", "#CCCC33", "#CCCC33", "http://i203.photobucket.com/albums/aa259/The_Pain_Relief/TF2MedicAvatar.png"],
    ["tainted valor", "Semper Illic", "", "http://i304.photobucket.com/albums/nn192/Tainted_Valor/2008-06-17-65278.jpg?t=1213803789", "#0000FF", "#ffffff", "#ffffff", "http://tbn0.google.com/images?q=tbn:t_NmS3Ch2Yp5kM:http://sta%20tic.howstuffworks.com/gif/lightning-gallery-18.jpg"],
    ["Dredwerkz", "British Army", "", "http://www.thepytt.co.uk/Images/Bungie.jpg", "#008000", "#FFFFFF", "#FFFFFF", "http://www.thepytt.co.uk/Armymini.gif"],
    ["oneshot3236", "Evil Samurai", "#000000", "http://i300.photobucket.com/albums/nn21/texasbred22_bucket/fire.jpg", "#660000", "#FF0000", "#FF0000", "http://i246.photobucket.com/albums/gg94/CostlyAxis/23434183-Full.jpg"],
    ["Rickz", "The Chosen One", "", "http://tbn0.google.com/images?q=tbn:4aWChpNLB_72lM:http://www.sgeier.net/fractals/fractals/01/Dark%2520Mesh.jpg", "#000000", "#FFFFFF", "#FFFFFF", "http://i302.photobucket.com/albums/nn88/Rickz-NL/fable.jpg"],
    ["Hollohill", "Subliminal Messenger", "", "http://www.fileden.com/files/2007/4/4/953752/Member_Header_Green4.jpg", "#394a2e", "#83b164", "#83b164", "http://www.fileden.com/files/2007/4/4/953752/The_Handsom_by_Hollohill.png"],
    ["Hawk Champion", "Fabled Member", "", "http://holly.holy.jp/Freepict/sky/L/sky0007.jpg", "#000000", "#0030FF", "#0030FF", "http://content.answers.com/main/content/wp/en-commons/thumb/d/d6/250px-Hawk_eye.jpg"],
    ["Battery000", "Headshot Maniac", "", "", "#000000", "#FFFFFF", "#FFFFFF", "http://images.wikia.com/uncyclopedia/images/thumb/8/88/Boom_headshot.jpg/162px-Boom_headshot.jpg"],
    ["theminininja", "Master of Hegemony", "", "", "#339900", "#33CC00", "#33CC00", "http://i249.photobucket.com/albums/gg202/theminininja/30807238-Medium.jpg"],
    ["BDKoof", ".:KOOF:.", "", "http://i119.photobucket.com/albums/o127/koofanator/titlebar2.jpg", "#DF6633", "#E02222", "#E02222", "http://i119.photobucket.com/albums/o127/koofanator/thcoolkfinished-2.jpg"],
    ["pinkfloyd018", "Oranje", "", "http://img296.imageshack.us/img296/9827/49104374wb7.jpg", "#000000", "#ff4903", "#ff4903", "http://img521.imageshack.us/img521/4600/ned2copykm3.jpg"],
    ["CARNAGE129", "The Dragon", "", "http://i304.photobucket.com/albums/nn171/Dreamer298/Banner.jpg", "#0029CC", "#00BBD6", "#00BBD6", "http://www.bungie.net/Stats/Halo3/PlayerModel.ashx?p1=0&p2=6&p3=7&p4=7&p5=3&p6=25&p7=1&p8=19"],
    ["dannyloomes05", "Village Idiot", "#3333FF", "", "#000099", "#000099", "#3333FF", "http://i246.photobucket.com/albums/gg94/CostlyAxis/homer-simpson-wallpaper-brain-1024.jpg"],
    ["ChaosZero59", "Ronin", "", "http://i295.photobucket.com/albums/mm137/chaoszero5/bar.png", "#555555", "#0bb427", "#0bb427", "http://i295.photobucket.com/albums/mm137/chaoszero5/megamanzero.png"],
    ["injurred potato", "The Disturbed One", "", "", "#7B0000", "#D10B13", "#D10B13", "http://z.about.com/d/comicbooks/1/7/d/B/joker.jpg"],
    ["sloppysnoopy", "That Guy", "", "", "000000", "FFFFFF", "#3366CC", "http://media.gamebattles.com/forums/customavatars/avata r149706_4.gif"],
    ["Link3265xx", "Link the Intern", "", "http://img242.imageshack.us/img242/6522/40818511ui1.jpg", "#000000", "#FF00FF", "#FF00FF", "http://img146.imageshack.us/img146/8350/30826606yg0.jpg"],
    ["xSH4D0WKILL3Rx", "Pro Gamer & Pro Photographer", "", "http://www.amnesia.com.au/blogimages/branvan.jpg", "#000000", "#955500", "#955500", "http://www.amnesia.com.au/blogimages/th_james_volley.jpg"],
    ["Adam 55", "Bungie.Net Forum Junkie", "#B60015", "", "#307679", "#55D2D7", "#55D2D7", "http://aquate.us/u/108.png"],
    ["Echo 55", "Bungie.Net Forum Junkie", "#B60015", "", "#307679", "#55D2D7", "#55D2D7", "http://aquate.us/u/108.png"],
    ["K0diak Ice", "Bungie.Net Forum Junkie", "#B60015", "", "#307679", "#55D2D7", "#55D2D7", "http://aquate.us/u/108.png"],
    ["TheKilla88", "Stupid Noob", "#979797", "", "#C0C0C0", "#C0C0C0", "#C0C0C0", "http://img177.imageshack.us/img177/2384/94936371rg9.png"],
    ["Cold Blood Killa", "Scottish Overlord", "", "http://www.newtutorials.com/vortex/vortex06.jpg", "#FF0000", "#339999", "#339999", "http://www.killarecords.com/logo-killa.jpg"],
    ["iPost", "The Story Teller", "", "", "#B56615", "#CCCC00", "#CCCC00", "http://i203.photobucket.com/albums/aa259/lordpain93/_Enjoy_your_breakfast__by_nocturnal.jpg"],
    ["djdsf", "Aperture Science", "#0093dd", "http://i206.photobucket.com/albums/bb224/djdsf/testback.jpg", "#ffffff", "#0093dd", "#ffffff", "http://i206.photobucket.com/albums/bb224/djdsf/Portaldjdsf1.gif"],
    ["Caboose 471", "Vehicle Destroyer", "", "", "#000033", "#0000cc", "#0000cc", "http://www.xbox.com/NR/rdonlyres/7DD1754E-40F0-43C4-AB4E-40223453D17C/0/RvB_Wacky02_dancing.png"],
    ["Ninja Walrus", "Witty Title", "", "", "#002200", "#33CC00", "#33CC00", "http://images.wikia.com/halo/images/4/46/SpartanIII.jpg"],
    ["The jeffers", "Buffalo Enthusiast", "", "http://www.geocities.com/jeffereydrw/jeffersbar.gif", "#CC0099", "#FF66CC", "#FF66CC", "http://www.geocities.com/jeffereydrw/jeffersavatar.gif"],
    ["The Holy Taco", "Immaculate", "", "", "#366417", "#FFFFFF", "#FFFFFF", "http://img26.picoodle.com/img/img26/4/6/21/f_thtcopym_2b24740.jpg"],
    ["Varanos7", "the cake is a lie!", "", "http://img522.imageshack.us/img522/3966/portalcake4dk0.jpg", "#3b2317", "#0077C0", "#ff9966", "http://i246.photobucket.com/albums/gg94/CostlyAxis/thecakeisaliefinalbc8.jpg"],
    ["Elit3 R3ap3r 257", "Neutral Superintendent", "", "", "#015788", "#00aeff", "#00aeff", "http://i245.photobucket.com/albums/gg57/Rob_117/neutav.jpg"],
    ["HaIoChick4Ever", "SandSwept Princess", "", "http://fc04.deviantart.com/fs30/f/2008/174/e/6/Bar1_by_HaloChick4Ever.png", "#CC0066", "#CC0066", "#CC0066", "http://fc01.deviantart.com/fs27/f/2008/174/e/a/My_Phoenix_2_by_HaloChick4Ever.jpg"],
    ["A 11ama", "The Banker", "", "http://www.engr.wisc.edu/2010/background.jpg", "#6600CC", "#CCFFFF", "#FFFFFF", "http://bluebison.net/sketchbook/2006/0606/llama1.jpg"],
    ["gEArs 0f Halo182", "Spectre", "", "http://i246.photobucket.com/albums/gg94/CostlyAxis/TitleUser.png", "#000000", "#00FFFF", "#00FFFF", "http://xbox360media.ign.com/xbox360/image/article/866/866593/unreal-tournament-iii-20080415103023273_640w.jpg"],
    ["leBrent", "Cavs Fan", "", "http://i282.photobucket.com/albums/kk257/_leBrent_/title_Bar.gif", "#000000", "#ffffff", "#ffffff", "http://i246.photobucket.com/albums/gg94/CostlyAxis/28933014-Full.jpg"],
    ["ZHoLmBeRg", "305th ODST", "", "http://i63.photobucket.com/albums/h144/zach1992holmberg/Untitled.gif", "#000000", "#FFFFFF", "#FFFFFF", "http://i63.photobucket.com/albums/h144/zach1992holmberg/Helljumper.png"],
    ["X Spartan 622 X", "Suspended City Soldier", "#FFFF34", "http://i240.photobucket.com/albums/ff150/MKTUROK117/turok3shadow-1.jpg", "#000000", "#FFFF34", "#FFFF34", "http://i240.photobucket.com/albums/ff150/MKTUROK117/GallyanaSoldier-1.jpg"],
    ["Grim Rocker", "Chaos Commander", "", "", "#303135", "#339933", "#339933", "http://i249.photobucket.com/albums/gg202/theminininja/grimsavatar.jpg"],
    ["dogbert14", "Lieutenant Dogbert", "", "http://i246.photobucket.com/albums/gg94/CostlyAxis/CSITitle.png", "#000000", "#6B9900", "#6B9900", "http://i246.photobucket.com/albums/gg94/CostlyAxis/CSIAva.png"],
    ["Shot Spartan", "Mid-Section Survivor", "", "http://tbn0.google.com/images?q=tbn:mmG5yeJ__Kc8YM:http://farm1.static.flickr.com/204/457753126_1934773ba3.jpg%3Fv%3D0", "#000000", "#FFFFFF", "#FFFFFF", "http://tn3-1.deviantart.com/fs13/300W/f/2007/036/8/f/CHARLIE_from_LOST_by_Wieringo.jpg"],
    ["Batzter", "", "", "http://i34.tinypic.com/dopit1.png", "#000000", "#FAFAFA", "#FAFAFA", "http://i35.tinypic.com/6ozvar.jpg"],
    ["Agent 117", "C-Bro Number 1", "", "", "#705c0d", "#ffd224", "#ffd224", "http://img.qj.net/uploads/articles_module/59758/FrankOConnor.jpg"],
    ["Chibi 27", "Canadian", "", "http://img158.imageshack.us/img158/2356/titlebarsv7.png", "#000000", "#C90000", "#C90000", "http://img365.imageshack.us/img365/3707/7cbarin6.jpg"],
    ["Dojoe89", "GuitarMasterLord", "", "http://i280.photobucket.com/albums/kk179/Dojoe89/PhoenixSig.jpg", "#000000", "#FF0000", "#FF0000", "http://www.geocities.com/Athens/olympus/6581/phoenix.jpg"],
    ["Awsome Rockstar", "Chaos Ninja", "", "", "#000000", "#C18900", "#C18900", "http://i287.photobucket.com/albums/ll153/jc4izzle/41015186-Medium.jpg"],
    ["Bapabooiee", "Bapa", "", "", "#264489", "#FF9BFF", "#FF9BFF", "http://i115.photobucket.com/albums/n306/Bapabooiee/Bapa.png"],
    ["StridentTrooper", "Northern Master", "", "http://www.hillegass.net/images/achooo.jpg ", "#000000", "#3399FF", "#3399FF", "http://www.bigblueball.com/forums/images/avatars/Light%20and%20Flashes/Twisted%20Snow.jpg"],
    ["Alavastre", "Conditional Exterminator", "", "", "#CC6600", "#993300", "#993300", "http://www.bungie.net/Forums/skins/default/avatars/Twinkie_7thMarathon.gif"],
    ["RoCkStAr785", "Recon Assassin", "", "", "#838383", "#ff0000", "#ff0000", "http://php.badrouter.net/bnet/cache/0:3:3:3:7:2:3:3.jpg"],
    ["sparten110", "Founder of Last Refuge", "", "", "#007700", "#00EE00", "#00EE00", "http://i246.photobucket.com/albums/gg94/CostlyAxis/NwAv.png"],
    ["xXSm00thi3Xx", "Permabanned", "", "http://i246.photobucket.com/albums/gg94/CostlyAxis/NwTiSet.png", "#000000", "#CC0099", "#CC0099", "http://icons.server05.sheezyart.com/user/0/5772.gif"],
    ["stoopidTHUGa", "does not have mudkipz", "#0060b7", "", "#A3A5A5", "#0060b7", "#0060b7", "http://archives.bulbagarden.net/w/upload/0/00/359Absol.png"],
    ["MLG Professional", "7th Honor Guard", "#000000", "", "#3E766D", "#008080", "#008080", "http://www.myfavoritegames.com/dbz/MSN/Pics/145.gif"],
    ["Porunga", "Namekian Dragon", "", "", "#ffd224", "#006633", "#006633", "http://www.myfavoritegames.com/dbz/MSN/Pics/104.gif"],
    ["Nuklearrabbit", "Administrator of Awesome", "", "", "#152432", "#2a7cc8", "#2a7cc8", "http://img502.imageshack.us/img502/9759/filephpavatar1760121476vu2.png"],
    ["big team basher", "Michigan boy", "", "http://i84.photobucket.com/albums/k29/zeldamaster_no1/eurekabackround.jpg", "#2178BE", "#B400FF", "#B400FF", "http://i84.photobucket.com/albums/k29/zeldamaster_no1/JustinmadebystephavatarSize.jpg"],
    ["Blue Jaguar", "Legendary Super Saiyan", "", "", "#1d69b5", "#FFFF00", "#FFFF00", "http://www.myfavoritegames.com/dbz/MSN/Pics/111.gif"],
    ["wolf10123", "The One And Only", "", "", "#000066", "#FFCC00", "#FFCC00", "http://s281.photobucket.com/albums/kk220/UNSC_wolf10123/th_Marathon_Wolf-Logo90x90.jpg"],
    ["X Rampancy X", "Dansen en Caramell", "", "", "#814757", "#FF93AB", "#FF93AB", "http://i80.photobucket.com/albums/j188/Stephisemofag/CaramellDansen.gif"],
    ["MrSpinkleswirth", "One Floodian To Rule Them All", "", "", "#000000", "#2828cc", "#2828cc", "http://files.xboxic.com/xbox-360/alien/giger-alien2.jpg"],
    ["MofuggerX", "HJ.net", "#f0f0f0", "http://img388.imageshack.us/img388/8663/newbar2zt1.png", "#002200", "#f0f0f0", "#f0f0f0", "http://img100.imageshack.us/img100/3913/d305ih0.png"],
    ["irsonicjohnlolol", "SonicJohn", "", "", "#0000FF", "#cd1e1e", "#cd1e1e", "http://i263.photobucket.com/albums/ii159/OMGitsPatt/sonicjohn.jpg"],
    ["jdars1804", "Purple Chief", "#ffffff", "", "#9D1Cdd", "#FF0033", "#FF0033", "http://i297.photobucket.com/albums/mm222/jdars1804/sdf-1.jpg"],
    ["ZHoLmBeRg", "Helljumper", "", "http://i63.photobucket.com/albums/h144/zach1992holmberg/Ztitle.jpg", "#000000", "#FF2222", "#FF2222", "http://i63.photobucket.com/albums/h144/zach1992holmberg/odstw.gif"],
    ["xXSm00thi3Xx", "Permabanned", "", "http://i208.photobucket.com/albums/bb114/CavAvx/barbarbar.jpg", "#000000", "#32C3D2", "#32C3D2", "http://kier.3dfrontier.com/forums/customavatars/avatar8929_2.gif"],
    ["EJTheSnail", "Anonymous User (Deleted)", "", "", "#00344C", "#E2E2E2", "#E2E2E2", "http://i235.photobucket.com/albums/ee285/EJTheSnail/Clipboard01-2.jpg"],
    ["S1NESTER", "Screenshot Ninja", "", "", "#656565", "#ffffff", "#ffffff", "http://i224.photobucket.com/albums/dd317/s1nester/TheWhiteOutlinedPurpleMistAvatar.gif"],
    ["Master Gus", "RoflGus", "", "", "#603311", "#ffd224", "#ffd224", "http://i.dipity.com/uploads/events/564868b8b0c790b63922f510110dfd19.png"],
    ["TheUseless0ne", "King Super-Yeti, Master of Draculas", "#008000", "", "#008000", "#808000", "#808000", "http://i182.photobucket.com/albums/x119/Shizno_2007/CthulhuEyesx.jpg"],
    ["paulster5315", "", "", "http://i90.photobucket.com/albums/k267/paulster5315/RyuHayabusatitlebar3.jpg", "#000000", "#FFFFFF", "#FFFFFF", "http://www.botonturbo.com/wp-content/uploads/2008/03/27-ninja_gaiden2.jpg"],
    ["Smartie13", "Forerunner General", "", "", "#0081FF", "#FFE600", "#FFE600", "http://images.wikia.com/halo/images/9/91/RedvsBlue.gif"],
    ["A10M1C", "Machinima Director", "", "", "#000000", "#ffffff", "#ffffff", "http://209.85.48.10/12843/135/upload/av-1.png"],
    ["Mutated Waffle", "Uber Sexy", "", "", "#0000FF", "#FF6600", "#FF6600", "http://img389.imageshack.us/img389/5743/fatman2ka1.jpg"],
    ["DarkishRav3n", "Dust and Echoes", "", "", "#000000", "#CC1100", "#CC1100", "http://i179.photobucket.com/albums/w284/c-a-js/CopyofRagingInfoMachine.jpg"],
    ["Squirrel Dude", "Squirrel Dude", "", "", "#27282c", "#215E21", "#215E21", "http://i296.photobucket.com/albums/mm183/WofMD/Septagonaltered.jpg"],
    ["Midnight Hawk2", "halo2 Queen", "", "", "#bbbbbb", "#ff3333", "#ff3333", "http://www.bungie.net/images/games/halo2/wallpapers/H2-Delta_Halo_Exterior_sm.jpg"],
    ["Assassin073", "Bungie.net Assassin", "", "", "#232323", "#5D5D6D", "#5D5D6D", "http://img176.imageshack.us/img176/342/assasinavatarcopypg1.png"],
    ["JustxHavexFun", "Wheelman", "", "", "#1B8CC2", "#FF2222", "#FF2222", "http://s266.photobucket.com/albums/ii252/Ur_in_my_Dojo_nao/th_shoopdawhoop.png"],
    ["ODST27", "The ODST", "#000000", "", "#828282", "#686982", "#686982", "http://www.bungie.net/Forums/skins/default/avatars/ODST_Black.gif"],
    ["Fbifriday", "Gamebattles Staff", "", "", "#705c0d", "#ffd224", "#ffd224", "http://my.opera.com/gamebattles/picture.pl?xscale=90"],
    ["Lewbrication", "you suck, go home!", "", "http://i253.photobucket.com/albums/hh45/lewisjfish/Abstract.jpg", "#000000", "#ffffff", "#ffffff", "http://i253.photobucket.com/albums/hh45/lewisjfish/fightingspartan.gif"],
    ["Hitman113", "Metal Ninja", "", "http://i208.photobucket.com/albums/bb114/CavAvx/blueifre.jpg", "#000000", "#98AFC7", "#98AFC7", "http://i99.photobucket.com/albums/l305/mastercadaver/gasmask.jpg"],
    //["Recon General", "Bungie Forum Guy", "", "", "#3b2317", "#ff9966", "#ff9966", "http://i291.photobucket.com/albums/ll289/BNGwebcams/marathon-1.gif"],
    ["Recon General", "&#12501;&#12457;&#12540;&#12521;&#12512;Ninja", "#a9a8a8", "", "#00364e", "#a9a8a8", "#a9a8a8", "http://i291.photobucket.com/albums/ll289/BNGwebcams/recon13.gif"],
    ["CabooseJr15301", "Shirayuki Jr", "", "http://img185.imageshack.us/img185/1387/bgeu8.jpg", "#0096ff", "#8d005d", "#8d005d", "http://img413.imageshack.us/img413/2835/bungiewt8.jpg"],
    ["C0NFUZ3D", "Who Dares Wins", "#3b2317", "http://www.majhost.com/gallery/C0NFU53D/Random/title.jpg", "#000000", "#000000", "#ff9966", "http://www.majhost.com/gallery/C0NFU53D/Random/sas_badge_copy.gif"],
    ["FLAIR 2856", "Digdug", "#000000", "http://i280.photobucket.com/albums/kk161/TheGrimPeeper/Wallpapers/diggdug1024-1.jpg", "#FFFFFF", "#FFFFFF", "#FFFFFF", "http://i280.photobucket.com/albums/kk161/TheGrimPeeper/Avatars%20sigs%20ect/digdug.jpg"],
    ["RyanThePerson", "Canadian!", "", "http://www.toufee.com/hosted/images/28ebf4ad874a40fe56063e003c3422e0.jpg", "#000000", "#626262", "#626262", "http://www.toufee.com/hosted/images/26aac73a6cd77d66b190157fcdb7c1fe.jpg"],
    ["Thunderbolt", "Member", "", "http://i200.photobucket.com/albums/aa104/robertjerometorres/vistaaq6.jpg", "#000000", "#CD0000", "#CD0000", "http://i88.photobucket.com/albums/k191/thunderbolt101/750128fyyvef58s0.gif"],
    ["SniperStealth", "Theme Master", "", "http://i19.photobucket.com/albums/b199/SniperStealthAC/SniperStealthBar.png", "#000000", "#5e6c7a", "#5e6c7a", "http://i19.photobucket.com/albums/b199/SniperStealthAC/LegendaryAvatarSS.gif"],
    ["THE CHIEF 87", "Skibur", "", "", "#00364E", "#999999", "#999999", "http://www.bungie.net/Stats/halo2emblem.ashx?s=90&0=1&1=3&2=1&3=3&fi=10&bi=0&fl=0&m=0"],
    ["Magc Man 64001", "mxpx64001", "", "", "#000000", "#EE2222", "#EE2222", "http://i93.photobucket.com/albums/l68/mxpx64001/a.jpg"],
    ["aku", "n&#x29e;&#x250;", "", "", "#32000D", "#DDDDDD", "#DDDDDD", "http://i120.photobucket.com/albums/o170/akurei77/Photoshop/phoenixcoolfixed.gif"],
    ["Kretos", "The Gunman", "", "", "#003399", "#FFFFFF", "#FFFFFF", "http://www.bungie.net/images/News/WeeklyUpdate/Update%20Studio%20Pics/MisterChiefCharity.jpg"],
    ["IcedPea", "Frozen Veggy", "00CCFF", "", "#FFFF99", "#FFFF15", "#00CCFF", "http://i263.photobucket.com/albums/ii159/OMGitsPatt/pea2.jpg"],
    ["x Derleak x", "Master Forum Sniper", "", "", "#3B2317", "#FF9966", "#FF9966", "http://sarcasticgamer.com/wp/wp-content/uploads/2007/12/halo3ending.jpg"],
    ["Kretos", "The Gunman", "", "", "#003399", "#FFFFFF", "#FFFFFF", "http://www.bungie.net/images/News/WeeklyUpdate/Update%20Studio%20Pics/MisterChiefCharity.jpg"],
    ["x Delta Marui x", "Sarcastic Chicken", "", "", "#705c0d", "#ffd224", "#ffd224", "http://www.bungie.net/images/News/InlineImages2007/BetaBeyond/Renders/sm_Halo3_Spartan-magnum-01.jpg"],
    ["CTFMaster", "Lord of Pansies", "", "", "#F3C2E9", "#DCB4CE", "#FF88FF", "http://i197.photobucket.com/albums/aa167/CTFMaster/ctf2.png"],
    ["II Armac II", "Sharpshooter Kitten", "", "", "#9900CC", "#CC66FF", "#CC33FF", "http://web.mit.edu/adorai/www/cute_pictures/sniper_kitten.jpg"],
    ["WATCHurFLAG", "The Pink One", "#FF6699", "http://www.bungie.net/Stats/halo2emblem.ashx?s=60&0=14&1=14&2=0&3=0&fi=11&bi=0&fl=1&m=0", "#FF3399", "#FF3399", "#FF3399", "http://i247.photobucket.com/albums/gg121/WATChurFLAG/Avatars%20and%20Sigs/Pinkavatar.jpg"],
    ["Tangent6", "&#9794+&#9792;=&hearts;", "4400FF", "http://coonhill.com/family/Pictures/Dave%20and%20Kristen/misc/awesome%20background.jpg", "#D06B28", "#3366FF", "#3366FF", "http://static.pyzam.com/img/thumbs/bgs/lg/ahdisturbed.jpg"],
    ["TheMinisteve", "The Devil jumped up on a Hickory stump", "", "http://img393.imageshack.us/img393/1936/coupbordpm8.jpg", "#000000", "#0099FF", "#0099FF", "http://img369.imageshack.us/img369/8641/supavfb3.jpg"],
    ["steelboom490", "Master Gamer", "", "", "#990000", "#FFFFFF", "#990000", "http://ui08.gamespot.com/167/gearsofwar3_2.jpg"],
    ["g english", "Ether Brewer", "", "", "#000000", "#9ACD32", "#9ACD32", "http://i182.photobucket.com/albums/x149/g_english/shadowtiger_avatar.gif"],
    ["Deathcon 5", "Supreme Hunter", "", "", "#394a2e", "#", "#83b164", "http://i251.photobucket.com/albums/gg314/TomImAllForThePeoples/MyAvatarMod.png"],
    ["MCorporal", "Infantry Platoon", "#000000", "", "#006600", "#009900", "#996633", "http://www.bungie.net/Forums/skins/default/avatars/ODST_Black.gif"],
    ["Metal Value", "Bungie Bouncer", "#FA252A", "", "#851718", "#FA252A", "#FA252A", "http://i351.photobucket.com/albums/q467/Metal_Value/SIAngry.jpg"],
    ["CLK Rebellion", "Master Neenja", "#FF3333", "http://i304.photobucket.com/albums/nn198/Canazzy/Halo3sigcopy.png", "#330033", "#990000", "#339966", "http://i139.photobucket.com/albums/q284/jared1969/550f242137bi12.gif"],
    ["the fourth door", "me", "", "", "#003EFF", "#003EFF", "#E2DDB5", "http://www.bungie.net/Stats/Halo3/PlayerModel.ashx?p1=0&p2=0&p3=5&p4=7&p5=4&p6=18&p7=9&p8=2&p9=90"],
    ["TheSuperintendet", "Teh Superintendet", "#83B164", "", "#394A2E", "#000000", "#83B164", "http://www.bungie.net/Forums/skins/default/avatars/5671759f967b.gif"],
    ["F708", "X INK X", "#FFFF00", "", "#999999", "#000066", "#CCFF00", "http://i149.photobucket.com/albums/s50/inkoman/Timothy_11.jpg"],
    ["COBRA13811", "Moodless Monster", "#000000", "http://www.bungie.net/images/News/TopNews/newsicon_fade.jpg", "#000000", "#000000", "#003F87", "http://i291.photobucket.com/albums/ll289/sirwilliamregis/RemainCalm.gif"],
    ["Cpt LegendArian", "The Flood's Captain", "#FFFF33", "", "#33CC00", "#33FF33", "#339933", "http://www.bungie.net/Forums/skins/default/avatars/sevenz.gif"],
    ["DarkGunner93", "Mr Gunner", "", "", "#000002", "#000002", "#3300CC", "http://www.avatarist.com/avatars/Cartoons/Family-Guy/Stewie-groove.gif"],
    ["TW SnprSlick", "Flippin' Awesome", "#ffffff", "", "#6699ff", "#ffffff", "#99ccff", "http://img362.imageshack.us/img362/8500/avvywq0.jpg"],
    ["CODILICIOUS", "Cody is delicious... and Canadian", "#990000", "", "#990000", "#705c0d", "#990000", "http://i340.photobucket.com/albums/o348/CODILICIOUSS/dd dcopy-1.jpg"],
    ["TehAttak", "Immortal Member", "", "http://i211.photobucket.com/albums/bb293/KSI_Goliath/HOLYcopy.png", "#491010", "#491010", "#afbbbb", "http://i211.photobucket.com/albums/bb293/KSI_Goliath/Goliath-Avatar.gif", "80px"],
    ["EliteSp4rtan", "Sniper Legend", "", "http://i306.photobucket.com/albums/nn241/xRifleProdigyx/elitesp4rtaneu5.jpg", "#", "#ffd224", "#ffd224", "http://i306.photobucket.com/albums/nn241/xRifleProdigyx/pickleAvatar2.png"],
    ["mike120593", "Apprentice of Stosh", "CF0000", "", "#000000", "#000000", "#CF0000", "http://sithsigma.files.wordpress.com/2007/06/darthvader.jpg"],
    ["PlaypetX", "Royal Petness", "#174E00", "", "#17DD00", "#BFFF0E", "#00FFC7", "http://www.digitalbattle.com/wp-content/uploads/2007/08/halo__master_chief.jpg"],
    ["MR X 93", "GhostlyIntendent", "#ffffff", "", "#999999", "#ffffff", "#D3BECF", "http://i326.photobucket.com/albums/k401/Dharmax93/SIGhostAvatar.jpg"],
    ["II LeGiT PrO II", "UNSC Master Chief Petty Officer", "#ffffff", "http://i28.photobucket.com/albums/c235/pdnlegs/halo3firstlook.jpg", "#", "#ffffff", "#000069", "http://i28.photobucket.com/albums/c235/pdnlegs/halo3firstlook.jpg"],
    ["DieByMyHand", "YourUncleBob", "ffff30", "http://i342.photobucket.com/albums/o422/DieByYourUncleBob/Halo%203%20Campaign/Halo%203%20Multiplayer/Miscellaneous/Other/YourUncleBobTitleBarBG.jpg", "#660000", "#ffff00", "#ffff30", "http://i342.photobucket.com/albums/o422/DieByYourUncleBob/Halo%203%20Campaign/Halo%203%20Multiplayer/Miscellaneous/Other/YourUncleBobAvatar.jpg"],
    ["Aj455", "Darth Revan", "", "", "#000000", "#990000", "#990000", "http://i186.photobucket.com/albums/x270/firepr00f/darthrevan.jpg"],
    ["Int3rnalF3ar", "Leatherface", "", "", "#000000", "#FFFF00", "#FFFF00", "http://www.trutv.com/graphics/photos/serial_killers/notorious/texas_chainsaw_massa/Leatherface200.jpg"],
    ["leeringpaldian", "Stosh Blamer", "#336633", "", "#339933", "#336633", "#336633", "http://i148.photobucket.com/albums/s10/leeringpaladin/avatar1.jpg"],
    ["sy r b", "Prophet of oblivion", "", "http://www.bungie.net/Stats/Halo3/Screenshot.ashx?ssid=40374735", "#705c0d", "#ffd224", "#ffd224", "http://s283.photobucket.com/albums/kk293/sy_r_b/th_image4.jpg"],
    ["LTJR White tail 45", "Devistator", "#FFFF23", "http://i.ytimg.com/vi/Mmx5dKiEECU/default.jpg", "#0000FF", "#008000", "#FFFF5A", "http://teamtimeout.com/forums/image.php?u=21&dateline=1216699379"],
    ["Sabes Que", "Super Member", "", "", "#005e5f", "#0eadaf", "", "http://i148.photobucket.com/albums/s36/iHaZaRd/a1-1.gif"],
    ["ExiledTexan", "Parliamentarian", "", "", "#0000FF", "#FFFF00", "#FFFF00", "http://i38.photobucket.com/albums/e143/calebigo/147.gif"],
    ["The Oreo", "Orbital Drop Shock Trooper", "", "", "#8E2323", "#FF2400", "#FF2400", "http://userserve-ak.last.fm/serve/160/5995612.jpg"],
    ["Sprool", "Idea Guy", "#47B9C8", "http://i260.photobucket.com/albums/ii35/Crazyeyes91/Sprool_Userbar.jpg", "", "#FFFFFF", "#3F627E", "http://i260.photobucket.com/albums/ii35/Crazyeyes91/KingDededeAvatar.jpg"],
	["SEPHIRE124", "Soldier 4 Christ", "#FF99FF", "", "#000000", "#FFFFFF", "#FF99FF", "http://i110.photobucket.com/albums/n85/Mahrunes/crss001.jpg"],
	["NOTW22", "Not Of This World", "#FFFFFF", "", "#000000", "#0000FF", "#FFFFFF", "http://s78.photobucket.com/albums/j83/NeonLife2/th_NOTWavatar-1.jpg"]
    // [0]UserName, [1]UserTitle, [2]UserTitleColor, [3]UserBarImage, [4]UserBarBackgroundColor, [5]UserBarBorderColor, [6]UserPostColor, [7]UserAvatarImage, OPTIONAL [8]UserAvatarImageHeight
];


// User Defined Functions
function getCookie(uda_Name)
{
	var results = document.cookie.match(uda_Name + '=(.*?)(;|$)');
	if (results)
		return (unescape(results[1]));
	else
		return null;
}

function udf_Initialize()
{
    // Begin [Fix "Topic Not Found"]
    if (document.getElementById("ctl00_mainContent_postRepeater1_ctl00_ctl00_noRecords"))
    {
        var pageNumber = queryString("postRepeater1-p");
        var pageNumberFix = pageNumber - 1;
        var loc = window.location.toString();
        window.location = loc.replace(pageNumber,pageNumberFix);
    }
    // End
    var udv_Debug = false;
    var udv_Style = document.createElement("style");
    udv_Style.type = "text/css";
    var udv_Script = document.createElement("script");
    udv_Script.language = "javascript";
    udv_Script.type = "text/javascript";
	udv_Script.innerHTML = "function udf_ToggleUserStyle(box, id) {" +
	                           "var found = false; var i = 0;" +
	                           "var oldCookie = String(getCookie('scriptBlockList'));" +
	                           "if (oldCookie == 'null') {" +
		                           "oldCookie = '';" +
	                           "};" +
	                           "var newCookie = oldCookie.split(',');" +

	                           "for (i = 0; i < newCookie.length; i++) {" +
		                           "if (id == newCookie[i]) {" +
			                           "found = true;" +
			                           "i = newCookie.length;" +
		                           "};" +
	                           "};" +

	                           "var exdate = new Date();" +
	                           "exdate.setDate(exdate.getDate() + 100);" +

	                           "if (box.checked) {" +
		                           "if (!found) {" +
			                           "newCookie.push(id);" +
			                           "setCookieWithExpires('scriptBlockList', newCookie, exdate);" +
		                           "};" +
	                           "} else {" +
		                           "arrStart = newCookie.slice(0,i-1);" +
		                           "arrFin = newCookie.slice(i,newCookie.length);" +
		                           "newCookie = arrStart.concat(arrFin);" +
		                           "setCookieWithExpires('scriptBlockList', newCookie, exdate);" +
	                           "}" +
	                       "}";
	document.getElementById("ctl00_Head1").appendChild(udv_Script);
    var udv_UserParseArray = [];
    var udv_DashboardAvatar = document.getElementById("ctl00_dashboardNav_dashboardAvatar");
    var udv_ProfileAvatar = document.getElementById("ctl00_mainContent_imgSelectedAvatar");
    for (var udv_J = 0; udv_J < udv_UserData.length; udv_J++)
    {
        if (udv_DashboardAvatar && udv_UserData[udv_J][7])
        {
            udv_DashboardAvatar.src = udv_UserData[udv_J][7];
        }
    }
    for (var udv_I = 1; udv_I < 26; udv_I++)
    {
        var udv_PostData_UserId;
        var udv_PostData_UserIdParsed;
        var udv_PostData_UserIdElement;
        var udv_PostData_UserBarElement;
        var udv_PostData_UserInfoElement;
        var udv_PostData_UserPostElement;
        var udv_PostData_UserTitleElement;
        var udv_PostData_UserAvatarElement;
        var udv_PostData_UserGamertagElement;
        var udv_PostElement = "";
        var udv_PosterId = "";
        var udv_PostId = "";
        if (udv_I.toString().length == 1) { udv_PostId = "0" + udv_I; }
        else { udv_PostId = udv_I; }
        if (udv_PostData_UserIdElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_usernameLink"))
        {
            udv_PostElementArray[udv_I - 1] = udv_PostData_UserIdElement;
            udv_PostData_UserId = udv_PostData_UserIdElement.innerHTML;
            udv_PosterIdArray[udv_I - 1] = udv_PostData_UserId;
            udv_PostData_UserBarElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_author_header");
            udv_PostData_UserInfoElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_userDiv");
            udv_PostData_UserPostElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_PostBlock");
            udv_PostData_UserTitleElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_UserTitleBlock");
            udv_PostData_UserAvatarElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_userAvatar");

            // Begin [Insert "Extra Info"] - Idea By Assassin073
            if (udv_PostData_UserGamertagElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_gamertagLinkFloat"))
            {
                var udv_GamertagName = udv_PostData_UserGamertagElement.innerHTML;
                if (udv_GamertagName != "[none]")
                {
                    var udv_GamertagName = udv_PostData_UserGamertagElement.innerHTML;
                    udv_PostData_UserInfoElement.childNodes[1].innerHTML += "<li>" +
                                                                                "extra info: " + "<a href='http://www.bungie.net/Stats/Halo3/Default.aspx?player=" + udv_GamertagName + "'>Service Record</a> | <a href='http://www.bungie.net/stats/PlayerStatsHalo3.aspx?player=" + udv_GamertagName + "'>Career Stats</a> | <a href='http://www.bungie.net/stats/Halo3/FileShare.aspx?gamertag=" + udv_GamertagName + "'>File Share</a> | <a href='http://www.bungie.net/stats/PlayerStatsHalo3.aspx?player=" + udv_GamertagName + "'>Game History</a>" +
                                                                            "</li>";
                }
            }
            // End

        }
        
        
        
        for (var udv_J = 0; udv_J < udv_UserData.length; udv_J++)
        {
            if (udv_PostData_UserId == udv_UserData[udv_J][0] && document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_usernameLink"))
            {
                if (udv_Debug == true) { alert("User Settings Match: " + udv_PostData_UserId + "\r\nElement Title: " + udv_PostData_UserTitleElement.id + "\r\nUser Bar: " + udv_PostData_UserBarElement.id + "\r\nPost ID: " + udv_PostId); }
                udv_PostData_UserTitleElement.innerHTML = udv_UserData[udv_J][1];
                udv_PostData_UserIdParsed = udv_PostData_UserId.replace(/ /g, "__");
                udv_PostData_UserTitleElement.id = udv_PostData_UserIdParsed + "_UserTitleBlock";
                udv_PostData_UserBarElement.id = udv_PostData_UserIdParsed + "_author_header";
                udv_PostData_UserPostElement.id = udv_PostData_UserIdParsed + "_PostBlock";
                
                // Begin [Insert "Disable User Style" Check Box]
                var udv_Checked = "";
                var udv_DisabledStyleArray = getCookie("scriptBlockList");
                if (udv_DisabledStyleArray != null)
                {
                    if (udv_DisabledStyleArray.contains(udv_PostData_UserIdParsed) == true) { udv_Checked = "checked='checked'"; }
                    else { udv_Checked = ""; }
                }
                udv_PostData_UserInfoElement.childNodes[3].innerHTML += "<li>" +
                                                                            "<input id='UserStyleCheckBox_" + udv_PostData_UserIdParsed + "' type='checkbox' onchange='udf_ToggleUserStyle(this, \"" + udv_PostData_UserIdParsed + "\");' " + udv_Checked + " />" +
                                                                            "<label style='position: absolute; margin-top: 3px;' for='UserStyleCheckBox_" + udv_PostData_UserIdParsed + "'>Disable User Style</label>" +
                                                                        "</li>";
                // End
                
                
                
                if (udv_UserData[udv_J][7] != "")
                {
                    udv_PostData_UserAvatarElement.src = udv_UserData[udv_J][7];
                    if (udv_UserData[udv_J][8])
                    {
                        udv_PostData_UserAvatarElement.height = udv_UserData[udv_J][8];
                    }
                    udv_UserAvatarElementArray[udv_I - 1] = udv_PostData_UserAvatarElement;
                }
                if (udv_UserParseArray.contains(udv_UserData[udv_J][0]) == false)
                {
                    var Temp = "background: url(" + udv_UserData[udv_J][3] + ") !important;";
                    if (udv_DisplayTitleBarImages == false)
                    {
                        Temp = "";
                    }
                    udv_Style.innerHTML += "#" + udv_PostData_UserIdParsed + "_UserTitleBlock { color: " + udv_UserData[udv_J][2] + " ! important; }\r\n";
                    udv_Style.innerHTML += "#" + udv_PostData_UserIdParsed + "_author_header { " + Temp + " background-color: " + udv_UserData[udv_J][4] + " ! important; border: solid 1px " + udv_UserData[udv_J][5] + " ! important; }\r\n";
                    udv_Style.innerHTML += "#" + udv_PostData_UserIdParsed + "_PostBlock { color: " + udv_UserData[udv_J][6] + " ! important; }\r\n";
                    udv_UserParseArray[udv_J] = udv_PostData_UserId;
                }
            }
        }
    }
    document.getElementById("ctl00_Head1").appendChild(udv_Style);
}

function IDA() //Insert Debug Alert
{
    if (arguments[0])
    {
        alert(udv_DebugAlertCurrent + " - C: " + arguments[0]);
    }
    else
    {
        alert(udv_DebugAlertCurrent);
    }
    udv_DebugAlertCurrent++;
}

function queryString(parameter)
{ 
  var loc = location.search.substring(1, location.search.length);
  var param_value = false;

  var params = loc.split("&");
  for (i=0; i<params.length;i++) {
      param_name = params[i].substring(0,params[i].indexOf('='));
      if (param_name == parameter) {
          param_value = params[i].substring(params[i].indexOf('=')+1)
      }
  }
  if (param_value) {
      return param_value;
  }
  else {
      return "";
  }
}

udf_Initialize();

