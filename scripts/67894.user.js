// ==UserScript==
// @name           WhenDone
// @namespace      justintv
// @description    Display time projections for when something will be done
// @include        http://hadoopmaster:50030/*
// @include        http://hadoopmaster.justin.tv:50030/*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==

alert('hi');

$(document).ready(function() {
    // This will be executed onLoad
    // Append some text to the element with id #someText using the jQuery library.
    $("b").append(" more text.");
});


// function find_in_fake_table(re){
//     return $('b').filter(function(b){ 
//         console.log(b.text());
//         return re.test(b.text()); 
//     });
// }
// 
// try {
//     alert('hi');
//     alert(find_in_fake_table(/Running for/).next()[0].text());
//     alert('bye');
// } catch(e){
//     alert(e.message);
// }

