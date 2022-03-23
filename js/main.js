import { users } from './data/users.js';
import { pages } from './data/pages.js';

// globals (later class properties)
let currentPageIdCode = 'home';
let currentUser = users.find(m => m.login === 'anonymous');

// define elements
const siteMessageElem = document.querySelector('.siteMessage');
const btnLoginElem = document.querySelector('.btnLogin');
const menuItemNodeElems = document.querySelectorAll('nav ul li');
const fieldLoginElem = document.querySelector('.field_login');
const fieldPasswordElem = document.querySelector('.field_password');
const btnLogoutElem = document.querySelector('.btnLogout');
const infoContentElem = document.querySelector('.infoContent');

// set up elements 
btnLoginElem.addEventListener('click', (e) => {
	e.preventDefault();
	const fieldLogin = fieldLoginElem.value;
	const fieldPassword = fieldPasswordElem.value;
	const foundUser = users.find(m => m.login === fieldLogin);
	if (foundUser === undefined) {
		siteMessageElem.innerHTML = 'User not found.';
	} else {
		if (foundUser.password !== fieldPassword) {
			siteMessageElem.innerHTML = 'Password incorrect.';
		} else {
			currentUser = foundUser;
			userManager(currentUser);
			menuManager();
			pageManager('home');
			btnLogoutElem.style.display = 'block';
			fieldLoginElem.value = '';
			fieldPasswordElem.value = '';
		}
	}
});
btnLogoutElem.style.display = 'none';
btnLogoutElem.addEventListener('click', (e) => {
	const anonymousUser = users.find(m => m.login === 'anonymous');
	currentUser = anonymousUser;
	userManager(anonymousUser);
	menuManager();
	pageManager('home');
	btnLogoutElem.style.display = 'none';
});

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
	// const currentPage = pages.find(m => m.idCode === currentPageIdCode);
	const menuItems = Array.from(menuItemNodeElems);

	// first turn all menu items back on
	menuItems.forEach(menuItem => {
		menuItem.style.display = 'block';
	})

	pages.forEach(page => {
		if (!atLeastOneTermMatchesInLists(currentUser.accessGroups, page.accessGroups)) {
			menuItems.find(m => {
				const firstClass = m.className.split(' ')[0];
				return firstClass === page.idCode;
			}).style.display = 'none';
		}
	});
};

const userManager = (user) => {
	const content = user.login === 'anonymous' ? 'Please log in.' : `Logged in: ${user.firstName} ${user.lastName}`;
	siteMessageElem.innerHTML = content;
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
	(async () => {
		const response = await fetch('js/data/flashcards.json');
		const flashcards = await response.json();
		infoContentElem.innerHTML = `
	<h2>Flashcards</h2>	
	<ul>
	${flashcards.map(flashcard => {
			return `<li><div>${flashcard.front}: <span class="back">${flashcard.back}</span></div></li>`;
		}).join('')}
	</ul>
	`;
		infoContentElem.innerHTML += `
		<table class="blueTable">
			<thead>
				<tr>
					<th>front</th>
					<th>back</th>
					<th>info</th>
				</tr>
			</thead>
			<tbody>
				${flashcards.map(flashcard => {
					return `
			<tr>
				<td>${flashcard.front}</td>
				<td>${flashcard.back}</td>
				<td>${flashcard.info}</td>
			</tr>`;
		}).join('')}
			</tbody>
		</table>
		`
	})();
});
const menuItemAdminElem = document.querySelector('nav ul li.admin');
menuItemAdminElem.addEventListener('click', () => {
	pageManager('admin');
});
const menuItemLoginElem = document.querySelector('nav ul li.login');
menuItemLoginElem.addEventListener('click', () => {
	pageManager('login');
	fieldLoginElem.focus();
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
menuItemInfoElem.click();
