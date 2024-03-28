(function() {
  let listArray = []; // создаем массив объектов дел для элементов списка
  let listName = ''

  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  };

  // создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    // создаем элементы формы
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    // стилизуем и добавляем классы bootstrap'a форме и её элементам
    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    // добавляем элементы в форму
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    button.disabled = true;  // Выключаем кнопку, при пустом поле input
    input.addEventListener('input', function() {
    if (input.value !== "") {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

    return {
      form,
      input,
      button,
    };
  };

  //создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  };

  function createTodoItem(objItem) {  // функция, для создания дела (элемент списка)
    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // Устанавливаем стили для элемента списка, а также для размещения кнопок в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = objItem.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    if (objItem.done == true) item.classList.add('list-group-item-success')

    // вкладываем кнопки в один блок, затем этот блок вкладываем в эелемент списка (li)
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

          //добавляем события на кнопки
          doneButton.addEventListener('click', function() {
            item.classList.toggle('list-group-item-success');
            for (let i = 0; i < listArray.length; i++) {
              if (objItem.id == listArray[i].id) listArray[i].done = !listArray[i].done
            }
            saveList(listArray, listName);
          });
          deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
              item.remove();
              for (let i = 0; i < listArray.length; i++) {
                if (objItem.id == listArray[i].id) listArray.splice(i, 1);
              }
              saveList(listArray, listName);
            }
          });


    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия и другие события
    return {
      item,
      doneButton,
      deleteButton,
    }
  }

  function seachMaxId(arr) { // Добавляем уникальное число id, с помощью нахождения уникального числа
    let max = 0;
    for (let item of arr) {
      if (item.id > max) max = item.id;
    }
    return max + 1;
  }

  function saveList(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr));
  }

  function createTodoApp(container, title = 'Список дел', keyNameUser, defArray = []) {

   // помещаем в переменные вышенаписанные функции
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

   // добавляем элементы на страницу, с помощью вызова функций
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    listName = keyNameUser;
    listArray = defArray;

    if (localStorage.getItem(listName) !== null && localStorage.getItem(listName) !== "") listArray = JSON.parse(localStorage.getItem(listName));

    for (let i = 0; i < listArray.length; i++) {
      let todoItem = createTodoItem(listArray[i]);
      todoList.append(todoItem.item);
    }

    todoItemForm.form.addEventListener('submit', function(e) { // создаем событие submit на форме по нажатию на Enter или на конопку создания дела (данное событие свойственно только форме)

      e.preventDefault(); // отменяет обновление страницы браузера при отправке формы


      if (!todoItemForm.input.value) {  //игнорируем создание элемента, если пользователь ничего не ввел в поле
        return;
      }

      let listObject = {
        name: todoItemForm.input.value,
        done: false,
        id: seachMaxId(listArray),
      }

      let todoItem = createTodoItem(listObject);

      listArray.push(listObject);

      todoList.append(todoItem.item);    // создаем и добавляем в список новое дело с названием из поля для ввода

      saveList(listArray, listName);

      todoItemForm.input.value = '';     // обнуляем значение в поле после submit, чтобы не пришлось стирать его вручную

      todoItemForm.button.disabled = true;  // Выключаем кнопку, после события submit, так как поле становится пустым
    });
  }
  window.createTodoApp = createTodoApp;
})();



