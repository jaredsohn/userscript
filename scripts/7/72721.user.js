// ==UserScript==
// @name         Prince Favourite Smileys
// @author	 Prince
// @description  Use Latest  Smiley !Enjoy!
// @include        *CommMsgPost*
// @require http://sizzlemctwizzle.com/updater.php?id=72721&days=2
// ==/UserScript==

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

smileyarr["smiley_265"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2l7-RR5_rI/AAAAAAAABps/_CDDS0BebRc/MG_204.gif";
smileyarr["smiley_264"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kgzvE4ODI/AAAAAAAABXg/gWaTrTp6ApY/acute.gif";
smileyarr["smiley_263"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2kgz1lxYvI/AAAAAAAABXk/0f3jnrqY-Ac/aggressive.gif";
smileyarr["smiley_262"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kg0NXGCAI/AAAAAAAABXs/J3jXp5McxVQ/air_kiss.gif";
smileyarr["smiley_261"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2kg0T3febI/AAAAAAAABXw/rAYXcvpleXQ/assassin.gif";
smileyarr["smiley_260"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2khHfUT56I/AAAAAAAABX4/z6cS4SQ59aY/black_eye.gif";
smileyarr["smiley_259"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2khHzIU5UI/AAAAAAAABYE/kVCMQ9-3_Io/boredom.gif";
smileyarr["smiley_258"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2khbIZjb9I/AAAAAAAABYI/6IYTlpNb91M/bye.gif";
smileyarr["smiley_257"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2khbWOxehI/AAAAAAAABYM/hC6vGIoxvoc/cava.gif";
smileyarr["smiley_256"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2khbVUhCHI/AAAAAAAABYQ/ive8gicqkSo/comando.gif";
smileyarr["smiley_255"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2khbndJ4YI/AAAAAAAABYU/4F2P_FSTdPc/connie_3.gif";
smileyarr["smiley_254"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2khb-rZBhI/AAAAAAAABYY/0ml0eBGRqE8/connie_08.gif";
smileyarr["smiley_253"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2khwpOwvhI/AAAAAAAABYg/CW0XARIuT7U/connie_27.gif";
smileyarr["smiley_252"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2khw-BK1zI/AAAAAAAABYo/y2MefX_SGeE/connie_36.gif";
smileyarr["smiley_251"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2khwzedc4I/AAAAAAAABYs/c7YOwG9K8VQ/connie_40.gif";
smileyarr["smiley_250"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2kiBBYxkqI/AAAAAAAABY8/9lkSqZl1c_Q/crazy_pilot.gif";
smileyarr["smiley_249"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kiKvAFjaI/AAAAAAAABZE/wfMmwQvZhAg/d_birthday.gif";
smileyarr["smiley_248"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kiK4nHjVI/AAAAAAAABZI/UIfXnA1IwyA/d_book.gif";
smileyarr["smiley_247"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kiLAcmD5I/AAAAAAAABZM/pIOc5t791So/d_canon.gif";
smileyarr["smiley_246"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2kiLDXYSoI/AAAAAAAABZQ/rGPbOTuxFgQ/d_clock.gif";
smileyarr["smiley_245"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kiLZjCDOI/AAAAAAAABZU/fMQEr04Xo-Q/d_dance.gif";
smileyarr["smiley_244"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2kihbMHltI/AAAAAAAABZc/q445zvcMlEo/d_girl_kiss.gif";
smileyarr["smiley_243"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kihu1wv5I/AAAAAAAABZg/j4UDUghSuWQ/d_guess.gif";
smileyarr["smiley_242"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2kihlMnNCI/AAAAAAAABZk/uRi4Ai-zfSg/d_kiss.gif";
smileyarr["smiley_241"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kih2U4OeI/AAAAAAAABZo/jOh25i7mkNw/d_martini.gif";
smileyarr["smiley_240"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kiyddOQjI/AAAAAAAABZw/eHogPBISWk0/d_turn.gif";
smileyarr["smiley_239"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2kiyu1CDpI/AAAAAAAABZ4/7_FL36PHZtI/d_wash.gif";
smileyarr["smiley_238"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kiy6Y4NlI/AAAAAAAABaA/r0d6FkeIhZs/dance4.gif";
smileyarr["smiley_237"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2ki-h5vRuI/AAAAAAAABaQ/U4r-BQ6JrbA/dirol.gif";
smileyarr["smiley_236"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kjKdKJmbI/AAAAAAAABaY/lNf7BTTdh74/don-t_mention.gif";
smileyarr["smiley_235"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kjKRtpGkI/AAAAAAAABac/O6gMJfC2PVU/drag.gif";
smileyarr["smiley_234"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2kjKggb7JI/AAAAAAAABag/PEBbrRIFBBc/drinks.gif";
smileyarr["smiley_233"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kjXNOrFcI/AAAAAAAABaw/n7vvn7EMKmo/focus.gif";
smileyarr["smiley_232"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kjXPFzCQI/AAAAAAAABa0/FIJ8LAv8gBs/friends.gif";
smileyarr["smiley_232"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kjXffNDdI/AAAAAAAABa4/JMfgNia8jN8/gamer1.gif";
smileyarr["smiley_231"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kj4STueGI/AAAAAAAABbY/mLtuP29mhiU/give_heart2.gif";
smileyarr["smiley_230"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kj4vvw63I/AAAAAAAABbg/erUjTfiXo4I/good3.gif";
smileyarr["smiley_229"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kkERf6HDI/AAAAAAAABbw/hfQARKji-rU/hi.gif";
smileyarr["smiley_228"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2kkEh7GGLI/AAAAAAAABb4/y17zLuNgYE8/ireful1.gif";
smileyarr["smiley_227"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2kkTZ1wZOI/AAAAAAAABb8/MvS97OGslq4/ireful3.gif";
smileyarr["smiley_226"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2kkTv52HjI/AAAAAAAABcA/OJ28ETaiLAg/JC_burp.gif";
smileyarr["smiley_225"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kkT3R0mvI/AAAAAAAABcE/T_HzhXHFSbQ/JC_cupidboy.gif";
smileyarr["smiley_224"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2kkUDHZAGI/AAAAAAAABcM/N-SvM_leeoY/JC_fan.gif";
smileyarr["smiley_223"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2kkqLoN7dI/AAAAAAAABcQ/DJ4RaHVBQBI/JC_fever.gif";
smileyarr["smiley_222"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kkqnNlB6I/AAAAAAAABcY/rBKdni6Hf2Y/JC_gimmefive.gif";
smileyarr["smiley_221"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kk7Za9tdI/AAAAAAAABc0/XKeTBIXILfc/JC_nix.gif";
smileyarr["smiley_220"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2klIoLanVI/AAAAAAAABdA/nW72gaweVGI/JC_parents-boy.gif";
smileyarr["smiley_219"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2klIypM_hI/AAAAAAAABdI/whBf856f1pI/JC_rockin.gif";
smileyarr["smiley_218"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2klV5Kok6I/AAAAAAAABdM/B68JgJbG9kA/JC_run.gif";
smileyarr["smiley_217"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2klWEtZe4I/AAAAAAAABdQ/myLztET7I04/JC_shakehead.gif";
smileyarr["smiley_216"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2klWTJrGgI/AAAAAAAABdc/9LhFvnTOvKo/JC_thinking.gif";
smileyarr["smiley_215"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2klltZ0ZyI/AAAAAAAABdg/SGGgKfTZ96g/JC_veryhappy.gif";
smileyarr["smiley_214"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kmLokN-VI/AAAAAAAABd0/yTaOtg7i_aI/l_kiss_hand.gif";
smileyarr["smiley_213"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kmMPQiIsI/AAAAAAAABeA/7nGVBIFxLG0/l_surprize.gif";
smileyarr["smiley_212"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kmMSfNhsI/AAAAAAAABeE/CBnr-QdFYJs/Laie_2.gif";
smileyarr["smiley_211"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2kmdG8w6wI/AAAAAAAABeI/Ra399DTFgMQ/Laie_3.gif";
smileyarr["smiley_210"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kmdVY-Y5I/AAAAAAAABeM/rK2i-wPhU-g/Laie_4.gif";
smileyarr["smiley_209"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kmdePaFQI/AAAAAAAABeQ/SUMa7hVn3A4/Laie_15.gif";
smileyarr["smiley_208"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2kmd7BZGEI/AAAAAAAABeU/jCliggsFopI/Laie_26.gif";
smileyarr["smiley_207"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kmd80EYCI/AAAAAAAABeY/aIW5XYwKfpE/Laie_29.gif";
smileyarr["smiley_206"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2lGTM8080I/AAAAAAAABe4/wcW57qoj260/Laie_31.gif";
smileyarr["smiley_205"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lGTeKKpYI/AAAAAAAABe8/f3AgWOwQ9mM/Laie_33.gif";
smileyarr["smiley_204"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2lGTg-mZiI/AAAAAAAABfA/kLLQ5k4iMMQ/Laie_34.gif";
smileyarr["smiley_203"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2lGTxwrswI/AAAAAAAABfE/NEX-F4-4yiU/Laie_37.gif";
smileyarr["smiley_202"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2lGT64_uVI/AAAAAAAABfI/JOnH1YyhX-M/Laie_38.gif";
smileyarr["smiley_201"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2lGqv4OzYI/AAAAAAAABfM/PNzc3cQcRpg/Laie_39.gif";
smileyarr["smiley_200"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lGq64YpiI/AAAAAAAABfQ/A6NvLuOJZlw/Laie_44.gif";
smileyarr["smiley_199"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lGq0wifhI/AAAAAAAABfU/XrfsxFpoE0E/Laie_48.gif";
smileyarr["smiley_198"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lGrWfE1fI/AAAAAAAABfc/ycVGuSI2uCc/Laie_51.gif";
smileyarr["smiley_196"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2lG6pJoThI/AAAAAAAABfk/n_Cjx6Qe-38/Laie_53.gif";
smileyarr["smiley_195"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lG7CHrXbI/AAAAAAAABfs/rbCGB_nG-k8/Laie_57.gif";
smileyarr["smiley_194"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2lG7ZyD6_I/AAAAAAAABfw/A7v3oK-XmSY/Laie_59.gif";
smileyarr["smiley_193"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lHUSWKUYI/AAAAAAAABf0/0RL0AthpQ3g/Laie_63B.gif";
smileyarr["smiley_192"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lHUXwcyXI/AAAAAAAABf4/KZd3NxkaQV0/Laie_69.gif";
smileyarr["smiley_191"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lHUoELEmI/AAAAAAAABf8/kLfkserv168/Laie_70.gif";
smileyarr["smiley_190"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2kjpjC2DVI/AAAAAAAABbQ/v0SStMIJ1Wg/girl_werewolf.gif";
smileyarr["smiley_189"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lHkStCJmI/AAAAAAAABgI/uk_DNvXXFVo/Laie_81.gif";
smileyarr["smiley_188"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lHkR1S2hI/AAAAAAAABgM/XOjkPhD6MLs/Laie_87A.gif";
smileyarr["smiley_187"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lHkx34w9I/AAAAAAAABgU/V5kSKLYA-nk/Laie_93.gif";
smileyarr["smiley_186"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lHkty5NqI/AAAAAAAABgQ/zmpg92F9T4M/Laie_91B.gif";
smileyarr["smiley_185"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lHkytyhMI/AAAAAAAABgY/YIAKTGhNqhI/Laie_99.gif";
smileyarr["smiley_184"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2lH9pqi7XI/AAAAAAAABgs/wtur_w3AqaU/meeting.gif";
smileyarr["smiley_183"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2lIKwalkRI/AAAAAAAABgw/JuUWJRuXj5g/mosking.gif";
smileyarr["smiley_182"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lILETTX8I/AAAAAAAABg4/bX-C46TMmsk/negative.gif";
smileyarr["smiley_181"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lIXS8ejjI/AAAAAAAABhE/o2tI0bPqpQ8/not_i.gif";
smileyarr["smiley_180"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lIXa4YZhI/AAAAAAAABhI/9GScaChY9Us/offtopic.gif";
smileyarr["smiley_179"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lIXt5n-dI/AAAAAAAABhM/TWKcizXbibM/ok.gif";
smileyarr["smiley_178"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lIX9eaBWI/AAAAAAAABhQ/mcSvbDlVKqg/on_the_quiet2.gif";
smileyarr["smiley_177"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lIpnwZLCI/AAAAAAAABhk/avZ79He16ac/party.gif";
smileyarr["smiley_176"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lI4nq9KgI/AAAAAAAABh0/F44B1hbNzY0/polling.gif";
smileyarr["smiley_175"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lJHZw4wJI/AAAAAAAABiM/7MFxozzxi6k/rofl.gif";
smileyarr["smiley_174"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lJ92GKnFI/AAAAAAAABio/sLxbzKIVlqM/scenic.gif";
smileyarr["smiley_173"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2lKi93LkxI/AAAAAAAABiw/yhsO7bogNY0/scratch_one-s_head.gif";
smileyarr["smiley_172"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2lKjUn_gcI/AAAAAAAABi8/6tPXRbL7lKs/SHABLON_padonak_04.gif";
smileyarr["smiley_171"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2lLALKGSZI/AAAAAAAABjI/WTajMNNuyT0/smile3.gif";
smileyarr["smiley_170"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2lLATg1inI/AAAAAAAABjQ/WlrN3GxK2SY/sorry2.gif";
smileyarr["smiley_169"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lLYEj57TI/AAAAAAAABjk/FnHNXvmOECc/suicide2.gifq";
smileyarr["smiley_168"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2lMpRzvbbI/AAAAAAAABjs/-KFuBzRb6fg/superman2.gif";
smileyarr["smiley_167"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lMpXvA9_I/AAAAAAAABjw/D4FSAgc63Z8/swoon.gif";
smileyarr["smiley_166"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lMqPLFzEI/AAAAAAAABj8/hFs3L9qPWiM/thank_you.gif";
smileyarr["smiley_165"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lM1OIHeeI/AAAAAAAABkM/V-A2h3fmhbc/to_become_senile.gif";
smileyarr["smiley_164"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lM-jsnhZI/AAAAAAAABkU/ezFqHsaBXvQ/to_keep_order.gif";
smileyarr["smiley_163"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2lNL_lY92I/AAAAAAAABkk/pa8eooSOEa4/vampire.gif";
smileyarr["smiley_162"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2lNVOJMBBI/AAAAAAAABk4/VvMR2MYjuTw/wizard.gif";
smileyarr["smiley_161"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lNVm37GyI/AAAAAAAABlA/dErejqUxB9o/yes3.gif";
smileyarr["smiley_160"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2l4nmdN8TI/AAAAAAAABlk/7IjHr24Ph1g/Alex_03.gif";
smileyarr["smiley_157"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2l41UtM6EI/AAAAAAAABl0/lSxikQruq54/cards.gif";
smileyarr["smiley_155"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2l41ywnwFI/AAAAAAAABmA/raFG88JSKbg/connie_29.gif";
smileyarr["smiley_153"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l42J3ctaI/AAAAAAAABmE/vImnOlu5lWk/connie_31.gif";
smileyarr["smiley_152"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2l4_z1LKCI/AAAAAAAABmI/dbJXcIOfCm0/connie_45.gif";
smileyarr["smiley_149"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2l5bp3ZsjI/AAAAAAAABmc/oUMXKycRp0w/connie_eatfishy.gif";
smileyarr["smiley_146"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2l5bw0EiZI/AAAAAAAABmg/sqNNqnKwIpQ/connie_hidinginwall.gif";
smileyarr["smiley_145"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2l5b68SHVI/AAAAAAAABmk/3BktYtGG_jg/connie_jail.gif";
smileyarr["smiley_144"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l5cL5YRKI/AAAAAAAABmo/JWXUk59Gnlo/connie_radioplane.gif";
smileyarr["smiley_143"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2l5sCkLXXI/AAAAAAAABm0/SGF02x9WryU/connie_runner.gif";
smileyarr["smiley_142"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l51WEH2tI/AAAAAAAABnE/FWmFTfPviDY/connie_waterbonsai.gif";
smileyarr["smiley_141"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2l51hMwFlI/AAAAAAAABnM/hLpkA_TzhVA/connie_yoyo.gif";
smileyarr["smiley_140"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2l6N3QsOVI/AAAAAAAABn8/F9L2GgZoSDg/kez_12.gif";
smileyarr["smiley_139"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l6WQ6XDEI/AAAAAAAABoE/WT9Ec2S0QJM/koo-koo.gif";
smileyarr["smiley_138"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2l6WlNLj3I/AAAAAAAABoI/zeVrCmPuDCg/kuzya_02.gif";
smileyarr["smiley_137"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2l6WwhnhgI/AAAAAAAABoM/0rYB76St-XQ/Laie_11.gif";
smileyarr["smiley_136"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2l6neaA90I/AAAAAAAABog/zvyF0r8BfjA/mafia.gif";
smileyarr["smiley_135"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2l6ncji3EI/AAAAAAAABok/i5BKbWtZfJk/Mauridia_22.gif";
smileyarr["smiley_134"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2l62PzB0_I/AAAAAAAABo4/ODQUtWW9N6Q/MG_80.gif";
smileyarr["smiley_132"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l8MzAVd_I/AAAAAAAABqI/TZCBx7Hj79U/mr47_01.gif";
smileyarr["smiley_131"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l8ZOKodoI/AAAAAAAABqU/kSPyWP56TeQ/nosok_02.gif";
smileyarr["smiley_128"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l8ZLOMpSI/AAAAAAAABqY/wvWA7nzri-Q/pepper.gif";
smileyarr["smiley_126"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2l8ZTJahGI/AAAAAAAABqk/YtBeXUXqgeE/Rulezzz_08.gif";
smileyarr["smiley_125"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l8ozWxMtI/AAAAAAAABqo/3aLKorgyVSo/Rulezzz_09.gif";
smileyarr["smiley_124"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2l8pUooqDI/AAAAAAAABqs/plZnAw_ZJVA/Vala_11.gif";
smileyarr["smiley_122"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2l80-VkdwI/AAAAAAAABrA/eqz8s1V0SdM/viannen_08.gif";
smileyarr["smiley_121"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2l81aMlwOI/AAAAAAAABrE/9ugGvkOQWEI/viannen_16.gif";
smileyarr["smiley_120"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2l81_cjZJI/AAAAAAAABrM/FU7jdu2J2jw/viannen_41.gif";
smileyarr["smiley_119"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2l9HpuQ0kI/AAAAAAAABrY/hjBAgW71zoQ/viannen_62.gif";
smileyarr["smiley_118"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l9HiSi7tI/AAAAAAAABrg/lUxFiEDDlBY/viannen_77.gif";
smileyarr["smiley_117"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l9XX0H0dI/AAAAAAAABrk/lueGHB1zIW8/viannen_96.gif";
smileyarr["smiley_116"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2l9XgDoqsI/AAAAAAAABrs/wuKr2bN0RdU/viannen_98.gif";
smileyarr["smiley_115"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l9Xma6lwI/AAAAAAAABr0/8pqQQn8tFV0/viannen_104.gif";
smileyarr["smiley_114"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2l9psir1sI/AAAAAAAABr8/3hjCq4N5VXc/viannen_109.gif";
smileyarr["smiley_113"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2l9p5lSuBI/AAAAAAAABsE/cLHNS3fnSPA/viannen_114.gif";
smileyarr["smiley_112"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2l9qDclvVI/AAAAAAAABsM/RDGfpMWcCoE/zagruz.gif";
smileyarr["smiley_111"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2l9vjJ99II/AAAAAAAABsQ/qhcSG9RPPkA/zomby.gif";
smileyarr["smiley_110"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9TzJ__UgI/AAAAAAAAAn0/vRoUY61LWQ0/ill0.gif";
smileyarr["smiley_109"]="http://lh4.ggpht.com/_PrM5VcwpZio/Sx9Ty2UhuQI/AAAAAAAAAns/Jznzx5l4pBw/headgear94.gif";
smileyarr["smiley_108"]="http://lh6.ggpht.com/_PrM5VcwpZio/Sx9TZuqEW4I/AAAAAAAAAl8/3HwnTjosLH0/foodanddrink0.gif";
smileyarr["smiley_107"]="http://lh5.ggpht.com/_PrM5VcwpZio/Sx9TZWeAz4I/AAAAAAAAAl4/-Y3A4r6owvE/fighting12.gif";
smileyarr["smiley_106"]="http://lh4.ggpht.com/_PrM5VcwpZio/Sx9TS_mNj-I/AAAAAAAAAlQ/ZZw3Z20Gp7U/doh7.gif";
smileyarr["smiley_105"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9TS5Q0NcI/AAAAAAAAAlM/xlxyqk2L4IM/disdain6.gif";
smileyarr["smiley_104"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9TFV5-mTI/AAAAAAAAAkI/zG7l5W6w9SA/character25.gif";
smileyarr["smiley_103"]="http://lh5.ggpht.com/_PrM5VcwpZio/Sx9TEyOWYmI/AAAAAAAAAj8/MNzZU9Ucd88/celebrate16.gif";
smileyarr["smiley_102"]="http://lh6.ggpht.com/_PrM5VcwpZio/Sx9TEq0Ex1I/AAAAAAAAAj4/7gTmBTUr1Qw/celebrate13.gif";
smileyarr["smiley_101"]="http://lh6.ggpht.com/_PrM5VcwpZio/Sx9S5IAeheI/AAAAAAAAAjc/RDxZNCeEhTo/celebrate8.gif";
smileyarr["smiley_100"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9S4xoIlyI/AAAAAAAAAjU/F2aup8Wx23I/badtaste25.gif";
smileyarr["smiley_99"]="http://lh4.ggpht.com/_PrM5VcwpZio/Sx9Sy-xlkDI/AAAAAAAAAiw/XGFfHGB40jo/angry17.gif";
smileyarr["smiley_98"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9Syoll4WI/AAAAAAAAAis/705fUdNX7tg/angry16.gif";
smileyarr["smiley_97"]="http://lh4.ggpht.com/_PrM5VcwpZio/Sx9Syi_6PDI/AAAAAAAAAio/lWgA2LuYN2U/angry14.gif";
smileyarr["smiley_96"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9SnHObYmI/AAAAAAAAAiQ/VSPPTuCbVVE/angry0.gif";
smileyarr["smiley_95"]="http://lh6.ggpht.com/_PrM5VcwpZio/Sx9Smx-vJHI/AAAAAAAAAiM/rUFdNsRiY8I/angel9.gif";
smileyarr["smiley_94"]="http://lh5.ggpht.com/_PrM5VcwpZio/Sx9SPcSs51I/AAAAAAAAAhg/dP3YtFN4LYE/aloofandbored0.gif";
smileyarr["smiley_93"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9ULoghZvI/AAAAAAAAApI/W04z0e0FsHc/love2.gi";
smileyarr["smiley_92"]="http://lh4.ggpht.com/_PrM5VcwpZio/Sx9UVcKrsJI/AAAAAAAAApo/BWx-cUyCI8s/love21.gif";
smileyarr["smiley_91"]="http://lh5.ggpht.com/_PrM5VcwpZio/Sx9UhAWxznI/AAAAAAAAAqI/z8nKLncyRuM/love42.gif";
smileyarr["smiley_90"]="http://lh6.ggpht.com/_PrM5VcwpZio/Sx9Uw9pLufI/AAAAAAAAAq4/aMFj6rxNigY/sad2.gif";
smileyarr["smiley_89"]="http://lh5.ggpht.com/_PrM5VcwpZio/Sx9Uw_jqHCI/AAAAAAAAAq0/dTrlUibB4bY/music24.gif";
smileyarr["smiley_88"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9UxZouLtI/AAAAAAAAArA/pQ5ZR9CCwzQ/sad17.gif";
smileyarr["smiley_87"]="http://lh4.ggpht.com/_PrM5VcwpZio/Sx9U8KTA7yI/AAAAAAAAArY/Y1Wj0h_Tl4w/sad21.gif";
smileyarr["smiley_86"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9VsxPUSiI/AAAAAAAAAt8/i7CLIIOVjUw/sporty37.gif";
smileyarr["smiley_85"]="http://lh3.ggpht.com/_PrM5VcwpZio/Sx9V8f-quFI/AAAAAAAAAug/BoecUsrHkIU/sporty62.gif";
smileyarr["smiley_84"]="http://lh5.ggpht.com/_PrM5VcwpZio/Sx9V8jYfsOI/AAAAAAAAAuk/703NFMp6InE/sporty82.gif";
smileyarr["smiley_83"]="http://lh6.ggpht.com/_PrM5VcwpZio/Sx9V8yNnyGI/AAAAAAAAAus/bEqSdSVdvaY/tv8.gif";
smileyarr["smiley_82"]="http://lh3.ggpht.com/_PrM5VcwpZio/SwLZHRSHUCI/AAAAAAAAAYA/yYf23x1KYgQ/lotpot.gif";
smileyarr["smiley_81"]="http://lh6.ggpht.com/_PrM5VcwpZio/SwLYXx-gnQI/AAAAAAAAAWo/KIYvBJmnq-g/brb.gif";
smileyarr["smiley_80"]="http://lh5.ggpht.com/_PrM5VcwpZio/SwLZrFwGvsI/AAAAAAAAAZE/q1N5-fLSInE/smarty.gif";
smileyarr["smiley_79"]="http://lh5.ggpht.com/_PrM5VcwpZio/SwLaI59nMbI/AAAAAAAAAaA/XtUMbyIcSCI/yesss.gif";
smileyarr["smiley_78"]="http://lh4.ggpht.com/_PrM5VcwpZio/SwLZrDrpGVI/AAAAAAAAAZA/_xvERm3pKKE/slap.gif";
smileyarr["smiley_77"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SYhrUirj_4I/AAAAAAAAAJc/uw1X2_jXIGs/no.gif";
smileyarr["smiley_76"]="http://lh4.ggpht.com/_PrM5VcwpZio/SwLZ_TNoN9I/AAAAAAAAAZw/TlFG6g_yNnE/victory.gif";
smileyarr["smiley_75"]="http://lh6.ggpht.com/_PrM5VcwpZio/SwLX-ENnywI/AAAAAAAAAWM/8SvmCUqXyO4/avatar22403_1.gif";
smileyarr["smiley_74"]="http://lh5.ggpht.com/_PrM5VcwpZio/SwLYjMRKakI/AAAAAAAAAXE/NosT1oQVJAU/daru.gif";
smileyarr["smiley_73"]="http://lh6.ggpht.com/_PrM5VcwpZio/SwLYjfSe5rI/AAAAAAAAAXI/KSoxdk2GHZI/declare.gif";
smileyarr["smiley_72"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SYhrUzPTPkI/AAAAAAAAAJk/xc4cN1VDpgs/sagar.gif";
smileyarr["smiley_71"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/SZ7SpCSinxI/AAAAAAAAAWc/Envjv3CWgsU/sm28.gif";
smileyarr["smiley_70"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SYhrhqghdNI/AAAAAAAAAKE/yh-jcjADTIQ/wallbash.gif";
smileyarr["smiley_69"]="http://lh3.ggpht.com/_PrM5VcwpZio/SwLY7SQjT_I/AAAAAAAAAXo/6RHcZbfLLCk/happy.gif";
smileyarr["smiley_68"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/SZ7ReVdxz6I/AAAAAAAAAVk/oqU4IA4PwbE/sm6.gif";
smileyarr["smiley_67"]="http://lh6.ggpht.com/_zam2DdYJLxc/S0RAR4_O77I/AAAAAAAAADE/S9NZQTZwltI/secret.gif";
smileyarr["smiley_66"]="http://lh5.ggpht.com/_zam2DdYJLxc/S0RAZn_ie4I/AAAAAAAAADI/e4_Q_ouljhs/cry.gif";
smileyarr["smiley_65"]="http://lh5.ggpht.com/_zam2DdYJLxc/S0RAxja2gvI/AAAAAAAAADM/5cNNuSTXXlo/icon_cry.gif";
smileyarr["smiley_64"]="http://lh6.ggpht.com/_zam2DdYJLxc/S0RAybRckuI/AAAAAAAAADY/5LZrpu0euQc/blow.gif";
smileyarr["smiley_63"]="http://lh4.ggpht.com/_zam2DdYJLxc/S0RAymVRdhI/AAAAAAAAADc/bKPJ0-OaBbI/blushing.gif";
smileyarr["smiley_62"]="http://lh6.ggpht.com/_zam2DdYJLxc/S0RBHs0TV8I/AAAAAAAAAEA/mhdvSt7q_PA/bye.gif";
smileyarr["smiley_61"]="http://lh6.ggpht.com/_zam2DdYJLxc/S0RBc0NW_xI/AAAAAAAAAEQ/sGhtI9cKNs0/emoticon%20lol.gif";
smileyarr["smiley_60"]="http://lh4.ggpht.com/_zam2DdYJLxc/S0RBdNd7kgI/AAAAAAAAAEU/dVuNgh1uTSQ/face%20lol.gif";
smileyarr["smiley_59"]="http://lh6.ggpht.com/_zam2DdYJLxc/S0RBmsujsSI/AAAAAAAAAEc/A1H1UxZn-ng/flowers%20for%20you.gif";
smileyarr["smiley_58"]="http://lh5.ggpht.com/_zam2DdYJLxc/S0RBnIVoz4I/AAAAAAAAAEo/7Y4hZyRE1Uk/ha%20ha%20ha.gif";
smileyarr["smiley_57"]="http://lh3.ggpht.com/_zam2DdYJLxc/S0RB8w4X_5I/AAAAAAAAAFU/uoL7K5NPqik/pizza.gif";
smileyarr["smiley_56"]="http://lh3.ggpht.com/_zam2DdYJLxc/S0RCLSTVsOI/AAAAAAAAAFo/Ze4An7gbfHE/transforming.gif";
smileyarr["smiley_55"]="http://lh5.ggpht.com/_zam2DdYJLxc/S0RCiMloaKI/AAAAAAAAAGE/dUkliIG-lsQ/yaping%20dog.gif";
smileyarr["smiley_54"]="http://lh3.ggpht.com/_zam2DdYJLxc/S0RCpEM2B-I/AAAAAAAAAGQ/zuIZUA_eiYM/character11.gif";
smileyarr["smiley_53"]="http://lh6.ggpht.com/_zam2DdYJLxc/S0RDv4su7cI/AAAAAAAAAII/-apDeAEnn9Q/sad15.gif";
smileyarr["smiley_52"]="http://lh5.ggpht.com/_PrM5VcwpZio/SwLaI4Qr5eI/AAAAAAAAAaE/2FtDoGnRq7g/yo.gif";
smileyarr["smiley_51"]="http://lh4.ggpht.com/_PrM5VcwpZio/SwLaIiTPSzI/AAAAAAAAAZ0/NPIDQoipaPM/wave.gif";
smileyarr["smiley_50"]="http://lh4.ggpht.com/_PrM5VcwpZio/SwLZ_HNlZ1I/AAAAAAAAAZs/LANGkStzxqg/verysad.gif";
smileyarr["smiley_49"]="http://lh5.ggpht.com/_PrM5VcwpZio/SwLYYauhUGI/AAAAAAAAAW4/t4zhr1YW5Jo/closed.gif";
smileyarr["smiley_48"]="http://lh5.ggpht.com/_PrM5VcwpZio/SwLY7ldgYqI/AAAAAAAAAX0/gt1nxKomtK8/kiss.gif";
smileyarr["smiley_47"]="http://lh6.ggpht.com/_PrM5VcwpZio/SwLYLF67-HI/AAAAAAAAAWc/8dnAWOIQYmQ/bigboss.gif";
smileyarr["smiley_46"]="http://lh3.ggpht.com/_PrM5VcwpZio/SwLYYMRE41I/AAAAAAAAAWw/8wVVugVeRu8/calling.gif";
smileyarr["smiley_45"]="http://lh5.ggpht.com/_PrM5VcwpZio/SwLYu5uzk7I/AAAAAAAAAXc/6LLi32JwykE/don.gif";
smileyarr["smiley_44"]="http://lh5.ggpht.com/_PrM5VcwpZio/SwLYvA5eqFI/AAAAAAAAAXg/bAIUArsPmhY/fool.gif";
smileyarr["smiley_43"]="http://lh4.ggpht.com/_PrM5VcwpZio/SwLZewqOpGI/AAAAAAAAAYw/eYqagXxprDo/rose.gif";
smileyarr["smiley_42"]="http://lh3.ggpht.com/_PrM5VcwpZio/SwLZHrFOeWI/AAAAAAAAAYI/sUknIkzCFh0/nope.gif";
smileyarr["smiley_41"]="http://lh6.ggpht.com/_PrM5VcwpZio/SwLZ1Cb3gSI/AAAAAAAAAZM/IKGgY0Gr9-g/snore.gif";
smileyarr["smiley_40"]="http://lh3.ggpht.com/_PrM5VcwpZio/SwLZegq2PPI/AAAAAAAAAYk/ZTt1rlt_ECE/popcorn2.gif";
smileyarr["smiley_39"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdDO5SObvEI/AAAAAAAAALA/Tr3vgIPv-sA/sFi_wwe.gif";
smileyarr["smiley_38"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SYhqnOJLceI/AAAAAAAAAIc/x38wTP46Ksw/clap2.gif";
smileyarr["smiley_37"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SYhq5OBxbMI/AAAAAAAAAJE/Nwoe_IMzaUQ/icon_rolleyes.gif";
smileyarr["smiley_36"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/SYhrSu7yMmI/AAAAAAAAAJM/40m-cBN1fDQ/lol.gif";
smileyarr["smiley_35"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sxd1MHrLe0I/AAAAAAAABDk/ykQbxj1lZCA/fallenangel.gif";
smileyarr["smiley_34"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1lK71-K0I/AAAAAAAAAmQ/DblhRzalY5s/beee.gif";
smileyarr["smiley_33"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1ej6eI8jI/AAAAAAAAAkw/ZzeDZpCvGmY/18.gif";
smileyarr["smiley_32"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1eks29RbI/AAAAAAAAAlQ/r1EhtWkSn6A/49.gif";
smileyarr["smiley_31"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sxd0hgabPLI/AAAAAAAABC0/foY8T5ly3-4/couple.gif";
smileyarr["smiley_30"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sa1mPKduAUI/AAAAAAAAAog/NM3Afa2ychU/yawn.gif";
smileyarr["smiley_29"]="http://lh3.ggpht.com/_PrM5VcwpZio/S1vVHTiKtsI/AAAAAAAABOk/8Cuv4dx5888/eyebrow.gif";
smileyarr["smiley_28"]="http://lh3.ggpht.com/_PrM5VcwpZio/S1vVH8KMa3I/AAAAAAAABOw/RZgwZzVNPjk/listening%20music.gif";
smileyarr["smiley_27"]="http://lh6.ggpht.com/_PrM5VcwpZio/S1vVU5CXjII/AAAAAAAABO0/w0LcsGbbn5I/studying.gif";
smileyarr["smiley_26"]="http://lh6.ggpht.com/_PrM5VcwpZio/S1vV43IXgmI/AAAAAAAABPE/6sMSC1Bf1Nc/d_bubble.gif";
smileyarr["smiley_25"]="http://lh3.ggpht.com/_PrM5VcwpZio/S1vWX-X0eWI/AAAAAAAABPQ/rhMAgRlFD20/Yow%21.gif";
smileyarr["smiley_24"]="http://lh6.ggpht.com/_PrM5VcwpZio/S1vZZRPxxhI/AAAAAAAABPg/xN2wtXmQE6U/Applaus.gif";
smileyarr["smiley_23"]="http://lh5.ggpht.com/_PrM5VcwpZio/S1vZZt0LRoI/AAAAAAAABPo/ZyNLs9Odl7E/smiley-laughing014%5B1%5D.gif";
smileyarr["smiley_22"]="http://lh3.ggpht.com/_PrM5VcwpZio/S1vm6zncVwI/AAAAAAAABP8/MbtD2oXyTaY/character0110.gif";
smileyarr["smiley_21"]="http://lh3.ggpht.com/_PrM5VcwpZio/S1vm7Gvf0yI/AAAAAAAABQA/kgS7JHQzbqY/character0113.gif";
smileyarr["smiley_20"]="http://lh4.ggpht.com/_PrM5VcwpZio/S1vm7HqAeEI/AAAAAAAABQE/iXNkX7TIG6I/character0114.gif";
smileyarr["smiley_19"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2kk7cHCziI/AAAAAAAABcs/b1fwbOUJ6bE/JC_link.gif";
smileyarr["smiley_18"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kkq5ZvQaI/AAAAAAAABcc/r7UU4MSvuZo/JC_goodpost.gif";
smileyarr["smiley_17"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2kllndsQFI/AAAAAAAABdk/LAtBsrgGfag/JC_you_rock.gif";
smileyarr["smiley_16"]="http://lh4.ggpht.com/_PrM5VcwpZio/S2klWEgyfJI/AAAAAAAABdY/B6dkpFn63mM/JC_ThankYou.gif";
smileyarr["smiley_15"]="http://lh6.ggpht.com/_PrM5VcwpZio/S2l6DH1kLII/AAAAAAAABnY/7vD9kvdp20M/crigon_03.gif";
smileyarr["smiley_14"]="http://lh5.ggpht.com/_PrM5VcwpZio/S2l6DWsKD8I/AAAAAAAABnc/73SO4JW2-hk/crigon_04.gif";
smileyarr["smiley_13"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2l8pjlv01I/AAAAAAAABq0/mUIn7WeRaXo/viannen_01.gif";
smileyarr["smiley_12"]="http://lh5.ggpht.com/_PrM5VcwpZio/Sx9VLYgYXwI/AAAAAAAAAsE/Qx49qKpbOzE/signsandflags16.gif";
smileyarr["smiley_11"]="http://lh5.ggpht.com/_PrM5VcwpZio/Sx9VUQLgQuI/AAAAAAAAAss/sb71vaf2Fr4/signsandflags35.gif";
smileyarr["smiley_10"]="http://lh6.ggpht.com/_PrM5VcwpZio/Sx9VUuWg10I/AAAAAAAAAs4/0uHXUvtTB2g/signsandflags43.gif";
smileyarr["smiley_09"]="http://lh5.ggpht.com/_PrM5VcwpZio/S1vU26OCjwI/AAAAAAAABOc/hwCYms2bUys/WTF.gif";
smileyarr["smiley_08"]="http://lh5.ggpht.com/_PrM5VcwpZio/S1vnz6dmh_I/AAAAAAAABRU/vRBYtPBP_Dc/sign0008.gif";
smileyarr["smiley_07"]="http://lh6.ggpht.com/_PrM5VcwpZio/S1vn-25TNbI/AAAAAAAABRg/GeVNP8Sxq6Q/sign0081.gif";
smileyarr["smiley_06"]="http://lh5.ggpht.com/_PrM5VcwpZio/S1voHm3XjeI/AAAAAAAABRs/mhDLdRdX-ug/sign0089.gif";
smileyarr["smiley_05"]="http://lh5.ggpht.com/_PrM5VcwpZio/S1voHpGHbjI/AAAAAAAABRw/gzA2eaFFWas/sign0091.gif";
smileyarr["smiley_04"]="http://lh3.ggpht.com/_PrM5VcwpZio/S1voSdEmIjI/AAAAAAAABSI/3l9bWpGyRpg/sign0142.gif";
smileyarr["smiley_03"]="http://lh5.ggpht.com/_PrM5VcwpZio/S1voSRfUeAI/AAAAAAAABSQ/ihgRWoHjo0M/sign0144.gif";
smileyarr["smiley_02"]="http://lh3.ggpht.com/_PrM5VcwpZio/S1vobYDSrJI/AAAAAAAABSU/Xs13_nB0Ki8/sign0150.gif";
smileyarr["smiley"]="http://lh3.ggpht.com/_PrM5VcwpZio/S1vobzio29I/AAAAAAAABSk/D3mGQfjTVbU/sign0163.gif";




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