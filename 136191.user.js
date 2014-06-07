// ==UserScript==
// @name        BetterBnetIgnore
// @namespace   myscripts
// @description Ignore all threads created by blocked users
// @include     http://us.battle.net/d3/en/forum/*/
// @require     http://code.jquery.com/jquery-1.7.1.min.js
// @version     2
// ==/UserScript==

var start = new Date();
var items_blocked = 0;

var posts = {};

$('[class=post-author]').each(function(i){
    posts[this.textContent.trim()] = true;
});

function hide_row(index){
    $(this).parent().attr('style', 'display:none');
}

function block_user(users){
    users.forEach(function(user){
        if(posts[user]){
            var targets = $("[class=post-author]:contains('" + user +"')");
            items_blocked = items_blocked + targets.size();
            targets.each(hide_row);
        }
    });    
}

try {
  var users_to_block = [ 'BortSimpsons', 'AASHTON', 'm0nkeysensei', 'hots3x', 'Dinos', 'Basinx', 'mbbkraft', 'Aur3ll4', 'claniraq', 'Ozko56', 'taglag', 'Noxious', 'Balmy', 'Oxydron', 'dcb', 'Togen', 'Clt0fprsnlty', 'Ragnarok', 'ThunderKing', 'Shihtzu', 'Blood', 'LycanAncient', 'Starkiller', 'RocksTonic', 'ripsawjaw', 'Merix', 'Sindris', 'Hemo2012', 'XIVIGAN', 'Aurust', 'Devire', 'ProteinFart', 'Flince', 'TheJenkins', 'Chaos', 'Varicose', 'poochie', 'AllHallowsEv', 'Novii', 'Moridin', 'Eemeli', 'Masternewbz', 'Sirrus', 'MortPure', 'Zuuhl', 'Theodore', 'Nano', 'Virusboy', 'KouGrizzle', 'DamageInc', 'brokenftw', 'Chigurh', 'Cheater', 'zirax', 'xSoulPridez', 'KetMalice2', 'AxeLord', 'ManOluck', 'noobithree', 'imawsomethx', 'bluejays90', 'Harry', 'erx', 'Arkondrius', 'Nova', 'Lydian', 'Apathy' ,'Reason', 'Daitanis', 'Arsonist420', 'MrEpic', 'schoolsterz', 'Raz', 'Sorderon', 'JIN8913', 'Justin', 'Aethius', 'Sleepwalk', 'Smang', 'Ambro', 'Acerwjx', 'Devil', 'fr0st', 'Gore', 'RKN', 'Monk', 'chenson87', 'Odin', 'l24P1ST', 'sh4dowbunny', 'dtRUSH', 'MrBSquared', 'mdubbz09', 'Draklems', 'Zomgasm', 'Maurier', 'Croatoan', 'Rainy', 'HellGay', 'Bones', 'Weapon', 'Chopped', 'TehKZ', 'Odegar', 'jtryton', 'ZeRui', 'TyrantTitan', 'apop', 'Transistor', 'Kforce', 'Nevsky', 'killerk', 'Abyzzmal', 'Coreanoutlaw', 'Vicente', 'ReallyRick', 'BrobotJox', 'Baratus', 'NoLife', 'fxscreamer', 'Prolific', 'RobotNinja', 'Zeroumus', 'TN5757', 'xxpoloxx', 'ts061282', 'Kwoky', 'Bssouza', 'Disaronno', 'JamieMadrox', 'n0rea11y', 'Peli', 'zero', 'SubNoize', 'MaXiu', 'Devon', 'Startkabels', 'nirv', 'Deus', 'Tutu', 'Beemer', 'TROLLNAN', 'LHOOL', 'cmjrobinson', 'Umgee', 'Nelf', 'holymoly', 'KeKe', 'Ash', 'DuckFat', 'WordsMyth', 'Fox', 'Vayne', 'D3K', 'Pwnishment', 'Hotees', 'NeVaDiE', 'Afic', 'tk5o4', 'xOApache', 'Shax', 'Mythologick', 'Dragonhand', 'Liam', 'MaDDoG', 'NiHao', 'RickRifle', 'sTsCrucial', 'erricrice', 'Ferrari458', 'Kilandros', 'C6ZR1', 'Courage', 'Trixeh', 'ninja', 'Grimstone', 'Microbe', 'Grimreefer35', 'Roachamus', 'Federal', 'Winno', 'Doomsickle', 'illundreal', 'Jesaynt', 'Aneon', 'Midnight', 'PocketWeezel', 'Quicktim3', 'Anxiety', 'TBS8672', 'ThornBird', 'Carzeri', 'RieneM', 'xxaxelx666xx', 'greatpersia', 'Sata', 'cockofgold', 'charlie', 'readonly', 'ZrotyatH', 'JWNZ', 'BoZz25', 'Rakanishu', 'Dinobot', 'MGReaper', 'SwayzesGhost', 'ÆTHÉRÉÅL', 'Tulpa', 'Horoxix', 'Seriously', 'Doc', 'Mindy', 'yellowfox', 'Dierath', 'automatic', 'Itsagg', 'WiiBoct', 'umad', 'Quilla', 'Robert', 'ZxcvbnM', 'Atharne', 'satchmo', 'Hinary', 'CaptainMoe', 'biGDeeps', 'Murderfists', 'DudeManDude', 'LordZero2', 'UnifiedEarth', 'Sheckler', 'FistOfTheSex', 'rhetorikill', 'EHizzo', 'Brettlord', 'DaRkCaSTLe', 'GeneralLuBu', 'Zantetsu', 'Blackhaert', 'tac216', 'Neglectful', 'Logicstomp', 'Coqburn', 'MonkeyDFong', 'zeKsg', 'FaMiNE', 'Rich', 'Scubaman', 'Copay', 'GrouchoMarx', 'FreakNigh', 'yanny', 'MAJMOORE48', 'EBEFKisara', 'adambag', 'Spiker', 'Baelish', 'DARWINN', 'CharlieSh33n', 'Smulch', 'AntonChigur', 'Reaper', 'Samms', 'Majere880', 'Rbs', 'Crebstar', 'stfn' ,'Loomies', 'Armandhammer', 'doob', 'Sesshy', 'AceVentura', 'GangstaGeek', 'AzerFox', 'ericdjobs', 'PsycoBone', 'Enigma'];                       
  block_user(users_to_block);
  var end = new Date();
  $("[id=forum-search-field]").val("Blocked " + items_blocked +" Items in " + (end-start)/1000 + "sec")
}
catch(err)
{
  console.log("Error blocking user: " + err);
}