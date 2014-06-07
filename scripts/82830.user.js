// ==UserScript==
// @name          my xkcd empowering script
// @namespace     xkcd
// @description   centers image, left/right keys, bookmarks, search and more!
// @include       http://xkcd.com/*
// @include       http://www.xkcd.com/*
// @include       http://m.xkcd.com/*
// ==/UserScript==


function splitUrl(url,n){  //takes the n-th token in url, delimited by '/'
  return url.split('/')[n];
}

if (splitUrl(location.href,2) != "m.xkcd.com" )  //on mobile version no need to scroll
   window.scroll(0,200); //bring image up

cent = document.getElementById("rnd_btn_b") //random button -the only one with an id. 
                                          //bottom one for compatibility with mobile version
lst = cent.parentNode.parentNode //the list that contains the buttons, for prevoius and next

previous=3
next=7   //position in the list of relative items

function get(n){
  return lst.childNodes[n].firstChild.href;
}

if(localStorage.interval > 0)  //if we are in slideshow mode
  startTime();

document.addEventListener("keydown",function(e){    //adds key listeners
    if(e.shiftKey){
     switch(e.keyCode)
       {
          case 81: //shift + q -choose by number
            location.href="/"+prompt("What comic you want to go to? (number)");
            break;
     
          case 71: //shift + g -search Google
            GSearch = "http://www.google.it/search?q=site%3Axkcd.com+" //invariant part of query
            location.href=GSearch+prompt("What are you looking for?").replace(" ","+");
            break;

          case 75: //shift + k -save to bookmarks
            execute(save);
            break;

          case 66: //shift + b -manage bookmarks
            execute(manage);
            break;

          case 83: //shift + s -share in Facebook, Twitter, Buzz, Delicious
            share();
            break;

          case 84: //shift + t -reveal mouseover text
            if(splitUrl(location.href,2)=="m.xkcd.com") //if on mobile version
              alert(document.images[0].title); //is the first image
            else 
              alert(document.images[1].title); //the second on regular site
            break;

          case 80: //shift + p -set parameters for slideshow presentation
            setSlide();
            break;
      }
    }
    if(!e.altKey){

     if (localStorage.interval > 0)  //if slidesow was enabled, pressing a key disables it
        endTime();

      switch(e.keyCode)
	{
	   case 37:    
             if (getNum()=="1"){  //if that was first
                alert("That was the first comic: taking you to the last!");
                location.href="/";
             } 
	     else location.href=get(previous); //left -> previous
             break;
           
           case 39:
             ad=get(next);
             if (splitUrl(ad,4)=="#"){  //if that was last
               alert("That was the last comic: taking you to the first!");
               location.href="/1/";
             }
             else location.href=ad; //right -> next
             break;
	
           case 82:
	     location.href=cent.href; //r -> random
	     break;

           case 77:
             location.href="http://m.xkcd.com/"+getNum()+"/"; //m -> mobile version
             break;

           case 78:
             location.href="http://xkcd.com/"+getNum()+"/"; //n -> normal version
             break;

           case 72:
             alert("These are the options:\n\nright arrow -> next comic\nleft arrow -> previous comic\nr -> random comic\nm -> mobile version\nn -> normal version\np -> enable previously setted slideshow mode\nh -> help (...maybe you already knew?)\n\nShift+Q -> select comic by number\nShift+G -> search the site with Google\nShift+K -> keep page in bookmarks\nShift+B -> see bookmarks and organize them\nShift+S -> share page\nShift+P -> set slideshow mode\nShift + T -> reveal mouseover text");  //h-> help
             break;

           case 80:
             localStorage.interval = - localStorage.interval; //it is guaranteed negative at this point
             startTime();  //p -> start slideshow
             break;
	}
      } 
},false);

function getNum(){  //retrieves actual comic number
  return splitUrl(location.href,3);
}

function open_storage(){

  if(typeof(localStorage) != "undefined")  //if browser supports
    
    return unpack( localStorage.getItem("bookmarks") ); //find previous saves and process into array
  
   else{     //if not available
    
    alert("your browser does not support HTML5 yet!\nTo use this feature you need a newer browser");
    return null;  //failure
  }
}
  
function pack(what){
 return what.join("*#*");
}

function unpack(what){
 return (what? what.split("*#*") : new Array());  //if string was null, empty array created
}

function execute(act){

  bmk = open_storage();  //try retrieving database
  
  if (bmk)             //if supported 
    store( act(bmk) ); //update bookmarks with given action, and permanently store
 }

function store(what){
  localStorage.setItem("bookmarks",pack(what));  //"pack" converts array to string
 }

function save(where){  //internal save (to avoid showing result twice if called from general prompt)
  
  //position 
  up = confirm("insert this page on top of preferences?"); 
  pos = (up? 0 : askNum(0,where.length,"what position do you want it to take?"));

    //retrieve actual data
  who = getNum();                        //retrieve page number
  tit = getTitle();                     //retrieve title
  comm = prompt("insert a comment if you want"); //comments
  whole = [who,tit,comm].join(" - ");   //put everything together

  return insert(where,whole,pos);
  
}

function getTitle(){    //retrieve title (only element with "h1" tag)
  return document.getElementsByTagName("h1")[0].innerHTML; 
}

function insert(where,what,pos){  //inserts (what) in (where) at position (pos)
  where.splice(pos,0,what);
  return where;
}

function checkBound(low,high,pass){  //controlla se è nel range [low,high[ 
  
  if (typeof(pass) == "undefined")
    alert("missing number!");
  else if((pass == null) || (isNaN(pass)) )
    alert("please insert a number!");
  else{
  num = parseInt(pass);
  if (num<low)
    alert("too low!");
  else if (num>=high)
    alert("too high!");
  else
    return num;
  }

  return null;
 }

function askNum(low,high,mess){  //displays message until user enters a num in [low,high] range 
 
 do
  res = checkBound(low,high+1,prompt(mess+"\ninsert a number in the range "+low+" - "+high));
 while(res == null) 
 
 return res;
}

function manage(thing){
   
  while (true) {
    res = menu(thing);
    switch (res[0].toUpperCase()){
      
      case "":                //if user pressed OK without inserting anything, I guess he intends to exit
      case "R": return thing;

      case "G": n = checkBound(0,thing.length,res[1]);
                if(n != null)
                  location.href="/"+(thing[n].split(" - ")[0])+"/";
                return thing;  //to go to the page, need to close dialog first!

      case "K": thing = save(thing); break;

      case "A": if(confirm("delete all bookmarks, are you sure?"))
                  thing = [];
                break;

      case "C": n = checkBound(0,thing.length,res[1]);
                if(n != null)
                  thing[n] = changeComment(thing[n]); 
                break;

      case "E": n = checkBound(0,thing.length,res[1]);
                if(n != null)
                  thing = remove(thing,n); 
                break;

      case "M": n = checkBound(0,thing.length,res[1]);
                if(n != null){
                  m = checkBound(0,thing.length,res[2]);
                    if(m != null)
                     thing = move(thing,n,m);
                } 
                break;

      case "H": alert('Options:\n\nR ->exit prompt and return to comic\nK -> keep actual comic in bookmarks\nA -> delete all bookmarks\nG x -> goto comic in position x\nC x -> change comment to comic in position x\nE x -> erase comic at position x\nM x y -> move comic at position x to position y');
                break;

      default: alert("no such option for now\nif you have ideas about what "+res.join(" ")+" shoud do... let me know! :)");
      }
  }

  return thing;
}

function show(th){
 
  acc="";

  for(i=0;i<th.length;i++)
    acc+=i+") "+th[i]+"\n";

 return acc;
}

function menu(th){
   
  re = prompt("These are your actual bookmarks:\n\n"+show(th)+"\nWhat do you want to do?\n(H for the list of options)");

  if(re)
    return re.split(" ");
  else
   return "R";  //if user pressed "cancel", he obviously wants to exit

  }

function remove(whole,pos){
  whole.splice(pos,1);
  return whole;
}

function move(whole,from,to){
  tem = whole[from];
  whole = remove(whole,from);
  return insert(whole,tem,to);
 }

function changeComment(line){
  arr=line.split(" - ",2);
  arr[2]=prompt("Insert new comment:");
  return arr.join(" - ");
}

function share(){
  choice = prompt("Where do you want to share this comic?\n(H for options)");
  loc = encodeURIComponent(location.href);
  tit = encodeURIComponent(getTitle());

  if(choice)  //if null, close

    switch(choice[0].toUpperCase()){
      
      case "F": 
         location.href="http://www.facebook.com/sharer.php?u="+loc+"&t="+tit; 
         break; //sfare on Facebook
       
      case "T": 
         location.href="http://twitter.com/home?status=Currently reading "+loc; 
         break; //share on Twitter

      case "B": 
         location.href="http://www.google.com/reader/link?url="+loc+"&title="+tit; 
         break; //share on Google Buzz
      
      case "D": 
         location.href="http://delicious.com/save?url="+loc+"&title="+tit;
         break; //share in Delicious
      
      case "H":
         alert("F -> share on Facebook\nT -> share on Twitter\nB -> share on Google Buzz\nD -> share in Delicious H -> help (you didn't expect that, did you?)");
         share(); //the sharing is still to come, try again!
         break;
       
      default:
         alert("this option does not exist ...at least now!\nbut, feel free to suggest sites you'd like to add :)");
         share();  //again, give another chance
        
    }
}

function setSlide() {
   localStorage.interval = askNum(1,Infinity,"You are setting up slideshow:\nhow mani milliseconds should each page stay?\n(I recommend about 10000...but, as you wish :) )");   

   while (true) { //we'll exit using break
 
     o = prompt("what order do you wish to follow?\nB for backward, R for random, F for forward\nnothing to keep previous setting");
     
     if (o=='') //if inserted nothing, stays what it is
       break;
     o= o[0].toUpperCase(); //else, I have at least one charachter
     
     if ((o=="B") || (o=="R") || (o=="F")){  //if valid option
      localStorage.way = o;
      break;
     }
    }
  
   alert("pressing any key disables sliding, press 'p' to enable it again");
   startTime();
}

function startTime() {
   switch(localStorage.way){
     case "B": prox = get(previous); break;
     case "R": prox = cent.href;     break;
     case "F": prox = get(next);     break;
   }
   
   time = setTimeout("location.href='"+prox+"'",localStorage.interval);
 }

function endTime() {
   clearTimeout(time); //clear actual timeout
   localStorage.interval = -localStorage.interval; //make interval negative, to ignore it in the future
 }