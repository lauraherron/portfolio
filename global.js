console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

//this is new.. idk if it is right, it is from chatgpt
let links = document.querySelectorAll('nav a.current');
links.forEach(link => link.classList.remove('current'));
//

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'Resume/', title: 'Resume' },
  { url: 'contact/', title: 'Contact' },
  { url: "https://github.com/lauraherron/portfolio", title: 'Github!' }
];

let nav = document.createElement('nav');
//new
nav.classList.add('topnav');
//
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains('home');



for (let p of pages) {
  let url = p.url;
  //new
  url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;
  //
  let title = p.title;
  let a = document.createElement('a');
  a.href = url;

  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }
  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname,
  );
  if (a.host !== location.host){
    a.target = "_blank";
  }

  a.textContent = title;
  nav.append(a);
}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select id="color-scheme">
			<option value="auto">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
		</select>
	</label>`,
);

//new
const select = document.querySelector('#color-scheme');
select.addEventListener('change', function (event) {
  console.log('color scheme changed to', event.target.value);
  if (event.target.value === 'auto') {
    document.documentElement.style.removeProperty('color-scheme');
  } else {
    //document.documentElement.style.setProperty('color-scheme', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);

  }
  if(localStorage.colorscheme){
    document.documentElement.style.setProperty('color-scheme', localStorage.colorscheme);
    select.value = localStorage.colorscheme;
  }
  localStorage.colorScheme = event.target.value;
});

document.addEventListener('DOMContentLoaded', (event) => {
  if ('colorScheme' in localStorage) {
    const savedScheme = localStorage.colorScheme;
    select.value = savedScheme;
    if (savedScheme === 'auto') {
      document.documentElement.style.removeProperty('color-scheme');
    } else {
      document.documentElement.style.setProperty('color-scheme', savedScheme);
    }
  }
});
//new
