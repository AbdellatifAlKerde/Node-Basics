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
function startApp(name) {
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
  } else {
    unknownCommand(text);
  }
}

let list1 = ["HTML", "CSS", "JS"];

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
    "quit / exit --- to stop the app\nhello --- greetings!\nhello (your name!) --- greetings! (hello name)\nlist --- to list your tasks\nadd (task) --- add your task to the list\nremove / remove (index) --- 'remove' will remove the last item\nhelp --- list the commands"
  );
}

/**
 * list command
 *
 * @returns {void}
 */
function list() {
  for (let i = 0; i < list1.length; i++) {
    console.log(`${i + 1}- ${list1[i]}`);
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
    list1.push(task.replace("add", "").trim());
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

// The following line starts the application
startApp("Abdellatif");
