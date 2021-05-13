{
    const tasks = [];

    const resetInput = () => {
        const resetField = document.querySelector(".js-newTask");
        resetField.value = "";
    };

    const focusInput = () => {
        const newTaskFocus = document.querySelector(".js-newTask").focus();
        if (newTaskFocus == "") {
            newTaskFocus.focus()
        };
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent
        });
        resetInput();
        focusInput();
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1)
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
            <button class="list__button js-done">
            ${task.done ? "✓" : ""}
            </button>

            <span class="list__span${task.done ? " list__span--done" : ""}">
            ${task.content}</span>
            
            <button class="list__button list__button--remove js-remove">🗑️</button>    
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}