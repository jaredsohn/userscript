// ==UserScript==
// @name           center_test
// @namespace      gomaxfire.dnsdojo.com
// @include        http://blog.livedoor.jp/lalha/archives/50200590.html
// ==/UserScript==

Array.prototype.each = function(func){
  for(var i=0,l=this.length;i<l;i++){
    func(this[i],i);
  }
};
function $ (id){
  return document.getElementById(id);
}
function sl(a){
  return Array.prototype.slice.apply(a)
}
function next(n){
  var m = n.nextSibling;
  if(m && m.nodeType != 1){
    return next(m);
  }
  return m;
}

addForm();

function addForm(){
  var divs = $("articlebody").getElementsByTagName("div");
  var main = null;
  var blogbody = false;
  for(var i=0,l=divs.length;i<l;i++){
    var div=divs[i];
    var className = div.className;
    if(className == "blogbody"){
      blogbody = true;
    } else if(blogbody && className == "main"){
      main = div;
      break;
    }
  }
  var answers = prepareAnswer();
  var form = document.createElement("form");
  form.addEventListener("submit",
                        function(e){
                          var points = 0;
                          e.preventDefault();
                          inputs.each(function(input){
                            var style = input.parentNode.style;
                            style.background = "transparent";
                            if(!input.checked)
                              return;
                            var answer = answers[input.name];

                            if(answer && answer.answer == input.value){
                              points += answer.point;
                              style.backgroundColor = "green";

                            } else {
                              style.backgroundColor = "red";
                            }

                          });
                          alert(points+"点/"+answers.all + "点満点");


                        }, true);
  while(main.firstChild){
    form.appendChild(main.firstChild);
  }
  var submit = document.createElement("input");
  with(submit.style){
    position="fixed";
    bottom = "2px";
    left = "2px";
  }
  submit.type = "submit";
  submit.value = "答え合わせ";
  form.appendChild(submit);
  main.appendChild(form);

  var ols = sl(form.getElementsByTagName("ol"));
  var inputs = [];
  ols.each(function(ol,i){
    var lis = sl(ol.getElementsByTagName("li"));
    lis.each(function(li, j){
      var input = document.createElement("input");
      input.type="radio";
      input.name=i+1;
      input.value=j+1;
      li.insertBefore(input, li.firstChild);
      inputs.push(input);
    });
  });

  function prepareAnswer(){
    var centers = document.getElementsByTagName("center");
    var preAnswer = null;
    for(var i=0,l=centers.length;i<l;i++){
      var center = centers[i];
      if(center.textContent.match(/解答/)){
        preAnswer = center;
        break;
      }
    }
    var ps= [];
    ps.push(next(preAnswer));
    ps.push(next(ps[0]));
    ps.push(next(ps[1]));
    ps.push(next(ps[2]));
    var answerText = ps.map(function(answer){return answer.textContent;}).join("");
    var regexp = /問(\d+)\((\d+)点\) (\d)/g;
    var answers = {};
    var all = 0;
    answerText.match(regexp).each(function(answer){
      answer.match(regexp);
      var point =parseInt(RegExp.$2);
      answers[RegExp.$1] = {answer:RegExp.$3, point:point};
      all += point;
    });
    answers.all = all;
    return answers;
  }
}
