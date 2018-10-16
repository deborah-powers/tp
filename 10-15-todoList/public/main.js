
let dbUrl = 'task-list/';
let pageWeb = 'http://localhost:2403/' + dbUrl;

window.onload = function(){
	loadTaskList();
	let buttonAddTask = document.querySelector ('button');
	buttonAddTask.addEventListener ('click', addTask);
	/* fonction pour les liens de suppression, qui ne sont pas encore céés
	associer l'action au body
	un if permettra de vérifier la classe de la cible, et de la lancer ou nom la fonction */
	let body = document.querySelector ('body');
	body.addEventListener ('click', delTask);
}
function loadTaskList(){
	let xhr = new XMLHttpRequest();
	xhr.open ('get', pageWeb, true);	// true indique que la lecture est assynchrone
	xhr.setRequestHeader ('Content-Type', 'application/json; charset=UTF8');
	/* xhr varie au cours du temps
	l'état dépend de l'ouverture de la page */
	xhr.onreadystatechange = getTaskList;
	xhr.send();
}
function addTask(){
	let inputList = document.querySelectorAll ('input');
	let taskName = inputList[1].value;
	// condition que j'impose avant d'enregistrer quelque chose dans la bdd
	if (taskName){
		let taskInfo = inputList[2].value;
		let task = new createTask (taskName, taskInfo);
		console.log ('task created:', task);
		let taskStr = JSON.stringify (task);
		let xhr = new XMLHttpRequest();
		xhr.open ('post', pageWeb, true);
		xhr.setRequestHeader ('Content-Type', 'application/json; charset=UTF8');
		xhr.send (taskStr);
	}
}
function delTask (event){
	let linkClass = event.target.className;
	if (linkClass === 'del-btn'){
		// cf <a class="del-btn" data-task-id="' + task.id + '" href="">effacer</a>
		let taskId = event.target.dataset.taskId;
		let xhr = new XMLHttpRequest();
		xhr.open ('delete', pageWeb + taskId +'/', true);
		xhr.setRequestHeader ('Content-Type', 'application/json; charset=UTF8');
		xhr.send();
	}
}
function getTaskList(){
	if (this.readyState ===4 && this.status ===200){
		// récupérer les données
		console.log ('page retrieved: '+ pageWeb);
		var xhrJson = JSON.parse (this.responseText);
		console.log (xhrJson);
		// les afficher sur ma page
		xhrJson.forEach (createTaskRow);
	}
	else console.log ('page not retrieved: '+ pageWeb);
}
function createTaskRow (task){
	let cellId = document.createElement ('td');
	cellId.textContent = task.id;
	let cellName = document.createElement ('td');
	cellName.textContent = task.name;
	let cellInfo = document.createElement ('td');
	cellInfo.textContent = task.info;
	let cellAction = document.createElement ('td');
	/* la classe permet de récupérer les boutons
	data-xxx-id
	*/
	cellAction.innerHTML = '<a class="del-btn" data-task-id="' + task.id + '" href="">effacer</a>';
	// cellAction.innerHTML = '<a class="" target="blank" href="/' + dbUrl + task.id + '">effacer</a>';
	// cellAction.innerHTML = '<button>effacer</button>';
	let row = document.createElement ('tr');
	row.appendChild (cellId);
	row.appendChild (cellName);
	row.appendChild (cellInfo);
	row.appendChild (cellAction);
	let table = document.querySelector ('table');
	table.appendChild (row);
}
function createTask (name=null, info=null){
	this.name = name;
	this.info = info;
}