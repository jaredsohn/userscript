// ==UserScript==
// @name Udacity Extended Keybindings
// @description Vim and Emacs keybindings for the Udacity IDE.
// @version 0.9.2
// 
// @namespace http://e.cmendenhall.com/
//
// @downloadURL http://ecmendenhall.github.com/udacity-keybindings/udacity-extended-keybindings.user.js
// 
// @include https://www.udacity.com/course/viewer*
// @match https://www.udacity.com/course/viewer*
//
// 
// ==/UserScript==

function inject(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
}

function change_keymap () {

    var codemirror = document.getElementsByClassName('CodeMirror')[0];
    var code_editor = codemirror.CodeMirror;
    var keymap_mode;
    
    if (document.all) {
        keymap_mode = document.getElementById('keymap_btn').firstElementChild.innerText;
    } else {
        keymap_mode = document.getElementById('keymap_btn').firstElementChild.textContent;
    }

    if (keymap_mode === 'VIM') {
        
        code_editor.setOption('keyMap', 'vim');
        code_editor.setOption('extraKeys', {"':'": function (cm) {
            var state = cm.getOption('keyMap')
            if (state === 'vim-insert') {
               cm.replaceSelection(':', "end");
            }
        }});
        code_editor.setOption('onKeyEvent', function (instance, key_event) {
                
                function changeCursor(state) {
                     var cm_div = document.getElementsByClassName('CodeMirror')[0];
                     var current_class = cm_div.className;
                     var focus = current_class.search('CodeMirror-focused');
                     var new_class;
                     if (state === 'normal') {
                         new_class = 'CodeMirror cm-s-codacity cm-keymap-fat-cursor'; 
                     }
                     else if (state === 'insert') {
                         new_class = 'CodeMirror cm-s-codacity';
                     }
                     if (focus) {
                         new_class = new_class + ' CodeMirror-focused';
                     }
                     cm_div.className = new_class;
                 }
                 
                 // ESC 
                 if (key_event.keyCode === 27) {
                     changeCursor('normal');
                 }
                 // C-[
                 else if (key_event.keyCode === 219 && key_event.ctrlKey) {
                     changeCursor('normal');
                 }

                 // C-c
                 else if (key_event.keyCode === 67 && key_event.ctrlKey) {
                     changeCursor('normal');  
                 }

                 // a
                 else if (key_event.keyCode === 65) {
                     changeCursor('insert');
                 }

                 // i
                 else if (key_event.keyCode === 73) {
                     changeCursor('insert');
                 }

                 // s
                 else if (key_event.keyCode === 83) {
                     changeCursor('insert');
                 }

                 // o
                 else if (key_event.keyCode === 79) {
                     changeCursor('insert');
                 }
        });
    }
    
    else if (keymap_mode === 'DEFAULT') {
        code_editor.setOption('keyMap', 'default');
        code_editor.setOption('extraKeys', null);
        
    }

    else if (keymap_mode === 'EMACS') {
        code_editor.setOption('keyMap', 'emacs');
        code_editor.setOption('extraKeys', null);
        code_editor.setOption('onKeyEvent', function () {});
    }
}

function load_bindings () {
        
        function insert_script(name, url) {
            var newscript = document.createElement('script');
            newscript.type = 'text/javascript';
            newscript.src = url;
            newscript.id = name;
            document.head.appendChild(newscript);
        }

        var scripts = [{name: 'vimbindings',
                        src:'http://ecmendenhall.github.com/udacity-keybindings/vim.js'},
                       {name: 'emacsbindings',
                        src: 'http://ecmendenhall.github.com/udacity-keybindings/emacs.js'}];

        for (var i=0, len=scripts.length; i<len; i++) {
            insert_script(scripts[i].name, scripts[i].src);
        }

        var cursor_style = ['.CodeMirror.cm-keymap-fat-cursor pre.CodeMirror-cursor {',
                           '    z-index: 10;',
                           '    width: auto;',
                           '    border: 0;',
                           '    background: transparent;',
                           '    background: rgba(0, 200, 0, .4);',
                           '}'].join('\n');
        
        var new_css = document.createElement('style');
        new_css.type = 'text/css';
        new_css.innerHTML = cursor_style;
        document.head.appendChild(new_css);
}

function load_keymap_btn () {

    function toggle_mode (btn) {
        var binding_titles = ["DEFAULT", "VIM", "EMACS"];
        var btn_state = btn.getAttribute('state');
        var i = parseInt(btn_state, 10);
        i = (i + 1) % binding_titles.length;
        btn.setAttribute("state", i);
        var keymap_mode = binding_titles[i];
        if (document.all) {
            btn.firstElementChild.innerText = keymap_mode;
        } else {
            btn.firstElementChild.textContent = keymap_mode;
        }
        return keymap_mode;
    }

    function reset_mode (btn) {
        btn.setAttribute("state", 0);
        if (document.all) {
            btn.firstElementChild.innerText = "DEFAULT";
        } else {
            btn.firstElementChild.textContent = "DEFAULT";
        }
    }

    function try_append () {
        var test_run = document.getElementsByClassName('test-run')[0];
        if (test_run) {
          quiz_controls.appendChild(keymap_btn); 
        } else {
            setTimeout(try_append, 500);
        }
    }

    var quiz_controls = document.getElementsByClassName('programming-quiz-controls')[0];

    var keymap_btn = document.createElement('div');
    keymap_btn.setAttribute("class", "btn");
    keymap_btn.setAttribute("id", "keymap_btn");
    if (document.all) {
        keymap_btn.innerText = " Key bindings: ";
    } else {
        keymap_btn.textContent = " Key bindings: ";
    }
    var strong_state = document.createElement('strong');
    if (document.all) {
        strong_state.innerText = "DEFAULT";
    } else {
        strong_state.textContent = "DEFAULT";
    }
    keymap_btn.appendChild(strong_state);

    var keymap_btn_style = ['#keymap_btn {',
                             '  margin-right: 10px;',
                             '  line-height: 18px;',
                             '}'].join('\n');

    var keymap_btn_css = document.createElement('style');
        keymap_btn_css.type = 'text/css';
        keymap_btn_css.innerHTML = keymap_btn_style;
        document.head.appendChild(keymap_btn_css);

    keymap_btn.setAttribute("state", 0);

    keymap_btn.addEventListener('click', function () {
        var keymap_mode = toggle_mode(this);
        inject(change_keymap);
    });

    window.addEventListener('hashchange', function () {
        reset_mode(keymap_btn); 
    });

    inject(load_bindings);
    try_append();

}

load_keymap_btn();
