// ==UserScript==
// @name           ERepublik - manage daily tasks
// @namespace      arvid.jakobsson@gmail.com
// @description    Allows citizens to add their own daily tasks
// @include        http://www.erepublik.com/daily_alerts.html*
// ==/UserScript==

(function() {
	GM_addStyle("#doneTaskListHolder { opacity: 0.5; }");
	addNewTaskLink();
	showTasks();
})();

function getTasks() {
	return deserialize('tasks', '({})');
}

function saveTask(task) {
	var newTaskObj = getTasks();
	if (newTaskObj[task.name] != null) {
		return false;
	}
	else {
		newTaskObj[task.name] = task;
		task.id = getUniqueTaskId();
		saveTasks(newTaskObj);
		return true;
	}
}

function getUniqueTaskId() {
	var taskObj = getTasks();
	var uniqueId = -1;
	for (var key in taskObj) {
		uniqueId = Math.max(uniqueId, taskObj[key].id);
	}
	return uniqueId+1;
}

function updateTask(task) {
	var newTaskList = getTasks();
	newTaskList[task.name] = task;
	saveTasks(newTaskList);
}

function saveTasks(tasks) {
	serialize('tasks', tasks);
}

function showTask(task) {
	var taskEl = {
		n: 'div', a: {'@class' : 'alert', '@id': 'taskNode' + task.id},
		c: [
			{n: 'div', a: {textContent: task.name, '@class' : 'alert-title'}},
			{
				n: 'div', a: {'@class' : 'alert-content'},
				c: [
					{n: 'p', a: {innerHTML: task.desc, '@style': 'float: left'}},
					{n: 'div', c: [
						{
							n: 'input', 
							a: {'@type': 'checkbox'}, 
							el: {e: 'click', l: function(e) { taskDone(task, e); } }
						},
						{n: 'label', a: {textContent: 'Done?'}}, //TODO: fixa "for"-attributet
						{n: 'div',  c: [
							{n: 'a', a: {'@href': 'javascript:;', textContent: 'remove'}, el: {e: 'click', l: function(e) { removeTask(task, e); }}}
						]}
					]}
				]
			}			
		]
	};
	
	var holder;
	if (isDone(task)) {//UGLEY!
		taskEl.c[1].c[1].a['@checked'] = 'checked';
		holder = $xs("id('doneTaskListHolder')");
	}
	else 
		holder = $xs("id('taskListHolder')");
	createEl(taskEl, holder);
}

function removeTask(task) {
	$('taskNode' + task.id).parentNode.removeChild($('taskNode' + task.id));
	var taskObj = getTasks();
	//taskObj[task.name] = undefined;
	delete taskObj[task.name];
	saveTasks(taskObj);
}

function taskDone(task, event) {
	var holder, last_done, taskNode = $('taskNode' + task.id);
	if (event.target.checked) {
		last_done = getERepTime();
		holder = $('doneTaskListHolder');
	}
	else {
		task.last_done = undefined;
		holder = $('taskListHolder');
	}
	
	if (holder.firstChild)
		holder.insertBefore(taskNode, holder.firstChild);
	else
		holder.appendChild(taskNode);
	
	task.last_done = last_done;
	updateTask(task);
}

function isDone(task) {
	return (task.last_done ? task.last_done.date == getERepTime().date : false);
}

function getERepTime(time) { //VOLATILE
	var time_str = $xs("id('headinfo5')/div[@class='time']").textContent;
	var hr = parseInt(time_str.match(/(\d+):\d+/)[1], 10);
	var min = parseInt(time_str.match(/\d+:(\d+)/)[1], 10);
	var time = hr*60 + min;
	var date = parseInt($xs("id('headinfo5')/div[@class='date']").textContent.match(/Day\s+(\d+)/)[1], 10);
	return {date: date, time: time};
}

function showTasks() {
	var tasks = getTasks();
	for (var key in tasks) 
		showTask(tasks[key]);
}

function addNewTaskLink() {
	var holder = $xs("id('primary')/div");
	
	/* creates task list holder */
	var taskListHolder = createEl({
		n: 'div',
		a: {'@id': 'taskListHolder'}
	});
	holder.appendChild(taskListHolder);
	//holder.appendChild(createEl({n: 'p', a: {textContent: 'Done tasks:'}}));
	var doneTaskListHolder = createEl({
		n: 'div',
		a: {'@id': 'doneTaskListHolder'}
	});
	holder.appendChild(doneTaskListHolder);	
	
	/* creates new task link */
	var newTaskLink = createEl({
		n: 'a',
		a: {'@href': '#', textContent: 'Add new daily task', '@id': 'newTaskLink'}
	});
	newTaskLink.addEventListener('click', showNewTaskForm, false);
	holder.appendChild(newTaskLink);
	
	/* creates new task form */
	var newTaskForm = createEl ({
		n: 'form',
		a: {'@id': 'newTaskForm', '@style' : 'display: none'},
		c: [
			{n: 'p', a: {textContent: 'Give your task an unique name:'}},
			{n: 'input', a: {'name': 'taskName'}},
			{n: 'p', a: {textContent: 'Describe your task (HTML allowed):'}},
			{n: 'textarea', a: {'name': 'taskDesc'}},
			/*{n: 'p', a: {textContent: 'How often should this task be done?'}},
			{n: 'select'},*/
			{n: 'input', a: {'type': 'submit', 'value': 'Save'}},
			{n: 'span', a: {textContent: ' or '}, c: [
				{n: 'a', a: {'@href': 'javascript:;', textContent: 'cancel'}, el: {e: 'click', l: cancelNewTask}}
			]}
		],
		el: {e: 'submit', l: saveTaskFromForm, b: false}
	});
	//newTaskForm.addEventListener('submit', saveTaskFromForm, false);
	holder.appendChild(newTaskForm);
}

function cancelNewTask(e) {
	var form = $('newTaskForm')
	toggle(form);
	form.reset();
	
	e.stopPropagation();
	e.preventDefault();
}

function showNewTaskForm(e) {
	toggle($('newTaskForm'));
	
	e.stopPropagation();
	e.preventDefault();
}

function saveTaskFromForm(e) {
	e.stopPropagation();
	e.preventDefault();
	
	var form = $('newTaskForm');
	var task = {
		name: form.elements.namedItem('taskName').value,
		desc:  form.elements.namedItem('taskDesc').value,
		interval: 123,
		last_done: undefined
	};
	
	if (task.name == null || task.name == "") {
		alert('Task name required');
	}
	else {
		if (!saveTask(task))
			alert('a task with that name already exist');
		else {
			showTask(task);
			form.reset();
			toggle(form);
		}
	}
}


/* *** */

function $x(xpath, root) { // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}

function $xs(xpath, root) {
	return $x(xpath, root)[0];
}

function $(id) { return document.getElementById(id); }

function deserialize(name, def) {
	return eval(GM_getValue(name, def) );
}

function serialize(name, val) {
	GM_setValue(name, uneval(val));
}

function createEl(elObj, parent) {
	var el;

	el = document.createElement(elObj.n);
	if (elObj.a) {
		attributes = elObj.a;
		for (var key in attributes) {
			if (typeof(attributes[key]) == 'string') {
				if (key.charAt(0) == '@')
					el.setAttribute(key.substring(1), attributes[key]);
				else 
					el[key] = attributes[key];
			}
		}
	}
	if (elObj.c) {
		elObj.c.forEach(function (v) { createEl(v, el); });
	}
	if (elObj.el) {
		el.addEventListener(elObj.el.e, elObj.el.l, elObj.el.b ? elObj.el.b : false);
	}
	if (parent) {
		parent.appendChild(el);
	}
	return el;
}

function toggle(el) {
	var vis = el.style.display;
	if (el.style.display == 'block') 
		el.style.display = 'none';
	else
		el.style.display = 'block';
}