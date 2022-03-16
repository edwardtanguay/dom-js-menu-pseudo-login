import { users } from './data/users.js';
import { pages } from './data/pages.js';

// globals (later class properties)
let currentPageIdCode = 'home';
const currentUser = users.find(m => m.login === 'anonymous')

const currentUserInfoElem = document.querySelector('.currentUserInfo');
const menuItemNodes = document.querySelectorAll('nav ul li');

const atLeastOneTermMatchesInLists = (list1, list2) => {
	const list1Terms = list1.split(',');
	const list2Terms = list2.split(',');
	for (const list1Term of list1Terms) {
		for (const list2Term of list2Terms) {
			if (list1Term == list2Term) {
				return true;
			}
		}
	}
	return false;
}

// general functions
const menuManager = () => {
	const currentPage = pages.find(m => m.idCode === currentPageIdCode);
	const menuItems = Array.from(menuItemNodes);
	pages.forEach(page => {
		if (!atLeastOneTermMatchesInLists(currentUser.accessGroups, page.accessGroups)) {
			menuItems.find(m => m.className === page.idCode).style.display = 'none';
		}
	});
};
const userManager = (user) => {
	const content = user.login === 'anonymous' ? 'Please log in.' : `Logged in: ${user.firstName} ${user.lastName}`;
	currentUserInfoElem.innerHTML = content;
};
const pageManager = (idCode) => {
	pageItems.forEach(pageItem => {
		pageItem.elem.style.display = 'none';
	});
	pageItems.find(pageItem => pageItem.idCode === idCode).elem.style.display = 'block';
	// remove "active" class from all navElems 
	Object.values(navItemElems).forEach(navItemElem => {
		navItemElem.classList.remove('active');
	});
	// add "active" class to selected page navItem
	navItemElems[idCode].classList.add('active');
};

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
const navItemElems = {
	'home': menuItemHomeElem,
	'info': menuItemInfoElem,
	'admin': menuItemAdminElem,
	'login': menuItemLoginElem
};

// PAGES
const pageItems = pages.map(page => {
	page.elem = document.querySelector(`div.${page.idCode}`);
	return page;
})

// PAGE LOAD
pageManager(currentPageIdCode);
userManager(currentUser);
menuManager();