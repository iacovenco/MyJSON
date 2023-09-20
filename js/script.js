const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoComplete = document.querySelector(".todo-completed");
const todoList = document.querySelector(".todo-list");

const toDoData = JSON.parse(localStorage.getItem("toDoData")) || []; //6) Автоматическое получениеданных из localStorageБлибо пустой массив

const render = function () {
  todoList.innerHTML = ""; //приравниваем к пустой строке
  todoComplete.innerHTML = ""; //чтобы задача не дублировалась (пункт из урока)

  localStorage.setItem("toDoData", JSON.stringify(toDoData)); //5) Сохраняем данные в localStorage

  toDoData.forEach(function (item, index) {
    //4) Добавляем атрибут index
    const li = document.createElement("li");

    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove" data-index="' +
      index +
      '"></button>' + //
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      todoComplete.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;

      render();
    });

    li.querySelector(".todo-remove").addEventListener("click", function () {
      toDoData.splice(index, 1); //4) С помощью index удаляем задачу

      render();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  if (headerInput.value === "") {
    return;
  } //3) Запрещаем добавлять пустай элемент

  const newTodo = {
    text: headerInput.value,
    completed: false,
  };

  toDoData.push(newTodo);
  headerInput.value = "";

  render();
});
render();
