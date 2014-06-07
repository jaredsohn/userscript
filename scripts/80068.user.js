// ==UserScript==
// @name           LeaveMemo
// @namespace      http://tax4.blog115.fc2.com/
// @include        http://*
// @include        https://*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==
var P={
  width:800,
  height:40,
  zIndex:200,
  right:10,
  topbottom:5,
  fontsize:12,
  defaultShow: true,
  transparency:0.8
};
var CATEGORY_ARRAY= ["", "todo","reference","trash"];
var OUTPUTTER ={
  SEPARATOR:"\n",
  FILTER:function(data){
    return data.toHTML();
  }
}
//====options label=================
var CATEGORY = "category";
var SORTKEY = "sortkey";
//====label for display=============

//====CONST=========================
var SHOWHIDE ="SHOWHIDE";

var jq = jQuery;
if(unsafeWindow.self==unsafeWindow.parent){
  var url = location.toString();
  var title = document.title;
  var value =  "";
  var data = getData(url);
    
  var wj = jq("<div></div>") //div for frame
    .css("position","fixed")
    .css("right", P.right+"px")
    .css("bottom",P.topbottom+"px")
    .css("zIndex",P.zIndex)
    .css("MozOpacity",P.transparency);
  
  var mj = jq("<div></div>"); //div for menu
  wj.append(mj);
  
  //edit area
  var taj = jq("<textarea></textarea>")
    .height(P.height).width(P.width)
    .val(data.memo)
    .css("fontSize",P.fontsize+"px");
  wj.append(taj);
  jq("body").append(wj);

  //menu
  var menuManager ={
    _menuj:null,
    setMenuj:function(menuj){
      this._menuj = menuj;
    },
    addButton:function(o){
      var _label = o.name;
      var _clickf = o.clickf;
      
      var bj = createButtonj(_label);
      bj.click( function(){_clickf();} );
      this._menuj.append(bj);
    },
    append:function(e){
      this._menuj.append(e);
      return this._menuj;
    }
  }
  
  menuManager.setMenuj(mj);
  menuManager.addButton({
    name:"memo!",
    clickf:function(){
      var opt = {};
      opt[CATEGORY] = selj.val();
      opt[SORTKEY]= inputj.val();
      saveMemo(url, title, taj.get(0).value,opt);
    }
  });

  var selj = createCategoryListSelect();
  var inputj = jq("<input></input>").val(getCurrentTime()).width(200);
  menuManager.append("sort key:")
    .append(inputj)
    .append("/")
    .append("category:")
    .append(selj)
    .append("/");


  menuManager.addButton({
    name:"go top",
    clickf:function(){
      wj.css("top",P.topbottom+"px");
      wj.css("bottom","");
    }

  });
  menuManager.addButton({
    name:"go bottom",
    clickf:function(){
      wj.css("top","");
      wj.css("bottom",P.topbottom+"px");
    }
  });
  menuManager.addButton({
    name:"double size",
    clickf:function(){
      taj.height(taj.height()*2);
    }
  });
  menuManager.addButton({
    name:"half size",
    clickf:function(){
      taj.height(taj.height()/2);
    }
  });
  

  //initialize display
  var sh = GM_getValue(SHOWHIDE);
  if(!sh){wj.hide();};

  //MENU
  GM_registerMenuCommand("show/hide memo box",function(){
    var flg = GM_getValue(SHOWHIDE);
    if(flg){
      GM_setValue(SHOWHIDE,0);
      wj.hide();
    }
    else{
      GM_setValue(SHOWHIDE,1);
      wj.show();
    }
  });
  
}


/***************************
 * Management
 ***************************/
GM_registerMenuCommand("Manage memo",function(){
  //
  var m = jq("<div style='background-color: white; '></div>");  //frame
  m.css("position","absolute").css("top","0px").css("zIndex",1500);
  //menu
  var menu = jq("<div></div>");
  m.append(menu);
  //table
  var tj = createTABLEj();
  m.append(tj);
  jq("body").append(m);

  //--command
  //delete
  var delbj = createButtonj('del');
  delbj.click(function(){
    tj.find(":checkbox[checked='true']").filter(":visible").each(function(){
      var thisj = jq(this);
      GM_deleteValue(thisj.val());
      thisj.parent().parent().remove();
    })
  });
  menu.append(delbj);
  menu.append("*|*");
  
  //change category
  menu.append(createChangeCategorySelect());
  menu.append("*|*");
  
  //category filter
  menu.append(createCategoryFilterSelect());
  menu.append("*|*");
  
  //toggle
  var checkTogglebj = createButtonj('toggle select');
  checkTogglebj.click(function(){
    tj.find(":checkbox").filter(":visible")
      .attr("checked",function(){
        var thisj = jq(this);
        if(thisj.attr("checked")){
          return false;
        }
        else{
          return true;
        }
      });
  });
  menu.append(checkTogglebj);
  menu.append("*|*");

  //all select
  var checkAllbj = createButtonj('all select');
  checkAllbj.click(function(){
    tj.find(":checkbox").filter(":visible").attr("checked", true);
  });
  menu.append(checkAllbj);
  menu.append("*|*");
  
  //none select
  var checkNonebj = createButtonj('none select');
  checkNonebj.click(function(){
    tj.find(":checkbox").filter(":visible").attr("checked", false);
  });
  menu.append(checkNonebj);
  menu.append("*|*");


  //output
  var outputbj = createButtonj('output');
  outputbj.click(function(){
    var resary = [];
    tj.find(":checkbox[checked='true']").filter(":visible").each(function(){
      var thisj = jq(this);
      var d = getData(thisj.val());
      resary.push(OUTPUTTER.FILTER(d));
    });
    var taj = jq("<textarea></textarea>");
    taj.width(600);
    taj.height(600);
    taj.css("position","absolute").css("top","0px").css("zIndex",1500);
    jq("body").append(taj);
    taj.val(resary.join(OUTPUTTER.SEPARATOR));
    taj.dblclick(function(){
      var thisj = jq(this);
      thisj.remove();
    });

  });
  menu.append(outputbj);
  menu.append("*|*");
  
  
  ///--------------
  function createTRbyData(data){
    var tr = jq("<tr ></tr>");
    tr.append("<td><input type='checkbox' value='"+data.url+"'></checkbox></td>");
    tr.append("<td>"+data.options[CATEGORY]+"</td>");
    tr.append("<td>"+data.options[SORTKEY]+"</td>");
    tr.append("<td>"+data.toHTML()+"</td>");
/*    tr.dblclick(function(){
      var editor = createEditor(data);
      $(this).append(editor);
//      $("body").append(editor);
//      editor.dblclick(function(){$(this).remove();});
    });
*/
    return tr;
  }
  
  /*
   * if f(data) return true, then data should show.
   */
  function createTABLEj(f){
    var tj = jq("<table border='1' "
     +"style='border: solid 1px; border-collapse: collapse;'>"
     +"</table>");
     
    var store = [];
    for(var i = 0, xs = GM_listValues(), x; x = xs[i]; i++){
      if(x.toString()!=SHOWHIDE){
        var data = getData(x);
        if((!f) || f(data)){
          var tr = createTRbyData(data);
          store.push({"tr":tr,"data":data});
        }
      }
    }
    store.sort(function(a,b){
      var vala = a.data.options[SORTKEY]+"";
      var valb = b.data.options[SORTKEY]+"";
      if(vala==valb) return 0;
      return (vala<valb)?-1:1;
    });

    for(var i = 0, trs ; trs = store[i]; i++){
      tj.append(trs.tr);
    }

//    tj.tablesorter();
    

    return tj;
  }
  
  function createChangeCategorySelect(){
    var spanj = jq("<span></span>");

    var selj = createCategoryListSelect();
    var changecatebj = createButtonj('change');
    changecatebj.click(function(){
      tj.find(":checkbox[checked='true']").each(function(){
        var thisj = jq(this);
        var oldTR = thisj.parent().parent();
        var curData = getData(thisj.val());
        curData.options[CATEGORY] = selj.val();
        curData.update();
        var newTR = createTRbyData(curData);
        oldTR.replaceWith(newTR);
      })
    });
    spanj.append(jq("category:"));
    spanj.append(selj);
    spanj.append(changecatebj);  
    
    return spanj
  }

  function createCategoryFilterSelect(){
    var spanj = jq("<span></span>");
    var selj = createCategoryListSelect();
    
    var changecatebj = createButtonj('filter');
    changecatebj.click(function(){
      tj.find(":checkbox").each(function(){
        var thisj = jq(this);
        var curData = getData(thisj.val());
        var selval = selj.val();
        if(selval=="" || curData.options[CATEGORY]==selval){
          thisj.parent().parent().show();
        }
        else{
          thisj.parent().parent().hide();
        }
        
      })
    });
    spanj.append(jq("filter:"));
    spanj.append(selj);
    spanj.append(changecatebj);  
    
    return spanj
  }
  
});

function createCategoryListSelect(){
  var selj = jq("<select></select>");
  var sel = selj.get(0);
  for(var i = 0; i < CATEGORY_ARRAY.length; i++){
    var cat = CATEGORY_ARRAY[i];
    sel.options[sel.length] = new Option(cat,cat);
  }
  return selj;
}

/**********************
 * UTILITY
 **********************/
function saveMemo(url, title, desc, opt){
  if(opt){
    var opts = [];
    for(var o in opt){
      opts.push(o+"="+escape(opt[o]));
    }
    opt = opts.join("&");
  }
  else{
    opt = "";
  }
  GM_setValue(url,escape(title)+"\n"+escape(desc)+"\n"+opt);
}

function getData(url){
  var s = GM_getValue(url);
  var memo, title, options;
  if(s){
    var ss = s.split("\n");
    title = unescape(ss[0]);
    memo = unescape(ss[1]);
    var options_str = ss[2]?ss[2]:"";
    options = (function(){
      var res = {};
      var ary = options_str.split("&");
      for(var i = 0, a; a = ary[i]; i++){
        var p = a.split("=");
        var key = p[0];
        var val = p[1];
        res[key] = val;
      }
      return res;
    })();

    
  }
  else{
    title = "";
    memo = "";
    options = {};
  }
  
  return {
    "url":url,
    "title":title,
    "memo":memo,
    "options":options,
    "toHTML":function(){
      var he = this._he;
      return "<div>"
        +"<div><a target='_blank' href='"+this.url+"'>"+he(this.title)+"</a></div>"
        +"<div>"+he(this.memo)+"</div>"
        +"</div>";
    },
    update:function(){
      saveMemo(this.url, this.title, this.memo, this.options);
    },
    _he:function(s){
      return s.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/[ ]/g,"&nbsp;").replace(/\>/g,"&gt;").replace(/\n/g,"<br/>");
    }
  };

}

function createButtonj(value,f){
  var xj = jq("<input type='button' value='"+value+"'></input>");
  if(f){
    xj.click(function(){f();});
  }
  return xj;
}


//
function getCurrentTime() {
  var now = new Date();
  var res = tochar(now.getFullYear(),4)
    + tochar(now.getMonth() + 1,2)
    + tochar(now.getDate(),2)
    + tochar(now.getHours(),2)
    + tochar(now.getMinutes(),2)
    + tochar(now.getSeconds(),2)
    + tochar(now.getMilliseconds(),3);
    
  return res;
  //
  function tochar(num,k) {
    var s = String(num);
    while(s.length<k){
      s = "0"+s;
    }
    return s;
  }
}

/*
function createEditor(data){
  var div = jq("<div></div>");
  var ta = jq("<textarea></textarea>").val(data.memo);
  var input =jq("<input></input>").val(data.url);
  var selj = createCategoryListSelect();

  var b = createButtonj("apply",function(){
    data.url = input.val();
    data.memo = ta.val();
    data.update();
    div.remove();
  });
  
  div.append(b);
  div.append(selj);
  div.append(input).append(ta);
  
  var opt = selj.find("option[value='"+data.options[CATEGORY]+"']").eq(0);
  if(opt){
    opt.attr("selected", true);
  }
  
  return div;
}

*/