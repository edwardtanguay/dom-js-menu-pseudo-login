// import { users } from './data/users.js';
import { pages } from './data/pages.js';

// general functions
const pageManager = (currentPageIdCode) => {
	pageItems.forEach(pageItem => {
		pageItem.elem.style.display = 'none';
	});
	pageItems.find(pageItem => pageItem.idCode === currentPageIdCode).elem.style.display = 'block';
}

// NAV
const menuItemHomeElem = document.querySelector('nav ul li.home');
menuItemHomeElem.addEventListener('click', () => {
	pageManager('home');
});
const menuItemInfoElem = document.querySelector('nav ul li.info');
menuItemInfoElem.addEventListener('click', () => {
	pageManager('info');
});
const menuItemAdminElem = document.querySelector('nav ul li.admin');
menuItemAdminElem.addEventListener('click', () => {
	pageManager('admin');
});
const menuItemLoginElem = document.querySelector('nav ul li.login');
menuItemLoginElem.addEventListener('click', () => {
	pageManager('login');
});

// PAGES
const pageItems = pages.map(page => {
	page.elem = document.querySelector(`div.${page.idCode}`);
	return page;
})

// PAGE LOAD
pageManager('home');