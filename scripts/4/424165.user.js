// ==UserScript==
// @name       Auto compile CloudPebble
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://cloudpebble.net/ide/project/*
// @copyright  2014+, LeFauve
// ==/UserScript==
var ELK=(function()
{
	function run()
	{
        //alert("RUN");
        var status=document.getElementById('last-compilation-status');
        clickOn(document.getElementById('sidebar-pane-compile').firstChild);
        status.classList.remove('label-success');
        status.classList.remove('label-important');
        status.classList.add('label-info');
        clickOn(document.getElementById('compilation-run-build-button'));
        compilationCheck=setInterval(function()
        {
            console.log('compilation check...');
            status=document.getElementById('last-compilation-status');
            console.log(status && status.className);
            if(status && !status.classList.contains('label-info'))
            {
                clearInterval(compilationCheck);
                
                if(status.classList.contains('label-success'))
                {
                    console.log("Success!");
                    clickOn(document.getElementById('install-on-phone-btn'));
//                    clickOn(document.getElementById('show-app-logs-btn'));
                }
                else
                {
                    console.log("Failure");
                    clickOn(document.getElementById('last-compilation-log').firstChild);
                }
            }
        }, 500);
        return false;
	}

	function initMonkey()
	{ 
        var compile = document.getElementById('sidebar-pane-compile');
        if(compile)
        {
            var autorun = document.createElement('A');
            autorun.href='#';
            autorun.innerHTML='Run';
            //autorun.onclick=ELK.run;
            autorun.style.float='right';
            autorun.style.position='relative';
            autorun.style.top='-26px';
			compile.appendChild(autorun);
            autorun.addEventListener('click', function(e)
            {
                run();
                e.cancelBubble = true;
        		e.stopImmediatePropagation();
		    });
	    }
	}
    
    function clickOn(a)
    {
        var click = document.createEvent("MouseEvents");
    	click.initMouseEvent("click", true, true, window,
    	0, 0, 0, 0, 0, false, false, false, false, 0, null);
    	a.dispatchEvent(click);
    	a.focus();
	}
    
    return { initMonkey: initMonkey, run: run, clickOn: clickOn };
})();

ELK.initMonkey();
