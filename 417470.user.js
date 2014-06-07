// ==UserScript==
// @name            SRL Game Filter
// @include         *speedrunslive.com*
// @version 1.2.1
// @updateURL http://userscripts.org/scripts/source/417470.user.js
// ==/UserScript==
if(window.location.pathname == '/') {
    jQuery.expr[':'].Contains = function(a,i,m){
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
    };
    function listFilter(header, list) { // header is any element, list is an unordered list
        // create and add the filter form to the header
        var form = $("<form>").attr({"class":"filterform","action":"#"}),
            input = $("<input>").attr({"class":"filterinput","placeholder":"Search for game","type":"text"}).width("234px");
        $(header).html($(form).append(input));
        
        $(input)
        .change( function () {
            var filter = $(this).val();
            if(filter) {
                // this finds all links in a list that contain the input,
                // and hide the ones not containing the input while showing the ones that do
                $(list).find("div:not(:Contains(" + filter + "))").hide();
                $(list).find("div:Contains(" + filter + ")").show();
            } else {
                $(list).find("div").show();
            }
            $(list+'>div:visible:even').css('margin-right', '16px');
            $(list+'>div:visible:odd').css('margin-right', '0');
            return false;
        })
        .keyup( function () {
            // fire the above change event after every letter
            $(this).change();
        });
    }
    listFilter('#headerright','#streamList');
}
function fixGames (jNode) {
    if (/final fantasy/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/binding of isaac/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/wwe/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/i wanna be the/i.test (jNode.attr ("data-game") ) && !/kale/i.test (jNode.attr ("data-srlname") )) jNode.remove();
    if (/touhou/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/ni no kuni/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/call of duty/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/mario paint/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/wheel of fortune/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/simulator/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/attorney/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/yu-gi-oh/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/crash bash/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/counter-strike/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/null/i.test (jNode.attr ("data-game") ) ) jNode.remove();
    if (/bingo/i.test (jNode.text () ) ) jNode.remove();
    if (/randomize/i.test (jNode.text () ) ) jNode.remove();
    if (/playthrough/i.test (jNode.text () ) ) jNode.remove();
    if (/analyzing/i.test (jNode.text () ) ) jNode.remove();
    if (/play-through/i.test (jNode.text () ) ) jNode.remove();
    if (/blind/i.test (jNode.text () ) ) jNode.remove();
    if (/spoilers/i.test (jNode.text () ) ) jNode.remove();
    if (/beer/i.test (jNode.text () ) ) jNode.remove();
    if (/speedwalk/i.test (jNode.text () ) ) jNode.remove();
    if (/gameshow/i.test (jNode.text () ) ) jNode.remove();
    if (/2dx/i.test (jNode.text () ) ) jNode.remove();
    if (/iidx/i.test (jNode.text () ) ) jNode.remove();
    if (/mystery/i.test (jNode.text () ) ) jNode.remove();
    if (/alcohol/i.test (jNode.text () ) ) jNode.remove();
    if (/no srl/i.test (jNode.text () ) ) jNode.remove();
    if (/casual/i.test (jNode.text () ) ) jNode.remove();
    if (/giveaway/i.test (jNode.text () ) ) jNode.remove();
    if (/drunk/i.test (jNode.text () ) ) jNode.remove();
    if (/zelda classic/i.test (jNode.text () ) ) jNode.remove();
    if (/16/i.test (jNode.text () ) ) jNode.remove();
    if (/day /i.test (jNode.text () ) ) jNode.remove();
    if (/first time/i.test (jNode.text () ) ) jNode.remove();
    if (/pixel art/i.test (jNode.text () ) ) jNode.remove();
    shortGame = jNode.attr ("data-game");
    shortGame = shortGame.replace("The Legend of Zelda: ","");
    shortGame = shortGame.replace("Elder Scrolls V: ","");
    shortGame = shortGame.replace("Grand Theft Auto: ","GTA: ");
    shortGame = shortGame.replace("HD 1.5 ReMIX","1.5");
    shortGame = shortGame.replace("South Park: ","");
    shortGame = shortGame.replace("Donkey Kong Country ","DKC ");
    shortGame = shortGame.replace(": Special Pikachu Edition","");
    shortGame = shortGame.replace("The Thousand-Year Door","TTYD");
    shortGame = shortGame.replace("The ","");
    shortGame = shortGame.replace("Super Mario World 2: ","");
    shortGame = shortGame.replace(": Cortex Strikes Back","");
    if (shortGame.length > 20)
        jNode.find( ".viewers" ).text(shortGame.substring(0,20)+'..');
    else
        jNode.find( ".viewers" ).text(shortGame);
}

waitForKeyElements ("#streamList div.twitchstreamer", fixGames);

/*--- waitForKeyElements():  A handy, utility function that
    does what it says.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
)
{
    var targetNodes, btargetsFound;
    
    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
        .find (selectorTxt);
    
    if (targetNodes  &&  targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;
            
            if (!alreadyFound) {
                //--- Call the payload function.
                actionFunction (jThis);
                jThis.data ('alreadyFound', true);
            }
        } );
        btargetsFound   = true;
    }
    else {
        btargetsFound   = false;
    }
    
    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];
    
    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                waitForKeyElements (    selectorTxt,
                                    actionFunction,
                                    bWaitOnce,
                                    iframeSelector
                                   );
            },
                                       500
                                      );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}