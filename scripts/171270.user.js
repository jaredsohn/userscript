// ==UserScript==
// @name          John Green's Profanity Filter
// @namespace     kornk/skidfilter
// @description	   Changes swear words into the names of famous poets
// @include         *
// ==/UserScript==

/*

  Author: Adam Aviram

*/

// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.

var goodWords =  ['Walt Whitman', 'Edna St. Vincent Millay','Emily Dickinson', 'E. E. Cummings', 'Robert Frost', 'Nikki Giovanni', 'Ralph Waldo Emerson', 'T.S. Elliot', 'Edgar Allan Poe', 'W.B. Yeats', 'Lord Tennyson', 'Maya Angelou', 'Langston Hughes', 'Sylvia Plath', 'Elizabeth Bishop',  'Anne Sexton', 'Anne Bradstreet', 'Gwendolyn Elizabeth Brooks'],
badWords=['shit','laksjdhfg' 'fuck', 'cunt', 'cunts', 'dick', 'dicks', 'penis', 'vagina', 'whore', 'fromatic', 'ass', 'asses', 'shits', 'fucks', 'fucker', 'fuckers', 'motherfucker', 'motherfuck', 'motherfuck ', 'fuck ', 'motherfuckers', 'nigger', 'niggers', 'homos', 'vaginas', 'pussy', 'whores', 'shits', 'shitter', 'anus', 'arse', 'arsehole', 'asshat', 'ass-hat', 'assbag', 'douche', 'assbite', 'asscock', 'asses', 'assface', 'asshole', 'asshead', 'assnigger', 'assshole', 'asswipe', 'bampot', 'bastard', 'beaner', 'bitch', 'bitchass', 'bitches', 'bitchtits', 'bitchy', 'blow job', 'blowjob', 'bollocks', 'bollox', 'boner', 'bullshit', 'buttplug', 'butt plug', 'buttfucker', 'chink', 'choad', 'chode', 'clit', 'clitface', 'clitfuck', 'cock', 'cockass', 'cockbite', 'cockburger', 'cockface', 'cum', 'cumdumpster', 'cumguzzler', 'cuntface', 'cuntmuffin', 'damn', 'dickbag', 'dickface', 'dickmilk', 'dike', 'dildo', 'doochbag', 'douchebag', 'dumbass', 'dumbshit', 'dyke', 'fag', 'fagbag', 'faggot', 'fuckbag', 'fucker', 'fuckhead', 'fuck', 'fucken', 'fucktard', 'gooch', 'hoe', 'jizz', 'mothafucka', 'mothefuckas', 'mothafucking', 'motherfuckin', 'motherfucken', 'piss', 'queer', 'tit', 'boob', 'twat', 'wanker'];
function watchField($field){ 
  var text = "";
  var replace = function(bad){
      var word = goodWords[Math.floor(Math.random()*goodWords.length)],
        reg = new RegExp(bad,"gi");
      text = text.replace(reg,word);
  },
  update = function(){
    text = $field.val();
    badWords.forEach(replace);
    $("#out").html(text);
  };
  $field.on("keydown change ready",update);
  update()
}
watchField($("#watchme"));
