//
// ==UserScript==
// @name Auto-Shkolota by Widibf
// @namespace http://upyach.ca/
// @version 0.04.1
// @source  http://upyach.ca/
// @description Этот скрипт даёт вам приимущество в интеллектуальных дискусиях
// @include *
// ==/UserScript==

/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
    'all_shortcuts':{},//All the shortcuts are stored in this array
    'add': function(shortcut_combination,callback,opt) {
        //Provide a set of default options
        var default_options = {
            'type':'keydown',
            'propagate':false,
            'disable_in_input':false,
            'target':document,
            'keycode':false
        }
        if(!opt) opt = default_options;
        else {
            for(var dfo in default_options) {
                if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
            }
        }

        var ele = opt.target;
        if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
        var ths = this;
        shortcut_combination = shortcut_combination.toLowerCase();

        //The function to be called at keypress
        var func = function(e) {
            e = e || window.event;
            
            if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
                var element;
                if(e.target) element=e.target;
                else if(e.srcElement) element=e.srcElement;
                if(element.nodeType==3) element=element.parentNode;

                if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
            }
    
            //Find Which key is pressed
            if (e.keyCode) code = e.keyCode;
            else if (e.which) code = e.which;
            var character = String.fromCharCode(code).toLowerCase();
            
            if(code == 188) character=","; //If the user presses , when the type is onkeydown
            if(code == 190) character="."; //If the user presses , when the type is onkeydown

            var keys = shortcut_combination.split("+");
            //Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
            var kp = 0;
            
            //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
            var shift_nums = {
                "`":"~",
                "1":"!",
                "2":"@",
                "3":"#",
                "4":"$",
                "5":"%",
                "6":"^",
                "7":"&",
                "8":"*",
                "9":"(",
                "0":")",
                "-":"_",
                "=":"+",
                ";":":",
                "'":"\"",
                ",":"<",
                ".":">",
                "/":"?",
                "\\":"|"
            }
            //Special Keys - and their codes
            var special_keys = {
                'esc':27,
                'escape':27,
                'tab':9,
                'space':32,
                'return':13,
                'enter':13,
                'backspace':8,
    
                'scrolllock':145,
                'scroll_lock':145,
                'scroll':145,
                'capslock':20,
                'caps_lock':20,
                'caps':20,
                'numlock':144,
                'num_lock':144,
                'num':144,
                
                'pause':19,
                'break':19,
                
                'insert':45,
                'home':36,
                'delete':46,
                'end':35,
                
                'pageup':33,
                'page_up':33,
                'pu':33,
    
                'pagedown':34,
                'page_down':34,
                'pd':34,
    
                'left':37,
                'up':38,
                'right':39,
                'down':40,
    
                'f1':112,
                'f2':113,
                'f3':114,
                'f4':115,
                'f5':116,
                'f6':117,
                'f7':118,
                'f8':119,
                'f9':120,
                'f10':121,
                'f11':122,
                'f12':123
            }
    
            var modifiers = { 
                shift: { wanted:false, pressed:false},
                ctrl : { wanted:false, pressed:false},
                alt  : { wanted:false, pressed:false},
                meta : { wanted:false, pressed:false}    //Meta is Mac specific
            };
                        
            if(e.ctrlKey)    modifiers.ctrl.pressed = true;
            if(e.shiftKey)    modifiers.shift.pressed = true;
            if(e.altKey)    modifiers.alt.pressed = true;
            if(e.metaKey)   modifiers.meta.pressed = true;
                        
            for(var i=0; k=keys[i],i<keys.length; i++) {
                //Modifiers
                if(k == 'ctrl' || k == 'control') {
                    kp++;
                    modifiers.ctrl.wanted = true;

                } else if(k == 'shift') {
                    kp++;
                    modifiers.shift.wanted = true;

                } else if(k == 'alt') {
                    kp++;
                    modifiers.alt.wanted = true;
                } else if(k == 'meta') {
                    kp++;
                    modifiers.meta.wanted = true;
                } else if(k.length > 1) { //If it is a special key
                    if(special_keys[k] == code) kp++;
                    
                } else if(opt['keycode']) {
                    if(opt['keycode'] == code) kp++;

                } else { //The special keys did not match
                    if(character == k) kp++;
                    else {
                        if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                            character = shift_nums[character]; 
                            if(character == k) kp++;
                        }
                    }
                }
            }
            
            if(kp == keys.length && 
                        modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
                        modifiers.shift.pressed == modifiers.shift.wanted &&
                        modifiers.alt.pressed == modifiers.alt.wanted &&
                        modifiers.meta.pressed == modifiers.meta.wanted) {
                callback(e);
    
                if(!opt['propagate']) { //Stop the event
                    //e.cancelBubble is supported by IE - this will kill the bubbling process.
                    e.cancelBubble = true;
                    e.returnValue = false;
    
                    //e.stopPropagation works in Firefox.
                    if (e.stopPropagation) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    return false;
                }
            }
        }
        this.all_shortcuts[shortcut_combination] = {
            'callback':func, 
            'target':ele, 
            'event': opt['type']
        };
        //Attach the function with the event
        if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
        else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
        else ele['on'+opt['type']] = func;
    },

    //Remove the shortcut - just specify the shortcut and I will remove the binding
    'remove':function(shortcut_combination) {
        shortcut_combination = shortcut_combination.toLowerCase();
        var binding = this.all_shortcuts[shortcut_combination];
        delete(this.all_shortcuts[shortcut_combination])
        if(!binding) return;
        var type = binding['event'];
        var ele = binding['target'];
        var callback = binding['callback'];

        if(ele.detachEvent) ele.detachEvent('on'+type, callback);
        else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
        else ele['on'+type] = false;
    }
}

function get_negron( max){
   var negron =["ПАШЁЛЬ ТИ НАХУУУЙ!",
"ГНИДА БЛЯДЬ ФАШИСТКАЯ! Петушок.",
"Толсто, сударь! А пососать хотите?",
"ОЛололол. Ты снова включил петушачий, уёбочкин?",
"Ты слился на первой фразе, петушок.",
"Вышел такой праздничный, у отсосал?",
"Сударь, да у вас же БАТТХЕРТ!",
"Вы пишите 9 слов всего за over9000 секунд.",
"И вопрос: А не вы ли питушок часом?",
"Вы слились! Идите и берите халявные билеты на бугурт!",
"У вас БАТТХЁРТ, сударь!",
"Сядьте и полежите, а я вам малафьи нацежу в тарелочку.",
"Вы не имеете меня осуждать, у вас БАТТХЁРТ!",
"Удачного сосания! В приз поездка на бугурТ!",
"Петушок, ваше существование быссмысленно!",
"У вас БАТТХЁРТ - ликование, когда ты сосёшь.",
"Оно у вас даже не прошло.",
"Сядьте на диван, пососите, посрите в дырках дивана!",
"Билет на бугурт хватайте и нахуй улетайте)",
"Да вы же больны!",
"У вас Баттхёрт!",
"Давно ебёте машинки, сударь?",
"да вы точно БАТТХЁРТОМ заразились!",
"Сволочь это вообще не имя и даже не МЕСТОИМЕНИЕ!",
"Вы сударь, наркоша!",
"Сосаните у Тараса Фульбы.",
"Вы промахиваетесь сударь!",
"Я далеко от вас по развитию оторвался,  это видно.",
"Вы проигрываете смайлику когда вы задрот в игру с хуйцом (если он у вас есть) .",
"Вот ваши билеты на бугурт: http://natribu.org/",
"Что сударь?",
"Да вы же школьник!",
"Стрелку метнул - за щёку глотнул.",
"Продолжайте у меня сосать, кончая блословами не имеющих смысла.",
"Вас уже обосрали и вы слились!",
"Не намекайте мне на то, чего нету!",
"вы ничего не ставите. Вы просто школоло.",
"Впрочем вы слились. Я не вижу смысла в общении с вами. Вы петушок.",
"Сударь, вам открыть глаза (которые на жопе, вы же ей набираете)?",
"Сударь, да вы бредите! Я же не могу писать сообщение в зеркало!",
"Наркоклиника у вас в жопе, господин Полицейский. Ой тьфу ЯйцелоБ!",
"Ты оттуда говнецо жрал?",
"И мою жопу осматривал, с головой туда лез да?",
"Веселье... Блядь, жда ты наркожа с БАТТЛДЖАДОМ.",
"А вы видимо идиот и клоун! Диагнос ваш ясен: ПИДОТА.",
"Вы проверяли, сударь?",
"И писать грамотнее научились? Гугл или блядонастрйока о который вы мне говорили?",
"Сливайтесь. господа! Вы уже говнО!",
"ты понял что за хуйню ты сморозил?",
"Теперь на тебя насрут на улице, пизда говноголовая :D",
"Писать я умею, а текст ты поправлять начал недавно.",
"Всё я обосновываю, вы только сударь после бугурта ослепли.",
"А разговариваю я тоже связно.",
"Ты чтоле?",
"Ну ты и хуйню сейчас спорол. Я удивляюсь диалогу с вами: я узнал много нового, например что существуют такие сказочные долбоёбы как вы :D",   
"КОКОКОЙ ГРОЗНЫЙ",
"ну позови еще пасанчиков с раёна",
"ЗАСТАВЬ МЕНЯ, ЕСЛИ СМОЖИШ",
"spellcheck в настройках браузера включи, для начала",
"уёбок блять",
"ебаный патлатый ГОВНАРЬ",
"школоло ебло затки в каком классе 6,7,??",
"хахаха школота",
"че еблишко заткнул ШкОлОТа",
"11 классов закончи",
"совсем дибил?",
"уебшише лесное",
"ебись мою маму в задницу",
"поцелуй меня в жопу",
"я твою мать ебал шакал!!!",
"чего вы добываетесЬ??????",
"Поставь троллфейс на аватарку – заяви всем, что ты обожаешь долбиться в жопу.",
"сволочь (да,с маленькой буквы) тварь, УМРИ В СТРАШНЫХ МУКАХ!",
"тебе настал Пипец штаб моих друзей опавещён и они идут",
"ТЫ ПЕТУШОК",
"ТЫ УЕБАН",
"ты гавно тупое пытаетешся идти против сложившейся организации",
"ты вообще понимаете что у вас ни чего не получится? ",
"тебя затролят до такой степени что вы где либо в интернете показаться испугаетесь.",
"обдолбаные дебилы ,как же вы все бесите. у вас словарный запас менее 100 слов я больше чем уверен",
"давай быстрее придумывай",
"шевели своим носком вонючим который у тебя вместо мозгов",
"просто я сейчас на каникулах и мн пздц как скучно и нехрен делать,вот и решил с кем ни будь поспорить :D люблю я это делать .",
"спасибо,повеселился читая ваши ответы",
"Пизды тебе дадут если в реале встретят !",
"ОООООООООООООООО хуесос)___",
"пизда тебе!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
"Уходи отсюда,петушок",
"пидор пришел",
"значит ты против оппозиции? Ктоздесь влатсь? МЫ! Кто здесь власть ,МЫ!",
"вы ни имеете ни кого права оскорблять личность",
"умник дохуя?",
"дерни себе анус",
"ты анус",
"хах)быдло собрались в группу)",
"Теперь ты официально являешься ТП",
"петушок замолк >:( скучно",
"Черный Властелин ближе, чем ты думаешь..",
"Мой пенис ближе чем ты думаешь...",
"Я ближе, чем ты думаешь",
"ты - блевотина бегемота потеющего кровью!!",
"обделенный уебан,который хочет славы бляя",
"не оправдывайся, школьник",
"Мой фаллос ближе чем вы думаете.",
"Даже КЭП намекает тебе соснуть)",
"твоя жопа - вот это веселье, про попу твоей мамы, лучше промолчу",
"по сути - ты долбоеб. Почему, спросишь ты, долбоеб? Я отвечу - потому что не умеешь писать, обосновывать свои заявления и разговаривать связно.",
"дитё,кто ты такое,что б говорить кто я?",
"я не совсем понял смысл той бредятины,которую ты написал",
"у мамаши своей спроси",
"ты по моему монитор с зеркалом перепутал:D",
"школолопсевдотрололо ты)",
"ребёнок-рачёнок,ты можешь по человечески выложить свою точку зрения?",
"ты лохудра,которая без посторонней помощи ничего не может ответить)",
"c моей стороны, пора бы просто забить ны тебя",
"да ты сам ведёшь себя как школьник",
"ну и клоун ты, тьфу.",
"Я в домике! - закричал маленький долбоебик, огрызнувшись.",
"ебать, да мы еще и стрелки метаем",
"это даже смешно.",
"чего флудишь? сказать нечего?",
"для слоупока без глаз ты слишком быстро соображаешь",
"мамаша твоя меня обслуживает",
"достойный ответ.",
"ты бессмысленен",
"освоил википедию. Молодец.",
"Школота проснулась я смотрю.",
"Тебе видней. У тебя знания все из гугла.",
"ПНХ",
"букв мало. Или много. Короче похуй.",
"Отсоси, чмошник! Уебывай не дожидаясь следующего вопроса.",
"И снова победила тупость печальных мудозвонов, называющих себя знатоками...",
"Нету ответа? Нету! Куриные мозги местных уебков расплавились и завоняли. Пиздец.",
"Вы меня заебали!",
"Время вышло долбоёбы. Идите книги читать бля",
"Проебали вы время, дуболомы! Ждите следующего заёба.",
"А отсосать?",
"Хуй с вами, мудозвоны",
"Ни один пидор не дал правильного ответа. Вы посылаетесь нахуй.",
"Ебанутые вы.",
"Че, дрочите, слабоумные?",
"Теперь дошло, дебил?",
"начнем с того вы сами всё начали, ПЕТУШОК!"
]; 

    var text="";
    for(var i=0; i<max; i++){
        text += negron[Math.floor(Math.random( ) * (negron.length))];
    }
    return text;
}
function paste_text(max){
    var text=get_negron(max);
    var elem = document.activeElement;
    if(elem.contentEditable=="true"){
    var old = elem.innerHTML;
    elem.innerHTML = old +" "+text;
    }
    else if(elem.tagName.toLowerCase() == "textarea" || elem.type.toLowerCase() == "text" ){
    var old = elem.value;
    elem.value = old +" "+text;
    }


    if(elem.type == "text"){
        var old2 = elem.innerHTML;
        elem.innerHTML = old2 +" "+text;
    }

    
    
}


shortcut.add("Ctrl+Shift+F1",function(){paste_text(1);});
