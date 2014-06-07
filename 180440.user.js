// ==UserScript==
// @name vk_AudioDownloader
// @namespace http://vk.com*
// @include http://vk.com*
// @version 0.1.1
// @grant none
// ==/UserScript==

window.onscroll = function (event){

    var tagCollection = document.getElementsByTagName('input');
    var element = document.getElementsByClassName('title_wrap fl_l');
    var link = [];

        for(var i=0; i<tagCollection.length; i++)
            {
                if(tagCollection[i].value){
                    if(tagCollection[i].value.substr(0, 4) == 'http'){
                          link.push(tagCollection[i].value);
                        }
                }else{
                    continue;
               };
            };
                for(var j=0; j<link.length; j++)
                 {
                    link[j] = link[j].replace(/,\d+$/g, '');
                 };
            
             for(var k=0; k<element.length; k++)
              {
                 var newElem = document.createElement('a');
                    if(element[k].childNodes.length < 5){
                    element[k].insertBefore(newElem, element[k].children[0]).setAttribute('href', link[k]);
                    newElem.innerHTML = '[Save]';
                }else{
                    continue;
          };
     };
};