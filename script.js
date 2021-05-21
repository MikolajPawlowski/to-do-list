{
    const tasks = [];

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1)
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent });
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const bindToggleDoneEvents = () => {
            const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

            toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
                toggleDoneButton.addEventListener("click", () => {
                    toggleTaskDone(taskIndex);
                });
            });
        };
        bindToggleDoneEvents();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
              class="list__item js-tasks"
            >
              <button class="list__button list__button--toggleDone js-toggleDone">
              ${task.done ? "✓" : ""}
            </button>

            <span class="list__span${task.done ? " list__span--done" : ""}">
            ${task.content}
            </span>
            
            <button class="list__button list__button--remove js-remove">
            🗑️
            </button>    
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}