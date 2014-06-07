// ==UserScript==
// @name           Advanced options for FED Page
// @namespace      http://hefeds.nirgeier.com
// @description    Add advanced featured to the Feds page
// @copyright      Nir Geier, Alex Wolkov
// @version        0.0.50
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=97577&days=1
// ==/UserScript==

/*
 * NameSpace
 */

if(typeof unsafeWindow.console != 'undefined'){
    if(typeof unsafeWindow.console.log == 'function'){
        var GM_log = unsafeWindow.console.log;
    }
}

try{
ILFeds = function () {

    // local timer
    var timer;

    // General settings / options
    var settings = {

        // Icons
        'icon_bug': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANxSURBVHjaYoxhYGBgBeI/QPyXkZHhBxCz//vHYCwpyfCXhYVh4ePHDNcYGDiA0j4cnJw3GP7+ffTj1y9+IP87EL8BCCAWBiTACML//4MME/n+9aunoJSUfqiqqtDVnz+Z7v38af9XTo7v86dPXx7fvbv5958/NUDlTAABBDeAGYj/MzDofOTgqLfQ0nIO9/Li2/fxI/On378ZkkxNGVRfvWI4fOAAwy4lJaHfv3/HPb53bwZQyxWAAGJigDr/GQND1wF29pOvtbVDHL28BFW1tZnNmZkZ+O7dY7h+9SqDKNCQRH19BvkjRxhevHrFDdRiDNILEEAsQFvZlBgYVohycAQIyskxhioqMti+f8/AMGcOg8H16wwG374xfH/5kuEfOzvDX15eBi9OTobZT59+e8fAcBdkAEAAsYgzMJTFMTAEKAoIMDLIyDAwff7MwHANGGw3bzIwAAOTQV6egVFQkKFk+3YGMX5+hgSgASpAzacYGY+AwgwggFi0GRjilIFh9/vrV4Z/QBvZvn9nYPz4kYGBh4eBwcCAgUFJieH0hw8MW16/ZlAGGu7+5AkDNxMTKwMLSyjD79/7AQKIZSsDgxDQGwzuX74wsAMVCAOj7hHQqezGxgwSampAD7Ix/AXKfWFiYhAFeQ1o+HseHjWGnz8j////fxAggFguAB16GmiANjD+DUREGM4ICzNUAfkSQE0T/v5lEPnzh8EAyE58+JDBA+jKh0B1rwQFmbnevr367efPVwABxGLHyPhdChj3LECJ38CAOsHKynAa6Fehd+8Ynp45wyDy8yeDAFBzHzAwXwINDmBkfPDx169PAnx8McC0Mg8ggBh82dlfX2Bk/H8ZmAzus7H9P8rL+99GRuZ/pqDg/69AsV9A/AGIgUH+PwmU+hgZIxlZWWU5OTkPMzEx5QEEEAMjM/PRAAaGh2uACs4D8RMgBhn2GIjfAvFVIF4BNNiFiekzMNRLkBKuABCrAgQQKCZkgfinFgNDnRUDQwQwigTFQLECDLTnHByM537+/HUOaMCTX7/mAPNBDgMaAAggRhiDF4i/MDCIAZO0CzACJf+wslr/4+b2/vb583ygRmC6YdgLxSgAIIDgSASUM6CYHWw0YzsQnwWyJKFK2LDpAwggZhiDC4iBAcbwD5o3oGAnEF+Gsv9iMwAgwABTrSdfbFNpAwAAAABJRU5ErkJggg%3D%3D',
        'icon_comments': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADQklEQVQYGY3BTWzbVAAH8P+zn2M7X4udtkmbVmqrtWvTrWsQUMJYWxUEaLcJoV1XcaAXhDhz54wQZz7ExJULUIlTIrZMCoWxThsjy6CpaNKsips0cezn2O+xHHpE4vcjn9y5hr7dx1G1h+ZTG7s7+2g8cnBG0zTk83msra3hTKFQQLFYxBA97tSn5kZfLPcn9sp/lLo3bGsgA2AABACxurrKt7e3kXshhyFd07F0cQnFYhFDksP6kzxmpeSYm7P+6UeYzeMAVACKJEtydimL9HganHM65LouNF1FIpHAkDSaGL/729699XrF3pjLJ1ujs2oDgA3AlWV5YBgJ9HpdVdO0UcuyMgH3QWUZhpHAkDTgDEJwQmQBQjlABM5omoax1BgC4U+ci8dfi0TCm71ej1BFgWGaGJI63ZNXrl95r3B+YapQLXWSnYYfAzACIBYOh+V4LAYjkVj2fG9T1/W3bLtrUEqRNA0MUU3R6reffNc8bdu/jkyHbavR812LBIZh+PPzc1xVVTgue8nz2KaqhrS+45zXVK28vrGOhcUF0Fg0ceA6bNxvCSRSgKwQhEIhf3Iyg2w2C0oponpkhfNgXlIUSETK6rpezuVW8Oz4GBLzXFWB/hnR2ZasAkqYgFIZyWQytLB44XPTNG/F4vGrVFYgBGCayY+Yy27V6/UtwTmkVqe5sXzp0geZ2eSn978/zjQeuqbnDcxCoRj5+qtvvjAN8/V0OhWnlIIQgtmZmWWXuWY6Pf4tnpPffv/iYbX2KP6sfvKlOXbu527bdroN7iwuLriv5vONZrP5Y2os9U7SHIkqlKJ0t7Tj9J3rSkhhzGOgskxcTYl86Axk+AMHvivAGMPjx3+Cc0Eur1yuHB7W37y5dfOnBw/2fm+3O+/2+/1BOKyT3V92BT3tdaYupF4uc3+vXLlt3fA97gMIMcZ4tVoNGGOkUqk82dnZeePoqFnPZDL+9My0XNvf59Xq04AOfG+Sx6yUdOrmWgduxG4FHgAVAHMcx68d1EQmM8FPTtqVaDQKASFKd0rccRyB58jHhSs4bNauehY97PxN/rr3QwP1hy7+CyEEQgickWevBQgC/8AX3gk0hgAuGvcD/F//AiaCirPj4hweAAAAAElFTkSuQmCC',
        'icon_loadPosts': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADJklEQVQYGaXBS2xUVRgA4P8/59xz53GnDDPt0Da0tZaKjQVjRauYRmNiNLIgEhaYENkIe3ShQaKJ0dhIognI1g0JGDS2bjAxUXwiNkpaqrSItMOjU+hjnnfu4zydhVtXfB8CAIV7QOAese8OjmzOcDaG2jyMCNspJ6Ned+bqlje+3Qn/uXhktCdFnGeMr8YIp4tvTy2NT35ftNCCl19/cpmnXevmeD3R7phkRzJV/bueDNej2agarRlhhhCgx/F4lRByZ9Oj3ZOVcvBNnOY3hvd/WWeUM5J/IB8nCjwT1eIwuBW2UZd4iQ42ynPp67KhV52kM8/b3JuprqTgnh3u7Eg/aBWfAIBzjLr0blQN+wCgFpajQIai6HYk/nESZDmRcy1xzAhqHFYCtupQZIRiGytztRrPJJcA4BwDxFl/pZmyBP7gucRSKukNARNPy1CTuBZNBWvxL36gjui8u6olMUkHWGEgP1CeXdkNLQwAf5S+eJFg5nEdKGpM5CG3xiB+sHdcHO/dcWx/0e87piQbQmIRHXWlly2fKs28dhRaSCMU51WoPKSkhtxeNaCuKKHO7Hlv0wkcPH1ygXaf0BFvU6XwOd0UrxhLB4uk8x3d88W77YVDhJye84tI8WZzpbkofPG7DPTtuGa/zm45elhuNM9DPly3CpszU13FuLQ6BxYYtPtrOiu39Y58+Cr5+KtpDQSvx/Vos26ax0yNbCuV4kvluLDXUn3RzufXASENLUrejUFQBZc772A2ChDYAQYtiHjbCD2mIxUDEiZCbYymW2EhtwGc9T0ImSf6B09x7t2Xtg14S1Ru/ZCY7/scqOkl0KKNuaCFZkoaV0ktlJCABiqIkLbS64tL02dDf0YHld/qi9MHJ91s+wAAOBCyXwm0NDU9b7RF2ZSNuBr6MlAGA/OR1TCFMnWcZR7Z4TcumGZwSfU/9OlOMN4ZS0zdgv6ZAgDh1tRHuryntNSRUWYmRaB/4tqGTyjb/gIgFtDwXbncy3+2ZZ8dQnRPgrF/gaDLfu2n9xEAKPyP+wc/c7O5l95EYPsAgAFAEsBWLeiz1fLE+MK1feJfQBmbzSeUy6EAAAAASUVORK5CYII%3D',
        'icon_enter': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAnNCSVQICFXsRgQAAAAJcEhZcwAAAbsAAAG7ATrs4+IAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAABAUlEQVQYGQXBu4mVURQG0HX+ewYMhNFsIuMRvGABBiZWYANGPiqwBDuYQcxNTQzMFSzAF1YwiXoF8YX77M+1RgC83PfZts9Y2sqfd+vBvY+IiIgXby/yPYcc8i1fc5FnbyImAHV6yQ9EWy7LDZgA1Bgm2gANJgBls8NmiaHABKAMEy02m39g8vy0z9fNHut4MwWbDQUmdXbr9hXDTuxEnLtvKDCp68d+OTJxZBh+ggKTGhFBNCKCApNCRGuFRsQCGyWiteWJL5aIKDAp0dryymsL1yxRYFIZ2sIdn911oi0UmNSHOrlqGIbHIOLg93uY1MOn52OfsbSlLW3l76f1CP4DqWWS4b4dsYkAAAAASUVORK5CYII%3D',

        // CSS style
        'style': '.navItem_feds{ line-height:13px; }' + //
        '.navItem_feds img{ padding-left: 2px;}' + //
        '.navItem_feds .linkChild{ cursor: pointer;}',

        // Messages
        'msg_advanced': 'אפשרויות מתקדמות',

        // The class name when we inject our left menu icon
        'leftPlaceHolder': '#rightCol',
        'fedsActionsCont': '#fed_options',

        // The left side link id
        'leftSelectorId': 'ilFedsLeftLink',
        'container_tmpl' :
        '    <ul class="uiSideNav">' + //
        '        <li class="navItem_feds">' + //
        '            <a href="javascript:void(0);" class="item">' + //
        '                <span class="imgWrap">' + //
        '                    <img align="absmiddle" src="{$icon}"/>' + //
        '                </span>' + //
        '                <span class="linkWrap">${title}</span>' + //
        '            </a>' + //
        '        </li>' + //
        '        <ul id="fed_options" style="display:block !important">' + //
        '       </ul>' + //
        '    </ul>',

        'item_tmpl' :
        '               <a id="${obj.id}" class="subitem" href="javascript:void(0);">' + //
        '                   <span class="linkChild">' + //
        '                       <span class="imgWrap">' + //
        '                           <img align="absmiddle" src="${obj.icon}"/>' + //
        '                       </span>' + //
        '                       <span class="linkWrap">${obj.label}</span>' + //
        '                   </span>' + //
        '               </a>'
    };

    return {

        /**
         * Init the script.
         * Add icons to page
         */
        init: function () {
            // verify that we do it only once
            if(!unsafeWindow.$$('body')[0].classList.contains('ego_page')){
                return false;
            };


            // Add the css to the page
            this.addCss();


            //if ctrl_enter cookie is set, add functionality by default
            if(ILFeds.fn.getCookie('ctrl_enter')){
                ILFeds.removeEnterToSubmit();
            }
            
            tmpl = {
                'title': 'אפשרויות מתקדמות',
                'mainImg': settings.icon_bug,
                'actions': [{
                    'id': '__fedsAction1',
                    'label': 'פתח את כל התגובות',
                    'icon': settings.icon_comments
                },
                {
                    'id': '__fedsAction3',
                    'label': 'Fix Enter Key',
                    'icon': settings.icon_enter
                }]
            }
            // templating here :
            //create container
            var _temp = document.createElement('div');
            //add tempalte container
            _temp.innerHTML = settings.container_tmpl.replace('${title}',tmpl.title).replace('{$icon}',tmpl.mainImg);
            document.querySelector(settings.leftPlaceHolder).appendChild(_temp);
            //add action links to container
            for(var jj = 0;jj<tmpl.actions.length;jj++){
                var that = tmpl.actions[jj];
                //create action dom
                var _temp = document.createElement('li');
                //template action dom
                _temp.innerHTML = settings.item_tmpl.replace('${obj.id}',that.id).replace('${obj.icon}',that.icon).replace('${obj.label}',that.label);
                document.querySelector(settings.fedsActionsCont).appendChild(_temp);
            }

            // Add the onclick events
//            document.querySelector('#__fedsAction1').addEventListener('click',ILFeds.loadComments,true);
            document.querySelector('#__fedsAction1').addEventListener('click',function(){
                ILFeds.loadComments();
            },true);
            document.querySelector('#__fedsAction3').addEventListener('click',ILFeds.removeEnterToSubmit,true);

        },

        /**
         *  Remove enter to submit behavior
         */
        removeEnterToSubmit: function () {
            unsafeWindow.$$('textarea').each(function(e) {
                e.classList.remove('enter_submit');
                var btn = e.parentNode.parentNode.querySelectorAll('label');
                if (btn[0] != undefined) {
                    btn[0].classList.remove('hidden_elem')
                }
                //add ctrl+click submit if non existent
                if (!e.classList.add('ctrl_enter')) {
                    e.addEventListener('keydown', function(ev) {
                        if (ev.ctrlKey) {
                            e.classList.add('enter_submit');
                        }
                        e.classList.add('ctrl_enter');
                    }, false);
                    e.addEventListener('keyup', function(ev) {
                        if (!ev.ctrlKey) {
                            e.classList.remove('enter_submit');
                        }
                    }, false);
                }
            });
            ILFeds.fn.setCookie('ctrl_enter', true);
        },
        /**
         * Add our customize CSS to the page
         */
        addCss: function () {
            // Check to see if we have GM methods
            if (typeof GM_addStyle !== 'undefined') {
                return GM_addStyle(settings.style);
            }
            //backup style add for chrome
            var head = document.getElementsByTagName('head')[0],
                style = document.createElement('style');
            if (head) {
                style.innerHTML = settings.style;
                head.appendChild(style);
            }

        },
        loadComments : function() {
            unsafeWindow.$$("input.stat_elem").each(function (e) {
                ILFeds.fn.click(e);
            });
        },
        /**
         * Load more posts - TODO: remove jquery Code, make this work  without
         */
        loadPosts: function () {
            alert('loadPosts');
            // clear prevoius timer
            clearTimeout(ILFeds.timer);
            // Check to see if there are more links to upload
            if (jQuery('.pam').size() > 0) {
                // simulate click on teh more... link
                jQuery('.pam')[0].click();
                timer = setTimeout(ILFeds.loadPosts, 500);
            }
        },
        /**
         * fn :  helper functions like click(),cookies etc
         */
        'fn' : {
            /**
             * simulates click function
             * @param element
             */
            click : function(element) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, element);
                return !element.dispatchEvent(evt);
            },
            /**
             * gets cookie
             * @param name
             */
            getCookie: function (name) {
                var nameEQ = name + "=",
                        i, c;
                var ca = document.cookie.split(';');
                for (i = 0; i < ca.length; i++) {
                    c = ca[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
                return null;
            },
            /**
             * sets cookie
             * @param name
             * @param value
             * @param expires
             * @param path
             * @param domain
             * @param secure
             */
            setCookie: function (name, value, expires, path, domain, secure) {
                var today = new Date();
                today.setTime(today.getTime());
                if (expires) {
                    expires = expires * 1000 * 60 * 60 * 24;
                }
                var expires_date = new Date(today.getTime() + (expires));
                document.cookie = name + '=' + escape(value) + ((expires) ? ';expires=' + expires_date.toGMTString() : '') + //expires.toGMTString()
                        ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
            }
        }
    };

}();

/**
 * some DOM methods
 */
$$ = function(selector){
    return document.querySelectorAll(selector);
}
Object.prototype.toArray = function(){var ary = [];for(var i=0, len = this.length; i < len; i++){ary.push(this[i]);}return ary;};
Object.prototype.each = function (c,b){this.toArray().map(c,b);return this;}

//Init the script once the page has been loaded and facebook loaded all ajax content
waitForFacebook = function(){
    if(typeof unsafeWindow.$$ == 'function' && unsafeWindow.$$('textarea').length > 0){
        clearTimeout(t);
        ILFeds.init();
    }else{
        t = setTimeout(waitForFacebook,200);
    };
}
var t = setTimeout(waitForFacebook,200);    

}catch(e){
    unsafeWindow.console.error(e);
}
