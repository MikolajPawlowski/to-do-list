{
    let tasks = [];

    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex], done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, },
        ];
        render();
    };

    const setAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const togglemarkAllDones = document.querySelectorAll(".js-toggleDone");

        togglemarkAllDones.forEach((togglemarkAllDone, taskIndex) => {
            togglemarkAllDone.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        const taskToHTML = task => `
            <li class="list__item ${task.done && hideDoneTasks ? " list__item--hidden" : ""}">
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
              `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        let buttonsHTMLContent = "";

        if (tasks.length > 0) {
            buttonsHTMLContent += `
                <button class="section__button js-toggleButton"
                ${tasks.every(task => !task.done) ? "disabled" : ""}>
                ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
                </button>
                <button class="section__button js-markAllDone"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
                </button>
                `;
        };

        document.querySelector(".js-buttons").innerHTML = buttonsHTMLContent;
    };

    const bindButtonsEvents = () => {
        const markAllDone = document.querySelector(".js-markAllDone");

        if (markAllDone) {
            markAllDone.addEventListener("click", setAllTasksDone);
        }

        const toggleButton = document.querySelector(".js-toggleButton");

        if (toggleButton) {
            toggleButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindToggleDoneEvents();
        bindRemoveEvents();
        bindButtonsEvents();
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