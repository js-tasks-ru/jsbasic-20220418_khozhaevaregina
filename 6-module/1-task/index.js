/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.render(rows);
    this.elem.addEventListener('click', (event) => this.onClick(event));
  } 

  render (array) {
    let newRow = array
      .map(row => `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td><td><button>X</button></td></tr>`)
      .join('');
    
    this.elem.innerHTML = newRow;
  }

  onClick (event) {
    let element = event.target.closest('TR');

    if (event.target.tagName === 'BUTTON') {
      element.remove();
    }
  }
}
