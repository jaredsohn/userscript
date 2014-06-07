// ==UserScript==

// @name           limitgroupdisplay

// @namespace      lgd@kwierso.com

// @include        http://*.roosterteeth.com/members/

// @include        http://*.roosterteeth.com/members/index.php

// @include        http://*.roosterteeth.com/members/profile.php?uid=*

// @include        http://*.roosterteeth.com/groups/

// @include        http://*.roosterteeth.com/groups/index.php
// @include        http://roosterteeth.com/members/

// @include        http://roosterteeth.com/members/index.php

// @include        http://roosterteeth.com/members/profile.php?uid=*

// @include        http://roosterteeth.com/groups/

// @include        http://roosterteeth.com/groups/index.php

// ==/UserScript==



var clonedX;



(function() {

    try {

        var x = document.getElementById("Groups").firstChild.getElementsByTagName("table")[0].firstChild;

        var buttonHolder = document.getElementById("Groups").previousSibling.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].lastChild;

    } catch(e) {

        var x = document.getElementById("My Group Memberships").firstChild.getElementsByTagName("table")[0].firstChild;

        var buttonHolder = document.getElementById("My Group Memberships").previousSibling.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].lastChild;

    }

    clonedX = x.cloneNode(true);

    

    var shuffleButton = document.createElement("a");

    shuffleButton.innerHTML = "<b>Shuffle Groups</b>";

    shuffleButton.addEventListener("click", shuffleGroups, true);

    buttonHolder.style.textAlign = "right";

    buttonHolder.style.paddingRight = "20px";

    buttonHolder.appendChild(document.createTextNode(" [ "));

    buttonHolder.appendChild(shuffleButton);

    buttonHolder.appendChild(document.createTextNode(" ] "));

    

    var y = x.childNodes.length;

    

    var z = [];

    var w = [];

    

    for(i =0; i< y;i++) {

        z.push(x.childNodes[i]);

        w.push(i);

    }

    

    for(i =0; i< y;i++) {

        x.removeChild(x.firstChild);

    }

    w.sort(function() {

        return 0.5 - Math.random();

        });

    

    for(i = 0; i < 5 && i < y; i++) {

        x.appendChild(z[w[i]]);

    }

})();



function shuffleGroups() {

    var reClone = clonedX.cloneNode(true);

    

    try {

        var x = document.getElementById("Groups").firstChild.getElementsByTagName("table")[0].firstChild;

    } catch(e) {

        var x = document.getElementById("My Group Memberships").firstChild.getElementsByTagName("table")[0].firstChild;

    }



    var y = reClone.childNodes.length;



    var z = [];

    var w = [];

    

    for(i =0; i< y;i++) {

        z.push(reClone.childNodes[i]);

        w.push(i);

    }

    

    for(i =0; i< 5;i++) {

        x.removeChild(x.firstChild);

    }

    

    w.sort(function() {

        return 0.5 - Math.random();

        });

    

    for(i = 0; i < 5 && i < y; i++) {

        x.appendChild(z[w[i]]);

    }

    

    delete reClone;

    delete y;

    delete z;

    delete w;

    delete x;

}