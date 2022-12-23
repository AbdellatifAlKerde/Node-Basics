/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */

let inputjson = "./database.json";

if (process.argv[2]) {
  inputjson = "./blah.json";

  console.log("----------------");
} else {
  inputjson = "./database.json";
}

function startApp(name) {
  readData();
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  // console.log(text.trim().startsWith("add "));
  if (text === "quit\n" || text === "exit\n") {
    saveData();
    quit();
  } else if (text.trim().startsWith("hello ") || text.trim() === "hello") {
    hello(text.trim() + "!");
  } else if (text === "help\n") {
    help();
  } else if (text === "list\n") {
    list();
  } else if (text.trim().startsWith("add ") || text.trim() === "add") {
    add(text.trim());
  } else if (text.trim().startsWith("remove") || text.trim() === "remove") {
    remove(text.trim());
  } else if (text.trim() === "edit\n") {
    console.log("Error");
  } else if (text.split(" ")[0] === "edit") {
    edit(text);
  } else if (text === "check\n" || text === "uncheck\n") {
    console.log("Error, Please Enter the nb of task");
  } else if (
    text.split(" ")[0] === "check" ||
    text.split(" ")[0] === "uncheck"
  ) {
    check(text);
  } else {
    unknownCommand(text);
  }
}

let list1 = [
  {
    taskName: "HTML",
    done: false,
  },
  {
    taskName: "CSS",
    done: false,
  },
  {
    taskName: "JS",
    done: false,
  },
];

const fs = require("fs");

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text) {
  const word = text.split(" ");

  if (word.length > 1) {
    out = text;
  } else {
    out = text;
  }

  out = out.trim();

  console.log(out);
}

/**
 *
 * @returns {void}
 */
function readData() {
  fs.readFile(inputjson, (data) => {
    try {
      let task = JSON.parse(data);
    } catch (error) {
      console.error("Empty database");
    }
  });
}

/**
 * Save the commands
 *
 * @returns {void}
 */
function saveData() {
  // console.log(arrayObject)
  let data = JSON.stringify(list1);
  fs.writeFileSync(inputjson, data, (err) => {
    if (err) throw err;
    console.log("Save Completed");
  });
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye!");
  process.exit();
}

/**
 * get all the the commands
 *
 * @returns {void}
 */
function help() {
  console.log(
    "quit / exit --- to stop the app\nhello --- greetings!\nhello (your name!) --- greetings! (hello name)\nlist --- to list your tasks\nadd (task) --- add your task to the list\nremove / remove (index) --- 'remove' will remove the last item\nedit (index) (task) --- edit specific task\nedit (task) --- edit last task\ncheck (index) --- check the finished tasks\nuncheck (index) --- uncheck tasks\nhelp --- list the commands"
  );
}

/**
 * list command
 *
 * @returns {void}
 */
function list() {
  for (let i = 0; i < list1.length; i++) {
    console.log(`${i + 1}- [ ] ${list1[i].taskName}`);
  }
}

/**
 * add command
 *
 * @returns {void}
 */
function add(task) {
  const word = task.split(" ");
  // word[1].replace("");
  // console.log(task.replace(word[0], ""));

  if (word.length > 1) {
    // console.log(task.replace("add", "").trim());
    // list1.push(`[ ] ${task.replace("add", "").trim()}`);
    // console.log(list1[list1.length - 1].taskName);
    list1[list1.length - 1].taskName = `[ ] ${task.replace("add", "").trim()}`;
  } else {
    console.log("Please Enter a task");
  }
}

/**
 * remove command
 *
 * @returns {void}
 */
function remove(task) {
  const word = task.split(" ");
  // console.log(word[0]);

  if (word.length <= 1) {
    list1.pop();
  } else if (task.replace("remove", "").trim() > list1.length) {
    console.log("Number does not exist");
  } else if (word.length > 1) {
    // let i = Number(task.replace("remove", "").trim());
    // console.log(list1.splice(i));
    list1.splice(task.replace("remove", "").trim(), 1);
  } else {
    console.log("Error (should be: remove (nb))");
  }
}

/**
 * Edit
 * @returns {void}
 */
function edit(edit) {
  edit = edit.replace("\n", "").trim();
  const arr = edit.split(" ");
  if (arr[0] === "edit") {
    const secWord = arr.slice(1, 2).join(" ");
    let pars = parseInt(secWord);

    if (arr.length > 2) {
      const thrWord = arr.slice(2).join(" ");
      if (isNaN(secWord) == false && secWord <= list1.length) {
        list1[pars - 1].taskName = `[ ] ${thrWord}`.slice(4);
      } else {
        console.log("Error index Invalid");
      }
    } else if (arr.length - 1) {
      // list1.splice(list1.length - 1);
      list1[list1.length - 1].taskName = `[ ] ${secWord}`.slice(4);
    }
  } else {
    console.log("Error");
  }
}

/**
 * Check
 *
 * @returns {void}
 */
function check(check) {
  check = check.replace("\n", "").trim();
  const word = check.split(" ");

  if (word[0] === "check") {
    const nb = word.slice(1, 2).join(" ");
    let parse = parseInt(nb);
    if (
      isNaN(nb) == false &&
      nb <= list1.length &&
      list1[nb - 1].done === false
    ) {
      list1[parse - 1].taskName = `[✓] ${list1[parse - 1].taskName}`.slice(0);
      console.log("Done");
      // console.log(list1[parse - 1]);
    } else {
      console.log("Invalid Index");
    }
  }
  if (word[0] === "uncheck") {
    const nb = word.slice(1, 2).join(" ");
    let parse = parseInt(nb);
    if (isNaN(nb) == false && nb <= list1.length) {
      list1[parse - 1].taskName = `[ ] ${list1[parse - 1].taskName}`.slice(4);
      console.log("Done");
      // console.log(list1[parse - 1]);
    } else {
      console.log("Invalid Index");
    }
  }
}
// The following line starts the application
startApp("Abdellatif");

/*end*/
