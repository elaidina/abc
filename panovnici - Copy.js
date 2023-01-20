const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const panovnici = [
  'Bořivoj I.',
  'Spytihněv I.',
  'Vratislav I.',
  'sv. Václav',
  'Boleslav I.Ukrutný',
  'Boleslav II. Pobožný',
  'Boleslav III. Ryšavý',
  'Jaromír',
  'Oldřich',
  'Břetislav I.',
  'Vratislav II.',
  'Břetislav II.',
  'Bořivoj II.',
  'Svatopluk Olomoucký',
  'Vladislav I.',
  'Soběslav I.',
  'Vladislav II.',
  'Soběslav II.',
  'Konrád II. Ota',
  'Jindřich Břetislav',
  'Přemysl Otakar I.',
  'Václav I. Jednooký',
  'Přemysl Otakar II.',
  'Václav II.',
  'Václav III.',
  'Jan Lucemburský',
  'Karel IV.',
  'Václav IV.',
  'Zikmund Lucemburský',
  'Ladislav Pohrobek',
  'Jiří z Poděbrad',
  'Vladislav Jagellonský',
  'Ludvík Jagellonský',
  'Ferdinand I Habsburský',
  'Maxmilián II.',
  'Rudolf II.',
  'Matyáš Habsburský',
  'Fridrich Falcký',
  'Ferdinand II.',
  'Ferdinand III.',
  'Leopold I.',
  'Josef I.',
  'Karel VI.',
  'Marie Terezie',
  'Josef II.',
  'Leopold II.',
  'František II.',
  'Ferdinand I. (V. Dobrotivý)',
  'František Josef I.',
  'Karel I.',
  'Tomáš Garrique Masaryk',
  'Edvard Beneš',
  'Emil Hácha',
  'Klement Gottwald',
  'Antonín Zápotocký',
  'Antonín Novotný',
  'Ludvík Svoboda',
  'Gustáv Husák',
  'Václav Havel',
  'Václav Klaus',
  'Miloš Zeman',
  
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...panovnici]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
         
        </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== panovnici[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
  
  draggable_list.addEventListener('mousemove', checkOrder);
}
