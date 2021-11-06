(function() {
	fillFromLocalStorage()
	rebuildTable()
	fillFields()
})()


function fillFromLocalStorage() {
	let rows = localStorage.getItem('rows')
	let columns = localStorage.getItem('columns')
	
	if(rows == null || columns == null) {
		return
	}
	
	if(localStorage.getItem('items') == null) {
		addEmptyMatrixToLocalStorage(rows, columns)
	}
	
	let radioButtons = document.getElementsByName("days")
	for(var i = 0; i < radioButtons.length; i++) {
		if(radioButtons[i].value == columns) {
			radioButtons[i].checked = true
			break
		}
	}
	
	document.getElementById("max_subjects").value = rows
}


function fillFields() {
	let columns = document.querySelector('input[name="days"]:checked').value
	let rows = document.getElementById("max_subjects").value
	
	let matrix = JSON.parse(localStorage.getItem("items"))
	
	let table = document.getElementById("result").firstChild
	
	for(var i = 0; i < rows; i++) {
		let row = table.childNodes[i + 1]
		for(var j = 0; j < columns; j++) {
			row.childNodes[j].appendChild(document.createTextNode(matrix[i][j]))
		}
	}
	
	console.log(matrix)
}


function rebuildTable() {
	let week = ["Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	
	let columns = document.querySelector('input[name="days"]:checked').value
	let rows = document.getElementById("max_subjects").value
	
	localStorage.setItem('rows', rows)
	localStorage.setItem('columns', columns)
	
	let resultDiv = document.getElementById("result")
	
	if(!resultDiv.firstChild) {
		buildTableFromScratch(rows, columns)
	} else {
		let table = resultDiv.firstChild
		let curRows = table.childNodes.length - 1
		let curColumns = table.firstChild.childNodes.length
		
		while(curRows > rows) {
			table.removeChild(table.lastChild)
			curRows--
		}
		
		while(curColumns > columns) {
			for(var i = 0; i < table.childNodes.length; i++) {
				table.childNodes[i].removeChild(table.childNodes[i].lastChild)
			}
			curColumns--
		}
		
		if(curRows < rows) {
			for(var i = curRows; i < rows; i++) {
				let tr = document.createElement("tr")
				for(var j = 0; j < curColumns; j++) {
					tr.appendChild(document.createElement("td"))
				}
				table.appendChild(tr)
			}
		}
		
		if(curColumns < columns) {
			let titles = table.firstChild
			for(var i = curColumns; i < columns; i++) {
				let th = document.createElement("th")
				th.appendChild(document.createTextNode(week[i]))
				titles.appendChild(th)
				
				for(var j = 1; j <= rows; j++) {
					table.childNodes[j].appendChild(document.createElement("td"))
				}
			}
		}
	}
	
	addSelectOptions(columns, rows, "add")
	addSelectOptions(columns, rows, "del")
}


function buildTableFromScratch(rows, columns) {
	let week = ["Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	
	let resultDiv = document.getElementById("result")
	resultDiv.innerHTML = ''
	let table = document.createElement("table")
	
	let titles = document.createElement("tr")
	for(var i = 0; i < columns; i++) {
		let th = document.createElement("th")
		th.appendChild(document.createTextNode(week[i]))
		titles.appendChild(th)
	}
	table.appendChild(titles)
	
	for(var i = 0; i < rows; i++) {
		let tr = document.createElement("tr")
		for(var j = 0; j < columns; j++) {
			tr.appendChild(document.createElement("td"))
		}
		table.appendChild(tr)
	}
	
	resultDiv.appendChild(table)
}

function addSelectOptions(columns, rows, id_prefix) {
	let week = ["Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	
	let f = document.getElementById(id_prefix + "_week")
	let f1 = document.getElementById(id_prefix + "_position")
	f.innerHTML = ''
	f1.innerHTML = ''
	
	for(var i = 0; i < columns; i++) {
		let opt = document.createElement("option")
		opt.appendChild(document.createTextNode(week[i]))
		f.appendChild(opt)
	}
	
	for(var i = 0; i < rows; i++) {
		let opt = document.createElement("option")
		opt.appendChild(document.createTextNode(i + 1))
		f1.appendChild(opt)
	}
}

function addItem() {
	let week = ["Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	
	let day = document.getElementById("add_week").value
	let position = document.getElementById("add_position").value
	let item = document.getElementById("item").value
	
	if(item == '') {
		alert("You have an empty item!")
	} else {
		let ind = week.indexOf(day)
		let children = document.getElementById("result").firstChild.childNodes
		
		children[position].childNodes[ind].innerHTML = ''
		children[position].childNodes[ind].appendChild(document.createTextNode(item))
		
		let matrix = JSON.parse(localStorage.getItem("items"))
		matrix[position - 1][ind] = item
		localStorage.setItem('items', JSON.stringify(matrix))
	}
}

function deleteItem() {
	let week = ["Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	
	let day = document.getElementById("del_week").value
	let position = document.getElementById("del_position").value
	
	let ind = week.indexOf(day)
	let children = document.getElementById("result").firstChild.childNodes
	
	children[position].childNodes[ind].innerHTML = ''
	
	let matrix = JSON.parse(localStorage.getItem("items"))
		matrix[position - 1][ind] = ''
		localStorage.setItem('items', JSON.stringify(matrix))
}

function addEmptyMatrixToLocalStorage() {
	let matrix = []
	let rows = 20
	let columns = 7
	
	for(var i = 0; i < rows; i++) {
		matrix.push([])
		for(var j = 0; j < columns; j++) {
			matrix[i].push('')
		}
	}

	localStorage.setItem('items', JSON.stringify(matrix))
}

function clearTable() {
	let columns = document.querySelector('input[name="days"]:checked').value
	let rows = document.getElementById("max_subjects").value
	
	buildTableFromScratch(rows, columns)
	
	addEmptyMatrixToLocalStorage()
}