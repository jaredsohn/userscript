// ==UserScript==
// @name            Hack Forums Replacement manager
// @namespace       Snorlax
// @description		Replace text like [help] to "Visit the Help Docs"
// @require			http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @require			http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==


// CM_config settings
GM_config.init('Advanced Replacement Manager by Snorlax',{
    'Field1':
    {
        'label': 'String', 
        'section': ['Replacement 1'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field2':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled1': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': true // store a boolean
    },
    'Field3':
    {
        'label': 'String', 
        'section': ['Replacement 2'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field4':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled2': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field5':
    {
        'label': 'String', 
        'section': ['Replacement 3'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field6':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled3': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field7':
    {
        'label': 'String', 
        'section': ['Replacement 4'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field8':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled4': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field9':
    {
        'label': 'String', 
        'section': ['Replacement 5'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field10':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled5': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field11':
    {
        'label': 'String', 
        'section': ['Replacement 6'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field12':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled6': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field13':
    {
        'label': 'String', 
        'section': ['Replacement 7'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field14':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled7': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field15':
    {
        'label': 'String', 
        'section': ['Replacement 8'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field16':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled8': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field17':
    {
        'label': 'String', 
        'section': ['Replacement 9'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field18':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled9': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field19':
    {
        'label': 'String', 
        'section': ['Replacement 10'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field20':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled10': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },    
    'Field21':
    {
        'label': 'String', 
        'section': ['Replacement 11'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field22':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled11': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field23':
    {
        'label': 'String', 
        'section': ['Replacement 12'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field24':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled12': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field25':
    {
        'label': 'String', 
        'section': ['Replacement 13'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field26':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled13': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field27':
    {
        'label': 'String', 
        'section': ['Replacement 14'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field28':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled14': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field29':
    {
        'label': 'String', 
        'section': ['Replacement 15'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field30':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled15': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field31':
    {
        'label': 'String', 
        'section': ['Replacement 16'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field32':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled16': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field33':
    {
        'label': 'String', 
        'section': ['Replacement 17'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field34':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled17': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field35':
    {
        'label': 'String', 
        'section': ['Replacement 18'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field36':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled18': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field37':
    {
        'label': 'String', 
        'section': ['Replacement 19'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field38':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled19': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    },
    'Field39':
    {
        'label': 'String', 
        'section': ['Replacement 20'],
        'type': 'text', 
        'default': '[help]' 
    },
    'Field40':
    {
        'label': 'Replacement', 
        'type': 'text', 
        'default': 'Visit the Help Docs' 
    },
    'Enabled20': 
    {
        'label': 'Enabled',
        'type': 'checkbox',
        'default': false // store a boolean
    }
});

function form_submit(event) {
    var form = event ? event.target : this;
    var arTextareas = form.getElementsByTagName('textarea');
    for (var i = arTextareas.length - 1; i >= 0; i--) {
        var elmTextarea = arTextareas[i];
        elmTextarea.value = elmTextarea.value.replace(str1,str2);
        elmTextarea.value = elmTextarea.value.replace(str3,str4);
        elmTextarea.value = elmTextarea.value.replace(str5,str6);
        elmTextarea.value = elmTextarea.value.replace(str7,str8);
        elmTextarea.value = elmTextarea.value.replace(str9,str10);
        elmTextarea.value = elmTextarea.value.replace(str11,str12);
        elmTextarea.value = elmTextarea.value.replace(str13,str14);
        elmTextarea.value = elmTextarea.value.replace(str15,str16);
        elmTextarea.value = elmTextarea.value.replace(str17,str18);
        elmTextarea.value = elmTextarea.value.replace(str19,str20);
        elmTextarea.value = elmTextarea.value.replace(str21,str22);
        elmTextarea.value = elmTextarea.value.replace(str23,str24);
        elmTextarea.value = elmTextarea.value.replace(str25,str26);
        elmTextarea.value = elmTextarea.value.replace(str27,str28);
        elmTextarea.value = elmTextarea.value.replace(str29,str30);
        elmTextarea.value = elmTextarea.value.replace(str31,str32);
        elmTextarea.value = elmTextarea.value.replace(str33,str34);
        elmTextarea.value = elmTextarea.value.replace(str35,str36);
        elmTextarea.value = elmTextarea.value.replace(str37,str38);
        elmTextarea.value = elmTextarea.value.replace(str30,str40);
    }
    form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;

if (document.location.href.indexOf('usercp.php') > -1 ) {
    shortcut.add("Ctrl+i",function() {
        GM_config.open();
    });
}

if(GM_config.get('Enabled1')){
    var str1 = GM_config.get('Field1');
    var str2 = GM_config.get('Field2');
}
if(GM_config.get('Enabled2')){
    var str3 = GM_config.get('Field3');
    var str4 = GM_config.get('Field4');
}
if(GM_config.get('Enabled3')){
    var str5 = GM_config.get('Field5');
    var str6 = GM_config.get('Field6');
}
if(GM_config.get('Enabled4')){
    var str7 = GM_config.get('Field7');
    var str8 = GM_config.get('Field8');
}
if(GM_config.get('Enabled5')){
    var str9 = GM_config.get('Field9');
    var str10 = GM_config.get('Field10');
}
if(GM_config.get('Enabled6')){
    var str11 = GM_config.get('Field11');
    var str12 = GM_config.get('Field12');
}
if(GM_config.get('Enabled7')){
    var str13 = GM_config.get('Field13');
    var str14 = GM_config.get('Field14');
}
if(GM_config.get('Enabled8')){
    var str15 = GM_config.get('Field15');
    var str16 = GM_config.get('Field16');
}
if(GM_config.get('Enabled9')){
    var str17 = GM_config.get('Field17');
    var str18 = GM_config.get('Field18');
}
if(GM_config.get('Enabled10')){
    var str19 = GM_config.get('Field19');
    var str20 = GM_config.get('Field20');
}
if(GM_config.get('Enabled11')){
    var str21 = GM_config.get('Field21');
    var str22 = GM_config.get('Field22');
}
if(GM_config.get('Enabled12')){
    var str23 = GM_config.get('Field23');
    var str24 = GM_config.get('Field24');
}
if(GM_config.get('Enabled13')){
    var str25 = GM_config.get('Field25');
    var str26 = GM_config.get('Field26');
}
if(GM_config.get('Enabled14')){
    var str27 = GM_config.get('Field27');
    var str28 = GM_config.get('Field28');
}
if(GM_config.get('Enabled15')){
    var str29 = GM_config.get('Field29');
    var str30 = GM_config.get('Field30');
}
if(GM_config.get('Enabled16')){
    var str31 = GM_config.get('Field31');
    var str32 = GM_config.get('Field32');
}
if(GM_config.get('Enabled17')){
    var str33 = GM_config.get('Field33');
    var str34 = GM_config.get('Field34');
}
if(GM_config.get('Enabled18')){
    var str35 = GM_config.get('Field35');
    var str36 = GM_config.get('Field36');
}
if(GM_config.get('Enabled19')){
    var str37 = GM_config.get('Field37');
    var str38 = GM_config.get('Field38');
}
if(GM_config.get('Enabled20')){
    var str39 = GM_config.get('Field39');
    var str40 = GM_config.get('Field40');
}