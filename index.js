const links = [
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'google.com',
]

const titles = [
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
	'e-learning.tuhh.de',
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

	document.body.appendChild(button);
}
