// ==UserScript==
// @name TinEYE service icon
// @namespace *
// @version 1.0 [2010-07-08]
// @author Alexey Popkov
// @description This scripts add TinEye service icon for all images on the loaded page with href of the image source (click on icon to search duplicates in new window).
// @include *
// ==/UserScript==
(function(){
    document.addEventListener('DOMContentLoaded', function(){
		// http://www.tineye.com/favicon.ico
		var dataUrl = 'AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAE'
                    + 'AAAAAAAAAAAAAAAEAAAAAAAAAAAAAfVstAEoyFgChbjAAmmkuAKl7PQC7m28'
                    + 'Ai2UyAIRaKABOORwA59vLAEc0GgCSajUAoXA0AHpZLAByTiIAt4NAAKZ5PACQ'
                    + 'YisA18/FAIldKQCmmYgA9vTxALSDQQDLr4sA08GrAJZtNgCojWgAoYhmAIp3X'
                    + 'QCqmoYAjmQvAKR3OwCbkIIA083EANTNxACFWygAhlsoAH5WJgCegl8ASzMXAF'
                    + 'A6HACjbzEAsoFAAMShcgCbai8AlGUtAJRrNQCVZS0AtpFmAOLc1AC4hEAAr38+'
                    + 'AL+LRQDX0MUAXUAcAK97OQDGp4MA6dzMAFY7GgCSZS4ASDEWAKBtMABdRCIAr38'
                    + '/ALSkjQC8iUQApnIzAOzfzQBUPR4A////ALaEQgBNOBwAv5ttAIx4XgCday8Adl'
                    + 'YqAKSYiADj1scAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqKioqSxIlCAgULj4qKgAAKioqKj'
                    + 'APOwIoNyYEKioAACoqKipORkZGRh4kLSoqAAAqKioqORlGRiEnLQMqKgAAQyoqK'
                    + 'ioxRkY9CCoqKioAADUQOEMqMUZGPQgqKioqAAA1NTU1M0lGRj0IKioqKgAANTVH'
                    + 'EQUsRkYpHw08Lj4AADU1IEwBBkZGRS8aTAc0AAA1NUYiPxtGRkgcRhUOQAAANTV'
                    + 'GIwlKRkYLHUZNAUAAADU1RhY2MkZGEzJGQQwXAAA1NUQ6CgoKCgoKChgrQgAANT'
                    + 'U1NTU1NTU1NTU1NTUAAAAAAAAAAAAAAAAAAAAAAP//AACAAQAAgAEAAIABAACAA'
                    + 'QAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAP//AAA=';
        var images = document.getElementsByTagName('img');
        var hint = document.createElement('div');
        hint.style.position = 'absolute';
        hint.style.display = 'none';
        hint.style.margin = '0';
        hint.style.padding = '0';
        hint.style.width = '18px';
        hint.style.height = '18px';
        hint.style.backgroundColor = '#ace';
        var a = document.createElement('a');
        a.target = '_blank';
        var img = document.createElement('img');
		img.src = 'data:image/png;base64,' + dataUrl;
        img.id = 'ujs-tineye-pic';
        img.style.margin = '1px';

        a.appendChild(img);
        hint.appendChild(a);
        document.body.appendChild(hint);
        var timeoutId;
		
        for (var i in images) {
            if (images[i].id == 'ujs-tineye-pic') {
                continue;
            }
            images[i].addEventListener('mouseover', function(){
                if (typeof(timeoutId) != 'undefined') {
                    clearTimeout(timeoutId);
                }
                var elem = this;
                var left = 0, top = 0;
                while (elem) {
                    left += elem.offsetLeft;
                    top += elem.offsetTop;
                    elem = elem.offsetParent;
                }
                hint.style.top = top+10;
                hint.style.left = left+10;
                hint.style.display = 'block';
                hint.style.zIndex = '10000000000 !important';// this.style.zIndex+1;
                a.href = 'http://www.tineye.com/search?url='+this.src;
            }, false);
            images[i].addEventListener('mouseout', function(){
                timeoutId = setTimeout(function(){
                    hint.style.display = 'none';
                }, 0);
            }, false);
            hint.addEventListener('mouseover', function(){
                if (typeof(timeoutId) != 'undefined') {
                    clearTimeout(timeoutId);
                }
            }, false);
            hint.addEventListener('mouseout', function(){
                hint.style.display = 'none';
            }, false);
        }
    }, false);
})();