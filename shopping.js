// Gribbing the form to work with .shopping is for form and .list is for list

const shoppingForm=document.querySelector('.shopping');
const list= document.querySelector('.list');

// creating the list to store all the elements 
let items=[];
// function for handling the submit button.
function submitHandler(event){
    event.preventDefault();
    const name= shoppingForm.item.value;
    item={
        name,
        id:Date.now(),
        complete:false,
    }
    if (!name){
        return
    }
    items.push(item);
    // shoppingForm.item.value=''
    event.target.reset();
    console.log(items);
    // display();
    list.dispatchEvent(new CustomEvent('itemsUpdated'));

}

function display(){
    // const html=items.map(item =>
    // `<li class ="shopping-item">
    // <input type="checkbox" value="${item.id}" ${item.complete && 'checked'}>
    // <span class="itemName">${item.name}</span>
    // <button aria-label="Remove ${item.name}"
    // value="${item.id}">&times</button>
    // </li>
    // `).join('');
    const html = items
    .map(
      item => `<li class="shopping-item">
      <input
        value="${item.id}"
        type="checkbox"
        ${item.complete && 'checked'}
      >
      <span class="itemName">${item.name}</span>
      <button
        aria-label="Remove ${item.name}"
        value="${item.id}"
      >&times;</buttonaria-label="Remove>
  </li>`
    )
    .join('');
    console.log(html)
    list.innerHTML=html;
}

function storeinBrowser(){
    console.log(`${items.length} submitted to the Local Storage`)
    localStorage.setItem( 'items',JSON.stringify(items));
}

function restorefromBrowser(){
    console.info('items resotore form the local storage.')
    const lsItems=JSON.parse(localStorage.getItem('items'));
    if (lsItems.length){
        items.push(...lsItems)
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

function deleteItem(id){
    items=items.filter(item=> id!==item.id);
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
    return items;
}

function markAsComplete(id){
    const itemref=items.find(item=>item.id===id);
    itemref.complete=!itemref.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}



shoppingForm.addEventListener('submit',submitHandler);
list.addEventListener('itemsUpdated',display);
list.addEventListener('itemsUpdated', storeinBrowser);
list.addEventListener('click', function(e) {
    const id = parseInt(e.target.value);
    if (e.target.matches('button')) {
      deleteItem(id);
    }
    if (e.target.matches('input[type="checkbox"]')) {
      markAsComplete(id);
    }
  });
restorefromBrowser();
