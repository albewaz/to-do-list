{
  let tasks = [];

  let hideDoneTask = false;

  const hideDoneTasks = () => {
      hideDoneTask = !hideDoneTask;
      render();
  };

  const addNewTask = (newTaskContent) => {
      tasks = [
          ...tasks,
          { content: newTaskContent },
      ];
      render();
  };

  const removeTask = (taskIndex) => {
      tasks = [
          ...tasks.slice(0, taskIndex),
          ...tasks.slice(taskIndex + 1),
      ];
      render();
  };

  const toggleTaskDone = (taskIndex) => {
      tasks = [
          ...tasks.slice(0, taskIndex),
          {
              ...tasks[taskIndex],
              done: !tasks[taskIndex].done
          },
          ...tasks.slice(taskIndex + 1),
      ];
      render();
  };

  const toggleAllTasksDone = () => {
      tasks = tasks.map((task) => ({
          ...task,
          done: true
      }));

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
      const toggleDoneButton = document.querySelectorAll(".js-done");

      toggleDoneButton.forEach((toggleDoneButton, taskIndex) => {
          toggleDoneButton.addEventListener("click", () => {
              toggleTaskDone(taskIndex);
          });
      });
  }

  const bindButtonEvents = () => {
      const allTaskDoneButton = document.querySelector(".js-allTaskDone");
      const hideDoneButton = document.querySelector(".js-hideShowDoneTasks");

      if (tasks.length > 0) {

          allTaskDoneButton.addEventListener("click", () => {
              toggleAllTasksDone();
          });
      };

      if (hideDoneButton) {
          hideDoneButton.addEventListener("click", () => {
              hideDoneTasks();
          });
      };
  };

  const renderTasks = () => {
      let htmlString = "";

      for (const task of tasks) {
          htmlString +=
              `
              <li class="task__item ${hideDoneTask && task.done ? "task__item--hidden" : ""}">
                  <button class="task__button task__button--toggleDone js-done">
                      ${task.done ? "✓" : ""}
                  </button>
                  <span class="task__item${task.done ? "task__item task__item--done" : "task__item"}">
                      ${task.content}
                  </span>
                  <button class="task__button task__button--remove js-remove">
                  🗑
                  </button>
              </li>
          `;
      };

      document.querySelector(".js-tasks").innerHTML = htmlString;

  };

  const renderButtons = () => {
      let htmlButtonString = "";

      if (tasks.length > 0) {
          htmlButtonString += `
          <button class="section__button js-hideShowDoneTasks">${hideDoneTask ? " Pokaż" : " Ukryj"}
              ukończone
          </button>
          <button class="section__button js-allTaskDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
              Ukończ wszystkie
          </button>
          `;
      } else {
          htmlButtonString = ``;
      };

      document.querySelector(".js-buttons").innerHTML = htmlButtonString;
  };

  const render = () => {
      renderTasks();
      renderButtons();

      bindRemoveEvents();
      bindToggleDoneEvents();
      bindButtonEvents();
  };

  const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskElement = document.querySelector(".js-newTask");
      const newTaskContent = newTaskElement.value.trim();

      if (newTaskContent !== "") {
          addNewTask(newTaskContent)
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
};