const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    //inputBox: references the input field where users type a task.
//listContainer: references the container (<ul> ) where tasks will be listed.

    function addTask() {
      const taskText = inputBox.value.trim();//Gets the user input, trims whitespace from both ends.
      if (taskText === '') {
        alert("CAN NOT ADD AN EMPTY TASK!");
        return;
      }

      const li = document.createElement("li"); //Creates a new list item element.
      const timestamp = new Date().toLocaleString(); //Gets the current date and time
      
      const spanText = document.createElement("span");
      spanText.textContent = taskText;
      li.appendChild(spanText); //Creates a span for the task text, sets the content, and adds it to the <li>.

      const small = document.createElement("small");
      small.className = "timestamp";
      small.textContent = `Added on ${timestamp}`;
      li.appendChild(small);//Creates a timestamp <small> element and appends it.

      const del = document.createElement("span");
      del.textContent = "\u00d7";
      del.className = "delete-btn";
      li.appendChild(del); //Adds a delete button (a red X) using the Unicode character ×.

      listContainer.appendChild(li);
      inputBox.value = "";
      saveData(); //Appends the new task to the list, clears the input field, and saves the updated list.


    }
//Adds an event listener to detect clicks within the list.
    listContainer.addEventListener("click", function(e) {
      if (e.target.tagName === "LI" || e.target.tagName === "SPAN" && !e.target.classList.contains("delete-btn")) {
        e.target.closest("li").classList.toggle("checked");
        //If the user clicks the <li> or the task text span (but not the delete button), it toggles the checked class (used to strike through completed tasks).
      } else if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();//If the user clicks the X (delete), remove that specific <li> from the DOM.
      }
      saveData();
    });

    listContainer.addEventListener("dblclick", function(e) //On double-click of a task's text BUT NOT THE RED X, it prompts for editing.
     {
      if (e.target.tagName === "SPAN" && !e.target.classList.contains("delete-btn")) {
        const newText = prompt("Edit task:", e.target.textContent);
        if (newText) {
          e.target.textContent = newText.trim();
          saveData(); //Replaces the task text with the user's new input and saves it.
        }
      }
    });

    function clearAll() {
      listContainer.innerHTML = "";
      saveData(); //Removes all tasks from the DOM and storage.


    }

    function clearCompleted() {
      const tasks = listContainer.querySelectorAll("li.checked");
      tasks.forEach(task => task.remove());
      saveData();
    } //Selects all tasks with class checked (ie. the completed ones) and it deletes them.

    function saveData() {
      localStorage.setItem("tasks", listContainer.innerHTML);
    } //This stores the current task list's HTML in the browser's localStorage.

    function showTask() {
      listContainer.innerHTML = localStorage.getItem("tasks") || "";
    }
//This Loads tasks from the localStorage into the DOM when the page loads.

    showTask();
    //This immediately calls showTask() when the script loads to restore tasks.