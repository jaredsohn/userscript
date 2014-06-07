// ==UserScript==
// @name           Combine Report
// @namespace      Deep Route
// @include        http://deeproute.com/deeproute/default.asp?js=oneplayer&lookatplayer=*&leagueno=*
// @include        http://deeproute.com/deeproute/default.asp?js=oneplayer&lookatplayer=*&myleagueno=*
// @include        http://deeproute.com/deeproute/?js=oneplayer&lookatplayer=*&leagueno=*
// @include        http://deeproute.com/deeproute/?js=oneplayer&lookatplayer=*&myleagueno=*
// ==/UserScript==

var attr=[], counter=0, outtable, currtr;

function add(title, value) {

  var td = document.createElement("td");
  td.setAttribute('align','center');
  var newDiv = document.createElement('div');
  newDiv.innerHTML=title;
  td.appendChild(newDiv);
  td.setAttribute('style', 'font-weight: bold;');
  currtr.appendChild(td);

  var td2 = document.createElement("td");
  td2.setAttribute('align','center');
  var newDiv = document.createElement('div');
  newDiv.innerHTML=value;
  td2.appendChild(newDiv);
  currtr.appendChild(td2);

  if (++counter==5) {
    currtr = document.createElement("tr");
    outtable.appendChild(currtr);
    counter=0;
  }
}

function after() {
  if (counter>0)
    for (var x=0; x<(5-counter)*2; x++) {
      var td = document.createElement("td");
      td.setAttribute('align','center');
      var newDiv = document.createElement('div');
      newDiv.innerHTML='<br>';
      td.appendChild(newDiv);
      td.setAttribute('style', 'font-weight: bold;');
      currtr.appendChild(td);

    }
}

window.setTimeout( function() {

  var input=document.body.innerHTML, ptr1, ptr2, ptr3, ptr4, tmp1, tmp2, str1, draft, draftyear, undrafted=0, curryear=-1;

  attr[0]=attr[1]=attr[2]=0;

  ptr1=input.indexOf("hiyear", 0);
  if (ptr1>=0) {
    ptr2=input.indexOf("value=\"", ptr1+6);
    if (ptr2>=0)
      curryear=input.substring(ptr2+7, ptr2+11);
  }

  ptr1=input.indexOf("Undrafted", 0);

  if (ptr1>=0) {
    draft=225;
    undrafted=1;
  }
  else {

    ptr1=input.indexOf("nbsp;Draft", 0);
    if (ptr1>=0) {
      ptr2=input.indexOf("&nbsp;", ptr1+10);
      draftyear=input.substring(ptr2+6, ptr2+10);
      ptr2=input.indexOf("Rd ", ptr1+10);
      if (ptr2>ptr1) {
        ptr3=input.indexOf(",", ptr2+3);
        if (ptr3>ptr2) {
          tmp1=input.substring(ptr2+3, ptr3);
          ptr4=input.indexOf("</td>", ptr3+2);
          tmp2=input.substring(ptr3+5, ptr4);
          draft=parseInt(tmp1)*32 + parseInt(tmp2);
        }
      }
    }
  }

  ptr1=input.indexOf("nbsp;Height", 0);
  if (ptr1>=0) {
    ptr2=input.indexOf("nbsp;", ptr1+11);
    if (ptr2>ptr1) {
      ptr3=input.indexOf("'", ptr2+5);
      if (ptr3>ptr2) {
        tmp1=input.substring(ptr2+5, ptr3);
        tmp2=input.substring(ptr3+2, ptr3+4);
        attr[0]=parseInt(tmp1) * 12 + parseInt(tmp2);
      }
    }
  }


  ptr1=input.indexOf("nbsp;Height", 0);
  if (ptr1>=0) {
    ptr2=input.indexOf("nbsp;", ptr1+11);
    if (ptr2>ptr1) {
      ptr3=input.indexOf("'", ptr2+5);
      if (ptr3>ptr2) {
        tmp1=input.substring(ptr2+5, ptr3);
        tmp2=input.substring(ptr3+2, ptr3+4);
        attr[0]=parseInt(tmp1) * 12 + parseInt(tmp2);
      }
    }
  }

  ptr1=input.indexOf("nbsp;Weight", 0);
  if (ptr1>=0) {
    ptr2=input.indexOf("nbsp;", ptr1+11);
    if (ptr2>ptr1) {
      ptr3=input.indexOf(" Pounds", ptr2+5);
      if (ptr3>ptr2) {
        tmp1=input.substring(ptr2+5, ptr3);
        attr[1]=parseInt(tmp1);
      }
    }
  }

  ptr1=input.indexOf("nbsp;Experience", 0);
  if (ptr1>=0) {
    ptr2=input.indexOf("nbsp;", ptr1+11);
    if (ptr2>ptr1) {
      ptr3=input.indexOf(" Years", ptr2+5);
      if (ptr3>ptr2) {
        tmp1=input.substring(ptr2+5, ptr3);
        if (tmp1.indexOf("Rookie")>=0) attr[2]=0;
        else attr[2]=parseInt(tmp1);
      }
    }
  }

  ptr1=input.indexOf("atts", 0);

  if (ptr1>=0) {
    ptr2=input.indexOf("value=\"", ptr1);
    ptr3=input.indexOf("\"", ptr2+7);
    if (ptr2>=0 && ptr3>ptr2) {

      str1=input.substring(ptr2+7, ptr3);

      for (var x=0; x<str1.length; x+=2) {
        ptr1=str1.substring(x, x+2);
        if (ptr1.substring(0, 1) == '0') {
          ptr2=ptr1.substring(1, 2);
          ptr1=ptr2;
        }
        attr[attr.length]=parseInt(ptr1);

      }

      outtable = document.createElement("table");
      outtable.setAttribute("border","1");
      outtable.setAttribute("cellspacing","0");
      outtable.setAttribute("bgcolor","#FFFFCC");
      outtable.setAttribute('style','width: 100%');
      outtable.setAttribute('id',"combine table");
      currtr = document.createElement("tr");
      outtable.appendChild(currtr);

      var BMI = Math.round(parseFloat(attr[1])*703.0/(parseFloat(attr[0])*parseFloat(attr[0]))*10.0)/10, BMI_category;
      if (BMI <= 18.5) BMI_category = "Underweight";
      else if (BMI <= 24.9) BMI_category = "Normal";
      else if (BMI <= 29.9) BMI_category = "Overweight";
      else BMI_category = "Obese";
      add("BMI", BMI_category);

      var wonderlic1 = parseInt(parseFloat(attr[13])*0.24+parseFloat(attr[29])*0.24+parseFloat(attr[25])*0.06+parseFloat(attr[47])*0.06);
      var wonderlic2 = parseInt(parseFloat(attr[14])*0.24+parseFloat(attr[30])*0.24+parseFloat(attr[26])*0.06+parseFloat(attr[48])*0.06);
      add("Wonderlic", wonderlic1);
      add("Wonderlic<br>(study hard)", wonderlic2);

      var dash1 = 5.5 + (attr[1]-280>0 ? (parseFloat(attr[1]) - 280.0)/40.0 : 0) +  parseFloat(attr[55])*0.001 - 
              ((240-parseFloat(attr[1]))*0.001 + parseFloat(attr[35])*0.011 + parseFloat(attr[19])*0.001 + parseFloat(attr[37])*0.002);
      if (dash1 < 4.0) dash1 = 4.0;
      dash1=Math.round(parseFloat(dash1) * 100.0) / 100.0;
      add("40-yard dash", dash1.toString() + " sec");

      var dash1 = 5.5 + (attr[1]-280>0 ? (parseFloat(attr[1]) - 280.0)/40.0 : 0) +  parseFloat(attr[56])*0.001 - 
              ((240-parseFloat(attr[1]))*0.001 + parseFloat(attr[36])*0.011 + parseFloat(attr[20])*0.001 + parseFloat(attr[38])*0.002);
      dash1=Math.round(parseFloat(dash1) * 100.0) / 100.0;
      if (dash1 < 4.0) dash1 = 4.0;
      add("40-yard dash<br>(train hard)", dash1.toString() + " sec");

      var jump = 20 + parseInt(parseFloat(attr[33])*0.19 + parseFloat(attr[37])*0.02 + parseFloat(attr[9])*0.02 + parseFloat(attr[55])*0.01 +
                 parseFloat(attr[59])*0.02 - (attr[1]-280>0 ? (parseFloat(attr[1])-280)/5.0 : 0) + parseFloat(attr[0]-74)/2.0 );
      if (jump<0) jump=0;
      add("vertical jump", jump.toString() + " inches");

      jump = 20 + parseInt(parseFloat(attr[34])*0.19 + parseFloat(attr[38])*0.02 + parseFloat(attr[10])*0.02 + parseFloat(attr[56])*0.01 +
             parseFloat(attr[60])*0.02 - (attr[1]-280>0 ? (parseFloat(attr[1])-280)/5.0 : 0) + parseFloat(attr[0]-74)/2.0 );
      if (jump<0) jump=0;
      add("vertical jump<br>(Train hard)", jump.toString() + " inches");

      var press = parseInt(parseFloat(attr[11])*0.36 + parseFloat(attr[51])*0.02 + parseFloat(attr[9])*0.03 +  parseFloat(attr[59])*0.02 + 
                  parseFloat(attr[53])*0.03 - (attr[1]<280 ? (280.0-parseFloat(attr[1]))/10.0 : (parseFloat(attr[1]-280.0)/-20.0)));
      if (press<5) press=5;
      add("Bench Press", press);

      press = parseInt(parseFloat(attr[12])*0.36 + parseFloat(attr[52])*0.02 + parseFloat(attr[10])*0.03 +  parseFloat(attr[60])*0.02 + 
                  parseFloat(attr[54])*0.03 - (attr[1]<280 ? (280.0-parseFloat(attr[1]))/10.0 : (parseFloat(attr[1]-280.0)/-20.0)));
      if (press<5) press=5;
      add("Bench Press<br>(Train hard)", press);

      jump = 3.5 + parseFloat(attr[33])*0.05 + parseFloat(attr[59])*0.02 + parseFloat(attr[11])*0.008 + parseFloat(attr[55])*0.008 -
             (attr[1]>260 ? (parseFloat(attr[1])-260.0)/20.0 : 0);
      jump = parseFloat(Math.round(parseFloat(jump)*100.0))/100.0;
      if (jump<3.5) jump=3.5;
      add("Broad jump", jump.toString() + " inches");

      jump = 3.5 + parseFloat(attr[34])*0.05 + parseFloat(attr[60])*0.02 + parseFloat(attr[12])*0.008 + parseFloat(attr[56])*0.008 -
             (attr[1]>260 ? (parseFloat(attr[1])-260.0)/20.0 : 0);
      jump = parseFloat(Math.round(parseFloat(jump)*100.0))/100.0;
      if (jump<3.5) jump=3.5;
      add("Broad jump<br>(Train Hard)", jump.toString() + " inches");

      var cone=8.0 - parseFloat(attr[35])*0.004 - parseFloat(attr[37])*0.008 - parseFloat(attr[59])*0.003 - parseFloat(attr[7])*0.001 
               - parseFloat(attr[9])*0.001 - parseFloat(attr[27])*0.001 + (attr[1]>260 ? (parseFloat(attr[1])-260.0)/100.0 : 0.0);
      cone = parseFloat(Math.round(parseFloat(cone)*100.0))/100.0;
      add("Cone drill", cone.toString() + " sec");

      cone=8.0 - parseFloat(attr[36])*0.004 - parseFloat(attr[38])*0.008 - parseFloat(attr[60])*0.003 - parseFloat(attr[8])*0.001 
               - parseFloat(attr[10])*0.001 - parseFloat(attr[28])*0.001 + (attr[1]>260 ? (parseFloat(attr[1])-260.0)/100.0 : 0.0);
      cone = parseFloat(Math.round(parseFloat(cone)*100.0))/100.0;
      add("Cone drill<br>(Train hard)", cone.toString() + " sec");

      var shuttle=13.5 - parseFloat(attr[35])*0.006 - parseFloat(attr[37])*0.003 - parseFloat(attr[39])*0.003 - parseFloat(attr[27])*0.002
                       - parseFloat(attr[51])*0.002 + (attr[1]>260 ? (parseFloat(attr[1])-260.0)/40.0 : 0.0);
      shuttle = parseFloat(Math.round(parseFloat(shuttle)*100.0))/100.0;
      add("60-yard Shuttle", shuttle.toString() + " sec");

      var shuttle=13.5 - parseFloat(attr[36])*0.006 - parseFloat(attr[38])*0.003 - parseFloat(attr[40])*0.003 - parseFloat(attr[28])*0.002
                       - parseFloat(attr[52])*0.002 + (attr[1]>260 ? (parseFloat(attr[1])-260.0)/40.0 : 0.0);
      shuttle = parseFloat(Math.round(parseFloat(shuttle)*100.0))/100.0;
      add("60-yard Shuttle<br>(Train hard)", shuttle.toString() + " sec");

      var hotdog=parseInt((parseFloat(attr[1])-160.0)/4.0 + parseFloat(attr[51])*0.1 + parseFloat(attr[47])*0.05 + parseFloat(attr[9])*0.1 +
                          parseFloat(attr[55])*0.05 + parseFloat(attr[35])*0.05);
      if (hotdog>80) hotdog=80;
      add("Hotdog<br>Contest", hotdog.toString() + " dogs<br>in 12 min");

      var wrestling=Math.round((parseFloat(attr[11]) + parseFloat(attr[31]) + parseFloat(attr[17]) + parseFloat(attr[21])+
                                parseFloat(attr[37]))*10.0)/10.0;
      add("Steer Wrestling", wrestling);

      var limbo=Math.round(parseFloat(attr[0]) + 5.0 - parseFloat(attr[0])*0.01 * parseFloat(attr[59]));
      if (limbo<24) limbo=24;
      add("Limbo<br>Competition", limbo.toString() + " inches");

      var swimsuit = Math.round((10.0 - parseFloat(BMI-20)*0.5 + parseFloat(attr[13])*0.005 + parseFloat(attr[25])*0.005)*10.0) / 10.0;
      if (swimsuit<0.0) swimsuit=0.0;
      if (swimsuit>10.0) swimsuit=10.0;
      add("Swimsuit<br>Competition", swimsuit.toString() + " / 10");

      var chick=swimsuit*10 + (250-draft);
      add("Chick Magnet", chick);

      var target = document.getElementById('hili1');
      if (target) target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(outtable, 
                  target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);

        target = document.getElementById('PlayerTable');
        var els=target.getElementsByTagName("*"), stop=0;
        for (var x=0; x<els.length; x++) {
           var els2=els[x].getElementsByTagName("*");
           for (var y=0; y<els2.length; y++)
             if (els2[y].innerHTML.indexOf("&nbsp;Birthday",0)>=0 && els2[y].innerHTML.length<=20) {
                str1=els2[y+1].innerHTML;
                ptr1=str1.lastIndexOf("/");
                ptr2=str1.substring(ptr1+1, str1.length);
                if (parseInt(curryear)>1) {
                  ptr1=parseInt(curryear) - parseInt(ptr2);
                  els2[y+1].innerHTML+=" (<b>" + ptr1 + "</b> yr old)";
                }
                else if (undrafted==0) {
                  ptr1=parseInt(draftyear) + parseInt(attr[2]) - parseInt(ptr2);
                  els2[y+1].innerHTML+="  (<b>" + ptr1 + "</b> yr old)";
                }
               
                stop=1;
                break;
             }
           if (stop==1) break;
        }
      
    }
  }
}, 300);