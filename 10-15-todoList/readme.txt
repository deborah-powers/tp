exercice javascript utilisant
	mongo db
	deployd
	ajax

________________________ installer le projet ________________________

installer mongo et deployd

dans une console, lancer mongo
cd C:\Program Files\MongoDB\Server\4.0\bin
mongod

dans une nouvelle console, lancer deployd
dpd create todoList
cd todoList
dpd create ajax.js	// dossier pour ajax. la bdd y est stoquée
dpd					// lancer le projet

si besoin créer une base mongo avec deployd
sur http://localhost:2403/dashboard
créer la base task-list
elle contient des objets de la structure suivante:
	id		String
	name	String
	info	String

pages d'intêret
	http://localhost:2403/dashboard
	http://localhost:2403/task-list
	http://localhost:2403/crud.html

________________________ le faire fonctionner ________________________

http://localhost:2403/crud.html