var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

//form submit event
form.addEventListener('submit',addItem);

//delete event
itemList.addEventListener('click',removeItem);

//filter event
filter.addEventListener('keyup', filterItems)

//Add item
function addItem(e){
    e.preventDefault();

    //get input value
    var newItem = document.getElementById('item').value;
    var newItem1 = document.getElementById('item1').value;

    var nItem = document.querySelector('#item');
    var nItem1 = document.querySelector('#item1');

    //create new li element
    var li = document.createElement('li');
    //add class
    li.className = 'list-group-item';
    //add text node with input value
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(document.createTextNode(newItem1))

    //create del button element
    var deletebtn = document.createElement('button');
    deletebtn.className = 'btn btn-danger btn-sm float-right delete';
    deletebtn.appendChild(document.createTextNode('X'));
    li.appendChild(deletebtn);

    var editbtn = document.createElement('button');
    editbtn.className = 'btn btn-default btn-outline-secondary btn-sm float-right btn-success';
    editbtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editbtn);


    itemList.appendChild(li);

    saveItemToLocalStorage(newItem + ' ' + newItem1);

    

    nItem.value='';
    nItem1.value='';
}

function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li = e.target.parentElement;
            itemList.removeChild(li);
            removeFromLocalStorage(li);
        }
    }
}

function filterItems(e){
   //converts to lowercase
   var text = e.target.value.toLowerCase();
   //get the items in the item list
   var items = itemList.getElementsByTagName('li'); 
   //convert the items into an array
   Array.from(items).forEach(function(item){
    var itemName = item.firstChild.textContent;
    if(itemName.toLowerCase().indexOf(text) != -1){
        item.style.display='block';
    } else{
        item.style.display='none';
    }
   });
}

function saveItemToLocalStorage(item) {
    var items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

// Get items from local storage and display them on page load
function getItemsFromLocalStorage() {
    var items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(item));

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        deleteBtn.appendChild(document.createTextNode('X'));
        li.appendChild(deleteBtn);

        var editBtn = document.createElement('button');
        editBtn.className = 'btn btn-default btn-outline-secondary btn-sm float-right btn-success edit';
        editBtn.appendChild(document.createTextNode('Edit'));
        li.appendChild(editBtn);

        itemList.appendChild(li);
    });
}

// Remove item from local storage
function removeFromLocalStorage(item) {
    var items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    var text = item.firstChild.textContent;
    items.splice(items.indexOf(text), 1);
    localStorage.setItem('items', JSON.stringify(items));
}