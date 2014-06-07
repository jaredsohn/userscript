// ==UserScript==
// @name       MineThings Manufacturing timeprediction
// @version    1.0
// @description  Shows how long it would take to finish an item if you keep the current cph.
// @match      http://*.minethings.com/factories*
// ==/UserScript==

//without this it'd sometimes try to find things before page finished loading, which would lead to it not displaying output 50% of the time
window.onload = function()
{ 	//make variables
    var fact1w1,fact1w2,fact1w3,fact1w4,fact1w5,fact1w6,fact1w7
    var fact1workers = new Array(fact1w1,fact1w2,fact1w3,fact1w4,fact1w5,fact1w6,fact1w7)
    var fact2w1,fact2w2,fact2w3,fact2w4,fact2w5,fact2w6,fact2w7
    var fact2workers = new Array(fact2w1,fact2w2,fact2w3,fact2w4,fact2w5,fact2w6,fact2w7)
    var fact3w1,fact3w2,fact3w3,fact3w4,fact3w5,fact3w6,fact3w7
    var fact3workers = new Array(fact3w1,fact3w2,fact3w3,fact3w4,fact3w5,fact3w6,fact3w7)
    var fact4w1,fact4w2,fact4w3,fact4w4,fact4w5,fact4w6,fact4w7
    var fact4workers = new Array(fact4w1,fact4w2,fact4w3,fact4w4,fact4w5,fact4w6,fact4w7)
    var fact5w1,fact5w2,fact5w3,fact5w4,fact5w5,fact5w6,fact5w7
    var fact5workers = new Array(fact5w1,fact5w2,fact5w3,fact5w4,fact5w5,fact5w6,fact5w7)
    var fact1total = 0,fact2total=0, fact3total=0, fact4total=0, fact5total=0
    
    //the workers are all in different cells, worker 5 is on row 2 so he starts in cell 1 again
    var appendid = new Array("0","2","4","6","0","2","4")
    
    //the last 3 workers are in a different row
    var whichnodeistable = new Array("0","0","0","0","1","1","1")
    
    //get table location of first factory
    //i won't repeat this for all 5 factories - it's the same thing 5 times. The only thing that changes is which table is the factory table and which variables it uses (fact1/fact2 etc.)
    var fact1 = document.getElementById("fullcenter").childNodes[7].childNodes[3]    
    
    for (i=0;i<7;i++)
    { 
        try
        {	if(fact1.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").charAt(6)=="c")
        {
            fact1workers[i] = Number(fact1.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").charAt(5))
        }
         else
        {
            fact1workers[i] = Number(fact1.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").substring(5,7))
        }
         //if worker is idle, char 6 won't be a number so we check that here and set cph to 0 if it isn't a number.
         if (isNaN(fact1workers[i])===true)
         {  
             fact1workers[i]=0
         }
        }
        catch(err)
        {
            //if worker doesn't exist, set it's cph to 0
            fact1workers[i] = 0
        }
    }
    //count total cph in factory 1
    fact1total = fact1workers[0]+fact1workers[1]+fact1workers[2]+fact1workers[3]+fact1workers[4]+fact1workers[5]+fact1workers[6]
    
    var fact2 = document.getElementById("fullcenter").childNodes[8].childNodes[3]    
    for (i=0;i<7;i++)
    { 
        try
        {
            if(fact2.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").charAt(6)=="c")
            {
                fact2workers[i] = Number(fact2.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").charAt(5))
            }
            else
            {
                fact2workers[i] = Number(fact2.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").substring(5,7))
            }
            if (isNaN(fact2workers[i])===true)
            {  
                fact2workers[i]=0
            }
        }
        catch(err)
        {
            fact2workers[i] = 0
        }
    }
    fact2total = fact2workers[0]+fact2workers[1]+fact2workers[2]+fact2workers[3]+fact2workers[4]+fact2workers[5]+fact2workers[6]
    
    var fact3 = document.getElementById("fullcenter").childNodes[9].childNodes[3]    
    for (i=0;i<7;i++)
    { 
        try
        {
            if(fact3.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").charAt(6)=="c")
            {
                fact3workers[i] = Number(fact3.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").charAt(5))
            }
            else
            {
                fact3workers[i] = Number(fact3.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").substring(5,7))
            }
            if (isNaN(fact3workers[i])===true)
            {  
                fact3workers[i]=0
            }
        }
        catch(err)
        {
            fact3workers[i] = 0
        }
    }
    fact3total = fact3workers[0]+fact3workers[1]+fact3workers[2]+fact3workers[3]+fact3workers[4]+fact3workers[5]+fact3workers[6]
    
    var fact4 = document.getElementById("fullcenter").childNodes[10].childNodes[3]    
    for (i=0;i<7;i++)
    { 
        try
        {
            if(fact4.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").charAt(6)=="c")
            {
                fact4workers[i] = Number(fact4.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").charAt(5))
            }
            else
            {
                fact4workers[i] = Number(fact4.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").substring(5,7))
            }
            if (isNaN(fact4workers[i])===true)
            {  
                fact4workers[i]=0
            }
        }
        catch(err)
        {
            fact4workers[i] = 0
        }
    }
    fact4total = fact4workers[0]+fact4workers[1]+fact4workers[2]+fact4workers[3]+fact4workers[4]+fact4workers[5]+fact4workers[6]
    
    var fact5 = document.getElementById("fullcenter").childNodes[11].childNodes[3]    
    for (i=0;i<7;i++)
    { 
        try
        {
            if(fact5.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").charAt(6)=="c")
            {
                fact5workers[i] = Number(fact5.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").charAt(5))
            }
            else
            {
                fact5workers[i] = Number(fact5.firstChild.childNodes[whichnodeistable[i]].childNodes[Number(appendid[i])].lastChild.lastChild.firstChild.getAttribute("value").substring(5,7))
            }
            if (isNaN(fact5workers[i])===true)
            {  
                fact5workers[i]=0
            }
        }
        catch(err)
        {
            fact5workers[i] = 0
        }
    }
    fact5total = fact5workers[0]+fact5workers[1]+fact5workers[2]+fact5workers[3]+fact5workers[4]+fact5workers[5]+fact5workers[6]
    
    //once again, 5 times the same --> only going to comment once
    try 
    {	//only do this if factory has at least 1 worker working in it
        if (fact1total>0)
        {
            var fact1node = fact1.parentNode.innerHTML
            
            //find the start of the cph section
            var fact1tab1 = fact1node.search(":")
            
            //find the end of the cph section
            var fact1tab2 = fact1node.search("<")
            
            //cut out the cph part. There is a space after the : so we start 2 after it, and there is a space before the < so we start 2 before it
            var fact1tabsubstr = fact1node.substring(fact1tab1+2,fact1tab2-2)
            
            //split the cph into done components and total components
            var fact1tabsplstr = fact1tabsubstr.split("/")
            
            //total components-done components is remaining components
            var fact1cleft = fact1tabsplstr[1]-fact1tabsplstr[0]
            
            //find remaining time
            var fact1tleft = fact1cleft/fact1total
            
            //get remaining hours and minutes
            var fact1hleft = Math.floor(fact1tleft)
            var fact1mleft = (fact1tleft-fact1hleft)*60
            
            //make the text that will display
            var fact1time = fact1hleft + " hours and " + Math.round(fact1mleft) + " minutes left at current CPH (" + fact1total + ")"
            
            //make the element that will contain the text, name it and add it to the page
            var fact1text = document.createElement("div");
            fact1text.id='fact1text';
            fact1text.innerHTML = fact1time;
            fact1.parentNode.appendChild(fact1text);
        }
    }
    catch(err)
    {
    }
    
    try 
    {
        if (fact2total>0)
        {
            var fact2node = fact2.parentNode.innerHTML
            var fact2tab1 = fact2node.search(":")
            var fact2tab2 = fact2node.search("<")
            var fact2tabsubstr = fact2node.substring(fact2tab1+2,fact2tab2-2)
            var fact2tabsplstr = fact2tabsubstr.split("/")
            var fact2cleft = fact2tabsplstr[1]-fact2tabsplstr[0]
            var fact2tleft = fact2cleft/fact2total
            var fact2hleft = Math.floor(fact2tleft)
            var fact2mleft = (fact2tleft-fact2hleft)*60
            var fact2time = fact2hleft + " hours and " + Math.round(fact2mleft) + " minutes left at current CPH (" + fact2total + ")"
            var fact2text = document.createElement("div");
            fact2text.id='fact2text';
            fact2text.innerHTML = fact2time;
            fact2.parentNode.appendChild(fact2text);
        }   
    }
    catch(err)
    {
    }
    
    try 
    {
        if (fact3total>0)
        {
            var fact3node = fact3.parentNode.innerHTML
            var fact3tab1 = fact3node.search(":")
            var fact3tab2 = fact3node.search("<")
            var fact3tabsubstr = fact3node.substring(fact3tab1+2,fact3tab2-2)
            var fact3tabsplstr = fact3tabsubstr.split("/")
            var fact3cleft = fact3tabsplstr[1]-fact3tabsplstr[0]
            var fact3tleft = fact3cleft/fact3total
            var fact3hleft = Math.floor(fact3tleft)
            var fact3mleft = (fact3tleft-fact3hleft)*60
            var fact3time = fact3hleft + " hours and " + Math.round(fact3mleft) + " minutes left at current CPH (" + fact3total + ")"
            var fact3text = document.createElement("div");
            fact3text.id='fact3text';
            fact3text.innerHTML = fact3time;
            fact3.parentNode.appendChild(fact3text);
        }
    }
    catch(err)
    {
    }
    
    try 
    {
        if (fact4total>0)
        {
            var fact4node = fact4.parentNode.innerHTML
            var fact4tab1 = fact4node.search(":")
            var fact4tab2 = fact4node.search("<")
            var fact4tabsubstr = fact4node.substring(fact4tab1+2,fact4tab2-2)
            var fact4tabsplstr = fact4tabsubstr.split("/")
            var fact4cleft = fact4tabsplstr[1]-fact4tabsplstr[0]
            var fact4tleft = fact4cleft/fact4total
            var fact4hleft = Math.floor(fact4tleft)
            var fact4mleft = (fact4tleft-fact4hleft)*60
            var fact4time = fact4hleft + " hours and " + Math.round(fact4mleft) + " minutes left at current CPH (" + fact4total + ")"
            var fact4text = document.createElement("div");
            fact4text.id='fact4text';
            fact4text.innerHTML = fact4time;
            fact4.parentNode.appendChild(fact4text);
        }
    }
    catch(err)
    {
    }
    
    try 
    {
        if (fact5total>0)
        {
            var fact5node = fact5.parentNode.innerHTML
            var fact5tab1 = fact5node.search(":")
            var fact5tab2 = fact5node.search("<")
            var fact5tabsubstr = fact5node.substring(fact5tab1+2,fact5tab2-2)
            var fact5tabsplstr = fact5tabsubstr.split("/")
            var fact5cleft = fact5tabsplstr[1]-fact5tabsplstr[0]
            var fact5tleft = fact5cleft/fact5total
            var fact5hleft = Math.floor(fact5tleft)
            var fact5mleft = (fact5tleft-fact5hleft)*60
            var fact5time = fact5hleft + " hours and " + Math.round(fact5mleft) + " minutes left at current CPH (" + fact5total + ")"
            var fact5text = document.createElement("div");
            fact5text.id='fact5text';
            fact5text.innerHTML = fact5time;
            fact5.parentNode.appendChild(fact5text);
        }
    }
    catch(err)
    {
    }   
}