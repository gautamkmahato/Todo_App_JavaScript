window.addEventListener('load', () => {
	todos = [];
	const newTodoForm = document.querySelector('#new-todo-form');

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();
		const todo = {
			content: e.target.elements.content.value,
			done: false,
			createdAt: new Date().getTime()
		}
		todos.push(todo);
		// Reset the form
		e.target.reset();
		DisplayTodos()
	});

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const input = document.createElement('input');
		const content = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
        // adding a class to each of the elements(checkbox,div,editButton,deleteButton)
		content.classList.add('todo-content');
        input.classList.add('check');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

        // adding data to the innerHTML
		content.innerHTML = `<input type="text" value="${todo.content}" class="content-text" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

        // adding HTML(checkbox,div,editButton,deleteButton) to the todoItem Div
		todoItem.appendChild(input);
		todoItem.appendChild(content);
        todoItem.appendChild(edit);
        todoItem.appendChild(deleteButton);

        // adding todoItem(Div) to the List
		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
        // making the Item to done state(this is extra work)
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			if (todo.done) {
                console.log(todoItem)
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}
			DisplayTodos();
		})

        // Edit the Content when edit button is clicked
		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				DisplayTodos()
			})
		})

        // Delete the Content when delete button is clicked
		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			DisplayTodos()
		})

	})
}