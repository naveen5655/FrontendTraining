function visitLink(path) {
	//your code goes here
	if(path === 'Page1'){
		localStorage['page1'] = Number(localStorage['page1']) + 1;
	}
	if(path === 'Page2'){
		localStorage['page2'] = Number(localStorage['page2']) + 1;
	}
	if(path === 'Page3'){
		localStorage['page3'] = Number(localStorage['page3']) + 1;
	}
}

function viewResults() {
	//your code goes here
	let container = document.createElement('p');
	container.id = 'results';

	let layout = document.getElementById('content');
	layout.appendChild(container);
	console.log(localStorage)
	let str = '<ul><li> You Visited Page1 '+localStorage['page1'] +' time(s)</li>';
	str += '<li> You Visited Page2 '+localStorage['page2'] +' time(s)</li>';
	str += '<li> You Visited Page3 '+localStorage['page3'] +' time(s)</li></ul>';
	document.getElementById('results').innerHTML = str;
	localStorage['page1'] = 0;
	localStorage['page2'] = 0;
	localStorage['page3'] = 0;
}
