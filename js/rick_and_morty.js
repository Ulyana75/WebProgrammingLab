var baseUrl = "https://rickandmortyapi.com/api/character/"
var container = document.getElementById("characters_container")
var page = 1

(function () {
	try {
		console.log("going to call requestHideWebView")
		window.taxiApp.call('requestHideWebView', "token", {})
	} catch (error) {
		console.log(error);
	}
  }());


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function getCharacters() {
	document.body.classList.remove('loaded')
	document.body.classList.add('loading');
	
	let response = await fetch(baseUrl + "?page=" + page)
	await sleep(500)
	
	document.body.classList.add('loaded');
	document.body.classList.remove('loading')
	
	if (response.ok) {
		return await response.json()
	} else {
		showError()
	}
}

function showError() {
	let img = document.createElement("img")
	img.setAttribute("src", "../resources/error.png")
	img.setAttribute("width", "300")
	img.style.marginRight = "85px"
	
	let p = document.createElement("p")
	p.appendChild(document.createTextNode("Cannot load data"))
	p.style.marginBottom = "85px"
	p.style.marginRight = "85px"
	
	container.appendChild(img)
	container.appendChild(p)
}


async function showCharacters() {
	let but = document.getElementById("down_button")
	but.style.visibility = "hidden"
	let json = await getCharacters()
	
	if (json == null) return
	but.style.visibility = "visible"
	
	let results = json.results
	
	for (var i = 0; i < results.length; i++) {
		let character = results[i]
		
		let item = document.createElement("div")
		item.className = "info_block gallery_item character_item"
		
		let img = document.createElement("img")
		img.className = "gallery_image"
		img.setAttribute("src", character.image)
		
		let name = document.createElement("p")
		name.setAttribute("align", "center")
		name.appendChild(document.createTextNode(character.name))
		
		item.appendChild(img)
		item.appendChild(name)
		
		container.appendChild(item)
	}
	
	page++
}


showCharacters()