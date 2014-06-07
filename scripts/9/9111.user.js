// ==UserScript==
// @name           userscripts install linker
// @namespace      userscripts.org/alien_scum
// @description    adds linkt to istall on us.o
// @include        http://*
// ==/UserScript==

scripts=document.evaluate('//a[contains(@href,"/scripts/show")]',document,null,6,null)
for(var i=0;link=scripts.snapshotItem(i++);)
  if(document.body.innerHTML.indexOf(r='/scripts/source/'+link.href.match(/\d+/)[0]+'.user.js')==-1){
    a=link.parentNode.insertBefore(document.createElement('a'),link);
    a.href='http://userscripts.org'+r;
    a.innerHTML='<img title="Install script" alt="Install script" border="none" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKwSURBVHjabJNJTBNRGID%2Fmc5MQYVWVNCGTbEtNZGDBj1ogolEMR5UJA2LBmMoIokxERIj8ehJjx6MYIQoJgq4JIa6gEARkKJFTa2iFFtKWwp2oeDCzNQ%2B31DQCc5L%2FnmT%2FP%2F3749ACAFBECBxiEPFFds0Ws399DRVhtX2udc97ig0PmgOLBkIbOwjAR8uMRRdvXF7pqv%2FNfrqnEAOlxsdLas6j3Wk2AEpCRcbKvLydrdu1WUr0lXrITEhAZKUSkhQKvKwXiY2ppbDRzCcv29P%2FZZsDaSqUkCJYVJGwKMnHTDlmWgTZ%2FCvjkW4sKTScP1WC%2BoZsKAxpwv5gyEUnAkj2xc70p88Y8Y2a8VBxT0gispOGa413UVDb23IMe6OwaEw%2BjTqQKMOF3pptqBSw7k74hLEPaDUOu0VmpFDV58ZCJIAkiDB5fUBz0eApmjQqbOgrqa69HhVbZO4jKUfmiBJBctysHJFPPiDYbA7J4DjeJDLaWAYGVAyErIy0uDs6RPH9OXVtULWYgfEmN3emJK8BlYrEsHl8cEvloX4ODnEyRlgKGZhV1iOhcz0VNixM7dOCCp2EBkeMF3u6DaNqDasg1U4CzlFxxSRKMyz8xjmsPAQwNmRsc2jxGPkR0esHp7n9RBFrYbyUi1DUzh1GujFG0UBQrNz8P7DR3j%2B9NklqTEK3VVkbNLkVNZc9AwNW5Hb60PT%2FgCamg6gEbsT3XvYjvIP6i9gu2ShhOWb%2BBvLD13O9o3azWrVdy4K3wKhv5HfWW1Q39BY19nechPbzQrVwX9bhU%2BiIqnyQMF%2BmPvJQr%2FFCsHwDJgG30ADhl8Y2wQ4jIUVkpdaZRnPcd6AfxomJ32AIhEwdvaC8XG7JLwwvmXPmVFn52Tu2lvQjN9Crn3M6bWY%2B6otr3oGpWCB%2FSPAAJaJRguGUxB0AAAAAElFTkSuQmCC"/>'
  }