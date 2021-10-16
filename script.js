const links = [
	'e-learning.tuhh.de',
	'https://www3.tuhh.de/e-4/teaching/rnuis-exercises-labs/',
	'https://media.tuhh.de/es/TI/',
	'https://www.math.uni-hamburg.de/teaching/export/tuhh/cm/a3/2122/lm.html.en',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'google.com',
]

const titles = [
	'e-learning.tuhh.de',
	'internet security',
	'ti videos',
	'Analysis',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'google.com',
]

function getHeight(element)
{
    element.style.visibility = "hidden";
    document.body.appendChild(element);
    var height = element.offsetHeight + 0;
    document.body.removeChild(element);
    element.style.visibility = "visible";
    return height;
}

function getWidth(element)
{
    element.style.visibility = "hidden";
    document.body.appendChild(element);
    var height = element.offsetWidth + 0;
    document.body.removeChild(element);
    element.style.visibility = "visible";
    return height;
}

for (let i = 0; i < links.length; i++) {
	const button = document.createElement('BUTTON')

	button.innerText = titles[i]
	const posX = (window.innerWidth / 2) - (getWidth(button) / 2) + (Math.cos(Math.PI * 2 / links.length * i) * 300)
	const posY = (window.innerHeight / 2) - (getHeight(button)) + (Math.sin(Math.PI * 2 / links.length * i) * 300)
	button.style = `position: absolute; right: ${posX}px; bottom: ${posY};`

	button.onclick = () => {
		console.log('worked')
		window.location = links[i]
	}

	document.body.appendChild(button);
}
