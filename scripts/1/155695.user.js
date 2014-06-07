// ==UserScript==
// @name        Duolingo translation exercises
// @description	Do not lose the hearts in the translation exercises of Duolingo

// @author	mandarin_sites

// @include     /duolingo.com/.*/
// @version     0.01
//
// @grant	none
// @history     0.01.3    It now supports every second language
// @history     0.01.2    Eval the functions with their new behaviour
// @history     0.01.1    Duolingo does not use any longer meaningful variable names
// ==/UserScript==

var heart_attack = document.createElement('script');
    heart_attack.setAttribute("type", "application/javascript");
    heart_attack.id  = 'trick_the_owl';
heart_attack.textContent = "\
for ( a_key in duo.HeartsView.prototype ) {\
  if ( a_key.indexOf( 'Heart' ) > -1 \
    && typeof duo.HeartsView.prototype[a_key] == 'function' ) {\
    a_function = duo.HeartsView.prototype[a_key].toString();\
    eval( 'duo.HeartsView.prototype.' + a_key + '= ' +\
    a_function.substr( 0, a_function.indexOf( '{' ) + 1) + \
    \"try { var target_language = this.model.attributes.session_elements.models[ this.model.attributes.session_element_solutions.length - 1 ].attributes.target_language; if ( typeof target_language != 'undefined' ) if ( target_language != this.model.attributes.language ) return; } catch (err) {;};\" +\
    a_function.substr( a_function.indexOf( '{' ) + 1 ) );\
  };\
};\
duo.skillRouter = new duo.SkillRoutes();";
document.body.appendChild( heart_attack );