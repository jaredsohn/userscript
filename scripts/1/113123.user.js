// ==UserScript==
// @name           Add to MyMovies - Have Seen
// @author         Anand kumar A
// @namespace      http://myxp.blogspot.com
// @description    Adds a title id to a MyMovies List Id 
// @include        http://www.imdb.com/title*
// ==/UserScript==

var listsPath = "//TABLE[contains(@class,'lists')]//TD[contains(@class,'name')]//A[contains(@href,'list')]";
var mm_select_id      = "mm_select_list";
var mm_newdiv_err_id  = "mm_newdiv_err";
var mm_newdiv_info_id = "mm_newdiv_info";
var new_div;

var list_id   = "";
var title_id  = "";
var user_logged_in   = "";
var user_id = "";
var mymovie_list = [];

//Add the CSS
GM_addStyle(
 '.mm_newdiv_parent{clear:both;padding:15px 0px 15px 0px;border:1px solid lightgray;} '+
 '.mm_newdiv_err {background-color: #FFDDCC; color: black; margin: -14px 0 10px; padding: 4px;} '+
 '.mm_newdiv_info{background-color: #DDFFCC; color: black; margin: -14px 0 10px; padding: 4px;} '
);

//For Title pages
if(document.baseURI.match(/imdb.com\/title\/tt\d+(\/)*/) != null){
  var parentElement;
  var i=0;

  //Insert our container div and its error and info divs first.
  parentElement = document.getElementById('overview-bottom');

  new_div = document.createElement('div');
  new_div.className = "mm_newdiv_parent";
  new_div.id = "mm_newdiv_parent";
  parentElement.appendChild(new_div);
  
  new_div_info = document.createElement('div');
  new_div_info.className = "mm_newdiv_info";
  new_div_info.id = "mm_newdiv_info";
  new_div.appendChild(new_div_info);

  new_div_err = document.createElement('div');
  new_div_err.className = "mm_newdiv_err";
  new_div_err.id = "mm_newdiv_err";
  new_div.appendChild(new_div_err);

  //Check if the user is logged-in.
  user_logged_in = GetUserName();
  if(user_logged_in == ""){
    MMInfo("You are not logged-in!");
  }
  else{
    //Retrieve all the lists for the user ID.
    //The rest of the front-end is built once the lists are retrived.
    MMInfo("Loading...");
    MMErr("");
    GetMyLists();
  }
}

function GetUserName(){
    var userString;
    var username = "";
    
    if(document.getElementById('nb_personal') != null){
        userString = document.getElementById('nb_personal').innerHTML.match(/>\b(.)*\'s account/i);
    }
    
    if(userString == null){
        username = "";
    }
    else if(userString.length > 0){
        username = userString[0].substring(1); //Removing the '>' in the first position.
    }
    
    return username;   
}

/**
  * Call the IMDB API to add a title to a movie list. 
  */
function AddTitleToList(title_id, list_id){
  var bRet = true;
  var url = "";
  var method = "";
  var data = "";
  var headers = {};
  
  var resp_json = {};
  
  if(list_id != "" && title_id != ""){
    /*Add the title id to the opened list*/
    url = "http://www.imdb.com/list/_ajax/edit";
    method = "POST";
    data = "const=" + title_id + "&list_id=" + list_id;
    headers = {
                "Referer": "http://www.imdb.com/list/edit?list_id="+list_id,
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              };

    GM_xmlhttpRequest({
      "method" : method,
      "url"    : url,
      "data"   : data,
      "headers": headers,
      "onload" : function(response) {
      resp_json = JSON.parse(response.responseText);
      //GM_log("status="+response.status+", list_item_id="+resp_json.list_item_id+", i="+response.i);
        if (response.status == 200 && resp_json.list_item_id != null) {
          MMInfo("Movie added successfully to the list!");
          //If all goes according to plan, store the current value as default.
          GM_setValue(mm_select_id, list_id);
          bRet = true;
        }
        else{
          MMErr('Unable to add the movie to the selected list!');
          bRet = false;
        }
        //logResponse(response);
      }
    });

  }
  
  return bRet;
}

/**
  * Load a user's IMDB MyMovies list page. Then pass this page to a function to get the user's MyMovies list(s).
  */
function GetMyLists(url){
  
  var bRet = true;
  var url = "";
  var method = "";
  var data = "";
  var headers = {};
  
  if(url == null || url == ""){
      url = "http://www.imdb.com/mymovies/list";
  }
    
  method = "GET";
  data = "";
  headers = {};

  GM_xmlhttpRequest({
    "method" : method,
    "url"    : url,
    "data"   : data,
    "headers": headers,
    "onload" : function(response) {
      if (response.status == 200) {
        user_id = response.finalUrl.match(/\/user\/(.*)\//)[1];
        ParseMyMovies(response.responseText);
        BuildMMUI();
        bRet = true;
      }
      else{
        MMErr('Error retreiving MyMovies list!');
        bRet = false;
      }
      //logResponse(response);
    }
  });


  return bRet;
}

/**
  * Parse the MyMovie list ids from the MyMovies page HTML.
  */
function ParseMyMovies(mmhtml){
  var tdarr=[];
  var a, list_title, list_id;
  var i = 0;
  var link;
  var tempItem = "";
  
  tdarr = mmhtml.match(/<td\sclass=\"name\">(.*)\<\/a>/gi);
  if(tdarr != null){
    mymovie_list = [];
    for(i=0; i<tdarr.length; i++){
      a = tdarr[i].match(/<a.*<\/a>/gi)[0];
      list_title = a.match(/>(.*)<\/a>/)[1];
      list_id    = a.match(/href=\"\/list\/(.*)\/\"/)[1];

      tempItem = {
                  "id"  :list_id,
                  "name":list_title
                 };
      //GM_log("id="+list_id+", title="+list_title);
      mymovie_list.push(tempItem);
    }
  
  }
  
  return i;

}


function BuildMMUI(){
  var title_id = '';
  var add_button;
  var view_button;

  title_id = document.baseURI.match(/imdb.com\/title\/(tt\d+)(\/)*/)[1];
  //GM_log("Title ID: "+title_id);
  
  //Clear any messages.
  MMInfo("");
  MMErr("");

  //Check if we need to proceed further.
  if(mymovie_list.length < 1){
      //Nothing to add.
      MMInfo("No MyMovies List found!");
      return false;
  }

  new_div.innerHTML += "<label>1.Choose your list:</label><br />";
  mm_select_list = document.createElement('select');
  mm_select_list.options = [];
  mm_select_list.id = mm_select_id;
  new_div.appendChild(mm_select_list);
  
  new_div.innerHTML += "<br /><br />";
  new_div.innerHTML += "<label>2.Select the action:</label><br />";
  
  add_button = document.createElement('a');
  add_button.className = "btn large";
  add_button.innerHTML = "+ Add to list";
  add_button.addEventListener('click',function(e){
                                          var list_id = GetMMSelectActive();
                                          //Clear any existing error and info messages.
                                          MMErr("");
                                          MMInfo("");
                                          
                                          //Check if the movie is already in the list.
                                          //TODO::Add caching.
                                          MMInfo("Checking if the movie is already in the list...");
                                          TitleExistsInList(title_id, list_id);
                                      }
                                     , false );
  new_div.appendChild(add_button);

  view_button = document.createElement('a');
  view_button.className = "btn large";
  view_button.innerHTML = "+ View list";
  view_button.addEventListener('click',function(e){
                                          var list_id = GetMMSelectActive();
                                          location.href = "http://www.imdb.com/list/"+list_id;
                                      }
                                     , false );
  new_div.appendChild(view_button);
  
  PopulateMMSelect();

}

/**
  * Populates the select list with options. Also sets the previously selected value, if any.
  */
function PopulateMMSelect(){
  if(mymovie_list.length < 1){
      //Nothing to add.
      return 0;
  }
  
  //Try to get the previously selected value for this list box, if any.
  var default_id = GM_getValue(mm_select_id, mymovie_list[0].id);
  var mm_select_list = document.getElementById(mm_select_id);
  for(i=0; i<mymovie_list.length; i++){
      CreateOption(mm_select_id, mymovie_list[i].id, mymovie_list[i].name);
      if(default_id == mymovie_list[i].id){
        mm_select_id.selectedIndex = i;
      }
  }
  return i;
}

/**
  * Call the export list url and check if the title_id is present.
  */
function TitleExistsInList(title_id, list_id){
    var bRet = false;
    var url = "";
    var method = "";
    var data = "";
    var headers = {};
    
    url = "http://www.imdb.com/list/export?list_id="+list_id+"&author_id="+user_id;
      
    method = "GET";
    data = "";
    headers = {};

    GM_xmlhttpRequest({
      "method" : method,
      "url"    : url,
      "data"   : data,
      "headers": headers,
      "onload" : function(response) {
        if (response.status == 200) {
          if(response.responseText.search(title_id) > -1){
              //This title was already added to this list.
              //Check if the user wants to add a duplicate.
              if(!confirm("The movie already exists in the selected list! Do you want to add a duplicate?")){
                  //User cancelled.
                  MMErr("");
                  MMInfo("Operation cancelled.");
                  return false;
              }
          }

          //Add the movie to the list.
          MMInfo("Adding title("+title_id+") to list("+list_id+")...");
          if(AddTitleToList(title_id,list_id)){
          }
          else{
              MMErr('Error when adding movie to the selected list!');
          }
          
        }
        else{
          MMErr('Error exporting the MyMovies list!');
          bRet = false;
        }
        //logResponse(response);
      }
    });
    
    return bRet;
}


/**
  * Formatting and output a http response.
  */
function logResponse(response){
  GM_log([
    "status="+response.status,
    "statusText="+response.statusText,
    "readyState="+response.readyState,
    "responseHeaders="+response.responseHeaders,
    "responseText="+response.responseText,
    "finalUrl="+response.finalUrl,
    "responseXML="+response.responseXML
  ].join("\n"));
}

function MMInfo(infostr,append){
    var info_ele = document.getElementById(mm_newdiv_info_id);
    if(append != null && append == true){
        info_ele.innerHTML += "<br />"+infostr;
    }
    else{
        info_ele.innerHTML = infostr;
    }
    
    if(infostr==""){
      info_ele.style.display = "none";
    }
    else{
      info_ele.style.display = "";
    }
}

function MMErr(errstr,append){
    var err_ele = document.getElementById(mm_newdiv_err_id);
    if(append != null && append == true){
        err_ele.innerHTML += "<br />"+errstr;
    }
    else{
        err_ele.innerHTML = errstr;
    }

    if(errstr==""){
      err_ele.style.display = "none";
    }
    else{
      err_ele.style.display = "";
    }
}

/**
  * Function to add options to a select box.
  */
function CreateOption(id,newValue,newText){
  //GM_log("Creating option with: value="+newValue+", text="+newText);
  var objSelect  = document.getElementById(id);
  var objOption  = document.createElement("option");
  objOption.text  = newText
  objOption.value = newValue

  if(document.all && !window.opera){
    objSelect.add(objOption);
  }
  else{
    objSelect.add(objOption, null);
  }
}

/**
  * Function to get the currently selected list id
  */
function GetMMSelectActive(){
    var select_ele = document.getElementById(mm_select_id);
    return select_ele.value;
}

/**
  * Generic function to get HTML nodes from an XPath.
  */
function $x(path, root) {
	if (!root) root = document;

	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//GM_log(path+" ***found matches: "+xpr.snapshotLength);
	for (i = 0; item = xpr.snapshotItem(i); i++) {
    //GM_log(i+": "+item.src);
    arr.push(item);
  }
	return arr;
}
