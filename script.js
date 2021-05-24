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
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
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

              <span class="list__span${ task.done ? " list__span--done" : ""}">
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
                <button class="section__button js-hideButton"
                ${ tasks.every( task => !task.done) ? "disabled" : ""}>
                ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
                </button>
                <button class="section__button js-doneButton"
                ${ tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
                </button>
                `;
        };

        document.querySelector(".js-buttons").innerHTML = buttonsHTMLContent;
    };

    const bindButtonsEvents = () => {
        const doneButton = document.querySelector(".js-doneButton");

        if (doneButton) {
            doneButton.addEventListener("click", setAllTasksDone);
        }

        const hideButton = document.querySelector(".js-hideButton");

        if (hideButton) {
            hideButton.addEventListener("click", toggleHideDoneTasks);
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