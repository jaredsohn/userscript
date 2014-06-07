// ==UserScript==
// @name Rally Kanban Board Utilities
// @version 4.6
// @namespace kevborg
// @match https://*.rallydev.com
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js", function() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

    //Sort select box
    $.fn.sort_select_box = function(){
        var options = $(this).find('option'),
            selected = $(this).val();
    
        options.sort(function(a,b) {
            if (a.text < b.text) return 1;
            else if (a.text > b.text) return -1;
            else return 0
        })
   
       $(this).empty().append(options);
       $(this).val(selected);
    }

    //Using setTimeout to avoid TamperMonkey exception, which I think only happens in Chrome Dev Stream 
    setTimeout(function(){
        $(function(){
            var user,
                menubar,
                projects = [],
                releases = [],
                iterations = [],
                ready = false;
                   
            function setUser(username) {
                user = username;
                $(menubar).find('.username').text(username);
                refilter();
            }
        
            function showMenu() {
                $('body').css({'margin-top':'30px'});
                $('#kanbanhelper').show();
            }
        
            function hideMenu() {
                $('body').css({'margin-top':0});
                $('#kanbanhelper').hide();
            }
            
            function init(){
                //Build menu
                $('body').prepend('<div id=\'kanbanhelper\' style=\'box-sizing: content-box; -webkit-box-sizing: content-box; -moz-box-sizing: content-box; -ms-box-sizing: content-box; display:none; line-height: 28px;vertical-align: middle;position:absolute;top:0;left:0;height: 28px;border-bottom: 2px solid #fff;background-color:#085478;color:#fff;width:100%;\'>&nbsp;Kanban Utility &nbsp; User: <a style=\'color:#BBE;\' href=\'javascript:void(0)\' class=\'username\'>Kev</a> <input type=\'radio\' value=\'show\' name=\'namefilter\' checked> Show all <input type=\'radio\' value=\'fade\' name=\'namefilter\'> Only show mine <input type=\'radio\' value=\'hide\' name=\'namefilter\'> Hide other people\'s  &nbsp; | &nbsp; Project filter: <select style=\'width: 100px\' class=\'projectfilter\' name=\'projectfilter\'> <option value=\'all\'>All</option> </select> &nbsp; | &nbsp; Release filter: <select style=\'width: 100px\' class=\'releasefilter\' name=\'releasefilter\'> <option value=\'all\'>All</option></select> &nbsp; | &nbsp; Iteration: <select name="iterationfilter" style="width:100px;"><option value="all">All</option></select> &nbsp; | &nbsp; Keyword: <input type="text" style="max-width: 100px;" name="keyword"></input> </div>');
            
                menubar = $('body #kanbanhelper');
                setUser($('#options>a:first-child').text());
        
                //Event handlers
                
                $('#kanbanhelper .username').click(function(){
                    setUser(prompt("Set username for hide/show card operations. Use comma separated e.g. 'alice,bob' for multiple users.", user) || user);
                });
            
                $('#kanbanhelper input, #kanbanhelper select').change(refilter);
            
                ready = true;
            };
        
            function updateselects() {
                var releasesSelect = $('#kanbanhelper select[name=releasefilter]'),
                    projectsSelect = $('#kanbanhelper select[name=projectfilter]'),
                    iterationsSelect = $('#kanbanhelper select[name=iterationfilter]');
            
                $('.field-content.Release .rui-field-value').each(function() {
                    var val = $(this).text();
                    if($.inArray(val, releases) == -1){
                        releases.push(val);
                        releasesSelect.append('<option value="'+val+'">'+val+'</option>');
                    }
                });
            
                $('.field-content.Project .rui-field-value').each(function() {
                    var val = $(this).text();
                    if($.inArray(val, projects) == -1){
                        projects.push(val);
                        projectsSelect.append('<option value="'+val+'">'+val+'</option>');
                    }
                });
            
                $('.field-content.Iteration .rui-field-value').each(function() {
                    var val = $(this).text();
                    if($.inArray(val, iterations) == -1){
                        iterations.push(val);
                        iterationsSelect.append('<option value="'+val+'">'+val+'</option>');
                        $(iterationsSelect).sort_select_box();
                    }
                });
            
            
            }
        
            function refilter() {
            
                var users = $.map(user.split(','), function(item, i) {
                    return item.toLowerCase().trim();
                });
            
                $('.iterationtrackingboard-card').each(function(i, card){
                
                    var display = 'show',
                        cardOwner = $(card).find('.owner-name').text().toLowerCase();
                
                    //User filter
                    if ($('#kanbanhelper input[name=namefilter]:checked').val() == 'hide') {
                        if($.inArray(cardOwner, users) == -1){
                            display = 'hide';
                        }
                
                    }else if ($('#kanbanhelper input[name=namefilter]:checked').val() == 'fade') {
                        if($.inArray(cardOwner, users) == -1){
                            display = 'fade';
                        }
                    }
                
                    //Release filter
                
                    var selectedRelease = $('#kanbanhelper select[name=releasefilter]').val();
                    if (selectedRelease != 'all') {
                        if($(card).find('.field-content.Release .rui-field-value').text() != selectedRelease) {
                            display = 'hide';
                        }
                    }
                
                
                    //Project filter
                    var selectedProject = $('#kanbanhelper select[name=projectfilter]').val();
                    if (selectedProject != 'all') {
                        if($(card).find('.field-content.Project .rui-field-value').text() != selectedProject) {
                            display = 'hide';
                        }
                    }
                
                    //Iteration filter
                    var selectedIteration = $('#kanbanhelper select[name=iterationfilter]').val();
                    if (selectedIteration != 'all') {
                        if($(card).find('.field-content.Iteration .rui-field-value').text() != selectedIteration) {
                            display = 'hide';
                        }
                    }
                
                    //Keyword filter
                    var keyword = $('#kanbanhelper input[name=keyword]').val();
                    if(keyword.length > 0) {
                        if($(card).text().search(new RegExp(keyword, "i")) == -1) {
                            display = 'hide';
                        }
                    }
                
                
                    if (display == 'hide') {
                        $(card).hide();
                    }else if(display == 'fade') {
                        $(card).css({opacity:0.3}).show();
                    }else {
                        $(card).css({opacity:1}).show();
                    }
                });
            
            }
        
            //Update interface based on DOM changes made by Rally JS
            //Now using interval rather than watching DOM for performance reasons (Rally does a lot of DOM crap)
            setInterval(function(){
                //Rough check that we're looking at a Kanban Board and that we're ready to init other values from the page
                if($('.x4-container.kanban').length > 0 && $('#options>a:first-child').length && $('#options>a:first-child').text() != '') {
                    if (!ready) { init(); }
                    showMenu();
                }else {
                    hideMenu();
                }
            
                updateselects();
            
                refilter();
            
            }, 4500);
    
        });
    }, 2000);
});