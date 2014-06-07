// ==UserScript==
// @name PlaySpyMaster Bot
// @namespace mayfounder.net
// @description GreaseMonkey user script to Play Spy Master game Automatically.
// @include http://playspymaster.com/tasks
// @include http://playspymaster.com/tasks#
// @author Ankit Modi
// @homepage http://www.mayfounder.net
// @uso:script scriptid
// @uso:version versionid
// ==/UserScript==

/*
	Author: Ankit Modi
	----Change Log----
	
	v0.1 - Created basic script
	v0.2 - Added support updating page when vitals get updated
	v0.3 - Added safe Kernel Executer
	v0.4 - Added GreaseMonkey Logging. Made logging standarised. Added some more checks
    v0.5 - Totally revamped version to work in page space and not in greasemonkey sandbox
    v0.6 - This version supports smart task. It calculates ( current energy - required energy )
            to do a task
*/
function embedFunction(s) {
    document.body.appendChild(
            document.createElement('script')
            ).innerHTML=s.toString()
        .replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function embedAsSingleton( s, className ) {
    var scriptTag = document.body.appendChild( document.createElement( 'script' ) );
    scriptTag.innerHTML = 'var ' + className.toString() + ' = new ' +
        s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
    scriptTag.type = 'text/javascript';
}

function embedAsSingletonInit( s, className ) {
    embedAsSingleton( s, className );
    location.href = 'javascript:SpyMaster.init();';
}

var SpyMaster = function () { 
    this.timeoutTime = 5000;
    this.healthThreshold = 99;
    this.energyRatio = 0.40;
    this.energyMinThreshold = 50;
    this.timeoutID = null;
    this.counter = 0;
    this.getMiniDashBoardValue = function( id ) {
        if( id == null || id.length == 0 ) {
            return -1;
        }
        var li = document.getElementById( id );
        if( li == null || !( li.getElementsByTagName ) ) {
            return -1;
        }
        var spans = li.getElementsByTagName('span');
        for (var i = 0; i < spans.length; i++) {
            if ( spans[ i ].className && spans[i].className == 'value' ) {
                return spans[i].innerHTML.valueOf();
            }
        }
    }
    this.getEnergy = function() {
        var value = this.getMiniDashBoardValue( 'mini-dashboard-energy');
        if( isNaN( value ) || value < 0 ) {
            return 0;
        }
        return value;
    }
    this.getHealth = function() {
        var value = this.getMiniDashBoardValue( 'mini-dashboard-health' );
        if( isNaN( value ) || value < 0 ) {
            return 0;
        }
        return value;
    }
    this.getRepeatTaskHandler = function() {
        var button = document.getElementById('repeat-task-button');
        if( button == null ) {
            return null;
        }
        return button;
    }
    this.getTaskList = function() {
        var links = document.getElementsByTagName( 'a' );
        var taskButtons = Array();
        var length = links.length;
        for( var i = 0; i < length; i++ ) {
            // See if this is a task button and can be run
            var link = links[ i ];
            if( link.className == 'perform-task-button' ) {
                // Set of quick checks and validation
                linkParent = link.parentNode;
                if( 
                        SpyMaster.validateTask( linkParent ) == true
                  ) {
                    taskButtons[taskButtons.length] = link;
                }
            }
        }
        return taskButtons;
    }
    /**
      * Returns true or false depending on feasibility of the task
      * Feasibility depends on if we have enough spymasters or items to 
      * do the task
      */
    this.validateTask = function( taskParent ) {
        var spans = taskParent.getElementsByTagName( 'span' );
        var length = spans.length;
        for( var i = 0; i < length; i++ ) {
            var span = spans[ i ];
            if( span.className == 'negative' && span.parentNode.className != 'risk-level' &&
             span.parentNode.className != 'energy-used' ) {
                // All tasks with negative class except 'risk-level' & 'energy-used', ie Risk Level High
                // & insufficient energy
                return false;
            }
        }
        return true;
    }
    this.trim = function( str ) {
        return str.replace(/^\s+|\s+$/g,"");
    }
    this.checkEnergy = function( taskParent ) {
        var lis = taskParent.getElementsByTagName( 'li' );
        var length = lis.length;
        var requiredItem = null;
        for( var i = 0; i < length; i++ ) {
            if( lis[ i ].className == 'energy-used' ) {
                requiredItem = lis [ i ];
            }
        }
        if( requiredItem == null ) {
            return true;
        }

        var spans = requiredItem.getElementsByTagName( 'span' );
        var spanlength = spans.length;
        for( var i = 0; i < spanlength; i++ ) {
            if( spans[ i ].className == 'negative' ) {
                // This is the case when we dont have enough energy
                return false;
            }
        }
        if( requiredItem.lastChild.nodeType == 3 ) {
            var value = requiredItem.lastChild.nodeValue;
            value = SpyMaster.trim( value );
            value = value.valueOf();
            var energy = SpyMaster.getEnergy();
            if( ( energy - value ) >= SpyMaster.energyMinThreshold ) {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
    }
    this.getLastTask = function() {
        var taskList = this.getTaskList();
        return taskList[ taskList.length - 1 ];
    }
    this.getNewTask = function() {
        var taskList = this.getTaskList();

        /* Here we are generating a random number with
           bias towards a older task
         */
        var randomValue = Math.round(Math.random() * 3 );
        var index = taskList.length - 1;
        var task = taskList[ index ];
        if( SpyMaster.checkEnergy( task.parentNode ) == true ) {
            /*
               if( randomValue < 1 ) {
               index--;
               }
             */
            return task;
        }
        else {
            return false;
        }
    }
    this.getEnergyRatio = function() {
        var maxEnergy = this.getMaxEnergy();
        var energyRatio = (this.getEnergy()/maxEnergy).valueOf();
        if( maxEnergy > 0 && !isNaN( energyRatio ) ) {
            return energyRatio;
        }
        return 0;
    }
    this.getCurrentEnergy = function() {
        var energyItem = document.getElementById( 'current-energy-item' );
        var spans = energyItem.getElementsByTagName( 'span' );
        return ( spans[ 0 ].innerHTML.valueOf() );
    }
    this.getMaxEnergy = function() {
        var energyItem = document.getElementById( 'current-energy-item' );
        var spans = energyItem.getElementsByTagName( 'span' );
        var maxEnergy = spans[ 1 ].innerHTML.substring( 2, spans[ 1 ].innerHTML.length );
        if( isNaN( maxEnergy ) ) {
            return 10000;
        }
        return (maxEnergy.valueOf());
    }
    this.startWait = function( ) {
        window.setTimeout( SpyMaster.safeKernelExecuter, SpyMaster.timeoutTime );
    }
    this.safeKernelExecuter = function( ) {
        // This function runs the kernel in a try...catch block
        // So as to print any errors that could have occured
        try {
            SpyMaster.kernel( );
        }
        catch ( E ) {
            SpyMaster.log( E.lineNumber + ': ' + E.message );
        }
    }
    this.kernel = function( ) {
        /*
        * Algorithm:
        *   Find out if we have above threshold health
        *	Find if our energy ratio is good enough ( this can be false )
        *	Find out if our energy is above some limit
        *   If all is fine
        *		Perform Repeated Task
        *		Else Perform Last Task
        *	Else
        *		Just Wait for next Interval
         */
        // If we see value of CurrentEnergy and VitalEnergy is different
        // we refresh
        var vitalEnergy = SpyMaster.getEnergy();
        var currentEnergy = SpyMaster.getCurrentEnergy();
		// If somethings wrong with the server we should reload page
        if( ( vitalEnergy != currentEnergy ) || SpyMaster.counter > 30 ) {
            // We need some time to log things
            SpyMaster.log( 'refreshing page...' );
            window.setTimeout( function() { location.href = "http://playspymaster.com/tasks"; }, 2000, SpyMaster );
            return;
        }
        if( SpyMaster.getHealth() > SpyMaster.healthThreshold ) {
            if( SpyMaster.getEnergyRatio() > SpyMaster.energyRatio ) {
                if( SpyMaster.getEnergy() > SpyMaster.energyMinThreshold ) {
                    var repeatTask = SpyMaster.getRepeatTaskHandler();
                    // Chances of not having a repeat task option are very 
                    // high as the game progresses. ( Maybe 0 )
                    if ( repeatTask != null ) {
                        SpyMaster.log( 'Running Repeat Task..');
                        SpyMaster.execClick( repeatTask );
                    }
                    else {
                        var task = SpyMaster.getNewTask();
                        if( task ) {
                            SpyMaster.log( 'Running new Task..' + task.id );
                            SpyMaster.execClick( task );
                        }
                    }
                }
                else {
                    SpyMaster.log( 'Energy Value check Failed! - ' + SpyMaster.getEnergy() );
                }
            }
            else {
                SpyMaster.log( 'Energy Ratio Check Failed! - ' + SpyMaster.getEnergyRatio() );
            }
        }
        else {
            SpyMaster.log( 'Health Check Failed!' );
        }

        // Kernel has to make sure to update the counter
        SpyMaster.counter++;
        SpyMaster.startWait( );
    }
    this.getAuthToken = function() {
        return window.AUTH_TOKEN;
    }
    this.execClick = function( taskHref ) {
        var idValue = '#' + taskHref.id;
        $(idValue).trigger('click');
    }
    this.start = function( ) {
        // Start playing!!
        this.log( "Start Playing! ");
        this.kernel( SpyMaster );
    }
    this.log = function( msg ) {
        // This function acts a logger
        var currentTime = new Date(); 
        var currentTimeString = currentTime.toLocaleDateString() 
            + " " + currentTime.toLocaleTimeString();

        // Compose the message
        var completeMsg = currentTimeString + ' ' + this.counter + ": " + msg;
        if( console && console.log ) {
            console.log( completeMsg );
        }
        /*
        if( GM_log ) {
            GM_log( completeMsg );
        }
        */
    }
    this.init = function() {
        SpyMaster.log( 'Intializing..' );
        SpyMaster.startWait();
    }
}
SpyMaster.logger = GM_log;
/*
console.log( this.getEnergy() );
console.log( this.getRepeatTaskHandler() );
console.log( this.getTaskList() );
console.log( this.getEnergyRatio() );
console.log( this.getHealth() );
*/
// unsafeWindow.SpyMaster = SpyMaster;
// this.startWait( unsafeWindow.SpyMaster );
embedAsSingleton( SpyMaster, 'SpyMaster' );
// embedAsSingletonInit( SpyMaster, 'SpyMaster' );
location.href = 'javascript:SpyMaster.init();';
