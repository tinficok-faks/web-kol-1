import "../scss/styles.scss"

import * as bootstrap from "bootstrap";

import "./script";

import $ from "jquery";

let todos = [];

function formatDate(ms) {
    const d = new Date(ms);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}


function get_todos() {
    return $.getJSON("/api/todos");
}

function apiUpdateTodo(id, data) {
    return $.ajax({
        url: `/api/todos/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
    });
}

function apiDeleteTodo(id) {
    return $.ajax({
        url: `/api/todos/${id}`,
        method: "DELETE",
        dataType: "json",
    });
}


function createTodoCard(todo) {
    const statusIcon = todo.done
        ? '<i class="bi bi-check-circle-fill text-success"></i>'
        : '<i class="bi bi-x-circle-fill text-danger"></i>';

    const $col = $(`
    <div class="col-12 col-md-6 col-xl-4">
      <article class="card border-0 shadow-sm rounded-4 h-100 todo-card">
        <div class="card-body d-flex flex-column justify-content-between">
          <header class="mb-3">
            <h2 class="h4 mb-3">${todo.title}</h2>
            <p class="mb-1">
              <span class="fw-bold">When:</span> ${formatDate(todo.when)}
            </p>
            <p class="mb-0 d-flex align-items-center gap-2">
              <span class="fw-bold">Status:</span>
              <span class="status-icon">${statusIcon}</span>
            </p>
          </header>

          <div class="mt-3 d-grid gap-2 gap-sm-0 d-sm-flex">
            <button type="button"
              class="btn btn-light border rounded-pill flex-fill me-sm-2 btn-toggle">
              Toggle
            </button>
            <button type="button"
              class="btn btn-light border rounded-pill flex-fill btn-remove">
              Remove
            </button>
          </div>
        </div>
      </article>
    </div>
  `);

    $col.find(".btn-toggle").on("click", () => toggle(todo.id));
    $col.find(".btn-remove").on("click", () => removeTodo(todo.id));

    return $col;
}

function render_todos(data) {
    todos = data;
    const $row = $("#todosRow");
    $row.empty();

    todos.forEach(todo => {
        const $card = createTodoCard(todo);
        $row.append($card);
    });

    $("#todosRow .todo-card").each(function (index) {
        const $card = $(this);
        setTimeout(() => {
            $card.addClass("fade-in");
        }, index * 80);
    });
}


function removeTodo(id) {
    apiDeleteTodo(id)
        .done(() => {
            todos = todos.filter(t => t.id !== id);
            render_todos(todos);
        })
        .fail(err => console.error(err));
}

function toggle(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newDone = !todo.done;

    apiUpdateTodo(id, { done: newDone })
        .done(updated => {
            todos = todos.map(t => (t.id === id ? updated : t));
            render_todos(todos);
        })
        .fail(err => console.error(err));
}


$(document).ready(() => {
    get_todos()
        .done(data => {
            render_todos(data);
        })
        .fail(err => {
            console.error("Greška kod dohvaćanja todos:", err);
        });
});