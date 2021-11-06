window.onload = function() {
	choose_active_menu_item()
	show_load_time()
}

function show_load_time() {
	let loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart
	let p = document.createElement("p")
	let footer = document.getElementById("footer")
	let text = document.createTextNode("Page load time is " + loadTime / 1000 + " sec")
	p.appendChild(text)
	footer.appendChild(p)
}

function choose_active_menu_item() {
	let pages = ["about_me", "skills", "experience", "life", "table"]
	let loc = document.location.href
	let re = new RegExp("/([A-Za-z0-9_]+)\.html")
	let filename = re.exec(loc)[1]
	let ind = pages.indexOf(filename)
	
	nav_links = document.querySelectorAll(".nav_link");
	nav_links[ind].className += " active_nav_link"
}
