// ==UserScript==
// @name           Chat2Duel by Uhutaf
// @namespace      http://www.wojbork.pl/gm/chatduel.user.js
// @description    Dodatek przesuwa chat poza forum umożliwiając normalną gadkę przy expie.
// @copyright      Rothers
// @version        1.0
// @include        http://www.mgduel.com/
// @include        http://www.mgduel.pl/
// @include        http://mgduel.com/
// @include        http://mgduel.pl/
// ==/UserScript== 

pl_translation = {
  // globals
  'AP' : 'PA',
  'Use button on the right to start fight.' : 'Użyj przycisku po prawej by rozpocząć walkę.',
  
  // item description
  'Weapon' : 'BrońNNN',
  'Armor' : 'Pancerz',
  'Talisman' : 'Talizman',
  'Potion' : 'Mikstura',
  'unique' : 'unikalny',
  'heroic' : 'heroiczny',
  'legendary' : 'legendarny',
  'Value' : 'Wartość',
  'Item power' : 'Moc przedmiotu',
  'Damage' : 'Obrażenia',
  'Doubled damage' : 'Podwojone obrażenia',
  'Doubled armor' : 'Podwojony pancerz',
  'HP' : 'Punkty życia',
  'Critical hit' : 'Cios krytyczny',
  'Critical power' : 'Moc ciosu krytycznego',
  'Dodge' : 'Unik',
  'Stun' : 'Ogłuszenie',
  'Action points' : 'Punkty akcji',
  
  // battle log
  'Fight with' : 'Walka z',
  'has begun' : 'została rozpoczęta',
  'You</b> have hit enemy with ' : 'Zadałeś</b> przeciwnikowi ',
  ' damage.' : ' obrażeń.',
  ' has received ' : ' otrzymał ',
  ' damage, ' : ' obrażeń, ',
  ' hp left.' : ' pz pozostało.',
  ' has hit you with ' : ' uderzył z siłą ',
  'You</b> have received ' : 'Otrzymałeś</b> ',
  'Battle won' : 'Walka wygrana',
  'Draw' : 'Remis',
  'Battle lost' : 'Walka przegrana',
  'dodge' : 'unik',
  'stun' : 'ogłuszenie',
  'crit' : 'krytyk',
  
  // achievements
  "Next achievement at ": 'Następne osiągnięcie przy ',
  "Achievement completed": 'Osiągnięcie ukończone',
  "Progress: ": 'Postęp: ',
  
  "Get lvl #" : 'Osiągnij poziom #',
  "Play the game for #h" : 'Graj w grę #h',
  "Get # vitality" : 'Przydziel #p w witalność',  
  "Get # strength" : 'Przydziel #p w siłę',  
  "Get # luck" : 'Przydziel #p w szczęście',
  "Get # damage" : 'Uzyskaj #p obrażeń',
  "Get # armor" : 'Uzyskaj #p pancerza',  
  "Get #% stun" : 'Uzyskaj #% ogłuszenia',
  "Kill # enemies" : 'Zabij # graczy',
  "Lose # times" : 'Przegraj w PvP # razy',
  "Kill enemy # levels above" : 'Zabij gracza # poziomów mocniejszego',
  "Kill enemy with level #" : 'Zabij gracza z poziomem #',
  "Win PvP fight with 1 hp left" : 'Wygraj walkę z graczem mając 1 punkt życia', 
  "Kill # monsters" : 'Zabij # potworów',
  "Kill monster # levels above" : 'Zabij potwora # poziomów mocniejszego',
  "Get # unique items" : 'Zdobądź # przedmiotów unikalnych',
  "Get # heroic items" : 'Zdobądź # przedmiotów heroicznych',
  "Get # legendary items" : 'Zdobądź # przedmiotów legendarnych',
  "Clear Goblin Forest" : 'Oczyść Las Goblinów',
  "Clear Andarum Temple" : 'Oczyść Świątynię Andarum',  

  // Alerts
  'Please fill all fields.' : 'Uzupełnij wszystkie pola.',
  'Bad password repetition.' : 'Błędne powtórzenie hasła.',
  'New password saved.' : 'Zapisano nowe hasło.',

  //Battle
  'basylisk' : 'bazyliszek'
    
  //
  '-':'-'
}

function t(str)
{
  if(typeof str == 'object')
  {
    var s2=[];
    for(var k in str)
      s2[k] = t(str[k]);
    return s2;
  }
  if(typeof pl_translation[str] != 'undefined') return pl_translation[str];  
  return str;